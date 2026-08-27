---
unlisted: true
sidebar_position: 3
description: "The Map Inspector: open a map from the fleet or a file, examine its elements in 2D or 3D, and test whether a route between two points solves."
---

# Map inspector

The inspector opens a map and lets you examine it without changing it. It is the tool for answering "is this map all right?" — before a change, after one, or when a robot is behaving oddly and the map is a suspect.

It has two modes, which were once two separate tools and are now tabs of one: **Inspect**, for reading what a map contains, and **Route**, for testing that it can be navigated. Both can be viewed in **2D**, the graph flat, or **3D**, the graph over the point cloud.

## Opening a map

| Source | Use it when |
| --- | --- |
| **Import from Fleet** | The question is about a live site — this is the map robots are actually running |
| **Upload TMG file** | You have a graph on hand, without its other layers |
| **Upload bundle** | You have a full map bundle as a `.zip` |

Prefer importing from the fleet whenever the question concerns a real site. A copy on a laptop may be several revisions behind, and nothing will say so.

The map being inspected can be swapped without leaving the tool, and the header shows where the current one came from.

## Reading a map

<Figure
  src={require('../img/toolbox-inspector.png').default}
  alt="The Map Inspector in Inspect mode with a manufacturing site loaded: an overview panel counting 59 nodes, 65 segments, 17 zones and 3 levels, a searchable element list filtered by kind and showing named elements such as Receiving Dock and Assembly Station 1, and the graph drawn in 2D with its zones shaded"
  size="full"
  framed
  caption="Inspect mode. The overview counts what the map holds, the element list is searchable and filterable by kind, and the graph is drawn with its zones. This is an example map that ships with the TMG specification." />

The **overview** counts what the map contains — nodes, segments, zones and levels — which is the quickest check that a map is the one you think it is. A site you expect to have a dozen nodes and which reports sixty is not the map you meant to open.

The **element list** is searchable by name or identifier and filterable by kind, so you can pull up every charging node, or find the one waypoint whose name you half remember. Selecting an element shows its properties. This is where element names earn their keep: `Assembly Station 2` is a place someone can reason about, and a bare identifier is not.

## Testing that a route solves

Route mode answers the question the graph exists for: can the robot actually get from here to there?

<Figure
  src={require('../img/toolbox-route-test.png').default}
  alt="The Map Inspector in Route mode, with instructions to click to set a start point and shift-click to set a goal, and a note that the map data is sent to the server for pathfinding"
  size="full"
  framed
  caption="Route mode: click a start, shift-click a goal, and the path is computed across the segments." />

Click to set a start point and shift-click to set a goal. The path is computed across the segments and drawn, or the attempt fails — and **the failure is the informative case**.

A route that does not solve is the map's problem, not the robot's. Two segments that appear to join on screen may not share a point; a path may cross a zone that forbids it; a node may sit on a different level from the one you expect. Each of those looks fine and navigates badly, and each shows up here in seconds rather than during a patrol.

Route planning runs as a service rather than in the browser, so the mode is unavailable when that service cannot be reached, and the header shows whether it is connected.

**Test the pairs that matter**, rather than every pair. The long paths — a charging bay to the far end of the site, and back — are what expose a break in the middle. Short hops between neighbours rarely tell you anything you did not already know from looking.

## When to use it

| Situation | Why the inspector |
| --- | --- |
| **Before publishing a change** | Confirms the map you are about to push actually works |
| **After activating a revision** | Confirms what went live is what you meant |
| **A robot will not go somewhere** | Distinguishes a map that cannot express the route from a robot that will not follow it |
| **Taking on an unfamiliar site** | Reads the map someone else authored without risking an edit |

Inspecting never modifies the map, so opening a live site's map to look at it is safe.

## Common questions

**Routes look connected but validation fails**  
Validation checks that a route actually solves, not that lines meet on screen. Two segments that appear to join may not share a point, or the path may cross a zone that forbids it.

**Which map are the robots actually using?**  
Load it from the fleet rather than trusting a local copy — that is what Import from Fleet is for, and a copy on a laptop may be several revisions behind.

**Route mode is greyed out**  
Route planning runs as a service, and the mode is unavailable while it cannot be reached. The header shows the connection state.
