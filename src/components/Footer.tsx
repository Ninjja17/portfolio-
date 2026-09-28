"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const [clockStr, setClockStr] = useState("15:30:00 GMT+5:30");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const offsetMin = -now.getTimezoneOffset();
      const offsetHours = Math.floor(Math.abs(offsetMin) / 60);
      const sign = offsetMin >= 0 ? "+" : "-";
      setClockStr(`${time} GMT${sign}${offsetHours}:30`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    const email = "shibani8144@gmail.com";
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#0d0d0d] text-white pt-16 sm:pt-28 pb-8 sm:pb-10 px-5 sm:px-12 mt-16 sm:mt-28 rounded-t-[28px] sm:rounded-t-[48px] overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Top 3-Column Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start relative z-10">
          
          {/* Left Column: Bold Headline */}
          <div className="md:col-span-5">
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] max-w-sm">
              Scaling<br />
              Start-ups<br />
              for Growth.
            </h2>
          </div>

          {/* Middle Column: Quick links with White Pill Badges */}
          <div className="md:col-span-4">
            <span className="font-mono text-xs sm:text-sm text-white/50 tracking-normal block mb-3 sm:mb-5 font-normal">
              /Quick links
            </span>
            
            <div className="flex flex-col gap-2 max-w-xs">
              {/* Row 1 */}
              <div className="flex flex-wrap gap-2">
                <a
                  href="#hero"
                  className="bg-white text-[#111] text-xs sm:text-[13px] font-semibold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-white/90 hover:scale-105 transition-all shadow-sm"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="bg-white text-[#111] text-xs sm:text-[13px] font-semibold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-white/90 hover:scale-105 transition-all shadow-sm"
                >
                  About Me
                </a>
                <a
                  href="#certifications"
                  className="bg-white text-[#111] text-xs sm:text-[13px] font-semibold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-white/90 hover:scale-105 transition-all shadow-sm"
                >
                  Services
                </a>
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap gap-2">
                <a
                  href="#work"
                  className="bg-white text-[#111] text-xs sm:text-[13px] font-semibold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-white/90 hover:scale-105 transition-all shadow-sm"
                >
                  Works
                </a>
                <a
                  href="#contact"
                  className="bg-white text-[#111] text-xs sm:text-[13px] font-semibold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-white/90 hover:scale-105 transition-all shadow-sm"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: /Contact */}
          <div className="md:col-span-3">
            <span className="font-mono text-xs sm:text-sm text-white/50 tracking-normal block mb-3 sm:mb-5 font-normal">
              /Contact
            </span>
            
            <div className="flex flex-col gap-1.5 mb-3">
              <button
                onClick={handleCopyEmail}
                className="text-white text-sm sm:text-base font-normal hover:text-white/80 transition-colors text-left group cursor-pointer"
                title="Click to copy email"
              >
                <span className="flex items-center gap-2">
                  <span>shibani8144@gmail.com</span>
                  <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                </span>
              </button>

              <a
                href="mailto:shibani8144@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
              >
                <span>Send direct email</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="flex gap-4 text-xs text-white/50 pt-2 font-medium">
              <a
                href="https://github.com/Ninjja17"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/shibani07"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

        </div>

        {/* Giant Watermark Typography */}
        <div className="w-full overflow-hidden select-none pointer-events-none mt-10 sm:mt-20 -mb-2 sm:-mb-6">
          <h1 className="font-display font-[900] text-[clamp(48px,16vw,260px)] text-white/[0.08] leading-none tracking-[-0.04em] text-center w-full uppercase">
            SHIBANI
          </h1>
        </div>

        {/* Bottom Bar with Clock */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-6 border-t border-white/10 text-[11px] sm:text-xs text-white/40 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Bengaluru, Karnataka, India</span>
            <span>•</span>
            <span className="font-mono text-white/70">{clockStr}</span>
          </div>

          <div>
            <span>©2026 Shibani Pradhan • All rights reserved</span>
          </div>
        </div>

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 bg-[#222] text-[#faf7f3] text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl z-50 flex items-center gap-2 border border-white/20"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Email copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
