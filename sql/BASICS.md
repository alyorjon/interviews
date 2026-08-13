# 🗄️ 100 SQL Commands — Bilingual Reference / Ikki tilli qo'llanma

> **Manba / Source:** 100 SQL Commands PDF  
> **Tillar / Languages:** O'zbek 🇺🇿 | English 🇬🇧  
> **Maqsad / Goal:** SQL buyruqlarini tez esga olish uchun / Quick SQL reference

---

## � Modern SQL interview topics

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

## �📌 1. DML — Ma'lumot boshqaruvi / Data Manipulation

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
| `DELETE` vs `TRUNCATE` vs `DROP`?            | DELETE — WHERE bilan qator o'chiradi, rollback qilinadi, trigger ishga tushadi; TRUNCATE — barcha qatorni tez o'chiradi, odatda rollback qilinmaydi, tuzilma qoladi; DROP — jadvalni butunlay o'chiradi |
| `CHAR` vs `VARCHAR`?                         | CHAR — belgilangan uzunlik, bo'sh joy bilan to'ldiriladi; VARCHAR — o'zgaruvchan uzunlik, faqat kerakli joy sarflanadi                                                                                  |
| Clustered vs Non-clustered index?            | Clustered — jadval qatorlarining fizik tartibini belgilaydi (jadvalda faqat bitta bo'ladi); Non-clustered — alohida tuzilma, ko'rsatgich orqali qatorga yo'naltiradi (bir nechta bo'lishi mumkin)       |
| Correlated vs Non-correlated subquery?       | Correlated — tashqi so'rovning har bir qatoriga bog'liq, har safar qayta bajariladi; Non-correlated — mustaqil, bir marta bajariladi                                                                    |
| View vs Materialized View?                   | View — har so'ralganda qayta hisoblanadi, real vaqt ma'lumoti; Materialized View — natija diskda saqlanadi, tezroq lekin eskirishi mumkin                                                               |
| Statement-level vs Row-level trigger?        | Statement-level — butun operatsiya uchun bir marta ishga tushadi; Row-level — har bir ta'sirlangan qator uchun alohida ishga tushadi                                                                    |
| Idempotent SQL nima?                         | Bir necha marta bajarilsa ham natija bir xil bo'ladigan so'rov (masalan, UPSERT), oddiy INSERT idempotent emas                                                                                          |
| SQL Injection dan qanday himoyalanish kerak? | Parametrlangan so'rovlar (prepared statements) ishlatish, foydalanuvchi kiritgan matnni to'g'ridan-to'g'ri so'rovga qo'shmaslik, ORM ishlatish                                                          |

---

## 💡 Tezkor eslatma / Quick Reference

### SQL buyruqlari tartibi / SQL Execution Order

```sql
-- Yozilish tartibi / Writing order:
SELECT → FROM → JOIN → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT

-- Bajarilish tartibi / Execution order:
FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

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

# 🗄️ 100 SQL Interview Questions & Answers (Savol va Javoblar)

---

## Q1. What is SQL and what are its main sub-languages (DDL, DML, DCL, TCL, DQL)? | SQL nima va uning asosiy sub-tillari qaysilar?

**EN:** SQL (Structured Query Language) is the standard language for relational databases. It comprises DDL (Data Definition), DML (Data Manipulation), DCL (Data Control), TCL (Transaction Control), and DQL (Data Query).

**UZB:** SQL — relyatsion ma'lumotlar bazalarini boshqarish uchun standart til. U DDL, DML, DCL, TCL va DQL kabi bo'limlardan iborat.

```sql
-- DDL: CREATE, ALTER, DROP
CREATE TABLE employees (id INT PRIMARY KEY, name VARCHAR(50));

-- DML: INSERT, UPDATE, DELETE
INSERT INTO employees VALUES (1, 'Ali');

-- DQL: SELECT
SELECT * FROM employees;

-- TCL: COMMIT, ROLLBACK
COMMIT;
```

---

## Q2. What is the difference between WHERE and HAVING clauses? | WHERE va HAVING o'rtasidagi farq nima?

**EN:** `WHERE` filters rows BEFORE aggregation. `HAVING` filters grouped groups AFTER `GROUP BY` aggregation.

**UZB:** `WHERE` agregatsiyadan OLDIN satrlarni saralaydi. `HAVING` esa `GROUP BY` qilgandan KEYIN guruhlangan natijalarni saralaydi.

```sql
SELECT department_id, AVG(salary) as avg_sal
FROM employees
WHERE age > 25              -- Satrlarni filtrlash
GROUP BY department_id
HAVING AVG(salary) > 5000;  -- Guruhlarni filtrlash
```

---

## Q3. What are SQL Window Functions (OVER, PARTITION BY)? | SQL Window funksiyalari nima?

**EN:** Window functions perform calculations across a set of table rows related to the current row without collapsing rows into a single group like `GROUP BY`.

**UZB:** Window funksiyalari joriy satrga bog'liq satrlar to'plami bo'yicha hisoblashlarni amalga oshiradi, lekin `GROUP BY` kabi satrlarni bitta guruhga yig'ib qo'ymaydi.

```sql
SELECT
    name, department, salary,
    AVG(salary) OVER(PARTITION BY department) as dept_avg,
    RANK() OVER(PARTITION BY department ORDER BY salary DESC) as rank_in_dept
FROM employees;
```

---

## Q4. What is a Common Table Expression (CTE) and Recursive CTE? | CTE va Rekursiv CTE nima?

**EN:** A CTE (`WITH` clause) defines a temporary result set accessible within a single query. Recursive CTEs are used to query hierarchical data (org charts, categories).

**UZB:** CTE — bitta so'rov ichida ishlatiladigan vaqtinchalik natija to'plami. Rekursiv CTE daraxtsimon iyerarxik ma'lumotlarni qidirishda ishlatiladi.

```sql
-- Recursive CTE for org chart
WITH RECURSIVE Subordinates AS (
    SELECT id, name, manager_id FROM employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.id, e.name, e.manager_id
    FROM employees e
    INNER JOIN Subordinates s ON e.manager_id = s.id
)
SELECT * FROM Subordinates;
```

---

## Q5. What is the difference between UNION and UNION ALL? | UNION va UNION ALL farqi nima?

**EN:** `UNION` combines result sets and removes duplicate rows (requires sorting). `UNION ALL` includes all duplicates and is much faster.

**UZB:** `UNION` natijalarni birlashtiradi va takroriy satrlarni olib tashlaydi. `UNION ALL` takroriylarni ham saqlaydi va ancha tez ishlaydi.

---

## Q6. Explain Indexing (B-Tree, Hash, GIN, GiST) and Query Optimization | Indekslar va So'rovlarni Optimallashtirish

**EN:** Indexes speed up `SELECT` queries by creating balanced search trees, but slow down `INSERT`/`UPDATE` writes.

**UZB:** Indekslar `SELECT` so'rovlarini keskin tezlashtiradi, lekin `INSERT`/`UPDATE` yozish tezligini biroz kamaytiradi.

```sql
CREATE INDEX idx_emp_dept_sal ON employees (department_id, salary);
EXPLAIN ANALYZE SELECT * FROM employees WHERE department_id = 5 AND salary > 3000;
```

---

## Q7. What are Database Normalization Forms (1NF, 2NF, 3NF, BCNF)? | Ma'lumotlar bazasi Normalizatsiyasi

**EN:** Normalization eliminates data redundancy. 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency).

**UZB:** Normalizatsiya ma'lumotlar takrorlanishini bartaraf etadi. 1NF (atomik qiymatlar), 2NF (qisman bog'liqlik yo'qligi), 3NF (tranzit bog'liqlik yo'qligi).

---

## Q8. What is ACID compliance in SQL Databases? | SQL ma'lumotlar bazasida ACID nima?

---

## Q9. What are SQL Joins (INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF)? | SQL Join turlari

```sql
-- Self Join Example
SELECT e.name as Employee, m.name as Manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

---

## Q10. What is COALESCE and NULLIF in SQL? | COALESCE va NULLIF funksiyalari

**EN:** `COALESCE(a, b, c)` returns the first non-null argument. `NULLIF(a, b)` returns NULL if `a == b`.

**UZB:** `COALESCE` ro'yxatdagi birinchi NULL bo'lmagan qiymatni qaytaradi. `NULLIF` ikkala qiymat teng bo'lsa NULL qaytaradi.

```sql
SELECT name, COALESCE(phone, email, 'Mavjud emas') as contact FROM users;
```

---

## Q11-Q100. Advanced SQL Concepts, Transaction Isolation Levels, JSON Queries, Deadlocks, Query Execution Plans, Partitioning, Sharding & Stored Procedures.

_Prepared by | Tayyorlagan: Alyorjon_  
_Sources | Manbalar: SQL Reference, W3Schools, LeetCode SQL, PostgreSQL Docs_
