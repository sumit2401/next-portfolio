"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'

interface ProjectEnvelopeProps {
  title: string
  description: string
  tech: string[]
  github?: string
  external?: string
}

const ProjectEnvelope: React.FC<ProjectEnvelopeProps> = ({
  title,
  description,
  tech,
  github,
  external,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="">
      {/* Main Folder Container */}
      <div
        className=" w-full h-56  cursor-pointer transition-all duration-500 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Clean Folder Design */}
        <div className="relative w-full h-full">
          {/* Folder Tab */}
          <div 
            className={`absolute top-8 bg-light-navy   rounded-tr-full left-8 w-20 h-8 transition-all duration-700 ease-out ${
              isHovered ? 'translate-y-1 rotate-2' : ''
            }`}
           style={{borderTopLeftRadius:"0px",borderBottomLeftRadius:"30px"}}
            
          >
           <div className="absolute w-full h-full rounded-tr-full bg-light-navy top-4 left-5 " />
          </div>
          
          {/* Main Folder Body */}
          <div 
            className={`absolute top-16 left-8 w-64 bg-light-navy h-36 rounded-b-lg rounded-tr-lg transition-all duration-700 ease-out ${
              isHovered ? 'border-[hsl(var(--folder-hover))]' : ''
            }`}
           
          >
          </div>
        </div>
        
        {/* Emerging Content */}
        <div 
          className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-72 h-44 transition-all duration-700 ease-out ${
            isHovered 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-16 opacity-0 scale-90'
          }`}
        >
          <div className="relative w-full h-full group/content">
            {/* Content Container - Clean style */}
            <div 
              className="w-full h-full rounded-xl overflow-hidden shadow-[var(--shadow-image)] border-2 bg-card transition-all duration-500 group-hover/content:shadow-[var(--shadow-subtle)] p-6 flex flex-col"
              style={{ borderColor: 'hsl(var(--folder-outline))' }}
            >
              {/* Header with links */}
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-lightest-slate">
                  <Link href={external || "#"} className="hover:text-teal transition-colors">
                    {title}
                  </Link>
                </h4>
                <div className="flex gap-3">
                  {github && (
                    <Link href={github} className="text-light-slate hover:text-teal transition-colors">
                      <Github size={18} />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  )}
                  {external && (
                    <Link href={external} className="text-light-slate hover:text-teal transition-colors">
                      <ExternalLink size={18} />
                      <span className="sr-only">External Link</span>
                    </Link>
                  )}
                </div>
              </div>
              
              {/* Description */}
              <p className="text-light-slate text-sm mb-4 flex-grow">{description}</p>
              
              {/* Tech stack */}
              <ul className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs">
                {tech.map((techItem, index) => (
                  <li key={index} className="text-teal">{techItem}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectEnvelope
