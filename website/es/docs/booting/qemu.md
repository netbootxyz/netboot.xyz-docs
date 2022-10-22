---
id: qemu
title: Arrancando desde QEMU
sidebar_label: Arrancando desde QEMU
description: "Métodos de arranque en netboot.xyz usando QEMU"
hide_table_of_contents: verdadero
---

### Visión general

Una forma rápida de probar netboot.xyz sin modificar su entorno existente es aprovechar QEMU.  Puede iniciar una máquina virtual para evaluar qué es netboot.xyz y cómo funciona.  Necesitará el paquete qemu-system para su sistema operativo apropiado y un administrador de ventanas instalado.  En el siguiente ejemplo, estamos usando Ubuntu 20.04.

### Instalar dependencias

```bash
# instale el paquete qemu-system
sudo apt-get install -y qemu-system ovmf

# descargue la última combinación de Legacy y EFI iso
wget http://boot.netboot.xyz/ipxe/netboot.xyz.iso
```

Si desea escribir en un disco, puede configurar uno en este punto o, opcionalmente, puede arrancar sin un disco si desea probar la unidad netboot.xyz:

### Crear un disco (opcional)

```bash
qemu-img create -f raw vmdisk 8G

# agregue lo siguiente al final de las líneas qemu-system a continuación si desea agregar un disco para escribir:
# -drive file=vmdisk,format=raw
```

### Arranque con PCBIOS heredados

```bash
qemu-sistema-x86_64 -cdrom netboot.xyz.iso -m 4G
```

### Arrancar con un BIOS UEFI

```bash
qemu-system-x86_64 -bios /usr/share/ovmf/OVMF.fd -cdrom netboot.xyz.iso -m 4G
```

:::Nota

Se recomiendan al menos 4 GB de memoria para algunas de las imágenes que se cargan en la RAM.  Si experimenta problemas durante la carga de initrd, la máquina generalmente solo necesita más RAM.

:::
