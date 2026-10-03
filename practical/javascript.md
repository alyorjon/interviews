# JavaScript amaliy intervyu ssenariylari

> **Nima bu:** "loyihada shunday muammo chiqdi — nima qilasiz?" turidagi savollar. Intervyuer bu yerda nazariyani emas, **muammoni qanday topib, xavfsiz tuzatishingizni** tekshiradi.
> **Har bir javob tartibi:** muammo oddiy tilda → sababi → yechim (kod bilan) → qanday tekshirasiz → intervyuda qanday aytasiz.
> **Umumiy qoida (har bir ssenariyga tegishli):** avval muammoni kichik misolda **qayta hosil qiling** (reproduksiya), keyin tuzating, keyin tuzatish ishlaganini test yoki o'lchov bilan **isbotlang**.
> **Kod:** ` ```js ` misollar Node.js'da tekshirilgan. **Asosiy manba:** [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/).

---

# Ssenariylar

## Q1. Qidiruvda tez yozilganda eski javob yangi natijani bosib ketyapti — qanday hal qilasiz? / Search results from an old request overwrite newer ones — how do you fix it?

**Oddiy qilib aytganda:** foydalanuvchi "ki" yozdi, keyin "kitob". Ikkala so'rov ketdi, lekin "ki" javobi sekinroq kelib, "kitob" natijasini **ustidan yozib yubordi**. Yechim: yangi so'rov yuborilganda eskisini **bekor qilish**.

**Sababi:** tarmoq javoblari yuborilgan tartibda kelishi kafolatlanmagan — bu "poyga holati" (race condition).

**Yechim:**

```js
let controller;
async function search(query, fetchImpl) {
  controller?.abort();                            // eski so'rovni bekor qilamiz
  controller = new AbortController();
  try {
    return await fetchImpl(query, controller.signal);
  } catch (error) {
    if (error.name === "AbortError") return null;  // bekor qilingan — jim o'tamiz
    throw error;
  }
}

// Sinov: "ki" sekin (100 ms), "kitob" tez (10 ms)
const fakeFetch = (q, signal) => new Promise((resolve, reject) => {
  const timer = setTimeout(() => resolve(`natija: ${q}`), q === "ki" ? 100 : 10);
  signal.addEventListener("abort", () => { clearTimeout(timer); reject(new DOMException("aborted", "AbortError")); });
});
const results = await Promise.all([search("ki", fakeFetch), search("kitob", fakeFetch)]);
console.log(results); // [ null, 'natija: kitob' ] — eski javob tashlab yuborildi
```

**Qanday tekshirasiz:** sekin tarmoqni simulyatsiya qiling (DevTools → Network → Slow 3G) va tez yozing; ekranda doim oxirgi so'rov natijasi qolishi kerak.

**Intervyuda shunday ayting:** "Bu poyga holati. Har yangi so'rovda oldingisini AbortController bilan bekor qilaman va AbortError'ni xato sifatida ko'rsatmayman. Qo'shimcha ravishda input'ga debounce qo'yib, so'rovlar sonini kamaytiraman."

**Esda tuting:** React'da buni `useEffect` cleanup'ida qilasiz yoki TanStack Query'ga topshirasiz. Manba: [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

## Q2. Uchta mustaqil API'dan bittasi yiqilsa ham, qolganlarining natijasi kerak — nima qilasiz? / One of three independent API calls fails but you still need the others — what do you do?

**Oddiy qilib aytganda:** `Promise.all` — "hammasi yoki hech narsa": bittasi yiqilsa, qolgan natijalar ham yo'qoladi. Dashboard'da ob-havo vidjeti ishlamasa, kurs va yangiliklar baribir ko'rinishi kerak. `Promise.allSettled` har birining natijasini alohida beradi.

**Yechim:**

```js
const tasks = [
  Promise.resolve({ usd: 12_600 }),
  Promise.reject(new Error("Ob-havo xizmati ishlamayapti")),
  Promise.resolve(["Yangilik 1", "Yangilik 2"]),
];

const results = await Promise.allSettled(tasks);
const [rates, weather, news] = results.map((r) => (r.status === "fulfilled" ? r.value : null));
console.log(rates, weather, news);                                  // { usd: 12600 } null [ ... ]
results.filter((r) => r.status === "rejected").forEach((r) => console.log("Log:", r.reason.message));
```

**Qanday tekshirasiz:** testda bitta manbani ataylab xato qaytaradigan qiling — sahifa qolgan qismlarni ko'rsatishi va xato log'ga yozilishi kerak.

**Intervyuda shunday ayting:** "Mustaqil manbalar uchun `Promise.allSettled` ishlataman: har natijani statusiga qarab alohida qayta ishlayman, muvaffaqiyatsizini logga yozib, UI'da fallback ko'rsataman. Barcha natija majburiy bo'lsa — `Promise.all`."

**Esda tuting:** har bir so'rovga timeout ham qo'ying — `allSettled` osilib qolgan so'rovni cheksiz kutadi. Manba: [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled).

## Q3. Obyektni spread bilan nusxaladim, lekin nusxani o'zgartirsam asli ham o'zgaryapti — nega? / A spread copy still changes the original when edited — why?

**Oddiy qilib aytganda:** `{ ...obj }` faqat **tashqi qatlamni** nusxalaydi. Ichidagi massiv yoki obyekt — ikkala nusxada **bitta**. Birida o'zgartirsangiz, ikkinchisida ham ko'rinadi. Chuqur nusxa uchun `structuredClone`.

**Yechim:**

```js
const original = { name: "Buyurtma", items: ["non"] };

const shallow = { ...original };
shallow.items.push("sut");
console.log(original.items);   // [ 'non', 'sut' ] — asli ham o'zgardi!

const deep = structuredClone(original);
deep.items.push("choy");
console.log(original.items);   // [ 'non', 'sut' ] — endi o'zgarmadi
```

**Qanday tekshirasiz:** nusxani o'zgartirgandan keyin asl obyekt o'zgarmaganini test bilan tasdiqlang.

**Intervyuda shunday ayting:** "Spread shallow copy qiladi — ichki obyektlar havola orqali ulashiladi. Serializatsiya qilinadigan ma'lumot uchun `structuredClone` bilan deep copy qilaman; funksiya yoki klass nusxalari bo'lsa, aniq nusxalash funksiyasini yozaman."

**Esda tuting:** `structuredClone` funksiyalarni nusxalay olmaydi va klass nusxasini oddiy obyektga aylantiradi. Manba: [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone).

## Q4. Katta hisob paytida sahifa qotib, tugmalar javob bermayapti — nima qilasiz? / A heavy computation freezes the page and clicks stop responding — what do you do?

**Oddiy qilib aytganda:** brauzerda JavaScript bitta "ishchi"da ishlaydi: u hisoblayotgan paytda tugma bosilishiga javob bera olmaydi. Og'ir hisobni **alohida ishchiga — Web Worker'ga** berasiz, asosiy sahifa esa javob berishda davom etadi.

**Yechim:**

```javascript
// main.js
const worker = new Worker(new URL("./stats-worker.js", import.meta.url), { type: "module" });
worker.postMessage({ type: "calculate", rows });             // xabar kontrakti: { type, payload }
worker.onmessage = ({ data }) => renderStats(data.result);
worker.onerror = (error) => showError("Hisoblab bo'lmadi");

// stats-worker.js
self.onmessage = ({ data }) => {
  if (data.type !== "calculate") return;
  const result = heavyStatistics(data.rows);                  // og'ir ish — alohida oqimda
  self.postMessage({ type: "done", result });
};
```

**Qanday tekshirasiz:** DevTools → Performance: hisob paytida asosiy oqimda uzoq task'lar (50 ms dan ortiq) yo'qolganini va INP yaxshilanganini ko'ring.

**Intervyuda shunday ayting:** "Og'ir hisobni Web Worker'ga ko'chiraman va aniq xabar kontraktini belgilayman. Worker DOM'ga kira olmaydi, shuning uchun natijani asosiy oqimga qaytarib chizaman. Kichikroq ishlar uchun ishni bo'laklab, oralarda brauzerga navbat beraman."

**Esda tuting:** worker'ga katta massiv yuborish — nusxalash xarajati; ArrayBuffer'larni transfer qiling. Manba: [Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

## Q5. Komponent yo'qolgandan keyin ham event listener xotirani ushlab turibdi — qanday tuzatasiz? / An event listener keeps memory alive after the component is gone — how do you fix it?

**Oddiy qilib aytganda:** `window`ga qo'shilgan listener komponent o'chirilgandan keyin ham yashaydi va komponent obyektlarini xotirada ushlab turadi. Uni **olib tashlash** kerak. Eng qulay yo'l — `AbortController` signali: bitta `abort()` bilan barcha listener'lar birdan olinadi.

**Yechim:**

```js
function mountWidget(target) {
  const controller = new AbortController();
  const state = { clicks: 0, bigData: new Array(10_000).fill(0) };
  target.addEventListener("click", () => state.clicks++, { signal: controller.signal });
  target.addEventListener("keydown", () => {}, { signal: controller.signal });
  return () => controller.abort();                 // unmount: hammasi birdan olib tashlanadi
}

const target = new EventTarget();
const unmount = mountWidget(target);
target.dispatchEvent(new Event("click"));
unmount();
console.log("Listener'lar olib tashlandi — state endi GC tomonidan tozalanishi mumkin");
```

**Qanday tekshirasiz:** komponentni bir necha marta ochib-yoping va heap snapshot'da "Detached" elementlar yoki o'sib borayotgan obyektlar yo'qligini ko'ring.

**Intervyuda shunday ayting:** "Listener'ni olib tashlash uchun `removeEventListener`ga aynan o'sha funksiya havolasini berish kerak; qulayroq usul — `AbortController` signali, u bir nechta listener'ni birdan uzadi. React'da buni effect cleanup'ida qilaman."

**Esda tuting:** `removeEventListener("click", () => ...)` ishlamaydi — yangi arrow funksiya boshqa havola. Manba: [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

## Q6. Foydalanuvchi kiritgan HTML preview'da skript ishga tushishi mumkin — qanday himoyalanasiz? / User-provided HTML in a preview can run scripts — how do you protect against it?

**Oddiy qilib aytganda:** `innerHTML = userInput` — foydalanuvchi yozgan narsani **kod sifatida** qabul qilish. Kimdir `<img src=x onerror="...">` yozsa, uning kodi boshqa foydalanuvchilar brauzerida ishlaydi (XSS). Matnni **matn sifatida** chiqaring: `textContent`.

**Yechim:**

```javascript
// ❌ preview.innerHTML = userInput;
preview.textContent = userInput;                   // ✅ HTML emas, oddiy matn

// HTML haqiqatan kerak bo'lsa — faqat sanitizatsiyadan keyin, ruxsat etilgan teglar ro'yxati bilan:
import DOMPurify from "dompurify";
preview.innerHTML = DOMPurify.sanitize(userInput, { ALLOWED_TAGS: ["b", "i", "a", "p"], ALLOWED_ATTR: ["href"] });
```

**Qanday tekshirasiz:** `<img src=x onerror=alert(1)>` va `<script>` kiritib ko'ring — hech narsa bajarilmasligi kerak.

**Intervyuda shunday ayting:** "Foydalanuvchi matnini `textContent` bilan chiqaraman. HTML kerak bo'lsa, allowlist'li sanitizer (DOMPurify) ishlataman va qo'shimcha himoya sifatida CSP qo'yaman. Sanitizatsiyani serverda ham qilaman."

**Esda tuting:** faqat `<script>` tegini olib tashlash yetarli emas — `onerror`, `javascript:` havolalari ham xavfli. Manba: [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent).

## Q7. Pul hisobida 0.1 + 0.2 aniq chiqmayapti — nima qilasiz? / Money totals are wrong because 0.1 + 0.2 isn't exact — what do you do?

**Oddiy qilib aytganda:** kompyuter kasr sonlarni ikkilik tizimda saqlaydi va `0.1` ni aniq yoza olmaydi — xuddi `1/3` ni o'nli kasrda aniq yozib bo'lmagandek. Pul uchun buni qabul qilib bo'lmaydi. Yechim: pulni **eng kichik birlikda** (tiyin, sent) **butun son** sifatida saqlash.

**Yechim:**

```js
console.log(0.1 + 0.2);                          // 0.30000000000000004

const items = [{ name: "non", cents: 10 }, { name: "suv", cents: 20 }]; // tiyinda
const totalCents = items.reduce((sum, item) => sum + item.cents, 0);
if (!Number.isSafeInteger(totalCents)) throw new RangeError("Summa juda katta");
console.log(totalCents, (totalCents / 100).toFixed(2)); // 30 0.30 — faqat ko'rsatishda kasr
```

**Qanday tekshirasiz:** chekka holatlar uchun testlar: yaxlitlash, katta summalar, chegirma foizlari.

**Intervyuda shunday ayting:** "Floating point pul uchun yaroqsiz. Summalarni eng kichik birlikda butun son sifatida saqlayman va `Number.isSafeInteger` bilan chegarani tekshiraman; juda katta summalar uchun BigInt yoki decimal kutubxonasi. Kasrga faqat ko'rsatishda, `Intl.NumberFormat` bilan aylantiraman."

**Esda tuting:** foizli chegirmada yaxlitlash qoidasini (bank yaxlitlashi va hokazo) biznes bilan kelishib oling. Manba: [Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

## Q8. API javobida ba'zan maydon yo'q va production'da xato chiqyapti — qanday tuzatasiz? / An API field is sometimes missing and nested access crashes in production — how do you fix it?

**Oddiy qilib aytganda:** `payload.user.address.city` — agar `address` yo'q bo'lsa, butun sahifa "Cannot read properties of undefined" bilan yiqiladi. `?.` "bor bo'lsa, ichiga kir", `??` "yo'q bo'lsa, standart qiymat" deydi.

**Yechim:**

```js
const payloads = [
  { user: { address: { city: "Toshkent" } } },
  { user: {} },
  {},
];
for (const payload of payloads) {
  const city = payload.user?.address?.city ?? "noma'lum";
  console.log(city);                              // Toshkent, noma'lum, noma'lum
}
```

**Qanday tekshirasiz:** API javobining turli shakllari (maydon yo'q, `null`, bo'sh obyekt) uchun testlar yozing.

**Intervyuda shunday ayting:** "Ixtiyoriy maydonlar uchun optional chaining va `??` ishlataman — `??` faqat `null`/`undefined`ni almashtiradi, `0` va bo'sh satrni saqlaydi. Lekin asosiy himoya — API chegarasida javobni sxema (Zod) bilan tekshirish: qaysi maydon majburiy ekani aniq bo'ladi."

**Esda tuting:** hamma joyga `?.` qo'yish haqiqiy xatolarni yashiradi. Majburiy maydon yo'q bo'lsa — aniq xato bergan yaxshi. Manba: [Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining).

## Q9. Yangi deploy'dan keyin dinamik import eski chunk'ni so'rab 404 beryapti — nima qilasiz? / After a deploy, dynamic import requests an old chunk and gets 404 — what do you do?

**Oddiy qilib aytganda:** foydalanuvchi sahifani kecha ochgan, bugun siz yangi versiya chiqardingiz — fayl nomlari o'zgardi. U tugmani bosganda sahifa **eski nomli** faylni so'raydi va topolmaydi. Yechim: shu xatoni ushlab, sahifani **bir marta** yangilash.

**Yechim:**

```javascript
async function loadReport() {
  try {
    return await import("./report.js");
  } catch (error) {
    const key = `reloaded-for-${BUILD_VERSION}`;
    if (!sessionStorage.getItem(key)) {           // cheksiz reload bo'lmasin
      sessionStorage.setItem(key, "1");
      location.reload();                           // yangi versiyani yuklash
      return new Promise(() => {});
    }
    throw error;                                   // ikkinchi marta ham xato — haqiqiy muammo
  }
}
```

**Qanday tekshirasiz:** eski build'ni ochib qo'yib, yangisini deploy qiling va lazy qismni oching — sahifa bir marta yangilanishi va ishlashi kerak.

**Intervyuda shunday ayting:** "Chunk yuklanish xatosini ushlab, build versiyasiga bog'langan bir martalik reload qilaman — cheksiz sikl bo'lmasin. Serverda eski chunk'larni bir necha deploy davomida saqlash ham yordam beradi. Vite'da buning uchun `vite:preloadError` hodisasi bor."

**Esda tuting:** foydalanuvchi forma to'ldirayotgan bo'lsa, reload ma'lumotni yo'qotadi — avval saqlang yoki foydalanuvchidan so'rang. Manba: [import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import).

## Q10. Obyektlarni kalit qilib keshlashda oddiy obyekt to'qnashuv beryapti — nega? / Caching by object keys in a plain object causes collisions — why?

**Oddiy qilib aytganda:** oddiy obyektda kalit faqat **matn** bo'la oladi. Obyektni kalit qilsangiz, u `"[object Object]"` matniga aylanadi — **hamma** obyekt bir xil kalitga tushadi va bir-birini ustidan yozadi. `Map` esa obyektning o'zini kalit qila oladi.

**Yechim:**

```js
const requestA = { url: "/users" };
const requestB = { url: "/orders" };

const plain = {};
plain[requestA] = "foydalanuvchilar";
plain[requestB] = "buyurtmalar";
console.log(Object.keys(plain), plain[requestA]); // [ '[object Object]' ] buyurtmalar — to'qnashuv!

const cache = new Map();
cache.set(requestA, "foydalanuvchilar");
cache.set(requestB, "buyurtmalar");
console.log(cache.get(requestA));                 // foydalanuvchilar
cache.clear();                                    // hayot sikli tugaganda tozalash
```

**Qanday tekshirasiz:** ikki xil kalit bilan yozib, ikkalasini ham to'g'ri o'qish mumkinligini test qiling.

**Intervyuda shunday ayting:** "Oddiy obyekt kalitlarni satrga aylantiradi, shuning uchun obyekt kalitlar to'qnashadi. Ixtiyoriy kalitlar uchun `Map` ishlataman va keshni hajm yoki vaqt bo'yicha cheklayman; kalit obyekt bilan birga yo'qolishi kerak bo'lsa — `WeakMap`."

**Esda tuting:** cheklovsiz kesh — xotira sizishi. Hajm chegarasi (LRU) yoki TTL qo'ying. Manba: [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

## Q11. Parallel so'rovlardan biri yiqilganda qolganlari bekor bo'lmayapti — qanday tuzatasiz? / When one parallel fetch fails the others keep running — how do you cancel them?

**Oddiy qilib aytganda:** `Promise.all` birinchi xatoda "tugadim" deydi, lekin qolgan so'rovlar **fonda ishlashda davom etadi** — trafik va server resursi behuda ketadi. Hamma so'rovga **bitta umumiy** AbortController signalini berib, xatoda uni bekor qilasiz.

**Yechim:**

```js
async function fetchAll(urls, fetchImpl) {
  const controller = new AbortController();
  try {
    return await Promise.all(urls.map((url) => fetchImpl(url, controller.signal)));
  } catch (error) {
    controller.abort();                           // qolganlarini to'xtatamiz
    throw error;
  }
}

let aborted = 0;
const fakeFetch = (url, signal) => new Promise((resolve, reject) => {
  if (url === "/bad") return setTimeout(() => reject(new Error("500")), 10);
  const timer = setTimeout(() => resolve(url), 200);
  signal.addEventListener("abort", () => { clearTimeout(timer); aborted++; reject(signal.reason); });
});

await fetchAll(["/a", "/bad", "/c"], fakeFetch).catch((e) => console.log("Xato:", e.message));
console.log("Bekor qilingan so'rovlar:", aborted); // 2
```

**Qanday tekshirasiz:** Network panelida bitta so'rov xato berganda qolganlari "(canceled)" holatiga o'tishini ko'ring.

**Intervyuda shunday ayting:** "`Promise.all` qolgan Promise'larni bekor qilmaydi. Barcha so'rovlarga umumiy AbortSignal berib, birinchi xatoda `abort()` chaqiraman. Timeout uchun `AbortSignal.any([controller.signal, AbortSignal.timeout(5000)])` bilan signallarni birlashtiraman."

**Esda tuting:** bekor qilish faqat so'rovni yuborgan tomonni to'xtatadi — server allaqachon boshlagan ishni tugatishi mumkin. Manba: [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

## Q12. Sana formatlash serverning tiliga bog'lanib, turli natija beryapti — qanday tuzatasiz? / Date formatting depends on the server locale and gives different results — how do you fix it?

**Oddiy qilib aytganda:** `date.toLocaleString()` — "qaysi kompyuterda ishlasam, o'sha kompyuter tilida va vaqt zonasida" degani. Serveringiz Germaniyada bo'lsa, o'zbek foydalanuvchi nemischa formatni va boshqa vaqtni ko'radi. **Tilni va vaqt zonasini aniq ko'rsating.**

**Yechim:**

```js
const date = new Date("2026-09-25T06:30:00Z");

const format = new Intl.DateTimeFormat("uz-UZ", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Tashkent",                       // UTC+5 — server qayerda bo'lishidan qat'i nazar
});
console.log(format.format(date));                  // 11:30 — Toshkent vaqti bilan
```

**Qanday tekshirasiz:** testni `TZ=UTC` va `TZ=America/New_York` muhit o'zgaruvchilari bilan ishga tushiring — natija bir xil bo'lishi kerak.

**Intervyuda shunday ayting:** "Sanani saqlashda UTC ishlataman, ko'rsatishda `Intl.DateTimeFormat`ga aniq locale va `timeZone` beraman. Shunda natija server va brauzer sozlamalariga bog'liq bo'lmaydi. Sana arifmetikasi uchun esa Temporal yoki ishonchli kutubxona."

**Esda tuting:** SSR'da serverda va brauzerda turli vaqt zonasi — hydration xatosi manbai. Manba: [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

## Q13. for await sikli break bilan to'xtatilganda stream yopilmayapti — nima qilasiz? / A stream isn't closed when a for-await loop breaks early — what do you do?

**Oddiy qilib aytganda:** `for await` siklidan `break` bilan chiqsangiz, JavaScript manbaning `return()` metodini chaqirib, "yopil" deydi. Agar manba (o'zingiz yozgan iterator) bu metodni to'g'ri qo'llamasa, fayl yoki ulanish ochiq qoladi. Generator'da tozalash kodini `finally` ichiga yozing.

**Yechim:**

```js
async function* readRows() {
  const connection = { open: true };
  try {
    for (let i = 1; ; i++) yield `qator ${i}`;
  } finally {
    connection.open = false;                       // break bo'lganda ham ishlaydi
    console.log("Ulanish yopildi");
  }
}

for await (const row of readRows()) {
  console.log(row);
  if (row === "qator 2") break;                    // erta chiqish
}
```

**Qanday tekshirasiz:** erta `break`, `return` va xato tashlash holatlarida resurs yopilganini test bilan tekshiring.

**Intervyuda shunday ayting:** "`for await` erta tugaganda iteratorning `return` metodi chaqiriladi. Async generator'da tozalashni `finally` blokiga yozaman, qo'lda yozilgan iterator'da esa `return()`ni amalga oshiraman — shunda break va xato holatida ham resurs yopiladi."

**Esda tuting:** Node.js stream'lari `for await` bilan ishlaydi va break'da o'zi `destroy()` bo'ladi. Manba: [for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of).

## Q14. JSON'dagi zararli __proto__ kaliti biznes obyektiga qo'shilib ketyapti — qanday himoyalanasiz? / A malicious __proto__ key from JSON gets merged into a business object — how do you protect it?

**Oddiy qilib aytganda:** foydalanuvchidan kelgan JSON'ni "hammasini ko'chir" usulida obyektga qo'shsangiz, u `__proto__` orqali barcha obyektlarga `isAdmin: true` kabi xususiyat qo'shib yuborishi mumkin (prototype pollution). Yechim: **faqat kutilgan maydonlarni**, aniq tekshirib olish.

**Yechim:**

```js
const input = JSON.parse('{"id": 7, "name": "Ali", "__proto__": {"isAdmin": true}, "role": "admin"}');

function toUser(data) {
  if (typeof data !== "object" || data === null) throw new TypeError("Obyekt kutilgan");
  if (!Object.hasOwn(data, "id") || !Number.isInteger(data.id)) throw new TypeError("id noto'g'ri");
  return {                                          // faqat ruxsat etilgan maydonlar
    id: data.id,
    name: String(data.name ?? ""),
    role: "user",                                   // rolni foydalanuvchi belgilamaydi
  };
}

const user = toUser(input);
console.log(user, {}.isAdmin);                      // { id: 7, name: 'Ali', role: 'user' } undefined
```

**Qanday tekshirasiz:** `__proto__`, `constructor`, `prototype` kalitli payload'lar uchun testlar yozing.

**Intervyuda shunday ayting:** "Kiruvchi ma'lumotni sxema bilan tekshirib, faqat kutilgan o'z xususiyatlarini yangi obyektga ko'chiraman — chuqur merge ishlatmayman. Rol kabi xavfsizlik maydonlarini foydalanuvchi ma'lumotidan olmayman. Zod kabi sxema kutubxonasi buni avtomatik qiladi."

**Esda tuting:** `Object.assign(target, input)` ham `__proto__` bilan xavfli bo'lishi mumkin. Manba: [Object.hasOwn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn).

## Q15. setTimeout ichidagi xato tashqi try/catch'ga tushmayapti — nega? / An error thrown inside setTimeout isn't caught by the outer try/catch — why?

**Oddiy qilib aytganda:** `try/catch` faqat **shu paytda** bajarilayotgan kodni qo'riqlaydi. `setTimeout` callback'i esa keyinroq, `try` bloki allaqachon tugagandan keyin ishlaydi — qo'riqchi ketib qolgan. Yechim: taymerni Promise'ga o'rab, `await` bilan kutish.

**Yechim:**

```js
function delay(ms, fn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try { resolve(fn()); } catch (error) { reject(error); } // xato Promise orqali uzatiladi
    }, ms);
  });
}

try {
  await delay(10, () => { throw new Error("Taymer ichidagi xato"); });
} catch (error) {
  console.log("Ushlandi:", error.message);
}
```

**Qanday tekshirasiz:** taymer ichida xato beradigan test yozib, u tashqi `catch`da ushlanishini va jarayon yiqilmasligini tekshiring.

**Intervyuda shunday ayting:** "`try/catch` sinxron va await qilingan kodni qamraydi, callback'lar esa keyingi task'da ishlaydi. Callback asosidagi API'ni Promise'ga o'rab, xatoni reject orqali uzataman va `await` joyida ushlayman. Node'da `timers/promises` ham bor."

**Esda tuting:** ushlanmagan xato Node'da jarayonni to'xtatadi — `unhandledRejection` va `uncaughtException`ni monitoring uchun loglang. Manba: [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

## Q16. Foydalanuvchi kiritgan uzun matnda RegExp CPU'ni band qilib qo'yyapti — nima qilasiz? / A regex hangs the CPU on long user input — what do you do?

**Oddiy qilib aytganda:** ba'zi RegExp naqshlari (masalan, `(a+)+$`) moslik topilmaganda **barcha kombinatsiyalarni** sinab ko'radi — 30 ta harfda ham millionlab urinish. Server "qotadi". Bu **ReDoS** hujumi. Yechim: naqshni soddalashtirish va matn uzunligini cheklash.

**Yechim:**

```js
const risky = /^(a+)+$/;                              // ichma-ich takrorlash — xavfli
const safe = /^a+$/;                                  // bir xil ma'no, xavfsiz

function validate(value) {
  if (value.length > 1_000) throw new RangeError("Matn juda uzun");
  return safe.test(value);
}

const attack = "a".repeat(28) + "!";
let start = performance.now();
safe.test(attack);
console.log(`Xavfsiz naqsh: ${(performance.now() - start).toFixed(2)} ms`);
start = performance.now();
risky.test("a".repeat(24) + "!");                     // 28 da soniyalar ketadi
console.log(`Xavfli naqsh (24 harf): ${(performance.now() - start).toFixed(0)} ms`);
console.log(validate("aaa"));
```

**Qanday tekshirasiz:** "yomon" kiritmalar (takrorlanuvchi belgilar + oxirida mos kelmaydigan belgi) bilan vaqt o'lchovchi test yozing.

**Intervyuda shunday ayting:** "ReDoS ichma-ich kvantifikatorli naqshlarda katastrofik backtracking'dan chiqadi. Naqshni soddalashtiraman, kiritish uzunligini cheklayman va foydalanuvchi matni uchun `RegExp.escape` ishlataman. Kritik joylarda chiziqli vaqt kafolatlaydigan dvigatel (masalan, re2) ishlatish mumkin."

**Esda tuting:** Node.js'da bitta sekin RegExp **barcha** foydalanuvchilarni to'xtatadi — event loop bitta. Manba: [Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions).

## Q17. Xatoni qayta o'raganda asl sabab va stack yo'qolyapti — qanday saqlaysiz? / The original error and stack are lost when rethrowing — how do you keep them?

**Oddiy qilib aytganda:** "To'lov amalga oshmadi" degan xato foydali, lekin **nega** — bazaga ulanmadimi, karta rad etildimi — bilish kerak. `cause` bilan yangi xatoga asl xatoni "biriktirib" qo'yasiz: yuqori darajada tushunarli xabar, ichida esa to'liq sabab.

**Yechim:**

```js
function chargeCard() {
  throw new Error("Bank API timeout");
}

function pay() {
  try {
    chargeCard();
  } catch (error) {
    throw new Error("To'lov amalga oshmadi", { cause: error });   // asl xato saqlanadi
  }
}

try {
  pay();
} catch (error) {
  console.log(error.message);         // To'lov amalga oshmadi
  console.log(error.cause.message);   // Bank API timeout
}
```

**Qanday tekshirasiz:** log'larda xato zanjiri to'liq ko'rinishini (ko'p logger va Sentry `cause`ni avtomatik ko'rsatadi) tekshiring.

**Intervyuda shunday ayting:** "Xatoni kontekst qo'shib qayta tashlaganda `{ cause }` bilan asl xatoni saqlayman — shunda foydalanuvchiga tushunarli xabar, log'da esa to'liq zanjir bo'ladi. `throw new Error(err.message)` kabi yo'qotuvchi o'rashdan qochaman."

**Esda tuting:** foydalanuvchiga `cause` ichidagi texnik tafsilotlarni ko'rsatmang — faqat logga. Manba: [Error.cause](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause).

## Q18. Modullar bir-birini import qilib, qiymat tayyor bo'lishidan oldin o'qilyapti — qanday tuzatasiz? / A circular import reads a value before it's initialized — how do you fix it?

**Oddiy qilib aytganda:** `a.js` `b.js`ni, `b.js` esa `a.js`ni import qiladi. Qaysi biri birinchi yuklansa, ikkinchisi uning hali tayyor bo'lmagan qiymatini ko'radi va `ReferenceError` yoki `undefined` oladi. Yechim: ikkalasiga kerakli umumiy narsani **uchinchi, mustaqil** modulga chiqarish.

**Yechim:**

```javascript
// ❌ config.js → import { formatPrice } from "./format.js"
//    format.js → import { CURRENCY } from "./config.js"   — aylana!

// ✅ constants.js — hech narsani import qilmaydi ("barg" modul)
export const CURRENCY = "UZS";

// config.js
import { CURRENCY } from "./constants.js";

// format.js
import { CURRENCY } from "./constants.js";
export const formatPrice = (n) => `${n.toLocaleString("uz-UZ")} ${CURRENCY}`;
```

**Qanday tekshirasiz:** `madge --circular src/` yoki ESLint'ning `import/no-cycle` qoidasi aylanalarni avtomatik topadi — CI'ga qo'shing.

**Intervyuda shunday ayting:** "Aylanma import'da modul hali baholanmagan qiymatni ko'radi. Umumiy konstantalar va tiplarni hech narsani import qilmaydigan barg modulga chiqaraman, modul darajasidagi yon ta'sirlarni kamaytiraman va aylanalarni lint qoidasi bilan CI'da taqiqlayman."

**Esda tuting:** "barrel" fayllar (`index.js` hamma narsani re-export qiladi) yashirin aylanalarning keng tarqalgan sababi. Manba: [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

## Q19. Katta massivda element borligini tekshirish sekinlashtiryapti — nima qilasiz? / Checking membership in a large array is a bottleneck — what do you do?

**Oddiy qilib aytganda:** `array.includes(x)` har safar massivni **boshidan oxirigacha** ko'radi. 100 000 elementli ro'yxatda 100 000 marta tekshirsangiz — 10 milliard qadam. `Set` esa "bu element bormi?" savoliga deyarli **bir zumda** javob beradi.

**Yechim:**

```js
const ids = Array.from({ length: 100_000 }, (_, i) => i);
const candidates = Array.from({ length: 5_000 }, (_, i) => i * 7);

let start = performance.now();
candidates.filter((c) => ids.includes(c));                 // O(n × m)
console.log(`Array.includes: ${(performance.now() - start).toFixed(0)} ms`);

start = performance.now();
const allowed = new Set(ids);                               // bir marta quriladi
candidates.filter((c) => allowed.has(c));                   // har tekshiruv ~O(1)
console.log(`Set.has: ${(performance.now() - start).toFixed(1)} ms`);
```

**Qanday tekshirasiz:** profiler bilan qaysi funksiya vaqt olayotganini aniqlang, o'zgarishdan oldin va keyin o'lchang.

**Intervyuda shunday ayting:** "Ko'p marta 'bormi?' deb tekshirilsa, massivni bir marta `Set`ga aylantiraman — har tekshiruv O(n) dan o'rtacha O(1) ga tushadi. Kalit-qiymat kerak bo'lsa — `Map`. Lekin avval profiler bilan haqiqiy sekin joyni tasdiqlayman."

**Esda tuting:** `Set` obyektlarni **havola** bo'yicha solishtiradi — `{id: 1}` ni ikkinchi marta yangi obyekt bilan qidirsangiz topilmaydi; ID'larni saqlang. Manba: [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

## Q20. Xato bo'lganda resurs (fayl, ulanish) yopilmay qolyapti — qanday kafolatlaysiz? / A resource isn't closed when an exception happens — how do you guarantee cleanup?

**Oddiy qilib aytganda:** ish o'rtasida xato chiqsa, `close()` qatoriga navbat kelmaydi va fayl ochiq qoladi. `finally` bloki **har qanday holatda** ishlaydi. Zamonaviy runtime'larda `using` / `await using` buni avtomatik qiladi (JS asoslari Q20 va `nodejs_chuqur.md` Q13).

**Yechim:**

```js
function openResource(name) {
  console.log(`${name} ochildi`);
  return { close: () => console.log(`${name} yopildi`), [Symbol.dispose]() { this.close(); } };
}

// 1-usul: try/finally — hamma joyda ishlaydi
function processWithFinally() {
  const file = openResource("fayl");
  try {
    throw new Error("O'qishda xato");
  } finally {
    file.close();                                   // xato bo'lsa ham
  }
}
try { processWithFinally(); } catch (error) { console.log("Xato:", error.message); }

// 2-usul: using — Node 24+ va zamonaviy brauzerlarda
function processWithUsing() {
  using connection = openResource("ulanish");
  throw new Error("So'rovda xato");
}                                                    // blokdan chiqishda avtomatik yopiladi
try { processWithUsing(); } catch (error) { console.log("Xato:", error.message); }
```

**Qanday tekshirasiz:** xato holatida ham resurs yopilganini (masalan, ochiq ulanishlar soni o'smasligini) test bilan tekshiring.

**Intervyuda shunday ayting:** "Resurslarni har doim `try/finally`da yopaman; qo'llab-quvvatlaydigan runtime'da `using` va `Symbol.dispose` bilan tozalash avtomatik va teskari tartibda bo'ladi. Ochiq resurslar sonini metrika sifatida kuzataman."

**Esda tuting:** `using` ES2027 standartiga kiradi — eski brauzerlar uchun transpile qilish yoki `try/finally` kerak. Manba: [Resource management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Resource_management).
