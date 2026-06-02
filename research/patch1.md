# patch1 — GAIA Code v3.0.0 → v3.0.1 (prompt-system patch)

A prompt-system patch fixing three behavioral failures observed in a live GAIA Code run (scaffolding + deploying a Next.js site to Vercel on Perplexity), plus one related hardening fix.

## Context — what GAIA did wrong

GAIA executed a real task: build a Next.js site and ship it to Vercel. Three issues surfaced:

1. **Stale dependency version.** GAIA "looked up" Next.js but pinned `15.2.6` (deprecated + security-flagged) when `16.2.7` was already the live `latest`. The number came from a `search_web` snippet/blog, not an authoritative source — so the Vercel build threw a security-vulnerability warning.
2. **`TASKS.md` batched at turn end.** All task checkboxes were written in a single end-of-turn write *after* 5 commits, instead of after each push. A mid-turn crash would have lost all progress tracking — defeating the file's only purpose.
3. **No memory of the fix.** After correcting the build failure, GAIA wrote nothing to `MEMORY.md`, leaving it free to repeat the same version mistake on the next project.

Root theme: GAIA wrote durable state lazily (one tidy batch at turn end) and trusted search prose for a fact that has an authoritative API. A 4th, related observation: the same build also failed on a duplicate object key — code that shipped because the sandbox has no internet and can't compile a Node project, so CI is the first real build.

## Changes

### Fix 1 — version lookup from the registry JSON API
**`prompts/SYSTEM_PROMPT.md`** · PART III "Dependency & framework rules" rule 1 (+ `search_web`/`fetch_url` tool descriptions).

- **Before:** "Check the latest stable version via GitHub MCP `get_latest_release`/`list_tags` **or** `fetch_url` on the registry page (npmjs.com, PyPI, …)." — too loose; allowed the search-snippet path.
- **After:** Resolve every version from the registry's machine-readable JSON API, never from a search snippet/blog/tutorial. Exact endpoints given: npm `registry.npmjs.org/<pkg>/latest` → `.version`; PyPI `pypi.org/pypi/<pkg>/json` → `.info.version`; crates.io `crates.io/api/v1/crates/<crate>` → `.crate.max_stable_version`; Go `proxy.golang.org/<module>/@latest`. Pin the current, non-deprecated version. `get_latest_release` only as fallback when no JSON endpoint exists. Tool descriptions updated so `search_web` is explicitly *not* for version resolution and `fetch_url` points at the registry JSON API.

### Fix 2 — write `TASKS.md` after each task, not at turn end
**`prompts/MEMORY_ENGINE.md`** B.4 + B.5 · **`prompts/TURN_ENGINE.md`** §6.

- **Before:** "update `TASKS.md` after each" — never said *immediately/as its own write*, never forbade end-batching, never gave the why.
- **After:** Flip each checkbox the moment its task is done — immediately after the commit/push succeeds, as its own write, before the next task. Explicitly forbids batching all checkboxes into one end-of-turn write (states the why: that is exactly the state a crash/auto-compaction destroys). Notes the per-task `execute_code` call is worth the durability. The turn-boundary report is *in addition to*, not a replacement for, the per-task writes.

### Fix 3 — record mistakes to `MEMORY.md` so they don't repeat
**`prompts/MEMORY_ENGINE.md`** A.4.

- **Before:** Memory triggers were "files created/edited, decisions made, gotcha discovered" — didn't cover "a mistake you made and fixed."
- **After:** New trigger — whenever you make a mistake and correct it (failed build/CI, wrong version, a bug you wrote), append the lesson to `## Memories` as a forward-looking rule (what went wrong, root cause, what to do instead), in the same turn you ship the fix. Includes the `next@15.2.6` example, which doubles as reinforcement for Fix 1.

### Fix 4 — self-review generated code before pushing
**`prompts/SYSTEM_PROMPT.md`** · PART IV, new subsection "Before you push (you cannot build in the sandbox)".

- **New:** States that the sandbox has no internet and cannot install/compile/build, so CI is the first real compile. Before pushing generated code or manifests, re-read them for compiler-catchable errors (duplicate object keys, bad imports, mismatched types, version typos, unclosed JSX).

## Files touched
- `prompts/SYSTEM_PROMPT.md` (Fix 1, Fix 4)
- `prompts/MEMORY_ENGINE.md` (Fix 2, Fix 3)
- `prompts/TURN_ENGINE.md` (Fix 2)

## Not changed (flag if wanted)
- In-file version strings left at `v3.0.0` / "GAIA Code 3.0" — bump the header comment to `v3.0.1` if you want the patch reflected there.
- These are Space files: they only take effect after a manual re-upload to the Perplexity Space.
