---
id: ver
title: Démarrage à partir d'une installation Linux existante à l'aide de GRUB
sidebar_label: Démarrage à partir de GRUB
description: "Comment utiliser GRUB pour démarrer dans netboot.xyz"
hide_table_of_contents: vrai
---

Si vous avez un système Linux existant où vous ne pouvez pas utiliser iPXE ou démarrer à partir d'une image disque, mais que vous pouvez voir le menu GRUB au démarrage, vous pouvez démarrer dans netboot.xyz en utilisant `grub-imageboot`.

## Sur Debian/Ubuntu

```shell
# Installer grub-imageboot
apt install grub-imageboot

# Télécharger netboot.xyz ISO
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso

# Mettre à jour le menu GRUB pour inclure ce redémarrage ISO
update-grub2

```

Après le redémarrage, sélectionnez "Bootable ISO Image: netboot.xyz" dans le menu GRUB.

Si le menu GRUB disparaît trop rapidement, vous devrez peut-être modifier `/etc/default/grub` et augmenter le `GRUB_TIMEOUT`. Exécutez `update-grub2` chaque fois que vous modifiez ce fichier.
