---
id: grub
title: Arrancar desde una instalación de Linux existente usando GRUB
sidebar_label: Arrancando desde GRUB
description: "Cómo usar GRUB para arrancar en netboot.xyz"
hide_table_of_contents: verdadero
---

Si tiene un sistema Linux existente en el que no puede usar iPXE o arrancar desde una imagen de disco, pero puede ver el menú de GRUB en el arranque, puede arrancar en netboot.xyz usando `grub-imageboot`.

## En Debian/Ubuntu

```shell
# Instalar grub-imageboot
apt install grub-imageboot

# Descargar netboot.xyz ISO
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso

# Actualice el menú de GRUB para incluir esta actualización de ISO
-reinicio de grub2

```

Después de reiniciar, seleccione "Imagen ISO de arranque: netboot.xyz" en el menú de GRUB.

Si el menú de GRUB desaparece demasiado rápido, es posible que deba editar `/etc/default/grub` y aumentar `GRUB_TIMEOUT`. Ejecute `update-grub2` cada vez que modifique este archivo.
