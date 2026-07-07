# psy-zney.github.io — Interactive Cyber Workspace Portfolio

Portfolio tương tác của Zney, xây bằng React, TypeScript, Vite, Three.js và Tailwind CSS. Website có intro page, workspace 3D dùng `main.glb`, màn hình máy tính trong model phát GIF, loading có audio, desktop overlay tương tác, bàn phím cơ có LED và âm thanh CherryMX Black PBT.

## Tính năng chính

- Intro landing page song ngữ Việt/Anh.
- Workspace 3D bằng React Three Fiber/Drei, load model `public/main.glb`.
- Nền vũ trụ equirectangular và hệ sao nhấp nháy bằng `THREE.Points`.
- Màn hình máy tính trong `main.glb` dùng `public/screenDesktop.gif` làm texture động.
- Hover object có outline/glow kiểu game bằng `EffectComposer` + `OutlinePass`.
- Click màn hình mở hiệu ứng transition rồi vào desktop overlay, không zoom camera thô.
- Desktop overlay dạng pixel/arcade, có mini game, dock, keyboard/mouse UI.
- Bàn phím cơ DOM/CSS với LED modes: wave, press, ripple, off.
- Tay mèo chạm đúng phím theo vị trí key thật, chỉ hoạt động khi bấm phím.
- Âm thanh phím cơ dùng sound pack Mechvibes CherryMX Black PBT trong `public/sounds/cherrymx-black-pbt`.
- Loading screen có progress mượt và phát `public/Intro.mp3` khi vào workspace.
- Deploy tự động lên GitHub Pages bằng GitHub Actions Node 24.

## Tech stack

| Phần | Công nghệ |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build | Vite |
| 3D | Three.js, React Three Fiber, Drei |
| Post-processing | EffectComposer, OutlinePass |
| UI/CSS | Tailwind CSS + custom CSS |
| Motion | GSAP/CSS animation |
| Audio | HTMLAudioElement + Web Audio API |
| Deploy | GitHub Actions + GitHub Pages |

## Cấu trúc quan trọng

```text
psy-zney.github.io/
├─ public/
│  ├─ main.glb                         # Model workspace chính đang được load
│  ├─ scene-v2.glb                     # Asset phụ/chưa dùng trực tiếp trong code hiện tại
│  ├─ screenDesktop.gif                # GIF hiển thị trên màn hình máy tính trong main.glb
│  ├─ Intro.mp3                        # Nhạc loading khi vào workspace
│  ├─ deep-space-panorama.png          # Background panorama vũ trụ
│  └─ sounds/cherrymx-black-pbt/       # Sound pack phím cơ
├─ src/
│  ├─ App.tsx                          # Điều hướng intro/workspace, preload/phát intro audio
│  ├─ components/
│  │  ├─ IntroPage.tsx                 # Landing page
│  │  ├─ ModelAnalyzer.tsx             # Scene 3D, loader, outline, screen transition
│  │  └─ DesktopOverlay.tsx            # Desktop 2D, mini game, keyboard, mouse, LED, key sound
│  ├─ utils/audioPreloader.ts          # Preload và phát Intro.mp3
│  ├─ main.tsx
│  └─ index.css                        # Style toàn cục, overlay, keyboard, LED, animation
├─ .github/workflows/deploy.yml        # GitHub Pages deploy workflow
├─ package.json
└─ vite.config.ts
```

## Chạy local

```bash
npm install
npm run dev
```

Mở trình duyệt tại:

```text
http://localhost:5173
```

## Build kiểm tra production

```bash
npm run build
npm run preview
```

Nếu chỉ cần kiểm tra TypeScript nhanh:

```bash
npx tsc -b --pretty false
```

## Ghi chú asset

- Không xoá `public/main.glb` khi chưa đổi code, vì `ModelAnalyzer.tsx` vẫn dùng:

```ts
useGLTF('./main.glb')
```

- GIF màn hình chính là `public/screenDesktop.gif`. Nếu thay GIF khác, giữ tỉ lệ gần 16:9 để không bị méo.
- `Intro.mp3` được phát từ click vào workspace để tránh browser chặn autoplay.
- Sound pack phím cơ dùng file `config.json` + `sound.ogg` theo format Mechvibes.

## Deploy

Push lên branch chính sẽ kích hoạt GitHub Actions và deploy GitHub Pages.

```bash
git add .
git commit -m "your message"
git push
```

## Tác giả

Designed and engineered by Zney / @psy-zney.