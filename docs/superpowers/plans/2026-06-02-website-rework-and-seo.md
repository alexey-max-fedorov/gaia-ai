# Website Inner-Page Rework + SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full visual rework of the three inner pages (`/architecture`, `/connectors`, `/get-started`) to homepage-level polish, plus a complete SEO + AI-SEO layer for the new domain `gaiacode.pro`.

**Architecture:** Extract a small set of elevated, reusable HZD primitives (`PageHero`, `Panel`, `SectionHeading`, `FlowDiagram`, `FaqAccordion`) from the homepage's design language, then recompose each inner page from them with reworked copy and new sections. Split each inner page into a **server `page.tsx`** (exports `metadata` + injects JSON-LD) and a **client `*Client.tsx`** (the animated UI) — this is what unlocks per-page SEO in the App Router. SEO infra is centralized in `lib/seo.ts` and surfaced via `app/robots.ts`, `app/sitemap.ts`, dynamic `opengraph-image.tsx` routes, and `public/llms.txt`.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS 3, framer-motion 11, lucide-react, `next/og` (ImageResponse). Package manager: **pnpm** (run all commands from `website/`).

**The homepage (`app/page.tsx`) is NOT touched** for visual rework. The only home-affecting changes are sitewide SEO (root `layout.tsx` metadata, root OG image) — these don't alter the visible homepage.

---

## Testing approach (read first)

This repo has **no test runner** (confirmed: `website/package.json` has only `dev`/`build`/`start`/`lint`; CLAUDE.md states "There is no test suite. `pnpm build` + `pnpm lint` are the verification gates"). Adding a framework for a small marketing site is out of scope (YAGNI). So verification is **build + type-check + lint + runtime curl checks**, which genuinely catch the real failure modes here (broken JSX/types, malformed JSON-LD, wrong canonical URLs, missing OG/sitemap/robots routes):

- **Per task:** `pnpm exec tsc --noEmit` (type check) and `pnpm lint` (eslint). Fast, no network.
- **Phase boundaries:** `pnpm build` (Next validates route/metadata/sitemap/robots/OG exports end-to-end).
- **Final:** `pnpm build && pnpm start`, then `curl` the SEO routes and `grep` rendered HTML for canonical + JSON-LD.

Every task below gives the exact command and the expected output. Treat a failing type-check/lint/build exactly like a failing test: fix before moving on.

**Before starting:** create a feature branch.
```bash
cd /Users/alexey/Projects/gaia-ai
git checkout -b website-rework-seo
cd website && pnpm install
```
Expected: `pnpm install` completes with "Done".

---

## File structure

**New files**
- `website/lib/seo.ts` — `SITE_URL`, `pageMetadata()` helper, JSON-LD builders.
- `website/lib/og.tsx` — shared `next/og` renderer + `OG_SIZE`/`OG_CONTENT_TYPE`.
- `website/components/JsonLd.tsx` — `<script type="application/ld+json">` injector.
- `website/components/PageHero.tsx` — dramatic reusable inner-page hero (scramble title, kicker, ruled line, stat chips, CTA slot).
- `website/components/Panel.tsx` — elevated card shell (fill, top hairline, corner bracket, hover lift+glow, staggered reveal).
- `website/components/SectionHeading.tsx` — consistent section intro (mono label + title + description).
- `website/components/FlowDiagram.tsx` — real gate→3-engines deployment diagram (animated connectors).
- `website/components/FaqAccordion.tsx` — accessible expandable FAQ (pairs with FAQPage JSON-LD).
- `website/components/useScramble.ts` — extracted scramble hook (used by `PageHero`).
- `website/app/robots.ts` — AI-bot-friendly robots.
- `website/app/sitemap.ts` — sitemap for all 4 routes.
- `website/app/opengraph-image.tsx` — default/home OG image.
- `website/app/architecture/opengraph-image.tsx`, `website/app/connectors/opengraph-image.tsx`, `website/app/get-started/opengraph-image.tsx` — per-page OG.
- `website/app/architecture/ArchitectureClient.tsx`, `website/app/connectors/ConnectorsClient.tsx`, `website/app/get-started/GetStartedClient.tsx` — client UIs.
- `website/public/llms.txt` — AI context file.

**Modified files**
- `website/lib/site.ts` — add `SITE`, `LAST_UPDATED`, `PAGE_SEO`, `FAQS`, `CONNECTORS` (moved here, enriched), `TURN_FLOW`, hero `STATS`, `PREREQS`.
- `website/app/layout.tsx` — full SEO metadata + sitewide JSON-LD.
- `website/app/architecture/page.tsx`, `website/app/connectors/page.tsx`, `website/app/get-started/page.tsx` — become thin server wrappers.
- `README.md` — domain `use-gaia-ai.vercel.app` → `gaiacode.pro`.

---

# PHASE 1 — Content model & SEO foundations

### Task 1: Extend the content model in `lib/site.ts`

**Files:**
- Modify: `website/lib/site.ts`

- [ ] **Step 1: Add the canonical site identity + freshness constant**

At the top of `website/lib/site.ts`, immediately after the existing `export const VERSION = "3.0.1";` line, add:

```ts
// Canonical site identity — single source of truth for the live domain.
export const SITE = {
  url: "https://gaiacode.pro",
  name: "GAIA Code",
  tagline: "Claude Code's workflow, inside a Perplexity Space.",
  description:
    "GAIA Code brings Claude Code's engineering workflow into a Perplexity Space: persistent memory, a plan engine, context-budgeted turns, GitHub MCP, and a slash-command skill engine. Four prompt files, one Space.",
} as const;

// Shown as a freshness signal on pages and used for sitemap lastModified.
export const LAST_UPDATED = "2026-06-02";
```

- [ ] **Step 2: Add `SITE.url` into `URLS`**

In the existing `URLS` object, add a `site` key (keep all existing keys, including `rawBase` which must stay pointed at GitHub):

```ts
export const URLS = {
  site: "https://gaiacode.pro",
  github: "https://github.com/alexey-max-fedorov/gaia-ai",
  perplexity: "https://www.perplexity.ai",
  space: "https://www.perplexity.ai/spaces/gaia-ai-public-NKPRvyjfRlGm3jHZcPc_Fg",
  connectors: "https://www.perplexity.ai/account/connectors",
  instagram: "https://www.instagram.com/alexeyfedorov._",
  rawBase: "https://raw.githubusercontent.com/alexey-max-fedorov/gaia-ai/refs/heads/master",
} as const;
```

- [ ] **Step 3: Add per-page SEO copy, hero stats, runtime flow, connectors data, prereqs, and FAQs**

Append the following to the **end** of `website/lib/site.ts`:

```ts
// ── SEO: per-page title/description/keywords ────────────────────────────────
export interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
}

export const PAGE_SEO: Record<"architecture" | "connectors" | "getStarted", PageSeo> = {
  architecture: {
    title: "Architecture",
    description:
      "How GAIA Code fits together: one gate you paste into Perplexity Space Instructions and three engine files you upload — memory, plan, and turn engines — plus the slash-command skill engine.",
    keywords: [
      "GAIA Code architecture",
      "Perplexity Spaces prompt system",
      "Claude Code memory engine",
      "plan engine",
      "turn engine",
      "MCP",
    ],
  },
  connectors: {
    description:
      "Connect GitHub, n8n, and more to GAIA Code via Perplexity MCP connectors so it can act on your repos and automations — not just answer. Step-by-step setup for each connector.",
    title: "Connectors",
    keywords: [
      "Perplexity connectors",
      "GitHub MCP",
      "n8n MCP server",
      "GAIA Code integrations",
      "Model Context Protocol",
    ],
  },
  getStarted: {
    title: "Get Started",
    description:
      "Deploy GAIA Code in your Perplexity Space in about two minutes: paste the gate, upload three engine files, pick a model, optionally connect GitHub. No install, fully open source.",
    keywords: [
      "GAIA Code setup",
      "install GAIA Code",
      "Perplexity Space setup",
      "Claude Code in Perplexity",
      "deploy prompt system",
    ],
  },
};

// ── Hero stat chips (one row per page) ──────────────────────────────────────
export interface Stat {
  value: string;
  label: string;
}

export const ARCH_STATS: Stat[] = [
  { value: "1", label: "Gate" },
  { value: "3", label: "Engine files" },
  { value: "4", label: "Engines" },
  { value: "15", label: "Tool calls / msg" },
];

export const CONN_STATS: Stat[] = [
  { value: "2", label: "Live connectors" },
  { value: "MCP", label: "Protocol" },
  { value: "R/W", label: "Repo access" },
  { value: "∞", label: "n8n workflows" },
];

export const START_STATS: Stat[] = [
  { value: "~2", label: "Minutes" },
  { value: "4", label: "Files" },
  { value: "0", label: "Installs" },
  { value: "100%", label: "Open source" },
];

// ── Architecture: the runtime loop (explore → plan → approve → execute) ──────
export interface TurnStep {
  n: string;
  title: string;
  body: string;
}

export const TURN_FLOW: TurnStep[] = [
  {
    n: "01",
    title: "Explore",
    body: "GAIA reads MEMORY.md and the repo before touching anything, rebuilding context after every auto-compaction.",
  },
  {
    n: "02",
    title: "Plan",
    body: "Non-trivial work becomes a written PLAN.md and TASKS.md you approve before a single line is generated.",
  },
  {
    n: "03",
    title: "Execute",
    body: "It works task-by-task within a 15-call tool budget, flipping each TASKS.md checkbox the moment that task lands.",
  },
  {
    n: "04",
    title: "Commit",
    body: "Changes are batched by file size and self-reviewed for the errors a build would catch before anything is pushed.",
  },
];

// ── Connectors (moved here from the page; enriched). `icon` maps to a Lucide
//    component in ConnectorsClient. ───────────────────────────────────────────
export type ConnectorStatus = "live" | "soon";

export interface ConnectorStep {
  num: string;
  title: string;
  description: string;
  action: { label: string; href: string } | null;
}

export interface Connector {
  id: string;
  name: string;
  icon: "github" | "workflow" | "database";
  status: ConnectorStatus;
  category: string;
  tagline: string;
  steps: ConnectorStep[];
}

export const CONNECTORS: Connector[] = [
  {
    id: "github",
    name: "GitHub",
    icon: "github",
    status: "live",
    category: "Source control",
    tagline:
      "Give GAIA Code read/write access to your repositories — read code, create branches, push commits, open PRs, and manage issues.",
    steps: [
      {
        num: "01",
        title: "Open Perplexity Connectors",
        description: "Go to `perplexity.ai/account/connectors`.",
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
    icon: "workflow",
    status: "live",
    category: "Automation",
    tagline: "Expose any n8n workflow as an MCP server so GAIA Code can trigger automations directly.",
    steps: [
      {
        num: "01",
        title: "Enable MCP in n8n",
        description:
          "Navigate to your n8n instance at `[yourproject].app.n8n.cloud/settings/mcp`. Enable the MCP server toggle and copy the MCP Server URL shown on that page.",
        action: null,
      },
      {
        num: "02",
        title: "Add Custom Connector in Perplexity",
        description:
          'Go to `perplexity.ai/account/connectors` and click "+ Custom Connector". Paste the MCP Server URL you copied from n8n, then click Add.',
        action: { label: "Open Connectors", href: "https://www.perplexity.ai/account/connectors" },
      },
    ],
  },
  {
    id: "supabase",
    name: "Supabase",
    icon: "database",
    status: "soon",
    category: "Database",
    tagline: "Query your Supabase database and run edge functions directly from GAIA Code.",
    steps: [],
  },
];

// ── Get Started: prerequisites ──────────────────────────────────────────────
export interface Prereq {
  title: string;
  body: string;
}

export const PREREQS: Prereq[] = [
  {
    title: "A Perplexity account",
    body: "Spaces are available on Perplexity. You'll create one new Space for GAIA Code.",
  },
  {
    title: "A capable model",
    body: "Claude Sonnet is recommended for the deepest reasoning. You'll select it in Space settings.",
  },
  {
    title: "A GitHub account (optional)",
    body: "Only needed if you want GAIA to read and write your repositories via the GitHub connector.",
  },
];

// ── FAQs (rendered as accordions + emitted as FAQPage JSON-LD) ───────────────
export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Record<"architecture" | "connectors" | "getStarted", Faq[]> = {
  architecture: [
    {
      q: "What is GAIA Code?",
      a: "GAIA Code is a four-file prompt system that runs inside a Perplexity Space. It brings Claude Code's engineering workflow — persistent memory, a plan engine, context-budgeted turns, and a slash-command skill engine — into a Perplexity conversation.",
    },
    {
      q: "Why is it split into four files instead of one prompt?",
      a: "One gate file (SYSTEM_INSTRUCTIONS.md) is pasted into Space Instructions and routes to three uploaded engine files. Splitting behavior, memory, and turn management keeps each engine focused and lets GAIA re-read memory and rules after Perplexity auto-compacts the conversation.",
    },
    {
      q: "What does each engine do?",
      a: "The behavior file defines identity, tool philosophy, and version rules. The memory engine maintains MEMORY.md, PLAN.md, and TASKS.md across compaction. The turn engine estimates token cost per turn, enforces a 15-call tool budget, and batches commits by file size.",
    },
    {
      q: "Do I need all four files?",
      a: "Yes. The gate is pasted into Space Instructions and the three engine files are uploaded as Space Files. GAIA reads all three on startup — skipping any one disables that engine.",
    },
  ],
  connectors: [
    {
      q: "What are GAIA Code connectors?",
      a: "Connectors are Perplexity MCP (Model Context Protocol) integrations that let GAIA Code act on external systems — like reading and writing GitHub repositories or triggering n8n workflows — instead of only answering questions.",
    },
    {
      q: "Which connectors are available?",
      a: "GitHub and n8n are live today. GitHub gives GAIA read/write repo access (branches, commits, PRs, issues). n8n exposes any workflow as an MCP server. A Supabase connector is coming soon.",
    },
    {
      q: "Is the GitHub connector safe?",
      a: "You authorize the connection through Perplexity's standard OAuth flow and control which scopes GitHub grants. You can revoke access at any time from your Perplexity connectors settings or your GitHub account.",
    },
  ],
  getStarted: [
    {
      q: "How long does it take to set up GAIA Code?",
      a: "About two minutes. You paste one gate file into your Space Instructions, upload three engine files, pick a model, and optionally connect GitHub. There is nothing to install.",
    },
    {
      q: "Do I need to install anything?",
      a: "No. GAIA Code runs entirely inside a Perplexity Space from four Markdown prompt files. There is no CLI, package, or local environment to set up.",
    },
    {
      q: "Which model should I use?",
      a: "Claude Sonnet is recommended for the deepest reasoning. You select the model in your Space settings after uploading the files.",
    },
    {
      q: "Is GAIA Code free and open source?",
      a: "Yes. The full prompt system and this website are open source on GitHub. You can fork it, modify it, or use it as-is.",
    },
  ],
};
```

- [ ] **Step 4: Type-check and lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: no type errors; eslint prints "No ESLint warnings or errors" (or only pre-existing warnings unrelated to `lib/site.ts`).

- [ ] **Step 5: Commit**

```bash
git add website/lib/site.ts
git commit -m "website: extend content model with SEO copy, FAQs, connectors data, hero stats"
```

---

### Task 2: SEO library — metadata helper + JSON-LD builders

**Files:**
- Create: `website/lib/seo.ts`
- Create: `website/components/JsonLd.tsx`

- [ ] **Step 1: Create `website/lib/seo.ts`**

```ts
// website/lib/seo.ts
// Central SEO helpers: page metadata + JSON-LD structured-data builders.
import type { Metadata } from "next";
import { SITE, URLS, VERSION, LAST_UPDATED } from "@/lib/site";

export const SITE_URL = SITE.url;

/** Build per-page Metadata with canonical URL, Open Graph, and Twitter card. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string; // e.g. "/architecture" ("" for home)
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: opts.path || "/" },
    openGraph: {
      title: `${opts.title} · ${SITE.name}`,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title} · ${SITE.name}`,
      description: opts.description,
    },
  };
}

/** Sitewide Organization entity. */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description: SITE.description,
    sameAs: [URLS.github, URLS.instagram],
  };
}

/** Sitewide WebSite entity. */
export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE_URL,
    description: SITE.description,
  };
}

/** The product itself, as a free SoftwareApplication. */
export function softwareApplicationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Perplexity Spaces (web)",
    softwareVersion: VERSION,
    url: SITE_URL,
    description: SITE.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isAccessibleForFree: true,
    sameAs: [URLS.github],
  };
}

/** Breadcrumb trail. Pass [{name,path}] from root to current page. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

/** FAQPage from a list of {q,a}. */
export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** HowTo (used by the Get Started page). */
export function howToLd(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** A WebPage entity with a freshness (dateModified) signal. */
export function webPageLd(opts: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${opts.title} · ${SITE.name}`,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    inLanguage: "en",
    dateModified: LAST_UPDATED,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE_URL },
  };
}
```

- [ ] **Step 2: Create `website/components/JsonLd.tsx`**

```tsx
// website/components/JsonLd.tsx
// Server-safe JSON-LD injector. Accepts one object or an array of objects.
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
```

- [ ] **Step 3: Type-check and lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: no errors. (`@/` path alias already resolves — existing pages use it.)

- [ ] **Step 4: Commit**

```bash
git add website/lib/seo.ts website/components/JsonLd.tsx
git commit -m "website: add SEO library (metadata helper + JSON-LD builders)"
```

---

### Task 3: Sitewide SEO metadata + JSON-LD in root layout

**Files:**
- Modify: `website/app/layout.tsx`

- [ ] **Step 1: Replace the `metadata` export and inject sitewide JSON-LD**

Replace the entire contents of `website/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Rajdhani, Exo_2, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SITE_URL, organizationLd, websiteLd, softwareApplicationLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo2",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GAIA Code — Claude Code's workflow inside a Perplexity Space",
    template: "%s · GAIA Code",
  },
  description: SITE.description,
  keywords: [
    "GAIA Code",
    "Perplexity",
    "Perplexity Spaces",
    "AI coding",
    "Claude Code",
    "Claude Code alternative",
    "MCP",
    "Model Context Protocol",
    "prompt system",
    "Horizon Zero Dawn",
  ],
  alternates: { canonical: "/" },
  applicationName: SITE.name,
  authors: [{ name: "Alexey Fedorov" }],
  creator: "Alexey Fedorov",
  openGraph: {
    title: "GAIA Code",
    description: SITE.description,
    url: SITE_URL,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GAIA Code",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rajdhani.variable} ${exo2.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <JsonLd data={[organizationLd(), websiteLd(), softwareApplicationLd()]} />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Type-check, lint, build**

Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm build`
Expected: build succeeds. Routes list shows `/` building without errors. (`metadataBase` removes the "metadataBase property not set" build warning.)

- [ ] **Step 3: Commit**

```bash
git add website/app/layout.tsx
git commit -m "website: sitewide SEO metadata + Organization/WebSite/SoftwareApplication JSON-LD"
```

---

# PHASE 2 — Elevated HZD primitives

### Task 4: Scramble hook + `PageHero`

**Files:**
- Create: `website/components/useScramble.ts`
- Create: `website/components/PageHero.tsx`

- [ ] **Step 1: Create `website/components/useScramble.ts`**

```ts
// website/components/useScramble.ts
"use client";
import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&";

/** Resolves `target` from random glyphs to the final string over `duration` ms. */
export function useScramble(target: string, delay = 250, duration = 1400) {
  const [text, setText] = useState(target);

  useEffect(() => {
    // Respect reduced-motion: skip the effect entirely.
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(target);
      return;
    }

    let raf = 0;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const resolved = Math.floor(progress * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (target[i] === " ") out += " ";
        else out += i < resolved ? target[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setText(out);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setText(target);
    };

    const t = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [target, delay, duration]);

  return text;
}
```

- [ ] **Step 2: Create `website/components/PageHero.tsx`**

```tsx
// website/components/PageHero.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Background from "@/components/Background";
import { useScramble } from "@/components/useScramble";
import type { Stat } from "@/lib/site";

export default function PageHero({
  kicker,
  title,
  subtitle,
  stats,
  children,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  stats?: Stat[];
  children?: ReactNode; // CTA row
}) {
  const scrambled = useScramble(title);

  return (
    <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <Background brackets scanlines radial="top" />

      {/* Ambient teal glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[420px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(29,211,176,0.10) 0%, rgba(29,211,176,0.02) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-[var(--font-ibm-mono)] text-[9px] md:text-[10px] tracking-[0.45em] text-[#1DD3B0]/55 uppercase mb-5"
        >
          {kicker}
        </motion.p>

        <h1
          className="font-[var(--font-rajdhani)] font-bold tracking-[0.13em] leading-none mb-5"
          style={{
            fontSize: "clamp(3rem, 9vw, 6rem)",
            background:
              "linear-gradient(90deg, #1DD3B0 0%, #7DD3FC 30%, #E8EAF6 52%, #7DD3FC 74%, #1DD3B0 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradient-flow 5s linear infinite",
            filter: "drop-shadow(0 0 28px rgba(29,211,176,0.30))",
          }}
        >
          {scrambled}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 md:w-40 h-px mx-auto mb-6"
          style={{ background: "linear-gradient(90deg, transparent, #1DD3B0, transparent)" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-[var(--font-inter)] text-[#9AA7BE] text-sm md:text-base max-w-xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            {children}
          </motion.div>
        )}

        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px max-w-2xl mx-auto border border-[#1DD3B0]/12 bg-[#1DD3B0]/12"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-[#080C18]/85 px-3 py-4 flex flex-col items-center gap-1">
                <span className="font-[var(--font-rajdhani)] text-2xl md:text-3xl font-bold text-[#1DD3B0] leading-none">
                  {s.value}
                </span>
                <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.25em] text-[#6B7A94] uppercase text-center">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Type-check and lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add website/components/useScramble.ts website/components/PageHero.tsx
git commit -m "website: add PageHero + useScramble primitives"
```

---

### Task 5: `Panel` and `SectionHeading`

**Files:**
- Create: `website/components/Panel.tsx`
- Create: `website/components/SectionHeading.tsx`

- [ ] **Step 1: Create `website/components/Panel.tsx`**

```tsx
// website/components/Panel.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Elevated HZD card: filled surface, top gradient hairline, optional corner
 * bracket, hover lift + glow, and a staggered scroll-reveal.
 */
export default function Panel({
  children,
  index = 0,
  className = "",
  eyebrow,
  badge,
  corner = true,
  hover = true,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  eyebrow?: ReactNode;
  badge?: string;
  corner?: boolean;
  hover?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden border border-[#1DD3B0]/15 bg-[#0D1526]/55 p-6 transition-all duration-300 ${
        hover
          ? "hover:-translate-y-1 hover:border-[#1DD3B0]/45 hover:bg-[#0D1526]/80 hover:shadow-[0_10px_40px_-12px_rgba(29,211,176,0.35)]"
          : ""
      } ${className}`}
    >
      {/* Top gradient hairline */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-90 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }}
      />
      {/* Corner bracket */}
      {corner && (
        <div
          aria-hidden
          className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#1DD3B0]/25 group-hover:border-[#1DD3B0]/60 transition-colors duration-300"
        />
      )}
      {badge && (
        <span className="absolute top-4 right-4 font-[var(--font-ibm-mono)] text-[10px] tracking-[0.25em] text-[#1DD3B0]/35">
          {badge}
        </span>
      )}
      {eyebrow && <div className="mb-3">{eyebrow}</div>}
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `website/components/SectionHeading.tsx`**

```tsx
// website/components/SectionHeading.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className = "",
}: {
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${alignment} ${className}`}
    >
      <p className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#1DD3B0]/50 uppercase mb-4">
        {label}
      </p>
      <h2 className="font-[var(--font-rajdhani)] text-3xl md:text-4xl font-bold tracking-[0.1em] text-[#E8EAF6] leading-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`font-[var(--font-inter)] text-[#9AA7BE] text-sm md:text-base leading-relaxed mt-3 max-w-xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
```

- [ ] **Step 3: Type-check and lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add website/components/Panel.tsx website/components/SectionHeading.tsx
git commit -m "website: add Panel + SectionHeading primitives"
```

---

### Task 6: `FlowDiagram` and `FaqAccordion`

**Files:**
- Create: `website/components/FlowDiagram.tsx`
- Create: `website/components/FaqAccordion.tsx`

- [ ] **Step 1: Create `website/components/FlowDiagram.tsx`**

```tsx
// website/components/FlowDiagram.tsx
"use client";

import { motion } from "framer-motion";
import { SPACE_FILES } from "@/lib/site";

const gate = SPACE_FILES.find((f) => f.deploy === "paste")!;
const uploads = SPACE_FILES.filter((f) => f.deploy === "upload");

function Node({
  file,
  role,
  summary,
  tag,
  accent,
  index,
}: {
  file: string;
  role: string;
  summary: string;
  tag: string;
  accent: "teal" | "blue";
  index: number;
}) {
  const code = accent === "teal" ? "text-[#1DD3B0]" : "text-[#7DD3FC]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full overflow-hidden border border-[#1DD3B0]/18 bg-[#0D1526]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#1DD3B0]/45 hover:shadow-[0_10px_40px_-12px_rgba(29,211,176,0.35)]"
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px opacity-50"
        style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }}
      />
      <span className="inline-block font-[var(--font-ibm-mono)] text-[7px] tracking-[0.3em] text-[#1DD3B0]/55 uppercase border border-[#1DD3B0]/22 px-1.5 py-0.5 mb-3">
        {tag}
      </span>
      <code className={`block font-[var(--font-ibm-mono)] text-sm ${code} mb-1`}>{file}</code>
      <p className="font-[var(--font-rajdhani)] text-[10px] font-bold tracking-[0.2em] text-[#E8EAF6]/55 uppercase mb-2">
        {role}
      </p>
      <p className="font-[var(--font-inter)] text-xs text-[#8A98B0] leading-relaxed">{summary}</p>
    </motion.div>
  );
}

const lineGrad = { background: "linear-gradient(180deg, #1DD3B0, rgba(29,211,176,0.15))" };

export default function FlowDiagram() {
  return (
    <div className="relative">
      {/* Gate node */}
      <div className="max-w-md mx-auto">
        <Node
          file={gate.file}
          role={gate.role}
          summary={gate.summary}
          tag="PASTE → SPACE INSTRUCTIONS"
          accent="teal"
          index={0}
        />
      </div>

      {/* Vertical stem from gate */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-px h-10 origin-top"
          style={lineGrad}
        />
      </div>

      {/* Horizontal bus (md+) */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="hidden md:block h-px w-2/3 mx-auto origin-center"
        style={{ background: "linear-gradient(90deg, transparent, #1DD3B0, transparent)" }}
      />

      {/* Three engine nodes with drop lines */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-5 mt-0">
        {uploads.map((f, i) => (
          <div key={f.id} className="flex flex-col items-center">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: "easeOut" }}
              className="hidden md:block w-px h-8 origin-top"
              style={lineGrad}
            />
            {/* Mobile connector */}
            <div className="md:hidden flex justify-center w-full">
              <div className="w-px h-6" style={lineGrad} />
            </div>
            <div className="w-full">
              <Node
                file={f.file}
                role={f.role}
                summary={f.summary}
                tag="UPLOAD → SPACE FILE"
                accent="blue"
                index={i + 1}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `website/components/FaqAccordion.tsx`**

```tsx
// website/components/FaqAccordion.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/site";

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="border border-[#1DD3B0]/12 bg-[#0D1526]/40 transition-colors duration-200 hover:border-[#1DD3B0]/25"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
            >
              <span className="font-[var(--font-rajdhani)] text-base md:text-lg font-bold tracking-[0.04em] text-[#E8EAF6]">
                {item.q}
              </span>
              <Plus
                className={`w-4 h-4 shrink-0 text-[#1DD3B0] transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="font-[var(--font-inter)] text-sm text-[#9AA7BE] leading-relaxed px-5 pb-5">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Type-check and lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: no errors. (`Plus` exists in lucide-react; `AnimatePresence` in framer-motion 11.)

- [ ] **Step 4: Commit**

```bash
git add website/components/FlowDiagram.tsx website/components/FaqAccordion.tsx
git commit -m "website: add FlowDiagram + FaqAccordion primitives"
```

---

# PHASE 3 — SEO infrastructure routes

### Task 7: `robots.ts` + `sitemap.ts`

**Files:**
- Create: `website/app/robots.ts`
- Create: `website/app/sitemap.ts`

- [ ] **Step 1: Create `website/app/robots.ts`**

```ts
// website/app/robots.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicitly welcome AI search/answer crawlers so they can cite us.
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "ClaudeBot",
          "anthropic-ai",
          "Claude-Web",
          "Google-Extended",
          "Bingbot",
          "Applebot-Extended",
        ],
        allow: "/",
      },
      // Block training-only crawler that doesn't drive citations.
      { userAgent: "CCBot", disallow: "/" },
      // Everyone else.
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
```

- [ ] **Step 2: Create `website/app/sitemap.ts`**

```ts
// website/app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { LAST_UPDATED } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_UPDATED);
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/architecture", priority: 0.8 },
    { path: "/connectors", priority: 0.8 },
    { path: "/get-started", priority: 0.9 },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
```

- [ ] **Step 3: Type-check, lint, build**

Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm build`
Expected: build output lists `/robots.txt` and `/sitemap.xml` as generated routes.

- [ ] **Step 4: Commit**

```bash
git add website/app/robots.ts website/app/sitemap.ts
git commit -m "website: add robots.ts (AI-bot allowlist) + sitemap.ts"
```

---

### Task 8: Dynamic OG images

**Files:**
- Create: `website/lib/og.tsx`
- Create: `website/app/opengraph-image.tsx`
- Create: `website/app/architecture/opengraph-image.tsx`
- Create: `website/app/connectors/opengraph-image.tsx`
- Create: `website/app/get-started/opengraph-image.tsx`

- [ ] **Step 1: Create the shared renderer `website/lib/og.tsx`**

```tsx
// website/lib/og.tsx
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Renders a Horizon-Zero-Dawn-styled 1200×630 OG card. Code-only (no fonts fetched). */
export function renderOg({ title, subtitle }: { title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#080C18",
          backgroundImage:
            "linear-gradient(rgba(29,211,176,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(29,211,176,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          position: "relative",
        }}
      >
        {/* Corner brackets */}
        <div style={{ position: "absolute", top: 48, left: 48, width: 56, height: 56, borderTop: "2px solid rgba(29,211,176,0.5)", borderLeft: "2px solid rgba(29,211,176,0.5)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: 48, right: 48, width: 56, height: 56, borderBottom: "2px solid rgba(29,211,176,0.5)", borderRight: "2px solid rgba(29,211,176,0.5)", display: "flex" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, color: "#1DD3B0", fontWeight: 700 }}>
            GAIA · CODE
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 96, fontWeight: 800, color: "#E8EAF6", letterSpacing: 4, lineHeight: 1.05 }}>
          {title}
        </div>

        <div style={{ display: "flex", width: 220, height: 4, background: "#1DD3B0", marginTop: 28, marginBottom: 28 }} />

        <div style={{ display: "flex", fontSize: 32, color: "#9AA7BE", maxWidth: 900, lineHeight: 1.35 }}>
          {subtitle}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
```

- [ ] **Step 2: Create the four OG route files**

`website/app/opengraph-image.tsx`:
```tsx
import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GAIA Code — Claude Code's workflow inside a Perplexity Space";
export default function Image() {
  return renderOg({ title: "GAIA CODE", subtitle: "Claude Code's workflow, inside a Perplexity Space." });
}
```

`website/app/architecture/opengraph-image.tsx`:
```tsx
import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GAIA Code — Architecture";
export default function Image() {
  return renderOg({ title: "ARCHITECTURE", subtitle: "One gate. Three engines. Here's how GAIA Code fits together." });
}
```

`website/app/connectors/opengraph-image.tsx`:
```tsx
import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GAIA Code — Connectors";
export default function Image() {
  return renderOg({ title: "CONNECTORS", subtitle: "Wire up GitHub, n8n, and more via Perplexity MCP." });
}
```

`website/app/get-started/opengraph-image.tsx`:
```tsx
import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GAIA Code — Get Started";
export default function Image() {
  return renderOg({ title: "GET STARTED", subtitle: "Deploy GAIA Code in your Perplexity Space in ~2 minutes." });
}
```

- [ ] **Step 3: Build (validates OG image generation)**

Run: `pnpm build`
Expected: build succeeds and lists `/opengraph-image`, `/architecture/opengraph-image`, `/connectors/opengraph-image`, `/get-started/opengraph-image` as routes. If the build complains that `next/og` needs an explicit runtime, add `export const runtime = "nodejs";` to each OG route file and rebuild.

- [ ] **Step 4: Commit**

```bash
git add website/lib/og.tsx website/app/opengraph-image.tsx website/app/architecture/opengraph-image.tsx website/app/connectors/opengraph-image.tsx website/app/get-started/opengraph-image.tsx
git commit -m "website: dynamic HZD Open Graph images for all routes"
```

---

### Task 9: `llms.txt`

**Files:**
- Create: `website/public/llms.txt`

- [ ] **Step 1: Create `website/public/llms.txt`**

```text
# GAIA Code

> GAIA Code is a four-file prompt system that runs Claude Code's engineering workflow inside a Perplexity Space: persistent memory, a plan engine, context-budgeted turns, GitHub MCP integration, and a slash-command skill engine. It is free and open source.

GAIA Code is not an app you install. It ships as four Markdown prompt files: one gate file (SYSTEM_INSTRUCTIONS.md) pasted into a Perplexity Space's Instructions field, and three engine files (SYSTEM_PROMPT.md, MEMORY_ENGINE.md, TURN_ENGINE.md) uploaded as Space Files. GAIA reads all three on startup.

## Engines
- Persistent Memory: maintains MEMORY.md across Perplexity auto-compaction — project structure, standing notes, and self-recorded fixes.
- Plan Engine: explore → plan → approve → execute, tracked in PLAN.md and TASKS.md with per-task checkboxes.
- Turn Engine: estimates token cost per turn, enforces a 15-call tool budget, and batches commits by file size.
- Skill Engine: slash-command skills (e.g. /humanizer) loaded from Space files.

## Pages
- Home: https://gaiacode.pro/
- Architecture: https://gaiacode.pro/architecture — how the gate and three engines fit together.
- Connectors: https://gaiacode.pro/connectors — GitHub and n8n MCP setup; Supabase coming soon.
- Get Started: https://gaiacode.pro/get-started — deploy in ~2 minutes.

## Source
- GitHub: https://github.com/alexey-max-fedorov/gaia-ai

## Notes
- Recommended model: Claude Sonnet.
- Setup time: about two minutes; nothing to install.
- License: open source.
```

- [ ] **Step 2: Verify it ships as a static asset**

Run: `test -f website/public/llms.txt && echo "present"`
Expected: `present`. (Files in `public/` are served at the site root, so this resolves to `https://gaiacode.pro/llms.txt`.)

- [ ] **Step 3: Commit**

```bash
git add website/public/llms.txt
git commit -m "website: add llms.txt AI context file"
```

---

# PHASE 4 — Page reworks (server/client split)

> Each page becomes a thin **server** `page.tsx` (metadata + JSON-LD) that renders a **client** `*Client.tsx`. Do the rework page-by-page so each builds independently.

### Task 10: Architecture page rework

**Files:**
- Create: `website/app/architecture/ArchitectureClient.tsx`
- Modify (replace): `website/app/architecture/page.tsx`

- [ ] **Step 1: Create `website/app/architecture/ArchitectureClient.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Panel from "@/components/Panel";
import FlowDiagram from "@/components/FlowDiagram";
import FaqAccordion from "@/components/FaqAccordion";
import EngineCard from "@/components/EngineCard";
import { ENGINES, TURN_FLOW, FAQS, ARCH_STATS, SPACE_FILES, URLS, LAST_UPDATED } from "@/lib/site";

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
              <h3 className="font-[var(--font-rajdhani)] text-2xl md:text-3xl font-bold tracking-[0.12em] text-[#E8EAF6] mb-3">
                READY TO DEPLOY?
              </h3>
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
```

- [ ] **Step 2: Replace `website/app/architecture/page.tsx` with a server wrapper**

```tsx
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, breadcrumbLd, faqLd, webPageLd } from "@/lib/seo";
import { PAGE_SEO, FAQS } from "@/lib/site";
import ArchitectureClient from "./ArchitectureClient";

const seo = PAGE_SEO.architecture;

export const metadata: Metadata = pageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/architecture",
  keywords: seo.keywords,
});

export default function ArchitecturePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ title: seo.title, description: seo.description, path: "/architecture" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Architecture", path: "/architecture" },
          ]),
          faqLd(FAQS.architecture),
        ]}
      />
      <ArchitectureClient />
    </>
  );
}
```

- [ ] **Step 3: Type-check, lint, build**

Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm build`
Expected: build succeeds; `/architecture` builds with no errors.

- [ ] **Step 4: Commit**

```bash
git add website/app/architecture/
git commit -m "website: rework architecture page (elevated HZD) + per-page SEO/JSON-LD"
```

---

### Task 11: Connectors page rework

**Files:**
- Create: `website/app/connectors/ConnectorsClient.tsx`
- Modify (replace): `website/app/connectors/page.tsx`

- [ ] **Step 1: Create `website/app/connectors/ConnectorsClient.tsx`**

```tsx
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
              <h3 className="font-[var(--font-rajdhani)] text-2xl md:text-3xl font-bold tracking-[0.12em] text-[#E8EAF6] mb-3">
                NOT SET UP YET?
              </h3>
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
```

- [ ] **Step 2: Replace `website/app/connectors/page.tsx` with a server wrapper**

```tsx
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, breadcrumbLd, faqLd, webPageLd } from "@/lib/seo";
import { PAGE_SEO, FAQS } from "@/lib/site";
import ConnectorsClient from "./ConnectorsClient";

const seo = PAGE_SEO.connectors;

export const metadata: Metadata = pageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/connectors",
  keywords: seo.keywords,
});

export default function ConnectorsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ title: seo.title, description: seo.description, path: "/connectors" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Connectors", path: "/connectors" },
          ]),
          faqLd(FAQS.connectors),
        ]}
      />
      <ConnectorsClient />
    </>
  );
}
```

- [ ] **Step 3: Type-check, lint, build**

Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm build`
Expected: build succeeds. (Confirm `Github`, `Workflow`, `Database`, `GitBranch`, `GitPullRequest`, `CircleDot`, `Zap` all exist in lucide-react — they do in 0.469.0. If any import errors, swap to the nearest valid lucide icon and rebuild.)

- [ ] **Step 4: Commit**

```bash
git add website/app/connectors/
git commit -m "website: rework connectors page (elevated HZD, capabilities, FAQ) + SEO/JSON-LD"
```

---

### Task 12: Get Started page rework

**Files:**
- Create: `website/app/get-started/GetStartedClient.tsx`
- Modify (replace): `website/app/get-started/page.tsx`

- [ ] **Step 1: Create `website/app/get-started/GetStartedClient.tsx`**

> Preserves the working copy/download logic (`CopyButton`, `fetchFile`, `downloadFile`) verbatim; only the surrounding presentation is elevated.

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Copy, Check, Download, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Panel from "@/components/Panel";
import FaqAccordion from "@/components/FaqAccordion";
import EngineCard from "@/components/EngineCard";
import { SETUP_STEPS, SPACE_FILES, PREREQS, START_STATS, FAQS, ENGINES, URLS } from "@/lib/site";

function CopyButton({ getText, label = "Copy", className }: { getText: () => Promise<string> | string; label?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "copied">("idle");
  const handleCopy = async () => {
    setState("loading");
    try {
      const text = await getText();
      await navigator.clipboard.writeText(text);
      setState("copied");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("idle");
    }
  };
  return (
    <button
      onClick={handleCopy}
      disabled={state === "loading"}
      className={`inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] uppercase transition-colors disabled:opacity-50 cursor-pointer ${
        state === "copied" ? "text-[#1DD3B0]" : "text-[#B0B8CC]/60 hover:text-[#1DD3B0]"
      } ${className ?? ""}`}
    >
      {state === "copied" ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
      {state === "loading" ? "Fetching..." : state === "copied" ? "Copied" : label}
    </button>
  );
}

const fetchFile = (path: string) => async () => {
  const res = await fetch(`${URLS.rawBase}/${path}`);
  return res.text();
};

const downloadFile = (path: string, file: string) => async () => {
  const res = await fetch(`${URLS.rawBase}/${path}`);
  const blob = new Blob([await res.text()], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = file;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const STEP_ACTION: Record<string, { label: string; href: string }> = {
  "01": { label: "Open Perplexity", href: URLS.perplexity },
  "05": { label: "Open Connectors", href: URLS.connectors },
};

export default function GetStartedClient() {
  const instructionsFile = SPACE_FILES.find((f) => f.id === "instructions")!;
  const uploadFiles = SPACE_FILES.filter((f) => f.deploy === "upload");

  return (
    <div className="min-h-screen text-[#E8EAF6] overflow-x-hidden">
      <Header />
      <main>
        <PageHero
          kicker="// Setup · 6 steps"
          title="GET STARTED"
          subtitle="Deploy GAIA Code v3 in your Perplexity Space in about two minutes. Paste one file, upload three, pick a model. Nothing to install."
          stats={START_STATS}
        >
          <a
            href={URLS.space}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-7 py-3 bg-[#1DD3B0] text-[#080C18] hover:shadow-[0_0_28px_rgba(29,211,176,0.45)] transition-all duration-300 inline-flex items-center gap-2 hzd-btn-sweep"
          >
            LAUNCH A SPACE
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </PageHero>

        {/* Prerequisites */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5">
            <SectionHeading label="// Before you start" title="WHAT YOU'LL NEED" className="mb-10" />
            <div className="grid sm:grid-cols-3 gap-3">
              {PREREQS.map((p, i) => (
                <Panel key={p.title} index={i} badge={`0${i + 1}`}>
                  <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.12em] text-[#E8EAF6] mb-1.5">
                    {p.title}
                  </h3>
                  <p className="font-[var(--font-inter)] text-xs text-[#8A98B0] leading-relaxed">{p.body}</p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-3xl mx-auto px-5">
            <SectionHeading label="// Deploy · 6 steps" title="SET IT UP" className="mb-10" />
            <div className="relative">
              <div
                aria-hidden
                className="absolute top-6 bottom-6 w-px left-[23px]"
                style={{ background: "linear-gradient(180deg, #1DD3B0, rgba(29,211,176,0.06))" }}
              />
              <div className="space-y-3">
                {SETUP_STEPS.map((s, i) => {
                  const action = STEP_ACTION[s.num];
                  return (
                    <motion.div
                      key={s.num}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="relative flex gap-4"
                    >
                      <div className="relative z-10 shrink-0 w-12 h-12 flex items-center justify-center border border-[#1DD3B0]/35 bg-[#080C18] font-[var(--font-ibm-mono)] text-[9px] tracking-[0.2em] text-[#1DD3B0] shadow-[0_0_10px_rgba(29,211,176,0.12)]">
                        {s.num}
                      </div>
                      <div className="group relative flex-1 overflow-hidden border border-[#1DD3B0]/12 bg-[#0D1526]/55 p-5 transition-all duration-300 hover:border-[#1DD3B0]/30 hover:bg-[#0D1526]/75">
                        <div
                          aria-hidden
                          className="absolute top-0 left-0 right-0 h-px opacity-30 group-hover:opacity-80 transition-opacity"
                          style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }}
                        />
                        <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.13em] text-[#E8EAF6] mb-1.5">
                          {s.title}
                        </h3>
                        <p className="font-[var(--font-inter)] text-xs text-[#B0B8CC] leading-relaxed">{s.body}</p>

                        {s.num === "02" && (
                          <div className="relative border border-[#1DD3B0]/12 p-4 mt-3 bg-[#080C18]/70">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/35 uppercase">
                                // {instructionsFile.path}
                              </span>
                              <CopyButton getText={fetchFile(instructionsFile.path)} label="Copy Full Contents" />
                            </div>
                            <p className="font-[var(--font-ibm-mono)] text-[9px] text-[#B0B8CC]/50 leading-relaxed">
                              Click &ldquo;Copy Full Contents&rdquo; to fetch and copy the latest SYSTEM_INSTRUCTIONS.md from GitHub.
                            </p>
                          </div>
                        )}

                        {s.num === "03" && (
                          <div className="mt-3 space-y-2">
                            {uploadFiles.map((f) => (
                              <div
                                key={f.id}
                                className="flex items-center justify-between border border-[#1DD3B0]/12 px-3 py-2 bg-[#080C18]/70"
                              >
                                <span className="font-[var(--font-ibm-mono)] text-[10px] text-[#7DD3FC]/85">{f.file}</span>
                                <div className="flex items-center gap-4">
                                  <CopyButton getText={fetchFile(f.path)} label="Copy" />
                                  <button
                                    onClick={downloadFile(f.path, f.file)}
                                    className="inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/60 hover:text-[#1DD3B0] transition-colors uppercase cursor-pointer"
                                  >
                                    <Download className="w-2.5 h-2.5" /> Download
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {action && (
                          <a
                            href={action.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/60 hover:text-[#1DD3B0] transition-colors uppercase"
                          >
                            {action.label}
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* What you unlock */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-5xl mx-auto px-5">
            <SectionHeading
              label="// What you unlock"
              title={<>FOUR FILES IN, <span style={{ color: "#1DD3B0" }}>FULL WORKFLOW.</span></>}
              className="mb-10"
            />
            <div className="grid md:grid-cols-2 gap-3">
              {ENGINES.map((e, i) => (
                <EngineCard key={e.id} engine={e} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
          <div className="max-w-3xl mx-auto px-5">
            <SectionHeading label="// Questions" title="SETUP FAQ" align="center" className="mb-10" />
            <FaqAccordion items={FAQS.getStarted} />
          </div>
        </section>

        {/* Open source CTA */}
        <section className="relative py-16 md:py-28 border-t border-[#1DD3B0]/8">
          <div className="max-w-2xl mx-auto px-5">
            <Panel index={0} className="text-center p-8 md:p-10" corner={false}>
              <p className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.45em] text-[#1DD3B0]/40 uppercase mb-3">
                // Open source
              </p>
              <h3 className="font-[var(--font-rajdhani)] text-2xl md:text-3xl font-bold tracking-[0.12em] text-[#E8EAF6] mb-3">
                EVERYTHING IS PUBLIC
              </h3>
              <p className="font-[var(--font-inter)] text-[#9AA7BE] text-sm leading-relaxed mb-7 max-w-sm mx-auto">
                The prompt system and this website are fully open source. Fork it, modify it, or use it as-is.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={URLS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-7 py-3 border border-[#1DD3B0]/30 text-[#1DD3B0] hover:bg-[#1DD3B0]/10 transition-all duration-200"
                >
                  VIEW ON GITHUB
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/connectors"
                  className="inline-flex items-center gap-2 font-[var(--font-rajdhani)] text-sm tracking-[0.3em] text-[#9AA7BE] hover:text-[#E8EAF6] transition-colors"
                >
                  CONNECTORS
                  <ArrowRight className="w-3.5 h-3.5" />
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
```

- [ ] **Step 2: Replace `website/app/get-started/page.tsx` with a server wrapper (with HowTo JSON-LD)**

```tsx
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, breadcrumbLd, faqLd, howToLd, webPageLd } from "@/lib/seo";
import { PAGE_SEO, FAQS, SETUP_STEPS } from "@/lib/site";
import GetStartedClient from "./GetStartedClient";

const seo = PAGE_SEO.getStarted;

export const metadata: Metadata = pageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/get-started",
  keywords: seo.keywords,
});

export default function GetStartedPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ title: seo.title, description: seo.description, path: "/get-started" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Get Started", path: "/get-started" },
          ]),
          howToLd({
            name: "Deploy GAIA Code in a Perplexity Space",
            description: seo.description,
            steps: SETUP_STEPS.map((s) => ({ name: s.title, text: s.body })),
          }),
          faqLd(FAQS.getStarted),
        ]}
      />
      <GetStartedClient />
    </>
  );
}
```

- [ ] **Step 3: Type-check, lint, build**

Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm build`
Expected: build succeeds; `/get-started` builds with no errors.

- [ ] **Step 4: Commit**

```bash
git add website/app/get-started/
git commit -m "website: rework get-started page (elevated HZD, prereqs, FAQ) + HowTo/FAQ JSON-LD"
```

---

# PHASE 5 — Docs & final verification

### Task 13: Update README domain

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace the Get Started link (line ~21)**

Find:
```markdown
> GAIA reads all three uploaded files on startup; skipping any one disables that engine. The website's [Get Started](https://use-gaia-ai.vercel.app/get-started) page mirrors these steps with copy/download buttons for each file.
```
Replace the URL `https://use-gaia-ai.vercel.app/get-started` with `https://gaiacode.pro/get-started`.

- [ ] **Step 2: Replace the website URL (line ~55)**

Find:
```markdown
The Next.js marketing site at [use-gaia-ai.vercel.app](https://use-gaia-ai.vercel.app).
```
Replace with:
```markdown
The Next.js marketing site at [gaiacode.pro](https://gaiacode.pro).
```

- [ ] **Step 3: Verify no stale domain remains**

Run: `grep -rn "use-gaia-ai.vercel.app" README.md website/ || echo "clean"`
Expected: `clean` (no matches). If any match appears outside generated `.next/` output, update it to `gaiacode.pro`.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: point README at gaiacode.pro"
```

---

### Task 14: Full build + runtime SEO verification

**Files:** none (verification only)

- [ ] **Step 1: Clean production build + lint**

Run: `cd website && pnpm lint && pnpm build`
Expected: lint clean; build succeeds; route list includes `/`, `/architecture`, `/connectors`, `/get-started`, `/robots.txt`, `/sitemap.xml`, and the four `opengraph-image` routes. No "metadataBase not set" warning.

- [ ] **Step 2: Start the production server**

Run: `pnpm start` (in a background shell; serves on http://localhost:3000)
Expected: "Ready" log line.

- [ ] **Step 3: Verify SEO routes resolve**

Run:
```bash
curl -s http://localhost:3000/robots.txt | head -20
curl -s http://localhost:3000/sitemap.xml | head -20
curl -s http://localhost:3000/llms.txt | head -5
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" http://localhost:3000/architecture/opengraph-image
```
Expected: robots.txt lists the AI user-agents + `Sitemap: https://gaiacode.pro/sitemap.xml`; sitemap.xml contains `https://gaiacode.pro/architecture`; llms.txt shows the `# GAIA Code` header; the OG route returns `200 image/png`.

- [ ] **Step 4: Verify canonical + JSON-LD render in page HTML**

Run:
```bash
curl -s http://localhost:3000/architecture | grep -o '<link rel="canonical"[^>]*>'
curl -s http://localhost:3000/architecture | grep -c 'application/ld+json'
curl -s http://localhost:3000/get-started | grep -c '"@type":"HowTo"'
```
Expected: canonical href is `https://gaiacode.pro/architecture`; the ld+json count is ≥3 (sitewide Organization/WebSite/SoftwareApplication + page WebPage/Breadcrumb/FAQ); the HowTo count is ≥1 on get-started.

- [ ] **Step 5: Manual visual pass (responsive + reduced-motion)**

Open http://localhost:3000/architecture, /connectors, /get-started in a browser. Confirm against the homepage:
- Heroes have the scramble title, ruled line, stat row, and CTAs — no dead vertical void.
- Cards have fill + top hairline + corner bracket and lift/glow on hover (not flimsy outlines).
- The architecture FlowDiagram shows gate → bus → three engines with drawn connectors.
- FAQ accordions expand/collapse.
- Resize to 375px: no horizontal scroll; grids collapse to one column; the diagram stacks vertically.
- Enable OS "Reduce Motion": hero titles render final text immediately (no scramble), and animations are suppressed.

Stop the server when done.

- [ ] **Step 6: Final confirmation commit (if any tweaks were made during verification)**

```bash
git add -A && git commit -m "website: verification fixes" # only if step 5 required changes
```

---

## Self-review (performed against the spec)

**Spec coverage:**
- *"Besides the homepage… redesign with ui-ux-pro-max"* → Tasks 4–6 build elevated HZD primitives grounded in the ui-ux-pro-max design-system + UX guidance (Lucide icons, 150–300ms hover, staggered reveals, depth/elevation, reduced-motion, mobile-first); Tasks 10–12 fully rework all three inner pages. Homepage untouched. ✓
- *"add SEO, ai-seo to the website"* → Task 1 (extractable FAQ/definition copy), Task 2 (metadata helper + JSON-LD), Task 3 (sitewide metadata + Organization/WebSite/SoftwareApplication), Task 7 (robots allowing GPTBot/PerplexityBot/ClaudeBot/Google-Extended + sitemap), Task 8 (dynamic OG), Task 9 (llms.txt), per-page FAQPage/HowTo/Breadcrumb/WebPage JSON-LD in Tasks 10–12. ✓
- *"domain is gaiacode.pro"* → `SITE.url`/`metadataBase`/canonical/sitemap/robots/llms.txt all use `https://gaiacode.pro` (Tasks 1–3, 7–9). ✓
- *"update the domain in the README.md"* → Task 13. ✓

**Placeholder scan:** No "TBD"/"add error handling"/"similar to" — every code step is complete and paste-ready.

**Type/name consistency:** `pageMetadata`, `organizationLd`, `websiteLd`, `softwareApplicationLd`, `breadcrumbLd`, `faqLd`, `howToLd`, `webPageLd` (seo.ts) are used with matching signatures in Tasks 3, 10–12. `SITE`, `LAST_UPDATED`, `PAGE_SEO`, `FAQS`, `CONNECTORS`, `Connector`/`ConnectorStatus`/`ConnectorStep`, `TURN_FLOW`/`TurnStep`, `ARCH_STATS`/`CONN_STATS`/`START_STATS`/`Stat`, `PREREQS`/`Prereq`, `Faq` (site.ts) match their consumers. `Panel` props (`index`/`badge`/`corner`/`hover`/`eyebrow`), `PageHero` props (`kicker`/`title`/`subtitle`/`stats`/children), `SectionHeading` props (`label`/`title`/`description`/`align`), `FaqAccordion` (`items`), and `renderOg`/`OG_SIZE`/`OG_CONTENT_TYPE` are consistent across all usages.

**Known risk flagged inline:** lucide icon names (Task 11) and `next/og` runtime (Task 8) each have an explicit fallback instruction if the build complains.
