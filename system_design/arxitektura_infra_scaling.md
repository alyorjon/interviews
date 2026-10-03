# Arxitektura, infratuzilma va scaling — amaliy intervyu savollari

> **Kim uchun:** backend/full-stack dasturchi, "tizimni qanday qurasiz va qanday kengaytirasiz?" savollariga raqamlar va trade-off'lar bilan javob berishi kerak.
> **Uslub:** har bir javob — qaror, sababi, narxi. Ko'p misollar shu portalning o'zini qayta qurish jarayonidan (2026-yil sentabr auditi) olingan.

---

# 2025–2026 infratuzilma holati

- **Node.js:** production uchun 24 LTS "Krypton"; 26 2026-yil oktabrda LTS bo'ladi; 20-liniya 2026-yil aprelda end-of-life. Konteyner image'ini aniq versiya va digest bilan mahkamlang.
- **Redis va Valkey:** Redis 2024-yilda SSPL/RSAL litsenziyasiga o'tgach, Linux Foundation BSD-3 litsenziyali **Valkey** fork'ini yaratdi (AWS, Google Cloud, Oracle qo'llab-quvvatlaydi). Redis 8.0 (2025-yil may) AGPLv3 ni uchinchi litsenziya variant sifatida qo'shdi. Valkey 9.0 (2025-yil 21-oktabr) atomik slot migratsiyasi, hash maydonlari uchun TTL va klaster rejimida bir nechta DB'ni olib keldi. Oddiy kesh/progress uchun API mos — tanlov litsenziya siyosati va boshqariladigan xizmat mavjudligiga bog'liq.
- **Tendensiya:** kamroq harakatlanuvchi qism — CDN + stateless API + bitta boshqariladigan DB/kesh ko'p hollarda microservice to'plamidan arzonroq va ishonchliroq.

**Manbalar:** [Node.js releases](https://nodejs.org/en/about/previous-releases) · [Phoronix: Redis 8.0 AGPLv3](https://www.phoronix.com/news/Redis-8.0-Goes-AGPLv3) · [The Register: Redis returns to open source](https://www.theregister.com/software/2025/05/01/redis-returns-to-open-source-with-agpl-license/757582) · [Valkey (Wikipedia)](https://en.wikipedia.org/wiki/Valkey)

---

# Savollar

## Q1. "Million foydalanuvchi" talabini qanday raqamlarga aylantirasiz? / How do you turn "a million users" into engineering numbers?

**Oddiy qilib aytganda:** "million foydalanuvchi" — tilak, talab emas. Avval uni raqamlarga aylantirish kerak: ulardan nechtasi bir vaqtda onlayn, har biri soniyasiga necha marta so'rov yuboradi, qancha o'qish va qancha yozish bor. Shunda bitta server yetadimi yoki yuztasi kerakmi — hisoblab chiqasiz.

**Batafsilroq:**
"Million" o'zi talab emas. Birinchi savollar:

1. **Ro'yxatdan o'tgan, kunlik faol yoki bir vaqtdagi?** 1 mln ro'yxatdagi ≈ 100–200 ming DAU ≈ cho'qqida 10–20 ming bir vaqtdagi — odatiy nisbatlar, lekin mahsulotga qarab tekshiriladi.
2. **O'qish va yozish nisbati.** Bu portalda: o'qish (savollar) hamma uchun bir xil, yozish (baholar) faqat foydalanuvchining o'ziga tegishli.
3. **Har foydalanuvchi so'rov tezligi.** Masalan, faol foydalanuvchi har 30 soniyada bitta baho qo'yadi.

Hisob: 1 mln **bir vaqtdagi** foydalanuvchi × (1/30 s) ≈ **33 000 yozuv/s**. Klientda 3 soniyalik guruhlash va sahifa yopilganda yuborish bilan bu bir necha barobar kamayadi. O'qish esa CDN'dan — origin'ga deyarli yetmaydi.

**Intervyuda shunday ayting:** "Avval aniqlashtiraman: ro'yxatdagi, kunlik faol yoki bir vaqtdagi foydalanuvchilar; o'qish va yozish nisbati; har foydalanuvchining so'rov tezligi. Keyin so'rovlar va yozuvlar soniyasiga sonini hisoblayman va texnologiyani shu raqamlarga qarab tanlayman, modaga qarab emas."

**Esda tuting:** raqamsiz "Kubernetes + Kafka + microservice" deb javob berish.

## Q2. Qaysi ma'lumotni CDN'ga, qaysisini API'ga berasiz? / What belongs on the CDN and what belongs behind the API?

**Oddiy qilib aytganda:** hamma uchun bir xil narsani (maqolalar, rasmlar) har safar oshxonada qaytadan pishirish shart emas — uni oldindan tayyorlab, eshik oldidagi vitrinaga (CDN) qo'yasiz. Oshxonaga (API) faqat har kimga alohida kerak bo'lgan buyurtmalar keladi.

**Batafsilroq:**
Qoida: **hamma uchun bir xil va kamdan-kam o'zgaradigan** narsa — statik va CDN'da; **foydalanuvchiga xos yoki tez o'zgaradigan** — API'da.

Shu portalda qilingan qaror:
- Savol-javob katalogi build vaqtida kontent-hash nomli JSON bo'laklarga yoziladi (`pages/<slug>.<hash>.json`, `topics/<id>.<hash>.json`) va `Cache-Control: public, max-age=31536000, immutable` bilan beriladi.
- Kirish nuqtasi `manifest.json` kichik (gzip'da ~3 KB) va `max-age=60, stale-while-revalidate=600` — yangi deploy bir daqiqada ko'rinadi.
- API faqat `/api/me/progress` — foydalanuvchi baholari.

Oldingi holat: har bir sahifa so'rovi auth guard'dan o'tib Node orqali 11.6 MB'lik katalogdan kesib berilardi; takrorlash rejimi 55 ta so'rov yuborardi. Endi o'qish trafigi Node'ga umuman tegmaydi.

**Intervyuda shunday ayting:** "Hamma uchun bir xil va kamdan-kam o'zgaradigan ma'lumotni statik, kontent-hash nomli fayllar sifatida CDN'da immutable kesh bilan beraman; foydalanuvchiga xos ma'lumot API'da qoladi. Bu portalda katalog shu tarzda CDN'ga chiqarildi va API faqat progressni saqlaydi."

## Q3. Stateless servis nima va nega scaling uchun shart? / What makes a service stateless and why does scaling require it?

**Oddiy qilib aytganda:** stateless server — hech narsani "yodda saqlamaydigan" kassir: har bir xaridorning tarixi umumiy daftarda (Redis, DB). Shuning uchun istalgan kassir istalgan xaridorga xizmat qila oladi va kassirlar sonini xohlagancha oshirish mumkin.

**Batafsilroq:**
Stateless — har qanday replika istalgan so'rovga javob bera oladi, chunki holat jarayon xotirasida emas. Tekshiruv ro'yxati:

- Sessiya, progress, kesh, rate-limit hisoblagichlari — umumiy store'da (Redis/DB), jarayon `Map`ida emas.
- Fayllar lokal diskda emas — obyekt saqlovchida.
- **Singleton ishlar** (cron, long-polling bot, navbat consumer'i "bitta bo'lishi kerak" bo'lsa) alohida: bu portalda Telegram bot `polling` rejimida faqat bitta nusxada ishlay oladi (Telegram bitta `getUpdates` iste'molchisiga ruxsat beradi), shuning uchun ko'p replika uchun `webhook` rejimi qo'shildi.

Sinov: istalgan replikani istalgan vaqtda o'ldirish foydalanuvchiga sezilmasligi kerak.

**Intervyuda shunday ayting:** "Stateless servisda sessiya, kesh va rate limit hisoblagichlari umumiy store'da, fayllar obyekt saqlovchida, singleton ishlar esa alohida. Sinov: istalgan replikani istalgan vaqtda o'chirish foydalanuvchiga sezilmasligi kerak."

## Q4. Liveness va readiness probe farqi nima? / What is the difference between liveness and readiness probes?

**Oddiy qilib aytganda:** liveness — "tirikmisan?" (javob bo'lmasa — qayta ishga tushirish); readiness — "ishga tayyormisan?" (tayyor bo'lmasa — hozircha mijoz yuborilmaydi, lekin o'ldirilmaydi). Ikkalasini aralashtirish — kichik muammoda butun jamoani ishdan bo'shatishga o'xshaydi.

**Batafsilroq:**
- **Liveness** (`/health`): "jarayon tirikmi?" Faqat ichki holatni tekshiradi. Muvaffaqiyatsiz bo'lsa — orkestrator konteynerni **qayta ishga tushiradi**.
- **Readiness** (`/health/ready`): "trafik qabul qila olamanmi?" Bog'liqliklarni (Redis, DB) tekshiradi. Muvaffaqiyatsiz bo'lsa — load balancer bu replikaga **trafik yubormaydi**, lekin uni o'ldirmaydi.

**Intervyuda shunday ayting:** "Liveness faqat jarayonning o'zini tekshiradi va muvaffaqiyatsiz bo'lsa restart beradi; readiness bog'liqliklarni tekshiradi va muvaffaqiyatsiz bo'lsa trafikni to'xtatadi. DB'ni liveness'da tekshirmayman — aks holda DB uzilganda barcha replikalar birdan restart bo'ladi."

**Esda tuting:** liveness'da DB'ni tekshirish. DB bir daqiqaga uzilsa, hamma replikalar bir vaqtda restart bo'ladi va DB qaytganda "thundering herd" bilan uni yana yiqitadi.

## Q5. Kesh qatlamlari qanday tartibda quriladi? / How do you layer caches?

**Oddiy qilib aytganda:** kesh — tez-tez kerak bo'ladigan narsalarni qo'l ostida saqlash: cho'ntakda (brauzer), eshik oldida (CDN), stol ustida (Redis), omborda (DB). Eng qiyin savol — cho'ntakdagi narsa eskirganini qachon bilish (invalidatsiya).

**Batafsilroq:**
Foydalanuvchidan ma'lumotgacha:

1. **Brauzer kesh** — `Cache-Control`, `ETag`. Kontent-hash nomli fayllar — `immutable`.
2. **CDN / edge** — hamma uchun bir xil javoblar.
3. **Ilova keshi** — Redis: qimmat hisob natijalari, sessiyalar.
4. **DB ichida** — buffer pool, materialized view.

Asosiy muammo — **invalidatsiya**. Eng ishonchli usul: kalitni versiyalash (kontent-hash nomi, `v2:` prefiksi) — eski yozuvni o'chirish o'rniga yangi kalitga o'tish. TTL — oxirgi himoya chizig'i, asosiy mexanizm emas.

**Intervyuda shunday ayting:** "Kesh qatlamlari: brauzer, CDN, ilova keshi (Redis) va DB ichki keshi. Invalidatsiyani kalit versiyalash bilan qilaman — kontent-hash nomlari yoki versiya prefiksi; TTL faqat zaxira himoya. Foydalanuvchiga xos javobni umumiy keshga qo'ymayman."

## Q6. Deploy paytida eski tab yangi fayllarni topolmasa nima qilasiz? / How do you handle clients holding stale asset or data names after a deploy?

**Oddiy qilib aytganda:** yangi versiya chiqqanda fayllar yangi nom oladi. Lekin foydalanuvchining ochiq turgan tabi hali eski ro'yxatga qarab eski nomli faylni so'raydi — va 404 oladi. Yechim: xato bo'lsa ro'yxatni yangilab, qayta urinish.

**Batafsilroq:**
Kontent-hash nomlari bilan har deploy yangi nomlar yaratadi. Ochiq qolgan tab eski manifestni ushlab turadi va eski nomni so'raydi — `404`.

Yechimlar (bu portalda ikkalasi ham):
- Klient bo'lak `404` qaytarsa, manifestni `cache: "no-cache"` bilan **bir marta** qayta yuklaydi va yangi nomni oladi.
- Serverda noma'lum `/data/*` va `/assets/*` yo'llari SPA `index.html`ga tushmaydi — aniq `404` qaytadi (aks holda JSON o'rniga HTML kelib, parse xatosi chalkash bo'ladi).

Kattaroq tizimlarda qo'shimcha: eski versiya fayllarini obyekt saqlovchida bir necha deploy davomida saqlash.

**Intervyuda shunday ayting:** "Kontent-hash nomlarida ochiq tab'lar deploy'dan keyin eski nomlarni so'raydi. Klient 404 da manifestni no-cache bilan bir marta qayta yuklaydi, server esa noma'lum asset yo'llarini SPA fallback'ga emas, aniq 404 ga yuboradi. Kattaroq tizimda eski fayllarni bir necha deploy saqlayman."

## Q7. Yozish yukini qanday kamaytirasiz? / How do you reduce write load?

**Oddiy qilib aytganda:** har bir tugma bosilishini alohida xat bilan jo'natish o'rniga, xatlarni bir necha soniya yig'ib, bitta konvertda yuborasiz — pochta (server) yuki bir necha barobar kamayadi.

**Batafsilroq:**
1. **Klientda guruhlash (batching):** har bosishda so'rov emas — debounce (bu portalda 3 s), sahifa yashirilganda `fetch(..., { keepalive: true })` bilan yuborish, oflaynda navbatda saqlash.
2. **Idempotent yozuv:** `PUT` bilan "karta → baho" to'plamini yuborish; qayta yuborish natijani o'zgartirmaydi, shuning uchun tarmoq xatosida xavfsiz qayta urinish mumkin.
3. **Serverda birlashtirish:** bitta Redis `MULTI` ichida `HSET` + `HGETALL`.
4. **Asinxron yozish:** kerak bo'lsa navbat (Kafka, SQS, Redis Streams) orqali, DB'ga guruhlab.

**Intervyuda shunday ayting:** "Yozuv yukini klientda debounce va batching bilan kamaytiraman, sahifa yopilayotganda keepalive bilan yuboraman, yozuvlarni idempotent PUT qilaman — qayta yuborish xavfsiz bo'ladi. Kerak bo'lsa og'ir yozuvlarni navbat orqali guruhlab DB'ga yozaman."

## Q8. Idempotentlik nima va uni qanday ta'minlaysiz? / What is idempotency and how do you guarantee it?

**Oddiy qilib aytganda:** idempotent amal — bir marta ham, o'n marta ham bajarsangiz natija bir xil. Lift tugmasini o'n marta bossangiz ham, lift bitta keladi. Internetda "xat yetib bordimi?" noma'lum bo'lgani uchun qayta yuborish muqarrar — shuning uchun amallar idempotent bo'lishi kerak.

**Batafsilroq:**
Idempotent operatsiya — bir necha marta bajarilsa ham natija bir xil. Tarmoqda "so'rov yetib bordimi?" noma'lum bo'lgani uchun qayta urinish muqarrar, shuning uchun muhim.

- `GET`, `PUT`, `DELETE` — tabiatan idempotent bo'lishi kerak.
- `POST` (to'lov, buyurtma) uchun — **Idempotency-Key** sarlavhasi: server kalit bo'yicha birinchi natijani saqlaydi va takroriy so'rovga shuni qaytaradi.

```sql
CREATE TABLE idempotency_keys (
  key         text PRIMARY KEY,
  user_id     bigint NOT NULL,
  response    jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);
-- INSERT ... ON CONFLICT (key) DO NOTHING RETURNING ... — birinchisi yutadi
```

**Intervyuda shunday ayting:** "GET, PUT va DELETE tabiatan idempotent bo'lishi kerak. To'lov kabi POST'lar uchun Idempotency-Key sarlavhasi ishlataman: server birinchi natijani kalit bo'yicha saqlaydi va takroriy so'rovga shuni qaytaradi — shunda tarmoq xatosida qayta urinish xavfsiz."

## Q9. Rate limiting'ni qayerda va qanday qilasiz? / Where and how do you rate limit?

**Oddiy qilib aytganda:** rate limiting — "bir kishiga bir daqiqada ko'pi bilan 60 ta savol" qoidasi. Uni eng arzon joyda — eshik oldida (CDN yoki gateway) qo'yish yaxshi, shunda suiiste'molchi ichkariga (Node serverga) umuman yetib kelmaydi.

**Batafsilroq:**
- **Edge'da** (Cloudflare, API gateway) — eng arzon: suiiste'mol Node'ga yetmaydi. IP va yo'l bo'yicha.
- **Ilovada** — foydalanuvchi bo'yicha (token/user id), umumiy store bilan (Redis). Algoritmlar: fixed window (oddiy, chegarada ikki baravar sakrash), sliding window, token bucket (qisqa portlashlarga ruxsat).
- Javob: `429 Too Many Requests` + `Retry-After`.

**Intervyuda shunday ayting:** "Rate limit'ni avval edge'da IP bo'yicha, keyin ilovada foydalanuvchi bo'yicha umumiy store bilan qo'yaman. Algoritmlar: fixed window, sliding window, token bucket. Javob — 429 va Retry-After. Har replikada alohida in-memory limiter — xato, chunki haqiqiy limit replikalar soniga ko'payadi."

**Esda tuting:** ko'p replikada har jarayonda alohida in-memory limiter — haqiqiy limit replikalar soniga ko'payadi. Proxy orqasida `trust proxy` noto'g'ri bo'lsa, hamma bitta IP deb bloklanadi.

## Q10. Ma'lumotlar bazasini qanday kengaytirasiz? / How do you scale the database tier?

**Oddiy qilib aytganda:** ma'lumotlar bazasini kengaytirish — eng arzonidan boshlanadi: avval so'rovlarni tuzatish va indeks qo'shish (ko'pincha 10x shu yerda), keyin kesh, keyin o'qish uchun nusxalar, keyin kattaroq server, va faqat eng oxirida bazani bo'laklarga bo'lish (sharding).

**Batafsilroq:**
Tartib bilan, eng arzonidan:

1. **So'rov va indekslar** — `EXPLAIN ANALYZE`, N+1 so'rovlarni yo'qotish. Ko'pincha 10x shu yerda.
2. **Connection pooling** — PgBouncer; har replika 20 ulanish × 50 replika = 1000 ulanish Postgres uchun og'ir.
3. **Kesh** (Q5) — o'qishni DB'dan olib tashlash.
4. **Read replica'lar** — o'qishni tarqatish; lekin **replikatsiya kechikishi**: yozgandan keyin darhol o'qish replica'dan eski qiymat qaytarishi mumkin ("read-your-writes" uchun yozgan foydalanuvchini qisqa vaqt primary'ga yo'naltirish).
5. **Vertikal** — kattaroq mashina (ko'pincha kutilganidan uzoqroq yetadi).
6. **Sharding / partitioning** — oxirgi chora: kalit tanlash (masalan, `user_id`), shard'lar orasidagi so'rovlar va tranzaksiyalar qiyinlashadi.

**Intervyuda shunday ayting:** "Tartib: so'rov va indekslarni optimallashtirish, connection pooling, kesh, read replica (replikatsiya kechikishini hisobga olib), vertikal kengaytirish va eng oxirida sharding. Har qadamni o'lchov asosida qo'yaman."

## Q11. Redis'ni progress saqlovchi sifatida ishlatish xavfsizmi? / Is Redis a safe primary store for user progress?

**Oddiy qilib aytganda:** Redis — juda tez, lekin asosan xotirada ishlaydigan daftar. Uni asosiy saqlovchi qilish mumkin, agar diskka yozish (AOF) yoqilgan bo'lsa va xotira to'lganda ma'lumotni o'chirmaslik sozlangan bo'lsa. Pul kabi juda muhim ma'lumot uchun esa haqiqiy bazani (Postgres) tanlaysiz.

**Batafsilroq:**
Trade-off'lar:
- **Afzallik:** juda tez, oddiy ma'lumot modeli (foydalanuvchi → hash), gorizontal klaster.
- **Xavf:** xotirada. Persistence sozlanishi shart: `appendonly yes` + `appendfsync everysec` (qulashda ≈1 soniya yo'qotish). `maxmemory-policy noeviction` — aks holda Redis xotira to'lganda **foydalanuvchi ma'lumotini jimgina o'chiradi**.
- **Qachon yetmaydi:** murakkab so'rovlar, hisobotlar, qat'iy tranzaksiyalar kerak bo'lsa — Postgres asosiy, Redis kesh.

Bu portalda: baho yo'qolishi kritik emas (foydalanuvchi qayta baholaydi, klientda lokal nusxa bor), shuning uchun AOF'li Redis maqbul. To'lov tizimida bu javob boshqacha bo'lardi.

**Intervyuda shunday ayting:** "Redis progress kabi oddiy va yo'qotishga chidamli ma'lumot uchun maqbul: appendonly everysec bilan qulashda ~1 soniya yo'qotish, maxmemory-policy noeviction bilan jimgina o'chirish yo'q. Murakkab so'rovlar, hisobotlar va qat'iy tranzaksiyalar kerak bo'lsa — Postgres asosiy, Redis kesh."

## Q12. Navbat (message queue) qachon kerak? / When do you introduce a message queue?

**Oddiy qilib aytganda:** navbat (queue) — restorandagi buyurtmalar taxtasi: ofitsiant buyurtmani yozib qo'yadi va keyingi mijozga o'tadi, oshpazlar esa o'z tezligida ishlaydi. Shoshilinch bo'lmagan va uzoq ishlar uchun — xat yuborish, video qayta ishlash, katta hisobotlar.

**Batafsilroq:**
Navbat kerak bo'ladi, qachonki:
- Ish so'rov vaqtidan uzoq (email, video, hisobot) — foydalanuvchini kuttirmaslik.
- Yuk cho'qqilarini tekislash kerak — DB bardosh beradigan tezlikda iste'mol qilish.
- Bir hodisaga bir nechta mustaqil iste'molchi bor (fan-out).

Narxi: "kamida bir marta" (at-least-once) yetkazish → iste'molchi idempotent bo'lishi kerak; tartib kafolati faqat partition ichida; dead-letter queue va monitoring kerak. Kichik tizimda Redis/BullMQ yetarli, katta oqimda Kafka.

**Transactional outbox:** DB'ga yozish va hodisa chiqarish atomik bo'lishi uchun hodisani o'sha tranzaksiyada `outbox` jadvaliga yozib, alohida jarayon navbatga uzatadi.

**Intervyuda shunday ayting:** "Navbatni uzoq ishlar, yuk cho'qqilarini tekislash va fan-out uchun kiritaman. Narxi: at-least-once yetkazish sabab idempotent iste'molchilar, faqat partition ichida tartib, dead-letter queue va monitoring. DB yozuvi va hodisa chiqarishni transactional outbox bilan atomik qilaman."

## Q13. Zero-downtime deploy qanday qilinadi? / How do you deploy with zero downtime?

**Oddiy qilib aytganda:** to'xtovsiz deploy — samolyot uchayotganda dvigatellarni birma-bir almashtirish: yangisi tayyor bo'lmaguncha eskisi ishlashda davom etadi. Buning uchun eski va yangi versiya bir vaqtda birga ishlay olishi shart.

**Batafsilroq:**
- **Rolling update:** replikalarni bittadan almashtirish; readiness probe yangi replika tayyor bo'lgunicha trafik yubormaydi; eski replika graceful shutdown bilan ishlayotgan so'rovlarni tugatadi.
- **Blue/green:** ikki to'liq muhit, trafikni bir zumda o'tkazish — tez qaytarish, lekin ikki barobar resurs.
- **Canary:** yangi versiyaga 1–5% trafik, metrikalar yaxshi bo'lsa oshirish.

Shart: yangi va eski versiya **bir vaqtda** ishlay olishi — ya'ni API va DB sxemasi orqaga mos bo'lishi (Q14).

**Intervyuda shunday ayting:** "Rolling update'da readiness yangi replika tayyor bo'lguncha trafik bermaydi va eskisi graceful shutdown bilan yopiladi; blue/green tez qaytish uchun; canary esa kichik ulushda sinash uchun. Shart: API va DB sxemasi orqaga mos bo'lishi."

## Q14. DB migratsiyasini to'xtovsiz qanday qilasiz? / How do you run database migrations without downtime?

**Oddiy qilib aytganda:** bazani to'xtatmasdan o'zgartirish — ko'prikni yopmasdan ta'mirlash: avval yangi yo'lak qurasiz (expand), mashinalarni asta-sekin unga o'tkazasiz (migrate), hammasi o'tgach eskisini buzasiz (contract).

**Batafsilroq:**
**Expand → migrate → contract:**
1. **Expand:** yangi ustun/jadval qo'shish (nullable, default'siz og'ir `ALTER`larsiz). Eski kod buzilmaydi.
2. Kod ikkalasiga yozadi, backfill fon ishida, bo'laklab.
3. Kod yangi ustundan o'qiydi.
4. **Contract:** eski ustunni keyingi relizda o'chirish.

Postgres'da ehtiyot bo'lish kerak: indeksni `CREATE INDEX CONCURRENTLY` bilan, katta jadvalda `NOT NULL` qo'shishni `CHECK ... NOT VALID` + `VALIDATE CONSTRAINT` bilan, `lock_timeout` qo'yib.

**Intervyuda shunday ayting:** "Expand → migrate → contract: avval orqaga mos o'zgarish (yangi ustun), keyin kod ikkalasiga yozadi va backfill bo'laklab bajariladi, keyin yangi ustundan o'qish, keyingi relizda eskisini o'chirish. Postgres'da indeksni CONCURRENTLY bilan, NOT NULL'ni NOT VALID va VALIDATE bilan va lock_timeout qo'yib qilaman."

## Q15. Observability uchun minimal to'plam nima? / What is the minimum observability stack?

**Oddiy qilib aytganda:** observability — mashinaning asboblar paneli: tezlik (latency), yoqilg'i (resurslar), ogohlantirish chiroqlari (xatolar). Paneli yo'q mashinani haydash — ko'zni yumib haydashga o'xshaydi: muammoni faqat avariyadan keyin bilasiz.

**Batafsilroq:**
- **Metrikalar (RED):** Rate, Errors, Duration (p50/p95/p99) har endpoint uchun; Node uchun qo'shimcha — event loop delay, heap, GC.
- **Loglar:** strukturalangan JSON, `requestId` bilan, sirlarsiz (token, `initData` yo'q).
- **Tracing:** OpenTelemetry — so'rov qaysi xizmat/so'rovda vaqt yo'qotganini ko'rsatadi.
- **Alert'lar simptom bo'yicha**, sabab bo'yicha emas: "5xx > 1% 5 daqiqa davomida", "p99 > 500 ms" — "CPU 80%" emas.
- **SLO:** masalan, "99.9% so'rov 300 ms ichida" — xato byudjeti relizlar tezligini boshqaradi.

**Intervyuda shunday ayting:** "Minimal to'plam: har endpoint uchun RED metrikalari (so'rovlar, xatolar, p99), strukturalangan loglar requestId bilan va sirlarsiz, OpenTelemetry trace'lar. Alert'larni sabab bo'yicha emas, simptom bo'yicha qo'yaman va SLO bilan xato byudjetini boshqaraman."

## Q16. Konteyner image'ni production uchun qanday tayyorlaysiz? / How do you build a production-grade container image?

**Oddiy qilib aytganda:** production uchun Docker image — sayohat chamadoni: faqat keraklisini olasiz (build asboblari emas, tayyor natija), qulfni (root bo'lmagan foydalanuvchi) va manzil yorlig'ini (aniq versiya, digest) qo'yasiz.

**Batafsilroq:**
Shu loyiha `Dockerfile`idagi amaliyotlar:
- **Multi-stage build:** build bosqichida dev dependency'lar, runtime'da faqat `npm ci --omit=dev` natijasi va `dist`.
- **Base image digest bilan mahkamlangan** (`node:22-alpine@sha256:...`) — takrorlanadigan build, supply-chain nazorati.
- **Root emas:** `USER node`; compose'da `cap_drop: [ALL]`, `no-new-privileges`.
- **Healthcheck** image ichida, `init: true` (PID 1 signal'larni to'g'ri uzatishi va zombie jarayonlar uchun).
- `.dockerignore` — `.env`, `.git`, `node_modules`, build artefaktlari image'ga tushmaydi.

**Intervyuda shunday ayting:** "Multi-stage build bilan runtime'ga faqat production dependency'lar va dist, base image digest bilan mahkamlangan, root emas foydalanuvchi, cap_drop va no-new-privileges, image ichida healthcheck va init. .dockerignore sirlar va keraksiz fayllarni image'ga kiritmaydi."

## Q17. Sirlarni (secrets) qanday boshqarasiz? / How do you manage secrets?

**Oddiy qilib aytganda:** sirlar (parol, token) — uy kaliti. Uni eshik oldiga (kodga) yoki derazaga (logga) qo'ymaysiz, faqat seyfda (secret manager) saqlaysiz va vaqti-vaqti bilan qulfni almashtirasiz (rotatsiya).

**Batafsilroq:**
- Kodda va image'da **hech qachon** yo'q; `.env` faqat lokal, `0600` ruxsat bilan, git'da `.env.example` bo'sh qiymatlar bilan.
- Production'da: platforma secret store'i (Kubernetes Secrets + tashqi KMS, Vault, cloud Secret Manager), jarayonga env yoki fayl sifatida.
- **Rotatsiya** rejalashtirilgan bo'lsin: ikki kalitni bir vaqtda qabul qilish davri.
- Loglar, xato xabarlari, test assertion'larida sir chiqmasligi — shu loyihada bot tokeni va `initData` hech qayerda loglanmaydi.
- Xavfli rejimlar production'da **o'z-o'zidan rad etilsin**: bu portalda `AUTH_BYPASS=true` va `NODE_ENV=production` birga bo'lsa, ilova umuman ishga tushmaydi.

**Intervyuda shunday ayting:** "Sirlar kodda ham, image'da ham yo'q: lokal .env 0600 bilan, production'da platforma secret store'i. Rotatsiyani ikki kalitni bir vaqtda qabul qilish davri bilan rejalashtiraman, loglarda sirlar chiqmaydi, xavfli rejimlar esa production'da ilovani ishga tushirmaydi."

## Q18. Monolit, modulli monolit yoki microservice — qanday tanlaysiz? / Monolith, modular monolith or microservices — how do you choose?

**Oddiy qilib aytganda:** monolit — bitta katta uy; modulli monolit — bitta uy, lekin xonalari aniq ajratilgan; microservice'lar — alohida uylar mahallasi. Mahalla kengaytirish uchun qulay, lekin yo'l, suv, elektr (tarmoq, kuzatuv, tranzaksiyalar) ancha qimmatga tushadi.

**Batafsilroq:**
| | Monolit | Modulli monolit | Microservice |
|---|---|---|---|
| Deploy | bitta | bitta | har biri alohida |
| Chegaralar | xohlagancha aralash | modul API'lari orqali | tarmoq orqali |
| Jamoa hajmi | 1–5 | 5–30 | ko'p mustaqil jamoa |
| Narx | eng arzon | arzon | tarmoq, kuzatuv, taqsimlangan tranzaksiya |

Asosiy mezon — **mustaqil deploy va scaling ehtiyoji**, texnologik moda emas. Odatiy yo'l: modulli monolit → alohida scaling talab qiladigan qism (masalan, video qayta ishlash) worker/xizmatga chiqariladi.

**Intervyuda shunday ayting:** "Tanlov mezoni — mustaqil deploy va scaling ehtiyoji hamda jamoa hajmi, texnologik moda emas. Odatda modulli monolitdan boshlab, alohida kengayishi kerak bo'lgan qismni keyin xizmat yoki worker'ga chiqaraman."

## Q19. Yuk testini qanday o'tkazasiz va natijani qanday o'qiysiz? / How do you run and read a load test?

**Oddiy qilib aytganda:** yuk testi — ko'prikni ochishdan oldin unga og'ir yuk mashinalarini haydab ko'rish. Muhimi — haqiqiy hayotga o'xshash sinov: qancha odam, qanday harakat, qanday tezlikda. Natijada ko'prik qayerda "egila boshlashi"ni topasiz.

**Batafsilroq:**
1. **Ssenariy haqiqiy bo'lsin:** o'qish/yozish nisbati, "o'ylash vaqti" (think time), kesh isigan/sovuq holat.
2. **Ochiq model** (so'rov/soniya tezligi bilan, masalan k6 `constant-arrival-rate`) — yopiq model (N ta virtual foydalanuvchi) server sekinlashganda yukni o'zi kamaytirib, muammoni yashiradi.
3. **Bosqichma-bosqich oshirish** va "tizza"ni topish: p99 keskin o'sadigan nuqta — haqiqiy sig'im shundan 30–50% past rejalashtiriladi.
4. Bitta replika sig'imini topib, kerakli replikalar sonini hisoblash; bog'liqliklarni (Redis, DB ulanishlari) ham shu yukda kuzatish.

```text
Maqsad: 33 000 yozuv/s cho'qqi, guruhlashdan keyin ~8 000 so'rov/s
1 replika: p99 < 200 ms da 4 000 so'rov/s (o'lchangan)
Kerak: 8 000 / (4 000 × 0.6 xavfsizlik zaxirasi) ≈ 4 replika + 1 zaxira (N+1)
```

**Intervyuda shunday ayting:** "Realistik ssenariy bilan, ochiq modelda (constant arrival rate) yukni bosqichma-bosqich oshirib, p99 keskin o'sadigan 'tizza' nuqtasini topaman va sig'imni undan 30–50% past rejalashtiraman. Bitta replika sig'imidan kerakli replikalar sonini hisoblayman va bog'liqliklarni ham kuzataman."

## Q20. Tizim auditini qanday boshlaysiz? / How do you start an architecture audit of an existing system?

**Oddiy qilib aytganda:** tizim auditi — shifokor ko'rigi: avval o'lchash (testlar, haqiqiy brauzer), keyin tahlil (ma'lumot qayerdan qayerga oqadi, qayerda ortiqcha), keyin tashxis va har bir muolajaga (tuzatishga) nazorat testi.

**Batafsilroq:**
Shu portal auditida ishlagan tartib:

1. **Ishga tushirib o'lchash:** testlar, build, haqiqiy brauzerda ko'rish (360 px va desktop, light/dark), konsol xatolari.
2. **Ma'lumot oqimini chizish:** Markdown → build → katalog → API → UI. Har bosqichda hajm va takrorlanishni o'lchash (11.6 MB katalog, uning 2.3 MB'i foydali edi).
3. **Singleton va holatni topish:** jarayon xotirasidagi narsa, bitta nusxada ishlashi shart bo'lgan narsa (bot polling).
4. **Vaqt bilan bog'liq xatolar:** auth muddati (5 daqiqalik `initData` oynasi foydalanuvchini sessiya o'rtasida chiqarib yuborardi), deploy paytidagi eski nomlar.
5. **Ma'lumot sifati:** avtomatik "deyarli dublikat" ro'yxati 4015 juft ko'rsatdi — 4008 tasi shablon bilan yaratilgan 360 ta soxta savol edi.
6. **Har topilmaga test:** tuzatish bilan birga regressiya testi (masalan, "raqamidan boshqa farqi yo'q 5+ savol bo'lmasin").

**Intervyuda shunday ayting:** "Avval tizimni ishga tushirib o'lchayman, ma'lumot oqimini hajmlar bilan chizaman, singleton va jarayon xotirasidagi holatni topaman, vaqtga bog'liq xatolarni va ma'lumot sifatini tekshiraman. Har bir topilmani regressiya testi bilan tuzataman."

