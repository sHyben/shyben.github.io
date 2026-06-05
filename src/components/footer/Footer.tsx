import Link from 'next/link';
import { personalInfo } from '@/data/projects';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.name}>{personalInfo.name}</span>
          <span className={styles.tagline}>{personalInfo.tagline}</span>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <a href="/#projects" className={styles.link}>Projects</a>
          <a href="/#about" className={styles.link}>About</a>
          <a href="/#contact" className={styles.link}>Contact</a>
          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub ↗
          </a>
        </nav>

        <p className={styles.copy}>
          © {year} {personalInfo.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
