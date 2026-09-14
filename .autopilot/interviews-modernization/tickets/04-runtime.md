# 04 — Docker runtime va operatsion runbook

**Talablar:** R06, R10, R11, R12, D01
**Blocked by:** 02, 03, 03A
**Zona:** `Dockerfile` · `docker-compose.yml` · `scripts/runtime/` · operatsion docs
**To'lqin:** 4
**Status:** ready

## Ishlaydigan natija

Bitta production image React build va Nest API'ni Alyorjons-Mini port 4173da doimiy ishlatadi; healthcheck, restart policy va Cloudflare route skripti mavjud.

## Brifdan

> “doimiy ishlaydigan qilish kerak docker orqali ushbu macda”
> “cloudflared ... bitta subdomain qoshib ishlatish kerak”

## Qabul mezonlari

- [ ] `docker compose up -d --build` bitta healthy service beradi
- [ ] `.env` image/Gitga kirmaydi, `.env.example` faqat nomlarni beradi
- [ ] Container `unless-stopped`, non-root va healthcheck bilan ishlaydi
- [ ] Hostname route mavjud tunnelga idempotent qo'shiladi, boshqa route'lar o'zgarmaydi
- [ ] Start/stop/status/log runbook aniq Alyorjons-Mini pathini ishlatadi
- [ ] `docs/operations` technical Markdown learning katalogiga kirmaydi; 47 sahifa regressioni saqlanadi
