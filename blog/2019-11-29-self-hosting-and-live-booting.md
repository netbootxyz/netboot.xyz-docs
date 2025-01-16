---
slug: 2019/11/29/self-hosting-and-live-booting
title: Self Hosting and Live Booting
authors:
  - antonym
tags: [self_hosting, netboot.xyz]
---

We have been hard at work the last few weeks and I wanted to provide some updates as to what we're currently working on and where we want to go.

I would like to thank all of the contributors over the last few years that have contributed code, tested, and provided feedback for the project. The contributions have all been really helpful and have helped keep the project up to date.

<!-- truncate -->

### Self Hosting

I have been working on getting the netboot.xyz source tree to a point where they can be generated via Ansible so that anyone can take the repository and customize it to their liking a lot easier than it was in the past. I have gotten most of that working and will be swapping out the existing source bits in the netboot.xyz repo with the bits to deploy with Ansible. My goal is to generate the primary netboot.xyz site using Ansible instead of just uploading the source files. There will still be a lot of future optimizations that can be done to the templates but this is a good first step toward consolidating a lot of the duplicate code.

The new netboot.xyz repo will allow you to create a self-hosted environment using Ansible to a target or you can use Docker to generate the site.  The Ansible playbooks will:

* Generate the iPXE files from templates using default settings which can be overridden
* Generate all iPXE disks customized to your environment

This should make it a lot easier to get a custom environment set up in the environment of your choosing.

### Live Booting

One of the things I have been wanting to do a for a while is provide a way to Live Boot more operating systems.  I always wanted to make netboot.xyz a place where anyone can try out new operating systems, reinstall, or rescue their favorite from one place. A lot of the operating systems out there don't always provide installer kernels and only host a large ISO as their release. With iPXE, the best way to load ISOs into memory is with memdisk or sandisk, but that starts to fail with larger images and doesn't work in EFI mode. Getting distros to change how they release their operating systems for iPXE users probably isn't going to happen anytime soon either.

With a lot of help and expertise from [TheLamer (Ryan Kuba)](https://github.com/thelamer), a [linuxserver.io](https://linuxserver.io) contributor, we have built an automated pipeline that tracks and builds some of the latest Linux Live distributions, extracts kernels and squashfs assets, and loads them up as Github releases.  From there the information for each release is then put into the netboot.xyz repo, and we can then generate menus dynamically for each version.  This allows you to netboot into your favorite live distribution from the hosted Github release directly.  It is currently marked as experimental but we have a number of Live Operating Systems available already to start using.

### Moving netboot.xyz repository

I will be moving the repo from my personal repository on github to the [netbootxyz](https://github.com/netbootxyz) organization to put everything in one central place. The existing links should redirect to the new location.

### Discord

Over the last few weeks, we've been leveraging Discord more for communication for development, build automation, and discussion. If you would like to join in the discussion, you can join [here](https://discord.gg/An6PA2a).


### Open Collective

We have set up an [Open Collective](https://opencollective.com/netbootxyz) to open the project up to those who wish to donate to help out the project. This may cover hosting and domain fees, hardware for validation testing, or anything else that comes up in maintaining a project like this. Every little bit will help! If you enjoy the work we do, please support us!

Thanks again for all of your support and we hope to continue making this project more useful for our users!
