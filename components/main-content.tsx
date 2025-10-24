"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import SidebarNav from "./sidebar-nav"
import Hero from "./sections/hero"
import Experience from "./sections/experience"
import Projects from "./sections/projects"
import Contact from "./sections/contact"
import Skills from "./sections/skills"
import SocialSidebar from "./social-sidebar"
import EmailSidebar from "./email-sidebar"
import Footer from "./footer"
import About from "./sections/about"
import { ReactLenis } from "lenis/react"
import gsap from "gsap"
import Header from "./header"
import MobileNavbar from "./mobile-navbar"



export default function MainContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSection, setCurrentSection] = useState(1)
  const [activeScrollSection, setActiveScrollSection] = useState("")
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  const lenisRef = useRef<any>()

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
    function update(time: any) {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.raf(time * 1000);
      }
    }


    console.log(currentSection, "currentSection");
    



    // Add a small delay to ensure Lenis is initialized
    const timeoutId = setTimeout(() => {
      gsap.ticker.add(update);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      gsap.ticker.remove(update);
    };
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Only run after loading animation is complete
    if (!isLoaded) return

    const observer = new window.IntersectionObserver(
      (entries) => {
        // Create a map of all sections with their intersection data
        const sectionIntersections = new Map()
        
        entries.forEach((entry) => {
          const idx = sectionRefs.current.findIndex(ref => ref === entry.target)
          if (idx !== -1) {
            sectionIntersections.set(idx, {
              isIntersecting: entry.isIntersecting,
              intersectionRatio: entry.intersectionRatio,
              boundingRect: entry.boundingClientRect
            })
          }
        })

        // Find the section with the highest intersection ratio
        let bestSection = 0
        let bestRatio = 0

        sectionIntersections.forEach((data, idx) => {
          if (data.isIntersecting && data.intersectionRatio > bestRatio) {
            bestRatio = data.intersectionRatio
            bestSection = idx
          }
        })

        // If no sections are intersecting, find the closest one based on scroll position
        if (bestRatio === 0) {
          const scrollY = window.scrollY
          let closestSection = 0
          let closestDistance = Infinity

          sectionRefs.current.forEach((ref, idx) => {
            if (ref) {
              const rect = ref.getBoundingClientRect()
              const distance = Math.abs(rect.top)
              if (distance < closestDistance) {
                closestDistance = distance
                closestSection = idx
              }
            }
          })
          bestSection = closestSection
        }

        setCurrentSection(bestSection + 1)
        setActiveScrollSection(sectionList[bestSection].id)
        console.log(`Section changed to: ${bestSection + 1} (${sectionList[bestSection].id}) - Ratio: ${bestRatio.toFixed(2)}`)
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '0px'
      }
    )

    // Observe all sections
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // Add a fallback scroll listener for better reliability
    const handleScroll = () => {
      const scrollY = window.scrollY
      let closestSection = 0
      let closestDistance = Infinity

      sectionRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const distance = Math.abs(rect.top)
          if (distance < closestDistance) {
            closestDistance = distance
            closestSection = idx
          }
        }
      })

      setCurrentSection(closestSection + 1)
      setActiveScrollSection(sectionList[closestSection].id)
    }

    // Throttled scroll listener as fallback
    let scrollTimeout: NodeJS.Timeout
    const throttledScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(handleScroll, 100)
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', throttledScroll)
      clearTimeout(scrollTimeout)
    }
  }, [isLoaded])

 


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        // delayChildren: 0.2,
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
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />

      {/* Desktop Header */}
      <Header/>
      
      {/* Mobile Navbar */}
      <MobileNavbar />
      
      {/* Desktop Sidebar Navigation */}
      <SidebarNav currentSection={currentSection} totalSections={sectionList.length} isLoaded={isLoaded} />
      
      {/* Desktop Sidebars */}
      <SocialSidebar />
      <EmailSidebar />
      
      {/* Main Content */}
      <div className="ml-0 md:ml-20 lg:ml-24 pt-16">
        {sectionList.map(({ id, Component }, idx) => (
          <section
            key={id}
            id={id}
            ref={el => { sectionRefs.current[idx] = el }}
            className="min-h-screen flex items-center justify-center bg-transparent w-full"
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