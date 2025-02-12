---
id: ubuntu
title: PXE Booting the Ubuntu Installer
sidebar_label: Ubuntu
description: PXE Booting the Ubuntu Installer
hide_table_of_contents: true
---

## Installer Kernels

Ubuntu maintains installer kernels that are a lightweight way to load the Ubuntu installer and then stream packages over the network as needed. The installer kernels are located at:

| URL | Description |
| --- | ----------- |
| `http://archive.ubuntu.com` | Base URL for Ubuntu mirrors |
| `${version}` | Version (e.g., focal, jammy, etc) |
| `${arch}` | Architecture (e.g., amd64, arm64) |
| `ubuntu/dists/${version}/main/installer-${arch}/current/images/netboot/` | Directory containing the installer kernels |
| `linux` | Kernel filename |
| `initrd.gz` | Initrd filename |

In order to load them, you'll need to use a boot snippet in iPXE similar to:

```bash

set mirror http://releases.ubuntu.com
set base_dir ubuntu
set codename jammy
set version_number 22.04
set os_arch amd64
set mirrorcfg mirror/suite=${ubuntu_version}
set dir ${mirror}/${base_dir}/dists/${version}/main/installer-${arch}/current/images/netboot
set ubuntu_iso_url http://releases.ubuntu.com/${codename}/ubuntu-${version_number}-live-server-${os_arch}.iso
set install_params autoinstall ip=dhcp ds=nocloud-net;s=http://my.autoinstall.com/ url=${ubuntu_iso_url}

kernel ${dir}/linux ${install_params} ${mirrorcfg} -- quiet initrd=initrd.gz
initrd ${dir}/initrd.gz
boot
```

If you want to use an [autoinstall](https://canonical-subiquity.readthedocs-hosted.com/en/latest/howto/autoinstall-quickstart.html) URL for automation, you can add this to the kernel line:

```bash
set autoinstall_url http://my.autoinstall.com/
autoinstall ds=nocloud-net;s=${autoinstall_url}
```

For more examples, you can view the netboot.xyz configuration for Ubuntu [here](https://github.com/netbootxyz/netboot.xyz/blob/master/roles/netbootxyz/templates/menu/ubuntu.ipxe.j2).

## Live Boot

Ubuntu also provides a number of Live Boot ISOs that will boot an OS directly into memory and can be used immediately without doing an install or modifying the hard drive. The Live OS will also include the installer as well. These are great for evaluating other desktops that you might want to try out without doing a full install.

| Distribution | Website |
| :--- | :--- |
| Kubuntu | [https://kubuntu.org/](https://kubuntu.org/) |
| Lubuntu | [https://lubuntu.me/](https://lubuntu.me/) |
| Ubuntu Budgie | [https://ubuntubudgie.org/](https://ubuntubudgie.org/) |
| Ubuntu Kylin | [https://www.ubuntukylin.com/](https://www.ubuntukylin.com/) |
| Ubuntu Mate | [https://ubuntu-mate.org/](https://ubuntu-mate.org/) |
| Ubuntu Studio | [https://ubuntustudio.org/](https://ubuntustudio.org/) |
| Xubuntu | [https://xubuntu.org/](https://xubuntu.org/) |
