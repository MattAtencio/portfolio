"use client"

import { motion } from "framer-motion"
import { staggerChild } from "@/lib/design-tokens"
import { Section } from "@/components/layout/Section"
import { experience } from "@/data/experience"
import { Briefcase } from "lucide-react"

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="A career built on bridging engineering, product, and business in financial services"
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-2 hidden h-[calc(100%-16px)] w-px bg-border sm:block" />

        <div className="space-y-12">
          {experience.map((exp) => (
            <motion.div
              key={exp.company}
              variants={staggerChild}
              className="relative sm:pl-14"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-card sm:flex">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>

              <div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {exp.company}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-primary">
                  {exp.role}
                </p>
                <p className="text-sm text-muted-foreground">{exp.location}</p>

                <ul className="mt-4 space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
