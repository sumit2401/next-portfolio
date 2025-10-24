"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function EmailSidebar() {
  const sidebarVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.8,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="md:fixed bottom-0 right-4 md:right-12 hidden md:block"
    >
      <div className="flex flex-col items-center space-y-6 after:content-[''] after:block after:w-px after:h-24 after:bg-slate after:mt-12">
        <Link
          href="mailto:sp1440793@gmail.com"
          className="font-mono text-slate hover:text-teal transform hover:-translate-y-1 transition-all duration-200 [writing-mode:vertical-rl] text-sm"
        >
          sp1440793@gmail.com
        </Link>
      </div>
    </motion.div>
  )
}
