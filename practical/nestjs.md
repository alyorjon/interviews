# NestJS amaliy intervyu ssenariylari

> **Nima bu:** "loyihada shunday muammo chiqdi — nima qilasiz?" turidagi NestJS savollari. Nazariya — DI, scope'lar, hayot sikli va shutdown, dinamik modullar, aylanma bog'liqlik, testlash, Standard Schema — `javascript/nestjs_chuqur.md` da. Bu yerda **faqat boshqa, amaliy** ssenariylar, takrorlanish yo'q.
> **Har bir javob tartibi:** muammo oddiy tilda → yechim (kod bilan) → qanday tekshirasiz → intervyuda qanday aytasiz → esda tuting.
> **Versiya:** NestJS 12.1 (2026-yil sentabr). **Asosiy manba:** [docs.nestjs.com](https://docs.nestjs.com/).

---

# Ssenariylar

## Q1. Klient body'ga "role": "admin" qo'shib yubordi va u bazaga yozildi — nima qilasiz? / A client added "role": "admin" to the body and it was saved — what do you do?

**Oddiy qilib aytganda:** server "menga ism va email kerak" deydi, lekin klient qo'shimcha `role` maydonini ham yubordi. Agar body'ni tekshirmasdan butunligicha bazaga bersangiz — foydalanuvchi o'zini admin qilib oladi (bu **mass assignment** hujumi). Yechim: faqat ruxsat etilgan maydonlarni qabul qilish, qolganini **rad etish**.

**Yechim (class-validator bilan):**

```typescript
// main.ts
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,              // DTO'da yo'q maydonlarni olib tashlaydi
  forbidNonWhitelisted: true,   // ...yoki olib tashlash o'rniga 400 qaytaradi
  transform: true,              // body'ni DTO klass nusxasiga aylantiradi
}));

export class CreateUserDto {
  @IsString() @Length(2, 50) name!: string;
  @IsEmail() email!: string;
  // role yo'q — demak klient uni o'rnata olmaydi
}
```

```typescript
// NestJS 12 + Zod: strictObject noma'lum maydonni 400 bilan rad etadi
const CreateUser = z.strictObject({ name: z.string().min(2), email: z.email() });
```

**Qanday tekshirasiz:** e2e testda `{ name, email, role: "admin" }` yuboring — `400` kelishi va bazada `role` o'zgarmasligi kerak.

**Intervyuda shunday ayting:** "Kiruvchi ma'lumotni DTO yoki sxema bilan faqat ruxsat etilgan maydonlarga cheklayman: `whitelist` + `forbidNonWhitelisted` yoki Zod'da `strictObject`. `role` kabi maydonlarni esa faqat server o'zi, alohida admin endpoint orqali o'rnatadi."

**Esda tuting:** `repository.save(req.body)` — hech qachon. Doim DTO'dan kerakli maydonlarni ajratib bering. Manba: [Validation](https://docs.nestjs.com/techniques/validation), [OWASP Mass Assignment](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html).

## Q2. Admin tekshiruvi har controller'da qo'lda yozilgan va bitta route'da unutilgan — nima qilasiz? / Admin checks are hand-written in every controller and one route forgot it — what do you do?

**Oddiy qilib aytganda:** har handler boshida `if (user.role !== 'admin') throw ...` yozish — unutishga juda oson. Yaxshisi: route ustiga **yorliq** (`@Roles(['admin'])`) qo'yish va hamma so'rovni tekshiradigan **bitta guard** yozish. Guard yorliqni o'qiydi va ruxsat bermasa — handler umuman ishlamaydi.

**Yechim:**

```typescript
// roles.decorator.ts
export const Roles = Reflector.createDecorator<string[]>();

// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride(Roles, [context.getHandler(), context.getClass()]);
    if (!roles) return true;                                  // yorliq yo'q — rol shart emas
    const { user } = context.switchToHttp().getRequest();
    return roles.some((role) => user?.roles?.includes(role)); // false → 403
  }
}

// app.module.ts — global, DI bilan
providers: [{ provide: APP_GUARD, useClass: RolesGuard }],

// controller
@Roles(["admin"])
@Delete(":id")
remove(@Param("id") id: string) { /* ... */ }
```

**Qanday tekshirasiz:** oddiy foydalanuvchi tokeni bilan `DELETE /users/1` → `403`; admin bilan → `200`. Yangi admin route qo'shilganda test ro'yxati ham kengaysin.

**Intervyuda shunday ayting:** "Ruxsatni deklarativ qilaman: route'da `@Roles`, tekshiruv esa `APP_GUARD` sifatida ro'yxatdan o'tgan bitta guard'da. `getAllAndOverride` bilan metod va klass darajasidagi yorliqlarni birga o'qiyman."

**Esda tuting:** xavfsizroq variant — "hamma narsa yopiq, ochiqlari `@Public()` bilan belgilanadi". Shunda unutilgan route ochiq qolmaydi, yopiq qoladi. Manba: [Guards](https://docs.nestjs.com/guards).

## Q3. Bir xil "buyurtma topilmadi" xatosi bir joyda 404, boshqa joyda 500 qaytaryapti — nima qilasiz? / The same "order not found" error returns 404 in one place and 500 in another — what do you do?

**Oddiy qilib aytganda:** service o'z xatosini tashlaydi (`OrderNotFoundError`), har controller esa uni o'zicha ushlaydi — kimdir 404 ga aylantiradi, kimdir unutadi va Nest uni 500 qiladi. Yechim: xatoni HTTP javobga aylantirishni **bir joyga** — exception filter'ga yig'ish.

**Yechim:**

```typescript
export class OrderNotFoundError extends Error {
  constructor(readonly orderId: string) { super(`Order ${orderId} not found`); }
}

@Catch(OrderNotFoundError)
export class DomainErrorFilter implements ExceptionFilter {
  catch(error: OrderNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.status(404).json({ code: "ORDER_NOT_FOUND", message: "Buyurtma topilmadi" });
  }
}

// app.module.ts
providers: [{ provide: APP_FILTER, useClass: DomainErrorFilter }],
```

**Qanday tekshirasiz:** buyurtmani o'qiydigan barcha endpoint'lar (GET, PATCH, DELETE) yo'q ID uchun bir xil `404` va bir xil `code` qaytarishi kerak.

**Intervyuda shunday ayting:** "Service HTTP'ni bilmaydi — u domen xatosini tashlaydi. Domen xatosi → HTTP status xaritasi bitta global exception filter'da. Shunda javob formati hamma joyda bir xil, service esa queue yoki CLI'da ham qayta ishlatiladi."

**Esda tuting:** noma'lum xatolar uchun klientga stack trace yoki SQL matnini qaytarmang — faqat umumiy xabar va log'da ID. Manba: [Exception filters](https://docs.nestjs.com/exception-filters).

## Q4. /users javobida parol hash'i ham chiqib ketyapti — nima qilasiz? / The /users response leaks the password hash — what do you do?

**Oddiy qilib aytganda:** controller bazadan olingan **butun** foydalanuvchi obyektini qaytargan — unda `passwordHash` ham bor. Nest uni JSON'ga aylantirib, hammasini yuboradi. Yechim: klientga faqat **kerakli** maydonlarni qaytarish.

**Yechim:**

```typescript
// ✅ 1-usul (eng aniq): javob uchun alohida tur va qo'lda xaritalash
type UserResponse = { id: string; name: string; email: string };

const toUserResponse = (user: UserEntity): UserResponse =>
  ({ id: user.id, name: user.name, email: user.email });   // yangi maydon avtomatik chiqib ketmaydi

@Get(":id")
async findOne(@Param("id") id: string): Promise<UserResponse> {
  return toUserResponse(await this.users.findById(id));
}
```

```typescript
// 2-usul: class-transformer bilan "chiqarma" belgisi
export class UserEntity {
  id!: string;
  @Exclude() passwordHash!: string;
}
// app.module.ts: { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }
// Handler oddiy obyekt emas, UserEntity nusxasini qaytarishi shart!
```

**Qanday tekshirasiz:** e2e testda javob JSON'ida `passwordHash` kaliti **yo'qligini** tekshiring (`expect(body).not.toHaveProperty("passwordHash")`).

**Intervyuda shunday ayting:** "Javobni ruxsat etilganlar ro'yxati bilan quraman — alohida response DTO. `@Exclude` ham ishlaydi, lekin u taqiqlar ro'yxati: ertaga kimdir `resetToken` qo'shsa, u jimgina chiqib ketadi. Ruxsat ro'yxatida esa yangi maydon o'zi chiqmaydi."

**Esda tuting:** `ClassSerializerInterceptor` faqat klass nusxasida ishlaydi — ORM'dan oddiy obyekt kelsa, `@Exclude` e'tiborsiz qoladi. Manba: [Serialization](https://docs.nestjs.com/techniques/serialization).

## Q5. Har handler'da so'rov vaqti va statusi qo'lda log qilinyapti — qanday soddalashtirasiz? / Every handler logs its own duration and status by hand — how do you simplify it?

**Oddiy qilib aytganda:** interceptor — har handler'ni "o'rab oladigan" qatlam: handler'dan **oldin** vaqtni yozadi, **keyin** esa qancha davom etganini hisoblaydi. Uni bir marta yozib, global qo'ysangiz — barcha endpoint'lar bir xil log'ga ega bo'ladi.

**Yechim:**

```typescript
@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger("HTTP");

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const requestId = request.header("x-request-id") ?? randomUUID();
    response.setHeader("x-request-id", requestId);   // klient xato haqida shu ID bilan xabar beradi
    const started = performance.now();

    return next.handle().pipe(
      finalize(() => this.logger.log({
        requestId,
        method: request.method,
        route: request.route?.path,                 // /users/:id — ID emas, shablon
        status: response.statusCode,
        ms: Math.round(performance.now() - started),
      })),
    );
  }
}
// app.module.ts: { provide: APP_INTERCEPTOR, useClass: RequestLogInterceptor }
```

**Qanday tekshirasiz:** har so'rovga bitta log qatori chiqishi; xato bo'lganda ham (`finalize` shuning uchun) va javobda `x-request-id` bo'lishi kerak.

**Intervyuda shunday ayting:** "Kesib o'tuvchi vazifalar (log, vaqt, metrika) interceptor'da. Log'ga URL emas, route shablonini yozaman — aks holda metrikalarda har ID alohida qator bo'lib ketadi. Token, parol va shaxsiy ma'lumotni log'ga yozmayman."

**Esda tuting:** `tap` faqat muvaffaqiyatda ishlaydi — xatolarni ham qamrash uchun `finalize` kerak. Manba: [Interceptors](https://docs.nestjs.com/interceptors).

## Q6. /orders/abc so'rovi service'ga "abc" satrini olib borib, bazada g'alati xato beryapti — nima qilasiz? / /orders/abc sends the string "abc" into the service and the database fails oddly — what do you do?

**Oddiy qilib aytganda:** URL'dagi hamma narsa — **matn**. `@Param('id') id: number` deb yozsangiz ham, TypeScript tipi runtime'da hech narsani tekshirmaydi — ichida baribir `"abc"` bo'ladi. Uni tekshirib, songa aylantiradigan **pipe** kerak.

**Yechim:**

```typescript
@Get(":id")
findOne(@Param("id", ParseIntPipe) id: number) {       // "abc" → 400, "42" → 42
  return this.orders.findById(id);
}

@Get("by-uuid/:uuid")
findByUuid(@Param("uuid", new ParseUUIDPipe({ version: "4" })) uuid: string) {
  return this.orders.findByUuid(uuid);
}
```

**Qanday tekshirasiz:** `/orders/abc` → `400 Bad Request` (500 emas); `/orders/42` → service'ga `number` turi keladi.

**Intervyuda shunday ayting:** "TypeScript tiplari runtime'da yo'q — URL parametri doim string. Chegarada pipe bilan tekshiraman va aylantiraman: noto'g'ri kirish 400 bo'ladi, bazaga yetib bormaydi."

**Esda tuting:** 500 — "server aybdor" degani. Klient noto'g'ri narsa yuborganda 4xx qaytishi kerak — aks holda monitoring soxta signal beradi. Manba: [Pipes](https://docs.nestjs.com/pipes).

## Q7. GET /users/me so'rovi "ID 'me' topilmadi" xatosini beryapti — nega? / GET /users/me fails with "user 'me' not found" — why?

**Oddiy qilib aytganda:** route'lar **yozilgan tartibda** tekshiriladi. Controller'da avval `@Get(':id')` turibdi — `:id` har qanday so'zni, jumladan `me` ni ham ushlaydi. `@Get('me')` ga navbat umuman kelmaydi. Yechim: aniq yo'llarni **yuqoriga**, parametrli yo'llarni **pastga** qo'yish.

**Yechim:**

```typescript
@Controller("users")
export class UsersController {
  @Get("me")                        // ✅ avval aniq yo'l
  me(@CurrentUser() user: User) { return user; }

  @Get(":id")                       // keyin umumiy — "me" bu yerga kelmaydi
  findOne(@Param("id", ParseUUIDPipe) id: string) { return this.users.findById(id); }
}
```

**Qanday tekshirasiz:** `GET /users/me` → joriy foydalanuvchi; `GET /users/<uuid>` → shu foydalanuvchi; `GET /users/abc` → 400.

**Intervyuda shunday ayting:** "Router moslikni tartib bo'yicha qidiradi, shuning uchun statik segmentlar parametrli segmentlardan oldin e'lon qilinadi. `:id` ga `ParseUUIDPipe` qo'yish ham yordam beradi: `me` endi jimgina 'topilmadi' emas, darhol aniq 400 bo'ladi."

**Esda tuting:** bu nafaqat NestJS'da — Express'da ham xuddi shunday. Manba: [Controllers — route parameters](https://docs.nestjs.com/controllers#route-parameters).

## Q8. DATABASE_URL berilmagan, lekin ilova ishga tushib, faqat birinchi so'rovda yiqilyapti — nima qilasiz? / DATABASE_URL is missing but the app starts and only fails on the first request — what do you do?

**Oddiy qilib aytganda:** sozlama yo'qligini birinchi foydalanuvchi emas, **ishga tushish** payti aniqlashi kerak. Ilova ochilishdan oldin barcha kerakli sozlamalarni tekshirsin; biror narsa yetishmasa — aniq xabar bilan darhol to'xtasin (**fail fast**). Shunda noto'g'ri deploy trafik olmaydi.

**Yechim:**

```typescript
import { z } from "zod";

const Env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().int().default(3000),
  JWT_SECRET: z.string().min(32),
});
export type Env = z.infer<typeof Env>;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (raw) => Env.parse(raw),   // xato bo'lsa — ilova ishga tushmaydi
    }),
  ],
})
export class AppModule {}
```

**Qanday tekshirasiz:** `DATABASE_URL` siz ishga tushiring — jarayon noldan farqli kod bilan to'xtashi va xabarda **maydon nomi** bo'lishi kerak (qiymati emas!).

**Intervyuda shunday ayting:** "Konfiguratsiyani ishga tushishda sxema bilan tekshiraman. Konteyner ishga tushmasa, orkestrator eski versiyani qoldiradi — bu yarim ishlaydigan ilovadan ancha yaxshi."

**Esda tuting:** xato xabariga sir qiymatlarini chiqarmang — faqat qaysi maydon noto'g'ri ekanini. Manba: [Configuration — schema validation](https://docs.nestjs.com/techniques/configuration#schema-validation).

## Q9. Tashqi to'lov API'si ba'zan javob bermay, so'rovlar daqiqalab osilib qolyapti — nima qilasiz? / An external payment API sometimes hangs and requests wait for minutes — what do you do?

**Oddiy qilib aytganda:** kutish vaqti (timeout) bo'lmasa, sekin tashqi xizmat sizning serveringizni ham "ushlab" qoladi: har osilgan so'rov ulanish va xotira egallaydi, oxiri server to'lib qoladi. Yechim: **ikki qavat chegara** — tashqi chaqiruvning o'ziga timeout va butun handler'ga umumiy timeout.

**Yechim:**

```typescript
// 1) Tashqi chaqiruvga — aniq timeout
const response = await fetch(`${PAYMENTS_URL}/charges`, {
  method: "POST",
  body: JSON.stringify(payload),
  signal: AbortSignal.timeout(3_000),        // 3 soniyadan keyin to'xtatiladi
});

// 2) Handler'ga — umumiy chegara
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      timeout(5_000),
      catchError((error) => throwError(() =>
        error instanceof TimeoutError ? new RequestTimeoutException() : error)),
    );
  }
}
```

**Qanday tekshirasiz:** testda to'lov xizmatini 10 soniya kechiktiradigan soxta server bilan almashtiring — javob 5 soniyada `408`/`504` bo'lishi, server ulanishlari to'planmasligi kerak.

**Intervyuda shunday ayting:** "Har tashqi chaqiruvga `AbortSignal.timeout` beraman, handler'ga esa interceptor orqali umumiy chegara. Interceptor timeout'i faqat javobni to'xtatadi — ichkaridagi ishni emas, shuning uchun haqiqiy bekor qilish tashqi chaqiruv darajasida bo'lishi kerak."

**Esda tuting:** to'lov kabi amallarni timeout'dan keyin ko'r-ko'rona qayta yubormang — pul ikki marta yechilishi mumkin. Idempotency kalitidan foydalaning. Manba: [Interceptors — timeout](https://docs.nestjs.com/interceptors#more-operators), [AbortSignal.timeout](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static).

## Q10. /auth/login endpoint'iga parol tanlash (brute-force) hujumi bo'lyapti — nima qilasiz? / /auth/login is under a password brute-force attack — what do you do?

**Oddiy qilib aytganda:** hujumchi bir daqiqada minglab parolni sinab ko'ryapti. Yechim: bitta manzildan (IP) ma'lum vaqtda faqat **cheklangan** urinishga ruxsat berish — **rate limiting**. Limitdan oshsa — `429 Too Many Requests`.

**Yechim:**

```typescript
// app.module.ts
imports: [
  ThrottlerModule.forRoot({
    throttlers: [{ ttl: 60_000, limit: 100 }],   // umumiy: 1 daqiqada 100 so'rov (ttl — millisekund)
  }),
],
providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],

// auth.controller.ts — login uchun qattiqroq
@Throttle({ default: { limit: 5, ttl: 60_000 } })   // 1 daqiqada 5 urinish
@Post("login")
login(@Body() dto: LoginDto) { /* ... */ }
```

```typescript
// main.ts — proxy/CDN ortida haqiqiy klient IP'sini olish uchun
app.set("trust proxy", 1);
```

**Qanday tekshirasiz:** bir IP'dan 6 marta ketma-ket login qiling — 6-si `429` bo'lishi kerak. Ikki replica ishlasa — limit **umumiy** bo'lishini ham tekshiring.

**Intervyuda shunday ayting:** "`@nestjs/throttler` bilan global limit va login'ga qattiqroq limit qo'yaman. Proxy ortida `trust proxy` sozlamasi bo'lmasa, hamma so'rov proxy IP'sidan kelgandek ko'rinadi va hamma birga bloklanadi. Bir nechta replica bo'lsa, hisoblagichni Redis'da saqlayman — aks holda har replica o'z limitini beradi."

**Esda tuting:** IP limiti yetarli emas — hujumchi IP almashtiradi. Qo'shimcha: akkaunt bo'yicha kechikish, CAPTCHA, 2FA. Manba: [Rate limiting](https://docs.nestjs.com/security/rate-limiting).

## Q11. Bir xil katalog so'rovi bazaga sekundiga minglab marta urilyapti — nima qilasiz? / The same catalog query hits the database thousands of times per second — what do you do?

**Oddiy qilib aytganda:** katalog kamdan-kam o'zgaradi, lekin hamma uni so'raydi — har safar bazadan qayta o'qish isrof. Yechim: javobni qisqa muddat **eslab qolish** (kesh). Birinchi so'rov bazaga boradi, keyingilari keshdan oladi.

**Yechim:**

```typescript
// app.module.ts
imports: [CacheModule.register({ isGlobal: true, ttl: 30_000 })],   // 30 soniya (millisekund!)

// catalog.controller.ts
@UseInterceptors(CacheInterceptor)     // faqat GET javoblari keshlanadi
@CacheTTL(60_000)
@Get("products")
list() { return this.catalog.listProducts(); }

// Mahsulot o'zgarganda keshni tozalash
constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}
async update(id: string, dto: UpdateProductDto) {
  await this.catalog.update(id, dto);
  await this.cache.del("/products");   // aks holda 60 soniya eski narx ko'rinadi
}
```

**Qanday tekshirasiz:** 1000 ta so'rov yuboring — bazada bitta so'rov ko'rinishi kerak. Mahsulot yangilangandan keyin darhol yangi qiymat kelishini tekshiring.

**Intervyuda shunday ayting:** "O'qish ko'p, o'zgarish kam bo'lgan javoblarni TTL bilan keshlayman va yozishda keshni tozalayman. Bir nechta replica bo'lsa, xotiradagi kesh o'rniga Redis — aks holda har replica turli javob beradi. Foydalanuvchiga xos javoblarni URL bo'yicha keshlamayman — bir odamning ma'lumoti boshqasiga chiqib ketadi."

**Esda tuting:** `ttl` berilmasa, yozuv **hech qachon** eskirmaydi. Manba: [Caching](https://docs.nestjs.com/techniques/caching).

## Q12. Katta hisobot HTTP so'rov ichida tayyorlanib, 60 soniyada timeout bo'lyapti — nima qilasiz? / A large report is built inside the HTTP request and times out after 60 seconds — what do you do?

**Oddiy qilib aytganda:** uzoq ishni so'rov ichida qilmang. Restoranda ofitsiant buyurtmani oshxonaga beradi va sizga "tayyor bo'lsa chaqiraman" deydi — oshxona oldida kutib turmaydi. Xuddi shunday: so'rov faqat **vazifani navbatga qo'yadi** va darhol javob beradi, ishni esa alohida **worker** bajaradi.

**Yechim:**

```typescript
// reports.controller.ts
constructor(@InjectQueue("reports") private readonly queue: Queue) {}

@Post()
@HttpCode(202)                                               // "qabul qilindi, bajarilmoqda"
async create(@CurrentUser() user: User, @Body() dto: ReportDto) {
  const job = await this.queue.add("build", { userId: user.id, ...dto });
  return { jobId: job.id, statusUrl: `/reports/${job.id}` };
}

// reports.processor.ts — alohida worker jarayonida ishlashi mumkin
@Processor("reports")
export class ReportsProcessor extends WorkerHost {
  async process(job: Job<ReportJob>) {
    const file = await buildReport(job.data);
    await job.updateProgress(100);
    return { fileKey: file.key };
  }
}
```

**Qanday tekshirasiz:** `POST /reports` 1 soniyadan tez `202` qaytarishi; `GET /reports/:id` avval `active`, keyin `completed` holatini ko'rsatishi kerak. Worker'ni o'chirib yoqsangiz, vazifa yo'qolmasligi kerak.

**Intervyuda shunday ayting:** "Uzoq ishni BullMQ navbatiga olib chiqaman: API `202` va job ID qaytaradi, worker esa alohida masshtablanadi. Klient holatni so'rab turadi yoki tayyor bo'lganda xabar oladi. Worker qayta urinishi mumkin, shuning uchun ish idempotent bo'lishi kerak."

**Esda tuting:** API va worker'ni alohida jarayonlarda ishlating — og'ir hisobot API javob vaqtini sekinlashtirmasin. Manba: [Queues](https://docs.nestjs.com/techniques/queues).

## Q13. Fayl yuklash endpoint'i 2 GB lik faylni butunlay xotiraga olib, serverni yiqitishi mumkin — nima qilasiz? / The upload endpoint could load a 2 GB file fully into memory and crash the server — what do you do?

**Oddiy qilib aytganda:** NestJS'dagi fayl yuklash (multer) standart holatda faylni **to'liq xotirada** (`file.buffer`) saqlaydi. Bir nechta katta fayl — server xotirasi tugadi. Yechim: (1) hajmga **qattiq chegara**, (2) turini **fayl mazmunidan** tekshirish, (3) katta fayllarni diskka yoki to'g'ridan-to'g'ri S3'ga yozish.

**Yechim:**

```typescript
@Post("avatar")
@UseInterceptors(FileInterceptor("file", {
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },   // multer 5 MB dan keyin o'qishni to'xtatadi
}))
upload(
  @UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
      new FileTypeValidator({ fileType: /^image\/(png|jpeg|webp)$/ }),  // magic number bo'yicha
    ],
  }))
  file: Express.Multer.File,
) {
  return this.avatars.save(file);
}
```

**Qanday tekshirasiz:** 6 MB fayl → `413`/`400`; `.png` deb nomlangan `.exe` → `400`; 50 ta parallel yuklashda xotira grafigi keskin sakramasligi kerak.

**Intervyuda shunday ayting:** "`limits` multer darajasida o'qishni erta to'xtatadi, `ParseFilePipe` esa natijani tekshiradi. Juda katta fayllar uchun klientga S3 presigned URL beraman — fayl umuman serverimdan o'tmaydi."

**Esda tuting:** fayl nomi va klient yuborgan `Content-Type` ga ishonmang — ikkalasini ham soxtalashtirish oson. Manba: [File upload](https://docs.nestjs.com/techniques/file-upload).

## Q14. Javob formatini o'zgartirish kerak, lekin eski mobil ilovalar yangilanmagan — nima qilasiz? / You must change the response format but old mobile apps haven't updated — what do you do?

**Oddiy qilib aytganda:** mobil ilovani hamma darhol yangilamaydi — eski versiyalar oylab ishlaydi. Agar javobni o'zgartirsangiz, ular buziladi. Yechim: API'ning **ikkinchi versiyasini** yonma-yon ochish: eskilar `/v1` dan, yangilar `/v2` dan foydalanadi.

**Yechim:**

```typescript
// main.ts
app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

// users.controller.ts
@Controller({ path: "users", version: "1" })
export class UsersV1Controller {
  @Get(":id") findOne() { /* { name: "Ali Valiyev" } */ }
}

@Controller({ path: "users", version: "2" })
export class UsersV2Controller {
  @Get(":id") findOne() { /* { firstName: "Ali", lastName: "Valiyev" } */ }
}
// /v1/users/1 va /v2/users/1 bir vaqtda ishlaydi
```

**Qanday tekshirasiz:** eski ilova uchun contract testlar `/v1` da o'zgarmasdan o'tishi kerak. Log/metrikada `/v1` trafigini kuzating — nolga yaqinlashganda o'chirish rejasini e'lon qiling.

**Intervyuda shunday ayting:** "Iloji bo'lsa o'zgarishni orqaga mos qilaman — yangi maydon qo'shaman, eskisini o'chirmayman. Buzuvchi o'zgarish shart bo'lsa, URI versiyalash bilan `/v2` ochaman, `/v1` ni `Deprecation` sarlavhasi va aniq sana bilan asta o'chiraman."

**Esda tuting:** yangi versiya — ikki marta ko'p kod va test. Faqat haqiqatan buzuvchi o'zgarish uchun qiling. Manba: [Versioning](https://docs.nestjs.com/techniques/versioning).

## Q15. /health "ok" deyapti, lekin baza uzilgan va hamma so'rov 500 qaytaryapti — nima qilasiz? / /health says "ok" but the database is down and every request fails — what do you do?

**Oddiy qilib aytganda:** health endpoint faqat "jarayon tirikmi?" deb javob beryapti — u **bog'liqliklarni** tekshirmaydi. Ikki xil savol bor: **liveness** — "jarayon osilib qolmaganmi?" (yo'q bo'lsa — qayta ishga tushir) va **readiness** — "so'rov qabul qila olamanmi?" (baza ishlamasa — trafikni menga yuborma).

**Yechim:**

```typescript
@Controller("health")
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @Get("live")                               // faqat jarayon — bazani tekshirmaydi
  live() { return { status: "ok" }; }

  @Get("ready")
  @HealthCheck()                             // biror tekshiruv yiqilsa — 503
  ready() {
    return this.health.check([
      () => this.db.pingCheck("database", { timeout: 1_000 }),
    ]);
  }
}
```

**Qanday tekshirasiz:** bazani to'xtating — `/health/ready` → `503`, `/health/live` → `200`. Load balancer bu replica'ga trafik yubormay qo'yishi kerak.

**Intervyuda shunday ayting:** "Liveness va readiness'ni ajrataman. Liveness'ga bazani qo'shmayman: baza uzilsa, orkestrator hamma pod'larni qayta ishga tushiradi, bu esa muammoni kattalashtiradi. Readiness esa baza bilan tekshiriladi — tayyor bo'lmagan replica trafik olmaydi."

**Esda tuting:** health tekshiruviga qisqa timeout bering — aks holda baza sekinlashganda health ham osilib qoladi. Manba: [Health checks (Terminus)](https://docs.nestjs.com/recipes/terminus).

## Q16. WebSocket'ga token'siz ham ulanib, boshqalarning xabarlarini olish mumkin — nima qilasiz? / Anyone can connect to the WebSocket without a token and receive others' messages — what do you do?

**Oddiy qilib aytganda:** HTTP'da har so'rovda guard ishlaydi. WebSocket'da esa ulanish **bir marta** o'rnatiladi va keyin ochiq turadi. Agar ulanish paytida tekshirmasangiz — begona odam ichkarida qoladi. Yechim: ulanishning o'zida token'ni tekshirish va noto'g'ri bo'lsa — **darhol uzish**.

**Yechim:**

```typescript
@WebSocketGateway({ cors: { origin: ["https://app.example.com"] } })
export class ChatGateway implements OnGatewayConnection {
  constructor(private readonly auth: AuthService) {}

  async handleConnection(client: Socket) {
    try {
      const user = await this.auth.verify(client.handshake.auth?.token);
      client.data.user = user;
      await client.join(`user:${user.id}`);        // faqat o'z xonasiga
    } catch {
      client.disconnect(true);                      // token yo'q/noto'g'ri — uzamiz
    }
  }

  @SubscribeMessage("room:join")
  async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() roomId: string) {
    if (!(await this.rooms.isMember(roomId, client.data.user.id))) throw new WsException("Forbidden");
    await client.join(`room:${roomId}`);
  }
}
```

**Qanday tekshirasiz:** token'siz ulaning — ulanish darhol yopilishi kerak. A foydalanuvchi B ning xonasiga `room:join` yuborsa — xato olishi kerak.

**Intervyuda shunday ayting:** "Autentifikatsiya handshake'da, ruxsat esa har xabarda: ulandi degani hamma xonaga kira oladi degani emas. Token muddati tugasa ham ulanish ochiq qoladi, shuning uchun uzoq sessiyalarda token muddatini kuzatib, ulanishni uzaman."

**Esda tuting:** token'ni URL query'ga qo'ymang — u log'larda qoladi. `handshake.auth` dan foydalaning. Manba: [Gateways](https://docs.nestjs.com/websockets/gateways).

## Q17. 500 MB lik CSV eksport xotirani to'ldirib, server qayta ishga tushyapti — nima qilasiz? / A 500 MB CSV export fills memory and the server restarts — what do you do?

**Oddiy qilib aytganda:** hozir server butun faylni avval xotirada **to'liq** yig'ib, keyin yuboryapti. Yaxshisi — **oqim** (stream): fayl bo'lak-bo'lak o'qiladi va darhol klientga uzatiladi, xotirada bir vaqtda faqat kichik bo'lak turadi. Suvni chelakda emas, quvur orqali tashigandek.

**Yechim:**

```typescript
@Get("export")
async export(): Promise<StreamableFile> {
  const stream = await this.reports.createCsvStream();   // bazadan cursor bilan o'qiydigan Readable
  return new StreamableFile(stream, {
    type: "text/csv",
    disposition: 'attachment; filename="orders.csv"',
  });
}
```

**Qanday tekshirasiz:** eksport paytida jarayon xotirasi (`process.memoryUsage().rss`) fayl hajmiga qarab o'smasligi, taxminan bir xil qolishi kerak. Klient yuklashni to'xtatsa, bazadagi so'rov ham to'xtashi kerak.

**Intervyuda shunday ayting:** "Katta javoblarni stream qilaman: `StreamableFile` + bazada cursor. Shunda xotira fayl hajmiga bog'liq emas, klient birinchi baytni ham tezroq oladi. Stream backpressure'ni hurmat qiladi — klient sekin bo'lsa, o'qish ham sekinlashadi."

**Esda tuting:** `StreamableFile` ishlatganda `@Res()` ni qo'lda boshqarmang — Nest javobni o'zi yuboradi. Juda katta eksportlarni esa navbatda yaratib, tayyor faylga havola bering (Q12). Manba: [Streaming files](https://docs.nestjs.com/techniques/streaming-files).

## Q18. Navbat xabari qayta yetkazilganda (retry) bir xil buyruq ikki marta bajarilyapti — nima qilasiz? / A retried queue message executes the same command twice — what do you do?

**Oddiy qilib aytganda:** navbatlar (RabbitMQ, Kafka, NATS) xabarni **"kamida bir marta"** yetkazadi: handler ishni bajardi, lekin "bajardim" deb tasdiqlashga ulgurmadi — xabar yana keladi. Agar bu "hisobdan 100 so'm yech" bo'lsa — pul ikki marta yechiladi. Yechim: har xabarning noyob ID'sini bazada eslab qolish; ID allaqachon bo'lsa — qayta bajarmaslik.

**Yechim:** `consumed_messages` jadvaliga `UNIQUE (message_id)` constraint qo'ying; handler transaction ichida `INSERT ... ON CONFLICT (message_id) DO NOTHING RETURNING message_id` bajarsin. `RETURNING` qator qaytarsa — bu birinchi yetkazish, buyruqning DB o'zgarishini **shu transaction'da** bajaring. Qator qaytmasa — bu takror, ishni qilmasdan xabarni tasdiqlang (acknowledge).

```sql
CREATE TABLE consumed_messages (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  message_id  text NOT NULL,
  consumed_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT consumed_messages_message_id_key UNIQUE (message_id)
);
```

```typescript
@MessagePattern("payments.charge")
async charge(@Payload() command: ChargeCommand) {
  await this.db.transaction(async (tx) => {
    const inserted = await tx.query(
      `INSERT INTO consumed_messages (message_id) VALUES ($1)
       ON CONFLICT (message_id) DO NOTHING RETURNING message_id`,
      [command.messageId],
    );
    if (inserted.rowCount === 0) return;           // takror — hech narsa qilmaymiz
    await tx.query(
      "UPDATE accounts SET balance = balance - $1 WHERE id = $2",
      [command.amount, command.accountId],
    );
  });                                              // ikkalasi birga commit yoki birga rollback
}
```

**Qanday tekshirasiz:** integration testda bir xil `message_id` bilan ikkita xabar yuboring — balans faqat **bir marta** kamayishi kerak.

**Intervyuda shunday ayting:** "Kamida-bir-marta yetkazishda handler idempotent bo'lishi shart. Xabar ID'sini unique constraint bilan yozaman va biznes o'zgarishini shu transaction'da qilaman — ikkalasi birga saqlanadi yoki birga bekor bo'ladi. PostgreSQL `ON CONFLICT` unique buzilishida xato o'rniga muqobil amalni bajaradi, `RETURNING` esa faqat haqiqatan qo'shilgan qatorni qaytaradi."

**Esda tuting:** "avval tekshir (`SELECT`), keyin yoz" — ikki parallel handler'da ikkalasi ham "yo'q" deb ko'radi. Tekshirish va yozish **bitta atomik** amal bo'lishi kerak. Manba: [Nest microservices](https://docs.nestjs.com/microservices/basics), [PostgreSQL INSERT](https://www.postgresql.org/docs/current/sql-insert.html).

## Q19. Ilova 3 ta replica'da ishlaydi va tungi cron vazifasi 3 marta bajarilyapti — nima qilasiz? / The app runs 3 replicas and the nightly cron job runs 3 times — what do you do?

**Oddiy qilib aytganda:** `@Cron()` har bir replica ichida alohida ishlaydi — 3 ta nusxa, 3 ta "soat", 3 marta hisob-kitob (masalan, foydalanuvchilarga 3 ta bir xil xat). Yechim: vazifa boshlanishidan oldin umumiy **qulf** olish. Qulfni birinchi olgan replica ishlaydi, qolganlari o'tkazib yuboradi.

**Yechim:** har replica `@Cron()` boshida transaction ochib `SELECT pg_try_advisory_xact_lock(4242)` chaqirsin: natija `false` bo'lsa bu job'ni o'tkazib yuborsin, `true` bo'lsa ishni bajarib transaction'ni yakunlasin. Qulf transaction tugashi bilan avtomatik bo'shaydi — replica yiqilsa ham qulf "osilib" qolmaydi.

```typescript
const NIGHTLY_INVOICES_LOCK = 4242;   // barcha replica uchun bir xil, hujjatlashtirilgan kalit

@Cron("0 2 * * *")
async nightlyInvoices() {
  await this.db.transaction(async (tx) => {
    const { rows } = await tx.query("SELECT pg_try_advisory_xact_lock($1) AS locked", [NIGHTLY_INVOICES_LOCK]);
    if (!rows[0].locked) return;                    // boshqa replica ishlayapti
    await this.invoices.generateForYesterday(tx);
  });
}
```

**Qanday tekshirasiz:** integration testda ikki replica'ni bitta PostgreSQL'ga ulab, bir vaqtda ishga tushiring — ishni faqat **bittasi** bajarishi kerak.

**Intervyuda shunday ayting:** "Har replica o'z cron'iga ega, shuning uchun muvofiqlashtirish kerak. `pg_try_advisory_xact_lock` kutmaydi: qulf band bo'lsa darhol `false` qaytaradi va transaction tugaganda o'zi bo'shaydi. Katta tizimlarda cron'ni alohida bitta scheduler jarayoniga yoki navbatdagi takrorlanuvchi vazifaga ko'chiraman."

**Esda tuting:** qulf "bir vaqtda ikki marta" ni to'xtatadi, lekin "bir kunda ikki marta" ni emas (masalan, qo'lda qayta ishga tushirish). Buning uchun ish ham idempotent bo'lsin — "kecha uchun hisob allaqachon bormi?" Manba: [Task scheduling](https://docs.nestjs.com/techniques/task-scheduling), [PostgreSQL advisory locks](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS).

## Q20. main.ts'da useGlobalPipes qo'yilgan, lekin e2e testlarda validatsiya ishlamayapti — nega? / Global pipes are set in main.ts but validation doesn't run in e2e tests — why?

**Oddiy qilib aytganda:** e2e testlar ilovani `main.ts` orqali emas, `Test.createTestingModule(...)` bilan **o'zlari** yaratadi. `main.ts` dagi `app.useGlobalPipes(...)` qatori umuman bajarilmaydi — testdagi ilova validatsiyasiz ishlaydi va testlar "yashil" bo'lib, xatoni yashiradi. Yechim: global pipe, guard, filter va interceptor'larni **modulning o'zida** ro'yxatdan o'tkazish.

**Yechim:**

```typescript
// ❌ main.ts — faqat haqiqiy ishga tushishda ishlaydi
app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

// ✅ app.module.ts — test ham, production ham shu moduldan
@Module({
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }) },
    { provide: APP_GUARD, useClass: RolesGuard },          // DI ham ishlaydi (Reflector va h.k.)
    { provide: APP_FILTER, useClass: DomainErrorFilter },
  ],
})
export class AppModule {}
```

**Qanday tekshirasiz:** e2e testda noto'g'ri body yuboring — `400` kelishi kerak. Oldin bu test `201` bilan "o'tib" ketgan bo'lsa — xato topildi.

**Intervyuda shunday ayting:** "Globallarni `APP_PIPE`/`APP_GUARD`/`APP_FILTER`/`APP_INTERCEPTOR` provider'lari orqali modulda ro'yxatdan o'tkazaman. Ikki foyda: testdagi ilova productiondagi bilan bir xil ishlaydi va global guard'lar DI orqali boshqa service'larni ola biladi — `useGlobalGuards` modul kontekstidan tashqarida DI'ni qo'llamaydi."

**Esda tuting:** `main.ts` da faqat "server qanday ochiladi" qolsin (port, CORS, shutdown hook'lari); ilova xulq-atvori — modulda. Manba: [Pipes — global scoped pipes](https://docs.nestjs.com/pipes#global-scoped-pipes), [Guards](https://docs.nestjs.com/guards).
