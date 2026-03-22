"use client"

import { motion } from "framer-motion"
import { fadeIn, staggerContainer, staggerChild } from "@/lib/design-tokens"
import { TechBadge } from "./TechBadge"
import { ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"

interface HeroProps {
  title: string
  tagline: string
  techStack: string[]
  isPublic?: boolean
}

export function Hero({ title, tagline, techStack, isPublic = true }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-muted/30 pb-16 pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <motion.div
        className="relative mx-auto max-w-4xl px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeIn}>
          <Link
            href="/#work"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all work
          </Link>
        </motion.div>

        <motion.div variants={staggerChild} className="mt-6">
          <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Case Study
          </div>
          <div className="flex items-start gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {!isPublic && (
              <div className="mt-2 flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Private
              </div>
            )}
          </div>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {tagline}
          </p>
        </motion.div>

        <motion.div variants={staggerChild} className="mt-6 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
