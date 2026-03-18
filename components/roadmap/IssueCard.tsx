import type { RoadmapIssue } from "@/types/roadmap"

const TAG_STYLES: Record<string, string> = {
  ux: "forge-tag-ux",
  feature: "forge-tag-feature",
  system: "forge-tag-system",
  research: "forge-tag-research",
  "ai-agent": "forge-tag-ai",
  design: "forge-tag-design",
  bug: "forge-tag-bug",
  "open-question": "forge-tag-research",
}

const PRIORITY_CLASS: Record<string, string> = {
  high: "forge-p-high",
  medium: "forge-p-medium",
  low: "forge-p-low",
  none: "",
}

const DISPLAY_LABELS = [
  "ux",
  "feature",
  "system",
  "research",
  "ai-agent",
  "design",
  "bug",
]

export function IssueCard({ issue }: { issue: RoadmapIssue }) {
  const visibleLabels = issue.labels.filter((l) => DISPLAY_LABELS.includes(l))
  const isDone = issue.state === "closed"

  return (
    <a
      href={issue.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`forge-task ${isDone ? "done" : ""}`}
    >
      <div className={`forge-priority ${PRIORITY_CLASS[issue.priority]}`} />
      <div className={`forge-checkbox ${isDone ? "checked" : ""}`}>
        {isDone && <span>✓</span>}
      </div>
      <div className="forge-task-body">
        <div className={`forge-task-title ${isDone ? "forge-strikethrough" : ""}`}>
          {issue.title}
        </div>
        {issue.body && (
          <div className="forge-task-detail">{issue.body}</div>
        )}
        {visibleLabels.length > 0 && (
          <div className="forge-task-tags">
            {visibleLabels.map((label) => (
              <span
                key={label}
                className={`forge-tag ${TAG_STYLES[label] ?? ""}`}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
