---
id: les fenêtres
title: "les fenêtres"
description: "Installation de Windows 10 avec netboot.xyz"
hide_table_of_contents: vrai
---

C'est l'une des questions les plus fréquemment posées, elle mérite donc sa propre page.  
Ce guide supposera que vous utilisez le conteneur Docker linuxserver.io.

#### Conditions

- Partage Samba (SMB,CIFS) avec Windows 10 ISO extrait
- Image Windows PE en tant qu'ISO, des instructions sur la façon de la construire peuvent être trouvées [ici](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-create-usb-bootable-drive#create-a-winpe-iso-dvd-or-cd)

Étape 1. Téléchargez WindowsPE/générez l'image et téléchargez Windows 10 ISO.  
Étape 2. Configurez un partage SMB avec Windows 10 ISO extrait dans un répertoire là-bas.  
Étape 3. Téléchargez Windows PE dans le dossier /assets/WinPE/x64/ du conteneur netboot.xyz de Linuxserver.io.  
Étape 4. Démarrez le menu, allez dans Windows.  
Étape 5. Définissez l'URL de base pour qu'elle pointe vers l'adresse IP du conteneur, le port Nginx correct pour héberger les actifs et le bon répertoire (par exemple, http://192.168.2.46:8000/WinPE).  
Étape 6. Chargez le programme d'installation.  
Étape 7. Vous devriez être invité avec un terminal.  
Étape 8. Montez le partage ISO Windows, avec `net use F: \\&#060;server-ip-address&#062;\&#060;share-name&#062; /user :&#060;adresse-ip-serveur&#062;\&#060;nom-utilisateur-si-nécessaire&#062 ; &#060;mot de passe-si-nécessaire&#062;`

:::Remarque

Le terminal utilise la disposition du clavier américain par défaut.

:::  
Étape 9. Accédez au partage monté (`F:`) et exécutez setup.exe ou démarrez-le avec `F:\setup.exe` Étape 10. Vous devriez être accueilli avec la configuration normale et pouvoir l'installer.

### URL persistante pour Windows avec le conteneur docker

Étape 1. Accédez au configurateur du conteneur (Configuration Netboot.xyz), l'endroit où vous pouvez gérer les actifs et les menus locaux.  
Étape 2. Allez dans Menus -> boot.cfg.  
Étape 3. Définissez win_base_url sur pour pointer vers l'adresse IP du conteneur, le port Nginx correct pour héberger les actifs et le bon répertoire, par exemple :

```bash
définir win_base_url http://192.168.2.46:8000/WinPE
```
Étape 4. Vous ne devriez plus avoir besoin de saisir l'URL lors du démarrage de Windows, alors profitez-en.
