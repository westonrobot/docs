# Product page template

> **Internal document — not published to the site.** Nothing under `docs/` is built; the preset docs instance is disabled.

Companion to [`ia-proposal.md`](./ia-proposal.md) §4 and §8. The worked example is [`robot/humanoid/g1.md`](../../robot/humanoid/g1.md).

This doubles as the **definition of done** for a product page (D8).

## Section order

The order is deliberate and follows the audience decision in `ia-proposal.md` §0: this site serves customers who already own the hardware. They do not need persuading — they need to confirm *which* unit they have, then get it working. Marketing-shaped prose belongs on `westonrobot.com`.

| # | Section | Required | Purpose |
| --- | --- | --- | --- |
| — | Title, hero image, one-line description | yes | What it is, in one sentence |
| 1 | **At a glance** | yes | The figures someone checks before reading anything else |
| 2 | **Identify your unit** | yes | Serial number location; revision/variant if applicable |
| 3 | **Getting started** | yes | Link the bring-up guide; do not duplicate it |
| 4 | **Specifications** | yes | Electrical interfaces, onboard computer, dimensions |
| 5 | **Guides for this product** | yes | Named guides plus the tag page |
| 6 | **Solutions for this platform** | if any | Only when a solution actually supports the platform |
| 7 | **Troubleshooting & FAQ** | yes | Model-specific only; link shared answers |
| 8 | **Downloads** | yes | Manuals, CAD/STEP, training material |
| 9 | **Software** | yes | SDKs, ROS packages, vendor docs |
| 10 | **Support** | yes | Route to the Support section |

Downloads and Software are separated because they answer different questions — "send me the PDF" versus "what do I build against".

## Rules

**Never invent a specification.** If a figure is not documented, say so in a `:::note Not yet documented` block naming the authoritative external source. A visible gap is actionable; a plausible wrong number is worse than nothing, and on a hardware site it can cause a bad purchase or a damaged robot.

**No manual heading numbers.** `## 1. Overview` produces the anchor `#1-overview`, which breaks the moment a section is inserted above it — silently invalidating every anchor a support engineer has pasted into a ticket. See `ia-proposal.md` §8.

**Do not duplicate a guide.** Link it. The bring-up procedure lives in the guide; the product page points at it.

**Shared FAQ answers live once**, on [`/support/faq`](../../support/faq.md). Keep only model-specific questions on the product page, and link the shared ones by anchor. Anchors are validated at build time by `onBrokenAnchors: 'throw'`.

**The tag page is the canonical guide list.** Naming the guides inline is good for readers; the tag link is what stops the list rotting. Include both.

**Tags must be declared** in `tutorial/tags.yml` before use. `onInlineTags: 'throw'` fails the build on an undeclared tag.

## Specification blocks by class

Include the rows you have; omit rows you do not, and list the omissions in the "Not yet documented" note.

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
description: "<Vendor> <Model> <class>: identifying your unit, getting started, specifications and guides."
---

# <Model>

![<what the image shows>](../img/<vendor>/<file>)

<One or two sentences. What it is and what it ships with.>

## At a glance

| | |
| --- | --- |
| <row> | <value> |

:::note Not yet documented

<Figures not recorded here.> Until they are, <authoritative external source> is
the reference.

:::

## Identify your unit

<Where the serial number is.> See [Identify your product](/support/identify-your-product).

## Getting started

<Link the bring-up guide.>

Before operating for the first time, read [Operational Safety](/tutorial/operational-safety).

## Specifications

### Electrical interfaces

### Onboard computer

## Guides for this product

* [<Guide>](/tutorial/<path>) — <what it covers>

**[All <Model> guides](/tutorial/tags/<tag>)** — generated from the `<tag>` tag,
so newly published guides appear there without this page being edited.

## Troubleshooting & FAQ

### <Model-specific question>

### Questions that apply to more than one platform

Answered on the [Support FAQ](/support/faq) rather than repeated here:

* [<Question>](/support/faq#<anchor>)

## Downloads

## Software

## Support

Before raising a ticket, collect the serial number, firmware version and logs —
see [Before you contact us](/support/before-you-contact-us).

* [Support centre](/support/intro)
* [Fault codes](/support/fault-codes)
* [Warranty and RMA](/support/warranty-and-rma)
```

## Checklist

- [ ] Frontmatter has a `description`
- [ ] No manual heading numbers
- [ ] Every image has meaningful alt text — not empty, not "image", not a position like "Left Top"
- [ ] Undocumented specifications are named in a "Not yet documented" note, not omitted silently
- [ ] Serial number location stated, or `TODO` on `/support/identify-your-product`
- [ ] Guides listed inline **and** the tag page linked
- [ ] Model has a declared tag in `tutorial/tags.yml`
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
