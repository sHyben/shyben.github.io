import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { projects } from '@/data/projects';
import type { Project } from '@/types';

/** Merge Tailwind class names safely. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Find a project by slug. Returns undefined if not found. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Generate the diagonal-stripe SVG placeholder as a data URI. */
export function getPlaceholderSvg(label = ''): string {
  const encoded = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
      <rect width="600" height="600" fill="#e8e0d8"/>
      <pattern id="p" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="20" stroke="#d4cbbf" stroke-width="8"/>
      </pattern>
      <rect width="600" height="600" fill="url(#p)"/>
      ${label ? `<text x="300" y="310" font-family="monospace" font-size="18" fill="#9c9080" text-anchor="middle">${label}</text>` : ''}
    </svg>
  `);
  return `data:image/svg+xml,${encoded}`;
}
