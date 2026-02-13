"use client"

import Loader from "@/components/loader"
import MainContent from "@/components/main-content"
import ProfessionalLoader from "@/components/ProfessionalLoader"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isContentReady, setIsContentReady] = useState(false)

  useEffect(() => {
    // Preload all content while loader is running
    const preloadContent = async () => {
      // Force render and prepare all components
      setIsContentReady(true)

      // Preload critical images
      const imageUrls = [
        '/app/assets/images/sumit-pic.jpg',
        '/placeholder-logo.png',
        '/placeholder-logo.svg',
        '/placeholder-user.jpg',
        '/placeholder.jpg',
        '/placeholder.svg'
      ]

      // Preload images
      const imagePromises = imageUrls.map(url => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => resolve(true)
          img.onerror = () => resolve(true) // Continue even if image fails
          img.src = url
        })
      })

      // Wait for all images and assets to load
      await Promise.all([
        ...imagePromises,
        new Promise(resolve => {
          if (document.readyState === 'complete') {
            resolve(true)
          } else {
            window.addEventListener('load', () => resolve(true))
          }
        })
      ])
    }

    // Start preloading immediately
    preloadContent()

    // Show loader for the total duration of all loading stages
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <ProfessionalLoader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <MainContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preload content in background hidden */}
      {isLoading && isContentReady && (
        <div className="opacity-0 pointer-events-none absolute inset-0 -z-10">
          <MainContent />
        </div>
      )}
    </main>
  )
}
