"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Header from "./header"
import Hero from "./sections/hero"
import Experience from "./sections/experience"
import Projects from "./sections/projects"
import Contact from "./sections/contact"
import Skills from "./sections/skills"
import SocialSidebar from "./social-sidebar"
import EmailSidebar from "./email-sidebar"
import Footer from "./footer"
import ScrollIndicator from "./scroll-indicator"
import About from "./sections/about"


export default function MainContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSection, setCurrentSection] = useState(1)
  const [activeScrollSection, setActiveScrollSection] = useState("")
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  // Section order must match the render order below
  const sectionList = [
    { id: "hero", Component: Hero },
    { id: "about", Component: About },
    // { id: "skills", Component: Skills },
    { id: "experience", Component: Experience },
    { id: "projects", Component: Projects },
    { id: "contact", Component: Contact },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Only run after loading animation is complete
    if (!isLoaded) return
    
    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) {
          // Find the topmost visible section
          const topmost = visible.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          )
          const idx = sectionRefs.current.findIndex(
            (ref) => ref === topmost.target
          )
          if (idx !== -1) {
            setCurrentSection(idx + 1)
            setActiveScrollSection(sectionList[idx].id)
          }
        }
      },
      { threshold: 0.3 }
    )
    
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })
    
    return () => observer.disconnect()
  }, [isLoaded])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative"
    >
      <Header />
      <SocialSidebar />
      <EmailSidebar />
      {/* <ScrollIndicator currentSection={currentSection} totalSections={sectionList.length} isLoaded={isLoaded} /> */}
      <div className="">
        {sectionList.map(({ id, Component }, idx) => (
          <section
            key={id}
            id={id}
            ref={el => { sectionRefs.current[idx] = el }}
            className="min-h-screen  flex items-center justify-center"
            data-active={activeScrollSection === id}
          >
            <Component />
          </section>
        ))}
        <Footer />
      </div>
    </motion.div>
  )
}