*******************************
Power Regulator V2.1 User Guide
*******************************

1. Overview
===========

The power management unit is designed by Weston Robot for mobile robot applications. It has the following features:

- Stable and low output ripple for the outputs channels
- All ports are fused for protection of both battery and connected devices
- Supports soft-start to avoid current surge during startup
- Temperature monitoring and regulation with active fan cooling
- The output ports can be controlled individually (on/off) for finer boot sequence control
- Output voltage and current feedback via CAN/RS485 communication port

2. Specifications
=================

Power Module
------------

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
| Output - extension    | input voltage | /             | limited by total power | /          |
+-----------------------+---------------+---------------+------------------------+------------+ 

Control Module
--------------

+-------+----------+---------------------------------------------+
| Port  | Protocol |                  Function                   |
+=======+==========+=============================================+
| CAN   | CANopen  | monitoring and control, firmware upgrade    |
+-------+----------+---------------------------------------------+
| RS485 | /        | firmware upgrade (backup), future extension |
+-------+----------+---------------------------------------------+

3. Hardware Setup
=================

Startup and Operation
---------------------

- Upon start up, both red and green leds would light up for 2 seconds
- After that, both red and green leds would be turned off indicating process of calibration
- The calibration would take 2 seconds
- After calibration, the unit would go into the operational state where the green led would be lighted up
- If there is any firmware upgrade happenning, the green led would be turned off while red led would be blinking

Output Connection
-----------------

The output ports of the power module are exposed with **Molex Megafit** connectors. For each port, 2 or 4 channels are provided. Note that the channels are interconnected internally, thus the total power consumption should not exceed the power ratings of the port.  

**Note** The operation of the fan is dependent on the state of the 12V channel, it will operate only when the 12V channel is on.
The fan would be turned on once the temperature reaches 28°C, and having maximum speed once the temperature reaches 40°C and above.

.. _ref_power_regulator_software_setup:

4. Software Setup
=================

The power regulator uses CANopen to communication with a computer. 

**Note** The CANopen driver for the power regulator is supported by wrp_sdk since version 1.0.0. 

Follow the following instructions to install the latest SDK.

Install Dependencies
--------------------

.. code-block:: bash

    $ sudo apt-get install -y software-properties-common 
    $ sudo add-apt-repository ppa:lely/ppa && sudo apt-get update
    $ sudo apt-get install -y pkg-config liblely-coapp-dev liblely-co-tools

Install the SDK
---------------

Please add the debian repository to your apt-get source list firt. Refer to section :ref:`Debian Repository <ref_add_debian_source>`

.. code-block:: bash

    $ sudo apt-get install wrp_sdk

Install the Widget
------------------

Please make sure you have followed the instructions above and installed the SDK.

.. code-block:: bash

    # 1 install wr_regulator_widget dependencies
    $ sudo apt-get install libgl1-mesa-dev libglfw3-dev libcairo2-dev
    # 2. install the package 
    $ sudo apt-get install wr_regulator_widget


5. Configuration
================

Setting Default State for Channels
----------------------------------

By default, all the output channels are turned off once the power regulator is powered on for safety.

Nevertheless, for some applications, you may want to have some output channels on by default.

For example, if the PC powered on by the output channels is in charge of controlling the power regulator, then the output channel connected to the PC should be turned on by default.

The default state is stored in non-volatile storage ROM, in other words, the default state set would remain even the power regulator reboots.

Install dependencies
^^^^^^^^^^^^^^^^^^^^

python-can can be used to set default state for channels, 

.. code-block:: bash

   pip3 install --user canopen python-can

Configure python-can to use your CAN adapter through its
configuration file. On GNU/Linux, the configuration looks similar to
this:

.. code-block:: bash

   cat << EOF > ~/.canrc
   [default]
   interface = socketcan
   channel = can0
   bitrate = 500000
   EOF

Next, bring up the CAN interface on the PC.

.. code-block:: bash

   sudo ip link set can0 type can bitrate 500000
   sudo ip link set up can0

Configure with Python scripts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The example code below demonstrates how to set all output channels to be on by default

.. code-block:: bash

    import canopen
    import os
    import time

    EDS = <your-path-to-eds> // eg. /opt/weston_robot/share/wrp_sdk/eds/regulator/regulator_v2.1.eds
    NODEID = 30

    network = canopen.Network()

    network.connect()

    node = network.add_node(NODEID, EDS)

    print("----------------------")
    print("Initial Output state:")
    print("----------------------")
    print("19V {}".format(node.sdo['Output state'][1].raw))
    print("12V {}".format(node.sdo['Output state'][2].raw))
    print("Isolated 12V {}".format(node.sdo['Output state'][3].raw))
    print("Isolated 5V {}".format(node.sdo['Output state'][4].raw))

    print("----------------------")
    time.sleep(1)
    print("Setting Output command:")
    print("----------------------")
    print("19V True")
    node.sdo['Output command'][1].raw = 1
    print("12V True")
    node.sdo['Output command'][2].raw = 1
    print("Isolated 12V True")
    node.sdo['Output command'][3].raw = 1
    print("Isolated 5V True")
    node.sdo['Output command'][4].raw = 1
    node.store() # store into ROM 
    # node.restore() # restore ROM
    network.disconnect()