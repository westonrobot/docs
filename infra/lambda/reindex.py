"""Regenerate `index.json` from the served bucket.

The bucket is the source of truth; the index is derived from it and never
authored. Anything that reads the index — the docs site build, a support
engineer, a future migration — is therefore reading a projection of what is
actually served, which is the only thing that can be authoritative about what
is live (docs/design/file-hosting.md §3).
"""

from __future__ import annotations

import json
import logging
import os

import boto3

import wrfiles

log = logging.getLogger()
log.setLevel(logging.INFO)

s3 = boto3.client("s3")
cloudfront = boto3.client("cloudfront")

PROD_BUCKET = os.environ["PROD_BUCKET"]
DISTRIBUTION_ID = os.environ.get("DISTRIBUTION_ID", "")
BASE_URL = os.environ.get("BASE_URL", "https://download.westonrobot.net")


def build_index() -> dict:
    entries = []
    paginator = s3.get_paginator("list_objects_v2")
    for page in paginator.paginate(Bucket=PROD_BUCKET):
        for obj in page.get("Contents", []):
            key = obj["Key"]
            if not wrfiles.is_content_key(key):
                continue
            head = s3.head_object(Bucket=PROD_BUCKET, Key=key)
            try:
                entries.append(wrfiles.index_entry(key, head, BASE_URL))
            except (ValueError, IndexError) as exc:
                # An object that does not parse is reported, not silently
                # dropped: a document present in the bucket but absent from the
                # index would be invisible to every page that queries it.
                log.error("skipping unparseable key %s: %s", key, exc)
    entries.sort(key=lambda e: e["key"])
    return {"files": entries, "count": len(entries)}


def handler(_event, _context):
    index = build_index()
    s3.put_object(
        Bucket=PROD_BUCKET,
        Key=wrfiles.INDEX_KEY,
        Body=json.dumps(index, indent=2, sort_keys=True).encode(),
        ContentType="application/json",
        # The one mutable object in the bucket, so the one that must not carry
        # the immutable cache header every other key gets.
        CacheControl=wrfiles.INDEX_CACHE,
    )
    if DISTRIBUTION_ID:
        cloudfront.create_invalidation(
            DistributionId=DISTRIBUTION_ID,
            InvalidationBatch={
                "Paths": {"Quantity": 1, "Items": [f"/{wrfiles.INDEX_KEY}"]},
                "CallerReference": f"reindex-{index['count']}-{hash(str(index)) & 0xFFFFFF:06x}",
            },
        )
    log.info("indexed %d files", index["count"])
    return index
