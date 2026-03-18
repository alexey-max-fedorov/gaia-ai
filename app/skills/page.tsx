"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlitchLogo from "@/components/GlitchLogo";

const SKILLS = [
  {
    name: "HEPHAESTUS",
    role: "Coding Engine",
    color: "#FF8C42",
    description:
      "Full Claude Code-inspired coding engine with Plan Mode, GitHub MCP integration, and implementation workflow. Handles all code generation, debugging, and repo work.",
    tags: ["Code Generation", "Debugging", "GitHub MCP", "Plan Mode"],
    badge: "ENGINE",
  },
  {
    name: "HADES",
    role: "Security & Pentesting",
    color: "#EF4444",
    description:
      "Threat modeling (STRIDE), vulnerability analysis, CVE research, pentest planning, and incident response. Authorization-gated for offensive techniques.",
    tags: ["Threat Modeling", "CVE Research", "Pentest", "Incident Response"],
  },
  {
    name: "MINERVA",
    role: "System Architecture",
    color: "#60A5FA",
    description:
      "ADR Mode for architectural decisions, distributed systems design, API design, database architecture, and capacity planning. No code generation.",
    tags: ["ADR Mode", "Distributed Systems", "API Design", "Capacity Planning"],
  },
  {
    name: "AETHER",
    role: "Analytics, Data Science & ML",
    color: "#1DD3B0",
    description:
      "Pipeline Plan Mode with 5 phases, EDA with Plotly charts, model training with proper evaluation, feature engineering, and statistical analysis.",
    tags: ["ML Pipelines", "EDA", "Statistics", "Data Viz"],
  },
  {
    name: "POSEIDON",
    role: "Quantitative Finance",
    color: "#3B82F6",
    description:
      "DCF, comps, options pricing (Black-Scholes + Greeks), portfolio construction, earnings analysis, and macro research. Valuation ranges, never point estimates.",
    tags: ["DCF", "Options", "Earnings", "Portfolio"],
  },
  {
    name: "DEMETER",
    role: "DevOps & Platform Engineering",
    color: "#4ADE80",
    description:
      "IaC Plan Mode with approval gates, Kubernetes, Terraform, CI/CD pipelines, observability design, cloud cost optimization, and incident response.",
    tags: ["Kubernetes", "Terraform", "CI/CD", "Observability"],
  },
  {
    name: "ARTEMIS",
    role: "Product Management",
    color: "#F472B6",
    description:
      "PRD Mode with 5 phases, RICE/ICE prioritization, competitive analysis, user story writing, and stakeholder alignment frameworks.",
    tags: ["PRDs", "Roadmaps", "Prioritization", "User Stories"],
  },
  {
    name: "ELEUTHIA",
    role: "Legal Research",
    color: "#A78BFA",
    description:
      "IRAC analysis mode, contract review with risk grading, regulatory research, employment law, IP analysis. Jurisdiction-aware with built-in disclaimer gates.",
    tags: ["Contract Review", "IRAC", "Regulatory", "IP Law"],
  },
  {
    name: "APOLLO",
    role: "Creative Writing & Worldbuilding",
    color: "#FBBF24",
    description:
      "World Bible Mode with 4 layers, canon consistency enforcement, story structure, character development, prose editing, and interactive narrative design.",
    tags: ["Worldbuilding", "Story Structure", "Characters", "Prose"],
  },
  {
    name: "ATHENA",
    role: "Scientific Research",
    color: "#E8EAF6",
    description:
      "Literature Review Mode with 4 phases, hypothesis formation, experiment design, paper critique, methodology selection, and a 6-tier evidence grading system.",
    tags: ["Literature Review", "Hypothesis", "Experiment Design", "Evidence Grading"],
  },
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-[#080C18] text-[#E8EAF6] overflow-x-hidden">
      <Header />

      <main className="pt-14">
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
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
          <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#1DD3B0]/50 uppercase mb-4"
            >
              // Subfunctions
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
              SKILLS
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.28, duration: 0.7 }}
              className="w-24 h-px mx-auto mb-5"
              style={{
                background: "linear-gradient(90deg, transparent, #1DD3B0, transparent)",
              }}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="font-[var(--font-inter)] text-[#B8C0D4] text-sm md:text-base max-w-md mx-auto leading-relaxed"
            >
              Ten specialized subfunctions, each an expert in its domain. GAIA routes
              every query to exactly the right one.
            </motion.p>
          </div>
        </section>

        {/* Grid */}
        <section className="pb-28">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: i * 0.055,
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative p-5 border group cursor-default transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(13,21,38,0.65)",
                    borderColor: `${skill.color}1A`,
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${skill.color}50`;
                    el.style.boxShadow = `0 0 28px ${skill.color}14, inset 0 0 16px ${skill.color}08`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${skill.color}1A`;
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-30 group-hover:opacity-80 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
                    }}
                  />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-11 h-11 flex items-center justify-center"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                        backgroundColor: `${skill.color}12`,
                        border: `1px solid ${skill.color}40`,
                        filter: `drop-shadow(0 0 5px ${skill.color}45)`,
                        minWidth: "44px",
                        minHeight: "44px",
                      }}
                    >
                      <GlitchLogo name={skill.name} size={28} />
                    </div>
                    {skill.badge && (
                      <span
                        className="font-[var(--font-ibm-mono)] text-[7px] tracking-[0.3em] px-2 py-1 border uppercase"
                        style={{
                          color: skill.color,
                          borderColor: `${skill.color}35`,
                          backgroundColor: `${skill.color}0D`,
                        }}
                      >
                        {skill.badge}
                      </span>
                    )}
                  </div>

                  {/* Skill name — Horizon font */}
                  <h3
                    className="font-horizon text-base tracking-[0.2em] mb-1"
                    style={{ color: skill.color }}
                  >
                    {skill.name}
                  </h3>
                  <p className="font-[var(--font-exo2)] text-[10px] tracking-[0.2em] text-[#B8C0D4] uppercase mb-3">
                    {skill.role}
                  </p>
                  <p className="font-[var(--font-inter)] text-xs text-[#B8C0D4] leading-relaxed mb-4">
                    {skill.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-[var(--font-ibm-mono)] text-[7px] tracking-[0.18em] px-2 py-0.5 uppercase border"
                        style={{
                          color: `${skill.color}85`,
                          borderColor: `${skill.color}20`,
                          backgroundColor: `${skill.color}08`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mt-16"
            >
              <p className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.4em] text-[#B8C0D4]/50 uppercase mb-5">
                Ready to use all ten subfunctions?
              </p>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-8 py-3.5 bg-[#1DD3B0] text-[#080C18] hover:shadow-[0_0_28px_rgba(29,211,176,0.45)] transition-all duration-300 hzd-btn-sweep"
              >
                GET STARTED
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
