# GAIA Code

**Version:** 3.4  **Repository:** `alexey-max-fedorov/gaia-ai`

GAIA Code is a Claude Code-inspired prompt system for Perplexity Spaces. It brings persistent memory, a plan engine, context-budgeted turns, GitHub MCP integration, and a slash-command skill engine into a Perplexity conversation.

---

## Setup

1. Create a new Perplexity Space.
2. Paste the full contents of `prompts/SYSTEM_INSTRUCTIONS.md` into the Space **Instructions** field. This is the short gate/router — not the full prompt.
3. Upload these three files as **Space Files**:
   - `prompts/SYSTEM_PROMPT.md` — behavior
   - `prompts/MEMORY_ENGINE.md` — memory + planning
   - `prompts/TURN_ENGINE.md` — turns + context budget
4. Set the Space model (Claude Sonnet recommended).
5. *(Optional)* Connect GitHub via Perplexity Connectors so GAIA can read and write your repositories.
6. Done — GAIA Code is ready to use.

> GAIA reads all three uploaded files on startup; skipping any one disables that engine. The website's [Get Started](https://gaiacode.pro/get-started) page mirrors these steps with copy/download buttons for each file.

---

## What's Included

GAIA Code is **four prompt files** that drive **four engines**.

### `prompts/SYSTEM_INSTRUCTIONS.md` — the gate

Pasted into the Space Instructions field. Switches GAIA on (`USE_GAIA_AGENT=1`), points it at the other three files, and hosts the skill engine.

### `prompts/SYSTEM_PROMPT.md` — behavior

Identity, tool philosophy, dependency & version rules (versions are pinned from the registry's JSON API, never a stale snippet), security, and the Claude Code engineering philosophy.

### `prompts/MEMORY_ENGINE.md` — memory + planning

- **Persistent memory** (`MEMORY.md`) — survives auto-compaction: project structure, your standing notes, and observations GAIA records itself, including mistakes it fixed so they don't repeat. On first contact with a repo it reads `CLAUDE.md` / `AGENTS.md` and seeds memory with the project's structure and conventions.
- **Plan engine** (`PLAN.md` + `TASKS.md`) — explore → plan → approve → execute, with checkboxes flipped per task as work lands.

### `prompts/TURN_ENGINE.md` — turns + budget

Context-budget estimation so a turn never overflows the window, a 15-call tool budget, and size-aware commit batching.

### Capabilities at a glance

- **Plan Mode** — structured planning with an explicit approval gate before any code is written.
- **GitHub MCP** — read repos, create branches, push commits, open PRs, manage issues.
- **Persistent memory** — coherent across auto-compaction and context-overflow crashes, with `export memory` / `import memory` to carry it between conversations.
- **Skill engine** — slash-command skills loaded from Space files (e.g. `/humanizer`, or `/update` to check for a newer GAIA Code version), installable straight from a GitHub repo ("install the skill from gh owner/repo").
- **Permission modes** — choose how GAIA handles tool-call approval: **Ask Permissions** (default — it asks before every write: commit, push, PR, issue, merge), **Accept Edits** (routine writes run free; merges, repo creation, and default-branch writes still ask), or **Bypass Permissions** (it runs every tool call without asking). Toggle with `/ask-permissions`, `/accept-edits`, and `/dangerously-skip-permissions`; the choice is saved to memory so it survives auto-compaction.
- **Built-in commands** — `/status` (version, permission mode, plan/task progress, and memory at a glance) and `/help` (every built-in command plus the skills uploaded to your Space).

### Bundled skills

GAIA Code ships with optional slash-command skills you can upload as Space Files:

- **`prompts/update.md`** (`/update`) — checks whether a newer GAIA Code version is available. It reads the latest released version from this repo's `website/package.json`, compares it to the version your Space is running, and if you're behind, points you to [Get Started](https://gaiacode.pro/get-started) to redeploy.
- **`prompts/doctor.md`** (`/doctor`) — verifies your deployment: engine files present, versions consistent, memory initialized, GitHub MCP connected. Read-only.
- **`prompts/pr-review.md`** (`/pr-review`) — reviews a pull request end to end (full diff, every commit) and posts the findings as a PR review via GitHub MCP.

### `website/`

The Next.js marketing site at [gaiacode.pro](https://gaiacode.pro).

---

## Versioning

| Version | Date | Notes |
|---|---|---|
| 1.0 | March 2026 | Initial release |
| 2.1 | March 2026 | Commit batching rules; GAIA Code rebrand |
| 3.0.0 | June 2026 | Prompt-system overhaul: memory, plan & turn engines, skill engine, multi-file architecture |
| 3.0.1 | June 2026 | Registry-JSON version lookup; per-task TASKS.md writes; record mistakes to memory; self-review before push |
| 3.0.2 | June 2026 | Auto-reads CLAUDE.md/AGENTS.md into memory on first repo touch; install skills from GitHub via the skill engine |
| 3.1 | June 2026 | Commit co-authorship (`Co-Authored-By: GAIA Code`) and a `🌱 Generated with GAIA Code` footer on every new PR |
| 3.2 | June 2026 | `/update` check-for-updates skill (compares your Space's version against the latest release) |
| 3.3 | June 2026 | Permission modes — Ask Permissions (default) / Bypass Permissions — stored in `MEMORY.md`, with `/dangerously-skip-permissions` & `/ask-permissions`; firmer PR-footer attribution (fixes #5); standardized `[Tool Name] summary` for `_tool_input_summary` |
| 3.4 | June 2026 | Accept Edits permission mode (`/accept-edits`); `/status` & `/help` built-ins; memory export + auto-compaction of `## Memories`; plan archiving to `plans/`; `/doctor` & `/pr-review` bundled skills; `/update` lists what's new; skill-engine hard-rule guardrail; CI version-sync check; website changelog page |

---

> GAIA name inspired by *Horizon Zero Dawn* / *Horizon Forbidden West*
