---
sidebar_position: 2
description: "Weston Robot WRL63 6-DOF manipulator: setup, control interface, manuals and support."
---

# WRL63

The WRL63 is Weston Robot's ultra-long 6-DOF manipulator, built for applications that need reach across a wide working area — automotive parts, 3C electronics, metal processing, food packaging, medical and retail.

:::info We manufacture the WRL63

There is no third-party vendor page to defer to — Weston Robot is the source for this
product. The manuals linked below are the authoritative reference, and this page is
the entry point to them.

**Specifications are not yet published here.** Reach, payload, repeatability, mounting
pattern and tool-flange I/O currently live only in the manual. They belong on this
page, and filling them in is tracked work.

:::

## Getting started

Read [Operational Safety](/tutorial/operational-safety) before powering the arm for the first time. A manipulator moving under program control is a crush hazard — keep clear of the working envelope until you have tested your motion limits.

Bring-up in outline:

1. **Mount the arm** on a rigid surface that can take the reaction forces.
2. **Connect power and the control link**, following the manual for your revision.
3. **Confirm the arm responds** before writing any motion code.
4. **Move to the SDK** — `wr_arm_sdk`, or the ROS packages if you are integrating into an existing stack.

The [SDK manual](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EZ16f6SHNoxNvpkJ8o1ijTMBhU4XZkE8KfvYXObn9SeuCA?e=ZVbTYn) covers the software side in detail.

## Key information

A quick reference for the things you reach for most often. Values are as configured on the units we supply.

### Related resources

Files and repositories you clone or download to work with the arm.

| Resource | What it is | Where |
| --- | --- | --- |
| Manual | Full product manual | [EN](https://tangrobot.sharepoint.com/:f:/s/Public-Outgoing/Eki4t2rSYfZJj0C1oM8muAYBSaEVZZLccVLizd3KZ0QOnA?e=fCpuuF) · [CN](https://tangrobot.sharepoint.com/:f:/s/Public-Outgoing/EsX7ahL2QwlJpUZvi-B5peIBLllti9KVbqd4ZK0kSwMKsg?e=bAlbLE) |
| SDK manual | Using `wr_arm_sdk` | [SDK Manual](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EZ16f6SHNoxNvpkJ8o1ijTMBhU4XZkE8KfvYXObn9SeuCA?e=ZVbTYn) |
| ROS manuals | ROS 1 and ROS 2 integration | [ROS 1](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/ET4USOMo1wBJo1MX9l_mMJEBZ_7MkDZKw51P5VzWy0ydeA?e=DL1nBT) · [ROS 2](https://tangrobot.sharepoint.com/:f:/s/Public-Outgoing/EkJTVQwtYqpJohPR-o-jFrABCfdmQFwSOrEVZ-JEdJPDcg?e=Wcc9cQ) |
| JSON protocol | The wire protocol, if you are not using the SDK | [Protocol Manual](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EZ7t0oc9qnBDpLFsvta_lS4BvWJMEUFE7YfafvXfA6m0Bw?e=UxWjki) |
| API examples | Worked samples | [RM API samples](https://tangrobot.sharepoint.com/:f:/s/Public-Outgoing/EiDbCkGaSA5CgOpQ8tcnw1IBrzKiorH_cXctCj9KcP5dmA?e=OZItiH) |
| C++ SDK | Primary development interface | [wr_arm_sdk](https://github.com/westonrobot/wr_arm_sdk) |
| ROS package | ROS 1 integration | [wrl63b_ros](https://github.com/westonrobot/wrl63b_ros) |
| ROS 2 package | ROS 2 integration | [wr_arm_ros2](https://github.com/westonrobot/wr_arm_ros2) |

Installing Weston Robot packages on your host? Add our package repository first: [Weston Robot Apt Source](/tutorial/installation/apt_source).

### Control interface

The arm is driven through `wr_arm_sdk`, or directly over its **JSON protocol** if you are integrating from a language or environment the SDK does not cover — the [protocol manual](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EZ7t0oc9qnBDpLFsvta_lS4BvWJMEUFE7YfafvXfA6m0Bw?e=UxWjki) documents the messages.

`wr_arm_sdk` and `wr_arm_ros2` are shared across the arm range; the ROS 1 package is per-model, so use `wrl63b_ros` for the WRL63 specifically.

The WRL63 is the **ultra-long** member of the range. If reach matters less than mass, see the [WR65](/robot/manipulator/wr65).

## Troubleshooting & FAQ

For fault and alarm codes, see [Fault codes](/support/fault-codes). General questions are answered on the [Support FAQ](/support/faq).

## Support

Collect the serial number, firmware version and logs before raising a ticket — [Before you contact us](/support/before-you-contact-us) lists what helps and includes the commands to gather it.

- [Support centre](/support/intro) — all support resources
- [Identify your product](/support/identify-your-product) — where to find the serial number
- [Warranty and RMA](/support/warranty-and-rma) — repairs, replacements and returns
