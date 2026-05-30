import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BootMenu from '../components/BootMenu';
import styles from './index.module.css';

// Honest, non-numeric facts — no invented metrics (per the design's final
// landed direction).
const FACTS = [
  ['No install media', 'one bootloader, not a drawer of USB sticks'],
  ['Fetched from upstream', 'pulls images over HTTP at boot time'],
  ['x86_64 · arm64', 'BIOS and UEFI builds'],
  ['Self-hostable', 'run your own instance via Docker'],
];

const FEATURES = [
  {
    title: 'Simple to use',
    body: 'Put the bootloader on a USB stick, an ISO, or your DHCP server. Power on, and pick what you want from the menu.',
    code: '# write the image to a USB stick\ndd if=netboot.xyz.img \\\n   of=/dev/sdX bs=1M',
  },
  {
    title: 'Evaluate, install, rescue',
    body: 'Network installers, live distros, and recovery utilities live in one menu — try an OS, install it, or repair a disk.',
    code: 'Linux Network Installs\nLive CDs\nUtilities\niPXE Shell',
  },
  {
    title: 'Powered by iPXE',
    body: "Built on iPXE's open-source firmware. Chainload it from GRUB, syslinux, or any UEFI shell.",
    code: 'chain --autofree \\\n  https://boot.netboot.xyz/menu.ipxe',
  },
];

const QUICK_START = [
  {
    n: '1',
    title: 'Grab the image',
    body: 'Pick the format that matches how you boot — ISO for VMs and IPMI, .img for USB, .kpxe for TFTP.',
    cmd: 'curl -O https://boot.netboot.xyz/ipxe/netboot.xyz.iso',
  },
  {
    n: '2',
    title: 'Boot from it',
    body: 'Plug in the stick, attach the ISO, or point your DHCP server at the bootloader file.',
    cmd: 'dhcp-boot=netboot.xyz.kpxe',
  },
  {
    n: '3',
    title: 'Pick your OS',
    body: 'The menu loads. Navigate with the arrow keys, press enter, and it streams the kernel from the upstream mirror.',
    cmd: '▸ Ubuntu — Network Install',
  },
];

function Hero() {
  return (
    <section className={`${styles.section} ${styles.hero}`}>
      <div>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Open source · iPXE bootloader
        </div>
        <h1 className={styles.heroTitle}>
          Your favorite operating systems,
          <br />
          <span className={styles.accent}>in one place.</span>
        </h1>
        <p className={styles.heroLede}>
          netboot.xyz is a small iPXE bootloader that opens to a menu of network
          installers, live distros, and rescue tools — fetched from upstream
          over the network, so there&apos;s no install media to manage.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.btnPrimary} to="/docs">
            Get started →
          </Link>
          <Link className={styles.btnSecondary} to="/downloads">
            Download
          </Link>
          <span className={styles.heroNote}>ISO · USB · PXE · EFI</span>
        </div>
      </div>

      {/* The menu — the centerpiece */}
      <div>
        <div className={styles.menuFrame}>
          <div className={styles.menuChrome}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.menuChromeLabel}>
              interactive demo — click, then ↑↓ ⏎ ⎋
            </span>
          </div>
          <BootMenu variant="cyan" height={500} />
        </div>
      </div>
    </section>
  );
}

function FactStrip() {
  return (
    <section className={`${styles.section} ${styles.facts}`}>
      {FACTS.map(([head, body]) => (
        <div key={head} className={styles.fact}>
          <div className={styles.factHead}>{head}</div>
          <div className={styles.factBody}>{body}</div>
        </div>
      ))}
    </section>
  );
}

function Features() {
  return (
    <section className={`${styles.section} ${styles.features}`}>
      <div className={styles.cardGrid}>
        {FEATURES.map(c => (
          <div key={c.title} className={styles.card}>
            <div className={styles.cardTitle}>{c.title}</div>
            <p className={styles.cardBody}>{c.body}</p>
            <pre className={styles.cardCode}>{c.code}</pre>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickStart() {
  return (
    <section className={`${styles.section} ${styles.quickStart}`}>
      <h2 className={styles.h2}>Quick start</h2>
      <div className={styles.steps}>
        {QUICK_START.map(s => (
          <div key={s.n}>
            <div className={styles.stepNum}>{s.n}</div>
            <div className={styles.stepTitle}>{s.title}</div>
            <p className={styles.stepBody}>{s.body}</p>
            <code className={styles.stepCmd}>{s.cmd}</code>
          </div>
        ))}
      </div>
    </section>
  );
}

function DownloadsBand() {
  return (
    <section className={`${styles.section} ${styles.downloads}`}>
      <div className={styles.downloadCard}>
        <div>
          <h2 className={styles.downloadTitle}>Get netboot.xyz</h2>
          <p className={styles.downloadBody}>
            ISO, USB image, and PXE/TFTP and EFI builds for x86_64 and arm64.
            Each release is published on GitHub with checksums.
          </p>
        </div>
        <div className={styles.downloadActions}>
          <Link className={styles.btnPrimary} to="/downloads">
            Go to downloads →
          </Link>
          <Link
            className={styles.btnSecondary}
            to="https://github.com/netbootxyz/netboot.xyz/releases"
          >
            Releases on GitHub ↗
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Your favorite operating systems in one place"
      description="netboot.xyz enables you to PXE boot many Operating System installers and utilities from a simple to use menu powered by the iPXE project."
    >
      <main className={styles.home}>
        <Hero />
        <FactStrip />
        <Features />
        <QuickStart />
        <DownloadsBand />
      </main>
    </Layout>
  );
}
