***********************
xArm Manipulator Series
***********************

Revision History
================

+----------+-------------------+----------+------------------------+
| Revision | Date (DD/MM/YYYY) | Author   | Changes                |
+==========+===================+==========+========================+
| 1        | 04/12/2022        | Kee Jin  | Initial release        |
+----------+-------------------+----------+------------------------+

1. Overview
===========
The xArm is a multi-DOF robot arm manipulator with use cases ranging from machine tending to industrial automation.

2. Specifications
=================

.. list-table:: Common Technical Specifications
   :widths: 25 25

   * - Ambient Temperature Range
     - 0 - 50 ℃
   * - Power Consumption
     - Min 8.4 W, Typical 200 W, Max 400 W
   * - Input Power Supply 
     - 24V DC, 16.5A  
   * - Footprint
     - Ø 126 mm
   * - Materials
     - Aluminum, Carbon Fiber
   * - Base Connector Type 
     - M5 x 5
   * - ISO Class Cleanroom
     - 5
   * - End Effector Communication Protocol
     - Modbus RTU (RS485) 
   * - End Effector I/O
     - 2 x DI / 2 x DO / 2 x AI / 1 x RS485
   * - Communication Mode
     - Ethernet

.. table:: Specific Technical Specifications

   +----------------------------+------------+------------+------------+
   |                            |   xArm 5   |   xArm 6   |   xArm 7   |
   +============================+============+============+============+
   | Payload                    | 3kg        | 5kg        | 3.5kg      |
   +----------------------------+------------+------------+------------+
   | Reach                      | .. centered:: 700mm                  |
   +----------------------------+------------+------------+------------+
   | Degrees of Freedom         | 5          | 6          | 7          |
   +----------------------------+------------+------------+------------+
   | Repeatability              | ±0.1mm     | ±0.1mm     | ±0.1mm     |
   +----------------------------+------------+------------+------------+
   | Maximum Speed              | 1m/s       | 1m/s       | 1m/s       |
   +----------------------------+------------+------------+------------+
   | Weight(robot arm only)     | 11.2kg     | 12.2kg     | 13.7kg     |
   +----------------------------+------------+------------+------------+ 

.. table:: Joint Limits    

   +--------------------+--------------+--------------+--------------+
   |                    |    xArm 5    |    xArm 6    |    xArm 7    |
   +====================+==============+==============+==============+
   | Maximum Speed      | .. centered:: 180°/s                       |
   +--------------------+--------------------------------------------+
   | Joint 1            | .. centered:: ±360°                        |
   +--------------------+--------------------------------------------+
   | Joint 2            | .. centered:: -118° - 120°                 |
   +--------------------+-----------------------------+--------------+
   | Joint 3            | .. centered:: -225° - 11°   | ±360°        |
   +--------------------+--------------+--------------+--------------+
   | Joint 4            | -97° - 180°  | ±360°        | -11° - 225°  |
   +--------------------+--------------+--------------+--------------+
   | Joint 5            | ±360°        | -97° - 180°  | ±360°        |
   +--------------------+--------------+--------------+--------------+ 
   | Joint 6            | NA           | ±360°        | -97° - 180°  |
   +--------------------+--------------+--------------+--------------+ 
   | Joint 7            | NA           | NA           | ±360°        |
   +--------------------+--------------+--------------+--------------+ 

3. Resources
============

* Manuals, Software, 3D models: `xArm Download Page <https://www.ufactory.cc/download-xarm-robot>`_
* Python SDK: `xArm-Python-SDK <https://github.com/xArm-Developer/xArm-Python-SDK>`_
* C++ SDK: `xArm-CPLUS-SDK <https://github.com/xArm-Developer/xArm-CPLUS-SDK>`_
* ROS package: `xarm_ros <https://github.com/xArm-Developer/xarm_ros>`_
* ROS2 package: `xarm_ros2 <https://github.com/xArm-Developer/xarm_ros2>`_
* CAD File #1: `XArm5.STEP <https://tangrobot.sharepoint.com/sites/ProductDevelopment/Shared%20Documents/Forms/AllItems.aspx?ga=1&id=%2Fsites%2FProductDevelopment%2FShared%20Documents%2FGeneral%2FPublic%20Sharing%2FCAD%2Fdocs%2FManipulators%2FxArm6%28XI1300%29%2ESTEP&viewid=cb47fb93%2D32a7%2D4da8%2Db2ed%2De5f6463d97ba&parent=%2Fsites%2FProductDevelopment%2FShared%20Documents%2FGeneral%2FPublic%20Sharing%2FCAD%2Fdocs%2FManipulators>`_
* CAD File #2: `DC_ControlBox_for_XArm <https://tangrobot.sharepoint.com/sites/ProductDevelopment/Shared%20Documents/Forms/AllItems.aspx?ga=1&id=%2Fsites%2FProductDevelopment%2FShared%20Documents%2FGeneral%2FPublic%20Sharing%2FCAD%2Fdocs%2FManipulators%2FDC%20Control%20Box%28DC1300%29%5Ffor%20XArm%2ESTEP&viewid=cb47fb93%2D32a7%2D4da8%2Db2ed%2De5f6463d97ba&parent=%2Fsites%2FProductDevelopment%2FShared%20Documents%2FGeneral%2FPublic%20Sharing%2FCAD%2Fdocs%2FManipulators>`_