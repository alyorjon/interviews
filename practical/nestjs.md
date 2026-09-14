# NestJS amaliy interview ssenariylari

Ushbu bank amaliy vaziyatlar uchun tuzilgan. Asosiy rasmiy manba: [nestjs hujjatlari](https://docs.nestjs.com/).

## Q1. Loyihada request bodydagi noma'lum maydonlar service qatlamiga o'tib ketmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin global ValidationPipega whitelist va forbidNonWhitelisted yoqing. Masalan, `app.useGlobalPipes(new ValidationPipe({ whitelist:true, forbidNonWhitelisted:true }))` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/techniques/validation).

## Q2. Loyihada role tekshiruvi controllerlarda takrorlanib ayrim route unutilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin metadata va Reflector o'qiydigan Guard yarating. Masalan, `@UseGuards(AuthGuard, RolesGuard)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/security/authorization).

## Q3. Loyihada service exceptioni turli controllerlarda turlicha HTTP javob bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin domain xatoni exception filterda yagona kontraktga map qiling. Masalan, `@Catch(DomainError) export class DomainFilter` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/exception-filters).

## Q4. Loyihada response ichida password hash tasodifan JSONga chiqmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin ClassSerializerInterceptor va Exclude bilan outbound modelni cheklang. Masalan, `@Exclude() passwordHash: string` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/techniques/serialization).

## Q5. Loyihada request latency va statusni har handlerda qo'lda loglashmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin interceptor bilan observable oqimini o'lchang. Masalan, `return next.handle().pipe(finalize(() => record(Date.now()-start)))` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/interceptors).

## Q6. Loyihada unit test real database providerini ko'tarib sekinlashmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin TestingModuleda provider tokenini mock bilan override qiling. Masalan, `module.overrideProvider(UserRepo).useValue(repoMock)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/fundamentals/testing).

## Q7. Loyihada ikki modul bir-birini import qilib circular dependency yaratdi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin shared boundaryni uchinchi modulga ajrating; forwardRefni vaqtinchalik choradagina ishlating. Masalan, `imports: [forwardRef(() => BillingModule)]` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/fundamentals/circular-dependency).

## Q8. Loyihada async database client tayyor bo'lmasdan service ishga tushmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin useFactory async provider bilan initializationni DI lifecyclega bog'lang. Masalan, `useFactory: async () => await createClient()` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/fundamentals/async-providers).

## Q9. Loyihada shutdown paytida queue connectionlari yopilmay container uzoq kutmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin shutdown hooksni yoqib OnModuleDestroyda connectionni yoping. Masalan, `app.enableShutdownHooks()` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/fundamentals/lifecycle-events).

## Q10. Loyihada config qiymati yo'q bo'lsa production kechroq noaniq xato bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin ConfigModule startup validation bilan fail-fast qilsin. Masalan, `ConfigModule.forRoot({ validate: validateEnv })` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/techniques/configuration).

## Q11. Loyihada public endpoint brute-force ostida qolmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin ThrottlerGuardni global qo'llab endpointga aniq limit bering. Masalan, `@Throttle({ default: { limit: 5, ttl: 60000 } })` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/security/rate-limiting).

## Q12. Loyihada bir xil GET query databasega tez-tez urilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin CacheInterceptorni faqat safe read routega qo'llang va invalidationni mutationga ulang. Masalan, `@UseInterceptors(CacheInterceptor)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/techniques/caching).

## Q13. Loyihada katta report HTTP request ichida bajarilib timeout bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin jobni queuega joylab 202 va job id qaytaring. Masalan, `await queue.add('report', { userId })` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/techniques/queues).

## Q14. Loyihada file upload RAMni to'ldirib yuborishi mumkin. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Multer limit va fileFilter bilan hajm/turini controllerdan oldin tekshiring. Masalan, `FileInterceptor('file', { limits:{ fileSize:5_000_000 } })` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/techniques/file-upload).

## Q15. Loyihada API breaking response o'zgarishini eski clientlar qabul qilmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin URI yoki header versioningni yoqing va migration davrida ikkisini saqlang. Masalan, `app.enableVersioning({ type: VersioningType.URI })` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/techniques/versioning).

## Q16. Loyihada health endpoint process tirik desa ham database uzilganini ko'rsatmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Terminus health indicator bilan muhim dependencylarni tekshiring. Masalan, `return this.health.check([() => this.db.pingCheck('db')])` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/recipes/terminus).

## Q17. Loyihada websocket client authorization handshake'dan keyin tekshirilmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin gateway guardda tokenni tekshirib user contextni socketga bog'lang. Masalan, `@UseGuards(WsAuthGuard)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/websockets/guards).

## Q18. Loyihada microservice handler retryda bir xil commandni ikki marta bajarmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Bir xil `message_id` bilan ikkita delivery yuborib, handlerning DB o'zgarishi bir marta bo'lishini integration testda o'lchang. `consumed_messages` jadvaliga `UNIQUE (message_id)` constraint qo'ying; handler transaction ichida `INSERT ... ON CONFLICT (message_id) DO NOTHING RETURNING message_id` bajarsin. `RETURNING` qator bersagina commandning DB o'zgarishini shu transactionda bajaring, qator qaytmasa duplicate'ni qayta ishlamasdan acknowledge qiling. Nest `@MessagePattern()` handlerni qanday ulashini hujjatlashtiradi; PostgreSQL hujjati esa `ON CONFLICT` unique buzilishida alternativ amal qilishini va `RETURNING` faqat haqiqatda insert/update bo'lgan qatorni qaytarishini belgilaydi. [Nest microservice handler](https://docs.nestjs.com/microservices/basics), [PostgreSQL `INSERT`](https://www.postgresql.org/docs/current/sql-insert.html).

## Q19. Loyihada scheduled job bir nechta replica tomonidan bir vaqtda ishlamoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Ikki replica'ni bir PostgreSQL clusteriga ulab, bir xil cron tickda faqat bittasi ish bajarganini integration testda tekshiring. Har replica `@Cron()` boshida transaction ochib `SELECT pg_try_advisory_xact_lock(4242)` chaqirsin: natija `false` bo'lsa jobni o'tkazib yuborsin, `true` bo'lsa DB ishini bajarib transactionni yakunlasin. Barcha replika uchun bir xil, hujjatlashtirilgan lock key ishlating. PostgreSQL transaction-level advisory lock faqat bo'sh bo'lsa olinishi, aks holda `false` qaytarishi va transaction tugaganda avtomatik bo'shashini bevosita belgilaydi. [Nest task scheduling](https://docs.nestjs.com/techniques/task-scheduling), [PostgreSQL advisory lock funksiyalari](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS).

## Q20. Loyihada custom decorator noto'g'ri request maydoniga qattiq bog'langan. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin createParamDecorator bilan extractionni bitta adapterda saqlang. Masalan, `export const CurrentUser = createParamDecorator((_, ctx) => ctx.switchToHttp().getRequest().user)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.nestjs.com/custom-decorators).
