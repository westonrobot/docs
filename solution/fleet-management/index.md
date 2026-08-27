---
unlisted: true
sidebar_position: 2
description: "Fleet Management System: plan, dispatch, watch and review autonomous missions from a browser. How the system is put together, the workflow, deployment models and limits."
---

# Fleet Management System

The Fleet Management System is the web application you run your robots from. Missions are planned here, dispatched here, watched here, and everything the robots find is kept here. It runs in a browser, and there is nothing to install.

A working deployment is the robots, the map they navigate by, and this system. Fleet Management is the part your team uses every day. The [Deployment Toolbox](/solution/deployment-toolbox) prepares a site once, before any robot drives there. Detection algorithms — ours on the robot, or a partner's alongside it — report into this system too, so what they find arrives as events here.

```mermaid
flowchart LR
    OP(["Your team,<br/>in a browser"])
    TB["<b>Deployment Toolbox</b><br/>prepares the site, once"]
    FMS["<b>Fleet Management System</b><br/>plan · dispatch · watch · review"]
    ROBOT["<b>Robot</b><br/>carries out the missions"]
    OP <--> FMS
    TB -->|"site map"| FMS
    FMS -->|"missions, map, commands"| ROBOT
    ROBOT -->|"telemetry, events, detections"| FMS
    style FMS fill:#0f6e78,stroke:#0f6e78,color:#fff
```

The **site map** ties these parts together, and it travels one way: the Deployment Toolbox publishes it here, and robots receive it from here once an administrator activates it. The Toolbox never reaches a robot directly. 

## Key features

| Feature | What it gives you |
| --- | --- |
| **Fleet overview** | Every site and robot, with live status |
| **Mission planning** | Build missions from waypoints, the routes between them and a schedule; reuse them across sites |
| **Live monitoring** | Position on the site map, telemetry, camera feeds, health and activity |
| **Direct control** | Emergency stop, teleoperation, docking and posture commands — one operator at a time |
| **Detection review** | Everything the robots detected, filterable and reviewable, kept as a record that cannot be edited or deleted |
| **Users and roles** | Who may watch, who may command, who may change a site |
| **Audit log** | An append-only record of who did what |

## Fleet overview

The dashboard is the entry point: sites down the side, robots grouped by site, and a status count across the top. It answers "is anything wrong right now" without opening a single robot.

<Figure
  src={require('../img/fleet-dashboard.png').default}
  alt="Fleet dashboard showing four sites and ten robots grouped by site, with operational, non-responsive and faulty status counts"
  size="full"
  framed
  caption="The fleet dashboard — every site and robot, with current status." />

## Mission planning

A **mission** is an ordered list of places on the site map, what the robot does at each of them, and when it should run. Missions are built in the browser, kept in a library, and reused across sites, so a second site starts from the first rather than from nothing.

Missions reference the site map, so a robot must be on the map the fleet has activated before its missions can be edited or dispatched.

[Building a mission](/solution/fleet-management/mission-editing#building-a-mission) covers checkpoints and the actions they carry, schedules, saved locations, Quick Dispatch, and what happens when a robot is behind the activated map.

## Live monitoring

The robot view puts one robot on one screen: its position on the site map, live camera feeds, **telemetry** — the readings a robot reports about itself, such as battery level and temperature — the current mission, and any alerts raised for it.

[What is on the screen](/solution/fleet-management/robot-dashboard#what-is-on-the-screen) covers each panel, and how battery level and connection loss change a running mission.

## Direct control

Control is taken deliberately and held under a **lease** — an exclusive claim on that robot — so only one person drives at a time. The controls are emergency stop, **teleoperation** (driving the robot yourself from the browser), set home, and a Commands tab carrying docking and posture commands.

[Taking control](/solution/fleet-management/robot-dashboard#taking-control) covers the controls and the safeguards on teleoperation.

## Detection review

Everything the robots detected lands in one place and stays there: filterable by robot, type, priority and review state, acknowledged by a named person, and stored so it cannot be edited or deleted. Not every detection raises an alert — alerts start at high priority.

[Which events raise an alert](/solution/fleet-management/detection-review#which-events-raise-an-alert) covers the priorities, what the record keeps, and what alerting deliberately does not do.

## Users and roles

Roles decide who may watch, who may command, and who may change a site. Three are assigned per site, so someone can be an Operator at one site and an Observer at another; two are held across your whole **tenant** — your organisation's own space in the system — and apply everywhere at once.

[Roles](/solution/fleet-management/tenant-management#roles) covers all five, what each may do, and who may activate a map.

## Audit log

Actions are recorded in an append-only log: entries are added, never changed or removed. The Auditor role reads it across every site without being able to command anything, which is what makes it useful for a reviewer who should not be able to move a robot.

[The audit log](/solution/fleet-management/tenant-management#the-audit-log) covers it alongside the roles that can read it.

## Updates and remote management

What can be done to a robot remotely is deliberately short: **change its credentials, and send it a new map.** There is no remote login, and a map sent to a robot changes nothing until it is activated — see [How a map reaches a robot](/solution/fleet-management/tenant-management#how-a-map-reaches-a-robot).

**Robot software is not updated through the dashboard.** Updates are done by Weston Robot, either on site or over a VPN connection to the robot. If your security policy does not allow that, raise it before the site survey rather than at the first update — it decides how your robots get serviced.

## Deployment models

Which model your project uses is decided before deployment, and it is not a matter of preference.

| Model | Use it for | Why |
| --- | --- | --- |
| **Shared cloud**, hosted by Weston Robot | Short proofs of concept, demonstrations, evaluations | Nothing to provision |
| **Dedicated instance**, cloud | Real site deployments | Your own instance, upgraded on your schedule |
| **Dedicated instance**, on-premise | Real deployments with data-residency requirements | As above, and your data stays on your network |

**What decides it is tenancy, not location** — that is, whether your organisation shares infrastructure with other customers or has an instance to itself. On the shared cloud every customer sits on the same infrastructure: your data is kept separate, but upgrades are not — an upgrade for one customer restarts services everyone is using, and it cannot be scheduled around your operations. A dedicated instance is upgraded on your schedule, wherever it runs.

On-premise is the further step, and data residency is what decides it. If your rules require data to stay on your own network, on-premise is the answer; otherwise a dedicated cloud instance does the same job. Either way, the robots and the servers must be able to reach each other on your network.

## Known limitations

- **Alerting is in-app only, and its rules are fixed** — no email, SMS, push or phone, and which event types raise an alert cannot be varied per site.
- **Video is live only** — nothing is recorded, so a detection record carries a still image, never a clip.
- **No mission replay or export**, and run history does not survive a restart.
- **Remote management covers credentials and maps only** — not software updates, configuration or log retrieval.
- **Designed for desktop**, not for tablets or phones.
- **A detection is pinned to the robot, not to what it saw** — the record marks where the robot was standing, with no distance to the subject.

## Common questions

### We updated a map but the robots are still using the old one

Expected. A new map arrives as a draft and has to be activated. Until then robots keep the map they have — this is deliberate, so a robot never changes map in the middle of a job. See [How a map reaches a robot](/solution/fleet-management/tenant-management#how-a-map-reaches-a-robot).

### A robot's missions are switched off and I cannot edit or dispatch them

That robot is on an older map than the one the fleet has activated. See [Missions and the site map](/solution/fleet-management/mission-editing#missions-and-the-site-map).

### Something was detected but nobody was alerted

Alerts are raised at high priority and above, and they appear only in the app. See [Which events raise an alert](/solution/fleet-management/detection-review#which-events-raise-an-alert).

### Can two people drive the same robot?

No. Control is held under a lease, and only one person holds it at a time.

## Support

Before raising a ticket, note which site and robot are involved, what the robot was doing just before, and what you saw on screen. [Before you contact us](/support/before-you-contact-us) lists what helps.

[Submit a support request](https://forms.office.com/r/qELKzYF33W).
