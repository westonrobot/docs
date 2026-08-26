---
draft: true
sidebar_position: 2
description: "Fleet Management System: plan, watch and review autonomous missions from a browser. Deployment models, roles, mission behaviour and limits."
---

# Fleet Management System

The Fleet Management System is where people plan work, watch it happen, and review what the robots found. Everything an operator does happens here, and everything a robot detects arrives here. It runs in a browser and needs no engineering tools.

It is one of three components, and a working deployment needs all three:

| Component | Its job | When you use it |
| --- | --- | --- |
| [Deployment Toolbox](/solution/deployment-toolbox) | Turns a 3D scan of your site into a map the robot can work from | Once per site, before any robot runs there |
| **Fleet Management System** | Plan, dispatch, watch and review | Every day |
| Robot Platform | Carries out the missions | — |

The site map ties them together. A map is authored in the Deployment Toolbox, published here as a draft, activated here, and distributed from here to the robots. The Deployment Toolbox never talks to a robot directly.

:::caution Draft

This page is a skeleton for a release still being documented. `draft: true` keeps it out of production builds entirely — it is visible with `npm run start` and absent from the deployed site. See `docs/design/release-pages-plan.md` §7 for what is still outstanding.

:::

## Deployment models

Which model a project uses is not a matter of preference, and it is decided before deployment rather than changed afterwards.

| Model | Use it for | Why |
| --- | --- | --- |
| **Shared cloud** — hosted by Weston Robot | Short-term proofs of concept, demonstrations and evaluations | Nothing to provision; the fastest way to see the system working |
| **Dedicated instance** — cloud | Serious site deployments | Your own instance, upgraded on your own schedule |
| **Dedicated instance** — on-premise | Serious site deployments with data-residency requirements | As above, and your data stays on your own network |

**The deciding factor is tenancy, not location.** Every tenant on the shared cloud sits on the same infrastructure. Isolation keeps each customer's data apart, but it does not make them independent: upgrading for one customer restarts services every other customer is also using, and that cannot be scheduled around one site's operations. A dedicated instance is upgraded on your schedule, wherever it runs.

On-premise is the further step, and data residency is what decides it. Where your rules require data to stay on your own network, on-premise is the only answer. Otherwise a dedicated cloud instance meets the same operational need. In both cases the robots and the servers must be able to reach each other on your network.

## Key information

### Roles and permissions

Every screen asks the same permission list the same question, so two screens cannot disagree about what someone is allowed to do. Roles are named selections from that list.

| Role | Scope | What it grants |
| --- | --- | --- |
| `observer` | One site | Read operational state at that site |
| `operator` | One site | Command robots at that site — take a control lease, teleoperate, dispatch |
| `site_admin` | One site | Everything an operator can do, plus manage that site's maps, navigation and robots |
| `tenant_admin` | All your sites | Site-admin authority everywhere, plus sites, users, roles and audit |
| `auditor` | All your sites | Read operational and audit logs. No command, no write |
| `platform_admin` | Weston Robot only | Control-plane administration. No day-to-day access to your data |

`site_admin` and `tenant_admin` are the same authority at different scope — admin at one site, versus admin everywhere plus tenant administration. `auditor` is deliberately not a higher or lower rung: it reads logs but cannot operate, which no position on an operator ladder expresses.

**Map permissions are worth knowing separately**, because they decide who can change what a robot does:

| Action | Required |
| --- | --- |
| Read maps, waypoints, routes and mission templates | `observer` |
| Approve a map apply to a robot, rotate robot credentials | `operator` |
| Create, edit or delete map bundles and layers | `site_admin` |
| Activate a map, and edit the live navigation graph | `site_admin` |

Authoring a map and activating it are the same permission tier, so one administrator can do both. If your process requires a second person to approve a map before it goes live, that separation has to come from your own process — it is not enforced by the system.

### Remote management

What Weston Robot can do to a robot remotely is deliberately short and fixed: **rotate its credentials, and send it a new map.** There is no remote login and no way to look around. Anything outside that list is absent because it was never granted.

A new map does not take effect when it arrives. Someone has to activate it, so a robot never changes map part-way through a job.

**Onboard software is not updated remotely.** Updating the software on a robot requires either in-person maintenance or SSH access over Weston Robot's VPN. There is no self-service update path, and no software updates, configuration changes or log retrieval through the fleet dashboard. If your security policy does not permit VPN access to the robot, raise it before the site survey rather than at the first update — it determines how the robot is serviced.

## Using it

Three things happen here: work is **planned**, work is **watched**, and what happened is **kept**.

### Plan

Missions are built and edited in the browser — waypoints, routes, schedules — held in a reusable library and dispatched to a robot. Saved locations, revision comparison and duplication mean a second site starts from the first rather than from nothing.

When a site map changes, the missions affected by it are **flagged for review** rather than quietly dispatched against waypoints that have moved. This is the behaviour to expect after any map update: missions do not silently follow the map.

### Watch

Live position on the site map, telemetry and history, camera views, robot health and an activity log.

An operator can take direct control — emergency stop, dock, drive — under a **lease** that guarantees only one person is driving at a time. Taking control is an explicit act, not a side effect of opening a camera view. Teleoperation stops the robot if the link degrades, refuses the controls to anyone who has not properly taken control, and follows a stated policy if the connection drops mid-job.

### Keep

Events, detections and their evidence land here and stay: filterable, reviewable, and acknowledged by a named person. Each detection becomes a record with its image, stored so it cannot be edited or deleted afterwards; anything a reviewer adds is appended rather than replacing what was there.

This is the difference between a robot that saw something and an organisation that can show what it saw.

### What happens during a mission

Behaviour you will not see on screen until it occurs:

- **Insufficient battery** — the robot refuses to start a mission, and interrupts the schedule at a critical level.
- **The link drops mid-mission** — a configurable policy governs what happens: stop safely, halt immediately, or continue. Choose it deliberately; the right answer differs between a warehouse aisle and an open yard.
- **The robot does not need the internet to patrol.** It keeps working if the connection drops; what stops is the live view and anything that has to reach the platform.

### Events and alerts

Every detection reports into the same registered vocabulary, whichever algorithm produced it, and the platform assigns each type an operator urgency.

**An alert is raised at high urgency and above** — 12 of the 25 registered types, of which 2 are critical (fire or smoke, and person down). Medium and below are recorded and reviewable, but never page anyone. If you expect to be alerted about something, check which urgency its type carries rather than assuming any detection alerts.

A type the platform does not recognise is floored to the lowest urgency and shown as **"Unclassified detection"**, so an unknown event from an integration can never page an operator.

Operators see each event's display name rather than its underlying token — for example, `ppe_missing` is shown as **Safety gear missing**. The tokens are integration vocabulary, and are documented for integrators rather than here.

## Known limitations

Stated plainly, because each one has caught somebody out:

- **Alerts stay in the app.** No email, SMS, push or phone. An alert is seen only by someone with the dashboard open.
- **No customer-defined alert rules.** Which events raise an alert is a platform decision, not a per-site setting.
- **No video recording.** Video is live only. Nothing is kept to review afterwards.
- **No mission replay or export**, and run history is held in memory — a restart clears it.
- **Remote management stops at credentials and maps.** No software updates, configuration changes or log retrieval.
- **Desktop-first.** The operator experience is not optimised for tablet or phone screens.
- **A detection is pinned to the robot, not to what it saw.** The record carries where the robot was standing, and there is no depth measurement, so the subject may be well away from the marker. Detections are still images rather than clips, and the review list refreshes every few seconds rather than instantly.

## Troubleshooting & FAQ

### A map was updated but the robots are still using the old one

Expected. A new map arrives as a draft and has to be activated; until then robots keep the map they have. This is deliberate, so a robot never changes map part-way through a job.

### Missions are flagged for review after a map change

Also expected. Rather than dispatching against waypoints that may have moved, affected missions are flagged so someone confirms they still make sense.

### A detection appeared but nobody was alerted

Check the event type's urgency. Alerts derive at high urgency and above; medium and below are recorded without paging anyone. An event shown as "Unclassified detection" is one the platform does not recognise, which is floored to the lowest urgency by design.

### Two people cannot drive the same robot

Correct. Direct control is held under a lease, and only one person holds it at a time.

## Support

Before raising a ticket, collect which site and robot are involved, what the robot was doing immediately before, and what you saw on screen — [Before you contact us](/support/before-you-contact-us) lists what helps.

[Submit a support request](https://forms.office.com/r/qELKzYF33W).
