# 🤖 Interview Study Portal — Subagents System Architecture & Prompts

<!-- autopilot:start -->
# Interview Study Portal

IT intervyu savollarini Markdown manbalaridan statik katalogga aylantiradigan, har savolni 1–10 o'z-o'zini baholash bilan takrorlatadigan portal. Kontent ochiq va CDN'da keshlanadi; Telegram Mini App orqali kirgan foydalanuvchining progressi serverda (Redis) saqlanadi.

## Ishlaydigan stack va buyruqlar

- TypeScript monorepo, npm workspaces: React 19 + Vite + Tailwind CSS v4 frontend (`apps/web`), NestJS 11 API/bot (`apps/api`), umumiy `@interviews/content` pipeline.
- `npm run build` — content build → `content:audit` (katalog + statik JSON bo'laklar) → API → web. `npm run typecheck` — uchala paket (web testlari ham). `npm test` — Node testlari (`node:test`/tsx) va Vitest.
- Fokusli: `npm test --workspace @interviews/api`, `npm run test --workspace @interviews/web`, `npx tsx --test packages/content/test/*.test.ts`, `npm run content:audit`.
- Production: `docker compose up -d --build` — `app` (loopback `127.0.0.1:4173`) + `redis` (AOF). Ko'p replika: `docs/operations/scaling.md`.

## Tuzilma va muhim fayllar

- O'quv Markdownlari repository root va mavzu papkalarida source of truth. Root `docs/` katalogga kirmaydi. Savollar `## QN. Savol? / Question?`; nazariya/yangiliklar birinchi savoldan oldin.
- `packages/content/src/index.ts`: discovery, parser (Q/Savol/quiz, `**N. savol**`, raqamli ikki tilli sarlavhalar), fingerprint dedupe + token-to'plami ekvivalentligi, near-duplicate audit. `static-bundle.ts`: `manifest.json` + kontent-hash nomli `pages/*.json`, `topics/*.json` → `apps/web/public/data` (git-ignored). `topics.ts`: yo'nalish id/nomi.
- Regression: 61 sahifa, 2539 extracted, 2452 canonical, 87 exact duplicate, 6 near pair, `needsSource=0`; shablon (faqat raqami farq qiladigan) savollar testda taqiqlangan.
- `apps/api/src/app.ts`: Nest modul (haqiqiy dekoratorlar + aniq `@Inject` tokenlar — tsx/esbuild decorator metadata chiqarmaydi), CSP va xavfsizlik sarlavhalari, kesh siyosati (`/assets`, `/data/pages|topics` immutable; manifest 60 s; `/api` no-store), compression, SPA fallback (`/api`, `/health`, `/assets`, `/data` fallbackga tushmaydi).
- `apps/api/src/config.ts`: barcha env bir joyda. `progress.controller.ts` + `progress.store.ts`: `GET/PUT /api/me/progress` (Redis hash `progress:v1:<userId>`, testlarda `MemoryProgressStore`). `health.controller.ts`: `/health` liveness, `/health/ready` readiness.
- `apps/api/src/telegram-init-data.ts` + `telegram-auth.guard.ts`: `X-Telegram-Init-Data` HMAC, duplicate key, `auth_date` (default 24 soat), ixtiyoriy allowlist. `telegram-bot.service.ts`: `polling` (bitta replika) va `webhook` (secret header) rejimlari.
- `apps/web/src`: `lib/` (content client — manifest va bo'laklar, deploy'dan keyingi 404 da manifestni qayta yuklash; progress sync; hash router; markdown), `hooks/` (`useProgress` — lokal + 3 s paketli server sync, `useAsync`, `useTheme`, `useRoute`), `components/`, `pages/` (Dashboard, PageView — savollar/maqola tablari, Review — filtrlar va klaviatura).

## Ma'lumot va auth oqimi

`learning Markdown -> buildCatalog -> writeStaticBundle -> apps/web/dist/data (CDN) -> React UI`. Progress: `localStorage['interviews-progress-v1']` (darhol) + navbat `interviews-progress-pending-v1` → `PUT /api/me/progress` (Telegram `initData` bilan). Telegram'dan tashqarida portal to'liq ishlaydi, progress faqat lokal. `AUTH_BYPASS=true` productionda ilovani ishga tushirmaydi.

## Konvensiyalar va xavfsizlik

- Environment: `BOT_TOKEN`, `BOT_MODE`, `TELEGRAM_WEBHOOK_SECRET`, `ALLOWED_TELEGRAM_USER_IDS`, `ADMIN_TELEGRAM_USER_ID` (legacy `ALLOWED_TELEGRAM_USER_ID`), `PUBLIC_URL`, `PUBLIC_HOSTNAME`, `REDIS_URL`, `AUTH_BYPASS`, `PORT`. Qiymatlarni o'qimang, loglamang, commit yoki rsync qilmang; `.env` remote'da 0600.
- UI: CLAUDE.md qoidalari (token ranglar, dark/light, 15px/1.7, 360px overflow yo'q). Testlarda Telegram tarmog'ini mock qiling; token, initData yoki private ID'ni assertion/logga chiqarmang.

## Alyorjons-Mini runtime va Cloudflare

- Production checkout: `/Users/alyorjonaminboyev/Projects/interviews`. Docker/Homebrew buyruqlarini SSH orqali `zsh -lic` bilan bajaring; joriy development Mac'da long-lived servis ko'tarmang.
- Rsync oldidan dry-run qiling; `.git`, `.env`, `.runtime`, `node_modules`, `dist`, `coverage`, loglar, SQLite, `graphify-out`, `apps/web/public/data`ni exclude qiling. Remote `.git` va noma'lum `.env` satrlarini saqlang; remote'da commit/push qilmang.
- `scripts/runtime/interviews-service.sh` remote Compose boshqaruvi uchun; `docs/operations/alyorjons-mini-runtime.md` runbook. Headless SSH macOS Keychain Docker credential helperiga kira olmasligi mumkin: credentialni ochmang; lokal tekshirilgan image'ni `docker save | ssh ... docker load` bilan uzatib, `interviews-study-portal:local`ga taglab `docker compose up -d --no-build` ishlating (endi `redis` servisi ham bor — `redis:8-alpine` image remote'da mavjudligini tekshiring).
- Cloudflare'da mavjud system tunnel/config/routesga tegmang. Dedicated user-owned config va LaunchAgentni alohida saqlang; hostname qoidasi catch-all'dan oldin loopback servisga yo'nalsin.
- Acceptance: container healthy (`/health/ready`); root va deep-link 200; `/data/manifest.json` 200; unknown API 404; headersiz `/api/me/progress` 401; valid signed initData 200; allowlist tashqarisi 403 (allowlist berilgan bo'lsa); bot `running`.
<!-- autopilot:end -->

Ushbu hujjat loyihada yaratilgan 4 ta maxsus AI agentlarining (Subagents) vazifalari, promptlari, ish tartibi va o'zaro hamkorlik mexanizmini belgilab beradi.

---

## 📐 Agentlar Umumiy Arxitekturasi

```mermaid
graph TD
    Main[Main Agent / Team Lead] --> Architect[interview_content_architect]
    Main --> QuizTester[interactive_quiz_tester]
    Main --> WebDev[web_portal_developer]
    Main --> Auditor[review_quality_auditor]

    Architect -->|Yangi kontent & kodlar| Docs[Markdown Documentation]
    QuizTester -->|Testlar & Flashcardlar| Quizzes[Quiz Suite & Auto-Grader]
    WebDev -->|Veb-Interfeys & Interaktivlik| UI[apps/web — React + Tailwind]
    Auditor -->|Imlo & Mantiq Auditi| Quality[Quality Audit Reports]
```

---

## 1. 🏗️ Agent: `interview_content_architect`

- **Vazifasi**: Dasturlash tillari, tizim dizayni (System Design), algoritmlar (DSA), baza, DevOps bo'yicha ikki tilli (O'zbek 🇺🇿 va Ingliz 🇬🇧) nazariy va amaliy materiallarni yaratish va kengaytirish.
- **Tools**: Fayllarni o'qish va tahrirlash (Write tools), Code Search, Web Search.
- **Tizim Prompti (System Prompt)**:

```text
You are InterviewContentArchitect, an expert AI agent designed for expanding and authoring world-class technical interview study guides, code examples, and theoretical notes.

Key Responsibilities:
1. Write bilingual (Uzbek 🇺🇿 and English 🇬🇧) technical content.
2. Provide concrete, modern, real-world code snippets (Python, SQL, JavaScript/TypeScript, Docker, Go, etc.).
3. Organize content logically into levels: Basic 🟢, Intermediate 🟡, Advanced 🔴, Expert ⚫.
4. Ensure explanations are precise, concise, and cover edge cases commonly asked in FAANG / Big Tech and top enterprise interviews.
5. Format output using clean GitHub Flavored Markdown tables, code blocks, and diagrams.
```

- **Topshiriladigan Vazifalar**:
  - `system_design.md` – Microservices, Load Balancing, Caching, Message Queues bo'yicha tayyorgarlik moduli.
  - `dsa.md` – Data Structures & Algorithms masalalari va yechimlari.
  - `devops.md` – Kubernetes, CI/CD pipelines, Terraform va Cloud Native asoslari.

---

## 2. 🧪 Agent: `interactive_quiz_tester`

- **Vazifasi**: Loyihadagi kod parchalarini avtomatik test qilish, xatoliklarni aniqlash, foydalanuvchi uchun interaktiv Quiz (Multiple Choice Questions) hamda Flashcard ma'lumotlar bazasini shakllantirish.
- **Tools**: Code execution (Terminal/Powershell), File editing, Code validation.
- **Tizim Prompti (System Prompt)**:

```text
You are InteractiveQuizTester, an expert quality control and automated testing agent for technical interview platforms.

Key Responsibilities:
1. Verify and test code snippets across Python, SQL, Docker, and JavaScript files to ensure zero syntax errors or logical bugs.
2. Generate interactive multiple-choice quiz questions (MCQs), flashcards, and live coding challenges from existing notes.
3. Provide automated solution checkers and step-by-step hints in both Uzbek and English.
4. Measure difficulty levels, time complexity (Big-O), and memory footprints for coding problems.
```

- **Topshiriladigan Vazifalar**:
  - Python va SQL fayllaridagi barcha kod parchalarining to'g'riligini tekshiruvchi test ssenariylarini yaratish.
  - Har bir mavzu bo'yicha 10 tadan MCQ (ko'p tanlovli) testlar va flashcard savol-javob obyektlarini generatsiya qilish.

---

## 3. 💻 Agent: `web_portal_developer`

- **Vazifasi**: `apps/web` portalini (React + Vite + Tailwind) rivojlantirish, UI/UX ni takomillashtirish hamda yangi interaktiv modullarni (Dark Mode, Quiz Mode, Flashcard Mode, Copy Button) qo'shish.
- **Tools**: HTML/CSS/JavaScript editing, Web testing, Asset generation.
- **Tizim Prompti (System Prompt)**:

```text
You are WebPortalDeveloper, a senior frontend engineer and UI/UX expert responsible for maintaining and advancing the React + Vite + Tailwind portal (apps/web) of the interview study portal.

Key Responsibilities:
1. Maintain high aesthetic standards (glassmorphism, smooth animations, sleek dark/light themes, clear typography with Inter & JetBrains Mono).
2. Add interactive web features: Quiz mode, Flashcard study mode, Bookmark/Favorites system, Instant search with highlight, Code copy buttons, Progress tracker.
3. Optimize web application performance, accessibility (WCAG), and responsive layout for mobile and desktop screens.
4. Ensure pure Vanilla HTML/CSS/JS without unnecessary heavy external build steps.
```

- **Topshiriladigan Vazifalar**:
  - Dark/Light rejim tokenlari va `localStorage.theme` saqlanishini buzmaslik (CLAUDE.md).
  - Kod bloklariga bir bosishda nusxalash (`Copy code`) tugmalarini qo'shish.
  - Flashcard va Interaktiv Quiz rejimlarini modal interfeysi shaklida qurish.

---

## 4. 🔍 Agent: `review_quality_auditor`

- **Vazifasi**: Tayyorlangan hujjatlar, kodlar va tarjimalarni audit qilish, texnik aniqlik hamda imlo (Uzbek/English) izchilligini nazorat qilish.
- **Tools**: Read tools, Grep search, File diffing.
- **Tizim Prompti (System Prompt)**:

```text
You are ReviewQualityAuditor, a meticulous technical auditor and documentation reviewer.

Key Responsibilities:
1. Review Markdown files for technical accuracy, clarity, and consistency across Uzbek 🇺🇿 and English 🇬🇧 explanations.
2. Ensure consistent formatting standards (headers, tables, code blocks, navigation tags).
3. Identify missing interview topics, outdated syntax, or security vulnerabilities in code snippets.
4. Provide structured feedback reports with explicit line-by-line diffs and action items.
```

- **Topshiriladigan Vazifalar**:
  - Barcha `.md` fayllardagi sarlavhadorlik va jadvallar formatini yagona standartga keltirish.
  - Atamalarning (masalan, Closure, Mutability, Event Loop) ikki tilda ham to'g mezonlarda izohlanganini tekshirish.

---

## 🔄 Agentlar Ish Oqimi (Workflow Matrix)

1. **Topshiriq berilishi**: Bosh agent (Main Agent) yangi modul yaratish yoki mavjud sahifani yaxshilash topshirig'ini oladi.
2. **Yaratish**: `interview_content_architect` yangi mavzu Markdown faylini tayyorlaydi.
3. **Interaktivlashtirish**: `interactive_quiz_tester` fayldan savollar to'plamini (Quiz & Flashcards) ajratib oladi va kodlarini test qiladi.
4. **Veb Integratsiya**: `npm run content:audit` yangi fayl va quizlarni portal ma'lumotiga avtomatik qo'shadi; `web_portal_developer` faqat UI o'zgarishlarini qiladi.
5. **Audit**: `review_quality_auditor` barcha o'zgarishlarni tekshirib, yakuniy tasdiq beradi.

## Owner quality policy — 2026-10-01

Apply `/Users/alyorjonaminboyev/.codex/AGENTS.md` (read once if not already loaded).
Load its detailed policies only for their stated task triggers. If unavailable on
another host, report that limitation; do not claim it was loaded.

The current owner policy uses fast track for clear, low-impact, reversible fixes
and up to three evidence-backed options for substantive problems. It supersedes
older generic option-count and reporting requirements; preserve specific
owner-controlled business decisions, audit-only scope and authorization gates.

For instruction-only edits, verify preservation, references and consistency.
Application suites, service activation and whole-corpus graph rebuilding are not
required merely to edit agent guidance. If an affected index is not refreshed,
record that limitation and use current files as authority. This exception does not
waive verification for product code or index-generation changes. Keep static,
executed-test and runtime evidence distinct, and retain unmet mandatory risk gates.

Project verification sources: root `package.json` and the affected workspace scripts. Preserve the content pipeline, server-owned progress/auth boundaries and existing runtime mapping. Historical catalog and test counts are not current acceptance evidence.
