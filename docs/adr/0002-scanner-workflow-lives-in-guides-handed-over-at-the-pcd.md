# ADR 0002 — The scanner capture workflow lives in Guides, and hands over at the `.pcd`

- **Status:** Accepted
- **Date:** 2026-09-03
- **Related:** [`../design/product-page-template.md`](../design/product-page-template.md) (§Peripheral pages, §Rules), [`../design/ia-proposal.md`](../design/ia-proposal.md) §7, ADR 0001 D4, `docs/LESSONS.md`

## Context

The Robot Deployment Toolbox turns a 3D scan of a building into the map a robot navigates by. Its documentation opens with "a 3D scan of a building is just points" and its Load stage requires a point cloud in `PCD`, `PLY`, `XYZ` or `PTS` — but nothing on this site said where that file comes from, or how to produce one. The scan is the toolbox's only mandatory input and it was undocumented.

We supply the scanner that produces it. The Manifold Pocket2 Scanner is a handheld unit whose capture runs on the device, is driven from a phone over the scanner's own Wi-Fi, and is converted on a desktop before it is usable anywhere else. That is four tools and three file formats between "walk the site" and "load the map", and until this change the only page mentioning any of it was a product page whose job is not to teach a procedure.

**Where the content could plausibly have gone.** The site has four candidate homes, and the choice is not obvious:

- the **product page** for the scanner, which already exists;
- inside the **Robot Deployment Toolbox** documentation, next to the stage that consumes the file;
- a new **Solutions** entry, on the reasoning that scan-to-map is an end-to-end capability;
- a new area under **Guides**.

**What made the boundary question real rather than editorial.** Two facts about the material decide it. First, the capture half is almost entirely the *manufacturer's* procedure — Manifold's manuals are the authority for the Wi-Fi credentials, the initialisation prompts and the export dialog, and they are maintained by Manifold. Second, the authoring half is entirely *ours* — TMG, levels, zones, surface snapping and the push-publish-activate lifecycle exist nowhere else. A single document covering both would have one half that goes stale when a vendor moves a menu and another half that goes stale when we ship a release, with no way to tell which is which.

**What was established before writing anything.** The full chain is documented in first-party material, so none of it had to be inferred: the scanner's SSID format and password, the initialisation and save prompts, and the walking limits are in the Pocket2 User Manual (EN v1.3.4); the `.lx`/`.olx` import, the `Subsampling` dialog with its metre-unit spatial interval, and `Point Cloud Library cloud (*.pcd)` in the export format list are in the MindCloud Studio User Manual (EN v1.6.10). This records what the sources establish, not what the pages ended up carrying: several sourced facts were later withheld deliberately — the walking-speed and turn figures, the initialisation prompt, the control-point procedure — because being in a manual is not the same as being worth publishing or being something we have performed. That evidence is what makes a guide publishable rather than a skeleton.

## Decision

**D1. The capture workflow is a Guides area, not a product-page section and not part of the toolbox.** `Guides › Manifold Scanner Guides`, at `/tutorial/manifold`, as a sidebar category whose index is its own landing page — the shape `sidebars-solution.ts` already uses for the Robot Deployment Toolbox.

This follows the split the site is already built on and which `ia-proposal.md` §7 states: a product page says what a thing is and how it is wired, a guide says how to do something with it. A capture session is a procedure with a beginning and an end, so it is a guide. It is also the only one of the four options that lets the material grow: more scanner instructions land as sibling pages under the same category, with no page needing to be restructured to accommodate them.

**D2. The documentation boundary is the `.pcd` file, and it is stated on both sides.** The Scanner Guides own everything up to and including the export; the Robot Deployment Toolbox owns everything from the import onward. The file is the interface.

A boundary only works if a reader hits it from either direction, so both sides carry a link:

> **Guides → Toolbox** — the processing guide ends at *Next: the Robot Deployment Toolbox*, naming the Load stage the `.pcd` goes into.
>
> **Toolbox → Guides** — the toolbox overview says where the scan comes from, and `map-editor.md` says so again at *Start from local files*, which is the exact control where a reader discovers they need a file they do not have.

Two links, not one, because the overview and the Load stage are reached by different readers: one is browsing the capability, the other is already in the tool with a stage that will not open.

**D3. Vendor material is linked, never mirrored, and every link is to a maintained page rather than a pinned file.** The scanner is a tier-1 partner platform under `product-page-template.md`, so Manifold's manuals are the authority and our pages curate rather than restate them.

The file store is deliberately not used here. ADR 0001 scopes it to documents whose absence would leave a Weston Robot product with no reachable documentation; a manufacturer who publishes and maintains their own manual is not that case, and a mirrored copy is a second thing that can disagree with the original. The distinction `product-page-template.md` already draws — `download.westonrobot.net` URLs belong in `<Downloads>`, everything else in the hand-maintained table — puts every Manifold resource in the table.

**Everything in that table is linked as a maintained page, including the manuals.** Software has always had to be, because the current version is whatever the vendor is shipping today and a hardcoded installer URL rots on their release schedule rather than ours. The immediately preceding evidence is on the sibling page: its two `manifoldtech.cloud/download/?file=MindCloudGo_0.3.0.apk`-style links are dead, and the version in the URL is why nobody noticed.

*Amended 2026-09-03.* An earlier draft treated manuals as the exception and linked them as specific revisions — `Pocket2 User Manual_EN_V1.3.4.pdf`, `MindCloud Studio v1.6.10 User Manual.pdf` — on the reasoning that a reader needs to know which revision they are reading. **Reversed on operator ruling**, and the reasoning was wrong in the same way the software case is: when Manifold replace the manual the direct URL becomes a stale link to a superseded document, which is worse than a page that always resolves to the current one. Customer-facing pages therefore point at Manifold's download pages, and the resource row says what the reader will find there.

The versioned URLs are **kept as internal provenance**, in this ADR and in the engagement ledger, because they record exactly which revisions the published claims were checked against. That is the split: *customer-facing navigation* gets the maintained page, *internal evidence* keeps the revision. Nothing under `docs/` is built, so the two do not meet.

**D4. Operational steps are published only where a first-party source states them.** No SSID format, password, button name, menu path, prompt or export step appears in these guides unless it is in a Manifold manual or has been confirmed by an operator who has the unit.

**The reduction step is `MindCloud Studio ▸ Tools ▸ Subsampling ▸ Spatial ▸ min. space between points = 0.1`**, which is 0.1 m — 10 cm — because that field is in metres. *Confirmed by operator ruling 2026-09-03.*

The reduction happens there rather than in the Robot Deployment Toolbox, and the reason is practical rather than a matter of which algorithm is better: the toolbox's own **Downsample** does much the same job, but it only runs *after* the `.pcd` has been imported, so relying on it means moving, storing and loading a file several times larger than it needs to be. Subsampling on the way out of MindCloud Studio means the file is right by the time anyone opens it. The toolbox's Downsample stays documented where it already lives, as a later option for a cloud that arrives too heavy — it is **not** an equal alternative reading of this workflow.

MindCloud Studio's load-time `Resolution` field is a third, unrelated control, in **millimetres**. The guides say to leave it alone.

*This decision reverses nothing published, but it does close a recorded uncertainty.* An earlier draft named all three controls and said which one it believed was meant, because the instruction as received named none of them. Publishing the ambiguity rather than guessing silently is what made this a one-paragraph confirmation.

**D5. Guide page titles are Title Case; section headings inside a page are sentence case.** Every existing page under `tutorial/` uses Title Case for its `<h1>` — `G1 Diagnostics Guide`, `Ranger Mini Steering Calibration` — while `product-page-template.md` mandates sentence-case headings, which applies to `##` and below. These are two rules, not one rule inconsistently applied, and this ADR records it because the first draft of these guides got it wrong in exactly the way an unstated convention invites.

**D6. Where an operator-verified physical fact and the vendor's material disagree, customer-facing pages use ours — and the divergence is recorded here, not on the page.** The Pocket2's port layout is the case that established this: **rear** carries the hot shoe, the power and battery indicator area, and **Port C** (accessories, data *and* charging); **front** carries the separate **DATA** port.

There turns out to be nothing to disagree with, which is the point worth recording. The manual's §2.1 *Physical Structure of Pocket 2* is a heading followed by an empty half-page: `pdfimages -list -f 3 -l 3` on the published PDF returns only the 38 × 22 px header logo, so **the diagram that would document the port layout is absent from the file Manifold publish.** Nothing else in the manual's text locates a port by face. An operator with the unit in hand is therefore not merely a competing source here, it is the only one.

The same applies to app terminology, where the manual has now diverged twice. It puts the device model, serial number and firmware version on an **About** page; the operator reports it as the **Home** page. It routes the manual version check through a **My** page (§3.1); the app has since been updated and the tab reads **Profile** — visible in the bottom navigation of the published Home captures. Our pages say Home and Profile. No divergence is exposed to customers: a reader holding the scanner does not benefit from a footnote about which document is wrong. The manual is a v1.3.4 snapshot of a moving app, so expect more of these, and resolve each the same way.

A third case is not terminology but a **cue**. The manual gates initialisation on a prompt — *"Do not move the device until the APP prompts 'Map building starts, you can move the device'"* — that the operator did not notice while scanning. We cannot assert it never appears, so it is simply not published as the gate. What we publish instead is observable and evidenced by our own two captures: the initialising screen carries the blue *Waiting for device initialization* banner with `Point Count 0`, and the mapping screen has neither. **Prefer a cue the reader can see in a screenshot we publish over a string quoted from the manual** — the screenshot is evidence, and it goes stale visibly.

## Consequences

The Robot Deployment Toolbox documentation is now reachable from a product page, which it was not before: the scanner page's *Solutions for this platform* section names it, and the guides carry the reader into it. That is the first inbound path to a solution from the peripheral section.

**The guides depend on vendor manuals that will move, and D3 is what absorbs that.** Because customer-facing pages link Manifold's download pages rather than a revision, a new manual does not strand a link. What it can still do is make our *prose* stale — a renamed dialog or a moved control — and no link strategy catches that. The available signal is the version pairing: the Pocket2 manual revision tracks the MindCloud Go app version (both `1.3.4` when this was written, confirmed against the App Store listing), so a guide review is due when the app version moves past the revision recorded in the ledger. That is a check for a person, not for CI.

**The gap that made D4 necessary is worth recording even though it closed.** MindCloud Go's Android listing could not be found by search — `com.ManifoldTech.MindCloudGo`, the id the vendor's own naming implies, returns 404 on Google Play, and `3dmanifold.com/mindcloud-go` also 404s. The pages shipped saying so and telling the reader to ask Manifold, rather than linking an APK mirror. The real id is `com.mindcloudgo.go`, supplied by the operator; both store links are now published. **The lesson is that a plausible-looking absence was wrong** — the resource existed under a name nothing on the vendor's site links to, and the discipline of publishing the gap rather than a substitute is what made it cheap to correct.

**The `.pcd` is now a documented contract between two tools, and can break like one.** If the toolbox ever stops accepting `PCD`, or MindCloud Studio drops it from the export list, two documents are wrong rather than one. Both sides name the format explicitly for exactly that reason: a grep for `pcd` finds every place that would need to change.

## Alternatives rejected

**Put the workflow on the scanner's product page.** No new routes, no new sidebar entry, and everything about the scanner in one place. Rejected because it inverts the site's own division of labour — `ia-proposal.md` §7 puts procedures in guides — and because it does not scale: the capture procedure alone is longer than the whole product page, and the product page's job is to let someone confirm which unit they have and find the credentials. It would also have buried the toolbox handoff inside a peripheral page, where nobody looking for the deployment workflow would find it.

**Put it inside the Robot Deployment Toolbox documentation.** The file's consumer is the natural place to document its production, and it would need no cross-links at all because there would be no boundary to cross. Rejected on ownership: three quarters of the material is Manifold's procedure for Manifold's hardware, and filing it under a Weston Robot software product asserts a maintenance responsibility we do not have. It would also be wrong for the reader who has a scanner and no toolbox — forestry and as-built capture are uses the manufacturer documents and we supply for.

**Make it a Solutions entry — "scan to map" as an end-to-end capability.** It is genuinely one workflow, and a customer buying the outcome buys both halves. Rejected because `product-page-template.md` defines a solution as *software we develop and deploy*, and half of this is a third party's hardware procedure. The section would have needed a `Supported platforms` table, a `Known limitations` section and a version story for something we do not version. The capability framing is better served by the cross-links, which give the same journey without claiming the wrong category.

**One long guide instead of an index plus three children.** Fewer files, no navigation decision, and the whole workflow readable top to bottom. Rejected because the three parts have different readers and different lifetimes: connection is consulted when something is broken, capture before going to site, processing at a desk afterwards. Bundling them means a reader debugging a Wi-Fi problem scrolls past a scanning tutorial, and a vendor UI change forces an edit to a document that is 70 % unaffected. The index carries the part that genuinely is one thing — the shape of the workflow and where it stops.

**Mirror the two Manifold manuals into the file store.** It would make the links immune to the vendor reorganising their site, which is a real risk, and ADR 0001's infrastructure is already deployed. Rejected on D3's reasoning: it creates a second copy of a document we do not own and cannot keep current, and a customer reading our stale mirror of a manufacturer's safety-relevant procedure is a worse outcome than a customer following a link. Revisit if Manifold withdraws the PDFs, at which point the mirror is the only option and the trade changes.

## Open

*Updated 2026-09-03, after the operator supplied captures and field guidance.* Both items below are **planned content debt, not blockers** — the workflow the guides describe is complete and usable as published.

- **Weston Robot's own additions to the scanner procedure — now partially published.** Level-surface initialisation, loop closure explained for a non-specialist, controlled pace against the app's live Translation/Rotation readouts, forward movement through narrow spaces, gentle tilting for corners, sideways through tight doorways, and inspecting the cloud before export are all in the guides. **Still undocumented:** site-survey conventions, file naming and handover. The index-plus-children structure absorbs those without restructuring.
- **Our own images — complete.** Eleven operator captures sit in `peripheral/img/manifold/` and `tutorial/manifold/img/`, covering the rear Port C and all four MindCloud Studio steps, plus six MindCloud Go screens that were never placeholdered but materially improve the workflow. Five of the six original placeholders were filled that way; **the sixth, the Pocket2 front DATA port, was retired by operator ruling** — that photograph is not required, and the port is documented in text. **No marker remains.** They were MDX comments rather than visible ones because the prose was complete and a reader gains nothing from being told an image is missing; `robot/humanoid/h2.md` uses visible `**TODO**` instead, but that page is a stub where the *text* is missing.

  The captures are **published redacted**, to the operator's ruling: the Home pair keeps the `S/N` label and the firmware line and hides only the serial value, so a customer can see where to find the number support will ask for; the Wi-Fi picker loses its neighbouring networks; three Studio captures lose a local filesystem path. Annotations and controls are untouched. The image work is **operator- and Claude-edited** — the operator drew the red annotations, the redactions were applied afterwards.

  A redaction has a blast radius wider than the pixels. A tip on the connection guide told the reader to match the Wi-Fi SSID suffix against the `S/N` on the Home page: a comparison the redacted capture makes impossible, and one that, had it held, would have published four characters of the serial the redaction hid. The `alt` text on the same figure still described the unredacted original. **Both the prose that points at a redacted value and the alt text that describes it are part of the redaction** — the claim was dropped, `MindPalace-582e` stays crisp because an SSID is broadcast in the open and was only sensitive through our own claim about it, and the alt was rewritten to describe the file we actually ship.

**A fourth thing the captures settled, worth recording beside D6.** The screenshots did not merely illustrate the guides — they contradicted four claims in them, all of which had been taken from the v1.6.10 manual: retrieval over the front DATA port rather than rear Port C, a connect *button* rather than a toggle, and two dialogs described with controls (`Fast Load Mode`, `Robust Mode`, `Load Raw Point Cloud`) that **do not exist in the build the operator runs** — `v0.2.12`, light theme, a different tab set. The guide is now written to menu and field names with an explicit version-tolerance note. The general lesson is in `docs/LESSONS.md`: a vendor manual documents *a* build, and the build your colleagues actually run may not be it.
