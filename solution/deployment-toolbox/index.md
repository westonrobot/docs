---
unlisted: true
sidebar_position: 3
description: "Deployment Toolbox: turn a 3D scan of a site into the map robots navigate by. What a map contains, the editor, the inspector, and how a map reaches the fleet."
---

# Deployment Toolbox

A 3D scan of a building is just points. A robot needs to know where the floor is, where it may drive, where it must not go, and which places matter. Somebody supplies that meaning once per site, and this is the tool they use.

What comes out is the **site map** — the artifact everything else depends on. It is pushed to the [Fleet Management System](/solution/fleet-management), and reaches the robots from there.

Preparing a site is a once-per-site job rather than a once-per-mission one, and the map is revisited afterwards only when the building itself changes — new racking, a wall moved, a door now permanently shut. Editing a site's map requires the **Site Admin** role for that site; operators and observers use maps without changing them.

Key features of the toolbox are summarized in the table below, and each is covered in its own section.

| Feature | What it gives you |
| --- | --- |
| **Map inspector** | Opens a map to examine it and check that routes solve |
| **Map editor** | Turns a 3D scan of a site into the map robots navigate by |

## Map layers

A site map is not one file. What travels between the Toolbox and the fleet is a **bundle** of layers, and each answers a different question.

| Layer | What it is | Where it is used |
| --- | --- | --- |
| **Navigation graph** | The TMG document: nodes, segments, zones and levels | What the robot navigates by, and what the fleet reads a site's waypoints and routes from |
| **Point cloud** | The 3D scan the map was authored against | Loaded back into the editor, so a later revision is drawn against the same scan |
| **Occupancy grid** | A flat grid of what is free and what is blocked, one per level | Drawn beneath the graph, so its nodes, segments and zones can be read against the building |

<Figure
  src={require('../img/toolbox-graph-over-occupancy.png').default}
  alt="A site's navigation map: the occupancy grid drawn in white showing the walls and structure of an office floor, with the TMG graph over it in blue — labelled nodes joined by segments, each wrapped in a shaded zone, and a marked home position"
  size="full"
  framed
  caption="The two layers together. White is the occupancy grid — the building. Blue is the graph — the nodes, segments and zones the robot reasons about." />

The graph is written in **TMG** — Topometric Navigation Graph, a map specification Weston Robot defines and publishes. It is *topometric* because it carries both the topology, meaning which places connect to which, and the metric detail, meaning exactly where each of them is. **The graph is the map; the rest is the ground it was drawn over** — a separation that shows in practice, since a bundle whose occupancy layer is missing still opens as a usable navigation graph, with the absent underlay reported rather than the whole map refused.

The occupancy grid's role today is visualisation: the fleet and the toolbox draw it under the graph so a node or a zone can be related to the floor plan it sits on rather than read as bare coordinates, while a robot navigates from the graph. One further surface is computed rather than stored — the **height grid**, derived from the point cloud against the level being edited, is what surface snapping uses to settle a node onto the floor, and it exists only while you are working.

[The map format](/solution/deployment-toolbox/map-format#the-layers) covers what a published bundle carries and how the layers relate.

## Map elements

The navigation graph is where a map's meaning lives, and these four elements are what it is built from. TMG exists because the formats already available describe a *space* without describing what is *allowed to happen* in it: a point cloud says where the walls are, not that this doorway is a route and that one is off limits.

| Element | What it is |
| --- | --- |
| **Node** | A point the robot can be sent to — a **waypoint**, or a **charging** station |
| **Segment** | A connection between two nodes: the ways the robot may travel |
| **Zone** | An area whose boundary applies rules inside it, including no-go |
| **Level** | A floor. Nodes and zones each belong to one |

Most zones on a finished map were never drawn by hand — one is generated around every node and along every segment, marking the envelope the robot may drive within.

[The map format](/solution/deployment-toolbox/map-format#the-elements) covers all four in full, which zones you draw and which are generated for you, and what levels mean for a site that spans floors.

## Data exchange

The Toolbox and the Fleet Management System exchange maps at two moments and are otherwise independent of each other.

```mermaid
flowchart LR
    FMS["<b>Fleet Management System</b>"]
    TB["<b>Deployment Toolbox</b><br/>an editing session"]
    FMS -->|"import a map bundle"| TB
    TB -->|"push a draft revision"| FMS
```

| Moment | Direction | What moves |
| --- | --- | --- |
| **Import from fleet** | Fleet → Toolbox | An existing map bundle, pulled down to work on |
| **Push to fleet** | Toolbox → Fleet | The finished map, as a new draft revision |

**Nothing passes between them in between.** A map open in the editor is a copy: it does not follow changes made in the fleet while you work, and the fleet knows nothing of your edits until you push them. Work in progress lives in your own browser rather than on a server, so the two systems share no state at all between an import and a push.

That is deliberate, and it has one practical consequence worth planning around: **whoever edits a site's map should import it at the start of the session rather than reusing yesterday's copy**, because nothing will tell them if it has moved on. It is also why two people editing the same site's map at the same time is a bad idea — neither would know.

**The Toolbox never talks to robots.** It pushes to the Fleet Management System, and robots are updated from there; there is no path from this tool to a machine in the field. A pushed map arrives as a **draft revision**, and someone in Fleet Management then **publishes** it and **activates** it — activation being what puts a map in front of robots, and neither step something the Toolbox can take.

[Publishing to the fleet](/solution/deployment-toolbox/publishing) covers the four things the push asks for, why the change summary is worth writing properly, the three steps from draft to activated, and what activation costs a robot.

## Map inspector

The inspector opens a map — from the fleet, or from a file — and lets you examine it without changing it. It works in two modes: **Inspect**, which counts what a map holds and offers a searchable list of its elements, and **Route**, which tests whether a path between two points you choose actually solves. Either can be viewed flat in 2D or over the point cloud in 3D.

**Testing that a route solves is the part that earns its keep.** Two segments that appear to meet on screen but do not share a point produce a map that looks connected and cannot be navigated, and that shows up here in seconds rather than during a patrol.

[Map inspector](/solution/deployment-toolbox/map-inspector) covers the two modes, where a map can be opened from, how to choose which routes to test, and when reaching for it is worth the time.

## Map editor

The editor runs as five stages, worked left to right: **load** a scan, **prepare** it, set up its **levels**, **edit** the graph onto it, and **export**. Any stage can be revisited once its prerequisites are met.

<Figure
  src={require('../img/toolbox-stages.png').default}
  alt="The map editor's stage bar showing five numbered stages in order: Load, Prepare, Levels, Edit, Export, with undo and redo alongside"
  size="full"
  framed
  caption="The five stages, worked left to right, with undo and redo throughout." />

The stage that decides the rest is **Prepare**. A scan that is subtly tilted produces a map that looks correct and navigates badly, and everything placed afterwards inherits the error.

[Map editor](/solution/deployment-toolbox/map-editor) covers all five stages, what each needs before it will open, the point cloud formats accepted, and what surface snapping is for.

## Support

Before raising a ticket, note which site and map are involved, and whether the problem is with drawing it, pushing it, publishing it or activating it — those are four different stages, and only the first two happen in this tool. [Before you contact us](/support/before-you-contact-us) lists what helps.
