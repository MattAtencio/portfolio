import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { projects, getProjectBySlug } from "@/data/projects"
import { ProjectDetail } from "@/components/projects/ProjectDetail"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.filter((p) => p.isPublic || p.featured).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project || (!project.isPublic && !project.featured)) return {}

  return {
    title: project.title,
    description: project.tagline,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project || (!project.isPublic && !project.featured)) {
    notFound()
  }

  return <ProjectDetail project={project} />
}
