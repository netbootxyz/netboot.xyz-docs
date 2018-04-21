---
title: "Downloads"
description: "Download Page for netboot.xyz"
weight: 5
date: 2018-04-14T11:40:21-05:00
---

### Bootloader Downloads

These iPXE disks will automatically load into [boot.netboot.xyz](https://boot.netboot.xyz):

| Type | Bootloader | Description |
|------|------------|-------------|
|ISO (Legacy)| [netboot.xyz.iso](https://boot.netboot.xyz/ipxe/netboot.xyz.iso)| Used for CD/DVD, Virtual CDs like DRAC/iLO, VMware, Virtual Box (Legacy) |
|ISO (EFI)|[netboot.xyz-efi.iso](https://boot.netboot.xyz/ipxe/netboot.xyz-efi.iso)| Same as ISO (Legacy) but used for EFI BIOS, works in Virtual Box EFI mode |
|Floppy| [netboot.xyz.dsk](https://boot.netboot.xyz/ipxe/netboot.xyz.dsk)| Used for 1.44 MB floppies, Virtual floppies like DRAC/iLO, VMware, Virtual Box|
|USB| [netboot.xyz.usb](https://boot.netboot.xyz/ipxe/netboot.xyz.usb)| Used for creation of USB Keys|
|Kernel| [netboot.xyz.lkrn](https://boot.netboot.xyz/ipxe/netboot.xyz.lkrn)| Used for booting from GRUB/EXTLINUX|
|DHCP| [netboot.xyz.kpxe](https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe)| DHCP boot image file, uses built-in iPXE NIC drivers|
|DHCP-undionly| [netboot.xyz-undionly.kpxe](https://boot.netboot.xyz/ipxe/netboot.xyz-undionly.kpxe)| DHCP boot image file, use if you have NIC issues|
|EFI| [netboot.xyz.efi](https://boot.netboot.xyz/ipxe/netboot.xyz.efi)| EFI boot image file|

### Checksums

SHA256 checksums are generated during each build of iPXE and are located [here](https://boot.netboot.xyz/ipxe/netboot.xyz-sha256-checksums.txt).  You can also view the scripts that are embedded into the images [here](https://github.com/antonym/netboot.xyz/tree/master/ipxe/disks).

