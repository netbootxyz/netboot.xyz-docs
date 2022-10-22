---
id: tftp
title: Booten von TFTP
sidebar_label: Booten von TFTP
description: "Methoden zum Booten in netboot.xyz mit TFTP und DHCP"
hide_table_of_contents: Stimmt
---

Wenn Sie netboot.xyz von Ihrem Heim- oder Büronetzwerk aus verwenden möchten, ist die Einrichtung relativ einfach.  Es ermöglicht allen Ihren Geräten in Ihrem Netzwerk, netboot.xyz verfügbar zu haben, wann immer Sie es brauchen, indem Sie einfach die Startreihenfolge auf Ihrem Gerät ändern, Netzwerkstart auswählen oder das zu bootende Gerät manuell auswählen.

### DHCP-Server-Setup

Sie müssen Ihrem DHCP-Server mitteilen, dass er einen "nächsten Server", die Adresse eines TFTP-Servers in Ihrem Netzwerk, und einen "Dateinamen", die Boot-Datei [netboot.xyz](https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe), bereitstellen soll.  Wenn Ihre Clients hochfahren und auf Netzwerkstart eingestellt sind, erhalten sie automatisch eine gültige DHCP-Adresse, ziehen den iPXE-Bootloader netboot.xyz herunter und laden das Betriebssystemmenü.

Beispiel:

    next-server "1.2.3.4"
    Dateiname "netboot.xyz.kpxe"

Wenn Sie [dnsmasq sowohl als DHCP-Server](https://wiki.archlinux.org/index.php/dnsmasq#DHCP_server) als auch als TFTP-Server verwenden, ist das Festlegen der Option next-server so einfach wie das Hinzufügen der folgenden Zeile zu `/etc/dnsmasq.conf`: 

    dhcp-option=66,0.0.0.0

`0.0.0.0` wird als Adresse der Maschine geparst, auf der dnsmasq läuft.

### TFTP-Server-Setup

Sie müssen einen TFTP-Server einrichten, um die iPXE-Dateien zu hosten.  Es gibt verschiedene Arten von TFTP-Servern, die normalerweise alle ziemlich gut funktionieren.  Sie können auch dnsmasq verwenden, um die Dateien zu hosten.

Wenn Sie dnsmasq verwenden, können Sie diese Konfiguration zu `/etc/dnsmasq.conf`hinzufügen:

    enable-tftp
    tftp-root=/var/lib/tftp
    dhcp-boot=netboot.xyz.kpxe

### Behebung des dnsmasq-Dienstes

Wenn Sie systemd ausführen und dnsmasq problemlos manuell starten können, es jedoch beim Booten nicht startet, müssen Sie möglicherweise den Abschnitt [Unit] von `/lib/systemd/system/dnsmasq.service` bearbeiten, indem Sie Folgendes ändern:

    After=network.target

zu

    After=network-online.target

### Reguläre und Undionly Boot-Dateien

Wenn Sie Probleme mit dem regulären Bootloader [netboot.xyz.kpxe](https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe) haben, können Sie versuchen, den Bootloader [netboot.xyz-undionly.kpxe](https://boot.netboot.xyz/ipxe/netboot.xyz-undionly.kpxe) zu verwenden.  Der normale Bootloader enthält gängige NIC-Treiber im iPXE-Image, während der Undionly-Loader die NIC-Boot-Firmware huckepack nimmt.
