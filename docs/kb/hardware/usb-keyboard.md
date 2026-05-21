---
id: usb-keyboard
title: USB Keyboard Not Working
sidebar_label: USB Keyboard Issues
description: "Fix unresponsive USB keyboards in the netboot.xyz menu by booting the legacy iPXE images that preserve BIOS USB legacy support"
hide_table_of_contents: false
---

## Overview

On some systems the netboot.xyz menu loads and displays correctly, but the USB keyboard
is completely unresponsive — you cannot navigate the menu or select any entries. This most
commonly appears after upgrading from older releases (for example, the menu worked on
`2.0.89` but stopped responding on `3.0.1`), and it typically affects multiple keyboards
across multiple machines on the same hardware platform.

If your keyboard works in your BIOS/UEFI setup screen but not once netboot.xyz loads, this
article is for you.

## Cause

Modern iPXE builds include USB NIC drivers so that USB Ethernet adapters can be used for
network booting. On some hardware, loading these USB drivers causes iPXE to take over the
USB controller and disable the BIOS SMM-based USB legacy support — the firmware feature that
emulates a PS/2 keyboard for USB input devices. Without that emulation, iPXE never receives
keystrokes and the menu appears frozen.

This is a hardware/firmware interaction rather than a netboot.xyz bug: the standard images
trade USB legacy keyboard support for USB NIC support.

## Solution: Use the Legacy Images

netboot.xyz publishes a parallel set of **legacy** bootloaders built without the USB NIC
drivers. With those drivers excluded, the BIOS keeps its USB legacy support enabled and your
USB keyboard works as expected. The trade-off is that USB Ethernet adapters are not supported
by the legacy images — use them only if you are booting over a built-in (PCI/PCIe) network
interface.

### Download

The legacy images are served alongside the standard images at `boot.netboot.xyz/ipxe/`:

| File | Use case |
|---|---|
| [`netboot.xyz-legacy.img`](https://boot.netboot.xyz/ipxe/netboot.xyz-legacy.img) | USB flash drive |
| [`netboot.xyz-legacy.iso`](https://boot.netboot.xyz/ipxe/netboot.xyz-legacy.iso) | CD/DVD or virtual media |
| [`netboot.xyz-legacy.kpxe`](https://boot.netboot.xyz/ipxe/netboot.xyz-legacy.kpxe) | BIOS network boot (DHCP/TFTP) |
| [`netboot.xyz-legacy.efi`](https://boot.netboot.xyz/ipxe/netboot.xyz-legacy.efi) | UEFI network boot (DHCP/TFTP) |
| [`netboot.xyz-legacy.lkrn`](https://boot.netboot.xyz/ipxe/netboot.xyz-legacy.lkrn) | Linux kernel (chainload via GRUB/syslinux) |
| [`netboot.xyz-legacy.dsk`](https://boot.netboot.xyz/ipxe/netboot.xyz-legacy.dsk) | Floppy disk image |
| [`netboot.xyz-legacy.pdsk`](https://boot.netboot.xyz/ipxe/netboot.xyz-legacy.pdsk) | Padded floppy disk image |

### USB Flash Drive

Write `netboot.xyz-legacy.img` to a USB key exactly as you would the standard image:

```shell
dd if=netboot.xyz-legacy.img of=/dev/sdX
```

Replace `sdX` with your USB device. See [Boot from USB](../../booting/usb.md) for full
platform-specific instructions (Linux, macOS, and Windows).

:::danger
Writing the image will overwrite everything on the USB key. Back up any important data first.
:::

### ISO / Virtual Media

Burn `netboot.xyz-legacy.iso` to a CD/DVD, or attach it as virtual media through a BMC such as
a Dell DRAC or HP iLO. See [Boot from ISO](../../booting/iso.md) for details.

### Network Boot

If you PXE boot over the network, point your DHCP/TFTP configuration at the legacy bootloader
instead of the standard one — `netboot.xyz-legacy.kpxe` for BIOS clients or
`netboot.xyz-legacy.efi` for UEFI clients.

## Self-Hosted Deployments

If you run the [netboot.xyz Docker container](../../docker/overview.md), the legacy bootloaders
are generated as part of the standard build and are available from your local instance the same
way the standard images are. Serve the `netboot.xyz-legacy.*` filename that matches your boot
method.

## Notes

- Only switch to the legacy images if you are actually affected by the USB keyboard issue. The
  standard images remain the right choice for most systems, especially anyone booting through a
  USB Ethernet adapter.
- This behavior is tracked upstream in
  [netbootxyz/netboot.xyz#1769](https://github.com/netbootxyz/netboot.xyz/issues/1769).
