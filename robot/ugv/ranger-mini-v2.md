---
sidebar_position: 2
description: "AgileX Ranger Mini 2.0 UGV: setup, CAN control, firmware, calibration and support."
---

# Ranger Mini 2.0

<Split ratio="wide-narrow">

<div>

The Ranger Mini 2.0 is AgileX's compact four-wheel swerve-drive UGV — every wheel steers, so it can crab sideways and rotate about its own centre. We supply it as a development platform, driven over CAN from compute you fit yourself or an external machine.

This page does not repeat or replace AgileX's documentation. It highlights the information you reach for most often, and supplements it with what we have learned from supplying and supporting these units — configuration, verified values, and our own guides.

AgileX's own documentation:

* [Official product page](https://global.agilex.ai/products/ranger-mini)
* [Official documentation](https://global.agilex.ai/products/ranger-mini)

</div>

<Figure
  src={require('../img/agilex/ranger_mini_v2.png').default}
  alt="AgileX Ranger Mini 2.0 four-wheel swerve drive UGV"
  size="hero" />

</Split>

## Getting started

Read [Operational Safety](/tutorial/operational-safety) before driving the robot for the first time.

The Ranger Mini has no onboard computer of its own — you supply the compute and talk to the base over CAN. Bring-up in outline:

1. **Charge and power on**, and check the base responds to the supplied controller.
2. **Calibrate the steering** if the wheels are not aligned — see [Steering Calibration](/tutorial/agilex/ranger_mini_calibration).
3. **Wire a CAN interface** between your computer and the robot.
4. **Drive it from code** using `ugv_sdk` or the ROS packages.

Steps 3 and 4 are covered end to end in **[Robot Base Control](/tutorial/agilex/ugv_base_control)**.

Looking to add compute, sensors or power distribution? See [Peripherals](/peripheral/intro), or the [UGV Development Kit](/system/intro) for a pre-integrated build.

## Key information

A quick reference for the things you reach for most often, collected so you can find them with the robot in front of you. Values are as configured on the units we supply.

### Related resources

Files and repositories you clone or download to work with the robot.

| Resource | What it is | Where |
| --- | --- | --- |
| Manual | Ranger Mini 2.0 user manual | [EN](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/Eagd2Vrmnw9IiTzl4HaXjEwBuQJJ1unetL-IEpGHdBejag?e=YY4be5) · [CN](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EdlhLdKQBDlKlYL35YiVYDwBqyHDFgfliUiPDEmwy0WACA?e=TnIw9y) |
| CAD model | STEP file for mechanical design | [Ranger Mini 2.0 STEP](https://tangrobot.sharepoint.com/:u:/s/Public-Outgoing/Efcf9NZa15JGkcNRaEoGLNsBfNuwNNzcgjNtEsDMMHAM4A?e=YcQ9AB) |
| C++ SDK | Primary development interface | [ugv_sdk](https://github.com/westonrobot/ugv_sdk) |
| ROS package | ROS 1 integration | [ranger_ros](https://github.com/westonrobot/ranger_ros) |
| ROS 2 package | ROS 2 integration | [ranger_ros2](https://github.com/westonrobot/ranger_ros2) |

Installing Weston Robot packages on your host? Add our package repository first: [Weston Robot Apt Source](/tutorial/installation/apt_source).

Dimensions, payload, speed and battery figures are on the [official product page](https://global.agilex.ai/products/ranger-mini) rather than copied here.

### Firmware

Which build you are running changes what the robot can do, so check before troubleshooting.

| Version | What is different |
| --- | --- |
| [V5.9.1](https://tangrobot.sharepoint.com/:u:/s/Public-Outgoing/EasKzBaC07dIrhxGs9_4_WEBY-2gf81qeoZFdDFCFB0Ibw?e=CFUJ6T) | E-stop parks the wheels |
| [V5.8.7](https://tangrobot.sharepoint.com/:u:/s/Public-Outgoing/ESydg3zKcnhHizjnudyNDcgBiSuX7mgCCOMeiZ4ncy_faQ?e=2Up90z) | **No** autocalibration — use [manual calibration](/tutorial/agilex/ranger_mini_calibration#manual-calibration) |
| [V5.8.3](https://tangrobot.sharepoint.com/:u:/s/Public-Outgoing/EXvKUHspMMZCvaDj1uvucD8BVPiIHzmzNm1JJ2N29_58_g?e=tWXt2J) | Includes autocalibration |

### Control interface

The base is driven over **CAN**. Both `ugv_sdk` and the ROS packages speak to it over the same interface, so bringing up CAN correctly is the prerequisite for everything else — see [Robot Base Control](/tutorial/agilex/ugv_base_control).

Because this is a **swerve-drive** platform, each wheel steers independently and the steering zero has to be established by calibration. A robot that crabs or pulls to one side almost always needs [recalibrating](/tutorial/agilex/ranger_mini_calibration) rather than repairing.

## Guides for this product

| Guide | What it covers | Reach for it when |
| --- | --- | --- |
| [Robot Base Control](/tutorial/agilex/ugv_base_control) | Manual and programmatic control over CAN, including interface setup and troubleshooting | Setting the robot up, or driving it from your own code |
| [Ranger Mini Steering Calibration](/tutorial/agilex/ranger_mini_calibration) | Autocalibration and manual calibration of the steering motors | The robot crabs, pulls to one side, or will not drive straight |

**[All Ranger Mini guides](/tutorial/tags/ranger-mini)** — generated from the `ranger-mini` tag, so anything published later appears there without this page being edited.

## Troubleshooting & FAQ

For fault and alarm codes, see [Fault codes](/support/fault-codes). General questions are answered on the [Support FAQ](/support/faq).

## Support

Collect the serial number, firmware version and logs before raising a ticket — [Before you contact us](/support/before-you-contact-us) lists what helps and includes the commands to gather it.

- [Support centre](/support/intro) — all support resources
- [Identify your product](/support/identify-your-product) — where to find the serial number
- [Warranty and RMA](/support/warranty-and-rma) — repairs, replacements and returns
