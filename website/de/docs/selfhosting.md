---
id: selbst hosten
title: Selbsthosting
description: "Wie Sie Ihre eigene netboot.xyz in Ihrer Umgebung selbst hosten"
hide_table_of_contents: Stimmt
---

### Wie kann ich netboot.xyz selbst hosten?

netboot.xyz war ursprünglich ein nur gehostetes Tool und verwendete statische Quelldateien, die schwierig anzupassen waren.  Jetzt können Sie Ihre eigene selbst gehostete Umgebung mit denselben Tools zum Generieren der gehosteten Site erstellen.

[Ansible](https://www.ansible.com/), eine Open-Source-Automatisierungs-Engine, wird verwendet, um benutzerdefinierte Vorlagen basierend auf einer Reihe von Standardkonfigurationen zu generieren, die dann vom Benutzer überschrieben werden können. Dies ermöglicht es einem Benutzer, eine netboot.xyz-Umgebung an seine Spezifikation anzupassen und einen PXE-Server einfach einzurichten. Die Ansible Playbooks generieren:

* Menüs für ihre netboot.xyz-Umgebung mit Standardkonfigurationseinstellungen
* iPXE-Bootloader zum Booten in diese Umgebung
* Angepasste Menüoptionen für diejenigen, die zusätzliche Optionen hinzufügen möchten

#### Rollenstruktur

Die netbootxyz Ansible [Rolle](https://github.com/netbootxyz/netboot.xyz/tree/master/roles/netbootxyz) befindet sich im Hauptrepository netboot.xyz.  Der größte Teil der Logik für netboot.xyz ist in diesen Bereichen enthalten:

* defaults/main.yml – Besteht aus Standardeinstellungen für Bereitstellung, Betriebssystemversionen, Dienstprogramme und Bootloader
* Tasks/* – Enthält alle Tasks zum Rendern von Vorlagen und zum Kompilieren von iPXE-Bootloadern
* templates/disks - Vorlagen für iPXE-Bootloader
* templates/menus - Vorlagen für netboot.xyz-Menüs
* vars/* – Enthält erforderliche Paketlisten, die zur Unterstützung der Kompilierung und Bereitstellung von netboot.xyz benötigt werden

#### Bereitstellung mit Ansible

Um eine Bereitstellung mit Ansible auszuführen, installieren Sie zuerst Ansible, Apache und Git:

```bash
# Für Debian/Ubuntu:
apt install -y ansible git apache2

# Für Red Hat/CentOS/Fedora
yum install -y ansible git httpd
```

Dann schauen Sie sich das netboot.xyz-Repo an:

```bash
Git-Klon https://github.com/netbootxyz/netboot.xyz.git /opt/netboot.xyz
```

Führen Sie schließlich das Ansible-Playbook aus:

```bash
cd /opt/netboot.xyz
ansible-playbook -i Inventory-Site.yml
```

Die Ausgabe wird standardmäßig in `/var/www/html` abgelegt.  Sie können dies überschreiben, um es im Webserver-Verzeichnis Ihrer Wahl bereitzustellen.

#### Bereitstellung mit Docker

Sie können Docker auch nutzen, um das netboot.xyz-Menü und Festplatten in einem Container zu generieren, der dann die Ergebnisse der gerenderten Vorlagen und kompilierten iPXE-Festplatten in ein Verzeichnis ausgibt.  Stellen Sie zunächst sicher, dass Docker installiert ist, und führen Sie dann Folgendes aus:

```bash
docker build -t localbuild -f Dockerfile-build .
docker run --rm -it -v $(pwd):/buildout localbuild
```

Die Build-Ausgabe befindet sich im generierten Ordner `buildout`. Docker bietet eine konsistente und isolierte Umgebung zum Generieren der Build-Ausgabe. Von dort aus würden Sie die Dateien im Stammverzeichnis Ihres bevorzugten Webservers ablegen.

#### Lokale Überschreibungen

Ansible übernimmt die Quellgenerierung sowie die Generierung von iPXE-Datenträgern mit Ihren Einstellungen.  Es generiert Legacy- (PCBIOS) und UEFI-iPXE-Datenträger, die zum Laden in Ihre netboot.xyz-Umgebung verwendet werden können. Wenn Sie die Standardeinstellungen überschreiben möchten, können Sie Überschreibungen in user_overrides.yml einfügen.  Siehe `user_overrides.yml` für Beispiele.

Mit der Overrides-Datei können Sie alle Einstellungen aus defaults/main.yml überschreiben, sodass Sie die Boot-Mirror-URLs einfach ändern können, wenn die Menüs gerendert werden.  Wenn Sie dies lieber im Nachhinein tun möchten, können Sie auch die boot.cfg bearbeiten, um Änderungen vorzunehmen, aber denken Sie daran, dass diese Änderungen nicht gespeichert werden, wenn Sie das Menü erneut bereitstellen.

#### Selbst gehostete benutzerdefinierte Optionen

Sie können netboot.xyz nicht nur lokal hosten, sondern auch Ihre eigenen benutzerdefinierten Vorlagen für benutzerdefinierte Menüs innerhalb von netboot.xyz erstellen. Diese Vorlagen werden während der Bereitstellung gerendert und sind im Hauptmenü über die benutzerdefinierte Menüoption verfügbar.

Wenn diese Optionen eingestellt sind:

```bash
custom_generate_menus: true
custom_templates_dir: "{{ netbootxyz_conf_dir }}/custom"
```

Das Menü fügt eine Option für benutzerdefinierte Menüs hinzu und versucht, in custom/custom.ipxe zu laden. Von dort aus können benutzerdefinierte Optionen separat vom netboot.xyz-Quellbaum erstellt und verwaltet werden, sodass beide Menüs unabhängig voneinander aktualisiert werden können.

Ein Beispielmenü wird bereitgestellt, um zu demonstrieren, wie ein Menü konfiguriert und eingerichtet wird. Sie können das benutzerdefinierte Verzeichnis aus dem Repo kopieren:

```bash
cp etc/netbootxyz/custom /etc/netbootxyz/custom
```
