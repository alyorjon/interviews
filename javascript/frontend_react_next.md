# ⚛️ 3. JavaScript Frontend (React, Next.js, Vite) — oddiy tilda

> **Kim uchun:** React'ni endi o'rganayotganlar va frontend intervyusiga tayyorlanayotganlar. Har bir savol oddiy tilda, hayotiy misol bilan.
> **Versiyalar (2026-yil sentabr):** React 19.3, Next.js 16.3, Vite 8.3. Next.js 16 da `middleware.ts` → `proxy.ts` bo'ldi, `params`/`cookies()` faqat asinxron; Vite 8 da bundler — Rolldown, `build.rollupOptions` → `build.rolldownOptions`.
> **Manbalar:** [react.dev](https://react.dev) · [Next.js 16](https://nextjs.org/blog/next-16) · [React 19.2](https://react.dev/blog/2025/10/01/react-19-2) · [Vite 8](https://vite.dev/blog/announcing-vite8) · [Vite migratsiya](https://vite.dev/guide/migration)

---

# Kichik lug'at

| So'z | Oddiy ma'nosi |
|---|---|
| **Komponent** | UI bo'lagini qaytaradigan funksiya: `function Button() { return <button>OK</button> }` |
| **Props** | komponentga tashqaridan beriladigan ma'lumot (funksiya argumentlari kabi) |
| **State** | komponentning o'zi eslab qoladigan, o'zgarganda ekranni yangilaydigan ma'lumot |
| **Render** | React komponentni chaqirib, ekranda nima bo'lishi kerakligini hisoblashi |
| **Hook** | `use` bilan boshlanadigan maxsus funksiya: `useState`, `useEffect`... |
| **Effect** | render'dan keyin tashqi dunyo bilan ishlash: so'rov, taymer, obuna |
| **SSR** | sahifa HTML'ini serverda tayyorlab yuborish |
| **Hydration** | serverdan kelgan HTML'ga brauzerda JavaScript "jon kiritishi" |
| **Bundle** | brauzerga yuboriladigan yig'ilgan JavaScript fayllar |

---

# Savollar

## Q1. Virtual DOM va reconciliation nima? / What are the virtual DOM and reconciliation?

**Oddiy qilib aytganda:** uyingizni ta'mirlashdan oldin qog'ozda **yangi rejasini** chizasiz, eski reja bilan solishtirasiz va faqat **farq qilgan joylarni** qurasiz — butun uyni buzib qayta qurmaysiz. React ham shunday: komponent o'zgarganda yangi "reja" (virtual DOM) yaratadi, eskisi bilan solishtiradi (reconciliation) va haqiqiy sahifada faqat o'zgargan qismlarni yangilaydi.

**Batafsilroq:**
- **Virtual DOM** — sahifaning JavaScript obyektlaridagi yengil nusxasi.
- **Reconciliation** — eski va yangi daraxtni solishtirish. Qoidalar: element turi o'zgarsa (`div` → `span`), butun qism qayta yaratiladi; ro'yxatlarda `key` bo'yicha qaysi element qaysi ekani aniqlanadi.
- **Fiber** — React'ning ichki arxitekturasi: renderni kichik bo'laklarga bo'ladi, shuning uchun muhim ishlarni (masalan, inputga yozish) birinchi bajarib, kamroq muhimlarini kechiktira oladi.

**Misol:**

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  // Bosilganda React yangi virtual daraxt yaratadi va faqat matnni ("0" → "1") yangilaydi.
  return <button onClick={() => setCount(count + 1)}>Bosildi: {count}</button>;
}
```

**Intervyuda shunday ayting:** "React har renderda UI tavsifini virtual daraxt sifatida yaratadi va oldingisi bilan solishtiradi. Faqat farqlar haqiqiy DOM'ga qo'llanadi. Fiber bu ishni bo'laklab, ustuvorlik bilan bajarishga imkon beradi, shuning uchun foydalanuvchi harakatlariga javob tez qoladi."

**Esda tuting:** virtual DOM "har doim tez" degani emas — keraksiz renderlar baribir vaqt oladi. Asosiy foyda — deklarativ kod va avtomatik minimal yangilanish.

## Q2. Asosiy hook'lar: useState, useEffect, useMemo, useCallback, useRef nima qiladi? / What do the core hooks do?

**Oddiy qilib aytganda:**
- `useState` — komponentning **xotirasi**: qiymat o'zgarsa, ekran yangilanadi.
- `useEffect` — render'dan keyin **tashqi dunyo** bilan ishlash (so'rov, taymer).
- `useMemo` — og'ir **hisob natijasini** eslab qolish.
- `useCallback` — **funksiyani** eslab qolish (har renderda yangisi yaratilmasin).
- `useRef` — o'zgarganda ekranni yangilamaydigan **yashirin quti** (DOM elementga havola yoki taymer ID).

**Batafsilroq:**
- Hook'lar faqat komponent yoki boshqa hook'ning **yuqori darajasida** chaqiriladi — `if` yoki sikl ichida emas (Q33).
- `useEffect`ning ikkinchi argumenti — **dependency** ro'yxati: qaysi qiymatlar o'zgarsa, effect qayta ishlaydi.
- React Compiler (React 19 bilan) ko'p hollarda `useMemo`/`useCallback`ni avtomatik qo'shadi, lekin ularning ma'nosini bilish shart.

**Misol:**

```tsx
function SearchPage({ items }: { items: string[] }) {
  const [query, setQuery] = useState("");                         // xotira
  const inputRef = useRef<HTMLInputElement>(null);                // DOM'ga havola
  const filtered = useMemo(                                       // og'ir hisobni eslab qolish
    () => items.filter((item) => item.includes(query)),
    [items, query],
  );
  const clear = useCallback(() => setQuery(""), []);             // barqaror funksiya

  useEffect(() => { inputRef.current?.focus(); }, []);           // bir marta, render'dan keyin

  return (
    <>
      <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={clear}>Tozalash</button>
      <ul>{filtered.map((item) => <li key={item}>{item}</li>)}</ul>
    </>
  );
}
```

**Intervyuda shunday ayting:** "`useState` holat va qayta render uchun, `useEffect` tashqi tizimlar bilan sinxronlash uchun, `useMemo` va `useCallback` qiymat va funksiyani dependency o'zgarmaguncha saqlash uchun, `useRef` esa render keltirib chiqarmaydigan o'zgaruvchan qiymat uchun. Hook'lar faqat yuqori darajada chaqiriladi."

**Esda tuting:** hamma narsani `useMemo` bilan o'rash kerak emas — o'lchab, haqiqatan sekin joyga qo'llang.

## Q3. Vite webpack'dan nimasi bilan farq qiladi? / How does Vite differ from webpack?

**Oddiy qilib aytganda:** webpack — restoran oshpazi, u **barcha taomlarni oldindan** pishirib, keyin eshikni ochadi: katta loyihada dev server bir necha daqiqa ishga tushadi. Vite — **buyurtma bo'yicha** pishiradigan oshpaz: brauzer qaysi faylni so'rasa, faqat o'shani tayyorlaydi — server bir zumda ishga tushadi.

**Batafsilroq:**
- **Dev rejimda** Vite brauzerning o'zidagi ES modullardan foydalanadi: fayllar birlashtirilmaydi, so'ralganda o'zgartirib beriladi. Kutubxonalar (`node_modules`) esa bir marta oldindan tayyorlanadi.
- **HMR** (Hot Module Replacement — sahifani qayta yuklamasdan kodni yangilash) juda tez, chunki faqat o'zgargan modul qayta ishlanadi.
- **Production build**da Vite 8 **Rolldown** (Rust'da yozilgan bundler) ishlatadi — tez va optimallashtirilgan bundle.
- Webpack: juda moslashuvchan, katta plagin ekotizimi, lekin sozlash murakkabroq va dev'da sekinroq.

**Misol:**

```typescript
// vite.config.ts — minimal sozlama
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
```

**Intervyuda shunday ayting:** "Vite dev'da native ES modullarni talab bo'yicha xizmat qiladi, shuning uchun ishga tushish va HMR loyiha hajmidan deyarli mustaqil. Production'da Vite 8 Rolldown bilan bundle yaratadi. Webpack esa hamma narsani oldindan bundle qiladi — moslashuvchan, lekin dev'da sekinroq."

**Esda tuting:** Vite dev'da **tip tekshiruvi qilmaydi** — TypeScript xatolari uchun alohida `tsc --noEmit` kerak (Q73).

## Q4. Next.js'da Server va Client Component farqi nima? / What is the difference between Server and Client Components in Next.js?

**Oddiy qilib aytganda:** **Server Component** — oshxonada, serverda tayyorlanadigan taom: brauzerga faqat tayyor HTML ketadi, JavaScript kodi emas. **Client Component** — stol yonida tayyorlanadigan taom: tugmalar, formalar, animatsiya kabi **interaktiv** narsalar, ularning kodi brauzerga yuboriladi.

**Batafsilroq:**
- App Router'da komponentlar **default holatda Server Component**. Ular to'g'ridan-to'g'ri bazaga murojaat qila oladi, sirlar brauzerga chiqmaydi, bundle kichik bo'ladi.
- Client Component — fayl boshida `"use client"`. Faqat unda `useState`, `useEffect`, `onClick`, brauzer API'lari ishlaydi.
- Qoida: interaktivlikni iloji boricha **kichik bargdagi komponentlarga** qo'ying, qolgani serverda qolsin (Q41).
- Server Component'dan Client Component'ga faqat **serializatsiya qilinadigan** props (matn, son, oddiy obyekt) beriladi — funksiya yoki DB klienti emas (Q42).

**Misol:**

```tsx
// app/products/page.tsx — Server Component (default)
import { AddToCart } from "./add-to-cart";

export default async function ProductsPage() {
  const products = await db.product.findMany();          // serverda, sir chiqmaydi
  return products.map((p) => (
    <article key={p.id}>
      <h2>{p.name}</h2>
      <AddToCart productId={p.id} />                     {/* faqat tugma — client */}
    </article>
  ));
}

// app/products/add-to-cart.tsx
"use client";
export function AddToCart({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false);
  return <button onClick={() => setAdded(true)}>{added ? "Qo'shildi" : "Savatga"}</button>;
}
```

**Intervyuda shunday ayting:** "Server Component'lar serverda render bo'ladi, ma'lumotni to'g'ridan-to'g'ri oladi va brauzerga JavaScript yubormaydi. Client Component'lar `"use client"` bilan belgilanadi va interaktivlik uchun kerak. Men `"use client"` chegarasini daraxtning pastroq qismiga qo'yaman, shunda bundle kichik bo'ladi."

**Esda tuting:** `"use client"` fayli import qilgan hamma narsa ham client bundle'ga kiradi — chegarani katta layout'ga qo'ymang.

## Q5. Next.js'da SSR, SSG, ISR va streaming nima? / What are SSR, SSG, ISR and streaming in Next.js?

**Oddiy qilib aytganda:** sahifani tayyorlashning to'rt usuli:
- **SSG** — gazeta: oldindan **chop etilgan**, hammaga bir xil, juda tez.
- **SSR** — buyurtma bo'yicha taom: har so'rovda **yangidan** tayyorlanadi.
- **ISR** — vaqti-vaqti bilan **qayta chop etiladigan** gazeta: tez, lekin ma'lum vaqtda yangilanadi.
- **Streaming** — ovqatni **kurs-kurs** olib chiqish: tayyor qismi darhol keladi, sekin qismi keyin.

**Batafsilroq:**
- Next.js 16 da keshlash **aniq tanlanadi**: dinamik kod default holatda har so'rovda ishlaydi, keshlash kerak bo'lsa `"use cache"` direktivasi bilan belgilanadi (Cache Components).
- **Partial Prerendering (PPR)** — bitta sahifada statik "qobiq" darhol keladi, dinamik qismlar `<Suspense>` ichida keyin oqib keladi.
- Streaming uchun `<Suspense fallback={...}>` yoki `loading.tsx` fayli ishlatiladi (Q49).

**Misol:**

```tsx
// Keshlangan (statik) qism:
async function Categories() {
  "use cache";
  return (await db.category.findMany()).map((c) => <a key={c.id} href={`/c/${c.slug}`}>{c.name}</a>);
}

// Sahifa: statik qobiq darhol, sekin tavsiyalar keyin oqib keladi
export default function Home() {
  return (
    <>
      <Categories />
      <Suspense fallback={<p>Tavsiyalar yuklanmoqda…</p>}>
        <Recommendations />   {/* har so'rovda, sekin — stream qilinadi */}
      </Suspense>
    </>
  );
}
```

**Intervyuda shunday ayting:** "SSG build vaqtida, SSR har so'rovda, ISR ma'lum vaqtda qayta generatsiya qiladi; streaming esa tayyor qismni darhol yuborib, sekin qismlarni Suspense orqali keyin oqizadi. Next.js 16 da keshlash `use cache` bilan aniq tanlanadi, dinamik kod esa default holatda so'rov vaqtida ishlaydi."

**Esda tuting:** "SSG — har doim yaxshi" emas: foydalanuvchiga xos sahifa (profil, savat) keshlanmasligi kerak.

## Q6. O'z hook'ingizni (custom hook) qanday yozasiz? / How do you write a custom hook?

**Oddiy qilib aytganda:** bir nechta komponentda bir xil mantiq takrorlansa (masalan, "oyna kengligini kuzatish"), uni bitta **qayta ishlatiladigan asbobga** aylantirasiz. Custom hook — nomi `use` bilan boshlanadigan oddiy funksiya, ichida boshqa hook'lar ishlatiladi.

**Batafsilroq:**
- Nom **`use` bilan boshlanishi shart** — shunda React va linter hook qoidalarini tekshiradi.
- Custom hook **holatni emas, mantiqni** ulashadi: ikki komponent bitta hook'ni ishlatsa, har biri o'z alohida holatiga ega.
- Yaxshi hook — bitta aniq vazifa, tushunarli qaytariladigan qiymat.

**Misol:**

```tsx
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved === null ? initial : (JSON.parse(saved) as T);
    } catch {
      return initial;                              // xususiy rejimda localStorage xato berishi mumkin
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* joy yo'q */ }
  }, [key, value]);
  return [value, setValue] as const;
}

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  return <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme}</button>;
}
```

**Intervyuda shunday ayting:** "Custom hook — `use` bilan boshlanadigan va boshqa hook'larni chaqiradigan funksiya. U holatli mantiqni qayta ishlatishga imkon beradi, lekin har bir chaqiruvchi o'z holatiga ega. Masalan, ma'lumot yuklash, localStorage sinxronizatsiyasi yoki media query uchun yozaman."

**Esda tuting:** custom hook'dan ham faqat yuqori darajada chaqiring va uni shartli qilmang (Q33).

## Q7. Zustand va Redux Toolkit farqi nima? / How do Zustand and Redux Toolkit compare?

**Oddiy qilib aytganda:** ikkalasi ham ilova bo'ylab umumiy **"ombor"** (store) — ko'p komponent bir xil ma'lumotni ishlatishi uchun. **Zustand** — kichik, sodda shkaf: bir necha qatorda yoziladi. **Redux Toolkit** — katta, tartibli ombor: qat'iy qoidalar, kuchli DevTools, katta jamoalar uchun qulay.

**Batafsilroq:**

| | Zustand | Redux Toolkit |
|---|---|---|
| Kod hajmi | juda kam | ko'proq (slice, store, Provider) |
| Qoidalar | erkin | aniq tuzilma (action → reducer) |
| DevTools, vaqt bo'ylab qaytish | plagin orqali | kuchli, o'rnatilgan |
| Qachon | kichik-o'rta ilova | katta jamoa, murakkab domen |

- Ikkalasida ham komponent faqat **kerakli qismga** obuna bo'lsa, ortiqcha render bo'lmaydi.
- **Server ma'lumoti** (API'dan kelgan) uchun ko'pincha ular emas, TanStack Query yaxshiroq (Q8).

**Misol:**

```tsx
import { create } from "zustand";

type CartState = { items: string[]; add: (item: string) => void };
const useCart = create<CartState>((set) => ({
  items: [],
  add: (item) => set((state) => ({ items: [...state.items, item] })),
}));

function CartCount() {
  const count = useCart((state) => state.items.length);   // faqat soniga obuna
  return <span>Savat: {count}</span>;
}
```

**Intervyuda shunday ayting:** "Zustand — minimal boilerplate'li hook asosidagi store, kichik va o'rta ilovalarga mos. Redux Toolkit qat'iy tuzilma, middleware va kuchli DevTools beradi — katta jamoa va murakkab holat uchun. Ikkalasida ham selector bilan faqat kerakli qismga obuna bo'laman, server holatini esa alohida kutubxonada saqlayman."

**Esda tuting:** hamma narsani global store'ga qo'ymang — faqat bir komponentga kerak bo'lgan holat `useState`da qolsin.

## Q8. TanStack Query nima uchun kerak? / What is TanStack Query for?

**Oddiy qilib aytganda:** serverdan kelgan ma'lumot — sutga o'xshaydi: **eskiradi**. Uni qachon yangilash, keshda qancha saqlash, bir xil so'rovni ikki marta yubormaslik, xatoda qayta urinish — bularning hammasini qo'lda yozish qiyin. **TanStack Query** (avvalgi React Query) bu ishlarni o'zi qiladi.

**Batafsilroq:**
- `useQuery({ queryKey, queryFn })` — ma'lumotni yuklaydi, keshlaydi, `isPending`, `error`, `data` beradi.
- **queryKey** — kesh kaliti; kalit o'zgarsa (masalan, `["user", id]`), yangi so'rov ketadi.
- `staleTime` — ma'lumot qancha vaqt "yangi" hisoblanadi; bu vaqtda qayta so'ralmaydi.
- `useMutation` — ma'lumotni o'zgartirish; muvaffaqiyatdan keyin `invalidateQueries` bilan tegishli keshni yangilash.
- Bir xil kalitli bir nechta komponent — **bitta** so'rov (dedup).

**Misol:**

```tsx
function Profile({ userId }: { userId: string }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: ({ signal }) => fetch(`/api/users/${userId}`, { signal }).then((r) => r.json()),
    staleTime: 60_000,                           // 1 daqiqa yangi hisoblanadi
  });
  if (isPending) return <p>Yuklanmoqda…</p>;
  if (error) return <p>Xato yuz berdi</p>;
  return <h1>{data.name}</h1>;
}
```

**Intervyuda shunday ayting:** "TanStack Query server holatini boshqaradi: kesh, dedup, fon yangilanishi, retry va mutation'dan keyin invalidatsiya. Client holatidan (modal ochiqmi) farqli, server holati boshqa joyda ham o'zgaradi, shuning uchun uni alohida kutubxona bilan boshqarish to'g'ri."

**Esda tuting:** `queryFn`ga berilgan `signal`ni `fetch`ga uzating — komponent yopilsa, keraksiz so'rov bekor bo'ladi.

## Q9. Next.js Server Actions nima? / What are Next.js Server Actions?

**Oddiy qilib aytganda:** Server Action — formadan **to'g'ridan-to'g'ri** serverdagi funksiyani chaqirish. Alohida API yo'l yozish, `fetch` qilish shart emas: forma yuborilganda Next.js funksiyani serverda bajaradi.

**Batafsilroq:**
- `"use server"` bilan belgilangan async funksiya.
- `<form action={createPost}>` — JavaScript hali yuklanmagan yoki o'chirilgan bo'lsa ham ishlaydi (progressive enhancement, Q66).
- Formaning holati va xatolari uchun `useActionState` (Q29), yuborilayotganini ko'rsatish uchun `useFormStatus`.
- **Xavfsizlik:** Server Action — ochiq API endpoint. Har safar **foydalanuvchini sessiyadan tekshiring** va kiruvchi ma'lumotni validatsiya qiling (Q44).

**Misol:**

```tsx
// app/posts/actions.ts
"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const Post = z.object({ title: z.string().min(3) });

export async function createPost(formData: FormData) {
  const session = await auth();                          // kim chaqiryapti?
  if (!session) throw new Error("Kirish talab qilinadi");
  const { title } = Post.parse({ title: formData.get("title") });
  await db.post.create({ data: { title, authorId: session.userId } });
  revalidatePath("/posts");
}

// app/posts/new/page.tsx
export default function NewPost() {
  return <form action={createPost}><input name="title" /><button>Saqlash</button></form>;
}
```

**Intervyuda shunday ayting:** "Server Action — `use server` funksiya, uni forma yoki client koddan chaqirish mumkin; Next.js uni serverda bajaradi. Forma JavaScript'siz ham ishlaydi. Lekin u ochiq endpoint, shuning uchun har safar autentifikatsiya, avtorizatsiya va validatsiyani server ichida qilaman."

**Esda tuting:** Server Action'ga client yuborgan `userId`ga ishonmang — foydalanuvchini har doim server sessiyasidan oling.

## Q10. Next.js'da proxy (avvalgi middleware) nima uchun kerak? / What is Next.js proxy (formerly middleware) for?

**Oddiy qilib aytganda:** proxy — binoning **kirish eshigidagi qo'riqchi**: har bir so'rov sahifaga yetishidan oldin u yerdan o'tadi. Qo'riqchi tekshiradi: login qilmaganni kirish sahifasiga yo'naltiradi, tilni aniqlaydi, sarlavha qo'shadi.

**Batafsilroq:**
- Next.js 16 da fayl nomi `middleware.ts` → **`proxy.ts`**, eksport qilinadigan funksiya — `proxy`. U Node.js runtime'da ishlaydi. `middleware.ts` faqat Edge uchun qolgan va deprecated.
- `matcher` — qaysi yo'llarda ishlashini cheklash (statik fayllarni o'tkazib yuborish, Q59).
- Proxy'da **og'ir ish qilmang**: har so'rovni sekinlashtiradi. Faqat tez tekshiruvlar (cookie bormi) va yo'naltirishlar.
- Haqiqiy ruxsat tekshiruvi baribir sahifa yoki Server Action ichida ham bo'lishi kerak — proxy "birinchi filtr", yagona himoya emas.

**Misol:**

```typescript
// proxy.ts
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has("session");
  if (!hasSession && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };   // faqat shu yo'llar
```

**Intervyuda shunday ayting:** "Next.js 16 da `proxy.ts` so'rov sahifaga yetishidan oldin ishlaydi: yo'naltirish, rewrite, sarlavhalar. Men uni tez tekshiruvlar uchun va `matcher` bilan cheklangan yo'llarda ishlataman; haqiqiy avtorizatsiyani ma'lumotga yaqin joyda — server komponent va action ichida — takrorlayman."

**Esda tuting:** Next.js 15 va undan oldingi loyihalarda bu fayl hali `middleware.ts` deb ataladi — intervyuda versiyani aniqlashtiring.

## Q11. Print dialogi ochilganda print uchun holat kech chiqsa nima qilasiz? / The print-only state reaches the DOM too late when the print dialog opens — what do you do?

**Oddiy qilib aytganda:** React state'ni odatda **biroz keyinroq**, to'plab yangilaydi — bu tezlik uchun. Lekin brauzerning `beforeprint` hodisasi "hozir, shu soniyada chop etaman" deydi. React ulgurmasa, eski sahifa chop etiladi. `flushSync` — React'ga "buni **hoziroq** ekranga chiqar" deyish.

**Batafsilroq:**
- `flushSync(() => setIsPrinting(true))` — callback tugaguncha DOM yangilangan bo'ladi.
- `afterprint`da holatni qaytaring.
- `flushSync` sekin: React'ning optimizatsiyasini chetlab o'tadi. Faqat shunday tashqi integratsiya chegarasida ishlating.
- Ko'pincha oddiyroq yechim — faqat CSS: `@media print { ... }`.

**Misol:**

```tsx
import { flushSync } from "react-dom";

function Report() {
  const [isPrinting, setIsPrinting] = useState(false);
  useEffect(() => {
    const before = () => flushSync(() => setIsPrinting(true));   // darhol DOM'ga
    const after = () => setIsPrinting(false);
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);
  return isPrinting ? <PrintableReport /> : <InteractiveReport />;
}
```

**Intervyuda shunday ayting:** "Brauzer API callback tugashi bilan DOM'ni o'qisa, React'ning kechiktirilgan yangilanishi ulgurmaydi. Shunday integratsiyada `flushSync` bilan yangilanishni sinxron majburlayman, lekin faqat shu chegarada — oddiy oqimda u performansga zarar. Iloji bo'lsa `@media print` CSS'ini afzal ko'raman."

**Esda tuting:** `flushSync`ni render yoki effect'ning o'zidan chaqirmang — React bu haqda ogohlantiradi. Manba: [flushSync](https://react.dev/reference/react-dom/flushSync).

## Q12. setInterval ichida count doim eski qiymatda qolyapti — nega? / Why does setInterval keep seeing a stale count?

**Oddiy qilib aytganda:** taymer yaratilgan paytdagi `count`ni **suratga olib** qo'ygan (closure, JS asoslari Q3). U doim o'sha eski suratga qaraydi: `0 + 1`, `0 + 1`... Yechim — React'ga "**oldingi qiymatdan** bittaga oshir" deyish: `setCount(c => c + 1)`.

**Batafsilroq:**
- `useEffect(() => { setInterval(() => setCount(count + 1)) }, [])` — `count` doim 0.
- **Functional updater** `setCount(current => current + 1)` — React har safar eng so'nggi qiymatni beradi.
- Intervalni cleanup'da tozalashni unutmang.

**Misol:**

```tsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds((current) => current + 1), 1_000); // ✅ doim yangi qiymat
    return () => clearInterval(id);                                              // ✅ tozalash
  }, []);
  return <p>{seconds} soniya</p>;
}
```

**Intervyuda shunday ayting:** "Interval callback'i birinchi renderdagi `count`ni closure'da ushlab qoladi. Oldingi qiymatga bog'liq yangilanishda functional updater ishlataman — shunda effect'ni har o'zgarishda qayta yaratish kerak bo'lmaydi."

**Esda tuting:** agar callback boshqa o'zgaruvchan qiymatlarni ham o'qishi kerak bo'lsa, `useEffectEvent` (React 19.2) yoki `useRef` ishlating (Q32). Manba: [useState](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state).

## Q13. userId tez almashsa, eski so'rov kech kelib yangi profilni bosib ketyapti — qanday tuzatasiz? / A stale fetch for a previous userId overwrites the new profile — how do you fix it?

**Oddiy qilib aytganda:** siz avval Alining, keyin darhol Valining profilini ochdingiz. Ali haqidagi javob sekinroq keldi va Vali sahifasiga **Alining** ma'lumoti yozildi. Bu — "poyga holati" (race condition). Yechim: eski so'rovni **bekor qilish** yoki uning javobini **e'tiborsiz qoldirish**.

**Batafsilroq:**
- `useEffect` cleanup'ida `AbortController.abort()` — eski so'rov bekor bo'ladi.
- Yoki `let ignore = false` bayrog'i: cleanup'da `ignore = true`, javob kelganda tekshiriladi.
- Eng oddiy yo'l — TanStack Query (Q8): u buni o'zi hal qiladi.

**Misol:**

```tsx
function Profile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/users/${userId}`, { signal: controller.signal })
      .then((response) => response.json())
      .then(setUser)
      .catch((error) => { if (error.name !== "AbortError") console.error(error); });
    return () => controller.abort();               // userId o'zgarsa — eski so'rov bekor
  }, [userId]);
  return <h1>{user?.name ?? "Yuklanmoqda…"}</h1>;
}
```

**Intervyuda shunday ayting:** "Effect ichidagi so'rov poygasini cleanup bilan hal qilaman: `AbortController` bilan eski so'rovni bekor qilaman yoki `ignore` bayrog'i bilan eski javobni tashlab yuboraman. Production'da esa bu va keshni o'zi boshqaradigan TanStack Query kabi vositani afzal ko'raman."

**Esda tuting:** bekor qilish xatosini (`AbortError`) foydalanuvchiga ko'rsatmang. Manba: [You Might Not Need an Effect — fetching](https://react.dev/learn/you-might-not-need-an-effect#fetching-data).

## Q14. fullName'ni alohida state'da saqlash nega xato? / Why is storing fullName as separate state a mistake?

**Oddiy qilib aytganda:** agar `fullName` doim `firstName + " " + lastName` bo'lsa, uni alohida saqlash — bir xil ma'lumotni **ikki daftarga yozish**. Birini yangilab, ikkinchisini unutsangiz, ular bir-biriga zid bo'lib qoladi. To'g'risi — render paytida **hisoblash**.

**Batafsilroq:**
- Qoida: boshqa state yoki props'dan hisoblab bo'ladigan narsani state'ga qo'ymang ("derived state").
- `useEffect` bilan `fullName`ni sinxronlash — ortiqcha render va kechikish beradi.
- Hisob og'ir bo'lsa, `useMemo` qo'shing.

**Misol:**

```tsx
function NameForm() {
  const [firstName, setFirstName] = useState("Ali");
  const [lastName, setLastName] = useState("Valiyev");
  const fullName = `${firstName} ${lastName}`;          // ✅ render paytida hisoblanadi

  // ❌ const [fullName, setFullName] = useState("");
  // ❌ useEffect(() => setFullName(firstName + " " + lastName), [firstName, lastName]);

  return (
    <>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <p>To'liq ism: {fullName}</p>
    </>
  );
}
```

**Intervyuda shunday ayting:** "Boshqa holatdan hisoblanadigan qiymatni alohida state'da saqlamayman — bu ortiqcha manba va sinxronlashdan chiqish xavfi. Uni render paytida hisoblayman, og'ir bo'lsa `useMemo` bilan."

**Esda tuting:** "state'ni effect bilan sinxronlash" — deyarli har doim ogohlantiruvchi belgi. Manba: [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state).

## Q15. Jadvalni saralaganda input qiymati boshqa qatorga o'tib ketyapti — nega? / Why does an input's value jump to another row after sorting?

**Oddiy qilib aytganda:** React ro'yxat elementlarini `key` orqali taniydi — xuddi o'quvchilarni ismi bilan. Agar `key` sifatida **tartib raqami** (index) ishlatilsa, saralashdan keyin "1-o'rindagi" o'quvchi boshqa odam bo'lib qoladi, lekin React eski ma'lumotni unga beradi. Yechim — **barqaror, noyob ID**.

**Batafsilroq:**
- `key={index}` — tartib o'zgaradigan ro'yxatda xato.
- `key={item.id}` — element qayerga ko'chmasin, React uni taniydi va ichki holatini (input qiymati, fokus) to'g'ri saqlaydi.
- `key` faqat **aka-ukalar orasida** noyob bo'lishi kerak.
- `Math.random()` key sifatida — har renderda yangi element yaratadi, holat yo'qoladi.

**Misol:**

```tsx
function StudentTable({ students }: { students: { id: string; name: string }[] }) {
  const [sorted, setSorted] = useState(students);
  return (
    <>
      <button onClick={() => setSorted([...sorted].sort((a, b) => a.name.localeCompare(b.name)))}>
        Saralash
      </button>
      {sorted.map((student) => (
        <div key={student.id}>                 {/* ✅ index emas */}
          {student.name} <input placeholder="Izoh" />
        </div>
      ))}
    </>
  );
}
```

**Intervyuda shunday ayting:** "`key` React'ga element identifikatorini beradi. Index key tartib o'zgarganda holatni boshqa elementga bog'lab qo'yadi. Men ma'lumotdagi barqaror ID'ni ishlataman; index faqat tartibi o'zgarmaydigan statik ro'yxatda maqbul."

**Esda tuting:** `key`ni o'zgartirish — komponentni ataylab **qayta yaratish** usuli ham (Q38). Manba: [Rendering Lists — keys](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key).

## Q16. Theme context o'zgarmasa ham yuzlab komponent qayta render bo'lyapti — nega? / Why do hundreds of context consumers re-render when the theme didn't change?

**Oddiy qilib aytganda:** Context Provider'ga `value={{ theme, setTheme }}` yozilsa, har renderda **yangi obyekt** yaratiladi. React esa "yangi obyekt — demak yangi qiymat" deb o'ylaydi va barcha tinglovchilarni qayta render qiladi. Yechim — qiymatni **barqaror** qilish (`useMemo`).

**Batafsilroq:**
- Context `Object.is` bilan solishtiradi (JS asoslari Q61): `{}` !== `{}`.
- `useMemo(() => ({ theme, setTheme }), [theme])` — qiymat faqat `theme` o'zgarganda yangi bo'ladi.
- Tez-tez o'zgaradigan va kamdan-kam o'zgaradigan qiymatlarni **alohida context**larga ajrating.
- React Compiler bunday memoizatsiyani ko'p hollarda avtomatik qiladi.

**Misol:**

```tsx
const ThemeContext = createContext<{ theme: string; toggle: () => void } | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");
  const toggle = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);   // ✅ barqaror qiymat
  return <ThemeContext value={value}>{children}</ThemeContext>;       // React 19: <Context> o'zi provider
}
```

**Intervyuda shunday ayting:** "Provider value har renderda yangi obyekt bo'lsa, barcha consumer'lar render bo'ladi. Value'ni `useMemo` bilan barqarorlashtiraman, tez o'zgaradigan qismlarni alohida context'ga ajrataman yoki selector'li store ishlataman."

**Esda tuting:** React 19 da `<ThemeContext.Provider>` o'rniga `<ThemeContext>` yozish mumkin. Manba: [useContext — optimizing re-renders](https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions).

## Q17. Ko'p boolean state imkonsiz holatlarga olib kelyapti — nima qilasiz? / Many boolean flags lead to impossible states — what do you do?

**Oddiy qilib aytganda:** `isLoading`, `isSuccess`, `isError` — uchta alohida chiroq. Ular bir vaqtda **ikkitasi yonib qolishi** mumkin (yuklanmoqda VA xato) — bu mantiqsiz. Yechim: bitta **"holat"** o'zgaruvchisi, u faqat ruxsat etilgan qiymatlardan birini oladi — xuddi svetofor: bir vaqtda faqat bitta rang.

**Batafsilroq:**
- `status: "idle" | "submitting" | "success" | "error"` — bitta union tip.
- TypeScript'ning **discriminated union**i har holatga kerakli ma'lumotni bog'laydi (xato holatida — xabar).
- Murakkab oqimlar uchun `useReducer` yoki state machine kutubxonasi (XState).

**Misol:**

```tsx
type CheckoutState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; orderId: string }
  | { status: "error"; message: string };

function Checkout() {
  const [state, setState] = useState<CheckoutState>({ status: "idle" });

  async function pay() {
    setState({ status: "submitting" });
    try {
      const { orderId } = await submitOrder();
      setState({ status: "success", orderId });
    } catch (error) {
      setState({ status: "error", message: String(error) });
    }
  }

  if (state.status === "success") return <p>Buyurtma #{state.orderId} qabul qilindi</p>;
  return (
    <>
      {state.status === "error" && <p role="alert">{state.message}</p>}
      <button disabled={state.status === "submitting"} onClick={pay}>To'lash</button>
    </>
  );
}
```

**Intervyuda shunday ayting:** "Bir nechta mustaqil boolean imkonsiz kombinatsiyalarga yo'l qo'yadi. Men ularni bitta `status` union'iga birlashtiraman, har holatning ma'lumotini discriminated union bilan bog'layman; murakkab oqimda `useReducer` yoki state machine ishlataman."

**Esda tuting:** "imkonsiz holatlarni imkonsiz qiling" — tiplar bu ishni kompilyatsiya vaqtida bajaradi. Manba: [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure#avoid-contradictions-in-state).

## Q18. Og'ir grafikka memo qo'shildi, lekin baribir sekin — nega? / An expensive chart is still slow after adding memo — why?

**Oddiy qilib aytganda:** `memo` — "props o'zgarmasa, qayta chizma" degan qoida. Lekin agar ota komponent har renderda **yangi obyekt yoki funksiya** yuborsa (`options={{...}}`, `onClick={() => ...}`), props doim "yangi" ko'rinadi va `memo` ishlamaydi.

**Batafsilroq:**
- `memo` props'ni yuzaki (`Object.is`) solishtiradi.
- Inline obyekt, massiv, funksiya — har renderda yangi havola.
- Yechim: ularni `useMemo`/`useCallback` bilan barqarorlashtirish yoki komponentdan tashqariga chiqarish.
- Avval **React DevTools Profiler** bilan haqiqatan qaysi komponent sekinligini o'lchang.
- React Compiler buni ko'p hollarda avtomatik hal qiladi.

**Misol:**

```tsx
const Chart = memo(function Chart({ data, options, onPointClick }: ChartProps) {
  return <HeavyCanvas data={data} options={options} onClick={onPointClick} />;
});

function Dashboard({ data }: { data: Point[] }) {
  const [filter, setFilter] = useState("");
  const options = useMemo(() => ({ animate: false, color: "#5b47c7" }), []);   // ✅ barqaror
  const handleClick = useCallback((point: Point) => console.log(point), []);   // ✅ barqaror
  return (
    <>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <Chart data={data} options={options} onPointClick={handleClick} />
    </>
  );
}
```

**Intervyuda shunday ayting:** "`memo` faqat props yuzaki teng bo'lsa renderni o'tkazib yuboradi. Inline obyekt va funksiyalar har renderda yangi, shuning uchun memo foyda bermaydi. Avval Profiler bilan o'lchayman, keyin props'ni `useMemo`/`useCallback` bilan barqarorlashtiraman yoki holatni pastga ko'chiraman."

**Esda tuting:** ko'pincha eng yaxshi yechim — memo emas, **holatni kichik komponentga ko'chirish** (input o'z komponentida bo'lsa, grafik umuman render bo'lmaydi). Manba: [memo](https://react.dev/reference/react/memo).

## Q19. Yashirin tabdagi video holati saqlansin, lekin u resurs yemasin — qanday? / How do you keep a hidden tab's video state without it consuming resources?

**Oddiy qilib aytganda:** tabni yopganda komponentni o'chirsangiz, video qayerda to'xtaganini "unutadi". Shunchaki CSS bilan yashirsangiz, u fonda ishlashda davom etadi. React 19.2 dagi **`<Activity>`** — o'rtasidagi yo'l: komponentni **muzlatib qo'yadi**: holati saqlanadi, lekin effect'lari to'xtatiladi.

**Batafsilroq:**
- `<Activity mode="visible">` — oddiy holat.
- `<Activity mode="hidden">` — `display: none` bilan yashiradi, **state saqlanadi**, effect'lar tozalanadi (cleanup ishlaydi), yangilanishlar keyinga qoldiriladi.
- Qaytib ochilganda effect'lar qayta ulanadi — video pozitsiyasi saqlangan bo'ladi.
- Next.js 16 ham React 19.2 imkoniyatlarini, jumladan `Activity`ni ishlatadi.

**Misol:**

```tsx
import { Activity } from "react";

function Tabs() {
  const [tab, setTab] = useState<"video" | "notes">("video");
  return (
    <>
      <button onClick={() => setTab("video")}>Video</button>
      <button onClick={() => setTab("notes")}>Izohlar</button>
      <Activity mode={tab === "video" ? "visible" : "hidden"}>
        <VideoPlayer />          {/* yashirilganda holati saqlanadi, effect'lari to'xtaydi */}
      </Activity>
      <Activity mode={tab === "notes" ? "visible" : "hidden"}>
        <Notes />
      </Activity>
    </>
  );
}
```

**Intervyuda shunday ayting:** "Tab yashirilganda holatni saqlash, lekin fon ishini to'xtatish uchun React 19.2 ning `Activity` komponentini `hidden` rejimida ishlataman: state saqlanadi, effect'lar cleanup qilinadi va yangilanishlar past ustuvorlikda. Unmount holatni yo'qotadi, oddiy CSS yashirish esa resursni tejamaydi."

**Esda tuting:** `<video>` elementi yashirilganda o'zi pauza qilmaydi — video to'xtashi kerak bo'lsa, effect cleanup'ida `video.pause()` chaqiring. Manba: [Activity](https://react.dev/reference/react/Activity).

## Q20. Tooltip o'lchami chizilgandan keyin hisoblanib, "sakrash" bo'lyapti — nima qilasiz? / A tooltip jumps because its size is measured after paint — what do you do?

**Oddiy qilib aytganda:** `useEffect` ekran **chizilgandan keyin** ishlaydi. Tooltip avval noto'g'ri joyda chiziladi, keyin effect uni o'lchab, to'g'ri joyga ko'chiradi — foydalanuvchi "sakrash"ni ko'radi. **`useLayoutEffect`** esa DOM tayyor, lekin ekran hali **chizilmagan** paytda ishlaydi — o'lchab, joylashtirib, keyin bir marta chizadi.

**Batafsilroq:**
- `useLayoutEffect` — o'lchash (`getBoundingClientRect`) va darhol pozitsiyalash uchun.
- U sinxron va chizishni bloklaydi — faqat haqiqatan kerak bo'lganda ishlating.
- Serverda (SSR) ishlamaydi.
- Ko'p hollarda tayyor kutubxona (Floating UI) yoki CSS anchor positioning yaxshiroq.

**Misol:**

```tsx
function Tooltip({ targetRect, text }: { targetRect: DOMRect; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);

  useLayoutEffect(() => {
    const height = ref.current!.getBoundingClientRect().height;   // chizishdan oldin o'lchash
    setTop(targetRect.top - height - 8);                           // qayta render — hali chizilmagan
  }, [targetRect]);

  return <div ref={ref} style={{ position: "fixed", top, left: targetRect.left }}>{text}</div>;
}
```

**Intervyuda shunday ayting:** "Chizishdan oldin DOM'ni o'lchab, darhol pozitsiyani o'zgartirish kerak bo'lsa, `useLayoutEffect` ishlataman — foydalanuvchi oraliq holatni ko'rmaydi. U chizishni bloklagani uchun faqat layout o'lchovlari bilan cheklayman."

**Esda tuting:** boshqa hamma holatda `useEffect` default tanlov. Manba: [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect).

## Q21. Ota komponent o'z video pleyeriga DOM tafsilotlarini bilmasdan "play" buyrug'ini qanday beradi? / How does a parent tell a custom video player to play without knowing its DOM details?

**Oddiy qilib aytganda:** televizor pultida faqat "yoqish", "o'chirish" tugmalari bor — ichidagi simlarni bilishingiz shart emas. Komponent ham tashqariga **faqat kerakli buyruqlarni** (`play`, `pause`) ochadi, ichidagi `<video>` elementini emas. Buning uchun `ref` va `useImperativeHandle` ishlatiladi.

**Batafsilroq:**
- React 19 da `ref` oddiy prop sifatida uzatiladi (`forwardRef` endi shart emas).
- `useImperativeHandle(ref, () => ({ play, pause }))` — tashqi ref faqat shu metodlarni ko'radi.
- Bu "qochish yo'li" (escape hatch): iloji bo'lsa, props orqali deklarativ boshqaring (`isPlaying` prop).

**Misol:**

```tsx
type PlayerHandle = { play: () => void; pause: () => void };

function VideoPlayer({ src, ref }: { src: string; ref?: React.Ref<PlayerHandle> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useImperativeHandle(ref, () => ({
    play: () => videoRef.current?.play(),
    pause: () => videoRef.current?.pause(),
  }), []);
  return <video ref={videoRef} src={src} />;
}

function Lesson() {
  const player = useRef<PlayerHandle>(null);
  return (
    <>
      <VideoPlayer ref={player} src="/lesson.mp4" />
      <button onClick={() => player.current?.play()}>Boshlash</button>
    </>
  );
}
```

**Intervyuda shunday ayting:** "`useImperativeHandle` bilan ref orqali faqat tanlangan metodlarni ochaman, ichki DOM yashirin qoladi. React 19 da `ref` oddiy prop, `forwardRef` kerak emas. Lekin avval props bilan deklarativ yechim mumkinmi — shuni tekshiraman."

**Esda tuting:** ref'ni render paytida o'qimang — faqat hodisa handler yoki effect ichida. Manba: [useImperativeHandle](https://react.dev/reference/react/useImperativeHandle).

## Q22. Brauzerning online holatini effect bilan o'qish nega "tearing" beradi? / Why does reading navigator.onLine in an effect cause tearing?

**Oddiy qilib aytganda:** **tearing** — ekranning bir qismi "online", boshqa qismi "offline" deb ko'rsatishi, chunki ular tashqi qiymatni **turli paytlarda** o'qigan. React tashqi manbaga (brauzer, store) xavfsiz ulanish uchun maxsus hook beradi: **`useSyncExternalStore`**.

**Batafsilroq:**
- Concurrent rendering'da React renderni bo'lib, to'xtatib davom ettirishi mumkin. Bu orada tashqi qiymat o'zgarsa, komponentlar turlicha qiymat ko'radi.
- `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` — React har doim **izchil** qiymat oladi.
- `subscribe` — o'zgarishlarga obuna; `getSnapshot` — joriy qiymat; `getServerSnapshot` — SSR uchun.

**Misol:**

```tsx
function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function useOnlineStatus() {
  return useSyncExternalStore(subscribe, () => navigator.onLine, () => true); // serverda "online" deb faraz
}

function StatusBar() {
  const online = useOnlineStatus();
  return <p>{online ? "✅ Onlayn" : "⚠️ Oflayn"}</p>;
}
```

**Intervyuda shunday ayting:** "React'dan tashqaridagi o'zgaruvchan manbaga `useEffect` + `useState` bilan ulanish concurrent renderda tearing berishi mumkin. `useSyncExternalStore` obuna va snapshot funksiyalari orqali barcha komponentlarga bir xil qiymatni kafolatlaydi va SSR uchun server snapshot'ini oladi."

**Esda tuting:** `getSnapshot` har chaqiruvda bir xil qiymat uchun **bir xil havola** qaytarishi kerak — aks holda cheksiz render. Manba: [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore).

## Q23. Katta ro'yxatni filtrlashda qidiruv inputi qotib qolyapti — nima qilasiz? / The search input lags while a large list is filtered — what do you do?

**Oddiy qilib aytganda:** har harf yozilganda React ham inputni, ham 10 000 qatorli ro'yxatni yangilamoqchi — input kutib qoladi. **`useTransition`** React'ga aytadi: "inputni **darhol** yangila, ro'yxatni esa **bo'sh vaqtda**". Yozish silliq, ro'yxat bir oz keyin yangilanadi.

**Batafsilroq:**
- `const [isPending, startTransition] = useTransition()`.
- Shoshilinch yangilanish (input qiymati) — oddiy `setState`.
- Shoshilmas yangilanish (filtr) — `startTransition(() => setFilter(...))`.
- Yangi harf kelsa, React eski, tugallanmagan ro'yxat renderini tashlab yuboradi.
- `isPending` — "yangilanmoqda" belgisini ko'rsatish uchun.

**Misol:**

```tsx
function ProductSearch({ products }: { products: Product[] }) {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");
  const [isPending, startTransition] = useTransition();

  const visible = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase())),
    [products, filter],
  );

  return (
    <>
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);                              // darhol
          startTransition(() => setFilter(e.target.value));     // bo'sh vaqtda
        }}
      />
      {isPending && <span>Yangilanmoqda…</span>}
      <ProductList items={visible} />
    </>
  );
}
```

**Intervyuda shunday ayting:** "`useTransition` bilan og'ir yangilanishni shoshilmas deb belgilayman: input darhol javob beradi, ro'yxat render'i esa to'xtatilishi va yangi kiritish kelganda bekor qilinishi mumkin. `isPending` bilan foydalanuvchiga holatni ko'rsataman."

**Esda tuting:** transition hisobni tezlashtirmaydi — faqat ustuvorlikni o'zgartiradi. Juda katta ro'yxat uchun **virtualizatsiya** (faqat ko'rinadigan qatorlarni chizish) ham kerak. Manba: [useTransition](https://react.dev/reference/react/useTransition).

## Q24. Parent'dan kelgan so'rov qiymati tez o'zgarsa, og'ir natija bloki har safar qotiryapti — nima qilasiz? / A fast-changing query prop keeps blocking a heavy results subtree — what do you do?

**Oddiy qilib aytganda:** Q23 da holatni o'zingiz boshqarardingiz. Bu yerda esa qiymat **props sifatida** keladi — `startTransition`ni qo'yadigan joy yo'q. **`useDeferredValue`** qiymatning "biroz kechikkan nusxasini" beradi: og'ir qism eski qiymat bilan qoladi, React bo'sh bo'lganda yangisiga o'tadi.

**Batafsilroq:**
- `const deferredQuery = useDeferredValue(query)`.
- Og'ir komponentga `deferredQuery`ni bering va uni `memo` bilan o'rang — shunda eski qiymat bilan qayta chizilmaydi.
- `query !== deferredQuery` — "natija eskirgan" belgisini (masalan, xiraroq ko'rsatish) chiqarish uchun.

**Misol:**

```tsx
const Results = memo(function Results({ query }: { query: string }) {
  return <HeavyList query={query} />;                    // og'ir render
});

function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <div style={{ opacity: isStale ? 0.6 : 1 }}>
      <Results query={deferredQuery} />
    </div>
  );
}
```

**Intervyuda shunday ayting:** "Qiymat props orqali kelsa va uning setter'iga kirishim bo'lmasa, `useDeferredValue` ishlataman: og'ir memo qilingan qism kechiktirilgan qiymat bilan render bo'ladi va shoshilinch yangilanishlarni bloklamaydi. Eskirgan natijani vizual belgilayman."

**Esda tuting:** `memo`siz `useDeferredValue` foyda bermaydi — og'ir komponent baribir har renderda qayta chiziladi. Manba: [useDeferredValue](https://react.dev/reference/react/useDeferredValue).

## Q25. Admin muharriri hamma foydalanuvchining boshlang'ich bundle'ini kattalashtiryapti — nima qilasiz? / An admin-only editor inflates everyone's initial bundle — what do you do?

**Oddiy qilib aytganda:** faqat adminlar ishlatadigan og'ir muharrirni **hamma** foydalanuvchiga birinchi yuklashda yuborish — sayohatga barcha mehmonlar uchun ham ta'mirlash asboblarini olib chiqishga o'xshaydi. Yechim: muharrirni **faqat kerak bo'lganda** yuklash — `React.lazy` va dinamik `import()` (JS asoslari Q62).

**Batafsilroq:**
- `const Editor = lazy(() => import("./Editor"))` — alohida chunk.
- `<Suspense fallback={...}>` — yuklanayotganda nima ko'rsatish.
- Next.js'da `next/dynamic` (kerak bo'lsa `ssr: false` bilan, lekin faqat Client Component ichida).
- Tekshirish: bundle analyzer bilan chunk'lar hajmini ko'ring.

**Misol:**

```tsx
import { lazy, Suspense } from "react";

const AdminEditor = lazy(() => import("./AdminEditor"));    // alohida chunk

function Dashboard({ user }: { user: User }) {
  return (
    <main>
      <Stats />
      {user.role === "admin" && (
        <Suspense fallback={<p>Muharrir yuklanmoqda…</p>}>
          <AdminEditor />
        </Suspense>
      )}
    </main>
  );
}
```

**Intervyuda shunday ayting:** "Kam ishlatiladigan og'ir qismlarni `lazy` va dinamik import bilan alohida chunk'ka ajrataman, `Suspense` bilan yuklanish holatini ko'rsataman. Natijani bundle analyzer bilan tekshiraman."

**Esda tuting:** `lazy` komponentni **modul darajasida** e'lon qiling — komponent ichida e'lon qilinsa, har renderda qayta yaratiladi va holat yo'qoladi. Manba: [lazy](https://react.dev/reference/react/lazy).

## Q26. Bitta widgetdagi xato butun sahifani oq ekranga aylantiryapti — nima qilasiz? / One widget's render error turns the whole page white — what do you do?

**Oddiy qilib aytganda:** uydagi bitta lampochka kuysa, butun uyning chirog'i o'chmasligi kerak — buning uchun har xonaga alohida **saqlagich** (predohranitel) qo'yiladi. React'da bu — **Error Boundary**: ichidagi komponent render paytida xato bersa, faqat o'sha qism "Xatolik yuz berdi" xabariga almashadi, qolgan sahifa ishlashda davom etadi.

**Batafsilroq:**
- Error Boundary render, hayot sikli metodlari va konstruktorlardagi xatolarni ushlaydi.
- **Ushlamaydi:** hodisa handler'lari (`onClick` ichidagi xato — `try/catch` bilan), asinxron kod, serverdagi xatolar.
- React'da Error Boundary hozircha **class komponent** sifatida yoziladi (`getDerivedStateFromError`); amalda `react-error-boundary` kutubxonasi qulay.
- Kutilgan xatolarni (forma validatsiyasi) `throw` qilmang — ularni oddiy state sifatida ko'rsating.
- Next.js'da segment darajasidagi boundary — `error.tsx` fayli (Q50).

**Misol:**

```tsx
import { ErrorBoundary } from "react-error-boundary";

function Dashboard() {
  return (
    <main>
      <Header />
      <ErrorBoundary fallback={<p role="alert">Grafikni ko'rsatib bo'lmadi</p>} onError={reportToSentry}>
        <AnalyticsWidget />          {/* bu yiqilsa ham, qolgan sahifa ishlaydi */}
      </ErrorBoundary>
      <RecentOrders />
    </main>
  );
}
```

**Intervyuda shunday ayting:** "Error Boundary daraxt qismida render xatolarini ushlab, fallback UI ko'rsatadi. Men mustaqil widget'lar atrofiga boundary qo'yaman va xatoni monitoring tizimiga yuboraman. Hodisa handler va asinxron xatolar boundary'ga tushmaydi — ularni `try/catch` bilan ushlayman."

**Esda tuting:** butun ilovani bitta boundary bilan o'rash — oq ekrandan yaxshi, lekin yetarli emas; boundary'larni mustaqil qismlar atrofiga qo'ying. Manba: [Error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

## Q27. Hydration xatosi: serverdagi vaqt brauzerdagisi bilan mos kelmayapti — nima qilasiz? / A hydration mismatch because server time differs from client time — what do you do?

**Oddiy qilib aytganda:** server HTML tayyorlaydi (masalan, "10:00"), brauzer esa uni o'z kodi bilan tekshiradi va "10:01" chiqaradi. React "qog'ozdagi rasm va haqiqat mos emas" deb ogohlantiradi — bu **hydration mismatch**. Qoida: brauzerdagi **birinchi render** serverdagi bilan **aynan bir xil** bo'lishi kerak; brauzerga xos qiymatni keyin qo'yasiz.

**Batafsilroq:**
- Mos kelmaslik sabablari: `Date.now()`, `Math.random()`, `window`/`localStorage`ga bog'liq qiymatlar, vaqt zonasi, noto'g'ri HTML ichma-ichligi (`<p>` ichida `<div>`).
- Yechim 1: birinchi renderda server bilan bir xil qiymat, `useEffect`dan keyin haqiqiy qiymat.
- Yechim 2: `suppressHydrationWarning` — faqat **bitta element** matni uchun (masalan, vaqt belgisi), keng qo'llamang.
- Yechim 3: vaqtni serverda aniq vaqt zonasi bilan formatlash.

**Misol:**

```tsx
function LocalTime({ iso }: { iso: string }) {
  const [text, setText] = useState(() => new Date(iso).toISOString().slice(11, 16) + " UTC"); // server bilan bir xil
  useEffect(() => {
    setText(new Date(iso).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })); // brauzer vaqti
  }, [iso]);
  return <time dateTime={iso}>{text}</time>;
}
```

**Intervyuda shunday ayting:** "Hydration'da birinchi client render server HTML'i bilan mos bo'lishi shart. Brauzerga xos qiymatlarni (mahalliy vaqt, localStorage) effect'dan keyin qo'yaman; `suppressHydrationWarning`ni faqat bitta, tor joyda ishlataman."

**Esda tuting:** mismatch faqat ogohlantirish emas — React o'sha qismni qayta render qilishi mumkin, bu esa sekinlik va "sakrash" beradi. Manba: [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content).

## Q28. "Like" tugmasi server javobini kutib sust ko'rinyapti — optimistik yangilanish qanday qilinadi? / How do you make a like button feel instant with an optimistic update?

**Oddiy qilib aytganda:** tugma bosilganda darhol ❤️ ko'rsatasiz, server javobini **kutmasdan** — chunki deyarli har doim muvaffaqiyatli bo'ladi. Agar server rad etsa, holat avtomatik eski ko'rinishiga qaytadi. Bu — **optimistik yangilanish**; React 19 da buning uchun `useOptimistic` bor.

**Batafsilroq:**
- `const [optimisticLikes, addOptimistic] = useOptimistic(likes, reducer)`.
- `addOptimistic`ni **Action yoki Transition ichida** chaqiring (`startTransition`).
- Action tugagach (muvaffaqiyat yoki xato), React optimistik qiymatni haqiqiy `likes` props'i bilan almashtiradi — xato bo'lsa "orqaga qaytish" avtomatik.
- Xatoni foydalanuvchiga ham bildiring.

**Misol:**

```tsx
function LikeButton({ likes, postId }: { likes: number; postId: string }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(likes, (current, delta: number) => current + delta);
  const [, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          addOptimisticLike(1);          // darhol +1
          await likePost(postId);        // server tasdiqlaguncha optimistik qiymat ko'rinadi
        })
      }
    >
      ❤️ {optimisticLikes}
    </button>
  );
}
```

**Intervyuda shunday ayting:** "Optimistik UI natijani server tasdiqlashidan oldin ko'rsatadi. React 19 da `useOptimistic` setter'ini transition yoki action ichida chaqiraman; action tugagach React haqiqiy holatga qaytadi, shuning uchun xato bo'lsa qiymat avtomatik tiklanadi."

**Esda tuting:** to'lov kabi qaytarib bo'lmaydigan amallarda optimistik UI ishlatmang — natijani kuting. Manba: [useOptimistic](https://react.dev/reference/react/useOptimistic).

## Q29. Server Action'dagi validatsiya xatosi formaga qaytmayapti — qanday ko'rsatasiz? / A Server Action's validation error never reaches the form — how do you show it?

**Oddiy qilib aytganda:** forma yuborildi, server "email noto'g'ri" dedi — lekin foydalanuvchi buni ko'rmaydi, xato faqat konsolda. Yechim: server xatoni `throw` qilmasdan, uni **javob sifatida qaytaradi**, forma esa uni `useActionState` orqali oladi va ko'rsatadi.

**Batafsilroq:**
- `const [state, formAction, isPending] = useActionState(action, initialState)`.
- Action `(previousState, formData) => newState` ko'rinishida — natija (muvaffaqiyat yoki xatolar ro'yxati) qaytaradi.
- **Kutilgan** xatolar (validatsiya) — qaytariladi; **kutilmagan** xatolar (DB ishlamayapti) — `throw`, ular Error Boundary'ga tushadi.
- `isPending` — tugmani bloklash va "Saqlanmoqda…" ko'rsatish uchun.

**Misol:**

```tsx
// actions.ts
"use server";
type Result = { ok: boolean; errors?: { email?: string } };

export async function saveProfile(previous: Result, formData: FormData): Promise<Result> {
  const email = String(formData.get("email") ?? "");
  if (!email.includes("@")) return { ok: false, errors: { email: "Email noto'g'ri" } };
  await db.user.update({ where: { id: (await auth()).userId }, data: { email } });
  return { ok: true };
}

// ProfileForm.tsx
"use client";
export function ProfileForm() {
  const [state, formAction, isPending] = useActionState(saveProfile, { ok: false });
  return (
    <form action={formAction}>
      <input name="email" aria-invalid={Boolean(state.errors?.email)} />
      {state.errors?.email && <p role="alert">{state.errors.email}</p>}
      <button disabled={isPending}>{isPending ? "Saqlanmoqda…" : "Saqlash"}</button>
    </form>
  );
}
```

**Intervyuda shunday ayting:** "Kutilgan validatsiya xatolarini action'dan natija sifatida qaytaraman va `useActionState` orqali formada ko'rsataman; kutilmagan xatolar esa throw qilinadi va Error Boundary ushlaydi. `isPending` bilan takroriy yuborishning oldini olaman."

**Esda tuting:** klientdagi validatsiya — qulaylik uchun; haqiqiy tekshiruv **har doim serverda**. Manba: [useActionState](https://react.dev/reference/react/useActionState).

## Q30. Yuzlab maydonli forma har tugma bosilganda sekinlashyapti — nima qilasiz? / A form with hundreds of inputs slows down on every keystroke — what do you do?

**Oddiy qilib aytganda:** har harf kiritilganda butun forma ma'lumotini nusxalab, butun formani qayta chizish — har harfdan keyin butun daftarni qaytadan ko'chirib yozishga o'xshaydi. Ko'p maydonlar faqat **yuborish paytida** kerak — ularni React boshqarmasin (**uncontrolled**), yuborishda bir marta `FormData` bilan o'qib oling.

**Batafsilroq:**
- **Controlled input** — qiymati React state'da (`value` + `onChange`); har harf — render.
- **Uncontrolled input** — qiymati DOM'da (`defaultValue`, `name`); render yo'q.
- Yuborishda: `new FormData(event.currentTarget)` yoki Server Action'ga to'g'ridan-to'g'ri.
- Faqat darhol reaksiya kerak bo'lgan maydonlarni controlled qiling (jonli validatsiya, bog'liq maydonlar).
- Katta formalar uchun `react-hook-form` shu yondashuvga asoslangan.

**Misol:**

```tsx
function SurveyForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)); // hammasi bir marta o'qiladi
    sendSurvey(data);
  }
  return (
    <form onSubmit={handleSubmit}>
      {questions.map((q) => (
        <label key={q.id}>
          {q.text}
          <input name={q.id} defaultValue="" />       {/* uncontrolled — render yo'q */}
        </label>
      ))}
      <button>Yuborish</button>
    </form>
  );
}
```

**Intervyuda shunday ayting:** "Katta formada har bir maydonni controlled qilish har harfda to'liq render beradi. Faqat yuborishda kerak bo'lgan maydonlarni uncontrolled qoldiraman va qiymatlarni `FormData` bilan olaman; jonli reaksiya kerak bo'lganlarini controlled qilaman. Serverda baribir qayta validatsiya qilaman."

**Esda tuting:** bitta input'da `value` va `defaultValue`ni birga ishlatmang — React ogohlantiradi. Manba: [form](https://react.dev/reference/react-dom/components/form).

## Q31. State ichidagi obyektni to'g'ridan-to'g'ri o'zgartirdim, UI yangilanmadi — nega? / I mutated an object in state directly and the UI didn't update — why?

**Oddiy qilib aytganda:** React state o'zgarganini **havola** bo'yicha tekshiradi: "yangi quti keldimi?" Agar siz eski qutining ichini o'zgartirsangiz (`product.price = 100`), quti o'sha-o'sha — React "hech narsa o'zgarmadi" deb o'ylaydi. Har doim **yangi quti** (yangi obyekt) bering.

**Batafsilroq:**
- State — faqat o'qish uchun **surat** (snapshot).
- Yangi obyekt: `setProduct({ ...product, price: 100 })`.
- Ichma-ich obyektda har darajani nusxalang: `{ ...user, address: { ...user.address, city } }`.
- Massivlar: `push`, `splice`, `sort` o'rniga `[...arr, x]`, `filter`, `map`, `toSorted()`.
- Chuqur tuzilmalar uchun **Immer** kutubxonasi qulay.

**Misol:**

```tsx
function PriceEditor() {
  const [product, setProduct] = useState({ name: "Kitob", price: 45_000, tags: ["ta'lim"] });

  const raisePrice = () => {
    // ❌ product.price += 5_000; setProduct(product);  — havola o'sha, render yo'q
    setProduct((current) => ({ ...current, price: current.price + 5_000 })); // ✅ yangi obyekt
  };
  const addTag = () => setProduct((current) => ({ ...current, tags: [...current.tags, "yangi"] }));

  return <button onClick={raisePrice}>{product.name}: {product.price}</button>;
}
```

**Intervyuda shunday ayting:** "React state'ni o'zgarmas snapshot deb qabul qiladi va `Object.is` bilan solishtiradi. Mutatsiya havolani o'zgartirmaydi, shuning uchun render bo'lmaydi va memo qilingan komponentlar eski qiymatni ko'radi. Men har doim o'zgargan yo'l bo'yicha yangi obyekt yarataman yoki Immer ishlataman."

**Esda tuting:** `arr.sort()` asl massivni o'zgartiradi — state bilan `toSorted()` yoki `[...arr].sort()` ishlating. Manba: [Updating Objects in State](https://react.dev/learn/updating-objects-in-state).

## Q32. Effect dependency'sidagi inline obyekt ulanishni har renderda qayta boshlayapti — nima qilasiz? / An inline object in effect dependencies reconnects on every render — what do you do?

**Oddiy qilib aytganda:** `const options = { roomId }` komponent ichida yozilsa, har renderda **yangi obyekt** yaratiladi. Effect uni dependency'da ko'rib "o'zgardi!" deydi va chat ulanishini uzib-qayta ulaydi. Yechim: obyektni **effect ichida** yarating va dependency'ga faqat oddiy qiymatlarni (`roomId`) qo'ying.

**Batafsilroq:**
- Dependency'lar `Object.is` bilan solishtiriladi — obyekt va funksiyalar har renderda "yangi".
- Yechimlar:
  1. obyekt/funksiyani effect ichiga ko'chirish;
  2. primitiv qiymatlarni ajratib, ularni dependency qilish;
  3. reaktiv bo'lmasligi kerak bo'lgan mantiq uchun `useEffectEvent` (React 19.2).
- Linter'ning `exhaustive-deps` ogohlantirishini **o'chirmang** — u haqiqiy xatolarni ko'rsatadi.

**Misol:**

```tsx
function ChatRoom({ roomId, theme }: { roomId: string; theme: string }) {
  const onConnected = useEffectEvent(() => showToast(`Ulandi`, theme)); // theme o'zgarsa qayta ulanmaydi

  useEffect(() => {
    const options = { serverUrl: "wss://chat.uz", roomId };    // ✅ effect ichida yaratiladi
    const connection = createConnection(options);
    connection.on("connected", () => onConnected());
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);                                                 // ✅ faqat primitiv dependency

  return <h1>{roomId} xonasi</h1>;
}
```

**Intervyuda shunday ayting:** "Inline obyekt yoki funksiya har renderda yangi havola bo'lgani uchun effect qayta ishlaydi. Men ularni effect ichida yarataman va dependency'ga primitivlarni qo'yaman; effect ichidagi reaktiv bo'lmasligi kerak bo'lgan mantiqni `useEffectEvent`ga chiqaraman. Linter qoidasini o'chirmayman."

**Esda tuting:** `useEffectEvent`dan qaytgan funksiyani dependency ro'yxatiga **qo'ymang** va uni boshqa komponentlarga uzatmang. Manba: [useEffect — object dependencies](https://react.dev/reference/react/useEffect#removing-unnecessary-object-dependencies), [useEffectEvent](https://react.dev/reference/react/useEffectEvent).

## Q33. Custom hook'ni faqat shart bajarilganda chaqirish nega xato? / Why is calling a custom hook conditionally a mistake?

**Oddiy qilib aytganda:** React hook'larni **tartib raqami** bo'yicha eslab qoladi: "1-hook — ism, 2-hook — yosh, 3-hook — obuna". Agar 2-hook ba'zan chaqirilib, ba'zan chaqirilmasa, raqamlar suriladi va React ism o'rniga yoshni beradi — xato yoki g'alati xulq. Shuning uchun hook'lar **har renderda bir xil tartibda** chaqiriladi.

**Batafsilroq:**
- **Hook qoidalari:**
  1. faqat komponent yoki custom hook'ning **yuqori darajasida** — `if`, sikl, `return`dan keyin emas;
  2. faqat React funksiyalari ichida.
- Shartni hook'ning **ichiga** yoki **argumentiga** o'tkazing: `useSubscription(enabled ? topic : null)`.
- `eslint-plugin-react-hooks` bu xatolarni avtomatik topadi.
- Istisno: React 19'dagi `use()` shartli chaqirilishi mumkin.

**Misol:**

```tsx
// ❌ if (enabled) { const data = useSubscription(topic); }

function useSubscription(topic: string | null) {
  const [data, setData] = useState<string | null>(null);
  useEffect(() => {
    if (topic === null) return;                // ✅ shart hook ichida
    const unsubscribe = subscribe(topic, setData);
    return unsubscribe;
  }, [topic]);
  return data;
}

function Feed({ enabled, topic }: { enabled: boolean; topic: string }) {
  const data = useSubscription(enabled ? topic : null);   // ✅ har doim chaqiriladi
  return <p>{data ?? "Obuna yo'q"}</p>;
}
```

**Intervyuda shunday ayting:** "React hook holatini chaqiruv tartibi bo'yicha bog'laydi, shuning uchun hook'lar har renderda bir xil tartibda, yuqori darajada chaqirilishi shart. Shartni hook argumenti yoki ichidagi effect'ga o'tkazaman va buni lint qoidasi bilan majburlayman."

**Esda tuting:** "development'da ishlaydi" — dalil emas; tartib buzilishi faqat ma'lum holatlarda chiqadi. Manba: [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks).

## Q34. Portal orqali body'ga chiqarilgan modal bosilganda ota komponentning click handler'i ham ishlayapti — nega? / Why does a parent's click handler fire when clicking a modal rendered through a portal?

**Oddiy qilib aytganda:** portal modalni DOM'da boshqa joyga (`document.body`ga) ko'chiradi, lekin React uchun modal hali ham **ota komponentning farzandi**. Hodisalar esa React daraxti bo'ylab ko'tariladi (bubbling), DOM bo'ylab emas. Shuning uchun modalni bosish ota komponentdagi `onClick`ni ham ishga tushiradi.

**Batafsilroq:**
- `createPortal(children, domNode)` — DOM joylashuvini o'zgartiradi, React daraxtini emas.
- Context, state va **hodisalar** React daraxti bo'yicha ishlaydi.
- Yechim: modal ichida `event.stopPropagation()` yoki handler'ni boshqa joyga ko'chirish.
- Portal foydasi: `overflow: hidden` yoki `z-index` muammosiz modal, tooltip, dropdown.
- Modal uchun `<dialog>` HTML elementi ham yaxshi variant (fokus va `Escape`ni o'zi boshqaradi).

**Misol:**

```tsx
import { createPortal } from "react-dom";

function Card() {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => console.log("Karta bosildi")}>
      <button onClick={() => setOpen(true)}>Batafsil</button>
      {open && createPortal(
        <div role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}> {/* ota'ga chiqmasin */}
          <p>Tafsilotlar</p>
          <button onClick={() => setOpen(false)}>Yopish</button>
        </div>,
        document.body,
      )}
    </div>
  );
}
```

**Intervyuda shunday ayting:** "Portal faqat DOM joylashuvini o'zgartiradi; React hodisalari React daraxti bo'yicha bubbling qiladi, shuning uchun portal ichidagi bosish ota handler'lariga yetadi. Kerak bo'lsa portal ildizida `stopPropagation` qilaman yoki handler'ni qayta joylashtiraman."

**Esda tuting:** modalda fokus boshqaruvi va `Escape` bilan yopish majburiy — accessibility uchun. Manba: [createPortal](https://react.dev/reference/react-dom/createPortal).

## Q35. Sahifadagi ko'p accordion'larda ID'lar to'qnashyapti — qanday noyob ID yaratasiz? / Multiple accordions collide on IDs during SSR — how do you generate unique IDs?

**Oddiy qilib aytganda:** `aria-controls="panel"` kabi ID'lar sahifada **noyob** bo'lishi kerak. Bitta komponentdan 10 ta nusxa chiqsa, 10 ta bir xil ID paydo bo'ladi. `Math.random()` bilan yaratilsa, server va brauzerda **turlicha** chiqadi (Q27). **`useId`** — server va brauzerda bir xil, har nusxa uchun noyob ID beradi.

**Batafsilroq:**
- `const id = useId()` — har bir komponent nusxasi uchun barqaror va noyob.
- Bitta komponentda bir nechta ID kerak bo'lsa, prefiks sifatida ishlating: `${id}-button`, `${id}-panel`.
- `useId`ni ro'yxat `key`i yoki kesh kaliti sifatida **ishlatmang** — u ma'lumotdan emas, komponent joylashuvidan kelib chiqadi.

**Misol:**

```tsx
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <section>
      <button id={`${id}-button`} aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => setOpen(!open)}>
        {title}
      </button>
      <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-button`} hidden={!open}>
        {children}
      </div>
    </section>
  );
}
```

**Intervyuda shunday ayting:** "`useId` SSR va hydration'da mos keladigan noyob ID beradi. Men undan ARIA bog'lanishlari uchun prefiks sifatida foydalanaman; ro'yxat kaliti yoki ma'lumot identifikatori sifatida emas."

**Esda tuting:** React 19.2 da `useId` formati `_r_` ko'rinishiga o'zgargan — ID formatiga tayanadigan kod yozmang. Manba: [useId](https://react.dev/reference/react/useId).

## Q36. Komponent testi bosishdan keyin natija chiqmasdan tekshiryapti — qanday tuzatasiz? / A component test asserts before the state update commits — how do you fix it?

**Oddiy qilib aytganda:** testda tugmani bosdingiz va darhol natijani tekshirdingiz — lekin React hali ekranni yangilab ulgurmagan. **`act()`** React'ga "barcha yangilanishlarni tugat, keyin men tekshiraman" deydi. Testing Library bu ishni ko'pincha o'zi qiladi.

**Batafsilroq:**
- `act(async () => { ... })` — ichidagi render va yangilanishlar tugaguncha kutadi.
- Testing Library'ning `render`, `userEvent` va `findBy...` so'rovlari `act`ni o'zi qo'llaydi.
- Asinxron natija uchun `await screen.findByText(...)` — element paydo bo'lguncha kutadi.
- Ichki state'ni emas, **foydalanuvchi ko'radigan narsani** tekshiring (matn, rol, holat).
- "not wrapped in act(...)" ogohlantirishi — test tugagandan keyin yangilanish bo'layotganini bildiradi.

**Misol:**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("forma yuborilgach tasdiq ko'rinadi", async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  await user.type(screen.getByLabelText("Email"), "ali@mail.uz");
  await user.click(screen.getByRole("button", { name: "Yuborish" }));
  expect(await screen.findByText("Rahmat! Xabar yuborildi")).toBeVisible(); // paydo bo'lguncha kutadi
});
```

**Intervyuda shunday ayting:** "React yangilanishlari tugashidan oldin assertion qilinmasligi uchun `act` kerak. Testing Library `render` va `userEvent`ni `act` bilan o'raydi, asinxron natijani esa `findBy` bilan kutaman. Implementatsiya tafsilotlarini emas, foydalanuvchiga ko'rinadigan natijani tekshiraman."

**Esda tuting:** `setTimeout` bilan "kutib turish" — ishonchsiz va sekin testlar. `findBy`/`waitFor` ishlating. Manba: [act](https://react.dev/reference/react/act).

## Q37. Ikki qo'shni komponent tanlangan elementni turlicha saqlab, bir-biriga mos kelmay qolyapti — nima qilasiz? / Two sibling components keep separate copies of the selected item and get out of sync — what do you do?

**Oddiy qilib aytganda:** ro'yxat ham, tafsilotlar paneli ham "qaysi element tanlangan"ni o'zicha eslab qolsa, ular bir kun turli narsani ko'rsatadi. Yechim — bu ma'lumotni **ikkalasining umumiy otasiga** ko'tarish: ota bir joyda saqlaydi, farzandlarga qiymat va "o'zgartirish" funksiyasini beradi. Bu — **lifting state up**.

**Batafsilroq:**
- Bitta ma'lumot — bitta manba (single source of truth).
- Ota: `const [selectedId, setSelectedId] = useState(...)`.
- Farzandlar: `selectedId` props va `onSelect` callback oladi.
- Holat juda uzoq ajdodga ko'tarilsa va ko'p qavatdan uzatilsa (prop drilling) — context yoki store (Q7).

**Misol:**

```tsx
function Inbox({ messages }: { messages: Message[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);   // yagona manba
  const selected = messages.find((m) => m.id === selectedId) ?? null;
  return (
    <div className="grid grid-cols-2">
      <MessageList messages={messages} selectedId={selectedId} onSelect={setSelectedId} />
      <MessageView message={selected} />
    </div>
  );
}
```

**Intervyuda shunday ayting:** "Ikki komponentga bir xil ma'lumot kerak bo'lsa, uni eng yaqin umumiy otaga ko'taraman va props hamda callback'lar orqali beraman. Shunda bitta haqiqat manbai bo'ladi va desinxronizatsiya mumkin emas."

**Esda tuting:** tanlangan **obyektni** emas, uning **ID'sini** saqlang — obyekt ro'yxatda yangilansa, nusxa eskirib qoladi. Manba: [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components).

## Q38. "Tozalash" tugmasi muharrirning ichki holatini to'liq boshlang'ich holatga qaytarmayapti — nima qilasiz? / A reset button doesn't fully reset an editor's internal state — what do you do?

**Oddiy qilib aytganda:** komponentning ichida o'nlab kichik holatlar bo'lsa, ularni birma-bir tozalash qiyin va nimanidir unutasiz. Oddiyroq yo'l — komponentga **yangi `key`** berish: React "bu boshqa komponent" deb eskisini butunlay o'chiradi va yangisini **toza holatda** yaratadi.

**Batafsilroq:**
- `key` o'zgarsa, React eski komponentni va barcha ichki holatini tashlab yuboradi.
- Profillar orasida o'tganda: `<ProfileEditor key={profileId} />` — har profil uchun toza muharrir.
- "Tozalash" tugmasi: `key`ni hisoblagich bilan oshirish.
- Bu props'dan state'ni "sinxronlash" uchun effect yozishdan ancha yaxshi.

**Misol:**

```tsx
function EditorPage({ profile }: { profile: Profile }) {
  const [version, setVersion] = useState(0);
  return (
    <>
      <ProfileEditor key={`${profile.id}-${version}`} profile={profile} />  {/* key o'zgarsa — toza holat */}
      <button onClick={() => setVersion((v) => v + 1)}>Tozalash</button>
    </>
  );
}
```

**Intervyuda shunday ayting:** "Komponentning butun ichki holatini qayta boshlash kerak bo'lsa, unga yangi `key` beraman — React eski nusxani unmount qilib, yangisini yaratadi. Bu props'dan state'ni effect orqali sinxronlashdan soddaroq va xatosizroq."

**Esda tuting:** `key` o'zgarishi butun ichki daraxtni qayta yaratadi — og'ir komponentlarda buni tez-tez qilmang. Manba: [Resetting state with a key](https://react.dev/learn/preserving-and-resetting-state#resetting-a-form-with-a-key).

## Q39. memo'ning custom comparator'i yangi callback'dagi eski props'ni yashirib qo'ydi — nega? / Why did memo's custom comparator hide stale props inside a new callback?

**Oddiy qilib aytganda:** `memo`ga "faqat `item` o'zgarsa qayta chiz" deb aytdingiz. Lekin ota yangi `onOpen` funksiyasini yubordi — unda yangi ma'lumotlar bor. Komponent qayta chizilmagani uchun **eski funksiyani** ishlatishda davom etadi va eski ma'lumot bilan ishlaydi. Comparator **barcha** props'ni, jumladan funksiyalarni ham solishtirishi kerak.

**Batafsilroq:**
- `memo(Component, areEqual)` — `areEqual` `true` qaytarsa, render o'tkazib yuboriladi.
- Funksiyalarni solishtirmaslik — "eski closure" xatosiga olib keladi.
- Comparator tez bo'lishi kerak; chuqur solishtirish ko'pincha renderdan ham qimmat.
- Ko'p hollarda custom comparator kerak emas: ota'da `useCallback` bilan funksiyalarni barqaror qilish yetarli.

**Misol:**

```tsx
const Row = memo(
  function Row({ item, onOpen }: { item: Item; onOpen: (id: string) => void }) {
    return <button onClick={() => onOpen(item.id)}>{item.title}</button>;
  },
  (prev, next) => prev.item === next.item && prev.onOpen === next.onOpen,   // ✅ funksiya ham solishtiriladi
);
```

**Intervyuda shunday ayting:** "Custom comparator barcha props'ni hisobga olishi kerak, aks holda komponent eski callback yoki qiymatlarni ushlab qoladi. Ko'p hollarda comparator yozmasdan, ota'da `useCallback`/`useMemo` bilan props'ni barqarorlashtirishni afzal ko'raman."

**Esda tuting:** comparator "teng" degan ma'noda `true` qaytaradi — `shouldComponentUpdate`ning teskarisi. Manba: [memo — custom comparison](https://react.dev/reference/react/memo#specifying-a-custom-comparison-function).

## Q40. dangerouslySetInnerHTML bilan API'dan kelgan HTML'ni chiqarish nega xavfli? / Why is rendering API HTML with dangerouslySetInnerHTML risky?

**Oddiy qilib aytganda:** React matnni xavfsiz chiqaradi: foydalanuvchi `<script>` yozsa, u oddiy matn bo'lib ko'rinadi. `dangerouslySetInnerHTML` esa bu himoyani **o'chiradi** — HTML haqiqiy HTML sifatida ishlaydi. Unda zararli kod bo'lsa, u boshqa foydalanuvchilar brauzerida bajariladi. Bu — **XSS** (cross-site scripting) hujumi.

**Batafsilroq:**
- Nomining o'zida "dangerously" (xavfli) so'zi bor — ataylab.
- Oddiy foydalanuvchi matnini har doim JSX matni sifatida chiqaring: `<p>{comment}</p>`.
- HTML kerak bo'lsa (masalan, blog muharriridan), uni **sanitizatsiya** qiling: DOMPurify kabi kutubxona xavfli teglar va atributlarni olib tashlaydi.
- Yoki HTML o'rniga Markdown'ni xavfsiz renderer bilan chiqaring (bu portal ham shunday qiladi).
- `href`dagi `javascript:` havolalari ham XSS manbai.

**Misol:**

```tsx
import DOMPurify from "dompurify";

function Comment({ text }: { text: string }) {
  return <p>{text}</p>;                                            // ✅ matn — avtomatik xavfsiz
}

function Article({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } }); // xavfli qismlar olib tashlanadi
  return <article dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

**Intervyuda shunday ayting:** "`dangerouslySetInnerHTML` React'ning avtomatik escape'ini chetlab o'tadi, shuning uchun ishonchsiz HTML XSS'ga olib keladi. Foydalanuvchi matnini JSX matni sifatida chiqaraman; HTML zarur bo'lsa, DOMPurify bilan sanitizatsiya qilaman va qo'shimcha himoya sifatida CSP qo'yaman."

**Esda tuting:** sanitizatsiyani **serverda** ham qiling — ma'lumot boshqa klientlarga (mobil ilova) ham borishi mumkin. Manba: [dangerouslySetInnerHTML](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html).

## Q41. Bitta interaktiv tugma sabab butun sahifa Client Component bo'lib qoldi — qanday tuzatasiz? / One interactive widget turned a whole page into a Client Component — how do you fix it?

**Oddiy qilib aytganda:** sahifaning tepasiga `"use client"` yozildi, chunki unda bitta filtr tugmasi bor edi. Endi **butun sahifa** — ma'lumot olish ham, matnlar ham — brauzerga JavaScript sifatida ketadi. To'g'risi: sahifa serverda qolsin, `"use client"` faqat **kichik tugma komponentiga** qo'yilsin.

**Batafsilroq:**
- `"use client"` — chegara: shu fayl va u import qilgan hamma narsa client bundle'ga kiradi.
- Chegarani daraxtning **barglariga** (eng kichik interaktiv qismlarga) tushiring.
- Server Component Client Component'ni `children` sifatida o'rab olishi mumkin — client ichida server kontenti qoladi.
- Natija: kamroq JavaScript, tezroq yuklanish, ma'lumot serverda xavfsiz olinadi.

**Misol:**

```tsx
// app/catalog/page.tsx — Server Component qoladi
import { FilterButton } from "./filter-button";

export default async function CatalogPage() {
  const products = await db.product.findMany();
  return (
    <>
      <FilterButton />                                  {/* faqat shu — client */}
      {products.map((p) => <ProductCard key={p.id} product={p} />)}  {/* serverda */}
    </>
  );
}

// app/catalog/filter-button.tsx
"use client";
export function FilterButton() {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen(!open)}>Filtr {open ? "▲" : "▼"}</button>;
}
```

**Intervyuda shunday ayting:** "`use client` chegarasi ostidagi hamma narsa client bundle'ga kiradi. Sahifa va ma'lumot olishni Server Component'da qoldirib, faqat hodisa handler'i kerak bo'lgan barg komponentni client qilaman; kerak bo'lsa server kontentini `children` orqali client komponent ichiga beraman."

**Esda tuting:** bundle analyzer (`@next/bundle-analyzer`) bilan natijani o'lchang. Manba: [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components).

## Q42. Client Component'ga DB klienti yoki funksiya uzatilganda build xato beryapti — nega? / Why does passing a DB client or function to a Client Component fail the build?

**Oddiy qilib aytganda:** server va brauzer orasida ma'lumot **xat** orqali boradi — xatga faqat matn, son, oddiy ro'yxat yozish mumkin. Ma'lumotlar bazasi ulanishini yoki funksiyani "xatga solib" bo'lmaydi. Shuning uchun Server Component'dan Client Component'ga faqat **serializatsiya qilinadigan** props beriladi.

**Batafsilroq:**
- Mumkin: string, number, boolean, `null`, oddiy obyekt va massiv, `Date`, `Map`, `Set`, Promise, JSX.
- Mumkin emas: oddiy funksiyalar, klass nusxalari, DB klientlari, Symbol.
- Istisno: **Server Action** (`"use server"` funksiya) client'ga uzatilishi mumkin — u "masofaviy chaqiruv havolasi" bo'lib ketadi.
- Server amallarini Server Action yoki Route Handler ortida saqlang.

**Misol:**

```tsx
// ❌ <ClientChart db={prisma} format={(n) => n.toFixed(2)} />

// ✅ Server Component
export default async function StatsPage() {
  const rows = await prisma.sale.findMany({ select: { day: true, total: true } });
  const points = rows.map((r) => ({ x: r.day.toISOString(), y: Number(r.total) })); // oddiy ma'lumot
  return <ClientChart points={points} onRefresh={refreshStats} />;                 // refreshStats — Server Action
}
```

**Intervyuda shunday ayting:** "Server va client chegarasidan faqat serializatsiya qilinadigan props o'tadi. DB klientlari va oddiy funksiyalar serverda qoladi; client'ga oddiy ma'lumot va zarur bo'lsa Server Action havolasini beraman."

**Esda tuting:** katta obyektni client'ga to'liq bermang — faqat kerakli maydonlarni tanlang (xavfsizlik va hajm uchun). Manba: [use client](https://nextjs.org/docs/app/api-reference/directives/use-client).

## Q43. Maxfiy API kaliti import zanjiri orqali brauzerga tushib qolishi mumkinmi? / Can a private API key leak into the client bundle through imports?

**Oddiy qilib aytganda:** ha. Agar maxfiy kalitni o'qiydigan modul qaysidir yo'l bilan Client Component tomonidan import qilinsa, u brauzerga ketadigan kodga kirishi mumkin. Himoya — modul boshiga **`import "server-only"`** yozish: kimdir uni client'da import qilsa, build xato beradi.

**Batafsilroq:**
- Next.js'da faqat `NEXT_PUBLIC_` prefiksli env o'zgaruvchilar brauzerga chiqadi; qolganlari client kodda `undefined` bo'ladi. Lekin mantiq baribir noto'g'ri joyda ishlashi mumkin.
- `server-only` paketi — build vaqtidagi qo'riqchi.
- Sirlarni hech qachon `NEXT_PUBLIC_` bilan nomlamang.
- Qarama-qarshisi: `client-only` — faqat brauzerda ishlashi kerak bo'lgan kod uchun.

**Misol:**

```typescript
// lib/payments.ts
import "server-only";                                  // client'ga import qilinsa — build xatosi

export async function chargeCard(amount: number) {
  const response = await fetch("https://api.payments.uz/charge", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.PAYMENTS_SECRET_KEY}` }, // hech qachon NEXT_PUBLIC_
    body: JSON.stringify({ amount }),
  });
  return response.json();
}
```

**Intervyuda shunday ayting:** "Maxfiy konfiguratsiyani o'qiydigan modullarga `server-only` qo'yaman — tasodifiy client import build'da to'xtatiladi. Sirlarni `NEXT_PUBLIC_` bilan nomlamayman, chunki ular bundle'ga yoziladi."

**Esda tuting:** `.env` faylini git'ga qo'shmang; `NEXT_PUBLIC_` qiymatlar **build vaqtida** kodga yoziladi (Q63). Manba: [Preventing environment poisoning](https://nextjs.org/docs/app/getting-started/server-and-client-components#preventing-environment-poisoning).

## Q44. Server Action client yuborgan userId bilan boshqa odamning hisobini o'zgartira olyapti — qanday himoyalanasiz? / A Server Action lets a client edit another account via a submitted userId — how do you protect it?

**Oddiy qilib aytganda:** Server Action — internetga ochiq eshik. Brauzer yuborgan `userId`ga ishonish — kim bo'lishidan qat'i nazar, "men Aliman" deganga Alining kalitini berishga o'xshaydi. To'g'risi: foydalanuvchini **serverdagi sessiyadan** aniqlash va bazadagi so'rovga "bu yozuv shu foydalanuvchiniki" shartini qo'shish.

**Batafsilroq:**
- **Autentifikatsiya** — "kim?" (sessiya/token serverda tekshiriladi).
- **Avtorizatsiya** — "unga ruxsat bormi?" (yozuv egasi shu odammi, roli yetarlimi).
- Ownership shartini **so'rovning o'ziga** qo'shing: `where: { id, ownerId: session.userId }` — shunda boshqa odamning yozuvi umuman topilmaydi.
- Bu xato turi — **IDOR** (Insecure Direct Object Reference), OWASP ro'yxatidagi eng keng tarqalganlaridan.

**Misol:**

```tsx
"use server";
export async function updateNote(noteId: string, formData: FormData) {
  const session = await auth();                                     // ✅ foydalanuvchi — serverdan
  if (!session) throw new Error("Kirish talab qilinadi");
  const text = z.string().max(5_000).parse(formData.get("text"));

  const result = await db.note.updateMany({
    where: { id: noteId, ownerId: session.userId },                 // ✅ faqat o'z yozuvi
    data: { text },
  });
  if (result.count === 0) throw new Error("Yozuv topilmadi");       // boshqaniki bo'lsa ham shu javob
}
```

**Intervyuda shunday ayting:** "Har bir Server Action'ni ochiq endpoint deb qabul qilaman: foydalanuvchini sessiyadan olaman, kiritishni validatsiya qilaman va egalik shartini DB so'roviga qo'shaman. Client yuborgan identifikatorga ishonmayman — bu IDOR zaifligi."

**Esda tuting:** "topilmadi" va "ruxsat yo'q" uchun bir xil javob bering — aks holda hujumchi qaysi ID mavjudligini bilib oladi. Manba: [Authentication — authorization](https://nextjs.org/docs/app/guides/authentication#authorization).

## Q45. Route Handler audit log yozilishini kutgani uchun javob kech qaytyapti — nima qilasiz? / A Route Handler responds slowly because it waits for an audit log write — what do you do?

**Oddiy qilib aytganda:** do'kondagi kassir xaridorga chekni berish uchun hisobotni daftarga yozib bo'lishini kutdirmasligi kerak — avval xaridorni kuzatadi, keyin yozadi. Next.js'dagi **`after()`** shunday: javob foydalanuvchiga yuborilgandan **keyin** bajariladigan ishni rejalashtiradi.

**Batafsilroq:**
- `after(() => writeAudit(event))` — callback javob tugagach ishlaydi.
- Kerakli ma'lumotni (cookie, header) callback'dan **oldin** o'qib oling.
- Faqat **muhim bo'lmagan** ishlar uchun: log, analitika, kesh isitish.
- Majburiy, tranzaksion yozuvlar (to'lov, buyurtma) `after`ga ko'chirilmaydi — ular javobdan oldin bajarilishi shart.
- Serverless platformalarda callback funksiya vaqt chegarasi (`maxDuration`) ichida tugashi kerak.

**Misol:**

```typescript
// app/api/orders/route.ts
import { after } from "next/server";

export async function POST(request: Request) {
  const order = await createOrder(await request.json());      // majburiy — javobdan oldin
  const userAgent = request.headers.get("user-agent") ?? "";  // callback'dan oldin o'qiladi

  after(async () => {
    await writeAudit({ type: "order.created", orderId: order.id, userAgent }); // javobdan keyin
  });

  return Response.json({ id: order.id }, { status: 201 });
}
```

**Intervyuda shunday ayting:** "Javobga ta'sir qilmaydigan ishlarni — log, analitika — `after()` bilan javob yuborilgandan keyinga qoldiraman. Majburiy yozuvlarni esa javobdan oldin bajaraman. Muhim va ishonchli bajarilishi kerak bo'lgan fon ishlari uchun navbat (queue) ishlataman."

**Esda tuting:** `after` ishonchli **navbat emas** — jarayon qulasa, ish yo'qoladi. Kafolat kerak bo'lsa, navbat ishlating. Manba: [after](https://nextjs.org/docs/app/api-reference/functions/after).

## Q46. Layout va sahifa bitta so'rovda bir xil foydalanuvchini bazadan ikki marta o'qiyapti — qanday tuzatasiz? / Layout and page read the same user from the database twice per request — how do you fix it?

**Oddiy qilib aytganda:** bitta sahifa ochilganda layout ham, sahifa ham "joriy foydalanuvchi kim?" deb bazaga alohida murojaat qilyapti. React'ning **`cache()`** funksiyasi shu so'rov doirasida natijani eslab qoladi: birinchi chaqiruv bazaga boradi, ikkinchisi tayyor javobni oladi.

**Batafsilroq:**
- `const getUser = cache(async (id) => db.user.findUnique(...))` — bir xil argument bilan qayta chaqirilsa, bazaga bormaydi.
- Kesh **faqat bitta server so'rovi** davomida yashaydi — foydalanuvchilar orasida ulashilmaydi (xavfsiz).
- `fetch` so'rovlari React tomonidan avtomatik shunday dedup qilinadi; `cache()` esa ORM kabi `fetch` bo'lmagan manbalar uchun.
- So'rovlar orasida saqlanadigan kesh boshqa narsa — Next.js 16 da `"use cache"` (Q5).

**Misol:**

```typescript
// lib/user.ts
import { cache } from "react";
import "server-only";

export const getCurrentUser = cache(async () => {
  const session = await auth();
  return session ? db.user.findUnique({ where: { id: session.userId } }) : null;
});

// app/layout.tsx:  const user = await getCurrentUser();   ← bazaga boradi
// app/page.tsx:    const user = await getCurrentUser();   ← keshdan, shu so'rov ichida
```

**Intervyuda shunday ayting:** "Bitta render daraxtida bir xil ma'lumot bir necha joyda kerak bo'lsa, loader'ni React `cache()` bilan o'rab, so'rov doirasida dedup qilaman. Bu kesh so'rovlar orasida saqlanmaydi, shuning uchun foydalanuvchiga xos ma'lumot uchun xavfsiz."

**Esda tuting:** `cache()` bilan o'ralgan funksiyani **modul darajasida** e'lon qiling — komponent ichida yaratilsa, har safar yangi kesh bo'ladi. Manba: [Deduplicate requests](https://nextjs.org/docs/app/getting-started/fetching-data#deduplicate-requests-and-cache-data).

## Q47. Yangi versiyada GET Route Handler keshlanmay qoldi va backend yuki oshdi — nima qilasiz? / After upgrading, a GET Route Handler is no longer cached and backend load grew — what do you do?

**Oddiy qilib aytganda:** Next.js 14 da GET Route Handler'lar default holatda keshlanardi. Next.js 15 dan boshlab esa default holatda **har so'rovda** bajariladi — kutilmaganda serverga yuk oshadi. Yechim: har bir yo'l uchun "bu ma'lumot qanchalik yangi bo'lishi kerak?" degan savolga **aniq javob** berish.

**Batafsilroq:**
- Hamma uchun bir xil, kamdan-kam o'zgaradigan javob → keshlang:
  - klassik usul: `export const dynamic = "force-static"` yoki `export const revalidate = 3600`;
  - Next.js 16 Cache Components yoqilgan bo'lsa: `"use cache"` va `cacheLife("hours")`.
- Foydalanuvchiga bog'liq javob (cookie, auth) → **keshlamang**, dinamik qoldiring.
- Tashqi CDN keshi uchun `Cache-Control` sarlavhasini ham qo'yish mumkin.

**Misol:**

```typescript
// app/api/currencies/route.ts — hamma uchun bir xil, soatiga bir marta yangilansa yetadi
export const revalidate = 3600;

export async function GET() {
  const rates = await fetch("https://cbu.uz/uz/arkhiv-kursov-valyut/json/").then((r) => r.json());
  return Response.json(rates);
}
```

**Intervyuda shunday ayting:** "Next.js 15 dan GET Route Handler'lar default holatda keshlanmaydi. Men har yo'l uchun yangilik talabini aniq belgilayman: umumiy va kam o'zgaradigan javobni `revalidate` yoki `use cache` bilan keshlayman, foydalanuvchiga xos javobni dinamik qoldiraman."

**Esda tuting:** foydalanuvchi ma'lumotini static keshlash — bir foydalanuvchining ma'lumotini boshqasiga ko'rsatish xavfi. Manba: [Route Handlers — caching](https://nextjs.org/docs/app/api-reference/file-conventions/route#caching).

## Q48. Dinamik sahifada params'ni eski sinxron usulda o'qish TypeScript xatosi beryapti — nima qilasiz? / Reading params synchronously on a dynamic page gives a TypeScript error — what do you do?

**Oddiy qilib aytganda:** Next.js 15 dan `params` va `searchParams` — **Promise**, ya'ni "keyinroq keladigan qiymat". Next.js 16 da eski sinxron usul butunlay olib tashlandi. Endi ularni `await` bilan olish kerak. `cookies()` va `headers()` ham xuddi shunday.

**Batafsilroq:**
- `const { slug } = await params`.
- Topilmagan yozuv uchun `notFound()` chaqiring — to'g'ri `404` qaytadi (Q51).
- Client Component'da Promise'ni React'ning `use()` hook'i bilan ochish mumkin.
- Avtomatik ko'chirish: `npx @next/codemod@canary upgrade latest`.

**Misol:**

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;                        // ✅ Next.js 15+
  const post = await db.post.findUnique({ where: { slug } });
  if (!post) notFound();                                // to'g'ri 404
  return <article><h1>{post.title}</h1></article>;
}
```

**Intervyuda shunday ayting:** "Next.js 15 dan `params`, `searchParams`, `cookies()` va `headers()` asinxron, Next.js 16 da sinxron kirish olib tashlangan. Ularni `await` qilaman va yo'q resurs uchun `notFound()` chaqiraman; ko'chirishda rasmiy codemod'dan foydalanaman."

**Esda tuting:** `params` ichidagi qiymatlar doim **string** — `id`ni son sifatida ishlatishdan oldin tekshiring va aylantiring. Manba: [Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes).

## Q49. Sekin "tavsiyalar" so'rovi butun mahsulot sahifasini kutdiryapti — qanday tuzatasiz? / A slow recommendations query delays the whole product page — how do you fix it?

**Oddiy qilib aytganda:** mahsulot nomi va narxi tayyor, lekin sahifa "sizga yoqishi mumkin" bo'limi uchun 3 soniya kutib turibdi. **Streaming** bilan asosiy qism **darhol** chiqadi, sekin bo'lim esa tayyor bo'lganda o'z joyiga "oqib keladi". Buning uchun sekin qism `<Suspense>` ichiga olinadi.

**Batafsilroq:**
- `<Suspense fallback={<Skeleton />}>` — ichidagi async komponent tayyor bo'lguncha skeleton ko'rinadi.
- Server HTML'ni bo'laklab yuboradi: avval asosiy qism, keyin sekin qism.
- Butun sahifa uchun `loading.tsx` fayli — navigatsiyada darhol ko'rinadigan holat.
- Mustaqil so'rovlarni **parallel** boshlang — ketma-ket `await` "waterfall" hosil qiladi.

**Misol:**

```tsx
// app/product/[id]/page.tsx
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);                   // tez — darhol ko'rsatiladi
  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.price} so'm</p>
      <Suspense fallback={<p>Tavsiyalar yuklanmoqda…</p>}>
        <Recommendations productId={id} />                 {/* sekin — keyin oqib keladi */}
      </Suspense>
    </main>
  );
}

async function Recommendations({ productId }: { productId: string }) {
  const items = await getRecommendations(productId);     // 3 soniya
  return <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>;
}
```

**Intervyuda shunday ayting:** "Sekin, muhim bo'lmagan qismni `Suspense` bilan o'rab stream qilaman: asosiy kontent darhol keladi va LCP yaxshilanadi. Mustaqil ma'lumotlarni parallel yuklayman va skeleton bilan joyni oldindan band qilaman, shunda layout sakramaydi."

**Esda tuting:** SEO uchun muhim kontentni (mahsulot nomi, narxi) Suspense ortiga yashirmang — u asosiy HTML'da bo'lsin. Manba: [Streaming](https://nextjs.org/docs/app/getting-started/linking-and-navigating#streaming).

## Q50. Hisobot widgetidagi xato butun route segmentni yiqityapti — nima qilasiz? / An error in a report widget crashes the entire route segment — what do you do?

**Oddiy qilib aytganda:** Next.js'da har bir papka (route segment) o'z **"saqlagichi"**ga ega bo'lishi mumkin — `error.tsx` fayli. Xato bo'lsa, faqat shu segment "Qayta urinish" tugmali xabarga almashadi, qolgan layout (menyu, sarlavha) joyida qoladi.

**Batafsilroq:**
- `error.tsx` — Client Component bo'lishi shart (`"use client"`); `error` va `reset` props oladi.
- `reset()` — segmentni qayta render qilib ko'rish.
- Foydalanuvchiga ichki tafsilotlarni (stack, SQL) ko'rsatmang; xatoni monitoringga yuboring. Production'da server xatolarining xabari yashiriladi, `error.digest` orqali loglarda topiladi.
- `global-error.tsx` — root layout'ning o'zidagi xatolar uchun.
- Kichikroq widget uchun oddiy Error Boundary (Q26) yetarli.

**Misol:**

```tsx
// app/dashboard/reports/error.tsx
"use client";

export default function ReportsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { reportToMonitoring(error); }, [error]);
  return (
    <div role="alert">
      <p>Hisobotni yuklab bo'lmadi.</p>
      <button onClick={() => reset()}>Qayta urinish</button>
    </div>
  );
}
```

**Intervyuda shunday ayting:** "Next.js'da har bir route segmentga `error.tsx` qo'yib, xatoni shu segment bilan cheklayman; `reset` bilan tiklanish imkonini beraman. Xatoni monitoringga yuboraman va foydalanuvchiga maxfiy tafsilotlarni ko'rsatmayman."

**Esda tuting:** `error.tsx` o'z segmentidagi `layout.tsx` xatolarini ushlamaydi — ular ota segmentning `error.tsx`iga tushadi. Manba: [Error Handling](https://nextjs.org/docs/app/getting-started/error-handling).

## Q51. Yo'q blog posti bo'sh sahifa yoki 200 status bilan qaytyapti — qanday tuzatasiz? / A missing blog post returns an empty page or a 200 status — how do you fix it?

**Oddiy qilib aytganda:** mavjud bo'lmagan sahifa "hammasi joyida" (200) deb javob bersa, qidiruv tizimlari bo'sh sahifani indekslaydi, foydalanuvchi esa nima bo'lganini tushunmaydi. To'g'risi — **`notFound()`** chaqirish: Next.js `404` status qaytaradi va chiroyli `not-found.tsx` sahifasini ko'rsatadi.

**Batafsilroq:**
- `notFound()` — funksiyaning bajarilishini to'xtatadi va eng yaqin `not-found.tsx`ni ko'rsatadi.
- `not-found.tsx` — foydalanuvchiga tushunarli xabar va qidiruv/bosh sahifaga havola.
- Metadata'da ham (`generateMetadata`) topilmagan holatni `notFound()` bilan qayta ishlang.
- Status kodi SEO uchun muhim: "soft 404" (200 bilan bo'sh sahifa) — qidiruv tizimlari uchun salbiy signal.

**Misol:**

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();                          // 404 + not-found.tsx
  return <article><h1>{post.title}</h1></article>;
}

// app/blog/[slug]/not-found.tsx
export default function PostNotFound() {
  return <p>Bunday maqola topilmadi. <a href="/blog">Barcha maqolalar</a></p>;
}
```

**Intervyuda shunday ayting:** "Resurs topilmasa, `notFound()` chaqiraman — u to'g'ri 404 status va `not-found.tsx` UI beradi. Bo'sh sahifa bilan 200 qaytarish SEO va foydalanuvchi tajribasiga zarar."

**Esda tuting:** `notFound()` Promise emas va `return` qilish shart emas — u istisno tashlab bajarilishni o'zi to'xtatadi. Manba: [notFound](https://nextjs.org/docs/app/api-reference/functions/not-found).

## Q52. Parallel route sloti topilmaganda nega 404 yoki eski holat chiqyapti? / Why does an unmatched parallel route slot show a 404 or stale content?

**Oddiy qilib aytganda:** **parallel routes** — bitta sahifada bir nechta mustaqil "oyna" (masalan, dashboard'da `@analytics` va `@team`). Agar joriy URL uchun biror oyna mos sahifaga ega bo'lmasa, Next.js nima ko'rsatishni bilmaydi. Buning uchun har oynaga **zaxira varaq** — `default.tsx` kerak.

**Batafsilroq:**
- Slot — `@` bilan boshlanadigan papka: `app/dashboard/@analytics/page.tsx`.
- Client navigatsiyada Next.js slotning oldingi holatini saqlaydi; sahifani to'liq yangilaganda (hard refresh) esa mos keluvchi sahifani qidiradi — topmasa `default.tsx`ni ishlatadi.
- **Next.js 16 da barcha slotlarga `default.tsx` majburiy** — busiz build yiqiladi.
- `default.tsx` `null` qaytarishi (hech narsa ko'rsatmaslik) yoki `notFound()` chaqirishi mumkin.

**Misol:**

```tsx
// app/dashboard/layout.tsx
export default function Layout({ children, analytics, team }: {
  children: React.ReactNode; analytics: React.ReactNode; team: React.ReactNode;
}) {
  return <div className="grid">{children}{analytics}{team}</div>;
}

// app/dashboard/@analytics/default.tsx — mos sahifa bo'lmaganda
export default function AnalyticsDefault() {
  return null;
}
```

**Intervyuda shunday ayting:** "Parallel route slotlari mos sahifa bo'lmaganda soft navigatsiyada oldingi holatni saqlaydi, hard refresh'da esa `default.tsx`ga tushadi. Har slotga `default.tsx` qo'yib, bu holatni aniq belgilayman — Next.js 16 da bu majburiy."

**Esda tuting:** parallel routes ko'pincha **intercepting routes** bilan birga modal uchun ishlatiladi (Q53). Manba: [Parallel Routes — default.js](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes#defaultjs).

## Q53. Rasm galereyada modal bo'lib, to'g'ridan-to'g'ri havolada alohida sahifa bo'lib ochilishi kerak — qanday qilasiz? / A photo should open as a modal from the gallery but as a full page from a direct URL — how?

**Oddiy qilib aytganda:** Instagram'dagi kabi: galereyadan rasmni bossangiz, u **ustida oyna** (modal) bo'lib ochiladi va orqada galereya ko'rinadi. Havolani do'stingizga yuborsangiz, u **to'liq sahifa** sifatida ochiladi. Next.js buni **intercepting routes** ("ushlab qoluvchi yo'llar") bilan qiladi.

**Batafsilroq:**
- Asl sahifa: `app/photo/[id]/page.tsx` — to'g'ridan-to'g'ri URL va yangilashda.
- Ushlovchi: `app/@modal/(.)photo/[id]/page.tsx` — sayt ichida bosilganda modal.
- `(.)` — bir xil darajadagi yo'lni ushlash; `(..)` — bir daraja yuqori; `(...)` — ildizdan.
- `@modal` — parallel route sloti (Q52), unga `default.tsx` (`null`) kerak.
- Modalni yopish — `router.back()`.

**Misol:**

```tsx
// app/@modal/(.)photo/[id]/page.tsx — galereyadan bosilganda
import { Modal } from "@/components/modal";

export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Modal><img src={`/photos/${id}.jpg`} alt="" /></Modal>;
}

// app/photo/[id]/page.tsx — to'g'ridan-to'g'ri havola yoki refresh
export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <main><img src={`/photos/${id}.jpg`} alt="" /></main>;
}
```

**Intervyuda shunday ayting:** "Intercepting routes client navigatsiyada yo'lni ushlab, uni joriy layout ustida (odatda parallel `@modal` slotida) ko'rsatadi; to'g'ridan-to'g'ri URL va refresh'da esa oddiy sahifa ochiladi. Shunda URL ulashiladigan bo'lib qoladi va kontekst saqlanadi."

**Esda tuting:** modal ochilganda fokusni ichkariga o'tkazing va `Escape` bilan yopishni ta'minlang. Manba: [Intercepting Routes](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes).

## Q54. Har bir mahsulot uchun sarlavha va Open Graph ma'lumoti bazadan kelishi kerak — qanday qilasiz? / Each product's title and Open Graph data come from the database — how do you set them?

**Oddiy qilib aytganda:** havolani Telegram'da ulashganda chiqadigan sarlavha, tavsif va rasm — **metadata** (Open Graph). Har mahsulot uchun u bazadan kelishi kerak. Next.js'da buning uchun sahifa faylida **`generateMetadata`** funksiyasi yoziladi.

**Batafsilroq:**
- `generateMetadata({ params })` — async, sahifa bilan bir xil ma'lumotni oladi.
- `metadataBase` (root layout'da) — nisbiy rasm yo'llarini to'liq URL'ga aylantiradi. Open Graph rasmlari **to'liq URL** bo'lishi shart.
- Bir xil ma'lumotni ikki marta so'ramaslik uchun loader'ni `cache()` bilan o'rang (Q46).
- Topilmagan mahsulotda `notFound()`.
- Dinamik OG rasm yaratish uchun `opengraph-image.tsx` fayli.

**Misol:**

```tsx
// app/product/[id]/page.tsx
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);           // cache() bilan o'ralgan — sahifa bilan ulashiladi
  if (!product) notFound();
  return {
    title: `${product.name} — Do'kon`,
    description: product.summary,
    openGraph: { title: product.name, images: [{ url: product.imageUrl, width: 1200, height: 630 }] },
  };
}
```

**Intervyuda shunday ayting:** "Dinamik metadata uchun `generateMetadata` ishlataman, ma'lumotni sahifa bilan bir xil `cache()` qilingan loader orqali olaman. `metadataBase`ni root layout'da belgilayman, chunki OG rasmlari mutlaq URL talab qiladi; topilmagan resursda `notFound()` chaqiraman."

**Esda tuting:** metadata'ga foydalanuvchi kiritgan matnni to'g'ridan-to'g'ri qo'yishdan oldin uzunligini cheklang. Manba: [Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).

## Q55. Katta hero rasmi LCP'ni yomonlashtirib, sahifani "sakratyapti" — nima qilasiz? / A large hero image hurts LCP and causes layout shift — what do you do?

**Oddiy qilib aytganda:** ikki muammo: (1) rasm **kech yuklanyapti** — sahifaning eng katta elementi (LCP) sekin ko'rinadi; (2) rasm o'lchami oldindan noma'lum — u yuklanganda matn pastga **sakraydi** (CLS). Yechim: brauzerga rasmning **o'lchamini oldindan** aytish, telefon va kompyuterga **mos o'lchamdagi** rasm berish va eng muhim rasmni **birinchi** yuklash.

**Batafsilroq:**
- `next/image` avtomatik: o'lchamni moslaydi, zamonaviy format (WebP/AVIF), lazy loading.
- `width` va `height` (yoki `fill` + o'lchamli konteyner) — joy oldindan band qilinadi, CLS yo'q.
- `sizes` — ekranda rasm qancha joy egallashini aytadi: brauzer keraksiz katta faylni yuklamaydi.
- `priority` (Next.js 16 da `preload`) — faqat **haqiqiy LCP rasmi** uchun; hammasiga qo'ysangiz, foydasi yo'qoladi.
- **LCP** (Largest Contentful Paint) va **CLS** (Cumulative Layout Shift) — Google'ning Core Web Vitals ko'rsatkichlari.

**Misol:**

```tsx
import Image from "next/image";
import hero from "./hero.jpg";                  // statik import — o'lcham avtomatik

export function Hero() {
  return (
    <Image
      src={hero}
      alt="Yozgi chegirmalar"
      sizes="(max-width: 768px) 100vw, 50vw"    // telefonda to'liq kenglik, kompyuterda yarmi
      priority                                 // faqat shu — LCP rasmi
    />
  );
}
```

**Intervyuda shunday ayting:** "CLS'ni oldini olish uchun rasmga o'lcham yoki o'lchamli konteyner beraman. `sizes` bilan to'g'ri variant tanlanadi, faqat LCP rasmiga ustuvor yuklashni qo'yaman. Natijani Lighthouse va real foydalanuvchi metrikalari bilan tekshiraman."

**Esda tuting:** Next.js 16 da `images.qualities` default `[75]` ga o'zgargan — boshqa sifat kerak bo'lsa, konfiguratsiyada ruxsat bering. Manba: [Image component](https://nextjs.org/docs/app/api-reference/components/image).

## Q56. Maxsus shrift tashqi serverdan kech yuklanib, matn "sakrayapti" — nima qilasiz? / A custom font loads late from an external server and shifts text — what do you do?

**Oddiy qilib aytganda:** sahifa avval oddiy shrift bilan chiziladi, keyin Google Fonts'dan chiroyli shrift keladi va matn o'lchami o'zgarib **sakraydi**. `next/font` shriftni **o'z serveringizga** (build vaqtida) yuklab oladi va zaxira shriftning o'lchamini moslab qo'yadi — sakrash deyarli bo'lmaydi.

**Batafsilroq:**
- `next/font/google` — build vaqtida yuklab olinadi, tashqi so'rov yo'q (maxfiylik va tezlik).
- Faqat kerakli `subsets` va `weight`larni tanlang — fayl kichik bo'ladi.
- `display: "swap"` — shrift kelguncha zaxira shrift bilan matn darhol ko'rinadi.
- Avtomatik "size-adjust" — zaxira shrift o'lchamini asl shriftga moslaydi (CLS kamayadi).
- CSS o'zgaruvchisi (`variable`) orqali Tailwind yoki CSS bilan ulash qulay.

**Misol:**

```tsx
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"], display: "swap", variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={inter.variable}>
      <body style={{ fontFamily: "var(--font-inter)" }}>{children}</body>
    </html>
  );
}
```

**Intervyuda shunday ayting:** "`next/font` shriftlarni build vaqtida self-host qiladi, tashqi so'rovni yo'qotadi va zaxira shriftni avtomatik moslab CLS'ni kamaytiradi. Faqat kerakli subset va og'irliklarni yuklayman."

**Esda tuting:** har bir og'irlik (400, 500, 700...) — alohida fayl. Faqat haqiqatan ishlatilganlarini qo'shing. Manba: [Fonts](https://nextjs.org/docs/app/getting-started/fonts).

## Q57. Analitika skripti sahifa "jonlanishidan" oldin asosiy oqimni band qilyapti — nima qilasiz? / An analytics script blocks the main thread before hydration — what do you do?

**Oddiy qilib aytganda:** analitika — muhim, lekin **shoshilinch emas**. U sahifa interaktiv bo'lishidan oldin ishlasa, foydalanuvchi tugmani bosganda javob kechikadi. `next/script`'ning `strategy` opsiyasi skriptni **qachon** yuklashni tanlaydi.

**Batafsilroq:**
- `beforeInteractive` — sahifa jonlanishidan oldin (faqat juda zarur skriptlar, masalan, cookie roziligi).
- `afterInteractive` (default) — sahifa jonlangach darhol (odatiy analitika).
- `lazyOnload` — brauzer bo'sh bo'lganda (chat vidjeti, ijtimoiy tarmoq tugmalari).
- `worker` (eksperimental) — Partytown orqali Web Worker'da; har skript bilan ishlamaydi.
- Skript kerakli DOM yoki boshqa skriptga bog'liqmi — tanlashdan oldin tekshiring.

**Misol:**

```tsx
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>
        {children}
        <Script src="https://analytics.example.com/a.js" strategy="afterInteractive" />
        <Script src="https://chat.example.com/widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
```

**Intervyuda shunday ayting:** "Uchinchi tomon skriptlarini `next/script` bilan yuklayman va ustuvorlikka qarab strategiya tanlayman: analitika — `afterInteractive`, chat va ijtimoiy vidjetlar — `lazyOnload`. Natijani INP va Total Blocking Time bilan o'lchayman."

**Esda tuting:** har bir uchinchi tomon skripti — tezlik va xavfsizlik xavfi. Keraksizlarini olib tashlang. Manba: [Script](https://nextjs.org/docs/app/api-reference/components/script).

## Q58. Nonce'li CSP yoqilganda Next.js'ning inline skriptlari bloklanyapti — nima qilasiz? / Next.js inline scripts are blocked after enabling a nonce-based CSP — what do you do?

**Oddiy qilib aytganda:** **CSP** (Content Security Policy) — brauzerga "faqat shu manbalardan skript ishga tushir" deydigan qoida; XSS'dan himoya qiladi. **Nonce** — har so'rov uchun yangi tasodifiy "parol": faqat shu parolga ega inline skriptlar ishlaydi. Next.js'ning o'z skriptlari ham bu parolni olishi kerak.

**Batafsilroq:**
- Har so'rovda yangi nonce yaratiladi (`proxy.ts`da) va `Content-Security-Policy` sarlavhasiga qo'yiladi.
- Next.js nonce'ni sarlavhadan o'qiydi va o'z skriptlariga avtomatik qo'shadi.
- O'z `<Script>` komponentlaringizga ham `nonce` bering.
- **Muhim oqibat:** har so'rovda yangi nonce — sahifani **statik keshlab bo'lmaydi**, u dinamik render qilinadi.
- Bu portalning o'zida ham shunday qilingan: Cloudflare o'z skriptlariga nonce'ni CSP sarlavhasidan olib qo'yadi.

**Misol:**

```typescript
// proxy.ts
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'; object-src 'none'; base-uri 'none'`;

  const headers = new Headers(request.headers);
  headers.set("x-nonce", nonce);                          // sahifada o'qish uchun
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}
```

**Intervyuda shunday ayting:** "Nonce asosidagi CSP'da har so'rov uchun yangi nonce yarataman, uni sarlavhaga va skriptlarga beraman; Next.js o'z skriptlariga uni avtomatik qo'shadi. Bu sahifalarni dinamik qiladi, shuning uchun statik keshlash bilan trade-off'ni baholayman."

**Esda tuting:** `'unsafe-inline'` qo'shib muammoni "hal qilmang" — u CSP'ning XSS himoyasini deyarli yo'qotadi. Manba: [Content Security Policy](https://nextjs.org/docs/app/guides/content-security-policy).

## Q59. Proxy har bir rasm va CSS so'rovida auth tekshiruvini bajarib, sekinlashtiryapti — nima qilasiz? / The proxy runs auth checks on every asset request and adds latency — what do you do?

**Oddiy qilib aytganda:** qo'riqchi (proxy, Q10) nafaqat odamlarni, balki har bir **pochta qutisini** ham tekshiryapti — rasm, CSS, favicon... Bu keraksiz. `matcher` bilan qo'riqchiga faqat **sahifa yo'llarini** tekshirishni aytasiz, statik fayllarni o'tkazib yuborasiz.

**Batafsilroq:**
- `matcher` — proxy ishlaydigan yo'llar; manfiy lookahead bilan statik yo'llarni chiqarib tashlash mumkin.
- Chiqarib tashlanadiganlar: `_next/static`, `_next/image`, `favicon.ico`, rasm fayllari.
- Proxy'da faqat **tez, "optimistik"** tekshiruv (cookie bormi) va yo'naltirish.
- Haqiqiy xavfsizlik tekshiruvi (sessiya to'g'rimi, ruxsat bormi) — ma'lumot qatlamida (Q44).

**Misol:**

```typescript
// proxy.ts
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|svg|webp)$).*)"],
};
```

**Intervyuda shunday ayting:** "Proxy'ni `matcher` bilan faqat kerakli yo'llarga cheklayman, statik va rasm so'rovlarini chiqarib tashlayman. Proxy'da faqat arzon optimistik tekshiruv va redirect qilaman; haqiqiy avtorizatsiya ma'lumotga kirish joyida bo'ladi."

**Esda tuting:** `matcher` qiymati build vaqtida tahlil qilinadi — u **o'zgarmas literal** bo'lishi kerak, o'zgaruvchidan emas. Manba: [Proxy](https://nextjs.org/docs/app/getting-started/proxy).

## Q60. Foydalanuvchi kiritgan returnTo qiymati "open redirect"ga sabab bo'lishi mumkinmi? / Can a user-supplied returnTo value cause an open redirect?

**Oddiy qilib aytganda:** ha. Login'dan keyin `?returnTo=...` manziliga yo'naltirsangiz, hujumchi `?returnTo=https://yolg'on-sayt.uz` havolasini tarqatadi. Foydalanuvchi sizning haqiqiy saytingizga kiradi, lekin keyin **soxta saytga** tushib, parolini qayta kiritadi. Bu — **open redirect** zaifligi.

**Batafsilroq:**
- Eng xavfsiz yo'l — **ro'yxat**: `returnTo` o'rniga kalit (`?next=orders`) va serverda `{ orders: "/orders" }` xaritasi.
- Erkin yo'l kerak bo'lsa: `new URL(returnTo, origin)` bilan tahlil qilib, `origin` aynan sizniki ekanini va yo'l ruxsat etilganini tekshiring.
- Hiylalarga e'tibor: `//evil.uz` (protokolsiz URL), `/\evil.uz`, `https:evil.uz`.
- Noto'g'ri bo'lsa — xavfsiz standart sahifaga (`/dashboard`).
- Salbiy testlar yozing: tashqi URL va `//evil.example` rad etilishi kerak.

**Misol:**

```js
function safeReturnPath(returnTo, origin) {
  try {
    const url = new URL(returnTo ?? "/", origin);
    if (url.origin !== origin) return "/dashboard";         // boshqa domen — rad
    if (!url.pathname.startsWith("/")) return "/dashboard";
    return url.pathname + url.search;
  } catch {
    return "/dashboard";
  }
}

const origin = "https://shop.uz";
console.log(safeReturnPath("/orders?page=2", origin));      // /orders?page=2
console.log(safeReturnPath("https://evil.uz", origin));     // /dashboard
console.log(safeReturnPath("//evil.uz/login", origin));     // /dashboard
console.log(safeReturnPath("/\\evil.uz", origin));          // /dashboard
```

**Intervyuda shunday ayting:** "Foydalanuvchi bergan redirect manzilini to'g'ridan-to'g'ri ishlatmayman. Imkon bo'lsa oldindan belgilangan yo'llar xaritasidan foydalanaman, aks holda URL'ni parse qilib origin'i o'zimniki ekanini tekshiraman va `//` kabi hiylalarga qarshi salbiy testlar yozaman."

**Esda tuting:** faqat `startsWith("/")` tekshiruvi yetarli emas — `//evil.uz` ham `/` bilan boshlanadi. Manba: [OWASP Unvalidated Redirects](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html).

## Q61. Ikki server nusxasi ISR yangilanishini turlicha ko'rsatyapti — nega? / Two self-hosted replicas show different ISR content — why?

**Oddiy qilib aytganda:** Next.js keshni default holatda **har serverning o'z diskida** saqlaydi. Siz ikkita server ishga tushirdingiz: birinchisi sahifani yangiladi, ikkinchisi esa hali eski nusxani beradi — foydalanuvchi qaysi serverga tushishiga qarab turli narsa ko'radi. Yechim: **umumiy kesh** (masalan, Redis) — barcha serverlar bitta joydan o'qiydi.

**Batafsilroq:**
- Bitta serverda muammo yo'q; ko'p nusxada (Kubernetes, load balancer) — bor.
- `next.config`da `cacheHandler` — o'zingizning umumiy kesh adapteringiz; `cacheMaxMemorySize: 0` — lokal xotira keshini o'chirish.
- Invalidatsiya (`revalidateTag`) ham barcha nusxalarga yetishi kerak — umumiy kesh buni ta'minlaydi.
- Vercel kabi platformalar buni o'zi boshqaradi; self-host qilganda — sizning mas'uliyatingiz.

**Misol:**

```js
// next.config.mjs
const nextConfig = {
  cacheHandler: new URL("./cache-handler.mjs", import.meta.url).pathname, // Redis asosidagi umumiy kesh
  cacheMaxMemorySize: 0,                                                    // lokal xotira keshi o'chiq
};
export default nextConfig;
```

**Intervyuda shunday ayting:** "Self-host qilingan ko'p nusxali Next.js'da default kesh har nusxaning o'zida, shuning uchun ISR natijalari farqlanadi. Umumiy cache handler (masalan, Redis) sozlayman va invalidatsiya barcha nusxalarga tarqalishini tekshiraman."

**Esda tuting:** bu stateless arxitektura qoidasining bir ko'rinishi: holat — umumiy store'da, jarayon xotirasida emas (System Design moduliga qarang). Manba: [Self-hosting — caching and ISR](https://nextjs.org/docs/app/guides/self-hosting#caching-and-isr).

## Q62. Standalone konteyner ishlayapti, lekin CSS va rasmlar 404 — nega? / A standalone container runs but CSS and public images return 404 — why?

**Oddiy qilib aytganda:** `output: "standalone"` — Next.js serverini **minimal** jildga yig'adi (faqat kerakli fayllar), Docker image kichik bo'lishi uchun. Lekin u **`public/`** va **`.next/static/`** papkalarini ataylab qo'shmaydi — ularni CDN'dan berish ham mumkin. Siz ularni o'zingiz nusxalashingiz kerak.

**Batafsilroq:**
- Build'dan keyin: `public` → `.next/standalone/public`, `.next/static` → `.next/standalone/.next/static`.
- Dockerfile'da buni aniq qadam sifatida yozing.
- Deploy'dan keyin **smoke test**: bosh sahifa, bitta CSS fayl va bitta rasm 200 qaytarayotganini tekshiring.

**Misol:**

```dockerfile
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static      # ✅ CSS/JS assetlar
COPY --from=builder /app/public ./public                    # ✅ rasmlar, favicon
USER node
CMD ["node", "server.js"]
```

**Intervyuda shunday ayting:** "Standalone chiqish minimal server yaratadi, lekin `public` va `.next/static`ni o'z ichiga olmaydi — ular CDN'ga ham qo'yilishi mumkin. Dockerfile'da ularni aniq nusxalayman va deploy'dan keyin asset URL'larini smoke test bilan tekshiraman."

**Esda tuting:** konteynerni root bo'lmagan foydalanuvchi bilan ishga tushiring (`USER node`). Manba: [output: standalone](https://nextjs.org/docs/app/api-reference/config/next-config-js/output).

## Q63. NEXT_PUBLIC_ qiymati konteynerning runtime env'i bilan almashadi deb kutilgan edi — nega almashmadi? / Why didn't a NEXT_PUBLIC_ value change with the container's runtime env?

**Oddiy qilib aytganda:** `NEXT_PUBLIC_` o'zgaruvchilari **build paytida** brauzer kodiga "bosib chiqariladi" — xuddi kitobga yozilgan telefon raqami. Kitob chop etilgandan keyin (image yig'ilgach) raqamni o'zgartirsangiz, kitobdagisi eskicha qoladi. Runtime'da o'zgaradigan qiymat uchun boshqa yo'l kerak.

**Batafsilroq:**
- `NEXT_PUBLIC_*` — build'da literal qiymatga almashtiriladi.
- Oddiy (prefiksiz) o'zgaruvchilar — faqat serverda va **runtime'da** o'qiladi.
- Bitta image'ni turli muhitlarda (staging, prod) ishlatish kerak bo'lsa:
  1. qiymatni Server Component'da o'qib, props sifatida client'ga bering (sahifa dinamik bo'ladi);
  2. yoki `/api/config` endpoint orqali bering.
- Next.js 16 da `publicRuntimeConfig` olib tashlangan.

**Misol:**

```tsx
// app/layout.tsx — Server Component, runtime'da o'qiydi
import { connection } from "next/server";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await connection();                                         // so'rov vaqtida render
  const apiUrl = process.env.API_URL ?? "https://api.shop.uz"; // prefiksiz — runtime env
  return (
    <html lang="uz">
      <body>
        <ConfigProvider apiUrl={apiUrl}>{children}</ConfigProvider>
      </body>
    </html>
  );
}
```

**Intervyuda shunday ayting:** "`NEXT_PUBLIC_` qiymatlar build vaqtida bundle'ga inline bo'ladi, shuning uchun konteyner env'i ularni o'zgartirmaydi. Bitta image'ni ko'p muhitda ishlatish uchun runtime qiymatni serverda o'qib, props yoki config endpoint orqali klientga beraman."

**Esda tuting:** `NEXT_PUBLIC_` qiymatlari ochiq — sir saqlamang (Q43). Manba: [Environment Variables](https://nextjs.org/docs/app/guides/environment-variables#bundling-environment-variables-for-the-browser).

## Q64. Production'da qaysi sahifa va so'rov sekin ishlayotgani ko'rinmayapti — qanday kuzatasiz? / In production you can't see which route or query renders slowly — how do you observe it?

**Oddiy qilib aytganda:** server sekinlashganda "qayer sekin?" degan savolga javob kerak — xuddi mashinaning **qora qutisi**. Next.js'ning **`instrumentation.ts`** fayli dastur ishga tushganda kuzatuv asboblarini (OpenTelemetry) ulash va har bir server xatosini ushlab, monitoringga yuborish imkonini beradi.

**Batafsilroq:**
- `instrumentation.ts` — loyiha ildizida; `register()` funksiyasi server ishga tushganda bir marta chaqiriladi.
- `onRequestError` — har bir server xatosini route, so'rov va render turi bilan birga oladi.
- **OpenTelemetry** — kuzatuv standarti: har bir so'rov qaysi bosqichda qancha vaqt olganini ko'rsatadi (trace).
- Next.js o'zi route va render bosqichlari uchun trace span'lar yaratadi.

**Misol:**

```typescript
// instrumentation.ts
import { registerOTel } from "@vercel/otel";
import type { Instrumentation } from "next";

export function register() {
  registerOTel({ serviceName: "shop-web" });                // trace'lar observability tizimiga
}

export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  await reportError({
    message: (error as Error).message,
    path: request.path,
    route: context.routePath,        // masalan, /product/[id]
    renderType: context.renderType,
  });
};
```

**Intervyuda shunday ayting:** "`instrumentation.ts`da `register` orqali OpenTelemetry'ni ulayman va `onRequestError` bilan server xatolarini route konteksti bilan monitoringga yuboraman. Shunda sekin route'lar va ular ichidagi sekin so'rovlar trace'larda ko'rinadi."

**Esda tuting:** loglarga shaxsiy ma'lumot va tokenlarni yozmang. Manba: [Instrumentation](https://nextjs.org/docs/app/guides/instrumentation).

## Q65. Katta CSV eksporti butunlay xotiraga yig'ilib, serverni bo'g'yapti — nima qilasiz? / A large CSV export is fully buffered in memory and chokes the server — what do you do?

**Oddiy qilib aytganda:** 1 million qatorli faylni avval to'liq xotirada yig'ib, keyin yuborish — hovuzni bir chelakda tashishga o'xshaydi. **Stream** bilan fayl kichik bo'laklarda yuboriladi: xotirada faqat bir necha qator turadi, foydalanuvchi esa yuklab olishni darhol boshlaydi (JS asoslari Q6 dagi shlang o'xshatishi).

**Batafsilroq:**
- Route Handler `ReadableStream` qaytarishi mumkin.
- `content-type: text/csv` va `content-disposition: attachment; filename="..."` — brauzer faylni yuklab oladi.
- Ma'lumotni bazadan ham bo'laklab (cursor yoki sahifalash bilan) o'qing.
- Foydalanuvchi yuklashni bekor qilsa — `cancel()` chaqiriladi; bazadan o'qishni ham to'xtating.

**Misol:**

```typescript
// app/api/export/route.ts
export async function GET() {
  const encoder = new TextEncoder();
  let cursor: string | undefined;
  let cancelled = false;

  const stream = new ReadableStream({
    async pull(controller) {
      const batch = await db.order.findMany({ take: 1_000, ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}) });
      if (cancelled || batch.length === 0) return controller.close();
      cursor = batch.at(-1)!.id;
      controller.enqueue(encoder.encode(batch.map((o) => `${o.id},${o.total}\n`).join("")));
    },
    cancel() { cancelled = true; },                         // foydalanuvchi bekor qildi
  });

  return new Response(stream, {
    headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": 'attachment; filename="orders.csv"' },
  });
}
```

**Intervyuda shunday ayting:** "Katta javoblarni `ReadableStream` bilan bo'laklab yuboraman, ma'lumotni ham manbadan bo'laklab o'qiyman — xotira doimiy qoladi va birinchi bayt tez keladi. Klient uzilganda `cancel` orqali bazadagi ishni ham to'xtataman."

**Esda tuting:** `pull` asosidagi stream backpressure'ni hurmat qiladi — klient sekin bo'lsa, keyingi bo'lak so'ralmaydi. Manba: [Route Handlers — streaming](https://nextjs.org/docs/app/api-reference/file-conventions/route#streaming).

## Q66. JavaScript o'chiq brauzerda forma yuborilmayapti, yoqilganda esa "yuborilmoqda" holati ko'rinmayapti — nima qilasiz? / A form doesn't submit with JavaScript disabled, and shows no pending state when hydrated — what do you do?

**Oddiy qilib aytganda:** yaxshi forma **ikkala holatda ham** ishlaydi: JavaScript hali yuklanmagan (sekin internet) bo'lsa ham oddiy HTML forma sifatida yuboriladi, JavaScript yuklangach esa "Yuborilmoqda…" kabi qulayliklar qo'shiladi. Bu — **progressive enhancement** (bosqichma-bosqich yaxshilash).

**Batafsilroq:**
- `<form action={serverAction}>` — Server Action'ni to'g'ridan-to'g'ri `action`ga bering: JavaScript'siz ham ishlaydi.
- `onSubmit` + `fetch` bilan yozilgan forma JavaScript'siz **ishlamaydi**.
- Client'da `useActionState` — `pending` holati va natija (Q29).
- `useFormStatus` — forma ichidagi tugma komponentida "yuborilmoqda"ni bilish.
- Ikkala holatni brauzer testida tekshiring (JavaScript o'chirilgan va yoqilgan).

**Misol:**

```tsx
"use client";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();                   // ota formaning holati
  return <button disabled={pending}>{pending ? "Yuborilmoqda…" : "Buyurtma berish"}</button>;
}

export function OrderForm() {
  const [state, formAction] = useActionState(createOrder, { ok: false });
  return (
    <form action={formAction}>                            {/* JS'siz ham oddiy POST sifatida ishlaydi */}
      <input name="product" required />
      <SubmitButton />
      {state.ok && <p role="status">Buyurtma qabul qilindi</p>}
    </form>
  );
}
```

**Intervyuda shunday ayting:** "Formaga Server Action'ni `action` sifatida beraman — u JavaScript'siz ham yuboriladi. Hydrate bo'lgach `useActionState` va `useFormStatus` bilan pending va natija holatini ko'rsataman. Ikkala rejimni ham avtomatik brauzer testi bilan tekshiraman."

**Esda tuting:** `useFormStatus` faqat `<form>` **ichidagi** komponentda ishlaydi — formaning o'zi bilan bir komponentda emas. Manba: [Forms with Server Actions](https://nextjs.org/docs/app/guides/forms), [useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus).

## Q67. Mahsulot o'zgargach, uni ko'rsatadigan boshqa sahifalar eskirgan holda qolyapti — nima qilasiz? / After a mutation, other pages showing the product stay stale — what do you do?

**Oddiy qilib aytganda:** mahsulot narxi o'zgardi. `revalidatePath("/product/5")` faqat **bitta sahifani** yangilaydi, lekin mahsulot bosh sahifada, kategoriyada, qidiruvda ham bor. Yechim — **teglar**: ma'lumotga "mahsulot-5" yorlig'ini yopishtirasiz va o'zgarishdan keyin shu yorliqli **barcha** keshni yangilaysiz.

**Batafsilroq:**
- Keshlangan ma'lumotga teg: `fetch(url, { next: { tags: ["product-5"] } })` yoki `"use cache"` ichida `cacheTag("product-5")`.
- Server Action ichida:
  - `updateTag("product-5")` (Next.js 16) — o'zgartirgan foydalanuvchi natijani **darhol** ko'radi (read-your-writes);
  - `revalidateTag("product-5", "max")` — stale-while-revalidate: eski nusxa darhol, yangisi fonda.
- Next.js 16 da `revalidateTag`ning bitta argumentli shakli deprecated — ikkinchi argument (`cacheLife` profili) kerak.
- `revalidatePath` — faqat shu yo'lga xos ma'lumot uchun qolsin.

**Misol:**

```tsx
// lib/products.ts
import { cacheTag } from "next/cache";

export async function getProduct(id: string) {
  "use cache";
  cacheTag(`product-${id}`);
  return db.product.findUnique({ where: { id } });
}

// app/admin/actions.ts
"use server";
import { updateTag } from "next/cache";

export async function updatePrice(id: string, price: number) {
  await db.product.update({ where: { id }, data: { price } });
  updateTag(`product-${id}`);      // shu mahsulotni ko'rsatadigan barcha kesh yozuvlari
}
```

**Intervyuda shunday ayting:** "Resursga oid keshni teglar bilan belgilayman va mutation'dan keyin tegni invalidatsiya qilaman — shunda mahsulot ishlatilgan barcha sahifalar yangilanadi. Next.js 16 da darhol ko'rinishi kerak bo'lsa action ichida `updateTag`, fon yangilanishi uchun `revalidateTag(tag, 'max')` ishlataman."

**Esda tuting:** teg nomlarini bitta joyda (masalan, `tags.product(id)` funksiyasi) yarating — yozuvdagi xato keshni jimgina eskirgan holda qoldiradi. Manba: [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag), [Next.js 16 caching APIs](https://nextjs.org/blog/next-16#improved-caching-apis).

## Q68. Cookie o'qiydigan komponent statik sahifa ichida build vaqtida render bo'la olmayapti — nima qilasiz? / A component that reads cookies can't render inside a static shell at build time — what do you do?

**Oddiy qilib aytganda:** build paytida hech qanday foydalanuvchi yo'q — demak cookie ham yo'q. Cookie o'qiydigan komponent (masalan, "Salom, Ali!") faqat **so'rov vaqtida** ishlaydi. Yechim: sahifaning statik qismini statik qoldirib, bu komponentni **`<Suspense>` chegarasi** ichiga olish — u keyin, so'rov kelganda to'ldiriladi (Partial Prerendering).

**Batafsilroq:**
- `cookies()`, `headers()`, `searchParams`, `connection()` — **so'rov vaqti** API'lari; ular komponentni dinamik qiladi.
- Next.js 15+ da ular asinxron: `await cookies()`.
- Cache Components yoqilganda: dinamik qism `<Suspense>` ichida bo'lishi shart — statik qobiq build'da, dinamik qism so'rovda.
- Butun sahifa dinamik bo'lishi kerak bo'lsa, buni ataylab belgilang.

**Misol:**

```tsx
import { cookies } from "next/headers";
import { Suspense } from "react";

async function Greeting() {
  const name = (await cookies()).get("name")?.value;   // so'rov vaqtida
  return <p>Salom, {name ?? "mehmon"}!</p>;
}

export default function HomePage() {
  return (
    <main>
      <h1>Do'konimizga xush kelibsiz</h1>              {/* statik — build'da tayyor */}
      <Suspense fallback={<p>Salom!</p>}>
        <Greeting />                                    {/* dinamik — so'rov vaqtida */}
      </Suspense>
    </main>
  );
}
```

**Intervyuda shunday ayting:** "So'rov vaqti API'larini ishlatadigan qismni `Suspense` chegarasi bilan ajrataman: sahifaning statik qobig'i oldindan tayyor bo'ladi, shaxsiy qism esa so'rov vaqtida stream qilinadi. Bu Next.js'ning Partial Prerendering va Cache Components modeli."

**Esda tuting:** bitta `cookies()` chaqiruvi Suspense'siz yuqori layout'da bo'lsa, **butun** ilova dinamik bo'lib qolishi mumkin. Manba: [cookies](https://nextjs.org/docs/app/api-reference/functions/cookies).

## Q69. Statik eksportga o'tganda dinamik server yo'llari va rasm optimizatori ishlamay qoldi — nega? / After switching to static export, dynamic server routes and the image optimizer stopped working — why?

**Oddiy qilib aytganda:** `output: "export"` — saytni oddiy HTML/CSS/JS fayllar to'plamiga aylantiradi, uni istalgan statik hostingga (GitHub Pages, S3) qo'yish mumkin. Lekin u yerda **Next.js serveri yo'q** — shuning uchun serverga muhtoj imkoniyatlar ishlamaydi.

**Batafsilroq:**
- Ishlamaydi: so'rov vaqtidagi render (cookies, headers), Server Actions, dinamik Route Handler'lar, rasm optimizatori (default loader), proxy, ISR.
- Ishlaydi: build'da yaratiladigan sahifalar, client komponentlar, statik GET Route Handler'lar.
- Dinamik yo'llar (`[slug]`) uchun `generateStaticParams` bilan barcha qiymatlarni build'da yaratish kerak.
- Rasmlar uchun: `images.unoptimized: true` yoki tashqi loader (CDN).
- Qaror: server imkoniyatlari kerak bo'lsa — Node.js deploy'da qoling.

**Misol:**

```tsx
// next.config.mjs:  export default { output: "export", images: { unoptimized: true } };

// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllPosts();                       // build vaqtida
  return posts.map((post) => ({ slug: post.slug }));       // har biri uchun HTML fayl
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <article><h1>{post.title}</h1></article>;
}
```

**Intervyuda shunday ayting:** "Statik eksportda Next.js serveri yo'q, shuning uchun so'rov vaqti API'lari, Server Actions, rasm optimizatori va ISR ishlamaydi. O'tishdan oldin bunday imkoniyatlarni inventarizatsiya qilaman: dinamik yo'llarni `generateStaticParams` bilan oldindan yarataman yoki server kerak bo'lsa Node deploy'da qolaman."

**Esda tuting:** bu portal ham shunga o'xshash tamoyilda qurilgan — kontent statik JSON bo'laklar, faqat progress uchun kichik API. Manba: [Static Exports](https://nextjs.org/docs/app/guides/static-exports).

## Q70. Katta, ixtiyoriy SDK'lar server bundle'ga kirib, ishga tushishni sekinlashtiryapti — nima qilasiz? / Large optional SDKs in the server bundle increase cold start — what do you do?

**Oddiy qilib aytganda:** serverless platformada funksiya "sovuq" holatdan ishga tushganda (cold start) butun kodini yuklaydi. Bundle'da kam ishlatiladigan og'ir kutubxonalar bo'lsa, har ishga tushish sekinlashadi. Yechim: og'ir kutubxonani **faqat kerakli yo'lda** va **kerak bo'lganda** yuklash.

**Batafsilroq:**
- Og'ir import'ni umumiy modul o'rniga uni ishlatadigan route yoki funksiyaning ichiga ko'chiring (dinamik `import()`).
- `serverExternalPackages` — paketni bundle qilmasdan `node_modules`dan to'g'ridan-to'g'ri yuklash (native modullar uchun zarur).
- `optimizePackageImports` — katta "barrel" kutubxonalardan faqat ishlatilgan qismlarni olish (ikonka to'plamlari kabi).
- Natijani bundle analyzer va cold start o'lchovi bilan tekshiring.

**Misol:**

```typescript
// next.config.ts
const nextConfig = {
  serverExternalPackages: ["sharp", "@node-rs/argon2"],       // native — bundle qilinmaydi
  experimental: { optimizePackageImports: ["lucide-react"] },  // faqat ishlatilgan ikonkalar
};
export default nextConfig;

// app/api/report/route.ts — PDF kutubxonasi faqat shu yerda va faqat kerak bo'lganda
export async function GET() {
  const { renderReportPdf } = await import("@/lib/pdf");      // dinamik import
  return new Response(await renderReportPdf(), { headers: { "content-type": "application/pdf" } });
}
```

**Intervyuda shunday ayting:** "Cold start'ni kamaytirish uchun og'ir va kam ishlatiladigan paketlarni faqat kerakli route'da dinamik import qilaman, native paketlarni `serverExternalPackages`ga qo'shaman va barrel kutubxonalar uchun `optimizePackageImports` ishlataman. Natijani bundle analyzer va cold start metrikasi bilan o'lchayman."

**Esda tuting:** `serverExternalPackages`ga qo'shilgan paket deploy muhitida `node_modules`da mavjud bo'lishi shart. Manba: [serverExternalPackages](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages).

## Q71. VITE_ prefiksli API siri brauzer kodida ko'rinib qoldi — nima qilasiz? / An API secret named with VITE_ is visible in browser source — what do you do?

**Oddiy qilib aytganda:** Vite'da `VITE_` bilan boshlanadigan har bir o'zgaruvchi **brauzerga yuboriladigan kodga yoziladi** — uni har kim "Sahifa kodini ko'rish" orqali o'qiy oladi. Bu — sirni devorga osib qo'yishga o'xshaydi. Sir **faqat serverda** yashashi kerak.

**Batafsilroq:**
- `import.meta.env.VITE_*` — build vaqtida literal qiymatga almashtiriladi va bundle'ga kiradi.
- Prefiksiz o'zgaruvchilar klient kodida mavjud emas — bu himoya.
- Sirli API chaqiruvini **serverga** (backend yoki serverless funksiya) ko'chiring; brauzer sizning serveringizga murojaat qilsin.
- **Sir allaqachon chiqib ketgan bo'lsa** — uni darhol almashtiring (rotate); eski kalit bekor qilinsin. Faqat koddan o'chirish yetarli emas: eski bundle'lar va keshlar qoladi.

**Misol:**

```typescript
// ✅ Brauzerda faqat ochiq qiymatlar:
const apiOrigin = import.meta.env.VITE_PUBLIC_API_ORIGIN;       // masalan, https://api.shop.uz

// ❌ const stripeSecret = import.meta.env.VITE_STRIPE_SECRET;  — hamma ko'radi!

// ✅ Sirli chaqiruv — serverda:
// server/pay.ts:  fetch("https://api.stripe.com/...", { headers: { authorization: `Bearer ${process.env.STRIPE_SECRET}` } })
const response = await fetch(`${apiOrigin}/pay`, { method: "POST", body: JSON.stringify({ amount: 50_000 }) });
```

**Intervyuda shunday ayting:** "`VITE_` prefiksli barcha qiymatlarni ochiq deb hisoblayman, chunki ular bundle'ga yoziladi. Sir talab qiladigan chaqiruvlarni backend'ga ko'chiraman, chiqib ketgan kalitni esa darhol almashtiraman."

**Esda tuting:** `envPrefix`ni bo'sh qilib hamma o'zgaruvchini ochish — xavfli; Vite buni ataylab taqiqlaydi. Manba: [Env Variables and Modes](https://vite.dev/guide/env-and-mode).

## Q72. QA build .env.production qiymatini olib, noto'g'ri backend'ga ulanyapti — nima qilasiz? / A QA build picks up .env.production and hits the wrong backend — what do you do?

**Oddiy qilib aytganda:** Vite'da `vite build` default holatda **"production" rejimi** — va `.env.production` faylini o'qiydi. QA (sinov) muhiti uchun alohida rejim kerak: `.env.qa` fayli va `vite build --mode qa` buyrug'i.

**Batafsilroq:**
- **Mode** (rejim) va **NODE_ENV** — turli narsalar: `--mode qa` bilan ham kod minifikatsiya qilingan production build bo'lishi mumkin.
- Fayllar yuklanish tartibi: `.env` → `.env.local` → `.env.[mode]` → `.env.[mode].local` (keyingisi ustun).
- `import.meta.env.MODE` — joriy rejim nomi.
- `.local` fayllar git'ga qo'shilmaydi — shaxsiy sozlamalar uchun.

**Misol:**

```bash
# .env.qa
VITE_API_ORIGIN=https://qa-api.shop.uz

# package.json skriptlari:
#   "build": "vite build",                 → .env.production
#   "build:qa": "vite build --mode qa"     → .env.qa
npm run build:qa
```

**Intervyuda shunday ayting:** "Vite'da rejim va NODE_ENV alohida tushunchalar. Har bir muhit uchun `.env.[mode]` fayli yarataman va build buyrug'ida rejimni aniq beraman, shunda QA build production sozlamalarini olmaydi."

**Esda tuting:** bir image'ni ko'p muhitda ishlatish kerak bo'lsa, build-time env o'rniga runtime config (masalan, `/config.json`) yaxshiroq (Next.js Q63 bilan bir xil g'oya). Manba: [Modes](https://vite.dev/guide/env-and-mode#modes).

## Q73. vite build TypeScript xatolari bo'lsa ham muvaffaqiyatli tugayapti — nega? / Why does vite build succeed even with TypeScript errors?

**Oddiy qilib aytganda:** Vite TypeScript kodini faqat **tarjima qiladi** (tiplarni o'chirib tashlaydi), lekin **tekshirmaydi** — tezlik uchun. Shuning uchun tip xatosi bo'lsa ham build o'tadi. Tekshiruvni alohida qadam sifatida qo'shish kerak: `tsc --noEmit`.

**Batafsilroq:**
- Vite 8 da tarjima **Oxc** (Rust) orqali — har faylni alohida, tip ma'lumotisiz.
- `tsc --noEmit` — faqat tekshiradi, fayl yaratmaydi.
- Build skripti: `"build": "tsc --noEmit && vite build"` — xato bo'lsa build to'xtaydi.
- Dev'da real vaqtda tekshiruv — `vite-plugin-checker` yoki IDE.
- `isolatedModules: true` — faqat alohida-alohida tarjima qilinadigan kodga ruxsat beradi (Vite uchun zarur).

**Misol:**

```json
{
  "scripts": {
    "dev": "vite",
    "typecheck": "tsc --noEmit",
    "build": "tsc --noEmit && vite build"
  }
}
```

**Intervyuda shunday ayting:** "Vite TypeScript'ni faqat transpile qiladi, tip tekshiruvi qilmaydi. Shuning uchun build va CI'ga `tsc --noEmit` qadamini alohida gate sifatida qo'shaman; dev'da esa IDE yoki checker plagini bilan tekshiraman."

**Esda tuting:** bu portal ham shunday qiladi: `npm run typecheck` alohida qadam. Manba: [Vite — TypeScript](https://vite.dev/guide/features#typescript).

## Q74. HMR'dan keyin maxsus store eski obunachilarni saqlab, hodisalar ikki marta ishlayapti — nima qilasiz? / After HMR a custom store keeps old subscribers and events fire twice — what do you do?

**Oddiy qilib aytganda:** HMR faylni o'zgartirganda modulni **qayta ishga tushiradi**, lekin eski modul qo'shgan listener'lar (masalan, `window`ga) o'chmaydi. Endi bir hodisaga ikkita — eski va yangi — listener javob beradi. Yechim: modul almashtirilishidan oldin **tozalash** — `import.meta.hot.dispose`.

**Batafsilroq:**
- `import.meta.hot` — faqat dev rejimida mavjud (production'da `undefined`).
- `import.meta.hot.dispose(callback)` — modul almashtirilishidan oldin chaqiriladi: listener'lar, taymerlar, ulanishlarni tozalang.
- `import.meta.hot.data` — eski va yangi versiya orasida ma'lumot uzatish.
- `if (import.meta.hot)` sharti — production build'da bu kod butunlay olib tashlanadi.

**Misol:**

```typescript
// store.ts
const listeners = new Set<() => void>();
const onResize = () => listeners.forEach((listener) => listener());
window.addEventListener("resize", onResize);

export const store = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    window.removeEventListener("resize", onResize);   // eski listener tozalanadi
    listeners.clear();
  });
}
```

**Intervyuda shunday ayting:** "HMR modulni qayta bajaradi, lekin global yon ta'sirlarni (listener, taymer) o'zi tozalamaydi. Men `import.meta.hot.dispose`da ularni tozalayman; bu kod `if (import.meta.hot)` ichida bo'lgani uchun production'ga kirmaydi."

**Esda tuting:** faqat dev'da ko'rinadigan "ikki marta ishlash" xatolari ko'pincha shu sababdan — production'da takrorlanmasligini tekshiring. Manba: [HMR API](https://vite.dev/guide/api-hmr).

## Q75. Katta JSON'dan faqat bitta maydon kerak, lekin butun fayl bundle'ga kiryapti — nima qilasiz? / Only one field of a large JSON file is needed, but the whole file lands in the bundle — what do you do?

**Oddiy qilib aytganda:** `import metadata from "./metadata.json"` — butun faylni oladi, garchi sizga faqat `version` kerak bo'lsa ham. Vite JSON'dan **nomli import**ni qo'llaydi: `import { version } from "./metadata.json"` — shunda build faqat shu maydonni qoldiradi (**tree-shaking** — ishlatilmaganni olib tashlash).

**Batafsilroq:**
- Nomli import faqat JSON'ning **yuqori darajadagi** kalitlari uchun ishlaydi.
- Natijani tekshiring: build'dan oldin va keyin chunk hajmini solishtiring.
- Agar kodda dinamik kalit bilan murojaat qilinsa (`metadata[key]`), butun obyekt baribir kerak — bu optimizatsiyani majburlamang.
- Juda katta ma'lumot uchun — JSON'ni bundle'ga emas, alohida faylga qo'yib, `fetch` bilan yuklash yaxshiroq.

**Misol:**

```typescript
// ❌ import metadata from "./metadata.json";  console.log(metadata.version);  — butun fayl bundle'da
import { version } from "./metadata.json";      // ✅ faqat version qoladi

document.querySelector("#version")!.textContent = `v${version}`;
```

**Intervyuda shunday ayting:** "Vite JSON'ning yuqori darajadagi kalitlarini nomli import sifatida beradi va ishlatilmaganlarini tree-shake qiladi. Katta JSON'dan faqat kerakli maydonni nomli import qilaman va natijani chunk hajmi bilan tekshiraman; katta ma'lumotni esa alohida fayl sifatida yuklayman."

**Esda tuting:** bu portal katta ma'lumotni aynan shunday qiladi — bundle'ga emas, statik JSON bo'laklarga. Manba: [Vite — JSON](https://vite.dev/guide/features#json).

## Q76. Ilova /tools manzilida ochiladi, lekin fayl havolalari domen ildiziga ketyapti — nima qilasiz? / The app lives at /tools but asset URLs point to the domain root — what do you do?

**Oddiy qilib aytganda:** Vite default holatda ilova domenning ildizida (`/`) turadi deb hisoblaydi va `/assets/app.js` kabi havolalar yaratadi. Ilova esa `https://site.uz/tools/` da. Brauzer faylni noto'g'ri joydan qidiradi — `404`. `base` opsiyasi Vite'ga "mening uyim — `/tools/`" deydi.

**Batafsilroq:**
- `base: "/tools/"` — barcha yaratilgan havolalar shu prefiks bilan boshlanadi.
- Router ham bilishi kerak: React Router'da `basename="/tools"`.
- Kodda ichki yo'llar uchun `import.meta.env.BASE_URL`.
- Reverse proxy (nginx) yo'li bilan bir xil bo'lishi shart.
- `vite preview` bilan build natijasini **haqiqiy yo'lda** tekshiring.

**Misol:**

```typescript
// vite.config.ts
export default defineConfig({ base: "/tools/" });

// main.tsx
<BrowserRouter basename={import.meta.env.BASE_URL}>
  <App />
</BrowserRouter>;
```

**Intervyuda shunday ayting:** "Ilova subpath'da joylashsa, Vite'ning `base` opsiyasini shu yo'lga sozlayman va router basename'ini `import.meta.env.BASE_URL`dan olaman. Natijani preview build'da reverse proxy yo'li bilan birga tekshiraman."

**Esda tuting:** `base` oxiridagi `/` muhim: `"/tools/"`. Manba: [Public Base Path](https://vite.dev/guide/build#public-base-path).

## Q77. Brauzerda process.env yo'qligi sababli versiyani ko'rsatib bo'lmayapti — qanday qilasiz? / process.env doesn't exist in the browser, so the build version can't be shown — how do you do it?

**Oddiy qilib aytganda:** `process.env` — Node.js'ning narsasi, brauzerda u yo'q. Build versiyasini sahifaga chiqarish uchun Vite'ning **`define`** opsiyasi bilan build paytida kodga **tayyor qiymat** "yozib qo'yiladi" — xuddi shablondagi bo'sh joyni to'ldirish kabi.

**Batafsilroq:**
- `define: { __APP_VERSION__: JSON.stringify(version) }` — koddagi `__APP_VERSION__` so'zi shu qiymatga almashtiriladi.
- `define` — **matnni almashtirish**: shuning uchun satrlarni `JSON.stringify` qilish shart (qo'shtirnoq bilan).
- TypeScript uchun e'lon: `declare const __APP_VERSION__: string`.
- Sir uchun ishlatmang — qiymat bundle'ga yoziladi.
- Oddiy muhit sozlamalari uchun `import.meta.env.VITE_*` ham bor (Q71).

**Misol:**

```typescript
// vite.config.ts
import { readFileSync } from "node:fs";
const { version } = JSON.parse(readFileSync("package.json", "utf8"));

export default defineConfig({
  define: { __APP_VERSION__: JSON.stringify(version) },   // "1.4.2" (qo'shtirnoq bilan)
});

// src/env.d.ts
declare const __APP_VERSION__: string;

// Footer.tsx
export const Footer = () => <footer>Versiya: {__APP_VERSION__}</footer>;
```

**Intervyuda shunday ayting:** "Brauzerda `process.env` yo'q, shuning uchun build vaqtidagi qiymatlarni `define` bilan konstanta sifatida kiritaman, `JSON.stringify` bilan to'g'ri literal qilaman va TypeScript uchun `declare const` qo'shaman. Sirlarni bu yo'l bilan bermayman."

**Esda tuting:** `JSON.stringify`siz `define: { V: "1.4.2" }` kodga `1.4.2` (qo'shtirnoqsiz) bo'lib tushadi va sintaksis xatosi beradi. Manba: [define](https://vite.dev/config/shared-options#define).

## Q78. Dev rejimida /api so'rovlari CORS sababli bloklanyapti — nima qilasiz? / In development /api requests are blocked by CORS — what do you do?

**Oddiy qilib aytganda:** frontend `localhost:5173`da, backend `localhost:3000`da — brauzer uchun bu **ikki xil sayt**, u xavfsizlik uchun cookie'li so'rovlarni cheklaydi (CORS). Vite'ning **proxy**si so'rovni o'z nomidan backend'ga uzatadi: brauzer uchun hammasi bitta manzildan keladi.

**Batafsilroq:**
- `server.proxy: { "/api": "http://127.0.0.1:3000" }` — `/api/...` so'rovlari backend'ga ketadi.
- `changeOrigin: true` — `Host` sarlavhasini backend manziliga o'zgartiradi (ba'zi serverlar talab qiladi).
- `rewrite` — yo'lni o'zgartirish (`/api` prefiksini olib tashlash).
- Bu **faqat dev** uchun; production'da reverse proxy yoki bitta domen konfiguratsiyasi kerak.
- Bu portal ham shunday: `vite.config.ts`da `/api` → `localhost:4173`.

**Misol:**

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      "/api": { target: "http://127.0.0.1:3000", changeOrigin: true },
    },
  },
});

// Kodda domen yozilmaydi — dev'da ham, production'da ham bir xil:
await fetch("/api/me", { credentials: "include" });
```

**Intervyuda shunday ayting:** "Dev'da CORS muammosini Vite proxy bilan hal qilaman: brauzer bir xil origin'ga so'rov yuboradi, Vite uni backend'ga uzatadi. Productionda esa reverse proxy yoki aniq CORS siyosati bilan bir xil yo'l tuzilishini saqlayman."

**Esda tuting:** CORS'ni "hal qilish" uchun backend'da `origin: "*"` + `credentials: true` qo'ymang — bu ishlamaydi va xavfli. Manba: [server.proxy](https://vite.dev/config/server-options#server-proxy).

## Q79. Dev serverni LAN'ga wildcard CORS bilan ochish nega xavfli? / Why is exposing the dev server to the LAN with wildcard CORS dangerous?

**Oddiy qilib aytganda:** dev server sizning **manba kodingizni** beradi. `cors: true` yoki `origin: "*"` bo'lsa, siz ochgan **istalgan begona sayt** sizning dev serveringizdan kodni o'qiy oladi — hatto u localhost'da bo'lsa ham (brauzeringiz orqali). Ruxsatni faqat ishonchli manzillarga bering.

**Batafsilroq:**
- Vite'ning xavfsiz default'i — faqat `localhost` va shunga o'xshash manbalarga ruxsat.
- `server.cors: { origin: "https://dev.shop.test" }` — aniq ro'yxat.
- `server.host: true` (LAN'ga ochish) faqat haqiqatan kerak bo'lganda; ish tugagach o'chiring.
- Bu zaiflik 2025-yilda Vite'da topilgan va default'lar qattiqlashtirilgan — eski versiyalarni yangilang.

**Misol:**

```typescript
export default defineConfig({
  server: {
    host: "0.0.0.0",                                   // faqat telefonda sinash kerak bo'lganda
    cors: { origin: ["https://dev.shop.test"] },       // ✅ aniq ro'yxat, "*" emas
  },
});
```

**Intervyuda shunday ayting:** "Dev server manba kodini beradi, shuning uchun CORS'ni wildcard qilmayman — faqat ishonchli origin'lar ro'yxati. Tarmoqqa ochishni vaqtincha va ongli qilaman, Vite'ni xavfsizlik yangilanishlari bilan yangilab boraman."

**Esda tuting:** dev serverni hech qachon internetga ochiq qoldirmang. Manba: [server.cors](https://vite.dev/config/server-options#server-cors).

## Q80. DNS rebinding'dan himoya uchun allowedHosts: true qo'yish nega noto'g'ri? / Why is setting allowedHosts to true wrong for DNS rebinding protection?

**Oddiy qilib aytganda:** **DNS rebinding** — hujumchi o'z domenini (masalan, `evil.uz`) bir lahzada `127.0.0.1`ga yo'naltiradi va brauzeringiz orqali sizning lokal dev serveringizga murojaat qiladi. Himoya — server so'rovdagi `Host` sarlavhasini tekshiradi: "men faqat `localhost` va `dev.shop.test` uchun javob beraman". `allowedHosts: true` bu tekshiruvni **o'chiradi**.

**Batafsilroq:**
- `server.allowedHosts: ["dev.shop.test"]` — faqat shu nomlar qabul qilinadi.
- `true` — har qanday `Host` qabul qilinadi (himoya yo'q).
- Tunnel (ngrok) yoki maxsus domen ishlatganda uning nomini aniq qo'shing.

**Misol:**

```typescript
export default defineConfig({
  server: { allowedHosts: ["dev.shop.test", ".my-tunnel.dev"] }, // "." bilan — subdomenlar ham
});
```

**Intervyuda shunday ayting:** "`allowedHosts` DNS rebinding'ga qarshi `Host` sarlavhasini tekshiradi. `true` qiymati himoyani butunlay o'chiradi, shuning uchun faqat o'zim boshqaradigan host nomlarini ro'yxatga qo'shaman."

**Esda tuting:** "ishlamayapti — `true` qo'yamiz" — xavfsizlik sozlamalarini shunday "tuzatish" eng keng tarqalgan xato. Manba: [server.allowedHosts](https://vite.dev/config/server-options#server-allowedhosts).

## Q81. Alohida source map fayli kerak, lekin bundle ichida unga havola bo'lmasligi kerak — qanday? / You need separate source map files without a sourceMappingURL comment in the bundle — how?

**Oddiy qilib aytganda:** **source map** — minifikatsiya qilingan koddagi xatoni asl kodga "tarjima qiluvchi" lug'at. U xatolarni tahlil qilish uchun juda kerak, lekin hammaga ochiq bo'lsa, asl kodingizni ko'rsatadi. `sourcemap: "hidden"` — lug'at yaratiladi, lekin brauzerga "u qayerda" deb aytilmaydi. Siz uni faqat monitoring tizimiga (Sentry) yuklaysiz.

**Batafsilroq:**
- `false` (default) — source map yo'q.
- `true` — alohida `.map` fayl va JS oxirida `//# sourceMappingURL=...` havolasi.
- `"inline"` — map JS ichiga joylanadi (katta, production uchun emas).
- `"hidden"` — alohida `.map`, lekin havola yo'q.
- CI'da tekshiring: `.map` fayllar bor, JS ichida `sourceMappingURL` yo'q; `.map` fayllarni ochiq serverga qo'ymang.

**Misol:**

```typescript
// vite.config.ts
export default defineConfig({ build: { sourcemap: "hidden" } });

// CI tekshiruvi (shell):
//   ls dist/assets/*.map                               → fayllar bor
//   ! grep -l "sourceMappingURL" dist/assets/*.js      → havola yo'q
//   npx @sentry/cli sourcemaps upload dist/assets      → faqat monitoringga
```

**Intervyuda shunday ayting:** "`sourcemap: 'hidden'` bilan alohida map fayllar yaratiladi, lekin bundle ularga havola bermaydi. Map fayllarni faqat xato monitoring tizimiga yuklayman va ochiq hostingga qo'ymayman — shunda stack trace'lar o'qiladi, kod esa ochilmaydi."

**Esda tuting:** source map — haqiqiy himoya emas, kod baribir brauzerda. Sirlarni frontendga qo'ymang. Manba: [build.sourcemap](https://vite.dev/config/build-options#build-sourcemap).

## Q82. Eski korporativ brauzer production kodni tushunmayapti — nima qilasiz? / An old corporate browser can't parse the production bundle — what do you do?

**Oddiy qilib aytganda:** Vite zamonaviy brauzerlar uchun zamonaviy JavaScript yozadi. Eski brauzer yangi sintaksisni (masalan, `?.`) bilmaydi va sahifa ishlamaydi. `build.target` Vite'ga "qaysi brauzerlarni qo'llab-quvvatlash kerak"ligini aytadi — u kodni ularga tushunarli qilib tarjima qiladi.

**Batafsilroq:**
- Vite 8 default: `"baseline-widely-available"` — keng tarqalgan zamonaviy brauzerlar.
- `target: ["chrome100", "safari15"]` — aniq brauzer ro'yxati.
- `target` faqat **sintaksisni** o'zgartiradi. Yo'q **funksiyalar** (masalan, `structuredClone`) uchun polyfill kerak.
- Juda eski brauzerlar uchun `@vitejs/plugin-legacy` — alohida eski bundle yaratadi.
- Qo'llab-quvvatlash ro'yxatini analitika ma'lumotiga asoslang.

**Misol:**

```typescript
export default defineConfig({
  build: { target: ["chrome100", "safari15", "firefox100"] },
});
```

**Intervyuda shunday ayting:** "Qo'llab-quvvatlanadigan brauzerlar ro'yxatiga qarab `build.target`ni belgilayman — bu sintaksisni transpile qiladi. Yetishmaydigan web API'lar uchun polyfill kerakligini alohida tekshiraman, juda eski brauzerlar uchun legacy plagin ishlataman."

**Esda tuting:** eski target — kattaroq va sekinroq bundle. Hammani eng eski brauzerga moslab qo'ymang. Manba: [build.target](https://vite.dev/config/build-options#build-target).

## Q83. Eski WebView #RGBA CSS rangini tushunmay, dizayn buzilyapti — nima qilasiz? / An old WebView doesn't understand #RGBA colors and breaks styles — what do you do?

**Oddiy qilib aytganda:** CSS minifikatori ranglarni qisqartiradi: `rgba(0,0,0,0.5)` → `#0008`. Eski Android WebView esa bu qisqa yozuvni tushunmaydi. `build.cssTarget` CSS uchun alohida "eski brauzer" nishonini beradi — minifikator u tushunmaydigan qisqartmalarni ishlatmaydi.

**Batafsilroq:**
- `cssTarget` — JavaScript nishonidan mustaqil (JS zamonaviy, CSS esa eski WebView uchun bo'lishi mumkin).
- Masalan, `#RGBA` ranglar Chrome 62 dan qo'llab-quvvatlanadi — `cssTarget: "chrome61"` ularni eski formatda qoldiradi.
- Aynan shu WebView'da **vizual regressiya testi** bilan tekshiring.

**Misol:**

```typescript
export default defineConfig({
  build: {
    target: "es2020",          // JavaScript — zamonaviy
    cssTarget: "chrome61",     // CSS — eski Android WebView uchun
  },
});
```

**Intervyuda shunday ayting:** "CSS minifikatsiyasi nishon brauzerga qarab zamonaviy sintaksis ishlatadi. Eski WebView uchun `build.cssTarget`ni alohida past qilib qo'yaman va natijani shu WebView'da vizual test bilan tekshiraman."

**Esda tuting:** muammo manba kodingizda emas, **minifikator natijasida** — shuning uchun dev'da ko'rinmaydi, faqat production build'da. Manba: [build.cssTarget](https://vite.dev/config/build-options#build-csstarget).

## Q84. Lazy sahifa ochilganda uning CSS'i kech kelib, bir lahza "uslubsiz" ko'rinish chiqyapti — nima qilasiz? / A lazy route's CSS arrives late and causes a flash of unstyled content — what do you do?

**Oddiy qilib aytganda:** Vite har bir lazy sahifaning CSS'ini alohida faylga ajratadi (code splitting). Agar CSS JavaScript'dan kechroq kelsa, sahifa bir lahza **uslubsiz** ko'rinadi (**FOUC** — flash of unstyled content). Yechim: CSS'ni JS bilan birga oldindan yuklash yoki barcha CSS'ni bitta faylga birlashtirish.

**Batafsilroq:**
- `build.cssCodeSplit: true` (default) — har chunk o'z CSS'i bilan; Vite dinamik import paytida CSS'ni ham yuklab, JS'ni u tayyor bo'lguncha kutadi.
- FOUC ko'pincha qo'lda yozilgan yuklash mantiqi yoki CSS-in-JS bilan chiqadi.
- `cssCodeSplit: false` — bitta umumiy CSS fayl: FOUC yo'q, lekin birinchi yuklash og'irroq.
- Qaror — haqiqiy tarmoq "sharsharasi"ni (waterfall) DevTools'da o'lchab qabul qilinadi.

**Misol:**

```typescript
// Kichik ilova — barcha CSS bitta faylda, FOUC yo'q:
export default defineConfig({ build: { cssCodeSplit: false } });

// Yoki katta ilova — route'ni oldindan yuklash (hover paytida):
const loadEditor = () => import("./pages/Editor");
<Link to="/editor" onMouseEnter={loadEditor}>Muharrir</Link>;
```

**Intervyuda shunday ayting:** "Vite route CSS'ini alohida chunk qiladi va odatda uni JS bilan birga yuklaydi. FOUC chiqsa, network waterfall'ni o'lchayman: kichik ilovada `cssCodeSplit: false`, kattasida route'ni oldindan yuklash (prefetch) yoki yuklash oqimini tuzatish."

**Esda tuting:** FOUC CLS'ni ham oshiradi (Q55). Manba: [build.cssCodeSplit](https://vite.dev/config/build-options#build-csscodesplit).

## Q85. Vendor chunk har kichik kutubxona yangilanishida butunlay o'zgarib, kesh yo'qolyapti — nima qilasiz? / The vendor chunk changes on every small dependency update and busts the cache — what do you do?

**Oddiy qilib aytganda:** barcha kutubxonalar bitta katta `vendor.js` faylida bo'lsa, bittasi yangilansa — butun fayl yangi nom oladi va foydalanuvchi **hammasini** qayta yuklaydi. Yaxshiroq: kutubxonalarni **qanchalik tez-tez o'zgarishiga** qarab guruhlash — React kabi barqarorlar bir faylda, tez yangilanadiganlar boshqasida.

**Batafsilroq:**
- Vite 8 da bundler — **Rolldown**; `manualChunks` deprecated, uning o'rniga `build.rolldownOptions.output.codeSplitting` guruhlari.
- Juda ko'p mayda chunk ham yomon — ko'p so'rov va waterfall. Muvozanat kerak.
- Natijani o'lchang: build hajmi, so'rovlar soni va qayta tashriflarda kesh "hit" ulushi.

**Misol:**

```typescript
export default defineConfig({
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "react", test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ }, // kam o'zgaradi
            { name: "vendor", test: /node_modules/ },                                     // qolganlari
          ],
        },
      },
    },
  },
});
```

**Intervyuda shunday ayting:** "Chunk'larni o'zgarish chastotasiga qarab guruhlayman: barqaror freymvork alohida, tez yangilanadigan kutubxonalar alohida — shunda kichik yangilanish katta keshni bekor qilmaydi. Vite 8 da buni Rolldown'ning `codeSplitting` guruhlari bilan qilaman va chunk soni hamda waterfall'ni o'lchayman."

**Esda tuting:** Vite 7 va undan oldingi loyihalarda bu `build.rollupOptions.output.manualChunks` edi — intervyuda versiyani aniqlashtiring. Manba: [Vite 8 migration](https://vite.dev/guide/migration), [Chunking strategy](https://vite.dev/guide/build#chunking-strategy).

## Q86. "Kichik" rasmlar base64 bo'lib JS/CSS hajmini kutilmaganda oshirdi — nima qilasiz? / Small assets inlined as base64 unexpectedly inflated JS/CSS — what do you do?

**Oddiy qilib aytganda:** Vite 4 KB dan kichik fayllarni alohida so'rov qilmaslik uchun **kodning ichiga** (base64 matn sifatida) joylaydi. Lekin base64 faylni ~33% kattalashtiradi, ular JS bilan birga keshlanadi va yuzlab kichik ikonka bo'lsa, JS sezilarli og'irlashadi. `assetsInlineLimit` bu chegarani boshqaradi.

**Batafsilroq:**
- Default `4096` bayt (4 KB).
- Kichikroq qilish (`2048`) yoki `0` — hech narsa inline qilinmaydi.
- Funksiya ham berish mumkin — fayl turiga qarab qaror qilish.
- Git LFS "placeholder" fayllari (haqiqiy fayl o'rniga kichik matn) tasodifan inline bo'lmasligini tekshiring.
- HTTP/2 da ko'p kichik so'rovlar arzonlashdi — inline qilish foydasi kamaygan.

**Misol:**

```typescript
export default defineConfig({
  build: {
    assetsInlineLimit: (filePath) => (filePath.endsWith(".svg") ? false : undefined), // SVG — har doim alohida
  },
});
```

**Intervyuda shunday ayting:** "Vite kichik asset'larni base64 qilib bundle'ga joylaydi — bu so'rovlarni kamaytiradi, lekin hajmni oshiradi va alohida keshlashni yo'qotadi. `assetsInlineLimit`ni o'lchovga qarab sozlayman yoki funksiya bilan tur bo'yicha qaror qilaman."

**Esda tuting:** inline qilingan rasm CSS yoki JS o'zgarganda **qayta** yuklanadi — alohida fayl esa keshda qolardi. Manba: [build.assetsInlineLimit](https://vite.dev/config/build-options#build-assetsinlinelimit).

## Q87. GLTF 3D model importi "noma'lum fayl turi" xatosi beryapti — nima qilasiz? / Importing a GLTF model fails with "unknown file type" — what do you do?

**Oddiy qilib aytganda:** Vite rasm, shrift, video kabi ma'lum fayl turlarini o'zi taniydi. `.gltf` (3D model) uning ro'yxatida yo'q, shuning uchun uni kod deb o'qishga urinadi va xato beradi. `assetsInclude` Vite'ga "bu ham statik fayl — shunchaki manzilini ber" deydi.

**Batafsilroq:**
- `assetsInclude: ["**/*.gltf"]` — bunday fayllar statik asset sifatida qayta ishlanadi.
- Import natijasi — faylning URL'i (production'da hash bilan: `scene-a1b2c3.gltf`).
- Alternativa: faylni `public/` papkasiga qo'yish — lekin unda hash va kesh boshqaruvi yo'q.
- `?url` qo'shimchasi bilan istalgan faylning URL'ini olish ham mumkin: `import url from "./scene.gltf?url"`.

**Misol:**

```typescript
// vite.config.ts
export default defineConfig({ assetsInclude: ["**/*.gltf"] });

// Scene.ts
import modelUrl from "./models/scene.gltf";            // → "/assets/scene-a1b2c3.gltf"
const loader = new GLTFLoader();
loader.load(modelUrl, (gltf) => scene.add(gltf.scene));
```

**Intervyuda shunday ayting:** "Vite taniydigan asset turlari ro'yxati bor; qo'shimcha binar formatlarni `assetsInclude` bilan qo'shaman — shunda import hash'langan URL qaytaradi va fayl asset pipeline'dan o'tadi. Dev va production'da URL ochilishini tekshiraman."

**Esda tuting:** TypeScript uchun modul e'lonini qo'shing: `declare module "*.gltf" { const url: string; export default url; }`. Manba: [assetsInclude](https://vite.dev/config/shared-options#assetsinclude).

## Q88. import.meta.glob barcha 500 ta markdown sahifani boshlang'ich bundle'ga qo'shib yubordi — nima qilasiz? / import.meta.glob pulled all 500 markdown pages into the initial bundle — what do you do?

**Oddiy qilib aytganda:** `import.meta.glob("./pages/*.md")` — "shu papkadagi barcha fayllar" ro'yxati. Default holatda u **dangasa** (lazy): har bir fayl uchun "kerak bo'lsa yukla" funksiyasi qaytaradi. Lekin `{ eager: true }` qo'yilsa, hammasi **darhol** bundle'ga kiradi — 500 ta sahifa birinchi yuklashda!

**Batafsilroq:**
- Default (lazy): `{ "./pages/a.md": () => import("./pages/a.md"), ... }` — har biri alohida chunk.
- `eager: true` — barcha modul birinchi yuklashda (faqat kichik va hammasi kerak bo'lganda).
- Faqat ro'yxat (sarlavha) kerak bo'lsa — `import: "title"` bilan faqat kerakli eksportni olish yoki build vaqtida alohida kichik indeks yaratish.
- Bu portal xuddi shunday qiladi: kichik `manifest.json` va sahifalar alohida bo'laklarda.

**Misol:**

```typescript
// ✅ Lazy — har sahifa kerak bo'lganda yuklanadi
const pages = import.meta.glob("./pages/*.md", { query: "?raw", import: "default" });

async function loadPage(name: string) {
  const load = pages[`./pages/${name}.md`];
  if (!load) throw new Error(`Sahifa topilmadi: ${name}`);
  return (await load()) as string;
}

// ❌ const pages = import.meta.glob("./pages/*.md", { eager: true });  — hammasi birinchi yuklashda
```

**Intervyuda shunday ayting:** "`import.meta.glob` default holatda lazy — har modul alohida chunk bo'ladi. `eager` faqat kichik va hammasi darhol kerak bo'lgan to'plamlarda. Katta kontent uchun build vaqtida kichik indeks yaratib, sahifalarni kerak bo'lganda yuklayman."

**Esda tuting:** glob naqshi **literal** bo'lishi kerak — o'zgaruvchidan yasalgan yo'l ishlamaydi. Manba: [Glob Import](https://vite.dev/guide/features#glob-import).

## Q89. Grafik kutubxonasi dashboard ochilmasa ham asosiy chunk'ka kirib ketyapti — nima qilasiz? / A charting library lands in the entry chunk even if the dashboard is never opened — what do you do?

**Oddiy qilib aytganda:** faylning yuqorisida `import { Chart } from "chart-lib"` yozilsa, kutubxona **har doim** yuklanadi — foydalanuvchi grafikni ko'rmasa ham. Yechim: uni faqat kerak bo'lganda, **dinamik** yuklash (JS asoslari Q62).

**Batafsilroq:**
- `const { renderChart } = await import("./charts")` — alohida chunk, faqat chaqirilganda yuklanadi.
- React'da `lazy` + `Suspense` (Q25).
- Tarmoq xatosiga tayyorlaning: yuklash muvaffaqiyatsiz bo'lsa — xabar va "qayta urinish" tugmasi.
- Deploy'dan keyin eski chunk nomlari yo'qolishi mumkin — Vite `vite:preloadError` hodisasini beradi, u bilan sahifani yangilash mumkin.

**Misol:**

```typescript
async function showSalesChart(container: HTMLElement, data: number[]) {
  try {
    const { renderChart } = await import("./charts");        // faqat shu yerda yuklanadi
    renderChart(container, data);
  } catch {
    container.textContent = "Grafikni yuklab bo'lmadi. Qayta urinib ko'ring.";
  }
}

window.addEventListener("vite:preloadError", () => window.location.reload()); // yangi deploy'dan keyin
```

**Intervyuda shunday ayting:** "Kam ishlatiladigan og'ir kutubxonalarni funksiya chegarasida dinamik import qilaman, shunda ular alohida chunk'ka ajraladi. Yuklash xatosi uchun fallback va retry qo'shaman, deploy'dan keyingi chunk xatolarini `vite:preloadError` bilan ushlayman."

**Esda tuting:** statik va dinamik importni bir modul uchun aralashtirsangiz, u baribir asosiy chunk'da qoladi — Vite build'da bu haqda ogohlantiradi. Manba: [Dynamic Import](https://vite.dev/guide/features#dynamic-import).

## Q90. Worker fayli production'da /src yo'lidan so'ralib, 404 beryapti — nima qilasiz? / A worker file is requested from /src in production and returns 404 — what do you do?

**Oddiy qilib aytganda:** `new Worker("/src/worker.ts")` dev'da ishlaydi, chunki dev server `src` papkasini beradi. Production'da esa `src` yo'q — faqat build natijasi. Vite worker faylini ham build'ga qo'shishi uchun uni **o'zi taniy oladigan** shaklda yozish kerak: `new URL("./worker.ts", import.meta.url)`.

**Batafsilroq:**
- `new Worker(new URL("./worker.ts", import.meta.url), { type: "module" })` — Vite buni statik tahlil qiladi, worker'ni alohida bundle qiladi va to'g'ri URL qo'yadi.
- URL **to'g'ridan-to'g'ri** konstruktor ichida bo'lishi kerak — o'zgaruvchiga oldindan olib qo'yilsa, Vite uni tanimasligi mumkin.
- Alternativa: `import MyWorker from "./worker?worker"`.

**Misol:**

```typescript
const worker = new Worker(new URL("./workers/resize.ts", import.meta.url), { type: "module" });

worker.postMessage({ width: 800 });
worker.onmessage = (event) => console.log("Kichraytirildi:", event.data);
```

**Intervyuda shunday ayting:** "Vite worker'larni `new Worker(new URL('./x.ts', import.meta.url))` naqshi orqali statik aniqlaydi va alohida chunk sifatida build qiladi. Qo'lda yozilgan `/src/...` yo'li faqat dev'da ishlaydi, production'da 404 beradi."

**Esda tuting:** bu naqsh boshqa asset'lar uchun ham ishlaydi: `new URL("./img.png", import.meta.url).href`. Manba: [Web Workers](https://vite.dev/guide/features#web-workers).

## Q91. Bundle ichidagi barcha kutubxona litsenziyalari ro'yxati talab qilindi — qanday olasiz? / Compliance asks for a list of all licenses in the production bundle — how do you get it?

**Oddiy qilib aytganda:** saytingizga kiritilgan har bir ochiq kodli kutubxonaning **litsenziyasi** bor va ba'zilari uni ko'rsatishni talab qiladi. Vite 8 da `build.license: true` build paytida barcha kiritilgan kutubxonalar litsenziyalarini **bitta faylga** yig'ib beradi.

**Batafsilroq:**
- `build: { license: true }` → `dist/.vite/license.md`.
- `license: { fileName: "licenses.json" }` — JSON formatda (avtomatik tekshiruvlar uchun).
- Faqat **bundle'ga haqiqatan kirgan** kutubxonalar ro'yxatlanadi (tree-shaking'dan keyin).
- CI'da: fayl yaratilganini va kutilgan kutubxonalar borligini tekshiring.
- GPL/AGPL kabi "yuqumli" litsenziyalar uchun alohida siyosat bo'lishi kerak.

**Misol:**

```typescript
export default defineConfig({
  build: { license: { fileName: "licenses.json" } },
});
// Build'dan keyin: dist/.vite/licenses.json — nom, versiya, litsenziya turi va matni
```

**Intervyuda shunday ayting:** "Vite 8 ning `build.license` opsiyasi bundle'ga kirgan dependency'lar litsenziyalarini fayl sifatida chiqaradi. Uni CI'da yaratib, ruxsat etilmagan litsenziyalar yo'qligini avtomatik tekshiraman."

**Esda tuting:** bu fayl faqat frontend bundle'ni qamraydi — server tomonidagi kutubxonalar uchun alohida vosita (masalan, `license-checker`) kerak. Manba: [build.license](https://vite.dev/config/build-options#build-license).

## Q92. SSR paytida kod window'ga murojaat qilib, Node jarayonini yiqityapti — nima qilasiz? / During SSR the code touches window and crashes the Node process — what do you do?

**Oddiy qilib aytganda:** SSR'da komponent **serverda** (Node.js'da) ishlaydi, u yerda `window`, `document`, `localStorage` yo'q. Brauzerga xos kodni faqat brauzerda ishga tushirish kerak: `import.meta.env.SSR` sharti yoki `useEffect` ichida.

**Batafsilroq:**
- `import.meta.env.SSR` — build vaqtidagi konstanta; `if (!import.meta.env.SSR)` bloki server bundle'dan **butunlay olib tashlanadi**.
- React'da brauzer kodi `useEffect` ichida — u serverda ishlamaydi.
- Modulning **yuqori darajasidagi** yon ta'sirlar (import paytida `window.addEventListener`) eng xavfli — ular import qilinishi bilan ishlaydi.
- `typeof window !== "undefined"` tekshiruvi ham ishlaydi, lekin kod server bundle'da qoladi.

**Misol:**

```typescript
// analytics.ts
export function initAnalytics() {
  if (import.meta.env.SSR) return;                   // server bundle'dan olib tashlanadi
  window.addEventListener("resize", trackResize);
}

// React komponentida:
function Viewport() {
  const [width, setWidth] = useState<number | null>(null);
  useEffect(() => setWidth(window.innerWidth), []);  // faqat brauzerda
  return <p>{width ?? "…"}</p>;
}
```

**Intervyuda shunday ayting:** "Universal kodda brauzer API'larini faqat brauzerda ishga tushiraman: `import.meta.env.SSR` sharti yoki effect ichida. Modul darajasidagi yon ta'sirlardan qochaman, chunki ular serverda import paytidayoq ishlaydi."

**Esda tuting:** server va brauzer birinchi renderda **bir xil** natija berishi kerak — aks holda hydration xatosi (Q27). Manba: [SSR — conditional logic](https://vite.dev/guide/ssr#conditional-logic).

## Q93. webworker nishonli SSR build Node built-in modullari sabab ishlamayapti — nima qilasiz? / An SSR build targeting webworker fails because of Node built-in dependencies — what do you do?

**Oddiy qilib aytganda:** ba'zi "server" muhitlari aslida Node.js emas — masalan, Cloudflare Workers. Ularda `fs`, `path`, `child_process` kabi Node modullari yo'q. Agar kutubxonangiz ularga tayansa, build yoki ishga tushish muvaffaqiyatsiz bo'ladi. Yechim: shu muhitga mos kutubxonalarni tanlash va hamma narsani bitta faylga yig'ish.

**Batafsilroq:**
- `ssr: { target: "webworker", noExternal: true }` — barcha dependency'lar bundle'ga kiritiladi (muhitda `node_modules` yo'q).
- Node built-in import qilgan kutubxona — xato: uni web-standart muqobilga almashtiring (`fs` → `fetch`/KV, `crypto` modul → Web Crypto).
- Ba'zi platformalar Node moslik rejimini beradi (masalan, `nodejs_compat`), lekin hamma API emas.
- Acceptance: bundle haqiqiy platformada ishlashini sinab ko'ring.

**Misol:**

```typescript
// vite.config.ts
export default defineConfig({
  ssr: { target: "webworker", noExternal: true },
});

// ❌ import { readFileSync } from "node:fs";     — Worker'da yo'q
// ✅ const template = await env.ASSETS.fetch("/index.html").then((r) => r.text());
```

**Intervyuda shunday ayting:** "Edge/worker muhitlarida Node built-in'lar yo'q, shuning uchun SSR'ni `webworker` nishoni bilan to'liq bundle qilaman va Node API'lariga tayanadigan kutubxonalarni web-standart muqobillarga almashtiraman. Natijani haqiqiy platformada sinayman."

**Esda tuting:** "serverda ishlaydi" ≠ "Node.js'da ishlaydi" — deploy nishonini loyiha boshida aniqlang. Manba: [SSR Target](https://vite.dev/guide/ssr#ssr-target).

## Q94. Monorepodagi umumiy fayl dev'da 403 qaytaryapti, lekin serverni butun diskka ochib bo'lmaydi — nima qilasiz? / A shared monorepo file returns 403 in dev, but you can't open the server to the whole disk — what do you do?

**Oddiy qilib aytganda:** Vite dev server xavfsizlik uchun faqat **loyiha papkasi** ichidagi fayllarni beradi. Monorepodagi `../shared` papkasi chegaradan tashqarida — `403`. Butun diskni ochish (`strict: false`) xavfli. To'g'risi: ruxsat ro'yxatiga faqat **kerakli papkani** qo'shish.

**Batafsilroq:**
- `server.fs.strict: true` (default) — ruxsatsiz yo'llar rad etiladi.
- `server.fs.allow` — ruxsat etilgan papkalar ro'yxati.
- **Muhim:** `allow` berilganda Vite'ning avtomatik "workspace ildizi"ni topish o'chadi — uni `searchForWorkspaceRoot` bilan qo'lda qo'shing.
- `server.fs.deny` — ruxsat berilgan joyda ham taqiqlanadigan fayllar (`.env`, kalitlar).
- Testda tekshiring: kerakli fayl 200, ro'yxatdan tashqaridagi fayl 403.

**Misol:**

```typescript
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
  server: {
    fs: {
      strict: true,
      allow: [searchForWorkspaceRoot(process.cwd()), "../shared"],   // faqat kerakli
      deny: [".env", ".env.*", "*.pem"],
    },
  },
});
```

**Intervyuda shunday ayting:** "`server.fs.strict`ni yoqiq qoldiraman va faqat workspace ildizi hamda kerakli umumiy papkani `fs.allow`ga qo'shaman. `allow` avtomatik ildiz aniqlashni almashtirgani uchun `searchForWorkspaceRoot`ni aniq qo'shaman va maxfiy fayllarni `deny` bilan yopaman."

**Esda tuting:** `/@fs/` orqali fayl o'qish zaifliklari Vite'da bir necha bor topilgan — dev server versiyasini yangilab boring. Manba: [server.fs.allow](https://vite.dev/config/server-options#server-fs-allow).

## Q95. Ikki plagin bitta virtual modulni o'zgartiradi va natija ularning tartibiga bog'liq — nima qilasiz? / Two plugins transform the same virtual module and the result depends on their order — what do you do?

**Oddiy qilib aytganda:** konveyerda ikki ishchi bitta mahsulotga ishlov beradi — kim birinchi turishi natijaga ta'sir qiladi. Plagin tartibi tasodifiy bo'lmasligi kerak: Vite'da `enforce: "pre"` (boshida) yoki `"post"` (oxirida) bilan aniq belgilanadi.

**Batafsilroq:**
- Tartib: `enforce: "pre"` plaginlar → Vite ichki plaginlari → oddiy plaginlar → Vite build plaginlari → `enforce: "post"` plaginlar.
- Hook darajasida ham tartib bor: `transform: { order: "pre", handler() {...} }`.
- **Virtual modul** — diskda yo'q, plagin yaratadigan modul (`virtual:config`); nomi odatda `\0` bilan boshlanadi.
- Yakuniy tartibni `configResolved` hook'ida `config.plugins` orqali ko'rish mumkin.

**Misol:**

```typescript
function schemaPlugin(): Plugin {
  const id = "virtual:schema";
  return {
    name: "schema",
    enforce: "pre",                                         // boshqa transform'lardan oldin
    resolveId(source) { return source === id ? `\0${id}` : undefined; },
    load(resolved) { return resolved === `\0${id}` ? `export default ${JSON.stringify({ version: 2 })}` : undefined; },
    configResolved(config) {
      console.log(config.plugins.map((plugin) => plugin.name)); // yakuniy tartib diagnostikasi
    },
  };
}
```

**Intervyuda shunday ayting:** "Plagin tartibi natijaga ta'sir qilsa, uni `enforce` yoki hook darajasidagi `order` bilan aniq belgilayman va `configResolved`da yakuniy tartibni tekshiraman. Virtual modullarni `\0` prefiksi bilan belgilab, boshqa plaginlar ularni fayl deb o'ylamasligini ta'minlayman."

**Esda tuting:** plaginlar massividagi tartibga "tasodifan ishlayapti" deb tayanmang — konfiguratsiya o'zgarganda buziladi. Manba: [Plugin ordering](https://vite.dev/guide/api-plugin#plugin-ordering).

## Q96. Bog'langan (linked) monorepo paketi CommonJS dependency sabab dev'da xato beryapti — nima qilasiz? / A linked monorepo package fails in dev because of a CommonJS dependency — what do you do?

**Oddiy qilib aytganda:** Vite dev'da `node_modules`dagi kutubxonalarni oldindan "tayyorlaydi" (**pre-bundling**): CommonJS'ni ES modulga aylantiradi. Lekin monorepodagi o'zingizning **bog'langan** paketingiz (`npm link` yoki workspace) `node_modules` ichida emas — Vite uni tayyorlamaydi, va u ichidagi eski CommonJS kutubxonasi brauzerda ishlamaydi.

**Batafsilroq:**
- `optimizeDeps.include: ["my-lib > legacy-cjs"]` — bog'langan paket ichidagi dependency'ni ham oldindan tayyorlashni so'rash.
- `>` belgisi — "shu paket ichidagi" degani.
- Konfiguratsiya o'zgarganda Vite keshni o'zi yangilaydi; muammo qolsa — `vite --force`.
- Uzoq muddatli yechim: bog'langan paketning o'zi ESM chiqarsin.

**Misol:**

```typescript
export default defineConfig({
  optimizeDeps: {
    include: ["@company/ui > legacy-date-lib"],   // bog'langan paket ichidagi CJS dependency
  },
});
```

**Intervyuda shunday ayting:** "Vite faqat `node_modules`dagi dependency'larni avtomatik pre-bundle qiladi; linked paketlar manba kodi sifatida xizmat qilinadi. Ular ichidagi CommonJS dependency'larni `optimizeDeps.include`ga `paket > dependency` shaklida qo'shaman."

**Esda tuting:** "ishlamayapti — keshni o'chiraman" ko'pincha vaqtincha yordam beradi; haqiqiy sababni konfiguratsiyada tuzating. Manba: [optimizeDeps.include](https://vite.dev/config/dep-optimization-options#optimizedeps-include).

## Q97. Monorepoda React'ning ikki nusxasi yuklanib, hook'lar xato beryapti — nima qilasiz? / Two copies of React load in a monorepo and hooks break — what do you do?

**Oddiy qilib aytganda:** React **bitta** bo'lishi kerak — ikkita React bo'lsa, ular bir-birining hook'larini tanimaydi va "Invalid hook call" xatosi chiqadi. Monorepoda bu tez-tez bo'ladi: ilova o'z React'ini, umumiy UI paketi esa o'z `node_modules`idagi React'ni oladi. `resolve.dedupe` Vite'ga "React'ni doim bitta joydan ol" deydi.

**Batafsilroq:**
- `resolve.dedupe: ["react", "react-dom"]` — barcha import'lar loyiha ildizidagi nusxaga yo'naltiriladi.
- Ildiz sababini ham tuzating: UI paketida React `peerDependencies`da bo'lsin, `dependencies`da emas.
- Tekshirish: `npm ls react` — bir nechta versiya ko'rinsa, muammo shu.

**Misol:**

```typescript
export default defineConfig({
  resolve: { dedupe: ["react", "react-dom"] },
});

// packages/ui/package.json — to'g'ri:
// "peerDependencies": { "react": "^19.0.0" }   ← ilova React'ini ishlatadi
```

**Intervyuda shunday ayting:** "Ikki React nusxasi hook xatolariga olib keladi. Vite'da `resolve.dedupe` bilan bitta nusxaga majburlayman, lekin asosiy sababni ham tuzataman: kutubxonada React peer dependency bo'lishi kerak. `npm ls react` bilan tekshiraman."

**Esda tuting:** bu muammo test muhitida (Vitest, Jest) ham chiqishi mumkin — u yerda ham xuddi shu sozlama kerak. Manba: [resolve.dedupe](https://vite.dev/config/shared-options#resolve-dedupe).

## Q98. Katta muharrir sahifasi dev'da birinchi marta ochilganda uzoq kutdiryapti — nima qilasiz? / A large editor route is slow to open for the first time in dev — what do you do?

**Oddiy qilib aytganda:** Vite dev'da fayllarni **so'ralganda** tayyorlaydi (Q3). Katta sahifa ochilganda brauzer bitta fayl so'raydi, u boshqasini import qiladi, u yana boshqasini... Bu **zanjir** (waterfall) — har bosqich oldingisini kutadi. `server.warmup` tez-tez ochiladigan fayllarni server ishga tushishi bilan **oldindan** tayyorlab qo'yadi.

**Batafsilroq:**
- `server.warmup.clientFiles` — oldindan tayyorlanadigan fayllar (glob).
- Faqat haqiqatan ko'p ishlatiladigan va og'ir sahifalarni qo'shing — hamma narsani qo'shish server ishga tushishini sekinlashtiradi.
- `vite --profile` — qaysi fayllar sekin o'zgartirilayotganini ko'rish.
- Barrel fayllar (`index.ts` hamma narsani re-export qiladi) zanjirni uzaytiradi — to'g'ridan-to'g'ri import yaxshiroq.

**Misol:**

```typescript
export default defineConfig({
  server: {
    warmup: { clientFiles: ["./src/pages/editor/**/*.tsx", "./src/components/editor/*.tsx"] },
  },
});
```

**Intervyuda shunday ayting:** "Dev'dagi birinchi ochilish sekinligini import waterfall keltirib chiqaradi. Tez-tez ishlatiladigan og'ir fayllarni `server.warmup`ga qo'shaman, barrel import'larni kamaytiraman va `--profile` bilan natijani o'lchayman."

**Esda tuting:** bu faqat **dev** tajribasiga ta'sir qiladi; production tezligi uchun bundle va code splitting muhim. Manba: [server.warmup](https://vite.dev/config/server-options#server-warmup), [Performance](https://vite.dev/guide/performance).

## Q99. DevTools'da "Disable cache" yoqilganda Vite sahifasi juda sekin ochilyapti — nega? / Why is a Vite page very slow with DevTools "Disable cache" enabled?

**Oddiy qilib aytganda:** Vite dev'da oldindan tayyorlangan kutubxonalarni brauzer **keshiga** "qattiq" saqlaydi — ular qayta so'ralmaydi. "Disable cache" bu keshni o'chiradi: har safar yuzlab fayl qaytadan yuklanadi. Bu Vite'ning sekinligi emas — o'lchash sharoiti noto'g'ri.

**Batafsilroq:**
- Pre-bundle qilingan dependency'lar `Cache-Control: max-age=31536000, immutable` bilan beriladi.
- O'z kodingiz fayllari `304 Not Modified` bilan tez tekshiriladi.
- Kesh o'chiq bo'lsa, ikkalasi ham to'liq qayta yuklanadi.
- Brauzer kengaytmalari (masalan, reklama bloklovchilar) ham so'rovlarni sekinlashtirishi mumkin — **toza profil**da (incognito, kengaytmasiz) o'lchang.

**Misol:**

```bash
# Toza sharoitda o'lchash:
# 1) Chrome'da yangi profil yoki inkognito (kengaytmasiz)
# 2) DevTools → Network → "Disable cache" O'CHIQ
# 3) Vite'ni profil bilan ishga tushirish:
npx vite --profile
# Sahifani oching, keyin terminalda "p" bosing — .cpuprofile fayli saqlanadi
```

**Intervyuda shunday ayting:** "Vite dev'da pre-bundle qilingan dependency'lar uchun qattiq brauzer keshiga tayanadi, shuning uchun 'Disable cache' yoqilganda har yuklash to'liq bo'ladi. Performansni toza brauzer profilida, kesh yoqilgan holda va `--profile` bilan o'lchayman."

**Esda tuting:** noto'g'ri o'lchov — noto'g'ri optimizatsiya. Avval o'lchash sharoitini tekshiring. Manba: [Review your browser setup](https://vite.dev/guide/performance#review-your-browser-setup).

## Q100. Express middleware rejimida Vite'ning SPA HTML middleware'i sizning SSR fallback'ingizdan oldin so'rovni ushlab qolyapti — nima qilasiz? / In Express middleware mode, Vite's SPA HTML middleware intercepts requests before your SSR fallback — what do you do?

**Oddiy qilib aytganda:** Vite'ni o'z Express serveringiz ichiga qo'yganingizda, u default holatda "bu SPA" deb o'ylab, har qanday sahifa so'roviga **o'zining** `index.html`ini beradi — sizning SSR kodingizga navbat kelmaydi. `appType: "custom"` Vite'ga "HTML'ni men o'zim boshqaraman" deydi.

**Batafsilroq:**
- `appType`: `"spa"` (default, HTML fallback bilan), `"mpa"` (ko'p sahifali), `"custom"` (HTML middleware'lar yo'q).
- `server.middlewareMode: true` — Vite o'z HTTP serverini ochmaydi, Express'ga middleware sifatida qo'shiladi.
- HTML'ni yuborishdan oldin dev'da `vite.transformIndexHtml(url, template)` — HMR skriptlarini qo'shadi.
- Tartibni integratsiya testi bilan tekshiring: asset, SSR sahifa va 404 to'g'ri ishlashi kerak.

**Misol:**

```typescript
import express from "express";
import { readFile } from "node:fs/promises";
import { createServer as createViteServer } from "vite";

const app = express();
const vite = await createViteServer({ server: { middlewareMode: true }, appType: "custom" });
app.use(vite.middlewares);                                       // faqat asset'lar va HMR

app.use(async (req, res, next) => {
  try {
    const template = await vite.transformIndexHtml(req.originalUrl, await readFile("index.html", "utf8"));
    const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
    const html = template.replace("<!--app-->", await render(req.originalUrl));
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    vite.ssrFixStacktrace(error as Error);
    next(error);
  }
});

app.listen(5173);
```

**Intervyuda shunday ayting:** "O'z SSR serverimda Vite'ni middleware rejimida `appType: 'custom'` bilan ishlataman — shunda Vite o'zining SPA HTML fallback'ini qo'shmaydi. HTML'ni o'zim render qilib, dev'da `transformIndexHtml`dan o'tkazaman va route ustuvorligini integratsiya testlari bilan tekshiraman."

**Esda tuting:** production'da `vite` dev serveri ishlatilmaydi — build qilingan client va server fayllari bilan alohida yo'l yoziladi. Manba: [appType](https://vite.dev/config/shared-options#apptype), [SSR dev server](https://vite.dev/guide/ssr#setting-up-the-dev-server).
