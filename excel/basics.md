# 📊 101 Most Popular Excel Formulas — Bilingual Reference / Ikki tilli qo'llanma

> **Manba / Source:** *101 Most Popular Excel Formulas* by John Michaloudis & Bryan Hong (MyExcelOnline)
> **Tillar / Languages:** O'zbek 🇺🇿 | English 🇬🇧
> **Maqsad / Goal:** Excel formulalarini tez esga olish uchun qisqacha konspekt / Quick reference for Excel formulas

---

## 📌 0. Formula Tips — Foydali maslahatlar

> Formulalar bilan ishlashdan oldin bilishga arzigulik amaliy texnikalar / Practical techniques worth knowing before diving into formulas

| Mavzu / Topic | O'zbek / Uzbek | English |
|---|---|---|
| **The Function Wizard** | Qaysi formulani ishlatishni bilmasangiz, Excelning `Insert Function` (fx) sehrgaridan foydalanib mos formulani topishingiz mumkin | Use Excel's Insert Function Wizard (fx) to find the right formula for your purpose |
| **F9 to Evaluate a Formula** | Formulaning bir qismini belgilab **F9** tugmasini bosib, o'sha qismning natijasini alohida ko'rish va xatoni topish mumkin | Select part of a formula and press **F9** to see its intermediate result and debug errors |
| **Named Ranges** | Katak yoki diapazonga tavsifli nom berish (`Formulas > Define Name`) formulalarni tushunarli va o'qishga qulay qiladi | Give a cell or range a descriptive name (`Formulas > Define Name`) to make formulas cleaner and easier to read |
| **Absolute & Relative References** | `$` belgisi qator/ustunni "qulflaydi" (absolyut, `$A$1`) — nusxalanganda o'zgarmaydi; nisbiy havola (`A1`, `$` siz) nusxalanganda siljiydi. **F4** tugmasi bilan almashtiriladi | The `$` sign locks a row/column (absolute, `$A$1`) so it stays fixed when copied; a relative reference (`A1`) shifts. Toggle with **F4** |
| **Evaluate Formulas Step By Step** | `Formulas > Evaluate Formula` vositasi murakkab formulani qismlarga bo'lib, har bir bosqichda qanday hisoblanishini ko'rsatadi | `Formulas > Evaluate Formula` breaks a complex formula into steps and shows how each part resolves |
| **Highlight All Excel Formula Cells** | `Home > Find & Select > Go To Special > Formulas` orqali varaqdagi barcha formula bor kataklarni bir zumda topib, rangda belgilash mumkin | Use `Go To Special > Formulas` to instantly find and highlight every cell containing a formula |
| **How to Convert Formulas to Values** | `Copy` va `Paste Special > Values` yordamida formula natijasini statik qiymat sifatida qoldirish mumkin (formula yo'qoladi, natija qoladi) | Copy the cell(s) and use `Paste Special > Values` to keep only the result, removing the formula |
| **How to Show & Hide Formulas in Excel** | **Ctrl + `** (grave accent) tugmasi bosilganda barcha kataklardagi formulalar (natija o'rniga) ko'rinadi; qayta bosilganda yashiriladi | Press **Ctrl + `** to toggle between showing formula text and showing calculated results in all cells |
| **Jump to a Cell Reference in a Formula** | Formulani tahrirlash rejimida havolani belgilab **F5** (yoki **Ctrl+[**) tugmasini bosib, o'sha katakka to'g'ridan-to'g'ri o'tish mumkin | While editing a formula, select a reference and press **F5** (or **Ctrl+[**) to jump straight to that cell |

---

## 📌 1. LOOKUP FUNCTIONS — Qidiruv funksiyalari

| Formula | O'zbek / Uzbek | English | Misol / Example |
|---|---|---|---|
| `ADDRESS(row_num, column_num, [abs_num], [a1], [sheet_text])` | Qator va ustun raqami asosida katak manzilini (matn ko'rinishida) yaratadi | Creates a cell reference (as text) from row and column numbers | `=ADDRESS(1,1,1)` → `"$A$1"` |
| `CHOOSE(index_num, value1, [value2], ...)` | Berilgan ro'yxatdan indeks raqami bo'yicha aniq qiymatni tanlaydi | Selects a specific value from a list based on its index number | `=CHOOSE(2,"apple","orange","grapes","lemon")` → `"orange"` |
| `HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])` | Jadvalning birinchi qatorida qiymatni qidirib, mos ustundagi boshqa qatordan (pastdan) natija qaytaradi | Searches the first row of a table and returns a value from the same column, a specified number of rows down | `=HLOOKUP("Television",A8:D10,2,FALSE)` → `$150` |
| `HYPERLINK(link_location, [friendly_name])` | Veb-sahifa, fayl yoki katakka o'tish uchun havola (link) yaratadi | Creates a clickable shortcut to a webpage, file, or cell reference | `=HYPERLINK("https://myexcelonline.com","MyExcelOnline")` |
| `INDEX(array, row_num, [column_num])` | Jadval/diapazondan qator va ustun raqami bo'yicha katak qiymatini qaytaradi | Returns a cell's value from within a table/range using row and column numbers | `=INDEX(C16:E19,2,2)` → `$652` |
| `INDEX(array, MATCH(lookup_value, lookup_array, [match_type]))` | `MATCH` yordamida qiymatning pozitsiyasini topib, `INDEX` orqali boshqa ustundan mos qiymatni qaytaradi — `VLOOKUP` dan moslashuvchanroq (chapga ham qidira oladi) | Combines `MATCH` (finds position) with `INDEX` (returns value) — a more flexible alternative to `VLOOKUP` that can also look left | `=INDEX(B13:B17,MATCH("Tablet",C13:C17,0))` → `TAB698` |
| `INDIRECT(ref_text, [a1])` | Matn ko'rinishidagi manzilni haqiqiy katak havolasiga aylantiradi | Converts a text string into an actual cell reference | `=INDIRECT("D10")` → D10 katakning qiymati |
| `LOOKUP(lookup_value, lookup_vector, [result_vector])` | Bir qatorli/bir ustunli diapazon yoki massivdan qiymatni qidiradi (eng oddiy lookup funksiyasi) | Looks up a value in a one-row or one-column range or array (simplest lookup function) | `=LOOKUP(10000,C9:C14,D9:D14)` → `18%` |
| `MATCH(lookup_value, lookup_array, [match_type])` | Diapazon ichida qiymat/matnning nechinchi o'rinda (pozitsiyada) turganini qaytaradi | Returns the relative position of a value within a range | `=MATCH("Tablet",C12:C16,0)` → `3` |
| `VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])` | Jadvalning birinchi ustunida qiymatni qidirib, o'sha qatordagi boshqa (o'ngdagi) ustundan natija qaytaradi — Excelning eng ko'p ishlatiladigan funksiyasi | Searches the first column of a table and returns a value from the same row in another column to the right — Excel's most-used function | `=VLOOKUP("Laptop",B14:D17,2,FALSE)` → `$185` |

```
Muhim / Note: VLOOKUP faqat o'ngga qarab qidiradi va lookup ustuni birinchi bo'lishi kerak.
range_lookup=FALSE (yoki 0) → aniq moslik / exact match
range_lookup=TRUE (yoki bo'sh) → taqribiy moslik, saralangan jadval talab qiladi / approximate match, requires sorted data
```

---

## 📌 2. LOGICAL FUNCTIONS — Mantiqiy funksiyalar

| Formula | O'zbek / Uzbek | English | Misol / Example |
|---|---|---|---|
| `AND(logical1, [logical2], ...)` | Barcha shartlar bajarilsagina `TRUE` qaytaradi | Returns `TRUE` only if all conditions are met | `=AND(MONTH("1/01/18")=1,1500>1000)` → `TRUE` |
| `IF(logical_test, value_if_true, value_if_false)` | Shart bajarilsa bir qiymat, bajarilmasa boshqa qiymatni qaytaradi | Returns one value if a condition is true, another if false | `=IF(D15>3000,"Bonus","No Bonus")` → `"No Bonus"` |
| `IFERROR(value, value_if_error)` | Formula xatolik bersa, siz belgilagan qiymatni qaytaradi (xato o'rniga) | Returns a value you specify if the formula results in an error | `=IFERROR(0/0,0)` → `0` |
| `OR(logical1, [logical2], ...)` | Shartlardan hech bo'lmasa bittasi bajarilsa `TRUE` qaytaradi | Returns `TRUE` if at least one condition is met | `=OR(MONTH(C9)=1,1500>1000)` → `TRUE` |

---

## 📌 3. MATH FUNCTIONS — Matematik funksiyalar

| Formula | O'zbek / Uzbek | English | Misol / Example |
|---|---|---|---|
| `COUNT(value1, [value2], ...)` | Faqat sonlar bo'lgan kataklar sonini hisoblaydi | Counts cells that contain numbers | `=COUNT(C9:C12)` → `2` |
| `COUNTA(value1, [value2], ...)` | Bo'sh bo'lmagan (matn, son, sana) kataklar sonini hisoblaydi | Counts non-empty cells (text, numbers, dates) | `=COUNTA(B9:C12)` → `6` |
| `COUNTBLANK(range)` | Bo'sh kataklar sonini hisoblaydi | Counts blank/empty cells | `=COUNTBLANK(B9:C12)` → `3` |
| `COUNTIF(range, criteria)` | Bitta shartga mos keladigan kataklar sonini hisoblaydi | Counts cells that match a single condition | `=COUNTIF(A9:A12,">2")` → `3` |
| `COUNTIFS(range1, criteria1, [range2, criteria2], ...)` | Bir nechta shartga mos keladigan kataklar sonini hisoblaydi | Counts cells that match multiple conditions | `=COUNTIFS(A9:A13,"John",C9:C13,">10000")` → `2` |
| `MOD(number, divisor)` | Ikki sonni bo'lgandagi qoldiqni qaytaradi | Returns the remainder after dividing one number by another | `=MOD(15,4)` → `3` |
| `%` (Percentage operator) | Foizni hisoblash uchun — alohida funksiya emas, `%` operatoridan foydalaniladi (son foizi, o'zgarish foizi, ulush) | Not a dedicated function — the `%` operator computes a number's percentage, percentage change, or proportion of a total | `=75%*100` → `75` |
| `RAND()` | 0 va 1 orasida tasodifiy kasr son qaytaradi | Returns a random decimal number between 0 and 1 | `=RAND()` → `0.1510...` |
| `RANDBETWEEN(bottom, top)` | Siz belgilagan ikki son orasida tasodifiy butun son qaytaradi | Returns a random integer between two numbers you specify | `=RANDBETWEEN(10,10000)` → `2852` |
| `ROUND(number, num_digits)` | Sonni siz ko'rsatgan xonagacha yaxlitlaydi | Rounds a number to a specified number of digits | `=ROUND(1.234567,2)` → `1.23` |
| `SUBTOTAL(function_num, ref1)` | Ro'yxat yoki bazada oraliq natija (yig'indi, o'rtacha va h.k.) qaytaradi, filtrlangan qatorlarni hisobga oladi | Returns a subtotal (sum, average, etc.) in a list or database, respecting filtered rows | `=SUBTOTAL(9,B2:B9)` → `$1,945` |
| `SUMIF(range, criteria, [sum_range])` | Bitta shartga mos keluvchi qiymatlarning yig'indisini hisoblaydi | Sums values in a range that meet a single criteria | `=SUMIF(D15:D23,">3000")` → `$17,435` |
| `SUMIFS(sum_range, criteria_range1, criteria1, ...)` | Bir nechta shartga mos keluvchi qiymatlarning yig'indisini hisoblaydi | Sums values that meet multiple criteria | `=SUMIFS(D15:D23,B15:B23,"john",C15:C23,"north")` → `$7,631` |
| `SUMPRODUCT(array1, [array2], [array3], ...)` | Mos massivlarning ko'paytmalari yig'indisini qaytaradi; murakkab shartli hisob-kitoblarda keng qo'llaniladi | Returns the sum of the products of corresponding arrays; widely used for complex multi-criteria calculations | `=SUMPRODUCT(C14:C17,D14:D17)/SUM(C14:C17)` → o'rtacha narx / average price |

---

## 📌 4. STATISTICAL FUNCTIONS — Statistik funksiyalar

| Formula | O'zbek / Uzbek | English | Misol / Example |
|---|---|---|---|
| `AVERAGE(number1, [number2], ...)` | Qiymatlar guruhining o'rtacha arifmetigini beradi | Returns the average of a group of values | `=AVERAGE(1,2,3,4)` → `2.5` |
| `LARGE(array, k)` | Diapazondagi *n*-chi eng katta qiymatni oladi | Gets the *n*-th largest value from a range | `=LARGE(C9:C12,3)` → `60` |
| `MAX(number1, [number2], ...)` | Diapazondagi eng katta qiymatni beradi | Returns the largest value in a range | `=MAX(60,55,100,89)` → `100` |
| `MEDIAN(number1, [number2], ...)` | Sonlar to'plamidagi o'rtacha (median) qiymatni beradi | Returns the middle value in a set of numbers | `=MEDIAN(60,55,100,89)` → `74.5` |
| `MIN(number1, [number2], ...)` | Diapazondagi eng kichik qiymatni beradi | Returns the smallest value in a range | `=MIN(60,55,100,89)` → `55` |
| `SMALL(array, k)` | Diapazondagi *n*-chi eng kichik qiymatni oladi | Gets the *n*-th smallest value from a range | `=SMALL(C9:C12,3)` → `89` |

---

## 📌 5. DATE & TIME FUNCTIONS — Sana va vaqt funksiyalari

| Formula | O'zbek / Uzbek | English | Misol / Example |
|---|---|---|---|
| `DATE(year, month, day)` | Yil, oy, kun asosida sana yaratadi | Creates a date from year, month, and day values | `=DATE(1985,1,3)` → `"1/03/85"` |
| `DATEDIF(start_date, end_date, unit)` | Ikki sana orasidagi kun/oy/yil sonini hisoblaydi (`"d"`, `"m"`, `"y"`) | Calculates the number of days, months, or years between two dates (`"d"`, `"m"`, `"y"`) | `=DATEDIF("5/18/80","11/28/18","m")` → `462` |
| `DATEVALUE(date_text)` | Matn ko'rinishidagi sanani Excelning sana-seriya raqamiga aylantiradi | Converts a text date into Excel's date serial number | `=DATEVALUE("December 12, 2018")` → `43446` |
| `DAY(serial_number)` | Sanadan kun (1-31) qiymatini ajratib oladi | Extracts the day (1-31) from a date | `=DAY("4/11/85")` → `11` |
| `DAYS360(start_date, end_date, [method])` | Har bir oyni 30 kun deb hisoblab, ikki sana orasidagi kunlar sonini beradi | Returns the number of days between two dates, treating each month as 30 days | `=DAYS360("1/01/18","12/31/18")` → `360` |
| `DAYS(end_date, start_date)` | Ikki sana orasidagi kunlar sonini beradi | Returns the number of days between two dates | `=DAYS("12/31/18","1/01/18")` → `364` |
| `EOMONTH(start_date, months)` | Berilgan sanadan necha oy o'tgandan keyingi oyning oxirgi kunini qaytaradi | Returns the last day of the month, a specified number of months before/after a start date | `=EOMONTH("1/13/15",1)` → `"2/28/15"` |
| `HOUR(serial_number)` | Vaqtdan soat qiymatini ajratib oladi | Extracts the hour from a time value | `=HOUR("6:00 PM")` → `18` |
| `MONTH(serial_number)` | Sanadan oy qiymatini ajratib oladi | Extracts the month from a date | `=MONTH("4/11/85")` → `4` |
| `NETWORKDAYS(start_date, end_date, [holidays])` | Ikki sana orasidagi ish kunlari sonini (dam olish kunlari va bayramlarsiz) hisoblaydi | Returns the number of working days between two dates, excluding weekends and holidays | `=NETWORKDAYS("1/01/18","1/07/18",A9:A11)` |
| `TODAY()` | Bugungi sanani qaytaradi (avtomatik yangilanadi) | Returns today's date (auto-updates) | `=TODAY()` → `"11/29/2018"` |
| `WEEKDAY(serial_number, [return_type])` | Sananing hafta kunini raqam sifatida qaytaradi (standart bo'yicha 1=yakshanba) | Returns the day of the week as a number (1=Sunday by default) | `=WEEKDAY("5/18/85",1)` → `7` |
| `WEEKNUM(serial_number, [return_type])` | Sanadan yilning necha-nchi haftasi ekanini qaytaradi | Returns the week number of the year for a date | `=WEEKNUM("4/11/1985")` → `15` |
| `WORKDAY(start_date, days, [holidays])` | Sanaga belgilangan ish kunlari sonini qo'shib/ayirib, kelajak/o'tgan sanani topadi | Adds/subtracts a number of workdays to a date to get a future/past date | `=WORKDAY("2/12/2010",10)` → `"2/26/2010"` |
| `YEAR(serial_number)` | Sanadan yil qiymatini ajratib oladi | Extracts the year from a date | `=YEAR("4/11/85")` → `1985` |

---

## 📌 6. TEXT FUNCTIONS — Matn funksiyalari

| Formula | O'zbek / Uzbek | English | Misol / Example |
|---|---|---|---|
| `CLEAN(text)` | Matndan chop etilmaydigan (nonprintable) belgilarni olib tashlaydi | Removes all nonprintable characters from text | `=CLEAN(A1)` |
| `CONCATENATE(text1, [text2], ...)` | Ikki yoki undan ortiq matnni bitta matn qatoriga birlashtiradi | Joins two or more text strings into one | `=CONCATENATE("Hello"," ","World")` → `"Hello World"` |
| `EXACT(text1, text2)` | Ikki matnni katta-kichik harflarga sezgir tarzda solishtiradi | Compares two texts in a case-sensitive way to check if they're identical | `=EXACT("EXCEL","ExCEL")` → `FALSE` |
| `FIND(find_text, within_text, [start_num])` | Bir matn ichida boshqa matnning joylashgan o'rnini (registrga sezgir) topadi | Finds the position of one text within another (case-sensitive) | `=FIND("x","Excel",1)` → `2` |
| `LEFT(text, [num_chars])` | Matnning boshidan siz belgilagan sondagi belgilarni oladi | Returns the first N characters from the left of a text string | `=LEFT("19281013-2",8)` → `"19281013"` |
| `LEN(text)` | Matn qatoridagi belgilar sonini beradi | Returns the number of characters in a text string | `=LEN("John Michaloudis")` → `16` |
| `LOWER(text)` | Matndagi barcha harflarni kichik harfga aylantiradi | Converts all characters in text to lowercase | `=LOWER("EXCEL ROCKS!")` → `"excel rocks!"` |
| `MID(text, start_num, num_chars)` | Matnning o'rtasidan, belgilangan pozitsiyadan boshlab, aniq sondagi belgini oladi | Extracts a specific number of characters from the middle of a text string | `=MID("How are you?",5,3)` → `"are"` |
| `PROPER(text)` | Har bir so'zning birinchi harfini bosh harfga, qolganini kichik harfga aylantiradi | Capitalizes the first letter of each word, lowercases the rest | `=PROPER("STUART POWELL")` → `"Stuart Powell"` |
| `REPLACE(old_text, start_num, num_chars, new_text)` | Matnning belgilangan pozitsiyasidagi qismini boshqa matn bilan almashtiradi (pozitsiya bo'yicha) | Replaces part of a text string (by position) with new text | `=REPLACE("+1-817-0000000",1,FIND("-","+1-817-0000000"),"")` → `"817-0000000"` |
| `RIGHT(text, [num_chars])` | Matnning oxiridan siz belgilagan sondagi belgilarni oladi | Returns the last N characters from the right of a text string | `=RIGHT("6018 Libero St. 38390",5)` → `"38390"` |
| `SEARCH(find_text, within_text, [start_num])` | Bir matn ichida boshqa matnning o'rnini topadi (registrga sezgir emas, `*` `?` joker belgilarni qo'llab-quvvatlaydi) | Finds the position of text within another text (case-insensitive, supports wildcards `*` `?`) | `=SEARCH("excel","Excel with excel 2019",1)` → `1` |
| `SUBSTITUTE(text, old_text, new_text, [instance_num])` | Matn ichidagi eski qismni yangi matn bilan almashtiradi (matn mazmuni bo'yicha qidiradi, pozitsiya emas) | Substitutes new text for old text within a string (searches by content, not position) | `=SUBSTITUTE("C97-27-JT","-","#",2)` → `"C97-27#JT"` |
| `TRIM(text)` | Matndagi ortiqcha bo'shliqlarni olib tashlaydi, so'zlar orasida faqat bitta probel qoldiradi | Removes extra spaces from text, leaving only single spaces between words | `=TRIM("  Excel   Rocks  ")` → `"Excel Rocks"` |
| `UPPER(text)` | Matndagi barcha harflarni katta harfga aylantiradi | Converts all characters in text to uppercase | `=UPPER("Excel Rocks!")` → `"EXCEL ROCKS!"` |
| `VALUE(text)` | Matn ko'rinishidagi sonni haqiqiy raqamli qiymatga aylantiradi | Converts a text string that represents a number into an actual numeric value | `=VALUE("11/29/18")` → `43433` |
| `ISBLANK(value)` | Katak bo'sh yoki bo'sh emasligini tekshiradi | Checks whether a cell is empty | `=ISBLANK("abc")` → `FALSE` |
| `ISERROR(value)` | Katak qiymati xato ekanligini tekshiradi | Checks whether a cell's value is an error | `=ISERROR(0/0)` → `TRUE` |
| `ISNUMBER(value)` | Katak qiymati son ekanligini tekshiradi | Checks whether a cell's value is numeric | `=ISNUMBER(12.5)` → `TRUE` |
| `ISTEXT(value)` | Katak qiymati matn ekanligini tekshiradi | Checks whether a cell's value is text | `=ISTEXT("abc")` → `TRUE` |
| `TYPE(value)` | Katak qiymatining ma'lumot turini qaytaradi (1=raqam, 2=matn, 4=mantiqiy va h.k.) | Returns the data type of a cell's value (1=number, 2=text, 4=logical, etc.) | `=TYPE(FALSE)` → `4` |

---

## 📌 7. OTHER FUNCTIONS — Moliyaviy funksiyalar

| Formula | O'zbek / Uzbek | English | Misol / Example |
|---|---|---|---|
| `FV(rate, nper, pmt, [pv])` — Compound Interest | Boshlang'ich investitsiyaning murakkab foiz (compound interest) bilan kelajakdagi qiymatini hisoblaydi | Calculates the future value of an initial investment with compound interest | `=FV(0.1,2,0,1000*-1)` → `$1,210` |
| `FV(rate, nper, pmt, [pv])` — Monthly Investment | Har oy qo'shilib boriladigan mablag' bilan investitsiyaning kelajakdagi qiymatini hisoblaydi | Calculates the future value of an investment with regular monthly contributions | `=FV(0.1/12,2*12,500,0)*-1` → `$13,223.46` |

---

## 📌 8. EXCEL 2019 — Yangi funksiyalar

| Formula | O'zbek / Uzbek | English | Misol / Example |
|---|---|---|---|
| `CONCAT(text1, [text2], ...)` | Matnlar ro'yxatini ayiruvchisiz birlashtiradi (`CONCATENATE`ning yangilangan versiyasi, diapazonlarni ham qabul qiladi) | Joins a list of text values without a delimiter (modern replacement for `CONCATENATE`, accepts ranges) | `=CONCAT("Hello"," ","World")` → `"Hello World"` |
| `IFS(logical_test1, value_if_true1, ...)` | Bir nechta shartni tekshirib, birinchi `TRUE` bo'lgan shartning qiymatini qaytaradi (ichma-ich `IF` lardan qutqaradi) | Checks multiple conditions and returns the value for the first `TRUE` one (avoids nested `IF`s) | `=IFS(10000<8456,13%,10000<15874,18%,10000>=15874,22%)` → `18%` |
| `MAXIFS(max_range, criteria_range1, criteria1, ...)` | Berilgan shart(lar)ga mos keluvchi kataklar orasidan eng katta qiymatni oladi | Returns the max value among cells that match given criteria | `=MAXIFS(D9:D13,C9:C13,"John")` → `$3,500` |
| `MINIFS(min_range, criteria_range1, criteria1, ...)` | Berilgan shart(lar)ga mos keluvchi kataklar orasidan eng kichik qiymatni oladi | Returns the min value among cells that match given criteria | `=MINIFS(D9:D13,C9:C13,"John")` → `$1,500` |
| `SWITCH(expression, value1, result1, ...)` | Ifodani bir nechta qiymat bilan solishtirib, mos kelgan birinchisining natijasini qaytaradi | Matches an expression against multiple values and returns the result for the first match | `=SWITCH(3,1,"Bad",2,"Average",3,"Great","Unknown")` → `"Great"` |
| `TEXTJOIN(delimiter, ignore_empty, text1, ...)` | Matnlar ro'yxatini siz belgilagan ayiruvchi (delimiter) bilan birlashtiradi, bo'sh kataklarni o'tkazib yuborish imkoniyati bilan | Joins a list of texts with a specified delimiter, with an option to ignore empty cells | `=TEXTJOIN(",",TRUE,"Hello","World")` → `"Hello,World"` |

---

## 📌 9. OFFICE 365 — Dinamik massiv (Dynamic Array) funksiyalari

| Formula | O'zbek / Uzbek | English | Misol / Example |
|---|---|---|---|
| `FILTER(array, include, [if_empty])` | Berilgan shartga mos keluvchi qatorlarni jadvaldan ajratib (filtrlab) chiqaradi | Filters a range/array to return only rows matching a condition | `=FILTER(C9:D14,D9:D14>0.33,"")` |
| `RANDARRAY([rows],[columns],[min],[max],[whole_number])` | Siz belgilagan o'lcham va minimum/maksimum oralig'ida tasodifiy sonlar massivini yaratadi | Creates an array of random numbers with the size and min/max range you specify | `=RANDARRAY(6,2,0,1)` |
| `SEQUENCE(rows, [columns], [start], [step])` | Ketma-ket sonlardan (boshlang'ich qiymat va qadam bilan) massiv yaratadi | Creates an array of sequential numbers, with a chosen start value and step | `=SEQUENCE(6,2,0,2)` → juft sonlar / even numbers |
| `SORT(array, [sort_index], [sort_order])` | Jadvalni siz ko'rsatgan ustun va tartib bo'yicha saralaydi | Sorts a range/array by a specified column and order | `=SORT(C9:D14,2,-1)` |
| `SORTBY(array, by_array1, sort_order1, ...)` | Jadvalni boshqa bir yoki bir nechta massiv/ustun qiymatlari asosida saralaydi | Sorts a range/array based on the values in one or more other arrays | `=SORTBY(B9:D14,B9:B14,1,D9:D14,1)` |
| `UNIQUE(array)` | Ro'yxatdan faqat noyob (takrorlanmagan) qiymatlarni ajratib chiqaradi | Returns only the unique (non-duplicate) values from a list | `=UNIQUE(C9:C14)` |

---

## 📌 10. ADVANCED FORMULAS — Ilg'or formula texnikalari

| Texnika / Technique | O'zbek / Uzbek | English | Misol / Example |
|---|---|---|---|
| **3D Formulas** | Bir xil tuzilishga ega bir nechta varaqlardagi ma'lumotlarni bitta formula bilan birlashtirish | Consolidates data across multiple sheets with the same layout using one formula | `=SUM(MARKETING:ADMIN!C13)` |
| **ARRAY Formulas** | Bitta amalni butun massiv/diapazon ustida bajaradigan formula; **CTRL+SHIFT+ENTER** bilan kiritiladi va `{}` qavslar bilan ko'rsatiladi | A formula that operates on an entire array/range at once; entered with **CTRL+SHIFT+ENTER**, shown with `{}` braces | `{=MAX(D13:D16-C13:C16)}` |
| **BETWEEN** | Excelda alohida `BETWEEN` funksiyasi yo'q; qiymat ikki chegara orasida ekanini `AND` yordamida tekshirish mumkin | Excel has no dedicated `BETWEEN` function; use `AND` to check if a value falls within a range | `=AND(B1>=1,B1<=10)` |
| **Extract First Name from Full Name** | `LEFT` va `FIND` funksiyalarini birlashtirib, to'liq ismdan faqat ismni (probelgacha) ajratib oladi | Combines `LEFT` and `FIND` to extract just the first name (up to the space) from a full name | `=LEFT("John Michaloudis",FIND(" ","John Michaloudis")-1)` |
| **Extract Last Name (REPLACE)** | `REPLACE` va `SEARCH` funksiyalarini birlashtirib, ismni o'chirib, faqat familiyani qoldiradi | Combines `REPLACE` and `SEARCH` to strip out the first name, leaving only the last name | `=REPLACE("Bryan Hong",1,SEARCH(" ","Bryan Hong"),"")` → `"Hong"` |
| **GETPIVOTDATA** | Pivot jadvaldagi ma'lumotni maydon va element nomlari bo'yicha to'g'ridan-to'g'ri chaqirib oladi | Extracts data directly from a Pivot Table by field and item names | `=GETPIVOTDATA("SALES",A1,"SALES REGION","AMERICAS")` |
| **IF Combined With AND** | `IF` shartini bir nechta shart bilan (`AND` ichida) tekshirib, hammasi bajarilgandagina `TRUE` natija beradi | Nests `AND` inside `IF` so the `TRUE` result only fires when every sub-condition is met | `=IF(AND(1092>3000,"North"="north"),"Bonus","No Bonus")` → `"No Bonus"` |
| **INDEX-MATCH 2 Criteria with Validation** | `INDEX-MATCH` ni Data Validation ro'yxati va `INDIRECT` bilan birlashtirib, ikkita shart bo'yicha qidiruv qiladi | Combines `INDEX-MATCH` with a Data Validation dropdown and `INDIRECT` to look up by two criteria | `=INDEX(INDIRECT("Table1["&$H$14&"]"),MATCH(G14,Table1[SALES REP],0))` |
| **Match Two Lists With MATCH** | Ikkita ro'yxatni solishtirib, bir ro'yxatdagi elementning ikkinchisida qayerda turganini `MATCH` bilan topadi | Uses `MATCH` to compare two lists and find where an item from one list appears in the other | `=MATCH(C12,list2!C12:C21,0)` |
| **Named Ranges with VLOOKUP** | `VLOOKUP` formulasida katak manzili o'rniga nomlangan diapazondan foydalanib, formulani o'qishga qulay qiladi | Uses a named range instead of a cell address in `VLOOKUP` to make the formula easier to read | `=VLOOKUP("Laptop",StockList,2,FALSE)` |
| **REPT** | Berilgan matnni siz ko'rsatgan sonda takrorlaydi (masalan mini-diagramma yasashda foydali) | Repeats given text a specified number of times (handy for building mini in-cell charts) | `=REPT("a",3)` → `"aaa"` |
| **Sum a Range Using INDEX** | `SUM` va `INDEX` ni birlashtirib, jadvalning butun bir ustunini (Row_Num=0) yig'indisini oladi | Combines `SUM` and `INDEX` (with Row_Num left blank/0) to sum an entire column of a table | `=SUM(INDEX(B9:D18,0,3))` |
| **SUMPRODUCT: Sum Multiple Criteria** | Bir nechta shartni (har birini `*` bilan ko'paytirib) bittada tekshirib, mos qiymatlarning yig'indisini hisoblaydi — `SUMIFS` yetarli bo'lmagan murakkab holatlar uchun | Multiplies several criteria arrays together to sum matching values in one formula — useful where `SUMIFS` falls short | `=SUMPRODUCT((B15:B23="john")*(C15:C23="north")*D15:D23)` |
| **SUMPRODUCT: Sum the Top 3 Sales** | `SUMPRODUCT` ichida `LARGE` funksiyasidan foydalanib, shartga mos eng yuqori 3 ta qiymatning yig'indisini oladi | Nests `LARGE` inside `SUMPRODUCT` to sum the top 3 values that match a condition | `{=SUMPRODUCT(LARGE((C15:C23="north")*(D15:D23),{1,2,3}))}` |
| **TIME – Get Elapsed Time** | Ikki vaqt qiymati orasidagi farqni `TEXT` funksiyasi bilan "soat:daqiqa" formatida ko'rsatadi (24 soatdan oshsa ham to'g'ri hisoblaydi) | Uses `TEXT` to display the difference between two time values as "hours:minutes", correctly handling totals over 24 hours | `=TEXT("1/25/2015 8:18PM"-"1/24/2015 7:48PM","[h]:mm")` → `"24:30"` |
| **TRANSPOSE** | Vertikal diapazonni gorizontalga (yoki aksincha) aylantiradi; massiv formulasi sifatida kiritiladi | Flips a vertical range to horizontal (or vice versa); entered as an array formula | `{=TRANSPOSE(A9:B13)}` |
| **VLOOKUP Approximate Match** | `VLOOKUP` ning oxirgi argumentini `TRUE` qilib, aniq emas, eng yaqin qiymatni qidiradi (masalan soliq stavkasi jadvali) | Sets `VLOOKUP`'s last argument to `TRUE` to find the closest match instead of an exact one (e.g. tax bracket tables) | `=VLOOKUP(8500,Tax_Rate,2,TRUE)` |
| **VLOOKUP with a Drop Down List** | Data Validation ro'yxatidagi tanlangan qiymatni `VLOOKUP` ning `lookup_value` argumentiga bog'laydi | Links a Data Validation dropdown's selected value to `VLOOKUP`'s `lookup_value` argument | `=VLOOKUP("Keyboard",B14:D17,2,FALSE)` |
| **VLOOKUP Multiple Columns** | Massiv konstantasi (`{2,3}` kabi) yordamida `VLOOKUP` dan bir nechta ustun qiymatini bir vaqtda olib, `SUM` bilan yig'adi | Uses an array constant (like `{2,3}`) so `VLOOKUP` returns several columns at once, summed together | `{=SUM(VLOOKUP("Laptop",B14:D17,{2,3},FALSE))}` |
| **VLOOKUP with Multiple Criteria** | `&` (birlashtirish) operatori bilan bir nechta ustunni bitta "yordamchi kalit"ga birlashtirib, `VLOOKUP` orqali bir nechta shart bo'yicha qidiradi | Concatenates several columns into one helper key with `&`, letting `VLOOKUP` search on multiple criteria | `=VLOOKUP("Nate Harris"&"HR",C:D,2,FALSE)` |

---

## 📌 11. PRACTICAL EXAMPLE — Xodim maoshini INDEX+MATCH bilan topish

> **Vaziyat / Scenario:** Xodimlar ro'yxati bor — A ustunda ID (101, 102...), B ustunda Ism (Ali, Vali, Laylo...), C ustunda Maosh (500$, 700$, 600$...). Maqsad: Ism bo'yicha (B ustuni) Maoshni (C ustuni) topish.

| Qadam / Step | O'zbek / Uzbek | English |
|---|---|---|
| 1 | Natija chiqishi kerak bo'lgan bo'sh katakni tanlang | Select the empty cell where the result should appear |
| 2 | Formulani kiriting: `=INDEX(C2:C10, MATCH("Vali", B2:B10, 0))` | Enter the formula: `=INDEX(C2:C10, MATCH("Vali", B2:B10, 0))` |
| 3 | Matnli qismni katak havolasiga almashtiring (ismni masalan E1 katagiga yozib): `=INDEX(C2:C10, MATCH(E1, B2:B10, 0))` | Replace the hardcoded text with a cell reference (type the name in, e.g., E1): `=INDEX(C2:C10, MATCH(E1, B2:B10, 0))` |

**Formulaning ishlash mantig'i / How it works:**
- `MATCH(E1, B2:B10, 0)` — "Vali" ismini `B2:B10` oralig'idan qidiradi va u nechinchi qatorda turganini aniqlaydi (natija: `2`) | Searches for "Vali" within `B2:B10` and finds its relative position (result: `2`)
- `INDEX(C2:C10, 2)` — `C2:C10` oralig'idagi 2-o'rindagi qiymatni qaytaradi (Vali oladigan maosh) | Returns the value at position 2 within `C2:C10` (the salary Vali earns)

**Asosiy afzalliklari / Key advantages:**
- **Moslashuvchanlik / Flexibility** — qidirilayotgan ustun jadvalning istalgan joyida (chapda yoki o'ngda) bo'lishidan qat'i nazar ishlayveradi | Works regardless of whether the lookup column is to the left or right of the result column
- **Xavfsizlik / Robustness** — jadvalga yangi ustun qo'shilsa yoki o'chirilsa ham formula buzilmaydi (`VLOOKUP`da ustun raqami o'zgarganda xatolik berishi mumkin) | Stays intact even if columns are added or removed (`VLOOKUP`'s hardcoded column number can break)

---

## 💡 Eslatmalar / Notes

> **🔑 Eng ko'p so'raladigan intervyu formulalari / Most commonly asked in interviews:**
> - `VLOOKUP` / `INDEX-MATCH` — ma'lumotni boshqa jadvaldan izlash / looking up data across tables
> - `SUMIF(S)` / `COUNTIF(S)` — shartli hisob-kitoblar / conditional aggregation
> - `IF` / `IFS` / `IFERROR` — mantiqiy shartlar va xatolarni boshqarish / conditional logic and error handling
> - `SUMPRODUCT` — `SUMIFS` yetarli bo'lmagan murakkab shartli yig'indilar uchun / for complex multi-criteria sums where `SUMIFS` isn't enough
> - Dinamik massiv funksiyalari (`FILTER`, `UNIQUE`, `SORT`) — Excel 365'ning zamonaviy standarti / the modern Excel 365 standard

> **⚠️ Keng tarqalgan xatolar / Common pitfalls:**
> - `VLOOKUP` faqat o'ngga qarab qidiradi — chapga qidirish uchun `INDEX-MATCH` ishlating / `VLOOKUP` only looks right — use `INDEX-MATCH` to look left
> - `range_lookup` argumentini unutmang — `TRUE`/bo'sh holat noto'g'ri (taqribiy) natija berishi mumkin / don't forget `range_lookup` — `TRUE`/blank can silently return an approximate match
> - Massiv formulalarini (`{}`) qo'lda yozib bo'lmaydi — **CTRL+SHIFT+ENTER** bilan kiritilishi kerak / array formula braces `{}` can't be typed manually — enter with **CTRL+SHIFT+ENTER**
> - `INDIRECT` "volatile" (har o'zgarishda qayta hisoblanadi) va varaq nomi o'zgarsa buziladi / `INDIRECT` is volatile (recalculates on every change) and breaks if a referenced sheet is renamed

---

*Tayyorlagan / Prepared by: Alyorjon | Manba / Source: 101 Most Popular Excel Formulas by John Michaloudis & Bryan Hong (PDF)*
