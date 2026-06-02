"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Panel from "@/components/Panel";
import FlowDiagram from "@/components/FlowDiagram";
import FaqAccordion from "@/components/FaqAccordion";
import EngineCard from "@/components/EngineCard";
import { ENGINES, TURN_FLOW, FAQS, ARCH_STATS, SPACE_FILES, URLS } from "@/lib/site";

export default function ArchitectureClient() {
  return (
    <div className="min-h-screen text-[#E8EAF6] overflow-x-hidden">
      <Header />
      <main>
        <PageHero
          kicker="// System architecture"
          title="ARCHITECTURE"
          subtitle="One gate you paste into Perplexity, three engine files you upload. Here's exactly how GAIA Code wires itself together — and how a single turn runs."
          stats={ARCH_STATS}
        >
          <Link
            href="/get-started"
            className="group font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-7 py-3 bg-[#1DD3B0] text-[#080C18] hover:shadow-[0_0_28px_rgba(29,211,176,0.45)] transition-all duration-300 inline-flex items-center gap-2 hzd-btn-sweep"
          >
            DEPLOY IT
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={URLS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[var(--font-rajdhani)] text-sm tracking-[0.3em] px-7 py-3 border border-[#1DD3B0]/25 text-[#1DD3B0]/80 hover:border-[#1DD3B0]/55 hover:text-[#1DD3B0] transition-all duration-300 inline-flex items-center gap-2"
          >
            VIEW SOURCE
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </PageHero>

        {/* Deployment flow */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5">
            <SectionHeading
              label="// Deployment flow"
              title={<>ONE GATE. <span style={{ color: "#1DD3B0", textShadow: "0 0 20px rgba(29,211,176,0.4)" }}>THREE ENGINES.</span></>}
              description="Paste the gate into your Space Instructions; upload the three engine files. GAIA reads all three on startup — skip one and that engine goes dark."
              className="mb-12"
            />
            <FlowDiagram />
          </div>
        </section>

        {/* The four engines */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5">
            <SectionHeading
              label="// The four engines"
              title={<>NOT A PROMPT. <span style={{ color: "#1DD3B0" }}>A SYSTEM.</span></>}
              description="Each file drives one engine. Together they let GAIA remember, plan, pace itself, and run your skills."
              className="mb-10"
            />
            <div className="grid md:grid-cols-2 gap-3">
              {ENGINES.map((e, i) => (
                <EngineCard key={e.id} engine={e} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Runtime loop */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5">
            <SectionHeading
              label="// How a turn runs"
              title={<>EXPLORE → PLAN → <span style={{ color: "#1DD3B0" }}>EXECUTE.</span></>}
              description="GAIA doesn't just answer — it works in a disciplined loop, the same one Claude Code uses."
              className="mb-10"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {TURN_FLOW.map((s, i) => (
                <Panel key={s.n} index={i} badge={s.n}>
                  <h3 className="font-[var(--font-rajdhani)] text-lg font-bold tracking-[0.12em] text-[#E8EAF6] mb-2 group-hover:text-[#1DD3B0] transition-colors">
                    {s.title}
                  </h3>
                  <p className="font-[var(--font-inter)] text-xs text-[#8A98B0] leading-relaxed">{s.body}</p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        {/* File reference */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5">
            <SectionHeading label="// File reference" title="THE FOUR FILES" className="mb-10" />
            <div className="space-y-2">
              {SPACE_FILES.map((f, i) => (
                <Panel key={f.id} index={i} corner={false} className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-3 sm:w-80 shrink-0">
                      <code className="font-[var(--font-ibm-mono)] text-[11px] text-[#7DD3FC]/85 bg-[#7DD3FC]/8 px-1.5 py-0.5">
                        {f.file}
                      </code>
                      <span
                        className={`font-[var(--font-ibm-mono)] text-[7px] tracking-[0.3em] uppercase px-1.5 py-0.5 border ${
                          f.deploy === "paste"
                            ? "text-[#1DD3B0]/70 border-[#1DD3B0]/25"
                            : "text-[#6B7A94]/60 border-[#6B7A94]/20"
                        }`}
                      >
                        {f.deploy}
                      </span>
                    </div>
                    <p className="font-[var(--font-inter)] text-xs text-[#8A98B0] leading-relaxed flex-1">
                      {f.summary}
                    </p>
                  </div>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-3xl mx-auto px-5">
            <SectionHeading label="// Questions" title="ARCHITECTURE FAQ" align="center" className="mb-10" />
            <FaqAccordion items={FAQS.architecture} />
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16 md:py-28 border-t border-[#1DD3B0]/8">
          <div className="max-w-2xl mx-auto px-5">
            <Panel index={0} className="text-center p-8 md:p-10" corner={false}>
              <p className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.45em] text-[#1DD3B0]/40 uppercase mb-3">
                // Deploy it
              </p>
              <h2 className="font-[var(--font-rajdhani)] text-2xl md:text-3xl font-bold tracking-[0.12em] text-[#E8EAF6] mb-3">
                READY TO DEPLOY?
              </h2>
              <p className="font-[var(--font-inter)] text-[#9AA7BE] text-sm leading-relaxed mb-7 max-w-sm mx-auto">
                One gate, three engines. Have GAIA Code running in your Perplexity Space in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/get-started"
                  className="group inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-7 py-3 bg-[#1DD3B0] text-[#080C18] hover:shadow-[0_0_28px_rgba(29,211,176,0.45)] transition-all duration-300 hzd-btn-sweep"
                >
                  SET IT UP
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
