export type IssueCategory =
  | "ux"
  | "feature"
  | "bug"
  | "system"
  | "research"
  | "ai-agent"
  | "design"
  | "open-question"

export type IssuePriority = "high" | "medium" | "low" | "none"

export interface RoadmapIssue {
  id: number
  number: number
  title: string
  url: string
  body: string
  state: "open" | "closed"
  category: IssueCategory
  priority: IssuePriority
  labels: string[]
  createdAt: string
  closedAt: string | null
}

export interface CategoryGroup {
  key: IssueCategory
  label: string
  icon: string
  issues: RoadmapIssue[]
}

export interface RoadmapData {
  issues: RoadmapIssue[]
  categories: CategoryGroup[]
  stats: {
    total: number
    open: number
    closed: number
    bugs: number
    research: number
    openQuestions: number
  }
}

export interface RoadmapConfig {
  owner: string
  repo: string
  milestone?: string
  title: string
  subtitle: string
}
