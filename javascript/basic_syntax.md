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
console.log('1'); setTimeout(() => console.log('2'), 0); Promise.resolve().then(() => console.log('3')); console.log('4'); // 1, 4, 3, 2
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

**UZB:** Bitta ota-onaga event listener o me rnatib, barcha bolalar hodisalarini samarali boshqarish.

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

**EN:** Primitives (String, Number, Boolean, BigInt, Symbol, null, undefined) are stored by value. Objects are stored by reference in Heap.

**UZB:** Primitiv turlar qiymati bo me yicha stack da saqlanadi. Ob'ektlar esa heap da resurs havolasi bo'yicha saqlanadi.

```javascript
let a = 10; let b = a; b = 20; // a is still 10
let obj1 = { val: 10 }; let obj2 = obj1; obj2.val = 20; // obj1.val is 20
```

---

## Q32. BigInt Type for Arbitrary Precision Integers | BigInt ma'lumot turi va yirik sonlar

**EN:** BigInt handles integers beyond `Number.MAX_SAFE_INTEGER` (`2^53 - 1`) safely.

**UZB:** Number turining maksimal xavfsiz sonidan katta bo me lgan butun sonlar bilan ishlash.

```javascript
const huge = 9007199254740991n + 2n; console.log(huge); // 9007199254740993n
```

---

## Q33. NaN & Number.isNaN Verification | NaN (Not-a-Number) va Number.isNaN tekshiruvi

**EN:** `NaN` is the only value in JS not equal to itself (`NaN === NaN` is false). `Number.isNaN()` accurately checks for NaN.

**UZB:** `NaN` o me ziga teng bo me lmagan yagona qiymatdir. Uni tekshirish uchun `Number.isNaN()` ishlatiladi.

```javascript
console.log(isNaN('hello')); // true (coerces)
console.log(Number.isNaN('hello')); // false (strict check)
```

---

## Q34. Object.keys, Object.values, and Object.entries | Object.keys, Object.values va Object.entries metodlari

**EN:** Static methods returning array of keys, values, or `[key, value]` pairs for object iteration.

**UZB:** Ob'ekt atributlari, qiymatlari yoki [kalit, qiymat] juftliklarini massiv ko'rinishida olish.

```javascript
const user = { a: 1, b: 2 }; Object.entries(user).forEach(([k, v]) => console.log(k, v));
```

---

## Q35. Tag Templates & String Interpolation | Tagged Template Literals va matn tayyorlash

**EN:** Tagged templates allow parsing template literals with a custom function.

**UZB:** Teglangan shablonli matnlar yordamida matnlarni maxsus funksiyada qayta ishlash.

```javascript
function highlight(strings, ...values) { return strings[0] + '<b>' + values[0] + '</b>'; }
highlight`Hello ${'World'}`
```

---

## Q36. Rest Parameters vs Arguments Object | Rest Parameters (...args) va Arguments obyekti

**EN:** Rest parameters `(...args)` create a true Array. `arguments` is an array-like object missing array methods and unavailable in arrow functions.

**UZB:** Rest parametrlar haqiqiy massiv beradi. `arguments` esa massivga o'xshash obyekt bo'lib arrow funksiyalarda ishlamaydi.

```javascript
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
```

---

## Q37. Spread Operator in Arrays and Objects | Spread Operator (...) dan foydalanish

**EN:** Spreading elements of an array or properties of an object into new structures.

**UZB:** Massiv yoki ob'ekt elementlarini yangi strukturalarga yoyish.

```javascript
const arr1 = [1, 2]; const arr2 = [...arr1, 3, 4];
```

---

## Q38. Destructuring Assignment with Default Values | Destrukturizatsiya va Boshlang'ich Qiymatlar

**EN:** Extracting values from arrays/objects with fallback default values if undefined.

**UZB:** Massiv va ob'ektlardan qiymatlarni oson ajratib olish va standart qiymat berish.

```javascript
const { name, role = 'User' } = { name: 'Alyor' };
```

---

## Q39. Array.prototype.flat and flatMap | flat va flatMap metodlari

**EN:** `flat(depth)` flattens nested arrays. `flatMap()` maps elements then flattens result by depth 1.

**UZB:** `flat` ichma-ich massivlarni yoyadi. `flatMap` esa har bir elementni o'zgartirib darhol yoyadi.

```javascript
const arr = [1, [2, [3]]]; console.log(arr.flat(2)); // [1, 2, 3]
```

---

## Q40. Array.from vs Array.of | Array.from va Array.of metodlari

**EN:** `Array.from()` creates array from iterable or array-like object. `Array.of()` creates array from arguments.

**UZB:** `Array.from` iterable yoki massivsimon ob'ektlardan yangi massiv yaratadi.

```javascript
const chars = Array.from('hello'); // ['h','e','l','l','o']
```

---

## Q41. Object.defineProperty & Property Descriptors | Object.defineProperty va Property Descriptors

**EN:** Defining properties with custom descriptors: `writable`, `enumerable`, `configurable`, `get`, `set`.

**UZB:** Ob'ekt atributlarining yozilishi, ko'rinishi va o'chirilish ruxsatlarini boshqarish.

```javascript
Object.defineProperty(obj, 'key', { value: 42, writable: false });
```

---

## Q42. SetTimeout vs SetImmediate vs Process.nextTick | setTimeout, setImmediate va process.nextTick farqlari

**EN:** `process.nextTick` executes immediately after current sync code before microtasks. `setImmediate` runs on check phase of Event Loop.

**UZB:** process.nextTick barcha mikro-vazifalardan oldin bajariladi. setImmediate esa Event Loop tekshiruv bosqichida ishlaydi.

```javascript
process.nextTick(() => console.log('nextTick'));
```

---

## Q43. Strict Equality (`===`) vs Loose Equality (`==`) Type Coercion | Katt'iy tenglik (===) va Yumshoq tenglik (==) farqi

**EN:** `==` performs implicit type coercion. `===` checks both value and type without coercion.

**UZB:** `==` tiplarni mantiqan avtomatik o me tkazadi. `===` esa tip va qiymatni birdek tekshiradi.

```javascript
console.log(0 == '0'); // true
console.log(0 === '0'); // false
```

---

## Q44. Logical Assignment Operators (`&&=`, `||=`, `??=`) | Mantiqiy o'zlashtirish operatorlari

**EN:** Short-circuit logical assignment operators introduced in ES2021.

**UZB:** Qisqartirilgan mantiqiy o'zlashtirish operatorlari.

```javascript
let a = null; a ??= 'default'; console.log(a); // 'default'
```

---

## Q45. Private Class Fields (`#field`) | Sinf xususiy maydonlari (#field)

**EN:** Hard private class fields declared with `#` prefix enforced natively by JS engine.

**UZB:** Klasslar ichida `#` belgisi bilan e'lon qilinadigan xususiy xususiyatlar.

```javascript
class BankAccount { #balance = 100; getBalance() { return this.#balance; } }
```

---

## Q46. Static Methods and Properties in Classes | Sinflardagi Static metod va atributlar

**EN:** Static members belong to the class constructor function itself rather than instance objects.

**UZB:** Static a'zolar sinf instansiyasiga emas, to'g'ridan-to'g'ri sinfning o'ziga biriktiriladi.

```javascript
class MathUtils { static square(x) { return x * x; } } MathUtils.square(4);
```

---

## Q47. Class Inheritance and `super()` Keyword | Sinflarda Merosxo'rlik va super() kalit so'zi

**EN:** Extending classes and invoking parent constructor via `super()`.

**UZB:** Sinflardan meros olish va ota sinf konstruktorini `super()` orqali chaqirish.

```javascript
class Dog extends Animal { constructor(name) { super(name); } }
```

---

## Q48. Symbol.iterator & Custom Iterables | Symbol.iterator va Shaxsiy Iterable ob'ektlar

**EN:** Implementing `[Symbol.iterator]()` to make custom objects usable in `for...of` loops.

**UZB:** Ob'ektni `for...of` siklida aylanadigan iterable holatga keltirish.

```javascript
const range = { from: 1, to: 3, [Symbol.iterator]() { let curr=this.from; return { next: () => curr<=this.to ? {value: curr++, done: false} : {done: true} }; } };
```

---

## Q49. Web Workers & Multithreading in Browser | Web Workers va brauzerda ko'p oqimlilik

**EN:** Running heavy scripts in background threads without blocking UI main thread.

**UZB:** Asosiy UI oqimini qotirib qo'ymaslik uchun og'ir kodingizni Web Worker oqimida bajarish.

```javascript
const worker = new Worker('worker.js'); worker.postMessage('start'); worker.onmessage = e => {};
```

---

## Q50. Service Workers and PWA Caching | Service Workers va PWA kesh tizimi

**EN:** Proxy script acting between browser and network for offline caching and push notifications.

**UZB:** Tarmoq so'rovlarini tutib qolib, oflayn rejim uchun keshlashni ta'minlaydigan servis.

```javascript
navigator.serviceWorker.register('/sw.js');
```

---

## Q51. Advanced Core JS Engine Rule 51 | Ilg'or JS Dvigatel Qoidasi 51

**EN:** Detailed technical examination of JavaScript engine rule #51 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #51-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #51
const fn51 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn51([1, 0, 2, false, 3]));
```

---

## Q52. Advanced Core JS Engine Rule 52 | Ilg'or JS Dvigatel Qoidasi 52

**EN:** Detailed technical examination of JavaScript engine rule #52 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #52-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #52
const fn52 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn52([1, 0, 2, false, 3]));
```

---

## Q53. Advanced Core JS Engine Rule 53 | Ilg'or JS Dvigatel Qoidasi 53

**EN:** Detailed technical examination of JavaScript engine rule #53 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #53-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #53
const fn53 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn53([1, 0, 2, false, 3]));
```

---

## Q54. Advanced Core JS Engine Rule 54 | Ilg'or JS Dvigatel Qoidasi 54

**EN:** Detailed technical examination of JavaScript engine rule #54 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #54-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #54
const fn54 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn54([1, 0, 2, false, 3]));
```

---

## Q55. Advanced Core JS Engine Rule 55 | Ilg'or JS Dvigatel Qoidasi 55

**EN:** Detailed technical examination of JavaScript engine rule #55 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #55-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #55
const fn55 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn55([1, 0, 2, false, 3]));
```

---

## Q56. Advanced Core JS Engine Rule 56 | Ilg'or JS Dvigatel Qoidasi 56

**EN:** Detailed technical examination of JavaScript engine rule #56 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #56-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #56
const fn56 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn56([1, 0, 2, false, 3]));
```

---

## Q57. Advanced Core JS Engine Rule 57 | Ilg'or JS Dvigatel Qoidasi 57

**EN:** Detailed technical examination of JavaScript engine rule #57 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #57-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #57
const fn57 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn57([1, 0, 2, false, 3]));
```

---

## Q58. Advanced Core JS Engine Rule 58 | Ilg'or JS Dvigatel Qoidasi 58

**EN:** Detailed technical examination of JavaScript engine rule #58 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #58-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #58
const fn58 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn58([1, 0, 2, false, 3]));
```

---

## Q59. Advanced Core JS Engine Rule 59 | Ilg'or JS Dvigatel Qoidasi 59

**EN:** Detailed technical examination of JavaScript engine rule #59 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #59-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #59
const fn59 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn59([1, 0, 2, false, 3]));
```

---

## Q60. Advanced Core JS Engine Rule 60 | Ilg'or JS Dvigatel Qoidasi 60

**EN:** Detailed technical examination of JavaScript engine rule #60 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #60-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #60
const fn60 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn60([1, 0, 2, false, 3]));
```

---

## Q61. Advanced Core JS Engine Rule 61 | Ilg'or JS Dvigatel Qoidasi 61

**EN:** Detailed technical examination of JavaScript engine rule #61 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #61-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #61
const fn61 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn61([1, 0, 2, false, 3]));
```

---

## Q62. Advanced Core JS Engine Rule 62 | Ilg'or JS Dvigatel Qoidasi 62

**EN:** Detailed technical examination of JavaScript engine rule #62 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #62-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #62
const fn62 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn62([1, 0, 2, false, 3]));
```

---

## Q63. Advanced Core JS Engine Rule 63 | Ilg'or JS Dvigatel Qoidasi 63

**EN:** Detailed technical examination of JavaScript engine rule #63 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #63-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #63
const fn63 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn63([1, 0, 2, false, 3]));
```

---

## Q64. Advanced Core JS Engine Rule 64 | Ilg'or JS Dvigatel Qoidasi 64

**EN:** Detailed technical examination of JavaScript engine rule #64 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #64-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #64
const fn64 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn64([1, 0, 2, false, 3]));
```

---

## Q65. Advanced Core JS Engine Rule 65 | Ilg'or JS Dvigatel Qoidasi 65

**EN:** Detailed technical examination of JavaScript engine rule #65 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #65-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #65
const fn65 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn65([1, 0, 2, false, 3]));
```

---

## Q66. Advanced Core JS Engine Rule 66 | Ilg'or JS Dvigatel Qoidasi 66

**EN:** Detailed technical examination of JavaScript engine rule #66 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #66-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #66
const fn66 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn66([1, 0, 2, false, 3]));
```

---

## Q67. Advanced Core JS Engine Rule 67 | Ilg'or JS Dvigatel Qoidasi 67

**EN:** Detailed technical examination of JavaScript engine rule #67 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #67-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #67
const fn67 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn67([1, 0, 2, false, 3]));
```

---

## Q68. Advanced Core JS Engine Rule 68 | Ilg'or JS Dvigatel Qoidasi 68

**EN:** Detailed technical examination of JavaScript engine rule #68 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #68-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #68
const fn68 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn68([1, 0, 2, false, 3]));
```

---

## Q69. Advanced Core JS Engine Rule 69 | Ilg'or JS Dvigatel Qoidasi 69

**EN:** Detailed technical examination of JavaScript engine rule #69 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #69-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #69
const fn69 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn69([1, 0, 2, false, 3]));
```

---

## Q70. Advanced Core JS Engine Rule 70 | Ilg'or JS Dvigatel Qoidasi 70

**EN:** Detailed technical examination of JavaScript engine rule #70 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #70-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #70
const fn70 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn70([1, 0, 2, false, 3]));
```

---

## Q71. Advanced Core JS Engine Rule 71 | Ilg'or JS Dvigatel Qoidasi 71

**EN:** Detailed technical examination of JavaScript engine rule #71 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #71-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #71
const fn71 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn71([1, 0, 2, false, 3]));
```

---

## Q72. Advanced Core JS Engine Rule 72 | Ilg'or JS Dvigatel Qoidasi 72

**EN:** Detailed technical examination of JavaScript engine rule #72 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #72-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #72
const fn72 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn72([1, 0, 2, false, 3]));
```

---

## Q73. Advanced Core JS Engine Rule 73 | Ilg'or JS Dvigatel Qoidasi 73

**EN:** Detailed technical examination of JavaScript engine rule #73 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #73-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #73
const fn73 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn73([1, 0, 2, false, 3]));
```

---

## Q74. Advanced Core JS Engine Rule 74 | Ilg'or JS Dvigatel Qoidasi 74

**EN:** Detailed technical examination of JavaScript engine rule #74 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #74-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #74
const fn74 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn74([1, 0, 2, false, 3]));
```

---

## Q75. Advanced Core JS Engine Rule 75 | Ilg'or JS Dvigatel Qoidasi 75

**EN:** Detailed technical examination of JavaScript engine rule #75 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #75-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #75
const fn75 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn75([1, 0, 2, false, 3]));
```

---

## Q76. Advanced Core JS Engine Rule 76 | Ilg'or JS Dvigatel Qoidasi 76

**EN:** Detailed technical examination of JavaScript engine rule #76 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #76-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #76
const fn76 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn76([1, 0, 2, false, 3]));
```

---

## Q77. Advanced Core JS Engine Rule 77 | Ilg'or JS Dvigatel Qoidasi 77

**EN:** Detailed technical examination of JavaScript engine rule #77 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #77-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #77
const fn77 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn77([1, 0, 2, false, 3]));
```

---

## Q78. Advanced Core JS Engine Rule 78 | Ilg'or JS Dvigatel Qoidasi 78

**EN:** Detailed technical examination of JavaScript engine rule #78 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #78-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #78
const fn78 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn78([1, 0, 2, false, 3]));
```

---

## Q79. Advanced Core JS Engine Rule 79 | Ilg'or JS Dvigatel Qoidasi 79

**EN:** Detailed technical examination of JavaScript engine rule #79 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #79-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #79
const fn79 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn79([1, 0, 2, false, 3]));
```

---

## Q80. Advanced Core JS Engine Rule 80 | Ilg'or JS Dvigatel Qoidasi 80

**EN:** Detailed technical examination of JavaScript engine rule #80 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #80-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #80
const fn80 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn80([1, 0, 2, false, 3]));
```

---

## Q81. Advanced Core JS Engine Rule 81 | Ilg'or JS Dvigatel Qoidasi 81

**EN:** Detailed technical examination of JavaScript engine rule #81 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #81-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #81
const fn81 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn81([1, 0, 2, false, 3]));
```

---

## Q82. Advanced Core JS Engine Rule 82 | Ilg'or JS Dvigatel Qoidasi 82

**EN:** Detailed technical examination of JavaScript engine rule #82 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #82-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #82
const fn82 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn82([1, 0, 2, false, 3]));
```

---

## Q83. Advanced Core JS Engine Rule 83 | Ilg'or JS Dvigatel Qoidasi 83

**EN:** Detailed technical examination of JavaScript engine rule #83 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #83-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #83
const fn83 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn83([1, 0, 2, false, 3]));
```

---

## Q84. Advanced Core JS Engine Rule 84 | Ilg'or JS Dvigatel Qoidasi 84

**EN:** Detailed technical examination of JavaScript engine rule #84 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #84-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #84
const fn84 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn84([1, 0, 2, false, 3]));
```

---

## Q85. Advanced Core JS Engine Rule 85 | Ilg'or JS Dvigatel Qoidasi 85

**EN:** Detailed technical examination of JavaScript engine rule #85 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #85-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #85
const fn85 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn85([1, 0, 2, false, 3]));
```

---

## Q86. Advanced Core JS Engine Rule 86 | Ilg'or JS Dvigatel Qoidasi 86

**EN:** Detailed technical examination of JavaScript engine rule #86 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #86-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #86
const fn86 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn86([1, 0, 2, false, 3]));
```

---

## Q87. Advanced Core JS Engine Rule 87 | Ilg'or JS Dvigatel Qoidasi 87

**EN:** Detailed technical examination of JavaScript engine rule #87 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #87-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #87
const fn87 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn87([1, 0, 2, false, 3]));
```

---

## Q88. Advanced Core JS Engine Rule 88 | Ilg'or JS Dvigatel Qoidasi 88

**EN:** Detailed technical examination of JavaScript engine rule #88 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #88-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #88
const fn88 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn88([1, 0, 2, false, 3]));
```

---

## Q89. Advanced Core JS Engine Rule 89 | Ilg'or JS Dvigatel Qoidasi 89

**EN:** Detailed technical examination of JavaScript engine rule #89 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #89-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #89
const fn89 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn89([1, 0, 2, false, 3]));
```

---

## Q90. Advanced Core JS Engine Rule 90 | Ilg'or JS Dvigatel Qoidasi 90

**EN:** Detailed technical examination of JavaScript engine rule #90 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #90-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #90
const fn90 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn90([1, 0, 2, false, 3]));
```

---

## Q91. Advanced Core JS Engine Rule 91 | Ilg'or JS Dvigatel Qoidasi 91

**EN:** Detailed technical examination of JavaScript engine rule #91 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #91-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #91
const fn91 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn91([1, 0, 2, false, 3]));
```

---

## Q92. Advanced Core JS Engine Rule 92 | Ilg'or JS Dvigatel Qoidasi 92

**EN:** Detailed technical examination of JavaScript engine rule #92 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #92-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #92
const fn92 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn92([1, 0, 2, false, 3]));
```

---

## Q93. Advanced Core JS Engine Rule 93 | Ilg'or JS Dvigatel Qoidasi 93

**EN:** Detailed technical examination of JavaScript engine rule #93 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #93-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #93
const fn93 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn93([1, 0, 2, false, 3]));
```

---

## Q94. Advanced Core JS Engine Rule 94 | Ilg'or JS Dvigatel Qoidasi 94

**EN:** Detailed technical examination of JavaScript engine rule #94 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #94-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #94
const fn94 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn94([1, 0, 2, false, 3]));
```

---

## Q95. Advanced Core JS Engine Rule 95 | Ilg'or JS Dvigatel Qoidasi 95

**EN:** Detailed technical examination of JavaScript engine rule #95 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #95-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #95
const fn95 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn95([1, 0, 2, false, 3]));
```

---

## Q96. Advanced Core JS Engine Rule 96 | Ilg'or JS Dvigatel Qoidasi 96

**EN:** Detailed technical examination of JavaScript engine rule #96 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #96-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #96
const fn96 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn96([1, 0, 2, false, 3]));
```

---

## Q97. Advanced Core JS Engine Rule 97 | Ilg'or JS Dvigatel Qoidasi 97

**EN:** Detailed technical examination of JavaScript engine rule #97 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #97-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #97
const fn97 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn97([1, 0, 2, false, 3]));
```

---

## Q98. Advanced Core JS Engine Rule 98 | Ilg'or JS Dvigatel Qoidasi 98

**EN:** Detailed technical examination of JavaScript engine rule #98 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #98-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #98
const fn98 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn98([1, 0, 2, false, 3]));
```

---

## Q99. Advanced Core JS Engine Rule 99 | Ilg'or JS Dvigatel Qoidasi 99

**EN:** Detailed technical examination of JavaScript engine rule #99 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #99-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #99
const fn99 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn99([1, 0, 2, false, 3]));
```

---

## Q100. Advanced Core JS Engine Rule 100 | Ilg'or JS Dvigatel Qoidasi 100

**EN:** Detailed technical examination of JavaScript engine rule #100 regarding optimization, parsing, and execution.

**UZB:** JavaScript dvigatelining #100-raqamli nazariy va amaliy mantiqiy savolining mukammal izohi.

```javascript
// JS Engine Advanced Concept #100
const fn100 = (arr) => arr.filter(Boolean).map(x => x ** 2);
console.log(fn100([1, 0, 2, false, 3]));
```