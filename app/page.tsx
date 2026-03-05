"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

// ─── Subfunction data ──────────────────────────────────────
const SUBFUNCTIONS = [
  { name: "HEPHAESTUS", color: "#FF8C42", symbol: "⚙" },
  { name: "HADES",      color: "#EF4444", symbol: "☠" },
  { name: "MINERVA",    color: "#60A5FA", symbol: "◈" },
  { name: "AETHER",     color: "#1DD3B0", symbol: "◉" },
  { name: "POSEIDON",   color: "#3B82F6", symbol: "≈" },
  { name: "DEMETER",    color: "#4ADE80", symbol: "⬡" },
  { name: "ARTEMIS",    color: "#F472B6", symbol: "◎" },
  { name: "ELEUTHIA",   color: "#A78BFA", symbol: "⚖" },
  { name: "APOLLO",     color: "#FBBF24", symbol: "◆" },
  { name: "ATHENA",     color: "#E8EAF6", symbol: "⊕" },
];

const ROUTE_ROWS = [
  { label: "CODING & REASONING",    fn: "HEPHAESTUS", color: "#FF8C42" },
  { label: "SECURITY & PENTESTING", fn: "HADES",      color: "#EF4444" },
  { label: "SYSTEM ARCHITECTURE",   fn: "MINERVA",    color: "#60A5FA" },
  { label: "DATA SCIENCE & ML",     fn: "AETHER",     color: "#1DD3B0" },
  { label: "QUANTITATIVE FINANCE",  fn: "POSEIDON",   color: "#3B82F6" },
];

// ─── Scramble text hook ────────────────────────────────────
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

    const t = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [target, delay, duration]);

  return text;
}

// ─── Hex icon cell ─────────────────────────────────────────
function HexCell({ fn, idx }: { fn: typeof SUBFUNCTIONS[0]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, filter: "blur(12px) brightness(5)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
      transition={{ delay: 1.6 + idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.18 }}
      className="flex flex-col items-center gap-1 cursor-pointer group"
    >
      <div
        className="w-11 h-11 md:w-13 md:h-13 flex items-center justify-center text-base md:text-lg font-bold transition-all duration-300"
        style={{
          clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
          backgroundColor: `${fn.color}14`,
          border: `1px solid ${fn.color}50`,
          color: fn.color,
          filter: `drop-shadow(0 0 5px ${fn.color}50)`,
          width: "44px",
          height: "44px",
        }}
      >
        {fn.symbol}
      </div>
      <span
        className="text-[7px] md:text-[8px] font-display font-semibold tracking-[0.2em] opacity-50 group-hover:opacity-90 transition-opacity"
        style={{ color: fn.color }}
      >
        {fn.name}
      </span>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────
export default function Home() {
  const title = useScramble("GAIA AI", 300, 1800);

  return (
    <div className="min-h-screen bg-[#080C18] text-[#E8EAF6] overflow-x-hidden font-[var(--font-inter)]">

      {/* ── HEADER ── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-[#1DD3B0]/10 backdrop-blur-xl bg-[#080C18]/75">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-[var(--font-rajdhani)] text-xl font-bold tracking-[0.22em] text-[#1DD3B0]"
            style={{ textShadow: "0 0 16px rgba(29,211,176,0.6)" }}
          >
            GAIA<span className="opacity-40 mx-1">·</span>AI
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/skills",      label: "SKILLS" },
              { href: "/hephaestus",  label: "HEPHAESTUS" },
              { href: "/get-started", label: "GET STARTED" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative font-[var(--font-rajdhani)] text-xs tracking-[0.3em] text-[#6B7A94] hover:text-[#1DD3B0] transition-colors duration-200 group"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#1DD3B0] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <Link
            href="/get-started"
            className="font-[var(--font-rajdhani)] text-xs tracking-[0.25em] px-4 py-2 border border-[#1DD3B0]/35 text-[#1DD3B0] hover:bg-[#1DD3B0]/10 transition-all duration-200"
          >
            LAUNCH
          </Link>
        </div>
      </header>

      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14">

          {/* Grid bg */}
          <div
            className="absolute inset-0 opacity-100"
            style={{
              backgroundImage: "linear-gradient(rgba(29,211,176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(29,211,176,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Radial hero gradient */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 55% at 50% 42%, #0D2A35 0%, #080C18 80%)" }}
          />

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

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
              opacity: 0.4,
            }}
          />

          {/* Corner brackets */}
          {["top-[72px] left-4", "top-[72px] right-4", "bottom-16 left-4", "bottom-16 right-4"].map((pos, i) => (
            <div
              key={i}
              className={`absolute w-8 h-8 md:w-12 md:h-12 border-[#1DD3B0]/20 border-solid ${
                i === 0 ? "border-l border-t" :
                i === 1 ? "border-r border-t" :
                i === 2 ? "border-l border-b" : "border-r border-b"
              } ${pos}`}
            />
          ))}

          <div className="relative z-10 max-w-5xl mx-auto px-5 flex flex-col items-center text-center gap-0">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 border border-[#1DD3B0]/20 bg-[#1DD3B0]/5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inset-0 rounded-full bg-[#4ADE80] opacity-70" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-[#4ADE80]" />
              </span>
              <span className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#4ADE80]/80 uppercase">
                System Online &middot; v1.0
              </span>
            </motion.div>

            {/* GAIA AI title with scramble + glitch */}
            <div className="relative mb-4 leading-none select-none">
              {/* Main title */}
              <h1
                className="font-[var(--font-rajdhani)] font-bold leading-none tracking-[0.18em]"
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

              {/* Glitch layer 1 (teal, top clip) */}
              <span
                aria-hidden
                className="absolute inset-0 font-[var(--font-rajdhani)] font-bold leading-none tracking-[0.18em] text-[#1DD3B0] opacity-0 pointer-events-none"
                style={{
                  fontSize: "clamp(4.5rem, 16vw, 11rem)",
                  animation: "glitch-1 5s infinite linear",
                  clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
                  left: "-3px",
                }}
              >
                {title}
              </span>

              {/* Glitch layer 2 (orange, bottom clip) */}
              <span
                aria-hidden
                className="absolute inset-0 font-[var(--font-rajdhani)] font-bold leading-none tracking-[0.18em] text-[#FF6B35] opacity-0 pointer-events-none"
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
              Universal AI Orchestrator
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="font-[var(--font-inter)] text-[#6B7A94] text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-10"
            >
              One AI. Ten specialized subfunctions. Built for Perplexity.
              Route any query — code, security, architecture, finance, and more — to its perfect expert.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center gap-3 mb-14"
            >
              <a
                href="https://perplexity.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-8 py-3.5 bg-[#1DD3B0] text-[#080C18] overflow-hidden transition-all duration-300 hover:shadow-[0_0_28px_rgba(29,211,176,0.45)] hzd-btn-sweep"
              >
                <span className="relative z-10 flex items-center gap-2">
                  LAUNCH GAIA AI
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <Link
                href="/skills"
                className="font-[var(--font-rajdhani)] text-sm tracking-[0.3em] px-8 py-3.5 border border-[#1DD3B0]/25 text-[#1DD3B0]/70 hover:bg-[#1DD3B0]/8 hover:border-[#1DD3B0]/55 hover:text-[#1DD3B0] transition-all duration-300"
              >
                EXPLORE SKILLS
              </Link>
            </motion.div>

            {/* Subfunction hex matrix */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="w-full max-w-xl"
            >
              <p className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#6B7A94]/40 uppercase mb-5">
                Active Subfunctions
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {SUBFUNCTIONS.map((fn, i) => (
                  <HexCell key={fn.name} fn={fn} idx={i} />
                ))}
              </div>
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

        {/* ── ROUTING DEMO SECTION ── */}
        <section className="relative py-24 md:py-36 overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "linear-gradient(rgba(29,211,176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(29,211,176,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 max-w-5xl mx-auto px-5">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

              <div>
                <motion.p
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#1DD3B0]/50 uppercase mb-4"
                >
                  // System Architecture
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08, duration: 0.7 }}
                  className="font-[var(--font-rajdhani)] text-4xl md:text-5xl font-bold tracking-[0.1em] text-[#E8EAF6] mb-5 leading-tight"
                >
                  ONE MASTER.<br />
                  <span style={{ color: "#1DD3B0", textShadow: "0 0 20px rgba(29,211,176,0.4)" }}>TEN EXPERTS.</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.16, duration: 0.7 }}
                  className="font-[var(--font-inter)] text-[#6B7A94] leading-relaxed text-sm md:text-base"
                >
                  GAIA AI reads every query and routes it to the right subfunction automatically.
                  No switching. No context loss. One interface, every domain.
                </motion.p>
              </div>

              <div className="space-y-2">
                {ROUTE_ROWS.map((row, i) => (
                  <motion.div
                    key={row.fn}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.55 }}
                    className="flex items-center justify-between px-4 py-3 border border-[#1DD3B0]/10 bg-[#0D1526]/50 hover:border-[#1DD3B0]/30 transition-colors duration-200 group"
                  >
                    <span className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.25em] text-[#6B7A94] group-hover:text-[#E8EAF6] transition-colors">
                      {row.label}
                    </span>
                    <span
                      className="font-[var(--font-rajdhani)] text-xs font-bold tracking-[0.25em]"
                      style={{ color: row.color }}
                    >
                      {row.fn}
                    </span>
                  </motion.div>
                ))}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.35em] text-[#6B7A94]/35 text-center pt-2"
                >
                  + 5 MORE SUBFUNCTIONS — SEE ALL
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BUILT FOR SECTION ── */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#1DD3B0]/40 uppercase mb-5"
            >
              // Deployment
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.7 }}
              className="font-[var(--font-rajdhani)] text-3xl md:text-4xl font-bold tracking-[0.12em] text-[#E8EAF6] mb-4"
            >
              BUILT FOR{" "}
              <span style={{ color: "#1DD3B0" }}>PERPLEXITY SPACES</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="font-[var(--font-inter)] text-[#6B7A94] max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-8"
            >
              Paste one system prompt. Upload ten skill files. GAIA AI handles everything else.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.7 }}
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
                href="https://github.com/alexey-max-fedorov/gaia-ai"
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

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1DD3B0]/8 py-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.35em] text-[#6B7A94]/35 uppercase">
            GAIA AI &middot; v1.0 &middot; Built for Perplexity
          </span>
          <div className="flex items-center gap-6">
            {[
              { href: "/skills", label: "SKILLS" },
              { href: "/hephaestus", label: "HEPHAESTUS" },
              { href: "https://github.com/alexey-max-fedorov/gaia-ai", label: "GITHUB", external: true },
            ].map((l) =>
              l.external ? (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.25em] text-[#6B7A94]/35 hover:text-[#1DD3B0]/55 transition-colors uppercase">
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} href={l.href}
                  className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.25em] text-[#6B7A94]/35 hover:text-[#1DD3B0]/55 transition-colors uppercase">
                  {l.label}
                </Link>
              )
            )}
          </div>
          <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.2em] text-[#6B7A94]/25 uppercase">
            By{" "}
            <a href="https://www.instagram.com/alexeyfedorov._" target="_blank" rel="noopener noreferrer"
              className="hover:text-[#1DD3B0]/55 transition-colors">
              Alexey Fedorov
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
