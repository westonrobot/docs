---
unlisted: true
sidebar_position: 2
description: "Building and dispatching missions in Fleet Management: checkpoints, actions, schedules, saved locations, Quick Dispatch, and why a robot behind the activated map is locked."
---

# Mission editing and dispatch

A **mission** is an ordered list of places on the site map, what the robot does at each of them, and when it should run. Missions are built in the browser, kept in a library, and reused — a second site starts from the first rather than from nothing.

## Building a mission

<Figure
  src={require('../img/fleet-mission-editor.png').default}
  alt="The Mission Editor with a named mission, its route drawn on the site map with numbered checkpoints, and a checkpoint list showing positions, headings, pause and announce actions"
  size="lg"
  framed
  caption="Building a mission: details, checkpoints on the map with their actions, then review and save." />

The editor works in three parts:

| Part | What you set |
| --- | --- |
| **Details** | The mission's name, and its schedule |
| **Checkpoints** | An ordered list of positions on the site map, each with a heading, and each able to carry actions — pause for a set time, play an announcement |
| **Review and save** | Check the route, then save it to the library |

Two things make missions cheaper to maintain than the list above suggests. **Saved locations** mean a place you have named once can be reused, so fixing a location later fixes every mission that uses it. **Revision comparison and duplication** mean an existing mission is the starting point for the next one.

### Waypoints and checkpoints

The site map defines **waypoints** — the places on it a robot can be sent to. A mission's checkpoint is a waypoint the mission uses, together with what the robot does there. The map says where the robot *can* go; the mission says what it *does* there. A checkpoint is not a separate object on the map, which is why moving a waypoint in the map moves it for every mission at once.

## Dispatching

To **dispatch** a mission is to hand it to a named robot to run, either on demand or on the schedule the mission carries.

A robot can also be sent somewhere once, without building a mission at all — that is **Quick Dispatch**, on the map toolbar. Use it for a one-off; use a mission for anything you will want again.

## Missions and the site map

Missions reference the site map, so **a robot has to be on the map the fleet has activated before its missions can be edited or dispatched.**

When a newer map is activated, that robot's missions are switched off and stay locked until it confirms the new map — rather than running against waypoints that may have moved. Once it confirms, you check the missions and switch them back on.

<Figure
  src={require('../img/fleet-map-not-current.png').default}
  alt="A dialog headed 'This robot's map is not up to date', comparing the revision the fleet activated with the older revision on the robot, and explaining that its missions are switched off until it confirms the new map"
  size="lg"
  framed
  caption="What you see when a robot is behind the activated map. Editing and dispatch stay locked until it catches up." />

The whole path a map takes, from the Deployment Toolbox to a robot, is in [How a map reaches a robot](/solution/fleet-management/tenant-management#how-a-map-reaches-a-robot).

## Common questions

### A robot's missions are switched off and I cannot edit or dispatch them

That robot is on an older map than the one the fleet has activated, and waypoints may have moved. Its missions stay locked until it confirms the new map; then you check them and switch them back on. If the switch fails, it can be retried from the same place. Updating which map a robot is on is a Site Admin action.

### Can I send a robot somewhere without building a mission?

Yes — Quick Dispatch, on the map toolbar.

### I moved a location and several missions changed

Expected, if it was a saved location. That is what saved locations are for: one correction, applied everywhere it is used.

## Support

Before raising a ticket, note which site, robot and mission are involved, and whether the problem is with building, dispatching or the map the robot is on. [Before you contact us](/support/before-you-contact-us) lists what helps.

[Submit a support request](https://forms.office.com/r/qELKzYF33W).
