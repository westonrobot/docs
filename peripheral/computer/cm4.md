---
sidebar_position: 2
---

import CM4_IMG from '../img/westonrobot/cm4_sbc.jpg';

# CM4-based Onboard Computer

This onboard computer is based on Raspberry Pi Computer Module 4 (CM4). We extended the board with CAN and RS485 ports for interfacing with the robot bases and sensors. 

<div style={{textAlign: 'center'}}>
<img src={CM4_IMG} alt="Ranger Mini robot" style={{width: 350}} />
</div>

## Key Specifications

* **SoC**: Broadcom BCM2711, quad core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz
* **RAM**: 4GB/8GB
* **Storage**: 32GB eMMC
* **USB3.2 Gen1** × 2
* **Gigabit Ethernet** × 2
* **HDMI 2.0** × 2
* **Industrial ports**
    * 2× isolated CAN interfaces (with transceivers)
    * 1× isolated RS485 interfaces
* **Power supply**: 5.5×2.1mm DC Jack, 12V~29V, 12V is recommended.
