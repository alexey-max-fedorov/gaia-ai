// website/lib/site.ts
// Single source of truth for the GAIA Code site: version, links, nav, and the v3 content model.

export const VERSION = "3.4";

// Canonical site identity — single source of truth for the live domain.
export const SITE = {
  url: "https://gaiacode.pro",
  name: "GAIA Code",
  tagline: "Claude Code's workflow, inside a Perplexity Space.",
  description:
    "GAIA Code brings Claude Code's engineering workflow into a Perplexity Space: persistent memory, a plan engine, context-budgeted turns, GitHub MCP, and a slash-command skill engine. Four prompt files, one Space.",
} as const;

// Shown as a freshness signal on pages and used for sitemap lastModified.
export const LAST_UPDATED = "2026-06-24";

export const URLS = {
  site: "https://gaiacode.pro",
  github: "https://github.com/alexey-max-fedorov/gaia-ai",
  perplexity: "https://www.perplexity.ai",
  space: "https://www.perplexity.ai/spaces/gaia-code-v3-public-EomKu5eoQtavBtnDvEDH6w",
  connectors: "https://www.perplexity.ai/account/connectors",
  instagram: "https://www.instagram.com/alexeyfedorov._",
  rawBase: "https://raw.githubusercontent.com/alexey-max-fedorov/gaia-ai/refs/heads/master",
} as const;

export const NAV = [
  { href: "/architecture", label: "ARCHITECTURE" },
  { href: "/connectors", label: "CONNECTORS" },
  { href: "/changelog", label: "CHANGELOG" },
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
      "Pasted into the Space Instructions field. Switches GAIA on, points it at the other three files, and hosts the slash-command skill engine — including installing skills straight from GitHub.",
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

// Optional slash-command skills (uploaded as Space Files, invoked with /<name>).
// Kept separate from SPACE_FILES so the core "four files" model stays intact.
export const SKILL_FILES: SpaceFile[] = [
  {
    id: "update",
    file: "update.md",
    path: "prompts/update.md",
    deploy: "upload",
    role: "Skill",
    summary:
      "Type /update to check whether a newer GAIA Code version is available — it compares your Space's version against the latest release and points you here to redeploy.",
  },
  {
    id: "doctor",
    file: "doctor.md",
    path: "prompts/doctor.md",
    deploy: "upload",
    role: "Skill",
    summary:
      "Type /doctor to verify your deployment — engine files present, versions consistent, memory initialized, GitHub MCP connected. Read-only.",
  },
  {
    id: "pr-review",
    file: "pr-review.md",
    path: "prompts/pr-review.md",
    deploy: "upload",
    role: "Skill",
    summary:
      "Type /pr-review owner/repo#123 to review a pull request — GAIA reads the full diff, analyzes it, and posts findings as a PR review.",
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
      "GAIA keeps a MEMORY.md in its sandbox — project structure, your standing notes, and observations it records itself. On first contact with a repo it reads the project's CLAUDE.md and AGENTS.md and seeds memory with its structure and conventions. It re-reads memory after every compaction and writes down mistakes it fixed so it never repeats them.",
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
      "Drop a skill file into the Space and call it with a slash command (e.g. /humanizer) — or install one straight from a GitHub repo. GAIA adapts external, non-ported skills to the tools it actually has.",
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

// ── Permission modes: how GAIA handles tool-call approval ────────────────────
export interface PermissionMode {
  id: string;
  name: string;
  badge: string;   // short tag shown on the card
  tagline: string;
  body: string;
}

export const PERMISSION_MODES: PermissionMode[] = [
  {
    id: "ask",
    name: "Ask Permissions",
    badge: "Default",
    tagline: "Approve every write.",
    body:
      "GAIA pauses for your approval before any tool call that changes external state — commits, pushes, PRs, issues, merges. Read-only calls run freely. This is the default until you choose otherwise.",
  },
  {
    id: "accept",
    name: "Accept Edits",
    badge: "Daily driver",
    tagline: "Routine writes flow, risky ones ask.",
    body:
      "GAIA commits, pushes branches, and opens PRs without stopping — but still asks before merging a PR, creating a repo, or writing to your default branch. Switch with /accept-edits.",
  },
  {
    id: "bypass",
    name: "Bypass Permissions",
    badge: "Hands-off",
    tagline: "No prompts, full speed.",
    body:
      "GAIA runs every tool call without asking. Switch on with /dangerously-skip-permissions and back with /ask-permissions — the choice is saved to MEMORY.md, so it survives auto-compaction.",
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

// ── SEO: per-page title/description/keywords ────────────────────────────────
export interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
}

export const PAGE_SEO: Record<"architecture" | "connectors" | "getStarted" | "changelog", PageSeo> = {
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
      "Connect GitHub, n8n, Supabase, and more to GAIA Code via Perplexity MCP connectors so it can act on your repos, automations, and database — not just answer. Step-by-step setup for each connector.",
    title: "Connectors",
    keywords: [
      "Perplexity connectors",
      "GitHub MCP",
      "n8n MCP server",
      "Supabase MCP",
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
  changelog: {
    title: "Changelog",
    description:
      "Every GAIA Code release — what each version added or fixed, from the first prompt to the current four-engine system.",
    keywords: [
      "GAIA Code changelog",
      "GAIA Code releases",
      "GAIA Code versions",
      "Perplexity prompt system updates",
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
  { value: "3", label: "Live connectors" },
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
    body: "GAIA reads MEMORY.md, the repo's CLAUDE.md and AGENTS.md, and the code before touching anything, rebuilding context after every auto-compaction.",
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
    status: "live",
    category: "Database",
    tagline: "Query your Supabase database, manage tables, and run edge functions directly from GAIA Code via the official Supabase remote MCP server.",
    steps: [
      {
        num: "01",
        title: "Open Perplexity Connectors",
        description:
          'Go to `perplexity.ai/account/connectors` and click "+ Custom Connector".',
        action: { label: "Open Connectors", href: "https://www.perplexity.ai/account/connectors" },
      },
      {
        num: "02",
        title: "Enter the Supabase MCP URL",
        description:
          "Paste the official Supabase remote MCP endpoint as the server URL: `https://mcp.supabase.com/mcp`. This is Supabase's hosted MCP server — no local install or personal access token required up front.",
        action: { label: "Supabase MCP docs", href: "https://supabase.com/docs/guides/ai-tools/mcp" },
      },
      {
        num: "03",
        title: "Authenticate with Supabase",
        description:
          "After adding the connector, Perplexity will initiate an OAuth flow. Log in to your Supabase account and authorize access. Your projects will be available to GAIA Code once the flow completes.",
        action: null,
      },
      {
        num: "04",
        title: "Scope to a specific project (optional)",
        description:
          "By default the MCP server can access all projects in your account. To limit it to one project, note your project ref from the Supabase dashboard URL (`https://supabase.com/dashboard/project/<project-ref>`) — you can share it with GAIA Code in your Space instructions so it targets the right database.",
        action: { label: "Supabase Dashboard", href: "https://supabase.com/dashboard" },
      },
    ],
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
    {
      q: "Can GAIA stop asking for approval on every action?",
      a: "Yes. GAIA Code has three permission modes. Ask Permissions — the default — prompts you before any write. Accept Edits auto-approves routine writes (commits, branches, PRs) but still asks before merges, repo creation, or default-branch writes. Bypass Permissions runs every tool call without asking. Switch with /ask-permissions, /accept-edits, and /dangerously-skip-permissions; the choice is stored in MEMORY.md so it persists across auto-compaction.",
    },
  ],
  connectors: [
    {
      q: "What are GAIA Code connectors?",
      a: "Connectors are Perplexity MCP (Model Context Protocol) integrations that let GAIA Code act on external systems — like reading and writing GitHub repositories, triggering n8n workflows, or querying a Supabase database — instead of only answering questions.",
    },
    {
      q: "Which connectors are available?",
      a: "GitHub, n8n, and Supabase are all live. GitHub gives GAIA read/write repo access (branches, commits, PRs, issues). n8n exposes any workflow as an MCP server. Supabase connects via the official remote MCP at mcp.supabase.com and authenticates through OAuth.",
    },
    {
      q: "Is the GitHub connector safe?",
      a: "You authorize the connection through Perplexity's standard OAuth flow and control which scopes GitHub grants. You can revoke access at any time from your Perplexity connectors settings or your GitHub account.",
    },
    {
      q: "Does the Supabase connector need a personal access token?",
      a: "No. The official Supabase remote MCP server at mcp.supabase.com uses OAuth — you authenticate through your Supabase account in the browser. No token generation or manual configuration is required.",
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

// ── Changelog (rendered at /changelog; keep in sync with the README version table) ──
export interface ChangelogEntry {
  version: string;
  date: string;
  notes: string;
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "3.4",
    date: "June 2026",
    notes:
      "Accept Edits permission mode (/accept-edits), /status & /help built-ins, memory export + compaction, plan archiving, /doctor & /pr-review bundled skills, /update lists what's new, skill-engine guardrail, CI version-sync, this changelog page.",
  },
  {
    version: "3.3",
    date: "June 2026",
    notes:
      "Permission modes — Ask Permissions (default) / Bypass Permissions — stored in MEMORY.md, with /dangerously-skip-permissions & /ask-permissions; firmer PR-footer attribution; standardized [Tool Name] tool-input summaries.",
  },
  {
    version: "3.2",
    date: "June 2026",
    notes: "/update check-for-updates skill — compares your Space's version against the latest release.",
  },
  {
    version: "3.1",
    date: "June 2026",
    notes: "Commit co-authorship (Co-Authored-By: GAIA Code) and a 🌱 Generated with GAIA Code footer on every new PR.",
  },
  {
    version: "3.0.2",
    date: "June 2026",
    notes: "Auto-reads CLAUDE.md/AGENTS.md into memory on first repo touch; install skills from GitHub via the skill engine.",
  },
  {
    version: "3.0.1",
    date: "June 2026",
    notes: "Registry-JSON version lookup; per-task TASKS.md writes; mistakes recorded to memory; self-review before push.",
  },
  {
    version: "3.0.0",
    date: "June 2026",
    notes: "Prompt-system overhaul: memory, plan & turn engines, skill engine, multi-file architecture.",
  },
  { version: "2.1", date: "March 2026", notes: "Commit batching rules; GAIA Code rebrand." },
  { version: "1.0", date: "March 2026", notes: "Initial release." },
];
