"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 px-4 border-t border-black/[0.08]">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex items-center gap-2 mb-3 font-mono text-xs tracking-widest text-black/50 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-black" />
          <span>ACCREDITATIONS & HONORS</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-black text-[#111] tracking-tight mb-14">
          Certifications & Wins
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#f2ede4] border border-black/[0.08] rounded-3xl p-8 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs text-black/50 block mb-6">🏆 HACKATHON WINNER</span>
              <h3 className="font-display text-2xl font-bold text-[#111] tracking-tight mb-3">
                IBM Hackon 2nd Place
              </h3>
              <p className="text-sm text-black/65 leading-relaxed">
                Awarded 2nd Place at HACKON: Agentic AI with IBM Bob & watsonx (Jul 2026) by IBM & Wipro for excellence in AI & cloud innovation.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-black/10 font-mono text-xs text-black/50">
              Issued by IBM & Wipro
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#f2ede4] border border-black/[0.08] rounded-3xl p-8 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs text-black/50 block mb-6">☁️ CLOUD ARCHITECTURE</span>
              <h3 className="font-display text-2xl font-bold text-[#111] tracking-tight mb-3">
                AWS Solutions Architect
              </h3>
              <p className="text-sm text-black/65 leading-relaxed">
                AWS Certified Solutions Architect – Associate (Apr 2026) & AWS Certified Cloud Practitioner (Jun 2025). High-availability cloud systems.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-black/10 font-mono text-xs text-black/50">
              Issued by Amazon Web Services
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#f2ede4] border border-black/[0.08] rounded-3xl p-8 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs text-black/50 block mb-6">🧠 AGENTIC & AI TOOLS</span>
              <h3 className="font-display text-2xl font-bold text-[#111] tracking-tight mb-3">
                Anthropic & Microsoft
              </h3>
              <p className="text-sm text-black/65 leading-relaxed">
                Claude Code 101 Certified by Anthropic (May 2026) & GitHub Copilot Certified by Microsoft (Apr 2026). Generative AI engineering workflows.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-black/10 font-mono text-xs text-black/50">
              Anthropic & Microsoft
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
