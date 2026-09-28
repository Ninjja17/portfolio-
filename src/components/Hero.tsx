"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AsciifyImage from "./AsciifyImage";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Exact 225vh runway for smooth, relaxed scroll travel
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

  // EXACT MAJD 3D TRANSFORMATION SPECS:
  // Card rotates 180deg on Y-axis, scales 0.5x -> 1.0x
  // On desktop: moves Y 165px -> 0px (placing photo card under SOFTWARE ENGINEER text)
  // On mobile: moves Y 100px -> 0px (optimally fitted for mobile viewport height)
  const rotateY = useTransform(smoothProgress, [0, 0.65], [0, 180]);
  const scale = useTransform(smoothProgress, [0, 0.65], [0.5, 1.0]);
  const translateYDesktop = useTransform(smoothProgress, [0, 0.65], [165, 0]);
  const translateYMobile = useTransform(smoothProgress, [0, 0.65], [100, 0]);
  const translateY = isMobile ? translateYMobile : translateYDesktop;

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
      className="relative w-full h-[225vh] overflow-x-hidden"
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
            className="relative w-[260px] h-[300px] sm:w-[360px] sm:h-[410px] md:w-[400px] md:h-[456px] rounded-[20px] shadow-2xl cursor-pointer"
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

            {/* BACK FACE: USER'S RED STUDIO PORTRAIT WITH ASCIILENS (Revealed on 180deg scroll flip) */}
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
        <div className="h-screen w-full flex flex-col justify-between items-center px-4 sm:px-12 pt-24 sm:pt-28 pb-8 select-none pointer-events-none">
          {/* Top nav clearance spacer */}
          <div className="h-4 sm:h-6" />

          {/* Center Giant Typography - LAYERED IN FRONT (z-30) AND STRICTLY LEFT-ALIGNED */}
          <div className="relative w-full max-w-5xl mx-auto flex justify-center z-30 pointer-events-none px-2 sm:px-0">
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
                  className="absolute left-0 -top-7 sm:-left-18 md:-left-24 sm:-top-10 md:-top-12 w-10 h-10 sm:w-20 sm:h-20 md:w-28 md:h-28 cursor-grab active:cursor-grabbing z-30 pointer-events-auto"
                  title="Drag 3D Star!"
                >
                  <img
                    src="https://framerusercontent.com/images/OLDYsHB9RMavvQrkVRNy08ZXYE.png?width=2550&height=2550"
                    alt="3D Chrome Star"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </motion.div>

                <h1 className="font-display text-[clamp(36px,10.5vw,56px)] sm:text-[clamp(54px,12.5vw,174px)] font-[800] leading-[0.88] tracking-[-0.04em] text-[#111]">
                  SOFTWARE
                </h1>
              </div>

              {/* Line 2: ENGINEER + 3D Lightning on right */}
              <div className="relative flex items-center -mt-1 sm:-mt-5">
                <h1 className="font-display text-[clamp(36px,10.5vw,56px)] sm:text-[clamp(54px,12.5vw,174px)] font-[800] leading-[0.88] tracking-[-0.04em] text-[#111]">
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
                  className="absolute right-0 -bottom-4 sm:-right-16 md:-right-22 sm:-bottom-6 md:-bottom-8 w-9 h-9 sm:w-18 sm:h-18 md:w-26 md:h-26 rotate-12 cursor-grab active:cursor-grabbing z-30 pointer-events-auto"
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
          <div className="w-full max-w-7xl mx-auto flex justify-between items-end pointer-events-auto px-2 sm:px-0">
            <div className="font-display text-[clamp(28px,6.5vw,96px)] font-[800] text-[#111] leading-none tracking-tight">
              ©2026
            </div>
            <div className="font-mono text-[10px] sm:text-xs md:text-sm text-[#111]/70 uppercase tracking-widest pb-1 sm:pb-2">
              /BUILDING SINCE 2024
            </div>
          </div>
        </div>

        {/* SECTION 2: BIO VIEWPORT */}
        {/* On mobile: min-h-screen with dedicated vertical spacer so sticky 3D card fits between Hey and bio without collision */}
        {/* On desktop: exact 100vh 3-column layout where Left is Hey!, Center is Card, Right is Bio */}
        <div className="min-h-screen md:h-screen w-full flex items-center justify-center px-6 sm:px-12 pointer-events-none py-16 md:py-0">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_420px_1fr] items-center gap-6 md:gap-12 pointer-events-none">
            
            {/* Left Column (Desktop) / Top Section (Mobile): Hey! + Intro sentence */}
            <div className="h-auto md:h-[456px] flex flex-col justify-between items-start text-left pointer-events-auto gap-4 md:gap-0">
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-[#111] leading-none tracking-tight">
                Hey!
              </h2>
              <p className="text-base sm:text-lg md:text-xl font-medium text-[#111] leading-snug tracking-tight max-w-xs sm:max-w-sm">
                I’m Shibani, a software engineer specializing in scalable full-stack web applications and resilient cloud systems.
              </p>
            </div>

            {/* Center Column: SPACER FOR STICKY PHOTO CARD */}
            {/* Mobile: provides 280px-340px vertical clearance so the sticky card flips cleanly without overlapping text */}
            {/* Desktop: 420px wide spacer for 3-column distribution */}
            <div className="w-full h-[280px] sm:h-[340px] md:h-[456px] pointer-events-none" aria-hidden="true" />

            {/* Right Column (Desktop) / Bottom Section (Mobile): Paragraphs + Explore Work link */}
            <div className="h-auto md:h-[456px] flex flex-col justify-between items-start text-left max-w-md pointer-events-auto gap-4 md:gap-0">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base md:text-lg text-black/85 leading-relaxed font-normal">
                  I’m a software engineer and full-stack builder with a strong focus on high-performance web systems, modern user interfaces, and scalable backend architectures.
                </p>
                <p className="text-xs sm:text-sm md:text-base text-black/60 leading-relaxed font-normal">
                  Experienced in designing end-to-end applications, optimizing performance, and building resilient cloud software with clean code and modern frameworks.
                </p>
              </div>

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
