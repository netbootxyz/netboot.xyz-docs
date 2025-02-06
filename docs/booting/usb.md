---
id: usb
title: Boot from USB
sidebar_label: Boot from USB
sidebar_position: 1
description: "How to create a USB stick capable of booting into netboot.xyz"
hide_table_of_contents: true
---
:::danger
Backup your important data before writing the USB as it will overwrite anything on the USB key.
:::

To boot netboot.xyz from a [USB key](https://amzn.to/3CD0BE5), you will need to write the netboot.xyz image to the key. This enables you to boot into netboot.xyz on any machine that supports USB booting.

You can download the `netboot.xyz.img` USB disk image [here](https://boot.netboot.xyz/ipxe/netboot.xyz.img).

## Creating USB Key on Linux

Insert a USB key in your computer and find the device name. Then use following command:

```shell
cat netboot.xyz.img > /dev/sdX
```

or you can run the following command:

```shell
dd if=netboot.xyz.img of=/dev/sdX
```

where sdX is your usb drive. The USB key should be ready to eject once finished.

## Creating USB Key on MacOS

__To get the current list of devices, run:__

```shell
diskutil list
```

__Insert the flash media and run once again to determine the device node assigned to your flash media (e.g. /dev/disk2):__

```shell
diskutil list
```

__Run the following, replacing N with the disk number from the last command (in the previous example, N would be 2):__

```shell
diskutil unmountDisk /dev/diskN
```

__Now write the disk image to the flash media by running:__

```shell
sudo dd if=netboot.xyz.img of=/dev/rdiskN bs=1m
```

* Using /dev/rdisk instead of /dev/disk may be faster
* If you see the error dd: Invalid number '1m', you are using GNU dd. Use the same command but replace bs=1m with bs=1M
* If you see the error dd: /dev/diskN: Resource busy, make sure the disk is not in use. Start the 'Disk Utility.app' and unmount (don't eject) the drive

__Now run and remove your flash media when the command completes:__

```shell
diskutil eject /dev/diskN
```

## Creating USB Key on Windows

For creating a USB Key on a Windows device, you can check out [Rufus](https://rufus.akeo.ie/) to install the image file to a USB key.

## Booting from the USB Key

Once you've created your key, reboot and set your BIOS to load the USB key first if it's not set for that already. You should see iPXE load up either load up netboot.xyz automatically or you will be prompted to set your networking information up.
