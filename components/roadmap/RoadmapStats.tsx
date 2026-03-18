import type { RoadmapData } from "@/types/roadmap"

export function RoadmapStats({ stats }: { stats: RoadmapData["stats"] }) {
  const items = [
    { num: stats.total, label: "Total Tasks" },
    { num: stats.open, label: "Open" },
    { num: stats.closed, label: "Complete" },
    { num: stats.bugs, label: "Bugs" },
    { num: stats.research, label: "Research" },
    { num: stats.openQuestions, label: "Open Questions" },
  ]

  return (
    <div className="forge-stats-bar">
      {items.map((item) => (
        <div key={item.label} className="forge-stat">
          <div className="forge-stat-num">{item.num}</div>
          <div className="forge-stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
