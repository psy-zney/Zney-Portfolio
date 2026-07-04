import React, { useEffect, useRef, useState } from 'react';
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
  MessageCircle
} from 'lucide-react';

export type ItemType = 'paper' | 'lanyard' | 'bookshelf';

// ==================== INTERACTIVE MODALS ====================

function ModalCV({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-slate-900/95 border border-sky-500/40 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-[0_0_50px_rgba(56,189,248,0.2)] backdrop-blur-xl text-slate-100 animate-in fade-in zoom-in duration-200 max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-start border-b border-slate-700/80 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <FileText size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-wide text-white">CURRICULUM VITAE</h3>
            <p className="text-xs text-sky-400 font-mono mt-0.5">Fullstack 3D Web & Interactive Designer (10+ Years Exp)</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-slate-300">
        <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2 font-mono">Executive Summary</h4>
          <p>
            Creative Director & 3D Web Architect with **10 years of professional experience** crafting high-end digital products, real-time WebGL graphics, and immersive interactive design systems for global brands.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 font-mono">Core Competencies</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Three.js / React Three Fiber', 'TypeScript / Next.js / Vite',
              'GLSL Shaders & Post-processing', 'TailwindCSS & Modern UI/UX',
              '3D Asset Optimization (Blender)', 'Real-time Audio & Motion Animation'
            ].map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-800/30 px-3 py-2 rounded-lg border border-slate-700/40 text-xs text-slate-200">
                <CheckCircle2 size={14} className="text-sky-400 shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-500/10 via-slate-800/50 to-transparent rounded-xl border border-sky-500/30">
            <div>
              <p className="font-semibold text-white">Official A4 Document (.PDF)</p>
              <p className="text-xs text-slate-400">Includes complete project history, education, and technical certifications</p>
            </div>
            <a
              href="#download-cv"
              onClick={(e) => { e.preventDefault(); alert('Starting full CV download (.PDF)...'); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-sky-500/20 transition cursor-pointer"
            >
              <Download size={15} />
              <span>Download .PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalLanyard({ onClose }: { onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const socials = [
    {
      title: 'STUDENT · PORTFOLIO',
      name: 'GitHub',
      desc: 'code · open source',
      icon: <Github size={84} strokeWidth={1.2} />,
      gradient: 'from-slate-900 via-[#131c2e] to-[#0a0f1d]',
      borderColor: 'border-sky-500/40',
      linkText: 'kết nối →',
      link: 'https://github.com/psy-zney'
    },
    {
      title: 'STUDENT · PORTFOLIO',
      name: 'Facebook',
      desc: 'social · personal profile',
      icon: <Facebook size={84} strokeWidth={1.2} />,
      gradient: 'from-blue-950 via-[#102a6c] to-[#0a0f1d]',
      borderColor: 'border-blue-500/40',
      linkText: 'kết nối →',
      link: 'https://www.facebook.com/psyotic.zney/'
    },
    {
      title: 'STUDENT · PORTFOLIO',
      name: 'LinkedIn',
      desc: 'career · professional network',
      icon: <Share2 size={84} strokeWidth={1.2} />,
      gradient: 'from-sky-950 via-[#0e3b6c] to-[#0a0f1d]',
      borderColor: 'border-sky-400/40',
      linkText: 'kết nối →',
      link: 'https://www.linkedin.com/in/psy-zney295'
    },
    {
      title: 'STUDENT · PORTFOLIO',
      name: 'Email Contact',
      desc: 'lequangkhanh295@gmail.com',
      icon: <Mail size={84} strokeWidth={1.2} />,
      gradient: 'from-emerald-950 via-[#043327] to-[#0a0f1d]',
      borderColor: 'border-emerald-400/40',
      linkText: 'gửi mail →',
      link: 'mailto:lequangkhanh295@gmail.com'
    },
    {
      title: 'STUDENT · PORTFOLIO',
      name: 'Zalo Chat',
      desc: 'phone · 0394426827',
      icon: <MessageCircle size={84} strokeWidth={1.2} />,
      gradient: 'from-indigo-950 via-[#281b6c] to-[#0a0f1d]',
      borderColor: 'border-indigo-400/40',
      linkText: 'nhắn zalo →',
      link: 'https://zalo.me/0394426827'
    }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 w-full max-w-md mx-auto select-none">
      {/* Top Header: Minimalist // social links + round Close X button */}
      <div className="w-[340px] sm:w-[360px] flex items-center justify-between mb-4 px-2">
        <span className="font-mono text-sm text-slate-300 tracking-wider">// social links</span>
        <button
          onClick={onClose}
          className="w-10 h-10 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full border border-slate-700/80 shadow-lg flex items-center justify-center transition cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      {/* VERTICAL CARD STACK (Thẻ dọc xếp lồng như bộ bài trong Screenshot 2) */}
      <div className="relative h-[500px] w-[340px] sm:w-[360px] flex items-center justify-center my-2">
        {socials.map((soc, idx) => {
          const offset = idx - activeIdx;
          const isCurrent = offset === 0;

          let cardStyle = "translate-x-0 translate-y-0 scale-100 rotate-0 z-30 opacity-100 shadow-[0_25px_60px_rgba(0,0,0,0.9)] ring-1 ring-white/20 pointer-events-auto";
          if (offset === 1 || offset === -3) {
            cardStyle = "translate-x-6 sm:translate-x-8 translate-y-3 scale-95 rotate-4 z-20 opacity-75 hover:opacity-95 cursor-pointer pointer-events-auto shadow-2xl";
          } else if (offset === 2 || offset === -2) {
            cardStyle = "translate-x-12 sm:translate-x-16 translate-y-6 scale-90 rotate-8 z-10 opacity-50 hover:opacity-75 cursor-pointer pointer-events-auto shadow-xl";
          } else if (offset === 3 || offset === -1) {
            cardStyle = "translate-x-18 sm:translate-x-24 translate-y-9 scale-85 rotate-12 z-0 opacity-25 hover:opacity-50 cursor-pointer pointer-events-auto shadow-lg";
          }

          return (
            <div
              key={idx}
              onClick={() => !isCurrent && setActiveIdx(idx)}
              className={`absolute top-0 w-full h-full rounded-3xl bg-gradient-to-b ${soc.gradient} border ${soc.borderColor} p-8 flex flex-col justify-between transition-all duration-500 ease-out backdrop-blur-2xl ${cardStyle}`}
            >
              {/* Top Card Header */}
              <div className="flex items-center justify-between font-mono text-xs text-slate-400 tracking-widest font-semibold">
                <span>{soc.title}</span>
                <span>0{idx + 1}</span>
              </div>

              {/* Center Huge Icon */}
              <div className="my-auto py-6 flex justify-center text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                {soc.icon}
              </div>

              {/* Bottom Info & Link */}
              <div className="flex flex-col text-left">
                <h4 className="text-3xl font-extrabold text-white tracking-wide mb-1">{soc.name}</h4>
                <p className="text-xs font-mono text-slate-300 tracking-wider lowercase mb-6">{soc.desc}</p>
                <a
                  href={soc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-sky-400 underline underline-offset-8 decoration-white/40 hover:decoration-sky-400 transition cursor-pointer pb-1 w-fit"
                >
                  <span>{soc.linkText}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls (< 1 / 4 >) */}
      <div className="flex items-center justify-center gap-8 mt-6">
        <button
          onClick={() => setActiveIdx((prev) => (prev - 1 + socials.length) % socials.length)}
          className="w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer shadow-lg font-bold"
        >
          &lt;
        </button>

        <span className="font-mono text-sm text-sky-400 font-bold tracking-widest">
          {activeIdx + 1} / {socials.length}
        </span>

        <button
          onClick={() => setActiveIdx((prev) => (prev + 1) % socials.length)}
          className="w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer shadow-lg font-bold"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

function ModalBookshelf({ onClose }: { onClose: () => void }) {
  const repos = [
    {
      name: 'psy-zney.github.io',
      lang: 'TypeScript • Three.js • WebGL',
      stars: '15',
      forks: '4',
      desc: 'Interactive real-time 3D desk & hacker glitch portfolio built with React Three Fiber, custom shaders & WebGL acceleration.',
      url: 'https://github.com/psy-zney/psy-zney.github.io',
      featured: true,
      tag: '● ACTIVE LIVE PORTFOLIO',
    },
    {
      name: 'beatsync',
      lang: 'TypeScript • WebRTC • Audio',
      stars: '24',
      forks: '7',
      desc: 'Real-time collaborative music listening rooms with sub-millisecond audio sync across distributed web clients.',
      url: 'https://github.com/psy-zney/beatsync',
      motif: 'audio',
    },
    {
      name: 'Security',
      lang: 'TypeScript • Windows Service',
      stars: '18',
      forks: '5',
      desc: 'Cloud relay server & automated Windows security monitoring daemon for proactive PC/Laptop threat protection.',
      url: 'https://github.com/psy-zney/Security',
      motif: 'security',
    },
    {
      name: 'LearningEnglish',
      lang: 'TypeScript • OpenAI API',
      stars: '12',
      forks: '3',
      desc: 'Intelligent language acquisition app featuring automated AI tense verification, sentence structure parsing & vocabulary retention.',
      url: 'https://github.com/psy-zney/LearningEnglish',
      motif: 'ai',
    },
    {
      name: 'AI_Hill_Climbing_TSP',
      lang: 'Python • Optimization AI',
      stars: '10',
      forks: '4',
      desc: 'Advanced Artificial Intelligence heuristic algorithms solving the Traveling Salesperson Problem using stochastic Hill Climbing.',
      url: 'https://github.com/psy-zney/AI_Hill_Climbing_TSP',
      motif: 'python',
    },
    {
      name: 'mandycrimson',
      lang: 'TypeScript • FullStack Web',
      stars: '9',
      forks: '2',
      desc: 'Modern high-performance e-commerce product catalog and interactive presentation platform with headless architecture.',
      url: 'https://github.com/psy-zney/mandycrimson',
      motif: 'web',
    },
  ];

  return (
    <div
      style={{
        background: 'rgba(15, 23, 42, 0.94)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderRadius: '24px',
        padding: '32px',
        maxWidth: '860px',
        width: '100%',
        margin: '0 16px',
        boxShadow: '0 30px 100px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(28px)',
        color: '#F8FAFC',
        fontFamily: "'Outfit', 'SF Pro Display', -apple-system, sans-serif",
        maxHeight: '88vh',
        overflowY: 'auto',
        position: 'relative',
      }}
      className="animate-in fade-in zoom-in-95 duration-250 select-none custom-scrollbar"
    >
      <style>{`
        @keyframes eq-pulse-1 { 0%, 100% { height: 6px; } 50% { height: 18px; } }
        @keyframes eq-pulse-2 { 0%, 100% { height: 16px; } 50% { height: 8px; } }
        @keyframes eq-pulse-3 { 0%, 100% { height: 10px; } 50% { height: 20px; } }
        .eq-bar-1 { animation: eq-pulse-1 0.8s infinite ease-in-out; }
        .eq-bar-2 { animation: eq-pulse-2 0.6s infinite ease-in-out 0.2s; }
        .eq-bar-3 { animation: eq-pulse-3 0.9s infinite ease-in-out 0.4s; }
      `}</style>

      {/* Header section with agency typographic hierarchy */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)', border: '1px solid rgba(168, 85, 247, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C084FC', boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }}>
            <BookOpen size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                OPEN SOURCE ARCHIVE
              </h3>
              <span style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '2px 8px', borderRadius: '100px', border: '1px solid rgba(56, 189, 248, 0.3)', fontWeight: 600 }}>
                @psy-zney
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0, marginTop: '2px', fontFamily: "'JetBrains Mono', monospace" }}>
              Selected Engineering Repositories & Experimental Systems
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="https://github.com/psy-zney"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '8px 14px',
              borderRadius: '10px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              transition: 'all 200ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = '#0F172A'; e.currentTarget.style.borderColor = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; }}
          >
            <Github size={14} />
            <span>GitHub Profile</span>
            <span>↗</span>
          </a>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
              cursor: 'pointer',
              transition: 'all 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.color = '#F87171'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'; e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'; }}
            title="Đóng bảng dự án"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Asymmetric Agency Bento Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {repos.map((repo, idx) => {
          const isFeatured = repo.featured;
          return (
            <a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                gridColumn: isFeatured ? '1 / -1' : 'span 1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: isFeatured ? '24px' : '20px',
                background: isFeatured
                  ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)'
                  : 'rgba(30, 41, 59, 0.4)',
                border: isFeatured
                  ? '1px solid rgba(168, 85, 247, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                textDecoration: 'none',
                transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isFeatured ? '0 10px 30px rgba(168, 85, 247, 0.12)' : 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = isFeatured
                  ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(30, 27, 75, 0.8) 100%)'
                  : 'rgba(30, 41, 59, 0.7)';
                e.currentTarget.style.borderColor = isFeatured ? 'rgba(168, 85, 247, 0.7)' : 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 14px 28px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isFeatured
                  ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)'
                  : 'rgba(30, 41, 59, 0.4)';
                e.currentTarget.style.borderColor = isFeatured ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isFeatured ? '0 10px 30px rgba(168, 85, 247, 0.12)' : 'none';
              }}
            >
              {/* Background ambient glow for featured card */}
              {isFeatured && (
                <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />
              )}

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isFeatured ? '18px' : '15px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                      {repo.name}
                    </span>
                    {repo.tag && (
                      <span style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", background: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80', padding: '2px 8px', borderRadius: '100px', border: '1px solid rgba(34, 197, 94, 0.3)', fontWeight: 600 }}>
                        {repo.tag}
                      </span>
                    )}
                  </div>

                  {/* Motifs / Metrics right side */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {repo.motif === 'audio' && (
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '18px', padding: '0 6px' }}>
                        <span className="eq-bar-1" style={{ width: '3px', background: '#38BDF8', borderRadius: '1px' }} />
                        <span className="eq-bar-2" style={{ width: '3px', background: '#A855F7', borderRadius: '1px' }} />
                        <span className="eq-bar-3" style={{ width: '3px', background: '#4ADE80', borderRadius: '1px' }} />
                      </div>
                    )}
                    {repo.motif === 'security' && (
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4ADE80', background: 'rgba(34,197,94,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(34,197,94,0.2)' }}>
                        $ sudo guard
                      </span>
                    )}
                    {repo.motif === 'python' && (
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#FACC15', background: 'rgba(234,179,8,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(234,179,8,0.2)' }}>
                        def tsp():
                      </span>
                    )}
                    <span style={{ fontSize: '14px', color: '#94A3B8', transition: 'transform 200ms', display: 'inline-block' }}>↗</span>
                  </div>
                </div>

                <p style={{ fontSize: isFeatured ? '14px' : '13px', color: '#CBD5E1', lineHeight: 1.6, margin: 0, marginBottom: '20px', maxWidth: isFeatured ? '90%' : '100%', fontWeight: 400 }}>
                  {repo.desc}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: repo.lang.includes('Python') ? '#FACC15' : '#38BDF8', boxShadow: repo.lang.includes('Python') ? '0 0 8px #FACC15' : '0 0 8px #38BDF8' }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>
                    {repo.lang}
                  </span>
                </div>

                {repo.stars && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#64748B' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#FACC15' }}>
                      ★ {repo.stars}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#94A3B8' }}>
                      ⑂ {repo.forks}
                    </span>
                  </div>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function InitialPageLoader({ onFinish }: { onFinish: () => void }) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    const TOTAL_DURATION = 2400; // 2.4 seconds of ultra-smooth, even counting
    const TICK = 16;             // ~60fps
    const startTime = performance.now();
    let displayed = 0;
    let finished = false;

    const timer = setInterval(() => {
      if (finished) return;

      const elapsed = performance.now() - startTime;
      
      // Calculate even, linear progress over time (0 to 100%)
      const targetProgress = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
      
      // Smooth interpolation so numbers tick up evenly step-by-step (1% -> 2% -> 3%...) without big chunk jumps
      displayed += (targetProgress - displayed) * 0.2;
      if (displayed > 99.8) displayed = 100;

      setDisplayProgress(displayed);

      if (displayed >= 100 && elapsed >= TOTAL_DURATION) {
        finished = true;
        clearInterval(timer);
        setTimeout(() => onFinishRef.current(), 350);
      }
    }, TICK);

    return () => { clearInterval(timer); finished = true; };
  }, []);

  // Generate stable star positions once
  const stars = useRef(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() < 0.7 ? 1 : 1.5,
      delay: `${(Math.random() * 4).toFixed(2)}s`,
      duration: `${(2 + Math.random() * 3).toFixed(2)}s`,
    }))
  ).current;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes progress-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.8; box-shadow: 0 0 8px 2px rgba(255,255,255,0.6); }
          50% { transform: translateX(-50%) scale(1.3); opacity: 1; box-shadow: 0 0 16px 4px rgba(255,255,255,0.9); }
        }
      `}</style>

      {/* Star particles */}
      {stars.map((s) => (
        <span
          key={s.id}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: '#ffffff',
            opacity: 0.15,
            animation: `twinkle ${s.duration} ${s.delay} ease-in-out infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Loader content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          minWidth: '320px',
          maxWidth: '90vw',
        }}
      >
        {/* Wave text loader */}
        <div className="loader" />

        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            height: '2px',
            background: 'rgba(255,255,255,0.12)',
            position: 'relative',
            overflow: 'visible',
            borderRadius: '1px'
          }}
        >
          <div
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, #ffffff 50%, rgba(255,255,255,0.3) 100%)',
              backgroundSize: '200% 100%',
              animation: 'progress-shimmer 1.2s infinite linear',
              width: `${displayProgress}%`,
              transition: 'none',
              borderRadius: '1px',
              boxShadow: '0 0 10px rgba(255,255,255,0.4)'
            }}
          />
          {/* Glowing head of progress bar */}
          <div
            style={{
              position: 'absolute',
              top: '-3px',
              left: `${displayProgress}%`,
              width: '5px',
              height: '8px',
              background: '#ffffff',
              borderRadius: '2px',
              animation: 'pulse-glow 1s infinite ease-in-out',
              transition: 'none',
            }}
          />
        </div>

        {/* Percentage */}
        <span
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.65)',
            textTransform: 'uppercase',
          }}
        >
          {displayProgress.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

interface ModelAnalyzerProps {
  onBackToIntro?: () => void;
  lang?: 'vie' | 'eng';
}

export function ModelAnalyzer({ onBackToIntro, lang = 'vie' }: ModelAnalyzerProps) {
  const [activeModal, setActiveModal] = useState<ItemType | null>(null);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<ItemType | null>(null);

  return (
    <div className="w-full h-full relative bg-[#0c1017] overflow-y-auto overflow-x-hidden flex flex-col justify-between p-6 md:p-10 select-none font-sans text-slate-100">
      {/* 2.5D Isometric Cyber Grid Background */}
      <div
        style={{
          position: 'fixed',
          inset: '-50%',
          width: '200%',
          height: '200%',
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.08) 0%, transparent 60%), linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 50px 50px, 50px 50px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
          pointerEvents: 'none',
          opacity: 0.7,
          zIndex: 0
        }}
      />

      {isAppLoading && <InitialPageLoader onFinish={() => setIsAppLoading(false)} />}

      {/* TOP CYBER HUD BAR */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5 bg-slate-950/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-800/80 shadow-lg">
        {/* Left: Back button */}
        {onBackToIntro && !isAppLoading && (
          <button
            onClick={onBackToIntro}
            className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 shadow-md flex items-center gap-2 text-xs font-mono font-bold transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>←</span>
            <span>{lang === 'eng' ? 'Back to Intro' : 'Trang Giới Thiệu'}</span>
          </button>
        )}

        {/* Center: Glowing Status */}
        <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-full border border-sky-500/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            {lang === 'eng' ? '2.5D Isometric Workstation // Zero-Lag 60FPS' : 'Trạm Làm Việc 2.5D Cyberpunk // Siêu Mượt 60FPS'}
          </span>
        </div>

        {/* Right: System Stats */}
        <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
          <span className="text-sky-400">FPS: <strong className="text-white">60.0</strong></span>
          <span className="text-purple-400">3D ASSETS: <strong className="text-white">0 KB</strong></span>
          <span className="text-emerald-400">STATUS: <strong className="text-white">ACTIVE</strong></span>
        </div>
      </div>

      {/* CENTRAL 2.5D WORKSTATION CARDS AREA */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-sans mb-3 drop-shadow-md">
            {lang === 'eng' ? 'Interactive Holographic Workstation' : 'Trạm Làm Việc Không Gian 2.5D'}
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
            {lang === 'eng'
              ? 'Select an isometric workstation module below to inspect engineering blueprints, developer identity credentials, and open source archives.'
              : 'Chọn một trạm mô-đun 2.5D bên dưới để khám phá hồ sơ kỹ thuật, thông tin cá nhân và kho dự án mã nguồn mở.'}
          </p>
        </div>

        {/* The 3 Isometric Desk Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full px-2 md:px-6" style={{ perspective: '1200px' }}>
          {/* CARD 1: CV & Timeline */}
          <div
            onClick={() => setActiveModal('paper')}
            onMouseEnter={() => setHoveredCard('paper')}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-sky-500/30 rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-300 transform hover:-translate-y-3 hover:scale-[1.02] hover:border-sky-400 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] flex flex-col justify-between overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              transform: hoveredCard === 'paper' ? 'translateY(-10px) rotateX(4deg) rotateY(-4deg)' : 'translateY(0) rotateX(0) rotateY(0)'
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-sky-500/20 transition-all" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-110 transition-transform">
                  <FileText size={28} />
                </div>
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-sky-950/60 text-sky-300 border border-sky-500/30">
                  A4_BLUEPRINT // CV
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-sans group-hover:text-sky-300 transition-colors">
                {lang === 'eng' ? 'Curriculum Vitae & Timeline' : 'Hồ Sơ Năng Lực & Kinh Nghiệm'}
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                {lang === 'eng'
                  ? 'Comprehensive interactive resume detailing full-stack web engineering, algorithm design, and system security experience.'
                  : 'Khám phá chi tiết hành trình kỹ sư phát triển phần mềm, thuật toán trí tuệ nhân tạo và kiến trúc bảo mật hệ thống.'}
              </p>

              {/* Code preview decoration */}
              <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 font-mono text-[11px] text-sky-300/80 mb-6 space-y-1">
                <div className="flex items-center gap-2"><span className="text-emerald-400">❯</span> <span>const dev = new FullStackEngineer();</span></div>
                <div className="flex items-center gap-2"><span className="text-emerald-400">❯</span> <span>dev.skills = ['React', 'TS', '2.5D', 'AI'];</span></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono font-bold text-sky-400 group-hover:translate-x-1 transition-transform">
              <span>{lang === 'eng' ? '[ LAUNCH CV CONSOLE ]' : '[ MỞ HỒ SƠ CHI TIẾT ]'}</span>
              <span className="text-base">↗</span>
            </div>
          </div>

          {/* CARD 2: ID Lanyard Badge */}
          <div
            onClick={() => setActiveModal('lanyard')}
            onMouseEnter={() => setHoveredCard('lanyard')}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-amber-500/30 rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-300 transform hover:-translate-y-3 hover:scale-[1.02] hover:border-amber-400 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] flex flex-col justify-between overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              transform: hoveredCard === 'lanyard' ? 'translateY(-10px) rotateX(4deg)' : 'translateY(0) rotateX(0)'
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                  <UserCheck size={28} />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-mono font-bold text-amber-300">ONLINE // ID_BADGE</span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-sans group-hover:text-amber-300 transition-colors">
                {lang === 'eng' ? 'Developer Identity & Socials' : 'Thẻ Nhận Diện & Liên Hệ'}
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                {lang === 'eng'
                  ? 'Interactive Discord Lanyard card with real-time online status indicator, custom credentials, and direct contact channels.'
                  : 'Thẻ ID Lanyard tích hợp trạng thái trực tuyến thời gian thực từ Discord cùng mạng lưới kết nối mạng xã hội và GitHub.'}
              </p>

              {/* Barcode motif decoration */}
              <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex items-center justify-between font-mono text-[11px] text-amber-400/80 mb-6">
                <div className="tracking-widest font-bold">||| || ||| | |||| ||</div>
                <span>ID: PSY-ZNEY-2026</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>{lang === 'eng' ? '[ ACCESS ID LANYARD ]' : '[ XEM THẺ ĐEO DISCORD ]'}</span>
              <span className="text-base">↗</span>
            </div>
          </div>

          {/* CARD 3: Open Source Bookshelf */}
          <div
            onClick={() => setActiveModal('bookshelf')}
            onMouseEnter={() => setHoveredCard('bookshelf')}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-purple-500/30 rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-300 transform hover:-translate-y-3 hover:scale-[1.02] hover:border-purple-400 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] flex flex-col justify-between overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              transform: hoveredCard === 'bookshelf' ? 'translateY(-10px) rotateX(4deg) rotateY(4deg)' : 'translateY(0) rotateX(0) rotateY(0)'
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                  <BookOpen size={28} />
                </div>
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30">
                  REPO_ARCHIVE // BENTO
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-sans group-hover:text-purple-300 transition-colors">
                {lang === 'eng' ? 'Open Source Project Bookshelf' : 'Kệ Sách & Kho Dự Án'}
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                {lang === 'eng'
                  ? 'Agency-grade asymmetric bento grid archiving full-stack applications, AI heuristic algorithms, and WebRTC collaborative music rooms.'
                  : 'Kệ sách Bento Grid chuẩn Agency tổng hợp các dự án mã nguồn mở, thuật toán AI tối ưu và phòng nghe nhạc đồng bộ thời gian thực.'}
              </p>

              {/* Equalizer motif decoration */}
              <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex items-center justify-between font-mono text-[11px] text-purple-400/80 mb-6">
                <span className="text-emerald-400">$ sudo guard --live</span>
                <div className="flex items-end gap-1" style={{ height: '16px' }}>
                  <span className="eq-bar-1 w-1 h-3 bg-sky-400 rounded-full" />
                  <span className="eq-bar-2 w-1 h-4 bg-purple-400 rounded-full" />
                  <span className="eq-bar-3 w-1 h-2 bg-emerald-400 rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
              <span>{lang === 'eng' ? '[ EXPLORE REPOSITORIES ]' : '[ KHÁM PHÁ KHO MÃ NGUỒN ]'}</span>
              <span className="text-base">↗</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER CYBER BAR */}
      <div className="relative z-20 border-t border-slate-800/80 pt-4 mt-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 bg-slate-950/60 px-6 py-3 rounded-2xl border border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="text-sky-400 font-bold">@psy-zney</span>
          <span>// 2.5D ISOMETRIC CYBER DESK ARCHITECTURE</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> <span>3D GLB PAYLOAD: 0 MB</span></span>
          <span className="hidden sm:inline">ENGINE: REACT 18 + VITE + TAILWIND</span>
        </div>
      </div>

      {/* MODAL OVERLAYS */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
          {activeModal === 'paper' && <ModalCV onClose={() => setActiveModal(null)} />}
          {activeModal === 'lanyard' && <ModalLanyard onClose={() => setActiveModal(null)} />}
          {activeModal === 'bookshelf' && <ModalBookshelf onClose={() => setActiveModal(null)} />}
        </div>
      )}
    </div>
  );
}

