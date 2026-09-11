---
sidebar_position: 3
description: "Safety for humanoids: falling radius, supporting the robot during testing, two-person handling, leg envelope and fall recovery."
tags: [safety, humanoid]
---

# Humanoid Safety

G1, H1-2, R1, H2 — see [Humanoids](/robot/intro#humanoids).

What is specific to humanoids. The checks that apply to every robot we supply — testing the emergency stop, clearing the area, battery handling — are on [Operational Safety](/guides/operational-safety), and you should read that first.

:::danger A biped falls further than you expect

A humanoid is less stable than a quadruped and goes down with the reach and force
of something its own height. The [H1-2](/robot/humanoid/h1-2) is 180 cm tall. Keep
the falling radius clear and never try to catch one by hand.

:::

## Hazards specific to humanoids

- **A biped is less stable than a quadruped and falls further.** These platforms differ a lot in size — the [H1-2](/robot/humanoid/h1-2) is 180 cm tall — so scale your clearance to the robot in front of you rather than to the last one you worked with.
- **Support it during early testing.** A gantry, hoist or harness during first motion runs prevents most of the damage people do to these robots. Do not rely on catching it by hand.
- **Keep the falling radius clear** — roughly its standing height in every direction, not just its footprint.
- **Two people for handling.** Moving, mounting or recovering a full-size humanoid is not a one-person job.
- **Stay out of the leg and arm envelope.** The limbs sweep through a much larger volume than the robot's standing footprint, and they move fast.
- **Watch your hands when powering on or off.** Joints can snap to a default position as the controller takes over or releases.
- **Let overheated motors cool.** If the robot suddenly goes limp into damping mode, the motors have overheated and that is protective, not a fault.

## Where you can operate

Assume a humanoid is not waterproof. The [G1](/robot/humanoid/g1) is explicitly not waterproof, and no ingress rating is published for the [H1-2](/robot/humanoid/h1-2), [R1](/robot/humanoid/r1) or [H2](/robot/humanoid/h2) — treat those the same way, and ask us before deploying one anywhere wet.

**Surfaces.** Loose gravel, deep pile carpet, gratings and wet tiles all reduce traction or trap feet.

## While you are developing

This is when most damage happens — not during normal operation, but while someone is testing code that has never run before.

**Raise the robot off the ground.** Put the robot on a stable stool, bench, gantry or harness so its feet hang clear. A bad motion command then costs you nothing.

**Use a wired connection for anything touching low-level control.** WiFi is fine for high-level work — logging in, editing code, pulling packages, reading topics — and for internet access.

It is not fine for joint-level or balance control. WiFi introduces latency spikes and occasional dropouts, and a control loop that misses its deadline does not degrade gracefully: the robot can lose balance and fall, taking the joints and any mounted payload with it. A wired link to the robot's internal network does not have that failure mode.

For putting a robot on WiFi for internet access, see the [G1 Internet Connection Guide](/guides/unitree/g1_internet_guide).

**Start slow and low.** Reduced speed and reduced torque for the first run of any new motion code. Bring it up once you have watched it behave.

**Test your limits before you trust them.** Joint limits, speed caps and workspace boundaries should be verified with the robot supported, not discovered when it hits something.

## If it has fallen and will not respond

1. If a `Recover From Fall` command exists and it is safe to use, try it first.
2. Otherwise, screenshot any warnings or errors in the mobile app — these are the most useful thing you can send us.
3. Power the robot off.
4. Move it to flat, level ground. This is a two-person job on a full-size humanoid.
5. Inspect for damage, particularly loose or damaged wiring.
6. If it will not power on or start up, [contact support](/support/before-you-contact-us).

## Support

- [Operational Safety](/guides/operational-safety) — the checks that apply to every platform
- [Humanoid maintenance](/guides/maintenance/humanoids) — joints, foot pads and post-fall inspection
- [Before you contact us](/support/before-you-contact-us) — what to collect, and the commands to collect it
