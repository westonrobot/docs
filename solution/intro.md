---
sidebar_position: 1
description: "Weston Robot solutions: complete capabilities deployed on supported robot platforms."
---

# Solutions

A solution is a complete capability we develop and deploy on top of a robot platform, rather than a component you integrate yourself. Each runs on a defined set of platforms and comes with its own setup, configuration and version history.

If you are looking for the robot itself, see [Robots](/robot/intro). If you are looking for a task guide, see [Guides](/tutorial/intro).

## Available now

<ProductGrid columns={3}>

<ProductCard to="/solution/adt/intro" src={require('./adt/img/adt/adt_v3_04.png').default} alt="Assisted Driving Toolbox teleoperation panel" title="Assisted Driving Toolbox">Teleoperation over a shared network, with camera coverage of the robot's surroundings. Three versions in service.</ProductCard>

</ProductGrid>

## In development

Our **industrial patrolling and inspection** platform is in development, documented as three components: the **Fleet Management System** you plan and operate missions from, the **Deployment Toolbox** that turns a site scan into the map robots navigate by, and **Analytics Integration** for connecting detection algorithms. A working deployment needs all three.

Documentation for each will appear here as it becomes available, and pilot customers will be given direct links ahead of general release.

In the meantime, the navigation and mapping material that exists today lives under Guides:

- [Cartographer and RTAB-Map mapping with Nav2](/system/ugv_devkit/v1/nav2_sample_setup_guide) on the UGV Development Kit
- [Unitree SLAM on the Go2 and Go2-W](/tutorial/unitree/go2_slam)

## What each solution page covers

Solution pages take one of two shapes, depending on what the solution is.

**A tool you install and run** — such as the Assisted Driving Toolbox — follows the product-page structure: what you need and how to install it, key information and supported platforms, day-to-day operation, known limitations, troubleshooting, support. Where several versions are in service, those are **tabs on one page** rather than separate pages, so shared instructions are written once and the differences are visible side by side.

**A system we deploy and you operate** is documented rather than summarised. Its sections are named for what they explain — how the pieces fit together, who may do what, what happens during a mission — because the point is to understand how the system behaves, not to look a single fact up. Every page of either kind ends with known limitations and how to reach us.
