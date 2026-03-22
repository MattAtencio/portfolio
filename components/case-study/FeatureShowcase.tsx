"use client"

import { motion } from "framer-motion"
import { staggerChild } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

interface Feature {
  title: string
  description: string
  image?: string
}

interface FeatureShowcaseProps {
  features: Feature[]
}

export function FeatureShowcase({ features }: FeatureShowcaseProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {features.map((feature, i) => (
        <motion.div
          key={i}
          variants={staggerChild}
          className="rounded-lg border border-border bg-card p-5"
        >
          {feature.image && (
            <div className="mb-4 overflow-hidden rounded-md bg-muted">
              <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                {feature.image}
              </div>
            </div>
          )}
          <h4 className="font-semibold text-foreground">{feature.title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
