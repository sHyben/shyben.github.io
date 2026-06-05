/**
 * ============================================================
 * PORTFOLIO DATA — SINGLE SOURCE OF TRUTH
 * ============================================================
 * Edit this file to update all portfolio content.
 * No other code files need to change for content updates.
 *
 * HOW TO ADD A PROJECT:
 *   1. Copy a project object below and add it to the array.
 *   2. Give it a unique slug (kebab-case, e.g. "my-project").
 *   3. Add a thumbnail: public/images/projects/<slug>.webp
 *      (If omitted or null, a diagonal-stripe placeholder renders.)
 *   4. Set isRealProject: true and fill in all fields.
 *   5. Run `npm run build` to verify.
 *
 * HOW TO ADD THE RESUME:
 *   1. Place your resume.pdf in the /public directory.
 *   2. Set personalInfo.resumePdfPath to "/resume.pdf".
 *   3. Rebuild and redeploy.
 *
 * HOW TO UPDATE CONTACT INFO:
 *   Edit the personalInfo object below.
 * ============================================================
 */

import type { Project, PersonalInfo } from '@/types';

// ---------------------------------------------------------------------------
// Personal Information
// ---------------------------------------------------------------------------

export const personalInfo: PersonalInfo = {
  name: 'Šimon Hyben',
  tagline: 'Full-Stack Software Developer',
  bio: 'Full-stack software engineer with 5 years of experience delivering end-to-end web applications in a regulated financial services environment. Proven track record of independently owning the full development lifecycle — from requirements analysis through deployment and infrastructure maintenance — across cloud platforms including Azure and GCP.\n\nAdept at modernising legacy systems, integrating AI/LLM services, and shipping production-grade solutions used by thousands of employees across Erste Group.',
  profilePhotoPath: '/images/profile/profile.webp',
  resumePdfPath: '/resume.pdf',
  email: 'hyben.simon@gmail.com',
  linkedInUrl: 'https://www.linkedin.com/in/%C5%A1imon-hyben-19a396225/',
  githubUrl: 'https://github.com/shyben',
  location: 'Bratislava, Slovakia',
  skillCategories: [
    {
      label: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'Kotlin', 'Java', 'PHP', 'Python', 'C/C++'],
    },
    {
      label: 'Frontend',
      skills: ['Angular', 'React', 'Vue.js', 'Next.js', 'HTML5', 'CSS3'],
    },
    {
      label: 'Backend',
      skills: ['Spring Boot', 'Next.js API Routes', 'RESTful APIs'],
    },
    {
      label: 'Cloud & Infra',
      skills: ['Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions'],
    },
    {
      label: 'Databases',
      skills: ['PostgreSQL', 'MySQL', 'Flyway', 'Liquibase'],
    },
    {
      label: 'AI / LLM',
      skills: ['Azure AI Foundry', 'Google Vertex AI', 'Ollama'],
    },
    {
      label: 'Tooling',
      skills: ['Git', 'JetBrains IDEs', 'Figma', 'GitHub Copilot', 'Azure DevOps'],
    },
  ],
};

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  // ── FRESH TRACK PROJECT ────────────────────────────────────────────────────────
  {
    slug: 'freshtrack',
    title: 'FreshTrack',
    shortDescription:
        'PWA for scanning Slovak grocery receipts, tracking pantry expiry dates, and reducing household food waste.',
    fullDescription:
        'FreshTrack lets households scan QR codes from Slovak eKasa fiscal receipts to automatically import purchases, categorize items with AI, and track expiry dates across a pantry inventory.\n\nThe categorization pipeline chains three strategies: shelf-life rule matching first, then a Claude Haiku batch fallback, then SlovakBERT embedding nearest-neighbor search (top-3 suggestions with confidence scores). A custom FastAPI microservice deployed on Hugging Face Spaces handles the Slovak-language embeddings, and the main app degrades gracefully if it is unreachable.\n\nBuilt on Next.js App Router with Supabase for auth, PostgreSQL, and Row Level Security. Prisma manages schema and migrations but is never used at runtime so RLS is always enforced. A Vercel Cron job fires daily push notifications for items expiring soon.',
    technologies: [
      'Next.js',
      'TypeScript',
      'React',
      'Supabase',
      'PostgreSQL',
      'Prisma',
      'Tailwind CSS',
      'Claude Haiku',
      'Python',
      'FastAPI',
    ],
    features: [
      'Slovak eKasa QR receipt scanning with automatic item import and name normalisation',
      'Three-stage AI categorisation: rule matching → Claude Haiku → SlovakBERT embedding nearest-neighbour',
      'Pantry inventory with per-item expiry tracking and fresh / expiring / expired status',
      'Daily push notifications via Web Push API and Vercel Cron',
      'Admin panel for user management and app-level settings',
      'Offline-capable PWA with service worker caching',
      'Full i18n support (Slovak and English) via cookie-based locale switching',
    ],
    thumbnailImage: '/images/projects/fresh-track/fresh-track_thumbnail.webp',
    screenshots: [{src: '/images/projects/fresh-track/fresh-track_screenshot1.webp', alt: 'Overview'}, {src: '/images/projects/fresh-track/fresh-track_screenshot2.webp', alt: 'Pantry'}, {src: '/images/projects/fresh-track/fresh-track_screenshot3.webp', alt: 'Adding items from receipt'},],
    githubUrl: 'https://github.com/sHyben/freshtrack',
    demoUrl: 'https://project-duao3.vercel.app',
    isRealProject: true,
  },

  // ── local-llm-chatbot PROJECT ────────────────────────────────────────────────────────
  {
    slug: 'local-llm-chatbot',
    title: 'Ollama Chat — Local LLM Chatbot',
    shortDescription:
        'Privacy-first chatbot web app that connects to a local Ollama instance for fully on-device LLM conversations.',
    fullDescription:
        'A full-stack chatbot built with Next.js that proxies all inference through a locally running Ollama instance — no data leaves the machine. Supports real-time streaming responses, GitHub-Flavored Markdown rendering, and collapsible thinking blocks for reasoning models like DeepSeek and QwQ.\n\nFiles and web pages are first-class inputs: images are base64-encoded for vision models, PDFs and DOCX files are extracted server-side, and any URL pasted into the chat is automatically fetched and injected as context. Conversations persist in IndexedDB across browser restarts, and a background LLM call extracts user facts every five exchanges to build a cross-conversation memory that personalises future responses.',
    technologies: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'IndexedDB',
      'Ollama',
    ],
    features: [
      'Real-time streaming responses with mid-stream cancellation support',
      'Collapsible thinking-block renderer for reasoning models (DeepSeek, QwQ)',
      'File uploads: images sent to vision models, PDFs and DOCX extracted server-side',
      'Automatic URL fetching — paste any link and the page content is injected as context',
      'Multi-conversation sidebar with IndexedDB persistence and auto-titling',
      'LLM-driven user memory: facts extracted every 5 exchanges and injected into every new conversation',
      'Dark/light/system theme with full Markdown and GFM table rendering',
    ],
    thumbnailImage: '/images/projects/local-llm-chatbot/local-llm-chatbot_thumbnail.webp',
    screenshots: [],
    githubUrl: 'https://github.com/sHyben/local-llm-chatbot',
    demoUrl: null,
    isRealProject: true,
  }
];
