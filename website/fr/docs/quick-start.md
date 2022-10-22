---
id: démarrage rapide
title: Démarrage rapide
description: "Premiers pas avec netboot.xyz"
hide_table_of_contents: vrai
---

### Commencer

[Téléchargez](https://netboot.xyz/downloads/) l'un des chargeurs de démarrage netboot.xyz qui convient le mieux à votre situation et lancez le démarrage PXE de votre système d'exploitation préféré.  Les chargeurs de démarrage sont des versions précompilées de la dernière version de [iPXE](https://github.com/ipxe/ipxe) qui vous permettront de démarrer PXE en [https://boot.netboot.xyz](https://boot.netboot.xyz).  Si vous avez DHCP, il tentera automatiquement de démarrer à partir de DHCP.  Si vous devez définir une adresse IP statique, appuyez sur la touche « m » lors du démarrage pour le menu de sécurité intégrée et choisissez la configuration manuelle du réseau.

Vous pouvez consulter la section suivante intitulée [Méthodes de démarrage](https://netboot.xyz/docs/category/booting-methods) pour obtenir des instructions sur la configuration du chargeur de démarrage téléchargé.

Si vous avez déjà iPXE en cours d'exécution sur le réseau, vous pouvez cliquer sur charger le noyau netboot.xyz en tapant ce qui suit lorsqu'il est chargé dans un BIOS en mode hérité :

    chaîne --autofree http://boot.netboot.xyz/ipxe/netboot.xyz.lkrn

ou en mode BIOS EFI :

    chaîne --autofree http://boot.netboot.xyz/ipxe/netboot.xyz.efi

Cela chargera le noyau netboot.xyz approprié avec toutes les options appropriées activées.

:::Remarque

Si votre version d'iPXE a une prise en charge HTTPS compilée, vous pouvez récupérer ces images via HTTPS. Par défaut, le projet iPXE en amont ne se compile pas dans le support HTTPS.

:::

### Configuration requise

- Processeur i686, x86_64 ou aarch64
- 4 Go de RAM sont recommandés. Des quantités de mémoire inférieures peuvent être utilisées en fonction de la taille de la distribution. Certaines distributions doivent charger un disque virtuel en mémoire. Si vous rencontrez des problèmes lors du chargement des noyaux, c'est généralement l'une des premières choses à vérifier et à régler.
- Connexion Ethernet câblée, la prise en charge du Wi-Fi dans iPXE est limitée

### Code source

Le code source de netboot.xyz se trouve sur [Github](https://github.com/netbootxyz/netboot.xyz).

### Contribuant

Sortie d'une nouvelle version d'un système d'exploitation ?  Vous en avez trouvé un qui démarre bien avec iPXE ?  Les demandes d'extraction sont les bienvenues et encouragées et aident énormément !  N'hésitez pas à émettre une demande d'extraction de nouvelles versions ou d'outils que vous pourriez trouver utiles.  Une fois fusionné dans le maître, [Github Actions](https://github.com/netbootxyz/netboot.xyz/actions) régénérera les nouvelles versions de [iPXE à partir de l'amont](https://github.com/ipxe/ipxe) et déploiera les dernières modifications sur netboot.xyz.  En savoir plus sur la contribution [ici](https://netboot.xyz/docs/contributing).

### Tester de nouvelles fonctionnalités

Sous le menu **Utilitaires** sur netboot.xyz, il y a une option pour ["points de terminaison netboot.xyz"](https://github.com/netbootxyz/netboot.xyz/blob/development/roles/netbootxyz/templates/menu/nbxyz.ipxe.j2).  Les fonctionnalités ou les modifications qui ont été fusionnées dans la branche de développement peuvent être chargées ici pour être testées avant d'être fusionnées en production.

### Communication

N'hésitez pas à ouvrir un [numéro](https://github.com/netbootxyz/netboot.xyz/issues/new/choose) sur Github ou à nous rejoindre sur notre serveur [Discord](https://discord.gg/An6PA2a).  Suivez-nous sur [Twitter](https://twitter.com/netbootxyz) ou aimez-nous sur [Facebook](https://www.facebook.com/netboot.xyz)!
