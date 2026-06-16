# Mapping neutral definitions to agent tools

This file defines how the neutral source in this repo is projected onto a
specific agent runtime. When generating a tool's config, follow the relevant
section exactly.

## Neutral schemas

### Agent frontmatter

```yaml
---
name: reviewer            # unique identifier, lowercase-hyphenated
kind: subagent            # subagent | primary
access: read-only         # read-only | read-write
model_tier: default       # fast | default | high   (see preferences/models.md)
description: ...          # what it does AND when to use it
---
<system prompt body>
```

### Command frontmatter

```yaml
---
name: plz-review-loop     # workflow name; the plz- prefix is a personal signature, keep it
description: ...
args: true                # whether the command takes user arguments
---
<prompt body, may reference other workflows by name>
```

The `plz-` prefix on every command is intentional and personal ("plz fix",
"plz ship"). Keep it across tools — it's part of the identity, and it also lets
typing `/plz` surface the whole set. Only drop it if a target tool genuinely
can't handle the prefix.

### Skill

A folder `skills/<name>/SKILL.md` with frontmatter `name` + `description` and a
markdown body. Skills are already close to portable.

## Model tiers

`model_tier` resolves via `preferences/models.md`. A tool config either pins the
concrete model for that tier or, when the tier equals the tool's default, leaves
the model unset so it inherits. See that file for the current tier→model choices.

---

## Target: opencode

- **Global config dir:** `~/.config/opencode/`
- **Agents:** `agents/<name>.md`. Frontmatter:
  - `kind: subagent` → `mode: subagent`; `kind: primary` → `mode: primary`
  - `access: read-only` → `permission: { edit: deny }` (add `webfetch: deny`
    unless the agent needs the web; `bash` stays allowed for read-only inspection)
  - `access: read-write` → omit edit denial
  - `model_tier` → `model:` with the concrete model from `models.md`, or omit to
    inherit when the tier is the default
  - keep `description`; the prompt body becomes the agent body (no `prompt:` key)
  - add `temperature` low (~0.1–0.3) for review/security/analysis agents
- **Skills:** `skills/<name>/SKILL.md` (verbatim).
- **Commands:** `commands/<name>.md`, keeping the `plz-` name as-is (invoked
  `/plz-ship`, `/plz-review-loop`, …). Frontmatter `description`; body verbatim.
  Argument placeholders `$ARGUMENTS` / `$1`, shell injection `` !`cmd` ``, and
  `@file` references are all supported. Body references like "the plz-ship
  workflow" render as the slash command `/plz-ship`.
- **Global rules:** `preferences/working-rules.md` → `~/.config/opencode/AGENTS.md`.
- **Built-in read-only recon:** opencode ships `explore` (local) and `scout`
  (dependency/upstream); reference those instead of creating a recon agent.

## Target: Claude Code

- **Config dir:** `~/.claude/` (user scope) or `.claude/` (project scope).
- **Agents (subagents):** `~/.claude/agents/<name>.md`. Frontmatter:
  - `name`, `description` kept as-is
  - `access: read-only` → restrict `tools` to read/search/run-only tools (e.g.
    `Read, Grep, Glob, Bash`); omit `Edit`/`Write`
  - `access: read-write` → include `Edit, Write`
  - `model_tier` → `model:` with the concrete model from `models.md` (or omit to
    inherit the session model)
  - the prompt body becomes the subagent system prompt
  - `kind: primary` has no direct equivalent; represent as a normal subagent or
    an output-style/role prompt
- **Skills:** `~/.claude/skills/<name>/SKILL.md` (verbatim; Claude Code skills
  use the same shape).
- **Commands:** `~/.claude/commands/<name>.md`, keeping the `plz-` name.
  `$ARGUMENTS`, `$1`, `` !`cmd` `` and `@file` are supported.
- **Global rules:** `preferences/working-rules.md` → `~/.claude/CLAUDE.md`.
- **Parallelism:** Claude Code spawns subagents via the Task tool, one level
  deep, same single-writer discipline as the neutral source assumes.

## Target: generic agent CLI

For any other runtime:
- Treat each `agents/*.md` as a role/system-prompt with a read-only or
  read-write capability flag and a model tier.
- Treat each `commands/*.md` as a reusable prompt template; map the argument
  placeholders to whatever the tool supports, or inline the request.
- Treat `skills/*/SKILL.md` as context to inject when its trigger matches.
- Apply `preferences/working-rules.md` as always-on system guidance and
  `preferences/models.md` to choose models by capability tier.
- Preserve the core invariants: single writer, read-only reviewers/advisors,
  match orchestration effort to risk.
