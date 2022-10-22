---
id: tftp
title: Arrancar desde TFTP
sidebar_label: Arrancar desde TFTP
description: "Métodos de arranque en netboot.xyz usando TFTP y DHCP"
hide_table_of_contents: verdadero
---

Si desea utilizar netboot.xyz desde la red de su hogar u oficina, es relativamente fácil de configurar.  Permitirá que todos sus dispositivos en su red tengan netboot.xyz disponible siempre que lo necesite simplemente cambiando el orden de inicio en su dispositivo, seleccionando inicio de red o seleccionando manualmente el dispositivo para iniciar.

### Configuración del servidor DHCP

Tendrá que decirle a su servidor DHCP que proporcione un "próximo servidor", la dirección de un servidor TFTP en su red y un "nombre de archivo", el archivo de arranque [netboot.xyz](https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe).  Cuando sus clientes arranquen, si están configurados para arrancar en red, obtendrán automáticamente una dirección DHCP válida, desplegarán el cargador de arranque netboot.xyz iPXE y cargarán el menú Sistema operativo.

Ejemplo:

    próximo servidor "1.2.3.4"
    nombre de archivo "netboot.xyz.kpxe"

Si está utilizando [dnsmasq como su servidor DHCP](https://wiki.archlinux.org/index.php/dnsmasq#DHCP_server) , así como su servidor TFTP, configurar la opción del siguiente servidor es tan simple como agregar la siguiente línea a `/etc/dnsmasq.conf`: 

    opción-dhcp=66,0.0.0.0

`0.0.0.0` se analiza como la dirección de la máquina que ejecuta dnsmasq.

### Configuración del servidor TFTP

Deberá configurar un servidor tftp para alojar los archivos iPXE.  Existen varios tipos de servidores TFTP y, por lo general, todos funcionan bastante bien.  También puede usar dnsmasq para alojar los archivos.

Si usa dnsmasq, puede agregar esta configuración a `/etc/dnsmasq.conf`:

    enable-tftp
    tftp-root=/var/lib/tftp
    dhcp-boot=netboot.xyz.kpxe

### Arreglando el servicio dnsmasq

Si está ejecutando systemd y puede iniciar dnsmasq correctamente de forma manual pero no se inicia en el arranque, es posible que deba editar la sección [Unit] de `/lib/systemd/system/dnsmasq.service` cambiando:

    After=red.objetivo

a

    After=red-online.objetivo

### Archivos de arranque regulares y undionly

Si tiene problemas con el cargador de arranque regular [netboot.xyz.kpxe](https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe) , puede probar y usar el cargador de arranque [netboot.xyz-undionly.kpxe](https://boot.netboot.xyz/ipxe/netboot.xyz-undionly.kpxe).  El cargador de arranque regular incluye controladores de NIC comunes en la imagen iPXE, mientras que el cargador undionly aprovechará el firmware de arranque de la NIC.
