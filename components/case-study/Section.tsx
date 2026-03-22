"use client"

import { motion } from "framer-motion"
import { staggerChild } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

interface CaseStudySectionProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function CaseStudySection({
  title,
  children,
  className,
}: CaseStudySectionProps) {
  return (
    <motion.section
      variants={staggerChild}
      className={cn("mb-12", className)}
    >
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </motion.section>
  )
}
