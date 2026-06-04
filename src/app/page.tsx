import Hero from '@/components/hero/Hero';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import About from '@/components/about/About';
import Contact from '@/components/contact/Contact';
import { projects, personalInfo } from '@/data/projects';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="projects" aria-labelledby="projects-heading">
        <ProjectsGrid projects={projects} />
      </section>

      <section id="about" aria-labelledby="about-heading">
        <About personalInfo={personalInfo} />
      </section>

      <section id="contact" aria-labelledby="contact-heading">
        <Contact personalInfo={personalInfo} />
      </section>
    </>
  );
}
