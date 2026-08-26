---
sidebar_position: 1
description: "Safety practices for operating Weston Robot platforms: wheeled bases, quadrupeds, humanoids and manipulators."
tags: [safety]
---

# Operational Safety

Read this before powering a robot for the first time, and again before letting anyone new operate one.

Everything below is deliberately on one page rather than split by platform. Safety guidance you have to click to find is safety guidance nobody reads — start with the sections that apply to every platform, then the section for the type you have.

:::danger These machines can injure people

Every platform here carries a battery and powered motors, and can move without
warning if it receives a bad command, loses its network link, or is left in the
wrong mode. Legged robots fall. Arms swing through a larger volume than you expect.
A wheeled base does not stop at the top of a staircase unless something tells it to.

None of that is unusual or a defect. It just means the robot needs the same respect
as any other powered machine on a factory floor.

:::

## Before you power on

Every time, on every platform. It takes under a minute.

1. **Find the emergency stop and test it.** On most platforms this is a physical button on the robot, a control on the RC transmitter, or both. Press it once, confirm the robot goes limp or cuts drive, then release it. If you cannot find an emergency stop on your unit, [ask us](/support/before-you-contact-us) before operating it.
2. **Clear the area.** Nobody within reach of the robot's movement, no cables or tools underneath it, nothing on the floor it could run over or trip on.
3. **Check the robot itself.** Loose fasteners, damaged wiring, a swollen battery, anything hanging off a payload mount. Fix it before powering on, not after.
4. **Know how you will stop it** — not just the e-stop, but which command, which key, which switch.
5. **Turn the RC controller off when you are not driving.** A transmitter in a bag or under a laptop is the most common cause of a robot moving when nobody expected it to.

## Where you can operate

- **Assume the robot is not waterproof.** Unless yours was specifically customised, keep it out of rain, puddles, wash-down areas and high humidity.

  | Platform | Rating |
  | --- | --- |
  | G1 | Not waterproof |
  | Go2 | Not waterproof |
  | B2 | IP67 **when properly sealed** — opening the side port covers compromises it |

  An IP rating assumes covers are closed and seals intact. Check the product page
  for anything not listed here before deploying it somewhere wet.
- **No heaters, no open flame, no flammable or corrosive gas.** Lithium batteries and hot motors do not belong near any of those.
- **Operate on a surface the robot can handle.** Loose gravel, deep pile carpet, gratings and wet tiles all reduce traction or trap feet and wheels.
- **Watch for drop-offs.** Stair heads, loading docks, mezzanine edges and open pits. A robot under manual control has no idea they are there.
- **Give it ventilation.** Motors and onboard computers throttle or shut down when they overheat, and a robot that stops mid-task can stop somewhere inconvenient.

## While you are developing

This is when most damage happens — not during normal operation, but while someone is testing code that has never run before.

**Raise the robot off the ground.** For legged platforms and arms, put the robot on a stable stool or bench so its feet or tool hang clear. A bad motion command then costs you nothing.

<Figure
  src={require('./img/robot_on_stool.jpg').default}
  alt="A quadruped robot raised on a stool so its legs hang clear of the ground"
  size="lg"
  framed
  caption="A quadruped raised so its legs cannot drive it off the bench." />

**Use a wired connection for anything touching low-level control.** WiFi is fine for high-level work — logging in, editing code, pulling packages, reading topics — and for internet access.

It is not fine for joint-level or balance control. WiFi introduces latency spikes and occasional dropouts, and a control loop that misses its deadline does not degrade gracefully: on a legged platform the robot can lose balance and fall, taking the joints and any mounted payload with it. A wired link to the robot's internal network does not have that failure mode.

For putting a robot on WiFi for internet access, see the [G1 Internet Connection Guide](/tutorial/unitree/g1_internet_guide).

**Start slow and low.** Reduced speed and reduced torque for the first run of any new motion code. Bring it up once you have watched it behave.

**Test your limits before you trust them.** Joint limits, speed caps and workspace boundaries should be verified with the robot raised or the arm clear, not discovered when it hits something.

**Never leave a powered robot unattended.** Power it down if you are stepping away, even briefly.

## By platform

The universal sections above still apply. These are the additional hazards specific to each type.

### Wheeled bases

Scout Mini, Ranger Mini — see [UGVs](/robot/intro#ugvs).

- **Keep hands and cables away from the wheels.** The gap between wheel and chassis is a pinch point, and it is at exactly the height where a trailing cable gets pulled in.
- **Do not assume it drives like a car.** The Ranger Mini has four-wheel steering with omnidirectional modes: it can crab sideways and rotate on the spot. If you are used to differential drive, the first sideways move is a surprise. Know which mode it is in.
- **Slopes and edges.** A base under manual control will drive off a ledge. On a slope it can also keep rolling after you stop commanding it.
- **Mind the payload.** A tall or heavy payload raises the centre of gravity and makes the base easier to tip, particularly during a fast turn or an emergency stop.

### Quadrupeds

Go2, B2 — see [Quadrupeds](/robot/intro#quadrupeds).

- **Stay out of the leg envelope.** The legs sweep through a much larger volume than the robot's standing footprint, and they move fast.
- **Watch your hands when powering on or off.** Legs can snap to a default position as the controller takes over or releases.
- **They fall.** Uneven ground, an obstacle mid-step or a lost network link can all put one down. Do not stand where a falling robot lands, and do not try to catch it.
- **Let overheated motors cool.** If the robot suddenly goes limp into damping mode, the motors have overheated and that is protective, not a fault. Holding a locked standing pose for long periods is the most common cause — see [the Go2 FAQ](/robot/quadruped/go2#why-does-the-robot-suddenly-enter-damping-mode).
- **The B2 is an industrial machine.** It is substantially heavier than a Go2, and everything above matters more. Treat clearances generously.

### Humanoids

G1, H1-2 — see [Humanoids](/robot/intro#humanoids).

Everything in the quadruped section applies, plus:

- **A biped is less stable than a quadruped and falls further.** The [H1-2](/robot/humanoid/h1-2) is 180 cm tall; when it goes over it does so with the reach and force you would expect from something that size.
- **Support it during early testing.** A gantry, hoist or harness during first motion runs prevents most of the damage people do to these robots. Do not rely on catching it by hand.
- **Keep the falling radius clear** — roughly its standing height in every direction, not just its footprint.
- **Two people for handling.** Moving, mounting or recovering a full-size humanoid is not a one-person job.

### Manipulators

WR65, WRL63, xArm, Z1, Piper, Kinova Gen3 Lite — see [Manipulators](/robot/intro#manipulators).

- **Stay out of the working envelope while it is powered.** An arm moving under program control is a crush hazard, and it does not know you are there.
- **The reach is larger than it looks.** The [WRL63](/robot/manipulator/wrl63) sweeps a 900 mm radius — check what is inside that sphere, including your monitor, before the first move.
- **Mount to structure, not to a panel.** The arm applies real reaction forces to its base, and more of them the further it reaches. A base that flexes turns into a base that walks.
- **Find out what happens when power is removed.** Not every joint necessarily holds position. Realman list mechanical brakes on **J1–J3** for the RM65 (our [WR65](/robot/manipulator/wr65)) and **J1–J4** for the RML63 (our [WRL63](/robot/manipulator/wrl63)) — confirm the behaviour of the remaining joints, and of whatever else you have fitted, before you assume the arm will stay where it is. Support the arm and the payload before cutting power.
- **Account for the end effector.** A gripper, camera or tool changes the reach, the mass, the pinch points and the moment on the base. Re-check your limits after fitting one.
- **Reduced speed for teaching and first runs.** Then raise it.

## Batteries and charging

- **Charge in a clear area** on a non-flammable surface, not on carpet, not in a cupboard, not on the robot's shipping foam.
- **Do not leave charging unattended overnight.**
- **Stop using a battery that is swollen, dented, punctured or has been dropped hard.** Isolate it and [contact us](/support/before-you-contact-us). Do not charge it to "test" it.
- **Use the supplied charger.** Voltage and chemistry have to match.
- **Do not deep-discharge or store fully charged for months.** See [Robot Maintenance](/tutorial/robot-maintenance) for storage guidance.
- **Check shipping rules before transporting.** Lithium batteries are restricted on aircraft and in some freight.

## If something goes wrong

**The robot is moving and should not be** — hit the emergency stop. If that fails, cut power. Do not try to physically restrain it.

**A legged robot has fallen and will not respond** — applies to the G1, Go2 and B2:

1. If a `Recover From Fall` command exists and it is safe to use, try it first.
2. Otherwise, screenshot any warnings or errors in the mobile app — these are the most useful thing you can send us.
3. Power the robot off.
4. Carry it to flat, level ground.
5. Inspect for damage, particularly loose or damaged wiring.
6. If it will not power on or start up, [contact support](/support/before-you-contact-us).

**The robot went limp on its own** — usually protective, and usually thermal. Let it cool before restarting, and look at what it was doing beforehand.

**Something smells hot, is smoking, or the battery is swelling** — cut power, move people away, and do not attempt to charge or restart. [Contact us](/support/before-you-contact-us).

**Anything was damaged, or anyone was hurt** — stop, and tell us what happened. Photographs and the logs from around the incident are the most useful things you can send.

## Support

- [Before you contact us](/support/before-you-contact-us) — what to collect, and the commands to collect it
- [Robot Maintenance](/tutorial/robot-maintenance) — tyres, batteries and routine checks
