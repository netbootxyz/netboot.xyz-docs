---
title: Container Parameters
sidebar_position: 3
description: "netboot.xyz Docker Container Parameters"
hide_table_of_contents: true
---

Container images are configured using parameters passed at runtime. These parameters are separated by a colon and indicate `<external>:<internal>` respectively. For example, `-p 8080:80` would expose port `80` from inside the container to be accessible from the host's IP on port `8080` outside the container.

| Parameter | Function |
| :-------: |  ------- |
| `-p 3000` | Web configuration interface. |
| `-p 69/udp` | TFTP Port. |
| `-p 80` | NGINX server for hosting assets. |
| `-e WEB_APP_PORT=3000` | Specify a different port for the web configuration interface to listen on. |
| `-e NGINX_PORT=80` | Specify a different port for NGINX service to listen on. |
| `-e MENU_VERSION=2.0.84` | Specify a specific version of boot files you want to use from netboot.xyz (unset pulls latest) |
| `-e TFTPD_OPTS='--tftp-single-port'` | Specify arguments for the TFTP server (this example makes TFTP send all data over port 69) |
| `-v /config` | Storage for boot menu files and web application config |
| `-v /assets` | Storage for netboot.xyz bootable assets (live CDs and other files) |
