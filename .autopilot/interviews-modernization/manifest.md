# Talablar manifesti

Manba: `2026-09-12-brief.md`. Bu ro'yxatdagi talabni faqat foydalanuvchi bekor qilishi mumkin.

| ID | Brifdagi aynan so'z | Holat | Asos | Qayerda |
|----|----------------------|-------|------|---------|
| R01 | “barcha itga aloqador bilimlarimni takrorlab turish” | done | 55 sahifa, 2,339 noyob karta, review oqimi | f9823e0, c00eb92, 455c432 |
| R02 | “uida juda koplab muammoli joylari borda” | done | zamonaviy React UI | c00eb92 |
| R03 | “har bir sahifani ... 10 ballida baholab” | done | content/design/overall rubrikasi | f9823e0, c00eb92 |
| R04 | “har bir savol va javobini 10 ballida baholab” | done | quality + 1–10 confidence | f9823e0, c00eb92 |
| R05 | “javobni kozni bosganda korinadigan qilish kerak” | done | accessible eye reveal | c00eb92 |
| R06 | “zamovaniy react nest viteda qaytaddan qurish kerak” | done | React/Vite va Nest monorepo, production SPA fallback | 09e65c3, c00eb92, 6481033 |
| R07 | “savollar takrorlanishini oldini olish kerak” | done | exact fingerprint dedupe va aliaslar | f9823e0 |
| R08 | “professional dizayner ai muxandisi sifatida savollar va javoblarni boyitish kerak” | done | 2,339 karta source-grounded; `needsSource=0`; klon va kontekst aralashuvi sayqallandi | 455c432, 030fe2b, ddf39fd, d31d1ba |
| R09 | “responsivlik qilish ham ota kerakli narsa” | done | real Chrome’da 55/55 mobil sahifa, 360px overflow 0 | c00eb92, 65072bc |
| R10 | “.env bot token qoyaman” | done | `BOT_TOKEN` env-only; API va bot safe-off konfiguratsiyasi | a1385ba, 1f81926 |
| R11 | “doimiy ishlaydigan qilish kerak docker orqali ushbu macda” | done | Alyorjons-Mini Compose healthy, non-root, loopback-only, `unless-stopped` | acf7b95 + remote acceptance |
| R12 | “cloudflared ... bitta subdomain qoshib ishlatish kerak” | done | ASSUMPTION: `interviews.4ontak.uz`; dedicated tunnel va user LaunchAgent public 200 | remote acceptance |
| R13 | “rsync qilib faqtinchalik ... /Users/alyorjonaminboyev/Projects/interviews” | done | xavfsiz vaqtinchalik mirror olindi | `work/interviews-rsync-20260912` |
| R14 | “rsync bilan joyiga qaytarish kerak” | done | dry-run + actual one-way mirror; remote `.git`/`.env` himoyalandi | remote acceptance |
| R15i | *(nazarda tutilgan)* Telegram bot Mini App yoki portalni ochishi kerak | done | Web App tugmasi va public HTTPS; real-device bosish foydalanuvchi acceptance'i | acf7b95 + remote acceptance |
| G01 | “[REDACTED:ALLOWED_TELEGRAM_USER_ID] shu useridga bot ishga tushganda xabar bersin” | done | muvaffaqiyatli Telegram API javobidan keyingi sanitized exact-once marker | acf7b95 + remote acceptance |
| G02 | “faqat shu useridda miniapp ochilsin” | done | public signed allowlist 200, correctly signed boshqa user 403, missing 401 | remote acceptance |
| G03 | “start bosganda inline keyboarda webapp ochilsin” | done | private allowlisted `/start` inline `web_app`; real-device bosish foydalanuvchi acceptance'i | a1385ba |
| D01 | Buildda `docs/operations/*.md` 48-o'quv sahifa sifatida kirib qoldi | done | root technical `docs/` learning discoverydan chiqarildi | 6481033 |
| R16 | “barcha sahifasini real chromeda ochib har bir sahifasi testlab bergin” | done | real Google Chrome: 55/55 desktop + 55/55 mobile; 2,339 karta; console error/warn 0 | P01, `outputs/interviews-real-chrome-qa.md` |
| R17 | “conslarini min 5 tadan yechim keltirgin ... 10 balldan baholab ... togirlagin” | done | 4 topilmaning har biri uchun 5 variant baholandi; 9.6/9.5/9.4/9.7 yechimlar qo‘llandi | P01–P03, sayqal qaror matritsalari |
| R18 | “python js, react, next, nest, fastapi, vite, postgres boyicha koproq amaliy savollar qoshib bergin” | done | 8 yo‘nalish × 20 yangi amaliy karta; 90 frontend kloni ham amaliy qayta yozildi | 455c432, 030fe2b, ddf39fd |
