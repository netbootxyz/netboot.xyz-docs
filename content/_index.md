---
title: "netboot.xyz"
weight: 1
date: 2018-04-14T11:30:13-05:00
description: "netboot.xyz uses iPXE to network boot Operating System installers and utilities from an easy to use menu."
---

# netboot.xyz

### What is netboot.xyz?

[netboot.xyz](http://netboot.xyz) is a way to PXE boot various operating system installers or utilities from one place within the BIOS without the need of having to go retrieve the media to run the tool.  [iPXE](http://ipxe.org/) is used to provide a user friendly menu from within the BIOS that lets you easily choose the operating system you want along with any specific types of versions or bootable flags.

You can remote attach the ISO to servers, set it up as a rescue option in Grub, or even set up your home network to boot to it by default so that it's always available.

![netboot.xyz menu](images/netboot.xyz.gif)

### Getting started

[Download](https://netboot.xyz/downloads/) one of the netboot.xyz bootloaders that works for your situation and start PXE booting your favorite operating system.  The bootloaders are precompiled versions of the latest version of [iPXE](https://github.com/ipxe/ipxe) that will allow you to PXE boot into [https://boot.netboot.xyz](https://boot.netboot.xyz).  If you have DHCP it'll automatically attempt to boot from DHCP.  If you need to set a static IP address, hit the 'm' key during boot up for the failsafe menu and choose manual network configuration.

If you already have iPXE up and running on the network, you can hit load the netboot.xyz kernel by typing the following when loaded in a legacy BIOS:

    chain --autofree https://boot.netboot.xyz/ipxe/netboot.xyz.lkrn

or when in EFI mode:
    
    chain --autofree https://boot.netboot.xyz/ipxe/netboot.xyz.efi


This will load the appropriate netboot.xyz kernel with all of the proper options enabled.

### Source Code

The source code for netboot.xyz is located [here](https://github.com/netbootxyz/netboot.xyz).

### Contributing

New version of an operating system out?  Found one that network boots well with iPXE?  Pull requests are welcomed and encouraged and helps out a ton!  Feel free to issue a pull request for new versions or tools that you might find useful.  Once merged into master, [Travis CI](https://travis-ci.org/netbootxyz/netboot.xyz) will regenerate new versions of [iPXE from upstream](https://github.com/ipxe/ipxe) and deploy the latest changes to netboot.xyz.  See more on contributing [here](https://netboot.xyz/contributing).

### Testing New Branches

Under the **Utilities** menu on netboot.xyz, there's an option for ["Test netboot.xyz branch"](https://github.com/netbootxyz/netboot.xyz/blob/master/src/utils.ipxe#L157).  If you've forked the code and have developed a new feature branch, you can use this option to chainload into that branch to test and validate the code.  All you need to do is specify your Github user name and the name of your branch or abbreviated hash of the commit. Also, disable the signature verification for *netboot.xyz* under **Signatures Checks**.

### Communication

Feel free to open up an [issue](https://github.com/netbootxyz/netboot.xyz/issues/new/choose) on Github or join us on our [Discord](https://discord.gg/An6PA2a) server.  Follow us on [Twitter](https://twitter.com/netbootxyz) or like us on [Facebook](https://www.facebook.com/netboot.xyz)!
