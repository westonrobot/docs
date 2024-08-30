*************
Go2 Robot Dog
*************

Revision History
================

+----------+-------------------+----------+------------------------------------------------------+
| Revision | Date (DD/MM/YYYY) | Author   | Changes                                              |
+==========+===================+==========+======================================================+
| 1        | 19/1/2024         | Kang Wei | Initial release                                      |
+----------+-------------------+----------+------------------------------------------------------+

1. Overview
===========

.. image:: figures/Go2_robot.png
    :width: 300 px
    :align: center

The Go2 robot dog is a new and improved intelligent bionic quadruped robot empowered with AI. The Go2 has Unitree's self-developed 4D LIDAR L1 with 360°x90° hemispherical ultra-wide recognition to make Go2 traverse complex terrain.

2. Specifications
=================

.. list-table:: Technical Specifications
   :widths: 25 25

   * - Dimensions (Crouching State)
     - 76cm x 31cm x 20cm
   * - Dimensions (Standing State)
     - 70cm x 31cm x 40cm
   * - Material 
     - Aluminium alloy + High strength engineering plastic
   * - Weight
     - ~15kg
   * - Voltage
     - 28V - 33.6V
   * - Peaking Capacity
     - ~3000W
   * - Payload
     - | Air\: 7kg (MAX ~10kg) 
       | Pro\: 8kg (MAX ~10kg) 
       | Edu\: 8kg (MAX ~12kg)
   * - Speed
     - | Air\: 0 - 2.5m/s 
       | Pro\: 0 - 3.5m/s 
       | Edu\: 0 - 3.7m/s (MAX ~5m/s)
   * - Max Climb Drop height
     - | Air\: 30°
       | Pro\: 40°
       | Edu\: 40°
   * - Basic Computing Power
     - | Air\: /
       | Pro\: 8-core High-performance CPU
       | Edu\: 8-core High-performance CPU
   * - Aluminum Knee Joint Motor
     - 12 set
   * - Intra-Joint Circuit (Knee)
     - √
   * - Joint Heat Pipe Cooler
     - √
   * - Range of Motion
     - | Body\: -48° ~ 48°
       | Thigh\: -200° ~ 90°
       | Shank\: -156° ~ -48°
   * - Max Torque [1]
     - | Air\: /
       | Pro\: ~ 45Nm
       | Edu\: ~ 45Nm
   * - Super-wide-angle 3D LIDAR
     - √
   * - Wireless Vector Positioning Tracking Module
     - | Air\: /
       | Pro\: √
       | Edu\: √
   * - HD Wide-angle Camera
     - √
   * - Foot-end Force Sensor 
     - | Air\: /
       | Pro\: /
       | Edu\: √
   * - Basic Action
     - √
   * - Auto-Scaling Strap
     - | Air\: /
       | Pro\: √
       | Edu\: /
   * - Upgraded Intelligent OTA
     - √
   * - RTT 2.0 Image Transmission
     - √
   * - App Basic Remote Control
     - √
   * - App Data Viewing
     - √
   * - App Graphical Programme
     - √
   * - Manual Controller
     - | Air\: Optional
       | Pro\: Optional
       | Edu\: √
   * - Front Lamp (3W)
     - √
   * - WiFI6 with Dual-band
     - √
   * - Bluetooth 5.2/4.2/2.1
     - √
   * - 4G Module
     - | Air\: /
       | Pro\: CN/GB
       | Edu\: CN/GB
   * - Voice Function [2]
     - | Air\: /
       | Pro\: √
       | Edu\: √
   * - Music Playback
     - | Air\: /
       | Pro\: √
       | Edu\: √
   * - ISS 2.0 Intelligent side-follow system
     - | Air\: /
       | Pro\: √
       | Edu\: √
   * - Intelligent Detection and Avoidance
     - √
   * - Secondary development [3]
     - | Air\: /
       | Pro\: /
       | Edu\: √
   * - High Computing Power Module
     - | Air\: /
       | Pro\: /
       | Edu\: NVIDIA Jetson Orin (optional) 
               (40-100 Tops computing power)
   * - Smart Battery
     - | Air\: Standard (8000mAh)
       | Pro\: Standard (8000mAh)
       | Edu\: Long Endurance (15000mAh)
   * - Battery Life
     - | Air\: 1 - 2h
       | Pro\: 1 - 2h
       | Edu\: 2 - 4h
   * - Charger
     - | Air\: Standard (33.6V 3.5A)
       | Pro\: Standard (33.6V 3.5A)
       | Edu\: Fast Charge (33.6V 9.0A)  

[1] The maximum torque in the table refers to the maximum torque of the largest joint motor; the actual maximum torque varies for the 12 joint motors.

[2] In open environment without interference and blocking.

[3] Transformation and quality varies considerably in different network environments.

.. table:: Battery Charger Specifications

   +---------------------+-------------------------+---------------------------+
   |                     |     Standard Version    |   Fast Charging Version   |
   +=====================+=========================+===========================+
   |Dimensions           | 154mm x 60mm x 40mm     |212mm x 109mm x 52mm       |
   +---------------------+-------------------------+---------------------------+
   |Input Power Supply   | .. centered:: 100-240V~50/60Hz 4A 350VA             |
   +---------------------+-------------------------+---------------------------+
   |Output Power Supply  | 33.6V, 3.5A             |33.6V, 9.0A                |
   +---------------------+-------------------------+---------------------------+
   |Charging Time        | 2 - 4h                  |0.8 - 1.5h                 |
   +---------------------+-------------------------+---------------------------+

3. Connection Mode
==================
.. table:: 

+---------------------+-------------------------------------------------------------------------------------------------------+------------------------+---------------------------------------------------------+
|        Mode         |                      Description                                                                      | Communication Distance | Data Transfer Service [1]                               |
+=====================+=======================================================================================================+========================+=========================================================+
|         AP          |  User device (APP) is connected to the hotspot broadcasted by the GO2                                 |          Near          |            No                                           |
+---------------------+-------------------------------------------------------------------------------------------------------+------------------------+---------------------------------------------------------+
|     Wi-Fi (STA-L)   |  Both user device (APP) and GO2 are connected to the same Wi-Fi. Able to access local area network    |          Near          |            No                                           |
+---------------------+-------------------------------------------------------------------------------------------------------+------------------------+---------------------------------------------------------+
|     Wi-Fi (STA-T)   |  User device (APP) and GO2 are both connected to different Wi-Fi. Both networks have external access  |          Far           | Yes, incurring cost for data transfer                   |
+---------------------+-------------------------------------------------------------------------------------------------------+------------------------+---------------------------------------------------------+
|          4G         |  GO2 has network access through 4G sim card and user device (APP) is connected to a stable Wi-Fi      |          Far           | No, but sim card provider will charge for 4G data usage |
+---------------------+-------------------------------------------------------------------------------------------------------+------------------------+---------------------------------------------------------+

[1] Server data transfer cost, allow user to access GO2 remotely

4. Resources
============

Manual
------

* User Guide: `Go2 User Guide <https://tangrobot.sharepoint.com/:p:/s/Public-Outgoing/Ef6xB-mt-TtAhu_S81nDoWsBk9wlDtic3VEzey2Nu4hBBg?e=eVifVB>`_
* Go2 Manual: `Unitree <https://support.unitree.com/home/en/developer/about%20Go2>`_

.. Development
.. -----------

5. FAQ
======
1. | **Q: What is account insufficient?**
   | A: Each new GO2 comes with a complimentary RMB120 credit, which can be utilized for data transfer and GPT services. Consult the **Connection Mode** table to determine which connection modes will utilize this credit. When the account balance is insufficient, the GO2 can only be connected via AP mode.
2. | **Q: How can I recharge my account when the credit is insufficient?**
   | A: Please contact Weston Robot business team for more information. 
