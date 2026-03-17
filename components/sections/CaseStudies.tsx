"use client"

import { motion } from "framer-motion"
import { staggerChild } from "@/lib/design-tokens"
import { Section } from "@/components/layout/Section"
import { getFeaturedProjects, getGameProjects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowRight, ExternalLink, Lock } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function CaseStudies() {
  const featured = getFeaturedProjects()
  const games = getGameProjects()

  return (
    <Section
      id="work"
      title="Featured Work"
      subtitle="Selected projects that demonstrate business impact and technical depth"
      className="bg-muted/30"
    >
      {/* Featured case studies */}
      <div className="grid gap-6 lg:grid-cols-2">
        {featured.map((project) => (
          <motion.div key={project.slug} variants={staggerChild}>
            <Link href={`/projects/${project.slug}`}>
              <Card className="group h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl transition-colors group-hover:text-primary">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {project.tagline}
                      </CardDescription>
                    </div>
                    {!project.isPublic && (
                      <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {project.businessContext && (
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {project.businessContext}
                    </p>
                  )}
                  <ul className="mb-4 space-y-1.5">
                    {project.highlights.slice(0, 3).map((h, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 5 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.techStack.length - 5}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Games section */}
      <motion.div variants={staggerChild} className="mt-12">
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          Creative Engineering
        </h3>
        <p className="mb-6 text-sm text-muted-foreground">
          A collection of puzzle games built as Progressive Web Apps &mdash;
          shipping fast, iterating publicly, and exploring new interaction
          patterns.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game) => (
            <motion.div key={game.slug} variants={staggerChild}>
              <a
                href={game.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                        {game.title}
                      </h4>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {game.tagline}
                    </p>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* See all link */}
      <motion.div variants={staggerChild} className="mt-8 text-center">
        <Link
          href="/projects/fitops"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          View Detailed Case Studies
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </motion.div>
    </Section>
  )
}
