# Product page template

> **Internal document — not published to the site.** Nothing under `docs/` is built; the preset docs instance is disabled.

Companion to [`ia-proposal.md`](./ia-proposal.md) §4 and §8. The worked example is [`robot/humanoid/g1.md`](../../robot/humanoid/g1.md).

This doubles as the **definition of done** for a product page (D8).

## The point of a product page

**Most platforms on this site are partner hardware** — Unitree, AgileX, UFactory, Kinova. Those vendors already publish specifications, API references and tutorials, and they maintain them. Restating that material creates two problems: it goes stale silently, and it buries the part only we can write.

So a product page for a partner platform is **not a datasheet**. Its job is:

| Do | Do not |
| --- | --- |
| Describe the unit **as we configure and supply it** — fitted sensors, IP addresses, credentials, pre-installed software | Restate degrees of freedom, torque, battery capacity |
| Provide a **guided path** — what to do in what order, and which upstream document to open at each step | Mirror the vendor's tutorials |
| State what **we have verified** on units we ship | Copy the vendor manual |
| **Curate** upstream references — say what each one is good for | Dump a list of vendor links |
| Answer questions **our customers actually ask us** | Duplicate the vendor FAQ |

The test: if a sentence would still be true for a unit bought directly from the vendor, and the vendor already says it, it probably does not belong here.

### Three supply relationships, not two

How much a page defers upstream depends on **who made the hardware and whose name is on it**. These are not the same question, and conflating them produced a real error: the WR65 and WRL63 pages were written asserting "we manufacture these, there is no vendor page to defer to" when both are in fact OEM Realman arms.

| Tier | What it is | Examples | What the page does |
| --- | --- | --- | --- |
| **1 — Partner platform** | Vendor's hardware, vendor's name | G1, Go2, B2, Z1, xArm, Piper, Kinova | Defer. Link the vendor, add what we configure and verify |
| **2 — OEM under our name** | Vendor's hardware, our name | WR65 ↔ Realman RM65, WRL63 ↔ Realman RML63 | Defer **and** publish the correspondence |
| **3 — Our own design** | We designed it | Power Regulator, CM4 / NanoPC carrier boards | We are upstream; publish in full |

**Tier 2 is the one that needs care.** A customer holding a WR65 cannot find Realman's documentation, because Realman have never heard of the WR65 — so the page must state the mapping explicitly, near the top, and again in the variant table. That is the one thing only we can write, and it is worth more than any specification.

Tier 2 is also the only case where a specification table earns its place, as a bridge between our part number and theirs. It comes with a condition: **date it and caveat it.** Our WR65 figures came from a 2023 manual, and by the time they were recovered Realman had dropped a variant, shortened the force-sensing reach from 638.5 mm to 627 mm, and restated sensor accuracy from < 0.1 % FS to ±0.5 % FS. Publishing them unqualified would have handed customers three wrong numbers with our name on them. Cross-check against the vendor's current page before publishing any spec table, and say which values you could not reconcile.

Tier 3 is where an explicit gap admonition **is** correct — the opposite of the tier 1 rule. On a partner page a missing figure is a division of labour and reads as deliberate. On our own page it is simply absent, and pretending otherwise sends a customer hunting a vendor site that does not exist.

## Section order

The order is deliberate and follows the audience decision in `ia-proposal.md` §0: this site serves customers who already own the hardware. They do not need persuading — they need to confirm *which* unit they have, then get it working. Marketing-shaped prose belongs on `westonrobot.com`.

| # | Section | Required | Purpose |
| --- | --- | --- | --- |
| — | Hero split | yes | High-level description + official vendor links, image on the right |
| 1 | **Getting started** | yes | The first-run sequence in outline, linking the guide that does it properly |
| 2 | **Key information** | yes | Related resources, credentials, network layout, electrical interfaces. A scannable summary, not an exclusive one |
| 3 | **Guides for this product** | yes | Table: guide · what it covers · when to reach for it. Plus the tag page |
| 4 | **Solutions for this platform** | if any | Only when a solution genuinely supports the platform |
| 5 | **Troubleshooting & FAQ** | yes | Model-specific answers; shared ones linked by anchor |
| 6 | **Support** | yes | Route into the Support section, with why it helps |

### Serial numbers live in one central place

There is **no "Identify your unit" section** on a product page. Serial number
locations for every platform live on [`/support/identify-your-product`](../../support/identify-your-product.md),
which is where a reader arrives when they are raising a ticket.

Duplicating it per product meant the same two sentences on 13 pages, each free to
drift from the others and from the central page. Where a product page needs to
mention it — for example because the model designation determines what is fitted
— state the fact inline in **Key information** and link the central page.

The central page links back to each product page it covers, so the relationship
is navigable both ways.

### There is no routing table

Earlier drafts of the G1 page opened with an "I want to… / Start here" table. It
was removed, because it duplicated the table of contents.

Measured against the finished page, **7 of its 8 rows pointed at a section already
listed in the TOC**, and the eighth pointed at the diagnostics guide, which the
Guides for this product section already lists with a "reach for it when" column.
Docusaurus also renders the TOC on mobile as a collapsible "On this page", so the
table was not earning its place on small screens either.

Its one genuine contribution was **intent phrasing** — "find the default login" is
easier to spot than "Access". Keep that value by naming sections concretely enough
that the TOC reads as a set of intents. `Logins and IP addresses` beats `Access`
for exactly this reason.

Two lessons worth keeping:

- A routing table only pays for itself when the page is long enough that the TOC
  is hard to scan, or when the destinations are mostly *off* the page. Neither is
  true of a product page with seven sections.
- The table originally justified itself by presenting a lifecycle order different
  from the page's section order. Once the sections were reordered to match that
  lifecycle, the table had nothing left to add. Aligning the two removed the need
  for one of them.

### One "Key information" section, not a specifications section

That heading is what caused the inconsistency it was meant to solve. Audited across the 13 robot pages it meant two unrelated things:

| Meaning | Pages | Verdict |
| --- | --- | --- |
| Vendor datasheet — dimensions, mass, payload, temperature, IP rating, materials | `xarm` (25 rows), `scout-mini` (13), `kinova-gen3-lite` (11) | **defer to vendor** |
| How you connect — interface photos, pinouts, onboard computer IPs and credentials | `g1`, `go2`, `b2`, `h1-2` (no datasheet table at all) | **keep — this is ours** |

Both are replaced by a single **Key information** section — a TL;DR of what a reader reaches for most:

- **Access** — default credentials and IP addresses. The most-used block on the page, and what support gets asked for most often.
- **Network layout** — which computer is theirs, and how the parts connect.
- **Electrical interfaces** — locations and pinouts, for mounting a payload.

An earlier draft also had an "As supplied" section listing fitted hardware in a four-row table. It was cut: the *existence* of a LiDAR is close to a vendor spec, and stating it in a table gave it the same weight as the credentials. Which bus each sensor is on is worth one sentence, not a table row.

### Avoid the bare-bones failure mode

Ten headings with two lines under each reads as unfinished, however accurate it is. Two rules keep a page substantial without padding it:

**Every section opens by saying what it is for.** Not "here are the interfaces" but "use these when mounting a payload or wiring anything to the robot". The reader should be able to tell from the first sentence whether this section is the one they need.

**Prefer tables that carry a "when you need this" column** over bare bullet lists of links. `Guide · what it covers · reach for it when` orients someone who does not yet know which guide they want; a list of three link titles does not.

**Use a diagram where the relationship matters more than the values.** See "Beyond tables" below — Mermaid is enabled site-wide and barely used.

**Explain what existing facts mean.** The G1's two onboard computers with fixed IPs are genuinely confusing on first contact — saying plainly that your code goes on the second one is not new information, it is the existing information made usable. This is where most of the substance comes from, and it invents nothing.

## Rules

**Related resources leads Key information.** SDKs, CAD models and training material
are among the first things a developer reaches for, and they were originally near the
bottom of the page — after troubleshooting. Order the subsections by how early
someone needs them, not by how reference-like they feel:

> Related resources → Logins and IP addresses → Network layout → Electrical interfaces

**Give it an explicit scope, or it becomes the old catch-all.** Twelve of the 13
robot pages still carry a `## Resources` section, and between them those sections
grew six ad-hoc sub-groupings — Basic Guides, CAD Models, Development, Manuals,
Software, Videos — with nothing defining what belonged where.

The name was never the problem; the missing scope was. So this section opens by
saying what it holds, and the two sentences after the table say what it does *not*:

> Files and repositories you clone or download to work with the robot.
>
> …vendor manuals, videos and the mobile app are on the official pages linked at the
> top of this page.

Guides live in their own section, vendor product information lives with the vendor.
Anything that fits neither belongs in one of those, not here.

**Point at the vendor's documentation without ranking it against ours.** One line,
no annotation:

> `This page does not repeat or replace <Vendor>'s documentation. It highlights the
information you reach for most often, and supplements it with what we have learned
from supplying and supporting these units — configuration, verified values, and our
own guides.

<Vendor>'s own documentation:

* [Official product page](...)
* [Official documentation](...)

Two failure modes to avoid, both of which this wording sidesteps:

- **Annotating each link.** The labels are identical on all 13 pages, so "—
  specifications, features" is boilerplate a reader skips after the second product
  page, and 26 more strings to keep consistent. Elsewhere a link *should* say what
  it is for; these two are the same everywhere, so the label already carries it.
- **Implying a depth hierarchy.** An earlier draft said the vendor "is the reference
  for anything beyond the basics", which casts our own content as the shallow end —
  untrue when it includes a 3,500-word development guide, diagnostics guides and
  verified configuration. The split is *scope*, not depth. "Supplement" carries that;
  "beyond the basics" does not.

**Do not claim exclusivity you have not checked.** An early draft of the G1 page
said Key information covered "the things Unitree's documentation does not cover".
That was asserted rather than verified, and it was mostly false — Unitree publishes
the IP addresses, credentials, network layout and interface diagrams too.

The honest value is **curation, not exclusivity**: it is collected, short, scannable
with the robot in front of you, and true of the units we ship. That is worth saying
and it does not require a claim about what the vendor omits. If you do want to say
something is undocumented upstream, check first.

**Never invent a specification.** A plausible wrong figure is worse than no figure — on a hardware site it can cause a bad purchase or a damaged robot.

For a partner platform this is not a gap to apologise for — it is the division of labour. State it plainly at the head of the Specifications section:

> These are the figures we have verified on the units we supply. Degrees of freedom, joint torques, payload, battery capacity and runtime are published by \<vendor\> — see the links at the top of this page rather than a second-hand copy here.

An admonition block announcing missing data reads as unfinished. A sentence explaining who owns which numbers reads as deliberate, and it is also true.

**No manual heading numbers.** `## 1. Overview` produces the anchor `#1-overview`, which breaks the moment a section is inserted above it — silently invalidating every anchor a support engineer has pasted into a ticket. See `ia-proposal.md` §8.

**Do not duplicate a guide.** Link it. The bring-up procedure lives in the guide; the product page points at it.

**Shared FAQ answers live once**, on [`/support/faq`](../../support/faq.md). Keep only model-specific questions on the product page, and link the shared ones by anchor. Anchors are validated at build time by `onBrokenAnchors: 'throw'`.

**The tag page is the canonical guide list.** Naming the guides inline is good for readers; the tag link is what stops the list rotting. Include both.

**Tags must be declared** in `tutorial/tags.yml` before use. `onInlineTags: 'throw'` fails the build on an undeclared tag.

## Beyond tables: diagrams and other elements

Tables are the default here because most product-page content is genuinely tabular. Where it is not, these are all available and mostly unused.

### What is already installed

| Element | Status | Use it for |
| --- | --- | --- |
| **Mermaid** (` ```mermaid `) | enabled site-wide; 6 diagrams in `g1_dev_guide.md`, 1 on the G1 product page | Anything with a *topology* or a *sequence* — network layout, wiring, data flow, decision paths |
| **Admonitions** (`:::note`, `:::warning`, `:::danger`, `:::tip`, `:::caution`) | in use across 9 files | Safety warnings, prerequisites, gotchas |
| **Tabs** (`@theme/Tabs`, `@theme/TabItem`) | available from `preset-classic`, **unused** | Per-model or per-revision variants of the same procedure — the mechanism `ia-proposal.md` §7 specifies |
| **`<details>`** | MDX built-in, **unused** | Long output dumps, optional detail, per-model spec tables you do not want dominating the page |
| **`react-player`** | installed, used once | Vendor videos, demonstrations |
| Code blocks with `title=` and line highlighting | built-in, unused | Config files, showing which line to change |

`docusaurus-plugin-image-zoom` is now installed and wired to `.markdown :not(a) > img`, so pinout and interface photos enlarge on click — a connector pinout is exactly the image someone needs to zoom. Say so in the caption ("Click either image to enlarge") where it is not obvious.

### Product images: sourcing and provenance

Hero images are almost always **the vendor's copyright**, not ours. As their distributor or OEM partner we very likely have the right to use them, but that is a commercial question about a specific agreement, not something to assume silently. So:

- **Prefer an officially supplied asset pack** over anything scraped from a web page. Ask the vendor; under an OEM agreement they usually have one.
- **Record where every image came from** in the table below, so the rights position for any given file can be checked later instead of reconstructed.
- **Never crop out a watermark or a vendor logo to make an image look like ours.** Removing a badge that sits *beside* the product in a composite render is fine; removing branding *from* the product is not.

| File | Product | Source | Notes |
| --- | --- | --- | --- |
| `robot/img/realman/wr65.png` | WR65 | Realman [RM65 product page](https://www.realman-robotics.com/en/products/rm65.html) (`RM65-标准版`) | Vendor render. Alpha-trimmed, downscaled to 720 px tall |
| `robot/img/realman/wrl63.png` | WRL63 | Realman [RML63 product page](https://www.realman-robotics.com/en/products/rml63.html) (`RML63-标准版`) | Vendor render. Alpha-trimmed, downscaled to 720 px tall |
| `robot/img/ufactory/xarm.png` | xArm 6 | UFactory [xArm 6 product page](https://www.ufactory.cc/product-page/ufactory-xarm-6/) (`xarm56-1305_画板-1-副本-2.png`) | Vendor render. A UFACTORY badge occupying the top 14 % of the canvas, separate from the arm, was masked out; the arm itself is untouched |
| `peripheral/img/westonrobot/power_regulator_v2.jpg` | Power Regulator v2 | Photographed in-house | **Ours — no rights question.** Cropped to the unit and downscaled. The serial-number label is legible when zoomed; redact it if that matters |

The three vendor renders are **pending confirmation** that our agreements cover documentation use. Replace with vendor-supplied assets if that is cleaner. The regulator photo is our own and needs no such check.

Two mechanical notes learned doing these:

- **Trim transparent padding in the file, not with CSS.** `size="hero"` constrains height to 260 px, so baked-in padding shrinks the product. The WR65 render was 66 % padding before trimming.
- **Check the image on a dark background before committing it.** A render with an opaque light-grey studio backdrop looks fine in light mode and like a glowing box in dark mode. Keying a uniform background to transparency works; flood-filling a *gradient* studio floor does not, because a white product against a light floor has no edge to stop at.

### When a diagram beats a table

Reach for Mermaid when the relationship between things matters more than their attributes:

- **Network and wiring topology.** The G1 has two computers on an internal subnet reached through a switch. A table lists them; a diagram shows that you SSH to one and it talks to the other. See `robot/humanoid/g1.md`.
- **Sequences.** First-run order, recovery procedures, RMA process.
- **Decision paths.** "Which variant do I have", "which guide do I need".
- **Architecture.** Which layer runs where — the dev guide's SDK-versus-ROS 2 diagram is a good example.

Keep a table when the reader wants to *look up a value* — specifications, pinouts, IP addresses, credentials. Often both is right: the G1 page carries the topology diagram *and* the address table, because one orients and the other is a reference.

### Mermaid notes specific to this site

Mermaid renders **client-side**. The diagram source ships in the JS bundle, not the static HTML, so `grep`ping `build/*.html` for it finds nothing — that is expected, not a failure. To verify a diagram, open the page in a browser.

Escape `&` as `&amp;` inside node labels, or the label truncates.

Diagram colours should come from the site palette rather than Mermaid defaults if you style at all — `#0f6e78` for emphasis is what the G1 diagram uses to mark the computer the reader actually works on.

Mermaid supports far more than flowcharts: sequence, state, entity-relationship, C4 architecture, block, timeline, mindmap and quadrant diagrams are all available without installing anything.

## Specification blocks by class

Include the rows you have verified. Do not add a row you cannot fill — instead name the omissions in the vendor-pointer line beneath the table.

| Class | Rows |
| --- | --- |
| **UGV** | drive type · dimensions · ground clearance · payload · max speed · slope/tilt limit · IP rating · battery and charge time · user power output · CAN/serial interface |
| **Quadruped** | DOF · payload · max speed · battery · IP rating · electrical interfaces · onboard computer · remote/controller |
| **Humanoid** | DOF · height · weight · payload · battery · electrical interfaces · onboard computer · network and development access |
| **Manipulator** | DOF · reach · payload · repeatability · mounting · TCP I/O · end effectors · control interface |

## Skeleton

```markdown
---
sidebar_position: 1
description: "<Vendor> <Model> <class>: setup, interfaces, guides and support resources."
---

# <Model>

<Split ratio="wide-narrow">

<div>

<One or two sentences: what it is and how you work with it. No specifications —
those belong to the vendor.>

<Vendor>'s own documentation: [product page](...) · [developer documentation](...)

</div>

<Figure
  src={require('../img/<vendor>/<file>').default}
  alt="<what the image actually shows>"
  size="hero" />

</Split>

## Getting started

Read [Operational Safety](/tutorial/operational-safety) before powering the robot
for the first time. <One sentence on the platform-specific risk.>

The first-run sequence is covered end to end in **[<bring-up guide>](...)**. In
outline:

1. <step>
2. <step>

## Key information

A quick reference for what you reach for most often. <Vendor> documents all of
this in more depth — collected here so you can scan it with the robot in front of
you. Values below are as configured on the units we supply.

### Related resources

| Resource | What it is | Where |
| --- | --- | --- |
| <name> | <what it is for> | [<link>](...) |

### Logins and IP addresses

| Computer | Address | Credentials | What it is |
| --- | --- | --- | --- |
| **<name>** | `<ip>` | `<user>` / `<pass>` | <role> |

<How you reach it, and any constraint — wired only, and so on.>

<One sentence on fitted sensors and which bus each is on.>

<If the model ships in variants, say so and link
[Identify your product](/support/identify-your-product).>

### Network layout

<A Mermaid diagram if there is more than one computer, a switch, or a fixed subnet.>

### Electrical interfaces

<What these are for — mounting a payload, wiring something in — then the images.>

<FigureGrid columns={2}>
  <Figure src={require('...').default} alt="..." framed caption="..." />
</FigureGrid>

## Guides for this product

| Guide | What it covers | Reach for it when |
| --- | --- | --- |
| [<Guide>](...) | <scope> | <trigger> |

**[All <Model> guides](/tutorial/tags/<tag>)** — generated from the `<tag>` tag,
so anything published later appears there without this page being edited.

## Troubleshooting & FAQ

### <Model-specific question>

### Questions that apply across our platforms

These are answered once on the [Support FAQ](/support/faq) rather than repeated
per model:

- [<Question>](/support/faq#<anchor>) — <one clause on the answer>

For fault and alarm codes, see [Fault codes](/support/fault-codes).

## Support

Collect the serial number, firmware version and logs before raising a ticket —
[Before you contact us](/support/before-you-contact-us) lists what helps and
includes the commands to gather it.

- [Support centre](/support/intro) — all support resources
- [Fault codes](/support/fault-codes) — what an error or alarm code means
- [Warranty and RMA](/support/warranty-and-rma) — repairs, replacements, returns
```

## Checklist

**Structure**
- [ ] Frontmatter has a `description`
- [ ] Section names are concrete enough that the TOC reads as a set of intents
- [ ] Every in-page anchor resolves
- [ ] Section order matches the table above
- [ ] No manual heading numbers

**Substance — the anti-bare-bones checks**
- [ ] Every section's first sentence says what the section is for
- [ ] Guides are in a table with a "reach for it when" column, not a bare link list
- [ ] Downloads say what each resource is for, not just its name
- [ ] Anything genuinely confusing about the hardware is explained, not merely stated
- [ ] Anything with a topology or a sequence is a diagram, not a paragraph
- [ ] Per-model or per-revision variants use `<Tabs>` rather than repeated sections

**Accuracy**
- [ ] No specification present that is not verified
- [ ] No claim that the vendor omits something, unless checked
- [ ] Missing figures handled as a vendor pointer, not an admonition
- [ ] Every image has meaningful alt text — not empty, not "image", not a position like "Left Top"
- [ ] Serial number location recorded on `/support/identify-your-product`, **not** on the product page

**Wiring**
- [ ] Model has a declared tag in `tutorial/tags.yml`
- [ ] Tag page linked as well as guides named inline
- [ ] Shared FAQ answers linked by anchor, not copied
- [ ] `npm run build` passes — this is what validates links, anchors and tags

## Rollout status

| Page | Class | Hub applied |
| --- | --- | --- |
| `robot/humanoid/g1` | Humanoid | ✅ exemplar |
| `robot/humanoid/h1-2` | Humanoid | ✅ converted — no guides tagged, so that section is omitted |
| `robot/quadruped/go2` | Quadruped | ✅ converted |
| `robot/quadruped/b2` | Quadruped | ✅ converted — 197 lines of pinout tables passed through untouched |
| `robot/ugv/scout-mini` | UGV | ✅ converted — no onboard computer, so Logins and Network layout omitted |
| `robot/ugv/ranger-mini-v2` | UGV | ✅ converted — calibration extracted to a shared guide |
| `robot/ugv/ranger-mini-v3` | UGV | ✅ converted — calibration extracted to a shared guide |
| `robot/manipulator/wr65` | Manipulator (tier 2) | ✅ converted — reframed as OEM Realman RM65; specs recovered from the 2023 archive and cross-checked, two values could not be reconciled |
| `robot/manipulator/wrl63` | Manipulator (tier 2) | ✅ converted — reframed as OEM Realman RML63, same cross-check |
| `robot/manipulator/xarm` | Manipulator | ✅ converted — fixed a 404 vendor link, then a second link that pointed at the downloads page rather than the product page; image added |
| `robot/manipulator/z1` | Manipulator | ✅ converted |
| `robot/manipulator/piper` | Manipulator | ✅ converted |
| `robot/manipulator/kinova-gen3-lite` | Manipulator | ✅ converted — emoji headings removed |

Systems still need their own variant. See below for peripherals.

## Peripheral pages

Most rules above carry over unchanged — the three supply tiers, sentence-case headings, no routing table, serial numbers centralised, `<Figure>` over raw `<img>`. What differs is **which questions the page has to answer**.

A robot is the thing the customer bought. A peripheral is a **part**, and the questions follow from that:

| A robot page answers | A peripheral page answers |
| --- | --- |
| How do I bring it up? | What does it attach to, and will it work with my platform? |
| What are the logins and IP addresses? | Same — for anything with an OS or a web UI |
| Where are the electrical interfaces? | What are its ports, **and how do they appear to software**? |
| What guides exist for it? | Same |
| — | What are its limits, and what happens when I exceed them? |

### Section order — the same titles as a robot page

Peripheral pages use the **same section titles** as robot pages wherever they carry the same kind of content. A reader moving between a robot page and a peripheral page should not have to learn a second vocabulary, and "where are the credentials" should have one answer across the site.

An earlier draft invented `Fitting it` and `Interfaces and device nodes`. Both were renamed: the content maps cleanly onto `Getting started` and `Electrical interfaces`, so the new names bought nothing and cost consistency.

| # | Section | Required | Difference from a robot page |
| --- | --- | --- | --- |
| — | Hero split | yes | Same. Vendor links for tier 1 and 2 |
| 1 | **Getting started** | yes | A fitting and bring-up sequence — mount, power, wire, bring the interfaces up |
| 2 | **Key information** | yes | Same container, different subsections available |
| 2a | → **Related resources** | yes | Same, and still first |
| 2b | → **Logins and IP addresses** | if it has any | Same title. Applies to the router's web UI and to the onboard computers |
| 2c | → **Electrical interfaces** | yes | Same title, wider scope — includes power input and **device nodes** |
| 2d | → **Control interface** | if it has one | Same title already used on `wr65` and `xarm` |
| 2e | → **Specifications** | yes | As-supplied figures, per the deferral rule below |
| 3 | **Common configurations** | if any | **Peripheral-only.** Short inline procedures. Robot pages send these to `/tutorial/` guides; these are too small to extract |
| 4 | **Guides for this product** | if any | Same |
| 5 | **Troubleshooting & FAQ** | yes | Same |
| 6 | **Support** | yes | Same |

`Network layout` has no peripheral equivalent so far. A device-specific subsection is fine where the hardware needs one — `Status LEDs` on the regulator is diagnostic reference you reach for with the unit in front of you, which is exactly what Key information is for.

### Electrical interfaces means device nodes, not just connectors

This is where a peripheral page earns its place, and it is the one thing no vendor datasheet gives you. `nanopc.md` already does it well:

- **the mapping from silkscreen to `/dev`** — `RS485-1` is `/dev/ttyS6`, and nothing on the board says so
- **the command to bring an interface up** — CAN needs `ip link set can0 up type can bitrate 500000` before it exists to software
- **jumper and DIP switch meaning** — which pad selects RS232 vs TTL, which switch enables termination
- **the limits that bite** — the 5 V rail is behind a 300 mA resettable fuse

A customer can read a pin count off the vendor's datasheet. They cannot guess `/dev/ttyS4`.

Limits like that fuse belong in a `:::warning`, not a trailing blockquote. It was the last line of the page, below three other notes.

### Specifications: the same deferral rule, applied harder

Peripheral pages are currently the worst offenders on this site. `j4012.md` was 46 lines of transcribed Seeed datasheet — H.265 decode rates, vibration tolerance in Grms — for a device whose actual support questions are "what is flashed on it", "which ports are broken out" and "what voltage does the robot feed it". `industrial_5g_router.md` listed roughly sixty 5G band designations, then pointed at the module datasheet for the real detail.

Keep a specification only if it answers **will this work in my situation**: power input range, operating temperature, physical size and mounting, port counts, what is fitted on the unit we ship (RAM, storage, OS). Send everything else to the vendor.

For tier 3 carrier boards — the CM4 and NanoPC computers — the vendor link covers the **base board only**. Scope it explicitly, the way `nanopc.md` does: "not including the extensions made by Weston Robot". Our ports are the reason the product exists and are ours to document in full.

### Rollout status

| Page | Tier | Status |
| --- | --- | --- |
| `peripheral/computer/nanopc` | 3 — our carrier on a FriendlyELEC SBC | ✅ exemplar |
| `peripheral/computer/j4012` | 1 — Seeed reComputer | ✅ converted — datasheet transcription cut back |
| `peripheral/computer/cm4` | 3 — our carrier on a Raspberry Pi CM4 | ✅ converted — surfaced that its CAN and RS485 are **isolated**, which the NanoPC's are not. **Device nodes still needed** |
| `peripheral/network/industrial_5g_router` | 2 — rebadged, Quectel RM520N-GL module | ✅ converted — ~60 band designations cut to a Quectel link; default address promoted out of a procedure step. **Vendor and credentials still unknown** |
| `peripheral/power/power_regulator_v2` | 3 — our design | ✅ converted — photo now exists, documenting an XT60 input the text never mentioned |
| `peripheral/sensor/manifold_pocket` | 1 — Manifold | ✅ converted — specs kept in full, deliberately: they decide whether a capture works before travelling to site |

Open gaps across the set, all needing domain knowledge rather than editing:

- **No default credentials are documented** for the NanoPC, CM4, J4012 or the router's web interface.
- **No device-node mapping for the CM4.** The NanoPC page has one and it is the most valuable thing on it; the CM4's is simply not written down anywhere.
- **The router's manufacturer is unidentified.** It is tier 2, so there should be a vendor to point at; only the cellular module (Quectel RM520N-GL) is known.
- **Compatibility is unstated everywhere.** No peripheral page says which platforms it is used with, which is the first question a "will this work with my robot" reader has.

## System pages

A system is several peripherals supplied pre-integrated. The page uses the **same sections as a robot page**, with one addition — **`What's in the kit`** under Key information, listing the base configuration, optional computers and extension modules, each linking to its own peripheral page.

The deferral rule applies internally as well as to vendors: the devkit page gives the regulator's **output rails**, because that is what you wire a payload to, and links the [Power Regulator page](../../peripheral/power/power_regulator_v2.md) for fusing, connectors, CANopen and channel behaviour. It previously restated the whole port table, creating a second copy to drift.

### Versions are tabs, not pages

The UGV devkit shipped as `v1.0.md` and `v1.1.md`, **76 % identical line for line**. Every edit had to be made twice, and had not been: v1.1 had drifted to using `#` for all its sections, giving it four `<h1>`s.

They are now one page. The real differences — onboard computer, dimensions, extension layer, side doors — are a **six-row comparison table**, which answers "which one do I have" better than two pages ever did. Bulky per-version content (frame photos, the reconfiguration procedure) uses `<Tabs groupId="devkit-generation">`; the shared `groupId` means choosing v1.0 in one place selects it everywhere on the page, and the choice persists across pages.

This is the mechanism `ia-proposal.md` §7 specifies for per-revision variants, previously unused.

**Both old URLs redirect**, because customers and support tickets carry them.

Reach for a version table when differences are a handful of values; tabs when they are blocks of content; separate pages only when the versions genuinely diverge in what you *do* with them.

### Tabbed images must be trimmed, or they look mis-sized

Two images of the same thing rarely carry the same margin. Across the devkit set, padding ranged from 4 % (`base_iso`) to 62 % (`front_plate`), so at equal display width the content inside one could appear half the size of its counterpart — switching tabs looked like a zoom change rather than a version change.

**Trim every tabbed image to its content.** Nothing else is needed: once content fills the frame, a width-constrained image renders its content at the same width in both tabs, and a height-constrained one (`size="hero"`) at the same height. Padding to a shared aspect ratio is not required and costs resolution.

Measured on the devkit page after trimming:

| | v1.1 | v1.0 |
| --- | --- | --- |
| Hero (`size="hero"`, height-capped) | 256 × **260** | 280 × **260** |
| Regulator (`size="lg"`, width-capped) | **680** × 363 | **680** × 314 |

Pair images of like kind, too. The devkit hero pairs two isometric CAD drawings; pairing a photograph against a line drawing looks mismatched however carefully it is sized.

These drawings are black line art on white and are **not** keyed to transparency — black strokes on a transparent background disappear in dark mode. They keep their white background and use `framed`. Quantising them to a 256-colour palette is visually lossless and cut the set from 1472 KB to 595 KB; do **not** do this to screenshots or photographs, which need thousands of colours and will band.

### Rollout status

| Page | Status |
| --- | --- |
| `system/intro` | ✅ product cards |
| `system/ugv_devkit` | ✅ v1.0 and v1.1 merged; comparison table plus tabs; four redirects added |
| `system/ugv_devkit/component_reconfiguration` | ✅ two near-identical pages merged, tabbed by generation |
| `system/ugv_devkit/v1/*` | ⬜ four guides, still in their original shape |

The sidebar previously listed only the two version pages, leaving four guides reachable only through inline links and **`getting_started` reachable from nowhere at all** — 428 words with no inbound link from any page or sidebar. All five now appear under the category, which itself links to the product page.

Open gap: no serial-number location for the devkit on [Identify your product](../../support/identify-your-product.md).

## Solution pages

A solution is software we develop and deploy, not hardware you own. Most of the skeleton still carries over; two sections are specific to software.

| # | Section | Required | Difference from a product page |
| --- | --- | --- | --- |
| 1 | **Getting started** | yes | What you need, install, first run. Was `Deployment` |
| 2 | **Key information** | yes | Related resources · Supported platforms · Configuration · Versions · Integration |
| 3 | **Using it** | yes | **Solution-only.** Day-to-day operation. Hardware sends this to guides; for software it *is* the documentation |
| 4 | **Known limitations** | yes | **Solution-only.** Where it does not work. Prevents bad deployments and the tickets that follow |
| 5 | **Troubleshooting & FAQ** | yes | Same |
| 6 | **Support** | yes | Same |

`Supported platforms` is the most important table on a solution page: a customer needs to know whether it runs on the robot they already own, and what else they must buy.

Two sections were dropped from the earlier scaffold. `At a glance` went for the same reason it went from robot pages — it duplicated content below it and dated quickly. `Release notes` folded into `Key information › Versions`, because with versions as tabs the comparison table *is* the release note.

### Versions are tabs here too

ADT shipped as `intro` plus `v1`, `v2` and `v3`, with **v2 and v3 75 % identical**. The real delta was small and specific: the package was renamed `wr-ad-toolbox` → `wr-mission-control`, the separate TLS certificate install was dropped, and the settings gear moved. Three pages carried that.

It is now one page with **five linked tab groups** sharing `groupId="adt-version"` — hero, Getting started, teleoperation panel, Settings, and gamepad pairing. Choosing a version once selects it in all five, so a v1 operator reads a v1 page end to end without re-choosing. Verified in the browser: one click switches all five groups and only that version's images render.

v1 is a genuinely different architecture — a server on the robot, and a client pointed at an IP address rather than logging in — and tabs absorb that unevenness fine. That is what they are for.

**All six old URLs redirect.** Note the trap: `/software/toolbox/adt_v1` already redirected to `/solution/adt/v1`. Client-side redirects **do not chain**, so deleting `v1` would have left that pointing at a 404. Existing redirects had to be repointed at the new target, not stacked on top.

### Rollout status

| Page | Status |
| --- | --- |
| `solution/intro` | ✅ product cards; its "what each page covers" table now describes what the pages actually contain |
| `solution/adt/intro` | ✅ v1/v2/v3 merged into one tabbed page; six redirects |
| `solution/navigation` | ⬜ draft scaffold, vocabulary aligned |
| `solution/industrial-patrolling` | ⬜ draft scaffold, vocabulary aligned |

The hub previously promised a section list — Supported platforms, Deployment, Configuration, Release notes, Known limitations — that only the two unpublished drafts followed. The one live solution used a completely different shape, so the promise was false for everything a customer could actually reach.

Open gaps: ADT has **no `Supported platforms` table** and no `Known limitations` section, both of which need product knowledge. v1's install instructions also predate our apt-source guide and originally hardcoded the repository URL with the deprecated `apt-key add`; they now link [Apt Source](../../tutorial/installation/apt_source.md), which should be confirmed as correct for v1.
