---
sidebar_position: 3
description: "Building missions in Fleet Management: the editor's three stages, checkpoints and actions, saved locations, run conditions and scheduling, sending missions to a robot, and the history of what ran."
---

# Mission editing and dispatch

A **mission** answers three questions about a piece of work: **what** the robot should do, **where** it should do it, and **when** that should happen. Missions are built in the browser, kept in a library with a revision history, and sent to the robots that will run them.

## The model

**Where — checkpoints.** A checkpoint is more than a pose to drive to. It is a place the mission attaches meaning to: the robot travels there, turns to the heading you set, and then does whatever that checkpoint says it should. The position and heading are how it arrives; what the checkpoint carries is why it went.

**What — actions on arrival.** Each checkpoint holds its own list of actions, performed once the robot is there:

| Action | What the robot does |
| --- | --- |
| **Pause** | Holds position for a set number of seconds |
| **Announce** | Plays an audio clip, chosen from the sounds that robot carries rather than typed in |

A checkpoint with no actions is somewhere the robot passes through. A checkpoint with them is somewhere it stops and does something — and that is the difference between a route and a mission.

**When — run conditions.** Whether the mission is eligible to start at all, covered in [Run conditions](#run-conditions) below. A mission can be saved without them but not activated.

Some settings belong to the mission as a whole rather than to any one checkpoint:

| Setting | Default | What it decides |
| --- | --- | --- |
| **Minimum battery** | 20% | The charge required before the mission may start |
| **Retries** | 2 | How many times a move that fails is attempted again, up to 10 |
| **Ambient audio** | None | Clips played in continuous rotation while the mission runs, rather than at one place |

Two kinds of mission use this same shape. A **patrol** is a route the robot works repeatedly; an **errand** is an ad-hoc move from one place to another. Both are ordered checkpoints with actions attached — what differs is whether the work is meant to persist.

## The editor

The Mission Editor opens on a named robot and works against that robot's site map. It runs in three numbered stages.

<Figure
  src={require('../img/fleet-mission-editor.png').default}
  alt="The Mission Editor with a named mission, its route drawn on the site map with numbered checkpoints, a checkpoint list showing X and Y positions, headings, pause and announce actions, and a saved-location picker open for the last checkpoint"
  size="full"
  framed
  caption="The editor: details on the left with the route map beneath, the checkpoint list on the right, and review and save at the bottom." />

The recording below builds a two-checkpoint patrol from an empty editor through to saving it, so the three stages can be seen as one continuous piece of work. The sections that follow are the reference for each stage.

<Video
  src={require('../video/mission_creation.mp4').default}
  poster={require('../video/mission_creation.poster.jpg').default}
  title="A patrol mission built end to end in the Mission Editor: naming it, choosing the patrol kind, placing two checkpoints on the route map, setting a heading, adding an action, and saving with a change note"
  size="full"
  framed
  caption="Building a patrol end to end. Two minutes and a half; use fullscreen to read the panels." />

### 1 · Details

The mission's **name** is required and a **description** is optional. This is also where you choose whether it is a patrol or an errand.

### 2 · Checkpoints

Checkpoints are an ordered list. Each carries a position as **X and Y in metres** and a **heading in degrees**, which is required — a robot that arrives facing the wrong way has not really arrived, and a camera pointed at the wrong wall inspects nothing.

<Figure
  src={require('../img/fleet-mission-checkpoint.png').default}
  alt="A single checkpoint row in the editor, numbered 1, with X and Y position fields in metres, a required heading field in degrees, a pause-for-30-seconds action with a remove control, and an Add Action button"
  size="lg"
  framed
  caption="One checkpoint: where the robot goes, which way it faces, and what it does on arrival." />

Drag to reorder; undo, redo and clear apply across the whole list. There are three ways to say where a checkpoint is:

| Method | Use it when |
| --- | --- |
| **Reuse a saved location** | The place already has a name — see [Saved locations](#saved-locations) |
| **Place on the map** | Click the route map to set the position, then drag to set the heading |
| **Use the robot's pose** | The robot is already standing where you want the checkpoint |

Actions are added per checkpoint, and a checkpoint can carry more than one.

The route map draws the mission over the site map, numbering the checkpoints in order and distinguishing places, docks and stops, so the sequence can be checked against the building rather than against a list of coordinates.

### 3 · Review and save

<Figure
  src={require('../img/fleet-mission-review.png').default}
  alt="The Review and Save stage showing a validation message reading 'Checkpoint 4: set its place on the map', a 'What changed?' note field marked optional and recorded with this save, and Run Conditions and Save Mission buttons with save disabled"
  size="lg"
  framed
  caption="Review and save: what still needs fixing, the note recorded with this revision, and the two things you can do next." />

Saving validates first. A checkpoint with no position is named by number and blocks the save until it is set.

Two things here are worth knowing:

- **A "what changed?" note is recorded with the save.** It is optional, and it is what makes the revision history readable later rather than a list of timestamps.
- **Run conditions are set separately from saving.** A mission saves without them; it cannot be *activated* without them.

## Saved locations

A saved location is a named place on a robot's map. A checkpoint made from one **follows it**, so correcting the location later corrects every mission that uses it — which is what keeps a growing library maintainable rather than turning one moved shelf into an afternoon of edits.

<Figure
  src={require('../img/fleet-mission-saved-location.png').default}
  alt="The saved-location picker for a checkpoint, explaining that a stop made from a saved location follows it so fixing the location later fixes every mission that uses it, with a searchable list of the robot's locations each showing whether it has been used"
  size="md"
  framed
  caption="Picking a saved location. The list shows which are already in use, and the robot's home is one of them." />

Locations are held per robot, are searchable, and can be picked from the list or clicked directly on the map.

## Run conditions

Run conditions answer **"when should it run?"**, and they are the gate on activation rather than on saving.

| Condition | Behaviour |
| --- | --- |
| **Run by hand** | No automatic trigger — it runs when someone dispatches it |
| **As soon as possible** | Always eligible |
| **Every day** | Once a day, at an hour and minute |
| **Every hour** | Once an hour, at a chosen minute past |
| **Chosen days** | On selected weekdays, at an hour and minute |

Three properties of this model explain most of what surprises people:

**Conditions combine, they never alternate.** Every condition on a mission must be satisfied for it to become eligible. There is no "either/or".

**No conditions means always eligible, not never.** A test that all of nothing passes is passed trivially, so a mission with an empty condition list is eligible at every opportunity — a patrol set up that way would restart continuously. **That is why activating a mission with no run conditions is refused**, and the refusal is recorded in the [audit log](/solution/fleet-management/audit-log) like any other rejected action.

**A time carries its own cooldown.** The window you set is how late a start is still acceptable, and it doubles as the interval before the same trigger may fire again — which is what makes "every day at 09:00" safe on a mission that never finishes on its own. A day-of-week rule has no such guard, which is why days are always paired with a time rather than offered alone.

Times are the **robot's local time**, not the browser's.

## Sending missions to a robot

Authoring a mission does not put it on a robot. Missions are **sent** to the robot that will run them, and a badge answers the question that follows: does the robot actually have these?

| Badge | Means |
| --- | --- |
| **in sync** | The robot's own list was read back and matched this one |
| **content is stale** | The robot has not confirmed what it holds |
| **waiting for the robot** | Sent, not yet confirmed |
| **waiting for the run to end** | A mission is still running; this clears itself when it ends |
| **robot refused** | The robot rejected the last push |
| **does not match** | The robot is holding missions this fleet did not send |
| **robot offline** | Nothing can be confirmed |

The order above is the order the badge itself uses when more than one is true, and it is ordered by what you would have to do about it — nothing can be believed while the robot is offline, so that outranks everything else.

To **dispatch** a mission is to hand it to a named robot to run, on demand or on its schedule. A robot can also be sent somewhere once, with no mission at all — that is **Quick Dispatch**, on the map toolbar of the robot's own view. Use it for a one-off; use a mission for anything you will want again.

<Video
  src={require('../video/quick_dispatch.mp4').default}
  poster={require('../video/quick_dispatch.poster.jpg').default}
  title="Quick Dispatch sent from a robot's own view: picking a point on the navigation map, dispatching, and watching the run appear in Operations and the activity log while the robot drives"
  size="full"
  framed
  caption="Quick Dispatch, sent from the robot's own view. The run appears in Operations and the log as it goes." />

Missions reference the site map, so a robot must be on the map the fleet has activated before its missions can be edited or dispatched. [Catching a robot up to the map](/solution/fleet-management/tenant-management#catching-a-robot-up-to-the-map) covers what to do when it is not.

## History and logs

Three separate records answer three different questions, and none of them can be edited.

| Record | Answers |
| --- | --- |
| **Run history** | What actually ran, and how it ended |
| **Mission changes** | Who created, edited, deleted, activated, deactivated or ran a mission |
| **Revisions** | What a mission used to contain, and what one save changed |

**Run history exists because the robot's own answer does not survive.** A finished run's outcome lasts only a few seconds in the robot's report before the next arming clears it, so without a record there is no moment at which anyone could ask "did the 09:00 patrol finish?" and be answered.

**Mission changes are the only place you can see that someone else changed a mission** — that a patrol was deactivated, or deleted, and by whom. They come from the same operational audit trail as everything else.

**Revisions can be compared side by side.** A version number and the author's note say a save happened; the comparison says what actually moved. That matters when the decision is whether to restore, because restoring puts a robot back on an older route.

## Common questions

**The mission saved but will not activate**  
Check its run conditions. A mission saves without them, but activation is refused until they are set — a mission with no conditions would be eligible continuously.

**Why can I not use a day of the week on its own?**  
A day rule has no cooldown of its own, so a mission that does not end by itself would restart all day. Pairing it with a time gives it one.

**A robot's missions are switched off and I cannot edit or dispatch them**  
That robot is on an older map than the one the fleet has activated. See [Catching a robot up to the map](/solution/fleet-management/tenant-management#catching-a-robot-up-to-the-map).

**The badge says the robot does not match**  
It is holding missions this fleet did not send. Send the active set again to bring it back into line.

**I moved a location and several missions changed**  
Expected, if it was a saved location. Checkpoints made from one follow it, so a single correction applies everywhere it is used.

**Did last night's patrol actually run?**  
Run history, which records how each run ended. The robot's own report does not keep it.
