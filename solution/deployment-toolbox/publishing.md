---
unlisted: true
sidebar_position: 4
description: "Pushing a finished map to the Fleet Management System: what the push asks for, why it arrives as a draft, and the publish and activate steps that follow."
---

# Publishing to the fleet

A finished map does nothing until it reaches robots, and the Deployment Toolbox performs only the first step of that journey.

## Pushing

Pushing sends the map into the Fleet Management System. The push asks for four things:

| Field | What it decides |
| --- | --- |
| **Target site** | Which site in the fleet the map belongs to |
| **New map, or an existing one** | Whether this starts a new map, or adds a revision to one that already exists |
| **Map name** | What the map is called, when it is a new one |
| **Change summary** | What changed in this revision |

**The change summary is worth writing properly.** It is what a revision list shows months later, and the difference between "updated" and "moved the charging point after the racking was re-laid" is the difference between a history someone can read and a column of dates.

Choosing an existing map rather than a new one is what keeps a site's revisions together as one history. Starting a new map each time produces a site with several unrelated maps and no way to see how any of them changed.

## What happens next

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

## What activation costs a robot

Worth knowing before you push, because it shapes when the rest of the change should be scheduled: applying a new map to a robot **restarts its navigation and makes it re-acquire localisation**, and its missions are locked until it confirms the new map.

So a map change is not a background event at the site. Push whenever the work is done; time the activation.

## Common questions

**I pushed a map but the robots have not changed**  
Expected. Pushing creates a draft in the Fleet Management System; someone there has to publish it and then activate it. Until then robots keep the map they have.

**Can I change a map without this tool?**  
A Site Admin can adjust waypoints and the connections between them in the Fleet Management System. Changing the scan, the levels or the zones is this tool's job.
