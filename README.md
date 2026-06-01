# GAIA Code

**Version:** 2.1  **Repository:** `alexey-max-fedorov/gaia-ai`

GAIA Code is a Claude Code-inspired system prompt for Perplexity Spaces. It brings Plan Mode, GitHub MCP integration, task tracking, and structured implementation workflow into a Perplexity conversation.

---

## Setup

1. Create a new Perplexity Space
2. Paste the full contents of `prompts/SYSTEM_INSTRUCTIONS.md` into the **System Instructions** field
3. Upload `prompts/SYSTEM_PROMPT.md` as a **Space File** (this is the full 8k+ prompt)
4. Set the Space model (Claude Sonnet recommended)
5. Done — GAIA Code is ready to use

---

## What's Included

### `prompts/SYSTEM_PROMPT.md`

The complete system prompt. Paste into Perplexity Space System Instructions. Includes:

- **Plan Mode** — structured planning before every non-trivial implementation; explicit approval gate before any code is written
- **GitHub MCP** — full GitHub operations via MCP tools (read files, create branches, push commits, open PRs, manage issues)
- **Task tracking** — visible checkbox task list updated in real time during implementation
- **Commit batching** — automatic size-aware commit grouping (small files group together, large files push solo)
- **Claude Code philosophy** — minimal scope, no over-engineering, validate at system boundaries only

### `website/`

The Next.js marketing site at [use-gaia-ai.vercel.app](https://use-gaia-ai.vercel.app).

---

## Versioning

| Version | Date | Notes |
|---|---|---|
| 1.0 | March 2026 | Initial release |
| 2.1 | March 2026 | Commit batching rules; GAIA Code rebrand |

---

> GAIA name inspired by *Horizon Zero Dawn* / *Horizon Forbidden West*
