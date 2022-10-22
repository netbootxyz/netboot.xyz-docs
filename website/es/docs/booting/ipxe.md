---
id: ipxe
title: Arranque usando iPXE
sidebar_label: Arranque usando iPXE
description: "Detalla cómo cargar en cadena en netboot.xyz desde iPXE"
hide_table_of_contents: verdadero
---

### NIC con iPXE integrado

Si ya ha compilado su propio iPXE, puede cargar el menú netboot.xyz fácilmente ingresando CTRL-B cuando se le solicite, configurando DHCP y luego cargando iPXE en cadena:

    cadena dhcp
    --autofree https://boot.netboot.xyz

Si no tiene DHCP en su red, puede configurar manualmente la información de su red:

    establecer net0/ip <ip>
    establecer net0/netmask <netmask>
    establecer net0/gateway <gateway>
    establecer dns <nameserver>
    ifopen net0
    cadena --autofree https://boot.netboot.xyz

Algunas compilaciones de iPXE no admiten conexiones HTTPS. Si recibe el mensaje de error "Operación no admitida", ejecute esto en su lugar:

    cadena --autofree http://boot.netboot.xyz

### KVM

En los VPS que usan KVM, generalmente puede conectarse al VPS a través de VNC, reiniciarlo, presionar escape mientras reinicia para obtener un menú de inicio y luego seleccionar la opción iPXE. Una vez que iPXE haya comenzado, presione Ctrl-B y siga las instrucciones anteriores.
