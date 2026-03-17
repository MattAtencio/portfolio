import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://mattatencio.com"),
  title: {
    default: "Matt Atencio | Engineering Leader & Solutions Architect",
    template: "%s | Matt Atencio",
  },
  description:
    "Senior Software Engineer and Integration Architect with 12+ years in fintech. Building secure, scalable platforms that drive business outcomes in regulated industries.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mattatencio.com",
    siteName: "Matt Atencio",
    title: "Matt Atencio | Engineering Leader & Solutions Architect",
    description:
      "Senior Software Engineer and Integration Architect with 12+ years in fintech.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Matt Atencio",
  url: "https://mattatencio.com",
  jobTitle: "Senior Software Engineer & Integration Architect",
  description:
    "Engineering leader with 12+ years in fintech, MBA, building secure scalable platforms.",
  sameAs: [
    "https://github.com/MattAtencio",
    "https://www.linkedin.com/in/matthew-atencio/",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Southern New Hampshire University",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
