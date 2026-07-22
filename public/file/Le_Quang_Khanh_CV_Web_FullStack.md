# LE QUANG KHANH
### Full-Stack Web Developer Intern

Ho Chi Minh City, Vietnam · [lequangkhanh295@gmail.com](mailto:lequangkhanh295@gmail.com) · [github.com/psy-zney](https://github.com/psy-zney) · [zney295.id.vn](https://zney295.id.vn)

---

## Summary

Full-Stack Web Developer with project experience across React/Node.js applications, including a multi-tenant SaaS platform deployed on AWS and a self-hosted real-time system using WebSocket and Cloudflare infrastructure. Comfortable working across frontend, backend, and database layers.

---

## Education

**University of Economics Ho Chi Minh City (UEH)**
*B.S. in Information Technology — Ho Chi Minh City, Vietnam* · GPA: 2.9/4.0
Expected Aug 2027

**Relevant Coursework:** Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Web Development, Information Security, Cloud Computing

---

## Technical Projects

### Cloud POS SaaS — Multi-Tenant Point-of-Sale Platform *(Team Project)*
*2026 · Demo: [pos.zney295.id.vn](https://pos.zney295.id.vn/)*

- Contributed to a multi-tenant SaaS POS system (React/Vite, Node.js/Express, MySQL) deployed on AWS with EC2, RDS, Nginx, and PM2.
- Built the checkout and payment flow, including cart persistence and payment-method-dependent UI logic.
- Implemented inventory movement tracking and resolved a MySQL prepared-statement error affecting the inventory list query.
- Fixed database migration issues, including foreign key constraints and MySQL compatibility.

**Tech stack:** React, Vite, Node.js, Express, MySQL, JWT, AWS (EC2, RDS, SES), Nginx, PM2

### Security Core — Cross-Platform Remote Security System
*Jan 2026 – Mar 2026 · Demo: [zney295.id.vn/Security](https://zney295.id.vn/Security/)*

- Designed a 4-module remote security system for Windows PCs: a Rust background service (SYSTEM privileges), a Tauri/React desktop management app, a React Native/Expo mobile control app, and a Node.js/Socket.IO cloud relay.
- Implemented HMAC-signed, time-limited commands between mobile and PC to prevent replay attacks.
- Built remote actions including PC lock, USB port blocking, and webcam capture, with OTP confirmation for sensitive operations.
- Implemented an offline command queue on the relay server (up to 50 buffered commands) delivered once the PC reconnects, and QR-code based pairing between the mobile and desktop apps.

**Tech stack:** Rust, Tauri, React, React Native/Expo, Node.js, Socket.IO, Named Pipes, WebSocket

### BeatSync — Self-Hosted Multi-Device Audio Sync Platform
*May 2026 – Present*

- Built and self-host a web application for synchronized audio playback across multiple devices, using a Next.js/React client and a Bun WebSocket server.
- Migrated audio storage from local filesystem to Cloudflare R2, using presigned upload URLs and CDN delivery to remove server bandwidth bottlenecks.
- Host the backend on local hardware, exposed to the internet through Cloudflare Tunnels.
- Implemented a YouTube-to-audio ingestion flow so users can add tracks to synchronized listening sessions.

**Tech stack:** Next.js, React, Bun, WebSocket, Cloudflare R2, Cloudflare Tunnels, Zustand, Tailwind CSS

### Mandy Crimson — Order Label Generator
*2026 · Demo: [zney295.id.vn/mandycrimson](https://zney295.id.vn/mandycrimson/)*

- Built a web tool that imports customer orders from Excel spreadsheets, matching column headers across English and Vietnamese formats.
- Parses raw product-line text into structured order items and generates printable labels/receipts for pickup and international shipping.
- Deployed as a static site for a small business client.

**Tech stack:** React, TypeScript, Vite, xlsx

---

## Skills

| Category | Details |
|---|---|
| **Languages** | JavaScript, TypeScript, Rust, PHP, SQL, HTML/CSS |
| **Backend** | Node.js, Express.js, REST APIs, JWT Auth, WebSocket, Socket.IO, MySQL, MongoDB |
| **Frontend** | React, Next.js, Tailwind CSS, Vite, Zustand |
| **Cloud & DevOps** | AWS (EC2, RDS, SES), Cloudflare (R2, Tunnels), Nginx, PM2, GitHub Pages |
| **Tools & Concepts** | Git, GitHub, Data Structures & Algorithms, OOP, Database Design |
