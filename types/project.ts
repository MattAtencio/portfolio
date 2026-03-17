export type ProjectCategory = "featured" | "games" | "professional" | "tools"
export type ProjectStatus = "active" | "maintained" | "archived"

export interface Project {
  slug: string
  title: string
  tagline: string
  description: string
  category: ProjectCategory
  status: ProjectStatus
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
  images: {
    thumbnail: string
    screenshots: string[]
  }
  highlights: string[]
  businessContext?: string
  isPublic: boolean
  startDate: string
  featured: boolean
}
