## Kontekst

Portal bitta Telegram foydalanuvchisi uchun qurilgan edi: har bir kontent so'rovi allowlist guard'idan o'tib, Node jarayoni xotirasidagi 11.6 MB katalogdan kesib berilardi, progress faqat brauzer `localStorage`ida, bot esa API jarayoni ichida long-polling qilardi. Talab o'zgardi: bir vaqtda juda ko'p (mo'ljal — million) foydalanuvchiga xizmat qilish. Bundan tashqari `initData` 5 daqiqada eskirib, foydalanuvchini sessiya o'rtasida chiqarib yuborardi.

## Qaror

1. **O'quv kontenti ochiq va statik.** Build vaqtida `manifest.json` (qisqa kesh) va kontent-hash nomli `pages/*.json`, `topics/*.json` bo'laklari (`immutable`) yaratiladi; ular Vite build bilan birga har qanday CDN yoki statik hostdan beriladi. Katalog API endpoint'lari olib tashlandi.
2. **API faqat foydalanuvchiga xos holatni saqlaydi:** `GET/PUT /api/me/progress`, Telegram `initData` HMAC bilan. Allowlist ixtiyoriy (`ALLOWED_TELEGRAM_USER_IDS`, bo'sh yoki `*` — hamma imzolangan foydalanuvchi). `initData` yaroqlilik oynasi 24 soat.
3. **Progress Redis'da** (`progress:v1:<userId>` hash), AOF + `noeviction`. Klient baholarni 3 soniyalik paketlarda va sahifa yopilganda yuboradi; lokal nusxa oflayn ishlashni ta'minlaydi.
4. **Bot ikki rejimda:** `polling` (faqat bitta replika) va `webhook` (istalgan replikalar soni, `X-Telegram-Bot-Api-Secret-Token` tekshiruvi bilan).

## Nega

Kontent hamma uchun bir xil — uni har so'rovda autentifikatsiya qilib Node orqali berish CDN keshini imkonsiz qiladi va o'qish trafigini to'g'ridan-to'g'ri origin'ga yo'naltiradi. Kontentni imzoli cookie/URL bilan yopiq CDN'da berish ko'rib chiqildi, lekin shaxsiy ma'lumot bo'lmagan intervyu materiallari uchun murakkablik oqlanmaydi. Postgres progress uchun ortiqcha: ma'lumot modeli "foydalanuvchi → karta → baho", murakkab so'rov va hisobot yo'q.

## Oqibatlar

ADR-0004 dagi "kontent faqat allowlist egasiga" talabi bekor bo'ldi — kontent ochiq internetda. Allowlist endi faqat progress sinxronlash va bot tugmasiga ta'sir qiladi; eski `ALLOWED_TELEGRAM_USER_ID` orqaga moslik uchun allowlist va admin sifatida o'qiladi. Karta ID'lari (fingerprint) progress kaliti bo'lgani uchun fingerprint qoidasini o'zgartirish foydalanuvchi progressini yo'qotadi — ADR-0003 dagi ogohlantirish endi server ma'lumotiga ham tegishli. Deploy'dan keyin eski tab'lar eski bo'lak nomlarini so'rashi mumkin; klient 404 da manifestni bir marta qayta yuklaydi.
