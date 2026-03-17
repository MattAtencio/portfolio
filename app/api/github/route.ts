import { NextResponse } from "next/server"
import { fetchGitHubData } from "@/lib/github"

export const revalidate = 3600 // ISR: revalidate every hour

export async function GET() {
  const data = await fetchGitHubData()

  if (!data) {
    return NextResponse.json(
      { error: "GitHub data unavailable" },
      { status: 503 }
    )
  }

  return NextResponse.json(data)
}
