"use client";

import React from "react";
import { Marquee } from "./ui/Marquee";
import { Network, Activity } from "lucide-react";

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
    <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#8799fb]/30 hover:border-[#8799fb]/80 hover:bg-white text-[#111] transition-all duration-300 shadow-xs hover:shadow-md hover:scale-105 shrink-0 select-none group/item cursor-pointer">
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
      <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#8799fb]/10 text-[#4353b3] group-hover/item:text-[#25327b] group-hover/item:bg-[#8799fb]/20 transition-colors">
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
      className="relative py-10 sm:py-14 border-y border-[#8799fb]/25 bg-white/[0.22] backdrop-blur-[4px] overflow-hidden"
    >
      {/* Header Eyebrow */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8799fb] animate-pulse" />
          <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#242b58]">
            TECHNICAL ARSENAL & CORE STACK
          </span>
        </div>
        <span className="font-mono text-[10px] sm:text-xs text-[#3a4478]/70 italic">
          Hover to pause ticker &bull; Powered by Skill Icons
        </span>
      </div>

      {/* Marquee Tracks with CSS Mask fade edges */}
      <div className="flex flex-col gap-3.5 sm:gap-4 relative z-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
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