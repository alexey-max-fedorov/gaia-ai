"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Panel from "@/components/Panel";
import { CHANGELOG, VERSION, URLS } from "@/lib/site";

export default function ChangelogClient() {
  return (
    <div className="min-h-screen text-[#E8EAF6] overflow-x-hidden">
      <Header />
      <main>
        <PageHero
          kicker="// Release history"
          title="CHANGELOG"
          subtitle={`Every GAIA Code release, newest first. Run /update in your Space to check whether you're on ${VERSION}.`}
        />
        <section className="relative py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-5 flex flex-col gap-3">
            {CHANGELOG.map((e, i) => (
              <Panel key={e.version} index={i} badge={`v${e.version}`}>
                <div className="flex items-baseline gap-3 mb-2">
                  <h2 className="font-[var(--font-rajdhani)] text-xl font-bold tracking-[0.12em] text-[#E8EAF6] group-hover:text-[#1DD3B0] transition-colors">
                    v{e.version}
                  </h2>
                  <span className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.3em] uppercase text-[#1DD3B0]/60">
                    {e.date}
                  </span>
                  {i === 0 && (
                    <span className="font-[var(--font-ibm-mono)] text-[7px] tracking-[0.3em] uppercase px-1.5 py-0.5 border text-[#1DD3B0]/70 border-[#1DD3B0]/25">
                      Latest
                    </span>
                  )}
                </div>
                <p className="font-[var(--font-inter)] text-xs text-[#8A98B0] leading-relaxed">{e.notes}</p>
              </Panel>
            ))}
            <p className="font-[var(--font-inter)] text-xs text-[#6B7A94] leading-relaxed mt-6 text-center">
              Full diffs and release commits live on{" "}
              <a
                href={URLS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1DD3B0]/80 hover:text-[#1DD3B0] underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
