import React, { useState, useEffect } from 'react';
import { ModelAnalyzer } from './components/ModelAnalyzer';
import { IntroPage } from './components/IntroPage';

export default function App() {
  const [viewMode, setViewMode] = useState<'intro' | 'workspace'>('intro');
  const [lang, setLang] = useState<'vie' | 'eng'>('vie');

  const toggleLang = () => setLang((prev) => (prev === 'vie' ? 'eng' : 'vie'));

  useEffect(() => {
    document.title = 'zney - Portfolio';
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
      {viewMode === 'intro' ? (
        <IntroPage
          onEnterWorkspace={() => setViewMode('workspace')}
          lang={lang}
          onToggleLang={toggleLang}
        />
      ) : (
        <ModelAnalyzer
          onBackToIntro={() => setViewMode('intro')}
          lang={lang}
        />
      )}
    </div>
  );
}
