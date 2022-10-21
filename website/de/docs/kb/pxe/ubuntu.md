---
id: ubuntu
title: PXE Booting the Ubuntu Installer
sidebar_label: Ubuntu
description: PXE Booting the Ubuntu Installer
hide_table_of_contents: true
---

## Installer Kernels

Ubuntu maintains installer kernels that are lightweight way to load the Ubuntu installer and then stream packages over the network as needed. The installer kernels are located at:

```bash
# http://archive.ubuntu.com or other ubuntu mirrors
#
# (${version} == xenial, bionic, etc)
# (${arch} == amd64, i386)

# original release directory: 
# ubuntu/dists/${version}/main/installer-${arch}/current/images/netboot/
# 
# updated release directory which contain newer kernels and updates:
# ubuntu/dists/${version}-updates/main/installer-${arch}/current/images/netboot/
#
# kernel filename: linux
# initrd filename: initrd.gz
```

In order to load them, you'll need use a boot snippet in iPXE similar to:

```bash
set install_params auto=true priority=critical
set mirror http://archive.ubuntu.com
set base_dir ubuntu
set ubuntu_version bionic
set arch amd64
set mirrorcfg mirror/suite=${ubuntu_version}
set dir ${mirror}/${base_dir}/dists/${version}/main/installer-${arch}/current/images/netboot

kernel ${dir}/linux ${install_params} ${mirrorcfg} -- quiet initrd=initrd.gz
initrd ${dir}/initrd.gz
boot
```

If you want to use a [preseed](https://help.ubuntu.com/lts/installation-guide/example-preseed.txt) url for automation, you can add this to the kernel line:

```bash
set preseedurl http://my.preseed.com/preseed.cfg
preseed/url=${preseedurl}
```

For more examples you can view the netboot.xyz configuration for Ubuntu [here](https://github.com/netbootxyz/netboot.xyz/blob/master/roles/netbootxyz/templates/menu/ubuntu.ipxe.j2).

## Live Boot

Ubuntu also provides a number of Live Boot ISOs that will boot an OS directly into memory and can be used immediately without doing an install or modifying the hard drive.  The Live OS will also include the installer as well.  These are great for evaluating other desktops that you might want to try out without doing a full install.

| Distribution  | Website                                                      |
|:------------- |:------------------------------------------------------------ |
| Kubuntu       | [https://kubuntu.org/](https://kubuntu.org/)                 |
| Lubuntu       | [https://lubuntu.me/](https://lubuntu.me/)                   |
| Ubuntu Budgie | [https://ubuntubudgie.org/](https://ubuntubudgie.org/)       |
| Ubuntu Kylin  | [https://www.ubuntukylin.com/](https://www.ubuntukylin.com/) |
| Ubuntu Mate   | [https://ubuntu-mate.org/](https://ubuntu-mate.org/)         |
| Ubuntu Studio | [https://ubuntustudio.org/](https://ubuntustudio.org/)       |
| Xubuntu       | [https://xubuntu.org/](https://xubuntu.org/)                 |
