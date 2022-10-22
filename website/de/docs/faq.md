---
id: FAQ
title: Häufig gestellte Fragen (FAQ)
sidebar_label: FAQ
description: "Häufig gestellte Fragen zum netboot.xyz-Projekt"
hide_table_of_contents: Stimmt
---

### Was ist das?
netboot.xyz ist ein Tool, mit dem Sie das Installationsprogramm Ihres bevorzugten Betriebssystems oder verschiedene Dienstprogramme über das Netzwerk mit minimalem Aufwand und alles von einem einzigen Menüsystem aus booten können.  Es ähnelt verschiedenen Netbooting-Tools der Vergangenheit wie boot.kernel.org mit viel mehr Flexibilität.  Der Bootloader ist mit einer Größe von weniger als 1 MB sehr leicht, was sich in einer sehr kurzen Zeit zum Erstellen eines USB-Sticks niederschlägt.

### Wie funktioniert das?
netboot.xyz verwendet ein Open-Source-Tool namens iPXE.  Der Bootloader ruft einen Webserver auf, der die iPXE-Quelldateien hostet.  Die iPXE-Quelldateien enthalten Menüs und Logik, die verstehen, wie die verschiedenen Linux-Installationsprogramme funktionieren.  Wenn Sie ein Betriebssystem auswählen, ruft netboot.xyz die Images nach Möglichkeit aus dem Projektverzeichnis oder bekannten und vertrauenswürdigen leistungsstarken Spiegeln ab.  Der Speicherort, von dem die Datei abgerufen wird, wird beim Abrufen immer angezeigt.

### Was ist PXE-Booten?
PXE steht für **P**Neustart e**X**Ausführung **E**Umgebung.  PXE-Booting wird seit Jahren verwendet, um Clients das Booten von einem Server über das Netzwerk zu ermöglichen.  Es gibt Ihnen die Möglichkeit, ein System innerhalb des BIOS zu automatisieren, bevor es von seiner Festplatte bootet, was die Tür zum Ausführen zustandsloser Maschinen öffnet, ohne dass Speicher im System verwendet werden muss.  PXE-Booting wird in vielen Anwendungen verwendet, aber am häufigsten wird die Installation von Bare Metal oder einer virtuellen Maschine automatisiert.

### Funktioniert meine bevorzugte Distribution mit netboot.xyz?
Normalerweise benötigen Sie drei Dinge, um ein Betriebssystem über das Netzwerk hochzufahren: vmlinuz, initramfs und rootfs.  Distributionen, die einen Installer-Kernel unterstützen, der auf einem Mirror gehostet wird, sind normalerweise einfacher zu implementieren, da sie sehr leichtgewichtig sind.  Distributionen, die nur ISOs veröffentlichen, sind in der Regel etwas aufwändiger zu implementieren, da wir Memdisk verwenden müssen, um sie in den Speicher zu laden.

Von [syslinux - memdisk](http://www.syslinux.org/wiki/index.php/MEMDISK): Die meisten Linux-basierten CD-Images funktionieren auch nicht mit der MEMDISK-ISO-Emulation. Linux-Distributionen erfordern die Angabe von Kernel- und Initrd-Dateien, sobald diese Dateien geladen sind, übernehmen die Protected-Mode-Kernel-Treiber die Kontrolle und die virtuelle CD ist nicht mehr zugänglich. Wenn andere Dateien von der CD/DVD benötigt werden, fehlen sie, was zu Startfehlern führt. Linux-Distributionen, die nur Kernel- und Initrd-Dateien benötigen, funktionieren vollständig über die ISO-Emulation, da nach dem Laden keine weiteren Daten aus dem virtuellen CD/DVD-Laufwerk abgerufen werden müssen. Der Bootloader hat alle notwendigen Dateien mit INT 13h in den Speicher gelesen, bevor er den Kernel bootet.

Um diese Einschränkungen zu umgehen, insbesondere da memdisk nicht von UEFI unterstützt wird, haben wir ein CI/CD-System erstellt, das die ISOs aus Upstream-Projekten nutzt und die erforderlichen Dateien zum Remote-Booten des Betriebssystems als Release vorbereitet.  In einigen Fällen kann dies eine kleine Änderung an den Init-Skripten beinhalten, um die Netzwerkboot-Flexibilität zu optimieren oder mehrere Teile für größere Betriebssysteme zu handhaben.  Diese Releases werden der Datei endpoints.yml im Hauptrepository netboot.xyz hinzugefügt und stehen dann zum Download zur Verfügung.

Hier können Sie mehr über unser Build-System [lesen](https://github.com/netbootxyz/build-pipelines/blob/master/README.md).

### Meine Distribution verwendet ISOs für die Lieferung, wie kann ich sehen, ob sie funktionieren?
Sie können eine schnelle Überprüfung durchführen, indem Sie netboot.xyz in einer virtuellen Umgebung baremetal laden.  Stellen Sie sicher, dass Sie über genügend RAM verfügen, während Sie die ISO in den RAM laden.  Wählen Sie dann die iPXE-Befehlszeile und geben Sie Folgendes ein:

    Kernel https://boot.netboot.xyz/memdisk iso raw
    initrd http://url/to/iso
    boot

Das sollte die ISO laden und wenn Sie es bis zum Installationsprogramm schaffen, großartig, Ihr Betriebssystem könnte funktionieren.  Wenn es während des initramfs-Ladens fehlschlägt, versucht es, das CD-Gerät zu laden, dann hat es das Problem, dass es das ISO nicht im Speicher finden kann.

### Kann ich eigene Konfigurationen erstellen?

Ja!  Sie können [netboot.xyz-custom](https://github.com/netbootxyz/netboot.xyz-custom) forken und Ihr eigenes Menü erstellen.  Sie können dann Ihren Github-Benutzer über das Utility-Menü festlegen und Ihr Menü wird im Hauptmenü angezeigt.  Wenn Sie Ihren Benutzer nicht jedes Mal festlegen möchten, können Sie den iPXE-Code netboot.xyz benutzerdefiniert kompilieren und Ihren github_user während der Kompilierung einschließen.  Auf diese Weise können Sie Ihr eigenes Menü erstellen, ohne sich um alles andere kümmern zu müssen.

### Unterstützt netboot.xyz Secure Boot?

iPXE und damit netboot.xyz unterstützen Secure Boot nicht, da seine [Binärdateien nicht von Microsoft](https://ipxe.org/appnote/etoken)signiert sind. Sie müssen den Secure Boot-Modus im Firmware-Konfigurationsmenü Ihres Computers deaktivieren, bevor Sie netboot.xyz booten können.

### Welche Betriebssysteme sind derzeit auf netboot.xyz verfügbar?

#### Betriebssysteme

| Name                       | URL                                                | Installer-Kernel                    | Live-Betriebssystem |
| -------------------------- | -------------------------------------------------- | ----------------------------------- | ------------------- |
| AlmaLinux                  | https://almalinux.org/                             | Ja                                  | Nein                |
| Alpines Linux              | https://alpinelinux.org                            | Ja                                  | Nein                |
| Anarchisches Linux         | https://anarchyinstaller.org                       | Ja                                  | Nein                |
| Arch-Linux                 | https://www.archlinux.org                          | Ja                                  | Nein                |
| Hintere Box                | https://www.backbox.org                            | Nein                                | Ja                  |
| BlackArch-Linux            | https://blackarch.org                              | Ja                                  | Ja                  |
| Bluestar-Linux             | https://sourceforge.net/projects/bluestarlinux     | Nein                                | Ja                  |
| Bodhi-Linux                | https://www.bodhilinux.com                         | Nein                                | Ja                  |
| CentOS                     | https://centos.org                                 | Ja                                  | Nein                |
| CoreOS                     | http://coreos.com/                                 | Ja                                  | Nein                |
| Debian                     | https://debian.org                                 | Ja                                  | Ja                  |
| Tiefein                    | https://www.deepin.org                             | Nein                                | Ja                  |
| Devuan                     | https://devuan.org                                 | Ja                                  | Nein                |
| Elementares Betriebssystem | https://elementary.io                              | Nein                                | Ja                  |
| EndeavourOS                | https://endeavouros.com                            | Nein                                | Ja                  |
| Fatdog64                   | https://distro.ibiblio.org/fatdog/web/             | Nein                                | Ja                  |
| Fedora                     | https://fedoraproject.org                          | Ja                                  | Ja                  |
| Feren OS                   | https://ferenos.weebly.com/                        | Ja                                  | Nein                |
| Flatcar-Linux              | https://kinvolk.io/flatcar-container-linux/        | Ja                                  | Nein                |
| FreeBSD                    | https://freebsd.org                                | Ja, Disk-Image                      | Nein                |
| FreeDOS                    | http://www.freedos.org                             | ISO - Speicherdiskette              | Nein                |
| Garuda-Linux               | https://garudalinux.org/                           | Nein                                | Ja                  |
| Gentoo                     | https://gentoo.org                                 | Ja                                  | Ja                  |
| Mähdrescher                | https://harvesterhci.io                            | Ja                                  | Nein                |
| hrmpf                      | https://github.com/leahneukirchen/hrmpf/           | Nein                                | Ja                  |
| IPFire                     | https://www.ipfire.org                             | Ja                                  | Nein                |
| K3OS                       | https://k3os.io/                                   | Ja                                  | Ja                  |
| Kali-Linux                 | https://www.kali.org                               | Ja                                  | Ja                  |
| KDE-Neon                   | https://neon.kde.org                               | Nein                                | Ja                  |
| Kodachi                    | https://www.digi77.com/linux-kodachi/              | Nein                                | Ja                  |
| Linux Lite                 | https://www.linuxliteos.com                        | Nein                                | Ja                  |
| LXLE                       | https://lxle.net/                                  | Nein                                | Ja                  |
| Mageia                     | https://www.mageia.org                             | Ja                                  | Nein                |
| Manjaro                    | https://manjaro.org                                | Nein                                | Ja                  |
| Minze                      | https://linuxmint.com                              | Nein                                | Ja                  |
| Microsoft Windows          | https://www.microsoft.com                          | Vom Benutzer bereitgestellte Medien | Nein                |
| MirOS                      | https://www.mirbsd.org                             | Ja                                  | Nein                |
| Nitrux                     | https://nxos.org/                                  | Nein                                | Ja                  |
| NixOS                      | https://nixos.org                                  | Ja                                  | Nein                |
| OpenBSD                    | https://openbsd.org                                | Ja                                  | Nein                |
| openEuler                  | https://openeuler.org                              | Ja                                  | Nein                |
| OpenSUSE                   | https://opensuse.org                               | Ja                                  | Nein                |
| Oracle-Linux               | https://www.oracle.com/linux/                      | Ja                                  | Installateur        |
| Papageiensicherheit        | https://www.parrotsec.org                          | Nein                                | Ja                  |
| Pfefferminze               | https://peppermintos.com                           | Nein                                | Ja                  |
| Pop-OS                     | https://system76.com/pop                           | Nein                                | Ja                  |
| Proxmox VE                 | https://www.proxmox.com/                           | Ja                                  | Nein                |
| Q4OS                       | https://q4os.org                                   | Nein                                | Ja                  |
| Raizo                      | https://sourceforge.net/projects/live-raizo/       | Nein                                | Ja                  |
| RancherOS                  | https://rancher.com/rancher-os                     | Ja                                  | Nein                |
| Red Hat Enterprise Linux   | https://www.redhat.com                             | Vom Benutzer bereitgestellte Medien | Nein                |
| Regolith                   | https://regolith-linux.org                         | Nein                                | Ja                  |
| Rockiges Linux             | https://rockylinux.org/                            | Ja                                  | Nein                |
| Wissenschaftliches Linux   | https://scientificlinux.org                        | Ja                                  | Nein                |
| September                  | https://septor.sourceforge.io                      | Nein                                | Ja                  |
| Slackware                  | https://www.slackware.com                          | Ja                                  | Nein                |
| SmartOS                    | https://www.joyent.com/smartos                     | Ja                                  | Nein                |
| SparkyLinux                | https://sparkylinux.org/                           | Nein                                | Ja                  |
| Schwänze                   | https://tails.boum.org/                            | Nein                                | Ja                  |
| Talos                      | https://www.talos.dev/                             | Ja                                  | Nein                |
| Tiny-Core-Linux            | https://tinycorelinux.net                          | Ja                                  | Ja                  |
| Ubuntu                     | https://www.ubuntu.com                             | Ja                                  | Ja                  |
| VMware                     | https://www.vmware.com                             | Vom Benutzer bereitgestellte Medien | Nein                |
| Reisender                  | https://voyagerlive.org                            | Nein                                | Ja                  |
| VyOS                       | https://vyos.io                                    | Ja                                  | Nein                |
| Zen-Installer              | https://sourceforge.net/projects/revenge-installer | Ja                                  | Nein                |
| Zorin OS                   | https://zorinos.com                                | Nein                                | Ja                  |

### Dienstprogramme

| Name                      | URL                                                          | Typ                    |
| ------------------------- | ------------------------------------------------------------ | ---------------------- |
| 4MLinux                   | https://4mlinux.com/                                         | Kernel/Initrd          |
| ALT Linux-Rettung         | https://en.altlinux.org/Rescue                               | ISO - Speicherdiskette |
| BakAndImgCD               | https://bakandimgcd.4mlinux.com/                             | Kernel/Initrd          |
| Boot-Reparatur-CD         | https://sourceforge.net/projects/boot-repair-cd/             | Live-CD                |
| Einbrechen                | http://www.advancedclustering.com/products/software/breakin/ | Kernel/Initrd          |
| CAINE                     | https://www.caine-live.net/                                  | Live-CD                |
| Klonzilla                 | http://www.clonezilla.org/                                   | Live-CD                |
| DBAN                      | http://www.dban.org/                                         | Kernel                 |
| Gepart                    | http://gparted.org                                           | Live-CD                |
| Grml                      | http://grml.org                                              | Live-CD                |
| Kaspersky Rescue Disk     | https://support.kaspersky.com/viruses/krd18                  | Live-CD                |
| Speichertest              | http://www.memtest.org/                                      | Kernel                 |
| MemTest86 kostenlos       | https://www.memtest86.com                                    | USB-Bild               |
| Rettung wiederholen       | http://redorescue.com/                                       | Live-CD                |
| Rescatux                  | https://www.supergrubdisk.org/rescatux/                      | Live-CD                |
| Rescuezilla               | https://rescuezilla.com/                                     | Live-CD                |
| ShredOS                   | https://github.com/PartialVolume/shredos.x86_64              | Kernel                 |
| Super Grub2-Festplatte    | http://www.supergrubdisk.org                                 | ISO - Speicherdiskette |
| Systemrettung             | https://system-rescue.org/                                   | Live-CD                |
| Die kleinste Server-Suite | https://thesss.4mlinux.com/                                  | Kernel/Initrd          |
| Ultimative Boot-CD        | http://www.ultimatebootcd.com                                | ISO - Speicherdiskette |

### Was sind einige gute Ressourcen, um mehr über das Booten von Netzwerken zu erfahren?

* [Das iPXE-Projekt](http://ipxe.org/)
* [NetworkBoot.org](http://networkboot.org/)
* [Syslinux-Projekt](http://www.syslinux.org/wiki/index.php?title=The_Syslinux_Project)
