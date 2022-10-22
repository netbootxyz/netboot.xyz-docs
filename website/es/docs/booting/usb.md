---
id: USB
title: Arrancando desde USB
sidebar_label: Arrancando desde USB
description: "Cómo crear una memoria USB capaz de arrancar en netboot.xyz"
hide_table_of_contents: verdadero
---

:::peligro
Haga una copia de seguridad de sus datos importantes antes de escribir el USB, ya que sobrescribirá cualquier cosa en la llave USB.
:::

Descargue un disco USB netboot.xyz:

* [netboot.xyz](https://boot.netboot.xyz/ipxe/netboot.xyz.img)

## Creación de una llave USB en Linux

Inserte una llave USB en su computadora y busque el nombre del dispositivo. Luego use el siguiente comando:

```shell
gato netboot.xyz.img > /dev/sdX
```

o

```shell
dd if=netboot.xyz.img de=/dev/sdX
```

donde sdX es tu unidad usb.

La llave USB debería estar lista para ser expulsada una vez que haya terminado.

## Creación de una llave USB en MacOS

__Correr:__

```shell
lista de utilidades de disco
```

para obtener la lista actual de dispositivos

___Inserte el medio flash.___

__Correr:__

```shell
lista de utilidades de disco
```

nuevamente y determine el nodo del dispositivo asignado a su medio flash (por ejemplo, /dev/disk2).

__Correr:__

```shell
diskutil unmountDisk /dev/diskN
```

(reemplace N con el número de disco del último comando; en el ejemplo anterior, N sería 2).

__Ejecutar:__

```shell
sudo dd if=netboot.xyz.img of=/dev/rdiskN bs=1m
```

* Usar /dev/rdisk en lugar de /dev/disk puede ser más rápido
* Si ve el error dd: número no válido '1m', está utilizando GNU dd. Use el mismo comando pero reemplace bs=1m con bs=1M
* Si ve el error dd: /dev/diskN: Recurso ocupado, asegúrese de que el disco no esté en uso. Inicie 'Disk Utility.app' y desmonte (no expulse) la unidad

__Correr:__

```shell
diskutil expulsar /dev/diskN
```

y elimine su medio flash cuando se complete el comando.

## Creación de una llave USB en Windows

Consulte [Rufus](https://rufus.akeo.ie/) para instalar el archivo IMG en una llave USB.

## Arrancando

Una vez que haya creado su clave, reinicie y configure su BIOS para cargar la clave USB primero si aún no está configurada para eso. Debería ver que iPXE se carga, ya sea que cargue netboot.xyz automáticamente o se le pedirá que configure su información de red.
