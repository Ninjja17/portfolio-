"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AsciifyImage from "./AsciifyImage";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Exact 220vh runway for smooth, relaxed scroll travel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Inertial physics-based smoothing: Eliminates stepped wheel ticks and delivers silky 120fps fluid glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    mass: 0.15,
    restDelta: 0.0005,
  });

  // Track if card has flipped to back side
  const [isFlipped, setIsFlipped] = useState(false);
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setIsFlipped(latest > 0.32);
  });

  // EXACT MAJD 3D TRANSFORMATION SPECS (SMOOTH SPRING INTERPOLATED):
  // Card rotates 180deg on Y-axis, scales 0.5x -> 1.0x, moves Y 165px -> 0px
  // At scroll=0, translateY: 165px places the photo card elegantly UNDER the SOFTWARE ENGINEER text
  const rotateY = useTransform(smoothProgress, [0, 0.65], [0, 180]);
  const scale = useTransform(smoothProgress, [0, 0.65], [0.5, 1.0]);
  const translateY = useTransform(smoothProgress, [0, 0.65], [165, 0]);

  // Interactive 3D cursor parallax on 3D chrome assets
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const starRotateX = useTransform(smoothY, [-0.5, 0.5], [18, -18]);
  const starRotateY = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const starMoveX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const starMoveY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const lightningRotateX = useTransform(smoothY, [-0.5, 0.5], [18, -18]);
  const lightningRotateY = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const lightningMoveX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const lightningMoveY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[225vh]"
    >
      {/* 1. PINNED STICKY LAYER: 3D FLIPPING PHOTO CARD (Layered behind text) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-10 overflow-hidden">
        <motion.div
          style={{
            scale,
            y: translateY,
          }}
          className="pointer-events-auto [perspective:1400px]"
        >
          <motion.div
            style={{
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-[300px] h-[342px] sm:w-[360px] sm:h-[410px] md:w-[400px] md:h-[456px] rounded-[20px] shadow-2xl cursor-pointer"
          >
            {/* FRONT FACE: B&W PORTRAIT WITH ASCIILENS (Visible at scroll = 0px) */}
            <div
              style={{ backfaceVisibility: "hidden" }}
              className={`absolute inset-0 rounded-[20px] overflow-hidden bg-[#161616] border border-black/10 shadow-2xl transition-opacity duration-300 ${
                isFlipped ? "pointer-events-none z-0 opacity-0" : "pointer-events-auto z-10 opacity-100"
              }`}
            >
              <AsciifyImage
                src="/shibani-front.jpg"
                alt="Shibani Pradhan Front Portrait"
                imgClassName="filter grayscale contrast-125"
                radius={0.45}
                scale={1.6}
                contrast={1.4}
                brightness={0.08}
                glow={0.8}
                aberration={0.6}
                baseStrength={0.12}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* BACK FACE: USER'S NEW RED STUDIO PORTRAIT WITH ASCIILENS (Revealed on 180deg scroll flip) */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className={`absolute inset-0 rounded-[20px] overflow-hidden bg-[#0d0d0d] border border-black/10 shadow-2xl transition-opacity duration-300 ${
                isFlipped ? "pointer-events-auto z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
              }`}
            >
              <AsciifyImage
                src="/shibani-back.jpg"
                alt="Shibani Pradhan Red Studio Portrait"
                objectPosition={[0.38, 0.5]}
                radius={0.45}
                scale={1.6}
                contrast={1.35}
                brightness={0.05}
                glow={0.8}
                aberration={0.5}
                baseStrength={0.12}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. NATURAL SCROLLING CONTENT LAYER (Layered in front of card) */}
      <div className="absolute inset-0 w-full flex flex-col z-20 pointer-events-none">
        
        {/* SECTION 1: HERO VIEWPORT (100vh) */}
        <div className="h-screen w-full flex flex-col justify-between items-center px-6 sm:px-12 pt-28 pb-8 select-none pointer-events-none">
          {/* Top nav clearance spacer */}
          <div className="h-6" />

          {/* Center Giant Typography - LAYERED IN FRONT (z-30) AND STRICTLY LEFT-ALIGNED */}
          <div className="relative w-full max-w-5xl mx-auto flex justify-center z-30 pointer-events-none">
            <div className="relative inline-flex flex-col items-start pointer-events-none">
              {/* Line 1: 3D Chrome Star on top-left + SOFTWARE */}
              <div className="relative flex items-center">
                <motion.div
                  drag
                  dragConstraints={{ left: -25, right: 25, top: -25, bottom: 25 }}
                  dragElastic={0.2}
                  style={{
                    x: starMoveX,
                    y: starMoveY,
                    rotateX: starRotateX,
                    rotateY: starRotateY,
                  }}
                  whileHover={{ scale: 1.15 }}
                  className="absolute -left-12 sm:-left-18 md:-left-24 -top-6 sm:-top-10 md:-top-12 w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 cursor-grab active:cursor-grabbing z-30 pointer-events-auto"
                  title="Drag 3D Star!"
                >
                  <img
                    src="https://framerusercontent.com/images/OLDYsHB9RMavvQrkVRNy08ZXYE.png?width=2550&height=2550"
                    alt="3D Chrome Star"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </motion.div>

                <h1 className="font-display text-[clamp(54px,12.5vw,174px)] font-[800] leading-[0.88] tracking-[-0.04em] text-[#111]">
                  SOFTWARE
                </h1>
              </div>

              {/* Line 2: ENGINEER (Strictly left-aligned with SOFTWARE) + 3D Lightning on right */}
              <div className="relative flex items-center -mt-2 sm:-mt-5">
                <h1 className="font-display text-[clamp(54px,12.5vw,174px)] font-[800] leading-[0.88] tracking-[-0.04em] text-[#111]">
                  ENGINEER
                </h1>

                <motion.div
                  drag
                  dragConstraints={{ left: -25, right: 25, top: -25, bottom: 25 }}
                  dragElastic={0.2}
                  style={{
                    x: lightningMoveX,
                    y: lightningMoveY,
                    rotateX: lightningRotateX,
                    rotateY: lightningRotateY,
                  }}
                  whileHover={{ scale: 1.15 }}
                  className="absolute -right-10 sm:-right-16 md:-right-22 -bottom-4 sm:-bottom-6 md:-bottom-8 w-12 h-12 sm:w-18 sm:h-18 md:w-26 md:h-26 rotate-12 cursor-grab active:cursor-grabbing z-30 pointer-events-auto"
                  title="Drag 3D Lightning!"
                >
                  <img
                    src="https://framerusercontent.com/images/lIIjRX5gxRdY7UWw5wqIXicPOA.png?width=2550&height=2550"
                    alt="3D Chrome Lightning"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Indicators */}
          <div className="w-full max-w-7xl mx-auto flex justify-between items-end pointer-events-auto">
            <div className="font-display text-[clamp(44px,6.5vw,96px)] font-[800] text-[#111] leading-none tracking-tight">
              ©2026
            </div>
            <div className="font-mono text-xs sm:text-sm text-[#111]/70 uppercase tracking-widest pb-2">
              /BUILDING SINCE 2024
            </div>
          </div>
        </div>

        {/* SECTION 2: BIO VIEWPORT (100vh) */}
        {/* Exact vertical distribution matching Majd: 456px height columns with justify-between */}
        <div className="h-screen w-full flex items-center justify-center px-6 sm:px-12 pointer-events-none">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_420px_1fr] items-center gap-8 md:gap-12 pointer-events-none">
            
            {/* Left Column: Hey! at top, intro bio at bottom */}
            <div className="h-[360px] md:h-[456px] flex flex-col justify-between items-start text-left pointer-events-auto">
              <h2 className="font-display text-6xl sm:text-7xl font-bold text-[#111] leading-none tracking-tight">
                Hey!
              </h2>
              <p className="text-lg sm:text-xl font-medium text-[#111] leading-snug tracking-tight max-w-xs sm:max-w-sm">
                I’m Shibani, a software engineer specializing in scalable full-stack web applications and resilient cloud systems.
              </p>
            </div>

            {/* Center Column: SPACER FOR STICKY PHOTO CARD */}
            <div className="hidden md:block w-full h-[456px] pointer-events-none" aria-hidden="true" />

            {/* Right Column: Paragraph 1 at top, Paragraph 2 in middle, Action link at bottom */}
            <div className="h-[360px] md:h-[456px] flex flex-col justify-between items-start text-left max-w-md pointer-events-auto">
              <div className="space-y-4">
                <p className="text-base sm:text-lg text-black/85 leading-relaxed font-normal">
                  I’m a software engineer and full-stack builder with a strong focus on high-performance web systems, modern user interfaces, and scalable backend architectures.
                </p>
                <p className="text-sm sm:text-base text-black/60 leading-relaxed font-normal">
                  Experienced in designing end-to-end applications, optimizing performance, and building resilient cloud software with clean code and modern frameworks.
                </p>
              </div>

              {/* Majd-style clean action link */}
              <div className="pt-2">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#111] hover:text-black group transition-colors"
                >
                  <span>Explore Work</span>
                  <div className="w-6 h-6 rounded-md border border-black/30 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

