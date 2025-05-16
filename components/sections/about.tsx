"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import abountImage from "../../app/assets/images/sumit-pic.jpg"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

export default function About() {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [wordsRevealed, setWordsRevealed] = useState(false)

  // Paragraphs to animate
  const paragraphs = [
    "Hello! I'm Sumit Patel, and I find joy in crafting and overseeing creations that exist on the vast canvas of the internet. My journey into the realm of web development commenced in 2019, coinciding with the start of my college adventure. It was during this time that I undertook my inaugural college project, a static e-commerce website, which served as a pivotal moment in my learning journey, offering invaluable insights into the intricacies of HTML, CSS and Javascript.",
    "Presently, my focus revolves around the development of a robust e-commerce platform. Leveraging the power of React.js and the Context API, I'm actively shaping a fully functional digital marketplace. The backend of this endeavor is fortified by the seamless capabilities of NodeJs, ExpressJs, and the database is powered by MongoDB, ensuring not only a dynamic user experience but also robust authentication mechanisms.",
    "My dedication to continuous learning and innovation fuels my passion for web development. Each project is an opportunity to refine my skills and contribute to the evolving landscape of the digital world. I'm excited about the limitless possibilities that lie ahead and the chance to create meaningful and impactful solutions.",
  ]

  // Flatten all words for easier indexing
  const allWords = paragraphs.flatMap(p => p.split(" "))

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
      
      // Set all words to initial opacity 0.1
      wordRefs.current.forEach(word => {
        if (word) word.style.opacity = "0.1"
      })
      
      const section = ref.current
      if (!section) return
      
      // Calculate total words for more precise end timing
      const totalWords = wordRefs.current.length
      
      // Create a scroll trigger that pins the section in place during word reveal
      const wordsTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top", // Start when the section hits the top of viewport
        end: "+=200%", // Shorter end point to avoid excessive pinning
        pin: true, // Pin the section in place
        pinSpacing: true,
        anticipatePin: 1, // Helps with smoother pinning
        scrub: 0.3, // More precise scrubbing for word reveal
        onUpdate: self => {
          const progress = self.progress // 0 to 1
          
          // Calculate how many words should be revealed based on scroll progress
          const revealCount = Math.ceil(progress * totalWords)
          
          wordRefs.current.forEach((word, i) => {
            if (word) {
              // Words appear one by one based on scroll progress
              word.style.opacity = i < revealCount ? "1" : "0.1"
            }
          })
          
          // Update the state when all words are revealed
          if (progress >= 0.99 && !wordsRevealed) {
            setWordsRevealed(true)
          } else if (progress < 0.99 && wordsRevealed) {
            setWordsRevealed(false)
          }
        },
        markers: false // Set to true during development to visualize the trigger points
      })
      
      return () => {
        wordsTrigger.kill()
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    }
  }, [allWords.length, wordsRevealed])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

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

  // Helper to split text into word spans and collect refs
  let wordIndex = 0
  const renderAnimatedText = (text: string) => {
    return text.split(" ").map((word, i) => {
      const idx = wordIndex++
      return (
        <span
          key={idx}
          ref={el => {
            wordRefs.current[idx] = el
          }}
          className="inline-block opacity-10 transition-opacity duration-300 ease-in-out mr-1"
        >
          {word}
        </span>
      )
    })
  }

  wordIndex = 0 // reset before rendering

  return (
    <motion.section
      id="about"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="section"
    >
      <motion.h2 variants={itemVariants} className="numbered-heading mb-10">
        About Me
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <motion.div variants={itemVariants} className="md:col-span-2 space-y-4">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="leading-relaxed">
              {renderAnimatedText(para)}
            </p>
          ))}
         
          {/*
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
            {skills.map((skill, i) => (
              <motion.li key={i} variants={itemVariants} className="flex items-center font-mono text-sm">
                <span className="text-teal mr-2">▹</span>
                {skill}
              </motion.li>
            ))}
          </ul> */}
        </motion.div>

        <motion.div variants={itemVariants} className="relative group">
          <div className="relative w-full max-w-[300px] mx-auto aspect-square">
            <div className="absolute inset-0 border-2 border-teal rounded translate-x-5 translate-y-5 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300 z-0"></div>
            <div className="absolute inset-0 bg-teal/20 rounded z-10 group-hover:bg-transparent transition-colors duration-300"></div>
            <Image
              src={abountImage}
              alt="Profile"
              width={300}
              height={300}
              className="rounded z-[5] relative grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}