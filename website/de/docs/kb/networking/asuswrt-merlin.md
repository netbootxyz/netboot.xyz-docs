---
id: asuswrt-merlin
title: "Asuswrt-Merlin"
description: Asuswrt-Merlin-Verwendung
hide_table_of_contents: Stimmt
---

Dadurch können Legacy-BIOS und UEFI-Geräte auf Asuswrt-Merlin-Geräten per PXE in das Menü [netboot.xyz](https://github.com/netbootxyz/netboot.xyz) booten.

Angenommen, Ihr AsusWRT-Merlin-Router ist 192.168.1.1; Melden Sie sich bei der GUI an
1. LAN -> DHCP-Server -> Basiskonfiguration: Stellen Sie "Enable the DHCP Server" auf Yes ein; Startadresse des IP-Pools: 192.168.1.2; Endadresse des IP-Pools: 192.168.1.254
2. Verwaltung -> System -> Dienst: Stellen Sie "SSH aktivieren" auf Nur LAN ein
3. Verwaltung -> System -> Persistente JFFS2-Partition: Setzen Sie "Benutzerdefinierte JFFS-Skripts und -Konfigurationen aktivieren" auf "Ja".

:::Hinweis

JFFS ist ein beschreibbarer Abschnitt des Flash-Speichers (die Größe variiert je nach Router-Modell, wobei die neueren Modelle etwas mehr als 60 MB verfügbaren Speicherplatz haben), der es Ihnen ermöglicht, kleine Dateien (z. B. Skripte) im Router ohne zu speichern muss eine USB-Festplatte angeschlossen sein. Dieser Speicherplatz wird den Neustart überstehen (**, aber möglicherweise überlebt er das Flashen der Firmware NICHT, also sichern Sie ihn zuerst, bevor Sie ihn flashen!**).

:::

4. Starten Sie den Router über die GUI neu und warten Sie, bis Sie 192.168.1.1 pingen können
5. `ssh-Benutzername@192.168.1.1`
6. `mkdir /jffs/tftproot`
7. `curl -o /jffs/tftproot/netboot.xyz.kpxe https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe`
8. `curl -o /jffs/tftproot/netboot.xyz.efi https://boot.netboot.xyz/ipxe/netboot.xyz.efi`
9. `Berühren Sie /jffs/configs/dnsmasq.conf.add`
10. `nano /jffs/configs/dnsmasq.conf.add` und fügen Sie Folgendes hinzu:

> enable-tftp  
> tftp-root=/jffs/tftproot  
> dhcp-match=set:bios,60,PXEClient:Arch:00000  
> dhcp-boot=tag:bios,netboot.xyz.kpxe,,192.168.1.1  
> dhcp-match=set:efi32,60,PXEClient:Arch:00002  
> dhcp-boot=tag:efi32,netboot.xyz.efi,,192.168.1.1  
> dhcp-match=set:efi32-1,60 ,PXEClient:Arch:00006  
> dhcp-boot=tag:efi32-1,netboot.xyz.efi,,192.168.1.1  
> dhcp-match=set:efi64,60,PXEClient:Arch:00007  
> dhcp-boot =tag:efi64,netboot.xyz.efi,,192.168.1.1  
> dhcp-match=set:efi64-1,60,PXEClient:Arch:00008  
> dhcp-boot=tag:efi64-1,netboot.xyz. efi,,192.168.1.1  
> dhcp-match=set:efi64-2,60,PXEClient:Arch:00009  
> dhcp-boot=tag:efi64-2,netboot.xyz.efi,,192.168.1.1

11. `starte` neu und warte, bis du 192.168.1.1 pingen kannst
12. von einem anderen Gerät bestätigen, dass TFTP auf dem Router funktioniert

> `tftp 192.168.1.1`  
> tftp> `get netboot.xyz.kpxe`  
> 368475 Bytes in 0,5 Sekunden empfangen

13. Testen Sie mit einem UEFI-Gerät und mit einem Legacy-BIOS-Gerät, ob der PXE-Start funktioniert (möglicherweise haben Sie den PXE-Start im BIOS und/oder in UEFI aktiviert. Für UEFI müssen Sie normalerweise den UEFI-Netzwerkstapel aktivieren).

Verweise:

* https://programmingflow.com/2015/04/08/boot-any-machine-in-your-home-with-pxe.html
* https://netboot.xyz/docs/kb/networking/edgerouter
* https://github.com/RMerl/asuswrt-merlin.ng/wiki/Custom-config-files
