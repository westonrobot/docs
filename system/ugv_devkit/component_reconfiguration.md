---
sidebar_position: 2
description: "Open the UGV Development Kit frame and reconfigure or remount the components inside it."
---

# Component re-configuration

How to get inside the [UGV Development Kit](/system/ugv_devkit) to add, move or service the components it carries. The procedure is the same on both generations except where marked — **v1.1 adds removable side doors**, which the v1.0 frame does not have.

:::warning Disconnect before sliding the rack out

Remove power cables and connectivity ports before sliding the hardware rack out.
The rack moves further than the cable slack allows, and the connectors take the load.

:::

## Main frame

The frame is what everything mounts to, and what determines where an added component can go.

<Tabs groupId="devkit-generation">
<TabItem value="v11" label="v1.1" default>

<FigureGrid columns={2}>
  <Figure
    src={require('./img/devkit_views_standard.png').default}
    alt="UGV Devkit v1.1 standard configuration, isometric with front and side views"
    framed
    caption="Standard kit." />
  <Figure
    src={require('./img/devkit_views_extension.png').default}
    alt="UGV Devkit v1.1 with the extension layer, isometric with front and side views"
    framed
    caption="With the extension layer." />
</FigureGrid>

</TabItem>
<TabItem value="v10" label="v1.0">

<FigureGrid columns={2}>
  <Figure
    src={require('./img/base_iso.png').default}
    alt="UGV Devkit v1.0 main frame, isometric view"
    framed
    caption="Main frame." />
  <Figure
    src={require('./img/dimensions.png').default}
    alt="UGV Devkit v1.0 main frame dimensions"
    framed
    caption="Frame dimensions." />
</FigureGrid>

</TabItem>
</Tabs>

## Removing the front and rear latches

Identical on both generations:

1. Remove the fasteners — **2 × M5 bolts** — from the top of the case.
2. Tilt the latch outwards.
3. Lift the latch to separate it from the main frame.

<Tabs groupId="devkit-generation">
<TabItem value="v11" label="v1.1" default>

<Figure
  src={require('./img/v1.1/front_plate2.png').default}
  alt="Front latch separated from the main frame"
  size="lg"
  framed />

</TabItem>
<TabItem value="v10" label="v1.0">

<Figure
  src={require('./img/front_plate.png').default}
  alt="Front latch separated from the main frame"
  size="lg"
  framed />

</TabItem>
</Tabs>

## Accessing the components

Internal hardware and wiring can be reached either from the side, or by sliding the hardware rack out.

**To slide out the hardware rack:**

1. Remove the locking thumb screw.
2. Slide the rack out — after disconnecting cables, per the warning above.

<Tabs groupId="devkit-generation">
<TabItem value="v11" label="v1.1" default>

<Figure
  src={require('./img/v1.1/rails2.png').default}
  alt="Hardware rack slid out on its rails"
  size="lg"
  framed
  caption="Hardware rack on its rails." />

**To remove a side door** — v1.1 only:

1. Remove the locking thumb screws.
2. Lift the door away.

<Figure
  src={require('./img/side_doors.png').default}
  alt="Side door removed from the main frame"
  size="lg"
  framed
  caption="Side door removed." />

</TabItem>
<TabItem value="v10" label="v1.0">

<Figure
  src={require('./img/rails.png').default}
  alt="Hardware rack slid out on its rails"
  size="lg"
  framed
  caption="Hardware rack on its rails." />

The v1.0 frame has no removable side doors — access is through the open sides or by sliding the rack out.

</TabItem>
</Tabs>

## Support

- [UGV Development Kit](/system/ugv_devkit) — the product page
- [Before you contact us](/support/before-you-contact-us) — what to collect before raising a ticket
