---
name: plz-review-pr
description: Run one fast, evidence-backed read-only review pass over a PR, diff, or named files.
args: true
---

Run one focused, read-only `reviewer` pass. This is the lightweight alternative
to `plz-parallel-review`; do not fan out or invoke additional review agents.

Review target / focus (optional): $ARGUMENTS

1. Determine the review scope. Use the named PR, files, or focus when supplied.
   Otherwise inspect the current uncommitted diff and status.
2. Give the `reviewer` the actual diff and relevant files, not this conversation.
   Require it to inspect directly, report only evidence-backed findings with
   `file:line` references, and never edit files.
3. Return findings ordered by severity, followed by a short validation-gap note.
   If no findings are warranted, say so plainly. Do not apply fixes unless the
   user explicitly asks.
