---
id: mikrotik
title: "Mikrotik RouterOS"
description: Mikrotik RouterOS Usage
hide_table_of_contents: true
---

### Assumptions

- You are running RouterOS 7.12.1 or later
- You have a DHCP server, whose name you will substitute in instead of DHCPSERVER
- You have a DHCP address pool whose name you will substitute in instead of DHCPPOOL

The steps referencing servers and pools can be repeated for as many servers and pools as you need.

### Disable BOOTP support for the server

```
/ip dhcp-server/set DHCPSERVER bootp-support=none
```

### BIOS

Download `netboot.xyz.kpxe` and register it to the TFTP server:

```
/tool fetch url="https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe"
/ip tftp add req-filename=netboot.xyz.kpxe real-filename=netboot.xyz.kpxe allow=yes read-only=yes
```

Add a DHCP option for the BIOS bootfile and add it to a BIOS PXE boot option set:

```
/ip dhcp-server option add code=67 name=pxe-bios-netboot.xyz value="'netboot.xyz.kpxe'"
/ip dhcp-server/option/sets add name="pxe-bios" options=pxe-bios-netboot.xyz 
```

Set the BIOS PXE boot option set as the server's option set.

```
/ip dhcp-server/set DHCPSERVER dhcp-option-set=pxe-bios
```

NOTE: If you have an existing option set, you should skip creating a new option set and should instead add the PXE BIOS bootfile option to your existing option set.

### UEFI

Download `netboot.xyz.efi` and register it to the TFTP server:

```
/tool fetch url="https://boot.netboot.xyz/ipxe/netboot.xyz.efi"
/ip tftp add req-filename=netboot.xyz.efi real-filename=netboot.xyz.efi allow=yes read-only=yes
```

Add a DHCP option for the UEFI bootfile and add it to a UEFI PXE boot option set:

```
/ip dhcp-server option add code=67 name=pxe-uefi-netboot.xyz value="'netboot.xyz.efi'"
/ip dhcp-server/option/sets add name="pxe-uefi" options=pxe-uefi-netboot.xyz 
```

Add a DHCP matcher that looks for the 0x0007 (x86-64 UEFI) architecture type and applies the PXE UEFI option set, overriding the default PXE BIOS options:

```
/ip dhcp-server/matcher/add name="pxe-uefi-matcher" server=DHCPSERVER address-pool=DHCPPOOL option-set=pxe-uefi code=93 value="0x0007"
```
