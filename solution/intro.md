---
sidebar_position: 1
description: "Weston Robot solutions: complete capabilities deployed on supported robot platforms."
---

# Solutions

A solution is a complete capability we develop and deploy on top of a robot platform, rather than a component you integrate yourself. Each runs on a defined set of platforms and comes with its own setup, configuration and version history.

If you are looking for the robot itself, see [Robots](/robot/intro). If you are looking for a task guide, see [Guides](/tutorial/intro).

## Industrial patrolling and inspection

Robots patrol a site on a schedule and report what they find; people plan the work and review the results from a browser.

Three parts make that work, and a deployment needs all three. The **Fleet Management System** is where missions are planned, dispatched and watched, and where everything the robots detect is kept. The **Deployment Toolbox** prepares a site before any robot drives it, turning a 3D scan into the map they navigate by. **Analytics Integration** connects the algorithms that decide what is worth reporting — ours running on the robot, or a partner's running elsewhere.

<ProductGrid columns={3}>

<ProductCard to="/solution/fleet-management" src={require('./img/fleet-dashboard.png').default} alt="Fleet Management dashboard showing sites and robots with status" title="Fleet Management System">Plan, dispatch, watch and review missions from a browser. The part your operators use every day.</ProductCard>

<ProductCard to="/solution/deployment-toolbox" src={require('./img/toolbox-finished-map.png').default} alt="A finished site map with waypoints, segments and zones" title="Deployment Toolbox">Turn a 3D scan of a site into the map robots navigate by. Used once per site, before any robot runs there.</ProductCard>

</ProductGrid>

## Retired

The **[Assisted Driving Toolbox](/solution/adt/intro)** has been withdrawn and is no longer developed or supported. Teleoperation is now part of the Fleet Management System. Its page is kept so existing links still lead somewhere, and for anyone still running it.
