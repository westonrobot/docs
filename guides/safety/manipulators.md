---
sidebar_position: 4
description: "Safety for manipulators: working envelope, reach, mounting, brake behaviour on power loss, and end effectors."
tags: [safety, manipulator]
---

# Manipulator Safety

WR65, WRL63, xArm, Z1, Piper, Nero, Kinova Gen3 Lite — see [Manipulators](/robot/intro#manipulators).

What is specific to arms. The checks that apply to every robot we supply — testing the emergency stop, clearing the area, battery handling — are on [Operational Safety](/guides/operational-safety), and you should read that first.

:::danger An arm does not know you are there

An arm moving under program control is a crush hazard, and it sweeps a larger
volume than it looks. Not every joint holds position when power is removed.

:::

## Hazards specific to manipulators

- **Stay out of the working envelope while it is powered.** An arm moving under program control is a crush hazard, and it does not know you are there.
- **The reach is larger than it looks.** The [WRL63](/robot/manipulator/wrl63) sweeps a 900 mm radius — check what is inside that sphere, including your monitor, before the first move.
- **Mount to structure, not to a panel.** The arm applies real reaction forces to its base, and more of them the further it reaches. A base that flexes turns into a base that walks.
- **Find out what happens when power is removed, for the arm you have.** Not every joint necessarily holds position, and the behaviour differs between arms — the figures below are one worked example, not the rule. Realman list mechanical brakes on **J1–J3** for the RM65 (our [WR65](/robot/manipulator/wr65)) and **J1–J4** for the RML63 (our [WRL63](/robot/manipulator/wrl63)) — confirm the behaviour of the remaining joints, and of whatever else you have fitted, before you assume the arm will stay where it is. Support the arm and the payload before cutting power.
- **Account for the end effector.** A gripper, camera or tool changes the reach, the mass, the pinch points and the moment on the base. Re-check your limits after fitting one.
- **Reduced speed for teaching and first runs.** Then raise it.

## Where you can operate

Assume the arm is not waterproof unless yours was specifically customised. Keep process debris — swarf, dust, adhesive — away from the joint seals, and give it ventilation.

## While you are developing

**Clear the working envelope before the first move.** Everything inside the reach sphere, including anything on the bench behind the arm.

**Use a wired connection for anything touching low-level control.** WiFi latency spikes and dropouts stall a control loop, and an arm that misses its deadline does not degrade gracefully.

**Test your limits before you trust them.** Joint limits, speed caps and workspace boundaries should be verified with the arm clear, not discovered when it hits something.

**Never leave a powered arm unattended.**

## Support

- [Operational Safety](/guides/operational-safety) — the checks that apply to every platform
- [Manipulator maintenance](/guides/maintenance/manipulators) — mounting, cabling and repeatability
- [Before you contact us](/support/before-you-contact-us) — what to collect, and the commands to collect it
