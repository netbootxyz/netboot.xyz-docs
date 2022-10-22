---
id: FAQ
title: Foire aux questions (FAQ)
sidebar_label: FAQ
description: "Foire aux questions sur le projet netboot.xyz"
hide_table_of_contents: vrai
---

### Qu'est-ce que c'est?
netboot.xyz est un outil qui vous permet de démarrer le programme d'installation de votre système d'exploitation préféré ou divers utilitaires sur le réseau avec une surcharge minimale et le tout à partir d'un système de menu unique.  Il est similaire à divers outils de netbooting du passé comme boot.kernel.org avec beaucoup plus de flexibilité.  Le chargeur de démarrage est très léger avec une taille inférieure à 1 Mo, ce qui se traduit par un temps très rapide pour créer une clé USB.

### Comment cela marche-t-il?
netboot.xyz utilise un outil open source appelé iPXE.  Le chargeur de démarrage appelle un serveur Web qui héberge les fichiers source iPXE.  Les fichiers source iPXE contiennent des menus et une logique qui comprennent le fonctionnement des différents programmes d'installation Linux.  Lorsque vous sélectionnez un système d'exploitation, netboot.xyz récupère les images du répertoire du projet lorsque cela est possible ou des miroirs performants connus et approuvés.  L'emplacement à partir duquel le fichier est extrait est toujours affiché lors de la récupération.

### Qu'est-ce que le démarrage PXE ?
PXE signifie **P**re-Boot e**X**ecution **E**nvironment.  Le démarrage PXE est utilisé depuis des années pour permettre aux clients de démarrer à partir d'un serveur sur le réseau.  Il vous donne la possibilité d'automatiser un système à l'intérieur du BIOS avant qu'il ne démarre son disque dur, ce qui ouvre la porte à l'exécution de machines sans état sans avoir à utiliser le stockage dans le système.  Le démarrage PXE est utilisé dans de nombreuses applications, mais son utilisation la plus courante consiste à automatiser l'installation d'un système nu ou d'une machine virtuelle.

### Ma distribution préférée fonctionnera-t-elle avec netboot.xyz ?
Habituellement, vous avez besoin de trois choses pour démarrer un système d'exploitation sur le réseau, le vmlinuz, l'initramfs et le rootfs.  Les distributions qui prennent en charge un noyau d'installation hébergé sur un miroir sont généralement les plus faciles à implémenter car elles sont très légères.  Les distributions qui ne libèrent que des ISO sont généralement un peu plus compliquées à implémenter car nous devons utiliser memdisk pour le charger en mémoire.

De [syslinux - memdisk](http://www.syslinux.org/wiki/index.php/MEMDISK): La majorité des images de CD basées sur Linux ne fonctionneront pas non plus avec l'émulation ISO MEMDISK. Les distributions Linux nécessitent que les fichiers kernel et initrd soient spécifiés, dès que ces fichiers sont chargés, le ou les pilotes du noyau en mode protégé prennent le contrôle et le CD virtuel ne sera plus accessible. Si d'autres fichiers sont requis sur le CD/DVD, ils seront manquants, ce qui entraînera des erreurs de démarrage. Les distributions Linux qui ne nécessitent que des fichiers noyau et initrd fonctionnent entièrement via l'émulation ISO, car aucune autre donnée n'a besoin d'accéder à partir du lecteur de CD/DVD virtuel une fois qu'elles ont été chargées. Le chargeur de démarrage a lu tous les fichiers nécessaires en mémoire en utilisant INT 13h, avant de démarrer le noyau.

Pour contourner ces limitations, d'autant plus que memdisk n'est pas pris en charge avec UEFI, nous avons construit un système CI/CD qui consomme les ISO des projets en amont et prépare les fichiers nécessaires pour démarrer le système d'exploitation à distance en tant que version.  Dans certains cas, cela peut impliquer une petite modification des scripts d'initialisation afin d'ajuster la flexibilité de démarrage du réseau ou de gérer plusieurs parties pour les systèmes d'exploitation plus importants.  Ces versions sont ajoutées à endpoints.yml dans le référentiel principal netboot.xyz et sont ensuite disponibles au téléchargement.

Vous pouvez en savoir plus sur notre système de construction [ici](https://github.com/netbootxyz/build-pipelines/blob/master/README.md).

### Ma distribution utilise des ISO pour la livraison, comment puis-je voir si elles fonctionnent ?
Vous pouvez effectuer une vérification rapide en chargeant netboot.xyz dans un environnement virtuel baremetal.  Assurez-vous d'avoir suffisamment de RAM lorsque vous chargez l'ISO dans la RAM.  Sélectionnez ensuite la ligne de commande iPXE et entrez ce qui suit ;

    noyau https://boot.netboot.xyz/memdisk iso brut
    initrd http://url/to/iso
    démarrage

Cela devrait charger l'ISO et si vous le faites jusqu'au programme d'installation, super, votre système d'exploitation peut fonctionner.  S'il échoue pendant le chargement d'initramfs en essayant de charger le périphérique CD, il a le problème de ne pas pouvoir trouver l'ISO en mémoire.

### Puis-je créer mes propres configurations ?

Oui!  Vous pouvez bifurquer [netboot.xyz-custom](https://github.com/netbootxyz/netboot.xyz-custom) et créer votre propre menu.  Vous pouvez ensuite définir votre utilisateur Github à partir du menu Utilitaire et votre menu apparaîtra dans le menu principal.  Si vous ne souhaitez pas définir votre utilisateur à chaque fois, vous pouvez personnaliser la compilation du code iPXE netboot.xyz et inclure votre github_user lors de la compilation.  Cela vous permet de créer votre propre menu sans l'entretien de tout le reste.

### Netboot.xyz prend-il en charge le démarrage sécurisé ?

iPXE et donc netboot.xyz ne prend pas en charge le démarrage sécurisé car ses [fichiers binaires ne sont pas signés par Microsoft](https://ipxe.org/appnote/etoken). Vous devez désactiver le mode Secure Boot dans le menu de configuration du micrologiciel de votre ordinateur avant de pouvoir démarrer netboot.xyz.

### Quels systèmes d'exploitation sont actuellement disponibles sur netboot.xyz ?

#### Systèmes d'exploitation

| Nom                                | URL                                                | Noyau d'installation             | Système d'exploitation en direct |
| ---------------------------------- | -------------------------------------------------- | -------------------------------- | -------------------------------- |
| AlmaLinux                          | https://almalinux.org/                             | Oui                              | Non                              |
| Alpin Linux                        | https://alpinelinux.org                            | Oui                              | Non                              |
| Anarchie Linux                     | https://anarchyinstaller.org                       | Oui                              | Non                              |
| Arch Linux                         | https://www.archlinux.org                          | Oui                              | Non                              |
| Boîte arrière                      | https://www.backbox.org                            | Non                              | Oui                              |
| Black Arch Linux                   | https://blackarch.org                              | Oui                              | Oui                              |
| Bluestar Linux                     | https://sourceforge.net/projects/bluestarlinux     | Non                              | Oui                              |
| Bodhi-Linux                        | https://www.bodhilinux.com                         | Non                              | Oui                              |
| CentOS                             | https://centos.org                                 | Oui                              | Non                              |
| CoreOS                             | http://coreos.com/                                 | Oui                              | Non                              |
| DebianName                         | https://debian.org                                 | Oui                              | Oui                              |
| Profond dans                       | https://www.deepin.org                             | Non                              | Oui                              |
| Devuan                             | https://devuan.org                                 | Oui                              | Non                              |
| Système d'exploitation élémentaire | https://elementary.io                              | Non                              | Oui                              |
| EndeavourOS                        | https://endeavouros.com                            | Non                              | Oui                              |
| Fatdog64                           | https://distro.ibiblio.org/fatdog/web/             | Non                              | Oui                              |
| Feutre                             | https://fedoraproject.org                          | Oui                              | Oui                              |
| Feren OS                           | https://ferenos.weebly.com/                        | Oui                              | Non                              |
| Flatcar Linux                      | https://kinvolk.io/flatcar-container-linux/        | Oui                              | Non                              |
| FreeBSD                            | https://freebsd.org                                | Oui, image disque                | Non                              |
| FreeDOS                            | http://www.freedos.org                             | ISO - Disque mémoire             | Non                              |
| GarudaLinux                        | https://garudalinux.org/                           | Non                              | Oui                              |
| Gentoo                             | https://gentoo.org                                 | Oui                              | Oui                              |
| Moissonneuse                       | https://harvesterhci.io                            | Oui                              | Non                              |
| hrmpf                              | https://github.com/leahneukirchen/hrmpf/           | Non                              | Oui                              |
| IPFire                             | https://www.ipfire.org                             | Oui                              | Non                              |
| K3OS                               | https://k3os.io/                                   | Oui                              | Oui                              |
| Kali Linux                         | https://www.kali.org                               | Oui                              | Oui                              |
| KDE NéonComment                    | https://neon.kde.org                               | Non                              | Oui                              |
| Kodachi                            | https://www.digi77.com/linux-kodachi/              | Non                              | Oui                              |
| Linux Lite                         | https://www.linuxliteos.com                        | Non                              | Oui                              |
| LXLE                               | https://lxle.net/                                  | Non                              | Oui                              |
| Magie                              | https://www.mageia.org                             | Oui                              | Non                              |
| Manjaro                            | https://manjaro.org                                | Non                              | Oui                              |
| menthe                             | https://linuxmint.com                              | Non                              | Oui                              |
| Microsoft Windows                  | https://www.microsoft.com                          | Support fourni par l'utilisateur | Non                              |
| MirOS                              | https://www.mirbsd.org                             | Oui                              | Non                              |
| Nitrux                             | https://nxos.org/                                  | Non                              | Oui                              |
| NixOS                              | https://nixos.org                                  | Oui                              | Non                              |
| OpenBSD                            | https://openbsd.org                                | Oui                              | Non                              |
| openEuler                          | https://openeuler.org                              | Oui                              | Non                              |
| OuvrirSUSE                         | https://opensuse.org                               | Oui                              | Non                              |
| OracleLinux                        | https://www.oracle.com/linux/                      | Oui                              | Installateur                     |
| Sécurité perroquet                 | https://www.parrotsec.org                          | Non                              | Oui                              |
| Menthe poivrée                     | https://peppermintos.com                           | Non                              | Oui                              |
| Système d'exploitation pop         | https://system76.com/pop                           | Non                              | Oui                              |
| Proxmox VE                         | https://www.proxmox.com/                           | Oui                              | Non                              |
| Q4OS                               | https://q4os.org                                   | Non                              | Oui                              |
| Raizo                              | https://sourceforge.net/projects/live-raizo/       | Non                              | Oui                              |
| RancherOS                          | https://rancher.com/rancher-os                     | Oui                              | Non                              |
| Red Hat Enterprise Linux           | https://www.redhat.com                             | Support fourni par l'utilisateur | Non                              |
| Régolithe                          | https://regolith-linux.org                         | Non                              | Oui                              |
| Rocheux Linux                      | https://rockylinux.org/                            | Oui                              | Non                              |
| Linux scientifique                 | https://scientificlinux.org                        | Oui                              | Non                              |
| Septeur                            | https://septor.sourceforge.io                      | Non                              | Oui                              |
| Slackware                          | https://www.slackware.com                          | Oui                              | Non                              |
| Smart OS                           | https://www.joyent.com/smartos                     | Oui                              | Non                              |
| SparkyLinux                        | https://sparkylinux.org/                           | Non                              | Oui                              |
| Queues                             | https://tails.boum.org/                            | Non                              | Oui                              |
| Talos                              | https://www.talos.dev/                             | Oui                              | Non                              |
| Minuscule noyau Linux              | https://tinycorelinux.net                          | Oui                              | Oui                              |
| Ubuntu                             | https://www.ubuntu.com                             | Oui                              | Oui                              |
| VMware                             | https://www.vmware.com                             | Support fourni par l'utilisateur | Non                              |
| Voyageur                           | https://voyagerlive.org                            | Non                              | Oui                              |
| VyOS                               | https://vyos.io                                    | Oui                              | Non                              |
| Installateur Zen                   | https://sourceforge.net/projects/revenge-installer | Oui                              | Non                              |
| Système d'exploitation Zorin       | https://zorinos.com                                | Non                              | Oui                              |

### Utilitaires

| Nom                              | URL                                                          | Taper                |
| -------------------------------- | ------------------------------------------------------------ | -------------------- |
| 4MLinux                          | https://4mlinux.com/                                         | Noyau/Initrd         |
| Sauvetage ALT Linux              | https://en.altlinux.org/Rescue                               | ISO - Disque mémoire |
| BakAndImgCD                      | https://bakandimgcd.4mlinux.com/                             | Noyau/Initrd         |
| CD de réparation de démarrage    | https://sourceforge.net/projects/boot-repair-cd/             | CD en direct         |
| Roder                            | http://www.advancedclustering.com/products/software/breakin/ | Noyau/Initrd         |
| CAIN                             | https://www.caine-live.net/                                  | CD en direct         |
| Clonezilla                       | http://www.clonezilla.org/                                   | CD en direct         |
| DBAN                             | http://www.dban.org/                                         | Noyau                |
| GParted                          | http://gparted.org                                           | CD en direct         |
| Grml                             | http://grml.org                                              | CD en direct         |
| Kaspersky Rescue Disk            | https://support.kaspersky.com/viruses/krd18                  | CD en direct         |
| Memtest                          | http://www.memtest.org/                                      | Noyau                |
| MemTest86 Gratuit                | https://www.memtest86.com                                    | Image USB            |
| Refaire le sauvetage             | http://redorescue.com/                                       | CD en direct         |
| Rescatux                         | https://www.supergrubdisk.org/rescatux/                      | CD en direct         |
| Rescuezilla                      | https://rescuezilla.com/                                     | CD en direct         |
| ShredOS                          | https://github.com/PartialVolume/shredos.x86_64              | Noyau                |
| Disque Super Grub2               | http://www.supergrubdisk.org                                 | ISO - Disque mémoire |
| Sauvetage du système             | https://system-rescue.org/                                   | CD en direct         |
| La plus petite suite de serveurs | https://thesss.4mlinux.com/                                  | Noyau/Initrd         |
| CD de démarrage ultime           | http://www.ultimatebootcd.com                                | ISO - Disque mémoire |

### Quelles sont les bonnes ressources pour en savoir plus sur le démarrage réseau ?

* [Le projet iPXE](http://ipxe.org/)
* [NetworkBoot.org](http://networkboot.org/)
* [Projet Syslinux](http://www.syslinux.org/wiki/index.php?title=The_Syslinux_Project)
