# 🚀 @psy-zney — Interactive 2.5D Cyberpunk Creator Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub_Pages-Deployed-222222?style=for-the-badge&logo=github&logoColor=white" />
</p>

An agency-grade, highly interactive **2.5D Architectural & Cyberpunk Creator Portfolio** built for **Zney (@psy-zney)**. Engineered with uncompromising attention to aesthetics, tactile UI physics, and ultra-lightweight performance, this web application fuses lo-fi cyberpunk art direction with modern React web engineering.

---

## ✨ Why 2.5D Over Heavy 3D (.GLB)?

In early iterations, the workspace relied on loading an **84.36 MB Three.js `.GLB` 3D model** over the wire. While smooth on local SSDs (`0ms` latency), fetching and parsing 84 MB of binary geometry geometry over CDN caused severe main-thread blocking and frame drops on GitHub Pages.

**The Agency-Grade Solution:** We re-architected the 3D room into an **ultra-lightweight 2.5D Isometric DOM & CSS Perspective Console**.
- **Zero-Lag Bundle Size:** Reduced 3D payload from **84.36 MB down to ~69 KB** (over **99.9% reduction in weight**).
- **Instantaneous 60 FPS:** Eliminates WebGL parsing bottlenecks and CPU garbage collection spikes, delivering butter-smooth 60 FPS rendering across desktops, tablets, and mobile devices.
- **Rich Tactile Interactions:** Retains the artistic cyberpunk workstation atmosphere with interactive desk cards, RGB LED rings, spinning cooling fans, and floating starfield particles.

---

## 🎨 Key Features & Architectural Highlights

### 🖥️ 1. Interactive 2.5D Workstation Console
Experience an interactive cyber desk featuring 3 dedicated station cards that launch high-end modals instantly:
- **📄 CV & Timeline Station (`ModalCV`):** A comprehensive interactive resume detailing full-stack web engineering, algorithms, and security experience, equipped with one-click resume download.
- **🏷️ Lanyard Card Station (`ModalLanyard`):** A custom interactive Discord ID Lanyard Badge with live online status indicators and glowing cyberpunk aesthetics.
- **📚 Open Source Bookshelf (`ModalBookshelf`):** An agency-grade **Asymmetric Bento Grid** showcasing featured repositories and experimental software.

### 🍱 2. Agency-Grade Asymmetric Bento Grid
Designed using anti-slop **Design Taste** principles (`design-taste-frontend`), the Bookshelf archive breaks monotonous grid repetition with visual diversity and tactile micro-physics:
- **Featured Span Showcase:** The core portfolio repository (`psy-zney.github.io`) spans full width with a glowing active deployment badge (`● ACTIVE LIVE PORTFOLIO`).
- **Live Audio Equalizer Motif:** The `beatsync` real-time music collaborative room features an animated 3-bar CSS equalizer (`eq-pulse`) pulsing directly on the card.
- **Terminal & Syntax Motifs:** Repositories like `Security` and `AI_Hill_Climbing_TSP` feature specialized syntax tags (`$ sudo guard` and `def tsp():`) representing their domain.
- **Tactile Hover Physics:** Hardware-accelerated hover elevations (`-translate-y-[3px]`), dynamic border glow, and diagonal arrow translation (`↗`).

### ⚡ 3. Zero-Lag Asymptotic Wave Loader
To prevent the common "98% freeze" perception during network fetches:
- **Asymptotic Progression Curve:** Custom algorithm ensures the percentage counter and progress bar continuously climb without freezing (`83% -> 85% -> 87%... -> 99%`), ensuring visual responsiveness at all times.
- **Shimmering Wave Progress Bar:** An active light wave (`progress-shimmer`) passes along the progress bar accompanied by a pulsating glowing particle head (`pulse-glow`) and monochrome typography wave loader (`.loader`).

### 🌐 4. Bilingual Adaptive UI & Cyberpunk Atmosphere
- **Instant Localization:** Seamless toggle between Vietnamese (**VN**) and English (**EN**) across all landing sections, workstation consoles, and modals.
- **Lo-Fi Cyberpunk Atmosphere:** Ambient RGB LED glow filters, custom animated cat mascot (**🐱 Debug Cat**), responsive landscape orientation overlays for mobile devices, and atmospheric space particles (`twinkle`).

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Core Framework** | [React 18.3](https://react.dev/) + [TypeScript 5.5](https://www.typescriptlang.org/) |
| **Build & Bundler** | [Vite 5.4](https://vitejs.dev/) (Optimized Tree-shaking & Rollup Chunks) |
| **Styling & Layout** | [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom CSS 3D Perspective Transforms |
| **Motion & Physics** | [Framer Motion](https://www.framer.com/motion/) + Native CSS Hardware Acceleration |
| **3D & WebGL Primitives**| [Three.js](https://threejs.org/) & [React Three Fiber / Drei](https://docs.pmnd.rs/react-three-fiber/) |
| **Icons & Typography** | [Lucide React](https://lucide.dev/) + Google Fonts (`Outfit`, `JetBrains Mono`, `Kanit`) |
| **CI/CD Pipeline** | GitHub Actions Automated Build & Deploy to GitHub Pages |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm, pnpm, or yarn

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

---

## 📂 Codebase Architecture

```text
psy-zney.github.io/
├── src/
│   ├── components/
│   │   ├── IntroPage.tsx      # Main editorial landing page, hacker marquee & interactive hero
│   │   └── ModelAnalyzer.tsx  # 2.5D Workstation Console, ModalBookshelf, ModalCV & Wave Loader
│   ├── App.tsx                # Application root, bilingual state & mobile landscape overlay
│   ├── main.tsx               # React DOM initialization
│   └── index.css              # Global styles, Tailwind utilities & custom keyframe shaders
├── public/
│   ├── avatar.png             # 3D portrait asset
│   └── icon_web.jpg           # Custom site favicon
├── .github/
│   └── workflows/
│       └── deploy.yml         # Automated CI/CD GitHub Pages deployment workflow
├── package.json               # Project scripts and dependencies
└── vite.config.ts             # Vite bundler configuration
```

---

## 🌟 Featured Open Source Repositories (@psy-zney)

- **[psy-zney.github.io](https://github.com/psy-zney/psy-zney.github.io)** — Interactive real-time 3D desk & hacker glitch portfolio web application.
- **[beatsync](https://github.com/psy-zney/beatsync)** — Listen to music in real-time sync with friends across interactive web rooms with WebRTC audio.
- **[Security](https://github.com/psy-zney/Security)** — Cloud relay server & automated Windows security monitoring daemon for proactive system protection.
- **[LearningEnglish](https://github.com/psy-zney/LearningEnglish)** — Intelligent language acquisition app featuring automated AI tense verification and sentence parsing.
- **[AI_Hill_Climbing_TSP](https://github.com/psy-zney/AI_Hill_Climbing_TSP)** — Artificial Intelligence heuristic algorithms solving the Traveling Salesperson Problem using Hill Climbing.
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
