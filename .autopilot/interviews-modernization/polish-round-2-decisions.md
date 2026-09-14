# Sayqal 2-aylana — yechimlar matritsasi

## C04 — 360 px ekranda uzun sifat yorlig‘i 7 sahifada gorizontal overflow berdi

Real Chrome dalili: 55 sahifaning 7 tasida `7–56 px` hujjat overflow'i kuzatildi. DOM tekshiruvi sahifa sarlavhasidagi `ScoreBadge` ichida uzun `rivojlanmoqda` kabi yorliq 68 px badge chegarasidan chiqayotganini ko‘rsatdi. Badge'ning to‘liq ma'nosi `aria-label` va quyidagi batafsil sifat panelida saqlanadi.

| Variant | Foyda | Minus | Risk | Vaqt | Qaytarish | Bog‘liqlik | Dalil/tekshiruv | Ball |
|---|---|---|---|---|---|---|---|---:|
| 400 px gacha hero flex-item'ga `min-width: 0` berib, badge yorlig‘ini yashirish **(tanlandi)** | uzun sarlavha va uzun labelning ikkala root cause'i yopiladi; ball va aria-label saqlanadi | sarlavhada qisqa label ko‘rinmaydi | juda past | 8 daq | bitta CSS revert | yo‘q | 55/55 mobil Chrome, overflow 0 | 9.7 |
| Badge'ni sarlavha ostiga yangi qatorda chiqarish | barcha matn ko‘rinadi | hero balandlashadi, 55 sahifada ritm buziladi | past | 15 daq | oson | layout CSS | 360/390/760 vizual test | 8.8 |
| Badge kengligini kontentga mos qilish | label to‘liq ko‘rinadi | uzun sarlavha uchun joy yanada kamayadi | o‘rta | 10 daq | oson | flex sizing | overflow va wrapping testi | 7.4 |
| Label shriftini keskin kichraytirish | element tuzilishi o‘zgarmaydi | o‘qish va accessibility yomonlashadi | o‘rta | 5 daq | oson | tipografiya | vizual kontrast testi | 5.9 |
| Butun sahifaga `overflow-x: hidden` qo‘yish | simptom ko‘rinmaydi | boshqa haqiqiy overflowlarni yashiradi | yuqori | 2 daq | oson | global CSS | faqat scroll yo‘qolishi | 3.1 |
