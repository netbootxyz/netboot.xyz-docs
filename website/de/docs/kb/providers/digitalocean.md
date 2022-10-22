---
id: Digitalozean
title: DigitalOcean
description: Verwenden von netboot.xyz auf DigitalOcean
hide_table_of_contents: Stimmt
---

netboot.xyz kann mit ein wenig Arbeit auf ein [DigitalOcean](https://m.do.co/c/ab4e8f17ba0d) -Droplet geladen werden, sodass Sie das Droplet dann nach Bedarf anpassen können. Für diese Methode verwenden wir die kleinste Tröpfchengröße unter Debian.

:::info
Wenn Sie sich noch nicht für ein DigitalOcean-Konto angemeldet haben, nutzen Sie bitte unseren Affiliate-Link [hier](https://m.do.co/c/ab4e8f17ba0d). Es wird uns helfen, Testressourcen zur Verbesserung dieses Projekts bereitzustellen!
:::

### Erstellen Sie ein Tröpfchen

Für diese Methode wird empfohlen, eine apt-basierte Distribution wie Debian oder Ubuntu zu verwenden. Starten Sie ein Droplet mit einem dieser Betriebssysteme. Sobald es betriebsbereit ist, verbinden Sie sich über SSH oder mit der Konsolentaste mit ihm.

### Installieren Sie GRUB Imageboot und laden Sie ISO herunter

Wir müssen sicherstellen, dass das GRUB-Menü lange genug pausiert, damit wir die Option netboot.xyz auswählen können. Dazu müssen wir eine Timeout-Datei entfernen und das Timeout für GRUB erhöhen. Passen Sie den Zeitraum nach Bedarf für Ihre -Situation an:

```shell
# Grub-Timeout-Konfiguration entfernen
rm /etc/default/grub.d/15_timeout.cfg

# Grub-Timeout erhöhen, falls gewünscht
sed -i 's/GRUB_TIMEOUT=5/GRUB_TIMEOUT=60/g' /etc/default/grub

# installiere grub-imageboot
apt update
apt install -y grub-imageboot

# downloade netboot.xyz ISO
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot .xyz.iso

# Aktualisieren Sie das GRUB-Menü, um dieses ISO
update-grub2

# neu zu starten, sobald Sie bereit sind, kann es gut sein, zuerst die Wiederherstellungskonsole zu laden
neu zu starten
```

### Verbinden Sie sich über die Wiederherstellungskonsole

Stellen Sie im Zugriffsbereich eine Verbindung zur Wiederherstellungskonsole her. Die Wiederherstellungskonsole unterscheidet sich vom regulären Konsolenbefehl dadurch, dass sie direkten Zugriff auf das Droplet beim Booten ermöglicht, einschließlich des Zugriffs auf das GRUB-Menü. Wenn Sie sich zu diesem Zeitpunkt innerhalb des Timeout-Fensters befinden, sollten Sie jetzt das Grub-Menü mit der folgenden jetzt verfügbaren Option sehen:

```bash
Bootfähiges ISO-Image: netboot.xyz
```

### Netzwerk einrichten

Da die Droplets eine statische IP anstelle von DHCP verwenden, müssen Sie das Netzwerk einrichten, damit iPXE mit dem Netzwerk kommunizieren kann. Drücken Sie nach Auswahl der Option netboot.xyz **m** , wenn Sie zum Failsafe-Menü aufgefordert werden. Sie müssen das Netzwerk der Instanz einrichten, damit iPXE online gehen kann. Sie können die Netzwerkinformationen über das Droplet-Bedienfeld auf der Registerkarte „Netzwerk“ abrufen. Sobald Sie die Netzwerkinformationen haben, wählen Sie Manuelle Netzwerkkonfiguration:

```bash
Stellen Sie die Netzwerkschnittstellennummer ein [0 für net0, standardmäßig 0]: <set to 0>
IP: <set to droplet IP>
Subnetzmaske: <set to droplet netmask>
Gateway: <set to droplet gateway>
DNS: <set DNS server, e.g. 1.1.1.1>
```

Einmal eingestellt, sollten Sie sich direkt mit netboot.xyz verbinden. Wenn Sie eine Installation durchführen, sollten Sie zu diesem Zeitpunkt über das vorhandene Laufwerk neu installieren und das Droplet nach Belieben anpassen können. Halten Sie die Netzwerkinformationen bereit, da Sie diese bei einer Installation ausfüllen müssen.

:::info
Wenn Sie beim Ausführen eines Installationsprogramms auf Speicherprobleme stoßen, benötigen Sie möglicherweise ein größeres Droplet.
:::
