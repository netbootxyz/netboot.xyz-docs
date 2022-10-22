---
id: equinixmetal
title: Equinix Metal
description: Uso de netboot.xyz con servidores bare metal de Equinix Metal
hide_table_of_contents: verdadero
---

[Equinix Metal](https://metal.equinix.com) es totalmente compatible con netboot.xyz con su sistema operativo Custom iPXE .

### Uso

Seleccione el sistema operativo "Custom iPXE" del portal, o el slug `custom_ipxe` cuando use la API.

### Aprovisionamiento

Coloque la URL de netboot.xyz en el campo de texto que aparece en el portal, o use el parámetro `ipxe_script_url` al crear el dispositivo a través de la API.

    https://boot.netboot.xyz

Presione "Implementar" para aprovisionar su dispositivo. El dispositivo tardará entre 2 y 3 minutos en activarse. Una vez que esté en línea, conéctese al servicio serial-over-SSH (SOS) fuera de banda de Equinix Metal usando el `id` del dispositivo y la instalación donde se implementó el dispositivo, por ejemplo, `ewr1`.

    ssh {server-uuid}@sos.{facility-code}.plataformaquinix.com

La lista actual de instalaciones es [aquí](https://metal.equinix.com/product/locations). Aparecerá el menú netboot.xyz iPXE y podrá completar la instalación desde allí.

:::Nota

De forma predeterminada, los dispositivos están configurados para arrancar desde el disco local. Durante el aprovisionamiento , Equinix Metal establece el siguiente arranque en PXE. Esto sucede una vez, lo que significa que si no instala un sistema operativo antes de reiniciar, no volverá a cargar el menú netboot.xyz. Sin embargo, puede configurar su dispositivo para que arranque siempre en iPXE primero habilitando esa opción en "acciones del servidor" a través del portal del cliente.

:::

### Redes

Los dispositivos que se aprovisionan a través de Custom iPXE podrán usar DHCP durante la vida del dispositivo; sin embargo, Equinix Metal recomienda configurar la red de forma estática. La información de la dirección IP se puede encontrar consultando https://metadata.platformequinix.com/metadata desde el host.

Puede encontrar más información sobre cómo Equinix Metal configura la unión [aquí](https://metal.equinix.com/developers/docs/networking/layer2/).

Los servidores de nombres deben configurarse como:

    servidor de nombres 147.75.207.207
    servidor de nombres 147.75.207.208
