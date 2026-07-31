---
sidebar_position: 1
description: "Assisted Driving Toolbox: teleoperation for Weston Robot mobile platforms — setup, operation and versions."
---

# Assisted Driving Toolbox

Teleoperation for mobile robot platforms, developed by Weston Robot. It lets an operator drive a robot over a shared network while watching its surroundings through the robot's onboard cameras.

**Three generations are in service and their client software differs.** The quickest way to tell which you have is the package name — `wr_assisted_teleop` is v1, `wr-ad-toolbox` is v2, `wr-mission-control` is v3. Every section below is tabbed by version, and the tabs are linked, so choosing one here selects it throughout the page.

<Tabs groupId="adt-version">
<TabItem value="v3" label="v3" default>

<Figure
  src={require('./img/adt/adt_v3_04.png').default}
  alt="ADT v3 teleoperation panel showing a live camera view of a quadruped robot"
  framed
  caption="The v3 teleoperation panel." />

</TabItem>
<TabItem value="v2" label="v2">

<Figure
  src={require('./img/adt/adt_v2_05.png').default}
  alt="ADT v2 teleoperation panel with its controls annotated"
  framed
  caption="The v2 teleoperation panel, annotated." />

</TabItem>
<TabItem value="v1" label="v1">

<Figure
  src={require('./img/adt/adt_01.png').default}
  alt="ADT v1 client showing a camera view with speed and joystick gauges"
  framed
  caption="The v1 client." />

</TabItem>
</Tabs>

## Getting started

<Tabs groupId="adt-version">
<TabItem value="v3" label="v3" default>

**You need**

1. A host computer running **Ubuntu 22.04**
2. A joystick or gamepad
3. A network shared between the robot and the host computer

**Install the client**

Add our package repository first — see [Weston Robot Apt Source](/tutorial/installation/apt_source) — then:

```bash
sudo apt-get update
sudo apt-get install wr-mission-control
```

:::note

Additional third-party dependencies may be pulled in during installation.

:::

**First run**

Press the Windows key and search for **WR Mission Control**, then open it.

<FigureGrid columns={2}>
  <Figure src={require('./img/adt/adt_v3_01.png').default} alt="Launching the ADT v3 client from the application menu" framed caption="Launching the client." />
  <Figure src={require('./img/adt/adt_v3_02.png').default} alt="ADT v3 client start screen" framed caption="The start screen." />
</FigureGrid>

Click **Login**. A browser window opens for your credentials:

<Figure src={require('./img/adt/adt_v2_03.png').default} alt="ADT login page in a browser window" size="lg" framed />

After logging in, choose the robot you want to control:

<Figure src={require('./img/adt/adt_v3_03.png').default} alt="ADT v3 robot selection screen" size="lg" framed />

</TabItem>
<TabItem value="v2" label="v2">

**You need**

1. A host computer running **Ubuntu 20.04 or 22.04**
2. A joystick or gamepad
3. A network shared between the robot and the host computer

**Install the client**

Add our package repository first — see [Weston Robot Apt Source](/tutorial/installation/apt_source) — then:

```bash
sudo apt-get update
sudo apt-get install wr-ad-toolbox
```

**Install the TLS certificates**

v2 requires certificates to secure the connection between client and robot. **This step does not exist in v3.** You should have received a password-protected zip from us containing them.

1. Extract the zip somewhere convenient.
2. Open a terminal in that directory.
3. Run:

    ```bash
    sudo ./install_certificates.sh
    ```

**First run**

Press the Windows key and search for **WR Assisted Driving Toolbox**, then open it.

<FigureGrid columns={2}>
  <Figure src={require('./img/adt/adt_v2_01.png').default} alt="Launching the ADT v2 client from the application menu" framed caption="Launching the client." />
  <Figure src={require('./img/adt/adt_v2_02.png').default} alt="ADT v2 client start screen" framed caption="The start screen." />
</FigureGrid>

Click **Login**. A browser window opens for your credentials:

<Figure src={require('./img/adt/adt_v2_03.png').default} alt="ADT login page in a browser window" size="lg" framed />

After logging in, choose the robot you want to control:

<Figure src={require('./img/adt/adt_v2_04.png').default} alt="ADT v2 robot selection screen" size="lg" framed />

On first use the settings menu opens automatically so you can configure the joystick and cameras.

</TabItem>
<TabItem value="v1" label="v1">

v1 is the original generation and differs from v2 and v3 in an important way: **it runs a server on the robot that you may need to manage**, and the client is pointed at that server by IP address rather than by logging in and picking a robot.

**You need**

1. A host computer running **Ubuntu 18.04 or 20.04**
2. A joystick for control
3. A network shared between the robot and the host computer

**The server on the robot**

The ADT server is installed as a systemd service and starts with the robot:

```bash
sudo systemctl restart wr_adt_server.service     # restart
sudo systemctl stop wr_adt_server.service        # stop until next boot
sudo systemctl enable wr_adt_server.service      # start on boot
sudo systemctl disable wr_adt_server.service     # do not start on boot
```

Video streaming is configured in two files on the robot:

| File | Sets |
| --- | --- |
| `/opt/weston_robot/docker/wr_adt_server/config.yaml` | Image resolution, compression rate, video stream endpoints |
| `/opt/weston_robot/docker/wr_adt_server/docker-compose.yaml` | Streaming IP address |

Both carry comments describing the available options.

**Install the client**

```bash
sudo apt-get install libglfw3-dev libyaml-cpp-dev libopencv-dev
sudo apt-get update
sudo apt-get install wr_assisted_teleop
```

Add `/opt/weston_robot/bin` to your path, then start the client:

```bash
echo 'export PATH=/opt/weston_robot/bin:$PATH' >> ~/.bashrc
wr_assisted_teleop
```

:::caution Get the robot's address before you start

The v1 client is configured with the robot's **`wlan0` IP address** rather than by
selecting a robot from a list. Retrieve it before you open the client, or the
first-run settings dialogue will have nothing useful to put in it.

:::

</TabItem>
</Tabs>

## Key information

### Related resources

| Resource | What it is | Where |
| --- | --- | --- |
| Package repository | Required before installing any version | [Weston Robot Apt Source](/tutorial/installation/apt_source) |

### Versions

| | v1 | v2 | v3 |
| --- | --- | --- | --- |
| Package | `wr_assisted_teleop` | `wr-ad-toolbox` | `wr-mission-control` |
| Application name | Assisted Driving Toolbox | WR Assisted Driving Toolbox | WR Mission Control |
| Host OS | Ubuntu 18.04 / 20.04 | Ubuntu 20.04 / 22.04 | Ubuntu 22.04 |
| Connecting to a robot | By IP address and port | Log in, then select a robot | Log in, then select a robot |
| TLS certificates | — | **Required**, installed separately | Not required |
| Server management | On the robot, by you | — | — |
| Settings button | Bottom right | Bottom right | Left side |

The practical difference: **v1 is configured against one robot's address**, so moving between robots means changing settings. v2 and v3 authenticate you and then offer the robots you have access to. v3 additionally drops the separate TLS certificate step.

## Using it

### Teleoperation panel

The main control interface: drive the robot, and watch its surroundings through the onboard cameras in real time.

<Tabs groupId="adt-version">
<TabItem value="v3" label="v3" default>

<Figure src={require('./img/adt/adt_v3_04.png').default} alt="ADT v3 teleoperation panel" framed />

</TabItem>
<TabItem value="v2" label="v2">

<Figure src={require('./img/adt/adt_v2_05.png').default} alt="ADT v2 teleoperation panel with annotated controls" framed />

</TabItem>
<TabItem value="v1" label="v1">

The v1 client shows the state of the control and video streaming servers, the camera streams, and gauges for the joystick, obstacle detection, speed and battery.

<FigureGrid columns={2}>
  <Figure src={require('./img/adt/adt_02.png').default} alt="Service status icons showing the servers online" framed caption="Servers online." />
  <Figure src={require('./img/adt/adt_03.png').default} alt="Service status icons showing the servers offline" framed caption="Servers offline." />
</FigureGrid>

Camera streams are enabled automatically once configured; toggle them individually here:

<Figure src={require('./img/adt/adt_04.png').default} alt="Camera stream toggle buttons" size="lg" framed />

Control is **disabled by default**. Use these to enable it and to check the attached joystick:

<Figure src={require('./img/adt/adt_05.png').default} alt="Control toggle and joystick status buttons" size="lg" framed />

:::warning Check the joystick before enabling control

Set height to the neutral position (50 %) and confirm the joystick behaves as
expected **before** enabling control, or the robot may move suddenly.

:::

<FigureGrid columns={3}>
  <Figure src={require('./img/adt/adt_06.png').default} alt="Joystick gauge showing the current joystick state" framed caption="Joystick gauge." />
  <Figure src={require('./img/adt/adt_07.png').default} alt="Obstacle detection gauge showing range finder feedback" framed caption="Obstacle detection, where range finders are fitted." />
  <Figure src={require('./img/adt/adt_08.png').default} alt="Speed and battery gauges" framed caption="Speed and battery." />
</FigureGrid>

</TabItem>
</Tabs>

### Settings

<Tabs groupId="adt-version">
<TabItem value="v3" label="v3" default>

Joystick and camera settings, reached from the **gear icon on the left side** of the client.

<Figure src={require('./img/adt/adt_v3_05.png').default} alt="ADT v3 settings menu" size="lg" framed />

</TabItem>
<TabItem value="v2" label="v2">

Joystick and camera settings, reached from the **gear icon in the bottom right corner** of the client.

<Figure src={require('./img/adt/adt_v2_06.png').default} alt="ADT v2 settings menu" size="lg" framed />

</TabItem>
<TabItem value="v1" label="v1">

On first startup a settings dialogue prompts for the values the client needs:

* Control server IP address and port
* Streaming server IP address and port
* Joystick mapping

<Figure src={require('./img/adt/adt_09.png').default} alt="ADT v1 first-run settings dialogue" size="lg" framed />

Afterwards, reach settings from the button at the **bottom right** of the client:

<Figure src={require('./img/adt/adt_10.png').default} alt="ADT v1 settings button" size="lg" framed />

The server addresses correspond to the robot's `wlan0` interface by default:

<Figure src={require('./img/adt/adt_11.png').default} alt="ADT v1 server address and port settings" size="lg" framed />

Joystick axes map as follows:

| Axis | Movement |
| --- | --- |
| Linear X | Forward and reverse |
| Linear Y | Side to side |
| Linear Z | Body height |
| Angular X | Body roll |
| Angular Y | Body pitch |
| Angular Z | Yaw |

<Figure src={require('./img/adt/adt_12.png').default} alt="ADT v1 joystick mapping settings, configured for a Logitech Extreme 3D Pro" size="lg" framed caption="An example mapping for a Logitech Extreme 3D Pro." />

</TabItem>
</Tabs>

### Manual control with a wireless gamepad

At least one controller must be connected before you can drive the robot.

<Tabs groupId="adt-version">
<TabItem value="v3" label="v3" default>

Pairing a PS4 gamepad over Bluetooth:

1. Open **Bluetooth Settings** from the toolbar menu in the top right of the screen.

    <Figure src={require('./img/adt/adt_v2_07.png').default} alt="Ubuntu Bluetooth settings window" size="lg" framed />

2. Put the controller into pairing mode by **holding the PlayStation button and Share button together** until its LED flashes blue.

    <Figure src={require('./img/adt/adt_v2_08.png').default} alt="PS4 controller in Bluetooth pairing mode" size="lg" framed />

3. Find **Wireless Controller** in the Bluetooth list and connect to it.

    <Figure src={require('./img/adt/adt_v2_09.png').default} alt="Connecting to the wireless controller in Bluetooth settings" size="lg" framed />

4. On success the controller LED turns **solid blue** and this icon appears in the teleoperation panel.

    <Figure src={require('./img/adt/adt_v3_06.png').default} alt="Connected controller icon in the ADT v3 teleoperation panel" size="lg" framed />

5. Request control from the robot with the toggle switch.

    :::caution

    Check your joystick settings before requesting control.

    :::

    <Figure src={require('./img/adt/adt_v3_07.png').default} alt="Control request toggle in the ADT v3 teleoperation panel" size="lg" framed />

6. Once you have control:

    * **Left stick** — forward and backward
    * **Right stick** — rotate left and right

    <Figure src={require('./img/adt/adt_v2_12.png').default} alt="Joystick control directions" size="lg" framed />

</TabItem>
<TabItem value="v2" label="v2">

Pairing a PS4 gamepad over Bluetooth:

1. Open **Bluetooth Settings** from the toolbar menu in the top right of the screen.

    <Figure src={require('./img/adt/adt_v2_07.png').default} alt="Ubuntu Bluetooth settings window" size="lg" framed />

2. Put the controller into pairing mode by **holding the PlayStation button and Share button together** until its LED flashes blue.

    <Figure src={require('./img/adt/adt_v2_08.png').default} alt="PS4 controller in Bluetooth pairing mode" size="lg" framed />

3. Find **Wireless Controller** in the Bluetooth list and connect to it.

    <Figure src={require('./img/adt/adt_v2_09.png').default} alt="Connecting to the wireless controller in Bluetooth settings" size="lg" framed />

4. On success the controller LED turns **solid blue** and this icon appears in the teleoperation panel.

    <Figure src={require('./img/adt/adt_v2_10.png').default} alt="Connected controller icon in the ADT v2 teleoperation panel" size="lg" framed />

5. Request control from the robot with the toggle switch.

    :::caution

    Check your joystick settings before requesting control.

    :::

    <Figure src={require('./img/adt/adt_v2_11.png').default} alt="Control request toggle in the ADT v2 teleoperation panel" size="lg" framed />

6. Once you have control:

    * **Left stick** — forward and backward
    * **Right stick** — rotate left and right

    <Figure src={require('./img/adt/adt_v2_12.png').default} alt="Joystick control directions" size="lg" framed />

</TabItem>
<TabItem value="v1" label="v1">

v1 uses a joystick configured through the settings dialogue rather than a paired gamepad flow — see [Settings](#settings) for the axis mapping, and set it before enabling control.

</TabItem>
</Tabs>

## Troubleshooting & FAQ

### The client shows the servers as offline

Check that the robot and host computer are on the same network, and — on v1 — that `wr_adt_server.service` is running on the robot. See [Getting started](#getting-started).

### The robot does not move when I use the joystick

Control is disabled by default and has to be requested or toggled on. Confirm the joystick is detected and mapped correctly first; on v1 the gauge in the client shows its live state.

### I do not know which version I have

Check the installed package: `wr_assisted_teleop` is v1, `wr-ad-toolbox` is v2, `wr-mission-control` is v3. See [Versions](#versions).

## Support

Tell us which ADT version you are running and which robot you were connecting to — [Before you contact us](/support/before-you-contact-us) lists what else helps.

[Submit a support request](https://forms.office.com/r/qELKzYF33W).
