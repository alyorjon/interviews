# Sayqal 1-aylana — yechimlar matritsasi

## C01 — 90 ta frontend savoli shablon-klon

| Variant | Foyda | Minus | Risk | Vaqt | Qaytarish | Bog‘liqlik | Dalil/tekshiruv | Ball |
|---|---|---|---|---|---|---|---|---:|
| 90 savolni React/Next/Vite amaliy ssenariylari bilan to‘liq qayta yozish **(tanlandi)** | kontent saqlanadi va real intervyuga aylanadi | katta tahrir | fakt xatosi | 60–90 daq | Git revert oson | rasmiy docs | 90 unique, grounded, ≥8/10 | 9.6 |
| Q11–Q100 ni olib tashlash | klon darhol yo‘qoladi | bilim hajmi kamayadi | past | 10 daq | oson | yo‘q | canonical count −90 | 8.1 |
| 90 klonni bitta canonical kartaga birlashtirish | takror yo‘q | sahifa juda sayoz qoladi | past | 15 daq | oson | parser alias | 89 alias | 7.6 |
| Past sifatli kartalarni UI’da yashirish | ko‘rinish tozalanadi | manba qarzi yashirin qoladi | o‘rta | 20 daq | oson | score threshold | UI soni kamayadi | 6.4 |
| Faqat “shablon” ogohlantirishi qo‘yish | shaffof | muammo tuzalmaydi | past | 5 daq | oson | yo‘q | banner | 3.5 |

## C02 — Python OOP expanded savollarida begona sibling kontekst

| Variant | Foyda | Minus | Risk | Vaqt | Qaytarish | Bog‘liqlik | Dalil/tekshiruv | Ball |
|---|---|---|---|---|---|---|---|---:|
| Parserda strukturaviy lineage + lexical relevance gate **(tanlandi)** | root cause barcha korpusda yopiladi | parser murakkablashadi | o‘rta | 45–60 daq | Git revert oson | parser testlari | contamination corpus scan = 0 | 9.5 |
| Faqat topilgan OOP kartalarini qo‘lda tahrirlash | ko‘rinadigan misollar tuzaladi | yangi faylda yana qaytadi | yuqori | 30 daq | oson | source tahriri | sample pass | 7.0 |
| Barcha questionContext’ni o‘chirish | aralashuv butunlay yo‘q | foydali kontekst ham yo‘qoladi | o‘rta | 15 daq | oson | pipeline | context count = 0 | 8.0 |
| Runtime’da regex blacklist | tez | faqat ma’lum simptomlarni tutadi | yuqori | 25 daq | oson | blacklist | known strings absent | 6.8 |
| Expanded question’ni UI’dan yashirish | vizual simptom yo‘q | boyitish talabi buziladi | yuqori | 10 daq | oson | UI | raw question only | 4.2 |

## C03 — `.Md` suffix va acronym casing

| Variant | Foyda | Minus | Risk | Vaqt | Qaytarish | Bog‘liqlik | Dalil/tekshiruv | Ball |
|---|---|---|---|---|---|---|---|---:|
| Markaziy semantic label map + suffix cleanup **(tanlandi)** | AI/GitHub/SQL/SAP/DSA va maxsus nomlar aniq | yangi maxsus mavzu map talab qilishi mumkin | past | 25 daq | oson | UI helper test | barcha 15 label snapshot | 9.4 |
| Faqat universal title-case/acronym algoritmi | kam konfiguratsiya | istisnolar noto‘g‘ri | o‘rta | 30 daq | oson | token rules | label snapshot | 8.7 |
| Markdown frontmatter `displayTopic` | sourcega yaqin | 55 fayl migratsiyasi | o‘rta | 60 daq | o‘rta | parser schema | every page field | 8.3 |
| Papka/fayllarni rename qilish | tabiiy nom | path/slug/linklar sinishi mumkin | yuqori | 60 daq | qiyin | filesystem/Git | migration suite | 5.4 |
| CSS `text-transform` | juda tez | `.Md` va acronymlarni tuzatmaydi | yuqori | 5 daq | oson | CSS | visual only | 2.5 |

