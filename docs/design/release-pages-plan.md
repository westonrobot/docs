# Release Documentation Plan — R2026.08

Which customer-facing pages the Autonomy Stack release needs, where they sit in the existing IA, and the decisions taken to get there. Companion to [`ia-proposal.md`](./ia-proposal.md), which defines the site structure this plan works within.

## 0. What is being documented

The Weston Robot Autonomy Stack, a platform for industrial patrolling and inspection, built from three components: a **Robot Platform** that carries out missions, a **Fleet Management System** the customer operates the fleet from, and a **Deployment Toolbox** a technician uses to turn a site scan into a map. A customer needs all three for a working deployment.

**Source material.** The internal briefing at `wr_arch_docs/docs/release/202608/release-1-briefing.md`, the release page at `wr_arch_docs/src/overview/releases/r1.md`, and the implementing repositories `wr_fleet_management`, `wr_deployment_toolbox`, `wra_topometric_graph` and `wra_integration_interface`. The briefing is internal and cannot be ported directly — see §4.

**Research sources, never published from.** `wr_unitree_support` is an internal knowledge base on Unitree products — SDK behaviour, per-robot notes, firmware inconsistencies. Page authors working on the B2, A2, Go2, G1 and R1 pages should read it; nothing is copied from it to the site verbatim, and the site links to Unitree's own documentation for anything the vendor publishes (§7, D9).

**This is a foundation release.** Release 1 delivers the platform, not a complete application: every deployment adds the analytics that make it useful for that customer. Documentation must not imply otherwise, which is the reasoning behind D-R1 below.

## 1. Audience

| Reader | Reads | Frequency |
| --- | --- | --- |
| Operator | Fleet Management | Daily |
| Site / tenant admin | Fleet Management, Deployment Toolbox | Weekly, and at every site change |
| Technician | Deployment Toolbox | Once per site |
| Developer / partner | Analytics Integration | Once per integration |
| Evaluator | Site suitability | Before committing to a site |

Per D0 the site serves existing customers post-purchase, so every page starts from "you have bought this, here is how to run it".

## 2. Page set

### Phase 1 — ships with the release

| Page | Carries |
| --- | --- |
| `solution/fleet-management.md` | The model behind missions, deployment options, mission behaviour, roles, limits, what `R2026.08` comprises |
| `solution/deployment-toolbox.md` | Scan → clean → detect floors → waypoints → routes → zones → validate → publish → activate |
| `solution/analytics-integration.md` | Both integration paths, the event contract, unknown-token behaviour. Detail deferred |
| `solution/intro.md` *(edit)* | Regroup; retire the "In development" entries |
| Site-suitability guide | The envelope: where this works and where it does not |
| *(delete)* `industrial-patrolling.md`, `navigation.md` | Empty skeletons, never published, both 404 today |

### Phase 2 — operator and technician guides

Task guides under `tutorial/`, tagged so they surface from product pages: planning a mission, monitoring and teleoperation, reviewing events and detections, managing users and roles, surveying and publishing a site map.

### Phase 3 — hardware

A **Systems** page for the autonomy backpack, mirroring `system/ugv_devkit`: per-platform component matrix, interfaces, what is fitted on B2, A2 and Go2. Deferred because the hardware ships pre-integrated and no customer assembles it.

## 3. Decisions

| ID | Decision | Rejected alternative, and why |
| --- | --- | --- |
| **D-R1** | Three sibling Solution pages — Fleet Management System, Deployment Toolbox, Analytics Integration. No umbrella page yet. | A single `industrial-patrolling` hub. Rejected: Release 1 is a platform, not an application, so naming a page after the application over-promises. Also rejected: an `autonomy-stack` directory with sub-pages — deferred rather than dismissed, since it costs only two redirects to adopt later, and becomes more attractive once ADT retires and Solutions holds only these three. |
| **D-R2** | Product releases are labelled `R<year>.<month>`, zero-padded — `R2026.08`. Components keep `vx.y.z`. The name "Release 1" coexists with the version, as `24.04 LTS "Noble Numbat"` does. | `2026a` (MATLAB style): rejected because `202608` already exists as the release folder, so year.month *collapses* an identifier rather than adding a fifth. Bare `2026.08`: rejected because the `R` prefix makes it unmistakably a release token rather than a date, and pairs against `v` for components. Recorded in `wr_arch_docs/src/conventions/naming.md`. |
| **D-R3** | Docusaurus native versioning is **not** enabled for this release. Revisit when two versions are concurrently supported. | Enabling it now. Rejected: with one version it snapshots every page and versions the sidebars for no benefit, and turns each later fix into one edit per live version. Adopting it later is additive, not a URL migration — the newest snapshot serves at the base path. D3 amended accordingly. |
| **D-R4** | Pages document the features, the workflow, and what an action commits you to — not which button to press. **Screenshots illustrate the workflow and general operations**; what is excluded is the step-by-step, repetitive kind. | Two extremes, both rejected. A click-by-click walkthrough duplicates a self-explanatory screen, rots when a control moves, and is the most expensive content to maintain. No screenshots at all leaves a reader unable to recognise the screen being described — a systematic feature-and-workflow page needs to show the thing. Landed at roughly one image per major workflow stage. Recorded as a general rule in `ia-proposal.md` §7. |
| **D-R5** | The Deployment Toolbox is customer-facing. Site and tenant admins edit maps themselves, so the page carries real workflow procedure. | Treating it as internal WR tooling. Rejected on the product owner's statement. Note this yields *more* procedure than Fleet Management, not less — a 3D map editor is not self-explanatory, so D-R4 produces different output for the two tools. |
| **D-R7** | These are **documentation pages, not product-briefing pages**. Sections are named for what they explain — "Roles and permissions", "Planning work", "The map format" — rather than filled into the template slots product pages use. | The product-page skeleton (`Getting started` / `Key information` / `Using it` / `Troubleshooting & FAQ`). Rejected: that shape serves a reader holding a robot who needs to look one fact up, and it is the right shape for `robot/` and `peripheral/`. A software system is read to understand how it works, so the structure should follow the system's own concepts. Applies to the Analytics Integration page too. |
| **D-R6** | The event vocabulary splits by audience: operator-facing display names and urgency live on the Fleet Management page; the raw tokens are integration reference and are cited rather than reproduced. | Publishing the token list as operator reference. Rejected because operators never see tokens — `ppe_missing` renders as "Safety gear missing", and `eventtypes.go` is explicit that the raw token "must not become the title of an alert". Reproducing the tokens *as integrator reference* was also rejected, on its own merits rather than under D9: `va-registry.yaml` is normative and serves both SDK validation and fleet ingest, and the contract is 0.1.0 pre-release which "may change without notice before 1.0.0", so a copy in the docs would drift from a moving normative source. **Note:** D9 covers *vendor* reference only and does not settle where Weston Robot's own SDK reference lives — see §7. |

## 4. Deliberately excluded from the docs site

Content from the briefing that is real and useful, but belongs elsewhere:

- **"Where the engineering hours go"** — thermal design, one electronics design across A2 and B2, cabling as a reliability decision. This is persuasion; per D10 it belongs on `westonrobot.com`.
- **"What's next"** — the roadmap. Publishing it to customers converts it into a commitment. The briefing itself warns that quoting these items has been "a recurring and expensive error".
- **The before/after transformation narrative** — internal framing about what Weston Robot used to operate.
- **Internal candour about shared-cloud upgrades** — the *decision* between deployment models is customer-facing; the reasoning about restarting services for other tenants is not.

## 5. Terminology

Customer-facing pages use the canonical vocabulary in `wr_arch_docs/src/conventions/glossary.md`, which is sourced from the implementing repositories rather than from prose. Three points that have already caused drift:

- **Roles** are `observer`, `operator`, `auditor`, `site_admin`, `tenant_admin`, `platform_admin`. There is no "supervisor". `site_admin` and `tenant_admin` are the same authority at different scope.
- **Waypoint**, not "stop". TMG defines two node types, `waypoint` and `charging`; a "stop" is not a map object, it is a waypoint a mission uses.
- **Map activation is a tool boundary, not a separation of duties.** `maps:write` and `maps:activate` are both admin-tier, so one administrator can author and activate. The Deployment Toolbox cannot activate at all. Do not describe this as requiring a second person.

## 6. Delivery and updates

The Autonomy Stack is not distributed the way the existing solution skeletons assume. The apt package source is one channel among several and must not be presented as the route for everything.

| Component | How it reaches the customer |
| --- | --- |
| Fleet Management | Shared cloud for short-term POC and demonstration; a dedicated instance, cloud or on-premise, for a serious site deployment |
| Onboard software | Updated by Weston Robot only — in-person maintenance, or SSH over Weston Robot's VPN. **No customer self-service update path.** |
| Deployment Toolbox | Open — see §7 |
| Go and Python SDKs | Open — see §7 |

The update path has a prerequisite worth surfacing before a site survey rather than during one: it requires VPN access and SSH to the robot. The briefing records that on-site SSH was refused outright by some customers' security rules, and those customers will refuse again.

## 6a. Running the apps for screenshots

Both frontends run standalone, with no backend, infrastructure or credentials — which is how the screenshots on these pages were captured and how they should be refreshed.

```bash
# Fleet Management — mock API, seeded with sites, robots and a navigation map
cd wr_fleet_management/frontend && VITE_MOCK_API=true npm run dev     # :5173

# Deployment Toolbox — auth disabled
cd wr_deployment_toolbox/frontend && VITE_AUTH_ENABLED=false npx vite --port 3002
```

Note `npm run dev:mock` in Fleet Management does **not** work on its own: it runs `vite --mode mock`, which loads a `.env.mock` that does not exist, so `VITE_MOCK_API` stays unset and the SPA calls the real API. Set the variable explicitly.

The full dev stack (`scripts/dev/dev-run-infra.sh`) is not needed for screenshots and is considerably more work — it requires Go 1.25+, six Docker services, and a NATS key regeneration whose documented fix destroys the dev volumes.

## 7. Open

1. **Deployment Toolbox and SDK delivery routes** — how a technician obtains the Toolbox, and how the Go and Python SDKs are distributed.
2. **Commercial naming** — whether the contract or quote uses names other than "Fleet Management System" and "Deployment Toolbox".
3. ~~**Role strings in the UI**~~ — **resolved.** `wr_fleet_management/frontend/src/pages/manage/tenant-roles.ts` (`roleLabel`) is authoritative: `admin` displays as **Site Admin**, `operator` as **Operator**, `observer` as **Observer**, `auditor` as **Auditor**. Customer-facing pages use those labels, not the API identifiers. `tenant_admin` and `platform_admin` are not in that switch and fall through to the raw string — worth confirming how tenant-level administrators are presented before those two are named on a page.
4. **`R2026.08` labelling rule** — assigned at planning time or at ship time, and what happens to the label if a release slips its month.
5. **Component version visibility** — whether a customer can see component versions at all, which decides whether a version mapping table is customer-facing or support-facing. Both apps do show a build stamp in the UI (`v<version> · <commit>`), and at the time of writing `devel` carries Fleet Management **0.5.0** and Deployment Toolbox **0.6.0**.
6. **Alert threshold in the briefing** — the briefing implies only critical events page someone; `eventtypes.go` alerts at HIGH and above, which is 12 of 25 types, not 2.
7. **Where Weston Robot's own SDK reference lives.** D9 sends *vendor* reference off-site, which is settled and correct. It does not cover our own SDKs, and there is currently no external destination: the Python SDK sits at `wr_fleet_management/sdk/python/wr_integration` with no README, no Go integration SDK was found anywhere in the workspace despite the briefing promising one, and module paths use the private `github.com/westonrobot-dev` org so nothing surfaces on pkg.go.dev. Deferring is defensible while `wra_integration_interface` is 0.1.0 and explicitly unreleased.
