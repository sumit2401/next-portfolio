"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full py-32 md:py-64 px-8 sm:px-12 md:px-24 bg-[#070707] flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background large text */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white/[0.02] select-none pointer-events-none tracking-tighter whitespace-nowrap">
        GET IN TOUCH
      </div>

      <div className="relative z-10 max-w-4xl">
        <span className="contact-reveal text-[#7c3aed] font-mono text-sm tracking-[0.4em] uppercase mb-8 block">Next Step</span>

        <h2 className="contact-reveal text-[10vw] sm:text-[8vw] md:text-[6vw] font-bold text-white leading-none tracking-tighter mb-12">
          Let's create<br />something great
        </h2>

        <p className="contact-reveal text-xl text-white/50 max-w-2xl mx-auto mb-16 leading-relaxed">
          I'm currently looking for new opportunities and collaborations. My inbox is always open whether you have a question or just want to say hi!
        </p>

        <div className="contact-reveal">
          <a
            href="mailto:sp4440793@gmail.com"
            className="group relative inline-flex items-center justify-center px-12 py-6 rounded-full bg-white text-black font-bold text-lg hover:bg-[#7c3aed] hover:text-white transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10">Say Hello &rarr;</span>
            <div className="absolute inset-0 bg-[#7c3aed] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </a>
        </div>

        <div className="mt-24 contact-reveal">
          <p className="text-white/20 font-mono text-xs uppercase tracking-widest">
            Based in Indore, India — Available remotely
          </p>
        </div>
      </div>
    </section>
  )
}
