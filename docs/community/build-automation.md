---
id: build-automation
title: Build Automation
description: "describes how the netboot.xyz automated build system works"
hide_table_of_contents: false
---
## Intro

The purpose of this repository is 2 parts: 

- Maintain the centralized logic used by asset builders conventionally publishing the contents of Live CD ISOs or customized Kernel/Initrd combos with specific logic to allow booting from a github HTTPS endpoint.

- Be an evolving written explanation of the current state of the automated build system spanning all of these externally ingested assets.

Outside of the core principles, this document should provide as much possible information on how to properly participate in the project as a whole.

## Templating netboot.xyz

Our main visible output is https available customized iPXE Menu assets that can be easily consumed by a series of custom built iPXE boot mediums.
We template the menu output for two reasons as it makes it possible for this project to be updated by bots reaching out for our own custom hosted assets and it also makes it possible for users to locally host their own customized menu/boot medium sets.
To encapsilate all build steps and menu templating Ansible was selected as a platform using Jinja templates. 

The build process should always strive to: 

- Provide dead simple build instructions to produce usable output for a normal user that does not have a deep understanding of the project
- Build helper environments in the form of Docker containers that can be used for hosting the build output
- Have documented tools the user can leverage to produce a copycat site of netboot.xyz under their own domain along with a method for consuming our releases
- Allow users to easily pick and choose the components they want to be included in their menus and custom options to go along with them. 

If we can adhere to these goals it should be possible to become an industry standard for booting Operating systems off the Internet instead of an isolated environment and garner support from external projects that want to be on the list presented to users by default.   

### Templating basics

Templates for boot menus should try to utilize centralized variables from defaults or our rolling list of endpoints. This allows users to easily set customizations from a `user_overrides.yml` file when they build locally and for bot commits. 

#### Loop through everything

In general build time optimizations when it comes to templating are not a huge priority. In order to pull out values you want in an ordered list it will sometimes be necesarry to loop through all of the assets available IE for Ubuntu Live CDs: 

```
{% for key, value in endpoints.items() | sort %}
{% if value.os == "ubuntu" and 'squash' in key and value.version == "18.04" %}
item {{ key }} ${space} {{ value.os | title }} {{ value.version }} {{ value.flavor | title}}
{% endif %}
{% endfor %}
```

The loop above is used to extract the different Flavor tags for all Ubuntu 18.04 distros which outputs : 

```
item ubuntu-18.04-Budgie-squash ${space} Ubuntu 18.04 Budgie
item ubuntu-18.04-KDE-squash ${space} Ubuntu 18.04 Kde
item ubuntu-18.04-LXDE-squash ${space} Ubuntu 18.04 Lxde
item ubuntu-18.04-MATE-squash ${space} Ubuntu 18.04 Mate
item ubuntu-18.04-default-squash ${space} Ubuntu 18.04 Gnome
item ubuntu-18.04-kylin-squash ${space} Ubuntu 18.04 Kylin
item ubuntu-18.04-xfce-squash ${space} Ubuntu 18.04 Xfce
```

By performing loops like this flavors can be added in the future to our asset list without making modifcations to the core template. 

#### YAML when possible

When templating the way to bake in user overide ability with minimal effort from users is to store variables in the `defaults/main.yml` file. 
For example looking at OpenBSD:

```
  openbsd:
    name: "OpenBSD"
    mirror: "http://ftp.openbsd.org"
    base_dir: "pub/OpenBSD"
    enabled: true
    menu: "bsd"
    versions:
      - name: "6.6"
        code_name: "6.6"
        image_ver: "66"
      - name: "6.5"
        code_name: "6.5"
        image_ver: "65"
      - name: "6.4"
        code_name: "6.4"
        image_ver: "64"
      - name: "6.3"
        code_name: "6.3"
        image_ver: "63"
      - name: "6.6 Latest Snapshot"
        code_name: "snapshots"
        image_ver: "66"
```

These variables are ingesting for not only enabling the menu entry linking to the file: 

```
{% for key, value in releases.items() | sort(attribute='1.name') %}
{% if value.enabled is defined and value.menu == "bsd" and value.enabled | bool %}
item {{ key }} ${space} {{ value.name }}
{% endif %}
{% endfor %}
```

Then to ingest the array set in the main YAML file: 

```
{% for item in releases.openbsd.versions %}
item {{ item.code_name }} ${space} ${os} {{ item.name }}
{% endfor %}
```

If a user wants to prune this completely from their custom built menu or just add/remove specific versions that can do that with a simple `user_overrides.yml` entry:

```
  openbsd:
    name: "OpenBSD"
    mirror: "http://ftp.openbsd.org"
    base_dir: "pub/OpenBSD"
    enabled: false
    menu: "bsd"
```

### Using the templates to self host

Throughout this document you will read about the concept of a centralized list of endpoints, these are specific assets we as a project produce and host out of Github releases.
Out of everything that is hosted in these menus the contents of Live CDs we tear apart and publish dwarfs them all in size. 

If a user has a need to boot these medium many times either in a local home setup or a full Enterprise enviroment we need to provide the tools to be able to easily mirror our build output and provide options to selectively download only what they choose to show in their menus.

At the time of this writing the current menus for the project are a mix of legacy menus for publically available assets at HTTP/HTTPS endpoints and assets that we host ourselves out of Github. The legacy assets are difficult to self host as they would conventionally also require that the user syncs entire mirrors for that distribution. 
The assets we host are a little more static and we specifically store their metadata in a format so they can be downloaded and kept up to date in a scripted manner by the end user if needed.

These two pieces of data for every release can be used to construct URLs for download that will be 1:1 comaptible with our menus: 

```
    path: /ubuntu-core-18.04/releases/download/4.15.0.20.23-91c3d317/
    files:
    - initrd
    - vmlinuz
```

Locally a user should be able to run logic we support for consistent ingestion covered in the [main projects documentation](https://github.com/netbootxyz/netboot.xyz), but below is a basic breakdown. 


Given the metadata above the following commands will generate a folder structure and files needed: 

```
export DLPATH="/ubuntu-core-18.04/releases/download/4.15.0.20.23-91c3d317/"
export DLURL="https://github.com/netbootxyz$DLPATH"
mkdir -p .$DLPATH
wget -O ."$DLPATH"initrd "$DLURL"initrd
wget -O ."$DLPATH"vmlinuz "$DLURL"vmlinuz
```

The resulting folder structure can be hosted with Apache, NGINX, or any other webserver and the user can modify the `live_endpoint` in their `boot.cfg` which defaults to `https://github.com/netbootxyz` to their webserver and serve them locally.

This method of self hosting also assumes that the user is either custom building the boot medium and menu files from a webserver or they are serving the iPXE files from TFTP. 

## Building HTTPS compatible Live CD components

What a user would conventionally consider a Live CD is made up of 3 main components we need to boot the operating system over the Internet: 

- Kernel - This is the Linux Kernel, the main program loaded to communicate with the underlying hardware in the computer. 

- Initramfs - What you would consider a pre-boot environment, the Kernel will execute an init process using the contents of this file.

- SquashFS - This is the main operating system that the user cares about booting into. 

Kernel loads, init is kicked off, init locates and loads the squashfs into a ramdisk, bare init in the initramfs is passed off to the contents of the SquashFS conventionally modern init managers like upstart or systemd. 

The first problem you run into when trying to consume these components is while many people mirror the ISOs themselves the components inside the ISO will never be ripped out and made available for ephemeral download.
Next you need the ability to download the SquashFS at boot time in the Initramfs using an https endpoint which due to most distros being as lean as possible ca-cert bundles and https cabable curl or wget will rarely be bundled in pre-boot and in some cases they simply lack the logic to be able to download any remote files, they expect them to be on a locally accessable CD/USB.  

### Asset publishing to Github releases

Github allows us to host files up to 2 gigabytes in size and does not have strict limits on the number of files attached to a release. This allows us to download external ISOs and extract their contents in Github Actions build jobs finishing by uploading the files we need from them to Github Releases.

Asset repos use near identical logic to pull and publish their components as we have intentionally centralized their build logic in a git based script and download/extraction process to a centralized Docker container. 

The logic for the build script is in this repo, and the logic for the Docker extraction container can be found here: 
https://github.com/netbootxyz/docker-iso-processor

The Docker container above ingests a settings file IE:

```
URL="http://releases.ubuntu.com/18.04/ubuntu-REPLACE_VERSION-desktop-amd64.iso.torrent"
TYPE=torrent
CONTENTS="\
casper/filesystem.squashfs|filesystem.squashfs"
```

The keyword `REPLACE_VERSION` will be substituted in at build time if the external release is version tracked with daily builds.

At the core of the Asset repo concept and really our build infrastrucure as a whole is an endpoints yaml template: 

```
endpoints:
  ubuntu-18.04-default-squash:
    path: /ubuntu-squash/releases/download/REPLACE_RELEASE_NAME/
    files:
    - filesystem.squashfs
    os: "ubuntu"
    version: "18.04"
    flavor: "core"
    kernel: "ubuntu-18.04-live-kernel"
```

You will notice this file contains a keyword `REPLACE_RELEASE_NAME` this allows us to substitute in the unique relese name at build time comprised of the external version number and the current commit for that build. These endpoints on release get pushed to our development branch:
https://github.com/netbootxyz/netboot.xyz/blob/development/endpoints.yml
This list of metadata allows us to generate boot menu releases with every incremental change to the underlying assets they point to in Github.  


Asset repos fall into two main categories for us from a build pipeline perspective.

#### Daily builds to check for external version changes

These types of builds are not limited to but conventionally will be tied to what distributions consider `stable` releases. These releases will have a minor version number. Ubuntu for example has a current stable release of Ubuntu 18.04 Bionic Beaver, but the live CD is currently versioned at 18.04.3, we as an organization do not want to keep track of this kind of stuff. 
Our assumption will always be that the end users want to boot the latest minor versions and we should not be hosting old minor versions unless there are very specific reasons. 

These builds need to be able to be run daily and handle failure to retrieve the current external version for the releases. Meaning if they get a null response back the null version number should not allow a successful build as a protection from publishing empty/corrupt releases.

The external version checks should be written in bash where possible and compatible with a base configured Github Actions build environment.
This logic flow for this daily build process is as follows: 
* Github Actions cron job kicks off the build for the branch we have decided to run daily checks for a minor version change
* The external verison number is gotten and applied to the endpoints template in the repo
* The current centralized endpoints template in our main development repo is pulled in and merged with the template from the local repo
* If the file generated does not match the MD5 of the origional file downloaded then we continue the build process eventually publishing the new asset
* The new asset being published updates the centralized endpoints and the loop can continue

#### Static builds for non version tracked assets

For some asset ingestion we can assume that the ISO we download and extract at that version number will be those components as long as the items exist in our boot menus. 
These can build once and publish to add their metadata to the centralized endpoints and stay put until we make changes to that repo/branch. 
In the case of static builds effort should still be made to ingest and tag the release with a unique ID for an external marker. Most distros will provide md5sums or sha265sums of their published ISO for verification the first 8 characters of this sha should be a go to to mark the release on Github. 


### Compatibility between standard init hooks and Github releases

Github Releases have 3 major drawbacks when it comes to publishing web consumable squash files in an initramfs: 

* They are HTTPS endpoints 
* They are limited to 2 gigabyte file sizes
* They use a 302 redirect to point to an actual file in S3 object storage ( most standard web header reads give you 403 in S3 ) 

Because of this we will likely need to maintain special patches for all of the pre-init hooks distros use. It will be impossible to tell a Linux distribution that they should support the detection of 302 redirects but then a 403 error on the followed endpoint, or that they should test for the existence of a proprietary formatted filename `filesystem.squashfs.part2` and append that file to the initial http download.

Patching and generating custom bootable kernels and initramfs assets should be handled in Docker where possible using that distros native tools. A docker image of a distribution will conventionally have the same tools available as a full install when it comes to the downloading and modification of their kernel/initramfs combos.

Each distro conventionally has their own special hooks in their initramfs to get everything ready to pass off to main init, below are the ones we currently support patches for and a brief explanation of what we need to change.

#### Ubuntu's Casper

Casper has recently added http downloads, but lacks it completely in stable. We need to specifically patch in:

* full modification of hooks to support an http/https endpoint to fetch the squashFS
* A full wget binary
* All of the needed ca-certs for wget to use HTTPS
* Support for our proprietary multi-part downloads

Wget and ca-certs can be handled with [initramfs-tools hooks](http://manpages.ubuntu.com/manpages/bionic/man8/initramfs-tools.8.html#hook%20scripts) 

Below is a specific example for adding an HTTPS wget:

```
#!/bin/sh -e
## required header
PREREQS=""
case $1 in
        prereqs) echo "${PREREQS}"; exit 0;;
esac
. /usr/share/initramfs-tools/hook-functions

## add wget from bionic install
copy_exec /usr/bin/wget /bin

## copy ssl certs
mkdir -p \
	$DESTDIR/etc/ssl \
	$DESTDIR/usr/share/ca-certificates/
cp -a \
	/etc/ssl/certs \
	$DESTDIR/etc/ssl/
cp -a \
	/etc/ca-certificates \
	$DESTDIR/etc/
cp -a \
	/usr/share/ca-certificates/mozilla \
	$DESTDIR/usr/share/ca-certificates/
echo "ca_directory=/etc/ssl/certs" > $DESTDIR/etc/wgetrc
```

As for the modifications needed to actually boot off of HTTPS endpoints vs what Casper was designed to do we have stacked our own logic on top of what others have done in the past and failed to get merged into the main project. [The code in the Kernel building repos](https://github.com/netbootxyz/ubuntu-core-18.04/blob/master/root/patch) will always be a better reference than this document. 

#### Debian's Live-Boot

Unlike Ubuntu, Debian's live-boot hooks do support fetching the squashfs from a remote http endpoint but also needs modifications: 

* A full wget binary
* All of the needed ca-certs for wget to use HTTPS
* Support for our proprietary multi-part downloads

Please see the Casper section above to understand how we use initramfs-tools scripts to add in complete wget.
Also again here [the code in the Kernel building repos](https://github.com/netbootxyz/debian-core-10/blob/master/root/patch) will always be a better reference than this document. 

#### Manjaro's miso hooks

Manjaro is Arch based but they maintain their own specific pre-init hooks located [here](https://gitlab.manjaro.org/tools/development-tools/manjaro-tools/tree/master/initcpio/hooks) . 

All that Manjaro requires is slight code changes to support 302 redirects as they use a series of squashfs files and ping the webserver for all of them and will only download and mount on a `200 OK` response which Github lacks we do this in a sed replacement so we do not need to maintain patches on upstream changes:

```
 sed -i \
	-e 's/${misobasedir}\/${arch}//g' \
	-e 's/"OK"/"OK\\|302 Found"/g' \
	/etc/initcpio/hooks/miso_pxe_http
```

For some unknown reason it hangs on the initial file download unless the user continuosly presses CTL+C and CTRL+D. 

#### Red Hat's Dracut

There are many distros that use Dracut as a pre-init manager currently Fedora is the only one we host and provide live booting options for. 

Fedora support redirects, SSL, and do not have files that need to be multiparted so no changes are needed. 

## Development workflow

From 30,000 feet up we as an organization will take our own internal bot commits along with general development and create a snapshot of the rolling release to test in a release canidate. 
These RC endpoints should be generally acceptable for a normal user to consume as long as they understand they might run into bugs and need to report them to us. 
Both the RC and main release should contain the same changelog with the squashed commit messages that went into that since the last stable release. 

The workflow is as follows: 
* User checks out `development`
* User branches `development` to a feature branch
* Feature branch Pull requests back into `development` must be approved by at least one team member (these will be built automatically by Github Actions)
* Commits from development are merged into `rc` (these build and push to https://staging.boot.netboot.xyz/rc/) 
* On final release `rc` is merged into `master` (these build and push to https://boot.netboot.xyz/)

This section only applies to our main project that outputs menu and bootable asset files. The asset repos will generally be managed strictly by netboot.xyz team members and have a less restrictive workflow.

### Hosted fully functional build output

Every time a change is made we need to take that incremental change and create useable output hosted in S3 so we know with certainty that it functions before pushing it to our main domain and innevidibly to downstream users domains/local environments. 
To achieve this we build and push every commit to our development branch and push the boot medium along with the menu files at that commit off to a specific subfolder based on it's commit sha. 
At build time this boot medium is statically pointed to this S3 folder so they will always point those specific menus at that commit and can be regression tested. 

Outside of rolling development output we also want to version control our release canidates and production releases. Unlike the development releases these version controlled releases can be accessed at a latest style endpoint:

- https://boot.netboot.xyz - for production
- https://staging.boot.netboot.xyz/rc/ - for release canidates

To access a specific version for example though you would use it's version number IE `https://boot.netboot.xyz/1.05` these endpoints will host menu files and boot medium to use to access them from a client. 

### Continuous Integration

Currently all commits that come from Humans need to come in the form of a pull request to the Development branch and make their way up the chain to a release. 

For a pull request we: 

* Lint all ingested settings and templates with- `ansible-lint -v roles/netbootxyz`
* Build the iPXE assets and templates with dummy values

