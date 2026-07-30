---
sidebar_position: 3
description: "UFactory xArm manipulator: setup, control interface, resources and support."
---

# xArm

<Split ratio="wide-narrow">

<div>

The xArm is UFactory's industrial manipulator family, available in 5, 6 and 7 degree-of-freedom variants. It is controlled over Ethernet and supplied as a development platform for machine tending, laboratory automation and light industrial work.

This page does not repeat or replace UFactory's documentation. It highlights the information you reach for most often, and supplements it with what we have learned from supplying and supporting these units — configuration, verified values, and our own guides.

UFactory's own documentation:

* [Official product page](https://www.ufactory.cc/xarm-collaborative-robot/)
* [Official documentation](https://docs.ufactory.cc/)

</div>

<Figure
  src={require('../img/ufactory/xarm.png').default}
  alt="UFactory xArm 6 six-axis manipulator on its base"
  size="hero"
  caption="xArm 6 shown." />

</Split>

## Getting started

Read [Operational Safety](/tutorial/operational-safety) before powering the arm for the first time. A manipulator moving under program control is a crush hazard — keep clear of the working envelope until you have tested your motion limits.

Bring-up in outline:

1. **Mount the arm** on a rigid surface that can take the reaction forces.
2. **Connect power and Ethernet** to the control box.
3. **Reach the controller** from UFactory Studio or one of the SDKs.
4. **Set your motion and speed limits** before running anything at full speed.

UFactory's [documentation](https://docs.ufactory.cc/) covers each step in detail. We do not publish an xArm bring-up guide of our own.

## Key information

A quick reference for the things you reach for most often, collected so you can find them with the robot in front of you. Values are as configured on the units we supply.

### Related resources

Files and repositories you clone or download to work with the arm.

| Resource | What it is | Where |
| --- | --- | --- |
| Manuals, software, 3D models | UFactory's download hub | [Download page](https://www.ufactory.cc/download) |
| Python SDK | Primary development interface | [xArm-Python-SDK](https://github.com/xArm-Developer/xArm-Python-SDK) |
| C++ SDK | Same interface in C++ | [xArm-CPLUS-SDK](https://github.com/xArm-Developer/xArm-CPLUS-SDK) |
| ROS package | ROS 1 integration | [xarm_ros](https://github.com/xArm-Developer/xarm_ros) |
| ROS 2 package | ROS 2 integration | [xarm_ros2](https://github.com/xArm-Developer/xarm_ros2) |

Installing Weston Robot packages on your host? Add our package repository first: [Weston Robot Apt Source](/tutorial/installation/apt_source).

Reach, payload, repeatability, joint limits and power figures differ between the xArm 5, 6 and 7 and are published on UFactory's [download page](https://www.ufactory.cc/download) rather than copied here.

### Control interface

The arm is reached over **Ethernet**. End effectors are driven over **Modbus RTU (RS485)**, with digital, analogue and RS485 I/O available at the tool flange — check the variant's manual for the exact pin assignment before wiring a gripper.

Confirm which variant you have before writing motion code: the xArm 5, 6 and 7 differ in degrees of freedom, payload and joint limits, so a trajectory valid on one may be unreachable on another.

## Troubleshooting & FAQ

For fault and alarm codes, see [Fault codes](/support/fault-codes). General questions are answered on the [Support FAQ](/support/faq).

## Support

Collect the serial number, firmware version and logs before raising a ticket — [Before you contact us](/support/before-you-contact-us) lists what helps and includes the commands to gather it.

- [Support centre](/support/intro) — all support resources
- [Identify your product](/support/identify-your-product) — where to find the serial number
- [Warranty and RMA](/support/warranty-and-rma) — repairs, replacements and returns
