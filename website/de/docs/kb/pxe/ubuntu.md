---
id: Ubuntu
title: PXE-Booten des Ubuntu-Installationsprogramms
sidebar_label: Ubuntu
description: PXE-Booten des Ubuntu-Installationsprogramms
hide_table_of_contents: Stimmt
---

## Installer-Kernel

Ubuntu verwaltet Installer-Kernel, die eine einfache Möglichkeit bieten, das Ubuntu-Installationsprogramm zu laden und dann Pakete nach Bedarf über das Netzwerk zu streamen. Die Installer-Kernel befinden sich unter:

```bash
# http://archive.ubuntu.com oder andere Ubuntu-Spiegel
#
# (${version} == xenial, bionic, etc)
# (${arch} == amd64, i386)

# ursprüngliches Veröffentlichungsverzeichnis: 
# ubuntu/dists/${version}/main/installer-${arch}/current/images/netboot/
# 
# aktualisiertes Release-Verzeichnis, das neuere Kernel und Updates enthält:
# ubuntu/dists/${version}-updates/main/installer-${arch}/current/images/netboot/
#
# Kernel-Dateiname: linux
# initrd-Dateiname: initrd.gz
```

Um sie zu laden, müssen Sie ein Boot-Snippet in iPXE ähnlich dem folgenden verwenden:

```bash
set install_params auto=true priority=critical
set mirror http://archive.ubuntu.com
set base_dir ubuntu
set ubuntu_version bionic
set arch amd64
set mirrorcfg mirror/suite=${ubuntu_version}
set dir ${mirror}/${base_dir}/dists/${version}/main/installer-${arch}/current/images/netboot

Kernel ${dir}/linux ${install_params} ${mirrorcfg} -- quiet initrd=initrd.gz
initrd ${dir}/initrd.gz
boot
```

Wenn Sie eine [Preseed](https://help.ubuntu.com/lts/installation-guide/example-preseed.txt) -URL für die Automatisierung verwenden möchten, können Sie dies der Kernel-Zeile hinzufügen:

```bash
setze preseedurl http://my.preseed.com/preseed.cfg
preseed/url=${preseedurl}
```

Weitere Beispiele finden Sie in der netboot.xyz-Konfiguration für Ubuntu [hier](https://github.com/netbootxyz/netboot.xyz/blob/master/roles/netbootxyz/templates/menu/ubuntu.ipxe.j2).

## Live-Boot

Ubuntu bietet auch eine Reihe von Live-Boot-ISOs, die ein Betriebssystem direkt in den Speicher booten und sofort verwendet werden können, ohne eine Installation durchzuführen oder die Festplatte zu modifizieren.  Das Live-Betriebssystem enthält auch das Installationsprogramm.  Diese eignen sich hervorragend zum Bewerten anderer Desktops, die Sie vielleicht ausprobieren möchten, ohne eine vollständige Installation durchzuführen.

| Verteilung           | Webseite                                                     |
|:-------------------- |:------------------------------------------------------------ |
| Kubuntu              | [https://kubuntu.org/](https://kubuntu.org/)                 |
| Lubuntu              | [https://lubuntu.me/](https://lubuntu.me/)                   |
| Ubuntu Wellensittich | [https://ubuntubudgie.org/](https://ubuntubudgie.org/)       |
| Ubuntu Kylin         | [https://www.ubuntukylin.com/](https://www.ubuntukylin.com/) |
| Ubuntu Mate          | [https://ubuntu-mate.org/](https://ubuntu-mate.org/)         |
| Ubuntu-Studio        | [https://ubuntustudio.org/](https://ubuntustudio.org/)       |
| Xubuntu              | [https://xubuntu.org/](https://xubuntu.org/)                 |
