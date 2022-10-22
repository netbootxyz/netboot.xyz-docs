---
id: gce
title: Motor de cómputo de Google
description: Usando netboot.xyz en Google Compute Engine
hide_table_of_contents: verdadero
---

## Uso con netboot.xyz

**Experimental, actualmente no funciona en ninguna imagen que utilice memdisk como salida de la consola y no se puede modificar.**

*Nota: La funcionalidad estará limitada ya que la consola es Serial Over Lan.  Es posible que las distribuciones que utilizan memdisk no proporcionen resultados, mientras que otras distribuciones que se recuperan a través del kernel permiten modificar la configuración de la consola durante la carga.  Esto incluye la mayoría de las herramientas de utilidad.  Probablemente buscaré filtrar las opciones que no funcionan en el futuro.  La consola puede funcionar durante la instalación, pero puede dejar de funcionar en el primer arranque si no se configura durante la instalación.*

### Crear un cubo

Establezca un nombre para su depósito y seleccione la clase de almacenamiento regional.

Cargue la imagen netboot.xyz-gce desde este [enlace](https://boot.netboot.xyz/ipxe/netboot.xyz-gce.tar.gz) a la raíz de su depósito.

    gsutil cp $tmp/$image_name.tar.gz gs://$gs_bucket

### Crear una imagen

Con la utilidad gcloud o Google Cloud Shell, cree una imagen desde el disco iPXE que cargó en el paso anterior:

    Las imágenes de cálculo de gcloud crean $image_name --source-uri gs://$gs_bucket/$image_name.tar.gz

### Arrancar una instancia

Inicie una instancia desde la imagen que creó, asegúrese de habilitar el puerto serie:

    Las instancias de computación de gcloud crean $instance_name --image $image_name --metadata serial-port-enable=1

### Conéctese a la instancia a través de la consola serie

    gcloud beta computación conexión a puerto serie $instance_name

Desde aquí, debería ver el menú netboot.xyz y eso es probablemente todo lo que podrá hacer en este momento. :)

### Configuración de la instancia

En caso de que DHCP no funcione, deberá configurar la dirección IP estática durante el tiempo de instalación.  Puede ver esto ingresando a los detalles de la instancia en la consola y haciendo clic en predeterminado en la red.  Deberá configurar la IP interna de la instancia junto con la subred y la puerta de enlace en esa página.

### notas

Aquí hay algunas notas sobre cómo se crea la imagen iPXE en caso de que quiera jugar con Vanilla iPXE en GCE.

Consulte la confirmación [de iPXE aquí](https://github.com/ipxe/ipxe/commit/de85336abb7861e4ea4df2e296eb33d179c7c9bd) para obtener más información sobre la compatibilidad con GCE en iPXE.

Para crear una imagen utilizable para GCE:

    hacer bin/ipxe.usb CONFIG=nube EMBED=$tmp/main.ipxe
    cp -f bin/ipxe.usb $tmp/disk.raw
    (cd $tmp; tar Sczvf $image_name.tar.gz disk.raw)

Para que los instaladores funcionen en serie, cuando se detecta el disco GCE, la consola en la línea de comando del kernel se configura en:

    consola=ttyS0,115200n8

## Uso sin netboot.xyz (iPXE estándar)

Al crear su secuencia de comandos, querrá que se vea así:

    #!ipxe
    
    echo Google Compute Engine: arranque iPXE a través de metadatos
    ifstat ||
    dhcp ||
    ruta ||
    cadenas -ar http://metadata.google.internal/computeMetadata/v1/instance/attributes/ipxeboot

Luego, al aprovisionar su instancia, puede especificar su archivo de script iPXE personalizado:

    # Crear imagen de arranque compartida
    make bin/ipxe.usb CONFIG=cloud EMBED=config/cloud/gce.ipxe
    
    # Configurar secuencia de comandos de arranque por instancia
    instancias de computación de gcloud add-metadata <instance> \
           --metadata-from-file ipxeboot =arranque.ipxe

Esto permite que su iPXE compilado personalizado arranque y luego se encadene inmediatamente a su script iPXE personalizado .
