# Research: Portfolio Website

**Phase**: 0 — Technology Decisions & Best Practices
**Date**: 2026-06-04
**Branch**: `001-portfolio-website`

---

## 1. Next.js Static Export for GitHub Pages

**Decision**: Next.js 14+ App Router with `output: 'export'`

**Rationale**:
- `output: 'export'` replaces the deprecated `next export` CLI command (removed in Next 14).
- The App Router supports `generateStaticParams()` for pre-generating dynamic routes at build
  time — exactly what `/projects/[slug]` needs.
- `images: { unoptimized: true }` is required because the Next.js Image Optimization API
  needs a Node.js server; static export has no server.

**Key `next.config.js` settings**:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,       // generates /projects/slug/index.html, not /projects/slug.html
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: { unoptimized: true },
};
module.exports = nextConfig;
```

**GitHub Pages routing**: GitHub Pages serves `404.html` for unknown paths. For a user site
(`username.github.io`), `trailingSlash: true` + pre-generated pages is sufficient. No
hash-based workaround needed.

**Alternatives considered**:
- Hash routing (`/#/projects/slug`) — rejected: ugly URLs, not indexable, poor UX
- Query param routing (`/?project=slug`) — rejected: same trade-offs as hash routing
- Vite + React Router — rejected: more boilerplate for static generation; Next.js gives SSG
  for free with `generateStaticParams`

---

## 2. Framer Motion for Entrance Animations

**Decision**: Framer Motion 11.x as the sole animation library

**Rationale**:
- Native React/TypeScript integration — no DOM manipulation outside React's model.
- `<motion.div>` with `initial`, `animate`, `variants` handles staggered hero entrance in
  ~10 lines of declarative code.
- `useInView` hook (or `whileInView` prop) triggers project card entrance when scrolled into
  viewport, avoiding expensive on-mount animations for off-screen content.
- Hover states (`whileHover={{ scale: 1.07 }}`) replace CSS `transform` for card zoom with
  spring physics, which feels more natural.
- Bundle impact: ~50 KB gzip — acceptable for a portfolio site.

**Stagger pattern** (hero elements):
```tsx
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
// <motion.div variants={container} initial="hidden" animate="show">
//   <motion.h1 variants={item}>...</motion.h1>
//   <motion.p  variants={item}>...</motion.p>
// </motion.div>
```

**Alternatives considered**:
- Pure CSS `@keyframes` — rejected: staggered entrance requires `animation-delay` on each
  element individually; intersection-observer triggering requires extra JS anyway.
- AOS (Animate On Scroll) — rejected: CSS-class-based, not idiomatic React, adds a separate
  DOM mutation observer outside React's lifecycle.

---

## 3. Tailwind CSS + CSS Modules Hybrid

**Decision**: Tailwind CSS for layout/spacing utilities; CSS Modules for component-specific
overrides and design token consumption

**Rationale**:
- Tailwind's JIT compiler produces minimal CSS; unused classes are purged at build time.
- CSS Modules provide scoped class names, preventing style leakage between components.
- Design tokens (colour palette, border radius, font scale) defined as CSS custom properties
  in `src/lib/tokens.css`, imported in `globals.css`, then consumed in Tailwind config via
  `theme.extend.colors` so both Tailwind utilities and CSS Modules reference the same tokens.

**Token file pattern** (`src/lib/tokens.css`):
```css
:root {
  --color-rust: oklch(0.58 0.18 35);      /* primary accent */
  --color-bg:   oklch(0.98 0.005 80);     /* warm near-white */
  --color-text: oklch(0.15 0.01 80);      /* near-black */
  --radius-card: 12px;
  --transition-hover: transform 220ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
[data-theme="dark"] {
  --color-bg:   oklch(0.10 0.01 80);
  --color-text: oklch(0.92 0.005 80);
}
```

**Alternatives considered**:
- Styled Components — rejected: runtime CSS injection is incompatible with static export in
  some configurations; Tailwind + CSS Modules is lighter.
- Plain CSS — rejected: no scoping, no utility system, more verbose.

---

## 4. Light/Dark Mode Toggle

**Decision**: CSS custom properties + `data-theme` attribute on `<html>`; no CSS-in-JS

**Rationale**:
- Setting `document.documentElement.setAttribute('data-theme', 'dark')` synchronously before
  first paint (in a `<script>` tag in `<head>`) eliminates flash of wrong theme (FOWT).
- `localStorage.getItem('theme')` → fallback to `window.matchMedia('prefers-color-scheme')`
  → fallback to `'light'` covers all cases.
- No React state required for the colour values themselves; only the toggle button needs state
  for its icon.

**Anti-flash snippet** (in `app/layout.tsx` `<head>` as a dangerouslySetInnerHTML script):
```js
(function(){
  var t = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
})();
```

---

## 5. Image Strategy for Static Export

**Decision**: SVG diagonal-stripe placeholder for missing screenshots; `<img>` with
`loading="lazy"` for real project images (not `next/image` for project thumbnails)

**Rationale**:
- `next/image` with `unoptimized: true` degrades to a plain `<img>` anyway on static export,
  so using `<img loading="lazy" decoding="async">` directly in project cards is equivalent
  and avoids the overhead.
- The diagonal-stripe SVG placeholder is generated inline (no network request) and serves as
  an always-available fallback when a screenshot file is absent or fails to load.
- `onError` on `<img>` swaps `src` to the inline SVG data URI to handle network failures.

---

## 6. GitHub Actions Deployment

**Decision**: GitHub Actions workflow pushes `out/` to the `gh-pages` branch using
`peaceiris/actions-gh-pages`

**Rationale**: Standard, well-maintained action; handles `CNAME` preservation and force-push
to `gh-pages`. Zero additional infrastructure needed.

```yaml
# .github/workflows/deploy.yml (outline)
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

---

## 7. Sample Project Content Strategy

**Decision**: 2 anonymised-real + 3 generic placeholder projects (per clarification Q4)

**Anonymised-real projects** (grounded in Šimon's Erste Group/Azure/AI background):

| # | Working Title | Domain | Key Technologies |
|---|---|---|---|
| 1 | Internal Reporting Dashboard | Financial services analytics | Spring Boot, Angular, PostgreSQL, Azure |
| 2 | LLM Integration Service | AI/automation tooling | Kotlin, Azure AI Foundry, Docker, GCP |

**Generic placeholder projects**:

| # | Placeholder Title | Purpose |
|---|---|---|
| 3 | E-Commerce Platform | Shows full-stack web app experience |
| 4 | DevOps Pipeline Toolkit | Shows CI/CD / infrastructure skills |
| 5 | Mobile Task Manager | Shows cross-platform capability |

Each placeholder has a comment in `projects.ts` reading:
`// TODO: Replace this placeholder with a real project`

---

## All NEEDS CLARIFICATION Items: Resolved

| Item | Resolution |
|---|---|
| Contact section scope | Cards only — no form |
| Project routing on GitHub Pages | Pre-generated static pages per slug |
| Entrance animation library | Framer Motion |
| Sample project content | 2 real + 3 placeholder |
| Next.js version/config for static export | Next.js 14+ `output: 'export'` + `trailingSlash` |
| Theme switching without FOWT | `data-theme` attribute + inline `<head>` script |
