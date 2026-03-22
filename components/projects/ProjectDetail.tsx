"use client"

import { motion } from "framer-motion"
import { fadeIn, staggerContainer, staggerChild } from "@/lib/design-tokens"
import type { Project } from "@/types/project"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, BookOpen, ExternalLink, Github, Lock, Map } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="pb-20 pt-24">
      <motion.div
        className="mx-auto max-w-4xl px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Back link */}
        <motion.div variants={fadeIn}>
          <Link
            href="/#work"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all work
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={staggerChild} className="mt-6">
          <div className="flex items-start gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {project.title}
            </h1>
            {!project.isPublic && (
              <div className="mt-2 flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Private
              </div>
            )}
          </div>
          <p className="mt-3 text-lg text-muted-foreground">
            {project.tagline}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div variants={staggerChild} className="mt-6 flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants())}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Github className="mr-2 h-4 w-4" />
              Source Code
            </a>
          )}
          {project.roadmapUrl && (
            <Link
              href={project.roadmapUrl}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Map className="mr-2 h-4 w-4" />
              Roadmap
            </Link>
          )}
          {project.hasCaseStudy && (
            <Link
              href={`/projects/${project.slug}/case-study`}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Case Study
            </Link>
          )}
        </motion.div>

        <Separator className="my-8" />

        {/* Business context */}
        {project.businessContext && (
          <motion.div variants={staggerChild} className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Business Context
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {project.businessContext}
            </p>
          </motion.div>
        )}

        {/* Description */}
        <motion.div variants={staggerChild} className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Overview
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            {project.description.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div variants={staggerChild} className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Key Contributions
          </h2>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="flex gap-3 text-base leading-relaxed text-muted-foreground"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {h}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Tech stack */}
        <motion.div variants={staggerChild}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
