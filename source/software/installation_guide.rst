******************
Installation Guide
******************

Build from Source
=================

Please refer to the **README** in the cooresponding github repository for instructions to build the package from source.

.. _ref_add_debian_source:

Debian Repository
=================

C++ library and binary packages (including the widget apps) are provided as ".deb" installation packages. You can download the ".deb" packages from the cooresponding github repository and install with "dpkg" or "apt-get" command. Or you can install the packages from the apt-get server directly. 

Here are the steps you can follow to add the Weston Robot package source:

Note that if you've added Weston Robot's old debian package source before, you need to remove it first:

.. code-block:: bash

    $ sudo rm /etc/apt/sources.list.d/weston-robot.list

Now follow the steps below to add the new source:

.. code-block:: bash

    $ echo "deb http://deb.westonrobot.net/$(lsb_release -cs) $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/weston-robot.list
    $ curl -sSL 'http://deb.westonrobot.net/signing.key' | sudo apt-key add -
    $ sudo apt-get update

Now you can install packages with "apt-get" command. 

**Note:** Installation of additional third-party dependency packages may be required for a package provided by Weston Robot. Please follow the package-specific instructions.