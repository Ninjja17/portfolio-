"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, ShieldAlert, Cpu, Activity, CheckCircle2 } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface ScreenshotView {
  id: string;
  label: string;
  tag: string;
  image: string;
  caption: string;
  description: string;
}

const screenshotViews: ScreenshotView[] = [
  {
    id: "overview",
    label: "Platform Overview",
    tag: "Workflow Builder",
    image: "/square-hero.png",
    caption: "Natural Language Workflow Interface",
    description: "Describe any business workflow in plain English to automatically synthesize multi-agent teams with role specialization and tool bindings.",
  },
  {
    id: "simulation",
    label: "Stress Simulation",
    tag: "Chaos Engine",
    image: "/square-simulation.png",
    caption: "Adverse Multi-Scenario Stress Testing Matrix",
    description: "Evaluates multi-agent resilience across 6 real-world scenarios: Happy Path, Agent Failure, Wrong Decision, 3x High Load, System Outage, and Human Intervention.",
  },
  {
    id: "workflow",
    label: "Agent Generation",
    tag: "Team Architecture",
    image: "/square-workflow.png",
    caption: "Multi-Agent Topology & Specialized Roles",
    description: "Automated generation of dedicated agent cards with individual system instructions, schema-validated tool access, and graph dependencies.",
  },
  {
    id: "live",
    label: "Live Playback",
    tag: "Telemetry Trace",
    image: "/square-live.png",
    caption: "Step-by-Step Live Execution & Telemetry",
    description: "Interactive real-time execution trace monitoring agent-to-agent message passing, latency SLAs, token expenditure, and recovery fallbacks.",
  },
];

const pillars = [
  {
    number: "01",
    icon: Cpu,
    title: "Natural Language Workflow Parser",
    desc: "Transforms plain-English requirements into directed acyclic graphs (DAGs), assigning specialized agent roles, system prompts, and tool interfaces.",
    tech: ["Groq Llama 3.3 70B", "FastAPI", "Prompt Synthesis"],
  },
  {
    number: "02",
    icon: ShieldAlert,
    title: "Adverse Stress Simulation Matrix",
    desc: "Subjects agent teams to synthetic chaos engineering — testing timeouts, hallucinations, external outages, and concurrency spikes before production.",
    tech: ["IBM watsonx", "Chaos Testing", "Python 3.11+"],
  },
  {
    number: "03",
    icon: Activity,
    title: "Live Telemetry & Readiness Scorecard",
    desc: "Real-time step playback of agent-to-agent communication, token spend estimation, latency metrics, and executive production readiness rating.",
    tech: ["Next.js 14", "PostgreSQL", "TailwindCSS"],
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const currentView = screenshotViews.find((v) => v.id === activeTab) || screenshotViews[0];

  return (
    <section id="work" className="py-28 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3 font-mono text-xs tracking-widest text-black/50 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span>PORTFOLIO & PRODUCTIONS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#111] tracking-tight">
              Featured Work
            </h2>
          </div>
          <span className="font-mono text-sm text-black/50">( 01 )</span>
        </div>

        {/* Flagship Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#f2ede4] border border-black/[0.08] p-6 sm:p-10 flex flex-col gap-8 shadow-sm"
        >
          {/* Top Meta & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold px-3 py-1 rounded-full bg-[#111] text-[#faf7f3]">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                🏆 2nd Place Winner @ HACKON
              </span>
              <span className="font-mono text-xs text-black/70 bg-black/[0.05] border border-black/[0.06] px-3 py-1 rounded-full">
                Built by Shibani With IBM BoB
              </span>
              <span className="font-mono text-xs text-black/50 bg-black/[0.03] px-3 py-1 rounded-full hidden sm:inline-block">
                Agentic AI • 2026
              </span>
            </div>

            {/* Quick External Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Ninjja17/SQUARE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-black/75 hover:text-black transition-colors px-3 py-1.5 rounded-lg hover:bg-black/[0.05]"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-black/40" />
              </a>
              <a
                href="https://square-beryl.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#faf7f3] bg-[#111] hover:bg-black transition-all px-3.5 py-1.5 rounded-lg shadow-sm hover:scale-105"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Project Title & Overview */}
          <div className="space-y-3">
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#111] tracking-tight">
              SQUARE
            </h3>
            <p className="font-mono text-sm sm:text-base text-black/70 font-medium italic">
              &ldquo;Describe your workflow. We&apos;ll build the AI workforce.&rdquo;
            </p>
            <p className="text-base sm:text-lg text-black/75 leading-relaxed max-w-4xl">
              Enterprise Agent Engineering &amp; Governance Platform that converts plain-English business workflows into validated, risk-scored, cost-analyzed, and production-ready multi-agent teams. Features adverse stress simulation across 6 failure modes to guarantee reliability before touching production.
            </p>
          </div>

          {/* Screenshot Switcher Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {screenshotViews.map((view) => {
              const isActive = activeTab === view.id;
              return (
                <button
                  key={view.id}
                  onClick={() => setActiveTab(view.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
                    isActive
                      ? "bg-[#111] text-[#faf7f3] shadow-md"
                      : "bg-black/[0.04] text-black/65 hover:bg-black/[0.08] hover:text-black"
                  }`}
                >
                  <span>{view.label}</span>
                  {isActive && (
                    <span className="ml-2 text-[10px] uppercase font-bold text-amber-300">
                      • {view.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Preview with Hover Pill */}
          <div className="relative rounded-2xl overflow-hidden border border-black/[0.1] bg-black/[0.02] shadow-inner">
            <a
              href="https://square-beryl.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentView.id}
                  src={currentView.image}
                  alt={currentView.caption}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                />
              </AnimatePresence>

              {/* Floating Live Pill */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Project Screenshot</span>
              </div>

              {/* Hover Pill CTA */}
              <div className="absolute bottom-5 right-5 bg-[#111] text-[#faf7f3] text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-2xl border border-white/20">
                <span>Open Live Platform</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

            {/* View Caption & Subtext */}
            <div className="p-4 sm:p-5 bg-black/[0.03] border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-display text-sm sm:text-base font-bold text-[#111]">
                  {currentView.caption}
                </h4>
                <p className="text-xs sm:text-sm text-black/65 mt-0.5">
                  {currentView.description}
                </p>
              </div>
              <a
                href="https://square-beryl.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-semibold text-black/80 hover:text-black flex items-center gap-1 shrink-0 underline underline-offset-4"
              >
                <span>square-beryl.vercel.app</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Technical Architecture Breakdown */}
          <div className="pt-4 border-t border-black/[0.08]">
            <div className="flex items-center gap-2 mb-6 font-mono text-xs tracking-wider text-black/50 uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 text-black" />
              <span>CORE ARCHITECTURAL MODULES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.number}
                    className="p-5 rounded-2xl bg-[#ece6db]/60 border border-black/[0.06] flex flex-col justify-between gap-4 hover:border-black/[0.15] transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-black/40">
                          {pillar.number}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-black/[0.05] flex items-center justify-center">
                          <Icon className="w-4 h-4 text-black/80" />
                        </div>
                      </div>
                      <h4 className="font-display text-base font-bold text-[#111] leading-snug">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-black/70 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-2 border-t border-black/[0.06]">
                      {pillar.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] text-black/60 bg-black/[0.04] px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full Tech Stack Footer Tags */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08]">
            <div className="flex flex-wrap gap-1.5">
              {[
                "Next.js 14 (App Router)",
                "FastAPI (Python 3.11+)",
                "IBM watsonx Orchestrate",
                "Groq Llama 3.3 70B",
                "Multi-Agent Simulation",
                "PostgreSQL",
                "TailwindCSS",
                "Framer Motion",
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] text-black/65 bg-black/[0.04] border border-black/[0.06] px-2.5 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Ninjja17/SQUARE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111] text-white text-xs font-semibold hover:bg-black transition-all hover:scale-105 shadow-md"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Explore Source Code</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </motion.div>

        {/* GitHub Explorer Link */}
        <div className="mt-14 flex justify-center">
          <a
            href="https://github.com/Ninjja17"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#111] text-white text-sm font-semibold hover:bg-black transition-all hover:scale-105 shadow-xl group"
          >
            <span>Explore Ninjja17 on GitHub</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
