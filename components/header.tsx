"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { GlowingButton } from "./ui/glowing-button"

interface RollingLinkProps {
  href: string;
  text: string;
  className?: string;
}

const RollingLink = ({ href, text, className = "" }: RollingLinkProps) => {
  return (
    <Link href={href} className={`group relative overflow-hidden block ${className}`}>
      <motion.div
        className="relative"
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      >
        {/* Original Text */}
        <div className="group-hover:-translate-y-full transition-transform duration-500 ease-[0.33,1,0.68,1]">
          <span className="block h-full">{text}</span>
        </div>
        {/* Rolling Duplicate */}
        <div className="absolute top-0 left-0 transition-transform duration-500 ease-[0.33,1,0.68,1] translate-y-full group-hover:translate-y-0 text-[#7c3aed]">
          <span className="block h-full">{text}</span>
        </div>
      </motion.div>
    </Link>
  );
};

export default function Header() {
  const [scrollDirection, setScrollDirection] = useState<"none" | "up" | "down">("none")
  const [scrolledToTop, setScrolledToTop] = useState(true)
  const [mounted, setMounted] = useState(false)
  const prevScrollY = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > prevScrollY.current ? "down" : "up"

      if (currentScrollY < 50) {
        setScrolledToTop(true)
      } else {
        setScrolledToTop(false)
      }

      if (Math.abs(currentScrollY - prevScrollY.current) > 10) {
        setScrollDirection(direction)
      }

      prevScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  if (!mounted) {
    return (
      <header className="fixed top-0 w-full z-40 px-6 h-20 transition-all duration-300 bg-transparent" />
    )
  }

  const headerClasses = `fixed top-0 left-0 right-0 w-full z-50 px-6 md:px-12 transition-all duration-300 h-20 flex items-center ${scrolledToTop ? "bg-transparent" : "bg-black/80 backdrop-blur-md border-b border-white/10"
    } ${scrollDirection === "down" && !scrolledToTop ? "-translate-y-full" : "translate-y-0"}`

  return (
    <header className={headerClasses}>
      <nav className="w-full flex justify-between items-start pt-12 text-sm font-medium tracking-wide uppercase">
        {/* Left Side: Navigation Links in Column */}
        <div className="flex flex-col gap-3 items-start text-white/70 mt-10">
          <RollingLink href="#about" text="About" className="hover:text-white" />
          <RollingLink href="#experience" text="Experience" className="hover:text-white" />
          <RollingLink href="#projects" text="Projects" className="hover:text-white" />
          <RollingLink href="#contact" text="Contact" className="hover:text-white" />
        </div>

        {/* Middle: Sumit in Hindi */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pt-10">
          <Link href="/" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white hover:text-[#7c3aed] transition-colors duration-300">
            सुमित
          </Link>
        </div>

        {/* Right Side: Resume */}
        <div className="flex items-center">
          <GlowingButton
            className="shiny-button px-6 py-3 text-sm md:text-base"
            borderRadius="rounded-full"
          >
            <RollingLink href="/resume" text="Resume" className="text-white group-hover:text-white" />
          </GlowingButton>


        </div>
      </nav>
    </header>
  )
}