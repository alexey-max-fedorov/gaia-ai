"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import GlitchLogo from "@/components/GlitchLogo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import SectionLabel from "@/components/SectionLabel";
import EngineCard from "@/components/EngineCard";
import { ENGINES, INTEGRATIONS, RELIABILITY, URLS } from "@/lib/site";

function useScramble(target: string, delay = 400, duration = 1800) {
  const [text, setText] = useState("");
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&";

  useEffect(() => {
    let raf: number;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const resolved = Math.floor(progress * target.length);

      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (target[i] === " ") { out += " "; continue; }
        out += i < resolved
          ? target[i]
          : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setText(out);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setText(target);
    };

    const t = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [target, delay, duration]);

  return text;
}

export default function Home() {
  const title = useScramble("GAIA CODE", 300, 1800);

  return (
    <div className="min-h-screen text-[#E8EAF6] overflow-x-hidden font-[var(--font-inter)]">
      <Header />
      <main className="pt-14">

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14">

          <Background brackets scanlines radial="center" />

          {/* Ambient teal glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(29,211,176,0.07) 0%, rgba(29,211,176,0.02) 45%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-5 flex flex-col items-center text-center gap-0">

            {/* Title with scramble + glitch */}
            <div className="relative mb-4 leading-none select-none">
              <h1
                className="font-horizon font-bold leading-none tracking-[0.18em]"
                style={{
                  fontSize: "clamp(4.5rem, 16vw, 11rem)",
                  background: "linear-gradient(90deg, #1DD3B0 0%, #7DD3FC 28%, #E8EAF6 50%, #7DD3FC 72%, #1DD3B0 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-flow 5s linear infinite",
                  filter: "drop-shadow(0 0 35px rgba(29,211,176,0.45))",
                }}
              >
                {title}
              </h1>
              <span
                aria-hidden
                className="absolute inset-0 font-horizon font-bold leading-none tracking-[0.18em] text-[#1DD3B0] opacity-0 pointer-events-none"
                style={{
                  fontSize: "clamp(4.5rem, 16vw, 11rem)",
                  animation: "glitch-1 5s infinite linear",
                  clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
                  left: "-3px",
                }}
              >
                {title}
              </span>
              <span
                aria-hidden
                className="absolute inset-0 font-horizon font-bold leading-none tracking-[0.18em] text-[#FF6B35] opacity-0 pointer-events-none"
                style={{
                  fontSize: "clamp(4.5rem, 16vw, 11rem)",
                  animation: "glitch-2 5s infinite linear",
                  clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                  left: "3px",
                }}
              >
                {title}
              </span>
            </div>

            {/* Ruled line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-40 md:w-64 h-px mb-5"
              style={{ background: "linear-gradient(90deg, transparent, #1DD3B0, transparent)" }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.7 }}
              className="font-[var(--font-exo2)] text-xs md:text-sm tracking-[0.55em] uppercase text-[#1DD3B0]/60 mb-3"
            >
              AI Coding Engine · Built for Perplexity
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="font-[var(--font-inter)] text-[#6B7A94] text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-10"
            >
              Plan Mode, persistent memory, and a full Claude Code workflow — all inside a Perplexity Space. Four prompt files. One Space. Start building.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center gap-3 mb-16"
            >
              <a
                href={URLS.space}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-8 py-3.5 bg-[#1DD3B0] text-[#080C18] overflow-hidden transition-all duration-300 hover:shadow-[0_0_28px_rgba(29,211,176,0.45)] hzd-btn-sweep"
              >
                <span className="relative z-10 flex items-center gap-2">
                  LAUNCH GAIA CODE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <Link
                href="/get-started"
                className="font-[var(--font-rajdhani)] text-sm tracking-[0.3em] px-8 py-3.5 border border-[#1DD3B0]/25 text-[#1DD3B0]/70 hover:bg-[#1DD3B0]/8 hover:border-[#1DD3B0]/55 hover:text-[#1DD3B0] transition-all duration-300"
              >
                DEPLOYMENT INSTRUCTIONS
              </Link>
            </motion.div>

            {/* GAIA logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.7 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#6B7A94]/40 uppercase">
                System Active
              </p>
              <GlitchLogo name="GAIA" size={72} />
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 1 }}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          >
            <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.5em] text-[#6B7A94]/35 uppercase">Scroll</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#1DD3B0]/25 animate-bounce" />
          </motion.div>
        </section>

        {/* ── ENGINES BENTO ── */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <Background radial="none" />
          <div className="relative z-10 max-w-5xl mx-auto px-5">
            <SectionLabel className="mb-4">// Four engines</SectionLabel>
            <h2 className="font-[var(--font-rajdhani)] text-4xl md:text-5xl font-bold tracking-[0.1em] text-[#E8EAF6] mb-3 leading-tight">
              NOT A PROMPT. <span style={{ color: "#1DD3B0", textShadow: "0 0 20px rgba(29,211,176,0.4)" }}>A SYSTEM.</span>
            </h2>
            <p className="font-[var(--font-inter)] text-[#6B7A94] text-sm md:text-base max-w-xl leading-relaxed mb-10">
              v3 splits GAIA Code into four prompt files that drive four engines — so it remembers, plans, paces itself, and runs your skills.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {ENGINES.map((e, i) => <EngineCard key={e.id} engine={e} index={i} />)}
            </div>
            <div className="mt-3 p-6 border border-[#1DD3B0]/12 bg-[#0D1526]/40">
              <span className="font-[var(--font-rajdhani)] text-lg font-bold tracking-[0.15em] text-[#E8EAF6]">{INTEGRATIONS[0].name}</span>
              <p className="font-[var(--font-inter)] text-xs text-[#6B7A94] leading-relaxed mt-2">{INTEGRATIONS[0].body}</p>
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURE TEASER ── */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5 text-center">
            <SectionLabel className="mb-5">// Architecture</SectionLabel>
            <h2 className="font-[var(--font-rajdhani)] text-3xl md:text-4xl font-bold tracking-[0.12em] text-[#E8EAF6] mb-4">
              ONE GATE. <span style={{ color: "#1DD3B0" }}>THREE ENGINES.</span>
            </h2>
            <p className="font-[var(--font-inter)] text-[#6B7A94] max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-8">
              Paste SYSTEM_INSTRUCTIONS.md into the Space, upload the three engine files, and GAIA wires itself up. See exactly how it fits together.
            </p>
            <Link href="/architecture" className="group font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-7 py-3 border border-[#1DD3B0]/35 text-[#1DD3B0] hover:bg-[#1DD3B0]/10 transition-all duration-200 inline-flex items-center gap-2">
              SEE THE ARCHITECTURE
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* ── RELIABILITY STRIP ── */}
        <section className="relative py-12 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-2 gap-6">
            {RELIABILITY.map((r) => (
              <div key={r.title}>
                <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.12em] text-[#E8EAF6] mb-1.5">{r.title}</h3>
                <p className="font-[var(--font-inter)] text-xs text-[#6B7A94] leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DEPLOY CTA ── */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-[var(--font-inter)] text-[#6B7A94] max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-8"
            >
              Four files in, GAIA Code handles the rest — memory, planning, and clean commits.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link
                href="/get-started"
                className="group font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-7 py-3 border border-[#1DD3B0]/35 text-[#1DD3B0] hover:bg-[#1DD3B0]/10 transition-all duration-200 flex items-center gap-2"
              >
                GET STARTED
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={URLS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[var(--font-rajdhani)] text-sm tracking-[0.3em] text-[#6B7A94] hover:text-[#E8EAF6] transition-colors"
              >
                VIEW ON GITHUB
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
