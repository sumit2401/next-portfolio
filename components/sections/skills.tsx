"use client"

import { inView, motion, useInView } from "framer-motion"
import { useRef } from "react"
// import { useInView } from "react-intersection-observer"

const skills = [
  "JavaScript (ES6+)",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Framer Motion",
  "GraphQL",
  "Eleventy",
  "WordPress",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const skillVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.05,
    backgroundColor: "rgba(100, 255, 218, 0.1)",
    transition: {
      duration: 0.2,
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




export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.section
      id="skills"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="section max-w-6xl mx-auto"
    >
      <motion.h2 variants={itemVariants} className="numbered-heading mb-10">
        Skills
      </motion.h2>
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 "
      >
        {skills.map((skill, index) => (
          <motion.li
            key={index}
            variants={skillVariants}
            className="flex items-center text-slate-100 font-mono text-base"
          >
            <span className="text-teal mr-3 text-lg">▸</span>
            <span>{skill}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  )
} 