# Node.js chuqur — runtime ichidan intervyu savollari

> **Kim uchun:** Node.js'da ishlagan, endi "qanday ishlaydi?" darajasida gapira olishni xohlaydigan backend dasturchi.
> **Qanday o'qish kerak:** avval "2025–2026 yangiliklari"ni ko'rib chiqing, keyin savollarni javobni ochmasdan o'zingiz tushuntirib ko'ring.
> **Tekshirilgan:** kod misollari Node.js v26.9.0 da ishga tushirib ko'rilgan (2026-yil 25-sentabr).

---

# 2025–2026 yangiliklari

**Relizlar holati (2026-yil sentabr):**

| Liniya | Holat | Izoh |
|---|---|---|
| Node.js 26 | Current (2026-yil 5-may) | 2026-yil oktabrda LTS bo'ladi |
| Node.js 24 "Krypton" | Active LTS | 2025-yil oktabrdan LTS; production uchun asosiy tanlov |
| Node.js 22 "Jod" | Maintenance LTS | faqat xavfsizlik va muhim tuzatishlar |
| Node.js 20 | End-of-life (2026-yil aprel) | yangilash shart |

**Node.js 26 (2026-yil may):**
- `Temporal` API flag'siz yoqilgan — `Date` o'rniga o'zgarmas (immutable), vaqt zonasini aniq hisobga oladigan sana/vaqt API.
- V8 14.6: `Map.prototype.getOrInsert()` / `getOrInsertComputed()` ("upsert") va `Iterator.concat()`.
- Undici 8 (global `fetch` shu kutubxonada ishlaydi).
- Olib tashlandi: `http.Server.prototype.writeHeader()`, eski `_stream_*` modullari, `--experimental-transform-types` flag'i. `module.register()` runtime darajasida deprecated.

**Node.js 25 (2025-yil oktabr):** V8 14.1 (`JSON.stringify` sezilarli tezlashdi, `Uint8Array` ↔ base64/hex), Web Storage (`localStorage`) flag'siz, permission model'ga `--allow-net`, Corepack distributivdan olib tashlandi.

**Node.js 24 (2025-yil may):** V8 13.6 — `using` / `await using` (explicit resource management), `Float16Array`, `RegExp.escape()`, `Error.isError()`; npm 11; `URLPattern` global; `AsyncLocalStorage` endi `AsyncContextFrame` asosida; permission flag `--experimental-permission` → `--permission`.

**TypeScript'ni to'g'ridan-to'g'ri ishga tushirish:** type stripping 22.6 da flag bilan paydo bo'ldi, 23.6 da default yoqildi va 22.18 orqali LTS liniyaga ham kirdi. `node app.ts` faqat "o'chiriladigan" (erasable) sintaksisni qo'llaydi: `enum`, runtime kodli `namespace`, constructor parameter properties ishlamaydi. TypeScript 5.8+ dagi `"erasableSyntaxOnly": true` shu cheklovni kompilyatorda tekshiradi.

**Manbalar:** [Node.js 26.0.0](https://nodejs.org/en/blog/release/v26.0.0) · [Node.js 25.0.0](https://nodejs.org/en/blog/release/v25.0.0) · [Node.js 24.0.0](https://nodejs.org/en/blog/release/v24.0.0) · [Node.js TypeScript docs](https://nodejs.org/api/typescript.html) · [Release schedule](https://nodejs.org/en/about/previous-releases)

---

# Savollar

## Q1. Event loop fazalari qaysi tartibda ishlaydi? / What are the phases of the Node.js event loop?

**Oddiy qilib aytganda:** event loop — Node.js'ning "ish kuni jadvali". Ofitsiant restoranni aylana bo'ylab qayta-qayta aylanib chiqadi: avval soati kelgan eslatmalar (taymerlar), keyin oshxonadan tayyor buyurtmalar (I/O), keyin "imkon bo'lishi bilan" navbati (setImmediate), oxirida yopilgan stollar. Har bir ishdan keyin esa u shoshilinch kichik ishlarni (Promise'lar) tugatib oladi.

**Batafsilroq:**
Event loop — libuv'dagi cheksiz sikl. Har bir aylanishda (tick) fazalar shu tartibda o'tadi:

1. **timers** — muddati kelgan `setTimeout` / `setInterval` callback'lari.
2. **pending callbacks** — oldingi aylanishdan qolgan ayrim tizim xatolari (masalan, TCP `ECONNREFUSED`).
3. **idle, prepare** — faqat ichki foydalanish uchun.
4. **poll** — yangi I/O hodisalarini kutadi va ularning callback'larini bajaradi. Navbat bo'sh bo'lsa, `setImmediate` yoki taymer bo'lmasa shu yerda bloklanib kutadi.
5. **check** — `setImmediate` callback'lari.
6. **close callbacks** — `socket.on("close")` kabi.

Har bir alohida callback'dan keyin (Node 11 dan beri) avval `process.nextTick` navbati, keyin Promise microtask navbati to'liq bo'shatiladi.

```js
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
Promise.resolve().then(() => console.log("promise"));
process.nextTick(() => console.log("nextTick"));
console.log("sync");
// .mjs (ESM):  sync, promise, nextTick, keyin timeout/immediate
// .cjs (CJS):  sync, nextTick, promise, keyin timeout/immediate
// "timeout" va "immediate" orasidagi tartib asosiy modulda kafolatlanmagan.
```

**Intervyuda shunday ayting:** "Event loop libuv'da fazalardan iborat sikl: timers, pending callbacks, poll, check va close. Har callback'dan keyin avval nextTick, keyin Promise navbati bo'shatiladi. setTimeout(0) va setImmediate tartibi asosiy modulda kafolatlanmagan, I/O callback ichida esa setImmediate doim birinchi."

**Esda tuting:** "`setTimeout(fn, 0)` har doim `setImmediate`dan oldin" deyish. Asosiy modulda tartib jarayon ishga tushish tezligiga bog'liq; I/O callback ichida esa `setImmediate` har doim birinchi, chunki poll fazasidan keyin darhol check fazasi keladi.

## Q2. process.nextTick va queueMicrotask farqi nima? / How does process.nextTick differ from queueMicrotask?

**Oddiy qilib aytganda:** ikkalasi ham "hozirgi ishni tugatib, darhol shuni qil" degani, lekin navbatlari alohida — xuddi kassada ikkita VIP navbat bo'lgandek. Oddiy holatda (callback ichida) nextTick navbati birinchi xizmat ko'radi, keyin Promise'lar.

**Batafsilroq:**
Ikkalasi ham joriy operatsiyadan keyin, event loop keyingi fazaga o'tishidan oldin ishlaydi, lekin navbatlari alohida. Callback (taymer, I/O, CJS modul kodi) tugagach:

- avval `process.nextTick` navbati bo'shatiladi,
- keyin Promise / `queueMicrotask` navbati.

```js
setTimeout(() => {
  Promise.resolve().then(() => console.log("microtask"));
  process.nextTick(() => console.log("nextTick"));
}, 0);
// nextTick, microtask
```

**Intervyuda shunday ayting:** "nextTick va microtask'lar joriy operatsiyadan keyin, event loop keyingi fazaga o'tishidan oldin ishlaydi; callback ichida nextTick birinchi. ES modul yuqori darajasida esa tartib teskari, chunki modul baholanishi o'zi microtask. Yangi kodda queueMicrotask'ni afzal ko'raman, rekursiv nextTick esa I/O'ni och qoldiradi."

**Esda tuting:** xuddi shu ikki qatorni ES modulning yuqori darajasiga (`.mjs`) yozsangiz, natija **teskari** — `microtask`, keyin `nextTick`. Sababi: ESM'ni baholashning o'zi microtask ichida bajariladi, shuning uchun Promise navbati nextTick navbatidan oldin bo'shaydi. CJS'da (`.cjs`) esa tartib yuqoridagidek.

**Esda tuting:** `nextTick` rekursiv chaqirilsa, event loop hech qachon I/O fazasiga o'tolmaydi (I/O starvation). Yangi kodda `queueMicrotask` afzal: u brauzer bilan bir xil standart va xulqi oldindan aytib bo'ladigan.

## Q3. libuv thread pool nimalar uchun ishlatiladi va qachon muammo bo'ladi? / What runs on the libuv thread pool and when does it become a bottleneck?

**Oddiy qilib aytganda:** JavaScript kodingiz — bitta oshpaz. Fayl o'qish, parol hash'lash kabi og'ir ishlarni u 4 ta yordamchiga (thread pool) beradi. Agar 4 tasi ham band bo'lsa, 5-ish navbatda kutadi — hatto oddiy fayl o'qish ham. Tarmoq so'rovlari esa yordamchilarni band qilmaydi, ularni operatsion tizimning o'zi kuzatadi.

**Batafsilroq:**
JavaScript bitta asosiy oqimda bajariladi. Tarmoq I/O (TCP, HTTP) thread pool'ni **ishlatmaydi** — OS mexanizmlari (epoll, kqueue, IOCP) orqali asinxron. Thread pool'ga (default 4 ta oqim) quyidagilar tushadi:

- `fs` ning asinxron funksiyalari (`readFile`, `stat` …);
- `dns.lookup` (lekin `dns.resolve*` emas);
- `crypto.pbkdf2`, `scrypt`, `randomBytes` (callback varianti), `zlib` asinxron funksiyalari.

Muammo: 4 ta og'ir `pbkdf2` bir vaqtda ishlasa, 5-chi fayl o'qish ham navbat kutadi. Yechim — `UV_THREADPOOL_SIZE` ni jarayon **boshlanishidan oldin** oshirish (maksimum 1024) yoki og'ir hisobni alohida xizmat/worker'ga chiqarish.

```js
import { pbkdf2 } from "node:crypto";
const start = performance.now();
for (let i = 0; i < 5; i++) {
  pbkdf2("secret", "salt", 200_000, 64, "sha512", () => {
    console.log(`hash ${i}: ${Math.round(performance.now() - start)} ms`);
  });
}
// 4 ta taxminan bir vaqtda tugaydi, 5-chisi taxminan ikki barobar kechroq
```

**Intervyuda shunday ayting:** "libuv thread pool (default 4 ta) fs, dns.lookup, crypto va zlib'ning asinxron amallari uchun; tarmoq I/O'si epoll/kqueue orqali, pool'siz. Og'ir crypto pool'ni to'ldirib, boshqa fs amallarini kechiktirishi mumkin — UV_THREADPOOL_SIZE'ni oshiraman yoki og'ir hisobni worker yoki alohida xizmatga chiqaraman."

## Q4. Event loop bloklanganini qanday aniqlaysiz? / How do you detect a blocked event loop in production?

**Oddiy qilib aytganda:** event loop bloklansa, server "muzlab qoladi" — xuddi ofitsiant bir mijoz bilan uzoq gaplashib, boshqalarni butunlay unutgandek. Buni sezish uchun "yurak urishi"ni o'lchaysiz: event loop har necha millisekundda aylanishi kerak; kechiksa — kimdir uni band qilgan.

**Batafsilroq:**
Belgilar: p99 latency sakrashi, health-check timeout, CPU bitta yadroda 100%. O'lchash:

```js
import { monitorEventLoopDelay } from "node:perf_hooks";
const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();
setInterval(() => {
  console.log({ p99ms: histogram.percentile(99) / 1e6, maxMs: histogram.max / 1e6 });
  histogram.reset();
}, 10_000).unref();
```

Sababni topish: `node --cpu-prof app.js` (Chrome DevTools'da ochiladigan `.cpuprofile`), `--inspect` bilan jonli profiling. Odatiy aybdorlar: katta `JSON.parse`/`JSON.stringify`, sinxron `fs.*Sync`, katastrofik backtracking qiladigan RegExp (ReDoS), katta massivni sinxron saralash.

**Intervyuda shunday ayting:** "Event loop kechikishini perf_hooks.monitorEventLoopDelay bilan metrika sifatida kuzataman va p99 bo'yicha alert qo'yaman. Sababni --cpu-prof yoki inspector bilan topaman: odatda katta JSON, sinxron fs chaqiruvlari yoki ReDoS'li RegExp. Og'ir hisobni worker'ga chiqaraman yoki bo'laklayman."

## Q5. Streams'da backpressure nima va pipeline nega kerak? / What is backpressure in streams and why use pipeline()?

**Oddiy qilib aytganda:** stream — suvni chelakda emas, shlangda tashish. Backpressure esa shlangdagi bosimni boshqarish: qabul qiluvchi ulgurmasa, manba "biroz to'xta" signalini oladi. pipeline() — shlanglarni xavfsiz ulaydigan va biri teshilsa, hammasini yopadigan mexanizm.

**Batafsilroq:**
Backpressure — tez ishlab chiqaruvchi (masalan, disk) sekin iste'molchini (masalan, sekin mijoz) bosib ketmasligi uchun oqimni sekinlatish. `writable.write()` `false` qaytarsa, ichki bufer `highWaterMark`dan oshgan — yozishni to'xtatib, `"drain"` hodisasini kutish kerak.

`pipe()` backpressure'ni boshqaradi, lekin xatoda oqimlarni yopmaydi — file descriptor sizib chiqadi. `pipeline()` ikkalasini ham hal qiladi:

```js
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";

await pipeline(
  createReadStream("access.log"),
  createGzip(),
  createWriteStream("access.log.gz"),
);
// Istalgan bosqichdagi xato hamma oqimni yopadi va shu yerda throw bo'ladi.
```

Xotira doimiy bo'lib qoladi: 10 GB faylni ham bir necha o'n KB bufer bilan qayta ishlash mumkin. Node 22 dan boshlab stream'larning default `highWaterMark` qiymati 64 KiB.

**Intervyuda shunday ayting:** "Stream'lar ma'lumotni bo'laklab qayta ishlaydi, xotira doimiy qoladi. write() false qaytarsa — drain hodisasini kutish kerak, bu backpressure. Men stream/promises'dagi pipeline() ishlataman: u backpressure'ni boshqaradi, xatoda barcha oqimlarni yopadi va xatoni bitta joyda throw qiladi."

## Q6. Worker threads, cluster va child_process farqi nima? / worker_threads vs cluster vs child_process?

**Oddiy qilib aytganda:** uch xil "yordamchi yollash" usuli: worker_threads — shu ofisda alohida xonada ishlaydigan hamkasb (xotirani ulashish mumkin); cluster — bir xil ofisning bir nechta filiali, bitta telefon raqami bilan; child_process — butunlay boshqa kompaniyaga ish buyurtma qilish (masalan, ffmpeg).

**Batafsilroq:**
| | `worker_threads` | `cluster` | `child_process` |
|---|---|---|---|
| Nima | bitta jarayon ichida qo'shimcha V8 izolyatsiyasi | bir nechta Node jarayoni, bitta port | istalgan tashqi dastur |
| Xotira | `SharedArrayBuffer` orqali ulashish mumkin | ulashilmaydi | ulashilmaydi |
| Maqsad | CPU-og'ir hisob (rasm, hash, parsing) | HTTP'ni yadrolar bo'yicha tarqatish | `ffmpeg`, `git`, skriptlar |

Konteyner davrida `cluster` o'rniga ko'pincha **bir konteynerda bitta jarayon** va replikalar sonini orkestrator (Kubernetes, ECS) boshqaradi — bu sog'liq tekshiruvi, restart va autoscaling'ni soddalashtiradi.

```js
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url), { workerData: 40 });
  worker.once("message", (value) => console.log("fib =", value));
} else {
  const fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2));
  parentPort.postMessage(fib(workerData));
}
```

**Intervyuda shunday ayting:** "worker_threads — bir jarayonda CPU-og'ir hisob uchun, SharedArrayBuffer bilan xotira ulashish mumkin. cluster — bir nechta Node jarayoni bitta portda, yadrolar bo'yicha tarqatish. child_process — tashqi dasturlar. Konteyner muhitida cluster o'rniga odatda bir jarayonli konteynerlar sonini orkestrator boshqaradi."

## Q7. AsyncLocalStorage nima va qayerda ishlatiladi? / What is AsyncLocalStorage used for?

**Oddiy qilib aytganda:** AsyncLocalStorage — so'rovga yopishtirilgan "ko'rinmas yorliq". Siz yorliqqa request ID'ni yozasiz, keyin shu so'rov bilan bog'liq har qanday funksiya — hatto bir necha await'dan keyin ham — yorliqni o'qiy oladi. Parametrni har bir funksiyaga qo'lda uzatish shart emas.

**Batafsilroq:**
So'rov kontekstini (request id, foydalanuvchi, tranzaksiya) funksiyadan funksiyaga argument sifatida uzatmasdan, butun asinxron zanjir bo'ylab saqlash.

```js
import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";

const context = new AsyncLocalStorage();
const log = (message) => console.log(`[${context.getStore()?.requestId ?? "-"}] ${message}`);

async function handler() {
  await new Promise((resolve) => setTimeout(resolve, 10));
  log("DB so'rovi tugadi"); // requestId avtomatik topiladi
}

context.run({ requestId: randomUUID() }, handler);
```

Loglash kutubxonalari, OpenTelemetry tracing va NestJS'dagi CLS modullari shu mexanizmga tayanadi. Node 24 dan beri u `AsyncContextFrame` ustida ishlaydi — oldingi `async_hooks` asosidagi realizatsiyadan tezroq.

**Intervyuda shunday ayting:** "AsyncLocalStorage asinxron zanjir bo'ylab kontekstni saqlaydi: request id, foydalanuvchi, tranzaksiya. Logging va tracing kutubxonalari shunga tayanadi. Node 24 dan u AsyncContextFrame ustida ishlaydi va tezroq. NestJS'da request-scoped provider o'rniga shu yondashuv (nestjs-cls) samaraliroq."

## Q8. Node.js'da xotira sizib chiqishini qanday topasiz? / How do you find a memory leak in Node.js?

**Oddiy qilib aytganda:** xotira sizishi — uyga kiritilgan, lekin hech qachon chiqarilmaydigan buyumlar: asta-sekin uy to'lib, yurishga joy qolmaydi. Heap snapshot — ikki vaqtdagi uy suratlarini solishtirib, qaysi buyumlar ko'payganini va ularni kim ushlab turganini topish.

**Batafsilroq:**
1. **Tasdiqlash:** `process.memoryUsage().heapUsed` yuk ostida faqat o'sadimi (GC'dan keyin ham)?
2. **Snapshot:** `node --heapsnapshot-signal=SIGUSR2 app.js`, keyin `kill -USR2 <pid>` ikki marta (yuk oldidan va keyin). Chrome DevTools → Memory → "Comparison".
3. **Retainers** zanjiriga qarang: obyektni kim ushlab turibdi?

Tipik sabablar: cheklovsiz `Map` kesh (TTL/LRU yo'q), olib tashlanmagan `EventEmitter` listener'lari (`MaxListenersExceededWarning` — birinchi signal), yopilmagan taymerlar, closure katta obyektni ushlab qolishi.

**Intervyuda shunday ayting:** "Avval heapUsed'ning GC'dan keyin ham o'sishini tasdiqlayman, keyin yukdan oldin va keyin heap snapshot olib, Comparison rejimida o'sgan obyektlarning retainer zanjirini tekshiraman. Tipik sabablar: chegarasiz kesh, olib tashlanmagan listener, yopilmagan taymer. --max-old-space-size muammoni hal qilmaydi, faqat kechiktiradi."

**Esda tuting:** `--max-old-space-size` limitni oshiradi, lekin sizishni tuzatmaydi — faqat qulashni kechiktiradi. Konteynerda Node heap'ni cgroup xotira limitiga qarab o'zi moslaydi, lekin native buferlar (`Buffer`) heap'dan tashqarida hisoblanadi.

## Q9. HTTP serverni to'g'ri (graceful) qanday to'xtatasiz? / How do you shut down an HTTP server gracefully?

**Oddiy qilib aytganda:** do'konni yopish: avval eshikka "yopiq" yozuvini osasiz (yangi xaridor kirmasin), ichkaridagilarga xaridini tugatishga vaqt berasiz, keyin chiroqni o'chirasiz. Serverni birdan o'chirsangiz — ichkaridagi xaridorlar (so'rovlar) yarim yo'lda qoladi.

**Batafsilroq:**
Orkestrator konteynerni to'xtatishda `SIGTERM` yuboradi va bir necha soniyadan keyin `SIGKILL`. To'g'ri ketma-ketlik:

1. Readiness endpoint'ni `503` qilish — load balancer yangi trafik yubormasin.
2. `server.close()` — yangi ulanishlarni qabul qilmaslik.
3. Bo'sh keep-alive ulanishlarni yopish, ishlayotgan so'rovlarni tugatishga vaqt berish.
4. DB/Redis ulanishlarini yopish, keyin chiqish.

```js
import http from "node:http";

const server = http.createServer((req, res) => res.end("ok"));
server.listen(3000);

process.once("SIGTERM", () => {
  server.close(() => process.exit(0));          // faol so'rovlar tugagach
  server.closeIdleConnections();                // bo'sh keep-alive'larni hozir yopish
  setTimeout(() => process.exit(1), 10_000).unref(); // osilib qolsa majburan
});
```

Load balancer orqasida `server.keepAliveTimeout` LB'ning idle timeout'idan katta bo'lishi kerak (masalan, 65 s > 60 s), aks holda LB yopilgan ulanishni qayta ishlatib, tasodifiy `502` oladi.

**Intervyuda shunday ayting:** "SIGTERM kelganda readiness'ni o'chiraman, server.close() bilan yangi ulanishlarni to'xtataman, bo'sh keep-alive ulanishlarni yopaman, faol so'rovlarga muddat beraman, keyin DB va Redis'ni yopaman. Majburiy chiqish uchun taymer qo'yaman. keepAliveTimeout load balancer'ning idle timeout'idan katta bo'lishi kerak."

## Q10. ESM va CommonJS birga qanday ishlaydi? require(esm) nima o'zgartirdi? / How do ESM and CommonJS interoperate, and what did require(esm) change?

**Oddiy qilib aytganda:** ESM va CommonJS — kodni ulashning ikki "tili". CommonJS (require) — eski, sinxron; ESM (import) — yangi standart, oldindan tahlil qilinadi. require(esm) — ikki til orasidagi tarjimon: eski kod endi yangi modullarni ham chaqira oladi.

**Batafsilroq:**
- ESM (`import`) asinxron yuklanadi, statik tahlil qilinadi, top-level `await` mumkin. CJS (`require`) sinxron.
- ESM'dan CJS'ni `import` qilish har doim mumkin edi.
- **`require(esm)`**: Node 23 da flag'siz yoqildi va 22.12 hamda 20.19 ga backport qilindi — endi CJS kod ESM modulni `require()` qila oladi, **agar u modulda top-level `await` bo'lmasa**. Bu ESM-only kutubxonalarga o'tishni ancha osonlashtirdi (NestJS 12 ham shu sababli ESM'ga o'tdi, eski CJS ilovalar ishlashda davom etadi).

Qaysi rejim tanlanishi: `.mjs` → ESM, `.cjs` → CJS, `.js` → eng yaqin `package.json`dagi `"type"` maydoni.

**Intervyuda shunday ayting:** "ESM statik va asinxron, top-level await'ni qo'llaydi; CJS sinxron. Node 22.12 va 20.19 dan require(esm) flag'siz ishlaydi — CJS kod ESM modulni require qila oladi, agar unda top-level await bo'lmasa. Rejimni fayl kengaytmasi va package.json'dagi type maydoni belgilaydi."

## Q11. Node.js permission model nima beradi? / What does the Node.js permission model provide?

**Oddiy qilib aytganda:** permission model — dasturga beriladigan "ruxsatnoma": qaysi papkani o'qishi, qayerga yozishi, internetga chiqishi mumkinligi oldindan yoziladi. Zararli kutubxona tasodifan sizning .env faylingizni o'qimoqchi bo'lsa ham, ruxsatnomada yo'q bo'lsa — ololmaydi.

**Batafsilroq:**
`--permission` bilan ishga tushirilgan jarayon default holatda fayl tizimi, child process, worker va (Node 25 dan) tarmoqqa kira olmaydi — faqat aniq ruxsat berilganlarga:

```bash
node --permission --allow-fs-read=./data --allow-fs-write=./tmp app.js
```

Kodda tekshirish: `process.permission.has("fs.read", "./data")`. Bu **qo'shimcha himoya qatlami** (masalan, zararli dependency diskdagi `.env`ni o'qiy olmasligi uchun), lekin konteyner izolyatsiyasi, least-privilege foydalanuvchi va sirlarni boshqarishni almashtirmaydi.

**Intervyuda shunday ayting:** "--permission bilan jarayon default holatda fayl tizimi, child process, worker va Node 25 dan tarmoqqa kira olmaydi — faqat --allow-* bilan berilganlarga. Bu supply-chain xavflariga qarshi qo'shimcha qatlam, lekin konteyner izolyatsiyasi va least-privilege'ni almashtirmaydi."

## Q12. Global fetch qanday ishlaydi va nimaga e'tibor berish kerak? / What should you know about the global fetch in Node.js?

**Oddiy qilib aytganda:** Node.js'dagi fetch — brauzerdagi fetch'ning o'zi, lekin ichida Undici kutubxonasi ishlaydi. Muhim farq: u sizni hech qachon "kutishdan charchab" to'xtatmaydi — timeout default yo'q, shuning uchun uni har doim o'zingiz qo'yasiz.

**Batafsilroq:**
Node'dagi `fetch` — **Undici** kutubxonasi ustida (Node 26 da Undici 8). Amaliy nuqtalar:

- **Timeout default yo'q** — har doim `AbortSignal.timeout(ms)` bering.
- Ulanishlar pool'da qayta ishlatiladi; ko'p so'rovli xizmatda `undici`dagi `Agent` sozlamalari (ulanishlar soni, keep-alive) orqali boshqariladi.
- Javob tanasi o'qilmasa (`await res.text()` / `res.body.cancel()`), ulanish pool'ga qaytmaydi.

```js
const response = await fetch("https://api.github.com/rate_limit", {
  signal: AbortSignal.timeout(5_000),
  headers: { "user-agent": "interview-notes" },
});
if (!response.ok) throw new Error(`HTTP ${response.status}`);
console.log((await response.json()).rate);
```

**Intervyuda shunday ayting:** "Global fetch Undici ustida ishlaydi va ulanishlarni pool'da qayta ishlatadi. Default timeout yo'q, shuning uchun har so'rovga AbortSignal.timeout beraman, javob tanasini doim o'qiyman yoki bekor qilaman — aks holda ulanish pool'ga qaytmaydi. Ko'p so'rovli xizmatda Undici Agent sozlamalarini tuzaman."

## Q13. using / await using qanday resurslarni boshqaradi? / How does explicit resource management (using) work in Node.js?

**Oddiy qilib aytganda:** using — "ishim tugashi bilan o'zingni tozala" degan va'da. Xuddi mehmonxona xonasi: chiqib ketganingizda (blokdan chiqqanda) xona avtomatik tozalanadi — xato bo'lsa ham. try/finally'ni qo'lda yozish shart emas.

**Batafsilroq:**
`using` e'lon qilingan o'zgaruvchi blokdan chiqishda (xato bo'lsa ham) `[Symbol.dispose]()`, `await using` esa `[Symbol.asyncDispose]()` chaqiradi — `try/finally`ni avtomatlashtiradi. V8 13.6 orqali Node 24 dan beri ishlaydi (standartga ES2027 da kiradi).

```js
class Connection {
  constructor(name) { this.name = name; console.log("open", name); }
  async [Symbol.asyncDispose]() { console.log("close", this.name); }
}

async function job() {
  await using db = new Connection("db");
  await using cache = new Connection("cache");
  console.log("ishlash");
} // teskari tartibda yopiladi: cache, keyin db

await job();
```

**Intervyuda shunday ayting:** "using va await using blokdan chiqishda Symbol.dispose yoki Symbol.asyncDispose'ni avtomatik chaqiradi, xato bo'lsa ham, teskari tartibda. Bu fayl, ulanish va lock'lar uchun try/finally'ni almashtiradi. Node 24 da V8 13.6 orqali ishlaydi, standartga ES2027 da kiradi."

## Q14. Temporal API Date'dan nimasi bilan yaxshi? / Why is Temporal better than Date?

**Oddiy qilib aytganda:** Date — eski, noqulay soat: oylar 0 dan boshlanadi, vaqt zonalari bilan chalkashadi, o'zgartirsangiz asl qiymat ham o'zgaradi. Temporal — yangi, aniq soat: har xil vaziyat uchun alohida tur (faqat sana, faqat vaqt, zona bilan vaqt), qiymatlar o'zgarmaydi.

**Batafsilroq:**
`Date` o'zgaruvchan (mutable), oylar 0 dan boshlanadi, vaqt zonasi faqat "UTC yoki mahalliy". `Temporal` (Node 26 da flag'siz, TC39'da Stage 4, ES2027 ga kiradi):

- Obyektlar o'zgarmas — `add()` yangi qiymat qaytaradi.
- Aniq turlar: `PlainDate` (faqat sana), `PlainTime`, `ZonedDateTime` (zona bilan), `Instant` (mutlaq nuqta), `Duration`.
- Yozgi vaqtga o'tish va zonalar orasidagi arifmetika to'g'ri.

```js
const meeting = Temporal.ZonedDateTime.from("2026-03-28T09:00[Europe/Berlin]");
const nextWeek = meeting.add({ weeks: 1 }); // yozgi vaqtga o'tishni to'g'ri hisoblaydi
console.log(nextWeek.toString());          // 2026-04-04T09:00:00+02:00[Europe/Berlin]
console.log(meeting.withTimeZone("Asia/Tashkent").toPlainTime().toString()); // 13:00:00
```

**Intervyuda shunday ayting:** "Temporal immutable va turlari aniq: PlainDate, PlainTime, ZonedDateTime, Instant, Duration. U vaqt zonalari va yozgi vaqtga o'tishni to'g'ri hisoblaydi. Node 26 da flag'siz ishlaydi, TC39'da Stage 4, standartga ES2027 da kiradi. Yangi kodda sana arifmetikasi uchun Date o'rniga Temporal'ni tanlayman."

## Q15. Node.js'ning o'zida test yozish mumkinmi? / Can you test with Node.js alone, without Jest?

**Oddiy qilib aytganda:** Node.js'ning o'zida testlash asboblari bor — alohida Jest o'rnatmasdan node --test bilan testlarni ishga tushirasiz. Oshxonada o'z pichog'ingiz bo'lsa, boshqasini sotib olish shart emas.

**Batafsilroq:**
Ha: `node:test` va `node:assert` barqaror. Jest'siz ham subtest, mock, taymer mock, coverage (`--experimental-test-coverage`), watch rejimi bor. Node 24 dan subtest'larni `await` qilish shart emas.

```js
import { test, mock } from "node:test";
import assert from "node:assert/strict";

test("retry uchinchi urinishda muvaffaqiyatli", async () => {
  const call = mock.fn(async () => {
    if (call.mock.callCount() < 2) throw new Error("vaqtincha");
    return "ok";
  });
  const retry = async (fn, times) => { for (;;) { try { return await fn(); } catch (e) { if (--times === 0) throw e; } } };
  assert.equal(await retry(call, 3), "ok");
  assert.equal(call.mock.callCount(), 3);
});
```

Ishga tushirish: `node --test` (fayllarni o'zi topadi). Shu loyihaning API testlari ham `node:test` bilan yozilgan.

**Intervyuda shunday ayting:** "node:test va node:assert barqaror: subtest, mock, taymer mock, coverage va watch rejimi bor. Kichik va o'rta loyihalarda kamroq dependency uchun shuni ishlataman; kodni tsx yoki type stripping bilan TypeScript'da ham ishga tushirish mumkin. Bu portalning API testlari ham node:test'da."

## Q16. Node.js ilovasini million bir vaqtdagi foydalanuvchiga qanday tayyorlaysiz? / How do you design a Node.js service for a million concurrent users?

**Oddiy qilib aytganda:** million foydalanuvchiga xizmat qilish — bitta oshpazni tezlashtirish emas, oshxonani to'g'ri tashkil qilish: tayyor taomlarni (hamma uchun bir xil ma'lumot) oldindan tarqatib qo'yasiz (CDN), oshpazlar sonini kerakka qarab oshirasiz (stateless replikalar), buyurtmalarni guruhlab olasiz (batching).

**Batafsilroq:**
Asosiy fikr: **Node jarayonini yukdan himoya qiling**, uni kattalashtirishga urinmang.

1. **Statik va hamma uchun bir xil ma'lumotni CDN'ga chiqaring.** Shu portalda savol-javob katalogi build vaqtida kontent-hash nomli JSON bo'laklarga yoziladi (`immutable` kesh), shuning uchun o'qish trafigining deyarli hammasi Node'ga yetib bormaydi.
2. **API'ni stateless qiling.** Sessiya, progress va keshni jarayon xotirasida emas, Redis/DB'da saqlang — shunda replikalarni istalgancha qo'shish mumkin.
3. **Yozishlarni guruhlang.** Har bir bosishda so'rov emas: klient bir necha soniyada bitta `PUT` bilan paket yuboradi.
4. **Singleton'lardan qoching.** Telegram bot long-polling faqat bitta nusxada ishlaydi — ko'p replikada webhook rejimiga o'ting.
5. **Chegaralar va kuzatuv:** rate limit (edge'da), readiness/liveness endpoint'lari, event loop delay, p99 latency metrikalari; yuk testi (k6, autocannon) natijasiga qarab replikalar sonini hisoblang.

Taxminiy hisob: 1 mln faol foydalanuvchi har 30 s da bitta baho qo'ysa ≈ 33 000 yozuv/s. Guruhlash buni bir necha barobar kamaytiradi; bitta Node replikasi odatda 5–10 ming oddiy JSON so'rov/s ko'taradi, Redis bitta shard'da 100 000+ oddiy operatsiya/s.

**Intervyuda shunday ayting:** "Umumiy va o'zgarmas ma'lumotni CDN'ga chiqaraman, API'ni stateless qilib holatni Redis yoki DB'da saqlayman, yozuvlarni klientda guruhlayman va singleton ishlarni (bot polling, cron) alohida boshqaraman. Sig'imni raqamlar bilan hisoblab, yuk testi bilan tasdiqlayman."

## Q17. Node.js ilovasida eng ko'p uchraydigan xavfsizlik xatolari qaysilar? / What are the most common security mistakes in Node.js services?

**Oddiy qilib aytganda:** xavfsizlik xatolarining ko'pchiligi oddiy: foydalanuvchi ma'lumotiga ko'r-ko'rona ishonish. Eshikni ochiq qoldirish (validatsiyasiz kiritish), kalitni devorga osib qo'yish (sirlarni loglash), notanish odamga uy kalitini berish (tekshirilmagan kutubxona).

**Batafsilroq:**
- **Prototype pollution** — foydalanuvchi JSON'ini `Object.assign`/chuqur merge bilan birlashtirish (`__proto__` kaliti). Yechim: schema validatsiya (Zod, Valibot), `Object.create(null)`, `Map`.
- **ReDoS** — foydalanuvchi matniga katastrofik RegExp. Yechim: oddiy naqshlar, uzunlik cheklovi.
- **Sirlarni loglash** — token, `initData`, parol. Logger'da redaction.
- **Timeout'siz tashqi chaqiruvlar** — bitta sekin xizmat butun pool'ni to'ldiradi.
- **Supply chain** — `npm ci` va lockfile, `npm audit`, install script'larni cheklash (npm 11 da install-scripts ruxsatini boshqarish mumkin), kam va ishonchli dependency.
- **Imzoni oddiy `===` bilan solishtirish** — `crypto.timingSafeEqual` ishlating (shu loyihaning Telegram `initData` tekshiruvi kabi).

**Intervyuda shunday ayting:** "Eng keng tarqalganlari: prototype pollution, ReDoS, sirlarni loglash, timeout'siz tashqi chaqiruvlar, supply-chain va imzoni oddiy tenglik bilan solishtirish. Himoya: sxema validatsiyasi, uzunlik cheklovlari, logger redaction, har chaqiruvga timeout, lockfile va audit, crypto.timingSafeEqual."

## Q18. node --watch, --env-file va node --run nima uchun kerak? / What do node --watch, --env-file and node --run replace?

**Oddiy qilib aytganda:** ilgari har bir qulaylik uchun alohida paket kerak edi: fayl o'zgarsa qayta ishga tushirish — nodemon, .env o'qish — dotenv. Endi bular Node.js'ning o'zida bor — kamroq paket, kamroq xavf.

**Batafsilroq:**
Ilgari alohida paketlar kerak bo'lgan ishlar endi Node'ning o'zida:

- `node --watch app.js` — fayl o'zgarganda qayta ishga tushirish (`nodemon` o'rniga).
- `node --env-file=.env app.js` — `.env`ni `process.env`ga yuklash (`dotenv` o'rniga); `--env-file-if-exists` fayl bo'lmasa xato bermaydi.
- `node --run build` — `package.json` skriptini npm'siz, tezroq ishga tushirish.
- `node app.ts` — erasable TypeScript'ni build'siz ishga tushirish.

Afzallik: kamroq dependency — kamroq supply-chain xavfi va tezroq CI.

**Intervyuda shunday ayting:** "node --watch nodemon'ni, --env-file dotenv'ni, node --run npm skriptlarini, type stripping esa TypeScript uchun alohida runner'ni almashtiradi. Kamroq dependency — kamroq supply-chain xavfi va tezroq CI."

