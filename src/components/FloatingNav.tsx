"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, X, ArrowUpRight, Code, Sparkles, Briefcase, Award, Mail } from "lucide-react";

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero", icon: Sparkles },
    { name: "Work", href: "#work", icon: Code },
    { name: "About", href: "#about", icon: Briefcase },
    { name: "Certifications", href: "#certifications", icon: Award },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    <>
      {/* COMPACT FLOATING PILL (EXACT MAJD SPEC: ~160px-200px wide, sleek, non-intrusive) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 bg-[#111111] text-[#faf7f3] px-5 py-2.5 rounded-full shadow-2xl border border-white/10 backdrop-blur-md"
        >
          {/* Brand / Name */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight hover:text-white transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Shibani</span>
          </a>

          <div className="w-px h-4 bg-white/20" />

          {/* Menu Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer text-white/90 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-3.5 h-3.5" /> : <MoreHorizontal className="w-3.5 h-3.5" />}
          </button>
        </motion.div>

        {/* ELEGANT EXPANDED DROPDOWN MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-14 left-1/2 -translate-x-1/2 w-64 bg-[#111111]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl text-white"
            >
              {/* Status Header */}
              <div className="px-3 py-2 border-b border-white/10 mb-2 flex items-center justify-between text-xs">
                <span className="text-white/50 font-mono">STATUS</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Wipro • Open to AI Roles
                </span>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-white/50" />
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Divider & Social CTAs */}
              <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                <a
                  href="https://github.com/Ninjja17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shibani07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-[#eb4d6d]/15 text-[#eb4d6d] hover:bg-[#eb4d6d]/25 transition-colors"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
