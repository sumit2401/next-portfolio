"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface InteractiveFolderProps {
  title?: string
  description?: string
  tech?: string[]
  github?: string
  external?: string
  fileCount?: number
  color?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function InteractiveFolder({
  title = "My Files",
  fileCount = 8,
  color = "blue",
  size = "md",
  className = ""
}: InteractiveFolderProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Size configurations
  const sizeConfig = {
    sm: { folder: "w-12 h-10 sm:w-16 sm:h-12", files: "w-6 h-8 sm:w-8 sm:h-10", text: "text-xs" },
    md: { folder: "w-16 h-12 sm:w-20 sm:h-16", files: "w-8 h-10 sm:w-10 sm:h-12", text: "text-sm" },
    lg: { folder: "w-20 h-16 sm:w-24 sm:h-20", files: "w-10 h-12 sm:w-12 sm:h-14", text: "text-base" }
  }

  // Color configurations
  const colorConfig = {
    blue: {
      folder: "from-blue-500 to-blue-600",
      folderDark: "from-blue-600 to-blue-700",
      files: "from-blue-400 to-blue-500",
      shadow: "shadow-blue-500/20"
    },
    teal: {
      folder: "from-teal-500 to-teal-600",
      folderDark: "from-teal-600 to-teal-700",
      files: "from-teal-400 to-teal-500",
      shadow: "shadow-teal-500/20"
    },
    purple: {
      folder: "from-purple-500 to-purple-600",
      folderDark: "from-purple-600 to-purple-700",
      files: "from-purple-400 to-purple-500",
      shadow: "shadow-purple-500/20"
    },
    green: {
      folder: "from-green-500 to-green-600",
      folderDark: "from-green-600 to-green-700",
      files: "from-green-400 to-green-500",
      shadow: "shadow-green-500/20"
    }
  }

  const config = sizeConfig[size]
  const colors = colorConfig[color as keyof typeof colorConfig] || colorConfig.teal

  // Generate file positions for envelope-style animation
  const generateFilePositions = () => {
    const files = []
    const visibleFiles = Math.min(3, Math.floor(fileCount * 0.4)) // Show fewer files for elegance
    
    for (let i = 0; i < visibleFiles; i++) {
      files.push({
        id: i,
        x: (Math.random() - 0.5) * 1, // Subtle horizontal offset
        y: 8 - (i * 2), // Files slide upward by 50%
        rotation: (Math.random() - 0.5) * 8, // Subtle tilt for realism
        delay: i * 0.15, // Elegant staggered timing
        z: i * 5, // Enhanced depth layering
        scale: 0.9 + (i * 0.05) // Slight size variation
      })
    }
    return files
  }

  const filePositions = generateFilePositions()

  return (
    <div className={`relative ${className}`}>
      {/* Folder Container */}
      <motion.div
        className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        role="button"
        tabIndex={0}
        aria-label={`${title} folder with ${fileCount} files`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsHovered(!isHovered)
          }
        }}
      >
        {/* Files that slide out like letters from an envelope */}
        {filePositions.map((file) => (
          <motion.div
            key={file.id}
            className={`absolute ${config.files} bg-gradient-to-b ${colors.files} rounded-sm shadow-xl border border-white/30`}
            initial={{ 
              opacity: 0,
              y: 0,
              x: 0,
              rotate: 0,
              scale: file.scale,
              z: 0
            }}
            animate={isHovered ? {
              opacity: 1,
              y: file.y,
              x: file.x,
              rotate: file.rotation,
              scale: file.scale,
              z: file.z
            } : {
              opacity: 0,
              y: 0,
              x: 0,
              rotate: 0,
              scale: file.scale,
              z: 0
            }}
            transition={{
              duration: 0.6,
              delay: file.delay,
              ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier for premium feel
            }}
            style={{
              left: "70%",
              top: "70%",
              transform: "translate(-50%, -50%)",
              zIndex: 20 + file.id,
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))"
            }}
          >
            {/* File content lines with enhanced styling */}
            <div className="p-1.5 space-y-0.5">
              <div className="h-0.5 bg-white/40 rounded"></div>
              <div className="h-0.5 bg-white/25 rounded w-4/5"></div>
              <div className="h-0.5 bg-white/25 rounded w-3/5"></div>
              <div className="h-0.5 bg-white/15 rounded w-2/5"></div>
            </div>
          </motion.div>
        ))}

        {/* Main Folder */}
        <motion.div
          className={`relative ${config.folder} bg-gradient-to-b ${colors.folder} rounded-lg shadow-2xl ${colors.shadow}`}
          animate={{
            rotateX: isHovered ? -8 : 0,
            rotateY: isHovered ? 3 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.46, 0.45, 0.94],
            scale: { duration: 0.3 }
          }}
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          {/* Folder Lid - Envelope opening style */}
          <motion.div
            className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${colors.folderDark} rounded-t-lg origin-top`}
            animate={{
              rotateX: isHovered ? -25 : 0,
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{
              transformStyle: "preserve-3d",
              filter: isHovered ? "drop-shadow(0 -2px 8px rgba(0,0,0,0.2))" : "none"
            }}
          >
            {/* Lid highlight with enhanced styling */}
            <div className="absolute top-1 left-1 right-1 h-1 bg-white/25 rounded-t-lg"></div>
            <div className="absolute top-0.5 left-0.5 right-0.5 h-0.5 bg-white/10 rounded-t-lg"></div>
          </motion.div>

          {/* Folder Body */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-b-lg">
            {/* Folder tab */}
            <div className="absolute -top-1 left-2 w-6 h-2 bg-gradient-to-b from-white/25 to-transparent rounded-t"></div>
            
            {/* Subtle file indicators inside folder when closed */}
            {!isHovered && (
              <div className="absolute inset-0 p-1.5">
                <div className="w-full h-1 bg-white/15 rounded-sm mb-0.5"></div>
                <div className="w-4/5 h-1 bg-white/8 rounded-sm mb-0.5"></div>
                <div className="w-3/5 h-1 bg-white/8 rounded-sm"></div>
              </div>
            )}
          </div>

          {/* Enhanced inner shadow for depth */}
          <div className="absolute inset-0 rounded-lg border border-white/15"></div>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-transparent to-black/5"></div>
        </motion.div>

        {/* Enhanced Folder Shadow */}
        <motion.div
          className="absolute -bottom-2 left-1/2 w-4/5 h-3 bg-black/25 rounded-full blur-md"
          animate={{
            scale: isHovered ? 1.15 : 1,
            opacity: isHovered ? 0.4 : 0.25,
            y: isHovered ? 2 : 0
          }}
          transition={{ 
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          style={{ transform: "translateX(-50%)" }}
        />
        
        {/* Additional depth shadow */}
        <motion.div
          className="absolute -bottom-1 left-1/2 w-2/3 h-1 bg-black/15 rounded-full blur-sm"
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.3 : 0.15
          }}
          transition={{ duration: 0.4 }}
          style={{ transform: "translateX(-50%)" }}
        />
      </motion.div>

      {/* Title */}
      {title && (
        <motion.div
          className={`mt-2 text-center ${config.text} font-medium text-gray-700 dark:text-gray-300`}
          animate={{
            y: isHovered ? -2 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.div>
      )}

      {/* File count badge */}
      
    </div>
  )
}
