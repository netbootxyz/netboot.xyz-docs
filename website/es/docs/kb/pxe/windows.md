---
id: ventanas
title: "ventanas"
description: "Instalación de Windows 10 con netboot.xyz"
hide_table_of_contents: verdadero
---

Esta es una de las preguntas más frecuentes, por lo que merece su propia página.  
Esta guía asumirá que está utilizando el contenedor Docker linuxserver.io.

#### Requisitos

- Samba (SMB, CIFS) compartido con Windows 10 ISO extraído
- Imagen de Windows PE como ISO, las instrucciones sobre cómo compilarla se pueden encontrar [aquí](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-create-usb-bootable-drive#create-a-winpe-iso-dvd-or-cd)

Paso 1. Descargue WindowsPE/genere la imagen y descargue Windows 10 ISO.  
Paso 2. Configure un recurso compartido SMB con Windows 10 ISO extraído en un directorio allí.  
Paso 3. Cargue Windows PE en la carpeta /assets/WinPE/x64/ del contenedor netboot.xyz de Linuxserver.io.  
Paso 4. Inicie el menú, vaya a Windows.  
Paso 5. Establezca la URL base para que apunte a la dirección IP del contenedor, el puerto Nginx correcto para alojar activos y el directorio correcto (por ejemplo, http://192.168.2.46:8000/WinPE).  
Paso 6. Cargue el instalador.  
Paso 7. Debería aparecer un terminal.  
Paso 8. Monte el recurso compartido ISO de Windows, con `net use F: \\&#060;server-ip-address&#062;\&#060;share-name&#062; /usuario:&#060;dirección-ip-servidor&#062;\&#060;nombre-de-usuario-si-es-necesario&#062; &#060;contraseña si es necesario&#062;`

:::Nota

El terminal utiliza el diseño de teclado de EE. UU. de forma predeterminada.

:::  
Paso 9. Cambie al recurso compartido montado (`F:`) y ejecute setup.exe o inícielo con `F:\setup.exe` Paso 10. Debería recibir la configuración normal y poder instalarla.

### URL persistente para Windows con el contenedor docker

Paso 1. Vaya al configurador del contenedor (Netboot.xyz Configuration), el lugar donde puede administrar los activos y menús locales.  
Paso 2. Vaya a Menús -> boot.cfg.  
Paso 3. Configure win_base_url para que apunte a la dirección IP del contenedor, el puerto Nginx correcto para alojar activos y el directorio correcto, por ejemplo:

```bash
establecer win_base_url http://192.168.2.46:8000/WinPE
```
Paso 4. Ya no debería necesitar ingresar la URL al iniciar Windows, así que disfrute.
