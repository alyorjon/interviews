# 🧪 JavaScript Interaktiv Quiz — Self-Test MCQ

### Ikki tilli qo'llanma / Bilingual Reference

> **Daraja / Level:** 🟢 Basic → 🟡 Intermediate → 🔴 Advanced
> **Format:** Har bir savolda 4 variant, faqat bittasi to'g'ri. Javoblarni oldindan ko'rmang — avval yeching! / Each question has 4 options, only one correct. Don't peek at the answer key — attempt first!
> **Javoblar:** Fayl oxirida / **Answers:** at the end of the file

---

## 🟢 Basic (1–10)

**1.** JavaScript qanday bajarilish modeliga ega? / Which execution model does JavaScript use?
A) Multi-threaded parallel execution
B) Bir oqimli (single-threaded), Event Loop orqali ko'p vazifalilik / Single-threaded, using the Event Loop for concurrency
C) Faqat serverda ko'p oqimli ishlaydi / Only multi-threaded on the server side
D) Asinxron kodni umuman qo'llab-quvvatlamaydi / Doesn't support async code at all

**2.** `var` kalit so'zining scope turi qanday? / What is the scope type of `var`?
A) Block Scope
B) Function Scope
C) Module Scope
D) Faqat Global Scope / Global Scope only

**3.** `let` va `const` qanday scope ga ega? / What scope do `let` and `const` have?
A) Function Scope
B) Global Scope
C) Block Scope (`{}`)
D) File Scope

**4.** Closure nima? / What is a closure?
A) Funksiyani butunlay o'chiradigan mexanizm / A mechanism that deletes a function
B) Funksiya + o'zi yaratilgan lexical scope o'zgaruvchilarini eslab qolish qobiliyati / A function bundled with references to its surrounding lexical scope
C) Faqat global o'zgaruvchilarga kirish usuli / Only a way to access global variables
D) Sinxron kod bloki / A synchronous code block

**5.** Arrow function'da `this` qanday aniqlanadi? / How is `this` determined in an arrow function?
A) Chaqirilish usuliga qarab dinamik / Dynamically, based on how it's called
B) Har doim `window` obyektiga bog'lanadi / Always bound to `window`
C) O'zining tashqi (lexical) doirasidan meros olinadi / Inherited lexically from the enclosing scope
D) Har doim `undefined` bo'ladi / Always `undefined`

**6.** `structuredClone()` funksiyasi nima qiladi? / What does `structuredClone()` do?
A) Faqat yuqori qatlamni nusxalaydi (sayoz) / Only copies the top level (shallow copy)
B) Ichma-ich obyektlarni ham to'liq mustaqil chuqur nusxalaydi / Creates a native deep copy, including nested objects
C) Obyektni JSON stringga aylantiradi / Converts the object to a JSON string
D) Obyektni o'chiradi / Deletes the object

**7.** Node.js nimaga asoslangan runtime environment? / Node.js is a runtime environment built on what?
A) Firefox SpiderMonkey
B) Chrome V8 va Libuv kutubxonasi / Chrome's V8 engine and the Libuv library
C) Safari JavaScriptCore
D) Deno Runtime

**8.** Express.js middleware'da `next()` funksiyasi nima uchun chaqiriladi? / Why is `next()` called in Express.js middleware?
A) So'rovni butunlay bekor qilish uchun / To cancel the request entirely
B) Boshqaruvni keyingi middleware'ga uzatish uchun / To pass control to the next middleware in the chain
C) Serverni qayta ishga tushirish uchun / To restart the server
D) Javobni ikki marta yuborish uchun / To send the response twice

**9.** React Virtual DOM nima uchun ishlatiladi? / What is the React Virtual DOM used for?
A) Ma'lumotlar bazasiga bevosita ulanish uchun / To connect directly to a database
B) Xotirada DOM nusxasini saqlab, faqat o'zgargan qismlarni real DOM'da yangilash uchun / To keep an in-memory DOM copy and update only the changed parts in the real DOM
C) CSS stillarini yozish uchun / To write CSS styles
D) Serverga so'rov yuborish uchun / To send requests to the server

**10.** Next.js App Router'da qaysi komponent turi standart (default) hisoblanadi? / Which component type is the default in the Next.js App Router?
A) Client Components (`'use client'`)
B) Server Components
C) Static Components
D) Legacy Components

---

## 🟡 Intermediate (11–20)

**11.** Quyidagi kodning natijasi qanday? `console.log("1"); setTimeout(()=>console.log("2"),0); Promise.resolve().then(()=>console.log("3")); console.log("4");` / What is the output of this code?
A) `1, 2, 3, 4`
B) `1, 4, 3, 2`
C) `1, 4, 2, 3`
D) `4, 3, 2, 1`

**12.** Quyidagi kod natijasi nima? `console.log(a); var a = 5;` / What does this code output?
A) `5`
B) `ReferenceError`
C) `undefined`
D) `null`

**13.** Quyidagi kod natijasi nima? `console.log(b); let b = 10;` / What does this code output?
A) `undefined`
B) `10`
C) `ReferenceError: Cannot access 'b' before initialization` (TDZ)
D) `null`

**14.** React komponentida `useEffect` bo'sh dependency array bilan qachon ishlaydi? / In a React component, when does `useEffect` run with an empty dependency array?
A) Har renderda / On every render
B) Faqat birinchi render da (mount) / Only on the first render (mount)
C) Faqat unmount da / Only on unmount
D) Hech qachon / Never

**15.** `obj.arrowFunc()` chaqirilganda `this.name` nimaga teng bo'ladi (misolga ko'ra)? / When `obj.arrowFunc()` is called, what does `this.name` evaluate to (per the example)?
A) `"Alyorjon"`
B) `undefined`
C) `null`
D) `"obj"`

**16.** Next.js da "hydration" nima? / What is hydration in Next.js?
A) Ma'lumotlar bazasidan ma'lumot olish / Fetching data from the database
B) Server-rendered HTML ning clientda interaktiv holga kelishi / The process where server-rendered HTML becomes interactive on the client
C) CSS fayllarni birlashtirish / Bundling CSS files
D) Rasmlarni optimallashtirish / Optimizing images

**17.** NestJS'da `@Injectable()` dekoratori nima uchun ishlatiladi? / What is the `@Injectable()` decorator used for in NestJS?
A) Ma'lumotlar bazasi sxemasini yaratish uchun / To create a database schema
B) Sinfni IoC konteyner orqali inject qilinadigan provider sifatida belgilash uchun / To mark a class as a provider that the IoC container can inject
C) HTTP marshrutlarini belgilash uchun / To define HTTP routes
D) CSS stillarini bog'lash uchun / To bind CSS styles

**18.** NestJS so'rov bajarilish tartibida nima birinchi bo'lib ishga tushadi? / In the NestJS request execution lifecycle, what runs first?
A) Controller Handler
B) Pipes
C) Middleware
D) Exception Filters

**19.** Prisma ORM'da sxema qanday ta'riflanadi? / How is the schema defined in Prisma ORM?
A) Class Decorators (`@Entity()`, `@Column()`) yordamida / Using class decorators
B) Auto-generated Type-safe DSL fayli orqali (`schema.prisma`) / Through an auto-generated type-safe DSL file (`schema.prisma`)
C) XML konfiguratsiya fayli orqali / Through an XML config file
D) Faqat qo'lda yozilgan SQL orqali / Only through hand-written SQL

**20.** Vite nima uchun Webpack'ga qaraganda tezroq HMR (Hot Module Replacement) beradi? / Why does Vite offer faster HMR than Webpack?
A) U kodni avval to'liq bundle qiladi / Because it fully bundles the code first
B) Native ES Modules va Esbuild orqali kodni talab bo'yicha (on-demand) yetkazadi / Because it serves code on-demand via Native ESM and Esbuild
C) U TypeScript'ni qo'llab-quvvatlamaydi / Because it doesn't support TypeScript
D) U faqat production rejimida ishlaydi / Because it only works in production mode

---

## 🔴 Advanced (21–30)

**21.** Microtask Queue va Macrotask Queue orasida qaysi biri ustunlikka ega? / Between the Microtask Queue and Macrotask Queue, which has higher priority?
A) Macrotask Queue (`setTimeout`)
B) Microtask Queue (Promises, `.then`, `await`)
C) Ular baravar ustunlikka ega / They have equal priority
D) Bu brauzerga bog'liq, aniq qoida yo'q / It depends on the browser, no fixed rule

**22.** Libuv Thread Pool standart holatda nechta thread'dan iborat? / How many threads does the Libuv Thread Pool use by default?
A) 1
B) 2
C) 4
D) 8

**23.** `var` va `let`/`const` orasidagi hoisting xatti-harakati farqi nimada? / What is the hoisting behavior difference between `var` and `let`/`const`?
A) `var` hoisting qilinmaydi, `let`/`const` qilinadi / `var` is not hoisted, `let`/`const` is
B) Ikkalasi ham hoisting qilinadi, lekin `var` `undefined` beradi, `let`/`const` esa Temporal Dead Zone (TDZ)da qoladi / Both are hoisted, but `var` yields `undefined` while `let`/`const` remain in the Temporal Dead Zone (TDZ)
C) Hech qaysi biri hoisting qilinmaydi / Neither is hoisted
D) `let` hoisting qilinadi, `const` qilinmaydi / `let` is hoisted, `const` is not

**24.** NestJS lifecycle tartibida Guards va Pipes orasidagi munosabat qanday? / In the NestJS lifecycle order, what is the relationship between Guards and Pipes?
A) Pipes har doim Guards'dan oldin ishlaydi / Pipes always run before Guards
B) Guards avval (autentifikatsiya), keyin Interceptors, so'ng Pipes ishlaydi / Guards run first (auth), then Interceptors, then Pipes
C) Ular parallel ishlaydi / They run in parallel
D) Faqat bittasi tanlanishi mumkin / Only one of them can be used at a time

**25.** `useMemo` va `useCallback` hook'larining misoldagi asosiy maqsadi nima? / What is the main purpose of `useMemo` and `useCallback` in the example?
A) Komponentni butunlay qayta render qilish / To fully re-render the component
B) Og'ir hisob-kitob natijasi va funksiya havolasini keraksiz qayta yaratilishdan saqlash (memoize qilish) / To memoize an expensive calculation result and a function reference, avoiding unnecessary re-creation
C) API so'rovlarini bloklash / To block API requests
D) CSS animatsiyalarini boshqarish / To manage CSS animations

**26.** Next.js Server Components haqida qaysi tasdiq to'g'ri? / Which statement about Next.js Server Components is correct?
A) Ular faqat serverda render bo'ladi va brauzerga ortiqcha JS yubormaydi / They render only on the server and send zero extra JS to the browser
B) Ular faqat `useState` bilan ishlaydi / They only work with `useState`
C) Ular har doim `'use client'` direktivasini talab qiladi / They always require the `'use client'` directive
D) Ular ma'lumotlar bazasiga ulana olmaydi / They cannot connect to a database

**27.** ISR (Incremental Static Regeneration) qanday ishlaydi? / How does ISR (Incremental Static Regeneration) work?
A) Har bir so'rovda serverda qayta render qiladi / Re-renders on the server for every request
B) Build vaqtida bir marta yaratiladi va boshqa hech qachon yangilanmaydi / Generated once at build time and never updates again
C) Statik sahifa `revalidate` vaqti bo'yicha orqa fonda qayta generatsiya qilinadi / The static page is regenerated in the background based on a `revalidate` interval
D) Faqat Client Component'larda ishlaydi / Only works in Client Components

**28.** Express.js autentifikatsiya middleware misolida token bo'lmasa nima sodir bo'ladi? / In the Express.js auth middleware example, what happens if there's no token?
A) `next()` chaqirilib so'rov davom ettiriladi / `next()` is called and the request continues
B) `401` status bilan xato qaytariladi (`res.status(401).json(...)`) / A `401` status error is returned
C) Server ishdan chiqadi / The server crashes
D) Foydalanuvchi avtomatik yaratiladi / A user is automatically created

**29.** JS ob'ektlari qanday mexanizm orqali meros oladi? / Through what mechanism do JS objects inherit properties?
A) `__proto__` prototip zanjiri (prototype chain) orqali / Through the `__proto__` prototype chain
B) Faqat `class` kalit so'zi orqali / Only through the `class` keyword
C) Meros olish JavaScript'da umuman mavjud emas / Inheritance doesn't exist in JavaScript
D) XML konfiguratsiyasi orqali / Through XML configuration

**30.** Asinxron operatsiyalar (Timer, Network) Call Stack band bo'lganda qayerga o'tkaziladi? / Where are asynchronous operations (Timer, Network) delegated while the Call Stack is running synchronous code?
A) To'g'ridan-to'g'ri Macrotask Queue'ga / Directly to the Macrotask Queue
B) Web API / Node API'larga, so'ngra navbatlar orqali Call Stack'ga qaytariladi / To Web APIs / Node APIs, then returned to the Call Stack via the queues
C) Ular yo'qotiladi / They are discarded
D) Global scope'da doimiy saqlanadi / Stored permanently in the global scope

---

## ✅ Javoblar / Answer Key

| #   | Javob | #   | Javob | #   | Javob |
| --- | ----- | --- | ----- | --- | ----- |
| 1   | B     | 11  | B     | 21  | B     |
| 2   | B     | 12  | C     | 22  | C     |
| 3   | C     | 13  | C     | 23  | B     |
| 4   | B     | 14  | B     | 24  | B     |
| 5   | C     | 15  | B     | 25  | B     |
| 6   | B     | 16  | B     | 26  | A     |
| 7   | B     | 17  | B     | 27  | C     |
| 8   | B     | 18  | C     | 28  | B     |
| 9   | B     | 19  | B     | 29  | A     |
| 10  | B     | 20  | B     | 30  | B     |

**Natijangizni baholang / Score yourself:**

- 27–30 to'g'ri: Ekspert daraja 🏆 / Expert level
- 21–26 to'g'ri: Ilg'or daraja 🔴 / Advanced level
- 14–20 to'g'ri: O'rta daraja 🟡 / Intermediate level
- <14 to'g'ri: `javascript/basics.md` ni qayta ko'rib chiqing 🟢 / Review `javascript/basics.md`

---

_Tayyorlagan / Prepared by: Alyorjon | interactive_quiz_tester agenti asosida_
