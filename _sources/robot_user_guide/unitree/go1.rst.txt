*************
Go1 Robot Dog
*************

Revision History
================

+----------+-------------------+----------+------------------------+
| Revision | Date (DD/MM/YYYY) | Author   | Changes                |
+==========+===================+==========+========================+
| 1        | 14/11/2022        | Kee Jin  | Initial release        |
+----------+-------------------+----------+------------------------+

1. Overview
===========
The Go1 robot dog is a 12 DOF, quadruped robot.

2. Specifications
=================

.. list-table:: Technical Specifications
   :widths: 25 25

   * - Dimensions (Proning State)
     - 550mm x 300mm x 130mm
   * - Dimensions (Standing State)
     - 650mm x 300mm x 400mm
   * - Maximum traversal tilt
     - 35 degrees
   * - Maximum Speed
     - Pro\: 3.5m/s Edu: 3.7m/s	
   * - Charging Time
     - 50min
   * - Average Running Time
     - 1h
   * - Weight
     - 12kg
   * - Rated Load
     - Pro\: 3kg, Edu: 5kg
   * - Motor
     - 12 x Servo Geared motors

3. General Notes
================
* When conducting experiments with the Go1 that may impact its stability, the emergency stop provided should be used where necessary.

.. image:: figures/A1_estop.png
    :width: 180 px
    :align: center

* The Go1 should be powered off and its battery should be replaced whenever there is only 1/4 of the battery LED indicators left lit and blinking. This indicates that the battery level is low (0-25%).
* Before powering off the Go1, be sure to bring it down to the damped proning state first to prevent the robot from dropping down from a height. To do so, get the Go1 to the "proning state" with "L2+A" and finally press "L2+B". 

4. Resources
============

* User guide: `Getting Started with Go1 <https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EWkPsjYni41MjcukW1VNwhMBhOqCz3DxIxBa5dtJ3XV6PQ?e=8oqP0Z>`_
* Software guide: `Go1 Software Manual <https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EengpX_Tv-NBiYwO-6PInTsBbsRL6N1EqfOVFiCnB1Gbwg?e=uTD3nW>`_
* SDK: `unitree_legged_sdk <https://github.com/westonrobot/unitree_legged_sdk>`_
* ROS simulation package: `unitree_ros <https://github.com/westonrobot/unitree_ros>`_
* ROS controller package: `unitree_ros_to_real <https://github.com/westonrobot/unitree_ros_to_real>`_
* CAD File: `Go1 STEP file <https://tangrobot.sharepoint.com/:f:/s/Public-Outgoing/Epo7xFk4MVNGgrDL9sgeVmcBM7-5QvVGvsCztrksVI7Iwg?e=y4aYKF>`_