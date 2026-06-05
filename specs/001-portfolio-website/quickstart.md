# Quickstart: Portfolio Website

**Purpose**: Validate the implementation end-to-end after development is complete.

---

## Prerequisites

- Node.js 20+ installed (`node --version`)
- npm 10+ installed (`npm --version`)
- Git repository cloned and on branch `001-portfolio-website` (or `main` post-merge)

---

## 1. Install dependencies

```bash
npm ci
```

Expected: no errors, `node_modules/` populated.

---

## 2. Run in development mode

```bash
npm run dev
```

Open `http://localhost:3000` in a browser.

### Checklist — Development

- [ ] Hero section visible with name "Šimon Hyben" in rust accent colour
- [ ] Staggered entrance animation plays on first load (elements fade/slide in sequentially)
- [ ] Light/dark mode toggle visible in navbar; clicking it switches theme instantly
- [ ] Theme persists after page refresh (check `localStorage.getItem('theme')` in DevTools)
- [ ] Navigation links (Projects, About, Contact) scroll to correct sections
- [ ] 5 project cards visible in a responsive grid
- [ ] Hovering a project card scales it to ~1.07 and shows a title overlay
- [ ] GitHub button below each card has a hover colour effect
- [ ] Clicking a project card navigates to `/projects/<slug>/`
- [ ] Project detail page shows title, description, technology tags, features list
- [ ] "Back to Projects" link on detail page returns to home and scrolls to #projects
- [ ] About section shows bio text and skills grid organised by category
- [ ] Resume button is disabled with "Resume coming soon" tooltip (if `resume.pdf` absent)
- [ ] Contact section shows 4 cards: Email, LinkedIn, GitHub, Location
- [ ] Email card `href` is `mailto:hyben.simon@gmail.com`
- [ ] Footer shows name and navigation links
- [ ] No console errors in DevTools

---

## 3. Build the static site

```bash
npm run build
```

Expected: `out/` directory created. No build errors.

```bash
ls out/
# Should include: index.html, projects/, 404.html, images/, _next/
ls out/projects/
# Should include one folder per project slug
```

---

## 4. Preview the static build locally

```bash
npx serve out
```

Open `http://localhost:3000` (or the port serve reports).

### Checklist — Static build

- [ ] All pages from development checklist still work
- [ ] Direct URL navigation to `/projects/reporting-dashboard/` works (no 404)
- [ ] Direct URL navigation to `/projects/llm-integration-service/` works
- [ ] Refreshing a project detail page does not 404
- [ ] Images load correctly (or diagonal-stripe placeholder shows for missing images)
- [ ] No broken asset paths in Network tab

---

## 5. Accessibility check

Run axe DevTools browser extension or `npx axe-cli http://localhost:3000`:

```bash
npx axe-cli http://localhost:3000 --exit
npx axe-cli http://localhost:3000/projects/reporting-dashboard/ --exit
```

Expected: zero critical or serious violations.

---

## 6. Deploy to GitHub Pages (manual)

```bash
# Ensure you're on main and build is fresh
npm run build

# Install gh-pages CLI if needed
npm install -g gh-pages

# Push out/ to gh-pages branch
gh-pages -d out
```

Or push to `main` and let the GitHub Actions workflow (`deploy.yml`) handle it automatically.

After deployment, verify at `https://shyben.github.io`:
- [ ] Site loads without errors
- [ ] All links and routes work as in step 4

---

## 7. Content update workflow (future)

To add a real project:
1. Open `src/data/projects.ts`
2. Copy a placeholder entry, change `isRealProject: false` → `true`
3. Fill in all fields; add screenshot to `public/images/projects/<slug>.webp`
4. Run `npm run build` and verify in `out/`

To add the resume:
1. Place `resume.pdf` in `public/`
2. In `src/data/projects.ts`, set `personalInfo.resumePdfPath = '/resume.pdf'`
3. Rebuild and redeploy

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Flash of wrong theme on load | `<head>` inline theme script missing | Verify `dangerouslySetInnerHTML` script in `app/layout.tsx` |
| 404 on direct project URL | `trailingSlash: true` missing in `next.config.js` | Add `trailingSlash: true` |
| Images 404 after deploy | `assetPrefix` not set | Set `NEXT_PUBLIC_BASE_PATH` env var if deploying to sub-path |
| Resume button always disabled | `resumePdfPath` is `null` | Add `resume.pdf` to `public/` and update data file |
