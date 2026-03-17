"use client"

import { motion } from "framer-motion"
import { staggerChild } from "@/lib/design-tokens"
import { Section } from "@/components/layout/Section"
import { capabilities } from "@/data/capabilities"
import { Card, CardContent } from "@/components/ui/card"
import {
  Server,
  Lock,
  Layout,
  BarChart3,
  GitBranch,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Server,
  Lock,
  Layout,
  BarChart3,
  GitBranch,
}

export function TechDepth() {
  return (
    <Section
      id="skills"
      title="Technical Depth"
      subtitle="Capability areas that span platform design, integration, and delivery"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap) => {
          const Icon = iconMap[cap.icon] || Server
          return (
            <motion.div key={cap.title} variants={staggerChild}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {cap.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {cap.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
