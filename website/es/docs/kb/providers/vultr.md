---
id: Vult
title: "vultr"
description: "Usando netboot.xyz con Vultr"
hide_table_of_contents: verdadero
---

[Vultr](http://www.vultr.com/?ref=6870843) tiene un gran soporte para usar netboot.xyz desde el primer momento.

:::info
Si aún no se ha registrado para obtener una cuenta de Vultr, utilice nuestro enlace de afiliado [aquí](http://www.vultr.com/?ref=6870843). ¡Nos ayudará a proporcionar recursos de prueba para mejorar este proyecto!
:::

### Arrancar desde ISO

Una vez que haya iniciado sesión en la consola, seleccione ISO.  En el cuadro de URL remotas, ingrese la URL de un ISO y presione cargar:

    https://boot.netboot.xyz/ipxe/netboot.xyz.iso

Regrese a la pantalla principal de la consola y presione "Implementar nueva instancia". Siga estos pasos:

* Seleccione _Custom_ para el sistema operativo
* Selecciona la ISO que subiste
* Haga clic en _Realizar pedido_

La instancia debería estar en línea en unos minutos.  Una vez que esté en línea, vaya a la página de la cuenta principal que enumera todas sus instancias.  Haga clic en _Administrar_ junto a la instancia que acaba de iniciar y luego haga clic en _Ver consola_ debajo de _Acciones del servidor_. Cuando aparezca la consola, debería ver el menú netboot.xyz iPXE.

Cuando haya completado la instalación del sistema operativo, seleccione _Custom ISO_ de la página Server Manager y haga clic en _Remove ISO_.  El ISO se eliminará de su instancia y se reiniciará.

### Arranque desde la URL de la cadena iPXE

El uso de una URL de cadena iPXE puede ser más fácil para algunos usuarios.  Sigue estos pasos:

* Haga clic en _Implementar nueva instancia_
* Seleccione _Custom_ para el sistema operativo
* Seleccione _iPXE_ en la sección ISO virtual
* Establezca la URL de la cadena en `https://boot.netboot.xyz`
* Haga clic en _Realizar pedido_

La instancia se iniciará en unos minutos.  Una vez que arranque, tendrá cinco minutos para iniciar una consola y elegir una opción del menú :

* Regrese a la página de inicio de su cuenta con sus instancias en la lista
* Haga clic en _Administrar_ junto a la instancia que acaba de lanzar
* Haga clic en _Ver consola_ en la sección _Acciones del servidor_
* Elija el sistema operativo que desea implementar en el menú netboot.xyz
* Complete la instalación del sistema operativo

Una vez que haya terminado la instalación, reinicie la instancia como lo normalmente. reiniciará automáticamente su máquina virtual en el sistema operativo que implementó.

### Arranque desde iPXE en un servidor Vultr Bare Metal

En Vultr Bare Metal, puede encontrar las opciones de iPXE en la pestaña iPXE en la sección Tipo de servidor.

* Establezca la URL de la cadena en `https://boot.netboot.xyz`

Asegúrese de usar imágenes heredadas (PCBIOS) porque Bare Metal no es compatible con EFI en este momento. Luego puede cargar la consola y usar el menú desde allí.