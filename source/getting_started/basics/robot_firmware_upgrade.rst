**********************
Robot Firmware Upgrade
**********************

.. _Scout2.5+FWUpgrade:

Scout (>V2.5) Robot
===================

**Important:** Please approach us for Firmware Update Manager and latest firmware updates.

- To upgrade the firmware, please ensure you have the following items

   - Laptop running on Ubuntu 18.04/20.04
   - USB to CAN + Power cables for Peripheral and Control Board
   - Signed binary image from Weston Robot
   - Weston Robot Firmware Update Manager executable from Weston Robot

.. figure:: figures/scout26_io.jpg
    :width: 500px
    :align: center
    
    Middle aviation connector for Control Board. Left aviation connector for Peripheral Board

- Connect powered on robot
- Setup CAN connection for both/either boards

.. code-block:: bash

    $ sudo modprobe gs_usb
    # Replace can<X> e.g. can0
    $ sudo ip link set up can<X> type can bitrate 1000000 
    $ sudo ip link set can<X> txqueuelen 10000

- Launch Weston Robot Firmware Update Manager

.. code-block:: bash

    $ ./wr_firmware_manager

- Verify the boards are connected

    - Select boards via drop-down menu at "Board Selection"
    - Click "Check"
    - The hardware and software versions are displayed, otherwise error will be displayed

- Upgrade the firmware

    - Select boards via drop-down menu at "Board Selection"
    - Browse and select binary file to be flashed
    - Click "Update"
    - Wait for for update to complete, robot will restart once flashing completes
        - Robot may beep during this time, this is normal behaviour
        - The "Confirm" action should be executed by default upon restarting, if it fails, restart the robot and click "Confirm"

.. _Scout2.5FWUpgrade:

Scout V2.5 Robot
================

- To upgrade the firmware, please ensure you have the following items
   - Laptop running on Ubuntu18.04
   - USB to Micro USB cable
   - Signed binary image from Weston Robot
   - MCU Manager installed (kindly refer for the installation guide below)

Installation guide for MCU Manager (mcumgr)
-----------------------------------------------

1. Installation for Go.

.. code-block:: bash

    $ sudo apt install golang-go

2. Verify whether Go is installed properly by the following command.

.. code-block:: bash

    $ go version

3. Now you can install mcumgr CLI.

.. code-block:: bash

    $ cd 
    $ go get github.com/apache/mynewt-mcumgr-cli/mcumgr
    $ nano ~/.bashrc

1. Add in path for mcumgr into .bashrc file

.. code-block:: bash

    $ export PATH=$PATH:<path-to-home-directory>/go/bin/
    $ alias sudo='sudo env PATH=$PATH'

5. Verify whether mcumgr is installed properly by the following command.

.. code-block:: bash

    $ source ~/.bashrc
    $ mcumgr version

**Troubleshooting**

- If the installed golang-go is an older version, the "go get..." command in **step 3** might fail. To get around this error, manually install a newer version of go by following the instructions from golang's `website <https://golang.org/doc/install>`_ and reattempt installation from **step 3**.

Firmware upgrade using MCU Manager through USB cable
--------------------------------------------------------

- After you have installed mcumgr, now you should be able to upgrade the firmware through USB cable.
- Connect your computer to the MicroUSB port on robot using USB to Micro USB cable.
- Check on your computer for the device connected by the following command.

.. code-block:: bash

    $ ls /dev

- if there is only one USB device connected you should be able to see device named "ttyUSB0", if there are more instances such as "ttyUSB1", you can check the device using the following command. 

.. code-block:: bash

    $ sudo mcumgr <connection string> image list

The default connection string is 

.. code-block:: bash

    --conntype serial --connstring "/dev/ttyUSB0,baud=115200"

- You should be able to see something like below

.. image:: figures/scout_v2.5_07.png

- If you don't get any response, replace the connstring to other USB instance appeared on your computer such as "/dev/ttyUSB1,baud=115200".
- Assuming your USB device appeared on your computer is "/dev/ttyUSB0", you can upload the image with the following command.

.. code-block:: bash

    $ sudo mcumgr <connection string> image upload <path-to-signed.bin>


- Wait for about 3 seconds, you should be able to see something like below

.. image:: figures/scout_v2.5_08.png

- Wait until the process is Done. 

.. image:: figures/scout_v2.5_08-2.png

- You can check whether the image is uploaded succesfully by the following command.

.. code-block:: bash

    $ sudo mcumgr <connection string> image list

.. image:: figures/scout_v2.5_09.png
    
- Copy the hash of latest image to be used in next step, in this example, it is  

.. code-block:: bash

    d89511ec321ebc4e0cd3775f9be05a6c8880bdfded37213e430fa6cfcbbdc6ec

- Now confirm the image by running the following command

.. code-block:: bash

    $ sudo mcumgr <connection string> image confirm <hash of image>


.. image:: figures/scout_v2.5_10.png

- Reset by the following command
  
.. code-block:: bash

    $ sudo mcumgr <connection string> reset


.. image:: figures/scout_v2.5_11.png

- Wait for about 30 seconds and run the following command

.. code-block:: bash

    $ sudo mcumgr <connection string> image list


- You should be able to see the following

.. image:: figures/scout_v2.5_12.png

- Now, you have upgraded the firmware successfully to a newer version.
- If you would like to revert the previous firmware, you can do so by confirming the image with hash of old image followed by a reset. 


AgileX Robot Base
=================


Unitree Robot Dog 
=================

