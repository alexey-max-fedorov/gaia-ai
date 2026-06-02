# GAIA Code v3.0.0 — Overhaul Brief

> **Status:** Shipped as v3.0.0; later patched to v3.0.1 (see [`patch1.md`](patch1.md)).
> This is the original brief for the v3 rewrite, kept for provenance. It records what was cut, kept, and rebuilt — not the current state of the prompts.

A complete redo of how GAIA Code works.

## Deliverables

- A set of Markdown prompt files uploaded to the Perplexity Space.
- A `SYSTEM_INSTRUCTIONS.md` prompt for the Space-instructions field.

## SYSTEM_PROMPT.md

A new prompt was written from scratch — order and formatting were free to change. Decisions on the old parts:

- **Cut `PART III — TOOL PHILOSOPHY`** and every other place tools were documented. Replaced with fresh tool descriptions derived from [`tools/`](tools/), which is the source of truth for what tools actually exist and how they behave.
- **Cut `PART IV — WEB SEARCH GUIDELINES`** — already covered by Perplexity's base system prompt.
- **Cut `PART V — CODE EXECUTION GUIDELINES`** — far too long. Reduced to: it's the Python tool. The old text was also wrong that all file outputs are shared with the user — only files in `output/` are user-accessible.
- **Cut `PART VI — GITHUB MCP WORKFLOW`** — replaced by the new `TURN_ENGINE.md`.
- **`PART VII — PLAN MODE`** — keep only a plan trigger in `SYSTEM_PROMPT.md`; the plan feature itself moved into the new memory/plan engine.
- **`PART VIII — PROGRAMMING BEST PRACTICES (Claude Code Philosophy)`** — already good; kept and updated.
- **Cut `PART IX — SAFETY, ETHICS & WELLBEING`** — redundant with Claude's base system prompt.
- **Cut `PART X — CITATION REQUIREMENTS`.**
- **`PART XI — KNOWLEDGE CURRENCY`** — fold into the new dependency rules (look up latest package versions before writing a `package.json`, and read package docs when using any framework/dependency).
- **Cut `PART XII — WORKED EXAMPLES`** — to be redone after the overhaul.
- **Cut `PART XIII — BEHAVIORAL RULES SUMMARY`** — repetitive.
- **Keep `PART XIV — MANDATORY MODEL DISCLOSURE FOOTER`** — kept in `SYSTEM_PROMPT.md`, but cut from `SYSTEM_INSTRUCTIONS.md`.
- **Keep `PART I — IDENTITY & CHARACTER`.**

New rules added:
- Look up the latest package versions (via the fetch tool or GitHub MCP) before writing a `package.json`.
- Always read a package's docs when using its framework or dependency.

## SYSTEM_INSTRUCTIONS.md

See [`perplexity_sys/note.md`](perplexity_sys/note.md) for the extraction method, the override technique, and the wrapper design.

## Memory & plan engine

A new file, `MEMORY_ENGINE.md`, governs persistent memory and planning. The point is to prevent amnesia across auto-compaction and context-overflow crashes.

### MEMORY.md

GAIA Code keeps a `MEMORY.md` file in the sandbox (read/written with the Python tool), with three sections:

- **Project Structure** — the repo, directories, subdirectories, files, with short descriptions and gotchas.
- **Notes** — instructions and preferences added by the **user** (e.g. "Add to memory: use pnpm, not npm").
- **Memories** — observations added automatically by GAIA Code: important edits, decisions, useful answers to codebase questions.

Behavior:
- Re-read `MEMORY.md` after every auto-compaction, or on user request.
- Append to **Memories** at the end of any turn where something project-relevant happened (including a useful answer to a codebase question worth keeping).
- **Import:** on "import memory" with pasted memory-style Markdown, attached `.txt`, or an attached `MEMORY.md`, save it to `MEMORY.md`.
- If `MEMORY.md` doesn't exist when a write is attempted, initialize it first (with the three sections).

### PLAN.md, TASKS.md, and the plan engine

- Base the planning behavior on a modified version of [`superpowers_refs/writing-plans-skill.md`](superpowers_refs/writing-plans-skill.md), adapted for GAIA Code. There are **no subagents** in GAIA Code, so remove every reference to `subagent-driven-development` and related skills (e.g. `superpowers:using-git-worktrees`).
- Save the plan to `PLAN.md` in the sandbox (write it with Python).
- Inline the review process from [`superpowers_refs/plan-document-reviewer-prompt.md`](superpowers_refs/plan-document-reviewer-prompt.md) — again, no subagent; it becomes a self-review checklist.
- Plans must be standalone and portable: include repo names and exact links.
- Track tasks in `TASKS.md`, one ordered checkbox per step, checked off as each completes. Create `TASKS.md` from `PLAN.md` as the first step of execution.
- On execution: read `PLAN.md` and `TASKS.md`. After an auto-compaction, re-read both first thing the next turn.

## Website

Deferred — the website is updated only after the prompt overhaul is done.
