---
sidebar_position: 2
description: "What to collect before raising a support ticket, so we can answer in one reply instead of several."
---

# Before you contact us

Almost every support exchange starts with us asking for the same few things. Collecting them first usually turns a multi-day back-and-forth into a single reply.

:::danger If the robot is unsafe, say so first

Damaged wiring, a swollen battery, anything smoking or smelling hot, or a robot
that moves when it should not: **power it down, leave it down**, and put that in
the first line of your request. Do not keep testing to gather more detail.

:::

## Copy this into the request

Fill in what you can. A blank line is fine — knowing you *did not* see an error is itself useful.

```text
PRODUCT
  Model / serial number:
  Firmware version:
  Weston Robot packages:      (output of: dpkg -l | grep -i -E 'wr|weston')

WHAT HAPPENED
  Just before:                (what the robot was doing, what you had just done)
  At the moment it went wrong:
  Immediately after:          (did it stop, keep moving, power off, recover?)

WHAT YOU OBSERVED
  Error or warning shown:     (exact text, or "none")
  Lights / sounds:
  Were the motors powered:    (stiff, limp, or unknown)
  Anything different about the robot afterwards:

REPRODUCING IT
  Happens:                    (every time / sometimes / once only)
  Steps to reproduce:         1.
                              2.
                              3.
  Does it happen with nothing mounted / on flat ground / after a reboot:

WHAT CHANGED RECENTLY
  (firmware update, package upgrade, new payload, new site, transport, none)

ATTACHED
  (photos, video, screenshots, logs)
```

## What each part is for

### What happened, in order

The single most useful thing you can send. "It stopped working" tells us nothing; a sequence tells us where to look.

Write it as three moments — **just before**, **at the moment**, **immediately after**:

> *Before:* driving forward at walking pace on flat concrete, about 10 minutes into the session.
> *Moment:* it stopped dead and went limp, no warning on the controller.
> *After:* stayed limp for about 30 seconds, then responded to the controller again.

That example already narrows the cause to thermal protection. The same event described as "the robot keeps failing" narrows nothing.

### What you observed

Concrete, checkable things — not a diagnosis:

- The **exact text** of any error, warning or code. Retype it if you have to.
- **Lights**: which one, what colour, steady or blinking.
- **Sounds**: a click, a beep, a fan spinning up, a motor whine, or silence.
- **Whether the motors were powered** — a limp joint and a stiff one mean very different things.
- **What was different afterwards** — a warm patch, a loose fastener, a joint with new play.

If you already have a theory, send it, but send it separately from what you saw. We need both, and we need to be able to tell them apart.

### Whether it reproduces

This decides how we investigate, so it is worth ten minutes to find out:

| Answer | What it tells us |
| --- | --- |
| **Every time**, with steps | Fastest to fix — we can usually reproduce it here |
| **Sometimes** | Tell us roughly how often, and anything the failures had in common |
| **Once only** | Say so plainly. A one-off is still worth reporting, and pretending it repeats sends us the wrong way |

Then narrow it, if it is safe to:

- Does it still happen **with nothing mounted**?
- On **flat, clear ground**?
- **After a reboot**, or after a full power cycle?
- With a **different battery**, cable, or network connection?

Each "no" removes a whole branch of the search.

### What changed recently

Most faults follow a change. Firmware update, package upgrade, a new payload or mounting, a different site or surface, a transport, a battery swap. If nothing changed, say that — it is a real answer and it rules things out.

## What to attach

- **Photos** of the robot, any damage, and how payloads are mounted. Mounting is a common cause and hard to describe in words.
- **A short video** if the problem is a movement or behaviour. Ten seconds of the actual fault beats a paragraph.
- **Screenshots** of any warning in the mobile app or on the controller.
- **Logs**, if you can reach the onboard computer.

:::note Send text as text

A photograph of a terminal is the one attachment we cannot work with — we often
need to search and quote log output. Copy the text, or redirect it to a file as
below.

:::

## Collecting logs

If you can reach the onboard computer over SSH:

```bash
# System log since the last boot
journalctl -b --no-pager > journal.txt

# Kernel messages — useful for USB, CAN and power problems
dmesg > dmesg.txt

# Which of our packages are installed, and at what version
dpkg -l | grep -i -E 'wr|weston' > packages.txt
```

Capture the logs **as soon after the fault as you can**, and before rebooting if that is safe. `journalctl -b` covers the current boot only, so a reboot can discard exactly the part we need. If you have already rebooted, use the previous boot:

```bash
journalctl -b -1 --no-pager > journal_previous_boot.txt
```

If the problem involves the robot base or CAN, a bus capture is worth more than any description:

```bash
# Requires can-utils; see the CAN bus guide for interface setup
candump -l can0
```

See [Robot Base Control](/tutorial/agilex/ugv_base_control) for CAN interface setup.

## Then contact us

[Submit a support request](https://forms.office.com/r/qELKzYF33W).

Paste the filled-in template into the description and attach the files.
