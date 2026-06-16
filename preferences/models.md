# Model tiers

Models are chosen by capability tier, not pinned everywhere. An agent or command
declares a `model_tier`; the table below says which model fills it. Where a tier
matches a tool's configured default, leave the model unset so it inherits.

How the model is served (provider, endpoint, credentials) is an environment
detail and is intentionally **not** recorded here — only the model choice by
capability.

| Tier | When to use | Preferred model |
|------|-------------|-----------------|
| `high` | Deep reasoning, oversight, risky/consequential decisions, second opinions | Claude Opus |
| `default` | Everyday medium-to-large coding, review, planning, research | Claude Sonnet |
| `fast` | Cheap, high-volume recon and mechanical passes | Claude Haiku |

## Notes

- These are the portable defaults — the Anthropic tiers are available in most
  environments. Swap in equivalent models per environment if needed; keep the
  tier→capability mapping the same.
- Reserve `high` for things that genuinely benefit from stronger reasoning
  (e.g. the `oracle` and `challenger` agents). Don't default everything to it.
- `default` covers the bulk of work. Most agents inherit it.
- Use the latest available version of each tier's model.
