"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  }

  const featuredProjects = [
    {
      title: "Featured Project One",
      description:
        "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
      tech: ["React", "Node.js", "Express", "Spotify API"],
      github: "#",
      external: "#",
      image: "/placeholder.svg?height=400&width=700",
    },
    {
      title: "Featured Project Two",
      description:
        "A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm.",
      tech: ["VS Code", "Sublime Text", "Atom", "iTerm2", "Hyper"],
      github: "#",
      external: "#",
      image: "/placeholder.svg?height=400&width=700",
    },
    {
      title: "Featured Project Three",
      description:
        "A nicer look at your GitHub profile and repository stats with data visualizations of your top languages and stars. Sort through your top repos by number of stars, size, or most recently pushed to. Share them with the community or keep them to yourself.",
      tech: ["Next.js", "Chart.js", "GitHub API"],
      github: "#",
      external: "#",
      image: "/placeholder.svg?height=400&width=700",
    },
  ]

  const otherProjects = [
    {
      title: "Time to Have More Fun",
      description:
        "A single page web app for helping me choose where to travel, built with Next.js, Firebase, and Tailwind CSS",
      tech: ["Next.js", "Firebase", "Tailwind CSS"],
      github: "#",
      external: "#",
    },
    {
      title: "Building a Headless Mobile App CMS",
      description: "Find out how we built a custom headless CMS with Node, Express, and Firebase for a mobile app",
      tech: ["Node", "Express", "Firebase", "Vue"],
      github: "#",
      external: "#",
    },
    {
      title: "OctoProfile",
      description: "A nicer look at your GitHub profile and repo stats",
      tech: ["Next.js", "Chart.js", "GitHub API"],
      github: "#",
      external: "#",
    },
    {
      title: "Spotify Profile",
      description: "A web app for visualizing personalized Spotify data",
      tech: ["React", "Spotify API", "Styled Components"],
      github: "#",
      external: "#",
    },
    {
      title: "Course Curriculum",
      description: "Interactive learning platform for students to learn web development",
      tech: ["React", "Node.js", "MongoDB"],
      github: "#",
      external: "#",
    },
    {
      title: "Weather App",
      description: "A minimal weather app built with React and the OpenWeather API",
      tech: ["React", "OpenWeather API", "Tailwind CSS"],
      github: "#",
      external: "#",
    },
  ]

  return (
    <motion.section
      id="projects"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative min-h-screen w-full max-w-6xl mx-auto py-20 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl -z-10"></div>

      <motion.h2 variants={itemVariants} className="numbered-heading mb-16 md:mb-20">
        Some Things I've Built
      </motion.h2>

      <div className="space-y-16 md:space-y-24">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className={`relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center ${i % 2 === 0 ? "" : "md:text-right"}`}
          >
            <div
              className={`md:col-span-7 relative z-10 ${
                i % 2 === 0 ? "md:col-start-6 md:text-right" : "md:col-start-1 md:text-left"
              }`}
            >
              <p className="font-mono text-teal text-xs sm:text-sm mb-2">Featured Project</p>
              <h3 className="text-xl sm:text-2xl font-semibold text-lightest-slate mb-4">
                <Link href={project.external} className="hover:text-teal transition-colors">
                  {project.title}
                </Link>
              </h3>
              <div className="bg-light-navy p-2 sm:p-6 rounded-md shadow-xl mb-4">
                <p className="text-light-slate text-sm sm:text-base">{project.description}</p>
              </div>
              <ul
                className={`flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs sm:text-sm mb-6 ${
                  i % 2 === 0 ? "md:justify-end" : ""
                }`}
              >
                {project.tech.map((tech, j) => (
                  <li key={j}>{tech}</li>
                ))}
              </ul>
              <div className={`flex gap-4 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                <Link href={project.github} className="text-light-slate hover:text-teal transition-colors">
                  <Github size={18} className="sm:w-5 sm:h-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href={project.external} className="text-light-slate hover:text-teal transition-colors">
                  <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                  <span className="sr-only">External Link</span>
                </Link>
              </div>
            </div>
            <div
              className={`md:col-span-7 relative order-first md:order-none ${
                i % 2 === 0 ? "md:col-start-1" : "md:col-start-6"
              } md:absolute md:inset-0`}
            >
              <Link href={project.external} className="relative block w-full h-48 sm:h-64 md:h-full rounded overflow-hidden">
                <div className="absolute inset-0 bg-teal/50 hover:bg-transparent z-20 transition-colors duration-300"></div>
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={700}
                  height={400}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Other Projects Section */}
      <motion.div variants={itemVariants}>
        <motion.h3
          variants={itemVariants}
          className="text-center text-2xl sm:text-3xl font-bold text-lightest-slate mb-12 md:mb-16"
        >
          Other Noteworthy Projects
        </motion.h3>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {otherProjects.map((project, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={project.external}
                className="relative block h-full p-6 bg-light-navy/30 backdrop-blur-sm rounded-lg border border-lightest-navy/20 hover:border-teal/50 transition-all duration-500 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Header */}
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Github className="w-8 h-8 text-teal mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="text-xl font-bold text-lightest-slate mb-2 group-hover:text-teal transition-colors duration-300">
                      {project.title}
                    </h4>
                  </div>
                  <ExternalLink className="w-5 h-5 text-light-slate group-hover:text-teal opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 translate-y-0 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                {/* Description */}
                <p className="relative z-10 text-sm text-light-slate mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="relative z-10 flex flex-wrap gap-2">
                  {project.tech.map((tech, j) => (
                    <span
                      key={j}
                      className="text-xs font-mono text-slate px-2 py-1 rounded border border-lightest-navy/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
