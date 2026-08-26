---
draft: true
sidebar_position: 3
description: "Deployment Toolbox: turn a 3D scan of a site into the map robots navigate from. Workflow, the TMG map format, and who may publish and activate."
---

# Deployment Toolbox

A 3D scan of a building is just points. A robot needs to know where the floor is, where it may drive, where it must not go, and which places matter. That meaning comes from a person, once per site, and this is where they supply it.

The Deployment Toolbox produces the **site map** — the one artifact that ties the whole system together. A map authored here is published to the [Fleet Management System](/solution/fleet-management) as a draft, activated there, and distributed from there to the robots.

:::caution Draft

This page is a skeleton for a release still being documented. `draft: true` keeps it out of production builds entirely — it is visible with `npm run start` and absent from the deployed site. See `docs/design/release-pages-plan.md` §7 for what is still outstanding, including how the Toolbox is obtained and installed.

:::

## Who uses it, and how often

Site preparation is a **once-per-site** job, not a once-per-mission one. After that, the map is only revisited when the site changes structurally.

Editing a site's map requires the `site_admin` role for that site, or `tenant_admin` across all of them. An `operator` or `observer` cannot change a map. See [Roles and permissions](/solution/fleet-management#roles-and-permissions).

## Preparing a site

Three stages, in order. Each one has to be right before the next is worth doing.

### Bring the site in

Import the 3D scan, clean up noise and stray points, and detect the floor levels the map is built on.

Levelling matters more than it looks: the scan is levelled against gravity so the floor sits flat, and everything downstream — where the floor is, which surfaces snap, whether a route solves — depends on getting that right first. A scan that is subtly tilted produces a map that looks correct and navigates badly.

### Give it meaning

Place the elements the robot actually reasons about:

| Element | What it is |
| --- | --- |
| **Waypoint** | A navigation or transit point. The default kind of node, and what a mission's stops actually are |
| **Charging** | A charging station |
| **Segment** | A connection between two nodes — the routes a robot may take |
| **Zone** | A named area with a boundary, applying properties to everything inside it, including no-go areas |
| **Level** | Vertical structure. Nodes and zones belong to a level |

Editing is built for speed and reversibility — undo, multi-select and surface snapping — because drawing a site is iterative and every mistake should be cheap.

**Zones apply properties rather than just marking regions.** A zone sets constraints such as speed limits or access on every node and segment inside its boundary, so it is the right tool for "slow down here" and "never go here" alike.

A note on vocabulary: a mission's **stop** is not a separate kind of map object. It is a waypoint that a mission happens to use. The map carries where the robot can go; what it does there belongs to the mission.

### Review it, then publish

Validate before anything leaves the tool, then inspect the finished map in 2D or 3D to confirm routes actually solve — that the graph you drew is one a robot can plan over, not just one that looks connected.

Publishing pushes the map to the Fleet Management System **as a draft**. It does not go live at that moment.

## Key information

### The map format

The map format is **TMG** (Topometric Navigation Graph), a Weston Robot specification. It exists because the formats already available describe a *space* without describing what is *allowed to happen* in it: TMG carries drivable boundaries, zones to stay out of, levels and the transitions between them, named waypoints, and what it costs to move between them.

Four things read the same TMG map — the Deployment Toolbox that authors it, the Fleet Management System that shows it to an operator, the robot's planner, and its controller. That is why the format is stable and deliberately conservative.

### Maps move in both directions

Publishing a finished map to Fleet Management is the obvious direction. The other one matters just as much: sites change, and whoever updates a map needs to start from what is **actually live**, not from a copy on someone's laptop that may no longer match. Import and export both work, so the map being edited and the map the robots are using stay the same map.

Before editing an existing site, export the live map rather than reopening a local file.

## Boundaries

Two limits are deliberate, and both are worth knowing before you plan a workflow around the tool:

**The Deployment Toolbox never talks to robots.** It publishes to the Fleet Management System, and distribution to robots happens from there. There is no path from this tool to a machine in the field.

**It cannot put a map live.** Activation happens only in the Fleet Management System. This is a boundary between the two tools — not a separation of duties between two people: the same `site_admin` who authored a map can activate it there. If your process requires a second person to review a map before it goes live, that has to come from your process.

## Known limitations

- **Sites must be structurally stable.** A map describes the site as scanned. If the structure changes, the site is re-scanned and the map re-authored — this is not something the robot adapts to on its own.
- **One level per site in this release.** Robots do not climb stairs or use lifts on their own, so a site cannot span floors. Ramps are usually fine.
- **A published map is not a live map.** Publishing and activation are separate steps in separate tools, by design.

## Troubleshooting & FAQ

### I published a map but the robots have not changed

Expected. Publishing creates a draft in Fleet Management; someone with `site_admin` has to activate it. Until then robots keep the map they have, so a robot never changes map part-way through a job.

### Routes look connected but the map fails validation

Validation checks that routes actually solve, not that lines meet on screen. Two segments that appear to join may not share a node, or may cross a zone that forbids the movement.

### Which map are the robots actually using?

Export the live map from Fleet Management rather than trusting a local copy. This is the reason import works in both directions.

### Can I edit a map without the Deployment Toolbox?

Waypoints, routes and mission templates can be edited in Fleet Management by a `site_admin` (`nav:write`). Changing the underlying map bundle — the scan, the levels, the zones — is this tool's job.

## Support

Before raising a ticket, note which site and map are involved, and whether the problem is with authoring, publishing or activation — those are three different components. [Before you contact us](/support/before-you-contact-us) lists what helps.

[Submit a support request](https://forms.office.com/r/qELKzYF33W).
