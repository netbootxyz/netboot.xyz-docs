import React from 'react';
import Layout from '@theme/Layout';
import DownloadSection from '../components/DownloadSection';
import styles from './downloads.module.css';

const getTypeIcon = (type) => {
  const icons = {
    'ISO': '💿',
    'USB': '🔌',
    'Kernel': '⚡',
    'Floppy': '💾',
    'DHCP': '🌐',
    'DHCP-undionly': '🔧',
    'DHCP-snp': '⚙️',
    'DHCP-snponly': '🔗',
    'USB/SD Card': '📱'
  };
  return icons[type] || '📦';
};

export default function Downloads() {
  const popularDownloads = [
    {
      title: 'netboot.xyz.iso',
      description: 'Universal ISO image for CD/DVD, Virtual CDs, DRAC/iLO, VMware, VirtualBox. Works with both Legacy BIOS and UEFI systems.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz.iso',
      type: 'ISO',
      isRecommended: true,
      icon: getTypeIcon('ISO')
    },
    {
      title: 'netboot.xyz.img',
      description: 'USB bootable image for creating USB keys. Supports both Legacy BIOS and UEFI systems.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz.img',
      type: 'USB',
      isRecommended: true,
      icon: getTypeIcon('USB')
    },
    {
      title: 'Multi-arch ISO',
      description: 'Combined x86_64 and ARM64 ISO image. Perfect for mixed environments with different architectures.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz-multiarch.iso',
      type: 'ISO',
      icon: getTypeIcon('ISO')
    },
    {
      title: 'Multi-arch USB',
      description: 'Combined x86_64 and ARM64 USB image for creating universal USB keys.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz-multiarch.img',
      type: 'USB',
      icon: getTypeIcon('USB')
    }
  ];

  const legacyBootloaders = [
    {
      title: 'netboot.xyz.lkrn',
      description: 'Linux kernel format for booting from GRUB or EXTLINUX bootloaders.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz.lkrn',
      type: 'Kernel',
      icon: getTypeIcon('Kernel')
    },
    {
      title: 'netboot.xyz.dsk',
      description: 'Virtual floppy disk image for older systems, DRAC/iLO, VMware, VirtualBox.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz.dsk',
      type: 'Floppy',
      icon: getTypeIcon('Floppy')
    },
    {
      title: 'netboot.xyz.pdsk',
      description: 'Padded virtual floppy disk for systems that require specific disk geometry.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz.pdsk',
      type: 'Floppy',
      icon: getTypeIcon('Floppy')
    },
    {
      title: 'netboot.xyz.kpxe',
      description: 'DHCP network boot image with built-in iPXE NIC drivers for PXE booting.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz.kpxe',
      type: 'DHCP',
      icon: getTypeIcon('DHCP')
    },
    {
      title: 'netboot.xyz-undionly.kpxe',
      description: 'DHCP network boot image for systems with problematic network cards.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz-undionly.kpxe',
      type: 'DHCP-undionly',
      icon: getTypeIcon('DHCP-undionly')
    }
  ];

  const uefiBootloaders = [
    {
      title: 'netboot.xyz.efi',
      description: 'UEFI DHCP boot image with built-in iPXE NIC drivers.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz.efi',
      type: 'DHCP',
      icon: getTypeIcon('DHCP')
    },
    {
      title: 'netboot.xyz-snp.efi',
      description: 'UEFI with Simple Network Protocol, attempts to boot from all network devices.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz-snp.efi',
      type: 'DHCP-snp',
      icon: getTypeIcon('DHCP-snp')
    },
    {
      title: 'netboot.xyz-snponly.efi',
      description: 'UEFI with Simple Network Protocol, only boots from the device it was chained from.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz-snponly.efi',
      type: 'DHCP-snponly',
      icon: getTypeIcon('DHCP-snponly')
    }
  ];

  const arm64Bootloaders = [
    {
      title: 'netboot.xyz-arm64.efi',
      description: 'ARM64 UEFI DHCP boot image with built-in iPXE NIC drivers.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz-arm64.efi',
      type: 'DHCP',
      icon: getTypeIcon('DHCP')
    },
    {
      title: 'netboot.xyz-arm64-snp.efi',
      description: 'ARM64 UEFI with Simple Network Protocol, attempts to boot from all network devices.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz-arm64-snp.efi',
      type: 'DHCP-snp',
      icon: getTypeIcon('DHCP-snp')
    },
    {
      title: 'netboot.xyz-arm64-snponly.efi',
      description: 'ARM64 UEFI with Simple Network Protocol, only boots from device chained from.',
      url: 'https://boot.netboot.xyz/ipxe/netboot.xyz-arm64-snponly.efi',
      type: 'DHCP-snponly',
      icon: getTypeIcon('DHCP-snponly')
    }
  ];

  return (
    <Layout
      title="Downloads"
      description="Download netboot.xyz bootloaders for various architectures and boot methods"
    >
      <div className={styles.downloadsPage}>
        <div className="container">
          <header className={styles.pageHeader}>
            <h1>Bootloader Downloads</h1>
            <p className={styles.pageDescription}>
              Download the latest rolling releases of netboot.xyz bootloaders.
              These are generated as updates occur and are the most up to date.
              All downloads automatically load into <strong>boot.netboot.xyz</strong>.
            </p>
            <div className={styles.infoBox}>
              <p>
                Looking for release versions? Download them from{' '}
                <a href="https://github.com/netbootxyz/netboot.xyz/releases" target="_blank" rel="noopener noreferrer">
                  GitHub Releases
                </a>
              </p>
            </div>
          </header>

          <DownloadSection
            title="🌟 Most Popular Downloads"
            description="Start here if you're new to netboot.xyz. These bootloaders work with most systems."
            downloads={popularDownloads}
          />

          <DownloadSection
            title="UEFI Bootloaders - x86_64"
            description="Modern UEFI bootloaders for x86_64 systems."
            downloads={uefiBootloaders}
            isCollapsible={true}
            defaultExpanded={false}
          />

          <DownloadSection
            title="UEFI Bootloaders - ARM64"
            description="Bootloaders for ARM64-based systems and servers."
            downloads={arm64Bootloaders}
            isCollapsible={true}
            defaultExpanded={false}
          />

          <DownloadSection
            title="BIOS Bootloaders - PCBIOS (Legacy)"
            description="Specialized bootloaders for older systems and advanced use cases."
            downloads={legacyBootloaders}
            isCollapsible={true}
            defaultExpanded={false}
          />

          <div className={styles.checksumsSection}>
            <h3>🔐 Verification & Security</h3>
            <p>
              SHA256 checksums are generated during each build and are available{' '}
              <a href="https://boot.netboot.xyz/ipxe/netboot.xyz-sha256-checksums.txt" target="_blank" rel="noopener noreferrer">
                here
              </a>.
              You can also view the embedded scripts{' '}
              <a href="https://github.com/netbootxyz/netboot.xyz/tree/master/roles/netbootxyz/templates/disks" target="_blank" rel="noopener noreferrer">
                on GitHub
              </a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
