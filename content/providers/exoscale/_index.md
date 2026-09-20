---
title: "Exoscale"
description: "Using netboot.xyz with Exoscale compute instances"
date: 2020-03-31T02:02:22-05:00
weight: 7
---

[Exoscale](https://www.exoscale.com) leverages netboot.xyz as part of its
rescue system, enabling one command boot into netboot.xyz menu.

### Usage

As Rescue Mode is not a default operation, it requires:

* a working [`exo` command-line](https://community.exoscale.com/documentation/tools/exoscale-command-line-interface/) environment
* access to your account API key
* access to the Exoscale portal

## Booting into Rescue Mode

To reboot in Rescue Mode, first start by shutting down the instance. This can be
performed via the CLI or via the portal in the instance details:

```
    exo vm stop broken-vm
```

Then start the instance in Rescue Mode

```
    exo vm start --rescue-profile=netboot broken-vm
```

![Start instance rescue mode](/images/providers/exoscale/rescue.gif)

The instance will now boot the Netboot image.

## Accessing the Netboot menu

To access the Netboot menu, launch the Exoscale portal and navigate to the 
instance detailed view. Once on the detailed view, click the **OPEN CONSOLE**
button.

A new window will open and display the instance screen and the Netboot
menu will appear:

![Netboot rescue menu from console](/images/providers/exoscale/rescue-netboot.gif)

Perfom the operation you require in the instance 
and finally reboot your instance.

Once rebooted the instance will exit Rescue mode and try to boot from the
root disk.

## Booting from a custom ISO image

Through rescue mode, it is possible to boot an instance from an external ISO 
as long as the latter supports virtIO storage and network drivers. 
To do so, perform the following steps:

* Tools -> Utilities
* netboot.xyz tools -> Test Distribution ISO
* Enter URL (e.g. http://centos.anexia.at/centos/7.7.1908/isos/x86_64/CentOS-7-x86_64-LiveGNOME-1908.iso to boot a CentOS Live CD).

![Netboot_rescue_menu_from_console_iso_image](/images/providers/exoscale/rescue_iso_recovery.gif)

With this method a bare metal recovery is possible for example.
