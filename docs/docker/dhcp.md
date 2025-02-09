---
title: DHCP Configurations
sidebar_position: 4
description: "Setting up DHCP for the netboot.xyz Docker Container"
hide_table_of_contents: true
---

The netboot.xyz Docker image requires the usage of a DHCP server in order to function properly. If you have an existing DHCP server, usually you will need to make some small adjustments to make your DHCP server forward requests to the netboot.xyz container. The main settings in your DHCP or router that you will typically need to set are:

* `tftp-server` also known as `next-server`, this option tells the client where to look for the boot file
* `boot-file-name`, this option tells the client which boot file to load

## Examples

The following are some configuration examples for setting up a DHCP server to get started. The main configuration you will need to change are `SERVER_IP_ADDRESS` so that DHCP can direct the client to the server running the netboot.xyz Docker container. Because the Docker image is hosting a dnsmasq TFTP server, the boot files are pulled from it and then it will attempt to load the iPXE configs directly from the host. You can then modify and adjust them to your needs. See [booting from TFTP](https://netboot.xyz/docs/booting/tftp/) for more information.

### Setting up dnsmasq

To install dnsmasq as your DHCP server run:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="deb" label="Debian and Ubuntu" default>
    ```shell
    sudo apt install dnsmasq
    ```
  </TabItem>
  <TabItem value="rhel" label="Redhat Based">
    ```shell
    sudo dnf install dnsmasq
    ```
  </TabItem>
</Tabs>

Set up your configuration file `/etc/dnsmasq.conf` with the following settings:

:::note
The following steps are examples and may not be the exact steps you need to take for your environment. Make sure to adjust the configuration to your needs.
:::

```shell
# /etc/dnsmasq.conf

# Set the DHCP Range and lease time
dhcp-range=192.168.1.100,192.168.1.200,255.255.255.0,12h

# Set the default gateway
dhcp-option=option:router,192.168.1.1

# Set tne DNS servers
dhcp-option=option:dns-server,8.8.8.8,8.8.4.4

# Standard PC BIOS
dhcp-match=set:bios,60,PXEClient:Arch:00000
dhcp-boot=tag:bios,netboot.xyz.kpxe,,SERVER_IP_ADDRESS

# 64-bit x86 EFI
dhcp-match=set:efi64,60,PXEClient:Arch:00007
dhcp-boot=tag:efi64,netboot.xyz.efi,,SERVER_IP_ADDRESS

# 64-bit x86 EFI (obsolete)
dhcp-match=set:efi64-2,60,PXEClient:Arch:00009
dhcp-boot=tag:efi64-2,netboot.xyz.efi,,SERVER_IP_ADDRESS

# 64-bit UEFI for arm64
dhcp-match=set:efi64-3,60,PXEClient:Arch:0000B
dhcp-boot=tag:efi64-3,netboot.xyz-arm64.efi,,SERVER_IP_ADDRESS
```

A breakdown of the configuration:

- `dhcp-range` sets the range of IP addresses and lease times that will be assigned to clients.
- `dhcp-option` sets the default gateway and DNS servers.
- `dhcp-boot` sets the boot file for different architectures, the `SERVER_IP_ADDRESS` should be replaced with the IP address of the host running the Docker container.
- `dhcp-match` sets the match criteria for different architectures.

Once the dnsmasq configuration is set, you can enable and start the service:

```shell
sudo systemctl enable dnsmasq
sudo systemctl start dnsmasq
```

## netboot.xyz boot file types

The following bootfile names can be set as the boot file in the DHCP configuration depending on your needs. They are baked into the Docker image:

| bootfile name                   | description                                                          |
| --------------------------------|----------------------------------------------------------------------|
| `netboot.xyz.kpxe`              | Legacy DHCP boot image file, uses built-in iPXE NIC drivers          |
| `netboot.xyz-undionly.kpxe`     | Legacy DHCP boot image file, use if you have NIC issues              |
| `netboot.xyz.efi`               | UEFI boot image file, uses built-in UEFI NIC drivers                 |
| `netboot.xyz-snp.efi`           | UEFI w/ Simple Network Protocol, attempts to boot all net devices    |
| `netboot.xyz-snponly.efi`       | UEFI w/ Simple Network Protocol, only boots from device chained from |
| `netboot.xyz-arm64.efi`         | DHCP EFI boot image file, uses built-in iPXE NIC drivers             |
| `netboot.xyz-arm64-snp.efi`     | UEFI w/ Simple Network Protocol, attempts to boot all net devices    |
| `netboot.xyz-arm64-snponly.efi` | UEFI w/ Simple Network Protocol, only boots from device chained from |
| `netboot.xyz-rpi4-snp.efi`      | UEFI for Raspberry Pi 4, attempts to boot all net devices            |
