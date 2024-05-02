************************
UGV Development Kit V1.0
************************

Revision History
================

+----------+-------------------+-------------+------------------------+
| Revision | Date (DD/MM/YYYY) |    Author   | Changes                |
+==========+===================+=============+========================+
| 1        | 18/04/2024        | WR Dev Team | Initial release        |
+----------+-------------------+-------------+------------------------+
| 2        | 02/05/2024        | Andrew Chia | Hardware Configuration |
+----------+-------------------+-------------+------------------------+

1. Overview
===========

The UGV development kit, together with a robot base, provide a powerful yet flexible mobile robot hardware platform for research and fast prototyping. The kit is designed to be compatible with a wide range of robot bases. Additional components can be easily added on top of the base frame according to application-specific requirements. The platform can be used to implement a wide range of applications, such as autonomous navigation, mapping, and object detection.

.. image:: ugv_dev_kit/figures/ugv_dev_kit_overview.jpg
    :width: 650 px

This **base configuration** of the development kit consists of the following pre-configured components:

* :ref:`NanoPC-based Onboard Computer <ref_nanopc_based_onboard_computer>`
* :doc:`Weston Robot Power Regulator V2.X </periph_user_guide/westonrobot/power_regulator_v2.X>`
* Industrial 5G Router

The following **extension modules** are available to be added to the base configuration:

* Livox Mid-360 Lidar + IMU

2. Software Configuration
=========================

Network 
-------

The router is pre-configured to use the IP range 10.10.0.0/24. 

The IP addresses are assigned as follows:

+---------------------+----------------------------+
| Device Type         | IP Range                   |
+=====================+============================+
| onboard computers   | 10.10.0.10-10.10.0.20/24   |
+---------------------+----------------------------+
| navigation sensors  | 10.10.0.30-10.10.0.40/24   |
+---------------------+----------------------------+
| application sensors | 10.10.0.100-10.10.0.120/24 |
+---------------------+----------------------------+

It's recommended but not mandatory to follow the above IP assignment rules. You can change the IP addresses according to your requirements. We follow this convention to configure the development kit by default. Please refer to the delivery note for the actual IP assignment on your robot. 

Software Setup
--------------

The UGV development kit is pre-installed with the following software stacks:

* ROS2 driver for the robot base and sensors
* `LIO-SAM 3D Mapping Sample Setup <https://github.com/westonrobot/wr_devkit_mapping>`_
* `ROS2 Navigation Sample Setup <https://github.com/westonrobot/wr_devkit_navigation>`_

.. note::
    1. The ROS drivers are only for components that are part of the base configuration or extension modules supported by Weston Robot.
    2. The open-source mapping and navigation stacks are pre-installed **for demonstration purposes and are provided as is**. You can modify the software stack according to your requirements.

|

3. Hardware Configuration
==========================
|
.. image:: ugv_dev_kit/figures/base_iso.png
    :width: 380 px
    :class: largepadding
|

Basic Specifications
--------------------

+-----------------------------------+-----------------------------------+
| Dimensions                        | 310mm(L) x 280mm(B) x 200mm(H)    |
+-----------------------------------+-----------------------------------+
| Dry Weight (Incl. Power           | ~3kg                              |
| Regulator)                        |                                   |
+-----------------------------------+-----------------------------------+

.. image:: ugv_dev_kit/figures/dimensions.png
    :width: 720 px
    :class: largepadding


Power Module (In-built)
-----------------------
.. image:: ugv_dev_kit/figures/pwr_reg.png
    :width: 720 px
    :class: largepadding

+-----------------------+---------------+---------------+------------------------+------------+
|         Port          |    Voltage    | Current (Max) |         Power          |   Fused    |
+=======================+===============+===============+========================+============+
| Main input            | 18-32V        | 20A           | /                      | 20A fuse   |
+-----------------------+---------------+---------------+------------------------+------------+
| Output - 19V          | 19V           | 8A            | 150W                   | 10A fuse   |
+-----------------------+---------------+---------------+------------------------+------------+
| Output - 12V          | 12V           | 10A           | 120W                   | 15A fuse   |
+-----------------------+---------------+---------------+------------------------+------------+
| Output - 5V isolated  | 5V            | 4A            | 20W                    | Resettable |
+-----------------------+---------------+---------------+------------------------+------------+
| Output - 12V isolated | 12V           | 3.3A          | 40W                    | Resettable |
+-----------------------+---------------+---------------+------------------------+------------+
| Output - extension    | Input voltage | /             | Limited by total power | /          |
+-----------------------+---------------+---------------+------------------------+------------+ 

|
|

Removal of Front/Rear Latches
-----------------------------
-  Remove fasteners (2 x M5 bolts) from top of case.

-  Tilt latch outwards.

-  Lift latch to separate it from main frame.

.. image:: ugv_dev_kit/figures/front_plate.png
    :width: 720 px
    
Accessing Components in Kit
---------------------------
-  Internal hardware/wiring can either be accessed through the side or
   by sliding out hardware rack

-  To remove hardware rack:

   -  Remove the locking thumb screw

   -  Proceed to slide out rack


.. image:: ugv_dev_kit/figures/rails.png
    :width: 720 px

.. note::
    Please be reminded to remove connections such as power cables and connectivity ports before sliding out hardware rack!    
    
|

Optional Modules & Accessories
------------------------------

**Base Kit with Livox Lidar and IMU**

.. image:: ugv_dev_kit/figures/livox.png
    :width: 300 px

|
**Base Kit with Ouster OS1 Lidar**

.. image:: ugv_dev_kit/figures/ouster.png
    :width: 300 px