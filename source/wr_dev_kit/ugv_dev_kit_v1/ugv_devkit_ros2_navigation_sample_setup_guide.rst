.. _ugv_devkit_ros2_navigation_sample_setup_guide:

*****************************************
UGV Devkit - ROS2 Navigation Sample Setup
*****************************************

Revision History
================

+----------+-------------------+-------------+------------------------+
| Revision | Date (DD/MM/YYYY) |    Author   | Changes                |
+==========+===================+=============+========================+
| 1        | 04/09/2024        | Kang Wei    | Initial release        |
+----------+-------------------+-------------+------------------------+

1. Overview
===========

This guide provides step-by-step instructions for running mapping and navigation samples on the UGV development kit and has been validated by Weston Robot for use with the :ref:`Scout Mini <ref_scout_mini>` and :ref:`Ranger Mini V2.0 <ref_ranger_mini_v2>` mobile robots. These samples serve as a starting point for developing mobile robots using ROS2. 

Getting Started
---------------

Review the following guide and README to set up your UGV development kit:

* :ref:`UGV Devkit Getting Started <ref_ugv_devkit_getting_started>`
* `wr_devkit_navigation <https://github.com/westonrobot/wr_devkit_navigation.git>`_

Tutorials
---------

* :ref:`Tutorial: Cartographer Mapping and Navigation <ref_cartographer>`
* :ref:`Tutorial: RTAB-Map (Real-Time Appearance-Based Mapping) and Navigation <ref_rtap_map>`

.. _ref_cartographer:

2. Cartographer Mapping and Navigation
======================================

Cartographer is a system that provides real-time simultaneous localization and mapping (SLAM) in 2D and 3D across multiple platforms and sensor configurations. For autonomous navigation through complex environments, cartographer is integrated with `Nav2 Navigation Stack <https://docs.nav2.org/>`_ by `Open Navigation <https://www.opennav.org/>`_.

You can find more information on `ROS2 Workshop <https://ros2-industrial-workshop.readthedocs.io/en/latest/_source/navigation/ROS2-Cartographer.html>`_ and `cartographer_ros <https://github.com/ros2/cartographer_ros>`_ GitHub repository.

Mapping
-------
1. Bringup the robot base and sensors. Open a new terminal and enter the command:
   ::
    ros2 launch wr_devkit_bringup wr_devkit_platform.launch.py robot_model:=<ROBOT_MODEL>
  
  +---------------------------+----------------+
  | Base                      | <ROBOT_MODEL>  |
  +===========================+================+
  | Ranger Mini 2.0 (default) | ranger_mini_v2 |
  +---------------------------+----------------+
  | Scout Mini                | scout_mini     |
  +---------------------------+----------------+

  .. note::
    Ensure the argument ``robot_model`` matches the robot model you are using. Adjust the launch file as necessary to align with your hardware and software setup

2. Launch Cartographer SLAM. In a new terminal, enter the command:
   ::
    ros2 launch wr_devkit_bringup wr_devkit_cartographer.launch.py

   After launching successfully, you should expect RVIZ to be opened:

   Control the robot around the environement using the remote controller or teleoperation by running ``ros2 run teleop_twist_keyboard teleop_twist_keyboard.py``. The speed should be slow throughout the mapping process. If the speed is too fast, the map quality may be affected.

3. After mapping completion, in a new terminal, navigate to the ``maps`` folder then save the map using ``map_server``.
   ::
    $ cd Workspace/wr_devkit_navigation/src/wr_devkit_bringup/maps
    $ ros2 run nav2_map_server map_saver_cli -f <YOUR_MAP_NAME>

Navigation
----------
1. Bringup the robot base and sensors. Open a new terminal and enter the command:
   ::
    ros2 launch wr_devkit_bringup wr_devkit_platform.launch.py robot_model:=<ROBOT_MODEL>

2. Launch Nav2 in a new terminal:
   ::
    ros2 launch wr_devkit_bringup wr_devkit_nav2.launch.py robot_param:=<ROBOT_PARAM> map:=<YOUR_MAP_YAML>

  +---------------------------+--------------------------------+
  | Base                      | <ROBOT_PARAM>                  |
  +===========================+================================+
  | Ranger Mini 2.0 (default) | nav2_ranger_mini.param.yaml    |
  +---------------------------+--------------------------------+
  | Scout Mini                | nav2_scout_mini.param.yaml     |
  +---------------------------+--------------------------------+

  Ensure the ``robot_param`` argument matches the robot base you are using. Then, replace ``<YOUR_MAP_YAML>`` with the absolute path to the map YAML file you saved. After launching successfully, You should expect a visualization similar to the following:

3. Generally, the laser scan display does not overlap with the map. To fix this, click on the ``2D Pose Estimate`` button. Then, on the map, click on the location where the robot is located, and drag the arrow to the direction the robot is facing. Repeat this step until the laser scan display overlaps with the map.

4. With an accurate estimation of the robot's location, we can now set a navigation goal for the robot to move toward. Click on the ``2D Nav Goal`` button, then click on the location on the map where you want the robot to move to, and drag the arrow to set the orientation. The robot should start moving towards the goal.

.. _ref_rtap_map:

3. RTAB-Map and Navigation
==========================