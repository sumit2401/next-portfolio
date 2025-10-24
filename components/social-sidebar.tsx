"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"
import Link from "next/link"

export default function SocialSidebar() {
  const socialLinks = [
    { href: "https://github.com", Icon: Github, label: "GitHub" },
    { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
    { href: "https://twitter.com", Icon: Twitter, label: "Twitter" },
    { href: "https://instagram.com", Icon: Instagram, label: "Instagram" }
  ]

  const sidebarVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.8,
        staggerChildren: 0.1,
        delayChildren: 2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="md:fixed bottom-4 left-4  md:bottom-8 md:left-0 z-50"
    >
      <div className="flex flex-row items-center">
        <motion.ul className="flex flex-row items-center space-x-4 md:space-x-6 text-slate-200 before:content-[''] before:block before:w-16 md:before:w-24 before:h-px before:bg-white before:mr-4 md:before:mr-6">
          {socialLinks.map(({ href, Icon, label }) => (
            <motion.li key={label} variants={itemVariants} className="hover:-translate-y-2 transition-all duration-200 hover:scale-110">
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate hover:text-teal transform hover:-translate-y-2 transition-all duration-200 hover:scale-110"
              >
                <Icon size={18} className="md:w-5 md:h-5" />
                <span className="sr-only">{label}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  )
}
