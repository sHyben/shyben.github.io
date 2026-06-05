---
description: "Task list for Portfolio Website implementation"
---

# Tasks: Portfolio Website

**Input**: Design documents from `/specs/001-portfolio-website/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | data-model.md ✅ | contracts/ ✅ | research.md ✅

**Tests**: Not requested — no test tasks generated (spec does not mandate tests).

**Organization**: Tasks are grouped by user story to enable independent implementation
and testing of each story.

---

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US4)
- File paths are relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Next.js project, tooling, configuration, design tokens,
TypeScript types, and the central data file. No user story work until this phase is done.

- [ ] T001 Initialize Next.js 14 project with TypeScript strict mode and App Router; set `"strict": true` in `tsconfig.json`; output target: `src/app/` structure matching `plan.md`
- [ ] T002 Configure `next.config.js`: set `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`, `basePath: process.env.NEXT_PUBLIC_BASE_PATH || ''`, `assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || ''`
- [ ] T003 [P] Install and configure Tailwind CSS 3.x: create `tailwind.config.ts` extending theme colors to reference CSS token custom properties (e.g. `rust: 'var(--color-rust)'`); add Tailwind directives to `src/app/globals.css`
- [ ] T004 [P] Create `src/lib/tokens.css` with all CSS custom properties: `--color-rust` (oklch rust accent), `--color-bg`, `--color-text`, `--radius-card`, `--transition-hover`; add dark-mode overrides under `[data-theme="dark"]`; import file in `src/app/globals.css`
- [ ] T005 [P] Create `src/types/index.ts` with `Project`, `PersonalInfo`, `SkillCategory` interfaces exactly as specified in `specs/001-portfolio-website/data-model.md`
- [ ] T006 Create `src/data/projects.ts` with `personalInfo` (Šimon's real data: name, tagline, bio, email, LinkedIn, GitHub, location, 7 skill categories) and `projects` array (5 entries: 2 anonymised-real + 3 placeholders with `// TODO: Replace` comments); all typed via `src/types/index.ts`
- [ ] T007 [P] Add SVG diagonal-stripe placeholder images to `public/images/projects/` (one per project slug) and an initials-avatar SVG to `public/images/profile/`
- [ ] T008 [P] Create `.github/workflows/deploy.yml` GitHub Actions workflow: checkout → setup-node 20 → `npm ci` → `npm run build` → `peaceiris/actions-gh-pages@v4` publishing `./out` to `gh-pages` branch

**Checkpoint**: All configuration, tokens, types, and data in place. Ready for foundational work.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Root layout, theme infrastructure, and navigation shell that ALL user stories
depend on. No user story work can begin until this phase is complete.

⚠️ **CRITICAL**: All user story phases depend on this phase completing first.

- [ ] T009 Create `src/lib/utils.ts` exporting: `cn()` (class-name merger using `clsx`/`tailwind-merge`), and `getProjectBySlug(slug: string)` helper that finds a project from the imported `projects` array
- [ ] T010 Create `src/app/globals.css`: import `tokens.css`, Tailwind base/components/utilities directives, base `body` styles using token variables, global focus-ring style for keyboard navigation
- [ ] T016 Create `src/context/ThemeContext.tsx`: React context exposing `theme` state and `toggleTheme()` function; syncs to `localStorage` and `data-theme` on `<html>` on each toggle; export `ThemeProvider` wrapper and `useTheme()` hook
- [ ] T011 Create `src/app/layout.tsx`: root `<html lang="en">` with `data-theme` attribute, anti-FOWT inline `<script>` in `<head>` (reads `localStorage` → `prefers-color-scheme` → defaults `'light'`; sets `data-theme` before paint), `<body>` with `<ThemeProvider>` (from T016) context wrapper, `<Navbar />`, `{children}`, `<Footer />` slots; set `<title>` and `<meta>` from `personalInfo`
- [ ] T012 [P] Create `src/components/nav/Navbar.tsx`: sticky top nav with logo/name link, navigation links (Projects, About, Contact) as anchor links (`/#projects`, `/#about`, `/#contact`), a resume button slot (render `null` initially — full conditional logic added in T031), light/dark toggle button with sun/moon icons reading `useTheme()` from `ThemeContext`
- [ ] T013 [P] Create `src/components/nav/Navbar.module.css`: sticky positioning, backdrop blur, nav link hover styles using `--color-rust`, responsive hamburger menu for mobile

**Checkpoint**: Root layout renders with nav and footer; theme toggle works. All stories can now start.

---

## Phase 3: User Story 1 — First Impression & Navigation (Priority: P1) 🎯 MVP

**Goal**: Deliver the hero section with staggered Framer Motion entrance animations and
the light/dark mode toggle so the site is immediately impressive on load.

**Independent Test**: Open `http://localhost:3000`; verify name "Šimon Hyben" appears in
rust accent; entrance animations play sequentially; toggle switches theme and persists on refresh;
nav links (#projects, #about, #contact) scroll to placeholder sections.

### Implementation for User Story 1

- [ ] T014 [P] [US1] Create `src/components/hero/Hero.tsx`: display name "Šimon Hyben" in rust accent using editorial display font weight; tagline below; CTA button; implement Framer Motion stagger container + item variants (`initial: { opacity: 0, y: 20 }` → `animate: { opacity: 1, y: 0 }`) for sequential hero element entrance
- [ ] T015 [P] [US1] Create `src/components/hero/Hero.module.css`: full-width section, display typography scale, rust colour on name, responsive layout (centered mobile, left-aligned desktop)
- [ ] T017 [US1] Create `src/app/page.tsx`: import and render `<Hero />` as the first visible section; add empty `<section id="projects" />`, `<section id="about" />`, `<section id="contact" />` anchor targets below it so navbar links resolve correctly (these sections will be populated in US2–US4 phases)

**Checkpoint**: US1 fully functional and testable independently — hero renders, animations play,
theme toggle works and persists, nav links reach anchor sections.

---

## Phase 4: User Story 2 — Projects Grid (Priority: P2)

**Goal**: Deliver the projects section with 5 animated project cards, hover zoom + overlay,
and styled GitHub buttons.

**Independent Test**: Navigate to `/#projects`; confirm 5 cards in a responsive grid; hover
shows scale + title overlay; GitHub button opens correct URL in new tab; stagger entrance
animations play when cards scroll into view.

### Implementation for User Story 2

- [ ] T018 [P] [US2] Create `src/components/projects/ProjectCard.tsx`: square aspect-ratio card; `<img>` with `loading="lazy"` for thumbnail; inline diagonal-stripe SVG data-URI as `onError` fallback; `<motion.div whileHover={{ scale: 1.07 }} transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}>` for zoom (≈200ms ease-equivalent per constitution Principle IV); semi-transparent title overlay `<motion.div>` that fades in on hover using `variants`; `<GitHubButton>` below card; `<Link href={/projects/${slug}/}>` wrapping the thumbnail
- [ ] T019 [P] [US2] Create `src/components/projects/GitHubButton.tsx`: styled button with GitHub icon SVG; rust-accent hover effect (background-color shift + subtle box-shadow glow on hover via CSS transition); `target="_blank" rel="noopener noreferrer"`; accepts `href` and `label` props
- [ ] T020 [P] [US2] Create `src/components/projects/projects.module.css`: responsive CSS grid (1 column → 2 tablet → 3 desktop); card overflow-hidden + border-radius; GitHub button base styles
- [ ] T021 [US2] Create `src/components/projects/ProjectsGrid.tsx`: maps `projects` array → `<ProjectCard>`; wraps grid in Framer Motion `motion.div` with `whileInView` stagger container so cards animate in as section scrolls into viewport (`once: true`); `viewport={{ once: true, margin: '-100px' }}`
- [ ] T022 [US2] Integrate `<ProjectsGrid projects={projects} />` into `src/app/page.tsx` inside the `<section id="projects">` anchor

**Checkpoint**: US2 fully functional — 5 project cards visible in animated grid, hover and
GitHub button interactions work on desktop and mobile.

---

## Phase 5: User Story 3 — Project Detail Pages (Priority: P2)

**Goal**: Deliver pre-generated static detail pages for each project slug and a 404 page.

**Independent Test**: Click a project card → navigates to `/projects/<slug>/`; page shows
all required content; "Back to Projects" works; direct URL access and browser refresh do not
404; accessing `/projects/invalid-slug/` shows the 404 page with home link.

### Implementation for User Story 3

- [ ] T023 [P] [US3] Create `src/components/projects/ProjectDetail.tsx`: renders full project title, full description (paragraph-split on `\n\n`), technology tags as styled chips using `--color-rust` border, features as `<ul>`, screenshots gallery (if any), optional demo link button, "← Back to Projects" link (`href="/#projects"`)
- [ ] T024 [US3] Create `src/app/projects/[slug]/page.tsx`: export `generateStaticParams()` returning `projects.map(p => ({ slug: p.slug }))`; call `getProjectBySlug(params.slug)` — if null, call `notFound()`; render `<ProjectDetail project={project} />`; export `generateMetadata()` for per-project `<title>` and `<meta name="description">`
- [ ] T025 [US3] Create `src/app/not-found.tsx`: centred layout with "Page not found" heading, brief message, and `<Link href="/">← Back to home</Link>` button styled with rust accent

**Checkpoint**: US3 fully functional — all 5 detail pages reachable by direct URL; invalid
slug shows 404 page; browser back/forward navigates correctly.

---

## Phase 6: User Story 4 — About, Resume & Contact (Priority: P3)

**Goal**: Deliver the About section (bio + skills grid), Resume download button, Contact
section (4 info cards), and Footer.

**Independent Test**: Navigate to `/#about` — bio and 7-category skills grid visible;
Resume button disabled with tooltip (no PDF yet); navigate to `/#contact` — 4 cards visible;
email card href is `mailto:hyben.simon@gmail.com`; LinkedIn card opens correct URL.

### Implementation for User Story 4

- [ ] T026 [P] [US4] Create `src/components/about/About.tsx`: renders profile photo (`<img>` or initials-avatar SVG fallback if `profilePhotoPath` is null); bio text (paragraph-split); `skillCategories` grid — each category as a labelled group of tag chips
- [ ] T027 [P] [US4] Create `src/components/about/About.module.css`: two-column layout (photo + bio) on desktop, stacked on mobile; skills grid as CSS grid of category groups; tag chip styles
- [ ] T028 [P] [US4] Create `src/components/contact/Contact.tsx`: renders exactly 4 info cards — Email (`<a href="mailto:hyben.simon@gmail.com">`), LinkedIn (`<a href={linkedInUrl} target="_blank">`), GitHub (`<a href={githubUrl} target="_blank">`), Location (non-link display card); each card has icon, label, and value
- [ ] T029 [P] [US4] Create `src/components/contact/Contact.module.css`: card grid (2 columns desktop, 1 mobile); card styles with border, hover lift effect
- [ ] T030 [P] [US4] Create `src/components/footer/Footer.tsx`: developer name, brief nav links (Projects, About, Contact), GitHub profile link, copyright year; reads `personalInfo.name` and `personalInfo.githubUrl`
- [ ] T031 [US4] Implement Resume/CV download button in the slot added by T012 in `src/components/nav/Navbar.tsx`: render `<a href={resumePdfPath} download="resume.pdf" className={styles.resumeBtn}>Download CV</a>` when `personalInfo.resumePdfPath` is non-null; render `<button disabled aria-describedby="resume-tooltip" className={styles.resumeBtn}>Download CV<span id="resume-tooltip" role="tooltip">Resume coming soon</span></button>` when null; add `.resumeBtn` styles to `Navbar.module.css`
- [ ] T032 [US4] Integrate `<About />`, `<Contact />`, and `<Footer />` into `src/app/page.tsx` inside their respective section anchors; ensure `<Footer />` is in `layout.tsx` (already wired in T011)

**Checkpoint**: US4 fully functional — all sections visible; resume button disabled with tooltip;
email card links correctly; skills grid shows all 7 categories.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, SEO, documentation, and final build validation.

- [ ] T033 [P] Accessibility pass: (a) add `aria-label` to all icon-only buttons (theme toggle, GitHub button); (b) add `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>` in `layout.tsx`; (c) verify all `<img>` elements have non-empty `alt` attributes; (d) verify `--color-rust` token achieves ≥ 4.5:1 contrast against `--color-bg` in both light and dark themes using a contrast checker (e.g., browser DevTools Accessibility panel or `npx color-contrast-checker`) — adjust token values in `src/lib/tokens.css` if any ratio fails
- [ ] T034 [P] Add SEO meta tags to `src/app/layout.tsx`: `<meta name="description">`, `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:type" content="website">`, `<link rel="canonical">`; all populated from `personalInfo`
- [ ] T035 [P] Verify Framer Motion `prefers-reduced-motion` — wrap all motion components to respect `useReducedMotion()` hook; set `transition: { duration: 0 }` when reduced motion is preferred
- [ ] T036 [P] Write `README.md` at repo root documenting: local dev (`npm run dev`), build (`npm run build`), GitHub Pages deployment, how to add/update a project (edit `src/data/projects.ts`), how to add resume PDF, how to change contact info, `NEXT_PUBLIC_BASE_PATH` env var for sub-path deployments
- [ ] T037 Final build validation: run `npm run build`; verify `out/` contains `index.html`, `out/projects/` with 5 slug subdirectories, `out/404.html`; run quickstart.md checklist items 1–6

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Requires Phase 1 completion — blocks all user stories
- **US1 (Phase 3)**: Requires Phase 2 — no dependency on US2, US3, US4
- **US2 (Phase 4)**: Requires Phase 2 — no dependency on US1, US3, US4
- **US3 (Phase 5)**: Requires Phase 2 — no dependency on US1, US2, US4
- **US4 (Phase 6)**: Requires Phase 2 — no dependency on US1, US2, US3
- **Polish (Phase 7)**: Requires all US phases complete

### User Story Dependencies

- **US1**: `ThemeContext`, `Hero`, `page.tsx` shell — independent of US2/US3/US4
- **US2**: `ProjectCard`, `GitHubButton`, `ProjectsGrid` — independent of US1/US3/US4; reads `projects` data
- **US3**: `ProjectDetail`, `[slug]/page.tsx`, `not-found.tsx` — independent of US1/US2/US4
- **US4**: `About`, `Contact`, `Footer` — independent of US1/US2/US3

### Within Each Phase

- Tasks marked `[P]` share no file dependencies and can run concurrently
- Data file (T006) must complete before components that import from `src/data/projects.ts`
- `layout.tsx` (T011) must complete before any component rendered inside it is tested
- `generateStaticParams` (T024) depends on T006 (projects array) being populated

### Parallel Opportunities

```bash
# Phase 1 — run in parallel:
T003 (tailwind.config.ts)  +  T004 (tokens.css)  +  T005 (types/index.ts)  +  T007 (placeholder assets)  +  T008 (deploy.yml)

# Phase 2 — sequence within Foundational:
T016 (ThemeContext)  →  T011 (layout.tsx) ; then in parallel: T012 (Navbar.tsx)  +  T013 (Navbar.module.css)

# Phase 3 — run in parallel after Foundational:
T014 (Hero.tsx)  +  T015 (Hero.module.css)  →  T017 (page.tsx shell)

# Phase 4 — run in parallel after Foundational:
T018 (ProjectCard.tsx)  +  T019 (GitHubButton.tsx)  +  T020 (projects.module.css)
then T021 (ProjectsGrid.tsx)  →  T022 (integrate into page.tsx)

# Phase 5 — run in parallel:
T023 (ProjectDetail.tsx)  +  T025 (not-found.tsx)  then  T024 ([slug]/page.tsx)

# Phase 6 — run in parallel:
T026 (About.tsx)  +  T027 (About.module.css)  +  T028 (Contact.tsx)  +  T029 (Contact.module.css)  +  T030 (Footer.tsx)
then T031 (resume button)  →  T032 (integrate into page.tsx)

# Phase 7 — run in parallel:
T033 (a11y)  +  T034 (SEO meta)  +  T035 (reduced-motion)  +  T036 (README)  then  T037 (final build)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: US1 (Hero + navigation + dark mode)
4. **STOP and VALIDATE**: `npm run dev` → hero visible, animations play, theme toggle works
5. Demo if ready

### Incremental Delivery

1. Phase 1 + 2 → Foundation ready
2. Add US1 (Phase 3) → Hero MVP — **demo to stakeholder**
3. Add US2 (Phase 4) → Projects grid — **demo projects section**
4. Add US3 (Phase 5) → Project detail pages — **full project browsing**
5. Add US4 (Phase 6) → About + Contact + Footer — **complete portfolio**
6. Phase 7: Polish → Production-ready

### Parallel Team Strategy

With multiple developers after Foundational (Phase 2) completes:
- Dev A: US1 (Phase 3)
- Dev B: US2 (Phase 4)
- Dev C: US3 (Phase 5) + US4 (Phase 6)

---

## Notes

- `[P]` tasks = different files, no blocking dependencies — safe to run concurrently
- `[USN]` label maps each task to its user story for traceability
- All story phases are independently deployable after Phase 2 (Foundational) is complete
- No test tasks generated — spec does not request TDD; use `quickstart.md` for manual validation
- Commit after each checkpoint to keep progress recoverable
- `src/data/projects.ts` is the ONLY file requiring edits for future content updates
