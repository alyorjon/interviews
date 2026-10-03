# NestJS chuqur — DI, so'rov hayot sikli va NestJS 12

> **Kim uchun:** NestJS'da controller va service yozishni biladigan, endi DI konteyneri, scope'lar, hayot sikli va arxitektura qarorlarini tushuntira olishi kerak bo'lgan backend dasturchi.
> **Tekshirilgan:** asosiy misollar NestJS 12.1.0 + Zod 4 bilan ishga tushirib ko'rilgan (2026-yil 25-sentabr).

---

# 2025–2026 yangiliklari

**NestJS 12.0.0 (2026-yil 27-avgust):**
- Barcha rasmiy paketlar **ESM** bo'ldi. Mavjud CommonJS ilovalar Node'ning `require(esm)` imkoniyati orqali ishlashda davom etadi; o'z kodingizni ESM'ga ko'chirish ixtiyoriy.
- **Standard Schema** qo'llovi: `@Body()`, `@Query()`, `@Param()` endi `{ schema }` opsiyasini qabul qiladi (Zod, Valibot, ArkType), yangi `StandardSchemaValidationPipe` va javoblar uchun `StandardSchemaSerializerInterceptor`.
- Yangi loyihalar uchun toolchain: Jest o'rniga **Vitest**, ESLint o'rniga **oxlint**, monorepo uchun Webpack o'rniga **Rspack**; bun paket menejeri sifatida qo'llab-quvvatlanadi.
- Express adapteri ishlayotgan so'rovlarni tugatib to'xtaydi (graceful shutdown); microservices'da NATS v3.
- Minimal Node.js: 20.19+ yoki 22.12+ (ya'ni `require(esm)` bor versiyalar).
- Breaking: hayot sikli hook'lari modul ierarxiyasi darajasi bo'yicha chaqiriladi, `ConsoleLogger` strukturalangan parametrlarni default yoqadi, GraphQL subscription'lar uchun `graphql-ws` shart. `nest upgrade` ko'p qadamlarni avtomatlashtiradi.

**NestJS 12.1.0 (2026-yil 23-sentabr):** o'rnatilgan CSRF himoyasi va xavfsizlik sarlavhalari, adapterdan mustaqil cookie qo'llovi, bir nechta global prefiks, Fastify uchun fayl yuklash interceptor'lari.

**NestJS 11 (2025-yil 22-yanvar):** default HTTP adapter **Express 5** (wildcard'lar endi nomli: `/*splat`), Fastify 5, `ConsoleLogger`da JSON log, modul kalitlarini hash o'rniga obyekt havolasi bilan yaratish hisobiga tezroq ishga tushish, `ParseDatePipe`, microservice klientlarida `unwrap()`, `on()` va `status`. 11.x liniyasi npm'da `legacy` teg ostida hali patch oladi.

**Manbalar:** [NestJS v12.0.0 release](https://github.com/nestjs/nest/releases/tag/v12.0.0) · [v12.1.0 release](https://github.com/nestjs/nest/releases/tag/v12.1.0) · [Trilon: NestJS 11](https://trilon.io/blog/announcing-nestjs-11-whats-new) · [InfoQ: NestJS 12 roadmap](https://www.infoq.com/news/2026/04/nestjs-12-roadmap-esm/)

---

# Savollar

## Q1. NestJS so'rovni qaysi tartibda qayta ishlaydi? / What is the NestJS request lifecycle order?

**Oddiy qilib aytganda:** NestJS'da so'rov kinoteatrga kirishga o'xshaydi: eshik oldidagi navbatchi (middleware), chipta tekshiruvchi (guard), zal xodimi (interceptor), sumka tekshiruvi (pipe), kinoning o'zi (handler) va biror narsa buzilsa — vaziyatni tinch hal qiladigan xodim (exception filter).

**Batafsilroq:**
1. **Middleware** (Express/Fastify darajasida, global → modul).
2. **Guard'lar** — ruxsat: global → controller → metod. `false` yoki exception — so'rov shu yerda to'xtaydi.
3. **Interceptor'lar (oldin)** — global → controller → metod.
4. **Pipe'lar** — parametrlarni validatsiya/transformatsiya: global → controller → metod → parametr.
5. **Handler** (controller metodi) va service'lar.
6. **Interceptor'lar (keyin)** — teskari tartibda, javobni o'zgartirish (RxJS `map`), log, kesh.
7. **Exception filter'lar** — istalgan bosqichdagi xatoni ushlaydi: metod → controller → global (eng aniq birinchi).

**Nega muhim:** autentifikatsiya guard'da bo'lishi kerak (pipe'dan oldin — ruxsatsiz so'rov body'ni validatsiya qildirib CPU yemasin); javob formatini interceptor'da, xato formatini filter'da birxillashtiring.

**Intervyuda shunday ayting:** "Tartib: middleware, guard, interceptor (oldin), pipe, handler, interceptor (keyin); xatoni exception filter ushlaydi — eng aniq filter birinchi. Autentifikatsiyani guard'ga qo'yaman, chunki u pipe'dan oldin ishlaydi va ruxsatsiz so'rov validatsiyaga resurs sarflamaydi."

## Q2. NestJS DI konteyneri qanday ishlaydi? / How does the NestJS dependency injection container work?

**Oddiy qilib aytganda:** DI konteyneri — oshxonaga kerakli mahsulotlarni olib keladigan ta'minotchi. Klass "menga UsersService kerak" deydi, NestJS uni bir marta yaratib, so'ragan hammaga beradi. Klass o'zi new qilmaydi.

**Batafsilroq:**
Har bir modul o'z **provider'lar** ro'yxatiga ega. Ishga tushishda Nest modul grafini quradi va har bir provider uchun **token** (odatda klass, yoki `Symbol`/string) bo'yicha nusxa yaratadi. Konstruktor parametrlari:

- `emitDecoratorMetadata` yoqilgan TypeScript'da parametr tiplari `design:paramtypes` metadata'sidan olinadi;
- yoki aniq `@Inject(TOKEN)` bilan ko'rsatiladi.

Provider turlari:

```ts
providers: [
  UsersService,                                              // useClass qisqa shakli
  { provide: CONFIG, useValue: { ttl: 60 } },                // tayyor qiymat
  { provide: Cache, useClass: process.env.REDIS_URL ? RedisCache : MemoryCache },
  { provide: DB, useFactory: (cfg: Config) => connect(cfg.url), inject: [CONFIG] }, // async ham bo'ladi
  { provide: "LegacyCache", useExisting: Cache },            // alias
]
```

Provider boshqa modulga ko'rinishi uchun `exports` ga qo'shilishi va iste'molchi modul uni `imports` qilishi kerak.

**Intervyuda shunday ayting:** "NestJS modul grafini quradi va har provider uchun token bo'yicha nusxa yaratadi. Konstruktor bog'liqliklari decorator metadata'dan yoki aniq @Inject(TOKEN)'dan olinadi. Provider turlari: useClass, useValue, useFactory, useExisting; boshqa modulga ko'rinishi uchun exports va imports kerak."

## Q3. esbuild/tsx/Vitest bilan DI nega "undefined" beradi? / Why does DI inject undefined when running NestJS through esbuild, tsx or Vitest?

**Oddiy qilib aytganda:** NestJS qaysi obyektni berishni TypeScript'ning maxsus "yorliqlari"dan (decorator metadata) biladi. esbuild, tsx va Vitest bu yorliqlarni yozmaydi — natijada NestJS nima berishni bilmaydi va undefined beradi. Yechim: har bir bog'liqlikni @Inject() bilan qo'lda nomlash yoki yorliqlarni yozadigan kompilyator (SWC, tsc).

**Batafsilroq:**
esbuild (tsx, Vite, Vitest ichida) **`emitDecoratorMetadata`ni qo'llamaydi**. Shuning uchun `constructor(private users: UsersService)` uchun `design:paramtypes` yozilmaydi va Nest nimani inject qilishni bilmaydi — natijada `undefined`.

Yechimlar:
1. Har bir konstruktor parametriga aniq token: `constructor(@Inject(UsersService) private users: UsersService)`.
2. Metadata chiqaradigan transformer: `tsc`, SWC (`@swc/core` + `decoratorMetadata: true`) yoki `unplugin-swc` (Vitest uchun).

Shu loyihaning API qismi 1-yechimni ishlatadi: testlar `tsx` orqali ishlaydi, barcha konstruktorlar `@Inject(...)` bilan. Eski kodda bu muammoni chetlab o'tish uchun dekoratorlar funksiya sifatida qo'lda chaqirilardi — o'qish qiyin va xatoga moyil edi.

**Intervyuda shunday ayting:** "esbuild emitDecoratorMetadata'ni qo'llamaydi, shuning uchun design:paramtypes bo'lmaydi va DI undefined beradi. Ikki yechim: har konstruktor parametriga aniq @Inject token yoki metadata chiqaradigan SWC yoki tsc transformeri. Bu portal API'si birinchisini ishlatadi."

## Q4. Provider scope'lari va ularning narxi qanday? / What are provider scopes and what do they cost?

**Oddiy qilib aytganda:** scope — provider nusxasi qancha yashashi: DEFAULT — butun ilova uchun bitta (eng tez); REQUEST — har so'rov uchun yangi (qimmat, chunki unga bog'liq hamma narsa ham har so'rovda qayta yaratiladi); TRANSIENT — har iste'molchiga alohida.

**Batafsilroq:**
- **DEFAULT (singleton)** — butun ilova uchun bitta nusxa. Eng tez, deyarli har doim to'g'ri tanlov.
- **REQUEST** — har bir HTTP so'rov uchun yangi nusxa. **Zanjir bo'ylab yuqoriga tarqaladi:** request-scoped provider'ga bog'liq har bir provider va controller ham request-scoped bo'ladi — har so'rovda butun grafning bir qismi qayta yaratiladi.
- **TRANSIENT** — har bir iste'molchi o'z nusxasini oladi.

Request kontekstiga (foydalanuvchi, request id) kerak bo'lsa, ko'pincha REQUEST scope o'rniga `AsyncLocalStorage` (masalan, `nestjs-cls`) yaxshiroq: provider'lar singleton qoladi, kontekst esa asinxron zanjir bo'ylab o'tadi.

**Intervyuda shunday ayting:** "Deyarli har doim singleton. REQUEST scope zanjir bo'ylab yuqoriga tarqaladi va har so'rovda grafning bir qismini qayta yaratadi. So'rov konteksti uchun REQUEST scope o'rniga AsyncLocalStorage asosidagi nestjs-cls'ni afzal ko'raman."

## Q5. Hayot sikli hook'lari qaysilar va shutdown qanday ishlaydi? / Which lifecycle hooks exist and how does shutdown work?

**Oddiy qilib aytganda:** hayot sikli hook'lari — ilovaning "ishni boshlash" va "ishni tugatish" marosimlari: ishga tushganda ulanishlarni ochadi, to'xtaganda ularni tartib bilan yopadi. To'xtash hook'lari faqat enableShutdownHooks() yoqilgan bo'lsa ishlaydi.

**Batafsilroq:**
Ishga tushish: `onModuleInit` → `onApplicationBootstrap`. To'xtash: `onModuleDestroy` → `beforeApplicationShutdown` → `onApplicationShutdown`.

To'xtash hook'lari faqat `app.enableShutdownHooks()` chaqirilgan bo'lsa `SIGTERM`/`SIGINT` da ishlaydi. Ular DB/Redis ulanishlarini yopish, navbat consumer'larini to'xtatish uchun kerak. NestJS 12 dan hook'lar modul ierarxiyasi darajasi bo'yicha chaqiriladi va Express adapteri ishlayotgan so'rovlarni tugatib yopiladi.

```ts
@Injectable()
export class RedisService implements OnModuleInit, OnApplicationShutdown {
  private client = createClient({ url: process.env.REDIS_URL });
  async onModuleInit() { await this.client.connect(); }
  async onApplicationShutdown(signal?: string) { await this.client.quit(); }
}
```

**Intervyuda shunday ayting:** "Ishga tushish: onModuleInit va onApplicationBootstrap; to'xtash: onModuleDestroy, beforeApplicationShutdown va onApplicationShutdown. Ular SIGTERM'da ishlashi uchun app.enableShutdownHooks() chaqiraman. NestJS 12 da hook'lar modul ierarxiyasi bo'yicha, Express adapteri esa faol so'rovlarni tugatib yopiladi."

## Q6. NestJS 12 da Standard Schema validatsiyasi qanday ishlaydi? / How does Standard Schema validation work in NestJS 12?

**Oddiy qilib aytganda:** ilgari validatsiya uchun DTO klass va ikki kutubxona (class-validator, class-transformer) kerak edi. NestJS 12 da siz bitta Zod yoki Valibot sxemasini to'g'ridan-to'g'ri @Body({ schema })'ga berasiz — u ham tekshiradi, ham TypeScript tipini beradi.

**Batafsilroq:**
Ilgari validatsiya `class-validator` + `class-transformer` dekoratorlari bilan DTO klasslarida yozilardi. NestJS 12 **Standard Schema** spetsifikatsiyasini qo'llaydi — Zod, Valibot, ArkType sxemasini to'g'ridan-to'g'ri parametr dekoratoriga berasiz:

```ts
import { Body, Controller, Param, Post, StandardSchemaValidationPipe } from "@nestjs/common";
import { z } from "zod";

const CreateUser = z.object({ email: z.email(), age: z.number().int().min(16) });

@Controller("users")
export class UsersController {
  @Post(":team")
  create(
    @Param("team", { schema: z.string().min(2) }) team: string,
    @Body({ schema: CreateUser }) body: z.infer<typeof CreateUser>,
  ) {
    return { team, ...body };
  }
}

// main.ts
app.useGlobalPipes(new StandardSchemaValidationPipe());
```

Xato bo'lsa — `400 Bad Request`. Afzalligi: bitta sxema ham runtime validatsiya, ham TypeScript tipi (`z.infer`), klass va ikki kutubxonaga ehtiyoj yo'q.

**Intervyuda shunday ayting:** "NestJS 12 Standard Schema'ni qo'llaydi: @Body, @Query va @Param'ga { schema } beraman va global StandardSchemaValidationPipe qo'yaman. Bitta sxema ham runtime validatsiya, ham z.infer orqali tip — dublikatsiya yo'q, xatoda 400 qaytadi."

## Q7. Guard, interceptor va pipe'ni qachon ishlatasiz? / When do you use a guard vs an interceptor vs a pipe?

**Oddiy qilib aytganda:** har vazifaning o'z joyi bor: "kim kirishi mumkin?" — guard; "ma'lumot to'g'rimi?" — pipe; "atrofida nima qilish kerak?" (log, vaqt, kesh) — interceptor; "xato bo'lsa nima deymiz?" — exception filter.

**Batafsilroq:**
| Vazifa | To'g'ri joy | Nega |
|---|---|---|
| Autentifikatsiya, rol, allowlist | Guard | handler'dan oldin, ruxsatsizni erta to'xtatadi |
| Kiruvchi ma'lumotni tekshirish/o'zgartirish | Pipe | bitta parametr darajasida |
| Log, vaqt o'lchash, javobni o'rash, kesh | Interceptor | handler atrofida ishlaydi (oldin va keyin) |
| Xato formatini birxillashtirish | Exception filter | istalgan bosqichdagi xatoni ushlaydi |

Guard'dan foydalanuvchini keyingi bosqichlarga uzatish uchun uni `request` obyektiga yozing va `createParamDecorator` bilan `@CurrentUser()` qiling — shu loyihadagi `TelegramAuthGuard` aynan shunday.

**Intervyuda shunday ayting:** "Autentifikatsiya va rol — guard'da, chunki u handler'dan oldin to'xtatadi; kiritish validatsiyasi — pipe'da; log, vaqt o'lchash va javob formati — interceptor'da; xato formati — exception filter'da. Guard'dan foydalanuvchini request'ga yozib, createParamDecorator bilan @CurrentUser() qilaman."

## Q8. Dinamik modul nima va forRoot / forRootAsync qachon kerak? / What is a dynamic module and when do you need forRoot/forRootAsync?

**Oddiy qilib aytganda:** dinamik modul — sozlanadigan "mebel to'plami": oddiy modul har doim bir xil, dinamik esa siz bergan sozlamalarga qarab yig'iladi (masalan, qaysi bazaga ulanish). forRootAsync — sozlamalar boshqa servisdan (ConfigService) kelganda.

**Batafsilroq:**
Statik modul har doim bir xil provider'larni beradi. Dinamik modul esa konfiguratsiyaga qarab provider'lar yaratadi:

```ts
@Module({})
export class CacheModule {
  static forRootAsync(options: { useFactory: (...args: any[]) => Promise<CacheOptions>; inject: any[] }): DynamicModule {
    return {
      module: CacheModule,
      global: true,
      providers: [
        { provide: CACHE_OPTIONS, useFactory: options.useFactory, inject: options.inject },
        { provide: Cache, useFactory: (o: CacheOptions) => new Cache(o), inject: [CACHE_OPTIONS] },
      ],
      exports: [Cache],
    };
  }
}
```

`forRootAsync` konfiguratsiya boshqa provider'dan (masalan, `ConfigService`) kelganda kerak. Takroriy boilerplate'ni `ConfigurableModuleBuilder` avtomatik yaratadi.

**Intervyuda shunday ayting:** "Dinamik modul konfiguratsiyaga qarab provider'lar yaratadi. forRootAsync'ni konfiguratsiya boshqa provider'dan kelganda ishlataman, boilerplate'ni esa ConfigurableModuleBuilder bilan kamaytiraman. global: true'ni kamdan-kam va ongli ishlataman."

## Q9. Aylanma bog'liqlik (circular dependency)ni qanday hal qilasiz? / How do you resolve circular dependencies in NestJS?

**Oddiy qilib aytganda:** aylanma bog'liqlik — ikki odam bir-birini "sen birinchi kir" deb eshik oldida turib qolishi. forwardRef — vaqtincha yechim, lekin odatda bu dizayn muammosi belgisi: ikki servis bir-birining ichki ishiga juda aralashgan.

**Batafsilroq:**
`forwardRef(() => OtherService)` vaqtinchalik yechim, lekin u odatda **dizayn signali**: ikki service bir-birining ichki ishini biladi.

Yaxshiroq yechimlar:
1. Umumiy mantiqni uchinchi service'ga ajratish.
2. Hodisaga o'tish: `OrdersService` to'g'ridan-to'g'ri `NotificationsService`ni chaqirish o'rniga `order.created` hodisasini chiqaradi (`@nestjs/event-emitter` yoki navbat).
3. Modul chegaralarini qayta ko'rib chiqish (bitta domen ikki modulga bo'lingan bo'lishi mumkin).

**Intervyuda shunday ayting:** "forwardRef ishlaydi, lekin men uni dizayn signali deb qabul qilaman. Yaxshiroq: umumiy mantiqni uchinchi servisga ajratish, to'g'ridan-to'g'ri chaqiruv o'rniga hodisa chiqarish yoki modul chegaralarini qayta ko'rib chiqish."

## Q10. NestJS ilovasini qanday test qilasiz? / How do you test NestJS providers and controllers?

**Oddiy qilib aytganda:** NestJS'da test — kerakli qismlarni haqiqiysi o'rniga "o'yinchoq" versiyasi bilan almashtirib tekshirish: haqiqiy bazaga emas, soxta repository'ga ulaysiz. DI tizimi buni juda oson qiladi.

**Batafsilroq:**
- **Unit:** `Test.createTestingModule({ providers: [UsersService, { provide: UsersRepository, useValue: fakeRepo }] })` — tashqi bog'liqliklarni soxta qiymat bilan almashtirish.
- **Mavjud modulni qisman almashtirish:** `.overrideProvider(PaymentsClient).useValue(fake)`.
- **E2E:** butun ilovani `0`-portda ko'tarib, haqiqiy HTTP bilan tekshirish (`app.listen(0)` + `fetch`), tashqi xizmatlarni (Telegram, to'lov) soxtalashtirish.

Shu loyihadagi API testlari E2E uslubida: har test o'z ilova nusxasini `MemoryProgressStore` bilan ko'taradi va Telegram `initData`ni sintetik token bilan imzolaydi.

**Intervyuda shunday ayting:** "Unit testda Test.createTestingModule bilan bog'liqliklarni useValue soxtalari bilan almashtiraman, mavjud modulda overrideProvider ishlataman. E2E'da butun ilovani listen(0) bilan ko'tarib, haqiqiy HTTP bilan tekshiraman va tashqi xizmatlarni soxtalashtiraman."

## Q11. Monolitdan microservice'ga NestJS'da qanday o'tiladi? / How do you move from a modular monolith to microservices with NestJS?

**Oddiy qilib aytganda:** microservice'ga o'tish — katta oilaviy uydan alohida kvartiralarga ko'chish. Avval uy ichida xonalarni aniq ajratasiz (modulli monolit), keyin kerak bo'lsa ba'zi xonalarni alohida kvartiraga chiqarasiz. Lekin alohida kvartiralar yangi muammolar olib keladi: aloqa, yo'l, xarajat.

**Batafsilroq:**
1. **Avval modulli monolit:** har bir domen — alohida modul, faqat `exports` orqali muloqot, DB jadvallari ham domen bo'yicha ajratilgan.
2. **Chegaralarni hodisalar bilan ajratish:** modullar orasidagi sinxron chaqiruvlarni imkon qadar hodisalarga o'tkazish.
3. **Keyin ajratish:** NestJS microservices transportlari (NATS, Kafka, Redis, gRPC, RabbitMQ) bilan modulni alohida jarayonga chiqarish; `@MessagePattern` / `@EventPattern`.

Microservice'lar mustaqil deploy va scaling beradi, lekin tarmoq xatolari, taqsimlangan tranzaksiyalar (saga, outbox), kuzatuv murakkabligini qo'shadi. Kichik jamoa uchun ko'pincha modulli monolit + bir nechta worker yetarli.

**Intervyuda shunday ayting:** "Avval modulli monolit quraman: modullar faqat exports orqali muloqot qiladi, ma'lumotlar domen bo'yicha ajratilgan. Keyin chegaralarni hodisalar bilan bo'shatib, alohida scaling kerak bo'lgan modulni NestJS microservices transporti bilan ajrataman. Tarmoq xatolari, saga va outbox narxini hisobga olaman."

## Q12. Katta yuk ostida NestJS'ni qanday tezlashtirasiz? / How do you make a NestJS API fast under heavy load?

**Oddiy qilib aytganda:** NestJS'ni tezlashtirish — faqat bitta joyni emas, butun yo'lni ko'rib chiqish: tezroq poydevor (Fastify), keraksiz qayta yaratishlarni yo'qotish (REQUEST scope'siz), og'ir ishni navbatga berish, keshlash va eng muhimi — taxmin emas, o'lchash.

**Batafsilroq:**
- Fastify adapteri (Express'dan yuqori RPS, JSON serializatsiya tezroq).
- REQUEST scope'dan qochish (Q4).
- Og'ir `class-transformer` o'rniga yengil validatsiya (Standard Schema/Zod) va javobda faqat kerakli maydonlar.
- Kesh: HTTP darajasida (CDN, `Cache-Control`), ilova darajasida (Redis), DB darajasida (indekslar, read replica).
- Og'ir ishlarni navbatga (BullMQ) chiqarish — handler faqat qabul qiladi.
- Replikalar: stateless provider'lar, sessiya va progress Redis'da, bot/cron singleton'lari alohida.
- Metrikalar: event loop delay, p99 latency, DB pool band bo'lishi — "sekin"ni taxmin emas, o'lchov bilan topish.

**Intervyuda shunday ayting:** "Fastify adapter, singleton provider'lar, yengil validatsiya, bir necha qatlamli kesh, og'ir ishlarni BullMQ navbatiga chiqarish va stateless replikalar. Qaror qabul qilishdan oldin event loop delay, p99 latency va DB pool bandligini o'lchayman."

