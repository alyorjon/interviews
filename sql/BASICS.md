# 🗄️ SQL asoslari — buyruqlar ma'lumotnomasi va intervyu savollari / SQL Basics

> **Manba / Source:** 100 SQL Commands PDF  
> **Tillar / Languages:** O'zbek 🇺🇿 | English 🇬🇧  
> **Maqsad / Goal:** SQL buyruqlarini tez esga olish (1–18-bo'limlar) va umumiy SQL intervyu savollari (pastda). PostgreSQL'ga xos savollar — `sql/postgresql_interviews.md`, amaliy ssenariylar — `practical/postgresql.md`.

---

## 🆕 Modern SQL interview topics

**EN:** Modern SQL interviews emphasize query performance, indexing, transactions, and practical database design.

**UZ:** Zamonaviy SQL intervyularida so‘rovlarning tezligi, indekslar, tranzaksiyalar va amaliy DB dizayn muhim bo‘ladi.

- `CTE` (`WITH`) — murakkab so‘rovlarni o‘qilishi oson bo‘lgan bo‘laklarga ajratadi.
- Window functions: `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `SUM() OVER()`.
- `EXPLAIN ANALYZE` — so‘rov rejasini va real ishlash vaqtini ko‘rish uchun.
- Transaction isolation levels: `READ COMMITTED`, `REPEATABLE READ`, `SERIALIZABLE`.
- `pg_stat_statements` (PostgreSQL) — qaysi so‘rovlar sekin ishlayotganini aniqlash uchun.

```sql
SELECT customer_id, order_id,
       ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at) AS rn
FROM orders;
```

---

## 📌 1. DML — Ma'lumot boshqaruvi / Data Manipulation

> Mavjud ma'lumotlar ustida amal bajaradi / Works on existing data

| Buyruq / Command | O'zbek / Uzbek                                      | English                             |
| ---------------- | --------------------------------------------------- | ----------------------------------- |
| `SELECT`         | Ma'lumotlar bazasidan ma'lumot oladi                | Retrieves data from a database      |
| `INSERT`         | Ma'lumotlar bazasiga yangi ma'lumot qo'shadi        | Inserts new data into a database    |
| `UPDATE`         | Ma'lumotlar bazasidagi mavjud ma'lumotni yangilaydi | Updates existing data in a database |
| `DELETE`         | Ma'lumotlar bazasidan ma'lumot o'chiradi            | Deletes data from a database        |

```sql
-- Misol / Example
SELECT name, age FROM users WHERE age > 18;
INSERT INTO users (name, age) VALUES ('Ali', 25);
UPDATE users SET age = 26 WHERE name = 'Ali';
DELETE FROM users WHERE name = 'Ali';
```

---

## 📌 2. DDL — Tuzilma boshqaruvi / Data Definition

> Jadval va ma'lumotlar bazasi tuzilmasini yaratish/o'zgartirish / Creates and modifies structure

| Buyruq / Command  | O'zbek / Uzbek                                             | English                                              |
| ----------------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| `CREATE DATABASE` | Yangi ma'lumotlar bazasi yaratadi                          | Creates a new database                               |
| `CREATE TABLE`    | Ma'lumotlar bazasida yangi jadval yaratadi                 | Creates a new table in a database                    |
| `ALTER TABLE`     | Mavjud jadval tuzilmasini o'zgartiradi                     | Modifies an existing table structure                 |
| `DROP TABLE`      | Ma'lumotlar bazasidan jadvalni o'chiradi                   | Deletes a table from a database                      |
| `TRUNCATE TABLE`  | Jadvaldagi barcha yozuvlarni o'chiradi (tuzilma saqlanadi) | Removes all records from a table (structure remains) |
| `CREATE INDEX`    | Jadvalda indeks yaratadi                                   | Creates an index on a table                          |
| `DROP INDEX`      | Jadvaldan indeksni o'chiradi                               | Deletes an index from a table                        |

```sql
-- Misol / Example
CREATE DATABASE mydb;
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));
ALTER TABLE users ADD COLUMN email VARCHAR(255);
DROP TABLE old_users;
TRUNCATE TABLE logs;
CREATE INDEX idx_name ON users(name);
```

---

## 📌 3. JOIN — Jadvallarni birlashtirish / Joining Tables

> Ikki yoki undan ko'p jadvaldagi ma'lumotlarni birlashtiradi / Combines rows from multiple tables

| Buyruq / Command | O'zbek / Uzbek                                                          | English                                                         |
| ---------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| `JOIN`           | Bog'liq ustun asosida ikki yoki ko'p jadvaldagi satrlarni birlashtiradi | Combines rows from two or more tables based on a related column |
| `INNER JOIN`     | Ikkala jadvalda ham mos keladigan satrlarni qaytaradi                   | Returns rows when there is a match in both tables               |
| `LEFT JOIN`      | Chap jadvaldagi barcha satrlar + o'ng jadvaldan mos kelganlar           | Returns all rows from left table + matched rows from right      |
| `RIGHT JOIN`     | O'ng jadvaldagi barcha satrlar + chap jadvaldan mos kelganlar           | Returns all rows from right table + matched rows from left      |
| `FULL JOIN`      | Jadvallardan birida mos kelganda barcha satrlarni qaytaradi             | Returns rows when there is a match in one of the tables         |

```sql
-- Misol / Example
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
```

---

## 📌 4. SET operatorlari / SET Operators

> Bir nechta SELECT natijalarini birlashtiradi / Combines results of multiple SELECT statements

| Buyruq / Command | O'zbek / Uzbek                                                           | English                                                           |
| ---------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `UNION`          | Ikki yoki ko'p SELECT natijalarini birlashtiradi (takrorlanmaslar)       | Combines results of two or more SELECT statements (no duplicates) |
| `UNION ALL`      | Ikki yoki ko'p SELECT natijalarini birlashtiradi (takrorlanishlar bilan) | Combines results including duplicates                             |
| `INTERSECT`      | Ikki natija to'plamining kesishmasini qaytaradi                          | Returns the intersection of two result sets                       |
| `EXCEPT`         | Ikki natija to'plami o'rtasidagi farqni qaytaradi                        | Returns the difference between two result sets                    |

```sql
-- Misol / Example
SELECT name FROM employees
UNION
SELECT name FROM managers;

SELECT name FROM employees
INTERSECT
SELECT name FROM managers;
```

---

## 📌 5. Filtrlash & Saralash / Filtering & Sorting

> Ma'lumotlarni filtrlash va tartiblash uchun / For filtering and ordering data

| Buyruq / Command | O'zbek / Uzbek                                                                    | English                                                                                  |
| ---------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `WHERE`          | Belgilangan shartlar asosida yozuvlarni filtrlaydi                                | Filters records based on specified conditions                                            |
| `AND`            | WHERE shartida bir nechta shartni birlashtiradi                                   | Combines multiple conditions in a WHERE clause                                           |
| `OR`             | WHERE shartida bir nechta muqobil shartni belgilaydi                              | Specifies multiple alternative conditions in a WHERE clause                              |
| `NOT`            | WHERE shartidagi shartni inkor etadi                                              | Negates a condition in a WHERE clause                                                    |
| `BETWEEN`        | Belgilangan oraliq ichidagi qiymatlarni tanlaydi                                  | Selects values within a specified range                                                  |
| `IN`             | Ustun uchun bir nechta qiymat belgilaydi                                          | Specifies multiple values for a column                                                   |
| `LIKE`           | Namunaga mos keladigan qiymatlarni qidiradi                                       | Searches for a pattern in a column                                                       |
| `ORDER BY`       | Natija to'plamini o'suvchi yoki kamayuvchi tartibda saralaydi                     | Sorts the result set in ascending or descending order                                    |
| `LIMIT`          | So'rov qaytaradigan satrlar sonini cheklaydi (PostgreSQL/MySQL)                   | Limits the number of rows returned by a query                                            |
| `OFFSET`         | Satrlarni qaytarishdan oldin o'tkazib yuboriladigan satrlar sonini belgilaydi     | Specifies number of rows to skip before returning rows                                   |
| `TOP`            | So'rov qaytaradigan satrlar sonini cheklaydi (SQL Server)                         | Limits the number of rows returned (SQL Server)                                          |
| `FETCH`          | So'rov qaytaradigan satrlar sonini cheklaydi (odatda OFFSET bilan, SQL standarti) | Limits the number of rows returned by a query (SQL standard, typically used with OFFSET) |
| `DISTINCT`       | Ustundan yagona (takrorlanmaydigan) qiymatlarni tanlaydi                          | Selects unique values from a column                                                      |

```sql
-- Misol / Example
SELECT * FROM products
WHERE price BETWEEN 10 AND 100
  AND category IN ('Electronics', 'Books')
ORDER BY price DESC
LIMIT 10 OFFSET 20;
```

---

## 📌 6. Agregat funksiyalar / Aggregate Functions

> Guruhlar bo'yicha hisob-kitob qiladi / Performs calculations across groups

| Buyruq / Command | O'zbek / Uzbek                                                       | English                                                    |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| `COUNT`          | Shartni qanoatlantiradigan satrlar sonini qaytaradi                  | Returns the number of rows that satisfy the condition      |
| `SUM`            | Qiymatlar to'plamining yig'indisini hisoblaydi                       | Calculates the sum of a set of values                      |
| `AVG`            | Qiymatlar to'plamining o'rtachasini hisoblaydi                       | Calculates the average of a set of values                  |
| `MIN`            | Qiymatlar to'plamidagi eng kichik qiymatni qaytaradi                 | Returns the smallest value in a set of values              |
| `MAX`            | Qiymatlar to'plamidagi eng katta qiymatni qaytaradi                  | Returns the largest value in a set of values               |
| `GROUP BY`       | Bir xil qiymatlarga ega satrlarni xulosaviy satrlarga guruhlaydi     | Groups rows with the same values into summary rows         |
| `HAVING`         | Belgilangan shart asosida yozuvlarni filtrlaydi (GROUP BY dan keyin) | Filters records based on a condition (used after GROUP BY) |

```sql
-- Misol / Example
SELECT department, COUNT(*) as total, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING COUNT(*) > 5
ORDER BY avg_salary DESC;
```

---

## 📌 7. NULL tekshiruvi / NULL Checks

| Buyruq / Command | O'zbek / Uzbek                                                | English                                                                |
| ---------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `IS NULL`        | Ustundagi NULL qiymatlarni tekshiradi                         | Checks for NULL values in a column                                     |
| `IS NOT NULL`    | Ustundagi NULL bo'lmagan qiymatlarni tekshiradi               | Checks for non-NULL values in a column                                 |
| `EXISTS`         | Subquery'da birorta yozuv mavjudligini tekshiradi             | Tests for the existence of any record in a subquery                    |
| `COALESCE`       | Ro'yxatdagi birinchi NULL bo'lmagan ifodasini qaytaradi       | Returns the first non-NULL expression in a list                        |
| `NULLIF`         | Ikki ifoda teng bo'lsa NULL qaytaradi, aks holda birinchisini | Returns NULL if two expressions are equal, otherwise returns the first |

```sql
-- Misol / Example
SELECT name, COALESCE(phone, 'N/A') as phone
FROM users
WHERE email IS NOT NULL;

SELECT NULLIF(salary, 0) FROM employees;
```

---

## 📌 8. Shartli mantiq / Conditional Logic

| Buyruq / Command | O'zbek / Uzbek                                              | English                                                 |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------- |
| `CASE`           | SQL iboralarida shartli mantiqni bajaradi                   | Performs conditional logic in SQL statements            |
| `WHEN`           | CASE iborasida shartlarni belgilaydi                        | Specifies conditions in a CASE statement                |
| `THEN`           | CASE da shart to'g'ri bo'lganda natijani belgilaydi         | Specifies result if a condition is true in CASE         |
| `ELSE`           | CASE da hech bir shart to'g'ri bo'lmasa natijani belgilaydi | Specifies result if no condition is true in CASE        |
| `END`            | CASE iborasini tugatadi                                     | Ends the CASE statement                                 |
| `CASE WHEN`      | SELECT iboralarida shartli ifoda                            | Conditional expression in SELECT statements             |
| `IIF`            | Boolean ifodaga asoslanib ikki qiymatdan birini qaytaradi   | Returns one of two values based on a Boolean expression |

```sql
-- Misol / Example
SELECT name,
  CASE
    WHEN salary > 5000000 THEN 'Yuqori / High'
    WHEN salary > 2000000 THEN 'O''rta / Medium'
    ELSE 'Past / Low'
  END as salary_level
FROM employees;
```

---

## 📌 9. Cheklovlar / Constraints

> Ma'lumot yaxlitligini ta'minlaydi / Ensures data integrity

| Buyruq / Command | O'zbek / Uzbek                                           | English                                          |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------ |
| `PRIMARY KEY`    | Jadvaldagi har bir yozuvni yagona identifikatsiya qiladi | Uniquely identifies each record in a table       |
| `FOREIGN KEY`    | Jadvallar o'rtasida munosabat o'rnatadi                  | Establishes a relationship between tables        |
| `CONSTRAINT`     | Jadvaldagi ma'lumotlar uchun qoidalarni joriy qiladi     | Enforces rules for data in a table               |
| `NOT NULL`       | Ustun NULL qiymat qabul qila olmasligini ta'minlaydi     | Ensures that a column cannot contain NULL values |
| `UNIQUE`         | Ustundagi barcha qiymatlar yagona bo'lishini ta'minlaydi | Ensures that all values in a column are unique   |
| `CHECK`          | Ustundagi qiymatlarga shart joriy qiladi                 | Enforces a condition on the values in a column   |

```sql
-- Misol / Example
CREATE TABLE orders (
    id        SERIAL PRIMARY KEY,
    user_id   INT NOT NULL REFERENCES users(id),
    amount    DECIMAL CHECK (amount > 0),
    status    VARCHAR(20) DEFAULT 'pending',
    CONSTRAINT uq_order UNIQUE (user_id, created_at)
);
```

---

## 📌 10. Foreign Key harakatlari / Foreign Key Actions

| Buyruq / Command | O'zbek / Uzbek                                                                | English                                                            |
| ---------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `CASCADE`        | Bog'liq yozuvlarda belgilangan amalni avtomatik bajaradi                      | Automatically performs a specified action on related records       |
| `SET NULL`       | Havola qilingan yozuv o'chirilganda FK ustunlarini NULL ga o'rnatadi          | Sets FK columns to NULL when referenced record is deleted          |
| `SET DEFAULT`    | Havola qilingan yozuv o'chirilganda FK ustunlarini default qiymatga o'rnatadi | Sets FK columns to default value when referenced record is deleted |
| `NO ACTION`      | Havola qilingan yozuv o'chirilganda bog'liq yozuvlarda hech narsa qilmaydi    | Specifies no action on related records when referenced is deleted  |
| `RESTRICT`       | Bog'liq yozuvlar mavjud bo'lsa havola qilingan yozuvni o'chirishni cheklaydi  | Restricts deletion if there are related records                    |

```sql
-- Misol / Example
CREATE TABLE orders (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    dept_id INT REFERENCES departments(id) ON DELETE SET NULL
);
```

---

## 📌 11. Window funksiyalar / Window Functions

> Hisob-kitobni qatorlar guruhi bo'yicha bajaradi / Performs calculations across a set of rows

| Buyruq / Command | O'zbek / Uzbek                                                                 | English                                                   |
| ---------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `ROW_NUMBER()`   | Natija to'plamidagi har bir satrga yagona ketma-ket son beradi                 | Assigns a unique sequential integer to each row           |
| `RANK()`         | Natija to'plamidagi har bir satrga rank beradi (oraliqlar bo'lishi mumkin)     | Assigns a rank with possible gaps in sequence             |
| `DENSE_RANK()`   | Natija to'plamidagi har bir satrga rank beradi (oraliqsiz)                     | Assigns a rank with no gaps in sequence                   |
| `NTILE()`        | Natija to'plamini teng o'lchamli guruhlarga bo'ladi                            | Divides the result set into equally sized groups          |
| `LEAD()`         | Natija to'plamidagi keyingi satrdan qiymat oladi                               | Retrieves the value from the next row in a result set     |
| `LAG()`          | Natija to'plamidagi oldingi satrdan qiymat oladi                               | Retrieves the value from the previous row in a result set |
| `PARTITION BY`   | Natija to'plamini window funksiya alohida qo'llaniladigan bo'limlarga ajratadi | Divides result set into partitions for window functions   |
| `ROWS`           | Window funksiyalar uchun window freymini belgilaydi                            | Specifies the window frame for window functions           |
| `RANGE`          | Qatorlar emas, qiymatlar asosida window freymini belgilaydi                    | Specifies window frame based on values rather than rows   |

```sql
-- Misol / Example
SELECT name, salary, department,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank_in_dept,
    LAG(salary) OVER (ORDER BY salary) as prev_salary,
    LEAD(salary) OVER (ORDER BY salary) as next_salary
FROM employees;
```

### 🔎 LAG() / LEAD() — chuqur tushuntirish / Deep dive

**Sintaksis:**

```sql
LAG(ustun, n, standart_qiymat) OVER (
    [PARTITION BY guruh_ustuni]
    ORDER BY tartib_ustuni
)
```

- `ustun` — qaysi ustunning oldingi (LAG) yoki keyingi (LEAD) qiymatini olish kerak
- `n` — necha qator orqaga/oldinga siljish (standart holda `1`)
- `standart_qiymat` — mos qator topilmasa qaytariladigan qiymat (standart holda `NULL`)
- `ORDER BY` — **majburiy**: "oldingi/keyingi" degani fizik jadval tartibi emas, balki shu `ORDER BY` bo'yicha tartib
- `PARTITION BY` — ixtiyoriy, guruhlarni bir-biriga aralashtirmaydi (masalan har bir kategoriya o'z holicha hisoblansin desangiz)

**Misol (oylik ko'rishlar):**

```sql
SELECT
    oy,
    jami_views,
    LAG(jami_views) OVER (ORDER BY oy) AS oldingi_oy,
    LEAD(jami_views) OVER (ORDER BY oy) AS keyingi_oy
FROM monthly
ORDER BY oy;
```

Birinchi qatorda `oldingi_oy` — `NULL` (chunki undan oldin qator yo'q); oxirgi qatorda `keyingi_oy` — `NULL`.

**O'sish foizini hisoblash:**

```sql
ROUND(
    100.0 * (jami_views - LAG(jami_views) OVER (ORDER BY oy))
    / NULLIF(LAG(jami_views) OVER (ORDER BY oy), 0),
    2
) AS osish_foizi
```

**Window function turlari orasida o'rni:** LAG/LEAD — *offset (value) functions* guruhiga kiradi (`FIRST_VALUE`, `LAST_VALUE`, `NTH_VALUE` bilan birga), `ROW_NUMBER`/`RANK` kabi *ranking* funksiyalardan va `SUM() OVER()` kabi *aggregate window* funksiyalardan farqli. Frame clause (`ROWS BETWEEN ... AND ...`) LAG/LEAD uchun shart emas — ular frame emas, `PARTITION BY` ichidagi to'liq tartiblangan ro'yxat bo'yicha "n-qator narida"gi qiymatni topadi.

**LAG vs self-JOIN:** Avval xuddi shu natija self-JOIN bilan olinardi (`... LEFT JOIN table b ON b.date = a.date - INTERVAL '1 day'`). LAG buni bitta single-pass sort bilan, JOIN sharti yozmasdan va sana uzilishlaridan xatoga tushmasdan hal qiladi.

**Keng tarqalgan xato:** LAG/LEAD natijasi `WHERE` bandida to'g'ridan-to'g'ri ishlatilmaydi, chunki window funksiyalar `WHERE`dan keyin hisoblanadi (bajarilish tartibi: `FROM → WHERE → GROUP BY → HAVING → SELECT(window funcs) → ORDER BY`). Filtrlash kerak bo'lsa, subquery/CTE ichiga olib tashqarida `WHERE` yoziladi:

```sql
SELECT * FROM (
    SELECT *, LAG(status) OVER (PARTITION BY user_id ORDER BY created_at) AS prev_status
    FROM events
) t
WHERE status != prev_status OR prev_status IS NULL;
```

**Amaliy qo'llanishlar:** status o'zgargan nuqtani topish, ketma-ket sanalar orasidagi uzilishlarni (gap) aniqlash, sessiya chegarasini belgilash, oldingi qator bilan solishtirib dublikatlarni topish.

### 🔢 Ranking funksiyalar: ROW_NUMBER() / RANK() / DENSE_RANK() / NTILE()

Bularning barchasi bir xil savolga javob beradi — "bu qator guruh ichida nechinchi o'rinda?" — lekin **teng qiymatlarni (tie) qanday hal qilishida** farqlanadi.

```sql
SELECT
    name, department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn,
    RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rnk,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS drnk
FROM employees;
```

| department | salary | rn | rnk | drnk | Izoh |
|---|---|---|---|---|---|
| IT | 9000 | 1 | 1 | 1 | |
| IT | 8000 | 2 | 2 | 2 | |
| IT | 8000 | 3 | 2 | 2 | **teng qiymat**: RANK/DENSE_RANK bir xil rank beradi, ROW_NUMBER esa hech qachon takrorlanmaydi |
| IT | 7000 | 4 | 4 | 3 | RANK keyingi raqamni **tashlab ketadi** (3 yo'q, to'g'ridan-to'g'ri 4), DENSE_RANK **ketma-ket davom etadi** |

- **`ROW_NUMBER()`** — teng qiymatlar bo'lsa ham har doim noyob, ketma-ket raqam beradi (1,2,3,4...). Odatda **"har guruhdan faqat eng yaxshi N tasi"** kabi so'rovlarda ishlatiladi:
```sql
-- Har bir bo'lim bo'yicha eng yuqori maoshli 3 nafar xodim
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
    FROM employees
) t WHERE rn <= 3;
```
- **`RANK()`** — teng qiymatlarga bir xil rank beradi, lekin keyingi rankni **tashlab ketadi** (1,2,2,4). Sport reytingiga o'xshaydi: ikkita 2-o'rin bo'lsa, uchinchisi yo'q.
- **`DENSE_RANK()`** — teng qiymatlarga bir xil rank beradi, lekin **tashlab ketmaydi** (1,2,2,3). "Nechta **turli** daraja bor" degan savolga mos.
- **`NTILE(n)`** — natija to'plamini `n` ta teng (yoki imkon qadar teng) guruhga bo'ladi — masalan foydalanuvchilarni maosh bo'yicha 4 ta kvartilga (quartile) ajratish:
```sql
SELECT name, salary, NTILE(4) OVER (ORDER BY salary DESC) AS quartile
FROM employees;
```

**Muhim farq:** `RANK`/`DENSE_RANK`/`ROW_NUMBER` — real vaqtda tez-tez chalkashtiriladi. Agar savol "N-o'rindagi eng katta qiymatni top" bo'lsa (masalan 2-eng katta maosh, dublikatlar bilan ham noyob bo'lishi kerak bo'lsa) — `DENSE_RANK` to'g'ri tanlov, chunki `LIMIT`/`OFFSET` yoki `ROW_NUMBER` dublikat qiymatlarda xato beradi.

### 🎯 FIRST_VALUE() / LAST_VALUE() / NTH_VALUE()

LAG/LEAD kabi *offset (value) functions* guruhiga kiradi, lekin "n-qator narida" emas, **butun window freymi ichidagi birinchi/oxirgi/n-chi qiymatni** qaytaradi.

```sql
SELECT
    name, department, salary,
    FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) AS eng_yuqori_maosh_xodim,
    LAST_VALUE(name)  OVER (
        PARTITION BY department ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS eng_past_maosh_xodim
FROM employees;
```

**Diqqat — `LAST_VALUE` bilan bog'liq eng keng tarqalgan xato:** standart window freymi `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` bo'lgani uchun, `ROWS BETWEEN ... AND UNBOUNDED FOLLOWING` ni aniq yozmasangiz, `LAST_VALUE` har doim **joriy qatorning o'zini** qaytaradi (chunki frame "hozirgacha" bilan tugaydi), butun guruhning oxirgisini emas. Shu sababli `LAST_VALUE` ishlatilganda deyarli har doim frame'ni qo'lda kengaytirish kerak bo'ladi.

`NTH_VALUE(ustun, n)` — freym ichidagi n-chi qiymatni qaytaradi (masalan `NTH_VALUE(salary, 2) OVER (...)` — guruhdagi 2-eng katta maosh).

### ➕ Aggregate window funksiyalar: SUM() / AVG() / COUNT() OVER()

Har qanday agregat funksiyani `OVER()` bilan ishlatish mumkin — bu holda u qatorlarni bitta natijaga yig'ib qo'ymaydi (GROUP BY kabi), balki **har bir qatorda o'sha oyingacha/guruh bo'yicha yig'indini** ko'rsatadi:

```sql
SELECT
    oy, jami_views,
    SUM(jami_views) OVER (ORDER BY oy) AS running_total,
    AVG(jami_views) OVER (ORDER BY oy ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_3oy,
    SUM(jami_views) OVER (PARTITION BY category) AS category_total,
    COUNT(*)        OVER () AS jami_qatorlar_soni
FROM monthly;
```

- `SUM() OVER (ORDER BY oy)` — **running total / cumulative sum**: har qator o'zigacha bo'lgan barcha qiymatlar yig'indisini ko'rsatadi.
- `AVG() OVER (... ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)` — **moving average**: joriy qator + oldingi 2 qator (jami 3 qator) bo'yicha o'rtacha — vaqt qatorlarini silliqlashda (trend ko'rish) juda keng qo'llaniladi.
- `PARTITION BY` bilan (lekin `ORDER BY`siz) — guruh bo'yicha umumiy yig'indi, har qatorga takrorlanib yoziladi (masalan "bu qatorning umumiy kategoriya bo'yicha ulushi" hisoblashda foydali: `jami_views / category_total`).
- `OVER ()` — bo'sh, hech qanday partition/order bo'lmasa — butun natija to'plami bo'yicha, masalan umumiy qatorlar sonini har qatorga qo'shib chiqarish uchun.

### 🖼️ Frame clause: ROWS vs RANGE vs GROUPS

`ROWS BETWEEN ... AND ...` window freymini **fizik qator soni** bo'yicha belgilaydi, `RANGE` esa **qiymat** bo'yicha (ORDER BY ustunidagi teng qiymatlarni bitta freymga qo'shadi):

```sql
-- ROWS: aniq 3 ta qator (joriy + oldingi 2), teng sanalar bo'lsa ham
AVG(salary) OVER (ORDER BY hire_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)

-- RANGE: hire_date qiymati bir xil bo'lgan barcha qatorlar bitta freymga kiradi
AVG(salary) OVER (ORDER BY hire_date RANGE BETWEEN 2 PRECEDING AND CURRENT ROW)
```

Frame chegaralari uchun kalit so'zlar: `UNBOUNDED PRECEDING` (guruh boshidan), `N PRECEDING`, `CURRENT ROW`, `N FOLLOWING`, `UNBOUNDED FOLLOWING` (guruh oxirigacha). `ORDER BY` yozilmasa standart freym butun partition bo'ladi; `ORDER BY` yozilsa-yu frame aniq ko'rsatilmasa, standart holda `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` qo'llaniladi — aynan shu narsa yuqoridagi `LAST_VALUE` xatosining sababi.

---

## 📌 12. CTE & Subquery

| Buyruq / Command | O'zbek / Uzbek                                            | English                                          |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------ |
| `WITH`           | Umumiy jadval ifodasini (CTE) belgilaydi                  | Defines a common table expression (CTE)          |
| `INTO`           | SELECT natija to'plami uchun maqsadli jadvalni belgilaydi | Specifies a target table for a SELECT result set |

```sql
-- Misol / Example (CTE)
WITH top_earners AS (
    SELECT name, salary, department
    FROM employees
    WHERE salary > 3000000
)
SELECT department, COUNT(*) as count
FROM top_earners
GROUP BY department;
```

---

## 📌 13. Sana & Vaqt funksiyalari / Date & Time Functions

| Buyruq / Command    | O'zbek / Uzbek                                                 | English                                                          |
| ------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| `CURRENT_TIMESTAMP` | Joriy sana va vaqtni qaytaradi                                 | Returns the current date and time                                |
| `CURRENT_DATE`      | Joriy sanani qaytaradi                                         | Returns the current date                                         |
| `CURRENT_TIME`      | Joriy vaqtni qaytaradi                                         | Returns the current time                                         |
| `DATEADD`           | Sanaga belgilangan vaqt oralig'ini qo'shadi                    | Adds a specified time interval to a date                         |
| `DATEDIFF`          | Ikki sana o'rtasidagi farqni hisoblaydi                        | Calculates the difference between two dates                      |
| `DATEPART`          | Sananing ma'lum bir qismini ajratib oladi                      | Extracts a specific part of a date                               |
| `GETDATE`           | Joriy sana va vaqtni qaytaradi (CURRENT_TIMESTAMP ga o'xshash) | Returns the current date and time (similar to CURRENT_TIMESTAMP) |

```sql
-- Misol / Example
SELECT CURRENT_DATE, CURRENT_TIME, CURRENT_TIMESTAMP;

-- PostgreSQL
SELECT created_at, AGE(NOW(), created_at) as age FROM users;
```

---

## 📌 14. String funksiyalari / String Functions

| Buyruq / Command | O'zbek / Uzbek                                                                                 | English                                                        |
| ---------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `CONCAT`         | Ikki yoki ko'p satrni birlashtiradi                                                            | Concatenates two or more strings                               |
| `SUBSTRING`      | Satrdan qism satr ajratib oladi                                                                | Extracts a substring from a string                             |
| `REPLACE`        | Satr ichidagi belgilangan qism satrning barcha uchrashuvchanlarini boshqasi bilan almashtiradi | Replaces all occurrences of a substring with another           |
| `LEN`            | Satr uzunligini qaytaradi                                                                      | Returns the length of a string                                 |
| `UPPER`          | Satrni katta harflarga aylantiradi                                                             | Converts a string to uppercase                                 |
| `LOWER`          | Satrni kichik harflarga aylantiradi                                                            | Converts a string to lowercase                                 |
| `TRIM`           | Satrdan bosh va oxiridagi bo'shliqlarni olib tashlaydi                                         | Removes leading and trailing spaces from a string              |
| `ROUND`          | Sonni belgilangan kasr raqamlariga yaxlitlaydi                                                 | Rounds a numeric value to a specified number of decimal places |

```sql
-- Misol / Example
SELECT
    CONCAT(first_name, ' ', last_name) as full_name,
    UPPER(email) as email_upper,
    TRIM(phone) as phone_clean,
    SUBSTRING(description, 1, 100) as short_desc
FROM users;
```

---

## 📌 15. Guruhlash kengaytmalari / Grouping Extensions

| Buyruq / Command | O'zbek / Uzbek                                                                          | English                                              |
| ---------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `GROUPING SETS`  | Agregatsiya uchun bir nechta guruhlanishni belgilaydi                                   | Specifies multiple groupings for aggregation         |
| `CUBE`           | Agregatsiya uchun guruhlanish to'plamlarining barcha mumkin kombinatsiyalarini yaratadi | Generates all possible combinations of grouping sets |
| `ROLLUP`         | Qiymatlar ierarxiyasi uchun oraliq yig'indisini yaratadi                                | Generates subtotal values for a hierarchy of values  |

```sql
-- Misol / Example
SELECT department, job_title, SUM(salary)
FROM employees
GROUP BY ROLLUP (department, job_title);
```

---

## 📌 16. Ilg'or operatsiyalar / Advanced Operations

| Buyruq / Command | O'zbek / Uzbek                                                                                             | English                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `MERGE`          | Manba jadval bilan join natijasiga asosan maqsadli jadvalda INSERT/UPDATE/DELETE bajaradi                  | Performs insert, update, or delete based on join with a source table |
| `PIVOT`          | Bir ustundagi yagona qiymatlarni chiqishdagi bir nechta ustunlarga aylantiradi                             | Rotates unique values from one column into multiple columns          |
| `UNPIVOT`        | Bir nechta ustunlarni chiqishdagi yagona satrlarga aylantiradi                                             | Turns multiple columns into unique rows in the output                |
| `CROSS APPLY`    | Tashqi jadvalning har bir satriga nisbatan bog'liq subquery bajaradi                                       | Performs a correlated subquery against each row of the outer table   |
| `OUTER APPLY`    | CROSS APPLY ga o'xshash, lekin ichki jadvalda mos qatorlar bo'lmasa ham tashqi jadvaldan satrlar qaytaradi | Like CROSS APPLY, but also returns rows with no matching inner rows  |

```sql
-- Misol / Example (MERGE)
MERGE INTO target_table AS t
USING source_table AS s ON t.id = s.id
WHEN MATCHED THEN UPDATE SET t.name = s.name
WHEN NOT MATCHED THEN INSERT (id, name) VALUES (s.id, s.name);
```

---

## 📌 17. Normalizatsiya / Normalization

> Ma'lumotlar takrorlanishini kamaytirib, yaxlitlikni ta'minlash uchun jadvallarni tuzish qoidalari / Rules for structuring tables to reduce redundancy and ensure integrity

| Forma / Form | O'zbek / Uzbek                                                                                                       | English                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `1NF`        | Har bir katak bitta atomik qiymatga ega bo'lishi, takrorlanuvchi guruhlar bo'lmasligi kerak                          | Each cell holds a single atomic value; no repeating groups                              |
| `2NF`        | 1NF + barcha nokalit ustunlar butun primary key ga to'liq funksional bog'liq bo'lishi kerak (qisman bog'liqlik yo'q) | 1NF + every non-key column depends on the _whole_ composite key (no partial dependency) |
| `3NF`        | 2NF + nokalit ustunlar orasida tranzitiv bog'liqlik bo'lmasligi kerak                                                | 2NF + no transitive dependency between non-key columns                                  |
| `BCNF`       | Har bir determinant kandidat kalit bo'lishi kerak (3NF ning qattiqroq versiyasi)                                     | Every determinant must be a candidate key (stricter version of 3NF)                     |
| `4NF`        | Ko'p qiymatli bog'liqlik (multi-valued dependency) bo'lmasligi kerak                                                 | No multi-valued dependencies                                                            |
| `5NF`        | Jadval kichikroq jadvallarga ma'lumot yo'qotmasdan ajratib bo'lmasligi kerak                                         | Table cannot be losslessly decomposed into smaller tables                               |

```sql
-- ❌ 1NF buzilishi (bitta katakda bir nechta qiymat)
CREATE TABLE orders_bad (
    id       SERIAL PRIMARY KEY,
    products TEXT  -- 'laptop, mouse, keyboard'  -- atomik emas!
);

-- ✅ 1NF ga mos (har bir mahsulot alohida qator)
CREATE TABLE order_items (
    order_id   INT REFERENCES orders(id),
    product_id INT REFERENCES products(id)
);

-- ❌ 2NF buzilishi (composite key: order_id + product_id,
--     lekin product_name faqat product_id ga bog'liq — qisman bog'liqlik)
CREATE TABLE order_items_bad (
    order_id     INT,
    product_id   INT,
    product_name TEXT,  -- faqat product_id ga bog'liq
    quantity     INT,
    PRIMARY KEY (order_id, product_id)
);

-- ✅ 2NF ga mos (product_name alohida jadvalga chiqarildi)
CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE order_items (
    order_id   INT,
    product_id INT REFERENCES products(id),
    quantity   INT,
    PRIMARY KEY (order_id, product_id)
);

-- ❌ 3NF buzilishi (tranzitiv bog'liqlik: employee -> dept_id -> dept_name)
CREATE TABLE employees_bad (
    id        SERIAL PRIMARY KEY,
    name      TEXT,
    dept_id   INT,
    dept_name TEXT  -- dept_id orqali bilvosita aniqlanadi
);

-- ✅ 3NF ga mos
CREATE TABLE departments (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE employees (
    id      SERIAL PRIMARY KEY,
    name    TEXT,
    dept_id INT REFERENCES departments(id)
);
```

**Denormalizatsiya / Denormalization:** O'qish tezligini oshirish uchun ataylab normalizatsiyani buzish (masalan, hisoblangan qiymatni saqlash yoki jadvallarni birlashtirish). Analitika/reporting tizimlarida, katta trafikli read-heavy servislarda qo'llaniladi — yozish murakkabligi va ma'lumot nomuvofiqligi xavfi hisobiga tezlik olinadi. / Deliberately breaking normalization rules to speed up reads (e.g., storing computed values or merging tables). Used in analytics/reporting and read-heavy services — trades write complexity and consistency risk for speed.

---

## 📌 18. Tez-tez so'raladigan nazariy savollar / Frequently Asked Theory Questions

| Savol / Question                             | Qisqa javob / Short Answer                                                                                                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clustered vs Non-clustered index?            | Clustered — jadval qatorlarining fizik tartibini belgilaydi (jadvalda faqat bitta bo'ladi; SQL Server/MySQL InnoDB'da bor, PostgreSQL'da yo'q — u yerda `CLUSTER` buyrug'i jadvalni faqat bir marta tartiblaydi); Non-clustered — alohida tuzilma, ko'rsatgich orqali qatorga yo'naltiradi (bir nechta bo'lishi mumkin)       |
| View vs Materialized View?                   | View — har so'ralganda qayta hisoblanadi, real vaqt ma'lumoti; Materialized View — natija diskda saqlanadi, tezroq lekin eskirishi mumkin                                                               |
| Statement-level vs Row-level trigger?        | Statement-level — butun operatsiya uchun bir marta ishga tushadi; Row-level — har bir ta'sirlangan qator uchun alohida ishga tushadi                                                                    |

---

## 💡 Tezkor eslatma / Quick Reference

> SQL so'rovning bajarilish tartibi — pastdagi **Q2** da.

### PostgreSQL (FastAPI stack uchun) muhim farqlar

| SQL Standard     | PostgreSQL                                   |
| ---------------- | -------------------------------------------- |
| `TOP N`          | `LIMIT N`                                    |
| `GETDATE()`      | `NOW()` yoki `CURRENT_TIMESTAMP`             |
| `LEN()`          | `LENGTH()`                                   |
| `ISNULL()`       | `COALESCE()`                                 |
| `AUTO_INCREMENT` | `SERIAL` yoki `GENERATED ALWAYS AS IDENTITY` |

---

_Tayyorlagan / Prepared by: Alyorjon | Manba / Source: 100 SQL Commands PDF_

---

# 🗄️ SQL intervyu savollari / SQL Interview Questions

> **Har bir javob tartibi:** oddiy tilda → batafsilroq (misol bilan) → intervyuda qanday aytasiz → esda tuting. Misollar PostgreSQL sintaksisida, lekin tushunchalar barcha relyatsion bazalar uchun umumiy.

---

## Q1. SQL nima va uning qanday qismlari bor? / What is SQL and what are its sub-languages?

**Oddiy qilib aytganda:** SQL — ma'lumotlar bazasi bilan "gaplashish" tili. Siz bazaga nima kerakligini aytasiz ("30 yoshdan katta mijozlarni ber"), qanday topishni esa baza o'zi hal qiladi. Buyruqlar vazifasiga qarab guruhlarga bo'linadi: jadval **tuzish**, ma'lumot **yozish**, **o'qish**, **ruxsat berish** va **tranzaksiyani boshqarish**.

**Batafsilroq:**

| Guruh | Nima qiladi | Buyruqlar |
|---|---|---|
| DDL (Data Definition) | jadval va tuzilmani yaratadi/o'zgartiradi | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| DML (Data Manipulation) | qatorlarni o'zgartiradi | `INSERT`, `UPDATE`, `DELETE`, `MERGE` |
| DQL (Data Query) | ma'lumotni o'qiydi | `SELECT` |
| DCL (Data Control) | ruxsatlarni boshqaradi | `GRANT`, `REVOKE` |
| TCL (Transaction Control) | tranzaksiyani boshqaradi | `BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

```sql
CREATE TABLE employees (id bigint PRIMARY KEY, name text NOT NULL, salary numeric(12,2));  -- DDL
INSERT INTO employees VALUES (1, 'Ali', 5000);                                              -- DML
SELECT name FROM employees WHERE salary > 3000;                                             -- DQL
GRANT SELECT ON employees TO reporting;                                                     -- DCL
BEGIN; UPDATE employees SET salary = salary * 1.1 WHERE id = 1; COMMIT;                     -- TCL
```

**Intervyuda shunday ayting:** "SQL — deklarativ til: natijani tasvirlayman, bajarish rejasini esa planner tanlaydi. Buyruqlar DDL, DML, DQL, DCL va TCL guruhlariga bo'linadi. Amalda muhimi — DDL o'zgarishlarini migratsiyalar orqali, DCL'ni esa eng kam huquq tamoyili bilan boshqarish."

**Esda tuting:** PostgreSQL'da DDL ham tranzaksiyada ishlaydi — `CREATE TABLE` ni `ROLLBACK` qilish mumkin. Ko'p boshqa bazalarda (masalan, MySQL) bunday emas.

## Q2. SQL so'rov qaysi tartibda bajariladi? / In what order is a SQL query executed?

**Oddiy qilib aytganda:** biz so'rovni `SELECT` dan boshlab yozamiz, lekin baza uni **boshqa tartibda** bajaradi: avval jadvalni oladi (`FROM`), keraksiz qatorlarni tashlaydi (`WHERE`), guruhlaydi (`GROUP BY`), guruhlarni filtrlaydi (`HAVING`) va faqat shundan keyin kerakli ustunlarni tanlaydi (`SELECT`). Shu tartibni bilsangiz, ko'p xatolar tushunarli bo'ladi.

**Batafsilroq:**

```sql
-- Yozilish tartibi:   SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT
-- Mantiqiy tartib:    FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT

SELECT department, avg(salary) AS avg_salary
FROM employees
WHERE salary > 1000          -- ❌ WHERE avg_salary > 1000 ishlamaydi: alias hali yo'q
GROUP BY department
HAVING avg(salary) > 3000
ORDER BY avg_salary DESC;    -- ✅ ORDER BY SELECT'dan keyin — alias ishlaydi
```

**Intervyuda shunday ayting:** "Mantiqiy tartib: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT. Shuning uchun `WHERE` da `SELECT` alias'ini ishlatib bo'lmaydi, `ORDER BY` da esa bo'ladi. Bu mantiqiy tartib — planner jismoniy bajarishni o'zgartirishi mumkin, lekin natija shu tartibdagidek bo'ladi."

**Esda tuting:** window funksiyalar ham `SELECT` bosqichida hisoblanadi — ularni `WHERE` da ishlatib bo'lmaydi, buning uchun subquery yoki CTE kerak.

## Q3. WHERE va HAVING farqi nima? / What is the difference between WHERE and HAVING?

**Oddiy qilib aytganda:** `WHERE` — eshikdagi qo'riqchi: har bir qatorni **guruhlashdan oldin** tekshiradi. `HAVING` — guruhlar tuzilgandan **keyin** butun guruhni tekshiradi. "30 yoshdan kattalar" — `WHERE`; "o'rtacha maoshi 5000 dan yuqori bo'limlar" — `HAVING`.

**Batafsilroq:**

```sql
SELECT department_id, avg(salary) AS avg_salary, count(*) AS people
FROM employees
WHERE age > 25                    -- qatorlar: guruhlashdan oldin
GROUP BY department_id
HAVING avg(salary) > 5000         -- guruhlar: agregatdan keyin
   AND count(*) >= 3;
```

**Intervyuda shunday ayting:** "`WHERE` qatorlarni agregatdan oldin, `HAVING` esa guruhlarni agregatdan keyin filtrlaydi. Agregatsiz shartni `HAVING` ga emas, `WHERE` ga yozaman — shunda keraksiz qatorlar guruhlashga umuman kirmaydi va so'rov tezroq."

**Esda tuting:** `WHERE count(*) > 3` — xato: `WHERE` bosqichida guruhlar hali yo'q.

## Q4. JOIN turlari qanday farq qiladi? / How do the JOIN types differ?

**Oddiy qilib aytganda:** JOIN — ikki jadvalni umumiy ustun bo'yicha "tikish". **INNER** — faqat ikkala tomonda mos keladigan juftliklar. **LEFT** — chap jadvalning hamma qatori, o'ng tomonda mos bo'lmasa — `NULL`. **FULL** — ikkala tomonning hammasi. **CROSS** — har biri har biri bilan (barcha kombinatsiyalar). **SELF** — jadvalni o'zi bilan (masalan, xodim va uning rahbari).

**Batafsilroq:**

```sql
-- Buyurtmasi bor mijozlar
SELECT c.name, o.id FROM customers c INNER JOIN orders o ON o.customer_id = c.id;

-- Barcha mijozlar, buyurtmasi bo'lmasa ham (o.id = NULL)
SELECT c.name, o.id FROM customers c LEFT JOIN orders o ON o.customer_id = c.id;

-- Hech buyurtma bermagan mijozlar (anti-join)
SELECT c.name FROM customers c
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);

-- Xodim va uning rahbari (self join)
SELECT e.name AS employee, m.name AS manager
FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;
```

**Intervyuda shunday ayting:** "INNER — faqat moslar, LEFT — chapdagilarning hammasi, FULL — ikkala tomonning hammasi, CROSS — dekart ko'paytma. 'Ikkinchi jadvalda yo'qlar' uchun `NOT EXISTS` ishlataman — `NOT IN` ichida `NULL` bo'lsa, natija bo'sh chiqadi."

**Esda tuting:** `LEFT JOIN` dan keyin o'ng jadval ustunini `WHERE` da filtrlash (`WHERE o.status = 'paid'`) uni jimgina `INNER JOIN` ga aylantiradi. Bunday shartni `ON` ichiga yozing.

## Q5. NULL nima va u bilan solishtirish nega "ishlamaydi"? / What is NULL and why doesn't comparing to it "work"?

**Oddiy qilib aytganda:** `NULL` — "noma'lum", nol ham emas, bo'sh satr ham emas. Noma'lum narsa bilan solishtirsangiz, natija ham noma'lum: `NULL = NULL` — `true` emas, `NULL`. `WHERE` faqat `true` bo'lgan qatorlarni qaytaradi, shuning uchun `WHERE phone = NULL` hech narsa topmaydi.

**Batafsilroq:**

```sql
SELECT * FROM users WHERE phone = NULL;              -- ❌ doim 0 qator
SELECT * FROM users WHERE phone IS NULL;             -- ✅
SELECT * FROM users WHERE phone IS DISTINCT FROM $1; -- ✅ NULL'ni oddiy qiymat kabi solishtiradi

SELECT count(*), count(phone) FROM users;            -- count(phone) NULL'larni sanamaydi
SELECT avg(bonus) FROM employees;                    -- NULL'lar o'rtachaga kirmaydi (0 emas!)
```

**Intervyuda shunday ayting:** "SQL uch qiymatli mantiqda ishlaydi: true, false, unknown. `NULL` bilan har qanday solishtirish unknown beradi, shuning uchun `IS NULL` yoki `IS DISTINCT FROM` ishlataman. Agregatlar `NULL` ni o'tkazib yuboradi — bu o'rtacha qiymatni kutilmaganda o'zgartirishi mumkin."

**Esda tuting:** `NOT IN (1, 2, NULL)` hech qachon `true` bo'lmaydi — ro'yxatda `NULL` bo'lsa, natija bo'sh. Bu klassik intervyu tuzog'i.

## Q6. COALESCE va NULLIF nima uchun kerak? / What are COALESCE and NULLIF for?

**Oddiy qilib aytganda:** `COALESCE(a, b, c)` — "birinchi bo'sh bo'lmaganini ber": telefon yo'q bo'lsa — email, u ham yo'q bo'lsa — "ma'lumot yo'q". `NULLIF(a, b)` — teskarisi: "a va b teng bo'lsa, NULL qaytar". Uning eng mashhur ishlatilishi — nolga bo'lishdan himoya.

**Batafsilroq:**

```sql
SELECT name, COALESCE(phone, email, 'ma''lumot yo''q') AS contact FROM users;

-- Nolga bo'lish xatosi o'rniga NULL
SELECT revenue / NULLIF(visits, 0) AS revenue_per_visit FROM daily_stats;
```

**Intervyuda shunday ayting:** "`COALESCE` birinchi NULL bo'lmagan argumentni qaytaradi — standart qiymat uchun. `NULLIF` ikki qiymat teng bo'lsa NULL beradi — ko'pincha `x / NULLIF(y, 0)` bilan nolga bo'lishdan himoyalanish uchun."

**Esda tuting:** `COALESCE` ichidagi barcha argumentlar bir xil (yoki mos) turda bo'lishi kerak — `COALESCE(age, 'noma''lum')` xato beradi.

## Q7. UNION va UNION ALL farqi nima? / What is the difference between UNION and UNION ALL?

**Oddiy qilib aytganda:** ikkalasi ham ikki so'rov natijasini ustma-ust qo'yadi. `UNION` takrorlarni **olib tashlaydi** — buning uchun hamma qatorlarni solishtiradi (sekin). `UNION ALL` hammasini **boricha** qo'shadi (tez).

**Batafsilroq:**

```sql
SELECT email FROM customers
UNION ALL                       -- takrorlar qoladi, tez
SELECT email FROM newsletter_subscribers;

SELECT email FROM customers
UNION                           -- takrorlar olib tashlanadi (saralash/hash kerak)
SELECT email FROM newsletter_subscribers;
```

**Intervyuda shunday ayting:** "Takror bo'lmasligi kafolatlangan yoki takror kerak bo'lsa — `UNION ALL`, u qo'shimcha saralash qilmaydi. `UNION` ni faqat haqiqatan dublikatlarni olib tashlash kerak bo'lganda ishlataman. Ikkala so'rovda ustunlar soni va turlari mos bo'lishi shart."

**Esda tuting:** `INTERSECT` — ikkalasida ham borlar, `EXCEPT` — birinchida bor, ikkinchida yo'qlar.

## Q8. Subquery va korrelyatsiyalangan subquery farqi nima? / What is the difference between a subquery and a correlated subquery?

**Oddiy qilib aytganda:** oddiy subquery — mustaqil savol: "o'rtacha maosh qancha?" — bir marta hisoblanadi. Korrelyatsiyalangan subquery tashqi so'rovning **har bir qatoriga** bog'liq: "shu xodimning **o'z bo'limidagi** o'rtacha maosh qancha?" — mantiqan har qator uchun qayta so'raladi.

**Batafsilroq:**

```sql
-- Oddiy: bir marta
SELECT name FROM employees
WHERE salary > (SELECT avg(salary) FROM employees);

-- Korrelyatsiyalangan: tashqi qatorning e.department_id siga bog'liq
SELECT name FROM employees e
WHERE salary > (SELECT avg(salary) FROM employees x WHERE x.department_id = e.department_id);

-- Ko'pincha tezroq muqobil: window funksiya
SELECT name FROM (
  SELECT name, salary, avg(salary) OVER (PARTITION BY department_id) AS dept_avg FROM employees
) t WHERE salary > dept_avg;
```

**Intervyuda shunday ayting:** "Korrelyatsiyalangan subquery tashqi qatorga bog'liq, shuning uchun sekin bo'lishi mumkin. Planner ko'pincha uni JOIN'ga aylantiradi, lekin bunga ishonmayman — `EXPLAIN` bilan tekshiraman va kerak bo'lsa window funksiya yoki `JOIN` ga qayta yozaman. `EXISTS` bilan korrelyatsiya esa ko'pincha eng samarali."

**Esda tuting:** skalyar subquery bittadan ko'p qator qaytarsa — xato. `IN`/`EXISTS` esa ko'p qator bilan ishlaydi.

## Q9. CTE (WITH) va rekursiv CTE nima? / What are CTEs and recursive CTEs?

**Oddiy qilib aytganda:** CTE — so'rov ichidagi vaqtinchalik, nomlangan natija: "avval mana buni hisobla, uni `top_customers` deb atayman, keyin undan foydalanaman". Murakkab so'rov o'qiladigan bo'laklarga bo'linadi. Rekursiv CTE o'zini-o'zi chaqiradi — daraxtsimon ma'lumot uchun: kategoriyalar, tashkilot tuzilmasi.

**Batafsilroq:**

```sql
-- Oddiy CTE: o'qilishi oson
WITH monthly AS (
  SELECT customer_id, date_trunc('month', created_at) AS month, sum(total) AS spent
  FROM orders GROUP BY 1, 2
)
SELECT * FROM monthly WHERE spent > 1000;

-- Rekursiv: rahbar va uning barcha bo'ysunuvchilari
WITH RECURSIVE team AS (
  SELECT id, name, manager_id, 1 AS depth FROM employees WHERE id = 42   -- boshlanish
  UNION ALL
  SELECT e.id, e.name, e.manager_id, t.depth + 1
  FROM employees e JOIN team t ON e.manager_id = t.id                     -- keyingi daraja
)
SELECT * FROM team;
```

**Intervyuda shunday ayting:** "CTE so'rovni o'qiladigan qismlarga bo'ladi. Rekursiv CTE — boshlang'ich qism + `UNION ALL` + o'ziga murojaat qiluvchi qism. Siklik ma'lumotda cheksiz aylanmaslik uchun chuqurlik chegarasi yoki PostgreSQL 14+ dagi `CYCLE` bandini ishlataman."

**Esda tuting:** PostgreSQL 12 dan boshlab bir marta ishlatilgan CTE asosiy so'rovga "eritib" yuboriladi va optimallashtiriladi; natijani majburan alohida hisoblash kerak bo'lsa — `WITH x AS MATERIALIZED (...)`.

## Q10. Window funksiyalar nima va GROUP BY'dan nimasi bilan farq qiladi? / What are window functions and how do they differ from GROUP BY?

**Oddiy qilib aytganda:** `GROUP BY` qatorlarni **yig'ib**, har guruhdan bitta qator qoldiradi. Window funksiya esa har qatorni **joyida qoldiradi** va yoniga hisob qo'shadi: "shu xodimning maoshi va uning bo'limidagi o'rtacha maosh" — ikkalasi bir qatorda.

**Batafsilroq:**

```sql
SELECT
  name, department, salary,
  avg(salary)  OVER (PARTITION BY department)                     AS dept_avg,
  rank()       OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept,
  sum(salary)  OVER (ORDER BY hired_at)                           AS running_total,
  lag(salary)  OVER (PARTITION BY department ORDER BY hired_at)   AS prev_salary
FROM employees;

-- Har bo'limdagi eng yuqori maoshli xodim (top-1 per group)
SELECT * FROM (
  SELECT *, row_number() OVER (PARTITION BY department ORDER BY salary DESC) AS rn FROM employees
) t WHERE rn = 1;
```

**Intervyuda shunday ayting:** "Window funksiya qatorlarni yig'maydi — `PARTITION BY` guruhni, `ORDER BY` tartibni, frame esa qaysi qo'shni qatorlar hisobga olinishini belgilaydi. Tipik masalalar: reyting, yig'ma summa, oldingi qiymat bilan solishtirish, har guruhdan top-N."

**Esda tuting:** `ROW_NUMBER` — doim 1, 2, 3; `RANK` — tenglarda sakraydi (1, 1, 3); `DENSE_RANK` — sakramaydi (1, 1, 2). Batafsil — yuqoridagi 11-bo'lim.

## Q11. DELETE, TRUNCATE va DROP farqi nima? / What is the difference between DELETE, TRUNCATE and DROP?

**Oddiy qilib aytganda:** `DELETE` — daftardan kerakli sahifalarni birma-bir yirtib olish (shart bilan, sekinroq). `TRUNCATE` — daftarning barcha sahifalarini birdan tozalash, lekin muqova qoladi (juda tez). `DROP` — daftarni butunlay axlatga tashlash (jadval ham, tuzilma ham yo'qoladi).

**Batafsilroq:**

| | `DELETE` | `TRUNCATE` | `DROP` |
|---|---|---|---|
| Nima o'chiriladi | shartga mos qatorlar | barcha qatorlar | jadvalning o'zi |
| `WHERE` | ✅ | ❌ | ❌ |
| Tezlik | qatorma-qator, sekin | juda tez | juda tez |
| Row trigger'lar | ishga tushadi | ishga tushmaydi | — |
| Qulf | qatorlarni | butun jadvalni (`ACCESS EXCLUSIVE`) | butun jadvalni |

```sql
DELETE FROM sessions WHERE expires_at < now();
TRUNCATE TABLE staging_import RESTART IDENTITY;   -- hisoblagich ham noldan
DROP TABLE IF EXISTS old_reports;
```

**Intervyuda shunday ayting:** "`DELETE` — tanlab o'chirish, trigger'lar ishlaydi. `TRUNCATE` — butun jadvalni tez tozalash, lekin qat'iy qulf oladi. `DROP` — jadvalni butunlay yo'q qilish. PostgreSQL'da `TRUNCATE` va `DROP` ham tranzaksiya ichida `ROLLBACK` qilinadi — bu ko'p boshqa bazalarda emas."

**Esda tuting:** `DELETE` joyni darhol bo'shatmaydi — o'chirilgan qatorlarni keyin `VACUUM` tozalaydi.

## Q12. CHAR, VARCHAR va TEXT farqi nima? / What is the difference between CHAR, VARCHAR and TEXT?

**Oddiy qilib aytganda:** `CHAR(10)` — doim 10 belgi, qisqa matn bo'sh joy bilan to'ldiriladi. `VARCHAR(10)` — 10 tagacha, qancha kerak bo'lsa shuncha joy. `TEXT` — uzunlik chegarasiz. PostgreSQL'da ular deyarli bir xil tezlikda ishlaydi, shuning uchun ko'pincha `TEXT` + kerak bo'lsa `CHECK` ishlatiladi.

**Batafsilroq:**

```sql
CREATE TABLE users (
  country_code char(2),                                     -- doim aynan 2 belgi: 'UZ'
  username     varchar(30),                                 -- uzunlik chegarasi bor
  bio          text,                                        -- chegarasiz
  email        text CHECK (char_length(email) <= 254)       -- chegara biznes qoidasi sifatida
);
```

**Intervyuda shunday ayting:** "PostgreSQL'da `text` va `varchar` bir xil saqlanadi va tezligi bir xil; `char(n)` esa bo'sh joy bilan to'ldirib, chalkashlik keltiradi. Men `text` + `CHECK` ni afzal ko'raman — chegarani o'zgartirish oson. Boshqa bazalarda (SQL Server, MySQL) farqlar kattaroq bo'lishi mumkin."

**Esda tuting:** `varchar(n)` dagi `n` baytlar emas, **belgilar** soni — "o'zbek" so'zi UTF-8'da baytlari ko'proq, lekin 6 belgi.

## Q13. Normalizatsiya nima (1NF, 2NF, 3NF)? / What is normalization (1NF, 2NF, 3NF)?

**Oddiy qilib aytganda:** normalizatsiya — bir xil ma'lumotni ko'p joyda takrorlamaslik. Mijoz manzili har buyurtmada qayta yozilsa, manzil o'zgarganda hammasini yangilash kerak va biror joyi unutiladi. Yechim: mijoz — alohida jadvalda, buyurtma esa unga faqat ID orqali ishora qiladi.

**Batafsilroq:**
- **1NF** — har katakda bitta qiymat: "tel1, tel2" bitta katakda emas, alohida qatorlarda.
- **2NF** — 1NF + murakkab kalitning faqat bir qismiga bog'liq ustun yo'q (`order_items(order_id, product_id)` da `product_name` bo'lmasligi kerak — u faqat `product_id` ga bog'liq).
- **3NF** — 2NF + kalit bo'lmagan ustun boshqa kalit bo'lmagan ustunga bog'liq emas (`employees` da `department_name` bo'lmasin — u `department_id` orqali olinadi).

```sql
-- ❌ takrorlanish: mijoz ma'lumotlari har buyurtmada
orders(id, customer_name, customer_phone, total)

-- ✅ 3NF
customers(id, name, phone)
orders(id, customer_id REFERENCES customers, total)
```

**Intervyuda shunday ayting:** "OLTP tizimlarda odatda 3NF gacha normallashtiraman — yozishda anomaliya yo'q, har fakt bitta joyda. O'qish juda ko'p bo'lgan joylarda (hisobot, analitika) ongli ravishda denormalizatsiya qilaman: materialized view yoki keshlangan ustun — va uni qanday yangilashni aniq belgilayman."

**Esda tuting:** buyurtma paytidagi narxni `order_items` da saqlash denormalizatsiya emas — bu **tarixiy fakt**: mahsulot narxi keyin o'zgarsa ham, buyurtma narxi o'zgarmasligi kerak.

## Q14. ACID nima? / What is ACID?

**Oddiy qilib aytganda:** ACID — bazaning to'rtta va'dasi. **A**tomicity — "yo hammasi, yo hech narsa": pul o'tkazmasida yechish va qo'shish birga bo'ladi. **C**onsistency — qoidalar (constraint'lar) doim bajariladi. **I**solation — bir vaqtdagi tranzaksiyalar bir-biriga xalaqit bermaydi. **D**urability — `COMMIT` dan keyin ma'lumot elektr o'chsa ham yo'qolmaydi.

**Batafsilroq:**

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;                -- ikkalasi birga saqlanadi; xato bo'lsa ROLLBACK — hech biri
```

**Intervyuda shunday ayting:** "Atomicity — tranzaksiya bilan, consistency — constraint'lar bilan (`CHECK`, `FOREIGN KEY`, `UNIQUE`), isolation — izolyatsiya darajasi bilan, durability — WAL va `fsync` bilan ta'minlanadi. Qaysi izolyatsiya darajasi kerakligini men oldini olishim kerak bo'lgan anomaliyaga qarab tanlayman."

**Esda tuting:** PostgreSQL'da standart izolyatsiya — `READ COMMITTED`: bitta tranzaksiya ichidagi ikki `SELECT` turli natija ko'rishi mumkin. Manba: [Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html), [Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html).

## Q15. Indeks nima va u qachon yordam bermaydi? / What is an index and when doesn't it help?

**Oddiy qilib aytganda:** indeks — kitob oxiridagi alifbo ko'rsatkichi: kerakli so'zni butun kitobni o'qimasdan topasiz. Lekin har yangi sahifa qo'shilganda ko'rsatkichni ham yangilash kerak — shuning uchun indeks o'qishni tezlashtiradi, yozishni esa biroz sekinlashtiradi.

**Batafsilroq:**

```sql
CREATE INDEX employees_dept_salary_idx ON employees (department_id, salary);

-- ✅ indeks ishlaydi: chap ustundan boshlangan shart
SELECT * FROM employees WHERE department_id = 5 AND salary > 3000;

-- ❌ ko'pincha ishlamaydi:
SELECT * FROM employees WHERE salary > 3000;             -- chap ustun (department_id) yo'q*
SELECT * FROM employees WHERE lower(name) = 'ali';       -- ustun funksiyaga o'ralgan
SELECT * FROM employees WHERE name LIKE '%ali%';         -- boshida % bor
SELECT * FROM employees WHERE status = 'active';         -- 95% qatorlar mos — skan arzonroq
```

**Intervyuda shunday ayting:** "Indeks tanlanishi uchun so'rov uning tuzilishiga mos bo'lishi kerak: ko'p ustunli indeksda chap ustundan boshlanadigan shart, ustun funksiyaga o'ralmagan, filtr yetarlicha tanlovchan. Qaror doim `EXPLAIN ANALYZE` bilan tasdiqlanadi."

**Esda tuting:** *PostgreSQL 18 dagi skip scan ba'zan chap ustunsiz ham ko'p ustunli B-tree indeksdan foydalana oladi — agar chap ustunda turli qiymatlar kam bo'lsa. Indeks turlari (GIN, GiST, BRIN) — `sql/postgresql_interviews.md` da.

## Q16. SQL injection nima va undan qanday himoyalanasiz? / What is SQL injection and how do you prevent it?

**Oddiy qilib aytganda:** foydalanuvchi kiritgan matn to'g'ridan-to'g'ri SQL so'rovga qo'shilsa, hujumchi matn o'rniga **buyruq** yozishi mumkin: login maydoniga `' OR '1'='1` yozib, parolsiz kirish. Yechim: foydalanuvchi ma'lumotini hech qachon so'rov matniga yopishtirmaslik — **parametr** sifatida alohida yuborish.

**Batafsilroq:**

```python
# ❌ xavfli: matn so'rovga yopishtirilgan
cursor.execute(f"SELECT * FROM users WHERE email = '{email}'")

# ✅ parametrlangan so'rov: baza qiymatni doim ma'lumot deb biladi, buyruq deb emas
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
```

```sql
-- Jadval/ustun nomi o'zgaruvchan bo'lsa — faqat ruxsat etilgan ro'yxatdan
-- (parametr bilan jadval nomini berib bo'lmaydi)
```

**Intervyuda shunday ayting:** "Asosiy himoya — parametrlangan so'rovlar yoki ORM; ular qiymatni so'rov tuzilmasidan ajratadi. Ustun nomi yoki saralash yo'nalishi kabi qismlar foydalanuvchidan kelsa — faqat allowlist'dan. Qo'shimcha qatlamlar: ilova rolida eng kam huquq, xatolarda SQL matnini ko'rsatmaslik."

**Esda tuting:** belgilarni "qochirish" (escaping) bilan himoyalanish — mo'rt; parametrlar ishonchli yo'l. Manba: [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html).

## Q17. Tranzaksiya izolyatsiya darajalari qanday anomaliyalarning oldini oladi? / Which anomalies do isolation levels prevent?

**Oddiy qilib aytganda:** bir vaqtda ishlayotgan tranzaksiyalar bir-birining ishini qanchalik "ko'rishi" mumkin? Izolyatsiya darajasi shuni belgilaydi. Qanchalik qat'iy bo'lsa — shunchalik kam kutilmagan holat, lekin to'qnashuvlar va qayta urinishlar ko'proq.

**Batafsilroq:**

| Anomaliya | Nima bo'ladi |
|---|---|
| Dirty read | boshqaning hali commit qilinmagan o'zgarishini ko'rish |
| Non-repeatable read | bir qatorni ikki marta o'qisangiz — turli qiymat |
| Phantom read | bir shart bilan ikki marta so'rasangiz — yangi qatorlar paydo bo'ladi |
| Serialization anomaly | natija tranzaksiyalarni ketma-ket bajargandagidan farq qiladi |

```sql
-- PostgreSQL: READ COMMITTED (standart) → REPEATABLE READ → SERIALIZABLE
BEGIN ISOLATION LEVEL SERIALIZABLE;
-- ...
COMMIT;   -- 40001 xatosi kelsa — butun tranzaksiyani qayta urinish
```

**Intervyuda shunday ayting:** "PostgreSQL'da dirty read umuman yo'q; `READ COMMITTED` har buyruq uchun yangi surat oladi, `REPEATABLE READ` — butun tranzaksiya uchun bitta surat, `SERIALIZABLE` esa ketma-ket bajarilgandek natija kafolatlaydi. Yuqori darajada ilova serialization xatolarida qayta urinishi shart."

**Esda tuting:** PostgreSQL'da `REPEATABLE READ` phantom read'ning ham oldini oladi — standart buni talab qilmasa ham. Manba: [Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html).

## Q18. UPSERT nima va nega "avval tekshir, keyin qo'sh" yetarli emas? / What is an UPSERT and why isn't "check then insert" enough?

**Oddiy qilib aytganda:** UPSERT — "bor bo'lsa yangila, yo'q bo'lsa qo'sh" — **bitta** buyruqda. Agar buni ikki qadamda (avval `SELECT`, keyin `INSERT`) qilsangiz, ikki so'rov bir vaqtda "yo'q" deb ko'rib, ikkalasi ham qo'shishga urinadi — dublikat yoki xato.

**Batafsilroq:**

```sql
-- Mahsulot zaxirasini yangilash yoki yangi yozuv yaratish
INSERT INTO inventory (product_id, quantity)
VALUES ($1, $2)
ON CONFLICT (product_id)                      -- UNIQUE yoki PRIMARY KEY kerak
DO UPDATE SET quantity = inventory.quantity + EXCLUDED.quantity
RETURNING product_id, quantity;
```

**Intervyuda shunday ayting:** "UPSERT tekshirish va yozishni atomik qiladi — poyga holati yo'q. U unique constraint'ga tayanadi. `EXCLUDED` — qo'shilmoqchi bo'lgan qator. Bu ko'p takrorlanadigan importlarni idempotent qilishning eng oddiy yo'li."

**Esda tuting:** standart SQL'da buning uchun `MERGE` bor (PostgreSQL 15+), lekin parallel yuklamada `INSERT ... ON CONFLICT` ishonchliroq — u unique indeks bilan to'qnashuvni atomik hal qiladi.
