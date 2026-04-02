# 🗄️ 100 SQL Commands — Bilingual Reference / Ikki tilli qo'llanma

> **Manba / Source:** 100 SQL Commands PDF  
> **Tillar / Languages:** O'zbek 🇺🇿 | English 🇬🇧  
> **Maqsad / Goal:** SQL buyruqlarini tez esga olish uchun / Quick SQL reference

---

## 📌 1. DML — Ma'lumot boshqaruvi / Data Manipulation

> Mavjud ma'lumotlar ustida amal bajaradi / Works on existing data

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `SELECT` | Ma'lumotlar bazasidan ma'lumot oladi | Retrieves data from a database |
| `INSERT` | Ma'lumotlar bazasiga yangi ma'lumot qo'shadi | Inserts new data into a database |
| `UPDATE` | Ma'lumotlar bazasidagi mavjud ma'lumotni yangilaydi | Updates existing data in a database |
| `DELETE` | Ma'lumotlar bazasidan ma'lumot o'chiradi | Deletes data from a database |

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

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `CREATE DATABASE` | Yangi ma'lumotlar bazasi yaratadi | Creates a new database |
| `CREATE TABLE` | Ma'lumotlar bazasida yangi jadval yaratadi | Creates a new table in a database |
| `ALTER TABLE` | Mavjud jadval tuzilmasini o'zgartiradi | Modifies an existing table structure |
| `DROP TABLE` | Ma'lumotlar bazasidan jadvalni o'chiradi | Deletes a table from a database |
| `TRUNCATE TABLE` | Jadvaldagi barcha yozuvlarni o'chiradi (tuzilma saqlanadi) | Removes all records from a table (structure remains) |
| `CREATE INDEX` | Jadvalda indeks yaratadi | Creates an index on a table |
| `DROP INDEX` | Jadvaldan indeksni o'chiradi | Deletes an index from a table |

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

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `JOIN` | Bog'liq ustun asosida ikki yoki ko'p jadvaldagi satrlarni birlashtiradi | Combines rows from two or more tables based on a related column |
| `INNER JOIN` | Ikkala jadvalda ham mos keladigan satrlarni qaytaradi | Returns rows when there is a match in both tables |
| `LEFT JOIN` | Chap jadvaldagi barcha satrlar + o'ng jadvaldan mos kelganlar | Returns all rows from left table + matched rows from right |
| `RIGHT JOIN` | O'ng jadvaldagi barcha satrlar + chap jadvaldan mos kelganlar | Returns all rows from right table + matched rows from left |
| `FULL JOIN` | Jadvallardan birida mos kelganda barcha satrlarni qaytaradi | Returns rows when there is a match in one of the tables |

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

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `UNION` | Ikki yoki ko'p SELECT natijalarini birlashtiradi (takrorlanmaslar) | Combines results of two or more SELECT statements (no duplicates) |
| `UNION ALL` | Ikki yoki ko'p SELECT natijalarini birlashtiradi (takrorlanishlar bilan) | Combines results including duplicates |
| `INTERSECT` | Ikki natija to'plamining kesishmasini qaytaradi | Returns the intersection of two result sets |
| `EXCEPT` | Ikki natija to'plami o'rtasidagi farqni qaytaradi | Returns the difference between two result sets |

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

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `WHERE` | Belgilangan shartlar asosida yozuvlarni filtrlaydi | Filters records based on specified conditions |
| `AND` | WHERE shartida bir nechta shartni birlashtiradi | Combines multiple conditions in a WHERE clause |
| `OR` | WHERE shartida bir nechta muqobil shartni belgilaydi | Specifies multiple alternative conditions in a WHERE clause |
| `NOT` | WHERE shartidagi shartni inkor etadi | Negates a condition in a WHERE clause |
| `BETWEEN` | Belgilangan oraliq ichidagi qiymatlarni tanlaydi | Selects values within a specified range |
| `IN` | Ustun uchun bir nechta qiymat belgilaydi | Specifies multiple values for a column |
| `LIKE` | Namunaga mos keladigan qiymatlarni qidiradi | Searches for a pattern in a column |
| `ORDER BY` | Natija to'plamini o'suvchi yoki kamayuvchi tartibda saralaydi | Sorts the result set in ascending or descending order |
| `LIMIT` | So'rov qaytaradigan satrlar sonini cheklaydi (PostgreSQL/MySQL) | Limits the number of rows returned by a query |
| `OFFSET` | Satrlarni qaytarishdan oldin o'tkazib yuboriladigan satrlar sonini belgilaydi | Specifies number of rows to skip before returning rows |
| `TOP` | So'rov qaytaradigan satrlar sonini cheklaydi (SQL Server) | Limits the number of rows returned (SQL Server) |
| `FETCH` | Natija to'plamidan satrlarni bittadan oladi | Retrieves rows from a result set one at a time |
| `DISTINCT` | Ustundan yagona (takrorlanmaydigan) qiymatlarni tanlaydi | Selects unique values from a column |

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

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `COUNT` | Shartni qanoatlantiradigan satrlar sonini qaytaradi | Returns the number of rows that satisfy the condition |
| `SUM` | Qiymatlar to'plamining yig'indisini hisoblaydi | Calculates the sum of a set of values |
| `AVG` | Qiymatlar to'plamining o'rtachasini hisoblaydi | Calculates the average of a set of values |
| `MIN` | Qiymatlar to'plamidagi eng kichik qiymatni qaytaradi | Returns the smallest value in a set of values |
| `MAX` | Qiymatlar to'plamidagi eng katta qiymatni qaytaradi | Returns the largest value in a set of values |
| `GROUP BY` | Bir xil qiymatlarga ega satrlarni xulosaviy satrlarga guruhlaydi | Groups rows with the same values into summary rows |
| `HAVING` | Belgilangan shart asosida yozuvlarni filtrlaydi (GROUP BY dan keyin) | Filters records based on a condition (used after GROUP BY) |

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

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `IS NULL` | Ustundagi NULL qiymatlarni tekshiradi | Checks for NULL values in a column |
| `IS NOT NULL` | Ustundagi NULL bo'lmagan qiymatlarni tekshiradi | Checks for non-NULL values in a column |
| `EXISTS` | Subquery'da birorta yozuv mavjudligini tekshiradi | Tests for the existence of any record in a subquery |
| `COALESCE` | Ro'yxatdagi birinchi NULL bo'lmagan ifodasini qaytaradi | Returns the first non-NULL expression in a list |
| `NULLIF` | Ikki ifoda teng bo'lsa NULL qaytaradi, aks holda birinchisini | Returns NULL if two expressions are equal, otherwise returns the first |

```sql
-- Misol / Example
SELECT name, COALESCE(phone, 'N/A') as phone
FROM users
WHERE email IS NOT NULL;

SELECT NULLIF(salary, 0) FROM employees;
```

---

## 📌 8. Shartli mantiq / Conditional Logic

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `CASE` | SQL iboralarida shartli mantiqni bajaradi | Performs conditional logic in SQL statements |
| `WHEN` | CASE iborasida shartlarni belgilaydi | Specifies conditions in a CASE statement |
| `THEN` | CASE da shart to'g'ri bo'lganda natijani belgilaydi | Specifies result if a condition is true in CASE |
| `ELSE` | CASE da hech bir shart to'g'ri bo'lmasa natijani belgilaydi | Specifies result if no condition is true in CASE |
| `END` | CASE iborasini tugatadi | Ends the CASE statement |
| `CASE WHEN` | SELECT iboralarida shartli ifoda | Conditional expression in SELECT statements |
| `IIF` | Boolean ifodaga asoslanib ikki qiymatdan birini qaytaradi | Returns one of two values based on a Boolean expression |

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

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `PRIMARY KEY` | Jadvaldagi har bir yozuvni yagona identifikatsiya qiladi | Uniquely identifies each record in a table |
| `FOREIGN KEY` | Jadvallar o'rtasida munosabat o'rnatadi | Establishes a relationship between tables |
| `CONSTRAINT` | Jadvaldagi ma'lumotlar uchun qoidalarni joriy qiladi | Enforces rules for data in a table |
| `NOT NULL` | Ustun NULL qiymat qabul qila olmasligini ta'minlaydi | Ensures that a column cannot contain NULL values |
| `UNIQUE` | Ustundagi barcha qiymatlar yagona bo'lishini ta'minlaydi | Ensures that all values in a column are unique |
| `CHECK` | Ustundagi qiymatlarga shart joriy qiladi | Enforces a condition on the values in a column |

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

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `CASCADE` | Bog'liq yozuvlarda belgilangan amalni avtomatik bajaradi | Automatically performs a specified action on related records |
| `SET NULL` | Havola qilingan yozuv o'chirilganda FK ustunlarini NULL ga o'rnatadi | Sets FK columns to NULL when referenced record is deleted |
| `SET DEFAULT` | Havola qilingan yozuv o'chirilganda FK ustunlarini default qiymatga o'rnatadi | Sets FK columns to default value when referenced record is deleted |
| `NO ACTION` | Havola qilingan yozuv o'chirilganda bog'liq yozuvlarda hech narsa qilmaydi | Specifies no action on related records when referenced is deleted |
| `RESTRICT` | Bog'liq yozuvlar mavjud bo'lsa havola qilingan yozuvni o'chirishni cheklaydi | Restricts deletion if there are related records |

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

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `ROW_NUMBER()` | Natija to'plamidagi har bir satrga yagona ketma-ket son beradi | Assigns a unique sequential integer to each row |
| `RANK()` | Natija to'plamidagi har bir satrga rank beradi (oraliqlar bo'lishi mumkin) | Assigns a rank with possible gaps in sequence |
| `DENSE_RANK()` | Natija to'plamidagi har bir satrga rank beradi (oraliqsiz) | Assigns a rank with no gaps in sequence |
| `NTILE()` | Natija to'plamini teng o'lchamli guruhlarga bo'ladi | Divides the result set into equally sized groups |
| `LEAD()` | Natija to'plamidagi keyingi satrdan qiymat oladi | Retrieves the value from the next row in a result set |
| `LAG()` | Natija to'plamidagi oldingi satrdan qiymat oladi | Retrieves the value from the previous row in a result set |
| `PARTITION BY` | Natija to'plamini window funksiya alohida qo'llaniladigan bo'limlarga ajratadi | Divides result set into partitions for window functions |
| `ROWS` | Window funksiyalar uchun window freymini belgilaydi | Specifies the window frame for window functions |
| `RANGE` | Qatorlar emas, qiymatlar asosida window freymini belgilaydi | Specifies window frame based on values rather than rows |

```sql
-- Misol / Example
SELECT name, salary, department,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank_in_dept,
    LAG(salary) OVER (ORDER BY salary) as prev_salary,
    LEAD(salary) OVER (ORDER BY salary) as next_salary
FROM employees;
```

---

## 📌 12. CTE & Subquery

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `WITH` | Umumiy jadval ifodasini (CTE) belgilaydi | Defines a common table expression (CTE) |
| `INTO` | SELECT natija to'plami uchun maqsadli jadvalni belgilaydi | Specifies a target table for a SELECT result set |

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

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `CURRENT_TIMESTAMP` | Joriy sana va vaqtni qaytaradi | Returns the current date and time |
| `CURRENT_DATE` | Joriy sanani qaytaradi | Returns the current date |
| `CURRENT_TIME` | Joriy vaqtni qaytaradi | Returns the current time |
| `DATEADD` | Sanaga belgilangan vaqt oralig'ini qo'shadi | Adds a specified time interval to a date |
| `DATEDIFF` | Ikki sana o'rtasidagi farqni hisoblaydi | Calculates the difference between two dates |
| `DATEPART` | Sananing ma'lum bir qismini ajratib oladi | Extracts a specific part of a date |
| `GETDATE` | Joriy sana va vaqtni qaytaradi (CURRENT_TIMESTAMP ga o'xshash) | Returns the current date and time (similar to CURRENT_TIMESTAMP) |

```sql
-- Misol / Example
SELECT CURRENT_DATE, CURRENT_TIME, CURRENT_TIMESTAMP;

-- PostgreSQL
SELECT created_at, AGE(NOW(), created_at) as age FROM users;
```

---

## 📌 14. String funksiyalari / String Functions

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `CONCAT` | Ikki yoki ko'p satrni birlashtiradi | Concatenates two or more strings |
| `SUBSTRING` | Satrdan qism satr ajratib oladi | Extracts a substring from a string |
| `REPLACE` | Satr ichidagi belgilangan qism satrning barcha uchrashuvchanlarini boshqasi bilan almashtiradi | Replaces all occurrences of a substring with another |
| `LEN` | Satr uzunligini qaytaradi | Returns the length of a string |
| `UPPER` | Satrni katta harflarga aylantiradi | Converts a string to uppercase |
| `LOWER` | Satrni kichik harflarga aylantiradi | Converts a string to lowercase |
| `TRIM` | Satrdan bosh va oxiridagi bo'shliqlarni olib tashlaydi | Removes leading and trailing spaces from a string |
| `ROUND` | Sonni belgilangan kasr raqamlariga yaxlitlaydi | Rounds a numeric value to a specified number of decimal places |

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

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `GROUPING SETS` | Agregatsiya uchun bir nechta guruhlanishni belgilaydi | Specifies multiple groupings for aggregation |
| `CUBE` | Agregatsiya uchun guruhlanish to'plamlarining barcha mumkin kombinatsiyalarini yaratadi | Generates all possible combinations of grouping sets |
| `ROLLUP` | Qiymatlar ierarxiyasi uchun oraliq yig'indisini yaratadi | Generates subtotal values for a hierarchy of values |

```sql
-- Misol / Example
SELECT department, job_title, SUM(salary)
FROM employees
GROUP BY ROLLUP (department, job_title);
```

---

## 📌 16. Ilg'or operatsiyalar / Advanced Operations

| Buyruq / Command | O'zbek / Uzbek | English |
|------------------|----------------|---------|
| `MERGE` | Manba jadval bilan join natijasiga asosan maqsadli jadvalda INSERT/UPDATE/DELETE bajaradi | Performs insert, update, or delete based on join with a source table |
| `PIVOT` | Bir ustundagi yagona qiymatlarni chiqishdagi bir nechta ustunlarga aylantiradi | Rotates unique values from one column into multiple columns |
| `UNPIVOT` | Bir nechta ustunlarni chiqishdagi yagona satrlarga aylantiradi | Turns multiple columns into unique rows in the output |
| `CROSS APPLY` | Tashqi jadvalning har bir satriga nisbatan bog'liq subquery bajaradi | Performs a correlated subquery against each row of the outer table |
| `OUTER APPLY` | CROSS APPLY ga o'xshash, lekin ichki jadvalda mos qatorlar bo'lmasa ham tashqi jadvaldan satrlar qaytaradi | Like CROSS APPLY, but also returns rows with no matching inner rows |

```sql
-- Misol / Example (MERGE)
MERGE INTO target_table AS t
USING source_table AS s ON t.id = s.id
WHEN MATCHED THEN UPDATE SET t.name = s.name
WHEN NOT MATCHED THEN INSERT (id, name) VALUES (s.id, s.name);
```

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

| SQL Standard | PostgreSQL |
|---|---|
| `TOP N` | `LIMIT N` |
| `GETDATE()` | `NOW()` yoki `CURRENT_TIMESTAMP` |
| `LEN()` | `LENGTH()` |
| `ISNULL()` | `COALESCE()` |
| `AUTO_INCREMENT` | `SERIAL` yoki `GENERATED ALWAYS AS IDENTITY` |

---

*Tayyorlagan / Prepared by: Alyorjon | Manba / Source: 100 SQL Commands PDF*