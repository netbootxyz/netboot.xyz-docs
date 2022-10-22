---
id: introduction
title: Introduction
description: netboot.xyz utilise iPXE pour démarrer en réseau les programmes d'installation et les utilitaires du système d'exploitation à partir d'un menu facile à utiliser."
hide_table_of_contents: vrai
slug: /
---

[netboot.xyz](http://netboot.xyz) vous permet de démarrer [PXE](https://en.wikipedia.org/wiki/Preboot_Execution_Environment) divers programmes d'installation ou utilitaires de système d'exploitation à partir d'un seul outil sur le réseau. Cela vous permet d'utiliser un support pour de nombreux types de systèmes d'exploitation ou d'outils. Le projet [iPXE](http://ipxe.org/) est utilisé pour fournir un menu convivial à partir du BIOS qui vous permet de choisir facilement le système d'exploitation que vous voulez ainsi que tous les types spécifiques de versions ou d'indicateurs de démarrage.

Vous pouvez attacher à distance l'ISO aux serveurs, le configurer comme option de secours dans Grub, ou même configurer votre réseau domestique pour qu'il démarre par défaut afin qu'il soit toujours disponible.

![menu netboot.xyz](../static/img/netboot.xyz.gif)

## Présentation des menus

### Menu Installations réseau Linux

Pour les projets de système d'exploitation qui fournissent un programme d'installation amorçable sur le réseau, il s'agit d'une méthode d'installation légère car elle récupère un ensemble minimal de noyaux d'installation, puis installe les packages selon les besoins. Il s'agit généralement de la méthode d'installation du système d'exploitation la plus rapide. Vous pouvez également utiliser des outils intégrés pour faire des bottes de sauvetage.

### Menu Live CD/Distro

De nombreux projets de système d'exploitation fournissent leur logiciel sous forme d'ISO uniquement ou fournissent un CD/DVD Live que vous pouvez télécharger et démarrer en mémoire en modifiant le stockage de la machine. En règle générale, vous avez alors la possibilité d'effectuer une installation à partir du système en direct.  Il s'agit généralement d'installations plus lourdes et leur installation peut nécessiter beaucoup de bande passante. iPXE ne démarre généralement pas aussi bien les ISO directement.

Afin de faciliter la consommation de ces types d'images, nous surveillons les nouvelles mises à jour de version en amont, récupérons les versions, les extrayons et les republions avec les modifications de l'initrd nécessaires pour les rendre compatibles avec iPXE. Nous pouvons ensuite charger le noyau de plus petite taille directement en mémoire pour une expérience meilleure et plus cohérente.

### Menu Utilitaires

Le menu Utilitaires permet d'accéder à des outils et utilitaires pour des outils tels que le clonage de disque, l'effacement de disque ou d'autres types d'outils de secours. Vous pouvez également sélectionner d'autres points de terminaison netboot.xyz pour tester les menus qui peuvent être en cours de développement.

## Architectures prises en charge

netboot.xyz prend en charge les architectures x86 32 bits et 64 bits et les architectures arm64. Les menus identifient la plate-forme chargée et activent les options de menu en fonction de l'architecture chargée.
