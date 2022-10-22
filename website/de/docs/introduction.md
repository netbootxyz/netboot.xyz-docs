---
id: Einleitung
title: Einführung
description: netboot.xyz verwendet iPXE, um Betriebssysteminstallationsprogramme und Dienstprogramme über ein benutzerfreundliches Menü über das Netzwerk zu booten."
hide_table_of_contents: Stimmt
slug: /
---

[Mit netboot.xyz](http://netboot.xyz) können Sie [PXE](https://en.wikipedia.org/wiki/Preboot_Execution_Environment) verschiedene Installationsprogramme oder Dienstprogramme für Betriebssysteme von einem einzigen Tool aus über das Netzwerk booten. Dadurch können Sie ein Medium für viele Arten von Betriebssystemen oder Tools verwenden. Das [iPXE](http://ipxe.org/) -Projekt wird verwendet, um ein benutzerfreundliches Menü innerhalb des BIOS bereitzustellen, mit dem Sie einfach das gewünschte Betriebssystem zusammen mit bestimmten Arten von Versionen oder bootfähigen Flags auswählen können.

Sie können das ISO remote an Server anhängen, es als Rettungsoption in Grub einrichten oder sogar Ihr Heimnetzwerk so einrichten, dass es standardmäßig bootet, damit es immer verfügbar ist.

![netboot.xyz-Menü](../static/img/netboot.xyz.gif)

## Menüübersicht

### Linux-Netzwerkinstallationsmenü

Für Betriebssystemprojekte, die ein netzwerkbootfähiges Installationsprogramm bereitstellen, ist dies eine einfache Installationsmethode, da es einen minimalen Satz von Installationskerneln abruft und dann Pakete nach Bedarf installiert. Dies ist in der Regel die schnellere Methode der Betriebssysteminstallation. Sie können auch integrierte Tools zum Ausführen von Rettungsstiefeln nutzen.

### Live-CD/Distro-Menü

Viele Betriebssystemprojekte stellen ihre Software nur als ISO bereit oder stellen eine Live-CD/DVD bereit, die Sie herunterladen und in den Speicher booten können, indem Sie den Speicher des Computers ändern. In der Regel haben Sie dann die Möglichkeit, eine Installation vom Live-System aus durchzuführen.  Dies sind in der Regel schwerere Installationen, deren Installation viel Bandbreite in Anspruch nehmen kann. iPXE bootet die ISOs im Allgemeinen nicht so gut direkt.

Damit wir es einfach machen, diese Arten von Bildern zu konsumieren, überwachen wir neue Versionsaktualisierungen von Upstream, rufen die Versionen ab, extrahieren sie und veröffentlichen sie mit Änderungen an der initrd nach Bedarf erneut, um sie iPXE-freundlich zu machen. Wir können dann den kleineren Kernel direkt in den Speicher laden, um eine bessere und konsistentere Erfahrung zu erzielen.

### Dienstprogramme-Menü

Das Menü „Dienstprogramme“ bietet Zugriff auf Tools und Dienstprogramme für Tools wie das Klonen von Festplatten, das Löschen von Laufwerken oder andere Rettungstools. Sie können auch andere netboot.xyz-Endpunkte auswählen, um Menüs zu testen, die sich möglicherweise in der Entwicklung befinden.

## Unterstützte Architekturen

netboot.xyz unterstützt 32-Bit- und 64-Bit-x86-Architekturen und arm64-Architekturen. Die Menüs identifizieren die geladene Plattform und aktivieren Menüoptionen basierend auf der geladenen Architektur.
