###################
UGV System Overview
###################

ROS to CAN/Serial interface
***************************

This segment runs throughs the interface between ROS messages and low level communications (CAN / Serial)

The conversion from ROS message to CAN frame occurs in two main steps as shown in the flow chart.

   .. image:: ../../../_figures/Communication_overview.png
      :width: 400


Moving down the flow chart:

#. The *ROS/C++ Interface* will create a node that listens for ROS messages of a specified ROS topic. 

#. The information in the ROS message will be translated into a platform-unique C++ data structure known as a *Platform Command*. 

#. The *C++/CAN Interface* is implemented in *ugv_sdk* which contains the subroutines required to translate these platform into CAN frames. 

#. Furthermore, *ugv_sdk* handles the communication of the CAN frame through the CAN bus.

Moving up the flow chart:
#. The Basic Operations Interface will also contain the subroutines required to read the CAN frames and translate them 
into platform-unique *Platform Messages*. 

#. These messages can then be translated into ROS messages by the ROS interface. 

#. The ROS interface will also handle publishing of these messages to the appropriate ROS topic. 

With reference to the Overview of Software Packages, <platform>_base handles the ROS Interface. ugv_sdk handles the Basic Operations Interface.

CAN/Serial Interface/ugv_sdk
*****************************

This segment outlines how the ugv_sdk: https://github.com/westonrobot/ugv_sdk handles the CAN communication.

If you are:

#. developing the *ROS/C++ interface* | *<platform>_base* or

#. updating *C++/CAN Interface* | *ugv_sdk* to support an additional robot

this segment is extremely crucial.

CAN Interface
=============
Information on CAN bus can be found in https://www.youtube.com/watch?v=FqLDpHsxvf8 and https://en.wikipedia.org/wiki/CAN_bus.

Many protocols for communication through the CAN bus is similar for different platforms. 
As such, an abstract class `MobileBase` was designed as the super class of the CAN interface class for each robot model.

On the level of `MobileBase` the following is handled:

1. Setting up CAN connection
2. Disconnecting CAN connection 
3. Maintaining stream of CAN Frames

Enabling CAN communication
--------------------------
If the computer you are using contains a physical CAN bus, communication via CAN bus should be simple.
Otherwise, a USB to CAN adaptor can be used. If a USB to CAN adaptor is used, the follwing commands are required::

$ sudo modprobe gs_usb
$ sudo ip link set can0 up type can bitrate 500000


Starting CAN connection
-----------------------

During the setting up of the CAN connection, the protocol used to read the CAN Frame `ParseCANFrame()` will be set. 

Since each platform will process CAN Frames differently, each platform will write its own ParseCANFrame(can_frame *rx_frame*) function. 

To ensure the safe operation of the robots, the robots requires a steady stream of commands from the computer.
This is to ensure that if communication is lost, the robots would not be stuck executing the previously sent command, 
and instead the robot will stop moving.

Maintaining stream of CAN Frames
--------------------------------
The control of this continuous stream of CAN Frames is handled by the::

   void MobileBase::ControlLoop(int32_t period_ms)

in the MobileBase class. 

However, the types CAN Frames varies between robots. 
Therefore, the actual function designed to send each message is determined by each platform in the `SendRobotCmd()` function
i.e. Each platform designs its own CAN Frame sending protocol while the MobileRobot abstract class maintains the loop
to consistently send CAN frames to the robot.

Disconnecting CAN connection 
----------------------------


Testing CAN connection
----------------------

After connecting the robot and the computer via the CAN bus, an additional device should show up from the commands::

   $ ifconfig -a

The new device should be identified as:: 

   can#: flags=.....

whereby # is a number, usually # = 0. 

If this occurs, it indicates that the computer is actually connected to the robot via the CAN bus. 

For the segments below, it is assumed that the connection occurs at can0.

You can attempt to read the data being sent via the CAN bus using:: 

   $ candump can0

If the comuunication is working properly, a stream of hexamdeximal should be flooding the command line. If instead the message:: 

   read: Network is down 

is shown, it indicates that TODO: not sure exactly what is indicates::

   $ sudo ip link set can0 up type can bitrate 500000

could fix this issue

Further debugging of CAN
------------------------
If the CAN communication between the computer and the platform is still unable to occur, there might be a hardware fault on the robot platform
affecting the CAN communication. The following websites provide a simple overview on how you could go about debugging 
the hardware on the robot platform.

https://www.ti.com/lit/an/slyt529/slyt529.pdf?ts=1600396027624&ref_url=https%253A%252F%252Fwww.google.com%252F

https://www.ti.com/lit/an/slyt529/slyt529.pdf?ts=1600396027624&ref_url=https%253A%252F%252Fwww.google.com%252F

https://support.enovationcontrols.com/hc/en-us/articles/360038856494-CAN-BUS-Troubleshooting-Guide-with-Video-

A simple set of instructionss is given below. These instructions assume basic 
knowledge on electrical engineering and circuits. Furthermore, it is assumed that you have read through the links given above


#. The robot platforms Scout and Hunter do not have termination resistors between the CAN HI and LO terminals. As such:

   * If all peripherals are disconnected from the robot, and you measure the resistance betwweenn CAN HI and LO terminals, a reading of about 50 M ohms or even open circuit is expected.

   * The computer connected to the platform should contain a terminationn resistor of 120 ohms. (If the board provided by weston robots is used, a jumper can be used to attach/dettacch the 120 ohm resistor.

#. With the platform switched off, test the connectivity between corresponding pins of the CAN interface. i.e. Test that CAN HI on all CAN interfaces are connected to each other. If the different ports are not connected, there is likely an internal wiring issue with the platform

ROS Interface
*************
.. toctree::
   :maxdepth: 1

In general, the role of the ROS interface is simply to translate messages between platform specific C++ data structures and ROS topics.

The implementation of the ROS Interface will differ greatly between differet platform. For information on platform specific details, refer to the pages on each inidviudal platofrm.