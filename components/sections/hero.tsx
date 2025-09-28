"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Typewriter from "typewriter-effect"
import { ChevronRight } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { GlowingButton } from "@/components/ui/glowing-button"

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen max-w-6xl py-20 px-4 md:px-8 flex flex-col justify-center section relative"
    >
      {/* Decorative elements */}
      <div className="absolute -z-10 top-1/4 right-0 w-72 h-72 bg-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-1/4 left-0 w-[900px] h-80 bg-purple-500/5 rounded-full blur-3xl"></div>

      <motion.p variants={itemVariants} className="font-mono text-teal mb-5 text-sm md:text-base">
        Hi, my name is
      </motion.p>
      <motion.h1
        variants={itemVariants}
        className="text-5xl sm:text-6xl md:text-7xl font-bold text-lightest-slate mb-4 tracking-tight"
      >
        Sumit Patel
      </motion.h1>
      <motion.div variants={itemVariants} className="h-[80px] md:h-[100px] mb-6 max-w-6xl">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate">
          <span className="inline-block min-w-[30ch]">
            <Typewriter
              options={{
                strings: [
                  "I build things for the web.",
                  "I create digital experiences.",
                  "I develop modern applications.",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 50,
              }}
            />
          </span>
        </h2>
      </motion.div>
      <motion.p variants={itemVariants} className="text-slate max-w-xl mb-12 text-lg leading-relaxed">
        I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences.
        Currently, I'm focused on building accessible, human-centered products.
      </motion.p>
      {/* <motion.div variants={itemVariants} className="relative">
        <GlowingEffect glow borderWidth={2} /> */}
        <motion.div variants={itemVariants}>
          <GlowingButton showArrow={true}>
            Check out my work
          </GlowingButton>
        </motion.div>
      {/* </motion.div> */}

      {/* Animated cursor */}
    
    </motion.section>
  )
}
