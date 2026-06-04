# Šimon Hyben — Portfolio

Personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.
Deployed to GitHub Pages at [shyben.github.io](https://shyben.github.io).

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Build & Preview

```bash
npm run build      # Generates the static site in out/
npx serve out      # Preview the static build locally
```

---

## Deploy to GitHub Pages

Deployment is automatic via GitHub Actions on every push to `main`.

**Manual deploy:**
```bash
npm run build
npx gh-pages -d out
```

**GitHub Pages setup (first time):**
1. Go to your repository → Settings → Pages
2. Set Source to **Deploy from a branch** → branch: `gh-pages` → folder: `/ (root)`
3. Push to `main` — GitHub Actions handles the rest

**If deploying to a project sub-path** (e.g. `username.github.io/portfolio`):
```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```
Set the same env var in your GitHub Actions workflow.

---

## Content Updates

**All portfolio content lives in one file: `src/data/projects.ts`**

### Add or update a project

1. Open `src/data/projects.ts`
2. Copy an existing project object in the `projects` array
3. Fill in all fields:
   - `slug` — unique kebab-case URL identifier (e.g. `"my-new-project"`)
   - `title`, `shortDescription`, `fullDescription`, `technologies`, `features`
   - `githubUrl` — your repository URL
   - `demoUrl` — live demo link (or `null`)
   - `thumbnailImage` — path to image in `public/images/projects/<slug>.webp` (or `null` for placeholder)
   - `isRealProject: true`
4. Add thumbnail: place a `<slug>.webp` image in `public/images/projects/`
5. Run `npm run build` to verify

### Remove a project

Delete the object from the `projects` array and remove the corresponding thumbnail.

### Update the resume

1. Copy your `resume.pdf` to the `public/` directory
2. In `src/data/projects.ts`, set:
   ```ts
   resumePdfPath: '/resume.pdf',
   ```
3. Rebuild and redeploy

### Update contact info or bio

Edit the `personalInfo` object at the top of `src/data/projects.ts`.

### Add a profile photo

1. Copy your photo to `public/images/profile/profile.webp`
2. In `src/data/projects.ts`, set:
   ```ts
   profilePhotoPath: '/images/profile/profile.webp',
   ```
3. Rebuild

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (Navbar, Footer, ThemeProvider)
│   ├── page.tsx                  # Home page
│   ├── projects/[slug]/page.tsx  # Project detail pages (statically generated)
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Tailwind + design token imports
├── components/                   # UI components
│   ├── nav/                      # Navbar
│   ├── hero/                     # Hero section
│   ├── projects/                 # ProjectsGrid, ProjectCard, GitHubButton, ProjectDetail
│   ├── about/                    # About section
│   ├── contact/                  # Contact cards
│   └── footer/                   # Footer
├── context/
│   └── ThemeContext.tsx           # Light/dark mode state
├── data/
│   └── projects.ts               # ← EDIT THIS FILE for all content updates
├── lib/
│   ├── tokens.css                # Design tokens (CSS custom properties)
│   └── utils.ts                  # cn(), getProjectBySlug(), getPlaceholderSvg()
└── types/
    └── index.ts                  # TypeScript interfaces

public/
├── images/projects/              # Project thumbnails (<slug>.webp)
├── images/profile/               # Profile photo (profile.webp)
└── resume.pdf                    # CV (add this file to enable the download button)
```

---

## Tech Stack

- **Framework**: Next.js 14 (App Router, static export)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + CSS Modules
- **Animations**: Framer Motion
- **Deployment**: GitHub Pages via GitHub Actions

---

## Accessibility

This site targets WCAG 2.1 AA:
- All images have descriptive `alt` text
- All icon-only buttons have `aria-label`
- Keyboard-navigable with visible focus rings
- `prefers-reduced-motion` respected — animations disabled when the user prefers
- Skip-to-content link for screen readers
- Sufficient colour contrast ratios (verify with DevTools Accessibility panel)
