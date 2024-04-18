************
Dev Kit Base
************

.. Revision History
.. ================

.. +----------+-------------------+----------+------------------------------------------------------+
.. | Revision | Date (DD/MM/YYYY) | Author   | Changes                                              |
.. +==========+===================+==========+======================================================+
.. | 1        | 17/4/2024         | Kang Wei | Initial release                                      |
.. +----------+-------------------+----------+------------------------------------------------------+

1. Overview
===========

This Dev Kit base, together with a robot base, serves as the fundamental building block of a robot. 
Sensors can then be added based on the user's application requirements.

STEP files for the main frame is provided for users to customise their own sensors and configurations.

2. Specifications
=================

This Dev Kit base consists of the following pre-configured components:

NanoPC-T6 with Expansion Board
------------------------------
Octa-core ARM SBC with expansion board connects to the base and power regulator via CAN.

- Specifications:
    - Expansion board interfaces:
        - 3 x CAN
        - 2 x RS232
        - 2 x RS485
        - 1 x I2C

    - NanoPC-T6:
        - CPU: Rockchip RK3588
        - RAM: 8GB
        - Storage: 64GB eMMC
        - OS: Ubuntu 22.04

- Configuration:
    - user: wr
    - password: @westonrobot.com
    - ip address: 10.10.0.20

For more details on the SBC refer to:
https://wiki.friendlyelec.com/wiki/index.php/NanoPC-T6

5G Router
---------
5G router with dual-SIM and dual-band Wi-Fi. Router is pre-configured on delivery. Users can change the configuration as needed.

- Specifications:
    - 3 x LAN
    - 1 x WAN
    - Dual-SIM 5G
    - Dual-band Wi-Fi

- Network configuration:
    - LAN:
        - Subnet: 10.10.0.1/24
        - Gateway: 10.10.0.1

    - WIFI:
        - SSID: `[configured on delivery]`
        - Password: `@westonrobot.com`

    - Admin:
        - Username: `admin`
        - Password: `westonrobot[last 2 digits of purchase year]`

Power Regulator
---------------
Refer to:
    - :doc:`Weston Robot Power Regulator V2.X <../../periph_user_guide/westonrobot/power_regulator_v2.X>`

3. Resources
============

* STEP File: `wr_devkit_frame.step <https://tangrobot.sharepoint.com/:u:/s/Public-Outgoing/ESSh3kSet7lIrA2GDZ5hRpcBTJ-IbYX12QVHbQfLOz-1jg?e=qeuPiG>`_

* NanoPC-T6 image: *Available soon*

4. Usage
========

The Dev Kit base is expected to be used with robot base and sensors.
Refer to the steps below to control the robot base via /cmd_vel topic.

Bringup CAN interface
---------------------

.. code-block:: bash

    sudo ip link set can0 type can bitrate 500000
    sudo ip link set can0 txqueuelen 1000 # optional to increase tx buffer
    sudo ip link set can0 up

Refer to relevant ROS2 drivers for usage
----------------------------------------
- `Ranger/ Ranger Mini 2.0 <https://github.com/westonrobot/ranger_ros2>`_
- `Scout/ Scout Mini <https://github.com/westonrobot/scout_ros2>`_

Publish velocity command
------------------------

.. code-block:: bash

    ros2 topic pub /cmd_vel geometry_msgs/msg/Twist '{linear: {x: 0.1, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}' -1

    # or use teleop_twist_keyboard
    ros2 run teleop_twist_keyboard teleop_twist_keyboard