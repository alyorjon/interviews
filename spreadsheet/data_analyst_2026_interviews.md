# 🔥 2026 Data Analyst Real Interview Questions & Business Case Studies
### Ikki tilli Zamonaviy Data Analitika Qo'llanmasi / 2026 Bilingual Data Analyst Reference (English 🇬🇧 & O'zbek 🇺🇿)

> **Mavzular / Topics:** 2026 Modern Data Stack (Snowflake, BigQuery, DuckDB, Polars), Advanced SQL (QUALIFY, Recursive CTE, JSON UNNEST), Power BI & DAX Calculation Groups, Python Polars vs Pandas 2.0, A/B Testing & Statistics (p-value, Z-test, Sample Size), Business Metrics (NRR, GRR, LTV/CAC, Payback Period), RFM Segmentation, Predictive Churn (XGBoost/Logistic), AI for Analytics (Text-to-SQL).  
> **Darajalar / Levels:** 🟢 Junior/Mid (1–35) | 🟡 Senior Analyst (36–75) | 🔴 Lead / Principal Analyst (76–100)

---

# 📚 CHUQUR NAZARIYA: 2026 ZAMONAVIY DATA ANALITIKA ARXITEKTURASI

---

## 1. 🚀 2026 Modern Data Stack & Analytical Tools
2026-yilda Data Analyst vakansiyalarida quyidagi arxitektura va vositalar talab qilinadi:
- **Fast In-Memory & Cloud Warehouses:**
  - **DuckDB & Polars:** Python'da millionlab qatorlar bilan tezkor ishlash uchun PyArrow asosidagi In-Memory va Vectorized Engine (Pandas'dan 10-50x tezroq).
  - **Snowflake & Google BigQuery:** Bulutli serverlarda terabaytlab ma'lumotlarni hisoblash.
- **SQL Advanced Analytic Capabilities:**
  - **`QUALIFY` bandi:** Window funksiyalari natijasini `HAVING` kabi filtrlash (subquery yozmasdan `QUALIFY ROW_NUMBER() OVER (...) = 1`).
  - **JSON & Semi-Structured Data:** `JSON_EXTRACT`, `FLATTEN`, `UNNEST` yordamida NoSQL va voqealar (events) ma'lumotlarini SQL da tahlil qilish.

---

## 2. 📊 Power BI 2026 & Modern Excel Data Modeling
- **Calculation Groups & Field Parameters:** Bitta DAX formulasi bilan o'nlab KPI ko'rsatkichlarini (YTD, Prior Year, QoQ, MoM, % Growth) dinamik almashtirish.
- **Star Schema vs Snowflake Schema:** Fakt va Dimensiya jadvallari o'rtasida 1:N bog'liqlik va DirectQuery vs Import Mode unumdorligi.

---

## 3. 🧪 A/B Testing, Statistika va Eksperimentatsiya
- **Gipotezalarni Tekshirish:** Null Hypothesis ($H_0$) va Alternative Hypothesis ($H_1$).
- **p-value va Alfa ($lpha = 0.05$):** $p < 0.05$ bo'lsa statistik ahamiyatga ega ($H_0$ rad etiladi).
- **Z-Test va Student T-Test:** Ikki guruh o'rtacha qiymatlarini taqqoslash.
- **Sample Size (Tanlanma Hajmi):** Minimum aniqlash uchun formulalar.

---

## 4. 💰 Business Metrics & SaaS / E-Commerce KPIs
- **NRR (Net Retention Rate):** `= (Starting_ARR + Expansion_ARR - Churn_ARR - Contraction_ARR) / Starting_ARR * 100` (100% dan yuqori bo'lishi kerak).
- **GRR (Gross Retention Rate):** `= (Starting_ARR - Churn_ARR - Contraction_ARR) / Starting_ARR * 100` (Max 100%).
- **LTV / CAC Nisbati:** $= 	ext{LTV} / 	ext{CAC}$ (Maqbul ko'rsatkich $\ge 3.0x$).
- **CAC Payback Period:** `= CAC / (ARPU * Gross_Margin_%)` (Mijoz xarajatini necha oyda qoplashi).

---

# 🟢 QUESTIONS & ANSWERS (Q1 – Q100)

---


## Q1. Advanced SQL `QUALIFY` Clause in Snowflake/BigQuery | SQL QUALIFY bandi va Window funksiyalarini filtrlash

**EN:** QUALIFY filters window function results directly without requiring nested subqueries or CTEs.

**UZB:** QUALIFY bandi Window funksiyalari natijasini (ROW_NUMBER, DENSE_RANK) subquery yozmasdan to'g'ridan-to'g'ri filtrlaydi.

```python
SELECT customer_id, order_date, amount
FROM orders
QUALIFY ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) = 1;
```

---

## Q2. A/B Testing: Sample Size & p-Value Interpretation | A/B Testing: p-Value va Statistik Ahamiyat (Significance)

**EN:** Interpreting p-value < 0.05 as rejecting Null Hypothesis (H0), confirming variant B has statistically significant conversion lift.

**UZB:** p-value < 0.05 bo'lganda Nol gipoteza (H0) rad etiladi va B variantning konversiyasi statistik jihatdan sezilarli darajada yuqori deb topiladi.

```python
import scipy.stats as stats
z_stat, p_val = stats.ttest_ind(control_conversions, variant_conversions)
if p_val < 0.05: print('Statistically Significant Lift!')
```

---

## Q3. Net Retention Rate (NRR) SaaS Calculation | NRR (Net Retention Rate) SaaS va Obuna metrikasi

**EN:** NRR measures recurring revenue retained from existing customers including expansion minus churn and contraction.

**UZB:** NRR mavjud mijozlardan olingan daromadning kengayish va yo'qotishlarni hisobga olgan holda saqlanish foizidir.

```python
NRR_% = ((Starting_ARR + Expansion_ARR - Churn_ARR - Contraction_ARR) / Starting_ARR) * 100
```

---

## Q4. Python Polars vs Pandas 2.0 Benchmark Analysis | Python Polars va Pandas 2.0 unumdorligi

**EN:** Polars uses Rust and PyArrow for multi-threaded lazy execution, processing 50M rows 20x faster than Pandas.

**UZB:** Polars Rust va PyArrow asosida parallel oqimda ishlaydi va 50M qator ma'lumotni Pandas'ga qaraganda 20x tezroq qayta ishlaydi.

```python
import polars as pl
df = pl.scan_csv('huge_sales.csv').filter(pl.col('amount') > 1000).group_by('region').agg(pl.col('amount').sum()).collect()
```

---

## Q5. DAX Calculation Groups for Multi-KPI Switching | DAX Calculation Groups va ko'p metrikali dinamik almashtirish

**EN:** Calculation Groups allow creating reusable dynamic measure transformations (YTD, MoM, YoY) applied across any base measure.

**UZB:** Calculation Groups bitta dinamik formulani barcha bazaviy o'lchovlarga (YTD, YoY, MoM) qo'llash imkonini beradi.

```python
YTD_Item = CALCULATE(SELECTEDMEASURE(), DATESYTD(Calendar[Date]))
```

---

## Q6. Cohort Analysis Heatmap in Python / SQL | Cohort Analysis Heatmap va Foydalanuvchilar ushlanib qolishi

**EN:** Building user retention heatmaps by signup month to analyze customer churn over 12 months.

**UZB:** Foydalanuvchilarni ro'yxatdan o'tgan oyi bo'yicha guruhlab, 12 oylik Retention Heatmap jadvalini tuzish.

```python
cohort_matrix = df.pivot_table(index='CohortMonth', columns='CohortIndex', values='UserId', aggfunc='nunique')
retention = cohort_matrix.divide(cohort_matrix.iloc[:,0], axis=0)
```

---

## Q7. RFM Segmentation (Recency, Frequency, Monetary) | RFM Segmentatsiyasi (Mijozlarni baholash)

**EN:** Segmenting customers into Champions, At Risk, and Lost segments based on Recency, Frequency, and Monetary scores (1-5).

**UZB:** Mijozlarni oxirgi xarid kuni (Recency), xaridlar soni (Frequency) va umumiy summasi (Monetary) bo'yicha guruhlash.

```python
SELECT customer_id,
  NTILE(5) OVER (ORDER BY recency DESC) AS r_score,
  NTILE(5) OVER (ORDER BY frequency ASC) AS f_score,
  NTILE(5) OVER (ORDER BY monetary ASC) AS m_score
FROM rfm_base;
```

---

## Q8. CAC Payback Period Calculation Formula | CAC Payback Period (Mijoz xarajatini qoplash muddati)

**EN:** Calculating exact number of months required for a customer to generate gross profit equal to acquisition cost.

**UZB:** Bitta mijozni jalb qilish xarajatini (CAC) necha oyda qoplashini hisoblash.

```python
CAC_Payback_Months = Customer_Acquisition_Cost / (ARPU * Gross_Margin_Percentage)
```

---

## Q9. SQL JSON Parsing via `UNNEST` / `FLATTEN` | SQL da JSON formatidagi voqealarni (Events) UNNEST qilish

**EN:** Parsing nested JSON arrays of user web events into tabular rows using BigQuery UNNEST or Snowflake FLATTEN.

**UZB:** JSON formatidagi murakkab hodisalarni SQL dagi qatorlarga yoyib tahlil qilish.

```python
SELECT user_id, event.param.key, event.param.value
FROM user_events, UNNEST(event_params) AS event;
```

---

## Q10. Predictive Churn Model via XGBoost / Logistic Regression | XGBoost yordamida Mijoz ketib qolishini (Churn) bashorat qilish

**EN:** Building binary classification model to predict high-risk churn customers using behavioral features.

**UZB:** Mijozlarning ketib qolish xavfini XGBoost modeli yordamida oldindan aniqlash va aniqlikni (ROC-AUC) baholash.

```python
from xgboost import XGBClassifier
model = XGBClassifier().fit(X_train, y_train)
churn_probs = model.predict_proba(X_test)[:, 1]
```

---

## Q11. Recursive CTE for Hierarchical Manager Tree | Recursive CTE yordamida Ierarxik daraxt qurish

**EN:** Traversing parent-child employee organizational hierarchies recursively using SQL CTE.

**UZB:** Xodim va uning rahbarlari ierarxiyasini Rekursiv SQL CTE bilan shakllantirish.

```python
WITH RECURSIVE EmpHierarchy AS (
  SELECT id, name, manager_id, 1 AS depth FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, h.depth + 1 FROM employees e JOIN EmpHierarchy h ON e.manager_id = h.id
)
SELECT * FROM EmpHierarchy;
```

---

## Q12. SQL `DENSE_RANK()` vs `RANK()` vs `ROW_NUMBER()` | DENSE_RANK(), RANK() va ROW_NUMBER() farqlari

**EN:** ROW_NUMBER gives sequential unique numbers. RANK skips numbers on ties. DENSE_RANK does not skip numbers.

**UZB:** ROW_NUMBER ketma-ket unikal raqam beradi. RANK tenglikda o'rinlarni o'tkazib yuboradi. DENSE_RANK esa o'z o'rnida ushlaydi.

```python
SELECT score, ROW_NUMBER() OVER(ORDER BY score DESC), RANK() OVER(ORDER BY score DESC), DENSE_RANK() OVER(ORDER BY score DESC) FROM leads;
```

---

## Q13. SQL Moving Average Calculation via `ROWS BETWEEN` | SQL ROWS BETWEEN yordamida Sirpanuvchi o'rtacha

**EN:** Calculating 7-day rolling average revenue using explicit window frame bounds.

**UZB:** Oxirgi 7 kunlik sirpanuvchi o'rtacha daromadni SQL Window ramkasi bilan hisoblash.

```python
SELECT date, revenue,
  AVG(revenue) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7d_avg
FROM daily_sales;
```

---

## Q14. SQL Gaps and Islands Problem | SQL Gaps and Islands (Ketma-ket faol kunlar) masalasi

**EN:** Finding contiguous date intervals where users logged in continuously without gaps.

**UZB:** Foydalanuvchilarning uzluksiz tizimga kirgan ketma-ket kunlar intervallarini aniqlash.

```python
WITH Grps AS (
  SELECT user_id, login_date,
    DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) DAY) AS grp
  FROM logins
)
SELECT user_id, MIN(login_date) AS streak_start, MAX(login_date) AS streak_end, COUNT(*) AS streak_days
FROM Grps GROUP BY user_id, grp;
```

---

## Q15. Power BI Composite Models (DirectQuery + Import) | Power BI Composite Models va Unumdorlik

**EN:** Combining high-performance Import mode for small dimensions with DirectQuery for massive fact tables.

**UZB:** Kichik jadvallarni Import rejimida, terabaytlik Fakt jadvalni esa DirectQuery orqali bitta modelga birlashtirish.

```python
Power BI Data Model -> Set Storage Mode: Import for DimCalendar, DirectQuery for FactSales
```

---

## Q16. DAX `USERELATIONSHIP` for Multiple Date Fields | DAX USERELATIONSHIP yordamida ikkinchi sanani faollashtirish

**EN:** Activating secondary non-active relationship (e.g. Order Date vs Ship Date) in DAX.

**UZB:** Faol bo'lmagan ikkinchi sana munosabatini DAX formulasida faollashtirish.

```python
Shipped_Sales = CALCULATE(SUM(Sales[Amount]), USERELATIONSHIP(Calendar[Date], Sales[ShipDate]))
```

---

## Q17. DAX `ALLSELECTED` vs `ALL` in Percent of Total | DAX ALLSELECTED va ALL o'rtasidagi farq

**EN:** ALL ignores all filters. ALLSELECTED preserves slicers outside current visual while ignoring internal row context.

**UZB:** ALL barcha filtrlarni olib tashlaydi. ALLSELECTED esa tashqi Slicer filtrlarini saqlab qolgan holda hisoblaydi.

```python
Pct_Selected = DIVIDE([Sales], CALCULATE([Sales], ALLSELECTED(Product[Category])))
```

---

## Q18. DAX `SUMX` vs `SUM` Performance Best Practices | DAX SUMX iterator va SUM unumdorligi

**EN:** SUM evaluates native column aggregates fast. SUMX evaluates expression row-by-row before summing.

**UZB:** SUM oddiy ustun yig'indisini tez hisoblaydi. SUMX esa har bir qatorda ko'paytma bajarib keyin yig'adi.

```python
Margin = SUMX(Sales, (Sales[UnitPrice] - Sales[UnitCost]) * Sales[Quantity])
```

---

## Q19. Python Pandas Memory Optimization (`category` & `int32`) | Python Pandas xotirasini 80% ga kamaytirish

**EN:** Optimizing DataFrame RAM footprint by downcasting integer types and converting high-cardinality strings to categories.

**UZB:** Object ustunlarni `category` turiga o'tkazib RAM bandligini 80% ga qisqartirish.

```python
df['region'] = df['region'].astype('category')
df['quantity'] = pd.to_numeric(df['quantity'], downcast='integer')
```

---

## Q20. Detecting Outliers via Interquartile Range (IQR) in Python | Python da IQR yordamida anomaliyalarni tozalash

**EN:** Filtering values outside Q1 - 1.5*IQR and Q3 + 1.5*IQR boundaries in Python.

**UZB:** Q1 - 1.5*IQR va Q3 + 1.5*IQR chegaralaridan tashqaridagi anomal qiymatlarni olib tashlash.

```python
Q1 = df['amount'].quantile(0.25)
Q3 = df['amount'].quantile(0.75)
IQR = Q3 - Q1
clean_df = df[(df['amount'] >= Q1 - 1.5*IQR) & (df['amount'] <= Q3 + 1.5*IQR)]
```

---

## Q21. Pearson vs Spearman Rank Correlation | Pirson va Spirman korrelyatsiyasi farqi

**EN:** Pearson measures linear relationship. Spearman measures monotonic relationship for ordinal/non-normal data.

**UZB:** Pirson chiziqli bog'liqlikni, Spirman esa darajali (monotonik) no-normal bog'liqlikni o me lchaydi.

```python
import scipy.stats as stats
corr, p_value = stats.spearmanr(df['rank_a'], df['rank_b'])
```

---

## Q22. Chi-Square Test of Independence for Categorical Variables | Kategoriya o'zgaruvchilari uchun Chi-Square testi

**EN:** Evaluating statistical independence between two categorical features (e.g. Device Type vs Conversion Status).

**UZB:** Ikki kategoriya o'zgaruvchisi o me rtasidagi o bag'liqlikni Chi-Square testi bilan tekshirish.

```python
chi2, p_val, dof, ex = stats.chi2_contingency(pd.crosstab(df['device'], df['converted']))
```

---

## Q23. Confidence Interval Calculation for Conversion Rate | Konversiya foizi uchun Ishonch Oralig'i (Confidence Interval)

**EN:** Calculating 95% confidence interval bounds for binomial conversion rates.

**UZB:** 95% ishonch oralig'i (Confidence Interval) chegaralarini hisoblash.

```python
ci_low, ci_high = stats.norm.interval(0.95, loc=p, scale=np.sqrt(p*(1-p)/n))
```

---

## Q24. A/B Test Minimum Detectable Effect (MDE) & Sample Size | A/B Testing MDE va Zaruriy Tanlanma Hajmi

**EN:** Determining minimum sample size per variant based on baseline conversion, MDE, alpha=0.05, and power=0.80.

**UZB:** Boshlang'ich konversiya va kutilayotgan MDE bo me yicha variant uchun zaruriy foydalanuvchilar sonini hisoblash.

```python
from statsmodels.stats.power import NormalIndPower
effect_size = statsmodels.stats.proportion.proportion_effectsize(0.10, 0.11)
sample_n = NormalIndPower().solve_power(effect_size, power=0.8, alpha=0.05)
```

---

## Q25. SaaS Gross Retention Rate (GRR) Formula | GRR (Gross Retention Rate) obuna formulasi

**EN:** GRR tracks revenue retained excluding expansion revenue, capped at 100%.

**UZB:** GRR qo me shimcha daromadlarni qo'shmagan holda faqat mavjud obuna saqlanishini hisoblaydi.

```python
GRR_% = ((Starting_ARR - Churn_ARR - Contraction_ARR) / Starting_ARR) * 100
```

---

## Q26. Customer Lifetime Value (LTV) Cohort Formula | Cohort asosida LTV (Lifetime Value) hisoblash

**EN:** Calculating cumulative LTV per cohort over 6, 12, 24 month horizons.

**UZB:** Koxorta bo me yicha mijozning 6, 12 va 24 oylik jami keltirgan daromadi LTV sini hisoblash.

```python
LTV_12M = ARPU * Gross_Margin_% * (12 / (1 + Discount_Rate))
```

---

## Q27. Funnel Conversion Rate Drop-Off Analysis | Funnel (Voronka) Konversiya va Bosqichma-bosqich Yo'qotishlar

**EN:** Analyzing drop-off percentages across e-commerce funnel steps: Visit -> View -> Add to Cart -> Checkout -> Pay.

**UZB:** E-commerce voronkasining har bir bosqichidagi mijozlar yo'qotish foizini hisoblash.

```python
SELECT step_name,
  users_count,
  LAG(users_count) OVER (ORDER BY step_order) AS prev_step,
  (users_count / LAG(users_count) OVER (ORDER BY step_order)) * 100 AS step_conversion_pct
FROM funnel_steps;
```

---

## Q28. Customer Churn Risk Scoring Rules Engine | Mijoz ketib qolish xavfi (Churn Risk) ballini hisoblash

**EN:** Assigning weighted risk scores based on login inactivity, support tickets, and usage drop.

**UZB:** Tizimga kirmagan kunlar va qo'llab-quvvatlash chiptalari soni bo me yicha Churn Risk ballini berish.

```python
Churn_Score = (Days_Inactive * 0.4) + (Open_Tickets * 0.3) + (Usage_Drop_% * 0.3)
```

---

## Q29. DuckDB In-Memory SQL Execution on Parquet Files | DuckDB yordamida Parquet fayllarida tezkor SQL so'rovlar

**EN:** Querying gigabytes of compressed Parquet files directly in Python without loading into RAM using DuckDB.

**UZB:** Parquet fayllarini RAM ga yuklamasdan DuckDB orqali lahzalarda SQL da tahlil qilish.

```python
import duckdb
res = duckdb.query("SELECT region, SUM(amount) FROM 'sales_*.parquet' GROUP BY region").df()
```

---

## Q30. Automated EDA Profiling via `ydata-profiling` | ydata-profiling yordamida avtomatik EDA hisobot shakllantirish

**EN:** Generating comprehensive HTML data quality, correlation, and distribution profiling reports instantly.

**UZB:** Ma'lumotlar sifatini, korrelyatsiya va taqsimotini bitta buyruq bilan HTML hisobot ko me rinishida olish.

```python
from ydata_profiling import ProfileReport
profile = ProfileReport(df, title='Data Quality Report')
profile.to_file('report.html')
```

---

## Q31. Snowflake Data Sharing & Zero-Copy Cloning | Snowflake Zero-Copy Cloning va ma'lumotlarni saqlash

**EN:** Cloning multi-terabyte production tables instantly for analytics testing without duplicating underlying storage cost.

**UZB:** Ombor xarajatini oshirmasdan terabaytlik ma'lumotlar bazasini lahzalarda Zero-Copy Clone qilish.

```python
CREATE TABLE sales_test CLONE sales_production;
```

---

## Q32. BigQuery Partitioning vs Clustering Best Practices | BigQuery Partitioning va Clustering optimizatsiyasi

**EN:** Partitioning tables by date and clustering by high-frequency query keys to minimize scanned data byte costs.

**UZB:** BigQuery da so me rov xarajatlarini 90% ga kamaytirish uchun jadvallarni sana bo me yicha Partitioning va kalitlar bo'yicha Cluster qilish.

```python
CREATE TABLE analytics.orders
PARTITION BY DATE(order_timestamp)
CLUSTER BY customer_id, status AS SELECT * FROM raw.orders;
```

---

## Q33. Automating Text-to-SQL Pipelines via OpenAI / Anthropic APIs | LLM Prompt yordamida SQL so'rovlarini avtomatik generatsiya qilish

**EN:** Building automated Text-to-SQL generation pipelines using DB schema context prompts.

**UZB:** Baza sxemasini promptga qo me shib natural tildagi savollarni avtomatik SQL so me rovga o me tkazish.

```python
prompt = f"Given schema {schema_text}, write Snowflake SQL to answer: {user_question}"
```

---

## Q34. Detecting Fraudulent Transactions via Isolation Forest | Isolation Forest algoritmi yordamida Shubhali Tranzaksiyalarni aniklash

**EN:** Unsupervised Machine Learning anomaly detection for financial fraud identification.

**UZB:** Moliyaviy firibgarlik (Fraud) va shubhali operatsiyalarni Isolation Forest moduli bilan topish.

```python
from sklearn.ensemble import IsolationForest
clf = IsolationForest(contamination=0.01).fit(X)
df['is_fraud'] = clf.predict(X) == -1
```

---

## Q35. Customer Recency-Frequency-Monetary (RFM) Matrix | RFM Grid Matrix segmentlarini yaratish

**EN:** Categorizing customers into 'Champions', 'Loyal Customers', 'Need Attention', and 'Lost' using RFM logic.

**UZB:** RFM ballari asosida mijozlarni tahliliy segmentlarga bo me lish.

```python
WHEN r_score >= 4 AND f_score >= 4 THEN 'Champions'
WHEN r_score <= 2 AND f_score >= 4 THEN 'At Risk'
WHEN r_score <= 2 AND f_score <= 2 THEN 'Lost Customers'
```

---

## Q36. SQL Time Series Resampling via `DATE_TRUNC` | SQL DATE_TRUNC yordamida dinamik vaqt seriyalarini guruhlash

**EN:** Aggregating transaction logs into daily, weekly, or monthly buckets dynamically.

**UZB:** So'rovlarni oylik, haftalik yoki kunlik vaqt oralig'ida guruhlash.

```python
SELECT DATE_TRUNC('month', order_date) AS sales_month, SUM(amount) AS total_revenue FROM orders GROUP BY 1;
```

---

## Q37. Calculating Moving Standard Deviation for Volatility | Sirpanuvchi Standart chetlanish orqali moliyaviy tebranish (Volatility)

**EN:** Computing 30-day rolling volatility of daily stock returns.

**UZB:** Daromadlikning 30 kunlik sirpanuvchi tebranish darajasini (Volatility) hisoblash.

```python
SELECT date, price,
  STDDEV(daily_return) OVER (ORDER BY date ROWS BETWEEN 29 PRECEDING AND CURRENT ROW) AS volatility_30d
FROM stock_prices;
```

---

## Q38. SQL Pivot via `FILTER (WHERE ...)` Aggregations | SQL FILTER (WHERE ...) yordamida Cross-tab Pivot jadval qurish

**EN:** Pivoting rows to columns using conditional aggregate filters clean standard ANSI SQL.

**UZB:** Qatorlarni ustunlarga o me tkazib Pivot jadvalini tayyorlash.

```python
SELECT region,
  SUM(amount) FILTER (WHERE status = 'Completed') AS completed_sales,
  SUM(amount) FILTER (WHERE status = 'Returned') AS returned_sales
FROM orders GROUP BY region;
```

---

## Q39. Cumulative Sum with Reset Condition in SQL | SQL da shart bajarilganda nollanadigan Kumulyativ Yig me indi

**EN:** Calculating running totals that reset to zero whenever a session gap occurs.

**UZB:** Seanslar uzilganda avtomatik qayta noldan boshlanuvchi kumulyativ yig me indi.

```python
SELECT user_id, log_time, amount,
  SUM(amount) OVER (PARTITION BY user_id, session_id ORDER BY log_time) AS session_running_total
FROM user_logs;
```

---

## Q40. Power BI Row-Level Security (RLS) Dynamic Setup | Power BI Row-Level Security (RLS) foydalanuvchi ruxsatlari

**EN:** Restricting data view visibility based on logged-in user email using `USERPRINCIPALNAME()`.

**UZB:** Tizimga kirgan foydalanuvchi pochtasiga qarab faqat unga tegishli viloyat ma'lumotlarini ko'rsatish.

```python
[Manager_Email] = USERPRINCIPALNAME()
```

---

## Q41. What-If Parameter Analysis in Power BI | Power BI What-If Parametrlari va Ssenariy Tahlili

**EN:** Allowing users to dynamically simulate price increases or discount impact on total profit.

**UZB:** Foydalanuvchilarga narx oshishi yoki chegirma ta'sirini dinamik ssenariyda sinab ko'rish imkonini berish.

```python
Simulated_Profit = [Total_Sales] * (1 + 'Price Discount Parameter'[Parameter Value])
```

---

## Q42. DAX `CROSSFILTER` for Bi-Directional Filtering | DAX CROSSFILTER yordamida ikkala yo'nalishli filtrni boshqarish

**EN:** Enabling bi-directional relationship filter behavior inside specific DAX measures safely.

**UZB:** Faqat bitta DAX formulasi ichida ikkala yo me nalishli filtratsiyani faollashtirish.

```python
Count_Customers = CALCULATE(COUNTROWS(Customer), CROSSFILTER(Sales[CustID], Customer[CustID], Both))
```

---

## Q43. DAX `KEEPFILTERS` vs Filter Context Overrides | DAX KEEPFILTERS va mavjud filtrlar xavfsizligi

**EN:** Intersecting measure filters with existing report filters rather than replacing them.

**UZB:** Mavjud Pivot Table filtrlarini o'chirib tashlamasdan yangi filtr shartini qo'shish.

```python
Red_Sales = CALCULATE([Total Sales], KEEPFILTERS(Product[Color] = "Red"))
```

---

## Q44. DAX Context Transition via `CALCULATE` | DAX Context Transition (Row Context'ni Filter Context'ga o me tkazish)

**EN:** Transforming row context of calculated column or iterator into filter context using CALCULATE.

**UZB:** Qator kontekstini avtomatik filtr kontekstiga o me tkazish.

```python
Customer_Total_Sales = CALCULATE(SUM(Sales[Amount]))
```

---

## Q45. Scikit-Learn Train-Test Split with Stratification | Python da Train-Test Split va Stratifikatsiya

**EN:** Splitting dataset while preserving class proportion ratios for target variable.

**UZB:** Ma me lumotlarni bo me layotganda target klasslar nisbatini stratifikatsiya bilan saqlab qolish.

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
```

---

## Q46. Confusion Matrix: Precision, Recall, F1-Score & ROC-AUC | Confusion Matrix metrikalari (Precision, Recall, F1)

**EN:** Evaluating binary classification model performance under class imbalance.

**UZB:** Klassifikatsiya modelini Precision, Recall, F1-Score va ROC-AUC bilan baholash.

```python
from sklearn.metrics import classification_report, roc_auc_score
print(classification_report(y_true, y_pred))
print('AUC:', roc_auc_score(y_true, y_probs))
```

---

## Q47. Feature Scaling: StandardScaler vs MinMaxScaler | Feature Scaling (StandardScaler va MinMaxScaler)

**EN:** Standardizing features to zero mean and unit variance vs scaling features to [0, 1] range.

**UZB:** Belgilarni standart normal taqsimotga yoki [0, 1] oralig'iga o me tkazish.

```python
from sklearn.preprocessing import StandardScaler
X_scaled = StandardScaler().fit_transform(X)
```

---

## Q48. Handling Imbalanced Datasets via SMOTE | Teng bo me lmagan (Imbalanced) ma me lumotlarni SMOTE bilan muvozanatlash

**EN:** Synthesizing minority class instances to train robust machine learning classifiers.

**UZB:** Kichik klass qiymatlarini SMOTE algoritmi yordamida sun'iy ko me paytirib muvozanatlash.

```python
from imblearn.over_sampling import SMOTE
X_res, y_res = SMOTE(random_state=42).fit_resample(X, y)
```

---

## Q49. Hyperparameter Tuning via GridSearchCV / RandomSearch | Giperparametrlarni GridSearchCV bilan optimallashtirish

**EN:** Systematically searching optimal model hyperparameters using cross-validation.

**UZB:** Kross-validatsiya yordamida eng maqbul model giperparametrlarini topish.

```python
from sklearn.model_selection import GridSearchCV
grid = GridSearchCV(estimator=model, param_grid=params, cv=5)
grid.fit(X, y)
```

---

## Q50. Time Series Forecasting via Prophet | Meta Prophet yordamida Vaqt Seriyalarini Bashorat qilish

**EN:** Forecasting daily e-commerce revenue with yearly, weekly seasonality and holiday effects.

**UZB:** Mavsumiylik va bayram kunlarini hisobga olgan holda kelajakdagi savdoni bashorat qilish.

```python
from prophet import Prophet
m = Prophet().fit(df_prophet)
future = m.make_future_dataframe(periods=90)
forecast = m.predict(future)
```

---

## Q51. Seasonality and Trend Decomposition (STL) | STL yordamida Vaqt seriyalarini Trend va Mavsumiylikka ajratish

**EN:** Decomposing time series into Trend, Seasonal, and Residual error components.

**UZB:** Vaqt seriyalarini Trend, Mavsumiylik va Tasodifiy shovqin komponentlariga ajratish.

```python
from statsmodels.tsa.seasonal import STL
res = STL(df['sales'], period=12).fit()
res.plot()
```

---

## Q52. Exponential Smoothing via Holt-Winters Method | Holt-Winters metodi yordamida tekislangan bashorat

**EN:** Applying triple exponential smoothing for level, trend, and seasonal components.

**UZB:** Trend va mavsumiylikni o me z ichiga olgan uchlama eksponentsial tekislash.

```python
from statsmodels.tsa.holtwinters import ExponentialSmoothing
model = ExponentialSmoothing(df['sales'], trend='add', seasonal='add', seasonal_periods=12).fit()
```

---

## Q53. Market Basket Analysis via Apriori Algorithm | Apriori algoritmi yordamida Market Basket Analysis

**EN:** Discovering association rules (Support, Confidence, Lift) between co-purchased products.

**UZB:** Birgalikda sotib olinadigan mahsulotlar qoidalarini (Lift > 1.0) aniqlash.

```python
from mlxtend.frequent_patterns import apriori, association_rules
frequent_itemsets = apriori(df_basket, min_support=0.01, use_colnames=True)
rules = association_rules(frequent_itemsets, metric='lift', min_threshold=1.2)
```

---

## Q54. K-Means Customer Clustering & Elbow Method | K-Means Klasterlash va Elbow metodi

**EN:** Segmenting customers into K optimal clusters using inertia elbow plot.

**UZB:** Mijozlarni K-Means yordamida eng optimal K ta klasterga guruhlash.

```python
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=4, random_state=42).fit(X)
df['cluster'] = kmeans.labels_
```

---

## Q55. Principal Component Analysis (PCA) Dimension Reduction | PCA yordamida o me lchamlikni qisqartirish (Dimensionality Reduction)

**EN:** Compressing high-dimensional features into orthogonal principal components.

**UZB:** Yuzlab ustunlarni ma me lumot yo me qotishisiz asosiy 2-3 ta PCA komponentiga qisqartirish.

```python
from sklearn.decomposition import PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)
```

---

## Q56. Feature Importance in Random Forest vs XGBoost | Random Forest va XGBoost da Belgilar Muhimligi (Feature Importance)

**EN:** Extracting top predictive drivers influencing customer churn or conversion.

**UZB:** Model qaroriga eng ko me p ta'sir ko me rsatgan yetakchi omillarni darajalamoq.

```python
importances = model.feature_importances_
plt.barh(features, importances)
```

---

## Q57. Detecting Novelty Effect in A/B Testing | A/B Testing da Novelty Effect (Yangi element ta'siri) aniqlash

**EN:** Monitoring day-by-day conversion decay to separate temporary user curiosity from true lift.

**UZB:** Foydalanuvchilarning vaqtinchalik qiziqishi bilan haqiqiy konversiya o'sishini ajratib tahlil qilish.

```python
SELECT date, variant, AVG(converted) AS daily_conv FROM ab_test_events GROUP BY 1, 2 ORDER BY 1;
```

---

## Q58. Multi-Armed Bandit vs Standard A/B Testing | Multi-Armed Bandit (Thompson Sampling) va A/B Test farqi

**EN:** Dynamically routing traffic to winning variant during test runtime to minimize regret.

**UZB:** Eksperiment jarayonida trafikni avtomatik ravishda yutayotgan variantga ko me proq yo me naltirish.

```python
np.random.beta(successes + 1, failures + 1)
```

---

## Q59. CUPED (Controlled-Experiment Using Pre-Experiment Data) | CUPED texnikasi yordamida A/B Test dispersiyasini (Variance) kamaytirish

**EN:** Reducing sample variance using pre-experiment metric baseline to achieve significance 3x faster.

**UZB:** Eksperimentdan oldingi ma'lumotlar bilan dispersiyani kamaytirib 3x tezroq natijaga erishish.

```python
y_cuped = y - theta * (x - x.mean())
```

---

## Q60. Simpson's Paradox in Data Analytics | Simpson Paradoksi (Simpson's Paradox) va noto'g'ri xulosalar

**EN:** Trend appearing in aggregated groups reversing when data is split into subgroups.

**UZB:** Umumiy guruhda ko'ringan trend sub-guruhlarga bo'linganda teskarisiga o'zgarib qolish holati.

```python
Aggregated Lift: -2% | Subgroup A Lift: +5% | Subgroup B Lift: +4% (Confounding Variable!)
```

---

## Q61. Survivorship Bias in Analytics Case Studies | Survivorship Bias (Tirik qolganlar xatosi) va uning oldini olish

**EN:** Ignoring churned/inactive users when evaluating product feature retention benchmarks.

**UZB:** Tahlil qilayotganda tizimni tark etgan foydalanuvchilarni hisobdan chiqarib qo me yish xatosi.

```python
Include both Active AND Churned users in denominator when analyzing historic benchmarks!
```

---

## Q62. Correlation vs Causality & Confounding Variables | Korrelyatsiya va Sabab-Oqibat (Causality) farqlari

**EN:** Distinguishing statistical association from true causal impact using Propensity Score Matching.

**UZB:** Shunchaki parallel o'zgarish bilan haqiqiy sabab-oqibat ta'sirini ajratish.

```python
from causalnlp import CausalInferenceModel # Propensity Score Matching
```

---

## Q63. Customer Churn Survival Analysis (Kaplan-Meier) | Kaplan-Meier Estimator yordamida Survival Analysis

**EN:** Estimating customer survival curves and time-to-churn probabilities over timeline.

**UZB:** Mijozning muayyan vaqtinchalik davrda saqlanib qolish ehtimolligi egri chizig'ini hisoblash.

```python
from lifelines import KaplanMeierFitter
kmf = KaplanMeierFitter().fit(durations, event_observed=churns)
kmf.plot_survival_function()
```

---

## Q64. Predicting Customer CLV via BG/NBD Model | BG/NBD va Gamma-Gamma modeli bilan CLV bashorati

**EN:** Predicting future transaction counts and monetary lifetime value for non-contractual business.

**UZB:** Shartnomasiz biznesda mijozning kelajakdagi xaridlar soni va daromadini bashorat qilish.

```python
from lifetimes import BetaGeoFitter
bgf = BetaGeoFitter().fit(df['frequency'], df['recency'], df['T'])
```

---

## Q65. Basket Penetration Rate % Formula | Basket Penetration Rate % (Savatga kirish darajasi)

**EN:** Percentage of total orders containing a specific target category product.

**UZB:** Muayyan mahsulot kategoriyasining jami barcha sotib olingan savatlardagi ulush foizi.

```python
Penetration_% = (Orders_Containing_Product / Total_Orders) * 100
```

---

## Q66. Cart Abandonment Rate % Calculation | Cart Abandonment Rate % (Tashlab ketilgan savatlar foizi)

**EN:** Measuring percentage of shopping carts created that were not successfully checked out.

**UZB:** Savatga tovar qo'shib, lekin xaridni yakunlamagan mijozlar foizi.

```python
Abandonment_% = ((Carts_Created - Completed_Orders) / Carts_Created) * 100
```

---

## Q67. Cost Per Acquisition (CPA) vs CAC | CPA (Cost Per Acquisition) va CAC farqlari

**EN:** CPA measures cost per specific conversion action (lead, sign-up). CAC measures cost per paying customer.

**UZB:** CPA muayyan harakat xarajatini, CAC esa haqiqiy to'lovchi mijoz qazib olish xarajatini hisoblaydi.

```python
CPA = Marketing_Spend / Total_Leads_Acquired
```

---

## Q68. ROAS (Return on Ad Spend) vs ROI | ROAS (Reklama daromadliligi) va ROI farqi

**EN:** ROAS measures gross revenue per ad dollar spent. ROI considers total business net operating margin.

**UZB:** ROAS faqat reklamadan kelgan yalpi daromadni, ROI esa net operatsion foydani o'lchaydi.

```python
ROAS = Revenue_from_Ads / Ad_Spend
```

---

## Q69. Share of Wallet (SOW) Metric Calculation | Share of Wallet (SOW) mijoz sarflaridagi ulush

**EN:** Estimating percentage of customer total category spend captured by our enterprise.

**UZB:** Mijozning muayyan kategoriya bo'yicha jami sarflaridan bizning kompaniyaga tegishli ulushi.

```python
SOW_% = (Customer_Spend_with_Us / Customer_Total_Category_Spend) * 100
```

---

## Q70. Net Promoter Score Detractor Weighting | NPS Detractor tortish formulasi

**EN:** Calculating exact Detractor impact score reduction on overall brand perception.

**UZB:** Salbiy baho bergan mijozlarning (0-6) brend reytingiga ta'sirini aniklash.

```python
NPS_Score = ((Promoters_Count - Detractors_Count) / Total_Responses) * 100
```

---

## Q71. SQL `LAG()` and `LEAD()` for MoM Growth Rate | SQL LAG() va LEAD() yordamida Oylik o me sish (MoM) Hisoblash

**EN:** Accessing previous month revenue value to compute percentage growth in single pass query.

**UZB:** O'tgan oy daromadini SQL da avvalgi qatordan olib MoM o'sish foizini hisoblash.

```python
SELECT month, revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_month_rev,
  ((revenue - LAG(revenue) OVER (ORDER BY month)) / LAG(revenue) OVER (ORDER BY month)) * 100 AS mom_growth_pct
FROM monthly_revenue;
```

---

## Q72. SQL `FIRST_VALUE()` & `LAST_VALUE()` Window Functions | SQL FIRST_VALUE() va LAST_VALUE() Window funksiyalari

**EN:** Retrieving customer first order value and latest touchpoint inside analytical partitioning.

**UZB:** Mijozning eng birinchi xaridi va eng oxirgi xaridi qiymatini ajratish.

```python
SELECT customer_id,
  FIRST_VALUE(amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS first_order_amount
FROM orders;
```

---

## Q73. SQL `NTILE(4)` Quartile Customer Segmentation | SQL NTILE(4) yordamida Kvartil segmentatsiyasi

**EN:** Dividing customers into 4 equal percentage volume quartiles based on spend.

**UZB:** Mijozlarni sarflari bo me yicha 4 ta teng hajmli kvartil guruhlariga bo'lish.

```python
SELECT customer_id, total_spend,
  NTILE(4) OVER (ORDER BY total_spend DESC) AS spend_quartile
FROM customer_summary;
```

---

## Q74. SQL Self-Join for Duplicate Transaction Detection | SQL Self-Join yordamida takroriy tranzaksiyalarni aniqlash

**EN:** Joining table to itself within short time window to catch duplicate charge errors.

**UZB:** Qisqa vaqt oralig me ida sodir bo'lgan takroriy xato to'lovlarni topish.

```python
SELECT t1.id, t2.id, t1.customer_id, t1.amount
FROM transactions t1 JOIN transactions t2 ON t1.customer_id = t2.customer_id
  AND t1.id <> t2.id AND t1.amount = t2.amount AND t2.trans_time BETWEEN t1.trans_time AND t1.trans_time + INTERVAL '5 minutes';
```

---

## Q75. SQL Anti-Join using `NOT EXISTS` vs `LEFT JOIN` | SQL Anti-Join (`NOT EXISTS` va `LEFT JOIN WHERE NULL`)

**EN:** Filtering records present in Table A but missing in Table B efficiently.

**UZB:** A jadvalda bor lekin B jadvalda mavjud bo'lmagan yozuvlarni samarali filtrlash.

```python
SELECT c.id FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
```

---

## Q76. SQL Dynamic Pivot via `CASE WHEN` Aggregations | SQL CASE WHEN yordamida dinamik Pivot tayyorlash

**EN:** Pivoting status totals across columns in classic ANSI SQL standard.

**UZB:** Statuslar bo me yicha daromadlarni ustunlarga o'tkazib Pivot jadval yig me ish.

```python
SELECT year,
  SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE 0 END) AS Q1_Rev,
  SUM(CASE WHEN quarter = 'Q2' THEN revenue ELSE 0 END) AS Q2_Rev
FROM sales GROUP BY year;
```

---

## Q77. SQL Unpivot via `CROSS JOIN LATERAL` / `VALUES` | SQL Unpivot (Ustunlarni qatorga aylantirish)

**EN:** Converting horizontal columns back to vertical rows in SQL queries.

**UZB:** Gorizontal ustunlarni vertikal qatorlarga SQL da qaytarish.

```python
SELECT id, metric_name, metric_val
FROM metrics_table, LATERAL (VALUES ('Q1', q1_val), ('Q2', q2_val)) AS t(metric_name, metric_val);
```

---

## Q78. SQL Text Matching via Regex `SIMILAR TO` / `REGEXP_LIKE` | SQL da Regex yordamida matnlarni moslashtirish

**EN:** Filtering records matching complex regular expression character patterns in SQL.

**UZB:** Matnli ustunda Murakkab Regex shabloniga mos keluvchi qatorlarni topish.

```python
SELECT * FROM logs WHERE REGEXP_LIKE(log_message, 'ERROR_[0-9]{3}');
```

---

## Q79. SQL Median Calculation via `PERCENTILE_CONT(0.5)` | SQL PERCENTILE_CONT(0.5) yordamida Mediana hisoblash

**EN:** Computing exact continuous median value for skewed distribution data in SQL.

**UZB:** No-normal taqsimlangan daromadlar uchun aniq Medianani hisoblash.

```python
SELECT region,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY amount) AS median_amount
FROM orders GROUP BY region;
```

---

## Q80. SQL Transactional Atomicity (BEGIN, COMMIT, ROLLBACK) | SQL Tranzaksiyalar xavfsizligi (BEGIN, COMMIT, ROLLBACK)

**EN:** Ensuring all database multi-table updates succeed or roll back atomically.

**UZB:** Bir nechta jadvallarga yozish amallarini to'liq bajarilishini yoki qaytarilishini xavfsiz ta me minlash.

```python
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

---

## Q81. Power Query M Language Text Cleanup Functions | Power Query M tilida matnlarni tozalash (Text.Clean)

**EN:** Removing non-printable characters and extra whitespace in Power Query.

**UZB:** Power Query da ko me rinmaydigan belgilar va bo'shliqlarni M tilida tozalash.

```python
= Table.TransformColumns(Source, {{"RawText", each Text.Clean(Text.Trim(_)), type text}})
```

---

## Q82. Power Query Merging Tables with Fuzzy Threshold 0.8 | Power Query Fuzzy Merge va o'xshashlik bo me sag'asi (0.8)

**EN:** Joining tables with minor string differences using similarity threshold 0.8.

**UZB:** 80% o'xshash bo'lgan matnli kalitlarni bir-biriga ulash.

```python
= Table.NestedJoin(Table1, {"Name"}, Table2, {"Name"}, "JoinRes", JoinKind.LeftOuter, [IgnoreCase=true, IgnoreSpace=true, SimilarityThreshold=0.8])
```

---

## Q83. Power Query Appending 12 Monthly Files Automations | Power Query da 12 oylik fayllarni avtomatik jamlash

**EN:** Folder data import connector to combine all CSV files inside directory dynamically.

**UZB:** Papka ichidagi barcha CSV fayllarni avtomatik yangilanuvchi bitta master jadvalga ulash.

```python
= Folder.Files("C:\Data\MonthlyReports")
```

---

## Q84. Power Query Custom Function via M Language | Power Query M tilida shaxsiy funksiya yozish

**EN:** Creating reusable data cleaning function transformation in M code.

**UZB:** Qayta ishlatiladigan M funksiyasini yozib ustunga qo'llash.

```python
(inputText as text) as text => let cleaned = Text.Upper(Text.Trim(inputText)) in cleaned
```

---

## Q85. Power Query Removing Duplicate Records by Business Key | Power Query de Biznes Kalit bo'yicha takroriylarni olib tashlash

**EN:** Deduplicating rows based on compound unique keys inside ETL pipeline.

**UZB:** Bir nechta ustunlar birikmasi bo me yicha takroriy qatorlarni olib tashlash.

```python
= Table.Distinct(Source, {"CustomerID", "OrderDate"})
```

---

## Q86. Excel 365 `XLOOKUP` Two-Way Intersection | Excel 365 XLOOKUP bilan Ikki tomonlama kesishuv

**EN:** Retrieving cell value located at matrix intersection of dynamic row and column.

**UZB:** Qator va ustun sarlavhasi kesishgan nuqtadagi katak qiymatini olish.

```python
=XLOOKUP(Target_Row, Row_Headers, XLOOKUP(Target_Col, Col_Headers, Matrix_Data))
```

---

## Q87. Excel 365 `FILTER` Multi-Condition Array Engine | Excel 365 FILTER ko'p shartli dinamik massiv

**EN:** Filtering data based on AND (*) and OR (+) boolean criteria logic.

**UZB:** Bir vaqtning o'zida ham VAP (*), ham YOKI (+) shartlari bo'yicha filtrlash.

```python
=FILTER(A2:D100, (B2:B100="Asia") * ((C2:C100="Active") + (D2:D100>5000)))
```

---

## Q88. Excel 365 `LAMBDA` Custom Tax Calculator | Excel 365 LAMBDA shaxsiy soliq kalkulyatori

**EN:** Creating custom reusable Tax calculator formula stored inside Name Manager.

**UZB:** Name Manager da saqlanadigan va qayta ishlatiladigan Soliq formulasi.

```python
=LAMBDA(income, IF(income>10000, income*0.12, income*0.08))
```

---

## Q89. Excel 365 `BYROW` Row Sum Aggregation | Excel 365 BYROW yordamida qatorlar yig me indisini hisoblash

**EN:** Calculating sum across matrix rows dynamically without formula dragging.

**UZB:** Formulani pastga tortmasdan butun matritsa qatorlari yig me indisini hisoblash.

```python
=BYROW(A2:D100, LAMBDA(row_range, SUM(row_range)))
```

---

## Q90. Excel 365 `SCAN` Dynamic Running Balance | Excel 365 SCAN yordamida o'sib boruvchi balans

**EN:** Generating running total sum stream dynamically down array column.

**UZB:** Pastga qarab o'sib boruvchi kumulyativ balansni dinamik hisoblash.

```python
=SCAN(0, B2:B100, LAMBDA(prev_sum, current_val, prev_sum + current_val))
```

---

## Q91. Excel 365 `VSTACK` Table Combination Engine | Excel 365 VSTACK yordamida jadvallarni ulaymiz

**EN:** Combining 3 separate regional tables vertically into one master array.

**UZB:** 3 ta viloyat jadvallarini bitta vertikal jadvalga dinamik ulash.

```python
=VSTACK(North_Sales, South_Sales, West_Sales)
```

---

## Q92. Excel 365 `CHOOSEROWS` Top N Data Extraction | Excel 365 CHOOSEROWS yordamida aniq qatorlarni ajratish

**EN:** Extracting specific row numbers from dynamic array output.

**UZB:** Dinamik jadvaldan tanlangan qator nomerlarini ajratib olish.

```python
=CHOOSEROWS(SORT(A2:D100, 4, -1), 1, 2, 3)
```

---

## Q93. Excel 365 `WRAPROWS` 1D to 2D Reshaping | Excel 365 WRAPROWS yordamida 1D ro'yxatni 2D matritsaga o'rash

**EN:** Reshaping a continuous 1D array into a structured grid with N columns.

**UZB:** Bitta uzun ro'yxatni N ustunli 2D jadvalga o me rash.

```python
=WRAPROWS(A1:Z1, 4)
```

---

## Q94. Excel 365 `LET` Variable Optimization | Excel 365 LET yordamida formula o me zgaruvchilarini optimallashtirish

**EN:** Storing intermediate formula calculation results in named variables to boost speed.

**UZB:** Formuladagi oraliq hisoblarni o me zgaruvchida saqlab tezlikni 5x ga oshirish.

```python
=LET(subtotal, SUM(A2:A100), tax, subtotal * 0.12, subtotal + tax)
```

---

## Q95. Excel 365 `TEXTBEFORE` Name Extraction | Excel 365 TEXTBEFORE yordamida matn ajratish

**EN:** Extracting first name from email address dynamically.

**UZB:** Email manzildan foydalanuvchi nomini ajratib olish.

```python
=TEXTBEFORE(A2, "@")
```

---

## Q96. Google Sheets `QUERY` SQL Syntax Group By | Google Sheets QUERY SQL guruhlash sintaksisi

**EN:** Grouping transaction logs by product category and summing revenue in Sheets.

**UZB:** Google Sheets ichida Kategoriya bo me yicha jamlab SQL so'rovida hisoblash.

```python
=QUERY(A1:Z1000, "SELECT B, SUM(C), AVG(D) GROUP BY B ORDER BY SUM(C) DESC", 1)
```

---

## Q97. Google Sheets `IMPORTRANGE` Cross Sync | Google Sheets IMPORTRANGE bilan varaqlararo avtomatik sinxronizatsiya

**EN:** Fetching data live from external Google Sheets document by URL.

**UZB:** Tashqi Google Sheets faylidan real-vaqt rejimida avtomatik ma me lumot olish.

```python
=IMPORTRANGE("https://docs.google.com/spreadsheets/d/1XYZ...", "Data!A1:Z1000")
```

---

## Q98. Google Sheets `REGEXEXTRACT` Email Parsing | Google Sheets REGEXEXTRACT bilan email parsing

**EN:** Extracting pattern matched emails from messy text columns.

**UZB:** Aralash matnlar ichidan email manzilini Regex bilan ajratish.

```python
=REGEXEXTRACT(A2, "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
```

---

## Q99. Google Sheets `GOOGLEFINANCE` Stock Ticker | Google Sheets GOOGLEFINANCE valyuta va aksiya ko'rsatkichlari

**EN:** Fetching real-time financial market metrics and exchange rates.

**UZB:** Real-vaqt rejimida valyuta kurslari va aksiya baholarini tortib olish.

```python
=GOOGLEFINANCE("CURRENCY:USDUZS")
```

---

## Q100. Google Apps Script Automated Daily Email PDF | Google Apps Script yordamida avtomatik daily email PDF hisobot

**EN:** Automating daily PDF dashboard generation and email delivery via Apps Script triggers.

**UZB:** Har kuni ertalab menejerga avtomatik PDF hisobotini yuboruvchi JavaScript skripti.

```python
function sendDailyReport() { var pdf = SpreadsheetApp.getActiveSpreadsheet().getAs('application/pdf'); MailApp.sendEmail('boss@company.com', 'Daily KPI', 'Report Attached', {attachments: [pdf]}); }
```