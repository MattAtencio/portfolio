import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "fs"
import { join, resolve, relative } from "path"
import { execSync } from "child_process"
import Ajv from "ajv"

const DEV_ROOT = "C:/dev"
const SCHEMA_PATH = resolve(__dirname, "../schemas/project.schema.json")
const OUTPUT_PATH = join(DEV_ROOT, ".projects.json")

const EXCLUDE_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  ".nuxt",
  ".turbo",
  ".vercel",
  "dist",
  "build",
  "coverage",
  "_pipeline",
  "_archive",
  "_template",
  "_core",
  "tools",
  ".obsidian",
  ".cache",
  ".vite",
  "out",
])

const MAX_DEPTH = 4

type Kind = "project" | "group"

interface ProjectManifest {
  $schema?: string
  id: string
  name: string
  kind: Kind
  type?: string
  status?: string
  isCodeRepo?: boolean
  deployment?: string[]
  group?: string | null
  description?: string
  tags?: string[]
}

interface ResolvedNode extends ProjectManifest {
  path: string
  relPath: string
  gitRemote?: string
  hasPortfolio: boolean
  hasVision: boolean
  hasClaudeMd: boolean
  hasReadme: boolean
}

interface DriftReport {
  foldersWithoutManifest: string[]
  orphanedGroupRefs: Array<{ id: string; missingGroup: string }>
  duplicateIds: string[]
}

function readManifest(manifestPath: string): ProjectManifest | null {
  try {
    return JSON.parse(readFileSync(manifestPath, "utf-8"))
  } catch (e) {
    console.error(`  ERROR: Failed to parse ${manifestPath}: ${e}`)
    return null
  }
}

function getGitRemote(repoPath: string): string | undefined {
  try {
    const url = execSync("git remote get-url origin", {
      cwd: repoPath,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim()
    if (url.startsWith("git@github.com:")) {
      return url.replace("git@github.com:", "https://github.com/").replace(/\.git$/, "")
    }
    return url.replace(/\.git$/, "")
  } catch {
    return undefined
  }
}

function deriveDeployment(repoPath: string, remote: string | undefined, manifest: ProjectManifest): string[] {
  if (manifest.deployment && manifest.deployment.length > 0) return manifest.deployment
  const deployment = new Set<string>()
  if (remote) {
    if (remote.includes("github.com")) deployment.add("github")
    if (remote.includes("dev.azure.com") || remote.includes("visualstudio.com")) deployment.add("azure-devops")
    if (remote.includes("gitea")) deployment.add("gitea")
  }
  if (existsSync(join(repoPath, "vercel.json")) || existsSync(join(repoPath, ".vercel", "project.json"))) {
    deployment.add("vercel")
  }
  if (existsSync(join(repoPath, "railway.json")) || existsSync(join(repoPath, "railway.toml"))) {
    deployment.add("railway")
  }
  if (deployment.size === 0) deployment.add("local_only")
  return Array.from(deployment)
}

function scanForManifests(dir: string, depth: number): string[] {
  if (depth > MAX_DEPTH) return []
  const results: string[] = []

  const manifest = join(dir, ".project.json")
  if (existsSync(manifest)) results.push(manifest)

  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return results
  }

  for (const entry of entries) {
    if (entry.startsWith(".")) continue
    if (EXCLUDE_DIRS.has(entry)) continue
    const full = join(dir, entry)
    try {
      if (statSync(full).isDirectory()) {
        results.push(...scanForManifests(full, depth + 1))
      }
    } catch {
      // Skip unreadable paths
    }
  }

  return results
}

function looksLikeProject(dir: string): boolean {
  return (
    existsSync(join(dir, ".git")) ||
    existsSync(join(dir, "package.json")) ||
    existsSync(join(dir, "Cargo.toml")) ||
    existsSync(join(dir, "pyproject.toml")) ||
    existsSync(join(dir, "go.mod"))
  )
}

function detectDrift(knownManifestPaths: Set<string>): string[] {
  const missing: string[] = []

  function walk(dir: string, depth: number) {
    if (depth > 3) return
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }

    for (const entry of entries) {
      if (entry.startsWith(".")) continue
      if (EXCLUDE_DIRS.has(entry)) continue
      const full = join(dir, entry)
      let isDir = false
      try {
        isDir = statSync(full).isDirectory()
      } catch {
        continue
      }
      if (!isDir) continue

      const manifestPath = join(full, ".project.json")
      const hasManifest = knownManifestPaths.has(manifestPath)

      if (!hasManifest && looksLikeProject(full)) {
        missing.push(full.replace(/\\/g, "/"))
      }

      // Recurse if this is a group (has manifest with kind=group) or a common group-like folder
      // Simpler: always recurse one level deeper unless it's a known leaf project
      if (depth < 3 && !looksLikeProject(full)) {
        walk(full, depth + 1)
      } else if (depth < 3 && hasManifest) {
        // Known — might be a group, check
        const m = readManifest(manifestPath)
        if (m?.kind === "group") walk(full, depth + 1)
      }
    }
  }

  walk(DEV_ROOT, 1)
  return missing.sort()
}

function main() {
  console.log("Projects Sync")
  console.log("=============\n")

  // Load schema
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, "utf-8"))
  const { $schema: _, ...schemaWithoutMeta } = schema
  const ajv = new Ajv({ allErrors: true, strict: false })
  const validate = ajv.compile(schemaWithoutMeta)

  // Scan
  console.log("Scanning for .project.json files...\n")
  const manifestPaths = scanForManifests(DEV_ROOT, 1)

  if (manifestPaths.length === 0) {
    console.log("No .project.json files found.")
    return
  }

  const nodes: ResolvedNode[] = []
  const errors: string[] = []

  for (const manifestPath of manifestPaths) {
    const manifest = readManifest(manifestPath)
    if (!manifest) continue

    const valid = validate(manifest)
    if (!valid) {
      const msg = validate.errors?.map((e) => `    ${e.instancePath || "/"}: ${e.message}`).join("\n")
      errors.push(`INVALID: ${manifestPath}\n${msg}`)
      continue
    }

    const dir = resolve(manifestPath, "..")
    const remote = manifest.kind === "project" ? getGitRemote(dir) : undefined
    const isCodeRepo =
      manifest.isCodeRepo ?? (manifest.kind === "project" ? existsSync(join(dir, ".git")) || !!remote : false)

    const resolved: ResolvedNode = {
      ...manifest,
      path: dir.replace(/\\/g, "/"),
      relPath: relative(DEV_ROOT, dir).replace(/\\/g, "/"),
      isCodeRepo,
      deployment: manifest.kind === "project" ? deriveDeployment(dir, remote, manifest) : manifest.deployment,
      gitRemote: remote,
      hasPortfolio: existsSync(join(dir, "portfolio.json")),
      hasVision: existsSync(join(dir, "VISION.md")),
      hasClaudeMd: existsSync(join(dir, "CLAUDE.md")),
      hasReadme: existsSync(join(dir, "README.md")),
    }

    console.log(`  ✓ ${resolved.kind === "group" ? "▸" : " "} ${manifest.id} (${resolved.relPath || "."})`)
    nodes.push(resolved)
  }

  if (errors.length > 0) {
    console.log("\nValidation errors:")
    for (const err of errors) console.error(`  ✗ ${err}`)
    process.exit(1)
  }

  // Duplicate ID check
  const ids = nodes.map((n) => n.id)
  const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))]

  // Orphaned group refs
  const groupIds = new Set(nodes.filter((n) => n.kind === "group").map((n) => n.id))
  const orphans: Array<{ id: string; missingGroup: string }> = []
  for (const n of nodes) {
    if (n.group && !groupIds.has(n.group)) {
      orphans.push({ id: n.id, missingGroup: n.group })
    }
  }

  if (dupes.length > 0 || orphans.length > 0) {
    console.error("\nStructural errors:")
    if (dupes.length > 0) console.error(`  Duplicate IDs: ${dupes.join(", ")}`)
    for (const o of orphans) console.error(`  Orphan: ${o.id} → group="${o.missingGroup}" (not found)`)
    process.exit(1)
  }

  // Drift: folders that look like projects but have no manifest
  const knownPaths = new Set(manifestPaths.map((p) => p.replace(/\\/g, "/")))
  // Re-add with OS-native separator for comparison
  const normalized = new Set(manifestPaths)
  const missing = detectDrift(normalized)

  // Sort nodes: groups first, then by relPath
  nodes.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === "group" ? -1 : 1
    return a.relPath.localeCompare(b.relPath)
  })

  const groups = nodes.filter((n) => n.kind === "group")
  const projects = nodes.filter((n) => n.kind === "project")

  // Counts
  const byType: Record<string, number> = {}
  const byStatus: Record<string, number> = {}
  const byDeployment: Record<string, number> = {}
  for (const p of projects) {
    if (p.type) byType[p.type] = (byType[p.type] || 0) + 1
    if (p.status) byStatus[p.status] = (byStatus[p.status] || 0) + 1
    for (const d of p.deployment || []) byDeployment[d] = (byDeployment[d] || 0) + 1
  }

  const output = {
    $schema: "https://raw.githubusercontent.com/MattAtencio/portfolio/main/schemas/project.schema.json",
    generatedAt: new Date().toISOString(),
    generatedBy: "portfolio/scripts/sync-projects.ts",
    root: DEV_ROOT,
    counts: {
      projects: projects.length,
      groups: groups.length,
      byType,
      byStatus,
      byDeployment,
    },
    groups,
    projects,
    drift: {
      foldersWithoutManifest: missing,
      note: "These folders look like projects (have .git, package.json, etc.) but lack .project.json. Add one or explicitly exclude the folder name in scripts/sync-projects.ts EXCLUDE_DIRS.",
    },
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n")

  console.log(`\n${projects.length} projects + ${groups.length} groups → ${OUTPUT_PATH}`)
  if (missing.length > 0) {
    console.log(`\n⚠ Drift — ${missing.length} folder(s) without .project.json:`)
    for (const m of missing) console.log(`    ${m}`)
  }
}

main()
