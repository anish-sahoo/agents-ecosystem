---
name: plz-parallel-review
description: Fan out parallel fresh-context reviewers on the current diff, then synthesize. Add "autofix" to apply fixes worth doing now.
args: true
---

Run an adversarial, multi-angle review of the current work by fanning out
parallel `reviewer` subagents, then synthesize their feedback.

Review target / focus (optional): $ARGUMENTS

## Steps

1. **Determine the target.** If arguments name a path, file, change set, or
   focus, that is the primary scope — read it first. Otherwise review the
   current uncommitted diff. Get oriented with the current changes
   (`git diff --stat HEAD` and `git status --short`).

2. **Choose 3 review angles** from the actual change. Default angles:
   correctness & regressions; tests & validation; style & code smells. For the
   style/smells angle use the dedicated `style-reviewer` agent (it also runs the
   project's configured linters). Swap or add an angle when the change calls for
   it (security for auth/input-handling, types for heavy typed code, UX for UI,
   docs/API for public interfaces). Prefer 3 strong angles over many vague ones.

3. **Fan out in parallel.** Run one agent per angle at once — `reviewer` for most
   angles, `style-reviewer` for the style/smells angle. Each must: name its
   angle, point the agent at the actual diff and files (not this conversation),
   require evidence with file:line, and state "do not edit files."

4. **Synthesize** into: fixes worth doing now (blockers + clearly-worth-it);
   optional improvements (defer); ignore / out of scope (one-line reason).
   Resolve reviewer disagreements yourself with evidence; don't just concatenate.

5. **Apply, or ask.**
   - If arguments contain `autofix`: apply only the fixes worth doing now,
     validate, summarize. Don't apply optional improvements. If none, don't edit.
   - Otherwise present the synthesis and offer a numbered choice: apply
     fixes-worth-doing-now only / plus optional improvements / leave as-is.

If reviewers surface an unapproved scope/product/architecture decision, flag it
and ask before acting.
