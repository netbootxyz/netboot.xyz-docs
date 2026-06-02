
---
id: Bazzite
title: PXE Booting the Bazzite Installer
sidebar_label: BAzzite 
description: PXE Booting the Bazzite Installer using local HTTP and TFTP 
hide_table_of_contents: true
---

## Overview

To be able to use Bazzite's ISO with `netboot.xyz` you will need the following:
- A NFS server
- A local netboot.xyz server [you can use  Docker Container > Setting up the container with the Docker CLI](https://netboot.xyz/docs/docker/usage#starting-up-the-container-with-the-docker-cli)

Some explanations:
- The NFS server is necessary to mount the filesystem contained in the ISO. This filesytem will then be reached by the iPXE client through NFS protocol and initrd magic.
- The netboot.xyz instance will be used to:
  - Host your iPXE script where you will specify initrd command line to reach NFS url above.
  - Host two files form your ISO: `initrd` and `vmlinuz`

## Setup NFS share

- Get the iso on https://bazzite.gg
- Mount the iso
```bash
sudo mkdir -p /ISO/bazzite #This is optional i fyou swant to mount it elsewhere, up to you :p
sudo mount -t iso9660 bazzite-stable.sio /ISO/bazzite
```
- Configure the NFS share in `/etc/exports`:
```bash
echo "/ISO/bazzite xx.xx.xx.xx/yy(ro,nu_subtree_check,insecure)" | sudo tee /etc/exports #replace xx.xx.xx.xx/yy with the subnet you want to authorize
```
- Apply the configuration
```bash
sudo exportfs -arv
```

## Make netboot.xyz aware of Bazzite boot files

- Copy the useful files:
```bash
sudo cp /ISO/bazzite/images/{initrd, vmlinuz} /you/netboot/config/path/
```
- In the bazzite web interface, create a `bazzite.ipxe` script:
```
#!ipxe

goto ${menu}

:bazzite
menu test
set os Bazzite
set live_endpoint http://your.netboot.host.ip:8080
set nfs_endpoint your.nfs.server.ip
imgfree
kernel ${live_endpoint}/ISO/bazzite/images/pxeboot/vmlinuz inst.repo=nfs:${nfs_endpoint}:/export/netboot-iso quiet
initrd ${live_endpoint}/ISO/bazzite/images/pxeboot/initrd.img
boot
```
- Save the file
- Still in the netboot.xyz web interface, edit the `linux.ipxe` script, and add a line under `menu Linux Isntallers - Current Arch [ ${arch} ]`
``` 
item bazzite ${space} Bazzite
```
- Save the file

## Boot your server

- And choose `Bazzite` in GNU/Linux install


