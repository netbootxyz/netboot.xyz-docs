---
id: vultr
title: "Vultr"
description: "Verwenden von netboot.xyz mit Vultr"
hide_table_of_contents: Stimmt
---

[Vultr](http://www.vultr.com/?ref=6870843) bietet großartige Unterstützung für die Verwendung von netboot.xyz direkt nach dem Auspacken.

:::info
Wenn Sie sich noch nicht für ein Vultr-Konto angemeldet haben, nutzen Sie bitte unseren Affiliate-Link [hier](http://www.vultr.com/?ref=6870843). Es wird uns helfen, Testressourcen bereitzustellen, um dieses Projekt zu verbessern!
:::

### Von ISO booten

Nachdem Sie sich bei der Konsole angemeldet haben, wählen Sie ISOs aus.  Geben Sie im Feld „Remote-URLs“ die URL einer -ISO ein und klicken Sie auf „Upload“:

    https://boot.netboot.xyz/ipxe/netboot.xyz.iso

Gehen Sie zurück zum Hauptbildschirm der Konsole und klicken Sie auf „Neue Instanz bereitstellen“. Sie diese Schritte:

* Wählen Sie _Benutzerdefiniert_ für das Betriebssystem
* Wählen Sie die ISO aus, die Sie hochgeladen haben
* Klicken Sie auf _Bestellung aufgeben_

Die Instanz sollte in wenigen Minuten online sein.  Sobald es online ist, gehen Sie zur Hauptkontoseite , die alle Ihre Instanzen auflistet.  Klicken Sie neben der gerade gestarteten Instanz auf _Verwalten_ und dann auf _Konsole anzeigen_ unter _Serveraktionen_. Wenn die Konsole erscheint, sollten Sie das netboot.xyz iPXE-Menü sehen.

Wenn Sie die Installation des Betriebssystems abgeschlossen haben, wählen Sie _Custom ISO_ auf der Server Manager-Seite und klicken Sie auf _Remove ISO_.  Die ISO wird von Ihrer -Instanz entfernt und neu gestartet.

### Booten Sie von der iPXE-Ketten-URL

Die Verwendung einer iPXE-Ketten-URL kann für einige Benutzer einfacher sein.  Folge diesen Schritten:

* Klicken Sie auf _Neue Instanz bereitstellen_
* Wählen Sie _Benutzerdefiniert_ für das Betriebssystem
* Wählen Sie _iPXE_ im Abschnitt Virtuelles ISO aus
* Setzen Sie die Ketten-URL auf `https://boot.netboot.xyz`
* Klicken Sie auf _Bestellung aufgeben_

Die Instanz wird innerhalb weniger Minuten gestartet.  Nach dem Start haben Sie fünf Minuten Zeit, um eine Konsole zu starten und eine Option aus dem Menü auszuwählen:

* Gehen Sie zurück zur Startseite Ihres Kontos mit Ihren aufgelisteten Instanzen
* Klicken Sie neben der gerade gestarteten Instanz auf _Verwalten_
* Klicken Sie im Abschnitt _Serveraktionen_ auf _Konsole_ anzeigen
* Wählen Sie das Betriebssystem, das Sie bereitstellen möchten, im Menü „netboot.xyz“ aus
* Schließen Sie die Installation des Betriebssystems ab

Sobald Sie die Installation abgeschlossen haben, starten Sie die Instanz neu, wie Sie es normalerweise würden. startet Ihre virtuelle Maschine automatisch in dem von Ihnen bereitgestellten Betriebssystem neu.

### Booten Sie von iPXE auf einem Vultr Bare Metal Server

Auf Vultr Bare Metal finden Sie die iPXE-Optionen auf der Registerkarte iPXE im Abschnitt Servertyp.

* Setzen Sie die Ketten-URL auf `https://boot.netboot.xyz`

Stellen Sie sicher, dass Sie Legacy-Images (PCBIOS) verwenden, da Bare Metal EFI derzeit nicht unterstützt. Sie können dann die Konsole laden und das Menü von dort aus verwenden.