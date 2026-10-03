# Scaling runbook

Bu hujjat portalni bitta konteynerdan ko'p replikali, CDN ortidagi tizimga o'tkazishni tasvirlaydi. Arxitektura qarori: [ADR-0007](../adr/0007-statik-kontent-cdn-va-stateless-progress-api.md).

## Trafik qayerga boradi

| Yo'l | Kim beradi | Kesh | Izoh |
|---|---|---|---|
| `/`, har qanday SPA yo'li | CDN → origin | `no-cache` | kichik `index.html`, har safar revalidatsiya |
| `/assets/*` | CDN | `max-age=31536000, immutable` | Vite kontent-hash nomlari |
| `/data/manifest.json` | CDN | `max-age=60, stale-while-revalidate=600` | yangi deploy ≤ 1 daqiqada ko'rinadi |
| `/data/pages/*`, `/data/topics/*` | CDN | `immutable` | kontent-hash nomlari |
| `/api/me/progress` | API replikalari | `no-store` | yagona dinamik trafik |
| `/api/telegram/webhook` | API replikalari | — | faqat `BOT_MODE=webhook` |
| `/health`, `/health/ready` | orkestrator / LB | — | liveness va readiness |

Maqsad: foydalanuvchi trafigining deyarli hammasi CDN'da tugaydi; Node faqat progress yozish/o'qishni ko'radi.

## Muhit o'zgaruvchilari

| O'zgaruvchi | Bitta host | Ko'p replika |
|---|---|---|
| `REDIS_URL` | compose'dagi `redis` | boshqariladigan Redis/Valkey (replikatsiya + AOF) |
| `BOT_MODE` | `polling` | `webhook` (**polling faqat bitta replikada ishlay oladi**) |
| `TELEGRAM_WEBHOOK_SECRET` | — | 16+ belgi, `[A-Za-z0-9_-]` |
| `PUBLIC_URL` | tunnel manzili | CDN manzili (webhook shu manzil + `/api/telegram/webhook`) |
| `ALLOWED_TELEGRAM_USER_IDS` | ixtiyoriy | `*` yoki bo'sh — hamma imzolangan foydalanuvchi |
| `TELEGRAM_INIT_DATA_MAX_AGE_SECONDS` | 86400 | 86400 |

`AUTH_BYPASS=true` `NODE_ENV=production`da rad etiladi — ilova ishga tushmaydi.

## Bosqichlar

1. **Bitta host (hozirgi holat):** `docker compose up -d --build` — `app` + `redis` (AOF, `noeviction`, volume). Healthcheck `/health/ready` ni tekshiradi.
2. **CDN oldiga qo'yish:** Cloudflare (yoki boshqa CDN) origin sifatida hozirgi tunnel. Origin kesh sarlavhalarini hurmat qilish rejimi yetarli; `/api/*` uchun keshni o'chirish qoidasi qo'shing. Edge'da `/api/*` uchun IP bo'yicha rate limit (masalan, 60 so'rov/daqiqa).
3. **Redis'ni tashqariga chiqarish:** boshqariladigan Redis/Valkey, `REDIS_URL`ni almashtirish. Ma'lumot ko'chirish: eski instansiyadan `redis-cli --rdb` yoki `MIGRATE`.
4. **Replikalar:** `BOT_MODE=webhook` va `TELEGRAM_WEBHOOK_SECRET` bilan N ta API konteyneri load balancer ortida. LB readiness uchun `/health/ready`, liveness uchun `/health` ishlatadi. LB idle timeout < 65 s (Node `keepAliveTimeout` 65 s).
5. **Statikni to'liq CDN/obyekt saqlovchiga ko'chirish (ixtiyoriy):** `apps/web/dist`ni S3/R2'ga yuklash; API faqat `/api/*` ni beradi. Hash nomli eski fayllarni bir necha deploy davomida o'chirmang — ochiq tab'lar ularni so'rashi mumkin (klient 404 da manifestni bir marta qayta yuklaydi).

## O'lchangan raqam (2026-09-25)

Bitta API jarayoni, Apple M4 noutbuk, lokal Redis 8 (Docker), `autocannon -c 100`, `PUT /api/me/progress`:
**~25 500 so'rov/s, p99 9 ms, 0 xato**. `AUTH_BYPASS` bilan o'lchangan — haqiqiy so'rovda qo'shimcha ikki HMAC-SHA256 bor (mikrosoniyalar). Statik `manifest.json` Node orqali ~27 000 so'rov/s — lekin productionda uni CDN beradi.

Bu noutbuk raqami: bulutdagi 1 vCPU'li konteyner odatda bir necha barobar sekinroq, tarmoq orqali Redis ham kechikish qo'shadi. Rejalashtirish uchun quyida ehtiyotkor 4 000 PUT/s/replika olingan — maqsadli muhitda k6 bilan qayta o'lchang.

## Sig'im hisobi

```text
Bir vaqtdagi faol foydalanuvchi:       1 000 000
Baho tezligi (faol foydalanuvchi):     1 / 30 s        → 33 000 baho/s
Klient guruhlashi (3 s debounce):      ~3–5 baho/so'rov → 7 000–11 000 PUT/s
Bitta API replikasi (ehtiyotkor):      ~4 000 PUT/s (noutbukda o'lchangani ~25 000)
Replikalar (60% yuklama chegarasi):    11 000 / (4 000 × 0.6) ≈ 5, + N+1 zaxira
Redis:                                 har PUT = 2 MULTI (HLEN+HMGET limit uchun, HSET+HGETALL) → bitta shard yetadi,
                                       xotira: 1 mln foydalanuvchi × ~100 baho × ~40 B ≈ 4 GB
```

Yuk testi: k6 `constant-arrival-rate` ssenariysi, `PUT /api/me/progress` sintetik imzolangan `initData` bilan (test muhitida alohida bot token). O'lchash: p99, xato ulushi, event loop delay, Redis CPU va latency.

## Kuzatuv

- API: so'rovlar soni, 4xx/5xx ulushi, p50/p95/p99 (`/api/me/progress`), event loop delay.
- Redis: `used_memory`, `instantaneous_ops_per_sec`, AOF rewrite, replikatsiya kechikishi.
- CDN: kesh hit ratio (`/data/*` uchun ~100% bo'lishi kerak), origin'ga so'rovlar.
- Alert: 5xx > 1% (5 daqiqa), p99 > 500 ms, readiness muvaffaqiyatsiz replikalar > 0.
