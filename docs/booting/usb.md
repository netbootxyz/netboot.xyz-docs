---
id: usb
title: Booting from USB
sidebar_label: Booting from USB
description: "How to create a USB stick capable of booting into netboot.xyz"
hide_table_of_contents: true
---
*Warning: Backup your important data before using USB as it will overwrite anything on the USB key.*

Download a netboot.xyz USB disk:

* [netboot.xyz](https://boot.netboot.xyz/ipxe/netboot.xyz.img)

## Creating USB Key on Linux

Insert a USB key in your computer and find the device name. Then use following command:

    cat netboot.xyz.img > /dev/sdX

or

    dd if=netboot.xyz.img of=/dev/sdX

where sdX is your usb drive.

The USB key should be ready to eject once finished.

### Creating USB Key on MacOS

__Run:__

    diskutil list

to get the current list of devices

___Insert the flash media.___

__Run:__

    diskutil list

again and determine the device node assigned to your flash media (e.g. /dev/disk2).

__Run:__

    diskutil unmountDisk /dev/diskN

(replace N with the disk number from the last command; in the previous example, N would be 2).

__Execute:__

    sudo dd if=netboot.xyz.img of=/dev/rdiskN bs=1m

* Using /dev/rdisk instead of /dev/disk may be faster
* If you see the error dd: Invalid number '1m', you are using GNU dd. Use the same command but replace bs=1m with bs=1M
* If you see the error dd: /dev/diskN: Resource busy, make sure the disk is not in use. Start the 'Disk Utility.app' and unmount (don't eject) the drive

__Run:__

    diskutil eject /dev/diskN

and remove your flash media when the command completes.

### Creating USB Key on Windows

Check out [Rufus](https://rufus.akeo.ie/) to install the IMG file to a USB key.

### Booting

Once you've created your key, reboot and set your BIOS to load the USB key first if it's not set for that already. You should see iPXE load up either load up netboot.xyz automatically or prompt you to set your networking information up.
