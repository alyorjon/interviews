import assert from "node:assert/strict";
import { test } from "node:test";

import { parseTelegramUserId } from "../src/telegram-user-id.js";

test("Telegram user IDs accept only canonical positive safe integers", () => {
  assert.equal(parseTelegramUserId("70001"), 70001);
  for (const malformed of [undefined, null, "", "0", "-1", "1.5", "01", " 1", "9007199254740992", 70001]) {
    assert.equal(parseTelegramUserId(malformed), undefined);
  }
});
