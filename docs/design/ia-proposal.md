# Information Architecture Proposal

> **Internal document — not published to the site.** The `classic` preset's default docs instance is disabled (`docs: false` in `docusaurus.config.ts`), so nothing under `docs/` is built or deployed. Keep it that way.

**Status:** draft for review · **Revision 2**, 2026-07-30 · **Scope:** audience, navigation, page structure, content-type rules, solutions, support content

## 0. Purpose and audience

This proposal responds to three stated problems:

1. It is not immediately obvious from the navigation where to find the content you want.
2. There is no consistent way to present per-model resources versus generally-applicable tutorials.
3. There is little material that eases technical-support work — Q&A, where to find a serial number, and so on.

The underlying goal: the site is under-utilised and less helpful than it could be.

**Primary audience — decided.** This site exists to support **existing customers**. It may serve a secondary marketing purpose, but that is not its target. Every recommendation below follows from that, and it is the single most consequential input to the design.

The test the architecture has to pass is therefore:

> A customer with a Scout Mini in front of them and a dead motor finds the answer in under a minute.

Not "can a prospect understand our range". This changes what matters. Discovery through search engines drops in importance; deep-linkability, anchor stability, support deflection and localisation all rise. Where an earlier revision of this document led with the canonical-URL and SEO defect, that has been recalibrated — it remains worth its one-line fix, because search is how a customer re-finds a page they have already seen, but it is not the reason to act.

**Design principle: almost no URL changes.** Every problem here is solvable through navigation, page structure, and cross-linking. Existing product URLs such as `/robot/humanoid/g1` stay exactly as they are. For a post-purchase site this is not merely convenient — support engineers paste URLs into tickets, so a broken link is a broken customer conversation, possibly months later.

---

## 1. Current state, measured

46 pages, 23,624 words, mean 513 words per page. No analytics of any kind is configured.

| Section | Pages | Words | Share |
| --- | --- | --- | --- |
| `tutorial/` | 7 | 7,962 | **33.7%** |
| `robot/` | 14 | 4,684 | 19.8% |
| `system/` | 9 | 3,821 | 16.2% |
| `software/` | 7 | 3,813 | 16.1% |
| `peripheral/` | 7 | 2,870 | 12.1% |
| `general/` | 2 | 474 | 2.0% |

Content mass and navigational prominence are inverted: the section customers naturally enter (`robot/`, 14 pages) holds a fifth of the content, while the section they may never open (`tutorial/`, 7 pages) holds a third.

The top 8 of 46 pages hold 11,231 words — **48% of everything**. The largest, `tutorial/unitree/g1_dev_guide.md` at 3,523 words, is 2.5× the next biggest and sits two tabs from the G1 product page.

---

## 2. Diagnosis

### 2.1 The top level mixes two incompatible axes

```
Robots │ Peripherals │ Systems │ Software │ Tutorials     (+ General, not in the navbar)
└─────── what you bought ──────┘ └── kind of document ───┘
```

A visitor arrives holding either **an object** ("I have a G1") or **a task** ("it won't reach the internet"). Neither maps onto that row, because three tabs answer *what is it* and two answer *what kind of page is this*. This is the root cause; the rest of this section follows from it or compounds it.

### 2.2 One product's content is scattered, and cross-links point at indexes

| Product | Content lives in |
| --- | --- |
| G1 | `robot/humanoid/g1` + `tutorial/unitree/g1_dev_guide` + `g1_diag_guide` + `g1_internet_guide` |
| Go2 | `robot/quadruped/go2` + `tutorial/unitree/go2_diag_guide` + `software/slam/go2_slam` |
| B2 | `robot/quadruped/b2` + `tutorial/unitree/b2_diag_guide` |

The product pages do link outward, but inconsistently, and often to an index rather than the target:

- `robot/humanoid/g1.md:44` — `[Guides](/tutorial/intro)` — the generic index, not the three G1 guides.
- `robot/quadruped/go2.md:48` — `[Diagnostic Guide](/tutorial/intro)` — the label promises a specific guide and delivers the index.
- `robot/humanoid/g1.md:52` — a correct deep link, buried inside an FAQ answer.

The tutorial index groups by **vendor** ("AgileX UGVs", "Unitree Quadruped Robots"), so a customer must know who manufactures their robot before they can find its guide.

### 2.3 Content exists that the navigation never shows

`software/toolbox/adt_v1.md`, `adt_v2.md` and `adt_v3.md` total **2,018 words and appear in no sidebar**, reachable only from three inline links inside a 69-word parent page.

### 2.4 Thirteen `_category_.json` files are inert, and already disagree

All five sidebars are explicit arrays, so Docusaurus ignores these files entirely — no `generated-index` category pages exist in the build. Edit one to rename a category and nothing happens, with no visible cause.

| Directory | Sidebar label | `_category_.json` label |
| --- | --- | --- |
| `robot/ugv` | `UGVs` | `Unmanned Ground Vehicles` |
| `robot/quadruped` | `Quadrupeds` | `Quadruped Robots` |
| `robot/humanoid` | `Humanoid` | `Humanoid Robots` |
| `robot/manipulator` | `Manipulators` | `Robotic Manipulators` |
| `tutorial/unitree` | `Humanoid Tutorials` / `Quadruped Tutorials` | `Unitree Tutorials` |

`robot/humanoid` and `robot/manipulator` also both claim `"position": 4`.

### 2.5 Two internal links bypass the build's link checker

`apt_source` is a shared prerequisite referenced from three pages, two of them by fully-qualified URL:

```
software/toolbox/adt_v2.md:17              https://docs.westonrobot.com/software/installation/apt_source
software/toolbox/adt_v3.md:17              https://docs.westonrobot.com/software/installation/apt_source
peripheral/power/power_regulator_v2.md:88  /software/installation/apt_source            ← relative, checked
```

Docusaurus validates only *internal* links. A fully-qualified URL to your own domain is treated as external and skipped, so `onBrokenLinks: 'throw'` will **not** catch those two. Moving the page breaks them silently in production. Worth an audit across the corpus, not just a fix for these two.

### 2.6 Support material barely exists

| Need | Status |
| --- | --- |
| Identify your product / serial number location | **missing** — referenced in 8 pages, no canonical page |
| Before you contact support | **missing** |
| Warranty and RMA process | **missing entirely** |
| Fault / error code index | **missing** |
| Consolidated FAQ | ad hoc on 5 pages, unfindable unless already on the right page |
| Safety and maintenance | exists (`general/`) but **not linked from the navbar or homepage** |

Given the audience decision in §0, this is the most consequential gap in the site.

---

## 3. Proposed navigation

### Before

```
Robots │ Peripherals │ Systems │ Software │ Tutorials       Support↗  GitHub↗  Legacy↗
```

### After

```
Products ▾ │ Solutions │ Guides │ Support                   GitHub↗  Legacy↗
   │
   ├── Robots ────── UGVs · Quadrupeds · Humanoids · Manipulators
   ├── Peripherals ─ Computers · Network · Power · Sensors
   └── Systems ───── UGV Development Kit
```

Four tabs on a single axis, each answering one distinct intent:

| Tab | Answers | Contains |
| --- | --- | --- |
| **Products** | "I have *this thing*" | Robots, Peripherals, Systems — URLs unchanged |
| **Solutions** | "Deploy and operate *this capability*" | ADT, Navigation, Industrial Patrolling |
| **Guides** | "I want to *do something*" | today's `tutorial/`, plus SLAM and apt source |
| **Support** | "I need help" | identification, warranty, fault codes, FAQ, safety |

Two changes from revision 1: `Solutions` is added (§5) and `Software` is dissolved (§6). Those cancel out, so the top level stays at four rather than growing.

Support moves from an outbound form link in the top-right into a real section. The form stays, as the call to action at the *end* of those pages, once the reader has gathered what support needs.

The **Legacy Doc** link keeps its place. Customers with older products are precisely the existing-customer population this site serves.

---

## 4. The product hub pattern

This addresses problems 1 and 2 together. **Guides stay where they are** — moving them would relocate the scatter, not remove it. Instead the product page becomes the hub that gathers everything about that product.

```
/robot/humanoid/g1                       ← single entry point for everything G1
  ┌─ At a glance ──────── model/revision · onboard computer · key figures
  1. Identify your unit ── where the serial and revision label are
  2. Getting started ───── unbox → power on → first motion
  3. Specifications ────── electrical interfaces · computer · dimensions
  4. Guides for this product   ⟵ generated from tag `g1`
  5. Solutions for this platform ⟵ generated from tag `g1`
  6. Troubleshooting & FAQ     ⟵ model-tagged Q&A
  7. Downloads ─────────── manuals · CAD/STEP · SDK
  8. Support ───────────── warranty · contact
```

Note the ordering, which follows from §0. Revision 1 opened with an overview and a marketing-shaped summary; a deployed customer does not need persuading. They need to confirm *which* unit they have, then get it working. Specifications stay important — integrators need payload, reach and interfaces — but they sit below the operational sections rather than above them. The sales prose that currently opens pages like `robot/manipulator/wr65.md` shrinks to a sentence or moves to `westonrobot.com`.

**Sections 4 and 5 are what make this maintainable.** Rather than hand-written links that rot, each hub links to its generated tag pages. Publish a new G1 guide, tag it `g1`, and it appears on the hub with no edit to the hub.

This is also why guides are not simply filed under each product: most apply to more than one model. `tutorial/agilex/ugv_base_control.md` covers the whole AgileX UGV line; `software/slam/go2_slam.md` covers Go2 and Go2-W. A directory would either duplicate them or hide them from the other models. Tags express many-to-many; directories cannot.

---

## 5. The Solutions section

New top-level section for capabilities you develop and deploy — Navigation and Industrial Patrolling when ready, and ADT today.

### 5.1 ADT is already a solution, currently mis-filed

`software/toolbox/adt_v1/v2/v3` is 2,087 words including its parent, and its own introduction describes it as "a teleoperation system designed and developed by Weston Robot for usage on **multiple mobile robot platforms**".

| Trait of a solution | ADT |
| --- | --- |
| Your own IP, not a resold part | yes |
| An application, not a component | yes |
| Versioned, customers on different versions | yes — v1, v2, v3 |
| Spans multiple hardware platforms | yes, by its own description |
| Currently filed as | "Software Toolbox", **invisible to every sidebar** |

So the category is needed now, not when the next solution ships. ADT is its first inhabitant.

There is also roughly 2,500 words of autonomy content with no home of its own, filed wherever it happened to arrive:

- `system/ugv_devkit/v1/nav2_sample_setup_guide.md` — 1,110 words of Cartographer and RTAB-Map mapping and navigation, filed under a **hardware kit**
- `software/slam/go2_slam.md` — 1,400 words, filed under **Software**, Unitree-specific

When Navigation ships as a solution, those are its natural children.

### 5.2 Why not Systems or Software

**Systems** is hardware you buy — the devkit is a physical bill of materials. A solution is a capability that *runs on* hardware. Conflating them means a customer browsing Systems cannot tell what is a crate and what is a capability.

**Software** is components you build against. A solution is the assembled outcome; filing it under Software implies the customer still has integration work to do.

The decisive difference is the primary question each page answers. A product page answers *what are its specs?* A solution page answers ***will this work in my environment, on the robot I own?*** That is a compatibility-and-constraints question, so it needs a supported-platform matrix and an honest limitations section where a product page needs a spec table.

### 5.3 Solution hub template

```
/solution/industrial-patrolling
  ┌─ At a glance ──────── maturity (beta/GA) · current version · supported platforms
  1. Supported platforms   ⟵ compatibility matrix: robots × required sensors
  2. Deployment ────────── install and bring-up on a supported platform
  3. Configuration ─────── zones, schedules, waypoints, reporting
  4. Operating it ──────── day-to-day use, monitoring
  5. Integration ───────── API / MQTT / VMS hooks, if applicable
  6. Release notes ─────── ⟵ versioned; hardware pages do not need this
  7. Known limitations ─── ⟵ where it does NOT work
  8. Troubleshooting & FAQ
  9. Support
```

Three sections a product hub does not have:

**Supported platforms** is the canonical compatibility source, and what makes the cross-link bidirectional. Tag a solution `scout-mini`, `ranger-mini-v3` and it appears on those product hubs under §4.5.

**Release notes**, because solutions version and hardware does not. See D3.

**Known limitations** is a trust signal specific to autonomy, and a support-deflection mechanism. Stating that patrolling needs a prior map, degrades below a lux threshold, or will not handle glass walls prevents both bad deployments and the tickets that follow them.

Per §0, marketing-shaped framing — the problem it removes, why it is compelling — belongs on `westonrobot.com`. This page starts from "you have bought this; here is how to run it".

### 5.4 Publishing before launch

Docusaurus has the right two frontmatter flags, so solution documentation can be written during development rather than assembled at launch:

| Stage | Flag | Behaviour |
| --- | --- | --- |
| Drafting | `draft: true` | Visible in `npm run start`, **stripped from production builds entirely** |
| Pilot customers | `unlisted: true` | Built and live, reachable by direct URL, **excluded from sidebar, sitemap and search**, banner shown |
| GA | neither | Full publish |

`unlisted` is the useful one: it lets you hand a pilot customer a working docs URL without the page being discoverable or indexed.

Practically: create `/solution/` now, move ADT into it, and add `navigation` and `industrial-patrolling` as `draft: true` pages to fill in as the work firms up.

---

## 6. Dissolving the Software section

`software/` holds 3,813 words across 7 pages, and none of it is natively software-section content:

| Page | Words | What it actually is | Destination |
| --- | --- | --- | --- |
| `toolbox/adt_v1` `v2` `v3` + parent | 2,087 | Your own versioned application | **Solutions** |
| `slam/go2_slam` | 1,400 | Task guide: run SLAM on Go2/Go2-W | **Guides** |
| `installation/apt_source` | 267 | Shared prerequisite | **Guides** |
| `intro` | 59 | Stub | dies with the section |

**Why the section looks narrow.** You have 16 SDK and ROS repositories with no documentation on this site — `wrp_sdk`, `ugv_sdk`, `wr_arm_sdk`, `wrp_ros`, `scout_ros`, `scout_ros2`, `ranger_ros`, `ranger_ros2`, `wr65b_ros`, `wrl63b_ros`, `wr_arm_ros2`, `wr_devkit_mapping`, `wr_devkit_navigation`, `unitree_ros`, `z1_sdk`, `z1_controller` — plus two package repositories (`deb.westonrobot.net`, `westonrobot.jfrog.io`). The docs site links to GitHub and stops. So Software is narrow because API and SDK reference lives entirely on GitHub, not because software is a small part of what you do. That makes this D9 rather than a filing decision.

**Recommendation: dissolve it now.** An almost-empty top-level tab actively hurts findability — it advertises software content and delivers a 59-word stub. If SDK reference documentation arrives later, add the tab back then and name it for the intent (`Develop` or `Reference`) to preserve the single-axis discipline. Speculative navigation is the same mistake as speculative abstraction.

SDKs remain findable without a tab: they surface as "Downloads / SDK" on each product hub and "Integration" on each solution hub — where the reader already is.

**`apt_source`** is a prerequisite for ADT, the power regulator, and Navigation in due course. It becomes a Guides page, and it is the strongest candidate on the site for transclusion: keep it as the canonical page and import the command block as an MDX partial wherever a guide needs it inline. Readers stop leaving the page mid-task, and there is still one place to edit when the signing key rotates.

---

## 7. Content-type rules

A decision procedure, so the per-model versus cross-cutting question stops being re-litigated page by page.

| The content is… | Goes | Mechanism |
| --- | --- | --- |
| True of exactly one model | Product hub | a section on the hub |
| True of exactly one solution | Solution hub | a section on the hub |
| Several models, **same** steps | One guide | `tags: [model-a, model-b]` |
| Several models, **different** steps | One guide, one URL | `<Tabs>` per model |
| Identical prose reused verbatim | Authored once | MDX partial in `_partials/` |
| Differs by hardware revision | One page | `<Tabs>` per revision |
| Differs by software version of a solution | Versioned docs | Docusaurus versioning — see D3 |
| Vendor-published reference | Not duplicated | link out, name the vendor in the link text |

Two existing problems this resolves on contact: the devkit `v1.0` and `v1.1` reconfiguration pages are **87% identical** and will drift, and the three ADT versions are near-parallel guides currently invisible to the sidebar.

---

## 8. Page templates

Four product classes share one skeleton (§4) with class-specific specification blocks:

| Class | Specification block |
| --- | --- |
| UGV | drive type · dimensions · ground clearance · payload · speed · slope/tilt · IP · battery and charge time · user power · CAN/serial interface |
| Quadruped | DOF · payload · speed · battery · IP · electrical interfaces · onboard computer · remote/controller |
| Humanoid | DOF · height/weight · payload · battery · electrical interfaces · onboard computer · network/dev access |
| Manipulator | DOF · reach · payload · repeatability · mounting · TCP I/O · end effectors · control interface |

**Manual heading numbers must go** — `## 1. Overview`, `### 2.1 …`. Three reasons, in ascending order of importance for this site:

1. They duplicate the right-hand table of contents.
2. They must be renumbered whenever a section is inserted. `robot/manipulator/wr65.md` already runs `## 1. Overview` straight into `## 3. Resources`.
3. **They generate unstable anchors.** `#2-1-electrical-interfaces` breaks the moment a section is inserted above it — and every anchor your support engineers have pasted into tickets and emails goes stale silently. `#electrical-interfaces` survives renumbering. For a post-purchase site this is the deciding argument.

**Section landing pages** get a template too. `peripheral/intro.md` (67 words) and `software/intro.md` (59 words) are a single marketing paragraph with no onward links: what is in this section → pick-by-use-case grid → comparison table → where to go next.

---

## 9. Tag taxonomy and governance

Four facets, flat namespace, predefined in `tags.yml` per docs instance:

- **model** — `g1`, `h1-2`, `go2`, `b2`, `scout-mini`, `ranger-mini-v2`, `ranger-mini-v3`, `z1`, `piper`, `xarm`, `wr65`, `wrl63`, `kinova-gen3-lite`, `ugv-devkit`
- **vendor** — `unitree`, `agilex`, `weston-robot`, `ufactory`, `kinova`
- **solution** — `adt`, `navigation`, `patrolling`
- **topic** — `networking`, `slam`, `navigation`, `can-bus`, `diagnostics`, `firmware`, `calibration`, `teleoperation`, `power`, `safety`

Governance matters more than the list. Docusaurus 3 supports a `tags.yml` declaring permitted tags with labels and descriptions, plus `onInlineTags: 'throw'` to reject anything undeclared. Since `npm run typecheck` and `npm run build` already gate every pull request, a stray tag fails CI rather than quietly fragmenting the taxonomy.

---

## 10. Support section

Per §0 this is the highest-value section on the site. Every page here is one a support engineer currently retypes by hand.

| Page | Purpose | Who writes it |
| --- | --- | --- |
| `/support/identify-your-product` | Serial number location per model, with photos; how to read a model/revision code | **You** — I scaffold the table and photo slots |
| `/support/before-you-contact-us` | Checklist: serial, firmware version, logs, photos, video, what changed | I draft; you confirm what you actually need |
| `/support/warranty-and-rma` | Coverage, exclusions, process, lead times, shipping | **You** — commercial terms |
| `/support/fault-codes` | Searchable index of error and fault codes per platform | **You** — firmware and vendor sources |
| `/support/faq` | Consolidates the 5 ad-hoc FAQ blocks, tagged by model | I consolidate what exists |
| `/support/safety` · `/support/maintenance` | Surface the orphaned `general/` pages under Support | I do |

Recommendation for the last row: **keep the `/general/*` URLs** and surface those pages under the Support tab rather than moving them. Same fix for reachability, no redirect needed.

`before-you-contact-us` pairs with the existing Office Forms link: the form becomes the last step of the checklist rather than a bare navbar item. That alone should raise the quality of incoming tickets.

**One cheap input worth gathering first: ask your support engineers what they retype.** They already hold the ranked list, in their heads and in the ticket history. It is better data than analytics will produce in three weeks, and it costs a conversation.

---

## 11. URLs, anchors, and link integrity

Deliberately minimal churn. Under this proposal:

| Change | URL impact |
| --- | --- |
| Navbar restructure to 4 tabs | none |
| Product pages become hubs | none — content changes, paths do not |
| Tags added | new `/…/tags/*` pages only |
| Support section | new paths only |
| `general/` surfaced under Support | none, URLs kept |
| `adt_v1/2/3` added to the sidebar | none |
| Solutions section | **ADT moves** `software/toolbox/*` → `solution/adt/*` |
| Heading numbers removed | **anchors change** — `#1-overview` → `#overview` |

Only the last two break anything. Both need `@docusaurus/plugin-client-redirects`, and for a post-purchase site both matter more than they would elsewhere, because the broken links live in historical support tickets.

Two related fixes belong in the same pass:

- Convert the two absolute self-referencing URLs in §2.5 to relative links, so the build starts protecting them, and audit for others.
- Removing heading numbers is a one-time anchor break. Doing it *before* the hubs are built and widely linked is much cheaper than after.

---

## 12. Migration plan

Phased so each stage ships independently. Nothing here is a cutover.

**Phase 0 — instrument, and ask the support team.** Add analytics; apply for Algolia DocSearch (free for public documentation) to replace `docusaurus-lunr-search`. DocSearch reports **zero-result searches** — a ranked list of what visitors cannot find. In parallel, interview the support engineers (§10). Also worth measuring: **how do customers currently reach the site** — bookmark, emailed link, support engineer, or search? If the answer is mostly "we send them links", the highest-leverage improvement is making the right URLs easy for support staff to find and paste, which is a different problem from navigation.

**Phase 1 — structural fixes and link integrity.** Restore `general/` to the navbar. Replace the three index-pointing links with deep links. Add `adt_v1/2/3` to the sidebar. Resolve the 13 inert `_category_.json` files. Fix the two absolute self-links and audit for more. Remove manual heading numbers with redirects. Add `description` to all 46 pages, fix 36 empty image alt attributes, enable `showLastUpdateTime`.

**Phase 2 — navigation and taxonomy.** Four-tab navbar; dissolve `Software`; `tags.yml` with `onInlineTags: 'throw'`; tag all 7 guides and the SLAM page; section landing-page templates.

**Phase 3 — support section.** The six pages in §10. Authoring should start immediately and in parallel with Phases 1–2: it is gated on your domain knowledge, not on the restructure. This is the phase with the highest expected return.

**Phase 4 — solutions section.** Create `/solution/`; migrate ADT with redirects; absorb the homeless navigation content; add `draft: true` pages for Navigation and Industrial Patrolling.

**Phase 5 — exemplar product hub.** Rebuild `robot/humanoid/g1` as the full hub pattern. G1 is the right pilot: the most existing satellite content (3 guides, 4,975 words) and the largest single document on the site to connect.

**Phase 6 — roll out hubs.** Remaining 19 product pages against the §8 templates, ordered by traffic once Phase 0 data exists.

**Phase 7 — resolve duplication, decide localisation.** Devkit `v1.0`/`v1.1` and ADT versions under the §7 rules; act on D5.

---

## 13. Open decisions

| ID | Decision | Status / recommendation |
| --- | --- | --- |
| D0 | Primary audience: existing customers or prospects | **Resolved** — existing customers; marketing secondary |
| D1 | Four tabs with a Products dropdown, or flat tabs | Four with dropdown — the consistent axis is what fixes findability |
| D2 | Does `go2_slam` move | To Guides, tagged `go2` — it is a task guide, not a software component |
| D3 | Revision-variant strategy | **Revised** — native Docusaurus versioning for *solutions* (ADT already has three versions and customers on each); `<Tabs>` for *hardware* revisions. Revision 1 recommended `<Tabs>` throughout, which was wrong for solutions. |
| D4 | Explicit sidebars or autogenerated | Autogenerated — removes the §2.4 trap, new pages appear without a sidebar edit |
| D5 | Chinese locale (`zh-Hans`) | **Strengthened** — pages link 9 CN manuals vs 6 EN, and customers who bought with Chinese manuals are Chinese-speaking. Post-purchase support in the customer's language outweighs marketing reach in a second language. Confirm with locale traffic, but expect to proceed. |
| D6 | Analytics platform, GA4 property, DocSearch application | Needs your accounts |
| D7 | Authority for specifications: page or PDF | Page authoritative, PDF generated from it — a process change on your side |
| D8 | Who owns doc review; definition of done for a product page | Needed before Phase 6 |
| D9 | Is SDK / API reference documentation coming to this site | If yes, `Software` returns later as `Develop` or `Reference`; if no, 16 repos stay on GitHub and product hubs link out. Affects nothing before Phase 2. |
| D10 | Solution overview content on `westonrobot.com` or here | **Resolved by D0** — outcome and proof on the marketing site, deployment and configuration here |

---

## 14. Success criteria

Rewritten for the audience decision in §0. Organic search acquisition, prospect engagement and product-page bounce rate are explicitly *not* criteria.

- **Support deflection** — ticket volume falls on topics that gain a page: serial number location, warranty process, fault codes. Primary metric.
- **Ticket quality** — incoming tickets arrive with serial, firmware version and logs already attached, because `before-you-contact-us` exists.
- **Time to answer** — support engineers can find and paste the right URL quickly. Measured by asking them, before and after.
- **Zero-result searches** — falls; searches for terms that have a page stop returning nothing.
- **Task completion** — a customer gets from unboxing to first motion without contacting you.
- **Reachability** — every published page sits in a sidebar (today `adt_v1/2/3` do not), and every hub links to all guides and solutions tagged for it.
- **Consistency** — every product page conforms to its class template; none has manual heading numbers or a missing description.

Reachability and consistency are measurable immediately and can be enforced in CI. Zero-result searches need Phase 0. Deflection and time-to-answer need a baseline, which is worth capturing now — the support-engineer interview in Phase 0 doubles as that baseline.
