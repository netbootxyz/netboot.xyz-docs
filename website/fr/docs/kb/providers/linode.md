---
id: linode
title: Linode
description: Utilisation de netboot.xyz sur Linode
hide_table_of_contents: vrai
---

netboot.xyz peut être chargé sur une instance [Linode](https://linode.com) afin que vous puissiez ensuite personnaliser le Linode selon vos besoins. Pour cette méthode, nous utiliserons la plus petite taille de Linode exécutant Debian.

### Créer un Linode

Pour cette méthode, il est recommandé d'utiliser une distribution basée sur apt comme Debian ou Ubuntu. Démarrez un Linode avec l'un de ces systèmes d'exploitation. Une fois qu'il est opérationnel, connectez-vous via SSH ou connectez-vous avec le bouton de la console.

### Installez GRUB Imageboot et téléchargez ISO

Nous devrons nous assurer que le menu GRUB s'arrête suffisamment longtemps pour que nous sélectionnions l'option netboot.xyz. Pour cela, nous devrons supprimer un fichier de délai d'attente et augmenter le délai d'attente pour GRUB. Ajustez la période de temps selon vos besoins pour votre situation  :

```shell
# Augmentez le délai d'attente de grub si vous le souhaitez
sed -i 's/GRUB_TIMEOUT=5/GRUB_TIMEOUT=60/g' /etc/default/grub

# Installez grub-imageboot
apt update
apt install -y grub-imageboot

# Téléchargez netboot .xyz ISO
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso

# Mettre à jour le menu GRUB pour inclure cette mise à jour ISO
-grub2

# redémarrer une fois que vous êtes prêt, il peut être bon de charger la console de récupération en premier
redémarrage
```

### Lancer la console LISH

Sous les paramètres Linode, cliquez sur ... et sélectionnez Lancer la console LISH. Pour interagir avec le menu GRUB et les menus netboot.xyz, vous devrez cliquer sur l'onglet Weblish. Pour interagir avec un programme d'installation ou un autre outil, vous devrez peut-être utiliser l'onglet Glish (graphique).

À ce stade, si vous êtes dans la fenêtre de temporisation, vous devriez maintenant voir le menu Grub avec l'option suivante maintenant disponible que vous pouvez sélectionner pour charger le menu netwboot.xyz :

```bash
Image ISO amorçable : netboot.xyz
```

### La mise en réseau

Linode utilise DHCP donc netboot.xyz devrait pouvoir obtenir une adresse IP et charger le menu. Si DHCP ne fonctionne pas, vous devrez peut-être utiliser le menu de sécurité alternative pour configurer manuellement la mise en réseau de l'instance en appuyant sur **m** lorsque vous êtes invité à entrer le menu de sécurité.

Si vous effectuez une installation, vous devriez pouvoir réinstaller le lecteur existant à ce stade et personnaliser le Linode comme bon vous semble. Conservez les informations de mise en réseau à portée de main, car vous devrez les remplir lors d'une installation.

:::info
Si vous rencontrez des problèmes de mémoire insuffisante lors de l'exécution d'un programme d'installation, vous aurez peut-être besoin d'un Linode plus grand.
:::
