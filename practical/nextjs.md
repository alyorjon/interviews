# Next.js amaliy intervyu ssenariylari

> **Nima bu:** "loyihada shunday muammo chiqdi — nima qilasiz?" turidagi Next.js savollari. Asosiy nazariya va ko'p tarqalgan muammolar (Server/Client Components, `server-only`, `await params`, streaming, `error.tsx`, rasm, shrift, CSP, standalone) `javascript/frontend_react_next.md` da — bu yerda **faqat boshqa, qo'shimcha** ssenariylar.
> **Har bir javob tartibi:** muammo oddiy tilda → sababi → yechim (kod bilan) → qanday tekshirasiz → intervyuda qanday aytasiz.
> **Versiya:** Next.js 16.3 (2026-yil sentabr). **Asosiy manba:** [Next.js docs](https://nextjs.org/docs/app).

---

# Ssenariylar

## Q1. Server Action ichidagi redirect() ishlamayapti va xato sifatida log'ga tushyapti — nega? / redirect() inside a Server Action doesn't work and shows up as an error — why?

**Oddiy qilib aytganda:** `redirect()` ichkarida maxsus **xato tashlaydi** (`NEXT_REDIRECT`) — Next.js shu "xato"ni ushlab, foydalanuvchini boshqa sahifaga yuboradi. Agar siz uni `try/catch` ichida chaqirsangiz, **sizning** `catch` blokingiz uni ushlab oladi va yo'naltirish yo'qoladi.

**Yechim:**

```tsx
"use server";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  let postId: string;
  try {
    postId = await db.post.create({ data: { title: String(formData.get("title")) } }).then((p) => p.id);
  } catch (error) {
    return { error: "Saqlab bo'lmadi" };            // faqat DB xatosi ushlanadi
  }
  redirect(`/posts/${postId}`);                    // ✅ try blokidan TASHQARIDA
}
```

**Qanday tekshirasiz:** forma yuborilgach, yangi sahifaga o'tilganini va log'da xato yo'qligini tekshiring.

**Intervyuda shunday ayting:** "`redirect` va `notFound` xato tashlash orqali ishlaydi, shuning uchun ularni `try` blokidan tashqarida chaqiraman. Agar umumiy `catch` qolishi kerak bo'lsa, Next.js ichki xatolarini `unstable_rethrow(error)` bilan qayta tashlayman."

**Esda tuting:** Server Action'da `redirect` JavaScript yoqilgan bo'lsa client navigatsiya, progressive enhancement formada esa `303` javob beradi. Manba: [redirect](https://nextjs.org/docs/app/api-reference/functions/redirect).

## Q2. Foydalanuvchiga xos dashboard keshlanib, boshqa foydalanuvchiga ko'rinishi mumkin — qanday oldini olasiz? / A per-user dashboard could be cached and shown to another user — how do you prevent it?

**Oddiy qilib aytganda:** kesh — "bir marta tayyorlab, hammaga berish". Agar Alining shaxsiy sahifasi keshlansa, Vali ham uni ko'rishi mumkin. Qoida: **foydalanuvchiga xos ma'lumot umumiy keshga tushmasligi** kerak, va "bu kimning ma'lumoti" tekshiruvi har safar ma'lumotga yaqin joyda qilinadi.

**Yechim:**

```tsx
// lib/dal.ts — Data Access Layer: har bir o'qishda sessiya tekshiriladi
import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";

export const verifySession = cache(async () => {
  const token = (await cookies()).get("session")?.value;   // cookies() — sahifani dinamik qiladi
  const session = token ? await decrypt(token) : null;
  if (!session) redirect("/login");
  return session;
});

export async function getMyOrders() {
  const { userId } = await verifySession();
  return db.order.findMany({ where: { userId } });          // ❌ "use cache" yo'q — shaxsiy ma'lumot
}
```

**Qanday tekshirasiz:** ikki xil foydalanuvchi bilan kirib, har biri faqat o'z ma'lumotini ko'rishini va javob sarlavhalarida umumiy kesh (`Cache-Control: public`) yo'qligini tekshiring.

**Intervyuda shunday ayting:** "Shaxsiy ma'lumotni umumiy keshga qo'ymayman: u `cookies()`ga bog'liq dinamik renderda olinadi. Avtorizatsiyani Data Access Layer'da — har bir ma'lumot o'qishda — `server-only` modulida qilaman; faqat proxy yoki layout'dagi tekshiruvga tayanmayman."

**Esda tuting:** CDN darajasida ham shaxsiy sahifalar keshlanmasligini tekshiring. Manba: [Authentication — Data Access Layer](https://nextjs.org/docs/app/guides/authentication).

## Q3. Ilova /portal manzilida ochiladi, lekin havolalar va fayllar domen ildiziga ketyapti — nima qilasiz? / The app is served under /portal but links and assets point to the root — what do you do?

**Oddiy qilib aytganda:** Next.js ilova domen ildizida turadi deb hisoblaydi. U `site.uz/portal` ostida ishlasa, `basePath` sozlamasi bilan buni aytasiz — Next.js barcha havola, `Link` va asset yo'llariga prefiks qo'shadi.

**Yechim:**

```typescript
// next.config.ts
const nextConfig = { basePath: "/portal" };
export default nextConfig;

// <Link href="/orders"> avtomatik "/portal/orders" bo'ladi.
// Oddiy <img src> va fetch yo'llarini esa o'zingiz prefiks bilan yozasiz.
```

**Qanday tekshirasiz:** reverse proxy orqasida production build'ni ochib, sahifalar, CSS, rasmlar va API chaqiruvlari 200 qaytarishini tekshiring.

**Intervyuda shunday ayting:** "Subpath deploy uchun `basePath`ni build vaqtida sozlayman — u `Link`, router va Next.js asset'lariga avtomatik qo'llanadi. Qo'lda yozilgan yo'llar va tashqi so'rovlarni alohida tekshiraman. `basePath` build vaqtida kodga yoziladi, shuning uchun o'zgarsa qayta build kerak."

**Esda tuting:** Vite'da bu opsiya `base` deb ataladi (frontend Q76). Manba: [basePath](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath).

## Q4. Faqat build'da yaratilgan blog postlaridan boshqasi so'ralganda nima bo'lishini qanday boshqarasiz? / How do you control what happens for blog slugs not generated at build time?

**Oddiy qilib aytganda:** `generateStaticParams` build paytida mavjud postlar sahifalarini oldindan yaratadi. Kimdir boshqa `slug` bilan kirsa, ikki variant bor: **so'rov paytida yaratish** (default) yoki **darhol 404**. `dynamicParams` shuni tanlaydi.

**Yechim:**

```tsx
// app/blog/[slug]/page.tsx
export const dynamicParams = false;                 // ro'yxatda yo'q slug → 404

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <article>{(await getPost(slug)).title}</article>;
}
```

**Qanday tekshirasiz:** build'dagi slug 200, mavjud bo'lmagan slug 404 qaytarishini tekshiring.

**Intervyuda shunday ayting:** "`generateStaticParams` build'da sahifalarni oldindan yaratadi. `dynamicParams = true` (default) noma'lum parametrlarni so'rov vaqtida render qiladi — yangi postlar uchun qulay; `false` esa ularni 404 ga yuboradi — to'plam yopiq bo'lsa, xavfsiz va arzon."

**Esda tuting:** yangi post qo'shilganda `dynamicParams = false` bo'lsa, u qayta build'gacha ko'rinmaydi. Manba: [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params).

## Q5. Server Action'ga katta fayl yuklashda "Body exceeded 1 MB limit" xatosi chiqyapti — nima qilasiz? / Uploading a file to a Server Action fails with "Body exceeded 1 MB limit" — what do you do?

**Oddiy qilib aytganda:** Next.js Server Action'ga yuboriladigan ma'lumotni default **1 MB** bilan cheklaydi — serverni katta so'rovlar bilan "bo'g'ib qo'yish"dan himoya. Limitni oshirish mumkin, lekin katta fayllar uchun to'g'ri yo'l — faylni **to'g'ridan-to'g'ri obyekt saqlovchiga** (S3) yuklash.

**Yechim:**

```javascript
// next.config.js — kichik rasmlar uchun limitni biroz oshirish
module.exports = {
  experimental: {
    serverActions: { bodySizeLimit: "4mb" },
  },
};

// Katta fayllar uchun: Server Action faqat vaqtinchalik "signed URL" beradi,
// brauzer faylni to'g'ridan-to'g'ri S3/R2 ga yuklaydi — Node serverdan o'tmaydi.
```

**Qanday tekshirasiz:** limitga yaqin va undan katta fayllar bilan test qiling; multipart overhead (chegara va sarlavhalar) uchun biroz zaxira qoldiring.

**Intervyuda shunday ayting:** "Server Action body limiti default 1 MB. Kichik yuklashlar uchun `experimental.serverActions.bodySizeLimit`ni oshiraman, katta fayllar uchun esa signed URL orqali to'g'ridan-to'g'ri obyekt saqlovchiga yuklash — server xotirasi va vaqti tejaladi."

**Esda tuting:** limit xom HTTP body'ga qo'llanadi — multipart qo'shimchalari ham hisoblanadi. Manba: [serverActions config](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions).

## Q6. Marketing sahifalari va ilova ichki sahifalari uchun turli layout kerak, lekin URL o'zgarmasligi kerak — qanday qilasiz? / Marketing pages and app pages need different layouts without changing URLs — how?

**Oddiy qilib aytganda:** papka nomini **qavsga** olsangiz — `(marketing)` — u URL'ga kirmaydi, lekin o'z `layout.tsx`iga ega bo'la oladi. Bu **route group**: fayllarni tartiblash va turli layout'lar uchun.

**Yechim:**

```text
app/
  (marketing)/
    layout.tsx        ← katta header, footer
    page.tsx          ← "/"
    pricing/page.tsx  ← "/pricing"
  (app)/
    layout.tsx        ← sidebar, auth tekshiruvi
    dashboard/page.tsx ← "/dashboard"
```

**Qanday tekshirasiz:** har ikki guruhdagi sahifalar kerakli layout bilan ochilishini va URL'larda qavs nomlari yo'qligini tekshiring.

**Intervyuda shunday ayting:** "Route group'lar `(nom)` URL'ga ta'sir qilmasdan marshrutlarni guruhlaydi va har guruhga alohida layout beradi. Bir nechta root layout ham shunday yaratiladi."

**Esda tuting:** ikki guruh bir xil URL'ni yaratsa (masalan, ikkalasida `about/page.tsx`), build xato beradi. Manba: [Route Groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups).

## Q7. loading.tsx butun sahifani "yuklanmoqda" bilan almashtiryapti, lekin faqat bir qismi sekin — nima qilasiz? / loading.tsx replaces the whole page while only one part is slow — what do you do?

**Oddiy qilib aytganda:** `loading.tsx` — butun segment uchun bitta katta "yuklanmoqda" ekrani. Agar sahifaning faqat bir bo'lagi sekin bo'lsa, u bo'lakni alohida `<Suspense>` bilan o'rang — qolgan qism darhol ko'rinadi.

**Yechim:**

```tsx
// app/dashboard/page.tsx — loading.tsx o'rniga (yoki qo'shimcha ravishda) nozik chegaralar
export default function Dashboard() {
  return (
    <>
      <Header />                                         {/* darhol */}
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />                                  {/* sekin — o'zi yuklanadi */}
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <RecentOrders />
      </Suspense>
    </>
  );
}
```

**Qanday tekshirasiz:** sekin so'rovni simulyatsiya qiling — sarlavha darhol, sekin qism keyin chiqishini ko'ring.

**Intervyuda shunday ayting:** "`loading.tsx` segment darajasida `Suspense` qo'yadi — navigatsiyada darhol javob uchun yaxshi. Lekin mustaqil sekin qismlarni alohida `Suspense` chegaralariga ajrataman, shunda tayyor kontent kutmaydi."

**Esda tuting:** har chegara uchun sahifa tuzilishiga mos skeleton bering — layout sakramasin. Manba: [loading.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading).

## Q8. Ko'p tilli sayt: foydalanuvchini o'z tiliga qanday yo'naltirasiz? / Multilingual site: how do you route users to their language?

**Oddiy qilib aytganda:** tilni URL'ning boshiga qo'yasiz: `/uz/about`, `/ru/about`. Foydalanuvchi `/about`ga kirsa, proxy uning brauzer tilini (`Accept-Language`) yoki saqlangan tanlovini ko'rib, kerakli tilga yo'naltiradi.

**Yechim:**

```typescript
// proxy.ts
import { NextResponse, type NextRequest } from "next/server";
const locales = ["uz", "ru", "en"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  const saved = request.cookies.get("locale")?.value;
  const preferred = request.headers.get("accept-language")?.split(",")[0]?.slice(0, 2);
  const locale = [saved, preferred].find((l) => l && locales.includes(l)) ?? "uz";
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
// Sahifalar: app/[locale]/about/page.tsx
```

**Qanday tekshirasiz:** turli `Accept-Language` sarlavhalari va cookie bilan so'rov yuborib, to'g'ri tilga yo'naltirishni tekshiring; qidiruv tizimlari uchun `hreflang` teglarini qo'shing.

**Intervyuda shunday ayting:** "Tilni `[locale]` dinamik segmentida saqlayman, proxy'da saqlangan tanlov yoki `Accept-Language` bo'yicha yo'naltiraman. Tarjimalarni Server Component'da yuklayman, shunda client bundle'ga faqat kerakli til ketadi."

**Esda tuting:** foydalanuvchining qo'lda tanlagan tilini brauzer tilidan ustun qo'ying. Manba: [Internationalization](https://nextjs.org/docs/app/guides/internationalization).

## Q9. CMS'dagi qoralamani nashr qilishdan oldin sayt ichida qanday ko'rsatasiz? / How do you preview unpublished CMS drafts inside the site?

**Oddiy qilib aytganda:** muharrir maqolani nashr qilishdan oldin uning saytda qanday ko'rinishini ko'rmoqchi. Lekin sahifalar statik keshlangan. **Draft mode** faqat shu muharrir uchun (maxsus cookie bilan) sahifani **so'rov vaqtida** va qoralama ma'lumot bilan ko'rsatadi.

**Yechim:**

```typescript
// app/api/draft/route.ts — CMS "Preview" tugmasi shu yerga olib keladi
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== process.env.DRAFT_SECRET) return new Response("Ruxsat yo'q", { status: 401 });
  (await draftMode()).enable();
  redirect(`/posts/${searchParams.get("slug")}`);
}

// Sahifada:
// const { isEnabled } = await draftMode();
// const post = await getPost(slug, { draft: isEnabled });
```

**Qanday tekshirasiz:** sirsiz so'rov 401, to'g'ri sir bilan qoralama ko'rinishi va oddiy foydalanuvchiga esa nashr qilingan versiya chiqishini tekshiring.

**Intervyuda shunday ayting:** "Draft mode maxsus cookie orqali faqat ruxsat etilgan foydalanuvchiga statik sahifani dinamik va qoralama ma'lumot bilan render qiladi. Kirish nuqtasini sir bilan himoya qilaman va slug'ni tekshiraman."

**Esda tuting:** yo'naltiriladigan slug'ni tekshiring — aks holda bu endpoint open redirect'ga aylanadi. Manba: [draftMode](https://nextjs.org/docs/app/api-reference/functions/draft-mode).

## Q10. Sitemap va robots.txt'ni qo'lda yozmasdan qanday yaratasiz? / How do you generate sitemap.xml and robots.txt without writing them by hand?

**Oddiy qilib aytganda:** qidiruv tizimlari saytingizdagi sahifalarni topishi uchun "xarita" (sitemap) va "qoidalar" (robots.txt) kerak. Next.js'da `app/sitemap.ts` va `app/robots.ts` fayllari ularni **koddan** — masalan, bazadagi postlar ro'yxatidan — avtomatik yaratadi.

**Yechim:**

```typescript
// app/sitemap.ts
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  return [
    { url: "https://shop.uz", changeFrequency: "daily", priority: 1 },
    ...posts.map((post) => ({ url: `https://shop.uz/blog/${post.slug}`, lastModified: post.updatedAt })),
  ];
}

// app/robots.ts
export function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }, sitemap: "https://shop.uz/sitemap.xml" };
}
```

**Qanday tekshirasiz:** `/sitemap.xml` va `/robots.txt` ni oching va Google Search Console'da tekshiring.

**Intervyuda shunday ayting:** "Next.js'ning `sitemap.ts` va `robots.ts` metadata fayllari bilan ularni ma'lumotlardan generatsiya qilaman. Juda ko'p URL bo'lsa, `generateSitemaps` bilan bir nechta sitemap'ga bo'laman (bittasida 50 000 gacha)."

**Esda tuting:** robots.txt maxfiylik vositasi emas — "yashirin" sahifalar baribir himoyalanishi kerak. Manba: [sitemap.xml](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

## Q11. Minglab havolali sahifada Link prefetch trafikni oshirib yubordi — nima qilasiz? / Link prefetching on a page with thousands of links wastes traffic — what do you do?

**Oddiy qilib aytganda:** `<Link>` ekranda ko'ringan havolalar sahifasini **oldindan yuklaydi** — o'tish bir zumda bo'lishi uchun. Lekin katalogda 1 000 ta havola bo'lsa, foydalanuvchi bormaydigan yuzlab sahifalar yuklanadi. Yechim: prefetch'ni **cheklash**.

**Yechim:**

```tsx
import Link from "next/link";

function ProductGrid({ products }: { products: Product[] }) {
  return products.map((p) => (
    <Link key={p.id} href={`/product/${p.id}`} prefetch={false}>   {/* faqat hover yoki bosishda */}
      {p.name}
    </Link>
  ));
}
```

**Qanday tekshirasiz:** Network panelida sahifa ochilganda prefetch so'rovlari sonini o'zgarishdan oldin va keyin solishtiring.

**Intervyuda shunday ayting:** "Next.js 16 prefetch'ni qisman (incremental) va layout'lar dedup bilan qiladi, viewport'dan chiqqanda bekor qiladi — lekin juda ko'p havolali ro'yxatlarda `prefetch={false}` bilan faqat asosiy o'tishlarni prefetch qilaman. Trade-off: kamroq trafik va biroz sekinroq o'tish."

**Esda tuting:** prefetch faqat production build'da ishlaydi — dev'da o'lchamang. Manba: [Link — prefetch](https://nextjs.org/docs/app/api-reference/components/link#prefetch).

## Q12. Route Handler uchun Edge yoki Node runtime'ni qanday tanlaysiz? / How do you choose between the Edge and Node.js runtime for a Route Handler?

**Oddiy qilib aytganda:** **Edge** — foydalanuvchiga yaqin, juda tez ishga tushadigan, lekin cheklangan muhit (Node API'lari, ko'p npm paketlari yo'q). **Node.js** — to'liq imkoniyatlar (DB drayverlari, `fs`, og'ir kutubxonalar). Ko'p hollarda Node to'g'ri tanlov; Edge — oddiy, tez, geografik yaqin javoblar uchun.

**Yechim:**

```typescript
// app/api/geo/route.ts — oddiy va tez: Edge
export const runtime = "edge";
export function GET(request: Request) {
  return Response.json({ country: request.headers.get("x-vercel-ip-country") ?? "unknown" });
}

// app/api/report/route.ts — DB va og'ir kutubxona: Node (default)
export const runtime = "nodejs";
```

**Qanday tekshirasiz:** Edge route'da ishlatilgan har bir paket Edge'da ishlashini build va haqiqiy deploy'da tekshiring.

**Intervyuda shunday ayting:** "Default Node.js runtime'ni ishlataman — to'liq API va ekotizim. Edge'ni faqat Web API bilan cheklanadigan, past kechikish muhim bo'lgan oddiy handler'lar uchun tanlayman. Next.js 16 da `proxy.ts` ham Node.js runtime'da ishlaydi."

**Esda tuting:** Edge funksiyasidan uzoqdagi DB'ga har so'rovda murojaat — tezlik foydasini yo'qotadi. Manba: [Edge and Node.js runtimes](https://nextjs.org/docs/app/api-reference/edge).

## Q13. Server Component'da cookie o'rnatmoqchi edim, xato chiqdi — nega? / Setting a cookie in a Server Component throws an error — why?

**Oddiy qilib aytganda:** Server Component sahifani **chizadi** — u paytda HTTP javobning sarlavhalari allaqachon yuborilgan bo'lishi mumkin (streaming). Cookie esa sarlavhada ketadi. Shuning uchun cookie'ni faqat **Server Action**, **Route Handler** yoki **proxy**da o'rnatish mumkin; Server Component uni faqat **o'qiydi**.

**Yechim:**

```tsx
// ✅ Server Action'da:
"use server";
import { cookies } from "next/headers";

export async function setTheme(theme: "light" | "dark") {
  (await cookies()).set("theme", theme, { httpOnly: false, sameSite: "lax", maxAge: 60 * 60 * 24 * 365 });
}

// Server Component'da faqat o'qish:
// const theme = (await cookies()).get("theme")?.value ?? "light";
```

**Qanday tekshirasiz:** action chaqirilgandan keyin javobda `Set-Cookie` sarlavhasi borligini va keyingi so'rovda cookie o'qilishini tekshiring.

**Intervyuda shunday ayting:** "Server Component render paytida cookie o'rnata olmaydi — sarlavhalar stream bilan allaqachon ketgan bo'lishi mumkin. Cookie'ni Server Action, Route Handler yoki proxy'da o'rnataman; komponentlarda faqat o'qiyman."

**Esda tuting:** sessiya cookie'lari uchun `httpOnly`, `secure` va `sameSite` ni qo'ying. Manba: [cookies](https://nextjs.org/docs/app/api-reference/functions/cookies).

## Q14. Mobil ilova Route Handler'ga murojaat qilganda CORS xatosi chiqyapti — qanday sozlaysiz? / A web client on another domain gets CORS errors calling a Route Handler — how do you configure it?

**Oddiy qilib aytganda:** brauzer boshqa domendagi saytga so'rov yuborishdan oldin "ruxsat bormi?" deb so'raydi (preflight — `OPTIONS` so'rovi). Server javobida **aniq ruxsat** sarlavhalari bo'lishi kerak. Faqat ishonchli domenlarga ruxsat bering.

**Yechim:**

```typescript
// app/api/products/route.ts
const allowed = new Set(["https://admin.shop.uz", "https://partner.example.com"]);

function corsHeaders(origin: string | null) {
  return origin && allowed.has(origin)
    ? { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "GET, POST", "Access-Control-Allow-Headers": "Content-Type, Authorization", Vary: "Origin" }
    : {};
}

export function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request.headers.get("origin")) });
}

export async function GET(request: Request) {
  return Response.json(await getProducts(), { headers: corsHeaders(request.headers.get("origin")) });
}
```

**Qanday tekshirasiz:** ruxsat etilgan va begona origin'lardan preflight va oddiy so'rov yuborib, sarlavhalarni tekshiring.

**Intervyuda shunday ayting:** "CORS — brauzer himoyasi; server aniq origin'larni ro'yxat bo'yicha qaytaradi, `Vary: Origin` qo'yadi va preflight uchun `OPTIONS`ni qo'llaydi. `*` va cookie'li so'rovlar birga ishlamaydi; mobil native ilova esa CORS'ga umuman bog'liq emas — u yerda autentifikatsiya muhim."

**Esda tuting:** CORS — xavfsizlik vositasi emas, serverni himoya qilmaydi; u faqat brauzerdagi boshqa saytlarni cheklaydi. Manba: [Route Handlers — CORS](https://nextjs.org/docs/app/api-reference/file-conventions/route#cors).

## Q15. Forma ikki marta yuborilganda ikki xil buyurtma yaratilyapti — qanday oldini olasiz? / A form submitted twice creates duplicate orders — how do you prevent it?

**Oddiy qilib aytganda:** foydalanuvchi tugmani ikki marta bosdi yoki internet uzilib, brauzer qayta yubordi — natijada ikkita buyurtma. Tugmani o'chirib qo'yish yordam beradi, lekin **yetarli emas**. Haqiqiy himoya — serverda: har bir buyurtmaga noyob kalit (idempotency key) berib, bazada shu kalit **faqat bir marta** yozilishini kafolatlash.

**Yechim:** Bir xil `idempotency_key` bilan Server Actionni parallel ikki marta chaqiradigan integration test yozing. `orders` jadvaliga `UNIQUE (idempotency_key)` constraint qo'ying; transaction ichida `INSERT ... ON CONFLICT (idempotency_key) DO NOTHING RETURNING id` bajaring. Qator qaytsa yangi orderni davom ettiring, qaytmasa shu key bo'yicha mavjud orderni o'qing.

```sql
ALTER TABLE orders ADD CONSTRAINT orders_idempotency_key UNIQUE (idempotency_key);

INSERT INTO orders (idempotency_key, user_id, total)
VALUES ($1, $2, $3)
ON CONFLICT (idempotency_key) DO NOTHING
RETURNING id;
-- qator qaytmasa: SELECT id FROM orders WHERE idempotency_key = $1;
```

```tsx
// Kalit forma ochilganda bir marta yaratiladi va yashirin maydonda yuboriladi:
<input type="hidden" name="idempotencyKey" value={useMemo(() => crypto.randomUUID(), [])} />
```

**Qanday tekshirasiz:** bir xil kalit bilan ikki parallel so'rov yuboradigan integration test — bazada faqat bitta buyurtma qolishi kerak.

**Intervyuda shunday ayting:** "UI'dagi pending tugmasi foydali bo'lsa-da, serverdagi atomik constraint retry va parallel so'rovni ham qoplaydi. Next.js hujjati form Server Actionni chaqirishini, PostgreSQL hujjati esa `ON CONFLICT` unique buzilishida alternativ amal va `RETURNING` semantikasini belgilaydi."

**Esda tuting:** "avval SELECT, keyin INSERT" — poyga holati: ikki so'rov bir vaqtda "yo'q" deb ko'rib, ikkalasi ham yozadi. Manba: [Next.js Server Actions](https://nextjs.org/docs/app/guides/server-actions), [PostgreSQL INSERT — ON CONFLICT](https://www.postgresql.org/docs/current/sql-insert.html).

## Q16. revalidatePath, updateTag va router.refresh — qaysi birini qachon ishlatasiz? / revalidatePath, updateTag or router.refresh — which one and when?

**Oddiy qilib aytganda:** ma'lumot o'zgargach, ekranni yangilashning uch yo'li bor:
- **`updateTag`** — "shu yorliqli barcha kesh eskirdi, men darhol yangisini ko'rishim kerak" (Server Action ichida);
- **`revalidatePath`** — "shu manzildagi sahifa keshi eskirdi";
- **`router.refresh()`** — "brauzerda joriy sahifani serverdan qayta so'ra" (keshni o'zgartirmaydi).

**Yechim:**

```tsx
"use server";
import { updateTag, revalidatePath } from "next/cache";

export async function renameProduct(id: string, name: string) {
  await db.product.update({ where: { id }, data: { name } });
  updateTag(`product-${id}`);        // mahsulot ko'rsatilgan barcha joylar, darhol
  revalidatePath("/admin/products"); // faqat shu yo'lga xos ro'yxat
}

// Client'da, keshga aloqasi yo'q dinamik ma'lumot uchun:
// const router = useRouter(); router.refresh();
```

**Qanday tekshirasiz:** o'zgarishdan keyin shu ma'lumotni ko'rsatadigan **barcha** sahifalarni (ro'yxat, tafsilot, bosh sahifa) tekshiring.

**Intervyuda shunday ayting:** "Resurs bir nechta sahifada ishlatilsa — teg bilan invalidatsiya: Next.js 16 da Server Action ichida `updateTag` read-your-writes beradi, `revalidateTag(tag, 'max')` esa fonda yangilaydi. `revalidatePath` — yo'lga xos ma'lumot uchun, `router.refresh` — keshni o'zgartirmasdan joriy sahifani qayta render qilish uchun."

**Esda tuting:** Next.js 16 da `revalidateTag`ning bitta argumentli shakli deprecated. Manba: [Caching and Revalidating](https://nextjs.org/docs/app/getting-started/caching-and-revalidating).

## Q17. Server Component'da uchta so'rov ketma-ket bajarilib sahifa sekin — qanday tezlashtirasiz? / Three sequential awaits in a Server Component make the page slow — how do you speed it up?

**Oddiy qilib aytganda:** `await getUser(); await getOrders(); await getStats();` — har biri oldingisi tugashini kutadi: 3 × 300 ms = 900 ms. Agar ular bir-biriga bog'liq bo'lmasa, **birdaniga** boshlang: ~300 ms.

**Yechim:**

```tsx
export default async function Dashboard() {
  // ❌ const user = await getUser(); const orders = await getOrders(); const stats = await getStats();
  const [user, orders, stats] = await Promise.all([getUser(), getOrders(), getStats()]); // ✅ parallel
  return <DashboardView user={user} orders={orders} stats={stats} />;
}
```

**Qanday tekshirasiz:** server log yoki trace'da so'rovlar vaqt jadvalini (waterfall) ko'ring — ular ustma-ust boshlanishi kerak.

**Intervyuda shunday ayting:** "Mustaqil so'rovlarni `Promise.all` bilan parallel boshlayman. Biri sekin va muhim bo'lmasa, uni alohida komponentga olib `Suspense` bilan stream qilaman. Bog'liq so'rovlarni esa ketma-ket qoldiraman."

**Esda tuting:** `Promise.all`da biri yiqilsa hammasi yiqiladi — ixtiyoriy ma'lumot uchun `allSettled` yoki alohida Suspense chegarasi. Manba: [Fetching Data — parallel](https://nextjs.org/docs/app/getting-started/fetching-data#parallel-data-fetching).

## Q18. Server Action'ni bot minglab marta chaqirib yuboryapti — qanday cheklaysiz? / A bot calls a Server Action thousands of times — how do you rate limit it?

**Oddiy qilib aytganda:** Server Action — internetdagi oddiy POST endpoint: uni sizning tugmangizsiz ham chaqirish mumkin. "Parolni tiklash" yoki "sharh qoldirish" action'lari suiiste'mol qilinishi mumkin. Har action ichida foydalanuvchi yoki IP bo'yicha **chastota cheklovi** qo'yasiz.

**Yechim:**

```tsx
"use server";
import { headers } from "next/headers";

export async function requestPasswordReset(formData: FormData) {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const allowed = await rateLimit(`reset:${ip}`, { limit: 5, windowSeconds: 3_600 });  // Redis asosida
  if (!allowed) return { error: "Juda ko'p urinish. Keyinroq qayta urinib ko'ring." };
  await sendResetEmail(String(formData.get("email")));
  return { ok: true };                                // email bor-yo'qligini oshkor qilmaymiz
}
```

**Qanday tekshirasiz:** limitdan ko'p so'rov yuborib, ortiqchalari rad etilishini va limit ko'p server nusxasida umumiy ekanini tekshiring.

**Intervyuda shunday ayting:** "Server Action ochiq endpoint, shuning uchun sezgir action'larga Redis kabi umumiy store asosidagi rate limit qo'yaman, bundan tashqari CDN yoki WAF darajasida ham cheklov bo'ladi. IP'ni ishonchli proxy sarlavhasidan olaman, javobda ma'lumot oshkor qilmayman."

**Esda tuting:** `x-forwarded-for`ni faqat ishonchli proxy ortida ishonish mumkin — aks holda uni soxtalashtirish oson. Manba: [Server Actions — security](https://nextjs.org/docs/app/guides/server-actions).

## Q19. Next.js 16 ga yangilangach custom webpack sozlamasi sabab build yiqilyapti — nima qilasiz? / After upgrading to Next.js 16 the build fails because of a custom webpack config — what do you do?

**Oddiy qilib aytganda:** Next.js 16 da default bundler — **Turbopack** (webpack emas). Sizning `webpack()` sozlamangiz Turbopack'da ishlamaydi. Ikki yo'l: vaqtincha webpack'da qolish (`--webpack` bayrog'i) yoki sozlamani Turbopack'ga ko'chirish.

**Yechim:**

```bash
# Vaqtincha: webpack bilan davom etish
next dev --webpack
next build --webpack
```

```typescript
// Ko'chirish: next.config.ts — turbopack sozlamalari endi yuqori darajada (experimental emas)
const nextConfig = {
  turbopack: {
    rules: { "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" } },   // loader'lar
    resolveAlias: { "@legacy": "./src/legacy" },
  },
};
export default nextConfig;
```

**Qanday tekshirasiz:** ikkala bundler bilan build natijalarini (sahifalar, bundle hajmi) solishtiring va CI'da vaqtni o'lchang.

**Intervyuda shunday ayting:** "Next.js 16 da Turbopack default: production build 2–5 barobar tezroq. Custom webpack konfiguratsiyasi bo'lsa, avval `--webpack` bilan yangilanishni tugataman, keyin loader va alias'larni `turbopack` sozlamasiga ko'chiraman; ko'chirib bo'lmaydigan plaginlarni alohida baholayman."

**Esda tuting:** Next.js 16 da `next lint` ham olib tashlangan — ESLint yoki Biome'ni to'g'ridan-to'g'ri ishga tushiring (`npx @next/codemod@canary next-lint-to-eslint-cli .`). Manba: [Next.js 16](https://nextjs.org/blog/next-16), [Upgrading to 16](https://nextjs.org/docs/app/guides/upgrading/version-16).

## Q20. Kontent kam o'zgaradi, lekin har so'rovda bazaga murojaat qilinyapti — "use cache" bilan qanday keshlaysiz? / Content rarely changes but every request hits the database — how do you cache it with "use cache"?

**Oddiy qilib aytganda:** Next.js 16 da keshlash **aniq tanlanadi**: hech narsa o'zicha keshlanmaydi. Hamma uchun bir xil, kam o'zgaradigan ma'lumot uchun funksiya yoki komponentga `"use cache"` yozasiz, `cacheLife` bilan "qancha vaqt yangi hisoblansin"ni, `cacheTag` bilan "qachon bekor qilinsin"ni belgilaysiz.

**Yechim:**

```typescript
// next.config.ts
const nextConfig = { cacheComponents: true };
export default nextConfig;

// lib/categories.ts
import { cacheLife, cacheTag } from "next/cache";

export async function getCategories() {
  "use cache";
  cacheLife("hours");                    // taxminan bir soat yangi
  cacheTag("categories");                // o'zgarganda: updateTag("categories")
  return db.category.findMany({ orderBy: { name: "asc" } });
}
```

**Qanday tekshirasiz:** bir necha so'rovda DB so'rovlar sonini (log yoki metrika) kuzating — kesh muddatida bitta bo'lishi kerak; teg invalidatsiyasidan keyin yangilanishini tekshiring.

**Intervyuda shunday ayting:** "Next.js 16 Cache Components modelida dinamik kod default holatda so'rov vaqtida ishlaydi, keshlashni `use cache` bilan aniq yoqaman. Muddatni `cacheLife`, invalidatsiyani `cacheTag` va mutation'dan keyin `updateTag` bilan boshqaraman. `cookies()` kabi shaxsiy ma'lumotni keshlangan funksiya ichida o'qimayman."

**Esda tuting:** `"use cache"` ichida `cookies()` yoki `headers()` chaqirish xato beradi — ularni tashqarida o'qib, argument sifatida bering (argumentlar kesh kalitining qismi bo'ladi). Manba: [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache).
