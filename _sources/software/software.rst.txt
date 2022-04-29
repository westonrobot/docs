#################
Software Packages
#################

.. .. contents::
..    :depth: 1
..    :local:

Here you can find software packages provide by Weston Robot:

.. toctree::
   :maxdepth: 1

C++ SDK
=======

* **Weston Robot Platform SDK (wrp_sdk)** 
  
  - wrp_sdk provides a C++ API to interact with robot bases and peripherals
  - Github: https://github.com/westonrobot/wrp_sdk
  - Supported OS: Ubuntu 18.04/20.04
  - Supported Robot: 
     - Scout V2.5/V2.6
     - Scout Mini
     - Tracer
  - Supported Peripheral:
     - IMU: Hipnuc/Wit-Motion
     - GPS: NMEA-compatible

* **Weston Robot Autonomy SDK (wra_sdk)**
  
  - https://github.com/westonrobot/wra_sdk
  - wra_sdk provides a C++ API to access application-level functionalities developed by Weston Robot, for example, robot tele-operation, video streaming

ROS Package
===========

* **Weston Robot Platofrom ROS Support Package (wrp_ros)**

  - This package provides a light wrapper around wrp_sdk for ROS1
  - Github: https://github.com/westonrobot/wrp_ros
  
* **Weston Robot Platofrom ROS2 Support Package (wrp_ros2)**

  - This package provides a light wrapper around wrp_sdk for ROS2
  - Github: https://github.com/westonrobot/wrp_ros2
  
Widget Apps
===========

In order to install the widget, please add the Weston Robot debian repository to your apt-get source list as described in section :ref:`Debian Repository <ref_add_debian_source>` first.

* **Power Regulator Widget (wr_regulator_widget)**
  
  - This widget allows monitoring and control of power regulator channels
  - Install from apt-get server with package name: wr_regulator_widget
  - Refer to this section :ref:`Power Regulator Software Setup <ref_power_regulator_software_setup>`

Package Installation
====================

Build from Source
-----------------

Please refer to the **README** in the cooresponding github repository for instructions to build the package from source.

.. _ref_add_debian_source:

Debian Repository
-----------------

C++ library and binary packages (including the widget apps) are provided as ".deb" installation packages. You can download the ".deb" packages from the cooresponding github repository and install with "dpkg" or "apt-get" command. Or you can install the packages from the apt-get server directly. 

Here are the steps you can follow to add the Weston Robot package source:

.. code-block:: bash

    $ echo "deb https://westonrobot.jfrog.io/artifactory/wrtoolbox-release $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/weston-robot.list
    $ curl -sSL 'https://westonrobot.jfrog.io/artifactory/api/security/keypair/wr-deb/public' | sudo apt-key add -
    $ sudo apt-get update

Now you can install packages with "apt-get" command. 

**Important:** Installation of additional third-party dependency packages may be required for a package provided by Weston Robot. Please follow the package-specific instructions.