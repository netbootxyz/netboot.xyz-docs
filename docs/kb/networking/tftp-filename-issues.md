---
id: tftp-filename-issues
title: "TFTP Filename Interpretation Issues with Older PXE Clients"
description: Troubleshooting TFTP filename issues caused by older PXE clients appending extra characters
hide_table_of_contents: false
---

## Problem Description

Older PXE clients (typically 10+ years old) may append extra characters to TFTP filenames, causing "File not found" errors. The issue manifests as Unicode replacement characters (�) or hex bytes (often 0xFF) being added to the end of requested filenames.

## Root Cause

This is a UEFI PXE implementation bug related to DHCP filename handling:

- **Technical Issue**: UEFI PXE clients incorrectly handle DHCP Option 67 (boot filename)
- **Expected Behavior**: Option 67 should be treated as a variable-length field
- **Actual Behavior**: Some implementations treat it as a null-terminated string, reading beyond the specified length
- **Result**: Extra bytes from the DHCP packet get appended to the TFTP filename request

## Affected Hardware/Software

### Hardware

- Jetway J7F4K1G5DS-LF and similar older boards
- Lenovo T460 laptops
- Z77X-UD3H motherboards with Atheros NICs
- Kontron VX3040 Intel CPU boards
- Generally affects Intel UNDI PXE-2.1 implementations from ~2000 era

### DHCP Servers

**Problematic:**
- Kea DHCP
- UniFi USG devices (limited configuration options)
- pfSense with Kea DHCP

**Working Combinations:**
- pfSense with deprecated isc-dhcp
- Properly configured OpnSense/isc-dhcp setups

## Workarounds and Solutions

### 1. Server-Side File Naming (Recommended)

Create boot files with the extra 0xFF byte in the filename:

```bash
# Rename files to include the extra byte
mv netboot.xyz.kpxe $(echo -en 'netboot.xyz.kpxe\xFF')
mv netboot.xyz.efi $(echo -en 'netboot.xyz.efi\xFF')

# Or create symlinks (cleaner approach)
ln -s netboot.xyz.kpxe $(echo -en 'netboot.xyz.kpxe\xFF')
ln -s netboot.xyz.efi $(echo -en 'netboot.xyz.efi\xFF')
```

### 2. DHCP Configuration Changes

For isc-dhcp servers, use the `boot-file-name` directive instead of Option 67:

```bash
# In dhcp4 config, use boot-file-name at the top level
boot-file-name "netboot.xyz.kpxe";

# Instead of in option-data
```

For pfSense users: Switch from Kea to the deprecated isc-dhcp service in System > Advanced > Networking.

### 3. Remove DHCP boot-filename Option

Some users report success by removing the `option bootfile-name` directive entirely, though this may break other clients.

## Technical Details

- The issue specifically affects DHCPv4 Option 67 handling
- DHCPv6 does not have this problem due to its variable-length field design
- RFC 2132 does not guarantee null termination of Option 67 filenames
- UEFI 2.6 spec leaves line termination as an implementation detail

## Troubleshooting Steps

1. **Identify the issue**: Look for replacement characters (�) or extra bytes in TFTP server logs
2. **Packet capture**: Use tcpdump to verify extra bytes in TFTP requests
3. **Test workarounds**: Try the server-side filename solution first
4. **DHCP server evaluation**: Consider switching from Kea to isc-dhcp if possible

## Prevention

- Use the `boot-file-name` directive in DHCP configuration instead of Option 67
- Test with known problematic hardware before deployment
- Document affected clients in your environment

## References

- [Issue discussion](https://github.com/netbootxyz/netboot.xyz/issues/1198)
- [Technical analysis](https://binaryfury.wann.net/2024/12/pxe-two-tftp-filenames-one-dhcp-offer-plus-weird-filenames/)
- UEFI Specification 2.6+
- RFC 2132 (DHCP Options)