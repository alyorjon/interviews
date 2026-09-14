# 03A — Telegram allowlist va Mini App auth

**Talablar:** G01, G02, G03, R10, R15i
**Blocked by:** 02, 03
**Zona:** `apps/api/` · `apps/web/` · `package-lock.json`
**To'lqin:** 3
**Status:** ready

## Ishlaydigan natija

Bot startupda faqat allowlist egasiga xabar beradi, `/start` inline Web App tugmasini faqat unga yuboradi va katalog API'si haqiqiy Telegram initData imzosi hamda allowlist ID bilan himoyalanadi.

## Brifdan

> “[REDACTED:ALLOWED_TELEGRAM_USER_ID] shu useridga bot ishga tushganda xabar bersin”
> “faqat shu useridda miniapp ochilsin”
> “start bosganda inline keyboarda webapp ochilsin”

## Qabul mezonlari

- [ ] `ALLOWED_TELEGRAM_USER_ID` qiymati faqat environmentdan olinadi, log/response/repo'da chiqmaydi
- [ ] Startup notification aynan bir allowlist chatga yuboriladi va testda network mock qilinadi
- [ ] `/start` allowlist uchun inline `web_app`, boshqalarga link bermaydigan access-denied
- [ ] Nest guard Telegram WebApp initData HMAC, auth_date freshness va user IDni tekshiradi
- [ ] Web barcha catalog/page so'roviga Telegram initData yuboradi; 401/403 professional locked state beradi
- [ ] Testlar valid/tampered/stale/wrong-user initData va bot startup/start flow'ni qamraydi

