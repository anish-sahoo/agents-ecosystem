---
name: plz-parallel-research
description: Research a question from both external sources and the local codebase in parallel, then synthesize.
args: true
---

Answer the question using both external evidence and local code context, run in
parallel, then synthesize a single brief.

Question / topic: $ARGUMENTS

## Steps

1. **Fan out in parallel** (two subagents at once):
   - `researcher` — external evidence: official docs, specs, library/API
     behavior, recent changes, benchmarks, primary sources. Return findings with
     source links.
   - a read-only local recon subagent (built-in if your tool provides one) —
     how this codebase currently handles the relevant area, existing patterns,
     constraints, and likely integration points, with file:line references.

   If the question is purely external, skip the local pass; if purely local,
   skip the researcher.

2. **Synthesize** into: a direct answer; key external evidence + sources; how
   it's done in this codebase (file:line); and the recommendation/implications
   for the decision, including tradeoffs and gaps.

Do not implement anything — this is research only unless the user asks to act.
