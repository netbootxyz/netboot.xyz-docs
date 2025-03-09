---
id: faq
title: Frequently Asked Questions (FAQ)
sidebar_position: 7
sidebar_label: FAQ
description: "Frequently Asked Questions about the netboot.xyz project"
hide_table_of_contents: false
---

### What is this?

netboot.xyz is tool that allows you to boot your favorite Operating System's installer or various utilities over the network with minimal overhead and all from a single menu system. It's similar to various tools netbooting tools of the past like boot.kernel.org with a lot more flexibility. The boot loader is very light weight being under 1MB in size which translates into a very quick time to create a USB key.

### How does this work?

netboot.xyz uses an open source tool called iPXE. The bootloader calls to a webserver that hosts that the iPXE source files. The iPXE source files contain menus and logic that understand how the various Linux installers operate. When you select an Operating System, netboot.xyz retrieves the images from the project directory when possible or known and trusted performant mirrors. The location the file is pulled from is always displayed during retrieval. From the very beginning, we have made it a priority to make sure that the source code for the project is open and available for review so that our users can view and understand what is happening.

### What is PXE Booting?

PXE stands for **P**re-Boot e**X**ecution **E**nvironment. PXE booting has been used for years to allow for clients to boot from a server over the network. It gives you an oportunity to automate a system inside the BIOS before it boots off its hard drive which opens up the door for running stateless machines without having to use storage in the system. PXE booting is used in many applications but it's most common use is automating the installation of bare metal or a virtual machine.

### Will my favorite distribution work with netboot.xyz?

Usually you need three things to boot up an OS over the network, the vmlinuz, the initramfs, and the rootfs. Distributions that support an installer kernel hosted on a mirror are typically the easier ones to implement as they are very lightweight. Distributions that only release ISOs are typically a bit more involved to implement as we have to use memdisk to load it up into memory.

From [syslinux - memdisk](https://www.syslinux.org/wiki/index.php/MEMDISK): The majority of Linux based CD images will also fail to work with MEMDISK ISO emulation. Linux distributions require kernel and initrd files to be specified, as soon as these files are loaded the protected mode kernel driver(s) take control and the virtual CD will no longer be accessible. If any other files are required from the CD/DVD they will be missing, resulting in boot error(s). Linux distributions that only require kernel and initrd files function fully via ISO emulation, as no other data needs accessing from the virtual CD/DVD drive once they have been loaded. The boot loader has read all necessary files to memory by using INT 13h, before booting the kernel.

To get around these limitations, especially since memdisk is not supported with UEFI, we have built a CI/CD system that consumes the ISOs from upstream projects and prepares the needed files to boot the operating system remotely as a release. In some cases this may involve a small modification to the init scripts in order to tune the network boot flexibility or handle multiple parts for larger operating systems. Those releases are added to the endpoints.yml in the main netboot.xyz repo and are then available for download.

You can read more about our build system [here](https://github.com/netbootxyz/build-pipelines/blob/master/README.md).

### My distribution uses ISOs for delivery, how can I see if they work?

You can do a quick check by loading up netboot.xyz in a virtual environment baremetal. Make sure you have plenty of RAM as you are loading the ISO into RAM. Then select the iPXE command line and enter the following;

```
kernel https://boot.netboot.xyz/memdisk iso raw
initrd http://url/to/iso
boot
```

That should load the ISO and if you make it all the way into the installer, great, your OS may work. If it fails during initramfs load trying to load the CD device, then it has the issue of not being able to find the ISO in memory.

### Can I create my own configurations?

Yes!  You can fork [netboot.xyz-custom](https://github.com/netbootxyz/netboot.xyz-custom) and create your own menu. You can then set your Github user from the Utility menu and your menu will show up in the main menu. If you don't want to set your user every time, you can custom compile the netboot.xyz iPXE code and include your github_user during the compile. This allows you to create your own menu without the maintenance of everything else.

### Does netboot.xyz support Secure Boot?

iPXE and hence netboot.xyz does not support Secure Boot because its [binaries are not signed by Microsoft](https://ipxe.org/appnote/etoken). You must disable Secure Boot mode in your computers firmware configuration menu before you can boot netboot.xyz.

### How do we keep versions current?

We have a CI/CD system that monitors upstream projects for new releases. When a new release is detected for releases without hosted installer kernels, it will download the ISO, extract it, and then repackage it with the needed iPXE files to make it bootable. It will then push the release to the netboot.xyz endpoints.yml file and then push the changes to the netboot.xyz repo. The endpoints.yml file is then used by the netboot.xyz iPXE code to display the menu options. Versions change a lot, so automation is key in making the maintenance of the project sustainable.

### What Operating Systems are currently available on netboot.xyz?

#### Operating Systems

| Name       | URL             | Installer Kernel | Live OS       |
|------------|-----------------|------------------|---------------|
| AlmaLinux | https://almalinux.org/ | Yes | No |
| Alpine Linux | https://alpinelinux.org | Yes | No |
| Arch Linux | https://www.archlinux.org | Yes | No |
| Backbox | https://www.backbox.org | No | Yes |
| BlackArch Linux | https://blackarch.org | Yes | Yes |
| Bluestar Linux | https://sourceforge.net/projects/bluestarlinux | No | Yes |
| Bodhi Linux | https://www.bodhilinux.com | No | Yes |
| CentOS | https://centos.org | Yes | No |
| Fedora CoreOS | https://getfedora.org/en/coreos?stream=stable | Yes | No |
| Debian | https://debian.org | Yes | Yes|
| Deepin | https://www.deepin.org | No | Yes |
| Devuan | https://devuan.org | Yes | No |
| Elementary OS | https://elementary.io | No | Yes |
| EndeavourOS | https://endeavouros.com | No | Yes |
| Fatdog64 | https://distro.ibiblio.org/fatdog/web/ | No | Yes |
| Fedora | https://fedoraproject.org | Yes | Yes |
| Feren OS | https://ferenos.weebly.com/ | Yes | No |
| Flatcar Container Linux | https://www.flatcar.org | Yes | No |
| FreeBSD | https://freebsd.org | Yes, disk image | No |
| FreeDOS | https://www.freedos.org | ISO - Memdisk| No |
| Garuda Linux | https://garudalinux.org/ | No | Yes |
| Gentoo | https://gentoo.org | Yes | Yes |
| Harvester | https://harvesterhci.io | Yes | No |
| hrmpf | https://github.com/leahneukirchen/hrmpf/ | No | Yes |
| IPFire | https://www.ipfire.org | Yes | No |
| K3OS | https://k3os.io/ | Yes | Yes |
| Kairos | https://kairos.io/ | Yes | No |
| Kali Linux | https://www.kali.org | Yes | Yes |
| KDE Neon | https://neon.kde.org | No | Yes |
| Kodachi | https://www.digi77.com/linux-kodachi/ | No | Yes |
| Linux Lite | https://www.linuxliteos.com | No | Yes |
| LXLE | https://lxle.net/ | No | Yes |
| Mageia | https://www.mageia.org | Yes | No |
| Manjaro | https://manjaro.org | No | Yes |
| Mint | https://linuxmint.com | No | Yes |
| Microsoft Windows | https://www.microsoft.com | User supplied media | No |
| MirOS | http://www.mirbsd.org | Yes | No |
| Nitrux | https://nxos.org/ | No | Yes |
| NixOS | https://nixos.org | Yes | No |
| OpenBSD | https://openbsd.org | Yes | No |
| openEuler | https://openeuler.org | Yes | No |
| openSUSE | https://opensuse.org | Yes | No |
| Oracle Linux | https://www.oracle.com/linux/ | Yes | Installer |
| Parrot Security | https://www.parrotsec.org | No | Yes |
| Peppermint | https://peppermintos.com | No | Yes |
| Pop OS |https://system76.com/pop| No | Yes |
| Proxmox Open Source Products | https://www.proxmox.com/ | Yes | No |
| Q4OS | https://q4os.org | No | Yes |
| Raizo | https://sourceforge.net/projects/live-raizo/ | No | Yes |
| Red Hat Enterprise Linux | https://www.redhat.com | User supplied media | No |
| Regolith | https://regolith-linux.org | No | Yes |
| Rocky Linux | https://rockylinux.org/ | Yes | No |
| Septor | https://septor.sourceforge.io | No | Yes |
| Slackware | https://www.slackware.com | Yes | No |
| SmartOS | https://www.smartos.org/ | Yes | No |
| SparkyLinux | https://sparkylinux.org/ | No | Yes |
| Tails | https://tails.net | No | Yes |
| Talos | https://www.talos.dev/ | Yes | No |
| Tiny Core Linux | https://tinycorelinux.net | Yes | Yes |
| Ubuntu | https://www.ubuntu.com | Yes | Yes |
| VMware | https://www.vmware.com | User supplied media | No |
| VMware Photon | https://vmware.github.io/photon/ | Yes | No |
| Vanilla OS | https://vanillaos.org | No | Yes |
| Voyager | https://voyagerlive.org | No | Yes |
| VyOS | https://vyos.io | Yes | No |
| Zen Installer | https://sourceforge.net/projects/revenge-installer | Yes | No |
| Zorin OS | https://zorin.com | No | Yes |

### Utilities

| Name       | URL                     | Type |
|------------|-------------------------|------|
| 4MLinux | https://4mlinux.com/ | Kernel/Initrd |
| Boot Repair CD | https://sourceforge.net/projects/boot-repair-cd/ | LiveCD |
| Breakin | https://www.advancedclustering.com/products/software/breakin/ | Kernel/Initrd |
| CAINE | https://www.caine-live.net/ | LiveCD |
| Clonezilla | https://www.clonezilla.org/ | LiveCD |
| DBAN | https://www.dban.org/ | Kernel |
| GParted | https://gparted.org | LiveCD |
| Grml | https://grml.org | LiveCD |
| Kaspersky Rescue Disk | https://support.kaspersky.com/krd18 | LiveCD |
| Memtest | https://www.memtest.org/ | Kernel |
| MemTest86 Free | https://www.memtest86.com | USB Img |
| Redo Rescue | http://redorescue.com/ | LiveCD |
| Rescatux | https://www.supergrubdisk.org/rescatux/ | LiveCD |
| Rescuezilla | https://rescuezilla.com/ | LiveCD |
| ShredOS | https://github.com/PartialVolume/shredos.x86_64 | Kernel | 
| Super Grub2 Disk | https://www.supergrubdisk.org | ISO - Memdisk |
| System Rescue | https://system-rescue.org/ | LiveCD |
| Ultimate Boot CD | https://www.ultimatebootcd.com | ISO - Memdisk |
| ZFSBootMenu | https://docs.zfsbootmenu.org/ | Kernel |

### What are some good resources for learning more about network booting?

* [The iPXE Project](https://ipxe.org/)
* [NetworkBoot.org](https://networkboot.org/)
* [Syslinux Project](https://www.syslinux.org/wiki/index.php?title=The_Syslinux_Project)
