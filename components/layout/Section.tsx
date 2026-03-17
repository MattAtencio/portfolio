"use client"

import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

interface SectionProps {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <motion.div
        className="mx-auto max-w-6xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {children}
      </motion.div>
    </section>
  )
}
