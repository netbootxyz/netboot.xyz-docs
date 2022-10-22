---
id: océan numérique
title: DigitalOcean
description: Utilisation de netboot.xyz sur DigitalOcean
hide_table_of_contents: vrai
---

netboot.xyz peut être chargé sur un droplet [DigitalOcean](https://m.do.co/c/ab4e8f17ba0d) avec un peu de travail afin que vous puissiez ensuite personnaliser le droplet selon vos besoins. Pour cette méthode, nous utiliserons la plus petite taille de gouttelette exécutant Debian.

:::info
Si vous n'avez pas créé de compte DigitalOcean, veuillez utiliser notre lien d'affiliation [ici](https://m.do.co/c/ab4e8f17ba0d). Cela nous aidera à nous fournir des ressources de test pour améliorer ce projet !
:::

### Créer une gouttelette

Pour cette méthode, il est recommandé d'utiliser une distribution basée sur apt comme Debian ou Ubuntu. Démarrez une gouttelette avec l'un de ces systèmes d'exploitation. Une fois qu'il est opérationnel, connectez-vous via SSH ou connectez-vous avec le bouton de la console.

### Installez GRUB Imageboot et téléchargez ISO

Nous devrons nous assurer que le menu GRUB s'arrête suffisamment longtemps pour que nous sélectionnions l'option netboot.xyz. Pour cela, nous devrons supprimer un fichier de délai d'attente et augmenter le délai d'attente pour GRUB. Ajustez la période de temps selon vos besoins pour votre situation  :

```shell
# Supprimer la configuration du délai d'expiration de grub
rm /etc/default/grub.d/15_timeout.cfg

# Augmenter le délai d'expiration de grub si désiré
sed -i 's/GRUB_TIMEOUT=5/GRUB_TIMEOUT=60/g' /etc/default/grub

# Installez grub-imageboot
apt update
apt install -y grub-imageboot

# Téléchargez netboot.xyz ISO
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot .xyz.iso

# Mettre à jour le menu GRUB pour inclure cette mise à jour ISO
-grub2

# redémarrer une fois que vous êtes prêt, il peut être bon de charger la console de récupération en premier
redémarrage
```

### Connectez-vous via la console de récupération

Sous la section d'accès, connectez-vous à la console de récupération. La console de récupération est différente de la commande de console habituelle en ce sens qu'elle permet un accès direct au droplet lors de son démarrage, y compris l'accès au menu GRUB. À ce stade, si vous êtes dans la fenêtre de temporisation, vous devriez maintenant voir le menu Grub avec l'option suivante désormais disponible :

```bash
Image ISO amorçable : netboot.xyz
```

### Configurer la mise en réseau

Étant donné que les droplets utilisent une adresse IP statique au lieu de DHCP, vous devrez configurer la mise en réseau pour que iPXE communique avec la mise en réseau. Lors de la sélection de l'option netboot.xyz, appuyez sur **m** lorsque vous êtes invité à accéder au menu de sécurité. Vous devrez définir la mise en réseau de l'instance afin que iPXE puisse être en ligne. Vous pouvez obtenir les informations de mise en réseau à partir du panneau de configuration des gouttelettes à partir de l'onglet Mise en réseau. Une fois que vous disposez des informations de mise en réseau, sélectionnez Configuration réseau manuelle :

```bash
Définir le numéro d'interface réseau [0 pour net0, par défaut sur 0] : <set to 0>
IP : <set to droplet IP>
Masque de sous-réseau : <set to droplet netmask>
Passerelle : <set to droplet gateway>
DNS : <set DNS server, e.g. 1.1.1.1>
```

Une fois défini, vous devez vous connecter directement à netboot.xyz. Si vous effectuez une installation, vous devriez pouvoir réinstaller sur le lecteur existant à ce stade et personnaliser la goutte comme bon vous semble. Conservez les informations de mise en réseau à portée de main, car vous devrez les remplir lors d'une installation.

:::info
Si vous rencontrez des problèmes de mémoire insuffisante lors de l'exécution d'un programme d'installation, vous aurez peut-être besoin d'une goutte plus grande.
:::
