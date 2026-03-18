import type {
  RoadmapIssue,
  RoadmapData,
  CategoryGroup,
  IssueCategory,
  IssuePriority,
  RoadmapConfig,
} from "@/types/roadmap"

const CATEGORY_LABELS: IssueCategory[] = [
  "ux",
  "feature",
  "bug",
  "system",
  "research",
  "ai-agent",
  "design",
  "open-question",
]

const CATEGORY_DISPLAY: Record<
  IssueCategory,
  { label: string; icon: string; order: number }
> = {
  ux: { label: "UX & Navigation", icon: "🗺️", order: 0 },
  feature: { label: "Features", icon: "⚔️", order: 1 },
  bug: { label: "Bug Fixes", icon: "🔨", order: 2 },
  system: { label: "Systems & Architecture", icon: "🏔️", order: 3 },
  research: { label: "Research", icon: "📜", order: 4 },
  "ai-agent": { label: "AI Agents & Infrastructure", icon: "🤖", order: 5 },
  design: { label: "Art & Visual Design", icon: "🎨", order: 6 },
  "open-question": { label: "Open Questions", icon: "❓", order: 7 },
}

const PRIORITY_MAP: Record<string, IssuePriority> = {
  "priority-high": "high",
  "priority-medium": "medium",
  "priority-low": "low",
}

interface GitHubLabel {
  name: string
  color: string
}

interface GitHubIssue {
  id: number
  number: number
  title: string
  html_url: string
  body: string | null
  state: string
  labels: GitHubLabel[]
  created_at: string
  closed_at: string | null
  pull_request?: unknown
}

function mapIssue(gh: GitHubIssue): RoadmapIssue {
  const labelNames = gh.labels.map((l) => l.name)

  const category: IssueCategory =
    (labelNames.find((l) =>
      CATEGORY_LABELS.includes(l as IssueCategory)
    ) as IssueCategory) ?? "feature"

  const priorityLabel = labelNames.find((l) => l.startsWith("priority-"))
  const priority: IssuePriority = priorityLabel
    ? (PRIORITY_MAP[priorityLabel] ?? "none")
    : "none"

  return {
    id: gh.id,
    number: gh.number,
    title: gh.title,
    url: gh.html_url,
    body: gh.body ?? "",
    state: gh.state as "open" | "closed",
    category,
    priority,
    labels: labelNames,
    createdAt: gh.created_at,
    closedAt: gh.closed_at,
  }
}

async function fetchAllIssues(
  owner: string,
  repo: string,
  state: "open" | "closed"
): Promise<GitHubIssue[]> {
  const all: GitHubIssue[] = []
  let page = 1
  const token = process.env.GITHUB_TOKEN

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  while (true) {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=${state}&per_page=100&page=${page}`
    const res = await fetch(url, { headers })

    if (!res.ok) break

    const data: GitHubIssue[] = await res.json()
    if (data.length === 0) break

    // Filter out pull requests
    all.push(...data.filter((issue) => !issue.pull_request))
    if (data.length < 100) break
    page++
  }

  return all
}

function groupByCategory(issues: RoadmapIssue[]): CategoryGroup[] {
  const groups = new Map<IssueCategory, RoadmapIssue[]>()

  for (const issue of issues) {
    const existing = groups.get(issue.category) ?? []
    existing.push(issue)
    groups.set(issue.category, existing)
  }

  // Sort issues within each group: open first, then by priority
  const priorityOrder: Record<IssuePriority, number> = {
    high: 0,
    medium: 1,
    low: 2,
    none: 3,
  }

  return Array.from(groups.entries())
    .map(([key, categoryIssues]) => {
      const display = CATEGORY_DISPLAY[key]
      categoryIssues.sort((a, b) => {
        // Open before closed
        if (a.state !== b.state) return a.state === "open" ? -1 : 1
        // Then by priority
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      })
      return {
        key,
        label: display.label,
        icon: display.icon,
        issues: categoryIssues,
      }
    })
    .sort(
      (a, b) =>
        CATEGORY_DISPLAY[a.key].order - CATEGORY_DISPLAY[b.key].order
    )
}

export async function fetchRoadmapData(
  config: RoadmapConfig
): Promise<RoadmapData> {
  const { owner, repo } = config

  const [openIssues, closedIssues] = await Promise.all([
    fetchAllIssues(owner, repo, "open"),
    fetchAllIssues(owner, repo, "closed"),
  ])

  const allMapped = [...openIssues, ...closedIssues].map(mapIssue)
  const categories = groupByCategory(allMapped)

  return {
    issues: allMapped,
    categories,
    stats: {
      total: allMapped.length,
      open: allMapped.filter((i) => i.state === "open").length,
      closed: allMapped.filter((i) => i.state === "closed").length,
      bugs: allMapped.filter((i) => i.category === "bug").length,
      research: allMapped.filter((i) => i.category === "research").length,
      openQuestions: allMapped.filter(
        (i) => i.category === "open-question"
      ).length,
    },
  }
}
