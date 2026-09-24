---
sidebar_position: 1
description: "Weston Robot solutions: complete capabilities deployed on supported robot platforms."
---

# Solutions

A solution is a complete capability we build and deploy on a robot platform, rather than a component you integrate yourself. Each runs on a defined set of robots, and we set it up at your site for your team to operate.

## Industrial patrolling and inspection

**Autonomous patrolling with event reporting.** A robot walks a set route on a schedule, with nobody driving it. When it sees something that matters — smoke, a blocked exit, someone where they should not be — it raises an event, kept with its image and the time, so it can be reviewed afterwards or shown to someone else. People set the routes, watch live when they want to, and go through what came back.

Three parts make that work, and a deployment needs all three. The **Robot Platforms** are the robots themselves — quadrupeds with our payload integrated onto them, which is what goes to the site and carries out the missions. The **Robot Deployment Toolbox** prepares a site once, turning a 3D scan of the building into the map robots navigate by. The **Robot Management Toolbox** is what the site is then run from, every day after that.

<ProductGrid columns={3}>

<ProductCard to="/solution/robot-platforms" src={require('./img/platform-robots.png').default} alt="Three quadruped robots side by side, each carrying a Weston Robot payload enclosure" title="Robot Platforms">The robots we integrate and deliver. Which bases are supported, what each carries, and where a platform can work.</ProductCard>

<ProductCard to="/solution/robot-deployment-toolbox" src={require('./img/toolbox-load-fleet.jpg').default} alt="The Map Editor with a colour 3D scan of an office loaded, ready to have a map drawn onto it" title="Robot Deployment Toolbox">Turn a 3D scan of a site into the map robots navigate by. Used once per site, before any robot runs there.</ProductCard>

<ProductCard to="/solution/robot-management-toolbox" src={require('./img/fleet-cover.jpg').default} alt="The robot dashboard: the site map with the robot's route drawn over the building, live camera feeds, telemetry and the control panel on one screen" title="Robot Management Toolbox">Plan, dispatch, watch and review missions from a browser. The part your operators use every day.</ProductCard>

</ProductGrid>
