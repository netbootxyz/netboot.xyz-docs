---
id: Schnellstart
title: Schnellstart
description: "Erste Schritte mit netboot.xyz"
hide_table_of_contents: Stimmt
---

### Einstieg

[Laden Sie](https://netboot.xyz/downloads/) einen der netboot.xyz-Bootloader herunter, der für Ihre Situation am besten geeignet ist, und starten Sie PXE, indem Sie Ihr bevorzugtes Betriebssystem booten.  Die Bootloader sind vorkompilierte Versionen der neuesten Version von [iPXE](https://github.com/ipxe/ipxe) , mit denen Sie per PXE in [https://boot.netboot.xyz](https://boot.netboot.xyz)booten können.  Wenn Sie DHCP haben, wird automatisch versucht, von DHCP zu booten.  Wenn Sie eine statische IP-Adresse festlegen müssen, drücken Sie während des Startvorgangs die Taste „m“, um das ausfallsichere Menü aufzurufen, und wählen Sie die manuelle Netzwerkkonfiguration.

Im nächsten Abschnitt mit dem Titel [Booting Methods](https://netboot.xyz/docs/category/booting-methods) finden Sie Anweisungen zum Einrichten des heruntergeladenen Bootloaders.

Wenn iPXE bereits im Netzwerk ausgeführt wird, können Sie den netboot.xyz-Kernel laden, indem Sie Folgendes eingeben, wenn er in einem Legacy-Modus-BIOS geladen wird:

    chain --autofree http://boot.netboot.xyz/ipxe/netboot.xyz.lkrn

oder im EFI-Modus-BIOS:

    chain --autofree http://boot.netboot.xyz/ipxe/netboot.xyz.efi

Dadurch wird der entsprechende netboot.xyz-Kernel geladen, wobei alle richtigen Optionen aktiviert sind.

:::Hinweis

Wenn Ihre Version von iPXE HTTPS-Unterstützung einkompiliert hat, können Sie diese Bilder über HTTPS abrufen. Standardmäßig wird das Upstream-iPXE-Projekt nicht mit HTTPS-Unterstützung kompiliert.

:::

### System Anforderungen

- i686-, x86_64- oder aarch64-Prozessor
- 4 GB RAM werden empfohlen. Je nachdem, wie groß die Verteilung ist, können geringere Speichermengen verwendet werden. Einige Distributionen müssen eine Ramdisk in den Speicher laden. Wenn beim Laden von Kernels Probleme auftreten, ist dies im Allgemeinen eines der ersten Dinge, die Sie überprüfen und optimieren sollten.
- Fest verdrahtete Ethernet-Verbindung, WLAN-Unterstützung in iPXE ist begrenzt

### Quellcode

Der Quellcode für netboot.xyz befindet sich auf [Github](https://github.com/netbootxyz/netboot.xyz).

### Beitragen

Neue Version eines Betriebssystems raus?  Haben Sie einen gefunden, der mit iPXE gut vom Netzwerk bootet?  Pull Requests werden begrüßt und gefördert und helfen enorm!  Fühlen Sie sich frei, eine Pull-Anfrage für neue Versionen oder Tools zu stellen, die Sie möglicherweise nützlich finden.  Nach der Zusammenführung mit Master generiert [Github Actions](https://github.com/netbootxyz/netboot.xyz/actions) neue Versionen von [iPXE von Upstream](https://github.com/ipxe/ipxe) und stellt die neuesten Änderungen an netboot.xyz bereit.  Weitere Informationen zum Beitragen von [finden Sie hier](https://netboot.xyz/docs/contributing).

### Testen neuer Funktionen

Unter dem Menü **Utilities** auf netboot.xyz gibt es eine Option für [„netboot.xyz endpoints“](https://github.com/netbootxyz/netboot.xyz/blob/development/roles/netbootxyz/templates/menu/nbxyz.ipxe.j2).  Features oder Änderungen, die in den Entwicklungszweig gemergt wurden, können hier geladen werden, um sie zu testen, bevor sie in die Produktion gemergt werden.

### Kommunikation

Fühlen Sie sich frei, eine [-Ausgabe](https://github.com/netbootxyz/netboot.xyz/issues/new/choose) auf Github zu eröffnen oder sich uns auf unserem [Discord](https://discord.gg/An6PA2a) -Server anzuschließen.  Folgen Sie uns auf [Twitter](https://twitter.com/netbootxyz) oder mögen Sie uns auf [Facebook](https://www.facebook.com/netboot.xyz)!
