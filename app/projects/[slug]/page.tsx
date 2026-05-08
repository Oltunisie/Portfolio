import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectPageClient from "@/components/ProjectPageClient";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  return { title: project ? `${project.title} — Omar Lemkecher` : "Project" };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();
  return <ProjectPageClient project={project} />;
}
