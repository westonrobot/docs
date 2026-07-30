---
sidebar_position: 4
description: "Answers to questions that come up across multiple Weston Robot platforms."
---

# FAQ

Questions that apply to more than one platform. Model-specific questions stay on the product pages — see the FAQ section on [G1](/robot/humanoid/g1), [Go2](/robot/quadruped/go2) or [B2](/robot/quadruped/b2).

## Joints, motors and wear

### How often do I need to lubricate the joints?

There is no fixed schedule. If you encounter motor issues, stiffness, or loosening of joints, contact support rather than servicing the joints yourself — have your [serial number](/support/identify-your-product) ready.

Applies to G1, Go2 and B2.

### Why does the robot suddenly enter damping mode?

The motors have overheated. Damping mode is protective. Avoid holding a locked stand for extended periods, which is the most common cause.

Applies to Go2. Other platforms have their own thermal behaviour; check the product page.

## Development access

### Can I develop over WiFi instead of a wired connection?

Technically yes, and it is fine for high-level work — logging in, editing code, pulling packages, reading topics. **Do not use it for low-level control.**

WiFi introduces latency spikes and occasional dropouts. A low-level control loop that misses its deadline does not degrade gracefully: on a legged platform the robot can lose balance and fall, taking the joints and any mounted payload with it. A wired link to the robot's internal network does not have that failure mode.

Use a cable for anything touching joint-level or balance control. WiFi is reasonable for everything above that, and for internet access — see the [G1 Internet Connection Guide](/tutorial/unitree/g1_internet_guide) for how to set that up.

## Environment

### Is the robot waterproof?

Depends on the platform, and the answer is usually no:

| Platform | Rating |
| --- | --- |
| G1 | Not waterproof |
| Go2 | Not waterproof |
| B2 | IP67 **when properly sealed** — opening the side port covers compromises it |

Check the product page before deploying anywhere wet. An IP rating assumes covers are closed and seals are intact.

## When something goes wrong

### The robot has fallen over and does not respond to the controller

1. If a `Recover From Fall` command exists and it is safe to use, try it first.
2. Otherwise, screenshot any warnings or errors in the mobile app — these are the most useful thing you can send us.
3. Power the robot off.
4. Carry it to flat, level ground.
5. Inspect for damage, particularly loose or damaged wiring.
6. If it will not power on or start up, [contact support](/support/before-you-contact-us).

Applies to G1, Go2 and B2.

### I am seeing an error or fault code

See [Fault codes](/support/fault-codes).

## Commercial

### What warranty applies, and how do I return a unit?

See [Warranty and RMA](/support/warranty-and-rma).

---

Not answered here? Check your product page, then [contact us](/support/before-you-contact-us).
