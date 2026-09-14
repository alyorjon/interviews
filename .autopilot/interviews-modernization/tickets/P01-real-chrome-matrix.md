# P01 — Real Chrome barcha sahifa matritsasi

**Talablar:** R16, R17
**Zona:** real Chrome QA, `outputs/qa/`
**Status:** done

## Natija

Remote image’ning authsiz vaqtinchalik QA nusxasi SSH loopback orqali real Google Chrome’da ochiladi. Katalogdagi har sahifa desktop va mobile viewportda ko‘riladi; render, overflow, konsol/network, navigatsiya, answer reveal, score va dark/light holatlari tekshiriladi.

## Qabul mezonlari

- [x] API katalogidan olingan barcha 55 sahifa sluglari real Chrome’da ochilgan
- [x] Har sahifada sarlavha, 3 sahifa bali, Markdown va kutilgan card soni mavjud
- [x] Desktop va 360px mobil overflow o‘lchangan; yakuniy natija 0
- [x] Console error/warn yig‘ilgan; yakuniy natija 0
- [x] Eye reveal, 1–10 score va reload persistence, dark/light, qidiruv/filtr va mobil drawer interaktiv tekshirilgan
- [x] Har topilma uchun 5 variant 10 ballik jadvalda; 9.7/10 yechim tanlangan
- [x] Machine-readable JSON va inson o‘qiydigan Markdown audit artefakti mavjud

## Yakuniy dalil

- Google Chrome desktop `1440×1000`: 55/55 PASS, 2,339/2,339 karta.
- Google Chrome mobile `360×800`: 55/55 PASS, 2,339/2,339 karta, document overflow 0.
- Answer eye reveal: PASS. 1–10 baho va reload persistence: PASS. Theme: PASS.
- Review: 2,339 unique; Practical filter 160; Practical+advanced 6; `async servis` qidiruvi 1.
- Drawer: open/focus trap/Escape/focus restore PASS.
- Console: 0 error, 0 warning.
- Production: root 200, deep link 200, authsiz catalog 401, container healthy, auth bypass false.
