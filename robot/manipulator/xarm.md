---
sidebar_position: 3
---

# xArm

## 1. Overview
The xArm is a multi-DOF robot arm manipulator with use cases ranging from machine tending to industrial automation.

## 2. Specifications

### Common Technical Specifications

| Specification | Value |
| --- | --- |
| Ambient Temperature Range | 0 - 50 ℃ |
| Power Consumption | Min 8.4 W, Typical 200 W, Max 400 W |
| Input Power Supply | 24V DC, 16.5A |
| Footprint | Ø 126 mm |
| Materials | Aluminum, Carbon Fiber |
| Base Connector Type | M5 x 5 |
| ISO Class Cleanroom | 5 |
| End Effector Communication Protocol | Modbus RTU (RS485) |
| End Effector I/O | 2 x DI / 2 x DO / 2 x AI / 1 x RS485 |
| Communication Mode | Ethernet |

### Specific Technical Specifications

| | xArm 5 | xArm 6 | xArm 7 |
| --- | --- | --- | --- |
| Payload | 3kg | 5kg | 3.5kg |
| Reach | 700mm | 700mm | 700mm |
| Degrees of Freedom | 5 | 6 | 7 |
| Repeatability | ±0.1mm | ±0.1mm | ±0.1mm |
| Maximum Speed | 1m/s | 1m/s | 1m/s |
| Weight(robot arm only) | 11.2kg | 12.2kg | 13.7kg |

### Joint Limits

| | xArm 5 | xArm 6 | xArm 7 |
| --- | --- | --- | --- |
| Maximum Speed | 180°/s | 180°/s | 180°/s |
| Joint 1 | ±360° | ±360° | ±360° |
| Joint 2 | -118° - 120° | -118° - 120° | -118° - 120° |
| Joint 3 | -225° - 11° | -225° - 11° | ±360° |
| Joint 4 | -97° - 180° | ±360° | -11° - 225° |
| Joint 5 | ±360° | -97° - 180° | ±360° |
| Joint 6 | NA | ±360° | -97° - 180° |
| Joint 7 | NA | NA | ±360° |

## 3. Resources

* Manuals, Software, 3D models: [xArm Download Page](https://www.ufactory.cc/download-xarm-robot)
* Python SDK: [xArm-Python-SDK](https://github.com/xArm-Developer/xArm-Python-SDK)
* C++ SDK: [xArm-CPLUS-SDK](https://github.com/xArm-Developer/xArm-CPLUS-SDK)
* ROS package: [xarm_ros](https://github.com/xArm-Developer/xarm_ros)
* ROS2 package: [xarm_ros2](https://github.com/xArm-Developer/xarm_ros2)
