"use client"

import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/design-tokens"
import type { Project } from "@/types/project"
import { Hero } from "./Hero"

interface CaseStudyLayoutProps {
  project: Project
  children: React.ReactNode
}

export function CaseStudyLayout({ project, children }: CaseStudyLayoutProps) {
  return (
    <div className="pb-20">
      <Hero
        title={project.title}
        tagline={project.tagline}
        techStack={project.techStack}
        isPublic={project.isPublic}
      />
      <motion.div
        className="mx-auto max-w-4xl px-6 pt-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </div>
  )
}
