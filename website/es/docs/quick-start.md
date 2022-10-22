---
id: Inicio rápido
title: Inicio rápido
description: "Primeros pasos con netboot.xyz"
hide_table_of_contents: verdadero
---

### Empezando

[Descargue](https://netboot.xyz/downloads/) uno de los cargadores de arranque netboot.xyz que mejor se adapte a su situación e inicie el arranque PXE de su sistema operativo favorito.  Los gestores de arranque son versiones precompiladas de la última versión de [iPXE](https://github.com/ipxe/ipxe) que le permitirán arrancar PXE en [https://boot.netboot.xyz](https://boot.netboot.xyz).  Si tiene DHCP, automáticamente intentará arrancar desde DHCP.  Si necesita establecer una dirección IP estática, presione la tecla 'm' durante el arranque para acceder al menú de seguridad y elija la configuración de red manual.

Puede consultar la siguiente sección titulada [Métodos de arranque](https://netboot.xyz/docs/category/booting-methods) para obtener instrucciones sobre cómo configurar el gestor de arranque descargado.

Si ya tiene iPXE en funcionamiento en la red, puede cargar el kernel netboot.xyz escribiendo lo siguiente cuando se carga en un BIOS de modo heredado:

    cadena --autofree http://boot.netboot.xyz/ipxe/netboot.xyz.lkrn

o cuando está en modo EFI BIOS:

    cadena --autofree http://boot.netboot.xyz/ipxe/netboot.xyz.efi

Esto cargará el kernel netboot.xyz apropiado con todas las opciones adecuadas habilitadas.

:::Nota

Si su versión de iPXE tiene soporte HTTPS compilado, puede recuperar esas imágenes a través de HTTPS. De forma predeterminada, el proyecto iPXE ascendente no se compila en soporte HTTPS.

:::

### Requisitos del sistema

- Procesador i686, x86_64 o aarch64
- Se recomiendan 4 GB de RAM. Se pueden usar cantidades más bajas de memoria según el tamaño de la distribución. Algunas distribuciones tienen que cargar un ramdisk en la memoria. Si experimenta problemas cuando se cargan los núcleos, esta es generalmente una de las primeras cosas que debe verificar y ajustar.
- Conexión Ethernet por cable, la compatibilidad con Wi-Fi en iPXE es limitada

### Código fuente

El código fuente de netboot.xyz se encuentra en [Github](https://github.com/netbootxyz/netboot.xyz).

### contribuyendo

¿Nueva versión de un sistema operativo?  ¿Encontró uno que la red arranca bien con iPXE?  ¡Las solicitudes de extracción son bienvenidas y alentadas y ayudan muchísimo!  Siéntase libre de emitir una solicitud de incorporación de nuevas versiones o herramientas que puedan resultarle útiles.  Una vez fusionado con el maestro, [Github Actions](https://github.com/netbootxyz/netboot.xyz/actions) generará nuevas versiones de [iPXE desde upstream](https://github.com/ipxe/ipxe) e implementará los últimos cambios en netboot.xyz.  Ver más sobre contribuir [aquí](https://netboot.xyz/docs/contributing).

### Prueba de nuevas funciones

En el menú **Utilidades** en netboot.xyz, hay una opción para ["puntos finales de netboot.xyz"](https://github.com/netbootxyz/netboot.xyz/blob/development/roles/netbootxyz/templates/menu/nbxyz.ipxe.j2).  Las funciones o los cambios que se han fusionado en la rama de desarrollo se pueden cargar aquí para probarlos antes de que se fusionen en producción.

### Comunicación

Siéntete libre de abrir un número [](https://github.com/netbootxyz/netboot.xyz/issues/new/choose) en Github o únete a nosotros en nuestro servidor [Discord](https://discord.gg/An6PA2a).  ¡Síganos en [Twitter](https://twitter.com/netbootxyz) o denos Me gusta en [Facebook](https://www.facebook.com/netboot.xyz)!
