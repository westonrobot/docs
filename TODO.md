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
- [x] **Publishing granted 2026-09-01.** Group `DocsDownloadPublishers` carries `DocsDownloadPublish`; members are `ruixiang.du` and `timothy.lee`. Verified with `iam simulate-custom-policy` that the grant allows `PutObject`/`GetObject` on `westonrobot-files` and implicit-denies `DeleteObject`, `DeleteObjectVersion`, `PutBucketPolicy`, and any write to `deb.westonrobot.net`.
- [~] **MFA enforcement — analysed 2026-09-01, deferred deliberately.** Not a toggle: it needs an IAM policy allowing the self-service MFA actions unconditionally, then denying everything else on `BoolIfExists aws:MultiFactorAuthPresent = false`. Three things that analysis established, so nobody re-derives them:
  - An explicit **Deny** binds admins, unlike a condition on an Allow. `AdministratorAccess` grants `* on *` unconditionally, so a *condition* does nothing to it — but Deny beats every Allow, so a force-MFA policy would break `ruixiang.du`'s long-lived key for every API call, including `publish-files.py`, until exchanged via `sts:GetSessionToken`.
  - `BoolIfExists` versus `Bool` decides the blast radius. With `Bool` the condition never matches an access-key call and the Deny never fires; with `BoolIfExists` a missing key counts as false and it does.
  - The account's shape makes this unusually safe when the time comes: **all six service accounts are in no group at all**, so a group-attached policy cannot reach them, and four of five humans (`timothy.lee`, `yeshun.huang`, `hans.kurnia`, `cindy.allen`) hold zero access keys, so enforcement costs them one enrolment and nothing else.
  - **When picked up:** attach to a dedicated `MFARequired` group, not to `Developers` — `Developers` would sweep in `ruixiang.du` as a side effect.
- [ ] **Finish the access-key rotation.** `ruixiang.du`'s new key `<redacted-key-id>` is configured and verified against S3, CloudFormation, IAM and the publish path. The 2024 key `<redacted-key-id>` is **still Active** — deactivate it (reversible), leave a few days to catch anything else configured with it, then delete. Left active deliberately; the rotation is incomplete until it is gone.
- [ ] `deb-internal-ci` has **two active access keys**, which usually means a rotation someone started and did not finish. Outside this project, found while checking MFA coverage.
- [ ] Decide whether a service account may ever join `DocsDownloadPublishers`. The design keeps CI out of AWS entirely — the docs build reads the public `index.json` and holds no credentials — so adding one would put a long-lived key between a repository secret and customer downloads. `aptly-publisher` and `deb-internal-ci` already do exactly that for `deb.westonrobot.net`, which is the precedent worth deciding against rather than drifting into.
- [ ] Bulk-load the exported documents: stage them under `static/_upload/` at their D4 paths and run `publish-files.py --publish`, which uploads, indexes and invalidates in one pass.
- [ ] Rewrite the 48 SharePoint occurrences (34 unique documents, 8 files) to the new URLs.
- [ ] Rewrite the 4 Google Drive links added by `adce7c6` — `robot/humanoid/g1.md:51`, `robot/quadruped/b2.md:57`, `robot/quadruped/go2.md:53,54`. They are Weston Robot's own documents on opaque third-party share tokens: the same failure class as the SharePoint links, one vendor over.
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
