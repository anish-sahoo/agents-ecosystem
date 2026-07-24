# cmux-config — agent notifications via cmux

Example of wiring an AI coding agent to **cmux** for:

- Native notifications when a task is ready, errors, or needs input
- Session status in the cmux UI (busy spinner, needs input, error, idle)
- Desktop notification fallback when not running inside cmux

## This example is for opencode

The plugin shape, event names (`session.idle`, `permission.asked`, …), and
`@opencode-ai/plugin` hooks are **opencode-specific**.

Other agent runtimes (Claude Code, Codex, Cursor, custom CLIs, …) should treat
this as a **reference implementation**: keep the cmux CLI contract and the
notify philosophy, but re-bind detection and events to your tool's extension
model.

## cmux CLI contract

When the agent is inside a cmux workspace (or has an allow-all socket), these
commands are available:

```text
cmux notify --title <title> [--subtitle <sub>] --body <body>
cmux set-status <key> <text>
cmux clear-status <key>
```

Detection uses environment variables set by cmux:

| Variable            | Role                                      |
| ------------------- | ----------------------------------------- |
| `CMUX_WORKSPACE_ID` | Inside a cmux workspace → enable workflow |
| `CMUX_SOCKET_PATH`  | Socket for external control               |
| `CMUX_SOCKET_MODE`  | Must be `allowall` if using socket only   |
| `CMUX_SURFACE_ID`   | Optional surface id                       |

The plugin only runs `cmux` if the binary resolves to a **trusted absolute
path** (not under cwd or temp).

## Philosophy

> Notify the human when the AI needs them back, not for every micro-event.

Default triggers:

- Session idle / ready for review (parent sessions only)
- Session error
- Permission / question needing human input

Suppress when the terminal is focused (macOS) or during optional quiet hours.

## Layout (opencode)

```text
cmux-config/
├── README.md                 # this file
├── package.json              # plugin deps for opencode
├── notify.config.example.json
└── plugins/
    ├── notify.ts             # main opencode plugin
    ├── notify/               # notify helpers
    │   ├── backend.ts
    │   ├── cmux.ts
    │   ├── status.ts
    │   └── title.ts
    └── primitives/           # small shared utilities
        ├── cmux.ts
        ├── types.ts
        └── with-timeout.ts
```

### Install into opencode (example)

1. Copy `plugins/` into your opencode config dir (e.g. `~/.config/opencode/plugins/`
   or a project `.opencode/plugins/`).
2. Install deps (`@opencode-ai/plugin`, `detect-terminal`, `node-notifier`;
   macOS desktop fallback also wants `alerter` on PATH).
3. Register the plugin in `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["./plugins/notify.ts"]
}
```

4. Optional config file (see `notify.config.example.json`):

```text
~/.config/opencode/notify.json
```

5. Restart opencode. Run a session **inside cmux** to exercise native notify +
   status; outside cmux you get desktop notifications only.

## Adapting for other agents

1. **Keep** `primitives/cmux.ts` and `notify/cmux.ts` (CLI + trust + timeouts).
2. **Replace** the opencode `Plugin` export and event switch in `notify.ts`
   with your runtime's hooks (e.g. stop hooks, MCP, subprocess wrapper).
3. **Map** your lifecycle to the same logical states used in `notify/status.ts`:
   `animated-busy` | `needs-input` | `error` | `idle`.
4. **Rename** status key prefix (`opencode.session.<id>` here) to your agent.
5. **Drop or reimplement** OSC title / focus detection if your host already
   owns the terminal title or focus model.

## Non-goals

- No cloud services, webhooks, or vendor-specific backends — local `cmux` CLI
  and OS desktop notifications only.
- Not a full agent framework; only the notification / status slice.
