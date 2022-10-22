---
id: asuswrt-merlín
title: "Asuswrt-Merlín"
description: Uso de Asuswrt-Merlin
hide_table_of_contents: verdadero
---

Esto permitirá que los dispositivos BIOS y UEFI heredados arranquen PXE en el menú [netboot.xyz](https://github.com/netbootxyz/netboot.xyz) en los dispositivos Asuswrt-Merlin.

Suponga que su enrutador AsusWRT-Merlin es 192.168.1.1; Iniciar sesión en la interfaz gráfica de usuario
1. LAN -> Servidor DHCP -> Configuración básica: Establezca "Habilitar el servidor DHCP" en Sí; Dirección inicial del conjunto de direcciones IP: 192.168.1.2; Dirección final del grupo IP: 192.168.1.254
2. Administración -> Sistema -> Servicio: Establezca "Habilitar SSH" en Solo LAN
3. Administración -> Sistema -> Partición JFFS2 persistente: establezca "Habilitar secuencias de comandos y configuraciones personalizadas de JFFS" en Sí

:::Nota

JFFS es una sección grabable de la memoria flash (el tamaño variará entre los modelos de enrutador, y los modelos más nuevos tienen un poco más de 60 MB de espacio disponible), lo que le permitirá almacenar archivos pequeños (como scripts) dentro del enrutador sin necesitando tener un disco USB conectado. Este espacio sobrevivirá al reinicio (**pero es posible que NO sobreviva a la actualización del firmware, ¡así que haga una copia de seguridad antes de actualizar!**).

:::

4. Reinicie el enrutador desde la GUI y espere hasta que pueda hacer ping a 192.168.1.1
5. `ssh nombre de usuario@192.168.1.1`
6. `mkdir /jffs/tftroot`
7. `curl -o /jffs/tftproot/netboot.xyz.kpxe https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe`
8. `curl -o /jffs/tftproot/netboot.xyz.efi https://boot.netboot.xyz/ipxe/netboot.xyz.efi`
9. `toque /jffs/configs/dnsmasq.conf.add`
10. `nano /jffs/configs/dnsmasq.conf.add` y agregue lo siguiente:

> enable-tftp  
> tftp-root=/jffs/tftproot  
> dhcp-match=set:bios,60,PXEClient:Arch:00000  
> dhcp-boot=tag:bios,netboot.xyz.kpxe,,192.168.1.1  
> dhcp-match=set:efi32,60,PXEClient:Arch:00002  
> dhcp-boot=tag:efi32,netboot.xyz.efi,,192.168.1.1  
> dhcp-match=set:efi32-1,60 ,PXEClient:Arco:00006  
> dhcp-boot=etiqueta:efi32-1,netboot.xyz.efi,,192.168.1.1  
> dhcp-match=set:efi64,60,PXEClient:Arco:00007  
> dhcp-boot =etiqueta:efi64,netboot.xyz.efi,,192.168.1.1  
> dhcp-match=set:efi64-1,60,PXEClient:Arch:00008  
> dhcp-boot=etiqueta:efi64-1,netboot.xyz. efi,,192.168.1.1  
> dhcp-match=set:efi64-2,60,PXEClient:Arch:00009  
> dhcp-boot=tag:efi64-2,netboot.xyz.efi,,192.168.1.1

11. `reinicie` y espere hasta que pueda hacer ping a 192.168.1.1
12. desde otro dispositivo, confirme que TFTP está funcionando en el enrutador

> `tftp 192.168.1.1`  
> tftp> `obtener netboot.xyz.kpxe`  
> Recibió 368475 bytes en 0,5 segundos

13. Pruebe con un dispositivo UEFI y con un dispositivo BIOS heredado que el arranque PXE está funcionando (es posible que haya habilitado el arranque PXE en el BIOS y/o en UEFI. Para UEFI, generalmente debe habilitar la pila de redes UEFI).

Referencias:

* https://programmingflow.com/2015/04/08/boot-any-machine-in-your-home-with-pxe.html
* https://netboot.xyz/docs/kb/networking/edgerouter
* https://github.com/RMerl/asuswrt-merlin.ng/wiki/Custom-config-files
