import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How gaiacode.pro handles data: a static site with no accounts, no cookies, and only cookieless aggregate analytics. GAIA Code itself is plain prompt files that run inside your own Perplexity Space.",
  path: "/privacy",
});

const SECTIONS = [
  {
    heading: "The short version",
    body: "This is a static website. It has no accounts, no forms, and no cookies. It uses cookieless, aggregate analytics to count page views.",
  },
  {
    heading: "GAIA Code itself",
    body: "GAIA Code is a set of prompt files you paste and upload into your own Perplexity Space. It is not software that runs on our servers, and we receive nothing from your Space, your conversations, or your connected accounts. Perplexity's own privacy policy governs what happens inside your Space.",
  },
  {
    heading: "Website analytics",
    body: "gaiacode.pro is hosted on GitHub Pages behind Cloudflare and uses Cloudflare Web Analytics, a cookieless, privacy-first service that reports aggregate page views and basic performance metrics. It does not use cookies or local storage, does not fingerprint visitors, and does not track you across sites.",
  },
  {
    heading: "Hosting",
    body: "As with any web host, GitHub and Cloudflare may process standard request data, such as IP addresses, to serve and protect the site, under their own privacy policies.",
  },
  {
    heading: "Links to other sites",
    body: "Pages link out to GitHub and Perplexity. Once you leave this domain, the destination's privacy policy applies.",
  },
  {
    heading: "Contact",
    body: "Questions go to alexey.max.fedorov@gmail.com or an issue on github.com/alexey-max-fedorov/gaia-ai. If this policy changes, this page will be updated first.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen text-[#E8EAF6] overflow-x-hidden">
      <Header />
      <main>
        <PageHero
          kicker="// Legal"
          title="PRIVACY"
          subtitle="What gaiacode.pro does and does not collect. Effective October 10, 2026."
        />
        <section className="relative py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-5 flex flex-col gap-8">
            {SECTIONS.map((s) => (
              <div key={s.heading}>
                <h2 className="font-[var(--font-rajdhani)] text-xl font-bold tracking-[0.12em] text-[#E8EAF6] mb-2">
                  {s.heading}
                </h2>
                <p className="text-sm leading-relaxed text-[#6B7A94]">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
