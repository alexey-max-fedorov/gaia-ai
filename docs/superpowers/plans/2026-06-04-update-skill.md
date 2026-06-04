# GAIA Code `/update` Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a `/update` slash-command skill (`prompts/update.md`) that lets GAIA check whether a newer GAIA Code version exists on GitHub and, if so, point the user at the Get Started page — then surface that skill on the website's Get Started page and document it in the README.

**Architecture:** `/update` is a Space-file skill, exactly like `/humanizer`. The existing `<skill-engine>` in `SYSTEM_INSTRUCTIONS.md` already resolves `/update` → `update.md` with no prompt-file changes, so this work is purely additive: one new prompt file, README docs, and website surfacing. The skill compares the version in the *running* `SYSTEM_PROMPT.md` (already in GAIA's context) against the `version` field of `website/package.json` fetched live from `alexey-max-fedorov/gaia-ai` via GitHub MCP. On `remote > local`, it directs the user to `https://gaiacode.pro/get-started`.

**Tech Stack:** Markdown prompt file (read by an LLM at runtime — precision of wording is the product), Next.js 15 App Router + React 19 + Tailwind + framer-motion (website), pnpm.

**Hard constraints (read before starting):**
- **Do NOT edit any existing file in `prompts/`.** The skill engine already auto-discovers `/update`; the only `prompts/` change is the *new* `update.md`.
- The version is displayed as `3.1` / `v3.1`, **never** `3.1.0`.
- This repo has **no test suite**. Website verification gates are `pnpm build` + `pnpm lint` (run from `website/`). The prompt file's "test" is a careful content self-review against the spec.
- Commit co-author trailer (`Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`) per the session rules. Commit only when a task says to; never push (no task here pushes).

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `prompts/update.md` | Create | The `/update` skill: fetch latest version from GitHub, compare to running version, route to Get Started if behind. |
| `README.md` | Modify | Document the `/update` skill under the skill-engine capability + a changelog row. |
| `website/lib/site.ts` | Modify | Add a `SKILL_FILES` model (the optional `update.md` skill) — kept separate from the four core `SPACE_FILES` so the "4 files / upload three" counts stay accurate. |
| `website/app/get-started/GetStartedClient.tsx` | Modify | Render the optional skill file (copy/download) inside the upload step, visually distinct from the three required engine files. |

---

## Task 1: Create the `/update` skill file

**Files:**
- Create: `prompts/update.md`

**Context:** GAIA runs inside Perplexity. Its tools are `search_web`, `fetch_url`, `execute_code`, and GitHub MCP (read tool `get_file_contents`). When a user types `/update`, the `<skill-engine>` (in `SYSTEM_INSTRUCTIONS.md`) reads `update.md` from the Space files and follows it. GAIA already has `SYSTEM_PROMPT.md` loaded in its context — that file's header (`# GAIA CODE — SYSTEM PROMPT (v3.1)`) and model-disclosure footer (`Running GAIA Code 3.1 …`) carry the **running** version. The **latest released** version is the `"version"` field of `website/package.json` in `alexey-max-fedorov/gaia-ai` (currently `"3.1"`). The skill must fetch the latter via GitHub MCP `get_file_contents` (path `website/package.json`, repo `alexey-max-fedorov/gaia-ai`, `master` branch), parse the JSON, compare dotted-integer components, and act on the result.

Match the structure of the existing skill example at `research/skill_example/humanizer.md`: YAML frontmatter (`name`, `description`) followed by a Markdown body. Keep harness-neutral — do not assume Claude Code tool names; use GAIA's actual tools. Keep it tight; this is a small, single-purpose skill.

- [ ] **Step 1: Write `prompts/update.md`**

Create the file with exactly this content:

````markdown
---
name: update
description: |
  Check whether a newer version of GAIA Code is available. Fetches the latest
  released version from the gaia-ai GitHub repo, compares it to the version this
  Space is running, and — if an update exists — points the user to the Get
  Started page to redeploy the updated prompt files.
---

# Update: Check for a newer GAIA Code version

When the user runs `/update`, determine whether a newer version of GAIA Code has been
released and tell them how to upgrade. Do this in one turn.

## Steps

1. **Find the version this Space is running.** Read it from the `SYSTEM_PROMPT.md` already
   in your context — the model-disclosure footer line `Running GAIA Code <version> …` and
   the header `# GAIA CODE — SYSTEM PROMPT (v<version>)` both carry it. Call this
   `LOCAL_VERSION` (e.g. `3.1`). Do **not** fetch `SYSTEM_PROMPT.md` from GitHub for this —
   you already have it.

2. **Fetch the latest released version.** Use GitHub MCP `get_file_contents` to read
   `website/package.json` from repo `alexey-max-fedorov/gaia-ai` on the `master` branch
   (this is a read — no `_requires_user_approval`). Parse the JSON and take its `"version"`
   field. Call this `LATEST_VERSION` (e.g. `3.1`). If the file or field can't be read, tell
   the user the check failed and stop — do not guess.

3. **Compare them numerically, component by component.** Split each version on `.` into
   integers and compare left to right (`3.1` → `[3, 1]`, `3.0.2` → `[3, 0, 2]`); treat a
   missing trailing component as `0` (so `3.1` == `3.1.0`). This is a numeric comparison,
   **not** a string comparison — `3.10` is newer than `3.9`.

4. **Report the result:**
   - **`LATEST_VERSION` > `LOCAL_VERSION` (update available):** Tell the user a newer
     version (state both numbers, e.g. "you're on 3.1, 3.2 is available"). Direct them to
     **https://gaiacode.pro/get-started** to copy/download the updated files and redeploy
     them in their Space. Mention that updating means re-pasting the gate into Space
     Instructions and re-uploading the engine files.
   - **`LATEST_VERSION` == `LOCAL_VERSION` (up to date):** Tell the user they're on the
     latest version (state the number). Nothing to do.
   - **`LATEST_VERSION` < `LOCAL_VERSION` (ahead):** Tell the user their Space is running a
     newer version than the latest release (state both numbers) — likely a pre-release or
     local build. Nothing to do.

## Notes

- Display versions exactly as written (`3.1`, never `3.1.0`).
- This is a read-only check. It never edits files, commits, or changes the Space — it only
  reports status and points to the Get Started page.
- Keep the reply short: a one-line verdict plus, when an update exists, the Get Started link.
````

- [ ] **Step 2: Verify it fails the "wrong tool / wrong source" checks by self-review**

Re-read the file against the spec and confirm:
- Frontmatter has `name: update` and a `description`.
- It reads `LOCAL_VERSION` from the in-context `SYSTEM_PROMPT.md` (no GitHub fetch for it).
- It fetches `website/package.json` from `alexey-max-fedorov/gaia-ai` `master` via GitHub MCP `get_file_contents` and parses `"version"`.
- Comparison is **numeric, component-wise**, with missing trailing component = `0`.
- The update branch directs to `https://gaiacode.pro/get-started`.
- All three comparison branches (newer / equal / ahead) are handled.
- No `3.1.0`-style version strings appear.

Expected: all checks pass. If any fail, fix the file before committing.

- [ ] **Step 3: Confirm no existing `prompts/` file was touched**

Run: `git status --porcelain prompts/`
Expected: exactly one line — `?? prompts/update.md` (a new untracked file). If any existing `prompts/*.md` shows as modified, revert that change — the constraint is *no edits to existing prompt files*.

- [ ] **Step 4: Commit**

```bash
git add prompts/update.md
git commit -m "feat: add /update check-for-updates skill"
```

---

## Task 2: Document the `/update` skill in the README

**Files:**
- Modify: `README.md` (capability list around line 51; changelog table around line 68)

**Context:** The README's "Capabilities at a glance" list (around line 46–51) describes the skill engine and names `/humanizer`. The versioning table (lines 61–68) has one row per release. The user asked to *document the skill in the README*. The skill is shipped within the current `3.1`, so it does **not** get its own version bump — add it to the existing `3.1` changelog row and the capabilities list.

- [ ] **Step 1: Add `/update` to the capabilities list**

In `README.md`, find the skill-engine bullet (line ~51):

```markdown
- **Skill engine** — slash-command skills loaded from Space files (e.g. `/humanizer`), installable straight from a GitHub repo ("install the skill from gh owner/repo").
```

Replace it with:

```markdown
- **Skill engine** — slash-command skills loaded from Space files (e.g. `/humanizer`, or `/update` to check for a newer GAIA Code version), installable straight from a GitHub repo ("install the skill from gh owner/repo").
```

- [ ] **Step 2: Add a "Skills" note documenting `prompts/update.md`**

In `README.md`, immediately after the "Capabilities at a glance" bullet list (after the skill-engine bullet, before the `### website/` heading on line ~53), insert this block:

```markdown

### Bundled skills

GAIA Code ships with optional slash-command skills you can upload as Space Files:

- **`prompts/update.md`** (`/update`) — checks whether a newer GAIA Code version is available. It reads the latest released version from this repo's `website/package.json`, compares it to the version your Space is running, and if you're behind, points you to [Get Started](https://gaiacode.pro/get-started) to redeploy.
```

- [ ] **Step 3: Note the skill in the `3.1` changelog row**

In `README.md`, find the `3.1` row (line ~68):

```markdown
| 3.1 | June 2026 | Commit co-authorship (`Co-Authored-By: GAIA Code`) and a `🌱 Generated with GAIA Code` footer on every new PR |
```

Replace it with:

```markdown
| 3.1 | June 2026 | Commit co-authorship (`Co-Authored-By: GAIA Code`) and a `🌱 Generated with GAIA Code` footer on every new PR; `/update` check-for-updates skill |
```

- [ ] **Step 4: Verify the edits**

Run: `git diff README.md`
Expected: exactly the three changes above — the skill-engine bullet updated, a new "Bundled skills" subsection added, and the `3.1` row extended. No other rows or sections changed. No `3.1.0`-style strings introduced.

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: document /update skill in README"
```

---

## Task 3: Add the optional skill file to the website data model

**Files:**
- Modify: `website/lib/site.ts` (add a `SKILL_FILES` export after `SPACE_FILES`, around line 82)

**Context:** `website/lib/site.ts` is the single source of truth for the site. `SPACE_FILES` models *the four prompt files that make up GAIA Code v3* — keep that meaning intact (the homepage/hero copy says "4 files", "upload three"). The `/update` skill is an **optional add-on**, not a fifth core file, so it gets its own `SKILL_FILES` array reusing the existing `SpaceFile` shape. The Get Started page pulls raw file contents from `URLS.rawBase` (the `master` branch), so the `path` must point at `prompts/update.md` and the file must be pushed to `master` before it resolves live (out of scope for this plan — copy/download buttons will 404 until pushed, which is expected and matches how the existing files behave pre-push).

- [ ] **Step 1: Add the `SKILL_FILES` export**

In `website/lib/site.ts`, locate the end of the `SPACE_FILES` array (the closing `];` on line 82, right before the `// The four engines / capabilities to showcase.` comment on line 84). Insert this block between them:

```typescript

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
];
```

- [ ] **Step 2: Verify the file still type-checks (lint)**

Run: `cd website && pnpm lint`
Expected: PASS (no new errors). The `SpaceFile` interface is reused, so no type changes are needed.

- [ ] **Step 3: Commit**

```bash
git add website/lib/site.ts
git commit -m "feat(site): add SKILL_FILES model for the /update skill"
```

---

## Task 4: Surface the skill file on the Get Started page

**Files:**
- Modify: `website/app/get-started/GetStartedClient.tsx` (import on line 14; step-03 render block, lines 158–178)

**Context:** Step 03 ("Upload the three engine files") renders `uploadFiles` (the three `deploy === "upload"` engine files) with Copy/Download buttons. We add the optional `/update` skill below that list, visually distinct and labeled as an optional skill, reusing the same Copy/Download mechanics (`fetchFile` / `downloadFile`). Do **not** fold it into the engine-file list — it's optional, and the "skipping disables that engine" framing only applies to the three engines.

- [ ] **Step 1: Import `SKILL_FILES`**

In `website/app/get-started/GetStartedClient.tsx` line 14, change:

```typescript
import { SETUP_STEPS, SPACE_FILES, PREREQS, START_STATS, FAQS, ENGINES, URLS } from "@/lib/site";
```

to:

```typescript
import { SETUP_STEPS, SPACE_FILES, SKILL_FILES, PREREQS, START_STATS, FAQS, ENGINES, URLS } from "@/lib/site";
```

- [ ] **Step 2: Render the optional skill block inside step 03**

In the same file, find the closing of the step-03 upload list — the `</div>` that closes the `mt-3 space-y-2` container, immediately before the `)}` that ends the `s.num === "03"` block (currently lines 176–178):

```tsx
              </div>
            ))}
          </div>
        )}
```

Replace it with (this appends an "optional skill" sub-block after the engine-file list, still inside the `s.num === "03"` conditional):

```tsx
              </div>
            ))}

            <div className="mt-4 pt-3 border-t border-[#1DD3B0]/10">
              <p className="font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/35 uppercase mb-2">
                // Optional skill
              </p>
              {SKILL_FILES.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between border border-[#1DD3B0]/12 px-3 py-2 bg-[#080C18]/70"
                >
                  <span className="font-[var(--font-ibm-mono)] text-[10px] text-[#7DD3FC]/85">{f.file}</span>
                  <div className="flex items-center gap-4">
                    <CopyButton getText={fetchFile(f.path)} label="Copy" />
                    <button
                      onClick={downloadFile(f.path, f.file)}
                      className="inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/60 hover:text-[#1DD3B0] transition-colors uppercase cursor-pointer"
                    >
                      <Download className="w-2.5 h-2.5" /> Download
                    </button>
                  </div>
                </div>
              ))}
              <p className="font-[var(--font-inter)] text-[10px] text-[#8A98B0] leading-relaxed mt-2">
                Upload <code>update.md</code> too, then type <code>/update</code> in your Space to check for a newer GAIA Code version.
              </p>
            </div>
          </div>
        )}
```

- [ ] **Step 3: Run lint**

Run: `cd website && pnpm lint`
Expected: PASS. (`SKILL_FILES` is now used; `Download`, `CopyButton`, `fetchFile`, `downloadFile` are already imported/defined.)

- [ ] **Step 4: Run the production build**

Run: `cd website && pnpm build`
Expected: build succeeds with no type errors and the `/get-started` route compiles.

- [ ] **Step 5: Commit**

```bash
git add website/app/get-started/GetStartedClient.tsx
git commit -m "feat(get-started): surface the optional /update skill file"
```

---

## Task 5: Final verification

**Files:** none (verification only)

**Context:** Confirm the whole change set is internally consistent and the website still builds and lints clean.

- [ ] **Step 1: Confirm no existing prompt files were modified**

Run: `git diff --name-only HEAD~4 HEAD -- prompts/`
Expected: only `prompts/update.md` (added). No existing `prompts/*.md` in the list.

- [ ] **Step 2: Full website build + lint**

Run: `cd website && pnpm lint && pnpm build`
Expected: both PASS.

- [ ] **Step 3: Grep for forbidden version format**

Run: `grep -rn "3\.1\.0" prompts/update.md README.md website/lib/site.ts website/app/get-started/GetStartedClient.tsx`
Expected: no matches.

- [ ] **Step 4: Review the full diff**

Run: `git diff HEAD~4 HEAD`
Expected: a new `prompts/update.md`, README skill docs + changelog note, `SKILL_FILES` in `site.ts`, and the get-started render block. Nothing else.

---

## Self-Review (author checklist — completed)

**1. Spec coverage:**
- "Create `prompts/update.md`" → Task 1. ✅
- "check-for-updates skill … fetch website/package.json … compare to version in SYSTEM_PROMPT.md … if update available, direct to https://gaiacode.pro/get-started" → Task 1, Steps 1–2 (all three comparison branches, exact URL). ✅
- "document it in readme but dont edit any existing files in prompts/" → Task 2 (README docs) + the hard constraint enforced in Task 1 Step 3 and Task 5 Step 1. ✅
- "add this to the /get-started page (upload the three engine files, add the update.md file)" → Tasks 3 + 4 (skill surfaced in the upload step, with copy/download). ✅

**2. Placeholder scan:** No TBD/TODO/"handle edge cases" — every code/content block is literal and complete.

**3. Type/name consistency:** `SKILL_FILES` (defined Task 3) is imported and mapped in Task 4. It reuses the existing `SpaceFile` interface — `id`, `file`, `path`, `deploy`, `role`, `summary` all present. `fetchFile`/`downloadFile`/`CopyButton`/`Download` referenced in Task 4 already exist in `GetStartedClient.tsx`. The skill's version source (running `SYSTEM_PROMPT.md` footer/header) and latest source (`website/package.json` `version`) are named consistently across Task 1 steps.
