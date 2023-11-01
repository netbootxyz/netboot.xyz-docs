---
id: quick-start
title: Quick Start
description: "Getting started with netboot.xyz"
hide_table_of_contents: true
---

### Getting started

[Download](https://netboot.xyz/downloads/) one of the netboot.xyz bootloaders that works best for your situation and start PXE booting your favorite operating system.  The bootloaders are precompiled versions of the latest version of [iPXE](https://github.com/ipxe/ipxe) that will allow you to PXE boot into [https://boot.netboot.xyz](https://boot.netboot.xyz).  If you have DHCP it'll automatically attempt to boot from DHCP.  If you need to set a static IP address, hit the 'm' key during boot up for the failsafe menu and choose manual network configuration.

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

:::note

If your version of iPXE has HTTPS support compiled in, you can retrieve those images over HTTPS. By default the upstream iPXE project does not compile in HTTPS support.

:::

### System Requirements

- i686, x86_64, or aarch64 Processor
- 4GB of RAM is recommended. Lower amounts of memory can be used depending on how large the distribution is. Some distributions have to load a ramdisk into memory. If you experience issues when kernels are loading, this is generally one of the first things you should check and tune.
- Hard wired ethernet connection, Wifi support in iPXE is limited

### Source Code

The source code for netboot.xyz is located on [Github](https://github.com/netbootxyz/netboot.xyz).

### Contributing

New version of an operating system out?  Found one that network boots well with iPXE?  Pull requests are welcomed and encouraged and helps out a ton!  Feel free to issue a pull request for new versions or tools that you might find useful.  Once merged into master, [Github Actions](https://github.com/netbootxyz/netboot.xyz/actions) will regenerate new versions of [iPXE from upstream](https://github.com/ipxe/ipxe) and deploy the latest changes to netboot.xyz.  See more on contributing [here](https://netboot.xyz/docs/contributing).

### Testing New Features

Under the **Utilities** menu on netboot.xyz, there's an option for ["netboot.xyz endpoints"](https://github.com/netbootxyz/netboot.xyz/blob/development/roles/netbootxyz/templates/menu/nbxyz.ipxe.j2).  Features or changes that have been merged into the development branch can be loaded here to be tested before they are merged into production.

### Communication

Feel free to open up an [issue](https://github.com/netbootxyz/netboot.xyz/issues/new/choose) on Github or join us on our [Discord](https://discord.gg/An6PA2a) server.  Follow us on [Twitter](https://twitter.com/netbootxyz) or like us on [Facebook](https://www.facebook.com/netboot.xyz)!
