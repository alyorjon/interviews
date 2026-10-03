# 🧩 SQL Amaliy Masalalar — Interview Practice Problems
### Ikki tilli qo'llanma / Bilingual Reference

> **Daraja / Level:** 🟢 Basic → 🟡 Intermediate → 🔴 Advanced → ⚫ Expert
> **Tillar / Languages:** O'zbek 🇺🇿 | English 🇬🇧
> **Maqsad / Goal:** Klassik SQL intervyu masalalarini (LeetCode-uslubida) yechish orqali amaliyot qilish

Har bir masalada: sxema (schema) → savol → yechim (PostgreSQL sintaksisi). Avval o'zingiz yechishga urinib ko'ring, keyin yechimga qarang.

---

## 🟢 1. Ikkinchi eng yuqori maosh / Second Highest Salary

**Oddiy qilib aytganda:** Eng katta maoshdan kichik bo'lgan maoshlar ichidan eng kattasini topamiz — ya'ni ikkinchi o'rindagisi. Bir xil maoshlar ko'p bo'lishi mumkin, shuning uchun takrorlarni hisobga olmaslik kerak; ikkinchi maosh umuman bo'lmasa — `NULL` qaytishi kerak.

**Sxema:**
```sql
CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
```

**Savol:** Ikkinchi eng yuqori maoshni toping. Agar mavjud bo'lmasa, `NULL` qaytaring. / Find the second highest salary. Return `NULL` if it doesn't exist.

**Yechim / Solution:**
```sql
SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Muqobil (OFFSET bilan) / Alternative (with OFFSET)
SELECT DISTINCT salary AS second_highest
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```
> ⚠️ `LIMIT 1 OFFSET 1` distinct qilmasa, bir xil maoshdagi ikkita xodim bo'lganda noto'g'ri natija berishi mumkin — shuning uchun `DISTINCT` shart. / Without `DISTINCT`, duplicate salaries would break the OFFSET approach.

**Intervyuda shunday ayting:** "Asosiy tuzoqlar — dublikatlar va bo'sh natija. `MAX()` bo'sh to'plamda `NULL` qaytaradi, shuning uchun birinchi variant ikkinchi maosh yo'q bo'lsa ham `NULL` beradi. `OFFSET` varianti esa umuman qator qaytarmaydi — talab bajarilishi uchun uni `SELECT (...) AS second_highest` ichiga o'rayman."

---

## 🟢 2. N-chi eng yuqori maosh / Nth Highest Salary

**Oddiy qilib aytganda:** Ikkinchi o'rin masalasining umumiy ko'rinishi: istalgan N-o'rin. Maoshlarni kamayish tartibida 'o'rin' raqami bilan belgilaymiz (bir xil maoshlar bir xil o'rin oladi) va N-o'rindagisini olamiz.

**Savol:** Ixtiyoriy N uchun N-chi eng yuqori maoshni qaytaruvchi funksiya yozing. / Write a query/function returning the Nth highest salary for any N.

**Yechim / Solution:**
```sql
-- DENSE_RANK bilan (teng maoshlarni bitta rank sifatida hisoblaydi)
-- Using DENSE_RANK (ties share the same rank)
WITH ranked AS (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
)
SELECT DISTINCT salary FROM ranked WHERE rnk = 3;  -- N = 3

-- Funksiya sifatida / As a function
CREATE OR REPLACE FUNCTION nth_highest_salary(n INT)
RETURNS NUMERIC AS $$
    SELECT salary FROM (
        SELECT DISTINCT salary FROM employees ORDER BY salary DESC
    ) s OFFSET n - 1 LIMIT 1;
$$ LANGUAGE sql;
```

**Intervyuda shunday ayting:** "`DENSE_RANK()` bir xil qiymatlarga bir xil o'rin beradi va raqamlarni sakratmaydi — N-chi alohida qiymat uchun aynan shu kerak. `OFFSET N-1` varianti ham bor, lekin u dublikatlarni `DISTINCT` siz noto'g'ri hisoblaydi."

---

## 🟢 3. Takrorlanuvchi elektron pochtalar / Duplicate Emails

**Oddiy qilib aytganda:** Emaillarni guruhlaymiz va har guruhda nechta qator borligini sanaymiz. Soni 1 dan ko'p bo'lgan guruhlar — takrorlanuvchi emaillar.

**Sxema:** `CREATE TABLE users (id SERIAL, email TEXT);`

**Savol:** Bir nechta marta uchraydigan barcha emaillarni toping. / Find all emails that appear more than once.

**Yechim / Solution:**
```sql
SELECT email, COUNT(*) AS cnt
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

**Intervyuda shunday ayting:** "`GROUP BY` + `HAVING count(*) > 1` — dublikatlarni topishning standart usuli. Katta-kichik harf farqi bo'lsa, `lower(email)` bo'yicha guruhlayman. Takrorni oldini olish uchun keyin unique indeks qo'yaman."

---

## 🟡 4. Dublikat qatorlarni o'chirish (bittasini qoldirib) / Delete Duplicate Rows (Keep One)

**Oddiy qilib aytganda:** Har email guruhidan faqat eng kichik `id` li qatorni qoldirib, qolganlarini o'chiramiz. Buning uchun har qatorni 'shu email ichida nechanchi' deb raqamlaymiz va 1-raqamdan boshqalarini o'chiramiz.

**Savol:** `email` bo'yicha dublikat qatorlarni o'chiring, faqat eng kichik `id` li qatorni qoldiring. / Delete duplicate rows by `email`, keeping only the row with the smallest `id`.

**Yechim / Solution:**
```sql
DELETE FROM users a
USING users b
WHERE a.email = b.email
  AND a.id > b.id;

-- Muqobil (window function bilan) / Alternative (with window function)
DELETE FROM users
WHERE id IN (
    SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) AS rn
        FROM users
    ) t WHERE rn > 1
);
```

**Intervyuda shunday ayting:** "Avval o'chiriladiganlarni `SELECT` bilan ko'rib chiqaman, keyin xuddi shu shart bilan `DELETE`. `row_number()` yoki self-join varianti ishlaydi. Tugagach unique constraint qo'shaman — aks holda dublikatlar yana paydo bo'ladi. Katta jadvalda bo'laklab o'chiraman."

---

## 🟡 5. Menejeridan ko'proq maosh oluvchi xodimlar / Employees Earning More Than Their Manager

**Oddiy qilib aytganda:** Xodimlar jadvalini o'zi bilan birlashtiramiz: bir nusxasi — 'xodim', ikkinchisi — 'uning menejeri'. Keyin xodim maoshi menejernikidan katta bo'lganlarni tanlaymiz.

**Sxema:**
```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC, manager_id INT
);
```

**Savol:** O'z menejeridan ko'proq maosh oladigan xodimlarni toping. / Find employees who earn more than their manager.

**Yechim / Solution (self-join):**
```sql
SELECT e.name AS employee, e.salary, m.name AS manager, m.salary AS manager_salary
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;
```

**Intervyuda shunday ayting:** "Self-join: bir jadval ikki roli bilan (alias'lar `e` va `m`). `INNER JOIN` menejeri yo'q xodimlarni (CEO) avtomatik chiqarib tashlaydi — bu masala uchun to'g'ri. `manager_id` ustuniga indeks JOIN'ni tezlashtiradi."

---

## 🟡 6. Har bir bo'limdagi eng yuqori 3 maosh / Top 3 Salaries per Department

**Oddiy qilib aytganda:** Har bo'lim ichida maoshlarni kamayish tartibida raqamlaymiz va har bo'limdan birinchi uchtasini olamiz. Muhim savol: bir xil maoshli xodimlar bo'lsa, ularni qanday hisoblaymiz?

**Sxema:**
```sql
CREATE TABLE employees (id SERIAL, name TEXT, salary NUMERIC, dept_id INT);
CREATE TABLE departments (id SERIAL, name TEXT);
```

**Savol:** Har bir bo'lim uchun eng yuqori 3 maoshli xodimni toping. / Find the top 3 highest-paid employees in each department.

**Yechim / Solution:**
```sql
SELECT dept_name, name, salary FROM (
    SELECT d.name AS dept_name, e.name, e.salary,
           DENSE_RANK() OVER (PARTITION BY e.dept_id ORDER BY e.salary DESC) AS rnk
    FROM employees e
    JOIN departments d ON e.dept_id = d.id
) ranked
WHERE rnk <= 3
ORDER BY dept_name, salary DESC;
```
> 💡 `DENSE_RANK` ishlatiladi, chunki teng maoshli xodimlar bir xil o'rinni egallashi kerak. `ROW_NUMBER` bo'lsa, teng maoshda faqat bittasi hisobga olinardi. / `DENSE_RANK` is used because tied salaries should share a rank; `ROW_NUMBER` would arbitrarily pick only one on a tie.

**Intervyuda shunday ayting:** "`PARTITION BY department` bilan window funksiya. Tanlov: `ROW_NUMBER` — aniq 3 ta qator, `DENSE_RANK` — 'eng yuqori 3 ta maosh qiymati' (tenglar hammasi kiradi). Intervyuda qaysi talqin kerakligini so'rayman."

---

## 🟡 7. Hech qanday buyurtma bermagan mijozlar / Customers Who Never Ordered

**Oddiy qilib aytganda:** Mijozlar ro'yxatidan buyurtmalar jadvalida umuman uchramaydiganlarini topamiz — 'bir marta ham buyurtma bermaganlar'.

**Sxema:** `customers(id, name)`, `orders(id, customer_id)`

**Savol:** Hech qachon buyurtma bermagan mijozlarni toping (anti-join). / Find customers who never placed an order.

**Yechim / Solution:**
```sql
-- LEFT JOIN + IS NULL
SELECT c.name
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;

-- NOT EXISTS (odatda tezroq va NULL-xavfsiz / usually faster and NULL-safe)
SELECT c.name
FROM customers c
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
```
> ⚠️ `NOT IN` dan ehtiyot bo'ling — agar `orders.customer_id` da NULL bo'lsa, `NOT IN` hech narsa qaytarmaydi. / Avoid `NOT IN` here — if `orders.customer_id` contains any NULL, `NOT IN` silently returns zero rows.

**Intervyuda shunday ayting:** "Anti-join uchun `NOT EXISTS` — eng ishonchli: `NOT IN` subquery'da bitta `NULL` bo'lsa, butun natija bo'sh chiqadi. `LEFT JOIN ... WHERE o.id IS NULL` ham to'g'ri ishlaydi; planner odatda ikkalasini bir xil rejaga aylantiradi."

---

## 🔴 8. Ketma-ket kunlar (Gaps & Islands) — foydalanuvchi login streak

**Oddiy qilib aytganda:** Ketma-ket kunlarni topish hiylasi: har kundan uning tartib raqamini ayirsak, ketma-ket kunlar uchun natija **bir xil** sana chiqadi. Shu bir xil qiymat bo'yicha guruhlasak — har guruh bitta 'streak', uning uzunligi — guruhdagi kunlar soni.

**Sxema:** `logins(user_id INT, login_date DATE)`

**Savol:** Har bir foydalanuvchi uchun eng uzun ketma-ket kunlik login "streak"ini toping. / Find each user's longest streak of consecutive daily logins.

**Yechim / Solution (sana - row_number = doimiy guruh triki):**
```sql
WITH numbered AS (
    SELECT user_id, login_date,
           ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS rn
    FROM (SELECT DISTINCT user_id, login_date FROM logins) t
),
grouped AS (
    SELECT user_id, login_date,
           login_date - (rn || ' days')::INTERVAL AS grp
    FROM numbered
)
SELECT DISTINCT ON (user_id) user_id, COUNT(*) AS streak_length,
       MIN(login_date) AS streak_start, MAX(login_date) AS streak_end
FROM grouped
GROUP BY user_id, grp
ORDER BY user_id, streak_length DESC;
```
> 💡 **Trik:** ketma-ket sanalardan `row_number`ni ayirsak, bir xil "streak"ga tegishli qatorlar bir xil sanaga tushadi — bu klassik "Gaps & Islands" yechimi. `DISTINCT ON (user_id)` har foydalanuvchi uchun faqat eng uzun streak'ni qoldiradi. / **Trick:** subtracting the row number from consecutive dates collapses each streak to a single constant value — the classic Gaps & Islands pattern. `DISTINCT ON (user_id)` keeps only the longest streak per user.

**Intervyuda shunday ayting:** "Gaps and islands: `sana − row_number()` ketma-ket qatorlar uchun doimiy guruh kalitini beradi. Avval bir kunga bir nechta login bo'lsa `DISTINCT` qilaman — aks holda hiyla buziladi. Keyin guruh uzunligini sanab, har foydalanuvchi uchun maksimalini olaman."

---

## 🔴 9. Yugurma jami / Running Total (Cumulative Sum)

**Oddiy qilib aytganda:** Yugurma jami — har qatorda 'shu paytgacha jami qancha' degan summa. Hisob varag'idagi balans kabi: har yangi tranzaksiya oldingi yig'indiga qo'shiladi.

**Sxema:** `transactions(id, user_id, amount, created_at)`

**Savol:** Har bir foydalanuvchi uchun sana bo'yicha yugurma (kumulyativ) summani hisoblang. / Compute a running cumulative sum per user ordered by date.

**Yechim / Solution:**
```sql
SELECT user_id, created_at, amount,
       SUM(amount) OVER (
           PARTITION BY user_id
           ORDER BY created_at
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total
FROM transactions
ORDER BY user_id, created_at;
```

**Intervyuda shunday ayting:** "`sum(amount) OVER (PARTITION BY user_id ORDER BY created_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`. Frame'ni `ROWS` deb aniq yozaman — standart `RANGE` bir xil vaqtli qatorlarni birga qo'shib yuboradi. Tartib noyob bo'lishi uchun `id` ni ham qo'shaman."

---

## 🔴 10. Oydan-oyga o'sish (YoY/MoM Growth)

**Oddiy qilib aytganda:** Avval har oyning daromadini hisoblaymiz, keyin har oyni o'zidan oldingi oy bilan solishtiramiz: (bu oy − o'tgan oy) / o'tgan oy × 100%.

**Sxema:** `orders(id, total, created_at)`

**Savol:** Har oy uchun daromadni va o'tgan oyga nisbatan o'sish foizini hisoblang. / Compute monthly revenue and % growth vs. the previous month.

**Yechim / Solution:**
```sql
WITH monthly AS (
    SELECT date_trunc('month', created_at) AS month, SUM(total) AS revenue
    FROM orders
    GROUP BY 1
)
SELECT month, revenue,
       LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
       ROUND(
           100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
           / NULLIF(LAG(revenue) OVER (ORDER BY month), 0), 2
       ) AS growth_pct
FROM monthly
ORDER BY month;
```
> 💡 `NULLIF(..., 0)` — nolga bo'lish xatosidan (division by zero) himoya qiladi. / `NULLIF(..., 0)` guards against division-by-zero.

**Intervyuda shunday ayting:** "Oylik agregat CTE'da, keyin `lag()` bilan oldingi oy. Nolga bo'lishdan `NULLIF` bilan himoyalanaman. Savdo bo'lmagan oylar yo'qolib qolmasligi uchun `generate_series` bilan barcha oylarni to'ldiraman — aks holda 'o'tgan oy' aslida ikki oy oldingisi bo'lib qoladi."

---

## 🔴 11. Median hisoblash / Compute the Median

**Oddiy qilib aytganda:** Median — tartiblangan ro'yxatning o'rtasidagi qiymat: yarmi undan kichik, yarmi katta. O'rtachadan farqli, bitta juda katta maosh uni buzmaydi.

**Savol:** `salary` ustuni uchun medianani toping (window function bilan). / Find the median of the `salary` column using window functions.

**Yechim / Solution:**
```sql
-- PostgreSQL built-in
SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) AS median_salary
FROM employees;

-- Window function bilan qo'lda / Manually with window functions
WITH ranked AS (
    SELECT salary,
           ROW_NUMBER() OVER (ORDER BY salary) AS rn,
           COUNT(*) OVER () AS cnt
    FROM employees
)
SELECT AVG(salary) AS median_salary
FROM ranked
WHERE rn IN ((cnt + 1) / 2, (cnt + 2) / 2);
```

**Intervyuda shunday ayting:** "PostgreSQL'da eng oddiy yo'l — `percentile_cont(0.5) WITHIN GROUP (ORDER BY salary)`; qatorlar soni juft bo'lsa, u ikki o'rtadagi qiymatning o'rtachasini beradi. Window funksiyalar bilan qo'lda hisoblash — tushunishni ko'rsatish uchun yaxshi mashq."

---

## 🔴 12. Pivot hisobot / Pivot Report (rows → columns)

**Oddiy qilib aytganda:** Pivot — qatorlarni ustunlarga aylantirish: har mahsulot uchun bitta qator, choraklar esa alohida ustunlar (Q1, Q2, Q3, Q4). Har ustunga faqat o'z choragining summasini yig'amiz.

**Sxema:** `sales(product TEXT, quarter TEXT, amount NUMERIC)`

**Savol:** Har bir mahsulot uchun chorak (Q1-Q4) ustunlarga aylantirilgan hisobot yarating. / Turn quarters into columns for each product.

**Yechim / Solution (PostgreSQL da PIVOT yo'q — CASE + GROUP BY orqali):**
```sql
SELECT product,
    SUM(CASE WHEN quarter = 'Q1' THEN amount ELSE 0 END) AS q1,
    SUM(CASE WHEN quarter = 'Q2' THEN amount ELSE 0 END) AS q2,
    SUM(CASE WHEN quarter = 'Q3' THEN amount ELSE 0 END) AS q3,
    SUM(CASE WHEN quarter = 'Q4' THEN amount ELSE 0 END) AS q4
FROM sales
GROUP BY product
ORDER BY product;
```
> 💡 PostgreSQL da haqiqiy `PIVOT` operatori yo'q (SQL Server/Oracle da bor) — `crosstab()` (tablefunc kengaytmasi) yoki `CASE WHEN` + `GROUP BY` trikidan foydalaniladi. / PostgreSQL has no native `PIVOT` operator (unlike SQL Server/Oracle) — use the `tablefunc` extension's `crosstab()` or the `CASE WHEN` + `GROUP BY` trick shown above.

**Intervyuda shunday ayting:** "PostgreSQL'da `PIVOT` yo'q: `sum(amount) FILTER (WHERE quarter = 'Q1')` yoki `CASE WHEN` + `GROUP BY` ishlataman — `FILTER` o'qilishi osonroq. Ustunlar dinamik bo'lsa, pivotni ilova yoki hisobot vositasida qilaman (yoki `crosstab` kengaytmasi)."

---

## ⚫ 13. Ierarxik daraxt chuqurligi / Hierarchical Org Chart Depth

**Oddiy qilib aytganda:** Rahbardan boshlab pastga qadam-baqadam yuramiz: rahbar — 0-daraja, uning bo'ysunuvchilari — 1-daraja, ularniki — 2-daraja va hokazo. Rekursiv CTE aynan shunday 'zinapoyadan tushish' ni bajaradi.

**Sxema:** `employees(id, name, manager_id)`

**Savol:** Har bir xodim uchun tashkilot ierarxiyasidagi darajasini (CEO = 0) hisoblang. / Compute each employee's depth in the org hierarchy (CEO = 0).

**Yechim / Solution (Recursive CTE):**
```sql
WITH RECURSIVE org_chart AS (
    SELECT id, name, manager_id, 0 AS depth
    FROM employees WHERE manager_id IS NULL

    UNION ALL

    SELECT e.id, e.name, e.manager_id, oc.depth + 1
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY depth, name;
```

**Intervyuda shunday ayting:** "Rekursiv CTE: boshlang'ich qism (manager_id IS NULL) + o'ziga JOIN qiluvchi qism. Ma'lumotda sikl bo'lsa cheksiz aylanmasligi uchun chuqurlik chegarasi yoki PostgreSQL 14+ dagi `CYCLE` bandini ishlataman."

---

## ⚫ 14. Foydalanuvchi retensiyasi (Cohort Retention)

**Oddiy qilib aytganda:** Kohorta — bir oyda ro'yxatdan o'tganlar guruhi. Har guruh uchun: 1-oydan keyin, 2-oydan keyin... ulardan necha foizi hali ham faol? Buning uchun har foydalanuvchining kohortasi va faol bo'lgan oylari orasidagi farqni hisoblab, guruhlaymiz.

**Sxema:** `activity(user_id, activity_date, first_seen_date)`

**Savol:** Har bir kohorta (ro'yxatdan o'tgan oy) uchun keyingi oylarda faol qolgan foydalanuvchilar foizini hisoblang. / Compute % of each signup cohort still active in subsequent months.

**Yechim / Solution:**
```sql
WITH cohorts AS (
    SELECT user_id, date_trunc('month', first_seen_date) AS cohort_month
    FROM activity GROUP BY 1, 2
),
activity_months AS (
    SELECT DISTINCT user_id, date_trunc('month', activity_date) AS active_month
    FROM activity
),
joined AS (
    SELECT c.cohort_month,
           (EXTRACT(YEAR FROM am.active_month) - EXTRACT(YEAR FROM c.cohort_month)) * 12
         + (EXTRACT(MONTH FROM am.active_month) - EXTRACT(MONTH FROM c.cohort_month)) AS month_number,
           am.user_id
    FROM activity_months am
    JOIN cohorts c ON am.user_id = c.user_id
)
SELECT cohort_month, month_number, COUNT(DISTINCT user_id) AS active_users
FROM joined
GROUP BY cohort_month, month_number
ORDER BY cohort_month, month_number;
```

**Intervyuda shunday ayting:** "Kohort tahlil: kohorta oyi, 'necha oy o'tdi' raqami va faol foydalanuvchilar soni. Foizni olish uchun har kohortaning 0-oydagi soniga bo'laman — `first_value(active_users) OVER (PARTITION BY cohort_month ORDER BY month_number)`. Sanalarni UTC'da hisoblayman, aks holda oy chegaralari suriladi."

---

## 📋 Tezkor eslash strategiyasi / Quick Recall Strategy

| Masala turi / Problem type | Kalit vosita / Key tool |
|---|---|
| N-chi qiymat / Nth value | `DENSE_RANK()` + `WHERE rnk = N` |
| Guruh ichida top-N | `PARTITION BY` + `DENSE_RANK()`/`ROW_NUMBER()` |
| Mavjud emasligini tekshirish / Non-existence check | `NOT EXISTS` (`NOT IN` emas!) |
| Ketma-ketlikni topish / Consecutive sequences | sana − `ROW_NUMBER()` = doimiy guruh |
| Yugurma jami / Running totals | `SUM() OVER (ORDER BY ... ROWS BETWEEN ...)` |
| Oldingi/keyingi qator bilan solishtirish | `LAG()` / `LEAD()` |
| Ierarxik ma'lumot / Hierarchical data | `WITH RECURSIVE` |
| Qatorni ustunga aylantirish / Rows to columns | `CASE WHEN` + `SUM`/`MAX` + `GROUP BY` |

---

*Tayyorlagan / Prepared by: Alyorjon | interview_content_architect & interactive_quiz_tester agentlari asosida*
