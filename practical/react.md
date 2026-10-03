# React amaliy intervyu ssenariylari

> **Nima bu:** "loyihada shunday muammo chiqdi — nima qilasiz?" turidagi React savollari. Asosiy nazariya va ko'p tarqalgan muammolar (`key`, poyga holati, `useTransition`, memo va boshqalar) `javascript/frontend_react_next.md` da — bu yerda **faqat boshqa, qo'shimcha** ssenariylar, takrorlanish yo'q.
> **Har bir javob tartibi:** muammo oddiy tilda → sababi → yechim (kod bilan) → qanday tekshirasiz → intervyuda qanday aytasiz.
> **Versiya:** React 19.3 (2026-yil sentabr). **Asosiy manba:** [react.dev](https://react.dev/learn).

---

# Ssenariylar

## Q1. Development'da obuna ikki marta ulanyapti — bu xatomi? / A subscription connects twice in development — is that a bug?

**Oddiy qilib aytganda:** React'ning **Strict Mode**i development rejimida har bir effect'ni ataylab **ikki marta** ishga tushiradi: "ulan → uzil → yana ulan". Bu — tekshiruv: agar effect'ingiz to'g'ri **tozalash** (cleanup) qaytarmasa, ikki marta ulanib qoladi va siz buni darhol ko'rasiz. Xato React'da emas, cleanup yo'qligida.

**Yechim:**

```tsx
useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();          // ✅ setup'ning aynan teskarisi
}, [roomId]);
```

**Qanday tekshirasiz:** Strict Mode'da "ulandi → uzildi → ulandi" ketma-ketligi va oxirida faqat **bitta** faol ulanish bo'lishi kerak.

**Intervyuda shunday ayting:** "Strict Mode development'da effect'larni setup-cleanup-setup qilib, yetishmayotgan cleanup'ni ko'rsatadi. Men har effect'dan setup'ni to'liq bekor qiladigan cleanup qaytaraman; Strict Mode'ni o'chirib 'tuzatmayman' — production'da ham xuddi shu xato route o'zgarganda chiqadi."

**Esda tuting:** "effect bir marta ishlasin" uchun ref bilan himoya qo'yish — xatoni yashiradi, tuzatmaydi. Manba: [useEffect](https://react.dev/reference/react/useEffect).

## Q2. Server javobi kelganda foydalanuvchi yozayotgan matnni bosib ketyapti — nima qilasiz? / A server response overwrites what the user is typing — what do you do?

**Oddiy qilib aytganda:** forma serverdan kelgan ma'lumot bilan to'ldiriladi. Foydalanuvchi yozishni boshladi, shu payt fon yangilanishi keldi va uning matnini **o'chirib yubordi**. Yechim: "serverdagi asl" va "foydalanuvchi tahrirlayotgan qoralama"ni **alohida** saqlash.

**Yechim:**

```tsx
function ProfileForm({ serverProfile }: { serverProfile: Profile }) {
  const [draft, setDraft] = useState(() => serverProfile.name);  // faqat birinchi renderda olinadi
  const isDirty = draft !== serverProfile.name;

  return (
    <form>
      <input value={draft} onChange={(e) => setDraft(e.target.value)} />
      {isDirty && <p>Saqlanmagan o'zgarishlar bor</p>}
      {isDirty && serverProfile.updatedByOther && <p role="alert">Boshqa joyda ham o'zgartirilgan — solishtiring</p>}
    </form>
  );
}
// Boshqa profilga o'tganda qoralamani tozalash: <ProfileForm key={profile.id} serverProfile={profile} />
```

**Qanday tekshirasiz:** yozish paytida fon yangilanishini simulyatsiya qiluvchi test — kiritilgan matn o'zgarmasligi kerak.

**Intervyuda shunday ayting:** "Server snapshot'i va tahrir qoralamasi — ikki xil holat. Qoralamani `useState` initializer bilan faqat bir marta olaman, props'dan effect bilan sinxronlamayman. Boshqa yozuvga o'tganda `key` bilan komponentni qayta boshlayman, konflikt bo'lsa foydalanuvchiga ko'rsataman."

**Esda tuting:** `useEffect(() => setDraft(props.name), [props.name])` — aynan shu xatoning manbai. Manba: [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure).

## Q3. Bitta handler'da uch marta setCount(count + 1) chaqirdim, lekin bittaga oshdi — nega? / Calling setCount(count + 1) three times only increments once — why?

**Oddiy qilib aytganda:** `count` — joriy render'ning **surati** (snapshot). Handler ichida u o'zgarmaydi: uch marta ham "0 + 1 = 1" deb yozasiz. React yangilanishlarni to'plab (batching), oxirida bir marta render qiladi. Oldingi qiymatga bog'liq bo'lsa — **updater funksiya** bering.

**Yechim:**

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  function addThree() {
    // ❌ setCount(count + 1); setCount(count + 1); setCount(count + 1);  → 1
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);                        // ✅ → 3, bitta render
  }
  return <button onClick={addThree}>{count}</button>;
}
```

**Qanday tekshirasiz:** bosishdan keyin qiymat 3 ga oshganini test bilan tekshiring.

**Intervyuda shunday ayting:** "State — render'ning snapshot'i, handler ichida o'zgarmaydi; React 18+ barcha yangilanishlarni avtomatik batch qiladi. Oldingi qiymatga bog'liq yangilanishda updater funksiya ishlataman — React ularni navbat bilan qo'llaydi."

**Esda tuting:** `setCount` chaqirilgandan keyin keyingi qatorda `count` hali eski — yangi qiymatni o'zgaruvchida hisoblab ishlating. Manba: [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates).

## Q4. Katta formada holatlar va o'tishlar chalkashib ketdi — qanday tartibga solasiz? / State transitions in a big form became hard to follow — how do you organize them?

**Oddiy qilib aytganda:** o'nlab `setX` chaqiruvlari komponent bo'ylab tarqalib ketganda, "qaysi harakat nimani o'zgartiradi?" savoliga javob berish qiyin. **`useReducer`** barcha o'zgarishlarni **bitta joyga** — reducer funksiyasiga yig'adi: komponent faqat "nima bo'ldi" (action) deb xabar beradi, reducer "holat qanday o'zgaradi"ni hal qiladi.

**Yechim:**

```tsx
type State = { step: "cart" | "address" | "payment" | "done"; address?: string; error?: string };
type Action =
  | { type: "next" }
  | { type: "setAddress"; value: string }
  | { type: "fail"; message: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setAddress": return { ...state, address: action.value, error: undefined };
    case "next":
      if (state.step === "address" && !state.address) return { ...state, error: "Manzilni kiriting" }; // invariant
      return { ...state, step: state.step === "cart" ? "address" : state.step === "address" ? "payment" : "done" };
    case "fail": return { ...state, error: action.message };
  }
}

const [state, dispatch] = useReducer(reducer, { step: "cart" });
```

**Qanday tekshirasiz:** reducer — oddiy funksiya; uni React'siz, unit testlar bilan barcha o'tishlar uchun tekshirasiz.

**Intervyuda shunday ayting:** "Ko'p bog'liq holat va qoidalar bo'lsa, `useReducer`ga o'taman: hodisalar action sifatida, o'tishlar va invariantlar bitta pure funksiyada. Uni UI'siz test qilish oson; murakkab oqimlar uchun state machine kutubxonasi ham variant."

**Esda tuting:** reducer ichida API chaqirmang yoki taymer qo'ymang — u pure bo'lishi kerak; yon ta'sirlar event handler yoki effect'da. Manba: [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer).

## Q5. Input'ni fokuslash render paytida qilingani uchun ba'zan ishlamayapti — qanday to'g'ri qilasiz? / Focusing an input during render works unreliably — how do you do it right?

**Oddiy qilib aytganda:** render — "ekranda nima bo'lishini hisoblash" bosqichi; bu paytda DOM elementi hali tayyor bo'lmasligi mumkin. Fokuslash kabi DOM bilan ishlash **render'dan keyin** — effect'da yoki foydalanuvchi harakatiga javoban event handler'da bo'lishi kerak.

**Yechim:**

```tsx
function SearchDialog({ open }: { open: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  // ❌ render ichida: inputRef.current?.focus();
  useEffect(() => {
    if (open) inputRef.current?.focus();           // ✅ DOM tayyor bo'lgandan keyin
  }, [open]);
  return open ? <input ref={inputRef} aria-label="Qidirish" /> : null;
}
```

**Qanday tekshirasiz:** dialog ochilganda `document.activeElement` input ekanini test bilan tekshiring.

**Intervyuda shunday ayting:** "Ref'lar render'dan keyin to'ldiriladi, shuning uchun DOM bilan ishlashni effect yoki event handler'da qilaman, render'ni esa pure qoldiraman. Oddiy holatda `autoFocus` atributi ham yetarli."

**Esda tuting:** keraksiz avtomatik fokus ekran o'quvchi foydalanuvchilarni chalg'itadi — faqat dialog va qidiruv kabi joylarda ishlating. Manba: [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs).

## Q6. Async handler kutib bo'lgach, eski props'ni ko'ryapti — qanday eng so'nggi qiymatni olasiz? / An async handler sees stale props after an await — how do you read the latest value?

**Oddiy qilib aytganda:** handler bosilgan paytdagi props'ni "suratga olgan". 3 soniya kutgach ham u eski suratga qaraydi — bu orada foydalanuvchi boshqa narsani tanlagan bo'lishi mumkin. Eng so'nggi qiymat kerak bo'lsa, uni **ref**da saqlaysiz: ref — har doim yangilanib turadigan quti.

**Yechim:**

```tsx
function Chat({ roomId }: { roomId: string }) {
  const latestRoom = useRef(roomId);
  useEffect(() => { latestRoom.current = roomId; }, [roomId]);   // har doim eng so'nggi

  async function sendLater(text: string) {
    const roomAtClick = roomId;                    // bosilgan paytdagi — ataylab
    await wait(3_000);
    if (latestRoom.current !== roomAtClick) return; // foydalanuvchi boshqa xonaga o'tgan — yubormaymiz
    await send(roomAtClick, text);
  }
  return <button onClick={() => sendLater("Salom")}>3 soniyadan keyin yuborish</button>;
}
```

**Qanday tekshirasiz:** kutish paytida props o'zgartiriladigan test yozing va kerakli xulq (bekor qilish yoki yangi qiymat) bajarilishini tekshiring.

**Intervyuda shunday ayting:** "Closure bosilgan paytdagi qiymatni ushlaydi — bu ko'pincha to'g'ri. Eng so'nggi qiymat kerak bo'lsa, uni ref'da saqlab, effect'da yangilayman. Qaysi biri kerakligini — bosilgandagimi yoki hozirgisimi — biznes mantiqqa qarab ongli tanlayman."

**Esda tuting:** ref'ni render paytida o'qimang yoki yozmang — faqat handler va effect'larda. Manba: [useRef](https://react.dev/reference/react/useRef).

## Q7. Render paytida setState chaqirildi va cheksiz qayta render boshlandi — qanday tuzatasiz? / setState during render caused an infinite re-render loop — how do you fix it?

**Oddiy qilib aytganda:** render state'ni o'zgartirsa, React qayta render qiladi, u yana state'ni o'zgartiradi... cheksiz aylana. Klassik sabab: `onClick={setOpen(true)}` — funksiyani **berish** o'rniga uni **chaqirib** qo'yish. Render **pure** bo'lishi kerak: faqat hisoblaydi, hech narsani o'zgartirmaydi.

**Yechim:**

```tsx
// ❌ <button onClick={setOpen(true)}>Ochish</button>   — render paytida chaqiriladi
// ✅ <button onClick={() => setOpen(true)}>Ochish</button>

// ❌ function List({ items }) { const [count, setCount] = useState(0); setCount(items.length); ... }
// ✅ hisoblanadigan qiymat — state emas:
function List({ items }: { items: string[] }) {
  const count = items.length;
  return <p>{count} ta element</p>;
}
```

**Qanday tekshirasiz:** "Too many re-renders" xatosining stack trace'i aynan qaysi komponent ekanini ko'rsatadi; React DevTools Profiler'da render sonini kuzating.

**Intervyuda shunday ayting:** "Render pure bo'lishi kerak: state o'zgarishlarini event handler'ga yoki, zarur bo'lsa, effect'ga ko'chiraman. Ko'pincha sabab — handler o'rniga uning chaqiruvini uzatish yoki hisoblanadigan qiymatni state'da saqlash."

**Esda tuting:** Strict Mode render'ni ikki marta chaqiradi — render ichidagi yon ta'sirlarni tez ko'rsatish uchun. Manba: [Keeping Components Pure](https://react.dev/learn/keeping-components-pure).

## Q8. React 19 da Promise'ni komponentda qanday "kutib" o'qiysiz? / How do you read a Promise inside a component in React 19?

**Oddiy qilib aytganda:** React 19'dagi **`use()`** hook'i komponentga "bu ma'lumot tayyor bo'lguncha kut" deyish imkonini beradi. Kutish paytida eng yaqin `<Suspense>` "yuklanmoqda" ko'rsatadi, xato bo'lsa — Error Boundary ushlaydi. Qo'lda `isLoading` state yozish shart emas.

**Yechim:**

```tsx
import { use, Suspense } from "react";

function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  const comments = use(commentsPromise);            // tayyor bo'lguncha Suspense ko'rsatadi
  return <ul>{comments.map((c) => <li key={c.id}>{c.text}</li>)}</ul>;
}

// Server Component yoki ota komponent Promise'ni yaratadi va uzatadi:
export default function Post({ id }: { id: string }) {
  const commentsPromise = getComments(id);         // await qilinmaydi — oqimda keladi
  return (
    <Suspense fallback={<p>Izohlar yuklanmoqda…</p>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  );
}
```

**Qanday tekshirasiz:** Promise sekin bo'lganda fallback, rad etilganda Error Boundary UI ko'rinishini tekshiring.

**Intervyuda shunday ayting:** "React 19 ning `use()` Promise'ni Suspense bilan o'qiydi: tayyor bo'lguncha fallback, xatoda Error Boundary. Promise barqaror bo'lishi kerak — odatda Server Component yoki kesh uni yaratadi; render ichida har safar yangi Promise yaratsam, cheksiz suspend bo'ladi."

**Esda tuting:** `use()` boshqa hook'lardan farqli **shartli** chaqirilishi mumkin; u context'ni ham o'qiy oladi. Manba: [use](https://react.dev/reference/react/use).

## Q9. Ref callback'ida qo'shilgan observer element o'chganda tozalanmayapti — React 19 da nima o'zgardi? / An observer set up in a ref callback isn't cleaned up — what changed in React 19?

**Oddiy qilib aytganda:** ref callback — element sahifaga qo'shilganda chaqiriladigan funksiya. React 19 da u **tozalash funksiyasi qaytarishi** mumkin — xuddi `useEffect` kabi: element olib tashlanganda React uni chaqiradi. Observer, listener'larni shu yerda tozalaysiz.

**Yechim:**

```tsx
function LazyImage({ src }: { src: string }) {
  return (
    <img
      alt=""
      ref={(img) => {
        if (!img) return;
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) img.src = src;
        });
        observer.observe(img);
        return () => observer.disconnect();          // ✅ React 19: element o'chganda
      }}
    />
  );
}
```

**Qanday tekshirasiz:** komponentni ochib-yoping va observer'lar soni ko'paymasligini (xotira profili yoki mock observer) tekshiring.

**Intervyuda shunday ayting:** "React 19 da ref callback cleanup funksiyasi qaytarishi mumkin — element unmount bo'lganda chaqiriladi. DOM elementga bog'liq obuna va observer'larni shu yerda ulab-uzaman. Oldingi versiyalarda React unmount'da callback'ni `null` bilan chaqirardi."

**Esda tuting:** inline ref callback har renderda yangi funksiya — React har safar eskisini tozalab, yangisini ulaydi; og'ir bo'lsa, `useCallback` bilan barqaror qiling. Manba: [ref callback](https://react.dev/reference/react-dom/components/common#ref-callback).

## Q10. Har sahifa uchun brauzer sarlavhasini (title) qanday o'rnatasiz? / How do you set the document title per page?

**Oddiy qilib aytganda:** ilgari buning uchun alohida kutubxona (react-helmet) yoki `document.title = ...` effect kerak edi. React 19 da `<title>`, `<meta>`, `<link>` teglarini **istalgan komponentda** yozish mumkin — React ularni avtomatik `<head>`ga ko'chiradi.

**Yechim:**

```tsx
function ProductPage({ product }: { product: Product }) {
  return (
    <article>
      <title>{`${product.name} — Do'kon`}</title>                {/* React 19 <head>ga ko'chiradi */}
      <meta name="description" content={product.summary} />
      <h1>{product.name}</h1>
    </article>
  );
}
```

**Qanday tekshirasiz:** sahifa almashganda `document.title` yangilanishini va SSR HTML'ida `<title>` borligini tekshiring.

**Intervyuda shunday ayting:** "React 19 document metadata teglarini komponentda render qilishga imkon beradi — ular `<head>`ga hoist qilinadi, SSR bilan ham ishlaydi. Next.js'da esa buning uchun o'zining `metadata` API'si yaxshiroq, chunki u streaming va dublikatlarni boshqaradi."

**Esda tuting:** bir vaqtda ikki komponent `<title>` render qilsa, ikkalasi ham `<head>`ga tushadi — bittadan qoldiring. Manba: [title](https://react.dev/reference/react-dom/components/title).

## Q11. Forma yuborilgandan keyin maydonlar tozalanmayapti yoki kutilmaganda tozalanyapti — nega? / Form fields don't reset after submit, or reset unexpectedly — why?

**Oddiy qilib aytganda:** React 19 da `<form action={...}>` bilan yuborilgan forma muvaffaqiyatli tugagach, **uncontrolled** maydonlarni (ya'ni `defaultValue` bilan) **avtomatik tozalaydi** — xuddi oddiy HTML forma kabi. Controlled maydonlar (`value` + state) esa sizning state'ingizga bog'liq — ularni o'zingiz tozalaysiz.

**Yechim:**

```tsx
function CommentForm({ onSubmit }: { onSubmit: (text: string) => Promise<void> }) {
  return (
    <form
      action={async (formData) => {
        await onSubmit(String(formData.get("text")));   // tugagach uncontrolled input avtomatik tozalanadi
      }}
    >
      <textarea name="text" defaultValue="" />
      <button>Yuborish</button>
    </form>
  );
}
// Qo'lda tozalash kerak bo'lsa (action'dan tashqarida): import { requestFormReset } from "react-dom";
```

**Qanday tekshirasiz:** muvaffaqiyatli yuborishdan keyin maydon bo'shaganini, xato bo'lganda esa kiritilgan matn saqlanganini test qiling (foydalanuvchi qayta yozishi shart bo'lmasin).

**Intervyuda shunday ayting:** "React 19 da action orqali yuborilgan forma muvaffaqiyatda uncontrolled maydonlarni avtomatik reset qiladi. Controlled maydonlarni state orqali o'zim boshqaraman. Xatoda foydalanuvchi matnini yo'qotmaslik uchun natijani `useActionState` bilan qaytaraman."

**Esda tuting:** controlled va avtomatik reset'ni aralashtirsangiz, kutilmagan xulq chiqadi — bitta yondashuvni tanlang. Manba: [form](https://react.dev/reference/react-dom/components/form), [requestFormReset](https://react.dev/reference/react-dom/requestFormReset).

## Q12. React Compiler yoqilgach, ba'zi komponentlar noto'g'ri ishlay boshladi — nega? / After enabling the React Compiler some components misbehave — why?

**Oddiy qilib aytganda:** React Compiler (1.0, 2025-yil oktabr) `useMemo` va `useCallback`ni **avtomatik** qo'shadi. Lekin u sizning kodingiz **React qoidalariga** amal qiladi deb faraz qiladi: props va state'ni o'zgartirmaysiz, render pure. Qoida buzilgan joyda (masalan, props massivini `push` qilish) memoizatsiya eski natijani ko'rsatib qoladi.

**Yechim:**

```tsx
// ❌ Qoidani buzadi — compiler buni "o'zgarmagan" deb o'ylaydi:
function Tags({ tags }: { tags: string[] }) {
  tags.push("yangi");                              // props mutatsiyasi!
  return <p>{tags.join(", ")}</p>;
}

// ✅ Yangi massiv:
function TagsFixed({ tags }: { tags: string[] }) {
  const all = [...tags, "yangi"];
  return <p>{all.join(", ")}</p>;
}
// Muammoli komponentni vaqtincha chiqarib qo'yish: funksiya boshida "use no memo" direktivasi
```

**Qanday tekshirasiz:** `eslint-plugin-react-hooks` (v6) ning compiler asosidagi qoidalarini yoqing — ular qoida buzilishlarini oldindan topadi; compiler'ni avval bitta papkada yoqib, sinab ko'ring.

**Intervyuda shunday ayting:** "React Compiler avtomatik memoizatsiya qiladi, lekin React qoidalariga amal qilinishini talab qiladi: pure render va o'zgarmas props/state. Avval lint qoidalari bilan qoida buzilishlarini tuzataman, compiler'ni bosqichma-bosqich yoqaman va muammoli komponentni vaqtincha `use no memo` bilan chiqaraman."

**Esda tuting:** compiler bor bo'lsa ham qo'lda yozilgan `useMemo`lar zarar qilmaydi, lekin ularni asta-sekin olib tashlash mumkin. Manba: [React Compiler](https://react.dev/learn/react-compiler).

## Q13. 10 000 qatorli ro'yxat sahifani sekinlashtiryapti — nima qilasiz? / A 10,000-row list makes the page slow — what do you do?

**Oddiy qilib aytganda:** ekranda bir vaqtda faqat 20 ta qator ko'rinadi, lekin brauzer 10 000 tasining hammasini chizadi va xotirada saqlaydi. **Virtualizatsiya** — faqat **ko'rinadigan** qatorlarni (va biroz zaxira) chizish, aylantirganda ularni almashtirib turish.

**Yechim:**

```tsx
import { useVirtualizer } from "@tanstack/react-virtual";

function BigList({ rows }: { rows: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({ count: rows.length, getScrollElement: () => parentRef.current, estimateSize: () => 36 });
  return (
    <div ref={parentRef} style={{ height: 480, overflow: "auto" }}>
      <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
        {virtualizer.getVirtualItems().map((item) => (
          <div key={item.key} style={{ position: "absolute", top: 0, transform: `translateY(${item.start}px)`, height: item.size }}>
            {rows[item.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Qanday tekshirasiz:** DOM'dagi qatorlar soni (~20–40) va aylantirish paytidagi FPS ni Performance panelida o'lchang.

**Intervyuda shunday ayting:** "Katta ro'yxatda faqat ko'rinadigan elementlarni render qilaman — virtualizatsiya (TanStack Virtual, react-window). Shuningdek sahifalash yoki 'ko'proq yuklash' variantini ko'rib chiqaman. Virtualizatsiya brauzerning 'sahifadan qidirish' (Ctrl+F) va accessibility'ga ta'sir qilishini hisobga olaman."

**Esda tuting:** oddiyroq variant — CSS `content-visibility: auto`, u ekrandan tashqaridagi qismlarni chizishni o'tkazib yuboradi. Manba: [Rendering Lists](https://react.dev/learn/rendering-lists).

## Q14. Sahifa almashganda ekran o'quvchi foydalanuvchilar buni sezmayapti — qanday tuzatasiz? / Screen reader users don't notice client-side page changes — how do you fix it?

**Oddiy qilib aytganda:** oddiy saytda yangi sahifa ochilganda brauzer buni e'lon qiladi. SPA'da esa faqat kontent almashadi — ko'rmaydigan foydalanuvchi uchun "hech narsa bo'lmagan". Yechim: navigatsiyadan keyin **fokusni** yangi sahifa sarlavhasiga o'tkazish yoki o'zgarishni **ovozli e'lon** qilish.

**Yechim:**

```tsx
function PageHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);          // yangi sahifa ochilganda
  return <h1 ref={ref} tabIndex={-1}>{children}</h1>;       // tabIndex -1: fokus olishi mumkin
}

// Yoki umumiy e'lon hududi:
// <div aria-live="polite" className="sr-only">{`${pageTitle} sahifasi ochildi`}</div>
```

**Qanday tekshirasiz:** VoiceOver yoki NVDA bilan sahifalar orasida o'tib, yangi sahifa nomi o'qilishini tekshiring.

**Intervyuda shunday ayting:** "Client-side navigatsiyada fokusni yangi sahifaning asosiy sarlavhasi yoki `main` elementiga o'tkazaman yoki `aria-live` hududida e'lon qilaman. Freymvork router'larida bu ko'pincha qisman bor — haqiqiy ekran o'quvchida tekshiraman."

**Esda tuting:** bu portal ham shunday qiladi: route o'zgarganda fokus `main` elementiga o'tadi. Manba: [Accessibility — React](https://legacy.reactjs.org/docs/accessibility.html#programmatically-managing-focus).

## Q15. "Uncontrolled input controlled'ga aylanyapti" ogohlantirishi chiqyapti — nega? / A "changing an uncontrolled input to be controlled" warning appears — why?

**Oddiy qilib aytganda:** input'ning `value`si birinchi renderda `undefined` bo'ldi (React "bu boshqarilmaydigan input" deb o'yladi), keyin qiymat keldi (endi "boshqariladigan"). React input'ni kim boshqarishini **o'zgartirishni** yoqtirmaydi. Yechim: `value`ni **hech qachon `undefined` qilmang** — bo'sh satr bering.

**Yechim:**

```tsx
function NameInput({ user }: { user?: { name?: string } }) {
  // ❌ <input value={user?.name} onChange={...} />   — dastlab undefined
  const [name, setName] = useState(user?.name ?? "");     // ✅ har doim string
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

**Qanday tekshirasiz:** ma'lumot yuklanishidan oldin va keyin konsolda ogohlantirish yo'qligini tekshiring.

**Intervyuda shunday ayting:** "Input butun hayoti davomida yo controlled (`value` doim aniqlangan), yo uncontrolled (`defaultValue`) bo'lishi kerak. `undefined`dan qiymatga o'tish rejimni almashtiradi — shuning uchun boshlang'ich qiymatni `?? ''` bilan beraman."

**Esda tuting:** `null` ham xuddi shunday muammo beradi. Manba: [input — controlled](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable).

## Q16. Production'da ushlangan va ushlanmagan xatolarni qanday qilib bitta joyga yig'asiz? / How do you centrally report caught and uncaught render errors in production?

**Oddiy qilib aytganda:** Error Boundary ushlagan xatolar foydalanuvchini qutqaradi, lekin siz ular haqida bilmasligingiz mumkin. React 19 da `createRoot`ga **bitta joyda** "xato bo'lsa, menga xabar ber" funksiyalarini berasiz — hammasi monitoring tizimiga (Sentry va hokazo) ketadi.

**Yechim:**

```tsx
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root")!, {
  onCaughtError: (error, info) => report("caught", error, info.componentStack),        // boundary ushladi
  onUncaughtError: (error, info) => report("uncaught", error, info.componentStack),    // boundary yo'q
  onRecoverableError: (error) => report("recoverable", error),                          // masalan, hydration
});
root.render(<App />);
```

**Qanday tekshirasiz:** ataylab xato beradigan test komponentini render qiling va monitoringda yozuv paydo bo'lganini tekshiring.

**Intervyuda shunday ayting:** "React 19 `createRoot` va `hydrateRoot` opsiyalarida `onCaughtError`, `onUncaughtError` va `onRecoverableError` beradi — ular bilan barcha render xatolarini komponent stack'i bilan bir joyda monitoringga yuboraman."

**Esda tuting:** hodisa handler va asinxron koddagi xatolar bu yerga tushmaydi — ular uchun `window.onerror` va `unhandledrejection`. Manba: [createRoot options](https://react.dev/reference/react-dom/client/createRoot#parameters).

## Q17. Ichma-ich Suspense'lar ketma-ket yuklanib, sahifa sekin ochilyapti — nima qilasiz? / Nested Suspense boundaries load one after another and the page is slow — what do you do?

**Oddiy qilib aytganda:** ota komponent ma'lumotini yukladi, faqat keyin farzand o'z so'rovini **boshladi** — bu "sharshara" (waterfall): so'rovlar navbat bilan, parallel emas. Yechim: barcha so'rovlarni **eng yuqorida birdaniga** boshlab, Promise'larni pastga uzatish.

**Yechim:**

```tsx
// ❌ User yuklanadi → keyin Orders o'z so'rovini boshlaydi → keyin Reviews...
// ✅ Hammasi birdan boshlanadi:
export default function Profile({ id }: { id: string }) {
  const userPromise = getUser(id);                 // await yo'q — hammasi parallel
  const ordersPromise = getOrders(id);
  const reviewsPromise = getReviews(id);
  return (
    <>
      <Suspense fallback={<p>Profil…</p>}><User promise={userPromise} /></Suspense>
      <Suspense fallback={<p>Buyurtmalar…</p>}><Orders promise={ordersPromise} /></Suspense>
      <Suspense fallback={<p>Sharhlar…</p>}><Reviews promise={reviewsPromise} /></Suspense>
    </>
  );
}
```

**Qanday tekshirasiz:** Network panelida so'rovlar ketma-ket emas, **bir vaqtda** boshlanganini ko'ring.

**Intervyuda shunday ayting:** "Ma'lumot olishni komponent daraxti chuqurligiga bog'lasam, waterfall hosil bo'ladi. So'rovlarni yuqorida parallel boshlab, Promise'larni `use()` yoki Suspense orqali o'qiyman; router loader'lari yoki Server Component'lar ham shu tamoyil bilan ishlaydi."

**Esda tuting:** Suspense chegaralarini dizayn bo'yicha qo'ying — juda ko'p kichik "yuklanmoqda" ham yomon tajriba. Manba: [Suspense](https://react.dev/reference/react/Suspense).

## Q18. Keyingi sahifa uchun shrift va rasmlarni oldindan qanday yuklaysiz? / How do you preload fonts and images for the next view?

**Oddiy qilib aytganda:** foydalanuvchi keyingi sahifaga o'tishi aniq bo'lsa (masalan, "To'lov" tugmasiga sichqonchani olib kelganda), kerakli fayllarni **oldindan** yuklab qo'yish mumkin. React 19 `react-dom`da buning uchun `preload`, `preinit` va `prefetchDNS` funksiyalarini beradi.

**Yechim:**

```tsx
import { preload, preinit, prefetchDNS } from "react-dom";

function CheckoutLink() {
  return (
    <a
      href="/checkout"
      onMouseEnter={() => {
        prefetchDNS("https://pay.example.uz");
        preload("/fonts/Inter-Bold.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
        preinit("/checkout.css", { as: "style" });          // yuklab, darhol qo'llaydi
      }}
    >
      To'lovga o'tish
    </a>
  );
}
```

**Qanday tekshirasiz:** Network panelida resurslar hover paytida yuklanganini va keyingi sahifa tezroq ochilganini (LCP) o'lchang.

**Intervyuda shunday ayting:** "React 19 resurs yuklash API'lari bilan keyingi ko'rinish uchun shrift, stil va skriptlarni oldindan yuklayman; ular SSR'da ham to'g'ri teglarga aylanadi va dublikatlarni React o'zi boshqaradi. Faqat ehtimoli yuqori o'tishlar uchun qilaman — aks holda trafik behuda ketadi."

**Esda tuting:** hamma narsani preload qilish — hech narsani preload qilmaslikka teng: ustuvorlik yo'qoladi. Manba: [Resource Preloading APIs](https://react.dev/reference/react-dom#resource-preloading-apis).

## Q19. Tez yuklanadigan kontentda "yuklanmoqda" belgisi bir lahza miltillayapti — qanday oldini olasiz? / A loading fallback flickers briefly for fast loads — how do you prevent it?

**Oddiy qilib aytganda:** tab almashtirganda yangi kontent 100 ms da keladi, lekin shu vaqtda eski kontent yo'qolib, "yuklanmoqda…" bir lahza ko'rinadi — ko'z uchun yoqimsiz "miltillash". **`useTransition`** bilan React yangi kontent tayyor bo'lguncha **eski kontentni ko'rsatib turadi**.

**Yechim:**

```tsx
function Tabs() {
  const [tab, setTab] = useState("about");
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <nav style={{ opacity: isPending ? 0.7 : 1 }}>
        {["about", "posts", "contact"].map((name) => (
          <button key={name} onClick={() => startTransition(() => setTab(name))}>{name}</button>
        ))}
      </nav>
      <Suspense fallback={<Spinner />}>
        <TabContent tab={tab} />                    {/* transition paytida eski tab ko'rinib turadi */}
      </Suspense>
    </>
  );
}
```

**Qanday tekshirasiz:** tez va sekin tarmoqda tab almashtiring: tezda miltillash bo'lmasligi, sekinda esa `isPending` belgisi ko'rinishi kerak.

**Intervyuda shunday ayting:** "Allaqachon ko'rsatilgan kontent o'rniga Suspense fallback chiqmasligi uchun navigatsiyani transition'ga o'rayman — React yangi UI tayyor bo'lguncha eskisini saqlaydi, men esa `isPending` bilan yengil belgi beraman."

**Esda tuting:** birinchi marta yuklanishda (hali eski kontent yo'q) fallback baribir ko'rinadi — bu to'g'ri. Manba: [useTransition — preventing unwanted loading indicators](https://react.dev/reference/react/useTransition#preventing-unwanted-loading-indicators).

## Q20. Custom hook'ni komponentsiz qanday test qilasiz? / How do you test a custom hook without a component?

**Oddiy qilib aytganda:** hook'ni oddiy funksiya kabi chaqirib bo'lmaydi — u React komponenti ichida ishlashi kerak. Testing Library'ning `renderHook`i hook'ni kichik "sinov komponenti" ichida ishga tushiradi va natijasini beradi.

**Yechim:**

```tsx
import { renderHook, act } from "@testing-library/react";

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  return { count, increment: () => setCount((c) => c + 1) };
}

test("useCounter oshiradi", () => {
  const { result } = renderHook(() => useCounter(5));
  act(() => result.current.increment());
  expect(result.current.count).toBe(6);
});
```

**Qanday tekshirasiz:** hook'ning chekka holatlarini (boshlang'ich qiymat, ketma-ket chaqiruvlar, props o'zgarishi — `rerender`) alohida testlar bilan qamrang.

**Intervyuda shunday ayting:** "Custom hook'larni `renderHook` bilan test qilaman, yangilanishlarni `act` ichida bajaraman va `result.current` orqali natijani tekshiraman. Hook UI bilan chambarchas bog'liq bo'lsa, uni ishlatadigan komponentni test qilish afzalroq."

**Esda tuting:** `result.current` har render'dan keyin yangilanadi — qiymatni oldindan o'zgaruvchiga olib qo'ysangiz, eski bo'lib qoladi. Manba: [renderHook](https://testing-library.com/docs/react-testing-library/api/#renderhook).
