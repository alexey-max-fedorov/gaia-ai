"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Copy, Check, Download, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Panel from "@/components/Panel";
import FaqAccordion from "@/components/FaqAccordion";
import EngineCard from "@/components/EngineCard";
import { SETUP_STEPS, SPACE_FILES, PREREQS, START_STATS, FAQS, ENGINES, URLS } from "@/lib/site";

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
      className={`inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] uppercase transition-colors disabled:opacity-50 cursor-pointer ${
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

const STEP_ACTION: Record<string, { label: string; href: string }> = {
  "01": { label: "Open Perplexity", href: URLS.perplexity },
  "05": { label: "Open Connectors", href: URLS.connectors },
};

export default function GetStartedClient() {
  const instructionsFile = SPACE_FILES.find((f) => f.id === "instructions")!;
  const uploadFiles = SPACE_FILES.filter((f) => f.deploy === "upload");

  return (
    <div className="min-h-screen text-[#E8EAF6] overflow-x-hidden">
      <Header />
      <main>
        <PageHero
          kicker="// Setup · 6 steps"
          title="GET STARTED"
          subtitle="Deploy GAIA Code v3 in your Perplexity Space in about two minutes. Paste one file, upload three, pick a model. Nothing to install."
          stats={START_STATS}
        >
          <a
            href={URLS.space}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-7 py-3 bg-[#1DD3B0] text-[#080C18] hover:shadow-[0_0_28px_rgba(29,211,176,0.45)] transition-all duration-300 inline-flex items-center gap-2 hzd-btn-sweep"
          >
            LAUNCH A SPACE
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </PageHero>

        {/* Prerequisites */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5">
            <SectionHeading label="// Before you start" title="WHAT YOU'LL NEED" className="mb-10" />
            <div className="grid sm:grid-cols-3 gap-3">
              {PREREQS.map((p, i) => (
                <Panel key={p.title} index={i} badge={`0${i + 1}`}>
                  <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.12em] text-[#E8EAF6] mb-1.5">
                    {p.title}
                  </h3>
                  <p className="font-[var(--font-inter)] text-xs text-[#8A98B0] leading-relaxed">{p.body}</p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-3xl mx-auto px-5">
            <SectionHeading label="// Deploy · 6 steps" title="SET IT UP" className="mb-10" />
            <div className="relative">
              <div
                aria-hidden
                className="absolute top-6 bottom-6 w-px left-[23px]"
                style={{ background: "linear-gradient(180deg, #1DD3B0, rgba(29,211,176,0.06))" }}
              />
              <div className="space-y-3">
                {SETUP_STEPS.map((s, i) => {
                  const action = STEP_ACTION[s.num];
                  return (
                    <motion.div
                      key={s.num}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="relative flex gap-4"
                    >
                      <div className="relative z-10 shrink-0 w-12 h-12 flex items-center justify-center border border-[#1DD3B0]/35 bg-[#080C18] font-[var(--font-ibm-mono)] text-[9px] tracking-[0.2em] text-[#1DD3B0] shadow-[0_0_10px_rgba(29,211,176,0.12)]">
                        {s.num}
                      </div>
                      <div className="group relative flex-1 overflow-hidden border border-[#1DD3B0]/12 bg-[#0D1526]/55 p-5 transition-all duration-300 hover:border-[#1DD3B0]/30 hover:bg-[#0D1526]/75">
                        <div
                          aria-hidden
                          className="absolute top-0 left-0 right-0 h-px opacity-30 group-hover:opacity-80 transition-opacity"
                          style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }}
                        />
                        <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.13em] text-[#E8EAF6] mb-1.5">
                          {s.title}
                        </h3>
                        <p className="font-[var(--font-inter)] text-xs text-[#B0B8CC] leading-relaxed">{s.body}</p>

                        {s.num === "02" && (
                          <div className="relative border border-[#1DD3B0]/12 p-4 mt-3 bg-[#080C18]/70">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/35 uppercase">
                                // {instructionsFile.path}
                              </span>
                              <CopyButton getText={fetchFile(instructionsFile.path)} label="Copy Full Contents" />
                            </div>
                            <p className="font-[var(--font-ibm-mono)] text-[9px] text-[#B0B8CC]/50 leading-relaxed">
                              Click &ldquo;Copy Full Contents&rdquo; to fetch and copy the latest SYSTEM_INSTRUCTIONS.md from GitHub.
                            </p>
                          </div>
                        )}

                        {s.num === "03" && (
                          <div className="mt-3 space-y-2">
                            {uploadFiles.map((f) => (
                              <div
                                key={f.id}
                                className="flex items-center justify-between border border-[#1DD3B0]/12 px-3 py-2 bg-[#080C18]/70"
                              >
                                <span className="font-[var(--font-ibm-mono)] text-[10px] text-[#7DD3FC]/85">{f.file}</span>
                                <div className="flex items-center gap-4">
                                  <CopyButton getText={fetchFile(f.path)} label="Copy" />
                                  <button
                                    onClick={downloadFile(f.path, f.file)}
                                    className="inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/60 hover:text-[#1DD3B0] transition-colors uppercase cursor-pointer"
                                  >
                                    <Download className="w-2.5 h-2.5" /> Download
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {action && (
                          <a
                            href={action.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/60 hover:text-[#1DD3B0] transition-colors uppercase"
                          >
                            {action.label}
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* What you unlock */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5">
            <SectionHeading
              label="// What you unlock"
              title={<>FOUR FILES IN, <span style={{ color: "#1DD3B0" }}>FULL WORKFLOW.</span></>}
              className="mb-10"
            />
            <div className="grid md:grid-cols-2 gap-3">
              {ENGINES.map((e, i) => (
                <EngineCard key={e.id} engine={e} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-3xl mx-auto px-5">
            <SectionHeading label="// Questions" title="SETUP FAQ" align="center" className="mb-10" />
            <FaqAccordion items={FAQS.getStarted} />
          </div>
        </section>

        {/* Open source CTA */}
        <section className="relative py-16 md:py-28 border-t border-[#1DD3B0]/8">
          <div className="max-w-2xl mx-auto px-5">
            <Panel index={0} className="text-center p-8 md:p-10" corner={false}>
              <p className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.45em] text-[#1DD3B0]/40 uppercase mb-3">
                // Open source
              </p>
              <h2 className="font-[var(--font-rajdhani)] text-2xl md:text-3xl font-bold tracking-[0.12em] text-[#E8EAF6] mb-3">
                EVERYTHING IS PUBLIC
              </h2>
              <p className="font-[var(--font-inter)] text-[#9AA7BE] text-sm leading-relaxed mb-7 max-w-sm mx-auto">
                The prompt system and this website are fully open source. Fork it, modify it, or use it as-is.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={URLS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-7 py-3 border border-[#1DD3B0]/30 text-[#1DD3B0] hover:bg-[#1DD3B0]/10 transition-all duration-200"
                >
                  VIEW ON GITHUB
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/connectors"
                  className="inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-sm tracking-[0.3em] text-[#9AA7BE] hover:text-[#E8EAF6] transition-colors"
                >
                  CONNECTORS
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Panel>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
