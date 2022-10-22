---
id: USB
title: Démarrage depuis USB
sidebar_label: Démarrage depuis USB
description: "Comment créer une clé USB capable de démarrer dans netboot.xyz"
hide_table_of_contents: vrai
---

:::danger
Sauvegardez vos données importantes avant d'écrire sur la clé USB car cela écrasera tout ce qui se trouve sur la clé USB.
:::

Téléchargez un disque USB netboot.xyz :

* [netboot.xyz](https://boot.netboot.xyz/ipxe/netboot.xyz.img)

## Créer une clé USB sous Linux

Insérez une clé USB dans votre ordinateur et recherchez le nom de l'appareil. Utilisez ensuite la commande suivante :

```shell
chat netboot.xyz.img > /dev/sdX
```

ou

```shell
jj if=netboot.xyz.img of=/dev/sdX
```

où sdX est votre clé USB.

La clé USB doit être prête à être éjectée une fois terminée.

## Créer une clé USB sur MacOS

__Courir:__

```shell
liste diskutil
```

pour obtenir la liste actuelle des appareils

___Insérez le support flash.___

__Courir:__

```shell
liste diskutil
```

à nouveau et déterminez le nœud de périphérique affecté à votre support flash (par exemple /dev/disk2).

__Courir:__

```shell
diskutil unmountDisk /dev/diskN
```

(remplacez N par le numéro de disque de la dernière commande ; dans l'exemple précédent, N serait 2).

__Exécuter:__

```shell
sudo dd if=netboot.xyz.img of=/dev/rdiskN bs=1m
```

* Utiliser /dev/rdisk au lieu de /dev/disk peut être plus rapide
* Si vous voyez l'erreur dd : nombre invalide '1m', vous utilisez GNU dd. Utilisez la même commande mais remplacez bs=1m par bs=1M
* Si vous voyez l'erreur dd: /dev/diskN : Ressource occupée, assurez-vous que le disque n'est pas utilisé. Démarrez 'Disk Utility.app' et démontez (ne pas éjecter) le lecteur

__Courir:__

```shell
diskutil éjecter /dev/diskN
```

et retirez votre support flash lorsque la commande est terminée.

## Créer une clé USB sous Windows

Découvrez [Rufus](https://rufus.akeo.ie/) pour installer le fichier IMG sur une clé USB.

## Démarrage

Une fois que vous avez créé votre clé, redémarrez et configurez votre BIOS pour qu'il charge d'abord la clé USB s'il n'est pas déjà configuré pour cela. Vous devriez voir iPXE se charger, soit charger netboot.xyz automatiquement, soit vous serez invité à configurer vos informations de mise en réseau.
