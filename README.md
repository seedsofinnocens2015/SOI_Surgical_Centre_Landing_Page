# Seeds of Innocence Surgical Centre

This is the standalone Next.js web application for the **Seeds of Innocence Surgical Centre** landing page (domain: `https://soisurgicalcentre.seedsofinnocens.com/`).

## Features
- **100% Identical UI/UX & Content**: High-converting laparoscopic and hysteroscopic surgical landing page.
- **Full Form Integration**:
  - Hero consultation form
  - Surgical consultation popup modal
  - Dedicated bottom contact & appointment booking form
  - Server-side API proxy (`/api/new-website/[...slug]`) forwarding to backend with zero CORS issues
  - Automated redirection to `/thank-you?type=appointment` with Google Ads conversion event tracking
- **Smooth Navigation**: In-page smooth scrolling to treatments, why choose us, doctor profiles, testimonials, and contact section.
- **Daycare Minimally Invasive Care Highlights**: Advanced Karl Storz 4K/3D OT, day-care discharge, fertility preservation focus.

## Local Development

Install dependencies:
```bash
npm install
```

Start the local development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Push this folder to a GitHub/GitLab repository (or import into Vercel).
2. Framework Preset: **Next.js**
3. Build Command: `npm run build`
4. Output Directory: `.next`
5. Connect your custom domain: `soisurgicalcentre.seedsofinnocens.com` (with CNAME pointing to `cname.vercel-dns.com`).
