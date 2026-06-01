"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Copy, Check, ArrowRight, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GITHUB_URL = "https://github.com/alexey-max-fedorov/gaia-ai";
const PERPLEXITY_URL = "https://www.perplexity.ai";
const RAW_BASE = "https://raw.githubusercontent.com/alexey-max-fedorov/gaia-ai/refs/heads/master";

function CopyButton({ getText, label = "Copy", className }: { getText: () => Promise<string> | string; label?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "copied">("idle");

  const handleCopy = async () => {
    setState("loading");
    try {
      const text = await getText();
      await navigator.clipboard.writeText(text);
      setState("copied");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("idle");
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={state === "loading"}
      className={`inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] uppercase transition-colors disabled:opacity-50 ${
        state === "copied" ? "text-[#1DD3B0]" : "text-[#B0B8CC]/60 hover:text-[#1DD3B0]"
      } ${className ?? ""}`}
    >
      {state === "copied" ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
      {state === "loading" ? "Fetching..." : state === "copied" ? "Copied" : label}
    </button>
  );
}

const STEPS = [
  {
    num: "01",
    title: "Open Perplexity Spaces",
    body: (
      <div className="space-y-3">
        <p className="font-[var(--font-inter)] text-xs text-[#B0B8CC] leading-relaxed">
          Go to{" "}
          <a href={PERPLEXITY_URL} target="_blank" rel="noopener noreferrer" className="text-[#1DD3B0]/70 hover:text-[#1DD3B0] transition-colors">
            Perplexity.ai
          </a>
          , navigate to Spaces, and create a new Space.
        </p>
      </div>
    ),
  },
  {
    num: "02",
    title: "Paste System Prompt",
    body: null,
  },
  {
    num: "03",
    title: "Select Your Model",
    body: (
      <p className="font-[var(--font-inter)] text-xs text-[#B0B8CC] leading-relaxed">
        Choose a model in Perplexity Space settings. Claude Sonnet is recommended for best reasoning depth.
      </p>
    ),
  },
  {
    num: "04",
    title: "Start Using GAIA Code",
    body: (
      <p className="font-[var(--font-inter)] text-xs text-[#B0B8CC] leading-relaxed">
        Ask it to write code, review a repo, plan a feature, or debug anything. GAIA Code will enter Plan Mode for significant tasks and check in before implementing.
      </p>
    ),
  },
];

export default function GetStartedPage() {
  const fetchSystemInstructions = async () => {
    const res = await fetch(`${RAW_BASE}/prompts/SYSTEM_INSTRUCTIONS.md`);
    return res.text();
  };

  const downloadSystemPrompt = async () => {
    const res = await fetch(`${RAW_BASE}/prompts/SYSTEM_PROMPT.md`);
    const text = await res.text();
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SYSTEM_PROMPT.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#080C18] text-[#E8EAF6] overflow-x-hidden">
      <Header />

      <main className="pt-14">
        {/* Hero */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(29,211,176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(29,211,176,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, #0D2A35 0%, #080C18 80%)" }}
          />
          <div className="absolute top-[72px] left-5 w-10 h-10 border-l border-t border-[#1DD3B0]/20" />
          <div className="absolute top-[72px] right-5 w-10 h-10 border-r border-t border-[#1DD3B0]/20" />

          <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#1DD3B0]/50 uppercase mb-4"
            >
              // Setup · 5 Steps
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.7 }}
              className="font-[var(--font-rajdhani)] text-5xl md:text-7xl font-bold tracking-[0.15em] mb-4"
              style={{
                background: "linear-gradient(90deg, #1DD3B0 0%, #7DD3FC 35%, #E8EAF6 55%, #1DD3B0 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-flow 5s linear infinite",
              }}
            >
              GET STARTED
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.28, duration: 0.7 }}
              className="w-16 h-px mx-auto mb-5"
              style={{ background: "linear-gradient(90deg, transparent, #1DD3B0, transparent)" }}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="font-[var(--font-inter)] text-[#B0B8CC] text-sm md:text-base max-w-md mx-auto leading-relaxed"
            >
              Five steps to deploy GAIA Code in your Perplexity Space.
            </motion.p>
          </div>
        </section>

        {/* Steps */}
        <section className="pb-16">
          <div className="max-w-2xl mx-auto px-5">
            <div className="relative">
              <div
                className="absolute top-6 w-px"
                style={{
                  left: "23px",
                  bottom: 0,
                  background: "linear-gradient(180deg, #1DD3B0, rgba(29,211,176,0.06) 100%)",
                }}
              />
              <div className="space-y-3">

                {/* Step 01 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: 0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex gap-4"
                >
                  <div
                    className="relative z-10 shrink-0 w-12 h-12 flex items-center justify-center border font-[var(--font-ibm-mono)] text-[9px] tracking-[0.2em] text-[#1DD3B0]"
                    style={{ backgroundColor: "#080C18", borderColor: "rgba(29,211,176,0.35)", boxShadow: "0 0 10px rgba(29,211,176,0.12)" }}
                  >
                    01
                  </div>
                  <div
                    className="relative flex-1 p-5 border border-[#1DD3B0]/10 hover:border-[#1DD3B0]/28 transition-colors duration-200"
                    style={{ backgroundColor: "rgba(13,21,38,0.55)" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px opacity-22" style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }} />
                    <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.15em] text-[#E8EAF6] mb-1.5">
                      Open Perplexity Spaces
                    </h3>
                    <p className="font-[var(--font-inter)] text-xs text-[#B0B8CC] leading-relaxed mb-3">
                      Go to Perplexity.ai, navigate to Spaces, and create a new Space.
                    </p>
                    <a
                      href={PERPLEXITY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/55 hover:text-[#1DD3B0] transition-colors uppercase"
                    >
                      Open Perplexity
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </motion.div>

                {/* Step 02 — Paste System Prompt */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex gap-4"
                >
                  <div
                    className="relative z-10 shrink-0 w-12 h-12 flex items-center justify-center border font-[var(--font-ibm-mono)] text-[9px] tracking-[0.2em] text-[#1DD3B0]"
                    style={{ backgroundColor: "#080C18", borderColor: "rgba(29,211,176,0.35)", boxShadow: "0 0 10px rgba(29,211,176,0.12)" }}
                  >
                    02
                  </div>
                  <div
                    className="relative flex-1 p-5 border border-[#1DD3B0]/10 hover:border-[#1DD3B0]/28 transition-colors duration-200"
                    style={{ backgroundColor: "rgba(13,21,38,0.55)" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px opacity-22" style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }} />
                    <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.15em] text-[#E8EAF6] mb-2">
                      Paste System Instructions
                    </h3>
                    <p className="font-[var(--font-inter)] text-xs text-[#B0B8CC] leading-relaxed mb-3">
                      In your Space settings, clear the System Instructions field and paste the contents of <code className="font-[var(--font-ibm-mono)] text-[10px] text-[#7DD3FC]/80 bg-[#7DD3FC]/8 px-1 py-0.5">SYSTEM_INSTRUCTIONS.md</code>. This is the short routing file — not the full prompt.
                    </p>
                    <div
                      className="relative border border-[#1DD3B0]/12 p-4"
                      style={{ backgroundColor: "rgba(8,12,24,0.7)" }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/35 uppercase">
                          // prompts/SYSTEM_INSTRUCTIONS.md
                        </span>
                        <CopyButton getText={fetchSystemInstructions} label="Copy Full Contents" />
                      </div>
                      <p className="font-[var(--font-ibm-mono)] text-[9px] text-[#B0B8CC]/50 leading-relaxed">
                        Click &ldquo;Copy Full Contents&rdquo; to fetch and copy the latest SYSTEM_INSTRUCTIONS.md directly from GitHub.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Step 03 — Upload SYSTEM_PROMPT.md */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex gap-4"
                >
                  <div
                    className="relative z-10 shrink-0 w-12 h-12 flex items-center justify-center border font-[var(--font-ibm-mono)] text-[9px] tracking-[0.2em] text-[#1DD3B0]"
                    style={{ backgroundColor: "#080C18", borderColor: "rgba(29,211,176,0.35)", boxShadow: "0 0 10px rgba(29,211,176,0.12)" }}
                  >
                    03
                  </div>
                  <div
                    className="relative flex-1 p-5 border border-[#1DD3B0]/10 hover:border-[#1DD3B0]/28 transition-colors duration-200"
                    style={{ backgroundColor: "rgba(13,21,38,0.55)" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px opacity-22" style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }} />
                    <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.15em] text-[#E8EAF6] mb-2">
                      Upload System Prompt as Space File
                    </h3>
                    <p className="font-[var(--font-inter)] text-xs text-[#B0B8CC] leading-relaxed mb-3">
                      In your Space settings, go to Space Files and upload <code className="font-[var(--font-ibm-mono)] text-[10px] text-[#7DD3FC]/80 bg-[#7DD3FC]/8 px-1 py-0.5">SYSTEM_PROMPT.md</code>. This is the full 8k+ prompt that GAIA Code reads on startup.
                    </p>
                    <button
                      onClick={downloadSystemPrompt}
                      className="inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/55 hover:text-[#1DD3B0] transition-colors uppercase"
                    >
                      <Download className="w-2.5 h-2.5" />
                      Download SYSTEM_PROMPT.md
                    </button>
                  </div>
                </motion.div>

                {/* Steps 04 + 05 */}
                {[
                  {
                    num: "04",
                    title: "Select Your Model",
                    description: "Choose a model in Perplexity Space settings. Claude Sonnet is recommended for best reasoning depth.",
                  },
                  {
                    num: "05",
                    title: "Start Using GAIA Code",
                    description: "Ask it to write code, review a repo, plan a feature, or debug anything. GAIA Code enters Plan Mode for significant tasks and checks in before implementing.",
                  },
                ].map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ delay: (i + 3) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex gap-4"
                  >
                    <div
                      className="relative z-10 shrink-0 w-12 h-12 flex items-center justify-center border font-[var(--font-ibm-mono)] text-[9px] tracking-[0.2em] text-[#1DD3B0]"
                      style={{ backgroundColor: "#080C18", borderColor: "rgba(29,211,176,0.35)", boxShadow: "0 0 10px rgba(29,211,176,0.12)" }}
                    >
                      {step.num}
                    </div>
                    <div
                      className="relative flex-1 p-5 border border-[#1DD3B0]/10 hover:border-[#1DD3B0]/28 transition-colors duration-200"
                      style={{ backgroundColor: "rgba(13,21,38,0.55)" }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-px opacity-22" style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }} />
                      <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.15em] text-[#E8EAF6] mb-1.5">
                        {step.title}
                      </h3>
                      <p className="font-[var(--font-inter)] text-xs text-[#B0B8CC] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Open source CTA */}
        <section className="pb-28 border-t border-[#1DD3B0]/8 pt-14">
          <div className="max-w-2xl mx-auto px-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative p-8 border border-[#1DD3B0]/15 text-center"
              style={{ backgroundColor: "rgba(13,21,38,0.65)" }}
            >
              <div
                className="absolute top-0 left-[15%] right-[15%] h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(29,211,176,0.4), transparent)" }}
              />
              <p className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.45em] text-[#1DD3B0]/35 uppercase mb-3">
                // Open Source
              </p>
              <h3 className="font-[var(--font-rajdhani)] text-2xl font-bold tracking-[0.15em] text-[#E8EAF6] mb-3">
                EVERYTHING IS PUBLIC
              </h3>
              <p className="font-[var(--font-inter)] text-[#B0B8CC] text-xs leading-relaxed mb-6 max-w-sm mx-auto">
                The system prompt and this website are fully open source.
                Fork it, modify it, or use it as-is.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-xs tracking-[0.3em] font-bold px-6 py-2.5 border border-[#1DD3B0]/30 text-[#1DD3B0] hover:bg-[#1DD3B0]/10 transition-all duration-200"
                >
                  VIEW ON GITHUB
                  <ExternalLink className="w-3 h-3" />
                </a>
                <Link
                  href="/connectors"
                  className="inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-xs tracking-[0.3em] text-[#B0B8CC] hover:text-[#E8EAF6] transition-colors"
                >
                  CONNECTORS
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
