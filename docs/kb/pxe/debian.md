---
id: debian
title: PXE Booting the Debian Installer
sidebar_label: Debian
description: PXE Booting the Debian Installer
hide_table_of_contents: true
---

## Installer Kernels

Debian maintains installer kernels that are a lightweight way to load the Debian installer and then stream packages over the network as needed. The installer kernels are located at:

| URL | Description |
| --- | ----------- |
| `http://deb.debian.org` | Base URL for Debian mirrors |
| `debian/dists/${version}/main/installer-${arch}/current/images/netboot/` | Directory containing the installer kernels |
| `${version}` | Version (e.g., bullseye, bookworm, etc) |
| `${arch}` | Architecture (e.g., amd64, arm64) |
| `linux` | Kernel filename |
| `initrd.gz` | Initrd filename |

In order to load them, you'll need to use a boot snippet in iPXE similar to:

```bash
set install_params auto=true priority=critical
set mirror http://deb.debian.org
set base_dir debian
set debian_version bookworm
set arch amd64
set mirrorcfg mirror/suite=${debian_version}
set dir ${mirror}/${base_dir}/dists/${version}/main/installer-${arch}/current/images/netboot/debian-installer/amd64/

kernel ${dir}/linux ${install_params} ${mirrorcfg} -- quiet initrd=initrd.gz
initrd ${dir}/initrd.gz
boot
```

If you want to use a [preseed](https://www.debian.org/releases/stable/amd64/apb.en.html) URL for automation, you can add this to the kernel line:

```bash
set preseedurl http://my.preseed.com/preseed.cfg
preseed/url=${preseedurl}
```

For more examples, you can view the netboot.xyz configuration for Debian [here](https://github.com/netbootxyz/netboot.xyz/blob/master/roles/netbootxyz/templates/menu/debian.ipxe.j2).

## Live Boot

Debian also provides a number of Live Boot ISOs that will boot an OS directly into memory and can be used immediately without doing an install or modifying the hard drive. The Live OS will also include the installer as well. These are great for evaluating other desktops that you might want to try out without doing a full install.

| Distribution | Website |
| :--- | :--- |
| Debian Live | [https://www.debian.org/CD/live/](https://www.debian.org/CD/live/) |
