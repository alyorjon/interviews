import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import path from "node:path";
import test from "node:test";

test("Cloudflare route helper rejects option-like tunnel arguments", async () => {
  const script = path.resolve("scripts/runtime/add-cloudflare-dns-route.sh");
  const result = await new Promise<{ code: number | null; stderr: string }>((resolve) => {
    const child = spawn(script, ["--config"], {
      env: { ...process.env, PUBLIC_HOSTNAME: "interviews.example.com" },
      stdio: ["ignore", "ignore", "pipe"],
    });
    let stderr = "";
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("close", (code) => resolve({ code, stderr }));
  });

  assert.equal(result.code, 2);
  assert.match(result.stderr, /tunnel/i);
});
