---
id: pila abierta
title: "pila abierta"
description: "Uso de netboot.xyz con OpenStack"
hide_table_of_contents: verdadero
---

**Experimental, no he tenido la oportunidad de revisar esto recientemente, así que YMMV.**

La imagen ISO netboot.xyz se puede usar con nubes OpenStack para iniciar una instancia y realizar una instalación personalizada de un sistema operativo.

### Línea de comando

Comienza descargando la ISO y luego impórtala en la vista:

    $ wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso
    $ vistazo image-create --name netboot.xyz \
        --disk-format iso \
        --container-format bare \
        - -archivo netboot.xyz-dhcp.iso \
        --visibilidad pública
    +------------------+-------------- ------------------------+
    | Propiedad | Valor |
    +-------------------+------------------------------------------- ---------+
    | suma de comprobación | 45cdcb89576b6c05598b11585aef46bc |
    | formato_contenedor | desnudo |
    | creado_en | 2016-01-27T20:02:06Z |
    | formato_disco | iso |
    | identificación | 4f11d49e-157b-4740-87ad-db7d59bb5d6d |
    | min_disco | 0 |
    | min_ram | 0 |
    | nombre | netboot.xyz |
    | propietario | fbfce4cb346c4f9097a977c54904cafd |
    | protegido | Falso |
    | tamaño | 1048576 |
    | estado | activo |
    | etiquetas | [] |
    | actualizado_en | 2016-01-27T20:02:04Z |
    | tamaño_virtual | Ninguno |
    | visibilidad | publico |
    +-------------------+-------------------------------------------- ---------+

Solo debería tomar unos segundos para importar.  Tome el UUID del `id` campo devuelto por vistazo y verifique que la imagen se haya importado correctamente:

    $ vistazo imagen-mostrar 4f11d49e-157b-4740-87ad-db7d59bb5d6d
    +------------------+--------------- -----------------------+
    | Propiedad | Valor |
    +------------------------+-------------------------------------------- ---------+
    | suma de comprobación | 45cdcb89576b6c05598b11585aef46bc |
    | formato_contenedor | desnudo |
    | creado_en | 2016-01-27T20:02:06Z |
    | formato_disco | iso |
    | identificación | 4f11d49e-157b-4740-87ad-db7d59bb5d6d |
    | min_disco | 0 |
    | min_ram | 0 |
    | nombre | netboot.xyz |
    | propietario | fbfce4cb346c4f9097a977c54904cafd |
    | protegido | Falso |
    | tamaño | 1048576 |
    | estado | activo |
    | etiquetas | [] |
    | actualizado_en | 2016-01-27T20:02:04Z |
    | tamaño_virtual | Ninguno |
    | visibilidad | publico |
    +------------------+-------------------------------------------- ---------+

La imagen tiene un estado de `activa`, por lo que sabemos que la mirada la importó correctamente.

Arranquemos una nueva instancia con este ISO:

    nova boot --flavor m1.small \
        --image <image-uuid-of-netbootxyz-image> \
        --nic net-id=<network-uuid> \
        netbootxyz-testing

Espere unos 30 segundos, luego solicite una URL de consola:

    nova get-spice-consola c4ff017e-1234-4053-b740-e83eade277b9 especias-html5

¡Abra la URL de la consola que devuelve nova y debería ver la conocida interfaz netboot.xyz iPXE en la consola de especias!

### Horizonte

Comience descargando [ISO](https://boot.netboot.xyz/ipxe/netboot.xyz.iso) a su estación de trabajo local.  Siga estos pasos para importar la imagen a su nube OpenStack usando Horizon:

* Haga clic en la pestaña _Calcular_ en el lado izquierdo, luego haga clic en _Imágenes_
* Haga clic en _Crear imagen_ (arriba a la derecha)
  * Nombre: `netboot.xyz ISO`
  * Fuente de la imagen: archivo de imagen
  * Archivo de imagen: (busque el ISO que descargó)
  * Formato: ISO - Imagen de disco óptico
  * Público: marcado (opcional, pero recomendado si desea que otros inquilinos lo usen
* Haga clic en _Crear imagen_

Espere un momento para que el estado sea `activo`. Esto solo debería tomar unos segundos.  Para iniciar una instancia con la ISO que cargó, asegúrese de elegir _Iniciar desde la imagen_ y seleccione _netboot.xyz ISO_ de la lista desplegable. Configure los grupos de redes y seguridad como lo haría normalmente para cualquier otra instancia .

Cuando la instancia se haya construido por completo y haya pasado al estado activo, haga clic en el nombre de la instancia y luego vaya a la pestaña _Consola_. Dependiendo de su navegador, es que deba hacer clic en el enlace para mostrar solo la consola.

En ese momento, debería poder ver el menú netboot.xyz iPXE e instalar su sistema operativo.
