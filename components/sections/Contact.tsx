"use client"

import { motion } from "framer-motion"
import { staggerChild } from "@/lib/design-tokens"
import { Section } from "@/components/layout/Section"
import { buttonVariants } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export function Contact() {
  return (
    <Section id="contact" title="Get in Touch" className="bg-muted/30">
      <motion.div variants={staggerChild} className="max-w-2xl">
        <p className="mb-2 text-base leading-relaxed text-muted-foreground">
          I&apos;m open to engineering leadership opportunities at post-Series B
          startups and established companies — roles where I can bridge
          technical strategy with business outcomes.
        </p>
        <p className="mb-8 text-base leading-relaxed text-muted-foreground">
          Whether you&apos;re looking for an Engineering Manager, Director, or
          a senior technical leader who understands the full stack and the
          business behind it — let&apos;s talk.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/matthew-atencio/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/MattAtencio"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </div>
      </motion.div>
    </Section>
  )
}
