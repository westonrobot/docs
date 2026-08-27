---
unlisted: true
sidebar_position: 2
description: "Building missions in Fleet Management: the editor's three stages, placing checkpoints, checkpoint actions, run conditions, saved locations, dispatch, and catching a robot up to the activated map."
---

# Mission editing and dispatch

The Mission Editor is where a mission is built, revised and saved to the library. It opens on a named robot, works against that robot's site map, and runs in three numbered stages.

## The editor

<Figure
  src={require('../img/fleet-mission-editor.png').default}
  alt="The Mission Editor with a named mission, its route drawn on the site map with numbered checkpoints, a checkpoint list showing X and Y positions, headings, pause and announce actions, and a saved-location picker open for the last checkpoint"
  size="full"
  framed
  caption="The editor's three stages: details, checkpoints on the map with their actions, then review and save." />

### 1 · Details

The mission's **name** is required; a **description** is optional. You also choose what kind of mission it is — an errand that sends the robot to one or more locations, for example.

### 2 · Checkpoints

Checkpoints are an ordered list, and each one carries a position as **X and Y in metres** plus a **heading**, which is required. Drag to reorder, and undo, redo and clear apply across the whole list.

There are three ways to say where a checkpoint is:

| Method | Use it when |
| --- | --- |
| **Reuse a saved location** | The place already has a name — see [Saved locations](#saved-locations) below |
| **Place on the map** | Click the route map to set the position, then drag to set the heading |
| **Use the robot's pose** | The robot is already standing where you want the checkpoint |

Each checkpoint can carry **actions** performed on arrival:

| Action | What it does |
| --- | --- |
| **Pause for** | Wait a set number of seconds before moving on |
| **Announce** | Play an audio file through the robot |

The route map draws the mission over the site map, numbering the checkpoints in order and distinguishing places, docks and stops, so the sequence is checkable against the building rather than against a list of coordinates.

### 3 · Review & Save

Saving validates the mission first — a checkpoint with no position is called out by number and blocks the save until it is set.

Two things happen at this stage that are worth knowing:

- **A "what changed?" note is recorded with each save.** It is optional, and it is what makes the mission's revision history readable later rather than a list of timestamps.
- **Run conditions are set separately from saving.** A mission can be saved without them, but activating one that has none is refused — the refusal is recorded in the [audit log](/solution/fleet-management/tenant-management#the-audit-log) like any other rejected action.

## Saved locations

A saved location is a named place on a robot's map, and checkpoints made from one **follow it**. Correcting a saved location later corrects every mission that uses it, which is what keeps a growing library maintainable.

Locations are held per robot, and can be picked from the list or clicked directly on the map. A robot's home is one of them.

## Dispatching

To **dispatch** a mission is to hand it to a named robot to run, either on demand or on the schedule the mission carries.

A robot can also be sent somewhere once, without building a mission at all — that is **Quick Dispatch**, on the map toolbar of the robot's own view. Use it for a one-off; use a mission for anything you will want again.

## Catching a robot up to the map

Missions reference the site map, so **a robot has to be on the map the fleet has activated before its missions can be edited or dispatched.**

When a newer map is activated, that robot's missions are switched off and stay locked until it confirms the new map, rather than running against waypoints that may have moved.

<Figure
  src={require('../img/fleet-map-not-current.png').default}
  alt="A dialog headed 'This robot's map is not up to date', comparing the revision the fleet activated with the older revision on the robot, and explaining that its missions are switched off until it confirms the new map"
  size="full"
  framed
  caption="What you see when a robot is behind the activated map. Editing and dispatch stay locked until it catches up." />

The recovery is: send the robot the activated map and wait for it to confirm, then check the missions and switch them back on. Sending the map is a Site Admin action, and if it fails it can be retried from the same dialog. [How a map reaches a robot](/solution/fleet-management/tenant-management#how-a-map-reaches-a-robot) shows the whole path.

## Common questions

### A robot's missions are switched off and I cannot edit or dispatch them

That robot is on an older map than the one the fleet has activated, and waypoints may have moved. Its missions stay locked until it confirms the new map; then you check them and switch them back on. If the switch fails, it can be retried from the same place. Updating which map a robot is on is a Site Admin action.

### The mission saved but will not activate

Check its run conditions. A mission saves without them, but activation is refused until they are set, and the refusal is recorded in the audit log.

### Can I send a robot somewhere without building a mission?

Yes — Quick Dispatch, on the map toolbar.

### I moved a location and several missions changed

Expected, if it was a saved location. Checkpoints made from a saved location follow it, so one correction applies everywhere it is used.
