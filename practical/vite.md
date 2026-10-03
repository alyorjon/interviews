# Vite amaliy intervyu ssenariylari

> **Nima bu:** "loyihada shunday muammo chiqdi — nima qilasiz?" turidagi Vite savollari. Vite asoslari va ko'p tarqalgan muammolar (`VITE_` siri, `--mode`, `base`, dev proxy, HMR store, `import.meta.glob`, worker URL, SSR'da `window`, React'ning ikki nusxasi, `codeSplitting`) `javascript/frontend_react_next.md` (Q71–Q100) da. Eski chunk 404 muammosi — `practical/javascript.md` Q9 da. Bu yerda **faqat boshqa** ssenariylar, takrorlanish yo'q.
> **Har bir javob tartibi:** muammo oddiy tilda → yechim (kod bilan) → qanday tekshirasiz → intervyuda qanday aytasiz → esda tuting.
> **Versiya:** Vite 8 (2026-yil sentabr) — production build **Rolldown**, kod tarjimasi **Oxc**. **Asosiy manba:** [vite.dev](https://vite.dev/guide/).

---

# Ssenariylar

## Q1. Sahifa ichidagi manzilni (/profile/42) yangilaganda server 404 beryapti — nima qilasiz? / Refreshing a nested route like /profile/42 returns 404 from the server — what do you do?

**Oddiy qilib aytganda:** SPA'da (bitta sahifali ilova) haqiqiy fayl faqat bitta — `index.html`. `/profile/42` degan **fayl yo'q**; bu manzilni brauzerdagi router "o'ylab topadi". Ilova ichida bosib o'tsangiz ishlaydi, lekin **F5** bossangiz brauzer serverdan `/profile/42` faylini so'raydi — server topolmaydi va 404 qaytaradi. Yechim: serverga "topolmagan sahifa manzillari uchun `index.html` ni ber" deb aytish.

**Yechim (nginx):**

```nginx
location /assets/ {
  try_files $uri =404;                 # yo'q JS/CSS fayl — halol 404, HTML emas
}
location / {
  try_files $uri $uri/ /index.html;    # qolgan hamma sahifa manzili → SPA
}
```

**Qanday tekshirasiz:** `vite build`, keyin serverda `/profile/42` ni to'g'ridan-to'g'ri oching va F5 bosing — sahifa ochilishi kerak. `/assets/yoq.js` esa 404 qaytarishi kerak, HTML emas.

**Intervyuda shunday ayting:** "Client-side routing'da server noma'lum sahifa yo'llari uchun `index.html` qaytarishi kerak. Lekin asset va API yo'llarini bu fallback'dan chiqarib qo'yaman — aks holda yo'q JS fayl o'rniga HTML keladi va 'Unexpected token <' kabi chalkash xato chiqadi."

**Esda tuting:** hosting sozlab bo'lmasa (masalan, oddiy statik hosting) — hash router (`/#/profile/42`) ham ishlaydi, chunki `#` dan keyingi qism serverga umuman yuborilmaydi. Manba: [Deploying a Static Site](https://vite.dev/guide/static-deploy).

## Q2. Yangi versiya chiqdi, lekin foydalanuvchilar eski dizaynni ko'ryapti — keshni qanday to'g'ri sozlaysiz? / A new release is out but users still see the old UI — how do you set caching correctly?

**Oddiy qilib aytganda:** Vite build'dagi JS/CSS fayllar nomiga **hash** qo'shadi: `index-a1b2c3.js`. Fayl ichi o'zgarsa — nomi ham o'zgaradi. Demak bunday fayllarni brauzer **abadiy** keshlasa bo'ladi. Lekin `index.html` ning nomi hech qachon o'zgarmaydi — u keshda qolsa, brauzer yangi fayllar borligini bilmaydi. Qoida: **hash'li fayllar — uzoq kesh, `index.html` — keshlamaslik (yoki har safar tekshirish).**

**Yechim (nginx):**

```nginx
location /assets/ {
  add_header Cache-Control "public, max-age=31536000, immutable";   # 1 yil
}
location = /index.html {
  add_header Cache-Control "no-cache";      # har safar serverdan "o'zgardimi?" deb so'raydi
}
```

**Qanday tekshirasiz:** DevTools → Network: `index.html` javobida `no-cache`, `assets/*.js` da `immutable` bo'lsin. Deploy qiling va sahifani oddiy yangilang — yangi hash'li fayl nomlari kelishi kerak.

**Intervyuda shunday ayting:** "Hash'li asset'larni `immutable` bilan bir yilga keshlayman, `index.html` ni esa `no-cache` bilan — u kichik, lekin qaysi asset'lar joriy ekanini aynan u aytadi. Shunda deploy darhol ko'rinadi va trafik ham tejaladi."

**Esda tuting:** `public/` papkadagi fayllar hash olmaydi — ularga `immutable` qo'ymang. Manba: [Load Error Handling](https://vite.dev/guide/build#load-error-handling), [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control).

## Q3. vite.config.ts ichida .env dagi PORT qiymati undefined bo'lyapti — nega? / Inside vite.config.ts the PORT value from .env is undefined — why?

**Oddiy qilib aytganda:** `.env` fayllarni Vite **config fayl bajarilib bo'lgandan keyin** o'qiydi — chunki qaysi `.env.[mode]` faylini o'qishni config'dan (masalan, `envDir`) biladi. Shuning uchun config ichida `process.env.APP_PORT` bo'sh. Yechim: config ichida `loadEnv()` bilan o'zingiz o'qing.

**Yechim:**

```typescript
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // 3-parametr '' — VITE_ prefiksisiz o'zgaruvchilarni ham o'qiydi (faqat config uchun!)
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: { port: env.APP_PORT ? Number(env.APP_PORT) : 5173 },
  };
});
```

**Qanday tekshirasiz:** `.env` ga `APP_PORT=4000` yozing, `vite` ni ishga tushiring — server 4000 portda ochilishi kerak. `vite --mode staging` bilan `.env.staging` qiymati olinishini ham tekshiring.

**Intervyuda shunday ayting:** "Config `.env` o'qilishidan oldin bajariladi, shuning uchun config ichida `loadEnv(mode, cwd, '')` ishlataman. Prefiks bo'lmagan o'zgaruvchilar faqat config'da qoladi — ularni `define` orqali klientga chiqarsam, sirni bundle'ga qo'yib yuborgan bo'laman."

**Esda tuting:** `loadEnv` bilan o'qilgan sir (masalan, `DB_PASSWORD`) klient kodiga faqat siz o'zingiz `define` qilsangiz tushadi — buni qilmang. Manba: [Using Environment Variables in Config](https://vite.dev/config/#using-environment-variables-in-config).

## Q4. index.html sarlavhasini (title) muhitga qarab o'zgartirish kerak — JS'siz qanday qilasiz? / The page title in index.html must differ per environment — how without JavaScript?

**Oddiy qilib aytganda:** Vite `index.html` ichidagi `%NOM%` ko'rinishidagi joylarni `import.meta.env` dagi qiymat bilan **almashtiradi**. Ya'ni `.env.staging` da `VITE_APP_TITLE=Test portal` bo'lsa, HTML'da `%VITE_APP_TITLE%` o'rniga shu matn yoziladi — JS yuklanmasdan oldin.

**Yechim:**

```html
<!-- index.html -->
<title>%VITE_APP_TITLE%</title>
<meta name="robots" content="%VITE_ROBOTS%" />
```

```bash
# .env.staging
VITE_APP_TITLE=Portal (staging)
VITE_ROBOTS=noindex
```

**Qanday tekshirasiz:** `vite build --mode staging` va `dist/index.html` ni oching — `%...%` qolmagan, o'rnida haqiqiy qiymat bo'lishi kerak.

**Intervyuda shunday ayting:** "HTML'dagi `%VITE_...%` ni Vite build vaqtida almashtiradi. Muhim farq: agar o'zgaruvchi yo'q bo'lsa, u **almashtirilmaydi** va HTML'da `%VITE_X%` bo'lib qoladi — JS'dagi `import.meta.env.X` esa `undefined` bo'ladi. Shuning uchun build'dan keyin `%` qolmaganini CI'da tekshiraman."

**Esda tuting:** bu ham public qiymat — HTML'ga sir yozmang. Manba: [HTML Constant Replacement](https://vite.dev/guide/env-and-mode#html-constant-replacement).

## Q5. import.meta.env.VITE_API_URl yozilgan (harf xato) va production'da undefined chiqdi — buni oldindan qanday ushlaysiz? / A typo like VITE_API_URl gave undefined in production — how do you catch it earlier?

**Oddiy qilib aytganda:** TypeScript `import.meta.env` ichida qaysi o'zgaruvchilar borligini o'zi **bilmaydi**, shuning uchun har qanday nomni "mayli" deb o'tkazib yuboradi. Unga ro'yxatni berib qo'ysangiz — noto'g'ri nomni darhol **qizil** qilib ko'rsatadi.

**Yechim:**

```typescript
// src/vite-env.d.ts  — bu faylda import bo'lmasin!
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SENTRY_DSN?: string;   // ixtiyoriy
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

```typescript
// Ishga tushishda majburiy qiymatni tekshirish
const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) throw new Error("VITE_API_URL berilmagan");
```

**Qanday tekshirasiz:** `import.meta.env.VITE_API_URl` deb yozing — `tsc --noEmit` xato berishi kerak. `VITE_API_URL` siz build qilsangiz, ilova aniq xabar bilan to'xtashi kerak.

**Intervyuda shunday ayting:** "`ImportMetaEnv` interfeysida env nomlarini e'lon qilaman — harf xatosi compile vaqtida chiqadi. Ammo tip faqat nomni tekshiradi, qiymat borligini emas, shuning uchun ishga tushishda majburiy qiymatlarni ham tekshiraman."

**Esda tuting:** `vite-env.d.ts` ichida `import` yozsangiz, fayl modulga aylanadi va interfeys kengaytmasi ishlamay qoladi. Manba: [IntelliSense for TypeScript](https://vite.dev/guide/env-and-mode#intellisense-for-typescript).

## Q6. Vite dev server Docker konteynerida ishlayapti, lekin brauzerdan ochilmayapti — nega? / The Vite dev server runs in Docker but the browser can't reach it — why?

**Oddiy qilib aytganda:** Vite standart holatda faqat `localhost` ni tinglaydi. Konteyner ichidagi `localhost` — bu **konteynerning o'zi**, sizning kompyuteringiz emas. Port ochilgan bo'lsa ham, tashqaridan kelgan so'rovni Vite qabul qilmaydi. Yechim: Vite barcha tarmoq interfeyslarini tinglasin.

**Yechim:**

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    host: true,         // 0.0.0.0 — konteyner tashqarisidan ham kirish mumkin
    port: 5173,
    strictPort: true,   // port band bo'lsa boshqasiga o'tib ketmasin (Docker mapping buzilmasin)
  },
});
```

```yaml
# docker-compose.yml
services:
  web:
    ports: ["127.0.0.1:5173:5173"]   # faqat o'z kompyuteringizdan
```

**Qanday tekshirasiz:** Vite chiqishida `Network: http://172.x.x.x:5173` qatori paydo bo'ladi; brauzerda `http://localhost:5173` ochiladi.

**Intervyuda shunday ayting:** "Konteyner ichida `localhost` — konteynerning o'zi, shuning uchun `server.host: true` beraman. Lekin host tomonda portni `127.0.0.1` ga bog'layman — dev server internetga yoki umumiy Wi‑Fi'ga ochilib qolmasin."

**Esda tuting:** `strictPort` bo'lmasa, 5173 band bo'lganda Vite jimgina 5174 ga o'tadi va Docker port mapping "ishlamay" qoladi. Manba: [server.host](https://vite.dev/config/server-options#server-host).

## Q7. HTTPS reverse proxy ortida sahifa ochiladi, lekin HMR ulanmayapti — nima qilasiz? / Behind an HTTPS reverse proxy the page loads but HMR won't connect — what do you do?

**Oddiy qilib aytganda:** HMR — bu brauzer va Vite o'rtasidagi **WebSocket** ulanish ("fayl o'zgardi, yangila" xabari shu orqali keladi). Brauzer sahifani `https://dev.example.com` (443-port) dan ochdi, lekin HMR skripti Vite'ning ichki portiga (5173) ulanishga urinadi — proxy bu portni tashqariga chiqarmagan. Yechim: brauzerga "WebSocket'ni 443-portdan, `wss` bilan och" deb aytish.

**Yechim:**

```typescript
export default defineConfig({
  server: {
    hmr: {
      protocol: "wss",   // sahifa https bo'lsa, WebSocket ham shifrlangan bo'lishi shart
      clientPort: 443,   // brauzer ulanadigan port — proxy'niki
    },
  },
});
```

```nginx
location / {
  proxy_pass http://127.0.0.1:5173;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;     # WebSocket'ga o'tishga ruxsat
  proxy_set_header Connection "upgrade";
}
```

**Qanday tekshirasiz:** DevTools → Network → WS: ulanish `101 Switching Protocols` bo'lishi kerak. Faylni saqlang — sahifa yangilanishi kerak.

**Intervyuda shunday ayting:** "HMR alohida WebSocket. Proxy ortida brauzer ulanadigan port ichki portdan farq qiladi, shuning uchun `server.hmr.clientPort` va `protocol` beraman, proxy'da esa `Upgrade` header'larini o'tkazaman."

**Esda tuting:** HMR ishlamasa ham sahifa ochiladi — shuning uchun bu xato ko'pincha "o'zgarishlarim ko'rinmayapti" deb tasvirlanadi. Manba: [server.hmr](https://vite.dev/config/server-options#server-hmr).

## Q8. Windows + WSL2/Docker'da faylni saqlasangiz, Vite o'zgarishni sezmayapti — nega? / On Windows with WSL2/Docker, saving a file doesn't trigger Vite — why?

**Oddiy qilib aytganda:** Vite fayl o'zgarishini operatsion tizimning "fayl o'zgardi" xabarlari orqali biladi. Fayl Windows tomonida o'zgarib, Vite esa WSL2/Linux konteynerida ishlasa, bu xabar **yetib kelmaydi**. Yechim: Vite fayllarni vaqti-vaqti bilan o'zi tekshirsin (polling).

**Yechim:**

```typescript
export default defineConfig({
  server: {
    watch: {
      usePolling: true,   // har safar fayllarni o'zi tekshiradi
      interval: 300,      // ms — kattaroq qiymat CPU'ni kamroq yeydi
    },
  },
});
```

**Qanday tekshirasiz:** faylni Windows muharririda saqlang — Vite terminalida `hmr update` yozuvi chiqishi kerak. CPU yuklanishiga ham qarang.

**Intervyuda shunday ayting:** "WSL2'da Windows tomonidagi o'zgarishlar Linux fayl kuzatuvchisiga yetib bormaydi. `usePolling` tez yechim, lekin CPU'ni ko'p yeydi. Eng yaxshisi — loyihani WSL fayl tizimi ichida saqlash va muharrirni ham shu yerda ishlatish; unda polling kerak emas."

**Esda tuting:** `usePolling` ni hamma uchun yoqib qo'ymang — macOS/Linux'da bu keraksiz CPU sarfi. Manba: [server.watch](https://vite.dev/config/server-options#server-watch).

## Q9. tsconfig'dagi "@/components" alias TypeScript'da ishlaydi, lekin Vite "fayl topilmadi" deyapti — nima qilasiz? / The "@/components" alias works in TypeScript but Vite says the module is not found — what do you do?

**Oddiy qilib aytganda:** `tsconfig.json` dagi `paths` — bu TypeScript uchun **faqat tekshiruv** sozlamasi; u kodni o'zgartirmaydi. Vite esa `@/` nimani anglatishini bilmaydi. Ikkalasiga bir xil qoidani aytish kerak.

**Yechim (Vite 8):**

```json
// tsconfig.json
{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }
```

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    tsconfigPaths: true,   // Vite tsconfig'dagi paths'ni o'zi o'qiydi
  },
});
```

**Qanday tekshirasiz:** `vite build` va `vitest run` ikkalasi ham `@/components/Button` ni topishi kerak (Vitest shu config'ni ishlatadi).

**Intervyuda shunday ayting:** "`paths` TypeScript'ga faqat qayerdan tip qidirishni aytadi; bundler buni alohida bilishi kerak. Vite 8 da `resolve.tsconfigPaths: true` bilan bitta manba — tsconfig — qoladi. Eski versiyalarda xuddi shu aliasni `resolve.alias` da takrorlash kerak edi."

**Esda tuting:** alias ikki joyda qo'lda yozilsa, vaqt o'tib ular farqlanib ketadi — bitta manba yaxshi. Manba: [resolve.tsconfigPaths](https://vite.dev/config/shared-options#resolve-tsconfigpaths).

## Q10. Vite 7 dan 8 ga o'tgach config "esbuild" va "rollupOptions" haqida ogohlantirish beryapti — nima qilasiz? / After upgrading from Vite 7 to 8 the config warns about "esbuild" and "rollupOptions" — what do you do?

**Oddiy qilib aytganda:** Vite 8 ichki "dvigatel"ni almashtirdi: build'ni endi **Rolldown** qiladi (Rollup o'rniga), kodni tarjima qilishni **Oxc** qiladi (esbuild o'rniga). Eski nomlar hozircha ishlaydi, lekin ular eskirgan — yangi nomlarga o'tish kerak.

**Yechim:**

```typescript
// ❌ Vite 7 uslubi
export default defineConfig({
  esbuild: { jsxInject: `import React from "react"` },
  build: { rollupOptions: { external: ["react"] } },
});

// ✅ Vite 8
export default defineConfig({
  oxc: { jsxInject: `import React from "react"` },
  build: { rolldownOptions: { external: ["react"] } },
});
```

**Qanday tekshirasiz:** `vite build` ogohlantirishsiz o'tishi, bundle hajmi va chunk'lar soni avvalgisiga yaqin bo'lishi kerak (katta farq bo'lsa — sababini qidiring). E2E testlarni build natijasida ishga tushiring.

**Intervyuda shunday ayting:** "Major versiyani alohida branch'da yangilayman: migration guide bo'yicha `rollupOptions` → `rolldownOptions`, `esbuild` → `oxc`, `manualChunks` → `codeSplitting`. Keyin bundle hajmini va e2e testlarni avvalgi versiya bilan solishtiraman. Default brauzer target ham ko'tarilgan — qo'llab-quvvatlash ro'yxatimizga mosligini tekshiraman."

**Esda tuting:** `manualChunks` ning obyekt ko'rinishi Vite 8 da umuman ishlamaydi — faqat ogohlantirish emas. Manba: [Migration from v7](https://vite.dev/guide/migration).

## Q11. Qat'iy CSP (unsafe-inline yo'q) yoqilgach, Vite qo'shgan style/script teglari bloklanyapti — nima qilasiz? / With a strict CSP (no unsafe-inline), tags injected by Vite get blocked — what do you do?

**Oddiy qilib aytganda:** CSP — brauzerga "faqat shu skriptlarga ishon" degan qoida. Xavfsiz usul: har bir javobga tasodifiy **nonce** (bir martalik kod) yaratish va ruxsat berilgan teglarga shu kodni yozish. Vite teglarga nonce qo'yishi uchun unga **joy egallovchi** (placeholder) matn berasiz, server esa har javobda uni haqiqiy tasodifiy qiymatga almashtiradi.

**Yechim:**

```typescript
// vite.config.ts
export default defineConfig({
  html: { cspNonce: "__CSP_NONCE__" },   // Vite script/style teglariga nonce="__CSP_NONCE__" qo'yadi
});
```

```typescript
// Server (Express) — har javobga yangi nonce
import { randomBytes } from "node:crypto";

app.get("*", (req, res) => {
  const nonce = randomBytes(16).toString("base64");
  res.setHeader("Content-Security-Policy", `script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'`);
  res.send(indexHtml.replaceAll("__CSP_NONCE__", nonce));
});
```

**Qanday tekshirasiz:** DevTools Console'da CSP xatolari bo'lmasligi, ikki marta yangilaganda nonce har safar **boshqacha** bo'lishi kerak.

**Intervyuda shunday ayting:** "`html.cspNonce` ga placeholder beraman, server esa har javobga yangi tasodifiy nonce qo'yadi. Nonce doimiy bo'lsa — u himoya emas, hujumchi uni bir marta ko'rib, o'z skriptiga yozadi."

**Esda tuting:** nonce'li HTML'ni CDN'da keshlab bo'lmaydi — hamma bir xil nonce oladi. `index.html` ni serverdan, `no-cache` bilan bering. Manba: [html.cspNonce](https://vite.dev/config/shared-options#html-cspnonce), [OWASP CSP](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html).

## Q12. Dev'da yangi sahifaga o'tganda "new dependencies optimized, reloading" chiqib, sahifa o'z-o'zidan yangilanyapti — nega? / In dev, visiting a new route prints "new dependencies optimized" and the page reloads itself — why?

**Oddiy qilib aytganda:** Vite dev server ishga tushganda `node_modules` dagi kutubxonalarni **oldindan tayyorlaydi** (pre-bundling). Buning uchun kodingizni skanerlab, qaysi kutubxonalar kerakligini topadi. Agar kutubxona faqat keyin, masalan, plagin orqali yoki ichki sahifada "ko'rinsa", Vite uni kech topadi, qayta tayyorlaydi va sahifani **qayta yuklaydi** — forma to'ldirayotgan bo'lsangiz, ma'lumot yo'qoladi.

**Yechim:**

```typescript
export default defineConfig({
  optimizeDeps: {
    include: ["date-fns/locale", "lodash-es"],  // kech topiladigan kutubxonalarni oldindan aytib qo'yish
  },
});
```

**Qanday tekshirasiz:** keshni tozalab ishga tushiring (`vite --force`), barcha sahifalarni aylanib chiqing — terminalda "new dependencies optimized" qayta chiqmasligi kerak.

**Intervyuda shunday ayting:** "Bu Vite'ning dependency pre-bundling'i: dastlabki skaner ko'rmagan import'ni keyin topsa, qayta tayyorlab sahifani yangilaydi. Qaysi paket ekanini terminal aytadi — uni `optimizeDeps.include` ga qo'shaman."

**Esda tuting:** kesh `node_modules/.vite` da turadi va lockfile yoki config o'zgarganda o'zi yangilanadi; `--force` faqat tekshirish uchun. Manba: [Dependency Pre-Bundling](https://vite.dev/guide/dep-pre-bundling).

## Q13. Shader (.glsl) yoki SQL faylni kodga matn sifatida olish kerak — fetch'siz qanday qilasiz? / You need a .glsl or .sql file as a string in code — how without fetch?

**Oddiy qilib aytganda:** import oxiriga `?raw` qo'shsangiz, Vite faylning ichidagi **matnni** oddiy string sifatida beradi. `?url` qo'shsangiz — faylning **manzilini** (hash'li) beradi. Ya'ni bitta faylni ikki xil olish mumkin.

**Yechim:**

```typescript
import fragmentShader from "./shaders/water.frag.glsl?raw";   // string — faylning ichi
import helpPdfUrl from "./docs/help.pdf?url";                   // "/assets/help-3f2a.pdf"

gl.shaderSource(shader, fragmentShader);
link.href = helpPdfUrl;
```

```typescript
// src/vite-env.d.ts ichidagi /// <reference types="vite/client" /> bu suffikslar uchun tiplarni beradi
```

**Qanday tekshirasiz:** `console.log(typeof fragmentShader)` → `"string"`; `helpPdfUrl` build'dan keyin hash'li nom bilan `dist/assets/` da bo'lishi kerak.

**Intervyuda shunday ayting:** "`?raw` fayl mazmunini string sifatida bundle'ga qo'shadi — kichik matnlar uchun qulay, alohida so'rov yo'q. Katta fayllar uchun esa `?url` ishlataman, aks holda ular JS hajmini keraksiz oshiradi."

**Esda tuting:** `?raw` bilan olingan matn JS ichiga kiradi — 2 MB lik faylni `?raw` qilish = 2 MB lik JS. Manba: [Static Asset Handling](https://vite.dev/guide/assets).

## Q14. Mac'da build ishlaydi, lekin Linux CI'da "Could not resolve ./Components/Button" xatosi — nega? / The build works on a Mac but fails on Linux CI with "Could not resolve ./Components/Button" — why?

**Oddiy qilib aytganda:** macOS va Windows fayl nomlarida katta-kichik harfni odatda **farqlamaydi**: `Button.tsx` va `button.tsx` — bir fayl. Linux esa **farqlaydi** — ular ikki xil fayl. Import'da `./Components/Button` yozilgan, papka esa aslida `components`. Mac'da ishlaydi, Linux'da — yo'q.

**Yechim:**

```typescript
// ❌ papka nomi aslida "components"
import { Button } from "./Components/Button";
// ✅ diskdagi nom bilan harfma-harf bir xil
import { Button } from "./components/Button";
```

```json
// tsconfig.json — harf farqini compile vaqtida ushlash
{ "compilerOptions": { "forceConsistentCasingInFileNames": true } }
```

```bash
# Papka nomini faqat harf kattaligiga o'zgartirganda git buni sezishi uchun:
git mv Components tmp && git mv tmp components
```

**Qanday tekshirasiz:** build'ni CI'dagi kabi Linux konteynerda ishga tushiring (`docker run --rm -v "$PWD":/app -w /app node:24 npm run build`).

**Intervyuda shunday ayting:** "Mac'da case-insensitive fayl tizimi xatoni yashiradi. Import'ni diskdagi nom bilan bir xil qilaman, TypeScript'da `forceConsistentCasingInFileNames` yoqaman va build'ni har doim Linux CI'da tekshiraman."

**Esda tuting:** git macOS'da faqat harf kattaligi o'zgargan nomni sezmasligi mumkin — shuning uchun ikki bosqichli `git mv`. Manba: [forceConsistentCasingInFileNames](https://www.typescriptlang.org/tsconfig/#forceConsistentCasingInFileNames).

## Q15. Dev server ishga tushishi va sahifa ochilishi sekinlashdi — aybdorni qanday topasiz? / The dev server and page loads got slow — how do you find the culprit?

**Oddiy qilib aytganda:** taxmin qilmang — **o'lchang**. Vite'da uchta asbob bor: (1) har plagin har faylga qancha vaqt sarflaganini ko'rsatuvchi debug rejimi, (2) CPU profili, (3) har plagin faylni qanday o'zgartirganini ko'rsatuvchi `vite-plugin-inspect`. Ko'p uchraydigan sabab — sekin plagin yoki **barrel fayllar** (`index.ts` hamma narsani qayta eksport qiladi).

**Yechim:**

```bash
vite --debug plugin-transform     # qaysi plagin qaysi faylda qancha ms sarfladi
vite --profile                    # sahifani oching, terminalda "p + Enter" → .cpuprofile
                                  # faylni https://www.speedscope.app da oching
```

```typescript
// ❌ barrel: bitta funksiya uchun utils/ ichidagi hamma fayl yuklanadi va tarjima qilinadi
import { slash } from "./utils";
// ✅ to'g'ridan-to'g'ri fayldan
import { slash } from "./utils/slash";
```

**Qanday tekshirasiz:** o'zgartirishdan oldin va keyin bir xil sahifaning ochilish vaqtini va Network'dagi so'rovlar sonini yozib qo'ying — raqamlar kamayishi kerak.

**Intervyuda shunday ayting:** "Avval o'lchayman: `--debug plugin-transform` sekin plaginni, `--profile` esa CPU qayerga ketganini ko'rsatadi. Keyin eng katta sababni tuzataman — ko'pincha bu barrel import yoki har faylni ishlayotgan plagin. Kerak bo'lsa `server.warmup` bilan tez-tez kerak bo'ladigan fayllarni oldindan tayyorlayman."

**Esda tuting:** import'da kengaytmani aniq yozish (`./Button.tsx`) ham Vite'ning fayl qidirishini qisqartiradi. Manba: [Performance](https://vite.dev/guide/performance).

## Q16. O'zingiz yozgan plagin har bir faylni o'qib tekshiryapti va hamma narsani sekinlashtiryapti — nima qilasiz? / Your own plugin inspects every file and slows everything down — what do you do?

**Oddiy qilib aytganda:** plagindagi `transform` funksiyasi loyihadagi **har bir** fayl uchun chaqiriladi — hatto sizga kerak bo'lmagan fayllar uchun ham. Vite 8 (Rolldown) da plaginga **filtr** berish mumkin: "faqat `.md` fayllar uchun chaqir". Shunda keraksiz fayllar uchun funksiya umuman ishga tushmaydi.

**Yechim:**

```typescript
import type { Plugin } from "vite";

export function markdownPlugin(): Plugin {
  const mdFile = /\.md$/;
  return {
    name: "markdown-to-html",
    transform: {
      filter: { id: mdFile },          // Rolldown/Vite bu shartni o'zi tekshiradi — tez
      handler(code, id) {
        if (!mdFile.test(id)) return null;   // filtrni qo'llamaydigan eski vositalar uchun himoya
        return { code: `export default ${JSON.stringify(render(code))}`, map: null };
      },
    },
  };
}
```

**Qanday tekshirasiz:** `vite --debug plugin-transform` — plagin endi faqat `.md` fayllar ro'yxatida chiqishi kerak.

**Intervyuda shunday ayting:** "Hook filtrlari bilan plaginni kerakli fayllargagina bog'layman. Rolldown Rust'da ishlaydi va filtr bo'lsa JS funksiyani chaqirmaydi — Rust va JS o'rtasidagi qimmat o'tish kamayadi. `handler` ichida ham tekshiruvni qoldiraman, filtrni bilmaydigan eski vositalar uchun."

**Esda tuting:** filtr Vite 6.3+ va Rollup 4.38+ da bor; undan eskisini qo'llab-quvvatlasangiz, ichki tekshiruv shart. Manba: [Hook Filters](https://vite.dev/guide/api-plugin#hook-filters).

## Q17. Siz chiqargan UI kutubxonani ishlatgan loyihada bundle ikki barobar kattalashdi — nega? / A project using your UI library got a bundle twice as big — why?

**Oddiy qilib aytganda:** kutubxonangiz build paytida `react` ni **o'z ichiga** qo'shib olgan. Uni ishlatgan loyihada esa o'zining `react`i ham bor — natijada ikki nusxa, katta bundle va hook xatolari. Yechim: kutubxona `react`ni ichiga olmasin — "bu tashqaridan keladi" (external) deb belgilansin va `peerDependencies` ga yozilsin.

**Yechim:**

```typescript
// vite.config.ts (kutubxona)
export default defineConfig({
  build: {
    lib: { entry: "src/index.ts", formats: ["es"], fileName: "ui-kit" },
    rolldownOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],   // ichiga qo'shilmaydi
    },
  },
});
```

```json
// package.json (kutubxona)
{
  "peerDependencies": { "react": "^19.0.0", "react-dom": "^19.0.0" },
  "devDependencies": { "react": "^19.2.0", "react-dom": "^19.2.0" }
}
```

**Qanday tekshirasiz:** `dist/ui-kit.js` ichida `useState` ta'rifi emas, `from "react"` import'i bo'lishi kerak. Kutubxona fayli hajmi keskin kichrayadi.

**Intervyuda shunday ayting:** "Kutubxona build'ida framework'ni external qilaman va `peerDependencies` ga yozaman — foydalanuvchi o'z versiyasini beradi, nusxa bitta bo'ladi. `react/jsx-runtime` ni unutmayman — u alohida import yo'li."

**Esda tuting:** faqat `react` ni external qilib, `react/jsx-runtime` ni unutish — eng ko'p uchraydigan xato. Manba: [Library Mode](https://vite.dev/guide/build#library-mode).

## Q18. public/ papkadagi logo o'zgardi, lekin foydalanuvchilarda eskisi ko'rinyapti — nega? / The logo in public/ changed but users still see the old one — why?

**Oddiy qilib aytganda:** Vite'da rasm qo'yishning ikki yo'li bor. **`src/` dan import** qilsangiz — Vite nomiga hash qo'shadi (`logo-8d3f.svg`), rasm o'zgarsa nomi ham o'zgaradi va kesh muammosi bo'lmaydi. **`public/` ga qo'ysangiz** — fayl nomi **o'zgarmaydi** (`/logo.svg`), shuning uchun brauzer keshlagan eski rasmni ko'rsataveradi.

**Yechim:**

```tsx
// ✅ ilova ichidagi rasmlar — src'dan import (hash oladi, yo'q bo'lsa build xato beradi)
import logoUrl from "./assets/logo.svg";
<img src={logoUrl} alt="Logo" />;

// public/ — faqat nomi aniq bo'lishi SHART bo'lgan fayllar uchun:
// public/robots.txt, public/favicon.ico  → /robots.txt, /favicon.ico
```

**Qanday tekshirasiz:** build'dan keyin `dist/assets/logo-<hash>.svg` bor; logoni o'zgartirib qayta build qilsangiz, hash ham o'zgarishi kerak.

**Intervyuda shunday ayting:** "`public/` — o'zgarmas nomli fayllar uchun: `robots.txt`, favicon. Ilova rasmlarini `src` dan import qilaman — hash avtomatik keshni yangilaydi va fayl yo'q bo'lsa build o'zi xato beradi."

**Esda tuting:** `public/` dagi faylga kodda doim `/` bilan boshlanadigan yo'l yoziladi va uni JS'dan import qilib bo'lmaydi. Manba: [The public Directory](https://vite.dev/guide/assets#the-public-directory).

## Q19. Django/Laravel/Express shabloni Vite build'dan keyin qaysi hash'li JS faylni ulashni bilmayapti — nima qilasiz? / A Django/Laravel/Express template doesn't know which hashed JS file to include after a Vite build — what do you do?

**Oddiy qilib aytganda:** HTML'ni Vite emas, backend yaratadi. Har build'da fayl nomi o'zgaradi (`main-a1b2.js` → `main-c3d4.js`), shablonga qo'lda yozib bo'lmaydi. Yechim: Vite build oxirida **manifest** — "asl fayl → hash'li fayl" jadvalini yozsin, backend esa shu jadvaldan o'qisin.

**Yechim:**

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    manifest: true,                               // dist/.vite/manifest.json yaratadi
    rolldownOptions: { input: "src/main.ts" },    // index.html emas, JS kirish nuqtasi
  },
});
```

```typescript
// Express server
import manifest from "./dist/.vite/manifest.json" with { type: "json" };

const entry = manifest["src/main.ts"];
const tags = [
  ...(entry.css ?? []).map((href) => `<link rel="stylesheet" href="/${href}">`),
  `<script type="module" src="/${entry.file}"></script>`,
].join("\n");
```

**Qanday tekshirasiz:** ikki marta turli kod bilan build qiling — shablon har safar yangi hash'li faylni ulashi va sahifa ishlashi kerak.

**Intervyuda shunday ayting:** "Backend HTML yaratadigan loyihada `build.manifest` yoqaman. Manifest kirish faylini hash'li nomga, uning CSS'iga va import qiladigan chunk'lariga bog'laydi — backend shu bo'yicha teglarni yozadi."

**Esda tuting:** CSS fayllar ham manifestdagi `css` maydonida — faqat JS'ni ulasangiz, sahifa uslubsiz chiqadi. Manba: [Backend Integration](https://vite.dev/guide/backend-integration).

## Q20. Jamoa production'da "vite preview" ni ishlatmoqchi — nima deysiz? / The team wants to run "vite preview" in production — what do you say?

**Oddiy qilib aytganda:** `vite preview` — build natijasini **o'z kompyuteringizda tekshirib ko'rish** uchun kichik server. U production uchun mo'ljallanmagan: siqish, keshlash sarlavhalari, xavfsizlik sarlavhalari, yuklama ostida barqarorlik — bular uning vazifasi emas. `dist/` papka — oddiy statik fayllar; ularni nginx, CDN yoki statik hosting beradi.

**Yechim:**

```bash
npm run build          # dist/ yaratiladi
npx vite preview       # ✅ faqat lokal tekshiruv: http://localhost:4173
```

```dockerfile
# ✅ Production: build — bir bosqich, berish — nginx
FROM node:24-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf   # SPA fallback va kesh qoidalari (Q1, Q2)
```

**Qanday tekshirasiz:** production javoblarida `Cache-Control`, siqish (`Content-Encoding: br/gzip`) va xavfsizlik sarlavhalari (CSP, HSTS) bo'lishi kerak.

**Intervyuda shunday ayting:** "`vite preview` — build'ni lokal tekshirish uchun; hujjatlarda ham production server emasligi aytilgan. Statik `dist/` ni nginx yoki CDN beradi: ular kesh, siqish, TLS va yuklamani yaxshi boshqaradi. Node image'ini production konteyneriga olib kirmayman — kichikroq va xavfsizroq."

**Esda tuting:** statik sayt uchun eng yaxshi "server" — ko'pincha CDN; server ishlatish shart emas. Manba: [Deploying a Static Site](https://vite.dev/guide/static-deploy).
