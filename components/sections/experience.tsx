"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    company: "EdgeNRoots",
    roles: [
      {
        title: "Team Lead",
        date: "2024 — Present",
        description: "Orchestrating technical excellence. Leading cross-functional teams to deliver high-performance digital products while mentoring the next generation of engineers.",
      },
      {
        title: "Senior Full Stack Developer",
        date: "2024",
        description: "Architected scalable CRM and dashboards. Bridging the gap between complex data requirements and seamless user interfaces.",
      },
      {
        title: "Full Stack Developer",
        date: "2023 — 2024",
        description: "Crafting end-to-end solutions. Delivering robust web applications with a focus on clean code and optimized performance.",
      },
      {
        title: "Internship",
        date: "2023",
        description: "Deepening technical foundations. Exploring the nuances of modern web architecture and contributing to core product features.",
      }
    ]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".experience-item") as HTMLElement[];
      gsap.from(items, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
      });

      // Animated vertical line
      gsap.from(".timeline-line", {
        scaleY: 0,
        duration: 1.5,
        transformOrigin: "top",
        ease: "power3.out",
        delay: 0.3
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full py-32 md:py-64 px-8 sm:px-12 md:px-24 bg-[#070707]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-32">
          <span className="text-[#7c3aed] font-mono text-sm tracking-[0.4em] uppercase mb-4 block">Professional Path</span>
          <h2 className="text-[10vw] sm:text-[8vw] md:text-[6vw] font-bold text-white leading-none tracking-tighter">
            Experience<br />Archives
          </h2>
        </div>

        <div className="timeline-container relative grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Vertical Timeline line for desktop */}
          <div className="timeline-line absolute left-0 lg:left-1/2 top-4 bottom-4 w-[1px] bg-white/10 hidden lg:block" />

          <div className="lg:col-span-12 space-y-24">
            {experiences[0].roles.map((role, i) => (
              <div
                key={i}
                className={`experience-item relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 ${i % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
              >
                {/* Date Side */}
                <div className={`flex items-center ${i % 2 === 0 ? "lg:justify-end lg:text-right" : "lg:justify-start lg:text-left"}`}>
                  <span className="text-4xl sm:text-6xl md:text-7xl font-bold text-white/10 tracking-tighter">
                    {role.date}
                  </span>
                </div>

                {/* Content Side */}
                <div className={`relative ${i % 2 === 0 ? "lg:text-left" : "lg:text-left lg:order-first lg:text-right"}`}>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2">{role.title}</h3>
                  <h4 className="text-[#7c3aed] font-mono text-sm tracking-widest uppercase mb-6">@ EdgeNRoots</h4>
                  <p className="text-lg text-white/50 leading-relaxed max-w-md">
                    {role.description}
                  </p>

                  {/* Visual dot on the line */}
                  <div className={`absolute top-4 w-3 h-3 bg-[#7c3aed] rounded-full hidden lg:block shadow-[0_0_15px_rgba(124,58,237,0.5)] ${i % 2 === 0 ? "left-[-12.5px]" : "right-[-12.5px]"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-48">
          <div className="p-8 md:p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-white/[0.04] transition-all duration-500">
            <div>
              <h4 className="text-white text-xl font-bold mb-2">Want to see more details?</h4>
              <p className="text-white/40">Download my full resume for a comprehensive overview of my technical journey.</p>
            </div>
            <button className="px-10 py-4 bg-[#7c3aed] text-white rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-xl">
              Get Resume
            </button>
          </div>
        </div>
      </div>
      <div className="absolute  top-[40%] text-[15vw] font-bold text-white/[0.02] select-none pointer-events-none tracking-tighter">
        EXPERIENCE
      </div>
    </section>
  );
}
