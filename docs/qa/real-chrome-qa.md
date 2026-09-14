# Interviews portal — real Google Chrome yakuniy QA

Sana: 2026-09-12  
Tekshirilgan build: `65072bc`  
Production: `https://interviews.4ontak.uz`

## Yakuniy natija

- Desktop `1440×1000`: **55/55 PASS**
- Mobile `360×800`: **55/55 PASS**
- Har ikki matritsada render qilingan kartalar: **2,339/2,339**
- Har sahifada: sarlavha, Markdown, 3 ta 10 ballik ekspert bahosi, back navigatsiya va kutilgan karta soni mavjud
- Yakuniy document overflow: **0 px**
- Chrome console: **0 error, 0 warning**
- Eye reveal: PASS
- 1–10 confidence tanlash va reload’dan keyin saqlanish: PASS
- Light/dark theme: PASS
- Review qidiruvi: PASS
- `Practical` filtri: **160 karta**; `Practical + advanced`: **6 karta**
- Mobil drawer: ochish, focus trap, `Escape`, fokusni menu tugmasiga qaytarish — PASS
- Production: root 200, deep link 200, authsiz `/api/catalog` 401, Docker healthy, `AUTH_BYPASS=false`

## Sahifalar matritsasi

| # | Slug | Karta | Desktop | Mobile |
|---:|---|---:|:---:|:---:|
| 1 | ai-engineering-basics | 100 | PASS | PASS |
| 2 | business-analyst-skills | 0 | PASS | PASS |
| 3 | data-analitik-01-excel-basics | 0 | PASS | PASS |
| 4 | data-analitik-02-spreadsheet-basics | 104 | PASS | PASS |
| 5 | data-analitik-03-data-analyst-masterclass | 100 | PASS | PASS |
| 6 | data-analitik-04-interview-challenges | 9 | PASS | PASS |
| 7 | data-analitik-05-data-analyst-2026-interviews | 100 | PASS | PASS |
| 8 | data-analitik-06-uzbekiston-2026-real-interviews | 90 | PASS | PASS |
| 9 | data-analitik-07-youtube-qna | 129 | PASS | PASS |
| 10 | data-analitik-08-macros-guide | 1 | PASS | PASS |
| 11 | data-analitik-09-macros-quiz | 0 | PASS | PASS |
| 12 | data-analitik-10-excel-quiz | 30 | PASS | PASS |
| 13 | data-analitik-11-spreadsheet-quiz | 30 | PASS | PASS |
| 14 | docker-basics | 55 | PASS | PASS |
| 15 | docker-quiz | 30 | PASS | PASS |
| 16 | dsa | 76 | PASS | PASS |
| 17 | github-basics | 64 | PASS | PASS |
| 18 | github-quiz | 30 | PASS | PASS |
| 19 | javascript-backend-node | 100 | PASS | PASS |
| 20 | javascript-basic-syntax | 100 | PASS | PASS |
| 21 | javascript-basics | 1 | PASS | PASS |
| 22 | javascript-frontend-react-next | 100 | PASS | PASS |
| 23 | javascript-leetcode-codewars | 21 | PASS | PASS |
| 24 | javascript-quiz | 30 | PASS | PASS |
| 25 | mind-basics | 49 | PASS | PASS |
| 26 | mind-quiz | 30 | PASS | PASS |
| 27 | odoo-basics | 115 | PASS | PASS |
| 28 | odoo-developer | 100 | PASS | PASS |
| 29 | odoo-functional-admin | 100 | PASS | PASS |
| 30 | odoo-quiz | 30 | PASS | PASS |
| 31 | practical-fastapi | 20 | PASS | PASS |
| 32 | practical-javascript | 20 | PASS | PASS |
| 33 | practical-nestjs | 20 | PASS | PASS |
| 34 | practical-nextjs | 20 | PASS | PASS |
| 35 | practical-postgresql | 20 | PASS | PASS |
| 36 | practical-python | 20 | PASS | PASS |
| 37 | practical-react | 20 | PASS | PASS |
| 38 | practical-vite | 20 | PASS | PASS |
| 39 | python-basics | 15 | PASS | PASS |
| 40 | python-fastapi-youtube-qna | 0 | PASS | PASS |
| 41 | python-oop | 95 | PASS | PASS |
| 42 | python-quiz | 30 | PASS | PASS |
| 43 | python-restfullapi | 98 | PASS | PASS |
| 44 | python-youtube-qna | 0 | PASS | PASS |
| 45 | resume-maslahatlari | 1 | PASS | PASS |
| 46 | sap-basics | 1 | PASS | PASS |
| 47 | sap-quiz | 30 | PASS | PASS |
| 48 | sap-youtube-qna | 0 | PASS | PASS |
| 49 | sql-basics | 11 | PASS | PASS |
| 50 | sql-postgresql-interviews | 0 | PASS | PASS |
| 51 | sql-practice-problems | 14 | PASS | PASS |
| 52 | sql-quiz | 30 | PASS | PASS |
| 53 | sql-youtube-qna | 0 | PASS | PASS |
| 54 | system-design-quiz | 30 | PASS | PASS |
| 55 | system-design | 100 | PASS | PASS |

## Topilmalar va tanlangan yechimlar

Har bir con uchun 5 ta variant foyda, minus, risk, vaqt, qaytarish, bog‘liqlik va tekshiruv dalili bilan solishtirildi.

| Con | Tanlangan yechim | Ball | Natija |
|---|---|---:|---|
| 90 ta frontend shablon-klon | React/Next/Vite bo‘yicha 90 ta real amaliy ssenariyga qayta yozish | 9.6/10 | unique va source-grounded |
| Python OOP kontekst aralashuvi | structural lineage + lexical relevance gate | 9.5/10 | contamination 0 |
| `.Md` va acronym casing | markaziy semantic topic map | 9.4/10 | 15 professional label |
| 360 px’da uzun hero title/score overflow | flex item `min-width: 0` + kichik ekranda ortiqcha labelni yashirish | 9.7/10 | 55/55 mobile, overflow 0 |

### Har bir con uchun 5 yechim

| Con | Yechim 1 | Yechim 2 | Yechim 3 | Yechim 4 | Yechim 5 |
|---|---|---|---|---|---|
| Frontend klonlari | To‘liq 90 amaliy rewrite — **9.6, tanlandi** | Olib tashlash — 8.1 | Bitta canonical kartaga birlashtirish — 7.6 | UI’da yashirish — 6.4 | Faqat warning — 3.5 |
| OOP kontekst aralashuvi | Structural lineage + lexical relevance — **9.5, tanlandi** | Qo‘lda tahrir — 7.0 | Barcha contextni o‘chirish — 8.0 | Regex blacklist — 6.8 | Expanded qismini yashirish — 4.2 |
| Topic label/casing | Semantic label map — **9.4, tanlandi** | Universal acronym algoritmi — 8.7 | Frontmatter displayTopic — 8.3 | Papka/fayl rename — 5.4 | CSS text-transform — 2.5 |
| 360 px overflow | `min-width:0` + label hide — **9.7, tanlandi** | Badge’ni yangi qatorga tushirish — 8.8 | Badge’ni kontentga kengaytirish — 7.4 | Shriftni keskin kichraytirish — 5.9 | Global overflow hidden — 3.1 |

Har variant foyda, minus, risk, vaqt, qaytarish, bog‘liqlik va tekshiruv dalili bo‘yicha baholandi. Batafsil matritsalar loyiha ichidagi `.autopilot/interviews-modernization/polish-round-1-decisions.md` va `polish-round-2-decisions.md` fayllarida.

## Kontent boyitilishi

- Python, JavaScript, React, Next.js, NestJS, FastAPI, Vite, PostgreSQL: **8 × 20 = 160** yangi amaliy karta.
- Frontenddagi 90 klon savol: 30 React + 30 Next.js + 30 Vite real ssenariyga aylantirildi.
- Jami amaliy yaxshilanish: **250 karta**.
- Audit: 2,419 extracted, 2,339 canonical, 80 exact duplicate birlashtirilgan, yangi P02/P03A near duplicate 0, `needsSource=0`.

## Chegara

Chrome QA uchun production auth’ga tegmagan, token ishlatmaydigan izolyatsiyalangan vaqtinchalik QA container va test initData qo‘llandi. Real Telegram qurilmada `/start` → inline Web App tugmasini bosish foydalanuvchi ko‘radigan yakuniy acceptance sifatida qoladi.
