import type { MetadataRoute } from "next"
import { projects } from "@/data/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects.filter((p) => p.isPublic).map((p) => ({
    url: `https://mattatencio.com/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: "https://mattatencio.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectRoutes,
  ]
}
