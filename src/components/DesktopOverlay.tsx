import React, { useEffect, useRef, useState } from 'react';

type KeySpec = { label: string; code: string; width?: number };

const KEY_ROWS: KeySpec[][] = [
  [
    { label: 'ESC', code: 'Escape' }, { label: '1', code: 'Digit1' },
    { label: '2', code: 'Digit2' }, { label: '3', code: 'Digit3' },
    { label: '4', code: 'Digit4' }, { label: '5', code: 'Digit5' },
    { label: '6', code: 'Digit6' }, { label: '7', code: 'Digit7' },
    { label: '8', code: 'Digit8' }, { label: '9', code: 'Digit9' },
    { label: '0', code: 'Digit0' }, { label: 'DEL', code: 'Backspace', width: 1.6 },
  ],
  [
    { label: 'TAB', code: 'Tab', width: 1.35 },
    ...'QWERTYUIOP'.split('').map((label) => ({ label, code: `Key${label}` })),
    { label: '\\', code: 'Backslash', width: 1.25 },
  ],
  [
    { label: 'CAPS', code: 'CapsLock', width: 1.65 },
    ...'ASDFGHJKL'.split('').map((label) => ({ label, code: `Key${label}` })),
    { label: 'ENTER', code: 'Enter', width: 1.85 },
  ],
  [
    { label: 'SHIFT', code: 'ShiftLeft', width: 2.1 },
    ...'ZXCVBNM'.split('').map((label) => ({ label, code: `Key${label}` })),
    { label: 'SHIFT', code: 'ShiftRight', width: 2.1 },
  ],
  [
    { label: 'CTRL', code: 'ControlLeft', width: 1.3 },
    { label: 'ALT', code: 'AltLeft', width: 1.2 },
    { label: 'SPACE', code: 'Space', width: 6.2 },
    { label: 'ALT', code: 'AltRight', width: 1.2 },
    { label: 'CTRL', code: 'ControlRight', width: 1.3 },
  ],
];

const LEFT_PAW_CODES = new Set([
  'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT',
  'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG',
  'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB',
  'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5',
  'ShiftLeft', 'ControlLeft', 'AltLeft', 'Tab', 'CapsLock'
]);

type LedMode = 'violet' | 'cyan' | 'rose' | 'rainbow' | 'off';

const LED_MODES: Array<{ id: LedMode; label: string; color: string }> = [
  { id: 'violet', label: 'Violet', color: '#8b5cf6' },
  { id: 'cyan', label: 'Cyan', color: '#22d3ee' },
  { id: 'rose', label: 'Rose', color: '#f472b6' },
  { id: 'rainbow', label: 'Rainbow', color: '#a78bfa' },
  { id: 'off', label: 'Off', color: 'transparent' },
];

interface DesktopOverlayProps {
  onExit: () => void;
  lang: 'vie' | 'eng';
}

export function DesktopOverlay({ onExit, lang }: DesktopOverlayProps) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(() => new Set());
  const [typedText, setTypedText] = useState('');
  const [allSelected, setAllSelected] = useState(false);
  const [mouseButton, setMouseButton] = useState<'left' | 'right' | null>(null);
  const [ledMode, setLedMode] = useState<LedMode>('violet');
  const [ledBrightness, setLedBrightness] = useState(72);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const pointerRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const typedTextRef = useRef(typedText);
  const allSelectedRef = useRef(allSelected);
  const clickBufferRef = useRef<AudioBuffer | null>(null);
  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;
  typedTextRef.current = typedText;
  allSelectedRef.current = allSelected;

  const playMechanicalClick = React.useCallback(() => {
    if (!soundEnabledRef.current || typeof AudioContext === 'undefined') return;

    const context = audioContextRef.current ?? new AudioContext();
    audioContextRef.current = context;
    if (context.state === 'suspended') void context.resume();

    if (!clickBufferRef.current) {
      const sampleCount = Math.floor(context.sampleRate * 0.022);
      const buffer = context.createBuffer(1, sampleCount, context.sampleRate);
      const samples = buffer.getChannelData(0);
      for (let index = 0; index < sampleCount; index += 1) {
        const envelope = 1 - index / sampleCount;
        samples[index] = (Math.random() * 2 - 1) * envelope * envelope;
      }
      clickBufferRef.current = buffer;
    }

    const now = context.currentTime;
    const noise = context.createBufferSource();
    const noiseFilter = context.createBiquadFilter();
    const noiseGain = context.createGain();
    noise.buffer = clickBufferRef.current;
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1800 + Math.random() * 350;
    noiseFilter.Q.value = 0.8;
    noiseGain.gain.setValueAtTime(0.045, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);
    noise.connect(noiseFilter).connect(noiseGain).connect(context.destination);

    const switchTone = context.createOscillator();
    const toneGain = context.createGain();
    switchTone.type = 'square';
    switchTone.frequency.setValueAtTime(145 + Math.random() * 24, now);
    switchTone.frequency.exponentialRampToValueAtTime(90, now + 0.045);
    toneGain.gain.setValueAtTime(0.022, now);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    switchTone.connect(toneGain).connect(context.destination);

    noise.start(now);
    noise.stop(now + 0.03);
    switchTone.start(now);
    switchTone.stop(now + 0.055);
  }, []);

  useEffect(() => {
    const clearSelection = () => {
      allSelectedRef.current = false;
      setAllSelected(false);
    };

    const keyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest('[data-native-cursor]')) return;

      const modifierPressed = event.ctrlKey || event.metaKey;
      if (event.code === 'Space' || event.code === 'Tab' || event.code === 'Backspace') {
        event.preventDefault();
      }

      setPressedKeys((current) => new Set(current).add(event.code));

      if (modifierPressed && event.code === 'KeyA') {
        event.preventDefault();
        if (!event.repeat) playMechanicalClick();
        const hasText = typedTextRef.current.length > 0;
        allSelectedRef.current = hasText;
        setAllSelected(hasText);
        return;
      }

      if (modifierPressed && event.code === 'KeyV') {
        if (!event.repeat) playMechanicalClick();
        return;
      }

      if (modifierPressed) return;

      if (event.code === 'Backspace') {
        playMechanicalClick();
        const removeAll = allSelectedRef.current;
        clearSelection();
        setTypedText((value) => removeAll ? '' : value.slice(0, -1));
        return;
      }

      if (event.repeat) return;
      playMechanicalClick();

      if (event.key.length === 1) {
        const replaceSelection = allSelectedRef.current;
        clearSelection();
        setTypedText((value) => (replaceSelection ? event.key : value + event.key).slice(-96));
      } else if (event.code === 'Enter') {
        const replaceSelection = allSelectedRef.current;
        clearSelection();
        setTypedText((value) => (replaceSelection ? '\n' : value + '\n').slice(-96));
      }
    };

    const keyUp = (event: KeyboardEvent) => {
      setPressedKeys((current) => {
        const next = new Set(current);
        next.delete(event.code);
        return next;
      });
    };

    const paste = (event: ClipboardEvent) => {
      if ((event.target as HTMLElement).closest('[data-native-cursor]')) return;
      const clipboardText = event.clipboardData?.getData('text/plain') ?? '';
      if (!clipboardText) return;
      event.preventDefault();
      const replaceSelection = allSelectedRef.current;
      clearSelection();
      setTypedText((value) => (replaceSelection ? clipboardText : value + clipboardText).slice(-96));
    };

    const clearKeys = () => setPressedKeys(new Set());
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    window.addEventListener('paste', paste);
    window.addEventListener('blur', clearKeys);
    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
      window.removeEventListener('paste', paste);
      window.removeEventListener('blur', clearKeys);
    };
  }, [playMechanicalClick]);

  useEffect(() => {
    return () => {
      const context = audioContextRef.current;
      if (context && context.state !== 'closed') void context.close();
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = workspaceRef.current?.getBoundingClientRect();
    if (!bounds || !pointerRef.current) return;
    pointerRef.current.style.transform = `translate3d(${event.clientX - bounds.left}px, ${event.clientY - bounds.top}px, 0)`;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('[data-native-cursor]')) return;
    setMouseButton(event.button === 2 ? 'right' : 'left');
  };

  const activeLed = LED_MODES.find((mode) => mode.id === ledMode) ?? LED_MODES[0];
  const ledStyle = {
    '--keyboard-led': activeLed.color,
    '--led-strength': ledMode === 'off' ? '0%' : ledBrightness + '%',
    '--led-blur': 5 + ledBrightness * 0.12 + 'px',
  } as React.CSSProperties;

  const pressedCodes = Array.from(pressedKeys);
  const leftPressedCodes = pressedCodes.filter((code) => LEFT_PAW_CODES.has(code));
  const rightPressedCodes = pressedCodes.filter((code) => !LEFT_PAW_CODES.has(code));
  const pawLiftFor = (codes: string[]) => {
    const rows = codes
      .map((code) => KEY_ROWS.findIndex((row) => row.some((key) => key.code === code)))
      .filter((row) => row >= 0);
    const highestRow = rows.length ? Math.min(...rows) : 4;
    return [-132, -105, -78, -50, -27][highestRow] + 'px';
  };
  const leftPawPressed = leftPressedCodes.length > 0;
  const rightPawPressed = rightPressedCodes.length > 0;
  const leftPawStyle = { '--paw-lift': pawLiftFor(leftPressedCodes) } as React.CSSProperties;
  const rightPawStyle = { '--paw-lift': pawLiftFor(rightPressedCodes) } as React.CSSProperties;
  const isVie = lang === 'vie';

  return (
    <div className="desktop-overlay" aria-label={isVie ? 'Không gian desktop tương tác' : 'Interactive desktop workspace'}>
      <div
        ref={workspaceRef}
        className="desktop-workspace"
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={() => setMouseButton(null)}
        onPointerCancel={() => setMouseButton(null)}
        onContextMenu={(event) => event.preventDefault()}
      >
        <div ref={pointerRef} className={`virtual-pointer ${mouseButton ? 'is-clicking' : ''}`} aria-hidden="true"><span /></div>

        <header className="desktop-topbar">
          <div className="desktop-brand"><span className="desktop-brand-mark">Z</span><span>ZNEY OS</span></div>
          <div className="desktop-status"><span>WEBGL ONLINE</span><span>LOCAL SESSION</span></div>
          <button type="button" className="desktop-exit" onClick={onExit} data-native-cursor>
            {isVie ? 'Rời màn hình' : 'Exit screen'}
          </button>
        </header>

        <main className="desktop-monitor">
          <nav className="desktop-dock" aria-label="Workspace tools">
            {['01', '02', '03', '04'].map((item, index) => (
              <button key={item} type="button" className={index === 0 ? 'is-active' : ''} data-native-cursor>{item}</button>
            ))}
          </nav>

          <section className="desktop-content">
            <div className="desktop-heading">
              <p>{isVie ? 'Không gian đang hoạt động' : 'Active workspace'}</p>
              <h1>{isVie ? 'Gõ để đánh thức hệ thống.' : 'Type to wake the system.'}</h1>
            </div>

            <div className="terminal-grid">
              <article className="terminal-panel terminal-main">
                <div className="terminal-bar"><span>INPUT STREAM</span><span>{String(typedText.length).padStart(2, '0')} CHAR</span></div>
                <pre className={typedText ? 'has-input' : ''}>
                  {typedText ? (
                    <span className={allSelected ? 'terminal-selection' : ''}>{typedText}</span>
                  ) : (
                    isVie ? 'Bắt đầu gõ trên bàn phím của bạn...' : 'Start typing on your keyboard...'
                  )}
                  <span className="terminal-caret" />
                </pre>
              </article>

              <aside className="terminal-panel system-panel">
                <div className="terminal-bar"><span>SYSTEM</span><span>READY</span></div>
                <dl>
                  <div><dt>RENDER</dt><dd>THREE.JS</dd></div>
                  <div><dt>INPUT</dt><dd>LIVE</dd></div>
                  <div><dt>LATENCY</dt><dd>LOCAL</dd></div>
                </dl>
                <div className="led-controller">
                  <div className="led-controller-heading">
                    <span>KEYBOARD LED</span>
                    <button
                      type="button"
                      className={'sound-toggle ' + (soundEnabled ? 'is-on' : '')}
                      onClick={() => setSoundEnabled((value) => !value)}
                      aria-pressed={soundEnabled}
                      data-native-cursor
                    >
                      {soundEnabled ? 'SOUND ON' : 'SOUND OFF'}
                    </button>
                  </div>
                  <div className="led-presets" aria-label="Keyboard LED color">
                    {LED_MODES.map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        className={ledMode === mode.id ? 'is-active' : ''}
                        onClick={() => setLedMode(mode.id)}
                        aria-label={mode.label}
                        aria-pressed={ledMode === mode.id}
                        title={mode.label}
                        data-mode={mode.id}
                        data-native-cursor
                      >
                        <span style={{ background: mode.color }} />
                      </button>
                    ))}
                  </div>
                  <label className="led-brightness">
                    <span>BRIGHTNESS</span>
                    <input
                      type="range"
                      min="15"
                      max="100"
                      value={ledBrightness}
                      onChange={(event) => setLedBrightness(Number(event.target.value))}
                      disabled={ledMode === 'off'}
                      data-native-cursor
                    />
                    <output>{ledBrightness}%</output>
                  </label>
                </div>
              </aside>
            </div>
          </section>
        </main>

        <section className="device-deck" data-led-mode={ledMode} style={ledStyle} aria-label={isVie ? 'Bàn phím và chuột mô phỏng' : 'Simulated keyboard and mouse'}>
          <div className="keyboard-shell">
            <div className="keyboard-grid">
              {KEY_ROWS.map((row, rowIndex) => (
                <div className="keyboard-row" key={rowIndex}>
                  {row.map((key, keyIndex) => (
                    <div
                      key={`${key.code}-${keyIndex}`}
                      className={`key-node ${pressedKeys.has(key.code) ? 'key-pressed' : ''}`}
                      style={{
                        '--key-width': key.width ?? 1,
                        '--key-index': rowIndex * 16 + keyIndex,
                        '--key-delay': -((rowIndex * 16 + keyIndex) * 52) + 'ms',
                        '--key-led': ledMode === 'rainbow'
                          ? 'hsl(' + ((rowIndex * 16 + keyIndex) * 29 % 360) + ' 88% 64%)'
                          : activeLed.color,
                      } as React.CSSProperties}
                    >{key.label}</div>
                  ))}
                </div>
              ))}
            </div>

            <div className="cat-paws" aria-hidden="true">
              <div className={'cat-paw cat-paw-left ' + (leftPawPressed ? 'is-pressing' : '')} style={leftPawStyle}>
                <span className="cat-arm" />
                <span className="cat-pad">
                  <i className="cat-toe toe-one" />
                  <i className="cat-toe toe-two" />
                  <i className="cat-toe toe-three" />
                  <i className="cat-bean" />
                </span>
              </div>
              <div className={'cat-paw cat-paw-right ' + (rightPawPressed ? 'is-pressing' : '')} style={rightPawStyle}>
                <span className="cat-arm" />
                <span className="cat-pad">
                  <i className="cat-toe toe-one" />
                  <i className="cat-toe toe-two" />
                  <i className="cat-toe toe-three" />
                  <i className="cat-bean" />
                </span>
              </div>
            </div>
          </div>

          <div className="mouse-shell" aria-hidden="true">
            <div className={`mouse-button mouse-left ${mouseButton === 'left' ? 'is-active' : ''}`} />
            <div className={`mouse-button mouse-right ${mouseButton === 'right' ? 'is-active' : ''}`} />
            <div className="mouse-wheel" /><div className="mouse-led" />
          </div>
        </section>
      </div>
    </div>
  );
}
