import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "fs"
import { join, basename, resolve } from "path"
import { execSync } from "child_process"
import Ajv from "ajv"

// Config
const DEV_ROOT = "C:/dev"
const GAMES_ROOT = join(DEV_ROOT, "Games")
const EXTRAS_DIR = resolve(__dirname, "extras")
const SCHEMA_PATH = resolve(__dirname, "../schemas/portfolio.schema.json")
const OUTPUT_PATH = resolve(__dirname, "../data/projects.ts")

// Category sort order
const CATEGORY_ORDER = ["featured", "professional", "games", "tools"] as const

interface PortfolioConfig {
  $schema?: string
  slug?: string
  title: string
  tagline: string
  description: string
  category: "featured" | "games" | "professional" | "tools"
  status: "active" | "maintained" | "archived"
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
  roadmapUrl?: string
  images?: {
    thumbnail?: string
    screenshots?: string[]
  }
  highlights?: string[]
  businessContext?: string
  isPublic: boolean
  startDate: string
  featured?: boolean
  hasCaseStudy?: boolean
}

interface Project {
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
  images: {
    thumbnail: string
    screenshots: string[]
  }
  highlights: string[]
  businessContext?: string
  isPublic: boolean
  startDate: string
  featured: boolean
  hasCaseStudy?: boolean
}

function getGitRemoteUrl(repoPath: string): string | undefined {
  try {
    const url = execSync("git remote get-url origin", {
      cwd: repoPath,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim()
    // Convert SSH to HTTPS for display
    if (url.startsWith("git@github.com:")) {
      return url.replace("git@github.com:", "https://github.com/").replace(/\.git$/, "")
    }
    return url.replace(/\.git$/, "")
  } catch {
    return undefined
  }
}

function findPortfolioConfigs(): Array<{ config: PortfolioConfig; dirPath: string; source: string }> {
  const results: Array<{ config: PortfolioConfig; dirPath: string; source: string }> = []

  // 1. Scan top-level repos in C:/dev/
  const topLevelDirs = readdirSync(DEV_ROOT).filter((name) => {
    if (name.startsWith(".") || name === "Games" || name === "_pipeline" || name === "tools") return false
    const fullPath = join(DEV_ROOT, name)
    return statSync(fullPath).isDirectory()
  })

  for (const dir of topLevelDirs) {
    const dirPath = join(DEV_ROOT, dir)
    const configPath = join(dirPath, "portfolio.json")
    if (existsSync(configPath)) {
      try {
        const config = JSON.parse(readFileSync(configPath, "utf-8"))
        results.push({ config, dirPath, source: `C:/dev/${dir}/portfolio.json` })
      } catch (e) {
        console.error(`  ERROR: Failed to parse ${configPath}: ${e}`)
      }
    }
  }

  // 2. Scan Games sub-repos: C:/dev/Games/{category}/{game}/
  if (existsSync(GAMES_ROOT)) {
    const categories = readdirSync(GAMES_ROOT).filter((name) => {
      if (name.startsWith("_") || name.startsWith(".")) return false
      return statSync(join(GAMES_ROOT, name)).isDirectory()
    })

    for (const category of categories) {
      const categoryPath = join(GAMES_ROOT, category)
      const games = readdirSync(categoryPath).filter((name) => {
        if (name.startsWith("_") || name.startsWith(".")) return false
        return statSync(join(categoryPath, name)).isDirectory()
      })

      for (const game of games) {
        const dirPath = join(categoryPath, game)
        const configPath = join(dirPath, "portfolio.json")
        if (existsSync(configPath)) {
          try {
            const config = JSON.parse(readFileSync(configPath, "utf-8"))
            results.push({ config, dirPath, source: `C:/dev/Games/${category}/${game}/portfolio.json` })
          } catch (e) {
            console.error(`  ERROR: Failed to parse ${configPath}: ${e}`)
          }
        }
      }
    }
  }

  // 3. Scan extras directory for non-repo entries
  if (existsSync(EXTRAS_DIR)) {
    const extras = readdirSync(EXTRAS_DIR).filter((name) => name.endsWith(".json"))
    for (const file of extras) {
      const filePath = join(EXTRAS_DIR, file)
      try {
        const config = JSON.parse(readFileSync(filePath, "utf-8"))
        results.push({ config, dirPath: EXTRAS_DIR, source: `extras/${file}` })
      } catch (e) {
        console.error(`  ERROR: Failed to parse ${filePath}: ${e}`)
      }
    }
  }

  return results
}

function resolveProject(
  config: PortfolioConfig,
  dirPath: string,
  source: string
): Project {
  // Derive slug: from config, from extras filename, or from directory name
  let slug: string
  if (config.slug) {
    slug = config.slug
  } else if (source.startsWith("extras/")) {
    slug = basename(source, ".json")
  } else {
    slug = basename(dirPath).toLowerCase()
  }

  // Derive thumbnail from convention if not specified
  const thumbnail = config.images?.thumbnail || `/images/projects/${slug}-thumb.png`
  const screenshots = config.images?.screenshots || []

  // Derive repoUrl from git remote if not specified and not an extras entry
  let repoUrl = config.repoUrl
  if (!repoUrl && !source.startsWith("extras/")) {
    repoUrl = getGitRemoteUrl(dirPath)
  }

  const project: Project = {
    slug,
    title: config.title,
    tagline: config.tagline,
    description: config.description,
    category: config.category,
    status: config.status,
    techStack: config.techStack,
    images: { thumbnail, screenshots },
    highlights: config.highlights || [],
    isPublic: config.isPublic,
    startDate: config.startDate,
    featured: config.featured ?? false,
  }

  if (config.liveUrl) project.liveUrl = config.liveUrl
  if (repoUrl) project.repoUrl = repoUrl
  if (config.roadmapUrl) project.roadmapUrl = config.roadmapUrl
  if (config.businessContext) project.businessContext = config.businessContext
  if (config.hasCaseStudy) project.hasCaseStudy = config.hasCaseStudy

  return project
}

// Explicit display order for featured projects. Slugs not listed fall back to alphabetical.
const FEATURED_ORDER: Record<string, number> = {
  "enterprise-integration": 1,
  "fitops": 2,
  "claude-framework": 3,
  "learnpod": 4,
  "deposit-networks": 5,
}

function sortProjects(projects: Project[]): Project[] {
  return projects.sort((a, b) => {
    const catA = CATEGORY_ORDER.indexOf(a.category as typeof CATEGORY_ORDER[number])
    const catB = CATEGORY_ORDER.indexOf(b.category as typeof CATEGORY_ORDER[number])
    if (catA !== catB) return catA - catB
    // Within same category, featured first
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    // Among featured, use explicit FEATURED_ORDER
    if (a.featured && b.featured) {
      const oA = FEATURED_ORDER[a.slug] ?? Number.MAX_SAFE_INTEGER
      const oB = FEATURED_ORDER[b.slug] ?? Number.MAX_SAFE_INTEGER
      if (oA !== oB) return oA - oB
    }
    // Then alphabetical by title
    return a.title.localeCompare(b.title)
  })
}

function escapeForTemplate(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$")
}

function generateProjectEntry(p: Project): string {
  const lines: string[] = []
  lines.push("  {")
  lines.push(`    slug: "${p.slug}",`)
  lines.push(`    title: "${p.title}",`)
  lines.push(`    tagline:`)
  lines.push(`      "${p.tagline}",`)

  // Use template literal for multi-line descriptions
  if (p.description.includes("\n")) {
    lines.push(`    description: \`${escapeForTemplate(p.description)}\`,`)
  } else {
    lines.push(`    description: \`${escapeForTemplate(p.description)}\`,`)
  }

  lines.push(`    category: "${p.category}",`)
  lines.push(`    status: "${p.status}",`)

  // techStack
  lines.push(`    techStack: [`)
  for (const tech of p.techStack) {
    lines.push(`      "${tech}",`)
  }
  lines.push(`    ],`)

  // Optional URLs
  if (p.liveUrl) lines.push(`    liveUrl: "${p.liveUrl}",`)
  if (p.repoUrl) lines.push(`    repoUrl: "${p.repoUrl}",`)
  if (p.roadmapUrl) lines.push(`    roadmapUrl: "${p.roadmapUrl}",`)

  // images
  lines.push(`    images: {`)
  lines.push(`      thumbnail: "${p.images.thumbnail}",`)
  lines.push(`      screenshots: [${p.images.screenshots.map((s) => `"${s}"`).join(", ")}],`)
  lines.push(`    },`)

  // highlights
  lines.push(`    highlights: [`)
  for (const h of p.highlights) {
    lines.push(`      "${h}",`)
  }
  lines.push(`    ],`)

  // Optional fields
  if (p.businessContext) {
    lines.push(`    businessContext:`)
    lines.push(`      "${p.businessContext}",`)
  }

  lines.push(`    isPublic: ${p.isPublic},`)
  lines.push(`    startDate: "${p.startDate}",`)
  lines.push(`    featured: ${p.featured},`)

  if (p.hasCaseStudy) {
    lines.push(`    hasCaseStudy: ${p.hasCaseStudy},`)
  }

  lines.push("  },")
  return lines.join("\n")
}

function generateOutput(projects: Project[]): string {
  const lines: string[] = []
  lines.push(`// AUTO-GENERATED by scripts/sync-portfolio.ts — do not edit manually.`)
  lines.push(`// Run: npm run sync`)
  lines.push(``)
  lines.push(`import type { Project } from "@/types/project"`)
  lines.push(``)
  lines.push(`export const projects: Project[] = [`)

  for (const p of projects) {
    lines.push(generateProjectEntry(p))
  }

  lines.push(`]`)
  lines.push(``)
  lines.push(`export function getProjectBySlug(slug: string): Project | undefined {`)
  lines.push(`  return projects.find((p) => p.slug === slug)`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`export function getFeaturedProjects(): Project[] {`)
  lines.push(`  return projects.filter((p) => p.featured)`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`export function getProjectsByCategory(`)
  lines.push(`  category: Project["category"]`)
  lines.push(`): Project[] {`)
  lines.push(`  return projects.filter((p) => p.category === category)`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`export function getGameProjects(): Project[] {`)
  lines.push(`  return projects.filter((p) => p.category === "games")`)
  lines.push(`}`)
  lines.push(``)

  return lines.join("\n")
}

// Main
function main() {
  console.log("Portfolio Sync")
  console.log("==============\n")

  // Load and compile schema
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, "utf-8"))
  // Remove $schema from the schema itself to avoid ajv trying to resolve the meta-schema
  const { $schema: _, ...schemaWithoutMeta } = schema
  const ajv = new Ajv({ allErrors: true })
  const validate = ajv.compile(schemaWithoutMeta)

  // Find all portfolio.json files
  console.log("Scanning for portfolio.json files...\n")
  const configs = findPortfolioConfigs()

  if (configs.length === 0) {
    console.log("No portfolio.json files found. Nothing to sync.")
    return
  }

  // Validate and resolve
  const projects: Project[] = []
  const errors: string[] = []

  for (const { config, dirPath, source } of configs) {
    const valid = validate(config)
    if (!valid) {
      const errorMsg = validate.errors
        ?.map((e) => `  ${e.instancePath || "/"}: ${e.message}`)
        .join("\n")
      errors.push(`INVALID: ${source}\n${errorMsg}`)
      continue
    }

    const project = resolveProject(config, dirPath, source)
    console.log(`  ✓ ${project.slug} (${source})`)
    projects.push(project)
  }

  if (errors.length > 0) {
    console.log("\nValidation errors:")
    for (const err of errors) {
      console.error(`  ✗ ${err}`)
    }
    console.log("\nFix validation errors before syncing.")
    process.exit(1)
  }

  // Check for duplicate slugs
  const slugs = projects.map((p) => p.slug)
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i)
  if (dupes.length > 0) {
    console.error(`\nDuplicate slugs found: ${dupes.join(", ")}`)
    process.exit(1)
  }

  // Sort and generate
  const sorted = sortProjects(projects)
  const output = generateOutput(sorted)

  // Check if output differs from current
  const currentOutput = existsSync(OUTPUT_PATH) ? readFileSync(OUTPUT_PATH, "utf-8") : ""

  if (output === currentOutput) {
    console.log(`\n${projects.length} projects synced. No changes detected.`)
    return
  }

  writeFileSync(OUTPUT_PATH, output)
  console.log(`\n${projects.length} projects synced → data/projects.ts updated.`)
}

main()
