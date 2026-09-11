---
sidebar_position: 1
description: "Safety for wheeled bases: pinch points, drive modes, slopes and edges, payload stability, and where you can operate."
tags: [safety, ugv]
---

# Wheeled Base Safety

Scout Mini, Ranger Mini V2 and V3 — see [UGVs](/robot/intro#ugvs).

What is specific to wheeled bases. The checks that apply to every robot we supply — testing the emergency stop, clearing the area, battery handling — are on [Operational Safety](/guides/operational-safety), and you should read that first.

:::danger A base does not stop at an edge

A wheeled base under manual control has no idea a stair head, loading dock or
mezzanine edge is there, and it will drive off one. On a slope it can also keep
rolling after you stop commanding it.

:::

## Hazards specific to wheeled bases

- **Keep hands and cables away from the wheels.** The gap between wheel and chassis is a pinch point, and it is at exactly the height where a trailing cable gets pulled in.
- **Know which way yours drives.** The [Scout Mini](/robot/ugv/scout-mini) is four-wheel differential drive: it turns by driving its wheels at different speeds, and it scrubs sideways when it does. The [Ranger Mini](/robot/ugv/ranger-mini-v3) has four-wheel steering with omnidirectional modes and can crab sideways or rotate on the spot — if you are used to differential drive, the first sideways move is a surprise. Know which platform and which mode you are in.
- **Slopes and edges.** A base under manual control will drive off a ledge. On a slope it can also keep rolling after you stop commanding it.
- **Mind the payload.** A tall or heavy payload raises the centre of gravity and makes the base easier to tip, particularly during a fast turn or an emergency stop.

## Where you can operate

Assume the base is not waterproof unless yours was specifically customised. Check the product page for a rating before deploying it somewhere wet.

**Surfaces.** Loose gravel, deep pile carpet, gratings and wet tiles all reduce traction. **Watch for drop-offs** — stair heads, loading docks, mezzanine edges and open pits.

## While you are developing

**Raise the base so the wheels turn free.** Put it on a stable stool or blocks before running new driving code, and the first bad command costs you nothing.

<Figure
  src={require('../img/robot_on_stool.jpg').default}
  alt="An AgileX wheeled base with mecanum wheels resting on a low stool so all four wheels hang clear of the floor, with an RC transmitter sitting on its top plate"
  size="lg"
  framed
  caption="A wheeled base raised so the wheels cannot drive it off the bench. Note the transmitter stowed on top — switch it off when you are not driving." />

**Start slow.** Reduced speed for the first run of any new driving code, in a clear area with room to overrun.

**Test your limits before you trust them.** Speed caps and boundaries should be verified somewhere a mistake is harmless, not discovered when the base hits something.

**Never leave a powered base unattended,** and turn the RC controller off when you are not driving.

## Support

- [Operational Safety](/guides/operational-safety) — the checks that apply to every platform
- [Wheeled base maintenance](/guides/maintenance/wheeled-bases) — tyres, hubs and calibration
- [Before you contact us](/support/before-you-contact-us) — what to collect, and the commands to collect it
