.. _ref_cm4_based_onboard_computer:

**************************
CM4-based Onboard Computer
**************************

Revision History
================

+----------+-------------------+-------------+------------------------------------------------------+
| Revision | Date (DD/MM/YYYY) | Author      | Changes                                              |
+==========+===================+=============+======================================================+
| 1        | 07/05/2024        | Ruixiang Du | Initial release                                      |
+----------+-------------------+-------------+------------------------------------------------------+

This onboard computer is based on Raspberry Pi Computer Module 4 (CM4). We extended the board with CAN and RS485 ports for interfacing with the robot bases and sensors. 

.. image:: /periph_user_guide/westonrobot/figures/cm4_sbc.jpg
    :width: 450 px

Key Specifications
==================

* **SoC: Broadcom BCM2711, quad core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz**
* **RAM: 4GB/8GB**
* **Storage: 32GB eMMC**
* **USB3.2 Gen1 * 2**
* **Gigabit Ethernet * 2**
* **HDMI 2.0 * 2**
* **Industrial ports**
    * 2x isolated CAN interfaces (with transceivers)
    * 1x isolated RS485 interfaces
* **Power supply**: 5.5*2.1mm DC Jack, 12V~29V, 12V is recommended.
