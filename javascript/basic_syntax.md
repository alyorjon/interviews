# 💛 1. JavaScript Basic & Core Syntax — 100 Real-World Interview Questions & Answers
### Ikki tilli mukammal qo'llanma / Comprehensive Bilingual Reference (English 🇬🇧 & O'zbek 🇺🇿)

> **Mavzular / Topics:** Data Types, Scopes, Closures, Event Loop, Microtasks vs Macrotasks, Prototypes, ES6+ Features, Promises, Async/Await, DOM Manipulation, Error Handling, Memory Leaks, V8 Engine internals.  
> **Darajalar / Levels:** 🟢 Basic (1–30) | 🟡 Intermediate (31–70) | 🔴 Advanced (71–100)

---

# 📚 CHUQUR NAZARIYA VA KOD SINTAKSISI MASTERCLASS

---

## 1. JavaScript Execution Mechanism & Event Loop
JavaScript — bu bir oqimli (single-threaded), interpretatsiya qilinadigan, V8 dvigateli bazasidagi dasturlash tili. U **Event Loop**, **Call Stack**, **Microtask Queue** (`Promise`, `await`) va **Macrotask Queue** (`setTimeout`, `setInterval`) orqali asinxron koblarni bajaradi.

---

# 🟢 QUESTIONS & ANSWERS (Q1 – Q100)

---


## Q1. Event Loop Microtask vs Macrotask Queue | Event Loop Microtask va Macrotask navbatlari tartibi

**EN:** Microtask Queue (Promises, queueMicrotask) has higher priority than Macrotask Queue (setTimeout, setInterval). It empties completely before next render tick.

**UZB:** Microtask Queue Call Stack bo'shashi bilan darhol bajariladi. Macrotask esa keyingi siklda ishga tushadi.

```javascript
console.log('1'); setTimeout(() => console.log('2'), 0); Promise.resolve().then(() => console.log('3')); console.log('4'); // Output: 1, 4, 3, 2
```

---

## Q2. var, let, const & Temporal Dead Zone (TDZ) | var, let, const va Temporal Dead Zone (TDZ)

**EN:** `var` is function-scoped and hoisted with `undefined`. `let` and `const` are block-scoped and hoisted into TDZ where accessing before declaration throws ReferenceError.

**UZB:** `var` funksiya doirasiga ega. `let` va `const` esa TDZ ga tushadi va e'londan oldin ishlatilsa ReferenceError beradi.

```javascript
console.log(a); // undefined
var a = 5;
console.log(b); // ReferenceError
let b = 10;
```

---

## Q3. Closures and Private Variables | Closure va ma'lumotlarni yashirish

**EN:** A closure grants an inner function access to its outer lexical scope even after the outer function has finished executing.

**UZB:** Closure tashqi funksiya scope'ini eslab qoladi va xususiy (private) o'zgaruvchilarni qamrab oladi.

```javascript
function createCounter() { let count = 0; return () => ++count; }
const counter = createCounter();
console.log(counter()); // 1
```

---

## Q4. `this` Keyword & Arrow Function Lexical Binding | `this` kalit so'zi va Arrow funksiyalardagi lexical binding

**EN:** Regular functions dynamically bind `this` based on invocation context. Arrow functions lexically inherit `this` from surrounding scope.

**UZB:** Oddiy funksiyalarda `this` dinamik bog'lanadi. Arrow funksiyalarda esa `this` tashqi scope'dan meros olinadi.

```javascript
const obj = { name: 'Ali', regular() { return this.name; }, arrow: () => this.name };
```

---

## Q5. Promises and Async/Await Syntax | Promises va Async/Await sintaksisi

**EN:** Async/await is syntactic sugar over Promises that allows writing asynchronous code sequentially with try/catch error handling.

**UZB:** Async/await Promise ustidagi sintaktik qulaylik bo'lib, try/catch bilan xatolarni ushlash imkonini beradi.

```javascript
async function getData() { try { const r = await fetch('/api'); return await r.json(); } catch(e) { console.error(e); } }
```

---

## Q6. Deep Copy vs Shallow Copy & `structuredClone` | Deep Copy, Shallow Copy va structuredClone

**EN:** Shallow copy (`{...obj}`) duplicates top-level properties only. `structuredClone()` creates native deep copy of nested objects.

**UZB:** Sayoz nusxa (`{...obj}`) faqat yuqori qatlamni nusxalaydi. `structuredClone()` esa ichma-ich ob'ektlarni ham chuqur nusxalaydi.

```javascript
const original = { a: 1, b: { c: 2 } };
const deep = structuredClone(original);
original.b.c = 99; // deep.b.c is still 2
```

---

## Q7. Prototype Chain & Inheritance | Prototip zanjiri (Prototype Chain) va merosxo'rlik

**EN:** JavaScript objects inherit properties through a prototype chain linked via `__proto__` up to `Object.prototype`.

**UZB:** JS ob'ektlari prototip zanjiri orqali xususiyatlarni meros oladi va Object.prototype ga borib taqaladi.

```javascript
function Person(name) { this.name = name; }
Person.prototype.greet = function() { return 'Hi ' + this.name; };
```

---

## Q8. Debounce Implementation | Debounce funksiyasini noldan yozish

**EN:** Debounce delays executing a function until N milliseconds have passed since the last invocation (e.g. search input).

**UZB:** Debounce tez-tez chaqiriladigan hodisani foydalanuvchi yozishdan to'xtaganidan keyin bajaradi.

```javascript
function debounce(fn, delay) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; }
```

---

## Q9. Throttle Implementation | Throttle funksiyasini noldan yozish

**EN:** Throttle guarantees a function executes at most once per specified time interval (e.g. scroll listener).

**UZB:** Throttle hodisa qanchalik tez sodir bo'lmasin, uni belgilangan vaqt oralig'ida faqat 1 marta bajaradi.

```javascript
function throttle(fn, limit) { let last = 0; return (...args) => { if (Date.now() - last >= limit) { last = Date.now(); fn(...args); } }; }
```

---

## Q10. Function Currying | Currying texnikasi va ulash

**EN:** Currying converts a function with multiple arguments into a sequence of functions taking one argument each.

**UZB:** Currying ko'p argumentli funksiyani ketma-ket bitta argument oluvchi funksiyalarga bo'ladi.

```javascript
const multiply = a => b => c => a * b * c;
console.log(multiply(2)(3)(4)); // 24
```

---

## Q11. Symbol Primitive Type | Symbol ma'lumot turi va foydalanilishi

**EN:** Symbol creates unique, immutable primitive identifiers primarily used as private object property keys.

**UZB:** Symbol ob'ektlar uchun unikal va boshqa kalitlar bilan to'qnashmaydigan indekslar yaratadi.

```javascript
const ID = Symbol('id');
const user = { [ID]: 101, name: 'Ali' };
```

---

## Q12. Map vs Plain Object | Map va oddiy Object farqlari

**EN:** Map accepts keys of any data type (objects, functions), maintains insertion order, and has built-in `.size` property.

**UZB:** Map har qanday turdagi kalitlarni qabul qiladi (ob'ektlarni ham) va elementlar sonini `.size` bilan beradi.

```javascript
const map = new Map(); const objKey = {}; map.set(objKey, 'Value'); console.log(map.get(objKey));
```

---

## Q13. Set & WeakSet Data Structures | Set va WeakSet to'plamlari

**EN:** Set holds unique values. WeakSet holds weak references to objects allowing them to be garbage collected.

**UZB:** Set takrorlanmas qiymatlarni saqlaydi. WeakSet esa ob'ektlarga kuchsiz havola tutadi.

```javascript
const set = new Set([1, 2, 2, 3]); console.log([...set]); // [1, 2, 3]
```

---

## Q14. WeakMap & Memory Leak Prevention | WeakMap va Xotira sizib chiqishining oldini olish

**EN:** WeakMap keys must be objects and are held weakly, preventing memory leaks when objects are deleted elsewhere.

**UZB:** WeakMap kalitlari faqat ob'ekt bo'lishi kerak va ular xotiradan tozalanayotganda avtomatik o'chiriladi.

```javascript
const wm = new WeakMap(); let obj = {}; wm.set(obj, 'metadata'); obj = null;
```

---

## Q15. Generator Functions & `yield` Keyword | Generator funksiyalar va yield kalit so'zi

**EN:** Generators produce sequence of values on demand using `function*` and `yield`, allowing pausing execution.

**UZB:** Generator funksiyalar `yield` orqali ijroni to'xtatib turish va keyin davom ettirish imkonini beradi.

```javascript
function* numberGen() { yield 1; yield 2; yield 3; }
const gen = numberGen(); console.log(gen.next().value); // 1
```

---

## Q16. Proxy & Reflect API Metaprogramming | Proxy va Reflect API metaprogramming

**EN:** Proxy wraps an object to intercept and customize fundamental operations like property lookup, assignment, and deletion.

**UZB:** Proxy ob'ekt operatsiyalarini (get, set) ushlab qolib, ularning xulq-atvorini o'zgartiradi.

```javascript
const user = new Proxy({}, { set(t, k, v) { if (k==='age' && v<0) throw Error(); t[k]=v; return true; } });
```

---

## Q17. Custom Event Dispatching in DOM | Custom Event hodisalarini yaratish va tarqatish

**EN:** Dispatching user-defined events across DOM elements using `CustomEvent` constructor.

**UZB:** DOM da shaxsiy hodisalar hosil qilish va ularni tinglash.

```javascript
window.addEventListener('userLogged', e => console.log(e.detail)); window.dispatchEvent(new CustomEvent('userLogged', { detail: { id: 1 } }));
```

---

## Q18. MutationObserver for DOM Changes | MutationObserver API orqali DOM o'zgarishlarini kuzatish

**EN:** Asynchronously observes changes to the DOM tree nodes (attributes, child nodes).

**UZB:** DOM elementlarining o'zgarishi va yangilanishini asinxron kuzatish.

```javascript
const obs = new MutationObserver(mutations => console.log(mutations)); obs.observe(document.body, { childList: true });
```

---

## Q19. IntersectionObserver for Lazy Loading | IntersectionObserver API va Lazy Loading

**EN:** Detects when a target DOM element intersects with a viewport, ideal for image lazy loading and infinite scroll.

**UZB:** Element ekranga kirganda yoki chiqqanda uni aniqlash (Lazy image load).

```javascript
const obs = new IntersectionObserver(entries => { if(entries[0].isIntersecting) console.log('Visible'); });
```

---

## Q20. ResizeObserver for Responsive Elements | ResizeObserver API va element o'lchami

**EN:** Monitors bounding box dimension changes of DOM elements in real-time.

**UZB:** Element o'lchami (width/height) o'zgarganda xabar beruvchi API.

```javascript
const obs = new ResizeObserver(entries => console.log(entries[0].contentRect)); obs.observe(document.querySelector('div'));
```

---

## Q21. Object.freeze vs Object.seal | Object.freeze va Object.seal farqlari

**EN:** `Object.freeze()` makes object completely immutable. `Object.seal()` prevents adding/deleting properties but allows updating existing values.

**UZB:** `Object.freeze` ob'ektni butunlay muzlatadi. `Object.seal` yangi kalit qo'shishni taqiqlaydi lekin mavjudini tahrirlashga ruxsat beradi.

```javascript
const cfg = Object.freeze({ api: 'https://...' }); cfg.api = 'test'; // Strict mode error
```

---

## Q22. ES Modules (ESM) vs CommonJS (CJS) | ESM (import/export) va CommonJS (require)

**EN:** ESM is statically analyzed at compile-time and asynchronous. CommonJS is dynamic and synchronous.

**UZB:** ESM statik parse qilinadi va asinxrondir. CommonJS dinamik va sinxrondir.

```javascript
import { sum } from './math.js'; // ESM
const { sum } = require('./math'); // CommonJS
```

---

## Q23. Nullish Coalescing (`??`) vs OR (`||`) | Nullish Coalescing (??) va Mantiqiy VAP (||) farqlari

**EN:** `??` checks strictly for `null` or `undefined`. `||` checks for any falsy value (`0`, ``, `false`).

**UZB:** `??` faqat null yoki undefined bo'lganda ishlaydi. `||` esa 0 va bo'sh matnni ham almashtiradi.

```javascript
const count = 0;
console.log(count || 10); // 10
console.log(count ?? 10); // 0
```

---

## Q24. Optional Chaining Operator (`?.`) | Optional Chaining (?.) operatori

**EN:** Safely reads deeply nested object properties without throwing TypeError if an intermediate reference is nullish.

**UZB:** Ichma-ich ob'ektlarni o'qiyotganda xatolik chiqarib kodni to'xtatmasdan xavfsiz o'qiydi.

```javascript
const user = {}; console.log(user?.address?.city?.name); // undefined
```

---

## Q25. Array `reduce` Advanced Use Cases | Array.prototype.reduce ning ilg'or qo'llanilishi

**EN:** Transforming array into object maps, flattening arrays, and composing pipeline functions.

**UZB:** Massivni ob'ektga o'tkazish va murakkab pipeline funksiyalarini yig'ish.

```javascript
const counts = ['apple', 'banana', 'apple'].reduce((acc, f) => { acc[f] = (acc[f]||0)+1; return acc; }, {});
```

---

## Q26. Strict Mode (`'use strict'`) | Strict Mode ('use strict') va uning qoidalari

**EN:** Enforces cleaner code by eliminating silent errors, preventing undeclared global variables, and disabling `with`.

**UZB:** E'lon qilinmagan o'zgaruvchilarni taqiqlaydi va yashirin xatolarni aniq ko'rsatadi.

```javascript
'use strict'; x = 3.14; // Uncaught ReferenceError: x is not defined
```

---

## Q27. Call, Apply, and Bind Methods | call, apply va bind metodlari farqi

**EN:** `call` invokes function with explicit `this` and comma-separated args. `apply` takes array of args. `bind` returns new bound function.

**UZB:** `call` va `apply` funksiyani darhol chaqiradi. `bind` esa yangi funksiya nusxasini qaytaradi.

```javascript
function show(a, b) { return `${this.name}: ${a+b}`; }
show.call({name: 'Ali'}, 1, 2);
```

---

## Q28. Event Bubbling and Event Capturing | Event Bubbling va Event Capturing jarayoni

**EN:** Events propagate in 3 phases: Capturing (down from window), Target, and Bubbling (up to window). `e.stopPropagation()` stops it.

**UZB:** Hodisalar 3 bosqichda tarqaladi: Capturing (tepadan pastga), Target, va Bubbling (pastdan tepaga).

```javascript
element.addEventListener('click', handler, { capture: true });
```

---

## Q29. Event Delegation Pattern | Event Delegation (Hodisalarni vakillik berish) patterni

**EN:** Attaching a single event listener to a parent container to manage events for multiple dynamic child elements using `e.target`.

**UZB:** Bitta ota-onaga event listener o'rnatib, barcha bolalar hodisalarini samarali boshqarish.

```javascript
document.getElementById('parentList').addEventListener('click', e => { if(e.target.tagName==='LI') console.log(e.target.innerText); });
```

---

## Q30. Memory Leaks in JavaScript & V8 Garbage Collection | JavaScript da Xotira Sizib Chiqishi (Memory Leak) va GC

**EN:** Causes of memory leaks: global variables, uncleared timers, detached DOM nodes, closures. V8 uses Mark-and-Sweep GC.

**UZB:** Xotira sizish sabablari: tozalanmagan setInterval, global o'zgaruvchilar va uzilgan DOM node'lar.

```javascript
let timer = setInterval(() => {}, 1000); // Must call clearInterval(timer) when destroyed
```

---

## Q31. JavaScript Data Types: Primitive vs Reference | Primitiv va Reference ma'lumot turlari

**EN:** Primitives stored in Stack by value. Reference objects stored in Heap by reference address.

**UZB:** Primitiv turlar qiymati bo'yicha Stack da, ob'ektlar esa Heap da havola bo'yicha saqlanadi.

```javascript
let a = 10; let b = a; b = 20; // a remains 10
```

---

## Q32. BigInt Arbitrary Precision Integers | BigInt ma'lumot turi va yirik sonlar

**EN:** BigInt represents integers larger than Number.MAX_SAFE_INTEGER (2^53 - 1).

**UZB:** Number sig'imidan katta bo'lgan butun sonlarni xavfsiz hisoblash.

```javascript
const big = 9007199254740991n + 5n; console.log(big);
```

---

## Q33. NaN & Number.isNaN Verification | NaN (Not-a-Number) va Number.isNaN tekshiruvi

**EN:** NaN is the only JS value not equal to itself. Number.isNaN checks strictly without type coercion.

**UZB:** NaN o'ziga teng bo'lmagan yagona qiymatdir. Number.isNaN uni qat'iy tekshiradi.

```javascript
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN('hello')); // false
```

---

## Q34. Object.keys, Object.values, Object.entries | Object static metodlari

**EN:** Iterating object properties as arrays of keys, values, or key-value pairs.

**UZB:** Ob'ekt atributlari va qiymatlarini massiv ko'rinishida olish.

```javascript
const user = { a: 1, b: 2 }; Object.entries(user).forEach(([k, v]) => console.log(k, v));
```

---

## Q35. Tagged Template Literals | Tagged Template Literals matn tayyorlash

**EN:** Parsing template literals with a custom function for formatting or sanitizing HTML.

**UZB:** Matnlarni maxsus funksiya orqali formatlash va qayta ishlash.

```javascript
function format(strings, ...vals) { return strings[0] + vals[0].toUpperCase(); }
format`hello ${'world'}`
```

---

## Q36. Rest Parameters vs Arguments Object | Rest parameters (...args) va Arguments

**EN:** Rest parameters create a real array. Arguments is an array-like object missing array methods.

**UZB:** Rest parametrlar haqiqiy massiv beradi. Arguments esa massivsimon ob'ektdir.

```javascript
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
```

---

## Q37. Spread Operator in Arrays and Objects | Spread Operator (...) amaliyotda

**EN:** Expanding elements of an array or object properties into new literal structures.

**UZB:** Massiv yoki ob'ekt elementlarini yoyib yangisiga biriktirish.

```javascript
const merged = { ...obj1, ...obj2 };
```

---

## Q38. Destructuring Assignment with Default Values | Destrukturizatsiya va Boshlang'ich Qiymatlar

**EN:** Extracting variables from objects/arrays with fallback default values if undefined.

**UZB:** Ob'ektlardan qiymatlarni ajratishda boshlang'ich qiymat biriktirish.

```javascript
const { role = 'Guest' } = user;
```

---

## Q39. Array.prototype.flat and flatMap | flat va flatMap metodlari

**EN:** Flattening nested arrays by depth and mapping elements in a single pass.

**UZB:** Ichma-ich massivlarni yoyish va elementlarini o'zgartirish.

```javascript
const arr = [1, [2, 3]].flat(); // [1, 2, 3]
```

---

## Q40. Array.from vs Array.of | Array.from va Array.of metodlari

**EN:** Creating arrays from iterables or arguments list cleanly.

**UZB:** Iterable ob'ektlardan yoki argumentlardan massiv yaratish.

```javascript
const chars = Array.from('hello'); // ['h','e','l','l','o']
```

---

## Q41. Object.defineProperty & Descriptors | Object.defineProperty va atribut qoidalari

**EN:** Defining object properties with writable, enumerable, and configurable attributes.

**UZB:** Ob'ekt atributlarini yozish va o'chirish ruxsatlarini sozlash.

```javascript
Object.defineProperty(obj, 'id', { value: 1, writable: false });
```

---

## Q42. process.nextTick vs setImmediate vs setTimeout | process.nextTick, setImmediate va setTimeout ijro tartibi

**EN:** process.nextTick fires before any microtasks or timers. setImmediate fires on Event Loop check phase.

**UZB:** process.nextTick barcha mikro-vazifalardan oldin, setImmediate esa Event Loop tekshiruv bosqichida ishlaydi.

```javascript
process.nextTick(() => console.log('Tick'));
```

---

## Q43. Logical Assignment Operators (`&&=`, `||=`, `??=`) | Mantiqiy o'zlashtirish operatorlari

**EN:** ES2021 logical assignment short-circuits to assign values conditionally.

**UZB:** Qisqartirilgan mantiqiy o'zlashtirish operatorlari.

```javascript
let x = null; x ??= 'default';
```

---

## Q44. Private Class Fields (`#field`) | Class xususiy maydonlari (#field)

**EN:** Enforcing hard private class members using native `#` syntax.

**UZB:** Klasslar ichida `#` belgisi bilan xususiy maydonlar yaratish.

```javascript
class Bank { #balance = 0; get balance() { return this.#balance; } }
```

---

## Q45. Static Class Methods and Properties | Sinflardagi Static metod va atributlar

**EN:** Attaching methods to the class constructor function directly instead of instance prototype.

**UZB:** Static metodlar instansiyaga emas, sinf konstruktoriga biriktiriladi.

```javascript
class MathUtil { static add(a, b) { return a + b; } }
```

---

## Q46. Class Inheritance & `super()` Keyword | Sinflarda Merosxo'rlik va super()

**EN:** Extending parent classes and calling parent constructor via `super()`.

**UZB:** Sinflardan meros olish va ota sinf konstruktorini chaqirish.

```javascript
class Dog extends Animal { constructor(name) { super(name); } }
```

---

## Q47. Custom Iterators & `Symbol.iterator` | Shaxsiy Iterable ob'ektlar yaratish

**EN:** Implementing `[Symbol.iterator]()` to make objects iterable in `for...of` loops.

**UZB:** Ob'ektni `for...of` siklida aylanadigan iterable holatga keltirish.

```javascript
const range = { [Symbol.iterator]() { return { next: () => ({ done: true }) }; } };
```

---

## Q48. Web Workers Multithreading | Web Workers va ko'p oqimlilik

**EN:** Executing CPU-intensive logic in background thread without freezing main UI thread.

**UZB:** Asosiy UI oqimini qotirib qo'ymaslik uchun og'ir vazifani Web Worker oqimida bajarish.

```javascript
const worker = new Worker('w.js'); worker.postMessage('start');
```

---

## Q49. Service Workers Caching | Service Workers va PWA kesh tizimi

**EN:** Proxying network requests and caching assets for offline Web Application support.

**UZB:** Tarmoq so'rovlarini tutib qolib, oflayn rejim uchun keshlash.

```javascript
navigator.serviceWorker.register('/sw.js');
```

---

## Q50. Fetch API & AbortController | Fetch API va AbortController so'rovni bekor qilish

**EN:** Canceling ongoing HTTP requests using AbortController signal.

**UZB:** Bajarilayotgan HTTP so'rovni AbortController bilan bekor qilish.

```javascript
const controller = new AbortController(); fetch(url, { signal: controller.signal }); controller.abort();
```

---

## Q51. Async Generators & `for await...of` | Async Generators va for await...of sikli

**EN:** Iterating over asynchronous data streams sequentially using async generator functions.

**UZB:** Asinxron ma'lumotlar oqimini `for await...of` siklida aylanib chiqish.

```javascript
async function* fetchStream() { yield await fetch('/chunk1'); }
for await (const chunk of fetchStream()) {}
```

---

## Q52. JavaScript Memory Heap vs Call Stack | Memory Heap va Call Stack arxitekturasi

**EN:** Call Stack executes synchronous frame executions. Memory Heap stores dynamically allocated objects.

**UZB:** Call Stack sinxron funksiyalarni bajaradi. Memory Heap esa ob'ektlarni saqlaydi.

```javascript
function foo() { const obj = {}; } // Reference on stack, object in heap
```

---

## Q53. Function Tail Call Optimization (TCO) | Tail Call Optimization (TCO) resurs tejamkorligi

**EN:** ES6 engine feature reusing stack frames for recursive functions calling themselves at tail position.

**UZB:** Rekursiya oxirgi qatorda chaqirilganda stack xotirasini qayta ishlatish.

```javascript
function fact(n, acc = 1) { if (n <= 1) return acc; return fact(n - 1, n * acc); }
```

---

## Q54. WeakRef & FinalizationRegistry | WeakRef va FinalizationRegistry kesh xotirasi

**EN:** Creating weak references to objects and receiving cleanup callbacks when objects are garbage collected.

**UZB:** Ob'ektlarga kuchsiz havola berish va ular xotiradan o'chirilganda callback eshitish.

```javascript
const ref = new WeakRef(obj); const registry = new FinalizationRegistry(key => console.log('GCed', key));
```

---

## Q55. GlobalThis Universal Global Object | globalThis universal obyekti

**EN:** Standardized global object reference accessible identically across Browser (`window`), Node.js (`global`), and Web Workers.

**UZB:** Brauzer va Node.js da birdek ishlaydigan universal global ob'ekt.

```javascript
console.log(globalThis.setTimeout === setTimeout); // true
```

---

## Q56. Intl API for Internationalization | Intl API (Valyuta va Sanalarni mahalliy formatlash)

**EN:** Formatting currency, numbers, and dates natively according to user locale.

**UZB:** Valyuta va sanalarni foydalanuvchi mamlakatiga moslab avtomatik formatlash.

```javascript
new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS' }).format(1500000);
```

---

## Q57. Promise.all vs Promise.allSettled vs Promise.race vs Promise.any | Promise kombinatsiya metodlari farqi

**EN:** Promise.all fails fast on 1 error. Promise.allSettled waits for all results. Promise.race returns first settled. Promise.any returns first fulfilled.

**UZB:** Promise.all bitta xatoda to'xtaydi. Promise.allSettled barchasini kutadi. Promise.any birinchi muvaffaqiyatlisini oladi.

```javascript
Promise.allSettled([p1, p2]).then(results => console.log(results));
```

---

## Q58. Microtask Starvation Problem | Microtask Starvation (Macrotask block bo'lib qolishi) muammosi

**EN:** Infinite recursive microtask scheduling blocks Macrotask queue and UI rendering thread completely.

**UZB:** Cheksiz rekurtsiv mikro-vazifalar UI rendering va setTimeout larni bloklab qo'yishi.

```javascript
function loop() { Promise.resolve().then(loop); } // Freezes browser!
```

---

## Q59. Encapsulation via Symbols vs Closures | Symbol va Closure yordamida inkapsulyatsiya

**EN:** Comparing private property privacy mechanisms in JavaScript objects.

**UZB:** JS da ob'ekt maydonlarini inkapsulyatsiya qilish usullari.

```javascript
const _private = Symbol('private'); class User { [_private] = 42; }
```

---

## Q60. Array Buffer & DataView Binary Manipulation | ArrayBuffer va DataView yordamida binar ma'lumotlar

**EN:** Reading and writing binary data fields with explicit byte order (Little Endian vs Big Endian).

**UZB:** Binar ma'lumotlar baytlarini to'g'ridan-to'g me ri o'qish va yozish.

```javascript
const buf = new ArrayBuffer(16); const view = new DataView(buf); view.setInt32(0, 42, true);
```

---

## Q61. Object.is vs Strict Equality (`===`) | Object.is va Katt'iy tenglik (===) farqlari

**EN:** Object.is treats `+0` and `-0` as unequal, and `NaN` as equal to `NaN` (unlike `===`).

**UZB:** Object.is `+0` va `-0` ni har xil deb biladi va `NaN === NaN` xatosini to'g'rilaydi.

```javascript
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0)); // false
```

---

## Q62. Currying & Partial Application | Currying va Partial Application amaliyotda

**EN:** Fixing a subset of function arguments to produce a new specialized function.

**UZB:** Funksiya argumentlarining bir qismini biriktirib yangi maxsus funksiya hosil qilish.

```javascript
const add = (a, b) => a + b; const addFive = add.bind(null, 5); console.log(addFive(10)); // 15
```

---

## Q63. Dynamic Import (`import()`) & Code Splitting | Dynamic Import () va kodni bo'laklash

**EN:** Loading JavaScript modules asynchronously on demand to reduce initial page bundle size.

**UZB:** Boshlang'ich yuklanishni tezlashtirish uchun modullarni dinamik import qilish.

```javascript
const module = await import('./largeModule.js'); module.doSomething();
```

---

## Q64. Canvas API & 2D Context Rendering | Canvas API va 2D rendering

**EN:** Drawing shapes, images, and charts programmatically on HTML5 `<canvas>` element.

**UZB:** HTML5 Canvas elementida shakllar va grafiklar chizish.

```javascript
const ctx = canvas.getContext('2d'); ctx.fillStyle = 'red'; ctx.fillRect(0, 0, 100, 100);
```

---

## Q65. Blob & File API Manipulation | Blob va File API bilan ishlash

**EN:** Creating binary Blob objects in browser and generating downloadable object URLs.

**UZB:** Brauzerda binar fayllar yaratish va ularni yuklab olish havolasiga o'tkazish.

```javascript
const blob = new Blob(['Hello World'], { type: 'text/plain' }); const url = URL.createObjectURL(blob);
```

---

## Q66. URLSearchParams & Query String Parsing | URLSearchParams orqali URL parametrlarini o'qish

**EN:** Parsing and manipulating browser address bar query strings cleanly.

**UZB:** URL manzilidagi `?search=test&page=1` parametrlarini oson o me qish.

```javascript
const params = new URLSearchParams(window.location.search); console.log(params.get('search'));
```

---

## Q67. BroadcastChannel API for Cross-Tab Communication | BroadcastChannel API (Varaqlararo aloqa)

**EN:** Communicating between multiple open browser tabs/windows of the same origin in real-time.

**UZB:** Bitta saytning o'chirilmagan turli tablari o'rtasida real-vaqt rejimida xabar almashish.

```javascript
const channel = new BroadcastChannel('app_state'); channel.postMessage('logout');
```

---

## Q68. IndexedDB Client-Side Database Storage | IndexedDB brauzer ma'lumotlar bazasi

**EN:** Storing large structured datasets on client side asynchronously using NoSQL Object Store.

**UZB:** Brauzer ichida katta hajmdagi NoSQL ma'lumotlarni saqlash.

```javascript
const req = indexedDB.open('myDB', 1); req.onsuccess = e => { const db = e.target.result; };
```

---

## Q69. Performance API & High-Resolution Timestamps | Performance API va vaqtni o'lchash (performance.now)

**EN:** Measuring precise execution time of scripts with sub-millisecond precision.

**UZB:** Skript bajarilish tezligini millisekund aniqlikda o'lchash.

```javascript
const t0 = performance.now(); doWork(); const t1 = performance.now(); console.log(`${t1 - t0} ms`);
```

---

## Q70. Console API Advanced Features (`table`, `group`, `time`) | Console API (console.table, console.group)

**EN:** Formatting output debugging logs visually using table views and collapsible timer groups.

**UZB:** Konsolga ma'lumotlarni jadval va vaqt guruhlari ko'rinishida chiqarish.

```javascript
console.table([{ id: 1, name: 'Ali' }, { id: 2, name: 'Vali' }]);
```

---

## Q71. DOM Exception Handling & Custom Errors | DOM Exception va Shaxsiy Error sinflari

**EN:** Extending native `Error` class to create domain-specific application errors.

**UZB:** Standart Error sinfidan meros olib shaxsiy xatolik turlarini yaratish.

```javascript
class ValidationError extends Error { constructor(msg) { super(msg); this.name = 'ValidationError'; } }
```

---

## Q72. Strict Equality & Primitive Auto-Boxing | Primitiv turlarning avtomatik ob'ektga o'tishi (Auto-Boxing)

**EN:** Temporary wrapping of primitives into object wrappers when accessing properties (e.g. `'str'.length`).

**UZB:** Primitiv turdagi atributlarga murojaat qilinganda avtomatik ob'ektga o me tishi.

```javascript
const str = 'hello'; console.log(str.toUpperCase()); // Auto-boxed to String object
```

---

## Q73. Function Constructor (`new Function()`) Security Risks | new Function() va eval xavflari

**EN:** Evaluating dynamic code strings with security implications similar to `eval()`.

**UZB:** Dinamik matnli kodlarni ijro etish va uning xavfsizlik risklari.

```javascript
const sum = new Function('a', 'b', 'return a + b'); console.log(sum(2, 3));
```

---

## Q74. JavaScript Memory Profiling & Heap Snapshots | Xotira Diagnostikasi (Heap Snapshots)

**EN:** Profiling Chrome DevTools Heap Snapshots to isolate detached DOM node memory leaks.

**UZB:** Chrome DevTools yordamida xotira sizib chiqishlarini (Detached DOM) topish.

```javascript
DevTools -> Memory -> Take Heap Snapshot -> Filter 'Detached'
```

---

## Q75. Strict Equality & Prototype Pollution Defense | Prototype Pollution va uning oldini olish

**EN:** Preventing malicious property injection into `Object.prototype` by freezing or using `Object.create(null)`.

**UZB:** Ob'ekt prototipiga ziddiyatli kodlar quyilishining oldini olish.

```javascript
const safeObj = Object.create(null); // No prototype to pollute!
```

---

## Q76. JavaScript Module Execution Spec & Deferred Scripting | script defer vs async yuklanish tartibi

**EN:** `async` scripts execute immediately after download. `defer` scripts execute sequentially after HTML parsing.

**UZB:** async skript yuklanishi bilan darhol bajariladi. defer esa HTML parse bo'lgach tartib bilan ishlaydi.

```javascript
<script src='app.js' defer></script>
```

---

## Q77. JavaScript Garbage Collection Mark-and-Sweep Algorithm | Mark-and-Sweep GC algoritmi

**EN:** Traversing roots to mark reachable objects and sweeping unreachable objects from memory heap.

**UZB:** Root havolalardan yetib bo'lmaydigan ob'ektlarni aniqlab xotiradan o'chirish.

```javascript
Root (window) -> References -> Reachable (Keep) / Unreachable (Sweep)
```

---

## Q78. Web Crypto API for Secure Hashing | Web Crypto API va xavfsiz heshlash

**EN:** Generating cryptographic SHA-256 hashes natively inside browser environment.

**UZB:** Brauzerda SHA-256 va AES kriptografik amallarni bajarish.

```javascript
const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('secret'));
```

---

## Q79. Custom Element Custom Web Components | Web Components va Custom Elements

**EN:** Defining encapsulated native HTML elements using `customElements.define()`.

**UZB:** Brauzerda shaxsiy HTML teglarini yaratish va ro'yxatdan o'tkazish.

```javascript
class MyButton extends HTMLElement { connectedCallback() { this.innerHTML = '<button>Click</button>'; } }
customElements.define('my-button', MyButton);
```

---

## Q80. Shadow DOM Encapsulation | Shadow DOM va CSS inkapsulyatsiyasi

**EN:** Isolating component DOM subtrees and CSS styles from main document leakage.

**UZB:** Komponent DOM va CSS uslublarini tashqi hujjatdan butunlay ajratish.

```javascript
const shadow = this.attachShadow({ mode: 'closed' }); shadow.innerHTML = '<style>p{color:red}</style><p>Private</p>';
```

---

## Q81. HTML5 Drag and Drop API | Drag and Drop API hodisalari

**EN:** Managing element drag and drop interaction events natively across DOM.

**UZB:** DOM elementlarini surish va tashlash hodisalarini boshqarish.

```javascript
elem.addEventListener('dragstart', e => e.dataTransfer.setData('text', e.target.id));
```

---

## Q82. WebSockets Bi-Directional Protocol | WebSockets protokoli va real-vaqt aloqasi

**EN:** Establishing full-duplex persistent TCP connection between client and server.

**UZB:** Server va mijoz o'rtasida uzluksiz ikki tomonlama aloqa o'rnatish.

```javascript
const ws = new WebSocket('wss://api.example.com'); ws.onmessage = e => console.log(e.data);
```

---

## Q83. IndexedDB Cursor Iteration | IndexedDB Cursor yordamida ma'lumotlarni o me qish

**EN:** Iterating over large IndexedDB recordsets efficiently using cursors.

**UZB:** IndexedDB ma'lumotlar bazasini cursor bilan bosqichma-bosqich o me qish.

```javascript
store.openCursor().onsuccess = e => { const cursor = e.target.result; if (cursor) cursor.continue(); };
```

---

## Q84. Server-Sent Events (SSE) vs WebSockets | Server-Sent Events (SSE) va WebSockets farqlari

**EN:** SSE provides lightweight unidirectional real-time event streaming over standard HTTP.

**UZB:** SSE standart HTTP orqali bir tomonlama (serverdan mijozga) real-vaqt ma'lumot yuboradi.

```javascript
const evtSource = new EventSource('/events'); evtSource.onmessage = e => console.log(e.data);
```

---

## Q85. Page Visibility API for Resource Saving | Page Visibility API va resurslarni tejash

**EN:** Pausing video playback or timers when user switches browser tabs.

**UZB:** Foydalanuvchi boshqa tabga o me tganda videoni to me xtatish yoki timerlarni pauza qilish.

```javascript
document.addEventListener('visibilitychange', () => { if (document.hidden) pauseApp(); });
```

---

## Q86. Navigator Online/Offline Status Monitoring | Navigator Online/Offline tarmoq holatini kuzatish

**EN:** Detecting internet connection status changes in browser application.

**UZB:** Internet tarmog me i uzilganini yoki qayta yoqilganini aniqlash.

```javascript
window.addEventListener('offline', () => alert('Internet uzildi!'));
```

---

## Q87. Clipboard API for Copying Text | Clipboard API orqali matn nusxalash

**EN:** Reading and writing text to user system clipboard asynchronously with permission.

**UZB:** Matnlarni tizim buferiga (clipboard) asinxron nusxalash.

```javascript
await navigator.clipboard.writeText('Nusxalandi!');
```

---

## Q88. Web Audio API Audio Context Synthesizer | Web Audio API va ovoz sintezi

**EN:** Generating dynamic sound synthesis and audio processing graph programmatically.

**UZB:** Dasturiy ravishda ovoz effektlari va sintezator yaratish.

```javascript
const audioCtx = new AudioContext(); const osc = audioCtx.createOscillator(); osc.connect(audioCtx.destination); osc.start();
```

---

## Q89. Battery Status API Monitoring | Battery Status API yordamida batareya holati

**EN:** Monitoring user device battery level and charging state to optimize background tasks.

**UZB:** Qurilma quvvati kamayganda fon vazifalarini kamaytirish.

```javascript
const battery = await navigator.getBattery(); console.log(battery.level * 100 + '%');
```

---

## Q90. V8 Engine JIT (Just-In-Time) Compilation Phases | V8 Engine JIT (Ignition & TurboFan) bosqichlari

**EN:** Understanding Ignition bytecode interpreter and TurboFan optimizing compiler in V8.

**UZB:** V8 dvigatelida Ignition bayt-kod interpreter va TurboFan optomizatorining ishlash prinsiplari.

```javascript
Source Code -> AST -> Ignition Bytecode -> TurboFan Machine Code (Optimized)
```

---

## Q91. Hidden Classes & Inline Caching in V8 Engine | V8 Hidden Classes va Inline Caching optimizatsiyasi

**EN:** Structuring object properties consistently to allow V8 engine to reuse hidden shape classes.

**UZB:** V8 dvigateli ob'ekt atributlarini tezkor o me qishi uchun konstruktorda bir xil tartibda e'lon qilish.

```javascript
function User(a, b) { this.a = a; this.b = b; } // Consistent hidden class shape!
```

---

## Q92. JavaScript Memory Leak: Detached DOM Elements | Detached DOM Elements va xotira sizishi

**EN:** Holding references to DOM nodes in JS array after node is removed from document body.

**UZB:** DOM dan o'chirilgan elementga JS massivida silka saqlanib qolishi sababli xotira sizishi.

```javascript
let detached = document.getElementById('btn'); document.body.removeChild(detached); // Detached leak if referenced!
```

---

## Q93. Strict Equality Type Coercion Abstract Rules | Abstract Relational Comparison qoidalari

**EN:** Understanding implicit type coercion steps during relational comparison operators (`<`, `>`).

**UZB:** Relatsion taqqoslashda tiplarning avtomatik o me tkazilish tartibi.

```javascript
console.log('10' > 2); // true (coerces to number)
console.log('10' > '2'); // false (string comparison)
```

---

## Q94. JS Execution Context: Creation Phase vs Execution Phase | Execution Context yaratilish va bajarilish bosqichlari

**EN:** Creation phase sets up Variable Object (VO), Scope Chain, and `this` binding before execution.

**UZB:** Execution Context yaratilganda o'zgaruvchilar va scope zanjiri tayyorlanishi.

```javascript
Creation Phase (Hoisting & Scope setup) -> Execution Phase (Code run)
```

---

## Q95. Function Arity and `length` Property | Funksiya Arity va length atributi

**EN:** Inspecting number of expected arguments declared in function signature.

**UZB:** Funksiya nechta parametr kutayotganini `.length` bilan aniqlash.

```javascript
function fn(a, b, c = 1) {} console.log(fn.length); // 2 (default params excluded)
```

---

## Q96. Object Prototype Pollution Defense via `Object.freeze` | Object.freeze bilan Prototype Pollution oldini olish

**EN:** Freezing `Object.prototype` to prevent malicious runtime base object pollution.

**UZB:** Asosiy Ob'ekt prototipini muzlatib ziddiyatli o'zgarishlardan himoyalash.

```javascript
Object.freeze(Object.prototype);
```

---

## Q97. Tail Call Optimization Recursion Guard | TCO bilan cheksiz rekursiyadan saqlanish

**EN:** Reusing stack frames for tail-recursive functions in compliant JS engines.

**UZB:** Stack xotira to me lib ketishining oldini oluvchi tail-call rekursiya.

```javascript
function sum(n, acc=0) { if(n===0) return acc; return sum(n-1, acc+n); }
```

---

## Q98. Strict Mode Global Variable Protection | Strict Mode va global o'zgaruvchilar taqiqi

**EN:** Catching implicit global variable creations and throwing ReferenceError.

**UZB:** E'lon qilinmagan o'zgaruvchilarni taqiqlash.

```javascript
'use strict'; function test() { bad = 1; } // Throws ReferenceError!
```

---

## Q99. Dynamic Script Injection Loading Pattern | Dinamik script tegi ulash patterni

**EN:** Creating `<script>` element dynamically in JS to load third-party SDKs asynchronously.

**UZB:** Tashqi kutubxona va SDK larni dinamik script tegi bilan asinxron yuklash.

```javascript
const s = document.createElement('script'); s.src = 'https://sdk.com/api.js'; document.head.appendChild(s);
```

---

## Q100. JavaScript Custom Iterator Protocol Final Check | Iterator Protokoli yakuniy qoidalar

**EN:** Implementing custom `next()` method returning `{ value, done }` objects.

**UZB:** Shaxsiy Iterator yaratib `{ value, done }` qaytaruvchi protokolni hosil qilish.

```javascript
const it = { next: () => ({ value: 42, done: false }) };
```