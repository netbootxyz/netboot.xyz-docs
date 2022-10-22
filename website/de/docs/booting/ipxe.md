---
id: ipxe
title: Booten Sie mit iPXE
sidebar_label: Booten Sie mit iPXE
description: "Details zum Kettenladen in netboot.xyz von iPXE"
hide_table_of_contents: Stimmt
---

### Netzwerkkarte mit eingebettetem iPXE

Wenn Sie bereits Ihr eigenes iPXE kompiliert haben, können Sie das netboot.xyz-Menü einfach laden, indem Sie bei Aufforderung STRG-B eingeben, DHCP einstellen und dann iPXE verketten:

    dhcp
    chain --autofree https://boot.netboot.xyz

Wenn Sie kein DHCP in Ihrem Netzwerk haben, können Sie Ihre Netzwerkinformationen manuell festlegen:

    set net0/ip <ip>
    set net0/netmask <netmask>
    set net0/gateway <gateway>
    set dns <nameserver>
    ifopen net0
    chain --autofree https://boot.netboot.xyz

Einige iPXE-Builds unterstützen keine HTTPS-Verbindungen. Wenn Sie die Fehlermeldung „Vorgang nicht unterstützt“ erhalten, führen Sie stattdessen Folgendes aus:

    chain --autofree http://boot.netboot.xyz

### KVM

Bei VPS, die KVM verwenden, können Sie sich normalerweise über VNC mit dem VPS verbinden, es neu starten, während des Neustarts die Escape-Taste drücken, um ein Startmenü zu erhalten, und dann die iPXE-Option auswählen. Sobald iPXE gestartet ist, drücken Sie Strg-B und folgen Sie den obigen Anweisungen.
