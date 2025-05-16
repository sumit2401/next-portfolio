import React from "react";
import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  currentSection: number;
  totalSections: number;
  isLoaded: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  currentSection,
  totalSections,
  isLoaded,
}) => {
  // Number of ticks above and below the number
  const ticksAbove = 3;
  const ticksBelow = 3;
  const totalTicks = ticksAbove + 1 + ticksBelow; // +1 for the center tick (number)
  // Use Tailwind's slate-200 color for ticks and number
  const tickColor = "#a3aeba"; // slate-200 hex
  const numberColor = "#a3aeba"; // slate-200 hex

  // The tick index 0 is the top, totalTicks-1 is the bottom, center is at ticksAbove
  // We'll animate width and opacity based on distance from center
  const getTickStyle = (pos: number) => {
    // pos: -3 (top) ... 0 (center) ... +3 (bottom)
    const absPos = Math.abs(pos);
    // Largest in center, smallest at ends
    const width = 46 - absPos * 10; // e.g. 36, 26, 16, 8
    const opacity = 1 - absPos * 0.18; // e.g. 1, 0.82, 0.64, 0.46
    return { width, opacity };
  };

  return (
    <div
      className="fixed left-9 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center text-slate-200"
      style={{ width: 60, height: 320, borderRight: `1px solid ${tickColor}` }}
    >
      <div className="flex flex-col justify-center items-center h-full w-full">
        {/* Ticks above */}
        {[...Array(ticksAbove)].map((_, i) => {
          const { width, opacity } = getTickStyle(i - ticksAbove);
          return (
            <motion.div
              key={`tick-above-${i}`}
              animate={{ width, opacity }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              style={{
                height: 2,
                background: tickColor,
                margin: "8px 0",
                borderRadius: 2,
                width,
                opacity,
              }}
            />
          );
        })}
        {/* Number */}
        <div style={{ display: "flex", alignItems: "center", height: 40 }}>
          <span
            style={{
              color: numberColor,
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: 2,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {String(currentSection).padStart(2, "0")}
          </span>
        </div>
        {/* Ticks below */}
        {[...Array(ticksBelow)].map((_, i) => {
          const { width, opacity } = getTickStyle(i + 1);
          return (
            <motion.div
              key={`tick-below-${i}`}
              animate={{ width, opacity }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              style={{
                height: 2,
                background: tickColor,
                margin: "8px 0",
                borderRadius: 2,
                width,
                opacity,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScrollIndicator;
