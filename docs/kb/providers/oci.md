---
id: oci
title: Oracle Cloud Infrastructure
description: Using netboot.xyz on Oracle Cloud Infrastructure
hide_table_of_contents: true
---

netboot.xyz can be loaded on [OCI](https://www.oracle.com/cloud/) compute instances so that you can then customize the compute instance as needed.

For this method, we'll use the standard Ubuntu image for the relevant architecture.

### Create a compute instance
When creating an instance, make sure to select:
- Image: Ubuntu > Canonical Ubuntu (standard, not minimal)

Take note of which shape you take, as it will determine further steps:
- AMD (`x86_64`)
- Ampere A1 (`arm64`)

:::warning
Set up SSH keys!
You will need to log into the server and there is no default password.

We assume you know how to use SSH keys.
:::

### Get into the rescue shell
First get onto your compute instance's details page, then scroll down to `Resources` under which you'll find `Console connection`.

To get into the rescue shell, we recommend you use the Cloud Shell, and not bother with a `local connection`. To do so, click on `Launch Cloud Shell connection` and wait for the console connection status to reach the `ACTIVE` state. Be patient, it can take a minute or two.

You do not need to log in, as we'll only use it control the UEFI Firmware.

### Download the EFI binary, Setup GRUB and Reboot into UEFI

Now that you have the rescue shell open, you need to open a SSH connection to entere the following commands, as there is no default password.

Follow the instructions depending on which architecture/shape you chose earlier: `arm64` or `x86_64`.

:::info
The rescue shell over the Oracle Cloud Shell can be somewhat buggy, for instance, you might have to press the Escape key twice instead of only once when in netboot.xyz
:::

#### `arm64` - Ampere A1
These steps apply to the Ampere A1 (`arm64`) instances.

The default GRUB configuration already contains the `UEFI Firmware` option, so we only have to download netboot.xyz and reboot into the correct option.

```shell
# Download netboot (arm64) into the EFI directory
sudo wget -O /boot/efi/netboot.xyz-arm64.efi https://boot.netboot.xyz/ipxe/netboot.xyz-arm64.efi

# Set the default boot entry (for the following boot only) to the UEFI firmware
sudo grub-reboot "UEFI Firmware Settings"

# Reboot the instance
sudo reboot
```

#### `x86_64` - AMD
These steps apply to the AMD/Intel (`x86_64`) instances.

We need to delete the default GRUB configuration and regenerate it, as it does not contain `UEFI Firmware`. Then, we can reboot into the UEFI Firmware and boot into netboot.xyz:

```shell
# Download netboot (amd64) into the EFI directory
sudo wget -O /boot/efi/netboot.xyz-snp.efi https://boot.netboot.xyz/ipxe/netboot.xyz-snp.efi

# Delete the default configuration (does not contain UEFI Firmware by default)
sudo rm -rf /etc/default/grub /etc/default/grub.d/

# Update GRUB menu (with default configuration)
sudo update-grub

# Set the default boot entry (for the following boot only) to the UEFI firmware
sudo grub-reboot "UEFI Firmware Settings"

# Reboot
sudo reboot
```

### Boot into netboot.xyz
Now that you are in the UEFI Firmware, do the following:
- Choose “Boot Maintenance Manager”
- Choose “Boot From File”
- Choose the only device
- Choose the netboot.xyz EFI file
- Wait for it to start and configure

:::tip
If you were not able to boot into netboot.xyz correctly, simple repeat the `grub-reboot` and `reboot` steps to enter UEFI again.
:::

#### `x86_64` - Console quirks: Linux
Once you have booted into netboot.xyz on `x86_64`, if you plan on using Linux images, you must still set up custom `Kernel cmdline params` under `Utilities (UEFI)`.

Set `Kernel cmdline params: []` to `console=ttyS0,9600`.

If you make a mistake, move with arrow keys, and use the Delete key.

Once you have typed it in, you might have to press the Escape key twice.

:::warning
This is **not** applicable to `arm64`/Ampere A1.
:::
