---
id: gce
title: Google Compute-Engine
description: Verwenden von netboot.xyz auf Google Compute Engine
hide_table_of_contents: Stimmt
---

## Verwendung mit netboot.xyz

**Experimentell, funktioniert derzeit nicht bei Images, die Memdisk verwenden, da die Konsolenausgabe nicht geändert werden kann.**

*Hinweis: Die Funktionalität ist eingeschränkt, da die Konsole Serial Over Lan ist.  Distributionen, die memdisk verwenden, liefern möglicherweise keine Ausgabe, während andere Distributionen, die über den Kernel abgerufen werden, das Ändern der Konsoleneinstellungen während des Ladens zulassen.  Dazu gehören die meisten Hilfsprogramme.  Ich werde wahrscheinlich versuchen, Optionen herauszufiltern, die in Zukunft nicht funktionieren.  Die Konsole funktioniert möglicherweise während der Installation, funktioniert jedoch möglicherweise beim ersten Start nicht mehr, wenn sie während der Installation nicht festgelegt wird.*

### Erstellen Sie einen Eimer

Legen Sie einen Namen für Ihren Bucket fest und wählen Sie die regionale Speicherklasse aus.

Laden Sie das netboot.xyz-gce-Image von diesem [Link](https://boot.netboot.xyz/ipxe/netboot.xyz-gce.tar.gz) in das Stammverzeichnis Ihres Buckets hoch.

    gsutil cp $tmp/$image_name.tar.gz gs://$gs_bucket

### Erstellen Sie ein Bild

Erstellen Sie mithilfe des gcloud-Dienstprogramms oder der Google Cloud Shell ein Image von der iPXE-Festplatte, die Sie im vorherigen Schritt hochgeladen haben:

    gcloud compute images create $image_name --source-uri gs://$gs_bucket/$image_name.tar.gz

### Starten Sie eine Instanz

Starten Sie eine Instanz aus dem von Ihnen erstellten Image, stellen Sie sicher, dass die serielle Schnittstelle aktiviert ist:

    gcloud compute instances create $instance_name --image $image_name --metadata serial-port-enable=1

### Stellen Sie über die serielle Konsole eine Verbindung zur Instanz her

    gcloud beta compute connect-to-serial-port $instance_name

Von hier aus sollten Sie das Menü netboot.xyz sehen, und das ist wahrscheinlich alles, was Sie an dieser Stelle tun können. :)

### Konfigurieren der Instanz

Falls DHCP nicht funktioniert, müssen Sie während der Installation die statische IP-Adresse festlegen.  Sie können dies anzeigen, indem Sie in der Konsole zu den Instanzdetails gehen und unter Netzwerk auf Standard klicken.  Auf dieser Seite müssen Sie die interne IP der Instanz zusammen mit dem Subnetz und dem Gateway festlegen.

### Anmerkungen

Hier sind einige Hinweise, wie das iPXE-Image erstellt wird, falls Sie mit Vanilla iPXE in GCE herumspielen möchten.

Weitere Informationen zur GCE-Unterstützung in iPXE finden Sie im iPXE-Commit [hier](https://github.com/ipxe/ipxe/commit/de85336abb7861e4ea4df2e296eb33d179c7c9bd).

So erstellen Sie ein verwendbares Image für GCE:

    make bin/ipxe.usb CONFIG=cloud EMBED=$tmp/main.ipxe
    cp -f bin/ipxe.usb $tmp/disk.raw
    ( cd $tmp; tar Sczvf $image_name.tar.gz disk.raw )

Damit die Installationsprogramme bei der Erkennung der GCE-Festplatte seriell arbeiten, wird die Konsole in der Kernel-Befehlszeile auf Folgendes eingestellt:

    Konsole=ttyS0,115200n8

## Verwendung ohne netboot.xyz (Standard iPXE)

Wenn Sie Ihr Skript erstellen, möchten Sie, dass es in etwa so aussieht:

    #!ipxe
    
    echo Google Compute Engine - iPXE-Boot über Metadaten
    ifstat ||
    DHCP ||
    Strecke ||
    -Kette -ar http://metadata.google.internal/computeMetadata/v1/instance/attributes/ipxeboot

Wenn Sie dann Ihre Instanz bereitstellen, können Sie Ihre benutzerdefinierte iPXE-Skriptdatei angeben:

    # Gemeinsames Boot-Image erstellen
    make bin/ipxe.usb CONFIG=cloud EMBED=config/cloud/gce.ipxe
    
    # Boot-Skript pro Instanz konfigurieren
    gcloud compute instances add-metadata <instance> \
           --metadata-from-file ipxeboot =boot.ipxe

Dadurch kann Ihr benutzerdefiniertes kompiliertes iPXE booten und dann sofort mit Ihrem benutzerdefinierten iPXE-Skript verkettet werden.
