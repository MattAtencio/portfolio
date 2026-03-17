"use client"

import { motion } from "framer-motion"
import { staggerChild } from "@/lib/design-tokens"
import { Section } from "@/components/layout/Section"
import { Badge } from "@/components/ui/badge"
import { certifications } from "@/data/experience"

export function About() {
  return (
    <Section id="about" title="About" className="bg-muted/30">
      <div className="grid gap-12 lg:grid-cols-5">
        <motion.div variants={staggerChild} className="lg:col-span-3">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              I&apos;m a Senior Software Engineer and Integration Architect with
              over a decade of experience designing and delivering cloud-native
              fintech platforms in highly regulated environments. My work sits at
              the intersection of engineering, product, and business
              strategy&mdash;bridging technical depth with organizational impact.
            </p>
            <p>
              At Sagent, I architect multi-tenant microservices for a mortgage
              platform serving millions, lead authentication modernization
              initiatives, and serve as first-line incident commander. Previously
              at DCU and First Financial, I drove CRM transformations, mobile
              banking modernization, and regulatory automation.
            </p>
            <p className="text-foreground font-medium italic">
              &ldquo;Driven by curiosity and a belief in lifelong learning, I
              solve problems by asking the right questions, visualizing complex
              systems, and connecting the right people. My success comes from
              identifying gaps in process, tools, or teams&mdash;and closing
              them through leadership, design, planning, and collaborative
              execution.&rdquo;
            </p>
          </div>
        </motion.div>

        <motion.div variants={staggerChild} className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Credentials
          </h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-semibold text-foreground">MBA</p>
              <p className="text-sm text-muted-foreground">
                Southern New Hampshire University, 2025
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-semibold text-foreground">
                B.S. Computer Science
              </p>
              <p className="text-sm text-muted-foreground">
                Southern New Hampshire University, 2021
              </p>
            </div>
          </div>

          <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Certifications
          </h3>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert) => (
              <Badge key={cert.name} variant="secondary" className="text-xs">
                {cert.name}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
