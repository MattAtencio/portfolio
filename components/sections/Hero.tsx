"use client"

import { motion } from "framer-motion"
import { heroReveal, staggerContainer, staggerChild } from "@/lib/design-tokens"
import { ArrowDown, Mail } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6">
      {/* Subtle radial gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(129,140,248,0.15),transparent_70%)]" />
      <motion.div
        className="mx-auto max-w-3xl text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={heroReveal}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-primary"
        >
          Engineering Leader &middot; Solutions Architect &middot; MBA
        </motion.p>

        <motion.h1
          variants={heroReveal}
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Matt Atencio
        </motion.h1>

        <motion.p
          variants={heroReveal}
          className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Building secure, scalable platforms that drive business outcomes in
          regulated industries. 12+ years turning complex integration challenges
          into reliable systems serving millions.
        </motion.p>

        <motion.div
          variants={staggerChild}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#work"
            className={cn(buttonVariants({ size: "lg" }), "min-w-[160px]")}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-w-[160px]"
            )}
          >
            <Mail className="mr-2 h-4 w-4" />
            Get in Touch
          </a>
        </motion.div>

        <motion.div variants={staggerChild} className="mt-16">
          <a
            href="#about"
            className="inline-flex animate-bounce text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowDown className="h-5 w-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
