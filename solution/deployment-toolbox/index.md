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
| **Map editor** | Turns a 3D scan of a site into the map robots navigate by |
| **Map inspector** | Opens a map to examine it and check that routes solve |

## Map layers

A site map is not one file. What travels between the Toolbox and the fleet is a **bundle** of layers, and each answers a different question.

| Layer | What it is | Where it is used |
| --- | --- | --- |
| **Navigation graph** | The TMG document: nodes, segments, zones and levels | What the robot navigates by, and what the fleet reads a site's waypoints and routes from |
| **Point cloud** | The 3D scan the map was authored against | Loaded back into the editor, so a later revision is drawn against the same scan |
| **Occupancy grid** | A flat grid of what is free and what is blocked, one per level | Drawn beneath the graph, so its nodes, segments and zones can be read against the building |
| **Reference image** | A floor plan or similar picture, one per level | The same underlay role, where a drawing reads better than a scan |

The graph is written in **TMG** — Topometric Navigation Graph, a map specification Weston Robot defines and publishes. It is *topometric* because it carries both the topology, meaning which places connect to which, and the metric detail, meaning exactly where each of them is.

**The graph is the map; the rest is the ground it was drawn over.** That separation is deliberate, and it shows: a bundle whose occupancy layer is missing still opens as a usable navigation graph, with the absent underlay reported rather than the whole map refused.

**The occupancy grid is there to be looked at.** Today it serves visualisation: the fleet and the toolbox draw it under the graph so a node or a zone can be related to the floor plan it sits on, rather than read as coordinates. A robot navigates from the graph.

One surface is computed rather than stored. The **height grid** is derived from the point cloud against the level being edited, and it is what surface snapping uses to settle a node onto the floor. It exists while you work and is not something the bundle carries.

## What a site map contains

The navigation graph is where a map's meaning lives. TMG exists because the formats already available describe a *space* without describing what is *allowed to happen* in it: a point cloud says where the walls are, not that this doorway is a route and that one is off limits.

| Element | What it is |
| --- | --- |
| **Node** | A point the robot can be sent to — a **waypoint**, or a **charging** station |
| **Segment** | A connection between two nodes: the ways the robot may travel |
| **Zone** | An area whose boundary applies rules inside it, including no-go |
| **Level** | A floor. Nodes and zones each belong to one |

Most zones on a finished map were never drawn by hand — one is generated around every node and along every segment, marking the envelope the robot may drive within.

[What a site map contains](/solution/deployment-toolbox/map-format) covers the elements in full, which zones are generated and which you draw, what levels mean for a multi-floor site, and what a published map bundle carries besides the graph.

## Map editor

The editor runs as five stages, worked left to right: **load** a scan, **prepare** it, set up its **levels**, **edit** the graph onto it, and **export**. Any stage can be revisited once its prerequisites are met.

<Figure
  src={require('../img/toolbox-stages.png').default}
  alt="The map editor's stage bar showing five numbered stages in order: Load, Prepare, Levels, Edit, Export, with undo and redo alongside"
  size="full"
  framed
  caption="The five stages, worked left to right, with undo and redo throughout." />

The stage that decides the rest is **Prepare**. A scan that is subtly tilted produces a map that looks correct and navigates badly, and everything placed afterwards inherits the error.

[Map editor](/solution/deployment-toolbox/map-editor) covers each stage, what it needs before it will open, the point cloud formats accepted, and the operations at each step.

## Map inspector

The inspector opens a map — from the fleet or from a file — and lets you examine it without changing it: its graph, costmap and height layers, an element list, and a route test between two points you choose.

**Testing that a route solves is the part that earns its keep.** Two segments that appear to meet on screen but do not share a point produce a map that looks connected and cannot be navigated, and that shows up here in seconds rather than during a patrol.

[Map inspector](/solution/deployment-toolbox/map-inspector) covers the layers, the element list and how to choose which routes to test.

## Publishing to the fleet

A finished map leaves the editor at its last stage, and what happens to it then is a handover rather than a third tool.

**The Deployment Toolbox never talks to robots.** It pushes a map into the Fleet Management System, and robots are updated from there — there is no path from this tool to a machine in the field.

A pushed map arrives as a **draft revision**. Someone in Fleet Management then **publishes** it and **activates** it; activation is what puts a map in front of robots. The Toolbox can take neither of those steps.

[Publishing to the fleet](/solution/deployment-toolbox/publishing) covers what the push asks for, why the change summary matters, and what activation costs a robot.

## Common questions

**I pushed a map but the robots have not changed**  
Expected. Pushing creates a draft in the Fleet Management System; someone there has to publish it and then activate it. Until then robots keep the map they have.

**Routes look connected but validation fails**  
Validation checks that a route actually solves, not that lines meet on screen. Two segments that appear to join may not share a point, or the path may cross a zone that forbids it.

**Which map are the robots actually using?**  
Import it from the fleet rather than trusting a local copy — that is what Import from Fleet is for.

**Can I change a map without this tool?**  
A Site Admin can adjust waypoints and the connections between them in the Fleet Management System. Changing the scan, the levels or the zones is this tool's job.

**My site has two floors**  
This release supports one level per site, because robots do not use stairs or lifts on their own. Ramps within a level are fine.

## Support

Before raising a ticket, note which site and map are involved, and whether the problem is with drawing it, pushing it, publishing it or activating it — those are four different stages, and only the first two happen in this tool. [Before you contact us](/support/before-you-contact-us) lists what helps.
