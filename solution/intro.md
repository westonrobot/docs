---
sidebar_position: 1
description: "Weston Robot solutions: complete capabilities deployed on supported robot platforms."
---

# Solutions

A solution is a complete capability we develop and deploy on top of a robot platform, rather than a component you integrate yourself. Each runs on a defined set of platforms and comes with its own setup, configuration and version history.

If you are looking for the robot itself, see [Robots](/robot/intro). If you are looking for a task guide, see [Guides](/tutorial/intro).

## Industrial patrolling and inspection

Robots patrol a site on a schedule and report what they find, while people plan the work and review the results from a browser. Two tools make that possible and a deployment needs both: the **Fleet Management System**, where missions are planned, dispatched and watched and where everything the robots detect is kept, and the **Deployment Toolbox**, which turns a 3D scan of a site into the map the robots navigate by. What counts as worth reporting is decided by detection algorithms, ours running on the robot or a partner's running alongside it, and their results arrive in the same place.

<ProductGrid columns={3}>

<ProductCard to="/solution/fleet-management" src={require('./img/fleet-dashboard.png').default} alt="Fleet Management dashboard showing sites and robots with status" title="Fleet Management System">Plan, dispatch, watch and review missions from a browser. The part your operators use every day.</ProductCard>

<ProductCard to="/solution/deployment-toolbox" src={require('./img/toolbox-finished-map.png').default} alt="A finished site map with waypoints, segments and zones" title="Deployment Toolbox">Turn a 3D scan of a site into the map robots navigate by. Used once per site, before any robot runs there.</ProductCard>

</ProductGrid>

## Retired

The **[Assisted Driving Toolbox](/solution/adt/intro)** has been withdrawn and is no longer developed or supported. Teleoperation is now part of the Fleet Management System. Its page is kept so existing links still lead somewhere, and for anyone still running it.
