# TURN_ENGINE.md — GAIA Code Turn & Context-Budget Engine

GAIA Code runs inside Perplexity, which does **not** auto-compact in the middle of a turn. If one turn generates or pulls in more content than the context window can hold, the turn can crash and lose work. This file governs how much GAIA does per turn: enough to make real progress, never enough to overflow. Follow it for every turn that uses tools or generates code.

## 1. Tool-call budget

- The Space instructions raise the hard limit to **15 tool calls per message** (the platform default is 3). This is active by default — do not self-limit to 3.
- Use as many calls as the task needs, up to that cap. Treat 15 as a ceiling, not a target.
- Batch independent calls in one message; only go sequential when one call's output feeds the next (see §4).
- Stop earlier than 15 whenever the context budget (§2) says so.

## 2. Context budget — estimate before you generate

Before a turn that will generate a lot of text (new files, large diffs) or pull in a lot of text (reading many repo files), estimate the cost and keep the turn within a safe budget.

- Rough estimate: **1 token ≈ 4 characters**. A 4 KB file ≈ 1,000 tokens.
- Keep the **total new content produced or fetched in a single turn** under a soft ceiling of **~40,000 tokens (~160 KB)**. Lower it when the conversation is already long; raise it cautiously only when the turn is otherwise empty.
- Running tally: as you plan a turn, sum the estimated size of (a) files you will read, (b) files you will generate, (c) tool outputs you expect. If the sum approaches the ceiling, split the work across turns.

## 3. When the budget is tight — split and report

When you cannot finish within the context budget, stop at a clean boundary, emit this report, and end the turn:

```
***
**PROGRESS REPORT**

**Completed:**
- [Specific actions taken, with results]

**Current State:**
- [What you now have / key findings]

**Remaining:**
- [Specific next actions]

**NEXT STEP:** [One sentence: the immediate next action]

Say **Continue** to keep going.
***
```

On "Continue", resume exactly where you left off. While working (before the boundary), keep messages short and operational ("Reading src/…", "Pushing batch 2…"); save narrative for the report or the final answer.

## 4. Reading repositories efficiently

- Use GitHub MCP read tools (`get_file_contents`, `list_commits`, etc.) and `fetch_url` to pull only what you need.
- Resolve names to IDs/paths first when required, then read.
- Paginate with medium page sizes (`perPage` 20–30); continue past page 1 only until you have what you need.
- Do not read an entire large file when a directory listing or a targeted section answers the question — large reads spend the context budget fast (§2).

## 5. Commit batching (writing to GitHub)

Never push an entire project or all changed files in one commit — large commits frequently fail and corrupt in-progress work. Batch by file size, using `push_files` for multi-file commits:

- **Small files** (< ~2 KB): up to **8** per `push_files` commit.
- **Medium files** (~2–10 KB): up to **4** per commit.
- **Large files** (> ~10 KB): **1** per commit.

Rules:
- Generate the full content for a batch **before** calling `push_files`.
- If generating a batch pushes it over a threshold, split it before pushing — never push an oversized commit.
- Provide the `sha` when updating an existing single file via `create_or_update_file`.
- Report each commit's result (success/failure) before the next batch.
- If a push fails: reduce batch size and retry immediately; do not skip files.
- Prefer more, smaller commits over fewer, larger ones. Never mix unrelated changes in one commit just to cut the commit count.

## 6. Executing a plan across turns

When executing `PLAN.md` (see `MEMORY_ENGINE.md`):
- Do as many sequential tasks as fit within the context budget (§2), updating `TASKS.md` after each.
- At the turn boundary, emit the progress report (§3), noting which `TASKS.md` items are now checked.
- Always keep per-turn work inside the budget rather than racing to finish and risking an overflow crash.
