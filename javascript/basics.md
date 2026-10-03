# 💛 JavaScript yo'l xaritasi — nimani, qaysi tartibda o'rganish kerak

> **Bu sahifa nima uchun:** JavaScript bo'limida 700 dan ortiq savol bor. Ularni tasodifiy tartibda o'qish qiyin. Bu sahifa — **yo'l xaritasi**: qaysi mavzudan boshlash, keyin nimaga o'tish va har bosqichda qaysi faylni o'qish.
> **Qoida:** har bir mavzu faqat **bitta** faylda batafsil yozilgan — takrorlanish yo'q. Bu sahifada savol kartalari yo'q, faqat yo'nalish.

---

## Umumiy rasm: JavaScript dasturchisining bilim xaritasi

Oddiy qilib aytganda, veb-ilova uch qavatli uyga o'xshaydi:

1. **Poydevor — JavaScript tilining o'zi.** O'zgaruvchilar, funksiyalar, obyektlar, asinxronlik. Busiz yuqori qavatlar qulaydi.
2. **Orqa qism (backend) — Node.js.** Server: ma'lumotlar bazasi, foydalanuvchilar, API. Asboblar: Express (oddiy), NestJS (tartibli, katta loyihalar uchun).
3. **Old qism (frontend) — React.** Foydalanuvchi ko'radigan sahifa. Asboblar: Vite (tez yig'ish), Next.js (server bilan birga ishlaydigan React).

Va hammasini o'rab turuvchi **TypeScript** — xatolarni kod yozayotganda ushlaydigan "tekshiruvchi".

---

## 1-bosqich: Poydevor (2–4 hafta)

**Maqsad:** JavaScript kodini o'qib, u **qanday** ishlashini tushuntira olish.

| Mavzu | Nima uchun muhim | Qayerda o'qish |
|---|---|---|
| `let`/`const`, scope, hoisting | har bir intervyuning birinchi savollari | `basic_syntax.md` — Q2, Q93 |
| Closure | callback, React hook'lari shunga asoslanadi | `basic_syntax.md` — Q3 |
| `this`, `call/apply/bind` | eng ko'p xato qilinadigan joy | `basic_syntax.md` — Q4, Q27 |
| Prototip, class, meros | obyektlar qanday ishlashini tushunish | `basic_syntax.md` — Q7, Q46 |
| Promise, `async/await` | server so'rovlari, fayllar | `basic_syntax.md` — Q5, Q57 |
| Event loop | "nega bu kod shu tartibda chiqdi?" | `basic_syntax.md` — Q1, Q58 |
| Massiv metodlari (`map`, `reduce`...) | kundalik ish | `basic_syntax.md` — Q25, Q39 |

**O'zingizni tekshiring:** `javascript/quiz.md` dagi testlarni yeching.

---

## 2-bosqich: Algoritmlar (butun o'qish davomida, haftasiga 3–5 masala)

**Maqsad:** texnik intervyudagi "masala yeching" bosqichidan o'tish.

- `leetcode_codewars.md` — klassik masalalar: har biri oddiy tushuntirish, qadam-ba-qadam g'oya va tekshirilgan yechim bilan.
- Tavsiya: avval **o'zingiz** 20–30 daqiqa urinib ko'ring, keyin javobni oching.

---

## 3-bosqich: Backend — Node.js, Express, NestJS (3–5 hafta)

**Maqsad:** API yozish va uning ichida nima bo'layotganini tushuntirish.

| Qadam | Fayl | Nima bor |
|---|---|---|
| 1. Asoslar | `backend_node.md` | Node.js qanday ishlaydi, middleware, DI — 10 ta asosiy savol, eng oddiy tilda |
| 2. Node.js ichidan | `nodejs_chuqur.md` | event loop fazalari, stream'lar, xotira, xavfsizlik, Node 24–26 yangiliklari |
| 3. Express 5 | `express_chuqur.md` | Express 5 o'zgarishlari, xatolarni ushlash, production sozlamalari |
| 4. NestJS | `nestjs_chuqur.md` | DI, so'rov hayot sikli, NestJS 11–12 yangiliklari |
| 5. Amaliyot | `../practical/nestjs.md` | real hayotiy ssenariylar |

---

## 4-bosqich: Frontend — React, Vite, Next.js (3–5 hafta)

**Maqsad:** React ilova qura olish va uning muammolarini hal qilish.

| Qadam | Fayl | Nima bor |
|---|---|---|
| 1. React, Next.js, Vite | `frontend_react_next.md` | 100 ta savol: asoslardan real production muammolarigacha (React 19, Next.js 16, Vite 8) |
| 2. Amaliyot | `../practical/react.md`, `../practical/nextjs.md`, `../practical/vite.md` | ssenariyli masalalar |

---

## 5-bosqich: TypeScript va zamonaviy JavaScript (2 hafta)

| Fayl | Nima bor |
|---|---|
| `typescript_chuqur.md` | tip tizimi, `satisfies`, generic'lar, TypeScript 6 va 7 |
| `js_chuqur.md` | ES2025–ES2027 yangiliklari: iterator helper'lar, `Set` metodlari, Temporal |

---

## 6-bosqich: Tizim darajasida o'ylash

Senior intervyularda kod emas, **arxitektura** so'raladi: "bu tizim million foydalanuvchiga qanday xizmat qiladi?"

- `../system_design/arxitektura_infra_scaling.md` — scaling, kesh, CDN, deploy, observability.
- `../system_design.md` — mikroservislar, xabar navbatlari, ma'lumotlar bazalari.

---

## Har kuni qanday mashq qilish kerak

1. **Takrorlash** bo'limida 10–15 ta savolni oching.
2. Javobni ochishdan **oldin** ovoz chiqarib javob bering (intervyudagidek).
3. Javobni oching, solishtiring va o'zingizni **1 dan 10 gacha** baholang.
4. "Kuchsiz (≤ 5)" filtri bilan keyingi kuni aynan shu savollarni takrorlang.
5. Haftada bir marta "Intervyuda shunday ayting" qismlarini yodlamasdan, o'z so'zlaringiz bilan aytishni mashq qiling.
