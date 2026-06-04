import type { PersonalInfo } from '@/types';
import styles from './About.module.css';

interface Props {
  personalInfo: PersonalInfo;
}

const InitialsAvatar = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className={styles.avatar} aria-hidden="true">
      {initials}
    </div>
  );
};

export default function About({ personalInfo }: Props) {
  const paragraphs = personalInfo.bio.split('\n\n');

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionLabel}>About Me</p>
        <h2 id="about-heading" className={styles.sectionTitle}>
          Background & Skills
        </h2>
      </div>

      <div className={styles.profile}>
        {/* Photo or initials avatar */}
        <div className={styles.photoWrapper}>
          {personalInfo.profilePhotoPath ? (
            <img
              src={personalInfo.profilePhotoPath}
              alt={`Photo of ${personalInfo.name}`}
              className={styles.photo}
              loading="lazy"
            />
          ) : (
            <InitialsAvatar name={personalInfo.name} />
          )}
        </div>

        <div className={styles.bio}>
          {paragraphs.map((p, i) => (
            <p key={i} className={styles.bioText}>
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* Skills grid */}
      <div className={styles.skillsGrid}>
        {personalInfo.skillCategories.map((cat) => (
          <div key={cat.label} className={styles.skillCategory}>
            <h3 className={styles.categoryLabel}>{cat.label}</h3>
            <div className={styles.tags}>
              {cat.skills.map((skill) => (
                <span key={skill} className={styles.tag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
