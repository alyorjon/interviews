# 📊 Data Analyst Masterclass: Excel 365, Google Sheets, Power Query & DAX — 100 Real Interview Questions
### Ikki tilli Data Analitika Qo'llanmasi / Comprehensive Bilingual Data Analytics Guide (English 🇬🇧 & O'zbek 🇺🇿)

> **Mavzular / Topics:** Modern Excel 365 Dynamic Arrays (XLOOKUP, FILTER, UNIQUE, SORT, LAMBDA, MAP, REDUCE, VSTACK, HSTACK), Google Sheets QUERY() SQL Engine, IMPORTRANGE, REGEX, Power Query ETL (Unpivot, Merge, Group By), Power Pivot & DAX Measures (CALCULATE, Time Intelligence), Business Metrics (LTV, CAC, Churn, Cohort Analysis, Aging Buckets), Statistical Analytics (Z-Score, Outliers, Correlation).  
> **Darajalar / Levels:** 🟢 Basic (1–30) | 🟡 Intermediate (31–70) | 🔴 Advanced (71–100)

---

# 📚 CHUQUR NAZARIYA: DATA ANALYST EXCEL & GOOGLE SHEETS MASTERCLASS

---

## 1. ⚡ Modern Excel 365 & 2021 Dynamic Array Revolution
Eski Excel versiyalaridan farqli o'laroq (Ctrl+Shift+Enter kerak bo'lgan paytlar), Excel 365 va 2021 **Dynamic Arrays (Dinamik Massivlar)** dvigateliga ega:
- **Spill Range (`#` operatori):** Bitta formula butun ustun yoki jadvalga avtomatik yoyiladi (masalan, `=FILTER(A2:C100, C2:C100="Completed")`). `A2#` ko'rinishida yoyilgan diapazonga havola beriladi.
- **XLOOKUP vs VLOOKUP:** XLOOKUP chapga ham, o'ngga ham qidiradi, uchinchi ustun indeksini talab qilmaydi, sukut bo'yicha aniq moslik (`Exact Match`) ishlatadi va `#N/A` xatolarini `if_not_found` parametri bilan hal qiladi.
- **Yangi Dynamic Array Helpers:**
  - `VSTACK(array1, array2)` / `HSTACK`: Bir nechta jadvallarni vertikal yoki gorizontal birlashtirish.
  - `CHOOSEROWS(array, row_num1, ...)` / `CHOOSECOLS`: Jadvaldan kerakli ustun/qatorlarni ajratib olish.
  - `TAKE(array, rows, cols)` / `DROP`: Massivning boshidan/oxiridan qatorlarni olish yoki tashlab yuborish.
  - `WRAPROWS` / `WRAPCOLS`: Bitta qatorni ko'p qatorli jadvalga aylantirish.

---

## 2. 🧮 Advanced LAMBDA Engine & Higher-Order Functions
Excel 365 da kod yozmasdan shaxsiy formulalar yaratish va massivlarni qayta ishlash:
- **`LAMBDA(param1, param2, expression)`:** Maxsus formula funksiyasi yaratish (Name Manager ga saqlanadi).
- **`MAP(array, LAMBDA(x, ...))`:** Massivdagi har bir elementni alohida o'zgartirish.
- **`BYROW(array, LAMBDA(row, ...))`:** Jadvalning har bir qatori bo'yicha hisob-kitob bajarish (masalan `=BYROW(A2:D100, LAMBDA(r, SUM(r)))`).
- **`SCAN(initial_value, array, LAMBDA(accumulator, current))`:** Kumulyativ (o'sib boruvchi) yig'indi va balansni dinamik hisoblash.
- **`REDUCE(initial_value, array, LAMBDA(acc, val))`:** Massivni bitta yakuniy qiymatga keltirish (masalan text join).

---

## 3. 🔍 Google Sheets Analytics: `QUERY()` SQL Engine
Google Sheets data analitiklarga SQL sintaksisidan foydalanish imkonini beradi:
- **Sintaksis:** `=QUERY(A1:Z1000, "SELECT A, SUM(B), AVG(C) WHERE D = 'Active' GROUP BY A ORDER BY SUM(B) DESC LIMIT 10", 1)`
- **`PIVOT` bandi:** SQL kabi ustunlarni ko'ndalang Cross-tab PIVOT holatiga o'tkazadi (`SELECT A, SUM(C) GROUP BY A PIVOT B`).
- **`IMPORTRANGE("spreadsheet_url", "Sheet1!A:Z")`:** Boshqa Excel/Sheets fayllaridan ma'lumotlarni real-vaqt rejimida avtomatik tortib olish.
- **REGEX Formulalari:** `REGEXEXTRACT` (matndan raqam/email ajratish), `REGEXMATCH` (shartga moslik), `REGEXREPLACE`.

---

## 4. 🔄 Power Query (ETL) & Power Pivot (DAX)
Data Analyst lavozimida millionlab qatorlar bilan ishlash:
- **Power Query (Extract, Transform, Load):**
  - **Unpivot Columns:** Keng (wide) jadvallarni analitika uchun to'g'ri (tall/skinny) ko'rinishga keltirish.
  - **Merge Queries (SQL Join):** Inner Join, Left Outer Join, Full Outer Join yordamida jadvallarni bog'lash.
  - **Fuzzy Matching:** Imlo xatolari bo'lgan matnlarni sun'iy o'xshashlik foizi bo'yicha moslashtirish.
- **Power Pivot & Data Modeling:**
  - **Star Schema (Yulduzsimon sxema):** Fact Table (savdolar) va Dimension Tables (mijozlar, mahsulotlar, kalendar) o'rtasida 1:N munosabat o'rnatish.
  - **DAX Measures (Data Analysis Expressions):**
    - `=CALCULATE(SUM(Sales[Amount]), Filter(Customer, Customer[Region]="Tashkent"))`
    - **Time Intelligence:** `=CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(Calendar[Date]))` (O'tgan yilgi mos davr bilan taqqoslash).

---

## 5. 📈 Business Metrics & Data Analytics Formulas
- **LTV (Lifetime Value):** `=Average_Order_Value * Purchase_Frequency * Customer_Lifespan`
- **CAC (Customer Acquisition Cost):** `=Total_Marketing_Cost / New_Customers_Acquired`
- **Churn Rate %:** `=(Lost_Customers_End_of_Period / Customers_Start_of_Period) * 100`
- **Retention Rate %:** `=100 - Churn_Rate`
- **ARPU (Average Revenue Per User):** `=Total_Revenue / Active_Users`
- **Cohort Analysis:** Mijozlarni ro'yxatdan o'tgan oyi bo'yicha guruhlab, har oygi ushlanib qolish foizini hisoblash.
- **Accounts Receivable Aging Buckets:** `0-30 days`, `31-60 days`, `61-90 days`, `90+ days` qarzdorlik muddatlarini `=IFS(days<=30, "0-30", days<=60, "31-60", days<=90, "61-90", TRUE, "90+ Days")` bilan ajratish.
- **Outlier Detection (Z-Score):** `=(X - AVERAGE(Range)) / STDEV.S(Range)` (Z > 3 yoki Z < -3 bo'lsa anomalie deb qaraladi).

---

# 🟢 QUESTIONS & ANSWERS (Q1 – Q100)

---


## Q1. XLOOKUP vs VLOOKUP / INDEX&MATCH Architectural Comparison | XLOOKUP va VLOOKUP / INDEX&MATCH taqqoslanishi

**EN:** XLOOKUP performs left lookup, defaults to exact match, handles missing values gracefully with `if_not_found`, and eliminates static column index numbers.

**UZB:** XLOOKUP chap tomonga ham qidiradi, sukut bo'yicha aniq moslikni ishlatadi va ustun raqami o'rniga to'g'ri diapazon havolasini oladi.

```excel
=XLOOKUP(E2, A2:A1000, C2:C1000, "Noma'lum Mijoz", 0)
```

---

## Q2. Google Sheets `QUERY()` SQL Engine Syntax | Google Sheets QUERY() formulasi va SQL so'rovlari

**EN:** Executing SQL-like queries inside Google Sheets for filtering, aggregation, grouping, and pivoting large datasets.

**UZB:** Google Sheets ichida SELECT, WHERE, GROUP BY, PIVOT va ORDER BY kabi SQL buyruqlarini yozib ma'lumotlarni saralash.

```excel
=QUERY(A1:F1000, "SELECT A, SUM(C), AVG(D) WHERE E = 'Completed' GROUP BY A ORDER BY SUM(C) DESC LIMIT 10", 1)
```

---

## Q3. Excel 365 `FILTER()` & Dynamic Array Spill `#` | Excel 365 FILTER() formulasi va Spill Range `#` operatori

**EN:** FILTER dynamically extracts rows matching criteria into a Spill Range. Referencing `A2#` dynamically tracks the spilled array size.

**UZB:** FILTER shartga mos qatorlarni avtomatik yoyib (Spill) beradi. `A2#` havolasi ushbu dinamik natijaga bog'lanadi.

```excel
=FILTER(A2:D500, (B2:B500="Tashkent") * (C2:C500>=1000), "Topilmadi")
```

---

## Q4. Power Query Unpivot Columns for Data Analytics | Power Query Unpivot Columns (Ustunlarni qatorga o'tkazish)

**EN:** Transforming wide matrix tables (months as headers) into tall tabular format essential for Pivot Tables and BI data modeling.

**UZB:** Oylar ustunlarda joylashgan keng jadvallarni Pivot Table uchun mos bo'lgan vertikal 2 ustunli (Attribute/Value) holatga keltirish.

```excel
Power Query Editor -> Select Fixed Columns -> Right-click -> Unpivot Other Columns
```

---

## Q5. DAX `CALCULATE()` & Filter Overrides in Power Pivot | DAX CALCULATE() va Filter Context o'zgartirish

**EN:** CALCULATE evaluates an expression in a modified filter context, acting as the most powerful function in DAX modeling.

**UZB:** CALCULATE o'lchov qiymatini mavjud filtr kontekstini o'zgartirgan holda hisoblaydigan DAX dagi eng asosiy funksiyadir.

```excel
Total_Tashkent_Sales = CALCULATE(SUM(Sales[Amount]), Customer[City] = "Tashkent")
```

---

## Q6. Excel 365 `LAMBDA()` & Custom Functions | Excel 365 LAMBDA() yordamida shaxsiy formulalar yaratish

**EN:** Creating reusable custom Excel formulas without VBA or Macros, saved directly inside Name Manager.

**UZB:** VBA kod yozmasdan Name Manager da saqlanadigan va qayta ishlatiladigan shaxsiy formulalar yaratish.

```excel
=LAMBDA(price, tax_rate, price * (1 + tax_rate))(100, 0.12)
```

---

## Q7. Cohort Analysis & Retention Rate Calculation | Cohort Analysis va Mijozlarni ushlab qolish foizi (Retention)

**EN:** Grouping customers by acquisition month (cohort) and calculating month-over-month retention percentage matrix.

**UZB:** Mijozlarni ro'yxatdan o'tgan oyi bo'yicha guruhlab, har oygi faollik foizini Matrix Pivot Table da tahlil qilish.

```excel
Retention % = (Active_Users_in_Month_N / Total_Cohort_Users) * 100
```

---

## Q8. Aging Buckets for Accounts Receivable (A/R) | Qarzdorlik muddatlarini (Aging Buckets) guruhlash

**EN:** Segmenting unpaid customer invoices into overdue buckets (0-30, 31-60, 61-90, 90+ days) to assess credit risk.

**UZB:** Mijozlarning to'lanmagan qarzdorlik muddatlarini 0-30, 31-60, 61-90 va 90+ kunlik xavf guruhlariga ajratish.

```excel
=IFS(D2<=30, "0-30 Days", D2<=60, "31-60 Days", D2<=90, "61-90 Days", TRUE, "90+ Days Overdue")
```

---

## Q9. Detecting Outliers via Z-Score | Z-Score yordamida anomal (Outlier) qiymatlarni aniqlash

**EN:** Identifying statistical anomalies where data points deviate by more than 3 standard deviations from the mean.

**UZB:** O'rtacha qiymatdan 3 ta standart chetlanishdan uzoqlashgan anomal ma'lumotlarni matematik aniklash.

```excel
=(A2 - AVERAGE($A$2:$A$1000)) / STDEV.S($A$2:$A$1000)
```

---

## Q10. Google Sheets `IMPORTRANGE()` & Dynamic Cross-Workbook Sync | Google Sheets IMPORTRANGE() va avtomatik sinxronizatsiya

**EN:** Live fetching data from external Google Sheets workbooks using document URL and cell range.

**UZB:** Tashqi Google Sheets hujjatidan real-vaqt rejimida avtomatik ma'lumotlarni tortib olish.

```excel
=IMPORTRANGE("https://docs.google.com/spreadsheets/d/1ABC...", "SalesData!A1:Z5000")
```

---

## Q11. Two-Way Matrix Lookup (XLOOKUP inside XLOOKUP) | Ikki tomonlama Matrix Lookup (XLOOKUP ichida XLOOKUP)

**EN:** Finding values at the intersection of a specific row header and column header using nested XLOOKUP.

**UZB:** Qator sarlavhasi va ustun sarlavhasi kesishgan nuqtadagi qiymatni topish.

```excel
=XLOOKUP("Tashkent", City_Range, XLOOKUP("March", Month_Headers, Data_Matrix))
```

---

## Q12. Case-Sensitive Lookup via XLOOKUP & EXACT | Katta-kichik harfga ta'sirchan Lookup (XLOOKUP + EXACT)

**EN:** Performing lookup that distinguishes between uppercase and lowercase text using EXACT array comparison.

**UZB:** Katta va kichik harflarni ajratadigan qidiruvni amalga oshirish.

```excel
=XLOOKUP(TRUE, EXACT(E2, Code_Range), Result_Range)
```

---

## Q13. Multi-Criteria Lookup via Boolean Logic | Bir nechta shartli Lookup (Boolean Array Ko'paytmasi)

**EN:** Searching values based on multiple conditions without helper columns by multiplying boolean criteria arrays.

**UZB:** Yordamchi ustunsiz bir nechta shartlar bo'yicha mos keluvchi qiymatni topish.

```excel
=XLOOKUP(1, (Region_Range="Asia") * (Status_Range="Active"), Sales_Range)
```

---

## Q14. Finding Last Non-Empty Cell in Row or Column | Ustun yoki qatordagi oxirgi to'la katakni topish

**EN:** Retrieving the last entered entry in a dynamic range using LOOKUP function pattern.

**UZB:** Dinamik ustundagi eng oxirgi yozilgan ma'lumotni topish.

```excel
=LOOKUP(2, 1/(A:A<>""), A:A)
```

---

## Q15. Dynamic Top N Ranking via SORT, FILTER & TAKE | Dinamik Top N reytingni chiqarish (SORT + FILTER + TAKE)

**EN:** Extracting top 5 revenue generating products dynamically into a standalone table.

**UZB:** Eng ko'p daromad keltirgan Top 5 mahsulotlarni avtomatik chiqaruvchi dinamik formula.

```excel
=TAKE(SORT(FILTER(A2:C100, C2:C100>0), 3, -1), 5)
```

---

## Q16. Extracting Unique List of Duplicates | Faqat takrorlangan elementlar ro'yxatini ajratish

**EN:** Generating a list of items that appear more than once using UNIQUE, FILTER, and COUNTIF.

**UZB:** Jadvalda 1 martadan ko'p takrorlangan mahsulotlar ro'yxatini chiqarish.

```excel
=UNIQUE(FILTER(A2:A100, COUNTIF(A2:A100, A2:A100) > 1))
```

---

## Q17. Text Parsing: Extract First and Last Name | Matndan ism va familiyani ajratish (TEXTBEFORE / TEXTAFTER)

**EN:** Extracting first name and last name from a full name string cleanly without complex FIND formulas.

**UZB:** To me liq ismdan ism va familiyani ajratib olish.

```excel
First Name: =TEXTBEFORE(A2, " ") | Last Name: =TEXTAFTER(A2, " ")
```

---

## Q18. Regex Text Extraction in Google Sheets | Google Sheets da REGEXEXTRACT orqali matn ajratish

**EN:** Extracting emails, phone numbers, or code IDs using regular expression pattern matching.

**UZB:** Matn ichidan email yoki telefon raqamini regular expression bilan ajratish.

```excel
=REGEXEXTRACT(A2, "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
```

---

## Q19. Sensitive Data Masking (Credit Cards / Phone Numbers) | Maxfiy ma'lumotlarni yashirish (Masking)

**EN:** Masking credit card numbers showing only the last 4 digits for privacy compliance.

**UZB:** Kredit karta raqamlarining oxirgi 4 ta raqamidan tashqari qismini yashirish.

```excel
="****-****-****-" & RIGHT(A2, 4)
```

---

## Q20. Calculating Workdays Excluding Custom Holidays | Ish kunlarini hisoblash (NETWORKDAYS.INTL)

**EN:** Calculating exact working days between two dates taking custom weekends and holiday lists into account.

**UZB:** Dam olish kunlari va bayramlarni chiqarib tashlagan holda aniq ish kunlari sonini hisoblash.

```excel
=NETWORKDAYS.INTL(Start_Date, End_Date, 1, Holiday_List)
```

---

## Q21. Employee Age & Tenure in Years and Months | Xodim yoshi va stajini yil va oyda hisoblash (DATEDIF)

**EN:** Computing precise age or tenure breakdown in formatted string using DATEDIF.

**UZB:** Xodim stajini 'X Yil, Y Oy' ko'rinishida chiqarish.

```excel
=DATEDIF(Birth_Date, TODAY(), "Y") & " Yil, " & DATEDIF(Birth_Date, TODAY(), "YM") & " Oy"
```

---

## Q22. First and Last Day of Month Dynamic Math | Oyning birinchi va oxirgi kunini hisoblash (EOMONTH)

**EN:** Calculating current month start and end dates dynamically for reporting periods.

**UZB:** Har qanday sana uchun oyning birinchi va oxirgi kunini hisoblash.

```excel
Start of Month: =DATE(YEAR(A2), MONTH(A2), 1) | End of Month: =EOMONTH(A2, 0)
```

---

## Q23. Grouping Dates into Fiscal Quarters (Q1-Q4) | Sanalarni choraklarga bo'lish (Q1-Q4)

**EN:** Categorizing invoice dates into Q1, Q2, Q3, Q4 financial quarters.

**UZB:** Sanalarni moliyaviy choraklarga avtomatik ajratish.

```excel
="Q" & ROUNDUP(MONTH(A2)/3, 0) & "-" & YEAR(A2)
```

---

## Q24. Overlapping Date Range Collision Detection | Ustma-ust tushgan sanalar to'qnashuvini aniqlash

**EN:** Checking if two date intervals overlap for resource allocation or room booking systems.

**UZB:** Ikkita sana oralig'i bir-biriga xalaqit berayotganini tekshirish.

```excel
=MAX(Start1, Start2) <= MIN(End1, End2)
```

---

## Q25. Google Sheets Stacked Arrays `{Sheet1!A:B; Sheet2!A:B}` | Google Sheets vertikal jadvallarni ulash `{}`

**EN:** Stacking multiple sheet ranges vertically in Google Sheets using literal array curly braces.

**UZB:** Google Sheets da bir nechta varaqlar diapazonini bitta jadvalga vertikal ulash.

```excel
={Sheet1!A2:B100; Sheet2!A2:B100}
```

---

## Q26. Dynamic Dependent Dropdown Lists (INDIRECT) | Dinamik bog'liq (Dependent) Dropdown ro me yxatlar

**EN:** Creating dynamic second dropdown lists that depend on the selection of first category dropdown.

**UZB:** Birinchi tanlovga qarab ikkinchi dropdown ro'yxatini avtomatik o'zgartirish.

```excel
=INDIRECT(SUBSTITUTE(A2, " ", "_"))
```

---

## Q27. Live Stock Prices & Exchange Rates in Sheets | Google Sheets da valyuta kurslarini real-vaqt rejimida olish

**EN:** Fetching real-time USD/UZS exchange rate or stock metrics using GOOGLEFINANCE.

**UZB:** Valyuta kurslarini real-vaqt rejimida avtomatik yangilab turish.

```excel
=GOOGLEFINANCE("CURRENCY:USDUZS")
```

---

## Q28. Dynamic Text Translation in Google Sheets | Google Sheets da matnlarni avtomatik tarjima qilish

**EN:** Translating text columns automatically across languages using GOOGLETRANSLATE.

**UZB:** Matnlarni boshqa tillarga avtomatik tarjima qilish.

```excel
=GOOGLETRANSLATE(A2, "en", "uz")
```

---

## Q29. Automating Google Sheets via Apps Script (JS) | Google Apps Script (JavaScript) yordamida avtomatlashtirish

**EN:** Writing custom JavaScript macros to automate email reporting and sheet cleanups.

**UZB:** Google Sheets da JS kod yozib elektron pochtaga avtomatik hisobot yuborish.

```excel
function sendReport() { var sheet = SpreadsheetApp.getActiveSpreadsheet(); ... }
```

---

## Q30. Combining Tables Vertically via `VSTACK` | Jadvallarni vertikal birlashtirish (VSTACK)

**EN:** Stacking multiple tables on top of each other dynamically in Excel 365.

**UZB:** Bir nechta jadvallarni ustma-ust dinamik biriktirish.

```excel
=VSTACK(Sales_2023, Sales_2024, Sales_2025)
```

---

## Q31. Combining Tables Horizontally via `HSTACK` | Jadvallarni gorizontal birlashtirish (HSTACK)

**EN:** Appending columns side-by-side dynamically in Excel 365.

**UZB:** Jadvallarni yonma-yon gorizontal biriktirish.

```excel
=HSTACK(Customer_Names, Sales_Totals)
```

---

## Q32. Selecting Specific Columns via `CHOOSECOLS` | Jadvaldan kerakli ustunlarni tanlash (CHOOSECOLS)

**EN:** Extracting only 1st, 3rd, and 5th columns from a massive dataset dynamically.

**UZB:** Katta jadvaldan faqat 1, 3 va 5-ustunlarni dinamik ajratib olish.

```excel
=CHOOSECOLS(A2:Z1000, 1, 3, 5)
```

---

## Q33. Selecting Specific Rows via `CHOOSEROWS` | Jadvaldan kerakli qatorlarni tanlash (CHOOSEROWS)

**EN:** Extracting specific row numbers from an array dynamically.

**UZB:** Jadvaldan tanlangan qator nomerlarini ajratib olish.

```excel
=CHOOSEROWS(A2:Z1000, 1, 5, 10, 15)
```

---

## Q34. Extracting Top N Rows from Array via `TAKE` | Massivdan dastlabki N qatorni olish (TAKE)

**EN:** Extracting first 10 rows or last 5 columns from dynamic array output.

**UZB:** Dinamik jadvalning birinchi 10 ta qatorini kesib olish.

```excel
=TAKE(A2:D100, 10)
```

---

## Q35. Dropping Header or First N Rows via `DROP` | Dastlabki Sarlavha qatorlarini olib tashlash (DROP)

**EN:** Removing top 1 row (header) or last 3 rows from array output dynamically.

**UZB:** Jadvalning sarlavha qatorini tashlab yuborish.

```excel
=DROP(A1:D100, 1)
```

---

## Q36. Converting Matrix to Single Row via `TOROW` | Matritsani bitta qatorga aylantirish (TOROW)

**EN:** Flattening a 2D table into a single horizontal row.

**UZB:** 2D jadvalni bitta gorizontal qatorga yoyish.

```excel
=TOROW(A1:D10, 1)
```

---

## Q37. Converting Matrix to Single Column via `TOCOL` | Matritsani bitta ustunga aylantirish (TOCOL)

**EN:** Flattening a 2D matrix into a single continuous vertical column.

**UZB:** 2D jadvalni bitta vertikal ustunga yoyish.

```excel
=TOCOL(A1:D10, 1)
```

---

## Q38. Wrapping Single Row into Matrix via `WRAPROWS` | Bitta qatorni ko'p qatorli jadvalga aylantirish (WRAPROWS)

**EN:** Reshaping a continuous 1D list into a grid with N columns.

**UZB:** Bitta uzun qatorni N ustunli jadvalga o'rash.

```excel
=WRAPROWS(A1:Z1, 4)
```

---

## Q39. Wrapping Single Column into Matrix via `WRAPCOLS` | Bitta ustunni ko'p ustunli jadvalga aylantirish (WRAPCOLS)

**EN:** Reshaping a continuous single column into a grid with N rows per column.

**UZB:** Bitta uzun ustunni N qatorli jadvalga o'rash.

```excel
=WRAPCOLS(A1:A100, 10)
```

---

## Q40. Transforming Array Element-by-Element via `MAP` | MAP va LAMBDA yordamida har bir elementni o'zgartirish

**EN:** Applying custom formula logic across every cell of array dynamically.

**UZB:** Massivdagi har bir katakka alohida shaxsiy mantiqni qo me llash.

```excel
=MAP(A2:A100, LAMBDA(val, IF(val>100, val*0.9, val)))
```

---

## Q41. Row-Level Calculations via `BYROW` & `LAMBDA` | BYROW yordamida qatorlar bo'yicha hisoblash

**EN:** Executing row-by-row aggregation without dragging formulas down.

**UZB:** Formulani pastga tortmasdan har bir qator uchun yig'indi hisoblash.

```excel
=BYROW(A2:D100, LAMBDA(r, SUM(r)))
```

---

## Q42. Column-Level Calculations via `BYCOL` & `LAMBDA` | BYCOL yordamida ustunlar bo'yicha hisoblash

**EN:** Executing column-by-column calculations dynamically across dataset.

**UZB:** Har bir ustun uchun dinamik o'rtacha qiymat hisoblash.

```excel
=BYCOL(A2:D100, LAMBDA(col, AVERAGE(col)))
```

---

## Q43. Dynamic Running Balance via `SCAN` & `LAMBDA` | SCAN yordamida dinamik kumulyativ balans hisoblash

**EN:** Computing running total sum or cumulative balance without standard cumulative formulas.

**UZB:** O'sib boruvchi kumulyativ balansni dinamik hisoblash.

```excel
=SCAN(0, B2:B100, LAMBDA(acc, val, acc + val))
```

---

## Q44. Array Reduction via `REDUCE` & `LAMBDA` | REDUCE yordamida massivni bitta qiymatga keltirish

**EN:** Consolidating an array into a single text string or total value dynamically.

**UZB:** Butun massivni bitta matnga yig'ib chiqish.

```excel
=REDUCE("", A2:A10, LAMBDA(acc, val, acc & ", " & val))
```

---

## Q45. Customer Lifetime Value (LTV) Formula | Customer Lifetime Value (LTV) hisoblash formulasi

**EN:** Measuring total revenue a customer yields over their entire account relationship.

**UZB:** Mijozning butun davr mobaynida keltiradigan umumiy daromadini hisoblash.

```excel
LTV = Avg_Order_Value * Purchase_Frequency * Customer_Lifespan
```

---

## Q46. Customer Acquisition Cost (CAC) Formula | Customer Acquisition Cost (CAC) hisoblash formulasi

**EN:** Calculating average marketing and sales cost spent to acquire one new customer.

**UZB:** Bitta yangi mijozni jalb qilish uchun sarflangan marketing xarajatini hisoblash.

```excel
CAC = Total_Marketing_and_Sales_Costs / New_Customers_Acquired
```

---

## Q47. Monthly Churn Rate % Formula | Oylik Churn Rate % (Mijozlarni yo'qotish foizi)

**EN:** Measuring percentage of customers who cancel or stop purchasing in a given period.

**UZB:** Oy davomida xizmatdan voz kechgan mijozlar foizini hisoblash.

```excel
Churn Rate % = (Lost_Customers / Customers_at_Start) * 100
```

---

## Q48. Customer Retention Rate % Matrix | Retention Rate % (Mijozlarni ushlab qolish foizi)

**EN:** Measuring percentage of existing customers who remain active over period.

**UZB:** Mijozlarni ushlab qolish ko'rsatkichini hisoblash.

```excel
Retention Rate % = 100 - Churn_Rate_%
```

---

## Q49. Average Revenue Per User (ARPU) Formula | ARPU (Har bir foydalanuvchiga to'g'ri keluvchi o'rtacha daromad)

**EN:** Calculating average revenue generated per active user subscription.

**UZB:** Har bir faol foydalanuvchidan olinadigan o'rtacha daromad.

```excel
ARPU = Total_Revenue / Total_Active_Users
```

---

## Q50. Monthly Recurring Revenue (MRR) Growth | MRR (Oylik qaytuvchi daromad) o'sish foizi

**EN:** Tracking predictable monthly subscription revenue growth MoM.

**UZB:** Oylik obuna daromadlarining o'sish dinamikasini hisoblash.

```excel
MRR_Growth_% = ((Current_MRR - Previous_MRR) / Previous_MRR) * 100
```

---

## Q51. Net Promoter Score (NPS) Formula | Net Promoter Score (NPS) hisoblash formulasi

**EN:** Measuring customer loyalty percentage based on Promoters (9-10) minus Detractors (0-6).

**UZB:** Mijozlar sodiqlik indeksini (Promoters % - Detractors %) hisoblash.

```excel
NPS = (% Promoters) - (% Detractors)
```

---

## Q52. Financial Loan Monthly Payment (PMT) | Kredit oylik to'lovini hisoblash (PMT)

**EN:** Calculating fixed monthly payment for loan given interest rate, principal, and period.

**UZB:** Kredit foizi va muddati bo'yicha oylik to'lov summasini hisoblash.

```excel
=PMT(Annual_Rate/12, Months_Period, -Loan_Principal)
```

---

## Q53. Net Present Value of Cash Flows (NPV) | Sof joriy qiymatni hisoblash (NPV)

**EN:** Calculating net present value of investment using discount rate and cash flows.

**UZB:** Investitsiyaning kelajakdagi pul oqimlarining bugungi sof qiymatini hisoblash.

```excel
=NPV(Discount_Rate, Cash_Flows_Range) + Initial_Investment
```

---

## Q54. Internal Rate of Return (IRR) | Ichki daromadlilik me'yori (IRR)

**EN:** Finding the discount rate at which net present value of investment equals zero.

**UZB:** Investitsiya o me zini o'zi qoplash diskont foiz stavkasini hisoblash.

```excel
=IRR(Cash_Flows_Range)
```

---

## Q55. Irregular Cash Flow Net Present Value (XNPV) | NoreFormat pul oqimlari uchun joriy qiymat (XNPV)

**EN:** Computing NPV for cash flows occurring at irregular date intervals.

**UZB:** Turli sanalarda sodir bo'ladigan pul oqimlarining joriy qiymatini hisoblash.

```excel
=XNPV(Discount_Rate, Cash_Flows, Dates_Range)
```

---

## Q56. Irregular Cash Flow Internal Rate of Return (XIRR) | NoreFormat pul oqimlari uchun ichki daromadlilik (XIRR)

**EN:** Computing IRR for investment cash flows with exact non-periodic transaction dates.

**UZB:** Aniq sanalarga ega pul oqimlarining ichki daromadlilik stavkasini hisoblash.

```excel
=XIRR(Cash_Flows, Dates_Range)
```

---

## Q57. Compound Annual Growth Rate (CAGR) | O'rtacha yillik murakkab o'sish sur'ati (CAGR)

**EN:** Calculating geometric mean growth rate of investment over multiple years.

**UZB:** Ko'p yillik investitsiyaning o'rtacha yillik murakkab o'sish sur'atini hisoblash.

```excel
CAGR = (Ending_Value / Beginning_Value)^(1 / Years) - 1
```

---

## Q58. Weighted Average Cost of Capital (WACC) | WACC (Kapitalning o'rtacha tortilgan qiymati)

**EN:** Computing company overall cost of capital weighted by equity and debt components.

**UZB:** Kompaniya kapitalining o'rtacha tortilgan qiymatini hisoblash.

```excel
WACC = (E/V * Re) + (D/V * Rd * (1 - Tax_Rate))
```

---

## Q59. Discounted Cash Flow Valuation (DCF) | DCF (Diskontlangan pul oqimlari bo'yicha baholash)

**EN:** Valuing enterprise business worth based on projected future discounted cash flows.

**UZB:** Kompaniyaning kelajakdagi pul oqimlarini diskontlab biznes qiymatini aniqlash.

```excel
Enterprise_Value = SUM(PV_of_Free_Cash_Flows) + PV_of_Terminal_Value
```

---

## Q60. Inventory Turnover Ratio Formula | Tavar-moddiy zaxiralar aylanish ko'rsatkichi

**EN:** Measuring how many times inventory is sold and replaced over reporting period.

**UZB:** Zaxiralarning bir yilda necha marta to'liq sotilib yangilanishini hisoblash.

```excel
Inventory_Turnover = Cost_of_Goods_Sold (COGS) / Average_Inventory
```

---

## Q61. Days Sales of Inventory (DSI) Formula | DSI (Zaxiralarning sotilish kuni)

**EN:** Measuring average number of days required to turn inventory into sales.

**UZB:** Zaxiradagi tovarlarning pulga aylanishi uchun ketadigan o'rtacha kunlar soni.

```excel
DSI = (Average_Inventory / COGS) * 365
```

---

## Q62. Pareto 80/20 Rule Identification | Pareto 80/20 qoidasini aniklash

**EN:** Categorizing products contributing to top 80% cumulative revenue.

**UZB:** Umumiy daromadning 80% ini keltiradigan Top 20% mahsulotlarni ajratish.

```excel
=IF(Running_Percent<=0.8, "Class A (Top 80% Revenue)", "Class B/C")
```

---

## Q63. Interquartile Range (IQR) Outlier Detection | Interquartile Range (IQR) orqali anomaliya aniqlash

**EN:** Finding statistical outliers using Q1, Q3, and 1.5 * IQR boundaries.

**UZB:** Kvartillar oralig'i (IQR) yordamida statistik chetlanishlarni aniqlash.

```excel
IQR = QUARTILE.INC(Range, 3) - QUARTILE.INC(Range, 1)
```

---

## Q64. Moving Average 3-Month Trend Smoothing | 3 oylik Sirpanuvchi o'rtacha Trendni tekislash

**EN:** Smoothing seasonal metric fluctuations using rolling 3-month average calculation.

**UZB:** Mavsumiy tebranishlarni silliqlash uchun 3 oylik sirpanuvchi o'rtacha ko me rsatkich.

```excel
=AVERAGE(OFFSET(C2, -2, 0, 3, 1))
```

---

## Q65. Linear Regression Slope & Intercept | Chiziqli regressiya Trend qiyaligi (SLOPE / INTERCEPT)

**EN:** Calculating linear regression trendline slope to forecast future sales growth.

**UZB:** Kelajakdagi savdo trendini bashorat qilish uchun chiziqli regressiya qiyaligi.

```excel
Slope: =SLOPE(Sales_Y, Month_X) | Intercept: =INTERCEPT(Sales_Y, Month_X)
```

---

## Q66. Pearson Correlation Coefficient (CORREL) | Pirson Korrelyatsiya ko'rsatkichi (CORREL)

**EN:** Measuring statistical strength of linear relationship between two analytics variables.

**UZB:** Ikki o'zgaruvchi orasidagi chiziqli bog me liqlik kuchini o'lchash (-1 dan +1 gacha).

```excel
=CORREL(Marketing_Spend, New_Leads)
```

---

## Q67. Frequency Distribution Histograms (FREQUENCY) | Gistogrammalar uchun chastota taqsimoti (FREQUENCY)

**EN:** Counting occurrences of values falling into specified bucket intervals.

**UZB:** Ma'lumotlarning interval oraliqlariga tushish chastotasini hisoblash.

```excel
=FREQUENCY(Data_Array, Bins_Array)
```

---

## Q68. Weighted Average Price Formula | O'rtacha tortilgan narx hisoblash (SUMPRODUCT / SUM)

**EN:** Computing weighted average unit price considering varying batch quantities.

**UZB:** Har xil hajmdagi partiyalar uchun o'rtacha tortilgan narxni hisoblash.

```excel
=SUMPRODUCT(Prices_Range, Quantities_Range) / SUM(Quantities_Range)
```

---

## Q69. Standard Deviation & Variance (STDEV.S) | Standart chetlanish va Variatsiya (STDEV.S)

**EN:** Measuring sample dispersion and variability of data points around the mean.

**UZB:** Ma'lumotlarning o'rtacha qiymatdan tarqoqlik darajasini o'lchash.

```excel
StDev: =STDEV.S(Data_Range) | Variance: =VAR.S(Data_Range)
```

---

## Q70. Percentiles and Deciles (PERCENTILE.INC) | Protsentillar va Dettsillarni hisoblash

**EN:** Computing 90th percentile performance benchmarks for response times or salaries.

**UZB:** Ma'lumotlar to me plamining 90-protsentil chegarasini hisoblash.

```excel
=PERCENTILE.INC(Salary_Range, 0.9)
```

---

## Q71. Power Query Fuzzy Matching for Typos | Power Query Fuzzy Matching (Imlo xatolarini moslash)

**EN:** Merging customer records containing minor typos or spelling variations automatically.

**UZB:** Imlo xatolari bo me lgan mijoz nomlarini sun'iy moslik foizi bo'yicha biriktirish.

```excel
Power Query -> Merge Queries -> Check 'Use fuzzy matching to perform the merge'
```

---

## Q72. Power Query Merge Queries (SQL Joins) | Power Query Merge Queries (SQL Join turlari)

**EN:** Joining tables using Inner Join, Left Outer Join, or Full Outer Join based on matching keys.

**UZB:** Jadvallarni kalit ustun bo me yicha Left Outer Join yoki Inner Join bilan birlashtirish.

```excel
Power Query -> Merge Queries -> Select Join Kind (Left Outer)
```

---

## Q73. Power Query Append Queries (Union Tables) | Power Query Append Queries (Jadvallarni birlashtirish)

**EN:** Combining multiple monthly CSV files with identical structure into one master table.

**UZB:** Bir xil tuzilishga ega 12 ta oylik fayllarni bitta master jadvalga ulash.

```excel
Power Query -> Append Queries as New -> Select Tables
```

---

## Q74. Power Query Custom Conditional Columns | Power Query da shartli yangi ustun yaratish

**EN:** Adding calculated rule-based columns directly inside Power Query ETL engine.

**UZB:** Power Query ichida IF-THEN-ELSE mantiqiy qoidalari bilan ustun qo'shish.

```excel
Power Query -> Add Column -> Conditional Column -> If Amount > 1000 then 'VIP' else 'Standard'
```

---

## Q75. Power Query Group By Aggregations | Power Query Group By va Jamlash operatsiyalari

**EN:** Grouping millions of rows by Region and computing Total Sales and Count instantly.

**UZB:** Millionlab qatorlarni viloyatlar bo'yicha guruhlab savdo yig me indisini hisoblash.

```excel
Power Query -> Transform -> Group By -> Operation: Sum
```

---

## Q76. Power Query Custom M Code Transformations | Power Query M Language kodlarini yozish

**EN:** Writing advanced custom M code transformations inside Advanced Editor.

**UZB:** Power Query Advanced Editor da M tilida maxsus transformatsiyalar yozish.

```excel
= Table.AddColumn(Source, "CleanText", each Text.Trim(Text.Lower([RawName])))
```

---

## Q77. Power Pivot Star Schema Data Model | Power Pivot Star Schema (Yulduzsimon ma'lumotlar modeli)

**EN:** Structuring Data Model with central Fact Table connected to surrounding Dimension Tables.

**UZB:** Ma'lumotlar modelini 1 ta Fakt va unga ulangan Dimensiya jadvallari bilan qurish.

```excel
FactSales (1:N) <- DimCustomer, DimProduct, DimCalendar
```

---

## Q78. Power Pivot 1-to-Many Relationships | Power Pivot 1:N (Birga-Ko'p) munosabatlarini o'rnatish

**EN:** Creating one-to-many relationships between unique dimension keys and transaction logs.

**UZB:** Dimensiya jadvalidagi unikal kalitni Fakt jadvalidagi ko me p qatorlarga bog'lash.

```excel
Diagram View -> Drag DimCustomer[CustomerID] to FactSales[CustomerID]
```

---

## Q79. Power Pivot Inactive Relationships & USERELATIONSHIP | Faol bo'lmagan bog me liqliklar (USERELATIONSHIP)

**EN:** Activating secondary date relationships (e.g. Ship Date vs Order Date) dynamically in DAX.

**UZB:** Ikkinchi sana bo'yicha (Yetkazish sanasi) DAX o me lchovini dynamically faollashtirish.

```excel
Sales_by_ShipDate = CALCULATE(SUM(Sales[Amount]), USERELATIONSHIP(Calendar[Date], Sales[ShipDate]))
```

---

## Q80. DAX Time Intelligence: Prior Year Sales | DAX Time Intelligence: O'tgan yilgi savdo (SAMEPERIODLASTYEAR)

**EN:** Computing year-over-year sales performance comparison measure dynamically.

**UZB:** O'tgan yilning mos davridagi savdo hajmini joriy davr bilan taqqoslash.

```excel
Sales_Prior_Year = CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(Calendar[Date]))
```

---

## Q81. DAX Time Intelligence: Year-to-Date Total | DAX Time Intelligence: YTD (Yil boshidan buyon yig'indi)

**EN:** Computing cumulative year-to-date sales total measure dynamically.

**UZB:** Yil boshidan joriy sanagacha bo me lgan kumulyativ yig me indini hisoblash.

```excel
Sales_YTD = TOTALYTD(SUM(Sales[Amount]), Calendar[Date])
```

---

## Q82. DAX Measure: Ratio to Total All Category | DAX Measure: Umumiydan ulush foizi (ALL)

**EN:** Calculating category percentage contribution to total sales ignoring category filters.

**UZB:** Kategoriya filtriga qaramasdan umumiy savdodagi ulush foizini hisoblash.

```excel
Pct_of_Total = DIVIDE(SUM(Sales[Amount]), CALCULATE(SUM(Sales[Amount]), ALL(Product[Category])))
```

---

## Q83. DAX Measure: Filter Override with `KEEPFILTERS` | DAX KEEPFILTERS yordamida mavjud filtrlarni saqlash

**EN:** Intersecting explicit DAX filter criteria with current report context safely.

**UZB:** Mavjud Pivot Table filtrlarini buzmasdan yangi shart qo'shish.

```excel
Filtered_Sales = CALCULATE(SUM(Sales[Amount]), KEEPFILTERS(Product[Color] = "Red"))
```

---

## Q84. DAX Measure: Iterative Row Evaluation with `SUMX` | DAX SUMX yordamida qatorlar bo'yicha hisoblab yig me ish

**EN:** Multiplying Price * Quantity row-by-row before summing total revenue.

**UZB:** Har bir qatorda Narx * Miqdorni ko me paytirib, keyin yig me indini hisoblaydigan iterator.

```excel
Total_Revenue = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice])
```

---

## Q85. DAX Measure: Iterative Average with `AVERAGEX` | DAX AVERAGEX iterator formulasi

**EN:** Calculating row-level calculated metrics average across table rows.

**UZB:** Har bir mijoz bo me yicha o'rtacha buyurtma qiymatini hisoblash.

```excel
Avg_Order_Value = AVERAGEX(Customer, [Total_Revenue])
```

---

## Q86. DAX Measure: Safe Division Handling (`DIVIDE`) | DAX DIVIDE formulasi bilan xavfsiz bo'lish

**EN:** Dividing measures safely while returning zero or custom fallback instead of `#DIV/0!`.

**UZB:** Nolga bo'lganda `#DIV/0!` xatosi o me rniga xavfsiz 0 qaytarish.

```excel
Margin_% = DIVIDE([Total_Profit], [Total_Revenue], 0)
```

---

## Q87. Dynamic Chart Titles Linked to KPI Cards | Dinamik Grafik Sarlavhalari (Chart Titles)

**EN:** Linking chart title text dynamically to cell formula evaluating selected slicer values.

**UZB:** Grafik sarlavhasini tanlangan filtrga qarab avtomatik o me zgaradigan qilish.

```excel
="Sales Trend for " & IF(ISBLANK(Selected_Region), "All Regions", Selected_Region)
```

---

## Q88. Top N Scorecard Dashboard KPI Formatting | Top N KPI Scorecard Dashtboardlarini formatlash

**EN:** Displaying top metrics with conditional mini trend indicators (Up/Down arrows).

**UZB:** Dashboard dashboard KPI kartalarida o'sish va pasayish ko me rsatkichlarini yasash.

```excel
="▲ " & TEXT(Growth_Pct, "0.0%")
```

---

## Q89. Conditional Formatting Data Bars & Color Scales | Conditional Formatting Data Bars va Color Scales

**EN:** Applying visual in-cell data bars dynamically to compare volume sizes.

**UZB:** Kataklar ichida dinamik gistogramma chiziqlari va rangli shkalalar hosil qilish.

```excel
Home -> Conditional Formatting -> Data Bars -> Gradient Fill
```

---

## Q90. Interactive Dashboard Slicers & Timeline Filters | Interaktiv Dashboard Slicers va Timeline filtrlar

**EN:** Connecting visual slicer buttons to multiple Pivot Tables and Charts simultaneously.

**UZB:** Bitta Slicer tugmasini bir vaqtning o'zida bir nechta Pivot Table va grafiklar bilan bog'lash.

```excel
PivotTable Analyze -> Insert Slicer -> Report Connections -> Check all PivotTables
```

---

## Q91. Password Protecting Formulas & Locking Cells | Formulalarni parollash va kataklarni qulflash

**EN:** Locking formula cells while allowing user data input in designated ranges.

**UZB:** Formulalar joylashgan kataklarni ruxsatsiz tahrirlashdan parollab qulflash.

```excel
Select Input Cells -> Format Cells -> Protection -> Uncheck Locked -> Protect Sheet
```

---

## Q92. Data Validation Input Rules & Custom Formulas | Data Validation kirish qoidalari va shaxsiy formulalar

**EN:** Restricting user cell entries using custom formula validation logic (e.g. valid emails).

**UZB:** Katakka faqat belgilangan shartga mos ma'lumot kiritilishini cheklash.

```excel
Data -> Data Validation -> Allow: Custom -> Formula: =ISNUMBER(SEARCH("@", A2))
```

---

## Q93. Circular Reference Error Troubleshooting | Circular Reference (Aylana havola) xatolarini hal qilish

**EN:** Locating and resolving formulas that inadvertently depend on their own cell output.

**UZB:** Formula o'z-o'ziga bog'lanib qolgan aylana xatoni topish va tuzatish.

```excel
Formulas -> Error Checking -> Circular References -> Select Problematic Cell
```

---

## Q94. Resolving `#SPILL!` Errors in Dynamic Arrays | `#SPILL!` xatolarini tuzatish

**EN:** Clearing blocking cell content in the spill path to allow dynamic array expansion.

**UZB:** Dinamik formula yoyilish yo me lidagi xalaqit berayotgan kataklarni tozalash.

```excel
Clear all non-empty cells below and to the right of the dynamic formula cell.
```

---

## Q95. Resolving `#VALUE!` & `#N/A` Errors via `IFERROR` / `IFNA` | `#VALUE!` va `#N/A` xatolarini IFERROR / IFNA bilan ushlash

**EN:** Replacing ugly formula error outputs with user-friendly fallback text or zero.

**UZB:** Xatolik yuz berganda xunuk xabar o'rniga nollarni ko'rsatish.

```excel
=IFERROR(VLOOKUP(A2, Data_Range, 2, FALSE), "Topilmadi")
```

---

## Q96. Resolving `#REF!` Missing Reference Errors | `#REF!` (Yo'qolgan havola) xatosini tuzatish

**EN:** Restoring deleted column or sheet references that broke dependent formulas.

**UZB:** O'chirilgan ustun yoki varaq sababli buzilgan formulalarni qayta tiklash.

```excel
Undo deletion or re-point broken range references to existing data sheets.
```

---

## Q97. Optimizing Large Workbook Performance (Manual Recalc) | Katta Excel fayllari tezligini oshirish (Manual Recalc)

**EN:** Disabling automatic calculation mode on 1M+ row workbooks to prevent frozen UI.

**UZB:** Katta jadvallar bilan ishlayotganda Excel qotib qolmasligi uchun avtomatik hisobni o me chirish.

```excel
Formulas -> Calculation Options -> Manual
```

---

## Q98. Exporting Clean PDF Reports from Sheets/Excel | Sheets/Excel dan toza PDF hisobotlar eksport qilish

**EN:** Setting print areas and scaling settings to generate professional one-page executive reports.

**UZB:** Chiroyli 1 sahifali ijrochi hisobotlarini PDF formatida eksport qilish.

```excel
Page Layout -> Print Area -> Fit to 1 Page Wide by 1 Page Tall
```

---

## Q99. CSV Encoding Fixes for Cyrillic / Uzbek Characters | Cyrillic / O'zbekcha harflar uchun CSV UTF-8 kodlanishini tuzatish

**EN:** Fixing garbled text characters when importing CSV files into Excel using UTF-8 encoding.

**UZB:** CSV fayllarni ochganda o'zbekcha/krilcha harflar buuzilishini UTF-8 bilan tuzatish.

```excel
Data -> Get Data -> From Text/CSV -> File Origin: 65001 : Unicode (UTF-8)
```

---

## Q100. Automated Scheduled Email Reports via Google Apps Script | Google Apps Script yordamida avtomatik email hisobotlar yuborish

**EN:** Scheduling daily automated PDF export email deliveries to managers via Apps Script trigger.

**UZB:** Har kuni ertalab menejerga avtomatik ravishda PDF hisobotini emailga yuboradigan JS skripti.

```excel
function sendDailyPDF() { MailApp.sendEmail({ to: "boss@company.com", subject: "Daily KPI", attachments: [pdfBlob] }); }
```