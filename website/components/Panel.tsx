// website/components/Panel.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Elevated HZD card: filled surface, top gradient hairline, optional corner
 * bracket, hover lift + glow, and a staggered scroll-reveal.
 */
export default function Panel({
  children,
  index = 0,
  className = "",
  eyebrow,
  badge,
  corner = true,
  hover = true,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  eyebrow?: ReactNode;
  badge?: string;
  corner?: boolean;
  hover?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden border border-[#1DD3B0]/15 bg-[#0D1526]/55 p-6 transition-all duration-300 ${
        hover
          ? "hover:-translate-y-1 hover:border-[#1DD3B0]/45 hover:bg-[#0D1526]/80 hover:shadow-[0_10px_40px_-12px_rgba(29,211,176,0.35)]"
          : ""
      } ${className}`}
    >
      {/* Top gradient hairline */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-90 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }}
      />
      {/* Corner bracket */}
      {corner && (
        <div
          aria-hidden
          className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#1DD3B0]/25 group-hover:border-[#1DD3B0]/60 transition-colors duration-300"
        />
      )}
      {badge && (
        <span className="absolute top-4 right-4 font-[var(--font-ibm-mono)] text-[10px] tracking-[0.25em] text-[#1DD3B0]/35">
          {badge}
        </span>
      )}
      {eyebrow && <div className="mb-3">{eyebrow}</div>}
      {children}
    </motion.div>
  );
}
