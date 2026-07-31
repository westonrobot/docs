---
sidebar_position: 2
description: "WRL63 long-reach 6-DOF manipulator, the Weston Robot designation for Realman's RML63: setup, SDK, manuals and support."
---

# WRL63

<Split ratio="wide-narrow">

<div>

The WRL63 is a long-reach 6-DOF manipulator, built for work that needs to cover a wide area from a single mounting point — machine tending across several stations, large-format inspection, and mobile manipulation where the base cannot be repositioned mid-task.

The WRL63 is **Weston Robot's designation for Realman's RML63**. It is the same arm: Realman make the hardware and its firmware, and we supply, integrate and support it, with our own SDK and ROS packages layered on Realman's control interface. If you are cross-referencing a datasheet or a spare part, look for the RML63.

This page does not repeat or replace Realman's documentation. It highlights the information you reach for most often, and supplements it with what we have learned from supplying and supporting these units — configuration, verified values, and our own guides.

Realman's own documentation:

* [Official product page](https://www.realman-robotics.com/en/products/rml63.html)
* [Official documentation](https://develop.realman-robotics.com/en/robot/summarize/)

</div>

<Figure
  src={require('../img/realman/wrl63.png').default}
  alt="WRL63 long-reach six-axis manipulator with its arm extended"
  size="hero" />

</Split>

## Getting started

Read [Operational Safety](/tutorial/operational-safety) before powering the arm for the first time. A manipulator moving under program control is a crush hazard — keep clear of the working envelope until you have tested your motion limits. The WRL63's reach makes this envelope considerably larger than you may expect; check what is inside it before the first move.

Bring-up in outline:

1. **Mount the arm** on a rigid surface that can take the reaction forces. The extra reach means a longer moment arm, so mounting stiffness matters more here than on the [WR65](/robot/manipulator/wr65).
2. **Connect power and the control link**, following the manual for your revision.
3. **Confirm the arm responds** before writing any motion code.
4. **Move to the SDK** — `wr_arm_sdk`, or the ROS packages if you are integrating into an existing stack.

The [SDK manual](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EZ16f6SHNoxNvpkJ8o1ijTMBhU4XZkE8KfvYXObn9SeuCA?e=ZVbTYn) covers the software side in detail.

## Key information

A quick reference for the things you reach for most often. Values are as configured on the units we supply.

### Related resources

Files and repositories you clone or download to work with the arm. The manuals below are the ones we ship with the arm and are the ones to work from.

| Resource | What it is | Where |
| --- | --- | --- |
| Manual | Full product manual | [EN](https://tangrobot.sharepoint.com/:f:/s/Public-Outgoing/Eki4t2rSYfZJj0C1oM8muAYBSaEVZZLccVLizd3KZ0QOnA?e=fCpuuF) · [CN](https://tangrobot.sharepoint.com/:f:/s/Public-Outgoing/EsX7ahL2QwlJpUZvi-B5peIBLllti9KVbqd4ZK0kSwMKsg?e=bAlbLE) |
| SDK manual | Using `wr_arm_sdk` | [SDK Manual](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EZ16f6SHNoxNvpkJ8o1ijTMBhU4XZkE8KfvYXObn9SeuCA?e=ZVbTYn) |
| ROS manuals | ROS 1 and ROS 2 integration | [ROS 1](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/ET4USOMo1wBJo1MX9l_mMJEBZ_7MkDZKw51P5VzWy0ydeA?e=DL1nBT) · [ROS 2](https://tangrobot.sharepoint.com/:f:/s/Public-Outgoing/EkJTVQwtYqpJohPR-o-jFrABCfdmQFwSOrEVZ-JEdJPDcg?e=Wcc9cQ) |
| JSON protocol | The wire protocol, if you are not using the SDK | [Protocol Manual](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EZ7t0oc9qnBDpLFsvta_lS4BvWJMEUFE7YfafvXfA6m0Bw?e=UxWjki) |
| API examples | Worked samples against the Realman API | [RM API samples](https://tangrobot.sharepoint.com/:f:/s/Public-Outgoing/EiDbCkGaSA5CgOpQ8tcnw1IBrzKiorH_cXctCj9KcP5dmA?e=OZItiH) |
| C++ SDK | Primary development interface | [wr_arm_sdk](https://github.com/westonrobot/wr_arm_sdk) |
| ROS package | ROS 1 integration | [wrl63b_ros](https://github.com/westonrobot/wrl63b_ros) |
| ROS 2 package | ROS 2 integration | [wr_arm_ros2](https://github.com/westonrobot/wr_arm_ros2) |

Installing Weston Robot packages on your host? Add our package repository first: [Weston Robot Apt Source](/tutorial/installation/apt_source).

CAD models, end effectors and Realman's own tooling are on the official pages linked at the top of this page.

### Variants

The suffix on your unit tells you whether it has force sensing, which is what you need for contact tasks such as assembly, insertion or polishing.

| Ours | Realman's | Force sensing |
| --- | --- | --- |
| WRL63-B | RML63 Standard | None |
| WRL63-ZF | RML63 with single-axis force | Single axis |
| WRL63-6F | RML63 Six-Axis Force | Six-axis force/torque |

:::caution Confirm reach and force figures against your own unit

Realman have revised the RML63 since our manuals were written, and the line-up has moved
on: they currently publish **two** variants (Standard and Six-Axis Force) rather than three,
and their figures for the force-sensing variant differ from ours — 917 mm reach and
±0.5 % FS sensor accuracy against the 928.5 mm and < 0.1 % FS in our 2023 documentation.

Reach and force-sensor accuracy are the two values to confirm from the manual supplied with
your arm, or from [Realman's current page](https://www.realman-robotics.com/en/products/rml63.html),
before you rely on them. The figures below are the ones that are consistent across both.

:::

### Key specifications

| | |
| --- | --- |
| Degrees of freedom | 6 |
| Payload | 3 kg |
| Repeatability | ±0.05 mm |
| Body weight | 10.0 kg (`-B`) · 10.1 kg (force-sensing variants) |
| Working radius | 900 mm (`-B`) — see the caution above for the others |
| Power supply | DC 20–30 V, rated 24 V |
| Power consumption | ≤ 200 W maximum, ≤ 100 W comprehensive |
| Protection level | IP54 (arm body) |
| Materials | Aluminium alloy |
| Controller | Integrated |
| Communication | WiFi · network interface · Bluetooth · USB serial · RS485 |
| Control modes | Drag-and-drop teaching · teaching pendant · API · JSON |

Note the trade against the [WR65](/robot/manipulator/wr65): half again the reach, but **3 kg payload rather than 5 kg** and 10 kg of arm rather than 7.2 kg. Both matter when you are sizing a mobile base.

#### Joint limits and speeds

From our manual, and identical across the variants. Worth having in front of you when you
are planning trajectories — note that **J3 is asymmetric**, unlike every other joint.

| Joint | Motion range | Maximum speed |
| --- | --- | --- |
| J1 | ±178° | 180°/s |
| J2 | ±178° | 180°/s |
| J3 | +145° to −178° | 225°/s |
| J4 | ±178° | 225°/s |
| J5 | ±178° | 225°/s |
| J6 | ±360° | 225°/s |

### Control interface

The arm is driven through `wr_arm_sdk`, or directly over its **JSON protocol** if you are integrating from a language or environment the SDK does not cover — the [protocol manual](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EZ7t0oc9qnBDpLFsvta_lS4BvWJMEUFE7YfafvXfA6m0Bw?e=UxWjki) documents the messages.

`wr_arm_sdk` and `wr_arm_ros2` are shared across the arm range; the ROS 1 package is per-model, so use `wrl63b_ros` for the WRL63 specifically.

Because the arm is a Realman RML63 underneath, Realman's own API samples and documentation apply to it. Where their material and ours disagree on software, ours describes the units as we supply them.

The WRL63 is the **long-reach** member of the range. If reach matters less than mass and payload, see the [WR65](/robot/manipulator/wr65).

## Troubleshooting & FAQ

## Support

Collect the serial number, firmware version and logs before raising a ticket — [Before you contact us](/support/before-you-contact-us) lists what helps and includes the commands to gather it.

- [Support centre](/support/intro) — all support resources
- [Warranty and RMA](/support/warranty-and-rma) — repairs, replacements and returns
