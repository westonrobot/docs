---
sidebar_position: 2
description: "Maintenance that applies to every robot we supply: routine checks, battery care, cleaning, storage and transport, and when to call us."
tags: [maintenance, safety]
---

# Robot Maintenance

Most faults we are asked about are wear, dirt, a loose fastener or a flat battery — not a broken robot. A few minutes of checking catches nearly all of them before they become a ticket.

Read [Operational Safety](/guides/operational-safety) before working on a robot. **Power it off and disconnect the battery before touching anything mechanical.**

**Read the page for your platform as well.** Each one carries the checks specific to that type.

| Your platform | |
| --- | --- |
| Scout Mini, Ranger Mini | [Wheeled base maintenance](/guides/maintenance/wheeled-bases) |
| Go2, As2, A2, B2 | [Quadruped maintenance](/guides/maintenance/quadrupeds) |
| G1, H1-2, R1, H2 | [Humanoid maintenance](/guides/maintenance/humanoids) |
| WR65, WRL63, xArm, Z1, Piper, Nero, Kinova Gen3 Lite | [Manipulator maintenance](/guides/maintenance/manipulators) |

## Routine checks

There is no universal service interval, and we would rather give you triggers you can actually act on than a schedule you would ignore. Work to what the robot is doing, not to a calendar.

| When | Check |
| --- | --- |
| **Before each use** | Visible damage, loose or missing fasteners, frayed or pinched cables, battery charge, anything hanging off a payload mount |
| **After each use** | Wipe off dust and debris, especially around wheels, feet, joints and cooling vents |
| **Every few weeks in regular use** | Tyre condition and pressure, fastener torque on payload mounts, connector seating, fan and vent cleanliness |
| **After any impact, fall or collision** | Inspect the whole robot before powering it on again, not just the part that hit something |
| **Monthly in storage** | Battery charge level — see [Batteries](#batteries) |

Anything that has changed since the last check — a new noise, more play in a joint, a robot that pulls to one side — is worth investigating while it is small.

## Batteries

The single most common cause of a robot that will not run, and the component most easily ruined by neglect.

:::warning Connect and disconnect in this order

**Charging:** connect the charger to the **robot** first, then to the **wall**.

**Finishing:** disconnect from the **wall** first, then from the **robot**.

Doing it the other way round can arc the connector.

:::

- **Do not over-discharge.** The robot alarms at low battery; charge it then rather than later.
- **Charge in a clear area**, away from flammable materials, on a non-flammable surface.
- **Do not leave it charging unattended,** and disconnect once it is full.
- **Use only the supplied charger.** Voltage and chemistry have to match.
- **Do not modify or substitute the original batteries.**
- **In storage, charge at least once every two months.** A lithium pack left flat for months may not recover.
- **Stop using any pack that is swollen, dented, punctured or has taken a hard knock.** Isolate it and [contact us](/support/before-you-contact-us) — do not charge it to test it.

## Cleaning

**Assume the robot is not waterproof.** Unless yours was specifically customised, no hose, no pressure washer, no submersion. See the [ratings by platform](/guides/operational-safety#where-you-can-operate).

- A dry brush or compressed air for dust; a **barely damp** cloth for the shell.
- No solvents on plastics or painted surfaces.
- Keep **cooling vents and fans** clear — a blocked fan is a thermal shutdown waiting to happen.
- Keep **connectors dry and clean**. Blow out debris rather than wiping grit into a housing.
- Clean around **joints, wheel hubs and feet** rather than driving grit into them.

## Storage and transport

- **Charge to a storage level and top up every two months.** Do not store flat.
- **Store dry, indoors, out of direct sun**, and away from heaters.
- **Support the robot in its resting position.** Do not store a legged robot standing under power, or an arm extended.
- **Transport in the original case or crate** where you still have it, with the battery secured.
- **Check the shipping rules for lithium batteries** before flying or freighting — they are restricted.
- **Inspect fully after transport,** before the first power-on at the other end.

## Firmware and software

- **Record the version before and after any update.** When something changes behaviour, the version you were on is the first thing we will ask for.
- **Do not update firmware mid-project** unless you need the fix. Update at a point where you can re-test.
- **Keep a note of what is installed** on the onboard computer, especially anything you built yourself — reimaging loses it.

## When to call us instead

Stop and [contact us](/support/before-you-contact-us) rather than continuing:

- Any joint stiffness, play, noise or motor fault on a legged robot or an arm
- A battery that is swollen, damaged or will not hold charge
- Anything smoking, smelling hot or discoloured
- Damage found after a fall, collision or transport
- Repeatability or odometry that has drifted and does not come back after a recalibration

Have the serial number, firmware version and any error codes ready — [Before you contact us](/support/before-you-contact-us) lists what else helps and the commands to gather it.

## Support

- [Operational Safety](/guides/operational-safety) — read before working on a robot
- [Before you contact us](/support/before-you-contact-us) — what to collect
