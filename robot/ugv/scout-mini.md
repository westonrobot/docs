---
sidebar_position: 1
description: "AgileX Scout Mini UGV: setup, CAN control, resources and support."
---

# Scout Mini

<Split ratio="wide-narrow">

<div>

The Scout Mini is AgileX's compact four-wheel differential-drive UGV, supplied as a development platform. You drive it over CAN using our SDK or ROS packages, either from an onboard computer you fit yourself or from an external machine.

This page does not repeat or replace AgileX's documentation. It highlights the information you reach for most often, and supplements it with what we have learned from supplying and supporting these units — configuration, verified values, and our own guides.

AgileX's own documentation:

* [Official product page](https://global.agilex.ai/products/scout-mini)
* [Official documentation](https://global.agilex.ai/products/scout-mini)

</div>

<Figure
  src={require('../img/agilex/scout_mini.png').default}
  alt="AgileX Scout Mini four-wheel differential drive UGV"
  size="hero" />

</Split>

## Getting started

Read [Operational Safety](/tutorial/operational-safety) before driving the robot for the first time.

The Scout Mini has no onboard computer of its own — you supply the compute and talk to the base over CAN. Bring-up in outline:

1. **Charge and power on**, and check the base responds to the supplied controller.
2. **Wire a CAN interface** between your computer and the robot.
3. **Bring up the CAN interface** and confirm frames are arriving.
4. **Drive it from code** using `ugv_sdk` or the ROS packages.

Steps 2 to 4 are covered end to end in **[Robot Base Control](/tutorial/agilex/ugv_base_control)**.

Looking to add compute, sensors or power distribution? See [Peripherals](/peripheral/intro), or the [UGV Development Kit](/system/intro) for a pre-integrated build.

## Key information

A quick reference for the things you reach for most often, collected so you can find them with the robot in front of you. Values are as configured on the units we supply.

### Related resources

Files and repositories you clone or download to work with the robot.

| Resource | What it is | Where |
| --- | --- | --- |
| Manual | Scout Mini user manual | [PDF](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/Eaq4LPW9NHFGjSprGPEiaGABftfiJ52k6Z4gkE8ylW1HVQ?e=E01Woq) |
| CAD model | STEP file for mechanical design | [Scout Mini STEP](https://tangrobot.sharepoint.com/:u:/s/Public-Outgoing/EX0iKqBzlbhCkLdpbcUT5pkBc0QDBlHuxJBXbz4__u0Mkg?e=RhxnaX) |
| C++ SDK | Primary development interface | [wrp_sdk](https://github.com/westonrobot/wrp_sdk) |
| ROS package | ROS 1 integration | [scout_ros](https://github.com/westonrobot/scout_ros) |
| ROS 2 package | ROS 2 integration | [scout_ros2](https://github.com/westonrobot/scout_ros2) |

Installing Weston Robot packages on your host? Add our package repository first: [Weston Robot Apt Source](/tutorial/installation/apt_source).

Dimensions, payload, speed, IP rating and battery figures are on the [official product page](https://global.agilex.ai/products/scout-mini) rather than copied here.

### Control interface

The base is driven over **CAN**. Both `wrp_sdk` and the ROS packages speak to it over the same interface, so bringing up CAN correctly is the prerequisite for everything else — see [Robot Base Control](/tutorial/agilex/ugv_base_control).

The Scout Mini ships in standard-wheel and mecanum-wheel variants, which differ in rated load and how much tilt they tolerate. Confirm which you have before planning a payload.

## Guides for this product

| Guide | What it covers | Reach for it when |
| --- | --- | --- |
| [Robot Base Control](/tutorial/agilex/ugv_base_control) | Manual and programmatic control over CAN, including interface setup and troubleshooting | Setting the robot up, or driving it from your own code |

**[All Scout Mini guides](/tutorial/tags/scout-mini)** — generated from the `scout-mini` tag, so anything published later appears there without this page being edited.

## Troubleshooting & FAQ

## Support

Collect the serial number, firmware version and logs before raising a ticket — [Before you contact us](/support/before-you-contact-us) lists what helps and includes the commands to gather it.

- [Support centre](/support/intro) — all support resources
- [Warranty and RMA](/support/warranty-and-rma) — repairs, replacements and returns
