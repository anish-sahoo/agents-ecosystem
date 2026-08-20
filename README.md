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
│   ├── humanizer/       # strip AI-slop from user-facing writing
│   ├── ask-questions-if-underspecified/  # clarify requirements before implementing
│   └── orchestrator/    # when and how to delegate to subagents
├── commands/            # workflow command prompts (neutral name + prompt)
│   └── plz-grill-me.md  # interview until shared understanding (design-tree grilling)
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

## Credits

Parts of this setup are adapted from open-source agent skills. Vendored skills
keep their own license and source in the frontmatter; ideas folded into agents
or rules are credited here.

**Vendored skills**
- `skills/humanizer/` — [blader/humanizer](https://github.com/blader/humanizer)
  (MIT), v2.9.1, plus Cursor `unslop` patterns (colon overuse, metaphor jargon,
  feeling-instead-of-mechanism, dense sentences, adverbs, plain-word swaps).
  Always-on pass for user-facing writing.
- `skills/ask-questions-if-underspecified/` —
  [trailofbits/skills](https://github.com/trailofbits/skills)
  (CC-BY-SA-4.0). Clarify requirements before implementing.

**Concepts folded in**
- `commands/plz-grill-me.md` — design-tree grilling adapted from
  [mattpocock/skills](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md)
  (`grilling`). Format block dropped; the agent handles presentation.
- `agents/reviewer.md` — review categories, confidence calibration, and
  pre-emit verification gate adapted from
  [garrytan/gstack](https://github.com/garrytan/gstack) (MIT), the `/review`
  skill.
- `agents/security-auditor.md` — L1–L4 trust-level data classification and
  trace-the-data-flow discipline adapted from
  [tanviet12/vbsec](https://github.com/tanviet12/vbsec) (MIT).

**Evaluated but not vendored** (shaped the choices above)
- [obra/superpowers](https://github.com/obra/superpowers) (MIT) — interview-first
  and plan-review discipline; superseded by the existing `plz-ship`/`plz-plan-feature`
  gates and the `ask-questions-if-underspecified` skill.
- [pronoy1004/debug-skills](https://github.com/pronoy1004/debug-skills) (MIT) —
  reproduce-before-edit debugging skills; held for a future `plz-debug` command.
- [leighstillard/boring-version](https://github.com/leighstillard/boring-version) —
  pre-implementation scope cutting.
- [OthmanAdi/pr-perfect](https://github.com/OthmanAdi/pr-perfect) (MIT) — PR
  description style.
- [jzOcb/writing-style-skill](https://github.com/jzOcb/writing-style-skill) —
  self-improving voice capture.
- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)
  (MIT) — the curated index used to source and vet the above.