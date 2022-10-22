---
id: linodo
title: Linodo
description: Usando netboot.xyz en Linode
hide_table_of_contents: verdadero
---

netboot.xyz se puede cargar en una instancia [Linode](https://linode.com) para que luego pueda personalizar el Linode según sea necesario. Para este método, usaremos el tamaño más pequeño de Linode que ejecute Debian.

### Crear un Linodo

Para este método, se recomienda usar una distribución basada en apt como Debian o Ubuntu. Inicie un Linode con uno de esos sistemas operativos. Una vez que esté en funcionamiento, conéctese a través de SSH o conéctese con el botón de la consola.

### Instale GRUB Imageboot y descargue ISO

Tendremos que asegurarnos de que el menú de GRUB se detenga el tiempo suficiente para que podamos seleccionar la opción netboot.xyz. Para eso, necesitaremos eliminar un archivo de tiempo de espera y aumentar el tiempo de espera para GRUB. Ajuste el período de tiempo según sea necesario para su situación :

```shell
# Aumente el tiempo de espera de grub si lo desea
sed -i 's/GRUB_TIMEOUT=5/GRUB_TIMEOUT=60/g' /etc/default/grub

# Instale grub-imageboot
apt update
apt install -y grub-imageboot

# Descargue netboot .xyz ISO
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso

# Actualizar el menú de GRUB para incluir este ISO
update-grub2

# reiniciar una vez que esté listo, puede ser bueno cargar la consola de recuperación primero
reiniciar
```

### Inicie la consola LISH

En la configuración de Linode, haga clic en ... y seleccione Iniciar consola LISH. Para interactuar con el menú de GRUB y los menús de netboot.xyz, deberá hacer clic en la pestaña Weblish. Para interactuar con un instalador u otra herramienta, es posible que deba usar la pestaña Glish (Gráfica).

En este punto, si está dentro de la ventana de tiempo de espera, ahora debería ver el menú Grub con la siguiente opción ahora disponible que puede seleccionar para cargar el menú netwboot.xyz:

```bash
Imagen ISO de arranque: netboot.xyz
```

### Redes

Linode usa DHCP, por lo que netboot.xyz debería poder obtener una dirección IP y cargar el menú. Si DHCP no funciona, es posible que deba usar el menú a prueba de fallas alternativo para configurar la red para la instancia manualmente presionando **m** cuando se le solicite el menú a prueba de fallas.

Si realiza una instalación, debería poder reinstalar sobre la unidad existente en ese punto y personalizar el Linode como mejor le parezca. Mantenga la información de red a mano, ya que deberá completarla cuando realice una instalación.

:::info
Si se encuentra con problemas de falta de memoria al ejecutar un instalador, es posible que necesite un Linode más grande.
:::
