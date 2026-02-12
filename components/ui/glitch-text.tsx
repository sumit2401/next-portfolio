"use client"

import React, { useState, useEffect, useCallback } from "react"

interface GlitchTextProps {
    text: string
    className?: string
    interval?: number
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className, interval = 30 }) => {
    const [displayText, setDisplayText] = useState(text)
    const [isHovered, setIsHovered] = useState(false)

    const shuffle = useCallback(() => {
        let iteration = 0
        const timer = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index]
                        }
                        return characters[Math.floor(Math.random() * characters.length)]
                    })
                    .join("")
            )

            if (iteration >= text.length) {
                clearInterval(timer)
            }

            iteration += 1 / 3
        }, interval)

        return () => clearInterval(timer)
    }, [text, interval])

    useEffect(() => {
        if (isHovered) {
            const cleanup = shuffle()
            return cleanup
        } else {
            setDisplayText(text)
        }
    }, [isHovered, shuffle, text])

    return (
        <span
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={className}
            style={{ display: "inline-block" }}
        >
            {displayText}
        </span>
    )
}
