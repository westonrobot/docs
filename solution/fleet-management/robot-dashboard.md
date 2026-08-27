---
unlisted: true
sidebar_position: 1
description: "The robot view in Fleet Management: the navigation map, camera feeds, operations and telemetry panels, the control panel, and how battery and connection loss change a running mission."
---

# Robot dashboard

One robot on one screen. The view is laid out so that judging a running mission needs no switching between tabs: where the robot is, what it can see, what it is doing, how it is holding up, and the controls to intervene are all present at once.

## The panels

<Figure
  src={require('../img/fleet-robot-view.jpg').default}
  alt="Robot detail view with the navigation map and the robot's pose, four live camera feeds, an operations panel showing scheduled missions, telemetry for battery, uptime, heartbeat and speed, an alerts panel, and the control panel"
  size="full"
  framed
  caption="The operator's working view: the site map with the robot on it, its camera feeds, what it is doing, telemetry, and the controls." />

| Panel | What it carries |
| --- | --- |
| **Navigation map** | The site map with the robot's position and heading drawn on it, the map revision in use, and whether the robot is **localised** — that is, whether it knows where it is on that map. Quick Dispatch and pose controls sit on its toolbar |
| **Camera feeds** | Live feeds from the robot's cameras, each labelled, any of which can be brought into focus |
| **Operations** | The mission running now, how many are scheduled, and a running log of what the robot has reported |
| **Telemetry** | The readings the robot makes about itself — see below |
| **Alerts** | What has been raised for this robot over a window you choose — 12 hours by default, adjustable from 1 to 48. The durable record is in [Detection review](/solution/fleet-management/detection-review) |
| **Control** | The robot's current mode, and the controls to intervene |

**The main view area shows one or the other.** A **Map / Cameras** toggle decides whether the navigation map or the camera feeds take the large panel, with the other moving aside. An operator watching a robot drive can give the space to the feeds; one checking progress against the building can give it to the map. Which of the two opens by default is a per-user preference.

**Localisation is worth watching.** A robot that is not localised does not know where it is on the map, so map-relative work — dispatching a mission, sending it home — has nothing to work from until it does.

## Telemetry

Telemetry answers "is this robot all right?" and is presented three ways: **realtime** for what is true now, **history** for how a reading has moved, and **activity** for what the robot has been doing.

| Reading | Tells you |
| --- | --- |
| **Battery** | Charge remaining — the figure that decides whether a mission can start |
| **Heartbeat** | How recently the robot reported in. A healthy heartbeat is sub-second; a stale one is the first sign of a link problem |
| **Uptime** | How long the robot has been running since it last started |
| **Temperature** | Thermal state |
| **Speed** | How fast it is moving now |
| **Status** | Operational, non-responsive or faulty — the same status the fleet overview counts |

### Diagnostics

Telemetry says whether a robot is healthy. **Diagnostics** says what is unhealthy, and it opens from the telemetry panel.

<Figure
  src={require('../img/fleet-diagnostics.png').default}
  alt="The Diagnostics view for a robot, headed with its name, model and serial number, reporting three errors and four warnings. A grouped issues list shows services that have not published or have stopped publishing diagnostics; a data freshness panel lists each telemetry signal with its age; and an all-systems tree lists every subsystem with an OK, WARN, ERROR or STALE badge"
  size="full"
  framed
  caption="Diagnostics for one robot: the issues worth acting on, how fresh each signal is, and every subsystem with its status." />

It opens on a one-line verdict — how many errors and warnings the robot is reporting, and when that was last updated — and then three regions, meant to be read in order:

| Region | What it is for |
| --- | --- |
| **Issues** | Only what is wrong, grouped by subsystem with a count. The triage list — start here |
| **Data freshness** | Each telemetry signal with its age, so you can see what is still arriving |
| **All systems** | Every subsystem, healthy ones included, as an expandable tree |

Each subsystem carries one of four statuses:

| Status | Means |
| --- | --- |
| **OK** | Reporting, and healthy |
| **WARN** | Reporting, with something worth attention |
| **ERROR** | Reporting a fault |
| **STALE** | Not reporting recently enough to be trusted |

**ERROR and STALE are different problems.** A subsystem reporting a fault has told you something is wrong; a stale one has stopped telling you anything, and its last known state may be long out of date. The freshness panel is what tells the two apart, and they need different responses — one is a fault to act on, the other is a service to get reporting again.

**The control carries its own indicator**, so trouble is visible without opening it — amber for a warning, red for an error or a stale subsystem. On a robot that has not reported a diagnostics tree, the control is unavailable.

The view is headed with the robot's name, model and serial number. Quote those when raising a fault with us.

## Taking control

<Figure
  src={require('../img/fleet-controls.png').default}
  alt="The robot control panel showing an idle mission, a scheduled patrol, and the emergency stop, teleoperation and Go Home controls with Commands and Missions tabs"
  size="lg"
  framed
  caption="The control panel: what the robot is doing now, and the controls to intervene." />

| Control | What it does |
| --- | --- |
| **Emergency stop** | Stops the robot. While it is engaged, the other controls on the card are unavailable |
| **Teleoperation** | Drive the robot yourself, from the browser |
| **Go Home** | Send the robot back to its home position. Where no home has been set the same control reads **Set Home** instead, because with nowhere to drive to Go Home could only fail |
| **Commands** | Docking — dock and undock — and posture commands such as stand and sit |
| **Missions** | Pick a mission this robot may run, and dispatch it |

Control is held under a **lease**, so a second operator cannot take the controls until the one held is released.

Teleoperation carries two safeguards worth knowing before you rely on it: it **stops the robot if the connection to the fleet degrades**, and it refuses the controls to anyone who has not properly taken control.

**What the driving view shows depends on the robot.** An assisted view — a stitched surround view, proximity zones drawn from the robot's own sensing, and a bird's-eye radar panel — is tuned for a particular robot configuration and deployment rather than provided on every robot by default. Confirm which of your robots are set up for it before planning work that relies on it.

Drive commands also depend on the robot being on the map the fleet has activated. A robot that is behind has its dispatch and Go Home controls withdrawn until it catches up — see [Catching a robot up to the map](/solution/fleet-management/mission-editing#catching-a-robot-up-to-the-map).

## What happens during a mission

Battery level and the connection to the fleet both change what a running mission does.

- **Not enough battery** — the robot refuses to start a mission, and interrupts its schedule if the level becomes critical.
- **The connection to the fleet drops mid-mission** — what the robot does next is a policy you configure: stop safely, halt immediately, or carry on. Choose it deliberately; the right answer differs between a warehouse aisle and an open yard.

Two separate things are at work in that second case, and it is worth keeping them apart. **Navigation runs on the robot itself**, from the map it already holds, so completing a mission out of contact is a real capability rather than a hopeful one — which is what makes "carry on" a genuine option. **The policy still decides what happens**, so a robot perfectly capable of continuing will stop if that is what you configured. Live view and operator commands resume when the connection does.

## Common questions

**Can two people drive the same robot?**  
No. Control is held under a lease, and only one person holds it at a time.

**The camera panel is empty**  
The robot is not connected. Feeds are live, so there is nothing to show for a robot that is not reporting in. Check the heartbeat reading in telemetry.

**Why did teleoperation stop on its own?**  
Teleoperation stops the robot when the connection to the fleet degrades. That is deliberate — driving a robot you cannot see is worse than stopping it.

**The dispatch and Go Home controls are unavailable**  
Either the emergency stop is engaged, or the robot is behind the map the fleet has activated. The second is the more common; catching it up restores them.

