*****************
Weston Robot WRL63
*****************

Revision History
================

+----------+-------------------+----------+------------------------+
| Revision | Date (DD/MM/YYYY) | Author   | Changes                |
+==========+===================+==========+========================+
| 1        | 27/09/2023        | Kang Wei | Initial release        |
+----------+-------------------+----------+------------------------+

1. Overview
===========
The ultra-long 6-DOF WRL63 is a robot arm manipulator that provides solutions for industries such as automotive parts, 3C electronics, metal processing, food packaging, medical health, new retail, etc.

2. Specifications
=================

.. list-table:: Common Technical Specifications
   :widths: 25 25

   * - Degree of Freedom
     - 6
   * - Payload
     - 3 kg
   * - Repeatability
     - ±0.05mm  
   * - Power Supply Voltage
     - DC 20V to 30V, Rated DC 24V
   * - Power Consumption
     - Maximum ≤ 200 W, Comprehensive ≤ 100 W
   * - Protection Level 
     - IP54 (Robotic Arm Body)
   * - Materials
     - Aluminum Alloy
   * - Controller
     - Integrated
   * - Communication Mode
     - WiFi / Network Interface / Bluetooth / USB Serial Port / RS485
   * - Control Mode
     - Drag & Drop Teaching / Teaching Pendant / API / JSON


.. table:: Specific Technical Specifications

   +--------------------------+---------------+----------------+----------------+
   |                          |    WRL63-B    |    WRL63-ZF    |    WRL63-6F    |
   +==========================+===============+================+================+
   | Body Weight              |10.0kg         | .. centered:: 10.1kg            |
   +--------------------------+---------------+----------------+----------------+
   | Working Radius           |900mm          |908mm           |928.5mm         |
   +--------------------------+---------------+----------------+----------------+
   | One-Axis Force Range     |NA             |200N            |200N / 7Nm      |
   +--------------------------+---------------+----------------+----------------+
   | One-Axis Force Accuracy  |NA             |< 0.1% FS       |< 0.1% FS       |
   +--------------------------+---------------+----------------+----------------+


.. table:: Joint Maximum Speed    

   +-------------+---------------+----------------+----------------+
   |             |    WRL63-B    |    WRL63-ZF    |    WRL63-6F    |
   +=============+===============+================+================+
   | J1 - J2     | .. centered:: 180°/s                            |
   +-------------+-------------------------------------------------+
   | J3 - J6     | .. centered:: 225°/s                            |
   +-------------+-------------------------------------------------+


.. table:: Joint Motion Range

   +-------------+---------------+----------------+----------------+
   |             |    WRL63-B    |    WRL63-ZF    |    WRL63-6F    |
   +=============+===============+================+================+
   | Joint 1     | .. centered:: ±178°                             |
   +-------------+-------------------------------------------------+
   | Joint 2     | .. centered:: ±178°                             |
   +-------------+-------------------------------------------------+
   | Joint 3     | .. centered:: +145° to -178°                    |
   +-------------+-------------------------------------------------+
   | Joint 4     | .. centered:: ±178°                             |
   +-------------+-------------------------------------------------+
   | Joint 5     | .. centered:: ±178°                             |
   +-------------+-------------------------------------------------+ 
   | Joint 6     | .. centered:: ±360°                             |
   +-------------+-------------------------------------------------+ 

3. Resources
============

.. Manuals
.. -------

.. * WRL63 Manual: `PDF <>`_
.. * SDK Manual: `PDF <>`_
.. * ROS Manual: `PDF <>`_
.. * JSON Protocol Manual: `PDF <>`_

Development
-----------

* C++ SDK: `wr_arm_sdk <https://github.com/westonrobot/wr_arm_sdk.git>`_
* ROS Package: `wrl63b_ros <https://github.com/westonrobot/wrl63b_ros.git>`_