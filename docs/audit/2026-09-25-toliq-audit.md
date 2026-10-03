# To'liq audit — 2026-09-25

Qamrov: UI/UX, frontend kodi, API, infratuzilma, kontent sifati, scaling. Har topilma bilan birga tuzatish va uni ushlab turadigan test ko'rsatilgan.

## Natija qisqacha

| Ko'rsatkich | Oldin | Keyin |
|---|---|---|
| Birinchi yuklash (katalog) | API orqali 11.6 MB katalogdan, auth bilan | `manifest.json` ~3 KB gzip, CDN |
| Takrorlash rejimi | 55 ta API so'rovi, har biri to'liq Markdown bilan | tanlangan yo'nalishning bitta statik bo'lagi |
| Bir kartadagi takrorlanish | savol ×2, javob ×3, 2 ta "Qo'shimcha manba kerak", sifat bali | har ma'lumot 1 marta |
| Soxta (shablon) savollar | 360 | 0 (test bilan taqiqlangan) |
| Deyarli dublikat juftlar | 4015 | 6 |
| Parser o'tkazib yuborgan | PostgreSQL 0/100, SAP 1/100, Python 15/100 | 100, 100, 99 |
| Foydalanuvchilar | bitta allowlist ID | ixtiyoriy allowlist, hamma imzolangan Telegram foydalanuvchisi |
| Progress | faqat brauzer `localStorage` | lokal + Redis, paketli sinxron |
| Gorizontal scaling | mumkin emas (bot polling, jarayon xotirasi) | stateless API, webhook rejimi |
| Testlar | 45 node + 12 web | 56 node (+1 Redis integratsion) + 23 web |

## Kritik

1. **Sessiya 5 daqiqada uzilardi.** Telegram `initData` Mini App ochilganda bir marta imzolanadi; server uni 300 s dan keyin rad etardi — foydalanuvchi o'qish o'rtasida "kirish rad etildi" ko'rardi. Tuzatildi: 24 soat (sozlanadi). Test: `api.test.ts` — "stays valid for a normal study session".
2. **Scaling imkonsiz edi.** Har kontent so'rovi auth guard + Node orqali; progress faqat brauzerda; bot long-polling API ichida (ikkinchi replika Telegram'dan 409 oladi). Tuzatildi: ADR-0007 — statik CDN kontent, Redis progress, `BOT_MODE=webhook`.
3. **Kontentning ~15% soxta edi.** To'rtta faylda Q11–Q100 shablon matni ("Rule #11", "Case #57") — 360 karta. O'chirildi; regressiya testi. ADR-0008.

## Yuqori

4. **UI'da takrorlanish** (skrinshotlar bilan tasdiqlangan): sahifa sarlavhasi har savolga yopishtirilgan, "Asl savol", "Boyitilgan javob" + "Asl javob" + "Asosiy fikr", 2313/2339 kartada bo'sh "Qo'shimcha manba kerak", har kartada "Nega 9 ball?"; sahifada butun maqola va undan olingan kartalar ketma-ket. Tuzatildi: yangi `StudyCard`, savollar/maqola tablari; test "shows each question once, with no audit noise".
5. **Frontend kodi o'qib bo'lmas edi:** `App.tsx` 91 qator, bitta qatorda 3 400 belgigacha; komponentlar, API, holat bir faylda. Qayta tuzildi: `lib/`, `hooks/`, `components/`, `pages/`, Tailwind CSS v4.
6. **Parser xatolari:** `**22. Savol?**` va `## 10. Mavzu / Topic` formatlari tanilmasdi; bo'sh bo'lim sarlavhalari karta bo'lib chiqardi; "What is X? | X nima?" va "X nima? / What is X?" alohida karta edi. Tuzatildi, testlar `catalog.test.ts`da.
7. **Gorizontal overflow 360 px da** (dashboard, sahifa) — CSS grid'ning `auto` ustuni `truncate` matn va kod bloklari bilan kengayardi. Real Chrome'da o'lchab tuzatildi.
8. **Dark mode OS sozlamasini e'tiborsiz qoldirardi** — `telegram-web-app.js` Telegram'dan tashqarida ham `colorScheme: "light"` qaytaradi. Endi faqat haqiqiy Telegram sessiyasida hisobga olinadi.

## O'rta

9. **Poyga holati:** sahifalar tez almashsa eski javob yangisini bosib ketardi (`useAsync` kalit bilan tuzatildi).
10. **`localStorage` istisnolari** (private mode, quota) UI'ni yiqitardi — xavfsiz o'rovchilar.
11. **NestJS dekoratorlari qo'lda chaqirilardi** (`Get("x")(Class.prototype, ...)`) — sababi tsx/esbuild'ning decorator metadata chiqarmasligi. Oddiy dekoratorlar + aniq `@Inject` tokenlarga o'tkazildi.
12. **Env o'qish 6 faylga tarqalgan** — `config.ts`da bir joyda, noto'g'ri qiymatlar ishga tushishda xato beradi; `AUTH_BYPASS` productionda rad etiladi.
13. **Kesh siyosati yo'q edi** — endi assets/bo'laklar `immutable`, manifest 60 s, API `no-store`; CSP va Telegram iframe uchun `frame-ancestors`.
14. **Redis o'chsa so'rovlar abadiy osilardi** (review paytida topildi, yangi kodda) — offline navbat o'chirildi, `503` 2 ms ichida; foydalanuvchi boshiga 10 000 baho limiti. Real Redis 8 bilan o'chirish/yoqish sinovi o'tdi.
15. **Klient "zaharli paket"ni abadiy qayta yuborardi** (review paytida topildi) — 4xx endi doimiy xato sifatida tashlanadi; boshlang'ich sinxron tarmoq qaytganda qayta uriniladi.

## Past / tozalash

16. Root `index.html` (2.7 MB, eski UI) va `scripts/build_index.py` o'chirildi; `.claude/settings.json`dagi hook Windows yo'liga (`d:\pythons\interviews`) ishora qilardi va macOS'da hech qachon ishlamagan — olib tashlandi.
17. `content-audit/catalog.json` (14 MB, har build'da o'zgaradi) git'dan chiqarildi; statik bo'laklar ham git-ignored.
18. Telegram `BackButton` ogohlantirishlari Telegram'dan tashqarida — faqat 6.1+ sessiyada ishlatiladi.

## Deploy (2026-09-25, Alyorjons-Mini)

- `docker compose up -d --no-build`: `app` (yangi image) + `redis` (`redis:8-alpine`, AOF, `redis-data` volume). Ikkalasi `healthy`, bot `running`, startup xabari yuborildi.
- Rollback: `interviews-study-portal:rollback-d1da68e` (oldingi production commit'idan build qilingan, `/health` 200 bilan tekshirilgan). Qaytarish: `.env` va compose'da image tegini `rollback-d1da68e` ga o'zgartirib `docker compose up -d --no-build app`.
- Qabul (lokal va public HTTPS): `/health`, `/health/ready`, `/`, deep-link, `/data/manifest.json` 200; `/api/me/progress` headersiz 401; noma'lum API 404. Imzolangan so'rovlar: ikkala allowlist ID 200, begona foydalanuvchi 403, 3 soatlik sessiya 200, 25 soatlik va soxta imzo 401. Public domen orqali Chrome: 5/5 sahifa, overflow 0, konsol xatosi 0.

Deploy paytida topilib, shu kuni tuzatilgan:
19. **Compose bo'sh `${VAR:-}` ni `""` qilib uzatadi**, `??` esa uni qiymat deb qabul qilardi: legacy allowlist e'tiborsiz qolib, progress API hamma imzolangan foydalanuvchiga ochilib qolgan (bir necha daqiqa), admin bo'sh bo'lgani uchun startup xabari yuborilmagan. Legacy o'zgaruvchida vergul bilan ikkita ID borligi ham hisobga olindi. Testlar: `config.test.ts`.
20. **Cloudflare inline skriptlari yangi CSP'ga urildi** (bot JavaScript detections, Web Analytics). Cloudflare hujjatiga ko'ra, har javob uchun yangi `nonce` CSP header'ga qo'shildi — Cloudflare uni o'z skriptlariga qo'yadi; `unsafe-inline` ishlatilmadi.

## Qolgan ishlar (qilinmagan)

- **Kontent endi ochiq internetda** (ADR-0007). Agar u shaxsiy qolishi kerak bo'lsa, CDN'da imzoli cookie yoki Cloudflare Access kerak — bu mahsulot qarori.
- Dockerfile hali `node:22-alpine` (maintenance LTS). Node 24 LTS image'iga yangi digest bilan o'tish tavsiya etiladi.
- CDN va ko'p replikali deploy — operatsion ish, `docs/operations/scaling.md`da bosqichlar. Maqsadli muhitda k6 yuk testi o'tkazilmagan; noutbukdagi o'lchov: 1 jarayon ≈ 25 500 PUT/s, p99 9 ms.
- Yo'nalish bo'yicha progress (hozir faqat umumiy) — manifestga karta ID'lari kirmaydi.
- Katalogdan o'chirilgan kartalarga qo'yilgan eski baholar hisobda qoladi (foiz 100 bilan cheklangan).
- Boshqa sahifalarda kontent sifati alohida ko'rib chiqilmagan (masalan, "101 Excel formulas" — savolsiz maqola, bu normal).
