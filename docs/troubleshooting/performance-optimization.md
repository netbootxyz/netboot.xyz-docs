---
title: Performance Optimization
sidebar_position: 3
description: Optimize netboot.xyz performance for faster boot times and downloads
---

# Performance Optimization Guide

This guide helps you optimize netboot.xyz performance for faster boot times, quicker downloads, and better user experience.

## Boot Time Optimization

### Network Boot Speed

**Reduce PXE Boot Time:**

1. **Optimize DHCP Response Time:**
   ```bash
   # In DHCP server configuration:
   default-lease-time 86400;
   max-lease-time 86400;
   
   # Reduce timeout values:
   timeout 10;
   retry 5;
   ```

2. **Use Local TFTP Server:**
   ```bash
   # Instead of boot.netboot.xyz, use local server:
   option next-server 192.168.1.100;  # Your local server
   option bootfile-name "netboot.xyz.kpxe";
   ```

3. **Preload Network Drivers:**
   ```
   # Use appropriate bootloader for your hardware:
   - netboot.xyz.kpxe (includes common drivers)
   - netboot.xyz-undionly.kpxe (uses BIOS network drivers)
   - netboot.xyz.efi (UEFI with SNP support)
   ```

### Menu Loading Optimization

**Faster Menu Display:**

1. **Enable HTTP Compression:**
   ```nginx
   # Nginx configuration:
   location / {
       gzip on;
       gzip_types text/plain application/json text/css application/javascript;
       gzip_min_length 1000;
   }
   ```

2. **Use CDN for Static Assets:**
   ```
   # Configure custom endpoints with CDN:
   https://your-cdn.com/netboot/menus/
   ```

3. **Optimize Network MTU:**
   ```bash
   # Test optimal MTU size:
   ping -f -l 1472 boot.netboot.xyz  # Windows
   ping -M do -s 1472 boot.netboot.xyz  # Linux
   
   # Set optimal MTU (usually 1500 for Ethernet):
   sudo ip link set dev eth0 mtu 1500
   ```

## Download Speed Optimization

### Bandwidth Management

**Optimize Download Performance:**

1. **Choose Optimal Mirror:**
   ```bash
   # Test mirror speeds:
   curl -w "@curl-format.txt" -o /dev/null https://boot.netboot.xyz/
   curl -w "@curl-format.txt" -o /dev/null https://github.netboot.xyz/
   
   # curl-format.txt content:
   # time_namelookup:  %{time_namelookup}\n
   # time_connect:     %{time_connect}\n
   # time_total:       %{time_total}\n
   # speed_download:   %{speed_download}\n
   ```

2. **Parallel Downloads:**
   ```bash
   # For custom implementations, use parallel downloads:
   wget --parallel=4 --continue url1 url2 url3 url4
   ```

3. **Local Caching:**
   ```bash
   # Set up local cache with nginx:
   proxy_cache_path /var/cache/nginx/netboot
                    levels=1:2
                    keys_zone=netboot:10m
                    max_size=10g
                    inactive=60m
                    use_temp_path=off;
   
   location / {
       proxy_pass https://boot.netboot.xyz;
       proxy_cache netboot;
       proxy_cache_valid 200 24h;
       proxy_cache_use_stale error timeout updating;
   }
   ```

### Self-Hosting Optimization

**Local netboot.xyz Instance:**

1. **Docker Performance Tuning:**
   ```yaml
   # docker-compose.yml optimizations:
   version: '3.8'
   services:
     netbootxyz:
       image: netbootxyz/netboot.xyz
       restart: unless-stopped
       environment:
         - MENU_VERSION=2.0.59
       ports:
         - "80:80"
         - "69:69/udp"
       volumes:
         - ./config:/config
         - ./assets:/assets
       # Performance optimizations:
       deploy:
         resources:
           limits:
             memory: 2G
           reservations:
             memory: 512M
       sysctls:
         - net.core.somaxconn=65535
   ```

2. **Nginx Configuration:**
   ```nginx
   # /config/nginx/site-confs/default
   server {
       listen 80;
       server_name _;
       
       # Performance optimizations:
       sendfile on;
       tcp_nopush on;
       tcp_nodelay on;
       keepalive_timeout 30;
       
       # Compression:
       gzip on;
       gzip_vary on;
       gzip_types text/plain text/css application/json application/javascript;
       
       # Caching:
       location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
       
       # Assets location:
       location /assets/ {
           alias /assets/;
           autoindex on;
       }
   }
   ```

## Memory Optimization

### RAM Usage Optimization

**Reduce Memory Footprint:**

1. **Choose Lightweight Distributions:**
   ```
   Minimal RAM Requirements:
   - Alpine Linux: 128MB
   - Tiny Core Linux: 64MB
   - Puppy Linux: 256MB
   - Debian Netinstall: 512MB
   ```

2. **Optimize iPXE Memory Usage:**
   ```
   # Use smaller bootloaders when possible:
   - netboot.xyz.lkrn: ~500KB (Linux kernel format)
   - netboot.xyz.kpxe: ~100KB (PXE format)
   - netboot.xyz.efi: ~200KB (UEFI format)
   ```

3. **Configure Swap for Low-Memory Systems:**
   ```bash
   # Create swap file for systems with limited RAM:
   sudo fallocate -l 2G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   
   # Make permanent:
   echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
   ```

### Storage Optimization

**Disk Usage Optimization:**

1. **Clean Downloaded Assets:**
   ```bash
   # Regularly clean temporary downloads:
   find /tmp -name "*.iso" -mtime +1 -delete
   find /var/cache -name "*.deb" -mtime +7 -delete
   ```

2. **Optimize Asset Storage:**
   ```bash
   # Use compression for stored ISOs:
   find /assets -name "*.iso" -exec gzip {} \;
   
   # Configure automatic decompression in nginx:
   location ~ \.iso$ {
       gzip_static on;
   }
   ```

## Network Optimization

### Network Stack Tuning

**Optimize Network Performance:**

1. **TCP Optimization:**
   ```bash
   # /etc/sysctl.conf optimizations:
   net.core.rmem_max = 134217728
   net.core.wmem_max = 134217728
   net.ipv4.tcp_rmem = 4096 65536 134217728
   net.ipv4.tcp_wmem = 4096 65536 134217728
   net.core.netdev_max_backlog = 5000
   net.ipv4.tcp_window_scaling = 1
   
   # Apply changes:
   sudo sysctl -p
   ```

2. **Network Interface Optimization:**
   ```bash
   # Optimize network interface settings:
   sudo ethtool -G eth0 rx 4096 tx 4096  # Increase ring buffer
   sudo ethtool -K eth0 tso on gso on    # Enable offloading
   ```

### DNS Optimization

**Improve DNS Resolution:**

1. **Use Fast DNS Servers:**
   ```bash
   # /etc/resolv.conf:
   nameserver 1.1.1.1    # Cloudflare
   nameserver 8.8.8.8    # Google
   nameserver 9.9.9.9    # Quad9
   ```

2. **Local DNS Caching:**
   ```bash
   # Install and configure dnsmasq:
   sudo apt-get install dnsmasq
   
   # /etc/dnsmasq.conf:
   cache-size=1000
   local-ttl=300
   ```

## Self-Hosting Performance

### Hardware Recommendations

**Optimal Hardware for Self-Hosting:**

1. **Minimum Specifications:**
   ```
   CPU: 2 cores, 2GHz
   RAM: 4GB
   Storage: 50GB SSD
   Network: Gigabit Ethernet
   ```

2. **Recommended Specifications:**
   ```
   CPU: 4+ cores, 3GHz+
   RAM: 8GB+
   Storage: 100GB+ NVMe SSD
   Network: Gigabit Ethernet with QoS
   ```

3. **Enterprise Specifications:**
   ```
   CPU: 8+ cores, 3.5GHz+
   RAM: 16GB+
   Storage: 500GB+ NVMe SSD in RAID 1
   Network: 10Gbps with redundancy
   ```

### Docker Optimization

**Container Performance Tuning:**

1. **Resource Limits:**
   ```yaml
   services:
     netbootxyz:
       deploy:
         resources:
           limits:
             cpus: '2.0'
             memory: 4G
           reservations:
             cpus: '1.0'
             memory: 2G
   ```

2. **Volume Optimization:**
   ```yaml
   volumes:
     # Use bind mounts for better performance:
     - type: bind
       source: ./assets
       target: /assets
     - type: bind
       source: ./config
       target: /config
   ```

## Monitoring and Metrics

### Performance Monitoring

**Track Performance Metrics:**

1. **Network Monitoring:**
   ```bash
   # Monitor network usage:
   iftop -i eth0              # Real-time bandwidth
   nethogs                    # Per-process network usage
   ss -tuln                   # Active connections
   ```

2. **System Performance:**
   ```bash
   # Monitor system resources:
   htop                       # CPU and memory usage
   iotop                      # Disk I/O
   vmstat 1                   # System statistics
   ```

3. **Docker Monitoring:**
   ```bash
   # Monitor container performance:
   docker stats netbootxyz   # Resource usage
   docker logs netbootxyz    # Container logs
   ```

### Log Analysis

**Performance Log Analysis:**

1. **Nginx Access Logs:**
   ```bash
   # Analyze slow requests:
   awk '$9 >= 400 {print $0}' /var/log/nginx/access.log
   
   # Top requesting IPs:
   awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -20
   ```

2. **System Logs:**
   ```bash
   # Check for performance issues:
   journalctl -p err -b       # Error messages from current boot
   dmesg | grep -i error      # Kernel errors
   ```

## Troubleshooting Slow Performance

### Common Performance Issues

**Identify and Fix Slow Performance:**

1. **Network Bottlenecks:**
   ```bash
   # Test network speed:
   iperf3 -c server_ip        # Bandwidth test
   mtr boot.netboot.xyz       # Network path analysis
   tcpdump -i eth0 port 80    # Monitor HTTP traffic
   ```

2. **Storage Issues:**
   ```bash
   # Test disk performance:
   hdparm -tT /dev/sda        # Hard drive speed test
   dd if=/dev/zero of=/tmp/test bs=1M count=1024  # Write speed test
   ```

3. **Memory Pressure:**
   ```bash
   # Check memory usage:
   free -h                    # Available memory
   cat /proc/meminfo          # Detailed memory info
   ps aux --sort=-%mem        # Top memory consumers
   ```

Remember: Performance optimization is an iterative process. Monitor your metrics, make incremental changes, and measure the impact of each optimization.