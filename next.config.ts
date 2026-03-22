import createMDX from "@next/mdx"
import remarkGfm from "remark-gfm"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
})

export default withMDX(nextConfig)
