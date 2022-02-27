---
id: digitalocean
title: DigitalOcean
description: Using netboot.xyz on DigitalOcean
hide_table_of_contents: true
---

netboot.xyz can be loaded on a [DigitalOcean](https://m.do.co/c/ab4e8f17ba0d) droplet with a little bit of work so that you can then customize the droplet as needed. For this method, we'll use the smallest droplet size running Debian.

:::info
If you haven't signed up for a DigitalOcean account, please utilize our affiliate link [here](https://m.do.co/c/ab4e8f17ba0d). It will help provide us testing resources for improving this project!
:::

### Create a Droplet

For this method, it's recommended to use an apt-based distro like Debian or Ubuntu. Start a droplet with one of those operating systems. Once it is up and running, connect to it via SSH or connect to it with the console button.

### Install GRUB Imageboot and Download ISO

We will need to ensure that the GRUB menu pauses long enough for us to select the netboot.xyz option. For that we'll need to remove a timeout file and increase the timeout for GRUB. Adjust the time period as needed for your
situation:

```shell
# Remove grub timeout configuration
rm /etc/default/grub.d/15_timeout.cfg

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

### Connect via Recovery Console

Under the access section, connect to the Recovery Console. The recovery console is different from the regular console command in that it allows direct access to the droplet as it boots, including access to the GRUB menu.
At this point if you are within the timeout window, you should now see the Grub menu with the following option now available:

```bash
Bootable ISO image: netboot.xyz
```

### Set Networking Up

Because the droplets use a static IP instead of DHCP, you will need to set up the networking for iPXE to talk to the networking. Upon selecting the netboot.xyz option, press **m** when prompted for the failsafe menu. You will need to set the networking of the instance so that iPXE can get on-line. You can get the networking information from the droplet control panel from the networking tab. Once you have the networking information, select Manual networking configuration:

```bash
Set network interface number [0 for net0, defaults to 0]: <set to 0>
IP: <set to droplet IP>
Subnet mask: <set to droplet netmask>
Gateway: <set to droplet gateway>
DNS: <set DNS server, e.g. 1.1.1.1>
```

Once set, you should connect right into netboot.xyz. If you do a installation, you should be able to reinstall over the existing drive at that point and customize the droplet as you see fit. Keep the networking information handy as you will need to populate that when doing an install.

:::info
If you run into out of memory issues running an installer, you may need a larger droplet.
:::
