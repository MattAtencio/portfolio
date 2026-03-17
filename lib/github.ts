export interface ContributionDay {
  date: string
  contributionCount: number
  color: string
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface GitHubContributions {
  totalContributions: number
  weeks: ContributionWeek[]
}

export interface PinnedRepo {
  name: string
  description: string | null
  url: string
  stargazerCount: number
  primaryLanguage: { name: string; color: string } | null
}

export interface GitHubData {
  contributions: GitHubContributions
  pinnedRepos: PinnedRepo[]
  username: string
  profileUrl: string
}

const GITHUB_GRAPHQL = "https://api.github.com/graphql"
const USERNAME = "MattAtencio"

export async function fetchGitHubData(): Promise<GitHubData | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null

  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
          pinnedItems(first: 6, types: [REPOSITORY]) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                primaryLanguage {
                  name
                  color
                }
              }
            }
          }
        }
      }
    `

    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username: USERNAME } }),
    })

    if (!res.ok) return null

    const json = await res.json()
    const user = json.data?.user
    if (!user) return null

    return {
      contributions:
        user.contributionsCollection.contributionCalendar,
      pinnedRepos: user.pinnedItems.nodes,
      username: USERNAME,
      profileUrl: `https://github.com/${USERNAME}`,
    }
  } catch {
    return null
  }
}
