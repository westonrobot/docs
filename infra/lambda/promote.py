"""Copy an approved inbox object into the served bucket.

Triggered by `s3:ObjectTagging:*` on the inbox. This function holds the only
write access to the served bucket in the whole system: an approver's entire
privilege is `PutObjectTagging` on the inbox, so no human can serve a file
even by accident. That separation is the reason the upload grant can be handed
out freely (ADR 0001, docs/design/file-hosting.md §3).
"""

from __future__ import annotations

import hashlib
import logging
import os
import urllib.parse

import boto3

import wrfiles

log = logging.getLogger()
log.setLevel(logging.INFO)

s3 = boto3.client("s3")
cloudfront = boto3.client("cloudfront")
lambda_client = boto3.client("lambda")

PROD_BUCKET = os.environ["PROD_BUCKET"]
DISTRIBUTION_ID = os.environ.get("DISTRIBUTION_ID", "")
REINDEX_NAME = os.environ.get("REINDEX_NAME", "")

# A guard, not a limit: promotion streams the object to digest it, and an
# object larger than this is more likely a mistake than a manual. Raise it
# deliberately if a real payload needs it.
MAX_BYTES = int(os.environ.get("MAX_BYTES", 512 * 1024 * 1024))

APPROVED_TAG = "approved"


def _is_approved(bucket: str, key: str, version_id: str | None) -> bool:
    kw = {"Bucket": bucket, "Key": key}
    if version_id:
        kw["VersionId"] = version_id
    tags = s3.get_object_tagging(**kw)["TagSet"]
    return any(t["Key"] == APPROVED_TAG and t["Value"] == "true" for t in tags)


def _digest(bucket: str, key: str, version_id: str | None) -> tuple[str, int]:
    kw = {"Bucket": bucket, "Key": key}
    if version_id:
        kw["VersionId"] = version_id
    body = s3.get_object(**kw)["Body"]
    h = hashlib.sha256()
    size = 0
    for chunk in iter(lambda: body.read(1 << 20), b""):
        size += len(chunk)
        if size > MAX_BYTES:
            raise ValueError(f"{key} exceeds MAX_BYTES ({MAX_BYTES})")
        h.update(chunk)
    return h.hexdigest(), size


def promote(bucket: str, inbox_key: str, version_id: str | None = None) -> dict | None:
    """Promote one approved object. Returns None when it is not approved yet."""
    if not _is_approved(bucket, inbox_key, version_id):
        log.info("not approved, leaving in place: %s", inbox_key)
        return None

    key = wrfiles.key_from_inbox_key(inbox_key)
    digest, size = _digest(bucket, inbox_key, version_id)
    meta = wrfiles.metadata_for(key)
    _stem, ext = wrfiles.split_ext(key)

    source = {"Bucket": bucket, "Key": inbox_key}
    if version_id:
        source["VersionId"] = version_id

    s3.copy_object(
        Bucket=PROD_BUCKET,
        Key=key,
        CopySource=source,
        ContentType=wrfiles.content_type_for(ext),
        CacheControl=wrfiles.IMMUTABLE_CACHE,
        # Set rather than inferred (ADR 0001 D5). An archive served as
        # octet-stream downloads fine; an .mp4 served that way will not seek.
        MetadataDirective="REPLACE",
        Metadata={**meta, "sha256": digest},
    )

    # The sidecar exists so a customer can verify without reading headers.
    s3.put_object(
        Bucket=PROD_BUCKET,
        Key=f"{key}.sha256",
        Body=f"{digest}  {key.rsplit('/', 1)[-1]}\n".encode(),
        ContentType="text/plain; charset=utf-8",
        CacheControl=wrfiles.IMMUTABLE_CACHE,
    )

    if DISTRIBUTION_ID:
        cloudfront.create_invalidation(
            DistributionId=DISTRIBUTION_ID,
            InvalidationBatch={
                "Paths": {"Quantity": 2, "Items": [f"/{key}", f"/{key}.sha256"]},
                "CallerReference": f"promote-{digest[:16]}",
            },
        )

    log.info("promoted %s -> %s (%d bytes, sha256 %s)", inbox_key, key, size, digest)
    return {"key": key, "sha256": digest, "size": size}


def handler(event, _context):
    results = []
    for record in event.get("Records", []):
        bucket = record["s3"]["bucket"]["name"]
        raw = record["s3"]["object"]["key"]
        key = urllib.parse.unquote_plus(raw)
        version_id = record["s3"]["object"].get("versionId")
        try:
            result = promote(bucket, key, version_id)
        except wrfiles.NameError_ as exc:
            # Held and reported, never guessed at. The object stays in the
            # inbox so a person can rename it.
            log.error("cannot derive a key for %s: %s", key, exc)
            continue
        if result:
            results.append(result)
    if results and REINDEX_NAME:
        # Reindexing is invoked from here rather than from a notification on
        # the served bucket: an ObjectCreated trigger would fire on index.json
        # and re-trigger itself. One promotion, one reindex.
        lambda_client.invoke(FunctionName=REINDEX_NAME, InvocationType="Event")
    return {"promoted": results}
