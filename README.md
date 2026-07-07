# 🚀 @psy-zney — Interactive Cyberpunk 3D Creator Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub_Pages-Deployed-222222?style=for-the-badge&logo=github&logoColor=white" />
</p>

An agency-grade, highly interactive **Cyberpunk 3D Creator Portfolio** built for **Zney (@psy-zney)**. The project combines a cinematic Three.js workspace, tactile desktop interactions, bilingual content, custom audio, and a polished arcade-inspired overlay experience.

---

## ✨ Current Experience Direction

The portfolio now runs as a hybrid experience: a real-time WebGL workspace powered by `main.glb`, supported by carefully scoped DOM overlays for high-fidelity UI moments.

- **3D Workspace Foundation:** The main environment is loaded from `public/main.glb` via React Three Fiber and Drei.
- **Animated In-Model Monitor:** The computer screen inside the GLB uses `public/screenDesktop.gif` as an animated WebGL texture, drawn through a canvas/decoded-frame pipeline for reliable playback.
- **Cinematic Space Atmosphere:** A deep-space panorama and sparse procedural star particles create a dark, minimal cosmic backdrop.
- **Game-Style Interactions:** Raycasting, hover targets, and `OutlinePass` provide precise neon outlines for interactive objects.
- **Non-Destructive Screen Entry:** Clicking the monitor triggers a designed screen-entry transition before showing the 2D desktop overlay, instead of relying on a raw camera zoom.

---

## 🎨 Key Features & Architectural Highlights

### 🖥️ 1. Interactive 3D Workstation Scene

The workspace scene is built around a GLB workstation model and enhanced with runtime interaction logic:

- **Monitor Entry Point:** Clicking the computer screen opens the interactive desktop layer.
- **Object Hover Feedback:** Interactive objects are detected with a raycaster and highlighted through post-processing outlines.
- **Animated Monitor Texture:** `screenDesktop.gif` is rendered onto the monitor surface while preserving the correct orientation and 16:9 presentation.
- **Ambient Loading Audio:** `Intro.mp3` is preloaded and played from a valid user gesture when entering the workspace.

### ⌨️ 2. Interactive Desktop Overlay

After entering the screen, the experience switches to a crisp HTML/CSS overlay for pixel-perfect UI:

- **Arcade Desktop Interface:** A compact pixel-game interface replaces the old text-only typing screen.
- **Keyboard & Mouse Simulation:** Physical keyboard events drive a visual mechanical keyboard and mouse module.
- **Cat Paw Typing Animation:** Cute cat paws reach toward the actual pressed key positions instead of using generic up/down animation.
- **Shortcut Handling:** Common combinations such as `Ctrl/Cmd + A`, `Ctrl/Cmd + V`, and held `Backspace` are handled explicitly.

### 🌈 3. Mechanical Keyboard LED System

The keyboard lighting system is designed around movement, not simple brightness pulsing:

- **Wave Mode:** A continuous RGB sweep runs across the keyboard.
- **Press Mode:** Pressed keys light up instantly.
- **Ripple Mode:** A key press propagates light to nearby keys for a physical LED spread effect.
- **Off Mode:** Disables decorative lighting for a quieter presentation.

### 🔊 4. Mechanical Key Sound Pack

Keyboard audio is powered by a local Mechvibes-style sound pack:

- **Sound Pack:** CherryMX Black - PBT keycaps.
- **Assets:** `public/sounds/cherrymx-black-pbt/config.json` and `sound.ogg`.
- **Playback:** The Web Audio API reads scan-code timing definitions from the config and plays the correct slice from the packed OGG file.
- **Fallback:** A synthetic switch sound is available when the sound pack has not finished decoding.

### ⚡ 5. Smooth Loading System

The loader is tuned to avoid a frozen progress-bar feel:

- **Decoupled Wave Animation:** The loading wave remains visually active even when asset progress is temporarily waiting.
- **Smoothed Percentage Counter:** The visible percentage eases toward real progress instead of jumping or stalling aggressively.
- **Intro Audio:** `Intro.mp3` is preloaded and played during workspace loading, with higher output volume for audibility.

### 🌐 6. Bilingual Adaptive UI & Cyberpunk Atmosphere

- **Default English UI:** The experience starts in English, with Vietnamese available through the language toggle.
- **Responsive Orientation Guard:** Mobile users are prompted to rotate to landscape for the 3D workspace.
- **Lo-Fi Cyberpunk Direction:** Dark neon lighting, starfield motion, glitch details, and tactile micro-interactions define the visual identity.

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Core Framework** | [React 18.3](https://react.dev/) + [TypeScript 5.5](https://www.typescriptlang.org/) |
| **Build & Bundler** | [Vite 5.4](https://vitejs.dev/) |
| **Styling & Layout** | [Tailwind CSS 3.4](https://tailwindcss.com/) + custom CSS |
| **3D & WebGL** | [Three.js](https://threejs.org/) + [React Three Fiber / Drei](https://docs.pmnd.rs/react-three-fiber/) |
| **Post-Processing** | `EffectComposer`, `RenderPass`, `OutlinePass` |
| **Motion** | GSAP, CSS keyframes, requestAnimationFrame |
| **Audio** | HTMLAudioElement + Web Audio API |
| **Icons & Typography** | [Lucide React](https://lucide.dev/) + Google Fonts (`Outfit`, `JetBrains Mono`, `Kanit`) |
| **CI/CD Pipeline** | GitHub Actions Node 24 deployment to GitHub Pages |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 24 is recommended for deployment parity.
- npm, pnpm, or yarn.

### Local Development Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/psy-zney/psy-zney.github.io.git
   cd psy-zney.github.io
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the local development server:**

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Production Build & Verification

To compile TypeScript and generate an optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Fast TypeScript verification:

```bash
npx tsc -b --pretty false
```

---

## 📂 Codebase Architecture

```text
psy-zney.github.io/
├── src/
│   ├── components/
│   │   ├── IntroPage.tsx        # Editorial landing page and language-aware hero
│   │   ├── ModelAnalyzer.tsx    # 3D workspace, GLB loading, monitor texture, loader, transitions
│   │   └── DesktopOverlay.tsx   # Pixel desktop, mechanical keyboard, LED modes, cat paws, key audio
│   ├── utils/
│   │   └── audioPreloader.ts    # Intro.mp3 preload and gesture-safe playback helper
│   ├── App.tsx                  # Intro/workspace routing, language state, mobile landscape guard
│   ├── main.tsx                 # React DOM initialization
│   └── index.css                # Global styles, overlays, keyboard visuals, animation systems
├── public/
│   ├── main.glb                 # Active 3D workspace model
│   ├── scene-v2.glb             # Secondary model asset / experimental scene asset
│   ├── screenDesktop.gif        # Animated monitor texture for the GLB screen
│   ├── Intro.mp3                # Workspace loading audio
│   ├── deep-space-panorama.png  # Equirectangular space background
│   └── sounds/
│       └── cherrymx-black-pbt/  # Mechvibes-style mechanical keyboard sound pack
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages deployment workflow
├── package.json                 # Project scripts and dependencies
└── vite.config.ts               # Vite bundler configuration
```

---

## 🧩 Asset Notes

- `public/main.glb` is still required. `ModelAnalyzer.tsx` loads it with `useGLTF('./main.glb')`.
- `screenDesktop.gif` should stay close to 16:9 for the cleanest monitor fit.
- `Intro.mp3` is started from the workspace entry click to avoid browser autoplay restrictions.
- The keyboard sound pack expects a Mechvibes-compatible `config.json` plus packed `sound.ogg`.

---

## 🌟 Featured Open Source Repositories (@psy-zney)

- **[psy-zney.github.io](https://github.com/psy-zney/psy-zney.github.io)** — Interactive cyberpunk 3D portfolio and workspace experiment.
- **[beatsync](https://github.com/psy-zney/beatsync)** — Listen to music in real-time sync with friends across interactive web rooms with WebRTC audio.
- **[Security](https://github.com/psy-zney/Security)** — Cloud relay server and automated Windows security monitoring daemon for proactive system protection.
- **[LearningEnglish](https://github.com/psy-zney/LearningEnglish)** — Intelligent language acquisition app featuring automated tense verification and sentence parsing.
- **[AI_Hill_Climbing_TSP](https://github.com/psy-zney/AI_Hill_Climbing_TSP)** — Artificial intelligence heuristic algorithms solving the Traveling Salesperson Problem using Hill Climbing.
- **[mandycrimson](https://github.com/psy-zney/mandycrimson)** — Modern full-stack product catalog and interactive presentation web platform.

---

## 👨‍💻 Author & Contact

Designed and engineered by **Zney (@psy-zney)**.

- **GitHub:** [@psy-zney](https://github.com/psy-zney)
- **Facebook:** [psyotic.zney](https://www.facebook.com/psyotic.zney/)

---

<p align="center">
  Made with ❤️ and Cyberpunk Aesthetics by <b>Zney</b>
</p>