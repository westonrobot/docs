---
name: retire-file
description: Stop a document appearing in a product page's download table, without deleting it or breaking its URL. Use when something was published by mistake, has the wrong metadata, is a revision that should no longer be offered, or has been withdrawn by the manufacturer. Also use to restore a document that was retired. Never use it to tidy up — retiring is about what customers are offered, not about what the store holds.
---

# Retiring a document

Retiring hides a document from the `<Downloads>` table. **It does not delete
it, and the URL keeps resolving.** That split is the whole point:

> A document leaving the docs site is not a document leaving the bucket. Two
> separate decisions, and conflating them is how bookmarks break.
> — `docs/design/file-hosting.md` §10

A customer's bookmark, a QR code printed on a chassis and a support email from
2024 all resolve to a published key. ADR 0001 D4 makes those permanent, so
nothing here removes an object.

## When it is the right tool

- **Published by mistake** — wrong file, wrong product, wrong version in the name.
- **Wrong metadata** — the key says `user-manual` and it is a service manual. Publish the correct key, then retire the wrong one.
- **Withdrawn** — the manufacturer has pulled a revision, or a firmware image turned out to be bad.

## When it is not

- **A superseded manual is not retired by default.** A robot sold in 2021 is still in service and its operator still needs the 2021 manual. The table sorts newest first within a kind; showing both is usually correct.
- **Never to tidy.** An old-looking row is not a reason. If a customer could still be running that hardware, leave it.

## Doing it

```bash
python3 scripts/publish-files.py --retire <key>
```

The key is the path after the hostname — `robot/scout-mini/scout-mini-cad-off-road-wheel-zxx-v2020.10.29.zip`. Take it from `index.json` or the stack's bucket listing rather than retyping it.

It sets `retired` to today's date in the object's metadata, rebuilds `index.json`
and invalidates the CDN. Reversible: `--unretire <key>`.

## Verify both halves

Neither alone is enough — the point is that one thing changed and the other did not.

```bash
# 1 · still served, still the right headers
curl -sI https://download.westonrobot.net/<key> | grep -iE '^HTTP|content-type'

# 2 · flagged in the index rather than absent from it
curl -s https://download.westonrobot.net/index.json | grep -A2 <key>

# 3 · gone from the table
npm run build && npm run serve      # then the product page
```

Allow up to a minute for `index.json`; that is the invalidation propagating,
not a failure. Check `X-Cache` before re-running anything.

## Why metadata and not deletion

The index reports every object in the bucket, retired ones included, and the
component filters them. Keeping the index a faithful projection matters: it is
derived from the store, and a curated index would be a second source of truth
that can disagree with the first.

It also means retirement is visible. Someone reading `index.json` can see that a
document exists and has been withdrawn — which is a different and more useful
fact than it having silently vanished.
