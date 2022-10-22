---
id: Equinixmetall
title: Equinix-Metall
description: Verwenden von netboot.xyz mit Equinix Metal-Bare-Metal-Servern
hide_table_of_contents: Stimmt
---

[Equinix Metal](https://metal.equinix.com) unterstützt vollständig netboot.xyz mit seinem benutzerdefinierten iPXE -Betriebssystem.

### Verwendungszweck

Wählen Sie das Betriebssystem „Custom iPXE“ aus dem Portal oder den Slug `custom_ipxe` , wenn Sie die API verwenden.

### Bereitstellung

Geben Sie die URL netboot.xyz in das Textfeld ein, das im Portal angezeigt wird, oder verwenden Sie den Parameter `ipxe_script_url` beim Erstellen des Geräts über die API.

    https://boot.netboot.xyz

Klicken Sie auf „Bereitstellen“, um Ihr Gerät bereitzustellen. Es dauert 2-3 Minuten, bis das Gerät aktiv wird. Sobald es online ist, stellen Sie eine Verbindung zum Out-of-Band Serial-over-SSH-Dienst (SOS) von Equinix Metal her, indem Sie die `ID` des Geräts und die Einrichtung verwenden, in der das Gerät bereitgestellt wurde, z. B. `ewr1`.

    ssh0 {server-uuid}.{facility-code}.platformequinix.com

Die aktuelle Liste der Einrichtungen ist hier [](https://metal.equinix.com/product/locations). Das iPXE-Menü netboot.xyz wird angezeigt und Sie können die Installation von dort aus abschließen.

:::Hinweis

Standardmäßig sind Geräte so eingestellt, dass sie von der lokalen Festplatte booten. Während der -Bereitstellung legt Equinix Metal den nächsten Start auf PXE fest. Dies geschieht einmal, was bedeutet, dass wenn Sie vor dem Neustart kein Betriebssystem installieren, das netboot.xyz-Menü nicht neu geladen wird. Sie können Ihr Gerät jedoch so einstellen, dass es immer zuerst mit iPXE startet, indem Sie diese Option unter „Serveraktionen“ über das Kundenportal aktivieren.

:::

### Vernetzung

Geräte, die über benutzerdefiniertes bereitgestellt werden, können für die Lebensdauer des Geräts DHCP verwenden; Equinix Metal empfiehlt jedoch, das Netzwerk statisch zu konfigurieren. IP -Adressinformationen können durch Abfragen von https://metadata.platformequinix.com/metadata vom Host gefunden werden.

Weitere Informationen darüber, wie Equinix Metal Bonding konfiguriert, finden Sie [hier](https://metal.equinix.com/developers/docs/networking/layer2/).

Nameserver sollten wie folgt konfiguriert werden:

    Nameserver 147.75.207.207
    Nameserver 147.75.207.208
