"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GITHUB_URL = "https://github.com/alexey-max-fedorov/gaia-ai";
const VERSION_URL =
  "https://raw.githubusercontent.com/alexey-max-fedorov/gaia-ai/refs/heads/master/VERSION";

const TASK_PROMPT = `Compare the current version of GAIA AI to ${VERSION_URL}.
- If the versions are the same, say "GAIA AI is up to date".
- If the versions are different, say "GAIA AI can be updated to [new version from the url]. Update now: https://use-gaia-ai.vercel.app/update"`;

const STEPS = [
  {
    num: "01",
    title: "Open Your GAIA AI Space",
    description: "Navigate to your GAIA AI Space on Perplexity.ai.",
  },
  {
    num: "02",
    title: "Go to Scheduled Tasks",
    description:
      "Click Scheduled Tasks in the left sidebar of your Space.",
  },
  {
    num: "03",
    title: "Create a New Task",
    description: "Click Create Task to open the task creation form.",
  },
  {
    num: "04",
    title: "Paste the Instructions",
    description:
      "Copy the prompt below and paste it into the Instructions field of the task.",
  },
  {
    num: "05",
    title: "Set Schedule to Weekly",
    description:
      "Under Schedule, select Weekly. You can also turn off email notifications if preferred.",
  },
  {
    num: "06",
    title: "Save",
    description:
      "Click Save. GAIA AI will now check for updates every week and notify you when a new version is available.",
  },
];

export default function UpdatePage() {
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
          <div className="absolute top-[72px] left-5 w-10 h-10 border-l border-t border-[#1DD3B0]/20" />
          <div className="absolute top-[72px] right-5 w-10 h-10 border-r border-t border-[#1DD3B0]/20" />

          <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#1DD3B0]/50 uppercase mb-4"
            >
              // Optional &middot; Auto-Update Checking
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
              STAY UPDATED
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
              Set up a weekly Perplexity Scheduled Task that automatically checks for new GAIA AI versions.
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
                      <p className="font-[var(--font-inter)] text-xs text-[#6B7A94]/80 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Prompt block */}
        <section className="py-14 border-t border-[#1DD3B0]/8">
          <div className="max-w-2xl mx-auto px-5">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#1DD3B0]/40 uppercase mb-4 text-center"
            >
              // Paste This into the Instructions Field
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative border border-[#1DD3B0]/15 p-5"
              style={{ backgroundColor: "rgba(13,21,38,0.7)" }}
            >
              <div
                className="absolute top-0 left-[10%] right-[10%] h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(29,211,176,0.35), transparent)" }}
              />
              <pre className="font-[var(--font-ibm-mono)] text-[10px] text-[#6B7A94] leading-relaxed whitespace-pre-wrap break-words">
                {TASK_PROMPT}
              </pre>
            </motion.div>
          </div>
        </section>

        {/* Back CTA */}
        <section className="pb-28">
          <div className="max-w-2xl mx-auto px-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-xs tracking-[0.3em] text-[#6B7A94] hover:text-[#E8EAF6] transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                BACK TO SETUP
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-xs tracking-[0.3em] font-bold px-6 py-2.5 border border-[#1DD3B0]/30 text-[#1DD3B0] hover:bg-[#1DD3B0]/10 transition-all duration-200"
              >
                VIEW ON GITHUB
                <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
