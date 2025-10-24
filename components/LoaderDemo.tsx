"use client"

import { useState } from "react"
import ProfessionalLoader from "./ProfessionalLoader"

export default function LoaderDemo() {
  const [showLoader, setShowLoader] = useState(false)

  const handleShowLoader = () => {
    setShowLoader(true)
    // Auto-hide after 4 seconds
    setTimeout(() => {
      setShowLoader(false)
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      {showLoader && <ProfessionalLoader />}
      
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white mb-4">
          Professional Loading Screen Demo
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Click the button below to see the professional loading animation
        </p>
        
        <button
          onClick={handleShowLoader}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Show Loading Screen
        </button>
        
        <div className="mt-12 text-left max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-4">Features:</h2>
          <ul className="text-gray-300 space-y-2">
            <li>• Dark gradient background with subtle pattern</li>
            <li>• Teal progress line with glow effects</li>
            <li>• Circular logo that moves with progress tip</li>
            <li>• User name and title on the left</li>
            <li>• Dynamic percentage display on the right</li>
            <li>• Smooth motion easing and animations</li>
            <li>• Fully responsive design</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
