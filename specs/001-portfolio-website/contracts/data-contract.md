# Data Contract: `src/data/projects.ts`

**Type**: Static data module (TypeScript)
**Consumers**: All Next.js pages and components that render portfolio content
**Version**: 1.0 (changes here are breaking changes to the site)

---

## Contract: `personalInfo` export

```ts
export const personalInfo: PersonalInfo
```

**Consumers**:
- `app/layout.tsx` → reads `name` for `<title>` and `<meta name="author">`
- `components/hero/Hero.tsx` → reads `name`, `tagline`
- `components/about/About.tsx` → reads `bio`, `profilePhotoPath`, `skillCategories`
- `components/contact/Contact.tsx` → reads `email`, `linkedInUrl`, `githubUrl`, `location`
- `components/footer/Footer.tsx` → reads `name`, `githubUrl`
- `app/layout.tsx` resume button → reads `resumePdfPath`

**Breaking changes** (require component updates):
- Removing any field listed above
- Changing `skillCategories` from array to object
- Changing `resumePdfPath` semantics (currently: `null` = disabled, string = enabled)

**Non-breaking changes** (no component updates needed):
- Adding new optional fields
- Changing string values (name, tagline, bio, etc.)
- Reordering `skillCategories`

---

## Contract: `projects` export

```ts
export const projects: Project[]
```

**Consumers**:
- `app/page.tsx` → renders `ProjectsGrid` with full array
- `app/projects/[slug]/page.tsx` → calls `generateStaticParams()` using `projects.map(p => p.slug)`
  and finds the matching project by slug for the detail page
- `components/projects/ProjectCard.tsx` → reads `slug`, `title`, `shortDescription`,
  `thumbnailImage`, `githubUrl`
- `components/projects/ProjectDetail.tsx` → reads all fields

**Slug contract** (critical for static generation):
- Adding a project with a new slug → new static page generated at next build ✅
- Changing an existing slug → old URL returns 404; implement a redirect if needed ⚠️
- Removing a project → its URL returns 404 at next build ⚠️

**Breaking changes**:
- Removing `slug`, `title`, `shortDescription`, `githubUrl`, `thumbnailImage` fields
- Changing `technologies` or `features` from `string[]` to any other shape

**Non-breaking changes**:
- Adding/removing items from the `projects` array
- Adding optional fields to the `Project` interface
- Changing string values within an existing project
