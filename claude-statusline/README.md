# Claude Code statusline

One-line statusline for Claude Code. Left to right:

- context window bar (green up to 50%, yellow to 70%, red past that)
- git branch with flags (`✘` deleted, `!` modified, `+` staged, `?` untracked,
  `⇡`/`⇣` ahead/behind) and `MERGING`/`REBASING` state
- lines added/removed this session
- model name
- node/go version when the project has `package.json`/`go.mod`, plus the active
  Python venv
- session cost (green under $10, yellow to $20, red above)

## Requirements

- `jq`
- A Nerd Font in your terminal for the branch and robot icons (I use JetBrains
  Mono Nerd Font). Without one they render as boxes.

## Install

```sh
cp statusline-command.sh ~/.claude/statusline-command.sh
```

Then add this to `~/.claude/settings.json`:

```json
"statusLine": {
  "type": "command",
  "command": "sh ~/.claude/statusline-command.sh"
}
```

## Test it

```sh
echo '{"model":{"display_name":"Opus"},"cost":{"total_cost_usd":1.23,"total_lines_added":10,"total_lines_removed":2},"context_window":{"used_percentage":42},"workspace":{"project_dir":"'"$PWD"'"}}' \
  | sh ~/.claude/statusline-command.sh
```
