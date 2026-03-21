---
title: Common Error Codes
sidebar_position: 2
description: Understanding and resolving common netboot.xyz error codes
---

# Common Error Codes and Solutions

This guide explains the most common error codes you might encounter when using netboot.xyz and how to resolve them.

## PXE Error Codes

### PXE-E32: TFTP Open Timeout

**What it means:** The system cannot connect to the TFTP server within the timeout period.

**Common causes:**
- Network connectivity issues
- TFTP server not responding
- Firewall blocking TFTP traffic (port 69)
- Incorrect TFTP server address

**Solutions:**
```bash
# Check network connectivity
ping boot.netboot.xyz

# Verify TFTP is accessible
tftp boot.netboot.xyz
> get netboot.xyz.kpxe
> quit

# Check firewall rules
sudo iptables -L | grep 69
```

### PXE-E51: No DHCP or ProxyDHCP Offers Were Received

**What it means:** The system cannot get network configuration from DHCP.

**Common causes:**
- DHCP server is down or unreachable
- Network cable issues
- DHCP pool exhausted
- Network adapter not supported

**Solutions:**
1. **Check DHCP server status:**
   ```bash
   sudo systemctl status isc-dhcp-server
   # or
   sudo systemctl status dhcpd
   ```

2. **Verify DHCP configuration:**
   ```bash
   # Check DHCP pool availability
   dhcp-lease-list
   ```

3. **Test network connectivity:**
   ```bash
   # On DHCP server, check if client is visible
   tail -f /var/log/syslog | grep dhcp
   ```

### PXE-E53: No Boot Filename Received

**What it means:** DHCP server didn't provide boot filename information.

**Common causes:**
- Missing DHCP Option 67 (boot filename)
- Incorrect boot filename configuration
- DHCP server doesn't support PXE

**Solutions:**
```bash
# Add to DHCP server configuration:
option bootfile-name "netboot.xyz.kpxe";
# or for UEFI:
option bootfile-name "netboot.xyz.efi";
```

### PXE-M0F: Exiting PXE ROM

**What it means:** PXE boot process was interrupted or cancelled.

**Common causes:**
- User pressed Ctrl+C or ESC
- Timeout waiting for user input
- PXE boot disabled in BIOS

**Solutions:**
1. **Check BIOS settings:**
   - Ensure PXE boot is enabled
   - Set appropriate boot timeout
   - Verify boot order includes network

2. **Don't interrupt the process:**
   - Let PXE boot complete automatically
   - Avoid pressing keys during initial boot

## iPXE Error Codes

### iPXE Error 0x3e1a6001: Connection timed out

**What it means:** Network connection to remote server timed out.

**Common causes:**
- Slow internet connection
- Server overloaded
- DNS resolution issues
- Firewall blocking HTTPS

**Solutions:**
```bash
# Test DNS resolution
nslookup boot.netboot.xyz

# Test HTTPS connectivity
curl -I https://boot.netboot.xyz

# Try alternative endpoints
# Set different URL in iPXE:
chain https://github.netboot.xyz/
```

### iPXE Error 0x3c092003: Operation not supported

**What it means:** The requested operation is not supported by the current iPXE build.

**Common causes:**
- HTTPS not supported in iPXE build
- Missing crypto support
- Incompatible iPXE version

**Solutions:**
1. **Use different bootloader:**
   ```
   # Try different iPXE variants:
   - netboot.xyz.kpxe (standard)
   - netboot.xyz-undionly.kpxe (UNDI only)
   - netboot.xyz.efi (UEFI)
   ```

2. **Check iPXE build features:**
   ```
   # In iPXE command line:
   ipxe> help
   # Look for HTTPS, crypto support
   ```

### iPXE Error 0x2f038001: No such file or directory

**What it means:** The requested file could not be found on the server.

**Common causes:**
- Incorrect file path
- File moved or deleted
- Server configuration issues

**Solutions:**
```bash
# Verify file exists:
curl -I https://boot.netboot.xyz/ipxe/netboot.xyz.lkrn

# Check alternative paths:
https://boot.netboot.xyz/ipxe/
https://github.netboot.xyz/ipxe/
```

## HTTP Error Codes

### HTTP 404: Not Found

**What it means:** The requested resource is not available on the server.

**Common causes:**
- Incorrect URL
- File has been moved
- Temporary server issue

**Solutions:**
1. **Check URL spelling:**
   ```
   # Correct format:
   https://boot.netboot.xyz/ipxe/filename
   ```

2. **Try alternative sources:**
   ```
   # GitHub mirror:
   https://github.netboot.xyz/ipxe/filename
   ```

### HTTP 503: Service Unavailable

**What it means:** The server is temporarily unable to handle the request.

**Common causes:**
- Server maintenance
- High server load
- CDN issues

**Solutions:**
1. **Wait and retry:**
   ```
   # Wait 5-10 minutes and try again
   # Check status page if available
   ```

2. **Use alternative endpoints:**
   ```
   # Try different server:
   chain https://github.netboot.xyz/
   ```

## OS-Specific Error Codes

### Linux Kernel Panic

**Common error messages:**
- "Kernel panic - not syncing: VFS: Unable to mount root fs"
- "Out of memory: Kill process"

**Solutions:**
1. **Memory issues:**
   ```
   # Ensure minimum RAM requirements:
   - Ubuntu: 1GB minimum, 2GB recommended
   - CentOS/RHEL: 1GB minimum
   - Arch Linux: 512MB minimum
   ```

2. **Root filesystem issues:**
   ```
   # Try different installation method:
   - Use netinstall instead of live image
   - Check disk for errors before installation
   ```

### Windows Boot Errors

**Common error codes:**
- 0xc0000225: Boot configuration data is missing
- 0x0000007B: INACCESSIBLE_BOOT_DEVICE

**Solutions:**
1. **UEFI vs BIOS compatibility:**
   ```
   # Ensure boot mode matches installation:
   - UEFI installation requires UEFI boot
   - Legacy BIOS installation requires Legacy boot
   ```

2. **Storage driver issues:**
   ```
   # Load appropriate drivers during installation
   # Use different Windows version if hardware not supported
   ```

## Debugging Tools and Commands

### iPXE Command Line

```bash
# Access iPXE shell (press Ctrl+B during boot)
ipxe> help                    # Show available commands
ipxe> config                  # Show current configuration
ipxe> ifstat                  # Show network interface status
ipxe> route                   # Show routing table
ipxe> dhcp                    # Request DHCP configuration
ipxe> chain http://url        # Load and execute from URL
```

### Network Diagnostics

```bash
# From rescue environment:
ip addr show                  # Show IP configuration
ip route show                 # Show routing table
cat /etc/resolv.conf         # Show DNS configuration
ping -c 4 8.8.8.8           # Test internet connectivity
nslookup boot.netboot.xyz    # Test DNS resolution
```

### Log Analysis

```bash
# System logs (most Linux distributions):
journalctl -b                # Current boot messages
dmesg | tail -50            # Kernel messages
tail -f /var/log/syslog     # System log

# DHCP server logs:
tail -f /var/log/dhcpd.log  # ISC DHCP server
journalctl -u dhcpd -f      # systemd DHCP service
```

## Getting Help

If you encounter an error code not listed here:

1. **Note the exact error code and message**
2. **Check our GitHub issues:** https://github.com/netbootxyz/netboot.xyz/issues
3. **Join our Discord:** https://discord.gg/An6PA2a
4. **Provide detailed information:**
   - Full error message
   - Hardware details
   - Network configuration
   - Steps to reproduce