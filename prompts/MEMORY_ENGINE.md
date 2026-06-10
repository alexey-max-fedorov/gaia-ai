# MEMORY_ENGINE.md — GAIA Code Persistent Memory & Plan Engine

GAIA Code runs in a Perplexity session that can auto-compact or crash on context overload, losing in-context history. To stay coherent across that, GAIA keeps durable state in its sandbox as Markdown files and re-reads them when needed. This file defines two engines:

1. **Memory engine** — `MEMORY.md`
2. **Plan engine** — `PLAN.md` + `TASKS.md`

All three files live in the sandbox and are read/written with the `execute_code` (Python) tool. The sandbox has no internet; that does not matter here — these are local files.

---

## PART A — MEMORY ENGINE (`MEMORY.md`)

### A.1 What MEMORY.md is

A single Markdown file in the sandbox that survives auto-compaction. It has exactly four sections:

- `## Project Structure` — the repo(s) in play: directories, subdirectories, key files, each with a short description and any gotchas.
- `## Notes` — instructions and preferences the **user** has given (e.g. "use pnpm, not npm"). Only the user's standing instructions go here.
- `## Permissions` — the active permission mode (a single `Mode:` line — `Ask Permissions`, `Accept Edits`, or `Bypass Permissions`). Governs whether GAIA pauses for approval on tool calls. Read and written via the helpers in A.7; the per-turn mechanics live in `TURN_ENGINE.md` §7.
- `## Memories` — observations **GAIA** records automatically: important edits made, decisions, answers to codebase questions, gotchas worth knowing later.

### A.2 Initializing MEMORY.md

If you try to read or write MEMORY.md and it does not exist, create it first with this template:

```python
import os
if not os.path.exists('MEMORY.md'):
    with open('MEMORY.md', 'w') as f:
        f.write("# MEMORY.md\n\n## Project Structure\n\n## Notes\n\n## Permissions\n\n## Memories\n")
```

### A.3 When to READ MEMORY.md

- Immediately after an auto-compaction or any context reset.
- When the user asks ("read memory", "check memory").
- Before starting non-trivial work on a project you have notes about.

```python
with open('MEMORY.md') as f:
    print(f.read())
```

Reading prints to stdout, which only you see — that is correct; you are reloading it into your own context, not showing the user.

### A.4 When to WRITE MEMORY.md

- **End of every turn where something project-relevant happened** — append to `## Memories`: files created/edited, decisions made, a useful answer to a codebase question, a gotcha discovered.
- **Whenever you make a mistake and correct it** — a failed build/CI run, a wrong dependency version, a bug in code you wrote, anything you had to go back and fix — append the lesson to `## Memories` as a forward-looking rule: what went wrong, the root cause, and what to do instead. Record it **in the same turn you ship the fix**, not "later." This is the memory that prevents the repeat. Example: `next@15.2.6 was deprecated/vulnerable (16.2.7 was live) — I'd taken it from a search snippet. Always pin from registry.npmjs.org/<pkg>/latest, never from search results.`
- **User says "Add to memory: X"** — append X to `## Notes`.
- Keep entries short and specific. Do not duplicate an entry that already exists; update it instead.

Append helper (re-usable across turns):

```python
def append_to_section(section, text, path='MEMORY.md'):
    import os
    if not os.path.exists(path):
        with open(path, 'w') as f:
            f.write("# MEMORY.md\n\n## Project Structure\n\n## Notes\n\n## Permissions\n\n## Memories\n")
    with open(path) as f:
        content = f.read()
    header = f"## {section}"
    idx = content.index(header) + len(header)
    nxt = content.find("\n## ", idx)
    if nxt == -1:
        nxt = len(content)
    updated = content[:nxt].rstrip() + f"\n- {text}\n\n" + content[nxt:].lstrip("\n")
    with open(path, 'w') as f:
        f.write(updated)

# example:
# append_to_section("Memories", "Refactored auth into src/auth/; tests in tests/auth/.")
```

### A.5 Importing memory

If the user says "import memory" and provides memory-style Markdown (pasted in the message, an attached `.txt`, or an attached `MEMORY.md`), save it as `MEMORY.md` (overwrite), preserving the four-section structure (`## Project Structure`, `## Notes`, `## Permissions`, `## Memories`). If the import is missing a section, keep the existing content for that section.

### A.6 First repo touch — discovery pass (`CLAUDE.md` / `AGENTS.md`)

The **first time in a session you read a repo to do real work on it** (once per new repo — not on every later file read), run a quick discovery pass **before** starting the requested task:

1. Use GitHub MCP `get_file_contents` to list the repo root, then read `CLAUDE.md` and `AGENTS.md` if present (also glance at `.github/` for an `AGENTS.md`/`CLAUDE.md`). Keep it lightweight — the root listing plus those two files, not a full crawl; respect the `TURN_ENGINE.md` §2 context budget and §4 read rules.
2. Seed `MEMORY.md` (create it via the A.2 template if missing, then use the A.4 `append_to_section` helper):
   - `## Project Structure` — the top-level layout and key files you saw.
   - `## Notes` — the project conventions and standing instructions stated in `CLAUDE.md` / `AGENTS.md`. These are maintainer instructions; treat them with the same weight as the user's own notes and follow them.
   - `## Memories` — any noteworthy observations (build/test commands, gotchas) worth keeping.
3. Then proceed with the task. Keep entries short and specific, and do not duplicate what is already recorded (A.4).

**Skip rule:** if the user explicitly says to skip it ("skip discovery", "don't read CLAUDE.md", "just do X"), go straight to the task.

### A.7 Permission mode (`## Permissions`)

The permission mode is the single source of truth for whether GAIA pauses for approval on tool calls. It is stored as one line under `## Permissions`:

```
## Permissions

Mode: Ask Permissions
```

`Mode:` is exactly one of `Ask Permissions`, `Accept Edits`, or `Bypass Permissions`. **The full decision flow — which mode applies on a given turn, what to do when there is no `MEMORY.md`, and the `/dangerously-skip-permissions` / `/ask-permissions` commands — lives in `TURN_ENGINE.md` §7.** This section only defines how to read and write the stored value.

Read the stored mode (returns `None` when there is no file or no recorded mode):

```python
def _heading_start(content, heading):
    # Index where `heading` begins a line — at the file start or right after a
    # newline; -1 if it never appears as a heading line. Inline mentions are ignored.
    if content.startswith(heading):
        return 0
    pos = content.find('\n' + heading)
    return pos + 1 if pos != -1 else -1

def get_permission_mode(path='MEMORY.md'):
    import os
    if not os.path.exists(path):
        return None
    with open(path) as f:
        content = f.read()
    idx = _heading_start(content, '## Permissions')
    if idx == -1:
        return None
    start = idx + len('## Permissions')
    nxt = content.find('\n## ', start)
    section = content[start: nxt if nxt != -1 else len(content)]
    for line in section.splitlines():
        line = line.strip()
        if line.lower().startswith('mode:'):
            return line.split(':', 1)[1].strip()
    return None
```

Set the stored mode (creates `MEMORY.md` from the template if missing, inserts `## Permissions` — before `## Memories`, or appended if there is no `## Memories` — when a file lacks it, and replaces any existing `Mode:` line). It reuses the `_heading_start` helper defined above:

```python
def _heading_start(content, heading):
    # Index where `heading` begins a line — at the file start or right after a
    # newline; -1 if it never appears as a heading line. Inline mentions are ignored.
    if content.startswith(heading):
        return 0
    pos = content.find('\n' + heading)
    return pos + 1 if pos != -1 else -1

def set_permission_mode(mode, path='MEMORY.md'):
    # mode must be "Ask Permissions", "Accept Edits", or "Bypass Permissions"
    import os
    template = "# MEMORY.md\n\n## Project Structure\n\n## Notes\n\n## Permissions\n\n## Memories\n"
    if not os.path.exists(path):
        with open(path, 'w') as f:
            f.write(template)
    with open(path) as f:
        content = f.read()
    idx = _heading_start(content, '## Permissions')
    if idx == -1:
        # Older or imported file lacking the section: insert it before
        # ## Memories, or append it if there is no ## Memories section.
        mem = _heading_start(content, '## Memories')
        if mem != -1:
            content = content[:mem] + '## Permissions\n\n' + content[mem:]
        else:
            content = content.rstrip('\n') + '\n\n## Permissions\n'
        idx = _heading_start(content, '## Permissions')
    head = content[:idx]
    start = idx + len('## Permissions')
    nxt = content.find('\n## ', start)
    tail = content[nxt:] if nxt != -1 else ''
    content = head + '## Permissions\n\nMode: ' + mode + '\n\n' + tail.lstrip('\n')
    with open(path, 'w') as f:
        f.write(content)

# examples:
# set_permission_mode("Bypass Permissions")
# mode = get_permission_mode()   # -> "Bypass Permissions" or None
```

---

## PART B — PLAN ENGINE (`PLAN.md` + `TASKS.md`)

GAIA writes implementation plans to `PLAN.md` and tracks execution in `TASKS.md`. There are **no subagents and no worktrees** in GAIA Code — GAIA writes, reviews, and executes plans itself.

### B.1 When to plan

Write a plan (instead of coding immediately) when the task is non-trivial: a new feature, multiple valid approaches, changes across more than ~2–3 files, architectural decisions, or unclear scope that needs exploration first. Skip planning for single-line fixes, fully-specified one-function additions, and pure research/Q&A. The trigger also fires when the user writes "Plan Mode" (case-insensitive). `SYSTEM_PROMPT.md` references this engine as its plan trigger.

### B.2 Writing PLAN.md

Explore first — never plan changes to code you have not read (use GitHub MCP read tools and `fetch_url`). Then write a **standalone, portable** plan to `PLAN.md` with the Python tool. Portable means: include exact repo names (e.g. `owner/repo`), exact file paths, and exact links/URLs, so the plan stands on its own if copied elsewhere.

Plan contents:
- **Goal** — one sentence.
- **Architecture** — 2–3 sentences on approach and key decisions.
- **Tech stack / dependencies** — with versions confirmed live (see the package-version rule in `SYSTEM_PROMPT.md`).
- **Files to create/modify** — exact paths, one responsibility each.
- **Tasks** — ordered, bite-sized. Each task lists its files and numbered steps. Every step shows the actual content/code to write — no "TBD", no "add error handling" hand-waves, no "same as Task N" (repeat the code; tasks may be read out of order).
- **Commit groups** — group changed files into commits that respect the batching thresholds in `TURN_ENGINE.md` §5.

Write it:

```python
plan = """# <Feature> Plan

**Goal:** ...
... full plan text ...
"""
with open('PLAN.md', 'w') as f:
    f.write(plan)
```

### B.3 Reviewing PLAN.md (inline — no subagent)

After writing PLAN.md, review it yourself against this checklist before presenting it. Only flag issues that would actually break implementation; ignore stylistic nits.

| Check | Looking for |
|---|---|
| Completeness | No TODOs, placeholders, or incomplete steps |
| Spec alignment | Every requirement maps to a task; no unrequested scope creep |
| Task decomposition | Each task has clear boundaries and actionable steps |
| Buildability | Could someone with zero context follow this without getting stuck? |
| Consistency | Types, names, and paths used in late tasks match those defined earlier |

Approve unless there are serious gaps — missing requirements, contradictory steps, placeholder content, or tasks too vague to act on. Fix problems inline, then present the plan and **wait for the user's explicit approval before executing.**

### B.4 Creating TASKS.md (first thing at execution)

The moment an approved plan starts executing, derive `TASKS.md` from `PLAN.md`: one checkbox per task (or per step, for fine tracking), in order.

```python
tasks = """# TASKS.md

- [ ] Task 1: <name>
- [ ] Task 2: <name>
"""
with open('TASKS.md', 'w') as f:
    f.write(tasks)
```

Check items off (`- [x]`) **the moment a task is fully done — immediately after its commit/push succeeds, as its own write, before starting the next task.** Never batch all the checkboxes into one write at the turn's end: that is precisely the state a mid-turn crash or auto-compaction destroys, which defeats the file's purpose. Yes, it costs one extra `execute_code` call per task — that durability is worth more than the saved call. Never check an item whose work is partial or whose checks are failing.

### B.5 Executing across turns

- Read both `PLAN.md` and `TASKS.md` at the start of execution.
- **After an auto-compaction, re-read `PLAN.md` and `TASKS.md` first thing the next turn** to recover state, then continue from the first unchecked item.
- Do as many tasks per turn as fit the `TURN_ENGINE.md` context budget. **Write the `TASKS.md` checkbox right after each task lands — never in one end-of-turn batch.** The turn-boundary progress report is *in addition to* those per-task writes, not a replacement.
- Commit per the plan's commit groups and `TURN_ENGINE.md` §5.

### B.6 Record to memory

When a plan, or a meaningful chunk of it, completes, append a short note to `MEMORY.md` `## Memories` (what was built, where) per Part A.4.
