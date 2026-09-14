# Next.js amaliy interview ssenariylari

Ushbu bank amaliy vaziyatlar uchun tuzilgan. Asosiy rasmiy manba: [nextjs hujjatlari](https://nextjs.org/docs/app).

## Q1. Loyihada Server Componentga onClick berilgani uchun serialization build xatosi chiqmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin interaktiv eng kichik chegarani use client fayliga ko'chiring. Masalan, `'use client'; export function BuyButton(){...}` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/server-and-client-components).

## Q2. Loyihada foydalanuvchiga tegishli dashboard cache orqali boshqa userga ko'rinishi xavfi bor. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin request data va private cache chegarasini ajrating, authni data access qatlamida qayta tekshiring. Masalan, `const session = await verifySession()` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/guides/authentication).

## Q3. Loyihada mutationdan keyin product sahifasi eski ma'lumotni ko'rsatmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Server Actiondan tegishli cache tagni invalidate qiling. Masalan, `updateTag(`product-${id}`)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/caching-and-revalidating).

## Q4. Loyihada Route Handler GET javobi kutilmaganda har safar qayta hisoblanmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin cache talabi bo'lsa uni aniq opt-in qiling va mutation endpointini cache qilmang. Masalan, `export const dynamic = 'force-static'` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/file-conventions/route).

## Q5. Loyihada server-only secret Client Component bundleiga chiqib ketish xavfi bor. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin secret ishlatadigan modulga server-only import qo'shing. Masalan, `import 'server-only'` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/server-and-client-components#preventing-environment-poisoning).

## Q6. Loyihada dynamic route paramni sync object deb o'qish upgrade'dan keyin xato bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin joriy App Router kontraktida params Promiseni await qiling. Masalan, `const { slug } = await params` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes).

## Q7. Loyihada sekin data fetch butun sahifa HTMLini kechiktirmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin sekin subtreeni Suspense bilan stream qiling. Masalan, `<Suspense fallback={<Skeleton />}><Report /></Suspense>` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/linking-and-navigating#streaming).

## Q8. Loyihada Server Action client yuborgan role maydoniga ishonib admin amalini bajarmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin har action ichida session va authorizationni serverda qayta tekshiring. Masalan, `if (!(await canEdit(id))) throw new Error('forbidden')` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/guides/authentication#authorization).

## Q9. Loyihada image layout shift va ortiqcha bandwidth bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Image componentga o'lcham va responsive sizes bering. Masalan, `<Image src={src} width={800} height={600} sizes='100vw' />` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/components/image).

## Q10. Loyihada self-hosted bir nechta instansiyada ISR cachelar mos kelmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin shared cache handler yoki sticky/persistent storage strategiyasini belgilang. Masalan, `cacheHandlers: { remote: require.resolve('./cache-handler.js') }` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/guides/self-hosting#caching-and-isr).

## Q11. Loyihada runtime exception foydalanuvchiga oq ekran ko'rsatmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin route segmentga error.tsx qo'shib reset callback bering. Masalan, `'use client'; export default function Error({reset}){...}` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/error-handling).

## Q12. Loyihada kutilgan 404 exception sifatida loglarni shovqinlantirmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin topilmagan resource uchun notFound chaqirib not-found UI bering. Masalan, `if (!post) notFound()` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/functions/not-found).

## Q13. Loyihada deploy subpathda asset URLlari rootga ketib 404 bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin basePathni build vaqtida aniq sozlang. Masalan, `const nextConfig = { basePath: '/portal' }` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath).

## Q14. Loyihada redirect qoidasi user inputni tashqi hostga yuborishi mumkin. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin destinationni allowlist qiling va statik redirects configdan foydalaning. Masalan, `redirects: async () => [{ source:'/old', destination:'/new', permanent:true }]` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects).

## Q15. Loyihada form ikki marta yuborilganda duplicate buyurtma yaratmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Bir xil `idempotency_key` bilan Server Actionni parallel ikki marta chaqiradigan integration test yozing. `orders` jadvaliga `UNIQUE (idempotency_key)` constraint qo'ying; transaction ichida `INSERT ... ON CONFLICT (idempotency_key) DO NOTHING RETURNING id` bajaring. Qator qaytsa yangi orderni davom ettiring, qaytmasa shu key bo'yicha mavjud orderni o'qing — UI'dagi pending tugmasi foydali bo'lsa-da, serverdagi shu atomik constraint retry va parallel so'rovni ham qoplaydi. Next.js hujjati form Server Actionni chaqirishini, PostgreSQL hujjati esa `ON CONFLICT` unique buzilishida alternativ amal va `RETURNING` semantikasini belgilaydi. [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations), [PostgreSQL `INSERT`](https://www.postgresql.org/docs/current/sql-insert.html).

## Q16. Loyihada metadata har renderda bir xil APIga qayta so'rov yubormoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin generateMetadata va page orasida cache qilingan data loader ulashing. Masalan, `const getProduct = cache(async id => db.product.find(id))` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).

## Q17. Loyihada katta npm paketi client bundlega kirib initial loadni sekinlashtirdi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin bundle analyzer bilan topib ishni Server Componentga ko'chiring yoki dynamic import qiling. Masalan, `const Chart = dynamic(() => import('./Chart'))` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/guides/package-bundling).

## Q18. Loyihada middleware og'ir database query sabab har request latency qo'shmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin middleware/proxyda faqat yengil precheck qiling, to'liq authni route/data qatlamida bajaring. Masalan, `export function proxy(request: NextRequest) { ... }` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/proxy).

## Q19. Loyihada CSP nonce SSR va hydration orasida mos kelmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin nonce'ni request header orqali o'tkazib Scriptga bir xil qiymat bering. Masalan, `<Script nonce={nonce} src='/client.js' />` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/guides/content-security-policy).

## Q20. Loyihada containerda standalone build ishga tushsa public assetlar topilmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin standalone outputga public va static kataloglarini deploy artefaktiga qo'shing. Masalan, `output: 'standalone'` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/config/next-config-js/output).
