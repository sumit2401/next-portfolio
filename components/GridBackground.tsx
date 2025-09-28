"use client"

import { useEffect, useRef, useState } from "react"

interface GridBackgroundProps {
  className?: string
  gridSize?: number
  opacity?: number
  hoverColor?: string
  borderColor?: string
  enableHover?: boolean
}

export default function GridBackground({ 
  className = "",
  gridSize = 50,
  opacity = 0.1,
  hoverColor = "rgba(20, 184, 166, 0.3)",
  borderColor = "rgba(255, 255, 255, 0.1)",
  enableHover = true
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.log("Canvas not found")
      return
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      console.log("Canvas context not found")
      return
    }

    console.log("GridBackground: Initializing canvas")

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      console.log("Canvas rect:", rect)
      
      // Set canvas size
      canvas.width = rect.width
      canvas.height = rect.height
      
      // Set device pixel ratio for crisp lines
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
      
      console.log("Canvas resized to:", rect.width, "x", rect.height)
    }

    const drawGrid = () => {
      const rect = canvas.getBoundingClientRect()
      console.log("Drawing grid on canvas:", rect.width, "x", rect.height)
      
      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height)
      
      // Set grid properties
      ctx.strokeStyle = borderColor
      ctx.lineWidth = 1
      ctx.globalAlpha = opacity
      ctx.shadowBlur = 0

      console.log("Grid properties:", { gridSize, opacity, borderColor })

      // Draw vertical lines
      for (let x = 0; x <= rect.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, rect.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y <= rect.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(rect.width, y)
        ctx.stroke()
      }

      // Draw hover effect if mouse is over canvas
      if (enableHover && mousePos.x >= 0 && mousePos.y >= 0) {
        const gridX = Math.floor(mousePos.x / gridSize) * gridSize
        const gridY = Math.floor(mousePos.y / gridSize) * gridSize
        
        ctx.globalAlpha = 0.8
        ctx.strokeStyle = hoverColor
        ctx.lineWidth = 2
        
        // Draw the hovered cell border
        ctx.beginPath()
        ctx.rect(gridX, gridY, gridSize, gridSize)
        ctx.stroke()
        
        // Add a subtle glow effect
        ctx.shadowColor = hoverColor
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.shadowBlur = 0
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableHover) return
      
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      setMousePos({ x, y })
    }

    const handleMouseLeave = () => {
      setMousePos({ x: -1, y: -1 })
    }

    // Initialize
    resizeCanvas()
    drawGrid()

    // Add event listeners
    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [gridSize, opacity, hoverColor, borderColor, enableHover, mousePos])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      style={{ 
        zIndex: 1,
        background: 'transparent'
      }}
    />
  )
}
