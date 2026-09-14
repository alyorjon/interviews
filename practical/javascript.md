# JavaScript amaliy interview ssenariylari

Ushbu bank amaliy vaziyatlar uchun tuzilgan. Asosiy rasmiy manba: [javascript hujjatlari](https://developer.mozilla.org/en-US/docs/Web/JavaScript/).

## Q1. Loyihada qidiruv inputi tez yozilganda eski fetch javobi yangi natijani bosib ketmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin oldingi so'rovni AbortController bilan bekor qiling va AbortErrorni jim boshqaring. Masalan, `controller.abort(); fetch(url, { signal: controller.signal })` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

## Q2. Loyihada uchta mustaqil API chaqiruvidan bittasi yiqilsa ham qolgan natijalar kerak. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Promise.all o'rniga allSettled ishlatib har statusni alohida tahlil qiling. Masalan, `const results = await Promise.allSettled(tasks)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled).

## Q3. Loyihada obyektning ichki massivini spread bilan nusxalash originalni ham o'zgartirmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin serializable data uchun structuredClone bilan deep copy qiling. Masalan, `const copy = structuredClone(original)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone).

## Q4. Loyihada katta hisob UI threadni muzlatib, clicklar javobsiz qolmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin hisobni Web Workerga ko'chiring va xabar kontraktini aniqlang. Masalan, `const worker = new Worker(new URL('./worker.js', import.meta.url))` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

## Q5. Loyihada event listener komponent yo'qolgandan keyin ham xotirada obyektlarni ushlab turmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin bir xil callback reference bilan removeEventListener chaqiring yoki signal orqali bekor qiling. Masalan, `target.addEventListener('click', fn, { signal: controller.signal })` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

## Q6. Loyihada foydalanuvchi kiritgan HTML previewda script ishga tushish xavfi bor. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin matnni textContent bilan chiqaring va zarur HTMLni ishonchli sanitizer bilan allowlist qiling. Masalan, `preview.textContent = userInput` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent).

## Q7. Loyihada pul yig'indisi 0.1 va 0.2 bilan aniq chiqmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin pulni integer minor unitsda hisoblang va Number.isSafeInteger chegarasini tekshiring. Masalan, `const totalCents = items.reduce((s, x) => s + x.cents, 0)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

## Q8. Loyihada API response fieldi ba'zan yo'q bo'lib, nested access productionda yiqilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin optional chaining va nullish default bilan faqat null/undefinedni almashtiring. Masalan, `const city = payload.user?.address?.city ?? 'unknown'` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining).

## Q9. Loyihada dinamik importdan keyin yangi deployda eski chunk 404 qaytarmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin import xatosini tutib bir martalik reload strategiyasini build versiyasi bilan boshqaring. Masalan, `import('./report.js').catch(handleChunkMismatch)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import).

## Q10. Loyihada obyekt kalitlari bilan cache Map o'rniga oddiy objectda collision bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin arbitrary keylar uchun Map ishlating va lifecycle tugaganda clear qiling. Masalan, `const cache = new Map(); cache.set(request, response)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

## Q11. Loyihada parallel fetchlar ichida bittasi rad etilganda qolgan so'rovlar bekor bo'lmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin umumiy AbortController signalini bering va catchda controller.abort qiling. Masalan, `await Promise.all(urls.map(u => fetch(u, { signal })))` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Resource_management).

## Q12. Loyihada sana formatlash server localega bog'lanib turli natija bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Intl.DateTimeFormatga aniq locale va timeZone bering. Masalan, `new Intl.DateTimeFormat('uz-UZ', { timeZone: 'Asia/Tashkent' })` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

## Q13. Loyihada async iterator ichidagi stream erta breakda yopilmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin for-await-of cleanupini va iterator return metodini qo'llang. Masalan, `for await (const chunk of stream) { if (done) break }` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of).

## Q14. Loyihada JSON.parse zararli __proto__ kalitini biznes obyektiga merge qilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin kirish sxemasini tekshirib faqat kutilgan own propertylarni ko'chiring. Masalan, `const safe = { id: String(input.id), role: 'user' }` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn).

## Q15. Loyihada setTimeout ichidagi exception tashqi try-catchga tushmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin async chegarada reject qiladigan Promise qaytaring va await joyida tuting. Masalan, `await new Promise((_, reject) => setTimeout(() => reject(err), 0))` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

## Q16. Loyihada regex user kiritgan uzun matnda CPUni band qilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin regexni soddalashtiring, input uzunligini cheklang va xavfli nested quantifierdan qoching. Masalan, `if (value.length > 1000) throw new RangeError('too long')` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions).

## Q17. Loyihada xato qayta o'ralganda asl stack va sabab yo'qolmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Error cause orqali original exceptionni saqlang. Masalan, `throw new Error('payment failed', { cause: error })` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause).

## Q18. Loyihada modul importida cyclic dependency sabab qiymat initializationdan oldin o'qilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin shared konstantani uchinchi leaf modulga ajrating va side-effect importlarni kamaytiring. Masalan, `import { shared } from './shared.js'` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

## Q19. Loyihada katta arrayda takroriy element qidirish O(n) bottleneck bo'ldi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin membership uchun Set qurib has bilan o'lchang. Masalan, `const allowed = new Set(ids); allowed.has(candidate)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

## Q20. Loyihada disposable resource exception paytida yopilmay qolmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin try/finally yoki supported runtime'da explicit resource managementdan foydalaning. Masalan, `try { use(resource) } finally { resource.close() }` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Resource_management).

