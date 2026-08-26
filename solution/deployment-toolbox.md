---
draft: true
sidebar_position: 3
description: "Deployment Toolbox: turn a 3D scan of a site into the map robots navigate by. The map editor workflow, what a map contains, and how maps go live."
---

# Deployment Toolbox

A 3D scan of a building is just points. A robot needs to know where the floor is, where it may drive, where it must not go, and which places matter. Somebody supplies that meaning once per site, and this is the tool they use.

What comes out is the **site map** — the artifact everything else depends on. It is published to the [Fleet Management System](/solution/fleet-management), and reaches the robots from there.

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

**Map Inspector** loads a map — from the fleet or from a local file — so you can examine its nodes, segments and zones, and test whether a route **solves**: whether a path can actually be worked out from a chosen start to a chosen goal. Use it to check a site before or after a change, without opening the editor.

**Map Editor** is where maps are made, from a point cloud through to a published map.

## What a map contains

The map format is **TMG** (Topometric Navigation Graph), a Weston Robot specification. It exists because the available formats describe a *space* without describing what is *allowed to happen* in it.

| Element | What it is |
| --- | --- |
| **Node** | A point on the map the robot can be sent to. Every node has a type; the default is **waypoint** |
| **Charging** | The other node type: a charging station |
| **Segment** | A connection between two nodes — the ways the robot is allowed to travel |
| **Zone** | An area with a boundary that applies rules inside it, including no-go areas |
| **Level** | A floor. Nodes and zones each belong to one |
| **Transition** | How a robot moves between levels |

These TMG names are the ones this page uses, and the editor's layer tree uses them too — **Nodes**, **Segments**, **Zones**. Two everyday words sit alongside them and are worth pinning down:

- A **waypoint** is a node of the default type, and it is also what a mission's **stop** is. The map says where the robot can go; the mission says what it does there. A stop is not a separate object on the map.
- A **route** is a path from one node to another across segments. Routes are worked out from the map, not drawn on it — you place segments, then test that a route solves over them.

Zones do more than mark regions: a zone applies rules — a speed limit, or no access at all — to everything inside its boundary, which makes it the tool for both "slow down here" and "never go here".

## The map editor workflow

The editor runs as five stages, shown across the top and worked left to right. Undo and redo apply throughout.

<Figure
  src={require('./img/toolbox-stages.png').default}
  alt="The map editor's stage bar showing five numbered stages in order: Load, Prepare, Levels, Edit, Export, with undo and redo alongside"
  framed
  caption="The five stages, worked left to right. The current stage is highlighted." />

### 1 · Load

Start from either source:

- **Import from Fleet** — pull an existing **map bundle** (the published unit: the graph, its point cloud and its costmap together) to edit and push back as a new revision.
- **Start from local files** — a **point cloud** is required, meaning the raw 3D scan as a file of measured points; `PCD`, `PLY`, `XYZ` and `PTS` are supported. An existing map can be loaded alongside it.

A **costmap** is the grid the robot uses to judge what it can drive over, and it travels with the map rather than being drawn by hand.

<Figure
  src={require('./img/toolbox-load.png').default}
  alt="The Load stage panel offering Import from Fleet, or starting from local files with a required point cloud in PCD, PLY, XYZ or PTS format"
  framed
  caption="The two ways to start: pull the live map from the fleet, or begin from a scan on your machine." />

Import from Fleet is what to reach for whenever a site already has a map. Sites change, and whoever updates a map needs to start from what is **actually live**, not a copy on a laptop that may no longer match.

### 2 · Prepare

Clean up the scan: remove noise and stray points, and level it against gravity so the floor sits flat.

**This stage decides the quality of everything after it.** A scan that is subtly tilted produces a map that looks correct and navigates badly, because where the floor is, what surfaces snap, and whether routes solve all depend on it.

### 3 · Levels

Identify the floor levels the map is built on. Every node and zone belongs to one.

**This release supports one level per site**, because robots do not use stairs or lifts on their own. For a single-level site this stage is short: there is one level, and everything on the map belongs to it. **Transition** exists in the format for sites that do span floors, and has no use in a single-level site. Ramps within a level are usually fine.

### 4 · Edit

Place what the robot actually reasons about — the nodes it can be sent to, the segments between them, and zones. Multi-select and surface snapping make drawing quick, and every action is reversible.

### 5 · Export

Validate, check the result, and publish to the Fleet Management System. Publishing creates a **draft** — the map is stored there, but not yet in use.

## How a map goes live

**The Deployment Toolbox never talks to robots.** It publishes to the Fleet Management System, and robots are updated from there. There is no path from this tool to a machine in the field.

**It cannot make a map live either.** A published map sits in the Fleet Management System as a draft until someone **activates** it there; activation is what puts a map in front of robots. That is a boundary between the two tools rather than between two people — the same Site Admin who drew the map can activate it. If you want a second person to review a map before robots use it, that has to come from your process. [How a map reaches a robot](/solution/fleet-management#how-a-map-reaches-a-robot) shows the whole path in one diagram.

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

Waypoints and the connections between them can be adjusted in the Fleet Management System by a Site Admin. Changing the scan, the levels or the zones is this tool's job.

## Support

Before raising a ticket, note which site and map are involved, and whether the problem is with drawing, publishing or activation — those are three different stages. [Before you contact us](/support/before-you-contact-us) lists what helps.

[Submit a support request](https://forms.office.com/r/qELKzYF33W).
