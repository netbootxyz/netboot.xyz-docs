---
id: qemu
title: Booting from QEMU
sidebar_label: Booting from QEMU
description: "Methods of booting into netboot.xyz using QEMU"
hide_table_of_contents: true
---

### Overview

A quick way to try out netboot.xyz without any modifications to your existing environment is to leverage QEMU.  You can start up a virtual machine to evaluate what netboot.xyz is and how it works.  You will need the qemu-system package for your appropriate operating system and a window manager installed.  In the example below we are using Ubuntu 20.04.

### Install dependencies

```bash
# install the qemu-system package
sudo apt-get install -y qemu-system ovmf

# download the latest combined Legacy and EFI iso
wget http://boot.netboot.xyz/ipxe/netboot.xyz.iso
```

If you want to write to a disk, you can set one at this point, or optionally you can boot without a disk if you want to test drive netboot.xyz:

### Create a disk (optional)

```bash
qemu-img create -f raw vmdisk 8G

# add the following to end of the qemu-system lines below if you want to add a disk to write to:
# -drive file=vmdisk,format=raw
```

### Booting with Legacy PCBIOS

```bash
qemu-system-x86_64 -cdrom netboot.xyz.iso -m 4G
```

### Booting with a UEFI BIOS

```bash
qemu-system-x86_64 -bios /usr/share/ovmf/OVMF.fd -cdrom netboot.xyz.iso -m 4G
```

:::note

At least 4GB of memory is recommended for some of the images that are loaded into RAM.  If you experience problems during initrd load, the machine usually just needs more RAM.

:::
