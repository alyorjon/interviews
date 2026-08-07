# 🇺🇿 2026 O'zbekiston Data Analyst Real Intervyu Savollari
### Excel, Google Sheets va Ma'lumotlar Bazasi (DB) asosida — Amaliy va Nazariy Qo'llanma

> **Nega bu fayl boshqalardan farq qiladi:** [data_analyst_2026_interviews.md](data_analyst_2026_interviews.md) va [data_analyst_masterclass.md](data_analyst_masterclass.md) fayllari Snowflake, BigQuery, XGBoost, Kaplan-Meier kabi "Silicon Valley" darajasidagi vositalarni qamrab oladi — bular O'zbekistondagi 95% vakansiyalarda so'ralmaydi. Bu fayl esa **haqiqatda O'zbekiston kompaniyalarida (banklar, telekom, e-commerce, ishlab chiqarish, IT-outsourcing) 2026-yilda so'raladigan savollarni** aks ettiradi: **Excel/Google Sheets kundalik ishda, SQL/DB backend tomonda, va biznes tafakkuri (business sense)** intervyu markazida turadi.
>
> **Darajalar:** 🟢 Junior (1–25) | 🟡 Middle (26–55) | 🔴 Senior/Lead (56–75) | 💼 Case-Study & Biznes savollari (76–90)

---

# 📚 NAZARIY ASOS: O'ZBEKISTON DATA ANALYST BOZORI 2026

---

## 1. 🏢 Real bozor konteksti — kim, qanday vositalar so'raydi

- **Banklar (Ipoteka Bank, Kapitalbank, Xalq Banki, TBC, Apex Bank):** SQL (MS SQL Server / Oracle), Excel Pivot Table, 1C bilan integratsiya, kredit portfeli tahlili, NPL (Non-Performing Loans) hisoboti.
- **Telekom (Beeline, Ucell, Uzmobile):** ARPU, Churn Rate, SQL katta jadvallarda (CDR — Call Detail Records), Excel/Power BI dashboardlar.
- **E-commerce (Uzum Market, Mediapark, Asaxiy, Texnomart):** Google Sheets + Google Apps Script avtomatlashtirish, konversiya voronkasi, SQL (PostgreSQL/MySQL), Google Data Studio / Looker Studio (bepul, shuning uchun Power BI'dan ko'ra ko'proq talab qilinadi).
- **IT-Outsourcing (EPAM, Yandex, Airba, mahalliy startaplar):** Xalqaro standart — SQL, Python/Pandas asoslari, ba'zan Tableau/Power BI, lekin baribir Excel bilan tez ishlash talab qilinadi.
- **Xulosa:** 2026-yilgi O'zbekiston intervyusida eng ko'p so'raladigan uch mavzu — **(1) Excel/Sheets formulalar va Pivot Table, (2) SQL JOIN/GROUP BY/Window functions, (3) Biznes metrikalarni sodda tilda tushuntira olish.**

---

## 2. 📊 Excel va Google Sheets — kundalik ishning yuragi

- **VLOOKUP/XLOOKUP hali ham eng ko'p so'raladigan savol** — chunki eski kompaniyalarda Excel 2016/2019 hamon ishlatiladi (Office 365 barcha joyda emas).
- **PivotTable + Slicer:** Oylik hisobotlarni bir necha soniyada guruhlash — bu deyarli har bir intervyuda amaliy test sifatida beriladi ("mana shu 5000 qatorlik faylni oching va viloyat bo'yicha savdo pivot tuzing").
- **Google Sheets ustunligi:** Ko'p kompaniyalar buxgalteriya va sotuv bo'limlari bilan bo'lishish uchun Google Sheets ishlatadi (litsenziya narxi yo'q). `IMPORTRANGE`, `QUERY`, `ARRAYFORMULA` — bu uchtasi amaliy testda tez-tez chiqadi.
- **Google Apps Script:** Har kuni avtomatik email yuborish, Telegram botga hisobot jo'natish — kichik startaplarda "sen buni avtomatlashtira olasanmi?" degan savol keng tarqalgan.

---

## 3. 🗄️ SQL va Ma'lumotlar Bazasi (DB) — backend bilan til topishish

- **Eng ko'p ishlatiladigan DB:** MS SQL Server (banklar, 1C integratsiyasi), PostgreSQL va MySQL (startaplar, e-commerce).
- **JOIN turlari (INNER, LEFT, RIGHT):** Har bir SQL intervyusida albatta so'raladi — real jadval misolida (mijozlar va buyurtmalar) tushuntirish kutiladi.
- **GROUP BY + HAVING:** Oylik/hududiy jamlash hisobotlari uchun asosiy vosita.
- **Window Functions (ROW_NUMBER, RANK, LAG/LEAD):** 2024-2026 oralig'ida O'zbekistonda ham Middle+ darajadagi intervyularda tobora ko'proq so'ralmoqda — chunki dublikatlarni tozalash va MoM (Month-over-Month) o'sishni hisoblash uchun zarur.
- **NULL bilan ishlash:** `COALESCE`, `IS NULL` — real ma'lumotlar bazalarida (masalan mijoz telefon raqami yo'q) doim uchraydigan muammo.

---

## 4. 💰 Biznes Metrikalar — O'zbekiston kontekstida sodda va tushunarli

- **Konversiya foizi (Conversion Rate):** `= (Xarid qilganlar soni / Sayt tashrifchilari soni) * 100`
- **O'rtacha chek (Average Order Value):** `= Umumiy Tushum / Buyurtmalar soni`
- **Churn (Ketib qolish) foizi:** Telekom va obuna xizmatlarida (masalan onlayn ta'lim platformalari) — `= (Davr boshidagi mijoz - Davr oxiridagi mijoz) / Davr boshidagi mijoz * 100`
- **So'm bilan ishlash muammosi:** Excel/Sheets da valyuta formatlash, minglab so'mni qisqartirish (`#,##0,, "mln so'm"`), narx inflyatsiyasini hisobga olish — bu O'zbekistonga xos amaliy muammo, chet el darsliklarida yo'q.
- **Sana formati muammosi:** O'zbekiston kompaniyalarida Excel fayllar ko'pincha `DD.MM.YYYY` formatida keladi (Rossiya/MDH standarti), lekin SQL/Python `YYYY-MM-DD` kutadi — bu format nomuvofiqligi amaliyotda eng ko'p vaqt yeydigan muammo.

---

# 🟢 JUNIOR SAVOLLAR (Q1–Q25)

---

## Q1. VLOOKUP va XLOOKUP farqi
**Nazariya:** VLOOKUP faqat chapdan o'ngga qidiradi va ustun raqamini (`col_index_num`) qo'lda sanash kerak — ustun qo'shilsa formula buziladi. XLOOKUP ustun oralig'iga to'g'ridan-to'g'ri havola beradi va ikkala tomonga ham qidiradi.

```excel
=VLOOKUP(A2, Malumotlar!A:D, 3, FALSE)
=XLOOKUP(A2, Malumotlar!A:A, Malumotlar!C:C, "Topilmadi")
```

**Amaliy savol:** "Xodimlar ro'yxatida ID bo'yicha ish haqini toping, lekin ID topilmasa xato chiqmasin."

---

## Q2. PivotTable orqali oylik savdo hisobotini tuzish
**Nazariya:** PivotTable qo'l bilan SUMIF yozishdan tezroq — minglab qatorni bir necha marta bosish bilan viloyat/oy/mahsulot kesimida ko'rish mumkin.

**Amaliy test:** "5000 qatorlik faylni oching, har bir viloyat bo'yicha oylik tushumni Pivot Table'da ko'rsating va eng past 3 tasini toping."

---

## Q3. SUMIFS vs SUMIF farqi
**Nazariya:** SUMIF bitta shart, SUMIFS bir nechta shartni birlashtiradi (AND mantiqi bilan).

```excel
=SUMIFS(Sales!C:C, Sales!A:A, "Toshkent", Sales!B:B, ">01.01.2026")
```

---

## Q4. IFERROR bilan xatolarni yashirish
**Nazariya:** VLOOKUP/XLOOKUP topilmasa `#N/A` chiqadi — bu hisobotni "chalkash" ko'rinishga keltiradi, shuning uchun IFERROR bilan o'raladi.

```excel
=IFERROR(VLOOKUP(A2, Baza!A:C, 2, FALSE), "Mavjud emas")
```

---

## Q5. Excel'da sana formatini to'g'rilash (DD.MM.YYYY muammosi)
**Nazariya:** Rossiya/O'zbekiston formatidagi matn-sanani (`15.03.2026`) Excel sana sifatida tanimasligi mumkin — `DATEVALUE` yoki Text-to-Columns orqali tuzatiladi.

```excel
=DATEVALUE(SUBSTITUTE(A2, ".", "/"))
```

---

## Q6. COUNTIFS orqali shartli sanash
**Nazariya:** Bir nechta shart bo'yicha qatorlarni sanash — masalan "Toshkentda martda nechta buyurtma bekor qilingan".

```excel
=COUNTIFS(Region, "Toshkent", Month, "Mart", Status, "Bekor qilingan")
```

---

## Q7. Data Validation bilan kiritish xatolarini oldini olish
**Nazariya:** Xodimlar qo'lda ma'lumot kiritganda xato qilmasligi uchun dropdown ro'yxat yaratiladi (Data → Data Validation → List).

---

## Q8. Conditional Formatting orqali anomaliyalarni ko'rsatish
**Nazariya:** O'rtachadan 2 barobar yuqori/past qiymatlarni rangda ajratib ko'rsatish — buxgalteriyada xato kiritilgan raqamlarni tezda topish uchun ishlatiladi.

---

## Q9. Google Sheets IMPORTRANGE
**Nazariya:** Turli bo'limlar (sotuv, moliya) alohida fayl yuritadi, ammo bosh menejer barchasini bitta faylda ko'rishi kerak — IMPORTRANGE real-vaqtda ulaydi.

```excel
=IMPORTRANGE("https://docs.google.com/spreadsheets/d/XYZ", "Sotuv!A1:D1000")
```

---

## Q10. Google Sheets QUERY() — SQL mantig'ini Sheets'da qo'llash
**Nazariya:** Data Analyst SQL bilmasa ham, QUERY orqali GROUP BY/ORDER BY mantig'ini Sheets ichida bajara oladi.

```excel
=QUERY(A1:D1000, "SELECT B, SUM(D) WHERE C = 'Yetkazildi' GROUP BY B ORDER BY SUM(D) DESC", 1)
```

---

## Q11. SQL — SELECT, WHERE, ORDER BY asoslari
**Nazariya:** Har qanday intervyu bu uchtadan boshlanadi.

```sql
SELECT customer_name, total_amount
FROM orders
WHERE region = 'Toshkent'
ORDER BY total_amount DESC;
```

---

## Q12. SQL INNER JOIN vs LEFT JOIN
**Nazariya:** INNER JOIN faqat ikkala jadvalda ham mos yozuv bo'lsa qaytaradi. LEFT JOIN chap jadvaldagi barcha qatorlarni saqlaydi, mos kelmasa NULL qo'yadi — masalan "Buyurtma qilmagan mijozlarni ham ko'rsating."

```sql
SELECT c.name, o.order_id
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;
```

---

## Q13. SQL GROUP BY va HAVING
**Nazariya:** GROUP BY guruhlaydi, HAVING guruhlangan natijani filtrlaydi (WHERE qatorlarni, HAVING guruhlarni filtrlaydi).

```sql
SELECT region, SUM(amount) AS total
FROM orders
GROUP BY region
HAVING SUM(amount) > 10000000;
```

---

## Q14. NULL qiymatlar bilan ishlash (COALESCE)
**Nazariya:** Real bazada mijoz telefon raqami yoki emaili bo'sh bo'lishi mumkin — hisobotda "Noma'lum" deb ko'rsatish uchun ishlatiladi.

```sql
SELECT customer_name, COALESCE(phone, 'Noma\'lum') AS phone
FROM customers;
```

---

## Q15. SQL DISTINCT va dublikatlarni topish
```sql
SELECT customer_id, COUNT(*) 
FROM orders 
GROUP BY customer_id 
HAVING COUNT(*) > 1;
```

---

## Q16. Excel Text-to-Columns
**Nazariya:** 1C yoki bank ko'chirmasidan tushgan "Ism Familiya" bitta ustunda kelganda, ularni ajratish kerak bo'ladi.

---

## Q17. Excel CONCATENATE / TEXTJOIN
```excel
=TEXTJOIN(" ", TRUE, B2, C2)
```

---

## Q18. Excel TRIM va CLEAN funksiyalari
**Nazariya:** Boshqa tizimdan eksport qilingan ma'lumotlarda ko'rinmas bo'shliqlar/belgilar bo'ladi — VLOOKUP ishlamay qolishining eng ko'p uchraydigan sababi shu.

```excel
=TRIM(CLEAN(A2))
```

---

## Q19. Excel Absolute Reference ($A$1) vs Relative Reference
**Nazariya:** Formula ko'chirilganda o'zgarmasligi kerak bo'lgan katakchalar uchun (masalan valyuta kursi) `$` belgisi ishlatiladi.

---

## Q20. Google Sheets ARRAYFORMULA
**Nazariya:** Formulani har bir qatorga qo'lda tortmasdan, butun ustunga bir marta yozish — 10,000+ qatorli fayllarda vaqtni tejaydi.

```excel
=ARRAYFORMULA(IF(A2:A="", "", B2:B*C2:C))
```

---

## Q21. Excel INDEX/MATCH — VLOOKUP'dan afzalligi
**Nazariya:** INDEX/MATCH chapga ham qidira oladi va ustun qo'shilganda buzilmaydi (VLOOKUP'ning eski, ammo hali ham ko'p so'raladigan muqobili).

```excel
=INDEX(C:C, MATCH(A2, A:A, 0))
```

---

## Q22. Excel Freeze Panes va katta jadvallar bilan ishlash
**Nazariya:** Amaliy ko'nikma sifatida so'raladi — 50,000 qatorli faylda sarlavhani "muzlatib" qo'yish.

---

## Q23. SQL LIKE va matn qidirish
```sql
SELECT * FROM customers WHERE name LIKE '%Anvar%';
```

---

## Q24. Excel Nested IF vs IFS
**Nazariya:** Ko'p shartli IF chalkash bo'lganda IFS o'qilishi oson formula beradi.

```excel
=IFS(A2>=90, "A'lo", A2>=70, "Yaxshi", A2>=50, "Qoniqarli", TRUE, "Qoniqarsiz")
```

---

## Q25. Excel'da valyutani (so'm) formatlash va mln/mlrd ko'rsatish
**Nazariya:** O'zbekiston kompaniyalarida raqamlar juda katta (mlrd so'm) bo'lgani uchun, hisobotni o'qish uchun qisqartirilgan format ishlatiladi.

```excel
=TEXT(A2, "#,##0,, \"mln so'm\"")
```

---

# 🟡 MIDDLE SAVOLLAR (Q26–Q55)

---

## Q26. SQL Window Function — ROW_NUMBER() bilan dublikatlarni tozalash
**Nazariya:** Bir xil mijoz bir necha marta ro'yxatga olingan bo'lsa, faqat oxirgi yozuvni qoldirish.

```sql
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC) AS rn
  FROM customers
)
SELECT * FROM ranked WHERE rn = 1;
```

---

## Q27. SQL LAG() bilan MoM (oylik) o'sishni hisoblash
```sql
SELECT month, revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_month,
  ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 / LAG(revenue) OVER (ORDER BY month), 1) AS growth_pct
FROM monthly_revenue;
```

---

## Q28. Excel PivotTable Calculated Field
**Nazariya:** Pivot ichida yangi metrikani (masalan foyda marjasi) qo'shimcha ustun yozmasdan hisoblash.

---

## Q29. Excel Power Query orqali 12 oylik fayllarni birlashtirish
**Nazariya:** Har oy alohida Excel fayl kelsa (moliya bo'limidan), Power Query "Get Data from Folder" orqali barchasini avtomatik bitta jadvalga yig'adi.

---

## Q30. Power Query Unpivot
**Nazariya:** Ko'p kompaniyalarda hisobot "keng" formatda keladi (har oy alohida ustun) — tahlil uchun uni "tik" (long) formatga o'tkazish kerak.

---

## Q31. SQL Subquery vs JOIN — qachon qaysi birini ishlatish
**Nazariya:** Subquery o'qilishi oson, lekin katta jadvallarda JOIN ko'pincha tezroq ishlaydi (execution plan optimallashuvi tufayli).

---

## Q32. SQL CASE WHEN — Excel'dagi IF ning SQL analogi
```sql
SELECT customer_id,
  CASE 
    WHEN total_spend > 5000000 THEN 'VIP'
    WHEN total_spend > 1000000 THEN 'Faol'
    ELSE 'Oddiy'
  END AS segment
FROM customer_summary;
```

---

## Q33. Excel/Sheets'da Cohort (kogorta) tahlili — abonent saqlanishi
**Nazariya:** Obuna asosidagi xizmatlarda (onlayn kurslar, streaming) mijoz qaysi oyda ro'yxatdan o'tgani bo'yicha guruhlab, keyingi oylarda nechtasi qolganini Pivot Table orqali ko'rsatish.

---

## Q34. SQL Self-Join — ierarxik ma'lumotlar (xodim-rahbar)
```sql
SELECT e.name AS xodim, m.name AS rahbar
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

---

## Q35. Excel Two-way Data Table (Sensitivity Analysis)
**Nazariya:** Narx va chegirma o'zgarganda foyda qanday o'zgarishini bitta jadvalda ko'rsatish — moliyaviy bashorat qilishda ishlatiladi.

---

## Q36. SQL Index nima va nega tezlikni oshiradi
**Nazariya:** Katta jadvalda (millionlab qator) WHERE/JOIN ustunlarida Index bo'lmasa, DB har bir qatorni tekshiradi (Full Table Scan) — Index kitob mundarijasi kabi tezda topishga yordam beradi.

---

## Q37. SQL Transaction (BEGIN, COMMIT, ROLLBACK)
**Nazariya:** Bank tizimida bir hisobdan pul yechib, ikkinchisiga qo'shishda ikkala amal ham muvaffaqiyatli bo'lishi yoki ikkalasi ham bekor bo'lishi shart (atomiklik).

```sql
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 500000 WHERE id = 1;
UPDATE accounts SET balance = balance + 500000 WHERE id = 2;
COMMIT;
```

---

## Q38. Excel Solver / Goal Seek
**Nazariya:** "Qancha mahsulot sotilsa, foyda 100 mln so'mga yetadi?" kabi teskari hisob-kitoblar uchun.

---

## Q39. Google Apps Script — avtomatik Telegram/email hisobot
**Nazariya:** Har kuni ertalab menejerga avtomatik hisobot yuborish — kichik O'zbek startaplarida keng tarqalgan amaliy talab.

```javascript
function sendDailyReport() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getRange("A1:D10").getValues();
  MailApp.sendEmail("boss@company.uz", "Kunlik hisobot", JSON.stringify(data));
}
```

---

## Q40. SQL UNION vs UNION ALL
**Nazariya:** UNION dublikatlarni olib tashlaydi (sekinroq), UNION ALL hammasini qo'shadi (tezroq) — ikkita filialning savdo jadvalini birlashtirishda ishlatiladi.

---

## Q41. Excel Array Formula (Ctrl+Shift+Enter, eski usul)
**Nazariya:** Excel 365'gacha bo'lgan versiyalarda massiv formulalarni qanday yozish kerakligini bilish hali ham so'raladi, chunki ko'p kompaniyada Excel 2016/2019 ishlatiladi.

---

## Q42. SQL EXISTS vs IN
**Nazariya:** EXISTS katta subquery natijasida IN'dan tezroq ishlaydi, chunki birinchi mos yozuvni topgach to'xtaydi.

```sql
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
```

---

## Q43. Excel Dashboard yaratish — Slicer va Chart bog'lash
**Nazariya:** Bir nechta Pivot Chart'ni bitta Slicer bilan boshqarish — rahbariyat uchun interaktiv hisobot.

---

## Q44. SQL Percent Rank / NTILE — mijozlarni kvartilga bo'lish
```sql
SELECT customer_id, total_spend, NTILE(4) OVER (ORDER BY total_spend DESC) AS kvartil
FROM customer_summary;
```

---

## Q45. Excel VBA Macro asoslari (hali ham so'raladi)
**Nazariya:** Ba'zi bank/davlat tashkilotlarida Power Query/365 yo'q, shuning uchun takrorlanuvchi ishlarni avtomatlashtirish uchun oddiy VBA makro yozish talab qilinishi mumkin.

---

## Q46. SQL Views (VIEW) — takroriy so'rovlarni soddalashtirish
```sql
CREATE VIEW monthly_sales_summary AS
SELECT region, DATE_TRUNC('month', order_date) AS oy, SUM(amount) AS jami
FROM orders GROUP BY region, oy;
```

---

## Q47. Excel'da Duplicate'larni topish va o'chirish
**Nazariya:** `Remove Duplicates` vs `COUNTIF` orqali aniqlash — qaysi holatda avtomatik o'chirmay, avval tekshirish kerakligi.

---

## Q48. Statistik asoslar — O'rtacha, Mediana va nega ular farq qiladi
**Nazariya:** Ish haqi tahlili kabi "outlier" (bitta juda katta maosh) bo'lgan holatlarda O'rtacha chalg'itadi, Mediana haqiqiy holatni ko'rsatadi.

```excel
=MEDIAN(B2:B100)
```

---

## Q49. Z-Score orqali anomaliyalarni aniqlash
```excel
=(A2 - AVERAGE($A$2:$A$100)) / STDEV.S($A$2:$A$100)
```

---

## Q50. SQL Data Types — VARCHAR, INT, DECIMAL, DATE farqlari
**Nazariya:** Pul summasini FLOAT emas, DECIMAL(18,2) da saqlash kerakligi — moliyaviy hisoblarda yumaloqlash xatosi (rounding error) oldini olish uchun muhim tushuncha.

---

## Q51. SQL Normalizatsiya (1NF, 2NF, 3NF) asoslari
**Nazariya:** Nega bitta jadvalda hamma narsani saqlash yomon — takrorlanuvchi ma'lumotlar (mijoz manzili har buyurtmada takrorlanishi) xato va joy isrofiga olib keladi.

---

## Q52. Excel Power Query — Merge Queries (SQL JOIN Excel'da)
**Nazariya:** Ikki xil manbadan (masalan CRM va 1C) kelgan jadvallarni umumiy ID bo'yicha birlashtirish.

---

## Q53. Funnel (Voronka) tahlili — E-commerce konversiyasi
**Nazariya:** Sayt tashrifi → Savatga qo'shish → Buyurtma → To'lov bosqichlarida qaysi bosqichda eng ko'p mijoz "yo'qolayotganini" aniqlash.

```sql
SELECT step_name, users_count,
  ROUND(users_count * 100.0 / LAG(users_count) OVER (ORDER BY step_order), 1) AS conversion_pct
FROM funnel_steps;
```

---

## Q54. RFM Segmentatsiyasi — mijozlarni baholash
**Nazariya:** Recency (oxirgi xarid), Frequency (xaridlar soni), Monetary (summasi) bo'yicha mijozlarni "VIP", "Xavf ostida", "Yo'qotilgan" segmentlarga bo'lish.

---

## Q55. A/B Test asoslari — p-value tushunchasi
**Nazariya:** Ikki xil dizayn/narx sinovida farq tasodifiymi yoki haqiqiymi ekanligini aniqlash uchun ishlatiladi (p < 0.05 bo'lsa farq statistik ahamiyatli).

---

# 🔴 SENIOR/LEAD SAVOLLAR (Q56–Q75)

---

## Q56. SQL Query Optimizatsiyasi — EXPLAIN ANALYZE o'qish
**Nazariya:** Sekin ishlayotgan so'rovni EXPLAIN orqali tahlil qilib, Full Table Scan o'rniga Index Scan ishlatilishini ta'minlash.

---

## Q57. ETL Pipeline qurish — 1C/CRM'dan DWH'ga
**Nazariya:** Ko'p O'zbek kompaniyalari 1C (buxgalteriya) va CRM (sotuv) alohida tizimda ishlaydi — ularni bitta ombor (Data Warehouse)ga muntazam ko'chirish (Extract-Transform-Load) jarayonini loyihalash.

---

## Q58. Star Schema — Fact va Dimension jadvallar
**Nazariya:** Savdo faktlari (Fact_Sales) markazda, Mijoz/Mahsulot/Sana kabi tavsif jadvallari (Dimension) atrofida — Power BI/Excel Pivot tezligini oshiradi.

---

## Q59. Data Governance — kim qaysi ma'lumotga kira oladi
**Nazariya:** Bank/moliya sohasida mijoz ma'lumotlariga kirish cheklovlari (Row-Level Security) qonuniy talab — O'zbekiston Shaxsiy ma'lumotlar to'g'risidagi qonuniga muvofiqlik.

---

## Q60. SQL Recursive CTE — ierarxik tuzilma (filial-bo'lim daraxti)
```sql
WITH RECURSIVE org_tree AS (
  SELECT id, name, parent_id, 1 AS depth FROM departments WHERE parent_id IS NULL
  UNION ALL
  SELECT d.id, d.name, d.parent_id, t.depth + 1
  FROM departments d JOIN org_tree t ON d.parent_id = t.id
)
SELECT * FROM org_tree;
```

---

## Q61. Dashboard'ni rahbariyat uchun loyihalash — 5 soniya qoidasi
**Nazariya:** Yuqori rahbariyat dashboard'ga 5 soniya qaraydi — eng muhim 3-4 ta KPI birinchi ekranda, batafsil jadval pastda bo'lishi kerak.

---

## Q62. Katta hajmdagi Excel fayllarni optimallashtirish (100,000+ qator)
**Nazariya:** VLOOKUP o'rniga INDEX/MATCH, volatile funksiyalardan (`NOW()`, `OFFSET`) qochish, Power Query'ga o'tish — fayl "muzlab qolishi"ning oldini olish.

---

## Q63. Data Quality tekshiruvlari — avtomatik qoidalar
**Nazariya:** Har kuni yuklanadigan faylda summasi manfiy, sana kelajakda, ID takrorlangan qatorlarni avtomatik aniqlaydigan tekshiruv qatlamini qurish.

---

## Q64. SQL Slowly Changing Dimension (SCD Type 2)
**Nazariya:** Mijoz manzili o'zgarsa, eski yozuvni o'chirmasdan, tarixni saqlab yangi qator qo'shish — moliyaviy audit uchun zarur.

---

## Q65. Excel/Sheets'dan Power BI yoki Looker Studio'ga o'tish qachon kerak
**Nazariya:** Fayl hajmi ortishi, bir necha kishi bir vaqtda ishlashi, real-vaqt yangilanish kerak bo'lganda Excel'dan BI vositasiga o'tish qarorini asoslash.

---

## Q66. Junior tahlilchilarga SQL/Excel'ni qanday o'rgatasiz
**Nazariya:** Lead lavozimida texnik bilimdan tashqari, jamoa ichida bilim almashish jarayonini qurish qobiliyati baholanadi.

---

## Q67. Statistik xulosa chiqarishda Simpson Paradoksi xatarini tushuntirish
**Nazariya:** Umumiy ko'rsatkichda trend bir xil, lekin har bir kichik guruhda teskari bo'lishi mumkinligini rahbariyatga tushuntira olish.

---

## Q68. Ma'lumotlar bazasi migratsiyasi — Excel'dan to'liq DB'ga o'tish
**Nazariya:** Kompaniya "hammasi Excel'da" holatidan strukturaviy DB (PostgreSQL/MS SQL)ga o'tayotganda, qanday bosqichma-bosqich reja tuzish kerak.

---

## Q69. KPI tizimini noldan loyihalash (yangi bo'lim uchun)
**Nazariya:** Yangi ochilgan bo'lim (masalan yangi mahsulot liniyasi) uchun qaysi metrikalar muhimligini aniqlash va ularni kuzatish tizimini qurish.

---

## Q70. Data Analyst va Data Engineer chegarasi qayerda
**Nazariya:** O'zbekiston kompaniyalarida ko'pincha bitta odam ikkala rolni bajaradi — qaysi vazifalarni o'zi qilish, qaysilarini IT bo'limiga topshirish kerakligini bilish.

---

## Q71. SQL Materialized View — tez-tez so'raladigan og'ir hisobotlar uchun
**Nazariya:** Har safar qayta hisoblash o'rniga, natijani oldindan saqlab, jadval kabi tez o'qish.

---

## Q72. Forecasting (bashorat) — Excel'da oddiy trend chizig'i vs statistik model
**Nazariya:** Kichik kompaniyalarda murakkab ML modeli shart emas — Excel TREND/FORECAST.LINEAR funksiyalari yetarli bo'lgan holatlarni aniqlash.

```excel
=FORECAST.LINEAR(12, B2:B11, A2:A11)
```

---

## Q73. Ma'lumotlar xavfsizligi — mijoz PII (shaxsiy) ma'lumotlarini maskalash
**Nazariya:** Tahlil uchun telefon raqami/PINFL kabi ma'lumotlarni to'liq holda emas, maskalab (masalan `9012*****45`) ishlatish.

---

## Q74. Cross-functional hisobot — moliya, sotuv, marketing ma'lumotlarini birlashtirish
**Nazariya:** Har bir bo'lim o'z terminologiyasida gapiradi (moliya "daromad", sotuv "tushum" deydi) — bitta umumiy metrik lug'at (metric dictionary) yaratish zarurati.

---

## Q75. Texnik bo'lmagan rahbariyatga SQL/statistika natijasini tushuntirish
**Nazariya:** "p-value 0.03" demasdan, "bu farq tasodifiy emas, 97% ishonch bilan aytishimiz mumkin" deb tushuntirish — Senior darajadagi eng muhim soft-skill.

---

# 💼 CASE-STUDY va BIZNES SAVOLLARI (Q76–Q90)

---

## Q76. Case: "Toshkentdagi savdo tushib ketdi, sababini toping"
**Kutilgan yondashuv:** Avval ma'lumot sifatini tekshirish (fayl to'liq yuklanganmi?) → segmentlash (qaysi mahsulot/filial) → tashqi omillar (bayram, ob-havo, raqobatchi aksiyasi) → xulosa va tavsiya.

---

## Q77. Case: "1C va CRM'dagi savdo raqamlari mos kelmayapti"
**Kutilgan yondashuv:** Ikkala tizimning ma'lumot kiritish vaqti farqini (real-time vs kechiktirilgan sync), valyuta kursi farqini, QQS (VAT) hisoblash usulini tekshirish.

---

## Q78. Case: "Yangi mahsulot uchun narx qanday belgilanadi — ma'lumot orqali qo'llab-quvvatlang"
**Kutilgan yondashuv:** Raqobatchilar narxi, xarid qobiliyati (Uzbekiston o'rtacha daromadi), elastiklik testi (A/B narx sinovi) takliflarini asoslash.

---

## Q79. Case: "Rahbariyat kunlik emas, soatlik dashboard so'ramoqda — qanday qaror qabul qilasiz?"
**Kutilgan yondashuv:** Texnik xarajat (real-time infratuzilma) va biznes qiymatini solishtirish, "haqiqatan kerakmi" degan savolni berish.

---

## Q80. Case: "10,000 qatorlik Excel fayl 'muzlab qolyapti' — qanday yechasiz?"
**Kutilgan yondashuv:** Volatile formulalarni almashtirish, Power Query'ga o'tkazish, yoki DB'ga ko'chirib SQL orqali so'rov yuborish.

---

## Q81. Case: "Mijozlar ma'lumot bazasida 20% qatorda telefon raqami yo'q"
**Kutilgan yondashuv:** Ma'lumot yig'ish jarayonini (forma majburiy maydonlarmi?) tekshirish, mavjud ma'lumot bilan qanday ishlashni (COALESCE, 'Noma'lum' segmenti) taklif qilish.

---

## Q82. Case: "Marketing kampaniyasi ROI'sini qanday hisoblaysiz?"
```excel
ROI_% = ((Kampaniyadan_Tushum - Kampaniya_Xarajati) / Kampaniya_Xarajati) * 100
```

---

## Q83. Case: "Ombordagi mahsulot qoldig'ini optimallashtirish"
**Kutilgan yondashuv:** ABC tahlili (eng ko'p aylanadigan mahsulotlarni ustuvor kuzatish), sotuv tezligi asosida qayta buyurtma nuqtasini (reorder point) hisoblash.

---

## Q84. Case: "Yangi xodim SQL bilmaydi, lekin Excel'da zo'r — vazifani qanday bo'lasiz?"
**Kutilgan yondashuv:** Vazifalarni murakkablik darajasiga qarab taqsimlash va parallel ravishda SQL o'rgatish rejasini taklif qilish.

---

## Q85. Case: "Ma'lumot noto'g'ri xulosaga olib kelishi mumkinligini qanday tekshirasiz?"
**Kutilgan yondashuv:** Selection bias (faqat faol mijozlarni ko'rib, tark etganlarni unutish), Simpson Paradoksi, korrelyatsiya/sabab-oqibat farqini tekshirish.

---

## Q86. Case: "Bank kredit portfelida NPL (muddati o'tgan qarzlar) ko'paymoqda"
**Kutilgan yondashuv:** Qaysi mijoz segmentida (yosh, kasb, kredit turi) ko'proq ekanligini SQL orqali segmentlash, oldingi oylar bilan solishtirish (trend).

---

## Q87. Case: "Telekom operatorida Churn (ketib qolish) 15% ga oshdi — nima qilasiz?"
**Kutilgan yondashuv:** Churn qilgan mijozlarning umumiy xususiyatini (tarif, hudud, shikoyat tarixi) SQL orqali topish, RFM/Churn Score bilan xavf ostidagilarni oldindan aniqlash.

---

## Q88. Case: "E-commerce saytida 'savatga qo'shish' ko'p, lekin to'lov kam"
**Kutilgan yondashuv:** Funnel tahlili orqali aniq bosqichni topish — to'lov usuli yetishmasligi (Payme/Click integratsiyasi), yetkazib berish narxi kutilmaganda chiqishi kabi sabablarni tekshirish.

---

## Q89. Case: "Bir xil ma'lumotni Excel'da va SQL'da hisoblasangiz, natija farq qiladi — nima qilasiz?"
**Kutilgan yondashuv:** Filtr shartlari, sana oralig'i, NULL'larni hisoblash usuli, yumaloqlash (rounding) farqlarini qadam-baqadam solishtirib tekshirish.

---

## Q90. Case: "Sizga ishonch yo'q hisobot berilgan, lekin ertaga taqdimot bor — nima qilasiz?"
**Kutilgan yondashuv:** Muddat va sifat orasidagi kelishuv — asosiy raqamlarni tezda tekshirib, ishonchsiz qismlarni "tasdiqlash jarayonida" deb ochiq aytish, yolg'on ishonch bermaslik.

---

# 🎯 Intervyuga tayyorgarlik bo'yicha maslahat

1. **Amaliy test uchun tayyorlaning:** Ko'p O'zbek kompaniyalari nazariy savol o'rniga to'g'ridan-to'g'ri Excel fayl berib, "shu yerda pivot tuzing" deb so'raydi.
2. **SQL'ni qog'ozda yoza olishni mashq qiling:** Ba'zi intervyularda kompyutersiz, doskada SQL yozish so'raladi.
3. **O'zbek tilida biznes metrikalarni tushuntirishni mashq qiling:** Ingliz atamalarni bilish yetarli emas — "churn" so'zini o'zbek tilida rahbariyatga qanday tushuntirishni oldindan tayyorlang.
4. **Portfolio sifatida real loyiha ko'rsating:** Hatto shaxsiy loyiha (masalan Telegram kanal statistikasi tahlili) bo'lsa ham, Excel/SQL/Sheets'da qilingan haqiqiy tahlil ishonch uyg'otadi.
