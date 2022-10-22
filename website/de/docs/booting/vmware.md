---
id: VMware
title: Booten Sie mit VMware
sidebar_label: Booten Sie mit VMware
description: "Verwenden von netboot.xyz in VMware zum Installieren einer VM"
hide_table_of_contents: Stimmt
---

### VMware-Fusion

Diese Anweisungen gelten für die Einrichtung von netboot.xyz in einer VM unter VMware Fusion für MacOS.

### Erstellen Sie die VM

* Fügen Sie eine neue virtuelle Maschine hinzu.
* Wählen Sie „Von Disc oder Image installieren“.
* Klicken Sie auf „Andere Festplatte oder anderes Disc-Image verwenden…“.
* Laden Sie netboot.xyz [ISO](https://boot.netboot.xyz/ipxe/netboot.xyz.iso)herunter und wählen Sie es aus.
* Wählen Sie auf dem Bildschirm „Betriebssystem auswählen“ den Betriebssystemtyp aus, den Sie installieren möchten.  Wenn Sie mehrere Arten von Installationen testen möchten, können Sie einfach ein CentOS 64-Bit-Betriebssystem auswählen.
* Klicken Sie auf „Einstellungen anpassen“ und geben Sie der VM einen Namen, z. B. „netboot.xyz“.

Dadurch wird Ihre VM erstellt.

### Ausführen der VM

_Sie müssen die Arbeitsspeichereinstellungen der VM anpassen, um sicherzustellen, dass Sie über genügend Arbeitsspeicher verfügen, um die Betriebssysteminstallationsprogramme im Arbeitsspeicher auszuführen.  Normalerweise ist es gut, den Speicher auf 2 GB bis 4 GB zu erhöhen._

* Klicken Sie auf das Schraubenschlüssel-Symbol und dann auf Processors & Memory und erhöhen Sie den Speicher auf die gewünschte Speichermenge.
* Starten Sie die VM und Sie sollten den netboot.xyz-Loader sehen.
* Wenn Sie feststellen, dass Sie nicht mehr von netboot.xyz booten möchten, können Sie entweder die Bootreihenfolge so ändern, dass standardmäßig von der Festplatte gebootet wird, oder das ISO von der VM löschen.
