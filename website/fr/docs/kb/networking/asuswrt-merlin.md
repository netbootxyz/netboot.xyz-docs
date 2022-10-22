---
id: asuswrt-merlin
title: "Asuswrt-Merlin"
description: Utilisation d'Asuswrt-Merlin
hide_table_of_contents: vrai
---

Cela permettra aux périphériques hérités du BIOS et de l'UEFI de démarrer PXE dans le menu [netboot.xyz](https://github.com/netbootxyz/netboot.xyz) sur les périphériques Asuswrt-Merlin.

Supposons que votre routeur AsusWRT-Merlin est 192.168.1.1 ; Connectez-vous à l'interface graphique
1. LAN -> Serveur DHCP -> Config de base : réglez "Activer le serveur DHCP" sur Oui ; Adresse de départ du groupe IP : 192.168.1.2 ; Adresse de fin du pool IP : 192.168.1.254
2. Administration -> Système -> Service : définissez "Activer SSH" sur LAN uniquement
3. Administration -> Système -> Partition JFFS2 persistante : définissez "Activer les scripts et configurations personnalisés JFFS" sur Oui

:::Remarque

JFFS est une section inscriptible de la mémoire flash (la taille varie selon les modèles de routeur, les nouveaux modèles ayant un peu plus de 60 Mo d'espace disponible), qui vous permettra de stocker de petits fichiers (tels que des scripts) à l'intérieur du routeur sans besoin d'avoir un disque USB branché. Cet espace survivra au redémarrage (**mais il ne survivra peut-être PAS au flashage du micrologiciel, alors sauvegardez-le d'abord avant de flasher !**).

:::

4. Redémarrez le routeur à partir de l'interface graphique et attendez jusqu'à ce que vous puissiez cingler 192.168.1.1
5. `ssh nom_utilisateur@192.168.1.1`
6. `mkdir /jffs/tftproot`
7. `curl -o /jffs/tftproot/netboot.xyz.kpxe https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe`
8. `curl -o /jffs/tftproot/netboot.xyz.efi https://boot.netboot.xyz/ipxe/netboot.xyz.efi`
9. `touchez /jffs/configs/dnsmasq.conf.add`
10. `nano /jffs/configs/dnsmasq.conf.add` et ajoutez ce qui suit :

> enable-tftp  
> tftp-root=/jffs/tftproot  
> dhcp-match=set:bios,60,PXEClient:Arch:00000  
> dhcp-boot=tag:bios,netboot.xyz.kpxe,,192.168.1.1  
> dhcp-match=set:efi32,60,PXEClient:Arch:00002  
> dhcp-boot=tag:efi32,netboot.xyz.efi,,192.168.1.1  
> dhcp-match=set:efi32-1,60 ,PXEClient:Arch:00006  
> dhcp-boot=tag:efi32-1,netboot.xyz.efi,,192.168.1.1  
> dhcp-match=set:efi64,60,PXEClient:Arch:00007  
> dhcp-boot =tag:efi64,netboot.xyz.efi,,192.168.1.1  
> dhcp-match=set:efi64-1,60,PXEClient:Arch:00008  
> dhcp-boot=tag:efi64-1,netboot.xyz. efi,,192.168.1.1  
> dhcp-match=set:efi64-2,60,PXEClient:Arch:00009  
> dhcp-boot=tag:efi64-2,netboot.xyz.efi,,192.168.1.1

11. `redémarrez` et attendez jusqu'à ce que vous puissiez envoyer un ping à 192.168.1.1
12. à partir d'un autre appareil, confirmez que TFTP fonctionne sur le routeur

> `tftp 192.168.1.1`  
> tftp> `get netboot.xyz.kpxe`  
> 368 475 octets reçus en 0,5 seconde

13. Testez avec un périphérique UEFI et avec un périphérique BIOS hérité que le démarrage PXE fonctionne (vous avez peut-être activé le démarrage PXE dans le BIOS et/ou dans UEFI. Pour UEFI, vous devez généralement activer la pile réseau UEFI).

Références:

* https://programmingflow.com/2015/04/08/boot-any-machine-in-your-home-with-pxe.html
* https://netboot.xyz/docs/kb/networking/edgerouter
* https://github.com/RMerl/asuswrt-merlin.ng/wiki/Custom-config-files
