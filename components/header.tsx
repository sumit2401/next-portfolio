"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { HexSLogo } from "@/icons/icons"
import { GlowingButton } from "./ui/glowing-button"

export default function Header() {
  // All state is client-only, but we must avoid SSR/client mismatch
  const [scrollDirection, setScrollDirection] = useState<"none" | "up" | "down">("none")
  const [scrolledToTop, setScrolledToTop] = useState(true)
  const [mounted, setMounted] = useState(false)
  const prevScrollY = useRef(0)

  // Only run effects after mount to avoid hydration mismatch
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

  // Only render header after mount to avoid SSR/client mismatch
  if (!mounted) {
    return (
      <header className="hidden md:block fixed top-0 w-full z-40 px-6 sm:px-12 md:px-24 lg:px-12 transition-all duration-300 bg-transparent">
        {/* Optionally, a skeleton or nothing */}
      </header>
    )
  }

  const headerClasses = `fixed top-0 left-0 right-0 w-full z-50 px-4 sm:px-6 md:px-6   transition-all duration-300 ${
    scrolledToTop ? "bg-transparent" : "bg-black/90 backdrop-blur-sm shadow-lg"
  } ${scrollDirection === "down" && !scrolledToTop ? "-translate-y-full" : "translate-y-0"}`

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.3,
      },
    }),
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

  // Add shiny button styles
  const shinyButtonStyles = `
    relative overflow-hidden
    before:absolute before:inset-0
    before:translate-x-[-150%] before:skew-x-[-45deg]
    before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
    before:animate-shine
  `

  return (
    <header className={headerClasses}>
      <style jsx global>{`
        @keyframes shine {
          100% {
            transform: translateX(150%) skewX(-45deg);
          }
        }
        .animate-shine {
          animation: shine 5s infinite;
        }
        .shiny-button {
          position: relative;
          overflow: hidden;
        }

        .shiny-button::before {
          content: "";
          position: absolute;
          top: 0; left: -20%;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.7) 45%,
            rgba(255,255,255,0.95) 50%,
            rgba(255,255,255,0.7) 55%,
            rgba(255,255,255,0) 100%
          );
          filter: blur(2px);
          opacity: 0.3;
          transform: skewX(-24deg);
          animation: shine-move 3s cubic-bezier(0.4,0,0.2,1) infinite;
          pointer-events: none;
        }

        @keyframes shine-move {
          100% {
            left: 120%;
          }
        }
      `}</style>
      <nav className="relative flex justify-between items-center  h-16 w-full">
        {/* Left: Logo */}
        <motion.div initial="hidden" animate="visible" variants={logoVariants} className="z-50 ">
          <Link href="/" className="hover:scale-105 transition-transform">
            <HexSLogo size={60} />
          </Link>
        </motion.div>

        {/* Center: Desktop Navigation - Hidden on large screens */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center">
          {/* Navigation items can be added here if needed */}
        </div>

        {/* Right: Resume Button */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={navVariants} className="flex flex-shrink-1">
          <GlowingButton
            className="shiny-button px-6 py-3 text-sm md:text-base"
            borderRadius="rounded-full"
          >
            Resume
          </GlowingButton>
        </motion.div>
      </nav>
    </header>
  )
}