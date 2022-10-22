---
id: ubuntu
title: Arranque PXE del instalador de Ubuntu
sidebar_label: ubuntu
description: Arranque PXE del instalador de Ubuntu
hide_table_of_contents: verdadero
---

## Núcleos de instalación

Ubuntu mantiene núcleos de instalación que son una forma liviana de cargar el instalador de Ubuntu y luego transmitir paquetes a través de la red según sea necesario. Los núcleos del instalador se encuentran en:

```bash
# http://archive.ubuntu.com u otros espejos de ubuntu
#
# (${version} == xenial, bionic, etc.)
# (${arch} == amd64, i386)

# directorio de versión original: 
# ubuntu/dists/${version}/main/installer-${arch}/current/images/netboot/
# 
# directorio de versión actualizado que contiene kernels y actualizaciones más nuevos:
# ubuntu/dists/${version}-updates/main/installer-${arch}/current/images/netboot/
#
# nombre de archivo del kernel: linux
# nombre de archivo initrd: initrd.gz
```

Para cargarlos, necesitará usar un fragmento de arranque en iPXE similar a:

```bash
establecer install_params auto=true prioridad=crítica
establecer espejo http://archive.ubuntu.com
establecer base_dir ubuntu
establecer ubuntu_version bionic
establecer arch amd64
establecer mirrorcfg mirror/suite=${ubuntu_version}
establecer dir ${mirror}/${base_dir}/${version}/main/installer-${arch}/current/images/netboot

kernel ${dir}/linux ${install_params} ${mirrorcfg} -- quiet initrd=initrd.gz
initrd ${dir}/initrd.gz
arranque
```

Si desea utilizar una URL [preconfigurada](https://help.ubuntu.com/lts/installation-guide/example-preseed.txt) para la automatización, puede agregar esto a la línea del kernel:

```bash
establecer preseedurl http://my.preseed.com/preseed.cfg
preseed/url=${preseedurl}
```

Para obtener más ejemplos, puede ver la configuración de netboot.xyz para Ubuntu [aquí](https://github.com/netbootxyz/netboot.xyz/blob/master/roles/netbootxyz/templates/menu/ubuntu.ipxe.j2).

## Arranque en vivo

Ubuntu también proporciona una serie de ISO de inicio en vivo que iniciarán un sistema operativo directamente en la memoria y se pueden usar de inmediato sin realizar una instalación o modificar el disco duro.  Live OS también incluirá el instalador.  Estos son excelentes para evaluar otros escritorios que quizás desee probar sin realizar una instalación completa.

| Distribución        | Sitio web                                                    |
|:------------------- |:------------------------------------------------------------ |
| Kubuntu             | [https://kubuntu.org/](https://kubuntu.org/)                 |
| Lubuntu             | [https://lubuntu.me/](https://lubuntu.me/)                   |
| periquito ubuntu    | [https://ubuntubudgie.org/](https://ubuntubudgie.org/)       |
| Ubuntu Kylin        | [https://www.ubuntukylin.com/](https://www.ubuntukylin.com/) |
| Compañero de Ubuntu | [https://ubuntu-mate.org/](https://ubuntu-mate.org/)         |
| Estudio de Ubuntu   | [https://ubuntustudio.org/](https://ubuntustudio.org/)       |
| Xubuntu             | [https://xubuntu.org/](https://xubuntu.org/)                 |
