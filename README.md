# Jack -- 3D Creator

Landing page portfolio cho "Jack", duoc xay dung bang React, TypeScript, Tailwind CSS, Framer Motion va Lucide React.

## Gioi thieu

Du an nay la mot landing page portfolio phong cach dark, tap trung vao trai nghiem thi giac manh voi:

- Hero section typography lon va portrait 3D o trung tam
- Marquee anh dong theo scroll
- About section voi hieu ung text reveal theo ky tu
- Services section trinh bay dich vu ro rang, toi gian
- Projects section dang sticky stacking cards

## Cong nghe su dung

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Google Fonts: Kanit

## Chay local

Yeu cau:

- Node.js 18 tro len
- npm

Cai dependencies:

```bash
npm install
```

Chay moi truong dev:

```bash
npm run dev
```

Mac dinh app chay tai:

```text
http://127.0.0.1:5173
```

## Build production

```bash
npm run build
```

Preview ban build:

```bash
npm run preview
```

## Cau truc chinh

```text
src/
  App.tsx       # Toan bo landing page va reusable components
  index.css     # Global styles, reset, hero gradient text
  main.tsx      # Entry point React
```

## Ghi chu

- Repo nay dang dung Vite + React theo huong SPA.
- Thu muc `dist/` va `node_modules/` da duoc bo qua trong `.gitignore`.
- Cac hinh anh hien tai dang duoc load tu remote URLs.
