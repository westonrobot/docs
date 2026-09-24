---
sidebar_position: 1
description: "Task guides for setting up, developing with and diagnosing Weston Robot platforms."
---

# Guides

Task guides that go beyond what a product page covers. A product page tells you what a robot is and how it is wired; these tell you how to do something with it.

Every guide is tagged with the models it applies to, so you can start from the robot in front of you rather than from our filing system.

## Start from your robot

| Robot | Guides |
| --- | --- |
| Unitree G1 | [all G1 guides](/guides/tags/g1) |
| Unitree Go2 / Go2-W | [all Go2 guides](/guides/tags/go2) |
| Unitree B2 | [all B2 guides](/guides/tags/b2) |
| AgileX Scout Mini | [all Scout Mini guides](/guides/tags/scout-mini) |
| AgileX Ranger Mini | [all Ranger Mini guides](/guides/tags/ranger-mini) |

## Start from the task

| I want to… | Guides |
| --- | --- |
| work out why something is wrong | [Diagnostics](/guides/tags/diagnostics) |
| get the robot on the network | [Networking](/guides/tags/networking) |
| write software against it | [Development](/guides/tags/development) |
| map and move autonomously | [SLAM](/guides/tags/slam) · [Navigation](/guides/tags/navigation) |
| capture a site as a 3D point cloud | [Scanning](/guides/tags/scanning) |
| talk to the base over CAN | [CAN bus](/guides/tags/can-bus) |
| calibrate steering or joints | [Calibration](/guides/tags/calibration) |
| install our packages | [Installation](/guides/tags/installation) |
| operate safely, or maintain the robot | [Safety](/guides/tags/safety) · [Maintenance](/guides/tags/maintenance) |

[Browse all tags](/guides/tags)

## All guides

### Before you operate

* [Operational Safety](/guides/operational-safety) — read this before running any platform
* [Robot Maintenance](/guides/robot-maintenance)

### Software setup

* [Weston Robot Apt Source](/guides/installation/apt_source) — add our package repository before installing anything else

### AgileX UGVs

* [Robot Base Control](/guides/agilex/ugv_base_control) — manual and programmatic control over CAN
* [Ranger Mini Steering Calibration](/guides/agilex/ranger_mini_calibration) — re-establish the steering zero on a swerve-drive base

### Unitree quadrupeds

* [Go2 Diagnostics Guide](/guides/unitree/go2_diag_guide)
* [Go2 & Go2-W Unitree SLAM Guide](/guides/unitree/go2_slam)
* [B2 Diagnostics Guide](/guides/unitree/b2_diag_guide)

### Unitree humanoids

* [G1 Development Guide](/guides/unitree/g1_dev_guide) — the most detailed guide on this site
* [G1 Diagnostics Guide](/guides/unitree/g1_diag_guide)
* [G1 Internet Connection Guide](/guides/unitree/g1_internet_guide)

### Manifold scanners

* [Manifold Scanner Guides](/guides/manifold) — the whole sequence, and where the Robot Deployment Toolbox takes over
* [Pocket2 Connection Guide](/guides/manifold/connecting) — the scanner's own Wi-Fi, and keeping the link up
* [Pocket2 Scanning Guide](/guides/manifold/scanning) — initialisation, walking a site, and stopping safely
* [Point Cloud Processing & Export Guide](/guides/manifold/processing) — MindCloud Studio, through to the file the [Robot Deployment Toolbox](/solution/robot-deployment-toolbox) reads

---

Looking for a complete deployed capability rather than a single task? See [Solutions](/solution/intro). Something wrong, or need to reach us? See [Support](/support/before-you-contact-us).
