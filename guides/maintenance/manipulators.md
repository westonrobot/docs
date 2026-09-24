---
sidebar_position: 4
description: "Maintenance for manipulators: base mounting, end effector cabling, joint cable routing and repeatability drift."
tags: [maintenance, manipulator]
---

# Manipulator Maintenance

WR65, WRL63, xArm, Z1, Piper, Nero, Kinova Gen3 Lite — see [Manipulators](/robot/intro#manipulators).

What is specific to arms. Routine checks, battery care, cleaning and storage apply to every platform and are on [Robot Maintenance](/guides/robot-maintenance).

- **Check the base mounting bolts.** An arm applies real reaction forces to its base and they cycle constantly, which is exactly the condition that loosens fasteners. A base that has begun to move ruins repeatability before it becomes obviously loose.
- **Check the end effector mounting and its cabling.** Tool-side cables flex every cycle and fail before anything else does.
- **Watch the cable routing through the joints.** Cables that have been re-routed during integration can chafe over thousands of cycles.
- **Confirm repeatability** if positioning accuracy has drifted: run a known pose and compare. Drift usually means a mechanical problem, not a software one.
- **Keep the arm clean of process debris** — swarf, dust and adhesive around joint seals.
- **Support the arm before removing power** if it is extended or carrying a payload, since not every joint necessarily brakes. See [Manipulator safety](/guides/safety/manipulators).

## Support

- [Robot Maintenance](/guides/robot-maintenance) — routine checks, batteries, cleaning and storage
- [Manipulator safety](/guides/safety/manipulators) — working envelope, reach and brake behaviour
- [Before you contact us](/support/before-you-contact-us) — what to collect, and the commands to collect it
