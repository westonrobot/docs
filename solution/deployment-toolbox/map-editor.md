---
unlisted: true
sidebar_position: 2
description: "The Map Editor's five stages: loading a scan, preparing it, setting up levels, placing nodes segments and zones, and exporting a validated map."
---

# Map editor

The Map Editor takes a 3D scan of a building and produces a site map. It runs as five numbered stages, worked left to right.

<Figure
  src={require('../img/toolbox-stages.png').default}
  alt="The map editor's stage bar showing five numbered stages in order: Load, Prepare, Levels, Edit, Export, with undo and redo alongside"
  size="full"
  framed
  caption="The five stages. The current one is highlighted, and undo and redo apply throughout." />

**You are not marched through them.** Any stage can be revisited once its prerequisites are met, so going back to re-crop a scan after placing a few nodes is normal rather than a restart. What each stage needs before it will open:

| Stage | Opens once |
| --- | --- |
| **1 · Load Map Data** | Always — it is the starting point |
| **2 · Prepare Data** | A point cloud is loaded |
| **3 · Setup Levels** | A point cloud is loaded |
| **4 · Edit Map** | At least one level is defined, and either a point cloud or an existing map is loaded |
| **5 · Export** | At least one node exists |

A stage you cannot open says why rather than simply refusing.

## 1 · Load Map Data

Start from either source.

<Figure
  src={require('../img/toolbox-load.png').default}
  alt="The Load stage panel offering Import from Fleet, or starting from local files with a required point cloud in PCD, PLY, XYZ or PTS format"
  size="md"
  framed
  caption="The two ways to start: pull the live map from the fleet, or begin from a scan on your machine." />

**Import from Fleet** pulls an existing map bundle down to edit and push back as a new revision.

**Start from local files** needs a **point cloud** — the raw 3D scan as a file of measured points, in `PCD`, `PLY`, `XYZ` or `PTS`. An existing map can be loaded alongside it, which is how you re-author a map against a fresh scan.

**Reach for Import from Fleet whenever the site already has a map.** Sites change, and whoever updates one needs to start from what is *actually live* rather than a copy on a laptop that may no longer match — which is a thing that is easy to get wrong and expensive to discover later.

## 2 · Prepare Data

Clean up the scan: remove noise and stray points, and level it against gravity so the floor sits flat.

<Figure
  src={require('../img/toolbox-prepare.png').default}
  alt="The Prepare stage with an office point cloud rendered in the 3D view, and a panel offering Downsample, Gravity Align with Auto or pick-three-points, and Crop by polygon or box"
  size="full"
  framed
  caption="Preparing a scan: reduce it, level it against gravity, and crop away what you do not need." />

**This stage decides the quality of everything after it.** A scan that is subtly tilted produces a map that looks correct and navigates badly: where the floor sits, where the nodes and zones you later place come to rest on it, and whether routes solve all follow from getting this right. It is the cheapest stage to redo and the most expensive to skip.

| Operation | What it does |
| --- | --- |
| **Downsample** | Merges points into a grid of cubes and keeps one per cube, so the shape survives and the point count drops |
| **Gravity align** | Levels the cloud so the floor is flat — automatically, or by picking three points on a surface you know is level |
| **Crop** | Cuts away what you do not need, by polygon or by box |

Downsampling is usually the first thing you do, because a raw scan is slow to draw on. The office above went from **555,150 points to 194,668** at a 5 cm grid — enough to work with comfortably, and no less accurate for the purpose.

## 3 · Setup Levels

Identify the floor levels the map is built on. Every node and zone belongs to one.

<Figure
  src={require('../img/toolbox-levels.png').default}
  alt="The Levels stage listing six detected horizontal planes by height, each with a point count and an Add button, beside the rendered point cloud"
  size="full"
  framed
  caption="Detected planes, listed by height with the number of points supporting each. Adding one makes it a level." />

The tool finds horizontal planes in the scan for you and lists them by height, with the number of points supporting each. You add the one that is the floor — and the point count is how you tell a real floor from a run of desks at a consistent height.

For a single-level site this stage is short: there is one level, and everything on the map belongs to it. See [Levels](/solution/deployment-toolbox/map-format#levels) for what that means for a site that spans floors.

## 4 · Edit Map

Place what the robot actually reasons about — the nodes it can be sent to, the segments between them, and zones.

<Figure
  src={require('../img/toolbox-edit.jpg').default}
  alt="The Edit stage showing the active level over a semi-transparent point cloud, drawing tools for nodes segments and zones, a surface snap configuration panel, and an elements list counting nodes segments and zones"
  size="full"
  framed
  caption="Editing against the scan: the drawing tools, the active level highlighted, and a running count of what the map contains." />

Four tools: **select**, **node**, **segment** and **zone**. Multi-select and surface snapping make drawing quick, and every action is reversible.

The scan stays visible underneath while you draw, at an opacity you control, so you are placing things against the building rather than against an empty grid.

**Surface snapping** is what settles a node or a zone onto the floor instead of leaving it floating: you set how far above and below the level the tool should look, and it does the rest. A node that is floating is a node a robot cannot reach, and it is much easier to prevent here than to find later.

Placing a node and a segment is not the same as having a route. Segments are what a route is computed over, so two segments that appear to meet on screen but do not share a point produce a map that looks connected and does not solve — which is what the next stage is for.

## 5 · Export

Validate, check the result, and produce the finished map.

Validation is the point of the stage. It checks that the map holds together — that routes actually solve over the segments you placed, rather than that the lines meet on screen.

From here the map can be **saved as a file**, or **pushed to the Fleet Management System** — the route that leads to robots, and the subject of the rest of this page.

## Publishing to the fleet

A finished map does nothing until it reaches robots, and the Deployment Toolbox performs only the first step of that journey.

### Pushing

Pushing sends the map into the Fleet Management System. The push asks for four things:

| Field | What it decides |
| --- | --- |
| **Target site** | Which site in the fleet the map belongs to |
| **New map, or an existing one** | Whether this starts a new map, or adds a revision to one that already exists |
| **Map name** | What the map is called, when it is a new one |
| **Change summary** | What changed in this revision |

**The change summary is worth writing properly.** It is what a revision list shows months later, and the difference between "updated" and "moved the charging point after the racking was re-laid" is the difference between a history someone can read and a column of dates.

Choosing an existing map rather than a new one is what keeps a site's revisions together as one history. Starting a new map each time produces a site with several unrelated maps and no way to see how any of them changed.

### What happens next

A pushed map arrives in Fleet Management as a **draft revision**. It is stored, and it is not in front of anyone.

Two further steps, both taken by a person in Fleet Management, turn it into the map robots run:

| Step | Who | What it does |
| --- | --- | --- |
| **Push** | This tool | Creates the draft revision |
| **Publish** | Site Admin | Marks the draft a finished revision |
| **Activate** | Site Admin | Makes it *the* revision robots are given |

**The Toolbox stops at the draft.** It cannot publish, it cannot activate, and it never talks to a robot at all. There is no path from this tool to a machine in the field.

That is a boundary between the two tools rather than between two people: the same Site Admin who drew the map can publish and activate it. If your process needs a second person to review a map before robots use it, that has to come from your process.

[How a map reaches a robot](/solution/fleet-management/tenant-management#how-a-map-reaches-a-robot) shows the whole path in one diagram, and [Catching a robot up to the map](/solution/fleet-management/tenant-management#catching-a-robot-up-to-the-map) covers what happens to robots once a revision is activated.

### What activation costs a robot

Worth knowing before you push, because it shapes when the rest of the change should be scheduled: applying a new map to a robot **restarts its navigation and makes it re-acquire localisation**, and its missions are locked until it confirms the new map.

So a map change is not a background event at the site. Push whenever the work is done; time the activation.

## Common questions

**A stage will not open**  
Each one has a prerequisite, and the stage says which is missing. Prepare and Levels need a point cloud, Edit needs at least one level defined, and Export needs at least one node.

**My nodes are sitting above or below the floor**  
Surface snapping settles them onto the level, and it looks a set distance above and below to find it. Widen that range, or check the scan was levelled properly in Prepare — a tilted scan puts the floor where the nodes are not.

**Can I go back and re-crop the scan after placing nodes?**  
Yes. Stages are revisitable once their prerequisites are met, so returning to Prepare is normal rather than a restart.

**I pushed a map but the robots have not changed**  
Expected. Pushing creates a draft in the Fleet Management System; someone there has to publish it and then activate it. Until then robots keep the map they have.

**Can I change a map without this tool?**  
A Site Admin can adjust waypoints and the connections between them in the Fleet Management System. Changing the scan, the levels or the zones is this tool's job.
