# Spetsifikatsiya: Interview Study Portal 2.0

## Muammo

Foydalanuvchining katta IT bilim bazasi bitta og'ir HTML faylga yig'ilgan: sahifalar o'qishga noqulay, savol-javoblar turli formatda, bir xil savollar takrorlanadi, javobni yashirib faol eslash va o'z bilimini baholash oqimi yo'q. Portal telefon va Telegram ichida ham professional ko'rinishi, Alyorjons-Mini Mac qayta yuklanganda ham ishlashi kerak.

## Yechim

React + Vite interfeysi va NestJS API'dan iborat zamonaviy, ikki mavzuli (dark/light), mobil-first o'quv portali quriladi. Markdown manbalar build vaqtida yagona katalogga aylantiriladi: savollar normalizatsiya qilinadi, aniq dublikatlar birlashtiriladi, sifat ballari hisoblanadi, javoblar ko'z tugmasigacha yopiq turadi. Foydalanuvchi har kartaga 1–10 ishonch bali beradi; progress qurilmada saqlanadi. Telegram bot `/start` va menyu orqali portalni ochadi.

Migratsiya manbasi va yakuniy destination bir xil: `Alyorjons-Mini:/Users/alyorjonaminboyev/Projects/interviews`. Mavjud 47 ta o'quv Markdown sahifasining hech biri yo'qolmaydi; texnik boshqaruv fayllari o'quv katalogiga kiritilmaydi.

## Foydalanuvchi hikoyalari

| # | Belgi | Hikoya | Qabul mezoni |
|---|-------|--------|--------------|
| 1 | R01 | O'rganuvchi sifatida mavzu yoki aralash takrorlash sessiyasini boshlayman | katalogdan filtrlangan noyob kartalar chiqadi |
| 2 | R01.1 | Birinchi kirishda portal nima qilishni ko'rsatadi | bo'sh progress uchun aniq CTA va “Bugungi takrorlash” mavjud |
| 3 | R02 | O'rganuvchi sifatida sahifalarni chalg'itmaydigan zamonaviy UI'da o'qiyman | eski iframe/ulkan inline HTML yo'q; semantik komponentlar bor |
| 4 | R03 | Har sahifaning 10 ballik kontent sifatini ko'raman | sahifa kartasi va headerda ball hamda qisqa sabab bor |
| 5 | R04 | Har savol-javobning 10 ballik AI sifat balini ko'raman | har kartada `qualityScore` va rubrika mavjud |
| 6 | R04.1 | O'z bilimimni 1–10 baholayman | shaxsiy ball saqlanadi va sessiya progressiga kiradi |
| 7 | R05 | Javobni oldindan ko'rmayman va ko'z tugmasida ochaman/yopaman | keyboard va screen-reader bilan ishlaydigan reveal mavjud |
| 8 | R06 | Portal React/Vite + NestJS bilan ishlaydi | Vite production build Nest API bilan bitta containerda xizmat qiladi |
| 9 | R07 | Takroriy savollar sessiyani ifloslantirmaydi | kanonik fingerprint va o'xshashlik tekshiruvi; dublikat source'lar alias sifatida saqlanadi |
| 10 | R08 | Savol-javoblar ekspert metadata bilan boyitiladi | daraja, teg, asosiy fikr, follow-up va keng tarqalgan xato ko'rsatiladi |
| 10a | R08.1 | Har bir ajratilgan savolning ko'rinadigan matni va javobi source-grounded tarzda boyitiladi | `expandedQuestion` savolni aniqroq kontekstlaydi; `expandedAnswer` mavjud javobning qisqa xulosasi va chuqur tafsilotlarini beradi, yangi fakt uydirmaydi |
| 11 | R09 | Telefon, planshet va desktopda o'qish qulay | 360px–1440px, mobil drawer, 44px touch target, overflow yo'q |
| 12 | R10 | Tokenni faqat `.env`ga kiritaman | `.env.example` nomlarni ko'rsatadi, qiymat Git/Docker imagega kirmaydi |
| 13 | R11 | Alyorjons-Mini qayta ishga tushganda servis tiklanadi | Compose `restart: unless-stopped`, healthcheck va runbook bor |
| 14 | R12 | Portal HTTPS subdomainda ochiladi | Cloudflare ingress lokal portga yo'naladi; default hostname `interviews.4ontak.uz` |
| 15 | R13 | Asl repo xavfsiz mirror orqali tahrirlanadi | `.git`, `.env`, runtime data ko'chirilmagan |
| 16 | R14 | Tekshirilgan natija remote source'ga qaytariladi | dry-run, rsync, remote build/test va hash/status dalili |
| 17 | R15i | Telegram bot foydalanuvchini portalga olib kiradi | `/start` va menyu Web App tugmasini yuboradi; token yo'q bo'lsa bot safe-off |
| 18 | G01 | Bot container ishga tushganda egasiga tayyorligi haqida xabar beradi | xabar faqat `ALLOWED_TELEGRAM_USER_ID`ga yuboriladi; restart storm takroriy spamga aylanmaydi |
| 19 | G02 | Faqat allowlist egasi Mini App kontentidan foydalanadi | backend Telegram `initData` HMAC imzosini `BOT_TOKEN` bilan tekshiradi va user ID mos bo'lmasa 403 qaytaradi |
| 20 | G03 | Allowlist egasi `/start` bosganda inline Web App tugmasini oladi | boshqa user havola olmaydi; inline keyboard `PUBLIC_URL`ni ochadi |

## Amalga oshirish qarorlari

- **Monorepo:** npm workspaces (`apps/web`, `apps/api`, `packages/content`). Sabab: bitta lockfile, bitta Docker build, aniq frontend/backend chegarasi.
- **Kontent source of truth:** mavjud `.md` fayllar o'z joyida qoladi. Build skripti ularni JSON katalogga aylantiradi; qo'lda 50 ming qatorni ko'chirishda paydo bo'ladigan drift yo'q.
- **D01 (T04 build dalili):** root `docs/` operatsion hujjatlar uchun ajratiladi va learning discoverydan chiqariladi; aks holda runbook o'quv sahifalar sonini buzadi. 47 mavjud learning sahifa o'zgarishsiz qoladi.
- **Savol ajratish:** Q-sarlavha, `Savol:` bloklari, raqamlangan quiz va savol belgili sarlavhalar parser adapterlari orqali olinadi. Oddiy maqola bo'limlari o'qish sahifasi sifatida qoladi.
- **Deduplikatsiya:** apostrof/Unicode/kod formatini normalizatsiya qilgan fingerprint; bir xil fingerprint faqat bitta kanonik karta beradi. Yaqqol bo'lmagan o'xshashlar audit hisobotiga tushadi, avtomatik yo'q qilinmaydi.
- **Baholash:** sahifa va karta uchun 10 ballik deterministik rubrika (aniqlik signallari, izoh chuqurligi, amaliy misol/kod, tuzilma, ikki tillilik). Bu ball “texnik haqiqat kafolati” emas, kontent yetukligi signali sifatida nomlanadi.
- **Boyitish:** mavjud javobdan asosiy xulosa, daraja, teg, follow-up va common-mistake maydonlari chiqariladi; past balli kartalar “boyitish kerak” holatida qoladi, yolg'on fakt uydirilmaydi.
- **Matnning o'zi:** kartada asl savol/javob bilan birga `expandedQuestion` va `expandedAnswer` ko'rsatiladi. Boyitish faqat shu source bo'limidagi gaplar va koddan tuziladi; yetarli dalil bo'lmasa aniq “qo'shimcha manba kerak” belgisi chiqadi, taxminiy texnik javob yozilmaydi.
- **Har sahifa review'i:** har sahifaga alohida `contentScore`, `designReadinessScore` va `overallScore` (1–10) beriladi. Dizayn readiness bir xil professional komponentlarda o'qiluvchanlik, bloklar tuzilishi, code/table overflow va mobil holat bo'yicha hisoblanadi.
- **Progress:** browser localStorage; login va markaziy foydalanuvchi bazasi hozir talab qilinmagan. API katalog, health va botni boshqaradi.
- **Telegram:** long polling, token bo'lmasa API baribir sog'lom ishlaydi. Web App URL `PUBLIC_URL`dan olinadi.
- **Telegram access:** `ALLOWED_TELEGRAM_USER_ID` remote `.env`da saqlanadi. Bot startup notification va `/start` javobini faqat shu IDga yuboradi. Mini App API so'rovlari `X-Telegram-Init-Data` orqali serverda HMAC tekshiruvdan o'tadi; development/test uchun explicit `AUTH_BYPASS=false` default safe holat saqlanadi.
- **Runtime:** bitta multi-stage Docker image, host port `4173`, Compose restart policy va healthcheck.
- **Cloudflare:** mavjud named tunnelga alohida hostname → `http://localhost:4173`; boshqa 4ontak route'lari o'zgarmaydi. Hostname foydalanuvchi boshqa nom bermasa `interviews.4ontak.uz`.
- **Xavfsizlik:** `.env` Git va rsyncdan tashqarida; API security headers, CORS same-origin, health endpoint ochiq, Markdown raw HTML render qilinmaydi.

## Chegaralar va test choklari

| Modul | Egasi | Tashqariga beradi | Ichida yashiradi |
|---|---|---|---|
| `content-pipeline` | Markdown discovery, parsing, score, dedupe | `buildCatalog(root) -> Catalog` | parser adapterlari va fingerprint algoritmi |
| `api` | katalog/health/config HTTP yuzasi | `GET /api/catalog`, `GET /api/pages/:slug`, `GET /health` | fayl joylashuvi va runtime config |
| `bot` | Telegram long polling va Web App menyusi | `startBot(token, publicUrl)`, `stopBot()` | Telegram update offset/retry |
| `web` | navigatsiya, reveal, filter, progress | API response va localStorage orqali UI | layout state va reveal state |
| `runtime` | image, Compose, tunnel/runbook | `docker compose up -d --build` | container build qatlamlari |

Asosiy test choki: yaratilgan `Catalog` kontrakti. Parser/dedupe API va UI shu bitta stabil shakl orqali tekshiriladi.

## Doiradan tashqari

| Talab | Nega hozir emas |
|---|---|
| R04.1 uchun cloud account sync | login va ko'p foydalanuvchi rejimi so'ralmagan; progress ayni browserda saqlanadi |
| R08 uchun jonli LLM qayta yozish | provider/API credential so'ralmagan; deterministik boyitish va audit xavfsizroq |
| Admin CMS | Markdown source of truth saqlanadi; alohida tahrirlash paneli yangi mahsulot bo'lardi |

## Ochiq joylar

- `BOT_TOKEN=` — foydalanuvchi Alyorjons-Mini'dagi `.env`da saqlaydi; qiymat mirror yoki Gitga olinmaydi.
- `PUBLIC_HOSTNAME=interviews.4ontak.uz` — boshqa hostname aytilsa deploydan oldin almashtiriladi.
- `PUBLIC_URL=https://interviews.4ontak.uz` — hostname bilan bir xil yangilanadi.
- `ALLOWED_TELEGRAM_USER_ID=` — faqat remote `.env`da haqiqiy qiymat; repo va hisobotlarda qiymat yozilmaydi.

## Manifest qamrovi

| Talab | Spetsifikatsiya qismi |
|---|---|
| R01 | Hikoyalar 1–2 |
| R02 | Hikoya 3, UI qarorlari |
| R03 | Hikoya 4, baholash qarori |
| R04 | Hikoyalar 5–6, baholash qarori |
| R05 | Hikoya 7 |
| R06 | Hikoya 8, monorepo qarori |
| R07 | Hikoya 9, deduplikatsiya qarori |
| R08 | Hikoya 10, boyitish qarori |
| R09 | Hikoya 11 |
| R10 | Hikoya 12, xavfsizlik qarori |
| R11 | Hikoya 13, runtime qarori |
| R12 | Hikoya 14, Cloudflare qarori |
| R13 | Hikoya 15 |
| R14 | Hikoya 16 |
| R15i | Hikoya 17, Telegram qarori |
| G01 | Hikoya 18, Telegram access qarori |
| G02 | Hikoya 19, Telegram access qarori |
| G03 | Hikoya 20, Telegram access qarori |
