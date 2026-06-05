# Šimon Hyben — Portfolio

[![Deploy to GitHub Pages](https://img.shields.io/github/actions/workflow/status/sHyben/shyben.github.io/deploy.yml?branch=master&label=Deploy%20to%20GitHub%20Pages&logo=github)](https://github.com/sHyben/shyben.github.io/actions/workflows/deploy.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)](https://www.typescriptlang.org)

Personal portfolio website for **Šimon Hyben**, Full-Stack Software Developer.
Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.
Deployed as a fully static site on GitHub Pages.

**Live site**: [shyben.github.io](https://shyben.github.io)

---

## Features

- **Bold editorial design** — high-contrast layout with rust/terracotta accent colour
- **Light / dark mode** — toggle with system preference detection and `localStorage` persistence; no flash on load
- **Animated hero section** — staggered Framer Motion entrance animations
- **Projects grid** — responsive 1→3 column grid with hover zoom (scale 1.07), title overlay, and per-card GitHub buttons
- **Project detail pages** — pre-generated static HTML per project (direct URLs work without a server)
- **About section** — bio + categorised skills grid (7 categories)
- **Contact section** — four info cards: Email, LinkedIn, GitHub, Location
- **Resume download** — single-click PDF download (graceful disabled state when file absent)
- **Accessible** — WCAG 2.1 AA: skip-nav, aria-labels, keyboard focus rings, `prefers-reduced-motion` respected
- **GitHub Pages ready** — fully static, no server required; deployed automatically via GitHub Actions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, `output: 'export'`) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3 + CSS Modules + CSS custom properties |
| Animations | Framer Motion 11 |
| Deployment | GitHub Pages via GitHub Actions |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install and run

```bash
# Clone the repository
git clone https://github.com/shyben/shyben.github.io.git
cd shyben.github.io

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build and preview

```bash
# Build the static site
npm run build

# Preview the static output locally
npx serve out
```

The `out/` directory is the deployable artifact — it's a completely self-contained static site.

---

## Deployment

### Automatic (GitHub Actions)

Every push to `main` triggers the deploy workflow (`.github/workflows/deploy.yml`):

1. Installs dependencies
2. Runs `npm run build`
3. Pushes the `out/` directory to the `gh-pages` branch

**First-time setup:**
1. Go to your repo → **Settings → Pages**
2. Set Source to **Deploy from a branch** → branch: `gh-pages` → folder: `/ (root)`
3. Push to `main` — the action handles everything

### Manual deploy

```bash
npm run build
npx gh-pages -d out
```

### Deploying to a project sub-path

If your site lives at `username.github.io/portfolio` instead of `username.github.io`:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

Set the same env var in `.github/workflows/deploy.yml` under the build step.

---

## Customising Your Portfolio

**All content lives in one file: `src/data/projects.ts`**
No other code files need to change for content updates.

### Add a real project

1. Open `src/data/projects.ts`
2. Add a new object to the `projects` array:

```ts
{
  slug: 'my-project',           // unique, kebab-case — becomes the URL /projects/my-project/
  title: 'My Project',
  shortDescription: 'One or two sentences shown on the card. Max 160 chars.',
  fullDescription: 'Full write-up shown on the detail page.\n\nParagraphs separated by \\n\\n.',
  technologies: ['React', 'TypeScript', 'PostgreSQL'],
  features: [
    'Key feature or accomplishment #1',
    'Key feature or accomplishment #2',
  ],
  thumbnailImage: '/images/projects/my-project.webp',  // or null for placeholder
  screenshots: [],               // optional: [{ src: '/images/...', alt: '...' }]
  githubUrl: 'https://github.com/shyben/my-project',
  demoUrl: 'https://my-project.com',  // or null
  isRealProject: true,
}
```

3. Add the thumbnail: place a `my-project.webp` file in `public/images/projects/`
   *(If `thumbnailImage` is `null`, a diagonal-stripe placeholder renders automatically)*
4. Run `npm run build` to verify the new page is generated

### Remove a project

Delete the object from the `projects` array and remove its thumbnail from `public/images/projects/`.

### Update your bio or contact info

Edit the `personalInfo` object at the top of `src/data/projects.ts`:

```ts
export const personalInfo: PersonalInfo = {
  name: 'Your Name',
  tagline: 'Your Role',
  bio: 'Your bio paragraph 1.\n\nOptional second paragraph.',
  email: 'you@example.com',
  linkedInUrl: 'https://linkedin.com/in/your-profile',
  githubUrl: 'https://github.com/your-username',
  location: 'Your City, Country',
  // ...
};
```

### Add your resume

1. Copy your PDF to `public/resume.pdf`
2. In `src/data/projects.ts`, update:

```ts
resumePdfPath: '/resume.pdf',
```

The Download CV button in the navbar activates automatically. Without the file, it shows a "Resume coming soon" tooltip.

### Add your profile photo

1. Copy your photo to `public/images/profile/profile.webp`
   *(Recommended: square, at least 400×400 px)*
2. In `src/data/projects.ts`, update:

```ts
profilePhotoPath: '/images/profile/profile.webp',
```

### Update skills

Edit the `skillCategories` array inside `personalInfo`. Each entry is:

```ts
{ label: 'Category Name', skills: ['Skill A', 'Skill B', 'Skill C'] }
```

Add, remove, or rename categories freely — the skills grid renders them all automatically.

---

## Project Structure

```
shyben.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment pipeline
├── public/
│   ├── images/
│   │   ├── projects/           # Project thumbnails (<slug>.webp)
│   │   └── profile/            # Profile photo (profile.webp)
│   └── resume.pdf              # CV — add this file to enable download
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout: Navbar, Footer, ThemeProvider, anti-FOWT script
│   │   ├── page.tsx            # Home page (Hero + Projects + About + Contact)
│   │   ├── not-found.tsx       # 404 page
│   │   ├── globals.css         # Tailwind + design token imports
│   │   └── projects/
│   │       └── [slug]/
│   │           └── page.tsx    # Project detail (statically generated per slug)
│   ├── components/
│   │   ├── nav/                # Navbar (sticky, mobile menu, resume button, theme toggle)
│   │   ├── hero/               # Hero section (Framer Motion stagger entrance)
│   │   ├── projects/           # ProjectsGrid, ProjectCard, GitHubButton, ProjectDetail
│   │   ├── about/              # About (photo/avatar, bio, skills grid)
│   │   ├── contact/            # Contact (4 info cards)
│   │   └── footer/             # Footer
│   ├── context/
│   │   └── ThemeContext.tsx    # Light/dark mode state and toggle
│   ├── data/
│   │   └── projects.ts         # ← EDIT THIS for all content updates
│   ├── lib/
│   │   ├── tokens.css          # Design tokens (CSS custom properties, light + dark)
│   │   └── utils.ts            # cn(), getProjectBySlug(), getPlaceholderSvg()
│   └── types/
│       └── index.ts            # TypeScript interfaces: Project, PersonalInfo, SkillCategory
├── next.config.js              # Static export config, basePath, image settings
├── tailwind.config.ts          # Tailwind theme extending CSS token variables
├── tsconfig.json               # TypeScript strict mode
└── package.json
```

---

## Design System

Colours and spacing are defined as CSS custom properties in `src/lib/tokens.css`.
To change the accent colour or theme palette, edit the token values there — no component changes needed.

```css
:root {
  --color-rust: oklch(0.58 0.16 35);   /* primary accent — change this to retheme the whole site */
  --color-bg: oklch(0.98 0.005 80);
  --color-text: oklch(0.15 0.01 80);
  /* ... */
}

[data-theme="dark"] {
  --color-bg: oklch(0.10 0.01 80);
  --color-text: oklch(0.92 0.005 80);
  /* ... */
}
```

---

## Accessibility

This site is built to WCAG 2.1 AA standards:

| Feature | Implementation |
|---|---|
| Skip navigation | Hidden link at top of page, visible on keyboard focus |
| Keyboard navigation | All interactive elements reachable via Tab; visible focus ring |
| Screen readers | All images have `alt` text; icon buttons have `aria-label`; landmark regions used |
| Reduced motion | `useReducedMotion()` hook disables all Framer Motion animations when user prefers |
| Colour contrast | Rust accent verified ≥ 4.5:1 against both light and dark backgrounds |
| Semantic HTML | `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` throughout |

---

## Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | `''` (empty) | Set to `/repo-name` when deploying to a GitHub project sub-path |

---

## Licence

The **source code** is released under the [MIT Licence](LICENSE) — you're welcome to use it as a template for your own portfolio.

**Personal content** (biography, project descriptions, photographs, and resume) is copyright © 2026 Šimon Hyben and may not be reproduced without explicit permission.
