"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Cpu, Users, ShieldAlert, Activity, CheckCircle2 } from "lucide-react";

export function SquareArchitectureGraph() {
  const [activeNode, setActiveNode] = useState<string>("orchestrator");

  const nodes = [
    {
      id: "input",
      title: "Natural Language Spec",
      role: "Workflow Input",
      badge: "Llama 3.3",
      icon: MessageSquare,
      desc: "Plain-English workflow prompt parsed into structured task intent and directed acyclic graph dependencies.",
      status: "Active Stream",
    },
    {
      id: "orchestrator",
      title: "SQUARE Orchestrator",
      role: "Core DAG Engine",
      badge: "FastAPI / Python",
      icon: Cpu,
      desc: "Synthesizes multi-agent topologies, generates tailored system prompts, and binds strict tool schemas.",
      status: "99.8% Efficiency",
    },
    {
      id: "agents",
      title: "Agent Swarm Team",
      role: "Specialized Roles",
      badge: "Planner + Coder + Critic",
      icon: Users,
      desc: "Autonomous agents collaborate via structured message passing and shared persistent context state.",
      status: "3 Active Agents",
    },
    {
      id: "chaos",
      title: "Chaos Engine",
      role: "watsonx Resilience",
      badge: "6 Adverse Scenarios",
      icon: ShieldAlert,
      desc: "Simulates agent crashes, hallucinations, timeouts, and network partitions before production release.",
      status: "Pass (0.02% Failure)",
    },
    {
      id: "telemetry",
      title: "Live Telemetry",
      role: "SLA & Scorecard",
      badge: "Next.js + Postgres",
      icon: Activity,
      desc: "End-to-end token expenditure, step replay, latency tracking, and executive readiness certification.",
      status: "Production Verified",
    },
  ];

  const activeInfo = nodes.find((n) => n.id === activeNode) || nodes[1];

  return (
    <div className="w-full rounded-2xl bg-[#ece6db]/70 border border-black/[0.08] p-4 sm:p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-black/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-black/75">
            Interactive Multi-Agent Telemetry Graph
          </span>
        </div>
        <span className="font-mono text-[11px] text-black/60 bg-black/[0.04] px-2.5 py-1 rounded-md">
          Live Data Flow • Inspira Animated Beam
        </span>
      </div>

      {/* Nodes Pipeline */}
      <div className="relative py-2">
        {/* Animated Connecting Beams (SVG) */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 pointer-events-none z-0">
          <svg className="w-full h-12 -mt-5" preserveAspectRatio="none" viewBox="0 0 800 40">
            {/* Base dashed line */}
            <line x1="40" y1="20" x2="760" y2="20" stroke="rgba(0,0,0,0.12)" strokeWidth="2" strokeDasharray="4 4" />
            {/* Animated glowing beam pulses */}
            <motion.line
              x1="40"
              y1="20"
              x2="760"
              y2="20"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 160, strokeDasharray: "40 120" }}
              animate={{ strokeDashoffset: -160 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative z-10">
          {nodes.map((node) => {
            const Icon = node.icon;
            const isSelected = activeNode === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                  isSelected
                    ? "bg-[#111] text-[#faf7f3] border-black shadow-lg scale-[1.02]"
                    : "bg-white/80 hover:bg-white text-black/80 border-black/[0.08] hover:border-black/20 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? "bg-white/10 text-emerald-300" : "bg-black/[0.05] text-black"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                      isSelected ? "bg-emerald-400/20 text-emerald-300" : "bg-black/[0.04] text-black/60"
                    }`}
                  >
                    {node.badge}
                  </span>
                </div>

                <div>
                  <div
                    className={`font-mono text-[10px] uppercase tracking-wider ${
                      isSelected ? "text-white/60" : "text-black/50"
                    }`}
                  >
                    {node.role}
                  </div>
                  <div className="font-display font-bold text-xs sm:text-sm mt-0.5">
                    {node.title}
                  </div>
                </div>

                <div
                  className={`text-[10px] font-mono flex items-center gap-1.5 pt-2 border-t ${
                    isSelected ? "border-white/15 text-emerald-400" : "border-black/[0.06] text-black/60"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{node.status}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Inspector Details */}
      <div className="mt-4 p-4 rounded-xl bg-white/70 border border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#111] text-emerald-400 flex items-center justify-center shrink-0">
            <activeInfo.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm text-[#111]">{activeInfo.title}</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/[0.06] text-black/70">
                {activeInfo.badge}
              </span>
            </div>
            <p className="text-xs text-black/70 mt-0.5">{activeInfo.desc}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>SLA Verified</span>
          </span>
        </div>
      </div>
    </div>
  );
}
