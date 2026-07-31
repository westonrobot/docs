---
sidebar_position: 3
description: "Where to find the serial number and model on each Weston Robot platform."
---

# Identify your product

We ask for the serial number on nearly every support request, because it tells us the exact hardware revision, what firmware shipped with it, and what warranty applies.

:::info Help us finish this page

The Unitree rows below are documented. The remaining rows are marked **TODO** — they need the serial number location confirming, ideally with a photo. If you know one, [edit this page](https://github.com/westonrobot/docs/edit/main/support/identify-your-product.md) or tell support and we will fill it in.

:::

## Unitree platforms

Applies to the [G1](/robot/humanoid/g1), [Go2](/robot/quadruped/go2) and [B2](/robot/quadruped/b2).

Two ways to find it:

1. **On the robot** — the serial number is in the **battery compartment**.
2. **In the mobile app** — the serial number and the model are under `Device → Robot Settings`.

The app route is usually faster, and it gives you the model designation at the same time, which matters because several of these platforms ship in variants (for example Go2 Air, Go2 Pro and Go2 Edu differ in what hardware is fitted).

## AgileX platforms

| Product | Serial number location |
| --- | --- |
| [Scout Mini](/robot/ugv/scout-mini) | **TODO** |
| [Ranger Mini 2.0](/robot/ugv/ranger-mini-v2) | **TODO** |
| [Ranger Mini 3.0](/robot/ugv/ranger-mini-v3) | **TODO** |
| [PiPER](/robot/manipulator/piper) | **TODO** |

## Weston Robot manipulators

| Product | Serial number location |
| --- | --- |
| [WR65](/robot/manipulator/wr65) | **TODO** |
| [WRL63](/robot/manipulator/wrl63) | **TODO** |

## Other manipulators

| Product | Serial number location |
| --- | --- |
| [Unitree Z1](/robot/manipulator/z1) | **TODO** |
| [UFactory xArm](/robot/manipulator/xarm) | **TODO** |
| [Kinova Gen3 Lite](/robot/manipulator/kinova-gen3-lite) | **TODO** |

## Systems and peripherals

| Product | Serial number location |
| --- | --- |
| [UGV Development Kit v1.0](/system/ugv_devkit/v1.0) | **TODO** |
| [UGV Development Kit v1.1](/system/ugv_devkit/v1.1) | **TODO** |
| [Power Regulator v2.X](/peripheral/power/power_regulator_v2) | White label on the **top face**, in the corner beside the logo. Carries the serial number and a QR code |
| Onboard computers | **TODO** |

## Software versions

For a software problem we also need the package versions, not just the hardware serial:

```bash
dpkg -l | grep -i -E 'wr|weston'
```

For a solution such as the [Assisted Driving Toolbox](/solution/adt/intro), give us the major version you are running as well — v1, v2 and v3 differ substantially.

---

Once you have the serial number, see [Before you contact us](/support/before-you-contact-us) for the rest of what to collect.
