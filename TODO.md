# TODO

Open items for the docs site. WHAT, not HOW. Status: `[ ]` open, `[~]` in progress, `[x]` done.

## R2026.08 release pages

- [ ] Decide whether `solution/img/fleet-detection-review.jpg` is publishable — it is a real deployment screenshot with Chinese camera names (国界摄像头) and a 2,189-detection count. Currently live on `solution/fleet-management/detection-review.md`.
- [ ] Capture the route-solve screenshot for `solution/deployment-toolbox/map-inspector.md` — "Testing that a route solves" has no figure because the running backend cannot find the pathfinding binary. It works standalone; the backend needs `TMG_PATHFINDING_BINARY=<wrdev_ws>/wra_topometric_graph/build/bin/pathfinding_query`. Verified by running the binary directly, which returned `{"found":true,…}`.
- [ ] `solution/img/toolbox-load.png` is unreferenced. Left in place deliberately — an earlier unused-image sweep deleted `toolbox-finished-map.png` while `solution/intro.md` still used it and the build failed. Re-run the reference check immediately before deleting, not before the edit that changes references.
- [ ] Open questions in `docs/design/release-pages-plan.md` §7: Toolbox/SDK delivery routes, commercial naming, R2026.08 labelling, component version visibility, WR SDK reference home.

## File hosting — ADR 0001

Blocked on the first item; everything below it depends on having the files. `docs/design/file-hosting.md` carries the reference design, `infra/README.md` the runbook. Phases 1–3 are written and locally verified — the infrastructure, the two Lambdas, the publish script, the `<Downloads>` component and the CI gates all exist. **None of it has run against an account**, so every item below is an act of operation rather than of coding.

- [ ] Export the 39 documents from the renamed M365 tenant (`westonrobot.sharepoint.com`). Needs tenant access, not a code change. The WR65 and WRL63 manuals are the urgent ones — they have no vendor fallback, so those products have no reachable documentation today.
- [ ] **`westonrobot.com` DNS is on Cloudflare, not Route 53** — `dig +short NS westonrobot.com` returns `brian/marlowe.ns.cloudflare.com`, while Route 53 in account <account-id> holds only `westonrobot.net` (`Z016356211Y82HTRJIPRB`). So `hosted_zone_id` must stay empty for a `.com` hostname: the apply finishes with the certificate `PENDING_VALIDATION`, and someone adds the ACM validation CNAME and the alias CNAME in Cloudflare by hand, **DNS-only (grey cloud)** so Cloudflare does not proxy in front of CloudFront. Choosing `files.westonrobot.net` instead would make the apply fully automatic; it also puts customer downloads on the TLD currently used for infrastructure (`deb.westonrobot.net`).
- [ ] Apply `infra/` — written and validated, never run against an account, so treat the first apply as the real test. Runbook in `infra/README.md`.
- [ ] **IAM Identity Center is not enabled in this account** — `aws sso-admin list-instances` returns nothing. The design assumes permission sets; until it is enabled, attach `wr-files-upload` and `wr-files-approve` to an IAM group with console access and enforced MFA instead. Give technicians the bookmark from `terraform output inbox_console_url`.
- [ ] Bulk-load the exported documents under D4 paths, then invoke `wr-files-reindex` once by hand — reindexing is triggered by promotion, not by a bucket notification.
- [ ] Rewrite the 48 SharePoint occurrences (34 unique documents, 8 files) to the new URLs.
- [ ] Rewrite the 4 Google Drive links added by `adce7c6` — `robot/humanoid/g1.md:51`, `robot/quadruped/b2.md:57`, `robot/quadruped/go2.md:53,54`. They are Weston Robot's own documents on opaque third-party share tokens: the same failure class as the SharePoint links, one vendor over.
- [ ] Exercise `scripts/publish-files.py --publish` against the real inbox once it exists. The dry run, key derivation, page detection and link substitution are all verified locally; the upload and tagging calls have never run.
- [ ] Wrap the publish script in a Claude Code skill, alongside `vendor-interface-summary`. The script stays runnable standalone — CI needs it and not everyone has the skill.
- [ ] Decide whether `reindex` should trigger a docs-site rebuild via `repository_dispatch`. It needs a GitHub token in AWS, which is a secret to manage and a decision to take on its own.
- [ ] Find a home for video masters. `.gitignore` excludes `**/video/raw/` and says they are backed up nowhere; that is still true. Out of ADR 0001's scope, which covers public content only.

## Site infrastructure

- [ ] `docker-compose` re-runs `npm ci` on every one-off `run` because `node_modules` is not persisted, so a bare `npm run build` in a fresh container fails to resolve `@docusaurus/plugin-client-redirects`. Make `npm ci` conditional, set `restart: "no"`, and persist the npm cache.
- [ ] `sudo rm -rf build node_modules` — root-owned artifacts from a previous Docker run. Needs the user's hands.
- [ ] Bump the Node actions in `.github/workflows/deploy.yml` to Node 20.
- [ ] Add external link checking to CI — issue #31 tracks 53 dead SharePoint links. Required by ADR 0001 D6: a `files.westonrobot.com` URL is not verified by the Docusaurus build the way an in-repo asset is.
- [ ] `deb.westonrobot.net` is served over plaintext HTTP only — a bare S3 website endpoint cannot terminate TLS. Tolerable for an apt repo, where GPG signatures make integrity independent of the transport, but it should get the same CloudFront + ACM front as `files.westonrobot.com`. Separate from ADR 0001.

## Minor

- [ ] `solution/fleet-management/deployment-and-servicing.md:21` — the two subgraphs carry `direction LR`, which has no effect because neither contains edges, so the shared-cloud tenants stack vertically. Mermaid also draws the subgraphs in the reverse of the table's order (Dedicated left, Shared right). Cosmetic; the diagram reads correctly.
