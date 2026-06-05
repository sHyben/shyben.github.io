# Implementation Plan: Portfolio Website

**Branch**: `001-portfolio-website` | **Date**: 2026-06-04 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-portfolio-website/spec.md`

## Summary

Build a production-ready, statically-exported personal portfolio website for Šimon Hyben
(Full-Stack Software Developer). The site showcases 5 projects in an animated grid, provides
project detail pages pre-generated at build time, an About section with a categorised skills
grid, and a Contact section with 4 info cards. Deployed to `shyben.github.io` via GitHub Pages.
Entrance animations use Framer Motion; visual design follows the Claude Design prototype
(bold/editorial, rust accent, light/dark mode toggle).

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode enabled)
**Primary Dependencies**:
- Next.js 14+ with App Router and `output: 'export'` (static site generation)
- React 18
- Tailwind CSS 3.x (utility classes + design token CSS variables)
- Framer Motion 11.x (entrance animations + hover transitions; sole animation library)
- next/image with `unoptimized: true` (required for static export)

**Storage**: None — all content sourced from `src/data/projects.ts` at build time; no database

**Testing**: No test framework required for this feature (spec does not mandate tests;
constitution treats tests as optional). Manual validation via quickstart.md.

**Target Platform**: GitHub Pages static hosting (`shyben.github.io`); modern browsers — last
2 versions of Chrome, Firefox, Safari (iOS + desktop)

**Project Type**: Static web application (portfolio / marketing site)

**Performance Goals**:
- LCP < 2.5 s on 25 Mbps broadband (SC-001)
- Nav links reach target in < 0.5 s (SC-002)
- Card hover animation completes within 300 ms (SC-003)
- PDF download initiates within 3 s (SC-004)
- Core Web Vitals: CLS < 0.1, FID < 100 ms (constitution Principle III)

**Constraints**:
- `next export` only — no SSR, no API routes, no `getServerSideProps`
- `images: { unoptimized: true }` required for static export
- `basePath` defaults to `''` (user site); must be env-var configurable for project-sub-path
- WCAG 2.1 AA (SC-005)
- Single animation library (Framer Motion); no mixing with AOS, GSAP, etc.
- All content in one data file (`src/data/projects.ts`); no code changes for content updates

**Scale/Scope**: ~11 pages (1 home + 5 project detail + 404); ~5 components per major section

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|---|---|---|
| I. Static-First, GitHub Pages Compatible | ✅ PASS | `output: 'export'` configured; pre-generated `/projects/[slug]/index.html`; `basePath` env-var; `images.unoptimized: true` |
| II. Component-Driven, Maintainable Structure | ✅ PASS | Single `src/data/projects.ts` data file; components co-located with CSS Modules; one-file content updates |
| III. Accessible & Performant by Default | ✅ PASS | `next/image` lazy loading; WebP-ready; WCAG 2.1 AA; all numeric Core Web Vitals targets in spec |
| IV. Polished, Consistent Visual Language | ✅ PASS | Framer Motion as sole animation library; design tokens in `src/lib/tokens.css`; card hover scale 1.05–1.10 specified |
| V. Production-Ready Error Handling & Documentation | ✅ PASS | Resume fallback (disabled button + tooltip); image fallback (diagonal-stripe SVG); 404 page; README documents all maintenance tasks |

**All 5 gates pass. Proceeding to Phase 0.**

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-website/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── data-contract.md # Shape of projects.ts
│   └── url-contract.md  # Public URL routes
└── tasks.md             # Phase 2 output (/speckit-tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: Navbar + Footer + ThemeProvider
│   ├── page.tsx                  # Home: Hero + ProjectsGrid + About + Contact
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx          # Project detail (statically generated per slug)
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Tailwind base + design token CSS vars
├── components/
│   ├── nav/
│   │   ├── Navbar.tsx
│   │   └── Navbar.module.css
│   ├── hero/
│   │   ├── Hero.tsx
│   │   └── Hero.module.css
│   ├── projects/
│   │   ├── ProjectsGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── GitHubButton.tsx
│   │   └── projects.module.css
│   ├── about/
│   │   ├── About.tsx
│   │   └── About.module.css
│   ├── contact/
│   │   ├── Contact.tsx
│   │   └── Contact.module.css
│   └── footer/
│       ├── Footer.tsx
│       └── Footer.module.css
├── data/
│   └── projects.ts               # SINGLE SOURCE OF TRUTH for all content
├── types/
│   └── index.ts                  # Project, PersonalInfo, SkillCategory types
└── lib/
    ├── tokens.css                # Design tokens (CSS custom properties)
    └── utils.ts                  # cn() helper, slug utility

public/
├── images/
│   ├── projects/                 # Project thumbnails (slug-named, e.g. reporting-dashboard.webp)
│   └── profile/                  # Profile photo (profile.webp)
└── resume.pdf                    # CV (placeholder-safe; see FR-012)

next.config.js                    # output: 'export', basePath, images.unoptimized
tailwind.config.ts
tsconfig.json                     # strict: true
.github/
└── workflows/
    └── deploy.yml                # GitHub Actions: build → push out/ to gh-pages branch
```

**Structure Decision**: Next.js App Router with static export. Single-repo, no backend.
All component styles use CSS Modules for scoping; Tailwind utilities for layout and spacing.
Design tokens defined once in `src/lib/tokens.css` and consumed via CSS custom properties.

## Complexity Tracking

> No constitution violations — this section intentionally empty.
