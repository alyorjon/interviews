window.STATE =
{
  "slug": "interviews-modernization",
  "title": "Interview Study Portal modernizatsiyasi",
  "mode": "semi",
  "depth": "normal",
  "polish": {
    "reference": "reference.md",
    "startedAt": "2026-09-12T18:39:30+05:00",
    "baseCommit": "c868c49",
    "rounds": [
      { "n": 1, "found": 3, "accepted": 3, "tickets": ["P03A", "P03B"], "finishedAt": "2026-09-12T19:47:52+05:00", "fixed": ["90 frontend template cards rewritten", "cross-contaminated question context removed", "professional topic labels"] },
      { "n": 2, "found": 1, "accepted": 1, "tickets": ["P01"], "finishedAt": "2026-09-12T20:12:53+05:00", "fixed": ["360px page hero score badge overflow removed"] },
      { "n": 3, "found": 0, "accepted": 0, "tickets": [], "finishedAt": "2026-09-12T20:12:53+05:00", "fixed": [] }
    ],
    "stoppedBy": "dry"
  },
  "tier": "T2",
  "briefFile": "2026-09-12-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "/Users/abrorjonallaberganov/.agents/skills/autopilot",
  "startedAt": "2026-09-12T15:15:05+05:00",
  "updatedAt": "2026-09-12T20:12:53+05:00",
  "finishedAt": "2026-09-12T20:12:53+05:00",
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-09-12T15:15:05+05:00", "finishedAt": "2026-09-12T15:18:00+05:00" },
    { "id": "manifest", "status": "done", "startedAt": "2026-09-12T15:18:00+05:00", "finishedAt": "2026-09-12T15:24:00+05:00" },
    { "id": "briefing", "status": "done", "startedAt": "2026-09-12T15:24:00+05:00", "finishedAt": "2026-09-12T15:26:00+05:00", "note": "Alyorjons-Mini target confirmed; default hostname assumption recorded" },
    { "id": "spec", "status": "done", "startedAt": "2026-09-12T15:26:00+05:00", "finishedAt": "2026-09-12T15:28:03+05:00" },
    { "id": "plan", "status": "done", "startedAt": "2026-09-12T15:28:03+05:00", "finishedAt": "2026-09-12T15:28:03+05:00", "note": "7 tasks, T2; final hardening added from deferred-findings triage" },
    { "id": "build", "status": "done", "startedAt": "2026-09-12T15:28:03+05:00", "finishedAt": "2026-09-12T20:12:53+05:00", "note": "practical content, parser, labels and 360px overflow polish complete" },
    { "id": "review", "status": "done", "startedAt": "2026-09-12T15:39:33+05:00", "finishedAt": "2026-09-12T20:12:53+05:00", "note": "57 automated tests and real Chrome matrix passed" },
    { "id": "final", "status": "done", "startedAt": "2026-09-12T18:29:52+05:00", "finishedAt": "2026-09-12T20:12:53+05:00", "note": "polish stopped dry after round 3" }
  ],
  "requirements": { "total": 22, "done": 22, "inTicket": 0, "inSpec": 0, "placeholder": 0, "deferred": 0, "dropped": 0 },
  "tickets": [
    { "id": "01", "title": "Kontent katalogi va sifat auditi", "requirements": ["R01", "R03", "R04", "R07", "R08"], "blockedBy": [], "wave": 1, "zone": ["packages/content/", "content-audit/"], "status": "done", "startedAt": "2026-09-12T15:28:03+05:00", "finishedAt": "2026-09-12T15:57:41+05:00", "retries": 0, "repairs": 2, "repairFindings": ["R08 actual enrichment was largely repetition/generic metadata", "fingerprint could merge distinct lexical questions", "missing-answer cards were incorrectly marked sourceGrounded", "prior sibling question was used as current question context", "one-fragment real answers were discarded as ungrounded"], "handoffs": 0, "files": ["packages/content/", "content-audit/", "package.json", "package-lock.json", "tsconfig.json"], "tests": { "passed": 12, "failed": 0 }, "commit": "f9823e0", "concerns": ["7 semantically empty answers need an additional source"] },
    { "id": "02", "title": "NestJS API va Telegram bot", "requirements": ["R06", "R10", "R15i"], "blockedBy": ["01"], "wave": 2, "zone": ["apps/api/"], "status": "done", "startedAt": "2026-09-12T15:57:41+05:00", "finishedAt": "2026-09-12T16:16:41+05:00", "retries": 0, "repairs": 1, "repairFindings": ["clean install missing API dependencies in package-lock", "permanent Telegram 4xx did not safe-off"], "handoffs": 0, "files": ["apps/api/", "package-lock.json"], "tests": { "passed": 12, "failed": 0 }, "commit": "09e65c3", "concerns": ["cache test couples to internal identity", "npm audit reports 5 dependency vulnerabilities"] },
    { "id": "03", "title": "React/Vite professional portal", "requirements": ["R01", "R02", "R03", "R04", "R05", "R06", "R08", "R09"], "blockedBy": ["01"], "wave": 2, "zone": ["apps/web/"], "status": "done", "startedAt": "2026-09-12T15:57:41+05:00", "finishedAt": "2026-09-12T16:29:57+05:00", "retries": 0, "repairs": 1, "repairFindings": ["ordinary Markdown article content was not rendered", "pages after the fourth per topic were unreachable", "responsive test did not measure rendered 360px overflow"], "handoffs": 0, "files": ["apps/web/"], "tests": { "passed": 8, "failed": 0 }, "commit": "c00eb92", "concerns": ["jsdom test cannot independently measure real CSS layout", "drawer focus does not move into drawer"] },
    { "id": "03A", "title": "Telegram allowlist va Mini App auth", "requirements": ["G01", "G02", "G03", "R10", "R15i"], "blockedBy": ["02", "03"], "wave": 3, "zone": ["apps/api/", "apps/web/", "package-lock.json"], "status": "done", "startedAt": "2026-09-12T16:29:57+05:00", "finishedAt": "2026-09-12T16:53:44+05:00", "retries": 0, "repairs": 1, "repairFindings": ["transient startup notification failure could result in no owner notification"], "handoffs": 0, "files": ["apps/api/", "apps/web/"], "tests": { "passed": 35, "failed": 0 }, "commit": "a1385ba", "concerns": ["explicit ApiOptions authBypass false override is not separately tested"] },
    { "id": "04", "title": "Docker runtime va runbook", "requirements": ["R06", "R10", "R11", "R12", "D01"], "blockedBy": ["02", "03", "03A"], "wave": 4, "zone": ["runtime/", "packages/content/discovery"], "status": "done", "startedAt": "2026-09-12T16:53:44+05:00", "finishedAt": "2026-09-12T17:19:27+05:00", "retries": 0, "repairs": 1, "repairFindings": ["production image returned 404 for SPA deep links"], "handoffs": 0, "files": ["Dockerfile", "compose.yaml", ".dockerignore", ".env.example", "scripts/runtime/", "docs/operations/", "packages/content/"], "tests": { "passed": 38, "failed": 0 }, "commit": "6481033", "concerns": ["node:22-alpine base image is mutable", "compose and shell-script invariants lack executable tests"] },
    { "id": "06", "title": "Yakuniy xavfsizlik va accessibility hardening", "requirements": ["R02", "R09"], "blockedBy": ["04"], "wave": 5, "zone": ["dependency-lock", "apps/api/", "apps/web/", "Dockerfile"], "status": "done", "startedAt": "2026-09-12T17:19:27+05:00", "finishedAt": "2026-09-12T17:44:20+05:00", "retries": 0, "repairs": 1, "repairFindings": ["root npm test skipped web tests", "aria-modal drawer did not trap keyboard focus"], "handoffs": 0, "files": ["package.json", "package-lock.json", "apps/web/", "Dockerfile", ".autopilot/interviews-modernization/interfaces.md"], "tests": { "passed": 49, "failed": 0 }, "commit": "b67d2b2", "concerns": [] },
    { "id": "05", "title": "Alyorjons-Mini rsync va real qabul", "requirements": ["R11", "R12", "R13", "R14", "R15i", "G01", "G02"], "blockedBy": ["04", "06"], "wave": 6, "zone": ["remote-runtime"], "status": "done", "startedAt": "2026-09-12T17:44:20+05:00", "finishedAt": "2026-09-12T18:29:52+05:00", "retries": 0, "repairs": 1, "repairFindings": ["deployed image returned 404 for SPA deep links", "remote .env mode was 0644", "startup notification lacked a sanitized durable marker"], "handoffs": 0, "files": ["remote source mirror", "remote .env metadata", "Docker runtime", "dedicated Cloudflare tunnel and user LaunchAgent"], "tests": { "passed": 49, "failed": 0 }, "commit": "acf7b95", "concerns": ["real Telegram device /start button click remains user-visible acceptance", "remote Docker registry pull needs interactive Keychain; reviewed image was transferred by checksum-verified docker save/load"] }
    ,{ "id": "P01", "title": "Real Chrome barcha sahifa matritsasi", "requirements": ["R16", "R17"], "blockedBy": ["05"], "wave": 7, "zone": ["real-chrome-qa", "outputs/"], "status": "done", "startedAt": "2026-09-12T18:39:30+05:00", "finishedAt": "2026-09-12T20:12:53+05:00", "retries": 0, "repairs": 1, "repairFindings": ["seven 360px pages overflowed because the page hero flex item and long score label exceeded the viewport"], "handoffs": 0, "tests": { "passed": 110, "failed": 0 }, "commit": "65072bc", "concerns": [] }
    ,{ "id": "P02", "title": "Full-stack amaliy savollar banki", "requirements": ["R18", "R08", "R07"], "blockedBy": ["01"], "wave": 7, "zone": ["learning-markdown", "content-audit"], "status": "done", "startedAt": "2026-09-12T18:39:30+05:00", "finishedAt": "2026-09-12T19:47:52+05:00", "retries": 0, "repairs": 1, "repairFindings": ["three concurrency remedies cited adjacent framework pages instead of the central database primitive"], "handoffs": 0, "tests": { "passed": 57, "failed": 0 }, "commit": "691325b", "concerns": [] }
    ,{ "id": "P03A", "title": "Frontend shablon savollarini amaliy qayta yozish", "requirements": ["R17", "R18", "R08", "R07"], "blockedBy": ["P02"], "wave": 8, "zone": ["javascript/frontend-react-next.md", "content-audit"], "status": "done", "startedAt": "2026-09-12T18:59:05+05:00", "finishedAt": "2026-09-12T19:47:52+05:00", "retries": 0, "repairs": 2, "repairFindings": ["nine semantic overlaps with P02 and three citation-to-claim mismatches", "Q66 retained unsupported UI claims"], "handoffs": 0, "tests": { "passed": 57, "failed": 0 }, "commit": "ddf39fd", "concerns": [] }
    ,{ "id": "P03B", "title": "Kontekst grounding va topic label sayqali", "requirements": ["R17", "R08", "R02"], "blockedBy": ["P02"], "wave": 8, "zone": ["packages/content/", "apps/web/"], "status": "done", "startedAt": "2026-09-12T18:59:05+05:00", "finishedAt": "2026-09-12T19:47:52+05:00", "retries": 0, "repairs": 3, "repairFindings": ["useful nearest section contexts regressed and tilde fences were parsed", "declarative sibling headings could bypass relevance", "slash/pipe formatting bypassed lexical relevance"], "handoffs": 0, "tests": { "passed": 57, "failed": 0 }, "commit": "d31d1ba", "concerns": [] }
  ],
  "singlePass": null,
  "tests": { "passed": 57, "failed": 0, "build": "passed", "productionAuditVulnerabilities": 0, "contentAuditNeedsSource": 0, "realChromeDesktopPages": 55, "realChromeMobilePages": 55, "consoleWarningsErrors": 0, "publicHealth": 200, "publicDeepLink": 200, "unauthenticatedCatalog": 401 },
  "debt": { "placeholders": [], "assumptions": ["PUBLIC_HOSTNAME=interviews.4ontak.uz was selected because the existing Cloudflare zone is 4ontak.uz"], "emptyEnv": [], "userAcceptance": ["Telegramda /start bosib inline Web App tugmasini ko'rish va Mini Appni real qurilmada ochish"] },
  "additions": [],
  "coverage": { "found": 5, "fixed": 5, "deferred": 0, "items": ["exact remote path", "all page preservation", "question and answer text enrichment", "rsync direction", "per-page design review score"] },
  "concerns": ["FIXED P02: seven semantically empty source answers now have primary sources", "DROP: internal CatalogStore identity assertion is test implementation detail", "FIXED T06: production npm audit is zero via scoped Multer override", "FIXED P01: all 55 pages have zero 360px document overflow", "FIXED T06: modal drawer moves, traps, and restores focus", "FIXED T06: Node base image is pinned by multi-platform digest", "REPORT: compose/service/DNS idempotency is verified operationally in T05 rather than by a full executable harness"],
  "reviewers": { "manifestSpec": "/root/manifest_reviewer", "craft": "/root/craft_reviewer" },
  "blind": {
    "verdict": "partial",
    "checkedAt": "2026-09-12T20:12:53+05:00",
    "implemented": 15,
    "partial": 2,
    "notImplemented": 0,
    "drift": [
      "R13: historical initial rsync command was not independently observable, though the temporary mirror and original corpus exist",
      "G01: Telegram API delivery is proven, but message viewing is device-only",
      "G03: inline Web App behavior is synthetic-tested; real Telegram device click remains user acceptance"
    ]
  }
}
