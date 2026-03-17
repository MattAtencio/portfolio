import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Experience } from "@/components/sections/Experience"
import { CaseStudies } from "@/components/sections/CaseStudies"
import { TechDepth } from "@/components/sections/TechDepth"
import { GitHub } from "@/components/sections/GitHub"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <CaseStudies />
      <TechDepth />
      <GitHub />
      <Contact />
    </>
  )
}
