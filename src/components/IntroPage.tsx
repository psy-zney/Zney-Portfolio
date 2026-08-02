import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  Download,
  Github,
  Mail,
  Share2,
  Facebook,
  MessageCircle,
  TerminalSquare,
  Linkedin,
  Sun,
  Moon,
} from 'lucide-react';
import { GalaxyButton } from './GalaxyButton';
import { RectGlowButton } from './RectGlowButton';
import { fetchVisitorInfo, VisitorInfo } from '../utils/visitorTracker';

// ==================== ZNEY ASCII LOGO + LED SCAN WAVE ====================
const ASCII_ROWS = [
  ' ███████╗███╗   ██╗███████╗██╗   ██╗',
  ' ╚══███╔╝████╗  ██║██╔════╝╚██╗ ██╔╝',
  '   ███╔╝ ██╔██╗ ██║█████╗   ╚████╔╝ ',
  '  ███╔╝  ██║╚██╗██║██╔══╝    ╚██╔╝  ',
  ' ███████╗██║ ╚████║███████╗   ██║   ',
  ' ╚══════╝╚═╝  ╚═══╝╚══════╝   ╚═╝   ',
];

// Precompute scan-order index for every non-space char: left→right, top→bottom
// Space chars get -1
const ASCII_BLOCK_MAP: number[][] = (() => {
  const map = ASCII_ROWS.map((row) => new Array(row.length).fill(-1));
  let idx = 0;
  for (let ri = 0; ri < ASCII_ROWS.length; ri++) {
    for (let ci = 0; ci < ASCII_ROWS[ri].length; ci++) {
      if (ASCII_ROWS[ri][ci] !== ' ') {
        map[ri][ci] = idx++;
      }
    }
  }
  return map;
})();

const ASCII_TOTAL_BLOCKS = ASCII_ROWS.reduce(
  (a, r) => a + r.split('').filter((c) => c !== ' ').length,
  0
);

const LED_WAVE_COLORS = [
  '#38bdf8', '#818cf8', '#c084fc', '#f472b6',
  '#34d399', '#fb923c', '#c696c2ff', '#ffffff'
];

function ZneyLEDLogo() {
  const [phase, setPhase] = useState<'fill' | 'wave'>('fill');
  const [litCount, setLitCount] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);

  // Phase 1: light up chars one by one, left→right top→bottom
  useEffect(() => {
    if (phase !== 'fill') return;
    if (litCount < ASCII_TOTAL_BLOCKS) {
      const t = setTimeout(() => setLitCount((c) => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase('wave'), 500);
      return () => clearTimeout(t);
    }
  }, [litCount, phase]);

  // Phase 2: sweep front advances 2 chars every 25ms
  // One full sweep paints all chars with a single color, then next color takes over
  useEffect(() => {
    if (phase !== 'wave') return;
    const t = setInterval(() => setWaveOffset((o) => o + 2), 25);
    return () => clearInterval(t);
  }, [phase]);

  // Derive current sweep position and colors from waveOffset
  const sweepPos = waveOffset % ASCII_TOTAL_BLOCKS;
  const sweepColorIdx = Math.floor(waveOffset / ASCII_TOTAL_BLOCKS) % LED_WAVE_COLORS.length;
  const prevColorIdx = (sweepColorIdx - 1 + LED_WAVE_COLORS.length) % LED_WAVE_COLORS.length;
  const sweepColor = LED_WAVE_COLORS[sweepColorIdx];
  const prevColor = LED_WAVE_COLORS[prevColorIdx];

  return (
    <div style={{ marginBottom: '18px', userSelect: 'none', overflow: 'hidden' }}>
      {ASCII_ROWS.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', lineHeight: '1.15', whiteSpace: 'pre' }}>
          {row.split('').map((ch, ci) => {
            const blockIdx = ASCII_BLOCK_MAP[ri][ci];
            const isBlock = blockIdx >= 0;

            let color = 'transparent';
            let shadow = 'none';

            if (isBlock) {
              if (phase === 'fill') {
                if (blockIdx < litCount) {
                  color = '#38bdf8';
                  shadow = '0 0 8px rgba(56,189,248,0.65)';
                } else {
                  color = '#0d1e30';
                }
              } else {
                // Chars already passed by sweep front → sweepColor (new)
                // Chars not yet reached → prevColor (old)
                if (blockIdx < sweepPos) {
                  color = sweepColor;
                  shadow = `0 0 9px ${sweepColor}99`;
                } else {
                  color = prevColor;
                  shadow = `0 0 6px ${prevColor}55`;
                }
              }
            }

            return (
              <span
                key={ci}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(9px, 1.8vw, 13px)',
                  display: 'inline-block',
                  color,
                  textShadow: shadow,
                  transition: 'color 30ms linear, text-shadow 30ms linear',
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}



// ==================== ZEN SIDEBAR ====================
const DEPLOYED_SITES = [
  { label: 'Main Portfolio', url: 'http://zney295.id.vn/', sub: 'zney295.id.vn', color: '#3882F6' },
  { label: 'Study Hub', url: 'https://study.zney295.id.vn/', sub: 'study.zney295.id.vn', color: '#10B981' },
  { label: 'BeatSync', url: 'https://beatsync.zney295.id.vn/', sub: 'beatsync.zney295.id.vn', color: '#F97316' },
  { label: 'Security', url: 'https://zney295.id.vn/Security/', sub: 'zney295.id.vn/Security', color: '#8B5CF6' },
  { label: 'Mandy Crimson', url: 'https://zney295.id.vn/mandycrimson/', sub: 'zney295.id.vn/mandycrimson', color: '#EC4899' },
];

function ZenSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, height: '100dvh', zIndex: 50, display: 'flex', pointerEvents: 'none' }}>
      {open && (
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 49, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)', pointerEvents: 'all' }}
        />
      )}
      <div
        style={{
          position: 'relative', zIndex: 50, width: '260px', height: '100%',
          background: '#111827', borderRight: '1px solid #1f2937', borderRadius: '0 24px 24px 0',
          boxShadow: open ? '6px 0 30px rgba(0,0,0,0.5)' : 'none',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: open ? 'all' : 'none',
          display: 'flex', flexDirection: 'column', padding: '24px 0', overflowY: 'auto',
        }}
      >
        <div style={{ padding: '0 20px 16px', borderBottom: '1px solid #1f2937', marginBottom: '12px' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#6e7681', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>
            Deployed Sites &amp; Projects
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 12px' }}>
          {DEPLOYED_SITES.map((site, i) => (
            <a
              key={i} href={site.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', textDecoration: 'none', background: '#1a2233', border: '1px solid #1f2937', borderRadius: '16px', transition: 'all 200ms', cursor: 'pointer' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.background = '#21262d'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.background = '#1a2233'; }}
            >
              <span style={{ width: 30, height: 30, borderRadius: '10px', background: site.color + '20', border: `1px solid ${site.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: site.color }} />
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: '13px', fontWeight: 600, color: '#c9d1d9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{site.label}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#6e7681', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{site.sub}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== MARKDOWN RENDERER (neutral tones, minimal blue) ====================
function SimpleMarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  const renderFormattedText = (text: string): React.ReactNode => {
    const parts = text.split(/(\[.*?\]\(.*?\)|`.*?`|\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('[') && part.includes('](')) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <a key={idx} href={match[2]} target="_blank" rel="noopener noreferrer"
              style={{ color: '#4e7dbc', textDecoration: 'underline', fontWeight: 600 }}>
              {match[1]}
            </a>
          );
        }
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={idx} style={{ background: 'rgba(120, 130, 140, 0.15)', color: '#e6edf3', padding: '1px 6px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85em', fontWeight: 600, border: '1px solid rgba(120, 130, 140, 0.2)' }}>
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} style={{ fontWeight: 700, color: '#ffffff' }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const flushTable = (key: string) => {
    if (!inTable) return;
    elements.push(
      <div key={key} style={{ margin: '20px 0', overflowX: 'auto', border: '1px solid #30363d', borderRadius: '10px', background: 'transparent' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#161b22', borderBottom: '1px solid #30363d' }}>
              {tableHeaders.map((h, i) => (
                <th key={i} style={{ padding: '10px 14px', fontWeight: 700, color: '#c9d1d9', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}>{renderFormattedText(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: '1px solid #21262d' }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: '10px 14px', color: '#e6edf3', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.6 }}>{renderFormattedText(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    inTable = false;
    tableHeaders = [];
    tableRows = [];
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.split('|').slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => c.match(/^:?-+:?$/))) return;
      if (!inTable) { inTable = true; tableHeaders = cells; }
      else { tableRows.push(cells); }
      return;
    } else if (inTable) { flushTable(`table-${idx}`); }

    if (trimmed === '---') { elements.push(<hr key={idx} style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #30363d' }} />); return; }
    if (trimmed.startsWith('# ')) { elements.push(<h1 key={idx} style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: 1.15, fontFamily: "'Newsreader', serif" }}>{renderFormattedText(trimmed.slice(2))}</h1>); return; }
    if (trimmed.startsWith('### ')) { elements.push(<h3 key={idx} style={{ fontSize: '16px', fontWeight: 700, color: '#e6edf3', marginTop: '20px', marginBottom: '8px' }}>{renderFormattedText(trimmed.slice(4))}</h3>); return; }
    if (trimmed.startsWith('## ')) { elements.push(<h2 key={idx} style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8b949e', marginTop: '32px', marginBottom: '12px', paddingBottom: '6px', borderBottom: '1px solid #30363d' }}>{renderFormattedText(trimmed.slice(3))}</h2>); return; }
    if (trimmed.startsWith('- ')) { elements.push(<li key={idx} style={{ marginLeft: '20px', listStyleType: 'disc', fontSize: '14px', color: '#c9d1d9', lineHeight: 1.7, marginBottom: '6px' }}>{renderFormattedText(trimmed.slice(2))}</li>); return; }
    if (trimmed.length > 0) { elements.push(<p key={idx} style={{ fontSize: '14px', color: '#c9d1d9', lineHeight: 1.75, marginBottom: '10px' }}>{renderFormattedText(trimmed)}</p>); }
  });

  if (inTable) flushTable('table-end');
  return <div style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>{elements}</div>;
}

// ==================== AI TERMINAL WINDOW (zneyOS style) ====================
const SLASH_CMDS = [
  { cmd: '/intro', desc: 'go to Introduction' },
  { cmd: '/cvweb', desc: 'open Web Developer CV' },
  { cmd: '/cvmb', desc: 'open Mobile Developer CV' },
  { cmd: '/projects', desc: 'list featured projects' },
  { cmd: '/skills', desc: 'show tech stack' },
  { cmd: '/workspace', desc: 'enter 3D workspace' },
  { cmd: '/help', desc: 'show all commands' },
];

function AITerminalWindow({
  onRunCommand,
  isVie,
}: {
  onRunCommand: (cmd: string) => void;
  isVie: boolean;
}) {
  const [inputVal, setInputVal] = useState('');
  const [showSug, setShowSug] = useState(false);
  const [filtered, setFiltered] = useState(SLASH_CMDS);
  const [history, setHistory] = useState<Array<{ type: 'in' | 'out'; text: string }>>([]);
  const [visitor, setVisitor] = useState<VisitorInfo | null>(null);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return sessionStorage.getItem('zney_admin_unlocked') === 'true';
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { fetchVisitorInfo().then(setVisitor); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const handleInput = (val: string) => {
    setInputVal(val);
    if (val.startsWith('/')) {
      const lower = val.toLowerCase();
      setFiltered(SLASH_CMDS.filter((s) => s.cmd.startsWith(lower)));
      setShowSug(true);
    } else {
      setShowSug(false);
    }
  };

  const execCmd = async (raw: string) => {
    const cmd = raw.trim();
    setShowSug(false);
    setInputVal('');
    
    // First, check if the exact command matches the admin password hash
    const encoder = new TextEncoder();
    const rawHashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(cmd));
    const rawHashHex = Array.from(new Uint8Array(rawHashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    const validPassHash = (import.meta as any).env?.VITE_ADMIN_PASS_HASH;
    
    if (validPassHash && rawHashHex === validPassHash) {
       // Secret Access Granted!
       localStorage.setItem('zney_admin_pass', cmd);
       const newH = [...history, { type: 'in' as const, text: '*'.repeat(cmd.length) }];
       newH.push({ type: 'out', text: `[ACCESS GRANTED] Redirecting to System Console...` });
       setHistory(newH);
       setTimeout(() => {
         onRunCommand('admin');
       }, 600);
       return;
    }

    const lower = cmd.toLowerCase().replace(/^\//, '');

    if (!cmd || lower === 'enter') { onRunCommand('portfolio'); return; }
    const newH = [...history, { type: 'in' as const, text: cmd }];
    if (['help', 'ls'].includes(lower)) {
      newH.push({ type: 'out', text: 'Available: /intro /cvweb /cvmb /projects /skills /workspace /help' });
    } else if (['intro', 'portfolio', 'p1'].includes(lower)) {
      onRunCommand('portfolio'); return;
    } else if (['cvweb', 'web', 'p2'].includes(lower)) {
      onRunCommand('cvweb'); return;
    } else if (['cvmb', 'mobile', 'p3'].includes(lower)) {
      onRunCommand('cvmb'); return;
    } else if (['projects', 'proj'].includes(lower)) {
      newH.push({ type: 'out', text: '→ Cloud POS SaaS · Security Core · BeatSync · Mandy Crimson' });
    } else if (['skills', 'tech'].includes(lower)) {
      newH.push({ type: 'out', text: '→ React · Next.js · TypeScript · Node.js · Rust · React Native · AWS · Cloudflare' });
    } else if (['workspace', '3d'].includes(lower)) {
      onRunCommand('workspace'); return;
    } else {
      newH.push({ type: 'out', text: `command not found: ${cmd}  (try /help)` });
    }
    setHistory(newH);
  };

  const selectSug = (cmd: string) => {
    setInputVal(cmd + ' ');
    setShowSug(false);
    inputRef.current?.focus();
  };

  const lastTapRef = useRef<number>(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 350) {
      onRunCommand('portfolio');
    }
    lastTapRef.current = now;
  };

  return (
    <div
      style={{
        background: '#0d1117', border: '1px solid #30363d', borderRadius: '14px',
        overflow: 'hidden', fontFamily: "'JetBrains Mono', monospace",
        width: '100%', maxWidth: '660px', margin: '0 auto',
        boxShadow: '0 0 0 1px #21262d, 0 32px 80px rgba(0,0,0,0.9)',
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={() => inputRef.current?.focus()}
      onTouchEnd={handleDoubleTap}
      onDoubleClick={() => onRunCommand('portfolio')}
    >
      {/* Shooting stars — clipped inside terminal box, zIndex 0 puts them behind text and title bar */}
      <span style={{ position: 'absolute', top: '0px', left: '20%', width: '120px', height: '1.5px', borderRadius: '999px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), #38bdf8)', filter: 'drop-shadow(0 0 5px rgba(56,189,248,0.8))', transform: 'rotate(36deg)', animation: 'zney-meteor 2.8s cubic-bezier(0.25,0.1,0.25,1) infinite', pointerEvents: 'none', zIndex: 0 }} />
      <span style={{ position: 'absolute', top: '0px', left: '65%', width: '100px', height: '1.5px', borderRadius: '999px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), #c084fc)', filter: 'drop-shadow(0 0 5px rgba(192,132,252,0.7))', transform: 'rotate(36deg)', animation: 'zney-meteor 3.6s cubic-bezier(0.25,0.1,0.25,1) infinite 1.4s', pointerEvents: 'none', zIndex: 0 }} />

      {/* Title bar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', background: '#161b22', borderBottom: '1px solid #21262d', borderRadius: '14px 14px 0 0', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: '7px' }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: '12px', color: '#8b949e', letterSpacing: '0.06em', fontWeight: 600 }}>zneyOS</div>
        <span style={{ fontSize: '10px', color: '#484f58' }}>v_2.9.5</span>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 24px 16px', position: 'relative', zIndex: 1 }}>
        <ZneyLEDLogo />

        {/* AI CLI header */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
            <span style={{ color: '#8b949e', fontSize: '13px' }}>&gt;_</span>
            <span style={{ color: '#e6edf3', fontSize: '14px', fontWeight: 700 }}>zAI nzy</span>
            <span style={{ color: '#484f58', fontSize: '11px' }}>(v_2.9.5)</span>
          </div>
          <div style={{ fontSize: '12px', lineHeight: 2.1 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#484f58', minWidth: '72px', display: 'inline-block' }}>model:</span>
              <span style={{ color: '#c9d1d9', marginRight: '18px' }}>LQK - Extra High</span>
              <span
                style={{ color: '#4e7dbc', fontSize: '11px', cursor: 'pointer', letterSpacing: '0.03em' }}
                onClick={(e) => { e.stopPropagation(); selectSug('/model'); }}
              >/model</span>
            </div>
            <div>
              <span style={{ color: '#484f58', minWidth: '72px', display: 'inline-block' }}>direc:</span>
              <span style={{ color: '#c9d1d9' }}>Portfolio</span>
            </div>
            {isAdminUnlocked && (
              <div style={{ marginTop: '8px', padding: '8px 12px', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.22)', borderRadius: '8px', fontSize: '11px', lineHeight: 1.7 }}>
                <div style={{ color: '#34d399', fontWeight: 700, marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                  <span>🔓 System Console Activated</span>
                </div>
                <div style={{ color: '#38bdf8' }}>Client IP: {visitor?.ip || 'Detecting...'} {visitor?.country ? `(${visitor.city ? visitor.city + ', ' : ''}${visitor.country})` : ''}</div>
                <div style={{ color: '#c084fc' }}>System: {visitor?.browser} on {visitor?.os}</div>
                <div style={{ color: '#fb923c' }}>Total Site Visits: #{visitor?.visitCount?.toLocaleString() || 1}</div>
              </div>
            )}
          </div>
        </div>

        {/* Output history */}
        {history.length > 0 && (
          <div style={{ marginBottom: '12px', maxHeight: '100px', overflowY: 'auto' }}>
            {history.map((h, i) => (
              <div key={i} style={{ fontSize: '12px', color: h.type === 'in' ? '#79c0ff' : '#56d364', marginBottom: '3px', lineHeight: 1.6 }}>
                {h.type === 'in' ? `> ${h.text}` : `  ${h.text}`}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Tip (only when no history) */}
        {history.length === 0 && (
          <div style={{ marginBottom: '14px', fontSize: '12px', color: '#484f58' }}>
            <span style={{ color: '#8b949e', fontWeight: 600 }}>Tip:</span>{' '}
            {isVie
              ? 'nhấn Enter (hoặc chạm 2 lần) để vào Introduction'
              : 'press Enter (or double tap) to enter Introduction'}
          </div>
        )}

        {/* Input row */}
        <div style={{ position: 'relative' }}>
          {/* Suggestions */}
          {showSug && filtered.length > 0 && (
            <div style={{ position: 'absolute', bottom: 'calc(100% + 6px)', left: 0, right: 0, background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', overflow: 'hidden', zIndex: 10, boxShadow: '0 -8px 24px rgba(0,0,0,0.5)' }}>
              {filtered.map((s, i) => (
                <button
                  key={i} type="button"
                  onMouseDown={(e) => { e.preventDefault(); selectSug(s.cmd); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', padding: '8px 14px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: i < filtered.length - 1 ? '1px solid #21262d' : 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#21262d')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ color: '#79c0ff', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', minWidth: '100px' }}>{s.cmd}</span>
                  <span style={{ color: '#484f58', fontSize: '11px' }}>{s.desc}</span>
                </button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); execCmd(inputVal); }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#484f58', fontSize: '14px', userSelect: 'none', lineHeight: 1 }}>&gt;</span>
            <input
              ref={inputRef}
              value={inputVal}
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Tab' && showSug && filtered.length > 0) { e.preventDefault(); selectSug(filtered[0].cmd); }
                if (e.key === 'Escape') setShowSug(false);
              }}
              placeholder={isVie ? "nhập lệnh hoặc '/' để gợi ý..." : "type a command or '/' for suggestions..."}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#e6edf3', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', caretColor: '#79c0ff' }}
              autoFocus
            />
          </form>
        </div>

        {/* Footer status */}
        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #21262d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontSize: '11px', color: '#484f58' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3fb950', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ color: '#8b949e' }}>LQK - Extra High</span>
            <span>·</span>
            <span>Portfolio</span>
          </div>
          {isAdminUnlocked && visitor && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', color: '#6e7681' }}>
              <span style={{ color: '#34d399' }}>🔓 System</span>
              <span>·</span>
              <span style={{ color: '#38bdf8' }}>IP: {visitor.ip}</span>
              <span>·</span>
              <span style={{ color: '#c084fc' }}>{visitor.browser} ({visitor.os})</span>
              <span>·</span>
              <span style={{ color: '#fb923c' }}>Visits: #{visitor.visitCount.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== SYSTEM CONSOLE PAGE ====================
function AdminTelemetryPage({ visitor, isVie, onLockAdmin }: { visitor: VisitorInfo | null; isVie: boolean; onLockAdmin: () => void }) {
  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', padding: '36px 24px 140px', fontFamily: "'JetBrains Mono', monospace", color: '#e6edf3' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #21262d', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', background: '#38bdf8', color: '#000', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>🔓 SYSTEM CONSOLE</span>
          <span style={{ fontSize: '13px', color: '#8b949e', fontWeight: 600 }}>zneyOS Internal Metrics Dashboard</span>
        </div>
        <button
          onClick={onLockAdmin}
          style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: '8px', padding: '8px 16px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
        >
          🔒 Lock Session
        </button>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {/* Client Telemetry */}
        <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '16px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
          <div style={{ fontSize: '11px', color: '#38bdf8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 700 }}>
            • Client Telemetry &amp; Session
          </div>
          <div style={{ fontSize: '13px', lineHeight: 2 }}>
            <div><span style={{ color: '#6e7681', minWidth: '100px', display: 'inline-block' }}>IP Address:</span> <span style={{ color: '#38bdf8', fontWeight: 700 }}>{visitor?.ip || 'Detecting...'}</span></div>
            <div><span style={{ color: '#6e7681', minWidth: '100px', display: 'inline-block' }}>Location:</span> <span style={{ color: '#e6edf3' }}>{visitor?.city ? `${visitor.city}, ` : ''}{visitor?.country || 'Unknown'}</span></div>
            <div><span style={{ color: '#6e7681', minWidth: '100px', display: 'inline-block' }}>Browser:</span> <span style={{ color: '#c084fc' }}>{visitor?.browser || 'Unknown'}</span></div>
            <div><span style={{ color: '#6e7681', minWidth: '100px', display: 'inline-block' }}>OS Platform:</span> <span style={{ color: '#34d399' }}>{visitor?.os || 'Unknown'}</span></div>
            <div><span style={{ color: '#6e7681', minWidth: '100px', display: 'inline-block' }}>Screen Res:</span> <span style={{ color: '#8b949e' }}>{window.innerWidth} x {window.innerHeight}</span></div>
          </div>
        </div>

        {/* Global Traffic Stats */}
        <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '16px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
          <div style={{ fontSize: '11px', color: '#34d399', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 700 }}>
            • Global Traffic Metrics
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: '#161b22', padding: '14px', borderRadius: '10px', border: '1px solid #21262d' }}>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#fb923c', display: 'block' }}>#{visitor?.visitCount?.toLocaleString() || 1}</span>
              <span style={{ fontSize: '11px', color: '#6e7681' }}>Total Visits</span>
            </div>
            <div style={{ background: '#161b22', padding: '14px', borderRadius: '10px', border: '1px solid #21262d' }}>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#34d399', display: 'block' }}>100%</span>
              <span style={{ fontSize: '11px', color: '#6e7681' }}>System Status</span>
            </div>
            <div style={{ background: '#161b22', padding: '14px', borderRadius: '10px', border: '1px solid #21262d' }}>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#38bdf8', display: 'block' }}>AWS/CF</span>
              <span style={{ fontSize: '11px', color: '#6e7681' }}>Edge Infra</span>
            </div>
            <div style={{ background: '#161b22', padding: '14px', borderRadius: '10px', border: '1px solid #21262d' }}>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#c084fc', display: 'block' }}>&lt; 30ms</span>
              <span style={{ fontSize: '11px', color: '#6e7681' }}>Avg Latency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visitor Logs Table */}
      <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '16px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontSize: '11px', color: '#c084fc', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>
            • System Metrics Logs ({visitor?.logs?.length || 0})
          </div>
          <span style={{ fontSize: '11px', color: '#6e7681' }}>Cluster: MongoDB Atlas Telemetry</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #21262d', color: '#6e7681', fontSize: '11px' }}>
                <th style={{ padding: '8px 12px' }}>Timestamp</th>
                <th style={{ padding: '8px 12px' }}>IP Address</th>
                <th style={{ padding: '8px 12px' }}>Location</th>
                <th style={{ padding: '8px 12px' }}>Browser / OS</th>
              </tr>
            </thead>
            <tbody>
              {visitor?.logs && visitor.logs.length > 0 ? (
                visitor.logs.map((log, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #161b22' }}>
                    <td style={{ padding: '10px 12px', color: '#8b949e', whiteSpace: 'nowrap' }}>{new Date(log.timestamp).toLocaleTimeString()} {new Date(log.timestamp).toLocaleDateString()}</td>
                    <td style={{ padding: '10px 12px', color: '#38bdf8', fontWeight: 700 }}>{log.ip}</td>
                    <td style={{ padding: '10px 12px', color: '#e6edf3' }}>{log.city ? `${log.city}, ` : ''}{log.country || 'Vietnam'}</td>
                    <td style={{ padding: '10px 12px', color: '#c084fc' }}>{log.browser} ({log.os})</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: '16px 12px', color: '#6e7681', textAlign: 'center' }}>No visitor telemetry logs recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==================== MARKDOWN CV PAGE ====================
function MarkdownCVPage({ filePath, badgeTitle, fileName, isVie }: { filePath: string; badgeTitle: string; fileName: string; isVie: boolean }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(filePath)
      .then((r) => r.text())
      .then((d) => { if (active) { setContent(d); setLoading(false); } })
      .catch(() => { if (active) { setContent('# Error\nCould not load file.'); setLoading(false); } });
    return () => { active = false; };
  }, [filePath]);

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '36px 24px 140px', fontFamily: "'Helvetica Neue', sans-serif", color: '#e6edf3' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #21262d', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", background: '#ffffff', color: '#000000', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>{badgeTitle}</span>
          <span style={{ fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", color: '#8b949e' }}>public/file/{fileName}</span>
        </div>
        <a href={filePath} download={fileName} target="_blank" rel="noopener noreferrer" style={{ background: '#ffffff', color: '#000000', borderRadius: '8px', padding: '8px 16px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Download size={14} />
          <span>{isVie ? 'Tải File Markdown' : 'Download .md'}</span>
        </a>
      </div>
      <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '16px', padding: '40px 44px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", color: '#8b949e', fontSize: '13px' }}>[ Loading {fileName}... ]</div>
        ) : (
          <SimpleMarkdownRenderer content={content} />
        )}
      </div>
    </div>
  );
}

// ==================== GLOBAL STICKY BOTTOM BAR (LIQUID Glass) ====================
function GlobalStickyBottomBar({ currentPageIndex, onNavigatePage, onEnterWorkspace, isVie, isSplashMode, onBackToTerminal, theme, onToggleTheme, isAdminUnlocked }: { currentPageIndex: number; onNavigatePage: (i: number) => void; onEnterWorkspace: () => void; isVie: boolean; isSplashMode: boolean; onBackToTerminal: () => void; theme?: 'dark' | 'light'; onToggleTheme?: () => void; isAdminUnlocked?: boolean; }) {
  const totalPages = isAdminUnlocked ? 4 : 3;
  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: 0,
          right: 0,
          margin: '0 auto',
          zIndex: 9999,
          width: isSplashMode ? 'fit-content' : 'min(920px, calc(100vw - 28px))',
          borderRadius: '26px',
          /* Top highlight edge + bottom shadow like Apple UI */
          boxShadow:
            '0 2px 0 rgba(255,255,255,0.55) inset,'
            + '0 -1px 0 rgba(255,255,255,0.15) inset,'
            + '0 24px 60px rgba(0,0,0,0.55),'
            + '0 4px 16px rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isSplashMode ? 'center' : 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* The true liquid glass layer without border */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: 'rgba(200, 210, 230, 0.18)',
          backdropFilter: 'blur(28px) saturate(200%) brightness(1.15)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(1.15)',
          zIndex: -1
        }} />
        {/* Border Layer (no filter to avoid distortion) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          border: '1px solid rgba(255, 255, 255, 0.45)',
          zIndex: -1,
          pointerEvents: 'none'
        }} />

        {/* Inner container to hold contents above the absolute glass background */}
        <div 
          className={theme === 'light' ? 'light-mode-invert' : ''}
          style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: isSplashMode ? 'center' : 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '10px 18px',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Socials */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {[
              { href: 'https://github.com/psy-zney', icon: Github, title: 'GitHub' },
              { href: 'https://www.facebook.com/psyotic.zney/', icon: Facebook, title: 'Facebook' },
              { href: 'https://www.linkedin.com/in/psy-zney295', icon: Linkedin, title: 'LinkedIn' },
              { href: 'mailto:lequangkhanh295@gmail.com', icon: Mail, title: 'Email' },
              { href: 'https://zalo.me/0394426827', icon: MessageCircle, title: 'Zalo' },
            ].map((item, idx) => (
              <div key={idx} className={theme === 'light' ? 'no-radar' : ''}>
                <GalaxyButton
                  href={item.href}
                  isIcon
                  title={item.title}
                  text={<item.icon size={15} />}
                />
              </div>
            ))}
            {!isSplashMode && (
              <div className={theme === 'light' ? 'no-radar' : ''}>
                <GalaxyButton
                  isIcon
                  onClick={onBackToTerminal}
                  title="Back to Terminal"
                  text={<TerminalSquare size={16} />}
                />
              </div>
            )}
          </div>

          {/* Page nav */}
          {!isSplashMode && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
              <button
                onClick={() => onNavigatePage((currentPageIndex + totalPages - 1) % totalPages)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '9999px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontWeight: 800,
                  transition: 'all 180ms ease',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                }}
              >
                &lt;
              </button>

              <span
                style={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.35)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                }}
              >
                {currentPageIndex === 0 && (isVie ? `Trang 1 / ${totalPages} • Intro` : `Page 1 / ${totalPages} • Intro`)}
                {currentPageIndex === 1 && (isVie ? `Trang 2 / ${totalPages} • CV Web` : `Page 2 / ${totalPages} • CV Web`)}
                {currentPageIndex === 2 && (isVie ? `Trang 3 / ${totalPages} • CV Mobile` : `Page 3 / ${totalPages} • CV Mobile`)}
                {currentPageIndex === 3 && (isVie ? `Trang 4 / ${totalPages} • System Console` : `Page 4 / ${totalPages} • System Console`)}
              </span>

              <button
                onClick={() => onNavigatePage((currentPageIndex + 1) % totalPages)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '9999px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontWeight: 800,
                  transition: 'all 180ms ease',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                }}
              >
                &gt;
              </button>
            </div>
          )}

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!isSplashMode && (
              <div className={theme === 'light' ? 'no-radar' : ''}>
                <GalaxyButton
                  onClick={onEnterWorkspace}
                  text={
                    <>
                      <span>{isVie ? 'Vào Workspace 3D' : 'View 3D Workspace'}</span>
                      <span>→</span>
                    </>
                  }
                />
              </div>
            )}
            {!isSplashMode && (
              <button
                onClick={onToggleTheme}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ==================== FEATURED PROJECTS ====================
const FEATURED_PROJECTS = [
  { title: 'Cloud POS SaaS — Multi-Tenant Platform', role: 'Full-Stack Developer (Team Project)', time: '2026', demo: 'https://pos.zney295.id.vn/', desc_vie: 'Hệ thống Quản lý Bán hàng đa doanh nghiệp (React/Vite, Node.js/Express, MySQL) triển khai trên AWS với EC2, RDS, Nginx và PM2.', desc_eng: 'Multi-tenant SaaS POS system built with React/Vite, Node.js/Express, MySQL deployed on AWS EC2 & RDS.', tech: ['React', 'Node.js', 'Express', 'MySQL', 'AWS EC2/RDS', 'Nginx', 'PM2'] },
  { title: 'Security Core — Cross-Platform Remote System', role: 'Lead Architect & Developer', time: 'Jan–Mar 2026', demo: 'https://zney295.id.vn/Security/', desc_vie: 'Hệ thống bảo mật từ xa 4 module: Rust SYSTEM service, Tauri/React desktop, React Native mobile, Socket.IO relay.', desc_eng: '4-module remote security system: Rust service (SYSTEM), Tauri/React desktop, React Native app & Socket.IO relay.', tech: ['Rust', 'Tauri', 'React Native', 'Socket.IO', 'Named Pipes', 'WebSocket'] },
  { title: 'BeatSync — Multi-Device Audio Sync', role: 'Creator & Developer', time: 'May 2026–Present', demo: 'https://beatsync.zney295.id.vn/', desc_vie: 'Phát nhạc đồng bộ thời gian thực đa thiết bị với Next.js client & Bun WebSocket server.', desc_eng: 'Real-time multi-device audio sync using Next.js & Bun WebSocket. Audio on Cloudflare R2.', tech: ['Next.js', 'Bun', 'WebSocket', 'Cloudflare R2', 'Cloudflare Tunnels', 'Zustand'] },
  { title: 'Mandy Crimson — Logistics Label Generator', role: 'Frontend Developer', time: '2026', demo: 'https://zney295.id.vn/mandycrimson/', desc_vie: 'Công cụ web đọc Excel đơn hàng, xuất nhãn vận chuyển quốc tế.', desc_eng: 'Web tool parsing Excel orders, generating printable international shipping labels.', tech: ['React', 'TypeScript', 'Vite', 'xlsx'] },
];

// ==================== MAIN INTRO PAGE ====================
interface IntroPageProps {
  onEnterWorkspace: () => void;
  lang: 'vie' | 'eng';
  onToggleLang: () => void;
}

export function IntroPage({ onEnterWorkspace, lang, onToggleLang }: IntroPageProps) {
  const isVie = lang === 'vie';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return sessionStorage.getItem('zney_admin_unlocked') === 'true';
  });
  const [visitor, setVisitor] = useState<VisitorInfo | null>(null);

  useEffect(() => { fetchVisitorInfo().then(setVisitor); }, []);

  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);
  const page4Ref = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const navigateToPage = (pageIdx: number) => {
    setCurrentPageIndex(pageIdx);
    if (pageIdx === 0) page1Ref.current?.scrollIntoView({ behavior: 'smooth' });
    else if (pageIdx === 1) page2Ref.current?.scrollIntoView({ behavior: 'smooth' });
    else if (pageIdx === 2) page3Ref.current?.scrollIntoView({ behavior: 'smooth' });
    else if (pageIdx === 3) page4Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRunCommand = (cmd: string) => {
    if (cmd === 'admin') {
      window.history.pushState({ viewMode: 'admin' }, '', window.location.pathname + '?admin');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }
    
    if (showSplash) {
      if (['intro', 'portfolio', 'cvweb', 'cvmb'].includes(cmd)) {
        setShowSplash(false);
        setTimeout(() => {
          if (cmd === 'cvweb') navigateToPage(1);
          if (cmd === 'cvmb') navigateToPage(2);
        }, 50);
      } else if (cmd === 'workspace') {
        onEnterWorkspace();
      }
      return;
    }

    if (cmd === 'portfolio') heroRef.current?.scrollIntoView({ behavior: 'smooth' });
    else if (cmd === 'cvweb') navigateToPage(1);
    else if (cmd === 'cvmb') navigateToPage(2);
    else if (cmd === 'workspace') onEnterWorkspace();
  };

  const techCategories = [
    { title: 'Frontend & UI', items: ['React 18', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Vite'] },
    { title: 'Backend & Systems', items: ['Node.js', 'Express.js', 'Bun', 'Rust', 'WebSocket', 'Socket.IO', 'JWT'] },
    { title: 'Mobile', items: ['React Native', 'Expo', 'Cross-Platform Security'] },
    { title: 'Cloud & Database', items: ['AWS EC2/RDS', 'Cloudflare R2/Tunnels', 'MySQL', 'MongoDB', 'Nginx', 'PM2'] },
  ];

  return (
    <div className="w-screen overflow-y-auto" style={{ background: '#000000', fontFamily: "'Helvetica Neue', 'SF Pro Display', sans-serif", color: '#e6edf3', height: '100dvh' }}>
      <ZenSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;600;700&family=Caveat:wght@600;700&display=swap');
        .tag { display:inline-block; padding:2px 10px; border-radius:9999px; font-size:11px; letter-spacing:0.05em; text-transform:uppercase; font-weight:500; }
        .tag-blue   { background:rgba(56,130,246,0.15); color:#93b4e8; }
        .tag-green  { background:rgba(16,185,129,0.15); color:#6ee7b7; }
        .tag-yellow { background:rgba(245,158,11,0.15); color:#fcd34d; }
        .tag-purple { background:rgba(139,92,246,0.15); color:#c4b5fd; }
        .tag-red    { background:rgba(239,68,68,0.12);  color:#fca5a5; }
        .card { background:#0d1117; border:1px solid #21262d; border-radius:12px; padding:24px; transition:all 200ms ease; }
        .card:hover { border-color:#30363d; box-shadow:0 4px 20px rgba(0,0,0,0.5); }
        .lang-btn { background:transparent; border:1px solid #30363d; border-radius:5px; padding:6px 14px; font-size:11px; font-family:'JetBrains Mono',monospace; letter-spacing:0.06em; cursor:pointer; color:#8b949e; transition:border-color 200ms,color 200ms; }
        .lang-btn:hover { border-color:#e6edf3; color:#e6edf3; }
        .sites-btn { height:34px; padding:0 14px; background:rgba(255,255,255,0.06); border:1px solid #30363d; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; cursor:pointer; transition:all 180ms; color:#8b949e; font-size:12px; font-family:'JetBrains Mono',monospace; font-weight:600; }
        .sites-btn:hover { border-color:#8b949e; color:#e6edf3; }
        .social-pill { display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; background:#1E1E1E; border:1px solid #333333; border-radius:10px; color:#CCCCCC; text-decoration:none; transition:all 180ms; }
        .social-pill:hover { background:#2E2E2E; color:#FFFFFF; border-color:#555555; transform:translateY(-1px); }
        @keyframes zney-meteor {
          0%   { transform:translateY(-60px) translateX(-60px) rotate(36deg); opacity:0; }
          15%  { opacity:1; }
          85%  { opacity:1; }
          100% { transform:translateY(400px) translateX(400px) rotate(36deg); opacity:0; }
        }
        .horizontal-page-scroll::-webkit-scrollbar { display:none; }
        .horizontal-page-scroll { -ms-overflow-style:none; scrollbar-width:none; }
        @media (min-width: 768px) {
          .desktop-zoom { /* removed zoom: 1.2 to fix blurriness/lag */ }
        }
      `}</style>

      {showSplash ? (
        <div style={{ minWidth: '100%', width: '100%', height: '100dvh', overflowY: 'auto', background: '#000000' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', padding: '24px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setSidebarOpen(true)} className="sites-btn" title="Deployed Sites">
                <span style={{ fontSize: '14px' }}>‹</span><span>Sites</span>
              </button>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#484f58', letterSpacing: '0.06em' }}>psy-zney.github.io</span>
            </div>
            <button className="lang-btn" onClick={onToggleLang}>{isVie ? 'VIE → ENG' : 'ENG → VIE'}</button>
          </div>

          <div className="desktop-zoom" style={{ minHeight: 'calc(100dvh - 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px 24px 90px', maxWidth: '820px', margin: '0 auto' }}>
            <AITerminalWindow onRunCommand={handleRunCommand} isVie={isVie} />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px', justifyContent: 'center' }}>
              {[
                { label: '/intro', cmd: 'intro', c: 'rgba(255,255,255,0.12)', b: 'rgba(255,255,255,0.3)', t: '#ffffff' },
                { label: '/cvweb', cmd: 'cvweb', c: 'rgba(52,211,153,0.12)', b: 'rgba(52,211,153,0.3)', t: '#34d399' },
                { label: '/cvmb', cmd: 'cvmb', c: 'rgba(192,132,252,0.12)', b: 'rgba(192,132,252,0.3)', t: '#c084fc' },
                { label: '/projects', cmd: 'projects', c: 'rgba(251,146,60,0.12)', b: 'rgba(251,146,60,0.3)', t: '#fb923c' },
                { label: '/skills', cmd: 'skills', c: 'rgba(129,140,248,0.12)', b: 'rgba(129,140,248,0.3)', t: '#818cf8' },
                { label: '/workspace', cmd: 'workspace', c: 'rgba(244,114,182,0.12)', b: 'rgba(244,114,182,0.3)', t: '#f472b6' },
              ].map((item) => (
                <RectGlowButton
                  key={item.cmd}
                  onClick={() => handleRunCommand(item.cmd === 'intro' ? 'portfolio' : item.cmd)}
                  color={item.t}
                  style={{
                    background: item.c,
                    borderColor: item.b,
                    color: item.t,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </RectGlowButton>
              ))}
            </div>
          </div>
          <GlobalStickyBottomBar
            currentPageIndex={currentPageIndex}
            onNavigatePage={navigateToPage}
            onEnterWorkspace={onEnterWorkspace}
            isVie={isVie}
            isSplashMode={true}
            onBackToTerminal={() => setShowSplash(true)}
            theme={theme}
            onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            isAdminUnlocked={isAdminUnlocked}
          />
        </div>
      ) : (
        <>
          <GlobalStickyBottomBar
            currentPageIndex={currentPageIndex}
            onNavigatePage={navigateToPage}
            onEnterWorkspace={onEnterWorkspace}
            isVie={isVie}
            isSplashMode={false}
            onBackToTerminal={() => setShowSplash(true)}
            theme={theme}
            onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            isAdminUnlocked={isAdminUnlocked}
          />

          <div
            className={`horizontal-page-scroll ${theme === 'light' ? 'light-mode-invert' : ''}`}
            style={{
              width: '100%', height: '100dvh', overflowX: 'auto', overflowY: 'hidden', display: 'flex', flexDirection: 'row', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth',
              transition: 'filter 300ms ease'
            }}
            onScroll={(e) => {
              const el = e.currentTarget;
              const idx = Math.round(el.scrollLeft / el.clientWidth);
              if (idx !== currentPageIndex) setCurrentPageIndex(idx);
            }}
          >
            <div ref={page1Ref} style={{ minWidth: '100%', width: '100%', height: '100dvh', overflowY: 'auto', scrollSnapAlign: 'start', flexShrink: 0, background: '#000000' }}>
              <div style={{ maxWidth: '820px', margin: '0 auto', padding: '24px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => setSidebarOpen(true)} className="sites-btn" title="Deployed Sites">
                    <span style={{ fontSize: '14px' }}>‹</span><span>Sites</span>
                  </button>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#484f58', letterSpacing: '0.06em' }}>psy-zney.github.io</span>
                </div>
                <button className="lang-btn" onClick={onToggleLang}>{isVie ? 'VIE → ENG' : 'ENG → VIE'}</button>
              </div>

              <div ref={heroRef} style={{ maxWidth: '820px', margin: '0 auto', padding: '40px 24px 140px' }}>
                <div style={{ borderBottom: '1px solid #21262d', paddingBottom: '36px', marginBottom: '36px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap-reverse', gap: '32px' }}>
                  <div style={{ flex: '1 1 400px' }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#484f58', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>{isVie ? 'Giới thiệu • Trang 1 / 3' : 'Introduction • Page 1 / 3'}</p>
                    <p style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#6e7681', marginBottom: '6px' }}>{isVie ? 'Xin chào —' : 'Hi there —'}</p>
                    <h1 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(2.2rem,5.5vw,3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#e6edf3', marginBottom: '4px' }}>Lê Quang Khánh</h1>
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.5rem', fontWeight: 700, color: '#6e7681', marginBottom: '18px' }}>— zney</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      <span className="tag tag-blue">Full Stack Web &amp; Mobile Developer</span>
                      <span className="tag tag-green">{isVie ? '🟢 Sinh viên IT · UEH TP.HCM' : '🟢 IT Student · UEH Ho Chi Minh City'}</span>
                      <span className="tag tag-purple">{isVie ? 'Bảo mật & Real-time Systems' : 'Security & Real-time Systems'}</span>
                    </div>
                    <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#8b949e', maxWidth: '600px' }}>
                      {isVie
                        ? <> Sinh viên IT tại UEH TP.HCM. Đam mê phát triển Web & Mobile toàn diện với mục tiêu xây dựng phần mềm <strong style={{ color: '#c9d1d9', fontWeight: 600 }}>hiệu quả và thực dụng</strong>.</>
                        : <> IT student at UEH Ho Chi Minh City. Building full-stack web & mobile apps focused on delivering software that <strong style={{ color: '#c9d1d9', fontWeight: 600 }}>actually works well</strong>.</>
                      }
                    </p>
                  </div>
                  <div style={{ flexShrink: 0, marginTop: '20px' }}>
                    <img 
                      src="./social/AVT.jpg" 
                      alt="Avatar" 
                      style={{ 
                        width: 'clamp(140px, 15vw, 180px)', 
                        height: 'clamp(140px, 15vw, 180px)', 
                        borderRadius: '24px', 
                        objectFit: 'cover', 
                        border: '1px solid #30363d', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        transition: 'transform 300ms ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '40px' }}>
                  {[
                    { label: isVie ? 'Dự án' : 'Projects', val: '4+', color: '#38bdf8' },
                    { label: isVie ? 'Ngôn ngữ' : 'Languages', val: '8+', color: '#34d399' },
                    { label: isVie ? 'Trường' : 'University', val: 'UEH', color: '#c084fc' },
                    { label: isVie ? 'Cloud' : 'Cloud Infra', val: 'AWS/CF', color: '#fb923c' },
                  ].map((m, i) => (
                    <div key={i} className="card" style={{ padding: '16px 20px' }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '20px', fontWeight: 700, color: m.color, display: 'block', marginBottom: '2px' }}>{m.val}</span>
                      <span style={{ fontSize: '12px', color: '#6e7681' }}>{m.label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#484f58', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>{isVie ? 'Dự án Tiêu biểu' : 'Featured Projects'}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
                    {FEATURED_PROJECTS.map((proj, idx) => (
                      <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                            <span className="tag tag-blue" style={{ fontSize: '10px' }}>{proj.time}</span>
                            <a href={proj.demo} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#4e7dbc', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              Live <ExternalLink size={10} />
                            </a>
                          </div>
                          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#e6edf3', marginBottom: '4px', lineHeight: 1.35 }}>{proj.title}</h3>
                          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#6e7681', marginBottom: '10px' }}>{proj.role}</p>
                          <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.65, marginBottom: '14px' }}>{isVie ? proj.desc_vie : proj.desc_eng}</p>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', paddingTop: '10px', borderTop: '1px solid #21262d' }}>
                          {proj.tech.map((t, ti) => (
                            <kbd key={ti} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', padding: '2px 7px', border: '1px solid #30363d', borderRadius: '4px', background: '#161b22', color: '#8b949e' }}>{t}</kbd>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div style={{ marginBottom: '40px' }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#484f58', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>{isVie ? 'Ma trận Công nghệ' : 'Tech Stack Matrix'}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                    {techCategories.map((cat, ci) => (
                      <div key={ci} className="card">
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#c9d1d9', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>• {cat.title}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {cat.items.map((item, ii) => (
                            <kbd key={ii} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', padding: '3px 9px', border: '1px solid #30363d', borderRadius: '4px', background: '#161b22', color: '#8b949e' }}>{item}</kbd>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target role */}
                <div style={{ borderTop: '1px solid #21262d', borderBottom: '1px solid #21262d', padding: '18px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="tag tag-yellow">{isVie ? 'Vị trí mong muốn' : 'Target Role'}</span>
                    <span style={{ fontSize: '13px', color: '#c9d1d9', fontWeight: 600 }}>Full Stack Web &amp; Mobile Developer Intern</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="tag tag-red">{isVie ? 'Trường' : 'University'}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#6e7681' }}>UEH — Ho Chi Minh City (GPA: 2.9)</span>
                  </div>
                </div>

              </div>
            </div>

            {/* ===== PANEL 2: Web CV ===== */}
            <div ref={page2Ref} style={{ minWidth: '100%', width: '100%', height: '100dvh', overflowY: 'auto', scrollSnapAlign: 'start', flexShrink: 0, background: '#000000' }}>
              <MarkdownCVPage filePath="./file/Le_Quang_Khanh_CV_Web_FullStack.md" badgeTitle="FULL-STACK WEB DEVELOPER CV" fileName="Le_Quang_Khanh_CV_Web_FullStack.md" isVie={isVie} />
            </div>

            {/* ===== PANEL 3: Mobile CV ===== */}
            <div ref={page3Ref} style={{ minWidth: '100%', width: '100%', height: '100dvh', overflowY: 'auto', scrollSnapAlign: 'start', flexShrink: 0, background: '#000000' }}>
              <MarkdownCVPage filePath="./file/Le_Quang_Khanh_CV_Mobile.md" badgeTitle="MOBILE DEVELOPER CV" fileName="Le_Quang_Khanh_CV_Mobile.md" isVie={isVie} />
            </div>

            {/* ===== PANEL 4: System Console Dashboard ===== */}
            {isAdminUnlocked && (
              <div ref={page4Ref} style={{ minWidth: '100%', width: '100%', height: '100dvh', overflowY: 'auto', scrollSnapAlign: 'start', flexShrink: 0, background: '#000000' }}>
                <AdminTelemetryPage
                  visitor={visitor}
                  isVie={isVie}
                  onLockAdmin={() => {
                    sessionStorage.removeItem('zney_admin_unlocked');
                    setIsAdminUnlocked(false);
                    navigateToPage(0);
                  }}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
