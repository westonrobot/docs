---
sidebar_position: 1
description: "Robot platforms supported by Weston Robot: UGVs, quadrupeds, humanoids and manipulators."
---

# Robots

Pick the platform you are working with. Each page covers setup, logins and interfaces, the guides we publish for it, and how to reach support.

:::warning Read the safety guidance before operating any platform

These are powered machines that can injure people and damage themselves. Read
[Operational Safety](/tutorial/operational-safety) and the manufacturer's documentation,
and make sure operators are trained, before the first power-on. Legged platforms in
particular can fall without warning during development.

:::

## UGVs

<ProductGrid columns={3}>

<ProductCard to="/robot/ugv/scout-mini" src={require('./img/agilex/scout_mini.png').default} alt="Scout Mini four-wheel UGV" title="Scout Mini">Compact four-wheel skid-steer base for indoor and light outdoor work.</ProductCard>

<ProductCard to="/robot/ugv/ranger-mini-v3" src={require('./img/agilex/ranger_mini_v3.png').default} alt="Ranger Mini V3 four-wheel-steering UGV" title="Ranger Mini V3">Four-wheel-steering base with omnidirectional modes.</ProductCard>

</ProductGrid>

## Quadrupeds

<ProductGrid columns={3}>

<ProductCard to="/robot/quadruped/go2" src={require('./img/unitree/Go2_robot.png').default} alt="Unitree Go2 quadruped" title="Go2">Compact quadruped supplied as a development platform, with LiDAR and an expansion dock.</ProductCard>

<ProductCard to="/robot/quadruped/b2" src={require('./img/unitree/B2_robot.png').default} alt="Unitree B2 industrial quadruped" title="B2">Large industrial quadruped for payload-carrying and outdoor inspection.</ProductCard>

<ProductCard to="/robot/quadruped/a2" title="A2">Unitree's A2 quadruped. Documentation in preparation.</ProductCard>

<ProductCard to="/robot/quadruped/as2" title="As2">Unitree's compact industrial quadruped. Documentation in preparation.</ProductCard>

</ProductGrid>

## Humanoids

<ProductGrid columns={3}>

<ProductCard to="/robot/humanoid/g1" src={require('./img/unitree/G1_robot.png').default} alt="Unitree G1 humanoid" title="G1">Full-size bipedal humanoid. The most thoroughly documented platform on this site.</ProductCard>

<ProductCard to="/robot/humanoid/h1-2" src={require('./img/unitree/H1-2_robot.png').default} alt="Unitree H1-2 humanoid" title="H1-2">180 cm general-purpose humanoid, an upgrade of the original H1.</ProductCard>

<ProductCard to="/robot/humanoid/r1" title="R1">Unitree's R1 humanoid. Documentation in preparation.</ProductCard>

<ProductCard to="/robot/humanoid/h2" title="H2">Unitree's full-size H2 humanoid. Documentation in preparation.</ProductCard>

</ProductGrid>

## Manipulators

<ProductGrid columns={3}>

<ProductCard to="/robot/manipulator/wr65" src={require('./img/realman/wr65.png').default} alt="WR65 six-axis manipulator" title="WR65">Ultralightweight 6-DOF arm, 5 kg payload. OEM Realman RM65.</ProductCard>

<ProductCard to="/robot/manipulator/wrl63" src={require('./img/realman/wrl63.png').default} alt="WRL63 long-reach six-axis manipulator" title="WRL63">Long-reach 6-DOF arm, 900 mm radius, 3 kg payload. OEM Realman RML63.</ProductCard>

<ProductCard to="/robot/manipulator/xarm" src={require('./img/ufactory/xarm.png').default} alt="UFactory xArm manipulator" title="xArm">UFactory's industrial arm family, in 5, 6 and 7-axis variants.</ProductCard>

<ProductCard to="/robot/manipulator/z1" src={require('./img/unitree/z1_arm.png').default} alt="Unitree Z1 manipulator" title="Z1">Unitree's 6-DOF arm, sized for mounting on their quadrupeds.</ProductCard>

<ProductCard to="/robot/manipulator/piper" src={require('./img/agilex/piper.png').default} alt="AgileX Piper manipulator" title="Piper">AgileX's lightweight 6-DOF arm for research and light handling.</ProductCard>

<ProductCard to="/robot/manipulator/kinova-gen3-lite" src={require('./img/kinova/kinova-gen3-lite.jpg').default} alt="Kinova Gen3 Lite manipulator" title="Kinova Gen3 Lite">Kinova's compact 6-DOF research arm.</ProductCard>

</ProductGrid>

---

Components that mount on these platforms are under [Peripherals](/peripheral/intro). Complete kits are under [Systems](/system/intro).
