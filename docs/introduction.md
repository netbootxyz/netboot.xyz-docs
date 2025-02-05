---
id: introduction
sidebar_position: 1
title: Introduction
description: netboot.xyz uses iPXE to network boot Operating System installers and utilities from an easy to use menu."
hide_table_of_contents: true
slug: /
---

[netboot.xyz](https://netboot.xyz) lets you [PXE](https://en.wikipedia.org/wiki/Preboot_Execution_Environment) boot various operating system installers or utilities from a single tool over the network. This lets you use one media for many types of operating systems or tools. The [iPXE](https://ipxe.org/) project is used to provide a user friendly menu from within the BIOS that lets you easily choose the operating system you want along with any specific types of versions or bootable flags.

You can remote attach the ISO to servers, set it up as a rescue option in Grub, or even set up your home network to boot to it by default so that it's always available.

![netboot.xyz menu](../static/img/netboot.xyz.gif)

## Menu Overview

### Linux Network Installs Menu

For Operating System projects that provide a network bootable installer, this a lightweight method for installation as it retrieves a minimal set of installer kernels and then installs packages as needed. This is typically the faster method of OS installation as it provides just enough installer to get you running and then downloads only the packages needed. You can also leverage built in tools for doing rescue boots too.

### Live CD/Distro Menu

Many Operating System projects provide their software as an ISO only or provide a Live CD/DVD that you can download and boot into memory without modifying the storage of the machine. Typically you then have the option to do an install from the live system.  These are typically heavier weight installs and can take a lot of bandwidth to install. iPXE generally does not boot the ISOs directly that well.

In order for us to make it easy to consume those types of images, we monitor new version updates from upstream, retrieve the releases, extract them, and re-release them with modifications to the initrd as needed to make them iPXE friendly. We then can load the smaller size kernel directly into memory for a better and more consistent experience.

### Utilities Menu

The Utilities menu provides access to tools and utilities for tools like disk cloning, drive wiping, or other rescue type of tooling. You can also select other netboot.xyz endpoints to test menus that may be in development.

## Supported Architectures

netboot.xyz supports x86 (both 32-bit and 64-bit) as well as arm64 architectures. Both Legacy and UEFI BIOS modes are supported. The menus identify the platform loaded and enable menu options based on the architecture loaded.
