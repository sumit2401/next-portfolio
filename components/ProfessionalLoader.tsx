"use client"

import { motion, useSpring, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

export default function ProfessionalLoader() {
  const [progress, setProgress] = useState(0)

  // Create a spring-based progress value for smoother motion
  const springProgress = useSpring(0, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  })

  useEffect(() => {
    // Simulate realistic loading progress with specific stages
    const loadingStages = [
      { target: 25, duration: 600 },
      { target: 50, duration: 800 },
      { target: 75, duration: 1000 },
      { target: 100, duration: 600 }
    ]

    let currentStage = 0
    let startTime = Date.now()
    let startProgressValue = 0

    const animateProgress = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const stage = loadingStages[currentStage]

      if (elapsed >= stage.duration) {
        setProgress(stage.target)
        springProgress.set(stage.target)
        startProgressValue = stage.target
        currentStage++

        if (currentStage < loadingStages.length) {
          startTime = now
        } else {
          return // Animation complete
        }
      } else {
        const progressInStage = (elapsed / stage.duration) * (stage.target - startProgressValue)
        const currentVal = startProgressValue + progressInStage
        setProgress(currentVal)
        springProgress.set(currentVal)
      }

      if (currentStage < loadingStages.length) {
        requestAnimationFrame(animateProgress)
      }
    }

    requestAnimationFrame(animateProgress)
  }, [springProgress])

  const width = useTransform(springProgress, [0, 100], ["0%", "100%"])

  // Number of panels for the disintegrate effect - higher density for a more detailed shatter
  const panels = Array.from({ length: 30 })

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col font-sans overflow-hidden pointer-events-none">
      {/* Disintegration Panels */}
      <div className="absolute inset-0 flex z-[100] pointer-events-none">
        {panels.map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            exit={{
              scaleY: 0,
              transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                // Randomized delays create a more natural, organic disintegrate effect
                delay: Math.random() * 0.4
              }
            }}
            style={{ originY: 0 }} // Reveal only from the top down
            className="flex-1 bg-[#070707]"
          />
        ))}
      </div>

      <motion.div
        exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeInOut" } }}
        className="relative flex-1 flex flex-col justify-end items-end p-8 sm:p-16 z-[101]"
      >
        {/* Top Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] z-50 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
          style={{ width }}
        />

        {/* Large Percentage Text */}
        <div className="flex items-baseline select-none">
          <motion.span
            className="text-[12rem] sm:text-[20rem] md:text-[24rem] leading-none font-medium text-[#222222] tracking-tighter"
          >
            {Math.round(progress)}
          </motion.span>
          <span className="text-[10rem] sm:text-[18rem] md:text-[22rem] leading-none font-medium text-[#7c3aed] tracking-tighter ml-[-0.05em]">
            %
          </span>
        </div>
      </motion.div>

      {/* Background Subtle Grid */}
      <motion.div
        exit={{ opacity: 0 }}
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-[99]"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: `100px 100px`
          }}
        />
      </motion.div>
    </div>
  )
}
