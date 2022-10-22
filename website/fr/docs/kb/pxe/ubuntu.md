---
id: ubuntu
title: Démarrage PXE du programme d'installation d'Ubuntu
sidebar_label: Ubuntu
description: Démarrage PXE du programme d'installation d'Ubuntu
hide_table_of_contents: vrai
---

## Noyaux d'installation

Ubuntu maintient des noyaux d'installation qui sont un moyen léger de charger le programme d'installation d'Ubuntu, puis de diffuser des packages sur le réseau selon les besoins. Les noyaux d'installation sont situés à :

```bash
# http://archive.ubuntu.com ou autres miroirs ubuntu
#
# (${version} == xenial, bionic, etc.)
# (${arch} == amd64, i386)

# répertoire de version d'origine : 
# ubuntu/dists/${version}/main/installer-${arch}/current/images/netboot/
# 
# répertoire de version mis à jour contenant les nouveaux noyaux et mises à jour :
# ubuntu/dists/${version}-updates/main/installer-${arch}/current/images/netboot/
#
# nom du fichier noyau : linux
# nom du fichier initrd : initrd.gz
```

Pour les charger, vous devrez utiliser un extrait de démarrage dans iPXE similaire à :

```bash
set install_params auto=true priority=critical
set mirror http://archive.ubuntu.com
set base_dir ubuntu
set ubuntu_version bionic
set arch amd64
set mirrorcfg mirror/suite=${ubuntu_version}
set dir ${mirror}/${base_dir}/dists/${version}/main/installer-${arch}/current/images/netboot

kernel ${dir}/linux ${install_params} ${mirrorcfg} -- quiet initrd=initrd.gz
initrd ${dir}/initrd.gz
boot
```

Si vous souhaitez utiliser une URL [preseed](https://help.ubuntu.com/lts/installation-guide/example-preseed.txt) pour l'automatisation, vous pouvez ajouter ceci à la ligne du noyau :

```bash
définir preseedurl http://my.preseed.com/preseed.cfg
preseed/url=${preseedurl}
```

Pour plus d'exemples, vous pouvez voir la configuration netboot.xyz pour Ubuntu [ici](https://github.com/netbootxyz/netboot.xyz/blob/master/roles/netbootxyz/templates/menu/ubuntu.ipxe.j2).

## Démarrage en direct

Ubuntu fournit également un certain nombre d'ISO Live Boot qui démarrent un système d'exploitation directement en mémoire et peuvent être utilisés immédiatement sans effectuer d'installation ni modifier le disque dur.  Le système d'exploitation Live inclura également le programme d'installation.  Ils sont parfaits pour évaluer d'autres ordinateurs de bureau que vous voudrez peut-être essayer sans effectuer une installation complète.

| Distribution       | Site Internet                                                |
|:------------------ |:------------------------------------------------------------ |
| Kubuntu            | [https://kubuntu.org/](https://kubuntu.org/)                 |
| Lubuntu            | [https://lubuntu.me/](https://lubuntu.me/)                   |
| Perruche Ubuntu    | [https://ubuntubudgie.org/](https://ubuntubudgie.org/)       |
| Ubuntu Kylin       | [https://www.ubuntukylin.com/](https://www.ubuntukylin.com/) |
| Compagnon d'Ubuntu | [https://ubuntu-mate.org/](https://ubuntu-mate.org/)         |
| Studio Ubuntu      | [https://ubuntustudio.org/](https://ubuntustudio.org/)       |
| XubuntuName        | [https://xubuntu.org/](https://xubuntu.org/)                 |
