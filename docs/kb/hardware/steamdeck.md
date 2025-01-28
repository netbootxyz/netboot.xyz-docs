---
id: steamdeck
title: PXE Booting on the Steam Deck
sidebar_label: Steam Deck
description: PXE Booting on the Steam Deck
hide_table_of_contents: true
---

## Overview

This is a guide to PXE booting the [Valve Steam Deck](https://amzn.to/4jBYBwv).

## Requirements

To get the Steam Deck to PXE boot, you will need:

- [USB-C Hub](https://amzn.to/3PRGzc4) that supports Ethernet and USB
- USB Keyboard
- Hard Wired Ethernet

Connect the hub, ethernet, and power up to the Steam Deck. The first thing you will want to do is set the BIOS to allow for PXE booting.

## BIOS Configuration

To bring up the Steam Deck Boot Loader menus, shutdown the Steam Deck and:

- Hold down `Volume +`, while pressing the power button `on` to access the Boot Manager, Setup Utility and Boot from File Menu. (`Volume -` will bring up just the Boot Manager)
- Select Setup Utility to enter into the Setup.
- Move down to the Boot Tab on the left and change these settings:
  - Quick Boot: Disabled
  - Quiet Boot: Disabled
  - PXE Boot Capability: UEFI: IPv4 (Can change to what is appropriate for your network)
  - Add Boot Options: First
- Select Exit and Exit Saving Changes.

## PXE Booting

The Steam Deck will now reboot and you will now see the Memory test as Quiet Boot has been disabled. If your Hub is connected to the network properly, and you have DHCP on the network, you should see:

```shell
>>Start PXE over IPv4...
```

At this point you should be able to PXE boot a UEFI image.

Use the:

- [netboot.xyz UEFI kernel](https://boot.netboot.xyz/ipxe/netboot.xyz.efi)
- Set DHCP [next-server](https://netboot.xyz/docs/booting/tftp) to TFTP server, and filename to the netboot.xyz UEFI image on the DHCP server

If you happen to break the Steam Deck when testing Operating Systems or tinkering with it, you can follow the Steam Deck Recovery Instructions [here](https://help.steampowered.com/en/faqs/view/1B71-EDF2-EB6D-2BB3).

If you want to set the BIOS back to the default settings, you can load the BIOS back up, select Restore Defaults, and Exit Saving Changes. That will return the Steam Deck back to its original behavior.
