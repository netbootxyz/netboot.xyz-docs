---
id: uefi
title: Booting from a Local UEFI Executable
sidebar_label: Boot from UEFI
sidebar_position: 4
description: "How to use a local UEFI executable to boot into netboot.xyz"
hide_table_of_contents: true
---

## Overview

This guide describes how to boot into netboot.xyz using a local UEFI executable. This method involves placing the UEFI executable on the EFI system partition and configuring the UEFI boot manager to boot from it.

## UEFI Boot Manager

The UEFI boot manager is responsible for managing the boot process on UEFI-based systems. It uses boot entries stored in NVRAM to determine the boot order and which bootloader to execute. The boot entries are identified by their boot numbers (e.g., Boot0001, Boot0002) and can be managed using the `efibootmgr` tool.

### BootOrder and BootNext Variables

The `BootOrder` variable defines the order in which the boot entries are attempted. The `BootNext` variable specifies a single boot entry to be used for the next boot only, after which the system reverts to the `BootOrder`.

## Using `efibootmgr` to Manage UEFI Boot Entries

The `efibootmgr` tool allows you to manage UEFI boot entries from within a running operating system. You can use it to create, delete, and modify boot entries, as well as change the boot order.

### Adding a Boot Entry

To add a new boot entry for the netboot.xyz UEFI executable, use the following command:

```bash
sudo efibootmgr --create --disk /dev/sdX --part Y --label "netboot.xyz" --loader /EFI/netboot.xyz/netboot.xyz.efi
```

Replace `/dev/sdX` with the disk containing the EFI system partition, and `Y` with the partition number of the EFI system partition.

### Changing the Boot Order

To change the boot order and make the new boot entry the first in the list, use the following command:

```bash
sudo efibootmgr --bootorder XXXX,YYYY,ZZZZ
```

Replace `XXXX` with the boot number of the new netboot.xyz entry, and `YYYY, ZZZZ` with the boot numbers of other entries in the desired order.

## Other Boot Methods

### GRUB

You can use GRUB to boot the netboot.xyz UEFI executable by adding a custom menu entry to the GRUB configuration file. Add the following entry to `/etc/grub.d/40_custom`:

```bash
menuentry "netboot.xyz" {
    search --no-floppy --file --set=root /EFI/netboot.xyz/netboot.xyz.efi
    chainloader /EFI/netboot.xyz/netboot.xyz.efi
}
```

After adding the entry, update the GRUB configuration:

```bash
sudo update-grub
```

### systemd-boot

To add a boot entry for netboot.xyz in systemd-boot, create a new file in the `/boot/loader/entries/` directory with the following content:

```ini
title netboot.xyz
efi /EFI/netboot.xyz/netboot.xyz.efi
```

### rEFInd

To add a boot entry for netboot.xyz in rEFInd, create a new file in the `/boot/EFI/refind/` directory with the following content:

```ini
menuentry "netboot.xyz" {
    loader /EFI/netboot.xyz/netboot.xyz.efi
}
```

### UEFI Shell

You can also boot the netboot.xyz UEFI executable from the UEFI Shell. To do this, navigate to the directory containing the executable and run the following command:

```shell
fsX:
cd EFI\netboot.xyz
netboot.xyz.efi
```

Replace `fsX:` with the appropriate filesystem identifier for the EFI system partition.

## Vendor-Specific Boot Menu Options

Some vendors provide options in the boot menu to select an arbitrary UEFI executable to boot from. Consult your system's documentation for instructions on how to access and use these options.
