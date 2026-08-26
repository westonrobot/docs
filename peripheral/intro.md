---
sidebar_position: 1
description: "Peripherals for Weston Robot platforms: onboard computers, network devices, power modules and sensors."
---

# Peripherals

Components that mount on, or connect to, a robot platform. Each has been tested for compatibility with our platforms.

If you are holding a board and are not sure which one it is, match it to a picture below — the model names are not printed on most of them.

## Onboard computers

<ProductGrid columns={3}>

<ProductCard to="/peripheral/computer/nanopc" src={require('./img/westonrobot/nanopc_sbc.jpg').default} alt="NanoPC-based onboard computer" title="NanoPC">Rockchip RK3588 with 3× CAN, 2× RS485 and 2× RS232 broken out. The usual choice for talking to a robot base.</ProductCard>

<ProductCard to="/peripheral/computer/j4012" src={require('./img/westonrobot/j4012.png').default} alt="reComputer Industrial J4012 edge AI computer" title="reComputer J4012">Jetson Orin NX 16GB in a fanless enclosure. Fit this when the workload needs a GPU.</ProductCard>

<ProductCard to="/peripheral/computer/cm4" src={require('./img/westonrobot/cm4_sbc.jpg').default} alt="CM4-based onboard computer" title="CM4">Raspberry Pi CM4 with CAN and RS485 added. The compact option for lighter workloads.</ProductCard>

</ProductGrid>

## Networking

<ProductGrid columns={3}>

<ProductCard to="/peripheral/network/industrial_5g_router" src={require('./img/westonrobot/5g_router/industrial_5g_wifi_router.jpg').default} alt="Industrial 5G and WiFi router" title="Industrial 5G / WiFi router">Cellular and WiFi for robots working away from a fixed network. Dual SIM.</ProductCard>

</ProductGrid>

## Power

<ProductGrid columns={3}>

<ProductCard to="/peripheral/power/power_regulator_v2" src={require('./img/westonrobot/regulator_v2.jpg').default} alt="Power Regulator v2" title="Power Regulator v2.X">Switchable, regulated output rails for powering payloads from the robot's battery.</ProductCard>

</ProductGrid>

## Sensors

<ProductGrid columns={3}>

<ProductCard to="/peripheral/sensor/manifold_pocket" src={require('./img/manifold/pocket.png').default} alt="Manifold Pocket Scanner" title="Manifold Pocket Scanner">Handheld LiDAR and camera unit for 3D capture alongside a robot deployment.</ProductCard>

</ProductGrid>

---

Peripherals bundled as part of a complete kit are documented under [Systems](/system/intro). The platforms these attach to are under [Robots](/robot/intro).
