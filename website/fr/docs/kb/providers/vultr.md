---
id: vultr
title: "Vultr"
description: "Utilisation de netboot.xyz avec Vultr"
hide_table_of_contents: vrai
---

[Vultr](http://www.vultr.com/?ref=6870843) offre un excellent support pour l'utilisation de netboot.xyz dès la sortie de la boîte.

:::info
Si vous n'avez pas encore créé de compte Vultr, veuillez utiliser notre lien d'affiliation [ici](http://www.vultr.com/?ref=6870843). Cela nous aidera à nous fournir des ressources de test pour améliorer ce projet !
:::

### Démarrer à partir de l'ISO

Une fois que vous êtes connecté à la console, sélectionnez les ISO.  Dans la zone URL distantes, entrez l'URL d'un ISO netboot.xyz et appuyez sur upload :

    https://boot.netboot.xyz/ipxe/netboot.xyz.iso

Revenez à l'écran principal de la console et appuyez sur "Déployer une nouvelle instance". Suivez ces étapes :

* Sélectionnez _Personnalisé_ pour le système d'exploitation
* Sélectionnez l'ISO que vous avez téléchargé
* Cliquez _Passer la commande_

L'instance devrait être en ligne dans quelques minutes.  Une fois en ligne, rendez-vous sur la page compte principal qui répertorie toutes vos instances.  Cliquez sur _Gérer_ à côté de l'instance que vous venez de lancer, puis cliquez sur _Afficher la console_ sous _Actions du serveur_. Lorsque la console apparaît, vous devriez voir le menu netboot.xyz iPXE.

Une fois l'installation du système d'exploitation terminée, sélectionnez _Custom ISO_ sur la page Server Manager et cliquez sur _Remove ISO_.  L'ISO sera supprimée de votre instance et elle redémarrera.

### Démarrer à partir de l'URL de la chaîne iPXE

L'utilisation d'une URL de chaîne iPXE peut être plus simple pour certains utilisateurs.  Suivez ces étapes:

* Cliquez sur _Déployer une nouvelle instance_
* Sélectionnez _Personnalisé_ pour le système d'exploitation
* Sélectionnez _iPXE_ dans la section ISO virtuelle
* Définissez l'URL de la chaîne sur `https://boot.netboot.xyz`
* Cliquez _Passer la commande_

L'instance démarrera en quelques minutes.  Une fois qu'il démarre, vous aurez cinq minutes pour lancer une console et choisir une option dans le menu netboot.xyz :

* Revenez à la page d'accueil de votre compte avec vos instances répertoriées
* Cliquez sur _Gérer_ à côté de l'instance que vous venez de lancer
* Cliquez sur _Afficher la console_ dans la section _Actions du serveur_
* Choisissez le système d'exploitation que vous souhaitez déployer dans le menu netboot.xyz
* Terminer l'installation du système d'exploitation

Une fois l'installation terminée, redémarrez l'instance comme vous le feriez normalement Vultr redémarrera automatiquement votre machine virtuelle dans le système d'exploitation que vous déployé.

### Démarrage à partir d'iPXE sur un serveur Vultr Bare Metal

Sur Vultr Bare Metal, vous pouvez trouver les options iPXE dans l'onglet iPXE de la section Type de serveur.

* Définissez l'URL de la chaîne sur `https://boot.netboot.xyz`

Assurez-vous d'utiliser des images héritées (PCBIOS) car Bare Metal ne prend pas en charge EFI pour le moment. Vous pouvez ensuite charger la console et utiliser le menu à partir de là.