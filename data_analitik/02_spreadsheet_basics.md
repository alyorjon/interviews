# 📊 Excel 2021 & Google Sheets Master Guide — 100 Real-World Interview Questions & Answers
### Ikki tilli mukammal qo'llanma / Comprehensive Bilingual Reference (English 🇬🇧 & O'zbek 🇺🇿)

> **Darajalar / Levels:** 🟢 Basic (1–25) | 🟡 Intermediate (26–55) | 🔴 Advanced (56–80) | ⚫ Expert (81–100)  
> **Tillar / Languages:** English 🇬🇧 + O'zbek 🇺🇿  
> **Maqsad / Goal:** Financial Analyst, Data Analyst, BI Specialist va Excel/Google Sheets mutaxassislari uchun real intervyu savollari, har bir formulaning batafsil izohi, sintaksisi va amaliy misollari.

---

# 📚 CHUQUR NAZARIYA VA FORMULLAR SINTAKSISI MASTERCLASS

---

## 1. 🟢 Modern Lookup & Reference Formulas (Qidiruv va Murojaat Formullari)

### 1.1 XLOOKUP (Excel 2021+ & Google Sheets)
- **Sintaksis / Syntax:** `=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])`
- **EN:** XLOOKUP is the modern replacement for VLOOKUP and HLOOKUP. It searches in any direction (left or right), defaults to exact match, supports wildcards, and handles missing values directly via `if_not_found`.
- **UZB:** XLOOKUP — VLOOKUP va HLOOKUP o'rnini bosuvchi zamonaviy formula. U har qanday yo'nalishda (chapga ham) qidiradi, standart holatda aniq moslikni topadi va topilmagan holat uchun `if_not_found` matnini beradi.

---

# 🟢 PART 1: CORE FORMULAS & LOOKUP FUNCTIONS (Q1 – Q25)

---


## Q1. XLOOKUP va VLOOKUP o'rtasidagi 5 ta asosiy farq va sintaksis izohi | 5 Key differences between XLOOKUP and VLOOKUP

**EN:**
1. **Lookup Direction:** VLOOKUP searches only left-to-right. XLOOKUP searches in any direction (left or right).
2. **Default Match Mode:** VLOOKUP defaults to approximate match (`TRUE`). XLOOKUP defaults to exact match (`0`).
3. **Column Insertion Safety:** VLOOKUP breaks if columns are inserted due to hardcoded column index numbers (`col_index_num`). XLOOKUP uses range references that adapt automatically.
4. **Error Handling:** XLOOKUP includes built-in `[if_not_found]` parameter, eliminating `IFERROR()`.
5. **Array Returns:** XLOOKUP can return an entire row or multiple columns in a single formula.

**UZB:**
1. **Qidiruv Yo'nalishi:** VLOOKUP faqat chapdan o'ngga qidiradi. XLOOKUP esa chapga ham, o'ngga ham qidiradi.
2. **Standart Moslik:** VLOOKUP taxminiy moslikdan foydalanadi. XLOOKUP standart holatda aniq moslikni (`Exact Match`) qidiradi.
3. **Ustun Qo'shish Xavfsizligi:** VLOOKUP ustun indeksi soni kiritilgani uchun yangi ustun qo'shilsa buziladi. XLOOKUP dinamik diapazonga tayonadi.
4. **Xatoni Boshqarish:** XLOOKUP da `[if_not_found]` ichki parametri bor, `IFERROR()` yozish shart emas.
5. **Massiv Qaytarish:** XLOOKUP bitta formulada butun satrni yoki bir nechta ustunlarni bir vaqtda qaytara oladi.

```excel
=XLOOKUP(A2, Employees[ID], Employees[Salary], "Xodim topilmadi")
```

---

## Q2. INDEX va MATCH kombinatsiyasi qanday ishlaydi? | How INDEX & MATCH combination works

**EN:** `MATCH(lookup_value, lookup_array, 0)` locates the exact row number of a match. `INDEX(return_array, row_num)` fetches the cell value at that position. Unlike VLOOKUP, it doesn't process unused columns, making it much faster on massive datasets.

**UZB:** `MATCH` qiymatning satr raqamini aniqlaydi. `INDEX` esa o'sha satr raqamidagi qiymatni qaytaradi. VLOOKUP dan afzalligi — u faqat kerakli ustunlarni o'qiydi va xotirani kamroq band qiladi.

```excel
=INDEX(C2:C500, MATCH(F1, A2:A500, 0))
```

---

## Q3. SUMIFS va COUNTIFS formullari sintaksisi va farqi | SUMIFS vs COUNTIFS syntax

**EN:** `SUMIFS` sums numbers where multiple criteria match. `COUNTIFS` counts matching rows. Note: `SUMIFS` places `sum_range` FIRST!

**UZB:** `SUMIFS` bir nechta shartlarga mos keladigan qiymatlar yig'indisini hisoblaydi. `COUNTIFS` esa mos keluvchi satrlar sonini sanaydi. Muhim: `SUMIFS` da yig'indi diapazoni birinchi yoziladi!

```excel
=SUMIFS(C2:C100, A2:A100, "Tashkent", B2:B100, ">=2026-01-01")
=COUNTIFS(A2:A100, "Tashkent", D2:D100, "Completed")
```

---

## Q4. Dinamik Massiv (Dynamic Array) formullari: FILTER, UNIQUE va SORT | FILTER, UNIQUE & SORT

**EN:** Modern formulas automatically spill results across multiple cells. `FILTER` extracts matching rows, `UNIQUE` removes duplicates, and `SORT` orders results.

**UZB:** Dinamik massiv formullari natijalarni avtomatik bir nechta katakchalarga yoyib (Spill Range) beradi. `FILTER` mos satrlarni saralaydi, `UNIQUE` takroriylarni o'chiradi, `SORT` esa tartiblaydi.

```excel
=SORT(FILTER(A2:D100, A2:A100="Tashkent"), 4, -1)
=UNIQUE(B2:B500)
```

---

## Q5. IFS va SWITCH funksiyalari sintaksisi | IFS & SWITCH Syntax

**EN:** `IFS` checks multiple logical conditions in sequence. `SWITCH` evaluates an expression against a list of exact matching values.

**UZB:** `IFS` bir nechta mantiqiy shartlarni ketma-ket tekshiradi. `SWITCH` esa berilgan qiymatni aniq mosliklar ro'yxati bo'yicha solishtiradi.

```excel
=IFS(A2>=90, "A", A2>=80, "B", A2>=70, "C", TRUE, "F")
=SWITCH(WEEKDAY(TODAY()), 1, "Yakshanba", 2, "Seshanba", 3, "Chorshanba", "Boshqa kun")
```

---

## Q6. TEXTJOIN, SPLIT, TRIM va CLEAN funksiyalari | TEXTJOIN, SPLIT, TRIM & CLEAN

**EN:** `TEXTJOIN` concatenates strings using a delimiter while skipping empty cells. `TRIM` removes leading/trailing spaces. `CLEAN` removes non-printable characters.

**UZB:** `TEXTJOIN` ajratuvchi belgi bilan matnlarni birlashtiradi va bo'sh katakchalarni tashlab o'tadi. `TRIM` ortiqcha bo me shliqlarni o me chiradi.

```excel
=TEXTJOIN(" ", TRUE, A2, B2, C2)
=TRIM(CLEAN(A2))
```

---

## Q7. HLOOKUP funksiyasi sintaksisi va ishlatilishi | HLOOKUP Syntax & Use Case

**EN:** `HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])` searches horizontally across the first row of a table and returns a value in the same column from a specified row.

**UZB:** `HLOOKUP` jadvalning birinchi satri bo me yicha gorizontal qidiradi va ko me rsatilgan satr raqamidagi qiymatni qaytaradi.

```excel
=HLOOKUP("Q1", A1:Z10, 3, FALSE)
```

---

## Q8. INDIRECT va OFFSET funksiyalari | INDIRECT & OFFSET Functions

**EN:** `INDIRECT` evaluates a text string as a valid cell reference. `OFFSET` returns a dynamic range reference shifted by specified rows and columns.

**UZB:** `INDIRECT` matn ko me rinishidagi manzilni katakcha murojaatiga aylantiradi. `OFFSET` ko me rsatilgan satr va ustun surilishi bo me yicha dinamik diapazon qaytaradi.

```excel
=INDIRECT("'" & A2 & "'!B5")
=OFFSET(A1, 3, 2, 10, 1)
```

---

## Q9. DATEDIF va EOMONTH funksiyalari | DATEDIF & EOMONTH Functions

**EN:** `DATEDIF` calculates difference between two dates in years ("Y"), months ("M"), or days ("D"). `EOMONTH` returns the last day of the month.

**UZB:** `DATEDIF` ikki sana o me rtasidagi farqni yillar ("Y"), oylar ("M") yoki kunlar ("D") bo me yicha hisoblaydi. `EOMONTH` oyning oxirgi kunini qaytaradi.

```excel
=DATEDIF(A2, TODAY(), "Y")
=EOMONTH(TODAY(), 0)
```

---

## Q10. WORKDAY va NETWORKDAYS funksiyalari | WORKDAY & NETWORKDAYS

**EN:** `NETWORKDAYS` calculates net working days between two dates, excluding weekends and holidays. `WORKDAY` calculates a target date after N working days.

**UZB:** `NETWORKDAYS` dam olish va bayram kunlarini chiqarib tashlab, ish kunlari sonini hisoblaydi. `WORKDAY` berilgan ish kunlaridan keyingi sanani topadi.

```excel
=NETWORKDAYS(A2, B2, Holidays!A2:A10)
=WORKDAY(TODAY(), 10, Holidays!A2:A10)
```

---

## Q11. IFERROR va ISBLANK funksiyalari | IFERROR & ISBLANK

**EN:** `IFERROR(value, value_if_error)` replaces errors (`#N/A`, `#VALUE!`, `#DIV/0!`) with a custom fallback value. `ISBLANK` checks if a cell is empty.

**UZB:** `IFERROR` formuladagi xatoliklarni ushlab olib, ularning o me rniga ko me rsatilgan qiymatni qaytaradi. `ISBLANK` katakcha bo me shligini tekshiradi.

```excel
=IFERROR(A2/B2, 0)
=IF(ISBLANK(A2), "Kiritilmagan", A2)
```

---

## Q12. ROUND, ROUNDUP, ROUNDDOWN va MROUND farqlari | Rounding Functions Comparison

**EN:** `ROUND` rounds to specified decimals. `ROUNDUP` rounds away from zero. `ROUNDDOWN` rounds towards zero. `MROUND` rounds to a multiple of a specified number.

**UZB:** `ROUND` berilgan xonagacha yaxlitlaydi. `ROUNDUP` har doim tepaga yaxlitlaydi. `MROUND` ko me rsatilgan karrali songacha (masalan eng yaqin 50 ga) yaxlitlaydi.

```excel
=ROUND(3.14159, 2)
=MROUND(123, 50)
```

---

## Q13. LEN funksiyasi va matn uzunligini hisoblash | LEN Function

**EN:** `LEN(text)` returns the total number of characters in a text string, including spaces and special symbols.

**UZB:** `LEN` matndagi barcha belgilar (bo me shliqlar bilan birga) sonini qaytaradi.

```excel
=LEN(A2)
```

---

## Q14. LEFT, RIGHT va MID funksiyalari | Substring Extraction (LEFT, RIGHT, MID)

**EN:** Extract specific characters from text: `LEFT(text, num_chars)`, `RIGHT(text, num_chars)`, `MID(text, start_num, num_chars)`.

**UZB:** Matndan ko me rsatilgan o me rindan boshlab belgilarni ajratib olish.

```excel
=LEFT(A2, 3)
=MID(A2, 5, 4)
=RIGHT(A2, 2)
```

---

## Q15. FIND va SEARCH funksiyalari farqi | FIND vs SEARCH Functions

**EN:** `FIND` is case-sensitive and does not support wildcards. `SEARCH` is case-insensitive and supports wildcards (`*`, `?`).

**UZB:** `FIND` harf kattaligini farqlaydi (`Case-sensitive`). `SEARCH` esa harf kattaligiga qaramaydi va wildcard belgilarni qo me llaydi.

```excel
=FIND("A", "Alyorjon")
=SEARCH("a", "Alyorjon")
```

---

## Q16. REPLACE va SUBSTITUTE funksiyalari farqi | REPLACE vs SUBSTITUTE

**EN:** `REPLACE` replaces text based on position and character length. `SUBSTITUTE` replaces specific matching text anywhere in the string.

**UZB:** `REPLACE` o me rni va uzunligi bo me yicha matnni almashtiradi. `SUBSTITUTE` esa aniq mos kelgan matnni almashtiradi.

```excel
=SUBSTITUTE(A2, "-", "/")
=REPLACE(A2, 1, 3, "2026")
```

---

## Q17. EXACT funksiyasi va ikkita matnni mosligini tekshirish | EXACT Function

**EN:** `EXACT(text1, text2)` compares two strings and returns `TRUE` if they are identical (case-sensitive), otherwise `FALSE`.

**UZB:** `EXACT` ikki matnni o me zaro solishtiradi va ular katta-kichik harflari bilan bir xil bo me lsa `TRUE` qaytaradi.

```excel
=EXACT(A2, B2)
```

---

## Q18. VALUE va T funksiyalari | VALUE & T Functions

**EN:** `VALUE(text)` converts a text string representing a number into a numeric value. `T(value)` returns text if value is text, or empty string.

**UZB:** `VALUE` matn ko me rinishidagi sonni haqiqiy son tipiga o me tkazadi.

```excel
=VALUE("123.45")
```

---

## Q19. DATE, YEAR, MONTH, DAY funksiyalari | Date Construction & Extraction

**EN:** `DATE(year, month, day)` builds a valid date. `YEAR()`, `MONTH()`, `DAY()` extract individual date components.

**UZB:** `DATE` yil, oy va kundan sana hosil qiladi. `YEAR`, `MONTH`, `DAY` esa sanadan alohida qismlarni ajratadi.

```excel
=DATE(2026, 8, 6)
=YEAR(TODAY())
```

---

## Q20. WEEKDAY va WEEKNUM funksiyalari | WEEKDAY & WEEKNUM Functions

**EN:** `WEEKDAY(date, [return_type])` returns day of the week (1 to 7). `WEEKNUM(date)` returns week number of the year.

**UZB:** `WEEKDAY` haftaning nechanchi kuni ekanligini (1-7) qaytaradi. `WEEKNUM` esa yildagi hafta tartib raqamini beradi.

```excel
=WEEKDAY(TODAY(), 2)
```

---

## Q21. ISNUMBER va ISTEXT funksiyalari | ISNUMBER & ISTEXT Data Validation

**EN:** `ISNUMBER(value)` returns `TRUE` if value is a number. `ISTEXT(value)` returns `TRUE` if value is a string.

**UZB:** `ISNUMBER` qiymat son bo me lsa `TRUE` qaytaradi. `ISTEXT` esa matn bo me lsa `TRUE` beradi.

```excel
=IF(ISNUMBER(A2), A2 * 1.1, "Xatolik: Son emas")
```

---

## Q22. AND, OR va NOT mantiqiy operatorlari | AND, OR & NOT Logic

**EN:** `AND` returns `TRUE` if all arguments are true. `OR` returns `TRUE` if any argument is true. `NOT` reverses a boolean value.

**UZB:** `AND` barcha shartlar bajarilganda `TRUE` qaytaradi. `OR` kamida bitta shart bajarilganda `TRUE` beradi.

```excel
=IF(AND(A2>18, B2="Tashkent"), "Qabul qilindi", "Rad etildi")
```

---

## Q23. CHOOSE funksiyasi va uning qidiruvdagi o'rni | CHOOSE Function

**EN:** `CHOOSE(index_num, value1, [value2], ...)` returns a value from a list based on index number.

**UZB:** `CHOOSE` indeks raqami bo me yicha ro me yxatdan tegishli qiymatni tanlab beradi.

```excel
=CHOOSE(2, "Birinchi", "Ikkinchi", "Uchinchi")
```

---

## Q24. LARGE va SMALL funksiyalari | LARGE & SMALL Functions

**EN:** `LARGE(array, k)` returns the k-th largest value. `SMALL(array, k)` returns the k-th smallest value.

**UZB:** `LARGE` diapazondagi k-inchi eng katta sonni topadi. `SMALL` esa k-inchi eng kichik sonni topadi.

```excel
=LARGE(A2:A100, 2)
```

---

## Q25. RANK va RANK.EQ funksiyalari | RANK & RANK.EQ

**EN:** `RANK.EQ(number, ref, [order])` returns the rank of a number in a list of numbers.

**UZB:** `RANK.EQ` sonning ro me yxatdagi o me rnini (reytingini) aniqlaydi.

```excel
=RANK.EQ(A2, A$2:A$100, 0)
```

---

## Q26. Google Sheets QUERY funksiyasi va SQL sintaksisi | Google Sheets QUERY Function SQL Syntax

**EN:** `QUERY(data, query, [headers])` runs Google Visualization API Query Language (SQL-like) to select, filter, aggregate, and pivot data.

**UZB:** `QUERY` jadval diapazoni ustida SQL ko me rinishidagi so me rovlarni bajaradi: filtrlash, guruhlash va yig'indilarni hisoblash.

```excel
=QUERY(A1:E500, "SELECT A, SUM(D) WHERE C = 'Tashkent' GROUP BY A ORDER BY SUM(D) DESC", 1)
```

---

## Q27. Google Sheets IMPORTRANGE funksiyasi | Google Sheets IMPORTRANGE Function

**EN:** Connects external spreadsheets via URL. Syntax: `=IMPORTRANGE(spreadsheet_url, range_string)`. Requires clicking Allow Access once.

**UZB:** Boshqa alohida Google Sheet faylidan URL orqali ma me lumotlarni real vaqt rejimida tortib oladi.

```excel
=IMPORTRANGE("https://docs.google.com/spreadsheets/d/URL_KEY", "Sales!A1:E500")
```

---

## Q28. ArrayFormula in Google Sheets | Google Sheets da ArrayFormula qo'llanishi

**EN:** `ARRAYFORMULA` evaluates an entire column of data at once from a single cell formula without dragging down.

**UZB:** `ARRAYFORMULA` formulani pastga tortmasdan bitta katakchadan turib butun ustunga qo me llaydi.

```excel
=ARRAYFORMULA(IF(A2:A="", "", B2:B * C2:C))
```

---

## Q29. Conditional Formatting Custom Formulas | Shartli Formatlashda Custom Formula yozish

**EN:** Highlights rows based on logical expressions. Lock column references with `$` (e.g. `=$C2="Overdue"`) to highlight entire rows.

**UZB:** Satrni to me liq bo me yash uchun Custom Formula yozilganda ustun harfi oldiga har doim `$` qo me yiladi (`=$C2="Overdue"`).

```excel
=$C2="Overdue"
```

---

## Q30. Data Validation Dropdown Lists | Data Validation va Dropdown Listlar yaratish

**EN:** Restricts user input to valid choices. Path: `Data -> Data Validation -> Add Rule -> Criteria: Dropdown`.

**UZB:** Katakchaga noto me g'ri ma me lumot kiritilishining oldini oluvchi Dropdown ro me yxat yaratish.

```excel
UI Path: Data -> Data Validation -> Add Rule -> Dropdown from a range
```

---

## Q31. REGEXEXTRACT in Google Sheets | Google Sheets REGEXEXTRACT funksiyasi

**EN:** `REGEXEXTRACT(text, regular_expression)` extracts matching substrings using Regular Expressions.

**UZB:** `REGEXEXTRACT` matn ichidan regex qoidasi bo me yicha ma me lumotni (masalan email yoki telefon) ajratadi.

```excel
=REGEXEXTRACT(A2, "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
```

---

## Q32. REGEXMATCH va REGEXREPLACE | REGEXMATCH & REGEXREPLACE

**EN:** `REGEXMATCH` tests if text matches regex. `REGEXREPLACE` replaces text matching regex pattern.

**UZB:** `REGEXMATCH` matn regexga mosligini tekshiradi (`TRUE`/`FALSE`). `REGEXREPLACE` almashtiradi.

```excel
=REGEXMATCH(A2, "^\+998[0-9]{9}$")
```

---

## Q33. LAMBDA & BYROW Helper Functions (Excel 2021+) | LAMBDA va BYROW funksiyalari (Excel 2021+)

**EN:** `LAMBDA` lets you write custom functions. `BYROW` applies a LAMBDA function to each row of an array.

**UZB:** `LAMBDA` shaxsiy funksiyalar yaratish imkonini beradi. `BYROW` esa har bir satrga qo me llaydi.

```excel
=BYROW(A2:D10, LAMBDA(row, SUM(row)))
```

---

## Q34. SEQUENCE va RANDARRAY Dynamic Functions | SEQUENCE va RANDARRAY dinamik funksiyalari

**EN:** `SEQUENCE(rows, [cols], [start], [step])` generates a sequence of numbers automatically.

**UZB:** `SEQUENCE` ko me rsatilgan qadam bilan ketma-ket sonlar diapazonini yaratadi.

```excel
=SEQUENCE(100, 1, 1, 1)
```

---

## Q35. TRANSPOSE va FLATTEN Functions | TRANSPOSE va FLATTEN funksiyalari

**EN:** `TRANSPOSE` flips rows and columns. `FLATTEN` collapses a 2D grid into a single column.

**UZB:** `TRANSPOSE` satr va ustun o me rnini almashtiradi. `FLATTEN` jadvalni bitta ustunga aylantiradi.

```excel
=TRANSPOSE(A2:A10)
```

---

## Q36. Pivot Tables & Calculated Fields | Pivot Table va Calculated Field yaratish

**EN:** Summarizes raw data into interactive multi-dimensional reports without formulas.

**UZB:** Pivot Table katta ma me lumotlar to me plamini formulasiz yig me ma hisobotga aylantiradi.

```excel
UI Path: Insert -> Pivot Table -> Add Calculated Field
```

---

## Q37. Slicers & Dynamic Filtering in Pivot Tables | Pivot Table da Slicers bilan ishlash

**EN:** Slicers act as visual interactive filter buttons connected to Pivot Tables and Charts.

**UZB:** Slicer'lar Pivot Table va grafiklar uchun ko me rgazmali interaktiv filtr tugmalarini beradi.

```excel
UI Path: PivotTable Analyze -> Insert Slicer
```

---

## Q38. Excel Power Query ETL Process | Excel Power Query ETL jarayoni

**EN:** Power Query extracts data from external sources, cleans/transforms data, and loads clean tables.

**UZB:** Power Query har xil fayllardan ma me lumotlarni yuklaydi, tozalaydi va avtomatik yangilaydi.

```excel
UI Path: Data -> Get Data -> Launch Power Query Editor
```

---

## Q39. Power Query Unpivoting Columns | Power Query da Unpivot Columns amali

**EN:** Converts horizontal matrix reports into normalized vertical tabular data.

**UZB:** Gorizontal jadval ko me rinishidagi ma me lumotlarni to me g'ri vertikal satrlarga aylantiradi.

```excel
Power Query UI: Select Columns -> Transform -> Unpivot Columns
```

---

## Q40. Power Query Merge vs Append Queries | Power Query da Merge va Append farqi

**EN:** `Merge` joins tables horizontally like SQL JOIN. `Append` stacks tables vertically like SQL UNION.

**UZB:** `Merge` jadvallarni yonma-yon ulaydi (SQL JOIN). `Append` esa ustma-ust yig'adi (SQL UNION).

```excel
Power Query UI: Home -> Merge Queries / Append Queries
```

---

## Q41. Excel Data Model & Power Pivot (DAX) | Excel Data Model va Power Pivot (DAX)

**EN:** Creates relational models between multiple tables using DAX expressions, supporting 100M+ rows.

**UZB:** DAX tili yordamida bir nechta jadvallar o me rtasida munosabat o me rnatib, millionlab satrlarni tahlil qiladi.

```excel
DAX Measure: Total Sales := SUM(Sales[Amount])
```

---

## Q42. VLOOKUP Error #N/A Handling | VLOOKUP dagi #N/A xatosini bartaraf etish

**EN:** `#N/A` occurs when a value is not found. Wrap with `IFERROR()` or `IFNA()`.

**UZB:** `#N/A` qiymat topilmaganda chiqadi. U `IFNA(VLOOKUP(...), "Topilmadi")` bilan yashiriladi.

```excel
=IFNA(VLOOKUP(A2, B2:C100, 2, FALSE), "Topilmadi")
```

---

## Q43. Excel #VALUE! and #REF! Error Troubleshooting | #VALUE! va #REF! xatolarini tuzatish

**EN:** `#VALUE!` indicates data type mismatch. `#REF!` occurs when referenced cells/columns are deleted.

**UZB:** `#VALUE!` tip mos kelmaganda chiqadi. `#REF!` esa ko me rsatilgan katakcha o me chirib tashlanganda keladi.

```excel
=IFERROR(VALUE(A2), 0)
```

---

## Q44. Excel #SPILL! Error Resolution | #SPILL! xatosini tuzatish

**EN:** `#SPILL!` occurs when a Dynamic Array formula is blocked by data in adjacent destination cells.

**UZB:** `#SPILL!` dinamik massiv yoyiladigan yo me lda boshqa ma me lumot to me squnlik qilayotganda keladi.

```excel
Solution: Clear destination cells in the spill range.
```

---

## Q45. Financial Modeling: CAGR Formula | Moliyaviy Modellash: CAGR Formulasi

**EN:** Compound Annual Growth Rate: `=(End_Value / Start_Value)^(1 / Years) - 1`.

**UZB:** CAGR — berilgan yillar davomidagi o me rtacha yillik murakkab o me sish sur'atini hisoblaydi.

```excel
=(End_Value / Start_Value)^(1 / Years) - 1
```

---

## Q46. Financial Modeling: PMT Loan Monthly Payment | Krediting oylik to'lovini hisoblash (PMT)

**EN:** `PMT(rate, nper, pv)` calculates the monthly payment for a loan based on constant payments and interest rate.

**UZB:** `PMT` kredit foiz stavkasi va oylar soniga ko me ra har oylik belgilangan to me lov summasini hisoblaydi.

```excel
=PMT(6%/12, 36, -10000)
```

---

## Q47. Financial Modeling: Net Present Value (NPV) | Sof keltirilgan qiymatni hisoblash (NPV)

**EN:** `NPV(rate, value1, [value2], ...)` calculates the net present value of an investment using a discount rate.

**UZB:** `NPV` diskontlash stavkasi yordamida kelajakdagi pul o me tkazmalarining bugungi sof keltirilgan qiymatini beradi.

```excel
=NPV(10%, C2:C6) + C1
```

---

## Q48. Financial Modeling: Internal Rate of Return (IRR) | Ichki daromadlilik stavkasi (IRR)

**EN:** `IRR(values)` returns the internal rate of return for a series of cash flows (where NPV equals zero).

**UZB:** `IRR` loyihaning sof keltirilgan qiymati (NPV) nollga teng bo me ladigan ichki daromadlilik stavkasini hisoblaydi.

```excel
=IRR(C1:C6)
```

---

## Q49. Financial Modeling: XNPV for Irregular Cash Flow Dates | XNPV formulasi

**EN:** `XNPV(rate, values, dates)` calculates NPV for cash flows that occur at irregular date intervals.

**UZB:** `XNPV` notekis sanalarda sodir bo'ladigan pul o'tkazmalari uchun sof keltirilgan qiymatni hisoblaydi.

```excel
=XNPV(10%, B2:B6, A2:A6)
```

---

## Q50. Financial Modeling: XIRR for Irregular Cash Flow Dates | XIRR formulasi

**EN:** `XIRR(values, dates)` calculates the internal rate of return for non-periodic cash flows.

**UZB:** `XIRR` har xil sanalarda kelib tushadigan pul o'tkazmalarining ichki daromadlilik stavkasini aniqlaydi.

```excel
=XIRR(B2:B6, A2:A6)
```

---

## Q51. Inventory Management: Inventory Turnover Ratio | Ombor tovarlarining aylanish ko'rsatkichi

**EN:** `Inventory Turnover = COGS / Average Inventory`. Measures how many times inventory is sold/replaced.

**UZB:** `COGS / O'rtacha Ombor Zaxirasi` — ombor tovarlarining ma me lum davrda necha marta to'liq sotilib yangilangani.

```excel
=COGS_Amount / AVERAGE(Start_Inv, End_Inv)
```

---

## Q52. Inventory Management: Days Sales of Inventory (DSI) | Tovar zaxiralarining sotilish kunlari

**EN:** `DSI = (Average Inventory / COGS) * 365`. Shows how many days on average inventory stays in stock.

**UZB:** Ombor zaxiralarining o'rtacha necha kunda sotilib tugashini ko me rsatuvchi ko me rsatkich.

```excel
=(AVERAGE(B2:B3) / C2) * 365
```

---

## Q53. Sales Analytics: Month-over-Month (MoM) Growth | Oylik sotuv o'sish foizini hisoblash

**EN:** `MoM Growth % = (Current Month Sales - Prior Month Sales) / Prior Month Sales`.

**UZB:** Joriy oy va o me tgan oy sotuvlari o me rtasidagi o me sish yoki kamayish foizini aniqlash.

```excel
=(B3 - B2) / B2
```

---

## Q54. Sales Analytics: Year-over-Year (YoY) Growth | Yillik o'sish foizini hisoblash

**EN:** `YoY Growth % = (Current Year Sales - Last Year Sales) / Last Year Sales`.

**UZB:** Utgan yilning shu davriga nisbatan yillik sotuv o me sish sur'ati.

```excel
=(C2 - B2) / B2
```

---

## Q55. Sales Analytics: Customer Acquisition Cost (CAC) | Mijozni jalb qilish narxi (CAC)

**EN:** `CAC = Total Marketing & Sales Expenses / Number of New Customers Acquired`.

**UZB:** Bitta yangi mijozni jalb qilish uchun sarflangan umumiy sotuv va marketing xarajatlari.

```excel
=Total_Marketing_Cost / New_Customers_Count
```

---

## Q56. Customer Lifetime Value (LTV) Formula | Mijozning umumiy qiymatini hisoblash (LTV)

**EN:** `LTV = Average Order Value * Purchase Frequency * Customer Lifespan`.

**UZB:** Mijozning kompaniyaga olib keladigan umumiy sof daromadi qiymati.

```excel
=Avg_Order_Value * Annual_Purchases * Customer_Years
```

---

## Q57. HR Payroll: Overtime Pay Calculation | Tungi va ishdan tashqari soat to'lovlarini hisoblash

**EN:** Calculates overtime pay using hourly rate multiplier (e.g. 1.5x for overtime).

**UZB:** Ish soatidan tashqari ishlangan vaqt uchun 1.5 baravar stavka bo me yicha oylik hisoblash.

```excel
=(Base_Salary / Monthly_Hours) * Overtime_Hours * 1.5
```

---

## Q58. HR Payroll: Pro-rated Salary for Partial Month Work | To'liq ishlamagan oy uchun maosh

**EN:** Calculates proportional salary when employee joins mid-month: `(Monthly Salary / Working Days) * Days Worked`.

**UZB:** Oy ortasida ishga kirgan xodim uchun ishlangan kunlarga mutanosib ravishda maosh hisoblash.

```excel
=(Monthly_Salary / NETWORKDAYS(Month_Start, Month_End)) * NETWORKDAYS(Join_Date, Month_End)
```

---

## Q59. HR Analytics: Employee Churn Rate Percentage | Xodimlar ketishi (Turnover) foizi

**EN:** `Turnover Rate = (Employees Left / Average Employee Count) * 100`.

**UZB:** Davr mobaynida ishdan bo me shagan xodimlarning o'rtacha xodimlar soniga nisbati.

```excel
=(Left_Count / AVERAGE(Start_Count, End_Count)) * 100
```

---

## Q60. Operations: Order Lead Time Calculation | Buyurtmani yetkazish vaqti (Lead Time)

**EN:** Calculates working days between Order Date and Delivery Date excluding holidays.

**UZB:** Buyurtma berilgan sana va yetkazilgan sana o'rtasidagi ish kunlari muddati.

```excel
=NETWORKDAYS(Order_Date, Delivery_Date, Holidays_Range)
```

---

## Q61. Accounting: Running Balance (Cumulative Sum) | O'suvchi balans hisobini yuritish

**EN:** Dynamic cumulative balance formula down a column: `=SUM($B$2:B2)`.

**UZB:** Ustun bo'yicha ketma-ket qo me shilib boruvchi kumulyativ balans formulasi.

```excel
=SUM($B$2:B2)
```

---

## Q62. Accounting: Bank Reconciliation Variance Detection | Bank ko'chirmasi farqini aniqlash

**EN:** Compares GL cash balance against bank statement balance to flag discrepancies.

**UZB:** Buxgalteriya balansi va bank ko me chirmasi o'rtasidagi tafovutni aniqlovchi formula.

```excel
=IF(GL_Balance - Bank_Statement = 0, "Mos keldi", "Farq: " & (GL_Balance - Bank_Statement))
```

---

## Q63. Accounting: Accounts Receivable Aging Buckets | Qarzlar muddati bo'yicha saralash (Aging)

**EN:** Categorizes unpaid invoices into 0-30, 31-60, 61-90, 90+ days aging buckets using `IFS`.

**UZB:** To'lanmagan debitorlik qarzdorliklarini 30, 60, 90 kunga bo me lib saralash.

```excel
=IFS(TODAY()-Invoice_Date<=30, "0-30 kun", TODAY()-Invoice_Date<=60, "31-60 kun", TODAY()-Invoice_Date<=90, "61-90 kun", TRUE, "90+ kun")
```

---

## Q64. Accounting: Straight-line Depreciation (SLN) | Asosiy vositalar to'g'ri chiziqli amortizatsiyasi

**EN:** `SLN(cost, salvage, life)` returns straight-line depreciation of an asset for one period.

**UZB:** `SLN` asosiy vositaning bir davrdagi to me g'ri chiziqli amortizatsiya summasini hisoblaydi.

```excel
=SLN(Cost_Price, Salvage_Value, Life_Years)
```

---

## Q65. Accounting: Declining Balance Depreciation (DB) | Kamayib boruvchi amortizatsiya hisobi

**EN:** `DB(cost, salvage, life, period)` calculates depreciation using fixed-declining balance method.

**UZB:** `DB` kamayib boruvchi qoldiq usuli bo me yicha davriy amortizatsiyani chiqaradi.

```excel
=DB(10000, 1000, 5, 1)
```

---

## Q66. Data Analytics: Z-Score Outlier Detection | Anomalilarni aniqlash Z-Score formulasi

**EN:** `Z-Score = (Value - Mean) / StDev`. Values with `ABS(Z) > 3` indicate extreme outliers.

**UZB:** Ma'lumotlar ichidagi anomal (xato yoki shubhali) qiymatlarni Z-Score o'lchovi bilan topish.

```excel
=(A2 - AVERAGE($A$2:$A$100)) / STDEV.P($A$2:$A$100)
```

---

## Q67. Data Analytics: 3-Month Rolling Moving Average | 3 oylik sirpanuvchi o'rtacha qiymat

**EN:** Calculates smooth trend average using current month and prior 2 months.

**UZB:** Mavsumiy tebranishlarni silliqlash uchun 3 oylik sirpanuvchi o me rtacha qiymat.

```excel
=AVERAGE(B2:B4)
```

---

## Q68. Data Analytics: Pareto 80/20 Cumulative Percentage | Pareto tamoyili 80/20 analizi

**EN:** Calculates cumulative running percentage of sorted items to find top 20% drivers.

**UZB:** Jami daromadning 80% qismini keltiruvchi 20% mahsulotlarni topuvchi kumulyativ foiz.

```excel
=SUM($B$2:B2) / SUM($B$2:$B$100)
```

---

## Q69. Weighted Average Calculation | Vaznli o'rtacha qiymatni hisoblash

**EN:** `Weighted Average = SUMPRODUCT(Values, Weights) / SUM(Weights)`.

**UZB:** Mahsulot hajmi yoki og'irligi hisobga olingan vaznli o me rtacha narx formulasi.

```excel
=SUMPRODUCT(Prices_Range, Quantities_Range) / SUM(Quantities_Range)
```

---

## Q70. FREQUENCY Array Function | Takrorlanish chastotasi massiv formulasi

**EN:** `FREQUENCY(data_array, bins_array)` calculates how often values occur within a range of values.

**UZB:** `FREQUENCY` interval bo me yicha sonlarning uchrashlar chastotasini chiqaradi.

```excel
=FREQUENCY(Scores_Range, Bins_Range)
```

---

## Q71. Two-Way Lookup with INDEX & MATCH | Satr va ustun kesishmasidan ikkitomonlama qidiruv

**EN:** Performs 2D lookup searching both row header and column header simultaneously.

**UZB:** Bir vaqtning o me zida ham satr, ham ustun sarlavhasi bo me yicha kesishgan katakchani topish.

```excel
=INDEX(B2:E10, MATCH(Selected_Row, A2:A10, 0), MATCH(Selected_Col, B1:E1, 0))
```

---

## Q72. Case-Sensitive Lookup with EXACT and XLOOKUP | Katta-kichik harflarni farqlovchi qidiruv

**EN:** Combines `XLOOKUP` with `EXACT` to perform case-sensitive value lookups.

**UZB:** Harf kattaligini farqlovchi qidiruvni `EXACT` va `XLOOKUP` birikmasida bajarish.

```excel
=XLOOKUP(TRUE, EXACT(A2, Range_IDs), Range_Names)
```

---

## Q73. Multiple Criteria Lookup without Helper Columns | Yordamchi ustunsiz ko'p shartli qidiruv

**EN:** Uses boolean multiplication inside XLOOKUP to match multiple conditions natively.

**UZB:** `XLOOKUP` ichida ko me paytirish operatori bilan bir nechta shart bo me yicha qidirish.

```excel
=XLOOKUP(1, (Range1=Criteria1) * (Range2=Criteria2), Return_Range)
```

---

## Q74. Finding Last Non-Empty Cell in a Column | Ustundagi eng oxirgi to'la katakchani topish

**EN:** Uses XLOOKUP with reverse search mode `search_mode = -1` to fetch last entry.

**UZB:** `XLOOKUP` ning teskari qidirish `search_mode = -1` parametri bilan oxirgi qiymatni olish.

```excel
=XLOOKUP(TRUE, A2:A100<>"", A2:A100, "", 0, -1)
```

---

## Q75. Extracting Duplicates into a Separate List | Takrorlangan qiymatlarni ajratib olish

**EN:** Filters elements where `COUNTIF` frequency is greater than 1, wrapped with `UNIQUE`.

**UZB:** Ro me yxatda 1 martadan ko me p takrorlangan elementlarni ajratib olish.

```excel
=UNIQUE(FILTER(A2:A100, COUNTIF(A2:A100, A2:A100)>1))
```

---

## Q76. Extracting First Name from Full Name | To'liq ismdan birinchi ismni ajratish

**EN:** `LEFT(A2, SEARCH(" ", A2) - 1)` extracts substring before the first space.

**UZB:** Bo me shliq belgisigacha bo me lgan birinchi so me zni ajratib olish.

```excel
=LEFT(A2, SEARCH(" ", A2) - 1)
```

---

## Q77. Extracting Last Name from Full Name | To'liq ismdan familiyani ajratish

**EN:** `RIGHT(A2, LEN(A2) - SEARCH(" ", A2))` extracts substring after space.

**UZB:** Bo me shliq belgisidan keyingi familiyani ajratib olish.

```excel
=RIGHT(A2, LEN(A2) - SEARCH(" ", A2))
```

---

## Q78. PROPER Function for Name Capitalization | Har bir so'z bosh harfini katta qilish

**EN:** `PROPER(text)` converts first letter of each word to uppercase and rest to lowercase.

**UZB:** Matndagi har bir so me zning birinchi harfini katta qilish (ism-familiya to'g'rilash).

```excel
=PROPER("alyorjon alimov")
```

---

## Q79. Removing Non-Numeric Characters from String | Matndan faqat sonlarni saqlab qolish

**EN:** Uses Google Sheets `REGEXREPLACE` to strip out all non-digits `[^0-9]`.

**UZB:** REGEX yordamida matn ichidan barcha harflarni o'chirib, faqat raqamlarni qoldirish.

```excel
=REGEXREPLACE(A2, "[^0-9]", "")
```

---

## Q80. Data Masking (Credit Card / SSN) | Maxfiy ma'lumotlarni yashirish (Masking)

**EN:** Masks all but last 4 digits of a credit card number.

**UZB:** Plastik karta raqamining oxirgi 4 ta raqamidan tashqari hammasini `****` qilish.

```excel
="****-****-****-" & RIGHT(A2, 4)
```

---

## Q81. Calculating Exact Age in Years and Months | Yoshni yil va oylarda hisoblash

**EN:** Combines DATEDIF in years and remaining months for exact age text.

**UZB:** Tug'ilgan sanadan boshlab yoshni "X yil Y oy" ko me rinishida chiqarish.

```excel
=DATEDIF(Birth_Date, TODAY(), "Y") & " yil " & DATEDIF(Birth_Date, TODAY(), "YM") & " oy"
```

---

## Q82. Finding First Day of Next Month | Keyingi oyning birinchi kunini topish

**EN:** `=EOMONTH(date, 0) + 1` moves to end of current month then adds 1 day.

**UZB:** Joriy oyning oxiriga 1 kun qo me shib, keyingi oyning 1-sanasini olish.

```excel
=EOMONTH(TODAY(), 0) + 1
```

---

## Q83. Grouping Dates into Quarters (Q1, Q2, Q3, Q4) | Sanani kvartallarga bo'lish

**EN:** `"Q" & ROUNDUP(MONTH(date) / 3, 0)` calculates financial quarter.

**UZB:** Oy raqami bo'yicha yilning qaysi kvartaliga tegishliligini aniqlash.

```excel
="Q" & ROUNDUP(MONTH(A2) / 3, 0)
```

---

## Q84. Converting Unix Timestamp to Excel Date | Unix vaqtini standart sanaga o'tkazish

**EN:** `=(Unix_Timestamp / 86400) + DATE(1970, 1, 1)` converts epoch seconds to date.

**UZB:** Unix timestamp sekundlarini standart Excel sana formatiga o me tkazish.

```excel
=(A2 / 86400) + DATE(1970, 1, 1)
```

---

## Q85. Calculating Overlapping Date Ranges | Sanalar kesishmasi kunlarini hisoblash

**EN:** Calculates overlapping days between two project date ranges using MAX/MIN.

**UZB:** Ikki loyiha muhlati o me rtasida bir-biriga ustma-ust tushgan kunlar soni.

```excel
=MAX(0, MIN(End1, End2) - MAX(Start1, Start2) + 1)
```

---

## Q86. Google Sheets Cross-Tab Query Aggregation | Bir nechta varaqni QUERY da birga tahlil qilish

**EN:** Combines multiple tab ranges inside array brackets `{Sheet1!A:B; Sheet2!A:B}` for QUERY.

**UZB:** Bir nechta alohida varaqlarni bitta QUERY so'rovida vertikal birlashtirish.

```excel
=QUERY({Sheet1!A2:D; Sheet2!A2:D}, "SELECT Col1, SUM(Col4) WHERE Col1 IS NOT NULL GROUP BY Col1", 0)
```

---

## Q87. Dynamic Indirect Dropdown Lists | Bog'liq ikkilamchi Dropdown ro'yxat tuzish

**EN:** Uses `INDIRECT()` inside Data Validation to point to named ranges matching first dropdown selection.

**UZB:** Birinchi dropdown tanloviga qarab (masalan Davlat -> Shaharlar) ikkinchi dropdownni o me zgartirish.

```excel
=INDIRECT(Selected_Country_Cell)
```

---

## Q88. GOOGLETRANSLATE Automated Translation | Avtomatik tarjima qilish formulasi

**EN:** `GOOGLETRANSLATE(text, [source_lang], [target_lang])` translates cell text natively.

**UZB:** Katakchadagi matnni avtomatik ingliz tiliga tarjima qilish.

```excel
=GOOGLETRANSLATE(A2, "uz", "en")
```

---

## Q89. GOOGLEFINANCE Stock & Exchange Rates | Jonli valyuta kursi va aksiya narxi

**EN:** Fetches real-time stock prices or currency exchange rates in Sheets.

**UZB:** Markaziy bank yoki birja valyuta kurslarini real vaqtda Sheets ga yuklash.

```excel
=GOOGLEFINANCE("CURRENCY:USDUZS")
```

---

## Q90. Google Apps Script Custom Macro Functions | Google Apps Script da shaxsiy formula yozish

**EN:** Custom JS function written in Apps Script editor (`Extensions -> Apps Script`).

**UZB:** JavaScript tilida Google Sheets uchun shaxsiy macro formula yaratish.

```javascript
function MULTIPLY_BY_TWO(input) {
  return input * 2;
}
```

---

## Q91. Excel 2021 SCAN Function | Cumulative Running Calculations

**EN:** `SCAN(initial_value, array, lambda)` performs cumulative running totals efficiently.

**UZB:** Dinamik massivlar ustida o me suvchi yig'indini hisoblovchi yangi Excel 2021 formulasi.

```excel
=SCAN(0, A2:A10, LAMBDA(acc, val, acc + val))
```

---

## Q92. Excel 2021 MAP Function | Multi-Cell Array Transformation

**EN:** `MAP(array, lambda)` applies a function to transform each cell in an array.

**UZB:** Massivdagi har bir katakchaga o me zgartirish kirituvchi Excel 2021 formulasi.

```excel
=MAP(A2:A10, LAMBDA(x, IF(x>100, x*0.9, x)))
```

---

## Q93. Excel 2021 REDUCE Function | Array Accumulation into Single Value

**EN:** `REDUCE(initial_value, array, lambda)` reduces array into a single accumulated value.

**UZB:** Butun massiv qiymatlarini bitta yakuniy natijaga yig me uvchi formula.

```excel
=REDUCE("", A2:A5, LAMBDA(acc, val, acc & ", " & val))
```

---

## Q94. Excel 2021 CHOOSEROWS and CHOOSECOLS | Dynamic Matrix Slicing

**EN:** Extracts specific rows or columns from an array by index.

**UZB:** Massivdan faqat kerakli satr yoki ustunlarni indeks bo'yicha ajratib olish.

```excel
=CHOOSECOLS(A2:D100, 1, 4)
```

---

## Q95. Excel 2021 TAKE and DROP Functions | Array Truncation

**EN:** `TAKE` keeps N rows/cols. `DROP` removes N rows/cols from array.

**UZB:** `TAKE` massivning dastlabki N ta satrini oladi. `DROP` esa N ta satrni tashlab yuboradi.

```excel
=TAKE(SORT(A2:D100, 4, -1), 5)
```

---

## Q96. Excel 2021 VSTACK and HSTACK | Combining Arrays Vertically or Horizontally

**EN:** `VSTACK` stacks arrays vertically. `HSTACK` combines arrays side-by-side.

**UZB:** `VSTACK` bir nechta jadvallarni ustma-ust ulaydi. `HSTACK` esa yonma-yon ulaydi.

```excel
=VSTACK(Sheet1!A2:D10, Sheet2!A2:D10)
```

---

## Q97. Excel 2021 TOROW and TOCOL | Reshaping 2D Grids to 1D Vectors

**EN:** Transforms a multi-column matrix grid into a single row or column vector.

**UZB:** Ko me p ustunli kataklar katakchasini bitta to me g'ri ustunga aylantirish.

```excel
=TOCOL(A2:D10, 1)
```

---

## Q98. Dashboard Building: Dynamic Chart Titles | Katakchaga bog'langan dinamik grafik sarlavhasi

**EN:** Connects chart title text directly to a cell containing a dynamic formula string.

**UZB:** Grafik sarlavhasini katakchadagi formulaga bog me lab dinamik o me zgaruvchan qilish.

```excel
="Top " & F1 & " Sotuvchilar (Jami: " & TEXT(SUM(B2:B10), "$#,##0") & " USD)"
```

---

## Q99. Dashboard Building: Dynamic Top N Selector | Top N tanlov interfeysi

**EN:** Combines dropdown selection with `TAKE` and `SORT` for dynamic dashboard ranking.

**UZB:** Dropdown tanloviga qarab grafikda Top 5 yoki Top 10 natijalarni avtomatik o me zgartirish.

```excel
=TAKE(SORT(A2:D100, 4, -1), Selected_Top_N_Cell)
```

---

## Q100. Executive Summary: Building Automated KPI Scorecards | Avtomatlashtirilgan KPI Dashboard tuzish

**EN:** Combines Data Model (DAX), Dynamic Array formulas (`VSTACK`, `XLOOKUP`), Conditional Formatting, and Slicers to build dynamic C-level executive dashboards.

**UZB:** Excel va Google Sheets da barcha ilg'or formullar (`XLOOKUP`, `QUERY`, `VSTACK`), Shartli Formatlash va Slicers larni birlashtirib, rahbarlar uchun real-vaqt rejimida avtomatik yangilanuvchi interaktiv KPI Dashboard boshqaruv panelini qurish.

```excel
=VSTACK(
   HSTACK("KPI ko'rsatkich", "Qiymat", "Maqsad", "Bajarilish %"),
   HSTACK("Jami Daromad", TEXT(SUM(Sales[Amount]), "$#,##0"), "$1,000,000", TEXT(SUM(Sales[Amount])/1000000, "0.0%"))
)
```

---

## Q101. Nested QUERY with Dynamic Dates and Ratio Columns | Ichma-ich QUERY: dinamik sana va nisbat ustunlari

**EN:** When an aggregate ratio (e.g. average price = sum/quantity) can't be computed inside a single `QUERY`, wrap two `QUERY` calls: the inner one filters by a dynamic date range and groups/sums, the outer one references the inner result by `ColN` and computes the ratio.

**UZB:** `SUM(H)/SUM(F)` kabi nisbatni bitta `QUERY`da bevosita hisoblab bo'lmaydi — ichki `QUERY` sana bo'yicha filtrlab yig'indilarni chiqaradi, tashqi `QUERY` esa ichki natijaning ustunlariga (`Col1`, `Col2`, ...) murojaat qilib nisbatni hisoblaydi.

```excel
=QUERY(QUERY(Sement!$A$2:$J; "SELECT I, SUM(F), SUM(H) WHERE A >= date '" & TEXT($A$1; "yyyy-mm-dd") & "' AND A <= date '" & TEXT($B$1; "yyyy-mm-dd") & "' GROUP BY I ORDER BY I ASC LABEL I 'nomi', SUM(F) 'kg', SUM(H) 'summa'"; 1); "SELECT Col1, Col2, Col3, Col3/Col2 WHERE Col3 > " & K1 & " LABEL Col3/Col2 'O''rtacha narx'"; 1)
```

**5 ta asosiy qoida:**

1. **Sana sintaksisi:** `date 'yyyy-mm-dd'` — `date '` dan keyin ortiqcha probel bo'lmasligi kerak; `& TEXT($A$1; "yyyy-mm-dd") &` orqali to'g'ri ulanadi.
2. **Ichki vs tashqi ustun nomlari:** Ichki `QUERY`da manba ustunlari harf bilan (`A`, `F`, `H`) chaqiriladi; tashqi `QUERY` esa ichki natijaning ustunlariga faqat `Col1`, `Col2`, `Col3`... shaklida murojaat qiladi (harf yoki tartib raqami emas).
3. **Agregatni ikki bosqichda bo'lish:** Yig'indi (`SUM`) ichki `QUERY`da, nisbat (`Col3/Col2`) tashqi `QUERY`da hisoblanadi — ikkalasini bitta so'rovda birlashtirib bo'lmaydi.
4. **Dinamik WHERE shart:** Katak qiymatini shartga ulashda belgi bilan tirnoq orasida probel qoldiring: `"WHERE Col3 > " & K1`.
5. **Header/LABEL boshqaruvi:** Ichki va tashqi `QUERY`ning oxirgi argumenti (`header`) `1` qilib belgilanadi, sarlavhalar esa `LABEL` bilan tozalanadi/nomlanadi (masalan `LABEL Col3/Col2 'O''rtacha narx'` — ichki tirnoqni ikkilantirib qochiriladi).

**Amaliy vazifalar:**

1. `Sement!A:J` jadvalida `A1`/`B1` katakchalarga boshlanish/tugash sanalarini kiriting, ichki `QUERY` orqali har bir mahsulot (`I` ustuni) bo'yicha `F` (miqdor, kg) va `H` (summa) ustunlarini yig'indilab chiqaring.
2. Tashqi `QUERY` yordamida har bir mahsulot uchun o'rtacha narxni (`summa/miqdor`) hisoblab, natijani `K1` katakchadagi chegaradan katta bo'lganlar bilan filtrlang.
3. `LABEL`dan foydalanib barcha ustun sarlavhalarini o'zbek tilida chiroyli qilib chiqaring (`nomi`, `kg`, `summa`, `O'rtacha narx`).
4. Sana oralig'ini `A1`/`B1` orqali emas, balki `TODAY()-30` va `TODAY()` yordamida "oxirgi 30 kun" hisobotiga o'zgartiring.
5. Xuddi shu shablonni ikkinchi bir varaq (masalan `Kabel!A:J`) uchun moslashtiring va ikkala natijani `{...}` massiv qavslari bilan bitta jadvalga birlashtiring (Q86 ga qarang).

---

## Q102. FILTER: Multi-Criteria AND/OR Logic and Error Handling | FILTER: ko'p shartli AND/OR mantiq va xatoliklarni boshqarish

**EN:** `FILTER` combines multiple boolean arrays with `*` (AND) or `+` (OR) instead of nesting `IF`. Because a spill formula errors out entirely with `#N/A` when zero rows match, every production `FILTER` should be wrapped in `IFERROR`, and column selection should stay dynamic via `CHOOSECOLS`/`INDEX` rather than hardcoded ranges.

**UZB:** `FILTER`da bir nechta shartni birlashtirish uchun `IF` ichma-ich yozish shart emas — massivlarni `*` (VA/AND) yoki `+` (YOKI/OR) bilan ko'paytirish yetarli. Hech qanday satr mos kelmasa butun formula `#N/A` xatosini beradi, shuning uchun ishlab chiqarish formulalarini har doim `IFERROR` bilan o'rab qo'ying; ustunlarni qattiq diapazon emas, `CHOOSECOLS`/`INDEX` orqali dinamik tanlang.

```excel
=IFERROR(FILTER(A2:D500, (B2:B500="Tashkent")*(C2:C500>=1000000)+(D2:D500="VIP")), "Mos yozuv topilmadi")
```

**5 ta asosiy qoida:**

1. **AND mantiq:** Ikki yoki undan ko'p shartning barchasi bajarilishi kerak bo'lsa, boolean massivlarni `*` bilan ko'paytiring: `(B2:B500="Tashkent")*(C2:C500>=1000000)`.
2. **OR mantiq:** Shartlardan kamida bittasi yetarli bo'lsa, `+` bilan qo'shing: `(B2:B500="VIP")+(D2:D500="Premium")`. AND va OR ni birlashtirsangiz, qavslar bilan guruhlang.
3. **Bo'sh natija xatosi:** Bironta satr shartga mos kelmasa, `FILTER` butunlay `#N/A` qaytaradi — bu jadval o'rniga tushib qolgan xatoni oldini olish uchun formulani `IFERROR(FILTER(...), "xabar")` bilan o'rang.
4. **Diapazon uzunliklari:** Barcha massiv argumentlari (`include`) bir xil satr sonida bo'lishi shart — masalan `A2:D500` va `B2:B500` uzunligi mos kelmasa `#VALUE!` chiqadi.
5. **Ustun tanlash:** Faqat ba'zi ustunlarni chiqarish kerak bo'lsa, butun diapazonni filtrlab keyin `CHOOSECOLS(FILTER(...), 1, 3)` bilan kesib oling — bu qattiq yozilgan ustun indeksidan ko'ra o'zgaruvchan jadvallar bilan ishonchliroq ishlaydi.

**Amaliy vazifalar:**

1. `A2:D500` jadvalidan shahri `"Tashkent"` bo'lgan VA summasi `1,000,000` dan katta bo'lgan qatorlarni chiqaring.
2. Yuqoridagi shartga `D` ustunida `"VIP"` statusi bo'lganlarni OR mantiq bilan qo'shing.
3. Hech qanday mos yozuv topilmasa, `"Mos yozuv topilmadi"` degan xabar chiqishini `IFERROR` bilan ta'minlang.
4. Natijadan faqat ism va summa ustunlarini (`CHOOSECOLS`) ajratib chiqaring.
5. `FILTER` natijasini `SORT` bilan birlashtirib, eng katta summadan boshlab kamayish tartibida chiqaring.

---

## Q103. INDEX: 2D Lookup, Row 0 / Column 0 va Dynamic Column Selection | INDEX: ikki o'lchamli qidiruv va dinamik ustun tanlash

**EN:** `INDEX(range, row_num, col_num)` can return a single cell, an entire row (`row_num=0`), an entire column (`col_num=0`), or — combined with a second `MATCH` on the header row — a fully dynamic 2D lookup where both the row and the column are found by name instead of a fixed position.

**UZB:** `INDEX(diapazon, satr_raqami, ustun_raqami)` bitta katakchani, butun satrni (`satr_raqami=0`), butun ustunni (`ustun_raqami=0`) yoki — sarlavha qatoridagi ikkinchi `MATCH` bilan birga — satr ham, ustun ham nom bo'yicha topiladigan to'liq dinamik ikki o'lchamli qidiruvni qaytarishi mumkin.

```excel
=INDEX(B2:F100, MATCH(H1, A2:A100, 0), MATCH(H2, B1:F1, 0))
```

**5 ta asosiy qoida:**

1. **Bitta katakcha:** `INDEX(diapazon, satr, ustun)` — ikkala argument berilsa, aniq kesishmadagi qiymat qaytadi.
2. **Butun satr/ustun:** `col_num`ni `0` qilib qoldirsangiz butun satr, `row_num`ni `0` qilsangiz butun ustun massiv sifatida qaytadi — bu `SUM`, `TEXTJOIN` kabi funksiyalarga to'g'ridan-to'g'ri uzatish uchun qulay.
3. **Ikki o'lchamli dinamik qidiruv:** Ikkala `MATCH`ni ham `INDEX` ichiga joylashtirsangiz, foydalanuvchi ham satr (masalan mahsulot nomi), ham ustun (masalan oy nomi) tanlovini o'zgartirganda natija avtomatik yangilanadi — bu klassik "matritsa qidiruvi" (matrix lookup).
4. **Diapazon mos kelishi:** `INDEX` diapazoni (`B2:F100`) va ikkinchi `MATCH`ning qidiruv qatori (`B1:F1`) bir xil ustunlardan boshlanishi kerak, aks holda natija bir ustunga siljib xato chiqadi.
5. **VLOOKUP dan farqi:** `INDEX`/`MATCH` chapga qidirish imkonini beradi (natija ustuni qidiruv ustunidan chapda bo'lishi mumkin) va ustun qo'shilib-o'chirilganda `VLOOKUP`dagi kabi qattiq ustun raqamiga bog'liq bo'lmaydi.

**Amaliy vazifalar:**

1. `B2:F100` jadvalida `H1` katakchaga mahsulot nomini, `H2` katakchaga oy nomini yozib, ikkalasiga mos sotuv summasini `INDEX`+ikki `MATCH` bilan toping.
2. Tanlangan mahsulotning barcha oylardagi summalarini (`row_num=0`) bitta massiv sifatida chiqarib, `SUM` bilan yig'indisini hisoblang.
3. Tanlangan oyning barcha mahsulotlar bo'yicha summalarini (`col_num=0`) chiqarib, `MAX` bilan eng yuqori qiymatni toping.
4. Jadvalga yangi ustun (yangi oy) qo'shib, formulaning hech qanday o'zgarishsiz to'g'ri ishlashini tekshiring (VLOOKUP bilan solishtiring).
5. Topilmagan nom/oy kiritilganda `#N/A` o'rniga `"Topilmadi"` xabarini chiqaradigan qilib `IFNA` bilan o'rang.

---

## Q104. MATCH: Match Type 0/1/-1 va Wildcard Qidiruv | MATCH: mos kelish turlari va wildcard qidiruv

**EN:** `MATCH(value, range, match_type)`'s third argument controls the search mode: `0` requires an exact match (any order, ideal for lookups), `1` finds the largest value ≤ the search value in an **ascending**-sorted range (approximate/"closest below"), and `-1` finds the smallest value ≥ it in a **descending**-sorted range. Exact match also supports `?`/`*` wildcards.

**UZB:** `MATCH(qiymat, diapazon, mos_kelish_turi)`ning uchinchi argumenti qidiruv rejimini belgilaydi: `0` — aniq mos kelish (tartib muhim emas, qidiruvlar uchun ideal), `1` — **o'sish tartibida** saralangan diapazonda qiymatdan kichik yoki teng bo'lgan eng kattasini topadi (masalan soliq stavkalari jadvali), `-1` — **kamayish tartibida** saralangan diapazonda qiymatdan katta yoki teng bo'lgan eng kichigini topadi. Aniq mos kelishda `?`/`*` wildcard belgilaridan ham foydalanish mumkin.

```excel
=MATCH(85, {0;60;70;80;90}, 1)
=MATCH("Ali*", A2:A100, 0)
```

**5 ta asosiy qoida:**

1. **`match_type=0` (aniq):** Eng ko'p ishlatiladigan rejim — `INDEX`/`MATCH` qidiruvlarida deyarli har doim `0` yoziladi, chunki ma'lumot saralangan bo'lishi shart emas.
2. **`match_type=1` (taxminiy, o'sish tartibi):** Diapazon albatta o'sish tartibida saralangan bo'lishi kerak; aks holda noto'g'ri natija (jimgina, xatosiz) qaytadi. Baholash jadvallari (masalan ball → baho) uchun ishlatiladi.
3. **`match_type=-1` (taxminiy, kamayish tartibi):** Diapazon kamayish tartibida saralangan bo'lishi shart; komissiya/chegirma pog'onalari kabi teskari jadvallarda qo'llaniladi.
4. **Wildcard qidiruv:** `match_type=0` bilan `?` (bitta belgi) va `*` (istalgan sondagi belgi) ishlaydi — masalan `"Ali*"` "Ali" bilan boshlangan barcha qiymatlarga mos keladi.
5. **Xato holatlari:** Mos topilmasa `#N/A` qaytadi — bu ataylab shunday, chunki `IFERROR`/`IFNA` bilan aniq boshqarish kerak; noto'g'ri saralangan diapazonda `1`/`-1` xatosiz lekin noto'g'ri natija berishi eng ko'p uchraydigan xato manbai.

**Amaliy vazifalar:**

1. `{0;60;70;80;90}` ball chegaralari va `{"F";"D";"C";"B";"A"}` baholar jadvali asosida, kiritilgan balga mos bahoni `MATCH(...,1)` + `INDEX` bilan toping.
2. Xuddi shu vazifani diapazonni ataylab noto'g'ri (kamayish) tartibda saralab sinab ko'ring va natija qanday noto'g'ri chiqishini kuzating.
3. `A2:A100` ustunidagi ismlar orasidan `"Ali"` bilan boshlanadigan birinchi yozuvni wildcard (`"Ali*"`) yordamida toping.
4. Mos topilmagan holatda `#N/A` o'rniga `"Chegara topilmadi"` xabarini `IFNA` bilan chiqaring.
5. `MATCH` natijasini `OFFSET` yoki `INDEX` bilan birlashtirib, topilgan qatordan yon tomondagi qo'shimcha ustun qiymatini (masalan izoh) ham chiqarib bering.