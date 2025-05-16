"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X, Home, User, LayoutGrid, FileText, Image as ImageIcon, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HexSLogo } from "@/icons/icons"
import { useTheme } from "next-themes"
import { FloatingDock } from "@/components/ui/floating-dock"
import { GlowingButton } from "./ui/glowing-button"

// navLinks is static, safe for SSR
const navLinks = [
  { name: "Home", url: "/", icon: Home },
  { name: "About", url: "#about", icon: User },
  { name: "Work", url: "#projects", icon: LayoutGrid },
  { name: "Blog", url: "#blog", icon: FileText },
  { name: "Gallery", url: "#gallery", icon: ImageIcon },
]

export default function Header() {
  // All state is client-only, but we must avoid SSR/client mismatch
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"none" | "up" | "down">("none")
  const [scrolledToTop, setScrolledToTop] = useState(true)
  const [mounted, setMounted] = useState(false)
  const prevScrollY = useRef(0)
  const { theme, setTheme } = useTheme()

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
      <header className="fixed top-0 w-full z-40 px-6 sm:px-12 md:px-24 lg:px-12 transition-all duration-300 bg-transparent">
        {/* Optionally, a skeleton or nothing */}
      </header>
    )
  }

  const headerClasses = `fixed top-0 w-full z-40 px-6 sm:px-12 md:px-24 lg:px-12  transition-all duration-300 ${
    scrolledToTop ? "bg-transparent" : "shadow-md"
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
          top: 0; left: -60%;
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
      <nav className="relative flex items-center justify-between h-20 w-full">
        {/* Left: Logo */}
        <motion.div initial="hidden" animate="visible" variants={logoVariants} className="z-50 flex-shrink-0 mt-5 ml-10">
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <HexSLogo size={60} />
          </Link>
        </motion.div>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center mt-5">
          <FloatingDock
            items={navLinks.map(link => ({
              title: link.name,
              icon: <link.icon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
              href: link.url,
            }))}
            desktopClassName={
              theme === "light"
                ? "bg-white/80 border border-blue-200"
                : "bg-navy/80 border border-slate-600"
            }
          />
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-4 p-2 rounded-full hover:bg-slate-700/40 transition-colors border border-transparent focus:border-teal"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Right: Resume Button */}
        <motion.div custom={navLinks.length} initial="hidden" animate="visible" variants={navVariants} className="hidden md:flex flex-shrink-0 mt-5">
          <GlowingButton
            className="shiny-button "
            borderRadius="rounded-full"
          >
            Resume
          </GlowingButton>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial="hidden"
          animate="visible"
          variants={logoVariants}
          className="md:hidden z-50 text-teal"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            x: isMenuOpen ? 0 : "100%",
          }}
          transition={{ duration: 0.3 }}
          className={`fixed top-0 right-0 h-screen w-3/4 bg-light-navy z-40 flex flex-col justify-center items-center ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col space-y-6 items-center">
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.url}
                  className="text-light-slate hover:text-teal font-mono text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-teal block text-center mb-1">0{i + 1}.</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <GlowingButton  className="shiny-button " borderRadius="rounded-full">
              Resume
            </GlowingButton>
          </div>
        </motion.div>
      </nav>
    </header>
  )
}