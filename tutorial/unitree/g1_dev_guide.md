---
sidebar_position: 1
---

import G1_EDU_IMG from './img/g1_joints.png';
import G1_EDU_ZERO_JOINT_IMG from './img/zero_joint_state.png';
import G1_WAIST_JOINT_IMG from './img/waist_joint_control.png';
import G1_ANKLE_JOINT_IMG from './img/ankle_joint_control.jpg';
import INSPIRE_DFX_IMG from './img/inspire_dfx_hand.png';
import INSPIRE_FTP_IMG from './img/inspire_ftp_hand.png';
import DEX3_1_IMG from './img/dex3_1_hand.png';
import LIVOX_AND_REALSENSE_IMG from './img/livox_and_realsense.png';
import DEV_PC_HW_IF_IMG from './img/dev_pc_hw_interface.jpg';

# G1 Development Guide

This guide is designed to help you get started with the **G1 EDU** humanoid robot development. It covers the hardware and software components, as well as the development process. This guide is not intended to replace the [official Unitree documentation](https://support.unitree.com/home/en/G1_developer), but rather to provide a complementary perspective on key information and walk you through the most important development steps.

## 1. Get to Know G1 Hardware

### 1.1 Joint Configuration

To start working with any articulated robot, it is essential to know its number of degrees of freedom (DOF) and the joint configuration. The following image shows the joint configuration of the G1 robot:

<div align="center">
    <img src={G1_EDU_IMG} alt="G1 Joint Configuration" style={{ height: 400 }} />
</div>

The indexes, names and limits of all the G1 joints are given in the table below. The **29 joints** of the main body are divided into 3 groups: legs, waist and arms. The legs have 6 joints each, the waist has 3 joints and each arm has 7 joints. Note that the motor specifications for the different joints are not the same. The knee joint is equipped with the most powerful motor, which is capable of delivering a maximum torque of 120 Nm.

<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
  <div>
    | Joint Index | Joint Name        | limit(rad)               |
    | ----------- | ----------------- | ------------------------ |
    | 0           | L_LEG_HIP_PITCH   | -2.5307~2.8798           |
    | 1           | L_LEG_HIP_ROLL    | -0.5236~2.9671           |
    | 2           | L_LEG_HIP_YAW     | -2.7576~2.7576           |
    | 3           | L_LEG_KNEE        | -0.087267~2.8798         |
    | 4           | L_LEG_ANKLE_PITCH | -0.87267~0.5236          |
    | 5           | L_LEG_ANKLE_ROLL  | -0.2618~0.2618           |
    | 6           | R_LEG_HIP_PITCH   | -2.5307~2.8798           |
    | 7           | R_LEG_HIP_ROLL    | -2.9671~0.5236           |
    | 8           | R_LEG_HIP_YAW     | -2.7576~2.7576           |
    | 9           | R_LEG_KNEE        | -0.087267~2.8798         |
    | 10          | R_LEG_ANKLE_PITCH | -0.87267~0.5236          |
    | 11          | R_LEG_ANKLE_ROLL  | -0.2618~0.2618           |
    | 12          | WAIST_YAW         | -2.618~2.618             |
    | 13          | WAIST_ROLL        | -0.52~0.52               |
    | 14          | WAIST_PITCH       | -0.52~0.52               |
    | 15          | L_SHOULDER_PITCH  | -3.0892~2.6704           |
    | 16          | L_SHOULDER_ROLL   | -1.5882~2.2515           |
    | 17          | L_SHOULDER_YAW    | -2.618~2.618             |
    | 18          | L_ELBOW           | -1.0472~2.0944           |
    | 19          | L_WRIST_ROLL      | -1.972222054~1.972222054 |
    | 20          | L_WRIST_PITCH     | -1.614429558~1.614429558 |
    | 21          | L_WRIST_YAW       | -1.614429558~1.614429558 |
    | 22          | R_SHOULDER_PITCH  | -3.0892~2.6704           |
    | 23          | R_SHOULDER_ROLL   | -2.2515~1.5882           |
    | 24          | R_SHOULDER_YAW    | -2.618~2.618             |
    | 25          | R_ELBOW           | -1.0472~2.0944           |
    | 26          | R_WRIST_ROLL      | -1.972222054~1.972222054 |
    | 27          | R_WRIST_PITCH     | -1.614429558~1.614429558 |
    | 28          | R_WRIST_YAW       | -1.614429558~1.614429558 |
  </div>
  <div>
    <img src={G1_EDU_ZERO_JOINT_IMG} alt="Zero Joint State" style={{ height: 700 }} />
  </div>
</div>

You don't need to memorize all joint names and limits, but you should become familiar with the robot's joint configuration. We recommend physically interacting with the powered-off robot and manually rotating each joint to develop better intuition. Understanding the joint configuration is crucial for comprehending the robot's kinematics and dynamics, as well as for programming movements effectively. You'll likely need to reference this table when configuring the URDF model and implementing joint-level control systems.

There are two special joints you may need to pay attention to:

1. The **waist** joint. If the G1 model you get has 3-DOF waist joints, you can optionally lock the roll and pitch joints to create a 1-DOF waist joint. This is useful for some applications where you only need to control the yaw joint. Please refer to Unitree documentation for more information on [how to lock the waist joint](https://support.unitree.com/home/en/G1_developer/waist_fastener). Note that this process requires **both hardware modification** and **software configuration.**
1. The **ankle** joint. The ankle joint adopts a parallel mechanism design. It provides two control modes:
   * **PR Mode**: Controls the Pitch (P) and Roll (R) motors of the ankle joint (default mode, corresponding to the URDF model).
   * **AB Mode**: Directly controls the A and B motors of the ankle joint (requires users to calculate the parallel mechanism kinematics themselves).
   You can read more about this mechanism from this [Unitree documentation page](https://support.unitree.com/home/en/G1_developer/basic_motion_routine).

<div style={{ display: 'flex', justifyContent: 'center', gap: '100px', flexWrap: 'wrap', marginTop: '20px', marginBottom: '20px' }}>
    <div style={{ textAlign: 'center' }}>
        <img src={G1_WAIST_JOINT_IMG} alt="Waist Joint Control" style={{ height: 400 }} />
        <p><em>Lock 3-DOF waist joint</em></p>
    </div>
    <div style={{ textAlign: 'center' }}>
        <img src={G1_ANKLE_JOINT_IMG} alt="Ankle Joint Control" style={{ height: 400 }} />
        <p><em>Ankle joint parallel mechanism</em></p>
    </div>
</div>

:::warning Safety Warning

Improper modification or control of the robot joints can lead to serious damage to the robot's hardware or potentially cause injury to operators. Before attempting any joint movement programming or physical interaction with the robot:

1. Thoroughly understand the joint limits and mechanical constraints
2. Start with slow movements and low torques when testing new control algorithms
3. Always have an emergency stop **procedure** ready
4. Ensure proper clearance around the robot during operation

If you're uncertain about any aspect of joint operation or control, please reach out to [Weston Robot Support](https://forms.office.com/r/UXzrrsgEyW) for assistance before proceeding.

:::

### 1.2 Main Peripherals

Besides the main body, the G1 robot is equipped with several peripherals that enhance its capabilities. The following table summarizes the main peripherals and their functions:

| Peripheral Name | Function                                                                    |
| --------------- | --------------------------------------------------------------------------- |
| Robotic Hand    | Dexterous hand (compatible models include Dex3-1, Inspire FTP, Inspire DFX) |
| 3D LIDAR        | Livox Mid-360 for obstacle detection and mapping                            |
| RGB-D Camera    | RealSense D435i for visual perception and object recognition                |

The Livox Mid-360 Lidar and RealSense D435i camera are mounted on the robot's head. The following image shows the G1 robot with the Livox and RealSense mounted on its head:

<div align="center">
    <img src={LIVOX_AND_REALSENSE_IMG} alt="Livox and RealSense" style={{ height: 400 }} />
</div>

You can use the table below to find out the specific model of the robotic hand you have. The Inspire FTP and Inspire DFX hands look similar. The main difference is that the Inspire FTP model support tactile sensing, while the Inspire DFX model does not. The Dex3-1 hand has only 3 fingers, thus it is easy to distinguish from the other two models. 

| Robotic Hand Model | Picture                                                                      | Link                                                                                |
| ------------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Dex3-1             | <img src={DEX3_1_IMG} alt="Dex3-1 Hand" style={{ height: 200 }} />           | [Link](https://support.unitree.com/home/en/G1_developer/dexterous_hand)             |
| Inspire FTP        | <img src={INSPIRE_FTP_IMG} alt="Inspire FTP Hand" style={{ height: 200 }} /> | [Link](https://support.unitree.com/home/en/G1_developer/inspire_ftp_dexterity_hand) |
| Inspire DFX        | <img src={INSPIRE_DFX_IMG} alt="Inspire DFX Hand" style={{ height: 200 }} /> | [Link](https://support.unitree.com/home/en/G1_developer/inspire_dfx_dexterous_hand) |

Note that G1 also includes built-in IMU, microphone array and speaker. You can refer to the Unitree documentation for more information on how to interact with these components. 

### 1.3 Electrical Connectivity
The electrical connectivity of the G1 robot follows a hierarchical architecture as illustrated below. The locomotion computer and its connected components function as a closed system that users cannot directly access. Think of this as a black box with protected internals. Nevertheless, you can still utilize these components' capabilities through the provided SDK. The development computer serves as your primary gateway for programming and controlling the robot.

```mermaid
flowchart TD
    A[Joint Motors] --> B[Locomotion Computer]
    B --> D[IMU]
    B --> E[Microphone Array]
    B --> F[Speaker]
    B --> G[RealSense]
    B -->|Ethernet| S[Internal Ethernet Switch]
    S -->|Ethernet| C[**Development Computer**]
    S -->|Ethernet| H[Lidar]
    C -->|RS485| I[Robotic Hand]
```

* **Locomotion computer** is referred as **operation and control computing unit** in the Unitree documentation. It communicates with the motor drivers and other low-level devices inside the robot directly. Unitree locomotion controller runs on this computer. This computer is not accessible to users.
* **Development computer** is referred as **development computing unit** in the Unitree documentation. User can use this computer to run their own code. Both low-level (joint control) and high-level (speed control with the robot as a mobile base) code can run on this computer. 

:::info Note
The development computer features an **Nvidia Jetson Orin NX** module installed on a custom Unitree carrier board. This requires a specific BSP (Board Support Package) for proper driver support and device tree configurations. Do not attempt to flash the Orin NX module with any third-party images, as this could render the system inoperable.
:::

The carrier board provides the following interfaces:

<div align="center">
    <img src={DEV_PC_HW_IF_IMG} alt="Development PC Hardware Interface" style={{ height: 400 }} />
</div>


| No. | Connector Name | Interface Description | Interface specification                                           |
| --- | -------------- | --------------------- | ----------------------------------------------------------------- |
| 1   | XT30UPB-F      | VBAT                  | 58V/5A Battery power output (directly connected to battery power) |
| 2   | XT30UPB-F      | 24V                   | 24V/5A power output                                               |
| 3   | XT30UPB-F      | 12V                   | 12V/5A power output                                               |
| 4   | RJ45           | 1000 BASE-T           | GbE (gigabit Ethernet)                                            |
| 5   | RJ45           | 1000 BASE-T           | GbE (gigabit Ethernet)                                            |
| 6   | Type-C         | Type-C                | Support USB3.0 host, 5V/1.5A power output                         |
| 7   | Type-C         | Type-C                | Support USB3.0 host, 5V/1.5A power output                         |
| 8   | Type-C         | Type-C                | Support USB3.0 host, 5V/1.5A power output                         |
| 9   | Type-C         | Alt Mode Type-C       | Supports USB3.2 host and DP1.4                                    |
| 10  | 5577           | I/O OUT               | 12V: 12V/3A power output                                          |

The [Electrical Interface section](https://support.unitree.com/home/en/G1_developer/about_G1) from Unitree documentation provides additional information. But the above information should be sufficient for you to get started. Notablly, you need to know the following key points:

* You can directly access the development computer by connecting a Type-C to HDMI adapter to port [9] (adapter not included, requires separate purchase). This allows you to connect a monitor and keyboard to the development computer.
* The recommended method for accessing the development computer is connecting an external computer (like a development laptop) via Ethernet using port [4] or [5].

:::info Note
While you can connect an external computer to the development computer using port [9] with a Type-C to **HDMI & Ethernet** adapter, this approach is **not recommended**. The physical connection with an adapter on the Type-C port is less reliable than using the dedicated RJ45 ports. Additionally, the Ethernet connection through Type-C requires extra configuration steps that necessitate using the HDMI output for setup. Port [9] should be considered primarily for temporary scenarios like debugging or troubleshooting (for instance, when ports [4] or [5] connectivity fails).
:::