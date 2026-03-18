import type { RoadmapData } from "@/types/roadmap"
import { RoadmapStats } from "./RoadmapStats"
import { IssueCard } from "./IssueCard"
import { QuestionCard } from "./QuestionCard"

export function RoadmapBoard({ data }: { data: RoadmapData }) {
  return (
    <>
      <RoadmapStats stats={data.stats} />

      <div className="forge-legend">
        <div className="forge-legend-group">
          <div className="forge-legend-dot high" /> High priority
        </div>
        <div className="forge-legend-group">
          <div className="forge-legend-dot medium" /> Medium priority
        </div>
        <div className="forge-legend-group">
          <div className="forge-legend-dot low" /> Low / Long-term
        </div>
      </div>

      {data.categories.map((group) => {
        const isQuestions = group.key === "open-question"
        const openCount = group.issues.filter(
          (i) => i.state === "open"
        ).length
        const closedCount = group.issues.length - openCount

        return (
          <div key={group.key} className="forge-category">
            <div className="forge-category-header">
              <span className="forge-category-icon">{group.icon}</span>
              <span className="forge-category-title">{group.label}</span>
              <span className="forge-category-count">
                {group.issues.length} item{group.issues.length !== 1 ? "s" : ""}
                {closedCount > 0 && ` · ${closedCount} done`}
              </span>
            </div>

            {group.issues.map((issue) =>
              isQuestions ? (
                <QuestionCard key={issue.id} issue={issue} />
              ) : (
                <IssueCard key={issue.id} issue={issue} />
              )
            )}
          </div>
        )
      })}
    </>
  )
}
