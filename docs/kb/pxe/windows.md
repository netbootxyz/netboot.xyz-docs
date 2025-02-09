---
id: windows
title: "Windows"
description: "Installing Windows using netboot.xyz and the Docker container."
hide_table_of_contents: true
---

# Installing Windows with netboot.xyz

This guide will walk you through installing Windows 11 using netboot.xyz using the netboot.xyz Docker container.

## Requirements

Before you begin, ensure you have the following:

- A Samba (SMB, CIFS) share with the Windows 11 ISO extracted.
- A Windows PE image as an ISO. Instructions on how to build it can be found [here](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-create-usb-bootable-drive#create-a-winpe-iso-dvd-or-cd).
- The netboot.xyz Docker container set up and running. Follow the instructions [here](../../docker/usage.md) to set up the container.

:::note
WinPE is used so you can preload any drivers you may need for the equipment being installed. You may need to slipstream drivers like VirtIO if using Proxmox or other types of virtualization.
:::

## Installation Process

To start, download the Windows PE image and the Windows 11 ISO. Once you have these files, set up an SMB share and extract the Windows 11 ISO to a directory on this share.

Next, upload the Windows PE image to the netboot.xyz container's `/assets/WinPE/x64/` folder. With the files in place, boot the netboot.xyz menu and navigate to the Windows section.

You'll need to set the base URL to point to the container's IP address, the correct Nginx port for hosting assets, and the right directory. For example:
```bash
http://192.168.2.46:8000/WinPE
```

Load the installer, and you should be prompted with a terminal. In the terminal, type `wpeinit` to load networking support. Then, mount the Windows ISO share using the following command:
```bash
net use F: \\<server-ip-address>\<share-name> /user:<server-ip-address>\<username-if-needed> <password-if-needed>
```

:::note
The terminal uses the US keyboard layout by default.
:::

Change into the mounted share (`F:`) and execute `setup.exe`:
```bash
F:\setup.exe
```

You should now see the normal Windows setup interface and be able to proceed with the installation.

## Persistent URL for Windows with Docker Container

To avoid entering the URL each time you boot Windows, you can use the `local-vars.ipxe` file to set the `win_base_url`. This file is checked early during the boot process and allows you to set overrides for variables.

Edit the `local-vars.ipxe` file within the web configuration interface and add the following line:
```bash
set win_base_url http://192.168.2.46:8080/WinPE
```

With this configuration, you won't need to input the URL anymore when booting Windows.

:::note

If you don't currently have a [local-vars.ipxe](https://github.com/netbootxyz/netboot.xyz/blob/development/roles/netbootxyz/templates/local-vars.ipxe.j2) file, you can create on in the root of the tftp directory.

:::
