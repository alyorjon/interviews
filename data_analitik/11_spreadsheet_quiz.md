# 🧪 Spreadsheet Interaktiv Quiz — Self-Test MCQ
### Ikki tilli qo'llanma / Bilingual Reference

> **Daraja / Level:** 🟢 Basic → 🟡 Intermediate → 🔴 Advanced
> **Format:** Har bir savolda 4 variant, faqat bittasi to'g'ri. Javoblarni oldindan ko'rmang — avval yeching! / Each question has 4 options, only one correct. Don't peek at the answer key — attempt first!
> **Javoblar:** Fayl oxirida / **Answers:** at the end of the file

---

## 🟢 Basic (1–10)

**1.** `XLOOKUP` standart holatda qanday moslik turini qidiradi? / What match mode does `XLOOKUP` default to?
A) Wildcard moslik / Wildcard match
B) Taxminiy moslik / Approximate match
C) Aniq moslik (0) / Exact match (0)
D) Noaniq (fuzzy) moslik / Fuzzy match

**2.** `SUMIFS` formulasida birinchi argument sifatida nima yoziladi? / What is written as the first argument in `SUMIFS`?
A) Birinchi shart diapazoni / First criteria_range
B) Yig'indi diapazoni (sum_range) / The sum_range
C) Birinchi shart qiymati / First criteria value
D) Varaq nomi / Sheet reference

**3.** `FILTER` funksiyasi nima qiladi? / What does the `FILTER` function do?
A) Takrorlanuvchi qiymatlarni olib tashlaydi / Removes duplicate values
B) Natijalarni tartiblab beradi / Sorts the results
C) Shartga mos qatorlarni ajratib, natijani avtomatik yoyadi (spill) / Extracts matching rows and spills the result automatically
D) Ikki katakchani birlashtiradi / Merges two cells

**4.** `=TEXTJOIN(" ", TRUE, A2, B2, C2)` dagi `TRUE` argumenti nimani anglatadi? / What does the `TRUE` argument mean in `=TEXTJOIN(" ", TRUE, A2, B2, C2)`?
A) Harf kattaligini farqlash / Distinguish letter case
B) Bo'sh katakchalarni tashlab o'tish / Skip empty cells
C) Formatni saqlab qolish / Preserve formatting
D) Massivni kengaytirish / Expand the array

**5.** `HLOOKUP` qaysi yo'nalishda qidiradi? / In which direction does `HLOOKUP` search?
A) Vertikal, ustunlar bo'yicha / Vertically, down columns
B) Diagonal tarzda / Diagonally
C) Gorizontal, birinchi satr bo'yicha / Horizontally, across the first row
D) Teskari tartibda pastdan yuqoriga / In reverse, bottom to top

**6.** `DATEDIF(A2, TODAY(), "Y")` dagi `"Y"` birligi nimani hisoblaydi? / What does the `"Y"` unit calculate in `DATEDIF(A2, TODAY(), "Y")`?
A) Kunlar sonini / Number of days
B) Haftalar sonini / Number of weeks
C) Oylar sonini / Number of months
D) To'liq o'tgan yillar sonini / Number of full years elapsed

**7.** `IFERROR` funksiyasi nima uchun ishlatiladi? / What is the `IFERROR` function used for?
A) Matnlarni ajratuvchi bilan birlashtirish uchun / To join text with a delimiter
B) Formuladagi xatoni ushlab, o'rniga boshqa qiymat qaytarish uchun / To catch a formula error and return a fallback value instead
C) Ikki sana o'rtasidagi farqni hisoblash uchun / To calculate the difference between two dates
D) Katakcha bo'shligini tekshirish uchun / To check whether a cell is empty

**8.** `LEN(text)` funksiyasi nimani qaytaradi? / What does the `LEN(text)` function return?
A) Matndagi faqat harflar sonini / Only the number of letters in the text
B) Matndagi faqat raqamlar sonini / Only the number of digits in the text
C) Bo'sh joylar bilan birga barcha belgilar sonini / The total number of characters, including spaces
D) Matndagi so'zlar sonini / The number of words in the text

**9.** `FIND` va `SEARCH` funksiyalari orasidagi farq nima? / What is the difference between `FIND` and `SEARCH`?
A) `SEARCH` harf kattaligini farqlaydi, `FIND` farqlamaydi / `SEARCH` is case-sensitive, `FIND` is not
B) `FIND` harf kattaligini farqlaydi (case-sensitive), `SEARCH` esa farqlamaydi va wildcard qo'llab-quvvatlaydi / `FIND` is case-sensitive, `SEARCH` is not and supports wildcards
C) Ikkalasi ham harf kattaligini farqlamaydi / Neither is case-sensitive
D) Ikkalasi ham bir xil ishlaydi / Both behave identically

**10.** `NETWORKDAYS(A2, B2, Holidays!A2:A10)` nimani hisoblaydi? / What does `NETWORKDAYS(A2, B2, Holidays!A2:A10)` calculate?
A) Ikki sana orasidagi barcha kalendar kunlarini / All calendar days between two dates
B) Faqat dam olish kunlarini / Only the weekend days
C) Dam olish va bayram kunlarini chiqarib tashlab, ish kunlari sonini / Working days between two dates, excluding weekends and holidays
D) Ikki sana orasidagi oylar sonini / The number of months between two dates

---

## 🟡 Intermediate (11–20)

**11.** Google Sheets `QUERY` funksiyasi qanday sintaksisdan foydalanadi? / What syntax does the Google Sheets `QUERY` function use?
A) Python sintaksisidan / Python syntax
B) Regex qoidalaridan / Regex rules
C) Google Visualization API tili (SQL ga o'xshash) / Google Visualization API Query Language (SQL-like)
D) Xom JavaScript kodidan / Raw JavaScript code

**12.** `IMPORTRANGE` funksiyasi birinchi marta ishlatilganda foydalanuvchidan nima talab qilinadi? / What is required the first time `IMPORTRANGE` is used?
A) Formulani ikki marta kiritish / Entering the formula twice
B) "Allow Access" (ruxsat berish) tugmasini bosish / Clicking "Allow Access" once
C) Faylni qaytadan yuklash / Re-uploading the file
D) Internetni o'chirib-yoqish / Toggling the internet connection

**13.** `ARRAYFORMULA` nima uchun ishlatiladi? / What is `ARRAYFORMULA` used for?
A) Faqat bitta katakchani formatlash uchun / Only to format a single cell
B) Formulani pastga tortmasdan bitta katakchadan butun ustunga qo'llash uchun / To apply a formula across an entire column from one cell, without dragging down
C) Faylni himoyalash uchun / To protect the file
D) Grafik chizish uchun / To draw a chart

**14.** Shartli formatlashda (Conditional Formatting) butun satrni bo'yash uchun ustun harfi oldiga qanday belgi qo'yiladi (masalan `=$C2="Overdue"`)? / To highlight a whole row in Conditional Formatting, what symbol is placed before the column letter (e.g. `=$C2="Overdue"`)?
A) `#` belgisi / The `#` symbol
B) `&` belgisi / The `&` symbol
C) `$` belgisi / The `$` symbol
D) `@` belgisi / The `@` symbol

**15.** `REGEXMATCH(A2, "^\+998[0-9]{9}$")` nima turdagi qiymat qaytaradi? / What type of value does `REGEXMATCH(A2, "^\+998[0-9]{9}$")` return?
A) Mos kelgan matn qismini / The matching substring
B) `TRUE` yoki `FALSE` qiymatini / A `TRUE` or `FALSE` value
C) Mos kelishlar sonini / A count of matches
D) Sana qiymatini / A date value

**16.** `BYROW` funksiyasi nima qiladi? / What does the `BYROW` function do?
A) Ustunlarni birlashtiradi / Merges columns
B) Qatorlarni tasodifiy aralashtiradi / Randomly shuffles rows
C) `LAMBDA` funksiyasini massivning har bir satriga alohida qo'llaydi / Applies a `LAMBDA` function to each row of an array individually
D) Xatoliklarni avtomatik tuzatadi / Automatically fixes errors

**17.** `SEQUENCE(100, 1, 1, 1)` nimani hosil qiladi? / What does `SEQUENCE(100, 1, 1, 1)` generate?
A) Tasodifiy sonlar to'plamini / A set of random numbers
B) Ko'rsatilgan qadam bilan ketma-ket sonlar diapazonini / A sequential range of numbers with the specified step
C) Sana ro'yxatini / A list of dates
D) Matn massivini / An array of text

**18.** Power Query da `Merge Queries` amali SQL dagi nimaga o'xshaydi? / In Power Query, what does `Merge Queries` resemble in SQL?
A) `UNION` operatoriga / `UNION`
B) `GROUP BY` operatoriga / `GROUP BY`
C) `JOIN` operatoriga (jadvallarni yonma-yon ulaydi) / `JOIN` (joins tables horizontally)
D) `ORDER BY` operatoriga / `ORDER BY`

**19.** CAGR formulasi `(End_Value / Start_Value)^(1 / Years) - 1` qaysi uchta elementga tayanadi? / The CAGR formula `(End_Value / Start_Value)^(1 / Years) - 1` relies on which three elements?
A) Boshlang'ich qiymat, oxirgi qiymat va yillar soni / Start value, end value, and number of years
B) Daromad va xarajat farqi / Revenue and expense difference
C) Foiz stavkasi va inflyatsiya / Interest rate and inflation
D) Sana va valyuta kursi / Date and exchange rate

**20.** `NPV(rate, value1, [value2], ...)` funksiyasi qanday kiritma talab qiladi? / What inputs does `NPV(rate, value1, [value2], ...)` require?
A) Faqat pul oqimlari qiymatlarini / Only the cash flow values
B) Diskontlash stavkasini va pul oqimlari qiymatlarini / A discount rate and the cash flow values
C) Faqat boshlang'ich investitsiya summasini / Only the initial investment amount
D) Sana oralig'ini va foiz stavkasini / A date range and an interest rate

---

## 🔴 Advanced (21–30)

**21.** Z-Score bo'yicha qanday qiymat ekstremal anomaliya (outlier) hisoblanadi? / What Z-Score value is considered an extreme outlier?
A) `ABS(Z) > 1` bo'lsa / When `ABS(Z) > 1`
B) `ABS(Z) > 2` bo'lsa / When `ABS(Z) > 2`
C) `ABS(Z) > 3` bo'lsa / When `ABS(Z) > 3`
D) `Z = 0` bo'lsa / When `Z = 0`

**22.** `XLOOKUP` da `search_mode = -1` parametri nima qiladi? / What does the `search_mode = -1` parameter do in `XLOOKUP`?
A) So'rovni tezlashtiradi, natijaga ta'sir qilmaydi / Speeds up the query without affecting the result
B) Wildcard qidiruvni yoqadi / Enables wildcard searching
C) Teskari tartibda (oxiridan boshlab) qidirib, oxirgi mos qiymatni topadi / Searches in reverse (last-to-first), finding the last match
D) Xatoni avtomatik yashiradi / Automatically hides errors

**23.** Yordamchi ustunsiz ko'p shartli `XLOOKUP` qidiruvida (`XLOOKUP(1, (Range1=Criteria1) * (Range2=Criteria2), Return_Range)`) shartlar orasida qaysi operator ishlatiladi? / In a helper-column-free multi-criteria `XLOOKUP` (`XLOOKUP(1, (Range1=Criteria1) * (Range2=Criteria2), Return_Range)`), which operator combines the conditions?
A) Qo'shish (`+`) operatori / The addition (`+`) operator
B) Ko'paytirish (`*`) operatori / The multiplication (`*`) operator
C) Bo'lish (`/`) operatori / The division (`/`) operator
D) Taqqoslash (`>`) operatori / The comparison (`>`) operator

**24.** `=UNIQUE(FILTER(A2:A100, COUNTIF(A2:A100, A2:A100)>1))` formulasi nimani bajaradi? / What does `=UNIQUE(FILTER(A2:A100, COUNTIF(A2:A100, A2:A100)>1))` accomplish?
A) Ro'yxatni alfavit bo'yicha tartiblaydi / Sorts the list alphabetically
B) Bo'sh katakchalarni olib tashlaydi / Removes empty cells
C) Ro'yxatda takrorlangan qiymatlarni ajratib oladi / Extracts values that are duplicated in the list
D) Faqat sonlarni filtrlaydi / Filters only numeric values

**25.** `SCAN(initial_value, array, lambda)` funksiyasi nimani hisoblaydi? / What does the `SCAN(initial_value, array, lambda)` function compute?
A) Massivning statik yakuniy yig'indisini, bitta natija sifatida / A single static total for the whole array
B) Massiv bo'ylab o'suvchi (kumulyativ) oraliq natijalarni / A cumulative running result across the array
C) Faqat massiv o'rtachasini / Only the array's average
D) Massiv o'lchamini o'zgartiradi / Reshapes the array's dimensions

**26.** `TAKE` va `DROP` funksiyalari orasidagi farq nima? / What is the difference between the `TAKE` and `DROP` functions?
A) Ikkalasi ham bir xil natija beradi / Both produce identical results
B) `TAKE` faqat matn ustunlarida ishlaydi / `TAKE` only works on text columns
C) `DROP` yangi massiv yaratadi, `TAKE` esa hech narsa qaytarmaydi / `DROP` creates a new array while `TAKE` returns nothing
D) `TAKE` ko'rsatilgan N ta satr/ustunni oladi, `DROP` esa N tasini massivdan chiqarib tashlaydi / `TAKE` keeps the specified N rows/columns, while `DROP` removes N of them from the array

**27.** `VSTACK` va `HSTACK` funksiyalari orasidagi farq nima? / What is the difference between `VSTACK` and `HSTACK`?
A) `VSTACK` gorizontal, `HSTACK` vertikal birlashtiradi / `VSTACK` combines horizontally, `HSTACK` vertically
B) `VSTACK` jadvallarni vertikal (ustma-ust), `HSTACK` esa gorizontal (yonma-yon) birlashtiradi / `VSTACK` stacks tables vertically, `HSTACK` combines them side-by-side
C) Ikkalasi ham xuddi shu funksiyaning boshqa nomi / They are just alternate names for the same function
D) Faqat bitta massiv bilan ishlaydi, ikkinchisi kerak emas / Only one array is needed, the second is ignored

**28.** `#SPILL!` xatosi qachon yuzaga keladi? / When does the `#SPILL!` error occur?
A) Formulada matn xatosi bo'lganda / When there's a text typo in the formula
B) Dinamik massiv natijasi yoyiladigan (spill range) katakchalarda boshqa ma'lumot to'sqinlik qilganda / When a Dynamic Array's spill range is blocked by data in adjacent destination cells
C) Internet aloqasi uzilganda / When the internet connection drops
D) Katakcha noto'g'ri formatlanganda / When a cell has the wrong number format

**29.** `SLN` va `DB` amortizatsiya funksiyalari orasidagi farq nima? / What is the difference between the `SLN` and `DB` depreciation functions?
A) `SLN` kamayib boruvchi, `DB` to'g'ri chiziqli usulda hisoblaydi / `SLN` uses a declining method, `DB` uses straight-line
B) Ikkalasi ham har doim bir xil natija beradi / Both always give the same result
C) `SLN` to'g'ri chiziqli amortizatsiyani, `DB` esa kamayib boruvchi qoldiq usulida amortizatsiyani hisoblaydi / `SLN` calculates straight-line depreciation, `DB` calculates declining-balance depreciation
D) `DB` faqat ko'chmas mulk uchun ishlatiladi / `DB` only applies to real estate

**30.** `=MAX(0, MIN(End1, End2) - MAX(Start1, Start2) + 1)` formulasi nimani hisoblaydi va qaysi funksiyalarga tayanadi? / What does `=MAX(0, MIN(End1, End2) - MAX(Start1, Start2) + 1)` calculate, and which functions does it rely on?
A) `SUM` va `AVERAGE` funksiyalariga tayanib jami sotuvni hisoblaydi / Relies on `SUM` and `AVERAGE` to compute total sales
B) `COUNT` va `IF` funksiyalariga tayanib bo'sh katakchalarni sanaydi / Relies on `COUNT` and `IF` to count empty cells
C) `INDEX` va `MATCH` funksiyalariga tayanib qiymat qidiradi / Relies on `INDEX` and `MATCH` to look up a value
D) `MAX` va `MIN` funksiyalariga tayanib ikki sana oralig'ining ustma-ust tushgan (overlap) kunlarini hisoblaydi / Relies on `MAX` and `MIN` to compute the overlapping days between two date ranges

---

## ✅ Javoblar / Answer Key

| # | Javob | # | Javob | # | Javob |
|---|---|---|---|---|---|
| 1 | C | 11 | C | 21 | C |
| 2 | B | 12 | B | 22 | C |
| 3 | C | 13 | B | 23 | B |
| 4 | B | 14 | C | 24 | C |
| 5 | C | 15 | B | 25 | B |
| 6 | D | 16 | C | 26 | D |
| 7 | B | 17 | B | 27 | B |
| 8 | C | 18 | C | 28 | B |
| 9 | B | 19 | A | 29 | C |
| 10 | C | 20 | B | 30 | D |

**Natijangizni baholang / Score yourself:**
- 27–30 to'g'ri: Ekspert daraja 🏆 / Expert level
- 21–26 to'g'ri: Ilg'or daraja 🔴 / Advanced level
- 14–20 to'g'ri: O'rta daraja 🟡 / Intermediate level
- <14 to'g'ri: `02_spreadsheet_basics.md` ni qayta ko'rib chiqing 🟢 / Review `02_spreadsheet_basics.md`

---

*Tayyorlagan / Prepared by: Alyorjon | interactive_quiz_tester agenti asosida*
