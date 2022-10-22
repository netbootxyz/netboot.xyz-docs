---
id: Preguntas más frecuentes
title: Preguntas frecuentes (FAQ)
sidebar_label: Preguntas más frecuentes
description: "Preguntas frecuentes sobre el proyecto netboot.xyz"
hide_table_of_contents: verdadero
---

### ¿Qué es esto?
netboot.xyz es una herramienta que le permite iniciar el instalador de su sistema operativo favorito o varias utilidades a través de la red con una sobrecarga mínima y todo desde un solo sistema de menú.  Es similar a varias herramientas de arranque de red del pasado como boot.kernel.org con mucha más flexibilidad.  El cargador de arranque es muy liviano y pesa menos de 1 MB, lo que se traduce en un tiempo muy rápido para crear una llave USB.

### ¿Como funciona esto?
netboot.xyz utiliza una herramienta de código abierto llamada iPXE.  El cargador de arranque llama a un servidor web que aloja los archivos de origen iPXE.  Los archivos fuente de iPXE contienen menús y lógica que comprenden cómo funcionan los diversos instaladores de Linux.  Cuando selecciona un sistema operativo, netboot.xyz recupera las imágenes del directorio del proyecto cuando es posible o espejos de rendimiento conocidos y confiables.  La ubicación de la que se extrae el archivo siempre se muestra durante la recuperación.

### ¿Qué es el arranque PXE?
PXE significa **P**reinicio**X**ejecución **E**entorno.  El arranque PXE se ha utilizado durante años para permitir que los clientes arranquen desde un servidor a través de la red.  Le brinda la oportunidad de automatizar un sistema dentro del BIOS antes de que se inicie desde su disco duro, lo que abre la puerta para ejecutar máquinas sin estado sin tener que usar el almacenamiento en el sistema.  El arranque PXE se usa en muchas aplicaciones, pero su uso más común es automatizar la instalación de una máquina virtual o bare metal.

### ¿Mi distribución favorita funcionará con netboot.xyz?
Por lo general, necesita tres cosas para iniciar un sistema operativo a través de la red: vmlinuz, initramfs y rootfs.  Las distribuciones que admiten un kernel de instalación alojado en un espejo suelen ser las más fáciles de implementar, ya que son muy livianas.  Las distribuciones que solo lanzan ISO suelen ser un poco más complicadas de implementar, ya que tenemos que usar memdisk para cargarlo en la memoria.

Desde [syslinux - memdisk](http://www.syslinux.org/wiki/index.php/MEMDISK): La mayoría de las imágenes de CD basadas en Linux tampoco funcionarán con la emulación MEMDISK ISO. Las distribuciones de Linux requieren que se especifiquen los archivos kernel e initrd, tan pronto como estos archivos se carguen, los controladores del kernel en modo protegido tomarán el control y ya no se podrá acceder al CD virtual. Si se requieren otros archivos del CD/DVD, se perderán y se producirán errores de arranque. Las distribuciones de Linux que solo requieren archivos kernel e initrd funcionan completamente a través de la emulación ISO, ya que no es necesario acceder a otros datos desde la unidad de CD/DVD virtual una vez que se han cargado. El cargador de arranque ha leído todos los archivos necesarios en la memoria usando INT 13h, antes de arrancar el kernel.

Para sortear estas limitaciones, especialmente porque memdisk no es compatible con UEFI, hemos creado un sistema CI/CD que consume los ISO de los proyectos anteriores y prepara los archivos necesarios para iniciar el sistema operativo de forma remota como una versión.  En algunos casos, esto puede implicar una pequeña modificación en los scripts de inicio para ajustar la flexibilidad de arranque de la red o manejar múltiples partes para sistemas operativos más grandes.  Esas versiones se agregan a endpoints.yml en el repositorio principal de netboot.xyz y luego están disponibles para su descarga.

Puede leer más sobre nuestro sistema de compilación [aquí](https://github.com/netbootxyz/build-pipelines/blob/master/README.md).

### Mi distribución usa ISO para la entrega, ¿cómo puedo ver si funcionan?
Puede realizar una comprobación rápida cargando netboot.xyz en un entorno virtual baremetal.  Asegúrese de tener suficiente RAM mientras carga la ISO en la RAM.  Luego seleccione la línea de comando iPXE e ingrese lo siguiente;

    núcleo https://boot.netboot.xyz/memdisk iso raw
    initrd http://url/to/iso
    arranque

Eso debería cargar el ISO y si llega hasta el instalador, genial, su sistema operativo puede funcionar.  Si falla durante la carga de initramfs al intentar cargar el dispositivo de CD, entonces tiene el problema de no poder encontrar el ISO en la memoria.

### ¿Puedo crear mis propias configuraciones?

¡Sí!  Puede bifurcar [netboot.xyz-custom](https://github.com/netbootxyz/netboot.xyz-custom) y crear su propio menú.  Luego puede configurar su usuario de Github desde el menú Utilidad y su menú aparecerá en el menú principal.  Si no desea configurar su usuario cada vez, puede compilar de forma personalizada el código netboot.xyz iPXE e incluir su github_user durante la compilación.  Esto le permite crear su propio menú sin el mantenimiento de todo lo demás.

### ¿Netboot.xyz es compatible con el arranque seguro?

iPXE y, por lo tanto, netboot.xyz no admiten el arranque seguro porque sus [binarios no están firmados por Microsoft](https://ipxe.org/appnote/etoken). Debe deshabilitar el modo de inicio seguro en el menú de configuración del firmware de su computadora antes de poder iniciar netboot.xyz.

### ¿Qué sistemas operativos están disponibles actualmente en netboot.xyz?

#### Sistemas operativos

| Nombre                        | URL                                                | Núcleo del instalador               | Sistema operativo en vivo |
| ----------------------------- | -------------------------------------------------- | ----------------------------------- | ------------------------- |
| AlmaLinux                     | https://almalinux.org/                             | Sí                                  | No                        |
| Linux alpino                  | https://alpinelinux.org                            | Sí                                  | No                        |
| anarquía linux                | https://anarchyinstaller.org                       | Sí                                  | No                        |
| arco linux                    | https://www.archlinux.org                          | Sí                                  | No                        |
| Caja trasera                  | https://www.backbox.org                            | No                                  | Sí                        |
| Black Arch Linux              | https://blackarch.org                              | Sí                                  | Sí                        |
| Linux estrella azul           | https://sourceforge.net/proyectos/bluestarlinux    | No                                  | Sí                        |
| bodhi linux                   | https://www.bodhilinux.com                         | No                                  | Sí                        |
| CentOS                        | https://centos.org                                 | Sí                                  | No                        |
| sistema operativo central     | http://coreos.com/                                 | Sí                                  | No                        |
| Debian                        | https://debian.org                                 | Sí                                  | Sí                        |
| Profundo                      | https://www.deepin.org                             | No                                  | Sí                        |
| Devuán                        | https://devuan.org                                 | Sí                                  | No                        |
| SO elemental                  | https://elementary.io                              | No                                  | Sí                        |
| EndeavourOS                   | https://endeavouros.com                            | No                                  | Sí                        |
| gordo64                       | https://distro.ibiblio.org/fatdog/web/             | No                                  | Sí                        |
| Fedora                        | https://fedoraproject.org                          | Sí                                  | Sí                        |
| Sistema operativo Feren       | https://ferenos.weebly.com/                        | Sí                                  | No                        |
| Flatcar Linux                 | https://kinvolk.io/flatcar-container-linux/        | Sí                                  | No                        |
| FreeBSD                       | https://freebsd.org                                | Sí, imagen de disco                 | No                        |
| libreDOS                      | http://www.freedos.org                             | ISO - Disco de memoria              | No                        |
| GarudaLinux                   | https://garudalinux.org/                           | No                                  | Sí                        |
| Gentoo                        | https://gentoo.org                                 | Sí                                  | Sí                        |
| Segador                       | https://harvesterhci.io                            | Sí                                  | No                        |
| hrmpf                         | https://github.com/leahneukirchen/hrmpf/           | No                                  | Sí                        |
| IP Fire                       | https://www.ipfire.org                             | Sí                                  | No                        |
| K3OS                          | https://k3os.io/                                   | Sí                                  | Sí                        |
| kali linux                    | https://www.kali.org                               | Sí                                  | Sí                        |
| KDE neón                      | https://neon.kde.org                               | No                                  | Sí                        |
| Kodachi                       | https://www.digi77.com/linux-kodachi/              | No                                  | Sí                        |
| linux lite                    | https://www.linuxliteos.com                        | No                                  | Sí                        |
| LXLE                          | https://lxle.net/                                  | No                                  | Sí                        |
| Magia                         | https://www.mageia.org                             | Sí                                  | No                        |
| Mánjaro                       | https://manjaro.org                                | No                                  | Sí                        |
| menta                         | https://linuxmint.com                              | No                                  | Sí                        |
| Microsoft Windows             | https://www.microsoft.com                          | Medios suministrados por el usuario | No                        |
| MirOS                         | https://www.mirbsd.org                             | Sí                                  | No                        |
| Nitrux                        | https://nxos.org/                                  | No                                  | Sí                        |
| Nix OS                        | https://nixos.org                                  | Sí                                  | No                        |
| OpenBSD                       | https://openbsd.org                                | Sí                                  | No                        |
| abrirEuler                    | https://openeuler.org                              | Sí                                  | No                        |
| abrirSUSE                     | https://opensuse.org                               | Sí                                  | No                        |
| oracle linux                  | https://www.oracle.com/linux/                      | Sí                                  | Instalador                |
| Seguridad de loros            | https://www.parrotsec.org                          | No                                  | Sí                        |
| Menta                         | https://peppermintos.com                           | No                                  | Sí                        |
| Sistema operativo emergente   | https://system76.com/pop                           | No                                  | Sí                        |
| Proxmox VE                    | https://www.proxmox.com/                           | Sí                                  | No                        |
| Q4OS                          | https://q4os.org                                   | No                                  | Sí                        |
| Raízo                         | https://sourceforge.net/projects/live-raizo/       | No                                  | Sí                        |
| Rancher OS                    | https://rancher.com/rancher-os                     | Sí                                  | No                        |
| Red Hat Enterprise Linux      | https://www.redhat.com                             | Medios suministrados por el usuario | No                        |
| regolito                      | https://regolith-linux.org                         | No                                  | Sí                        |
| Linux rocoso                  | https://rockylinux.org/                            | Sí                                  | No                        |
| Linux científico              | https://cientificlinux.org                         | Sí                                  | No                        |
| Sector                        | https://septor.sourceforge.io                      | No                                  | Sí                        |
| Slackware                     | https://www.slackware.com                          | Sí                                  | No                        |
| sistema operativo inteligente | https://www.joyent.com/smartos                     | Sí                                  | No                        |
| SparkyLinux                   | https://sparkylinux.org/                           | No                                  | Sí                        |
| Cruz                          | https://tails.boum.org/                            | No                                  | Sí                        |
| Talos                         | https://www.talos.dev/                             | Sí                                  | No                        |
| Pequeño núcleo Linux          | https://tinycorelinux.net                          | Sí                                  | Sí                        |
| ubuntu                        | https://www.ubuntu.com                             | Sí                                  | Sí                        |
| vmware                        | https://www.vmware.com                             | Medios suministrados por el usuario | No                        |
| Viajero                       | https://voyagerlive.org                            | No                                  | Sí                        |
| VyOS                          | https://vyos.io                                    | Sí                                  | No                        |
| Instalador Zen                | https://sourceforge.net/projects/revenge-installer | Sí                                  | No                        |
| Sistema operativo Zorin       | https://zorinos.com                                | No                                  | Sí                        |

### Utilidades

| Nombre                             | URL                                                          | Escribe                |
| ---------------------------------- | ------------------------------------------------------------ | ---------------------- |
| 4MLinux                            | https://4mlinux.com/                                         | Núcleo/Initrd          |
| Rescate ALT Linux                  | https://en.altlinux.org/Rescate                              | ISO - Disco de memoria |
| BakAndImgCD                        | https://bakandimgcd.4mlinux.com/                             | Núcleo/Initrd          |
| CD de reparación de arranque       | https://sourceforge.net/projects/boot-repair-cd/             | CD en vivo             |
| Interrumpir                        | http://www.advancedclustering.com/products/software/breakin/ | Núcleo/Initrd          |
| CAÍN                               | https://www.caine-live.net/                                  | CD en vivo             |
| Clonezilla                         | http://www.clonezilla.org/                                   | CD en vivo             |
| DBAN                               | http://www.dban.org/                                         | Núcleo                 |
| GParted                            | http://gparted.org                                           | CD en vivo             |
| Grml                               | http://grml.org                                              | CD en vivo             |
| Disco de rescate de Kaspersky      | https://support.kaspersky.com/viruses/krd18                  | CD en vivo             |
| Prueba de memoria                  | http://www.memtest.org/                                      | Núcleo                 |
| MemTest86 gratis                   | https://www.memtest86.com                                    | Imagen USB             |
| Rehacer Rescate                    | http://redorescue.com/                                       | CD en vivo             |
| Rescatux                           | https://www.supergrubdisk.org/rescatux/                      | CD en vivo             |
| rescatezilla                       | https://rescuezilla.com/                                     | CD en vivo             |
| ShredOS                            | https://github.com/PartialVolume/shredos.x86_64              | Núcleo                 |
| Disco Super Grub2                  | http://www.supergrubdisk.org                                 | ISO - Disco de memoria |
| Rescate del sistema                | https://sistema-rescate.org/                                 | CD en vivo             |
| La suite de servidores más pequeña | https://thesss.4mlinux.com/                                  | Núcleo/Initrd          |
| CD de arranque definitivo          | http://www.ultimatebootcd.com                                | ISO - Disco de memoria |

### ¿Cuáles son algunos buenos recursos para obtener más información sobre el arranque de red?

* [El proyecto iPXE](http://ipxe.org/)
* [NetworkBoot.org](http://networkboot.org/)
* [Proyecto Syslinux](http://www.syslinux.org/wiki/index.php?title=The_Syslinux_Project)
