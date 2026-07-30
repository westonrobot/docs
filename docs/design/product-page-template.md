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
| 1 | Routing table (**no heading**) | yes | `I want to… / Start here`. The columns self-label it, so a heading would only add a redundant TOC entry above a table already at the top of the page |
| 2 | **Identify your unit** | yes | Serial number location and variant, and why it is asked for |
| 3 | **Getting started** | yes | The first-run sequence in outline, linking the guide that does it properly |
| 4 | **As supplied** | yes | What the unit carries and how each part is reached |
| 5 | **Connecting to it** | yes | Network layout, credentials, electrical interfaces and pinouts |
| 6 | **Guides for this product** | yes | Table: guide · what it covers · when to reach for it. Plus the tag page |
| 7 | **Solutions for this platform** | if any | Only when a solution genuinely supports the platform |
| 8 | **Troubleshooting & FAQ** | yes | Model-specific answers; shared ones linked by anchor |
| 9 | **Downloads and software** | yes | One table: resource · what it is · where |
| 10 | **Support** | yes | Route into the Support section, with why it helps |

### The routing table has a canonical row set

The rows are the same on every product page, in the same order, so a reader who
has used one page can scan the next without re-reading it. Omit a row only when
the destination genuinely does not exist for that platform; never reorder.

The order is the customer's lifecycle: *what have I got* → *identify it* → *set it
up* → *connect to it* → *extend it* → *use it* → *fix it* → *reference* → *help*.

| # | I want to… | Destination | Omit when |
| --- | --- | --- | --- |
| 1 | check what my unit includes | `#as-supplied` | never |
| 2 | set it up for the first time | `#getting-started` → bring-up guide | never |
| 3 | reach its onboard computer, or get it online | `#network-layout` → networking guide | platform has no onboard computer |
| 4 | wire a payload, or find a connector pinout | `#electrical-interfaces` | no published interface diagram |
| 5 | do something specific with it | `#guides-for-this-product` | no guides tagged yet |
| 6 | work out why something is wrong | diagnostics guide → `#troubleshooting--faq` | never |
| 7 | get a manual, CAD model or the SDK | `#downloads-and-software` | never |
| 8 | contact Weston Robot | `#support` | never |

**There is deliberately no "find my serial number" row.** Identify your unit is
already the first section and the first TOC entry, As supplied links to it inline,
and the Support row leads to `before-you-contact-us` where the serial number is
the first checklist item. A row for it sat next to "check what my unit includes"
answering the same question twice.

The routing table earns its place by being short enough to scan. Every row added
makes the remaining ones less likely to be read, so a destination reachable three
other ways does not need one.

Two conventions that matter:

**The left cell completes the header.** The header is "I want to…", so cells are
lowercase verb phrases — "set it up for the first time", not "Set It Up For The
First Time". Sentence-case cells read as a list of titles rather than a sentence
the reader is finishing.

**An arrow means "and then".** `#getting-started` → `G1 Development Guide` says
the section orients you and the guide does the work. Use it when the destination
is a two-step path, not as decoration.

### There is deliberately no "Specifications" section

That heading is what caused the inconsistency it was meant to solve. Audited across the 13 robot pages it meant two unrelated things:

| Meaning | Pages | Verdict |
| --- | --- | --- |
| Vendor datasheet — dimensions, mass, payload, temperature, IP rating, materials | `xarm` (25 rows), `scout-mini` (13), `kinova-gen3-lite` (11) | **defer to vendor** |
| How you connect — interface photos, pinouts, onboard computer IPs and credentials | `g1`, `go2`, `b2`, `h1-2` (no datasheet table at all) | **keep — this is ours** |

Splitting it into **As supplied** and **Connecting to it** removes the ambiguity: neither name invites copying a datasheet, and both describe something the vendor cannot write because it is about the unit *we* ship.

### Avoid the bare-bones failure mode

Ten headings with two lines under each reads as unfinished, however accurate it is. Two rules keep a page substantial without padding it:

**Every section opens by saying what it is for.** Not "here are the interfaces" but "use these when mounting a payload or wiring anything to the robot". The reader should be able to tell from the first sentence whether this section is the one they need.

**Prefer tables that carry a "when you need this" column** over bare bullet lists of links. `Guide · what it covers · reach for it when` orients someone who does not yet know which guide they want; a list of three link titles does not.

**Use a diagram where the relationship matters more than the values.** See "Beyond tables" below — Mermaid is enabled site-wide and barely used.

**Explain what existing facts mean.** The G1's two onboard computers with fixed IPs are genuinely confusing on first contact — saying plainly that your code goes on the second one is not new information, it is the existing information made usable. This is where most of the substance comes from, and it invents nothing.

## Rules

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

![<what the image actually shows>](../img/<vendor>/<file>)

<Two or three sentences: what it is, what it ships with, and the one thing that
shapes how you work with it — e.g. wired-only development, or a CAN interface.>

| I want to… | Start here |
| --- | --- |
| check what my unit includes | [As supplied](#as-supplied) |
| set it up for the first time | [Getting started](#getting-started) → [<bring-up guide>](...) |
| reach its onboard computer, or get it online | [Network layout](#network-layout) → [<networking guide>](...) |
| wire a payload, or find a connector pinout | [Electrical interfaces](#electrical-interfaces) |
| do something specific with it | [Guides for this product](#guides-for-this-product) |
| work out why something is wrong | [<diagnostics guide>](...) → [Troubleshooting & FAQ](#troubleshooting--faq) |
| get a manual, CAD model or the SDK | [Downloads and software](#downloads-and-software) |
| contact Weston Robot | [Support](#support) |

## Identify your unit

<Where the serial number is, and why it is asked for.>

For other platforms, see [Identify your product](/support/identify-your-product).

## Getting started

Read [Operational Safety](/tutorial/operational-safety) before powering the robot
for the first time. <One sentence on the platform-specific risk.>

The first-run sequence is covered end to end in **[<bring-up guide>](...)**. In
outline:

1. <step>
2. <step>

## Specifications

### Electrical interfaces

<What these are for — mounting a payload, wiring something in — then the images.>

### Onboard computer

<What the reader needs to know to reach it and put code on it. If there is more
than one computer, say plainly which one is theirs.>

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

## Downloads and software

| Resource | What it is | Where |
| --- | --- | --- |
| <name> | <what it is for> | [<link>](...) |

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
- [ ] Routing table present directly under the hero, with no heading of its own
- [ ] Rows match the canonical set, in canonical order, lowercase continuations
- [ ] Every in-page anchor in the routing table resolves
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
- [ ] Missing figures handled as a vendor pointer, not an admonition
- [ ] Every image has meaningful alt text — not empty, not "image", not a position like "Left Top"
- [ ] Serial number location stated, or `TODO` on `/support/identify-your-product`

**Wiring**
- [ ] Model has a declared tag in `tutorial/tags.yml`
- [ ] Tag page linked as well as guides named inline
- [ ] Shared FAQ answers linked by anchor, not copied
- [ ] `npm run build` passes — this is what validates links, anchors and tags

## Rollout status

| Page | Class | Hub applied |
| --- | --- | --- |
| `robot/humanoid/g1` | Humanoid | ✅ exemplar |
| `robot/humanoid/h1-2` | Humanoid | ⏳ |
| `robot/quadruped/go2` | Quadruped | ⏳ partial — guides section only |
| `robot/quadruped/b2` | Quadruped | ⏳ partial — guides section only |
| `robot/ugv/scout-mini` | UGV | ⏳ partial — guides section only |
| `robot/ugv/ranger-mini-v2` | UGV | ⏳ partial — guides section only |
| `robot/ugv/ranger-mini-v3` | UGV | ⏳ partial — guides section only |
| `robot/manipulator/wr65` | Manipulator | ⏳ — thinnest page on the site, 83 words |
| `robot/manipulator/wrl63` | Manipulator | ⏳ — 83 words |
| `robot/manipulator/xarm` | Manipulator | ⏳ |
| `robot/manipulator/z1` | Manipulator | ⏳ |
| `robot/manipulator/piper` | Manipulator | ⏳ |
| `robot/manipulator/kinova-gen3-lite` | Manipulator | ⏳ |

Peripherals and systems need their own variant of this template; the section order mostly carries over, but "Identify your unit" and the specification block differ.
