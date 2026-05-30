import React, {useState, useEffect, useRef} from 'react';
import {ENDPOINTS, OPERATING_SYSTEMS} from '../../data/catalog';
import styles from './styles.module.css';

// Interactive iPXE-style boot menu — the hero of the homepage and embeddable in
// docs via `import BootMenu from '@site/src/components/BootMenu'`.
//
// It renders the real netboot.xyz menu tree (categories, OS list, endpoints)
// from the verified catalog, with keyboard (↑↓ ⏎ ⎋) and click navigation. The
// boot sequence is simulated — clearly labelled a demo; nothing is chainloaded.

const TOP_MENU = [
  {id: 'linux', label: 'Linux Network Installs'},
  {id: 'desktop', label: 'Desktop & Live Distros'},
  {id: 'security', label: 'Security & Forensics'},
  {id: 'util', label: 'Utilities & Rescue'},
  {id: 'hyper', label: 'Hypervisors & Storage'},
  {id: 'win', label: 'Windows (WIM)'},
  {id: 'self', label: 'netboot.xyz Endpoints'},
  {id: 'shell', label: 'iPXE Shell'},
  {id: 'reboot', label: 'Reboot'},
];

const CATEGORY_IDS = ['linux', 'desktop', 'security', 'util', 'hyper', 'win'];

const FAMILY_TO_MENU = {
  'Linux Install': 'linux',
  Desktop: 'desktop',
  Security: 'security',
  Utility: 'util',
  Hypervisor: 'hyper',
  Windows: 'win',
};

const PALETTES = {
  amber: {
    bg: '#0e0a04',
    fg: '#ffb454',
    dim: '#7a5a2a',
    accent: '#ffd277',
    sel: '#ffb454',
    selFg: '#0e0a04',
    glow: '#ff9b1a',
  },
  green: {
    bg: '#020a04',
    fg: '#7CFFB2',
    dim: '#3a8a5a',
    accent: '#a4ffce',
    sel: '#7CFFB2',
    selFg: '#020a04',
    glow: '#2bff8a',
  },
  mono: {
    bg: '#0a0a0c',
    fg: '#e8e6e1',
    dim: '#666',
    accent: '#fff',
    sel: '#e8e6e1',
    selFg: '#0a0a0c',
    glow: '#9aa',
  },
  cyan: {
    bg: '#02101a',
    fg: '#7ee8ff',
    dim: '#3a7a92',
    accent: '#b4f5ff',
    sel: '#7ee8ff',
    selFg: '#02101a',
    glow: '#22c8ff',
  },
};

const BOOT_DELAY_BASE_MS = 180;
const BOOT_DELAY_JITTER_MS = 220;

// Build the simulated boot-log lines for the chosen target.
function buildBootLog({os, version, shell, reboot, endpoint}) {
  if (shell) {
    return [
      'iPXE 2.0.0+ -- Open Source Network Boot Firmware',
      'Features: HTTP HTTPS DNS TFTP AoE EFI Menu',
      'net0: 52:54:00:12:34:56 using virtio-net',
      'DHCP (net0)... ok',
      'net0: 192.168.1.42/255.255.255.0 gw 192.168.1.1',
      'iPXE>',
    ];
  }
  if (reboot) {
    return ['Resetting system...', 'Goodbye.'];
  }
  if (endpoint) {
    return [
      `chain --autofree https://${endpoint.host}/menu.ipxe`,
      `https://${endpoint.host}/menu.ipxe ... ok`,
      `Loading ${endpoint.label} menu...`,
    ];
  }
  return [
    `iPXE> selecting ${os.name} ${version}`,
    'https://boot.netboot.xyz/menu.ipxe ... ok',
    'Fetching vmlinuz from upstream mirror',
    '  ............ ok',
    'Fetching initrd from upstream mirror',
    '  ............ ok',
    'Loading initial ramdisk...',
    'Booting kernel.',
    `[ OK ] Started ${os.name} ${version}.`,
  ];
}

// Derive the visible rows + headings for the current screen on the stack.
function buildScreen(frame) {
  if (frame.kind === 'top') {
    return {
      title: 'Main Menu',
      breadcrumb: ['netboot.xyz'],
      rows: TOP_MENU.map(m => ({id: m.id, label: m.label, action: 'enter'})),
    };
  }

  if (frame.kind === 'list') {
    const rows =
      frame.menuId === 'self'
        ? ENDPOINTS.map(e => ({
            id: e.id,
            label: e.label,
            action: 'endpoint',
            endpoint: e,
          }))
        : OPERATING_SYSTEMS.filter(
            o => FAMILY_TO_MENU[o.family] === frame.menuId,
          ).map(o => ({
            id: o.id,
            label: o.name,
            action: 'enter',
            os: o,
          }));
    return {
      title: frame.title,
      breadcrumb: ['netboot.xyz', frame.title],
      rows: [
        ...rows,
        {id: '_back', label: '<- Back to Main Menu', action: 'back'},
      ],
    };
  }

  // kind === 'versions'
  return {
    title: frame.os.name,
    breadcrumb: ['netboot.xyz', frame.parentTitle, frame.os.name],
    rows: [
      ...frame.os.versions.map(v => ({
        id: v,
        label: v,
        action: 'boot',
        os: frame.os,
        version: v,
      })),
      {id: '_back', label: '<- Back', action: 'back'},
    ],
  };
}

export default function BootMenu({
  variant = 'cyan',
  compact = false,
  height = 520,
}) {
  const [stack, setStack] = useState([{kind: 'top', cursor: 0}]);
  const [phase, setPhase] = useState('menu'); // menu | booting | booted
  const [bootLog, setBootLog] = useState([]);
  const [bootTarget, setBootTarget] = useState(null);
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const keyHandlerRef = useRef(null);

  const palette = PALETTES[variant] || PALETTES.cyan;
  const frame = stack[stack.length - 1];
  const {title, breadcrumb, rows} = buildScreen(frame);
  const cursor = Math.min(frame.cursor, rows.length - 1);

  // Clean up any in-flight boot animation timer on unmount.
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const select = i => {
    setStack(s => [...s.slice(0, -1), {...s[s.length - 1], cursor: i}]);
  };

  const runBoot = target => {
    const lines = buildBootLog(target);
    setBootLog([]);
    let i = 0;
    const tick = () => {
      if (i >= lines.length) {
        timerRef.current = setTimeout(() => setPhase('booted'), 600);
        return;
      }
      setBootLog(l => [...l, lines[i]]);
      i += 1;
      timerRef.current = setTimeout(
        tick,
        BOOT_DELAY_BASE_MS + Math.random() * BOOT_DELAY_JITTER_MS,
      );
    };
    timerRef.current = setTimeout(tick, 240);
  };

  const enter = row => {
    if (!row) return;

    if (row.action === 'back') {
      setStack(s => s.slice(0, -1));
      return;
    }

    if (row.action === 'enter' && frame.kind === 'top') {
      if (row.id === 'shell') {
        setBootTarget({shell: true});
        setPhase('booting');
        runBoot({shell: true});
        return;
      }
      if (row.id === 'reboot') {
        setBootTarget({reboot: true});
        setPhase('booting');
        runBoot({reboot: true});
        return;
      }
      if (CATEGORY_IDS.includes(row.id)) {
        setStack(s => [
          ...s,
          {kind: 'list', menuId: row.id, title: row.label, cursor: 0},
        ]);
      } else if (row.id === 'self') {
        setStack(s => [
          ...s,
          {kind: 'list', menuId: 'self', title: 'Endpoints', cursor: 0},
        ]);
      }
      return;
    }

    if (row.action === 'enter' && frame.kind === 'list' && row.os) {
      setStack(s => [
        ...s,
        {kind: 'versions', os: row.os, parentTitle: frame.title, cursor: 0},
      ]);
      return;
    }

    if (row.action === 'endpoint') {
      setBootTarget({endpoint: row.endpoint});
      setPhase('booting');
      runBoot({endpoint: row.endpoint});
      return;
    }

    if (row.action === 'boot') {
      setBootTarget({os: row.os, version: row.version});
      setPhase('booting');
      runBoot({os: row.os, version: row.version});
    }
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    setPhase('menu');
    setBootLog([]);
    setBootTarget(null);
    setStack([{kind: 'top', cursor: 0}]);
  };

  // Keyboard nav — only active when this menu has focus. The handler closes
  // over live state (rows/cursor/phase/stack), so we keep the latest one in a
  // ref and bind the window listener once on mount. This avoids re-registering
  // the listener on every render (the warning an empty dep array would "fix")
  // while still always running the freshest handler (which an empty dep array
  // would break, by capturing stale state).
  const onKey = e => {
    const el = containerRef.current;
    if (!el) return;
    if (!el.matches(':focus-within') && document.activeElement !== el) return;

    if (phase !== 'menu') {
      if (e.key === 'Escape') reset();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      select(Math.min(rows.length - 1, cursor + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      select(Math.max(0, cursor - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      enter(rows[cursor]);
    } else if (e.key === 'Escape' || e.key === 'Backspace') {
      if (stack.length > 1) setStack(s => s.slice(0, -1));
    }
  };
  keyHandlerRef.current = onKey;

  useEffect(() => {
    const listener = e => keyHandlerRef.current?.(e);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);

  const fontSize = compact ? 13 : 15;
  const bootedLabel = bootTarget?.os
    ? `${bootTarget.os.name} ${bootTarget.version}`
    : bootTarget?.endpoint
      ? bootTarget.endpoint.label
      : 'iPXE shell';

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={styles.root}
      onClick={() => containerRef.current?.focus()}
      style={{
        background: palette.bg,
        color: palette.fg,
        fontSize,
        padding: compact ? '14px 18px' : '20px 26px',
        height,
        textShadow: variant === 'mono' ? 'none' : `0 0 8px ${palette.glow}40`,
      }}
    >
      {variant !== 'mono' && <div className={styles.scanlines} />}
      <div
        className={styles.vignette}
        style={{
          background: `radial-gradient(ellipse at center, transparent 55%, ${palette.bg} 110%)`,
        }}
      />

      {phase === 'menu' && (
        <div className={styles.screen}>
          <div
            className={styles.metaRow}
            style={{color: palette.dim, fontSize: fontSize - 2}}
          >
            <span>{breadcrumb.join(' / ')}</span>
            <span>iPXE 2.0.0+ &nbsp;·&nbsp; net0 192.168.1.42</span>
          </div>
          <div className={styles.rule} style={{borderColor: palette.dim}} />
          <div className={styles.title} style={{color: palette.accent}}>
            ┌─[ {title.toUpperCase()} ]
            {'─'.repeat(Math.max(0, 28 - title.length))}┐
          </div>

          <div className={styles.rows}>
            {rows.map((r, i) => {
              const isSelected = i === cursor;
              const isBack = r.action === 'back';
              return (
                <div
                  key={r.id}
                  className={styles.row}
                  onClick={() => enter(r)}
                  onMouseEnter={() => select(i)}
                  style={{
                    padding: compact ? '2px 10px' : '3px 12px',
                    background: isSelected ? palette.sel : 'transparent',
                    color: isSelected
                      ? palette.selFg
                      : isBack
                        ? palette.dim
                        : palette.fg,
                    textShadow: isSelected ? 'none' : undefined,
                  }}
                >
                  <span style={{width: 18, opacity: isSelected ? 1 : 0.4}}>
                    {isSelected ? '►' : ' '}
                  </span>
                  <span style={{flex: 1}}>{r.label}</span>
                </div>
              );
            })}
          </div>

          <div
            className={styles.footer}
            style={{
              borderColor: palette.dim,
              color: palette.dim,
              fontSize: fontSize - 3,
            }}
          >
            <span>↑↓ navigate &nbsp;·&nbsp; ⏎ select &nbsp;·&nbsp; ⎋ back</span>
            <span>{stack.length > 1 ? 'sub-menu' : 'main'}</span>
          </div>
        </div>
      )}

      {phase === 'booting' && (
        <div className={styles.booting}>
          {bootLog.map((l, i) => (
            <div key={i} className={styles.bootLine}>
              {l}
            </div>
          ))}
          <span
            className={styles.cursorBlink}
            style={{background: palette.fg}}
          />
        </div>
      )}

      {phase === 'booted' && (
        <div className={styles.booted}>
          <div style={{fontSize: fontSize + 4, color: palette.accent}}>
            {bootedLabel}
          </div>
          <div style={{color: palette.dim}}>(simulated — boot complete)</div>
          <button
            type="button"
            onClick={reset}
            className={styles.restart}
            style={{color: palette.fg, borderColor: palette.fg, fontSize}}
          >
            [ RESTART DEMO ]
          </button>
        </div>
      )}
    </div>
  );
}
