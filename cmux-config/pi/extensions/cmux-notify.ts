import { execFileSync } from "node:child_process";
import { existsSync, realpathSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { isAbsolute, relative, resolve } from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const statusKey = `pi.session.${process.pid}`;
const trustedRoots = [
  "/Applications/cmux.app/Contents/Resources/bin",
  "/opt/homebrew/bin",
  "/usr/local/bin",
  "/usr/bin",
];

function cmuxPath(): string | undefined {
  const candidates = (process.env.PATH ?? "").split(":").map((dir) => resolve(dir, "cmux"));
  for (const candidate of candidates) {
    try {
      const path = realpathSync(candidate);
      const stat = statSync(path);
      const trusted = trustedRoots.some((root) => path.startsWith(`${root}/`));
      const unsafe = [process.cwd(), tmpdir()].some((dir) => {
        const relativePath = relative(resolve(dir), path);
        return relativePath === "" || (!relativePath.startsWith("..") && !isAbsolute(relativePath));
      });
      if (trusted && !unsafe && stat.isFile() && (stat.mode & 0o111) !== 0) return path;
    } catch {
      continue;
    }
  }
}

function canControlCmux(): boolean {
  return Boolean(process.env.CMUX_WORKSPACE_ID) ||
    (Boolean(process.env.CMUX_SOCKET_PATH) && process.env.CMUX_SOCKET_MODE === "allowall");
}

function runCmux(args: string[]): void {
  const binary = cmuxPath();
  if (!binary || !canControlCmux()) return;
  try {
    execFileSync(binary, args, { stdio: "ignore", timeout: 1500 });
  } catch {
    // cmux may close while the Pi session is ending.
  }
}

export default function (pi: ExtensionAPI) {
  let runErrored = false;

  pi.on("agent_start", () => {
    runErrored = false;
    runCmux(["set-status", statusKey, "⠋ working"]);
  });

  pi.on("agent_end", (event) => {
    const lastAssistant = [...event.messages].reverse().find((message) => message.role === "assistant");
    runErrored = lastAssistant?.stopReason === "error";
  });

  pi.on("agent_settled", () => {
    runCmux(["clear-status", statusKey]);
    const title = runErrored ? "Error" : "Ready for review";
    const body = runErrored ? "Your Pi session ended with an error." : "Your Pi session has finished.";
    runCmux(["notify", "--title", "Pi", "--subtitle", title, "--body", body]);
  });

  pi.on("ui_prompt_start", (event) => {
    runCmux(["set-status", statusKey, "Needs input"]);
    runCmux(["notify", "--title", "Pi", "--subtitle", "Needs input", "--body", event.title ?? "Pi is waiting for your input."]);
  });

  pi.on("ui_prompt_end", () => {
    runCmux(["set-status", statusKey, "⠋ working"]);
  });

  pi.on("session_shutdown", () => {
    runCmux(["clear-status", statusKey]);
  });
}
