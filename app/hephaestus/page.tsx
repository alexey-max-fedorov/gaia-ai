"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DEMO_URL =
  "https://www.perplexity.ai/spaces/hephaestus-code-public-djO4mFs7Rhm19vzo4JIajg";

const FEATURES = [
  {
    id: "01",
    title: "PLAN MODE",
    description:
      "Every significant task starts with a structured plan: files to create or modify, ordered steps, dependencies, and open questions. You approve before a single line is written.",
  },
  {
    id: "02",
    title: "GITHUB MCP",
    description:
      "Direct GitHub integration via the MCP protocol. Read repos, create branches, push files, open pull requests, review diffs, and manage issues — all within the conversation.",
  },
  {
    id: "03",
    title: "TASK TRACKING",
    description:
      "Live checkbox-based task lists. Every commit is acknowledged. Every step is confirmed before moving forward. Nothing is silently skipped or batched without approval.",
  },
  {
    id: "04",
    title: "IMPLEMENTATION RULES",
    description:
      "Never skips Plan Mode for significant changes. Explicit confirmation before destructive operations. Atomic commits with meaningful messages. Clear rollback procedures.",
  },
];

const CAPABILITIES = [
  "Next.js, React, TypeScript",
  "Python, FastAPI, Django",
  "Database design & migrations",
  "REST & GraphQL APIs",
  "Docker & deployment configs",
  "Test writing & CI setup",
  "Code review & refactoring",
  "Debugging & root cause analysis",
];

export default function HephaestusPage() {
  return (
    <div className="min-h-screen bg-[#080C18] text-[#E8EAF6] overflow-x-hidden">
      <Header />

      <main className="pt-14">
        {/* ── HERO ── */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,140,66,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,66,0.035) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, #2A1508 0%, #080C18 80%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,140,66,0.10) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-5">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
              {/* Hex icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.4, filter: "blur(14px) brightness(6)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0 flex items-center justify-center text-5xl md:text-6xl"
                style={{
                  width: "100px",
                  height: "100px",
                  clipPath:
                    "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                  backgroundColor: "rgba(255,140,66,0.10)",
                  border: "1px solid rgba(255,140,66,0.40)",
                  color: "#FF8C42",
                  filter: "drop-shadow(0 0 22px rgba(255,140,66,0.55))",
                }}
              >
                ⚙
              </motion.div>

              <div>
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] uppercase mb-3"
                  style={{ color: "rgba(255,140,66,0.5)" }}
                >
                  // Coding Engine
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="font-[var(--font-rajdhani)] text-5xl md:text-7xl font-bold tracking-[0.15em] mb-2"
                  style={{
                    color: "#FF8C42",
                    textShadow:
                      "0 0 40px rgba(255,140,66,0.55), 0 0 80px rgba(255,140,66,0.2)",
                  }}
                >
                  HEPHAESTUS
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="font-[var(--font-exo2)] text-sm tracking-[0.3em] text-[#6B7A94] uppercase"
                >
                  Claude Code &middot; In Perplexity
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="h-px mt-10"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,140,66,0.6), rgba(255,140,66,0.12), transparent)",
              }}
            />
          </div>
        </section>

        {/* ── DESCRIPTION + CAPABILITIES ── */}
        <section className="pb-20 md:pb-24">
          <div className="max-w-5xl mx-auto px-5">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              <div>
                <motion.p
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="font-[var(--font-inter)] text-[#6B7A94] leading-relaxed text-sm md:text-base mb-5"
                >
                  HEPHAESTUS is the coding engine behind GAIA AI. When you ask GAIA to write,
                  debug, review, or reason about code, HEPHAESTUS takes over — bringing the
                  full workflow of Claude Code into a Perplexity Space.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08, duration: 0.7 }}
                  className="font-[var(--font-inter)] text-[#6B7A94] leading-relaxed text-sm md:text-base mb-8"
                >
                  It operates with the GitHub MCP server as a first-class tool: it reads your
                  repo, plans the implementation, pushes commits, and opens PRs — all without
                  you leaving the chat.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.16, duration: 0.7 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-xs tracking-[0.3em] font-bold px-5 py-2.5 border hover:opacity-90 transition-all duration-200"
                    style={{
                      color: "#FF8C42",
                      borderColor: "rgba(255,140,66,0.35)",
                      backgroundColor: "rgba(255,140,66,0.06)",
                    }}
                  >
                    OPEN LIVE DEMO
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <Link
                    href="/get-started"
                    className="inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-xs tracking-[0.3em] px-5 py-2.5 border border-[#1DD3B0]/25 text-[#1DD3B0] hover:bg-[#1DD3B0]/8 transition-all duration-200"
                  >
                    DEPLOY IN YOUR SPACE
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </motion.div>
              </div>

              <div>
                <motion.p
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.4em] uppercase mb-4"
                  style={{ color: "rgba(255,140,66,0.5)" }}
                >
                  Capabilities
                </motion.p>
                <div className="space-y-1.5">
                  {CAPABILITIES.map((cap, i) => (
                    <motion.div
                      key={cap}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="flex items-center gap-3 py-2 px-3 border border-[#FF8C42]/10 hover:border-[#FF8C42]/28 transition-colors group"
                      style={{ backgroundColor: "rgba(255,140,66,0.03)" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full shrink-0 opacity-55 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: "#FF8C42" }}
                      />
                      <span className="font-[var(--font-ibm-mono)] text-[10px] tracking-[0.2em] text-[#6B7A94] group-hover:text-[#E8EAF6] transition-colors">
                        {cap}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WORKFLOW FEATURES ── */}
        <section
          className="relative py-20 md:py-28 border-t"
          style={{ borderColor: "rgba(255,140,66,0.10)" }}
        >
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,140,66,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,66,0.035) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 max-w-5xl mx-auto px-5">
            <div className="text-center mb-12">
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] uppercase mb-3"
                style={{ color: "rgba(255,140,66,0.45)" }}
              >
                // How It Works
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="font-[var(--font-rajdhani)] text-3xl md:text-4xl font-bold tracking-[0.12em]"
                style={{
                  color: "#FF8C42",
                  textShadow: "0 0 22px rgba(255,140,66,0.35)",
                }}
              >
                THE FORGE WORKFLOW
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="relative p-6 border group transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(13,21,38,0.55)",
                    borderColor: "rgba(255,140,66,0.12)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,140,66,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,140,66,0.12)";
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,140,66,0.5), transparent)",
                    }}
                  />
                  <span
                    className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.3em] mb-3 block opacity-45"
                    style={{ color: "#FF8C42" }}
                  >
                    {f.id}
                  </span>
                  <h3
                    className="font-[var(--font-rajdhani)] text-xl font-bold tracking-[0.18em] mb-3"
                    style={{ color: "#FF8C42" }}
                  >
                    {f.title}
                  </h3>
                  <p className="font-[var(--font-inter)] text-xs text-[#6B7A94] leading-relaxed">
                    {f.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-20 md:py-24 border-t"
          style={{ borderColor: "rgba(255,140,66,0.08)" }}
        >
          <div className="max-w-5xl mx-auto px-5 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-[var(--font-rajdhani)] text-3xl md:text-4xl font-bold tracking-[0.12em] text-[#E8EAF6] mb-4"
            >
              HEPHAESTUS IS PART OF{" "}
              <span
                style={{
                  color: "#1DD3B0",
                  textShadow: "0 0 18px rgba(29,211,176,0.4)",
                }}
              >
                GAIA AI
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-[var(--font-inter)] text-[#6B7A94] text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed"
            >
              Get the full system — Hephaestus plus nine other specialized subfunctions —
              in one Perplexity Space.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link
                href="/get-started"
                className="group inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-8 py-3.5 bg-[#1DD3B0] text-[#080C18] hover:shadow-[0_0_28px_rgba(29,211,176,0.45)] transition-all duration-300 hzd-btn-sweep"
              >
                GET STARTED
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/skills"
                className="font-[var(--font-rajdhani)] text-sm tracking-[0.3em] text-[#6B7A94] hover:text-[#E8EAF6] transition-colors"
              >
                EXPLORE ALL SKILLS
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
