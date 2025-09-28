"use client"

import { useState, useMemo } from "react"

interface CSSGridBackgroundProps {
  className?: string
  gridSize?: number
  opacity?: number
  hoverColor?: string
  borderColor?: string
  fullscreen?: boolean
  glowRadius?: number
  maxGlowBoxes?: number
}

export default function CSSGridBackground({ 
  className = "",
  gridSize = 50,
  opacity = 0.1,
  hoverColor = "#1A2028",
  borderColor = "#1A2028",
  fullscreen = false,
  glowRadius = 0,
  maxGlowBoxes = 8
}: CSSGridBackgroundProps) {
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null)
  const [glowBoxes, setGlowBoxes] = useState<Array<{ x: number; y: number; intensity: number }>>([])

  // Generate connected cluster of glow boxes around the cursor
  const generateGlowBoxes = useMemo(() => {
    return (centerX: number, centerY: number) => {
      const boxes: Array<{ x: number; y: number; intensity: number }> = []
      const usedPositions = new Set<string>()
      const queue: Array<{ x: number; y: number; distance: number }> = []
      
      // Start with the center box
      boxes.push({
        x: centerX,
        y: centerY,
        intensity: 1.0
      })
      usedPositions.add(`${centerX},${centerY}`)
      queue.push({ x: centerX, y: centerY, distance: 0 })
      
      // Generate connected cluster using guaranteed expansion
      while (queue.length > 0 && boxes.length < maxGlowBoxes) {
        const current = queue.shift()!
        const distance = current.distance
        
        if (distance < glowRadius) {
          // Get all 8 neighbors
          const neighbors = [
            { x: current.x - 1, y: current.y },     // left
            { x: current.x + 1, y: current.y },     // right
            { x: current.x, y: current.y - 1 },     // up
            { x: current.x, y: current.y + 1 },     // down
            { x: current.x - 1, y: current.y - 1 }, // up-left
            { x: current.x + 1, y: current.y - 1 }, // up-right
            { x: current.x - 1, y: current.y + 1 }, // down-left
            { x: current.x + 1, y: current.y + 1 }  // down-right
          ]
          
          // Process neighbors in random order for organic feel
          const shuffledNeighbors = [...neighbors].sort(() => Math.random() - 0.5)
          
          for (const neighbor of shuffledNeighbors) {
            const key = `${neighbor.x},${neighbor.y}`
            if (!usedPositions.has(key)) {
              usedPositions.add(key)
              
              // High probability for connected growth (85% chance)
              const probability = 0.85
              
              if (Math.random() < probability) {
                const actualDistance = Math.sqrt(
                  (neighbor.x - centerX) ** 2 + (neighbor.y - centerY) ** 2
                )
                const intensity = Math.max(0.6, 1 - (actualDistance / (glowRadius + 1)))
                
                boxes.push({
                  x: neighbor.x,
                  y: neighbor.y,
                  intensity: intensity
                })
                
                // Add to queue for further expansion
                queue.push({ x: neighbor.x, y: neighbor.y, distance: distance + 1 })
              }
            }
          }
        }
      }
      
      return boxes
    }
  }, [glowRadius, maxGlowBoxes])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const cellX = Math.floor(x / gridSize)
    const cellY = Math.floor(y / gridSize)
    
    setHoveredCell({ x: cellX, y: cellY })
    
    // Generate random glow boxes around the cursor
    const newGlowBoxes = generateGlowBoxes(cellX, cellY)
    setGlowBoxes(newGlowBoxes)
  }

  const handleMouseLeave = () => {
    setHoveredCell(null)
    setGlowBoxes([])
  }

  return (
    <div
      className={`${fullscreen ? 'fixed inset-0' : 'absolute inset-0'} pointer-events-auto ${className}`}
      style={{
        zIndex: 1,
        backgroundImage: `
          linear-gradient(${borderColor} 1px, transparent 1px),
          linear-gradient(90deg, ${borderColor} 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        opacity: opacity,
        backgroundPosition: '0 0'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Multiple glow boxes effect */}
      {glowBoxes.map((box, index) => (
        <div
          key={index}
          className="absolute border-2 transition-all duration-300"
          style={{
            left: box.x * gridSize,
            top: box.y * gridSize,
            width: gridSize,
            height: gridSize,
            borderColor: hoverColor,
            boxShadow: `0 0 ${8 + box.intensity * 12}px ${hoverColor}`,
            opacity: box.intensity,
            zIndex: 2,
            transform: `scale(${0.8 + box.intensity * 0.4})`
          }}
        />
      ))}
    </div>
  )
}
