/**
 * One-time migration script: reads current data/projects.ts entries
 * and seeds portfolio.json into each target repo.
 *
 * Run: npx tsx scripts/seed-portfolio-configs.ts
 */
import { writeFileSync, existsSync } from "fs"
import { join } from "path"

const SCHEMA_REF = "https://raw.githubusercontent.com/MattAtencio/portfolio/main/schemas/portfolio.schema.json"

// Map slug -> repo path (manually verified against C:/dev/ structure)
const SLUG_TO_PATH: Record<string, string | null> = {
  fitops: "C:/dev/FitOps",
  "enterprise-integration": null, // extras
  spectrum: "C:/dev/Games/DailyPuzzles/spectrum",
  flowgrid: "C:/dev/Games/DailyPuzzles/flowgrid",
  wikichain: "C:/dev/Games/DailyPuzzles/wiki-chain",
  "anagram-chain": "C:/dev/Games/DailyPuzzles/anagram-chain",
  solitaire: "C:/dev/Games/Classics/solitaire",
  minesweeper: "C:/dev/Games/Classics/minesweeper",
  lexle: "C:/dev/Games/DailyPuzzles/lexle",
  "forge-and-field": "C:/dev/Games/Strategy/forge-and-field",
  "kids-corner": "C:/dev/Games/Kids/kids-hub",
  "mahjong-path": "C:/dev/Games/Strategy/mahjong-path",
  "unified-dashboard": "C:/dev/unified-dashboard",
  "signal-forge": "C:/dev/signal-forge",
  "yoga-dashboard": null, // extras (no standalone repo)
  vault: "C:/dev/vault",
  "homelab-dashboard": "C:/dev/homelab-dashboard",
  "homelab-infra": "C:/dev/homelab-infra",
  "claude-framework": null, // extras (lives at ~/.claude/)
}

// Default thumbnail convention
const DEFAULT_THUMB_PREFIX = "/images/projects/"

interface ProjectEntry {
  slug: string
  title: string
  tagline: string
  description: string
  category: string
  status: string
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
  roadmapUrl?: string
  images: { thumbnail: string; screenshots: string[] }
  highlights: string[]
  businessContext?: string
  isPublic: boolean
  startDate: string
  featured: boolean
  hasCaseStudy?: boolean
}

// Import projects from data file
async function loadProjects(): Promise<ProjectEntry[]> {
  // Dynamic import of the built projects
  const mod = await import("../data/projects")
  return mod.projects
}

function buildPortfolioJson(project: ProjectEntry, repoPath: string | null): Record<string, unknown> {
  const config: Record<string, unknown> = {
    $schema: SCHEMA_REF,
  }

  // Only include slug if it differs from the directory name
  const dirName = repoPath ? repoPath.split("/").pop()! : project.slug
  if (project.slug !== dirName.toLowerCase()) {
    config.slug = project.slug
  }

  config.title = project.title
  config.tagline = project.tagline
  config.description = project.description
  config.category = project.category
  config.status = project.status
  config.techStack = project.techStack

  if (project.liveUrl) config.liveUrl = project.liveUrl
  // Skip repoUrl — derived from git remote by sync script
  if (project.roadmapUrl) config.roadmapUrl = project.roadmapUrl

  // Only include images if non-default thumbnail or has screenshots
  const defaultThumb = `${DEFAULT_THUMB_PREFIX}${project.slug}-thumb.png`
  const hasCustomThumb = project.images.thumbnail !== defaultThumb
  const hasScreenshots = project.images.screenshots.length > 0

  if (hasCustomThumb || hasScreenshots) {
    const images: Record<string, unknown> = {}
    if (hasCustomThumb) images.thumbnail = project.images.thumbnail
    if (hasScreenshots) images.screenshots = project.images.screenshots
    config.images = images
  }

  if (project.highlights.length > 0) config.highlights = project.highlights
  if (project.businessContext) config.businessContext = project.businessContext

  config.isPublic = project.isPublic
  config.startDate = project.startDate
  config.featured = project.featured

  if (project.hasCaseStudy) config.hasCaseStudy = project.hasCaseStudy

  return config
}

async function main() {
  console.log("Seeding portfolio.json files\n")

  const projects = await loadProjects()
  let seeded = 0
  let skipped = 0
  let extras = 0

  for (const project of projects) {
    const repoPath = SLUG_TO_PATH[project.slug]
    const config = buildPortfolioJson(project, repoPath)

    if (repoPath === null) {
      // Write to extras/
      const extrasPath = join(__dirname, "extras", `${project.slug}.json`)
      writeFileSync(extrasPath, JSON.stringify(config, null, 2) + "\n")
      console.log(`  → extras/${project.slug}.json`)
      extras++
      continue
    }

    if (repoPath === undefined) {
      console.log(`  ⚠ ${project.slug}: no path mapping, skipping`)
      skipped++
      continue
    }

    if (!existsSync(repoPath)) {
      console.log(`  ⚠ ${project.slug}: path ${repoPath} does not exist, skipping`)
      skipped++
      continue
    }

    const targetPath = join(repoPath, "portfolio.json")
    if (existsSync(targetPath)) {
      console.log(`  ⊘ ${project.slug}: portfolio.json already exists, skipping`)
      skipped++
      continue
    }

    writeFileSync(targetPath, JSON.stringify(config, null, 2) + "\n")
    console.log(`  ✓ ${project.slug} → ${targetPath}`)
    seeded++
  }

  console.log(`\nDone: ${seeded} seeded, ${extras} extras, ${skipped} skipped`)
}

main().catch(console.error)
