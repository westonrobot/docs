# Information Architecture Proposal

> **Internal document — not published to the site.** The `classic` preset's default docs instance is disabled (`docs: false` in `docusaurus.config.ts`), so nothing under `docs/` is built or deployed. Keep it that way.

**Status:** draft for review · **Date:** 2026-07-30 · **Scope:** navigation, page structure, content-type rules, support content

This proposal responds to three stated problems:

1. It is not immediately obvious from the navigation where to find the content you want.
2. There is no consistent way to present per-model resources versus generally-applicable tutorials.
3. There is little material that eases technical-support work (Q&A, where to find a serial number, and so on).

The underlying goal: the site is under-utilised and less helpful than it could be.

**Design principle for this proposal: almost no URL changes.** Every problem above is solvable by changing navigation, page structure, and cross-linking. Existing product URLs such as `/robot/humanoid/g1` stay exactly as they are. This keeps inbound links, the submitted sitemap, and customer bookmarks intact, and it means the work can ship incrementally instead of as one risky cutover.

---

## 1. Current state, measured

46 pages, 23,624 words, mean 513 words per page.

| Section | Pages | Words | Share of corpus |
| --- | --- | --- | --- |
| `tutorial/` | 7 | 7,962 | **33.7%** |
| `robot/` | 14 | 4,684 | 19.8% |
| `system/` | 9 | 3,821 | 16.2% |
| `software/` | 7 | 3,813 | 16.1% |
| `peripheral/` | 7 | 2,870 | 12.1% |
| `general/` | 2 | 474 | 2.0% |

Content is heavily concentrated. The top 8 pages hold 11,231 words — **48% of everything** — and the single largest, `tutorial/unitree/g1_dev_guide.md` at 3,523 words, is 2.5× the next biggest.

| Words | Page |
| --- | --- |
| 3,523 | `tutorial/unitree/g1_dev_guide.md` |
| 1,400 | `software/slam/go2_slam.md` |
| 1,246 | `robot/quadruped/b2.md` |
| 1,110 | `system/ugv_devkit/v1/nav2_sample_setup_guide.md` |
| 1,071 | `peripheral/power/power_regulator_v2.md` |
| 1,016 | `tutorial/unitree/go2_diag_guide.md` |
| 954 | `tutorial/unitree/b2_diag_guide.md` |
| 911 | `tutorial/agilex/ugv_base_control.md` |

---

## 2. Diagnosis

### 2.1 The top level mixes two incompatible axes

```
Robots │ Peripherals │ Systems │ Software │ Tutorials     (+ General, not in the navbar)
└─────── what you bought ──────┘ └── kind of document ───┘
```

A visitor arrives holding either **an object** ("I have a G1") or **a task** ("it won't reach the internet"). Neither maps onto that row, because three tabs answer *what is it* and two answer *what kind of page is this*.

The consequence is measurable: the section customers naturally enter (`robot/`, 14 pages) holds 19.8% of the content, while the section they may never open (`tutorial/`, 7 pages) holds 33.7%.

### 2.2 One product's content is scattered, and the cross-links are weak

| Product | Content lives in |
| --- | --- |
| G1 | `robot/humanoid/g1` + `tutorial/unitree/g1_dev_guide` + `g1_diag_guide` + `g1_internet_guide` |
| Go2 | `robot/quadruped/go2` + `tutorial/unitree/go2_diag_guide` + `software/slam/go2_slam` |
| B2 | `robot/quadruped/b2` + `tutorial/unitree/b2_diag_guide` |

The product pages do link outward, but inconsistently and often to an index rather than the target:

- `robot/humanoid/g1.md:44` — `[Guides](/tutorial/intro)` — points at the generic tutorial index, not the three G1 guides.
- `robot/quadruped/go2.md:48` — `[Diagnostic Guide](/tutorial/intro)` — the label promises a specific guide and delivers the index.
- `robot/humanoid/g1.md:52` — a correct deep link to the internet guide, but buried inside an FAQ answer.

The tutorial index itself is reasonable, but it groups by **vendor** ("AgileX UGVs", "Unitree Quadruped Robots"), so a customer must know who manufactures their robot before they can find its guide.

### 2.3 Content exists that the navigation never shows

`software/toolbox/adt_v1.md`, `adt_v2.md` and `adt_v3.md` total **2,018 words and appear in no sidebar**. They are reachable only from three inline links inside a 69-word parent page. A user scanning the left navigation sees "Software Toolbox → Assisted Driving Toolbox" with no indication that three versioned guides sit beneath it.

### 2.4 Thirteen `_category_.json` files are inert, and they disagree with the sidebars

All five sidebars are explicit arrays, so Docusaurus ignores `_category_.json` entirely — no `generated-index` category pages exist in the build. The labels have already drifted apart:

| Directory | Sidebar label | `_category_.json` label |
| --- | --- | --- |
| `robot/ugv` | `UGVs` | `Unmanned Ground Vehicles` |
| `robot/quadruped` | `Quadrupeds` | `Quadruped Robots` |
| `robot/humanoid` | `Humanoid` | `Humanoid Robots` |
| `robot/manipulator` | `Manipulators` | `Robotic Manipulators` |
| `tutorial/unitree` | `Humanoid Tutorials` / `Quadruped Tutorials` | `Unitree Tutorials` |

This is a live maintenance trap: someone edits `_category_.json` to rename a category, nothing changes, and the cause is invisible. `robot/humanoid` and `robot/manipulator` also both claim `"position": 4`.

### 2.5 Support material barely exists

| Need | Status |
| --- | --- |
| Identify your product / where the serial number is | **missing** — serial numbers referenced in 8 pages, no canonical page |
| Before you contact support (what to collect) | **missing** |
| Warranty and RMA process | **missing** — no warranty or RMA content anywhere |
| Fault / error code index | **missing** |
| Consolidated FAQ | ad hoc on 5 pages, unfindable unless already on the right page |
| Safety and maintenance | exists (`general/`) but **not linked from the navbar or homepage** |

### 2.6 There is no measurement

No analytics of any kind is configured — no gtag, Plausible, Matomo or equivalent. "Under-utilised" is currently an informed intuition with no data behind it, and there is no record of what visitors search for and fail to find.

---

## 3. Proposed navigation model

### Before

```
Robots │ Peripherals │ Systems │ Software │ Tutorials       Support↗  GitHub↗  Legacy↗
```

### After

```
Products ▾ │ Guides │ Software │ Support                    GitHub↗  Legacy↗
   │
   ├── Robots ──── UGVs · Quadrupeds · Humanoids · Manipulators
   ├── Peripherals ─ Computers · Network · Power · Sensors
   └── Systems ──── UGV Development Kit
```

Four tabs, one consistent axis — each answers a distinct visitor intent:

| Tab | Answers | Contains |
| --- | --- | --- |
| **Products** | "I have / am evaluating *this thing*" | Robots, Peripherals, Systems — unchanged URLs |
| **Guides** | "I want to *do something*" | today's `tutorial/`, reorganised by task and surfaced by tag |
| **Software** | "I'm building against it" | SDKs, apt setup, toolboxes |
| **Support** | "I need help" | identification, warranty, fault codes, FAQ, safety |

"Support" moves from an outbound form link in the top-right to a real section. The external support form stays, as the call to action at the *end* of those pages.

**Decision needed (D1):** `Products` as a dropdown collapsing three sections, or keep Robots / Peripherals / Systems as separate tabs and accept six? The dropdown gives a cleaner, consistent top level; separate tabs give one less click. Recommendation: dropdown, because the consistent axis is what fixes problem 1.

---

## 4. The product hub pattern

This is the core change, and it addresses problems 1 and 2 together. **Tutorials stay where they are** — moving them would relocate the scatter, not remove it. Instead, the product page becomes the hub that gathers everything about that product.

```
/robot/humanoid/g1                       ← the single entry point for everything G1
  ┌─ At a glance ──────── DOF · payload · reach · battery · IP · onboard computer
  1. Overview
  2. Specifications      ── electrical interfaces · onboard computer · dimensions
  3. Getting started     ── unbox → power on → first motion
  4. Guides for this product   ⟵ generated from tag `g1`
  5. Troubleshooting & FAQ     ⟵ model-tagged Q&A
  6. Downloads           ── manuals · CAD/STEP · SDK
  7. Support             ── serial number location · warranty · contact
```

Section 4 is the mechanism that makes this maintainable. Rather than hand-written links that rot, each product hub links to its tag page (`/guides/tags/g1`), which Docusaurus generates. Publish a new G1 guide, tag it `g1`, and it appears on the G1 hub automatically with no edit to the hub.

### Why not simply move the tutorials under each product?

Because most guides apply to more than one model. `tutorial/agilex/ugv_base_control.md` covers the whole AgileX UGV line; `software/slam/go2_slam.md` covers Go2 and Go2-W. Filing a guide under one product would either duplicate it or hide it from the others. Tags express many-to-many; directories cannot.

---

## 5. Content-type rules

This is the answer to problem 2 — a decision procedure, so the question does not get re-litigated per page.

| The content is… | Goes | Mechanism |
| --- | --- | --- |
| True of exactly one model | Product hub | A section on the hub page |
| True of several models, **same** steps | One guide under `Guides` | `tags: [model-a, model-b]` |
| True of several models, **different** steps | One guide, one URL | `<Tabs>` with a tab per model |
| Identical prose reused verbatim | Authored once | MDX partial in `_partials/`, imported |
| Differs by hardware revision of one product | One page | `<Tabs>` per revision, or docs versioning — see D3 |
| Vendor-published reference | Not duplicated | Link out, with the vendor named in the link text |

Two existing problems this resolves immediately:

- `system/ugv_devkit/v1.0/component_reconfiguration.md` and its `v1.1` twin are **87% identical** and will drift. Under these rules they become one page with revision tabs, or a shared partial.
- `adt_v1/v2/v3` are three near-parallel toolbox guides currently invisible to the sidebar. They become either tabs on one ADT page or explicit sidebar children — see D3.

---

## 6. Page templates

Four product classes, one shared skeleton, class-specific specification blocks. `go2`, `b2` and `g1` already follow roughly the right shape and are the basis for this.

**Shared skeleton (all classes):** At a glance → Overview → Specifications → Getting started → Guides for this product → Troubleshooting & FAQ → Downloads → Support.

**Class-specific specification blocks:**

| Class | Specification block |
| --- | --- |
| UGV | drive type · dimensions · ground clearance · payload · speed · slope/tilt · IP · battery & charge time · user power · CAN/serial interface |
| Quadruped | DOF · payload · speed · battery · IP · electrical interfaces · onboard computer · remote/controller |
| Humanoid | DOF · height/weight · payload · battery · electrical interfaces · onboard computer · network/dev access |
| Manipulator | DOF · reach · payload · repeatability · mounting · TCP I/O · end effectors · control interface |

Note that manual heading numbers (`## 1. Overview`, `### 2.1 …`) should go. They generate anchors like `#1-overview`, they must be renumbered whenever a section is inserted, and they duplicate the right-hand table of contents. `robot/manipulator/wr65.md` already shows the failure mode — it runs `## 1. Overview` straight into `## 3. Resources`.

**Section landing pages** get a template too. `peripheral/intro.md` (67 words) and `software/intro.md` (59 words) are currently a single marketing paragraph with no onward links: what is in this section → pick-by-use-case grid → comparison table → where to go next.

---

## 7. Tag taxonomy and governance

Three facets, flat namespace, predefined in `tags.yml` per docs instance:

- **model** — `g1`, `h1-2`, `go2`, `b2`, `scout-mini`, `ranger-mini-v2`, `ranger-mini-v3`, `z1`, `piper`, `xarm`, `wr65`, `wrl63`, `kinova-gen3-lite`, `ugv-devkit`
- **vendor** — `unitree`, `agilex`, `weston-robot`, `ufactory`, `kinova`
- **topic** — `networking`, `slam`, `navigation`, `can-bus`, `diagnostics`, `firmware`, `calibration`, `teleoperation`, `power`, `safety`

Governance matters more than the list. Docusaurus 3 supports a `tags.yml` file declaring permitted tags with labels and descriptions, plus `onInlineTags: 'throw'` to reject any tag not declared. That turns the taxonomy into something CI enforces rather than a convention that decays. Since `npm run typecheck` and `npm run build` already gate every PR, a stray tag would fail the build.

---

## 8. Support section specification

Problem 3, and the highest expected return on effort — every page here is one a support engineer currently retypes.

| Page | Purpose | Who can write it |
| --- | --- | --- |
| `/support/identify-your-product` | Serial number location per model, with photos; how to read a model/revision code | **You** — I can scaffold the table and photo slots |
| `/support/before-you-contact-us` | Checklist: serial number, firmware version, logs, photos, video, what changed | I can draft; you confirm what you actually need |
| `/support/warranty-and-rma` | Coverage, exclusions, process, lead times, shipping | **You** — commercial terms |
| `/support/fault-codes` | Searchable index of error and fault codes per platform | **You** — from firmware/vendor sources |
| `/support/faq` | Consolidates the 5 ad-hoc FAQ blocks, tagged by model | I can consolidate what exists |
| `/support/safety` · `/support/maintenance` | Rehome or link the orphaned `general/` pages | I can do this |

On the last row — recommendation is to **keep the `/general/*` URLs** and surface those pages under the Support tab, rather than move them. Same fix for reachability, no redirect needed.

The `before-you-contact-us` page pairs with the existing Office Forms link: the form is the last step of the checklist, not a bare navbar link. That alone should improve the quality of incoming tickets.

---

## 9. URL scheme and redirects

Deliberately minimal. Under this proposal:

| Change | URL impact |
| --- | --- |
| Navbar restructure into 4 tabs | none |
| Product pages become hubs | none — content changes, paths do not |
| Tags added | new `/…/tags/*` pages only |
| Support section | new paths only |
| `general/` surfaced under Support | none, if URLs are kept |
| `adt_v1/2/3` added to the sidebar | none |
| Heading numbers removed | **anchors change** — `#1-overview` → `#overview` |

Only the last row breaks anything, and only deep links into specific sections. If that matters, `@docusaurus/plugin-client-redirects` handles it; more likely it is acceptable, since those anchors are recent and machine-ugly.

**Decision needed (D2):** is `software/slam/go2_slam` (Unitree-specific, 1,400 words) correctly placed under `Software`, or should it live under `Guides`? Recommendation: leave the URL, tag it `go2`/`slam`, and let it surface on the Go2 hub — presence in a section matters far less than reachability once tags exist.

---

## 10. Migration plan

Phased so each stage ships independently and nothing is a cutover.

**Phase 0 — instrument (days).** Add analytics; apply for Algolia DocSearch (free for public documentation) to replace `docusaurus-lunr-search`. The reason to do this first is that DocSearch reports **zero-result searches** — a ranked list of what visitors cannot find, which beats both my inference and internal intuition. Two to three weeks of traffic makes the rest of the backlog self-evident.

**Phase 1 — structural fixes, no new content.** Restore `general/` to the navbar; replace the three index-pointing links with deep links; add `adt_v1/2/3` to the sidebar; delete the 13 inert `_category_.json` files or convert the sidebars to autogenerated; add `description` frontmatter to all 46 pages; fix 36 empty image alt attributes; enable `showLastUpdateTime`; fix `wr65` heading numbering.

**Phase 2 — navigation and taxonomy.** 4-tab navbar; `tags.yml` per instance with `onInlineTags: 'throw'`; tag all 7 guides and the SLAM page; section landing-page templates.

**Phase 3 — exemplar hub.** Rebuild `robot/humanoid/g1` as the full hub pattern. G1 is the right pilot: it has the most existing satellite content (3 guides, 4,975 words) and the largest single document on the site to connect.

**Phase 4 — support section.** The six pages in §8. Scaffolded by me, completed by whoever owns warranty terms and fault codes.

**Phase 5 — roll out hubs.** Remaining 19 product pages against the §6 templates. Order by traffic once Phase 0 data exists.

**Phase 6 — resolve duplication.** Devkit v1.0/v1.1, and the ADT versions, under the §5 rules.

---

## 11. Open decisions

| ID | Decision | Recommendation |
| --- | --- | --- |
| D1 | 4 tabs with a Products dropdown, or 6 flat tabs | 4 with dropdown |
| D2 | Does `go2_slam` stay under Software | Yes — tag it instead of moving it |
| D3 | Revision-variant strategy: `<Tabs>`, partials, or Docusaurus versioning | `<Tabs>` for devkit and ADT; native versioning only if you start supporting multiple concurrent product generations |
| D4 | Explicit sidebars or autogenerated from `_category_.json` | Autogenerated — removes the §2.4 trap and makes new pages appear without a sidebar edit |
| D5 | Chinese locale (`zh-Hans`) — pages currently link 9 CN manuals versus 6 EN | Out of scope here; decide after Phase 0 shows locale traffic |
| D6 | Analytics platform and GA4 property / DocSearch application | Needs your accounts |
| D7 | Authority for specifications: page or PDF | Page authoritative, PDF generated from it — process change on your side |
| D8 | Who owns doc review, and is there a definition of done for a product page | Needed before Phase 5 |

---

## 12. Success criteria

Worth agreeing before Phase 1, so the work can be judged rather than debated:

- **Findability** — zero-result search rate falls; searches for terms that have a page stop returning nothing.
- **Reachability** — every published page is in a sidebar (today: `adt_v1/2/3` are not) and every product hub links to all guides tagged for it.
- **Engagement** — product-hub → guide click-through becomes measurable and non-trivial; `g1_dev_guide` traffic stops depending on someone opening the Tutorials tab.
- **Support deflection** — ticket volume on topics that gain a page (serial number location, warranty process, fault codes) falls; incoming tickets arrive with the checklist information already attached.
- **Consistency** — every product page conforms to its class template; no page has manual heading numbers or missing `description`.

The first and last are measurable within weeks. Support deflection needs a baseline, which is worth capturing now if ticket topics are tracked anywhere.
