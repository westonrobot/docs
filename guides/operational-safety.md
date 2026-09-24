---
sidebar_position: 1
description: "Safety rules that apply to every robot we supply: pre-power-on checks, where you can operate, development practice, batteries, and what to do when something goes wrong."
tags: [safety]
---

# Operational Safety

Read this before powering a robot for the first time, and again before letting anyone new operate one.

This page carries the rules that hold for every robot we supply. The hazards that come from having legs, wheels or a single arm differ enough to be worth their own pages, and they are linked below.

:::danger These machines can injure people

Every platform here carries a battery and powered motors, and can move without
warning if it receives a bad command, loses its network link, or is left in the
wrong mode, and it can move faster and through a larger volume than you expect.

None of that is unusual or a defect. It just means the robot needs the same respect
as any other powered machine on a factory floor.

:::

**Read the page for your platform as well.** Each one carries the hazards, the environmental limits and the development practice specific to that type.

| Your platform | |
| --- | --- |
| Scout Mini, Ranger Mini | [Wheeled base safety](/guides/safety/wheeled-bases) |
| Go2, As2, A2, B2 | [Quadruped safety](/guides/safety/quadrupeds) |
| G1, H1-2, R1, H2 | [Humanoid safety](/guides/safety/humanoids) |
| WR65, WRL63, xArm, Z1, Piper, Nero, Kinova Gen3 Lite | [Manipulator safety](/guides/safety/manipulators) |

## Before you power on

Every time, on every platform. It takes under a minute.

1. **Find the emergency stop and test it.** On most platforms this is a physical button on the robot, a control on the RC transmitter, or both. Press it once, confirm the robot goes limp or cuts drive, then release it. If you cannot find an emergency stop on your unit, [ask us](/support/before-you-contact-us) before operating it.
2. **Clear the area.** Nobody within reach of the robot's movement, no cables or tools underneath it, nothing on the floor it could run over or trip on.
3. **Check the robot itself.** Loose fasteners, damaged wiring, a swollen battery, anything hanging off a payload mount. Fix it before powering on, not after.
4. **Know how you will stop it** — not just the e-stop, but which command, which key, which switch.
5. **Turn the RC controller off when you are not driving.** A transmitter in a bag or under a laptop is the most common cause of a robot moving when nobody expected it to.

## Where you can operate

- **Assume the robot is not waterproof.** Unless yours was specifically customised, keep it out of rain, puddles, wash-down areas and high humidity.

  Where a platform carries an IP rating it assumes covers are closed and seals
  intact. Ratings are on the page for your platform and on the product page.
- **No heaters, no open flame, no flammable or corrosive gas.** Lithium batteries and hot motors do not belong near any of those.
- **Operate on a surface the robot can handle.** Loose gravel, deep pile carpet, gratings and wet tiles all reduce traction or trap feet and wheels.
- **Watch for drop-offs.** Stair heads, loading docks, mezzanine edges and open pits. A robot under manual control has no idea they are there.
- **Give it ventilation.** Motors and onboard computers throttle or shut down when they overheat, and a robot that stops mid-task can stop somewhere inconvenient.

## While you are developing

This is when most damage happens — not during normal operation, but while someone is testing code that has never run before.

**Put the robot somewhere a bad command is harmless.** Raised clear of the ground, supported, or in an area with room to overrun — how you do that depends on the platform, and is on the page for your type.

**Use a wired connection for anything touching low-level control.** WiFi is fine for high-level work — logging in, editing code, pulling packages, reading topics — and for internet access.

It is not fine for joint-level or balance control. WiFi introduces latency spikes and occasional dropouts, and a control loop that misses its deadline does not degrade gracefully. A wired link to the robot's internal network does not have that failure mode.

For putting a robot on WiFi for internet access, see the [G1 Internet Connection Guide](/guides/unitree/g1_internet_guide).

**Start slow and low.** Reduced speed and reduced torque for the first run of any new motion code. Bring it up once you have watched it behave.

**Test your limits before you trust them.** Joint limits, speed caps and workspace boundaries should be verified somewhere a mistake is harmless, not discovered when the robot hits something.

**Never leave a powered robot unattended.** Power it down if you are stepping away, even briefly.

## Batteries and charging

- **Charge in a clear area** on a non-flammable surface, not on carpet, not in a cupboard, not on the robot's shipping foam.
- **Do not leave charging unattended overnight.**
- **Stop using a battery that is swollen, dented, punctured or has been dropped hard.** Isolate it and [contact us](/support/before-you-contact-us). Do not charge it to "test" it.
- **Use the supplied charger.** Voltage and chemistry have to match.
- **Do not deep-discharge or store fully charged for months.** See [Robot Maintenance](/guides/robot-maintenance) for storage guidance.
- **Check shipping rules before transporting.** Lithium batteries are restricted on aircraft and in some freight.

## If something goes wrong

**The robot is moving and should not be** — hit the emergency stop. If that fails, cut power. Do not try to physically restrain it.

**A legged robot has fallen and will not respond** — see the recovery sequence on [Quadruped safety](/guides/safety/quadrupeds) or [Humanoid safety](/guides/safety/humanoids).

**The robot went limp on its own** — usually protective, and usually thermal. Let it cool before restarting, and look at what it was doing beforehand.

**Something smells hot, is smoking, or the battery is swelling** — cut power, move people away, and do not attempt to charge or restart. [Contact us](/support/before-you-contact-us).

**Anything was damaged, or anyone was hurt** — stop, and tell us what happened. Photographs and the logs from around the incident are the most useful things you can send.

## Support

- [Before you contact us](/support/before-you-contact-us) — what to collect, and the commands to collect it
- [Robot Maintenance](/guides/robot-maintenance) — tyres, batteries and routine checks
