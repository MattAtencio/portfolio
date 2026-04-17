# Portfolio

The source for [mattatencio.com](https://mattatencio.com). A Next.js site whose project cards are generated from per-repo `portfolio.json` files across `C:/dev`.

This repo also hosts the **project manifest system** (`.project.json` → `C:/dev/.projects.json`) — a separate, broader catalog of every folder in `C:/dev`. See [Project manifest](#project-manifest-projectjson) below.

## How it works

Each repo owns its own portfolio metadata. The portfolio site scans those files, validates them against a JSON schema, and generates a typed `data/projects.ts` module that the Next.js pages consume.

```
C:/dev/<repo>/portfolio.json   ──┐
C:/dev/Games/<cat>/<game>/...  ──┼──▶  npm run sync  ──▶  data/projects.ts  ──▶  site
C:/dev/portfolio/scripts/extras/ ┘
```

- **Opt-in:** a repo without `portfolio.json` does not appear.
- **No manual edits to `data/projects.ts`** — it is auto-generated. Edit the source `portfolio.json` in the owning repo, then re-run sync.
- **Non-repo entries** (legacy work, aggregated case studies) live as standalone JSON files in `scripts/extras/`.

## Authoring a `portfolio.json`

Drop this at the root of any repo under `C:/dev/`:

```json
{
  "$schema": "https://raw.githubusercontent.com/MattAtencio/portfolio/main/schemas/portfolio.schema.json",
  "title": "Project Name",
  "tagline": "One line that sells it",
  "description": "Two or three sentences covering what the product is, who it is for, and how it works.",
  "category": "professional",
  "status": "active",
  "techStack": ["Next.js 15", "TypeScript", "PostgreSQL"],
  "highlights": [
    "Capability-and-outcome bullet, not a changelog entry",
    "Interesting engineering or product decision worth pointing to"
  ],
  "isPublic": false,
  "startDate": "2025-09",
  "featured": false
}
```

### Required fields

| Field         | Notes                                                               |
| ------------- | ------------------------------------------------------------------- |
| `title`       | Display name                                                        |
| `tagline`     | One-line pitch shown on card                                        |
| `description` | 2–4 sentence overview; supports `\n` for paragraphs                 |
| `category`    | `featured` \| `professional` \| `games` \| `tools`                  |
| `status`      | `active` \| `maintained` \| `archived`                              |
| `techStack`   | String array, human-readable (e.g. `"Next.js 15"`, not `"next@15"`) |
| `isPublic`    | Boolean. Drives whether the card renders on the live site           |
| `startDate`   | `YYYY-MM`                                                           |

### Optional fields

| Field             | Notes                                                                   |
| ----------------- | ----------------------------------------------------------------------- |
| `slug`            | URL-friendly id. Derived from directory name if omitted                 |
| `liveUrl`         | Deployed URL                                                            |
| `repoUrl`         | Git URL. Auto-derived from `git remote` if omitted                      |
| `roadmapUrl`      | Public roadmap link                                                     |
| `images`          | `{ thumbnail?, screenshots?[] }`. Thumbnail defaults to `/images/projects/<slug>-thumb.png` |
| `highlights`      | 4–7 bullets. See guidance below                                         |
| `businessContext` | One-liner on audience / market                                          |
| `visionDoc`       | Path (relative to repo root) to a long-form vision doc. Defaults to `VISION.md` if present. See below |
| `featured`        | Boolean. Featured cards sort first within their category                |
| `hasCaseStudy`    | Boolean. Renders a "Read case study" link; MDX lives under `content/`   |

Full machine-readable schema: [`schemas/portfolio.schema.json`](./schemas/portfolio.schema.json). Unknown keys fail validation (`additionalProperties: false`).

### Writing highlights

**Highlights are the product story, not the git log.** Each bullet should describe a capability a visitor would care about, not activity from the last sprint.

Good:
- `Walk-forward backtesting with no lookahead bias across 50+ crypto pairs`
- `Turns Instagram reels into atomic lessons via an Obsidian-powered pipeline`

Bad:
- `356 ESM/CJS test fixes` *(changelog noise)*
- `Phase 1 home redesign` *(internal sprint vocabulary)*
- `Feature-complete — moving to validation` *(status update, not capability)*

Recent activity worth preserving belongs in a **case study** (`content/case-studies/<slug>.mdx`), not on the card.

### Vision docs (`VISION.md`)

For featured and flagship projects, drop a `VISION.md` at the repo root describing the **envisioned end-state** product in 600–1200 words. This file is not published — it exists to give portfolio skills a durable anchor that isn't recent git activity. Skills read it as primary context when writing highlights, which fights the recency bias that comes from git-log-only inputs.

- Convention: `VISION.md` at repo root is picked up automatically
- Override with the optional `visionDoc` field in `portfolio.json` if it lives elsewhere (e.g., `"visionDoc": "docs/vision.md"`)
- Template and section structure: [`docs/VISION-template.md`](./docs/VISION-template.md)
- Recommended only for `featured` and `professional` projects — tools and experiments don't need one

The split between fields is deliberate:

| Where it lives            | Scope                           | Length       |
| ------------------------- | ------------------------------- | ------------ |
| `tagline` / `description` | What it is right now            | Sentences    |
| `highlights[]`            | Headline capabilities           | 4–7 bullets  |
| `VISION.md`               | The envisioned, complete product | 1–2 pages    |
| `content/case-studies/`   | How it got built (backward)     | MDX, any length |

## Sync

```bash
cd C:/dev/portfolio
npm run sync    # regenerate data/projects.ts
npm run build   # verify TypeScript compiles against the new data
npm run dev     # preview locally at http://localhost:3000
```

The sync script ([`scripts/sync-portfolio.ts`](./scripts/sync-portfolio.ts)):

1. Scans three sources:
   - `C:/dev/*/portfolio.json` (excluding `.*`, `Games`, `_pipeline`, `tools`)
   - `C:/dev/Games/<category>/<game>/portfolio.json`
   - `C:/dev/portfolio/scripts/extras/*.json`
2. Validates every config against the schema (AJV, `allErrors`).
3. Derives `slug`, `repoUrl` (from git remote), and `thumbnail` if not explicit.
4. Sorts by `category` order → featured-first → explicit `FEATURED_ORDER` → alphabetical.
5. Emits `data/projects.ts`. Exits non-zero on any validation error or duplicate slug.

## Adding a project to the site

1. In the target repo: create `portfolio.json` at root with `isPublic: false` while iterating.
2. Add a thumbnail at `C:/dev/portfolio/public/images/projects/<slug>-thumb.png` (1200×800 recommended).
3. Run `npm run sync && npm run build`.
4. When ready to ship: flip `isPublic: true`, re-sync, commit, push.
5. Commit the `portfolio.json` in the owning repo — the portfolio site doesn't carry repo-owned metadata.

For non-repo entries (consulting work, retired projects), add the JSON directly to `scripts/extras/` instead.

## Related skills

Two Claude Code skills manage these files so you rarely hand-edit them:

- **`/portfolio-update`** — scans repos for recent activity, compares against each `portfolio.json`, recommends and applies updates, then runs sync. Treats highlights as product story, not changelog.
- **`/project-init`** — when bootstrapping a new project, offers to generate a starter `portfolio.json` with sensible defaults.

Skill sources live under `C:/Users/Matt/.claude/skills/`.

## Paths

| Purpose                    | Path                                                       |
| -------------------------- | ---------------------------------------------------------- |
| Schema                     | `schemas/portfolio.schema.json`                            |
| Sync script                | `scripts/sync-portfolio.ts`                                |
| One-time seed script       | `scripts/seed-portfolio-configs.ts`                        |
| Non-repo entries           | `scripts/extras/*.json`                                    |
| Generated data (no edits)  | `data/projects.ts`                                         |
| Case study MDX             | `content/case-studies/<slug>.mdx`                          |
| Thumbnails & screenshots   | `public/images/projects/`                                  |

## Project manifest (`.project.json`)

A separate, broader catalog system lives alongside the portfolio. Each folder in `C:/dev` gets a `.project.json` describing its id, kind (project vs. group), type, status, and location in the hierarchy. A sync script scans them and emits `C:/dev/.projects.json` as the canonical index.

**Two different questions, two different files:**

| File             | Answers                         | Scope                                                         |
| ---------------- | ------------------------------- | ------------------------------------------------------------- |
| `portfolio.json` | "what goes on my public site"   | Curated subset — shipped, presentable projects                |
| `.project.json`  | "what exists in my repos folder" | Every folder — apps, games, infra, content, archived, groups |

The manifest is consumed by `/portfolio-update`, `/standup`, `/project-init`, memory, and any other tooling that needs to enumerate projects. Command app maintains its own registry independently.

### Authoring a `.project.json`

**Leaf project:**

```json
{
  "$schema": "https://raw.githubusercontent.com/MattAtencio/portfolio/main/schemas/project.schema.json",
  "id": "my-app",
  "name": "My App",
  "kind": "project",
  "type": "app",
  "status": "active",
  "group": null,
  "tags": ["revenue-eligible"]
}
```

**Group** (a folder containing projects — e.g. `C:/dev/Games/`):

```json
{
  "$schema": "https://raw.githubusercontent.com/MattAtencio/portfolio/main/schemas/project.schema.json",
  "id": "games",
  "name": "Games",
  "kind": "group",
  "description": "All game projects."
}
```

Full schema: [`schemas/project.schema.json`](./schemas/project.schema.json). Required for projects: `id`, `name`, `kind`, `type`, `status`. Required for groups: `id`, `name`, `kind`.

**Auto-derived by sync (don't hand-write):**

- `path`, `relPath` — from file location
- `isCodeRepo` — from `.git` presence
- `deployment` — from git remote (`github`, `azure-devops`, `gitea`), `vercel.json`, `railway.json` — falls back to `local_only`
- `gitRemote` — from `git remote get-url origin`
- `hasPortfolio`, `hasVision`, `hasClaudeMd`, `hasReadme` — from sibling file presence

Set these manually in the manifest only to override sync's guess.

### Sync

```bash
cd C:/dev/portfolio
npm run sync:projects
```

The script ([`scripts/sync-projects.ts`](./scripts/sync-projects.ts)):

1. Scans `C:/dev` recursively (max depth 4), skipping `node_modules`, `.git`, `dist`, `coverage`, `_pipeline`, `_archive`, `tools`, and other excluded names
2. Validates every `.project.json` against the schema
3. Checks for duplicate IDs and orphaned group references
4. Auto-derives computed fields
5. Emits `C:/dev/.projects.json` with `groups[]`, `projects[]`, counts, and a `drift.foldersWithoutManifest` list
6. Exits non-zero on validation or structural errors

Drift — folders that look like projects (`.git`, `package.json`, etc.) but have no `.project.json` — is reported but non-fatal. Create a manifest or add the name to `EXCLUDE_DIRS` in the script.

### Ergonomic entry point

The **`/projects-sync` skill** (at `~/.claude/skills/projects-sync/SKILL.md`) wraps this workflow with drift review prompts and manifest templates. Prefer the skill over calling the script directly when iterating.

### Groups + tags

Two orthogonal axes:

- **Groups** model the folder hierarchy. One parent per project (`group: "games-kids"`). Vertical.
- **Tags** are cross-cutting labels (`["revenue-eligible", "wip", "public"]`). Many per project. Horizontal.

Rule of thumb: if "show me all the X" cuts across groups, it's a tag. If it's "where does this live in the tree," it's a group. Don't tag with values that `type`/`kind`/`status` already cover.

## Dev

```bash
npm run dev       # next dev
npm run build     # next build (runs after sync to validate types)
npm run lint      # eslint
npm run sync      # regenerate data/projects.ts from portfolio.json files
```

Deploy is via Vercel on push to `main`.
