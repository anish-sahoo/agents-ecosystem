---
name: plz-ship
description: End-to-end feature loop with human approval gates — clarify, plan, implement, review, fix. The user approves at each gate.
args: true
---

Take the goal below from idea to reviewed implementation, running the full loop
but **stopping at every approval gate** so the user stays in control. Never skip
a gate. Never proceed past a gate without explicit approval.

Goal: $ARGUMENTS

## The loop

### Gate 0 — Clarify
Restate the goal in your own words. If scope, acceptance criteria, constraints,
or non-goals are unclear, ask focused questions. **Stop and confirm shared
understanding before planning.**

### Gate 1 — Plan (APPROVAL REQUIRED)
- Map the relevant code (read-only recon subagent if available).
- Use the `planner` subagent for a concrete plan: ordered steps, named files,
  acceptance criteria, risks, validation.
- For risky or ambiguous direction, run `oracle` over the plan first.
- Present the plan and **ask the user to approve, adjust, or reject.** Do not
  write code until approved.

### Gate 2 — Implement
After approval, implement the plan yourself as the single writer — minimal,
coherent changes that follow existing patterns. If you hit an unapproved
scope/architecture/product choice, **stop and ask** rather than deciding
silently. Run focused validation as you go.

### Gate 3 — Review (APPROVAL REQUIRED on fixes)
- Run fresh-context review subagents in parallel (`reviewer` for
  correctness/regressions and tests/validation, `style-reviewer` for style/smells
  which also runs the configured linters; add security/perf/docs angles when
  warranted). Read-only, evidence with file:line.
- Synthesize into: blockers / fixes worth doing now / optional / ignore.
- Present the synthesis and **ask which to apply.** If reviewers surface an
  unapproved decision, ask before acting.

### Gate 4 — Fix & verify
Apply the approved fixes. Re-review only if the fixes were substantial. Then
inspect the final diff yourself, run/confirm validation, and present a final
summary: what changed, validation evidence, anything deferred, and suggested
next steps.

## Rules
- One writer (the main agent). Subagents are read-only advisors/reviewers.
- Match effort to the goal — a small feature shouldn't trigger five reviewers.
- Stop early if the user says so, or if a blocking decision needs them.
- Do not commit, push, or open a PR unless the user explicitly asks.
