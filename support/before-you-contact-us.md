---
sidebar_position: 2
description: "What to include in a support request so we can answer in one reply instead of several."
---

# Before you contact us

Nearly every request comes back to the same few questions, and each round trip to ask them costs a day. Sending them up front is usually the difference between one reply and a week of messages.

:::danger If the robot is unsafe, say so first

Damaged wiring, a swollen battery, anything smoking or hot, or a robot moving
when it should not: **power it down, leave it down**, and put that in the first
line. Do not keep testing to gather detail.

:::

## What to include

**Which unit** — model and serial number, plus firmware version if you have it. Several platforms ship in variants that differ in what is fitted.

**What went wrong, as a sequence** rather than a conclusion: what the robot was doing **just before**, what happened **at the moment**, and what it did **immediately after** — stopped, kept moving, powered off, recovered on its own.

> *Driving at walking pace on flat concrete, ten minutes in. Stopped dead and went limp, no warning. Limp for about 30 seconds, then responded again.*

That points at thermal protection. "The robot keeps failing" points nowhere.

**What you observed** — exact error text, which lights and what colour, any sounds, whether the joints were stiff or limp. Send your theory too if you have one, just label which is which.

**Whether it reproduces** — every time, sometimes, or once. If it is safe to try: does it still happen with nothing mounted, on flat ground, after a power cycle, with a different battery or cable?

**What changed recently** — firmware, packages, payload, site, transport. "Nothing" is a real answer.

**Logs, starting with your own program's.** The output of whatever was driving the robot is usually the most useful thing in the request, and the one thing we cannot get any other way. Then ROS logs, anything the robot reported in its app or on the controller, and system logs if you can reach the onboard computer. Send text as text — a photo of a terminal is the one attachment we cannot search.

**Photos and video** — the robot, any damage, how payloads are mounted. Ten seconds of video beats a paragraph when the problem is a movement.

## Then contact us

[Submit a support request](https://forms.office.com/r/qELKzYF33W) with what you have gathered — attach the files rather than describing them, and put anything safety-related in the first line.

Do not wait until you have everything. Send what you have, note what you could not get and why, and we will work from there.
