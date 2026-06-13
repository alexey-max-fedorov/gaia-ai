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
     Instructions and re-uploading the engine files. Then fetch `README.md` from the
     same repo and branch with `get_file_contents`, find the `## Versioning` table,
     and list the **Notes** column for every version newer than `LOCAL_VERSION`
     (oldest first) under a short "What's new" heading — so the user sees what the
     upgrade brings. If the table can't be parsed, skip the what's-new list rather
     than guessing.
   - **`LATEST_VERSION` == `LOCAL_VERSION` (up to date):** Tell the user they're on the
     latest version (state the number). Nothing to do.
   - **`LATEST_VERSION` < `LOCAL_VERSION` (ahead):** Tell the user their Space is running a
     newer version than the latest release (state both numbers) — likely a pre-release or
     local build. Nothing to do.

## Notes

- Display versions exactly as written (`3.1`, never `3.1.0`).
- This is a read-only check. It never edits files, commits, or changes the Space — it only
  reports status and points to the Get Started page.
- Keep the reply short: a one-line verdict plus, when an update exists, the what's-new list and the Get Started link.
