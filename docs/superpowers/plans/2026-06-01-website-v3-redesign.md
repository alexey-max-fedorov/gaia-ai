# GAIA Code Website v3 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the GAIA Code marketing site (`website/`, Next.js App Router) so it accurately represents GAIA Code **v3.0.1** — the four-file engine architecture and the four engines — with a refreshed HZD visual design and a new `/architecture` page.

**Architecture:** Introduce a single source of truth for all copy, version, URLs, and the v3 data model (`website/lib/site.ts`), extract the duplicated visual patterns (grid background, corner brackets, section eyebrow, timeline step) into shared components, then rebuild each page on top of that foundation. The existing Horizon-Zero-Dawn design language (teal `#1DD3B0`, Horizon/Rajdhani/IBM-Plex-Mono type, scramble + glitch motion, grid + scanline backdrop) is **kept and evolved**, not replaced.

**Tech Stack:** Next.js 15 (App Router, `"use client"` pages), React 19, TypeScript, Tailwind CSS 3, framer-motion 11, lucide-react. Package manager: **pnpm 9.15.0**. No new dependencies.

---

## How to read this plan

- **Copy & data are complete and live in one place.** Task 1 creates `website/lib/site.ts` with the *exact* final strings, version, URLs, and the v3 data arrays (`SPACE_FILES`, `ENGINES`, `INTEGRATIONS`, `RELIABILITY`, `SETUP_STEPS`, `NAV`). Page tasks consume this — they never hard-code copy or versions. This is the anti-placeholder guarantee: all real content is written out here.
- **Altitude for large markup.** Full shared components are given as complete code. For the page rebuilds, the plan gives the exact section order, the exact data each section renders, the exact new className/token patterns, and representative JSX — and, where a page reuses an *unchanged* HZD visual pattern (grid bg, gradient hero heading, corner brackets), it points at the existing `file:line` to lift from rather than re-pasting identical markup. The current code IS the spec for unchanged visuals.
- **Verification convention (no test suite — and we are not adding one; YAGNI).** This is a static marketing site. Each task verifies with:
  - `pnpm build` — must compile with no type errors (Next type-checks during build).
  - `pnpm lint` — must pass with no new errors.
  - Targeted `grep` content assertions (exact commands per task).
  - A manual visual check via `pnpm dev` at `http://localhost:3000` for redesign tasks.
  Run all `pnpm` commands from `website/`.

## Non-goals (explicitly out of scope)

- No dependency upgrades (Next/React/Tailwind stay on current majors). If a task seems to need one, stop and ask.
- No changes to the actual prompt files in `../prompts/` — the site only *describes* them.
- The 9 unused Greek-deity logo assets stay **as-is** (per decision): not removed, not newly wired in. `GlitchLogo` keeps working for `GAIA`.
- The root repo `README.md` is a separate surface; not covered here (offered separately).

---

## File Structure

**Create:**
- `website/lib/site.ts` — single source of truth: `VERSION`, `URLS`, `NAV`, and v3 data (`SPACE_FILES`, `ENGINES`, `INTEGRATIONS`, `RELIABILITY`, `SETUP_STEPS`). One responsibility: content/config constants.
- `website/components/Background.tsx` — the reusable HZD backdrop (grid + radial + scanlines + optional corner brackets). Replaces the inline copies in every page.
- `website/components/SectionLabel.tsx` — the `// Label` mono eyebrow used above every section.
- `website/components/Step.tsx` — one numbered timeline step (shared by get-started, connectors, architecture).
- `website/components/EngineCard.tsx` — a card for one engine (used on home bento grid + architecture page).
- `website/app/architecture/page.tsx` — the new deep-dive page (4 files + 4 engines + flow diagram).

**Modify:**
- `website/components/Header.tsx` — pull `NAV` from `lib/site`; add ARCHITECTURE link.
- `website/components/Footer.tsx` — version from `VERSION`; add ARCHITECTURE link.
- `website/app/layout.tsx` — v3 metadata (description, keywords, OG).
- `website/app/page.tsx` — full home redesign on the new foundation.
- `website/app/get-started/page.tsx` — rebuild for the 4-file setup; remove dead `STEPS` const.
- `website/app/connectors/page.tsx` — refactor onto shared components; minor copy.
- `website/app/globals.css` — add the few new utilities/keyframes the redesign needs; add `prefers-reduced-motion` guard.

---

## Task 0: Establish a green baseline

**Files:** none (verification only).

- [ ] **Step 1: Install and confirm the site currently builds**

```bash
cd website
pnpm install
pnpm build
```
Expected: build completes with "Compiled successfully" (warnings ok). If it fails on a pre-existing error, stop and report before changing anything.

- [ ] **Step 2: Record the current dev-server boot**

```bash
pnpm dev
```
Expected: "Ready" on `http://localhost:3000`. Open `/`, `/get-started`, `/connectors` to confirm all three render. Stop the server (Ctrl-C) before continuing.

---

## Task 1: Single source of truth — `lib/site.ts`

**Files:**
- Create: `website/lib/site.ts`

- [ ] **Step 1: Create `website/lib/site.ts` with the complete content model**

```ts
// website/lib/site.ts
// Single source of truth for the GAIA Code site: version, links, nav, and the v3 content model.

export const VERSION = "3.0.1";

export const URLS = {
  github: "https://github.com/alexey-max-fedorov/gaia-ai",
  perplexity: "https://www.perplexity.ai",
  space: "https://www.perplexity.ai/spaces/gaia-ai-public-NKPRvyjfRlGm3jHZcPc_Fg",
  connectors: "https://www.perplexity.ai/account/connectors",
  instagram: "https://www.instagram.com/alexeyfedorov._",
  rawBase: "https://raw.githubusercontent.com/alexey-max-fedorov/gaia-ai/refs/heads/master",
} as const;

export const NAV = [
  { href: "/architecture", label: "ARCHITECTURE" },
  { href: "/connectors", label: "CONNECTORS" },
  { href: "/get-started", label: "GET STARTED" },
] as const;

// The four prompt files that make up GAIA Code v3. `deploy` drives the get-started UI.
export type DeployKind = "paste" | "upload";
export interface SpaceFile {
  id: string;
  file: string;          // file name shown to the user
  path: string;          // path within the repo (under rawBase)
  deploy: DeployKind;    // "paste" into the Space Instructions box, or "upload" as a Space File
  role: string;          // short role label
  summary: string;       // one-sentence description
}

export const SPACE_FILES: SpaceFile[] = [
  {
    id: "instructions",
    file: "SYSTEM_INSTRUCTIONS.md",
    path: "prompts/SYSTEM_INSTRUCTIONS.md",
    deploy: "paste",
    role: "The gate",
    summary:
      "Pasted into the Space Instructions field. Switches GAIA on, points it at the other three files, and hosts the slash-command skill engine.",
  },
  {
    id: "prompt",
    file: "SYSTEM_PROMPT.md",
    path: "prompts/SYSTEM_PROMPT.md",
    deploy: "upload",
    role: "Behavior",
    summary:
      "GAIA's full behavioral prompt: identity, tool philosophy, dependency & version rules, security, and the Claude Code engineering philosophy.",
  },
  {
    id: "memory",
    file: "MEMORY_ENGINE.md",
    path: "prompts/MEMORY_ENGINE.md",
    deploy: "upload",
    role: "Memory + planning",
    summary:
      "Persistent memory (MEMORY.md) that survives auto-compaction, plus the plan engine (PLAN.md + TASKS.md) with per-task checkboxes.",
  },
  {
    id: "turn",
    file: "TURN_ENGINE.md",
    path: "prompts/TURN_ENGINE.md",
    deploy: "upload",
    role: "Turns + budget",
    summary:
      "Context-budget estimation so a turn never overflows, a 15-call tool budget, and size-aware commit batching.",
  },
];

// The four engines / capabilities to showcase.
export interface Engine {
  id: string;
  n: string;
  name: string;
  tagline: string;
  body: string;
}

export const ENGINES: Engine[] = [
  {
    id: "memory",
    n: "01",
    name: "Persistent Memory",
    tagline: "Survives auto-compaction.",
    body:
      "GAIA keeps a MEMORY.md in its sandbox — project structure, your standing notes, and observations it records itself. It re-reads memory after every compaction and writes down mistakes it fixed so it never repeats them.",
  },
  {
    id: "plan",
    n: "02",
    name: "Plan Engine",
    tagline: "Explore. Plan. Approve. Execute.",
    body:
      "Non-trivial work starts as a written PLAN.md you approve before a line is touched. Execution is tracked in TASKS.md with checkboxes flipped the moment each task lands — never batched at the end.",
  },
  {
    id: "turn",
    n: "03",
    name: "Turn Engine",
    tagline: "Never overflows the window.",
    body:
      "Before generating, GAIA estimates the token cost of a turn and stops at a safe boundary, so Perplexity doesn't crash mid-task. Commits are batched by file size for clean, reliable history.",
  },
  {
    id: "skill",
    n: "04",
    name: "Skill Engine",
    tagline: "Slash-command skills.",
    body:
      "Drop a skill file into the Space and call it with a slash command (e.g. /humanizer). GAIA adapts external, non-ported skills to the tools it actually has.",
  },
];

// Standalone integration highlight (was a v2 'feature'; now framed as an integration).
export const INTEGRATIONS = [
  {
    id: "github",
    name: "GitHub MCP",
    body:
      "Read repos, create branches, push commits, open PRs, and manage issues — all in one Perplexity conversation.",
  },
];

// v3.0.1 reliability points.
export const RELIABILITY = [
  {
    title: "Registry-pinned dependencies",
    body:
      "Versions come from the package registry's JSON API in real time — never a stale search snippet. No deprecated or vulnerable pins.",
  },
  {
    title: "Self-review before every push",
    body:
      "The sandbox can't compile, so GAIA re-reads generated code for the errors a build would catch before it ever pushes.",
  },
];

// Ordered deployment steps for get-started. `fileId` links a step to a SPACE_FILES entry (null = no file action).
export interface SetupStep {
  num: string;
  title: string;
  body: string;
  fileId: string | null;
}

export const SETUP_STEPS: SetupStep[] = [
  {
    num: "01",
    title: "Open Perplexity Spaces",
    body: "Go to Perplexity.ai, open Spaces, and create a new Space.",
    fileId: null,
  },
  {
    num: "02",
    title: "Paste the gate into Space Instructions",
    body:
      "In the Space's Instructions field, paste the full contents of SYSTEM_INSTRUCTIONS.md. This is the short routing file — not the full prompt.",
    fileId: "instructions",
  },
  {
    num: "03",
    title: "Upload the three engine files",
    body:
      "In Space Files, upload SYSTEM_PROMPT.md, MEMORY_ENGINE.md, and TURN_ENGINE.md. GAIA reads all three on startup — skipping any of them disables that engine.",
    fileId: "prompt", // UI also lists memory + turn; see Task 6
  },
  {
    num: "04",
    title: "Select your model",
    body: "Choose a model in Space settings. Claude Sonnet is recommended for the deepest reasoning.",
    fileId: null,
  },
  {
    num: "05",
    title: "Connect GitHub (optional)",
    body:
      "Add the GitHub connector in Perplexity so GAIA can read and write your repositories. See the Connectors page for the exact steps.",
    fileId: null,
  },
  {
    num: "06",
    title: "Start building",
    body:
      "Ask GAIA to write code, review a repo, plan a feature, or debug. It enters Plan Mode for significant tasks and checks in before implementing.",
    fileId: null,
  },
];
```

- [ ] **Step 2: Verify it type-checks**

```bash
cd website && pnpm exec tsc --noEmit
```
Expected: no output (clean). The file isn't imported yet, so this just confirms the types are valid.

- [ ] **Step 3: Commit**

```bash
git add website/lib/site.ts
git commit -m "website: add lib/site.ts single source of truth for v3 content"
```

---

## Task 2: Shared visual primitives + reduced-motion guard

**Files:**
- Create: `website/components/Background.tsx`, `website/components/SectionLabel.tsx`, `website/components/Step.tsx`, `website/components/EngineCard.tsx`
- Modify: `website/app/globals.css`

- [ ] **Step 1: Create `website/components/Background.tsx`**

Encapsulates the backdrop currently inlined in `app/page.tsx:95-137`, `app/get-started/page.tsx:111-123`, and `app/connectors/page.tsx:86-102`.

```tsx
// website/components/Background.tsx
import { CSSProperties } from "react";

const GRID: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(29,211,176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(29,211,176,0.04) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

export default function Background({
  brackets = false,
  scanlines = false,
  radial = "top",
}: {
  brackets?: boolean;
  scanlines?: boolean;
  radial?: "top" | "center" | "none";
}) {
  return (
    <>
      <div className="absolute inset-0" style={GRID} aria-hidden />
      {radial !== "none" && (
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              radial === "center"
                ? "radial-gradient(ellipse 80% 55% at 50% 42%, #0D2A35 0%, transparent 80%)"
                : "radial-gradient(ellipse 70% 50% at 50% 0%, #0D2A35 0%, #080C18 80%)",
          }}
        />
      )}
      {scanlines && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
            opacity: 0.4,
          }}
        />
      )}
      {brackets &&
        ["top-[72px] left-4", "top-[72px] right-4", "bottom-16 left-4", "bottom-16 right-4"].map((pos, i) => (
          <div
            key={i}
            aria-hidden
            className={`absolute w-8 h-8 md:w-12 md:h-12 border-[#1DD3B0]/20 ${
              i === 0 ? "border-l border-t" : i === 1 ? "border-r border-t" : i === 2 ? "border-l border-b" : "border-r border-b"
            } ${pos}`}
          />
        ))}
    </>
  );
}
```

- [ ] **Step 2: Create `website/components/SectionLabel.tsx`**

```tsx
// website/components/SectionLabel.tsx
export default function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#1DD3B0]/50 uppercase ${className}`}>
      {children}
    </p>
  );
}
```

- [ ] **Step 3: Create `website/components/Step.tsx`**

Generalizes the numbered timeline step duplicated in `app/get-started/page.tsx:182-217` and `app/connectors/page.tsx:238-291`. Supports an optional action link and an optional render slot for custom body content (copy/download buttons).

```tsx
// website/components/Step.tsx
import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

export default function Step({
  num,
  title,
  children,
  action,
}: {
  num: string;
  title: string;
  children?: ReactNode;
  action?: { label: string; href: string };
}) {
  return (
    <div className="relative flex gap-4">
      <div
        className="relative z-10 shrink-0 w-12 h-12 flex items-center justify-center border font-[var(--font-ibm-mono)] text-[9px] tracking-[0.2em] text-[#1DD3B0]"
        style={{ backgroundColor: "#080C18", borderColor: "rgba(29,211,176,0.35)", boxShadow: "0 0 10px rgba(29,211,176,0.12)" }}
      >
        {num}
      </div>
      <div
        className="relative flex-1 p-5 border border-[#1DD3B0]/10 hover:border-[#1DD3B0]/28 transition-colors duration-200"
        style={{ backgroundColor: "rgba(13,21,38,0.55)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px opacity-22" style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }} />
        <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.15em] text-[#E8EAF6] mb-1.5">{title}</h3>
        <div className="font-[var(--font-inter)] text-xs text-[#B0B8CC] leading-relaxed">{children}</div>
        {action && (
          <a
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/55 hover:text-[#1DD3B0] transition-colors uppercase"
          >
            {action.label}
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `website/components/EngineCard.tsx`**

```tsx
// website/components/EngineCard.tsx
"use client";

import { motion } from "framer-motion";
import { Engine } from "@/lib/site";

export default function EngineCard({ engine, index }: { engine: Engine; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.55 }}
      className="group relative p-6 border border-[#1DD3B0]/12 bg-[#0D1526]/50 hover:border-[#1DD3B0]/35 hover:bg-[#0D1526]/70 transition-all duration-200"
    >
      <div className="absolute top-0 left-0 right-0 h-px opacity-25" style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }} />
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-[var(--font-rajdhani)] text-lg font-bold tracking-[0.15em] text-[#E8EAF6] group-hover:text-[#1DD3B0] transition-colors">
          {engine.name}
        </span>
        <span className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.25em] text-[#1DD3B0]/35">{engine.n}</span>
      </div>
      <p className="font-[var(--font-ibm-mono)] text-[10px] tracking-[0.2em] uppercase text-[#1DD3B0]/60 mb-2">{engine.tagline}</p>
      <p className="font-[var(--font-inter)] text-xs text-[#6B7A94] leading-relaxed">{engine.body}</p>
    </motion.div>
  );
}
```

- [ ] **Step 5: Add a `prefers-reduced-motion` guard to `website/app/globals.css`**

Append to the end of the file (accessibility win for the redesign — the site is heavy on infinite animations):

```css
/* ──────────────────────────────────────────────────────────────────
   REDUCED MOTION — respect the OS setting
────────────────────────────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 6: Verify build + lint**

```bash
cd website && pnpm build && pnpm lint
```
Expected: compiles clean; lint passes. (Components are unused so far — that's fine; Next won't error on unused exports.)

- [ ] **Step 7: Commit**

```bash
git add website/components/Background.tsx website/components/SectionLabel.tsx website/components/Step.tsx website/components/EngineCard.tsx website/app/globals.css
git commit -m "website: add shared HZD primitives + reduced-motion guard"
```

---

## Task 3: Header & Footer — nav + version from constants

**Files:**
- Modify: `website/components/Header.tsx`, `website/components/Footer.tsx`

- [ ] **Step 1: Update `Header.tsx` to source `NAV` from `lib/site`**

Replace the local `NAV` const (`components/Header.tsx:6-9`) with an import:

```tsx
import { NAV } from "@/lib/site";
```
Delete the inline `const NAV = [...]`. The existing `.map(NAV)` render stays unchanged — it now renders three links (ARCHITECTURE, CONNECTORS, GET STARTED). No other change.

- [ ] **Step 2: Update `Footer.tsx` — version + architecture link**

In `components/Footer.tsx`:
- Add import: `import { VERSION, NAV } from "@/lib/site";`
- Replace the hard-coded version line (`Footer.tsx:13-15`) text `GAIA CODE &middot; v2.1 &middot; Built for Perplexity` with a template using `VERSION`:

```tsx
<span className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.35em] text-[#6B7A94]/30 uppercase">
  GAIA CODE &middot; v{VERSION} &middot; Built for Perplexity
</span>
```
- Replace the local `LINKS` array (`Footer.tsx:3-6`) with links derived from `NAV` plus the external GitHub link:

```tsx
const LINKS = [
  ...NAV.filter((n) => n.href !== "/get-started").map((n) => ({ label: n.label, href: n.href, external: false })),
  { label: "GITHUB", href: URLS.github, external: true },
];
```
(Add `URLS` to the import: `import { VERSION, NAV, URLS } from "@/lib/site";`)

- [ ] **Step 3: Verify**

```bash
cd website && pnpm build && grep -rn "v2.1" components/ ; echo "exit=$?"
```
Expected: build clean; grep prints nothing and `exit=1` (no v2.1 left in components).

- [ ] **Step 4: Commit**

```bash
git add website/components/Header.tsx website/components/Footer.tsx
git commit -m "website: header/footer nav + version from lib/site"
```

---

## Task 4: layout.tsx — v3 metadata

**Files:**
- Modify: `website/app/layout.tsx`

- [ ] **Step 1: Update the `metadata` export (`app/layout.tsx:32-45`)**

```tsx
export const metadata: Metadata = {
  title: {
    default: "GAIA Code",
    template: "%s · GAIA Code",
  },
  description:
    "Claude Code's workflow inside a Perplexity Space — persistent memory, a plan engine, context-budgeted turns, and a skill engine. Four prompt files, one Space.",
  keywords: ["GAIA Code", "Perplexity", "Perplexity Spaces", "AI coding", "Claude Code", "MCP", "Horizon Zero Dawn"],
  openGraph: {
    title: "GAIA Code",
    description:
      "Claude Code's workflow inside a Perplexity Space: memory, plan, turn, and skill engines.",
    type: "website",
  },
};
```

- [ ] **Step 2: Verify + commit**

```bash
cd website && pnpm build
git add website/app/layout.tsx
git commit -m "website: v3 metadata in layout"
```

---

## Task 5: Home page redesign

**Files:**
- Modify: `website/app/page.tsx`

Target section order (top → bottom): **Header (component)** → **Hero** → **Engines bento** → **Architecture teaser** → **Reliability strip** → **Deploy CTA** → **Footer (component)**.

- [ ] **Step 1: Swap the inlined header/footer for the shared components**

The home page currently re-implements the header (`app/page.tsx:55-89`) and footer (`app/page.tsx:407-439`) instead of using `components/Header.tsx` / `components/Footer.tsx`. Delete both inlined blocks and use the components (matches the other pages). Add imports:

```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import SectionLabel from "@/components/SectionLabel";
import EngineCard from "@/components/EngineCard";
import { ENGINES, INTEGRATIONS, RELIABILITY, URLS, VERSION } from "@/lib/site";
```
Page wrapper becomes:
```tsx
<div className="min-h-screen text-[#E8EAF6] overflow-x-hidden font-[var(--font-inter)]">
  <Header />
  <main className="pt-14">
    {/* sections below */}
  </main>
  <Footer />
</div>
```

- [ ] **Step 2: Keep the hero, fix its copy + version, use `Background`**

Keep the `useScramble` hook and the glitch title (`app/page.tsx:16-47, 158-198`) — unchanged, this is the brand. Inside the hero `<section>`, replace the four inlined backdrop divs (`app/page.tsx:95-137`) with `<Background brackets scanlines radial="center" />`. Then change:
- Status badge text (`app/page.tsx:153`): `System Online · v2.1` → use the constant:
  ```tsx
  System Online · v{VERSION}
  ```
- Hero description (`app/page.tsx:226-227`): replace "Paste one system prompt. Start coding." with:
  ```tsx
  Plan Mode, persistent memory, and a full Claude Code workflow — all inside a Perplexity Space. Four prompt files. One Space. Start building.
  ```
- Keep the two CTAs (`LAUNCH GAIA CODE` → `URLS.space`; `DEPLOYMENT INSTRUCTIONS` → `/get-started`). Replace the literal Perplexity URL with `URLS.space`.

- [ ] **Step 3: Replace the feature list with the Engines bento**

Delete the old `FEATURES` const (`app/page.tsx:9-14`) and the entire "FEATURES SECTION" (`app/page.tsx:282-347`). In its place add an engines section that maps `ENGINES` through `EngineCard` in a 2-col bento, with a `GitHub MCP` integration callout from `INTEGRATIONS`:

```tsx
<section className="relative py-24 md:py-32 overflow-hidden">
  <Background radial="none" />
  <div className="relative z-10 max-w-5xl mx-auto px-5">
    <SectionLabel className="mb-4">// Four engines</SectionLabel>
    <h2 className="font-[var(--font-rajdhani)] text-4xl md:text-5xl font-bold tracking-[0.1em] text-[#E8EAF6] mb-3 leading-tight">
      NOT A PROMPT. <span style={{ color: "#1DD3B0", textShadow: "0 0 20px rgba(29,211,176,0.4)" }}>A SYSTEM.</span>
    </h2>
    <p className="font-[var(--font-inter)] text-[#6B7A94] text-sm md:text-base max-w-xl leading-relaxed mb-10">
      v3 splits GAIA Code into four prompt files that drive four engines — so it remembers, plans, paces itself, and runs your skills.
    </p>
    <div className="grid md:grid-cols-2 gap-3">
      {ENGINES.map((e, i) => <EngineCard key={e.id} engine={e} index={i} />)}
    </div>
    {/* GitHub MCP integration callout */}
    <div className="mt-3 p-6 border border-[#1DD3B0]/12 bg-[#0D1526]/40">
      <span className="font-[var(--font-rajdhani)] text-lg font-bold tracking-[0.15em] text-[#E8EAF6]">{INTEGRATIONS[0].name}</span>
      <p className="font-[var(--font-inter)] text-xs text-[#6B7A94] leading-relaxed mt-2">{INTEGRATIONS[0].body}</p>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Add an Architecture teaser section linking to the new page**

Reuse the existing "BUILT FOR" section styling (`app/page.tsx:349-404`) as the visual template, but repurpose it to tease the architecture page:

```tsx
<section className="relative py-16 md:py-24 border-t border-[#1DD3B0]/8">
  <div className="max-w-5xl mx-auto px-5 text-center">
    <SectionLabel className="mb-5">// Architecture</SectionLabel>
    <h2 className="font-[var(--font-rajdhani)] text-3xl md:text-4xl font-bold tracking-[0.12em] text-[#E8EAF6] mb-4">
      ONE GATE. <span style={{ color: "#1DD3B0" }}>THREE ENGINES.</span>
    </h2>
    <p className="font-[var(--font-inter)] text-[#6B7A94] max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-8">
      Paste SYSTEM_INSTRUCTIONS.md into the Space, upload the three engine files, and GAIA wires itself up. See exactly how it fits together.
    </p>
    <Link href="/architecture" className="group font-[var(--font-rajdhani)] text-sm tracking-[0.3em] font-bold px-7 py-3 border border-[#1DD3B0]/35 text-[#1DD3B0] hover:bg-[#1DD3B0]/10 transition-all duration-200 inline-flex items-center gap-2">
      SEE THE ARCHITECTURE
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
</section>
```

- [ ] **Step 5: Add a reliability strip before the deploy CTA**

```tsx
<section className="relative py-12 border-t border-[#1DD3B0]/8">
  <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-2 gap-6">
    {RELIABILITY.map((r) => (
      <div key={r.title}>
        <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.12em] text-[#E8EAF6] mb-1.5">{r.title}</h3>
        <p className="font-[var(--font-inter)] text-xs text-[#6B7A94] leading-relaxed">{r.body}</p>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 6: Keep the deploy CTA + GitHub link; update copy**

Keep the final CTA block but change the lead line `Paste one system prompt. GAIA Code handles everything else.` (`app/page.tsx:378`) to:
```tsx
Four files in, GAIA Code handles the rest — memory, planning, and clean commits.
```
Point GitHub links at `URLS.github`.

- [ ] **Step 7: Verify (build, lint, no stale strings, visual)**

```bash
cd website && pnpm build && pnpm lint
grep -n "v2.1\|one system prompt\|Paste one" app/page.tsx ; echo "exit=$?"
```
Expected: build/lint clean; grep prints nothing, `exit=1`. Then `pnpm dev` and eyeball `/`: hero shows `v3.0.1`, engines bento renders 4 cards + GitHub callout, architecture teaser links to `/architecture`, footer shows `v3.0.1`.

- [ ] **Step 8: Commit**

```bash
git add website/app/page.tsx
git commit -m "website: redesign home around the v3 engines"
```

---

## Task 6: New `/architecture` page

**Files:**
- Create: `website/app/architecture/page.tsx`

Section order: **Header** → **Hero** ("ARCHITECTURE") → **Flow diagram** (gate → 3 uploaded files) → **The four files** (table/cards from `SPACE_FILES`) → **The four engines** (`EngineCard` grid) → **CTA to get-started** → **Footer**.

- [ ] **Step 1: Scaffold the page (client component) with hero**

Mirror the hero pattern from `app/connectors/page.tsx:78-147` (it's the canonical inner-page hero): `Header`, `<main className="pt-14">`, a hero `<section>` using `<Background brackets radial="top" />`, the gradient-flow `<h1>` reading `ARCHITECTURE`, eyebrow `// How GAIA Code fits together`, and a one-line subhead:
```
A gate you paste, three engine files you upload. Here's what each one does.
```

- [ ] **Step 2: Build the flow diagram (gate → 3 files)**

A responsive flow: one "gate" node (SYSTEM_INSTRUCTIONS, `deploy: "paste"`) connected to three "engine" nodes (the `deploy: "upload"` files). Build with styled divs + a connecting rule; no new dependency. Derive nodes from `SPACE_FILES`:

```tsx
const gate = SPACE_FILES.find((f) => f.deploy === "paste")!;
const uploads = SPACE_FILES.filter((f) => f.deploy === "upload");
```
Render the gate as a full-width card labeled `PASTE → SPACE INSTRUCTIONS`, a vertical connector line, then a 3-col grid of upload cards each labeled `UPLOAD → SPACE FILE`, showing `file`, `role`, and `summary`. Use the `EngineCard`-style border/hover tokens for visual consistency (teal top-rule, `bg-[#0D1526]/50`).

- [ ] **Step 3: "The four files" reference list**

Map all of `SPACE_FILES` into a clean list/table: monospace `file` name, a `deploy` chip (`PASTE` vs `UPLOAD`), `role`, and `summary`. Use `code` styling from the existing pages (`text-[#7DD3FC]/80 bg-[#7DD3FC]/8`).

- [ ] **Step 4: "The four engines" grid**

```tsx
<section className="relative py-16">
  <div className="max-w-5xl mx-auto px-5">
    <SectionLabel className="mb-4">// The engines</SectionLabel>
    <div className="grid md:grid-cols-2 gap-3">
      {ENGINES.map((e, i) => <EngineCard key={e.id} engine={e} index={i} />)}
    </div>
  </div>
</section>
```

- [ ] **Step 5: CTA to get-started + Footer**

A centered CTA (reuse the open-source CTA card style from `app/get-started/page.tsx:343-387`): heading `READY TO DEPLOY?`, button → `/get-started` (`SET IT UP`), secondary link → `URLS.github` (`VIEW ON GITHUB`). Close with `<Footer />`.

- [ ] **Step 6: Verify (build, lint, route, nav)**

```bash
cd website && pnpm build && pnpm lint
```
Expected: build shows `/architecture` in the route list; lint clean. `pnpm dev` → open `/architecture`: diagram renders gate + 3 upload nodes; nav highlights ARCHITECTURE; all four files + four engines present.

- [ ] **Step 7: Commit**

```bash
git add website/app/architecture/page.tsx
git commit -m "website: add /architecture deep-dive page"
```

---

## Task 7: get-started rebuild — the four-file setup (critical accuracy fix)

**Files:**
- Modify: `website/app/get-started/page.tsx`

The current page only has the user upload `SYSTEM_PROMPT.md` — following it produces a broken GAIA (no memory/turn/plan engines). Rebuild around `SETUP_STEPS` + `SPACE_FILES`.

- [ ] **Step 1: Remove dead code**

Delete the unused `STEPS` const (`app/get-started/page.tsx:43-82`) — it is never rendered.

- [ ] **Step 2: Generalize copy/download to all uploaded files**

Keep the `CopyButton` component (`app/get-started/page.tsx:14-41`). Replace the single-file `fetchSystemInstructions` / `downloadSystemPrompt` (`:85-102`) with helpers keyed by `SpaceFile`:

```tsx
import { SPACE_FILES, SETUP_STEPS, URLS } from "@/lib/site";

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
```

- [ ] **Step 3: Render steps from `SETUP_STEPS` using the shared `Step` component**

Replace the hand-rolled step markup (`:168-340`) with a `SETUP_STEPS.map(...)` over `Step`. Update the hero eyebrow from `// Setup · 5 Steps` to `// Setup · 6 Steps` and the subhead to "Six steps to deploy GAIA Code v3 in your Perplexity Space."

- [ ] **Step 4: Step 02 gets the gate's copy button; Step 03 lists all three upload files**

For the step whose `fileId === "instructions"` (paste): render a `CopyButton getText={fetchFile("prompts/SYSTEM_INSTRUCTIONS.md")} label="Copy Full Contents" />`.

For Step 03 (upload), render a small list of the three `deploy === "upload"` files, each with its own Copy + Download control:

```tsx
{SPACE_FILES.filter((f) => f.deploy === "upload").map((f) => (
  <div key={f.id} className="flex items-center justify-between border border-[#1DD3B0]/12 px-3 py-2" style={{ backgroundColor: "rgba(8,12,24,0.7)" }}>
    <span className="font-[var(--font-ibm-mono)] text-[10px] text-[#7DD3FC]/80">{f.file}</span>
    <div className="flex items-center gap-4">
      <CopyButton getText={fetchFile(f.path)} label="Copy" />
      <button onClick={downloadFile(f.path, f.file)} className="inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/55 hover:text-[#1DD3B0] transition-colors uppercase">
        <Download className="w-2.5 h-2.5" /> Download
      </button>
    </div>
  </div>
))}
```

- [ ] **Step 5: Verify (build, lint, the critical content assertions)**

```bash
cd website && pnpm build && pnpm lint
grep -c "MEMORY_ENGINE.md" app/get-started/page.tsx   # expect >= 1 (via data import it may be 0 in file; see note)
grep -n "STEPS =" app/get-started/page.tsx ; echo "exit=$?"   # expect nothing, exit=1 (dead const gone)
```
Note: the file names now come from `SPACE_FILES`, so they may not appear as literals in `page.tsx`. The real assertion is runtime: `pnpm dev` → `/get-started` shows Step 03 listing **SYSTEM_PROMPT.md, MEMORY_ENGINE.md, and TURN_ENGINE.md**, each with working Copy + Download. Confirm each Download fetches a non-empty file from `URLS.rawBase`.

- [ ] **Step 6: Commit**

```bash
git add website/app/get-started/page.tsx
git commit -m "website: rebuild get-started for the v3 four-file setup"
```

---

## Task 8: connectors — shared-component consistency pass

**Files:**
- Modify: `website/app/connectors/page.tsx`

- [ ] **Step 1: Use `Background` + `SectionLabel`**

Replace the inlined backdrop (`app/connectors/page.tsx:86-102`) with `<Background brackets radial="top" />` and the eyebrow `<motion.p>` (`:105-112`) with `SectionLabel`. Keep the `CONNECTORS` data and card rendering as-is (GitHub live, n8n live, Supabase soon) — content is version-agnostic and correct.

- [ ] **Step 2: Verify + commit**

```bash
cd website && pnpm build && pnpm lint
git add website/app/connectors/page.tsx
git commit -m "website: connectors uses shared background/label"
```

---

## Task 9: Final sweep — full build, lint, and site-wide staleness check

**Files:** none (verification + any fixes found).

- [ ] **Step 1: Site-wide grep for stale v2-era strings**

```bash
cd website
grep -rn "v2.1\|System Online · v2\|one system prompt\|Paste one system prompt" app/ components/ ; echo "exit=$?"
```
Expected: nothing, `exit=1`. If anything prints, fix it in the owning file and re-commit.

- [ ] **Step 2: Full production build + lint + typecheck**

```bash
pnpm build && pnpm lint && pnpm exec tsc --noEmit
```
Expected: all clean. Build route list includes `/`, `/architecture`, `/connectors`, `/get-started`.

- [ ] **Step 3: Manual responsive pass**

`pnpm dev`, then at 375px (mobile) and 1280px (desktop) widths confirm: nav is usable, the engines bento and architecture diagram stack cleanly, no horizontal scroll, all four `SPACE_FILES` download buttons work on `/get-started`.

- [ ] **Step 4: Final commit if Step 1/3 required fixes**

```bash
git add -A website/
git commit -m "website: v3 redesign final sweep"
```

---

## Self-Review

**1. Spec coverage**
- "Reflect v3.0.1 / four-file architecture" → Tasks 1 (data), 5 (home engines + arch teaser), 6 (architecture page), 7 (get-started four-file setup). ✓
- "Visual redesign" → Tasks 2 (primitives + reduced-motion), 5 (home re-layout: hero + bento + teaser + reliability), 6 (new page). HZD brand preserved. ✓
- "Dedicated /architecture page" → Task 6. ✓
- "Leave deity logos as-is" → no task touches `GlitchLogo`/`images/`; called out in Non-goals. ✓
- Version single-sourced (`VERSION` in `lib/site.ts`) and swept in Task 9. ✓

**2. Placeholder scan** — All copy/data is concrete in Task 1. Page tasks reference exact `file:line` anchors for unchanged visual patterns and give complete code for new patterns. No "TBD"/"handle later".

**3. Type/name consistency** — `SPACE_FILES`/`ENGINES`/`SETUP_STEPS` shapes defined in Task 1 are consumed with the same field names (`file`, `path`, `deploy`, `role`, `summary`, `n`, `tagline`, `body`, `fileId`) in Tasks 5–7. `Background` props (`brackets`, `scanlines`, `radial`) and `Step`/`EngineCard` props are used consistently. `@/lib/site` and `@/components/*` import aliases match the existing tsconfig path style used in the current pages.

**Open risk to watch during execution:** `SETUP_STEPS[2].fileId` is `"prompt"` but Step 03 renders *all three* upload files (Task 7 Step 4) — the `fileId` there is indicative, not a 1:1 link. Execute Task 7 Step 4 as written (filter `deploy === "upload"`), don't wire Step 03 to a single file.
