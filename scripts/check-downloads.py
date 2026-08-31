#!/usr/bin/env python3
"""Fail the build if a page still points at a locally staged document.

`static/_upload/` is gitignored, so a link into it works on the machine that
staged the file and nowhere else. This is the gate that turns that asymmetry
into a guarantee: the author sees a working page, CI sees the truth, and a
document that was never uploaded surfaces in a pipeline instead of as a 404 in
front of a customer (docs/design/file-hosting.md §3).

Scans tracked files only — via `git ls-files`, matching scripts/check-video-budget.sh.
Reading the working tree instead would miss nothing here, but consistency
matters more than cleverness in a gate.

Run: python3 scripts/check-downloads.py   (or: npm run check:downloads)
"""

from __future__ import annotations

import json
import os
import pathlib
import re
import subprocess
import sys
import urllib.error
import urllib.request

REPO = pathlib.Path(__file__).resolve().parent.parent
LOCAL_REF = re.compile(r"[\"'(]\s*(/_upload/[^\s\"')]+)")
DOWNLOADS_TAG = re.compile(r"<Downloads\b([^>]*?)/?>", re.S)
ATTR = re.compile(r'(\w+)\s*=\s*"([^"]*)"')
BASE_URL = os.environ.get("WR_FILES_BASE_URL", "https://download.westonrobot.net")
# A staged reference can hide in a component as easily as in a page, so the
# local-reference scan covers source too. `<Downloads>` queries are only ever
# authored in content — scanning source as well would match this repository's
# own doc comments, which are examples rather than queries.
SCAN_SUFFIXES = {".md", ".mdx", ".tsx", ".ts", ".jsx", ".js"}
CONTENT_SUFFIXES = {".md", ".mdx"}

# The six Docusaurus plugin instances, plus src/ and plugins/ for the local-
# reference scan. `docs/` is deliberately absent: it is internal engineering
# documentation, never served, and its examples are examples rather than
# queries — scanning it made this gate report five findings against itself.
CONTENT_ROOTS = ("robot", "solution", "peripheral", "system", "tutorial", "support")
SCAN_ROOTS = CONTENT_ROOTS + ("src", "plugins")


def tracked_pages() -> list[pathlib.Path]:
    out = subprocess.run(
        ["git", "ls-files", "-z"], cwd=REPO, capture_output=True, check=True
    ).stdout
    return [
        REPO / p
        for p in out.decode().split("\0")
        if p
        and pathlib.Path(p).suffix in SCAN_SUFFIXES
        and p.split("/", 1)[0] in SCAN_ROOTS
    ]


def fetch_index() -> list[dict] | None:
    """Published documents, or None when the index cannot be reached.

    None is not a failure. Before the store exists there is nothing to check
    queries against, and a gate that fails for that reason would just be turned
    off. The local-reference check below is unconditional and does not need it.
    """
    url = f"{BASE_URL}/index.json"
    try:
        with urllib.request.urlopen(url, timeout=20) as fh:
            return json.load(fh).get("files", [])
    except (urllib.error.URLError, json.JSONDecodeError, TimeoutError, OSError):
        return None


def downloads_queries(pages: list[pathlib.Path]) -> list[tuple[str, int, dict]]:
    found = []
    for page in (
        p
        for p in pages
        if p.suffix in CONTENT_SUFFIXES
        and p.relative_to(REPO).parts[0] in CONTENT_ROOTS
    ):
        try:
            text = page.read_text(encoding="utf-8")
        except (UnicodeDecodeError, FileNotFoundError):
            continue
        if "<Downloads" not in text:
            continue
        for match in DOWNLOADS_TAG.finditer(text):
            attrs = dict(ATTR.findall(match.group(1)))
            lineno = text[: match.start()].count("\n") + 1
            found.append((str(page.relative_to(REPO)), lineno, attrs))
    return found


def unsatisfied(query: dict, files: list[dict]) -> bool:
    return not any(
        f.get("product") == query.get("product")
        and (not query.get("kind") or f.get("kind") == query["kind"])
        and (not query.get("lang") or f.get("lang") == query["lang"])
        for f in files
    )


def main() -> int:
    findings: list[tuple[str, int, str]] = []
    pages = tracked_pages()
    for page in pages:
        try:
            text = page.read_text(encoding="utf-8")
        except (UnicodeDecodeError, FileNotFoundError):
            continue
        if "/_upload/" not in text:
            continue
        for lineno, line in enumerate(text.splitlines(), 1):
            for match in LOCAL_REF.finditer(line):
                findings.append((str(page.relative_to(REPO)), lineno, match.group(1)))

    failed = False

    if findings:
        failed = True
        print(f"{len(findings)} page reference(s) point into static/_upload/:\n")
        for path, lineno, ref in findings:
            print(f"  {path}:{lineno}\n      {ref}")
        print(
            "\nThese resolve only on the machine that staged the file — static/_upload/\n"
            "is gitignored, so CI and every other checkout will 404.\n"
            "\nRun `python3 scripts/publish-files.py --publish` to upload the documents\n"
            "and rewrite these links to their published URLs, then rebuild and review.\n"
        )
    else:
        print("No page references a locally staged document.")

    queries = downloads_queries(pages)
    files = fetch_index()
    if not queries:
        print("No <Downloads> queries to resolve.")
    elif files is None:
        print(
            f"{len(queries)} <Downloads> quer(y/ies) not checked: no index at "
            f"{BASE_URL}/index.json yet."
        )
    else:
        broken = [(p, n, q) for p, n, q in queries if unsatisfied(q, files)]
        if broken:
            failed = True
            print(f"\n{len(broken)} <Downloads> quer(y/ies) match nothing in the store:\n")
            for path, lineno, query in broken:
                shown = " ".join(f'{k}="{v}"' for k, v in query.items())
                print(f"  {path}:{lineno}\n      <Downloads {shown} />")
            print(
                "\nThe page asks the store for documents it does not have. Either the\n"
                "document was never published, or the query names the wrong product."
            )
        else:
            print(f"All {len(queries)} <Downloads> quer(y/ies) resolve.")

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
