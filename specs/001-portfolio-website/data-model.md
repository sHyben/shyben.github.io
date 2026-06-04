# Data Model: Portfolio Website

**Phase**: 1 — Design
**Date**: 2026-06-04
**Branch**: `001-portfolio-website`

All data is static — defined at build time in `src/data/projects.ts` and consumed by
Next.js at `next build`. No database, no API calls.

---

## Types (`src/types/index.ts`)

### `Project`

Represents one portfolio item displayed in the grid and on its detail page.

```ts
export interface Project {
  /** URL-safe slug. Used as the route: /projects/<slug>/ */
  slug: string;

  /** Short display title shown on the card and detail page heading. Max 60 chars. */
  title: string;

  /** 1–2 sentence summary shown below the card thumbnail. Max 160 chars. */
  shortDescription: string;

  /** Full description shown on the detail page. Plain text; paragraphs separated by \n\n. */
  fullDescription: string;

  /** Ordered list of technology names shown as tag chips on the detail page. */
  technologies: string[];

  /** Bulleted accomplishments/features shown on the detail page. */
  features: string[];

  /**
   * Path to the thumbnail image (shown on the card).
   * Relative to /public — e.g. "/images/projects/reporting-dashboard.webp".
   * If null or file missing, the diagonal-stripe SVG placeholder renders instead.
   */
  thumbnailImage: string | null;

  /**
   * Additional screenshots shown on the detail page.
   * Each item: { src: string; alt: string }
   * Empty array is valid (no gallery on detail page).
   */
  screenshots: Array<{ src: string; alt: string }>;

  /** Full GitHub repository URL. Opens in new tab. Required. */
  githubUrl: string;

  /** Optional live demo or deployment URL. Omit or set null if not applicable. */
  demoUrl?: string | null;

  /**
   * If true, this project is grounded in real work experience (anonymised).
   * If false, it is a generic placeholder.
   * Used only to add a code comment in the data file; has no runtime effect.
   */
  isRealProject: boolean;
}
```

**Validation rules**:
- `slug` MUST match `/^[a-z0-9]+(-[a-z0-9]+)*$/` (kebab-case, no leading/trailing dashes).
- `slug` MUST be unique across all projects in the array.
- `title` MUST be non-empty.
- `shortDescription` MUST be non-empty, ≤ 160 characters.
- `githubUrl` MUST be a valid `https://github.com/…` URL.
- `thumbnailImage` path (if non-null) MUST resolve under `public/`.

---

### `PersonalInfo`

Developer's profile data — used across Hero, About, Contact, and Footer sections.

```ts
export interface SkillCategory {
  /** Display name, e.g. "Cloud & Infra" */
  label: string;
  /** Individual skill names shown as tags, e.g. ["Azure", "Docker", "GCP"] */
  skills: string[];
}

export interface PersonalInfo {
  name: string;
  tagline: string;

  /**
   * Full bio paragraph(s). Plain text; paragraphs separated by \n\n.
   * Rendered in the About section.
   */
  bio: string;

  /**
   * Path to profile photo relative to /public, e.g. "/images/profile/profile.webp".
   * If null, an initials-avatar SVG is rendered instead.
   */
  profilePhotoPath: string | null;

  /**
   * Path to resume PDF relative to /public, e.g. "/resume.pdf".
   * If null, the download button is rendered in disabled state with a tooltip.
   */
  resumePdfPath: string | null;

  /** Used for the mailto: link on the email contact card. */
  email: string;

  /** Full LinkedIn profile URL. */
  linkedInUrl: string;

  /** Full GitHub profile URL. */
  githubUrl: string;

  /** Display string for the location contact card, e.g. "Bratislava, Slovakia". */
  location: string;

  /**
   * Ordered list of skill categories for the About section grid.
   * Rendered in the order given.
   */
  skillCategories: SkillCategory[];
}
```

---

## Data File (`src/data/projects.ts`)

Single export shape:

```ts
import type { Project, PersonalInfo } from '@/types';

export const personalInfo: PersonalInfo = { /* ... */ };

export const projects: Project[] = [
  /* 2 real (anonymised) + 3 placeholder */
];
```

**No default export** — named exports allow tree-shaking and explicit import at each use site.

---

## Pre-populated Values

### `personalInfo` (from spec)

| Field | Value |
|---|---|
| name | `"Šimon Hyben"` |
| tagline | `"Full-Stack Software Developer"` |
| bio | (5-year bio from spec — see Developer Profile section) |
| profilePhotoPath | `null` (placeholder avatar until photo is provided) |
| resumePdfPath | `null` (disabled button until resume.pdf is added) |
| email | `"hyben.simon@gmail.com"` |
| linkedInUrl | `"https://www.linkedin.com/in/šimon-hyben-19a396225/"` |
| githubUrl | `"https://github.com/shyben"` |
| location | `"Bratislava, Slovakia"` |

### `skillCategories` (from spec)

| label | sample skills |
|---|---|
| Languages | TypeScript, JavaScript, Kotlin, Java, PHP, Python, C/C++ |
| Frontend | Angular, React, Vue.js, Next.js, HTML5, CSS3 |
| Backend | Spring Boot, Next.js API Routes, RESTful APIs |
| Cloud & Infra | Azure, GCP, Docker, Kubernetes, Jenkins, GitHub Actions |
| Databases | PostgreSQL, MySQL, Flyway, Liquibase |
| AI / LLM | Azure AI Foundry, Google Vertex AI, Ollama |
| Tooling | Git, JetBrains IDEs, Figma, GitHub Copilot, Azure DevOps |

### `projects` — initial 5 entries

| # | slug | title | isRealProject |
|---|---|---|---|
| 1 | `reporting-dashboard` | Internal Reporting Dashboard | `true` |
| 2 | `llm-integration-service` | LLM Integration Service | `true` |
| 3 | `ecommerce-platform` | E-Commerce Platform | `false` |
| 4 | `devops-pipeline-toolkit` | DevOps Pipeline Toolkit | `false` |
| 5 | `mobile-task-manager` | Mobile Task Manager | `false` |

---

## State Transitions

Not applicable — all data is static at build time. The only runtime state is:

| State | Location | Persistence |
|---|---|---|
| `theme` (`'light'` \| `'dark'`) | `localStorage` + `data-theme` attr on `<html>` | `localStorage` |
| `isResumeMissing` (boolean) | Derived at render from `personalInfo.resumePdfPath === null` | None |

---

## Entity Relationships

```
PersonalInfo  (1)
  └── skillCategories[]  (many SkillCategory)

Project  (many)
  └── screenshots[]  (many { src, alt })
  └── technologies[]  (many string)
  └── features[]  (many string)
```

No cross-entity references. Projects and PersonalInfo are independent top-level exports.
