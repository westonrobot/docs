---
sidebar_position: 2
description: "Calibrate the steering motors on an AgileX Ranger Mini, automatically or by hand."
tags: [agilex, ranger-mini, calibration]
---

# Ranger Mini Steering Calibration

The Ranger Mini is a four-wheel swerve-drive platform, so each wheel steers independently. If the wheels are not aligned to a known zero the robot will crab, pull to one side, or refuse to drive straight. Calibration re-establishes that zero.

Two methods: autocalibration, which the robot performs itself, and manual calibration, where you straighten the wheels first and then tell the robot that this is straight ahead.

:::caution Autocalibration needs the right firmware

Not every firmware build supports autocalibration. On the Ranger Mini 2.0, `V5.8.3` includes it and `V5.8.7` does not. Check which build your robot is running — see the firmware list on the [Ranger Mini 2.0](/robot/ugv/ranger-mini-v2) or [Ranger Mini 3.0](/robot/ugv/ranger-mini-v3) page — and use manual calibration if yours lacks it.

:::

## Autocalibration

Turn on the robot and the controller. With **SWA** flipped down and **VRA** pushed to its bottommost position, press **KEY1**.

<FigureGrid columns={2}>
  <Figure
    src={require('../../robot/img/agilex/ranger_auto_calibration_1.jpg').default}
    alt="Ranger Mini controller with SWA switch flipped down for autocalibration"
    framed
    caption="SWA down." />
  <Figure
    src={require('../../robot/img/agilex/ranger_auto_calibration_2.jpg').default}
    alt="Ranger Mini controller with VRA dial at its bottommost position"
    framed
    caption="VRA at the bottom, then press KEY1." />
</FigureGrid>

## Manual calibration

Turn off both the robot and the controller. With the robot powered down, straighten the steering wheels by hand — laying a long straight edge across them is usually enough to get them parallel.

<Figure
  src={require('../../robot/img/agilex/ranger_calibration_1.jpg').default}
  alt="Straightening the Ranger Mini steering wheels using a straight edge"
  framed
  size="lg"
  caption="Straighten the wheels with the robot powered off." />

Turn the robot and controller back on. With **SWA** flipped down and **VRA** pushed to its **topmost** position — the opposite of autocalibration — press **KEY1**.

<Figure
  src={require('../../robot/img/agilex/ranger_calibration_2.jpg').default}
  alt="Ranger Mini controller with VRA dial at its topmost position for manual calibration"
  framed
  size="lg"
  caption="VRA at the top, then press KEY1." />

The controller display flashes an error code for one or two seconds and then returns to normal. That is the expected result — calibration is complete.

## If it does not take

- Confirm the firmware supports the method you are using.
- Check the wheels really were straight before you started manual calibration; the robot takes your alignment as its zero, so any error you leave in becomes permanent until you redo it.
- If the controller keeps showing an error, or the robot still will not drive straight, [contact us](/support/before-you-contact-us).
