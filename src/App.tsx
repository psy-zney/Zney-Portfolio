import React, { useState } from 'react';
import { ModelAnalyzer } from './components/ModelAnalyzer';
import { IntroPage } from './components/IntroPage';

export default function App() {
  const [viewMode, setViewMode] = useState<'intro' | 'workspace'>('intro');
  const [lang, setLang] = useState<'vie' | 'eng'>('vie');

  const toggleLang = () => setLang((prev) => (prev === 'vie' ? 'eng' : 'vie'));

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
