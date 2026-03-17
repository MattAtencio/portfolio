"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { staggerChild } from "@/lib/design-tokens"
import { Section } from "@/components/layout/Section"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { Github, ExternalLink, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GitHubData } from "@/lib/github"

function ContributionChart({
  weeks,
}: {
  weeks: GitHubData["contributions"]["weeks"]
}) {
  // Show last 52 weeks
  const recentWeeks = weeks.slice(-52)
  const cellSize = 11
  const gap = 2
  const totalWidth = recentWeeks.length * (cellSize + gap)

  return (
    <div className="overflow-x-auto pb-2">
      <svg
        width={totalWidth}
        height={7 * (cellSize + gap)}
        className="block"
        role="img"
        aria-label="GitHub contribution chart"
      >
        {recentWeeks.map((week, weekIndex) =>
          week.contributionDays.map((day, dayIndex) => (
            <rect
              key={`${weekIndex}-${dayIndex}`}
              x={weekIndex * (cellSize + gap)}
              y={dayIndex * (cellSize + gap)}
              width={cellSize}
              height={cellSize}
              rx={2}
              className="transition-colors"
              fill={
                day.contributionCount === 0
                  ? "var(--color-muted)"
                  : day.contributionCount <= 3
                    ? "var(--color-primary)"
                    : day.contributionCount <= 6
                      ? "var(--color-primary)"
                      : "var(--color-primary)"
              }
              opacity={
                day.contributionCount === 0
                  ? 0.4
                  : day.contributionCount <= 3
                    ? 0.4
                    : day.contributionCount <= 6
                      ? 0.7
                      : 1
              }
            >
              <title>
                {day.date}: {day.contributionCount} contribution
                {day.contributionCount !== 1 ? "s" : ""}
              </title>
            </rect>
          ))
        )}
      </svg>
    </div>
  )
}

export function GitHub() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Section
      id="github"
      title="Open Source"
      subtitle="Building in public and contributing to the community"
    >
      {loading ? (
        <div className="space-y-4">
          <div className="h-24 animate-pulse rounded-lg bg-muted" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        </div>
      ) : data ? (
        <>
          {/* Contribution summary */}
          <motion.div variants={staggerChild} className="mb-8">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5 text-foreground" />
                <span className="text-2xl font-bold text-foreground">
                  {data.contributions.totalContributions}
                </span>
                <span className="text-sm text-muted-foreground">
                  contributions this year
                </span>
              </div>
            </div>
            <ContributionChart weeks={data.contributions.weeks} />
          </motion.div>

          {/* Pinned repos */}
          {data.pinnedRepos.length > 0 && (
            <motion.div variants={staggerChild}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Pinned Repositories
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.pinnedRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <Card className="h-full transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                            {repo.name}
                          </h4>
                          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        {repo.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {repo.description}
                          </p>
                        )}
                        <div className="mt-3 flex items-center gap-3">
                          {repo.primaryLanguage && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <span
                                className="inline-block h-2.5 w-2.5 rounded-full"
                                style={{
                                  backgroundColor: repo.primaryLanguage.color,
                                }}
                              />
                              {repo.primaryLanguage.name}
                            </span>
                          )}
                          {repo.stargazerCount > 0 && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="h-3 w-3" />
                              {repo.stargazerCount}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </>
      ) : (
        /* Fallback: no GitHub data available */
        <motion.div variants={staggerChild}>
          <p className="mb-4 text-muted-foreground">
            Active on GitHub — building side projects, contributing to open
            source, and sharing code publicly.
          </p>
          <a
            href="https://github.com/MattAtencio"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Github className="mr-2 h-4 w-4" />
            View GitHub Profile
          </a>
        </motion.div>
      )}

      {/* Always show profile link */}
      {data && (
        <motion.div variants={staggerChild} className="mt-6">
          <a
            href={data.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Github className="mr-2 h-4 w-4" />
            View Full Profile
          </a>
        </motion.div>
      )}
    </Section>
  )
}
