---
id: qemu
title: Booten von QEMU
sidebar_label: Booten von QEMU
description: "Methoden zum Booten in netboot.xyz mit QEMU"
hide_table_of_contents: Stimmt
---

### Überblick

Eine schnelle Möglichkeit, netboot.xyz ohne Änderungen an Ihrer bestehenden Umgebung auszuprobieren, ist die Nutzung von QEMU.  Sie können eine virtuelle Maschine starten, um zu testen, was netboot.xyz ist und wie es funktioniert.  Sie benötigen das qemu-system-Paket für Ihr entsprechendes Betriebssystem und einen installierten Fenstermanager.  Im folgenden Beispiel verwenden wir Ubuntu 20.04.

### Abhängigkeiten installieren

```bash
# Installieren Sie das qemu-system-Paket
sudo apt-get install -y qemu-system ovmf

# Laden Sie die neueste kombinierte Legacy- und EFI-ISO
herunter wget http://boot.netboot.xyz/ipxe/netboot.xyz.iso
```

Wenn Sie auf eine Festplatte schreiben möchten, können Sie an dieser Stelle eine festlegen, oder Sie können optional ohne Festplatte booten, wenn Sie netboot.xyz testen möchten:

### Datenträger erstellen (optional)

```bash
qemu-img create -f raw vmdisk 8G

# fügen Sie am Ende der folgenden qemu-system-Zeilen Folgendes hinzu, wenn Sie eine Festplatte zum Schreiben hinzufügen möchten:
# -drive file=vmdisk,format=raw
```

### Booten mit Legacy-PCBIOS

```bash
qemu-system-x86_64 -cdrom netboot.xyz.iso -m 4G
```

### Booten mit einem UEFI-BIOS

```bash
qemu-system-x86_64 -bios /usr/share/ovmf/OVMF.fd -cdrom netboot.xyz.iso -m 4G
```

:::Hinweis

Für einige der Bilder, die in den RAM geladen werden, werden mindestens 4 GB Arbeitsspeicher empfohlen.  Wenn beim initrd-Laden Probleme auftreten, benötigt die Maschine normalerweise nur mehr RAM.

:::
