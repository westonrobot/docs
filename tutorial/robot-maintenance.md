---
sidebar_position: 2
description: "Routine maintenance for Weston Robot platforms: wheeled bases, quadrupeds, humanoids and manipulators."
tags: [maintenance, safety]
---

# Robot Maintenance

Most faults we are asked about are wear, dirt, a loose fastener or a flat battery — not a broken robot. A few minutes of checking catches nearly all of them before they become a ticket.

Read [Operational Safety](/tutorial/operational-safety) before working on a robot. **Power it off and disconnect the battery before touching anything mechanical.**

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

**Assume the robot is not waterproof.** Unless yours was specifically customised, no hose, no pressure washer, no submersion. See the [ratings by platform](/tutorial/operational-safety#where-you-can-operate).

- A dry brush or compressed air for dust; a **barely damp** cloth for the shell.
- No solvents on plastics or painted surfaces.
- Keep **cooling vents and fans** clear — a blocked fan is a thermal shutdown waiting to happen.
- Keep **connectors dry and clean**. Blow out debris rather than wiping grit into a housing.
- Clean around **joints, wheel hubs and feet** rather than driving grit into them.

## By platform

### Wheeled bases

Scout Mini, Ranger Mini — see [UGVs](/robot/intro#ugvs).

**Tyres matter more than people expect on skid-steer platforms.** Worn or unevenly inflated tyres change the friction each wheel sees, which degrades odometry and driving accuracy, and in the worst case loads the drivetrain unevenly enough to damage it.

- **Check pressure regularly** on platforms with pneumatic tyres:

  | Platform | Pressure |
  | --- | --- |
  | Scout 2.0 and later | **1.8–2.0 bar** |
  | Hunter 2.0 | **around 0.8 bar** |

  :::note Pressures for other platforms

  These are the figures we have published. If your platform is not listed, check the
  manual supplied with it rather than assuming a value — and [tell us](/support/before-you-contact-us),
  because it means this table has a gap.

  :::

- **Replace worn tyres promptly.** Running them down damages more than the tyre.
- **Check for uneven wear** across the four wheels — it usually points at a mechanical or alignment problem rather than the tyre itself.
- **Clear debris from wheel hubs**, particularly hair, wire and cable ties, which wrap around axles.
- **Recalibrate after wheel or tyre work** where the platform supports it — see the [Ranger Mini calibration guide](/tutorial/agilex/ranger_mini_calibration).

### Quadrupeds and humanoids

Go2, B2, G1, H1-2 — see [Quadrupeds](/robot/intro#quadrupeds) and [Humanoids](/robot/intro#humanoids).

:::caution Do not service the joints yourself

If you meet stiffness, play, unusual noise or motor faults in a joint, **[contact us](/support/before-you-contact-us)**
with your serial number rather than opening or lubricating it. There is no owner-serviceable lubrication schedule on these
platforms, and a joint opened incorrectly is an expensive repair.

There is no fixed lubrication schedule to follow — stiffness, play, noise or a
motor fault is the trigger, not an interval. Applies to the G1, Go2 and B2.

:::

What you *should* do:

- **Inspect foot pads** for wear and for embedded grit. Worn pads change traction and gait.
- **Check for play** by hand with the robot powered off and supported: a joint that has developed noticeable free movement is worth reporting early.
- **Keep the leg linkages and joint seals clean.** Grit works its way in.
- **Let overheated motors cool** rather than power-cycling repeatedly. On the Go2 a sudden limp into damping mode is thermal protection — see [the Go2 FAQ](/robot/quadruped/go2#why-does-the-robot-suddenly-enter-damping-mode).
- **Inspect after every fall**, including the shell, the wiring and the connectors, not just the joint that landed first.
- **Use the diagnostics tools** before raising a ticket: [Go2 diagnostics](/tutorial/unitree/go2_diag_guide), [B2 diagnostics](/tutorial/unitree/b2_diag_guide).

### Manipulators

WR65, WRL63, xArm, Z1, Piper, Kinova Gen3 Lite — see [Manipulators](/robot/intro#manipulators).

- **Check the base mounting bolts.** An arm applies real reaction forces to its base and they cycle constantly, which is exactly the condition that loosens fasteners. A base that has begun to move ruins repeatability before it becomes obviously loose.
- **Check the end effector mounting and its cabling.** Tool-side cables flex every cycle and fail before anything else does.
- **Watch the cable routing through the joints.** Cables that have been re-routed during integration can chafe over thousands of cycles.
- **Confirm repeatability** if positioning accuracy has drifted: run a known pose and compare. Drift usually means a mechanical problem, not a software one.
- **Keep the arm clean of process debris** — swarf, dust and adhesive around joint seals.
- **Support the arm before removing power** if it is extended or carrying a payload, since not every joint necessarily brakes. See [Operational Safety](/tutorial/operational-safety#manipulators).

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

- [Operational Safety](/tutorial/operational-safety) — read before working on a robot
- [Before you contact us](/support/before-you-contact-us) — what to collect
