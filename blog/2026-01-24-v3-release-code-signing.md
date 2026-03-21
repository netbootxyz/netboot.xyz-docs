---
slug: 2026/01/24/v3-release-code-signing
title: netboot.xyz v3.0.0 Released - Code Signing Certificate Update
description: "netboot.xyz v3.0.0 updates the iPXE embedded code signing certificates. Download the latest bootloaders to avoid the auto-upgrade boot step."
authors:
  - antonym
tags: [release, security, code-signing, bootloader, netboot.xyz]
---

We're pleased to announce **netboot.xyz v3.0.0**, which updates the embedded code signing certificates used for cryptographic verification in iPXE bootloaders.

<!-- truncate -->

## What's New

This release updates the embedded certificates that iPXE uses to verify the authenticity of boot files. When you boot with 2.x bootloaders, the system will detect that v3.0.0 is available and pull the latest bootloader. However, **we recommend downloading the latest bootloader files** to avoid the extra boot steps required for the automatic upgrade process.

## Why Update?

iPXE bootloaders use embedded certificates to cryptographically verify that downloaded boot files haven't been tampered with and come from a trusted source. These certificates validate file signatures to ensure integrity and authenticity. Learn more about [iPXE's cryptographic verification](https://ipxe.org/crypto).

The updated certificates in v3.0.0 ensure continued security as we maintain the project's signing infrastructure.

## Recommended Action

**Download the latest bootloader files** to avoid extra steps during boot:

- **Latest Release**: [netboot.xyz v3.0.0](https://github.com/netbootxyz/netboot.xyz/releases/tag/3.0.0)
- **Direct Downloads**: [netboot.xyz](https://netboot.xyz)

While 2.x bootloaders will automatically upgrade on first boot, updating manually provides a cleaner boot experience.

## More Information

- [Release Commit](https://github.com/netbootxyz/netboot.xyz/commit/acc8de40452c54b051ce896d4f30a79bce044506)
- [Documentation](https://netboot.xyz)
- [GitHub Issues](https://github.com/netbootxyz/netboot.xyz/issues)
- [Discord Community](https://discord.gg/An6PA2a)

Thank you for using netboot.xyz!
