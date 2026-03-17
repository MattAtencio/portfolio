export interface Capability {
  title: string
  description: string
  technologies: string[]
  icon: string // Lucide icon name
}

export const capabilities: Capability[] = [
  {
    title: "Platform Architecture",
    description:
      "Designing cloud-native, multi-tenant systems built for scale, security, and regulatory compliance in financial services.",
    technologies: [
      "Azure",
      "AWS",
      "Microservices",
      "Event-Driven Architecture",
      "DDD",
      "Terraform",
    ],
    icon: "Server",
  },
  {
    title: "Integration & Identity",
    description:
      "Building secure API ecosystems and modernizing authentication across enterprise vendors — from SSO to payment processors.",
    technologies: [
      "OAuth/OIDC",
      "Okta",
      "Auth0",
      "REST APIs",
      "Payment Systems",
      "Vendor Management",
    ],
    icon: "Lock",
  },
  {
    title: "Frontend & Product",
    description:
      "Shipping polished user experiences with modern frameworks, from internal dashboards to consumer-facing products.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Angular",
      "Vue",
    ],
    icon: "Layout",
  },
  {
    title: "Data & Intelligence",
    description:
      "Leveraging data for decision-making — from ML prediction models to executive dashboards and analytics pipelines.",
    technologies: [
      "Python",
      "SQL/NoSQL",
      "Scikit-learn",
      "FastAPI",
      "Power BI",
      "Streamlit",
    ],
    icon: "BarChart3",
  },
  {
    title: "DevOps & Quality",
    description:
      "Building automated pipelines, observability systems, and testing strategies that keep teams shipping with confidence.",
    technologies: [
      "CI/CD",
      "Docker",
      "IaC",
      "TDD",
      "Playwright",
      "APM/Observability",
    ],
    icon: "GitBranch",
  },
]
