---
sidebar_position: 1
---

# Weston Robot Apt Source

C++ libraries and binaries (including the widget apps) are provided as ".deb" installation packages. There are two methods you can acquire and install the released debian packages:

* Download the ".deb" packages from the corresponding github repository and install with the "dpkg" command, e.g., `$ sudo dpkg -i <package_name>.deb`
* Install the packages from Weston Robot's apt-get server

Here are the steps you can follow to add the Weston Robot package source:

:::info Note
 
We updated our apt-get server in July 2023. If you've added Weston Robot's old apt source before, you will need to remove it first.

```bash
sudo rm /etc/apt/sources.list.d/weston-robot.list
```
:::

Now follow the steps below to setup the repository.

1. Add the GPG key for the Weston Robot repository:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL http://deb.westonrobot.net/signing.key | sudo gpg --dearmor -o /etc/apt/keyrings/weston-robot.gpg
sudo chmod a+r /etc/apt/keyrings/weston-robot.gpg
```

2. Add the Weston Robot repository to your system's software repository

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/weston-robot.gpg] http://deb.westonrobot.net/$(lsb_release -cs) $(lsb_release -cs) main" | \
  sudo tee /etc/apt/sources.list.d/weston-robot.list > /dev/null
```

3. Now you can update the index and install packages with "apt-get" command. 

```bash
$ sudo apt-get update
$ sudo apt-get install <package_name>
```

**Note:** Installation of additional third-party dependency packages may be required for a package provided by Weston Robot. Please follow the package-specific instructions.