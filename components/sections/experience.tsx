"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

const experiences = [
  {
    company: "EdgeNRoots",
    roles: [
      {
        title: "Internship",
        date: "2023",
        company: "EDGENROOTS",
        description: "Deepening technical foundations. Exploring the nuances of modern web architecture and contributing to core product features.",
      },
      {
        title: "Full Stack Developer",
        date: "2023 — 2024",
        company: "EDGENROOTS",
        description: "Crafting end-to-end solutions. Delivering robust web applications with a focus on clean code and optimized performance.",
      },
      {
        title: "Senior Full Stack Developer",
        date: "2024-2025",
        company: "EDGENROOTS",
        description: "Architected scalable CRM and dashboards. Bridging the gap between complex data requirements and seamless user interfaces.",
      },
      {
        title: "Team Lead",
        date: "2025 — Present",
        company: "EDGENROOTS",
        description: "Orchestrating technical excellence. Leading cross-functional teams to deliver high-performance digital products while mentoring the next generation of engineers.",
      }
    ]
  }
];

const Experience = forwardRef((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useImperativeHandle(ref, () => ({
    getTimeline: () => timelineRef.current
  }));

  useEffect(() => {
    if (!sectionRef.current || !horizontalRef.current) return;

    const ctx = gsap.context(() => {
      const horizontal = horizontalRef.current!;
      const items = gsap.utils.toArray(".horizontal-item");

      // Create the master timeline (paused, to be driven by parent)
      const tl = gsap.timeline({ paused: true });
      timelineRef.current = tl;

      // 1. Horizontal Scroll Animation
      const scrollDistance = horizontal.scrollWidth - window.innerWidth;

      tl.to(horizontal, {
        x: -scrollDistance,
        ease: "none",
        duration: 1
      }, 0);

      // 2. Heading animation (Faster and starts immediately)
      tl.from(".experience-title span", {
        y: 30,
        opacity: 0,
        stagger: 0.01,
        duration: 0.4,
        ease: "power3.out",
      }, 0);

      // 3. Animate items with more reliable fromTo gates
      items.forEach((item: any, i) => {
        const card = item.querySelector(".experience-card");
        const yearBg = item.querySelector(".year-bg");
        const dot = item.querySelector(".connection-dot");

        // Calculate a more forgiving start position
        // We want the entrance to happen slightly before the item is fully centered
        const start = (i / items.length) * 0.8;

        tl.fromTo(card,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.1,
            ease: "power3.out"
          },
          start
        )
          .fromTo(yearBg,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.4 },
            start
          )
          .fromTo(dot,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.2 },
            start
          );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full h-screen bg-[#070707] overflow-hidden"
    >
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-[#7c3aed]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-center">
        {/* Header Section - Refined proportions */}
        <div className="px-8 sm:px-12 md:px-24 mb-10 pt-40">
          <span className="text-[#7c3aed] font-mono text-[10px] tracking-[0.8em] uppercase mb-3 block font-bold">
            03 / Evolution
          </span>
          <h2 className="experience-title text-[6vw] md:text-[5vw] font-black text-white leading-[0.85] tracking-tighter flex flex-wrap gap-x-5 items-baseline">
            {"Experience".split("").map((char, i) => (
              <span key={i} className="inline-block">{char}</span>
            ))}
            <span className="text-white/10 font-light italic text-[4vw]">Archives</span>
          </h2>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="relative flex-1 flex items-center">
          {/* Main Path Line - Moved lower to avoid content overlap */}
          <div className="absolute left-0 right-0 top-[75%] -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent z-0" />

          <div
            ref={horizontalRef}
            className="flex gap-32 md:gap-56 px-[35vw] md:px-[45vw] relative z-20 items-center min-w-max h-[60vh]"
          >
            {experiences[0].roles.map((role, i) => (
              <div
                key={i}
                className="horizontal-item group relative flex flex-col items-center w-[320px] md:w-[480px] shrink-0"
              >
                {/* Minimal Header Metadata (Floating) */}
                <div className="absolute -top-12 left-0 flex items-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                  <span className="text-white font-mono text-[10px] tracking-[0.2em] font-black">0{i + 1} //</span>
                  <span className="text-white/60 font-mono text-[9px] tracking-widest uppercase">{role.date}</span>
                </div>

                {/* Clean Geometric Card */}
                <div className="experience-card relative w-full p-1 md:p-[1px] rounded-[1.5rem] bg-gradient-to-br from-white/10 to-transparent overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] z-10">
                  <div className="relative w-full h-full p-10 md:p-14 rounded-[1.5rem] bg-[#0c0c0c] flex flex-col min-h-[380px] md:min-h-[420px]">

                    {/* Content Area: Company -> Title */}
                    <div className="mb-auto">
                      <div className="flex items-center gap-4 mb-8">
                        <span className="w-8 h-[1px] bg-[#7c3aed]" />
                        <h4 className="text-[#7c3aed] font-mono text-[11px] tracking-[0.4em] uppercase font-black">
                          {role.company}
                        </h4>
                      </div>

                      <h3 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-[0.85] uppercase italic whitespace-normal">
                        {role.title}
                      </h3>

                      <p className="text-white/30 leading-relaxed text-sm md:text-base font-medium max-w-sm group-hover:text-white/60 transition-colors duration-500">
                        {role.description}
                      </p>
                    </div>

                    {/* Subtle Structural Footer */}
                    <div className="mt-12 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-[#7c3aed]/40 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-white/5 rounded-full" />
                      </div>
                      <span className="text-white/5 font-mono text-[8px] uppercase tracking-[0.8em]">SECURED DATA</span>
                    </div>
                  </div>
                </div>

                {/* Redesigned Timeline Marker - Positioned below card to avoid overlap */}
                <div className="connection-dot absolute top-[75%] -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <div className="relative flex items-center justify-center">
                    {/* Vertical Indicator Bar */}
                    <div className="w-[2px] h-8 bg-gradient-to-b from-[#7c3aed] to-transparent group-hover:h-14 transition-all duration-700 shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
                    {/* Base Node */}
                    <div className="absolute top-0 w-2 h-2 bg-[#7c3aed] rotate-45 group-hover:scale-150 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            ))}

            {/* Next Chapter CTA - Polished consistent design */}
            <div className="horizontal-item shrink-0 px-24">
              <div className="experience-card relative p-1 md:p-[1px] rounded-[2.5rem] bg-gradient-to-br from-[#7c3aed]/40 to-transparent overflow-hidden shadow-2xl group hover:scale-[1.02] transition-transform duration-700">
                <div className="relative p-16 md:p-20 rounded-[2.5rem] bg-[#0c0c0c] text-center overflow-hidden min-h-[380px] md:min-h-[420px] flex flex-col justify-center items-center">
                  <div className="relative z-10 w-full">
                    <span className="text-[#7c3aed] font-mono text-[10px] tracking-[0.6em] uppercase mb-8 block font-black">Archive Terminal</span>
                    <h4 className="text-white text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.85] italic">The Full<br />Record</h4>
                    <p className="text-white/30 mb-12 max-w-[280px] mx-auto text-xs md:text-sm font-medium leading-relaxed">
                      Access comprehensive technical documentation and professional credentials in document format.
                    </p>
                    <div className="flex justify-center">
                      <button className="px-12 py-5 bg-[#7c3aed] text-white rounded-sm font-black hover:bg-white hover:text-[#7c3aed] transition-all duration-500 shadow-[0_20px_40px_rgba(124,58,237,0.2)] relative overflow-hidden group/btn">
                        <span className="relative z-10 uppercase tracking-[0.3em] text-[10px]">Download CV</span>
                        <div className="absolute inset-0 bg-white translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                      </button>
                    </div>
                  </div>
                  {/* Atmospheric Glow */}
                  <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#7c3aed]/5 blur-[130px] rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-30">
          <span className="text-[10px] font-mono text-white tracking-[0.5em] uppercase">Archive Journey</span>
        </div>
      </div>
    </section>
  );
});

Experience.displayName = "Experience";

export default Experience;
