*******************************
Power Regulator V2.1 User Guide
*******************************

1. Overview
===========

The power management unit is designed by Weston Robot for mobile robot applications. It has the following features:

- Stable and low output ripple of the outputs
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

- Upon start up, both red and green leds would light up
- After that, a callibration process would happen for about 2 seconds
- After calibration, the unit would go into the operation state where the green led would be blinking at 1Hz frequency.
- If there is any firmware upgrade happenning, the green led would be turned off while red led would be blinking.

Output Connection
-----------------

The output ports of the power module are exposed with **Molex Megafit** connectors. For each port, 2 or 4 channels are provided. Note that the channels are interconnected internally, thus the total power consumption should not exceed the power ratings of the port.  

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

    #  1 install wr_regulator_widget dependencies
    $ sudo apt-get install libgl1-mesa-dev libglfw3-dev libcairo2-dev
    ## 2. install the package 
    $ sudo apt-get install wr_regulator_widget