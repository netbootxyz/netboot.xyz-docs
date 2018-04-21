---
title: "Ubiquiti EdgeRouter"
date: 2018-04-14T11:32:10-05:00
weight: 15
---

This document covers how to setup netboot.xyz, a service that provides
iPXE-based installation and live boot of a bunch of operating systems,
on a Ubiquiti EdgeRouter.

Thanks go to [Sam Kottler](https://github.com/skottler) for originally writing up this how-to.

### Assumptions

I've made a few assumptions throughout this document that will probably be
different for your setup:

* There is a DHCP pool called `LAN`
* The `LAN` pool manages `10.10.2.0/24`

### Basic setup

With that out of the way, let's get started.

First, we're going to configure the main and contrib components with a mirror
for Wheezy:

```
configure

set system package repository wheezy components 'main contrib'
set system package repository wheezy distribution wheezy
set system package repository wheezy url http://http.us.debian.org/debian

commit
save
exit
```

Update the apt cache with our newly configured repo using `sudo apt-get update`.

Next, install TFTPD: `sudo apt-get install tftpd-hpa`. The service will be
running once the package is installed. It doesn't require any further
configuration.

### Setup TFTP components

Download the kpxe image for netboot.xyz and set the permissions properly:

```
sudo curl -o /srv/tftp/netboot.xyz.kpxe https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe
sudo chown tftp:tftp /srv/tftp/netboot.xyz.kpxe
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
