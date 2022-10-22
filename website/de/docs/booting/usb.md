---
id: USB
title: Booten von USB
sidebar_label: Booten von USB
description: "So erstellen Sie einen USB-Stick, der in netboot.xyz booten kann"
hide_table_of_contents: Stimmt
---

:::danger
Sichern Sie Ihre wichtigen Daten, bevor Sie auf den USB-Stick schreiben, da dadurch alles auf dem USB-Stick überschrieben wird.
:::

Laden Sie eine netboot.xyz-USB-Festplatte herunter:

* [netboot.xyz](https://boot.netboot.xyz/ipxe/netboot.xyz.img)

## USB-Schlüssel unter Linux erstellen

Stecken Sie einen USB-Stick in Ihren Computer und suchen Sie den Gerätenamen. Verwenden Sie dann folgenden Befehl:

```shell
cat netboot.xyz.img > /dev/sdX
```

oder

```shell
dd if=netboot.xyz.img of=/dev/sdX
```

wobei sdX Ihr USB-Laufwerk ist.

Der USB-Stick sollte nach Abschluss zum Auswerfen bereit sein.

## Erstellen eines USB-Schlüssels unter MacOS

__Laufen:__

```shell
Diskutil-Liste
```

um die aktuelle Geräteliste abzurufen

___Legen Sie das Flash-Medium ein.___

__Laufen:__

```shell
Diskutil-Liste
```

erneut und ermitteln Sie den Geräteknoten, der Ihrem Flash-Medium zugeordnet ist (z. B. /dev/disk2).

__Laufen:__

```shell
diskutil unmountDisk /dev/diskN
```

(Ersetzen Sie N durch die Festplattennummer aus dem letzten Befehl; im vorherigen Beispiel wäre N 2).

__Ausführen:__

```shell
sudo dd if=netboot.xyz.img of=/dev/rdiskN bs=1m
```

* Die Verwendung von /dev/rdisk anstelle von /dev/disk kann schneller sein
* Wenn Sie den Fehler dd: Invalid number '1m' sehen, verwenden Sie GNU dd. Verwenden Sie denselben Befehl, aber ersetzen Sie bs=1m durch bs=1M
* Wenn Sie den Fehler dd: /dev/diskN: Resource busy sehen, vergewissern Sie sich, dass die Festplatte nicht verwendet wird. Starten Sie die 'Disk Utility.app' und unmounten Sie das Laufwerk (nicht auswerfen).

__Laufen:__

```shell
diskutil wirft /dev/diskN aus
```

und entfernen Sie Ihr Flash-Medium, wenn der Befehl abgeschlossen ist.

## USB-Schlüssel unter Windows erstellen

Sehen Sie sich [Rufus](https://rufus.akeo.ie/) an, um die IMG-Datei auf einem USB-Stick zu installieren.

## Booten

Nachdem Sie Ihren Schlüssel erstellt haben, starten Sie Ihr BIOS neu und stellen Sie es so ein, dass es zuerst den USB-Schlüssel lädt, falls es noch nicht darauf eingestellt ist. Sie sollten sehen, dass iPXE entweder automatisch netboot.xyz lädt oder Sie werden aufgefordert, Ihre Netzwerkinformationen einzurichten.
