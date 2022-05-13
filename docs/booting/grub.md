---
id: grub
title: Booting from an existing Linux installation using GRUB
sidebar_label: Booting from GRUB
description: "How to use GRUB to boot into netboot.xyz"
hide_table_of_contents: true
---

If you have an existing Linux system where you are unable to use iPXE or boot from a disk image, but you can see the GRUB menu on boot, you can boot into netboot.xyz using `grub-imageboot`.

## On Debian/Ubuntu

```shell
# Install grub-imageboot
apt install grub-imageboot

# Download netboot.xyz ISO
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso

# Update GRUB menu to include this ISO
update-grub2
reboot
```

After reboot, select "Bootable ISO Image: netboot.xyz" in the GRUB menu.

If the GRUB menu disappears too quickly, you may need to edit `/etc/default/grub` and increase the `GRUB_TIMEOUT`. Run `update-grub2` any time you modify this file.

## On CenOS/Redhat
```shell
yum install syslinux wget -y
cp /usr/share/syslinux/memdisk /boot/memdisk
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso
ln -s /usr/share/grub/grub-mkconfig_lib /usr/lib/grub/grub-mkconfig_lib
#Download iamgeboot config file
wget https://raw.githubusercontent.com/formorer/grub-imageboot/529ac5d2bf91e7da8c31b9e15f37702127bddc1c/bin/60_grub-imageboot -O /etc/grub.d/60_grub-imageboot
chmod 755 /etc/grub.d/60_grub-imageboot
grub2-mkconfig
reboot

```
