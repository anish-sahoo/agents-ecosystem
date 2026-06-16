# Working rules

Global rules that apply to every project and every session. These are
tool-neutral; project-specific instructions always take precedence over these.

## Read the project's own docs first

Before non-trivial changes in any repo, find and follow the project's own
guidance. Check for and read, when present:

- `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`
- `README.md`, `CONTRIBUTING.md`, `ARCHITECTURE.md`, `DEVELOPMENT.md`
- `docs/` (especially contributing, conventions, style, architecture)
- Any nested instruction file closer to the files being edited

The repo's own conventions (style, structure, commit format, test commands,
naming, architectural boundaries) override general habits. If they conflict with
an explicit instruction from me, ask. Nested instruction files closer to the
edited files take precedence over ones higher up.

## Match the codebase

Follow existing patterns, naming, and structure already present over introducing
new ones. Make the smallest coherent change that satisfies the task. No
speculative scaffolding or future-proofing unless asked.

## Prefer clean code — in balance

Default to readable, low-complexity code: guard clauses and early returns over
deep nesting, clear names, small focused functions, and straightforward control
flow over cleverness.

But balance cleanliness against cost. Don't add abstraction, indirection, or
noticeably more code just to chase a "clean" ideal. When making something
"cleaner" would add complexity, layers, or significant volume out of proportion
to the benefit, prefer the simpler, more direct version. The goal is code that's
easy to read and change — not maximal purity. When in doubt, match the
surrounding code's style.

## Format and lint after code changes

After making code changes, run the project's **configured** formatter and linter
(on the changed files where possible) and fix what they flag. Discover the
config from the repo — formatter/linter config files, `package.json` scripts,
`Makefile`/task targets, pre-commit hooks, CI.

If the repo has **no** formatter or linter configured, leave formatting alone:
do not introduce one, and do not run ad-hoc tools the project hasn't adopted.

## Prefer dedicated tools over shell equivalents

Always use the purpose-built tool, never a shell command that does the same job:

- Read files with the read tool, never `cat`/`head`/`tail`.
- Edit files with the edit/write tools, never `sed`/`awk`/`perl -i`/`echo >`/heredocs.
- Find files with the glob/file-search tool, never `find`/`ls`.
- Search contents with the grep/search tool, never shell `grep`/`rg`.
- Communicate by writing output, never `echo`/`printf`.

Fall back to a CLI command only if the proper tool call genuinely fails, or the
task truly requires the shell (running tests, git, build tools, package managers).

## Orchestration posture

- **Single writer.** One coherent write path. Additional agents are advisors,
  reviewers, scouts, and researchers — keep them read-only.
- **Match effort to risk.** Default to doing the work directly; escalate to
  planning, parallel review, or audits only when the change is non-trivial,
  risky, broad, or security-sensitive.
- **Fresh-context review.** Adversarial reviewers should inspect the repo and
  diff directly, not rely on accumulated conversation history.
- **Synthesize, don't rubber-stamp.** Sort review feedback into fix-now /
  optional / ignore; don't apply everything blindly. Escalate unapproved
  scope/architecture/product decisions instead of deciding silently.
- **Stay in the loop on big changes.** For full features, prefer explicit
  approval checkpoints (plan approval, fix approval) over end-to-end autonomy.

## Communication

- Direct and concise. No filler, no flattery. Objective technical judgment over
  agreement; disagree and correct when warranted.
- Don't add emojis unless asked.
