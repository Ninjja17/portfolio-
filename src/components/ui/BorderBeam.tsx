"use client";

import React from "react";
import { motion } from "framer-motion";

interface BorderBeamProps {
  className?: string;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

export function BorderBeam({
  className = "",
  duration = 8,
  colorFrom = "#10b981",
  colorTo = "#3b82f6",
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden ${className}`}
      style={{
        padding: `${borderWidth}px`,
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
      }}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-[250%] origin-center"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 285deg, ${colorFrom} 330deg, ${colorTo} 360deg)`,
        }}
      />
    </div>
  );
}
