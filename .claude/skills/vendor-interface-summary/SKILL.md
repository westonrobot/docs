---
name: vendor-interface-summary
description: Write or update a customer-facing hardware/electrical-interface summary on a product page (any robot, any vendor) — organize by physical location, extract only customer-relevant behavior, never reproduce vendor pin-level tables. Use whenever writing or revising an "Electrical interfaces" section (or equivalent: connector maps, port references, expansion-unit hardware) on a robot product page in this repo.
---

# Vendor hardware/interface summaries

This codifies how the A2 and B2 "Electrical interfaces" sections were built and
trimmed. It's the concrete, page-writing-level companion to the "Don't
duplicate what Unitree already documents well" rule in
`wr_unitree_support/docs/PUBLISHING.md` — that doc says *why*, this skill says
*how*, and it applies to every vendor (Unitree, AgileX, Kinova, Realman,
UFactory), not just Unitree.

## The method

1. **Group by physical location, not abstract interface type.** A customer
   with the unit in front of them thinks "what's on the body" and "what's on
   the dock / expansion module," not "list of connector types." Ask what the
   physically distinct hardware groupings actually are (robot body vs. docking
   station / expansion unit vs. onboard-computer breakout, etc.) and organize
   the section around those, one subsection each.

2. **Summarize at the category level — never reproduce the vendor's
   pin-by-pin table.** For each group, say what's there and what it's broadly
   for ("regulated power outputs for external payloads," "network ports on
   the `.123`/`.124` subnets") — not exact pin assignments, connector part
   numbers, or precise per-port current/voltage figures. If you're tempted to
   restate a number like "24V 5A," stop: that's exactly the kind of detail
   that (a) belongs to the vendor's always-current source, not a copy that
   drifts, and (b) is the easiest thing to mistranscribe. Prefer a category
   ("24V, 12V and battery-voltage outputs") over the specific rating.

3. **Extract the genuine gotchas, phrased qualitatively.** Some vendor detail
   *is* worth surfacing even though it's not a pin table — the kind of thing
   that damages hardware or wastes an afternoon if missed: ports on the same
   rail sharing one current budget rather than each getting its own,
   overcurrent behavior needing a manual restart (not self-clearing), a port
   that looks available but isn't open to customer use. Pull these out as an
   explicit `:::caution` or `:::note` admonition, described in words
   ("outputs on the same rail share one supply, not an independent budget per
   port") rather than by restating the vendor's exact figures.

4. **Cross-reference what the page already documents instead of repeating
   it.** If a port already has its own section (e.g. a network port covered
   under "Network layout"), point to it (`[Network layout](#network-layout)`)
   rather than describing it twice.

5. **Always end with a link out**, not a promise to fill in more detail
   later: "For exact port numbers, pin assignments and full specifications,
   see [vendor]'s official documentation" — reuse the page's existing
   official-docs link rather than inventing a specific sub-page URL you
   haven't independently confirmed.

## Sourcing discipline

Vendor sites for these products are frequently JS SPAs that `WebFetch` can't
read (confirmed for `support.unitree.com`) — so this content typically comes
from either `wr_unitree_support` (internal, field-verified) or a screenshot
the user pastes directly into the conversation. Both are legitimate sources.
What matters is not blurring them together:

- Track, per claim, whether it's a **direct transcription** (a label or fact
  literally shown in the source), your **own synthesis** (combining two
  sources — e.g. matching a port's subnet across a diagram and an internal
  doc), or your **own inference** (a judgment call the source doesn't
  actually state, like assuming a port "isn't for general payload use" from
  its name alone).
- If asked to justify the content, you should be able to trace every line
  back to its specific origin (which document, which screenshot, which port
  number) — not just gesture at "the sources." Flag inferences explicitly
  when you write them, not only when asked to justify them after the fact.

## Verification

After editing, `npm run build` catches broken links/anchors/tags (all set to
`throw` in this repo), but it does **not** validate that a Mermaid diagram
actually renders — that's client-side. For any new or changed diagram, do a
real render check: start the dev server, screenshot the section (headless
Chrome with `--virtual-time-budget` and a scratch `--user-data-dir` to avoid
colliding with any already-running desktop Chrome profile), and look at it —
don't rely on the build passing alone.
