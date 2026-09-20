"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function Word({ children, progress, range }: { children: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.24em] transition-opacity duration-150">
      {children}
    </motion.span>
  );
}

export default function ScrollRevealAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.3"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const paragraph =
    "I build high-performance web applications and resilient cloud systems — focused on clean code, intuitive interfaces, and scalable architecture.";

  const words = paragraph.split(" ");

  return (
    <section id="about" ref={containerRef} className="py-36 px-6 sm:px-12 border-t border-b border-black/[0.08]">
      <div className="max-w-5xl mx-auto">
        
        {/* Meta Header */}
        <div className="flex items-center gap-2 mb-12 font-mono text-xs tracking-widest text-black/50 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-black" />
          <span>ABOUT & PHILOSOPHY</span>
        </div>

        {/* Scroll Reveal Text */}
        <div className="w-full">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.3] tracking-tight text-[#111]">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} progress={smoothProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </h2>
        </div>

      </div>
    </section>
  );
}
