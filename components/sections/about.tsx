"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AboutImage from '../../app/assets/images/sumit-pic.jpg'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const allCharsRef = useRef<HTMLElement[]>([])

  const paragraphs = [
    "Hello! I’m Sumit Patel, a passionate Full Stack Developer with 2+ years of professional experience building modern, scalable, and optimized digital solutions. My journey into web development began in 2019 with a simple static e-commerce project during my college days, which sparked my curiosity and set me on a path to creating impactful products on the web.",
    "Over the years, I’ve gained hands-on expertise in crafting ERP ahend CRM systems, developing SEO-friendly websites, and building high-performance e-commerce platforms. I thrive on transforming ideas into robust applications that are not only functional but also efficient and user-friendly.",
    "My core technical toolkit includes React.js, Next.js, TypeScript, Redux, and Socket.io, along with backend experience in Node.js, Express.js, and SQL. I enjoy architecting solutions that blend clean UI/UX with optimized performance and secure, scalable backend systems.",
    "What drives me is continuous learning and the excitement of solving real-world problems through technology. Each project I work on is an opportunity to innovate, refine my skills, and contribute to creating meaningful digital experiences."
  ]

  const skills = [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "Framer Motion",
    "GraphQL",
  ]

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || !textContainerRef.current) return

    const section = sectionRef.current
    const textContainer = textContainerRef.current

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())

    // Prepare text for animation
    const prepareText = () => {
      allCharsRef.current = []
      const paragraphs = textContainer.querySelectorAll('p')
      
      paragraphs.forEach((paragraph) => {
        const text = paragraph.textContent || ''
        const chars = text.split('').map((char) => {
          const span = document.createElement('span')
          span.textContent = char
          span.style.opacity = '0.2'
          span.style.transition = 'opacity 0.1s ease'
          return span
        })
        
        paragraph.innerHTML = ''
        chars.forEach(char => paragraph.appendChild(char))
        allCharsRef.current.push(...chars)
      })
    }

    // Initialize text
    prepareText()

    // Create the main scroll trigger with pinning
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 0%",
      end: "+=300%", // Extended scroll range for animation
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const totalChars = allCharsRef.current.length
        const charsToReveal = Math.floor(progress * totalChars)

        // Reveal characters based on scroll progress
        allCharsRef.current.forEach((char, index) => {
          if (index < charsToReveal) {
            char.style.opacity = '1'
          } else {
            char.style.opacity = '0.2'
          }
        })
      }
    })

    return () => {
      scrollTrigger.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen max-w-6xl py-20 px-4 md:px-8 section"
    >
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-teal-400">
          <span className="text-teal font-mono text-xl mr-2">01.</span>
          About Me
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div ref={textContainerRef} className="lg:col-span-2 space-y-6">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="text-slate-400 leading-relaxed text-md">
                {para}
              </p>
            ))}

            <div className="mt-8">
                <p className="text-slate-400 mb-4">Here are a few technologies I've been working with recently:</p>
             
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-mono">
                {skills.map((skill, i) => (
                  <li key={i} className="flex items-center text-slate-400">
                    <span className="text-teal-400 mr-3">▹</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative group mx-auto lg:mx-0">
            <div className="relative w-full max-w-[280px] aspect-square">
              <div className="absolute inset-0 border-2 border-teal rounded translate-x-5 translate-y-5 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300 ease-out z-0"></div>
              <div className="absolute inset-0 bg-teal-400/20 rounded z-10 group-hover:bg-transparent transition-all duration-300 ease-out"></div>
              <Image
                src={AboutImage}
                alt="Sumit Patel Profile"
                width={280}
                height={280}
                className="rounded z-20 relative  group-hover:grayscale-0 transition-all duration-300 ease-out object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
