---
id: troubleshooting
title: Troubleshooting Guide
sidebar_position: 1
description: Common issues and solutions for netboot.xyz
---

# Troubleshooting netboot.xyz

This guide covers common issues you might encounter when using netboot.xyz and their solutions.

## Quick Diagnostic Steps

Before diving into specific issues, try these basic diagnostic steps:

1. **Verify network connectivity** - Ensure the device can access the internet
2. **Check DHCP/PXE configuration** - Verify your network supports PXE booting
3. **Test with different bootloaders** - Try both UEFI and BIOS versions
4. **Check firewall settings** - Ensure ports 53 (DNS), 67/68 (DHCP), and 69 (TFTP) are open

## Common Issues by Category

### Boot Issues

#### The system doesn't PXE boot at all

**Symptoms:**
- No PXE boot option in BIOS/UEFI
- "No bootable device found" errors
- Boot process skips network boot entirely

**Solutions:**
1. **Enable PXE/Network Boot in BIOS/UEFI:**
   ```
   - Enter BIOS/UEFI settings (usually F2, F12, Del during boot)
   - Look for "Network Boot", "PXE", or "Boot from LAN" options
   - Enable these options and set network boot as first priority
   ```

2. **Check network cable and connection:**
   ```
   - Use a known-good Ethernet cable
   - Verify link lights are active on network port
   - Try a different network port if available
   ```

3. **DHCP Configuration Issues:**
   ```
   - Ensure DHCP server is running on your network
   - Verify DHCP has available IP addresses
   - Check if DHCP server supports PXE (Options 66/67)
   ```

#### System boots but gets stuck loading netboot.xyz

**Symptoms:**
- PXE boot starts but hangs at "Loading netboot.xyz..."
- Timeout errors when downloading files
- Partial menu loading

**Solutions:**
1. **Network Speed Issues:**
   ```bash
   # Try a different netboot.xyz endpoint
   # Instead of boot.netboot.xyz, try:
   # - boot.netboot.xyz (primary)
   # - github.netboot.xyz (GitHub pages backup)
   ```

2. **DNS Resolution Problems:**
   ```bash
   # Add to DHCP server configuration:
   option domain-name-servers 8.8.8.8, 1.1.1.1;
   ```

3. **Firewall Blocking:**
   ```
   - Allow outbound HTTPS (port 443) traffic
   - Allow DNS resolution (port 53)
   - Check corporate firewall/proxy settings
   ```

### Menu and OS Loading Issues

#### Menu loads but OS downloads fail

**Symptoms:**
- netboot.xyz menu appears correctly
- OS selection fails with download errors
- "Could not download" messages

**Solutions:**
1. **Insufficient Memory:**
   ```
   Minimum Requirements:
   - 1GB RAM for most Linux distributions
   - 2GB RAM for larger distributions (Ubuntu, Fedora)
   - 4GB+ RAM for rescue environments with GUI
   ```

2. **Storage Issues:**
   ```
   - Ensure target disk has sufficient free space
   - Check for disk errors or corruption
   - Verify disk is properly detected by system
   ```

3. **Network Bandwidth:**
   ```
   # For slow connections, try:
   - Use minimal/netinstall versions when available
   - Schedule downloads during off-peak hours
   - Consider self-hosting netboot.xyz for local network
   ```

#### Specific OS fails to boot after download

**Symptoms:**
- Download completes successfully
- Boot process starts but fails
- Kernel panic or boot loop

**Solutions:**
1. **Hardware Compatibility:**
   ```
   - Check OS hardware requirements
   - Try different kernel versions when available
   - Verify CPU architecture (x86_64 vs ARM64)
   ```

2. **UEFI vs BIOS Issues:**
   ```
   - Try switching between UEFI and Legacy BIOS modes
   - Use appropriate netboot.xyz bootloader for your system
   - Check Secure Boot settings (disable if necessary)
   ```

### Self-Hosting Issues

#### Docker container won't start

**Symptoms:**
- Container exits immediately
- Port binding errors
- Permission denied errors

**Solutions:**
1. **Port Conflicts:**
   ```bash
   # Check if ports are already in use
   sudo netstat -tulpn | grep :80
   sudo netstat -tulpn | grep :69
   
   # Use different ports if needed
   docker run -p 8080:80 -p 6969:69 netbootxyz/netboot.xyz
   ```

2. **Permission Issues:**
   ```bash
   # Ensure Docker daemon is running
   sudo systemctl status docker
   
   # Add user to docker group
   sudo usermod -aG docker $USER
   # Then logout and login again
   ```

#### Custom menus not loading

**Symptoms:**
- Default menus work fine
- Custom menu entries don't appear
- Custom ISOs fail to boot

**Solutions:**
1. **File Path Issues:**
   ```yaml
   # In docker-compose.yml, ensure paths are correct:
   volumes:
     - /local/path/to/assets:/assets
     - /local/path/to/menus:/config/menus
   ```

2. **File Permissions:**
   ```bash
   # Ensure files are readable by container
   chmod -R 644 /path/to/assets/
   chmod -R 755 /path/to/assets/directories/
   ```

## Environment-Specific Issues

### Home Network Setup

**Common Issues:**
- Consumer routers don't support PXE by default
- WiFi networks don't support PXE booting
- Limited DHCP configuration options

**Solutions:**
1. **Router Configuration:**
   ```
   - Look for "PXE Boot Support" in router settings
   - Enable TFTP server if available
   - Set DHCP Option 66 to boot.netboot.xyz
   - Set DHCP Option 67 to netboot.xyz.kpxe
   ```

2. **Alternative Approaches:**
   ```
   - Use USB/ISO images for initial testing
   - Set up a dedicated PXE server (Raspberry Pi)
   - Use netboot.xyz Docker container locally
   ```

### Enterprise Network

**Common Issues:**
- Network segmentation blocking access
- Proxy servers interfering
- Security policies preventing PXE boot

**Solutions:**
1. **Network Access:**
   ```
   Required firewall rules:
   - Outbound HTTPS to *.netboot.xyz (port 443)
   - Outbound DNS resolution (port 53)
   - TFTP if using local TFTP server (port 69)
   ```

2. **Proxy Configuration:**
   ```
   # If using HTTP proxy, configure:
   export http_proxy=http://proxy.company.com:8080
   export https_proxy=http://proxy.company.com:8080
   ```

### Cloud Environments

#### AWS/EC2 Issues

**Common Issues:**
- EBS boot volumes not properly configured
- Security groups blocking network access
- Instance types without sufficient resources

**Solutions:**
```bash
# Ensure security group allows:
- Inbound SSH (port 22) for management
- Outbound HTTPS (port 443) for downloads
- Inbound HTTP (port 80) if serving local content
```

#### VMware/VirtualBox Issues

**Common Issues:**
- Network adapter configuration
- Insufficient allocated memory
- Boot order problems

**Solutions:**
```
VMware:
- Set network adapter to "Bridged" mode
- Allocate minimum 2GB RAM
- Enable VT-x/AMD-V in VM settings

VirtualBox:
- Use "Bridged Adapter" network setting
- Enable "Cable Connected" option
- Set boot order: Network, then Hard Disk
```

## Getting Additional Help

If you're still experiencing issues after trying these solutions:

1. **Check the FAQ** - Many common questions are answered in our [FAQ section](/docs/faq)
2. **Search GitHub Issues** - Check if your issue is already reported: https://github.com/netbootxyz/netboot.xyz/issues
3. **Join Discord** - Get community help: https://discord.gg/An6PA2a
4. **Create a detailed issue report** with:
   - Your hardware/platform details
   - Network configuration
   - Exact error messages
   - Steps to reproduce the problem

## Diagnostic Information Collection

When asking for help, please include:

```bash
# System Information
uname -a
lscpu | head -20
free -h
ip addr show

# Network Configuration
cat /etc/resolv.conf
ip route show
```

For DHCP/PXE servers:
```bash
# DHCP lease information
dhcp-lease-list
cat /var/lib/dhcp/dhcpd.leases | tail -50

# TFTP server status
systemctl status tftpd-hpa
ls -la /srv/tftp/
```