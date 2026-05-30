// Catalog for the netboot.xyz homepage boot-menu demo.
//
// Cross-checked against the real source of truth — the netbootxyz/netboot.xyz
// repo (endpoints.yml on the development branch and the menu templates). Only
// entries that actually exist in the project are listed here; nothing invented.
// Versions are representative and the boot sequence is simulated (the menu is
// clearly labelled a "demo" — it renders the real tree, it does not chainload).

/**
 * @typedef {Object} Endpoint
 * @property {string} id
 * @property {string} label
 * @property {string} host
 */

/**
 * @typedef {Object} OperatingSystem
 * @property {string} id
 * @property {string} name
 * @property {string} family
 * @property {string[]} versions
 */

/** @type {Endpoint[]} — Real endpoints, from roles/.../menu/nbxyz.ipxe.j2 */
export const ENDPOINTS = [
  {id: 'rolling', label: 'Production Rolling', host: 'boot.netboot.xyz'},
  {id: 'prod', label: 'Production Release', host: 'boot.netboot.xyz'},
  {id: 'staging', label: 'Staging', host: 'staging.boot.netboot.xyz'},
  {id: 'dev', label: 'Development', host: 'dev.boot.netboot.xyz'},
];

/** @type {OperatingSystem[]} */
export const OPERATING_SYSTEMS = [
  // ── Linux Network Installs (lightweight installers from upstream mirrors) ──
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    family: 'Linux Install',
    versions: ['24.04 LTS', '22.04 LTS', '20.04 LTS'],
  },
  {
    id: 'debian',
    name: 'Debian',
    family: 'Linux Install',
    versions: ['12 Bookworm', '11 Bullseye'],
  },
  {
    id: 'fedora',
    name: 'Fedora',
    family: 'Linux Install',
    versions: ['41', '40'],
  },
  {
    id: 'rocky',
    name: 'Rocky Linux',
    family: 'Linux Install',
    versions: ['9', '8'],
  },
  {
    id: 'alma',
    name: 'AlmaLinux',
    family: 'Linux Install',
    versions: ['9', '8'],
  },
  {
    id: 'opensuse',
    name: 'openSUSE',
    family: 'Linux Install',
    versions: ['Leap 15.6', 'Tumbleweed'],
  },
  {
    id: 'arch',
    name: 'Arch Linux',
    family: 'Linux Install',
    versions: ['Latest'],
  },
  {
    id: 'alpine',
    name: 'Alpine',
    family: 'Linux Install',
    versions: ['3.21', '3.20'],
  },
  {
    id: 'gentoo',
    name: 'Gentoo',
    family: 'Linux Install',
    versions: ['amd64', 'arm64'],
  },
  {
    id: 'oracle',
    name: 'Oracle Linux',
    family: 'Linux Install',
    versions: ['9', '8'],
  },

  // ── Desktop & Live (squashfs live images) ──
  {
    id: 'mint',
    name: 'Linux Mint',
    family: 'Desktop',
    versions: ['21 Cinnamon', '21 MATE', '21 XFCE'],
  },
  {
    id: 'manjaro',
    name: 'Manjaro',
    family: 'Desktop',
    versions: ['XFCE', 'GNOME', 'KDE'],
  },
  {id: 'pop', name: 'Pop!_OS', family: 'Desktop', versions: ['22.04', '20.04']},
  {id: 'elementary', name: 'elementary OS', family: 'Desktop', versions: ['6']},
  {
    id: 'endeavour',
    name: 'EndeavourOS',
    family: 'Desktop',
    versions: ['Latest'],
  },
  {
    id: 'garuda',
    name: 'Garuda',
    family: 'Desktop',
    versions: ['Dr460nized', 'GNOME', 'XFCE'],
  },
  {id: 'nitrux', name: 'Nitrux', family: 'Desktop', versions: ['Latest']},
  {id: 'neon', name: 'KDE neon', family: 'Desktop', versions: ['User']},
  {id: 'nixos', name: 'NixOS', family: 'Desktop', versions: ['Latest']},
  {id: 'voyager', name: 'Voyager', family: 'Desktop', versions: ['jammy']},

  // ── Security & Forensics ──
  {id: 'kali', name: 'Kali Linux', family: 'Security', versions: ['XFCE']},
  {
    id: 'blackarch',
    name: 'BlackArch',
    family: 'Security',
    versions: ['Installer'],
  },
  {id: 'tails', name: 'Tails', family: 'Security', versions: ['7.8']},
  {id: 'kodachi', name: 'Kodachi', family: 'Security', versions: ['8', '7']},
  {id: 'septor', name: 'Septor', family: 'Security', versions: ['Latest']},
  {
    id: 'kaspersky',
    name: 'Kaspersky Rescue',
    family: 'Security',
    versions: ['18'],
  },

  // ── Utilities & Rescue ──
  {id: 'memtest', name: 'Memtest86+', family: 'Utility', versions: ['Latest']},
  {
    id: 'gparted',
    name: 'GParted Live',
    family: 'Utility',
    versions: ['Stable'],
  },
  {
    id: 'clonezilla',
    name: 'Clonezilla',
    family: 'Utility',
    versions: ['Stable', 'Testing'],
  },
  {
    id: 'rescuezilla',
    name: 'Rescuezilla',
    family: 'Utility',
    versions: ['2.6.1'],
  },
  {
    id: 'systemrescue',
    name: 'SystemRescue',
    family: 'Utility',
    versions: ['13.0'],
  },
  {
    id: 'shredos',
    name: 'ShredOS',
    family: 'Utility',
    versions: ['x86_64', 'i686'],
  },
  {id: 'dban', name: 'DBAN', family: 'Utility', versions: ['2.3.0']},
  {id: 'rescatux', name: 'Rescatux', family: 'Utility', versions: ['Latest']},
  {
    id: 'bootrepair',
    name: 'Boot Repair',
    family: 'Utility',
    versions: ['Latest'],
  },
  {
    id: 'redorescue',
    name: 'Redo Rescue',
    family: 'Utility',
    versions: ['4.0.0'],
  },

  // ── Hypervisors & Storage ──
  {
    id: 'proxmox-ve',
    name: 'Proxmox VE',
    family: 'Hypervisor',
    versions: ['9.2'],
  },
  {
    id: 'proxmox-bs',
    name: 'Proxmox Backup Server',
    family: 'Hypervisor',
    versions: ['4.2'],
  },
  {
    id: 'proxmox-mg',
    name: 'Proxmox Mail Gateway',
    family: 'Hypervisor',
    versions: ['9.0'],
  },
  {
    id: 'esxi',
    name: 'VMware ESXi',
    family: 'Hypervisor',
    versions: ['user-supplied media'],
  },
  {
    id: 'photon',
    name: 'VMware Photon',
    family: 'Hypervisor',
    versions: ['4.0'],
  },
  {
    id: 'harvester',
    name: 'Harvester',
    family: 'Hypervisor',
    versions: ['1.8.0'],
  },

  // ── Windows ──
  {
    id: 'windows',
    name: 'Windows',
    family: 'Windows',
    versions: ['WIM (self-hosted)'],
  },
];
