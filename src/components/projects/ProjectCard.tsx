'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { getPlaceholderSvg } from '@/lib/utils';
import GitHubButton from './GitHubButton';
import type { Project } from '@/types';
import styles from './projects.module.css';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const reducedMotion = useReducedMotion();

  const hoverProps = reducedMotion
    ? {}
    : {
        whileHover: { scale: 1.07 },
        transition: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] },
      };

  return (
    <article className={styles.cardWrapper}>
      <motion.div className={styles.card} {...hoverProps}>
        <Link
          href={`/projects/${project.slug}/`}
          className={styles.thumbnailLink}
          aria-label={`View ${project.title} project details`}
        >
          {/* Thumbnail */}
          <div className={styles.thumbnail}>
            <img
              src={project.thumbnailImage ?? getPlaceholderSvg(project.title)}
              alt={`${project.title} screenshot`}
              loading="lazy"
              decoding="async"
              className={styles.thumbnailImg}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = getPlaceholderSvg(project.title);
              }}
            />
            {/* Hover overlay */}
            <div className={styles.overlay} aria-hidden="true">
              <span className={styles.overlayTitle}>{project.title}</span>
              <span className={styles.overlayHint}>View details →</span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Card footer */}
      <div className={styles.cardFooter}>
        <h3 className={styles.cardTitle}>
          <Link href={`/projects/${project.slug}/`} className={styles.cardTitleLink}>
            {project.title}
          </Link>
        </h3>
        <p className={styles.cardDesc}>{project.shortDescription}</p>
        <GitHubButton href={project.githubUrl} label={`${project.title} on GitHub`} />
      </div>
    </article>
  );
}
