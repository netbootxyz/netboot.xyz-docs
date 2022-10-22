---
id: vmware
title: Arranque usando VMware
sidebar_label: Arranque usando VMware
description: "Uso de netboot.xyz en VMware para instalar una VM"
hide_table_of_contents: verdadero
---

### Fusión de VMware

Estas instrucciones son para configurar netboot.xyz en una VM en Fusion de VMware para MacOS.

### Crear la máquina virtual

* Agregue una nueva máquina virtual.
* Seleccione "Instalar desde disco o imagen".
* Haga clic en "Usar otro disco o imagen de disco...".
* Descargue y seleccione netboot.xyz [ISO](https://boot.netboot.xyz/ipxe/netboot.xyz.iso).
* En la pantalla Elegir sistema operativo, seleccione el tipo de sistema operativo que planea instalar.  Si planea probar varios tipos de instalaciones, puede elegir un sistema operativo CentOS de 64 bits.
* Haga clic en "Personalizar configuración" y asigne un nombre a la máquina virtual, como "netboot.xyz".

Esto creará su máquina virtual.

### Ejecutando la máquina virtual

_Deberá ajustar la configuración de memoria de la VM para asegurarse de que tendrá suficiente memoria para ejecutar los instaladores del sistema operativo en la memoria.  Por lo general, es bueno aumentar la memoria de 2 GB a 4 GB._

* Haga clic en el icono de llave inglesa y haga clic en Procesadores & Memoria y aumente la memoria hasta la cantidad de memoria deseada.
* Inicie la máquina virtual y debería ver el cargador netboot.xyz.
* Si determina que ya no desea iniciar desde netboot.xyz, puede cambiar el orden de inicio para iniciar desde el disco duro de forma predeterminada o eliminar el ISO de la máquina virtual.
