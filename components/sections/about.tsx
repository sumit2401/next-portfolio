"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SumitImage from '../../app/assets/images/sumit-pic.jpg'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Parallax effect for image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Staggered reveal for text blocks
      const textBlocks = gsap.utils.toArray(".about-reveal") as HTMLElement[];
      textBlocks.forEach((block) => {
        gsap.from(block, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-32 md:py-64 px-8 sm:px-12 md:px-24 bg-[#070707] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">

          {/* Left: Animated Text Content */}
          <div ref={textContentRef} className="lg:col-span-7 z-10">
            <div className="about-reveal mb-12">
              <span className="text-[#7c3aed] font-mono text-sm tracking-[0.4em] uppercase mb-4 block">Introduction</span>
              <h2 className="text-[10vw] lg:text-[6vw] font-bold text-white leading-none tracking-tighter mb-12">
                Crafting <br />Digital Soul
              </h2>
            </div>

            <div className="about-reveal space-y-8 max-w-2xl">
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                I'm Sumit Patel, a developer who believes technology should be as beautiful as it is functional. My journey in software engineering is driven by a passion for creating seamless interactions and robust architectures.
              </p>

              <p className="text-lg text-white/50 leading-relaxed">
                With over 2 years of professional experience, I've honed my skills in the modern web ecosystem, specializing in high-performance applications that don't just work—they feel alive.
              </p>

              <div className="pt-12 grid grid-cols-2 gap-8 border-t border-white/10 mt-16">
                <div>
                  <h4 className="text-white font-bold mb-4 uppercase tracking-[0.2em] text-xs">Primary Focus</h4>
                  <ul className="text-white/40 space-y-2 text-sm font-mono uppercase tracking-widest">
                    <li>Frontend Architecture</li>
                    <li>Interactive Design</li>
                    <li>Performance Optimization</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4 uppercase tracking-[0.2em] text-xs">Core Tech</h4>
                  <ul className="text-white/40 space-y-2 text-sm font-mono uppercase tracking-widest">
                    <li>React / Next.js</li>
                    <li>GSAP / Framer Motion</li>
                    <li>Node.js / TypeScript</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Immersive Image with Parallax */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
            >
              <Image
                src={SumitImage}
                alt="Sumit Patel"
                fill
                className="object-cover scale-110" // Extra scale for parallax room
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#7c3aed]/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-600/10 blur-3xl rounded-full" />

            <div className="absolute -bottom-8 -right-8 bg-[#111111] border border-white/5 p-8 rounded-3xl backdrop-blur-xl shadow-2xl about-reveal">
              <div className="text-center">
                <span className="text-4xl font-bold text-white block mb-1">2+</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 whitespace-nowrap">Years Experience</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Background large text */}
      <div className="absolute right-[-10%] top-[40%] text-[25vw] font-bold text-white/[0.02] select-none pointer-events-none tracking-tighter">
        ABOUT
      </div>
    </section>
  )
}
