"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const textContainerRef = useRef<HTMLDivElement | null>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  const paragraphs = [
    "Hello! I'm Sumit Patel, and I find joy in crafting and overseeing creations that exist on the vast canvas of the internet. My journey into the realm of web development commenced in 2019, coinciding with the start of my college adventure. It was during this time that I undertook my inaugural college project, a static e-commerce website, which served as a pivotal moment in my learning journey, offering invaluable insights into the intricacies of HTML, CSS and Javascript.",
    "Presently, my focus revolves around the development of a robust e-commerce platform. Leveraging the power of React.js and the Context API, I'm actively shaping a fully functional digital marketplace. The backend of this endeavor is fortified by the seamless capabilities of NodeJs, ExpressJs, and the database is powered by MongoDB, ensuring not only a dynamic user experience but also robust authentication mechanisms.",
    "My dedication to continuous learning and innovation fuels my passion for web development. Each project is an opportunity to refine my skills and contribute to the evolving landscape of the digital world. I'm excited about the limitless possibilities that lie ahead and the chance to create meaningful and impactful solutions.",
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
    if (typeof window === "undefined" || !sectionRef.current) return

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    const section = sectionRef.current
    const textContainer = textContainerRef.current

    if (!textContainer) return

    // Set initial state for all words
    gsap.set(wordRefs.current.filter(Boolean), {
      opacity: 0.2,
      willChange: "opacity",
    })

    // Create timeline for smoother animations with pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%", // Adjust this value to control how long the section stays pinned
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        refreshPriority: -1,
        onUpdate: (self) => {
          const progress = self.progress
          const totalWords = wordRefs.current.filter(Boolean).length
          const wordsToReveal = Math.floor(progress * totalWords)

          // Use requestAnimationFrame for smoother updates
          requestAnimationFrame(() => {
            wordRefs.current.forEach((word, index) => {
              if (word) {
                const shouldReveal = index <= wordsToReveal
                word.style.opacity = shouldReveal ? "1" : "0.2"
              }
            })
          })
        },
        onRefresh: () => {
          // Recalculate on layout changes
        },
      },
    })

    // Initial fade in animation for the section
    gsap.fromTo(
      section.querySelector("div"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      },
    )

    setIsInitialized(true)

    // Cleanup function
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Refresh ScrollTrigger on resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  let wordIndex = 0
  const renderAnimatedText = (text: string) => {
    return text.split(" ").map((word, i) => {
      const idx = wordIndex++
      return (
        <span
          key={idx}
          ref={(el) => {
            wordRefs.current[idx] = el
          }}
          className="inline-block opacity-20 mr-1 transition-opacity duration-200 ease-out"
          style={{ willChange: "opacity" }}
        >
          {word}
        </span>
      )
    })
  }

  // Reset word index before rendering
  wordIndex = 0

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen max-w-6xl py-20 px-4 md:px-8"
      style={{ willChange: "transform" }}
    >
      <div className="opacity-100" style={{ willChange: "opacity, transform" }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-teal-400">
          <span className="text-teal-400 font-mono text-xl mr-2">01.</span>
          About Me
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div ref={textContainerRef} className="lg:col-span-2 space-y-6">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="text-slate-400 leading-relaxed text-lg">
                {renderAnimatedText(para)}
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
              <div className="absolute inset-0 border-2 border-teal-400 rounded translate-x-5 translate-y-5 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300 ease-out z-0"></div>
              <div className="absolute inset-0 bg-teal-400/20 rounded z-10 group-hover:bg-transparent transition-all duration-300 ease-out"></div>
              <Image
                src="/placeholder.svg?height=280&width=280"
                alt="Sumit Patel Profile"
                width={280}
                height={280}
                className="rounded z-20 relative grayscale group-hover:grayscale-0 transition-all duration-300 ease-out object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
