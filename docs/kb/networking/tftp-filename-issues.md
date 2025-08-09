---
id: tftp-filename-issues
title: "TFTP Boot File Name Issues"
description: Common TFTP filename problems and solutions for netboot.xyz
hide_table_of_contents: true
---

This document covers common TFTP filename issues encountered when setting up netboot.xyz and provides solutions to resolve them.

## Common TFTP Filename Problems

### Incorrect Filename Specification in DHCP

The most common issue is specifying the wrong filename in your DHCP server configuration. Ensure you're using the correct boot file for your architecture:

**For BIOS/Legacy systems:**
```
filename "netboot.xyz.kpxe"
```

**For UEFI systems:**
```
filename "netboot.xyz.efi"
```

### Architecture Mismatch

Using the wrong boot file for your client architecture will cause boot failures:

- **BIOS/Legacy clients** require `netboot.xyz.kpxe`
- **UEFI clients** require `netboot.xyz.efi`
- **Mixed environments** need conditional filename assignment based on client architecture

### Case Sensitivity Issues

Some TFTP servers are case-sensitive. Ensure the filename in your DHCP configuration exactly matches the case of the file on your TFTP server:

```bash
# Correct
filename "netboot.xyz.kpxe"

# May fail on case-sensitive systems
filename "NetBoot.xyz.KPXE"
```

### Missing File Extensions

Always include the proper file extension in your filename configuration:

```bash
# Correct
filename "netboot.xyz.kpxe"

# Incorrect - missing extension
filename "netboot.xyz"
```

### Path and Directory Issues

If your boot files are in a subdirectory, include the full path:

```bash
# For files in a subdirectory
filename "ipxe/netboot.xyz.kpxe"
```

Ensure your TFTP server root directory is properly configured and the files are accessible.

## Solutions and Best Practices

### Mixed BIOS/UEFI Environment Setup

For environments with both BIOS and UEFI clients, configure conditional filename assignment:

**Using ISC DHCP Server:**
```bash
if option arch = 00:07 {
    filename "netboot.xyz.efi";
} elsif option arch = 00:00 {
    filename "netboot.xyz.kpxe";
} else {
    filename "netboot.xyz.efi";
}
```

**Using dnsmasq:**
```bash
dhcp-match=set:bios,60,PXEClient:Arch:00000
dhcp-boot=tag:bios,netboot.xyz.kpxe,,SERVERIP
dhcp-match=set:efi64,60,PXEClient:Arch:00007
dhcp-boot=tag:efi64,netboot.xyz.efi,,SERVERIP
```

### Verify File Availability

Test that your TFTP server can serve the files:

```bash
# Test TFTP connectivity
tftp YOUR_TFTP_SERVER_IP
tftp> get netboot.xyz.kpxe
tftp> quit
```

### Check File Permissions

Ensure proper file permissions on your TFTP server:

```bash
# Make files readable
chmod 644 /path/to/tftp/netboot.xyz.kpxe
chmod 644 /path/to/tftp/netboot.xyz.efi
```

### Alternative Boot Files

If you're experiencing compatibility issues with the standard boot files, try the undionly version:

- Use `netboot.xyz-undionly.kpxe` instead of `netboot.xyz.kpxe`
- The undionly version relies on the existing network card firmware instead of including drivers

## Troubleshooting Steps

1. **Verify DHCP Configuration:**
   - Check that `next-server` points to your TFTP server IP
   - Ensure `filename` matches the exact filename on your TFTP server

2. **Test TFTP Server:**
   - Manually connect to your TFTP server and attempt to download the file
   - Verify the TFTP service is running and listening on port 69

3. **Check Network Configuration:**
   - Ensure firewall rules allow TFTP traffic (UDP port 69)
   - Verify network connectivity between clients and TFTP server

4. **Review Client Architecture:**
   - Determine if your clients are BIOS or UEFI
   - Configure appropriate filename for each architecture type

5. **Validate File Integrity:**
   - Re-download boot files from [netboot.xyz downloads](https://netboot.xyz/downloads/)
   - Verify file checksums if available

## Related Documentation

- [Boot from TFTP](../booting/tftp.md) - General TFTP setup guide
- [Ubiquiti EdgeRouter](./edgerouter.md) - EdgeRouter-specific TFTP configuration
- [MikroTik](./mikrotik.md) - MikroTik router TFTP setup