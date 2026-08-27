---
sidebar_position: 1
description: "Weston Robot solutions: complete capabilities deployed on supported robot platforms."
---

# Solutions

A solution is a complete capability we develop and deploy on top of a robot platform, rather than a component you integrate yourself. Each runs on a defined set of platforms and comes with its own setup, configuration and version history.

If you are looking for the robot itself, see [Robots](/robot/intro). If you are looking for a task guide, see [Guides](/tutorial/intro).

## Industrial patrolling and inspection

Our patrolling and inspection platform has three components, and a working deployment needs all three: the **Fleet Management System** you plan and operate missions from, the **Deployment Toolbox** that turns a site scan into the map robots navigate by, and **Analytics Integration** for connecting detection algorithms.

Two of the three are documented now. They are not yet listed in the sidebar or in search, so these cards are the way in.

<ProductGrid columns={3}>

<ProductCard to="/solution/fleet-management" src={require('./img/fleet-dashboard.png').default} alt="Fleet Management dashboard showing sites and robots with status" title="Fleet Management System">Plan, dispatch, watch and review missions from a browser. The part your operators use every day.</ProductCard>

<ProductCard to="/solution/deployment-toolbox" src={require('./img/toolbox-finished-map.png').default} alt="A finished site map with waypoints, segments and zones" title="Deployment Toolbox">Turn a 3D scan of a site into the map robots navigate by. Used once per site, before any robot runs there.</ProductCard>

</ProductGrid>

**Analytics Integration** is not documented yet. Its page will appear here when it is.

Navigation and mapping material that exists today lives under Guides:

- [Cartographer and RTAB-Map mapping with Nav2](/system/ugv_devkit/v1/nav2_sample_setup_guide) on the UGV Development Kit
- [Unitree SLAM on the Go2 and Go2-W](/tutorial/unitree/go2_slam)

## Retired

The **[Assisted Driving Toolbox](/solution/adt/intro)** has been withdrawn and is no longer developed or supported. Teleoperation is now part of the Fleet Management System. Its page is kept so existing links still lead somewhere, and for anyone still running it.

## What each solution page covers

A solution is a system we deploy and you operate, so its page is documented rather than summarised. Sections are named for what they explain — how the pieces fit together, who may do what, what happens during a mission — because the point is to understand how the system behaves, not to look a single fact up. Every page ends with known limitations and how to reach us.

The retired Assisted Driving Toolbox page follows an older shape, built around installing and running a client, with its versions as tabs on one page.
