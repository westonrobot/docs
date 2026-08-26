---
draft: true
sidebar_position: 2
description: "Fleet Management System: plan, dispatch, watch and review autonomous missions from a browser. Features, workflow, roles, alerts and limits."
---

# Fleet Management System

The Fleet Management System is the web application you run your robots from. Missions are planned here, dispatched here, watched here, and everything the robots find is kept here. It runs in a browser — there is nothing to install and no engineering tools involved.

:::caution Draft

This page is being written for an upcoming release and is not final.

:::

## Where it sits

A working deployment has three parts. This is the one people use every day.

| Part | What it does | How often you touch it |
| --- | --- | --- |
| [Deployment Toolbox](/solution/deployment-toolbox) | Turns a 3D scan of your site into the map robots navigate by | Once per site |
| **Fleet Management System** | Plan, dispatch, watch, review | Daily |
| Robot | Carries out the missions | — |

The **site map** connects them. It is drawn in the Deployment Toolbox, published here, activated here, and sent from here to the robots. The Deployment Toolbox never talks to a robot itself.

## Key features

| | |
| --- | --- |
| **Fleet overview** | Every site and robot, with live status |
| **Mission planning** | Build missions from waypoints, routes and schedules; reuse them across sites |
| **Live monitoring** | Position on the site map, telemetry, camera feeds, health and activity |
| **Direct control** | Emergency stop, dock, and remote driving, one operator at a time |
| **Detection review** | Everything the robots detected, filterable and reviewable, kept as durable evidence |
| **Users and roles** | Who may watch, who may command, who may change a site |
| **Audit log** | An append-only record of who did what |

The dashboard is the entry point: sites down the side, robots grouped by site, and a status count across the top.

<Figure
  src={require('./img/fleet-dashboard.png').default}
  alt="Fleet dashboard showing four sites and ten robots grouped by site, with operational, non-responsive and faulty status counts"
  framed
  caption="The fleet dashboard — every site and robot, with current status." />

## Deployment models

Which model your project uses is decided before deployment, and it is not a matter of preference.

| Model | Use it for | Why |
| --- | --- | --- |
| **Shared cloud**, hosted by Weston Robot | Short proofs of concept, demonstrations, evaluations | Nothing to provision |
| **Dedicated instance**, cloud | Real site deployments | Your own instance, upgraded on your schedule |
| **Dedicated instance**, on-premise | Real deployments with data-residency requirements | As above, and your data stays on your network |

**What decides it is tenancy, not location.** On the shared cloud every customer sits on the same infrastructure: your data is kept separate, but upgrades are not — an upgrade for one customer restarts services everyone is using, and it cannot be scheduled around your operations. A dedicated instance is upgraded on your schedule, wherever it runs.

On-premise is the further step, and data residency is what decides it. If your rules require data to stay on your own network, on-premise is the answer; otherwise a dedicated cloud instance does the same job. Either way, the robots and the servers must be able to reach each other on your network.

## The main workflow

Four things happen here, in this order.

### 1. Plan a mission

Missions are built in the browser from waypoints, routes and schedules, then kept in a library and reused. Saved locations, revision comparison and duplication mean a second site starts from the first rather than from nothing.

Missions reference the site map. **When a map changes, the missions affected by it are flagged for review** rather than dispatched against waypoints that may have moved.

### 2. Dispatch it

A mission is dispatched to a specific robot, either on demand or on a schedule. A robot can also be sent on a one-off errand without building a full mission.

### 3. Watch it run

The robot view is where an operator spends their time: the site map with the robot's position on it, live camera feeds, telemetry, current mission, alerts, and the controls.

<Figure
  src={require('./img/fleet-robot-view.png').default}
  alt="Robot detail view with navigation map, camera feed panel, mission status, telemetry showing battery and temperature, and control panel with emergency stop"
  framed
  caption="The operator's working view: where the robot is, what it sees, and the controls to intervene." />

Direct control — **emergency stop, teleoperation, dock** — is taken deliberately, and held under a lease so **only one person is driving at a time**. Teleoperation stops the robot if the link degrades, and refuses the controls to anyone who has not properly taken control.

### 4. Review what was found

Detections and events land in Detection Review and stay there: filterable by robot, type, priority and review state, and acknowledged by a named person. Each detection is kept with its image, stored so it cannot be edited or deleted afterwards, and reviewer notes are appended rather than replacing what was there.

This is the difference between a robot that saw something and an organisation that can show what it saw.

## Users and roles

Roles decide who may watch, who may command, and who may change a site. They are assigned per site, so someone can be an operator at one site and an observer at another.

| Role | Can |
| --- | --- |
| **Observer** | See the site and its robots. No commands |
| **Operator** | Everything an observer can, plus command robots — dispatch, teleoperate, emergency stop |
| **Site Admin** | Everything an operator can, plus manage that site's maps, routes and robots |
| **Auditor** | Read operational and audit logs across all your sites. No commands, no changes |

Tenant-level administrators hold Site Admin authority across every site, and additionally manage sites, users and roles.

<Figure
  src={require('./img/fleet-users-roles.png').default}
  alt="Tenant management screen listing sites with robot and map counts, and users with their assigned roles and activity"
  framed
  caption="Sites and users in one place, with each person's role and last activity." />

**One thing worth planning around:** the same role that draws a map can also make it live. If your process requires a second person to approve a map before robots use it, that has to come from your process — the system does not require it.

## What happens during a mission

Behaviour you will not see on a screen until it happens:

- **Not enough battery** — the robot refuses to start a mission, and interrupts its schedule if the level becomes critical.
- **The connection drops mid-mission** — a policy you configure decides what happens: stop safely, halt immediately, or carry on. Choose it deliberately; the right answer differs between a warehouse aisle and an open yard.
- **The robot does not need the internet to patrol.** If the link drops it keeps working — what you lose is the live view, not the mission.

## Events and alerts

Whatever detects something — a camera on the robot, or an analytics service elsewhere — reports it into the same list of event types, and each type carries an urgency.

**An alert is raised at high urgency and above.** That is 12 of the 25 event types, two of which are critical: fire or smoke, and a person down. Events below that are recorded and reviewable, but do not page anyone. If you expect to be alerted about something, check the urgency of its type rather than assuming every detection alerts.

An event type the platform does not recognise is treated as lowest urgency and shown as **Unclassified detection**, so an unexpected event from an integration can never page an operator by surprise.

## Updates and remote management

What can be done to a robot remotely is deliberately short: **change its credentials, and send it a new map.** There is no remote login. A new map does not take effect on arrival — someone has to activate it, so a robot never changes map part-way through a job.

**Robot software is not updated through the dashboard.** Updates are done by Weston Robot, either on site or over a VPN connection to the robot. If your security policy does not allow that, raise it before the site survey rather than at the first update — it decides how your robots get serviced.

## Known limitations

- **Alerts stay in the app** — no email, SMS, push or phone. An alert is seen by someone with the dashboard open.
- **Alert rules are not configurable per site.** Which event types raise an alert is fixed.
- **Video is live only.** Nothing is recorded for later review.
- **No mission replay or export**, and run history does not survive a restart.
- **Remote management covers credentials and maps only** — not software updates, configuration or log retrieval.
- **Designed for desktop.** It is not optimised for tablets or phones.
- **A detection is pinned to the robot, not to what it saw** — the record shows where the robot was standing, without a distance measurement, so the subject may be some way from the marker. Detections are still images rather than clips.

## Common questions

### We updated a map but the robots are still using the old one

Expected. A new map arrives as a draft and has to be activated. Until then robots keep the map they have — this is deliberate, so a robot never changes map in the middle of a job.

### Why are missions flagged for review after a map change?

Because waypoints may have moved. Rather than dispatching against a map that no longer matches, the affected missions are flagged so someone confirms they still make sense.

### Something was detected but nobody was alerted

Check the urgency of that event type. Alerts are raised at high urgency and above; anything below is recorded without paging anyone.

### Can two people drive the same robot?

No. Control is held under a lease, and only one person holds it at a time.

## Support

Before raising a ticket, note which site and robot are involved, what the robot was doing just before, and what you saw on screen. [Before you contact us](/support/before-you-contact-us) lists what helps.

[Submit a support request](https://forms.office.com/r/qELKzYF33W).
