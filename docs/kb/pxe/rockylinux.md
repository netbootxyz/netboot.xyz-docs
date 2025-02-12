---
id: rockylinux
title: PXE Booting the Rocky Linux Installer
sidebar_label: Rocky Linux
description: PXE Booting the Rocky Linux Installer using Kickstart
hide_table_of_contents: true
---

## Installer Kernels

Rocky Linux maintains installer kernels that are a lightweight way to load the installer and stream packages over the network as needed. Rocky Linux is a binary compatible clone of RHEL (Red Hat Enterprise Linux) and is already supported by numerous large, financially strong sponsors.

The installer kernels are located at:

| URL | Description |
| --- | ----------- |
| `http://dl.rockylinux.org` | Base URL for Rocky Linux mirrors |
| `pub/rocky/${version}/BaseOS/${arch}/os/images/pxeboot/` | Directory containing the installer kernels |
| `${version}` | Version (e.g., 8, 9, etc) |
| `${arch}` | Architecture (e.g., x86_64, aarch64) |
| `vmlinuz` | Kernel filename |
| `initrd.img` | Initrd filename |

In order to load them, you'll need to use a boot snippet in iPXE similar to:

```bash
set install_params inst.ks=http://my.kickstart.com/ks.cfg inst.repo=http://dl.rockylinux.org/pub/rocky/${version}/BaseOS/${arch}/os
set mirror http://dl.rockylinux.org
set base_dir pub/rocky
set version 9
set arch x86_64
set dir ${mirror}/${base_dir}/${version}/BaseOS/${arch}/os/images/pxeboot

kernel ${dir}/vmlinuz ${install_params} -- quiet
initrd ${dir}/initrd.img
boot
```

If you want to use a [Kickstart](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/automatically_installing_rhel/automated-installation-workflow_rhel-installer) URL for automation, you can add this to the kernel line:

```bash
set ksurl http://my.kickstart.com/ks.cfg
inst.ks=${ksurl}
```

For more examples, you can view the netboot.xyz configuration for Rocky Linux [here](https://github.com/netbootxyz/netboot.xyz/blob/master/roles/netbootxyz/templates/menu/rockylinux.ipxe.j2).
