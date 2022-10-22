---
id: Edgerouter
title: "Ubiquiti EdgeRouter"
description: Ubiquiti EdgeRouter-Nutzung
hide_table_of_contents: Stimmt
---

Dieses Dokument behandelt die Einrichtung von netboot.xyz, einem Dienst, der iPXE-basierte Installation und Live-Boot einer Reihe von Betriebssystemen auf einem Ubiquiti EdgeRouter bietet.

Vielen Dank an [Sam Kottler](https://github.com/skottler) für das ursprüngliche Schreiben dieser Anleitung. Verbessern Sie die Setup-Robustheit, indem Sie den eingebetteten TFTP-Daemon von dnsmasq von [Yan Grunenberger](https://github.com/ravens) anstelle des externen TFTP-Pakets verwenden.

### Annahmen

Ich habe in diesem Dokument einige Annahmen getroffen, die für Ihr Setup wahrscheinlich anders sein werden:

* Es gibt einen DHCP-Pool namens `LAN`
* Der Pool `LAN` verwaltet `10.10.2.0/24`

### Konfigurieren Sie die TFTP-Unterstützung in dnsmasq

Standardmäßig wird dnsmasq im Edgerouter verwendet, um DNS-Dienste bereitzustellen. Um es zu aktivieren:

```bash
sudo mkdir /config/user-data/tftproot
sudo chmod ugo+rX /config/user-data/tftproot

konfigurieren

DNS-Weiterleitungsoptionen des Dienstes festlegen enable-tftp
DNS-Weiterleitungsoptionen des Dienstes festlegen tftp-root=/config/user- data/tftroot

commit
speichern
```

### Richten Sie TFTP-Komponenten ein

Laden Sie das kpxe-Image für netboot.xyz herunter und legen Sie die Berechtigungen richtig fest:

```bash
sudo curl -o /config/user-data/tftproot/netboot.xyz.kpxe https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe
sudo chmod ugo+r /config/user-data/tftproot/ netboot.xyz.kpxe
```

An diesem Punkt sollten Sie in der Lage sein, einen TFTP-Client von einem Client in `10.10.2.0/24` zu verwenden, um das Bild abzurufen:

```bash
$ tftp 10.10.2.1
tftp> get netboot.xyz.kpxe
354972 Bytes in 2,0 Sekunden empfangen
```

### dhcpd konfigurieren

Wir werden DHCP auf dem EdgeRouter konfigurieren, um Clients die richtigen Parameter bereitzustellen:

```bash
configure

set service dhcp-server global-parameters "option client-arch code 93 = unsigned integer 16;"
Dienst DHCP-Server Shared-Network-Name bearbeiten LAN-Subnetz 10.10.2.0/24
Bootfile-Server 10.10.2.1 setzen
Bootfile-Name netboot.xyz.kpxe setzen

Committen
Speichern
```

Die Konfiguration für den Pool `LAN` sollte nun etwa so aussehen:

```bash
skottler@edge1# show service dhcp-server shared-network-name LAN
 authoritative enable
 subnet 10.10.2.0/24 {
     bootfile-name netboot.xyz.kpxe
     bootfile-server 10.10.2.1
     default-router 10.10.2.1
     DNS-Server 10.10.2.1
     Lease 86400
     Start 10.10.2.100 {
         stop 10.10.2.199
     }
 }
[edit]
```

Das ist es!

## Das erweiterte Setup mit Unterstützung für Legacy und UEFI

### Verwenden von ISC-DHCP

Dieser Abschnitt wurde von [Skyler Mäntysaari](https://github.com/samip5)geschrieben.

Dies erfordert, dass Sie `set service dhcp-server use-dnsmasq enable`nicht verwenden. Wenn Sie das verwenden, wird es nicht funktionieren.

Wir werden damit beginnen, die PXE-Boot-bezogenen Dinge aus den DHCP-Server-Optionen zu entfernen, also lauten die Befehle dafür in etwa so:

```bash
delete service dhcp-server shared-network-name LAN subnet 10.10.2.0/24 bootfile-name netboot.xyz.kpxe
delete service dhcp-server shared-network-name LAN subnet 10.10.2.0/24 bootfile-server 10.10.2.1
```

Wir werden jetzt die efi-Version der Boot-Datei herunterladen, falls sie noch nicht existiert:
```
sudo curl -o /config/user-data/tftproot/netboot.xyz.efi https://boot.netboot.xyz/ipxe/netboot.xyz.efi
sudo chmod ugo+r /config/user-data/tftproot/ netboot.xyz.efi
```

Als nächstes erstellen wir einen Skriptordner für die Skripte im dauerhaften Speicher (sollte über Upgrades hinweg bestehen bleiben):

```bash
mkdir --parents /config/user-data/scripts/pxe/
```

Als nächstes gehen wir in den Konfigurationsmodus und fügen die Haupt-PXE-Konfigurationsdatei ein:

```bash
set service dhcp-server global-parameters "deny bootp;"
Setze Service DHCP-Server globale Parameter "include &quot;/config/user-data/scripts/pxe/option-space.conf&quot;;"
set service dhcp-server shared-network-name LAN subnet 10.10.2.0/24 subnet-parameters "include &quot;/config/user-data/scripts/pxe/pxe.conf&quot;;"
```

ES MUSS genau so eingegeben werden, der "" Teil.

Die Datei /config/user-data/scripts/pxe/pxe.conf:

```bash
Booten zulassen;
nächster Server 10.10.2.1;

if option arch = 00:07 {
    filename "netboot.xyz.efi";
} elsif Option arch = 00:00 {
    Dateiname "netboot.xyz.kpxe";
} sonst {
    Dateiname "netboot.xyz.efi";
}
```

Die Datei /config/user-data/scripts/pxe/option-space.conf:

```bash
# Declare the iPXE/gPXE/Etherboot option space
option space ipxe;
option ipxe-encap-opts code 175 = encapsulate ipxe;

# iPXE options, can be set in DHCP response packet
option ipxe.priority         code   1 = signed integer 8;
option ipxe.keep-san         code   8 = unsigned integer 8;
option ipxe.skip-san-boot    code   9 = unsigned integer 8;
option ipxe.syslogs          code  85 = string;
option ipxe.cert             code  91 = string;
option ipxe.privkey          code  92 = string;
option ipxe.crosscert        code  93 = string;
option ipxe.no-pxedhcp       code 176 = unsigned integer 8;
option ipxe.bus-id           code 177 = string;
option ipxe.bios-drive       code 189 = unsigned integer 8;
option ipxe.username         code 190 = string;
option ipxe.password         code 191 = string;
option ipxe.reverse-username code 192 = string;
option ipxe.reverse-password code 193 = string;
option ipxe.version          code 235 = string;
option iscsi-initiator-iqn   code 203 = string;

# iPXE feature flags, set in DHCP request packet
option ipxe.pxeext    code 16 = unsigned integer 8;
option ipxe.iscsi     code 17 = unsigned integer 8;
option ipxe.aoe       code 18 = unsigned integer 8;
option ipxe.http      code 19 = unsigned integer 8;
option ipxe.https     code 20 = unsigned integer 8;
option ipxe.tftp      code 21 = unsigned integer 8;
option ipxe.ftp       code 22 = unsigned integer 8;
option ipxe.dns       code 23 = unsigned integer 8;
option ipxe.bzimage   code 24 = unsigned integer 8;
option ipxe.multiboot code 25 = unsigned integer 8;
option ipxe.slam      code 26 = unsigned integer 8;
option ipxe.srp       code 27 = unsigned integer 8;
option ipxe.nbi       code 32 = unsigned integer 8;
option ipxe.pxe       code 33 = unsigned integer 8;
option ipxe.elf       code 34 = unsigned integer 8;
option ipxe.comboot   code 35 = unsigned integer 8;
option ipxe.efi       code 36 = unsigned integer 8;
option ipxe.fcoe      code 37 = unsigned integer 8;
option ipxe.vlan      code 38 = unsigned integer 8;
option ipxe.menu      code 39 = unsigned integer 8;
option ipxe.sdi       code 40 = unsigned integer 8;
option ipxe.nfs       code 41 = unsigned integer 8;

# Other useful general options
# http://www.ietf.org/assignments/dhcpv6-parameters/dhcpv6-parameters.txt
option arch code 93 = unsigned integer 16;
```

Nach all dem sollte es so sein! Ich hoffe das hilft.

### Verwenden von dnsmasq

Dieser Abschnitt wurde von [Benjamin Reich](https://benjaminreich.de/)geschrieben.

Dieser Teil ist erforderlich, wenn Sie `set service dhcp-server use-dnsmasq enable`verwenden.

Verbinden Sie sich über SSH und ersetzen Sie `SERVERIP` durch die tatsächliche IP.

```bash
konfigurieren
Service DHCP-Server use-dnsmasq aktivieren
Service DNS-Weiterleitungsoptionen festlegen "dhcp-match=set:bios,60,PXEClient:Arch:00000"
Service DNS-Weiterleitungsoptionen festlegen "dhcp-boot=tag:bios,netboot .xyz.kpxe,,SERVERIP"
DNS-Weiterleitungsoptionen des Dienstes festlegen "dhcp-match=set:efi32,60,PXEClient:Arch:00002"
DNS-Weiterleitungsoptionen des Dienstes festlegen "dhcp-boot=tag:efi32,netboot.xyz. efi,,SERVERIP"
DNS-Weiterleitungsoptionen des Dienstes festlegen "dhcp-match=set:efi32-1,60,PXEClient:Arch:00006"
DNS-Weiterleitungsoptionen des Dienstes festlegen "dhcp-boot=tag:efi32-1,netboot.xyz .efi,,SERVERIP"
DNS-Weiterleitungsoptionen des Dienstes festlegen "dhcp-match=set:efi64,60,PXEClient:Arch:00007"
DNS-Weiterleitungsoptionen des Dienstes festlegen "dhcp-boot=tag:efi64,netboot.xyz.efi, ,SERVERIP"
DNS-Weiterleitungsoptionen des Dienstes festlegen "dhcp-match=set:efi64-1,60,PXEClient:Arch:00008"
DNS-Weiterleitungsoptionen des Dienstes festlegen "dhcp-boot=tag:efi64-1,netboot.xyz.efi ,,SERVERIP"
Service-DNS-Weiterleitungsoptionen festlegen "dhcp-match=set:efi64-2,60,PXEClient:Arch:00009"
se t Service-DNS-Weiterleitungsoptionen „dhcp-boot=tag:efi64-2,netboot.xyz.efi,,SERVERIP“
commit; sparen
```
