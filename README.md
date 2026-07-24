# agents-ecosystem

The canonical, agent-neutral source of truth for my AI coding setup: developer
preferences, model tiers, tooling, specialist agents, skills, and workflow
commands.

This repo is **tool-agnostic**. It does not target any single agent runtime.
Concrete configs for a specific tool (opencode, Claude Code, etc.) are
**generated from** this source using `MAPPING.md` — never the other way around.
Edit here first, then regenerate.

## What's here

```
.
├── README.md            # this file
├── MAPPING.md           # how neutral definitions map to each agent tool
├── preferences/
│   ├── working-rules.md # global rules that apply to every project/session
│   └── models.md        # model tiers and which model fills each
├── tooling.md           # tools and environment I develop with
├── agents/              # specialist subagent definitions (neutral frontmatter + prompt)
├── skills/              # reusable skills (SKILL.md per skill)
├── commands/            # workflow command prompts (neutral name + prompt)
└── cmux-config/         # example: cmux notifications (opencode; adapt for other agents)
```

## Conventions

- **Neutral frontmatter.** Agents and commands use a small, portable frontmatter
  (see `MAPPING.md`) that each target tool translates into its own format.
- **No environment specifics.** Provider wiring, API gateways, credentials, MCP
  server endpoints, and machine-specific config live only in the generated,
  per-tool configs — never in this source.
- **Commands carry the `plz-` prefix.** It's a personal signature ("plz fix",
  "plz ship") and also lets typing `/plz` surface the whole set. Keep it across
  tools.

## Regenerating a tool's config

Point an agent at this repo and `MAPPING.md` and ask it to generate the config
for the target tool (e.g. "generate the opencode global config from
agents-ecosystem"). The mapping defines exactly how each neutral field becomes a
tool-specific field, file location, and naming convention.
