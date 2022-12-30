*****************
Aliengo Robot Dog
*****************

Revision History
================

+----------+-------------------+----------+------------------------+
| Revision | Date (DD/MM/YYYY) | Author   | Changes                |
+==========+===================+==========+========================+
| 1        | 14/11/2022        | Kee Jin  | Initial release        |
+----------+-------------------+----------+------------------------+

1. Overview
===========
The Aliengo robot dog is a 12 DOF, quadruped robot.

2. Specifications
=================

.. list-table:: Technical Specifications
   :widths: 25 25

   * - Dimensions (Proning State)
     - 600mm x 310mm x 150mm
   * - Dimensions (Standing State)
     - 650mm x 310mm x 600mm
   * - Maximum traversal tilt
     - 25 degrees
   * - Maximum stair-climbing height
     - 18cm
   * - Maximum Speed
     - 1.5m/s	
   * - Charging Time
     - 45min
   * - Average Running Time
     - >2h
   * - Weight
     - 21.5kg
   * - Rated Load
     - 10kg
   * - Motor
     - 12 x Servo Geared motors

3. General Notes
================
* When conducting experiments with the Aliengo that may impact its stability, the emergency stop and leash provided should be used where necessary.

.. image:: figures/A1_estop.png
    :width: 180 px
.. image:: figures/A1_leash.png
    :width: 380 px

* The Aliengo should be powered off and its battery should be replaced whenever there is only 1/5 of the battery LED indicators left lit and blinking. This indicates that the battery level is low (0-20%).
* Before powering off the Aliengo, be sure to bring it down to the damped proning state first to prevent the robot from dropping down from a height. To do so, get the Aliengo to the "proning state" with "L2+A" and finally press "L2+B". 

4. Resources
============

.. * User guide: :download:`Getting Started with Aliengo <manual/Aliengo_slides.pdf>`

* SDK: `unitree_legged_sdk <https://github.com/westonrobot/unitree_legged_sdk>`_
* ROS simulation package: `unitree_ros <https://github.com/westonrobot/unitree_ros>`_