---
id: Introducción
title: Introducción
description: netboot.xyz utiliza iPXE para iniciar en red los instaladores y las utilidades del sistema operativo desde un menú fácil de usar".
hide_table_of_contents: verdadero
slug: /
---

[netboot.xyz](http://netboot.xyz) le permite [PXE](https://en.wikipedia.org/wiki/Preboot_Execution_Environment) iniciar varios instaladores o utilidades del sistema operativo desde una sola herramienta a través de la red. Esto le permite usar un medio para muchos tipos de sistemas operativos o herramientas. El proyecto [iPXE](http://ipxe.org/) se utiliza para proporcionar un menú fácil de usar desde el BIOS que le permite elegir fácilmente el sistema operativo que desea junto con cualquier tipo específico de versiones o indicadores de arranque.

Puede conectar de forma remota el ISO a los servidores, configurarlo como una opción de rescate en Grub o incluso configurar su red doméstica para que se inicie de forma predeterminada para que siempre esté disponible.

![menú netboot.xyz](../static/img/netboot.xyz.gif)

## Descripción general del menú

### Menú de instalaciones de red de Linux

Para los proyectos de sistema operativo que proporcionan un instalador de arranque de red, este es un método liviano para la instalación, ya que recupera un conjunto mínimo de núcleos de instalación y luego instala los paquetes según sea necesario. Este suele ser el método más rápido de instalación del sistema operativo. También puede aprovechar las herramientas integradas para hacer botas de rescate.

### CD en vivo/menú de distribución

Muchos proyectos de sistemas operativos proporcionan su software solo como ISO o proporcionan un Live CD/DVD que puede descargar e iniciar en la memoria modificando el almacenamiento de la máquina. Por lo general, tiene la opción de realizar una instalación desde el sistema en vivo.  Por lo general, estas son instalaciones de mayor peso y pueden requerir mucho ancho de banda para instalarse. iPXE generalmente no arranca los ISO directamente tan bien.

Para que podamos facilitar el consumo de ese tipo de imágenes, supervisamos las actualizaciones de nuevas versiones desde el principio, recuperamos los lanzamientos, los extraemos y los volvemos a publicar con modificaciones en el initrd según sea necesario para que sean compatibles con iPXE. Luego podemos cargar el kernel de menor tamaño directamente en la memoria para una experiencia mejor y más consistente.

### Menú Utilidades

El menú Utilidades brinda acceso a herramientas y utilidades para herramientas como la clonación de discos, la limpieza de unidades u otro tipo de herramientas de rescate. También puede seleccionar otros puntos finales de netboot.xyz para probar los menús que pueden estar en desarrollo.

## Arquitecturas compatibles

netboot.xyz admite arquitecturas x86 de 32 y 64 bits y arquitecturas arm64. Los menús identifican la plataforma cargada y habilitan opciones de menú basadas en la arquitectura cargada.
