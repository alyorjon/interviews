# 🟩 2. JavaScript Backend (Node.js, Express & NestJS) — oddiy tilda

> **Kim uchun:** backend'ni endi o'rganayotganlar. Har bir savol oddiy tilda, hayotiy misol bilan tushuntirilgan; murakkab so'zlar birinchi uchraganda qavs ichida izohlanadi.
> **Qanday o'qish kerak:** avval "Oddiy qilib aytganda" qismini o'qing. Tushungach, "Batafsilroq" va kodga o'ting. Oxiridagi "Intervyuda shunday ayting" — tayyor javob.
> **Keyingi qadam:** shu mavzularning chuqurroq varianti — `nodejs_chuqur.md`, `express_chuqur.md`, `nestjs_chuqur.md`.

---

# Kichik lug'at — avval shu so'zlarni tanib oling

| So'z | Oddiy ma'nosi |
|---|---|
| **Server** | boshqa kompyuterlardan kelgan so'rovlarga javob beradigan dastur |
| **So'rov (request)** | brauzer yoki ilova serverga yuborgan "iltimos": "menga foydalanuvchilar ro'yxatini ber" |
| **Javob (response)** | server qaytargan natija |
| **Node.js** | JavaScript'ni brauzerdan tashqarida, masalan serverda ishga tushiradigan dastur |
| **Express** | Node.js'da server yozishni osonlashtiradigan kichik kutubxona |
| **NestJS** | Node.js'da katta va tartibli server yozish uchun tayyor "karkas" (framework) |
| **Asinxron** | "kutib o'tirmasdan": ish tugashini kutish o'rniga, tugaganda xabar berishni so'rab, boshqa ishga o'tish |
| **Thread (oqim)** | kompyuter bir vaqtda bajaradigan alohida "ishchi" |

---

# Savollar

## Q1. Node.js bir vaqtning o'zida ko'p ishni qanday bajaradi? / How does Node.js handle many tasks at once?

**Oddiy qilib aytganda:** Node.js — bitta ofitsiant ishlaydigan restoranga o'xshaydi. Ofitsiant buyurtmani oshxonaga beradi va ovqat pishishini **kutib turmaydi** — keyingi stolga o'tadi. Ovqat tayyor bo'lganda oshpaz qo'ng'iroq chaladi va ofitsiant uni olib boradi. Shuning uchun bitta ofitsiant yuzlab stolga xizmat qila oladi.

**Batafsilroq:**
- Sizning JavaScript kodingiz **bitta oqimda** (bitta "ofitsiant") ishlaydi.
- Sekin ishlarni — faylni o'qish, bazaga so'rov, boshqa serverga murojaat — Node.js "oshxonaga" beradi. Oshxona — bu **libuv** (Node.js ichidagi yordamchi kutubxona) va operatsion tizim.
- Fayl o'qish kabi ba'zi ishlarni libuv o'zining **thread pool**'ida (odatda 4 ta yordamchi ishchi) bajaradi. Tarmoq so'rovlarini esa operatsion tizimning o'zi kuzatadi.
- Ish tugaganda natija navbatga qo'yiladi. **Event loop** (hodisalar sikli — ofitsiantning "qaysi stol tayyor?" deb aylanib yurishi) navbatdagi natijani olib, sizning funksiyangizni chaqiradi.

**Misol:**

```js
import { readFile } from "node:fs/promises";

console.log("1. Faylni o'qishni boshladim");
const promise = readFile(new URL(import.meta.url), "utf8"); // oshxonaga buyurtma berildi
console.log("2. Kutmasdan boshqa ishni qilyapman");
const text = await promise;                                // tayyor bo'lganda olamiz
console.log(`3. Fayl tayyor: ${text.length} ta belgi`);
```

Natija tartibi: `1`, `2`, `3` — fayl o'qilayotganda dastur to'xtab qolmadi.

**Intervyuda shunday ayting:** "Node.js JavaScript'ni bitta oqimda bajaradi, lekin sekin I/O ishlarini libuv va operatsion tizimga topshiradi. Ish tugaganda event loop callback'ni chaqiradi. Shuning uchun bitta jarayon ko'p ulanishga xizmat qila oladi — agar kod og'ir hisob bilan asosiy oqimni band qilmasa."

**Esda tuting:** "Node.js bitta oqimli, demak sekin" degan fikr xato. U **kutishda** tejaydi, **og'ir hisobda** esa haqiqatan qiynaladi (buni Q10 da ko'ramiz).

## Q2. Express'da middleware nima va next() nima qiladi? / What is middleware in Express and what does next() do?

**Oddiy qilib aytganda:** aeroportdagi tekshiruv bosqichlarini tasavvur qiling: pasport nazorati → bagaj tekshiruvi → samolyotga chiqish. Har bir bosqich yo'lovchini tekshiradi va "o'tavering" deydi (`next()`) yoki to'xtatadi. Express'da har bir so'rov xuddi shunday "bosqichlar zanjiri"dan o'tadi. Har bir bosqich — **middleware**.

**Batafsilroq:**
- Middleware — `(req, res, next)` qabul qiladigan oddiy funksiya. `req` — kelgan so'rov, `res` — yuboriladigan javob.
- Middleware uch ishdan birini qiladi:
  1. so'rovga biror narsa qo'shib, `next()` bilan keyingisiga o'tkazadi;
  2. javob yuborib, zanjirni tugatadi (`res.json(...)`);
  3. xato bo'lsa `next(err)` bilan to'g'ridan-to'g'ri xato bilan ishlaydigan bosqichga o'tkazadi.
- Tartib muhim: middleware'lar **qo'shilgan tartibda** ishlaydi.
- Agar middleware na `next()`ni chaqirsa, na javob yuborsa — so'rov "osilib qoladi", brauzer abadiy kutadi.

**Misol:**

```typescript
import express from "express";
const app = express();

// 1-bosqich: har so'rovni yozib boradi
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // keyingi bosqichga o'tkazish
});

// 2-bosqich: kalit so'raydi
app.use((req, res, next) => {
  if (req.headers["x-api-key"] !== "secret") {
    return res.status(401).json({ error: "Kalit noto'g'ri" }); // shu yerda to'xtaydi
  }
  next();
});

// Oxirgi bosqich: haqiqiy javob
app.get("/hello", (req, res) => res.json({ message: "Salom!" }));
app.listen(3000);
```

**Intervyuda shunday ayting:** "Middleware — so'rov va javob orasida ishlaydigan funksiya. U so'rovni tekshiradi yoki o'zgartiradi, keyin `next()` bilan keyingisiga uzatadi yoki javob yuborib zanjirni tugatadi. Autentifikatsiya, log va body parsing odatda middleware bo'ladi."

**Esda tuting:** xato bilan ishlaydigan middleware'da **to'rtta** parametr bo'ladi: `(err, req, res, next)`. U barcha marshrutlardan keyin qo'yiladi.

## Q3. NestJS'da Dependency Injection nima? / What is Dependency Injection in NestJS?

**Oddiy qilib aytganda:** oshpaz ovqat pishirish uchun bozorga o'zi bormaydi — ta'minotchi kerakli mahsulotni oshxonaga olib keladi. Oshpaz faqat "menga pomidor kerak" deydi. **Dependency Injection (DI)** — "bog'liqlikni tashqaridan berish" degani: klass kerakli yordamchini **o'zi yaratmaydi**, uni NestJS tayyorlab beradi.

**Batafsilroq:**
- **Dependency (bog'liqlik)** — klassga ishlashi uchun kerak bo'lgan boshqa klass. Masalan, `UsersController`ga `UsersService` kerak.
- `@Injectable()` belgisi NestJS'ga "bu klassni sen yaratib, kerakli joyga berishing mumkin" deydi. Bunday klass **provider** deyiladi.
- NestJS ichida **IoC container** ("boshqaruvni o'z qo'liga olgan quti") bor: u dastur ishga tushganda provider'larni bir marta yaratadi va konstruktorida so'raganlarga beradi.
- Foydasi:
  1. **Test qilish oson** — testda haqiqiy bazali service o'rniga soxta (fake) service berasiz.
  2. **Almashtirish oson** — bitta joyni o'zgartirasiz, hamma joyda yangisi ishlaydi.
  3. **Takror yaratilmaydi** — bitta nusxa hammaga ulashiladi.

**Misol:**

```typescript
import { Controller, Get, Injectable, Module } from "@nestjs/common";

@Injectable()                       // 1. "Meni boshqalarga berish mumkin"
export class UsersService {
  findAll() {
    return [{ id: 1, name: "Ali" }];
  }
}

@Controller("users")
export class UsersController {
  // 2. "Menga UsersService kerak" — NestJS o'zi olib keladi, `new` yozmaymiz
  constructor(private readonly usersService: UsersService) {}

  @Get()
  list() {
    return this.usersService.findAll();
  }
}

@Module({ controllers: [UsersController], providers: [UsersService] }) // 3. ro'yxatdan o'tkazish
export class UsersModule {}
```

**Intervyuda shunday ayting:** "DI — klass o'ziga kerakli obyektlarni o'zi yaratmaydi, ular tashqaridan beriladi. NestJS'da `@Injectable()` klasslar modulning `providers` ro'yxatiga yoziladi, IoC container ularni yaratib, konstruktor orqali beradi. Bu kodni bo'laklarga ajratadi va testda soxta implementatsiya berishni osonlashtiradi."

**Esda tuting:** provider'ni modulning `providers` ro'yxatiga qo'shishni unutsangiz, NestJS "Nest can't resolve dependencies..." xatosini beradi.

## Q4. NestJS'da so'rov qaysi bosqichlardan o'tadi? / In what order does a request pass through NestJS?

**Oddiy qilib aytganda:** kinoteatrga kirishni tasavvur qiling:
1. **Middleware** — eshik oldidagi navbatchi: hammani ko'radi, yozib qo'yadi.
2. **Guard** — chipta tekshiruvchi: chiptang bo'lmasa, kirolmaysan.
3. **Interceptor** — zal xodimi: kirishingdan oldin va chiqishingdan keyin nimadir qiladi (masalan, vaqtni o'lchaydi).
4. **Pipe** — sumkangni tekshiradi: ichidagi narsalar to'g'rimi, kerak bo'lsa tartibga soladi.
5. **Controller (handler)** — kinoning o'zi: asosiy ish shu yerda.
6. **Exception filter** — biror narsa buzilsa, tinch va tushunarli e'lon qiladigan xodim.

**Batafsilroq:**
- **Guard** — "ruxsat bormi?" savoliga javob beradi (login qilganmi, admin'mi). `false` qaytarsa, so'rov shu yerda to'xtaydi.
- **Pipe** — kelgan ma'lumotni tekshiradi va o'zgartiradi: masalan, `"5"` matnini `5` soniga aylantiradi yoki email noto'g'ri bo'lsa `400` xato beradi.
- **Interceptor** — controller'dan **oldin ham, keyin ham** ishlaydi: log yozish, vaqt o'lchash, javobni bir xil ko'rinishga keltirish.
- **Exception filter** — istalgan bosqichda xato chiqsa, uni foydalanuvchiga tushunarli javobga aylantiradi.

**Misol:**

```typescript
import { Body, Controller, Post, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";

@Controller("orders")
@UseGuards(AuthGuard)                 // 2. ruxsat tekshiruvi
@UseInterceptors(TimingInterceptor)   // 3. vaqtni o'lchash
export class OrdersController {
  @Post()
  create(@Body(new ValidationPipe()) dto: CreateOrderDto) { // 4. ma'lumotni tekshirish
    return { ok: true };                                     // 5. asosiy ish
  }
}
```

**Intervyuda shunday ayting:** "Tartib: middleware → guard → interceptor (oldin) → pipe → handler → interceptor (keyin). Xato chiqsa, exception filter uni ushlaydi. Ruxsat tekshiruvini guard'ga, validatsiyani pipe'ga, log va javob formatini interceptor'ga qo'yaman."

**Esda tuting:** ruxsat tekshiruvini pipe yoki controller ichida qilish xato — ruxsatsiz so'rov ham tekshiruvga CPU sarflab qo'yadi. Guard pipe'dan oldin ishlaydi, shuning uchun u to'g'ri joy.

## Q5. ORM nima va Prisma TypeORM'dan nimasi bilan farq qiladi? / What is an ORM, and how does Prisma differ from TypeORM?

**Oddiy qilib aytganda:** ma'lumotlar bazasi **SQL** tilida gapiradi, dasturingiz esa **JavaScript/TypeScript**'da. **ORM** — ikkalasi orasidagi tarjimon: siz `prisma.user.findMany()` deb yozasiz, u buni `SELECT * FROM users` ga tarjima qiladi.

**Batafsilroq:**
- **Prisma:** avval alohida `schema.prisma` faylida jadvallarni tasvirlaysiz. Prisma shundan TypeScript uchun **tayyor klient** yaratadi. Maydon nomida xato qilsangiz, kod yozayotgan paytingizdayoq qizil chiziq chiqadi.
- **TypeORM:** jadvallarni TypeScript klasslari va `@Entity()`, `@Column()` belgilari (dekoratorlar) bilan tasvirlaysiz. Klassik yondashuv, NestJS'da ko'p ishlatiladi.
- Qisqasi: Prisma — "avval sxema, keyin avtomatik xavfsiz kod"; TypeORM — "klasslarning o'zi sxema".

**Misol (Prisma):**

```typescript
// schema.prisma faylida:
// model User { id Int @id @default(autoincrement())  email String @unique  active Boolean }

const activeUsers = await prisma.user.findMany({
  where: { active: true },   // SQL: WHERE active = true
  select: { id: true, email: true },
});
// activeUsers tipi avtomatik: { id: number; email: string }[]
```

**Intervyuda shunday ayting:** "ORM obyektlar va jadvallar orasida tarjima qiladi. Prisma sxema faylidan tiplangan klient generatsiya qiladi, shuning uchun so'rovlar kompilyatsiya vaqtida tekshiriladi. TypeORM entity klasslari va dekoratorlar bilan ishlaydi. Murakkab hisobot so'rovlarida ikkalasida ham ba'zan xom SQL yozishga to'g'ri keladi."

**Esda tuting:** ORM "N+1" muammosini yashirishi mumkin: 100 ta foydalanuvchini olib, har biri uchun alohida buyurtmalarni so'rash = 101 ta so'rov. Buning o'rniga bog'liq ma'lumotni bitta so'rovda oling (`include`).

## Q6. Stream nima va u nega xotirani tejaydi? / What is a stream and why does it save memory?

**Oddiy qilib aytganda:** hovuzni to'ldirishning ikki yo'li bor: suvni bitta ulkan idishda olib kelish (idish sig'maydi!) yoki **shlang** bilan oqizish. Stream — shlang: ma'lumot kichik bo'laklarda oqib keladi va har bir bo'lak darhol ishlanadi.

**Batafsilroq:**
- 2 GB faylni `readFile` bilan o'qisangiz, butun 2 GB xotiraga yuklanadi — 10 ta foydalanuvchi bir vaqtda so'rasa, server "bo'g'iladi".
- Stream faylni kichik bo'laklarda (masalan, 64 KB dan) o'qiydi va darhol yuboradi. Xotirada faqat bir necha bo'lak turadi.
- Stream turlari:
  - **Readable** — o'qiladigan manba (fayl, kelayotgan so'rov);
  - **Writable** — yoziladigan joy (fayl, javob);
  - **Transform** — oraliqda o'zgartiradigan (masalan, siqish — gzip).
- **Backpressure** — agar qabul qiluvchi sekin bo'lsa, manba "biroz to'xta" degan signalni oladi. Shlang bosimi oshib yorilib ketmaydi.

**Misol:**

```js
import { createReadStream, createWriteStream, writeFileSync } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";

writeFileSync("katta.txt", "salom dunyo\n".repeat(100_000)); // sinov uchun fayl

await pipeline(
  createReadStream("katta.txt"),   // o'qish — bo'laklab
  createGzip(),                    // siqish — bo'laklab
  createWriteStream("katta.txt.gz") // yozish — bo'laklab
);
console.log("Tayyor: fayl butunligicha xotiraga yuklanmadi");
```

**Intervyuda shunday ayting:** "Stream ma'lumotni bo'laklab qayta ishlaydi, shuning uchun katta fayllarda xotira sarfi doimiy qoladi. `pipeline()` backpressure'ni boshqaradi va xato bo'lsa hamma oqimni yopadi. Men katta fayl, eksport va proxy'da stream ishlataman."

**Esda tuting:** `.pipe()` xatoda oqimlarni yopmaydi. Xavfsiz variant — `pipeline()`.

## Q7. Buffer nima? / What is a Buffer in Node.js?

**Oddiy qilib aytganda:** kompyuter hamma narsani — matn, rasm, musiqani — **baytlar** (0 dan 255 gacha sonlar) sifatida saqlaydi. Oddiy JavaScript satri matn bilan ishlaydi. **Buffer** — xom baytlar solingan quti: rasm, zip fayl yoki tarmoqdan kelgan ma'lumot bilan ishlash uchun.

**Batafsilroq:**
- Bitta harf bir necha baytdan iborat bo'lishi mumkin: lotincha `a` — 1 bayt, `ў` — 2 bayt, emoji — 4 bayt. Buffer aynan shu baytlarni ko'rsatadi.
- Buffer hajmi yaratilganda belgilanadi va o'zgarmaydi.
- **Kodlash (encoding)** — baytlarni matnga aylantirish qoidasi: `utf8` (oddiy matn), `hex` (16 lik sonlar), `base64` (xat yoki URL ichida yuborish uchun).

**Misol:**

```js
const buf = Buffer.from("Salom 👋", "utf8");
console.log(buf.length);             // 10 — 6 ta oddiy belgi + emoji 4 bayt
console.log(buf.toString("hex"));    // 53616c6f6d20f09f918b
console.log(buf.toString("base64")); // U2Fsb20g8J+Riw==
console.log(Buffer.from("U2Fsb20g8J+Riw==", "base64").toString("utf8")); // Salom 👋
```

**Intervyuda shunday ayting:** "Buffer — Node.js'dagi xom baytlar massivi, `Uint8Array` asosida. U fayl, tarmoq va kriptografiya bilan ishlashda kerak. Matnga aylantirishda to'g'ri encoding muhim, aks holda harflar buziladi."

**Esda tuting:** matn uzunligi va bayt uzunligi har doim ham teng emas: `"👋".length` — 2, lekin `Buffer.from("👋").length` — 4.

## Q8. EventEmitter nima? / What is an EventEmitter?

**Oddiy qilib aytganda:** Telegram kanalini tasavvur qiling. Kanal (emitter) xabar e'lon qiladi, obunachilar (listener'lar) uni oladi. Kanal kim obuna bo'lganini bilishi shart emas — u shunchaki "yangi buyurtma keldi!" deydi.

**Batafsilroq:**
- `emitter.on("nom", funksiya)` — obuna bo'lish: shu nomdagi hodisa bo'lsa, funksiyani chaqir.
- `emitter.emit("nom", ma'lumot)` — hodisani e'lon qilish.
- `emitter.once(...)` — faqat bir marta eshitish.
- Node.js'ning o'zida ko'p narsa EventEmitter: HTTP server (`"request"`), stream'lar (`"data"`, `"end"`), jarayon (`"exit"`).
- Foydasi — kodni bir-biridan ajratish: buyurtma yaratuvchi kod email yuborish haqida bilishi shart emas.

**Misol:**

```js
import { EventEmitter } from "node:events";

const shop = new EventEmitter();

shop.on("order", (order) => console.log(`Email yuborildi: ${order.id}`));
shop.on("order", (order) => console.log(`Omborga xabar: ${order.item}`));

shop.emit("order", { id: 17, item: "kitob" });
// Email yuborildi: 17
// Omborga xabar: kitob
```

**Intervyuda shunday ayting:** "EventEmitter — publish/subscribe (e'lon qilish va obuna bo'lish) naqshi. Listener'lar sinxron, qo'shilgan tartibda chaqiriladi. Kerak bo'lmay qolgan listener'larni `off` bilan olib tashlash kerak, aks holda xotira sizib chiqadi."

**Esda tuting:** `"error"` hodisasini hech kim eshitmasa va u yuz bersa, Node.js butun dasturni to'xtatadi. Har doim `emitter.on("error", ...)` qo'shing.

## Q9. Cluster moduli nima uchun kerak? / Why do you need the cluster module?

**Oddiy qilib aytganda:** kompyuteringizda, masalan, 8 ta protsessor yadrosi bor, lekin bitta Node.js jarayoni ulardan faqat **bittasida** JavaScript ishlatadi. Bu 8 ta kassadan faqat bittasi ochiq supermarketga o'xshaydi. **Cluster** qolgan kassalarni ham ochadi: bir nechta Node.js nusxasi bitta portga kelgan so'rovlarni bo'lishib oladi.

**Batafsilroq:**
- **Primary** (bosh) jarayon **worker** (ishchi) jarayonlarni ishga tushiradi (`cluster.fork()`).
- Har bir worker — alohida Node.js jarayoni, o'z xotirasi bilan. Ular xotirani ulashmaydi.
- Worker yiqilsa, primary yangisini ishga tushirishi mumkin.
- Hozir ko'pincha cluster o'rniga **konteynerlar** ishlatiladi: har konteynerda bitta Node.js jarayoni, sonini esa Docker/Kubernetes boshqaradi.

**Misol:**

```js
import cluster from "node:cluster";
import http from "node:http";
import { availableParallelism } from "node:os";

if (cluster.isPrimary) {
  const count = Math.min(availableParallelism(), 2);
  for (let i = 0; i < count; i++) cluster.fork();          // ishchilarni ishga tushirish
  setTimeout(() => { for (const w of Object.values(cluster.workers)) w.kill(); }, 500);
} else {
  http.createServer((req, res) => res.end(`Javob berdi: ${process.pid}\n`)).listen(0);
  console.log(`Worker ${process.pid} tayyor`);
}
```

**Intervyuda shunday ayting:** "Cluster bitta server portiga bir nechta Node.js jarayonini ulaydi va barcha CPU yadrolaridan foydalanadi. Jarayonlar xotirani ulashmaydi, shuning uchun sessiya va kesh Redis kabi umumiy joyda bo'lishi kerak. Konteyner muhitida odatda replikalar sonini orkestrator boshqaradi."

**Esda tuting:** har bir worker'da alohida xotira bor. Sessiyani worker xotirasida saqlasangiz, keyingi so'rov boshqa worker'ga tushib, foydalanuvchi "chiqib ketadi".

## Q10. Worker threads nima va qachon kerak? / What are worker threads and when do you need them?

**Oddiy qilib aytganda:** ofitsiant (Q1) mehmonga 20 daqiqa davomida qo'lda murakkab tort bezasa, bu vaqtda boshqa hech kimga xizmat qila olmaydi — butun restoran to'xtaydi. **Worker thread** — shunday og'ir ish uchun alohida qandolatchi yollash: ofitsiant ishini davom ettiradi, tort esa parallel tayyorlanadi.

**Batafsilroq:**
- **CPU'ni band qiladigan og'ir hisob** — katta hisob-kitob, rasmni qayta ishlash, katta JSON'ni tahlil qilish — Node.js'ning asosiy oqimini to'xtatadi. Bu vaqtda server boshqa so'rovlarga javob bermaydi.
- Worker thread — o'sha jarayon ichidagi alohida oqim. U og'ir ishni bajaradi, natijani xabar (`postMessage`) orqali qaytaradi.
- Farqni eslang: kutish (fayl, tarmoq) uchun worker kerak emas — Node.js buni o'zi yaxshi qiladi. Worker faqat **hisoblash** uchun.

**Misol:**

```js
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url), { workerData: 35 });
  worker.once("message", (result) => console.log(`Natija: ${result}`));
  console.log("Asosiy oqim bo'sh — boshqa so'rovlarga javob bera oladi");
} else {
  const fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2)); // ataylab sekin hisob
  parentPort.postMessage(fib(workerData));
}
```

**Intervyuda shunday ayting:** "Worker threads CPU-og'ir ishni asosiy event loop'dan ajratish uchun. I/O uchun ular kerak emas. Worker'lar `postMessage` orqali muloqot qiladi. Ko'p vazifa bo'lsa, har safar yangi worker ochish o'rniga worker pool (masalan, piscina) ishlatiladi."

**Esda tuting:** har bir so'rov uchun yangi worker ochish qimmat (har biri o'z JavaScript muhitini yuklaydi). Oldindan yaratilgan pool'dan foydalaning.
