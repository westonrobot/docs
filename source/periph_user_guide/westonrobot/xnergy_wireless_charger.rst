***********************
Xnergy Wireless Charger
***********************

Revision History
================

+----------+-------------------+---------+----------------------------------------------+
| Revision | Date (DD/MM/YYYY) | Author  | Changes                                      |
+==========+===================+=========+==============================================+
| 1        | 27/12/2022        | Kee Jin | Initial release                              |
+----------+-------------------+---------+----------------------------------------------+
| 2        | 18/1/2023         | Hans    | Remove broken xdm links and provide contact. |
+----------+-------------------+---------+----------------------------------------------+

1. Overview
===========

The Xnergy Wireless Charger is a simple-to-use wireless charging module ideal for use in mobile robot deployment. It comes with a Transmitter Powering Unit (TPU), Transmitter Pad (TXP) 
and Receiver Charging Unit (RCU).

2. Specifications
=================

Charging Power Capability
-------------------------

+-----------------------+-----------------------------+-----------------------------+
|                       |  24V System (BE-RCU3090M)   |  48V System (BE-RCU6050M)   |
+=======================+=============================+=============================+
| Voltage Range         |           15-30V            |            15-60V           |
+-----------------------+-----------------------------+-----------------------------+
| Maximum Current       |             90A             |             50A             |
+-----------------------+-----------------------------+-----------------------------+

Supported Communication Protocols
---------------------------------
- Modbus RTU (RS485)
- CAN Bus 2.0B
- GPIO (3.3V to 12V)

Maximum Effective Air Gap Charging Capability
---------------------------------------------

+-------+------------+
| Axis  |  Deviation |
+=======+============+
|   X   |    ±4cm    |
+-------+------------+
|   Y   |    ±1cm    |
+-------+------------+
|   Z   |    2-6cm   |
+-------+------------+

3. Software Setup
=================

The Xnergy Wireless Charger settings can be modified with the Xnergy Device Manager (XDM), contact us at `contact@westonrobot.com <contact@westonrobot.com>`_ to get it.

4. Resources
============

Manuals and Documentation
-------------------------

* Product Information and Quick Setup Guide: :download:`PDF <manual/20221227 - Xnergy Wireless Charging Product Information and Quick Setup Preparation.pdf>`
* Xnergy Wireless Charger User Manual: :download:`PDF <manual/BET7E51 - User Manual v1.2.pdf>`
* Xnergy RCU Control Flowchart: :download:`PDF <manual/BEQ574W - Quick Guide of Flowchart on Controlling Xnergy RCU.pdf>`
* Xnergy RCU Operation Mode and Data Communication Specifications: :download:`PDF <manual/BEAB6BA - Control and Monitor your charger v1.07.pdf>`
* RCU Mounting and Installation Guide: :download:`PDF <manual/BEA29CC - Side Mounting Guide v2.0.pdf>`
* Electronics Clearance Guidelines: :download:`PDF <manual/BEAC018 - Electronics Clearance Guidelines v.2.0.pdf>`
* Product Safety Information: :download:`PDF <manual/BEW59ED - Safe Deployment of Xnergy Wireless Charger v1.0.xps.pdf>`
* Troubleshooting Guide: :download:`PDF <manual/BEAB5F2 - Troubleshoot Guide v1.0.pdf>`

Other Links
-----------
* ROS package: `xnergy_charger_rcu <https://github.com/westonrobot/xnergy_charger_rcu>`_