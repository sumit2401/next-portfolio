import { useState } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type GlowingButtonProps = React.ComponentProps<typeof Button> & {
  borderRadius?: string;
  showArrow?: boolean;
};

export function GlowingButton({
  children,
  borderRadius = "rounded-md",
  showArrow = false,
  ...props
}: GlowingButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative inline-block ${borderRadius}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GlowingEffect
        borderWidth={2}
        spread={40}
        glow={true}
        disabled={!hovered}
        proximity={64}
        inactiveZone={0.01}
        className={borderRadius}
      />
      <Button
        {...props}
        className={`relative z-10 border border-slate-200 bg-transparent text-slate font-mono group transition-all duration-300 overflow-hidden hover:bg-slate/10 ${borderRadius}`}
      >
        <span className="flex items-center gap-1  transition-transform">
          {children} {showArrow && <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
        </span>
      </Button>
    </div>
  );
}
