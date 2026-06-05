'use client';

import Link from 'next/link';
import { getPlaceholderSvg } from '@/lib/utils';
import GitHubButton from './GitHubButton';
import type { Project } from '@/types';
import styles from './ProjectDetail.module.css';

interface Props {
  project: Project;
}

export default function ProjectDetail({ project }: Props) {
  const paragraphs = project.fullDescription.split('\n\n');

  return (
    <article className={styles.container}>
      {/* Back link */}
      <div className={styles.backRow}>
        <Link href="/#projects" className={styles.backLink}>
          ← Back to Projects
        </Link>
      </div>

      {/* Hero thumbnail */}
      <div className={styles.heroThumb}>
        <img
          src={project.thumbnailImage ?? getPlaceholderSvg(project.title)}
          alt={`${project.title} screenshot`}
          className={styles.heroImg}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = getPlaceholderSvg(project.title);
          }}
        />
      </div>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        <div className={styles.actions}>
          <GitHubButton href={project.githubUrl} label={`${project.title} source code on GitHub`} />
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.demoBtn}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </header>

      {/* Description */}
      <section className={styles.section} aria-labelledby="desc-heading">
        <h2 id="desc-heading" className={styles.sectionTitle}>
          Overview
        </h2>
        {paragraphs.map((p, i) => (
          <p key={i} className={styles.bodyText}>
            {p}
          </p>
        ))}
      </section>

      {/* Technologies */}
      <section className={styles.section} aria-labelledby="tech-heading">
        <h2 id="tech-heading" className={styles.sectionTitle}>
          Technologies
        </h2>
        <div className={styles.tags}>
          {project.technologies.map((tech) => (
            <span key={tech} className={styles.tag}>
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className={styles.section} aria-labelledby="features-heading">
        <h2 id="features-heading" className={styles.sectionTitle}>
          Key Features & Accomplishments
        </h2>
        <ul className={styles.featureList}>
          {project.features.map((feat, i) => (
            <li key={i} className={styles.featureItem}>
              {feat}
            </li>
          ))}
        </ul>
      </section>

      {/* Additional screenshots */}
      {project.screenshots.length > 0 && (
        <section className={styles.section} aria-labelledby="screens-heading">
          <h2 id="screens-heading" className={styles.sectionTitle}>
            Screenshots
          </h2>
          <div className={styles.gallery}>
            {project.screenshots.map((s) => (
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                className={styles.galleryImg}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
