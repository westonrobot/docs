*************************************
Weston Robot Maintenance Toolbox (MT)
*************************************

.. _ref_install_power_regulator_widget:

Install Power Regulator Widget
------------------------------

* **Power Regulator Widget (wr_regulator_widget)**
  
  - This widget allows monitoring and control of power regulator channels.
  - Install from apt-get server with package name: wr_regulator_widget

Please add the debian repository to your apt-get source list firt. Refer to section :ref:`Debian Repository <ref_add_debian_source>`

.. code-block:: bash

    ## 1. install dependencies
    # 1.1 if you haven't installed wrp_sdk, you need to install the SDK first. skip this step otherwise.
    $ sudo apt-get install software-properties-common && sudo add-apt-repository ppa:lely/ppa && sudo apt-get update
    $ sudo apt-get install pkg-config liblely-coapp-dev liblely-co-tools
    $ sudo apt-get install wrp_sdk
    # 1.2 install wr_regulator_widget dependencies
    $ sudo apt-get install libgl1-mesa-dev libglfw3-dev libcairo2-dev
    ## 2. install the package 
    $ sudo apt-get install wr_regulator_widget