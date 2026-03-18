import type { Metadata } from "next"
import { fetchRoadmapData } from "@/lib/github-issues"
import { RoadmapBoard } from "@/components/roadmap/RoadmapBoard"
import Link from "next/link"
import "./roadmap.css"

export const metadata: Metadata = {
  title: "Forge & Field — Roadmap",
  description:
    "Live development roadmap and task board for the Forge & Field idle RPG",
}

export default async function ForgeRoadmapPage() {
  const data = await fetchRoadmapData({
    owner: "MattAtencio",
    repo: "forge-and-field",
    title: "Developer Task Board",
    subtitle: "Sprint planning & feature backlog · v0.next",
  })

  return (
    <div className="forge-theme">
      <header className="forge-header">
        <div className="forge-game-label">Forge &amp; Field</div>
        <h1 className="forge-h1">Developer Task Board</h1>
        <div className="forge-subtitle">
          Sprint planning &amp; feature backlog · v0.next
        </div>
        <Link href="/projects/forge-and-field" className="forge-back-link">
          ← Back to project
        </Link>
      </header>

      <main className="forge-main">
        <RoadmapBoard data={data} />
      </main>
    </div>
  )
}
