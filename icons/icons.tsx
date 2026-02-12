import React from "react";

export const HexSLogo = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon
      points="32,6 58,20 58,44 32,58 6,44 6,20"
      stroke="#4FFFD7"
      strokeWidth="3"
      fill="none"
    />
    <text
      x="32"
      y="32"
      textAnchor="middle"
      fontSize="32"
      fontFamily="Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
      fill="#4FFFD7"
      fontWeight="bold"
      dominantBaseline="central"
    >S</text>
  </svg>
);
