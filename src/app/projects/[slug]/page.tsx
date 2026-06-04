import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { getProjectBySlug } from '@/lib/utils';
import ProjectDetail from '@/components/projects/ProjectDetail';

interface Props {
  params: { slug: string };
}

/** Pre-generate one static page per project slug at build time. */
export function generateStaticParams(): Array<{ slug: string }> {
  return projects.map((p) => ({ slug: p.slug }));
}

/** Per-project <title> and <meta description>. */
export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Šimon Hyben`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Šimon Hyben`,
      description: project.shortDescription,
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
