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
- **Redirects.** `@docusaurus/plugin-client-redirects` only emits redirect stubs during `docusaurus build`, never during `docusaurus start`. The dev server also serves `index.html` for unknown routes, so an old URL can look like it works in development while actually rendering the wrong thing. To check one:

  ```bash
  npm run build && npm run serve
  ```

## Adding or restructuring a product page

Follow [`docs/design/product-page-template.md`](docs/design/product-page-template.md). It fixes the section order, and the order is an argument about the reader rather than a convention: this site serves customers who already own the hardware, so the page starts from "you have bought this, here is how to run it". Marketing-shaped prose belongs on `westonrobot.com`.

Add the page to the section's `sidebars-*.ts`, or it will build and be unreachable.

## One-time AWS setup

Only needed to **publish or retire** documents. Editing pages, adding videos and every CI check work without any of this.

**1 · AWS CLI v2.** Not in apt — use AWS's installer:

```bash
curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o /tmp/awscliv2.zip
unzip -q /tmp/awscliv2.zip -d /tmp && sudo /tmp/aws/install
aws --version          # expect aws-cli/2.x
```

**2 · boto3**, which the publish script uses. The AWS CLI does **not** provide it — v2 bundles its own private Python:

```bash
sudo apt install python3-boto3        # or: pip install boto3, in a virtualenv
```

**3 · Credentials.** Ask an admin for an access key, and to add you to the IAM group `DocsDownloadPublishers` — that grant is `PutObject`, `GetObject`, `ListBucket` on the store plus CloudFront invalidation, and deliberately **no delete**.

```bash
aws configure                          # key, secret, region ap-southeast-1, output json
aws sts get-caller-identity            # expect your user ARN in account <account-id>
```

**4 · The distribution id**, so publishing invalidates the CDN. Put it in your shell profile:

```bash
export WR_FILES_DISTRIBUTION_ID=E2SQLRWCEUM8UK
```

Without it publishing still works — published keys are immutable — but `index.json` takes up to a minute to catch up.

**5 · Prove it, with one command:**

```bash
python3 scripts/publish-files.py --list
```

If that prints the published documents, everything above is correct. If it cannot reach AWS it says which part is missing rather than raising a traceback.

`WR_FILES_BUCKET` and `WR_FILES_BASE_URL` also exist as overrides. Leave them alone unless you are pointing at a different store; the defaults are the live one.

## Publishing a downloadable document

Manuals, SDK archives, firmware. These live in the file store, never in git — the repository is already ~350 MB packed, and git history is permanent.

1. Put the file in `static/_upload/<section>/<product>/`, **at the path it will occupy in the store**: `static/_upload/robot/wr65/wr65-user-manual-en-v2.3.pdf`. The directory is gitignored.

   **The name matters** — it carries all the metadata and is checked rather than trusted. See [Naming a document](#naming-a-document) below before you copy anything in.
2. `npm run start` and check the page. The link works locally, so you are reviewing the real thing.
3. `python3 scripts/publish-files.py` shows what it would do. Add `--publish` to upload and rewrite the page's link to the published URL.
4. Rebuild and look again. The second review is against exactly what a customer gets.

### Has it actually gone up?

`python3 scripts/publish-files.py` answers this without uploading anything. It compares each staged file's digest against the published index and reports one of:

| | |
| --- | --- |
| `=` published | in the index, digest matches — done |
| `!` differs | in the index under this key, but the bytes changed |
| `+` new | not uploaded |

It also lists objects in the store with nothing staged locally. That is the normal state for anything already published — the local copy is meant to be cleaned up — so it is a report, not an error. Nothing is ever deleted automatically: published paths are permanent, and removing one needs admin credentials.

**Without any AWS access at all**, the published index is public:

```bash
curl -s https://download.westonrobot.net/index.json | grep wr65
```

That is the same file the site build reads, so if a document is in there it is live.

`npm run check:downloads` fails if a page still points into `static/_upload/`. That is not a lint rule — CI has no copy of your local file, so such a page would 404 for everyone but you.

The path convention is [ADR 0001 D4](docs/adr/0001-host-downloadable-documents-on-s3.md): `/<section>/<product>/<file>`, and a published path is **never renamed or deleted**. A customer's bookmark, a QR code printed on a chassis and a support email from 2024 all depend on that.

### Naming a document

**The filename is the metadata.** Nothing else records the version, the language, or what kind of document it is — the name is parsed, and every segment ends up somewhere a customer sees. Get it wrong and the script refuses to upload; it never guesses.

```
static/_upload/<section>/<product>/<product>-<kind>[-<subject>]-<lang>-v<version>.<ext>
                                   └─────────── the filename carries it all ───────────┘
```

| Segment | Rules | Where it ends up |
| --- | --- | --- |
| `<section>` | one of `robot`, `solution`, `peripheral`, `system`, `tutorial`, `support` | first path segment of the URL |
| `<product>` | lowercase and hyphens. **Must match the page's `<Downloads product="…" />`** or the document will not appear | second path segment — this is what groups every file for one robot |
| `<product>-` | the filename repeats the product slug | so the name still means something once someone has saved it to a desktop |
| `<kind>` | **one of the listed values below** — not free text | the **Document** column, tidied for display: `user-manual` → "User manual" |
| `<subject>` | **optional**, free text, lowercase and hyphens. Use it when a product has more than one of a kind — a CAD model of the body *and* of a wheel kit, a manual for the robot *and* for an accessory | appended to the **File** column: `CAD · Off road wheel`. Without it two such files share a key and the second silently overwrites the first |
| `<lang>` | **one of `en`, `zh`, `zh-hans`, `zh-hant`** | the **Language** column |
| `v<version>` | `v` then digits and dots: `v2`, `v2.0`, `v2.0.1` | the **Version** column, sorted numerically so `v2.1` correctly beats `v2.0.9` |
| `<ext>` | must be in the publishable set — PDF, ZIP, tar.gz, MP4, XLSX and a few others | sets `Content-Type`; an unlisted extension is refused rather than served as a generic download |

**Use the version printed on the document itself.** It becomes part of a permanent URL that is never renamed (ADR 0001 D4), so a guessed version is wrong forever.

#### When one product has several of the same kind

`scout-mini` has a CAD model of the chassis and another of an off-road wheel. Both are `kind=cad`, so without a subject they produce the same key and the second overwrites the first — silently, because versioning makes it recoverable but nothing reports it.

```
scout-mini-cad-zxx-v2021.03.02.zip                  → CAD
scout-mini-cad-off-road-wheel-zxx-v2020.10.29.zip   → CAD · Off road wheel
```

The subject is whatever distinguishes them, and it parses unambiguously **because `kind` is a closed vocabulary**: the longest kind that starts the middle wins, and `cad-off` is not a kind so it cannot be read that way.

A hyphenated subject renders with spaces — `off-road-wheel` becomes "Off road wheel" — so prefer a name that reads correctly that way.

#### The `kind` vocabulary

Fixed on purpose, and covering what a hardware documentation site normally carries. Free text here is how a store ends up holding `cad`, `CAD`, `STP` and `STL` for the same thing — at which point `<Downloads kind="…" />` stops being usable and the Document column reads inconsistently.

| Group | Values |
| --- | --- |
| Operating the product | `user-manual` · `quick-start` · `installation-guide` · `service-manual` · `troubleshooting` |
| Specification and compliance | `datasheet` · `safety-manual` · `certificate` · `spare-parts` |
| Engineering artefacts | `cad` · `wiring-diagram` · `firmware` |
| Software | `sdk-manual` · `api-reference` · `api-examples` · `integration-guide` |
| Other | `training` · `release-notes` |

Three that catch people out:

- **`cad` covers STEP, STL and DXF.** The format is the extension; the kind is what the document *is*.
- **`manual` is not a value** — use `user-manual`, so it cannot drift apart from itself.
- **Chinese is `zh`, never `cn`.** Language is one of `en`, `zh`, `zh-hans`, `zh-hant`.

If something genuinely new comes along, add it to `KINDS` in `scripts/wrfiles.py`. The moment's thought about whether it duplicates a value already there is the entire point of the list.

#### Worked examples

| Filename | Renders as | URL becomes |
| --- | --- | --- |
| `scout-mini-user-manual-en-v2.0.1.pdf` | User manual · en · v2.0.1 | `download.westonrobot.net/robot/scout-mini/scout-mini-user-manual-en-v2.0.1.pdf` |
| `scout-mini-user-manual-zh-v2.0.1.pdf` | User manual · zh · v2.0.1 | `download.westonrobot.net/robot/scout-mini/scout-mini-user-manual-zh-v2.0.1.pdf` |
| `scout-mini-quick-start-en-v1.pdf` | Quick start · en · v1 | `download.westonrobot.net/robot/scout-mini/scout-mini-quick-start-en-v1.pdf` |
| `scout-mini-cad-en-v1.zip` | Cad · en · v1 | `download.westonrobot.net/robot/scout-mini/scout-mini-cad-en-v1.zip` |
| `wr65-wire-protocol-en-v3.2.pdf` | Wire protocol · en · v3.2 | `download.westonrobot.net/robot/wr65/wr65-wire-protocol-en-v3.2.pdf` |

The two Scout Mini rows differ only by language, and both appear in the same table — one row each, no page edit. That is the point of the convention: the store answers `product="scout-mini"` with everything it has.

#### What gets rejected, and what you will see

Run `python3 scripts/publish-files.py` first — the dry run reports every problem before anything uploads.

| Rejected name | Why |
| --- | --- |
| `scout-mini-manual.pdf` | missing the language and version |
| `scout-mini-manual-en.pdf` | missing the version |
| `Scout-Mini-Manual-EN-v2.pdf` | capitals — the slug must be lowercase |
| `manual-en-v2.0.pdf` | does not start with the product slug |
| `scout-mini-tool-en-v1.exe` | `.exe` is not in the publishable set |
| `_upload/robot/ugv/scout-mini/…` | one directory too deep — it is `<section>/<product>/`, with no category between |

Adding a genuinely new file type is a deliberate act: add it to `CONTENT_TYPES` in `scripts/wrfiles.py` with the right MIME type, rather than letting an unknown extension be served as a generic download.

## Retiring a document

Something published by mistake, with the wrong metadata, or withdrawn by the manufacturer. Find it first — keys are long and must match exactly:

```bash
python3 scripts/publish-files.py --list scout-mini
python3 scripts/publish-files.py --retire <key-or-url>
```

`--list` prints each key on its own line to copy, and marks anything already retired. Looking at a wrong row on a page? Right-click the link, copy it, and paste the URL — that works too.

It disappears from the table. **It is not deleted and its URL keeps resolving** — a bookmark, a QR code printed on a chassis and a support email from 2024 all depend on that ([ADR 0001 D4](docs/adr/0001-host-downloadable-documents-on-s3.md), design §10). Reversible with `--unretire`.

A *superseded* manual is usually not retired: a robot sold in 2021 is still in service and its operator still needs the 2021 manual. The table shows newest first within a kind, which is normally what you want.

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
