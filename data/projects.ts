import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    slug: "fitops",
    title: "FitOps Studio",
    tagline:
      "Full-stack SaaS platform for fitness studio operations management",
    description: `FitOps is a comprehensive admin dashboard built for fitness studio owners and operators. It integrates with the MindBody API to provide real-time class scheduling, client management, revenue analytics, staff payroll, and automated client journey workflows.

The platform features role-based access control (Owner, Ops Manager, Front Desk, Teacher), a visual journey builder for automated client communications, and a multi-location management system.

Built with a sophisticated AI-assisted development workflow including specialized agents for spec writing, development, QA, peer review, and architecture decisions.`,
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
    ],
    images: {
      thumbnail: "/images/projects/fitops-thumb.png",
      screenshots: [],
    },
    highlights: [
      "Designed RBAC system with 4 role tiers and server-side enforcement",
      "Built visual journey engine for automated client lifecycle management",
      "Integrated MindBody API with rate limiting, caching, and Zod validation",
      "Implemented AI-assisted development workflow with 7 specialized agents",
    ],
    businessContext:
      "Fitness studios rely on fragmented tools for scheduling, payments, and client communication. FitOps consolidates these into a single platform, reducing operational overhead and improving client retention.",
    isPublic: false,
    startDate: "2025-03",
    featured: true,
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
    slug: "crypto-prediction",
    title: "Crypto Prediction Engine",
    tagline: "ML-powered cryptocurrency prediction with dual investment strategy",
    description: `A machine learning application that combines Bitcoin holdings analysis with altcoin trading predictions. Features backtesting, portfolio tracking, and interactive dashboards.`,
    category: "tools",
    status: "active",
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "Streamlit",
      "Scikit-learn",
      "Pandas",
    ],
    images: {
      thumbnail: "/images/projects/crypto-thumb.png",
      screenshots: [],
    },
    highlights: [
      "ML prediction models with backtesting validation",
      "Dual strategy: BTC holdings + altcoin trading",
      "Interactive Streamlit dashboards for analysis",
    ],
    businessContext:
      "Exploring quantitative approaches to cryptocurrency investment with risk-managed dual strategies.",
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
