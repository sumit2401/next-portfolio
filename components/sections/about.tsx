"use client"

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SumitImage from '../../app/assets/images/sumit-pic.jpg'
import SplitType from "split-type"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const About = forwardRef((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textContentRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useImperativeHandle(ref, () => ({
    getScatteringTimeline: () => timelineRef.current
  }));

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context((self) => {
      // Split text into words
      // Split all text into words for cleaner scattering
      const splitIntro = new SplitType(".about-reveal span", { types: "words" });
      const splitTitle = new SplitType(".about-reveal h2", { types: "words" });
      const splitText = new SplitType(".about-reveal p", { types: "words" });
      const splitLists = new SplitType(".about-reveal li", { types: "words" });

      const allElements = [
        ...(splitIntro.words || []),
        ...(splitTitle.words || []),
        ...(splitText.words || []),
        ...(splitLists.words || [])
      ] as HTMLElement[];

      // Initial scatter
      allElements.forEach(el => {
        const x = (Math.random() - 0.5) * window.innerWidth * 3.5;
        const y = (Math.random() - 0.5) * window.innerHeight * 3.5;
        const z = (Math.random() - 0.5) * 6000;
        const rotationX = (Math.random() - 0.5) * 3600;
        const rotationY = (Math.random() - 0.5) * 3600;
        const rotationZ = (Math.random() - 0.5) * 3600;

        gsap.set(el, {
          x, y, z,
          rotationX, rotationY, rotationZ,
          opacity: 0,
          display: "inline-block",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity"
        });
      });

      // Create a timeline for the combination
      const tl = gsap.timeline({ paused: true });
      timelineRef.current = tl;

      // Add a ticker for realistic 0-gravity float that fades on merge
      const tickerCallback = () => {
        const progress = tl.progress();
        const driftIntensity = 1 - progress;

        if (driftIntensity > 0.01) {
          allElements.forEach((el, i) => {
            const time = Date.now() * 0.001;
            // Use percent for drift to avoid fighting with absolute x/y from timeline
            const driftX = Math.sin(time + i) * 15 * driftIntensity;
            const driftY = Math.cos(time * 0.8 + i) * 15 * driftIntensity;
            gsap.set(el, {
              xPercent: driftX,
              yPercent: driftY,
              overwrite: false
            });
          });
        } else {
          // Clear drift when merged
          allElements.forEach(el => gsap.set(el, { xPercent: 0, yPercent: 0 }));
        }
      };

      tl.to(allElements, {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        stagger: {
          amount: 1,
          from: "random"
        },
        ease: "power3.inOut" // Smoother easing
      });

      gsap.ticker.add(tickerCallback);
      self.add(() => () => gsap.ticker.remove(tickerCallback));

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-32 md:py-64 px-8 sm:px-12 md:px-24 bg-[#070707]"
      style={{ perspective: "2000px" }}
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
      <div className="absolute  top-[40%] text-[25vw] font-bold text-white/[0.02] select-none pointer-events-none tracking-tighter">
        ABOUT
      </div>
    </section>
  )
})

export default About
