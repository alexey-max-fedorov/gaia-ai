// website/components/EngineCard.tsx
"use client";

import { motion } from "framer-motion";
import { Engine } from "@/lib/site";

export default function EngineCard({ engine, index }: { engine: Engine; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.55 }}
      className="group relative p-6 border border-[#1DD3B0]/12 bg-[#0D1526]/50 hover:border-[#1DD3B0]/35 hover:bg-[#0D1526]/70 transition-all duration-200"
    >
      <div className="absolute top-0 left-0 right-0 h-px opacity-25" style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }} />
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-[var(--font-rajdhani)] text-lg font-bold tracking-[0.15em] text-[#E8EAF6] group-hover:text-[#1DD3B0] transition-colors">
          {engine.name}
        </span>
        <span className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.25em] text-[#1DD3B0]/35">{engine.n}</span>
      </div>
      <p className="font-[var(--font-ibm-mono)] text-[10px] tracking-[0.2em] uppercase text-[#1DD3B0]/60 mb-2">{engine.tagline}</p>
      <p className="font-[var(--font-inter)] text-xs text-[#6B7A94] leading-relaxed">{engine.body}</p>
    </motion.div>
  );
}
