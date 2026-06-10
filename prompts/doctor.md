---
name: doctor
description: |
  Verify this Space's GAIA Code deployment: engine files present, versions
  consistent, memory and permission mode initialized, GitHub MCP reachable.
  Read-only — reports problems and how to fix them, changes nothing.
---

# Doctor: verify the GAIA Code deployment

When the user runs `/doctor`, run these checks and print a ✅/⚠️/⏭️ checklist.
This skill is **read-only**: no commits, no file writes, no Space changes.

## Checks

1. **Engine files.** Confirm each of `SYSTEM_PROMPT.md`, `MEMORY_ENGINE.md`, and
   `TURN_ENGINE.md` is available to you as a Space file (you read them at startup —
   if one is absent from your context, it was not uploaded). ⚠️ for any missing
   file: that engine is disabled; the fix is to upload it per
   https://gaiacode.pro/get-started.
2. **Version consistency.** In `SYSTEM_PROMPT.md`, the header
   `# GAIA CODE — SYSTEM PROMPT (v<version>)` and the PART VII footer rule
   `Running GAIA Code <version>` must carry the same number. ⚠️ on mismatch —
   the Space is running mixed file versions; redeploy all files.
3. **Up to date?** Read `website/package.json` from repo
   `alexey-max-fedorov/gaia-ai` on `master` via GitHub MCP `get_file_contents`
   (a read — no approval needed) and compare its `"version"` against the local
   version, numerically component-by-component as `/update` does. ⚠️ if behind;
   ⏭️ "skipped" if GitHub MCP is unavailable.
4. **Memory.** With one `execute_code` call: does `MEMORY.md` exist, and does its
   `## Permissions` section record a `Mode:` line? ⚠️ if the file or the mode is
   missing (GAIA will run Ask Permissions and prompt for a choice on the next
   write).
5. **GitHub MCP.** Call `get_me`. ✅ with the authenticated login on success;
   ⚠️ "not connected" on failure, pointing to https://gaiacode.pro/connectors.

## Output

A short checklist — one line per check, ✅/⚠️/⏭️ plus a one-line fix for every ⚠️ —
followed by a one-line overall verdict. Nothing else.
