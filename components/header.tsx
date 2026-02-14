"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { GlowingButton } from "./ui/glowing-button"
import NavigationDrawer from "./navigation-drawer"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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
  const [mounted, setMounted] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const resumeRef = useRef<HTMLDivElement>(null)
  // Removed hamburgerRef since we'll control it via state/framer

  useEffect(() => {
    setMounted(true)

    // Add scroll listener for binary state
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // Check initial position
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const ctx = gsap.context(() => {
      // MASTER HEADER TRANSITION - Background only
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "+=200", // Complete transition in 200px of scroll
          scrub: true, // Use true for immediate response
          invalidateOnRefresh: true,
        }
      })

      // Background & Height - More compact
      headerTl.to(headerRef.current, {
        height: 70,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        duration: 1,
        ease: "power2.inOut"
      }, 0)

      // Logo - Complete fade out
      headerTl.to(logoRef.current, {
        opacity: 0,
        y: -40,
        scale: 0.5,
        duration: 0.6,
        ease: "power2.inOut"
      }, 0)

      // Resume button - Scale down more
      headerTl.to(resumeRef.current, {
        opacity: 0.7,
        scale: 0.85,
        duration: 0.6,
        ease: "power2.inOut"
      }, 0)

      // Removed NavLinks and Hamburger animations from GSAP to handle via State

    }, headerRef)

    return () => ctx.revert()
  }, [mounted])

  if (!mounted) {
    return (
      <header className="fixed top-0 w-full z-40 px-6 h-20 bg-transparent" />
    )
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 w-full z-50 px-6 md:px-12 flex items-center h-28 md:h-40 bg-transparent transition-all duration-500"
        style={{ willChange: "height, background-color, border-bottom, backdrop-filter" }}
      >
        <nav className="w-full flex justify-between items-center relative">
          {/* Left Side: Navigation Links / Hamburger Switch */}
          <div className="flex items-center min-w-[150px] relative h-full">

            {/* Desktop: Switch between Nav Links and Hamburger */}
            <div className="hidden md:block relative">
              <AnimatePresence mode="wait">
                {!isScrolled ? (
                  <motion.div
                    key="nav-links"
                    className="flex flex-col gap-1 text-[11px] font-bold tracking-[0.2em] uppercase text-white/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RollingLink href="#about" text="About" className="hover:text-white transition-colors" />
                    <RollingLink href="#experience" text="Experience" className="hover:text-white transition-colors" />
                    <RollingLink href="#projects" text="Projects" className="hover:text-white transition-colors" />
                    <RollingLink href="#contact" text="Contact" className="hover:text-white transition-colors" />
                  </motion.div>
                ) : (
                  <motion.button
                    key="hamburger"
                    onClick={() => setIsDrawerOpen(true)}
                    className="flex group flex-col gap-[8px] p-3 -ml-3 hover:bg-white/5 rounded-lg transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-9 h-[2.5px] bg-white/90 transition-all duration-500 ease-out group-hover:w-12 group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
                    <div className="w-6 h-[2.5px] bg-[#7c3aed]/80 transition-all duration-500 ease-out group-hover:w-12 group-hover:bg-[#7c3aed] group-hover:shadow-[0_0_12px_rgba(124,58,237,0.8)]" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile always visible */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden group flex flex-col gap-[8px] p-2 hover:bg-white/5 rounded-lg transition-all duration-300"
            >
              <div className="w-9 h-[2.5px] bg-white/90 transition-all duration-500 ease-out group-hover:w-11 group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
              <div className="w-6 h-[2.5px] bg-[#7c3aed]/80 transition-all duration-500 ease-out group-hover:w-11 group-hover:bg-[#7c3aed] group-hover:shadow-[0_0_12px_rgba(124,58,237,0.8)]" />
            </button>
          </div>

          {/* Middle: Sumit in Hindi - Hides on scroll */}
          <div ref={logoRef} className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none md:pointer-events-auto">
            <Link href="/" className="text-5xl md:text-7xl font-black text-white hover:text-[#7c3aed] transition-colors duration-500 tracking-tighter">
              सुमित
            </Link>
          </div>

          {/* Right Side: Resume */}
          <div ref={resumeRef} className="flex items-center justify-end min-w-[150px]">
            <GlowingButton
              className="px-6 py-2.5 text-xs md:text-sm font-bold"
              borderRadius="rounded-full"
            >
              <RollingLink href="/resume" text="Resume" className="text-white group-hover:text-white" />
            </GlowingButton>
          </div>
        </nav>
      </header>

      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  )
}