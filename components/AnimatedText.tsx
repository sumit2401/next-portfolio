"use client";

import React, { useRef, useEffect, useState } from "react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";


import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const AnimatedText: React.FC<{ children: React.ReactNode, colorInitial?: string, colorAccent?: string, colorFinal?: string, opacityInitial?: number, opacityAccent?: number, opacityFinal?: number, paragraphIndex?: number, totalParagraphs?: number, pinSection?: boolean }> = ({ children, colorInitial = "#f87171", colorAccent = "#14b8a6", colorFinal = "#14b8a6", opacityInitial = 0.2, opacityAccent = 1, opacityFinal = 1, paragraphIndex = 0, totalParagraphs = 1, pinSection = false }) => {




    const containerRef = useRef(null)
    const splitTextRef = useRef<Array<{ wordSplit: any, charSplit: any }>>([])
    const lastScrollProgress = useRef(0)
    const colorTransitionTimer = useRef(new Map());
    const completeChars = useRef(new Set())


    useGSAP(() => {


        //check if containerRef is exist in children 
        if (!containerRef.current) return;



        //resetting the last scroll value to 0 
        splitTextRef.current = [];
        lastScrollProgress.current = 0;
        colorTransitionTimer.current.clear();
        completeChars.current.clear();


        let elements = [];
        if ((containerRef.current as HTMLElement).hasAttribute("data-copy-wrapper")) {
            elements = Array.from((containerRef.current as HTMLElement).children);
        } else {
            elements = [containerRef.current]
        }

        elements.forEach((element) => {
            const wordSplit = SplitText.create(element, {
                type: "words",
                wordsClass: "word",

                // delimiter: "|",
                // charsClass: "text-transparent",
            })

            const charSplit = SplitText.create(wordSplit.words, {
                type: "chars",
                charsClass: "char",
            })
            splitTextRef.current.push({ wordSplit, charSplit });

        });


        const allChars = splitTextRef.current.flatMap((charSplit) => charSplit.charSplit.chars);

        gsap.set(allChars, { opacity: opacityInitial })


        const scheduleFinalTransition = (char: HTMLElement, index: number) => {

            if (colorTransitionTimer.current.has(index)) {
                clearTimeout(colorTransitionTimer.current.get(index));
            }

            const timer = setTimeout(() => {
                if (!completeChars.current.has(index)) {
                    gsap.to(char, {
                        duration: 0.1,
                        ease: "none",
                        opacity: opacityFinal,
                        onComplete: () => {
                            completeChars.current.add(index);
                        }
                    })
                }
                colorTransitionTimer.current.delete(index)
            }, 100)

            colorTransitionTimer.current.set(index, timer);


        }



        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 90%",
            end: "top 10%",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const totalChars = allChars.length;
                const isScrollingDown = progress >= lastScrollProgress.current;
                
                // Calculate paragraph-specific progress
                const paragraphProgress = Math.max(0, Math.min(1, (progress - (paragraphIndex / totalParagraphs)) * totalParagraphs));
                const currentCharIndex = Math.ceil(paragraphProgress * totalChars);

                allChars.forEach((char, index) => {
                    if (!isScrollingDown && index >= currentCharIndex) {
                        if (colorTransitionTimer.current.has(index)) {
                            clearTimeout(colorTransitionTimer.current.get(index));
                            colorTransitionTimer.current.delete(index);
                        }
                        completeChars.current.delete(index);
                        gsap.set(char, { opacity: opacityInitial });
                        return;
                    }

                    if (completeChars.current.has(index)) {
                        return;
                    }

                    if (index < currentCharIndex) {
                        gsap.set(char, { opacity: opacityAccent });
                        if (!colorTransitionTimer.current.has(index)) {
                            scheduleFinalTransition(char, index);
                        }
                    } else {
                        gsap.set(char, { opacity: opacityInitial });
                    }
                });

                lastScrollProgress.current = progress;
            }
        })



    }, {
        scope: containerRef,
        dependencies: [colorAccent, colorFinal, colorInitial , opacityAccent, opacityFinal, opacityInitial]
    })

    // Cleanup ScrollTriggers on unmount
    // useEffect(() => {
    //     return () => {
    //         ScrollTrigger.getAll().forEach(trigger => {
    //             if (trigger.trigger === containerRef.current) {
    //                 trigger.kill();
    //             }
    //         });
    //     };
    // }, []);


    if (React.Children.count(children) === 1) {
        return React.cloneElement(children as React.ReactElement, { ref: containerRef })
    }






    return (
        <div ref={containerRef} data-copy-wrapper="true">
            {children}
        </div>
    )
}