---
title: "Ubiquiti EdgeRouter"
date: 2018-04-14T11:32:10-05:00
weight: 15
---

This document covers how to setup netboot.xyz, a service that provides
iPXE-based installation and live boot of a bunch of operating systems,
on a Ubiquiti EdgeRouter.

Thanks go to [Sam Kottler](https://github.com/skottler) for originally writing up this how-to. Improve setup robustness by using the embedded TFTP daemon from dnsmasq by [Yan Grunenberger](https://github.com/ravens) instead of external TFTP package.

### Assumptions

I've made a few assumptions throughout this document that will probably be
different for your setup:

* There is a DHCP pool called `LAN`
* The `LAN` pool manages `10.10.2.0/24`

### Configure tftp support in dnsmasq

By default, dnsmasq is using in the Edgerouter to provide DNS services. In order to enable it :

```
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

```
sudo curl -o /config/user-data/tftproot/netboot.xyz.kpxe https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe
sudo chmod ugo+r /config/user-data/tftproot/netboot.xyz.kpxe
```

At this point you should be able to use a TFTP client from a client in
`10.10.2.0/24` to fetch the image:

```
$ tftp 10.10.2.1
tftp> get netboot.xyz.kpxe
Received 354972 bytes in 2.0 seconds
```

### Configure dhcpd

We're gonna configure DHCP on the EdgeRouter to serve the right parameters to
clients:

```
configure

set service dhcp-server global-parameters "option client-arch code 93 = unsigned integer 16;"
edit service dhcp-server shared-network-name LAN subnet 10.10.2.0/24
set bootfile-server 10.10.2.1
set bootfile-name netboot.xyz.kpxe

commit
save
```

The configuration for the `LAN` pool should now look something like the following:

```
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
