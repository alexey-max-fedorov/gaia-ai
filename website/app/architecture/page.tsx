"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionLabel from "@/components/SectionLabel";
import EngineCard from "@/components/EngineCard";
import { SPACE_FILES, ENGINES, URLS } from "@/lib/site";

const gate = SPACE_FILES.find((f) => f.deploy === "paste")!;
const uploads = SPACE_FILES.filter((f) => f.deploy === "upload");

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#080C18] text-[#E8EAF6] overflow-x-hidden">
      <Header />

      <main className="pt-14">
        {/* Hero */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <Background brackets radial="top" />

          <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#1DD3B0]/50 uppercase mb-4"
            >
              // How GAIA Code fits together
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.7 }}
              className="font-[var(--font-rajdhani)] text-5xl md:text-7xl font-bold tracking-[0.15em] mb-4"
              style={{
                background:
                  "linear-gradient(90deg, #1DD3B0 0%, #7DD3FC 35%, #E8EAF6 55%, #1DD3B0 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-flow 5s linear infinite",
              }}
            >
              ARCHITECTURE
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
              className="font-[var(--font-inter)] text-[#6B7A94] text-sm md:text-base max-w-md mx-auto leading-relaxed"
            >
              A gate you paste, three engine files you upload. Here&apos;s what each one does.
            </motion.p>
          </div>
        </section>

        {/* Flow diagram: gate → 3 uploaded files */}
        <section className="relative pb-16">
          <div className="max-w-5xl mx-auto px-5">
            <SectionLabel className="mb-6">// Deployment flow</SectionLabel>

            {/* Gate card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 border border-[#1DD3B0]/20 bg-[#0D1526]/50"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }}
              />
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.35em] text-[#1DD3B0]/55 uppercase border border-[#1DD3B0]/25 px-2 py-0.5">
                      PASTE → SPACE INSTRUCTIONS
                    </span>
                  </div>
                  <code className="font-[var(--font-ibm-mono)] text-sm text-[#1DD3B0] tracking-wide">
                    {gate.file}
                  </code>
                  <p className="font-[var(--font-rajdhani)] text-xs font-bold tracking-[0.2em] text-[#E8EAF6]/60 uppercase mt-1 mb-2">
                    {gate.role}
                  </p>
                  <p className="font-[var(--font-inter)] text-xs text-[#6B7A94] leading-relaxed max-w-2xl">
                    {gate.summary}
                  </p>
                </div>
                <div
                  className="shrink-0 hidden sm:flex w-12 h-12 items-center justify-center border border-[#1DD3B0]/25"
                  style={{ backgroundColor: "rgba(29,211,176,0.05)" }}
                >
                  <span className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.2em] text-[#1DD3B0]/55">
                    01
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Connector line */}
            <div className="flex justify-center py-3">
              <div
                className="w-px h-10"
                style={{
                  background: "linear-gradient(180deg, #1DD3B0, rgba(29,211,176,0.1))",
                }}
              />
            </div>

            {/* Three upload cards */}
            <div className="grid md:grid-cols-3 gap-3">
              {uploads.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative p-5 border border-[#1DD3B0]/12 bg-[#0D1526]/50 hover:border-[#1DD3B0]/30 transition-colors duration-200"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }}
                  />
                  <div className="mb-3">
                    <span className="font-[var(--font-ibm-mono)] text-[7px] tracking-[0.3em] text-[#1DD3B0]/45 uppercase border border-[#1DD3B0]/18 px-1.5 py-0.5">
                      UPLOAD → SPACE FILE
                    </span>
                  </div>
                  <code className="font-[var(--font-ibm-mono)] text-xs text-[#7DD3FC]/80 bg-[#7DD3FC]/8 px-1 py-0.5 block mb-2 leading-normal">
                    {f.file}
                  </code>
                  <p className="font-[var(--font-rajdhani)] text-[10px] font-bold tracking-[0.2em] text-[#E8EAF6]/50 uppercase mb-2">
                    {f.role}
                  </p>
                  <p className="font-[var(--font-inter)] text-[11px] text-[#6B7A94] leading-relaxed">
                    {f.summary}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The four files — reference list */}
        <section className="relative py-16 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5">
            <SectionLabel className="mb-6">// The four files</SectionLabel>
            <div className="space-y-2">
              {SPACE_FILES.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col sm:flex-row sm:items-start gap-3 p-4 border border-[#1DD3B0]/10 bg-[#0D1526]/30 hover:border-[#1DD3B0]/22 transition-colors duration-200"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-25"
                    style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }}
                  />
                  <div className="flex items-center gap-3 sm:w-72 shrink-0">
                    <code className="font-[var(--font-ibm-mono)] text-[10px] text-[#7DD3FC]/80 bg-[#7DD3FC]/8 px-1 py-0.5">
                      {f.file}
                    </code>
                    <span
                      className={`font-[var(--font-ibm-mono)] text-[7px] tracking-[0.3em] uppercase px-1.5 py-0.5 border shrink-0 ${
                        f.deploy === "paste"
                          ? "text-[#1DD3B0]/70 border-[#1DD3B0]/25"
                          : "text-[#6B7A94]/60 border-[#6B7A94]/20"
                      }`}
                    >
                      {f.deploy === "paste" ? "PASTE" : "UPLOAD"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-[var(--font-rajdhani)] text-[10px] font-bold tracking-[0.2em] text-[#E8EAF6]/55 uppercase">
                      {f.role}
                    </span>
                    <p className="font-[var(--font-inter)] text-xs text-[#6B7A94] leading-relaxed mt-0.5">
                      {f.summary}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The four engines */}
        <section className="relative py-16 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5">
            <SectionLabel className="mb-4">// The engines</SectionLabel>
            <div className="grid md:grid-cols-2 gap-3">
              {ENGINES.map((e, i) => (
                <EngineCard key={e.id} engine={e} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
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
                // Deploy it
              </p>
              <h3 className="font-[var(--font-rajdhani)] text-2xl font-bold tracking-[0.15em] text-[#E8EAF6] mb-3">
                READY TO DEPLOY?
              </h3>
              <p className="font-[var(--font-inter)] text-[#B0B8CC] text-xs leading-relaxed mb-6 max-w-sm mx-auto">
                One gate, three engines. Follow the setup guide to have GAIA Code running in your Perplexity Space in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-xs tracking-[0.3em] font-bold px-6 py-2.5 border border-[#1DD3B0]/30 text-[#1DD3B0] hover:bg-[#1DD3B0]/10 transition-all duration-200"
                >
                  SET IT UP
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <a
                  href={URLS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-xs tracking-[0.3em] text-[#B0B8CC] hover:text-[#E8EAF6] transition-colors"
                >
                  VIEW ON GITHUB
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
