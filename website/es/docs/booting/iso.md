---
id: Yo asi
title: Arrancar con una ISO
sidebar_label: Arrancar con una ISO
description: "Cómo usar un ISO para arrancar en netboot.xyz"
hide_table_of_contents: verdadero
---

### Grabar un CD/DVD

Para crear un CD-ROM/DVD de arranque, grabe la imagen ISO [netboot.xyz.iso](https://boot.netboot.xyz/ipxe/netboot.xyz.iso) en un CD-ROM/DVD en blanco.  Inserte el medio en el servidor, establezca el orden de arranque adecuado y arranque.

### Software de máquina virtual

También puede usar estos ISO para iniciar cualquier tipo de VM en Citrix XenServer, Proxmox VE, VMware ESXi, VMware Fusion, VirtualBox.

### Medios virtuales fuera de banda

Son excelentes para conectarse a medios virtuales remotos de un servidor como Dell DRAC o HP iLO.  Debido a que el disco de arranque iPXE es tan liviano, es excelente para iniciar instalaciones donde el ancho de banda es realmente bajo.