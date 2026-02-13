"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Home, User, Briefcase, Code, Mail, Menu } from "lucide-react"
import Link from "next/link"
import { HexSLogo } from "@/icons/icons"

interface SidebarNavProps {
  currentSection: number
  totalSections: number
  isLoaded: boolean
}

const navItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "projects", icon: Code, label: "Projects" },
  { id: "contact", icon: Mail, label: "Contact" },
]

export default function SidebarNav({ currentSection, totalSections, isLoaded }: SidebarNavProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  const logoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.3,
      },
    },
  }


  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={isLoaded ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sidebar-nav hidden md:flex fixed left-0 top-24 h-[calc(100vh-4rem)] w-20 lg:w-24 bg-black z-30"
    >
      {/* Left Edge Progress Bar */}
      <div className="w-1 h-full bg-gray-800 relative">
        {/* Progress bar starts from first nav item position */}
        <motion.div
          className="w-full bg-teal from-teal-400 to-teal-600"
          style={{
            height: `${scrollProgress}%`,
            marginTop: '30px' // Start from first nav item position (py-6 + mb-8 + menu icon height)
          }}
          initial={{ height: 0 }}
          animate={{ height: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Main Sidebar Content */}
      <div className="flex-1 flex flex-col items-center py-4 md:py-6">
        {/* Menu Icon */}
        {/* <motion.div initial="hidden" animate="visible" variants={logoVariants} className="z-50 flex-shrink-0  mb-5">
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 ">
              <HexSLogo size={40} />
            </div>
          </Link>
        </motion.div> */}

        {/* Navigation Items */}
        <div className="flex flex-col space-y-3 md:space-y-6 flex-1">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative group p-2 md:p-3 rounded-lg transition-all duration-300 ${currentSection === index + 1
                  ? "bg-green-500/15"
                  : "hover:bg-white/5"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon
                className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${currentSection === index + 1 ? "text-teal" : "text-white/60 group-hover:text-white"
                  }`}
              />

              {/* Active indicator line */}
              {currentSection === index + 1 && (
                <motion.div
                  className="absolute -left-2 md:-left-3 top-1/2 -translate-y-1/2 w-0.5 h-4 md:h-6 bg-teal-400 rounded-r-full"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Tooltip - Hidden on mobile, shown on desktop */}
              <div className="hidden md:block absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-black/95 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-white/10 shadow-lg">
                {item.label}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Progress Percentage - Hidden on mobile */}

      </div>
    </motion.div>
  )
}
