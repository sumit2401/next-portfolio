"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Folder } from "lucide-react"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
      className="section"
    >
      <motion.h2 variants={itemVariants} className="numbered-heading mb-10">
        Some Things I've Built
      </motion.h2>

      <div className="space-y-24">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className={`relative grid md:grid-cols-12 gap-4 items-center ${i % 2 === 0 ? "" : "md:text-right"}`}
          >
            <div
              className={`md:col-span-7 relative z-10 ${
                i % 2 === 0 ? "md:col-start-6 md:text-right" : "md:col-start-1"
              }`}
            >
              <p className="font-mono text-teal text-sm mb-2">Featured Project</p>
              <h3 className="text-2xl font-semibold text-lightest-slate mb-4">
                <Link href={project.external} className="hover:text-teal transition-colors">
                  {project.title}
                </Link>
              </h3>
              <div className="bg-light-navy p-6 rounded-md shadow-xl mb-4">
                <p className="text-light-slate">{project.description}</p>
              </div>
              <ul
                className={`flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm mb-6 ${
                  i % 2 === 0 ? "md:justify-end" : ""
                }`}
              >
                {project.tech.map((tech, j) => (
                  <li key={j}>{tech}</li>
                ))}
              </ul>
              <div className={`flex gap-4 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                <Link href={project.github} className="text-light-slate hover:text-teal transition-colors">
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href={project.external} className="text-light-slate hover:text-teal transition-colors">
                  <ExternalLink size={20} />
                  <span className="sr-only">External Link</span>
                </Link>
              </div>
            </div>
            <div
              className={`md:col-span-7 relative ${
                i % 2 === 0 ? "md:col-start-1" : "md:col-start-6"
              } md:absolute md:inset-0`}
            >
              <Link href={project.external} className="relative block w-full h-full rounded overflow-hidden">
                <div className="absolute inset-0 bg-teal/50 hover:bg-transparent z-10 transition-colors duration-300"></div>
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

      <motion.h3 variants={itemVariants} className="text-center text-2xl font-semibold text-lightest-slate mt-24 mb-10">
        Other Noteworthy Projects
      </motion.h3>

      <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherProjects.map((project, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-light-navy rounded-md p-6 flex flex-col h-full transition-transform hover:-translate-y-2 duration-200"
          >
            <div className="flex justify-between items-center mb-6">
              <Folder className="text-teal" size={40} />
              <div className="flex gap-4">
                {project.github && (
                  <Link href={project.github} className="text-light-slate hover:text-teal transition-colors">
                    <Github size={20} />
                    <span className="sr-only">GitHub</span>
                  </Link>
                )}
                {project.external && (
                  <Link href={project.external} className="text-light-slate hover:text-teal transition-colors">
                    <ExternalLink size={20} />
                    <span className="sr-only">External Link</span>
                  </Link>
                )}
              </div>
            </div>
            <h4 className="text-xl font-semibold text-lightest-slate mb-2">
              <Link href={project.external || "#"} className="hover:text-teal transition-colors">
                {project.title}
              </Link>
            </h4>
            <p className="text-light-slate mb-6 flex-grow">{project.description}</p>
            <ul className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs">
              {project.tech.map((tech, j) => (
                <li key={j}>{tech}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
