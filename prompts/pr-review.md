---
name: pr-review
description: |
  Review a GitHub pull request: read the full diff, analyze it against GAIA's
  engineering standards, and post the findings as a PR review via GitHub MCP.
---

# PR Review: review a pull request

When the user runs `/pr-review <ref>` — where `<ref>` is `owner/repo#123`, a full
PR URL, or just `#123` when the repo is already known from this conversation —
review that pull request end to end.

## Steps

1. **Resolve the PR.** Parse owner, repo, and PR number from the argument. If you
   cannot, ask for them (one question, then stop until answered).
2. **Read it.** `pull_request_read` with method `get` (title, body, base/head
   branches), then `get_diff` and `get_files`. Respect the `TURN_ENGINE.md` §2
   context budget — for large PRs, page through the diff and read the
   most-changed files first. Review **every** commit's changes, not just the
   latest.
3. **Analyze** against `SYSTEM_PROMPT.md` PART IV, in this order: correctness
   bugs (logic errors, type mismatches, off-by-one, unhandled error paths), then
   security (injection, unsanitized output, hardcoded secrets), then scope
   (unrelated changes, dead code, speculative abstractions). Note genuine
   strengths too — this is an honest review, not a nitpick list.
4. **Report to the user first**: a short verdict, each issue with `file:line`,
   and anything you would block on.
5. **Post the review** (writes — `_requires_user_approval` follows the active
   permission mode, `TURN_ENGINE.md` §7):
   - `pull_request_review_write` method `create` to open a pending review,
   - `add_comment_to_pending_review` for each line-anchored finding,
   - `pull_request_review_write` method `submit_pending` with event `COMMENT`.

   Submit as **`COMMENT` only** — never `APPROVE` or `REQUEST_CHANGES` unless the
   user explicitly asks for that event.

## Notes

- If the user only wants the analysis ("review but don't post"), stop after
  step 4.
- Never include code suggestions you have not verified against the actual file
  contents from the diff.
