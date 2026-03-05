"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GITHUB_URL = "https://github.com/alexey-max-fedorov/gaia-ai";
const PERPLEXITY_URL = "https://www.perplexity.ai";

const STEPS = [
  {
    num: "01",
    title: "Open Perplexity Spaces",
    description:
      "Go to Perplexity.ai, navigate to Spaces, and create a new Space.",
    action: { label: "Open Perplexity", href: PERPLEXITY_URL, external: true },
  },
  {
    num: "02",
    title: "Paste System Instructions",
    description:
      "Copy the full contents of SYSTEM_INSTRUCTIONS.md from the GitHub repo and paste into the Space\u2019s System Instructions field. This is what makes GAIA AI route queries.",
    action: {
      label: "View SYSTEM_INSTRUCTIONS.md",
      href: GITHUB_URL + "/blob/master/SYSTEM_INSTRUCTIONS.md",
      external: true,
    },
  },
  {
    num: "03",
    title: "Upload All Skill Files",
    description:
      "Upload these ten files as Space Files: HEPHAESTUS_PROMPT.md, HADES_SKILL.md, MINERVA_SKILL.md, AETHER_SKILL.md, POSEIDON_SKILL.md, DEMETER_SKILL.md, ARTEMIS_SKILL.md, ELEUTHIA_SKILL.md, APOLLO_SKILL.md, ATHENA_SKILL.md.",
    action: { label: "Browse files on GitHub", href: GITHUB_URL, external: true },
  },
  {
    num: "04",
    title: "Select Your Model",
    description:
      "Choose a model in Perplexity Space settings. Claude Sonnet is recommended for the best reasoning depth across all ten subfunctions.",
    action: null,
  },
  {
    num: "05",
    title: "Start Using GAIA AI",
    description:
      "GAIA AI will now automatically route every query to the right subfunction. Ask it to write code, design a system, review a contract, or anything else.",
    action: null,
  },
];

const SKILL_FILES = [
  "HEPHAESTUS_PROMPT.md",
  "HADES_SKILL.md",
  "MINERVA_SKILL.md",
  "AETHER_SKILL.md",
  "POSEIDON_SKILL.md",
  "DEMETER_SKILL.md",
  "ARTEMIS_SKILL.md",
  "ELEUTHIA_SKILL.md",
  "APOLLO_SKILL.md",
  "ATHENA_SKILL.md",
];

export default function GetStartedPage() {
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
              // Setup &middot; 5 Steps
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
              className="font-[var(--font-inter)] text-[#6B7A94] text-sm md:text-base max-w-md mx-auto leading-relaxed"
            >
              Five steps to deploy GAIA AI in your Perplexity Space. Takes under 3 minutes.
            </motion.p>
          </div>
        </section>

        {/* Steps */}
        <section className="pb-16">
          <div className="max-w-2xl mx-auto px-5">
            <div className="relative">
              <div
                className="absolute top-6 bottom-6 w-px"
                style={{
                  left: "23px",
                  background: "linear-gradient(180deg, #1DD3B0, rgba(29,211,176,0.06) 100%)",
                }}
              />
              <div className="space-y-3">
                {STEPS.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex gap-4"
                  >
                    <div
                      className="relative z-10 shrink-0 w-12 h-12 flex items-center justify-center border font-[var(--font-ibm-mono)] text-[9px] tracking-[0.2em] text-[#1DD3B0]"
                      style={{
                        backgroundColor: "#080C18",
                        borderColor: "rgba(29,211,176,0.35)",
                        boxShadow: "0 0 10px rgba(29,211,176,0.12)",
                      }}
                    >
                      {step.num}
                    </div>
                    <div
                      className="relative flex-1 p-5 border border-[#1DD3B0]/10 hover:border-[#1DD3B0]/28 transition-colors duration-200"
                      style={{ backgroundColor: "rgba(13,21,38,0.55)" }}
                    >
                      <div
                        className="absolute top-0 left-0 right-0 h-px opacity-22"
                        style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }}
                      />
                      <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.15em] text-[#E8EAF6] mb-1.5">
                        {step.title}
                      </h3>
                      <p className="font-[var(--font-inter)] text-xs text-[#6B7A94]/80 leading-relaxed mb-3">
                        {step.description}
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
        </section>

        {/* File list */}
        <section className="py-14 border-t border-[#1DD3B0]/8">
          <div className="max-w-2xl mx-auto px-5">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#1DD3B0]/40 uppercase mb-6 text-center"
            >
              // Files to Upload as Space Files
            </motion.p>
            <div className="grid grid-cols-2 gap-2">
              {SKILL_FILES.map((file, i) => (
                <motion.a
                  key={file}
                  href={`${GITHUB_URL}/blob/master/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="flex items-center gap-2.5 px-3 py-2.5 border border-[#1DD3B0]/10 hover:border-[#1DD3B0]/30 transition-colors group"
                  style={{ backgroundColor: "rgba(13,21,38,0.4)" }}
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0 opacity-45 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: "#1DD3B0" }}
                  />
                  <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.12em] text-[#6B7A94] group-hover:text-[#E8EAF6] transition-colors truncate">
                    {file}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Open source CTA */}
        <section className="pb-28">
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
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(29,211,176,0.4), transparent)",
                }}
              />
              <p className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.45em] text-[#1DD3B0]/35 uppercase mb-3">
                // Open Source
              </p>
              <h3 className="font-[var(--font-rajdhani)] text-2xl font-bold tracking-[0.15em] text-[#E8EAF6] mb-3">
                EVERYTHING IS PUBLIC
              </h3>
              <p className="font-[var(--font-inter)] text-[#6B7A94] text-xs leading-relaxed mb-6 max-w-sm mx-auto">
                All system prompt files, skill files, and this website are open source.
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
                  href="/skills"
                  className="inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-xs tracking-[0.3em] text-[#6B7A94] hover:text-[#E8EAF6] transition-colors"
                >
                  EXPLORE SKILLS
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
