---
name: plz-help
description: Guided walkthrough — figure out what the user wants, then recommend and launch the right workflow or agent.
args: true
---

Walk the user through what they're trying to do, then route them to the best
workflow or agent. Do **not** start solving the task during this command — your
job is to understand the intent and hand off cleanly.

What the user said (may be empty): $ARGUMENTS

## Steps

1. **Understand intent.** If arguments are empty or vague, ask a short series of
   focused questions — one or two at a time, not a wall. Cover only what you need:
   - What's the goal? (implement / review / investigate or decide / security
     check / research / quick fix)
   - Is the code already written, or starting fresh?
   - Rough size and risk? (one file vs. many; touches auth/data/public API?)
   - How much oversight? (just do it / checkpoints / full gates)

2. **Recommend** the best fit, with a one-line reason. Match effort to the task.

   | If the goal is… | Route to |
   |---|---|
   | A full feature/change, want guardrails | **plz-ship** workflow |
   | Plan first, no code yet | **plz-plan-feature** workflow |
   | Review work that's already done | **plz-parallel-review** workflow (add `autofix`) |
   | Get it review-clean iteratively | **plz-review-loop** workflow |
   | Security concern / pre-release check | **plz-security-audit** workflow |
   | Need external + local facts before deciding | **plz-parallel-research** workflow |
   | Pressure-test a decision or direction | `oracle` |
   | Pressure-test reasoning/claims in an analysis | `challenger` |
   | One quick code review | `reviewer` |
   | Small, obvious, low-risk change | Just do it directly — no workflow |
   | Address PR comments / CI failures | **plz-fix-pr** workflow |

3. **Confirm and switch.** Present the recommendation (plus a runner-up if
   close) and offer a numbered choice. When the user picks, run that workflow's
   steps directly in this session (or invoke the chosen agent) — they shouldn't
   re-type the command. If the answer is "just do it," start once scope is clear.
