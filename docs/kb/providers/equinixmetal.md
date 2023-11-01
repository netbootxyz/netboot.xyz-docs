---
id: equinixmetal
title: Equinix Metal
description: Using netboot.xyz with Equinix Metal bare metal servers
hide_table_of_contents: true
---

[Equinix Metal](https://metal.equinix.com) fully supports netboot.xyz with its Custom iPXE
operating system.

### Usage

Select the "Custom iPXE" operating system from the portal, or the `custom_ipxe`
slug when using the API.

### Provisioning

Put the netboot.xyz URL in the text field that appears in the portal, or use the
`ipxe_script_url` parameter when creating the device via the API.

```
https://boot.netboot.xyz
```

Press "Deploy" to provision your device. It will take 2-3 minutes for the device
to become active. Once it's online, connect to Equinix Metal's out-of-band
serial-over-SSH service (S.O.S.) using the device's `id` and the facility where
the device was deployed, e.g. `ewr1`.

```
ssh {server-uuid}@sos.{facility-code}.platformequinix.com
```

The current list of facilities is [here](https://metal.equinix.com/product/locations). The
netboot.xyz iPXE menu will appear and you can complete installation from there.

:::note

By default, devices are set to boot from the local disk. During
provisioning, Equinix Metal sets the next boot to PXE. This happens once, which means that
if you don't install an operating system before rebooting, it won't reload the
netboot.xyz menu. However, you can set your device to always boot to iPXE
first by enabling that option under 'server actions' through the customer portal.

:::

### Networking

Devices that are provisioned via Custom iPXE will be able to DHCP for the life of
the device; however, Equinix Metal recommends configuring networking statically. IP
address information can be found by querying https://metadata.platformequinix.com/metadata
from the host.

More information on how Equinix Metal configures bonding can be found
[here](https://metal.equinix.com/developers/docs/networking/layer2/).

Nameservers should be configured as:

```
nameserver 147.75.207.207
nameserver 147.75.207.208
```