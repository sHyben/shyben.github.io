# Feature Specification: Portfolio Website

**Feature Branch**: `001-portfolio-website`
**Created**: 2026-06-04
**Status**: Draft
**Input**: User description: "Production-ready portfolio website using React/Next.js for a software developer job seeker"

## Design Reference

A high-fidelity interactive prototype was created in Claude Design and MUST be used as the
primary visual reference during implementation:

**Design URL**: https://claude.ai/design/p/ca167355-34c0-4beb-9877-afe626e8922e?file=Portfolio+Page.html

The design establishes the following non-negotiable visual decisions (do not deviate without
explicit owner approval):

- **Aesthetic**: Bold & editorial — strong display typography, high contrast
- **Accent color**: Rust/terracotta (warm orange-red), used on the developer's name in the hero
  and as the primary interactive accent throughout
- **Color mode**: Light/dark mode toggle, persisting in `localStorage`, respecting system
  `prefers-color-scheme`; both modes must look polished
- **Backgrounds**: Subtly-toned whites and blacks (low saturation), not pure #000/#fff
- **Typography**: Display-weight font for headings (editorial feel), clean sans-serif for body;
  1–2 font families maximum
- **Project card thumbnails**: Square aspect ratio with a diagonal stripe SVG pattern as
  placeholder; real screenshots replace these
- **Card hover overlay**: On hover, a semi-transparent overlay with project title appears over
  the thumbnail (in addition to the scale 1.05–1.10 zoom)
- **Animations**: Medium intensity — staggered entrance animations on page load for hero
  elements and project cards; hover state transitions on all interactive elements
- **Skills grid**: In the About section, skills are organized by category (Languages, Frontend,
  Backend, Cloud & Infra, Databases, AI/LLM, Tooling) displayed as visual tag groups
- **Contact layout**: Contact details displayed as individual cards (Email, LinkedIn, GitHub,
  Location), not a plain list
- **Files produced by the design** (use as implementation starting point if exported):
  - `Portfolio Page.html` — CSS design system + root App component
  - `portfolio-components.jsx` — all React components
  - `portfolio-data.js` — single data file for all content
  - `README.md` — GitHub Pages deployment guide

## Developer Profile (Pre-filled Content)

The following real content MUST be pre-populated in the data file; no placeholder values needed
for these fields:

**Name**: Šimon Hyben
**Role**: Full-Stack Software Developer
**Bio**: Full-stack software engineer with 5 years of experience delivering end-to-end web
applications in a regulated financial services environment. Proven track record of independently
owning the full development lifecycle — from requirements analysis through deployment and
infrastructure maintenance — across cloud platforms including Azure and GCP. Adept at
modernising legacy systems, integrating AI/LLM services, and shipping production-grade
solutions used by thousands of employees across Erste Group.

**Tech stack** (to populate the skills grid):
- Languages: TypeScript, JavaScript, Kotlin, Java, PHP, Python, C/C++
- Frontend: Angular, React, Vue.js, Next.js (SSR), HTML5, CSS3
- Backend: Spring Boot (Kotlin/Java), Next.js API, RESTful APIs
- Cloud & Infra: Azure (Container Apps, DevOps, AI Foundry, Entra ID / AD), GCP (GKE,
  Vertex AI), Docker, Kubernetes, Jenkins, GitHub Actions
- Databases: PostgreSQL, MySQL, Flyway/Liquibase migrations
- AI/LLM: Azure AI Foundry, Google Vertex AI, Ollama (local LLMs)
- Tooling: Git, JetBrains IDEs, Figma, GitHub Copilot, MS Azure DevOps

**Contact**:
- Email: hyben.simon@gmail.com
- LinkedIn: https://www.linkedin.com/in/šimon-hyben-19a396225/
- GitHub: https://github.com/shyben (profile; `shyben.github.io` is the portfolio URL)
- Location: Bratislava, Slovakia

**Resume**: Provided by the developer before deployment; button links to `./resume.pdf`.
Use a disabled button with tooltip "Resume coming soon" if the file is absent.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First Impression & Navigation (Priority: P1)

A hiring manager or recruiter lands on the portfolio homepage for the first time. Within seconds
they understand who Šimon is, see the bold editorial hero section (name in rust accent,
professional tagline, staggered entrance animation), and can navigate to any section using the
persistent top nav.

**Why this priority**: The hero section and navigation are the gateway to all other content.
Without them, no other story is reachable. A visitor who cannot orient themselves within the
first 10 seconds will leave.

**Independent Test**: Open the homepage in a browser; verify the hero section is visible, Šimon's
name appears in the rust accent colour, entrance animations play, and all navigation links
(Projects, About, Resume, Contact) scroll to or route to their target sections.

**Acceptance Scenarios**:

1. **Given** a visitor opens the portfolio URL, **When** the page loads, **Then** a full-width
   hero section appears with Šimon's name in the rust accent, professional tagline, and a clear
   call-to-action; hero elements animate in with a staggered entrance effect.
2. **Given** the page is loaded, **When** the visitor clicks any navigation link, **Then** the
   page scrolls to or navigates to the correct section without a full page reload.
3. **Given** the visitor is on a mobile device, **When** they open the navigation, **Then** a
   responsive menu appears and all links remain accessible.
4. **Given** the visitor clicks the light/dark mode toggle, **When** the mode changes, **Then**
   the entire site switches colour scheme instantly and the preference is remembered on next visit.

---

### User Story 2 - Browsing the Projects Grid (Priority: P2)

A technical hiring manager scrolls to the projects section and browses a responsive grid of
square project cards. Each card shows a screenshot thumbnail (or diagonal-stripe placeholder).
On hover the card zooms in and reveals an overlay with the project title. Below each card a
styled GitHub button links to the source code.

**Why this priority**: Projects are the primary evidence of technical skill. This section must
work flawlessly and look impressive to convert a curious visitor into an interested interviewer.

**Independent Test**: Navigate to the Projects section; confirm 5 project cards are rendered in
a grid; hover each card to observe the zoom animation and overlay; click a GitHub button to
confirm the external link opens in a new tab.

**Acceptance Scenarios**:

1. **Given** the visitor is on the Projects section, **When** the page renders, **Then** 5
   project cards are displayed in a responsive grid (1 column mobile → 3 columns desktop) with
   staggered entrance animations.
2. **Given** a project card is visible, **When** the visitor hovers over it, **Then** the card
   scales to 1.05–1.10 with a smooth transition, and a semi-transparent overlay showing the
   project title fades in.
3. **Given** a project card is visible, **When** the visitor clicks the GitHub button below it,
   **Then** the project's GitHub repository opens in a new browser tab; the button shows a
   visible hover effect (colour shift or glow) matching the rust accent.
4. **Given** the visitor is on mobile, **When** they view the projects grid, **Then** cards stack
   vertically and GitHub buttons remain fully tappable.

---

### User Story 3 - Viewing a Project Detail Page (Priority: P2)

A hiring manager clicks on a project card thumbnail and is taken to a dedicated project detail
page. They read the full description, see the technologies used as visual tags, review key
features and accomplishments, and optionally view a demo link.

**Why this priority**: Detail pages transform a thumbnail impression into a compelling story.
Technical interviewers look for depth — stack choices, problem-solving, outcomes — that cannot
fit on a card.

**Independent Test**: Click any project card; verify navigation to a detail page that shows
title, full description, technology tag list, features/accomplishments, and at least one
screenshot or demo link. Use the "Back to Projects" link to return to the grid.

**Acceptance Scenarios**:

1. **Given** the visitor clicks a project card, **When** the detail page loads, **Then** it
   displays: project title, full description (≥ 2 sentences), technologies as styled tag chips,
   key features/accomplishments as a bulleted list, and a screenshot or demo link.
2. **Given** the visitor is on a project detail page, **When** they click "Back to Projects" or
   use browser navigation, **Then** they return to the projects grid without losing scroll
   position.
3. **Given** an invalid project URL is accessed directly, **When** the page renders, **Then** a
   friendly "Project not found" message is shown with a link back to the homepage.

---

### User Story 4 - About, Resume, and Contact (Priority: P3)

A recruiter wants to learn about Šimon's background, download the resume as a PDF, and reach
out. The About section displays the bio and the full skills grid organised by category. The
Contact section shows cards for Email, LinkedIn, GitHub, and Location. The resume download
button is clearly visible.

**Why this priority**: These sections support conversion — turning a browser into a candidate
contact. They are lower priority than projects because they supplement rather than establish
technical credibility.

**Independent Test**: Navigate to About and verify the bio text and categorised skills grid are
visible; click the Resume download button and confirm a PDF downloads or opens; locate the
Contact section and verify email, LinkedIn, GitHub, and location cards are all present.

**Acceptance Scenarios**:

1. **Given** the visitor navigates to About, **When** the section renders, **Then** a
   professional photo placeholder (or real photo), the 5-year bio, and the skills grid organised
   by category (Languages, Frontend, Backend, Cloud & Infra, Databases, AI/LLM, Tooling) are
   all visible.
2. **Given** the visitor clicks the Resume/CV download button, **When** the browser responds,
   **Then** `resume.pdf` downloads or opens in a new tab; if the file is absent, a "Resume
   coming soon" tooltip is displayed instead of a silent failure.
3. **Given** the visitor navigates to Contact, **When** the section renders, **Then** four
   contact cards are visible: Email (hyben.simon@gmail.com), LinkedIn, GitHub, and Location
   (Bratislava, Slovakia).

---

### Edge Cases

- What happens when a project screenshot image fails to load? The diagonal-stripe SVG
  placeholder is shown instead of a broken image icon.
- What happens if the resume PDF file is missing? The download button is disabled with a
  "Resume coming soon" tooltip; no silent failure.
- How does the site behave when JavaScript is disabled? Core content (hero text, project list,
  contact info) must remain readable; animations and dark mode toggle degrade gracefully.
- How does the projects grid look with fewer than 5 cards? The grid must not leave orphaned or
  misaligned empty cells.
- How does the light/dark mode look on first visit with no stored preference? The site reads
  `prefers-color-scheme` and defaults accordingly.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST display a bold editorial hero section with Šimon's name in the rust
  accent colour and staggered entrance animations for hero elements.
- **FR-002**: The site MUST provide a persistent navigation bar linking to: Projects, About,
  Resume/CV, and Contact.
- **FR-003**: The site MUST include a light/dark mode toggle that persists via `localStorage`
  and respects `prefers-color-scheme` on first visit.
- **FR-004**: The projects section MUST render 5 project cards in a responsive grid (1 → 3
  columns), each showing a square screenshot thumbnail with a diagonal-stripe SVG placeholder.
- **FR-005**: Project cards MUST exhibit a smooth zoom animation (scale 1.05–1.10) and a
  semi-transparent title overlay on hover.
- **FR-006**: Project cards MUST have staggered entrance animations that play on page load.
- **FR-007**: Each project card MUST include a styled GitHub button with a rust-accent hover
  effect that opens the repository URL in a new tab.
- **FR-008**: Clicking a project card thumbnail MUST navigate to a dedicated project detail page.
- **FR-009**: Project detail pages MUST display: title, full description, technology tag chips,
  bulleted features/accomplishments, and at least one screenshot or demo link.
- **FR-010**: Project detail pages MUST include a "Back to Projects" link.
- **FR-011**: The About section MUST display: professional photo (placeholder acceptable),
  the 5-year bio, and a skills grid organised by category.
- **FR-012**: The site MUST provide a Resume/CV download button linked to `./resume.pdf`; if
  the file is absent, the button MUST be disabled with a "Resume coming soon" tooltip.
- **FR-013**: The Contact section MUST display four info cards: Email, LinkedIn, GitHub, Location.
- **FR-014**: The footer MUST include navigation links and copyright information.
- **FR-015**: The site MUST be fully responsive across mobile (≥ 320 px), tablet (≥ 768 px),
  and desktop (≥ 1280 px) viewports.
- **FR-016**: All images MUST have descriptive alternative text meeting WCAG 2.1 AA standards.
- **FR-017**: All personal content (bio, projects, skills, contact info) MUST be maintained in
  a single data file; no code changes required to update content.
- **FR-018**: The site MUST be deployable as a fully static site to GitHub Pages at
  `shyben.github.io` with no server-side rendering at runtime.

### Key Entities

- **Project**: id, title, shortDescription, fullDescription, technologies (array), features
  (array), screenshots (array of image paths), githubUrl, demoUrl (optional), thumbnailImage.
- **PersonalInfo**: name, tagline, bio, profilePhotoPath, resumePdfPath, email, linkedInUrl,
  githubUrl, location, skills (object keyed by category).
- **ContactMessage**: senderName, senderEmail, messageBody, submittedAt.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The homepage hero section is visible and fully rendered within 2 seconds on a
  standard broadband connection (≥ 25 Mbps).
- **SC-002**: All navigation links reach their target sections within 0.5 seconds of being
  clicked (no perceptible delay).
- **SC-003**: Project card hover animations (zoom + overlay) are visually complete within
  300 ms with no frame drops visible to the naked eye.
- **SC-004**: The Resume PDF downloads or opens within 3 seconds of the button being clicked
  on a standard broadband connection.
- **SC-005**: The site passes WCAG 2.1 AA automated checks with zero critical violations.
- **SC-006**: The site renders correctly and all interactive elements are usable on screen
  widths from 320 px to 2560 px without horizontal scrolling.
- **SC-007**: A visitor can navigate from the homepage to a project detail page and back to
  the projects grid in under 5 seconds total interaction time.
- **SC-008**: Switching all portfolio content (projects, bio, contact) requires editing only
  the single data file; no other code files need to change.
- **SC-009**: The static build completes without errors and produces a self-contained output
  directory deployable to GitHub Pages.
- **SC-010**: Light/dark mode toggle switches the full site colour scheme within 100 ms with
  no flash of unstyled content.

## Assumptions

- The portfolio is deployed to `shyben.github.io` (GitHub Pages user site); `basePath` is
  empty string. If later moved to a project sub-path, `basePath` must be updated in config.
- Real project screenshots will be supplied by Šimon before launch; diagonal-stripe SVG
  placeholders are acceptable for the initial build.
- A real profile photo will be supplied before launch; an initials-avatar or solid-colour
  placeholder is acceptable initially.
- The resume PDF (`resume.pdf`) will be placed in `public/` before launch; the "coming soon"
  disabled button covers the absent-file case.
- Contact form (if included beyond card links) will route via Formspree or equivalent
  zero-backend service; a `mailto:` link is acceptable as fallback.
- Mobile browser support targets the two latest versions of Chrome, Firefox, and Safari on
  iOS/Android.
- No analytics, cookie consent banners, or GDPR tooling required for the initial version.
- The Claude Design prototype at the URL in the Design Reference section is the authoritative
  visual specification; any ambiguity in written requirements defers to the visual design.
