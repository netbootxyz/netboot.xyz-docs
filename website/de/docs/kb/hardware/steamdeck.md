---
id: Dampfdeck
title: PXE-Booten auf dem Steam-Deck
sidebar_label: Dampfdeck
description: PXE-Booten auf dem Steam-Deck
hide_table_of_contents: Stimmt
---

## Überblick

Dies ist eine Anleitung zum PXE-Booten des [Valve Steam Deck](https://store.steampowered.com/steamdeck).

## Anforderungen

Um das Steam Deck zum PXE-Booten zu bringen, benötigen Sie:

- [USB-C Hub](https://amzn.to/3zveSgu) , der Ethernet und USB unterstützt
- USB-Tastatur
- Fest verdrahtetes Ethernet

Verbinden Sie den Hub, das Ethernet und schalten Sie das Steam Deck ein. Als erstes sollten Sie das BIOS so einstellen, dass PXE-Booten möglich ist.

## BIOS-Konfiguration

Um die Steam-Deck-Bootloader-Menüs aufzurufen, fahren Sie das Steam-Deck herunter und:

- Halten Sie `Volume +`gedrückt, während Sie den Netzschalter `auf` drücken, um auf Boot Manager, Setup Utility und Boot from File Menu zuzugreifen. (`Volume -` bringt nur den Boot Manager)
- Wählen Sie Setup Utility, um das Setup aufzurufen.
- Gehen Sie nach unten zum Boot-Tab auf der linken Seite und ändern Sie diese Einstellungen:
  - Schnellstart: Deaktiviert
  - Stiller Start: Deaktiviert
  - PXE-Startfähigkeit: UEFI: IPv4 (kann geändert werden, was für Ihr Netzwerk geeignet ist)
  - Startoptionen hinzufügen: Zuerst
- Wählen Sie Beenden und Speichern von Änderungen beenden.

## PXE-Booten

Das Steam Deck wird jetzt neu gestartet und Sie sehen jetzt den Speichertest, da Quiet Boot deaktiviert wurde. Wenn Ihr Hub richtig mit dem Netzwerk verbunden ist und Sie DHCP im Netzwerk haben, sollten Sie Folgendes sehen:

```shell
>>PXE über IPv4 starten...
```

An diesem Punkt sollten Sie in der Lage sein, ein UEFI-Image per PXE zu booten.

Verwenden Sie die:

- [netboot.xyz UEFI-Kernel](https://boot.netboot.xyz/ipxe/netboot.xyz.efi)
- Legen Sie DHCP [next-server](https://netboot.xyz/docs/booting/tftp) auf TFTP-Server und filename auf das UEFI-Image netboot.xyz auf dem DHCP-Server fest

Wenn Sie das Steam-Deck beim Testen von Betriebssystemen oder beim Herumbasteln daran beschädigen, können Sie die Steam-Deck-Wiederherstellungsanweisungen [hier](https://help.steampowered.com/en/faqs/view/1B71-EDF2-EB6D-2BB3)befolgen.

Wenn Sie das BIOS auf die Standardeinstellungen zurücksetzen möchten, können Sie die BIOS-Sicherung laden, Standardeinstellungen wiederherstellen und Speichern von Änderungen beenden auswählen. Dadurch wird das Steam-Deck wieder in sein ursprüngliches Verhalten versetzt.