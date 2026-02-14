"use client";

import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import gsap from "gsap";

const projects = [
  {
    title: "Spotify Analytics",
    category: "Data Engineering / UI",
    description: "Deep dive into musical habits. Visualizing personalized data with high-end charts and insights for a premium user experience.",
    tech: ["React", "D3.js", "Spotify API"],
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2074&auto=format&fit=crop",
    color: "#1DB954"
  },
  {
    title: "Vesper Theme",
    category: "Interface Design",
    description: "A minimal, high-contrast dark theme optimized for visual clarity. Designed specifically for modern software development environments.",
    tech: ["TypeScript", "CSS", "VS Code"],
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    color: "#7c3aed"
  },
  {
    title: "GitHub Pulse",
    category: "Visualization",
    description: "Real-time visualization of developer impact. Transforming raw git contributions into beautiful, actionable insights.",
    tech: ["Next.js", "Three.js", "API"],
    image: "https://images.unsplash.com/photo-1618401471353-b98aadebc25a?q=80&w=2086&auto=format&fit=crop",
    color: "#4f46e5"
  }
];

const Projects = forwardRef((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const internalTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useImperativeHandle(ref, () => ({
    getTimeline: () => internalTimelineRef.current
  }));

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".project-item");
      const tl = gsap.timeline({ paused: true });
      internalTimelineRef.current = tl;

      // 1. Heading Reveal
      tl.from(".projects-heading span", {
        y: 60,
        opacity: 0,
        rotate: 3,
        stagger: 0.03,
        duration: 0.5,
        ease: "power3.out"
      }, 0);

      // 2. Animate items with much broader visibility windows
      items.forEach((item: any, i) => {
        const content = item.querySelector(".project-content");
        const imageOuter = item.querySelector(".project-image-outer");
        const image = item.querySelector(".project-image");
        const number = item.querySelector(".project-number");

        // Distribution (peaks at 0.25, 0.5, 0.75 for 3 items)
        const peak = (i + 0.5) / items.length;
        const windowSize = 0.5; // Wider window = stays visible longer

        const start = Math.max(0, peak - windowSize / 2);
        const end = Math.min(1, peak + windowSize / 2);

        // Visibility Phase: Entrance -> Hold -> Exit
        tl.fromTo(imageOuter,
          { opacity: 0, scale: 0.8, y: 100 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: windowSize * 0.4,
            ease: "power2.out"
          },
          start
        )
          .to(imageOuter,
            {
              opacity: 0,
              scale: 1.1,
              y: -100,
              duration: windowSize * 0.4,
              ease: "power2.in"
            },
            end - (windowSize * 0.4)
          )
          .fromTo(image,
            { scale: 1.5, filter: "brightness(0.2) blur(20px)" },
            {
              scale: 1.1,
              filter: "brightness(0.6) blur(0px)",
              duration: windowSize * 0.5,
              ease: "none"
            },
            start
          )
          .fromTo(content,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: windowSize * 0.3,
              ease: "power3.out"
            },
            start + (windowSize * 0.1)
          )
          .to(content,
            { opacity: 0, y: -40, duration: windowSize * 0.2 },
            end - (windowSize * 0.2)
          )
          .fromTo(number,
            { opacity: 0, x: 200 },
            { opacity: 0.03, x: -200, duration: windowSize, ease: "none" },
            start
          );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full h-screen bg-[#070707] flex flex-col items-center overflow-hidden"
    >
      <div className="w-full h-full flex flex-col justify-center">
        {/* Minimalist Artifacts Stack */}
        <div className="relative w-full h-full flex items-center justify-center">

          {/* Section Header (Minimal) */}
          <div className="absolute top-16 left-8 md:left-24 z-10 flex flex-col gap-4">
            <span className="text-[#7c3aed] font-mono text-[9px] tracking-[0.8em] uppercase font-black opacity-40">
              04 / WORKS
            </span>
            <div className="w-8 h-[1px] bg-white/20" />
          </div>

          <div className="relative w-full h-full flex items-center justify-center">
            {projects.map((project, i) => (
              <div key={i} className="project-item absolute inset-0 flex items-center justify-center pointer-events-none">

                {/* Primary Image Display */}
                <div className="project-image-outer relative w-[85vw] md:w-[70vw] aspect-[16/9] z-10 rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="project-image object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-40" />
                </div>

                {/* Minimalist Floating Metadata Footer */}
                <div className="project-content absolute left-1/2 -translate-x-1/2 bottom-[15%] md:bottom-[10%] z-20 w-[85vw] md:w-[70vw] pointer-events-auto">
                  <div className="flex flex-col md:flex-row items-end justify-between gap-8 pt-12 border-t border-white/5">

                    <div className="flex flex-col gap-4 text-left max-w-xl">
                      <div className="flex items-center gap-4">
                        <span className="text-white font-mono text-xs tracking-[0.2em] font-black">0{i + 1} //</span>
                        <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-white/30 text-xs md:text-sm leading-relaxed font-medium">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-6">
                      <div className="flex flex-wrap justify-end gap-2">
                        {project.tech.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 border border-white/5 bg-white/[0.02] text-white/30 font-mono text-[8px] uppercase tracking-widest rounded-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-8">
                        <Link href="#" className="text-white/20 hover:text-white transition-colors">
                          <Github size={16} />
                        </Link>
                        <Link href="#" className="text-white/20 hover:text-[#7c3aed] transition-colors">
                          <ExternalLink size={16} />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Catalog Link */}
        <div className="absolute top-16 right-8 md:right-24 z-30">
          <Link href="/archive" className="group flex items-center gap-4 opacity-30 hover:opacity-100 transition-opacity">
            <span className="text-white font-mono text-[8px] uppercase tracking-[0.5em]">Inventory</span>
            <div className="w-8 h-[1px] bg-white/20 group-hover:bg-[#7c3aed] transition-all duration-700" />
          </Link>
        </div>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;
