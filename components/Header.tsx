"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/skills",      label: "SKILLS" },
  { href: "/hephaestus",  label: "HEPHAESTUS" },
  { href: "/connectors",  label: "CONNECTORS" },
  { href: "/get-started", label: "GET STARTED" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[#1DD3B0]/10 backdrop-blur-xl bg-[#080C18]/75">
      <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">

        <Link
          href="/"
          className="font-[var(--font-horizon)] text-xl font-bold tracking-[0.22em] text-[#1DD3B0] transition-all duration-200 hover:opacity-80"
          style={{ textShadow: "0 0 16px rgba(29,211,176,0.55)" }}
        >
          GAIA<span className="opacity-35 mx-1">&middot;</span>AI
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative font-[var(--font-rajdhani)] text-xs tracking-[0.3em] transition-colors duration-200 group ${
                pathname === item.href
                  ? "text-[#1DD3B0]"
                  : "text-[#6B7A94] hover:text-[#1DD3B0]"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-[#1DD3B0] transition-all duration-300 ${
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        <Link
          href="/get-started"
          className="font-[var(--font-rajdhani)] text-xs tracking-[0.25em] px-4 py-2 border border-[#1DD3B0]/30 text-[#1DD3B0] hover:bg-[#1DD3B0]/10 hover:border-[#1DD3B0]/55 transition-all duration-200"
        >
          LAUNCH
        </Link>
      </div>
    </header>
  );
}
