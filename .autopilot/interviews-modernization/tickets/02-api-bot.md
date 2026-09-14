# 02 — NestJS API va Telegram bot

**Talablar:** R06, R10, R15i
**Blocked by:** 01
**Zona:** `apps/api/`
**To'lqin:** 2
**Status:** ready

## Ishlaydigan natija

Nest API katalogni sahifalab beradi, healthcheck ishlaydi, `BOT_TOKEN` bo'lsa Telegram bot portal Web App tugmasini yuboradi; token yo'q bo'lsa API ishlashda davom etadi.

## Brifdan

> “react nest viteda qaytaddan qurish kerak”
> “.env bot token qoyaman”

## Qabul mezonlari

- [ ] `GET /health`, catalog va page endpointlari valid typed javob beradi
- [ ] `BOT_TOKEN` faqat environmentdan olinadi va loglanmaydi
- [ ] `/start` va menu Web App `PUBLIC_URL`ni ochadi
- [ ] Telegram transient xatolari backoff bilan qayta urinadi
- [ ] Token yo'q/noto'g'ri holat API health'ni yiqitmaydi

