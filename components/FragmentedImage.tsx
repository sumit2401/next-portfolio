"use client"

import { useRef, useEffect } from "react"
import Image, { StaticImageData } from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface FragmentedImageProps {
  src: StaticImageData
  alt: string
  width?: number
  height?: number
  className?: string
  triggerStart?: string
  triggerEnd?: string
}

export default function FragmentedImage({ 
  src, 
  alt, 
  width = 300, 
  height = 300, 
  className = "",
  triggerStart = "top 80%",
  triggerEnd = "top 20%"
}: FragmentedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const fragmentsRef = useRef<HTMLDivElement[]>([])
  const maskId = useRef(`mask-${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    const container = containerRef.current
    const fragments = fragmentsRef.current

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())

    // Create ScrollTrigger for size animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: triggerStart,
      end: triggerEnd,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const scale = 1 + (progress * 0.4) // Scale from 1 to 1.4
        
        // Animate each fragment with slight delay
        fragments.forEach((fragment, index) => {
          if (fragment) {
            gsap.set(fragment, {
              scale: scale,
              transformOrigin: "center center"
            })
          }
        })
      }
    })

    return () => {
      scrollTrigger.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [triggerStart, triggerEnd])


  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ width, height }}>
      {/* SVG mask definition */}
      <svg width="0" height="0" style={{ position: 'absolute', top:0, bottom:0, background:"#000" }}>
        <defs>
          <mask id={maskId.current}>
            <rect width="100%" height="100%" fill="white" />
            {/* Transparent cutouts - circles and rounded rectangles */}
            <circle cx="20%" cy="20%" r="8%" fill="black" />
            <rect x="42%" y="12%" width="16%" height="8%" rx="4" ry="4" fill="black" />
            <circle cx="80%" cy="20%" r="8%" fill="black" />
            <rect x="12%" y="42%" width="8%" height="16%" rx="4" ry="4" fill="black" />
            <circle cx="50%" cy="50%" r="10%" fill="black" />
            <rect x="80%" y="42%" width="8%" height="16%" rx="4" ry="4" fill="black" />
            <rect x="12%" y="80%" width="16%" height="8%" rx="4" ry="4" fill="black" />
            <circle cx="50%" cy="80%" r="8%" fill="black" />
            <rect x="80%" y="80%" width="16%" height="8%" rx="4" ry="4" fill="black" />
          </mask>
        </defs>
      </svg>

      {/* Main portrait image */}
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* White overlay with mask applied */}
      <div 
        className="absolute inset-0 bg-white"
        style={{
          mask: `url(#${maskId.current})`,
          WebkitMask: `url(#${maskId.current})`
        }}
      />
    </div>
  )
}
