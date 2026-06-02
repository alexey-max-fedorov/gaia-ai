// website/components/PageHero.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Background from "@/components/Background";
import { useScramble } from "@/components/useScramble";
import type { Stat } from "@/lib/site";

export default function PageHero({
  kicker,
  title,
  subtitle,
  stats,
  children,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  stats?: Stat[];
  children?: ReactNode; // CTA row
}) {
  const scrambled = useScramble(title);

  return (
    <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <Background brackets scanlines radial="top" />

      {/* Ambient teal glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[420px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(29,211,176,0.10) 0%, rgba(29,211,176,0.02) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-[var(--font-ibm-mono)] text-[9px] md:text-[10px] tracking-[0.45em] text-[#1DD3B0]/55 uppercase mb-5"
        >
          {kicker}
        </motion.p>

        <h1
          aria-label={title}
          className="font-[var(--font-rajdhani)] font-bold tracking-[0.13em] leading-none mb-5"
          style={{
            fontSize: "clamp(3rem, 9vw, 6rem)",
            background:
              "linear-gradient(90deg, #1DD3B0 0%, #7DD3FC 30%, #E8EAF6 52%, #7DD3FC 74%, #1DD3B0 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradient-flow 5s linear infinite",
            filter: "drop-shadow(0 0 28px rgba(29,211,176,0.30))",
          }}
        >
          {scrambled}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 md:w-40 h-px mx-auto mb-6"
          style={{ background: "linear-gradient(90deg, transparent, #1DD3B0, transparent)" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-[var(--font-inter)] text-[#9AA7BE] text-sm md:text-base max-w-xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            {children}
          </motion.div>
        )}

        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px max-w-2xl mx-auto border border-[#1DD3B0]/12 bg-[#1DD3B0]/12"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-[#080C18]/85 px-3 py-4 flex flex-col items-center gap-1">
                <span className="font-[var(--font-rajdhani)] text-2xl md:text-3xl font-bold text-[#1DD3B0] leading-none">
                  {s.value}
                </span>
                <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.25em] text-[#6B7A94] uppercase text-center">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
