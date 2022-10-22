---
id: Openstack
title: "OpenStack"
description: "Verwenden von netboot.xyz mit OpenStack"
hide_table_of_contents: Stimmt
---

**Experimentell, hatte in letzter Zeit keine Gelegenheit, dies durchzugehen, also YMMV.**

Das ISO-Image „netboot.xyz“ kann mit OpenStack-Clouds verwendet werden, um eine Instanz zu booten und eine benutzerdefinierte Installation eines Betriebssystems durchzuführen.

### Befehlszeile

Beginnen Sie mit dem Herunterladen der ISO und importieren Sie sie dann in Glow:

    $ wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso
    $ look image-create --name netboot.xyz \
        --disk-format iso \
        --container-format bare \
        - -file netboot.xyz-dhcp.iso \
        --visibility public
    +------------------+------------- ------------------------+
    | Eigentum | Wert |
    +------------------+------------------------------------- ---------+
    | Prüfsumme | 45cdcb89576b6c05598b11585aef46bc |
    | container_format | nackt |
    | erstellt_um | 2016-01-27T20:02:06Z |
    | disk_format | ISO |
    | ID | 4f11d49e-157b-4740-87ad-db7d59bb5d6d |
    | min_disk | 0 |
    | min_ram | 0 |
    | Name | netboot.xyz |
    | Besitzer | fbfce4cb346c4f9097a977c54904cafd |
    | geschützt | Falsch |
    | Größe | 1048576 |
    | Zustand | aktiv |
    | Tags | [] |
    | aktualisiert_um | 2016-01-27T20:02:04Z |
    | virtuelle_größe | Keine |
    | Sichtbarkeit | öffentlich |
    +------------------+--------------------------------- ---------+

Der Import sollte nur wenige Sekunden dauern.  Nehmen Sie die UUID aus dem Feld `id` , das per Blick zurückgegeben wird, und überprüfen Sie, ob das Bild erfolgreich importiert wurde:

    $ look image-show 4f11d49e-157b-4740-87ad-db7d59bb5d6d
    +------------------------------+--------------- -----------------------+
    | Eigentum | Wert |
    +------------------+------------------------------------- ---------+
    | Prüfsumme | 45cdcb89576b6c05598b11585aef46bc |
    | container_format | nackt |
    | erstellt_um | 2016-01-27T20:02:06Z |
    | disk_format | ISO |
    | ID | 4f11d49e-157b-4740-87ad-db7d59bb5d6d |
    | min_disk | 0 |
    | min_ram | 0 |
    | Name | netboot.xyz |
    | Eigentümer | fbfce4cb346c4f9097a977c54904cafd |
    | geschützt | Falsch |
    | Größe | 1048576 |
    | Zustand | aktiv |
    | Tags | [] |
    | aktualisiert_um | 2016-01-27T20:02:04Z |
    | virtuelle_größe | Keine |
    | Sichtbarkeit | öffentlich |
    +------------------+------------------------ ---------+

Das Bild hat den Status `aktiv`, also wissen wir, dass dieser Blick es richtig importiert hat.

Lassen Sie uns eine neue Instanz mit diesem ISO booten:

    nova boot --flavor m1.small \
        --image <image-uuid-of-netbootxyz-image> \
        --nic net-id=<network-uuid> \
        netbootxyz-testing

Warten Sie etwa 30 Sekunden und fordern Sie dann eine Konsolen-URL an:

    nova get-spice-console c4ff017e-1234-4053-b740-e83eade277b9 spice-html5

Öffnen Sie die Konsolen-URL, die nova zurückgibt, und Sie sollten die vertraute netboot.xyz iPXE-Schnittstelle in der Spice-Konsole sehen!

### Horizont

Beginnen Sie mit [, indem Sie die netboot.xyz ISO](https://boot.netboot.xyz/ipxe/netboot.xyz.iso) auf Ihre lokale Workstation herunterladen.  Befolgen Sie diese Schritte, um das Image mit Horizon in Ihre OpenStack-Cloud zu importieren:

* Klicken Sie auf der linken Seite auf die Registerkarte _Compute_ und dann auf _Images_
* Klick _Bild_ erstellen (oben rechts)
  * Name: `netboot.xyz ISO`
  * Bildquelle: Bilddatei
  * Bilddatei: (navigiere zu der heruntergeladenen ISO)
  * Format: ISO - Image der optischen Festplatte
  * Öffentlich: Aktiviert (optional, aber empfohlen, wenn Sie möchten, dass andere Mandanten verwenden)
* Klicken Sie auf _Bild erstellen_

Warten Sie einen Moment, bis der Status `aktiv`wird. Dies sollte nur wenige Sekunden dauern.  Um eine Instanz mit dem hochgeladenen ISO zu booten, wählen Sie unbedingt _Boot from image_ und wählen Sie _netboot.xyz ISO_ aus der Dropdown-Liste aus. Konfigurieren Sie Netzwerk- und Sicherheitsgruppen so, wie Sie es normalerweise für jede andere -Instanz tun würden.

Wenn die Instanz vollständig erstellt und in den aktiven Status übergegangen ist, klicken Sie auf den Instanznamen und wechseln Sie dann zur Registerkarte _Console_. Abhängig von Ihrem Browser Sie möglicherweise auf den Link klicken, um nur die Konsole anzuzeigen.

An diesem Punkt sollten Sie in der Lage sein, das iPXE-Menü anzuzeigen und Ihr Betriebssystem zu installieren.
