# ADR 0001 — Host downloadable documents on S3, behind a domain we own

- **Status:** Accepted
- **Date:** 2026-08-31
- **Related:** issue #31 (dead SharePoint links), [`../design/file-hosting.md`](../design/file-hosting.md) for how it is built and operated, `docs/LESSONS.md`

## Context

The docs site links out to documents that are not part of the site: product manuals, SDK and wire-protocol specs, training decks, firmware and software archives, and — from R2026.08 onward — screen recordings. Until now these lived on Microsoft 365 anonymous share links under `tangrobot.sharepoint.com`. Every one of them is dead.

**What broke.** The M365 tenant was renamed `tangrobot` → `westonrobot`, and the old hostname stopped existing in public DNS. Issue #31 verified this with `dig @1.1.1.1 tangrobot.sharepoint.com` returning `NXDOMAIN` while `westonrobot.sharepoint.com` returns `NOERROR` and `microsoft.sharepoint.com` resolves normally. Re-checked on 2026-08-31: `curl -L` against three of the links returns `000` — resolution failure, not `403` or `404`. Rewriting the host to the new tenant returns `404` for the share tokens, so the shares must be re-issued from inside the tenant, not merely rewritten.

**Why it broke, precisely.** The links failed not because SharePoint is unreliable but because their durable identity — the string `tangrobot` — was a fact about the company, encoded in a namespace Microsoft owns. When the fact changed, 53 links died at the same instant. The control case is on the same pages: the 30 `forms.office.com/r/…` links still return `200`, because that hostname is Microsoft's own and carries nothing about us.

**The stopgap repeated the mistake.** Commit `adce7c6` ("replace expired SharePoint links with Google Drive") moved four Weston Robot documents — the G1 and B2 training decks, the Go2 user guide, the expansion-dock reflash guide — to `drive.google.com/file/d/…?usp=drive_link`. These are opaque tokens in a vendor namespace: the same failure class, a different vendor.

**Counts.** Issue #31 recorded 53 occurrences across 39 unique documents in 11 files at audit time. The tree at `f4fe89f` holds 48 occurrences, 34 unique documents, 8 files, plus the 4 Google Drive links from `adce7c6`.

**What already exists.** `deb.westonrobot.net` is served from S3 in an AWS account the company already operates. Probed on 2026-08-31: `http://` returns `200` with `Server: AmazonS3` and no `Via:` or `X-Cache:` header, so there is no CloudFront in front; `https://` times out with no bytes received. It is a bare S3 *static website endpoint*, which is plaintext-only by design — a certificate cannot be attached to one.

**What is in scope.** Public content only: PDFs, software archives, and video. No licence-gated or customer-restricted items (decided 2026-08-31). Mainland-China download performance is explicitly not a requirement for now.

**Repository weight, which constrains one of the alternatives.** `.git` is 465 MB on disk, 351 MiB packed. The two shipped video re-encodes are 2.7 MB and 3.0 MB; their masters, at 11 MB and 6.9 MB, are excluded by `.gitignore`, whose comment notes they are therefore backed up nowhere.

## Decision

**D1. The customer-facing URL is a Weston Robot domain under our own administration.** `download.westonrobot.net` is the only hostname that ever appears in a doc page, an email, or a datasheet. This is the decision that fixes the defect; every other decision here is implementation.

*Amended 2026-08-31.* Originally `files.westonrobot.com`, chosen to match the documentation site. Both halves changed.

**The domain** is `westonrobot.net` because it is in Route 53 in this account and directly administered, while `westonrobot.com` is on Cloudflare — verified: `dig +short NS westonrobot.com` returns `brian`/`marlowe.ns.cloudflare.com`, and Route 53 in <account-id> holds only the `.net` zone. The defect being fixed was a permanent URL living in a namespace nobody here administered, so preferring the tidier TLD over the one under direct control would repeat the shape of that mistake for the sake of appearances. It also makes the apply fully automatic: Terraform creates the certificate validation records and the alias itself, where `.com` would need both added by hand in Cloudflare, at every renewal, by whoever holds that account.

**The subdomain** is `download` rather than `files` because it names what a customer does there. `files` describes the storage; `download` describes the act, and the hostname exists for the person clicking a link rather than for the people running the bucket.

**`download.westonrobot.net` is production.** The `.net` domain is otherwise used for development and internal infrastructure, and `deb.westonrobot.net` already serves customers from it. Under D4 these URLs are permanent and end up in customer bookmarks, printed QR codes and support email, so this subdomain must not be treated as disposable when the `.net` estate is next tidied up.

**D2. Storage is S3; the front is CloudFront with an ACM certificate.** Not a bare website endpoint. TLS is required for three independent reasons: video embedded in an HTTPS page is blocked as mixed active content; a browser downloading a software archive verifies nothing, so plaintext means the payload is substitutable in transit; and a "Not Secure" warning on a customer download from the documentation site is not acceptable. CloudFront is the only component that terminates TLS for a custom domain in front of S3.

The bucket lives in `ap-southeast-1`, matching the rest of the company's AWS footprint. Verified 2026-08-31 against the existing bucket, whose REST endpoint returns `x-amz-bucket-region: ap-southeast-1` — the website endpoint does not carry that header, which is why the earlier probe could not confirm it. There is no availability zone to choose: S3 is a regional service and replicates objects across the AZs of its region automatically, so `ap-southeast-1a` describes where the compute footprint sits rather than anything a bucket configures. With CloudFront in front, the origin region governs cache-miss latency and little else.

**D3. The bucket stays private, reachable only through CloudFront Origin Access Control.** The content is public, so this is not access control — it is enforcement of D1. A public bucket makes `https://<bucket>.s3.<region>.amazonaws.com/manual.pdf` work as well as the branded URL, and the wrong one gets pasted into an email eventually. OAC makes the vendor-namespace URL return `403`, so the URL contract holds mechanically rather than by discipline.

**D4. Paths are structured, versioned, and immutable, and grouped by product.** The shape is `/<section>/<product>/<document>-<lang>-v<version>.<ext>`, e.g. `/robot/wr65/wr65-user-manual-en-v2.3.pdf`. Every file belonging to one robot therefore shares one prefix, and anyone holding one of its URLs can predict the rest. A published path is never renamed or deleted; a new revision gets a new path and the old one keeps resolving. Where "the current manual" needs a stable address, a short `latest/` alias points at the versioned object.

*Amended 2026-08-31.* The shape was originally `/<category>/<product>/…`, mirroring the docs page path — `/robot/manipulator/wr65/…`. The middle segment is dropped deliberately. `robot`, `solution`, `peripheral` and `system` are structural, one per Docusaurus plugin instance; `wr65` is the product's identity. `manipulator` is neither — it is a taxonomy choice, and taxonomy is precisely what moves. The repository has five rename commits in its content directories, including `system/ugv_devkit/v1.0/` → `v1/` and `system/ugv_devkit/software/` → `v1/`, so this is observed rather than hypothetical. **The consequence is intended:** if a robot is reclassified, its page moves and its files do not, because immutability outranks correspondence. A file prefix that mirrors the navigation is a file prefix that inherits the navigation's churn.

**D5. `Content-Type` and `Cache-Control` are set at upload, not left to inference.** `aws s3 sync` infers correctly from common extensions, but firmware blobs and unusual archive types need `--content-type` given explicitly, and `.mp4` must be `video/mp4` or Safari will not seek. Versioned paths take a long `max-age`; any `latest/` alias takes a short one, or CloudFront will serve a superseded manual for a year.

**D6. External link checking runs in CI.** 53 links died at a single point in time and were found by a manual audit weeks later. Without this check the class of defect is invisible again the moment the next thing moves.

**D7. The four Google Drive links migrate with the rest.** They are Weston Robot's own documents on a third-party share URL and carry the same risk.

**D8. Video stays in this repository while it is small and stable; everything else goes to the bucket.** The threshold is 10 MiB per file and 40 MiB across all tracked video, together with a judgement that the clip is not expected to be re-recorded on a release cadence. Keeping small video in-repo is worth doing because `require()` resolves at build time, so a renamed or deleted file is a build failure — the same guarantee `onBrokenLinks: 'throw'` gives internal links, and precisely the guarantee whose absence produced issue #31. Keeping it there indefinitely is not, because git history is permanent: a 3 MB clip re-encoded once per release costs its full size again every time, unreclaimable without a history rewrite. Two costs, two halves of the rule — size and churn.

## Consequences

Recovering the source files is the blocking step and it is not a code change: someone with M365 tenant access must export the 39 documents from the renamed tenant before anything else can proceed. The WR65 and WRL63 manuals are the urgent ones — unlike the Unitree and AgileX pages there is no vendor site to fall back to, so those two products have no reachable documentation at all today.

D8's size half is enforced by `scripts/check-video-budget.sh`, wired into CI ahead of the Node setup so a breach fails in seconds rather than after a full install and build. Its churn half is a judgement made at review, because expected revision frequency is not mechanically checkable — the check enforces what is checkable and the ADR carries the rest. Raising either limit is an amendment to this document, not an edit to the script; the script says so when it fails.

The site gains a second class of external link that CI must check, since a `download.westonrobot.net` URL is not verified by the Docusaurus build the way an in-repo asset is. D6 covers this, and D4's immutability rule is what keeps the check green over time.

`deb.westonrobot.net` is left as it is by this ADR, but its lack of TLS is now a known gap rather than an unexamined default — tracked in `TODO.md`. The reasoning that makes plaintext defensible there (apt verifies GPG signatures independently of the transport) does not extend to browser downloads.

## Alternatives rejected

**Re-share the documents from `westonrobot.sharepoint.com`.** Cheapest possible fix, no new infrastructure, and it restores the links this week. Rejected because it reproduces the defect exactly: the tenant name is still in the hostname and the tokens are still revocable and opaque. The next tenant rename, migration, or sharing-policy change breaks all 39 again, and nothing about this option makes that failure any more visible than it was the first time.

**Copy the `deb.westonrobot.net` pattern — a bare S3 static website endpoint.** Consistent with existing practice and the simplest thing that satisfies D1. Rejected on TLS alone, for the three reasons in D2.

**Cloudflare R2.** Zero egress fees, S3-compatible API, custom domain and CDN built in without wiring a second service — meaningfully cheaper and simpler than S3+CloudFront, and the gap widens as video volume grows. Rejected on operational consistency: the company already runs AWS, already serves files from S3, and already has the IAM, billing, and on-call story for it. Introducing a second storage vendor to save an amount of money that is small at this volume is not a good trade. Worth revisiting if video egress ever becomes a real line item.

**Keep the files in this repository and serve them from GitHub Pages alongside the site.** This has the best safety property of any option on the list: a missing file becomes a build failure rather than a customer-facing 404, which is precisely the guarantee whose absence produced issue #31. Rejected on size. The packed repository is already 351 MiB against a 1 GB practical GitHub limit, product manuals run to tens of MB each, and video would consume the remaining headroom quickly. The property is worth preserving where it is cheap, which is why small shipped video re-encodes stay in-repo under D8.

**GitHub Releases as an asset host.** Free, effectively unmetered bandwidth, stable per-tag URLs. Rejected because the URL shape is hostile to a customer reading a manual link, "the current manual" has no natural address, and the identity in the URL is `github.com`'s rather than ours — a weaker form of the same problem as D1.

## Open

- Where video masters are backed up. Out of scope here, since this bucket is for public content — but `.gitignore` records the need and nothing satisfies it yet.
- Mainland-China performance is deferred by decision, not solved. Neither S3 nor CloudFront serves it well without an ICP-licensed presence.
