"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import GridBackground from "@/components/GridBackground"
import CSSGridBackground from "@/components/CSSGridBackground"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      id="contact"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="section text-center max-w-2xl mx-auto relative"
    >
      {/* Grid Background */}
      <CSSGridBackground 
        gridSize={50}
        opacity={0.12}
        hoverColor="rgba(20, 184, 166, 0.5)"
        borderColor="rgba(255, 255, 255, 0.08)"
        fullscreen={false}
        glowRadius={2}
        maxGlowBoxes={8}
      />
      <div className="relative z-10">
        <motion.p variants={itemVariants} className="font-mono text-teal mb-4">
          04. What's Next?
        </motion.p>
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-lightest-slate mb-6">
          Get In Touch
        </motion.h2>
        <motion.p variants={itemVariants} className="mb-10">
          Although I'm not currently looking for new opportunities, my inbox is always open. Whether you have a question
          or just want to say hi, I'll try my best to get back to you!
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button variant="outline" size="lg" className="border-teal text-teal hover:bg-teal/10 font-mono">
            Say Hello
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
