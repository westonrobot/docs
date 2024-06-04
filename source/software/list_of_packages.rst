****************
List of Packages
****************

C++ SDK
=======

* **Weston Robot Platform SDK (wrp_sdk)** 
  
  - This package provides a C++ API to interact with hardware including robot bases and peripherals
  - Github: https://github.com/westonrobot/wrp_sdk

* **Weston Robot Autonomy SDK (wra_sdk)**
  
  - This package provides a C++ API to access application-level functionalities, e.g. robot tele-operation, video streaming
  - Github: https://github.com/westonrobot/wra_sdk

ROS Package
===========

* **Weston Robot Platform ROS Support Package (wrp_ros)**

  - This package provides a light wrapper around wrp_sdk for ROS1
  - Github: https://github.com/westonrobot/wrp_ros
  
* **Weston Robot Platform ROS2 Support Package (wrp_ros2)**

  - This package provides a light wrapper around wrp_sdk for ROS2
  - Github: https://github.com/westonrobot/wrp_ros2
  
Widget Apps
===========

In order to install the widgets, please add the Weston Robot debian repository to your apt-get source list as described in section :ref:`Debian Repository <ref_add_debian_source>` first.

* **Power Regulator Widget (wr_regulator_widget)**
  
  - This widget allows monitoring and control of power regulator channels
  - Install from apt-get server with package name: wr_regulator_widget
  - Refer to this page for more details: :ref:`Power Regulator Software Setup <ref_power_regulator_software_setup>`
