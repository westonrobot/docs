---
sidebar_position: 4
description: "Kinova Gen3 Lite manipulator: specifications, interfaces and resources."
---

import kinova_IMG from '../img/kinova/kinova-gen3-lite.jpg';

# Kinova Gen3 Lite

## Overview

<img src={kinova_IMG} alt="Kinova Gen3 Lite" style={{width: 350}} />

The Kinova Gen3 Lite is a lightweight robotic manipulator designed for education, research, and light industrial tasks.

## Specifications

## ⚙️ General Specifications

| Parameter | Value |
|------------|--------|
| **Weight** | 5.4 kg |
| **Payload** | 500 g |
| **Maximum Reach** | 760 mm |
| **Degrees of Freedom** | 6 |
| **Maximum Translation Speed** | 25 cm/s |
| **Joint Range** | ± 155° to 160° |
| **Power Supply** | 18 – 30 VDC (24 V nominal) |
| **Average Power** | 20 W |
| **Ingress Protection** | IP22 |
| **Operating Temperature** | 0 °C to 40 °C |
| **Sensors** | Position, current, voltage, temperature, accelerometer, gyroscope |

## 🔌 Interfaces

| Interface | Specification |
|------------|---------------|
| **Software** | KINOVA® KORTEX™ |
| **Internal Communication** | 1 × 100 Mbps Ethernet |
| **API Compatibility** | Windows 10 / Ubuntu 18.04 / ROS Melodic |
| **Programming Languages** | C++, Python |
| **Basic Interfaces** | USB-A, micro USB, Ethernet, Wi-Fi |
| **Control Frequency** | 1 kHz |
| **Low-Level Control** | Position, Velocity, Current |
| **High-Level Control** | Cartesian Position / Velocity, Joint Position / Velocity |


## Resources

### Videos
* Kortex Video Tutorial: [**Kortex How-To Series**](https://www.youtube.com/watch?v=zQewb08M4sA&list=PLz1XwEYRuku5rZjJWBr6SDi93jgWZ4FHL)


### Manuals
* User Guide: [**User Guide.PDF**](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/Ec0kSpCAL-9JhKc6299RtrcBsy1Vvc0eolHHusPnqm_hlA?e=O8bN5Q)
* Start Guide: [**Start Guide.PDF**](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EcuGhYgXKs5JtWMZoSnipRMBEWyYHV7YaTmaZAf57OIg_w?e=fJHUdH)
* System Overview: [**Kinova Kortex.PDF**](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EeDH7SJp2CFJpmC3eTI_OOIBkzGOgqK6GYkxt7O1yfbbEg?e=wddhLM)
* Firmware Update: [**Release Notes.PDF**](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EdrqH5oIMkdJgx7gIsi6-60BURHPDimf6rviOIhmubDdzQ?e=sV36ea)

### CAD Models
* Gen3 Lite: [**Gen3 Lite.STEP**](https://tangrobot.sharepoint.com/:u:/s/Public-Outgoing/ES0-WAcngaJBq0OggTQ34lMBAZ9P8QKvrli2RDojayINZw?e=GlLPa3)
* Robot Model: [**URDF / XACRO**](https://github.com/Kinovarobotics/ros_kortex/tree/kinetic-devel/kortex_description/arms/gen3_lite/6dof/urdf)

### Development
* C++ / Python SDK: [**Kinova Kortex API**](https://github.com/Kinovarobotics/Kinova-kortex2_Gen3_G3L/)
* ROS 1 Integration: [**Kinova Kortex ROS**](https://github.com/kinovarobotics/ros_kortex)
* ROS 2 Integration: [**Kinova Kortex ROS2**](https://github.com/Kinovarobotics/ros2_kortex)
* MATLAB Interface: [**Matlab Kortex Toolbox**](https://github.com/Kinovarobotics/matlab_kortex)