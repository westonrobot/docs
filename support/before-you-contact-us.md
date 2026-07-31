---
sidebar_position: 2
description: "What to collect before raising a support ticket, so we can answer in one reply instead of several."
---

# Before you contact us

Collecting a few things first usually turns a multi-day back-and-forth into a single reply.

:::danger If the robot is unsafe, say so first

Damaged wiring, a swollen battery, anything smoking or smelling hot, or a robot
that moves when it should not: **power it down, leave it down**, and put that in
the first line of your request. Do not keep testing to gather more detail.

:::

## Copy this into the request

Fill in what you can. A blank is fine — knowing you *did not* see an error is itself useful.

```text
PRODUCT
  Model / serial number:
  Firmware version:

WHAT HAPPENED
  Just before:                (what the robot was doing, what you had just done)
  At the moment it went wrong:
  Immediately after:          (did it stop, keep moving, power off, recover?)

WHAT YOU OBSERVED
  Error or warning shown:     (exact text, or "none")
  Lights / sounds:
  Were the motors powered:    (stiff, limp, or unknown)

REPRODUCING IT
  Happens:                    (every time / sometimes / once only)
  Steps to reproduce:         1.
                              2.
  Still happens with nothing mounted / on flat ground / after a reboot?

WHAT CHANGED RECENTLY
  (firmware, packages, payload, site, transport — or "nothing")

ATTACHED
  (logs, photos, video, screenshots)
```

## Writing a useful description

**Describe it as a sequence, not a conclusion.** Compare:

> Driving forward at walking pace on flat concrete, ten minutes in. It stopped dead and went limp with no warning. Stayed limp about 30 seconds, then responded again.

That already points at thermal protection. "The robot keeps failing" points nowhere.

**Separate what you saw from what you think caused it.** Send both — just label which is which. Exact error text, which light and what colour, whether the joints were stiff or limp: those are the things we can act on.

**Narrow it before you write, if it is safe to.** Does it still happen with nothing mounted? On flat, clear ground? After a full power cycle? With a different battery or cable? Each "no" removes a whole branch.

## Logs

**Send whatever your setup already produces.** In rough order of usefulness:

- **Your own application's output** — the program that was driving the robot when it went wrong. Its log, or the terminal output, is usually the most informative thing in the whole ticket, and it is the one thing we cannot get any other way.
- **ROS logs**, if you are running ROS — `~/.ros/log/` for the relevant run.
- **Anything the robot itself reports** — messages in the vendor's mobile app, on the controller, or in its own log or diagnostic view.
- **System logs**, if the robot runs on a computer you can reach.

Send text as text. A photograph of a terminal is the one attachment we cannot search or quote.

<details>
<summary>System log commands, if you are on a Linux onboard computer</summary>

```bash
journalctl -b --no-pager > journal.txt          # system log, current boot
dmesg > dmesg.txt                               # USB, CAN and power problems
dpkg -l | grep -i -E 'wr|weston' > packages.txt # our package versions
candump -l can0                                 # CAN bus capture, needs can-utils
```

Capture before rebooting if you safely can — `journalctl -b` covers the current boot only. If you have already rebooted, `journalctl -b -1` gets the previous one.

See [Robot Base Control](/tutorial/agilex/ugv_base_control) for CAN interface setup.

</details>

## Also worth attaching

Photos of the robot and of how any payload is mounted; a short video if the problem is a movement rather than a message; screenshots of any warning.

## Then contact us

[Submit a support request](https://forms.office.com/r/qELKzYF33W).
