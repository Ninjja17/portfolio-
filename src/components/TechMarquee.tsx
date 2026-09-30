"use client";

import React from "react";
import { Marquee } from "./ui/Marquee";
import { Network, Sparkles, Activity } from "lucide-react";

interface SkillItem {
  name: string;
  category: string;
  iconSlug?: string;
  customIcon?: React.ReactNode;
}

const trackOneSkills: SkillItem[] = [
  { name: "Spring AI", category: "Agentic Systems", iconSlug: "spring" },
  { name: "LangChain / LangGraph", category: "Agent Workflows", iconSlug: "ai" },
  { 
    name: "Model Context Protocol (MCP)", 
    category: "Protocol Spec", 
    customIcon: (
      <div className="w-5 h-5 rounded-[5px] bg-[#111] flex items-center justify-center text-cyan-400">
        <Network className="w-3.5 h-3.5" />
      </div>
    )
  },
  { name: "FastAPI", category: "Async Microservices", iconSlug: "fastapi" },
  { name: "RAG Architectures", category: "Semantic Retrieval", iconSlug: "ai" },
  { name: "Vector DBs (ChromaDB, pgvector)", category: "Embeddings", iconSlug: "postgres" },
  { name: "Function Calling / Tool Use", category: "Autonomous LLMs", iconSlug: "bash" },
  { name: "Spring Boot", category: "Enterprise Backend", iconSlug: "spring" },
  { 
    name: "WebSockets", 
    category: "Real-time Telemetry", 
    customIcon: (
      <div className="w-5 h-5 rounded-[5px] bg-[#111] flex items-center justify-center text-emerald-400">
        <Activity className="w-3.5 h-3.5" />
      </div>
    )
  },
  { name: "REST API", category: "API Architecture", iconSlug: "postman" },
];

const trackTwoSkills: SkillItem[] = [
  { name: "Java", category: "Enterprise OOP", iconSlug: "java" },
  { name: "Python", category: "AI & Scripting", iconSlug: "py" },
  { name: "AWS Cloud", category: "Cloud Infrastructure", iconSlug: "aws" },
  { name: "Docker", category: "Containerization", iconSlug: "docker" },
  { name: "Next.js", category: "Full-Stack Web", iconSlug: "nextjs" },
  { name: "React", category: "Reactive UI", iconSlug: "react" },
  { name: "PostgreSQL / SQL", category: "Relational DB", iconSlug: "postgres" },
  { name: "Tailwind CSS", category: "Design Systems", iconSlug: "tailwind" },
  { name: "Maven", category: "Build Tooling", iconSlug: "maven" },
  { name: "Git", category: "Version Control", iconSlug: "git" },
  { name: "GitHub", category: "DevOps & Collab", iconSlug: "github" },
  { name: "HTML5", category: "Semantic Markup", iconSlug: "html" },
  { name: "CSS3", category: "Modern Styling", iconSlug: "css" },
];

function SkillPill({ skill }: { skill: SkillItem }) {
  return (
    <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f2ede4] border border-black/[0.08] hover:border-black/30 hover:bg-white text-[#111] transition-all duration-300 shadow-xs hover:shadow-md hover:scale-105 shrink-0 select-none group/item cursor-pointer">
      {/* Skill Icon from skillicons.dev */}
      {skill.iconSlug ? (
        <img
          src={`https://skillicons.dev/icons?i=${skill.iconSlug}`}
          alt={`${skill.name} icon`}
          width={22}
          height={22}
          loading="lazy"
          className="w-[22px] h-[22px] rounded-[5px] shrink-0 object-contain shadow-xs group-hover/item:scale-110 transition-transform"
        />
      ) : (
        skill.customIcon
      )}

      {/* Skill Name */}
      <span className="font-mono text-xs font-semibold tracking-tight text-[#111]">
        {skill.name}
      </span>

      {/* Category Chip */}
      <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/[0.04] text-black/50 group-hover/item:text-black group-hover/item:bg-black/[0.08] transition-colors">
        {skill.category}
      </span>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section 
      id="skills" 
      aria-label="Technical Skills Arsenal"
      className="relative py-10 sm:py-14 border-y border-black/[0.08] bg-[#f2ede4]/30 overflow-hidden"
    >
      {/* Edge gradient fade masks (Linear / Inspira UI style) */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-44 z-20 bg-gradient-to-r from-[#faf7f3] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-44 z-20 bg-gradient-to-l from-[#faf7f3] to-transparent" />

      {/* Header Eyebrow */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-black/60">
            TECHNICAL ARSENAL & CORE STACK
          </span>
        </div>
        <span className="font-mono text-[10px] sm:text-xs text-black/45 italic">
          Hover to pause ticker • Powered by Skill Icons
        </span>
      </div>

      {/* Marquee Tracks */}
      <div className="flex flex-col gap-3.5 sm:gap-4 relative z-10">
        {/* Track 1: Moving Right (Reverse) */}
        <Marquee speed={36} reverse pauseOnHover repeat={4} className="py-1">
          {trackOneSkills.map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </Marquee>

        {/* Track 2: Moving Left (Normal) */}
        <Marquee speed={40} pauseOnHover repeat={4} className="py-1">
          {trackTwoSkills.map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}