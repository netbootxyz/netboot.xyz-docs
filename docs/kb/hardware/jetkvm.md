---
id: jetkvm
title: "JetKVM"
sidebar_label: JetKVM
description: Using netboot.xyz with the JetKVM hardware KVM device
hide_table_of_contents: true
---

## Overview

[JetKVM](https://jetkvm.com) is a compact, open-source hardware KVM-over-IP device that lets you
remotely control any computer at the BIOS/UEFI level — with full keyboard, video, and mouse access.
It streams 1080p video at up to 60 FPS with sub-100ms latency using H.264 encoding over WebRTC,
and works even in headless or crashed system scenarios where a normal remote desktop agent would be
useless.

JetKVM connects directly to a target machine via HDMI and USB, with no software required on the
host. Remote access is available through a local web interface or optionally through the open-source
JetKVM Cloud. The hardware is fully open source and extensible via an RJ12 port for add-ons like
ATX power control and serial console access.

You can pick one up on [Amazon](https://amzn.to/4sjx5rH).

## netboot.xyz Support

JetKVM has built-in support for netboot.xyz. From the JetKVM web interface you can mount
netboot.xyz as a virtual drive, allowing you to boot directly into the netboot.xyz menu on any
connected machine without physical media.

This makes JetKVM a powerful tool for remote OS provisioning, recovery, and diagnostics — you can
network-boot a machine from anywhere and run the full netboot.xyz menu over the remote KVM
connection.

To get started, load one of the netboot.xyz ISO images as a virtual drive in the JetKVM interface:

- [netboot.xyz ISO (Legacy/BIOS)](https://boot.netboot.xyz/ipxe/netboot.xyz.iso)
- [netboot.xyz ISO (UEFI)](https://boot.netboot.xyz/ipxe/netboot.xyz-efi.iso)

Boot the target machine from the virtual drive and the netboot.xyz menu will load over the network.
