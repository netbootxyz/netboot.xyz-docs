---
id: secureboot
title: UEFI Secure Boot
sidebar_label: Secure Boot
description: "Overview of UEFI Secure Boot support in netboot.xyz and how to use the pre-built Secure Boot images"
hide_table_of_contents: false
---

## Overview

UEFI Secure Boot is a firmware security feature that restricts the boot process to code signed by trusted keys. Most modern UEFI systems ship with Secure Boot enabled by default. netboot.xyz provides pre-built Secure Boot compatible images so you can network-boot without disabling Secure Boot in your firmware settings.

:::note
Secure Boot support in netboot.xyz is still limited. Not all distributions and boot methods work when Secure Boot is active. Only Debian-family distributions (Debian, Devuan, Kali) that publish a `debian-installer` netboot tree with a signed shim currently support end-to-end Secure Boot network booting.
:::

## How It Works

Standard iPXE binaries are not signed with a key trusted by the Microsoft UEFI Secure Boot Certificate Authority and will therefore be rejected by firmware with Secure Boot enabled. The iPXE project addresses this through a chain of trust:

1. **Shim** — A small, Microsoft-signed bootloader ([ipxe/shim](https://github.com/ipxe/shim)) that acts as the first stage. The shim is signed with the Microsoft third-party UEFI CA and is trusted by default on most systems. This fork of the general-purpose [rhboot/shim](https://github.com/rhboot/shim) is customized to trust the [iPXE Secure Boot CA](https://ipxe.org/secure-boot-ca).
2. **Signed iPXE** — The shim verifies and launches the iPXE binary (`ipxe.efi`), which is signed with the iPXE Secure Boot CA certificate embedded in the shim.
3. **autoexec.ipxe** — Once iPXE is running, it loads the `autoexec.ipxe` boot script that chainloads the netboot.xyz menus.

The shim uses a naming convention to locate the iPXE binary: it strips `shim` from its own filename to derive the iPXE filename. For example:

| Shim filename        | iPXE filename  |
|----------------------|----------------|
| `ipxe-shimx64.efi`   | `ipxe.efi`     |
| `snponly-shimx64.efi`| `snponly.efi`  |
| `ipxe-shimaa64.efi`  | `ipxe.efi`     |

## Available Secure Boot Images

netboot.xyz builds and publishes Secure Boot images for x86\_64 and ARM64. These are available as release assets at [https://github.com/netbootxyz/netboot.xyz/releases](https://github.com/netbootxyz/netboot.xyz/releases).

### Bootable ISO and USB Images

The easiest way to use Secure Boot with netboot.xyz is via the pre-built ISO or USB images. Each image has the signed shim, the signed iPXE binary, and an embedded `autoexec.ipxe` baked in. The `autoexec.ipxe` contains the initial netboot.xyz boot logic that chainloads the full netboot.xyz menu, so the images work out of the box with no additional configuration.

These images are published as release assets at [https://github.com/netbootxyz/netboot.xyz/releases](https://github.com/netbootxyz/netboot.xyz/releases):

| File | Architecture | Use case |
|---|---|---|
| `netboot.xyz-sb.iso` | x86\_64 | CD/DVD/Virtual Media |
| `netboot.xyz-sb.img` | x86\_64 | USB flash drive |
| `netboot.xyz-sb-arm64.iso` | ARM64 | CD/DVD/Virtual Media |
| `netboot.xyz-sb-arm64.img` | ARM64 | USB flash drive |

Write the `.img` file to a USB drive using a tool like `dd` or [Balena Etcher](https://etcher.balena.io/).

The `autoexec.ipxe` embedded in these images is also published as a standalone file in the release assets (`autoexec.ipxe`), so it can be consumed directly — for example, when using the upstream iPXE Secure Boot binaries for network boot and you want to use the same boot script the ISO/USB images use.

### Network Boot (TFTP/HTTP)

Because the signed iPXE binaries cannot be recompiled, you must use the pre-built binaries directly from [https://github.com/ipxe/ipxe/releases](https://github.com/ipxe/ipxe/releases) or from the netboot.xyz release tarballs:

- `secureboot-x86_64.tar.gz`
- `secureboot-arm64.tar.gz`

Each archive contains the directory structure expected by iPXE's shim loader:

```
secureboot-x86_64/
├── autoexec.ipxe
├── ipxe-shim.efi      ← configure DHCP to serve this
├── ipxe.efi
├── shimx64.efi
├── snponly-shim.efi
└── snponly.efi
```

Configure your DHCP server to hand out the path to the shim binary rather than the iPXE binary directly. For example, with ISC dhcpd:

```
next-server 192.168.0.1;
filename "/netboot.xyz/ipxe-shim.efi";
```

All files from the archive must be present in the same directory on the TFTP/HTTP server, as the shim uses relative paths to locate the corresponding iPXE binary.

#### autoexec.ipxe

After iPXE loads, it automatically looks for a file named `autoexec.ipxe` in the same directory it was loaded from. If found, it executes it. This is the mechanism netboot.xyz uses to load its menus when booting via the Secure Boot image — an `autoexec.ipxe` is embedded in the netboot.xyz release tarballs that chainloads the netboot.xyz menu.

If you are using the upstream iPXE binaries directly from [https://github.com/ipxe/ipxe/releases](https://github.com/ipxe/ipxe/releases), you can place your own `autoexec.ipxe` alongside the shim and iPXE binaries to control what happens after boot. For example, to load the netboot.xyz menu:

```ipxe
#!ipxe
chain --autofree https://boot.netboot.xyz
```

## Booting Linux Distributions with Secure Boot

When Secure Boot is active, loading a Linux kernel directly from iPXE will fail signature verification. Distributions that ship a signed UEFI shim (e.g. Debian) can be booted by using the iPXE `shim` command, which invokes the distribution's own shim to satisfy Secure Boot policy.

Example iPXE script for Debian:

```ipxe
#!ipxe

set mirror https://mirrors.edge.kernel.org/debian
set installer ${mirror}/dists/bookworm/main/installer-amd64/current/images/netboot/debian-installer/amd64

kernel ${installer}/linux
initrd ${installer}/initrd.gz
shim ${installer}/bootnetx64.efi
boot
```

The `shim` command is a no-op when Secure Boot is not active, so it is safe to leave in scripts regardless of the boot environment.

:::info
The `imgverify` command is not available in the upstream iPXE Secure Boot images, as it requires features that cannot be included in a Secure Boot-signed build. netboot.xyz detects when it is running via a Secure Boot image by checking `${efi/SecureBoot}` and automatically disables signature checking (`sigs_enabled`) at runtime to prevent errors when chaining menus.
:::

## Supported Distributions

End-to-end Secure Boot network booting support within netboot.xyz menus is limited to distributions that publish a `bootnetx64.efi` / `bootnetaa64.efi` shim binary as part of their netboot installer tree. Currently, only the three Debian-family distributions that ship a `debian-installer` netboot tree meet this requirement:

| Distribution | x86\_64 shim | ARM64 shim | Notes |
|---|---|---|---|
| Debian | `bootnetx64.efi` | `bootnetaa64.efi` | Supported |
| Devuan | `bootnetx64.efi` | `bootnetaa64.efi` | Supported (Debian-identical path structure) |
| Kali Linux | `bootnetx64.efi` | `bootnetaa64.efi` | Supported (Debian-derived path structure) |

Distributions that do **not** currently support Secure Boot network boot from netboot.xyz:

| Distribution | Reason |
|---|---|
| Fedora | `images/pxeboot/` only provides `vmlinuz` + `initrd.img`; `EFI/BOOT/BOOTX64.EFI` is the ISO bootloader, not a PXE-capable shim |
| AlmaLinux / Rocky / CentOS / RHEL / openEuler | Same as Fedora — RHEL family pxeboot path has no shim EFI binary |
| openSUSE | `boot/x86_64/loader/` provides `linux` + `initrd` only; no shim binary in the netboot tree |
| Ubuntu | Legacy d-i path has no `bootnetx64.efi`; Subiquity path uses netboot.xyz's own live endpoint |
| Mageia, Alpine, Arch, Slackware, others | No shim EFI netboot binaries available |

Support for additional distributions depends on whether they provide a signed shim binary alongside their netboot kernel and initrd.

If you know of a distribution that publishes a signed shim EFI binary as part of its netboot installer tree, please [open an issue](https://github.com/netbootxyz/netboot.xyz/issues) with the mirror path and we will look at adding support.

## Known Limitations

The Secure Boot images distributed by netboot.xyz are pre-built and signed by the iPXE project. Because any modification to the binary — including recompiling with different options — would invalidate the signature and break the chain of trust, these images are locked and cannot be customized. This has several practical consequences:

- **`imgverify` is unavailable** — The upstream signed iPXE build omits the `imgverify` command. This means netboot.xyz's built-in menu signature verification is disabled automatically when booting via a Secure Boot image (netboot.xyz detects this via `${efi/SecureBoot}` and sets `sigs_enabled` to false at runtime).
- **Theming is unavailable** — netboot.xyz's custom theme and branding rely on iPXE features that are not present in the signed build. The Secure Boot image will display a plain iPXE interface rather than the styled netboot.xyz menus.
- **Other netboot.xyz features may not work** — Any feature that depends on a custom-compiled iPXE binary (additional protocol support, specific drivers, etc.) will not be available when booting via the Secure Boot image.
- **No custom iPXE builds** — You cannot compile your own iPXE binary with additional features and have it trusted by the Secure Boot shim. The shim is built to trust only binaries signed by the iPXE Secure Boot CA, and only the iPXE project can produce those signatures. Use the pre-built binaries as-is and control boot behaviour via `autoexec.ipxe` instead.
- **Spurious `Security Policy Violation` on kernel load** — There is a known upstream iPXE behavior where loading the kernel via the `kernel` command will briefly display a `Verification failed: Security Policy Violation` error on screen, even when the `shim` command is used and the boot ultimately succeeds. This is cosmetic — iPXE attempts to verify the kernel directly first, which fails under Secure Boot, and then the `shim` command hands off to the distribution's own shim which succeeds. The boot proceeds normally. This is [being tracked upstream](https://github.com/ipxe/ipxe/issues/1653).

## Further Reading

- [iPXE Secure Boot documentation](https://ipxe.org/secboot)
- [ipxe/shim on GitHub](https://github.com/ipxe/shim)
- [iPXE releases](https://github.com/ipxe/ipxe/releases)
