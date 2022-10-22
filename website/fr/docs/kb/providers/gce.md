---
id: GCE
title: Moteur de calcul Google
description: Utiliser netboot.xyz sur Google Compute Engine
hide_table_of_contents: vrai
---

## Utilisation avec netboot.xyz

**Expérimental, ne fonctionne actuellement sur aucune image qui utilise memdisk car la sortie de la console ne peut pas être modifiée.**

*Remarque : La fonctionnalité sera limitée car la console est Serial Over Lan.  Les distributions qui utilisent memdisk peuvent ne pas fournir de sortie tandis que d'autres distributions récupérées via le noyau permettent de modifier les paramètres de la console pendant le chargement.  Cela inclut la plupart des outils utilitaires.  Je vais probablement chercher à filtrer les options qui ne fonctionnent pas à l'avenir.  La console peut fonctionner pendant l'installation mais peut cesser de fonctionner au premier démarrage si elle n'est pas définie pendant l'installation.*

### Créer un compartiment

Définissez un nom pour votre bucket et sélectionnez la classe de stockage régionale.

Téléchargez l'image netboot.xyz-gce à partir de ce lien [](https://boot.netboot.xyz/ipxe/netboot.xyz-gce.tar.gz) à la racine de votre compartiment.

    gsutil cp $tmp/$image_name.tar.gz gs://$gs_bucket

### Créer une image

À l'aide de l'utilitaire gcloud ou de Google Cloud Shell, créez une image à partir du disque iPXE que vous avez importé à l'étape précédente :

    images de calcul gcloud créer $image_name --source-uri gs://$gs_bucket/$image_name.tar.gz

### Démarrer une instance

Démarrez une instance à partir de l'image que vous avez créée, assurez-vous d'activer le port série :

    création d'instances de calcul gcloud $instance_name --image $image_name --metadata serial-port-enable=1

### Connectez-vous à l'instance via la console série

    gcloud beta calcul connexion-au-port-série $instance_name

De là, vous devriez voir le menu netboot.xyz et c'est probablement tout ce que vous pourrez faire à ce stade. :)

### Configuration de l'instance

Si DHCP ne fonctionne pas, vous devrez définir l'adresse IP statique lors de l'installation.  Vous pouvez afficher cela en accédant aux détails de l'instance dans la console et en cliquant sur par défaut sous réseau.  Vous devrez définir l'adresse IP interne de l'instance ainsi que le sous-réseau et la passerelle sur cette page.

### Remarques

Voici quelques notes sur la création de l'image iPXE au cas où vous voudriez jouer avec vanilla iPXE dans GCE.

Voir le commit iPXE [ici](https://github.com/ipxe/ipxe/commit/de85336abb7861e4ea4df2e296eb33d179c7c9bd) pour plus d'informations sur la prise en charge de GCE dans iPXE.

Pour créer une image utilisable pour GCE :

    make bin/ipxe.usb CONFIG=cloud EMBED=$tmp/main.ipxe
    cp -f bin/ipxe.usb $tmp/disk.raw
    ( cd $tmp; tar Sczvf $image_name.tar.gz disk.raw )

Pour que les programmes d'installation fonctionnent en sortie série, lorsque le disque GCE est détecté, la console sur la ligne de commande du noyau est définie sur :

    console=ttyS0,115200n8

## Utilisation sans netboot.xyz (iPXE standard)

Lors de la construction de votre script, vous voudrez qu'il ressemble à ceci :

    #!ipxe
    
    echo Google Compute Engine - Démarrage iPXE via les métadonnées
    ifstat ||
    DHCP ||
    parcours ||
    chaîne -ar http://metadata.google.internal/computeMetadata/v1/instance/attributes/ipxeboot

Ensuite, lors du provisionnement de votre instance, vous pouvez spécifier votre fichier de script iPXE personnalisé :

    # Créer une image de démarrage partagée
    make bin/ipxe.usb CONFIG=cloud EMBED=config/cloud/gce.ipxe
    
    # Configurer le script de démarrage par instance
    gcloud compute instances add-metadata <instance> \
           --metadata-from-file ipxeboot =boot.ipxe

Cela permet à votre iPXE compilé personnalisé de démarrer, puis de s'enchaîner immédiatement à votre script iPXE personnalisé .
