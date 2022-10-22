---
id: auto-hébergement
title: Auto-hébergement
description: "Comment auto-héberger votre propre netboot.xyz dans votre environnement"
hide_table_of_contents: vrai
---

### Comment puis-je auto-héberger netboot.xyz ?

netboot.xyz était à l'origine un outil hébergé uniquement et utilisait des fichiers source statiques difficiles à personnaliser.  Vous pouvez maintenant générer votre propre environnement auto-hébergé en utilisant les mêmes outils pour générer le site hébergé.

[Ansible](https://www.ansible.com/), un moteur d'automatisation open source, est utilisé pour générer des modèles personnalisés basés sur un ensemble de configurations par défaut qui peuvent ensuite être remplacées par l'utilisateur. Cela permet à un utilisateur de personnaliser un environnement netboot.xyz selon ses spécifications et de configurer facilement un serveur PXE. Les playbooks Ansible généreront :

* Menus pour leur environnement netboot.xyz utilisant les paramètres de configuration par défaut
* Chargeurs de démarrage iPXE pour démarrer dans cet environnement
* Options de menu personnalisées pour ceux qui ont des options supplémentaires à ajouter

#### Structure des rôles

Le rôle</a> netbootxyz Ansiblese trouve dans le référentiel principal netboot.xyz.  La majeure partie de la logique de netboot.xyz est contenue dans ces zones :</p> 

* defaults/main.yml - Comprend les paramètres par défaut pour le déploiement, les versions du système d'exploitation, les utilitaires et les chargeurs de démarrage
* tâches/* - Contient toutes les tâches pour le rendu des modèles et la compilation des chargeurs de démarrage iPXE
* templates/disks - Modèles pour chargeurs de démarrage iPXE
* templates/menus - Modèles pour les menus netboot.xyz
* vars/* - Contient les listes de packages nécessaires pour prendre en charge la compilation et le déploiement de netboot.xyz



#### Déploiement avec Ansible

Pour exécuter un déploiement à l'aide d'Ansible, installez d'abord Ansible, Apache et git :



```bash
# Pour Debian/Ubuntu :
apt install -y ansible git apache2

# Pour Red Hat/CentOS/Fedora
yum install -y ansible git httpd
```


Consultez ensuite le dépôt netboot.xyz :



```bash
git clone https://github.com/netbootxyz/netboot.xyz.git/opt/netboot.xyz
```


Enfin, lancez le playbook Ansible :



```bash
cd /opt/netboot.xyz
ansible-playbook -i site d'inventaire.yml
```


La sortie sera déposée dans `/var/www/html` par défaut.  Vous pouvez remplacer cela pour déployer dans le répertoire du serveur Web de votre choix.



#### Déployer avec Docker

Vous pouvez également tirer parti de docker pour générer le menu et les disques netboot.xyz dans un conteneur qui génère ensuite les résultats des modèles rendus et des disques iPXE compilés dans un répertoire.  Assurez-vous d'abord que docker est installé, puis exécutez :



```bash
docker build -t localbuild -f Dockerfile-build .
docker run --rm -it -v $(pwd):/buildout localbuild
```


La sortie de construction sera dans le dossier généré `buildout`. Docker fournit un environnement cohérent et isolé pour générer la sortie de génération. De là, vous déposeriez les fichiers à la racine de votre serveur Web préféré.



#### Remplacements locaux

Ansible gérera la génération de source ainsi que la génération de disque iPXE avec vos paramètres.  Il générera des disques hérités (PCBIOS) et UEFI iPXE qui peuvent être utilisés pour charger dans votre environnement netboot.xyz. Si vous souhaitez remplacer les valeurs par défaut, vous pouvez mettre des remplacements dans user_overrides.yml.  Voir `user_overrides.yml` pour des exemples.

À l'aide du fichier overrides, vous pouvez remplacer tous les paramètres de defaults/main.yml afin de pouvoir facilement modifier les URL du miroir de démarrage lors du rendu des menus.  Si vous préférez le faire après coup, vous pouvez également modifier le fichier boot.cfg pour apporter des modifications, mais gardez à l'esprit que ces modifications ne seront pas enregistrées lorsque vous redéploierez le menu.



#### Options personnalisées auto-hébergées

En plus de pouvoir héberger localement netboot.xyz, vous pouvez également créer vos propres modèles personnalisés pour les menus personnalisés dans netboot.xyz. Ces modèles sont rendus lors du déploiement et sont disponibles à partir du menu principal via l'option de menu personnalisé.

Lorsque ces options sont définies :



```bash
custom_generate_menus : vrai
custom_templates_dir : "{{ netbootxyz_conf_dir }}/personnalisé"
```


Le menu ajoutera une option pour les menus personnalisés et tentera de se charger dans custom/custom.ipxe. À partir de là, des options personnalisées peuvent être créées et gérées séparément de l'arborescence source netboot.xyz afin que les deux menus puissent être mis à jour indépendamment.

Un exemple de menu est fourni pour montrer comment configurer et paramétrer un menu. Vous pouvez copier le répertoire personnalisé à partir du dépôt :



```bash
cp etc/netbootxyz/custom /etc/netbootxyz/custom
```
