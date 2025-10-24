"use client"

import { HexSLogo } from "@/icons/icons"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function ProfessionalLoader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate realistic loading progress with specific stages
    const loadingStages = [
      { target: 25, duration: 600 },   // 0-25% in 600ms
      { target: 50, duration: 800 },   // 25-50% in 800ms
      { target: 75, duration: 1000 }, // 50-75% in 1000ms
      { target: 100, duration: 600 }   // 75-100% in 600ms
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at top center, #1a1a2e 0%, #000000 100%)',
      }}
    >
      {/* Main content container */}
      <div className="relative w-full  px-4 sm:px-6 lg:px-8">
        {/* Progress line container */}
        <div className="relative w-full h-0.5 bg-white/10 mb-8 sm:mb-12">
          {/* Progress fill with glow effect */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-teal-500 shadow-lg"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            style={{
              boxShadow: '0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(20, 184, 166, 0.3)',
            }}
          />
          
          {/* Animated Logo that moves with progress */}
          <motion.div
            className="absolute -top-6"
            style={{ 
              left: `${progress}%`,
              transform: 'translateX(-50%)'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className=" bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-xl ">
              {/* <span className="text-white text-sm sm:text-lg font-bold">S</span> */}
              <HexSLogo />
            </div>
          </motion.div>
        </div>

        {/* Content row */}
        <div className="flex items-center justify-between w-full">
          {/* Left side - User info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <motion.span 
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Sumit Patel
            </motion.span>
            <motion.span 
              className="text-xs sm:text-sm font-normal text-teal-300/80 tracking-wider uppercase mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Software Engineer
            </motion.span>
          </motion.div>

          {/* Right side - Percentage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-xl sm:text-2xl font-light text-white"
          >
            <motion.span
              key={Math.round(progress)}
              initial={{ scale: 1.2, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </motion.div>
        </div>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
