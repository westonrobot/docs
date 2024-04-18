************************
Livox MID-360 Sensor Kit
************************

.. Revision History
.. ================

.. +----------+-------------------+----------+------------------------------------------------------+
.. | Revision | Date (DD/MM/YYYY) | Author   | Changes                                              |
.. +==========+===================+==========+======================================================+
.. | 1        | 17/4/2024         | Kang Wei | Initial release                                      |
.. +----------+-------------------+----------+------------------------------------------------------+

1. Overview
===========

This sensor kit mounts the Livox MID-360 LiDAR and a 9-axis IMU onto the base development kit for mapping and navigation capabilities.

2. Specifications
=================

This sensor kit consists of the following pre-configured components:

Livox MID-360 LiDAR
-------------------
Livox compact, lightweight LiDAR

- Configuration:
    - ip address: 10.10.0.30
    - host_ip: 10.10.0.20 

*host_ip refers to IP address of computer to send to*

Hipnuc IMU
----------
Hipnuc IMU supported by wrp_ros2 driver

- Specifications:
    - 9 Axis
    - USB2.0

3. Resources
============

* Livox MID-360 Manual: *Available soon*

4. Usage
========

**Sample** setups are provided for users to reference and build upon.

    - `LIO-SAM <https://github.com/westonrobot/wr_devkit_mapping>`_
    - `Nav2 <https://github.com/westonrobot/wr_devkit_navigation>`_