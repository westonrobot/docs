# Information Architecture Proposal

> **Internal document — not published to the site.** The `classic` preset's default docs instance is disabled (`docs: false` in `docusaurus.config.ts`), so nothing under `docs/` is built or deployed. Keep it that way.

**Revision 3**, 2026-07-30 · **Phases 1–3 implemented**, Phases 4–7 outstanding

This document is now part plan, part record. Sections marked **✅ implemented** describe what the code does; the rest remains proposal. Where implementation contradicted the plan, the plan has been corrected and the reversal is called out — there are two, in §6 (D2) and §10.

## 0. Purpose and audience

This proposal responds to three stated problems:

1. It is not immediately obvious from the navigation where to find the content you want.
2. There is no consistent way to present per-model resources versus generally-applicable tutorials.
3. There is little material that eases technical-support work — Q&A, where to find a serial number, and so on.

The underlying goal: the site is under-utilised and less helpful than it could be.

**Primary audience — decided (D0).** This site exists to support **existing customers**. It may serve a secondary marketing purpose, but that is not its target.

The test the architecture has to pass:

> A customer with a Scout Mini in front of them and a dead motor finds the answer in under a minute.

This changes what matters. Search-engine discovery drops in importance; deep-linkability, anchor stability, support deflection and localisation all rise. An earlier revision led with the canonical-URL and SEO defect; that has been recalibrated — worth its one-line fix, because search is how a customer re-finds a page they have already seen, but not the reason to act.

**Design principle: minimal URL churn.** Nine URLs moved in total, all redirected. Product URLs (`/robot/*`, `/peripheral/*`, `/system/*`) are untouched. For a post-purchase site this is not merely convenient — support engineers paste URLs into tickets, so a broken link is a broken customer conversation months later.

---

## 1. State

The measurements that motivated this work, and where things stand now.

| | Before | Now |
| --- | --- | --- |
| Pages | 46 | 52 (+2 drafts) |
| Words | 23,624 | 27,248 |
| Top-level sections | 5, on two axes | 4, on one axis |
| Pages with a `description` | 0 | all |
| Pages absent from every sidebar | 3 (2,018 words) | 0 |
| Sections unreachable from navigation | 1 (`general/`) | 0 |
| Numbered headings | 91 | 0 |
| Inert `_category_.json` files | 13 | 0 |
| Analytics configured | none | none — still D6 |

Content mass was inverted against navigational prominence: `tutorial/` held **33.7%** of the corpus in 7 pages while `robot/` held **19.8%** in 14. That imbalance is now larger, not smaller — `tutorial/` is **38.8%** across 11 pages — but it no longer matters the same way, because guides are reachable from the product pages by tag rather than only from their own tab.

Concentration is unchanged and worth remembering: `tutorial/unitree/g1_dev_guide.md` alone is 3,523 words, 2.5× the next largest page.

---

## 2. Diagnosis

### 2.1 The top level mixed two incompatible axes ✅ implemented

```
Robots │ Peripherals │ Systems │ Software │ Tutorials     (+ General, not in the navbar)
└─────── what you bought ──────┘ └── kind of document ───┘
```

A visitor arrives holding either **an object** ("I have a G1") or **a task** ("it won't reach the internet"). Neither mapped onto that row. Root cause of everything else in this section. Fixed in §3.

### 2.2 One product's content was scattered, cross-links pointed at indexes ✅ implemented

Three product pages offered a link whose label promised a specific guide and whose target was the generic tutorial index — `go2.md` read `[Diagnostic Guide](/tutorial/intro)`. All three now deep-link. The structural fix is the tag mechanism in §9.

### 2.3 Content existed that the navigation never showed ✅ implemented

`adt_v1/v2/v3` totalled 2,018 words and appeared in no sidebar, reachable only from three inline links in a 69-word parent. Now children of a Solutions category.

### 2.4 Thirteen `_category_.json` files were inert, and disagreed ✅ implemented

Sidebars are explicit, so Docusaurus ignored these files — no `generated-index` pages existed in the build. Labels had already drifted (`UGVs` vs `Unmanned Ground Vehicles`), so editing one to rename a category did nothing with no visible cause. Deleted; D4 resolved toward explicit sidebars.

### 2.5 Internal links that bypassed the link checker ✅ implemented

Docusaurus validates only *internal* links. Two links written as fully-qualified `https://docs.westonrobot.com/...` URLs were treated as external and skipped, so `onBrokenLinks: 'throw'` did not protect them. Now relative. Audited — those were the only two.

### 2.6 Support material barely existed ✅ implemented

Answered by cutting the section's scope rather than filling it: four of the five planned pages were removed because their content belongs on the product or Guide page that owns it. See §10.

### 2.7 Two different support forms were in use ✅ resolved

Eight content links pointed at a long-form Office Forms URL while the navbar and homepage used a short link. They resolved to **different forms**:

```
short link  →  form id 8X3_nKqqIk-No-SG1IYN…   ← newer, canonical
long URL    →  form id NTNVCC0zFkWzGo_3Vcs_4K…  ← superseded
```

**Canonical support form: `https://forms.office.com/r/qELKzYF33W`** (confirmed 2026-07-30). The superseded long URL appears nowhere on the site any more.

The eight content links now point at `/support/before-you-contact-us` rather than at a form directly, so a customer collects the serial number, firmware version and logs before they get to the form. Only three places link the form itself: `support/intro`, `support/before-you-contact-us`, and one in-context reference in `g1_dev_guide`.

That drift is the reason to keep form links few and named in one place. If the form changes again, those three are the only edits.

---

## 3. Navigation ✅ implemented

### Before

```
Robots │ Peripherals │ Systems │ Software │ Tutorials       Support↗  GitHub↗  Legacy↗
```

### Now

```
Products ▾ │ Solutions │ Guides │ Support                   GitHub↗  Legacy↗
   │
   ├── Robots ────── UGVs · Quadrupeds · Humanoids · Manipulators
   ├── Peripherals ─ Computers · Network · Power · Sensors
   └── Systems ───── UGV Development Kit
```

| Tab | Answers | Contains |
| --- | --- | --- |
| **Products** | "I have *this thing*" | Robots, Peripherals, Systems — URLs unchanged |
| **Solutions** | "Deploy and operate *this capability*" | ADT; Navigation and Patrolling in draft |
| **Guides** | "I want to *do something*" | Safety, maintenance, setup, per-model guides |
| **Support** | "Something is wrong, or I need a human" | What to collect before raising a ticket; the support form |

`Products` is a dropdown over three existing plugin instances, so no product URL changed. The external support form left the navbar and now lives at the end of the Support pages, after the reader has collected what support needs.

---

## 4. The product hub pattern ⏳ Phase 5–6

Guides stay where they are; the product page becomes the hub that gathers everything about that product. Partially delivered: every product page with tagged guides now carries a **Guides for this product** section (§9). The full hub template is outstanding.

```
/robot/humanoid/g1
  ┌─ At a glance ──────── model/revision · onboard computer · key figures
  1. Identify your unit ── where the serial and revision label are
  2. Getting started ───── unbox → power on → first motion
  3. Specifications ────── electrical interfaces · computer · dimensions
  4. Guides for this product   ⟵ from tag `g1`          ✅ done
  5. Solutions for this platform ⟵ from tag              ⏳ pending
  6. Troubleshooting & FAQ
  7. Downloads ─────────── manuals · CAD/STEP · SDK
  8. Support ───────────── what to collect · contact
```

The ordering follows §0: a deployed customer does not need persuading, they need to confirm *which* unit they have and then get it working. Specifications stay important — integrators need payload, reach and interfaces — but below the operational sections.

Guides are not filed under each product because most apply to more than one. `ugv_base_control` covers the whole AgileX UGV line; `go2_slam` covers Go2 and Go2-W. A directory would duplicate them or hide them; tags express many-to-many.

---

## 5. The Solutions section ✅ implemented

A solution is a capability we develop and deploy, not a component the customer integrates.

**ADT was already a solution, mis-filed.** Its own text describes it as "a teleoperation system designed and developed by Weston Robot for usage on multiple mobile robot platforms" — 2,087 words, versioned v1/v2/v3, filed under "Software Toolbox" and invisible to every sidebar. Moved to `/solution/adt/` with its images.

**Navigation and Industrial Patrolling** exist as `draft: true` skeletons following the template below. They are stripped from production builds entirely, and they document their own promotion path:

| Stage | Flag | Behaviour |
| --- | --- | --- |
| Drafting | `draft: true` | Visible in `npm run start`, **absent from production builds** |
| Pilot customers | `unlisted: true` | Live and reachable by direct URL, excluded from sidebar, sitemap and search |
| GA | neither | Full publish |

### Solution hub template

```
/solution/industrial-patrolling
  ┌─ At a glance ──────── maturity (beta/GA) · current version · platforms
  1. Supported platforms   ⟵ compatibility matrix: robots × required sensors
  2. Deployment
  3. Configuration
  4. Operating it
  5. Integration
  6. Release notes ─────── versioned; hardware pages do not need this
  7. Known limitations ─── where it does NOT work
  8. Troubleshooting & FAQ
  9. Support
```

**Supported platforms** is the canonical compatibility source and answers the question a solution page exists to answer: *will this work in my environment, on the robot I own?* **Known limitations** is a trust signal specific to autonomy and a deflection mechanism — stating that patrolling needs a prior map, degrades below a lux threshold, or will not handle glass walls prevents both bad deployments and the tickets that follow.

Per D10, marketing-shaped framing belongs on `westonrobot.com`; these pages start from "you have bought this, here is how to run it".

---

## 6. Software dissolved ✅ implemented

`software/` held 3,813 words across 7 pages, none of it natively software-section content:

| Page | Words | What it was | Went to |
| --- | --- | --- | --- |
| `toolbox/adt_*` + parent | 2,087 | Your own versioned application | Solutions |
| `slam/go2_slam` | 1,400 | Task guide: SLAM on Go2/Go2-W | Guides |
| `installation/apt_source` | 267 | Shared prerequisite | Guides |
| `intro` | 59 | Stub | deleted |

The section only looked like a section because API and SDK reference lives entirely on GitHub — 16 repos, plus two package repositories (**D9**, still open). An almost-empty top-level tab advertises content and delivers a stub. If SDK reference arrives later, add a tab named for the intent (`Develop` or `Reference`) to preserve the single-axis discipline.

> **Reversal — D2.** Revision 2 said `go2_slam` should stay under Software and merely be tagged. That is incoherent once the tab is gone: the page would sit in a section with no navigation entry, and cross-instance sidebars are not possible in Docusaurus. Moving it, with a redirect, is the honest consequence.

SDKs remain findable without a tab: they surface as "Downloads / SDK" on each product hub and "Integration" on each solution hub.

---

## 7. Content-type rules

The decision procedure, so the per-model versus cross-cutting question stops being re-litigated.

| The content is… | Goes | Mechanism |
| --- | --- | --- |
| True of exactly one model | Product hub | a section on the hub |
| True of exactly one solution | Solution hub | a section on the hub |
| Several models, **same** steps | One guide | `tags: [model-a, model-b]` |
| Several models, **different** steps | One guide, one URL | `<Tabs>` per model |
| Identical prose reused verbatim | Authored once | MDX partial in `_partials/` |
| Differs by **hardware** revision | One page | `<Tabs>` per revision |
| Differs by **software** version of a solution | Versioned docs | Docusaurus versioning (D3) |
| Vendor-published reference | Not duplicated | link out, name the vendor |

Still outstanding under these rules (Phase 7): the devkit `v1.0`/`v1.1` reconfiguration pages are **87% identical** and will drift, and the three ADT versions are near-parallel.

### Document the model, not the interface

Pages explain **how the system works and what an action commits you to**, not which button to press. Where a UI is self-explanatory, a click-by-click walkthrough duplicates what the screen already says, goes stale the moment a control moves, and is the most expensive content on the site to maintain — screenshots are the bulk of its page weight.

What an interface cannot explain about itself, and therefore belongs here:

- **The model behind it** — what a mission is; why a changed site map flags missions for review instead of dispatching them; what a role actually grants.
- **What an action commits you to** — approving a map, taking a teleoperation lease, acknowledging an event. The button is obvious; the consequence is not.
- **Behaviour that is invisible until it happens** — the comms-loss policy, refusing to start on low battery, interrupting a schedule at a critical level.
- **Limits** — what the system does not do at all.

**Screenshots earn their place in four cases:** illustrating a workflow or a major operation, so a reader can recognise the screen being described; installation and first launch, where the mechanics are not guessable; an action with consequences, where showing the confirmation is the point; and physical hardware, where a photograph is the fastest way to identify a part. What this rule excludes is the *step-by-step, repetitive* kind — one image per stage of a workflow is illustration, one per click is a walkthrough.

This rule is forward-looking. The one page that plainly contradicts it — `solution/adt/intro`, 42 figures and four times any other page — is **slated for retirement**, so it is neither a precedent to follow nor a page worth revising to match.

---

## 8. Page templates ⏳ Phase 5–6

Four product classes share one skeleton (§4) with class-specific specification blocks:

| Class | Specification block |
| --- | --- |
| UGV | drive type · dimensions · ground clearance · payload · speed · slope/tilt · IP · battery and charge time · user power · CAN/serial interface |
| Quadruped | DOF · payload · speed · battery · IP · electrical interfaces · onboard computer · remote |
| Humanoid | DOF · height/weight · payload · battery · electrical interfaces · onboard computer · network/dev access |
| Manipulator | DOF · reach · payload · repeatability · mounting · TCP I/O · end effectors · control interface |

**Manual heading numbers removed ✅** — 91 across 21 files. Three reasons, ascending in importance for this audience: they duplicate the table of contents; they must be renumbered on insertion, and had already drifted (`wr65.md` ran `## 1. Overview` into `## 3. Resources`); and they generated unstable anchors. `#2-1-electrical-interfaces` breaks the moment a section is inserted above it, silently invalidating any anchor pasted into a ticket.

Left alone deliberately, because they are content rather than numbering: `b2.md`'s `#### (2+2) Power Line Interface` (connector pin counts) and shell comments inside code blocks.

**Section landing pages** — `tutorial/intro` is now a Guides hub with start-from-your-robot and start-from-the-task tables; `peripheral/intro` replaced a 67-word paragraph with a pick-by-use-case table; `solution/intro` and `support/intro` are new. Outstanding: `robot/intro` and `system/intro`.

---

## 9. Tag taxonomy ✅ implemented

**20 tags declared** in `tutorial/tags.yml` across four facets — model, vendor, solution, topic — each with a pinned `permalink` so URLs are readable and stable rather than relying on slugification (which turns `g1` into `g-1`).

Governance is enforced, not conventional: `onInlineTags: 'throw'` is set on every docs instance, so an undeclared tag **fails the build** rather than quietly creating a near-duplicate tag page. Since `typecheck` and `build` already gate every pull request, the taxonomy cannot decay by accident.

The payoff: every product page with tagged guides carries a **Guides for this product** section linking its tag page. Publish a new guide, tag it, and it appears on the right products with no edit to those pages.

---

## 10. Support section ✅ implemented — scope deliberately reduced

> **Reversal — safety and maintenance.** Revision 2 put `/support/safety` and `/support/maintenance` in this section. They are now under **Guides** instead, as `/tutorial/operational-safety` and `/tutorial/robot-maintenance`, because they are procedures you follow — one before operating, one on a schedule — which is the Guides axis. Keeping them here made Support a catch-all; Support is now scoped strictly to "something is wrong, or I need a human". Tagging them `safety` and `maintenance` also gives them more reach than a Support sub-page: a tag surfaces from any product page, whereas a Support page is only visited once there is already a problem.

Per §0 this is the highest-value section on the site. Every page is one a support engineer currently retypes by hand.

| Page | Status | What it still needs |
| --- | --- | --- |
| `before-you-contact-us` | **complete** | — |
| ~~`faq`~~ | **removed** | Cross-platform answers moved into the Guides that own them; every product page links the relevant anchor directly |
| ~~`identify-your-product`~~ | **removed** | Serial-number location is a per-product physical fact; it now lives on each product page under Key information |
| ~~`fault-codes`~~ | **removed** | A single site-wide code list was the wrong shape. Fault and alarm codes are per firmware, so they belong on the robot family or vendor page that owns that firmware |
| ~~`warranty-and-rma`~~ | **removed** | Never written — warranty terms are commercial commitments. Warranty questions go through the support form like anything else |

`identify-your-product` was removed. It ended up 13 rows of which 11 said `TODO`, and every product page sent readers a hop to it to find nothing. The two facts that were real — the Unitree battery-compartment location, and the Power Regulator label — moved onto the pages that own those products. Same reasoning as `fault-codes`: content that varies per vendor or model does not belong in one site-wide table.

`warranty-and-rma` was removed rather than completed. It never carried anything authoritative — warranty terms are commercial commitments, and inventing them would promise something Weston Robot has not agreed to. Support is now deliberately two things: what to collect, and where to send it. A placeholder page that says "contact support" is a hop, not an answer.

`fault-codes` was removed rather than filled in. Codes come from firmware, so one site-wide list would have had to span every vendor and every revision, and a wrong entry sends a customer down the wrong diagnostic path. They will be documented per robot family or vendor instead, on the page that owns that firmware.

`faq` was removed rather than kept. The questions it was to consolidate — joint lubrication, wireless development, waterproofing, fall recovery — are cross-platform answers, so they now live in the Guides that own them, and each product page links the anchor directly rather than sending the reader to a shared page. Seven product pages carry a **Questions that apply across our platforms** section built this way, pointing at `/tutorial/operational-safety#where-you-can-operate`, `#if-something-goes-wrong` and `#while-you-are-developing`, and `/tutorial/robot-maintenance#quadrupeds-and-humanoids` — each linked from four to seven of those pages. Model-specific questions stay on the product page. Same reasoning as the rows above: a shared page is a hop, and an answer reached from the product already in front of the reader is not.

**Current state.** Support is one page — `before-you-contact-us` — plus a link to the support form. That is the entire section, by design.

> **Consequence for `static/llms.txt`.** That file is hand-written and sits outside the build, so `onBrokenLinks` never checks it. It advertised `/support/faq` and `/support/warranty-and-rma` for weeks after both were deleted, serving two 404s to the audience `robots.txt` explicitly invites. Any page removed here must be removed there in the same commit.

**One cheap input worth gathering: ask your support engineers what they retype.** They hold the ranked list already, in their heads and in the ticket history. It beats what analytics will produce in three weeks, and it costs a conversation.

---

## 11. URLs, anchors, link integrity

**Nine URLs moved, all redirected:**

| From | To |
| --- | --- |
| `/software/toolbox/assisted_driving_toolbox` | `/solution/adt/intro` |
| `/software/toolbox/adt_v1` `v2` `v3` | `/solution/adt/v1` `v2` `v3` |
| `/software/installation/apt_source` | `/tutorial/installation/apt_source` |
| `/software/slam/go2_slam` | `/tutorial/unitree/go2_slam` |
| `/software/intro` | `/solution/intro` |
| `/general/operational-safety` | `/tutorial/operational-safety` |
| `/general/robot-maintenance` | `/tutorial/robot-maintenance` |

Unchanged: every `/robot/*`, `/peripheral/*` and `/system/*` URL.

> **Caveat — redirects are client-side, not HTTP 301.** GitHub Pages cannot serve redirects, so `@docusaurus/plugin-client-redirects` emits a stub page with `<meta http-equiv="refresh">`, a canonical link, and a JS fallback that preserves the query string and hash. It works in a browser, including anchors. Two consequences: `curl` sees `200` at the old URL rather than a `30x`, and search engines weight these below a real 301.

> **Caveat — the 91 anchor changes cannot be redirected at all.** Fragments are client-side only. Any `#2-1-electrical-interfaces` already pasted into a support ticket lands on the right page at the wrong scroll position. This is precisely why doing it before the product hubs exist was cheaper than after.

---

## 12. Migration status

| Phase | Scope | Status |
| --- | --- | --- |
| 0 | Instrument; ask the support team | **outstanding** — needs D6 |
| 1 | Structural fixes and link integrity | ✅ done |
| 2 | Navigation, taxonomy, Solutions, Software dissolved | ✅ done |
| 3 | Support section | ✅ done — scope cut to one page plus the form; see §10 |
| 4 | Solution content for Navigation and Patrolling | ⏳ drafts in place |
| 5 | Exemplar product hub — G1 | ⏳ next |
| 6 | Roll hubs across the remaining 19 products | ⏳ |
| 7 | Resolve duplication; decide localisation | ⏳ |

**Phase 0 is now the bottleneck, and it is not a code task.** Analytics plus Algolia DocSearch (free for public documentation) would report **zero-result searches** — a ranked list of what visitors cannot find. Two to three weeks of traffic would say whether Phases 1–3 helped, and would order Phase 6 by real traffic rather than guesswork. It needs your accounts (D6).

Also worth measuring: **how do customers reach the site** — bookmark, emailed link, support engineer, or search? If the answer is mostly "we send them links", the highest-leverage improvement is making the right URLs easy for *support staff* to find and paste, which is a different problem from navigation.

---

## 13. Decisions

| ID | Decision | Status |
| --- | --- | --- |
| D0 | Primary audience | **resolved** — existing customers; marketing secondary |
| D1 | Four tabs with a Products dropdown | **implemented** |
| D2 | Where `go2_slam` lives | **resolved, reversed** — moved to Guides; see §6 |
| D3 | Revision-variant strategy | `<Tabs>` for *hardware* revisions. Native Docusaurus versioning for *solutions* — but **not before two versions are concurrently supported**. With one version it snapshots every page and versions the sidebars for no benefit, and turns each later fix into one edit per live version. Adopting it is additive, not a URL migration: the newest versioned snapshot is served at the base path and the working copy moves to `/next/`. Product releases are labelled `R<year>.<month>` (see `wr_arch_docs/src/conventions/naming.md`) |
| D4 | Explicit sidebars or autogenerated | **resolved** — explicit; the 13 inert files deleted |
| D5 | Chinese locale (`zh-Hans`) | **open** — pages link 9 CN manuals vs 6 EN, and post-purchase support in the customer's language outweighs marketing reach. Confirm with locale traffic from Phase 0 |
| D6 | Analytics platform, GA4 property, DocSearch application | **open, now blocking** — needs your accounts |
| D7 | Specification authority: page or PDF | **open** — page authoritative, PDF generated from it. A process change on your side |
| D8 | Doc review owner; definition of done for a product page | **open** — needed before Phase 6 |
| D9 | Is **vendor** SDK / API reference coming to this site | **resolved (2026-08-20)** — no. Product hubs link out via "Downloads / SDK" and name the vendor, per §7's "vendor-published reference" rule. `wr_unitree_support` is an internal knowledge base on Unitree products: a research **source** for pages here, never published from and holding no publishing policy — the `docs/PUBLISHING.md` this decision used to cite was never written, in that repo or anywhere. **This does not settle Weston Robot's own SDK reference**, which has no external destination to link to; see `release-pages-plan.md` D-R6 |
| D10 | Solution overviews here or on the marketing site | **resolved by D0** — outcome and proof on marketing, deployment and config here |
| D11 | Which of the two support forms is correct | **resolved** — the short link `forms.office.com/r/qELKzYF33W` is the newer one and is now the only form on the site; see §2.7 |

---

## 14. Success criteria

Organic search acquisition, prospect engagement and product-page bounce rate are explicitly *not* criteria.

| Criterion | Measurable now? |
| --- | --- |
| **Support deflection** — ticket volume falls on topics that gained a page | Needs a baseline; the support-engineer interview doubles as one |
| **Ticket quality** — tickets arrive with serial, firmware and logs attached | Yes, by inspection, once `before-you-contact-us` is in use |
| **Time to answer** — support staff find and paste the right URL quickly | Ask them, before and after |
| **Zero-result searches** — falls | Needs Phase 0 |
| **Task completion** — unboxing to first motion without contacting us | Needs Phase 0 |
| **Reachability** — every page in a sidebar; every hub links its tagged guides | ✅ enforceable in CI, currently passing |
| **Consistency** — every product page conforms to its class template | Partially; full check arrives with Phase 6 |

Reachability and consistency are the two that can be enforced mechanically, and the build already gates the first: `onBrokenLinks`, `onBrokenAnchors` and `onInlineTags` are all set to `throw`.
