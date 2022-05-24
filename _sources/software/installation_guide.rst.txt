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

.. code-block:: bash

    $ echo "deb https://westonrobot.jfrog.io/artifactory/wrtoolbox-release $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/weston-robot.list
    $ curl -sSL 'https://westonrobot.jfrog.io/artifactory/api/security/keypair/wr-deb/public' | sudo apt-key add -
    $ sudo apt-get update

Now you can install packages with "apt-get" command. 

**Note:** Installation of additional third-party dependency packages may be required for a package provided by Weston Robot. Please follow the package-specific instructions.