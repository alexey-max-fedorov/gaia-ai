"use client";

import { motion } from "framer-motion";
import { ExternalLink, Plug, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CONNECTORS = [
  {
    id: "github",
    name: "GitHub",
    status: "live" as const,
    tagline: "Connect your GitHub account to give GAIA AI read/write access to your repositories.",
    steps: [
      {
        num: "01",
        title: "Open Perplexity Connectors",
        description: "Go to perplexity.ai/account/connectors.",
        action: { label: "Open Connectors", href: "https://www.perplexity.ai/account/connectors" },
      },
      {
        num: "02",
        title: "Find GitHub & Log In",
        description:
          "Locate the GitHub connector in the list. Click it, log in to your GitHub account, and follow the authorization prompts to complete the connection.",
        action: null,
      },
    ],
  },
  {
    id: "n8n",
    name: "n8n",
    status: "live" as const,
    tagline: "Expose any n8n workflow as an MCP server so GAIA AI can trigger automations directly.",
    steps: [
      {
        num: "01",
        title: "Enable MCP in n8n",
        description:
          "Navigate to your n8n instance at [yourproject].app.n8n.cloud/settings/mcp. Enable the MCP server toggle and copy the MCP Server URL shown on that page.",
        action: null,
      },
      {
        num: "02",
        title: "Add Custom Connector in Perplexity",
        description:
          "Go to perplexity.ai/account/connectors and click \"+ Custom Connector\". Paste the MCP Server URL you copied from n8n, then click Add.",
        action: { label: "Open Connectors", href: "https://www.perplexity.ai/account/connectors" },
      },
    ],
  },
  {
    id: "supabase",
    name: "Supabase",
    status: "soon" as const,
    tagline: "Query your Supabase database and run edge functions directly from GAIA AI.",
    steps: [],
  },
];

function StatusBadge({ status }: { status: "live" | "soon" }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/70 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1DD3B0] opacity-80" />
        ACTIVE
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#6B7A94]/50 uppercase">
      <Lock className="w-2.5 h-2.5" />
      COMING SOON
    </span>
  );
}

export default function ConnectorsPage() {
  return (
    <div className="min-h-screen bg-[#080C18] text-[#E8EAF6] overflow-x-hidden">
      <Header />

      <main className="pt-14">
        {/* Hero */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(29,211,176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(29,211,176,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, #0D2A35 0%, #080C18 80%)",
            }}
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
              // MCP &middot; Connectors
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
              CONNECTORS
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
              Wire up external tools so GAIA AI can act — not just answer.
              Each connector exposes a live MCP server to Perplexity.
            </motion.p>
          </div>
        </section>

        {/* Connector cards */}
        <section className="pb-28">
          <div className="max-w-2xl mx-auto px-5 space-y-10">
            {CONNECTORS.map((connector, ci) => (
              <motion.div
                key={connector.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: ci * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Card header */}
                <div
                  className={`relative p-6 border-t border-l border-r ${
                    connector.status === "soon"
                      ? "border-[#1DD3B0]/8 opacity-50"
                      : "border-[#1DD3B0]/20"
                  }`}
                  style={{
                    backgroundColor:
                      connector.status === "soon"
                        ? "rgba(13,21,38,0.30)"
                        : "rgba(13,21,38,0.65)",
                  }}
                >
                  <div
                    className="absolute top-0 left-[10%] right-[10%] h-px"
                    style={{
                      background:
                        connector.status === "soon"
                          ? "linear-gradient(90deg, transparent, rgba(29,211,176,0.12), transparent)"
                          : "linear-gradient(90deg, transparent, rgba(29,211,176,0.35), transparent)",
                    }}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 flex items-center justify-center border"
                        style={{
                          borderColor:
                            connector.status === "soon"
                              ? "rgba(29,211,176,0.12)"
                              : "rgba(29,211,176,0.30)",
                          backgroundColor: "rgba(29,211,176,0.06)",
                        }}
                      >
                        <Plug
                          className="w-3.5 h-3.5"
                          style={{
                            color:
                              connector.status === "soon"
                                ? "rgba(29,211,176,0.30)"
                                : "#1DD3B0",
                          }}
                        />
                      </div>
                      <h2 className="font-[var(--font-rajdhani)] text-xl font-bold tracking-[0.18em] text-[#E8EAF6]">
                        {connector.name.toUpperCase()}
                      </h2>
                    </div>
                    <StatusBadge status={connector.status} />
                  </div>
                  <p className="font-[var(--font-inter)] text-[#6B7A94]/80 text-xs leading-relaxed mt-3">
                    {connector.tagline}
                  </p>

                  {connector.status === "soon" && (
                    <p className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#6B7A94]/35 uppercase mt-4">
                      // Setup instructions coming soon
                    </p>
                  )}
                </div>

                {/* Steps */}
                {connector.steps.length > 0 && (
                  <div
                    className="border border-t-0 border-[#1DD3B0]/10"
                    style={{ backgroundColor: "rgba(8,12,24,0.55)" }}
                  >
                    <div className="relative p-5 space-y-0">
                      <div
                        className="absolute top-5 bottom-5 w-px"
                        style={{
                          left: "43px",
                          background:
                            "linear-gradient(180deg, #1DD3B0, rgba(29,211,176,0.06) 100%)",
                        }}
                      />
                      <div className="space-y-3">
                        {connector.steps.map((step, si) => (
                          <motion.div
                            key={step.num}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: ci * 0.12 + si * 0.08,
                              duration: 0.5,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="relative flex gap-4"
                          >
                            <div
                              className="relative z-10 shrink-0 w-10 h-10 flex items-center justify-center border font-[var(--font-ibm-mono)] text-[8px] tracking-[0.2em] text-[#1DD3B0]"
                              style={{
                                backgroundColor: "#080C18",
                                borderColor: "rgba(29,211,176,0.30)",
                                boxShadow: "0 0 8px rgba(29,211,176,0.10)",
                              }}
                            >
                              {step.num}
                            </div>
                            <div className="flex-1 py-2.5">
                              <h3 className="font-[var(--font-rajdhani)] text-sm font-bold tracking-[0.15em] text-[#E8EAF6] mb-1">
                                {step.title}
                              </h3>
                              <p className="font-[var(--font-inter)] text-[11px] text-[#6B7A94]/80 leading-relaxed mb-2">
                                {step.description.split(/(`[^`]+`)/g).map((part, pi) =>
                                  part.startsWith("`") && part.endsWith("`") ? (
                                    <code
                                      key={pi}
                                      className="font-[var(--font-ibm-mono)] text-[10px] text-[#7DD3FC]/80 bg-[#7DD3FC]/8 px-1 py-0.5"
                                    >
                                      {part.slice(1, -1)}
                                    </code>
                                  ) : (
                                    part
                                  )
                                )}
                              </p>
                              {step.action && (
                                <a
                                  href={step.action.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/55 hover:text-[#1DD3B0] transition-colors uppercase"
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
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
