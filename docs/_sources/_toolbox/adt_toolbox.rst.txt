********************************************
Weston Robot Asssisted Driving Toolbox (ADT)
********************************************

Weston Robot proudly presents the Assisted Driving Toolbox (ADT), a teleoperation system designed and developed by Weston Robot for usage on multiple mobile robot platforms. The system allows the the control and operation of an robot through a shared network; with a wide coverage of its surroundings using mounted onboard camera modules.

.. image:: https://cdn.nlark.com/yuque/0/2021/png/21990865/1634203319259-97fb8982-89e0-4ec3-b831-8e244199cd0a.png#clientId=u3f917be2-7d1f-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u490b4231&margin=%5Bobject%20Object%5D&name=Screenshot_20211014_170652.png&originHeight=1109&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2671638&status=done&style=none&taskId=u1ddb83e4-9431-4bc5-a416-3554f64ca47&title=


Assisted Driving Server Setup
=============================

Service Management
------------------

The Assisted Driving Toolbox servers has been configured to startup upon the robot's boot up as a systemd service.

- To restart the server

.. code-block:: bash

    $ sudo systemctl restart wr_adt_server.service
  
- To stop the server

.. code-block:: bash

    $ sudo systemctl stop wr_adt_server.service

Video Streaming Configuration
-----------------------------

The following parameters can be configured:

1. Camera (**/opt/weston_robot/docker/wr_adt_server/config.yaml**)
  
   * Image resolution
   * Compression rate
   * Video stream endpoints
  
2. Server (**/opt/weston_robot/docker/wr_adt_server/docker-compose.yaml**)
   
   * Streaming ip address
  
You can refer to comments inside the cooresponding configuration file for available options.

Assisted Driving Client Setup
=============================

System Requirements
-------------------

1. Host computer running Ubuntu 18.04/20.04
2. Joystick for control with the Assisted Driving Toolbox Client
3. Shared network between the robot and host computer

Client Software Installation
----------------------------

Follow the following commands in a terminal to install the Assisted Driving Toolbox Client on the host computer.

.. code-block:: bash

    $ sudo apt-get install libglfw3-dev libyaml-cpp-dev libopencv-dev
    $ echo "deb https://westonrobot.jfrog.io/artifactory/wrtoolbox-release $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/weston-robot.list
    $ curl -sSL 'https://westonrobot.jfrog.io/artifactory/api/security/keypair/wr-deb/public' | sudo apt-key add -
    $ sudo apt-get update
    $ sudo apt-get install wr_assisted_teleop

Before continuing, retrieve the IP address of the robot's wlan0 interface for client configuration later (see _configuration_ below).

To (re)start the client

.. code-block:: bash

    $ wr_assisted_teleop

- The icons below show the status of the control and video streaming servers. The icons on the left screenshot indicates the services are online, while the one on the right indicates the services offline.

.. image:: https://cdn.nlark.com/yuque/0/2021/png/21990865/1635920922054-421cc592-8185-4eae-a476-1d49fcad7136.png#clientId=uf20fb758-32ed-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=ud272b381&margin=%5Bobject%20Object%5D&name=screenshot_14.png&originHeight=232&originWidth=342&originalType=binary&ratio=1&rotation=0&showTitle=false&size=31417&status=done&style=none&taskId=ud0fbbb6d-d7c7-423f-bc82-b391e681127&title=
    :width: 300 px

.. image:: https://cdn.nlark.com/yuque/0/2021/png/21990865/1635920832411-9a3974ae-4b36-4ae9-bcff-018383de3b7f.png#clientId=uf20fb758-32ed-4&crop=0&crop=0&crop=1&crop=1&from=drop&height=232&id=uc1f28126&margin=%5Bobject%20Object%5D&name=screenshot_13.png&originHeight=242&originWidth=372&originalType=binary&ratio=1&rotation=0&showTitle=false&size=151925&status=done&style=none&taskId=u13d824b0-43ac-4efe-903f-c32f19bc40d&title=&width=356
    :width: 313 px

- If system has been configured before, camera streams will automatically be enabled. To toggle individual camera streams, use the buttons below

.. image:: https://cdn.nlark.com/yuque/0/2021/png/21990865/1634203699500-09fff5a0-0335-4537-bd9d-ad176151bfc2.png#clientId=u3f917be2-7d1f-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u875d4533&margin=%5Bobject%20Object%5D&name=2021-10-14_17-26.png&originHeight=276&originWidth=451&originalType=binary&ratio=1&rotation=0&showTitle=false&size=198256&status=done&style=none&taskId=u9326cd46-0da0-4a0c-bef5-9e1607f0a1a&title=
    :width: 350 px

- To toggle control of the robot (control disabled by default) and to view the status of attached joystick, use the buttons below
   
   - **NOTE**: Set height to the neutral position (50%) and check joystick behaviour (see below) before enabling control to avoid sudden movements.

.. image:: https://cdn.nlark.com/yuque/0/2021/png/21990865/1634203834112-12f927c4-3d4b-4ed8-8db8-744315286c41.png#clientId=u3f917be2-7d1f-4&crop=0&crop=0&crop=1&crop=1&from=drop&height=289&id=u07e9de80&margin=%5Bobject%20Object%5D&name=2021-10-14_17-30.png&originHeight=265&originWidth=413&originalType=binary&ratio=1&rotation=0&showTitle=false&size=172069&status=done&style=none&taskId=u88c23ac3-fc3a-48ba-842f-291db16c5a4&title=&width=451
    :width: 350 px

- The joystick gauge displays the current state of the attached controlling joystick.
   
   - **Please ensure that the joystick behaves as expected before enabling control of the robot.**
   - **If behaviour is incorrect, configure the joystick in the client's settings menu.**

.. image:: https://cdn.nlark.com/yuque/0/2021/png/21990865/1635920601936-f6cb0f7f-882f-47ec-8e86-5fce4145a328.png#clientId=uf20fb758-32ed-4&crop=0&crop=0&crop=1&crop=1&from=drop&height=146&id=u0b167acd&margin=%5Bobject%20Object%5D&name=screenshot_9.png&originHeight=215&originWidth=980&originalType=binary&ratio=1&rotation=0&showTitle=false&size=239233&status=done&style=none&taskId=udc1c1adc-c55b-409d-b8c1-ec1f584d408&title=&width=666

- The obstacle detection gauge displays the current feedback on any range finders in the system (when applicable)

.. image:: https://cdn.nlark.com/yuque/0/2021/png/21990865/1635920602358-13393aca-f57e-4a24-a067-177f5d0df95f.png#clientId=uf20fb758-32ed-4&crop=0&crop=0&crop=1&crop=1&from=drop&height=138&id=u4a61a414&margin=%5Bobject%20Object%5D&name=screenshot_10.png&originHeight=199&originWidth=975&originalType=binary&ratio=1&rotation=0&showTitle=false&size=236015&status=done&style=none&taskId=ue108498a-38da-498d-b67c-29679079297&title=&width=674

- The Speedo- and Battery meter gauge displays the current speed and battery's charge (Upcoming feature)

.. image:: https://cdn.nlark.com/yuque/0/2021/png/21990865/1635920406603-31547821-f689-4abe-be30-2eba65125f9c.png#clientId=uf20fb758-32ed-4&crop=0&crop=0&crop=1&crop=1&from=drop&height=145&id=u289ba4ca&margin=%5Bobject%20Object%5D&name=screenshot_7.png&originHeight=208&originWidth=970&originalType=binary&ratio=1&rotation=0&showTitle=false&size=291012&status=done&style=none&taskId=ufefd7106-fc66-4267-a50b-5a3d4618f19&title=&width=678

Client Configuration
--------------------

On client's first startup, "Settings" popup will prompt user to input the relevant settings for teleoperation, key settings include
  - Control server IP and port numbers
  - Streaming server IP and port numbers
  - Joystick mapping settings

.. image:: https://cdn.nlark.com/yuque/0/2021/png/21990865/1635920378868-980a1b82-3835-497b-9221-5c4449275a71.png#clientId=uf20fb758-32ed-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=ub7b4a0be&margin=%5Bobject%20Object%5D&name=screenshot_4.png&originHeight=971&originWidth=1732&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1905667&status=done&style=none&taskId=u6e446683-d51c-4a20-88ff-67d09451b9b&title=

- To change settings after first startup, click the settings button at the bottom right of the client to access settings.

.. image:: https://cdn.nlark.com/yuque/0/2021/png/21990865/1635920590819-eafb3d4f-34b1-4b8b-9df1-b51903ac68dd.png#clientId=uf20fb758-32ed-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u80a26cd4&margin=%5Bobject%20Object%5D&name=screenshot_8.png&originHeight=308&originWidth=609&originalType=binary&ratio=1&rotation=0&showTitle=false&size=306381&status=done&style=none&taskId=u5b34f6b9-dd62-450d-92e7-a70f88054c8&title=
    :width: 350 px

- Changing the IP address and ports of the Servers is as simple as changing the values below
   - This IP address should correspond to the robot's wlan0 interface IP address by default.

.. image:: https://cdn.nlark.com/yuque/0/2021/png/21990865/1635920357963-5ab38e65-505f-4f6a-981a-365d766adbda.png#clientId=uf20fb758-32ed-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=uda8599ad&margin=%5Bobject%20Object%5D&name=screenshot_5.png&originHeight=606&originWidth=554&originalType=binary&ratio=1&rotation=0&showTitle=false&size=279330&status=done&style=none&taskId=ub63cbf95-5e08-4293-8bdf-aba126a58f7&title=

- Changing the joystick mapping is as simple as changing the values below
   - Mappings
      - Linear X - Forward/Reverse movement
      - Linear Y - Side-Side movement
      - Linear Z - Body height adjustment
      - Angular X - Body roll
      - Angular Y - Body pitch
      - Angular Z - Yaw movement 
   - Below shows an example configuration using Logitech's Extreme3DPro joystick

.. image:: https://cdn.nlark.com/yuque/0/2021/png/21990865/1635920375029-9914dddb-3eac-4a38-8900-8bf800c2fca1.png#clientId=uf20fb758-32ed-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u597fba5f&margin=%5Bobject%20Object%5D&name=screenshot_6.png&originHeight=600&originWidth=552&originalType=binary&ratio=1&rotation=0&showTitle=false&size=269656&status=done&style=none&taskId=ua3307b6d-d63e-44a8-a6d1-2230f608c08&title=
