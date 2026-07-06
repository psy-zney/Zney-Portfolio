import React, { useState, useEffect } from 'react';
import { ModelAnalyzer } from './components/ModelAnalyzer';
import { IntroPage } from './components/IntroPage';

type ViewMode = 'intro' | 'workspace';

function readViewMode(): ViewMode {
  return window.location.hash === '#/workspace' ? 'workspace' : 'intro';
}

function MobileLandscapeOverlay({ lang }: { lang: 'vie' | 'eng' }) {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth && window.innerWidth <= 768;
      setIsPortraitMobile(isPortrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isPortraitMobile) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0c1017]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center text-white animate-in fade-in duration-300">
      <div className="w-24 h-24 mb-8 relative flex items-center justify-center">
        <div className="w-12 h-20 border-2 border-sky-400 rounded-xl flex items-center justify-center animate-rotate-phone shadow-[0_0_25px_rgba(56,189,248,0.3)] bg-slate-900/50">
          <div className="w-2 h-2 rounded-full bg-sky-400 absolute bottom-2" />
        </div>
      </div>
      <h3 className="text-xl font-bold font-mono text-sky-400 mb-3 tracking-widest uppercase">
        {lang === 'vie' ? 'Xoay Ngang Màn Hình' : 'Rotate Your Device'}
      </h3>
      <p className="text-sm text-slate-300 max-w-xs leading-relaxed mb-8 font-sans">
        {lang === 'vie'
          ? 'Vui lòng xoay ngang điện thoại hoặc máy tính bảng để có trải nghiệm không gian 3D & giao diện tốt nhất!'
          : 'Please rotate your phone or tablet to landscape mode for the optimal 3D workspace experience!'}
      </p>
      <div className="inline-flex items-center gap-3 text-xs text-sky-300 font-mono bg-sky-950/40 px-5 py-2.5 rounded-full border border-sky-500/30 shadow-sm animate-pulse">
        <span className="text-base">📱 ➔ 🔄</span>
        <span>{lang === 'vie' ? 'Chế Độ Landscape' : 'Landscape Required'}</span>
      </div>
    </div>
  );
}

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>(readViewMode);
  const [lang, setLang] = useState<'vie' | 'eng'>('eng');

  const toggleLang = () => setLang((prev) => (prev === 'vie' ? 'eng' : 'vie'));

  const navigateTo = (mode: ViewMode) => {
    const nextUrl = mode === 'workspace'
      ? `${window.location.pathname}${window.location.search}#/workspace`
      : `${window.location.pathname}${window.location.search}`;
    window.history.pushState({ viewMode: mode }, '', nextUrl);
    setViewMode(mode);
  };

  useEffect(() => {
    const syncViewFromUrl = () => setViewMode(readViewMode());
    window.addEventListener('popstate', syncViewFromUrl);
    window.addEventListener('hashchange', syncViewFromUrl);
    return () => {
      window.removeEventListener('popstate', syncViewFromUrl);
      window.removeEventListener('hashchange', syncViewFromUrl);
    };
  }, []);

  useEffect(() => {
    document.title = viewMode === 'workspace' ? 'Workspace | zney' : 'zney - Portfolio';
    const favicon = document.getElementById('favicon') as HTMLLinkElement || document.querySelector("link[rel*='icon']");
    if (favicon) {
      favicon.href = viewMode === 'intro' ? './black-hole.png' : './hacker.png';
    } else {
      const link = document.createElement('link');
      link.id = 'favicon';
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = viewMode === 'intro' ? './black-hole.png' : './hacker.png';
      document.head.appendChild(link);
    }
  }, [viewMode]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0f141d] font-sans text-slate-100 select-none">
      {viewMode === 'workspace' && <MobileLandscapeOverlay lang={lang} />}
      {viewMode === 'intro' ? (
        <IntroPage
          onEnterWorkspace={() => navigateTo('workspace')}
          lang={lang}
          onToggleLang={toggleLang}
        />
      ) : (
        <ModelAnalyzer
          onBackToIntro={() => navigateTo('intro')}
          lang={lang}
        />
      )}
    </div>
  );
}

