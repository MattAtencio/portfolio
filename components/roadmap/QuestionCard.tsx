import type { RoadmapIssue } from "@/types/roadmap"

export function QuestionCard({ issue }: { issue: RoadmapIssue }) {
  const isDone = issue.state === "closed"

  return (
    <a
      href={issue.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`forge-question ${isDone ? "done" : ""}`}
    >
      <strong>❓ Open Question</strong>
      <span className={isDone ? "forge-strikethrough" : ""}>
        {issue.title.replace(/^❓\s*/, "")}
      </span>
      {issue.body && <span className="forge-question-body">{issue.body}</span>}
    </a>
  )
}
