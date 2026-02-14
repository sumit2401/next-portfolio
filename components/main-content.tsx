"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Hero from "./sections/hero"
import Experience from "./sections/experience"
import Projects from "./sections/projects"
import Contact from "./sections/contact"
import Skills from "./sections/skills"
import SocialSidebar from "./social-sidebar"
import EmailSidebar from "./email-sidebar"
import Footer from "./footer"
import About from "./sections/about"
import { ReactLenis } from "lenis/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "./header"
import MobileNavbar from "./mobile-navbar"

gsap.registerPlugin(ScrollTrigger)



export default function MainContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSection, setCurrentSection] = useState(1)
  const currentSectionRef = useRef(1)
  const [activeScrollSection, setActiveScrollSection] = useState("")
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const aboutRef = useRef<any>(null)
  const experienceRef = useRef<any>(null)
  const projectsRef = useRef<any>(null)
  const contactRef = useRef<any>(null)

  const lenisRef = useRef<any>()

  // Section order must match the render order below
  const sectionList = [
    { id: "hero", Component: Hero },
    { id: "about", Component: About },
    // { id: "skills", Component: Skills },
    { id: "experience", Component: Experience },
    { id: "projects", Component: Projects },
    { id: "contact", Component: Contact },
    { id: "footer", Component: Footer },
  ]

  useEffect(() => {
    function update(time: any) {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.raf(time * 1000);
      }
    }

    const timeoutId = setTimeout(() => {
      gsap.ticker.add(update);
    }, 100);

    // Ferris Wheel Animation Logic
    if (isLoaded) {
      const container = document.querySelector(".ferris-wheel-container");
      const sections = gsap.utils.toArray(".ferris-wheel-section");

      const sectionWeights: Record<string, number> = {
        hero: 1,
        about: 4,
        experience: 4,
        projects: 4,
        contact: 1,
        footer: 1,
      };

      const totalWeight = sectionList.reduce((acc, section) => acc + (sectionWeights[section.id] || 1), 0);
      const transitionDuration = 0.5; // Duration of the rotation transition

      if (container && sections.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: `+=${totalWeight * 100}%`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              let cumulativeWeight = 0;
              let sectionIndex = 0;

              for (let i = 0; i < sectionList.length; i++) {
                const weight = sectionWeights[sectionList[i].id] || 1;
                if (progress <= (cumulativeWeight + weight) / totalWeight) {
                  sectionIndex = i;
                  break;
                }
                cumulativeWeight += weight;
              }

              if (sectionIndex + 1 !== currentSectionRef.current) {
                currentSectionRef.current = sectionIndex + 1;
                setCurrentSection(sectionIndex + 1);
                setActiveScrollSection(sectionList[sectionIndex].id);
              }
            }
          }
        });

        let currentPosition = 0;

        sections.forEach((section: any, i) => {
          const id = sectionList[i].id;
          const weight = sectionWeights[id] || 1;

          // Initial state for sections
          gsap.set(section, {
            opacity: i === 0 ? 1 : 0,
            scale: i === 0 ? 1 : 0.8,
            rotationX: i === 0 ? 0 : 20,
            z: i === 0 ? 0 : -500,
            yPercent: i === 0 ? 0 : 40,
            display: "flex",
            pointerEvents: i === 0 ? "auto" : "none"
          });

          if (i > 0) {
            // Determine start time: faster start for the first transition
            const startTime = i === 1 ? 0 : currentPosition - (transitionDuration / 2);

            // Animation for section entering "from behind"
            tl.to(section as any, {
              opacity: 1,
              scale: 1,
              rotationX: 0,
              z: 0,
              yPercent: 0,
              pointerEvents: "auto",
              duration: transitionDuration,
              ease: "power2.inOut"
            }, startTime);

            // Animation for previous section "rolling down" and zooming out
            const prevSection = sections[i - 1] as any;
            tl.to(prevSection, {
              opacity: 0,
              scale: 1.2,
              rotationX: -20,
              z: 100,
              yPercent: 100,
              pointerEvents: "none",
              duration: transitionDuration,
              ease: "power2.inOut"
            }, startTime);
          }

          // Internal scroll animation for weighted sections
          if (weight > 1) {
            const content = section.querySelector(".section-scroll-content");
            if (content) {
              tl.to(content, {
                y: () => {
                  if (id === "about") return 0;
                  const scrollDistance = content.scrollHeight - window.innerHeight;
                  return scrollDistance > 0 ? -scrollDistance : 0;
                },
                ease: "none",
                duration: weight - transitionDuration,
                onUpdate: function () {
                  // Special handling for About section scattering
                  if (id === "about" && aboutRef.current) {
                    const scatteringTimeline = aboutRef.current.getScatteringTimeline();
                    if (scatteringTimeline) {
                      scatteringTimeline.progress(this.progress());
                    }
                  }
                  if (id === "experience" && experienceRef.current) {
                    const experienceTimeline = experienceRef.current.getTimeline();
                    if (experienceTimeline) {
                      experienceTimeline.progress(this.progress());
                    }
                  }
                  if (id === "projects" && projectsRef.current) {
                    const projectsTimeline = projectsRef.current.getTimeline();
                    if (projectsTimeline) {
                      projectsTimeline.progress(this.progress());
                    }
                  }
                  if (id === "contact" && contactRef.current) {
                    const contactTimeline = contactRef.current.getTimeline();
                    if (contactTimeline) {
                      contactTimeline.progress(this.progress());
                    }
                  }
                }
              }, currentPosition - (transitionDuration / 2));
            }
          }

          currentPosition += weight;
        });
      }
    }

    return () => {
      clearTimeout(timeoutId);
      gsap.ticker.remove(update);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isLoaded])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  // We'll rely on ScrollTrigger for section tracking now
  useEffect(() => {
    if (!isLoaded) return
  }, [isLoaded])




  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        // delayChildren: 0.2,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative"
    >
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />

      {/* Desktop Header */}
      <Header />

      {/* Mobile Navbar */}
      <MobileNavbar />

      {/* Desktop Sidebars */}
      <SocialSidebar />
      <EmailSidebar />

      {/* Main Content */}
      <div className="ferris-wheel-container overflow-hidden h-screen w-full relative" style={{ perspective: "2000px" }}>
        {sectionList.map(({ id, Component }, idx) => (
          <section
            key={id}
            id={id}
            ref={el => { sectionRefs.current[idx] = el }}
            className="ferris-wheel-section absolute inset-0 flex items-center justify-center bg-transparent w-full h-full"
            data-active={activeScrollSection === id}
            style={{
              zIndex: sectionList.length - idx,
              transformStyle: "preserve-3d",
              willChange: "transform, opacity"
            }}
          >
            <div className="section-scroll-content w-full">
              {id === "about" ? (
                <About ref={aboutRef} />
              ) : id === "experience" ? (
                <Experience ref={experienceRef} />
              ) : id == "projects" ? (
                <Projects ref={projectsRef} />
              ) : id === "contact" ? (
                <Contact ref={contactRef} />
              ) : (
                <Component />
              )}
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  )
}