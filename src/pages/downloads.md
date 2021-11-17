---
title: Downloads
description: Bootloader Downloads for netboot.xyz
hide_table_of_contents: true
---
### Bootloader Downloads

These iPXE disks will automatically load into [boot.netboot.xyz](https://boot.netboot.xyz):

#### Combined Legacy and UEFI iPXE Bootloaders

| Type | Bootloader | Description |
|------|------------|-------------|
|ISO| [netboot.xyz.iso](https://boot.netboot.xyz/ipxe/netboot.xyz.iso)| Used for CD/DVD, Virtual CDs, DRAC/iLO, VMware, Virtual Box |
|USB| [netboot.xyz.img](https://boot.netboot.xyz/ipxe/netboot.xyz.img)| Used for creation of USB Keys|

#### Legacy (PCBIOS) iPXE Bootloaders

| Type | Bootloader | Description |
|------|------------|-------------|
|Kernel| [netboot.xyz.lkrn](https://boot.netboot.xyz/ipxe/netboot.xyz.lkrn)|Used for booting from GRUB/EXTLINUX|
|Floppy| [netboot.xyz.dsk](https://boot.netboot.xyz/ipxe/netboot.xyz.dsk)| Virtual floppy disk for DRAC/iLO, VMware, Virtual Box, etc|
|Padded Floppy| [netboot.xyz.pdsk](https://boot.netboot.xyz/ipxe/netboot.xyz.pdsk)| Padded Virtual floppy disk for DRAC/iLO, VMware, Virtual Box, etc|
|DHCP| [netboot.xyz.kpxe](https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe)| DHCP boot image file, uses built-in iPXE NIC drivers|
|DHCP-undionly| [netboot.xyz-undionly.kpxe](https://boot.netboot.xyz/ipxe/netboot.xyz-undionly.kpxe)| DHCP boot image file, use if you have NIC issues|

#### UEFI iPXE Bootloaders

| Type | Bootloader | Description |
|------|------------|-------------|
|DHCP| [netboot.xyz.efi](https://boot.netboot.xyz/ipxe/netboot.xyz.efi)| DHCP boot image file, uses built-in iPXE NIC drivers|
|DHCP-snp| [netboot.xyz-snp.efi](https://boot.netboot.xyz/ipxe/netboot.xyz-snp.efi)| EFI w/ Simple Network Protocol, attempts to boot all net devices|
|DHCP-snponly| [netboot.xyz-snponly.efi](https://boot.netboot.xyz/ipxe/netboot.xyz-snponly.efi)| EFI w/ Simple Network Protocol, only boots from device chained from|

#### ARM64 iPXE Bootloaders

| Type | Bootloader | Description |
|------|------------|-------------|
|DHCP-snp| [netboot.xyz-arm64.efi](https://boot.netboot.xyz/ipxe/netboot.xyz-arm64.efi)| EFI w/ Simple Network Protocol, attempts to boot all net devices|

#### Raspberry Pi iPXE Bootloaders

| Type | Bootloader | Description |
|------|------------|-------------|
|USB/SD Card| [netboot.xyz-rpi4-sdcard.img](https://boot.netboot.xyz/ipxe/netboot.xyz-rpi4-sdcard.img)| Raspberry Pi 4 - USB/SD Card Image|
|DHCP-snp| [netboot.xyz-rpi4-snp.efi](https://boot.netboot.xyz/ipxe/netboot.xyz-rpi4-snp.efi)| Raspberry Pi 4 - EFI Image|

### Checksums

SHA256 checksums are generated during each build of iPXE and are located [here](https://boot.netboot.xyz/ipxe/netboot.xyz-sha256-checksums.txt).  You can also view the scripts that are embedded into the images [here](https://github.com/netbootxyz/netboot.xyz/tree/master/roles/netbootxyz/templates/disks).
