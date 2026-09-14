# Interfeyslar

## Spetsifikatsiyada hal qilingan chegaralar

| Modul | Egasi | Tashqariga beradi | Ichida yashiradi |
|---|---|---|---|
| `content-pipeline` | Markdown discovery, parsing, score, dedupe | `buildCatalog(root) -> Catalog` | parser adapterlari va fingerprint algoritmi |
| `api` | katalog/health/config HTTP yuzasi | `GET /api/catalog`, `GET /api/pages/:slug`, `GET /health` | fayl joylashuvi va runtime config |
| `bot` | Telegram long polling va Web App menyusi | `startBot(token, publicUrl)`, `stopBot()` | Telegram update offset/retry |
| `web` | navigatsiya, reveal, filter, progress | API response va localStorage orqali UI | layout state va reveal state |
| `runtime` | image, Compose, tunnel/runbook | `docker compose up -d --build` | container build qatlamlari |

Asosiy test choki — `Catalog` kontrakti.

## Loyiha qoidalari

- Stack: TypeScript, React, Vite, NestJS, npm workspaces.
- Mavjud Markdown o'quv kontenti source of truth va yo'qolmasligi kerak.
- `.env`, `.git`, token, cache, runtime data va `graphify-out` remote rsyncga kiritilmaydi.
- `BOT_TOKEN` qiymatini hech qachon o'qimang, loglamang yoki commit qilmang.
- UI dark/light, responsive va accessible bo'lishi shart.
- Agent yangi dependency kerak bo'lsa package manifestda aniq deklaratsiya qiladi; global install qilmaydi.

## T01 — kontent katalogi

- `buildCatalog(root: string): Promise<Catalog>` — barcha learning Markdown'dan typed katalog.
- `writeContentAudit(root, outputDirectory?): Promise<Catalog>` — katalog va audit artefaktlarini yozadi.
- `fingerprintQuestion(question): string` — exact dedupe uchun yagona kanonik fingerprint.
- Tekshiruv: `npm test`; bitta fayl: `npm test -- packages/content/test/catalog.test.ts`; build: `npm run build`.
- Audit dalili: 47 sahifa, 2259 ajratilgan karta, 2179 kanonik karta, 80 exact dublikat.

## T02 — API va bot

- `GET /health -> HealthResponse`.
- `GET /api/catalog?page&pageSize -> CatalogResponse` — yengil paginated katalog, raw Markdown yo'q.
- `GET /api/pages/:slug?page&pageSize -> PageResponse` — bitta sahifa va uning kartalari.
- `startBot(token, publicUrl): void`, `stopBot(): void` — long polling, network testlarda mock qilinadi.
- API testlari: `npm test -- apps/api/test`; build: `npm run build -w @interviews/api`.

## T03 — React portal

- `GET /api/catalog?pageSize=100 -> CatalogIndex`; `GET /api/pages/:slug?pageSize=100&page=N -> PageBundle`.
- `localStorage['interviews-progress-v1'] -> Record<cardId, 1..10>`.
- `localStorage['theme'] -> 'light' | 'dark'`.
- UI testlari: `npm run test --workspace @interviews/web`; build: `npm run build -w @interviews/web`.
- 360px live tekshiruv: `clientWidth === scrollWidth === 360`.

## T03A — Telegram access control

- `X-Telegram-Init-Data: Telegram.WebApp.initData` — protected API so'rovlari.
- `GET /health` public; catalog va page endpointlari signed initData + allowlist bilan himoyalangan.
- `ApiOptions`: `allowedTelegramUserId`, `authBypass`, `telegramInitDataMaxAgeSeconds`, `nowSeconds`.
- Environment nomlari: `BOT_TOKEN`, `ALLOWED_TELEGRAM_USER_ID`, `AUTH_BYPASS` (default safe-off).
- Bot startup notification bir processda bir marta; `/start` faqat allowlist uchun inline Web App.

## T04 — production runtime

- `docker compose up -d --build` — `127.0.0.1:4173`dagi bitta `app` service; `restart: unless-stopped`, non-root va `/health` healthcheck.
- `ApiOptions.catalogPath` — build vaqtida yaratilgan `Catalog` JSON; `ApiOptions.staticRoot` — ayni Nest process xizmat qiladigan Vite `dist` papkasi.
- `GET <non-API HTML deep-link>` — Vite `index.html`; `/api/*`, `/health*` va `/assets/*` fallbackdan tashqarida, noma'lum API route 404.
- Environment: `BOT_TOKEN`, `ALLOWED_TELEGRAM_USER_ID`, `PUBLIC_URL`, `PUBLIC_HOSTNAME`, `AUTH_BYPASS=false`.
- `scripts/runtime/interviews-service.sh {start|stop|restart|status|logs|health}` — faqat `/Users/alyorjonaminboyev/Projects/interviews`.
- `PUBLIC_HOSTNAME=... scripts/runtime/add-cloudflare-dns-route.sh <existing-tunnel>` — overwrite qilmaydigan, `.runtime/` state bilan takroriy no-op DNS route.

## T06 — final hardening

- `npm test` — Node/tsx API, content va runtime testlaridan keyin `@interviews/web` Vitest suite'ini bir marta ishga tushiradigan kanonik to'liq test buyrug'i.
- Mobil menyu triggeri `aria-controls="primary-navigation"` va `aria-expanded` holatini beradi; ochilganda fokus birinchi navigatsiya tugmasiga, Escape/scrim/navigation bilan yopilganda triggerga qaytadi.
- Production dependency tree `@nestjs/platform-express` ichidagi `multer`ni audit tuzatilgan `2.3.0`ga override qiladi.
- Docker runtime `node:22-alpine@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32` multi-platform manifestiga pinlangan.
