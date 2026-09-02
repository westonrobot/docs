---
name: upload-file
description: Upload a manual, datasheet, CAD file, firmware image or other document to the Weston Robot file store at download.westonrobot.net. Use whenever someone hands over a file to put on a product page, or asks to upload, publish or add a document — it establishes the product, kind, language and version, renames the file to the required convention, stages it, uploads it, verifies it served correctly, and rebuilds the site so the page can be checked locally. Also use when a document needs replacing with a newer revision.
---

# Uploading a file to the store

The store is one S3 bucket behind CloudFront. `scripts/publish-files.py` does the
upload; this skill is about getting the file named and placed correctly first,
because **the filename is the only metadata** — it becomes a permanent URL that
is never renamed (ADR 0001 D4).

Design and reasoning: `docs/design/file-hosting.md`. Author-facing rules:
`CONTRIBUTING.md` → *Naming a document*.

## Read the vocabularies before asking anything

The allowed values live in `scripts/wrfiles.py` and change over time. **Read
them; do not rely on a list memorised from a previous session or copied into
this file** — a stale vocabulary here is worse than none, because it produces
confident wrong answers.

```bash
python3 -c "import sys;sys.path.insert(0,'scripts');import wrfiles as w;print(w.KINDS);print(w.LANGS);print(sorted(w.CONTENT_TYPES))"
```

## What you must establish

Ask for whatever is missing. Ask in one message, not four.

| | How to settle it |
| --- | --- |
| **product** | The page's filename without `.md` — `robot/ugv/scout-mini.md` → `scout-mini`. Confirm the page exists; if there is no page, the document has nowhere to appear and that is worth raising before uploading. |
| **kind** | One of `KINDS`. Offer the two or three plausible ones rather than the whole list. If the user says "manual", ask whether it is `user-manual` or `service-manual` — never pick for them. |
| **subject** | Optional, and the thing most often missed. Ask whether this is *the* CAD model / manual for the product or one of several — a wheel kit, a charging dock, a battery. If there is any chance of a second file of the same kind, include it: without a subject the second one overwrites the first and nothing reports it. |
| **lang** | One of `LANGS`. Look inside the document if unsure; do not assume English. |
| **version** | **From the document itself**, or the issue date when the manufacturer gives none — `v2020.10.29`, read from the file's own header. Never `v1` by default. — cover page, revision table, footer. Open it and check. Never invent one, never default to `v1`: it is permanent. If genuinely unversioned, say so and agree one with the user rather than guessing. |
| **section** | The top-level content directory the page lives in: `robot`, `solution`, `peripheral`, `system`, `tutorial`, `support`. |

If the extension is not in `CONTENT_TYPES`, stop. Adding one is a deliberate
edit to `wrfiles.py` with the right MIME type, not something to do in passing.

## The sequence

1. **Stage it.** Copy — do not move — to
   `static/_upload/<section>/<product>/<product>-<kind>[-<subject>]-<lang>-v<version>.<ext>`.
   Copying leaves the user's original where they left it.

2. **Dry run.** `python3 scripts/publish-files.py`

   Read the output. `+ new` is what you want. A refusal names the problem and
   nothing has been uploaded — fix the name and run it again. Never work around
   a refusal by editing the script.

3. **Publish.** `python3 scripts/publish-files.py --publish`

   Needs `WR_FILES_DISTRIBUTION_ID` set, or the CDN is not invalidated —
   harmless for a new document, since published keys are immutable, but it
   delays `index.json` by up to a minute.

4. **Verify it actually served.** Not optional, and not satisfied by the script
   exiting zero:

   ```bash
   curl -sI https://download.westonrobot.net/<key> | grep -iE '^HTTP|content-type|cache-control'
   curl -s  https://download.westonrobot.net/index.json | grep <product>
   ```

   Expect `200`, the right content type, and `immutable`. If `index.json` still
   looks stale, that is the invalidation propagating — re-check after a minute
   rather than republishing.

5. **Put it on the page,** if it is not already there. One component covers
   every document for that product:

   ```jsx
   <Downloads product="scout-mini" />
   ```

   It belongs in *Related resources*, under **Documents we publish** — never in
   the hand-maintained table beside it. If the page has a dead link to the
   document you just published, delete that row.

6. **Rebuild and look.** `npm run build && npm run serve`, then the product page.

   A local build with the file still staged shows the **local** copy, badged
   `staged`. To see what a customer gets, remove `static/_upload/` first and
   rebuild — that is the build CI produces.

7. **Clean up.** Delete the staged copy once published; it is scaffolding, and
   the page now resolves from the store.

## Things that will bite

**Never delete from the store to "fix" a mistake.** The publish grant has no
`DeleteObject` by design — published paths are permanent, and a manual for
hardware still in the field outlives any reason to tidy it away
(`docs/design/file-hosting.md` §10). A wrong version number means publishing
the correct one alongside; the wrong key simply stays.

**A wrong version is unfixable.** This is the one thing worth slowing down for.
Check the document, do not infer from a filename someone else chose.

**`npm run check:downloads` must pass** before committing. It fails if a page
still points into `static/_upload/`, which means the document was never
uploaded and the page would 404 for everyone but you.

**Do not commit the file.** `static/_upload/` is gitignored deliberately; the
repository is already ~350 MB packed and git history is permanent.
