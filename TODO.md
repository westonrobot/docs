# TODO

Open items for the docs site. WHAT, not HOW. Status: `[ ]` open, `[~]` in progress, `[x]` done.

## R2026.08 release pages

- [ ] Decide whether `solution/img/fleet-detection-review.jpg` is publishable — it is a real deployment screenshot with Chinese camera names (国界摄像头) and a 2,189-detection count. Currently live on `solution/fleet-management/detection-review.md`.
- [ ] Capture the route-solve screenshot for `solution/deployment-toolbox/map-inspector.md` — "Testing that a route solves" has no figure because the running backend cannot find the pathfinding binary. It works standalone; the backend needs `TMG_PATHFINDING_BINARY=<wrdev_ws>/wra_topometric_graph/build/bin/pathfinding_query`. Verified by running the binary directly, which returned `{"found":true,…}`.
- [ ] `solution/img/toolbox-load.png` is unreferenced. Left in place deliberately — an earlier unused-image sweep deleted `toolbox-finished-map.png` while `solution/intro.md` still used it and the build failed. Re-run the reference check immediately before deleting, not before the edit that changes references.
- [ ] Open questions in `docs/design/release-pages-plan.md` §7: Toolbox/SDK delivery routes, commercial naming, R2026.08 labelling, component version visibility, WR SDK reference home.

## Site infrastructure

- [ ] `docker-compose` re-runs `npm ci` on every one-off `run` because `node_modules` is not persisted, so a bare `npm run build` in a fresh container fails to resolve `@docusaurus/plugin-client-redirects`. Make `npm ci` conditional, set `restart: "no"`, and persist the npm cache.
- [ ] `sudo rm -rf build node_modules` — root-owned artifacts from a previous Docker run. Needs the user's hands.
- [ ] Bump the Node actions in `.github/workflows/deploy.yml` to Node 20.
- [ ] Add external link checking to CI — issue #31 tracks 53 dead SharePoint links.

## Minor

- [ ] `solution/fleet-management/deployment-and-servicing.md:21` — the two subgraphs carry `direction LR`, which has no effect because neither contains edges, so the shared-cloud tenants stack vertically. Mermaid also draws the subgraphs in the reverse of the table's order (Dedicated left, Shared right). Cosmetic; the diagram reads correctly.
