---
draft: true
sidebar_position: 3
description: "Deployment Toolbox: turn a 3D scan of a site into the map robots navigate by. The map editor workflow, what a map contains, and how maps go live."
---

# Deployment Toolbox

A 3D scan of a building is just points. A robot needs to know where the floor is, where it may drive, where it must not go, and which places matter. Somebody supplies that meaning once per site, and this is the tool they use.

What comes out is the **site map** — the artifact everything else depends on. It is published to the [Fleet Management System](/solution/fleet-management), activated there, and sent from there to the robots.

:::caution Draft

This page is being written for an upcoming release and is not final.

:::

## Who uses it, and when

Preparing a site is a **once-per-site** job, not a once-per-mission one. Afterwards the map is only revisited when the building itself changes.

Editing a site's map requires the **Site Admin** role for that site. Operators and observers can use maps but cannot change them.

## The two tools

<Figure
  src={require('./img/toolbox-tools.png').default}
  alt="Deployment Toolbox landing page offering two tools: Map Inspector for loading and inspecting maps, and Map Editor for creating maps from point clouds"
  framed
  caption="Two tools: inspect an existing map, or build one." />

**Map Inspector** loads a map — from the fleet or from a local file — so you can examine its nodes, segments and zones and test whether a route actually solves from a chosen start to a chosen goal. Use it to check a site before or after a change, without opening the editor.

**Map Editor** is where maps are made, from a point cloud through to a published map.

## The map editor workflow

The editor runs as five stages, shown across the top and worked left to right. Undo and redo apply throughout.

<Figure
  src={require('./img/toolbox-map-editor.png').default}
  alt="Map Editor showing the five-stage workflow across the top - Load, Prepare, Levels, Edit, Export - with the layer tree listing point cloud, levels, nodes, segments, zones and transitions"
  framed
  caption="The editor's five stages, with the map's contents listed on the left." />

### 1 · Load

Start from either source:

- **Import from Fleet** — pull an existing map bundle (its graph, point cloud and costmap) to edit and push back as a new revision.
- **Start from local files** — a point cloud is required; `PCD`, `PLY`, `XYZ` and `PTS` are supported. An existing map can be loaded alongside it.

Importing from the fleet matters more than it looks. Sites change, and whoever updates a map needs to start from what is **actually live**, not a copy on a laptop that may no longer match.

### 2 · Prepare

Clean up the scan: remove noise and stray points, and level it against gravity so the floor sits flat.

**This stage decides the quality of everything after it.** A scan that is subtly tilted produces a map that looks correct and navigates badly, because where the floor is, what surfaces snap, and whether routes solve all depend on it.

### 3 · Levels

Identify the floor levels the map is built on. Nodes and zones each belong to a level.

### 4 · Edit

Place what the robot actually reasons about — waypoints, the routes between them, and zones. Multi-select and surface snapping make drawing quick, and every action is reversible.

### 5 · Export

Validate, check the result, and publish to the Fleet Management System. Publishing creates a **draft**; it does not put the map live.

## What a map contains

The map format is **TMG** (Topometric Navigation Graph), a Weston Robot specification. It exists because the available formats describe a *space* without describing what is *allowed to happen* in it.

| Element | What it is |
| --- | --- |
| **Waypoint** | A place the robot can navigate to. What a mission's stops actually are |
| **Charging** | A charging station |
| **Segment** | A connection between two points — the routes the robot may take |
| **Zone** | An area with a boundary that applies rules inside it, including no-go areas |
| **Level** | A floor. Waypoints and zones belong to one |
| **Transition** | How the robot moves between levels |

Zones do more than mark regions: a zone applies rules — a speed limit, or no access at all — to everything inside its boundary, which makes it the tool for both "slow down here" and "never go here".

A note on wording: a mission's **stop** is not a separate thing on the map. It is a waypoint that a mission happens to use. The map says where the robot can go; the mission says what it does there.

## How a map goes live

Two limits here are deliberate, and both are worth knowing before you build a process around the tool.

**The Deployment Toolbox never talks to robots.** It publishes to the Fleet Management System, and robots are updated from there. There is no path from this tool to a machine in the field.

**It cannot make a map live.** Activation happens in the Fleet Management System. That is a boundary between the two tools rather than between two people — the same Site Admin who drew the map can activate it. If you want a second person to review a map before robots use it, that has to come from your process.

## Known limitations

- **Sites must stay structurally the same.** A map describes the site as scanned; if the building changes, it is re-scanned and the map re-authored.
- **One level per site in this release.** Robots do not use stairs or lifts on their own, so a site cannot span floors. Ramps are usually fine.
- **A published map is not a live map.** Publishing and activation are separate steps in separate tools.

## Common questions

### I published a map but the robots have not changed

Expected. Publishing creates a draft in the Fleet Management System, and someone has to activate it. Until then robots keep the map they have.

### Routes look connected but validation fails

Validation checks that a route actually solves, not that lines meet on screen. Two segments that appear to join may not share a point, or the path may cross a zone that forbids it.

### Which map are the robots actually using?

Import it from the fleet rather than trusting a local copy — that is what Import from Fleet is for.

### Can I change a map without this tool?

Waypoints and routes can be adjusted in the Fleet Management System by a Site Admin. Changing the scan, the levels or the zones is this tool's job.

## Support

Before raising a ticket, note which site and map are involved, and whether the problem is with drawing, publishing or activation — those are three different stages. [Before you contact us](/support/before-you-contact-us) lists what helps.

[Submit a support request](https://forms.office.com/r/qELKzYF33W).
