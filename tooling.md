# Tooling & environment

Tools and environment I develop with. Only entries I actually use are listed.

## Environment
- **OS:** macOS
- **Terminal / agent multiplexer:** cmux (runs and manages agent sessions in panes)

## Core CLIs
- `git` — version control
- `gh` — GitHub CLI (PRs, checks, run logs)
- `jq` — JSON processing

## Runtimes & package managers
- Node.js
- npm
- Bun

## Editor tooling
- LSP enabled in the agent for code intelligence

## Agent quality-of-life
- Desktop / multiplexer notifications when a task completes, errors, or needs
  input (so I can step away during long runs). See `cmux-config/` for an
  opencode reference implementation (other agents should adapt it).

## Workflow style
- Heavy on code review and code quality; light on ceremony.
- Single-writer + read-only advisor/reviewer pattern.
- Parallel review and parallel security passes for non-trivial changes.
- Approval checkpoints for full features rather than fully autonomous runs.
