---
id: windows
title: "Windows"
description: "Installing Windows 10 with netboot.xyz"
hide_table_of_contents: true
---

This is one of the most frequently asked questions, so this deserves its own page.  
This guide will assume that you're using the linuxserver.io Docker container.

#### Requirements

- Samba (SMB,CIFS) share with Windows 10 ISO extracted
- Windows PE image as an ISO, instructions on how to build it can be found [here](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-create-usb-bootable-drive#create-a-winpe-iso-dvd-or-cd)

Step 1. Download WindowsPE/generate the image and download Windows 10 ISO.  
Step 2. Setup an SMB share with Windows 10 ISO extracted to a directory there.  
Step 3. Upload Windows PE to Linuxserver.io's netboot.xyz container's /assets/WinPE/x64/ folder.  
Step 4. Boot the menu, go to Windows.  
Step 5. Set the base URL to point to the container's IP address, the correct Nginx port for hosting assets and right directory (eg. http://192.168.2.46:8000/WinPE).  
Step 6. Load the installer.  
Step 7. You should be prompted with a terminal.
Step 8. Type `wpeinit` to load networking support.
Step 9. Mount the Windows ISO share, with `net use F: \\<server-ip-address>\<share-name> /user:<server-ip-address>\<username-if-needed> <password-if-needed>`

:::note

The terminal uses US keyboard layout by default.  

:::
Step 10. Change into the mounted share (`F:`), and execute setup.exe or start it with `F:\setup.exe`
Step 11. You should be greeted with the normal setup and be able to install it.

### Persistent url for Windows with the docker container

Step 1. Go to the container's configurator (Netboot.xyz Configuration), the place where you can manage local assets and menus.  
Step 2. Go to Menus -> boot.cfg.  
Step 3. Set win_base_url to to point to the container's IP address, the correct Nginx port for hosting assets and right directory, for example:

```bash
set win_base_url http://192.168.2.46:8000/WinPE
```
Step 4. You shouldn't need to input the URL anymore when booting Windows so enjoy.

### Extending the above to allow booting of multiple Windows images from one boot.wim
Before you do this make sure you know how to follow the basics above.

Step 1. `copype amd64 C:\WinPE_amd64`.

Step 2. `Dism /Mount-Image /ImageFile:"C:\WinPE_amd64\media\sources\boot.wim" /Index:1 /MountDir:"C:\WinPE_amd64\mount"`.

Step 3. Open notepad as Administrator and the open "C:\WinPE_amd64\mount\Windows\System32\startnet.cmd" and add the following subsiuting your own nework share info.
`wpeinit
net use F: \\192.168.0.24\iso\Win10_22H2_English_x64 /user:winPE PublicPassword123
F:\init.bat`

Step 4. `Dism /Unmount-Image /MountDir:C:\WinPE_amd64\mount /Commit`.

Step 5. Upload "C:\WinPE_amd64\media\sources\boot.wim" to your netboot server as per the above in step 3.

Step 6. Create "\\192.168.0.24\iso\Win10_22H2_English_x64\init.bat" and add.
`F:\setup.exe`
If you would like to use a unattend.xml file you can use.
`F:\setup.exe /unattend:F:\unattend.xml`

The above should now boot the boot.wim and then auto start the setup.exe. You could always extend your init.bat to contain a selection menu to chose what setup.exe you boot from Winodws 10 or 11.
