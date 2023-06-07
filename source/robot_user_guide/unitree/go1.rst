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

* User guide: :download:`Getting Started with Go1 <manual/Go1_slides.pdf>`
* Software guide: :download:`Go1 Software Manual <manual/go1_software_manual_20211201.pdf>`
* SDK: `unitree_legged_sdk <https://github.com/westonrobot/unitree_legged_sdk>`_
* ROS simulation package: `unitree_ros <https://github.com/westonrobot/unitree_ros>`_
* ROS controller package: `unitree_ros_to_real <https://github.com/westonrobot/unitree_ros_to_real>`_
* CAD File: `Go1_simplify.STEP <https://tangrobot.sharepoint.com/sites/ProductDevelopment/Shared%20Documents/Forms/AllItems.aspx?ga=1&id=%2Fsites%2FProductDevelopment%2FShared%20Documents%2FGeneral%2FPublic%20Sharing%2FCAD%2Fdocs%2FQuadruped%20Robots%2FGo1%2Dsimplify%2D210812%2ESTEP&viewid=cb47fb93%2D32a7%2D4da8%2Db2ed%2De5f6463d97ba&parent=%2Fsites%2FProductDevelopment%2FShared%20Documents%2FGeneral%2FPublic%20Sharing%2FCAD%2Fdocs%2FQuadruped%20Robots>`_