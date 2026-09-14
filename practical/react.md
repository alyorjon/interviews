# React amaliy interview ssenariylari

Ushbu bank amaliy vaziyatlar uchun tuzilgan. Asosiy rasmiy manba: [react hujjatlari](https://react.dev/learn).

## Q1. Loyihada Strict Mode developmentda subscription ikki marta ulanib qolyapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Effect setupiga aynan teskari cleanup qaytaring. Masalan, `useEffect(() => { subscribe(); return unsubscribe }, [])` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/reference/react/useEffect).

## Q2. Loyihada filterlangan ro'yxat har renderda qayta hisoblanib UI sekinlashmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin avval profiler bilan o'lchang, so'ng barqaror dependencylar bilan useMemo qo'llang. Masalan, `const visible = useMemo(() => filter(items, q), [items, q])` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/reference/react/useMemo).

## Q3. Loyihada memo qilingan child inline callback sabab baribir qayta render bo'lmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin callbackni useCallback bilan faqat kerakli dependencylarga bog'lang. Masalan, `const onSave = useCallback(id => save(id), [save])` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/reference/react/useCallback).

## Q4. Loyihada form state API response kelganda foydalanuvchi yozgan qiymatni bosib ketmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin server snapshot va editable draftni alohida state sifatida saqlang. Masalan, `const [draft, setDraft] = useState(() => initial.name)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/learn/choosing-the-state-structure).

## Q5. Loyihada ketma-ket state update faqat bir marta oshiryapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin oldingi qiymatga bog'liq update uchun functional updater ishlating. Masalan, `setCount(c => c + 1)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/learn/queueing-a-series-of-state-updates).

## Q6. Loyihada katta formda ko'p boolean state transitionlarni tushunish qiyinlashdi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin eventlar va invariantlarni reducerga markazlashtiring. Masalan, `const [state, dispatch] = useReducer(reducer, initialState)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/learn/extracting-state-logic-into-a-reducer).

## Q7. Loyihada context qiymati har renderda yangi object bo'lib barcha consumerlarni yangilamoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin provider qiymatini barqarorlashtiring va contextni domen bo'yicha ajrating. Masalan, `const value = useMemo(() => ({ user, login }), [user, login])` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/reference/react/useContext).

## Q8. Loyihada DOM inputni focus qilish render vaqtida chaqirilgani uchun beqaror ishlamoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin refni event yoki Effectdan boshqaring. Masalan, `inputRef.current?.focus()` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/learn/manipulating-the-dom-with-refs).

## Q9. Loyihada controlled input har keystrokda butun sahifani qayta render qilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin state ownershipni formga yaqinlashtiring yoki subtree'ni ajrating. Masalan, `function SearchForm(){ const [q,setQ]=useState('') }` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/reference/react-dom/components/input).

## Q10. Loyihada Effect propsdan hisoblanadigan qiymatni statega ko'chirib ortiqcha render bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin derived qiymatni renderda hisoblang. Masalan, `const fullName = firstName + ' ' + lastName` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/learn/you-might-not-need-an-effect).

## Q11. Loyihada search natijasi eski request bilan race condition bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin cleanup flag yoki AbortController bilan eski javobni e'tiborsiz qoldiring. Masalan, `return () => { ignore = true }` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/reference/react/useEffect#fetching-data-with-effects).

## Q12. Loyihada katta route komponenti initial bundle hajmini oshirmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin lazy import va Suspense fallback bilan kodni bo'ling. Masalan, `const Reports = lazy(() => import('./Reports.jsx'))` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/reference/react/lazy).

## Q13. Loyihada sekin filter typingni lag qildiryapti, lekin input tez javob berishi kerak. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin non-urgent update uchun transition ishlating. Masalan, `startTransition(() => setFilter(next))` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/reference/react/useTransition).

## Q14. Loyihada external store update concurrent renderda inconsistent snapshot bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin subscriptionni useSyncExternalStore kontrakti bilan ulang. Masalan, `useSyncExternalStore(store.subscribe, store.getSnapshot)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/reference/react/useSyncExternalStore).

## Q15. Loyihada list reorder qilinganda input state boshqa qatorda paydo bo'lmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin index emas, domain identityga teng stabil key ishlating. Masalan, `rows.map(row => <Row key={row.id} row={row} />)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key).

## Q16. Loyihada modal yopilib ochilganda eski state kutilmaganda saqlanib qolmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin identity o'zgarganda subtree keyini almashtirib state reset qiling. Masalan, `<Editor key={record.id} record={record} />` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/learn/preserving-and-resetting-state).

## Q17. Loyihada event handler ichidagi async ish eski propsni closureda ushlab qolmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin kerakli qiymatni event paytida snapshot qiling yoki ref bilan so'nggi qiymatni o'qing. Masalan, `const latest = useRef(value); latest.current = value` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/reference/react/useRef).

## Q18. Loyihada custom Hook conditionga qarab chaqirilgani uchun hook order xatosi chiqmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Hookni top-levelda doim chaqirib, shartni ichiga ko'chiring. Masalan, `const data = useData(enabled ? id : null)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/reference/rules/rules-of-hooks).

## Q19. Loyihada render paytida state set qilinib infinite re-render yuz berdi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin state o'zgarishini eventga ko'chiring va renderni pure qoldiring. Masalan, `onClick={() => setOpen(true)}` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/learn/keeping-components-pure).

## Q20. Loyihada komponent testida update tugamasdan assertion ishlayotgani warning bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin interactionni act orqali flush qiling va foydalanuvchi ko'radigan natijani tekshiring. Masalan, `await act(async () => button.click())` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://react.dev/reference/react/act).

