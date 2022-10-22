---
id: ipxe
title: Démarrer avec iPXE
sidebar_label: Démarrer avec iPXE
description: "Détails sur le chargement en chaîne dans netboot.xyz à partir d'iPXE"
hide_table_of_contents: vrai
---

### Carte réseau avec iPXE intégré

Si vous avez déjà compilé votre propre iPXE, vous pouvez facilement charger le menu netboot.xyz en entrant CTRL-B lorsque vous y êtes invité, en définissant DHCP, puis en chargeant iPXE en chaîne :

    chaîne dhcp
    --autofree https://boot.netboot.xyz

Si vous n'avez pas de DHCP sur votre réseau, vous pouvez définir manuellement vos informations réseau :

    set net0/ip <ip>
    set net0/netmask <netmask>
    set net0/gateway <gateway>
    set dns <nameserver>
    ifopen net0
    chain --autofree https://boot.netboot.xyz

Certaines versions iPXE ne prennent pas en charge les connexions HTTPS. Si vous obtenez un message d'erreur "Opération non prise en charge", exécutez ceci à la place :

    chaîne --autofree http://boot.netboot.xyz

### KVM

Sur les VPS qui utilisent KVM, vous pouvez généralement vous connecter au VPS via VNC, le redémarrer, appuyer sur Échap lors du redémarrage pour obtenir un menu de démarrage, puis sélectionner l'option iPXE. Une fois que iPXE a démarré, appuyez sur Ctrl-B et suivez les instructions ci-dessus.
