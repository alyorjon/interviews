# TypeScript chuqur — tip tizimi va TypeScript 6/7 davri

> **Kim uchun:** TypeScript'da interfeys va generic yozishni biladigan, endi tip tizimini ichidan tushuntira oladigan va TS 7 ga o'tishni rejalashtiradigan dasturchi.
> **Tekshirilgan:** barcha misollar `tsc --strict` bilan tip tekshiruvidan o'tkazilgan va Node.js v26.9.0 da type stripping orqali ishga tushirilgan (2026-yil 25-sentabr).

---

# 2025–2026 yangiliklari

**TypeScript 7.0 (2026-yil 8-iyul) — kompilyator Go'da:**
- Bu **port**, qayta yozish emas: tip tekshiruvi semantikasi 6.0 bilan bir xil, lekin to'liq build 8–12 barobar tez (VS Code: 125.7 s → 10.6 s), xotira 6–26% kam.
- O'rnatish odatdagidek: `npm i -D typescript` (npm'dagi `latest` — 7.x).
- 6.0 da deprecated qilingan opsiyalar **olib tashlandi**: `target: es5`, `moduleResolution: node`/`node10`, `baseUrl`, `module: amd/umd/systemjs`, `downlevelIteration` va boshqalar.
- 7.0 da **dasturiy (programmatic) API yo'q** — ts-morph, ba'zi lint qoidalari, Vue/Svelte/Angular til xizmatlari hozircha TS 6 ga tayanadi. API 7.1 da kutilmoqda (reja: beta 2026-yil 6-oktabr, barqaror 2026-yil 24-noyabr).

**TypeScript 6.0 (2026-yil 23-mart) — JavaScript'da yozilgan oxirgi versiya, 7.0 ga ko'prik:**
- Yangi default'lar: `strict: true`, `module: esnext`, `target: es2025`, `types: []` (endi `@types/*` avtomatik yuklanmaydi — `"types": ["node"]` ni aniq yozing), `rootDir: "."`, `noUncheckedSideEffectImports: true`.
- Deprecated: `es5` target, `moduleResolution node10/classic`, `baseUrl`, `outFile`, `esModuleInterop: false`, `import ... asserts` (o'rniga `with`).
- Yangi: `--stableTypeOrdering` (6→7 migratsiyasini tekshirish), `es2025` lib, Temporal tiplari, `Map` upsert tiplari, `RegExp.escape`, `#/` bilan boshlanuvchi subpath import'lar.
- O'tish davrida: `"ignoreDeprecations": "6.0"`.

**TypeScript 5.8 (2025-yil fevral) va 5.9 (2025-yil iyul):** `--erasableSyntaxOnly` (Node'ning type stripping'iga mos kod), `--module node18`/`node20`, `import defer`, soddalashtirilgan `tsc --init`.

**Node.js TypeScript'ni o'zi ishga tushiradi:** 23.6 va 22.18 dan beri `node app.ts` default ishlaydi, lekin faqat erasable sintaksis bilan (`enum`, parameter properties, runtime `namespace` — yo'q). Node 26 `--experimental-transform-types` flag'ini olib tashladi.

**Manbalar:** [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) · [Announcing TypeScript 6.0](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/) · [InfoQ: TypeScript 7](https://www.infoq.com/news/2026/08/typescript-7-released/) · [Node.js: TypeScript](https://nodejs.org/api/typescript.html)

---

# Savollar

## Q1. Structural typing nima va u qanday kutilmagan natija beradi? / What is structural typing and when does it surprise you?

**Oddiy qilib aytganda:** TypeScript "nomiga" emas, "shakliga" qaraydi: kerakli maydonlari bor har qanday obyekt mos keladi — xuddi eshikdan kalit emas, kalitning shakli o'tganidek. Shuning uchun ikki xil ma'nodagi string (foydalanuvchi ID va buyurtma ID) aralashib ketishi mumkin.

**Batafsilroq:**
TypeScript tiplarni **nomi** bo'yicha emas, **shakli** bo'yicha solishtiradi: kerakli maydonlari bor har qanday qiymat mos keladi.

```ts
interface Point { x: number; y: number }
const point3d = { x: 1, y: 2, z: 3 };
const p: Point = point3d;             // OK — ortiqcha maydon muammo emas
// const q: Point = { x: 1, y: 2, z: 3 }; // Xato: "excess property check" faqat yangi literal uchun

type UserId = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };
const asUserId = (value: string) => value as UserId;
function loadUser(id: UserId) { return id; }
loadUser(asUserId("u1"));
// loadUser("o1" as OrderId); // Xato — "branded" tiplar nomiy farqni sun'iy yaratadi
console.log(p.x, loadUser(asUserId("u1")));
```

Kutilmagan joy: ikki xil ma'nodagi `string` (foydalanuvchi ID va buyurtma ID) aralashib ketadi — yechim **branded type**.

**Intervyuda shunday ayting:** "TypeScript structural typing ishlatadi: tiplar nomi emas, shakli bo'yicha mos keladi. Ortiqcha maydon tekshiruvi faqat yangi obyekt literallariga qo'llanadi. Bir xil shakldagi, lekin turli ma'nodagi qiymatlarni aralashtirmaslik uchun branded type'lar ishlataman."

## Q2. unknown, any va never farqi nima? / What is the difference between unknown, any and never?

**Oddiy qilib aytganda:** any — "tekshirma, menga ishon" (xavfli); unknown — "nima ekanini bilmayman, avval tekshiraman" (xavfsiz); never — "bu yerga hech qachon yetib kelinmaydi".

**Batafsilroq:**
- `any` — tekshiruvni o'chiradi, "yuqumli": undan olingan har narsa ham `any`. Faqat migratsiyada vaqtincha.
- `unknown` — "har qanday qiymat, lekin ishlatishdan oldin tekshir". Tashqi ma'lumot (JSON, `catch (e)`) uchun to'g'ri tip.
- `never` — hech qachon bo'lmaydigan qiymat: `throw` qiladigan funksiya, to'liq qamrab olingan `switch`ning qolgan holati.

```ts
function parsePort(raw: unknown): number {
  if (typeof raw === "string" && /^\d+$/.test(raw)) return Number(raw);
  if (typeof raw === "number" && Number.isInteger(raw)) return raw;
  throw new Error("port noto'g'ri");
}
console.log(parsePort("8080"));
```

**Intervyuda shunday ayting:** "any tip tekshiruvini o'chiradi va yuqumli; unknown esa ishlatishdan oldin toraytirishni talab qiladi — tashqi ma'lumot va catch uchun to'g'ri tanlov. never — mumkin bo'lmagan holat: exhaustiveness tekshiruvi va throw qiladigan funksiyalar uchun."

## Q3. Discriminated union va exhaustiveness tekshiruvi qanday ishlaydi? / How do discriminated unions and exhaustiveness checks work?

**Oddiy qilib aytganda:** discriminated union — har varianti o'z "belgisi" (kind yoki name maydoni) bilan keladigan tip. switch shu belgiga qarab qaysi variant ekanini aniq biladi. Yangi variant qo'shib, uni switch'da unutsangiz, kompilyator ogohlantiradi.

**Batafsilroq:**
Har bir variantda umumiy literal maydon (`kind`) bo'lsa, TypeScript `switch` ichida tipni toraytiradi. `default`da qiymatni `never`ga berish yangi variant qo'shilganda **kompilyatsiya xatosi** beradi — unutilgan holat qolmaydi.

```ts
type Route =
  | { name: "dashboard" }
  | { name: "page"; slug: string }
  | { name: "review"; topic: string };

function href(route: Route): string {
  switch (route.name) {
    case "dashboard": return "#/";
    case "page": return `#/page/${route.slug}`;   // bu yerda route.slug mavjud
    case "review": return `#/review/${route.topic}`;
    default: {
      const unreachable: never = route;            // yangi variant qo'shilsa — xato
      return unreachable;
    }
  }
}
console.log(href({ name: "page", slug: "sql" }));
```

Shu portalning frontend router'i aynan shunday tuzilgan.

**Intervyuda shunday ayting:** "Umumiy literal maydonli union'larda TypeScript switch ichida tipni toraytiradi. default'da qiymatni never'ga tayinlash yangi variant qo'shilganda kompilyatsiya xatosini beradi — unutilgan holat qolmaydi. Bu portal router'i shunday qurilgan."

## Q4. Generic'lar va cheklovlar (constraints) qachon kerak? / When do you need generics and generic constraints?

**Oddiy qilib aytganda:** generic — tipni "parametr" sifatida qabul qilish: bitta funksiya har xil tipdagi ro'yxatlar bilan ishlaydi, lekin kirish va chiqish orasidagi bog'liqlik saqlanadi. extends — shu parametrga talab qo'yish: "faqat kalit bo'la oladigan tip".

**Batafsilroq:**
Generic — tipni parametr sifatida qabul qilish, kirish va chiqish orasidagi bog'liqlikni saqlash uchun. `extends` — parametrga talab qo'yadi.

```ts
function groupBy<T, K extends PropertyKey>(items: readonly T[], key: (item: T) => K): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const item of items) (result[key(item)] ??= []).push(item);
  return result;
}

const cards = [{ topic: "sql", id: 1 }, { topic: "js", id: 2 }, { topic: "sql", id: 3 }] as const;
const grouped = groupBy(cards, (card) => card.topic); // Record<"sql" | "js", ...>
console.log(grouped.sql.map((card) => card.id));
```

**Intervyuda shunday ayting:** "Generic kirish va chiqish tiplari orasidagi bog'liqlikni saqlaydi, extends esa parametrga cheklov qo'yadi. Hech qayerda bog'lanmaydigan generic — yashirin as, xolos. Generic'ni faqat haqiqatan tiplarni bog'lash kerak bo'lganda qo'shaman."

**Esda tuting:** hech qayerda bog'lanmaydigan generic (`function f<T>(x: any): T`) — bu tip xavfsizligi emas, yashirin `as`.

## Q5. Conditional va mapped type'lar nima uchun kerak? / What are conditional and mapped types for?

**Oddiy qilib aytganda:** mapped type — mavjud tipning har bir maydonini "qayta ishlash" (masalan, hammasini ixtiyoriy qilish). Conditional type — tiplar uchun if/else: "agar Promise bo'lsa, ichidagi tipni ol". Partial, Pick, ReturnType aynan shu mexanizmlar bilan yozilgan.

**Batafsilroq:**
**Mapped type** — mavjud tipning har bir kaliti bo'yicha yangi tip yaratish. **Conditional type** — `T extends U ? X : Y`; `infer` bilan tip ichidan qism "sug'urib" olish.

```ts
type Nullable<T> = { [K in keyof T]: T[K] | null };
type Getters<T> = { [K in keyof T & string as `get${Capitalize<K>}`]: () => T[K] };
type Awaited2<T> = T extends Promise<infer V> ? Awaited2<V> : T;

interface Config { port: number; host: string }
const getters: Getters<Config> = { getPort: () => 80, getHost: () => "localhost" };
type Value = Awaited2<Promise<Promise<number>>>; // number
const value: Value = 42;
const partial: Nullable<Config> = { port: null, host: "x" };
console.log(getters.getPort(), value, partial.port);
```

Standart kutubxonadagi `Partial`, `Pick`, `Omit`, `ReturnType`, `Awaited` shu mexanizmlar bilan yozilgan.

**Intervyuda shunday ayting:** "Mapped type'lar mavjud tipdan yangisini yasaydi, key remapping bilan nomlarni ham o'zgartiradi. Conditional type'lar infer bilan tip ichidan qismni ajratadi. Ular standart utility tiplarning asosi; murakkab tip mantiqini kutubxona chegarasida saqlayman."

## Q6. satisfies operatori nimani hal qiladi? / What problem does the satisfies operator solve?

**Oddiy qilib aytganda:** satisfies — "shu qolipga mosligini tekshir, lekin qiymatning aniq tipini buzma". Oddiy annotatsiya (const x: Type) esa qiymatni umumiyroq tipga "kengaytiradi" va har bir maydonning aniq shakli yo'qoladi.

**Batafsilroq:**
`const x: Type = ...` — qiymat tipga mosligini tekshiradi, lekin o'zgaruvchi tipi **annotatsiyadagi keng tipga** aylanadi — har bir maydonning aniq shakli yo'qoladi. `satisfies` — tekshiradi, lekin qiymatdan chiqarilgan aniq tipni saqlab qoladi.

```ts
type Token = string | { light: string; dark: string };

const tokens = {
  radius: "12px",
  accent: { light: "#5b47c7", dark: "#a898f5" },
} satisfies Record<string, Token>;   // noto'g'ri qiymat qo'shilsa — xato

tokens.radius.endsWith("px");         // OK: radius — string ekani ma'lum
tokens.accent.dark.toUpperCase();     // OK: accent — obyekt ekani ma'lum

const annotated: Record<string, Token> = tokens;
// annotated.accent.dark;             // Xato: Token string ham bo'lishi mumkin, kalit mavjudligi ham noma'lum
console.log(Object.keys(tokens), tokens.accent.dark);
```

**Nozik joy:** `satisfies` literal tiplarni o'zi saqlamaydi — kontekst tipi `string` bo'lsa, `"12px"` baribir `string` bo'ladi. Literal kerak bo'lsa: `{ ... } as const satisfies ...`.

**Intervyuda shunday ayting:** "satisfies qiymatni tipga tekshiradi, lekin inferred tipni saqlaydi — konfiguratsiya obyektlarida har maydon aniq qoladi. Annotatsiya esa o'zgaruvchini keng tipga aylantiradi. Literal tiplar kerak bo'lsa as const satisfies ishlataman."

## Q7. Type narrowing va type predicate qanday ishlaydi? / How do type narrowing and type predicates work?

**Oddiy qilib aytganda:** narrowing — TypeScript'ning kuzatuvchanligi: siz if (typeof x === "string") deb tekshirsangiz, u shu blok ichida x string ekanini "eslab qoladi". Type predicate esa o'z tekshiruv funksiyangizni TypeScript'ga o'rgatish usuli.

**Batafsilroq:**
TypeScript `typeof`, `instanceof`, `in`, tenglik va truthiness tekshiruvlaridan keyin tipni toraytiradi. O'z tekshiruv funksiyangiz uchun **type predicate** (`value is T`) yozasiz. TS 5.5 dan beri oddiy callback'lardan predicate avtomatik chiqariladi: `[1, null, 2].filter((x) => x !== null)` endi `number[]` beradi (ilgari `(number | null)[]` edi).

```ts
interface Card { id: string; answer: string }
function isCard(value: unknown): value is Card {
  return typeof value === "object" && value !== null
    && typeof (value as Card).id === "string" && typeof (value as Card).answer === "string";
}

const raw: unknown[] = [{ id: "a", answer: "x" }, { id: 1 }, null];
const cards = raw.filter(isCard);                    // Card[]
const maybeIds = cards.map((card) => (card.answer ? card.id : null));
const ids: string[] = maybeIds.filter((id) => id !== null); // TS 5.5+: predicate avtomatik
console.log(ids);
```

**Xavf:** predicate noto'g'ri yozilsa, kompilyator unga ishonadi — runtime'da buziladi. Tashqi ma'lumot uchun schema kutubxonasi (Zod, Valibot) ishonchliroq.

**Intervyuda shunday ayting:** "TypeScript typeof, instanceof, in va tenglik tekshiruvlaridan keyin tipni toraytiradi. O'z tekshiruvlarim uchun value is T predicate yozaman; TS 5.5 dan oddiy callback'larda predicate avtomatik chiqariladi. Tashqi ma'lumot uchun predicate o'rniga sxema kutubxonasi ishonchliroq."

## Q8. Variance (kovariantlik) nima va massivlar nega xavfli? / What is variance and why are arrays unsound?

**Oddiy qilib aytganda:** variance — "it — hayvon, demak itlar ro'yxati — hayvonlar ro'yxati" degan mantiqning chegarasi. O'qish uchun bu to'g'ri, lekin yozish mumkin bo'lsa, "hayvonlar ro'yxati"ga mushuk qo'shib, itlar ro'yxatini buzib qo'yish mumkin. TypeScript buni ataylab ushlamaydi.

**Batafsilroq:**
`Dog` — `Animal`ning quyi tipi bo'lsa, `Dog[]` ham `Animal[]`ga beriladi (kovariant). Lekin massiv **o'zgaruvchan** — `Animal[]` orqali unga `Cat` yozish mumkin va TypeScript buni ushlamaydi (tip tizimi bu yerda ataylab "unsound").

```ts
interface Animal { name: string }
interface Dog extends Animal { bark(): string }
const dogs: Dog[] = [{ name: "Rex", bark: () => "vov" }];
const animals: Animal[] = dogs;          // ruxsat
animals.push({ name: "Mushuk" });        // tip xatosi yo'q...
// dogs[1].bark();                       // ...lekin runtime'da TypeError

const readonlyAnimals: readonly Animal[] = dogs; // readonly — yozib bo'lmaydi, xavf yo'q
console.log(readonlyAnimals.length);
```

Yechim: funksiya parametrlarini `readonly T[]` qilish. Metod sintaksisidagi parametrlar ham bivariant — `strictFunctionTypes` faqat funksiya-xususiyat sintaksisiga (`fn: (x: T) => void`) ta'sir qiladi.

**Intervyuda shunday ayting:** "Massivlar kovariant va o'zgaruvchan, shuning uchun TypeScript bu yerda unsound — quyi tip massivi orqali noto'g'ri element qo'shish mumkin. Funksiya parametrlarini readonly T[] qilaman. strictFunctionTypes faqat funksiya-xususiyat sintaksisiga ta'sir qiladi, metod sintaksisi bivariant qoladi."

## Q9. erasableSyntaxOnly nima va Node.js type stripping bilan bog'liqligi? / What is erasableSyntaxOnly and how does it relate to Node.js type stripping?

**Oddiy qilib aytganda:** Node.js endi TypeScript fayllarni to'g'ridan-to'g'ri ishga tushiradi, lekin faqat tiplarni "o'chirib" tashlaydi — xuddi matndagi izohlarni o'chirgandek. JavaScript'ga aylanishi kerak bo'lgan narsalar (enum kabi) ishlamaydi. erasableSyntaxOnly buni oldindan tekshiradi.

**Batafsilroq:**
Node `node app.ts` da tiplarni shunchaki **o'chiradi** (bo'sh joy bilan almashtiradi, qator raqamlari saqlanadi) — kod generatsiya qilmaydi. Shuning uchun JavaScript'ga "aylanishi" kerak bo'lgan sintaksis ishlamaydi:

| Ishlamaydi | O'rniga |
|---|---|
| `enum Level { Low, High }` | `const Level = { Low: 0, High: 1 } as const` |
| `constructor(private repo: Repo)` | maydonni aniq e'lon qilib, konstruktorda tayinlash |
| runtime kodli `namespace` | ES modul |

`tsconfig.json`da `"erasableSyntaxOnly": true` (TS 5.8+) shu qoidani kompilyatsiya vaqtida tekshiradi. Import'larda tip uchun `import type` va fayl kengaytmasi (`./x.ts`) yozish kerak (`"allowImportingTsExtensions"`, `"verbatimModuleSyntax": true`).

```ts
const Level = { Low: 0, High: 1 } as const;
type Level = (typeof Level)[keyof typeof Level]; // 0 | 1

class Service {
  readonly repo: { find(): string };
  constructor(repo: { find(): string }) { this.repo = repo; }
}
const level: Level = Level.High;
console.log(level, new Service({ find: () => "ok" }).repo.find());
```

**Intervyuda shunday ayting:** "Node type stripping faqat erasable sintaksisni qo'llaydi: enum, parameter properties va runtime namespace ishlamaydi. erasableSyntaxOnly (TS 5.8+) buni kompilyatsiya vaqtida majburlaydi; enum o'rniga as const obyekt ishlataman va importlarda verbatimModuleSyntax bilan import type yozaman."

## Q10. TypeScript 7 ga o'tishni qanday rejalashtirasiz? / How do you plan a migration to TypeScript 7?

**Oddiy qilib aytganda:** TypeScript 7 — kompilyator Go tiliga ko'chirilgan, 8–12 barobar tez. Lekin ko'chishdan oldin "uyni tartibga keltirish" kerak: TS 6 dagi barcha eskirgan sozlamalarni tuzatish, chunki TS 7 ularni butunlay olib tashlagan.

**Batafsilroq:**
1. **Avval TS 6.0 ga o'ting.** Barcha deprecation ogohlantirishlarini tuzating (`baseUrl` → `paths`, `node10` → `nodenext`/`bundler`, `es5` target yo'q). `ignoreDeprecations` bilan qolmang — 7.0 da bu opsiyalar yo'q.
2. **Yangi default'larni aniq yozing:** `"types": ["node"]`, `"rootDir": "./src"` — aks holda `@types` yuklanmaydi yoki `dist` tuzilmasi o'zgaradi.
3. **`--stableTypeOrdering` bilan tekshiring** — 6 va 7 orasidagi tip tartibi farqlari (masalan, `.d.ts` chiqishida) oldindan ko'rinadi.
4. **Programmatic API'ga tayanadigan vositalarni tekshiring** (ts-morph, typescript-eslint'ning tip-bilan qoidalari, framework til xizmatlari) — ular 7.1 gacha TS 6 da qolishi mumkin; kerak bo'lsa ikki versiyani yonma-yon ishlating.
5. CI'da vaqtni o'lchang — asosiy foyda shu yerda (8–12x).

**Intervyuda shunday ayting:** "Avval TS 6 ga o'tib, barcha deprecation'larni tuzataman — baseUrl, node10, es5 — va yangi default'larni (types, rootDir) aniq yozaman. --stableTypeOrdering bilan farqlarni tekshiraman. TS 7.0 da programmatic API yo'q, shuning uchun ts-morph va lint vositalari 7.1 gacha TS 6 da qolishi mumkin."

## Q11. strict rejimi qaysi flag'larni yoqadi va noUncheckedIndexedAccess nima? / What does strict enable, and what is noUncheckedIndexedAccess?

**Oddiy qilib aytganda:** strict — TypeScript'ning "qat'iy o'qituvchi" rejimlari to'plami: null tekshiruvi, yashirin any taqiqi va boshqalar. noUncheckedIndexedAccess esa qo'shimcha qoida: "massivdan olingan element yo'q bo'lishi mumkin" deb eslatadi — eng ko'p uchraydigan xatolardan birini ushlaydi.

**Batafsilroq:**
`strict: true` (TS 6 dan default) — `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis`, `useUnknownInCatchVariables`, `alwaysStrict`.

`strict` ga **kirmaydigan**, lekin foydali: `noUncheckedIndexedAccess` — `arr[i]` va `record[key]` tipiga `| undefined` qo'shadi, eng ko'p uchraydigan runtime xatosini ushlaydi.

```ts
const scores: Record<string, number> = { a: 1 };
const value = scores["b"];            // noUncheckedIndexedAccess bilan: number | undefined
console.log((value ?? 0) + 1);        // tekshiruvsiz qo'shish xato bo'lardi
```

Shu loyihada `arr[0]!` kabi joylar shu flag bilan ishlaganda ko'rinadi — `!` har safar "bu yerda xato bo'lmasligini men kafolatlayman" degan izoh bo'lishi kerak.

**Intervyuda shunday ayting:** "strict (TS 6 dan default) strictNullChecks, noImplicitAny, strictFunctionTypes va boshqalarni yoqadi. Unga kirmaydigan noUncheckedIndexedAccess'ni ham yoqaman — u indeks orqali olingan qiymatga undefined qo'shib, runtime xatolarini oldini oladi."

## Q12. declaration merging va module augmentation qachon kerak? / When do you use declaration merging and module augmentation?

**Oddiy qilib aytganda:** declaration merging — bir xil nomli interfeyslar avtomatik birlashadi. Bu tayyor kutubxonaning tipini "kengaytirish" imkonini beradi: masalan, Express'ning Request'iga user maydonini qo'shish yoki Window'ga Telegram'ni.

**Batafsilroq:**
Bir xil nomli `interface`lar birlashadi — bu kutubxona tiplarini kengaytirish uchun ishlatiladi (klasslarni emas, faqat interfeys va namespace'larni).

```ts
declare global {
  interface Window { Telegram?: { WebApp?: { initData?: string } } }
}
// Express misoli: declare module "express-serve-static-core" { interface Request { user?: { id: number } } }

const initData = typeof window === "undefined" ? "" : window.Telegram?.WebApp?.initData ?? "";
console.log(JSON.stringify(initData));
export {};
```

Qoida: augmentation'ni bitta `types.d.ts` faylda saqlang va imkon bo'lsa global o'rniga modulga bog'lang — global tiplar butun loyihaga "sizib" ketadi.

**Intervyuda shunday ayting:** "Bir xil nomli interfeyslar birlashadi — kutubxona tiplarini module augmentation bilan kengaytirish uchun ishlataman. Augmentation'larni bitta types.d.ts faylda saqlayman va imkon bo'lsa global emas, modul darajasida qilaman."

