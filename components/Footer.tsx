import Link from "next/link";

const LINKS = [
  { label: "SKILLS",       href: "/skills",       external: false },
  { label: "HEPHAESTUS",   href: "/hephaestus",   external: false },
  { label: "GITHUB",       href: "https://github.com/alexey-max-fedorov/gaia-ai", external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1DD3B0]/8 py-8">
      <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">

        <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.35em] text-[#6B7A94]/30 uppercase">
          GAIA AI &middot; v1.0 &middot; Built for Perplexity
        </span>

        <div className="flex items-center gap-6">
          {LINKS.map((l) =>
            l.external ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.25em] text-[#6B7A94]/30 hover:text-[#1DD3B0]/60 transition-colors uppercase"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.25em] text-[#6B7A94]/30 hover:text-[#1DD3B0]/60 transition-colors uppercase"
              >
                {l.label}
              </Link>
            )
          )}
        </div>

        <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.2em] text-[#6B7A94]/22 uppercase">
          By{" "}
          <a
            href="https://www.instagram.com/alexeyfedorov._"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1DD3B0]/55 transition-colors"
          >
            Alexey Fedorov
          </a>
        </span>

      </div>
    </footer>
  );
}
