'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { personalInfo } from '@/data/projects';
import styles from './Hero.module.css';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  const reducedMotion = useReducedMotion();

  const resolved = reducedMotion
    ? { hidden: {}, show: {} }
    : containerVariants;

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <motion.div
        className={styles.content}
        variants={resolved}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={itemVariants} className={styles.greeting}>
          Hello, I&apos;m
        </motion.p>

        <motion.h1 variants={itemVariants} id="hero-heading" className={styles.name}>
          {personalInfo.name}
        </motion.h1>

        <motion.p variants={itemVariants} className={styles.tagline}>
          {personalInfo.tagline}
        </motion.p>

        <motion.p variants={itemVariants} className={styles.bio}>
          {personalInfo.bio.split('\n\n')[0]}
        </motion.p>

        <motion.div variants={itemVariants} className={styles.cta}>
          <a href="/#projects" className={styles.ctaPrimary}>
            View Projects
          </a>
          <a href="/#contact" className={styles.ctaSecondary}>
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative background accent */}
      <div className={styles.accent} aria-hidden="true" />
    </section>
  );
}
