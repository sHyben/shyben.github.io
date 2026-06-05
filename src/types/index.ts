export interface Project {
  /** URL-safe slug — used as route /projects/<slug>/ */
  slug: string;
  /** Short display title. Max 60 chars. */
  title: string;
  /** 1-2 sentence summary shown on the card. Max 160 chars. */
  shortDescription: string;
  /** Full description shown on detail page. Paragraphs separated by \n\n. */
  fullDescription: string;
  /** Ordered tech names shown as tag chips on detail page. */
  technologies: string[];
  /** Bulleted accomplishments/features on detail page. */
  features: string[];
  /**
   * Thumbnail path relative to /public, e.g. "/images/projects/my-app.webp".
   * null → renders diagonal-stripe SVG placeholder.
   */
  thumbnailImage: string | null;
  /** Additional screenshots on detail page. */
  screenshots: Array<{ src: string; alt: string }>;
  /** Full GitHub repo URL. Required. */
  githubUrl: string;
  /** Optional live demo URL. */
  demoUrl?: string | null;
  /** true = real project (anonymised), false = generic placeholder */
  isRealProject: boolean;
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  /** Bio paragraphs separated by \n\n */
  bio: string;
  /** Path relative to /public, e.g. "/images/profile/profile.webp". null → initials avatar. */
  profilePhotoPath: string | null;
  /** Path relative to /public, e.g. "/resume.pdf". null → disabled download button. */
  resumePdfPath: string | null;
  email: string;
  linkedInUrl: string;
  githubUrl: string;
  location: string;
  skillCategories: SkillCategory[];
}
