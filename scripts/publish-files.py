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
uploads and rewrites pages. Re-running is a no-op for anything already in the
index, so there is no `done/` directory to keep in step by hand.
"""

from __future__ import annotations

import argparse
import json
import os
import pathlib
import re
import sys
import urllib.error
import urllib.request

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent / "infra" / "lambda"))
import wrfiles  # noqa: E402  (path shim above; wrfiles is the single source of key rules)

REPO = pathlib.Path(__file__).resolve().parent.parent
UPLOAD_ROOT = REPO / "static" / wrfiles.UPLOAD_DIR
LOCAL_PREFIX = f"/{wrfiles.UPLOAD_DIR}/"
CONTENT_DIRS = ("robot", "solution", "peripheral", "system", "tutorial", "support")
PAGE_SUFFIXES = (".md", ".mdx")

DEFAULT_BASE_URL = os.environ.get("WR_FILES_BASE_URL", "https://download.westonrobot.net")
DEFAULT_INBOX = os.environ.get("WR_FILES_INBOX_BUCKET", "wr-files-inbox")


def staged_files() -> list[pathlib.Path]:
    if not UPLOAD_ROOT.is_dir():
        return []
    return sorted(p for p in UPLOAD_ROOT.rglob("*") if p.is_file())


def fetch_index(base_url: str) -> dict[str, dict]:
    """Published documents, by key. An unreachable index is not an error — it
    only means nothing can be skipped, so everything is treated as new."""
    url = f"{base_url}/{wrfiles.INDEX_KEY}"
    try:
        with urllib.request.urlopen(url, timeout=20) as fh:
            data = json.load(fh)
    except (urllib.error.URLError, json.JSONDecodeError, TimeoutError) as exc:
        print(f"  note: no index at {url} ({exc}); treating everything as new")
        return {}
    return {e["key"]: e for e in data.get("files", [])}


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


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--publish", action="store_true",
                    help="actually upload and rewrite pages (default: dry run)")
    ap.add_argument("--approve", action="store_true",
                    help="also tag the upload approved; requires the approve grant")
    ap.add_argument("--base-url", default=DEFAULT_BASE_URL)
    ap.add_argument("--inbox-bucket", default=DEFAULT_INBOX)
    args = ap.parse_args()

    files = staged_files()
    if not files:
        print(f"Nothing staged in {UPLOAD_ROOT.relative_to(REPO)}/")
        return 0

    print(f"Index: {args.base_url}/{wrfiles.INDEX_KEY}")
    index = fetch_index(args.base_url)

    plan, problems = [], []
    for path in files:
        rel = path.relative_to(REPO).as_posix()
        try:
            key = wrfiles.key_from_upload_path(rel)
        except wrfiles.NameError_ as exc:
            problems.append((rel, str(exc)))
            continue
        digest = wrfiles.sha256_file(str(path))
        published = index.get(key)
        state = "published" if published and published.get("sha256") == digest else (
            "differs" if published else "new")
        plan.append({
            "path": path, "rel": rel, "key": key, "digest": digest, "state": state,
            "local_url": f"{LOCAL_PREFIX}{key}",
            "published_url": f"{args.base_url}/{key}",
            "bytes": path.stat().st_size,
        })

    if problems:
        print("\nHeld — these names do not parse, and are never guessed at:")
        for rel, why in problems:
            print(f"  {rel}\n      {why}")

    print(f"\n{len(plan)} staged file(s):")
    for item in plan:
        pages = pages_referencing(item["local_url"])
        item["pages"] = pages
        mark = {"new": "+", "differs": "!", "published": "="}[item["state"]]
        print(f"  {mark} {item['key']}  ({item['bytes'] / 1048576:.1f} MiB, {item['state']})")
        for page in pages:
            print(f"      referenced by {page.relative_to(REPO)}")
        if item["state"] != "published" and not pages:
            print("      no page references it yet")

    todo = [i for i in plan if i["state"] != "published"]
    if not todo:
        print("\nEverything staged is already published; nothing to do.")
    if not args.publish:
        print("\nDry run. Re-run with --publish to upload and rewrite pages.")
        return 1 if problems else 0

    import boto3  # imported late so a dry run needs no AWS SDK

    s3 = boto3.client("s3")
    for item in todo:
        # The object lands at the published key, in the inbox bucket — no
        # `inbox/` prefix inside a bucket already called that. It matters that
        # this matches where the console route drops a file: two front doors
        # that leave objects in different shapes are two things to reason about.
        inbox_key = item["key"]
        print(f"\nuploading {item['key']}")
        s3.upload_file(str(item["path"]), args.inbox_bucket, inbox_key)
        if args.approve:
            s3.put_object_tagging(
                Bucket=args.inbox_bucket, Key=inbox_key,
                Tagging={"TagSet": [{"Key": "approved", "Value": "true"}]},
            )
            print("  tagged approved")
        else:
            print("  awaiting approval")

    for item in plan:
        for page in item.get("pages", []):
            n = substitute(page, item["local_url"], item["published_url"])
            if n:
                print(f"  {page.relative_to(REPO)}: {n} link(s) -> published URL")

    print("\nRebuild and review against the published URLs before committing.")
    return 1 if problems else 0


if __name__ == "__main__":
    raise SystemExit(main())
