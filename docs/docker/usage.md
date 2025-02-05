---
title: Setting up the Container
sidebar_position: 2
description: "Setting up the netboot.xyz Docker Container"
hide_table_of_contents: true
---

The netboot.xyz Docker image requires an existing DHCP server to be setup and running in order to boot from it. The image does not start a DHCP server service. Please see the DHCP configuration setup near the end of this document for ideas on how to enable your environment to talk to the container. In most cases, you will need to specify the next-server and boot file name in the DHCP configuration.

### Installing Docker

If you have not set up Docker on your system, you can follow the instructions below to install it. The following examples are for Debian, Ubuntu, and Red Hat based systems.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>

  <TabItem value="deb" label="Debian" default>
    ```shell
    # Add Docker's official GPG key:
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc
    
    # Add the repository to Apt sources:
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```
  </TabItem>
  <TabItem value="ubuntu" label="Ubuntu">
    ```bash
    # Add Docker's official GPG key:
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc
    
    # Add the repository to Apt sources:
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```
  </TabItem>
  <TabItem value="rhel" label="Red Hat Based">
    ```bash
    # Setup Repository
    sudo dnf -y install dnf-plugins-core
    sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    # Install Docker
    sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    # Start the Docker service
    sudo systemctl enable --now docker
    ```
  </TabItem>
</Tabs>

:::note
If you are using a different distribution, please refer to the [official Docker documentation](https://docs.docker.com/get-docker/) for installation instructions.
:::

### Pulling the Docker image

The netboot.xyz container image is available from the GitHub Container Registry as well as Docker Hub. The image is updated regularly and is the recommended way to get the latest version of the container:

<Tabs>

  <TabItem value="github" label="Github Container Registry" default>
    ```shell
    docker pull ghcr.io/netbootxyz/netbootxyz
    ```
  </TabItem>
  <TabItem value="rhel" label="Docker Hub">
    ```shell
    docker pull netbootxyz/netbootxyz
    ```
  </TabItem>
</Tabs>

The following snippets are examples of starting up the container.

### Starting up the container with the Docker CLI

```shell
docker run -d \
  --name=netbootxyz \
  -e MENU_VERSION=2.0.84             `# optional` \
  -e NGINX_PORT=80                   `# optional` \
  -e WEB_APP_PORT=3000               `# optional` \
  -p 3000:3000                       `# sets web configuration interface port, destination should match ${WEB_APP_PORT} variable above.` \
  -p 69:69/udp                       `# sets tftp port` \
  -p 8080:80                         `# optional, destination should match ${NGINX_PORT} variable above.` \
  -v /local/path/to/config:/config   `# optional` \
  -v /local/path/to/assets:/assets   `# optional` \
  --restart unless-stopped \
  ghcr.io/netbootxyz/netbootxyz
```

**To update the image using Docker CLI:**

```shell
docker pull ghcr.io/netbootxyz/netbootxyz   # pull the latest image down
docker stop netbootxyz                      # stop the existing container
docker rm netbootxyz                        # remove the image
docker run -d ...                           # previously ran start command
```

Start the container with the same parameters used above.

:::note
If the same folders are used your settings will remain. If you want to start fresh, you can remove the paths and start over.
:::

### Starting up the container with Docker Compose

1. Copy [docker-compose.yml.example](https://github.com/netbootxyz/docker-netbootxyz/blob/master/docker-compose.yml.example) to docker-compose.yml
1. Edit as needed
1. Run `docker compose up -d netbootxyz` to start containers in the background
1. Run `docker compose logs -f netbootxyz` to view logs

**To update the image using Docker Compose:**

```shell
docker compose pull netbootxyz     # pull the latest image down
docker compose up -d netbootxyz    # start containers in the background
```

### Accessing the container services

Once the container is started, the following services will be available via browser:

| Service               | Description                 |
|-----------------------|-----------------------------|
| http://localhost:3000 | Web configuration interface |
| http://localhost:8080 | Downloaded web assets       |

:::note
If you wish to remove the configuration, you can remove the local configuration folders and upon restart of the container, it will load the default configurations.
:::

### Local Mirror Access

If you want to pull the Live Images images down to your own mirror and boot off them you will need to update the `live_endpoint` variable in `local-vars.ipxe` file within the web configuration interface.

The [local-vars.ipxe](https://github.com/netbootxyz/netboot.xyz/blob/master/roles/netbootxyz/templates/local-vars.ipxe.j2) is a file that is checked early during the boot [process](https://github.com/netbootxyz/netboot.xyz/blob/master/roles/netbootxyz/templates/disks/netboot.xyz.j2#L99) and will load up variables into netboot.xyz. Using this file, you can set overriddes for variables early in the boot process.

By default the `live_endpoint` variable is set to upstream location of `https://github.com/netbootxyz`. If you want to override this, set `live_endpoint` to your deployment IP or domain, e.g. `http://192.168.0.50:8080`. It will then redirect asset download to the local location you set for assets on port `8080` and you can download the assets by using the local assets menu down to your local server. This can result in much faster boot times.
