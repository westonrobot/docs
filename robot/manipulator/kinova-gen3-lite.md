---
sidebar_position: 7
description: "Kinova Gen3 Lite manipulator: setup, control interface, resources and support."
---

# Kinova Gen3 Lite

<Split ratio="wide-narrow">

<div>

The Gen3 Lite is Kinova's lightweight 6-DOF manipulator, aimed at education, research and light industrial work. It runs Kinova's KORTEX software stack and is reached over Ethernet, USB or WiFi.

This page does not repeat or replace Kinova's documentation. It highlights the information you reach for most often, and supplements it with what we have learned from supplying and supporting these units — configuration, verified values, and our own guides.

Kinova's own documentation:

* [Official product page](https://www.kinovarobotics.com/product/gen3-lite-robots)
* [Official documentation](https://www.kinovarobotics.com/product/gen3-lite-robots)

</div>

<Figure
  src={require('../img/kinova/kinova-gen3-lite.jpg').default}
  alt="Kinova Gen3 Lite six-axis lightweight robot arm"
  size="hero" />

</Split>

## Getting started

Read [Operational Safety](/tutorial/operational-safety) before powering the arm for the first time. A manipulator moving under program control is a crush hazard — keep clear of the working envelope until you have tested your motion limits.

Bring-up in outline:

1. **Mount the arm** on a rigid surface that can take the reaction forces.
2. **Connect 24 V power** (18–30 V DC) and a network link.
3. **Reach the arm** through the KORTEX web interface to confirm it is alive.
4. **Move to the API** — C++ or Python via KORTEX, or one of the ROS integrations.

Kinova's [quick start guide](https://www.kinovarobotics.com/resource/gen3-lite-quick-start-guide) is the shortest path, and Kinova's [KORTEX how-to series](https://www.youtube.com/watch?v=zQewb08M4sA&list=PLz1XwEYRuku5rZjJWBr6SDi93jgWZ4FHL) walks through the software.

## Key information

A quick reference for the things you reach for most often, collected so you can find them with the robot in front of you. Values are as configured on the units we supply.

### Related resources

Files and repositories you clone or download to work with the arm.

Kinova maintain their own documentation and revise it on their schedule — the links below go to their resource pages so you always get the current revision rather than a copy of ours.

| Resource | What it is | Where |
| --- | --- | --- |
| User guide | Full manual | [Gen3 lite user guide](https://www.kinovarobotics.com/resource/gen3-lite-user-guide) |
| Start guide | The shortest path to first motion | [Quick start guide](https://www.kinovarobotics.com/resource/gen3-lite-quick-start-guide) |
| Firmware release notes | What changed, and update procedure | [Release notes](https://artifactory.kinovaapps.com/artifactory/generic-documentation-public/Documentation/Gen3%20lite/Technical%20documentation/Release%20Notes/) |
| CAD model | STEP file for mechanical design | [CAD & drawings](https://artifactory.kinovaapps.com/artifactory/generic-documentation-public/Documentation/Gen3%20lite/CAD%20%26%20Drawings/) |
| Specifications | Dimensions, payload, reach and ratings | [Product specifications](https://artifactory.kinovaapps.com/artifactory/generic-documentation-public/Documentation/Gen3%20lite/Technical%20documentation/Product%20specifications/) |
| Robot model | URDF / XACRO for simulation | [kortex_description](https://github.com/Kinovarobotics/ros_kortex/tree/kinetic-devel/kortex_description/arms/gen3_lite/6dof/urdf) |
| C++ / Python API | Primary development interface | [Kinova KORTEX API](https://github.com/Kinovarobotics/Kinova-kortex2_Gen3_G3L/) |
| ROS 1 | ROS integration | [ros_kortex](https://github.com/kinovarobotics/ros_kortex) |
| ROS 2 | ROS 2 integration | [ros2_kortex](https://github.com/Kinovarobotics/ros2_kortex) |
| MATLAB | MATLAB interface | [matlab_kortex](https://github.com/Kinovarobotics/matlab_kortex) |
| Video tutorials | Kinova's KORTEX how-to series | [YouTube playlist](https://www.youtube.com/watch?v=zQewb08M4sA&list=PLz1XwEYRuku5rZjJWBr6SDi93jgWZ4FHL) |

Installing Weston Robot packages on your host? Add our package repository first: [Weston Robot Apt Source](/tutorial/installation/apt_source).

Reach, payload, repeatability, joint ranges and power figures are on the [official product page](https://www.kinovarobotics.com/product/gen3-lite-robots) rather than copied here.

### Control interface

The arm runs **KORTEX**, Kinova's own stack, and is reached over Ethernet, USB or WiFi. Control is available at two levels: high-level Cartesian and joint position or velocity commands, and low-level position, velocity and current control at 1 kHz.

As with any arm, use a wired link for low-level control. WiFi is convenient for the web interface and high-level commands, but a dropout during a 1 kHz control loop is not something the arm can ride out.

The tool flange speaks **Modbus RTU over RS485** for end effectors — check the user guide for the pin assignment before wiring a gripper.

## Troubleshooting & FAQ

## Support

Collect the serial number, firmware version and logs before raising a ticket — [Before you contact us](/support/before-you-contact-us) lists what helps and includes the commands to gather it.

[Submit a support request](https://forms.office.com/r/qELKzYF33W).
