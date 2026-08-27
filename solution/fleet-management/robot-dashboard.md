---
unlisted: true
sidebar_position: 1
description: "The robot view in Fleet Management: site map, camera feeds, telemetry and the controls, plus how battery and connection loss change a running mission."
---

# Robot dashboard

The robot view is where an operator spends their time. Everything about one robot is on a single screen — where it is, what it is doing, what it can see, how it is holding up, and the controls to intervene.

## What is on the screen

<Figure
  src={require('../img/fleet-robot-view.jpg').default}
  alt="Robot detail view with the navigation map and the robot's pose, four live camera feeds, an operations panel showing scheduled missions, telemetry for battery, uptime, heartbeat and speed, an alerts panel, and the control panel"
  size="lg"
  framed
  caption="The operator's working view: the site map with the robot on it, its camera feeds, what it is doing, telemetry, and the controls." />

| Panel | What it shows |
| --- | --- |
| **Navigation map** | The site map, with this robot's position and heading on it |
| **Camera** | Live feeds from the robot's cameras |
| **Mission status** | What the robot is doing now, and what is scheduled next |
| **Telemetry** | The readings a robot reports about itself, such as battery level and temperature |
| **Alerts** | What has been raised for this robot — the full record is in [Detection review](/solution/fleet-management/detection-review) |
| **Controls** | Emergency stop, teleoperation, Go Home, and a Commands tab |

## Taking control

Direct control is taken deliberately, and it is held under a **lease** — an exclusive claim on that robot — so **only one person is driving at a time**. A second operator cannot take the controls until the lease is released.

<Figure
  src={require('../img/fleet-controls.png').default}
  alt="The robot control panel showing an idle mission, a scheduled patrol, and the emergency stop, teleoperation and Go Home controls with Commands and Missions tabs"
  size="lg"
  framed
  caption="The control panel, closer up: what the robot is doing now, and the controls to intervene." />

| Control | What it does |
| --- | --- |
| **Emergency stop** | Stops the robot |
| **Teleoperation** | Drive the robot yourself, from the browser |
| **Go Home** | Send the robot back to its home position. If no home has been set yet the same control reads **Set Home**, because with nowhere to drive to Go Home could only fail |
| **Commands** | Docking, and posture commands such as stand and sit |

Teleoperation carries two safeguards worth knowing about before you rely on it: it **stops the robot if the connection to the fleet degrades**, and it refuses the controls to anyone who has not properly taken control.

**What the driving view shows depends on the robot.** An assisted view — a stitched surround view, proximity zones drawn from the robot's own sensing, and a bird's-eye radar panel — is tuned for a particular robot configuration and deployment rather than provided on every robot by default. Confirm which of your robots are set up for it before planning work that relies on it.

## What happens during a mission

Battery level and the connection to the fleet both change what a running mission does.

- **Not enough battery** — the robot refuses to start a mission, and interrupts its schedule if the level becomes critical.
- **The connection to the fleet drops mid-mission** — what the robot does next is a policy you configure: stop safely, halt immediately, or carry on. Choose it deliberately; the right answer differs between a warehouse aisle and an open yard.

Two separate things are at work in that second case, and it is worth keeping them apart. **Navigation runs on the robot itself**, from the map it already holds, so completing a mission out of contact is a real capability rather than a hopeful one — which is what makes "carry on" a genuine option. **The policy still decides what happens**, so a robot perfectly capable of continuing will stop if that is what you configured. Live view and operator commands resume when the connection does.

## Common questions

### Can two people drive the same robot?

No. Control is held under a lease, and only one person holds it at a time.

### The camera panel is empty

The robot is not connected. Feeds are live, so there is nothing to show for a robot that is not reporting in.

### Why did teleoperation stop on its own?

Teleoperation stops the robot when the connection to the fleet degrades. That is deliberate — driving a robot you cannot see is worse than stopping it.

## Support

Before raising a ticket, note which site and robot are involved, what the robot was doing just before, and what you saw on screen. [Before you contact us](/support/before-you-contact-us) lists what helps.

[Submit a support request](https://forms.office.com/r/qELKzYF33W).
