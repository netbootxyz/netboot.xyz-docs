---
id: cherryservers
title: "Cherry Servers"
description: "Using netboot.xyz with Cherry Servers dedicated bare metal"
hide_table_of_contents: true
---

[Cherry Servers](https://www.cherryservers.com/) supports iPXE installation on dedicated bare metal
servers, including direct support for netboot.xyz.

### How iPXE Works on Cherry Servers

Cherry Servers uses a custom iPXE implementation to work around the lack of native iPXE-over-DHCP
support in standard MaaS infrastructure. On first boot:

1. A universal iPXE ISO is automatically attached to the server.
2. The server receives network configuration via DHCP.
3. Your selected iPXE script executes from RAM.
4. The OS installation begins.
5. The ISO disconnects automatically after five minutes.

iPXE can be selected when deploying a new server, during a server rebuild, and is available on all
dedicated bare metal servers (excluding Outlet servers).

### Boot with netboot.xyz

Cherry Servers supports netboot.xyz as an iPXE option. When deploying or rebuilding a server,
select iPXE as the installation method and set the chain URL to:

    https://boot.netboot.xyz

Once the server boots, open the console in the Cherry Servers portal within five minutes to access
the netboot.xyz menu and select your desired OS or tool.

Supported systems include Ubuntu, Debian, Rocky Linux, Proxmox, Fedora, Arch Linux, Red Hat
Enterprise Linux, Kali Linux, and many others, along with recovery and diagnostic tools such as
Clonezilla, GParted, and Memtest86+.

### Further Reading

Full iPXE documentation for Cherry Servers is available in their
[knowledge base](https://www.cherryservers.com/knowledge/docs/compute/configuration-management/ipxe).
