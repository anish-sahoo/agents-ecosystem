---
name: plz-fix-pr
description: Address review comments and CI failures on an existing GitHub pull request, on its source branch.
args: true
---

Fix review comments and CI failures on this pull request. Do NOT create a new
pull request — all fixes go on the existing source branch.

PR (URL or number): $ARGUMENTS

## Setup
Requires `gh` and `jq`. If either is missing, stop and say so.

## Steps

1. **Check out the PR branch** (`gh pr checkout <number>`).

2. **Fix review comments.** List the PR's review comments (ignore
   resolved/outdated threads), read each, understand the requested change, and
   fix it.

3. **Fix CI failures.** Fetch the PR's checks; for failed runs, fetch the failed
   logs, diagnose each failure, and fix the underlying issue.

4. **Validate** locally where possible, then summarize what was changed and why.
   Do not commit/push unless the user asks.
