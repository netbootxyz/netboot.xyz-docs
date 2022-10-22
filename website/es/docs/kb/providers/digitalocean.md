---
id: oceanodigital
title: océano digital
description: Uso de netboot.xyz en DigitalOcean
hide_table_of_contents: verdadero
---

netboot.xyz se puede cargar en un droplet [DigitalOcean](https://m.do.co/c/ab4e8f17ba0d) con un poco de trabajo para que luego pueda personalizar el droplet según sea necesario. Para este método, usaremos el tamaño de gota más pequeño que ejecute Debian.

:::info
Si no se ha registrado para obtener una cuenta de DigitalOcean, utilice nuestro enlace de afiliado [aquí](https://m.do.co/c/ab4e8f17ba0d). ¡Ayudará a proporcionarnos recursos de prueba para mejorar este proyecto!
:::

### Crear una gota

Para este método, se recomienda usar una distribución basada en apt como Debian o Ubuntu. Inicie un droplet con uno de esos sistemas operativos. Una vez que esté en funcionamiento, conéctese a través de SSH o conéctese con el botón de la consola.

### Instale GRUB Imageboot y descargue ISO

Tendremos que asegurarnos de que el menú de GRUB se detenga el tiempo suficiente para que podamos seleccionar la opción netboot.xyz. Para eso, necesitaremos eliminar un archivo de tiempo de espera y aumentar el tiempo de espera para GRUB. Ajuste el período de tiempo según sea necesario para su situación :

```shell
# Eliminar la configuración de tiempo de espera de grub
rm /etc/default/grub.d/15_timeout.cfg

# Aumentar el tiempo de espera de grub si se desea
sed -i 's/GRUB_TIMEOUT=5/GRUB_TIMEOUT=60/g' /etc/default/grub

# Instalar grub-imageboot
apt update
apt install -y grub-imageboot

# Descargar netboot.xyz ISO
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot .xyz.iso

# Actualice el menú de GRUB para incluir esta actualización de ISO
-grub2

# reinicie una vez que esté listo, puede ser bueno cargar la consola de recuperación primero
reiniciar
```

### Conéctese a través de la consola de recuperación

En la sección de acceso, conéctese a la Consola de recuperación. La consola de recuperación se diferencia del comando de la consola normal en que permite el acceso directo al droplet a medida que se inicia, incluido el acceso al menú de GRUB. En este punto, si está dentro de la ventana de tiempo de espera, ahora debería ver el menú Grub con la siguiente opción ahora disponible:

```bash
Imagen ISO de arranque: netboot.xyz
```

### Configurar redes

Debido a que las gotas usan una IP estática en lugar de DHCP, deberá configurar la red para que iPXE se comunique con la red. Al seleccionar la opción netboot.xyz, presione **m** cuando se le solicite el menú de seguridad. Deberá configurar la red de la instancia para que iPXE pueda conectarse. Puede obtener la información de red desde el panel de control de droplet desde la pestaña de red. Una vez que tenga la información de red, seleccione Configuración de red manual:

```bash
Configure el número de interfaz de red [0 para net0, el valor predeterminado es 0]: <set to 0>
IP: <set to droplet IP>
Máscara de subred: <set to droplet netmask>
Puerta de enlace: <set to droplet gateway>
DNS: <set DNS server, e.g. 1.1.1.1>
```

Una vez configurado, debe conectarse directamente a netboot.xyz. Si realiza una instalación, debería poder reinstalar sobre la unidad existente en ese punto y personalizar la gota como mejor le parezca. Mantenga la información de red a mano, ya que deberá completarla cuando realice una instalación.

:::info
Si se encuentra con problemas de falta de memoria al ejecutar un instalador, es posible que necesite una gota más grande.
:::
