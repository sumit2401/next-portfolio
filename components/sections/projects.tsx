"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Spotify Analytics",
    category: "Web Application",
    description: "A deep dive into your musical habits. Visualizing personalized Spotify data with high-end charts and insights.",
    tech: ["React", "Node.js", "Spotify API", "D3.js"],
    image: "/placeholder.svg?height=800&width=1200",
    color: "#1DB954"
  },
  {
    title: "Vesper Theme",
    category: "UI Design / DevOps",
    description: "A minimal, high-contrast dark theme for modern developers. Optimized for visual clarity and focus.",
    tech: ["TypeScript", "CSS", "VS Code API"],
    image: "/placeholder.svg?height=800&width=1200",
    color: "#7c3aed"
  },
  {
    title: "GitHub Pulse",
    category: "Data Visualization",
    description: "A beautiful lens into your development activity. Real-time visualization of GitHub contributions and repository impact.",
    tech: ["Next.js", "Three.js", "GitHub API"],
    image: "/placeholder.svg?height=800&width=1200",
    color: "#4f46e5"
  }
]

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card") as HTMLElement[];

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 15%",
          endTrigger: containerRef.current,
          end: "bottom 85%",
          scrub: true,
          onUpdate: (self) => {
            // Subtle scale and opacity effect as it gets stacked
            const progress = self.progress;
            if (i < cards.length - 1) {
              gsap.to(card, {
                scale: 0.9 + (0.1 * (1 - progress)),
                opacity: 0.4 + (0.6 * (1 - progress)),
                overwrite: "auto"
              });
            }
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 md:py-48 px-8 sm:px-12 md:px-24 bg-[#070707]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-32">
          <span className="text-[#7c3aed] font-mono text-sm tracking-[0.4em] uppercase mb-4 block">Selected Works</span>
          <h2 className="text-[10vw] sm:text-[8vw] md:text-[6vw] font-bold text-white leading-none tracking-tighter">
            Digital<br />Artifacts
          </h2>
        </div>

        <div className="space-y-[40vh]">
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card sticky w-full aspect-[16/10] md:aspect-[16/9] bg-[#111111] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl transition-transform duration-500"
              style={{ top: `${(i + 1) * 2}rem` }}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

              <div className="relative z-20 h-full flex flex-col justify-end p-8 sm:p-12 md:p-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="max-w-xl">
                    <span className="text-[#7c3aed] font-mono text-xs tracking-widest uppercase mb-4 block">
                      {project.category}
                    </span>
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-lg leading-relaxed mb-8">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Link href="#" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#7c3aed] hover:border-[#7c3aed] transition-all duration-500">
                      <Github size={22} />
                    </Link>
                    <Link href="#" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#7c3aed] hover:border-[#7c3aed] transition-all duration-500">
                      <ExternalLink size={22} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative side number */}
              <div className="absolute top-12 right-12 z-20 hidden md:block">
                <span className="text-8xl font-bold text-white/5 tracking-tighter select-none">
                  0{i + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-64 text-center">
          <Link
            href="/archive"
            className="text-white/40 hover:text-[#7c3aed] transition-colors duration-300 font-mono text-sm tracking-widest uppercase flex items-center justify-center gap-4 group"
          >
            See full archive
            <div className="w-8 h-[1px] bg-white/20 group-hover:bg-[#7c3aed] transition-colors duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
