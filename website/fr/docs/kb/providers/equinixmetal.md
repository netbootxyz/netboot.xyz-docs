---
id: equinixmetal
title: Équinix Métal
description: Utilisation de netboot.xyz avec les serveurs bare metal d'Equinix Metal
hide_table_of_contents: vrai
---

[Equinix Metal](https://metal.equinix.com) prend entièrement en charge netboot.xyz avec son système d'exploitation Custom iPXE .

### Usage

Sélectionnez le système d'exploitation "Custom iPXE" à partir du portail, ou le slug `custom_ipxe` lors de l'utilisation de l'API.

### Approvisionnement

Placez l'URL netboot.xyz dans le champ de texte qui apparaît dans le portail ou utilisez le paramètre `ipxe_script_url` lors de la création de l'appareil via l'API.

    https://boot.netboot.xyz

Appuyez sur "Déployer" pour provisionner votre appareil. Il faudra 2 à 3 minutes pour que l'appareil devienne actif. Une fois en ligne, connectez-vous au service série sur SSH (SOS) hors bande d'Equinix Metal à l'aide de l'identifiant `de l'appareil` et de l'installation où l'appareil a été déployé, par exemple `ewr1`.

    ssh {server-uuid}@sos.{facility-code}.plateformequinix.com

La liste actuelle des installations est [ici](https://metal.equinix.com/product/locations). Le menu netboot.xyz iPXE apparaîtra et vous pourrez terminer l'installation à partir de là.

:::Remarque

Par défaut, les périphériques sont configurés pour démarrer à partir du disque local. Pendant le provisionnement , Equinix Metal définit le prochain démarrage sur PXE. Cela se produit une fois, ce qui signifie que si vous n'installez pas de système d'exploitation avant de redémarrer, il ne rechargera pas le menu netboot.xyz. Cependant, vous pouvez configurer votre appareil pour qu'il démarre toujours sur iPXE en activant cette option sous "actions du serveur" via le portail client.

:::

### La mise en réseau

Les appareils provisionnés via Custom pourront utiliser DHCP pendant toute la durée de vie de l'appareil ; cependant, Equinix Metal recommande de configurer la mise en réseau de manière statique. Les informations d'adresse IP peuvent être trouvées en interrogeant https://metadata.platformequinix.com/metadata à partir de l'hôte.

Vous trouverez plus d'informations sur la façon dont Equinix Metal configure la liaison [ici](https://metal.equinix.com/developers/docs/networking/layer2/).

Les serveurs de noms doivent être configurés comme :

    serveur de noms 147.75.207.207
    serveur de noms 147.75.207.208
