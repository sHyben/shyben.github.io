'use client';

import { motion, useReducedMotion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import type { Project } from '@/types';
import styles from './projects.module.css';

interface Props {
  projects: Project[];
}

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function ProjectsGrid({ projects }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionLabel}>Portfolio</p>
        <h2 id="projects-heading" className={styles.sectionTitle}>
          Selected Projects
        </h2>
      </div>

      <motion.div
        className={styles.grid}
        variants={reducedMotion ? {} : gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {projects.map((project) =>
          reducedMotion ? (
            <ProjectCard key={project.slug} project={project} />
          ) : (
            <motion.div key={project.slug} variants={cardVariants}>
              <ProjectCard project={project} />
            </motion.div>
          )
        )}
      </motion.div>
    </div>
  );
}
