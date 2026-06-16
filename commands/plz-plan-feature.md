---
name: plz-plan-feature
description: Clarify -> explore -> plan -> review the plan. Produces an approved implementation plan without writing code.
args: true
---

Produce a reviewed implementation plan for the goal below. Do **not** write any
implementation code — the output is an approved plan.

Goal: $ARGUMENTS

## Steps

1. **Clarify.** If scope, acceptance criteria, or non-goals are ambiguous, ask
   focused questions before planning. Don't guess on consequential choices.

2. **Explore.** Map the relevant code (entry points, key types/functions, data
   flow, existing patterns, files likely to change) using a read-only recon
   subagent if available.

3. **Plan.** Hand the clarified goal + exploration findings to the `planner`
   subagent for a concrete plan (ordered steps, named files, acceptance
   criteria, risks, validation).

4. **Review the plan.** Run one `reviewer` (or `oracle` for a riskier/ambiguous
   change) over the plan to catch missing steps, hidden risks, and bad
   assumptions before any code is written.

5. **Present** the reviewed plan and ask the user to approve, adjust, or hand it
   to the **plz-ship** workflow for implementation. Save to a file only if wanted.
