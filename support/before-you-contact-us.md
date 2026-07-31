---
sidebar_position: 2
description: "What to collect before raising a support ticket, so we can answer in one reply instead of several."
---

# Before you contact us

Almost every support exchange starts with us asking for the same few things. Collecting them first usually turns a multi-day back-and-forth into a single reply.

## Checklist

- [ ] **Firmware / software version** of the robot and of any Weston Robot packages you have installed
- [ ] **What you were doing** when the problem appeared, in enough detail that we can try it
- [ ] **What changed recently** — a firmware update, a new payload, a package upgrade, a different environment, a transport
- [ ] **Whether it is reproducible** — every time, intermittently, or once
- [ ] **Photos of the robot**, including any damage, and of how payloads are mounted
- [ ] **A short video** if the problem is a motion or behaviour rather than an error message
- [ ] **Screenshots of any warning or error** shown in the mobile app or on the controller
- [ ] **Logs**, if you can reach the robot's computer — see below

## Collecting logs

If you can reach the onboard computer over SSH, these are the most useful things to capture. Attach the output as a text file rather than pasting a screenshot of a terminal — we often need to search it.

```bash
# System log since the last boot
journalctl -b --no-pager > journal.txt

# Kernel messages, useful for USB, CAN and power issues
dmesg > dmesg.txt

# Which of our packages are installed, and at what version
dpkg -l | grep -i -E 'wr|weston' > packages.txt
```

If the problem involves the robot base or CAN, a capture of the bus is worth more than any description:

```bash
# Requires can-utils; see the CAN bus guide for interface setup
candump -l can0
```

See [Robot Base Control](/tutorial/agilex/ugv_base_control) for CAN interface setup.

## What not to send

Please avoid sending only a photo of a screen showing a stack trace. Text we can search and quote; a photograph of text we cannot.

## Then contact us

[Submit a support request](https://forms.office.com/r/qELKzYF33W).

Include the checklist items in the description, and attach the files. If the robot is unsafe to operate or has visibly damaged wiring, say so in the first line — power it down and leave it down until we reply.
