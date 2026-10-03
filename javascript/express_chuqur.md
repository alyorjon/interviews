# Express.js chuqur — Express 5 va production intervyu savollari

> **Kim uchun:** Express'da API yozgan, endi Express 5 o'zgarishlari, middleware ichki ishlashi va production xatolarini tushuntira olishi kerak bo'lgan dasturchi.
> **Tekshirilgan:** kod misollari Node.js v26.9.0 va Express 5.2.1 da ishga tushirib ko'rilgan (2026-yil 25-sentabr).

---

# 2025–2026 yangiliklari

- **Express 5 — asosiy versiya.** 5.0.0 2024-yil 10-sentabrda chiqdi (4.x dan 10 yil keyin). 2025-yil 31-martda 5.1.0 npm'da `latest` teg oldi — `npm i express` endi 5-versiyani o'rnatadi.
- **5.1.0 (2025-yil mart):** `res.sendFile` uchun `etag` opsiyasi, `res.links()` bir xil `rel` uchun bir nechta havola, eski polyfill va `depd`/`utils-merge` bog'liqliklari olib tashlandi.
- **5.2.0 va 5.2.1 (2025-yil 1-dekabr):** 5.2.0 body-parser xavfsizlik yangilanishini olib keldi, lekin `extended` query parser xulqida kutilmagan breaking change qildi; o'sha kuni 5.2.1 uni to'liq qaytardi. Xulosa: **aniq patch versiyani lockfile bilan mahkamlang** va yangilanishni CI'da test qiling.
- **4.x hali xavfsizlik yangilanishlarini oladi:** 4.22.3 (2026-yil 14-sentabr) `path-to-regexp` 0.1.13 bilan CVE-2026-4867 ni yopdi. 4.x da qolgan loyihalar kamida shu patch'ga yangilanishi, keyin 5-ga ko'chishni rejalashtirishi kerak.
- **NestJS 11 (2025-yil yanvar) default adapteri Express 5 ga o'tdi**, NestJS 12 (2026-yil avgust) Express adapteriga ishlayotgan so'rovlarni kutib to'xtash (graceful shutdown) qo'shdi.

**Manbalar:** [Express releases](https://github.com/expressjs/express/releases) · [Migrating to Express 5](https://expressjs.com/en/guide/migrating-5.html) · [npm: express](https://www.npmjs.com/package/express?activeTab=versions)

---

# Savollar

## Q1. Express 5 da asinxron xatolar qanday ushlanadi? / How does Express 5 handle errors from async handlers?

**Oddiy qilib aytganda:** Express 4 da async funksiya ichidagi xato "yo'qolib ketardi" — so'rov javobsiz osilib qolardi yoki butun server yiqilardi. Express 5 esa xatoni o'zi ushlab, xato bilan ishlaydigan middleware'ga yetkazadi — xuddi yiqilgan narsani avtomatik tutib oladigan to'r.

**Batafsilroq:**
Express 4 da `async` handler ichidagi `throw` yoki rad etilgan (rejected) Promise **ushlanmasdi** — so'rov osilib qolardi yoki `unhandledRejection` jarayonni yiqitardi. Shuning uchun `express-async-errors` yoki `wrap(fn)` yozilardi.

Express 5 da handler yoki middleware Promise qaytarsa va u rad etilsa, xato avtomatik `next(err)` ga uzatiladi:

```js
import express from "express";

const app = express();
app.get("/users/:id", async (req, res) => {
  const user = await Promise.reject(new Error("DB ulanmadi"));
  res.json(user);
});
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message }); // "DB ulanmadi"
});
```

**Intervyuda shunday ayting:** "Express 5 da handler qaytargan Promise rad etilsa, xato avtomatik next(err)'ga uzatiladi, shuning uchun express-async-errors yoki wrapper kerak emas. Lekin setTimeout yoki event callback ichidagi throw Promise zanjirida emas — uni o'zim ushlashim kerak."

**Esda tuting:** handler ichida `setTimeout` yoki event callback'da `throw` qilish — bu Promise zanjirida emas, Express uni ushlay olmaydi.

## Q2. Express 5 da marshrut sintaksisi nima o'zgardi? / What changed in Express 5 route path syntax?

**Oddiy qilib aytganda:** marshrut (route) — manzil naqshi: "/users/:id". Express 5 da naqsh yozish qoidalari soddalashtirildi va xavfsizroq bo'ldi: yulduzcha endi nomga ega bo'lishi kerak (*splat), ixtiyoriy qism esa figurali qavsda {/:page}.

**Batafsilroq:**
Express 5 `path-to-regexp` ning yangi versiyasiga o'tdi — ReDoS xavfi tug'diradigan murakkab naqshlar olib tashlandi:

| Express 4 | Express 5 | Ma'nosi |
|---|---|---|
| `/files/*` | `/files/*splat` | wildcard endi **nomli** bo'lishi shart |
| `/:id?` | `/{:id}` | ixtiyoriy qism `{}` ichida |
| `/user/:id(\\d+)` | yo'q | ichki RegExp olib tashlandi — validatsiyani handler/middleware'da qiling |

```js
import express from "express";
const app = express();
app.get("/files/*splat", (req, res) => res.json(req.params.splat)); // /files/a/b → ["a","b"]
app.get("/posts{/:page}", (req, res) => res.json({ page: req.params.page ?? "1" }));
```

`req.params.splat` massiv qaytaradi (har bir segment alohida).

**Intervyuda shunday ayting:** "Express 5 path-to-regexp'ning yangi versiyasiga o'tdi: wildcard nomli bo'lishi shart (/*splat), ixtiyoriy qism {} ichida, ichki RegExp esa olib tashlandi — bu ReDoS xavfini kamaytiradi. Parametr validatsiyasini endi handler yoki middleware'da qilaman."

## Q3. Express 5 da yana qaysi breaking change'lar bor? / What other breaking changes does Express 5 introduce?

**Oddiy qilib aytganda:** Express 5 — eski uyni ta'mirlash: ba'zi eskirgan narsalar olib tashlandi (app.del, req.param), ba'zilari xavfsizroq qilindi (req.query endi ichma-ich obyekt yaratmaydi). Ko'chishdan oldin qaysi "mebel" o'zgarganini bilish kerak.

**Batafsilroq:**
- `req.body` body parser ulanmagan bo'lsa `undefined` (4 da `{}` edi).
- `req.query` default parser `"simple"` — `?a[b]=1` endi ichma-ich obyekt bermaydi (prototype pollution xavfini kamaytiradi). Kerak bo'lsa `app.set("query parser", "extended")`.
- Olib tashlangan: `app.del()` → `app.delete()`, `req.param()`, `res.sendfile()` → `res.sendFile()`, `res.json(obj, status)` → `res.status(s).json(obj)`, `res.redirect("back")`.
- `res.status()` faqat 100–999 oralig'idagi butun sonni qabul qiladi.
- Node.js 18+ talab qilinadi.

Migratsiya: rasmiy `npx codemod@latest @expressjs/v5-migration-recipe` ko'p o'zgarishlarni avtomatik qiladi, qolganini testlar ushlashi kerak.

**Intervyuda shunday ayting:** "Asosiy o'zgarishlar: body parser'siz req.body undefined, query parser default 'simple', olib tashlangan app.del, req.param, res.sendfile, res.status faqat haqiqiy kodlarni qabul qiladi, Node 18+ talab qilinadi. Ko'chishni rasmiy codemod bilan boshlab, qolganini testlar bilan tekshiraman."

## Q4. Middleware zanjiri ichkarida qanday ishlaydi? / How does the middleware chain work internally?

**Oddiy qilib aytganda:** middleware zanjiri — aeroportdagi tekshiruv punktlari. So'rov ularni qo'shilgan tartibda birma-bir o'tadi. Har punkt yo o'tkazib yuboradi (next), yo o'zi javob beradi, yo xato bo'lsa to'g'ridan-to'g'ri "favqulodda xonaga" (xato middleware'iga) yuboradi.

**Batafsilroq:**
`app.use` / `app.get` qo'shgan har bir funksiya ichki ro'yxatga (router stack) qo'shiladi. So'rov kelganda Express ro'yxatni **qo'shilgan tartibda** aylanadi va yo'lga mos keladigan birinchi funksiyani chaqiradi:

- `next()` — keyingi mos middleware'ga o'tish.
- `next(err)` — oddiy middleware'larni o'tkazib, **4 argumentli** `(err, req, res, next)` xato handler'ga o'tish.
- `next("route")` — joriy marshrutning qolgan handler'larini o'tkazib yuborish.
- javob yuborish (`res.json`) va `next()` ni chaqirmaslik — zanjirni tugatish.

```js
import express from "express";
const app = express();
const timing = (req, res, next) => {
  const start = performance.now();
  res.on("finish", () => console.log(req.method, req.url, res.statusCode, `${(performance.now() - start).toFixed(1)}ms`));
  next();
};
app.use(timing);            // birinchi — hammasini o'lchaydi
app.use(express.json({ limit: "100kb" }));
app.get("/health", (req, res) => res.json({ ok: true }));
app.use((req, res) => res.status(404).json({ error: "topilmadi" })); // oxirida — 404
```

**Tartib muhim:** xato handler barcha marshrutlardan keyin, 404 handler xato handler'dan oldin turadi.

**Intervyuda shunday ayting:** "Express middleware'larni qo'shilgan tartibda, yo'lga mos keladiganlarini chaqiradi. next() — keyingisiga, next(err) — oddiylarni o'tkazib, 4 argumentli xato handler'iga, next('route') — marshrutning qolgan handler'larini o'tkazib yuborish. Tartib muhim: 404 handler marshrutlardan keyin, xato handler eng oxirida."

## Q5. Xato handler'ni production uchun qanday yozasiz? / How do you write a production-grade error handler?

**Oddiy qilib aytganda:** xato handler — shifoxonaning qabulxonasi: bemorga (foydalanuvchiga) faqat tushunarli qisqa ma'lumot beradi, shifokorlar uchun esa to'liq kasallik tarixini (log) yozib qo'yadi. Ichki tafsilotlar (SQL, stack) hech qachon tashqariga chiqmaydi.

**Batafsilroq:**
Talablar: ichki xato tafsilotlarini (stack, SQL) mijozga bermaslik, lekin to'liq loglash; so'rov id bilan bog'lash; allaqachon yuborilgan javobni qayta yubormaslik.

```js
class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err); // stream o'rtasida uzilgan — Express o'zi yopadi
  const status = err instanceof HttpError ? err.status : 500;
  if (status >= 500) console.error({ err, requestId: req.id, path: req.path });
  res.status(status).json({
    error: status >= 500 ? "Ichki xato" : err.message,
    requestId: req.id,
  });
}
```

**Intervyuda shunday ayting:** "Xato handler'da ichki tafsilotlarni mijozga bermayman, lekin to'liq loglayman va requestId bilan bog'layman. Kutilgan xatolar uchun HttpError kabi klasslar, qolganlariga 500. Javob allaqachon yuborilgan bo'lsa (headersSent) — next(err) bilan Express'ga qoldiraman."

## Q6. Express'ni qanday himoyalaysiz? / How do you harden an Express API?

**Oddiy qilib aytganda:** Express'ni himoyalash — uyga qulf, signalizatsiya va panjara qo'yishga o'xshaydi: bitta chora yetarli emas. Sarlavhalar, kiruvchi ma'lumot hajmi va shakli, so'rovlar soni, CORS va timeout'lar — har biri alohida himoya qatlami.

**Batafsilroq:**
1. `app.disable("x-powered-by")` va xavfsizlik sarlavhalari (`helmet` yoki qo'lda: CSP, `X-Content-Type-Options`, `Referrer-Policy`).
2. Body hajmini cheklash: `express.json({ limit: "100kb" })`.
3. Kiruvchi ma'lumotni **schema bilan** tekshirish (Zod, Valibot) — `req.body` ni to'g'ridan-to'g'ri DB'ga yubormaslik.
4. Rate limiting — ko'p replikada umumiy store (Redis) yoki edge'da (Cloudflare, API gateway).
5. CORS'ni aniq ro'yxat bilan: `origin: "*"` + `credentials: true` birga ishlamaydi va xavfli.
6. Proxy orqasida `app.set("trust proxy", 1)` — aks holda `req.ip` va `req.protocol` noto'g'ri, rate limit hammani bitta IP deb biladi.
7. Server timeout'lari: `server.requestTimeout`, `server.headersTimeout` (slowloris'ga qarshi).

**Intervyuda shunday ayting:** "Qatlamli himoya: x-powered-by'ni o'chirish, xavfsizlik sarlavhalari, body hajmi cheklovi, sxema validatsiyasi, umumiy store bilan rate limit, aniq CORS ro'yxati, proxy orqasida to'g'ri trust proxy va server timeout'lari."

## Q7. trust proxy nima va noto'g'ri sozlansa nima bo'ladi? / What does trust proxy do and what breaks if it is wrong?

**Oddiy qilib aytganda:** load balancer orqasida har bir so'rov serverga balanserning manzilidan kelgandek ko'rinadi. Haqiqiy mijoz manzili X-Forwarded-For sarlavhasida yoziladi. trust proxy — Express'ga "bu sarlavhaga qancha ishonish mumkin"ligini aytadi: umuman ishonmasangiz — hamma bitta mijoz, ko'r-ko'rona ishonsangiz — mijoz manzilini soxtalashtira oladi.

**Batafsilroq:**
Load balancer orqasida mijozning haqiqiy IP'si `X-Forwarded-For` sarlavhasida keladi. `trust proxy` Express'ga shu sarlavhaga qancha "hop" ishonishni aytadi.

- **O'chiq bo'lsa:** `req.ip` — LB'ning IP'si. Rate limit hammani bitta mijoz deb bloklaydi; `req.secure` `false`, shuning uchun `secure` cookie'lar yuborilmaydi.
- **`true` qo'yilsa (hammaga ishonish):** mijoz `X-Forwarded-For: 1.2.3.4` yuborib IP'ni soxtalashtiradi va rate limit'ni aylanib o'tadi.
- **To'g'risi:** aniq hop soni (`1` — bitta LB) yoki ishonchli proxy IP/subnet'lari.

**Intervyuda shunday ayting:** "trust proxy o'chiq bo'lsa, req.ip — load balancer'ning IP'si, rate limit hammani bitta mijoz deb bloklaydi va req.secure false bo'ladi. true qo'yilsa, mijoz X-Forwarded-For'ni soxtalashtirib limitni aylanib o'tadi. To'g'risi — aniq hop soni yoki ishonchli proxy manzillari."

## Q8. Express ilovasini qanday test qilasiz? / How do you test an Express app without a real port?

**Oddiy qilib aytganda:** test uchun haqiqiy portni band qilish shart emas — ilovani "fabrika" funksiyasi bilan yaratib, testda vaqtincha, tasodifiy portda ishga tushirasiz. Har test o'zining toza nusxasini oladi — bir test boshqasiga xalaqit bermaydi.

**Batafsilroq:**
Ilovani `listen` qilmasdan eksport qiling, testda `0`-portda ko'taring yoki `supertest` ishlating:

```js
import express from "express";
import assert from "node:assert/strict";
import { test } from "node:test";

function createApp() {
  const app = express();
  app.get("/sum", (req, res) => res.json({ sum: Number(req.query.a) + Number(req.query.b) }));
  return app;
}

test("GET /sum", async () => {
  const server = createApp().listen(0);
  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}/sum?a=2&b=3`);
  assert.deepEqual(await res.json(), { sum: 5 });
  server.close();
});
```

`createApp()` fabrikasi testlarga har safar toza holat beradi va global singleton'lardan qochadi.

**Intervyuda shunday ayting:** "Ilovani createApp() fabrikasi sifatida eksport qilaman: testda listen(0) bilan tasodifiy portda ko'tarib, fetch yoki supertest bilan tekshiraman. Har test toza holat oladi, global singleton'lar yo'q."

## Q9. Express'da fayl yoki katta javobni qanday samarali yuborasiz? / How do you stream large responses in Express?

**Oddiy qilib aytganda:** katta faylni to'liq xotiraga o'qib yuborish — butun kutubxonani bir marta qo'lda ko'tarishga urinishga o'xshaydi. Stream esa kitoblarni birma-bir uzatadi: xotira kam sarflanadi va foydalanuvchi yuklab olishni darhol boshlaydi.

**Batafsilroq:**
Butun faylni xotiraga o'qib `res.send(buffer)` qilish — 100 ta parallel yuklab olishda 100 × fayl hajmi xotira. To'g'risi — stream va backpressure:

```js
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";

app.get("/export.csv", async (req, res, next) => {
  res.type("text/csv");
  try {
    await pipeline(createReadStream("export.csv"), res);
  } catch (error) {
    if (!res.headersSent) next(error); // mijoz uzilsa pipeline oqimni yopadi
  }
});
```

Statik fayllar uchun esa `express.static` (ETag, Range, `Cache-Control`) — yoki umuman CDN.

**Intervyuda shunday ayting:** "Katta javoblarni stream va pipeline bilan yuboraman — xotira doimiy qoladi va backpressure boshqariladi. Mijoz uzilsa pipeline oqimlarni yopadi. Statik fayllar uchun express.static yoki umuman CDN ishlataman."

## Q10. Express'da ko'p replikaga chiqish uchun nimani o'zgartirish kerak? / What must change before running Express on many replicas?

**Oddiy qilib aytganda:** bitta serverdan ko'p serverga o'tish — bitta oshpazdan oshpazlar jamoasiga o'tishga o'xshaydi. Agar retsept daftari faqat bitta oshpazning cho'ntagida bo'lsa (xotiradagi sessiya), boshqalar ishlay olmaydi. Hamma narsa umumiy javonda (Redis, DB, S3) turishi kerak.

**Batafsilroq:**
- **Jarayon xotirasidagi holat** (`express-session` MemoryStore, in-memory rate limit, lokal kesh) — Redis kabi umumiy store'ga.
- **Fayl yuklashlar** lokal diskka emas — obyekt saqlovchiga (S3) to'g'ridan-to'g'ri signed URL orqali.
- **Cron / background ishlar** har replikada ishlab ketmasligi — alohida worker yoki navbat (BullMQ) bilan.
- **Health endpoint'lar:** liveness (jarayon tirikmi) va readiness (DB/Redis ulanganmi) — alohida.
- **Graceful shutdown** va `keepAliveTimeout` > LB idle timeout.

**Intervyuda shunday ayting:** "Replikalardan oldin jarayon xotirasidagi holatni — sessiya, rate limit, kesh — umumiy store'ga ko'chiraman, fayllarni obyekt saqlovchiga, cron'larni alohida worker yoki navbatga. Liveness va readiness'ni ajrataman va graceful shutdown'ni sozlayman."

## Q11. Express, Fastify va NestJS'ni qachon tanlaysiz? / When would you choose Express, Fastify or NestJS?

**Oddiy qilib aytganda:** Express — oddiy asbob qutisi: hamma narsani o'zingiz tanlaysiz. Fastify — tezkor, qoidalari aniq mashina. NestJS — tayyor "uy loyihasi": qayerda nima turishi oldindan belgilangan, katta jamoalar uchun qulay. NestJS o'zi ham ichida Express yoki Fastify'dan foydalanadi.

**Batafsilroq:**
| | Express 5 | Fastify | NestJS |
|---|---|---|---|
| Falsafa | minimal, erkin | tezlik, schema-first | tuzilma, DI, modullar |
| Validatsiya | o'zingiz (Zod) | JSON Schema ichida | pipe'lar, Standard Schema (v12) |
| Qachon | kichik xizmat, prototip, mavjud ekotizim | yuqori RPS, aniq kontraktlar | katta jamoa, ko'p modulli domen |

NestJS o'zi Express (default) yoki Fastify ustida ishlaydi — ya'ni bu "yoki-yoki" emas, abstraksiya darajasini tanlash.

**Intervyuda shunday ayting:** "Kichik xizmat va prototip uchun Express, yuqori RPS va aniq sxemalar uchun Fastify, katta jamoa va ko'p modulli domen uchun NestJS'ni tanlayman. NestJS Express yoki Fastify ustida ishlaydi, ya'ni tanlov — abstraksiya darajasi."

