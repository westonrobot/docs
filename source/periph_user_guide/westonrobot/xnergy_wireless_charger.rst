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

* Product Information and Quick Setup Guide: `PDF <https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EdIcNq9uoltChwj3n9j_OVABAD2w6EScJkQ5CZSaAglzOA?e=pblvWR>`_
* Xnergy Wireless Charger User Manual: `PDF <https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/ERdIePS-Lg1LoM-9KZqQ9zgBHKOEPuzd4qP-1OCQjj2lQw?e=QLd6fC>`_
* Xnergy RCU Control Flowchart: `PDF <https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/ESo251kq7bFLrjAa2BBOjhoBtz_fEFDQvJ0HW_PPpLVOmQ?e=reTarp>`_
* Xnergy RCU Operation Mode and Data Communication Specifications: `PDF <https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/ERb6mnv2hQFNvrVubTy-wAEBrNl_rR55JMpw6RQz6vCE_A?e=TMaui8>`_
* RCU Mounting and Installation Guide: `PDF <https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EYh31vtkAPFMlANKR3bI1DsBpX8PadhMd6vbsjITdAdp8A?e=39zbNp>`_
* Electronics Clearance Guidelines: `PDF <https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/ETJBZRZMToxEjEaqxita7WEBHdpi1nVvV-DNm1WQjGgLqg?e=ZOymAt>`_
* Product Safety Information: `PDF <https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EUaDV8nhryNGuv1R8KYHEs0B-C1KcvGq6v8MQx_dcW1u8A?e=Bdxcmo>`_
* Troubleshooting Guide: `PDF <https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EUcnhe9KgaRGiaf-ZOP2VyoBVIsMtv_wMXwzCDX7Q4txWQ?e=3gBcaZ>`_

Other Links
-----------
* ROS package: `xnergy_charger_rcu <https://github.com/westonrobot/xnergy_charger_rcu>`_