#!/usr/bin/env python3
"""Publish documents staged in `static/_upload/` to the file store.

The engineer's path (docs/design/file-hosting.md §3): drop a file at the path
it will occupy in the store, build locally and see the real page, run this,
review again against the published URL.

    static/_upload/robot/wr65/wr65-user-manual-en-v2.3.pdf
      local  /_upload/robot/wr65/wr65-user-manual-en-v2.3.pdf
      served https://download.westonrobot.net/robot/wr65/wr65-user-manual-en-v2.3.pdf

The two differ only by prefix, so substituting one for the other is a string
swap rather than a rewrite.

Default is a dry run: it prints the plan and changes nothing. `--publish`
uploads, regenerates the index, invalidates the CDN and rewrites the pages.
Re-running is a no-op for anything whose digest already matches, so there is
no `done/` directory to keep in step by hand.

**It never deletes.** Objects in the store with no local counterpart are
reported as orphans, not removed: published paths are permanent (ADR 0001 D4)
and a manual for hardware still in the field outlives every local checkout of
it (§10). Removing one is a deliberate act for a human who knows why.
"""

from __future__ import annotations

import argparse
import json
import os
import pathlib
import sys
from datetime import datetime, timezone

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import wrfiles  # noqa: E402

REPO = pathlib.Path(__file__).resolve().parent.parent
UPLOAD_ROOT = REPO / "static" / wrfiles.UPLOAD_DIR
LOCAL_PREFIX = f"/{wrfiles.UPLOAD_DIR}/"
CONTENT_DIRS = wrfiles.SECTIONS
PAGE_SUFFIXES = (".md", ".mdx")

DEFAULT_BASE_URL = os.environ.get("WR_FILES_BASE_URL", "https://download.westonrobot.net")
DEFAULT_BUCKET = os.environ.get("WR_FILES_BUCKET", "westonrobot-files")
DEFAULT_DISTRIBUTION = os.environ.get("WR_FILES_DISTRIBUTION_ID", "")


def staged_files() -> list[pathlib.Path]:
    if not UPLOAD_ROOT.is_dir():
        return []
    return sorted(p for p in UPLOAD_ROOT.rglob("*") if p.is_file())


def remote_objects(s3, bucket: str) -> dict[str, dict]:
    """Everything currently in the store, by key, with its recorded digest.

    Read from the bucket rather than from `index.json`, because the index is
    derived and this is the thing it is derived from — reconciling against a
    projection would hide exactly the drift worth finding.
    """
    found = {}
    for page in s3.get_paginator("list_objects_v2").paginate(Bucket=bucket):
        for obj in page.get("Contents", []):
            key = obj["Key"]
            if not wrfiles.is_content_key(key):
                continue
            head = s3.head_object(Bucket=bucket, Key=key)
            found[key] = {"sha256": head.get("Metadata", {}).get("sha256", ""),
                          "bytes": head.get("ContentLength", 0), "head": head}
    return found


def rebuild_index(s3, bucket: str, base_url: str) -> dict:
    """Regenerate `index.json` from the bucket. Derived, never authored."""
    entries = []
    for page in s3.get_paginator("list_objects_v2").paginate(Bucket=bucket):
        for obj in page.get("Contents", []):
            key = obj["Key"]
            if not wrfiles.is_content_key(key):
                continue
            head = s3.head_object(Bucket=bucket, Key=key)
            try:
                entries.append(wrfiles.index_entry(key, head, base_url))
            except (ValueError, IndexError) as exc:
                # Reported, not silently dropped: a document present in the
                # bucket but absent from the index is invisible to every page
                # that queries it.
                print(f"  ! cannot parse {key}: {exc}")
    entries.sort(key=lambda e: e["key"])
    index = {"files": entries, "count": len(entries)}
    s3.put_object(
        Bucket=bucket,
        Key=wrfiles.INDEX_KEY,
        Body=json.dumps(index, indent=2, sort_keys=True).encode(),
        ContentType="application/json",
        # The one mutable object in the store, so the one that must not carry
        # the immutable cache header every published key gets.
        CacheControl=wrfiles.INDEX_CACHE,
    )
    return index


def pages_referencing(local_url: str) -> list[pathlib.Path]:
    hits = []
    for directory in CONTENT_DIRS:
        root = REPO / directory
        if not root.is_dir():
            continue
        for page in root.rglob("*"):
            if page.suffix in PAGE_SUFFIXES and local_url in page.read_text(encoding="utf-8"):
                hits.append(page)
    return sorted(hits)


def substitute(page: pathlib.Path, local_url: str, published_url: str) -> int:
    text = page.read_text(encoding="utf-8")
    count = text.count(local_url)
    if count:
        page.write_text(text.replace(local_url, published_url), encoding="utf-8")
    return count


def retire(key: str, retiring: bool, args) -> int:
    """Flag or unflag a published object, without moving or deleting it.

    Metadata rather than a tag: `head_object` already returns it, so the index
    build reads it for free, and setting it needs only `PutObject`, which a
    publisher already has. S3 metadata is immutable, so this is a copy onto the
    same key — the content type and cache headers have to be re-applied, since
    REPLACE drops everything not supplied.
    """
    import boto3

    s3 = boto3.client("s3")
    head = s3.head_object(Bucket=args.bucket, Key=key)
    meta = dict(head.get("Metadata", {}))
    if retiring:
        meta["retired"] = datetime.now(timezone.utc).date().isoformat()
    else:
        meta.pop("retired", None)

    s3.copy_object(
        Bucket=args.bucket, Key=key,
        CopySource={"Bucket": args.bucket, "Key": key},
        MetadataDirective="REPLACE",
        Metadata=meta,
        ContentType=head["ContentType"],
        CacheControl=head.get("CacheControl", wrfiles.IMMUTABLE_CACHE),
    )
    print(f"{'retired' if retiring else 'restored'} {key}")
    index = rebuild_index(s3, args.bucket, args.base_url)
    print(f"index.json rebuilt: {index['count']} document(s)")
    if args.distribution_id:
        boto3.client("cloudfront").create_invalidation(
            DistributionId=args.distribution_id,
            InvalidationBatch={"Paths": {"Quantity": 1, "Items": ["/*"]},
                               "CallerReference": f"retire-{os.getpid()}"},
        )
        print("CloudFront invalidated")
    print("The object is still served; only the table stops listing it.")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--retire", metavar="KEY",
                    help="hide a document from the table. The object stays served "
                         "and its URL keeps resolving — a bookmark, a printed QR "
                         "code and a support email from 2024 all depend on that "
                         "(ADR 0001 D4, design §10). Use for a mistake, or a "
                         "revision that should no longer be offered.")
    ap.add_argument("--unretire", metavar="KEY", help="undo --retire")
    ap.add_argument("--publish", action="store_true",
                    help="upload, reindex, invalidate and rewrite pages (default: dry run)")
    ap.add_argument("--base-url", default=DEFAULT_BASE_URL)
    ap.add_argument("--bucket", default=DEFAULT_BUCKET)
    ap.add_argument("--distribution-id", default=DEFAULT_DISTRIBUTION,
                    help="CloudFront distribution to invalidate; skipped if unset")
    args = ap.parse_args()

    if args.retire or args.unretire:
        return retire(args.retire or args.unretire, bool(args.retire), args)

    files = staged_files()
    plan, problems = [], []
    for path in files:
        rel = path.relative_to(REPO).as_posix()
        try:
            key = wrfiles.key_from_upload_path(rel)
        except wrfiles.NameError_ as exc:
            problems.append((rel, str(exc)))
            continue
        plan.append({"path": path, "key": key, "digest": wrfiles.sha256_file(str(path)),
                     "bytes": path.stat().st_size,
                     "local_url": f"{LOCAL_PREFIX}{key}",
                     "published_url": f"{args.base_url}/{key}"})

    if problems:
        print("Held — these names do not parse, and are never guessed at:")
        for rel, why in problems:
            print(f"  {rel}\n      {why}")
        print()

    try:
        import boto3
    except ImportError:
        print("boto3 is not installed, so the store cannot be read.")
        return 1
    s3 = boto3.client("s3")
    try:
        remote = remote_objects(s3, args.bucket)
    except Exception as exc:  # noqa: BLE001 — no bucket yet is the normal case
        print(f"Cannot read s3://{args.bucket} ({exc.__class__.__name__}); "
              "treating the store as empty.")
        remote = {}

    for item in plan:
        published = remote.get(item["key"])
        item["state"] = ("published" if published and published["sha256"] == item["digest"]
                         else "differs" if published else "new")

    print(f"{len(plan)} staged, {len(remote)} in the store.\n")
    for item in plan:
        item["pages"] = pages_referencing(item["local_url"])
        mark = {"new": "+", "differs": "!", "published": "="}[item["state"]]
        print(f"  {mark} {item['key']}  ({item['bytes'] / 1048576:.1f} MiB, {item['state']})")
        for page in item["pages"]:
            print(f"      referenced by {page.relative_to(REPO)}")

    # Reconciliation, in the direction that is safe to automate.
    orphans = sorted(set(remote) - {i["key"] for i in plan})
    if orphans:
        print(f"\n{len(orphans)} object(s) in the store with nothing staged locally:")
        for key in orphans:
            print(f"  ? {key}")
        print("  Not an error — every published document looks like this once its\n"
              "  local copy is cleaned up. Listed so a real orphan is visible.\n"
              "  Nothing here is ever deleted automatically (ADR 0001 D4, design §10).")

    todo = [i for i in plan if i["state"] != "published"]
    if not args.publish:
        print(f"\nDry run. {len(todo)} file(s) would be uploaded. Re-run with --publish.")
        return 1 if problems else 0
    if not todo:
        print("\nNothing to upload.")

    for item in todo:
        _stem, ext = wrfiles.split_ext(item["key"])
        meta = wrfiles.metadata_for(item["key"])
        print(f"\nuploading {item['key']}")
        s3.upload_file(
            str(item["path"]), args.bucket, item["key"],
            ExtraArgs={
                # Set, never inferred (ADR 0001 D5). An archive served as
                # octet-stream downloads fine; an .mp4 served that way will
                # not seek.
                "ContentType": wrfiles.content_type_for(ext),
                "CacheControl": wrfiles.IMMUTABLE_CACHE,
                "Metadata": {**meta, "sha256": item["digest"]},
            },
        )
        # So a customer can verify without reading response headers.
        s3.put_object(
            Bucket=args.bucket, Key=f"{item['key']}.sha256",
            Body=f"{item['digest']}  {item['key'].rsplit('/', 1)[-1]}\n".encode(),
            ContentType="text/plain; charset=utf-8",
            CacheControl=wrfiles.IMMUTABLE_CACHE,
        )

    index = rebuild_index(s3, args.bucket, args.base_url)
    print(f"\nindex.json rebuilt: {index['count']} document(s)")

    if args.distribution_id:
        boto3.client("cloudfront").create_invalidation(
            DistributionId=args.distribution_id,
            InvalidationBatch={
                "Paths": {"Quantity": 1, "Items": ["/*"]},
                "CallerReference": f"publish-{index['count']}-{os.getpid()}",
            },
        )
        print("CloudFront invalidated")
    else:
        print("No distribution id set; skipping invalidation. Published keys are\n"
              "immutable so this only delays index.json, which expires in 60s.")

    for item in plan:
        for page in item.get("pages", []):
            n = substitute(page, item["local_url"], item["published_url"])
            if n:
                print(f"  {page.relative_to(REPO)}: {n} link(s) -> published URL")

    print("\nRebuild and review against the published URLs before committing.")
    return 1 if problems else 0


if __name__ == "__main__":
    raise SystemExit(main())
