---
id: cubierta de vapor
title: Arranque PXE en Steam Deck
sidebar_label: Cubierta de vapor
description: Arranque PXE en Steam Deck
hide_table_of_contents: verdadero
---

## Visión general

Esta es una guía para el arranque PXE de [Valve Steam Deck](https://store.steampowered.com/steamdeck).

## Requisitos

Para obtener el arranque Steam Deck para PXE, necesitará:

- [USB-C Hub](https://amzn.to/3zveSgu) compatible con Ethernet y USB
- Teclado USB
- Ethernet cableada

Conecte el concentrador, ethernet y enciéndalo a Steam Deck. Lo primero que querrá hacer es configurar el BIOS para permitir el arranque PXE.

## Configuración del BIOS

Para abrir los menús del cargador de arranque de Steam Deck, apague Steam Deck y:

- Mantenga presionado `Volumen +`, mientras presiona el botón de encendido `en` para acceder al Administrador de arranque, la Utilidad de configuración y Arrancar desde el menú Archivo. (`Volumen -` mostrará solo el Administrador de arranque)
- Seleccione Utilidad de configuración para entrar en la configuración.
- Desplácese hacia abajo a la pestaña de inicio a la izquierda y cambie estas configuraciones:
  - Arranque rápido: deshabilitado
  - Arranque silencioso: Deshabilitado
  - Capacidad de arranque PXE: UEFI: IPv4 (puede cambiar a lo que sea apropiado para su red)
  - Añadir opciones de arranque: primero
- Seleccione Salir y Salir guardando los cambios.

## Arranque PXE

Steam Deck ahora se reiniciará y ahora verá la prueba de memoria ya que Quiet Boot ha sido deshabilitado. Si su concentrador está conectado a la red correctamente y tiene DHCP en la red, debería ver:

```shell
>>Iniciar PXE sobre IPv4...
```

En este punto, debería poder iniciar PXE con una imagen UEFI.

Utilizar el:

- [Núcleo UEFI netboot.xyz](https://boot.netboot.xyz/ipxe/netboot.xyz.efi)
- Establezca DHCP [next-server](https://netboot.xyz/docs/booting/tftp) en servidor TFTP y nombre de archivo en la imagen UEFI netboot.xyz en el servidor DHCP

Si se rompe el Steam Deck al probar los sistemas operativos o al manipularlo, puede seguir las Instrucciones de recuperación del Steam Deck [aquí](https://help.steampowered.com/en/faqs/view/1B71-EDF2-EB6D-2BB3).

Si desea restablecer el BIOS a la configuración predeterminada, puede cargar la copia de seguridad del BIOS, seleccionar Restaurar valores predeterminados y Salir y guardar los cambios. Eso hará que Steam Deck vuelva a su comportamiento original.