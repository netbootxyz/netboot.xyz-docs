---
id: qemu
title: Démarrage à partir de QEMU
sidebar_label: Démarrage à partir de QEMU
description: "Méthodes de démarrage dans netboot.xyz à l'aide de QEMU"
hide_table_of_contents: vrai
---

### Aperçu

Un moyen rapide d'essayer netboot.xyz sans aucune modification de votre environnement existant consiste à tirer parti de QEMU.  Vous pouvez démarrer une machine virtuelle pour évaluer ce qu'est netboot.xyz et son fonctionnement.  Vous aurez besoin du package qemu-system pour votre système d'exploitation approprié et d'un gestionnaire de fenêtres installé.  Dans l'exemple ci-dessous, nous utilisons Ubuntu 20.04.

### Installer les dépendances

```bash
# installez le package qemu-system
sudo apt-get install -y qemu-system ovmf

# téléchargez le dernier combiné Legacy et EFI iso
wget http://boot.netboot.xyz/ipxe/netboot.xyz.iso
```

Si vous souhaitez écrire sur un disque, vous pouvez en définir un à ce stade, ou vous pouvez éventuellement démarrer sans disque si vous souhaitez tester le lecteur netboot.xyz :

### Créer un disque (facultatif)

```bash
qemu-img create -f raw vmdisk 8G

# ajoutez ce qui suit à la fin des lignes qemu-system ci-dessous si vous souhaitez ajouter un disque sur lequel écrire :
# -drive file=vmdisk,format=raw
```

### Démarrage avec Legacy PCBIOS

```bash
qemu-system-x86_64 -cdrom netboot.xyz.iso -m 4G
```

### Démarrage avec un BIOS UEFI

```bash
qemu-system-x86_64 -bios /usr/share/ovmf/OVMF.fd -cdrom netboot.xyz.iso -m 4G
```

:::Remarque

Au moins 4 Go de mémoire sont recommandés pour certaines des images chargées dans la RAM.  Si vous rencontrez des problèmes lors du chargement initrd, la machine a généralement juste besoin de plus de RAM.

:::
