---
id: edgerouteur
title: "Ubiquiti EdgeRouter"
description: Ubiquiti EdgeRouter Utilisation
hide_table_of_contents: vrai
---

Ce document explique comment configurer netboot.xyz, un service qui fournit installation basée sur iPXE et un démarrage en direct d'un tas de systèmes d'exploitation, sur un Ubiquiti EdgeRouter.

Merci à [Sam Kottler](https://github.com/skottler) pour avoir initialement écrit ce guide pratique. Améliorez la robustesse de la configuration en utilisant le démon TFTP intégré de dnsmasq par [Yan Grunenberger](https://github.com/ravens) au lieu du package TFTP externe.

### Hypothèses

J'ai fait quelques hypothèses tout au long de ce document qui seront probablement différentes pour votre configuration :

* Il existe un pool DHCP appelé `LAN`
* Le pool `LAN` gère `10.10.2.0/24`

### Configurer le support tftp dans dnsmasq

Par défaut, dnsmasq utilise dans Edgerouter pour fournir des services DNS. Pour l'activer :

```bash
sudo mkdir /config/user-data/tftproot
sudo chmod ugo+rX /config/user-data/tftproot

configure

set service dns forwarding options enable-tftp
set service dns forwarding options tftp-root=/config/user- données/tftproot

validation
sauvegarde
```

### Configurer les composants TFTP

Téléchargez l'image kpxe pour netboot.xyz et définissez correctement les autorisations :

```bash
sudo curl -o /config/user-data/tftproot/netboot.xyz.kpxe https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe
sudo chmod ugo+r /config/user-data/tftproot/ netboot.xyz.kpxe
```

À ce stade, vous devriez pouvoir utiliser un client TFTP à partir d'un client en `10.10.2.0/24` pour récupérer l'image :

```bash
$ tftp 10.10.2.1
tftp> get netboot.xyz.kpxe
354972 octets reçus en 2,0 secondes
```

### Configurer DHCP

Nous allons configurer DHCP sur l'EdgeRouter pour servir les bons paramètres à  clients :

```bash
configure

set service dhcp-server global-parameters "option client-arch code 93 = entier non signé 16 ;"
edit service dhcp-server nom-réseau-partagé sous-réseau LAN 10.10.2.0/24
set bootfile-server 10.10.2.1
set bootfile-name netboot.xyz.kpxe

commit
save
```

La configuration du pool `LAN` devrait maintenant ressembler à ceci :

```bash
skottler@edge1# show service dhcp-server nom-réseau-partagé LAN
 autorité enable
 sous-réseau 10.10.2.0/24 {
     bootfile-name netboot.xyz.kpxe
     bootfile-server 10.10.2.1
     default-router 10.10.2.1
     dns-server 10.10.2.1
     bail 86400
     start 10.10.2.100 {
         stop 10.10.2.199
     }
 }
[edit]
```

C'est ça!

## La configuration avancée avec prise en charge de Legacy et UEFI

### Utilisation du DHCP ISC

Cette section a été rédigée par [Skyler Mäntysaari](https://github.com/samip5).

Cela nécessite que vous n'utilisiez pas `set service dhcp-server use-dnsmasq enable`. Si vous l'utilisez, cela ne fonctionnera pas.

Nous allons commencer par supprimer les éléments liés au démarrage PXE des options dhcp-server, donc les commandes pour cela sont quelque chose comme :

```bash
delete service dhcp-server nom-réseau-partagé sous-réseau LAN 10.10.2.0/24 bootfile-name netboot.xyz.kpxe
delete service dhcp-server nom-réseau-partagé sous-réseau LAN 10.10.2.0/24 bootfile-server 10.10.2.1
```

Nous allons maintenant télécharger la version efi du fichier de boot si elle n'existe pas encore :
```
sudo curl -o /config/user-data/tftproot/netboot.xyz.efi https://boot.netboot.xyz/ipxe/netboot.xyz.efi
sudo chmod ugo+r /config/user-data/tftproot/ netboot.xyz.efi
```

Ensuite, nous allons créer un dossier de scripts pour les scripts, dans un stockage persistant (devrait persister lors des mises à niveau) :

```bash
mkdir --parents /config/user-data/scripts/pxe/
```

Ensuite, nous allons passer en mode de configuration et inclure le fichier de configuration principal de pxe :

```bash
set service dhcp-server global-parameters "deny bootp;"
set service dhcp-server global-parameters "include &quot;/config/user-data/scripts/pxe/option-space.conf&quot; ;"
set service dhcp-server shared-network-name LAN subnet 10.10.2.0/24 subnet-parameters "include &quot;/config/user-data/scripts/pxe/pxe.conf&quot; ;"
```

IL DOIT être tapé exactement comme ça, la partie "".

Le fichier /config/user-data/scripts/pxe/pxe.conf :

```bash
autoriser le démarrage ;
serveur suivant 10.10.2.1 ;

si option arch = 00:07 {
    nom de fichier "netboot.xyz.efi" ;
} elsif option arch = 00:00 {
    nom de fichier "netboot.xyz.kpxe" ;
} else {
    nom de fichier "netboot.xyz.efi" ;
}
```

Le fichier /config/user-data/scripts/pxe/option-space.conf :

```bash
# Declare the iPXE/gPXE/Etherboot option space
option space ipxe;
option ipxe-encap-opts code 175 = encapsulate ipxe;

# iPXE options, can be set in DHCP response packet
option ipxe.priority         code   1 = signed integer 8;
option ipxe.keep-san         code   8 = unsigned integer 8;
option ipxe.skip-san-boot    code   9 = unsigned integer 8;
option ipxe.syslogs          code  85 = string;
option ipxe.cert             code  91 = string;
option ipxe.privkey          code  92 = string;
option ipxe.crosscert        code  93 = string;
option ipxe.no-pxedhcp       code 176 = unsigned integer 8;
option ipxe.bus-id           code 177 = string;
option ipxe.bios-drive       code 189 = unsigned integer 8;
option ipxe.username         code 190 = string;
option ipxe.password         code 191 = string;
option ipxe.reverse-username code 192 = string;
option ipxe.reverse-password code 193 = string;
option ipxe.version          code 235 = string;
option iscsi-initiator-iqn   code 203 = string;

# iPXE feature flags, set in DHCP request packet
option ipxe.pxeext    code 16 = unsigned integer 8;
option ipxe.iscsi     code 17 = unsigned integer 8;
option ipxe.aoe       code 18 = unsigned integer 8;
option ipxe.http      code 19 = unsigned integer 8;
option ipxe.https     code 20 = unsigned integer 8;
option ipxe.tftp      code 21 = unsigned integer 8;
option ipxe.ftp       code 22 = unsigned integer 8;
option ipxe.dns       code 23 = unsigned integer 8;
option ipxe.bzimage   code 24 = unsigned integer 8;
option ipxe.multiboot code 25 = unsigned integer 8;
option ipxe.slam      code 26 = unsigned integer 8;
option ipxe.srp       code 27 = unsigned integer 8;
option ipxe.nbi       code 32 = unsigned integer 8;
option ipxe.pxe       code 33 = unsigned integer 8;
option ipxe.elf       code 34 = unsigned integer 8;
option ipxe.comboot   code 35 = unsigned integer 8;
option ipxe.efi       code 36 = unsigned integer 8;
option ipxe.fcoe      code 37 = unsigned integer 8;
option ipxe.vlan      code 38 = unsigned integer 8;
option ipxe.menu      code 39 = unsigned integer 8;
option ipxe.sdi       code 40 = unsigned integer 8;
option ipxe.nfs       code 41 = unsigned integer 8;

# Other useful general options
# http://www.ietf.org/assignments/dhcpv6-parameters/dhcpv6-parameters.txt
option arch code 93 = unsigned integer 16;
```

Après tout ça, ça devrait être ça ! J'espère que cela aide.

### Utilisation de dnsmasq

Cette section a été rédigée par [Benjamin Reich](https://benjaminreich.de/).

Cette partie est requise si vous utilisez `set service dhcp-server use-dnsmasq enable`.

Connectez-vous via SSH et remplacez `SERVERIP` par l'adresse IP réelle.

```bash
configure
set service dhcp-server use-dnsmasq enable
set service dns forwarding options "dhcp-match=set:bios,60,PXEClient:Arch:00000"
set service dns forwarding options "dhcp-boot=tag:bios,netboot .xyz.kpxe,,SERVERIP"
options de transfert DNS de service définies "dhcp-match=set:efi32,60,PXEClient:Arch:00002"
options de transfert DNS de service définies "dhcp-boot=tag:efi32,netboot.xyz. efi,,SERVERIP"
options de transfert DNS du service "dhcp-match=set:efi32-1,60,PXEClient:Arch:00006"
options de transfert DNS du service "dhcp-boot=tag:efi32-1,netboot.xyz .efi,,SERVERIP"
définir les options de transfert DNS du service "dhcp-match=set:efi64,60,PXEClient:Arch:00007"
définir les options de transfert DNS du service "dhcp-boot=tag:efi64,netboot.xyz.efi, ,SERVERIP"
 définir les options de transfert DNS du service "dhcp-match=set:efi64-1,60,PXEClient:Arch:00008"
définir les options de transfert DNS du service "dhcp-boot=tag:efi64-1,netboot.xyz.efi ,,SERVERIP"
définir les options de transfert DNS du service "dhcp-match=set:efi64-2,60,PXEClient:Arch:00009"
se t options de transfert DNS du service "dhcp-boot=tag:efi64-2,netboot.xyz.efi,,SERVERIP"
commit ; enregistrer
```
