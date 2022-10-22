---
id: vmware
title: Démarrer avec VMware
sidebar_label: Démarrer avec VMware
description: "Utilisation de netboot.xyz dans VMware pour installer une machine virtuelle"
hide_table_of_contents: vrai
---

### VMware Fusion

Ces instructions concernent la configuration de netboot.xyz dans une machine virtuelle sur VMware's Fusion for MacOS.

### Créer la machine virtuelle

* Ajoutez une nouvelle machine virtuelle.
* Sélectionnez "Installer à partir d'un disque ou d'une image".
* Cliquez sur "Utiliser un autre disque ou image disque...".
* Téléchargez et sélectionnez le netboot.xyz [ISO](https://boot.netboot.xyz/ipxe/netboot.xyz.iso).
* Sur l'écran Choisir le système d'exploitation, sélectionnez le type de système d'exploitation que vous prévoyez d'installer.  Si vous envisagez de tester plusieurs types d'installations, vous pouvez simplement choisir un système d'exploitation CentOS 64 bits.
* Cliquez sur "Personnaliser les paramètres" et donnez un nom à la machine virtuelle, comme "netboot.xyz".

Cela créera votre VM.

### Exécution de la machine virtuelle

_Vous devrez ajuster les paramètres de mémoire de la machine virtuelle pour vous assurer que vous disposez de suffisamment de mémoire pour exécuter les programmes d'installation du système d'exploitation en mémoire.  En règle générale, il est bon d'augmenter la mémoire jusqu'à 2 Go à 4 Go._

* Cliquez sur l'icône de clé à molette, puis sur Processeurs & Mémoire et augmentez la mémoire jusqu'à la quantité de mémoire souhaitée.
* Démarrez la machine virtuelle et vous devriez voir le chargeur netboot.xyz.
* Si vous déterminez que vous ne souhaitez plus démarrer à partir de netboot.xyz, vous pouvez soit modifier l'ordre de démarrage pour démarrer à partir du disque dur par défaut, soit supprimer l'ISO de la machine virtuelle.
