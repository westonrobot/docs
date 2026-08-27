---
unlisted: true
sidebar_position: 1
description: "The TMG map format: nodes, segments, zones, levels and transitions, which zones are drawn and which are generated, and what a published map bundle contains."
---

# What a site map contains

A 3D scan of a building is just points. A robot needs to know where the floor is, where it may drive, where it must not go, and which places matter. The **site map** is where that meaning lives, and this page is what it is made of.

## Why a dedicated format

The map format is **TMG** — Topometric Navigation Graph, a Weston Robot specification. It exists because the formats already available describe a *space* without describing what is *allowed to happen* in it. A point cloud says where the walls are; it does not say that this doorway is a route and that one is off limits.

TMG is the graph laid over the space: the places, the ways between them, and the rules that apply.

## The elements

| Element | What it is |
| --- | --- |
| **Node** | A point the robot can be sent to. Every node has a type: **waypoint**, the default, or **charging**, a charging station |
| **Segment** | A connection between two nodes — the ways the robot is allowed to travel |
| **Zone** | An area with a boundary that applies rules inside it, including no-go areas |
| **Level** | A floor. Nodes and zones each belong to one |
| **Transition** | How a robot moves between levels |

These are the names the editor's own layer tree uses. Two everyday words sit alongside them and are worth pinning down, because they belong to the fleet rather than to the map:

- A **waypoint** is a node of the default type, and it is also what a mission's checkpoint refers to. The map says where the robot *can* go; the mission says what it *does* there. A checkpoint is not a separate object on the map, which is why moving a node moves it for every mission at once.
- A **route** is a path from one node to another across segments. Routes are worked out from the map, not drawn on it — you place segments, then check that a route **solves** over them.

## Zones you draw, and zones you get

Zones do more than mark regions: a zone applies rules to everything inside its boundary. Some are drawn by hand for exactly that — a speed limit, or no access at all — which makes the zone the tool for both "slow down here" and "never go here".

Others are **generated for you**, one around every node and one along every segment, marking the envelope the robot may drive within. This is why a zone count is usually much larger than a node count, and why a map you never drew a zone on still has plenty.

<Figure
  src={require('../img/toolbox-finished-map.png').default}
  alt="A finished site map in the Map Inspector: an office floor with fifteen labelled waypoints and charging points joined by segments, with generated zones shaded as a corridor along every segment and a circle around every node, and a panel counting 15 nodes, 19 segments, 34 zones and 1 level"
  size="full"
  framed
  caption="A finished single-level office map. Everything shaded is a zone — and every one of these was generated." />

The map above has **15 nodes, 19 segments, 34 zones and one level**. All 34 zones were generated: one corridor along each of the 19 segments, one circle around each of the 15 nodes. That is how a fifteen-node office comes to hold thirty-four zones, and this particular map has no hand-drawn zones at all.

## Levels

Every node and zone belongs to a level. **This release supports one level per site**, because robots do not use stairs or lifts on their own — so for most sites this is a formality: there is one level, and everything is on it.

**Transition** exists in the format for sites that do span floors, and has no use in a single-level site. Ramps within a level are usually fine, since a ramp is not a change of level.

## What is published

The graph is not the whole artifact. What travels to the fleet is a **map bundle**:

| Layer | What it is |
| --- | --- |
| **Navigation graph** | The nodes, segments, zones and levels above — the TMG document |
| **Point cloud** | The scan the map was authored against |
| **Occupancy grid** | A flat grid of what is free and what is blocked, one per level, in the standard ROS format |
| **Reference image** | An optional floor plan or similar, one per level, serving the same underlay role |

**The occupancy grid is there to be looked at.** Today its role is visualisation: the fleet and the toolbox draw it under the graph so a node or a zone can be related to the floor plan it sits on rather than read as bare coordinates. It is generated rather than drawn by hand, and a robot navigates from the graph, not from this.

Keeping the layers together is what lets someone open a published map later and edit it against the same scan it was built from, rather than guessing. They are not equally essential, though — **the graph is the map**, and a bundle whose occupancy layer is missing still opens as a usable navigation graph, with the absent underlay reported rather than the whole map refused.
