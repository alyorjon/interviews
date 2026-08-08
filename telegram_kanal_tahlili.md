<!-- title: @sqlspecialist kanali tahlili -->

# @sqlspecialist Telegram kanali — to'liq tahlil

**Manba:** report_20260808_141712_3c17bdd0.pdf (1957 ta xabar, 2026-08-08 holatiga)
**Mavzu:** SQL, Excel, Power BI, Tableau, Python, Data Analyst intervyularga tayyorgarlik

Quyida barcha 1957 xabar 4 ta agent orqali batafsil o'qib chiqilib, takrorlanmagan holda 4 toifaga ajratildi: **Nazariyalar**, **Loyihalar**, **G'oyalar**, **Savollar**.

---

## 1. Nazariyalar (tushuntirilgan kontseptsiyalar)

### SQL
- **JOIN turlari**: INNER, LEFT, RIGHT, FULL OUTER, SELF, CROSS JOIN — ishlash tamoyili va misollar bilan
- **WHERE vs HAVING**: WHERE guruhlashdan oldin qatorlarni, HAVING guruhlashdan keyin natijalarni filtrlaydi
- **Window (oyna) funksiyalari**: ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE(), LAG()/LEAD(), FIRST_VALUE()/LAST_VALUE(), SUM()/AVG() OVER() — PARTITION BY va ORDER BY bilan
- **RANK() vs DENSE_RANK() vs ROW_NUMBER()**: teng qiymatlarda raqamlash farqi (1,2,2,4 / 1,2,2,3 / 1,2,3,4)
- **CTE (Common Table Expression)**: WITH operatori; rekursiv CTE — ierarxik ma'lumotlar (menejer-xodim) uchun
- **Subquery turlari**: scalar, single/multi-row, correlated vs non-correlated; EXISTS vs IN farqi
- **Normalizatsiya**: 1NF–5NF, BCNF; denormalizatsiya — hisobot tezligi uchun
- **INDEX**: clustered vs non-clustered, composite, unique, full-text; yozishni sekinlashtiradi, o'qishni tezlashtiradi
- **ACID xossalari**, tranzaksiyalar (BEGIN/COMMIT/ROLLBACK/SAVEPOINT)
- **VIEW vs Materialized VIEW**, Stored Procedure vs Function, Trigger turlari (AFTER/INSTEAD OF), Cursor
- **DELETE vs TRUNCATE vs DROP**, **UNION vs UNION ALL**, **CHAR vs VARCHAR**
- **PRIMARY/FOREIGN/UNIQUE/CANDIDATE KEY** farqlari, Constraint turlari (NOT NULL, CHECK, DEFAULT)
- **DDL/DML/DCL/TCL** — SQL buyruq toifalari
- **Gaps and Islands pattern** — ketma-ket kunlarni aniqlash (ROW_NUMBER orqali)
- **GROUPING SETS** — ko'p darajali GROUP BY (OLAP)
- **PIVOT/UNPIVOT** (CASE WHEN orqali)
- **OLTP vs OLAP**, Star schema vs Snowflake schema, Fact vs Dimension table
- **Query optimizatsiya**: EXPLAIN/ANALYZE, indekslash, SELECT * dan qochish, JOIN > subquery
- **SQL vs NoSQL**, SQL Injection'dan himoya, COALESCE/NULLIF

### Excel
- **VLOOKUP / HLOOKUP / INDEX-MATCH / XLOOKUP / XMATCH** — qidiruv funksiyalari farqi
- **SUMIFS/COUNTIFS/AVERAGEIFS/MAXIFS/MINIFS** — ko'p shartli funksiyalar
- **LARGE()/SMALL()/RANK()/RANK.EQ()** — reyting funksiyalari
- **Sana funksiyalari**: DATEDIF, TODAY, NOW, EDATE, EOMONTH
- **Mantiqiy funksiyalar**: IF (nested), IFS, AND/OR, IFERROR, SWITCH
- **Dinamik massiv funksiyalari**: UNIQUE, FILTER, SORT, SEQUENCE, TEXTSPLIT
- **Nisbiy/mutlaq/aralash havolalar** ($A$1, A1, A$1), PEMDAS amallar tartibi
- **Pivot Table/Chart**, Conditional Formatting, Data Validation, Flash Fill (Ctrl+E)
- **Goal Seek, Solver, What-If Analysis** (Scenario Manager, Data Tables)
- **Power Query vs Power Pivot**, VBA/Makrolar asoslari
- **Matn funksiyalari**: LEFT/RIGHT/MID/LEN/TRIM/CONCAT/TEXTJOIN/PROPER/UPPER/LOWER

### Power BI
- **DAX**: CALCULATE, FILTER, ALL, ALLSELECTED, RANKX, SUMX, DIVIDE, RELATED, LOOKUPVALUE, TOPN, SAMEPERIODLASTYEAR, TOTALYTD/TOTALMTD
- **Measure vs Calculated Column** farqi (hisoblash vaqti, xotira)
- **Import vs DirectQuery vs Live Connection**, Query Folding
- **Row-Level Security (RLS)**, Incremental Refresh, Gateway
- **Filtr turlari**: visual/page/report-level, drillthrough, Top N
- **Star schema modellashtirish**, Slicer/Bookmark/Hierarchy
- **Power BI Desktop vs Service vs Mobile**, Pro vs Premium

### Tableau
- **LOD Expressions**: FIXED / INCLUDE / EXCLUDE
- **Dimensions vs Measures** (ko'k/yashil pill), Discrete vs Continuous
- **Extract vs Live Connection**, Data Blending vs Joining
- **Sets vs Groups**, Table Calculations, Parameters, Context Filters
- **Dual-Axis Chart**, .twb vs .twbx vs .tds fayllar

### Statistika va Python
- Mean/Median/Mode, Standart og'ish, Dispersiya, Korrelyatsiya vs Kauzallik
- Hypothesis Testing, p-value, t-test/z-test/ANOVA, Confidence Interval, CLT, Bayes teoremasi
- Outlier aniqlash: Z-score va IQR usullari; Skewness/Kurtosis
- One-hot encoding vs Label Encoding
- Pandas: DataFrame/Series, groupby, merge, pivot_table, fillna/dropna, apply/map, loc vs iloc
- NumPy asoslari, Matplotlib/Seaborn/Plotly vizualizatsiya
- EDA bosqichlari, Data Cleaning texnikalari, A/B Testing metodologiyasi
- Time Series: resampling, ARIMA, seasonal decomposition
- NLP asoslari (tokenization, sentiment analysis), Scikit-learn (regressiya, K-Means)
- Python asoslari: List/Tuple/Dict/Set, list comprehension, lambda, decorator, generator, GIL, shallow/deep copy, try/except

### Umumiy tushunchalar
- Data Analyst vs Data Scientist vs Data Engineer vs BI Analyst vs Business Analyst rollari farqi
- Descriptive / Diagnostic / Predictive / Prescriptive analytics turlari
- KPI vs Metric farqi, RFM segmentatsiyasi, Cohort/Funnel/Retention/Churn tahlili
- ETL vs ELT, Data Lake vs Data Warehouse
- Data Storytelling (Situation-Context-Insight-Action), STAR metodi (behavioral javoblar uchun)

---

## 2. Loyihalar (portfolio uchun)

### "Data Analyst Project Series" — kanalda qism-qism (Part) chop etilgan loyihalar

Kanal 1957 xabar davomida bitta katta seriya sifatida 8 ta loyihani alohida qismlarga (Part 1, 2, 4, 6, 7, 9, 10, 11) bo'lib chop etgan. Har birida: loyiha maqsadi → tavsiya etilgan dataset → ustunlarni tushunish → tozalash → KPI'lar → SQL tahlili → Power BI/Tableau dashboard → filtrlar/dizayn → insight'lar → GitHub/LinkedIn'da e'lon qilish bosqichlari bor. **Part 3, 5, 8 kanalda umuman topilmadi** (ehtimol o'sha kunlari boshqa mavzular bo'lgan yoki alohida seriya nomi ostida emas).

**Part 1 — Sales Dashboard Analysis Project**
- Maqsad: qaysi mahsulot ko'p sotiladi, qaysi hudud eng ko'p daromad keltiradi, oylik sotuv trendi, foyda ko'rsatkichi, mijoz xarid xatti-harakatini aniqlash
- Dataset: Superstore Dataset (boshlang'ichlar uchun), Amazon Sales Dataset, yoki Kaggle'dagi "Retail Sales Dataset"
- Asosiy ustunlar: Order ID, Order Date, Customer Name, Region, Category, Product Name, Sales, Profit, Quantity
- KPI'lar: Total Sales `SUM(Sales)`, Total Profit `SUM(Profit)`, Total Orders `COUNT(Order_ID)`, Average Order Value, Profit Margin `(Profit/Sales)*100`
- SQL misollari: hudud bo'yicha umumiy sotuv, eng ko'p sotiladigan 10 mahsulot, oylik sotuv trendi, eng foydali kategoriya
- Dashboard: KPI kartalar (yuqorida) + line chart (oylik trend) + bar chart (top mahsulot) + pie chart (kategoriya) + xarita (hudud) + jadval
- Bonus: forecasting, mijoz segmentatsiyasi, DAX o'lchovlari, drill-through, Python avtomatlashtirish, SQL view, ETL pipeline
- Intervyu savollari: "Nima uchun aynan shu KPI'larni tanladingiz?", "Ma'lumotlarni qanday tozaladingiz?", "Qaysi SQL so'rovlarini ishlatdingiz?", "Qanday biznes insight topdingiz?"

**Part 2 — HR Analytics Dashboard Project**
- Maqsad: xodimlar attritsiyasi (ishdan ketishi), unumdorligi, bo'lim bo'yicha tahlil, maosh tendensiyasi, xodim mamnuniyati, yollash/ushlab qolish
- Dataset: HR Analytics Dataset, Employee Attrition Dataset, IBM HR Analytics Dataset (Kaggle)
- Asosiy ustunlar: Employee ID, Age, Gender, Department, Job Role, Salary, Attrition, Years at Company, Satisfaction Score, Performance Rating
- KPI'lar: Total Employees, Attrition Count `COUNT(CASE WHEN Attrition='Yes' THEN 1 END)`, Attrition Rate `(Left/Total)*100`, Average Salary, Average Satisfaction Score
- SQL misollari: bo'lim bo'yicha attritsiya, lavozim bo'yicha o'rtacha maosh, jins bo'yicha xodimlar soni, eng yuqori mamnuniyatli bo'limlar
- Dashboard: bar chart (bo'lim bo'yicha attritsiya), pie chart (jins taqsimoti), line chart (yollash trendi), heatmap (unumdorlik vs mamnuniyat), tree map (bo'lim bo'yicha xodimlar)
- Filtrlar: Department, Gender, Job Role, Experience Level, Attrition Status

**Part 4 — Financial Analytics Dashboard Project**
- Maqsad: daromad, xarajat, foyda, byudjet bajarilishi, pul oqimi va moliyaviy o'sish tendensiyalarini kuzatish (bank, startap, e-commerce, korporativ moliya uchun keng qo'llaniladi)
- Dataset: Financial Performance Dataset, Company Revenue Dataset, Profit & Loss Dataset (Kaggle)
- Asosiy ustunlar: Transaction ID, Date, Revenue, Expense, Profit, Department, Category, Region, Budget, Actual Spending
- KPI'lar: Total Revenue, Total Expenses, Net Profit `SUM(Revenue-Expense)`, Profit Margin, Budget Variance `SUM(Actual-Budget)`
- SQL misollari: oylik daromad trendi, bo'lim bo'yicha xarajat, hudud bo'yicha foyda, byudjet vs haqiqiy xarajat
- Dashboard: line chart (daromad trendi), bar chart (bo'lim xarajatlari), waterfall chart (foyda taqsimoti), pie chart (xarajat kategoriyalari), gauge chart (byudjet bajarilishi %)
- Dizayn maslahati: zararlarni qizil rangda ko'rsatish

**Part 6 — E-Commerce Sales Analysis Project**
- Maqsad: sotuv samaradorligi, mijoz xatti-harakati, mahsulot samaradorligi, daromad trendi, foydalilik, buyurtma naqshlarini tahlil qilish
- Dataset: E-Commerce Sales Dataset, Online Retail Dataset, Superstore Sales Dataset, Amazon Product Sales Dataset
- Asosiy ustunlar: Order ID, Customer ID, Order Date, Product Name, Category, Quantity, Sales, Profit, Discount, Region, Payment Mode
- KPI'lar: Total Sales, Total Profit, Total Orders, Average Order Value (AOV), Profit Margin
- Tozalash: dublikat buyurtmalar, yo'qolgan mijoz/hudud ma'lumotlari, nomuvofiq kategoriya nomlari

**Part 7 — Healthcare Data Analysis Project**
- Maqsad: bemor trendlari, kasalxona samaradorligi, kasallik tahlili, davolash xarajatlari, bemor mamnuniyati, resurslardan foydalanish
- Dataset: Healthcare Dataset, Hospital Management Dataset, Patient Records Dataset, Medical Cost Dataset (Kaggle)
- Asosiy ustunlar: Patient ID, Age, Gender, Disease, Admission Date, Discharge Date, Doctor, Treatment Cost, Insurance, Hospital Department, Patient Satisfaction
- Tozalash: dublikat bemor yozuvlari, yo'qolgan kasallik/xarajat/mamnuniyat qiymatlari, kasallik nomlarini standartlashtirish (masalan "Diabetes" vs "diabetic")

**Part 9 — Supply Chain Analytics Project**
- Maqsad: inventar boshqaruvi, yuk kuzatuvi, yetkazib beruvchi samaradorligi, yetkazib berish kechikishlari, ombor samaradorligi, talab bashorati
- Dataset: Supply Chain Dataset, Logistics Dataset, Inventory Management Dataset, Shipment Tracking Dataset
- Asosiy ustunlar: Order ID, Product ID, Supplier, Warehouse, Inventory Level, Shipment Date, Delivery Date, Delivery Status, Transportation Cost, Region, Demand Forecast
- Savollar: "Yetkazib berish kechikishlarini qanday kamaytirasiz?", "Qaysi yetkazib beruvchilar eng yaxshi ishlaydi?", "Ombor samaradorligini qanday tahlil qildingiz?"

**Part 10 — Social Media Analytics Project**
- Maqsad: auditoriya bilan o'zaro aloqa, kontent samaradorligi, qamrov va ko'rishlar, follower o'sishi, hashtag samaradorligi, platforma tendensiyalari
- Dataset: Instagram Analytics Dataset, Social Media Engagement Dataset, YouTube Analytics Dataset, Twitter/X Analytics Dataset (yoki shaxsiy Instagram Insights/YouTube Studio eksporti)
- Asosiy ustunlar: Post ID, Platform, Post Date, Likes, Comments, Shares, Reach, Impressions, Followers Gained, Hashtags, Engagement Rate

**Part 11 — IPL Cricket Analytics Project**
- Maqsad: jamoa samaradorligi, o'yinchi statistikasi, o'yin tendensiyalari, g'alaba naqshlari, stadion tahlili, tanga tashlash ta'siri, zarba/to'p tashlash unumdorligi
- Dataset: IPL Dataset, Cricket Match Dataset, Ball-by-Ball IPL Dataset, IPL Player Statistics Dataset
- Asosiy ustunlar: Match ID, Season, Team 1, Team 2, Winner, Venue, Toss Winner, Toss Decision, Player Name, Runs, Wickets, Overs

### Boshqa (alohida, Part-seriyasiga kirmagan) dashboard/tahlil loyihalari
- Banking Analytics — kredit, tranzaksiya, firibgarlikni aniqlash
- Netflix/IMDb dataset tahlili — janr, reyting, chiqarilish yili trendlari
- Ob-havo ma'lumotlari vizualizatsiyasi (OpenWeatherMap API)
- Shaxsiy xarajatlar tracker, ish e'lonlari tahlili (Indeed/LinkedIn), YouTube kanal tahlili

**Machine Learning / ilg'or tahlil loyihalari:**
- Customer Segmentation (RFM + K-Means klasterlash)
- Churn Prediction (logistik regressiya / decision tree / random forest)
- Airbnb narx bashoratchisi, Sales Forecasting, Market Basket Analysis
- Sentiment Analysis (ijtimoiy tarmoq/sharhlar), Fraud Detection
- A/B Testing loyihasi, COVID-19 Trend Tracker

**SQL amaliy loyihalari (daraja bo'yicha):**
- *Boshlang'ich:* xodimlar bazasi, kutubxona tracking, talaba baholash tizimi, retail POS, mehmonxona bron qilish, blogging system
- *O'rta:* e-commerce buyurtma boshqaruvi, savdo unumdorligi, inventar nazorati, ko'chmas mulk ro'yxati, kino reyting tizimi
- *Ilg'or:* ijtimoiy tarmoq analitikasi, sug'urta da'volari (firibgarlik), mijozlar fikr-mulohaza tahlili, frilanser platforma
- *Ekspert:* musiqa striming tahlili, sog'liqni saqlash retseptlari, xodimlar smena jadvali, ombor boshqaruvi, onlayn auksion
- **8 haftalik SQL case-study to'plami** (8weeksqlchallenge.com): Danny's Diner, Pizza Runner, Foodie Fi, Data Bank, Data Mart, Clique Bait, Balanced Tree, Fresh Segments

**Investitsiya banking sohasi uchun:** M&A Deal Analysis, Risk Assessment Model, Portfolio Performance Analysis, Sentiment Analysis for Trading, IPO Analysis

> ⚠️ **Muhim ogohlantirish (kanalda bir necha marta takrorlangan):** "Coffee Sales Analysis" va "Pizza Sales Analysis" kabi millionlab marta ko'chirilgan ommaviy YouTube guided-loyihalarni portfolioga qo'shmaslik kerak — ular ish beruvchilar uchun "qizil bayroq" hisoblanadi. O'ziga xos, noyob loyihalar afzalroq.

---

## 3. G'oyalar (karyera strategiyasi, resurslar, maslahatlar)

**O'rganish yo'l xaritasi:**
- Tavsiya etilgan tartib: **Excel → SQL → Statistika → Python → Power BI/Tableau → loyihalar/portfolio → GitHub/LinkedIn → ish/internshipga ariza**
- 30/50/100 kunlik va 3/6/12 oylik batafsil roadmaplar kanalda muntazam joylashtirilgan
- Vositalarni bir vaqtda emas, bosqichma-bosqich (masalan 25%-25%-25%-25%) o'rganish tavsiyasi
- "Tutorial hell"dan qochish — faqat video ko'rish yetarli emas, loyiha qurish va GitHub'ga joylash shart

**Amaliyot va resurslar:**
- LeetCode, StrataScratch, HackerRank, DataLemur, Mode Analytics, SQLZoo, SQLBolt — SQL/Data mashq platformalari
- Kaggle, UCI ML Repository — dataset manbalari
- FREE sertifikatlar: Google Data Analytics, IBM Data Analyst, Microsoft Learn/Excel Specialist, Cisco, NVIDIA AI, MIT/IIM (SWAYAM), Accenture/Deloitte/TCS/PwC virtual internshiplar

**Portfolio va ish qidirish:**
- GitHub'da loyihalarni pin qilish, README yozish; Tableau Public/Power BI profilida dashboard ko'rsatish
- Rezyume: STAR metodi, miqdoriy natijalar ("hisobot vaqtini 40% qisqartirdim"), ATS uchun kalit so'zlarga moslashtirish
- LinkedIn: sarlavhani aniq qilish ("Aspiring Data Analyst | SQL | Excel | Tableau"), muntazam kontent ulashish
- Tajriba yo'qligida: Upwork/Fiverr frilanserlik, do'stlar/oila uchun bepul tahlil
- Ish qidirish uchun Telegram kanallari (@jobs_SQL, @getjobss va h.k.) va firibgar "pul so'ragan" e'lonlardan ogohlik

**Monetizatsiya g'oyalari:** frilансing, onlayn kurs sotish, texnik blog (Medium), YouTube, affiliate marketing, dashboard/shablon sotish (Gumroad), pullik community

**Karyera yo'nalishlari:** Data Analyst, BI Analyst, Product/Marketing/Financial/Risk & Fraud Analyst, Analytics Engineer, Analytics Consultant — har biriga xos ko'nikma va maosh (LPA) ma'lumotlari bilan; 2025 tendensiyasi — umumiy "Data Analyst" o'rniga soha-spetsifik unvonlarga yo'naltirilish

**Muhim falsafiy fikrlar:**
- "Vositalarni emas, biznes muammosini hal qilishga e'tibor qarating" — dashboard/SQL so'rovning o'zi emas, u orqali qanday qaror qabul qilinishi muhim
- "Data Analytics — bu faqat raqamlar emas, balki hikoya aytish (storytelling)"
- Junior va Senior Data Analyst farqi — muammoni tushunish chuqurligida, so'rov yozish texnikasida emas
- AI vositalarini (ChatGPT, Copilot) SQL/Python yozish va tahlilni tezlashtirish uchun ishlatish tavsiyasi

---

## 4. Savollar (intervyu savollari — misollar bilan)

### SQL amaliy masalalar
- Ikkinchi/N-chi eng yuqori maoshni LIMIT/TOP'siz topish (subquery, DENSE_RANK, yoki `OFFSET`)
- Har bir bo'limdagi eng yuqori (yoki top-3) maoshli xodim(lar)ni topish (`DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC)`)
- Menejeridan ko'proq maosh oluvchi xodimlarni topish (self-join)
- Duplikat qatorlarni topish/o'chirish (`GROUP BY ... HAVING COUNT(*)>1` yoki ROW_NUMBER+CTE)
- Hech qachon buyurtma qilmagan mijoz/mahsulotlarni topish (`LEFT JOIN ... IS NULL` / `NOT EXISTS`)
- Ketma-ket 3+ kun faollik ko'rsatgan mijozlarni topish (Gaps and Islands)
- Running total / kumulativ yig'indi yaratish (`SUM() OVER (ORDER BY date)`)
- Har oyda buyurtma bergan mijozlarni topish (`COUNT(DISTINCT MONTH)=12`)
- O'z bo'limi o'rtachasidan yuqori maosh oluvchilarni topish (correlated subquery)
- Eng ko'p noyob loyihada ishlagan xodimni topish, eng katta maosh oshishiga ega xodimni topish (LAG+DENSE_RANK)
- Bir xil menejerga ega xodimlarni topish (self join + HAVING COUNT>1)

### SQL nazariy savollar (deyarli har bo'limda takrorlangan)
- WHERE vs HAVING, INNER vs LEFT JOIN, RANK vs DENSE_RANK vs ROW_NUMBER
- CTE nima, rekursiv CTE qanday ishlaydi
- DELETE vs TRUNCATE vs DROP, UNION vs UNION ALL
- Primary vs Foreign vs Unique Key, CHAR vs VARCHAR
- Stored Procedure vs Function, View vs Materialized View
- Indekslash turlari va qachon ishlatish/ishlatmaslik kerak
- Normalizatsiya bosqichlari (1NF-3NF)

### Excel
- SUMIFS bilan shartli yig'indi (masalan: IT bo'limida 80,000dan yuqori maosh)
- MAXIFS, LARGE(), RANK(), IFS(), DATEDIF(), XLOOKUP(), COUNTA(UNIQUE()) bilan amaliy masalalar
- VLOOKUP vs INDEX+MATCH qaysi biri yaxshiroq va nima uchun
- Pivot Table, Conditional Formatting, What-If Analysis nima
- Nisbiy/mutlaq havolalar farqi, Freeze Panes, Text to Columns

### Power BI / DAX
- RANKX() bilan mahsulotlarni reytinglash, CALCULATE+ALL+DIVIDE bilan foiz hissasi
- YoY o'sish (SAMEPERIODLASTYEAR), MTD/YTD (TOTALMTD/TOTALYTD)
- Measure vs Calculated Column, RLS qanday amalga oshiriladi
- Sekin hisobotni qanday optimallashtirasiz (Performance Analyzer), Query Folding nima

### Tableau
- Sets vs Groups, LOD ifodalari, Context Filter, Dual-Axis Chart
- Extract vs Live connection, .twb vs .twbx farqi

### Python
- Palindrome tekshirish, rekursiv faktorial, ikkita lug'atni birlashtirish, Counter bilan chastota hisoblash
- List comprehension, lambda, decorator, generator, GIL, shallow vs deep copy
- Pandas bilan yo'qolgan qiymatlarni to'ldirish, Z-score bilan outlier aniqlash

### Real kompaniya intervyu savollari (nomlangan)
- **Uber**: har bir foydalanuvchining 3-chi tranzaksiyasi, shahar bo'yicha o'rtacha haydovchi reytingi, ehtimollik masalasi, Delhi'dagi haydovchilar sonini taxminlash (guesstimate)
- **LinkedIn**: foydalanuvchi bog'lanish naqshlari tahlili (graph DB), passiv ish qidiruvchilarni aniqlash
- **Amazon**: har bir joylashuvda eng yuqori maoshli xodim, joriy yilda qo'shilgan mijozning umumiy buyurtma summasi, liderlik savollari
- **Myntra**: Pandas bilan yo'qolgan qiymatlarni to'ldirish, Z-score bilan outlier aniqlash
- **Spotify uslubidagi**: real-vaqt streaming tahlili (Kafka), vaqt qatorlari bashorati (ARIMA)

### Case-study / Behavioral savollar
- "Sotuv 20%ga tushib ketdi, buni qanday tahlil qilasiz?" (segmentatsiya, trend, funnel, tashqi omillar)
- "Nega mijozlar platformani tark etyapti?", "Xodimlar ketishi ortyapti, qanday tahlil qilasiz?"
- "Ma'lumotlar tahlilingiz muvaffaqiyatsiz bo'lgan holatni tasvirlab bering"
- STAR uslubida: "O'zingiz haqingizda gapiring", "Nima uchun Data Analyst bo'lishni xohlaysiz?", "5 yildan keyin o'zingizni qayerda ko'rasiz?", "Jamoadagi ziddiyatni qanday boshqargansiz?"
- ~200 talik savollar to'plami SQL/Excel/Power BI/Tableau/Python/Statistika/Case Study/Behavioral bo'limlariga bo'lingan holda kanalda muntazam joylashtirilgan
