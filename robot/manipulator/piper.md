---
sidebar_position: 5
description: "AgileX PiPER 6-DOF manipulator: setup, CAN control, resources and support."
---

# PiPER

<Split ratio="wide-narrow">

<div>

PiPER is AgileX's lightweight 6-DOF manipulator, aimed at research and light automation where weight and cost matter more than payload. It is driven over CAN, which makes it straightforward to mount on a mobile base alongside a UGV.

This page does not repeat or replace AgileX's documentation. It highlights the information you reach for most often, and supplements it with what we have learned from supplying and supporting these units — configuration, verified values, and our own guides.

AgileX's own documentation:

* [Official product page](https://global.agilex.ai/products/piper)
* [Official documentation](https://global.agilex.ai/products/piper)

</div>

<Figure
  src={require('../img/agilex/piper.png').default}
  alt="AgileX PiPER six-axis lightweight robot arm"
  size="hero" />

</Split>

## Getting started

Read [Operational Safety](/tutorial/operational-safety) before powering the arm for the first time. A manipulator moving under program control is a crush hazard — keep clear of the working envelope until you have tested your motion limits.

Bring-up in outline:

1. **Mount the arm** on a rigid surface, or on the base it will run on.
2. **Connect power and a CAN interface** to your computer.
3. **Bring up CAN** and confirm the arm responds — the CAN protocol reference under [Related resources](#related-resources) documents the frames.
4. **Drive it from code** using `piper_sdk`, or from the Windows application for a first check.

The quick start guide under [Related resources](#related-resources) is the shortest path, and the unboxing and gripper-installation videos below cover the mechanical side.

## Key information

A quick reference for the things you reach for most often, collected so you can find them with the robot in front of you. Values are as configured on the units we supply.

### Related resources

Files and repositories you clone or download to work with the arm.

**Documents we publish** — generated from the file store, so a new revision appears here without this page being edited.

<Downloads product="piper" />

**Everything else** — code repositories, maintained by hand.

| Resource | What it is | Where |
| --- | --- | --- |
| SDK | Primary development interface | [piper_sdk](https://github.com/agilexrobotics/piper_sdk) · [examples](https://github.com/agilexrobotics/piper_sdk_demo) |
| ROS 1 | ROS Noetic integration | [Piper_ros noetic](https://github.com/agilexrobotics/Piper_ros/tree/ros-noetic-no-aloha) |
| ROS 2 | ROS 2 integration | [Humble](https://github.com/agilexrobotics/Piper_ros/tree/ros-humble-no-aloha) · [Foxy](https://github.com/agilexrobotics/Piper_ros/tree/ros-foxy-no-aloha) |
| Simulation | Gazebo, Isaac Sim and MoveIt 2 | [Gazebo / MoveIt 2](https://github.com/agilexrobotics/agilex_open_class/tree/master/piper) · [Isaac Sim](https://github.com/agilexrobotics/piper_isaac_sim) |
| URDF | Robot model | [urdf](https://github.com/agilexrobotics/Piper_ros/tree/ros-noetic-no-aloha/src/piper_description/urdf) |

Installing Weston Robot packages on your host? Add our package repository first: [Weston Robot Apt Source](/tutorial/installation/apt_source).

Reach, payload and repeatability are on the [official product page](https://global.agilex.ai/products/piper) rather than copied here.

### Control interface

The arm is driven over **CAN**, the same interface used by AgileX's UGVs — so if you are already running a Scout Mini or Ranger Mini, the CAN setup in [Robot Base Control](/tutorial/agilex/ugv_base_control) applies here too, on a separate bus.

### Videos

AgileX's own walkthroughs, in Chinese:

- [Unboxing](https://www.bilibili.com/video/BV1KcmKYWE6L/?spm_id_from=333.999.0.0)
- [Return to home position](https://www.bilibili.com/video/BV1wDSDY1EJf/?spm_id_from=333.999.0.0)
- [Gripper installation](https://www.bilibili.com/video/BV1Ab1PYzEvr/?spm_id_from=333.999.0.0)

## Troubleshooting & FAQ

## Support

Collect the serial number, firmware version and logs before raising a ticket — [Before you contact us](/support/before-you-contact-us) lists what helps and includes the commands to gather it.

[Submit a support request](https://forms.office.com/r/qELKzYF33W).
