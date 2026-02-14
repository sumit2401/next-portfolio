"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { X } from "lucide-react"

interface NavigationDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { name: "About", href: "#about", color: "#4f46e5" },
    { name: "Experience", href: "#experience", color: "#7c3aed" },
    { name: "Projects", href: "#projects", color: "#ec4899" },
    { name: "Contact", href: "#contact", color: "#06b6d4" },
]

export default function NavigationDrawer({ isOpen, onClose }: NavigationDrawerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const menuLinksRef = useRef<(HTMLAnchorElement | null)[]>([])
    const bgRef = useRef<HTMLDivElement>(null)
    const [hoveredColor, setHoveredColor] = useState<string | null>(null)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"

            const tl = gsap.timeline()

            tl.fromTo(
                containerRef.current,
                { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
                {
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 1,
                    ease: "power4.inOut"
                }
            )

            menuLinksRef.current.forEach((link, i) => {
                if (!link) return
                const chars = link.querySelectorAll(".char")
                tl.fromTo(
                    chars,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.02,
                        ease: "power4.out"
                    },
                    i === 0 ? "-=0.4" : "-=0.7"
                )
            })
        } else {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const handleClose = () => {
        const tl = gsap.timeline({
            onComplete: onClose
        })

        tl.to(menuLinksRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in"
        })

        tl.to(containerRef.current, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            duration: 0.8,
            ease: "power4.inOut"
        }, "-=0.1")
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    ref={containerRef}
                    className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Animated Background Overlay */}
                    <div
                        ref={bgRef}
                        className="absolute inset-0 transition-colors duration-1000 ease-out opacity-20 pointer-events-none"
                        style={{ backgroundColor: hoveredColor || "transparent" }}
                    />

                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-8 right-8 md:top-12 md:right-12 text-white/40 hover:text-white transition-all duration-300 hover:rotate-90 z-[110]"
                    >
                        <div className="relative w-12 h-12 flex items-center justify-center border border-white/10 rounded-full hover:border-white/30">
                            <X size={28} strokeWidth={1.5} />
                        </div>
                    </button>

                    {/* Navigation Links */}
                    <nav className="flex flex-col items-center gap-4 md:gap-6 z-[105]">
                        {menuItems.map((item, index) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={handleClose}
                                ref={(el) => { menuLinksRef.current[index] = el; }}
                                onMouseEnter={() => setHoveredColor(item.color)}
                                onMouseLeave={() => setHoveredColor(null)}
                                className="group relative py-2"
                            >
                                <div className="flex overflow-hidden">
                                    {item.name.split("").map((char, i) => (
                                        <span
                                            key={i}
                                            className="char text-5xl md:text-8xl font-black text-white/20 group-hover:text-white transition-colors duration-500 uppercase tracking-tighter inline-block"
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </span>
                                    ))}
                                </div>

                                {/* Underline effect */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-[2px] bg-white opacity-0 group-hover:opacity-100"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                />
                            </Link>
                        ))}
                    </nav>

                    {/* Footer Info */}
                    <div className="absolute bottom-12 flex flex-col md:flex-row gap-8 text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/30 font-bold z-[105]">
                        <div className="flex flex-col gap-2">
                            <span className="text-white/10 italic">Location</span>
                            <span>Delhi, India</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-white/10 italic">Socials</span>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                                <a href="#" className="hover:text-white transition-colors">Github</a>
                                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Large Background Text */}
                    <div className="absolute -bottom-20 -left-20 text-white/[0.02] text-[20vw] font-black pointer-events-none select-none uppercase leading-none">
                        Menu
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
}

