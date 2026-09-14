# Vite amaliy interview ssenariylari

Ushbu bank amaliy vaziyatlar uchun tuzilgan. Asosiy rasmiy manba: [vite hujjatlari](https://vite.dev/guide/).

## Q1. Loyihada frontend secret VITE_ prefiksi bilan bundle ichiga chiqib ketdi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin VITE_ qiymatlarni public deb qabul qiling va secretni server endpointiga ko'chiring. Masalan, `const apiUrl = import.meta.env.VITE_API_URL` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/env-and-mode).

## Q2. Loyihada staging build production envni o'qib noto'g'ri APIga ulanmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin mode va env faylini aniq tanlang, NODE_ENV bilan mode farqini test qiling. Masalan, `vite build --mode staging` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/env-and-mode#modes).

## Q3. Loyihada productionda nested route refresh 404 bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin hostingda SPA fallbackni index.htmlga sozlang yoki framework SSR routingini ishlating. Masalan, `try_files $uri /index.html` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/static-deploy).

## Q4. Loyihada subpath deployda assetlar rootdan so'ralib 404 bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin base konfiguratsiyasini deploy prefixiga tenglang. Masalan, `export default defineConfig({ base: '/portal/' })` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/build#public-base-path).

## Q5. Loyihada dev server API cookie va CORS sabab ishlamayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin server.proxy orqali API originini proxy qiling. Masalan, `server: { proxy: { '/api': 'http://localhost:3000' } }` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/config/server-options#server-proxy).

## Q6. Loyihada katta kutubxona initial bundlega kirib sahifani sekin ochmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin dynamic import bilan route/feature chunk yarating va build outputni o'lchang. Masalan, `const module = await import('./heavy-feature.js')` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/features#dynamic-import).

## Q7. Loyihada yangi deploydan keyin eski HTML o'chirilgan chunkni so'ramoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin vite:preloadErrorni ushlab kontrolli reload qiling va eski assetlarni qisqa muddat saqlang. Masalan, `addEventListener('vite:preloadError', e => { e.preventDefault(); location.reload() })` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/build#load-error-handling).

## Q8. Loyihada dev startup sekinlashib qaysi plugin aybdorligi noma'lum. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin vite profile va plugin-transform debug bilan hook vaqtlarini o'lchang. Masalan, `vite --debug plugin-transform` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/performance).

## Q9. Loyihada monorepodagi linked dependency optimize qilinmay runtime duplicate package bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin optimizeDeps include va resolve.dedupe ni o'lchab aniq sozlang. Masalan, `optimizeDeps: { include: ['linked-dep'] }` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/config/dep-optimization-options).

## Q10. Loyihada HMRda modul state saqlanib test natijasi eski qiymatni ko'rsatmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin accept/dispose callbacklarda state cleanup qiling. Masalan, `import.meta.hot?.dispose(() => store.reset())` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/api-hmr).

## Q11. Loyihada plugin transform barcha fayllarni parse qilib dev serverni sekinlashtirdi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin hook boshida id yoki code filter bilan erta qayting. Masalan, `if (!id.endsWith('.feature')) return null` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/api-plugin).

## Q12. Loyihada SSR kod browser-only windowga tegib server renderda yiqilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin import.meta.env.SSR bilan environment branch qiling yoki clientga lazy yuklang. Masalan, `if (!import.meta.env.SSR) window.addEventListener('resize', fn)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/ssr).

## Q13. Loyihada library build dependencyni ichiga bundle qilib consumerda ikki React nusxasi chiqardi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin peer dependency'ni external qiling va output formatlarini belgilang. Masalan, `build: { lib:{ entry:'src/index.ts' }, rollupOptions:{ external:['react'] } }` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/build#library-mode).

## Q14. Loyihada worker fayli production buildda noto'g'ri URL bilan yuklanmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Vite tan oladigan new URL worker syntaxidan foydalaning. Masalan, `new Worker(new URL('./worker.js', import.meta.url), { type:'module' })` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/features#web-workers).

## Q15. Loyihada public katalogdagi fayl import qilinib hash oladi deb kutilgan. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin transform kerak assetni srcdan import qiling, nomi o'zgarmas faylni publicdan root URL bilan oling. Masalan, `const logo = new URL('./logo.svg', import.meta.url).href` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/assets).

## Q16. Loyihada glob import barcha modullarni eager yuklab bundle kattalashmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin import.meta.glob default lazy mapini saqlang va keraklisini chaqiring. Masalan, `const pages = import.meta.glob('./pages/*.tsx')` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/features#glob-import).

## Q17. Loyihada backend template Vite hashed manifestdan asset nomini topolmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin build.manifestni yoqib serverda manifest key orqali teg yarating. Masalan, `build: { manifest: true }` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/backend-integration).

## Q18. Loyihada CSS modul class nomi test va productionda turlicha deb hardcode qilingan. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin class mappingni import qiling va generated nomga tayanmang. Masalan, `import styles from './button.module.css'` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/features#css-modules).

## Q19. Loyihada browser target eski qurilmada syntax error bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin support matritsasiga ko'ra build.target yoki official legacy plugin tanlang. Masalan, `build: { target: 'es2019' }` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/build#browser-compatibility).

## Q20. Loyihada vite preview production server sifatida internetga chiqarilgan. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin previewni faqat lokal tekshiruvga qoldirib distni production server/CDNga bering. Masalan, `vite build && vite preview` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://vite.dev/guide/static-deploy).

