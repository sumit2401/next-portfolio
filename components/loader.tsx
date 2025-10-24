"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate realistic loading progress with specific stages
    const loadingStages = [
      { target: 36, duration: 800 },  // 0-36% in 800ms
      { target: 87, duration: 1200 }, // 36-87% in 1200ms  
      { target: 100, duration: 500 }  // 87-100% in 500ms
    ]

    let currentStage = 0
    let startTime = Date.now()
    let startProgress = 0

    const animateProgress = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const stage = loadingStages[currentStage]
      
      if (elapsed >= stage.duration) {
        // Move to next stage
        setProgress(stage.target)
        startProgress = stage.target
        currentStage++
        
        if (currentStage < loadingStages.length) {
          startTime = now
        } else {
          return // Animation complete
        }
      } else {
        // Animate within current stage
        const progressInStage = (elapsed / stage.duration) * (stage.target - startProgress)
        setProgress(Math.min(startProgress + progressInStage, stage.target))
      }
      
      if (currentStage < loadingStages.length) {
        requestAnimationFrame(animateProgress)
      }
    }

    requestAnimationFrame(animateProgress)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      style={{
        background: 'radial-gradient(ellipse at top center, #1a1a2e 0%, #000000 100%)',
      }}
    >
      {/* Background noise texture overlay */}
      {/* <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      /> */}
      
      {/* Main content container */}
      <div className="relative w-full px-8">
        {/* Progress line container - Full width */}
        <div className="relative w-full h-px bg-white/20 mb-8">
          {/* Progress fill */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-teal"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          />
          
          {/* Animated Logo that moves with progress */}
          <motion.div
            className="absolute -top-8"
            style={{ 
              left: `${progress}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">S</span>
            </div>
          </motion.div>
        </div>

        {/* Content row */}
        <div className="flex items-center justify-between w-full">
          {/* Left side - Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <span className="text-2xl font-bold text-teal tracking-tight">
              Sumit Patel
            </span>
            <span className="text-sm font-normal text-teal/80 tracking-wider uppercase">
              Software Engineer
            </span>
          </motion.div>

          {/* Right side - Percentage */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg font-light text-teal"
          >
            {Math.round(progress)}%
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
