# Excel — YouTube Video Savol-Javoblari

> YouTube'dagi Excel maslahatlari videolaridan olingan amaliy mavzular, formulalar va tushuntirishlar bilan. Umumiy Excel asoslari uchun `02_spreadsheet_basics.md`, intervyu savollari uchun `06_uzbekiston_2026_real_interviews.md` fayllariga ham qarang.

---

# Video 1 — Excel maslahatlari (10 mavzu)

## 1. Shartli sanash (COUNTIF) — 0:22
**Savol:** 10 000 dollardan yuqori sotuvlar sonini qanday hisoblash mumkin?

```excel
=COUNTIF(C2:C1000, ">10000")
```
`COUNTIF` diapazondagi shartga mos keluvchi katakchalar sonini qaytaradi. Bir nechta shart kerak bo'lsa (masalan, sana oralig'i ham qo'shilsa), `COUNTIFS` ishlatiladi:
```excel
=COUNTIFS(C2:C1000, ">10000", D2:D1000, "Texnologiya")
```

---

## 2. Ma'lumotlarni filtrlash (FILTER) — 1:17
**Savol:** Muayyan sohadagi (masalan, Technology) xodimlarni qanday ro'yxatdan ajratib olish mumkin?

```excel
=FILTER(A2:D100, C2:C100="Technology")
```
`FILTER` — dinamik massiv funksiyasi (Excel 365/2021): shartga mos qatorlarni avtomatik "yoyib" (spill) chiqaradi, natija manba o'zgarganda o'zi yangilanadi. Bo'sh natija uchun uchinchi argument:
```excel
=FILTER(A2:D100, C2:C100="Technology", "Topilmadi")
```

---

## 3. Matn bilan ishlash (TEXTBEFORE/TEXTAFTER) — 3:00
**Savol:** Hisob-faktura raqamidan faqat sanani qanday ajratib olish mumkin?

Masalan, `INV-2026-08-07-00123` ko'rinishidagi raqamdan sanani ajratish:
```excel
=TEXTAFTER(A2, "-", 1)      ' birinchi "-"dan keyingi qism: "2026-08-07-00123"
=TEXTBEFORE(A2, "-", 4)     ' 4-chi "-"gacha bo'lgan qism
```
`TEXTBEFORE`/`TEXTAFTER` ma'lum bir ajratuvchi belgi (delimiter) asosida matnni bo'lib oladi — eski `LEFT`/`MID`/`FIND` kombinatsiyasidan ancha soddaroq va o'qish oson.

---

## 4. Hujayra murojaatlari ($) — 4:57
**Savol:** Nisbiy va mutlaq murojaatlar (masalan, `$C$6`) qanday ishlaydi?

- `A1` — **nisbiy** murojaat: formula boshqa katakchaga nusxalanganda ustun ham, qator ham siljiydi.
- `$A$1` — **mutlaq** murojaat: nusxalanganda ustun ham, qator ham qotib qoladi (`$` belgisi qotiradi).
- `$A1` / `A$1` — **aralash** murojaat: faqat ustun yoki faqat qator qotadi.

```excel
=B2*$C$6   ' B2 nusxalanganda o'zgaradi, $C$6 (masalan foiz stavkasi) doim bir xil qoladi
```
Amaliyotda ko'p ishlatiladigan holat: bitta umumiy koeffitsientni (soliq foizi, valyuta kursi) butun ustunga qo'llash — shu koeffitsient joylashgan katakchani `$` bilan qotirib qo'yish kerak, aks holda formula nusxalanganda noto'g'ri katakchaga siljib ketadi.

---

## 5. Ism va familiya bosh harflari (LEFT & &) — 7:42
**Savol:** Xodimlar ismining bosh harflarini qanday birlashtirib olish mumkin?

Ism `A2` (masalan "Aziza") va familiya `B2` (masalan "Karimova") alohida ustunlarda bo'lsa:
```excel
=LEFT(A2,1) & LEFT(B2,1)          ' natija: "AK"
=LEFT(A2,1) & "." & LEFT(B2,1) & "."   ' natija: "A.K."
```
`LEFT(matn, n)` — matnning chap tomonidan `n` ta belgini oladi; `&` operatori esa matnlarni birlashtiradi (`CONCATENATE`/`CONCAT`ning qisqa yozilishi).

---

## 6. Fayl tezligini oshirish — 9:20
**Savol:** Excel fayli sekin ishlaganda tezlikni qanday oshirish mumkin?

- **Hisoblashni Manual rejimga o'tkazish:** `Formulas → Calculation Options → Manual`. Shu holatda Excel formulalarni har bir o'zgarishda emas, faqat `F9` bosilganda qayta hisoblaydi — katta fayllarda sezilarli tezlik beradi.
- **O'zgaruvchan (volatile) funksiyalardan qochish:** `TODAY()`, `NOW()`, `RAND()`, `RANDBETWEEN()`, `OFFSET()`, `INDIRECT()` — bular har bir qayta hisoblashda, hatto bog'liq katakcha o'zgarmasa ham, qayta ishlaydi va butun faylni sekinlashtiradi. Iloji bo'lsa `INDEX` (volatile emas) `OFFSET` o'rniga, statik sana katakchasi `TODAY()` o'rniga ishlatiladi.
- Qo'shimcha: ortiqcha formatlash (conditional formatting), ishlatilmagan uzoq diapazonlarga havolalar va ko'p array formula ham tezlikni pasaytiradi.

---

## 7. Chiqib ketgan qiymatlarni (Outliers) aniqlash — 10:45
**Savol:** Box and Whisker diagrammasi yordamida g'ayritabiiy qiymatlarni qanday topish mumkin?

`Insert → Charts → Box and Whisker` orqali diagramma quriladi. Bu diagramma ma'lumotni kvartillarga (Q1, median, Q3) bo'lib ko'rsatadi va IQR (Interquartile Range) asosida me'yordan tashqari nuqtalarni alohida nuqta sifatida chizadi:
```
IQR = Q3 - Q1
Pastki chegara = Q1 - 1.5 * IQR
Yuqori chegara = Q3 + 1.5 * IQR
```
Formula orqali tekshirish:
```excel
=QUARTILE.INC(C2:C100,1)   ' Q1
=QUARTILE.INC(C2:C100,3)   ' Q3
```
Shu chegaradan tashqaridagi qiymatlar diagrammada nuqta ko'rinishida ajratib ko'rsatiladi — ma'lumot kiritish xatolari yoki haqiqatan g'ayrioddiy holatlarni topishda foydali.

---

## 8. Pivot jadval (Pivot Table) — 12:05
**Savol:** Sotuv usullari bo'yicha foiz ko'rsatkichlarini qanday hisoblash mumkin?

1. Ma'lumotni Pivot Table'ga qo'yish: `Insert → PivotTable`.
2. "Sotuv usuli" (masalan Online/Do'kon/Telefon) — **Rows** maydoniga, "Sotuv summasi" — **Values** maydoniga.
3. Values maydonidagi qiymatga o'ng tugma bosib: `Show Values As → % of Grand Total` (yoki `% of Column Total`) tanlanadi.

Natijada har bir sotuv usulining umumiy sotuvdagi ulushi foiz ko'rinishida avtomatik hisoblanadi — qo'lda formula yozish shart emas.

---

## 9. Standart og'ish (Standard Deviation) — 13:00
**Savol:** Pivot jadval yordamida sotuvdagi o'zgaruvchanlik darajasini qanday aniqlash mumkin?

Pivot Table Values maydonida qiymat ustiga o'ng tugma → `Summarize Values By → More Options → StdDev` (yoki `StdDevp`, agar butun populyatsiya bo'lsa, `StdDev` esa namuna — sample — uchun).

Formula ko'rinishida (Pivot'siz):
```excel
=STDEV.S(C2:C100)   ' namuna (sample) uchun
=STDEV.P(C2:C100)   ' butun populyatsiya uchun
```
Standart og'ish qancha katta bo'lsa, sotuvlar o'rtacha qiymat atrofida shuncha ko'p tarqoq (o'zgaruvchan) — barqarorlikni baholashda ishlatiladi.

---

## 10. Dinamik qidiruv (INDEX & MATCH) — 14:13
**Savol:** Murakkab jadvaldan xodimning muayyan yildagi daromadini qanday topish mumkin?

Jadvalda qatorlar — xodimlar (`A` ustuni), ustunlar — yillar (`B1:F1`) bo'lsa:
```excel
=INDEX(B2:F100, MATCH("Aziza Karimova", A2:A100, 0), MATCH(2026, B1:F1, 0))
```
`MATCH` qidirilayotgan qiymatning qator/ustun raqamini (pozitsiyasini) topadi, `INDEX` esa shu kesishgan katakchadagi qiymatni qaytaradi. Bu usul `VLOOKUP`dan farqli o'laroq ikkala yo'nalishda (qator ham, ustun ham) dinamik qidiruvga imkon beradi va ustun/qator qo'shilib-o'chirilganda ham formula buzilmaydi.

Zamonaviy Excel 365'da xuddi shu natijani ikki o'lchamli `XLOOKUP` bilan ham olish mumkin:
```excel
=XLOOKUP(2026, B1:F1, XLOOKUP("Aziza Karimova", A2:A100, B2:F100))
```

---

# Video 2 — Excel amaliy mashqlar: Employees, Attendees, Students (15 savol)

> Bu videoda uchta alohida jadval (Employees, Attendees, Students) asosida 15 ta amaliy topshiriq yechiladi. Quyida har bir ustun nomi taxminiy jadval tuzilishiga ko'ra ko'rsatilgan — o'z faylingizda ustun harflari boshqacha bo'lishi mumkin, mantiq bir xil qoladi.

## 1-qism: Employees (Xodimlar)

**Jadval taxminan:** `A` — Ism, `B` — Bo'lim, `C` — Eski maosh (Salary), `D` — Yangi maosh.

### Q1. Har bir xodim uchun yangi maoshni hisoblash — 1:01
Avval foiz katakchasini mutlaq murojaat bilan qotiring, so'ng formula nusxalanganda bir nechta nazorat qatorini tekshiring. Masalan, `=C2*(1+$G$1)` eski maoshni `$G$1`dagi oshirish foizi bilan hisoblaydi. [Microsoft Support: formulalarni nusxalash va murojaatlar](https://support.microsoft.com/en-us/office/switch-between-relative-absolute-and-mixed-references-dfec08cd-ae65-4f56-839e-5f0d8d0baca9).

**Savol:** Masalan, barcha xodimlarga 10% oshirim (zam) qo'shilsa, yangi maoshni qanday hisoblash mumkin?
```excel
=C2*1.1
```
Yoki oshirim foizi alohida katakchada (masalan `$G$1`) bo'lsa, mutlaq murojaat bilan:
```excel
=C2*(1+$G$1)
```

### Q2. Umumiy ish haqi (payroll) xarajatini topish — 2:05
```excel
=SUM(D2:D100)
```
`SUM` — barcha xodimlarning yangi maoshlarini yig'ib, umumiy oylik payroll xarajatini beradi.

### Q3. Xodimlarning o'rtacha ish haqini aniqlash — 2:41
```excel
=AVERAGE(D2:D100)
```

### Q4. Eng past ish haqini topish — 3:07
```excel
=MIN(D2:D100)
```
Kim ekanligini ham bilish kerak bo'lsa:
```excel
=INDEX(A2:A100, MATCH(MIN(D2:D100), D2:D100, 0))
```

### Q5. Moliya (Finance) bo'limidagi eng yuqori ish haqini aniqlash — 3:38
```excel
=MAXIFS(D2:D100, B2:B100, "Finance")
```
`MAXIFS` — shartga (bo'lim = "Finance") mos qatorlar orasidan eng katta qiymatni qaytaradi. Eski Excel versiyalarida array formula bilan: `{=MAX(IF(B2:B100="Finance", D2:D100))}` (Ctrl+Shift+Enter).

---

## 2-qism: Attendees (Ishtirokchilar)

**Jadval taxminan:** `A` — Ism, `B` — Yosh, `C` — Email.

### Q6. Nomzodlarning umumiy sonini aniqlash — 5:42
```excel
=COUNTA(A2:A100)
```
`COUNTA` — bo'sh bo'lmagan katakchalar sonini sanaydi (matn ham, raqam ham hisobga olinadi).

### Q7. Yoshi ko'rsatilgan nomzodlar sonini topish — 6:09
```excel
=COUNT(B2:B100)
```
`COUNT` — faqat raqamli qiymatlarni sanaydi, shuning uchun "Yosh" ustunida bo'sh yoki matn bo'lgan qatorlar hisobga olinmaydi.

### Q8. Elektron pochta manzilini kiritmagan nomzodlar sonini hisoblash — 6:44
```excel
=COUNTBLANK(C2:C100)
```

### Q9. 40 yosh va undan katta nomzodlar sonini topish — 7:21
```excel
=COUNTIF(B2:B100, ">=40")
```

### Q10. Berilgan nomzodning elektron pochta manzilini (VLOOKUP orqali) topish — 8:08
```excel
=VLOOKUP("Aziza Karimova", A2:C100, 3, FALSE)
```
Qidirilayotgan ism birinchi ustunda bo'lishi shart; `3` — email joylashgan ustun raqami (A=1, B=2, C=3); `FALSE` — aniq moslik (`exact match`).

---

## 3-qism: Students (Talabalar)

**Jadval taxminan:** `A` — Ism, `B` — Fan, `C` — Ball.

### Q11. 50 ball va undan yuqori olgan talabalar uchun 'pass', qolganlar uchun 'fail' — 9:23
```excel
=IF(C2>=50, "pass", "fail")
```

### Q12. Yiqilgan (fail) talabalar sonini hisoblash — 10:46
```excel
=COUNTIF(C2:C100, "<50")
```
Yoki 11-savoldagi natija ustuni (masalan `D`) tayyor bo'lsa:
```excel
=COUNTIF(D2:D100, "fail")
```

### Q13. Fan bo'yicha o'rtacha ballni hisoblash — 11:36
```excel
=AVERAGEIF(B2:B100, "Matematika", C2:C100)
```
Bir nechta fan uchun bir vaqtda ko'rish kerak bo'lsa — Pivot Table (`Rows` = Fan, `Values` = Average of Ball) qulayroq.

### Q14. Matematika fanidan eng past ballni topish — 12:37
```excel
=MINIFS(C2:C100, B2:B100, "Matematika")
```

### Q15. Ingliz tili fanidan 80 va undan yuqori ball olganlar sonini aniqlash — 13:48
```excel
=COUNTIFS(B2:B100, "Ingliz tili", C2:C100, ">=80")
```
`COUNTIFS` — bir nechta shartni (fan = "Ingliz tili" **va** ball >= 80) bir vaqtda AND mantig'i bilan tekshiradi.

---

# Video 3 — Excel intervyu suhbati: 30 ta asosiy savol

> Bu videoda texnik bo'lmagan (behavioral) va nazariy Excel intervyu savollari birga keltirilgan. Shaxsiy tajriba talab qiladigan savollarga (masalan "gapirib bering", "misol keltiring") tayyor namuna javob emas, javobni qanday tuzish kerakligi bo'yicha qisqa yo'l-yo'riq berilgan — real intervyuda o'z tajribangizdan aniq misol ishlatish kerak.

### Q1. O'zingiz va Excel bilan ishlash tajribangiz haqida gapirib bering — 0:21
**Qanday javob berish kerak:** Necha yildan beri, qaysi versiyalarda (365, 2019...), qaysi sohada (moliya, sotuv, HR) va qanday vazifalar uchun (hisobot, tahlil, avtomatlashtirish) ishlatganingizni qisqa aytib bering. Aniq bitta natija bilan yakunlang (masalan "oylik hisobotni qo'lda 2 kundan Pivot Table + Power Query bilan 20 daqiqaga tushirdim").

### Q2. Nima uchun Excel ish joyida muhim deb o'ylaysiz? — 0:54
Excel — deyarli har bir bo'limda (moliya, sotuv, HR, logistika) universal vosita: tez tahlil, vizualizatsiya, avtomatlashtirish (makro/Power Query) va boshqa tizimlar (SQL, ERP) bilan integratsiya imkonini beradi, maxsus dasturlash bilimisiz ham murakkab hisob-kitob qilish mumkin.

### Q3. Katakchalarga murojaat qilishning (cell references) qanday turlari mavjud? — 1:28
- **Nisbiy (relative):** `A1` — nusxalanganda siljiydi.
- **Mutlaq (absolute):** `$A$1` — nusxalanganda qotib qoladi.
- **Aralash (mixed):** `$A1` yoki `A$1` — faqat ustun yoki faqat qator qotadi.

### Q4. Formula va funksiya o'rtasidagi farq nimada? — 1:56
**Formula** — foydalanuvchi o'zi yozadigan har qanday hisob-kitob ifodasi (`=A1+B1*2`). **Funksiya** — Excelda oldindan tayyorlangan, nomlangan formula (`SUM`, `VLOOKUP`, `IF`). Har bir funksiya — formula, lekin har bir formula funksiya emas.

### Q5. Eng ko'p qaysi Excel funksiyalaridan foydalanasiz? — 2:22
Odatiy javob: `VLOOKUP`/`XLOOKUP`, `IF`/`IFS`, `SUMIFS`/`COUNTIFS`, `INDEX`/`MATCH`, Pivot Table — kundalik hisobot va ma'lumot birlashtirish uchun eng ko'p ishlatiladigan to'plam.

### Q6. IF funksiyasini misol bilan tushuntirib bering — 2:55
```excel
=IF(B2>=50, "pass", "fail")
```
Shart (`B2>=50`) TRUE bo'lsa — birinchi qiymat, FALSE bo'lsa — ikkinchi qiymat qaytariladi. Bir nechta shart uchun `IFS` yoki ichma-ich `IF` ishlatiladi.

### Q7. VLOOKUP nima va qachon undan foydalanasiz? — 3:31
```excel
=VLOOKUP(A2, Malumotlar!A:D, 3, FALSE)
```
Chapdagi ustun bo'yicha qidirib, belgilangan ustun raqamidan qiymat qaytaradi — turli jadvallarni ID/kalit bo'yicha bog'lashda (masalan xodim ID orqali bo'lim nomini topish) ishlatiladi.

### Q8. XLOOKUP nima va u VLOOKUPdan qanday ustunlikka ega? — 3:54
```excel
=XLOOKUP(A2, Malumotlar!A:A, Malumotlar!C:C, "Topilmadi")
```
Ustunlik: ikkala tomonga ham qidiradi (chapga ham), ustun raqamini sanash shart emas (ustun qo'shilsa formula buzilmaydi), `#N/A` xatosini `if_not_found` parametri bilan avtomatik hal qiladi, standart holatda aniq moslik (`exact match`) ishlatadi.

### Q9. Pivot jadvali (Pivot Table) nima va u nima uchun foydali? — 4:21
Katta hajmdagi ma'lumotni bir necha bosishda guruhlash, jamlash (sum/average/count) va kesimlarga (bo'lim, oy, mintaqa) bo'lish imkonini beruvchi interaktiv vosita. Qo'lda `SUMIFS` yozishdan tezroq, tezkor "nima bo'ldi?" savollariga javob berish uchun ideal.

### Q10. Takroriy ma'lumotlarni (duplicate data) qanday boshqarasiz? — 4:51
- Aniqlash: `Home → Conditional Formatting → Highlight Cells Rules → Duplicate Values` yoki `=COUNTIF(A:A,A2)>1`.
- O'chirish: `Data → Remove Duplicates`.
- Faqat ko'rish/filtrlash kerak bo'lsa: Pivot Table yoki `COUNTIF` bilan belgilab, keyin filtr qo'yish.

### Q11. Excelda diagrammalarni qanday yaratasiz? — 5:21
Ma'lumotni tanlab `Insert → Charts` bo'limidan mos diagramma turi (ustunli, chiziqli, doiraviy, Box and Whisker va h.k.) tanlanadi. Diagramma turi ma'lumot maqsadiga qarab tanlanadi: taqqoslash — ustunli (bar/column), trend — chiziqli (line), ulush — doiraviy (pie), tarqalish/outlier — Box and Whisker yoki scatter.

### Q12. Shartli formatlash (conditional formatting) nima? — 5:49
Katakcha qiymati ma'lum shartga mos kelsa, avtomatik ravishda rang/shrift/belgini o'zgartiradigan vosita (`Home → Conditional Formatting`). Masalan, `<50` bo'lgan ballarni qizil rangda, eng yuqori 10 ta qiymatni yashil rangda ko'rsatish.

### Q13. Excel faylida ma'lumotlarni qanday himoya qilasiz? — 6:21
- **Worksheet Protection:** `Review → Protect Sheet` — muayyan katakchalarni tahrirlashdan himoya qilish (avval `Format Cells → Protection` orqali qaysi katakchalar qulflanishi belgilanadi).
- **Workbook Protection:** parol bilan faylni ochish/tahrirlashni cheklash (`File → Info → Protect Workbook`).
- **Data Validation:** noto'g'ri qiymat kiritilishining oldini olish.

### Q14. COUNT, COUNTA va COUNTIF funksiyalari o'rtasidagi farqni tushuntiring — 6:51
```excel
=COUNT(A2:A100)              ' faqat raqamli katakchalarni sanaydi
=COUNTA(A2:A100)              ' bo'sh bo'lmagan barcha katakchalarni sanaydi (matn ham, raqam ham)
=COUNTIF(A2:A100, ">50")      ' shartga mos katakchalarni sanaydi
```

### Q15. Ma'lumotlarni qanday saralaysiz (sort) va filtrlaysiz (filter)? — 7:22
- **Sort:** `Data → Sort` — bitta yoki bir nechta ustun bo'yicha o'sish/kamayish tartibida.
- **Filter:** `Data → Filter` — har bir ustun sarlavhasiga tushuvchi ro'yxat (dropdown) qo'shiladi, shart bo'yicha faqat kerakli qatorlar ko'rsatiladi. Murakkab shartlar uchun `Advanced Filter` yoki `FILTER()` dinamik massiv funksiyasi ishlatiladi.

### Q16. Excel yordamida muammoni hal qilgan vaziyatingizni tasvirlab bering — 7:56
**Qanday javob berish kerak:** STAR usuli (Situation — Task — Action — Result) bo'yicha qisqa hikoya: qanday muammo bor edi (masalan qo'lda hisobot 3 kun ketardi yoki xato ko'p bo'lardi), qanday Excel vositasi (Power Query, Pivot Table, formula) qo'llanildi, natijada nima o'zgardi (vaqt/xato kamaydi).

### Q17. Katta jadvallar bilan ishlaganda aniqlikni qanday ta'minlaysiz? — 8:27
Data Validation bilan kirish nazorati, formulalarni kichik namunada tekshirib keyin butun ustunga tarqatish, `SUMIFS`/`COUNTIFS` bilan nazorat summalarini (control totals) tekshirish, Excel Table (strukturaviy jadval) ishlatish — qo'lqotib diapazon xatolarini kamaytiradi, va oxirida boshqa usul (masalan Pivot Table) bilan natijani xoch-tekshirish (cross-check).

### Q18. Hech qachon jamoa tarkibida Excel bilan ishlaganmisiz? — 8:58
**Qanday javob berish kerak:** Umumiy fayl (SharePoint/OneDrive) ustida bir nechta kishi bilan bir vaqtda ishlash, versiyalarni boshqarish, formulalar/nomlangan diapazonlar (named ranges) haqida jamoaga tushuntirish tajribasidan misol keltiring.

### Q19. Excelda qandaydir vazifani bajarishni bilmasangiz, nima qilasiz? — 9:28
Avval Microsoft rasmiy hujjatlari yoki ishonchli manbalarda (forum, YouTube) qidiraman, kichik test faylida sinab ko'raman, agar vaqt tanqis bo'lsa hamkasb yoki jamoadan so'rayman. Muhim: yechimni ishlatishdan oldin har doim natijani tekshiraman (mustaqil formula yoki qo'lda hisob bilan solishtirib).

### Q20. Nima uchun sizni ushbu Excel lavozimiga ishga olishimiz kerak? — 9:58
**Qanday javob berish kerak:** Vakansiya talablarini o'z tajribangizdagi aniq Excel ko'nikmalar (Pivot Table, VLOOKUP/XLOOKUP, Power Query, dashboard qurish) va o'lchanadigan natijalar bilan bog'lang — umumiy gap emas, kompaniyaning aniq ehtiyojiga mos misol.

### Q21. Ma'lumotlarni tekshirish (data validation) nima? — 10:18
`Data → Data Validation` — katakchaga kiritilishi mumkin bo'lgan qiymatlarni cheklaydi (masalan faqat ro'yxatdan tanlash, faqat sana, faqat 0–100 oralig'idagi raqam). Ma'lumot kiritish xatolarining oldini olish uchun ishlatiladi.

### Q22. IFERROR funksiyasining vazifasi nima? — 10:47
```excel
=IFERROR(VLOOKUP(A2, Malumotlar!A:C, 3, FALSE), "Topilmadi")
```
Formula xato qaytarsa (`#N/A`, `#DIV/0!` va h.k.), o'rniga belgilangan qiymat yoki matn ko'rsatiladi — hisobotni "toza" ko'rinishda saqlaydi.

### Q23. Excelda katakchalarni qanday qotirasiz (freeze panes)? — 11:18
`View → Freeze Panes` — sarlavha qatori yoki ustunini pastga/o'ngga aylantirishda ekranda ko'rinib turishini ta'minlaydi. `Freeze Top Row`, `Freeze First Column` yoki tanlangan katakcha bo'yicha `Freeze Panes` variantlari mavjud.

### Q24. Ish kitobi (workbook) va ish varag'i (worksheet) o'rtasidagi farq nima? — 11:44
**Workbook** — butun `.xlsx` fayl. **Worksheet** — shu fayl ichidagi bitta varaq (tab). Bitta workbook bir nechta worksheetdan iborat bo'lishi mumkin.

### Q25. Katta hajmdagi ma'lumotlarni samarali boshqarish uchun nima qilasiz? — 12:12
Excel Table formatiga o'tkazish (strukturaviy havolalar, avtomatik kengayish), Pivot Table bilan jamlash, hisoblashni Manual rejimga o'tkazish, volatile funksiyalardan (`OFFSET`, `INDIRECT`) qochish, kerak bo'lsa Power Query orqali oldindan tozalash/birlashtirish — barchasi tezlik va boshqaruvni yaxshilaydi.

### Q26. Bajargan murakkab Excel vazifangiz haqida aytib bering — 12:47
**Qanday javob berish kerak:** Bir nechta manbadan (turli fayllar/bo'limlar) ma'lumotni birlashtirgan, Power Query/Power Pivot bilan model qurgan yoki LAMBDA/array formulalar bilan murakkab hisob-kitobni avtomatlashtirgan aniq misol keltiring — muammo, yechim va natijani ketma-ket tushuntiring.

### Q27. Qattiq muddatlarda bir nechta Excel vazifalarini qanday ustuvorlashtirasiz? — 13:15
Har bir vazifaning biznesga ta'siri va muddatiga qarab ustuvorlashtiraman (masalan boshqa kishi kutayotgan hisobot birinchi navbatda), takrorlanuvchi qismlarni shablon/makro bilan tezlashtiraman, kerak bo'lsa muddatlar haqida oldindan xabar beraman va murakkab qismlarni kichik bosqichlarga bo'lib bajaraman.

### Q28. Murakkab Excel hisobotlarini texnik bo'lmagan xodimlarga qanday tushuntirasiz? — 13:46
Formula/texnik tafsilotlar o'rniga natija va biznes ma'nosiga urg'u beraman (masalan "bu son sotuv 15% o'sganini bildiradi"), diagramma va rangli shartli formatlashdan ko'rgazmalilik uchun foydalanaman, kerak bo'lsa oddiy so'zlar bilan qadam-baqadam tushuntiraman va savollarga ochiqman.

### Q29. Excel jadvallari (Excel tables) nima va nega ulardan foydalanasiz? — 14:15
`Insert → Table` (yoki `Ctrl+T`) orqali oddiy diapazon "aqlli" jadvalga aylantiriladi: avtomatik kengayadi (yangi qator/ustun qo'shilganda formulalar va formatlash avtomatik tarqaladi), strukturaviy havolalar (`=Jadval1[Maosh]`) o'qishni osonlashtiradi, Pivot Table/diagrammalar bilan avtomatik yangilanadi, sarlavha qatori scroll qilganda avtomatik qotib qoladi.

### Q30. Kelajakda Excel ko'nikmalaringizni qayerda ko'rasiz? — 14:44
**Qanday javob berish kerak:** O'sish yo'nalishini ko'rsating — masalan Power Query/Power Pivot/DAX'ni chuqurroq o'rganish, VBA yoki Office Scripts bilan avtomatlashtirish, yoki Excel'dan Power BI/SQL kabi vositalarga o'tishni rejalashtirish — kompaniyaning uzoq muddatli ehtiyojlariga mos rivojlanish yo'nalishi bilan bog'lang.

---

# Video 4 — Excel intervyu: Asosiy va Murakkab savollar (22 savol)

## Asosiy savollar

### Q1. Excel nima va undan foydalanish? — 1:15
Microsoft'ning elektron jadval (spreadsheet) dasturi — ma'lumotlarni katakchalar (satr/ustun) ko'rinishida saqlash, hisob-kitob qilish, tahlil qilish, vizualizatsiya (diagramma) va avtomatlashtirish (formula, makro) uchun ishlatiladi. Moliya, hisobot, ma'lumotlar tahlili, loyiha boshqaruvi kabi deyarli har qanday sohada qo'llaniladi.

### Q2. Bir varaqda (sheet) qancha qator va ustun borligini qanday tekshirish mumkin? — 4:00
`Ctrl + End` bosilsa, kursor ma'lumot bilan to'ldirilgan oxirgi katakchaga o'tadi — shu orqali amaldagi qator/ustun chegarasini bilish mumkin. Excelning maksimal chegarasi: **1 048 576 qator** va **16 384 ustun** (`XFD` ustunigacha) — bu barcha versiyalarda (2007'dan buyon) doimiy.

### Q3. Excelda "cell" (katakcha) va "range" (diapazon) nima? — 5:01
**Cell** — bitta ustun va bitta qator kesishmasidagi yagona joy (masalan `A1`). **Range** — bir nechta katakchadan iborat guruh (masalan `A1:C10`) — formulalar odatda range ustida ishlaydi (`=SUM(A1:C10)`).

### Q4. Formula va funksiya o'rtasidagi farq nima? — 6:20
**Formula** — `=` bilan boshlanadigan har qanday hisob-kitob ifodasi (`=A1+B1`). **Funksiya** — Excelda oldindan tayyorlangan nomlangan formula (`SUM`, `IF`, `VLOOKUP`) — formulaning bir turi, lekin har bir formula funksiyadan foydalanishi shart emas.

### Q5. Flash Fill nima? — 8:41
`Data → Flash Fill` (yoki `Ctrl+E`) — Excel foydalanuvchi kiritgan bir-ikkita namunadan naqshni (pattern) o'zi aniqlab, qolgan qatorlarni avtomatik to'ldiradi (masalan to'liq ismdan faqat ismni ajratib olish) — formula yozmasdan.

### Q6. Data Validation (ma'lumotlarni tekshirish) funksiyasi qanday ishlaydi? — 11:11
`Data → Data Validation` — katakchaga kiritilishi mumkin bo'lgan qiymat turini cheklaydi: ro'yxatdan tanlash (dropdown list), raqam oralig'i, sana, matn uzunligi yoki maxsus formula sharti. Noto'g'ri qiymat kiritilsa, ogohlantirish xabari chiqadi.

### Q7. Conditional Formatting (shartli formatlash) nima uchun kerak? — 14:43
`Home → Conditional Formatting` — katakcha qiymati shartga mos kelganda avtomatik rang/shrift/belgi qo'llanadi (masalan eng past 10 ta qiymatni qizil, o'sish trendini yashil rangda ko'rsatish). Katta jadvalda ko'zga ko'rinadigan tarzda muhim qiymatlarni ajratib ko'rsatish uchun ishlatiladi.

### Q8. Freeze Panes (panellarni muzlatish) funksiyasi nima? — 16:29
`View → Freeze Panes` — sarlavha qatori yoki ustunini scroll qilganda ekranda qotib qolishini ta'minlaydi (`Freeze Top Row`, `Freeze First Column`, yoki tanlangan katakcha bo'yicha). Katta jadvalda sarlavhani doim ko'rib turish uchun foydalidir.

### Q9. Qator va ustunlarni yashirish (Hide/Unhide) uchun klaviatura yorliqlari qanday? — 19:44
```
Ctrl + 9        ' tanlangan qator(lar)ni yashirish (Hide Rows)
Ctrl + Shift + 9 ' yashirilgan qatorlarni ko'rsatish (Unhide Rows)
Ctrl + 0        ' tanlangan ustun(lar)ni yashirish (Hide Columns)
Ctrl + Shift + 0 ' yashirilgan ustunlarni ko'rsatish (Unhide Columns, ba'zi klaviaturalarda ishlamasligi mumkin)
```

### Q10. Formula bar (formula satri) nima? — 21:00
Nomlar qutisi yonidagi, ustun sarlavhalari tepasidagi maydon — tanlangan katakchaning haqiqiy formulasini (yoki qiymatini) to'liq ko'rsatadi va shu yerda tahrirlash mumkin. Katakchaning o'zida faqat natija ko'rinadi, formula bar esa uning "orqasidagi" mantiqni ko'rsatadi.

### Q11. Name Box (nomlar qutisi) nima? — 21:57
Formula bar chap tomonidagi kichik maydon — hozirgi tanlangan katakcha manzilini (masalan `B5`) ko'rsatadi. Manzil yozib `Enter` bosilsa, o'sha katakchaga tez o'tish mumkin; shuningdek, nomlangan diapazonlar (named ranges) shu yerda yaratiladi va tanlanadi.

### Q12. Relative (nisbiy) va Absolute (absolyut) cell reference nima? — 23:47
`A1` — nisbiy: nusxalanganda ustun/qator siljiydi. `$A$1` — absolyut: nusxalanganda qotib qoladi (`$` belgisi bilan). Masalan `=B2*$C$1` nusxalanganda `B2` o'zgaradi, `$C$1` (masalan yagona koeffitsient) doim bir xil qoladi.

---

## Murakkab (Advanced) savollar

### Q13. VLOOKUP funksiyasida Wildcard (yovvoyi belgilar) dan qanday foydalaniladi? — 26:48
```excel
=VLOOKUP("Azi*", A2:C100, 2, FALSE)
```
`*` — istalgan sonli belgilarni, `?` — bitta belgini almashtiradi. To'liq matn noma'lum bo'lganda, qisman moslikni topishda ishlatiladi (masalan ism boshlanishi ma'lum bo'lsa). Ishlashi uchun to'rtinchi argument aniq moslik (`FALSE`) bo'lishi kerak.

### Q14. FILTER funksiyasi yordamida ma'lumotlarni qanday ajratib olish mumkin? — 30:29
```excel
=FILTER(A2:D100, (C2:C100="Texnologiya")*(D2:D100>1000))
```
Dinamik massiv funksiyasi — shartga (yoki `*` orqali bir nechta shartga, AND mantig'i) mos qatorlarni avtomatik "yoyib" (spill) chiqaradi, manba o'zgarganda natija o'zi yangilanadi.

### Q15. Go To Special funksiyasi orqali ma'lumotlarni qanday ajratish mumkin? — 33:31
`Home → Find & Select → Go To Special` (yoki `Ctrl+G → Special`) — bo'sh katakchalar (Blanks), formulali katakchalar, konstantalar, shartli formatlangan katakchalar, faqat ko'rinadigan katakchalar (Visible Cells Only, filtrlangan jadvalda nusxalash uchun muhim) kabi maxsus turdagi katakchalarni bir zumda tanlab ajratib olish imkonini beradi.

### Q16. SEQUENCE va COUNTA funksiyalari orqali avtomatik tartib raqamlarini qanday yaratish mumkin? — 35:27
```excel
=SEQUENCE(COUNTA(A2:A100))
```
`COUNTA` — ma'lumot bilan to'ldirilgan qatorlar sonini hisoblaydi, `SEQUENCE` esa shu songa qarab `1, 2, 3, ...` ketma-ketligini avtomatik yaratadi — qator qo'shilib-o'chirilganda ham tartib raqami qo'lda yangilanmasdan avtomatik moslashadi.

### Q17. Text to Columns funksiyasi qanday ishlatiladi? — 39:03
`Data → Text to Columns` — bitta ustundagi matnni ajratuvchi belgi (vergul, probel, `;`) yoki belgilangan kenglik (fixed width) bo'yicha bir nechta ustunga bo'ladi. Masalan `"Aziza Karimova"` degan bitta katakchani `Aziza` va `Karimova` deb ikkita ustunga ajratish uchun ishlatiladi.

### Q18. Ma'lumotlar ustunini kesmasdan (cut qilmasdan) qanday joyini almashtirish mumkin? — 40:23
Ustun sarlavhasini (yoki tanlangan diapazonni) tanlab, chetidan ushlab **Shift** tugmasini bosib turgan holda kerakli joyga sudrab tashlash (drag & drop) — Excel avtomatik o'sha yerga "kiritib" (insert) joylashtiradi, `Cut`/`Paste` qilish shart emas va boshqa ustunlar ustiga yozib yubormaydi.

### Q19. Transpose funksiyasi nima? — 41:57
Qatorlarni ustunga, ustunlarni qatorga aylantiradi.
```excel
=TRANSPOSE(A1:D10)
```
Yoki nusxalab, `Paste Special → Transpose` orqali statik natija sifatida joylashtirish mumkin. `TRANSPOSE()` formula sifatida dinamik massiv qaytaradi — manba o'zgarsa natija ham yangilanadi.

### Q20. DATEDIF funksiyasi orqali yoshni qanday hisoblash mumkin? — 43:12
```excel
=DATEDIF(B2, TODAY(), "Y")
```
`B2` — tug'ilgan sana, `TODAY()` — bugungi sana, `"Y"` — to'liq yil farqini qaytaradi. `"M"` — oy, `"D"` — kun farqi uchun ishlatiladi. `DATEDIF` — hujjatlashtirilmagan, lekin barcha zamonaviy Excel versiyalarida ishlaydigan funksiya.

### Q21. Excel varag'ini ma'lum bir qismini qanday himoyalash (protect) mumkin? — 45:25
1. Himoyalanmasligi kerak bo'lgan katakchalarni tanlab, `Format Cells → Protection → Locked` belgisini olib tashlash (chunki barcha katakchalar sukut bo'yicha "Locked" holatida).
2. `Review → Protect Sheet` — parol (ixtiyoriy) qo'yib, varaqni himoyalash. Shundan so'ng faqat "Locked" belgisi olib tashlanmagan katakchalar tahrirlanadi, qolganlari qulflanadi.

### Q22. Paste Special funksiyasi nima uchun kerak? — 47:44
`Ctrl+Alt+V` — nusxalangan katakchani to'liq emas, faqat kerakli qismini joylashtirish imkonini beradi: faqat qiymat (Values, formula emas), faqat formatlash, faqat formula, Transpose, yoki matematik amal (Paste Special → Multiply — masalan barcha narxlarni bir vaqtda foizga ko'paytirish uchun).

### Q23. Exceldagi xatoliklar (#REF, #N/A, #NAME, #NULL, #VALUE) qachon va nega chiqadi? — 49:17
| Xato | Sabab |
|---|---|
| `#REF!` | Formula ishora qilayotgan katakcha/qator/ustun o'chirilgan |
| `#N/A` | Qidirilayotgan qiymat topilmadi (masalan `VLOOKUP`/`MATCH`da) |
| `#NAME?` | Funksiya nomi noto'g'ri yozilgan yoki mavjud bo'lmagan nomlangan diapazon ishlatilgan |
| `#NULL!` | Diapazonlar orasida noto'g'ri kesishma belgisi (probel) ishlatilgan, masalan `=SUM(A1:A5 C1:C5)` |
| `#VALUE!` | Formula noto'g'ri turdagi ma'lumot bilan ishlashga urinmoqda (masalan matnni songa qo'shish) |

---

# Video 5 — Excel intervyu: xodimlar ma'lumotlari asosida 15 savol

> **Jadval taxminan:** `A` — ID, `B` — Ism, `C` — Jins, `D` — Bo'lim, `E` — Shahar/Mintaqa, `F` — Maosh (yoki Kredit summasi). Ustun harflari o'z faylingizda farq qilishi mumkin, mantiq bir xil qoladi.

### Q1. VLOOKUP va INDEX-MATCH o'rtasidagi farq — 0:35
```excel
=VLOOKUP(A2, Malumotlar!A:D, 3, FALSE)
=INDEX(Malumotlar!C:C, MATCH(A2, Malumotlar!A:A, 0))
```
`VLOOKUP` faqat chapdan o'ngga qidiradi va ustun raqamini qo'lda sanash kerak (ustun qo'shilsa formula buziladi). `INDEX-MATCH` ikkala yo'nalishga (chapga ham) qidira oladi, ustun o'chirilib-qo'shilganda ham buzilmaydi va odatda katta jadvalda tezroq ishlaydi.

### Q2. IT bo'limi uchun jins bo'yicha (erkak/ayol) hisoblash — 0:40
```excel
=COUNTIFS(D2:D100, "IT", C2:C100, "Erkak")
=COUNTIFS(D2:D100, "IT", C2:C100, "Ayol")
```
Ikkala shartni bir vaqtda (AND mantig'i) tekshiradi. Tezroq umumiy ko'rinish uchun Pivot Table (`Rows` = Bo'lim, `Columns` = Jins, `Values` = Count) qulayroq.

### Q3. Janubiy (South) mintaqadagi erkak xodimlar sonini aniqlash — 0:56
```excel
=COUNTIFS(E2:E100, "South", C2:C100, "Erkak")
```

### Q4. Xatoliklar (errors) yoki yetishmayotgan qiymatlarni sanash — 1:15
```excel
=COUNTBLANK(F2:F100)          ' bo'sh katakchalar
=SUMPRODUCT(--ISERROR(F2:F100))   ' xato qaytaruvchi katakchalar (#N/A, #VALUE! va h.k.)
```
`ISERROR` har bir katakchani tekshirib TRUE/FALSE massiv qaytaradi, `SUMPRODUCT` esa shu massivni yig'indiga aylantiradi (array formula sifatida Ctrl+Shift+Enter shart emas).

### Q5. Ma'lumotlarni Pivot jadval yordamida umumlashtirish — 1:23
`Insert → PivotTable` — kerakli ustunni `Rows`/`Columns` maydoniga (masalan Bo'lim, Mintaqa), son ustunini `Values` maydoniga (Sum/Average/Count) sudrab tashlash orqali xom ma'lumot bir necha soniyada guruhlangan hisobotga aylanadi — qo'lda `SUMIFS` yozishning tez alternativasi.

### Q6. Mumbai shahriga tegishli butun qatorni shartli formatlash orqali ajratish — 1:30
Butun jadvalni (masalan `A2:F100`) tanlab: `Home → Conditional Formatting → New Rule → Use a formula to determine which cells to format`:
```excel
=$E2="Mumbai"
```
Ustunga mutlaq (`$E2`, ustun qotgan, qator erkin) murojaat — shart bajarilgan qatorning barcha katakchalariga formatlash qo'llanishini ta'minlaydi.

### Q7. ID o'zgarganda ma'lumotlarni avtomatik yangilash — 1:44
`VLOOKUP`/`XLOOKUP`/`INDEX-MATCH` kabi qidiruv formulalari ID asosida qiymatni tortib oladi — ID katakchasi o'zgarsa, formula avtomatik qayta hisoblanib yangi natijani ko'rsatadi:
```excel
=XLOOKUP(A2, Malumotlar!A:A, Malumotlar!B:F)
```
Excel Table (`Ctrl+T`) formatidan foydalanish esa yangi qator qo'shilganda formulalarning avtomatik tarqalishini ta'minlaydi.

### Q8. Advanced Filter yordamida ma'lum mezonlar asosida ma'lumot olish — 1:54
`Data → Advanced Filter` — bir nechta murakkab shart (masalan Bo'lim = "IT" **VA** Maosh > 50000, yoki OR mantig'i) alohida "criteria range" orqali belgilanadi va natija boshqa joyga (`Copy to another location`) chiqariladi — oddiy `AutoFilter`dan farqli, bir nechta OR/AND kombinatsiyasini bir vaqtda qo'llash imkonini beradi.

### Q9. Dinamik diapazon bilan LOOKUP funksiyasidan foydalanish — 2:07
```excel
=LOOKUP(2, 1/(A2:A100<>""), A2:A100)   ' ustundagi oxirgi to'ldirilgan qiymatni topadi
```
Yoki Excel Table / nomlangan dinamik diapazon (`OFFSET` yoki `#` spill operatori) bilan `LOOKUP` doim yangilanib turadigan diapazon ustida ishlaydi — qator soni o'zgarganda formula qo'lda tuzatilmaydi.

### Q10. Dublikatlarni (takroriy yozuvlarni) olib tashlash va aniqlash — 2:16
```excel
=COUNTIF($A$2:$A$100, A2)>1   ' aniqlash (shartli formatlash yoki filtrlashda ishlatiladi)
```
Olib tashlash: `Data → Remove Duplicates` — tekshiriladigan ustun(lar) tanlanadi, birinchi uchragan yozuv qoldiriladi, qolganlari o'chiriladi.

### Q11. Top 3 eng yuqori maoshni aniqlash — 2:26
```excel
=LARGE(F2:F100, 1)   ' eng yuqori
=LARGE(F2:F100, 2)   ' 2-o'rin
=LARGE(F2:F100, 3)   ' 3-o'rin
```
Kim ekanini bilish uchun: `=INDEX(B2:B100, MATCH(LARGE($F$2:$F$100,1), F2:F100, 0))`.

### Q12. Maoshi 90 000 dan kam bo'lgan xodimlarning maoshini 10% ga oshirish — 2:34
Yordamchi ustunda:
```excel
=IF(F2<90000, F2*1.1, F2)
```
Yoki `Paste Special → Multiply`: alohida katakchada `1.1` yozib nusxalanadi, shartga mos qatorlar avval filtrlanadi, so'ng `Paste Special → Values → Multiply` bilan faqat tanlangan (filtrlangan) qatorlarga qo'llanadi.

### Q13. Tasdiqlangan kreditlar summasini va eng yuqori qiymatni hisoblash — 2:44
```excel
=SUMIF(Holat2:Holat100, "Tasdiqlangan", Summa2:Summa100)
=MAXIFS(Summa2:Summa100, Holat2:Holat100, "Tasdiqlangan")
```

### Q14. 500 dan katta bo'lgan qiymatlarni sanash — 2:58
```excel
=COUNTIF(F2:F100, ">500")
```

### Q15. Xom ma'lumotlar asosida dashbord yaratish — 3:09
1. Ma'lumotni Excel Table'ga aylantirish (`Ctrl+T`) — avtomatik kengayish uchun.
2. Bir yoki bir nechta Pivot Table bilan asosiy ko'rsatkichlarni (KPI) jamlash (jami sotuv, bo'lim bo'yicha taqsimot va h.k.).
3. Pivot Chart yoki oddiy diagrammalar (ustunli, chiziqli, doiraviy) qo'shish.
4. `Slicer`/`Timeline` orqali interaktiv filtr qo'shish (masalan oy yoki mintaqa bo'yicha).
5. Barcha elementlarni bitta "Dashboard" varag'ida joylashtirib, formatlash (rang, sarlavha, KPI kartochkalari) bilan ko'rgazmali qilish.

---

# Video 6 — Sotuv ma'lumotlari (Sales Data) asosida amaliy topshiriqlar (5 savol)

> **Jadval taxminan:** `Sales Data` varag'ida — `A` Customer ID, `B` Mijoz nomi (bo'sh, VLOOKUP bilan to'ldiriladi), `C` Hudud (Region), `D` Toifa (Category), `E` Sotuv hajmi, `F` Target. `Customer Detail` varag'ida — `A` Customer ID, `B` Mijoz nomi.

### Q1. Mijoz nomini olish (VLOOKUP) — 6:21
Qidiruv ustuni diapazonning birinchi ustuni ekanini va aniq moslik kerakligini tekshiring. Masalan, `=VLOOKUP(A2,'Customer Detail'!A:B,2,FALSE)` ID bo'yicha nomni qaytaradi; topilmagan ID va takroriy IDni alohida test qiling. [Microsoft Support: VLOOKUP](https://support.microsoft.com/en-us/office/vlookup-function-0bbc8083-26fe-4963-8ab8-93a18ad188a1).

**Savol:** Customer ID yordamida Customer Detail varag'idan mijoz nomini Sales Data varag'iga qanday ko'chirish mumkin?
```excel
=VLOOKUP(A2, 'Customer Detail'!A:B, 2, FALSE)
```
`A2` — Sales Data varag'idagi Customer ID; `'Customer Detail'!A:B` — qidiriladigan jadval (birinchi ustunda ID bo'lishi shart); `2` — mijoz nomi joylashgan ustun raqami; `FALSE` — aniq moslik. Boshqa varaqqa ishora qilganda varaq nomi apostrof (`'...'`) bilan yoziladi.

### Q2. Savdo hajmini tahlil qilish (Pivot Table) — 10:51
Manba ustunlarining turi va bo'sh qiymatlarini tekshirib, PivotTable'da `Region`ni Rows, `Category`ni Columns, sotuvni Values/Sum maydoniga qo'ying. Masalan, natija grand total bilan mosligini `=SUM(E:E)` orqali tekshiring va refreshdan keyin qayta solishtiring. [Microsoft Support: PivotTable yaratish](https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576).

**Savol:** Hudud (Region) va toifa (Category) bo'yicha umumiy sotuv hajmini qanday ko'rsatish mumkin?
`Insert → PivotTable` — `Region` maydonini **Rows**'ga, `Category` maydonini **Columns**'ga, `Sotuv hajmi` ustunini **Values** maydoniga (`Sum of Sotuv hajmi`) sudrab tashlash. Natijada har bir hudud-toifa kesishmasida umumiy sotuv summasi jadval ko'rinishida chiqadi (cross-tab).

### Q3. Shartli formatlash: Target bilan solishtirish — 16:22
Qoida diapazonining birinchi qatoriga nisbiy formula yozing va Applies to oralig'ini tekshiring. Masalan, `=E2<F2` qizil, `=E2>=F2` yashil qoida bo'ladi; bo'sh va xato qiymatlar uchun alohida test qatori qo'shing. [Microsoft Support: conditional formatting](https://support.microsoft.com/en-us/office/use-conditional-formatting-to-highlight-information-in-excel-fed60dfa-1d3f-4e13-9ecb-f1951ff89d7f).

**Savol:** Sotuv hajmi maqsadli ko'rsatkichdan (Target) kam bo'lsa qizil, teng yoki yuqori bo'lsa yashil rangda qanday belgilash mumkin?
Sotuv hajmi ustunini (`E2:E100`) tanlab, `Home → Conditional Formatting → New Rule → Use a formula to determine which cells to format`:
```excel
=E2<F2      ' qizil rang uchun qoida (Target'dan kam)
=E2>=F2     ' yashil rang uchun qoida (Target'ga teng yoki undan yuqori)
```
Ikkala qoida ham alohida yaratiladi va har biriga mos fon rangi (Format → Fill) tanlanadi — nisbiy murojaat (`E2`, `F2`, `$` siz) tufayli qoida butun ustunga to'g'ri tarqaladi.

### Q4. Ish faoliyatini baholash (IF) — 20:40
Natija chegarasini biznes qoidasi bilan aniqlab, tenglik holatini ham test qiling. Masalan, `=IF(E2>=F2,"achieve","not achieve")` targetga teng qiymatni muvaffaqiyat deb oladi; formula fill-down qilinganda murojaatlar siljishini tekshiring. [Microsoft Support: IF](https://support.microsoft.com/en-us/office/if-function-69aed7c9-4e8a-4755-a9bc-aa8bbff73be2).

**Savol:** Sotuv ko'rsatkichiga qarab "erishildi" (achieve) yoki "erishilmadi" (not achieve) natijasini ko'rsatadigan yangi ustun qanday yaratiladi?
```excel
=IF(E2>=F2, "achieve", "not achieve")
```
Sotuv hajmi (`E2`) target (`F2`)ga teng yoki undan yuqori bo'lsa — "achieve", aks holda — "not achieve" qaytariladi. Bu ustun keyinchalik Pivot Table yoki `COUNTIF`da (masalan nechta xodim/mintaqa targetga erishgani) ishlatilishi mumkin.

### Q5. Ma'lumotlarni tozalash (Power Query) — 23:19
Transformatsiyani qayta bajariladigan qadamlar sifatida tuzing: data type, Trim/Clean va kerakli kalitlar bo'yicha duplicate removal. Masalan, `Table.Distinct(Table.TransformColumns(Source, {{"Name", Text.Trim}}), {"Customer ID"})` ishlating; duplicate tanlash tartibiga suyanmang va refresh natijasini row count bilan tekshiring. [Microsoft Learn: duplicate qiymatlar](https://learn.microsoft.com/en-us/power-query/working-with-duplicates) va [best practices](https://learn.microsoft.com/en-us/power-query/best-practices).

**Savol:** Tartibsiz ma'lumotlarni (dublikatlar, ortiqcha bo'shliqlar, noto'g'ri ma'lumot turlari) Power Query yordamida qanday tozalash mumkin?
1. `Data → Get & Transform → From Table/Range` — manba jadval Power Query Editor'ga yuklanadi.
2. **Dublikatlarni o'chirish:** kerakli ustun(lar)ni tanlab, `Home → Remove Rows → Remove Duplicates`.
3. **Bo'sh joylarni trim qilish:** matn ustuni tanlab, `Transform → Format → Trim` (boshi/oxiridagi bo'shliqlarni olib tashlaydi) va `Clean` (ko'rinmas boshqaruv belgilarini olib tashlaydi).
4. **Ma'lumot turlarini to'g'rilash:** ustun sarlavhasidagi tur belgisiga bosib (yoki `Transform → Data Type`) — matn ko'rinishidagi sana/raqamlarni haqiqiy Date/Number turiga o'tkazish (masalan matn sifatida saqlangan sonlar `SUM`da hisobga olinmasligi mumkin).
5. `Home → Close & Load` — tozalangan ma'lumot qaytadan Excel jadvaliga yuklanadi; manba o'zgarsa, `Refresh` tugmasi bilan barcha qadamlar avtomatik qayta bajariladi.

---

# Video 7 — Excel asosiy tushunchalar lug'ati (25 savol)

### Q1. Microsoft Excel nima? — 0:21
Microsoft'ning elektron jadval (spreadsheet) dasturi — ma'lumotlarni katakchalarda saqlash, hisob-kitob qilish, tahlil qilish va vizualizatsiya qilish uchun ishlatiladi.

### Q2. Excelda katakchalar (cells) va ishchi varaqlar (worksheets) nima? — 1:00
**Cell** — ustun va qator kesishmasidagi yagona joy (masalan `A1`), ma'lumot yoki formula saqlaydi. **Worksheet** — bir nechta katakchadan tashkil topgan bitta varaq (tab) — workbook ichidagi asosiy ish maydoni.

### Q3. Excel ishchi kitobi (workbook) nima? — 1:35
Bitta `.xlsx` fayl — bir yoki bir nechta worksheetni o'z ichiga oladi.

### Q4. Excel formulalari nima? — 2:09
`=` belgisi bilan boshlanadigan, hisob-kitob natijasini qaytaruvchi ifoda (masalan `=A1+B1*2`).

### Q5. Formula va funksiya o'rtasidagi farq nimada? — 2:47
Formula — har qanday hisob-kitob ifodasi; funksiya — Excelda oldindan tayyorlangan, nomlangan formula (`SUM`, `IF`, `VLOOKUP`). Har bir funksiya formula, lekin har bir formula funksiya emas.

### Q6. Pivot jadval (Pivot table) nima? — 3:24
Katta ma'lumotni bir necha bosishda guruhlash va jamlash (sum/average/count) imkonini beruvchi interaktiv jamlash vositasi — `Insert → PivotTable`.

### Q7. VLOOKUP funksiyasi nima? — 4:00
```excel
=VLOOKUP(A2, Malumotlar!A:D, 3, FALSE)
```
Chapdagi ustun bo'yicha qidirib, belgilangan ustun raqamidan qiymatni tik (vertical) yo'nalishda qaytaradi.

### Q8. HLOOKUP funksiyasi nima? — 4:33
```excel
=HLOOKUP(A2, Malumotlar!A1:F10, 3, FALSE)
```
`VLOOKUP`ga o'xshash, lekin ma'lumot gorizontal (qatorlar bo'yicha) joylashgan bo'lganda ishlatiladi — birinchi qatordan qidirib, belgilangan qator raqamidan qiymat qaytaradi.

### Q9. Shartli formatlash (Conditional formatting) nima? — 5:05
Katakcha qiymati shartga mos kelganda avtomatik rang/shrift qo'llanadigan vosita (`Home → Conditional Formatting`) — muhim qiymatlarni ko'zga tashlanarli qilish uchun.

### Q10. Ma'lumotlarni tasdiqlash (Data validation) nima? — 5:39
`Data → Data Validation` — katakchaga kiritilishi mumkin bo'lgan qiymat turini (ro'yxat, raqam oralig'i, sana) cheklaydi, xato kiritishning oldini oladi.

### Q11. Makroslar (Macros) nima? — 6:11
VBA (Visual Basic for Applications) tilida yozilgan, takrorlanuvchi vazifalarni avtomatlashtiruvchi buyruqlar to'plami — `Developer → Record Macro` orqali qo'l harakatlarini yozib olish yoki VBA kodini qo'lda yozish mumkin.

### Q12. Excelda diagramma (chart) nima? — 6:44
Ma'lumotni grafik ko'rinishda (ustunli, chiziqli, doiraviy va h.k.) tasvirlaydigan vizual vosita — `Insert → Charts`, trend va taqqoslashni tez tushunishga yordam beradi.

### Q13. Freeze panes nima? — 7:17
`View → Freeze Panes` — sarlavha qatori/ustuni scroll qilganda ekranda qotib qolishini ta'minlaydi.

### Q14. Excelda saralash (sorting) nima? — 7:47
`Data → Sort` — bir yoki bir nechta ustun bo'yicha qatorlarni o'sish/kamayish tartibida joylashtirish.

### Q15. Excelda filtrlash (filtering) nima? — 8:13
`Data → Filter` — har bir ustunga shart qo'yib, faqat shu shartga mos qatorlarni ko'rsatish, qolganlarini vaqtincha yashirish.

### Q16. IF funksiyasi nima? — 8:46
```excel
=IF(B2>=50, "pass", "fail")
```
Shart TRUE bo'lsa bitta qiymatni, FALSE bo'lsa boshqasini qaytaradi.

### Q17. CONCATENATE funksiyasi nima? — 9:19
```excel
=CONCATENATE(A2, " ", B2)   ' yoki qisqacha: =A2 & " " & B2
```
Bir nechta matn/katakchani bitta matnga birlashtiradi. Zamonaviy Excelda `CONCAT` yoki `TEXTJOIN` (ajratuvchi bilan) tavsiya etiladi.

### Q18. COUNT funksiyasi nima? — 9:50
```excel
=COUNT(A2:A100)
```
Diapazondagi faqat raqamli qiymatlarni sanaydi (bo'sh yoki matn katakchalar hisobga olinmaydi).

### Q19. SUM funksiyasi nima? — 10:17
```excel
=SUM(A2:A100)
```
Diapazondagi sonlarni yig'indisini hisoblaydi.

### Q20. Nomlangan diapazon (named range) nima? — 10:46
Bitta katakcha yoki diapazonga qulay eslab qolinadigan nom berish (`Formulas → Define Name` yoki Name Box orqali), masalan `Soliq_Foizi`. Formula ichida `A1:A100` o'rniga shu nom ishlatilsa, formula o'qilishi osonlashadi: `=SUM(Sotuvlar)`.

### Q21. Text to columns funksiyasi nima? — 11:13
`Data → Text to Columns` — bitta ustundagi matnni ajratuvchi belgi (vergul, probel) yoki belgilangan kenglik bo'yicha bir nechta ustunga bo'ladi.

### Q22. FlashFill nima? — 11:40
`Ctrl+E` (yoki `Data → Flash Fill`) — foydalanuvchi kiritgan namunadan naqshni avtomatik aniqlab, qolgan qatorlarni formula yozmasdan to'ldiradi.

### Q23. Excelda jadval (table) nima? — 12:08
`Insert → Table` (`Ctrl+T`) — oddiy diapazonni "aqlli" jadvalga aylantiradi: avtomatik kengayadi, strukturaviy havolalar (`Jadval1[Ustun]`) beradi, sarlavha filtri va formatlash o'zi qo'shiladi.

### Q24. Varaqni himoya qilish (protect sheet) nima? — 12:34
`Review → Protect Sheet` — varaqdagi katakchalarni (odatda parol bilan) tahrirlashdan himoya qiladi; oldindan `Format Cells → Protection`da qaysi katakchalar qulflanishini belgilash mumkin.

### Q25. Power Query nima? — 12:59
Excel/Power BI ichidagi ETL (Extract, Transform, Load) vositasi — turli manbalardan (fayl, baza, web) ma'lumot olib, tozalash (dublikat o'chirish, trim, tur to'g'rilash), birlashtirish (merge/append) va avtomatik yangilanadigan (`Refresh`) natija yaratish uchun ishlatiladi.

---
