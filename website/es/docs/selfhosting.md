---
id: alojamiento propio
title: Autohospedaje
description: "Cómo autohospedar su propio netboot.xyz en su entorno"
hide_table_of_contents: verdadero
---

### ¿Cómo puedo hospedar yo mismo netboot.xyz?

netboot.xyz era originalmente una herramienta solo alojada y usaba archivos fuente estáticos que eran difíciles de personalizar.  Ahora puede generar su propio entorno alojado utilizando las mismas herramientas para generar el sitio alojado.

[Ansible](https://www.ansible.com/), un motor de automatización de código abierto, se utiliza para generar plantillas personalizadas basadas en un conjunto de configuraciones predeterminadas que luego el usuario puede anular. Esto permite que un usuario personalice un entorno netboot.xyz según sus especificaciones y configure un servidor PXE fácilmente. Los libros de jugadas de Ansible generarán:

* Menús para su entorno netboot.xyz utilizando los ajustes de configuración predeterminados
* Cargadores de arranque iPXE para arrancar en ese entorno
* Opciones de menú personalizadas para aquellos que tienen opciones adicionales que desean agregar

#### Estructura de roles

El rol</a> netbootxyz Ansiblese encuentra en el repositorio principal netboot.xyz.  La mayor parte de la lógica de netboot.xyz se encuentra en estas áreas:</p> 

* defaults/main.yml: contiene la configuración predeterminada para la implementación, las versiones del sistema operativo, las utilidades y los cargadores de arranque
* tareas/*: contiene todas las tareas para renderizar plantillas y compilar cargadores de arranque iPXE
* templates/disks - Plantillas para cargadores de arranque iPXE
* templates/menus - Plantillas para menús netboot.xyz
* vars/*: contiene las listas de paquetes necesarios para admitir la compilación y la implementación de netboot.xyz



#### Implementación con Ansible

Para ejecutar una implementación con Ansible, primero instale Ansible, Apache y git:



```bash
# Para Debian/Ubuntu:
apt install -y ansible git apache2

# Para Red Hat/CentOS/Fedora
yum install -y ansible git httpd
```


Luego echa un vistazo al repositorio netboot.xyz:



```bash
clon de git https://github.com/netbootxyz/netboot.xyz.git /opt/netboot.xyz
```


Finalmente ejecute el libro de jugadas de Ansible:



```bash
cd /opt/netboot.xyz
ansible-playbook -i sitio de inventario.yml
```


La salida se colocará en `/var/www/html` de forma predeterminada.  Puede anular esto para implementar en el directorio del servidor web de su elección.



#### Desplegando con Docker

También puede aprovechar la ventana acoplable para generar el menú netboot.xyz y los discos en un contenedor que luego genera los resultados de las plantillas renderizadas y los discos iPXE compilados en un directorio.  Primero asegúrese de tener Docker instalado y luego ejecute:



```bash
docker build -t localbuild -f Dockerfile-build .
ventana acoplable ejecutar --rm -it -v $(pwd):/construir compilación local
```


El resultado de la compilación estará en la carpeta generada `buildout`. Docker proporciona un entorno coherente y aislado para generar el resultado de la compilación. Desde allí, colocaría los archivos en la raíz de su servidor web favorito.



#### Anulaciones locales

Ansible manejará la generación de fuentes así como la generación de discos iPXE con su configuración.  Generará discos Legacy (PCBIOS) y UEFI iPXE que se pueden usar para cargar en su entorno netboot.xyz. Si desea anular los valores predeterminados, puede colocar anulaciones en user_overrides.yml.  Consulte `user_overrides.yml` para ver ejemplos.

Con el archivo de anulaciones, puede anular todas las configuraciones de defaults/main.yml para que pueda cambiar fácilmente las URL de espejo de arranque cuando se representan los menús.  Si prefiere hacer esto después del hecho, también puede editar boot.cfg para realizar cambios, pero tenga en cuenta que esos cambios no se guardarán cuando vuelva a implementar el menú.



#### Opciones personalizadas autohospedadas

Además de poder hospedar netboot.xyz localmente, también puede crear sus propias plantillas personalizadas para menús personalizados dentro de netboot.xyz. Esas plantillas se representan durante la implementación y están disponibles desde el menú principal a través de la opción de menú personalizado.

Cuando estas opciones están configuradas:



```bash
custom_generate_menus: verdadero
custom_templates_dir: "{{ netbootxyz_conf_dir }}/personalizado"
```


El menú agregará una opción para menús personalizados e intentará cargarse en custom/custom.ipxe. Desde allí, las opciones personalizadas se pueden crear y mantener por separado del árbol de fuentes netboot.xyz para que ambos menús se puedan actualizar de forma independiente.

Se proporciona un menú de muestra para demostrar cómo configurar y configurar un menú. Puede copiar el directorio personalizado desde el repositorio:



```bash
cp etc/netbootxyz/personalizado/etc/netbootxyz/personalizado
```
