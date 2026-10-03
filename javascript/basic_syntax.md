# 💛 1. JavaScript asoslari — oddiy tilda intervyu savollari

> **Kim uchun:** JavaScript'ni endi o'rganayotganlar va intervyuga tayyorlanayotganlar. Har bir savol oddiy tilda, hayotiy misol bilan tushuntirilgan.
> **Qanday o'qish kerak:** avval "Oddiy qilib aytganda"ni o'qing. Tushungach, "Batafsilroq" va kodga o'ting. "Intervyuda shunday ayting" — tayyor javob.
> **Kod:** ` ```js ` belgili misollar Node.js'da ishga tushirib tekshirilgan; ` ```javascript ` belgililari faqat brauzerda ishlaydi.

---

# Kichik lug'at

| So'z | Oddiy ma'nosi |
|---|---|
| **O'zgaruvchi** | qiymat saqlanadigan nomli quti: `let age = 20` |
| **Funksiya** | nomi bor, qayta-qayta chaqiriladigan buyruqlar to'plami |
| **Obyekt** | "kalit: qiymat" juftliklari to'plami: `{ name: "Ali", age: 20 }` |
| **Massiv (array)** | tartiblangan ro'yxat: `[1, 2, 3]` |
| **Scope (ko'rinish doirasi)** | o'zgaruvchi "ko'rinadigan" joy — masalan, faqat funksiya ichida |
| **Callback** | boshqa funksiyaga "ish tugagach meni chaqir" deb berilgan funksiya |
| **Asinxron** | "kutib o'tirmasdan": natija keyinroq keladi, dastur esa to'xtamaydi |
| **DOM** | brauzerdagi sahifaning JavaScript'dan boshqariladigan "daraxti" |

---

# Savollar

## Q1. Event loop nima va microtask macrotask'dan oldin nega ishlaydi? / What is the event loop and why do microtasks run before macrotasks?

**Oddiy qilib aytganda:** JavaScript — bitta kassiri bor do'kon. Kassir navbatdagi xaridorga xizmat qiladi. Ikkita navbat bor: **VIP navbat** (microtask'lar — Promise natijalari) va **oddiy navbat** (macrotask'lar — `setTimeout`, tugma bosilishi). Kassir har bir oddiy xaridordan keyin avval **butun VIP navbatni** bo'shatadi, keyin keyingi oddiy xaridorga o'tadi.

**Batafsilroq:**
- **Call stack** (chaqiruvlar to'plami) — hozir bajarilayotgan kod.
- **Macrotask** — `setTimeout`, `setInterval`, foydalanuvchi hodisalari, butun skriptning o'zi.
- **Microtask** — `Promise.then`, `await`dan keyingi qism, `queueMicrotask`.
- Qoida: joriy kod tugagach → **barcha** microtask'lar → (brauzerda kerak bo'lsa sahifani qayta chizish) → **bitta** macrotask → yana barcha microtask'lar...

**Misol:**

```js
console.log("1: oddiy kod");
setTimeout(() => console.log("4: setTimeout — macrotask"), 0);
Promise.resolve().then(() => console.log("3: Promise — microtask"));
console.log("2: oddiy kod");
// 1, 2, 3, 4
```

**Intervyuda shunday ayting:** "Event loop call stack bo'shaganda navbatlardan ish oladi. Har bir macrotask'dan keyin microtask navbati to'liq bo'shatiladi, shuning uchun `Promise.then` `setTimeout(fn, 0)` dan oldin ishlaydi."

**Esda tuting:** `setTimeout(fn, 0)` "darhol" degani emas — "joriy kod va barcha microtask'lardan keyin, eng erta" degani.

## Q2. var, let va const farqi nima, Temporal Dead Zone nima? / What is the difference between var, let and const, and what is the Temporal Dead Zone?

**Oddiy qilib aytganda:** `let` va `const` — ustiga nom yozilgan qutilar, faqat o'z xonasida (blokda `{ }`) ko'rinadi. `const` qutisi yopiq — boshqa narsa solib bo'lmaydi. `var` — eski usul: quti butun uyga (funksiyaga) ko'rinadi, bu esa chalkashlik keltiradi.

**Batafsilroq:**

| | `var` | `let` | `const` |
|---|---|---|---|
| Ko'rinish doirasi | funksiya | blok `{ }` | blok `{ }` |
| Qayta tayinlash | mumkin | mumkin | **mumkin emas** |
| E'londan oldin murojaat | `undefined` | **xato** (TDZ) | **xato** (TDZ) |

- **Hoisting (ko'tarilish)** — JavaScript e'lonlarni kod boshida "ko'radi". `var` darhol `undefined` bo'ladi, `let/const` esa e'lon qatorigacha "o'lik zona"da turadi.
- **Temporal Dead Zone (TDZ)** — blok boshidan `let/const` e'lon qilingan qatorgacha bo'lgan joy; bu yerda o'zgaruvchiga murojaat `ReferenceError` beradi.
- `const` obyektni "muzlatmaydi": `const user = {}; user.name = "Ali"` ishlaydi — faqat `user`ga yangi obyekt tayinlab bo'lmaydi.

**Misol:**

```js
console.log(typeof a); // "undefined" — var ko'tarilgan
var a = 1;

try {
  console.log(b);      // TDZ ichida
} catch (error) {
  console.log(error.name); // ReferenceError
}
let b = 2;

const user = { name: "Ali" };
user.name = "Vali";    // mumkin — ichidagi qiymat o'zgardi
console.log(user.name); // Vali
```

**Intervyuda shunday ayting:** "`var` funksiya doirasida va e'londan oldin `undefined` qaytaradi. `let` va `const` blok doirasida, e'longacha TDZ tufayli xato beradi. `const` faqat qayta tayinlashni taqiqlaydi, obyekt ichini emas. Men default `const`, kerak bo'lsa `let` ishlataman."

**Esda tuting:** `for (var i ...) setTimeout(() => console.log(i))` hamma joyda oxirgi qiymatni chiqaradi; `let` bilan har aylanishda yangi `i` bo'ladi.

## Q3. Closure nima va undan qanday foydalaniladi? / What is a closure and how is it used?

**Oddiy qilib aytganda:** closure — funksiyaning "ryukzagi". Funksiya yaratilganda atrofidagi o'zgaruvchilarni ryukzagiga solib oladi va keyin qayerda chaqirilsa ham ularni ishlata oladi — hatto tashqi funksiya allaqachon tugagan bo'lsa ham.

**Batafsilroq:**
- Ichki funksiya tashqi funksiyaning o'zgaruvchilariga kira oladi.
- Tashqi funksiya tugagach ham bu o'zgaruvchilar yo'qolmaydi, chunki ichki funksiya ularni "ushlab turibdi".
- Asosiy foydasi — **ma'lumotni yashirish**: tashqaridan `count`ni to'g'ridan-to'g'ri o'zgartirib bo'lmaydi, faqat ruxsat berilgan funksiyalar orqali.

**Misol:**

```js
function createCounter() {
  let count = 0;                 // tashqaridan ko'rinmaydi
  return {
    increment: () => ++count,
    current: () => count,
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.current()); // 2
console.log(counter.count);     // undefined — yashirin
```

**Intervyuda shunday ayting:** "Closure — funksiya va u yaratilgan leksik muhitning birikmasi. Ichki funksiya tashqi o'zgaruvchilarni tashqi funksiya tugagandan keyin ham ishlatadi. Men uni ma'lumotni yashirish, fabrika funksiyalar va callback'larda holat saqlash uchun ishlataman."

**Esda tuting:** closure katta obyektni ushlab qolsa, u xotiradan tozalanmaydi. Uzoq yashaydigan callback'larda keraksiz katta ma'lumotni ushlab qolmang.

## Q4. this nimaga teng bo'ladi va arrow funksiyada nega boshqacha? / What does this refer to, and why is it different in arrow functions?

**Oddiy qilib aytganda:** `this` — "meni kim chaqirdi?" savoliga javob. Oddiy funksiyada `this` **chaqirilgan joyga** qarab o'zgaradi. Arrow funksiyaning o'z `this`i yo'q — u `this`ni **yozilgan joyidan** oladi, xuddi ota-onasidan meros olgandek.

**Batafsilroq:**
- `obj.method()` — `this` = `obj` (nuqtadan oldingi obyekt).
- `fn()` — oddiy chaqiruv: strict mode'da `this` = `undefined`.
- `new Fn()` — `this` = yangi yaratilgan obyekt.
- `fn.call(x)` — `this` = `x` (aniq berilgan).
- Arrow funksiya `() => {}` — `this`ni tashqi funksiyadan oladi va uni o'zgartirib bo'lmaydi.

**Misol:**

```js
const timer = {
  seconds: 5,
  regular() {
    return function () { return this?.seconds; }; // this yo'qoladi
  },
  arrow() {
    return () => this.seconds;                     // this — timer
  },
};

console.log(timer.regular()()); // undefined
console.log(timer.arrow()());   // 5
```

**Intervyuda shunday ayting:** "Oddiy funksiyada `this` chaqiruv usuliga bog'liq: metod, `new`, `call/apply/bind` yoki oddiy chaqiruv. Arrow funksiya `this`ni leksik, ya'ni yaratilgan joydan oladi. Shuning uchun callback'larda arrow qulay, lekin obyekt metodi sifatida arrow yozilsa, `this` obyektga teng bo'lmaydi."

**Esda tuting:** obyekt metodini arrow bilan yozmang: `{ name: "A", hi: () => this.name }` — bu yerda `this` obyekt emas.

## Q5. Promise va async/await nima? / What are Promises and async/await?

**Oddiy qilib aytganda:** Promise — oshxonadan olingan **chek**: "ovqatingiz tayyor bo'lganda beramiz". Chek uch holatda bo'ladi: kutilmoqda, tayyor (fulfilled), bekor qilindi (rejected). `async/await` — shu chek bilan ishlashning qulay usuli: "ovqat tayyor bo'lguncha shu yerda kutaman" deb yozasiz, lekin dastur to'xtab qolmaydi.

**Batafsilroq:**
- Promise holatlari: `pending` → `fulfilled` (qiymat bilan) yoki `rejected` (xato bilan). Holat faqat bir marta o'zgaradi.
- `.then()` — muvaffaqiyatda, `.catch()` — xatoda, `.finally()` — har ikkisida.
- `async` funksiya har doim Promise qaytaradi.
- `await` — Promise natijasini kutadi; xato bo'lsa, uni `try/catch` bilan ushlaysiz.

**Misol:**

```js
const cook = (dish, ms, fail = false) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (fail ? reject(new Error(`${dish} kuyib ketdi`)) : resolve(`${dish} tayyor`)), ms));

async function dinner() {
  try {
    console.log(await cook("osh", 20));
    console.log(await cook("somsa", 10, true));
  } catch (error) {
    console.log("Xato:", error.message);
  } finally {
    console.log("Oshxona yopildi");
  }
}
await dinner();
// osh tayyor / Xato: somsa kuyib ketdi / Oshxona yopildi
```

**Intervyuda shunday ayting:** "Promise — kelajakdagi natijani ifodalovchi obyekt, uch holatga ega. `async/await` Promise ustidagi sintaksis: kod sinxron ko'rinadi, xatolar `try/catch` bilan ushlanadi. Mustaqil ishlarni ketma-ket emas, `Promise.all` bilan parallel ishga tushiraman."

**Esda tuting:** bir-biriga bog'liq bo'lmagan ikkita `await`ni ketma-ket yozish vaqtni ikki baravar oshiradi: `await Promise.all([a(), b()])` tezroq.

## Q6. Shallow copy va deep copy farqi nima? / What is the difference between a shallow copy and a deep copy?

**Oddiy qilib aytganda:** **shallow copy** — kitob javonining fotosuratini emas, faqat **tashqi qutisini** nusxalash: ichidagi kitoblar ikkala qutida **bir xil**. Birida kitobni o'zgartirsangiz, ikkinchisida ham o'zgaradi. **Deep copy** — har bir kitobni ham qayta chop etish: ikkalasi butunlay mustaqil.

**Batafsilroq:**
- `{ ...obj }` va `Object.assign({}, obj)` — shallow: faqat birinchi qavat nusxalanadi, ichki obyektlar umumiy qoladi.
- `structuredClone(obj)` — deep: barcha qavatlarni nusxalaydi; `Date`, `Map`, `Set` va aylanma havolalarni ham to'g'ri ko'chiradi.
- `JSON.parse(JSON.stringify(obj))` — eski usul: `Date` matnga aylanadi, `undefined` va funksiyalar yo'qoladi.

**Misol:**

```js
const original = { name: "Ali", address: { city: "Toshkent" } };

const shallow = { ...original };
shallow.address.city = "Samarqand";
console.log(original.address.city); // Samarqand — ichki obyekt umumiy edi!

const deep = structuredClone(original);
deep.address.city = "Buxoro";
console.log(original.address.city); // Samarqand — o'zgarmadi
```

**Intervyuda shunday ayting:** "Shallow copy faqat yuqori darajadagi xususiyatlarni ko'chiradi, ichki obyektlar havola orqali ulashiladi. Deep copy uchun `structuredClone` ishlataman — u `Date`, `Map`, `Set` va aylanma havolalarni qo'llaydi, lekin funksiyalarni nusxalay olmaydi."

**Esda tuting:** React'da holatni yangilashda `{ ...state }` qilib, ichki massivni `push` bilan o'zgartirish — klassik xato. Ichki darajani ham yangi nusxa qiling.

## Q7. Prototip zanjiri nima? / What is the prototype chain?

**Oddiy qilib aytganda:** bola biror narsani bilmasa, otasidan so'raydi; otasi bilmasa — bobosidan. JavaScript'da obyekt ham xuddi shunday: xususiyat o'zida bo'lmasa, uni **prototipidan**, u yerda ham bo'lmasa — prototipning prototipidan qidiradi. Bu zanjir `null`ga yetguncha davom etadi.

**Batafsilroq:**
- Har bir obyektda yashirin havola bor — `[[Prototype]]` (uni `Object.getPrototypeOf(obj)` bilan ko'rish mumkin).
- `class` — shu mexanizm ustidagi qulay sintaksis: metodlar `ClassName.prototype`da saqlanadi va barcha nusxalar ularni ulashadi (har bir nusxada nusxalanmaydi — xotira tejaladi).
- `extends` — prototip zanjiriga yana bir halqa qo'shadi.

**Misol:**

```js
class Animal {
  constructor(name) { this.name = name; }
  eat() { return `${this.name} ovqatlanyapti`; }
}
class Dog extends Animal {
  bark() { return "Vov!"; }
}

const rex = new Dog("Rex");
console.log(rex.bark());                                           // o'zida (Dog.prototype)
console.log(rex.eat());                                            // otasida (Animal.prototype)
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true
console.log(Object.hasOwn(rex, "eat"));                            // false — metod prototipda
```

**Intervyuda shunday ayting:** "Har bir obyektda `[[Prototype]]` havolasi bor. Xususiyat topilmasa, qidiruv zanjir bo'ylab yuqoriga boradi. `class` va `extends` shu mexanizm ustida qurilgan: metodlar prototipda saqlanadi va nusxalar orasida ulashiladi."

**Esda tuting:** `Object.prototype`ni o'zgartirish barcha obyektlarga ta'sir qiladi — bu "prototype pollution" xavfi (Q74 ga qarang).

## Q8. Debounce nima va uni qanday yozasiz? / What is debounce and how do you implement it?

**Oddiy qilib aytganda:** lift eshigini tasavvur qiling: har safar kimdir kirsa, eshik yopilishini qaytadan kutadi. Faqat hech kim kirmay qo'ygandan keyin, masalan 2 soniyadan so'ng yopiladi. **Debounce** ham shunday: hodisalar to'xtagandan keyin ma'lum vaqt o'tgach funksiya **bir marta** ishlaydi.

**Batafsilroq:**
- Qidiruv maydonida har harf yozilganda serverga so'rov yuborish isrof. Debounce bilan foydalanuvchi yozishni to'xtatgach, bitta so'rov ketadi.
- Mexanizm: har chaqiruvda eski taymerni bekor qilib (`clearTimeout`), yangisini qo'yamiz.

**Misol:**

```js
function debounce(fn, delayMs) {
  let timer;
  return (...args) => {
    clearTimeout(timer);                              // oldingi rejani bekor qilish
    timer = setTimeout(() => fn(...args), delayMs);   // yangidan kutish
  };
}

const search = debounce((text) => console.log("Qidirilmoqda:", text), 50);
search("s"); search("sa"); search("sal"); search("salom");
// 50 ms dan keyin faqat bir marta: Qidirilmoqda: salom
```

**Intervyuda shunday ayting:** "Debounce funksiyani hodisalar oqimi to'xtagandan keyin bir marta chaqiradi. Har chaqiruvda taymerni qayta boshlaydi. Qidiruv, oyna o'lchami o'zgarishi va avtosaqlashda ishlataman."

**Esda tuting:** debounce qilingan funksiyani har render'da qayta yaratmang (React'da `useMemo`/`useRef` bilan saqlang), aks holda taymer har safar yangi bo'lib, debounce ishlamaydi.

## Q9. Throttle nima va debounce'dan farqi? / What is throttle and how does it differ from debounce?

**Oddiy qilib aytganda:** throttle — svetofor: mashinalar qancha ko'p bo'lmasin, har 30 soniyada faqat bir marta yashil yonadi. Funksiya **ma'lum vaqt oralig'ida ko'pi bilan bir marta** ishlaydi. Debounce esa "hamma to'xtaguncha kut" deydi.

**Batafsilroq:**
- **Throttle** — muntazam yangilanish kerak bo'lganda: sahifani aylantirish (scroll) paytida progress chizig'i, sichqoncha harakati.
- **Debounce** — faqat oxirgi natija kerak bo'lganda: qidiruv, forma tekshiruvi.
- Mexanizm: oxirgi ishga tushgan vaqtni eslab qolamiz; interval o'tmagan bo'lsa, chaqiruvni o'tkazib yuboramiz.

**Misol:**

```js
function throttle(fn, intervalMs) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= intervalMs) {
      last = now;
      fn(...args);
    }
  };
}

const onScroll = throttle((y) => console.log("Scroll:", y), 1000);
for (let y = 0; y < 5; y++) onScroll(y); // faqat birinchisi: Scroll: 0
```

**Intervyuda shunday ayting:** "Throttle funksiyani belgilangan intervalda ko'pi bilan bir marta chaqiradi, debounce esa faqat hodisalar to'xtagach. Scroll va resize'da throttle, qidiruvda debounce ishlataman."

**Esda tuting:** oddiy throttle oxirgi chaqiruvni tashlab yuborishi mumkin. Oxirgi holat muhim bo'lsa, "trailing" chaqiruv qo'shiladi (lodash'ning `throttle`ida bor).

## Q10. Currying va partial application nima? / What are currying and partial application?

**Oddiy qilib aytganda:** kafe'dagi kofe buyurtmasi: avval hajm, keyin sut turi, keyin shakar — har bosqichda bitta tanlov. **Currying** — ko'p argumentli funksiyani bitta-bitta argument oladigan funksiyalar zanjiriga aylantirish. **Partial application** — ba'zi argumentlarni oldindan "mahkamlab" qo'yish.

**Batafsilroq:**
- Oddiy: `add(a, b, c)`. Curried: `add(a)(b)(c)`.
- Foydasi — tayyor "shablon" funksiyalar yasash: `const withTax = multiply(1.12)` — endi har narxga soliq qo'shadi.
- `fn.bind(null, x)` — partial application'ning o'rnatilgan usuli.

**Misol:**

```js
const curry = (fn) => function curried(...args) {
  return args.length >= fn.length ? fn(...args) : (...next) => curried(...args, ...next);
};

const price = (tax, discount, amount) => Math.round(amount * tax * (1 - discount));
const curriedPrice = curry(price);

const uzPrice = curriedPrice(1.12);        // soliq mahkamlandi
const sale = uzPrice(0.1);                 // chegirma mahkamlandi
console.log(sale(100_000));                // 100800
console.log(curriedPrice(1.12, 0, 50_000)); // 56000 — hammasi birdan ham mumkin

const withTax = price.bind(null, 1.12);    // partial application
console.log(withTax(0, 10_000));            // 11200
```

**Intervyuda shunday ayting:** "Currying n argumentli funksiyani bir argumentli funksiyalar zanjiriga aylantiradi. Partial application esa argumentlarning bir qismini oldindan beradi. Ikkalasi qayta ishlatiladigan, konfiguratsiya qilingan funksiyalar yasashga yordam beradi."

**Esda tuting:** `fn.length` default qiymatli va rest parametrlarni hisoblamaydi, shuning uchun universal `curry` bunday funksiyalarda noto'g'ri ishlaydi.

## Q11. Symbol nima va qachon ishlatiladi? / What is a Symbol and when is it used?

**Oddiy qilib aytganda:** Symbol — hech qachon takrorlanmaydigan **noyob kalit**. Ikkita odamning ismi bir xil bo'lishi mumkin, lekin pasport raqami hech qachon bir xil bo'lmaydi. `Symbol("id")` — xuddi shunday pasport raqami.

**Batafsilroq:**
- `Symbol("tavsif") !== Symbol("tavsif")` — har biri noyob.
- Obyektga Symbol kalit bilan xususiyat qo'shsangiz, u boshqa kutubxonalarning kalitlari bilan to'qnashmaydi va `for...in`, `Object.keys`, `JSON.stringify`da ko'rinmaydi.
- **Taniqli symbol'lar** (`Symbol.iterator`, `Symbol.asyncIterator`) — JavaScript'ning o'zi ishlatadigan maxsus kalitlar: masalan, obyektni `for...of` bilan aylanadigan qiladi (Q47 ga qarang).

**Misol:**

```js
const id = Symbol("id");
const user = { name: "Ali", [id]: 42 };

console.log(user[id]);            // 42
console.log(Object.keys(user));   // [ 'name' ] — Symbol ko'rinmaydi
console.log(JSON.stringify(user)); // {"name":"Ali"}
console.log(Symbol("id") === id); // false — har biri noyob
```

**Intervyuda shunday ayting:** "Symbol — noyob primitiv qiymat. U obyektlarga to'qnashmaydigan, oddiy aylanishda ko'rinmaydigan kalitlar qo'shish va til protokollarini (`Symbol.iterator`) amalga oshirish uchun ishlatiladi."

**Esda tuting:** Symbol kalit to'liq yashirin emas — `Object.getOwnPropertySymbols(obj)` ularni ko'rsatadi. Haqiqiy maxfiylik uchun `#private` maydonlardan foydalaning.

## Q12. Map va oddiy obyekt farqi nima? / How does Map differ from a plain object?

**Oddiy qilib aytganda:** oddiy obyekt — kalitlari faqat **matn** bo'lgan daftar. `Map` — kalit sifatida **istalgan narsani** (son, obyekt, funksiya) ishlatish mumkin bo'lgan maxsus lug'at, ustiga tartibni eslab qoladi va hajmini darhol aytadi.

**Batafsilroq:**

| | Oddiy obyekt `{}` | `Map` |
|---|---|---|
| Kalit turi | faqat string va Symbol | istalgan qiymat |
| Hajm | `Object.keys(obj).length` | `map.size` |
| Tartib | murakkab qoidalar | qo'shilgan tartibda |
| Tez-tez qo'shish/o'chirish | sekinroq | shu uchun mo'ljallangan |
| JSON'ga | to'g'ridan-to'g'ri | qo'lda aylantirish kerak |

**Misol:**

```js
const visits = new Map();
const userA = { name: "Ali" };
visits.set(userA, 3);          // obyekt — kalit
visits.set(42, "javob");       // son — kalit

console.log(visits.get(userA)); // 3
console.log(visits.size);       // 2

const plain = {};
plain[userA] = 3;
console.log(Object.keys(plain)); // [ '[object Object]' ] — obyekt matnga aylanib ketdi
```

**Intervyuda shunday ayting:** "Kalitlar oldindan noma'lum, tez-tez qo'shiladi yoki o'chiriladi yoki string bo'lmasa — `Map`. Aniq tuzilishli yozuv va JSON kerak bo'lsa — oddiy obyekt."

**Esda tuting:** foydalanuvchi kiritgan kalitlarni oddiy obyektga yozish xavfli (`__proto__` kaliti). `Map` bu muammodan xoli.

## Q13. Set va WeakSet nima? / What are Set and WeakSet?

**Oddiy qilib aytganda:** `Set` — **takrorlanmaydigan** narsalar ro'yxati, xuddi mehmonlar ro'yxati: bitta odamni ikki marta yozib bo'lmaydi. `WeakSet` — faqat obyektlarni saqlaydigan va obyekt boshqa joyda kerak bo'lmay qolsa, uni o'zi "unutadigan" ro'yxat.

**Batafsilroq:**
- `Set`: `add`, `has`, `delete`, `size`; istalgan qiymat; aylanib chiqish mumkin.
- Eng mashhur foydalanish — massivdan dublikatlarni olib tashlash: `[...new Set(arr)]`.
- ES2025 dan Set metodlari: `union`, `intersection`, `difference` va boshqalar.
- `WeakSet`: faqat obyektlar, aylanib bo'lmaydi, `size` yo'q. Foydasi: obyektni "belgilash" (masalan, "bu obyekt allaqachon qayta ishlangan"), xotirani ushlab qolmasdan.

**Misol:**

```js
const tags = ["js", "node", "js", "react", "node"];
console.log([...new Set(tags)]); // [ 'js', 'node', 'react' ]

const frontend = new Set(["js", "react"]);
const backend = new Set(["js", "node"]);
console.log([...frontend.intersection(backend)]); // [ 'js' ]

const processed = new WeakSet();
const order = { id: 1 };
processed.add(order);
console.log(processed.has(order)); // true
```

**Intervyuda shunday ayting:** "Set noyob qiymatlarni saqlaydi va `has` tekshiruvi tez. WeakSet faqat obyektlarni kuchsiz havola bilan saqlaydi — obyekt boshqa joyda ishlatilmasa, garbage collector uni tozalaydi, shuning uchun WeakSet aylanib chiqilmaydi."

**Esda tuting:** Set obyektlarni **havola** bo'yicha solishtiradi: `new Set([{a:1}, {a:1}]).size` — 2.

## Q14. WeakMap nima va xotira sizib chiqishiga qanday yordam beradi? / What is WeakMap and how does it help prevent memory leaks?

**Oddiy qilib aytganda:** `WeakMap` — obyektga "yopishtiriladigan qog'oz". Qog'oz obyektning o'zida emas, alohida saqlanadi, lekin obyekt yo'q bo'lsa, qog'oz ham avtomatik yo'qoladi. Oddiy `Map` esa obyektni "qo'lidan qo'yib yubormaydi" — xotira to'lib boradi.

**Batafsilroq:**
- **Garbage collector (GC)** — kerak bo'lmay qolgan obyektlarni xotiradan tozalaydigan mexanizm. Obyektga hech kim havola qilmasa, u tozalanadi.
- Oddiy `Map` kalitdagi obyektga **kuchli** havola saqlaydi — obyekt hech qachon tozalanmaydi.
- `WeakMap` kalitga **kuchsiz** havola saqlaydi — obyekt boshqa joyda kerak bo'lmasa, yozuv o'zi yo'qoladi.
- Cheklovlar: kalit faqat obyekt; aylanib chiqib bo'lmaydi; `size` yo'q.

**Misol:**

```js
const metadata = new WeakMap();

function track(element) {
  metadata.set(element, { clicks: 0, createdAt: Date.now() });
}

let button = { id: "save" };
track(button);
metadata.get(button).clicks++;
console.log(metadata.get(button).clicks); // 1

button = null; // endi obyektga hech kim havola qilmaydi — GC yozuvni ham tozalaydi
```

**Intervyuda shunday ayting:** "WeakMap kalit sifatida obyektni kuchsiz havola bilan saqlaydi. Obyekt boshqa joyda ishlatilmasa, u va unga bog'liq qiymat tozalanadi. DOM elementi yoki so'rov obyektiga qo'shimcha ma'lumot biriktirish va keshlash uchun ishlataman."

**Esda tuting:** GC qachon ishlashini bilib bo'lmaydi. WeakMap'dagi yozuv "darhol" yo'qolishiga tayanadigan mantiq yozmang.

## Q15. Generator funksiya va yield nima? / What are generator functions and yield?

**Oddiy qilib aytganda:** oddiy funksiya — butun kinoni birdan ko'rsatadigan pleer. Generator — **pauza tugmasi bor** pleer: `yield`da to'xtaydi, siz "keyingisi" (`next()`) desangiz, to'xtagan joyidan davom etadi.

**Batafsilroq:**
- `function*` bilan e'lon qilinadi.
- `yield qiymat` — qiymatni tashqariga beradi va funksiyani to'xtatadi.
- `next()` — `{ value, done }` qaytaradi; `done: true` bo'lsa, generator tugagan.
- Generator qiymatlarni **kerak bo'lganda** hisoblaydi — cheksiz ketma-ketlik ham xotirani to'ldirmaydi.
- Generator `for...of` bilan ishlaydi.

**Misol:**

```js
function* idGenerator() {
  let id = 1;
  while (true) yield id++; // cheksiz, lekin faqat so'ralganda hisoblaydi
}

const ids = idGenerator();
console.log(ids.next().value); // 1
console.log(ids.next().value); // 2

function* steps() {
  yield "Ro'yxatdan o'tish";
  yield "Emailni tasdiqlash";
  yield "Profilni to'ldirish";
}
for (const step of steps()) console.log(step);
```

**Intervyuda shunday ayting:** "Generator bajarilishni `yield`da to'xtatib, `next()` bilan davom ettiradigan funksiya. U iterator qaytaradi va qiymatlarni dangasa hisoblaydi. Cheksiz ketma-ketliklar, bosqichma-bosqich jarayonlar va katta ma'lumotni bo'laklab qayta ishlashda foydali."

**Esda tuting:** generatorni qayta boshlab bo'lmaydi — u tugagach, yangisini yaratish kerak: `idGenerator()` ni yana chaqiring.

## Q16. Proxy va Reflect nima? / What are Proxy and Reflect?

**Oddiy qilib aytganda:** Proxy — obyekt oldida turadigan **qo'riqchi**. Kimdir obyektdan biror narsa olmoqchi yoki unga yozmoqchi bo'lsa, avval qo'riqchi tekshiradi: ruxsat beradi, rad etadi yoki qiymatni o'zgartiradi. `Reflect` — qo'riqchi "odatiy ishni bajar" deganda ishlatadigan tayyor asboblar to'plami.

**Batafsilroq:**
- `new Proxy(target, handler)` — `handler`da "tuzoqlar" (trap) yoziladi: `get` (o'qish), `set` (yozish), `has` (`in` operatori), `deleteProperty` va boshqalar.
- `Reflect.get/set/...` — asl xatti-harakatni to'g'ri bajaradi.
- Qo'llanishi: validatsiya, log yozish, standart qiymat berish. Vue 3'ning reaktivlik tizimi Proxy asosida ishlaydi.

**Misol:**

```js
const user = new Proxy({ name: "Ali", age: 20 }, {
  get(target, key, receiver) {
    return key in target ? Reflect.get(target, key, receiver) : `"${String(key)}" yo'q`;
  },
  set(target, key, value, receiver) {
    if (key === "age" && (!Number.isInteger(value) || value < 0)) {
      throw new TypeError("Yosh musbat butun son bo'lishi kerak");
    }
    return Reflect.set(target, key, value, receiver);
  },
});

console.log(user.name);  // Ali
console.log(user.email); // "email" yo'q
try { user.age = -5; } catch (error) { console.log(error.message); }
```

**Intervyuda shunday ayting:** "Proxy obyektdagi asosiy amallarni — o'qish, yozish, o'chirish — ushlab olishga imkon beradi. Reflect shu amallarning standart bajarilishini beradi, shuning uchun trap ichida asl xatti-harakatni Reflect bilan chaqiraman. Validatsiya, reaktivlik va logging uchun ishlatiladi."

**Esda tuting:** Proxy har bir murojaatni sekinlashtiradi. Tez-tez ishlatiladigan "issiq" kodda ehtiyot bo'ling.

## Q17. Custom Event nima va uni qanday yuborasiz? / What is a CustomEvent and how do you dispatch it?

**Oddiy qilib aytganda:** brauzerda `click`, `input` kabi tayyor hodisalar bor. **Custom event** — o'zingiz o'ylab topgan hodisa, masalan "savatga mahsulot qo'shildi". Sahifaning bir qismi uni "e'lon qiladi", boshqa qismlari "eshitadi" — bir-birini bilishi shart emas.

**Batafsilroq:**
- `new CustomEvent("nom", { detail: ma'lumot, bubbles: true })` — hodisa yaratish; `detail` — ichidagi ma'lumot.
- `element.dispatchEvent(event)` — hodisani yuborish.
- `element.addEventListener("nom", handler)` — eshitish.
- `bubbles: true` — hodisa ota elementlarga ham ko'tariladi (Q28 ga qarang).
- `EventTarget` va `CustomEvent` Node.js'da ham mavjud.

**Misol:**

```js
const cart = new EventTarget();

cart.addEventListener("item-added", (event) => {
  console.log(`Savatga qo'shildi: ${event.detail.name}, ${event.detail.price} so'm`);
});

cart.dispatchEvent(new CustomEvent("item-added", { detail: { name: "Kitob", price: 45_000 } }));
```

**Intervyuda shunday ayting:** "CustomEvent o'z hodisalarimni yaratishga imkon beradi, ma'lumot `detail` orqali uzatiladi. Bu komponentlarni bir-biriga bog'lamasdan muloqot qildiradi. DOM'da `bubbles: true` bilan hodisa ota elementlarga ko'tariladi."

**Esda tuting:** `dispatchEvent` **sinxron** — barcha listener'lar u qaytishidan oldin bajariladi.

## Q18. MutationObserver nima? / What is MutationObserver?

**Oddiy qilib aytganda:** MutationObserver — sahifaning ma'lum qismiga qo'yilgan **kuzatuv kamerasi**. Kimdir u yerga yangi element qo'shsa, o'chirsa yoki matnni o'zgartirsa, kamera sizga xabar beradi.

**Batafsilroq:**
- Sahifani boshqa kod (masalan, tashqi reklama skripti yoki boshqa kutubxona) o'zgartirsa va siz bunga javob berishingiz kerak bo'lsa ishlatiladi.
- `observe(element, { childList, attributes, characterData, subtree })` — nimani kuzatishni tanlaysiz.
- O'zgarishlar **to'plab** yuboriladi (bitta callback'da bir nechta o'zgarish) — har bir o'zgarish uchun alohida chaqiruv emas, shuning uchun tez ishlaydi.
- Kerak bo'lmay qolganda `disconnect()`.

**Misol:**

```javascript
const list = document.querySelector("#messages");

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "childList") {
      console.log(`${mutation.addedNodes.length} ta yangi xabar qo'shildi`);
    }
  }
});

observer.observe(list, { childList: true });  // faqat bolalar qo'shilishi/o'chirilishi
// ... keyinroq:
observer.disconnect();
```

**Intervyuda shunday ayting:** "MutationObserver DOM o'zgarishlarini asinxron, to'plab xabar beradi. Men uni boshqa kod o'zgartiradigan DOM qismiga reaksiya qilish uchun ishlataman va kerak bo'lmay qolganda `disconnect` qilaman."

**Esda tuting:** callback ichida kuzatilayotgan elementni o'zgartirsangiz, cheksiz sikl hosil bo'lishi mumkin.

## Q19. IntersectionObserver nima va lazy loading'da qanday ishlatiladi? / What is IntersectionObserver and how is it used for lazy loading?

**Oddiy qilib aytganda:** IntersectionObserver — element **ekranda ko'ringan paytni** aytib beradigan yordamchi. Uzun sahifadagi rasmlarni hammasini birdan yuklamay, faqat foydalanuvchi ularga yetib kelganda yuklash mumkin — bu **lazy loading** (dangasa yuklash).

**Batafsilroq:**
- Eski usul — har scroll'da elementlar joylashuvini hisoblash: sekin va sahifani "qotiradi".
- IntersectionObserver buni brauzerning o'ziga topshiradi — samarali.
- `rootMargin: "200px"` — element ekranga 200px qolganda oldindan yuklash.
- `threshold` — elementning qancha qismi ko'ringanda xabar berish (0 dan 1 gacha).
- Oddiy rasmlar uchun hozir `<img loading="lazy">` atributi ham yetarli.

**Misol:**

```javascript
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const img = entry.target;
    img.src = img.dataset.src;     // haqiqiy rasmni endi yuklaymiz
    observer.unobserve(img);       // bir marta yetarli
  }
}, { rootMargin: "200px" });

document.querySelectorAll("img[data-src]").forEach((img) => observer.observe(img));
```

**Intervyuda shunday ayting:** "IntersectionObserver element ko'rinish maydoniga kirganini asinxron xabar beradi. Lazy loading, cheksiz scroll va reklama ko'rinishini hisoblashda ishlataman. U scroll hodisasida `getBoundingClientRect` chaqirishdan ancha samarali."

**Esda tuting:** yuklangan elementni `unobserve` qilishni unutmang, aks holda kuzatuv behuda davom etadi.

## Q20. ResizeObserver nima? / What is ResizeObserver?

**Oddiy qilib aytganda:** ResizeObserver — **elementning o'lchami** o'zgarganini aytadi. `window.resize` faqat butun oyna o'zgarganini biladi. Lekin element boshqa sabab bilan ham kattalashishi yoki kichrayishi mumkin — masalan, yon panel yopilganda.

**Batafsilroq:**
- Grafik, xarita yoki video pleer o'z konteyneri o'lchamiga moslashishi kerak bo'lganda ishlatiladi.
- Callback har bir element uchun yangi o'lchamni (`contentRect` yoki `contentBoxSize`) beradi.
- Oddiy joylashuv uchun ko'pincha CSS yetarli (`@container` so'rovlari). ResizeObserver JavaScript hisoblash kerak bo'lganda kerak.

**Misol:**

```javascript
const chart = document.querySelector("#chart");

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    redrawChart(width, height); // grafikni yangi o'lchamga chizish
  }
});

observer.observe(chart);
```

**Intervyuda shunday ayting:** "ResizeObserver alohida elementning o'lcham o'zgarishini kuzatadi, `window.resize`dan farqli. Men uni konteyner o'lchamiga bog'liq komponentlarda — grafiklar, virtual ro'yxatlar — ishlataman; oddiy moslashuv uchun CSS container query'larni afzal ko'raman."

**Esda tuting:** callback ichida kuzatilayotgan elementning o'lchamini o'zgartirish cheksiz siklga olib kelishi mumkin — brauzer bu haqda konsolda ogohlantiradi.

## Q21. Object.freeze va Object.seal farqi nima? / What is the difference between Object.freeze and Object.seal?

**Oddiy qilib aytganda:** `Object.seal` — **muhrlangan quti**: ichidagi narsalarni almashtirish mumkin, lekin yangi narsa qo'shib ham, olib ham bo'lmaydi. `Object.freeze` — **shisha vitrina**: umuman hech narsani o'zgartirib bo'lmaydi.

**Batafsilroq:**

| | Qo'shish | O'chirish | Qiymatni o'zgartirish |
|---|---|---|---|
| Oddiy obyekt | ✅ | ✅ | ✅ |
| `Object.seal` | ❌ | ❌ | ✅ |
| `Object.freeze` | ❌ | ❌ | ❌ |

- Ikkalasi ham **yuza** (shallow): ichki obyektlar muzlatilmaydi.
- Strict mode'da ruxsat etilmagan o'zgarish `TypeError` beradi; oddiy rejimda jimgina e'tiborsiz qoldiriladi.

**Misol:**

```js
"use strict";
const config = Object.freeze({ port: 3000, db: { host: "localhost" } });

try { config.port = 4000; } catch (error) { console.log(error.constructor.name); } // TypeError
config.db.host = "remote";       // ichki obyekt muzlatilmagan!
console.log(config.db.host);     // remote

const user = Object.seal({ name: "Ali" });
user.name = "Vali";              // mumkin
try { user.age = 20; } catch (error) { console.log("Yangi maydon qo'shib bo'lmaydi"); }
```

**Intervyuda shunday ayting:** "`seal` yangi maydon qo'shish va o'chirishni taqiqlaydi, lekin qiymatlarni o'zgartirishga ruxsat beradi. `freeze` qiymatlarni ham o'zgartirishni taqiqlaydi. Ikkalasi ham shallow, chuqur muzlatish uchun rekursiv funksiya kerak."

**Esda tuting:** `const` + `Object.freeze` ham ichki obyektlarni himoya qilmaydi. Butunlay o'zgarmas konfiguratsiya uchun "deep freeze" yozing.

## Q22. ES modullar (import/export) va CommonJS (require) farqi nima? / What is the difference between ES modules and CommonJS?

**Oddiy qilib aytganda:** ikkalasi ham kodni fayllarga bo'lib, bir-biriga ulash usuli. **CommonJS** (`require`) — Node.js'ning eski, o'z usuli. **ES modullar** (`import/export`) — JavaScript tilining rasmiy standarti, brauzerda ham, Node.js'da ham ishlaydi.

**Batafsilroq:**

| | CommonJS | ES Modules |
|---|---|---|
| Sintaksis | `require()`, `module.exports` | `import`, `export` |
| Yuklanish | sinxron, bajarilish paytida | oldindan tahlil qilinadi (statik) |
| Top-level `await` | yo'q | bor |
| Tree-shaking | qiyin | oson (ishlatilmagan kod olib tashlanadi) |
| Node.js'da | `.cjs` yoki `"type": "commonjs"` | `.mjs` yoki `"type": "module"` |

- **Tree-shaking** — build vositasi (Vite, Rollup) ishlatilmagan funksiyalarni yakuniy fayldan olib tashlashi. ESM statik bo'lgani uchun buni qila oladi.
- Node.js 22.12+ dan CommonJS kod ES modulni `require()` qila oladi (agar modulda top-level `await` bo'lmasa).

**Misol:**

```javascript
// math.mjs
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// app.mjs
import multiply, { add } from "./math.mjs";
console.log(add(2, 3), multiply(2, 3));

// CommonJS'da xuddi shu:
// const { add } = require("./math.cjs");
```

**Intervyuda shunday ayting:** "ESM — standart, statik tahlil qilinadigan modul tizimi: tree-shaking va top-level await beradi. CommonJS — Node'ning sinxron `require` tizimi. Yangi loyihalarda ESM ishlataman; Node'da `package.json`dagi `"type"` maydoni rejimni belgilaydi."

**Esda tuting:** ESM'da `__dirname` va `__filename` yo'q — ularning o'rniga `import.meta.dirname` va `import.meta.filename` (Node 20.11+).

## Q23. ?? va || operatorlari farqi nima? / What is the difference between ?? and ||?

**Oddiy qilib aytganda:** ikkalasi ham "qiymat bo'lmasa, standart qiymatni ol" deydi. Farqi — "bo'lmasa" nimani anglatishida. `||` **har qanday "yolg'on"** qiymatni (`0`, `""`, `false`) yo'q deb hisoblaydi. `??` faqat **haqiqatan yo'q** narsani — `null` yoki `undefined` — hisobga oladi.

**Batafsilroq:**
- **Falsy qiymatlar** — `if` ichida `false` bo'ladiganlar: `false`, `0`, `""`, `null`, `undefined`, `NaN`.
- `volume || 50` — foydalanuvchi ovozni ataylab `0` qilgan bo'lsa ham `50` qaytaradi — bu xato!
- `volume ?? 50` — `0` saqlanadi, faqat qiymat umuman yo'q bo'lsa `50`.

**Misol:**

```js
const settings = { volume: 0, nickname: "", theme: undefined };

console.log(settings.volume || 50);       // 50 — noto'g'ri, foydalanuvchi 0 tanlagan edi
console.log(settings.volume ?? 50);       // 0  — to'g'ri
console.log(settings.nickname ?? "Mehmon"); // "" — bo'sh satr saqlandi
console.log(settings.theme ?? "light");   // light — haqiqatan yo'q edi
```

**Intervyuda shunday ayting:** "`||` istalgan falsy qiymatda o'ng tomonni qaytaradi, `??` esa faqat `null` yoki `undefined`da. Standart qiymat berishda, `0` yoki bo'sh satr haqiqiy qiymat bo'lishi mumkin bo'lsa, `??` ishlataman."

**Esda tuting:** `??`ni `||` yoki `&&` bilan qavssiz aralashtirib bo'lmaydi: `a || b ?? c` — sintaksis xatosi. Qavs qo'ying.

## Q24. Optional chaining (?.) nima? / What is optional chaining (?.)?

**Oddiy qilib aytganda:** `?.` — "agar bor bo'lsa, ichiga kir" degani. Uyning 3-qavatidagi xonaga borishdan oldin, avval uy borligini, keyin 3-qavat borligini tekshirasiz. `?.` buni avtomatik qiladi: biror bosqich yo'q bo'lsa, xato bermasdan `undefined` qaytaradi.

**Batafsilroq:**
- `user.address.city` — `address` yo'q bo'lsa: `TypeError: Cannot read properties of undefined`.
- `user.address?.city` — `address` yo'q bo'lsa: `undefined`, xato yo'q.
- Metodlarda: `user.getName?.()` — metod bo'lsa chaqiradi.
- Massivda: `list?.[0]`.
- Ko'pincha `??` bilan birga: `user.address?.city ?? "Noma'lum"`.

**Misol:**

```js
const users = [
  { name: "Ali", address: { city: "Toshkent" } },
  { name: "Vali" },
];

for (const user of users) {
  console.log(user.name, user.address?.city ?? "shahar ko'rsatilmagan");
}
// Ali Toshkent
// Vali shahar ko'rsatilmagan

console.log(users[5]?.name);       // undefined — xato emas
console.log(users[0].greet?.());   // undefined — metod yo'q, lekin xato yo'q
```

**Intervyuda shunday ayting:** "Optional chaining zanjirdagi biror qiymat `null` yoki `undefined` bo'lsa, xato o'rniga `undefined` qaytaradi. API'dan kelgan ixtiyoriy maydonlar bilan ishlashda qulay; standart qiymat uchun `??` bilan birga ishlataman."

**Esda tuting:** `?.`ni hamma joyga qo'yib chiqmang — agar qiymat bo'lishi **shart** bo'lsa, xato darhol ko'rinib turgani yaxshiroq. `?.` xatolarni yashirib qo'yishi mumkin.

## Q25. reduce qanday ishlaydi va nimalar uchun qulay? / How does reduce work and what is it good for?

**Oddiy qilib aytganda:** `reduce` — cho'ntagiga tanga yig'ib boradigan odam. Ro'yxatdagi har bir elementni birma-bir ko'radi va "yig'indi"ga (accumulator) qo'shib boradi. Oxirida bitta natija qaytaradi: son, obyekt yoki boshqa massiv.

**Batafsilroq:**
- `array.reduce((jamg'arma, element) => yangiJamg'arma, boshlang'ichQiymat)`.
- Har qadamda callback qaytargan qiymat keyingi qadamdagi `jamg'arma` bo'ladi.
- Boshlang'ich qiymatni **har doim bering** — bo'sh massivda u bo'lmasa, `TypeError` chiqadi.
- Qo'llanishi: yig'indi, guruhlash, massivni obyektga aylantirish, sanash.

**Misol:**

```js
const orders = [
  { product: "kitob", price: 45_000, category: "ta'lim" },
  { product: "ruchka", price: 5_000, category: "ta'lim" },
  { product: "choy", price: 20_000, category: "oziq-ovqat" },
];

const total = orders.reduce((sum, order) => sum + order.price, 0);
console.log(total); // 70000

const byCategory = orders.reduce((groups, order) => {
  (groups[order.category] ??= []).push(order.product);
  return groups;
}, {});
console.log(byCategory); // { "ta'lim": ['kitob','ruchka'], 'oziq-ovqat': ['choy'] }
```

**Intervyuda shunday ayting:** "`reduce` massivni bitta qiymatga yig'adi: har qadamda callback yangi accumulator qaytaradi. Men uni yig'indi, guruhlash va indeks yaratishda ishlataman, har doim boshlang'ich qiymat bilan. Oddiy guruhlash uchun endi `Object.groupBy` ham bor."

**Esda tuting:** agar `reduce` ichidagi mantiq o'qish uchun qiyin bo'lsa, oddiy `for...of` sikli ko'pincha tushunarliroq. Kod qisqa emas, **aniq** bo'lishi kerak.

## Q26. Strict mode nima va u nimalarni taqiqlaydi? / What is strict mode and what does it forbid?

**Oddiy qilib aytganda:** strict mode — JavaScript'ning "qat'iy o'qituvchi" rejimi. Oddiy rejimda til ko'p xatolarga ko'z yumadi va jimgina davom etadi. Strict mode'da esa u xatoni darhol ko'rsatadi — shu tufayli xatolar erta topiladi.

**Batafsilroq:**
- Yoqish: fayl yoki funksiya boshida `"use strict";`. **ES modullar va `class` ichida u avtomatik yoqilgan.**
- Nimalarni taqiqlaydi:
  1. e'lon qilinmagan o'zgaruvchiga yozish (`x = 5` — global o'zgaruvchi yaratib qo'ymaydi, xato beradi);
  2. faqat o'qiladigan xususiyatga yozish (xato beradi, jim o'tmaydi);
  3. bir xil nomli parametrlar: `function f(a, a) {}`;
  4. `with` operatori.
- Oddiy funksiya chaqiruvida `this` global obyekt emas, `undefined` bo'ladi.

**Misol:**

```js
"use strict";
function save() {
  try {
    total = 100; // xato yozilgan nom — oddiy rejimda global o'zgaruvchi yaratib qo'yardi
  } catch (error) {
    console.log(error.name, "-", error.message); // ReferenceError - total is not defined
  }
}
save();
console.log(typeof globalThis.total); // undefined — global muhit toza qoldi
```

**Intervyuda shunday ayting:** "Strict mode jim xatolarni haqiqiy xatolarga aylantiradi: e'lon qilinmagan o'zgaruvchiga yozish, faqat o'qiladigan xususiyatni o'zgartirish va boshqalar. ES modullar va klasslar avtomatik strict, shuning uchun zamonaviy kodda u deyarli har doim yoqilgan."

**Esda tuting:** eski skriptni strict mode'ga o'tkazganda `this` o'zgarishi mumkin — oddiy funksiyada `this` endi `undefined`.

## Q27. call, apply va bind farqi nima? / What is the difference between call, apply and bind?

**Oddiy qilib aytganda:** uchalasi ham funksiyaga "`this` kim bo'lishini" aytadi (Q4 ga qarang). Farqi: `call` va `apply` funksiyani **darhol** chaqiradi, `bind` esa `this` mahkamlangan **yangi funksiya** qaytaradi — uni keyinroq chaqirasiz.

**Batafsilroq:**
- `fn.call(thisObj, a, b)` — argumentlar vergul bilan.
- `fn.apply(thisObj, [a, b])` — argumentlar massivda (eslab qolish uchun: **a**pply — **a**rray).
- `fn.bind(thisObj, a)` — yangi funksiya; `this` va berilgan argumentlar mahkamlanadi.
- Zamonaviy kodda `apply` o'rniga ko'pincha spread ishlatiladi: `fn.call(obj, ...args)`.

**Misol:**

```js
function introduce(greeting, punctuation) {
  return `${greeting}, men ${this.name}${punctuation}`;
}
const ali = { name: "Ali" };

console.log(introduce.call(ali, "Salom", "!"));    // Salom, men Ali!
console.log(introduce.apply(ali, ["Assalomu alaykum", "."]));

const aliSays = introduce.bind(ali, "Hey");        // this va birinchi argument mahkamlandi
console.log(aliSays("?"));                          // Hey, men Ali?
```

**Intervyuda shunday ayting:** "`call` va `apply` funksiyani berilgan `this` bilan darhol chaqiradi: `call` argumentlarni ro'yxat, `apply` massiv sifatida oladi. `bind` `this` va ixtiyoriy argumentlarni mahkamlab, yangi funksiya qaytaradi — callback sifatida uzatish uchun qulay."

**Esda tuting:** arrow funksiyaning `this`ini `call`/`bind` bilan o'zgartirib bo'lmaydi — u leksik.

## Q28. Event bubbling va capturing nima? / What are event bubbling and event capturing?

**Oddiy qilib aytganda:** stakanga tosh tashlaganingizda to'lqin tashqariga tarqaladi. Tugmani bosganingizda ham hodisa **tugmadan boshlab** uning ota elementlariga — `div`, `body`, `document`gacha — ko'tariladi. Bu **bubbling** (pufakchadek ko'tarilish). **Capturing** — teskari yo'nalish: hodisa avval tepadan pastga, tugmagacha tushadi.

**Batafsilroq:**
- Hodisa uch bosqichdan o'tadi: 1) **capturing** (tepadan pastga), 2) **target** (bosilgan elementning o'zi), 3) **bubbling** (pastdan tepaga).
- `addEventListener("click", fn)` — default holatda bubbling bosqichida ishlaydi.
- `addEventListener("click", fn, { capture: true })` — capturing bosqichida.
- `event.stopPropagation()` — hodisaning keyingi elementlarga o'tishini to'xtatadi.
- `event.target` — hodisa aynan qayerda bo'lgan; `event.currentTarget` — listener qaysi elementga qo'yilgan.

**Misol:**

```javascript
// <div id="card"><button id="buy">Sotib olish</button></div>
document.querySelector("#card").addEventListener("click", () => console.log("2: karta (bubbling)"));
document.querySelector("#card").addEventListener("click", () => console.log("0: karta (capturing)"), { capture: true });
document.querySelector("#buy").addEventListener("click", () => console.log("1: tugma"));
// Tugma bosilganda: 0: karta (capturing) → 1: tugma → 2: karta (bubbling)
```

**Intervyuda shunday ayting:** "DOM hodisasi capturing, target va bubbling bosqichlaridan o'tadi. Listener'lar default bubbling'da ishlaydi. Bubbling tufayli event delegation mumkin; `stopPropagation` bilan uzatishni to'xtatish mumkin, lekin uni kam ishlataman, chunki boshqa kod kutgan hodisalarni buzadi."

**Esda tuting:** `focus`, `blur` kabi ba'zi hodisalar bubbling qilmaydi. Ularning bubbling qiladigan versiyalari bor: `focusin`, `focusout`.

## Q29. Event delegation nima? / What is event delegation?

**Oddiy qilib aytganda:** maktabda har bir o'quvchiga alohida qo'riqchi qo'yish o'rniga, bitta qo'riqchi **eshik oldida** turadi va kim chiqayotganini tekshiradi. Event delegation ham shunday: har bir tugmaga alohida listener o'rniga, ularning **umumiy otasiga** bitta listener qo'yiladi. Bubbling (Q28) tufayli hodisa baribir otaga yetib keladi.

**Batafsilroq:**
- 1000 ta ro'yxat elementiga 1000 ta listener — xotira isrofi. Bitta listener — yetarli.
- Keyinroq qo'shilgan elementlar ham avtomatik ishlaydi — ularga alohida listener qo'shish shart emas.
- Qaysi element bosilganini `event.target.closest("selector")` bilan aniqlaysiz.

**Misol:**

```javascript
// <ul id="todos"><li data-id="1">Non olish <button class="delete">x</button></li> ...</ul>
document.querySelector("#todos").addEventListener("click", (event) => {
  const button = event.target.closest("button.delete");
  if (!button) return;                            // o'chirish tugmasi bosilmagan
  const item = button.closest("li");
  console.log("O'chirilsin:", item.dataset.id);
  item.remove();
});
```

**Intervyuda shunday ayting:** "Event delegation — ko'p bolalar uchun bitta listener'ni umumiy ota elementga qo'yish. Bubbling tufayli hodisa otaga yetadi, `event.target.closest()` bilan kerakli element aniqlanadi. Bu xotirani tejaydi va dinamik qo'shilgan elementlarda ham ishlaydi."

**Esda tuting:** `event.target` tugma ichidagi ikonka (`<svg>`) bo'lishi mumkin — shuning uchun `target.matches` emas, `target.closest` ishlating.

## Q30. JavaScript'da xotira sizib chiqishi (memory leak) nima? / What is a memory leak in JavaScript?

**Oddiy qilib aytganda:** garbage collector (GC) — uydagi farrosh: hech kim ishlatmayotgan narsalarni olib tashlaydi. Lekin agar narsaga kimdir hali ham **qo'lini tegizib turgan** bo'lsa (havola bor bo'lsa), farrosh uni tegmaydi. Memory leak — kerak bo'lmagan narsani **unutib qoldirilgan havola** ushlab turishi. Natijada xotira asta-sekin to'lib boradi.

**Batafsilroq:**
- GC ishlash tamoyili — **mark-and-sweep**: "ildiz"lardan (global o'zgaruvchilar, stack) boshlab yetib boriladigan obyektlarni belgilaydi, qolganlarini o'chiradi (Q76 ga qarang).
- Keng tarqalgan sabablar:
  1. o'chirilmagan `setInterval` yoki event listener;
  2. cheklovsiz o'sadigan kesh (`Map`ga yozib, hech qachon o'chirmaslik);
  3. sahifadan olib tashlangan, lekin JS o'zgaruvchisida saqlanib qolgan DOM elementlari (Q91);
  4. katta ma'lumotni ushlab qolgan closure.

**Misol:**

```js
const cache = new Map();
function getUser(id) {
  if (!cache.has(id)) cache.set(id, { id, loadedAt: Date.now() }); // hech qachon o'chirilmaydi!
  return cache.get(id);
}
for (let id = 0; id < 100_000; id++) getUser(id);
console.log(`Keshda: ${cache.size} ta yozuv`); // o'sishda davom etadi — LRU yoki TTL kerak

const timer = setInterval(() => {}, 1_000);
clearInterval(timer); // listener va taymerlarni har doim tozalang
```

**Intervyuda shunday ayting:** "Memory leak — keraksiz obyektga havola qolib, GC uni tozalay olmasligi. Tipik sabablar: tozalanmagan taymer va listener'lar, chegarasiz kesh, detached DOM va closure'lar. Chrome DevTools'dagi heap snapshot'larni solishtirib, obyektni kim ushlab turganini (retainers) topaman."

**Esda tuting:** React'da `useEffect` ichida qo'shilgan listener yoki taymerni cleanup funksiyasida olib tashlash shart.

## Q31. Primitiv va reference turlar farqi nima? / What is the difference between primitive and reference types?

**Oddiy qilib aytganda:** primitiv qiymat — **qog'ozga yozilgan son**: nusxa olsangiz, ikkinchi qog'ozdagi sonni o'zgartirish birinchisiga ta'sir qilmaydi. Obyekt esa — **uyning manzili**: manzilni nusxalash uyni nusxalamaydi. Ikkala qog'oz ham **bitta uyga** olib boradi; biri uyni bo'yasa, ikkinchisi ham bo'yalgan uyni ko'radi.

**Batafsilroq:**
- **Primitivlar** (7 ta): `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`. Ular o'zgarmas va **qiymati** bo'yicha nusxalanadi.
- **Reference turlar**: obyekt, massiv, funksiya, `Map`, `Date`... O'zgaruvchida obyektning o'zi emas, unga **havola** saqlanadi.
- `===` obyektlarni havola bo'yicha solishtiradi: ikki xil, lekin bir xil ko'rinishdagi obyekt teng emas.
- Funksiyaga obyekt berilsa, funksiya uni o'zgartirishi mumkin — chaqiruvchi ham o'zgarishni ko'radi.

**Misol:**

```js
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 — primitiv nusxalandi

const user1 = { name: "Ali" };
const user2 = user1;           // havola nusxalandi, obyekt emas
user2.name = "Vali";
console.log(user1.name);       // Vali — bitta obyekt!

console.log({ x: 1 } === { x: 1 }); // false — ikki xil obyekt
```

**Intervyuda shunday ayting:** "Primitivlar qiymat bo'yicha saqlanadi va nusxalanadi, obyektlar esa havola bo'yicha. Shuning uchun obyektni boshqa o'zgaruvchiga berish nusxa yaratmaydi va `===` obyektlarni tarkibi bo'yicha emas, havola bo'yicha solishtiradi."

**Esda tuting:** `typeof null` — `"object"`. Bu JavaScript'ning eski xatosi; `null` aslida primitiv.

## Q32. BigInt nima va qachon kerak? / What is BigInt and when do you need it?

**Oddiy qilib aytganda:** oddiy `number` juda katta butun sonlarni aniq saqlay olmaydi — taxminan 9 kvadrilliondan (2⁵³ − 1) keyin "yaxlitlab" yuboradi. `BigInt` — istalgan kattalikdagi butun sonni **aniq** saqlaydigan maxsus tur.

**Batafsilroq:**
- Yozilishi: son oxiriga `n` — `123n`, yoki `BigInt("123")`.
- `Number.MAX_SAFE_INTEGER` = 9007199254740991 — `number` aniq saqlaydigan eng katta butun son.
- `BigInt` va `number`ni aralashtirib bo'lmaydi: `1n + 1` — `TypeError`. Aniq aylantiring.
- BigInt bo'lishda kasr qismni tashlab yuboradi: `7n / 2n` = `3n`.
- Qo'llanishi: katta ID'lar (Twitter, Telegram), kriptografiya, aniq moliyaviy hisoblar (tiyinlarda).

**Misol:**

```js
console.log(Number.MAX_SAFE_INTEGER);       // 9007199254740991
console.log(9007199254740993);               // 9007199254740992 — aniqlik yo'qoldi!
console.log(9007199254740993n);              // 9007199254740993n — aniq

const big = 2n ** 64n;
console.log(big.toString());                 // 18446744073709551616
console.log(7n / 2n);                        // 3n — kasr tashlanadi
try { console.log(1n + 1); } catch (error) { console.log(error.name); } // TypeError
```

**Intervyuda shunday ayting:** "BigInt ixtiyoriy aniqlikdagi butun sonlar uchun: `Number.MAX_SAFE_INTEGER`dan katta ID yoki summalarni aniq saqlaydi. Uni `number` bilan aralashtirib bo'lmaydi va `JSON.stringify` uni to'g'ridan-to'g'ri qo'llamaydi — satrga aylantirib yuboraman."

**Esda tuting:** `JSON.stringify({ id: 1n })` — `TypeError`. Serverga katta ID'larni satr sifatida yuboring.

## Q33. NaN nima va uni qanday tekshirasiz? / What is NaN and how do you check for it?

**Oddiy qilib aytganda:** `NaN` — "Not a Number", ya'ni "son chiqmadi" degan belgi. Masalan, "olma"ni 2 ga bo'lsangiz. G'alati tomoni: `NaN` hatto **o'ziga ham teng emas**. Shuning uchun uni `===` bilan tekshirib bo'lmaydi.

**Batafsilroq:**
- Qachon paydo bo'ladi: `Number("abc")`, `0 / 0`, `Math.sqrt(-1)`, `undefined + 1`.
- `NaN === NaN` → `false`.
- To'g'ri tekshiruv: `Number.isNaN(x)` — faqat haqiqiy `NaN` uchun `true`.
- Eski global `isNaN(x)` avval qiymatni songa aylantiradi: `isNaN("salom")` → `true` — chalg'itadi.
- `typeof NaN` → `"number"`.

**Misol:**

```js
const price = Number("12 000"); // bo'sh joy bor — son chiqmaydi
console.log(price);                       // NaN
console.log(price === NaN);               // false — hech qachon ishlamaydi
console.log(Number.isNaN(price));         // true — to'g'ri usul
console.log(isNaN("salom"), Number.isNaN("salom")); // true false
console.log(Object.is(price, NaN));       // true
```

**Intervyuda shunday ayting:** "`NaN` noto'g'ri raqamli amal natijasi va o'ziga teng bo'lmagan yagona qiymat. Uni `Number.isNaN` bilan tekshiraman, chunki global `isNaN` avval tur o'zgartiradi va satrlar uchun ham `true` qaytaradi."

**Esda tuting:** foydalanuvchi kiritgan sonni tekshirishda `Number.isFinite(x)` qulay — u `NaN` va `Infinity`ni ham rad etadi.

## Q34. Object.keys, Object.values va Object.entries nima qaytaradi? / What do Object.keys, Object.values and Object.entries return?

**Oddiy qilib aytganda:** obyekt — "kalit: qiymat" juftliklari. Bu uchta metod uni massivga aylantiradi: `keys` — faqat kalitlar, `values` — faqat qiymatlar, `entries` — `[kalit, qiymat]` juftliklari. Massivga aylangach, `map`, `filter` kabi metodlarni ishlatish mumkin.

**Batafsilroq:**
- Faqat obyektning **o'z** va **sanaladigan** (enumerable) xususiyatlari qaytadi; prototipdagilari emas.
- `Object.fromEntries(juftliklar)` — teskari amal: juftliklar massividan obyekt yasaydi.
- `entries` + `map` + `fromEntries` — obyekt qiymatlarini o'zgartirishning qulay usuli.

**Misol:**

```js
const prices = { olma: 12_000, non: 4_000, sut: 11_000 };

console.log(Object.keys(prices));    // [ 'olma', 'non', 'sut' ]
console.log(Object.values(prices));  // [ 12000, 4000, 11000 ]
console.log(Object.entries(prices)); // [ ['olma', 12000], ['non', 4000], ['sut', 11000] ]

const withDiscount = Object.fromEntries(
  Object.entries(prices).map(([name, price]) => [name, price * 0.9]),
);
console.log(withDiscount); // { olma: 10800, non: 3600, sut: 9900 }
```

**Intervyuda shunday ayting:** "`keys`, `values`, `entries` obyektning o'z enumerable xususiyatlarini massiv qilib beradi. Obyektni o'zgartirishda `entries` → `map` → `fromEntries` naqshidan foydalanaman."

**Esda tuting:** son ko'rinishidagi kalitlar ("1", "2") har doim o'sish tartibida birinchi keladi — obyekt kalitlari tartibiga tayanmang, tartib muhim bo'lsa `Map` ishlating.

## Q35. Tagged template literal nima? / What is a tagged template literal?

**Oddiy qilib aytganda:** oddiy template literal — `` `Salom, ${name}` `` — matnga qiymat qo'yadi. **Tagged** versiyada backtick oldiga funksiya nomi yoziladi. U funksiya matnni **qismlarga ajratilgan holda** oladi va natijani o'zi yig'adi: masalan, xavfli belgilarni tozalaydi yoki SQL so'rovni xavfsiz qiladi.

**Batafsilroq:**
- `` tag`matn ${a} yana ${b}` `` → `tag(["matn ", " yana ", ""], a, b)`.
- Birinchi argument — statik matn bo'laklari, qolganlari — qo'yilgan qiymatlar.
- Qo'llanishi: HTML'ni xavfsizlashtirish, SQL so'rovlarida parametrlarni alohida uzatish (SQL injection'dan himoya), styled-components'dagi CSS, `String.raw`.

**Misol:**

```js
function safeHtml(strings, ...values) {
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
  return strings.reduce((result, text, index) => result + text + (index < values.length ? escape(values[index]) : ""), "");
}

const comment = '<script>alert("xak")</script>';
console.log(safeHtml`<p>Izoh: ${comment}</p>`);
// <p>Izoh: &#60;script&#62;alert(&#34;xak&#34;)&#60;/script&#62;</p>

console.log(String.raw`C:\yangi\papka`); // C:\yangi\papka — \y va \p escape qilinmaydi
```

**Intervyuda shunday ayting:** "Tagged template'da funksiya statik matn bo'laklari va qo'yilgan qiymatlarni alohida oladi. Bu qiymatlarni xavfsiz qayta ishlash imkonini beradi: HTML escape, parametrlangan SQL, CSS-in-JS."

**Esda tuting:** foydalanuvchi ma'lumotini SQL'ga oddiy template literal bilan qo'shmang (`` `WHERE name='${x}'` ``) — bu SQL injection. Parametrlangan so'rov ishlating.

## Q36. Rest parametrlari va arguments obyekti farqi nima? / What is the difference between rest parameters and the arguments object?

**Oddiy qilib aytganda:** funksiyaga nechta argument kelishini oldindan bilmasangiz, ularni bitta "savat"ga yig'ish kerak. Eski savat — `arguments`: massivga o'xshaydi, lekin massiv emas. Yangi savat — **rest parametr** `...args`: haqiqiy massiv, barcha massiv metodlari ishlaydi.

**Batafsilroq:**
- `function sum(...numbers)` — `numbers` haqiqiy `Array`.
- `arguments` — "massivga o'xshash" obyekt: `length` bor, lekin `map`, `reduce` yo'q.
- Arrow funksiyalarda `arguments` **yo'q**.
- Rest parametr faqat **oxirgi** parametr bo'lishi mumkin: `function f(first, ...rest)`.

**Misol:**

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

function oldStyle() {
  console.log(Array.isArray(arguments)); // false
  return Array.from(arguments).join("-");
}
console.log(oldStyle("a", "b", "c")); // a-b-c

const log = (level, ...messages) => console.log(`[${level}]`, ...messages);
log("INFO", "Server", "ishga tushdi"); // [INFO] Server ishga tushdi
```

**Intervyuda shunday ayting:** "Rest parametr qolgan argumentlarni haqiqiy massivga yig'adi va arrow funksiyalarda ham ishlaydi. `arguments` eski, massivga o'xshash obyekt, arrow funksiyalarda mavjud emas. Yangi kodda har doim rest parametr ishlataman."

**Esda tuting:** rest (`...args` parametrlarda) va spread (`...arr` chaqiruvda) — bir xil yozilishi, lekin teskari ish qiladi: biri yig'adi, ikkinchisi yoyadi.

## Q37. Spread operatori nima qiladi? / What does the spread operator do?

**Oddiy qilib aytganda:** spread (`...`) — qutini **ochib, ichidagilarni to'kib yuborish**. Massiv yoki obyekt ichidagi elementlarni boshqa massiv, obyekt yoki funksiya chaqiruviga birma-bir "yoyib" qo'yadi.

**Batafsilroq:**
- Massivlarni birlashtirish: `[...a, ...b]`.
- Nusxa olish: `[...arr]`, `{ ...obj }` — lekin **shallow** (Q6 ga qarang).
- Obyektlarni birlashtirish: `{ ...defaults, ...userSettings }` — keyingi obyekt oldingisidagi bir xil kalitni **ustiga yozadi**.
- Funksiyaga argument sifatida: `Math.max(...numbers)`.
- Satrni harflarga ajratish: `[..."salom"]`.

**Misol:**

```js
const defaults = { theme: "light", fontSize: 15, language: "uz" };
const userSettings = { theme: "dark" };
console.log({ ...defaults, ...userSettings }); // { theme: 'dark', fontSize: 15, language: 'uz' }

const scores = [7, 10, 4];
console.log(Math.max(...scores)); // 10

const cart = ["non"];
const newCart = [...cart, "sut"];  // asl massiv o'zgarmaydi
console.log(cart, newCart);        // [ 'non' ] [ 'non', 'sut' ]
console.log([..."salom"]);         // [ 's', 'a', 'l', 'o', 'm' ]
```

**Intervyuda shunday ayting:** "Spread iterable yoki obyektni elementlarga yoyadi: massiv/obyekt birlashtirish, shallow nusxa va argument uzatish uchun. Obyekt spread'ida keyingi xususiyatlar oldingilarini ustiga yozadi. React'da holatni o'zgartirmasdan yangilashda asosiy vosita."

**Esda tuting:** juda katta massivni `Math.max(...arr)` bilan uzatish stack chegarasidan oshishi mumkin (yuz minglab elementda). Bunday holda `reduce` ishlating.

## Q38. Destructuring va default qiymatlar qanday ishlaydi? / How do destructuring and default values work?

**Oddiy qilib aytganda:** destructuring — sovg'a qutisidan kerakli narsalarni **bitta harakatda** olib, har birini alohida cho'ntakka solish. `const { name, age } = user` — "user'dan name va age'ni ol". Agar qutida biror narsa bo'lmasa, default qiymat ishlatiladi.

**Batafsilroq:**
- Obyektdan: `const { name, age = 18 } = user` — `age` yo'q bo'lsa, `18`.
- Nomini o'zgartirish: `const { name: fullName } = user`.
- Massivdan: `const [first, second] = list` — tartib bo'yicha.
- Qolganini yig'ish: `const { password, ...safeUser } = user`.
- Funksiya parametrlarida — ayniqsa qulay: `function connect({ host = "localhost", port = 5432 } = {})`.
- Default qiymat faqat qiymat **`undefined`** bo'lganda ishlaydi; `null` bo'lsa ishlamaydi.

**Misol:**

```js
const user = { name: "Ali", password: "secret", role: undefined };

const { name: fullName, role = "o'quvchi", ...rest } = user;
console.log(fullName, role, rest); // Ali o'quvchi { password: 'secret' }

const { password, ...safeUser } = user; // parolni olib tashlab yuborish
console.log(safeUser);                   // { name: 'Ali', role: undefined }

function connect({ host = "localhost", port = 5432 } = {}) {
  return `${host}:${port}`;
}
console.log(connect(), connect({ port: 6379 })); // localhost:5432 localhost:6379

const [first, , third = "yo'q"] = ["a", "b"];
console.log(first, third); // a yo'q
```

**Intervyuda shunday ayting:** "Destructuring obyekt yoki massivdan qiymatlarni o'zgaruvchilarga ajratadi, default qiymat faqat `undefined`da ishlaydi. Funksiya parametrlarida sozlamalar obyektini destructuring qilaman, default `= {}` bilan, shunda argumentsiz chaqiruv ham ishlaydi."

**Esda tuting:** `const { a } = null` — `TypeError`. API javobi `null` bo'lishi mumkin bo'lsa, avval tekshiring yoki `?? {}` qo'shing.

## Q39. flat va flatMap nima? / What are flat and flatMap?

**Oddiy qilib aytganda:** `flat` — ichma-ich qutilarni ochib, hamma narsani **bitta tekis qatorga** terish. `[[1, 2], [3]]` → `[1, 2, 3]`. `flatMap` — avval har bir elementni o'zgartirib (`map`), keyin natijani bir qavat tekislash.

**Batafsilroq:**
- `arr.flat()` — bir qavat ochadi; `arr.flat(2)` — ikki qavat; `arr.flat(Infinity)` — hammasini.
- `arr.flatMap(fn)` = `arr.map(fn).flat()`, lekin tezroq.
- `flatMap` bilan elementni **o'chirish** (`[]` qaytarish) yoki **ko'paytirish** (`[a, b]` qaytarish) mumkin — `map` + `filter`ni birlashtiradi.

**Misol:**

```js
console.log([1, [2, [3, [4]]]].flat());          // [ 1, 2, [ 3, [ 4 ] ] ]
console.log([1, [2, [3, [4]]]].flat(Infinity));  // [ 1, 2, 3, 4 ]

const sentences = ["salom dunyo", "yaxshi kun"];
console.log(sentences.flatMap((s) => s.split(" "))); // [ 'salom', 'dunyo', 'yaxshi', 'kun' ]

const orders = [{ items: ["non", "sut"] }, { items: [] }, { items: ["choy"] }];
console.log(orders.flatMap((order) => order.items)); // [ 'non', 'sut', 'choy' ]

console.log([1, -2, 3].flatMap((n) => (n > 0 ? [n, n * 10] : []))); // [ 1, 10, 3, 30 ]
```

**Intervyuda shunday ayting:** "`flat` ichma-ich massivlarni berilgan chuqurlikkacha tekislaydi, `flatMap` esa map qilib bir qavat tekislaydi. `flatMap` bilan bir o'tishda elementlarni filtrlash yoki ko'paytirish mumkin."

**Esda tuting:** `flatMap` faqat **bir** qavat ochadi. Chuqurroq tuzilma uchun `flat(depth)` kerak.

## Q40. Array.from va Array.of nima? / What are Array.from and Array.of?

**Oddiy qilib aytganda:** `Array.from` — massivga **o'xshash** narsani (satr, `Set`, sahifadagi elementlar ro'yxati) haqiqiy massivga aylantiradi. `Array.of` — berilgan qiymatlardan massiv yasaydi, `new Array()`ning g'alati xatti-harakatisiz.

**Batafsilroq:**
- `Array.from(iterable, mapFn)` — ikkinchi argument bilan yaratish paytida o'zgartirish mumkin.
- `Array.from({ length: 5 }, (_, i) => i)` — `[0, 1, 2, 3, 4]` yaratishning mashhur usuli.
- `new Array(3)` — **3 ta bo'sh joyli** massiv yaratadi, `[3]` emas! `Array.of(3)` — `[3]`.
- `Array.fromAsync` (ES2026) — asinxron manbadan massiv.

**Misol:**

```js
console.log(Array.from("salom"));                      // [ 's', 'a', 'l', 'o', 'm' ]
console.log(Array.from(new Set([1, 1, 2])));            // [ 1, 2 ]
console.log(Array.from({ length: 5 }, (_, i) => i * i)); // [ 0, 1, 4, 9, 16 ]

console.log(new Array(3));   // [ <3 empty items> ] — kutilmagan!
console.log(Array.of(3));    // [ 3 ]
console.log(Array.of(1, 2)); // [ 1, 2 ]
```

**Intervyuda shunday ayting:** "`Array.from` iterable yoki massivga o'xshash obyektni massivga aylantiradi va ixtiyoriy map funksiyasini oladi. `Array.of` argumentlardan massiv yasaydi va bitta sonli argumentda `new Array` kabi chalg'itmaydi."

**Esda tuting:** `new Array(3).map(...)` ishlamaydi — bo'sh joylar o'tkazib yuboriladi. `Array.from({ length: 3 }, ...)` ishlating.

## Q41. Object.defineProperty va property descriptor nima? / What are Object.defineProperty and property descriptors?

**Oddiy qilib aytganda:** obyektning har bir xususiyatida yashirin **sozlamalar** bor: uni o'zgartirish mumkinmi, sanab chiqishda ko'rinadimi, o'chirish mumkinmi. `Object.defineProperty` bu sozlamalarni qo'lda o'rnatadi — xuddi faylga "faqat o'qish uchun" belgisini qo'ygandek.

**Batafsilroq:**
- `writable` — qiymatni o'zgartirish mumkinmi.
- `enumerable` — `for...in` va `Object.keys`da ko'rinadimi.
- `configurable` — xususiyatni o'chirish yoki sozlamalarini o'zgartirish mumkinmi.
- `get` / `set` — qiymat o'rniga funksiya: o'qish yoki yozish paytida ishlaydi.
- `defineProperty` bilan yaratilganda barcha bayroqlar default **`false`**.

**Misol:**

```js
"use strict";
const product = { name: "Kitob", priceUzs: 45_000 };

Object.defineProperty(product, "id", { value: 17, writable: false, enumerable: false });
Object.defineProperty(product, "priceUsd", {
  get() { return Math.round(this.priceUzs / 12_600); },  // har safar hisoblanadi
  enumerable: true,
});

console.log(product.priceUsd);       // 4
console.log(Object.keys(product));   // [ 'name', 'priceUzs', 'priceUsd' ] — id yashirin
try { product.id = 99; } catch (error) { console.log(error.name); } // TypeError
console.log(Object.getOwnPropertyDescriptor(product, "id"));
```

**Intervyuda shunday ayting:** "Har bir xususiyatda descriptor bor: `value`, `writable`, `enumerable`, `configurable` yoki `get/set`. `defineProperty` ularni aniq boshqarishga imkon beradi — faqat o'qiladigan, yashirin yoki hisoblanadigan xususiyatlar uchun. U bilan yaratilganda bayroqlar default `false`."

**Esda tuting:** oddiy kodda ko'pincha `class` ichidagi `get`/`set` va `#private` maydonlar yetarli — `defineProperty` kutubxona yozishda ko'proq kerak.

## Q42. process.nextTick, setImmediate va setTimeout qaysi tartibda ishlaydi? / In what order do process.nextTick, setImmediate and setTimeout run?

**Oddiy qilib aytganda:** Node.js'da uch xil "keyinroq bajar" buyrug'i bor:
- `process.nextTick` — "joriy ishingni tugatishing bilan **darhol**" (eng shoshilinch);
- `setTimeout(fn, 0)` — "keyingi taymer bosqichida";
- `setImmediate` — "I/O ishlari tugagach, check bosqichida".

**Batafsilroq:**
- Tartib (CommonJS faylda yoki callback ichida): sinxron kod → `nextTick` → Promise'lar → taymerlar/`setImmediate`.
- Asosiy faylda `setTimeout(0)` va `setImmediate` orasidagi tartib **kafolatlanmagan**; I/O callback ichida esa `setImmediate` har doim birinchi.
- ES modul (`.mjs`) faylining yuqori darajasida Promise `nextTick`dan oldin ishlaydi — modulning o'zi Promise ichida baholanadi.
- Bu faqat Node.js'da: brauzerda `process.nextTick` va `setImmediate` yo'q.

**Misol:**

```js
import { readFile } from "node:fs";

readFile(new URL(import.meta.url), () => {
  // I/O callback ichida tartib aniq:
  setTimeout(() => console.log("3: setTimeout"), 0);
  setImmediate(() => console.log("2: setImmediate"));
  process.nextTick(() => console.log("1: nextTick"));
});
// 1: nextTick, 2: setImmediate, 3: setTimeout
```

**Intervyuda shunday ayting:** "`nextTick` joriy operatsiyadan keyin, event loop davom etishidan oldin ishlaydi. `setImmediate` check fazasida, `setTimeout(0)` timers fazasida. I/O callback ichida `setImmediate` har doim `setTimeout`dan oldin; asosiy modulda ularning tartibi kafolatlanmagan."

**Esda tuting:** rekursiv `nextTick` event loop'ni to'liq to'sib qo'yadi — I/O hech qachon ishlamaydi. Oddiy holatlarda `queueMicrotask` yoki `setImmediate` afzal.

## Q43. &&=, ||= va ??= operatorlari nima qiladi? / What do the &&=, ||= and ??= operators do?

**Oddiy qilib aytganda:** bular — "shartli tayinlash" qisqartmalari. `a ??= 5` — "agar `a` bo'sh bo'lsa (`null`/`undefined`), unga 5 ni qo'y". Kodni qisqartiradi va ortiqcha tayinlashlarni oldini oladi.

**Batafsilroq:**
- `a ||= b` → `a || (a = b)` — `a` falsy bo'lsa (`0`, `""`, `false`, `null`...) tayinlaydi.
- `a &&= b` → `a && (a = b)` — `a` truthy bo'lsa tayinlaydi.
- `a ??= b` → `a ?? (a = b)` — faqat `a` `null` yoki `undefined` bo'lsa tayinlaydi.
- Muhim: shart bajarilmasa, **tayinlash umuman bo'lmaydi** (setter chaqirilmaydi).

**Misol:**

```js
const config = { retries: 0, name: "", timeout: undefined, token: "abc" };

config.retries ||= 3;   // 0 falsy → 3 bo'ldi (ehtimol bu xato — 0 ataylab qo'yilgan bo'lishi mumkin)
config.name ??= "api";  // "" null emas → o'zgarmaydi
config.timeout ??= 5_000; // undefined → 5000
config.token &&= config.token.toUpperCase(); // bor bo'lsa → "ABC"

console.log(config); // { retries: 3, name: '', timeout: 5000, token: 'ABC' }

const groups = {};
(groups.admin ??= []).push("Ali"); // guruh yo'q bo'lsa yaratib, qo'shish
console.log(groups); // { admin: [ 'Ali' ] }
```

**Intervyuda shunday ayting:** "Mantiqiy tayinlash operatorlari faqat shart bajarilganda tayinlaydi: `||=` falsy'da, `&&=` truthy'da, `??=` faqat `null/undefined`da. Standart qiymat berish uchun ko'pincha `??=` to'g'ri, chunki u `0` va bo'sh satrni saqlaydi."

**Esda tuting:** `||=` va `??=` farqini chalkashtirmang — misoldagi `retries: 0` holati ko'p xatolar manbai.

## Q44. Klassdagi #private maydonlar nima? / What are #private class fields?

**Oddiy qilib aytganda:** `#` bilan boshlangan maydon — klassning **shaxsiy seyfi**. Faqat klassning o'z metodlari uni ochadi. Tashqaridan ko'rib ham, o'zgartirib ham bo'lmaydi — til darajasida himoyalangan.

**Batafsilroq:**
- Ilgari `_balance` deb yozilardi — bu faqat "iltimos, tegmang" degan kelishuv edi, aslida ochiq edi.
- `#balance` — haqiqiy maxfiylik: tashqaridan murojaat **sintaksis xatosi**.
- Private metodlar ham bor: `#validate()`.
- `#field in obj` — obyektda shu private maydon borligini tekshirish.

**Misol:**

```js
class BankAccount {
  #balance = 0;                         // shaxsiy maydon

  deposit(amount) {
    this.#validate(amount);
    this.#balance += amount;
    return this.#balance;
  }

  #validate(amount) {                   // shaxsiy metod
    if (!Number.isFinite(amount) || amount <= 0) throw new RangeError("Summa musbat bo'lishi kerak");
  }

  get balance() { return this.#balance; }
}

const account = new BankAccount();
account.deposit(100_000);
console.log(account.balance);          // 100000
console.log(Object.keys(account));     // [] — #balance ko'rinmaydi
// account.#balance = 1e9;             // SyntaxError — tashqaridan mumkin emas
```

**Intervyuda shunday ayting:** "`#` maydonlar til darajasida maxfiy: faqat klass ichidan kirish mumkin, tashqaridan murojaat sintaksis xatosi. Ichki holatni himoya qilish va invariantlarni saqlash uchun ishlataman, tashqariga faqat getter yoki metodlar orqali ochaman."

**Esda tuting:** `#` maydonlar Proxy bilan yaxshi ishlamaydi — Proxy orqali chaqirilgan metod `this.#x`ga murojaat qilsa, `TypeError` bo'lishi mumkin.

## Q45. static metod va xususiyatlar nima? / What are static methods and properties?

**Oddiy qilib aytganda:** oddiy metod — har bir **mahsulotga** tegishli ("bu mashina qancha yurgan?"). Static metod esa — **zavodning o'ziga** tegishli ("zavod nechta mashina chiqardi?"). Uni nusxa orqali emas, klass nomi orqali chaqirasiz.

**Batafsilroq:**
- `static` kalit so'zi bilan e'lon qilinadi, `ClassName.method()` bilan chaqiriladi.
- Nusxada (`new` bilan yaratilgan obyektda) mavjud emas.
- Qo'llanishi: yordamchi funksiyalar (`Math.max`, `Array.from`, `Date.now` — hammasi static), fabrika metodlar, umumiy hisoblagichlar.
- `static { ... }` bloki — klass yuklanganda bir marta ishlaydigan boshlang'ich sozlash.

**Misol:**

```js
class User {
  static count = 0;

  static fromJson(json) {                 // fabrika metod
    const data = JSON.parse(json);
    return new User(data.name);
  }

  constructor(name) {
    this.name = name;
    User.count++;
  }
}

const ali = User.fromJson('{"name":"Ali"}');
new User("Vali");
console.log(ali.name, User.count); // Ali 2
console.log(ali.fromJson);         // undefined — nusxada static yo'q
```

**Intervyuda shunday ayting:** "Static a'zolar klassning o'ziga tegishli, nusxalarga emas. Ular fabrika metodlar, yordamchi funksiyalar va barcha nusxalar uchun umumiy ma'lumot uchun ishlatiladi. Static metod ichida `this` — klassning o'zi."

**Esda tuting:** static metodni nusxa ichidan `this.method()` bilan chaqirib bo'lmaydi — `ClassName.method()` yoki `this.constructor.method()` yozing.

## Q46. Klasslarda meros va super() qanday ishlaydi? / How do class inheritance and super() work?

**Oddiy qilib aytganda:** meros — "otadan o'g'ilga": `class Dog extends Animal` — it hayvonning barcha qobiliyatlarini oladi va o'zinikini qo'shadi. `super()` — "avval otamning konstruktorini ishga tushir" degani. `super.method()` — "otamning shu metodini chaqir".

**Batafsilroq:**
- Bola klass konstruktorida `this`dan foydalanishdan **oldin** `super(...)` chaqirilishi shart, aks holda `ReferenceError`.
- Metodni qayta yozish (override): bolada bir xil nomli metod ota metodini "yopadi". Otanikini chaqirish uchun `super.method()`.
- Meros chuqur bo'lsa, kod qiyinlashadi. Ko'p hollarda **kompozitsiya** (obyektni boshqa obyektlardan yig'ish) yaxshiroq.

**Misol:**

```js
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  describe() { return `${this.name}: ${this.salary.toLocaleString("uz-UZ")} so'm`; }
}

class Manager extends Employee {
  constructor(name, salary, teamSize) {
    super(name, salary);                // avval otaning konstruktori
    this.teamSize = teamSize;
  }
  describe() {
    return `${super.describe()}, jamoa: ${this.teamSize} kishi`; // ota metodini kengaytirish
  }
}

console.log(new Manager("Dilnoza", 15_000_000, 6).describe());
```

**Intervyuda shunday ayting:** "`extends` prototip zanjirini quradi, `super()` ota konstruktorini chaqiradi va `this`dan oldin bo'lishi shart. `super.method()` bilan ota metodini qayta ishlatib, kengaytiraman. Chuqur ierarxiya o'rniga ko'pincha kompozitsiyani afzal ko'raman."

**Esda tuting:** bola klassda konstruktor yozmasangiz, JavaScript avtomatik `constructor(...args) { super(...args); }` qo'shadi.

## Q47. O'z iterator'ingizni qanday yaratasiz (Symbol.iterator)? / How do you make a custom iterable with Symbol.iterator?

**Oddiy qilib aytganda:** `for...of` sikli istalgan obyekt bilan ishlamaydi — obyekt "meni qanday aylanib chiqish kerak"ligini aytishi kerak. Buning uchun obyektga `Symbol.iterator` nomli metod qo'shiladi. Bu xuddi kitobga **mundarija** qo'shishga o'xshaydi: endi uni sahifama-sahifa varaqlash mumkin.

**Batafsilroq:**
- **Iterable** — `[Symbol.iterator]()` metodi bor obyekt (massiv, satr, `Map`, `Set`).
- **Iterator** — `next()` metodi bor obyekt, u `{ value, done }` qaytaradi.
- Iterable'lar bilan `for...of`, spread `[...x]`, destructuring, `Array.from` ishlaydi.
- Eng oson yo'l — `*[Symbol.iterator]()` generator metodi (Q15).

**Misol:**

```js
class Range {
  constructor(from, to, step = 1) { Object.assign(this, { from, to, step }); }

  *[Symbol.iterator]() {               // generator — iterator protokolini o'zi bajaradi
    for (let value = this.from; value <= this.to; value += this.step) yield value;
  }
}

const evens = new Range(2, 10, 2);
for (const n of evens) console.log(n); // 2 4 6 8 10
console.log([...evens]);                // [ 2, 4, 6, 8, 10 ]

// Qo'lda yozilgan iterator (generator'siz) — protokolning o'zi:
const countdown = {
  [Symbol.iterator]() {
    let n = 3;
    return { next: () => (n > 0 ? { value: n--, done: false } : { value: undefined, done: true }) };
  },
};
console.log([...countdown]); // [ 3, 2, 1 ]
```

**Intervyuda shunday ayting:** "Obyekt `Symbol.iterator` metodini amalga oshirsa, iterable bo'ladi. Metod `next()` bilan `{ value, done }` qaytaradigan iterator beradi. Amalda generator metodi eng qisqa yo'l; shunda obyekt `for...of`, spread va destructuring bilan ishlaydi."

**Esda tuting:** oddiy obyekt `{a: 1}` iterable emas — `for...of` uni aylanmaydi. `Object.entries(obj)` ishlating.

## Q48. Web Worker nima? / What is a Web Worker?

**Oddiy qilib aytganda:** brauzerdagi JavaScript bitta "ishchi"da ishlaydi — u ham tugmalar bosilishiga javob beradi, ham hisoblaydi. Og'ir hisob boshlansa, sahifa **qotib qoladi**. Web Worker — alohida yordamchi ishchi: og'ir ishni fonda bajaradi, asosiy sahifa esa silliq ishlashda davom etadi.

**Batafsilroq:**
- Worker alohida faylda yoziladi va alohida oqimda ishlaydi.
- U **DOM'ga kira olmaydi** — sahifani faqat asosiy oqim o'zgartiradi.
- Asosiy oqim va worker `postMessage` / `onmessage` orqali xabar almashadi. Ma'lumot nusxalanadi (katta buferlarni "ko'chirish" — transfer ham mumkin).
- Qo'llanishi: katta faylni tahlil qilish, rasmga filtr, shifrlash, katta ro'yxatni saralash.
- Node.js'dagi o'xshashi — `worker_threads`.

**Misol:**

```javascript
// main.js — asosiy sahifa
const worker = new Worker(new URL("./sum-worker.js", import.meta.url), { type: "module" });
worker.postMessage(50_000_000);
worker.onmessage = (event) => console.log("Natija:", event.data); // sahifa qotmaydi

// sum-worker.js — alohida oqim
self.onmessage = (event) => {
  let total = 0;
  for (let i = 0; i < event.data; i++) total += i;
  self.postMessage(total);
};
```

**Intervyuda shunday ayting:** "Web Worker og'ir hisobni asosiy UI oqimidan ajratadi, shuning uchun sahifa javob berishda davom etadi. Worker DOM'ga kira olmaydi va `postMessage` orqali muloqot qiladi. Katta binar ma'lumotni nusxalamasdan transfer qilaman."

**Esda tuting:** worker yaratish qimmat. Kichik ishlar uchun worker ochish foydadan ko'ra zarar keltiradi.

## Q49. Service Worker nima va PWA'da qanday ishlaydi? / What is a Service Worker and how is it used in PWAs?

**Oddiy qilib aytganda:** Service Worker — sahifa va internet orasida turadigan **aqlli pochtachi**. Sahifa serverdan biror narsa so'raganda, pochtachi avval o'z xaltasiga (keshga) qaraydi: bor bo'lsa, darhol beradi — internet bo'lmasa ham. Shu tufayli sayt **oflayn** ishlay oladi. Bunday saytlar **PWA** (Progressive Web App) deyiladi.

**Batafsilroq:**
- Service Worker sahifadan alohida, fonda ishlaydi; DOM'ga kira olmaydi.
- Faqat HTTPS'da (yoki `localhost`da) ishlaydi — xavfsizlik uchun.
- Hayot sikli: `register` → `install` (keshni to'ldirish) → `activate` (eski keshni tozalash) → `fetch` hodisalarini ushlash.
- Strategiyalar: **cache first** (statik fayllar uchun), **network first** (yangi ma'lumot muhim bo'lganda), **stale-while-revalidate** (keshdan tez berib, fonda yangilash).
- Push-bildirishnomalar ham Service Worker orqali keladi.

**Misol:**

```javascript
// main.js
if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");

// sw.js
const CACHE = "app-v1";
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(["/", "/app.js", "/styles.css"])));
});
self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached ?? fetch(event.request)));
});
```

**Intervyuda shunday ayting:** "Service Worker — sahifa va tarmoq orasidagi proxy skript. U so'rovlarni ushlab, keshdan javob bera oladi, shuning uchun oflayn rejim va tez yuklanish mumkin. Faqat HTTPS'da ishlaydi. Statik fayllarga cache-first, API'ga network-first strategiyasini qo'llayman."

**Esda tuting:** Service Worker'dagi xato eski versiyani foydalanuvchida uzoq "qotirib" qo'yishi mumkin. Kesh nomiga versiya qo'shing va `activate`da eski keshlarni o'chiring.

## Q50. fetch va AbortController bilan so'rovni qanday bekor qilasiz? / How do you cancel a fetch request with AbortController?

**Oddiy qilib aytganda:** `fetch` — serverga yuborilgan xat. Ba'zan javob kerak bo'lmay qoladi: foydalanuvchi boshqa sahifaga o'tdi yoki server juda uzoq javob bermayapti. **AbortController** — shu xatni yo'ldan qaytaradigan "bekor qilish tugmasi".

**Batafsilroq:**
- `const controller = new AbortController()` — boshqaruvchi; `controller.signal` — `fetch`ga beriladigan signal.
- `controller.abort()` — so'rovni bekor qiladi; `fetch` `AbortError` bilan rad etiladi.
- `AbortSignal.timeout(ms)` — tayyor "vaqt tugasa bekor qil" signali.
- `fetch`da **default timeout yo'q** — signal bermasangiz, so'rov juda uzoq osilib qolishi mumkin.
- `fetch` faqat tarmoq xatosida rad etadi; `404` yoki `500` — muvaffaqiyatli javob hisoblanadi, `response.ok`ni tekshirish kerak.

**Misol:**

```js
import http from "node:http";

// Ataylab sekin server (2 soniyada javob beradi)
const server = http.createServer((req, res) => setTimeout(() => res.end("kech javob"), 2_000)).listen(0);
const url = `http://127.0.0.1:${server.address().port}`;

try {
  await fetch(url, { signal: AbortSignal.timeout(200) }); // 200 ms kutamiz
} catch (error) {
  console.log("Bekor qilindi:", error.name); // TimeoutError
} finally {
  server.close();
  server.closeAllConnections();
}
```

**Intervyuda shunday ayting:** "`AbortController` signal orqali `fetch`ni bekor qiladi. Har bir tashqi so'rovga `AbortSignal.timeout` bilan vaqt chegarasi qo'yaman, React'da esa `useEffect` cleanup'ida `abort()` chaqiraman, shunda eski javob yangi holatni buzmaydi. `fetch` HTTP xatolarida rad etmaydi, shuning uchun `response.ok`ni tekshiraman."

**Esda tuting:** bekor qilingan so'rov xatosini foydalanuvchiga "xato yuz berdi" deb ko'rsatmang — `error.name === "AbortError"` bo'lsa, jim o'tkazib yuboring.

## Q51. Async generator va for await...of nima? / What are async generators and for await...of?

**Oddiy qilib aytganda:** oddiy generator (Q15) qiymatlarni birma-bir beradi. **Async generator** esa har bir qiymatni **kutib** beradi — masalan, serverdan sahifama-sahifa ma'lumot olayotganda. `for await...of` — shunday qiymatlarni navbat bilan kutib oladigan sikl.

**Batafsilroq:**
- `async function*` — ichida ham `await`, ham `yield` ishlatish mumkin.
- `for await (const item of source)` — har bir element tayyor bo'lishini kutadi.
- Qo'llanishi: sahifalangan API (pagination), fayl yoki tarmoq stream'lari, navbatdan xabarlarni o'qish.
- Node.js stream'lari ham `for await` bilan o'qiladi.

**Misol:**

```js
const fakeApi = async (page) => (page <= 3 ? [`${page}-sahifa: A`, `${page}-sahifa: B`] : []);

async function* allItems() {
  for (let page = 1; ; page++) {
    const items = await fakeApi(page);  // har sahifani kutamiz
    if (items.length === 0) return;     // sahifalar tugadi
    yield* items;                       // elementlarni birma-bir beramiz
  }
}

for await (const item of allItems()) console.log(item);
```

**Intervyuda shunday ayting:** "Async generator asinxron ma'lumot oqimini ketma-ket qiymatlar sifatida beradi va `for await...of` ularni navbat bilan oladi. Sahifalangan API'lar va stream'lar uchun juda mos: iste'molchi `break` qilsa, generator to'xtaydi va keraksiz so'rovlar yuborilmaydi."

**Esda tuting:** `for await` elementlarni **ketma-ket** kutadi. Mustaqil so'rovlarni parallel qilish kerak bo'lsa, `Promise.all` ishlating.

## Q52. Call stack va heap nima? / What are the call stack and the heap?

**Oddiy qilib aytganda:** **call stack** — ustma-ust qo'yilgan likopchalar: har bir chaqirilgan funksiya ustiga yangi likopcha qo'yiladi, tugagach olinadi. Faqat eng yuqoridagisi bilan ishlanadi. **Heap** — katta ombor: obyektlar, massivlar shu yerda tartibsiz saqlanadi.

**Batafsilroq:**
- **Stack** — funksiya chaqiruvlari, ularning lokal primitiv qiymatlari va obyektlarga havolalar. Tez, tartibli, hajmi kichik.
- **Heap** — obyektlar va boshqa murakkab ma'lumotlar. Katta, garbage collector boshqaradi.
- Funksiya o'zini cheksiz chaqirsa, likopchalar tomgacha yetadi — **stack overflow** (`RangeError: Maximum call stack size exceeded`).
- Xatodagi "stack trace" — xato paytida stack'da qaysi funksiyalar borligining ro'yxati.

**Misol:**

```js
function level3() { throw new Error("3-darajada xato"); }
function level2() { level3(); }
function level1() { level2(); }

try {
  level1();
} catch (error) {
  console.log(error.stack.split("\n").slice(0, 4).join("\n")); // stack: level3 ← level2 ← level1
}

function infinite() { return infinite(); }
try { infinite(); } catch (error) { console.log(error.name, error.message); }
// RangeError Maximum call stack size exceeded
```

**Intervyuda shunday ayting:** "Call stack funksiya chaqiruvlarini LIFO tartibida saqlaydi, heap esa obyektlar uchun dinamik xotira. Chuqur rekursiya stack'ni to'ldirib `RangeError` beradi. Xotira sizishi esa heap'da bo'ladi va GC boshqaradi."

**Esda tuting:** JavaScript bitta call stack'ka ega — shuning uchun uzoq sinxron hisob butun dasturni to'xtatadi (Q1).

## Q53. Tail call optimization nima va JavaScript'da ishlaydimi? / What is tail call optimization and does JavaScript support it?

**Oddiy qilib aytganda:** rekursiv funksiya o'zini chaqirganda har safar stack'ka yangi likopcha qo'yiladi (Q52). **Tail call optimization (TCO)** — funksiyaning **eng oxirgi** amali o'zini chaqirish bo'lsa, eski likopchani qayta ishlatish. Shunda million marta rekursiya ham stack'ni to'ldirmaydi.

**Batafsilroq:**
- **Tail call** — `return f(x)` — chaqiruvdan keyin boshqa ish qolmaydi. `return n * f(n - 1)` esa tail call emas (ko'paytirish kutib turibdi).
- ES2015 standartida TCO bor, lekin **amalda faqat Safari** uni qo'llaydi. V8 (Chrome, Node.js) va Firefox'da **yo'q**.
- Demak Node.js'da chuqur rekursiyaga tayanmang: uni **siklga** yoki **trampolin**ga aylantiring.
- **Trampolin** — funksiya o'zini chaqirish o'rniga "keyingi qadam"ni funksiya sifatida qaytaradi, tashqi sikl esa uni chaqiradi.

**Misol:**

```js
// Tail-recursive, lekin Node.js'da baribir stack to'ladi:
const sumTo = (n, total = 0) => (n === 0 ? total : sumTo(n - 1, total + n));
try { sumTo(1_000_000); } catch (error) { console.log("Rekursiya:", error.name); } // RangeError

// Xavfsiz variant 1 — oddiy sikl:
let total = 0;
for (let i = 1; i <= 1_000_000; i++) total += i;
console.log("Sikl:", total);

// Xavfsiz variant 2 — trampolin:
const trampoline = (fn) => (...args) => {
  let result = fn(...args);
  while (typeof result === "function") result = result();
  return result;
};
const sumStep = (n, acc = 0) => (n === 0 ? acc : () => sumStep(n - 1, acc + n));
console.log("Trampolin:", trampoline(sumStep)(1_000_000));
```

**Intervyuda shunday ayting:** "TCO dum pozitsiyasidagi chaqiruvda stack freymini qayta ishlatadi. Standartda bor, lekin V8 va Firefox uni amalga oshirmagan, shuning uchun Node.js'da chuqur rekursiya stack'ni to'ldiradi. Men chuqurligi oldindan noma'lum rekursiyani sikl yoki trampolin bilan yozaman."

**Esda tuting:** daraxtni rekursiv aylanish odatda xavfsiz (chuqurlik kichik). Xavf — chiziqli, minglab qadamli rekursiyada.

## Q54. WeakRef va FinalizationRegistry nima? / What are WeakRef and FinalizationRegistry?

**Oddiy qilib aytganda:** `WeakRef` — obyektga "yengil" havola: u obyektni xotirada **ushlab turmaydi**. Garbage collector xohlasa, obyektni o'chiradi va `deref()` `undefined` qaytaradi. `FinalizationRegistry` — obyekt o'chirilgandan keyin "xabar ber" deb so'rash imkoniyati.

**Batafsilroq:**
- `const ref = new WeakRef(obj)`; `ref.deref()` — obyekt yoki `undefined`.
- Qo'llanishi: katta, qayta yaratsa bo'ladigan obyektlar keshi (masalan, dekodlangan rasmlar).
- `FinalizationRegistry` — tashqi resurslarni tozalash uchun "zaxira" mexanizm.
- **Muhim:** GC qachon ishlashi kafolatlanmagan. Dastur mantiqini bularga bog'lamang — rasmiy hujjat ham "iloji boricha ishlatmang" deydi.

**Misol:**

```js
class ImageCache {
  #refs = new Map();

  get(key, create) {
    const cached = this.#refs.get(key)?.deref();  // hali xotirada bo'lsa
    if (cached) return cached;
    const value = create();                        // bo'lmasa qayta yaratamiz
    this.#refs.set(key, new WeakRef(value));
    return value;
  }
}

const cache = new ImageCache();
const first = cache.get("logo", () => ({ pixels: new Uint8Array(1024) }));
const second = cache.get("logo", () => ({ pixels: new Uint8Array(1024) }));
console.log(first === second); // true — GC hali o'chirmagan
```

**Intervyuda shunday ayting:** "WeakRef obyektni GC'dan himoya qilmaydigan havola, `deref()` bilan olinadi. FinalizationRegistry obyekt yig'ilgandan keyin callback beradi. Ular qayta yaratsa bo'ladigan kesh uchun foydali, lekin GC vaqti kafolatlanmagani uchun mantiqni ularga bog'lamayman."

**Esda tuting:** resursni (fayl, ulanish) yopish uchun FinalizationRegistry'ga tayanmang — aniq `close()` yoki `using` (Symbol.dispose) ishlating.

## Q55. globalThis nima? / What is globalThis?

**Oddiy qilib aytganda:** har bir muhitda "global obyekt"ning nomi boshqacha edi: brauzerda `window`, Web Worker'da `self`, Node.js'da `global`. `globalThis` — hamma joyda ishlaydigan **yagona nom**.

**Batafsilroq:**
- Kutubxona yozganda muhitni aniqlash uchun `typeof window !== "undefined" ? window : global` kabi kod yozilardi. Endi shunchaki `globalThis`.
- Global o'zgaruvchilar yaratish yomon amaliyot — ular boshqa kod bilan to'qnashadi. `globalThis`dan asosan mavjud narsani tekshirish uchun foydalaning.

**Misol:**

```js
console.log(typeof globalThis);                    // object
console.log(globalThis === global);                // true — Node.js'da
console.log(typeof globalThis.fetch);               // function — global fetch bormi?
console.log("structuredClone" in globalThis);      // true — funksiya mavjudligini tekshirish
```

**Intervyuda shunday ayting:** "`globalThis` barcha muhitlarda global obyektga yagona murojaat usuli: brauzerda `window`, worker'da `self`, Node'da `global` o'rniga. Men uni asosan API mavjudligini tekshirish uchun ishlataman, global o'zgaruvchi yaratish uchun emas."

**Esda tuting:** ES modul ichida yuqori darajada e'lon qilingan `const x` global obyektga **qo'shilmaydi** — modulning o'z doirasida qoladi.

## Q56. Intl API nima uchun kerak? / What is the Intl API for?

**Oddiy qilib aytganda:** sonlar, sanalar va pullar har mamlakatda boshqacha yoziladi: `1,234.5` (AQSh), `1 234,5` (O'zbekiston). **Intl** — JavaScript'ning o'rnatilgan "tarjimoni": qiymatni kerakli til va mintaqaga moslab formatlaydi. Kutubxona kerak emas.

**Batafsilroq:**
- `Intl.NumberFormat` — son, valyuta, foiz.
- `Intl.DateTimeFormat` — sana va vaqt.
- `Intl.RelativeTimeFormat` — "3 kun oldin".
- `Intl.PluralRules` — ko'plik shakllari (1 item, 2 items).
- `Intl.Collator` — tilga mos saralash.
- Formatlovchini bir marta yaratib, qayta ishlatish tezroq.

**Misol:**

```js
const som = new Intl.NumberFormat("uz-UZ", { style: "currency", currency: "UZS", maximumFractionDigits: 0 });
console.log(som.format(1_250_000));

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
console.log(usd.format(1234.5)); // $1,234.50

const date = new Intl.DateTimeFormat("uz-UZ", { dateStyle: "long", timeZone: "Asia/Tashkent" });
console.log(date.format(new Date("2026-09-25T10:00:00Z")));

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
console.log(relative.format(-1, "day")); // yesterday
```

**Intervyuda shunday ayting:** "Intl API son, valyuta, sana, nisbiy vaqt va ko'plik shakllarini mahalliy qoidalarga ko'ra formatlaydi. Formatlovchilarni bir marta yaratib qayta ishlataman. Sana formatlashda `timeZone`ni aniq beraman, aks holda server va mijozda natija farq qiladi."

**Esda tuting:** natijadagi bo'shliqlar oddiy probel emas, balki "uzilmas" probel bo'lishi mumkin (` `, ` `). Testlarda natijani qattiq satr bilan solishtirishda ehtiyot bo'ling.

## Q57. Promise.all, allSettled, race va any farqi nima? / How do Promise.all, allSettled, race and any differ?

**Oddiy qilib aytganda:** bir nechta ishni bir vaqtda boshlab, natijani qanday kutishni tanlaysiz:
- `all` — "**hammasi** tayyor bo'lsin; bittasi buzilsa, darhol xabar ber";
- `allSettled` — "hammasi **tugasin** (yaxshi yoki yomon), keyin hisobot ber";
- `race` — "**birinchi tugagan** (yaxshi yoki yomon) g'olib";
- `any` — "birinchi **muvaffaqiyatli** tugagani g'olib".

**Batafsilroq:**

| Metod | Qachon tugaydi | Natija |
|---|---|---|
| `all` | hammasi bajarilganda yoki birinchi xatoda | qiymatlar massivi / xato |
| `allSettled` | hammasi tugaganda | `{ status, value/reason }` massivi |
| `race` | birinchisi tugaganda | o'sha natija yoki xato |
| `any` | birinchi muvaffaqiyatda | o'sha qiymat; hammasi xato bo'lsa `AggregateError` |

**Misol:**

```js
const ok = (value, ms) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
const fail = (message, ms) => new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));

console.log(await Promise.all([ok("A", 10), ok("B", 20)]));             // [ 'A', 'B' ]
console.log(await Promise.all([ok("A", 10), fail("B buzildi", 5)]).catch((e) => e.message)); // B buzildi
console.log((await Promise.allSettled([ok("A", 10), fail("B", 5)])).map((r) => r.status)); // [ 'fulfilled', 'rejected' ]
console.log(await Promise.race([ok("sekin", 30), ok("tez", 10)]));      // tez
console.log(await Promise.any([fail("1-server", 5), ok("2-server", 15)])); // 2-server
```

**Intervyuda shunday ayting:** "`all` — hammasi kerak bo'lganda, birinchi xatoda to'xtaydi. `allSettled` — har birining natijasi kerak bo'lganda. `race` — timeout qo'yishda. `any` — bir nechta zaxira manbadan birinchi muvaffaqiyatlisini olishda."

**Esda tuting:** `Promise.all` birinchi xatoda qaytadi, lekin qolgan so'rovlarni **bekor qilmaydi** — ular fonda ishlashda davom etadi. Bekor qilish uchun AbortController kerak (Q50).

## Q58. Microtask starvation nima? / What is microtask starvation?

**Oddiy qilib aytganda:** Q1 dagi do'konni eslang: kassir har bir oddiy xaridordan keyin butun VIP navbatni bo'shatadi. Agar VIP navbatga **tinimsiz yangi** odamlar qo'shilib tursa, oddiy navbat **hech qachon** kelmaydi. Bu — microtask starvation ("och qolish"): taymerlar, bosishlar va sahifani chizish to'xtab qoladi.

**Batafsilroq:**
- Microtask ichidan yangi microtask qo'shilsa, u ham shu tsiklda bajariladi.
- Cheksiz microtask zanjiri → `setTimeout`, I/O va brauzerda **render** umuman bo'lmaydi → sahifa "qotadi".
- Yechim: katta ishni bo'laklarga bo'lib, bo'laklar orasida macrotask'ka (`setTimeout`, `setImmediate`) yoki brauzerda `scheduler.yield()`ga navbat berish.

**Misol:**

```js
let ticks = 0;
setTimeout(() => console.log(`setTimeout nihoyat ishladi, microtask'lar: ${ticks}`), 0);

function spin() {
  if (++ticks < 100_000) queueMicrotask(spin); // microtask o'zidan yangisini qo'shadi
}
spin();
// setTimeout faqat 100 000 ta microtask tugagach ishlaydi — cheksiz bo'lsa, hech qachon
```

**Intervyuda shunday ayting:** "Microtask navbati macrotask'dan oldin to'liq bo'shatiladi. Microtask'lar o'zidan yangi microtask qo'shib tursa, taymerlar, I/O va render to'xtaydi. Uzoq ishni bo'laklab, oralarda macrotask'ka navbat beraman."

**Esda tuting:** rekursiv `Promise.then` zanjiri ham xuddi shunday xavfli — faqat `queueMicrotask` emas.

## Q59. Inkapsulyatsiyani Symbol va closure bilan qilish farqi nima? / How does encapsulation with Symbols compare to closures?

**Oddiy qilib aytganda:** ma'lumotni yashirishning uch darajasi bor:
- **Symbol kalit** — xona eshigi yopiq, lekin **kalit topsa** kirsa bo'ladi (to'liq yashirin emas);
- **closure** — xona umuman boshqa binoda: tashqaridan yo'l yo'q;
- **`#private`** — til darajasidagi seyf (Q44), klasslar uchun eng yaxshi yo'l.

**Batafsilroq:**
- Symbol xususiyati `Object.keys` va `JSON`da ko'rinmaydi, lekin `Object.getOwnPropertySymbols` uni ochadi — bu "tasodifan to'qnashmaslik" uchun, maxfiylik uchun emas.
- Closure'dagi o'zgaruvchi haqiqatan yashirin, lekin har bir nusxa o'z funksiyalarini yaratadi (xotira biroz ko'proq).
- `#private` — haqiqiy maxfiylik va metodlar prototipda ulashiladi.

**Misol:**

```js
const secret = Symbol("secret");
const withSymbol = { [secret]: "parol" };
console.log(Object.keys(withSymbol));                                    // [] — ko'rinmaydi...
console.log(withSymbol[Object.getOwnPropertySymbols(withSymbol)[0]]);    // parol — ...lekin olish mumkin

function createVault(pin) {
  return { check: (attempt) => attempt === pin };                        // pin faqat closure'da
}
const vault = createVault("1234");
console.log(vault.check("1234"), vault.pin);                             // true undefined

class Safe { #pin; constructor(pin) { this.#pin = pin; } check(p) { return p === this.#pin; } }
console.log(new Safe("0000").check("0000"));                             // true
```

**Intervyuda shunday ayting:** "Symbol kalitlar faqat to'qnashuvdan himoya qiladi — ularni reflection bilan topish mumkin. Closure va `#private` maydonlar haqiqiy maxfiylik beradi. Klasslarda `#private`, funksional kodda closure ishlataman."

**Esda tuting:** "maxfiy" ma'lumot baribir mijoz tomonida — brauzer kodidagi hech narsa haqiqiy sir emas. Sirlar serverda saqlanadi.

## Q60. ArrayBuffer va DataView nima? / What are ArrayBuffer and DataView?

**Oddiy qilib aytganda:** `ArrayBuffer` — **xom baytlar** uchun ajratilgan bo'sh joy, xuddi raqamlanmagan kataklardan iborat daftar. O'zi bilan ishlab bo'lmaydi — unga "ko'zoynak" kerak. **Typed array** (`Uint8Array`, `Float32Array`...) — baytlarni ma'lum tipdagi sonlar sifatida ko'rsatadi. **DataView** — har bir joydan istalgan tipni o'qish-yozishga imkon beradigan moslashuvchan ko'zoynak.

**Batafsilroq:**
- Qo'llanishi: fayl formatlari (rasm, audio), tarmoq protokollari, WebAssembly, WebGL.
- **Endianness** — ko'p baytli sonning baytlar tartibi (katta bayt birinchimi yoki kichigi). DataView'da uni aniq tanlaysiz (`littleEndian` parametri).
- Bir `ArrayBuffer` ustida bir nechta ko'rinish bo'lishi mumkin — ular **bir xotirani** ulashadi.

**Misol:**

```js
const buffer = new ArrayBuffer(8);            // 8 bayt bo'sh joy
const view = new DataView(buffer);

view.setUint16(0, 0x0102);                    // big-endian: 01 02
view.setUint16(2, 0x0102, true);              // little-endian: 02 01
view.setFloat32(4, 3.5);

console.log([...new Uint8Array(buffer)]);     // [ 1, 2, 2, 1, 64, 96, 0, 0 ]
console.log(view.getFloat32(4));              // 3.5
```

**Intervyuda shunday ayting:** "ArrayBuffer — qat'iy o'lchamli xom xotira. Typed array'lar uni bir xil tipdagi elementlar massivi sifatida ko'rsatadi, DataView esa istalgan ofsetdan turli tiplarni tanlangan endianness bilan o'qiydi. Binar fayl formatlari va protokollarda ishlataman."

**Esda tuting:** ko'p platformalar (x86, ARM) little-endian, tarmoq protokollari esa odatda big-endian. Tartibni aniq ko'rsating.

## Q61. Object.is va === farqi nima? / What is the difference between Object.is and ===?

**Oddiy qilib aytganda:** ikkalasi ham "bir xilmi?" deb so'raydi va deyarli har doim bir xil javob beradi. Farq faqat **ikki g'alati holatda**: `NaN` va `-0`.

**Batafsilroq:**

| Solishtirish | `===` | `Object.is` |
|---|---|---|
| `NaN` va `NaN` | `false` | `true` |
| `0` va `-0` | `true` | `false` |
| boshqa hamma holat | bir xil | bir xil |

- `-0` — matematik jihatdan ma'noli: masalan, `1 / -0 === -Infinity`.
- React `useState` qiymat o'zgarganini `Object.is` bilan tekshiradi.
- `Array.prototype.includes` va `Map` kalitlari "SameValueZero" ishlatadi: `NaN`ni topadi, lekin `0` va `-0`ni bir xil deb biladi.

**Misol:**

```js
console.log(NaN === NaN, Object.is(NaN, NaN)); // false true
console.log(0 === -0, Object.is(0, -0));        // true false
console.log(1 / -0);                            // -Infinity
console.log([NaN].includes(NaN), [NaN].indexOf(NaN)); // true -1
```

**Intervyuda shunday ayting:** "`Object.is` `===` bilan deyarli bir xil, faqat `NaN`ni o'ziga teng va `+0`/`-0`ni farqli deb biladi. React holat taqqoslashda shuni ishlatadi. `includes` esa SameValueZero bilan `NaN`ni topadi, `indexOf` topmaydi."

**Esda tuting:** `Object.is` ham obyektlarni **havola** bo'yicha solishtiradi — tarkibini emas.

## Q62. Dinamik import() va code splitting nima? / What are dynamic import() and code splitting?

**Oddiy qilib aytganda:** oddiy `import` — sayohatga **butun uyni** yuklab ketish. **Dinamik `import()`** — faqat kerakli narsani, **kerak bo'lgan paytda** olish. Veb-ilovada bu "code splitting" deyiladi: sahifa birinchi ochilganda faqat asosiy kod yuklanadi, qolgani foydalanuvchi o'sha qismga o'tganda.

**Batafsilroq:**
- `import("./module.js")` — Promise qaytaradi, u modul obyekti bilan bajariladi.
- Vite va webpack har bir dinamik import'ni alohida faylga (chunk) ajratadi.
- React'da `React.lazy(() => import("./Page"))` + `<Suspense>`.
- Qo'llanishi: kam ishlatiladigan sahifalar, og'ir kutubxonalar (grafik, redaktor), shartli funksiyalar.
- Bu portalning o'zida ham takrorlash va sahifa ko'rinishlari shunday yuklanadi.

**Misol:**

```js
async function formatPrice(amount) {
  // Modul faqat funksiya birinchi chaqirilganda yuklanadi
  const { format } = await import("node:util");
  return format("%d so'm", amount);
}
console.log(await formatPrice(45_000)); // 45000 so'm

const moduleName = "node:os";
const os = await import(moduleName);    // nomni hatto o'zgaruvchidan olish mumkin
console.log(typeof os.cpus);            // function
```

**Intervyuda shunday ayting:** "Dinamik `import()` modulni ish vaqtida, Promise orqali yuklaydi. Bundler uni alohida chunk'ka ajratadi, shuning uchun boshlang'ich JavaScript hajmi kamayadi. React'da `lazy` va `Suspense` bilan sahifa va og'ir komponentlarni shunday yuklayman."

**Esda tuting:** to'liq o'zgaruvchan yo'l (`import(userInput)`) bilan bundler qaysi faylni ajratishni bilmaydi. Yo'lni iloji boricha statik qoldiring.

## Q63. Canvas API nima? / What is the Canvas API?

**Oddiy qilib aytganda:** `<canvas>` — sahifadagi **bo'sh rasm varag'i**. JavaScript bilan unga chiziq, shakl, matn va rasm chizasiz — xuddi cho'tka bilan. Grafiklar, o'yinlar, rasm tahrirlash shu asosda ishlaydi.

**Batafsilroq:**
- `canvas.getContext("2d")` — chizish uchun "cho'tka" obyekti.
- Asosiy amallar: `fillRect` (to'rtburchak), `beginPath` + `arc` (doira), `fillText` (matn), `drawImage` (rasm).
- Canvas **piksellar**dan iborat: chizilgan narsa keyin alohida obyekt bo'lib qolmaydi. Uni o'zgartirish uchun qayta chizish kerak.
- Retina ekranlarda aniq ko'rinishi uchun canvas o'lchamini `devicePixelRatio`ga ko'paytiring.
- Og'ir chizishni Web Worker'da `OffscreenCanvas` bilan qilish mumkin.

**Misol:**

```javascript
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const scale = window.devicePixelRatio;              // retina uchun
canvas.width = 300 * scale; canvas.height = 150 * scale;
ctx.scale(scale, scale);

ctx.fillStyle = "#5b47c7";
ctx.fillRect(20, 20, 100, 60);                     // to'rtburchak

ctx.beginPath();
ctx.arc(200, 50, 30, 0, Math.PI * 2);              // doira
ctx.fill();

ctx.font = "16px sans-serif";
ctx.fillText("Salom, canvas!", 20, 120);
```

**Intervyuda shunday ayting:** "Canvas — piksel asosidagi chizish sirti. 2D kontekst orqali shakllar, matn va rasmlar chiziladi; natija alohida DOM elementlari emas, shuning uchun o'zgarishda qayta chizaman. Ko'p elementli interaktiv grafik uchun canvas, oz sonli va accessibility muhim bo'lgan grafik uchun SVG tanlayman."

**Esda tuting:** canvas ichidagi matnni ekran o'quvchilari ko'rmaydi — muhim ma'lumotni alohida matn sifatida ham bering.

## Q64. Blob va File API nima? / What are Blob and the File API?

**Oddiy qilib aytganda:** **Blob** — brauzer xotirasidagi "fayl qopi": ichida matn, rasm yoki istalgan baytlar. **File** — nomi va o'zgartirilgan sanasi bor Blob, masalan foydalanuvchi `<input type="file">` orqali tanlagan fayl. Ular bilan faylni serverga yubormasdan, brauzerning o'zida o'qish, yaratish va yuklab olishga berish mumkin.

**Batafsilroq:**
- `new Blob([matn], { type: "text/csv" })` — fayl yaratish.
- `blob.text()`, `blob.arrayBuffer()`, `blob.stream()` — o'qish.
- `URL.createObjectURL(blob)` — Blob uchun vaqtinchalik havola (yuklab olish yoki rasmni oldindan ko'rsatish uchun). Keyin `URL.revokeObjectURL` bilan tozalang.
- `blob.slice(start, end)` — katta faylni bo'laklab yuklash uchun.
- `Blob` va `File` Node.js'da ham mavjud.

**Misol:**

```js
const rows = [["ism", "ball"], ["Ali", 9], ["Vali", 7]];
const csv = rows.map((row) => row.join(",")).join("\n");

const file = new File([csv], "natijalar.csv", { type: "text/csv" });
console.log(file.name, file.size, file.type); // natijalar.csv 21 text/csv
console.log((await file.text()).split("\n")[1]); // Ali,9
console.log(await file.slice(0, 3).text());      // ism

// Brauzerda yuklab olish:
// const url = URL.createObjectURL(file);
// Object.assign(document.createElement("a"), { href: url, download: file.name }).click();
// URL.revokeObjectURL(url);
```

**Intervyuda shunday ayting:** "Blob — o'zgarmas binar ma'lumot, File — nomi va sanasi bor Blob. Ular bilan mijoz tomonida fayl yaratish, o'qish, bo'laklash va `createObjectURL` orqali yuklab olish yoki ko'rsatish mumkin. Katta fayllarni `slice` bilan bo'laklab yuklayman."

**Esda tuting:** `createObjectURL` bilan yaratilgan havolani `revokeObjectURL` qilmasangiz, Blob sahifa yopilguncha xotirada qoladi.

## Q65. URLSearchParams bilan URL parametrlari qanday o'qiladi? / How do you read and build query strings with URLSearchParams?

**Oddiy qilib aytganda:** URL oxiridagi `?q=kitob&page=2` qismi — **query string** (so'rov parametrlari). Uni qo'lda `split("&")` bilan ajratish xatolarga boy: bo'sh joy, `&` belgisi, o'zbekcha harflar... `URLSearchParams` buni to'g'ri va xavfsiz qiladi.

**Batafsilroq:**
- `new URLSearchParams(location.search)` yoki `new URL(url).searchParams`.
- `get("q")` — birinchi qiymat; `getAll("tag")` — takrorlanganlarning hammasi; `has`, `set`, `append`, `delete`.
- `toString()` — maxsus belgilarni avtomatik kodlaydi (encode).
- Barcha qiymatlar **satr**: `page` sonini `Number()` bilan aylantiring.

**Misol:**

```js
const url = new URL("https://shop.uz/search?q=o'zbek+tili&tag=kitob&tag=yangi&page=2");
const params = url.searchParams;

console.log(params.get("q"));       // o'zbek tili — "+" bo'sh joyga aylandi
console.log(params.getAll("tag"));  // [ 'kitob', 'yangi' ]
console.log(Number(params.get("page")) + 1); // 3

params.set("page", "3");
params.append("sort", "narx & reyting");
console.log(url.search); // ?q=o%27zbek+tili&tag=kitob&tag=yangi&page=3&sort=narx+%26+reyting
```

**Intervyuda shunday ayting:** "URLSearchParams query string'ni to'g'ri parse va encode qiladi, takroriy kalitlarni `getAll` bilan qo'llaydi. Qo'lda string birlashtirish o'rniga shuni ishlataman — maxsus belgilar va injection xatolaridan himoya qiladi. Qiymatlar doim string ekanini unutmayman."

**Esda tuting:** `+` query string'da bo'sh joyni bildiradi. Parametrga haqiqiy `+` belgisini yozish kerak bo'lsa, `URLSearchParams` uni `%2B` qilib o'zi kodlaydi — qo'lda yozmang.

## Q66. BroadcastChannel nima? / What is BroadcastChannel?

**Oddiy qilib aytganda:** bir saytni brauzerning bir nechta tabida ochdingiz. Birida tizimdan chiqsangiz, qolganlari ham bilishi kerak. **BroadcastChannel** — shu saytning barcha tablari, oynalari va worker'lari uchun umumiy **ratsiya**: biri gapirsa, hammasi eshitadi.

**Batafsilroq:**
- `new BroadcastChannel("kanal-nomi")` — shu nomdagi kanalga ulanish.
- `postMessage(data)` — xabar yuborish (yuboruvchining o'zi olmaydi).
- `onmessage` — xabar qabul qilish.
- Faqat **bir xil origin** (domen, protokol, port) ichida ishlaydi.
- Qo'llanishi: tablar orasida chiqish/kirish, savat yoki mavzu (dark mode) sinxronizatsiyasi.
- Node.js'da ham mavjud (worker'lar orasida).

**Misol:**

```js
const tabA = new BroadcastChannel("auth");
const tabB = new BroadcastChannel("auth");

tabB.onmessage = (event) => {
  console.log("B tab xabar oldi:", event.data);
  tabA.close();
  tabB.close();
};

tabA.postMessage({ type: "logout", at: "10:30" }); // B tab: { type: 'logout', at: '10:30' }
```

**Intervyuda shunday ayting:** "BroadcastChannel bir origin'dagi barcha tablar, oynalar va worker'lar orasida xabar almashish uchun. Men uni logout yoki holatni tablar orasida sinxronlashda ishlataman; eski brauzerlar uchun zaxira sifatida `storage` hodisasi bor."

**Esda tuting:** kanal kerak bo'lmay qolganda `close()` qiling, aks holda obyekt xotirada qoladi.

## Q67. IndexedDB nima va localStorage'dan farqi? / What is IndexedDB and how does it differ from localStorage?

**Oddiy qilib aytganda:** `localStorage` — cho'ntak daftarchasi: kichik, faqat matn, oddiy. **IndexedDB** — brauzer ichidagi **haqiqiy ma'lumotlar bazasi**: ko'p ma'lumot, obyektlar, fayllar, indeks bo'yicha tez qidiruv, tranzaksiyalar.

**Batafsilroq:**

| | localStorage | IndexedDB |
|---|---|---|
| Hajm | taxminan 5 MB | yuzlab MB (disk hajmiga bog'liq) |
| Ma'lumot turi | faqat satr | obyektlar, Blob, fayllar |
| API | sinxron (sahifani to'xtatadi) | asinxron |
| Qidiruv | faqat kalit bo'yicha | indekslar bo'yicha |
| Worker'da | yo'q | bor |

- Asosiy tushunchalar: **database** → **object store** (jadvalga o'xshash) → **index** → **transaction**.
- Xom API callback'larga asoslangan va noqulay; amalda `idb` kabi kichik o'rovchi kutubxona ishlatiladi.
- Qo'llanishi: oflayn ilovalar, katta kesh, qoralamalar.

**Misol:**

```javascript
const request = indexedDB.open("shop", 1);

request.onupgradeneeded = () => {
  const store = request.result.createObjectStore("products", { keyPath: "id" });
  store.createIndex("byCategory", "category");              // qidiruv uchun indeks
};

request.onsuccess = () => {
  const db = request.result;
  const tx = db.transaction("products", "readwrite");
  tx.objectStore("products").put({ id: 1, name: "Kitob", category: "ta'lim" });
  tx.oncomplete = () => {
    const read = db.transaction("products").objectStore("products").index("byCategory").getAll("ta'lim");
    read.onsuccess = () => console.log(read.result); // [{ id: 1, name: "Kitob", ... }]
  };
};
```

**Intervyuda shunday ayting:** "IndexedDB — brauzerdagi asinxron, tranzaksiyali obyekt bazasi: katta hajm, indekslar, binar ma'lumot va worker'larda ishlash. localStorage esa kichik, sinxron, faqat satrlar uchun. Oflayn rejim va katta keshda IndexedDB'ni `idb` o'rovchisi bilan ishlataman."

**Esda tuting:** brauzer xotira tanqisligida IndexedDB ma'lumotini o'chirishi mumkin. Muhim ma'lumot uchun `navigator.storage.persist()` so'rang va baribir serverda zaxira saqlang.

## Q68. Performance API bilan vaqtni qanday aniq o'lchaysiz? / How do you measure time precisely with the Performance API?

**Oddiy qilib aytganda:** `Date.now()` — oddiy devor soati: millisekund aniqlikda va kompyuter soati o'zgartirilsa, u ham "sakraydi". `performance.now()` — **sport sekundomeri**: juda aniq (millisekundning ulushlari) va faqat oldinga yuradi. Kod tezligini o'lchash uchun aynan sekundomer kerak.

**Batafsilroq:**
- `performance.now()` — sahifa yoki jarayon boshlanganidan beri o'tgan vaqt (kasr millisekundlarda).
- `performance.mark("nom")` va `performance.measure("o'lchov", "boshi", "oxiri")` — nomlangan belgilar; DevTools'ning Performance panelida ko'rinadi.
- Brauzerda: `PerformanceObserver` bilan sahifa yuklanishi, uzoq task'lar va Core Web Vitals kuzatiladi.
- Xavfsizlik uchun brauzerlar aniqlikni biroz kamaytiradi (Spectre hujumlaridan himoya).

**Misol:**

```js
performance.mark("sort-start");
const numbers = Array.from({ length: 200_000 }, () => Math.random());
numbers.sort((a, b) => a - b);
performance.mark("sort-end");

const measure = performance.measure("saralash", "sort-start", "sort-end");
console.log(`Saralash: ${measure.duration.toFixed(1)} ms`);

const start = performance.now();
JSON.parse(JSON.stringify(numbers));
console.log(`JSON aylantirish: ${(performance.now() - start).toFixed(1)} ms`);
```

**Intervyuda shunday ayting:** "Vaqt o'lchash uchun `performance.now()` ishlataman — u monoton va yuqori aniqlikda, `Date.now()` esa tizim soatiga bog'liq. Muhim bosqichlarni `mark`/`measure` bilan belgilayman, ular DevTools'da ko'rinadi. Bitta o'lchovga ishonmay, bir necha marta takrorlab o'rtachasini olaman."

**Esda tuting:** birinchi ishga tushirish odatda sekinroq bo'ladi (JIT hali optimallashtirmagan — Q89). O'lchashdan oldin "isitib" oling.

## Q69. console.table, console.group va console.time nima uchun kerak? / What are console.table, console.group and console.time for?

**Oddiy qilib aytganda:** `console.log` — hamma narsani bir qatorga yozadigan daftar. Konsolning boshqa asboblari natijani **tartibli** ko'rsatadi: jadval, papkalar va sekundomer. Xatoni topish (debugging) ancha tezlashadi.

**Batafsilroq:**
- `console.table(massiv)` — obyektlar ro'yxatini jadval ko'rinishida.
- `console.group("nom")` / `console.groupEnd()` — loglarni ichma-ich guruhlash.
- `console.time("nom")` / `console.timeEnd("nom")` — oddiy vaqt o'lchash.
- `console.count("nom")` — necha marta chaqirilganini sanaydi.
- `console.error` / `console.warn` — xato va ogohlantirishlar (stderr'ga yoziladi).
- `console.assert(shart, xabar)` — shart yolg'on bo'lsagina xabar chiqaradi.

**Misol:**

```js
const users = [{ name: "Ali", age: 25 }, { name: "Dilnoza", age: 31 }];
console.table(users);

console.group("Buyurtma #17");
console.log("Mahsulot: kitob");
console.log("Holat: yetkazildi");
console.groupEnd();

console.time("hisob");
let sum = 0;
for (let i = 0; i < 1e6; i++) sum += i;
console.timeEnd("hisob");            // hisob: 2.1ms (taxminan)

for (const _ of [1, 2, 3]) console.count("sikl"); // sikl: 1, sikl: 2, sikl: 3
console.assert(sum > 0, "Bu chiqmaydi — shart to'g'ri");
```

**Intervyuda shunday ayting:** "Debugging'da `console.table` bilan massivlarni, `group` bilan bog'liq loglarni, `time` bilan oddiy o'lchovlarni ishlataman. Production'da esa `console.log` o'rniga darajali, strukturalangan logger (pino kabi) va xatolarni kuzatish tizimi ishlatiladi."

**Esda tuting:** `console.log(obj)` brauzerda obyektni **havola** sifatida ko'rsatadi — keyin uni ochganingizda hozirgi (o'zgargan) qiymatni ko'rasiz. Aniq lahzani ko'rish uchun `console.log(structuredClone(obj))`.

## Q70. O'z xato klassingizni qanday yaratasiz? / How do you create custom error classes?

**Oddiy qilib aytganda:** hamma xato bir xil emas: "topilmadi", "ruxsat yo'q", "ma'lumot noto'g'ri". O'z xato klasslaringizni yaratsangiz, kod qaysi xato yuz berganini **aniq biladi** va har biriga mos javob beradi — xuddi shifokor "og'riq" emas, aniq tashxis qo'ygandek.

**Batafsilroq:**
- `class NotFoundError extends Error` — `Error`dan meros olasiz.
- `this.name`ni o'rnating — log va stack trace'da ko'rinadi.
- Qo'shimcha maydonlar qo'shish mumkin: `status`, `field`, `code`.
- `cause` — asl xatoni saqlash: `new Error("Saqlab bo'lmadi", { cause: originalError })`.
- `instanceof` bilan qaysi xato ekanini tekshirasiz.

**Misol:**

```js
class AppError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = new.target.name;           // AppError, NotFoundError...
  }
}
class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} topilmadi: ${id}`);
    this.status = 404;
  }
}

function findUser(id) {
  throw new NotFoundError("Foydalanuvchi", id);
}

try {
  findUser(42);
} catch (error) {
  if (error instanceof NotFoundError) console.log(error.status, error.name, error.message);
}

const wrapped = new AppError("Buyurtmani saqlab bo'lmadi", { cause: new Error("DB ulanmadi") });
console.log(wrapped.cause.message); // DB ulanmadi
```

**Intervyuda shunday ayting:** "Domen xatolari uchun `Error`dan meros olgan klasslar yarataman, `name` va kerakli maydonlarni (`status`, `code`) qo'shaman. Past darajadagi xatoni `cause` bilan o'rab, kontekst qo'shaman. Chaqiruvchi `instanceof` bilan xato turiga qarab javob beradi."

**Esda tuting:** `throw "xato matni"` qilmang — satrda stack trace yo'q. Har doim `Error` obyektini tashlang.

## Q71. Primitivlarning avtomatik obyektga o'ralishi (auto-boxing) nima? / What is auto-boxing of primitives?

**Oddiy qilib aytganda:** `"salom".toUpperCase()` — satr obyekt emas, lekin metodi bor! Qanday qilib? JavaScript bir lahzaga satrni **vaqtinchalik obyektga o'raydi** (`String` obyekti), metodni chaqiradi va o'ramni tashlab yuboradi. Bu **auto-boxing**.

**Batafsilroq:**
- `string`, `number`, `boolean`, `symbol`, `bigint` primitivlarida metod chaqirilganda shu jarayon bo'ladi.
- Vaqtinchalik obyektga xususiyat qo'shib bo'lmaydi: oddiy rejimda `str.foo = 1` jimgina yo'qoladi, **strict mode'da (ES modul, klass) esa `TypeError`** beradi.
- `new String("a")` — **haqiqiy obyekt** yaratadi. Buni hech qachon qilmang: `typeof` `"object"` bo'ladi, `===` ishlamaydi, `new Boolean(false)` esa `if` ichida `true`!
- `String(x)`, `Number(x)` — `new`siz — oddiy tur o'zgartirish, bu to'g'ri.

**Misol:**

```js
const text = "salom";
console.log(text.toUpperCase(), text.length); // SALOM 5 — vaqtincha o'ralgan

try {
  text.extra = "qo'shib bo'lmaydi"; // ES modul — strict mode
} catch (error) {
  console.log(error.name);          // TypeError (oddiy rejimda jimgina yo'qolardi)
}

const wrapped = new String("salom");
console.log(typeof wrapped, wrapped === "salom"); // object false

if (new Boolean(false)) console.log("new Boolean(false) — truthy obyekt!");
console.log(typeof String(42), String(42));       // string 42 — to'g'ri usul
```

**Intervyuda shunday ayting:** "Primitivda metod chaqirilganda JavaScript uni vaqtincha o'rovchi obyektga aylantiradi — shuning uchun `'abc'.length` ishlaydi. O'rovchi konstruktorlarni `new` bilan ishlatmayman, chunki ular obyekt yaratadi va taqqoslash hamda truthiness'ni buzadi."

**Esda tuting:** `new Boolean(false)` truthy — bu klassik intervyu tuzog'i.

## Q72. eval va new Function nega xavfli? / Why are eval and new Function dangerous?

**Oddiy qilib aytganda:** `eval("...")` — matnni **kod sifatida bajarish**. Agar bu matn foydalanuvchidan kelgan bo'lsa, siz begona odamga saytingizni boshqarish kalitini bergan bo'lasiz. Bu — ochiq eshik bilan uy qoldirishga o'xshaydi.

**Batafsilroq:**
- Xavf: foydalanuvchi kiritgan matn orqali istalgan kod bajarilishi (XSS, ma'lumot o'g'irlash).
- `new Function("a", "b", "return a + b")` — ham xuddi shunday xavfli, faqat lokal o'zgaruvchilarga kira olmaydi.
- Sekin: dvigatel bunday kodni oldindan optimallashtira olmaydi.
- Content Security Policy (CSP) odatda `eval`ni taqiqlaydi (`'unsafe-eval'` bo'lmasa).
- Deyarli har doim xavfsiz muqobil bor: JSON uchun `JSON.parse`, dinamik xususiyat uchun `obj[key]`, formulalar uchun alohida parser.

**Misol:**

```js
const userInput = '{"name":"Ali","age":20}';

// Xavfli: const data = eval("(" + userInput + ")");
// Agar kiritish '(() => { /* zararli kod */ })()' bo'lsa — u bajariladi!

const data = JSON.parse(userInput);        // xavfsiz — faqat ma'lumotni o'qiydi
console.log(data.name);

const field = "age";
console.log(data[field]);                  // dinamik kalit — eval kerak emas

try {
  JSON.parse("(() => 'hack')()");          // JSON.parse kodni bajarmaydi
} catch (error) {
  console.log("Rad etildi:", error.name);  // SyntaxError
}
```

**Intervyuda shunday ayting:** "`eval` va `new Function` satrni kod sifatida bajaradi — foydalanuvchi ma'lumoti bilan bu kod injection'ga olib keladi, CSP'ni buzadi va optimizatsiyani o'chiradi. JSON uchun `JSON.parse`, dinamik kalit uchun `obj[key]` ishlataman."

**Esda tuting:** `setTimeout("kod matni", 100)` ham ichida `eval` qiladi. Har doim funksiya bering: `setTimeout(() => ..., 100)`.

## Q73. Heap snapshot bilan xotira muammosini qanday topasiz? / How do you find memory problems with heap snapshots?

**Oddiy qilib aytganda:** heap snapshot — ma'lum bir lahzada xotiradagi **barcha obyektlarning surati**. Ikki suratni solishtirsangiz ("amaldan oldin" va "keyin"), qaysi obyektlar ko'payib ketganini va ularni **kim ushlab turganini** ko'rasiz — xuddi omborning ikki inventarizatsiyasini solishtirgandek.

**Batafsilroq:**
- Chrome DevTools → **Memory** → **Heap snapshot**. Node.js'da: `node --inspect` bilan DevTools'ga ulanish yoki `node --heapsnapshot-signal=SIGUSR2`.
- Qadamlar:
  1. sahifani ochib, 1-suratni oling;
  2. shubhali amalni bir necha marta takrorlang (masalan, modal oynani ochib-yoping);
  3. 2-suratni oling va **Comparison** rejimida qarang;
  4. ko'paygan obyektni tanlab, **Retainers** (uni kim ushlab turibdi) zanjirini o'qing.
- "Detached" deb belgilangan DOM elementlari — sahifadan olib tashlangan, lekin JS'da saqlanib qolganlar (Q91).

**Misol:**

```js
import v8 from "node:v8";

const leaks = [];
const before = process.memoryUsage().heapUsed;
for (let i = 0; i < 100_000; i++) leaks.push({ id: i, payload: "x".repeat(50) });
const after = process.memoryUsage().heapUsed;
console.log(`Heap o'sdi: ~${Math.round((after - before) / 1024 / 1024)} MB`);

// Surat faylga yoziladi va Chrome DevTools → Memory → Load orqali ochiladi:
// v8.writeHeapSnapshot("oldin.heapsnapshot");
console.log(typeof v8.writeHeapSnapshot); // function
```

**Intervyuda shunday ayting:** "Xotira sizishini topishda ikki-uch heap snapshot olib, Comparison rejimida o'sgan obyektlarni topaman, keyin Retainers orqali ularni ushlab turgan havolani — listener, kesh yoki closure'ni — aniqlayman. Node.js'da suratni signal yoki `v8.writeHeapSnapshot` bilan olaman."

**Esda tuting:** heap snapshot olish katta ilovada soniyalab vaqt oladi va xotirani ikki barobar ishlatadi — production'da ehtiyot bilan qiling.

## Q74. Prototype pollution nima va undan qanday himoyalanasiz? / What is prototype pollution and how do you prevent it?

**Oddiy qilib aytganda:** barcha obyektlar bitta umumiy "ota"dan — `Object.prototype`dan meros oladi (Q7). Agar hujumchi o'sha otaga yangi xususiyat qo'shib qo'ysa, u **dasturdagi barcha obyektlarda** paydo bo'ladi. Masalan, hammada birdan `isAdmin: true`! Bu — **prototype pollution** (prototipni ifloslantirish).

**Batafsilroq:**
- Qanday sodir bo'ladi: foydalanuvchi JSON'ini tekshiruvsiz "chuqur birlashtirish" (deep merge). `{"__proto__": {"isAdmin": true}}` kaliti `Object.prototype`ga yozilib ketadi.
- Himoya:
  1. xavfli kalitlarni (`__proto__`, `constructor`, `prototype`) rad etish;
  2. foydalanuvchi kalitlari uchun `Map` yoki `Object.create(null)` (prototipsiz obyekt);
  3. kiruvchi ma'lumotni sxema bilan tekshirish (Zod, Valibot);
  4. xavfsiz, yangilangan kutubxonalar ishlatish;
  5. qo'shimcha himoya sifatida `Object.freeze(Object.prototype)` — lekin bu ba'zi eski kutubxonalarni buzishi mumkin.

**Misol:**

```js
function unsafeMerge(target, source) {
  for (const key in source) {
    if (typeof source[key] === "object") unsafeMerge((target[key] ??= {}), source[key]);
    else target[key] = source[key];
  }
  return target;
}

const payload = JSON.parse('{"__proto__": {"isAdmin": true}}');
unsafeMerge({}, payload);
console.log({}.isAdmin);   // true — BARCHA obyektlar ifloslandi!
delete Object.prototype.isAdmin;

const FORBIDDEN = new Set(["__proto__", "constructor", "prototype"]);
function safeMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (FORBIDDEN.has(key)) continue;          // xavfli kalitni tashlab ketamiz
    if (value && typeof value === "object") safeMerge((target[key] ??= {}), value);
    else target[key] = value;
  }
  return target;
}
safeMerge({}, JSON.parse('{"__proto__": {"isAdmin": true}}'));
console.log({}.isAdmin);   // undefined — himoyalangan
```

**Intervyuda shunday ayting:** "Prototype pollution — hujumchi `__proto__` kabi kalit orqali `Object.prototype`ni o'zgartirishi, natijada barcha obyektlarga xususiyat qo'shiladi. Himoya: xavfli kalitlarni rad etish, foydalanuvchi kalitlari uchun `Map` yoki `Object.create(null)`, sxema validatsiyasi va zaif kutubxonalarni yangilash."

**Esda tuting:** `JSON.parse` `__proto__`ni oddiy kalit sifatida yaratadi — xavf aynan keyin, uni `for...in` yoki `Object.assign`ga o'xshash chuqur merge'da ishlatganda boshlanadi.

## Q75. script teglaridagi defer va async farqi nima? / What is the difference between defer and async on script tags?

**Oddiy qilib aytganda:** brauzer sahifani yuqoridan pastga o'qiydi. Oddiy `<script>` uchrasa, u **to'xtaydi**, skriptni yuklab bajaradi, keyin davom etadi — sahifa sekin ochiladi. `defer` va `async` skriptni **fonda** yuklashga ruxsat beradi:
- `defer` — "yuklab qo'y, lekin sahifa to'liq o'qilgach, **tartib bilan** bajar";
- `async` — "yuklanishi bilan **darhol** bajar, tartib muhim emas".

**Batafsilroq:**

| | Yuklash | Bajarish vaqti | Tartib |
|---|---|---|---|
| oddiy `<script>` | sahifani to'xtatadi | darhol | yozilgan tartibda |
| `defer` | fonda | HTML to'liq o'qilgach, `DOMContentLoaded`dan oldin | yozilgan tartibda |
| `async` | fonda | yuklanishi bilan | kafolatlanmagan |
| `type="module"` | fonda | `defer` kabi | yozilgan tartibda |

- Bir-biriga bog'liq asosiy skriptlar → `defer` (yoki `type="module"`).
- Mustaqil tashqi skriptlar (analitika, reklama) → `async`.
- Sahifa chizilishidan **oldin** ishlashi shart bo'lgan kichik skript (masalan, qorong'u rejimni tanlash) — oddiy `<script>` `<head>` ichida.

**Misol:**

```html
<head>
  <script src="/theme-init.js"></script>                   <!-- to'xtatadi: oq "chaqnash" bo'lmasin -->
  <script src="/vendor.js" defer></script>                 <!-- 1-bo'lib bajariladi -->
  <script src="/app.js" defer></script>                    <!-- 2-bo'lib, vendor.js'dan keyin -->
  <script src="https://analytics.example/a.js" async></script> <!-- qachon tayyor bo'lsa -->
</head>
```

**Intervyuda shunday ayting:** "Oddiy skript HTML tahlilini to'xtatadi. `defer` fonda yuklaydi va hujjat tahlil qilingach, tartib bilan bajaradi; `async` yuklanishi bilanoq, tartibsiz bajaradi. Ilova kodi uchun `defer` yoki `type="module"`, mustaqil uchinchi tomon skriptlari uchun `async` ishlataman."

**Esda tuting:** `async` skript DOM tayyor bo'lishidan oldin ishlashi mumkin — u sahifa elementlariga tayanmasligi kerak.

## Q76. Garbage collector mark-and-sweep algoritmi qanday ishlaydi? / How does the mark-and-sweep garbage collector work?

**Oddiy qilib aytganda:** farrosh ombordagi keraksiz narsalarni qanday aniqlaydi? U eshikdan (ildizdan) boshlab, har bir **yo'l bilan yetib boriladigan** narsaga yorliq yopishtiradi ("mark"). Keyin yorliqsiz qolgan hamma narsani olib chiqib tashlaydi ("sweep"). Hech kim yetib bora olmaydigan narsa — kerak emas.

**Batafsilroq:**
- **Ildizlar (roots)** — global obyekt, hozir bajarilayotgan funksiyalarning o'zgaruvchilari (stack).
- **Mark** — ildizlardan havolalar bo'ylab yurib, yetib boriladigan har bir obyektni belgilaydi.
- **Sweep** — belgilanmagan obyektlarning xotirasini bo'shatadi.
- Aylanma havolalar (A → B → A) muammo emas: ildizdan yetib borilmasa, ikkalasi ham o'chiriladi.
- V8 **avlodli** (generational) yondashuv qo'llaydi: yangi obyektlar kichik "yosh avlod"da tez-tez va arzon tozalanadi (ko'p obyekt tez "o'ladi"), uzoq yashaganlari "katta avlod"ga o'tadi va kamroq tozalanadi.

**Misol:**

```js
function createPair() {
  const a = { name: "A" };
  const b = { name: "B" };
  a.partner = b;
  b.partner = a;          // aylanma havola
  return a.name;          // funksiya tugagach, a va b ga ildizdan yo'l qolmaydi
}
console.log(createPair()); // A — ikkala obyekt keyingi GC'da tozalanadi

let user = { name: "Ali" };
const admins = [user];     // ikkinchi havola
user = null;               // birinchi havola uzildi...
console.log(admins[0].name); // Ali — ...lekin massiv hali ushlab turibdi, GC o'chirmaydi
```

**Intervyuda shunday ayting:** "Mark-and-sweep ildizlardan yetib boriladigan obyektlarni belgilaydi va qolganini tozalaydi, shuning uchun aylanma havolalar muammo emas. V8 buni avlodlarga bo'lib qiladi: qisqa umrli obyektlar arzon Scavenge bilan, uzoq umrlilar kamroq, lekin qimmatroq bosqichda. Xotira sizishi — ildizdan hali yetib boriladigan keraksiz obyekt."

**Esda tuting:** GC'ni JavaScript'dan majburan chaqirib bo'lmaydi va unga tayanmang. Kerak bo'lmagan havolalarni uzing — qolganini GC qiladi.

## Q77. Web Crypto API bilan qanday xavfsiz hash olinadi? / How do you hash data securely with the Web Crypto API?

**Oddiy qilib aytganda:** **hash** — ma'lumotning "barmoq izi": har qanday uzunlikdagi matndan qisqa, qayd etilgan uzunlikdagi kod chiqadi. Matnda bitta harf o'zgarsa, barmoq izi butunlay o'zgaradi. Orqaga — hashdan asl matnni topib bo'lmaydi. **Web Crypto** — shu va boshqa kriptografik amallarning brauzer va Node.js'ga o'rnatilgan, ishonchli versiyasi.

**Batafsilroq:**
- `crypto.subtle.digest("SHA-256", baytlar)` — hash; natija `ArrayBuffer`, uni hex'ga aylantirasiz.
- `crypto.randomUUID()`, `crypto.getRandomValues()` — xavfsiz tasodifiy qiymatlar. `Math.random()` xavfsizlik uchun **yaramaydi**.
- `crypto.subtle` faqat xavfsiz kontekstda (HTTPS yoki localhost) mavjud.
- **Parollarni** oddiy SHA-256 bilan saqlamang — u juda tez, buzish oson. Parollar uchun sekin, "tuzli" algoritmlar: bcrypt, scrypt, Argon2 (serverda).

**Misol:**

```js
async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

console.log(await sha256Hex("salom"));
console.log(await sha256Hex("Salom")); // bitta harf farq — butunlay boshqa hash
console.log(crypto.randomUUID());      // xavfsiz noyob ID
```

**Intervyuda shunday ayting:** "Web Crypto brauzer va Node'da standart kriptografiya beradi: `digest` bilan hash, `getRandomValues` va `randomUUID` bilan xavfsiz tasodif, shuningdek shifrlash va imzolash. Fayl yaxlitligini SHA-256 bilan tekshiraman, lekin parollarni faqat serverda Argon2 yoki bcrypt bilan saqlayman."

**Esda tuting:** o'zingiz kriptografik algoritm "o'ylab topmang". Faqat tekshirilgan standart funksiyalardan foydalaning.

## Q78. Custom Elements (Web Components) nima? / What are Custom Elements (Web Components)?

**Oddiy qilib aytganda:** HTML'da `<button>`, `<input>` kabi tayyor teglar bor. **Custom Elements** — o'zingizning yangi tegingizni yaratish: masalan `<star-rating>`. Uni istalgan sahifada, istalgan freymvork (React, Vue) bilan yoki freymvorksiz ishlatish mumkin.

**Batafsilroq:**
- `class StarRating extends HTMLElement` — element klassi.
- `customElements.define("star-rating", StarRating)` — ro'yxatdan o'tkazish. Nomda **tire bo'lishi shart** (`star-rating`), oddiy HTML teglardan farqlash uchun.
- Hayot sikli metodlari: `connectedCallback` (sahifaga qo'shildi), `disconnectedCallback` (olib tashlandi), `attributeChangedCallback` (atribut o'zgardi, `observedAttributes` bilan).
- Web Components uch qismdan iborat: Custom Elements, Shadow DOM (Q79), `<template>`.

**Misol:**

```javascript
class StarRating extends HTMLElement {
  static observedAttributes = ["value"];

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const value = Number(this.getAttribute("value") ?? 0);
    this.textContent = "★".repeat(value) + "☆".repeat(5 - value);
    this.setAttribute("aria-label", `5 dan ${value} yulduz`);
  }
}

customElements.define("star-rating", StarRating);
// HTML: <star-rating value="4"></star-rating>  →  ★★★★☆
```

**Intervyuda shunday ayting:** "Custom Elements `HTMLElement`dan meros olgan klass orqali yangi HTML teg yaratadi va `connectedCallback`, `attributeChangedCallback` kabi hayot sikli metodlariga ega. Ular freymvorkdan mustaqil, shuning uchun dizayn tizimi komponentlarini turli loyihalarda qayta ishlatish uchun qulay."

**Esda tuting:** custom element nomi tiresiz bo'lsa, `define` xato beradi. Bir nomni ikki marta `define` qilish ham xato.

## Q79. Shadow DOM nima? / What is the Shadow DOM?

**Oddiy qilib aytganda:** Shadow DOM — komponent uchun **alohida xona**: uning ichidagi CSS tashqariga "oqib chiqmaydi", tashqaridagi CSS esa ichkariga kirmaydi. Sahifadagi `button { color: red }` uslubi komponent ichidagi tugmani buzmaydi.

**Batafsilroq:**
- `this.attachShadow({ mode: "open" })` — elementga "soya daraxti" biriktiriladi.
- Soya ichidagi uslublar faqat shu komponentga ta'sir qiladi (inkapsulyatsiya).
- `<slot>` — foydalanuvchi elementga qo'ygan kontent qayerda ko'rinishini belgilaydi.
- Tashqaridan sozlash: CSS o'zgaruvchilari (`--brand-color`) ichkariga o'tadi; `::part()` bilan ma'lum qismlarni uslublash mumkin.
- Brauzerning o'zi ham undan foydalanadi: `<video>`, `<input type="range">` ichki qismlari shadow DOM'da.

**Misol:**

```javascript
class InfoCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        .card { border: 1px solid var(--card-border, #ccc); padding: 12px; border-radius: 8px; }
        h3 { margin: 0; }            /* faqat shu komponentdagi h3 ga ta'sir qiladi */
      </style>
      <div class="card">
        <h3><slot name="title">Sarlavha</slot></h3>
        <slot></slot>
      </div>`;
  }
}
customElements.define("info-card", InfoCard);
// <info-card><span slot="title">Eslatma</span>Ertaga dars bor.</info-card>
```

**Intervyuda shunday ayting:** "Shadow DOM komponentga izolyatsiya qilingan DOM va CSS doirasini beradi: ichki uslublar tashqariga chiqmaydi va tashqi uslublar ichkariga kirmaydi. Kontent `slot`lar orqali joylanadi, tashqi sozlash esa CSS o'zgaruvchilari va `::part` bilan qilinadi."

**Esda tuting:** global CSS kutubxonalari (masalan, Bootstrap) shadow DOM ichiga ta'sir qilmaydi — ularni komponent ichiga alohida ulash kerak.

## Q80. HTML Drag and Drop API qanday ishlaydi? / How does the HTML Drag and Drop API work?

**Oddiy qilib aytganda:** Drag and Drop — elementni sichqoncha bilan **ushlab, boshqa joyga olib borib, tashlash**. Masalan, vazifani "Bajarilmoqda" ustunidan "Tayyor" ustuniga sudrab o'tkazish.

**Batafsilroq:**
- Sudraladigan element: `draggable="true"` atributi.
- Hodisalar: `dragstart` (boshlandi) → `dragover` (ustidan o'tmoqda) → `drop` (tashlandi) → `dragend`.
- `event.dataTransfer.setData("text/plain", id)` — nimani ko'chirayotganingizni saqlash; `drop`da `getData` bilan olish.
- `dragover`da `event.preventDefault()` **shart** — aks holda brauzer tashlashga ruxsat bermaydi.
- Kamchiliklari: mobil qurilmalarda qo'llab-quvvatlash yomon, klaviatura bilan ishlamaydi. Amalda ko'pincha Pointer Events asosidagi kutubxonalar (dnd-kit, SortableJS) ishlatiladi.

**Misol:**

```javascript
// <li draggable="true" data-id="t1">Vazifa</li>   <ul id="done"></ul>
document.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", event.target.dataset.id);
});

const done = document.querySelector("#done");
done.addEventListener("dragover", (event) => event.preventDefault()); // tashlashga ruxsat
done.addEventListener("drop", (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain");
  done.append(document.querySelector(`[data-id="${id}"]`));
});
```

**Intervyuda shunday ayting:** "HTML DnD `draggable`, `dragstart`, `dragover` va `drop` hodisalari hamda `dataTransfer` bilan ishlaydi; `dragover`da `preventDefault` qilmasa, drop ishlamaydi. Sensorli ekran va klaviatura yordami zaif bo'lgani uchun productionda odatda pointer-asosidagi kutubxona va klaviatura muqobilini beraman."

**Esda tuting:** sudrab tashlashni har doim **accessible muqobil** bilan bering (masalan, "Ko'chirish" tugmasi yoki menyu).

## Q81. WebSocket nima va qachon kerak? / What is a WebSocket and when do you need it?

**Oddiy qilib aytganda:** oddiy HTTP — **xat almashish**: siz so'raysiz, server javob beradi, aloqa tugaydi. Server o'zi birinchi bo'lib yoza olmaydi. **WebSocket** — **telefon qo'ng'irog'i**: bir marta ulanasiz va ikki tomon ham istalgan vaqtda gapira oladi. Chat, onlayn o'yinlar, jonli kotirovkalar uchun.

**Batafsilroq:**
- Ulanish oddiy HTTP so'rovi bilan boshlanadi, keyin "WebSocket'ga o'tamiz" (Upgrade) deb doimiy ulanishga aylanadi.
- Manzil: `ws://` yoki shifrlangan `wss://` (productionda faqat `wss`).
- Hodisalar: `open`, `message`, `close`, `error`; yuborish — `send()`.
- Ulanish uzilishi mumkin — **qayta ulanish** mantiqini (kutish vaqtini oshirib borib) o'zingiz yozasiz.
- Masshtablash qiyinroq: har bir foydalanuvchi serverga doimiy ulanadi; bir nechta server bo'lsa, xabarlarni Redis pub/sub kabi vosita orqali tarqatish kerak.
- Node.js 22+ da `WebSocket` klienti global mavjud.

**Misol:**

```javascript
const socket = new WebSocket("wss://chat.example.uz/room/42");

socket.addEventListener("open", () => socket.send(JSON.stringify({ type: "join", user: "Ali" })));
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  console.log(`${message.user}: ${message.text}`);
});
socket.addEventListener("close", () => {
  setTimeout(() => console.log("Qayta ulanish..."), 2_000); // oddiy reconnect
});
```

**Intervyuda shunday ayting:** "WebSocket bitta TCP ulanish ustida ikki tomonlama, doimiy aloqa beradi — chat va real-vaqt yangilanishlari uchun. Productionda `wss`, heartbeat, eksponensial kechikishli qayta ulanish va bir nechta server uchun pub/sub'ni hisobga olaman. Faqat serverdan mijozga oqim kerak bo'lsa, oddiyroq SSE yetarli."

**Esda tuting:** WebSocket'da ham autentifikatsiya kerak — ulanishda tokenni tekshiring, har bir xabarni ham validatsiya qiling.

## Q82. IndexedDB'da cursor bilan ma'lumotlarni qanday aylanib chiqasiz? / How do you iterate over IndexedDB data with a cursor?

**Oddiy qilib aytganda:** `getAll()` hamma yozuvni **birdan** xotiraga oladi — 100 000 ta yozuvda bu og'ir. **Cursor** — kitob varaqlagichga o'xshaydi: yozuvlarni **bittadan** ko'rsatadi, siz "keyingisi" (`continue()`) deysiz. Xotirada faqat joriy yozuv turadi.

**Batafsilroq:**
- `store.openCursor(range, direction)` — cursor ochish; `range` — kalitlar oralig'i (`IDBKeyRange.bound(1, 100)`), `direction` — `"next"` yoki teskari `"prev"`.
- Har bir `onsuccess`da `cursor.value` — joriy yozuv; `cursor.continue()` — keyingisiga o'tish; `cursor` `null` bo'lsa — tugadi.
- `cursor.update(yangiQiymat)` va `cursor.delete()` — joyida o'zgartirish (`readwrite` tranzaksiyada).
- Faqat kalitlar kerak bo'lsa, `openKeyCursor` tezroq.
- Sahifalash uchun `cursor.advance(n)` — n ta yozuvni o'tkazib yuborish.

**Misol:**

```javascript
function forEachOrder(db, onOrder) {
  return new Promise((resolve, reject) => {
    const store = db.transaction("orders").objectStore("orders");
    const request = store.openCursor(IDBKeyRange.lowerBound(1000), "prev"); // 1000-dan boshlab, teskari
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return resolve();      // yozuvlar tugadi
      onOrder(cursor.value);              // joriy yozuv
      cursor.continue();                  // keyingisi
    };
    request.onerror = () => reject(request.error);
  });
}
```

**Intervyuda shunday ayting:** "Cursor IndexedDB yozuvlarini diapazon va yo'nalish bo'yicha birma-bir aylanib chiqadi, shuning uchun katta store'ni to'liq xotiraga yuklamaydi. `readwrite` tranzaksiyada `update` va `delete` bilan joyida o'zgartirish mumkin."

**Esda tuting:** tranzaksiya ichida boshqa asinxron ishni (`fetch`) kutmang — tranzaksiya avtomatik yopilib qoladi va cursor ishlamay qoladi.

## Q83. Server-Sent Events (SSE) va WebSocket farqi nima? / What is the difference between Server-Sent Events and WebSockets?

**Oddiy qilib aytganda:** **SSE** — **radio**: faqat server gapiradi, siz eshitasiz. **WebSocket** — **telefon**: ikkala tomon ham gapiradi (Q81). Agar sizga faqat serverdan yangiliklar kerak bo'lsa (bildirishnoma, jarayon holati, AI javobining asta-sekin chiqishi), radio yetarli va oddiyroq.

**Batafsilroq:**

| | SSE | WebSocket |
|---|---|---|
| Yo'nalish | faqat server → mijoz | ikki tomonlama |
| Protokol | oddiy HTTP | alohida (Upgrade) |
| Qayta ulanish | **avtomatik** | qo'lda yoziladi |
| Ma'lumot | faqat matn | matn va binar |
| Proxy/CDN bilan | oson | ba'zan qo'shimcha sozlash |

- Brauzerda: `new EventSource(url)`; server `Content-Type: text/event-stream` bilan `data: ...\n\n` formatida yozadi.
- ChatGPT kabi AI chat'lar javobni ko'pincha SSE ko'rinishidagi stream bilan yuboradi.

**Misol:**

```js
import http from "node:http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache" });
  let n = 0;
  const timer = setInterval(() => {
    res.write(`data: ${JSON.stringify({ progress: ++n * 25 })}\n\n`);   // SSE formati
    if (n === 4) { clearInterval(timer); res.end(); }
  }, 20);
}).listen(0);

const response = await fetch(`http://127.0.0.1:${server.address().port}`);
const text = await response.text();
console.log(text.trim().split("\n\n"));  // [ 'data: {"progress":25}', ... ]
server.close();
// Brauzerda: new EventSource("/progress").onmessage = (e) => console.log(e.data);
```

**Intervyuda shunday ayting:** "SSE — HTTP ustida serverdan mijozga bir tomonlama matnli oqim, avtomatik qayta ulanish bilan. WebSocket ikki tomonlama va binar ma'lumotni qo'llaydi. Bildirishnoma va progress uchun SSE'ni tanlayman — oddiyroq va infratuzilma bilan yaxshi ishlaydi; chat va o'yin uchun WebSocket."

**Esda tuting:** HTTP/1.1'da brauzer bir domenga ~6 ta ulanish ochadi — ko'p tabli SSE ularni tugatib qo'yishi mumkin. HTTP/2 bu muammoni hal qiladi.

## Q84. Page Visibility API nima uchun kerak? / What is the Page Visibility API for?

**Oddiy qilib aytganda:** foydalanuvchi boshqa tabga o'tdi yoki telefonni qulfladi — sahifangizni hech kim ko'rmayapti. Unda nega animatsiya aylantirish, videoni ko'rsatish yoki har soniyada serverga so'rov yuborish kerak? **Page Visibility API** "sahifa hozir ko'rinyaptimi?" savoliga javob beradi — batareya va trafik tejaladi.

**Batafsilroq:**
- `document.visibilityState` — `"visible"` yoki `"hidden"`.
- `visibilitychange` hodisasi — holat o'zgarganda.
- Qo'llanishi: polling'ni to'xtatish, videoni pauza qilish, animatsiyani to'xtatish, sahifa yashirilganda ma'lumotni saqlab qo'yish (analitika, qoralama).
- Mobil qurilmada `hidden` bo'lish — ko'pincha sahifaning **oxirgi ishonchli lahzasi** (keyin brauzer uni yopishi mumkin). Ma'lumotni aynan shu paytda yuboring.

**Misol:**

```javascript
let pollTimer;
const startPolling = () => { pollTimer = setInterval(refreshNotifications, 30_000); };
const stopPolling = () => clearInterval(pollTimer);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    stopPolling();
    navigator.sendBeacon("/api/analytics", JSON.stringify({ event: "hidden" })); // oxirgi imkoniyat
  } else {
    refreshNotifications();   // qaytganda darhol yangilash
    startPolling();
  }
});
startPolling();
```

**Intervyuda shunday ayting:** "Page Visibility API sahifa ko'rinmaganini bildiradi. Men u bilan polling va animatsiyalarni to'xtataman, qaytganda yangilayman va `hidden` holatida saqlanmagan ma'lumotni `sendBeacon` yoki `fetch keepalive` bilan yuboraman, chunki mobil brauzerlar yashirilgan sahifani ogohlantirishsiz yopishi mumkin."

**Esda tuting:** `unload` va `beforeunload` hodisalari mobil qurilmalarda ishonchsiz. Ma'lumotni saqlash uchun `visibilitychange` ishlating.

## Q85. Onlayn/oflayn holatni qanday kuzatasiz? / How do you monitor online and offline status?

**Oddiy qilib aytganda:** `navigator.onLine` — "internet bormi?" degan tezkor savol. `online` va `offline` hodisalari esa holat o'zgarganini xabar qiladi. Masalan, internet uzilsa — "Siz oflaynsiz" banneri, qaytsa — saqlanmagan ma'lumotni yuborish.

**Batafsilroq:**
- `navigator.onLine === false` — aniq: tarmoq yo'q.
- `navigator.onLine === true` — faqat "tarmoq kartasi ulangan" degani. Wi-Fi bor, lekin internet yo'q bo'lishi mumkin!
- Shuning uchun haqiqiy tekshiruv — so'rovni yuborib, natijaga qarash. `online` hodisasi esa "qayta urinib ko'rish vaqti keldi" signali sifatida foydali.
- Bu portal ham shunday qiladi: baholar navbatda turadi, `online` hodisasida qayta yuboriladi.

**Misol:**

```javascript
const banner = document.querySelector("#offline-banner");
const queue = JSON.parse(localStorage.getItem("pending") ?? "[]");

function updateStatus() {
  banner.hidden = navigator.onLine;
}

async function flushQueue() {
  while (queue.length) {
    try {
      await fetch("/api/save", { method: "POST", body: JSON.stringify(queue[0]) });
      queue.shift();                                   // muvaffaqiyatli — navbatdan olamiz
      localStorage.setItem("pending", JSON.stringify(queue));
    } catch {
      break;                                           // hali ham tarmoq yo'q — keyinroq
    }
  }
}

window.addEventListener("offline", updateStatus);
window.addEventListener("online", () => { updateStatus(); flushQueue(); });
updateStatus();
```

**Intervyuda shunday ayting:** "`navigator.onLine` false bo'lsa, tarmoq aniq yo'q, lekin true internet borligini kafolatlamaydi. Men `offline`/`online` hodisalarini UI va qayta urinish signali sifatida ishlataman, haqiqiy holatni esa so'rov natijasidan bilaman. Oflaynda o'zgarishlarni navbatga yozib, qayta ulanganda yuboraman."

**Esda tuting:** qayta urinishlarda **idempotentlik** muhim — bitta o'zgarish ikki marta yuborilsa, ikki marta saqlanib qolmasligi kerak.

## Q86. Clipboard API bilan matn qanday nusxalanadi? / How do you copy text with the Clipboard API?

**Oddiy qilib aytganda:** "Nusxalash" tugmasi — kod, havola yoki promokodni bir bosishda buferga (clipboard) olish. `navigator.clipboard.writeText(matn)` shu ishni qiladi. Eski usul (`document.execCommand("copy")`) endi eskirgan.

**Batafsilroq:**
- `writeText` va `readText` — **asinxron**, Promise qaytaradi.
- Faqat xavfsiz kontekstda (HTTPS, localhost) ishlaydi.
- Yozish odatda foydalanuvchi harakati (tugma bosish) ichida bo'lishi kerak.
- **O'qish** (`readText`) foydalanuvchi ruxsatini talab qiladi — sayt buferni jimgina o'qiy olmaydi (xavfsizlik).
- Rasm va boshqa formatlar: `navigator.clipboard.write([new ClipboardItem(...)])`.

**Misol:**

```javascript
document.querySelectorAll("button.copy").forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.closest("pre").querySelector("code").textContent;
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = "Nusxalandi ✓";
    } catch {
      button.textContent = "Nusxalab bo'lmadi";   // ruxsat yo'q yoki HTTPS emas
    }
    setTimeout(() => (button.textContent = "Nusxalash"), 2_000);
  });
});
```

**Intervyuda shunday ayting:** "Clipboard API asinxron `writeText`/`readText` beradi, faqat HTTPS'da ishlaydi. Yozishni foydalanuvchi harakatiga bog'layman, xatoni ushlab foydalanuvchiga natijani ko'rsataman; o'qish esa ruxsat talab qiladi."

**Esda tuting:** nusxalash natijasini **ekran o'quvchilarga** ham bildiring (masalan, `aria-live` hududi orqali) — faqat vizual belgi yetarli emas.

## Q87. Web Audio API nima? / What is the Web Audio API?

**Oddiy qilib aytganda:** `<audio>` tegi — tayyor musiqa pleer: faqat qo'yish va to'xtatish. **Web Audio API** — **ovoz studiyasi**: ovoz yaratish, effektlar (ovoz balandligi, filtr, aks-sado) qo'shish, ovozni tahlil qilish (masalan, musiqa ritmida sakraydigan vizualizator).

**Batafsilroq:**
- Hamma narsa `AudioContext` ichida bo'ladi.
- Ovoz **tugunlar (node)** zanjiridan o'tadi: manba (`OscillatorNode` — sof ton, `AudioBufferSourceNode` — fayl) → effektlar (`GainNode` — balandlik, `BiquadFilterNode`) → `destination` (karnay).
- Brauzerlar ovozni **foydalanuvchi harakatisiz** boshlashga ruxsat bermaydi (autoplay siyosati) — `AudioContext`ni tugma bosilganda yarating yoki `resume()` qiling.
- Qo'llanishi: o'yinlar, sintezatorlar, audio muharrirlar, vizualizatsiya.

**Misol:**

```javascript
document.querySelector("#beep").addEventListener("click", () => {
  const context = new AudioContext();            // foydalanuvchi bosganidan keyin — autoplay'ga mos
  const oscillator = context.createOscillator(); // manba: sof ton
  const gain = context.createGain();             // balandlik boshqaruvi

  oscillator.frequency.value = 440;              // "La" notasi
  gain.gain.setValueAtTime(0.2, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1); // asta so'nish

  oscillator.connect(gain).connect(context.destination); // manba → effekt → karnay
  oscillator.start();
  oscillator.stop(context.currentTime + 1);
});
```

**Intervyuda shunday ayting:** "Web Audio API ovozni tugunlar grafi sifatida qayta ishlaydi: manba, effektlar va destination. Vaqt `context.currentTime` bo'yicha aniq rejalashtiriladi. Autoplay siyosati tufayli kontekstni foydalanuvchi harakatidan keyin yarataman yoki davom ettiraman."

**Esda tuting:** har bir tovush uchun yangi `AudioContext` yaratmang — bittasini qayta ishlating, aks holda brauzer cheklovga yetadi.

## Q88. Battery Status API nima va hozir ishlatish mumkinmi? / What is the Battery Status API and can you still use it?

**Oddiy qilib aytganda:** bu API sahifaga batareya holatini aytadi: necha foiz qolgan, zaryadlanyaptimi. G'oya — batareya kam bo'lganda og'ir ishlarni (animatsiya, video) kamaytirish. **Lekin** bu API ko'p brauzerlarda **yo'q**, chunki u foydalanuvchini kuzatish (fingerprinting) uchun suiiste'mol qilingan.

**Batafsilroq:**
- `navigator.getBattery()` — Promise, natijada `level` (0 dan 1 gacha), `charging` va `levelchange`, `chargingchange` hodisalari.
- **Qo'llab-quvvatlash:** faqat Chromium asosidagi brauzerlar (Chrome, Edge). Firefox uni maxfiylik sababli olib tashlagan, Safari hech qachon qo'shmagan.
- Shuning uchun har doim **mavjudligini tekshiring** va API yo'q bo'lsa ham ilova normal ishlasin (progressive enhancement — "bor bo'lsa, foydalan").
- Tejash uchun ishonchliroq signallar: `prefers-reduced-motion` va Page Visibility (Q84).

**Misol:**

```javascript
async function adaptToBattery() {
  if (!("getBattery" in navigator)) return;          // Firefox, Safari — jim o'tamiz
  const battery = await navigator.getBattery();
  const update = () => {
    const low = battery.level < 0.2 && !battery.charging;
    document.documentElement.classList.toggle("power-saving", low);
  };
  battery.addEventListener("levelchange", update);
  battery.addEventListener("chargingchange", update);
  update();
}
adaptToBattery();
```

**Intervyuda shunday ayting:** "Battery Status API batareya darajasi va zaryadlanish holatini beradi, lekin maxfiylik muammolari tufayli faqat Chromium'da qolgan. Men uni faqat progressive enhancement sifatida, mavjudligini tekshirib ishlataman; asosiy mantiq unga bog'liq bo'lmasligi kerak."

**Esda tuting:** intervyuda "bu API hamma joyda ishlaydi" deyish xato — aynan qo'llab-quvvatlash cheklangani yaxshi javobning bir qismi.

## Q89. V8'dagi JIT kompilyatsiya qanday ishlaydi? / How does JIT compilation work in V8?

**Oddiy qilib aytganda:** JavaScript kodini tushunish uchun V8 avval uni **sekin, lekin darhol** bajaradi (interpretator — tarjimon qog'ozdan o'qib beradi). Qaysi funksiyalar **tez-tez** chaqirilishini kuzatadi va ularni **tezkor mashina kodiga** aylantiradi (kompilyator — matnni yod olib, erkin gapiradi). Bu **JIT** — "Just-In-Time", ya'ni "kerak bo'lgan paytda kompilyatsiya".

**Batafsilroq:**
- **Ignition** — interpretator: kodni bytecode'ga aylantirib bajaradi, tez ishga tushadi.
- Bajarilish paytida tiplar haqida ma'lumot yig'iladi (bu funksiyaga doim son keladimi?).
- **Sparkplug**, **Maglev** — oraliq, tez kompilyatorlar.
- **TurboFan** — "issiq" (ko'p chaqiriladigan) funksiyalarni yig'ilgan ma'lumotga asoslanib, eng tez mashina kodiga optimallashtiradi.
- **Deoptimizatsiya** — agar taxmin buzilsa (funksiyaga son o'rniga to'satdan satr kelsa), V8 optimallashtirilgan kodni tashlab, sekin versiyaga qaytadi.
- Amaliy xulosa: funksiyaga **bir xil tipdagi** argumentlar bering — kod tezroq bo'ladi.

**Misol:**

```js
function add(a, b) { return a + b; }

let start = performance.now();
for (let i = 0; i < 5_000_000; i++) add(i, 1);           // doim son — TurboFan optimallashtiradi
console.log(`Bir xil tiplar: ${(performance.now() - start).toFixed(1)} ms`);

start = performance.now();
for (let i = 0; i < 5_000_000; i++) add(i % 2 ? i : String(i), 1); // son va satr aralash
console.log(`Aralash tiplar: ${(performance.now() - start).toFixed(1)} ms`); // odatda ancha sekin
```

**Intervyuda shunday ayting:** "V8 kodni avval Ignition interpretatorida bajaradi va tip ma'lumotlarini yig'adi, issiq funksiyalarni esa Maglev va TurboFan optimallashtiradi. Taxminlar buzilsa, deoptimizatsiya bo'ladi. Shuning uchun issiq kodda tiplar va obyekt shakllarini barqaror saqlayman."

**Esda tuting:** mikro-benchmark natijalari chalg'itishi mumkin — optimizator ba'zan kodni butunlay olib tashlaydi. Haqiqiy kodni profiler bilan o'lchang.

## Q90. V8'dagi hidden class va inline caching nima? / What are hidden classes and inline caching in V8?

**Oddiy qilib aytganda:** kutubxonachi har bir kitobning qayerda turganini bilsa, uni darhol oladi. V8 ham obyektlarning **"shakli"**ni (qaysi xususiyatlar, qaysi tartibda) eslab qoladi — bu **hidden class**. Bir xil shakldagi obyektlarda `user.name` qayerda turishini bir marta topib, **eslab qoladi** (inline caching) va keyingi safar darhol oladi.

**Batafsilroq:**
- Obyektga xususiyat qo'shilgan har bir **tartib** yangi hidden class hosil qiladi.
- `{ x, y }` va `{ y, x }` — **ikki xil** shakl, garchi xususiyatlar bir xil bo'lsa ham.
- Bir joyda doim bir xil shakldagi obyektlar kelsa — **monomorphic** (eng tez). 2–4 xil — polymorphic. Juda ko'p xil — megamorphic (sekin).
- Amaliy qoidalar:
  1. barcha xususiyatlarni konstruktorda, **bir xil tartibda** yarating;
  2. keyin xususiyat qo'shmang va `delete` qilmang (qiymatni `undefined`/`null` qiling).

**Misol:**

```js
class Point {
  constructor(x, y) { this.x = x; this.y = y; } // doim bir xil tartib — bitta shakl
}
const points = Array.from({ length: 1_000_000 }, (_, i) => new Point(i, i));

const start = performance.now();
let sum = 0;
for (const p of points) sum += p.x;             // monomorphic — juda tez
console.log(`Yig'indi: ${sum}, ${(performance.now() - start).toFixed(1)} ms`);

const a = { x: 1 }; a.y = 2;   // shakl: x → x,y
const b = { y: 2 }; b.x = 1;   // shakl: y → y,x — boshqa hidden class
console.log(Object.keys(a), Object.keys(b)); // [ 'x', 'y' ] [ 'y', 'x' ]
```

**Intervyuda shunday ayting:** "V8 obyekt tuzilishini hidden class sifatida kuzatadi va xususiyatga kirish joyini inline cache'da saqlaydi. Bir xil shakldagi obyektlar kodni monomorphic va tez qiladi. Shuning uchun xususiyatlarni konstruktorda bir xil tartibda e'lon qilaman va issiq obyektlarda `delete` ishlatmayman."

**Esda tuting:** bu optimizatsiyalar faqat **juda ko'p** chaqiriladigan kodda seziladi. Oddiy biznes kodda o'qilishi oson kod muhimroq.

## Q91. Detached DOM element nima va u xotirani qanday sizdiradi? / What are detached DOM elements and how do they leak memory?

**Oddiy qilib aytganda:** siz sahifadan elementni olib tashladingiz (`remove()`), lekin JavaScript o'zgaruvchisida unga havola qolib ketdi. Element ekranda yo'q, lekin xotirada **"arvoh"** bo'lib yashayveradi — va u o'z bolalari, listener'lari bilan birga katta joy egallashi mumkin. Bu **detached** (uzilgan) element.

**Batafsilroq:**
- Tipik sabablar:
  1. elementni massiv yoki `Map`da saqlab, sahifadan o'chirganda ro'yxatdan olib tashlamaslik;
  2. o'chirilgan elementga qo'yilgan listener boshqa, uzoq yashovchi obyektga (masalan, `window`) bog'langan;
  3. closure ichida element havolasi qolishi.
- Aniqlash: Chrome DevTools → Memory → Heap snapshot → qidiruvda **"Detached"** (Q73).
- Yechim: havolani ham tozalash, element metama'lumoti uchun `WeakMap` (Q14), listener'larni olib tashlash yoki `AbortController` signali bilan birdaniga uzish.

**Misol:**

```javascript
const openModals = [];                        // ❌ uzoq yashovchi ro'yxat

function openModal() {
  const modal = document.createElement("div");
  document.body.append(modal);
  openModals.push(modal);                     // havola saqlanadi
  const controller = new AbortController();
  window.addEventListener("resize", () => position(modal), { signal: controller.signal });
  return () => {
    modal.remove();                           // sahifadan o'chdi...
    openModals.splice(openModals.indexOf(modal), 1); // ✅ ...havola ham olib tashlandi
    controller.abort();                       // ✅ listener ham uzildi
  };
}
```

**Intervyuda shunday ayting:** "Detached DOM — hujjatdan olib tashlangan, lekin JavaScript havolasi hali ushlab turgan element; GC uni va butun ichki daraxtini tozalay olmaydi. Uni heap snapshot'da 'Detached' qidiruvi bilan topaman va o'chirishda ro'yxatlardagi havolalar hamda listener'larni ham tozalayman."

**Esda tuting:** freymvorklar (React, Vue) odatda buni o'zlari boshqaradi — lekin `useEffect` cleanup'ini yozmasangiz, xuddi shu muammo qaytadi.

## Q92. JavaScript turlarni taqqoslashda qanday o'zgartiradi (<, >, ==)? / How does JavaScript convert types in comparisons (<, >, ==)?

**Oddiy qilib aytganda:** turli tipdagi qiymatlarni solishtirganda JavaScript ularni "bir tilga tarjima qiladi": ko'pincha **songa**. Lekin qoidalar kutilmagan natija berishi mumkin. Masalan, `"10" < "9"` — `true`, chunki ikkala tomon ham satr va ular **harfma-harf** solishtiriladi.

**Batafsilroq:**
- `<`, `>` qoidasi:
  1. obyektlar avval primitivga aylantiriladi (`valueOf`/`toString`);
  2. **ikkalasi ham satr** bo'lsa — lug'at tartibida (belgi kodlari bo'yicha) solishtiriladi;
  3. aks holda ikkalasi ham **songa** aylantiriladi.
- `null` songa `0` bo'ladi, `undefined` esa `NaN`. `NaN` bilan har qanday solishtirish — `false`.
- `==` o'z qoidalariga ega: `null == undefined` → `true`, lekin `null == 0` → `false`.
- Amaliy qoida: har doim `===`; solishtirishdan oldin tiplarni **o'zingiz** aniq o'zgartiring (`Number(x)`).

**Misol:**

```js
console.log("10" < "9");        // true  — ikkala satr: "1" < "9"
console.log("10" < 9);          // false — satr songa aylandi: 10 < 9
console.log(null >= 0, null == 0); // true false — ">=" songa aylantiradi, "==" yo'q
console.log(undefined > 0, undefined < 0); // false false — NaN
console.log([2] > 1);           // true  — [2] → "2" → 2
console.log(["10", "9", "100"].sort());                  // [ '10', '100', '9' ] — satr tartibi!
console.log(["10", "9", "100"].map(Number).sort((a, b) => a - b)); // [ 9, 10, 100 ]
```

**Intervyuda shunday ayting:** "Relational taqqoslashda obyektlar primitivga aylantiriladi; ikkalasi satr bo'lsa lug'at tartibida, aks holda songa aylantirib solishtiriladi. `null` 0 ga, `undefined` NaN ga aylanadi. Kutilmagan natijalardan qochish uchun tiplarni oldindan aniq o'zgartiraman va `===` ishlataman."

**Esda tuting:** `array.sort()` default holatda elementlarni **satr** sifatida saralaydi — sonlar uchun har doim `(a, b) => a - b` bering.

## Q93. Execution context nima va uning yaratilish va bajarilish bosqichlari qanday? / What is an execution context and what are its creation and execution phases?

**Oddiy qilib aytganda:** execution context — funksiya ishlashi uchun tayyorlangan **"ish stoli"**: unda o'zgaruvchilar ro'yxati, `this` va tashqi dunyoga havola bor. Stol ikki bosqichda tayyorlanadi: avval **joylashtirish** (qaysi o'zgaruvchi va funksiyalar borligini yozib chiqish), keyin **ishlash** (kodni qatorma-qator bajarish).

**Batafsilroq:**
- **Yaratilish bosqichi (creation):**
  - `function` e'lonlari **to'liq** tayyorlanadi — shuning uchun ularni e'londan oldin chaqirish mumkin;
  - `var` o'zgaruvchilar `undefined` bilan yaratiladi;
  - `let`, `const`, `class` yaratiladi, lekin **TDZ**da qoladi (Q2);
  - `this` va tashqi doiraga havola (scope chain) belgilanadi.
- **Bajarilish bosqichi (execution):** kod qatorma-qator ishlaydi, qiymatlar tayinlanadi.
- Har bir funksiya chaqiruvi yangi execution context yaratib, uni call stack'ka qo'yadi (Q52).

**Misol:**

```js
console.log(greet("Ali"));      // ishlaydi — function e'loni to'liq ko'tarilgan
console.log(typeof counter);    // undefined — var yaratilgan, lekin qiymati hali yo'q

var counter = 1;
function greet(name) { return `Salom, ${name}`; }

try {
  sayBye();                     // funksiya ifodasi — const bilan
} catch (error) {
  console.log(error.name);      // ReferenceError — TDZ
}
const sayBye = () => "Xayr";
```

**Intervyuda shunday ayting:** "Execution context yaratilish bosqichida funksiya e'lonlarini to'liq, `var`larni `undefined` bilan, `let/const`ni TDZ holatida tayyorlaydi va `this` hamda scope chain'ni belgilaydi. Bajarilish bosqichida kod ketma-ket ishlaydi. Hoisting — aynan shu yaratilish bosqichining natijasi."

**Esda tuting:** funksiya **e'loni** (`function f() {}`) ko'tariladi, funksiya **ifodasi** (`const f = () => {}`) esa ko'tarilmaydi.

## Q94. Funksiyaning length xususiyati nima ko'rsatadi? / What does a function's length property show?

**Oddiy qilib aytganda:** `fn.length` — funksiya "kutadigan" majburiy parametrlar soni (arity). Masalan, `function add(a, b)` — 2. Ba'zi kutubxonalar bu raqamga qarab ishlaydi: currying (Q10) yoki Express'dagi xato middleware'i.

**Batafsilroq:**
- Hisobga olinmaydi:
  - default qiymatli parametr va undan keyingilari: `(a, b = 1, c)` → 1;
  - rest parametr: `(a, ...rest)` → 1.
- `arguments.length` esa — **haqiqatda** berilgan argumentlar soni.
- Qiziqarli misol: Express xato middleware'ini aynan `fn.length === 4` bo'yicha taniydi — `(err, req, res, next)`. Parametrni tashlab ketsangiz, u oddiy middleware bo'lib qoladi.

**Misol:**

```js
console.log(((a, b) => {}).length);          // 2
console.log(((a, b = 1, c) => {}).length);   // 1 — default'dan keyingilari sanalmaydi
console.log(((a, ...rest) => {}).length);    // 1 — rest sanalmaydi

function report() { return arguments.length; }
console.log(report(1, 2, 3));                 // 3 — haqiqatda berilganlar

const errorHandler = (err, req, res, next) => {};
console.log(errorHandler.length === 4);       // true — Express shunday taniydi
```

**Intervyuda shunday ayting:** "`length` default qiymatgacha bo'lgan majburiy parametrlar sonini beradi, rest va default parametrlarni hisobga olmaydi. Uni currying kabi generik yordamchilar va Express xato middleware'ini aniqlash ishlatadi — shuning uchun xato handler'da to'rtala parametrni yozish shart."

**Esda tuting:** `bind` qilingan funksiyaning `length`i mahkamlangan argumentlar soniga kamayadi: `add.bind(null, 1).length` → 1.

## Q95. Skriptni dinamik ulash qanday qilinadi va qanday xavflari bor? / How do you load a script dynamically, and what are the risks?

**Oddiy qilib aytganda:** ba'zan tashqi skript (xarita, to'lov vidjeti, analitika) faqat kerak bo'lganda yuklanishi kerak. Buning uchun JavaScript bilan yangi `<script>` teg yaratib, sahifaga qo'shasiz — brauzer uni yuklab bajaradi. Lekin begona skript sahifangizda **to'liq ruxsat** bilan ishlaydi, shuning uchun ehtiyot bo'lish kerak.

**Batafsilroq:**
- `document.createElement("script")` + `src` + `document.head.append(script)`; `onload`/`onerror` bilan Promise'ga o'rash qulay.
- Dinamik qo'shilgan skript default holatda `async` kabi ishlaydi (tartib kafolatlanmaydi).
- Xavfsizlik:
  1. faqat ishonchli manbalardan;
  2. **SRI** (`integrity` atributi) — fayl o'zgartirilgan bo'lsa, brauzer uni bajarmaydi;
  3. **CSP** — ruxsat etilgan skript manbalari ro'yxati;
  4. bir skriptni ikki marta yuklamaslik.
- O'z kodingiz uchun esa dinamik `import()` (Q62) yaxshiroq.

**Misol:**

```javascript
const loaded = new Map();

function loadScript(src, integrity) {
  if (!loaded.has(src)) {
    loaded.set(src, new Promise((resolve, reject) => {
      const script = Object.assign(document.createElement("script"), {
        src,
        async: true,
        crossOrigin: "anonymous",
        ...(integrity ? { integrity } : {}),     // SRI: hash mos kelmasa bajarilmaydi
      });
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Yuklanmadi: ${src}`));
      document.head.append(script);
    }));
  }
  return loaded.get(src);                        // takroriy chaqiruvda qayta yuklamaydi
}

document.querySelector("#show-map").addEventListener("click", async () => {
  await loadScript("https://maps.example.com/sdk.js", "sha384-...");
  initMap();
});
```

**Intervyuda shunday ayting:** "Tashqi skriptni kerak bo'lganda `script` elementi yaratib yuklayman, Promise'ga o'rab, takroriy yuklanishdan himoya qilaman. Uchinchi tomon skriptlari sahifada to'liq huquqqa ega bo'lgani uchun SRI, CSP va ishonchli manbalardan foydalanaman; o'z kodim uchun dinamik `import()` ishlataman."

**Esda tuting:** `innerHTML` orqali qo'shilgan `<script>` teglari **bajarilmaydi** — skript faqat `createElement` bilan yaratilganda ishlaydi.
