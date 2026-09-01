# TODO

Open items for the docs site. WHAT, not HOW. Status: `[ ]` open, `[~]` in progress, `[x]` done.

## R2026.08 release pages

- [ ] Decide whether `solution/img/fleet-detection-review.jpg` is publishable — it is a real deployment screenshot with Chinese camera names (国界摄像头) and a 2,189-detection count. Currently live on `solution/fleet-management/detection-review.md`.
- [ ] Capture the route-solve screenshot for `solution/deployment-toolbox/map-inspector.md` — "Testing that a route solves" has no figure because the running backend cannot find the pathfinding binary. It works standalone; the backend needs `TMG_PATHFINDING_BINARY=<wrdev_ws>/wra_topometric_graph/build/bin/pathfinding_query`. Verified by running the binary directly, which returned `{"found":true,…}`.
- [ ] `solution/img/toolbox-load.png` is unreferenced. Left in place deliberately — an earlier unused-image sweep deleted `toolbox-finished-map.png` while `solution/intro.md` still used it and the build failed. Re-run the reference check immediately before deleting, not before the edit that changes references.
- [ ] Open questions in `docs/design/release-pages-plan.md` §7: Toolbox/SDK delivery routes, commercial naming, R2026.08 labelling, component version visibility, WR SDK reference home.

## File hosting — ADR 0001

**The store is live and empty.** Both stacks are deployed and the publish path is proven end to end (see below); what remains is content, and that is blocked on the first item. `docs/design/file-hosting.md` carries the reference design, `infra/RUNBOOK.md` the deployment procedure with measured timings.

- [ ] Export the 39 documents from the renamed M365 tenant (`westonrobot.sharepoint.com`). Needs tenant access, not a code change. The WR65 and WRL63 manuals are the urgent ones — they have no vendor fallback, so those products have no reachable documentation today.
- [x] Hostname decided: **`download.westonrobot.net`** (ADR 0001 D1, amended). `westonrobot.net` is in Route 53 in this account under direct administration; `westonrobot.com` is on Cloudflare (`dig +short NS westonrobot.com`). `HostedZoneId` defaults to `Z016356211Y82HTRJIPRB`, so ACM creates and resolves the validation records itself and the alias comes with the stack — no manual DNS step. Note for whoever next tidies the `.net` estate: this subdomain is production and its URLs are permanent.
- [x] **Deployed 2026-09-01.** Both stacks are up in account <account-id>: `westonrobot-files-certificate` (us-east-1, 3m15s) and `westonrobot-files` (ap-southeast-1, 19m30s). Bucket `westonrobot-files`, distribution `E2SQLRWCEUM8UK`, certificate ISSUED and renewal-ELIGIBLE. Verified: TLS terminates on `download.westonrobot.net`, the raw `s3.amazonaws.com` URL returns 403 (D3 holds), and the OAC bucket policy applied with all four public-access blocks on.
- [x] **Smoke test passed 2026-09-01.** One generated PDF published end to end and removed again: correct `Content-Type` and immutable `Cache-Control`, bytes identical on download, `index.json` derived with full metadata, `.sha256` sidecar matching, and a re-run correctly reporting `= published`. The store is empty again.
- [ ] **IAM Identity Center is not enabled in this account** — `aws sso-admin list-instances` returns nothing. Until it is, attach `westonrobot-files-publish` and `westonrobot-files-read` to an IAM group with console access and enforced MFA rather than to permission sets.
- [ ] Bulk-load the exported documents: stage them under `static/_upload/` at their D4 paths and run `publish-files.py --publish`, which uploads, indexes and invalidates in one pass.
- [ ] Rewrite the 48 SharePoint occurrences (34 unique documents, 8 files) to the new URLs.
- [ ] Rewrite the 4 Google Drive links added by `adce7c6` — `robot/humanoid/g1.md:51`, `robot/quadruped/b2.md:57`, `robot/quadruped/go2.md:53,54`. They are Weston Robot's own documents on opaque third-party share tokens: the same failure class as the SharePoint links, one vendor over.
- [ ] Wrap the publish script in a Claude Code skill, alongside `vendor-interface-summary`. The script stays runnable standalone — CI needs it and not everyone has the skill.
- [ ] Decide whether publishing should trigger a docs-site rebuild via `repository_dispatch`. It needs a GitHub token wherever the trigger lives, which is a secret to manage and a decision to take on its own.
- [ ] Turn on access logging with the Phase 4 alarm work. It is absent from the stack because merging the logs bucket into the private one makes the CloudFront logging edge circular — see `docs/design/file-hosting.md` §2. `4xxErrorRate` is available from CloudWatch without it, so the alarm is not blocked; the logs add which keys are missing.
- [ ] Find a home for video masters. `.gitignore` excludes `**/video/raw/` and says they are backed up nowhere; that is still true. Out of ADR 0001's scope, which covers public content only.

## Site infrastructure

- [ ] `docker-compose` re-runs `npm ci` on every one-off `run` because `node_modules` is not persisted, so a bare `npm run build` in a fresh container fails to resolve `@docusaurus/plugin-client-redirects`. Make `npm ci` conditional, set `restart: "no"`, and persist the npm cache.
- [ ] `sudo rm -rf build node_modules` — root-owned artifacts from a previous Docker run. Needs the user's hands.
- [ ] Bump the Node actions in `.github/workflows/deploy.yml` to Node 20.
- [ ] Add external link checking to CI — issue #31 tracks 53 dead SharePoint links. Required by ADR 0001 D6: a `download.westonrobot.net` URL is not verified by the Docusaurus build the way an in-repo asset is.
- [ ] `deb.westonrobot.net` is served over plaintext HTTP only — a bare S3 website endpoint cannot terminate TLS. Tolerable for an apt repo, where GPG signatures make integrity independent of the transport, but it should get the same CloudFront + ACM front as `download.westonrobot.net`. Separate from ADR 0001.

## Minor

- [ ] `solution/fleet-management/deployment-and-servicing.md:21` — the two subgraphs carry `direction LR`, which has no effect because neither contains edges, so the shared-cloud tenants stack vertically. Mermaid also draws the subgraphs in the reverse of the table's order (Dedicated left, Shared right). Cosmetic; the diagram reads correctly.
