---
sidebar_position: 1
description: "Power Regulator v2.X: setup, output ports, CANopen control, channel defaults and diagnostics."
---

# Power Regulator v2.X

<Split ratio="wide-narrow">

<div>

A power management unit designed by Weston Robot for mobile robots. It takes the platform's battery and produces regulated, individually switchable output rails for everything you mount on it — onboard computers, sensors, and payloads that would otherwise sag or brown out when the motors draw current.

We designed this unit, so this page is the full reference for it rather than a pointer to someone else's.

</div>

<Figure
  src={require('../img/westonrobot/regulator_v2.jpg').default}
  alt="Power Regulator v2 showing the output ports and DC input on the front face"
  size="hero"
  framed />

</Split>

What it gives you over wiring straight to the battery:

- **Low output ripple** on every channel, and **soft-start** so a payload cannot pull a current surge at switch-on
- **Every port fused**, protecting both the battery and whatever is connected
- **Channels switched individually**, so you can control boot order — bring the control computer up first, then let it power the rest
- **Voltage and current feedback per channel** over CAN or RS485
- **Temperature monitoring** with active fan cooling

## Getting started

1. **Mount it** where the fan is not obstructed.
2. **Connect the battery** to the XT60 input, labelled `DC IN 24V` on the case.
3. **Wire your loads** to the Mega-Fit output ports — see [Electrical interfaces](#electrical-interfaces) for the layout and the per-port budgets.
4. **Connect CAN** and confirm the unit appears at node 30 — see [Control interface](#control-interface).
5. **Switch the channels you need on.** Everything is off by default at power-on, so a freshly wired robot will appear dead until you do this or set the power-on defaults. See [Set the default state of each channel](#set-the-default-state-of-each-channel).

## Key information

### Related resources

| Resource | What it is | Where |
| --- | --- | --- |
| `wrp_sdk` | CANopen driver, from version 1.0.0 | Install from our Debian repository |
| `wr_regulator_widget` | GUI for monitoring and switching channels | Install from our Debian repository |
| EDS file | CANopen object dictionary, needed by `canopen` in Python | Ships with the SDK at `/opt/weston_robot/share/wrp_sdk/eds/westonrobot/regulator/` |

Add our package repository before installing either: [Weston Robot Apt Source](/tutorial/installation/apt_source).

### Electrical interfaces

| | |
| --- | --- |
| **Input** | 18–32 V, 20 A maximum, protected by a 20 A fuse. **XT60 connector**, labelled `DC IN 24V` on the case |
| **Output connectors** | Molex Mega-Fit, 2 or 4 channels per port |
| **Control** | CAN (CANopen) or RS485 |
| **Cooling** | Active fan, temperature-controlled |

The case is labelled `DC IN 24V` because 24 V is the nominal battery voltage it is built around — the accepted input range is the full 18–32 V above, so a 6S lithium pack sagging under load is still within spec.

Outputs are on the same face as the input, labelled left to right: **12 V isolated · 5 V isolated · 12 V · 19 V**, with the XT60 input at the right-hand end. Click the photo above to enlarge and read the silkscreen.

:::caution The channels on a port share the port's power budget

Each output port exposes 2 or 4 channels, but they are **interconnected internally**.
The total draw across a port's channels must stay within that port's rating — four
channels on a 120 W port do not give you 120 W each.

:::

:::warning The fan only runs when the 12 V channel is on

Fan operation is tied to the state of the 12 V channel. Switch that channel off and
the unit loses active cooling while the other rails keep supplying current.

The fan starts at **28 °C** and reaches full speed at **45 °C** and above.

:::

### Serial number

On a white label on the **top face**, in the corner beside the logo. It carries the serial number and a QR code.

### Control interface

The unit speaks **CANopen** and appears as **node ID 30**. The driver is in `wrp_sdk` from version 1.0.0 — use that from C++, or drive it over `canopen` in Python for one-off configuration.

Bring the CAN interface up on your computer before talking to it:

```bash
sudo ip link set can0 type can bitrate 500000
sudo ip link set up can0
sudo ip link set can0 txqueuelen 1000
```

### Status LEDs

The two LEDs tell you which state the unit is in, and the timings differ between hardware revisions — check which one you have before concluding something is wrong.

| State | V2.1 red | V2.1 green | V2.2 red | V2.2 green |
| --- | --- | --- | --- | --- |
| Initialisation | ON | ON | ON | ON |
| Calibration | OFF | OFF | ON | ON |
| Operational | OFF | BLINKING | OFF | BLINKING |
| Firmware upgrade | BLINKING | OFF | BLINKING | OFF |

At power-on:

- **V2.1** — both LEDs on for about 2 seconds while it initialises, then both off for about 2 seconds while it calibrates.
- **V2.2** — both LEDs on for about **18 seconds**, covering initialisation and calibration together.

Once calibrated the unit is operational: red off, green blinking.

### Specifications

**Power module**

| Port | Voltage | Max current | Power | Protection |
| --- | --- | --- | --- | --- |
| Main input | 18–32 V | 20 A | — | 20 A fuse |
| Output — 19 V | 19 V | 8 A | 150 W | 10 A fuse |
| Output — 12 V | 12 V | 10 A | 120 W | 15 A fuse |
| Output — 5 V isolated | 5 V | 4 A | 20 W | Resettable |
| Output — 12 V isolated | 12 V | 3.3 A | 40 W | Resettable |
| Output — extension | Input voltage | — | Limited by total power | — |

**Control module**

| Port | Protocol | Function |
| --- | --- | --- |
| CAN | CANopen | Monitoring, control and firmware upgrade |
| RS485 | — | Firmware upgrade (backup), future extension |

## Common configurations

### Install the SDK

Needed if you are driving the regulator from a C++ program. For monitoring and switching by hand, the widget alone is enough.

```bash
sudo apt-get install -y software-properties-common
sudo add-apt-repository ppa:lely/ppa && sudo apt-get update
sudo apt-get install -y pkg-config liblely-coapp-dev liblely-co-tools
```

Then, with [our Debian repository](/tutorial/installation/apt_source) added:

```bash
sudo apt-get install wrp_sdk
```

### Install the widget

```bash
# dependencies
sudo apt-get install libgl1-mesa-dev libglfw3-dev libcairo2-dev

# the widget itself
sudo apt-get install wr_regulator_widget
```

Run it with:

```bash
/opt/weston_robot/bin/regulator_widget/wr_regulator_widget
```

If that path is not present on your install, the binary may be `/opt/weston_robot/bin/regulator_widget` directly — check which of the two your package produced.

The widget opens with a channel-by-channel view of output state, voltage and current:

<Figure
  src={require('../img/westonrobot/regulator_v2.1_01.png').default}
  alt="Power Regulator widget showing per-channel output state, voltage and current"
  size="lg"
  framed
  caption="The regulator widget. Click to enlarge." />

### Set the default state of each channel

**Every output channel is off by default at power-on**, which is the safe default but not always the one you want. If your control computer runs from the 19 V channel, that channel has to come up on its own — otherwise nothing is alive to switch it on.

The default state is stored in non-volatile ROM, so it persists once set.

Install the Python CAN tooling:

```bash
pip3 install --user canopen python-can
```

Point `python-can` at your adapter:

```bash title="~/.canrc"
[default]
interface = socketcan
channel = can0
bitrate = 500000
```

Bring up `can0` as shown in [Control interface](#control-interface), then run the script below. It sets **all four channels on by default** — adjust the values to suit your boot order, and set `EDS` to the path of the EDS file for your hardware revision.

```python title="set_channel_defaults.py"
import canopen
import time

EDS = "/opt/weston_robot/share/wrp_sdk/eds/westonrobot/regulator/regulator_v2.1.eds"
NODEID = 30

network = canopen.Network()
network.connect()
node = network.add_node(NODEID, EDS)

print("Initial output state:")
print("19V          {}".format(node.sdo['Output state'][1].raw))
print("12V          {}".format(node.sdo['Output state'][2].raw))
print("Isolated 12V {}".format(node.sdo['Output state'][3].raw))
print("Isolated 5V  {}".format(node.sdo['Output state'][4].raw))

time.sleep(1)
print("Setting output command (1: on, 0: off)")
node.sdo['Output command'][1].raw = 1
node.sdo['Output command'][2].raw = 1
node.sdo['Output command'][3].raw = 1
node.sdo['Output command'][4].raw = 1

node.store()      # write to ROM; without this the change is lost at power-off
# node.restore()  # roll back to the stored defaults
network.disconnect()
```

:::note Use the EDS that matches your revision

The EDS file is revision-specific. Using the V2.1 file against a V2.2 unit, or the
reverse, gives object-dictionary errors rather than an obvious mismatch message.

:::

## Troubleshooting & FAQ

### Nothing powers up after switch-on

All channels ship disabled by default. Either switch them on over CAN or through the widget, or set the power-on defaults — see [Set the default state of each channel](#set-the-default-state-of-each-channel).

### The green LED never starts blinking

The unit has not finished calibrating. On a **V2.2** this takes about 18 seconds, which is long enough to look like a hang if you are expecting the V2.1's 4-second sequence. If it stays in that state well beyond it, treat it as a fault and raise a ticket.

### The fan is not running and the unit is getting hot

The fan is tied to the 12 V channel. If that channel is switched off, the fan will not run regardless of temperature.

### A channel keeps cutting out under load

The isolated 5 V and 12 V outputs are protected by resettable fuses, which cut and re-close rather than failing permanently — so an over-current shows up as an intermittent load, not a dead rail. Check the draw against the ratings in [Specifications](#specifications), remembering that channels on the same port share that port's budget.

## Support

Collect the hardware revision (V2.1 or V2.2), firmware version and logs before raising a ticket — [Before you contact us](/support/before-you-contact-us) lists what helps and includes the commands to gather it.

- [Support centre](/support/intro) — all support resources
- [Warranty and RMA](/support/warranty-and-rma) — repairs, replacements and returns
