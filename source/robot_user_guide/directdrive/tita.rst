****
Tita
****

Revision History
================

+----------+-------------------+----------+-----------------+
| Revision | Date (DD/MM/YYYY) | Author   |     Changes     |
+==========+===================+==========+=================+
| 1        | 13/02/2025        | Kang Wei | Initial release |
+----------+-------------------+----------+-----------------+

1. Getting Started
==================

The Tita is a super agile & stylish two-wheeled-leg robot.

2. Specifications
=================

.. list-table:: Robot Specifications
   :widths: 25 25

   * - Processor
     - Jetson Orin NX 16G 
   * - Research Programming API
     - ROS 2
   * - Normal Voltage
     - 43.2V
   * - AI Performance
     - 100 TOPs
   * - Tita Bridges 
     - 3 on top
   * - Payload Weight
     - Moving 10kg
   * - Max Jumping Height
     - 20cm
   * - DoF
     - 8
   * - Max Speed
     - 3m/s
   * - Built-in Camera
     - 2
   * - Built-in Speaker
     - 2
   * - lnertial Sensor
     - 2
   * - SPAD Sensor
     - 2   
   * - Ultrasonic Sensor
     - 1
   * - Adjustable Output Power
     - 48V 5A 
   * - Number of Battery
     - 2

3. Resources
============

Manual
------

* Tutorials Videos: `YouTube <https://www.youtube.com/watch?v=8iZGSCG_5XY&list=PLLRFrIsAHEJSiqjMOlg6Oeut3G8YRiBY1>`_
* User Manual (EN): `Link <https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EQqCucr2eOJAqE535rc9RusB_Hc2h1IfedtzKxyg6YBM2w?e=A5sNd9>`_
* User Manual (CN): `Link <https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EQ0IIV1K2PdDjalxXZcVapQBOVPxfgACKEg6FUKW3Jf3EQ?e=dpumCk>`_

Development
-----------

* Development Manual: `Link <https://tita-ubuntu-manual-english.readthedocs.io/en/latest/>`_
* ROS2: `TITA-SDK-ROS2 <https://github.com/DDTRobot/TITA-SDK-ROS2>`_

Image
-----

* Image: `Link <https://tangrobot.sharepoint.com/:f:/s/Public-Outgoing/ElU0LLmQDHJJhXXDH16zPREB9GNdQRZgapYr90TNV5JHig?e=niG6Ew>`_
* Reflash Guide: `Link <https://tita-ubuntu-manual-english.readthedocs.io/en/latest/pages/ubuntu-flash.html>`_

4. Q&A
======
1. | **Q: Why is camera point_cloud topic empty?**
   | A: Camera pointcloud node is not running. Run the following command:
   |    - $ source /opt/tita/ros2/setup.bash
   |    - $ ros2 launch engine_manager engine_manager.launch.py
   .. image:: figures/tita_q&a_1.png
       :width: 800 px
       :align: center