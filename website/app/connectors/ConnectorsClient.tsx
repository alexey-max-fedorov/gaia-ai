"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Lock, Github, Workflow, Database, GitBranch, GitPullRequest, CircleDot, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Panel from "@/components/Panel";
import FaqAccordion from "@/components/FaqAccordion";
import { CONNECTORS, CONN_STATS, FAQS, URLS, type ConnectorStatus } from "@/lib/site";

const ICONS = { github: Github, workflow: Workflow, database: Database } as const;

const CAPABILITIES = [
  { icon: CircleDot, title: "Read repositories", body: "Browse code, files, and structure across your repos." },
  { icon: GitBranch, title: "Create branches", body: "Spin up working branches for features and fixes." },
  { icon: GitPullRequest, title: "Open pull requests", body: "Push commits and open PRs you can review and merge." },
  { icon: Zap, title: "Trigger automations", body: "Fire any n8n workflow exposed as an MCP server." },
];

function StatusBadge({ status }: { status: ConnectorStatus }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/80 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1DD3B0] animate-pulse" />
        ACTIVE
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#6B7A94]/55 uppercase">
      <Lock className="w-2.5 h-2.5" />
      COMING SOON
    </span>
  );
}

function renderDesc(text: string) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={i} className="font-[var(--font-ibm-mono)] text-[10px] text-[#7DD3FC]/85 bg-[#7DD3FC]/8 px-1 py-0.5">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    )
  );
}

export default function ConnectorsClient() {
  return (
    <div className="min-h-screen text-[#E8EAF6] overflow-x-hidden">
      <Header />
      <main>
        <PageHero
          kicker="// MCP · Connectors"
          title="CONNECTORS"
          subtitle="Wire up external tools so GAIA Code can act — not just answer. Each connector exposes a live MCP server to your Perplexity Space."
          stats={CONN_STATS}
        >
          <a
            href={URLS.connectors}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-7 py-3 bg-[#1DD3B0] text-[#080C18] hover:shadow-[0_0_28px_rgba(29,211,176,0.45)] transition-all duration-300 inline-flex items-center gap-2 hzd-btn-sweep"
          >
            OPEN CONNECTORS
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </PageHero>

        {/* What you can do */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5">
            <SectionHeading
              label="// Capabilities"
              title={<>ACT ON YOUR <span style={{ color: "#1DD3B0" }}>STACK.</span></>}
              description="With connectors enabled, GAIA Code goes from advice to action."
              className="mb-10"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CAPABILITIES.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Panel key={c.title} index={i}>
                    <Icon className="w-5 h-5 text-[#1DD3B0] mb-3" />
                    <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.12em] text-[#E8EAF6] mb-1.5">
                      {c.title}
                    </h3>
                    <p className="font-[var(--font-inter)] text-xs text-[#8A98B0] leading-relaxed">{c.body}</p>
                  </Panel>
                );
              })}
            </div>
          </div>
        </section>

        {/* Available connectors */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-3xl mx-auto px-5">
            <SectionHeading label="// Available connectors" title="SETUP GUIDES" className="mb-10" />
            <div className="space-y-8">
              {CONNECTORS.map((c, ci) => {
                const Icon = ICONS[c.icon];
                const soon = c.status === "soon";
                return (
                  <Panel key={c.id} index={ci} hover={!soon} className={soon ? "opacity-60 p-6" : "p-6"}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center border border-[#1DD3B0]/25 bg-[#1DD3B0]/6">
                          <Icon className={`w-4 h-4 ${soon ? "text-[#1DD3B0]/30" : "text-[#1DD3B0]"}`} />
                        </div>
                        <div>
                          <h3 className="font-[var(--font-rajdhani)] text-xl font-bold tracking-[0.16em] text-[#E8EAF6]">
                            {c.name.toUpperCase()}
                          </h3>
                          <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#6B7A94]/60 uppercase">
                            {c.category}
                          </span>
                        </div>
                      </div>
                      <StatusBadge status={c.status} />
                    </div>
                    <p className="font-[var(--font-inter)] text-xs text-[#8A98B0] leading-relaxed mt-4">{c.tagline}</p>

                    {soon && (
                      <p className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#6B7A94]/40 uppercase mt-4">
                        // Setup instructions coming soon
                      </p>
                    )}

                    {c.steps.length > 0 && (
                      <div className="relative mt-6 pl-1">
                        <div
                          aria-hidden
                          className="absolute top-2 bottom-2 w-px left-[19px]"
                          style={{ background: "linear-gradient(180deg, #1DD3B0, rgba(29,211,176,0.08))" }}
                        />
                        <div className="space-y-4">
                          {c.steps.map((step, si) => (
                            <motion.div
                              key={step.num}
                              initial={{ opacity: 0, x: -12 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: si * 0.08, duration: 0.45 }}
                              className="relative flex gap-4"
                            >
                              <div className="relative z-10 shrink-0 w-10 h-10 flex items-center justify-center border border-[#1DD3B0]/30 bg-[#080C18] font-[var(--font-ibm-mono)] text-[8px] tracking-[0.2em] text-[#1DD3B0]">
                                {step.num}
                              </div>
                              <div className="flex-1 pt-1">
                                <h4 className="font-[var(--font-rajdhani)] text-sm font-bold tracking-[0.12em] text-[#E8EAF6] mb-1">
                                  {step.title}
                                </h4>
                                <p className="font-[var(--font-inter)] text-[11px] text-[#8A98B0] leading-relaxed mb-2">
                                  {renderDesc(step.description)}
                                </p>
                                {step.action && (
                                  <a
                                    href={step.action.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/60 hover:text-[#1DD3B0] transition-colors uppercase"
                                  >
                                    {step.action.label}
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Panel>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-3xl mx-auto px-5">
            <SectionHeading label="// Questions" title="CONNECTORS FAQ" align="center" className="mb-10" />
            <FaqAccordion items={FAQS.connectors} />
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16 md:py-28 border-t border-[#1DD3B0]/8">
          <div className="max-w-2xl mx-auto px-5">
            <Panel index={0} className="text-center p-8 md:p-10" corner={false}>
              <h2 className="font-[var(--font-rajdhani)] text-2xl md:text-3xl font-bold tracking-[0.12em] text-[#E8EAF6] mb-3">
                NOT SET UP YET?
              </h2>
              <p className="font-[var(--font-inter)] text-[#9AA7BE] text-sm leading-relaxed mb-7 max-w-sm mx-auto">
                Deploy GAIA Code first, then add connectors to give it hands on your repos and automations.
              </p>
              <Link
                href="/get-started"
                className="group inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-7 py-3 bg-[#1DD3B0] text-[#080C18] hover:shadow-[0_0_28px_rgba(29,211,176,0.45)] transition-all duration-300 hzd-btn-sweep"
              >
                GET STARTED
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </Panel>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
