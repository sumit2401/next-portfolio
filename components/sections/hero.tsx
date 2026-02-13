"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GlowingButton } from "@/components/ui/glowing-button"
import { GlitchText } from "../ui/glitch-text"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const sublineRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Split name into characters for individual animation
      const name = nameRef.current;
      if (name) {
        const text = name.innerText;
        name.innerHTML = text.split("").map(char => `<span class="char inline-block">${char === " " ? "&nbsp;" : char}</span>`).join("");

        gsap.from(".char", {
          y: 100,
          opacity: 0,
          stagger: 0.02,
          duration: 1.5,
          ease: "expo.out",
          delay: 0.5
        });
      }

      // Fade in other elements
      gsap.from(sublineRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        delay: 1
      });

      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 1.2
      });


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#070707]"
    >
      {/* Background elements */}
      <div className="hero-background absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[0%] right-[-10%] w-[60%] h-[60%] bg-[#7c3aed]/10 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <div
        className="hero-content relative z-10 w-full max-w-7xl px-8 flex flex-col items-center text-center"
        style={{
          transformOrigin: "center center",
          willChange: "transform, opacity"
        }}
      >
        <div ref={sublineRef} className="mb-6">
          <span className="text-sm md:text-base font-mono text-[#7c3aed] uppercase tracking-[0.5em]">
            Digital Artisan & Engineer
          </span>
        </div>

        <h1
          ref={nameRef}
          className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-bold text-white leading-none tracking-tighter mb-8 py-2 overflow-hidden"
        >
          Sumit Patel
        </h1>

        <p
          ref={textRef}
          className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-12"
        >
          I craft immersive digital experiences that live at the intersection of design and technology. Specializing in high-performance web applications with a focus on human-centered interaction.
        </p>

        <div ref={buttonRef}>
          <GlowingButton showArrow={true}>
            <GlitchText text="Experience the work" interval={15} />
          </GlowingButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-[#7c3aed]"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  )
}
