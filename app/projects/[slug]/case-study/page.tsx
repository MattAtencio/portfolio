import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { projects, getProjectBySlug } from "@/data/projects"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Map of slugs to their case study content components
const caseStudyMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  fitops: () => import("@/content/case-studies/fitops.mdx"),
  "forge-and-field": () => import("@/content/case-studies/forge-and-field.mdx"),
  "claude-framework": () => import("@/content/case-studies/claude-framework.mdx"),
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.hasCaseStudy)
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: `${project.title} — Case Study`,
    description: `Case study: ${project.tagline}`,
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project || !project.hasCaseStudy || !caseStudyMap[slug]) {
    notFound()
  }

  const { default: CaseStudyContent } = await caseStudyMap[slug]()

  return <CaseStudyContent />
}
