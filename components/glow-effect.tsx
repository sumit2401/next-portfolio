'use client';

import { useEffect, useState, useRef } from 'react';

export default function GlowEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smallCirclePosition, setSmallCirclePosition] = useState({ x: 0, y: 0 });
  const [largeCirclePosition, setLargeCirclePosition] = useState({ x: 0, y: 0 });
  const [wideGlowPosition, setWideGlowPosition] = useState({ x: 0, y: 0 });
  const isMovingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      isMovingRef.current = true;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        isMovingRef.current = false;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Effect to animate both circles
  useEffect(() => {
    const animateCircles = () => {
      // Animate small circle
      setSmallCirclePosition(prev => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        return {
          x: prev.x + dx * 0.25, // Faster follow rate for small circle
          y: prev.y + dy * 0.25
        };
      });

      // Animate large circle
      setLargeCirclePosition(prev => {
        const dx = smallCirclePosition.x - prev.x;
        const dy = smallCirclePosition.y - prev.y;
        return {
          x: prev.x + dx * 0.1, // Slower follow rate for large circle
          y: prev.y + dy * 0.1
        };
      });

      // Animate wide glow
      setWideGlowPosition(prev => {
        const dx = largeCirclePosition.x - prev.x;
        const dy = largeCirclePosition.y - prev.y;
        return {
          x: prev.x + dx * 0.05, // Slowest follow rate for wide glow
          y: prev.y + dy * 0.05
        };
      });

      animationFrameRef.current = requestAnimationFrame(animateCircles);
    };

    animationFrameRef.current = requestAnimationFrame(animateCircles);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, smallCirclePosition, largeCirclePosition]);

  return (
    <>
      {/* Wide glow effect */}
      {/* <div
        className="fixed pointer-events-none z-40 transition-transform duration-75 ease-out"
        style={{
          left: wideGlowPosition.x,
          top: wideGlowPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-[500px] h-[500px] rounded-full bg-white opacity-5 blur-3xl" />
      </div> */}

      {/* Large circle */}
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          left: largeCirclePosition.x,
          top: largeCirclePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-32 h-32 rounded-full bg-white opacity-10 blur-sm" />
      </div>

      {/* Small circle */}
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          left: smallCirclePosition.x,
          top: smallCirclePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-6 h-6 rounded-full bg-white opacity-30" />
      </div>
    </>
  );
} 