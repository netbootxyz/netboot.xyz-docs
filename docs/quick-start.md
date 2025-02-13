---
id: quick-start
sidebar_position: 2
title: Quick Start
description: "Getting started with netboot.xyz"
hide_table_of_contents: true
---

[Download](https://netboot.xyz/downloads/) one of the netboot.xyz bootloaders that works best for your situation and start PXE booting your favorite operating system.  The bootloaders are precompiled versions of the latest version of [iPXE](https://github.com/ipxe/ipxe) that will allow you to PXE boot into [https://boot.netboot.xyz](https://boot.netboot.xyz).  If you have DHCP it'll automatically attempt to boot from DHCP.  If you need to set a static IP address, hit the **`m`** key during boot up for the failsafe menu and choose manual network configuration.

You can look at the next section entitled [Booting Methods](https://netboot.xyz/docs/category/booting-methods) for instructions on how to set up the downloaded bootloader.

If you already have iPXE up and running on the network, you can hit load the netboot.xyz kernel by typing the following when loaded in a Legacy Mode BIOS:

```
chain --autofree http://boot.netboot.xyz/ipxe/netboot.xyz.lkrn
```

or when in EFI mode BIOS:

```
chain --autofree http://boot.netboot.xyz/ipxe/netboot.xyz.efi
```

This will load the appropriate netboot.xyz kernel with all of the proper options enabled.

You can also boot into netboot.xyz using a local UEFI executable. This method involves placing the UEFI executable on the EFI system partition and configuring the UEFI boot manager to boot from it. For more details, refer to the [Booting from a Local UEFI Executable](https://netboot.xyz/docs/booting/uefi) guide.

:::info

If your version of iPXE has HTTPS support compiled in, you can retrieve those images over HTTPS. By default the upstream iPXE project does not compile in HTTPS support.

:::

### System Requirements

- i686, x86_64, or aarch64 Processor
- Bare Metal or Virtual Machine
- A hard wired ethernet connection (WiFi networking is not supported)
- At least 4GB of RAM is recommended 

:::info

Memory requirements vary depending on the distribution. Live CD Images typically require a lot more memory as the ramdisk is needed to be loaded into memory. Live CD Images loaded over the network may need more than 4GB. If you experience issues where it fails to load during the initrd process, try giving the hardware or virtual machine more RAM. You will typically see errors like `out of space` or `failure to write to destination` in the initrd once the kernel has loaded if you don't have enough RAM.

:::

### Source Code

The source code for netboot.xyz is located on [Github](https://github.com/netbootxyz/netboot.xyz). If you enjoy the project, make sure to give it a star!

### Contributing

Is there a new version of an operating system out?  Have you found one that network boots well with iPXE?  Pull requests are welcomed and encouraged and helps out the project!  Feel free to issue a pull request for new versions or tools that you might find useful.  Once merged into master, [Github Actions](https://github.com/netbootxyz/netboot.xyz/actions) will regenerate new versions of [iPXE from upstream](https://github.com/ipxe/ipxe) and deploy the latest changes to netboot.xyz.  See more on contributing [here](https://netboot.xyz/docs/contributing).

### Testing New Features

Under the **Utilities** menu on netboot.xyz, there's an option for ["netboot.xyz endpoints"](https://github.com/netbootxyz/netboot.xyz/blob/development/roles/netbootxyz/templates/menu/nbxyz.ipxe.j2).  Features or changes that have been merged into the development branch can be loaded here to be tested before they are merged into production. 

:::info

Version updates are typically deployed to the development endpoint and the primary rolling endpoint at the same time automatically. Once the development branch stabilizes, a new release is cut from the development branch and merged into master. This provides our stable point releases and releases new changes and capabilities related to menus or new features.

:::

### Communication

Feel free to open up an [issue](https://github.com/netbootxyz/netboot.xyz/issues/new/choose) on Github or join us on our [Discord](https://discord.gg/An6PA2a) server.  Follow us on [Twitter](https://twitter.com/netbootxyz) or like us on [Facebook](https://www.facebook.com/netboot.xyz)!
