---
id: pile ouverte
title: "Pile ouverte"
description: "Utilisation de netboot.xyz avec OpenStack"
hide_table_of_contents: vrai
---

**Expérimental, je n'ai pas eu l'occasion de parcourir cela récemment, donc YMMV.**

L'image ISO netboot.xyz peut être utilisée avec les clouds OpenStack pour démarrer une instance et effectuer une installation personnalisée d'un système d'exploitation.

### Ligne de commande

Commencez par télécharger l'ISO, puis importez-la dans le regard :

    $ wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso
    $ coup d'oeil image-create --name netboot.xyz \
        --disk-format iso \
        --container-format bare \
        - -file netboot.xyz-dhcp.iso \
        --visibility public
    +------------------+-------------- ------------------------+
    | Propriété | Valeur |
    +------------------+-------------------------------------- ---------+
    | somme de contrôle | 45cdcb89576b6c05598b11585aef46bc |
    | format_conteneur | nu |
    | créé_à | 2016-01-27T20:02:06Z |
    | format_disque | iso |
    | identifiant | 4f11d49e-157b-4740-87ad-db7d59bb5d6d |
    | min_disk | 0 |
    | min_ram | 0 |
    | nom | netboot.xyz |
    | propriétaire | fbfce4cb346c4f9097a977c54904cafd |
    | protégé | Faux |
    | taille | 1048576 |
    | statut | actif |
    | balises | [] |
    | mis à jour_at | 2016-01-27T20:02:04Z |
    | taille_virtuelle | Aucun |
    | visibilité | public |
    +------------------+-------------------------------------- ---------+

L'importation ne devrait prendre que quelques secondes.  Prenez l'UUID du champ `id` renvoyé par coup d'œil et vérifiez que l'image a été importée avec succès :

    $ coup d'oeil image-show 4f11d49e-157b-4740-87ad-db7d59bb5d6d
    +------------------------------+--------------- ------------------------+
    | Propriété | Valeur |
    +------------------+-------------------------------------- ---------+
    | somme de contrôle | 45cdcb89576b6c05598b11585aef46bc |
    | format_conteneur | nu |
    | créé_à | 2016-01-27T20:02:06Z |
    | format_disque | iso |
    | identifiant | 4f11d49e-157b-4740-87ad-db7d59bb5d6d |
    | min_disk | 0 |
    | min_ram | 0 |
    | nom | netboot.xyz |
    | propriétaire | fbfce4cb346c4f9097a977c54904cafd |
    | protégé | Faux |
    | taille | 1048576 |
    | statut | actif |
    | balises | [] |
    | mis à jour_at | 2016-01-27T20:02:04Z |
    | taille_virtuelle | Aucun |
    | visibilité | public |
    +------------------+-------------------------------------- ---------+

L'image a un statut de `actif`, donc nous savons que le regard l'a importée correctement.

Démarrons une nouvelle instance avec cet ISO :

    nova boot --flavor m1.small \
        --image <image-uuid-of-netbootxyz-image> \
        --nic net-id=<network-uuid> \
        netbootxyz-testing

Attendez environ 30 secondes, puis demandez une URL de console :

    nova get-spice-console c4ff017e-1234-4053-b740-e83eade277b9 épice-html5

Ouvrez l'URL de la console renvoyée par nova et vous devriez voir l'interface iPXE netboot.xyz familière dans la console Spice !

### Horizon

Commencez par [télécharger l'ISO netboot.xyz](https://boot.netboot.xyz/ipxe/netboot.xyz.iso) sur votre poste de travail local.  Suivez ces étapes pour importer l'image dans votre cloud OpenStack à l'aide d'Horizon :

* Cliquez sur l'onglet _Calculer_ sur le côté gauche, puis cliquez sur _Images_
* Cliquez sur _Créer une image_ (en haut à droite)
  * Nom : `netboot.xyz ISO`
  * Source de l'image : fichier image
  * Fichier image : (naviguez jusqu'à l'ISO que vous avez téléchargée)
  * Format : ISO - Image de disque optique
  * Public : coché (facultatif, mais recommandé si vous souhaitez que d'autres locataires l' )
* Cliquez sur _Créer une image_

Attendez un instant que l'état devienne `actif`. Cela ne devrait prendre que quelques secondes.  Pour démarrer une instance avec l'ISO que vous avez téléchargée, assurez-vous de choisir _Boot from image_ et sélectionnez _netboot.xyz ISO_ dans la liste déroulante. Configurez les groupes de mise en réseau et de sécurité comme vous le feriez normalement pour toute autre instance .

Lorsque l'instance est entièrement construite et passe à l'état actif, cliquez sur le nom de l'instance , puis accédez à l'onglet _Console_. Selon votre navigateur, vous devrez peut-être cliquer sur le lien pour afficher uniquement la console.

À ce stade, vous devriez pouvoir afficher le menu netboot.xyz iPXE et installer votre système d'exploitation.
