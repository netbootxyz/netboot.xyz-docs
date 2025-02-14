---
id: synology
title: Installing netboot.xyz on Synology NAS
sidebar_label: Synology NAS
description: Installing netboot.xyz onto a Synology NAS in a container
hide_table_of_contents: true
---

## Overview

This guide will walk you through the steps to install netboot.xyz onto a [Synology NAS](https://amzn.to/430KH1n) using Container Manager.

## Requirements

- [Synology NAS](https://amzn.to/430KH1n) with Container Manager support
- Container Manager package installed on the Synology NAS
- Internet connection

### Install Container Manager

Open the Synology Package Center, search for "Container Manager", and click "Install".

### Download netboot.xyz Container Image

Open Container Manager from the main menu, go to the "Registry" tab, and search for `netbootxyz`. Select the `netbootxyz/netboot.xyz` image from the list, click "Download", and choose the latest version.

### Create and Configure the Container

Go to the "Image" tab in Container Manager, select the `netbootxyz/netboot.xyz` image, and click "Run". In the "Create Container" wizard, configure the following settings:

- **General Settings**:
  - Container Name: `netbootxyz`
  - Enable "Auto-restart"

- **Advanced Settings**:
  - **Port Settings**: 
    - Map port `3000/TCP` on the container to a desired port on the NAS, e.g., `3000`.
    - Map port `80/TCP` on the container to a desired port on the NAS, e.g., `8080` so it doesn't conflict with the UI.
    - Map port `69/UDP` on the container to a desired port on the NAS, e.g., `69` so it doesn't conflict with the UI.
  - **Volume**:
    - Click "Add Folder" and map a folder on your NAS to `/config` in the container.
    - Click "Add Folder" and map a folder on your NAS to `/assets` in the container.
  - **Network**: Set the network mode to "Bridge".
  - **Environment**: 
    - Remove `TFTP_OPTS` if you aren't going to use it. Ensure NGINX port lines up to the port you mapped in the port settings. Ensure `WEB_APP_PORT` lines up to the port you mapped in the port settings.

Click "Apply" to create the container.

### Start the Container

Go to the "Container" tab in Container Manager, select the `netbootxyz` container, and click "Start".

### Access netboot.xyz

Open a web browser and navigate to the IP address of your Synology NAS on port 3000 (e.g., `http://<NAS_IP>:3000`). You should see the netboot.xyz interface. The asset folder will be mapped to `8080`, or whatever you set it to, so you can access the UI at `http://<NAS_IP>:8080`.

## Conclusion

You have successfully installed netboot.xyz on your Synology NAS using Container Manager. You can now use netboot.xyz to manage and boot various operating systems over the network.
