---
sidebar_position: 1
description: "Safety for quadrupeds: leg envelope, falls, damping mode, where you can operate, development practice and fall recovery."
tags: [safety, quadruped]
---

# Quadruped Safety

Go2, As2, A2, B2 — see [Quadrupeds](/robot/intro#quadrupeds).

This page covers what is specific to quadrupeds. The checks that apply to every platform — testing the emergency stop, clearing the area, battery handling — are on [Operational Safety](/guides/operational-safety), and you should read that first.

:::danger A quadruped can injure you

The legs carry a heavy body, move fast, and sweep through a volume much larger than
the robot's standing footprint. A quadruped that loses balance goes down with its
full mass, and it can do so without warning.

:::

## Hazards specific to quadrupeds

- **Stay out of the leg envelope.** The legs sweep through a much larger volume than the robot's standing footprint, and they move fast.
- **Watch your hands when powering on or off.** Legs can snap to a default position as the controller takes over or releases.
- **They fall.** Uneven ground, an obstacle mid-step or a lost network link can all put one down. Do not stand where a falling robot lands, and do not try to catch it.
- **Let overheated motors cool.** If the robot suddenly goes limp into damping mode, the motors have overheated and that is protective, not a fault. Holding a locked standing pose for long periods is the most common cause — see [the Go2 FAQ](/robot/quadruped/go2#why-does-the-robot-suddenly-enter-damping-mode).
- **The bigger the platform, the more margin it needs.** The B2 and A2 are industrial machines and substantially heavier than a Go2. Everything above still applies, but a heavier robot hits harder, falls harder and takes longer to stop — treat clearances generously.

## Where you can operate

Beyond the [general environmental limits](/guides/operational-safety#where-you-can-operate), these ratings apply:

**Assume a quadruped is not waterproof, and never submerge one.** Two things are worth knowing beyond that:

| Platform | |
| --- | --- |
| B2 | IP67 **when properly sealed** — reaching the side ports means opening protective covers, which compromises the seal while you are operating |
| Go2, As2, A2 | Ingress ratings differ between models and variants, and the manufacturer revises them. Check the current figure for the platform and variant you have before deploying it anywhere wet |

An ingress rating assumes covers are closed and seals intact, so it describes the robot you maintain rather than the one on the datasheet.

**Gratings and loose surfaces trap feet.** Loose gravel, deep pile carpet, gratings and wet tiles all reduce traction or catch a foot mid-step.

## While you are developing

This is when most damage happens — not during normal operation, but while someone is testing code that has never run before.

**Raise the robot off the ground.** Put the robot on a stable stool or bench so its feet hang clear. A bad motion command then costs you nothing.

**Use a wired connection for anything touching low-level control.** WiFi is fine for high-level work — logging in, editing code, pulling packages, reading topics — and for internet access.

It is not fine for joint-level or balance control. WiFi introduces latency spikes and occasional dropouts, and a control loop that misses its deadline does not degrade gracefully: the robot can lose balance and fall, taking the joints and any mounted payload with it. A wired link to the robot's internal network does not have that failure mode.

**Start slow and low.** Reduced speed and reduced torque for the first run of any new motion code. Bring it up once you have watched it behave.

**Test your limits before you trust them.** Joint limits, speed caps and workspace boundaries should be verified with the robot raised, not discovered when it hits something.

## If it has fallen and will not respond

1. If a `Recover From Fall` command exists and it is safe to use, try it first.
2. Otherwise, screenshot any warnings or errors in the mobile app — these are the most useful thing you can send us.
3. Power the robot off.
4. Carry it to flat, level ground.
5. Inspect for damage, particularly loose or damaged wiring.
6. If it will not power on or start up, [contact support](/support/before-you-contact-us).

For everything else that can go wrong, see [If something goes wrong](/guides/operational-safety#if-something-goes-wrong).

## Support

- [Operational Safety](/guides/operational-safety) — the checks that apply to every platform
- [Robot Maintenance](/guides/robot-maintenance) — routine checks, batteries and storage
- [Before you contact us](/support/before-you-contact-us) — what to collect, and the commands to collect it
