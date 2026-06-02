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
    fileId: "prompt",
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
