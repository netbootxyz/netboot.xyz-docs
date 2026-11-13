---
id: ionos
title: "IONOS"
description: "Self-installation on IONOS Dedicated Bare Metal Servers with Cloud Panel, Serial-over-SSH and noVNC."
hide_table_of_contents: true
---

Bare Metal Servers at [IONOS](https://www.ionos.de/server/bare-metal-server) can [utilize the self-installation](https://www.ionos.com/help/server-cloud-infrastructure/server-administration-dedicated-servers/dedicated-servers-and-bare-metal-servers-installing-an-operating-system-via-netbootxyz/) when installing through the IONOS Cloud Panel.

The tailored self-install menus can be accessed simultaneously using SSH or VNC. The [Serial Console](https://www.ionos.com/help/server-cloud-infrastructure/first-steps-dedicated-servers/using-the-serial-console-for-server-access-dedicated-server/) over SSH is for text-based installation. A graphical install over VNC is helpful when customizing raid, filesystems and security policy. Both can be used at the same time and should be available after install.

To support a persistent grub serial console after install we default select to apply a fix. Kernel parameters are passed to the installer when enabled. A kickstart post-install script may be applied. After the installation the first boot will already support both Serial and VNC. The fix will ensure grub continues to persist the kernel parameters after OS kernel upgrades. All iPXE source code modifications and OS post-install scripts are made public. See Boot process section below.

The languages and regions options provide a quick way for booting installers with a preferred choice here as well.  

---

### Provisioning via Cloud Panel

1. **Deployment Mode**: Create a new dedicated server or select an existing one.
2. **Select Location**: Choose your data center location.
3. **Trigger Installation**: Start the installation process.
4. **Continue the installation**: The best part of GNU/Linux.

---

### Boot Process

IONOS bare metal servers boot directly into iPXE over the network.

1. **Network Boot**: The bare metal server uses your primary IP to contact the public mirror to chain both the tailored menus and the netboot.xyz OS menus from the mirror as well. 
2. **Welcome Screen**: A tailored initial iPXE screen is loaded. This early menu will remain in a screen refresh loop. The control refresh sequence characters ensure the Serial-over-LAN terminal sessions are rendered nicely without side effects. A countdown timer indicates the next screen refresh. Use the arrow keys to navigate to the installer menus.
3. **Geo-Mirror**: Upon pressing `<Enter>` to proceed into the installer menus you will observe iPXE chainload from the nearest high-speed [IONOS regional mirror](https://tropo.mirror.ionos.com/). If your OS is backed by the mirror you may see iPXE netboot from this mirror and again utilize it for packages and updates.
4. **Patches**: Modifications are maintained publicly in the [IONOS netboot.xyz-custom GitHub repository](https://github.com/ionos-cloud/netboot.xyz-custom).
