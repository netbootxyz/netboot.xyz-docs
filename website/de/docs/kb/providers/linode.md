---
id: Linode
title: Linode
description: Verwenden von netboot.xyz auf Linode
hide_table_of_contents: Stimmt
---

netboot.xyz kann auf eine [Linode](https://linode.com) -Instanz geladen werden, sodass Sie Linode dann nach Bedarf anpassen können. Für diese Methode verwenden wir die kleinste Linode-Größe, auf der Debian ausgeführt wird.

### Erstellen Sie eine Linode

Für diese Methode wird empfohlen, eine apt-basierte Distribution wie Debian oder Ubuntu zu verwenden. Starten Sie Linode mit einem dieser Betriebssysteme. Sobald es betriebsbereit ist, verbinden Sie sich über SSH oder mit der Konsolentaste mit ihm.

### Installieren Sie GRUB Imageboot und laden Sie ISO herunter

Wir müssen sicherstellen, dass das GRUB-Menü lange genug pausiert, damit wir die Option netboot.xyz auswählen können. Dazu müssen wir eine Timeout-Datei entfernen und das Timeout für GRUB erhöhen. Passen Sie den Zeitraum nach Bedarf für Ihre -Situation an:

```shell
# Grub-Timeout erhöhen, falls gewünscht
sed -i 's/GRUB_TIMEOUT=5/GRUB_TIMEOUT=60/g' /etc/default/grub

# Install grub-imageboot
apt update
apt install -y grub-imageboot

# Netboot herunterladen .xyz ISO
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso

# GRUB-Menü aktualisieren, um dieses ISO
update-grub2

# neu zu starten Sobald Sie bereit sind, kann es sinnvoll sein, zuerst die Wiederherstellungskonsole zu
und neu zu starten
```

### Starten Sie die LISH-Konsole

Klicken Sie unter den Linode-Einstellungen auf ... und wählen Sie Launch LISH Console. Für die Interaktion mit dem GRUB-Menü und den netboot.xyz-Menüs müssen Sie auf die Registerkarte Weblish klicken. Für die Interaktion mit einem Installationsprogramm oder einem anderen Tool müssen Sie möglicherweise die Registerkarte Glish (grafisch) verwenden.

Wenn Sie sich zu diesem Zeitpunkt innerhalb des Timeout-Fensters befinden, sollten Sie jetzt das Grub-Menü mit der folgenden jetzt verfügbaren Option sehen, die Sie auswählen können, um das netwboot.xyz-Menü zu laden:

```bash
Bootfähiges ISO-Image: netboot.xyz
```

### Vernetzung

Linode verwendet DHCP, daher sollte netboot.xyz in der Lage sein, eine IP-Adresse zu erhalten und das Menü zu laden. Wenn DHCP nicht funktioniert, müssen Sie möglicherweise das alternative Failsafe-Menü verwenden, um das Netzwerk für die Instanz manuell einzurichten, indem Sie **m** drücken, wenn Sie zum Failsafe-Menü aufgefordert werden.

Wenn Sie eine Installation durchführen, sollten Sie in der Lage sein, zu diesem Zeitpunkt über das vorhandene Laufwerk neu zu installieren und Linode nach Ihren Wünschen anzupassen. Halten Sie die Netzwerkinformationen bereit, da Sie diese bei einer Installation ausfüllen müssen.

:::info
Wenn Sie beim Ausführen eines Installationsprogramms auf Speicherprobleme stoßen, benötigen Sie möglicherweise ein größeres Linode.
:::
