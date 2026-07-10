import React, { useState, useEffect, useRef } from 'react';

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
      {/* Backdrop dimmer — only visible when open */}
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

      {/* Sidebar panel — minimalist bone/white theme matching IntroPage */}
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
        {/* Header */}
        <div style={{ padding: '0 20px 16px', borderBottom: '1px solid #EAEAEA', marginBottom: '12px' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#787774', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
            Deployed Sites
          </p>
        </div>

        {/* Site list — rounded web bars */}
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
              {/* Color favicon dot */}
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
              {/* Labels */}
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

function IntroReadmePage({
  onPrevPage,
  onFirstPage,
  isVie,
}: {
  onPrevPage: () => void;
  onFirstPage: () => void;
  isVie: boolean;
}) {
  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '40px 24px 130px', fontFamily: "'Helvetica Neue', 'SF Pro Display', 'Switzer', sans-serif", color: '#111111' }}>
      {/* Top Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid #EAEAEA', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", color: '#787774' }}>
          {isVie ? 'Trang 3 / 3 • Bách khoa README.md' : 'Page 3 / 3 • README.md Documentation'}
        </span>
      </div>

      {/* Editorial Document Paper */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EAEAEA',
        borderRadius: '12px',
        padding: '44px 48px',
        boxShadow: '0 12px 36px rgba(0,0,0,0.06)'
      }}>
        <div style={{ borderBottom: '2px solid #111111', paddingBottom: '24px', marginBottom: '32px' }}>
          <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#787774', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            REPOSITORY ENCYCLOPEDIA • DOCUMENTATION SCAN
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '8px 0 8px', letterSpacing: '-0.02em', color: '#111111' }}>
            🚀 @psy-zney — Interactive Cyberpunk 3D Creator Portfolio
          </h1>
          <p style={{ fontSize: '15px', color: '#444444', fontWeight: 500, margin: 0, lineHeight: 1.6 }}>
            An agency-grade, highly interactive Cyberpunk 3D Creator Portfolio combining a cinematic Three.js workspace, tactile desktop interactions, bilingual content, custom audio, and a polished arcade-inspired overlay experience.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '18px' }}>
            {['React 18.3', 'TypeScript 5.5', 'Vite 5.4', 'Tailwind CSS 3.4', 'Three.js / WebGL', 'Web Audio API'].map((t) => (
              <span key={t} style={{ background: '#111111', color: '#FFFFFF', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Section 1: Architecture & Direction */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '13px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', color: '#787774', marginBottom: '14px' }}>
            {isVie ? '01. Kiến trúc Trải nghiệm (Experience Direction)' : '01. Experience Direction'}
          </h2>
          <div style={{ background: '#FBFBFA', border: '1px solid #EAEAEA', borderRadius: '8px', padding: '18px 20px', fontSize: '14px', lineHeight: 1.7, color: '#333333' }}>
            <p style={{ margin: '0 0 10px' }}>
              The portfolio runs as a hybrid experience: a real-time WebGL workspace powered by <code>main.glb</code>, supported by carefully scoped DOM overlays for high-fidelity UI moments.
            </p>
            <ul style={{ margin: 0, paddingLeft: '18px' }}>
              <li><strong>3D Workspace Foundation:</strong> Loaded from <code>public/main.glb</code> via React Three Fiber & Drei.</li>
              <li><strong>Animated Monitor Screen:</strong> In-model computer screen uses <code>public/screenDesktop.gif</code> as an animated WebGL canvas texture.</li>
              <li><strong>Game-Style Interactions:</strong> Raycasting, hover targets, and <code>OutlinePass</code> provide neon outlines for interactive objects.</li>
            </ul>
          </div>
        </div>

        {/* Section 2: Key Features */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '13px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', color: '#787774', marginBottom: '14px' }}>
            {isVie ? '02. Các Hệ thống Nổi bật (Key Systems & Features)' : '02. Key Systems & Features'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ border: '1px solid #EAEAEA', borderRadius: '8px', padding: '16px 18px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111111', marginBottom: '6px' }}>⌨️ Arcade Desktop & Mech Keyboard</div>
              <p style={{ fontSize: '13px', color: '#555555', margin: 0, lineHeight: 1.6 }}>
                Tactile pixel-game desktop interface featuring live mechanical keyboard simulation, cat paw typing animations, and precise shortcut handling (Ctrl/Cmd+A, V).
              </p>
            </div>

            <div style={{ border: '1px solid #EAEAEA', borderRadius: '8px', padding: '16px 18px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111111', marginBottom: '6px' }}>🌈 Mechanical Keyboard LED & Audio Pack</div>
              <p style={{ fontSize: '13px', color: '#555555', margin: 0, lineHeight: 1.6 }}>
                Dynamic RGB Wave/Press/Ripple LED propagation paired with CherryMX Black PBT Web Audio scan-code audio synthesis.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Technology Stack Table */}
        <div>
          <h2 style={{ fontSize: '13px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', color: '#787774', marginBottom: '14px' }}>
            {isVie ? '03. Bảng Công nghệ (Technology Stack)' : '03. Technology Stack'}
          </h2>
          <div style={{ border: '1px solid #EAEAEA', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #EAEAEA', background: '#FBFBFA' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 700, width: '38%' }}>Core Framework</th>
                  <td style={{ padding: '10px 14px', fontFamily: "'JetBrains Mono', monospace" }}>React 18.3 + TypeScript 5.5</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #EAEAEA' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>Build & Bundler</th>
                  <td style={{ padding: '10px 14px', fontFamily: "'JetBrains Mono', monospace" }}>Vite 5.4</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #EAEAEA', background: '#FBFBFA' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>3D & WebGL Engine</th>
                  <td style={{ padding: '10px 14px', fontFamily: "'JetBrains Mono', monospace" }}>Three.js + React Three Fiber / Drei</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #EAEAEA' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>Post-Processing & Sound</th>
                  <td style={{ padding: '10px 14px', fontFamily: "'JetBrains Mono', monospace" }}>EffectComposer, OutlinePass, Web Audio API</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Centered Page Navigation Icon "<" */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '48px' }}>
          <button
            onClick={onPrevPage}
            title={isVie ? 'Trang trước (CV Scan)' : 'Prev Page (CV Scan)'}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '9999px',
              background: '#FFFFFF',
              color: '#111111',
              border: '1.5px solid #111111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              fontSize: '20px',
              fontWeight: 700,
            }}
          >
            <span>&lt;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function IntroFullCVPage({
  onBackToIntro,
  onNextPage,
  isVie,
}: {
  onBackToIntro?: () => void;
  onNextPage?: () => void;
  isVie: boolean;
}) {
  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', padding: '32px 24px 130px', fontFamily: "'Helvetica Neue', 'SF Pro Display', 'Switzer', sans-serif", color: '#111111' }}>
      {/* Top Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #EAEAEA', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", color: '#787774' }}>
          {isVie ? 'Trang 2 / 3 • Bản CV gốc không chỉnh sửa (.PDF)' : 'Page 2 / 3 • Authentic Original CV (.PDF)'}
        </span>
        <a
          href="./file/Le_Quang_Khanh_CV.pdf"
          download="Le_Quang_Khanh_CV.pdf"
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
          <span>↓</span>
          <span>{isVie ? 'Tải PDF chính chủ' : 'Download Original .PDF'}</span>
        </a>
      </div>

      {/* Embedded Exact Authentic Original PDF Document — ZERO EDITS */}
      <div style={{
        width: '100%',
        height: 'calc(100dvh - 160px)',
        minHeight: '860px',
        background: '#FFFFFF',
        border: '1px solid #EAEAEA',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
      }}>
        <iframe
          src="./file/Le_Quang_Khanh_CV.pdf#toolbar=0&navpanes=0&scrollbar=0"
          title="Le Quang Khanh Authentic Original CV PDF"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
}

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

  // Staggered scroll-entry animation via IntersectionObserver
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
      {/* Zen Sidebar */}
      <ZenSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Fixed ambient ambient — single ultra-slow radial drift, pointer-events none */}
      <div
        style={{
          position: 'fixed',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,0,0,0.025) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'drift 24s ease-in-out infinite alternate',
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;600&family=Caveat:wght@600;700&display=swap');
        @keyframes drift { from { transform: translate(0,0); } to { transform: translate(-40px, 30px); } }
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
        .social-a { display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border:1px solid #EAEAEA; border-radius:6px; color:#787774; text-decoration:none; transition:border-color 200ms, color 200ms; }
        .social-a:hover { border-color:#111111; color:#111111; }
        .horizontal-page-scroll::-webkit-scrollbar { display: none; }
        .horizontal-page-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes zney-meteor {
          0% { opacity: 0; transform: translate3d(-100px, -70px, 0) rotate(38deg); }
          15% { opacity: 1; }
          75% { opacity: 1; }
          100% { opacity: 0; transform: translate3d(700px, 500px, 0) rotate(38deg); }
        }
        @media (max-width: 640px) {
          .page-shell { max-width: 100% !important; padding: 24px 14px 190px !important; }
          .bento-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .card { padding: 20px !important; border-radius: 10px !important; }
          .intro-position-row { align-items: flex-start !important; justify-content: flex-start !important; }
          .intro-bottom-actions { flex-direction: column-reverse !important; align-items: stretch !important; gap: 18px !important; }
          .intro-socials { justify-content: center !important; width: 100% !important; }
          .cta-btn { width: 100% !important; justify-content: center !important; }
          .nav-pill-fixed { bottom: calc(18px + env(safe-area-inset-bottom)) !important; width: min(326px, calc(100vw - 28px)) !important; justify-content: space-between !important; padding: 6px 12px !important; gap: 8px !important; }
          .nav-pill-fixed button { width: 38px !important; height: 38px !important; flex: 0 0 38px !important; }
          .nav-pill-fixed > span { min-width: 0 !important; flex: 1 1 auto !important; font-size: 11px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
          .horizontal-page-scroll { height: 100dvh !important; }
        }
      `}</style>

      {/* Native Horizontal Scroll Container - 3 Pages Side by Side */}
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
        {/* FIXED ALWAYS-VISIBLE BOTTOM-CENTER NAVIGATION PILL (LOOP 3->1 & 1->3, NO NEON, BOTH BUTTONS ALWAYS PRESENT) */}
        <div
          className="nav-pill-fixed"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: '#111111',
            border: '1px solid #333333',
            borderRadius: '9999px',
            padding: '8px 18px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          }}
        >
          {/* Always-present Left Button "<" (Loop 1 -> 3) */}
          <button
            onClick={() => {
              if (currentPageIndex === 0) page3Ref.current?.scrollIntoView({ behavior: 'smooth' });
              else if (currentPageIndex === 1) page1Ref.current?.scrollIntoView({ behavior: 'smooth' });
              else if (currentPageIndex === 2) page2Ref.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            title={isVie ? 'Trang trước' : 'Prev Page'}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '9999px',
              background: '#FFFFFF',
              color: '#111111',
              border: '1px solid #EAEAEA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 800,
            }}
          >
            <span>&lt;</span>
          </button>

          <span style={{ fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", color: '#FFFFFF', fontWeight: 600, minWidth: '135px', textAlign: 'center' }}>
            {currentPageIndex === 0 && (isVie ? 'Trang 1 / 3 • Giới Thiệu' : 'Page 1 / 3 • Intro')}
            {currentPageIndex === 1 && (isVie ? 'Trang 2 / 3 • CV Gốc' : 'Page 2 / 3 • Original CV')}
            {currentPageIndex === 2 && (isVie ? 'Trang 3 / 3 • README.md' : 'Page 3 / 3 • README')}
          </span>

          {/* Always-present Right Button ">" (Loop 3 -> 1) */}
          <button
            onClick={() => {
              if (currentPageIndex === 0) page2Ref.current?.scrollIntoView({ behavior: 'smooth' });
              else if (currentPageIndex === 1) page3Ref.current?.scrollIntoView({ behavior: 'smooth' });
              else if (currentPageIndex === 2) page1Ref.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            title={isVie ? 'Trang tiếp theo' : 'Next Page'}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '9999px',
              background: '#FFFFFF',
              color: '#111111',
              border: '1px solid #EAEAEA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 800,
            }}
          >
            <span>&gt;</span>
          </button>
        </div>

        {/* Panel 1: Introduction */}
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
            style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto', padding: '50px 24px 130px' }}
          >
            {/* Top bar */}
            <div data-reveal style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '12px' }}>
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

              {/* Hero: Name + role */}
              <div data-reveal style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '48px', marginBottom: '48px' }}>
                {/* Original Black & White Terminal ZNEY ASCII Box with Diagonal Falling Shooting Star */}
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#111111',
                  border: '1px solid #262626',
                  borderRadius: '12px',
                  padding: '18px 22px',
                  marginBottom: '32px',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.14)'
                }}>
                  {/* Diagonal Falling Meteor inside ZNEY CLI */}
                  <span style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '10%',
                    width: '140px',
                    height: '2px',
                    borderRadius: '999px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), #00F0FF)',
                    filter: 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.85))',
                    transform: 'rotate(38deg)',
                    animation: 'zney-meteor 2.8s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
                    pointerEvents: 'none'
                  }} />
                  <span style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '55%',
                    width: '120px',
                    height: '1.5px',
                    borderRadius: '999px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), #00F0FF)',
                    filter: 'drop-shadow(0 0 5px rgba(0, 240, 255, 0.75))',
                    transform: 'rotate(38deg)',
                    animation: 'zney-meteor 3.4s cubic-bezier(0.25, 0.1, 0.25, 1) infinite 1.3s',
                    pointerEvents: 'none'
                  }} />

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #262626', paddingBottom: '10px', marginBottom: '14px', fontSize: '11px', color: '#A3A3A3', position: 'relative', zIndex: 2 }}>
                    <span>&gt; _SYSTEM.INIT(ZNEY)_DEVELOPER_ENGINE</span>
                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: '#262626', color: '#EEEEEE', fontWeight: 600 }}>CLI v1.0</span>
                  </div>
                  <pre style={{
                    position: 'relative',
                    zIndex: 2,
                    fontSize: 'clamp(9px, 2.3vw, 13px)',
                    lineHeight: 1.15,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    overflowX: 'auto',
                    margin: 0,
                    paddingBottom: '4px'
                  }}>
{`███████╗███╗   ██╗███████╗██╗   ██╗
╚══███╔╝████╗  ██║██╔════╝╚██╗ ██╔╝
  ███╔╝ ██╔██╗ ██║█████╗   ╚████╔╝ 
 ███╔╝  ██║╚██╗██║██╔══╝    ╚██╔╝  
███████╗██║ ╚████║███████╗   ██║   
╚══════╝╚═╝  ╚═══╝╚══════╝   ╚═╝   `}
                  </pre>
                </div>

          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#787774', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
            {isVie ? 'Giới thiệu • Trang 1 / 2' : 'Introduction • Page 1 / 2'}
          </p>

          {/* Greeting line */}
          <p style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#787774', marginBottom: '12px' }}>
            {isVie ? 'Xin chào —' : 'Hi there —'}
          </p>

          <h1 style={{
            fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#111111',
            marginBottom: '6px',
          }}>
            Lê Quang Khánh
          </h1>
          {/* Stylized alias — Caveat handwritten accent */}
          <p style={{
            fontFamily: "'Caveat', cursive",
            fontSize: '1.6rem',
            fontWeight: 700,
            color: '#787774',
            letterSpacing: '0.01em',
            marginBottom: '24px',
          }}>
            — zney
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
            <span className="tag tag-blue">Full Stack Developer</span>
            <span className="tag tag-green">{isVie ? 'Sinh viên UEH · Ngành IT' : 'UEH Student · IT Major'}</span>
          </div>

          <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#2F3437', maxWidth: '560px' }}>
            {isVie
              ? <>Mình là sinh viên ngành IT, khá thích việc coding và xây dựng ứng dụng — từ web đến mobile. Mình muốn những thứ mình làm ra không chỉ chạy được mà còn <strong style={{ color: '#111', fontWeight: 600 }}>được người khác thật sự dùng</strong>. Chỉ vậy thôi, nhưng đó cũng là lý do mình viết code mỗi ngày.</>
              : <>An IT student who enjoys building things — web apps, mobile apps, whatever. The goal is simple: ship something people actually <strong style={{ color: '#111', fontWeight: 600 }}>find useful</strong>. That's what keeps me coding every day.</>
            }
          </p>
        </div>

        {/* Bento grid: Core tech + Languages */}
        <div data-reveal className="bento-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '48px' }}>
          {/* Core Tech */}
          <div className="card">
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#787774', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
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

          {/* Languages */}
          <div className="card">
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#787774', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
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



        {/* Position row */}
        <div data-reveal className="intro-position-row" style={{ borderTop: '1px solid #EAEAEA', borderBottom: '1px solid #EAEAEA', padding: '20px 0', marginBottom: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="tag tag-yellow">{isVie ? 'Vị trí mong muốn' : 'Target Role'}</span>
            <span style={{ fontSize: '13px', color: '#2F3437' }}>Full Stack Developer</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="tag tag-red">{isVie ? 'Trường' : 'University'}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#787774' }}>UEH — Ho Chi Minh City</span>
          </div>
        </div>

        {/* Bottom: Socials + CTA */}
        <div data-reveal className="intro-bottom-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          {/* Social icon links — SVG inline, no external icon lib */}
          <div className="intro-socials" style={{ display: 'flex', gap: '8px' }}>
            <a href="https://github.com/psy-zney" target="_blank" rel="noopener noreferrer" className="social-a" title="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </a>
            <a href="https://www.facebook.com/psyotic.zney/" target="_blank" rel="noopener noreferrer" className="social-a" title="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/psy-zney295" target="_blank" rel="noopener noreferrer" className="social-a" title="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="mailto:lequangkhanh295@gmail.com" className="social-a" title="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            <a href="https://zalo.me/0394426827" target="_blank" rel="noopener noreferrer" className="social-a" title="Zalo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </a>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="cta-btn" onClick={onEnterWorkspace}>
              <span>{isVie ? 'Khám phá Workspace 3D' : 'View 3D Workspace'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Panel 2: Complete Full CV Scan */}
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
      <IntroFullCVPage
        onBackToIntro={() => page1Ref.current?.scrollIntoView({ behavior: 'smooth' })}
        onNextPage={() => page3Ref.current?.scrollIntoView({ behavior: 'smooth' })}
        isVie={isVie}
      />
    </div>

    {/* Panel 3: Complete README.md Encyclopedia Scan */}
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
      <IntroReadmePage
        onPrevPage={() => page2Ref.current?.scrollIntoView({ behavior: 'smooth' })}
        onFirstPage={() => page1Ref.current?.scrollIntoView({ behavior: 'smooth' })}
        isVie={isVie}
      />
    </div>
  </div>
</div>
  );
}
