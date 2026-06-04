# GAIA Code Commit/PR Attribution + v3.1 Bump — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire a `Co-Authored-By: GAIA Code <noreply@gaiacode.pro>` commit rule and a verbatim PR-description footer into GAIA's prompt files, track those locations in `CLAUDE.md`, and bump the whole product to `3.1`.

**Architecture:** Pure prose/config edits — no runtime code. The attribution rules go into `prompts/SYSTEM_PROMPT.md` in **two** sections (PART III GitHub MCP tool docs, and PART IV best-practices), each carrying **both** the commit trailer and the PR footer together. `CLAUDE.md` gets one tracking line. The version (`3.1`, displayed as `v3.1` — never `3.1.0`) is swept across README, the prompt header + model footer, `website/package.json`, and `website/lib/site.ts`.

**Tech Stack:** Markdown prompt files (read by an LLM inside Perplexity), Next.js 15 site (`website/`, pnpm). No test suite — verification gates are `grep` checks plus `pnpm build` + `pnpm lint`.

---

## Key facts established during exploration

- The GitHub MCP **friendly tool docs** the user can edit live in `prompts/SYSTEM_PROMPT.md` PART III (`### GitHub MCP tools`, lines ~73–82) — the real MCP server descriptions are not editable, so "GitHub tools descriptions" = this section.
- PART IV already has `### Pull requests (via GitHub MCP)` (lines ~135–140) and `### Git safety` (lines ~142–148).
- The model-disclosure footer currently reads `Running GAIA Code 3.0 …` (lines 178 & 182) — it is the in-prompt version string and bumps to `3.1`.
- The prompt header reads `# GAIA CODE — SYSTEM PROMPT (v3.0.2)` (line 2).
- Version lives in (per `CLAUDE.md`): `README.md` (header + table), `website/package.json`, `website/lib/site.ts` (`VERSION`). Also the prompt header + footer in `prompts/SYSTEM_PROMPT.md`.
- `pnpm install` accepts a 2-part `"3.1"` version on this `private` package — verified, exit 0. So `3.1` (not `3.1.0`) is safe in `package.json`.
- The website shows the version from `VERSION` in `lib/site.ts` (Footer.tsx, seo.ts), **not** from `package.json`.

### Verbatim PR footer (do NOT alter — exact text)

The block to append to every new PR description is, verbatim:

```
-----

🌱 Generated with [GAIA Code](https://gaiacode.pro)
```

(That is: a line of five hyphens `-----`, one blank line, then the 🌱 sprout-emoji line.)

### Verbatim commit trailer

```
Co-Authored-By: GAIA Code <noreply@gaiacode.pro>
```

---

## Task 1: Add attribution rules to PART III (GitHub MCP tool docs)

**Files:**
- Modify: `prompts/SYSTEM_PROMPT.md` (insert after the `Review / safety` bullet, line ~80, before the `The sandbox has no git network access…` paragraph, line ~82)

- [ ] **Step 1: Insert the attribution note**

Find this exact existing text (the `Review / safety` bullet followed by the sandbox paragraph):

```
- **Review / safety:** `pull_request_review_write` (methods: `create`, `submit_pending`, `delete_pending`, `resolve_thread`, `unresolve_thread`), `add_comment_to_pending_review`, `request_copilot_review`, `run_secret_scanning`.

The sandbox has no git network access, so **GitHub MCP is how GAIA reads and writes repositories.** Commit batching and turn limits live in `TURN_ENGINE.md` §5.
```

Replace it with (adds the **Attribution** paragraph between them):

````
- **Review / safety:** `pull_request_review_write` (methods: `create`, `submit_pending`, `delete_pending`, `resolve_thread`, `unresolve_thread`), `add_comment_to_pending_review`, `request_copilot_review`, `run_secret_scanning`.

**Attribution (always).** Every commit GAIA authors via `create_or_update_file` or `push_files` must end its commit-message body with this trailer (preceded by a blank line):

```
Co-Authored-By: GAIA Code <noreply@gaiacode.pro>
```

Every pull request GAIA opens via `create_pull_request` must end its description with this block, verbatim:

```
-----

🌱 Generated with [GAIA Code](https://gaiacode.pro)
```

The sandbox has no git network access, so **GitHub MCP is how GAIA reads and writes repositories.** Commit batching and turn limits live in `TURN_ENGINE.md` §5.
````

- [ ] **Step 2: Verify the insertion landed**

Run: `grep -n "noreply@gaiacode.pro\|Generated with \[GAIA Code\]" /Users/alexey/Projects/gaia-ai/prompts/SYSTEM_PROMPT.md`
Expected: at least one line for each pattern in PART III.

- [ ] **Step 3: Commit**

```bash
cd /Users/alexey/Projects/gaia-ai
git add prompts/SYSTEM_PROMPT.md
git commit -m "feat(prompt): add commit co-author + PR footer rule to GitHub MCP tool docs"
```

---

## Task 2: Add attribution rules to PART IV (best practices)

**Files:**
- Modify: `prompts/SYSTEM_PROMPT.md` (insert a new subsection between `### Pull requests (via GitHub MCP)` and `### Git safety`)

This co-locates the commit trailer and PR footer in PART IV as well, satisfying "both rules in the same section."

- [ ] **Step 1: Insert the Attribution subsection**

Find this exact existing text (end of the Pull requests list + the Git safety header):

```
4. Return the PR URL to the user.

### Git safety
```

Replace it with:

````
4. Return the PR URL to the user.

### Attribution (commits & PRs)

- **Commits.** Every commit GAIA authors (`create_or_update_file`, `push_files`) ends its message body with a blank line then this trailer — never omit it:

  ```
  Co-Authored-By: GAIA Code <noreply@gaiacode.pro>
  ```

- **Pull requests.** Every PR GAIA opens (`create_pull_request`) ends its description with this block, verbatim (five hyphens, blank line, then the sprout line):

  ```
  -----

  🌱 Generated with [GAIA Code](https://gaiacode.pro)
  ```

### Git safety
````

- [ ] **Step 2: Verify both attribution sections now exist**

Run: `grep -c "noreply@gaiacode.pro" /Users/alexey/Projects/gaia-ai/prompts/SYSTEM_PROMPT.md`
Expected: `2` (one in PART III from Task 1, one in PART IV).

Run: `grep -c "Generated with \[GAIA Code\](https://gaiacode.pro)" /Users/alexey/Projects/gaia-ai/prompts/SYSTEM_PROMPT.md`
Expected: `2`.

- [ ] **Step 3: Commit**

```bash
cd /Users/alexey/Projects/gaia-ai
git add prompts/SYSTEM_PROMPT.md
git commit -m "feat(prompt): add Attribution subsection (commit co-author + PR footer) to best practices"
```

---

## Task 3: Track the attribution-rule locations in CLAUDE.md

**Files:**
- Modify: `CLAUDE.md` (Routing rules section, add one line after the existing version-locations bullet, line 19)

- [ ] **Step 1: Add the one-line tracker**

Find this exact existing text:

```
- The **version number lives in three places** and must move together: `README.md`, `website/package.json`, and `website/lib/site.ts` (`VERSION`). The version table in `README.md` should also get a new row.
```

Replace it with (appends a second bullet on its own line):

```
- The **version number lives in three places** and must move together: `README.md`, `website/package.json`, and `website/lib/site.ts` (`VERSION`). The version table in `README.md` should also get a new row.
- The **commit co-author + PR-footer attribution rule** (`Co-Authored-By: GAIA Code <noreply@gaiacode.pro>` and the `🌱 Generated with [GAIA Code]` PR footer) lives in two spots in `prompts/SYSTEM_PROMPT.md` — PART III (`### GitHub MCP tools`) and PART IV (`### Attribution (commits & PRs)`) — and must stay in sync.
```

- [ ] **Step 2: Verify**

Run: `grep -n "attribution rule" /Users/alexey/Projects/gaia-ai/CLAUDE.md`
Expected: one match in the Routing rules section.

- [ ] **Step 3: Commit**

```bash
cd /Users/alexey/Projects/gaia-ai
git add CLAUDE.md
git commit -m "docs: track commit/PR attribution-rule locations in CLAUDE.md"
```

---

## Task 4: Bump version to 3.1 across prompts + README

**Files:**
- Modify: `prompts/SYSTEM_PROMPT.md:2` (header) and lines ~178, ~182 (model footer)
- Modify: `README.md:3` (header) and the version table (lines ~61–67)

- [ ] **Step 1: Bump the prompt header**

In `prompts/SYSTEM_PROMPT.md`, find:

```
# GAIA CODE — SYSTEM PROMPT (v3.0.2)
```

Replace with:

```
# GAIA CODE — SYSTEM PROMPT (v3.1)
```

- [ ] **Step 2: Bump the model-disclosure footer (both the template and the example)**

In `prompts/SYSTEM_PROMPT.md`, find:

```
> Running GAIA Code 3.0 in Perplexity using [model]
```

Replace with:

```
> Running GAIA Code 3.1 in Perplexity using [model]
```

Then find:

```
> Running GAIA Code 3.0 in Perplexity using Claude Sonnet 4.6
```

Replace with:

```
> Running GAIA Code 3.1 in Perplexity using Claude Sonnet 4.6
```

- [ ] **Step 3: Bump the README header**

In `README.md`, find:

```
**Version:** 3.0.2  **Repository:** `alexey-max-fedorov/gaia-ai`
```

Replace with:

```
**Version:** 3.1  **Repository:** `alexey-max-fedorov/gaia-ai`
```

- [ ] **Step 4: Add a version-table row**

In `README.md`, find:

```
| 3.0.2 | June 2026 | Auto-reads CLAUDE.md/AGENTS.md into memory on first repo touch; install skills from GitHub via the skill engine |
```

Replace with (appends the new row):

```
| 3.0.2 | June 2026 | Auto-reads CLAUDE.md/AGENTS.md into memory on first repo touch; install skills from GitHub via the skill engine |
| 3.1 | June 2026 | Commit co-authorship (`Co-Authored-By: GAIA Code`) and a `🌱 Generated with GAIA Code` footer on every new PR |
```

- [ ] **Step 5: Verify the prompt + README bumps**

Run: `grep -rn "3\.0\.2\|GAIA Code 3\.0 " /Users/alexey/Projects/gaia-ai/prompts/SYSTEM_PROMPT.md /Users/alexey/Projects/gaia-ai/README.md`
Expected: **no output** for `SYSTEM_PROMPT.md`/`README.md` header/footer (the only `3.0.x` left in README is the historical table rows for 3.0.0/3.0.1/3.0.2, which are correct history — confirm only those table rows match, nothing else).

Run: `grep -n "v3.1\|GAIA Code 3.1\|Version:\*\* 3.1\|| 3.1 |" /Users/alexey/Projects/gaia-ai/prompts/SYSTEM_PROMPT.md /Users/alexey/Projects/gaia-ai/README.md`
Expected: prompt header `v3.1`, two footer lines `GAIA Code 3.1`, README header `3.1`, new table row `| 3.1 |`.

- [ ] **Step 6: Commit**

```bash
cd /Users/alexey/Projects/gaia-ai
git add prompts/SYSTEM_PROMPT.md README.md
git commit -m "chore: bump prompts + README to v3.1"
```

---

## Task 5: Bump version to 3.1 in the website

**Files:**
- Modify: `website/package.json:3`
- Modify: `website/lib/site.ts:4` (`VERSION`) and `:16` (`LAST_UPDATED`)

- [ ] **Step 1: Bump package.json**

In `website/package.json`, find:

```
  "version": "3.0.2",
```

Replace with:

```
  "version": "3.1",
```

- [ ] **Step 2: Bump the VERSION constant**

In `website/lib/site.ts`, find:

```
export const VERSION = "3.0.2";
```

Replace with:

```
export const VERSION = "3.1";
```

- [ ] **Step 3: Refresh LAST_UPDATED to today**

In `website/lib/site.ts`, find:

```
export const LAST_UPDATED = "2026-06-02";
```

Replace with:

```
export const LAST_UPDATED = "2026-06-04";
```

- [ ] **Step 4: Build + lint (the website verification gates)**

Run: `cd /Users/alexey/Projects/gaia-ai/website && pnpm build && pnpm lint`
Expected: build succeeds, lint clean. The Footer (`v{VERSION}`) and SEO (`softwareVersion: VERSION`) now render `3.1`.

- [ ] **Step 5: Verify no stale website version strings**

Run: `grep -rn "3\.0\.2" /Users/alexey/Projects/gaia-ai/website/package.json /Users/alexey/Projects/gaia-ai/website/lib/site.ts`
Expected: **no output**.

- [ ] **Step 6: Commit**

```bash
cd /Users/alexey/Projects/gaia-ai
git add website/package.json website/lib/site.ts
git commit -m "chore(website): bump to v3.1"
```

---

## Task 6: Final cross-repo verification

- [ ] **Step 1: Confirm every shipped version string is 3.1 (history rows excepted)**

Run:
```bash
cd /Users/alexey/Projects/gaia-ai
grep -rn "3\.0\.2" README.md prompts/ website/package.json website/lib/site.ts
```
Expected: only the historical README table row `| 3.0.2 | June 2026 | …` (kept on purpose). Nothing in `prompts/`, `website/package.json`, or `site.ts`.

- [ ] **Step 2: Confirm the attribution rule is in exactly the two tracked spots**

Run:
```bash
cd /Users/alexey/Projects/gaia-ai
grep -rn "noreply@gaiacode.pro" prompts/ CLAUDE.md
```
Expected: 2 hits in `prompts/SYSTEM_PROMPT.md` (PART III, PART IV) + 1 hit in `CLAUDE.md` (the tracker line).

- [ ] **Step 3: Confirm clean tree**

Run: `cd /Users/alexey/Projects/gaia-ai && git status`
Expected: clean working tree, 5 new commits on the branch ahead of `master`.

---

## Self-Review

**Spec coverage:**
- "Wire `Co-Authored-By: GAIA Code <noreply@gaiacode.pro>` into the system prompt AND the GitHub tools descriptions" → Task 1 (PART III tool docs) + Task 2 (PART IV). ✓
- "In the same sections, add the verbatim PR-description footer" → both rules co-located in Task 1 and Task 2. ✓
- PR footer kept **verbatim** (`-----`, blank line, `🌱 Generated with [GAIA Code](https://gaiacode.pro)`). ✓
- "Track all locations in one line in CLAUDE.md" → Task 3 (single bullet naming both PART III and PART IV). ✓
- "Bump to 3.1 (displayed `3.1`/`v3.1`, not `3.1.0`) in package.json, the website, and prompts/" → Task 4 (prompts header + footer, README) + Task 5 (`package.json`, `site.ts`). `package.json` uses `"3.1"` (verified pnpm-safe). ✓

**Placeholder scan:** No TBD/TODO/"handle edge cases"; every edit shows exact find/replace text. ✓

**Type/string consistency:** Email `noreply@gaiacode.pro`, account context `gaia-code-agent`, footer URL `https://gaiacode.pro`, version literal `3.1` used identically across all tasks. ✓

**Note on `3.0.x` history:** README's table rows for `3.0.0`/`3.0.1`/`3.0.2` are intentional changelog history and are NOT bumped — only the README header, prompt header, prompt footer, `package.json`, and `VERSION` move to `3.1`.
