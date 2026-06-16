---
name: plz-security-audit
description: Parallel security sweep — fan out auditor, pentester, and secrets/deps scanner, then synthesize a severity-ranked report.
args: true
---

Run a parallel security review by fanning out three read-only specialist
subagents, then synthesize their findings into one ranked report.

Scope (optional — a path, the current diff, or a change set): $ARGUMENTS

## Steps

1. **Set scope.** If arguments name a path/area, focus there. Otherwise audit
   the current diff if there are uncommitted changes, else the most
   security-relevant surfaces of the repo. Get oriented with the current state.

2. **Fan out in parallel.** Run three subagents at once, each scoped to the
   target and instructed to inspect the actual code (read-only, no edits):
   - `security-auditor` — auth, authorization, input validation, data exposure,
     crypto, configuration.
   - `pentester` — attacker view: injection, authz bypass, SSRF, traversal,
     deserialization, race conditions, trust-boundary abuse.
   - `secrets-deps-scanner` — hardcoded secrets and vulnerable/outdated
     dependencies.

3. **Synthesize** one report. Deduplicate overlapping findings, reconcile
   severities, and order strictly by severity (Critical → High → Medium → Low),
   each with file:line, impact, fix, and which agent found it. End with counts
   by severity and the top 1-3 things to fix first.

4. **Do not auto-fix.** Security fixes often involve design tradeoffs. Present
   the report and ask which findings to address before changing anything.
