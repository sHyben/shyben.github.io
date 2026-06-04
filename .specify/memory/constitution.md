<!--
SYNC IMPACT REPORT
==================
Version change: [unversioned] → 1.0.0
Bump rationale: MAJOR — initial constitution ratification from blank template.

Modified principles: N/A (all new)
Added sections:
  - Core Principles (5 principles)
  - Technical Standards
  - Development Workflow
  - Governance

Removed sections: N/A (template placeholders replaced)

Templates requiring updates:
  - .specify/templates/plan-template.md ✅ — Constitution Check gates align with the 5 principles below
  - .specify/templates/spec-template.md ✅ — No structural changes required; user story / acceptance format is compatible
  - .specify/templates/tasks-template.md ✅ — Task categories (setup, foundational, story phases, polish) remain valid

Deferred TODOs:
  - RATIFICATION_DATE: set to today (2026-06-04) as the initial adoption date.
-->

# Portfolio Website Constitution

## Core Principles

### I. Static-First, GitHub Pages Compatible

Every page and route MUST be statically exportable via `next export` (Next.js static site
generation). Dynamic server-side rendering that cannot be pre-rendered at build time is
prohibited. All asset paths MUST respect the configured `basePath` so the site deploys
correctly to both a user root (`username.github.io`) and a project sub-path
(`username.github.io/repo-name`).

**Rationale**: GitHub Pages serves only static files. Client-side routing must use the
hash-router pattern or Next.js static export with proper `trailingSlash` and `assetPrefix`
settings. Violating this constraint means the deployed site will 404 on direct URL access.

### II. Component-Driven, Maintainable Structure

The UI MUST be composed of small, single-responsibility React components. All project data
(title, description, tech stack, screenshots, GitHub URL) MUST live in a single data file
(e.g., `src/data/projects.ts`) so a non-developer can update portfolio content without
touching component code. Styles MUST be co-located with components using CSS Modules or a
utility-class system (Tailwind CSS); global styles are reserved for resets and design tokens
only.

**Rationale**: The owner of this portfolio is a job seeker, not a full-time frontend
engineer. Future updates (new project, resume swap, contact change) MUST be achievable by
editing one or two files. Components without a clear, single purpose are a maintenance
liability.

### III. Accessible & Performant by Default

All interactive elements MUST meet WCAG 2.1 AA standards: sufficient color contrast ratios
(≥ 4.5:1 for normal text), keyboard-navigable focus order, descriptive `alt` text on all
images, and ARIA labels where semantic HTML is insufficient. Images MUST use `next/image`
(or equivalent lazy-loading with `loading="lazy"`) and be served in modern formats
(WebP/AVIF where supported). Core Web Vitals targets: LCP < 2.5 s, CLS < 0.1, FID < 100 ms.

**Rationale**: Accessibility is both a legal obligation and a signal of engineering quality
to technical hiring managers. Performance directly affects first impressions—a slow portfolio
undermines the candidate's credibility.

### IV. Polished, Consistent Visual Language

All hover animations MUST use CSS transitions or a single shared animation utility; mixing
ad-hoc animation libraries is prohibited. Project card hover MUST scale between 1.05 and
1.10 with a smooth `transition: transform 200ms ease` (or equivalent). Color tokens, spacing
scale, and typography MUST be defined once in a design-token file and consumed consistently
across the site. No inline styles for values that appear in more than one location.

**Rationale**: Visual inconsistency is immediately noticed by designers and senior engineers
on hiring panels. A single source of truth for design tokens prevents drift as the portfolio
grows and makes future theme changes a one-file operation.

### V. Production-Ready Error Handling & Documentation

Every network boundary (resume PDF download, external links, image loads) MUST have graceful
fallback behavior: broken images show a placeholder, failed downloads surface a user-friendly
message. The README MUST document all maintenance tasks in plain language: how to add a
project, swap the resume PDF, update contact info, and re-deploy to GitHub Pages. Code MUST
NOT be shipped with `console.error` suppression, disabled TypeScript strict checks, or
`eslint-disable` comments without an accompanying explanation.

**Rationale**: A portfolio that breaks silently reflects poorly on the owner. Comprehensive
documentation means the site remains maintainable years later, long after the initial
implementation context is forgotten.

## Technical Standards

- **Framework**: Next.js (latest stable) with TypeScript strict mode enabled.
- **Styling**: Tailwind CSS for utility classes; CSS Modules for component-scoped overrides.
- **Deployment target**: GitHub Pages via `next export`; `next.config.js` MUST include
  `output: 'export'`, correct `basePath`, and `images: { unoptimized: true }` (required
  for static export).
- **Node version**: Pinned in `.nvmrc` / `package.json` `engines` field.
- **Linting / formatting**: ESLint + Prettier configured and enforced in CI / pre-commit.
- **Image assets**: Stored under `public/images/`; file names use kebab-case.
- **Resume PDF**: Stored at `public/resume.pdf`; download link uses the `download` attribute.
- **Data file**: `src/data/projects.ts` exports a typed `Project[]` array; this is the
  single source of truth for all portfolio content.
- **No backend**: Zero server-side endpoints. Contact form MUST use a third-party service
  (e.g., Formspree, Netlify Forms) or a `mailto:` link as fallback.

## Development Workflow

1. **Feature branches**: All new features or content updates are developed on a branch named
   `feature/<short-description>` and merged via pull request.
2. **Local validation before PR**: Run `npm run build && npm run export` locally; confirm
   no broken links and that the `out/` directory is self-contained.
3. **Deployment**: GitHub Actions workflow (`deploy.yml`) triggers on push to `main`,
   runs `npm run build`, and pushes the `out/` directory to the `gh-pages` branch.
4. **Content updates**: Editing `src/data/projects.ts` or `public/resume.pdf` does NOT
   require a pull request — a direct commit to `main` is acceptable for content-only changes.
5. **Dependency updates**: MUST be reviewed for breaking changes to Next.js static export
   behavior before merging.

## Governance

This constitution supersedes any conflicting guidance in inline code comments, README
sections, or prior verbal agreements. Amendments require:

1. A written rationale explaining why the current principle is insufficient.
2. A version bump following semantic versioning (see rules below).
3. An update to this file committed to `main` before the amended behavior is implemented.

**Versioning policy**:
- MAJOR: A principle is removed, redefined in a breaking way, or the deployment target changes.
- MINOR: A new principle or section is added, or existing guidance is materially expanded.
- PATCH: Wording clarifications, typo fixes, or non-semantic refinements.

**Compliance review**: Every pull request description MUST include a one-line "Constitution
Check" confirming no principle is violated. If a violation is necessary, it MUST be justified
under a "Complexity Justification" section in the plan document.

**Version**: 1.0.0 | **Ratified**: 2026-06-04 | **Last Amended**: 2026-06-04
