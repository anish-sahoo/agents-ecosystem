---
name: orchestrator
description: Use when coordinating subagents for non-trivial coding work — multi-step features, refactors, risky changes, or when the user asks for review, planning, a second opinion, or a security audit. Covers when to delegate vs. work directly, single-writer discipline, and the clarify→plan→implement→review loop. Stay quiet for small, low-risk, single-file changes.
---

# Orchestrator

This skill guides the main agent on when and how to delegate to subagents. The
default posture is **minimal orchestration**: do the work yourself unless
delegation clearly adds value. Favor code quality and review over machinery.

## The control dial

Match effort to risk. Do not escalate past what the task needs.

| Level | When | Action |
|-------|------|--------|
| **0 — Direct** | Small, low-risk, single-file or obvious change | Just do it. No subagents. |
| **1 — One advisor** | A specific decision or quick check is in doubt | `oracle` (direction/drift), `challenger` (reasoning), or one `reviewer` |
| **2 — Parallel review** | A non-trivial diff is done and quality matters | Run several fresh-context `reviewer`s with distinct angles, then synthesize |
| **3 — Loop / audit** | Risky, broad, or security-sensitive work | review→fix loop, parallel security sweep, or a staged plan→implement→review cycle |

When in doubt, prefer Level 0–1. Suggest a higher level rather than silently
spending tokens on it.

## Core principles

### Single writer
The main agent is the writer. Subagents are advisors, reviewers, scouts, and
researchers — keep them read-only. Never run multiple agents that edit the same
files concurrently. Keep one coherent write path.

### Fresh-context reviewers
Adversarial reviewers must inspect the repo and diff directly, not rely on the
main conversation history. Give each a concrete, narrow task. This catches what
accumulated context glosses over.

### Narrow tasks beat vague mandates
"Review auth for missing authz checks" works far better than "review
everything." Give each subagent a goal, what to inspect, the evidence format you
want back, and any hard constraints (e.g. "do not edit files").

### Synthesize, don't rubber-stamp
After parallel reviewers return, sort findings into fixes worth doing now /
optional improvements / ignore (with a reason). Don't apply everything blindly.
If reviewers surface an unapproved scope/product/architecture decision, ask the
user before acting.

## The feature loop (Level 3 scaffolding)

For a non-trivial feature, when the full treatment is wanted:

```
clarify → (explore) → plan → implement → parallel review → fix → re-review when warranted
```

1. **Clarify** scope, acceptance criteria, and non-goals before writing code.
2. **Explore** the codebase first when context is needed (use a built-in
   read-only recon subagent if the tool provides one).
3. **Plan** with the `planner` for complex work; confirm before implementing.
4. **Implement** yourself, minimally, following existing patterns. Run the
   project's configured formatter/linter on changed files afterward (skip if none
   is configured).
5. **Review** by running fresh-context review subagents (`reviewer` for
   correctness/regressions and tests/validation, `style-reviewer` for style/smells
   which also runs the configured linters; add security/performance/docs angles
   when warranted).
6. **Fix** the synthesized fixes-worth-doing-now yourself.
7. **Re-review** only if the fixes were substantial. Don't loop for polish.

Stop when reviewers find no blockers, remaining feedback is optional/deferred,
an unapproved decision needs the user, or a sensible round cap is reached.

## Don't over-orchestrate

- Skip subagents for typos, one-liners, and obvious mechanical edits.
- Don't run a full review loop when a single `reviewer` pass would do.
- Three strong review angles beat five vague ones.
- Keep delegation one level deep (subagents don't spawn subagents).
- Run parallel subagents by issuing several delegations at once.
