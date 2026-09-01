# Contributing

[`README.md`](README.md) gets the site running. This file is what to do once it is.

Everything here is a **task**. Where a task has reasoning behind it, this file links to the document that holds the reasoning rather than restating it — a second copy of an argument is a second thing to keep true, and the copy nobody builds against is the one that rots.

## Who this is for

This repository is edited by people writing documentation. **Technicians publishing a manual do not need it** — they upload through the AWS console and never clone anything. That flow is [`docs/design/file-hosting.md` §3](docs/design/file-hosting.md).

## Before you open a pull request

```bash
npm run check:video && npm run test:files && npm run check:downloads \
  && npm run typecheck && npm run build
```

CI runs the same five. The first three need only `python3` and finish in seconds, so a naming or publishing mistake fails fast rather than after an install and a build.

## Editing a page

Edit the `.md` or `.mdx` file, run `npm run start`, look at it. That is the whole workflow.

Two things the dev server will not catch, and `npm run build` will:

- **Broken internal links and anchors.** `onBrokenLinks` and `onBrokenAnchors` are both set to `throw`, deliberately — see [`docs/design/ia-proposal.md`](docs/design/ia-proposal.md).
- **Redirects.** They are only emitted by a production build, and the dev server serves `index.html` for unknown routes, so an old URL can look like it works while rendering the wrong page.

## Adding or restructuring a product page

Follow [`docs/design/product-page-template.md`](docs/design/product-page-template.md). It fixes the section order, and the order is an argument about the reader rather than a convention: this site serves customers who already own the hardware, so the page starts from "you have bought this, here is how to run it". Marketing-shaped prose belongs on `westonrobot.com`.

Add the page to the section's `sidebars-*.ts`, or it will build and be unreachable.

## Publishing a downloadable document

Manuals, SDK archives, firmware. These live in the file store, never in git — the repository is already ~350 MB packed, and git history is permanent.

1. Put the file in `static/_upload/<section>/<product>/`, **at the path it will occupy in the store**: `static/_upload/robot/wr65/wr65-user-manual-en-v2.3.pdf`. The directory is gitignored.
2. `npm run start` and check the page. The link works locally, so you are reviewing the real thing.
3. `python3 scripts/publish-files.py` shows what it would do. Add `--publish` to upload and rewrite the page's link to the published URL.
4. Rebuild and look again. The second review is against exactly what a customer gets.

`npm run check:downloads` fails if a page still points into `static/_upload/`. That is not a lint rule — CI has no copy of your local file, so such a page would 404 for everyone but you.

The path convention is [ADR 0001 D4](docs/adr/0001-host-downloadable-documents-on-s3.md): `/<section>/<product>/<file>`, and a published path is **never renamed or deleted**. A customer's bookmark, a QR code printed on a chassis and a support email from 2024 all depend on that.

## Adding a video

Short UI screen recordings go in the repository, under `<section>/video/`, referenced with the `<Video>` component. Keep camera originals in `<section>/video/raw/` — gitignored, and **not backed up by git**, so keep a copy elsewhere.

`npm run check:video` enforces 10 MiB per file and 40 MiB across all tracked video ([ADR 0001 D8](docs/adr/0001-host-downloadable-documents-on-s3.md)). Two costs sit behind that: the GitHub Pages size ceiling, and git history being permanent — a clip re-encoded once per release costs its full size *every* time.

Anything larger, or anything re-shot on a release cadence, belongs in the file store. Long-form video belongs on a video platform; the docs already link Bilibili and YouTube.

## Moving or renaming a page

Add a redirect in `docusaurus.config.ts`. Old URLs are in circulation with customers and pasted into support tickets, so a moved page without a redirect is a broken link for someone who has no idea the page moved.

## Recording a decision

- **Design decisions** → an ADR in `docs/adr/`, including the rejected alternatives and *why*. A decision without its discarded options cannot be re-evaluated later.
- **Findings and follow-ups** → [`TODO.md`](TODO.md), with the `file:line` and how it was verified.
- **Operational lessons** → [`docs/LESSONS.md`](docs/LESSONS.md), in Pattern / Correction / Context form.

If an accepted decision contradicts an existing document, fix that document in the same change. An ADR that disagrees with the design doc is worse than no ADR.

## Where things are

| Looking for | File |
| --- | --- |
| Site structure and audience | `docs/design/ia-proposal.md` |
| How a product page is laid out | `docs/design/product-page-template.md` |
| How the file store works | `docs/design/file-hosting.md` |
| Why the file store exists, and its decisions | `docs/adr/0001-host-downloadable-documents-on-s3.md` |
| Deploying the file store infrastructure | `infra/README.md` |
| Mistakes already made once | `docs/LESSONS.md` |
| What is open | `TODO.md` |
