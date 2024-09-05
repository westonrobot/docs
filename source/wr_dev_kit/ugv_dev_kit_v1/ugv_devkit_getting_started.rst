.. _ref_ugv_devkit_getting_started:

Getting Started
===============

Connecting the Robot PC to your WiFi Network
--------------------------------------------
The devkit is equipped with an Industrial 5G/WiFi Router and can act as an AP client to provide internet connectivity. Review the following guide and configure your router to connect to an existing WiFi network.

* :ref:`Industrial 5G/WiFi Router <ref_onboard_industrial_5g_wifi_router>`

Connecting your PC to the Robot PC via SSH
---------------------------------------
You can control, deploy, launch, and debug applications from your PC. Alternatively, you can develop your applications directly on the robot PC by connecting a display, keyboard, and mouse to the robot PC or use a remote desktop application to access. 

1. Connect to the WiFi broadcasted by the :ref:`Industrial 5G/WiFi Router <ref_onboard_industrial_5g_wifi_router>` in the devkit.
2. From your PC, open a terminal and run the following command to SSH into the robot PC. Enter the robot PC password when prompted (Refer to the handover note for the login credentials and the IP address of the Robot PC).
   ::
    ssh <USER>@<ROBOT_PC_IP>

.. note::
    Replace ``<USER>`` and ``<ROBOT_PC_IP>`` with the values for your robot. For example, ``ssh wr@10.10.0.20``