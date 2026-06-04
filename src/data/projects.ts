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
  profilePhotoPath: null, // TODO: Add your photo to public/images/profile/profile.webp and set path here
  resumePdfPath: null,    // TODO: Add resume.pdf to public/ and set to "/resume.pdf"
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
  // ── REAL PROJECT 1 ────────────────────────────────────────────────────────
  {
    slug: 'reporting-dashboard',
    title: 'Internal Reporting Dashboard',
    shortDescription:
      'Enterprise analytics platform serving financial data to 3,000+ employees across Erste Group subsidiaries.',
    fullDescription:
      'Designed and delivered a full-stack internal reporting dashboard for a major Central European banking group. The system aggregates financial KPIs, risk metrics, and operational data across multiple subsidiaries into a single, role-based interface.\n\nOwned the complete lifecycle from requirements analysis with business stakeholders through schema design, API development, Angular frontend, and Azure deployment. Integrated a migration-first database strategy using Flyway to safely evolve the PostgreSQL schema across quarterly releases without downtime.',
    technologies: ['Angular', 'TypeScript', 'Spring Boot', 'Kotlin', 'PostgreSQL', 'Flyway', 'Azure Container Apps', 'Azure DevOps'],
    features: [
      'Role-based access control aligned with organisational hierarchy across 8 subsidiaries',
      'Real-time aggregation of financial KPIs with configurable date-range and entity filters',
      'Zero-downtime schema migrations via Flyway with automated rollback strategy',
      'CI/CD pipeline on Azure DevOps deploying containerised services to Azure Container Apps',
      'Responsive UI supporting both desktop and tablet use by non-technical finance staff',
    ],
    thumbnailImage: null,
    screenshots: [],
    githubUrl: 'https://github.com/shyben',
    demoUrl: null,
    isRealProject: true,
  },

  // ── REAL PROJECT 2 ────────────────────────────────────────────────────────
  {
    slug: 'llm-integration-service',
    title: 'LLM Integration Service',
    shortDescription:
      'Microservice bridging enterprise workflows with Azure AI Foundry and Vertex AI for document analysis and process automation.',
    fullDescription:
      'Architected and implemented a production LLM integration service that connects internal business workflows to Azure AI Foundry and Google Vertex AI. The service handles prompt engineering, response streaming, context windowing, and fallback routing between cloud LLM providers.\n\nDeployed on GCP Kubernetes Engine with Ollama for local model fallback in offline/restricted environments. Reduced average document-processing time by 60% compared to the manual review baseline and enabled a team of 40 analysts to handle 3× the volume.',
    technologies: ['Kotlin', 'Spring Boot', 'Azure AI Foundry', 'Google Vertex AI', 'Ollama', 'Docker', 'GCP GKE', 'PostgreSQL'],
    features: [
      'Multi-provider routing: Azure AI Foundry → Vertex AI → Ollama fallback chain',
      'Streaming responses with server-sent events for low-latency UX in the consuming Angular app',
      'Context-window management and token counting to stay within model limits',
      'Prompt versioning system allowing A/B evaluation of prompt variants in production',
      '60% reduction in document processing time vs. manual analyst review baseline',
    ],
    thumbnailImage: null,
    screenshots: [],
    githubUrl: 'https://github.com/shyben',
    demoUrl: null,
    isRealProject: true,
  },

  // ── PLACEHOLDER PROJECT 3 ─────────────────────────────────────────────────
  // TODO: Replace this placeholder with a real project.
  // Steps: fill in all fields, add thumbnail to public/images/projects/ecommerce-platform.webp, set isRealProject: true.
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    shortDescription:
      'Full-stack online store with product catalogue, cart, checkout, and order management.',
    fullDescription:
      'A feature-complete e-commerce platform built with a React/Next.js storefront and a REST API backend. Includes product catalogue with search and filtering, a persistent shopping cart, Stripe-integrated checkout, and an admin order management interface.\n\nImplemented optimistic UI updates for cart interactions, lazy-loaded product images for performance, and a headless CMS integration for marketing content updates without code deploys.',
    technologies: ['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    features: [
      'Product catalogue with full-text search, category filtering, and sort options',
      'Persistent cart with optimistic UI updates and local-storage sync',
      'Stripe checkout integration with webhook-based order fulfilment',
      'Admin dashboard for order management and inventory updates',
      'Headless CMS integration for marketing banners and featured products',
    ],
    thumbnailImage: null,
    screenshots: [],
    githubUrl: 'https://github.com/shyben',
    demoUrl: null,
    isRealProject: false,
  },

  // ── PLACEHOLDER PROJECT 4 ─────────────────────────────────────────────────
  // TODO: Replace this placeholder with a real project.
  // Steps: fill in all fields, add thumbnail to public/images/projects/devops-pipeline-toolkit.webp, set isRealProject: true.
  {
    slug: 'devops-pipeline-toolkit',
    title: 'DevOps Pipeline Toolkit',
    shortDescription:
      'CLI toolkit automating CI/CD pipeline scaffolding and environment configuration across cloud providers.',
    fullDescription:
      'A command-line toolkit that generates and validates CI/CD pipeline configurations for GitHub Actions and Jenkins, targeting Azure and GCP deployment targets. Eliminates repetitive boilerplate setup for new microservices and enforces organisation-wide pipeline standards.\n\nWrites environment-specific Kubernetes manifests, sets up secrets management via Azure Key Vault or GCP Secret Manager, and validates configurations against a library of security and compliance rules before the first deploy.',
    technologies: ['Python', 'Click', 'GitHub Actions', 'Jenkins', 'Docker', 'Kubernetes', 'Azure', 'GCP'],
    features: [
      'Interactive CLI scaffolding for GitHub Actions and Jenkins pipelines',
      'Multi-cloud support: Azure Container Apps and GCP GKE deployment targets',
      'Automatic Kubernetes manifest generation with resource limits and health-check defaults',
      'Secrets management integration with Azure Key Vault and GCP Secret Manager',
      'Pre-deploy validation against 30+ security and compliance rule checks',
    ],
    thumbnailImage: null,
    screenshots: [],
    githubUrl: 'https://github.com/shyben',
    demoUrl: null,
    isRealProject: false,
  },

  // ── PLACEHOLDER PROJECT 5 ─────────────────────────────────────────────────
  // TODO: Replace this placeholder with a real project.
  // Steps: fill in all fields, add thumbnail to public/images/projects/mobile-task-manager.webp, set isRealProject: true.
  {
    slug: 'mobile-task-manager',
    title: 'Mobile Task Manager',
    shortDescription:
      'Cross-platform productivity app with offline sync, project hierarchies, and team collaboration.',
    fullDescription:
      'A cross-platform mobile task manager built for teams that need reliable offline-first task tracking. Tasks, projects, and comments are stored locally and synced to a shared backend when connectivity is restored, with conflict resolution based on vector clocks.\n\nSupports nested project hierarchies, due-date reminders via push notifications, and a Kanban board view. The backend exposes a GraphQL API consumed by both the mobile client and a companion web app.',
    technologies: ['React Native', 'TypeScript', 'GraphQL', 'Node.js', 'PostgreSQL', 'Expo', 'Redux Toolkit'],
    features: [
      'Offline-first architecture with vector-clock conflict resolution on sync',
      'Nested project hierarchies with drag-and-drop task reordering',
      'Kanban board view with swimlanes per assignee or project',
      'Push notification reminders with per-device scheduling',
      'GraphQL API shared between mobile client and web companion app',
    ],
    thumbnailImage: null,
    screenshots: [],
    githubUrl: 'https://github.com/shyben',
    demoUrl: null,
    isRealProject: false,
  },
];
