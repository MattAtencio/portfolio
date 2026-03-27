import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    slug: "fitops",
    title: "FitOps Studio",
    tagline:
      "Full-stack SaaS platform for fitness studio operations management",
    description: `FitOps is a comprehensive SaaS platform for fitness studio operations. It integrates with the MindBody API to provide real-time class scheduling, client management, revenue analytics, staff payroll, and automated client journey workflows.

The platform features role-based access control (Owner, Ops Manager, Front Desk, Teacher), a visual journey builder, multi-location dashboard with KPI comparison, an Education Portal with certificates and workshop tracking, a Communications Inbox for unified messaging, task management with Kanban boards, referral tracking, kiosk check-in, and configurable analytics.

Developed across 20+ sprints with an AI-assisted workflow including specialized agents for spec writing, development, QA, peer review, and architecture decisions.`,
    category: "featured",
    status: "active",
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Prisma",
      "PostgreSQL",
      "Auth.js",
      "Framer Motion",
      "Vercel",
      "Playwright",
    ],
    images: {
      thumbnail: "/images/projects/fitops-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Designed RBAC system with 4 role tiers and server-side enforcement",
      "Built visual journey engine with automated client lifecycle workflows",
      "Shipped Education Portal with certificates, workshops, and teaching practice tracking",
      "Built Communications Inbox, task management Kanban, and multi-location dashboard",
      "Added Education Analytics Dashboard with workshop conversion funnel tracking",
      "Built in-app Help Center with FAQ, feature guides, and role-based guides",
    ],
    businessContext:
      "Fitness studios rely on fragmented tools for scheduling, payments, and client communication. FitOps consolidates these into a single platform, reducing operational overhead and improving client retention.",
    isPublic: false,
    startDate: "2025-03",
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "enterprise-integration",
    title: "Enterprise Integration Architecture",
    tagline:
      "Cloud-native mortgage platform serving millions of B2B and B2C users",
    description: `At Sagent, I architect and develop cloud-native microservices for a 24/7 consumer mortgage platform. Key initiatives include modernizing authentication from single-IDP to a secure multi-IDP OIDC proxy architecture, building payment processor integrations, and optimizing observability systems.

This work spans the full integration lifecycle — from vendor discovery and architecture design through go-live and production support — across identity providers, payment processors, and servicing platforms.`,
    category: "professional",
    status: "active",
    techStack: [
      "C#",
      ".NET",
      "Azure",
      "Microservices",
      "OAuth/OIDC",
      "Okta",
      "Auth0",
      "Terraform",
    ],
    images: {
      thumbnail: "/images/projects/integration-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Modernized authentication to secure multi-IDP OIDC proxy architecture",
      "Scaled client onboarding to 4–5 concurrent launches via automation",
      "Reduced telemetry costs by 50% through optimized observability strategy",
      "Established Sev 1 incident response standards and SLA frameworks",
    ],
    businessContext:
      "Consumer mortgage platforms require 24/7 availability, strict regulatory compliance, and seamless integrations across identity, payments, and servicing vendors.",
    isPublic: false,
    startDate: "2021-08",
    featured: true,
  },
  {
    slug: "spectrum",
    title: "Spectrum",
    tagline: "Color-matching word puzzle game",
    description: `Spectrum is a daily puzzle game where players sort words along a color gradient. Built as a Progressive Web App with daily puzzle rotation using seeded randomness.`,
    category: "games",
    status: "active",
    techStack: ["Next.js", "JavaScript", "PWA", "CSS Modules"],
    liveUrl: "https://spectrum.mattatencio.com",
    images: {
      thumbnail: "/images/projects/spectrum-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Daily puzzle rotation with seeded randomness",
      "Installable PWA with offline support",
      "Mobile-first design optimized for touch",
    ],
    isPublic: true,
    startDate: "2025-01",
    featured: false,
  },
  {
    slug: "flowgrid",
    title: "FlowGrid",
    tagline: "Connect color pairs on a grid without crossing paths",
    description: `FlowGrid challenges players to connect matching color pairs on a grid without crossing any paths. Features daily puzzles and increasing difficulty levels.`,
    category: "games",
    status: "active",
    techStack: ["Next.js", "JavaScript", "PWA", "CSS Modules"],
    liveUrl: "https://flowgrid.mattatencio.com",
    images: {
      thumbnail: "/images/projects/flowgrid-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Procedurally generated puzzles with difficulty scaling",
      "Smooth touch-based path drawing",
      "PWA with offline play",
    ],
    isPublic: true,
    startDate: "2025-01",
    featured: false,
  },
  {
    slug: "wikichain",
    title: "WikiChain",
    tagline: "Wikipedia word-chain challenge",
    description: `WikiChain is a daily word game where players navigate between Wikipedia topics by finding connecting words. Tests vocabulary and lateral thinking.`,
    category: "games",
    status: "active",
    techStack: ["Next.js", "JavaScript", "PWA", "CSS Modules"],
    liveUrl: "https://wikichain.mattatencio.com",
    images: {
      thumbnail: "/images/projects/wikichain-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Wikipedia-inspired word chains with daily rotation",
      "Hint system for accessibility",
      "Procedural sound effects via Web Audio API",
    ],
    isPublic: true,
    startDate: "2025-01",
    featured: false,
  },
  {
    slug: "anagram-chain",
    title: "Anagram Chain",
    tagline: "Unscramble words to build chains",
    description: `Anagram Chain combines word unscrambling with chain-building mechanics. Players solve anagrams in sequence, with each word connecting to the next.`,
    category: "games",
    status: "active",
    techStack: ["Next.js", "JavaScript", "PWA", "CSS Modules"],
    liveUrl: "https://anagram.mattatencio.com",
    images: {
      thumbnail: "/images/projects/anagram-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Seeded daily puzzle selection",
      "Canvas-based confetti celebrations",
      "Procedural audio with Web Audio API",
    ],
    isPublic: true,
    startDate: "2025-01",
    featured: false,
  },
  {
    slug: "solitaire",
    title: "Solitaire",
    tagline: "Classic Klondike Solitaire with drag & drop",
    description: `A fully-featured digital Klondike Solitaire game with smooth drag-and-drop card mechanics, undo functionality, move tracking, timer, and auto-complete. Features a polished dark UI with gold accents optimized for both desktop and mobile.`,
    category: "games",
    status: "active",
    techStack: ["Next.js", "React 19", "PWA", "CSS Modules"],
    liveUrl: "https://solitaire.mattatencio.com",
    images: {
      thumbnail: "/images/projects/solitaire-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Smooth drag-and-drop with visual feedback",
      "Undo history, auto-complete, and double-tap moves",
      "Installable PWA with offline support",
    ],
    isPublic: true,
    startDate: "2025-01",
    featured: false,
  },
  {
    slug: "minesweeper",
    title: "Minesweeper",
    tagline: "Modern Minesweeper with haptics and audio",
    description: `A modern Minesweeper PWA with three difficulty levels, haptic vibration patterns, and synthesized sound effects. Features cascade reveals, particle explosions, chord reveal mechanics, and a responsive dark-themed UI.`,
    category: "games",
    status: "active",
    techStack: ["JavaScript", "HTML5", "CSS3", "Web Audio API", "PWA"],
    liveUrl: "https://minesweeper.mattatencio.com",
    images: {
      thumbnail: "/images/projects/minesweeper-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Haptic feedback with custom vibration patterns",
      "Synthesized audio effects via Web Audio API",
      "Three difficulty levels with particle effects and screen shake",
    ],
    isPublic: true,
    startDate: "2025-01",
    featured: false,
  },
  {
    slug: "lexle",
    title: "Lexle",
    tagline: "Daily word puzzle in the style of Wordle",
    description: `Lexle is a daily word-guessing game inspired by Wordle. Players have six attempts to guess a hidden five-letter word, with color-coded feedback after each guess indicating correct letters and positions.`,
    category: "games",
    status: "active",
    techStack: ["Next.js", "JavaScript", "PWA", "CSS Modules"],
    liveUrl: "https://lexle.mattatencio.com",
    images: {
      thumbnail: "/images/projects/lexle-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Daily puzzle rotation with seeded word selection",
      "Color-coded letter feedback with keyboard tracking",
      "Installable PWA with offline support",
    ],
    isPublic: true,
    startDate: "2025-03",
    featured: false,
  },
  {
    slug: "forge-and-field",
    title: "Forge & Field",
    tagline: "Craft gear and send heroes on quests",
    description: `An idle/incremental game where players collect resources, craft weapons and armor, recruit heroes, and send them on expeditions with turn-based combat. Features offline progression, a prestige system, and rotating seasonal events.`,
    category: "games",
    status: "active",
    techStack: ["Next.js", "React 19", "PWA", "CSS Modules"],
    liveUrl: "https://forge.mattatencio.com",
    roadmapUrl: "/projects/forge-and-field/roadmap",
    images: {
      thumbnail: "/images/projects/forge-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Turn-based combat with 4 hero archetypes and gear crafting",
      "Offline progression and prestige/rebirth system",
      "Rotating seasonal events with exclusive rewards",
    ],
    isPublic: true,
    startDate: "2025-01",
    featured: false,
    hasCaseStudy: true,
  },
  {
    slug: "kids-corner",
    title: "Kids Corner",
    tagline: "Educational game suite for kids ages 2-6",
    description: `Kids Corner is a collection of five interactive learning games designed for children ages 2-6. The suite includes Color Mixer (color blending), Count Along (number counting with themed object sets), Letter Land (alphabet exploration), Sunny Days (weather and daily routines), and Alpha Dots (connect-the-dots alphabet).

All games share a core framework (@kids-games/core) with pre-generated TTS audio featuring kid-friendly persona voices, celebration animations, and consistent UI patterns. Accessible through a central hub at kids.mattatencio.com.`,
    category: "games",
    status: "active",
    techStack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "OpenAI TTS",
      "PWA",
      "Tailwind CSS",
    ],
    liveUrl: "https://kids.mattatencio.com",
    images: {
      thumbnail: "/images/projects/kids-corner-thumb.png",
      screenshots: [],
    },
    highlights: [
      "5 games sharing a core framework with pre-generated TTS persona voices",
      "Age-appropriate UI with large touch targets and celebration animations",
      "Central hub with game launcher and progress tracking",
    ],
    isPublic: true,
    startDate: "2026-03",
    featured: false,
  },
  {
    slug: "mahjong-path",
    title: "Mahjong Path",
    tagline: "Strategic tile-matching with bot opponents",
    description: `A Mahjong tile-matching game with three difficulty levels of bot opponents. Features hand evaluation, pattern matching, and a learn mode for newcomers. Includes beginner, intermediate, and master-level AI using shared utility functions.`,
    category: "games",
    status: "active",
    techStack: ["Next.js", "React 19", "TypeScript", "PWA"],
    images: {
      thumbnail: "/images/projects/mahjong-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Three AI difficulty tiers with shared bot utility system",
      "Learn mode with guided tutorials",
      "Hand evaluation and scoring engine",
    ],
    isPublic: true,
    startDate: "2026-03",
    featured: false,
  },
  {
    slug: "unified-dashboard",
    title: "Unified Dashboard",
    tagline:
      "CLI dashboard aggregating usage, cost, and security signals from hosting providers",
    description: `A terminal-based dashboard that consolidates usage metrics, cost breakdowns, and security signals from multiple hosting and cloud providers into a single view. Designed for solo developers and small teams managing infrastructure across Vercel, Cloudflare, GitHub, and other services.

Aggregates billing data, deployment status, domain health, and security alerts so operators can spot issues without switching between provider dashboards.`,
    category: "tools",
    status: "active",
    techStack: [
      "Python",
      "Rich",
      "Vercel API",
      "Cloudflare API",
      "GitHub API",
    ],
    images: {
      thumbnail: "/images/projects/unified-dashboard-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Aggregates usage, cost, and security data from multiple hosting providers",
      "Terminal UI with Rich for at-a-glance infrastructure health",
      "Extensible provider plugin architecture for adding new services",
    ],
    isPublic: false,
    startDate: "2026-03",
    featured: false,
  },
  {
    slug: "signal-forge",
    title: "Signal Forge",
    tagline: "AI-powered crypto prediction and portfolio management platform",
    description: `Signal Forge is a full-stack cryptocurrency investment platform combining ML-driven price predictions with portfolio management and automated trading signals. Features a real-time market data pipeline from CoinGecko, XGBoost prediction models with walk-forward backtesting, a trading engine with smart exits, portfolio tracking with rebalancing, and a notifications system with pluggable channels.

Built as a multi-service architecture with a Python/FastAPI backend, React frontend dashboard, and Streamlit analytics.`,
    category: "tools",
    status: "active",
    techStack: [
      "Python 3.12",
      "FastAPI",
      "React 18",
      "XGBoost",
      "SQLAlchemy",
      "Docker Compose",
      "Streamlit",
      "Chart.js",
      "CoinGecko API",
    ],
    images: {
      thumbnail: "/images/projects/signal-forge-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Walk-forward backtesting with XGBoost prediction models — no lookahead bias",
      "Real-time CoinGecko market data pipeline with rate limiting and caching",
      "Trading engine with signal generation, smart exits, and position management",
      "Portfolio tracker with performance metrics, allocation analysis, and rebalancing",
    ],
    businessContext:
      "Quantitative approach to cryptocurrency investment with risk-managed strategies, separating BTC long-term holds from altcoin swing trades.",
    isPublic: false,
    startDate: "2025-05",
    featured: false,
  },
  {
    slug: "yoga-dashboard",
    title: "Yoga Dashboard",
    tagline: "Studio operations prototype with MindBody API mock",
    description: `A prototype dashboard for yoga studio operations, featuring a complete mock of the MindBody public API. Built as a proof-of-concept for the FitOps platform.`,
    category: "tools",
    status: "maintained",
    techStack: ["FastAPI", "React", "Python"],
    images: {
      thumbnail: "/images/projects/yoga-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Full MindBody API mock for development",
      "End-to-end studio operations prototype",
      "Foundation for FitOps platform development",
    ],
    isPublic: false,
    startDate: "2024-06",
    featured: false,
  },
  {
    slug: "vault",
    title: "Vault",
    tagline: "Personal finance PWA with AI insights and bank integration",
    description: `Vault is a personal finance application that aggregates bank accounts via Plaid, categorizes transactions using Claude AI, and delivers weekly financial insights. Built as a Turborepo monorepo with an Express 5 API backend and React 19 PWA frontend.

Features include automated transaction sync, AI-powered categorization, push notifications, and gamified financial goal tracking.`,
    category: "tools",
    status: "active",
    techStack: [
      "React 19",
      "TypeScript",
      "Express 5",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Plaid API",
      "Claude API",
      "Tailwind CSS",
      "Turborepo",
    ],
    images: {
      thumbnail: "/images/projects/vault-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Plaid integration for bank account aggregation and transaction sync",
      "Claude AI-powered transaction categorization and weekly financial insights",
      "Turborepo monorepo with Express 5 API and React 19 PWA",
      "BullMQ job queue with Redis for background processing",
      "Financial goal tracking with CRUD, push notifications, and cash flow summaries",
    ],
    businessContext:
      "Consolidates personal finance data from multiple bank accounts with AI-driven insights to improve financial awareness and decision-making.",
    isPublic: false,
    startDate: "2026-02",
    featured: false,
  },
  {
    slug: "homelab-dashboard",
    title: "Homelab Dashboard",
    tagline: "Hardware inventory and network topology for a home server lab",
    description: `A self-hosted dashboard for managing homelab hardware inventory — network diagram, device tree, and workbench views. Deployed via Docker Compose to a Raspberry Pi with remote access through Cloudflare Tunnel.

Built with React and Express, using LowDB for lightweight JSON-file persistence.`,
    category: "tools",
    status: "active",
    techStack: [
      "React 18",
      "Vite",
      "Express",
      "LowDB",
      "Docker",
      "Cloudflare Tunnel",
    ],
    images: {
      thumbnail: "/images/projects/homelab-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Grouped network topology view with interactive device tree",
      "Dockerized deployment to Raspberry Pi with Cloudflare Tunnel access",
      "LowDB JSON-file persistence with seed data separation",
    ],
    isPublic: false,
    startDate: "2026-02",
    featured: false,
  },
  {
    slug: "homelab-infra",
    title: "Homelab Infrastructure",
    tagline: "Infrastructure-as-code for a self-hosted home server environment",
    description: `Infrastructure-as-code repository managing a personal homelab environment. Covers provisioning, configuration management, and service deployment for self-hosted storage and network services.

Uses a phased rollout approach with security policies, automated backups, and secure remote access.`,
    category: "tools",
    status: "active",
    techStack: [
      "Terraform",
      "Ansible",
      "Docker Compose",
      "Raspberry Pi",
      "Cloudflare Tunnel",
    ],
    images: {
      thumbnail: "/images/projects/homelab-infra-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Phased IaC rollout for private cloud storage and network services",
      "Automated provisioning with Terraform and Ansible",
      "Secure remote access via tunneling with no exposed ports",
    ],
    isPublic: false,
    startDate: "2026-03",
    featured: false,
  },
  {
    slug: "claude-framework",
    title: "Claude Framework",
    tagline:
      "Autonomous development framework turning Claude Code into a full engineering team",
    description: `A meta-tooling framework that extends Claude Code with 36+ reusable skills, 7 specialized review agents, automated communication pipelines, and an Obsidian-backed knowledge graph. Orchestrates daily workflows from morning briefing through end-of-day wrap with parallel agent execution, Slack/Discord integration, and persistent memory across sessions.

Built as a living system that evolves with each project — skills are composed, agents are dispatched in parallel, and session knowledge compounds through structured vault notes with wikilinks and frontmatter.`,
    category: "tools",
    status: "active",
    techStack: [
      "Claude Code",
      "Python",
      "Bash",
      "Slack API",
      "Discord API",
      "Obsidian",
      "YAML",
      "JSON",
    ],
    images: {
      thumbnail: "/images/projects/claude-framework-thumb.png",
      screenshots: [],
    },
    highlights: [
      "36+ composable skills with YAML frontmatter, context isolation, and tool restrictions",
      "7 specialized review agents for architecture, security, product, QA, and UI/UX",
      "Automated Slack/Discord intake pipelines with classification and GitHub routing",
      "Obsidian knowledge graph with session notes, MOCs, and cross-project connection tracking",
      "Zero-dashboard deployment automation with GitHub push, Vercel/Supabase provisioning, Cloudflare DNS, and Slack approval gates",
    ],
    businessContext:
      "Solo developer productivity multiplier — automates the overhead of managing 14+ active projects, from morning planning through deployment and daily documentation.",
    isPublic: false,
    startDate: "2025-03",
    featured: true,
    hasCaseStudy: true,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getProjectsByCategory(
  category: Project["category"]
): Project[] {
  return projects.filter((p) => p.category === category)
}

export function getGameProjects(): Project[] {
  return projects.filter((p) => p.category === "games")
}
