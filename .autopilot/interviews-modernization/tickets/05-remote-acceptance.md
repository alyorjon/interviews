# 05 — Alyorjons-Mini rsync va real qabul

**Talablar:** R11, R12, R13, R14, R15i
**Blocked by:** 04
**Zona:** remote `/Users/alyorjonaminboyev/Projects/interviews` va runtime
**To'lqin:** 5
**Status:** ready

## Ishlaydigan natija

Faqat tekshirilgan source lokal mirrordan Alyorjons-Mini'dagi ayni manba papkaga qaytariladi; remote build/test, Docker health, Cloudflare HTTPS va bot safe-off/live holati dalil bilan tekshiriladi.

## Brifdan

> “/Users/alyorjonaminboyev/Projects/interviews”
> “rsync bilan joyiga qaytarish kerak”

## Qabul mezonlari

- [ ] `rsync -azn --delete-after` preview `.env`, `.git`, runtime va cache'ni himoya qiladi
- [ ] Destination aynan `Alyorjons-Mini:/Users/alyorjonaminboyev/Projects/interviews`
- [ ] Remote test/build va `docker compose ps` green
- [ ] Localhost health va public HTTPS health alohida tekshiriladi
- [ ] Bot logi tokenni oshkor qilmasdan startup holatini ko'rsatadi
