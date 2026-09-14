# 06 — Yakuniy xavfsizlik va accessibility hardening

**Talablar:** R02, R09
**Blocked by:** 04
**Zona:** dependency lockfile, `apps/api/`, `apps/web/`, Dockerfile
**To'lqin:** 5
**Status:** ready

## Ishlaydigan natija

Remote deploydan oldin production dependency auditi imkon qadar tozalanadi va mobil drawer ochilganda fokus navigatsiyaga ko'chadi hamda yopilganda triggerga qaytadi. Bazaviy runtime image takrorlanuvchi tarzda pinlanadi yoki buning imkoni dalil bilan qayd etiladi.

## Qabul mezonlari

- [ ] `npm audit --omit=dev` yuqori/kritik production zaifliksiz yoki upstreamda tuzatish yo'qligi aniq dalil bilan qayd etilgan
- [ ] Bog'liqlik yangilanishi mavjud test/buildni buzmaydi
- [ ] Mobil drawer ochilganda fokus drawer ichidagi birinchi interaktiv elementga o'tadi
- [ ] Escape/scrim/navigation yopilganda fokus menyu triggeriga qaytadi
- [ ] Accessibility xatti-harakati avtomatik test bilan himoyalangan
- [ ] Docker base image mutable concern yopiladi yoki nega report qilinishi asoslanadi

## Tekshiruv

```bash
npm test
npm run build
npm audit --omit=dev
docker build -t interviews-study-portal:final .
```
