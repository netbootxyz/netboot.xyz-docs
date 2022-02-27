---
id: linode
title: Linode
description: Using netboot.xyz on Linode
hide_table_of_contents: true
---

netboot.xyz can be loaded on a [Linode](https://linode.com) instance so that you can then customize the Linode as needed. For this method, we'll use the smallest Linode size running Debian.

### Create a Linode

For this method, it's recommended to use an apt-based distro like Debian or Ubuntu. Start a Linode with one of those operating systems. Once it is up and running, connect to it via SSH or connect to it with the console button.

### Install GRUB Imageboot and Download ISO

We will need to ensure that the GRUB menu pauses long enough for us to select the netboot.xyz option. For that we'll need to remove a timeout file and increase the timeout for GRUB. Adjust the time period as needed for your
situation:

```shell
# Increase grub timeout if desired
sed -i 's/GRUB_TIMEOUT=5/GRUB_TIMEOUT=60/g' /etc/default/grub

# Install grub-imageboot
apt update
apt install -y grub-imageboot

# Download netboot.xyz ISO
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso

# Update GRUB menu to include this ISO
update-grub2

# reboot once you are ready, it may be good to load up the recovery console first
reboot
```

### Launch LISH Console

Under the Linode settings click ..., and select Launch LISH Console. For interraction with the GRUB Menu and netboot.xyz menus, you will need to click the Weblish tab. For interacting with an installer or other tool, you may need to use the Glish tab (Graphical).

At this point if you are within the timeout window, you should now see the Grub menu with the following option now available which you can select to load the netwboot.xyz menu:

```bash
Bootable ISO image: netboot.xyz
```

### Networking

Linode uses DHCP so netboot.xyz should be able to get an IP address and load up the menu. If DHCP does not work, you may need to use the alternative failsafe menu to set up the networking for the instance manually by pressing **m** when prompted for the failsafe menu.

If you do a installation, you should be able to reinstall over the existing drive at that point and customize the Linode as you see fit. Keep the networking information handy as you will need to populate that when doing an install. 

:::info
If you run into out of memory issues running an installer, you may need a larger Linode.
:::
