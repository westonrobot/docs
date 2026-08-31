# Lessons

Operational lessons for this repository, in Pattern / Correction / Context form. Consult during intake and after any error.

### Verify a layout change at the *binding* viewport, not the comfortable one

- **Pattern:** The landing page is designed to fit one viewport without scrolling, a constraint its own CSS and TSX comments state. Tightening the hero-to-cards gap raised two vh-scaled values (card media `20.5vh → 24vh`, `.main` top padding `2.2vh → 3.4vh`). Verified at 1920×1080, where it looked right, and committed. Both values also scale *down*, so at 1366×768 they cost exactly 36px and the page scrolled — the constraint broken by the change meant to improve it.
- **Correction:** A `vh`-scaled value changes every screen, not the one being looked at. When a layout rule names a viewport as its constraint, re-measure at that viewport before committing, and gate an increase behind `@media (min-height: …)` when it is only wanted where there is room. `document.body.scrollHeight <= window.innerHeight` is the check; run it at both ends of the supported range.
- **Context:** Docusaurus landing page, `src/pages/index.module.css`. The binding viewport here is 1366×768.

### A framing correction invalidates more than the sentence it lands on

- **Pattern:** The map lifecycle was corrected from two steps (draft → active) to three (push → publish → activate). The prose and tables were updated across nine places, but `tenant-management.md` ended up with the *corrected* diagram filed under the hierarchy section, where it did not belong, while the lifecycle section kept the *stale* two-step diagram — directly above the three-step table that contradicted it.
- **Correction:** After a framing correction, re-read the whole document rather than patching the places that matched a grep. Diagrams are especially prone to surviving a correction: they carry the claim in a form that text searches for the corrected wording do not match. Grep for the *old* shape (`draft.*activat` without `publish`) as well as the new one.
- **Context:** Markdown docs with mermaid diagrams; applies to any figure or table that restates a claim made in prose.

### Mermaid routes subgraph edges to the border, not the node

- **Pattern:** A `direction TB` subgraph inside a `flowchart LR` puts external edges on the subgraph's mid-height border. `TB -->|push| DRAFT` rendered as an arrow landing beside the middle node, so a three-stage pipeline read as "push → Published" — the exact misreading the diagram existed to prevent.
- **Correction:** Keep a subgraph's direction the same as the parent flow when edges cross the subgraph boundary. Check the rendered SVG, not the source: the source was correct and the picture was not.
- **Context:** `@docusaurus/theme-mermaid`, which renders client-side — `npm run build` cannot catch this, only looking at the page can.

### A customer-facing URL must carry an identity we own

- **Pattern:** 53 links across 11 pages died at the same instant because the M365 tenant was renamed `tangrobot` → `westonrobot` and `tangrobot.sharepoint.com` left public DNS. The links were not misconfigured and SharePoint did not fail; the URLs simply encoded a fact about the company inside a namespace Microsoft controls, so a change to that fact invalidated every one of them at once. The 30 `forms.office.com/r/…` links on the same pages still return `200`, because that hostname carries nothing about us. The first fix repeated the mistake: `adce7c6` moved four of our own documents to `drive.google.com/file/d/…?usp=drive_link`, which is the same shape — an opaque token in someone else's namespace.
- **Correction:** Anything handed to a customer resolves through a domain we own, with a readable path we chose, and the storage behind it stays a swappable implementation detail. When a third-party share link is the only option available today, treat it as a defect with a ticket rather than a fix. Before adopting a URL, ask which parts of it are facts that could change — a tenant name, an account, a product name, a vendor — because each one is a future outage. Verify the failure mode before diagnosing: `curl` returning `000` is DNS, and means something quite different from `403` or `404`.
- **Context:** External links from the docs site. Recorded in ADR 0001; issue #31 has the per-file inventory.
