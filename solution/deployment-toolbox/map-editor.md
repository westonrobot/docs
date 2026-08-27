---
unlisted: true
sidebar_position: 1
description: "Using the Map Editor: loading a scan, preparing it, detecting levels and generating an occupancy map, drawing the graph, validating and exporting, and pushing to the fleet."
---

# Map editor

The Map Editor turns a 3D scan of a building into a site map. It runs as five numbered stages, worked left to right.

<Figure
  src={require('../img/toolbox-stages.png').default}
  alt="The map editor's stage bar showing five numbered stages in order: Load, Prepare, Levels, Edit, Export, with undo and redo alongside"
  size="full"
  framed
  caption="The five stages. The current one is highlighted, and undo and redo apply throughout." />

**You are not marched through them.** Any stage can be revisited once its prerequisites are met, so going back to re-crop a scan after placing a few nodes is normal rather than a restart. A stage that cannot yet be opened says which prerequisite is missing rather than simply refusing:

| Stage | Opens once |
| --- | --- |
| **1 · Load Map Data** | Always — it is the starting point |
| **2 · Prepare Data** | A point cloud is loaded |
| **3 · Setup Levels** | A point cloud is loaded |
| **4 · Edit Map** | At least one level is defined |
| **5 · Export** | At least one node exists |

Work is saved as you go, and the header shows when it last was. It lives in your browser rather than on a server, so it is yours until you push it.

## 1 · Load Map Data

<Figure
  src={require('../img/toolbox-load.png').default}
  alt="The Load stage offering two paths: Import from Fleet, described as loading a map bundle of graph, point cloud and costmap to edit and push back as a new revision; or starting from local files with a required point cloud supporting PCD, PLY, XYZ and PTS"
  size="full"
  framed
  caption="Two ways to start: pull an existing map down from the fleet, or begin from a scan on your machine." />

**Import from Fleet** pulls an existing map bundle — the graph, its point cloud and its occupancy map — down to edit and push back as a new revision.

**Start from local files** needs a **point cloud**, the scan the map is built on, in `PCD`, `PLY`, `XYZ` or `PTS`. An existing map can be loaded alongside it, which is how you re-author a map against a fresh scan.

**Reach for Import from Fleet whenever the site already has a map.** Sites change, and whoever updates one needs to start from what is actually live rather than a copy on a laptop that may be several revisions behind — and nothing will tell you that it is.

## 2 · Prepare Data

Clean up the scan before anything is drawn on it.

<Figure
  src={require('../img/toolbox-prepare.png').default}
  alt="The Prepare stage with an office point cloud rendered in the 3D view and a panel offering Downsample, Replace point cloud and Discard all changes, a Gravity Align section with Auto and Pick 3 points, and a Crop section offering Polygon and Box"
  size="full"
  framed
  caption="Preparing a scan: reduce it, level it against gravity, and crop away what you do not need." />

| Operation | What it does |
| --- | --- |
| **Downsample** | Merges points into a grid of cubes and keeps one per cube |
| **Gravity align** | Rotates a slanted scan so the floor sits flat — automatically, or by picking three points on a surface you know is level |
| **Crop** | Keeps only part of the cloud, by polygon or by box |

**Downsample first.** A raw scan is slow to draw on, and the editor says so when it is given a large one. You choose the cube size: the office scan above went from **555,150 points to 194,668** at a 5 cm grid — enough detail to place a map against, and far quicker to work with.

**This stage decides the quality of everything after it.** A scan that is subtly tilted produces a map that looks correct and navigates badly: where the floor sits, where the nodes and zones you later place come to rest on it, and whether routes solve all follow from getting this right. It is the cheapest stage to redo and the most expensive to skip.

## 3 · Setup Levels

Identify the floor the map is built on. Every node and zone belongs to a level.

<Figure
  src={require('../img/toolbox-levels.png').default}
  alt="The Levels stage listing six detected horizontal planes by height in metres, each with a point count and an Add button, beside the rendered point cloud"
  size="full"
  framed
  caption="Detected planes, listed by height with the number of points supporting each. Adding one makes it a level." />

**Extract** finds the horizontal planes in the scan and lists them by height, each with the number of points supporting it. You add the one that is the floor — and that point count is how you tell a real floor from a run of desks at a consistent height.

For a single-level site this stage is short: there is one level, and everything on the map belongs to it. This release supports one level per site, so for most sites that is the whole of it.

### The occupancy map

Adding a level offers a second thing: a **top-down occupancy map** generated from the cloud for that level. It is the flat picture of what is free and what is blocked, and it is what the fleet later draws underneath the graph so a node can be read against the building rather than as a coordinate.

You choose the slice it is built from — a minimum and maximum height above the floor — along with its resolution and how many points a cell needs before it counts as occupied. Taking the slice at roughly robot height is what keeps a ceiling fixture out of the picture and a chair leg in it.

One is generated per level, and it travels with the map.

## 4 · Edit Map

This is where the map itself is drawn: the nodes a robot can be sent to, the segments it may travel along, and the zones that apply rules.

<Figure
  src={require('../img/toolbox-edit.png').default}
  alt="The Edit stage with the occupancy map drawn over the level, nodes placed along a corridor, a floating tool palette for select node segment and zone, panels for the active level, visualisation opacity and surface snap configuration, and an elements list"
  size="full"
  framed
  caption="Editing against the scan: the tools on the left of the view, the occupancy map beneath, and a running count of what the map holds." />

### The tools

Four tools sit on the view, and each tells you how it is driven while it is active.

| Tool | How it works |
| --- | --- |
| **Select** | Click a node or segment to select it. Shift-click to select several |
| **Node** | Double-click on the level to place one; drag it to move it |
| **Segment** | Click one node to start, then another to connect them. Via points can be dragged to shape the path between |
| **Zone** | Draw a boundary, for the rules that apply inside it |

Every action is undoable, and the map is saved as you go.

### What you draw against

The point cloud, the occupancy map and the level each have their own visibility and opacity. You can work against the raw scan, against the flat occupancy picture, or both at once — and the choice matters more than it sounds, because placing a node against an empty grid is how a node ends up somewhere a robot cannot reach.

The scan is the more truthful of the two: it shows the clutter that the occupancy slice may have cut away. The occupancy map is the easier to read. Most people use the scan faded behind the occupancy map.

### Selecting and adjusting

<Figure
  src={require('../img/toolbox-edit-properties.png').default}
  alt="The elements list showing five nodes with one selected, beside a properties panel for that node giving its name, its type as waypoint or charging, its X Y and Z position, its orientation in degrees, its level, a snap-to-surface control and a priority, with a delete button"
  size="md"
  framed
  caption="Selecting a node. The elements list is a live index of the map; the properties panel is where a node's type, position and orientation are set." />

The **elements list** is a running index of everything on the map, grouped by kind. Selecting from it selects on the map, and the focus control jumps the view to whatever is selected — which is how you find one node among sixty rather than hunting for it.

The **properties panel** is where a selected element is adjusted:

| Field | What it sets |
| --- | --- |
| **Name** | Optional, and worth setting — a map of `wp_001` through `wp_024` is searchable and tells nobody anything |
| **Type** | Whether the node is an ordinary **waypoint** or a **charging** station |
| **Position** | X, Y and Z, editable directly when a click is not precise enough |
| **Orientation** | Which way the robot faces on arrival, in degrees |
| **Level** | Which level the element belongs to |
| **Priority** | Advanced; leave it alone unless you have been told otherwise |

Position and orientation being editable matters more than it seems. Clicking is fine for placing a node roughly; typing is how you put one exactly at the middle of a doorway, or make two facing points face the same way.

### Surface snapping

**Surface snapping is what settles a node onto the floor instead of leaving it floating**, and a node that is floating is a node a robot cannot be sent to.

It works from a height grid computed against the active level, and you control how it looks:

| Setting | What it does |
| --- | --- |
| **Above** and **Below** | How far above and below the level to search for a surface |
| **Grid size** | How finely the surface is sampled |
| **Neighbour search** | How far around a point to look when working out the surface height |

Widening the search range is the fix when nodes will not settle; narrowing it is the fix when they settle onto the wrong thing. **Show height deviations** draws how far each node sits from the level, which is how you spot the one that snapped to a desk rather than the floor.

Placing nodes and segments is not the same as having a route. Segments are what a route is computed over, so two segments that appear to meet on screen but do not share a point produce a map that looks connected and does not solve. The [Map inspector](/solution/deployment-toolbox/map-inspector) is where that is checked, and it is worth checking before you export.

## 5 · Export

Validate the map, review what it contains, and send it somewhere.

<Figure
  src={require('../img/toolbox-export.png').default}
  alt="The Export stage showing a map summary with name description author and format, a changelog for this version, computed values and bounds, the reference maps the bundle carries including a generated occupancy grid and the point cloud, and a validation panel listing seven warnings including multiple nodes but no segments and each unconnected node by name"
  size="full"
  framed
  caption="Export: what the map contains, what will travel with it, and what validation has to say about it. The warnings here are real — this map has nodes and no segments joining them." />

**Validation is the point of the stage.** It reports what is wrong by name rather than in general — the map above is warned that it has multiple nodes but no segments, and each unconnected node is listed individually. A warning is not a refusal, but shipping past one is a decision rather than an oversight.

The stage also shows what the bundle will carry: the map document, the point cloud, and the occupancy map generated for each level, written as a standard grid and its accompanying metadata.

**A changelog entry belongs to the version, not to the file.** The stage asks what changed and who changed it, and leaving both empty skips the entry — which is worth not doing, because it is the record that explains a revision to whoever opens it next.

From here the map can be **exported as a bundle** — a `.zip` packing the map document, the point cloud and the occupancy map — or **pushed to the Fleet Management System**, which is the route that leads to robots.

## Publishing to the fleet

A finished map does nothing until it reaches robots, and the Deployment Toolbox performs only the first step of that journey.

### Pushing

Pushing sends the map into the Fleet Management System. The push asks for four things:

<Figure
  src={require('../img/toolbox-push.png').default}
  alt="The Push map to fleet dialog, explaining that it creates a draft revision which reaches robots only once published and activated in fleet, with a target choice between creating a new map and adding to an existing one, a site picker, a map name and an optional change summary"
  size="md"
  framed
  caption="The push dialog. It says plainly what a push does and does not do." />


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

**How do I place a node exactly?**  
Click to place it roughly, then type its position and orientation in the properties panel. Clicking is for approximate; typing is for the middle of a doorway.

**My nodes are sitting above or below the floor**  
Surface snapping settles them onto the level, and it looks a set distance above and below to find it. Widen that range, or check the scan was levelled properly in Prepare — a tilted scan puts the floor where the nodes are not.

**Can I go back and re-crop the scan after placing nodes?**  
Yes. Stages are revisitable once their prerequisites are met, so returning to Prepare is normal rather than a restart.

**I pushed a map but the robots have not changed**  
Expected. Pushing creates a draft in the Fleet Management System; someone there has to publish it and then activate it. Until then robots keep the map they have.

**Can I change a map without this tool?**  
A Site Admin can adjust waypoints and the connections between them in the Fleet Management System. Changing the scan, the levels or the zones is this tool's job.

**My site has two floors**  
This release supports one level per site, because robots do not use stairs or lifts on their own. Ramps within a level are fine, since a ramp is not a change of level.

**Why does my map have so many zones?**  
Most were generated rather than drawn: one around every node and one along every segment. A twenty-four-node site with a single hand-drawn keep-out area still holds fifty-six zones.
