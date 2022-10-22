---
id: vapeur
title: Démarrage PXE sur le Steam Deck
sidebar_label: Pont à vapeur
description: Démarrage PXE sur le Steam Deck
hide_table_of_contents: vrai
---

## Aperçu

Ceci est un guide pour le démarrage PXE du [Valve Steam Deck](https://store.steampowered.com/steamdeck).

## Conditions

Pour obtenir le démarrage de Steam Deck vers PXE, vous aurez besoin de :

- [Hub USB-C](https://amzn.to/3zveSgu) prenant en charge Ethernet et USB
- Clavier USB
- Ethernet câblé

Connectez le concentrateur, l'Ethernet et l'alimentation au Steam Deck. La première chose à faire est de configurer le BIOS pour permettre le démarrage PXE.

## Configuration du BIOS

Pour afficher les menus du Steam Deck Boot Loader, fermez le Steam Deck et :

- Maintenez enfoncé `Volume +`, tout en appuyant sur le bouton d'alimentation `sur` pour accéder au gestionnaire de démarrage, à l'utilitaire de configuration et au démarrage à partir du menu Fichier. (`Volume -` n'affichera que le gestionnaire de démarrage)
- Sélectionnez Setup Utility pour accéder à la configuration.
- Descendez jusqu'à l'onglet Boot sur la gauche et modifiez ces paramètres :
  - Démarrage rapide : désactivé
  - Démarrage silencieux : désactivé
  - Capacité de démarrage PXE : UEFI : IPv4 (peut être modifié en fonction de votre réseau)
  - Ajouter des options de démarrage : d'abord
- Sélectionnez Quitter et Quitter en enregistrant les modifications.

## Démarrage PXE

Le Steam Deck va maintenant redémarrer et vous verrez maintenant le test de mémoire car le démarrage silencieux a été désactivé. Si votre hub est correctement connecté au réseau et que vous avez DHCP sur le réseau, vous devriez voir :

```shell
>>Démarrer PXE sur IPv4...
```

À ce stade, vous devriez pouvoir démarrer PXE une image UEFI.

Utilisez le:

- [noyau UEFI netboot.xyz](https://boot.netboot.xyz/ipxe/netboot.xyz.efi)
- Définissez DHCP [next-server](https://netboot.xyz/docs/booting/tftp) sur le serveur TFTP et le nom de fichier sur l'image UEFI netboot.xyz sur le serveur DHCP

S'il vous arrive de casser le Steam Deck lors du test des systèmes d'exploitation ou de le bricoler, vous pouvez suivre les instructions de récupération du Steam Deck [ici](https://help.steampowered.com/en/faqs/view/1B71-EDF2-EB6D-2BB3).

Si vous souhaitez rétablir les paramètres par défaut du BIOS, vous pouvez charger la sauvegarde du BIOS, sélectionner Restaurer les paramètres par défaut et quitter l'enregistrement des modifications. Cela ramènera le Steam Deck à son comportement d'origine.