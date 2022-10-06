*******************************
Roger Robot Hand User Guide
*******************************

Revision History
================

+----------+-------------------+--------+-----------------+
| Revision | Date (DD/MM/YYYY) | Author | Changes         |
+==========+===================+========+=================+
| 1        | 06/10/2022        | Hans   | Initial release |
+----------+-------------------+--------+-----------------+

1. Overview
===========
The Roger robot hand is designed as a end-effector for collaborative robots.  It has the following feature:

- Grasping and holding of items
- Hand-like monitoring
- User interface: ROS1, Ubuntu App

2. Specifications
=================

2.1 In the box
--------------
.. TODO: Add image of package
+---------------------------------------+--------+
| Item                                  | Amount |
+=======================================+========+
| Roger Hand                            | 1      |
+---------------------------------------+--------+
| Base Plate                            | 2      |
+---------------------------------------+--------+
| Power Supply                          | 1      |
+---------------------------------------+--------+
| Control Box                           | 1      |
+---------------------------------------+--------+
| Aviator CX12-5pin female-female cable | 1      |
+---------------------------------------+--------+
| USB A male-male cable                 | 1      |
+---------------------------------------+--------+

2.2 Control Box
---------------
.. TODO: Ask zgt what is ethernet port used for
+---------------+----------+-------------------------+
| Port          | Protocol | Function                |
+===============+==========+=========================+
| USB A port    | USB      | Communication interface |
+---------------+----------+-------------------------+
| Ethernet port | /        | Future extension        |
+---------------+----------+-------------------------+

3. Hardware Setup
=================

3.1 Startup and Operation
-------------------------

3.1.1 Connection
~~~~~~~~~~~~~~~~
.. TODO: Add image of connection
1. Connect provided aviator cable to hand and control box.
2. Connect provided power supply to control box and power outlet.
3. Connect provided USB cable to control and host computer.
4. Switch on the power supply.

3.1.2 Computer
~~~~~~~~~~~~~~
* On Ubuntu
    * Device will show up as a /dev/ttyUSBx device.
* On Windows
    * Device will show up as a COMx port device.
    * :red:`You might need to install the CP210x driver first, available at:` https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads

4. Software Setup
=================
There are 2 ways to interface with the hand out-of-the-box.
    1. ROS1 Driver
    2. Ubuntu Testing App

4.1 ROS1 Driver
---------------

4.1.1 Setting up
~~~~~~~~~~~~~~~~
| The ROS1 driver can be found here: https://github.com/westonrobot/roger_hand_ros
| Follow the README on the github repo to setup the hand for communication with computer.

4.2.2 Running
~~~~~~~~~~~~~
.. code-block:: bash

    $ roslaunch roger_hand_bringup roger_hand_server.launch

- Parameters
+-----------+-------------------------+----------------+
| Parameter | Description             | Default        |
+===========+=========================+================+
| port_name | port to the control box | "/dev/ttyUSB0" |
+-----------+-------------------------+----------------+

- Published Topics
+--------------+-----------------------------+-------------------+
| Topics       | Message Format              | Description       |
+==============+=============================+===================+
| ~/hand_state | roger_hand_msgs::hand_state | State of the hand |
+--------------+-----------------------------+-------------------+


