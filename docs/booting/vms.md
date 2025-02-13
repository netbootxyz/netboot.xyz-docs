---
id: vms
title: Boot from VMs
sidebar_label: Boot from VMs
sidebar_position: 7
description: "Using netboot.xyz with various Virtualization Machine Platforms"
hide_table_of_contents: false
---

## VMware Fusion

These instructions are for setting up netboot.xyz in a VM on VMware's Fusion for MacOS.

### Create the VM

* Add a new virtual machine.
* Select "Install from disc or image".
* Click on "Use another disk or disc image...".
* Download and select the netboot.xyz [ISO](https://boot.netboot.xyz/ipxe/netboot.xyz.iso).
* On the Choose Operating System Screen, select the OS type you are planning on installing. If you plan on testing multiple types of installs, you can just choose a CentOS 64-bit OS.
* Click the "Customize Settings" and give the VM a name, like "netboot.xyz".

This will create your VM.

### Running the VM

_You'll need to adjust the memory settings of the VM to ensure you'll have enough memory to run the OS installers in memory. Typically it's good to bump the memory up to 2GB to 4GB._

* Click the wrench icon and click on Processors & Memory and bump up the memory to the desired amount of memory.
* Start the VM up and you should see the netboot.xyz loader.
* If you determine you no longer want to boot from netboot.xyz, you can either change the boot order to boot from the hard drive by default or delete the ISO from the VM.

## Proxmox VE

These instructions are for setting up netboot.xyz in a VM on Proxmox VE.

### Create the VM

* Log in to the Proxmox web interface.
* Click on "Create VM" in the top right corner.
* Give the VM a name, like "netboot.xyz", and click "Next".
* On the OS tab, select "Do not use any media" and click "Next".
* On the System tab, select "OVMF (UEFI)" for the BIOS, add an EFI disk, select, the EFI Storage, and uncheck "Pre-Enroll Keys", then click "Next".
* On the Hard Disk tab, set the Disk size to a small value (e.g., 4GB) since netboot.xyz does not require much space, and click "Next".
* On the CPU tab, allocate the desired number of cores and click "Next".
* On the Memory tab, allocate the desired amount of memory (e.g., 2GB to 4GB) and click "Next".
* On the Network tab, leave the defaults and click "Next".
* On the Confirm tab, review the settings and click "Finish".

### Upload the ISO

* Click on the "local" storage in the left sidebar.
* Click on the "ISO Images" tab.
* Click "Upload" and select the netboot.xyz [ISO](https://boot.netboot.xyz/ipxe/netboot.xyz.iso) file to upload.

### Attach the ISO and Boot

* Select the newly created VM from the left sidebar.
* Click on the "Hardware" tab.
* Click "Add" and select "CD/DVD Drive".
* Choose "Use CD/DVD disc image file (iso)" and select the uploaded netboot.xyz ISO.
* Click "OK".
* Click on the "Options" tab.
* Double-click "Boot Order" and ensure the CD/DVD drive is set to boot first.
* Start the VM and you should see the netboot.xyz loader.

## Hyper-V

These instructions are for setting up netboot.xyz in a VM on Hyper-V.

### Create the VM

* Open Hyper-V Manager.
* Click on "New" and select "Virtual Machine".
* Click "Next" on the Before You Begin screen.
* Give the VM a name, like "netboot.xyz", and click "Next".
* Choose "Generation 1" and click "Next".
* Allocate the desired amount of memory (e.g., 2GB to 4GB) and click "Next".
* Configure the network settings and click "Next".
* Choose "Create a virtual hard disk" and set the Disk size to a small value (e.g., 4GB) since netboot.xyz does not require much space, and click "Next".
* Choose "Install an operating system from a bootable CD/DVD-ROM" and select the netboot.xyz [ISO](https://boot.netboot.xyz/ipxe/netboot.xyz.iso).
* Click "Finish".

### Running the VM

* Right-click on the newly created VM and select "Settings".
* Adjust the memory settings if needed.
* Start the VM and you should see the netboot.xyz loader.
* If you determine you no longer want to boot from netboot.xyz, you can either change the boot order to boot from the hard drive by default or remove the ISO from the VM.
