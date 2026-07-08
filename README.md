# Sugar & Sylhet — Artisan Cake Studio
<img width="1280" height="716" alt="image" src="https://github.com/user-attachments/assets/3d6b98e2-ef81-487c-b607-018589f81ee8" />
https://cake-e-commerce-website-henna.vercel.app/

A modern, editorial-style single-page site for a home-based premium cake studio in **Sylhet, Bangladesh**. Built with React + Vite + TypeScript, Tailwind CSS, Framer Motion, Lenis (smooth scroll), and Embla Carousel.

## Features
- Three cake collections — **Bridal**, **Birthday**, **Anniversary** — plus a bonus **Diwali / Festive** section
- Working cart drawer with weight selector, add-ons (birthday), live subtotal/delivery/total
- **WhatsApp checkout** — pre-fills a full order summary into `wa.me/8801926240062`
- Custom cursor, magnetic buttons, smooth scroll, grain overlay, scroll-reveal motion
- Mobile bottom-sheet cart, sticky transparent → solid navbar
- Fully responsive, lazy-loaded images, SEO meta + Open Graph
- AI assistant stub (`// TODO: AI Assistant integration — coming soon`) in `src/App.tsx`

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produces dist/
npm run preview  # serves dist/ locally
```

## Edit prices / menu
All pricing, weights, and add-ons live in a **single file**:
```
src/data/cakes.ts
```
Add or change cakes there — no UI work needed.

## Deploy to Vercel
1. Push to GitHub.
2. Import the repo in Vercel — it'll auto-detect Vite. No environment variables needed.
3. `vercel.json` is included with the SPA rewrite rule (single-page app).

## Contact
- WhatsApp: **01926240062**
- Email: **bikashtalukder040@gmail.com**
- Studio: **Sylhet, Bangladesh**
- Designed & developed by **Engineer Bikash Talukder**
