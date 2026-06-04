## What this repo is

GAIA Code is a Claude Code-inspired **prompt system for Perplexity Spaces** — not a runnable app. The product ships as four Markdown prompt files that drive four "engines" inside a Perplexity conversation (persistent memory, plan engine, context-budgeted turns, slash-command skills). A Next.js marketing site lives alongside it.

Two distinct halves with no shared code:

| Path | What it is | Edit it when |
|---|---|---|
| `prompts/` | The actual product — prompt files deployed to a Perplexity Space | Changing GAIA's behavior, memory/planning/turn rules, or the skill engine |
| `website/` | Next.js 15 marketing site ([use-gaia-ai.vercel.app](https://use-gaia-ai.vercel.app)) | Changing the public site |
| `research/` | Reference material (Perplexity tool schemas, system prompt captures, skill examples) — **input, not shipped** | Rarely; background reading |
| `docs/superpowers/plans/` | Historical implementation plans | Rarely |

## Routing rules

- **"Change how GAIA behaves / memory / planning / turns"** → edit the relevant file in `prompts/`. These are prose specs read by an LLM at runtime, not code — there is nothing to build or test, but precision of wording is the whole game.
- **"Change the website"** → work in `website/`. Standard Next.js App Router.
- The four prompt files form a chain: `SYSTEM_INSTRUCTIONS.md` is the gate (pasted into the Space Instructions box) that points to the other three uploaded files. Edits to one engine should stay consistent with how the gate describes it.
- The **version number lives in three places** and must move together: `README.md`, `website/package.json`, and `website/lib/site.ts` (`VERSION`). The version table in `README.md` should also get a new row.
- The **commit co-author + PR-footer attribution rule** (`Co-Authored-By: GAIA Code <noreply@gaiacode.pro>` and the `🌱 Generated with [GAIA Code]` PR footer) lives in two spots in `prompts/SYSTEM_PROMPT.md` — PART III (`### GitHub MCP tools`) and PART IV (`### Attribution (commits & PRs)`) — and must stay in sync.

## prompts/ — the product

- `SYSTEM_INSTRUCTIONS.md` — the gate/router. Sets `USE_GAIA_AGENT=1`, raises the per-message tool budget to 15, and hosts the `<skill-engine>` (loads `/<name>.md` skills from Space files). Short by design.
- `SYSTEM_PROMPT.md` — identity, tool philosophy, dependency/version-pinning rules, security, engineering philosophy.
- `MEMORY_ENGINE.md` — persistent memory (`MEMORY.md`) + plan engine (`PLAN.md` / `TASKS.md`); explore → plan → approve → execute.
- `TURN_ENGINE.md` — context-budget estimation, 15-call tool budget, commit batching.

These files are written for an LLM running inside Perplexity (tools: `search_web`, `fetch_url`, `execute_code`, GitHub MCP). When editing, keep that runtime — not Claude Code's — in mind.

## website/ — commands

Run from `website/` (package manager is **pnpm**):

```bash
pnpm install      # first time
pnpm dev          # local dev server
pnpm build        # production build
pnpm lint         # next lint (eslint)
```

There is no test suite. `pnpm build` + `pnpm lint` are the verification gates.

### Website architecture

- Next.js 15 App Router + React 19 + Tailwind + framer-motion. Routes: `/` (home), `/architecture`, `/connectors`, `/get-started`.
- `website/lib/site.ts` is the **single source of truth** — version, URLs, nav, and the `SPACE_FILES` content model that drives the Get Started page (each file's deploy kind: `paste` vs `upload`). Add/rename a prompt file → update `SPACE_FILES` here.
- The Get Started page pulls raw prompt files from GitHub via `URLS.rawBase` (the `master` branch), so prompt changes must be pushed before they appear live.
- Shared primitives live in `website/components/` (`Background`, `Header`, `Footer`, `SectionLabel`, `EngineCard`, etc.); the visual theme is Horizon Zero Dawn-inspired.
