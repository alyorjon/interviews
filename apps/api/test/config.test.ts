import assert from "node:assert/strict";
import { test } from "node:test";

import { resolveConfig } from "../src/config.js";

test("empty Compose variables do not override the legacy allowlist, which may be a list", () => {
  const config = resolveConfig({}, {
    ALLOWED_TELEGRAM_USER_IDS: "",
    ADMIN_TELEGRAM_USER_ID: "",
    ALLOWED_TELEGRAM_USER_ID: "1000000001,1000000002",
    BOT_MODE: "",
    REDIS_URL: "",
  });
  assert.deepEqual([...config.allowedUserIds], [1000000001, 1000000002]);
  assert.equal(config.adminUserId, 1000000001);
  assert.equal(config.botMode, "polling");
  assert.equal(config.redisUrl, "");
});

test("explicit settings win: '*' opens the portal and a separate admin is honoured", () => {
  const config = resolveConfig({}, {
    ALLOWED_TELEGRAM_USER_IDS: "*",
    ADMIN_TELEGRAM_USER_ID: "1000000003",
    ALLOWED_TELEGRAM_USER_ID: "1000000001",
  });
  assert.equal(config.allowedUserIds.size, 0);
  assert.equal(config.adminUserId, 1000000003);
});

test("malformed allowlists fail at startup instead of silently opening access", () => {
  assert.throws(() => resolveConfig({}, { ALLOWED_TELEGRAM_USER_IDS: "12,abc" }), /ALLOWED_TELEGRAM_USER_IDS/);
});
