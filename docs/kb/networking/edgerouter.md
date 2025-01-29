---
id: edgerouter
title: "Ubiquiti EdgeRouter"
description: Ubiquiti EdgeRouter Usage
hide_table_of_contents: true
---

This document covers how to setup netboot.xyz, a service that provides
iPXE-based installation and live boot of a bunch of operating systems,
on a [Ubiquiti EdgeRouter](https://amzn.to/40zL2oL).

Thanks go to [Sam Kottler](https://github.com/skottler) for originally writing up this how-to. Improve setup robustness by using the embedded TFTP daemon from dnsmasq by [Yan Grunenberger](https://github.com/ravens) instead of external TFTP package.

### Assumptions

I've made a few assumptions throughout this document that will probably be
different for your setup:

* There is a DHCP pool called `LAN`
* The `LAN` pool manages `10.10.2.0/24`

### Configure tftp support in dnsmasq

By default, dnsmasq is using in the Edgerouter to provide DNS services. In order to enable it :

```bash
sudo mkdir /config/user-data/tftproot
sudo chmod ugo+rX /config/user-data/tftproot

configure

set service dns forwarding  options enable-tftp
set service dns forwarding  options tftp-root=/config/user-data/tftproot

commit
save
```

### Setup TFTP components

Download the kpxe image for netboot.xyz and set the permissions properly:

```bash
sudo curl -o /config/user-data/tftproot/netboot.xyz.kpxe https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe
sudo chmod ugo+r /config/user-data/tftproot/netboot.xyz.kpxe
```

At this point you should be able to use a TFTP client from a client in
`10.10.2.0/24` to fetch the image:

```bash
$ tftp 10.10.2.1
tftp> get netboot.xyz.kpxe
Received 354972 bytes in 2.0 seconds
```

### Configure dhcpd

We're gonna configure DHCP on the EdgeRouter to serve the right parameters to
clients:

```bash
configure

set service dhcp-server global-parameters "option client-arch code 93 = unsigned integer 16;"
edit service dhcp-server shared-network-name LAN subnet 10.10.2.0/24
set bootfile-server 10.10.2.1
set bootfile-name netboot.xyz.kpxe

commit
save
```

The configuration for the `LAN` pool should now look something like the following:

```bash
skottler@edge1# show service dhcp-server shared-network-name LAN
 authoritative enable
 subnet 10.10.2.0/24 {
     bootfile-name netboot.xyz.kpxe
     bootfile-server 10.10.2.1
     default-router 10.10.2.1
     dns-server 10.10.2.1
     lease 86400
     start 10.10.2.100 {
         stop 10.10.2.199
     }
 }
[edit]
```

That's it!

## The advanced setup with support for Legacy and UEFI

### Using ISC DHCP

This section was written by [Skyler Mäntysaari](https://github.com/samip5).

This requires that you do not use `set service dhcp-server use-dnsmasq enable`. If you do use that, it will not work.

We are going to start by removing the PXE boot related things from dhcp-server options, so the commands for that are something like:

```bash
delete service dhcp-server shared-network-name LAN subnet 10.10.2.0/24 bootfile-name netboot.xyz.kpxe
delete service dhcp-server shared-network-name LAN subnet 10.10.2.0/24 bootfile-server 10.10.2.1
```

We are now going to download the efi version of the boot file if it does not exist yet:
```
sudo curl -o /config/user-data/tftproot/netboot.xyz.efi https://boot.netboot.xyz/ipxe/netboot.xyz.efi
sudo chmod ugo+r /config/user-data/tftproot/netboot.xyz.efi
```

Next we are going to create a scripts folder for the scripts, in persistent storage (should persist over upgrades):

```bash
mkdir --parents /config/user-data/scripts/pxe/
```

Next we are going to go into configure mode, and include the main pxe config file:

```bash
set service dhcp-server global-parameters "deny bootp;"
set service dhcp-server global-parameters "include &quot;/config/user-data/scripts/pxe/option-space.conf&quot;;"
set service dhcp-server shared-network-name LAN subnet 10.10.2.0/24 subnet-parameters "include &quot;/config/user-data/scripts/pxe/pxe.conf&quot;;"
```

IT NEEDS to be typed exactly like that, the "" part.

The file /config/user-data/scripts/pxe/pxe.conf:

```bash
allow booting;
next-server 10.10.2.1;

if option arch = 00:07 {
    filename "netboot.xyz.efi";
} elsif option arch = 00:00 {
    filename "netboot.xyz.kpxe";
} else {
    filename "netboot.xyz.efi";
}
```

The file /config/user-data/scripts/pxe/option-space.conf:

```bash
# Declare the iPXE/gPXE/Etherboot option space
option space ipxe;
option ipxe-encap-opts code 175 = encapsulate ipxe;

# iPXE options, can be set in DHCP response packet
option ipxe.priority         code   1 = signed integer 8;
option ipxe.keep-san         code   8 = unsigned integer 8;
option ipxe.skip-san-boot    code   9 = unsigned integer 8;
option ipxe.syslogs          code  85 = string;
option ipxe.cert             code  91 = string;
option ipxe.privkey          code  92 = string;
option ipxe.crosscert        code  93 = string;
option ipxe.no-pxedhcp       code 176 = unsigned integer 8;
option ipxe.bus-id           code 177 = string;
option ipxe.bios-drive       code 189 = unsigned integer 8;
option ipxe.username         code 190 = string;
option ipxe.password         code 191 = string;
option ipxe.reverse-username code 192 = string;
option ipxe.reverse-password code 193 = string;
option ipxe.version          code 235 = string;
option iscsi-initiator-iqn   code 203 = string;

# iPXE feature flags, set in DHCP request packet
option ipxe.pxeext    code 16 = unsigned integer 8;
option ipxe.iscsi     code 17 = unsigned integer 8;
option ipxe.aoe       code 18 = unsigned integer 8;
option ipxe.http      code 19 = unsigned integer 8;
option ipxe.https     code 20 = unsigned integer 8;
option ipxe.tftp      code 21 = unsigned integer 8;
option ipxe.ftp       code 22 = unsigned integer 8;
option ipxe.dns       code 23 = unsigned integer 8;
option ipxe.bzimage   code 24 = unsigned integer 8;
option ipxe.multiboot code 25 = unsigned integer 8;
option ipxe.slam      code 26 = unsigned integer 8;
option ipxe.srp       code 27 = unsigned integer 8;
option ipxe.nbi       code 32 = unsigned integer 8;
option ipxe.pxe       code 33 = unsigned integer 8;
option ipxe.elf       code 34 = unsigned integer 8;
option ipxe.comboot   code 35 = unsigned integer 8;
option ipxe.efi       code 36 = unsigned integer 8;
option ipxe.fcoe      code 37 = unsigned integer 8;
option ipxe.vlan      code 38 = unsigned integer 8;
option ipxe.menu      code 39 = unsigned integer 8;
option ipxe.sdi       code 40 = unsigned integer 8;
option ipxe.nfs       code 41 = unsigned integer 8;

# Other useful general options
# https://www.iana.org/assignments/dhcpv6-parameters/dhcpv6-parameters.xhtml
option arch code 93 = unsigned integer 16;
```

After all of that, it should be it! I hope that helps.

### Using dnsmasq

This section was written by [Benjamin Reich](https://benjaminreich.de/).

This Part is requierd if you using `set service dhcp-server use-dnsmasq enable`.

Connect via SSH and replace `SERVERIP` with the actual IP.

```bash
configure
set service dhcp-server use-dnsmasq enable
set service dns forwarding options "dhcp-match=set:bios,60,PXEClient:Arch:00000"
set service dns forwarding options "dhcp-boot=tag:bios,netboot.xyz.kpxe,,SERVERIP"
set service dns forwarding options "dhcp-match=set:efi32,60,PXEClient:Arch:00002"
set service dns forwarding options "dhcp-boot=tag:efi32,netboot.xyz.efi,,SERVERIP"
set service dns forwarding options "dhcp-match=set:efi32-1,60,PXEClient:Arch:00006"
set service dns forwarding options "dhcp-boot=tag:efi32-1,netboot.xyz.efi,,SERVERIP"
set service dns forwarding options "dhcp-match=set:efi64,60,PXEClient:Arch:00007"
set service dns forwarding options "dhcp-boot=tag:efi64,netboot.xyz.efi,,SERVERIP"
set service dns forwarding options "dhcp-match=set:efi64-1,60,PXEClient:Arch:00008"
set service dns forwarding options "dhcp-boot=tag:efi64-1,netboot.xyz.efi,,SERVERIP"
set service dns forwarding options "dhcp-match=set:efi64-2,60,PXEClient:Arch:00009"
set service dns forwarding options "dhcp-boot=tag:efi64-2,netboot.xyz.efi,,SERVERIP"
commit; save
```
