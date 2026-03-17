export interface Experience {
  company: string
  role: string
  location: string
  period: string
  highlights: string[]
}

export interface Education {
  school: string
  degree: string
  year: string
}

export interface Certification {
  name: string
  issuer: string
}

export const experience: Experience[] = [
  {
    company: "Sagent",
    role: "Software Engineer",
    location: "King of Prussia, PA",
    period: "2021 – Present",
    highlights: [
      "Architect cloud-native, multi-tenant microservices for a 24/7 consumer mortgage platform serving millions of users",
      "Led multi-IDP authentication modernization from single-IDP to secure OIDC proxy architecture across Okta and Auth0",
      "Scaled client onboarding to 4–5 concurrent launches through automation and standardized integration frameworks",
      "Reduced observability/telemetry costs by 50% while strengthening compliance with PII redaction libraries",
      "First-line Sev 1 incident leader — established SLA standards and drove cross-team root cause remediation",
      "Mentor distributed engineering teams across feature delivery and production support",
    ],
  },
  {
    company: "Digital Federal Credit Union",
    role: "Application Development / Business Systems Analysis",
    location: "Marlborough, MA",
    period: "2018 – 2021",
    highlights: [
      "Led API-driven CRM integrations and coordinated quarterly enterprise releases across core banking systems",
      "Modernized mobile banking integrations spanning authentication, transactional, and core system services",
      "Drove RPA/AI automation initiatives across lending and member services, improving throughput and compliance",
      "Implemented Octopus Deploy and championed Agile adoption, improving release reliability across teams",
    ],
  },
  {
    company: "First Financial of Maryland FCU",
    role: "Application Development",
    location: "Lutherville, MD",
    period: "2012 – 2018",
    highlights: [
      "Directly engaged executives and department heads to identify technology gaps and deliver solutions",
      "Automated regulatory compliance workflows (TILA/RESPA, HMDA modernization)",
      "Centralized lending and underwriting strategies, reducing operating costs and closing times",
      "Collaborated with Risk Management to ensure all solutions met security and compliance standards",
    ],
  },
]

export const education: Education[] = [
  {
    school: "Southern New Hampshire University",
    degree: "Master of Business Administration (MBA)",
    year: "2025",
  },
  {
    school: "Southern New Hampshire University",
    degree: "B.S. in Computer Science",
    year: "2021",
  },
]

export const certifications: Certification[] = [
  { name: "Microsoft Certified: Azure Fundamentals", issuer: "Microsoft" },
  { name: "Professional Scrum Master I (PSM I)", issuer: "Scrum.org" },
  { name: "Certified Pega Business Architect", issuer: "Pegasystems" },
  { name: "Certified Tester Foundation Level (CTFL)", issuer: "AT*SQA" },
  { name: "RPA Strategy for Business Leaders", issuer: "AICPA" },
  { name: "Inbound Marketing", issuer: "HubSpot Academy" },
]
