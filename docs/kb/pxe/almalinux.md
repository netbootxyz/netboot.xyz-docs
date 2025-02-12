---
id: almalinux
title: PXE Booting the AlmaLinux Installer
sidebar_label: AlmaLinux
description: PXE Booting the AlmaLinux Installer using Kickstart
hide_table_of_contents: true
---

## Installer Kernels

AlmaLinux maintains installer kernels that are a lightweight way to load the installer and then stream packages over the network as needed. The installer kernels are located at:

| URL | Description |
| --- | ----------- |
| `http://repo.almalinux.org`| Base URL for AlmaLinux mirrors |
| `almalinux/${version}/BaseOS/${arch}/os/images/pxeboot/` | Directory containing the installer kernels |
| `${version}` | Version (e.g., 8, 9, etc) |
| `${arch}` | Architecture (e.g., x86_64, aarch64) |
| `vmlinuz` | Kernel filename |
| `initrd.img` | Initrd filename |

In order to load them, you'll need to use a boot snippet in iPXE similar to:

```bash
set install_params inst.ks=http://my.kickstart.com/ks.cfg inst.repo=http://repo.almalinux.org/almalinux/$version/BaseOS/$arch/os/
set mirror http://repo.almalinux.org
set base_dir almalinux
set version 8
set arch x86_64
set dir ${mirror}/${base_dir}/${version}/BaseOS/${arch}/os/images/pxeboot

kernel ${dir}/vmlinuz ${install_params} -- quiet
initrd ${dir}/initrd.img
boot
```

If you want to use a [Kickstart](https://wiki.almalinux.org/documentation/kickstart.html) URL for automation, you can add this to the kernel line:

```bash
set ksurl http://my.kickstart.com/ks.cfg
inst.ks=${ksurl}
```

For more examples, you can view the netboot.xyz configuration for AlmaLinux [here](https://github.com/netbootxyz/netboot.xyz/blob/master/roles/netbootxyz/templates/menu/almalinux.ipxe.j2).
