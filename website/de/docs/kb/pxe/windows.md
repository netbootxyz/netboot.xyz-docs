---
id: Fenster
title: "Fenster"
description: "Installieren von Windows 10 mit netboot.xyz"
hide_table_of_contents: Stimmt
---

Dies ist eine der am häufigsten gestellten Fragen, daher verdient sie eine eigene Seite.  
In diesem Handbuch wird davon ausgegangen, dass Sie den Docker-Container linuxserver.io verwenden.

#### Anforderungen

- Samba (SMB, CIFS)-Freigabe mit Windows 10 ISO extrahiert
- Windows PE-Image als ISO, Anweisungen zum Erstellen finden Sie [hier](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-create-usb-bootable-drive#create-a-winpe-iso-dvd-or-cd)

Schritt 1. Laden Sie WindowsPE herunter/generieren Sie das Image und laden Sie Windows 10 ISO herunter.  
Schritt 2. Richten Sie eine SMB-Freigabe mit Windows 10 ISO ein, die in ein Verzeichnis dort extrahiert wurde.  
Schritt 3. Laden Sie Windows PE in den Ordner /assets/WinPE/x64/ des netboot.xyz-Containers von Linuxserver.io hoch.  
Schritt 4. Booten Sie das Menü, gehen Sie zu Windows.  
Schritt 5. Legen Sie die Basis-URL so fest, dass sie auf die IP-Adresse des Containers, den korrekten Nginx-Port zum Hosten von Assets und das richtige Verzeichnis (z. B. http://192.168.2.46:8000/WinPE) verweist.  
Schritt 6. Laden Sie das Installationsprogramm.  
Schritt 7. Sie sollten mit einem Terminal aufgefordert werden.  
Schritt 8. Mounten Sie die Windows-ISO-Freigabe, mit `net use F: \\&#060;server-ip-address&#062;\&#060;share-name&#062; /Benutzer:&#060;Server-IP-Adresse&#062;\&#060;Benutzername-falls erforderlich&#062; &#060;Passwort-falls erforderlich&#062;`

:::Hinweis

Das Terminal verwendet standardmäßig das US-Tastaturlayout.

:::  
Schritt 9. Wechseln Sie in die gemountete Freigabe (`F:`) und führen Sie setup.exe aus oder starten Sie es mit `F:\setup.exe` Schritt 10. Sie sollten mit dem normalen Setup begrüßt werden und es installieren können.

### Persistente URL für Windows mit dem Docker-Container

Schritt 1. Wechseln Sie zum Konfigurator des Containers (Netboot.xyz-Konfiguration), dem Ort, an dem Sie lokale Assets und Menüs verwalten können.  
Schritt 2. Gehen Sie zu Menüs -> boot.cfg.  
Schritt 3. Legen Sie win_base_url fest, um auf die IP-Adresse des Containers, den korrekten Nginx-Port zum Hosten von Assets und das richtige Verzeichnis zu verweisen, zum Beispiel:

```bash
set win_base_url http://192.168.2.46:8000/WinPE
```
Schritt 4. Sie sollten die URL beim Booten von Windows nicht mehr eingeben müssen, also viel Spaß.
