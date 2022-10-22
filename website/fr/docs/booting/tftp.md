---
id: TFTP
title: Démarrage à partir de TFTP
sidebar_label: Démarrage à partir de TFTP
description: "Méthodes de démarrage dans netboot.xyz à l'aide de TFTP et DHCP"
hide_table_of_contents: vrai
---

Si vous souhaitez utiliser netboot.xyz depuis votre réseau domestique ou professionnel, il est relativement facile à configurer.  Cela permettra à tous vos appareils de votre réseau d'avoir netboot.xyz disponible chaque fois que vous en aurez besoin en modifiant simplement l'ordre de démarrage sur votre appareil, en sélectionnant le démarrage du réseau ou en sélectionnant manuellement l'appareil à démarrer.

### Configuration du serveur DHCP

Vous devrez indiquer à votre serveur DHCP de fournir un "serveur suivant", l'adresse d'un serveur TFTP sur votre réseau, et un "nom de fichier", le fichier de démarrage [netboot.xyz](https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe).  Lorsque vos clients démarrent, s'ils sont configurés pour un démarrage réseau, ils obtiendront automatiquement une adresse DHCP valide, dérouleront le chargeur de démarrage iPXE netboot.xyz et chargeront le menu Système d'exploitation.

Exemple:

    serveur suivant "1.2.3.4"
    nom de fichier "netboot.xyz.kpxe"

Si vous utilisez [dnsmasq comme serveur DHCP](https://wiki.archlinux.org/index.php/dnsmasq#DHCP_server) ainsi que votre serveur TFTP, définir l'option next-server est aussi simple que d'ajouter la ligne suivante à `/etc/dnsmasq.conf`: 

    dhcp-option=66,0.0.0.0

`0.0.0.0` est analysé comme l'adresse de la machine exécutant dnsmasq.

### Configuration du serveur TFTP

Vous devrez configurer un serveur TFTP pour héberger les fichiers iPXE.  Il existe différents types de serveurs TFTP et ils fonctionnent généralement assez bien.  Vous pouvez également utiliser dnsmasq pour héberger les fichiers.

Si vous utilisez dnsmasq vous pouvez ajouter cette configuration à `/etc/dnsmasq.conf`:

    enable-tftp
    tftp-root=/var/lib/tftp
    dhcp-boot=netboot.xyz.kpxe

### Correction du service dnsmasq

Si vous exécutez systemd et que vous pouvez démarrer manuellement dnsmasq mais qu'il ne démarre pas au démarrage, vous devrez peut-être modifier la section [Unit] de `/lib/systemd/system/dnsmasq.service` en modifiant :

    Après=réseau.cible

à

    After=network-online.target

### Fichiers de démarrage réguliers et indivisibles

Si vous rencontrez des problèmes avec le chargeur de démarrage standard [netboot.xyz.kpxe](https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe) , vous pouvez essayer d'utiliser le chargeur de démarrage [netboot.xyz-undionly.kpxe](https://boot.netboot.xyz/ipxe/netboot.xyz-undionly.kpxe).  Le chargeur de démarrage standard inclut des pilotes de carte réseau communs dans l'image iPXE, tandis que le chargeur undionly se superposera au micrologiciel de démarrage de la carte réseau.
