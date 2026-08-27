---
unlisted: true
sidebar_position: 3
description: "The Map Inspector: open a map from the fleet or a file, examine its graph, costmap and height layers, and test whether a route solves."
---

# Map inspector

The Map Inspector opens a map and lets you examine it without opening the editor. It is the tool for answering "is this map all right?" — before a change, after one, or when a robot is behaving oddly and the map is a suspect.

## Opening a map

A map can be loaded **from the fleet** or **from a local file**. Loading from the fleet is the one to prefer when the question is about a live site, because it answers about the map robots are actually running rather than a copy that may have drifted.

The map being inspected can be changed without leaving the tool.

## What you can look at

The map is drawn in layers, which can be shown independently:

| Layer | Shows |
| --- | --- |
| **Graph** | The nodes, segments and zones — the map as the robot reasons about it |
| **Costmap** | The occupancy grid, drawn as the floor beneath the graph so elements can be related to the building |
| **Height** | The vertical structure of the scan |

Alongside it, an **elements list** enumerates what the map contains by kind, and selecting an element shows its properties. That is the quickest way to answer questions of the form "how many charging nodes does this site have?" or "which level is this zone on?".

## Testing that a route solves

The inspector's most useful function is checking that the map can actually be navigated.

Pick a **start point** and an **end point**, and the inspector computes a path between them across the segments. The result is either a route or a failure, and the failure is the informative case.

**A route that does not solve is the map's problem, not the robot's.** Two segments that appear to join on screen may not share a point; a path may cross a zone that forbids it; a node may sit on a different level from the one you expect. Each of those looks fine and navigates badly, and each shows up here in seconds rather than during a patrol.

Test the pairs that matter to the missions you intend to run — the charging station to the far end of the route, and back — rather than every pair. It is the long paths across the whole site that expose a break in the middle.

## When to use it

| Situation | Why the inspector |
| --- | --- |
| **Before publishing a change** | Confirms the map you are about to push actually works |
| **After activating a revision** | Confirms what went live is what you meant |
| **A robot will not go somewhere** | Distinguishes a map that cannot express the route from a robot that will not follow it |
| **Taking on an unfamiliar site** | Reads the map someone else authored without risking an edit |

Inspecting never modifies the map, so it is safe to open a live site's map and look.
