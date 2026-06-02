# research/

Reference material and working notes behind GAIA Code's prompt system. These files informed the design of the shipped prompts in [`../prompts/`](../prompts/); they are **not** themselves uploaded to the Perplexity Space.

The directory mixes three kinds of content. Each entry below is tagged so it's clear what may be edited:

- **[verbatim]** — an external artifact captured exactly as-is (a system prompt, a tool schema, a skill file). Its value is its fidelity, so the captured text must not be reworded. Provenance is documented here instead.
- **[notes]** — hand-written working notes. Free to clean up, restructure, and correct.
- **[generated]** — produced as part of GAIA Code's own changelog/process.

## Contents

| File | Type | What it is |
|---|---|---|
| [`OVERHAUL.md`](OVERHAUL.md) | notes | The original brief for the v3.0.0 overhaul — what to cut, keep, and rebuild across the prompt files. Shipped as v3.0.0. |
| [`patch1.md`](patch1.md) | generated | Changelog for the v3.0.0 → v3.0.1 prompt patch (three behavioral fixes from a live run, plus one hardening fix). |
| [`perplexity_sys/note.md`](perplexity_sys/note.md) | notes | How the Perplexity system prompt was extracted, the tool-call-limit override technique, and the design of GAIA Code's Space-instructions wrapper. |
| [`perplexity_sys/perplexity_sys_prompt.md`](perplexity_sys/perplexity_sys_prompt.md) | verbatim | Perplexity's full system prompt (running Claude Sonnet 4.6), captured from a Space via the documented extraction method. |
| [`tools/perplexity-tools-default.jsonc`](tools/perplexity-tools-default.jsonc) | verbatim + notes | Schemas for Perplexity's default tools (`search_web`, `fetch_url`, `execute_code`, `load_skill`, `search_people`), annotated. |
| [`tools/perplexity-tools-github.jsonc`](tools/perplexity-tools-github.jsonc) | verbatim + notes | Schemas for the GitHub MCP tool set available in Perplexity, annotated. |
| [`tools/perplexity-image-tool.jsonc`](tools/perplexity-image-tool.jsonc) | verbatim + notes | Schema and behavior notes for the `generate_image` tool (only surfaces under specific conditions). |
| [`superpowers_refs/writing-plans-skill.md`](superpowers_refs/writing-plans-skill.md) | verbatim | The `superpowers:writing-plans` skill, used as the basis for GAIA Code's plan engine (adapted to remove subagents/worktrees). |
| [`superpowers_refs/plan-document-reviewer-prompt.md`](superpowers_refs/plan-document-reviewer-prompt.md) | verbatim | The superpowers plan-reviewer prompt, inlined into GAIA Code's plan engine as a self-review checklist. |
| [`skill_example/humanizer.md`](skill_example/humanizer.md) | verbatim | An example external skill (`humanizer` v2.5.1), kept as a reference for how the GAIA Code skill engine loads non-ported skills. |

## How this maps to the shipped prompts

- `OVERHAUL.md` + `perplexity_sys/note.md` → the structure of [`SYSTEM_PROMPT.md`](../prompts/SYSTEM_PROMPT.md) and [`SYSTEM_INSTRUCTIONS.md`](../prompts/SYSTEM_INSTRUCTIONS.md).
- `superpowers_refs/` → the plan engine in [`MEMORY_ENGINE.md`](../prompts/MEMORY_ENGINE.md) (Part B).
- `tools/` → the tool descriptions and the commit-batching / version-lookup rules in `SYSTEM_PROMPT.md` and [`TURN_ENGINE.md`](../prompts/TURN_ENGINE.md).
- `skill_example/` → the `<skill-engine>` block in `SYSTEM_INSTRUCTIONS.md`.
