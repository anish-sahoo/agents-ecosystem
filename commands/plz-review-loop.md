---
name: plz-review-loop
description: Review -> fix -> re-review loop on the current diff until clean or capped (default 3 rounds).
args: true
---

Run a review/fix loop on the current work, staying in control as the loop
orchestrator and final decision-maker.

Target / focus / max-rounds (optional): $ARGUMENTS

Default cap: **3 review rounds** (override if arguments specify one).

Each round:

1. **Review.** Run fresh-context review subagents in parallel (typically
   `reviewer` for correctness/regressions and tests/validation, plus
   `style-reviewer` for style/smells which also runs the configured linters; add
   security/performance/docs angles when warranted). They inspect the actual
   repo and diff directly, return evidence with file:line, and do not edit.

2. **Synthesize** into: blockers / fixes worth doing now / optional / ignore.
   If reviewers surface an unapproved scope/product/architecture decision,
   **stop and ask the user** before applying anything.

3. **Fix.** Apply only the blockers and fixes-worth-doing-now yourself, as one
   coherent change. Run focused validation for the touched area.

4. **Decide whether to continue.** Run another round only if the fixes were
   substantial or addressed non-trivial findings. Do not loop for optional
   polish or already-deferred items.

## Stop when any is true
- Reviewers find no blockers or fixes worth doing now.
- Remaining feedback is optional, speculative, or intentionally deferred.
- An unapproved decision needs the user (pause and ask).
- The round cap is reached.

## On completion
Inspect the final diff yourself, confirm focused validation, and summarize:
rounds run, fixes applied, validation evidence, deferred items, and why the loop
stopped.
