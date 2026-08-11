# 🧪 Excel Formulas Interaktiv Quiz — Self-Test MCQ
### Ikki tilli qo'llanma / Bilingual Reference

> **Manba / Source:** *101 Most Popular Excel Formulas* by John Michaloudis & Bryan Hong
> **Daraja / Level:** 🟢 Basic → 🟡 Intermediate → 🔴 Advanced
> **Format:** Har bir savolda 4 variant, faqat bittasi to'g'ri. Javoblarni oldindan ko'rmang — avval yeching! / Each question has 4 options, only one correct. Don't peek at the answer key — attempt first!
> **Javoblar:** Fayl oxirida / **Answers:** at the end of the file

---

## 🟢 Basic (1–10)

**1.** `VLOOKUP` funksiyasi qaysi yo'nalishda qidiradi? / Which direction does `VLOOKUP` search in?
A) Faqat chapga / Only left
B) Faqat o'ngga, birinchi ustunda qidirib / Only right, searching in the first column
C) Ikkala tomonga ham / Both directions
D) Faqat pastga / Only downward

**2.** `COUNT` va `COUNTA` orasidagi farq nima? / What's the difference between `COUNT` and `COUNTA`?
A) Farq yo'q / No difference
B) `COUNT` faqat sonli kataklarni, `COUNTA` bo'sh bo'lmagan (matn ham) kataklarni sanaydi / `COUNT` counts only numeric cells, `COUNTA` counts all non-empty cells (including text)
C) `COUNTA` faqat sonlarni sanaydi / `COUNTA` only counts numbers
D) `COUNT` matnlarni ham sanaydi / `COUNT` also counts text

**3.** `=IF(D15>3000,"Bonus","No Bonus")` formulasi nima qiladi? / What does this `IF` formula do?
A) D15 har doim 3000dan katta deb hisoblaydi / Always assumes D15 is greater than 3000
B) D15 3000dan katta bo'lsa "Bonus", aks holda "No Bonus" qaytaradi / Returns "Bonus" if D15>3000, otherwise "No Bonus"
C) D15 qiymatini o'zgartiradi / Changes the value of D15
D) Xatolik beradi / Throws an error

**4.** `SUM` va `SUMIF` orasidagi farq? / Difference between `SUM` and `SUMIF`?
A) Farq yo'q / No difference
B) `SUM` barcha qiymatlarni, `SUMIF` faqat shartga mos qiymatlarni yig'adi / `SUM` adds all values, `SUMIF` adds only values matching a condition
C) `SUMIF` faqat matnlar uchun / `SUMIF` only works on text
D) `SUM` faqat 2 ta katak uchun ishlaydi / `SUM` only works with 2 cells

**5.** `LEFT`, `RIGHT`, `MID` funksiyalari nima uchun ishlatiladi? / What are `LEFT`, `RIGHT`, `MID` used for?
A) Kataklarni saralash uchun / Sorting cells
B) Matndan belgilangan qismini (boshidan, oxiridan, o'rtasidan) ajratib olish uchun / Extracting part of a text string (from the start, end, or middle)
C) Sonlarni yaxlitlash uchun / Rounding numbers
D) Kataklarni birlashtirish uchun / Merging cells

**6.** `=TODAY()` funksiyasi nimani qaytaradi? / What does `=TODAY()` return?
A) Faylning yaratilgan sanasini / The file's creation date
B) Joriy tizim sanasini, avtomatik yangilanadigan / The current system date, auto-updating
C) Doim bir xil qattiq kodlangan sanani / A fixed hard-coded date
D) Vaqtni ham qaytaradi / It also returns the time

**7.** `ROUND(1.234567, 2)` natijasi nima? / What is the result of `ROUND(1.234567, 2)`?
A) `1.2` 
B) `1.23`
C) `1.234`
D) `1`

**8.** `CONCATENATE` funksiyasi nima qiladi? / What does `CONCATENATE` do?
A) Sonlarni ko'paytiradi / Multiplies numbers
B) Ikki yoki undan ortiq matnni bitta matn qatoriga birlashtiradi / Joins two or more text strings into one
C) Matnni bo'lib tashlaydi / Splits text apart
D) Kataklarni taqqoslaydi / Compares cells

**9.** `$A$1` kabi manzildagi `$` belgisi nimani anglatadi? / What does the `$` sign mean in a reference like `$A$1`?
A) Valyuta formatini / Currency formatting
B) Absolyut havola — nusxalanganda qator/ustun o'zgarmaydi / Absolute reference — the row/column stays fixed when copied
C) Xatolikni bildiradi / Indicates an error
D) Katak bo'sh ekanini bildiradi / Indicates the cell is empty

**10.** `TRIM` funksiyasi nima qiladi? / What does the `TRIM` function do?
A) Matnni bosh harfga aylantiradi / Capitalizes text
B) Matndagi ortiqcha bo'shliqlarni olib tashlaydi, so'zlar orasida bittadan qoldiradi / Removes extra spaces, leaving single spaces between words
C) Matnni qisqartiradi (belgilarni o'chiradi) / Truncates text (deletes characters)
D) Sonlarni yaxlitlaydi / Rounds numbers

---

## 🟡 Intermediate (11–20)

**11.** `VLOOKUP` da `range_lookup=FALSE` (yoki `0`) qachon ishlatiladi? / When is `range_lookup=FALSE` (or `0`) used in `VLOOKUP`?
A) Taqribiy moslik kerak bo'lganda / When an approximate match is needed
B) Aniq (exact) moslik kerak bo'lganda / When an exact match is needed
C) Jadval saralangan bo'lishi shart bo'lganda / When the table must be sorted
D) Hech qachon ishlatilmaydi / Never used

**12.** `INDEX-MATCH` ning `VLOOKUP` ga nisbatan asosiy afzalligi nima? / What's the main advantage of `INDEX-MATCH` over `VLOOKUP`?
A) Tezroq yozish mumkin / It's shorter to type
B) Faqat sonlar bilan ishlaydi / It only works with numbers
C) Qidiruv ustunidan chapdagi ustundan ham natija qaytara oladi / It can return a value from a column to the *left* of the lookup column
D) Farqi yo'q, ikkalasi bir xil / No difference, they're identical

**13.** `COUNTIFS` funksiyasi nima uchun kerak? / What is `COUNTIFS` used for?
A) Bitta shartga mos kataklarni sanash uchun / Counting cells matching a single condition
B) Bir nechta shartga bir vaqtda mos keladigan kataklarni sanash uchun / Counting cells that match multiple conditions at once
C) Faqat matnli kataklarni sanash uchun / Counting only text cells
D) Kataklarni yig'indisini olish uchun / Summing cells

**14.** `IFERROR(0/0, 0)` formulasi nima qaytaradi va nima uchun? / What does `IFERROR(0/0, 0)` return and why?
A) `#DIV/0!` xatosini, chunki IFERROR xatoni yashira olmaydi / `#DIV/0!`, because IFERROR can't suppress this error
B) `0`, chunki `0/0` xato beradi va IFERROR uni belgilangan qiymatga almashtiradi / `0`, because `0/0` errors out and IFERROR replaces it with the fallback value
C) Bo'sh qiymat / A blank value
D) `#N/A` xatosi / `#N/A` error

**15.** `SUMPRODUCT` funksiyasi asosan nima uchun ishlatiladi? / What is `SUMPRODUCT` mainly used for?
A) Faqat ikkita sonni ko'paytirish uchun / Just multiplying two numbers
B) Mos massivlarning ko'paytmalari yig'indisini olish, ko'pincha `SUMIFS` yetmagan murakkab shartli hisoblarda / Summing the products of corresponding arrays — often for complex multi-criteria calculations `SUMIFS` can't handle
C) Kataklarni saralash uchun / Sorting cells
D) Matnni birlashtirish uchun / Joining text

**16.** `DATEDIF` funksiyasida `"m"` interval kodi nimani bildiradi? / What does the `"m"` interval code mean in `DATEDIF`?
A) Daqiqalar sonini / Number of minutes
B) Ikki sana orasidagi to'liq oylar sonini / The number of complete months between two dates
C) Millisekundlarni / Milliseconds
D) Bozor kunlarini / Market days

**17.** `NETWORKDAYS` funksiyasi nimani hisoblab beradi? / What does `NETWORKDAYS` calculate?
A) Barcha kunlarni, dam olish kunlari bilan birga / All days, including weekends
B) Ikki sana orasidagi ish kunlarini (dam olish va bayramlarsiz) / Working days between two dates, excluding weekends and holidays
C) Faqat dam olish kunlarini / Only weekends
D) Soatlar sonini / Number of hours

**18.** `LARGE(array, 3)` nima qiladi? / What does `LARGE(array, 3)` do?
A) Massivdagi eng katta 3 ta qiymatni yig'adi / Sums the top 3 values
B) Massivdagi 3-chi eng katta qiymatni qaytaradi / Returns the 3rd largest value in the array
C) Massivni 3 ga bo'ladi / Divides the array by 3
D) Massivdagi 3-chi eng kichik qiymatni qaytaradi / Returns the 3rd smallest value

**19.** `TEXTJOIN` ning `CONCATENATE`/`CONCAT` dan asosiy farqi nima? / What's the main difference between `TEXTJOIN` and `CONCATENATE`/`CONCAT`?
A) Farqi yo'q / No difference
B) `TEXTJOIN` ayiruvchi (delimiter) belgilash va bo'sh kataklarni o'tkazib yuborish imkonini beradi / `TEXTJOIN` lets you specify a delimiter and optionally skip empty cells
C) `TEXTJOIN` faqat sonlar uchun ishlaydi / `TEXTJOIN` only works with numbers
D) `CONCATENATE` diapazonlarni qabul qiladi, `TEXTJOIN` qabul qilmaydi / `CONCATENATE` accepts ranges, `TEXTJOIN` doesn't

**20.** `IFS` funksiyasi qanday muammoni hal qiladi? / What problem does `IFS` solve?
A) U `SUM` o'rnini bosadi / It replaces `SUM`
B) Ko'p sonli ichma-ich `IF` formulalarni bitta o'qilishi oson formulaga almashtiradi / It replaces deeply nested `IF` formulas with one readable formula
C) Faqat matn bilan ishlaydi / It only works with text
D) Sonlarni yaxlitlaydi / It rounds numbers

---

## 🔴 Advanced (21–30)

**21.** Massiv formulasini (Array Formula) qanday kiritish kerak? / How do you enter an Array Formula?
A) Oddiy Enter bilan / With a plain Enter
B) **CTRL+SHIFT+ENTER** bilan, natijada `{}` qavslar paydo bo'ladi / With **CTRL+SHIFT+ENTER**, which wraps the formula in `{}` braces
C) Tab tugmasi bilan / With the Tab key
D) `{}` qavslarni qo'lda yozib / By typing the `{}` braces manually

**22.** `FILTER` funksiyasi (Office 365 dinamik massiv) nima qiladi? / What does the `FILTER` function (Office 365 dynamic array) do?
A) Kataklarni ranglarga bo'yaydi / Colors cells
B) Berilgan shartga mos qatorlarni jadvaldan avtomatik ajratib chiqaradi / Automatically extracts rows from a table that match a given condition
C) Faqat bitta katakni qaytaradi / Returns only a single cell
D) Jadvalni pivot jadvalga aylantiradi / Converts a table into a Pivot Table

**23.** `UNIQUE` funksiyasi nima qiladi? / What does the `UNIQUE` function do?
A) Ro'yxatni saralaydi / Sorts a list
B) Ro'yxatdan faqat takrorlanmagan (noyob) qiymatlarni ajratib chiqaradi / Returns only the distinct (non-duplicate) values from a list
C) Ro'yxatdagi takrorlangan qiymatlarni sanaydi / Counts duplicate values in a list
D) Ro'yxatni teskari tartibga qo'yadi / Reverses the list order

**24.** `SORT` va `SORTBY` funksiyalari orasidagi farq? / Difference between `SORT` and `SORTBY`?
A) Farqi yo'q / No difference
B) `SORT` massivni o'zining bir ustuniga qarab, `SORTBY` esa boshqa (tashqi) massiv/ustun qiymatlariga qarab saralaydi / `SORT` sorts an array by one of its own columns; `SORTBY` sorts it based on values in a separate (external) array/column
C) `SORTBY` faqat matnlar uchun ishlaydi / `SORTBY` only works with text
D) `SORT` faqat pastga qarab saralaydi / `SORT` can only sort descending

**25.** `GETPIVOTDATA` funksiyasi nima uchun ishlatiladi? / What is `GETPIVOTDATA` used for?
A) Yangi Pivot Table yaratish uchun / Creating a new Pivot Table
B) Mavjud Pivot Table dan maydon va element nomlari bo'yicha ma'lumot chiqarib olish uchun / Extracting data from an existing Pivot Table by field and item names
C) Pivot Table ni o'chirish uchun / Deleting a Pivot Table
D) Pivot Table ni Excel jadvaliga aylantirish uchun / Converting a Pivot Table into an Excel Table

**26.** Nega `VLOOKUP` o'rniga ba'zan `INDEX-MATCH` afzal ko'riladi katta jadvallarda? / Why is `INDEX-MATCH` sometimes preferred over `VLOOKUP` on large tables?
A) `INDEX-MATCH` har doim tezroq va ustun qo'shilganda/o'chirilganda buzilmaydi (ustun raqami emas, havola ishlatadi) / `INDEX-MATCH` is generally more robust — it references columns rather than hardcoding a column number, so it survives inserted/deleted columns
B) `INDEX-MATCH` faqat matnlar bilan ishlaydi / `INDEX-MATCH` only works with text
C) `VLOOKUP` massiv formulasi talab qiladi / `VLOOKUP` requires an array formula
D) Farqi yo'q, ikkalasi bir xil ishlaydi / No difference, they behave identically

**27.** `{=SUMPRODUCT(LARGE((C15:C23="north")*(D15:D23),{1,2,3}))}` formulasi nima qiladi? / What does this `SUMPRODUCT` + `LARGE` formula do?
A) "north" mintaqasidagi barcha savdolarni yig'adi / Sums all sales in the "north" region
B) "north" mintaqasidagi eng yuqori 3 ta savdo qiymatining yig'indisini oladi / Sums the top 3 sales values specifically within the "north" region
C) "north" so'zi nechta marta uchraganini sanaydi / Counts how many times "north" appears
D) Xatolik qaytaradi / Returns an error

**28.** `EOMONTH("1/13/15", 1)` natijasi nima? / What does `EOMONTH("1/13/15", 1)` return?
A) `"1/13/15"` — o'zgarmaydi / `"1/13/15"` — unchanged
B) `"2/28/15"` — bir oy keyingi oyning oxirgi kuni / `"2/28/15"` — the last day of the month one month later
C) `"1/31/15"` — joriy oyning oxiri / `"1/31/15"` — end of the current month
D) `"12/31/14"` — bir oy oldingi oy / `"12/31/14"` — one month earlier

**29.** `INDIRECT` funksiyasi bilan bog'liq asosiy xavf nima? / What's a key risk when using `INDIRECT`?
A) U hech qachon xato bermaydi / It never returns errors
B) "Volatile" funksiya (har o'zgarishda qayta hisoblanadi) va manzil matn sifatida saqlanganligi uchun varaq nomi o'zgarsa yoki noto'g'ri yozilsa formulani jimgina buzadi / It's a "volatile" function (recalculates on every change) and since the reference is stored as text, a renamed sheet or typo silently breaks the formula
C) Faqat sonlar bilan ishlaydi / It only works with numbers
D) Faqat bitta varaqda ishlaydi / It only works within a single sheet

**30.** `VLOOKUP` da bir nechta shart bo'yicha qidirish uchun keng qo'llaniladigan usul? / A common technique to search on multiple criteria with `VLOOKUP`?
A) `VLOOKUP` ni ikki marta chaqirish shart / You must call `VLOOKUP` twice
B) `&` operatori bilan bir nechta ustunni bitta "yordamchi kalit"ga birlashtirib, o'sha kalit bo'yicha qidirish / Concatenate several columns into one helper key using `&`, then look up on that combined key
C) Bu imkonsiz, faqat `INDEX-MATCH` bilan bajarish mumkin / It's impossible — only `INDEX-MATCH` can do this
D) `VLOOKUP` avtomatik ravishda bir nechta shartni qo'llab-quvvatlaydi / `VLOOKUP` natively supports multiple criteria out of the box

---

## ✅ Javoblar / Answer Key

| # | Javob | # | Javob | # | Javob |
|---|---|---|---|---|---|
| 1 | B | 11 | B | 21 | B |
| 2 | B | 12 | C | 22 | B |
| 3 | B | 13 | B | 23 | B |
| 4 | B | 14 | B | 24 | B |
| 5 | B | 15 | B | 25 | B |
| 6 | B | 16 | B | 26 | A |
| 7 | B | 17 | B | 27 | B |
| 8 | B | 18 | B | 28 | B |
| 9 | B | 19 | B | 29 | B |
| 10 | B | 20 | B | 30 | B |

**Natijangizni baholang / Score yourself:**
- 27–30 to'g'ri: Ekspert daraja 🏆 / Expert level
- 21–26 to'g'ri: Ilg'or daraja 🔴 / Advanced level
- 14–20 to'g'ri: O'rta daraja 🟡 / Intermediate level
- <14 to'g'ri: `01_excel_basics.md` ni qayta ko'rib chiqing 🟢 / Review `01_excel_basics.md`

---

*Tayyorlagan / Prepared by: Alyorjon | Manba / Source: 101 Most Popular Excel Formulas by John Michaloudis & Bryan Hong*
