---
id: enrutador de borde
title: "Enrutador Ubiquiti Edge"
description: Uso del enrutador Edge de Ubiquiti
hide_table_of_contents: verdadero
---

Este documento cubre cómo configurar netboot.xyz, un servicio que proporciona instalación basada en iPXE y arranque en vivo de varios sistemas operativos, en un Ubiquiti EdgeRouter.

Gracias a [Sam Kottler](https://github.com/skottler) por escribir originalmente este tutorial. Mejore la solidez de la configuración mediante el uso del demonio TFTP integrado de dnsmasq de [Yan Grunenberger](https://github.com/ravens) en lugar del paquete TFTP externo.

### suposiciones

He hecho algunas suposiciones a lo largo de este documento que probablemente serán diferentes para su configuración:

* Hay un grupo DHCP llamado `LAN`
* El grupo `LAN` administra `10.10.2.0/24`

### Configurar soporte tftp en dnsmasq

De forma predeterminada, dnsmasq se usa en Edgerouter para proporcionar servicios de DNS. Para habilitarlo:

```bash
sudo mkdir /config/user-data/tftproot
sudo chmod ugo+rX /config/user-data/tftproot

configure

establezca las opciones de reenvío de DNS del servicio enable-tftp
establezca las opciones de reenvío de DNS del servicio tftp-root=/config/user- datos/tftroot

confirmar
guardar
```

### Configurar componentes TFTP

Descargue la imagen kpxe para netboot.xyz y establezca los permisos correctamente:

```bash
sudo curl -o /config/user-data/tftproot/netboot.xyz.kpxe https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe
sudo chmod ugo+r /config/user-data/tftproot/ netboot.xyz.kpxe
```

En este punto, debería poder usar un cliente TFTP de un cliente en `10.10.2.0/24` para obtener la imagen:

```bash
$ tftp 10.10.2.1
tftp> obtener netboot.xyz.kpxe
Recibió 354972 bytes en 2,0 segundos
```

### Configurar dhcpd

Vamos a configurar DHCP en EdgeRouter para servir los parámetros correctos a clientes:

```bash
configure

set service dhcp-server global-parameters "option client-arch code 93 = entero sin firmar 16;"
editar servicio dhcp-server shared-network-name LAN subnet 10.10.2.0/24
configurar bootfile-server 10.10.2.1
configurar bootfile-name netboot.xyz.kpxe

confirmar
guardar
```

La configuración para el grupo `LAN` ahora debería tener un aspecto similar al siguiente:

```bash
skottler@edge1# show service dhcp-server shared-network-name LAN
 autorización autorizada
 subred 10.10.2.0/24 {
     bootfile-name netboot.xyz.kpxe
     bootfile-server 10.10.2.1
     default-router 10.10.2.1
     servidor dns 10.10.2.1
     arrendamiento 86400
     inicio 10.10.2.100 {
         stop 10.10.2.199
     }
 }
[edit]
```

¡Eso es todo!

## La configuración avanzada con soporte para Legacy y UEFI

### Uso de ISC DHCP

Esta sección fue escrita por [Skyler Mäntysaari](https://github.com/samip5).

Esto requiere que no use `set service dhcp-server use-dnsmasq enable`. Si lo usas, no funcionará.

Vamos a comenzar eliminando las cosas relacionadas con el arranque PXE de las opciones del servidor dhcp, por lo que los comandos para eso son algo como:

```bash
eliminar servicio dhcp-server shared-network-name LAN subred 10.10.2.0/24 bootfile-name netboot.xyz.kpxe
eliminar servicio dhcp-server shared-network-name LAN subred 10.10.2.0/24 bootfile-server 10.10.2.1
```

Ahora vamos a descargar la versión efi del archivo de arranque si aún no existe:
```
sudo curl -o /config/user-data/tftproot/netboot.xyz.efi https://boot.netboot.xyz/ipxe/netboot.xyz.efi
sudo chmod ugo+r /config/user-data/tftproot/ netboot.xyz.efi
```

A continuación, vamos a crear una carpeta de scripts para los scripts, en almacenamiento persistente (debe persistir durante las actualizaciones):

```bash
mkdir --parents /config/user-data/scripts/pxe/
```

A continuación, vamos a entrar en el modo de configuración e incluir el archivo de configuración principal de pxe:

```bash
establezca los parámetros globales del servidor dhcp del servicio "denegar bootp;"
configurar los parámetros globales del servidor dhcp del servicio "incluir &quot;/config/user-data/scripts/pxe/option-space.conf&quot;;"
configurar el servicio dhcp-server shared-network-name LAN subnet 10.10.2.0/24 subnet-parameters "include &quot;/config/user-data/scripts/pxe/pxe.conf&quot;;"
```

DEBE escribirse exactamente así, la parte "".

El archivo /config/user-data/scripts/pxe/pxe.conf:

```bash
permitir el arranque;
próximo servidor 10.10.2.1;

si la opción arch = 00:07 {
    nombre de archivo "netboot.xyz.efi";
} opción elsif arch = 00:00 {
    nombre de archivo "netboot.xyz.kpxe";
} else {
    nombre de archivo "netboot.xyz.efi";
}
```

El archivo /config/user-data/scripts/pxe/option-space.conf:

```bash
# Declare the iPXE/gPXE/Etherboot option space
option space ipxe;
option ipxe-encap-opts code 175 = encapsulate ipxe;

# iPXE options, can be set in DHCP response packet
option ipxe.priority         code   1 = signed integer 8;
option ipxe.keep-san         code   8 = unsigned integer 8;
option ipxe.skip-san-boot    code   9 = unsigned integer 8;
option ipxe.syslogs          code  85 = string;
option ipxe.cert             code  91 = string;
option ipxe.privkey          code  92 = string;
option ipxe.crosscert        code  93 = string;
option ipxe.no-pxedhcp       code 176 = unsigned integer 8;
option ipxe.bus-id           code 177 = string;
option ipxe.bios-drive       code 189 = unsigned integer 8;
option ipxe.username         code 190 = string;
option ipxe.password         code 191 = string;
option ipxe.reverse-username code 192 = string;
option ipxe.reverse-password code 193 = string;
option ipxe.version          code 235 = string;
option iscsi-initiator-iqn   code 203 = string;

# iPXE feature flags, set in DHCP request packet
option ipxe.pxeext    code 16 = unsigned integer 8;
option ipxe.iscsi     code 17 = unsigned integer 8;
option ipxe.aoe       code 18 = unsigned integer 8;
option ipxe.http      code 19 = unsigned integer 8;
option ipxe.https     code 20 = unsigned integer 8;
option ipxe.tftp      code 21 = unsigned integer 8;
option ipxe.ftp       code 22 = unsigned integer 8;
option ipxe.dns       code 23 = unsigned integer 8;
option ipxe.bzimage   code 24 = unsigned integer 8;
option ipxe.multiboot code 25 = unsigned integer 8;
option ipxe.slam      code 26 = unsigned integer 8;
option ipxe.srp       code 27 = unsigned integer 8;
option ipxe.nbi       code 32 = unsigned integer 8;
option ipxe.pxe       code 33 = unsigned integer 8;
option ipxe.elf       code 34 = unsigned integer 8;
option ipxe.comboot   code 35 = unsigned integer 8;
option ipxe.efi       code 36 = unsigned integer 8;
option ipxe.fcoe      code 37 = unsigned integer 8;
option ipxe.vlan      code 38 = unsigned integer 8;
option ipxe.menu      code 39 = unsigned integer 8;
option ipxe.sdi       code 40 = unsigned integer 8;
option ipxe.nfs       code 41 = unsigned integer 8;

# Other useful general options
# http://www.ietf.org/assignments/dhcpv6-parameters/dhcpv6-parameters.txt
option arch code 93 = unsigned integer 16;
```

Después de todo eso, ¡debería ser así! Espero que eso ayude.

### usando dnsmasq

Esta sección fue escrita por [Benjamin Reich](https://benjaminreich.de/).

Esta parte es necesaria si usa `set service dhcp-server use-dnsmasq enable`.

Conéctese a través de SSH y reemplace `SERVERIP` con la IP real.

```bash
configure
establezca el servicio dhcp-server use-dnsmasq enable
establezca las opciones de reenvío de dns del servicio "dhcp-match=set:bios,60,PXEClient:Arch:00000"
establezca las opciones de reenvío de dns del servicio "dhcp-boot=tag:bios,netboot .xyz.kpxe,,SERVERIP"
configurar las opciones de reenvío de dns del servicio "dhcp-match=set:efi32,60,PXEClient:Arch:00002"
configurar las opciones de reenvío de dns del servicio "dhcp-boot=tag:efi32,netboot.xyz. efi,,SERVERIP"
configurar las opciones de reenvío de dns del servicio "dhcp-match=set:efi32-1,60,PXEClient:Arch:00006"
configurar las opciones de reenvío de dns del servicio "dhcp-boot=tag:efi32-1,netboot.xyz .efi,,SERVERIP"
configurar las opciones de reenvío de dns del servicio "dhcp-match=set:efi64,60,PXEClient:Arch:00007"
configurar las opciones de reenvío de dns del servicio "dhcp-boot=tag:efi64,netboot.xyz.efi, ,SERVERIP"
establecer las opciones de reenvío de DNS del servicio "dhcp-match=set:efi64-1,60,PXEClient:Arch:00008"
establecer las opciones de reenvío de DNS del servicio "dhcp-boot=tag:efi64-1,netboot.xyz.efi ,,SERVERIP"
configurar las opciones de reenvío de DNS del servicio "dhcp-match=set:efi64-2,60,PXEClient:Arch:00009"
se t servicio dns opciones de reenvío "dhcp-boot=tag:efi64-2,netboot.xyz.efi,,SERVERIP"
commit; ahorrar
```
