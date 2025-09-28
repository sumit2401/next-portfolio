"use client"

import GridBackground from "./GridBackground"

export default function GlobalGridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <GridBackground 
        gridSize={80}
        opacity={0.3}
        hoverColor="rgba(20, 184, 166, 0.2)"
        borderColor="rgba(255, 255, 255, 0.02)"
        enableHover={false}
        className="w-full h-full"
      />
    </div>
  )
}
