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

### Weston Robot's own products are the exception

For [WR65](../../robot/manipulator/wr65.md), [WRL63](../../robot/manipulator/wrl63.md) and anything else we manufacture, **we are upstream**. There is no official page to defer to, so those pages do need full specifications — reach, payload, repeatability, mounting, control interface. They are currently the thinnest pages on the site at 83 words each, which is the inverse of where the detail should sit.

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

Not installed, worth considering: an image-zoom plugin. The pinout and interface photos on product pages are currently unclickable, and a connector pinout is exactly the image someone needs to enlarge.

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
| `robot/ugv/ranger-mini-v2` | UGV | ⏳ partial — guides section only |
| `robot/ugv/ranger-mini-v3` | UGV | ⏳ partial — guides section only |
| `robot/manipulator/wr65` | Manipulator | ⏳ — thinnest page on the site, 83 words |
| `robot/manipulator/wrl63` | Manipulator | ⏳ — 83 words |
| `robot/manipulator/xarm` | Manipulator | ✅ converted — fixed a 404 vendor link; no product image available |
| `robot/manipulator/z1` | Manipulator | ✅ converted |
| `robot/manipulator/piper` | Manipulator | ✅ converted |
| `robot/manipulator/kinova-gen3-lite` | Manipulator | ✅ converted — emoji headings removed |

Peripherals and systems need their own variant of this template. The section order mostly carries over, but what belongs under Key information differs — a power regulator has wiring and output configuration where a robot has logins and a network layout.
