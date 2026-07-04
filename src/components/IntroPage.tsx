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
        height: '100vh',
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

interface IntroPageProps {
  onEnterWorkspace: () => void;
  lang: 'vie' | 'eng';
  onToggleLang: () => void;
}

export function IntroPage({ onEnterWorkspace, lang, onToggleLang }: IntroPageProps) {
  const isVie = lang === 'vie';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="w-screen h-screen overflow-y-auto"
      style={{
        background: '#FBFBFA',
        fontFamily: "'Helvetica Neue', 'SF Pro Display', 'Switzer', sans-serif",
        color: '#111111',
      }}
    >
      {/* Zen Sidebar */}
      <ZenSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Toggle Button for Zen Sidebar — fixed at top-left corner */}
      <button
        onClick={() => setSidebarOpen((v) => !v)}
        style={{
          position: 'fixed',
          top: '20px',
          left: sidebarOpen ? '256px' : '20px',
          zIndex: 51,
          height: '36px',
          padding: '0 16px',
          background: '#FFFFFF',
          border: '1px solid #EAEAEA',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          transition: 'left 280ms cubic-bezier(0.16,1,0.3,1), border-color 180ms, color 180ms, box-shadow 180ms',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          color: '#787774',
          fontSize: '12px',
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.04em',
          outline: 'none',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#111111';
          (e.currentTarget as HTMLButtonElement).style.color = '#111111';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#EAEAEA';
          (e.currentTarget as HTMLButtonElement).style.color = '#787774';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
        }}
        title={sidebarOpen ? 'Close sidebar' : 'Deployed Sites'}
      >
        <span style={{ fontSize: '14px', transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1)', transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)', lineHeight: 1 }}>‹</span>
        <span>Sites</span>
      </button>

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
        .social-a { display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border:1px solid #EAEAEA; border-radius:6px; color:#787774; text-decoration:none; transition:border-color 200ms, color 200ms; }
        .social-a:hover { border-color:#111111; color:#111111; }
        @media (max-width: 640px) {
          .page-shell { padding: 40px 16px 60px !important; }
          .bento-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Page shell */}
      <div
        ref={containerRef}
        className="page-shell"
        style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto', padding: '60px 24px 80px' }}
      >
        {/* Top bar */}
        <div data-reveal style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '64px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#787774', letterSpacing: '0.06em' }}>
            psy-zney.github.io
          </span>
          <button className="lang-btn" onClick={onToggleLang}>
            {isVie ? 'VIE → ENG' : 'ENG → VIE'}
          </button>
        </div>

        {/* Hero: Name + role */}
        <div data-reveal style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '48px', marginBottom: '48px' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#787774', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
            {isVie ? 'Giới thiệu' : 'Introduction'}
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

        {/* Featured GitHub Repositories */}
        <div data-reveal className="card" style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#787774', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
              {isVie ? 'Dự án & Repositories trên GitHub (@psy-zney)' : 'Featured GitHub Projects (@psy-zney)'}
            </p>
            <a
              href="https://github.com/psy-zney"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#111111', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
            >
              <span>GitHub Profile</span>
              <span>↗</span>
            </a>
          </div>

          <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { name: 'psy-zney.github.io', lang: 'TypeScript', desc: isVie ? 'Portfolio 3D & Hacker Glitch interactive web.' : 'Interactive 3D & Hacker Glitch portfolio web.', url: 'https://github.com/psy-zney/psy-zney.github.io' },
              { name: 'beatsync', lang: 'TypeScript', desc: isVie ? 'Nghe nhạc đồng bộ mượt mà cùng bạn bè.' : 'Listen to music in real-time sync with friends.', url: 'https://github.com/psy-zney/beatsync' },
              { name: 'Security', lang: 'TypeScript', desc: isVie ? 'Dịch vụ bảo mật & Cloud relay cho PC/Laptop.' : 'Cloud relay server & Windows security service.', url: 'https://github.com/psy-zney/Security' },
              { name: 'LearningEnglish', lang: 'TypeScript', desc: isVie ? 'Ứng dụng học tiếng Anh tích hợp AI sửa lỗi câu.' : 'English study app with AI checking tense & structure.', url: 'https://github.com/psy-zney/LearningEnglish' },
              { name: 'AI_Hill_Climbing_TSP', lang: 'Python', desc: isVie ? 'Thuật toán AI Hill Climbing giải bài toán TSP.' : 'AI optimization algorithm for TSP problem.', url: 'https://github.com/psy-zney/AI_Hill_Climbing_TSP' },
              { name: 'mandycrimson', lang: 'TypeScript', desc: isVie ? 'Hệ thống quản lý danh sách sản phẩm & catalog.' : 'Full-stack products catalog web application.', url: 'https://github.com/psy-zney/mandycrimson' },
            ].map((repo, idx) => (
              <a
                key={idx}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: '#F9F8F6',
                  border: '1px solid #EAEAEA',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 200ms',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#111111';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#F9F8F6';
                  e.currentTarget.style.borderColor = '#EAEAEA';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 600, color: '#111111' }}>
                      {repo.name}
                    </span>
                    <span style={{ fontSize: '12px', color: '#787774' }}>↗</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#555555', lineHeight: 1.5, margin: 0, marginBottom: '12px' }}>
                    {repo.desc}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: repo.lang === 'Python' ? '#3572A5' : '#3178C6' }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#787774' }}>{repo.lang}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Position row */}
        <div data-reveal style={{ borderTop: '1px solid #EAEAEA', borderBottom: '1px solid #EAEAEA', padding: '20px 0', marginBottom: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
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
        <div data-reveal style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          {/* Social icon links — SVG inline, no external icon lib */}
          <div style={{ display: 'flex', gap: '8px' }}>
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

          <button className="cta-btn" onClick={onEnterWorkspace}>
            <span>{isVie ? 'Khám phá Workspace 3D' : 'View 3D Workspace'}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
