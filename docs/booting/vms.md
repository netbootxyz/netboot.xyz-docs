---
id: vms
title: Boot from VMs
sidebar_label: Boot from VMs
sidebar_position: 7
description: "Using netboot.xyz with various Virtualization Machine Platforms"
hide_table_of_contents: false
---

## VMware Platforms

### VMware ESX/ESXi (vSphere)

These instructions are for setting up netboot.xyz in a VM on VMware ESX/ESXi servers using the vSphere web interface.

#### Create the VM

* Log in to the vSphere web interface.
* Navigate to your ESXi host or cluster.
* Right-click and select "New Virtual Machine".
* Choose "Create a new virtual machine" and click "Next".
* Give the VM a name, like "netboot.xyz", select the target location, and click "Next".
* Select the compute resource (ESXi host) and click "Next".
* Select the datastore for VM storage and click "Next".
* Choose "ESXi 6.5 and later" for compatibility and click "Next".
* Select the guest OS family (e.g., "Linux") and version (e.g., "Other Linux (64-bit)") and click "Next".
* Configure the virtual hardware:
  * Set Memory to 2-4GB (minimum 2GB recommended)
  * Set CPU to 1-2 cores as needed
  * Set Hard disk to 4-8GB (netboot.xyz doesn't require much space)
  * Set Network adapter to connect to your desired network
  * Add a CD/DVD drive and set it to "Datastore ISO File"
* Click "Next" and review the configuration, then click "Finish".

#### Upload and Attach the ISO

* In the vSphere web interface, navigate to Storage and select your datastore.
* Click on the "Files" tab and create a folder named "ISOs" if it doesn't exist.
* Click "Upload Files" and upload the netboot.xyz [ISO](https://boot.netboot.xyz/ipxe/netboot.xyz.iso).
* Go back to your VM and click "Edit".
* Expand the CD/DVD drive settings and browse to select the uploaded netboot.xyz ISO.
* Check "Connect at power on" and click "OK".

#### Running the VM

* Power on the VM from the vSphere interface.
* Open the VM console and you should see the netboot.xyz loader.
* The VM will automatically boot from the CD/DVD drive containing the netboot.xyz ISO.
* To change boot order later, edit the VM settings and modify the boot options.

### VMware Workstation

These instructions are for setting up netboot.xyz in a VM on VMware Workstation for Windows and Linux.

#### Create the VM

* Open VMware Workstation.
* Click "Create a New Virtual Machine" or go to File > New Virtual Machine.
* Choose "Typical (recommended)" and click "Next".
* Select "I will install the operating system later" and click "Next".
* Choose the guest operating system:
  * For Linux distributions: Select "Linux" and choose "Other Linux 4.x or later kernel 64-bit"
  * For Windows installations: Select "Microsoft Windows" and choose the appropriate version
* Give the VM a name, like "netboot.xyz", and select the location, then click "Next".
* Set the disk size to 4-8GB (netboot.xyz doesn't require much space) and click "Next".
* Click "Customize Hardware" to adjust settings:
  * Set Memory to 2-4GB (minimum 2GB recommended)
  * Set Processors to 1-2 cores as needed
  * Configure Network Adapter settings as needed
  * Click "Close" when done
* Click "Finish" to create the VM.

#### Attach the ISO

* Select your VM in the Workstation library.
* Click "Edit virtual machine settings".
* Select the CD/DVD drive and choose "Use ISO image file".
* Browse to and select the netboot.xyz [ISO](https://boot.netboot.xyz/ipxe/netboot.xyz.iso).
* Check "Connect at power on" and click "OK".

#### Running the VM

* Power on the VM.
* The VM should automatically boot from the CD/DVD drive containing the netboot.xyz ISO.
* You should see the netboot.xyz loader appear.
* To change boot order later, press F2 during boot to enter BIOS settings, or edit VM settings.

### VMware Fusion

These instructions are for setting up netboot.xyz in a VM on VMware Fusion for macOS.

#### Create the VM

* Open VMware Fusion.
* Click "Create a New Virtual Machine" or press Cmd+N.
* Select "Install from disc or image" and click "Continue".
* Click "Use another disc or disc image..." and browse to select the netboot.xyz [ISO](https://boot.netboot.xyz/ipxe/netboot.xyz.iso).
* On the Choose Operating System screen, select the OS type you are planning on installing. If you plan on testing multiple types of installs, you can choose "Other" > "Other 64-bit".
* Click "Continue" and then "Customize Settings".
* Give the VM a name, like "netboot.xyz", and choose the save location.
* In the settings window, adjust the following:
  * **Memory & Processors**: Set memory to 2-4GB (minimum 2GB recommended)
  * **Hard Disk**: Set to 4-8GB (netboot.xyz doesn't require much space)
  * **Network Adapter**: Configure as needed for your network setup
* Close the settings window.

#### Running the VM

* Start the VM and you should see the netboot.xyz loader.
* The VM will automatically boot from the attached ISO.
* To change boot order later, you can edit the VM settings and modify the startup disk options.
* If you determine you no longer want to boot from netboot.xyz, you can either change the boot order to boot from the hard drive by default or remove the ISO from the VM.

### VMware Player

These instructions are for setting up netboot.xyz in a VM on VMware Player (free version) for Windows and Linux.

#### Create the VM

* Open VMware Player.
* Click "Create a New Virtual Machine".
* Choose "I will install the operating system later" and click "Next".
* Select the guest operating system type:
  * For Linux distributions: Select "Linux" and choose "Other Linux 4.x or later kernel 64-bit"
  * For Windows installations: Select "Microsoft Windows" and choose the appropriate version
* Give the VM a name, like "netboot.xyz", and select the location, then click "Next".
* Set the disk size to 4-8GB and click "Next".
* Click "Customize Hardware" to adjust settings:
  * Set Memory to 2-4GB (minimum 2GB recommended)
  * Set Processors to 1-2 cores as needed
  * Configure Network Adapter settings as needed
  * Click "Close" when done
* Click "Finish" to create the VM.

#### Attach the ISO

* Select your VM in the Player library.
* Click "Edit virtual machine settings".
* Select the CD/DVD drive and choose "Use ISO image file".
* Browse to and select the netboot.xyz [ISO](https://boot.netboot.xyz/ipxe/netboot.xyz.iso).
* Check "Connect at power on" and click "OK".

#### Running the VM

* Power on the VM.
* The VM should automatically boot from the CD/DVD drive containing the netboot.xyz ISO.
* You should see the netboot.xyz loader appear.
* To change boot order later, you can edit the VM settings or press F2 during boot to enter BIOS settings.

### General VMware Tips

* **Memory Requirements**: Allocate at least 2GB of RAM, but 4GB is recommended for better performance when running OS installers.
* **Network Configuration**: Ensure the VM has network access to download boot images and OS installers.
* **Boot Order**: You can modify the boot order in VM settings to prioritize CD/DVD or hard disk as needed.
* **Performance**: For better performance, enable hardware acceleration features if available on your system.
* **Storage**: While netboot.xyz itself doesn't require much disk space, ensure you have adequate space for any OS installations you plan to perform.

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
