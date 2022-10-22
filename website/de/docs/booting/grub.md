---
id: roden
title: Booten von einer bestehenden Linux-Installation mit GRUB
sidebar_label: Booten von GRUB
description: "So verwenden Sie GRUB zum Booten in netboot.xyz"
hide_table_of_contents: Stimmt
---

Wenn Sie ein vorhandenes Linux-System haben, auf dem Sie iPXE nicht verwenden oder von einem Disk-Image booten können, aber das GRUB-Menü beim Booten sehen können, können Sie mit `grub-imageboot`in netboot.xyz booten.

## Auf Debian/Ubuntu

```shell
# installiere grub-imageboot
apt install grub-imageboot

# downloade netboot.xyz ISO
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso

# Aktualisieren Sie das GRUB-Menü, um diesen Neustart von ISO
update-grub2
einzuschließen
```

Wählen Sie nach dem Neustart im GRUB-Menü "Bootable ISO Image: netboot.xyz".

Wenn das GRUB-Menü zu schnell verschwindet, müssen Sie möglicherweise `/etc/default/grub` bearbeiten und `GRUB_TIMEOUT`erhöhen. Führen Sie jedes Mal `update-grub2` aus, wenn Sie diese Datei ändern.
