"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Copy, Check, Download, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Step from "@/components/Step";
import { SETUP_STEPS, SPACE_FILES, URLS } from "@/lib/site";

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

const fetchFile = (path: string) => async () => {
  const res = await fetch(`${URLS.rawBase}/${path}`);
  return res.text();
};

const downloadFile = (path: string, file: string) => async () => {
  const res = await fetch(`${URLS.rawBase}/${path}`);
  const blob = new Blob([await res.text()], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = file;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default function GetStartedPage() {
  const instructionsFile = SPACE_FILES.find((f) => f.id === "instructions")!;
  const uploadFiles = SPACE_FILES.filter((f) => f.deploy === "upload");

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
              // Setup · 6 Steps
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
              Six steps to deploy GAIA Code v3 in your Perplexity Space.
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
                {SETUP_STEPS.map((s, i) => (
                  <motion.div
                    key={s.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Step
                      num={s.num}
                      title={s.title}
                      action={
                        s.num === "01"
                          ? { label: "Open Perplexity", href: URLS.perplexity }
                          : s.num === "05"
                          ? { label: "Open Connectors", href: URLS.connectors }
                          : undefined
                      }
                    >
                      <p className="mb-2">{s.body}</p>

                      {/* Step 02 — paste: copy control for SYSTEM_INSTRUCTIONS.md */}
                      {s.num === "02" && (
                        <div
                          className="relative border border-[#1DD3B0]/12 p-4 mt-3"
                          style={{ backgroundColor: "rgba(8,12,24,0.7)" }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/35 uppercase">
                              // {instructionsFile.path}
                            </span>
                            <CopyButton getText={fetchFile(instructionsFile.path)} label="Copy Full Contents" />
                          </div>
                          <p className="font-[var(--font-ibm-mono)] text-[9px] text-[#B0B8CC]/50 leading-relaxed">
                            Click &ldquo;Copy Full Contents&rdquo; to fetch and copy the latest SYSTEM_INSTRUCTIONS.md directly from GitHub.
                          </p>
                        </div>
                      )}

                      {/* Step 03 — upload: list all three engine files with Copy + Download */}
                      {s.num === "03" && (
                        <div className="mt-3">
                          {uploadFiles.map((f) => (
                            <div
                              key={f.id}
                              className="flex items-center justify-between border border-[#1DD3B0]/12 px-3 py-2 mt-2"
                              style={{ backgroundColor: "rgba(8,12,24,0.7)" }}
                            >
                              <span className="font-[var(--font-ibm-mono)] text-[10px] text-[#7DD3FC]/80">{f.file}</span>
                              <div className="flex items-center gap-4">
                                <CopyButton getText={fetchFile(f.path)} label="Copy" />
                                <button
                                  onClick={downloadFile(f.path, f.file)}
                                  className="inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/55 hover:text-[#1DD3B0] transition-colors uppercase"
                                >
                                  <Download className="w-2.5 h-2.5" /> Download
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </Step>
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
                  href={URLS.github}
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
