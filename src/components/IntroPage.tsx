import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  CreditCard,
  BookOpen,
  X,
  ExternalLink,
  Download,
  Github,
  Mail,
  Share2,
  CheckCircle2,
  Star,
  GitFork,
  Code2,
  UserCheck,
  Volume2,
  VolumeX,
  Facebook,
  MessageCircle,
  Terminal as TerminalIcon,
  Sparkles,
  Smartphone,
  Globe
} from 'lucide-react';

// ==================== ZEN SIDEBAR (MINIMALIST EDITORIAL) ====================

const DEPLOYED_SITES = [
  {
    label: 'Main Portfolio',
    url: 'http://zney295.id.vn/',
    sub: 'zney295.id.vn',
    color: '#3882F6',
  },
  {
    label: 'Study Hub',
    url: 'https://study.zney295.id.vn/',
    sub: 'study.zney295.id.vn',
    color: '#10B981',
  },
  {
    label: 'BeatSync',
    url: 'https://beatsync.zney295.id.vn/',
    sub: 'beatsync.zney295.id.vn',
    color: '#F97316',
  },
  {
    label: 'Security',
    url: 'https://zney295.id.vn/Security/',
    sub: 'zney295.id.vn/Security',
    color: '#8B5CF6',
  },
  {
    label: 'Mandy Crimson',
    url: 'https://zney295.id.vn/mandycrimson/',
    sub: 'zney295.id.vn/mandycrimson',
    color: '#EC4899',
  },
];

function ZenSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100dvh',
        zIndex: 50,
        display: 'flex',
        pointerEvents: 'none',
      }}
    >
      {/* Backdrop dimmer */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            background: 'rgba(0,0,0,0.15)',
            backdropFilter: 'blur(2px)',
            pointerEvents: 'all',
          }}
        />
      )}

      {/* Sidebar panel */}
      <div
        style={{
          position: 'relative',
          zIndex: 50,
          width: '240px',
          height: '100%',
          background: '#FFFFFF',
          borderRight: '1px solid #EAEAEA',
          borderRadius: '0 24px 24px 0',
          boxShadow: open ? '6px 0 30px rgba(0,0,0,0.08)' : 'none',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: open ? 'all' : 'none',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 0',
          overflowY: 'auto',
        }}
      >
        <div style={{ padding: '0 20px 16px', borderBottom: '1px solid #EAEAEA', marginBottom: '12px' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#787774', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
            Deployed Sites
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 12px' }}>
          {DEPLOYED_SITES.map((site, i) => (
            <a
              key={i}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                textDecoration: 'none',
                background: '#F9F8F6',
                border: '1px solid #EAEAEA',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                transition: 'all 200ms cubic-bezier(0.16,1,0.3,1)',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = '#111111';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.06)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#F9F8F6';
                e.currentTarget.style.borderColor = '#EAEAEA';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{
                width: '30px',
                height: '30px',
                borderRadius: '10px',
                background: site.color + '15',
                border: `1px solid ${site.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: site.color }} />
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: '13px', fontWeight: 600, color: '#111111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {site.label}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#787774', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {site.sub}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== SIMPLE MARKDOWN RENDERER ====================

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
            <a key={idx} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline font-semibold">
              {match[1]}
            </a>
          );
        }
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={idx} className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-1.5 py-0.5 rounded font-mono text-xs font-semibold border border-slate-300/50">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-[#111111] dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const flushTable = (key: string) => {
    if (!inTable) return;
    elements.push(
      <div key={key} className="my-6 overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#15171e] shadow-sm">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100 dark:bg-[#1a1d26] border-b border-slate-200 dark:border-slate-800">
              {tableHeaders.map((h, i) => (
                <th key={i} className="p-3 font-bold text-[#111111] dark:text-white">{renderFormattedText(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, ri) => (
              <tr key={ri} className="border-b border-slate-200 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-[#1c202a]">
                {row.map((cell, ci) => (
                  <td key={ci} className="p-3 text-slate-800 dark:text-slate-200 font-mono leading-relaxed">{renderFormattedText(cell)}</td>
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
      const cells = trimmed.split('|').slice(1, -1).map(c => c.trim());
      if (cells.every(c => c.match(/^:?-+:?$/))) {
        return;
      }
      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      return;
    } else if (inTable) {
      flushTable(`table-${idx}`);
    }

    if (trimmed === '---') {
      elements.push(<hr key={idx} className="my-6 border-t border-slate-200 dark:border-slate-800" />);
      return;
    }

    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={idx} className="text-3xl sm:text-4xl font-extrabold text-[#111111] dark:text-white tracking-tight mb-2 font-serif">
          {renderFormattedText(trimmed.slice(2))}
        </h1>
      );
      return;
    }

    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={idx} className="text-lg sm:text-xl font-bold text-sky-600 dark:text-sky-400 tracking-wide mt-5 mb-2">
          {renderFormattedText(trimmed.slice(4))}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={idx} className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-8 mb-3 font-semibold pb-1 border-b border-slate-200 dark:border-slate-800">
          {renderFormattedText(trimmed.slice(3))}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith('- ')) {
      elements.push(
        <li key={idx} className="ml-5 list-disc text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
          {renderFormattedText(trimmed.slice(2))}
        </li>
      );
      return;
    }

    if (trimmed.length > 0) {
      elements.push(
        <p key={idx} className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed mb-3">
          {renderFormattedText(trimmed)}
        </p>
      );
    }
  });

  if (inTable) {
    flushTable('table-end');
  }

  return <div className="space-y-1">{elements}</div>;
}

// ==================== MACOS TERMINAL WINDOW COMPONENT ====================

function MacTerminalWindow({
  onRunCommand,
  isVie,
}: {
  onRunCommand: (cmd: string) => void;
  isVie: boolean;
}) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'system'; text: string }>>([
    {
      type: 'system',
      text: isVie
        ? 'Khởi tạo zney CLI v2.0 (macOS arm64). Nhập lệnh hoặc bấm nút lệnh nhanh bên dưới:'
        : 'Initialized zney CLI v2.0 (macOS arm64). Type a command or click buttons below:'
    },
    {
      type: 'system',
      text: 'Các lệnh khả dụng: portfolio | cvweb | cvmb | workspace | help | clear'
    }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleExecute = (cmdToRun?: string) => {
    const rawCmd = (cmdToRun !== undefined ? cmdToRun : inputVal).trim();
    if (!rawCmd) return;

    const lower = rawCmd.toLowerCase();
    const newHistory = [...history, { type: 'input' as const, text: `$ ${rawCmd}` }];

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'help' || lower === 'ls') {
      newHistory.push({
        type: 'output' as const,
        text: 'Danh sách lệnh:\n - portfolio  : Xem trang Giới thiệu chính (Page 1)\n - cvweb      : Xem CV Full-Stack Web Developer (.md) (Page 2)\n - cvmb       : Xem CV Mobile Developer (.md) (Page 3)\n - workspace  : Vào Không Gian 3D Workspace\n - clear      : Xóa lịch sử màn hình terminal'
      });
    } else if (['portfolio', 'intro', 'p1'].includes(lower)) {
      newHistory.push({ type: 'output' as const, text: '→ Chuyển đến Trang Giới thiệu Portfolio (Page 1)...' });
      onRunCommand('portfolio');
    } else if (['cvweb', 'web', 'p2'].includes(lower)) {
      newHistory.push({ type: 'output' as const, text: '→ Mở file Markdown CV Full-Stack Web Developer (Page 2)...' });
      onRunCommand('cvweb');
    } else if (['cvmb', 'mobile', 'p3'].includes(lower)) {
      newHistory.push({ type: 'output' as const, text: '→ Mở file Markdown CV Mobile Developer (Page 3)...' });
      onRunCommand('cvmb');
    } else if (['workspace', '3d', 'room'].includes(lower)) {
      newHistory.push({ type: 'output' as const, text: '→ Khởi chạy Không gian 3D Workspace...' });
      onRunCommand('workspace');
    } else {
      newHistory.push({
        type: 'output' as const,
        text: `zsh: command not found: ${rawCmd}. Type 'help' for available commands.`
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="relative overflow-hidden bg-[#0c1017] border border-[#21262d] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] font-mono text-slate-200 w-full mb-8">
      {/* macOS Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#21262d] select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
        </div>
        <span className="text-xs font-semibold text-slate-400 tracking-wide flex items-center gap-1.5">
          <TerminalIcon size={13} className="text-sky-400" />
          <span>zney@macbook-pro: ~ (zsh)</span>
        </span>
        <span className="text-[10px] text-slate-500 font-mono">CLI v2.0</span>
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 sm:p-5 text-xs sm:text-sm space-y-2 max-h-[300px] overflow-y-auto font-mono leading-relaxed">
        {history.map((h, i) => (
          <div key={i} className={h.type === 'input' ? 'text-sky-400 font-semibold' : h.type === 'system' ? 'text-slate-400' : 'text-emerald-400'}>
            <pre className="whitespace-pre-wrap font-mono m-0">{h.text}</pre>
          </div>
        ))}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleExecute();
          }}
          className="flex items-center gap-2 pt-2 text-sky-400 font-semibold"
        >
          <span className="text-emerald-400 select-none">zney@portfolio:~$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="nhập lệnh: portfolio | cvweb | cvmb | workspace"
            className="flex-1 bg-transparent border-none outline-none text-sky-300 placeholder-slate-600 font-mono text-xs sm:text-sm"
          />
        </form>
        <div ref={bottomRef} />
      </div>

      {/* Quick Command Pills */}
      <div className="flex items-center gap-2 p-3 bg-[#161b22]/80 border-t border-[#21262d] flex-wrap">
        <span className="text-[11px] text-slate-400 font-mono mr-1">Lệnh nhanh:</span>
        {[
          { label: 'portfolio', cmd: 'portfolio', color: 'bg-sky-500/10 text-sky-400 border-sky-500/30 hover:bg-sky-500/20' },
          { label: 'cvweb', cmd: 'cvweb', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' },
          { label: 'cvmb', cmd: 'cvmb', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20' },
          { label: 'workspace', cmd: 'workspace', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20' },
        ].map((item) => (
          <button
            key={item.cmd}
            type="button"
            onClick={() => handleExecute(item.cmd)}
            className={`px-3 py-1 rounded-lg border text-xs font-mono font-semibold transition cursor-pointer ${item.color}`}
          >
            $ {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ==================== MARKDOWN CV PAGE COMPONENT ====================

function MarkdownCVPage({
  filePath,
  badgeTitle,
  fileName,
  isVie
}: {
  filePath: string;
  badgeTitle: string;
  fileName: string;
  isVie: boolean;
}) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(filePath)
      .then((res) => res.text())
      .then((data) => {
        if (active) {
          setContent(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setContent('# Error loading file\nCould not load markdown document.');
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [filePath]);

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '36px 24px 140px', fontFamily: "'Helvetica Neue', sans-serif", color: '#111111' }}>
      {/* Header bar with badge & download */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #EAEAEA', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", background: '#111111', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>
            {badgeTitle}
          </span>
          <span style={{ fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", color: '#787774' }}>
            public/file/{fileName}
          </span>
        </div>
        <a
          href={filePath}
          download={fileName}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#111111',
            color: '#FFFFFF',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Download size={14} />
          <span>{isVie ? 'Tải File Markdown' : 'Download .md'}</span>
        </a>
      </div>

      {/* Styled Document Paper */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EAEAEA',
        borderRadius: '16px',
        padding: '40px 44px',
        boxShadow: '0 12px 36px rgba(0,0,0,0.06)'
      }}>
        {loading ? (
          <div className="py-20 text-center font-mono text-slate-400 text-sm">
            [ Loading {fileName}... ]
          </div>
        ) : (
          <SimpleMarkdownRenderer content={content} />
        )}
      </div>
    </div>
  );
}

// ==================== GLOBAL STICKY BOTTOM TOOLBAR (COMBINED CONTACT + WORKSPACE) ====================

function GlobalStickyBottomBar({
  currentPageIndex,
  onNavigatePage,
  onEnterWorkspace,
  isVie,
}: {
  currentPageIndex: number;
  onNavigatePage: (pageIdx: number) => void;
  onEnterWorkspace: () => void;
  isVie: boolean;
}) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: 'min(920px, calc(100vw - 28px))',
        background: '#111111',
        border: '1px solid #2B2B2B',
        borderRadius: '20px',
        padding: '10px 18px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.65)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}
    >
      {/* LEFT: Social Contacts */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <a href="https://github.com/psy-zney" target="_blank" rel="noopener noreferrer" className="social-pill" title="GitHub">
          <Github size={15} />
        </a>
        <a href="https://www.facebook.com/psyotic.zney/" target="_blank" rel="noopener noreferrer" className="social-pill" title="Facebook">
          <Facebook size={15} />
        </a>
        <a href="https://www.linkedin.com/in/psy-zney295" target="_blank" rel="noopener noreferrer" className="social-pill" title="LinkedIn">
          <Share2 size={15} />
        </a>
        <a href="mailto:lequangkhanh295@gmail.com" className="social-pill" title="Email">
          <Mail size={15} />
        </a>
        <a href="https://zalo.me/0394426827" target="_blank" rel="noopener noreferrer" className="social-pill" title="Zalo">
          <MessageCircle size={15} />
        </a>
      </div>

      {/* CENTER: Page Navigator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
        <button
          onClick={() => onNavigatePage((currentPageIndex + 2) % 3)}
          title={isVie ? 'Trang trước' : 'Prev Page'}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '9999px',
            background: '#242424',
            color: '#FFFFFF',
            border: '1px solid #3A3A3A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 800
          }}
        >
          &lt;
        </button>

        <span style={{ color: '#FFFFFF', fontWeight: 600, padding: '4px 10px', borderRadius: '8px', background: '#1C1C1C', border: '1px solid #333' }}>
          {currentPageIndex === 0 && (isVie ? 'Trang 1 / 3 • Intro' : 'Page 1 / 3 • Intro')}
          {currentPageIndex === 1 && (isVie ? 'Trang 2 / 3 • CV Web (.md)' : 'Page 2 / 3 • CV Web')}
          {currentPageIndex === 2 && (isVie ? 'Trang 3 / 3 • CV Mobile (.md)' : 'Page 3 / 3 • CV Mobile')}
        </span>

        <button
          onClick={() => onNavigatePage((currentPageIndex + 1) % 3)}
          title={isVie ? 'Trang tiếp' : 'Next Page'}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '9999px',
            background: '#242424',
            color: '#FFFFFF',
            border: '1px solid #3A3A3A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 800
          }}
        >
          &gt;
        </button>
      </div>

      {/* RIGHT: Join 3D Workspace CTA */}
      <button
        onClick={onEnterWorkspace}
        style={{
          background: '#FFFFFF',
          color: '#111111',
          border: 'none',
          borderRadius: '12px',
          padding: '8px 18px',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 180ms ease'
        }}
      >
        <span>{isVie ? 'Vào Workspace 3D' : 'View 3D Workspace'}</span>
        <span>→</span>
      </button>
    </div>
  );
}

// ==================== MAIN INTRO PAGE ====================

interface IntroPageProps {
  onEnterWorkspace: () => void;
  lang: 'vie' | 'eng';
  onToggleLang: () => void;
}

export function IntroPage({ onEnterWorkspace, lang, onToggleLang }: IntroPageProps) {
  const isVie = lang === 'vie';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);

  const navigateToPage = (pageIdx: number) => {
    setCurrentPageIndex(pageIdx);
    if (pageIdx === 0) page1Ref.current?.scrollIntoView({ behavior: 'smooth' });
    else if (pageIdx === 1) page2Ref.current?.scrollIntoView({ behavior: 'smooth' });
    else if (pageIdx === 2) page3Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRunCommand = (cmd: string) => {
    if (cmd === 'portfolio') navigateToPage(0);
    else if (cmd === 'cvweb') navigateToPage(1);
    else if (cmd === 'cvmb') navigateToPage(2);
    else if (cmd === 'workspace') onEnterWorkspace();
  };

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('[data-reveal]');
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    items.forEach((el, i) => {
      const target = el as HTMLElement;
      target.style.opacity = '0';
      target.style.transform = 'translateY(12px)';
      target.style.transition = `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`;
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, [lang]);

  const coreTech = isVie
    ? ['OOP (Lập trình hướng đối tượng)', 'DSA (Cấu trúc dữ liệu & Giải thuật)', 'Git / Version Control', 'SQL & Relational DBs', 'System Architecture']
    : ['OOP (Object-Oriented Programming)', 'DSA (Data Structures & Algorithms)', 'Git / Version Control', 'SQL & Relational DBs', 'System Architecture'];

  const langs = ['C#', 'Rust', 'Python', 'Java', 'JavaScript', 'TypeScript', 'React', 'React Native', 'Node.js'];

  return (
    <div
      className="w-screen overflow-y-auto"
      style={{
        background: '#FBFBFA',
        fontFamily: "'Helvetica Neue', 'SF Pro Display', 'Switzer', sans-serif",
        color: '#111111',
        height: '100dvh',
      }}
    >
      <ZenSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;600;700&family=Caveat:wght@600;700&display=swap');
        .tag { display:inline-block; padding:2px 10px; border-radius:9999px; font-size:11px; letter-spacing:0.05em; text-transform:uppercase; font-weight:500; }
        .tag-blue { background:#E1F3FE; color:#1F6C9F; }
        .tag-green { background:#EDF3EC; color:#346538; }
        .tag-yellow { background:#FBF3DB; color:#956400; }
        .tag-red { background:#FDEBEC; color:#9F2F2D; }
        .card { background:#FFFFFF; border:1px solid #EAEAEA; border-radius:12px; padding:24px; }
        .card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.04); transition: box-shadow 200ms; }
        .cta-btn { background:#111111; color:#ffffff; border:none; border-radius:5px; padding:14px 32px; font-size:14px; font-weight:600; letter-spacing:0.02em; cursor:pointer; transition: background 200ms, transform 100ms; display:inline-flex; align-items:center; gap:10px; }
        .cta-btn:hover { background:#333333; }
        .cta-btn:active { transform:scale(0.98); }
        .lang-btn { background:transparent; border:1px solid #EAEAEA; border-radius:5px; padding:6px 14px; font-size:11px; font-family:'JetBrains Mono',monospace; letter-spacing:0.06em; cursor:pointer; color:#787774; transition:border-color 200ms,color 200ms; }
        .lang-btn:hover { border-color:#111111; color:#111111; }
        .sites-btn { height: 34px; padding: 0 14px; background: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 9999px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; transition: border-color 180ms, color 180ms, box-shadow 180ms; box-shadow: 0 2px 8px rgba(0,0,0,0.04); color: #787774; font-size: 12px; font-family: 'JetBrains Mono', monospace; font-weight: 600; }
        .sites-btn:hover { border-color: #111111; color: #111111; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .social-pill { display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; background:#1E1E1E; border:1px solid #333333; border-radius:10px; color:#CCCCCC; text-decoration:none; transition:all 180ms; }
        .social-pill:hover { background:#2E2E2E; color:#FFFFFF; border-color:#555555; transform:translateY(-1px); }
        .horizontal-page-scroll::-webkit-scrollbar { display: none; }
        .horizontal-page-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 640px) {
          .page-shell { max-width: 100% !important; padding: 24px 14px 190px !important; }
          .bento-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .card { padding: 20px !important; border-radius: 10px !important; }
        }
      `}</style>

      {/* Global Unified Fixed Bottom Bar (Contact + Navigation + Join Workspace) */}
      <GlobalStickyBottomBar
        currentPageIndex={currentPageIndex}
        onNavigatePage={navigateToPage}
        onEnterWorkspace={onEnterWorkspace}
        isVie={isVie}
      />

      {/* Native Horizontal Scroll Container - 3 Pages */}
      <div
        className="horizontal-page-scroll"
        style={{
          width: '100%',
          height: '100dvh',
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
        }}
        onScroll={(e) => {
          const el = e.currentTarget;
          const idx = Math.round(el.scrollLeft / el.clientWidth);
          if (idx !== currentPageIndex) {
            setCurrentPageIndex(idx);
          }
        }}
      >
        {/* Panel 1: Main Introduction + macOS Terminal Window */}
        <div
          ref={page1Ref}
          style={{
            minWidth: '100%',
            width: '100%',
            height: '100dvh',
            overflowY: 'auto',
            scrollSnapAlign: 'start',
            flexShrink: 0,
          }}
        >
          <div
            ref={containerRef}
            className="page-shell"
            style={{ position: 'relative', zIndex: 1, maxWidth: '780px', margin: '0 auto', padding: '40px 24px 140px' }}
          >
            {/* Top bar */}
            <div data-reveal style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="sites-btn"
                  title="Deployed Sites"
                >
                  <span style={{ fontSize: '14px', lineHeight: 1 }}>‹</span>
                  <span>Sites</span>
                </button>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#787774', letterSpacing: '0.06em' }}>
                  psy-zney.github.io
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button className="lang-btn" onClick={onToggleLang}>
                  {isVie ? 'VIE → ENG' : 'ENG → VIE'}
                </button>
              </div>
            </div>

            {/* macOS Interactive Terminal Frame */}
            <div data-reveal>
              <MacTerminalWindow onRunCommand={handleRunCommand} isVie={isVie} />
            </div>

            {/* Hero Section */}
            <div data-reveal style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '40px', marginBottom: '40px' }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#787774', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {isVie ? 'Giới thiệu • Trang 1 / 3' : 'Introduction • Page 1 / 3'}
              </p>

              <p style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#787774', marginBottom: '8px' }}>
                {isVie ? 'Xin chào —' : 'Hi there —'}
              </p>

              <h1 style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#111111',
                marginBottom: '4px',
              }}>
                Lê Quang Khánh
              </h1>

              <p style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#787774',
                letterSpacing: '0.01em',
                marginBottom: '20px',
              }}>
                — zney
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                <span className="tag tag-blue">Full Stack Developer</span>
                <span className="tag tag-green">{isVie ? 'Sinh viên UEH · Ngành IT' : 'UEH Student · IT Major'}</span>
              </div>

              <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#2F3437', maxWidth: '580px' }}>
                {isVie
                  ? <>Mình là sinh viên ngành IT, xây dựng ứng dụng web & mobile với mong muốn sản phẩm không chỉ chạy tốt mà còn <strong style={{ color: '#111', fontWeight: 600 }}>được mọi người thực sự sử dụng</strong>.</>
                  : <>An IT student building web & mobile applications with a simple goal: ship software that people actually <strong style={{ color: '#111', fontWeight: 600 }}>find useful</strong>.</>
                }
              </p>
            </div>

            {/* Bento Grid */}
            <div data-reveal className="bento-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
              <div className="card">
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#787774', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>
                  {isVie ? 'Nền tảng & Kỹ thuật' : 'Core Concepts'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {coreTech.map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#EAEAEA', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: '#2F3437', lineHeight: 1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#787774', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>
                  {isVie ? 'Ngôn ngữ & Frameworks' : 'Languages & Frameworks'}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {langs.map((l, i) => (
                    <kbd key={i} style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px',
                      padding: '3px 8px',
                      border: '1px solid #EAEAEA',
                      borderRadius: '4px',
                      background: '#F7F6F3',
                      color: '#2F3437',
                    }}>
                      {l}
                    </kbd>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Role & University */}
            <div data-reveal style={{ borderTop: '1px solid #EAEAEA', borderBottom: '1px solid #EAEAEA', padding: '18px 0', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="tag tag-yellow">{isVie ? 'Vị trí mong muốn' : 'Target Role'}</span>
                <span style={{ fontSize: '13px', color: '#2F3437', fontWeight: 600 }}>Full Stack Developer</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="tag tag-red">{isVie ? 'Trường' : 'University'}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#787774' }}>UEH — Ho Chi Minh City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Full-Stack Web Developer CV (.md) */}
        <div
          ref={page2Ref}
          style={{
            minWidth: '100%',
            width: '100%',
            height: '100dvh',
            overflowY: 'auto',
            scrollSnapAlign: 'start',
            flexShrink: 0,
          }}
        >
          <MarkdownCVPage
            filePath="./file/Le_Quang_Khanh_CV_Web_FullStack.md"
            badgeTitle="FULL-STACK WEB DEVELOPER CV"
            fileName="Le_Quang_Khanh_CV_Web_FullStack.md"
            isVie={isVie}
          />
        </div>

        {/* Panel 3: Mobile Developer CV (.md) */}
        <div
          ref={page3Ref}
          style={{
            minWidth: '100%',
            width: '100%',
            height: '100dvh',
            overflowY: 'auto',
            scrollSnapAlign: 'start',
            flexShrink: 0,
          }}
        >
          <MarkdownCVPage
            filePath="./file/Le_Quang_Khanh_CV_Mobile.md"
            badgeTitle="MOBILE DEVELOPER CV"
            fileName="Le_Quang_Khanh_CV_Mobile.md"
            isVie={isVie}
          />
        </div>
      </div>
    </div>
  );
}
