# ⚛️ 3. JavaScript Frontend (React.js, Vite & Next.js) — 100 Real-World Interview Questions & Answers
### Ikki tilli mukammal qo'llanma / Comprehensive Bilingual Reference (English 🇬🇧 & O'zbek 🇺🇿)

> **Mavzular / Topics:** React Virtual DOM, Fiber Architecture, Reconciliation, Core Hooks, Custom Hooks, State Management (Zustand/Redux), Vite HMR, Next.js 14 App Router, Server Components vs Client Components, Data Fetching (SSR, SSG, ISR, Streaming), Server Actions, Performance & SEO.  
> **Darajalar / Levels:** 🟢 Basic (1–30) | 🟡 Intermediate (31–70) | 🔴 Advanced (71–100)

---

# 📚 CHUQUR NAZARIYA VA FRONTEND ARXITEKTURASI

---

## 1. React Fiber & Next.js App Router Architecture
React.js UI qurish uchun deklarativ kutubxona. U **Virtual DOM** va **React Fiber Reconciliation** algoritmi orqali faqat o'zgargan komponentlarni real DOM ga qayta chizadi. **Next.js 14 App Router** esa React Server Components (RSC) yordamida serverda render qilib, minimal JS yuboradi.

---

# 🟢 QUESTIONS & ANSWERS (Q1 – Q100)

---


## Q1. React Fiber Virtual DOM & Reconciliation | React Fiber Virtual DOM va Reconciliation algoritmi

**EN:** Incremental diffing of virtual DOM trees.

**UZB:** Virtual DOM o'zgarishlarini asinxron bo me lib render qiladi.

```tsx
function Counter() { const [c, setC] = useState(0); return <button onClick={() => setC(c+1)}>{c}</button>; }
```

---

## Q2. React Core Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`) | React Asosiy Hook'lari

**EN:** State management, side effects, value & function memoization.

**UZB:** Komponent holati va asinxron amallarni boshqarish.

```tsx
const memoizedValue = useMemo(() => computeHeavy(data), [data]);
```

---

## Q3. Vite Build Engine vs Webpack Architecture | Vite build tool va Webpack taqqoslamasi

**EN:** Native ESM and Esbuild for sub-second HMR.

**UZB:** Vite Esbuild yordamida dev rejimida lahzalarda ishlaydi.

```tsx
export default defineConfig({ plugins: [react()] });
```

---

## Q4. Next.js 14 App Router: RSC vs Client Components | Next.js 14 React Server Components vs Client Components

**EN:** RSC renders on server with zero client JS bundle.

**UZB:** Server Components serverda render bo'lib JS yubormaydi.

```tsx
export default async function Page() { const users = await db.user.findMany(); return <div>{users.length}</div>; }
```

---

## Q5. Next.js Data Fetching: SSR, SSG, ISR & Streaming | Next.js Render strategiyalari (SSR, SSG, ISR, Streaming)

**EN:** SSR per request, SSG static, ISR revalidates.

**UZB:** Render strategiyalari va keshni yangilash.

```tsx
const data = await fetch('https://api.com', { next: { revalidate: 60 } });
```

---

## Q6. Custom React Hooks Development | Custom React Hooks yaratish

**EN:** Encapsulating reusable stateful component logic.

**UZB:** Qayta ishlatiladigan komponent mantiqini custom hookka o me tkazish.

```tsx
function useWindowSize() { const [s, setS] = useState({ w: window.innerWidth }); return s; }
```

---

## Q7. Zustand vs Redux Toolkit State Management | Zustand va Redux Toolkit global davlat boshqaruvi

**EN:** Zustand offers minimal boilerplate-free store.

**UZB:** Zustand yengil va qulay global state manager.

```tsx
const useStore = create(set => ({ count: 0, inc: () => set(s => ({ count: s.count + 1 })) }));
```

---

## Q8. React Query (TanStack Query) Server State Caching | React Query keshlash va Server State

**EN:** Automated background caching and refetching.

**UZB:** Server ma'lumotlarini keshga olish va fon yangilash.

```tsx
const { data } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
```

---

## Q9. Next.js Server Actions for Form Submissions | Next.js Server Actions yordamida formalar

**EN:** Executing server-side async functions directly from UI forms.

**UZB:** Formadan to'g'ridan-to'g me ri server backend funksiyasini chaqirish.

```tsx
'use server';
export async function createUser(formData) { await db.user.create({ data: { name: formData.get('name') } }); }
```

---

## Q10. Next.js Edge Middleware for Authentication & Routing | Next.js Edge Middleware va marshrutlarni himoyalash

**EN:** Running request interception at Vercel Edge runtime.

**UZB:** Edge serverda foydalanuvchi session kalitini tekshirish.

```tsx
export function middleware(req) { if(!req.cookies.has('token')) return NextResponse.redirect('/login'); }
```

---

## Q11. React: browser print dialogi ochilganda print-only holat DOMga kech tushib, noto'g'ri sahifa chop etilmoqda?

**UZB:** `beforeprint` kabi DOMni callback tugashidan oldin ko'radigan browser API bilan integratsiyada state update'ni `flushSync` ichida bajaring: `flushSync(() => setIsPrinting(true))`; `afterprint`da holatni qaytaring. Bu sinxron flush performancega zarar qilishi mumkin, shuning uchun oddiy React oqimida emas, faqat shu integratsiya chegarasida ishlating. Print dialog ochilgan paytda print-only element DOMda borligini browser test bilan tekshiring. [Rasmiy manba](https://react.dev/reference/react-dom/flushSync).

---

## Q12. React: setInterval callbacki ekrandagi eski count qiymatini doim ko'rmoqda?

**UZB:** Intervalni har countda qayta yaratish o'rniga functional updater ishlating; callback oldingi committed qiymatdan keyingisini hisoblaydi. Masalan, `setCount(current => current + 1)`. [Rasmiy manba](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state).

---

## Q13. React: tez almashgan userId uchun avvalgi fetch kech kelib yangi profilni bosmoqda?

**UZB:** Effect cleanupida eski so'rovni bekor qiling yoki ignore flag qo'ying; faqat faol request natijasi state yozsin. Masalan, `const c = new AbortController(); fetch(url, { signal: c.signal }); return () => c.abort()`. [Rasmiy manba](https://react.dev/reference/react/useEffect#fetching-data-with-effects).

---

## Q14. React: firstName va lastNamedan fullName state saqlanib, ayrim update'da eskirib qolmoqda?

**UZB:** Renderdan hosil bo'ladigan qiymatni alohida state/Effectga ko'chirmang; source state'lardan bevosita hisoblang. Masalan, `const fullName = firstName + ' ' + lastName`. [Rasmiy manba](https://react.dev/learn/you-might-not-need-an-effect).

---

## Q15. React: saralangan jadvalda input qiymati boshqa qatorga ko'chib ketmoqda?

**UZB:** Array index emas, recordning barqaror domain identifikatorini key qiling; React shunda element identitysini reorderda saqlaydi. Masalan, `rows.map(row => <Row key={row.id} row={row} />)`. [Rasmiy manba](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key).

---

## Q16. React: theme context o'zgarmasa ham yuzlab consumer har parent renderida yangilanmoqda?

**UZB:** Providerga beriladigan object va callback identitysini barqaror qiling, keyin Profilerda commitlarni qayta o'lchang. Masalan, `const value = useMemo(() => ({ theme, toggle }), [theme, toggle])`. [Rasmiy manba](https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions).

---

## Q17. React: checkout formidagi ko'p boolean state imkonsiz kombinatsiyalarga kirib qolmoqda?

**UZB:** Holat o'tishlarini reducer eventlariga aylantiring; reducer har event uchun yagona yangi state qaytarsin va invariantlar unit test qilinsin. Masalan, `const [state, dispatch] = useReducer(checkoutReducer, initialState)`. [Rasmiy manba](https://react.dev/learn/extracting-state-logic-into-a-reducer).

---

## Q18. React: qimmat chart memo qo'shilganiga qaramay sekinligicha qolmoqda?

**UZB:** Avval React Profiler bilan qaysi commit qimmatligini toping; faqat props barqaror bo'lsa memo qo'llang va taqqoslash xarajatini ham hisobga oling. Masalan, `const Chart = memo(ChartView)`. [Rasmiy manba](https://react.dev/reference/react/memo).

---

## Q19. React: video tabini yashirib qayta ochganda timecode yo'qolmasin, ammo yashirin tabdagi ovoz darhol to'xtasin?

**UZB:** Tabni unmount qilish o'rniga `<Activity mode={active ? 'visible' : 'hidden'}>` bilan yashiring: React ichki state va DOMni saqlaydi, Effectlarni esa hidden holatda cleanup qiladi. Video ref uchun `useLayoutEffect(() => () => videoRef.current?.pause(), [])` cleanup qo'shing; tab qaytganda timecode saqlanishi va yashirilganda audio to'xtashini integration testda tekshiring. [Rasmiy manba](https://react.dev/reference/react/Activity).

---

## Q20. React: tooltip o'lchami paintdan keyin hisoblanib ko'rinadigan sakrash bermoqda?

**UZB:** DOM o'lchovi keyingi paintdan oldin layoutga ta'sir qilishi shart bo'lsa useLayoutEffect ishlating; server renderda fallbackni saqlang. Masalan, `useLayoutEffect(() => setHeight(ref.current.getBoundingClientRect().height), [])`. [Rasmiy manba](https://react.dev/reference/react/useLayoutEffect).

---

## Q21. React: parent custom video playerga play buyrug'ini DOM tafsilotlarini bilmasdan bera olmayapti?

**UZB:** Imperative yuzani minimal saqlab useImperativeHandle orqali faqat kerakli metodlarni oching; oddiy data flow uchun props afzal. Masalan, `useImperativeHandle(ref, () => ({ play: () => video.current.play() }), [])`. [Rasmiy manba](https://react.dev/reference/react/useImperativeHandle).

---

## Q22. React: browser online holatini oddiy Effect bilan o'qish concurrent renderda tearing bermoqda?

**UZB:** External store uchun subscribe/getSnapshot kontraktini useSyncExternalStorega bering; server snapshot hydration bilan mos bo'lsin. Masalan, `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)`. [Rasmiy manba](https://react.dev/reference/react/useSyncExternalStore).

---

## Q23. React: katta filter hisoblanayotganda qidiruv inputi lag qilmoqda?

**UZB:** Inputning urgent update'ini darhol qoldirib, natija ro'yxati update'ini Transitionga o'tkazing; pending holatini UI'da ko'rsating. Masalan, `startTransition(() => setFilter(nextFilter))`. [Rasmiy manba](https://react.dev/reference/react/useTransition).

---

## Q24. React: parentdan kelgan query tez o'zgarib og'ir result subtree har safar bloklamoqda?

**UZB:** useDeferredValue bilan subtreega kechikishi mumkin bo'lgan snapshot bering; stale natijani vizual belgilab, network requestni bu bilan boshqarmang. Masalan, `const deferredQuery = useDeferredValue(query)`. [Rasmiy manba](https://react.dev/reference/react/useDeferredValue).

---

## Q25. React: admin editor barcha foydalanuvchilar uchun boshlang'ich bundle hajmini oshirdi?

**UZB:** Editor komponentini lazy import qiling va Suspense fallbackni uning eng yaqin chegarasiga qo'ying; chunk load errorini ham kuzating. Masalan, `const AdminEditor = lazy(() => import('./AdminEditor.js'))`. [Rasmiy manba](https://react.dev/reference/react/lazy).

---

## Q26. React: bitta widget render exceptioni butun sahifani oq ekranga aylantirmoqda?

**UZB:** Mustaqil widget atrofiga Error Boundary qo'ying; expected validation xatolarini throw qilmay oddiy state sifatida ko'rsating. Masalan, `<ErrorBoundary fallback={<WidgetError />}><AnalyticsWidget /></ErrorBoundary>`. [Rasmiy manba](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

---

## Q27. React: server HTMLdagi vaqt client render vaqtiga teng kelmay hydration warning chiqmoqda?

**UZB:** Birinchi client render server markup bilan aynan mos bo'lsin; browser-only qiymatni Effectdan keyin yangilang yoki aniq suppressionni juda tor joyda ishlating. Masalan, `const [mounted, setMounted] = useState(false); useEffect(() => setMounted(true), [])`. [Rasmiy manba](https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content).

---

## Q28. React: like tugmasi server javobini kutguncha sust ko'rinadi, xatoda esa optimistic qiymat qaytishi kerak?

**UZB:** useOptimistic setterini Action yoki Transition ichida chaqiring; server rad etsa canonical prop state optimistic ko'rinishni avtomatik almashtiradi. Masalan, `startTransition(async () => { addOptimistic(1); await saveLike() })`. [Rasmiy manba](https://react.dev/reference/react/useOptimistic).

---

## Q29. React: server action validation xatosi formaga qaytmay, faqat console'da ko'rinmoqda?

**UZB:** Known validation natijasini useActionState reducer state sifatida qaytaring; unknown exception nearest Error Boundaryga o'tsin. Masalan, `const [result, submit, pending] = useActionState(saveProfile, initialResult)`. [Rasmiy manba](https://react.dev/reference/react/useActionState).

---

## Q30. React: yuzlab inputli forma har keystrokda state objectini nusxalab sekinlashmoqda?

**UZB:** Submit vaqtida o'qiladigan oddiy maydonlarni uncontrolled qoldiring; FormData orqali qiymatlarni chegarada oling va serverda qayta tekshiring. Masalan, `const data = new FormData(event.currentTarget)`. [Rasmiy manba](https://react.dev/reference/react-dom/components/form).

---

## Q31. React: state ichidagi product object bevosita o'zgartirilgani uchun UI yangilanmayapti?

**UZB:** State'ni read-only snapshot deb ko'rib, o'zgargan path uchun yangi object yarating; eski objectni mutatsiya qiluvchi kodni olib tashlang. Masalan, `setProduct(current => ({ ...current, price: nextPrice }))`. [Rasmiy manba](https://react.dev/learn/updating-objects-in-state).

---

## Q32. React: Effect dependencydagi inline options object connectionni har renderda qayta boshlatmoqda?

**UZB:** Objectni Effect ichida yarating yoki primitive dependencylarni ajrating; linter dependencylarini yashirmang. Masalan, `useEffect(() => { const options = { roomId }; return connect(options) }, [roomId])`. [Rasmiy manba](https://react.dev/reference/react/useEffect#removing-unnecessary-object-dependencies).

---

## Q33. React: custom Hook faqat enabled bo'lsa chaqirilib hook order productionda buzilmoqda?

**UZB:** Hookni har render top-levelda bir xil tartibda chaqiring; disabled holatini hook argumenti yoki ichki Effect sharti bilan ifodalang. Masalan, `const result = useSubscription(enabled ? topic : null)`. [Rasmiy manba](https://react.dev/reference/rules/rules-of-hooks).

---

## Q34. React: modal portal orqali bodyga render bo'lsa ham parent click handleri kutilmaganda ishlamoqda?

**UZB:** Portal DOM joylashuvini emas React tree event bubblingini saqlashini hisobga oling; dialog ichida propagationni boshqaring yoki handlerni qayta joylashtiring. Masalan, `createPortal(<Dialog onClick={e => e.stopPropagation()} />, document.body)`. [Rasmiy manba](https://react.dev/reference/react-dom/createPortal).

---

## Q35. React: bir sahifada ko'p accordion label va panel idlari SSRda collision bermoqda?

**UZB:** useId bilan component instansiyasiga barqaror accessibility prefix yarating; list key yoki cache key sifatida useId ishlatmang. Masalan, `const id = useId(); return <button aria-controls={id + '-panel'} />`. [Rasmiy manba](https://react.dev/reference/react/useId).

---

## Q36. React: komponent testi clickdan keyin state commit bo'lishidan oldin assertion qilmoqda?

**UZB:** Render va interaction update'larini act bilan flush qiling; internal state emas, foydalanuvchi ko'radigan DOM natijasini tasdiqlang. Masalan, `await act(async () => { submitButton.click() })`. [Rasmiy manba](https://react.dev/reference/react/act).

---

## Q37. React: ikki sibling komponent bir xil tanlangan itemni turlicha saqlab desync bo'lmoqda?

**UZB:** Shared state'ni eng yaqin umumiy parentga ko'taring va childlarga value hamda event callback bering. Masalan, `<List selectedId={selectedId} onSelect={setSelectedId} />`. [Rasmiy manba](https://react.dev/learn/sharing-state-between-components).

---

## Q38. React: reset tugmasi editorning ichki state'ini to'liq boshlang'ich holatga qaytarmayapti?

**UZB:** Editor identitysini key bilan almashtiring; key o'zgarsa React eski subtree state'ini tashlab yangi instansiya yaratadi. Masalan, `<ProfileEditor key={profileId} profile={profile} />`. [Rasmiy manba](https://react.dev/learn/preserving-and-resetting-state#resetting-a-form-with-a-key).

---

## Q39. React: memo custom comparator yangi callback ichidagi eski propsni yashirib qo'ymoqda?

**UZB:** Comparator barcha prop, jumladan functionlarni solishtirsin; comparator renderdan qimmat bo'lmasligini Performance panelda o'lchang. Masalan, `memo(Row, (prev, next) => prev.item === next.item && prev.onOpen === next.onOpen)`. [Rasmiy manba](https://react.dev/reference/react/memo#specifying-a-custom-comparison-function).

---

## Q40. React: API'dan kelgan HTMLni dangerouslySetInnerHTML bilan chiqarish XSS xavfini tug'dirmoqda?

**UZB:** Faqat ishonchli va sanitizatsiya qilingan HTMLga ruxsat bering; odatiy user matnini JSX text sifatida render qiling. Masalan, `return <p>{userComment}</p>`. [Rasmiy manba](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html).

---

## Q41. Next.js: interaktiv widget sabab butun page Client Componentga aylantirilib bundle kattalashdi?

**UZB:** Page va data fetchni Server Componentda qoldiring, faqat event handler kerak bo'lgan leafga use client chegarasini tushiring. Masalan, `'use client'; export function FilterButton() { /* interaction */ }`. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/server-and-client-components).

---

## Q42. Next.js: Client Componentga database client yoki function prop uzatilganda build serialization xatosi chiqdi?

**UZB:** Client boundary orqali faqat serializable data uzating; server amallarini Server Function yoki Route Handler ortida saqlang. Masalan, `<ClientChart points={plainPoints} />`. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/directives/use-client).

---

## Q43. Next.js: private API kaliti import zanjiri orqali client bundlega chiqishi mumkin?

**UZB:** Maxfiy modul boshiga server-only import qo'shing va public browser configda secret saqlamang. Masalan, `import 'server-only'`. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/server-and-client-components#preventing-environment-poisoning).

---

## Q44. Next.js: Server Action client yuborgan userId bilan boshqa hisobni tahrir qila olyapti?

**UZB:** Har actionni public endpoint deb ko'rib sessionni serverda tekshiring, resource ownershipni database query shartiga qo'shing. Masalan, `await db.note.update({ where: { id, ownerId: session.user.id }, data })`. [Rasmiy manba](https://nextjs.org/docs/app/guides/authentication#authorization).

---

## Q45. Next.js: Route Handler audit log yozilishini kutgani uchun foydalanuvchiga javob keragidan kech qaytmoqda?

**UZB:** Asosiy mutation natijasini tayyorlagach, bloklamaydigan audit/analytics ishini `after(() => writeAudit(event))` bilan response tugaganidan keyinga rejalashtiring. Requestdan kerakli qiymatlarni callbackdan oldin o'qib, closurega faqat zarur snapshotni bering; callback platformaning `maxDuration` chegarasida tugashini failure testi bilan tekshiring. Transactional majburiy yozuvni `after`ga ko'chirmang. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/functions/after).

---

## Q46. Next.js: layout va page bir requestda bir xil userni ikki marta database'dan o'qimoqda?

**UZB:** Non-fetch data loaderni React cache bilan request doirasida memoize qiling; bu natijani userlar orasida persistent cache deb qabul qilmang. Masalan, `export const getUser = cache(async () => db.user.findUnique(...))`. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/fetching-data#deduplicate-requests-and-cache-data).

---

## Q47. Next.js: GET Route Handler yangi versiyada kutilmaganda cache qilinmay, backend yukini oshirdi?

**UZB:** Route uchun freshness talabini aniq belgilang; static javob bo'lsa force-static, userga bog'liq bo'lsa dynamic holda qoldiring. Masalan, `export const dynamic = 'force-static'`. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/file-conventions/route#caching).

---

## Q48. Next.js: dynamic page eski sync params usuli bilan TypeScript xatosi bermoqda?

**UZB:** App Router page kontraktidagi params Promiseni await qiling va notanish slugni notFound bilan yakunlang. Masalan, `const { slug } = await params`. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes).

---

## Q49. Next.js: sekin recommendations so'rovi butun product HTMLini kutdirib qo'ydi?

**UZB:** Asosiy productni darhol render qiling, sekin subtreeni Suspense boundary bilan stream qiling. Masalan, `<Suspense fallback={<RecommendationsSkeleton />}><Recommendations id={id} /></Suspense>`. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/linking-and-navigating#streaming).

---

## Q50. Next.js: report widget exceptioni butun route segmentni yiqitmoqda?

**UZB:** Segmentga error.tsx qo'shib recoverable reset bering; xatoni observabilityga yuboring, sensitive detailni UIga chiqarmang. Masalan, `export default function Error({ reset }) { return <button onClick={reset}>Retry</button> }`. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/error-handling).

---

## Q51. Next.js: yo'q blog posti null sahifa yoki 200 status bilan qaytmoqda?

**UZB:** Data loader post topmasa notFound chaqirsin; not-found.tsx foydalanuvchi holatini ko'rsatsin. Masalan, `if (!post) notFound()`. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/functions/not-found).

---

## Q52. Next.js: dashboard sloti topilmaganda hard refresh 404, client navigationda esa eski state ko'rsatmoqda?

**UZB:** Har parallel route slotiga default.tsx fallback qo'shing va unmatched holatini ataylab belgilang. Masalan, `export default function Default() { return null }`. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes#defaultjs).

---

## Q53. Next.js: photo modal direct URLda alohida page, gallerydan o'tganda overlay bo'lishi kerak?

**UZB:** Intercepting route convention bilan soft navigationni modalga tuting, canonical full page route'ni ham saqlang. Masalan, `app/@modal/(.)photo/[id]/page.tsx`. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes).

---

## Q54. Next.js: har product uchun title va Open Graph ma'lumoti database'dan keladi?

**UZB:** generateMetadata ichida validated paramsdan data oling; topilmagan recordni va absolute metadataBase'ni tekshiring. Masalan, `export async function generateMetadata({ params }) { const { id } = await params; return { title: await titleFor(id) } }`. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).

---

## Q55. Next.js: responsive hero rasmi LCPni yomonlashtirib layout shift bermoqda?

**UZB:** Imagega intrinsic o'lcham yoki fill container bering, real viewportlarga mos sizes yozing va faqat haqiqiy LCP rasmga priority/preload qo'llang. Masalan, `<Image src={hero} alt='' width={1200} height={630} sizes='(max-width: 768px) 100vw, 50vw' />`. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/components/image).

---

## Q56. Next.js: custom font har route'da tashqi serverdan kech yuklanib CLS bermoqda?

**UZB:** next/font orqali fontni self-host qiling, kerakli subset/weightni tanlang va CSS variable bilan scope qiling. Masalan, `const inter = Inter({ subsets: ['latin'], display: 'swap' })`. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/fonts).

---

## Q57. Next.js: analytics script hydrationdan oldin main threadni band qilyapti?

**UZB:** next/script strategy'ni dependencyga qarab tanlang; worker yoki lazyOnloadga ko'chirishdan oldin scriptning browser talabini tekshiring. Masalan, `<Script src='/analytics.js' strategy='lazyOnload' />`. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/components/script).

---

## Q58. Next.js: nonce bilan CSP yoqilganda inline framework scriptlari bloklanmoqda?

**UZB:** Har requestda nonce yarating, CSP headerga va Script komponentlariga bir xil qiymatni uzating; static caching trade-offini qayta baholang. Masalan, `<Script nonce={nonce} src='/trusted.js' />`. [Rasmiy manba](https://nextjs.org/docs/app/guides/content-security-policy).

---

## Q59. Next.js: proxy fayli har asset requestda auth tekshiruvini bajarib latency qo'shmoqda?

**UZB:** Matcher bilan static, image va metadata yo'llarini chiqarib tashlang; proxyda faqat optimistic redirect, secure checkni data qatlamida bajaring. Masalan, `export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] }`. [Rasmiy manba](https://nextjs.org/docs/app/getting-started/proxy).

---

## Q60. Next.js: user kiritgan returnTo qiymati open redirectga sabab bo'lishi mumkin?

**UZB:** Client yuborgan to'liq URLni bevosita `redirect()`ga bermang. Eng xavfsiz yo'l — serverdagi kalitdan oldindan belgilangan relative pathga mapping; erkin path kerak bo'lsa `new URL(returnTo, origin)` bilan parse qilib origin aynan o'z domeningiz ekanini va pathname same-origin allowlist ichida ekanini tekshiring, aks holda `/dashboard`ga qayting. Tashqi URL va `//evil.example` uchun negative test yozing. [Next.js `redirect`](https://nextjs.org/docs/app/api-reference/functions/redirect), [OWASP redirect himoyasi](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html).

---

## Q61. Next.js: ikki self-hosted replica ISR yangilanishini turlicha ko'rsatmoqda?

**UZB:** Default disk cache per-instance ekanini hisobga olib shared cache handler va deployment-wide invalidation channel belgilang. Masalan, `cacheHandlers: { remote: require.resolve('./shared-cache.js') }`. [Rasmiy manba](https://nextjs.org/docs/app/guides/self-hosting#caching-and-isr).

---

## Q62. Next.js: standalone container serveri ishlaydi, lekin CSS va public rasmlar 404?

**UZB:** Builddan keyin public va .next/static kataloglarini standalone artefaktga nusxalang; runtime image ichida URLlarni smoke-test qiling. Masalan, `cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/`. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/config/next-config-js/output).

---

## Q63. Next.js: NEXT_PUBLIC prefiksli qiymat runtime container env bilan almashadi deb kutilgan?

**UZB:** Public qiymatlar build vaqtida browser bundlega inline bo'lishini qabul qiling; runtime config kerak bo'lsa server endpoint yoki dynamic renderdan bering. Masalan, `const publicApi = process.env.NEXT_PUBLIC_API_URL`. [Rasmiy manba](https://nextjs.org/docs/app/guides/environment-variables#bundling-environment-variables-for-the-browser).

---

## Q64. Next.js: productiondagi sekin server render qaysi route va querydan kelgani ko'rinmayapti?

**UZB:** instrumentation.ts register va onRequestError hookida trace/error atributlarini observability backendga yuboring. Masalan, `export async function register() { await import('./instrumentation.node.js') }`. [Rasmiy manba](https://nextjs.org/docs/app/guides/instrumentation).

---

## Q65. Next.js: katta CSV Route Handler RAMga to'liq yig'ilib serverni bosmoqda?

**UZB:** ReadableStream qaytaring, content type/dispositionni belgilang va client disconnect cancellationini downstreamga uzating. Masalan, `return new Response(stream, { headers: { 'content-type': 'text/csv' } })`. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/file-conventions/route#streaming).

---

## Q66. Next.js: JavaScript o'chirilgan browserda form submit bo'lmayapti, hydrated holatda esa yuborish jarayoni ko'rinmayapti?

**UZB:** Server Componentdagi `<form action={createOrder}>`ga Server Actionni to'g'ridan-to'g'ri bering — bu progressive enhancement orqali client JavaScript yuklanmasa ham submit qiladi. Hydrated Client Componentda `const [state, formAction, pending] = useActionState(createOrder, initialState)` ishlatib formga `action={formAction}` bering va `pending` rost paytda “Yuborilmoqda…” holatini chiqaring. JavaScript o'chirilganda action chaqirilishini, yoqilganda esa `pending` almashishini browser testda tekshiring. [Rasmiy manba](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).

---

## Q67. Next.js: mutationdan keyin faqat joriy path emas, shu product ishlatilgan boshqa sahifalar ham eskirdi?

**UZB:** Resource fetchni taglang va actiondan shu tagni revalidate qiling; path-based invalidationni faqat routega xos data uchun qoldiring. Masalan, `revalidateTag('product-' + id)`. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/functions/revalidateTag).

---

## Q68. Next.js: cookies o'qilgan component static shell ichida build vaqtida render bo'la olmayapti?

**UZB:** Request-time API ishlatadigan subtreeni Suspense bilan dynamic chegaraga ajrating yoki cache qilinmaydigan route sifatida ataylab belgilang. Masalan, `const cookieStore = await cookies()`. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/functions/cookies).

---

## Q69. Next.js: static exportga o'tganda dynamic server route va image optimizer ishlamay qoldi?

**UZB:** Export cheklovlarini oldindan inventarizatsiya qiling; server feature kerak bo'lsa Node deploymentda qoling, aks holda dynamic paramsni buildda yarating. Masalan, `const nextConfig = { output: 'export' }`. [Rasmiy manba](https://nextjs.org/docs/app/guides/static-exports).

---

## Q70. Next.js: server bundlega katta optional SDKlar kirib cold startni oshirmoqda?

**UZB:** Package importini routega yaqinlashtiring, optimizePackageImports/serverExternalPackages variantlarini bundle analyzer va runtime compatibility bilan tekshiring. Masalan, `const nextConfig = { serverExternalPackages: ['native-sdk'] }`. [Rasmiy manba](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages).

---

## Q71. Vite: API secret VITE_ nomi bilan browser source'da ko'rinib qoldi?

**UZB:** VITE_ prefiksli barcha qiymatni public deb hisoblang; secret bilan ishlaydigan chaqiruvni serverga ko'chiring va exposed credentialni almashtiring. Masalan, `const publicOrigin = import.meta.env.VITE_PUBLIC_ORIGIN`. [Rasmiy manba](https://vite.dev/guide/env-and-mode).

---

## Q72. Vite: QA build .env.production qiymatini olib noto'g'ri backendga ketmoqda?

**UZB:** Mode va NODE_ENV alohida tushuncha ekanini hisobga olib QA uchun .env.qa yarating va build commandda mode'ni aniq bering. Masalan, `vite build --mode qa`. [Rasmiy manba](https://vite.dev/guide/env-and-mode#modes).

---

## Q73. Vite: vite build TypeScript xatolari bo'lsa ham muvaffaqiyatli tugayapti?

**UZB:** Vite faqat TS transpile qilishini hisobga olib canonical buildga tsc --noEmit yoki project buildni alohida gate sifatida qo'shing. Masalan, `tsc --noEmit && vite build`. [Rasmiy manba](https://vite.dev/guide/features#typescript).

---

## Q74. Vite: custom store HMRdan keyin eski subscriberlarni saqlab eventni ko'paytirmoqda?

**UZB:** HMR dispose callbackida listener va singleton state'ni tozalang; accept boundaryni modul ownershipiga yaqin joylashtiring. Masalan, `import.meta.hot?.dispose(() => store.destroy())`. [Rasmiy manba](https://vite.dev/guide/api-hmr).

---

## Q75. Vite: katta metadata.json faylidan faqat version kerak, ammo default import butun obyektni client chunkka olib kirmoqda?

**UZB:** Vite JSON named importlarini tree-shake qila oladi, shuning uchun `import { version } from './metadata.json'` ishlating va faqat kerakli maydonni export qiling. Production builddan oldin-keyin chunk tarkibi va gzip hajmini solishtiring; runtime'da dinamik kalitlar bilan butun obyekt kerak bo'lsa bu optimizatsiyani majburlamang. [Rasmiy manba](https://vite.dev/guide/features#json).

---

## Q76. Vite: portal /tools subpathda ochiladi, ammo generated asset URLlari domain rootiga ketmoqda?

**UZB:** Build base'ni yakuniy public pathga sozlang; router basename va reverse proxy pathi bilan bir xil ekanini preview artefaktda tekshiring. Masalan, `export default defineConfig({ base: '/tools/' })`. [Rasmiy manba](https://vite.dev/guide/build#public-base-path).

---

## Q77. Vite: footerda build versiyasi kerak, ammo browserda process.env mavjud emasligi uchun runtime xato chiqmoqda?

**UZB:** Build vaqtida almashtiriladigan aniq constant yarating: `define: { __APP_VERSION__: JSON.stringify(process.env.npm_package_version) }`; TypeScript uchun `declare const __APP_VERSION__: string` qo'shing. `define` matnli global replacement ekanini hisobga olib qiymatni `JSON.stringify` qiling va build artefaktida kutilgan versiyani smoke-test qiling. Secretni bu yo'l bilan bermang, chunki qiymat client kodiga yoziladi. [Rasmiy manba](https://vite.dev/config/shared-options#define).

---

## Q78. Vite: developmentda /api so'rovlari CORS cookie bilan bloklanyapti?

**UZB:** Vite server.proxy orqali pathni backendga uzating, changeOrigin va TLSni faqat dev ehtiyojiga qarab sozlang. Masalan, `server: { proxy: { '/api': { target: 'http://127.0.0.1:3000', changeOrigin: true } } }`. [Rasmiy manba](https://vite.dev/config/server-options#server-proxy).

---

## Q79. Vite: dev serverni wildcard CORS bilan LANga ochish boshqa saytga source o'qish imkonini bermoqda?

**UZB:** server.corsni aniq trusted origin bilan cheklang; remote access bo'lmasa default localhost modelini saqlang. Masalan, `server: { cors: { origin: 'https://dev.example.test' } }`. [Rasmiy manba](https://vite.dev/config/server-options#server-cors).

---

## Q80. Vite: DNS rebindingdan himoya uchun allowedHosts true qilib yuborilgan?

**UZB:** allowedHostsga faqat boshqariladigan hostlarni yozing; true qiymati har qanday host headerni qabul qilishini hisobga oling. Masalan, `server: { allowedHosts: ['dev.example.test'] }`. [Rasmiy manba](https://vite.dev/config/server-options#server-allowedhosts).

---

## Q81. Vite: production diagnostikasi uchun alohida source map fayli kerak, ammo bundle ichida sourceMappingURL commenti bo'lmasligi shart?

**UZB:** `build: { sourcemap: 'hidden' }` sozlang: Vite alohida source map yaratadi, lekin bundled fayllarga source map commentini yozmaydi. CI smoke-testda `.map` artefakti mavjudligini va emitted JS oxirida `sourceMappingURL` yo'qligini tekshiring; xaritani qayerda saqlash va kimga berish alohida deployment siyosati bo'lib qoladi. [Rasmiy manba](https://vite.dev/config/build-options#build-sourcemap).

---

## Q82. Vite: eski korporativ browser production bundle syntaxini parse qila olmayapti?

**UZB:** Qo'llab-quvvatlash matritsasidan build.target tanlang; transform qilinmaydigan web APIlar uchun polyfill zaruratini alohida tekshiring. Masalan, `build: { target: ['chrome100', 'safari15'] }`. [Rasmiy manba](https://vite.dev/config/build-options#build-target).

---

## Q83. Vite: eski WebView #RGBA CSS rangini tushunmay style buzmoqda?

**UZB:** JavaScript targetdan mustaqil build.cssTarget qo'ying va aynan shu WebViewda visual regressionni qayta ishlating. Masalan, `build: { cssTarget: 'chrome61' }`. [Rasmiy manba](https://vite.dev/config/build-options#build-csstarget).

---

## Q84. Vite: lazy route JS bilan birga uning CSS'i kech kelib qisqa FOUC paydo qilmoqda?

**UZB:** cssCodeSplit behaviorini o'lchang; route CSS chunk preloadini saqlash yoki bitta CSS bundle trade-offini real waterfall bilan tanlang. Masalan, `build: { cssCodeSplit: false }`. [Rasmiy manba](https://vite.dev/config/build-options#build-csscodesplit).

---

## Q85. Vite: vendor chunk strategiyasi har kichik dependency update'da katta cache invalidation bermoqda?

**UZB:** Output code-splitting qoidalarini import graph va change frequencyga qarab belgilang; chunklar sonini waterfall bilan solishtiring. Masalan, `build: { rolldownOptions: { output: { codeSplitting: { groups: [{ name: 'vendor', test: /node_modules/ }] } } } }`. [Rasmiy manba](https://vite.dev/guide/build#chunking-strategy).

---

## Q86. Vite: kichik deb o'ylangan base64 assetlar JS/CSS hajmini kutilmaganda oshirdi?

**UZB:** assetsInlineLimitni network va cache ehtiyojiga qarab o'lchang; Git LFS placeholder inline qilinmasligini ham tekshiring. Masalan, `build: { assetsInlineLimit: 2048 }`. [Rasmiy manba](https://vite.dev/config/build-options#build-assetsinlinelimit).

---

## Q87. Vite: GLTF model importi unknown file type xatosi bermoqda, ammo buildda hashed asset URL qaytishi kerak?

**UZB:** Custom binary extensionni static asset sifatida taniting: `assetsInclude: ['**/*.gltf']`; undan keyin `import modelUrl from './scene.gltf'` resolved URL qaytaradi va build asset pipeline uni boshqaradi. Dev va productionda URL ochilishini, fayl esa plugin transform pipeline'iga tasodifan kirmasligini tekshiring. [Rasmiy manba](https://vite.dev/config/shared-options#assetsinclude).

---

## Q88. Vite: markdown page globi barcha 500 modulni initial bundlega eager qo'shmoqda?

**UZB:** Default lazy import.meta.glob mapidan foydalaning; faqat build-time metadata zarur bo'lsa query/import optionsni toraytiring. Masalan, `const pages = import.meta.glob('./pages/*.md')`. [Rasmiy manba](https://vite.dev/guide/features#glob-import).

---

## Q89. Vite: chart kutubxonasi dashboard ochilmasa ham entry chunkka kirib ketmoqda?

**UZB:** Feature boundaryda dynamic import qiling; network failure uchun UI fallback va retry oqimini qo'shing. Masalan, `const { renderChart } = await import('./charts.js')`. [Rasmiy manba](https://vite.dev/guide/features#dynamic-import).

---

## Q90. Vite: worker source productionda /src yo'lidan olinib 404 bermoqda?

**UZB:** Statik tahlil qilinadigan new URL syntaxini worker constructor ichida ishlating va module type'ni belgilang. Masalan, `new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })`. [Rasmiy manba](https://vite.dev/guide/features#web-workers).

---

## Q91. Vite: compliance tekshiruvi production bundle ichidagi dependency litsenziyalarining to'liq ro'yxatini so'ramoqda?

**UZB:** `build: { license: true }`ni yoqing; Vite bundled dependencylar litsenziyalarini `dist/.vite/license.md` fayliga chiqaradi. CI'da fayl yaratilgani va kutilgan dependency nomi/versioni borligini tekshiring; maxsus downstream format kerak bo'lsa `license: { fileName: 'licenses.json' }` bilan JSON metadata chiqaring. [Rasmiy manba](https://vite.dev/config/build-options#build-license).

---

## Q92. Vite: SSR entry render paytida window ishlatib Node processni yiqitmoqda?

**UZB:** Universal moduldan browser-only side effectni ajrating yoki import.meta.env.SSR branch bilan build-time chiqarib tashlang. Masalan, `if (!import.meta.env.SSR) window.addEventListener('resize', onResize)`. [Rasmiy manba](https://vite.dev/guide/ssr#conditional-logic).

---

## Q93. Vite: SSR webworker target Node built-in dependency sabab buildda ishlamayapti?

**UZB:** Runtime targetga mos package tanlang; webworker bundle zarur bo'lsa ssr.noExternal Node built-in importlarda xato berishini acceptance'da tekshiring. Masalan, `ssr: { target: 'webworker', noExternal: true }`. [Rasmiy manba](https://vite.dev/guide/ssr#ssr-target).

---

## Q94. Vite: monorepodagi kerakli shared fayl /@fs orqali 403 qaytarmoqda, lekin dev serverni butun diskka ochish mumkin emas?

**UZB:** `server.fs.strict`ni yoqilgan holda saqlang va faqat workspace root hamda kerakli shared katalogni ruxsat ro'yxatiga qo'shing: `server: { fs: { allow: [searchForWorkspaceRoot(process.cwd()), '../shared'] } }`. Ruxsat etilgan import 200, repo tashqarisidagi tasodifiy va sensitive fayl 403 bo'lishini dev-server testda tekshiring; `allow` berilganda avtomatik workspace aniqlash almashtirilishini unutmang. [Rasmiy manba](https://vite.dev/config/server-options#server-fs-allow).

---

## Q95. Vite: ikki plugin bir virtual modulni transform qilib natija orderga bog'lanib qoldi?

**UZB:** Plugin enforce va hook orderini aniq belgilang, configResolvedda yakuniy tartibni diagnostika qiling. Masalan, `{ name: 'schema', enforce: 'pre', transform(code, id) { /* ... */ } }`. [Rasmiy manba](https://vite.dev/guide/api-plugin#plugin-ordering).

---

## Q96. Vite: linked monorepo paketi CommonJS dependency bilan devda resolve xatosi bermoqda?

**UZB:** optimizeDeps.include orqali deep importni prebundle qiling; config o'zgargach cache invalidationni Vitega qoldiring. Masalan, `optimizeDeps: { include: ['linked-package > legacy-cjs'] }`. [Rasmiy manba](https://vite.dev/config/dep-optimization-options#optimizedeps-include).

---

## Q97. Vite: monorepoda ikki resolve yo'li Reactning ikki nusxasini yuklamoqda?

**UZB:** resolve.dedupe bilan bitta root copyga majburlang va lockfile/import graphda sababni ham tozalang. Masalan, `resolve: { dedupe: ['react', 'react-dom'] }`. [Rasmiy manba](https://vite.dev/config/shared-options#resolve-dedupe).

---

## Q98. Vite: birinchi marta katta editor route ochilganda dev transform waterfall kutdiradi?

**UZB:** Faqat tez-tez ochiladigan fayllarni server.warmupga kiriting; ortiqcha glob startupni yana sekinlashtirmasligini profile qiling. Masalan, `server: { warmup: { clientFiles: ['./src/editor/*.tsx'] } }`. [Rasmiy manba](https://vite.dev/config/server-options#server-warmup).

---

## Q99. Vite: DevTools Disable cache yoqilganda Vite sahifasi juda sekin ochilmoqda?

**UZB:** Toza browser profilida cache bilan qayta o'lchang; prebundled dependency hard cache va 304 response diagnostikasini buzadigan extensionlarni ajrating. Masalan, `vite --profile`. [Rasmiy manba](https://vite.dev/guide/performance#review-your-browser-setup).

---

## Q100. Vite: Express middleware mode'da custom SSR fallback bor, ammo Vite'ning SPA HTML middleware'i undan oldin requestni ushlab qolmoqda?

**UZB:** Vite configda `appType: 'custom'` belgilang — bu built-in HTML middleware'larni qo'shmaydi. Expressda asset va SSR routing tartibini o'zingiz boshqaring, HTMLni response qilishdan oldin developmentda `vite.transformIndexHtml(url, template)`dan o'tkazing. Asset, SSR route va 404 uchun precedence integration test yozing. [Vite app type](https://vite.dev/config/shared-options#apptype), [Vite SSR middleware](https://vite.dev/guide/ssr#setting-up-the-dev-server).

---
