import type { PersonalInfo } from '@/types';
import styles from './Contact.module.css';

interface Props {
  personalInfo: PersonalInfo;
}

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

export default function Contact({ personalInfo }: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionLabel}>Contact</p>
        <h2 id="contact-heading" className={styles.sectionTitle}>
          Get in Touch
        </h2>
        <p className={styles.subtitle}>
          Open to new opportunities and interesting projects. Feel free to reach out.
        </p>
      </div>

      <div className={styles.cards}>
        {/* Email */}
        <a
          href={`mailto:${personalInfo.email}`}
          className={styles.card}
          aria-label={`Send email to ${personalInfo.email}`}
        >
          <div className={styles.cardIcon}>
            <EmailIcon />
          </div>
          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>Email</span>
            <span className={styles.cardValue}>{personalInfo.email}</span>
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href={personalInfo.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
          aria-label="View LinkedIn profile"
        >
          <div className={styles.cardIcon}>
            <LinkedInIcon />
          </div>
          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>LinkedIn</span>
            <span className={styles.cardValue}>Connect with me</span>
          </div>
        </a>

        {/* GitHub */}
        <a
          href={personalInfo.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
          aria-label="View GitHub profile"
        >
          <div className={styles.cardIcon}>
            <GitHubIcon />
          </div>
          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>GitHub</span>
            <span className={styles.cardValue}>@shyben</span>
          </div>
        </a>

        {/* Location */}
        <div className={styles.card} role="listitem">
          <div className={styles.cardIcon}>
            <LocationIcon />
          </div>
          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>Location</span>
            <span className={styles.cardValue}>{personalInfo.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
