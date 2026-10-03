# JavaScript chuqur — til mexanikasi va ES2025–ES2027

> **Kim uchun:** JavaScript'ni kundalik ishlatadigan, endi closure, `this`, prototip, event loop va yangi standartlarni ichidan tushuntira olishi kerak bo'lgan dasturchi.
> **Tekshirilgan:** barcha misollar Node.js v26.9.0 (V8 14.6) da ishga tushirib ko'rilgan (2026-yil 25-sentabr).

---

# 2025–2026 yangiliklari

ECMAScript har yili iyun oyida Ecma General Assembly tomonidan tasdiqlanadi. Taklif **Stage 4** ga yetgan yilning keyingi nashriga kiradi. TC39 ning rasmiy "finished proposals" ro'yxati bo'yicha:

**ES2025 (2025-yil iyun):** Iterator helpers (`.map/.filter/.take/.toArray` iteratorlarda), yangi `Set` metodlari (`union`, `intersection`, `difference`, `symmetricDifference`, `isSubsetOf` …), `Promise.try`, RegExp modifier'lari (`(?i:...)`), takrorlanuvchi nomli guruhlar, JSON modullari va import attributes (`with { type: "json" }`), `Float16Array`.

**ES2026 (2026-yil 30-iyun tasdiqlandi):** `Map`/`WeakMap` upsert (`getOrInsert`, `getOrInsertComputed`), `Iterator.concat`, `Uint8Array` ↔ base64/hex, `Math.sumPrecise`, `Error.isError`, `Array.fromAsync`, `RegExp.escape`, `JSON.parse` source text access.

**ES2027 ga kutilmoqda (Stage 4 ga yetgan):** **Temporal** (2026-yil mart TC39 yig'ilishida Stage 4), explicit resource management (`using` / `await using`), `Atomics.pause`, joint iteration (`Iterator.zip`).

**Diqqat — standart va runtime bir xil emas:**
- `Temporal` va `using` ES2027 ga kiradi, lekin Node 26 da allaqachon ishlaydi.
- `Math.sumPrecise` ES2026 da, lekin Node 26 (V8 14.6) da **hali yo'q**; `Iterator.zip` ham yo'q.
- Ko'p blog postlar "Temporal ES2026 da" deb yozgan — TC39 ro'yxati bo'yicha bu noto'g'ri. Yangi imkoniyatni ishlatishdan oldin maqsadli runtime'da tekshiring.

**Manbalar:** [TC39 finished proposals](https://github.com/tc39/proposals/blob/main/finished-proposals.md) · [Node.js 26.0.0 (V8 14.6)](https://nodejs.org/en/blog/release/v26.0.0) · [Node.js 24.0.0 (V8 13.6)](https://nodejs.org/en/blog/release/v24.0.0)

---

# Savollar

## Q1. Closure nima va u xotirani qanday ushlab qoladi? / What is a closure and how can it retain memory?

**Oddiy qilib aytganda:** closure — funksiyaning "ryukzagi": u yaratilgan joydagi o'zgaruvchilarni o'zi bilan olib yuradi va keyin qayerda chaqirilsa ham ishlata oladi. Lekin ryukzakka keraksiz og'ir narsa tushib qolsa, u ham siz bilan yuraveradi — xotira band bo'ladi.

**Batafsilroq:**
Closure — funksiya va u yaratilgan leksik muhit (scope) birikmasi. Ichki funksiya tashqi funksiya tugagandan keyin ham uning o'zgaruvchilariga kira oladi, chunki o'sha muhit xotirada saqlanib qoladi.

```js
function counter() {
  let count = 0;                 // tashqaridan faqat closure orqali kiriladi
  return { next: () => ++count, reset: () => { count = 0; } };
}
const c = counter();
c.next(); c.next();
console.log(c.next()); // 3
```

**Xotira tuzog'i:** closure butun muhitni emas, faqat ishlatilgan o'zgaruvchilarni ushlashi kerak, lekin V8 bir scope'dagi barcha closure'lar uchun **bitta umumiy kontekst** yaratadi. Bir closure katta buferni ishlatsa va boshqa, uzoq yashovchi closure shu scope'da bo'lsa — bufer ham yashab qoladi. Uzoq yashovchi callback'larda (event listener, taymer) katta obyektlarni scope'da qoldirmang.

**Intervyuda shunday ayting:** "Closure — funksiya va uning leksik muhiti. Ma'lumotni yashirish va holat saqlash uchun ishlataman. V8 bir scope'dagi closure'lar uchun umumiy kontekst yaratgani sabab, uzoq yashaydigan callback'lar keraksiz katta obyektlarni ushlab qolmasligiga e'tibor beraman."

## Q2. this qanday aniqlanadi? / How is the value of this determined?

**Oddiy qilib aytganda:** this — "meni kim chaqirdi?" degan savolning javobi. Oddiy funksiyada u chaqirilish usuliga qarab o'zgaradi; arrow funksiyaning esa o'z this'i yo'q — u yozilgan joyidan meros oladi.

**Batafsilroq:**
`this` funksiya **qanday chaqirilganiga** qarab aniqlanadi (arrow funksiyadan tashqari):

1. `new F()` — yangi obyekt.
2. `fn.call(obj)` / `apply` / `bind` — aniq berilgan obyekt.
3. `obj.method()` — nuqtadan oldingi obyekt.
4. Oddiy chaqiruv `fn()` — strict mode'da (ES modul, klass ichida) `undefined`.

Arrow funksiya o'z `this`iga ega emas — uni yaratilgan joydan leksik oladi.

```js
class Timer {
  seconds = 0;
  startWrong() { return function () { return this; }; } // oddiy chaqiruvda this yo'q
  startRight() { return () => this.seconds; }            // this — Timer nusxasi
}
const t = new Timer();
console.log(t.startWrong()()); // undefined (klass ichi har doim strict)
console.log(t.startRight()()); // 0
```

**Intervyuda shunday ayting:** "this'ni chaqiruv usuli belgilaydi: new — yangi obyekt, call/apply/bind — berilgan obyekt, metod chaqiruvi — nuqtadan oldingi obyekt, oddiy chaqiruv strict mode'da undefined. Arrow funksiya this'ni leksik oladi, shuning uchun callback'larda qulay."

## Q3. Prototip zanjiri va class qanday bog'liq? / How do the prototype chain and class relate?

**Oddiy qilib aytganda:** class — prototiplar ustidagi qulay "kiyim". Ichida hammasi oldingidek: obyekt biror narsani bilmasa, uni prototipidan so'raydi, u ham bilmasa — uning prototipidan. Metodlar har nusxada emas, bitta umumiy prototipda saqlanadi.

**Batafsilroq:**
`class` — prototiplar ustidagi sintaksis. Metodlar `Class.prototype`da, nusxalar esa shu obyektga `[[Prototype]]` havolasi orqali ulanadi. Xususiyat topilmasa, qidiruv zanjir bo'ylab yuqoriga ketadi (`Object.prototype`gacha).

```js
class Animal { speak() { return `${this.name} ovoz chiqaradi`; } constructor(name) { this.name = name; } }
class Dog extends Animal { speak() { return `${super.speak()}: vov`; } }
const d = new Dog("Rex");
console.log(Object.getPrototypeOf(d) === Dog.prototype);                 // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype);   // true
console.log(d.speak());                                                    // Rex ovoz chiqaradi: vov
console.log(Object.hasOwn(d, "speak"));                                    // false — metod prototipda
```

**Prototype pollution:** `obj["__proto__"]["isAdmin"] = true` barcha obyektlarga ta'sir qiladi. Foydalanuvchi kalitlari uchun `Map` yoki `Object.create(null)` ishlating.

**Intervyuda shunday ayting:** "class — prototip mexanizmi ustidagi sintaksis: metodlar Class.prototype'da, extends zanjirga halqa qo'shadi, xususiyat topilmasa qidiruv zanjir bo'ylab ketadi. Foydalanuvchi kalitlari uchun Map yoki Object.create(null) ishlatib, prototype pollution'dan himoyalanaman."

## Q4. == va === , hamda Object.is farqi nima? / What is the difference between ==, === and Object.is?

**Oddiy qilib aytganda:** == — "taxminan teng": turlarni o'zgartirib solishtiradi va kutilmagan natija berishi mumkin. === — "aniq teng": tur ham, qiymat ham bir xil bo'lishi kerak. Object.is — === bilan deyarli bir xil, faqat NaN va -0 kabi g'alati holatlarda farq qiladi.

**Batafsilroq:**
- `==` — turlarni o'zgartirib solishtiradi (`"0" == 0` → `true`, `null == undefined` → `true`).
- `===` — tur o'zgartirmaydi, lekin `NaN === NaN` → `false`, `+0 === -0` → `true`.
- `Object.is` — `NaN` ni o'ziga teng, `+0` va `-0` ni farqli deb biladi. React `useState` va `Map` kalitlari (SameValueZero) shunga yaqin mantiqni ishlatadi.

```js
console.log([NaN === NaN, Object.is(NaN, NaN), Object.is(0, -0), [NaN].includes(NaN), [NaN].indexOf(NaN)]);
// [false, true, false, true, -1]
```

Amaliy qoida: har doim `===`; faqat `x == null` (null yoki undefined) idiomasi keng qabul qilingan.

**Intervyuda shunday ayting:** "== tur o'zgartiradi, === o'zgartirmaydi, Object.is esa NaN'ni o'ziga teng va +0 bilan -0 ni farqli deb biladi. Kodda doim === ishlataman; yagona qabul qilingan istisno — null yoki undefined'ni birga tekshiruvchi x == null."

## Q5. Microtask va macrotask farqi brauzerda qanday? / How do microtasks and macrotasks differ in the browser?

**Oddiy qilib aytganda:** brauzer — navbatli kassa: har bir katta ish (tugma bosilishi, taymer) — alohida xaridor. Har xaridordan keyin kassir avval barcha shoshilinch mayda ishlarni (Promise'lar) tugatadi, keyin kerak bo'lsa ekranni qayta chizadi, keyin keyingi xaridorni chaqiradi.

**Batafsilroq:**
Har bir **task** (script, `setTimeout`, foydalanuvchi hodisasi) tugagach, brauzer **barcha microtask'larni** (Promise `then`, `queueMicrotask`, `MutationObserver`) bajaradi, keyin kerak bo'lsa render qiladi, keyin keyingi task'ni oladi.

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
queueMicrotask(() => console.log("4"));
console.log("5");
// 1, 5, 3, 4, 2
```

Oqibat: cheksiz microtask zanjiri (masalan, rekursiv `then`) render'ni to'liq bloklaydi — sahifa "qotadi", `setTimeout` bilan esa render oralab bo'ladi.

**Intervyuda shunday ayting:** "Har task'dan keyin microtask navbati to'liq bo'shatiladi, keyin render bo'lishi mumkin, keyin keyingi task. Shuning uchun Promise.then setTimeout'dan oldin ishlaydi va cheksiz microtask zanjiri render'ni butunlay bloklaydi."

## Q6. Iterator helper'lar massiv metodlaridan nimasi bilan farq qiladi? / How do iterator helpers differ from array methods?

**Oddiy qilib aytganda:** massiv metodlari (map, filter) — butun ro'yxatni birdaniga qayta ishlab, har qadamda yangi ro'yxat yaratadi. Iterator helper'lar — "dangasa" konveyer: elementlarni bittadan, faqat so'ralganda o'tkazadi. Cheksiz ro'yxat bilan ham ishlaydi, xotira tejaladi.

**Batafsilroq:**
Massiv metodlari (`map`, `filter`) har qadamda **yangi massiv** yaratadi va hammasini darhol hisoblaydi. Iterator helper'lar (ES2025) **dangasa** (lazy): qiymatlar bittadan, kerak bo'lganda hisoblanadi. Cheksiz ketma-ketlik va katta ma'lumotda xotirani tejaydi.

```js
function* naturals() { let n = 1; while (true) yield n++; }

const firstSquares = naturals()
  .filter((n) => n % 2 === 1)
  .map((n) => n * n)
  .take(4)
  .toArray();
console.log(firstSquares); // [1, 9, 25, 49] — cheksiz generator, lekin faqat 7 ta qiymat hisoblandi

console.log(Iterator.concat([1, 2], new Set([3])).toArray()); // ES2026: [1, 2, 3]
```

**Intervyuda shunday ayting:** "Iterator helper'lar (ES2025) dangasa: take(4) bo'lsa, faqat kerakli elementlar hisoblanadi va oraliq massivlar yaratilmaydi. Katta yoki cheksiz ma'lumot, generator va stream'lar uchun ishlataman; kichik massivlarda oddiy Array metodlari yetarli."

## Q7. ES2025 Set metodlari qanday muammoni hal qiladi? / Which problem do the ES2025 Set methods solve?

**Oddiy qilib aytganda:** Set — takrorlanmaydigan narsalar to'plami. ES2025 metodlari maktabdagi to'plamlar nazariyasini beradi: birlashma (union), kesishma (intersection), ayirma (difference) — ilgari buni massivga aylantirib qo'lda yozish kerak edi.

**Batafsilroq:**
Ilgari kesishma/ayirma uchun `[...a].filter((x) => b.has(x))` yozilardi. Endi to'g'ridan-to'g'ri:

```js
const backend = new Set(["node", "sql", "docker"]);
const required = new Set(["node", "sql", "k8s"]);
console.log([...required.difference(backend)]);            // ["k8s"] — o'rganish kerak
console.log([...required.intersection(backend)]);          // ["node", "sql"]
console.log(new Set(["node"]).isSubsetOf(backend));        // true
```

Metodlar argument sifatida faqat `Set` emas, `size`, `has`, `keys` bor istalgan "set-ga o'xshash" obyektni (masalan, `Map`) qabul qiladi.

**Intervyuda shunday ayting:** "ES2025'da Set'ga union, intersection, difference, symmetricDifference, isSubsetOf va boshqa metodlar qo'shildi. Ular kodni qisqa va aniq qiladi hamda istalgan set-ga o'xshash obyektni qabul qiladi."

## Q8. Map upsert (getOrInsert) qayerda foydali? / Where is Map upsert (getOrInsertComputed) useful?

**Oddiy qilib aytganda:** "bor bo'lsa ol, yo'q bo'lsa yaratib qo'y" — dasturlashdagi eng ko'p takrorlanadigan uch qadam. Map.getOrInsertComputed buni bitta chaqiruvga aylantiradi: guruhlash va kesh uchun juda qulay.

**Batafsilroq:**
"Bo'lsa ol, bo'lmasa yarat va saqla" — guruhlash, kesh, hisoblagich. Ilgari `has` + `set` + `get` uch qadam edi.

```js
const byTopic = new Map();
for (const q of [{ t: "sql", id: 1 }, { t: "js", id: 2 }, { t: "sql", id: 3 }]) {
  byTopic.getOrInsertComputed(q.t, () => []).push(q.id);
}
console.log(Object.fromEntries(byTopic)); // { sql: [1, 3], js: [2] }
```

`getOrInsert(key, value)` — qiymat tayyor bo'lsa; `getOrInsertComputed(key, fn)` — qiymatni faqat kalit yo'q bo'lganda hisoblash kerak bo'lsa (masalan, qimmat obyekt). Oddiy guruhlash uchun `Map.groupBy` ham bor.

**Intervyuda shunday ayting:** "ES2026 upsert metodlari: getOrInsert tayyor qiymat uchun, getOrInsertComputed qimmat qiymatni faqat kalit yo'q bo'lganda hisoblash uchun. has + set + get uchta qadamini bittaga aylantiradi. Oddiy guruhlashda Map.groupBy ham bor."

## Q9. Promise.all, allSettled, any va race farqi nima? / How do Promise.all, allSettled, any and race differ?

**Oddiy qilib aytganda:** bir nechta ishni birga boshlab, natijani to'rt xil kutish mumkin: "hammasi tayyor bo'lsin" (all), "hammasi tugasin, hisobot ber" (allSettled), "birinchi tugagani" (race), "birinchi muvaffaqiyatlisi" (any).

**Batafsilroq:**
| Metod | Qachon tugaydi | Natija |
|---|---|---|
| `all` | hammasi bajarilganda **yoki** birinchi xatoda | qiymatlar massivi / birinchi xato |
| `allSettled` | hammasi tugaganda | har biri uchun `{status, value/reason}` |
| `any` | birinchi **muvaffaqiyatda** | o'sha qiymat; hammasi xato bo'lsa `AggregateError` |
| `race` | birinchi tugaganda (muvaffaqiyat yoki xato) | o'sha natija |

```js
const fail = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error(`x${ms}`)), ms));
const ok = (ms) => new Promise((resolve) => setTimeout(() => resolve(ms), ms));
console.log(await Promise.any([fail(10), ok(20), ok(30)]));            // 20
console.log((await Promise.allSettled([fail(5), ok(5)])).map((r) => r.status)); // ["rejected", "fulfilled"]
```

**Muhim:** `Promise.all` birinchi xatoda qaytadi, lekin **qolgan so'rovlarni bekor qilmaydi** — ular fonda ishlashda davom etadi. Bekor qilish uchun `AbortController` kerak.

**Intervyuda shunday ayting:** "all birinchi xatoda to'xtaydi, allSettled har birining holatini beradi, race birinchi natijani, any birinchi muvaffaqiyatni, hammasi xato bo'lsa AggregateError. Muhimi: all qolgan so'rovlarni bekor qilmaydi — bekor qilish uchun AbortController kerak."

## Q10. Promise.try va Error.isError nima uchun qo'shildi? / Why were Promise.try and Error.isError added?

**Oddiy qilib aytganda:** Promise.try — "bu funksiya xato qilsa ham, qilmasa ham, natijani Promise'ga o'rab ber": sinxron throw ham .catch()'da ushlanadi. Error.isError — "bu haqiqiy xato obyektimi?" degan savolga ishonchli javob, hatto u boshqa oyna yoki worker'dan kelgan bo'lsa ham.

**Batafsilroq:**
`Promise.try(fn)` (ES2025) — `fn` sinxron `throw` qilsa ham, async bo'lsa ham, natijani har doim Promise'ga aylantiradi. `new Promise(r => r(fn()))` ning qisqa va to'g'ri shakli.

`Error.isError(x)` (ES2026) — `instanceof Error` boshqa realm'dan (iframe, `vm` kontekst, worker) kelgan xatolar uchun `false` beradi; `Error.isError` esa haqiqiy xato obyektini ishonchli aniqlaydi.

```js
const parse = (text) => JSON.parse(text); // sinxron throw qilishi mumkin
const result = await Promise.try(parse, "{bad").catch((e) => `ushlandi: ${e.name}`);
console.log(result);                                                  // ushlandi: SyntaxError
console.log(Error.isError(new TypeError()), Error.isError({ message: "soxta" })); // true false
```

**Intervyuda shunday ayting:** "Promise.try sinxron va asinxron xatolarni bitta Promise zanjiriga birlashtiradi. Error.isError realm'lar orasida ishonchli ishlaydi, instanceof Error esa iframe yoki vm'dan kelgan xatoda false beradi."

## Q11. Katta sonlarni JSON'dan qanday yo'qotmasdan o'qiysiz? / How do you parse large integers from JSON without losing precision?

**Oddiy qilib aytganda:** JavaScript'ning oddiy soni juda katta butun sonlarni (taxminan 9 kvadrilliondan kattasini) aniq saqlay olmaydi va jimgina "yaxlitlab" yuboradi. Telegram yoki bank ID'lari buziladi. ES2026 JSON.parse'ga asl matnni ko'rsatadi — uni BigInt'ga aylantirish mumkin.

**Batafsilroq:**
`Number` faqat 2^53 − 1 gacha butun sonlarni aniq saqlaydi. `JSON.parse` katta ID'ni (masalan, Twitter/Telegram ID'lari, bank summalari) jimgina buzadi. ES2026 "source text access": reviver uchinchi argumentda asl matnni beradi:

```js
const text = '{"id": 12345678901234567890, "n": 1}';
console.log(JSON.parse(text).id);                    // 12345678901234567000 — buzildi
const safe = JSON.parse(text, (key, value, context) =>
  key === "id" ? BigInt(context.source) : value);
console.log(safe.id);                                 // 12345678901234567890n
```

**Intervyuda shunday ayting:** "Number 2^53 − 1 gacha butun sonlarni aniq saqlaydi. Katta ID'larni JSON'dan o'qishda reviver'ning uchinchi argumentidagi context.source (ES2026) orqali asl matnni olib BigInt'ga aylantiraman yoki serverdan ularni string sifatida yuborishni talab qilaman."

## Q12. RegExp.escape nima uchun kerak? / What is RegExp.escape for?

**Oddiy qilib aytganda:** foydalanuvchi yozgan matndan qidiruv naqshi (RegExp) yasasangiz, "." yoki "*" kabi belgilar maxsus ma'no oladi va naqsh buziladi. RegExp.escape bu belgilarni "oddiy harf"ga aylantiradi.

**Batafsilroq:**
Foydalanuvchi matnidan RegExp yasashda maxsus belgilar (`.`, `*`, `(`) naqshni buzadi yoki ReDoS'ga yo'l ochadi. Ilgari har kim o'z `escapeRegExp` funksiyasini yozardi.

```js
const query = "a.b*c";
console.log(RegExp.escape(query));                           // \x61\.b\*c
console.log(new RegExp(RegExp.escape(query)).test("xa.b*cx")); // true
console.log(new RegExp(query).test("aXbbbc"));                 // true — escape'siz noto'g'ri moslik
```

Diqqat: boshidagi harf-raqam ham (`a` → `\x61`) escape qilinadi — bu natija boshqa naqsh ichiga qo'shilganda (`\1` + `a` kabi) ma'no o'zgarmasligi uchun.

**Intervyuda shunday ayting:** "Foydalanuvchi matnini RegExp'ga qo'yishdan oldin RegExp.escape (ES2026) bilan escape qilaman — bu noto'g'ri mosliklar va ReDoS'dan himoya qiladi. Boshidagi harf-raqam ham escape qilinadi, shuning uchun natija boshqa naqsh ichida ham xavfsiz."

## Q13. Uint8Array base64/hex metodlari nimani almashtiradi? / What do Uint8Array base64 and hex methods replace?

**Oddiy qilib aytganda:** base64 — ikkilik ma'lumotni (rasm, fayl) oddiy matn sifatida yuborish usuli. Ilgari brauzerda btoa/atob noqulay ishlardi, Node.js'da esa Buffer bor edi. ES2026 ikkala muhitda bir xil, oddiy usulni berdi.

**Batafsilroq:**
Brauzerda `btoa`/`atob` faqat "binary string" bilan ishlaydi va UTF-8 bilan xato beradi; Node'da `Buffer` bor, lekin brauzerda yo'q. ES2026 ikkala muhitda bir xil API beradi:

```js
const bytes = new TextEncoder().encode("salom 👋");
const b64 = bytes.toBase64();
console.log(b64);                                                         // c2Fsb20g8J+Riw==
console.log(new TextDecoder().decode(Uint8Array.fromBase64(b64)));        // salom 👋
console.log(new Uint8Array([222, 173, 190, 239]).toHex());                // deadbeef
```

**Intervyuda shunday ayting:** "ES2026 Uint8Array'ga toBase64, fromBase64, toHex va fromHex qo'shdi — brauzer va Node'da bir xil API, UTF-8 bilan xatosiz. btoa/atob va muhitga xos Buffer o'rniga shularni ishlataman."

## Q14. Garbage collector qanday ishlaydi va WeakMap/WeakRef qachon kerak? / How does garbage collection work and when do you need WeakMap or WeakRef?

**Oddiy qilib aytganda:** garbage collector — uy farroshi: hech kim foydalanmayotgan (hech kim havola qilmayotgan) narsalarni olib tashlaydi. WeakMap — "yengil" bog'lanish: u narsani ushlab turmaydi, shuning uchun farrosh uni bemalol olib ketadi.

**Batafsilroq:**
V8 **avlodli** (generational) GC ishlatadi: yangi obyektlar "young generation"da tez-tez va arzon tozalanadi (Scavenge), omon qolganlari "old generation"ga o'tadi va kamroq, lekin qimmatroq Mark-Sweep-Compact bilan tozalanadi. Obyekt ildizdan (global, stack) **erishib bo'lmaydigan** bo'lsa yig'iladi.

- `WeakMap` — kalit obyektga kuchsiz havola: obyekt boshqa joyda ishlatilmay qolsa, yozuv ham yo'qoladi. DOM elementi yoki so'rov obyektiga metadata biriktirish uchun ideal (xotira sizmaydi).
- `WeakRef` + `FinalizationRegistry` — kesh uchun, lekin GC vaqti kafolatlanmaydi; mantiqni ularga bog'lamang.

**Intervyuda shunday ayting:** "V8 avlodli GC ishlatadi: yosh obyektlar tez va arzon, eskilari kamroq va qimmatroq tozalanadi; ildizdan yetib borilmaydigan obyekt yig'iladi. WeakMap obyektga metadata biriktirishda xotira sizishining oldini oladi; WeakRef va FinalizationRegistry'ga mantiqni bog'lamayman."

## Q15. Generator va async generator qayerda foydali? / Where are generators and async generators useful?

**Oddiy qilib aytganda:** generator — pauza tugmasi bor funksiya: yield'da to'xtaydi va keyingi qiymat so'ralganda davom etadi. Async generator esa har bir qiymatni kutib beradi — sahifama-sahifa yuklanadigan API uchun ideal.

**Batafsilroq:**
Generator bajarilishni `yield` da to'xtatib, keyin davom ettiradi. Async generator (`async function*`) + `for await` — sahifalangan API, stream, navbatni o'qish uchun tabiiy:

```js
async function* pages(fetchPage) {
  for (let page = 1; ; page++) {
    const items = await fetchPage(page);
    if (!items.length) return;
    yield* items;
  }
}
const fake = async (p) => (p <= 2 ? [`${p}a`, `${p}b`] : []);
for await (const item of pages(fake)) console.log(item); // 1a 1b 2a 2b
console.log(await Array.fromAsync(pages(fake)));          // ES2026: ["1a","1b","2a","2b"]
```

Iste'molchi erta `break` qilsa, generator'ning `finally` bloki ishlaydi — resurslarni yopish uchun joy.

**Intervyuda shunday ayting:** "Generator bajarilishni yield'da to'xtatadi va dangasa ketma-ketlik beradi. async function* va for await sahifalangan API, stream va navbatlar uchun tabiiy. Iste'molchi break qilsa, generatorning finally bloki ishlaydi — resurslarni shu yerda yopaman."

## Q16. structuredClone va JSON orqali nusxa olish farqi? / structuredClone vs JSON.parse(JSON.stringify())?

**Oddiy qilib aytganda:** JSON orqali nusxa olish — obyektni qog'ozga yozib, qayta o'qishga o'xshaydi: sana matnga aylanadi, Map va Set yo'qoladi, aylanma havola xato beradi. structuredClone esa obyektni aniq nusxalaydi.

**Batafsilroq:**
`JSON` usuli: `Date` → string, `Map`/`Set` → `{}`, `undefined` va funksiyalar yo'qoladi, aylanma havolada xato. `structuredClone`: `Date`, `Map`, `Set`, `RegExp`, `ArrayBuffer`, typed array'lar va aylanma havolalarni to'g'ri nusxalaydi; funksiya va DOM tugunlarida esa `DataCloneError` beradi.

```js
const original = { at: new Date(0), tags: new Set(["js"]) };
original.self = original;
const copy = structuredClone(original);
console.log(copy.at instanceof Date, copy.tags.has("js"), copy.self === copy); // true true true
```

**Intervyuda shunday ayting:** "structuredClone Date, Map, Set, RegExp, typed array va aylanma havolalarni to'g'ri nusxalaydi; funksiya va DOM tugunlarida DataCloneError beradi. JSON usuli turlarni yo'qotadi, shuning uchun chuqur nusxa uchun structuredClone'ni tanlayman."

