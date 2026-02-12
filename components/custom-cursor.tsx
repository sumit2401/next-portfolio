"use client"

import React, { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false)

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.onclick ||
                window.getComputedStyle(target).cursor === "pointer"
            ) {
                setIsHovered(true)
            } else {
                setIsHovered(false)
            }
        }

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mouseover", handleMouseOver)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [cursorX, cursorY])

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                left: -12,
                top: -12,
                width: 24,
                height: 24,
                opacity: 0.1, // Slightly higher for better visibility of the inversion
            }}
            animate={{
                scale: isHovered ? 2.5 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
            }}
        />
    )
}
