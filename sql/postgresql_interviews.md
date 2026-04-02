# 🐘 PostgreSQL — 100 Interview Questions & Answers
### Ikki tilli qo'llanma / Bilingual Reference

> **Daraja / Level:** Boshlang'ich → O'rta → Ilg'or → Ekspert  
> **Tillar / Languages:** O'zbek 🇺🇿 | English 🇬🇧  
> **Maqsad / Goal:** PostgreSQL intervyusiga to'liq tayyorgarlik

---

## 📚 Mundarija / Table of Contents

1. [Asosiy tushunchalar / Basics (1–25)](#1-asosiy-tushunchalar--basics)
2. [O'rta daraja / Intermediate (26–55)](#2-orta-daraja--intermediate)
3. [Ilg'or daraja / Advanced (56–80)](#3-ilgor-daraja--advanced)
4. [Ekspert daraja / Expert (81–100)](#4-ekspert-daraja--expert)

---

## 1. Asosiy tushunchalar / Basics

**1. PostgreSQL nima?**
> **UZ:** PostgreSQL — kuchli, ochiq manbali ob'ektga-relyatsion ma'lumotlar bazasi tizimi. 30+ yillik faol rivojlanishga ega va ishonchlilik, xususiyatlar to'plami va unumdorlik jihatidan yuqori obro'ga ega.  
> **EN:** PostgreSQL is a powerful, open-source object-relational database system with over 30 years of active development. It is known for reliability, feature richness, and performance.

---

**2. PostgreSQL va MySQL o'rtasidagi asosiy farqlar?**
> **UZ:** PostgreSQL to'liq ACID muvofiq, murakkab so'rovlar, JSON, CTE, window funksiyalar, full-text search va kengaytmalarni yaxshiroq qo'llab-quvvatlaydi. MySQL sodda CRUD ilovalar uchun tezroq, lekin ilg'or funksiyalarda orqada qoladi.  
> **EN:** PostgreSQL is fully ACID-compliant, better supports complex queries, JSON, CTEs, window functions, full-text search, and extensions. MySQL is faster for simple CRUD apps but lags in advanced features.

| | PostgreSQL | MySQL |
|---|---|---|
| Litsenziya | PostgreSQL (MIT-like) | GPL / Commercial |
| JSON | To'liq qo'llab-quvvatlash | Cheklangan |
| Window funksiyalar | ✅ | Cheklangan |
| Full ACID | ✅ | Faqat InnoDB |
| Kengaytmalar | Ko'p (PostGIS, pg_trgm) | Kam |

---

**3. ACID nima?**
> **UZ:** ACID — ma'lumotlar bazasi tranzaksiyalarining 4 xususiyati:
> - **A**tomicity — tranzaksiya ya to'liq bajariladi, yo umuman bajarilmaydi
> - **C**onsistency — tranzaksiya MBni bir to'g'ri holatdan ikkinchisiga o'tkazadi
> - **I**solation — bir vaqtda bajarilayotgan tranzaksiyalar bir-birini ko'rmaydi
> - **D**urability — tranzaksiya tasdiqlangandan keyin, tizim ishlamay qolsa ham, ma'lumotlar saqlanadi  
> **EN:** ACID — 4 properties ensuring reliable database transactions: **Atomicity** (all or nothing), **Consistency** (valid state transition), **Isolation** (concurrent transactions don't interfere), **Durability** (committed data persists despite failures).

---

**4. PostgreSQL da ma'lumot turlari (Data Types)?**
> **UZ:** Asosiy turlar: `INTEGER`, `BIGINT`, `NUMERIC`, `FLOAT`, `VARCHAR(n)`, `TEXT`, `BOOLEAN`, `DATE`, `TIMESTAMP`, `TIMESTAMPTZ`, `UUID`, `JSON`, `JSONB`, `ARRAY`, `BYTEA`, `SERIAL`.  
> **EN:** Key types: `INTEGER`, `BIGINT`, `NUMERIC`, `FLOAT`, `VARCHAR(n)`, `TEXT`, `BOOLEAN`, `DATE`, `TIMESTAMP`, `TIMESTAMPTZ`, `UUID`, `JSON`, `JSONB`, `ARRAY`, `BYTEA`, `SERIAL`.

```sql
CREATE TABLE example (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    salary      NUMERIC(12, 2),
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    metadata    JSONB,
    tags        TEXT[]
);
```

---

**5. PRIMARY KEY va UNIQUE farqi?**
> **UZ:** `PRIMARY KEY` — jadvalda faqat bitta bo'lishi mumkin, NULL qabul qilmaydi, avtomatik indeks yaratadi. `UNIQUE` — bir jadvalda bir nechta bo'lishi mumkin, NULL qabul qiladi (har bir NULL yagona hisoblanadi).  
> **EN:** `PRIMARY KEY` — only one per table, no NULLs, auto-creates index. `UNIQUE` — multiple per table, allows NULLs (each NULL is considered unique).

---

**6. NULL nima va qanday ishlaydi?**
> **UZ:** NULL — qiymat yo'qligini bildiradi, nol yoki bo'sh satr emas. NULL bilan har qanday taqqoslash (`=`, `<`, `>`) `NULL` qaytaradi. Tekshirish uchun `IS NULL` yoki `IS NOT NULL` ishlatiladi.  
> **EN:** NULL means the absence of a value — not zero or empty string. Any comparison with NULL (`=`, `<`, `>`) returns NULL. Use `IS NULL` or `IS NOT NULL` to check.

```sql
SELECT * FROM users WHERE phone IS NULL;
SELECT COALESCE(phone, 'N/A') FROM users;  -- NULL o'rniga default qiymat
```

---

**7. Schema nima?**
> **UZ:** Schema — PostgreSQL da ma'lumotlar bazasi ichidagi mantiqiy nom maydoni. Jadvallar, ko'rinishlar, funksiyalar va boshqa ob'ektlarni guruhlaydi. Default schema `public`.  
> **EN:** A schema is a logical namespace within a PostgreSQL database that groups tables, views, functions, and other objects. Default schema is `public`.

```sql
CREATE SCHEMA hr;
CREATE TABLE hr.employees (...);
SET search_path TO hr, public;
```

---

**8. Sequence nima?**
> **UZ:** Sequence — ketma-ket yagona raqamlar yaratuvchi ob'ekt. `SERIAL` va `BIGSERIAL` ma'lumot turlari ichida avtomatik sequence yaratadi. `nextval()`, `currval()`, `setval()` funksiyalari bilan boshqariladi.  
> **EN:** A sequence generates unique sequential numbers. `SERIAL`/`BIGSERIAL` types create sequences automatically. Controlled via `nextval()`, `currval()`, `setval()`.

```sql
CREATE SEQUENCE order_seq START 1000 INCREMENT 1;
SELECT nextval('order_seq');  -- 1000, 1001, ...

-- Yoki SERIAL orqali
CREATE TABLE orders (id SERIAL PRIMARY KEY);
```

---

**9. INDEX nima va nima uchun kerak?**
> **UZ:** Index — ma'lumotlarni tezroq qidirish uchun yaratilgan qo'shimcha ma'lumot tuzilmasi. WHERE, JOIN, ORDER BY da tezlikni oshiradi, lekin yozish operatsiyalari (`INSERT`, `UPDATE`, `DELETE`) ni biroz sekinlashtiradi.  
> **EN:** An index is an auxiliary data structure for faster data retrieval. Speeds up WHERE, JOIN, ORDER BY but slightly slows write operations.

```sql
-- Oddiy index
CREATE INDEX idx_users_email ON users(email);

-- Ko'p ustunli index
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);

-- Unikal index
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);
```

---

**10. Index turlari PostgreSQL da?**
> **UZ:** Asosiy index turlari:
> - **B-tree** (default) — tenglik va oraliq so'rovlar uchun
> - **Hash** — faqat tenglik (`=`) so'rovlari uchun
> - **GiST** — geometrik, to'liq matn qidirish uchun
> - **GIN** — massivlar, JSONB, to'liq matn uchun
> - **BRIN** — juda katta, fizik tartibda saqlangan jadvallar uchun  
> **EN:** Key index types: **B-tree** (default, range+equality), **Hash** (equality only), **GiST** (geometric, full-text), **GIN** (arrays, JSONB, full-text), **BRIN** (large physically-ordered tables).

```sql
CREATE INDEX idx_gin ON documents USING GIN(content_tsvector);
CREATE INDEX idx_hash ON sessions USING HASH(session_token);
```

---

**11. VIEW nima?**
> **UZ:** View — saqlangan SELECT so'rovi. Real ma'lumot saqlamaydi (oddiy view da), lekin jadval kabi so'ralishi mumkin. Murakkab so'rovlarni soddalashtiradi va xavfsizlik qatlamini ta'minlaydi.  
> **EN:** A view is a stored SELECT query. Regular views don't store data but can be queried like tables. They simplify complex queries and provide a security layer.

```sql
CREATE VIEW active_users AS
SELECT id, name, email
FROM users
WHERE is_active = TRUE;

SELECT * FROM active_users;
```

---

**12. Materialized View nima va oddiy View dan farqi?**
> **UZ:** Materialized View so'rov natijasini diskda saqlaydi — tez o'qish imkonini beradi, lekin ma'lumotlar eskirishi mumkin. `REFRESH MATERIALIZED VIEW` bilan yangilanadi.  
> **EN:** Materialized View physically stores the query result on disk — fast reads but data can become stale. Refreshed with `REFRESH MATERIALIZED VIEW`.

```sql
CREATE MATERIALIZED VIEW sales_summary AS
SELECT date_trunc('month', created_at) as month,
       SUM(total) as revenue
FROM orders GROUP BY 1;

-- Yangilash / Refresh
REFRESH MATERIALIZED VIEW CONCURRENTLY sales_summary;
```

---

**13. JOIN turlari?**
> **UZ:** Asosiy JOIN turlari:
> - **INNER JOIN** — ikkala jadvalda mos yozuvlar
> - **LEFT JOIN** — chap jadvalning barcha yozuvlari + o'ngdan mos kelganlar
> - **RIGHT JOIN** — o'ng jadvalning barcha yozuvlari + chapdan mos kelganlar
> - **FULL OUTER JOIN** — ikkala jadvalning barcha yozuvlari
> - **CROSS JOIN** — kartezian ko'paytma  
> **EN:** **INNER JOIN** (matching rows in both), **LEFT JOIN** (all left + matching right), **RIGHT JOIN** (all right + matching left), **FULL OUTER JOIN** (all from both), **CROSS JOIN** (cartesian product).

```sql
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= NOW() - INTERVAL '30 days';
```

---

**14. Subquery (Ichki so'rov) nima?**
> **UZ:** Subquery — boshqa so'rov ichida joylashtirilgan so'rov. WHERE, FROM, SELECT, HAVING da ishlatilishi mumkin. Korrelyatsiyalangan (correlated) va korrelyatsiyalanmagan turlari bor.  
> **EN:** A subquery is a query nested inside another query. Can be used in WHERE, FROM, SELECT, HAVING. Can be correlated (references outer query) or non-correlated.

```sql
-- WHERE da subquery
SELECT name FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total > 1000000);

-- FROM da subquery (derived table)
SELECT dept, AVG(salary) FROM (
    SELECT department as dept, salary FROM employees WHERE is_active = TRUE
) sub GROUP BY dept;
```

---

**15. CTE (Common Table Expression) nima?**
> **UZ:** CTE — `WITH` kalit so'zi bilan aniqlangan vaqtinchalik nomli natija to'plami. Murakkab so'rovlarni o'qilishi oson bo'laklarga ajratadi. Rekursiv CTE ham mumkin.  
> **EN:** CTE is a temporary named result set defined with `WITH`. Breaks complex queries into readable parts. Recursive CTEs are also supported.

```sql
WITH monthly_sales AS (
    SELECT date_trunc('month', created_at) AS month,
           SUM(total) AS revenue
    FROM orders
    GROUP BY 1
),
ranked AS (
    SELECT *, RANK() OVER (ORDER BY revenue DESC) AS rank
    FROM monthly_sales
)
SELECT * FROM ranked WHERE rank <= 3;
```

---

**16. Window funksiyalar nima?**
> **UZ:** Window funksiyalar qatorlar guruhida hisob-kitob qiladi, lekin guruhlarni birlashtirmaydi (GROUP BY dan farqi). `OVER()` clause bilan ishlatiladi. `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LAG()`, `LEAD()`, `SUM() OVER()` kabilar.  
> **EN:** Window functions perform calculations across a set of rows without collapsing them (unlike GROUP BY). Used with `OVER()` clause.

```sql
SELECT
    name,
    department,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
    LAG(salary) OVER (ORDER BY salary) AS prev_salary,
    SUM(salary) OVER (PARTITION BY department) AS dept_total
FROM employees;
```

---

**17. HAVING va WHERE farqi?**
> **UZ:** `WHERE` — GROUP BY dan oldin individual qatorlarni filtrlaydi. `HAVING` — GROUP BY dan keyin guruhlarni filtrlaydi. Agregat funksiyalar (`COUNT`, `SUM`) faqat `HAVING` da ishlatilishi mumkin.  
> **EN:** `WHERE` filters individual rows before GROUP BY. `HAVING` filters groups after GROUP BY. Aggregate functions can only be used in `HAVING`.

```sql
SELECT department, COUNT(*) AS count, AVG(salary) AS avg_sal
FROM employees
WHERE is_active = TRUE          -- avval filtrlash / filter first
GROUP BY department
HAVING COUNT(*) > 5             -- guruhni filtrlash / filter group
ORDER BY avg_sal DESC;
```

---

**18. DISTINCT qanday ishlaydi?**
> **UZ:** `DISTINCT` — natija to'plamidagi takrorlanuvchi qatorlarni olib tashlaydi. `DISTINCT ON (ustun)` — ma'lum ustun bo'yicha birinchi qatorni qaytaradi (PostgreSQL xususiyati).  
> **EN:** `DISTINCT` removes duplicate rows from the result. `DISTINCT ON (column)` returns the first row for each distinct value of the specified column (PostgreSQL-specific).

```sql
-- Barcha yagona shaharlar
SELECT DISTINCT city FROM users;

-- Har bir foydalanuvchining oxirgi buyurtmasi
SELECT DISTINCT ON (user_id)
    user_id, order_id, created_at
FROM orders
ORDER BY user_id, created_at DESC;
```

---

**19. LIMIT va OFFSET nima?**
> **UZ:** `LIMIT` — qaytariladigan qatorlar sonini cheklaydi. `OFFSET` — ma'lum miqdordagi qatorlarni o'tkazib yuboradi. Sahifalash (pagination) uchun ishlatiladi, lekin katta OFFSET larda sekin ishlaydi.  
> **EN:** `LIMIT` caps the number of returned rows. `OFFSET` skips a number of rows. Used for pagination, but large OFFSET values are slow.

```sql
-- 2-sahifa, har sahifada 10 ta
SELECT * FROM products
ORDER BY id
LIMIT 10 OFFSET 10;
```

---

**20. EXPLAIN va EXPLAIN ANALYZE nima?**
> **UZ:** `EXPLAIN` — so'rov bajarish rejasini ko'rsatadi (haqiqatan bajarmasdan). `EXPLAIN ANALYZE` — rejani ko'rsatadi VA so'rovni bajarib, haqiqiy vaqtni o'lchaydi. So'rovlarni optimallashtirish uchun muhim vosita.  
> **EN:** `EXPLAIN` shows the query execution plan without running it. `EXPLAIN ANALYZE` shows the plan AND executes the query, measuring actual time. Essential for query optimization.

```sql
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
```

---

**21. Transaction (Tranzaksiya) nima?**
> **UZ:** Tranzaksiya — yagona mantiqiy birlik sifatida bajarilishi kerak bo'lgan SQL operatsiyalar ketma-ketligi. `BEGIN`/`START TRANSACTION` bilan boshlanadi, `COMMIT` yoki `ROLLBACK` bilan tugaydi.  
> **EN:** A transaction is a sequence of SQL operations executed as a single logical unit. Starts with `BEGIN`/`START TRANSACTION`, ends with `COMMIT` or `ROLLBACK`.

```sql
BEGIN;

UPDATE accounts SET balance = balance - 500000 WHERE id = 1;
UPDATE accounts SET balance = balance + 500000 WHERE id = 2;

-- Agar xato bo'lsa / If error:
ROLLBACK;

-- Agar hammasi yaxshi / If all good:
COMMIT;
```

---

**22. SAVEPOINT nima?**
> **UZ:** SAVEPOINT — tranzaksiya ichidagi belgi nuqtasi. Tranzaksiyaning faqat bir qismini orqaga qaytarish (`ROLLBACK TO SAVEPOINT`) imkonini beradi, butun tranzaksiyani bekor qilmasdan.  
> **EN:** SAVEPOINT is a marker within a transaction allowing partial rollback (`ROLLBACK TO SAVEPOINT`) without canceling the entire transaction.

```sql
BEGIN;
INSERT INTO logs (...) VALUES (...);
SAVEPOINT sp1;

UPDATE orders SET status = 'shipped' WHERE id = 5;
-- Agar bu xato bo'lsa / If this fails:
ROLLBACK TO SAVEPOINT sp1;

COMMIT;
```

---

**23. FOREIGN KEY va CASCADE?**
> **UZ:** Foreign Key ikki jadval o'rtasidagi bog'liqlikni ta'minlaydi. `ON DELETE CASCADE` — asosiy yozuv o'chirilganda bog'liq yozuvlar ham o'chadi. `ON DELETE SET NULL` — NULL ga o'rnatadi. `ON DELETE RESTRICT` — o'chirishni bloklaydi.  
> **EN:** Foreign Key enforces referential integrity. `ON DELETE CASCADE` deletes related rows. `ON DELETE SET NULL` sets FK to NULL. `ON DELETE RESTRICT` blocks deletion.

```sql
CREATE TABLE orders (
    id      SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ...
);
```

---

**24. CHECK constraint nima?**
> **UZ:** CHECK — ustun qiymatiga shart qo'yadi. Shart yolg'on bo'lsa, yozuv rad etiladi.  
> **EN:** CHECK enforces a condition on column values. If the condition is false, the row is rejected.

```sql
CREATE TABLE employees (
    id      SERIAL PRIMARY KEY,
    salary  NUMERIC CHECK (salary > 0),
    age     INT CHECK (age BETWEEN 18 AND 65),
    email   TEXT CHECK (email LIKE '%@%')
);
```

---

**25. DEFAULT qiymatlar?**
> **UZ:** `DEFAULT` — yangi yozuv qo'shilganda qiymat ko'rsatilmasa, avtomatik beriladigan qiymat. Statik qiymat, funksiya chaqiruvi yoki ifoda bo'lishi mumkin.  
> **EN:** `DEFAULT` assigns a value automatically when none is provided. Can be a static value, function call, or expression.

```sql
CREATE TABLE tasks (
    id         SERIAL PRIMARY KEY,
    status     TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    priority   INT DEFAULT 3,
    uuid       UUID DEFAULT gen_random_uuid()
);
```

---

## 2. O'rta daraja / Intermediate

**26. JSONB va JSON farqi?**
> **UZ:** `JSON` — matnni aynan saqlaydi (kalit tartibi va bo'sh joylar saqlanadi), har safar so'ralganda parse qilinadi. `JSONB` — ikkilik (binary) formatda saqlaydi, parse qilingan holda, indekslash mumkin, so'rovlar tezroq. Odatda `JSONB` afzal.  
> **EN:** `JSON` stores text as-is (preserves key order, whitespace), parsed on every query. `JSONB` stores in binary format, already parsed, supports indexing, faster queries. Prefer `JSONB`.

```sql
-- JSONB so'rovlari / JSONB queries
SELECT metadata->>'name' AS name,           -- matn sifatida / as text
       metadata->'address'->>'city' AS city, -- ichki qiymat / nested value
       metadata @> '{"role": "admin"}'::jsonb  -- mavjudligi / contains
FROM users;

-- JSONB indeksi / JSONB index
CREATE INDEX idx_metadata ON users USING GIN(metadata);
```

---

**27. ARRAY turlari va so'rovlari?**
> **UZ:** PostgreSQL massivlarni nativ qo'llab-quvvatlaydi. `TEXT[]`, `INT[]` kabi turlar. Massiv elementlariga `[n]` bilan kiriladi (1 dan boshlanadi), `ANY`, `ALL`, `@>`, `&&` operatorlari bilan so'raladi.  
> **EN:** PostgreSQL natively supports arrays. Access elements with `[n]` (1-indexed). Use `ANY`, `ALL`, `@>`, `&&` operators for querying.

```sql
CREATE TABLE posts (
    id    SERIAL PRIMARY KEY,
    tags  TEXT[]
);

INSERT INTO posts (tags) VALUES (ARRAY['python', 'fastapi', 'postgresql']);

-- Massiv so'rovlari / Array queries
SELECT * FROM posts WHERE 'python' = ANY(tags);
SELECT * FROM posts WHERE tags @> ARRAY['python', 'fastapi'];
SELECT * FROM posts WHERE tags && ARRAY['python', 'go'];  -- kesishma / overlap
```

---

**28. Full-Text Search (To'liq matn qidirish)?**
> **UZ:** PostgreSQL `tsvector` va `tsquery` orqali to'liq matn qidirishni qo'llab-quvvatlaydi. `to_tsvector()` matnni tokenizatsiya qiladi, `to_tsquery()` so'rovni yaratadi, `@@` operatori mos kelishni tekshiradi.  
> **EN:** PostgreSQL supports full-text search via `tsvector` and `tsquery`. `to_tsvector()` tokenizes text, `to_tsquery()` creates search queries, `@@` checks for matches.

```sql
-- Ustun qo'shish va indeks / Add column and index
ALTER TABLE articles ADD COLUMN search_vector tsvector;
UPDATE articles SET search_vector = to_tsvector('english', title || ' ' || body);
CREATE INDEX idx_fts ON articles USING GIN(search_vector);

-- Qidirish / Search
SELECT title, ts_rank(search_vector, query) AS rank
FROM articles, to_tsquery('english', 'postgresql & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC;
```

---

**29. pg_trgm kengaytmasi nima?**
> **UZ:** `pg_trgm` — trigram asosida matn o'xshashligini hisoblash kengaytmasi. `LIKE '%...%'` so'rovlarini tezlashtirish uchun GIN/GiST indeksi yaratishga imkon beradi.  
> **EN:** `pg_trgm` is an extension for trigram-based text similarity. Enables GIN/GiST indexes for `LIKE '%...%'` queries.

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX idx_trgm ON users USING GIN(name gin_trgm_ops);

-- Tez ILIKE so'rovi / Fast ILIKE query
SELECT * FROM users WHERE name ILIKE '%ali%';

-- O'xshashlik / Similarity
SELECT name, similarity(name, 'Alisher') AS sim
FROM users ORDER BY sim DESC LIMIT 5;
```

---

**30. Partial Index (Qisman indeks) nima?**
> **UZ:** Partial Index — faqat ma'lum shartni qanoatlantiruvchi qatorlarga yaratilgan indeks. Kichikroq hajm, tezroq so'rovlar, kam xotira sarfi.  
> **EN:** Partial Index is built only on rows satisfying a condition — smaller size, faster queries, less memory.

```sql
-- Faqat faol foydalanuvchilar uchun / Only for active users
CREATE INDEX idx_active_users ON users(email) WHERE is_active = TRUE;

-- Faqat to'lanmagan buyurtmalar / Only unpaid orders
CREATE INDEX idx_unpaid ON orders(user_id, created_at)
WHERE status = 'pending';
```

---

**31. Composite Index (Ko'p ustunli indeks) qachon samarali?**
> **UZ:** Ko'p ustunli indeks WHERE da bir nechta ustun filtrlanganda yoki ORDER BY da samarali. Ustunlar tartibi muhim: eng ko'p filtrlangan ustun birinchi bo'lishi kerak. "Leftmost prefix rule" — chapdan o'ngga ishlatilishi kerak.  
> **EN:** Effective when filtering on multiple columns in WHERE or ORDER BY. Column order matters — most selective column first. "Leftmost prefix rule" — used left-to-right.

```sql
CREATE INDEX idx_orders_compound ON orders(user_id, status, created_at DESC);

-- Bu indeksdan foydalanadi / Uses index:
SELECT * FROM orders WHERE user_id = 5 AND status = 'pending';

-- Bu ham foydalanadi / Also uses:
SELECT * FROM orders WHERE user_id = 5;

-- Bu foydalanmaydi / Does NOT use (status birinchi emas / status not first):
SELECT * FROM orders WHERE status = 'pending';
```

---

**32. Covering Index nima?**
> **UZ:** Covering Index — so'rov uchun zarur barcha ustunlarni o'z ichiga olgan indeks. PostgreSQL asosiy jadval sahifalariga murojaat qilmasdan (`heap fetch` yo'q) to'g'ridan-to'g'ri indeksdan javob qaytaradi.  
> **EN:** A Covering Index includes all columns needed by a query, allowing PostgreSQL to answer directly from the index without fetching table rows (index-only scan).

```sql
-- name va email ham indeksda / name and email also in index
CREATE INDEX idx_covering ON users(id) INCLUDE (name, email);
```

---

**33. Table Partitioning nima?**
> **UZ:** Partitioning — katta jadvalni kichik fizik qismlarga (partition) bo'lish. So'rovlar faqat tegishli partition da qidiriladi (partition pruning). PostgreSQL da `RANGE`, `LIST`, `HASH` partitioning turlari bor.  
> **EN:** Partitioning splits a large table into smaller physical pieces. Queries only search relevant partitions (partition pruning). Types: `RANGE`, `LIST`, `HASH`.

```sql
CREATE TABLE orders (
    id         BIGINT,
    created_at TIMESTAMPTZ,
    total      NUMERIC
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2024 PARTITION OF orders
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE orders_2025 PARTITION OF orders
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
```

---

**34. VACUUM va AUTOVACUUM nima?**
> **UZ:** PostgreSQL MVCC tufayli o'chirilgan/yangilangan qatorlarni fizik o'chirmasdan "o'lik" (dead tuple) sifatida belgilaydi. `VACUUM` ushbu o'lik tuplellarni tozalaydi. `AUTOVACUUM` — fon jarayoni bo'lib, buni avtomatik bajaradi.  
> **EN:** PostgreSQL MVCC marks deleted/updated rows as "dead tuples" without physically removing them. `VACUUM` reclaims space from dead tuples. `AUTOVACUUM` does this automatically in the background.

```sql
-- Qo'lda vacuum / Manual vacuum
VACUUM ANALYZE users;

-- To'liq tozalash (lock talab qiladi) / Full vacuum (requires lock)
VACUUM FULL orders;

-- Jadval statistikasini yangilash / Update table statistics
ANALYZE employees;
```

---

**35. MVCC (Multi-Version Concurrency Control) nima?**
> **UZ:** MVCC — PostgreSQL da bir vaqtda o'qish va yozishni lock qilmasdan ta'minlovchi mexanizm. Har bir tranzaksiya ma'lumotlarning o'z "snapshotini" ko'radi. Bu o'quvchilar yozuvchilarni bloklamasligini ta'minlaydi.  
> **EN:** MVCC allows concurrent reads and writes without locking. Each transaction sees its own "snapshot" of data, ensuring readers don't block writers and vice versa.

---

**36. Isolation Level (Izolyatsiya darajasi) turlari?**
> **UZ:** PostgreSQL 4 ta izolyatsiya darajasini qo'llab-quvvatlaydi:
> - **Read Uncommitted** — PostgreSQL da Read Committed kabi ishlaydi
> - **Read Committed** (default) — faqat tasdiqlangan ma'lumotlarni ko'radi
> - **Repeatable Read** — tranzaksiya davomida bir xil o'qishni kafolatlaydi
> - **Serializable** — to'liq izolyatsiya, xuddi ketma-ket bajariladigan kabi  
> **EN:** PostgreSQL supports 4 isolation levels: **Read Uncommitted** (acts as Read Committed), **Read Committed** (default, sees only committed data), **Repeatable Read**, **Serializable** (full isolation).

```sql
BEGIN;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- so'rovlar / queries
COMMIT;
```

---

**37. Lock (Qulf) turlari PostgreSQL da?**
> **UZ:** Asosiy lock turlari: **ROW-level** (SELECT FOR UPDATE, SELECT FOR SHARE), **TABLE-level** (ALTER TABLE, DROP TABLE), **Advisory Locks** (dastur tomonidan boshqariladigan). `pg_locks` jadvalidan joriy locklar ko'riladi.  
> **EN:** Key lock types: **ROW-level** (SELECT FOR UPDATE/SHARE), **TABLE-level** (ALTER/DROP), **Advisory Locks** (application-controlled). View current locks in `pg_locks`.

```sql
-- Qator uchun lock / Row-level lock
SELECT * FROM orders WHERE id = 5 FOR UPDATE;

-- Boshqalar o'qiy oladi, lekin o'zgartira olmaydi / Others can read but not modify
SELECT * FROM orders WHERE id = 5 FOR SHARE;

-- Advisory lock
SELECT pg_advisory_lock(12345);
-- ishlar / work
SELECT pg_advisory_unlock(12345);
```

---

**38. Deadlock nima va qanday oldini olish?**
> **UZ:** Deadlock — ikki tranzaksiya bir-birining resurslarini kutib qolishi. PostgreSQL deadlockni avtomatik aniqlaydi va birini bekor qiladi. Oldini olish: bir xil tartibda locklar olish, tranzaksiyalarni qisqa saqlash.  
> **EN:** Deadlock occurs when two transactions wait for each other's resources. PostgreSQL auto-detects and resolves by aborting one. Prevention: acquire locks in consistent order, keep transactions short.

---

**39. TRIGGER nima?**
> **UZ:** Trigger — jadvalda ma'lum hodisa (`INSERT`, `UPDATE`, `DELETE`) sodir bo'lganda avtomatik chaqiriladigan funksiya. `BEFORE` yoki `AFTER` hodisaga bog'liq ishga tushadi.  
> **EN:** A trigger is a function automatically called when a specific event (`INSERT`, `UPDATE`, `DELETE`) occurs on a table. Fires `BEFORE` or `AFTER` the event.

```sql
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();
```

---

**40. Stored Procedure va Function farqi PostgreSQL da?**
> **UZ:** **Function** — qiymat qaytaradi, SELECT da ishlatilishi mumkin, tranzaksiyani boshqara olmaydi. **Procedure** (PostgreSQL 11+) — qiymat qaytarmaydi, `CALL` bilan chaqiriladi, `COMMIT`/`ROLLBACK` ni o'zi boshqara oladi.  
> **EN:** **Function** — returns a value, usable in SELECT, cannot control transactions. **Procedure** (PG 11+) — no return value, called with `CALL`, can manage its own `COMMIT`/`ROLLBACK`.

```sql
-- Function
CREATE OR REPLACE FUNCTION get_user_orders(p_user_id INT)
RETURNS TABLE(order_id INT, total NUMERIC) AS $$
BEGIN
    RETURN QUERY
    SELECT id, total FROM orders WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM get_user_orders(5);

-- Procedure
CREATE PROCEDURE process_payment(p_order_id INT)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE orders SET status = 'paid' WHERE id = p_order_id;
    COMMIT;
END;
$$;

CALL process_payment(42);
```

---

**41. plpgsql nima?**
> **UZ:** plpgsql — PostgreSQL ning protsessual dasturlash tili. IF/ELSE, LOOP, EXCEPTION bloklari, o'zgaruvchilar, kursorlar va boshqa dasturlash konstruksiyalarini qo'llab-quvvatlaydi. Trigger va funksiyalar yozish uchun ishlatiladi.  
> **EN:** plpgsql is PostgreSQL's procedural programming language. Supports IF/ELSE, LOOP, EXCEPTION blocks, variables, cursors. Used to write triggers and functions.

---

**42. UPSERT (`INSERT ... ON CONFLICT`) nima?**
> **UZ:** UPSERT — yozuv mavjud bo'lsa yangilash, yo'q bo'lsa qo'shish. PostgreSQL da `INSERT ... ON CONFLICT DO UPDATE` yoki `ON CONFLICT DO NOTHING` bilan amalga oshiriladi.  
> **EN:** UPSERT inserts if the row doesn't exist, updates if it does. PostgreSQL uses `INSERT ... ON CONFLICT DO UPDATE` or `ON CONFLICT DO NOTHING`.

```sql
INSERT INTO users (email, name, updated_at)
VALUES ('ali@example.com', 'Ali Karimov', NOW())
ON CONFLICT (email)
DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = EXCLUDED.updated_at;
```

---

**43. RETURNING clause nima?**
> **UZ:** `RETURNING` — `INSERT`, `UPDATE`, `DELETE` operatsiyasidan keyin o'zgartirilgan qatorlarni qaytaradi. Qo'shimcha SELECT so'rovisiz yangi ID yoki qiymatlarni olish imkonini beradi.  
> **EN:** `RETURNING` returns modified rows after `INSERT`, `UPDATE`, or `DELETE` — gets new IDs or values without an extra SELECT.

```sql
-- Yangi ID ni olish / Get new ID
INSERT INTO users (name, email) VALUES ('Bobur', 'bobur@test.com')
RETURNING id, created_at;

-- O'chirilgan yozuvni olish / Get deleted row
DELETE FROM sessions WHERE expires_at < NOW()
RETURNING session_token, user_id;
```

---

**44. Recursive CTE nima?**
> **UZ:** Rekursiv CTE — o'z-o'ziga murojaat qiladigan CTE. Ierarxik ma'lumotlar (daraxt tuzilmalari, kategoriya ierarxiyalari, graflar) bilan ishlash uchun ishlatiladi.  
> **EN:** Recursive CTE references itself, used for hierarchical data (tree structures, category hierarchies, graphs).

```sql
WITH RECURSIVE category_tree AS (
    -- Boshlang'ich qator / Base case
    SELECT id, name, parent_id, 0 AS depth
    FROM categories WHERE parent_id IS NULL

    UNION ALL

    -- Rekursiv qism / Recursive part
    SELECT c.id, c.name, c.parent_id, ct.depth + 1
    FROM categories c
    JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree ORDER BY depth, name;
```

---

**45. COPY buyrug'i nima?**
> **UZ:** `COPY` — PostgreSQL da katta hajmdagi ma'lumotlarni CSV/text fayldan tez import/export qilish buyrug'i. `INSERT` dan 10-100x tezroq ishlaydi.  
> **EN:** `COPY` is PostgreSQL's fast bulk data import/export from/to CSV/text files — 10-100x faster than `INSERT`.

```sql
-- Fayldan import / Import from file
COPY users(name, email, created_at)
FROM '/tmp/users.csv'
WITH (FORMAT csv, HEADER true, DELIMITER ',');

-- Faylga export / Export to file
COPY (SELECT * FROM users WHERE is_active = TRUE)
TO '/tmp/active_users.csv'
WITH (FORMAT csv, HEADER true);
```

---

**46. pg_stat_statements nima?**
> **UZ:** `pg_stat_statements` — PostgreSQL kengaytmasi bo'lib, barcha so'rovlar statistikasini (bajarilish sonи, umumiy vaqt, o'rtacha vaqt) kuzatadi. Sekin so'rovlarni topish uchun muhim vosita.  
> **EN:** `pg_stat_statements` is an extension tracking statistics for all queries (execution count, total time, average time). Essential for finding slow queries.

```sql
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Eng sekin so'rovlar / Slowest queries
SELECT query, calls, total_exec_time/calls AS avg_ms,
       rows/calls AS avg_rows
FROM pg_stat_statements
ORDER BY avg_ms DESC
LIMIT 10;
```

---

**47. Connection Pooling nima?**
> **UZ:** Connection Pooling — ma'lumotlar bazasi ulanishlarini qayta ishlatish mexanizmi. Har safar yangi ulanish yaratish qimmat. `PgBouncer` yoki `pgpool-II` eng ko'p ishlatiladigan PostgreSQL connection pooler lar. FastAPI da `asyncpg` + `SQLAlchemy` async engine ham pooling qiladi.  
> **EN:** Connection Pooling reuses database connections instead of creating new ones each time (expensive). PgBouncer and pgpool-II are popular PostgreSQL poolers.

---

**48. WAL (Write-Ahead Log) nima?**
> **UZ:** WAL — PostgreSQL ning o'zgarishlarni jadval sahifalaridan oldin jurnal faylga yozadigan mexanizmi. Crash recovery, streaming replication va Point-in-Time Recovery (PITR) uchun asos.  
> **EN:** WAL (Write-Ahead Log) writes changes to a log file before applying them to table pages. Foundation for crash recovery, streaming replication, and PITR.

---

**49. Replication (Replikatsiya) nima?**
> **UZ:** PostgreSQL replikatsiya turlari:
> - **Streaming Replication** — WAL orqali real-time sinxronizatsiya (primary → standby)
> - **Logical Replication** — jadval darajasida selektiv replikatsiya
> - **Synchronous** — primary standby tasdiqlaguncha kutadi
> - **Asynchronous** — primary kutmaydi (tezroq, lekin ma'lumot yo'qotish xavfi)  
> **EN:** Replication types: **Streaming** (real-time via WAL, primary→standby), **Logical** (selective table-level), **Synchronous** (primary waits for standby ACK), **Asynchronous** (primary doesn't wait, faster but risk of data loss).

---

**50. Point-in-Time Recovery (PITR) nima?**
> **UZ:** PITR — WAL arxivlari yordamida ma'lumotlar bazasini ixtiyoriy o'tgan vaqt nuqtasiga tiklash imkoniyati. "Ertaga soat 14:30 gacha tiklash kerak" kabi stsenariylar uchun.  
> **EN:** PITR allows restoring the database to any past point in time using WAL archives — for scenarios like "restore to yesterday 14:30."

---

**51. Table Inheritance (Jadval meros olishi) nima?**
> **UZ:** PostgreSQL jadvallarga meros olishni qo'llab-quvvatlaydi. Parent jadvalga so'rov yuborilganda, barcha child jadval ma'lumotlari ham qaytariladi. Partitioning dan oldin ishlatilgan, hozir asosan deklarativ partitioning afzal.  
> **EN:** PostgreSQL supports table inheritance. Querying the parent returns data from all child tables. Largely replaced by declarative partitioning in modern PostgreSQL.

---

**52. UUID va SERIAL/BIGSERIAL o'rtasidagi tanlash?**
> **UZ:** `SERIAL`/`BIGSERIAL` — ketma-ket, kichik (4/8 bayt), JOIN da tezroq. `UUID` — global yagona (16 bayt), tarqatilgan tizimlar uchun ideal, lekin indeks hajmi kattaroq, tasodifiy tartib tufayli indeks fragmentatsiyasi ko'p.  
> **EN:** `SERIAL`/`BIGSERIAL` — sequential, small (4/8 bytes), faster in JOINs. `UUID` — globally unique (16 bytes), ideal for distributed systems, but larger index size and more fragmentation due to random ordering.

```sql
-- UUID v4 (tasodifiy / random)
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ...
);

-- UUID v7 (vaqt tartiblangan / time-ordered) — PostgreSQL 17+
-- yoki pgcrypto kengaytmasi bilan
```

---

**53. Generated Columns nima?**
> **UZ:** Generated Columns — boshqa ustunlar ifodasi asosida avtomatik hisoblanadigan ustun. `STORED` — diskda saqlanadi, `VIRTUAL` — PostgreSQL hali qo'llab-quvvatlamaydi.  
> **EN:** Generated Columns are automatically computed from other column expressions. `STORED` saves to disk; `VIRTUAL` (not yet in PostgreSQL) computes on read.

```sql
CREATE TABLE products (
    price      NUMERIC,
    tax_rate   NUMERIC DEFAULT 0.12,
    price_with_tax NUMERIC GENERATED ALWAYS AS (price * (1 + tax_rate)) STORED
);
```

---

**54. Table Statistics va pg_statistic?**
> **UZ:** PostgreSQL query planneri jadval statistikasiga asoslanib eng yaxshi bajarish rejasini tanlaydi. `ANALYZE` statistikani yangilaydi. `pg_stats` ko'rinishi statistikani ko'rsatadi. Noto'g'ri statistika sekin so'rovlarga olib keladi.  
> **EN:** PostgreSQL's query planner uses table statistics to choose the best execution plan. `ANALYZE` updates statistics. `pg_stats` view shows them. Stale statistics lead to slow queries.

```sql
-- Statistikani yangilash / Update statistics
ANALYZE users;

-- Statistikani ko'rish / View statistics
SELECT attname, n_distinct, correlation
FROM pg_stats
WHERE tablename = 'orders';
```

---

**55. Lateral Join nima?**
> **UZ:** `LATERAL` — subquery ning tashqi so'rovning har bir qatoriga murojaat qilishiga imkon beradi. Har bir qator uchun boshqa qiymat bilan subquery ni chaqirish kerak bo'lganda ishlatiladi.  
> **EN:** `LATERAL` allows a subquery to reference columns from the outer query's current row — useful for calling a subquery with different values per row.

```sql
-- Har bir foydalanuvchining oxirgi 3 ta buyurtmasi
SELECT u.name, o.id, o.total
FROM users u
CROSS JOIN LATERAL (
    SELECT id, total FROM orders
    WHERE user_id = u.id
    ORDER BY created_at DESC
    LIMIT 3
) o;
```

---

## 3. Ilg'or daraja / Advanced

**56. Query Planner qanday ishlaydi?**
> **UZ:** Query Planner statistika (jadval hajmi, ustun kardinaliyasi, korrelyatsiya), mavjud indekslar va konfiguratsiya parametrlari asosida eng arzon bajarish rejasini tanlaydi. `EXPLAIN` orqali rejani ko'rish mumkin.  
> **EN:** The Query Planner uses statistics (table size, column cardinality, correlation), available indexes, and config parameters to choose the cheapest execution plan, viewable via `EXPLAIN`.

---

**57. Parallel Query nima?**
> **UZ:** PostgreSQL katta so'rovlarni bir nechta CPU yadroda parallel bajarishini qo'llab-quvvatlaydi. `max_parallel_workers_per_gather`, `parallel_setup_cost`, `parallel_tuple_cost` parametrlari bilan boshqariladi.  
> **EN:** PostgreSQL supports executing large queries across multiple CPU cores. Controlled by `max_parallel_workers_per_gather`, `parallel_setup_cost`, `parallel_tuple_cost`.

```sql
-- Parallel so'rovni tekshirish / Check parallel query
EXPLAIN SELECT COUNT(*), AVG(total) FROM orders;
-- "Gather" node ko'rsatsa, parallel ishlayapti / "Gather" node = parallel
```

---

**58. pg_cron kengaytmasi nima?**
> **UZ:** `pg_cron` — PostgreSQL ichida cron-uslubida vazifalarni rejalashtirish imkonini beruvchi kengaytma. Tashqi cron yoki task scheduler kerak emas, to'g'ridan-to'g'ri SQL yoki stored procedure ni jadvallab ishga tushirish mumkin.  
> **EN:** `pg_cron` is an extension for scheduling cron-style jobs inside PostgreSQL — no external cron needed, run SQL or stored procedures on a schedule.

```sql
CREATE EXTENSION pg_cron;

-- Har kuni tunda / Every night at midnight
SELECT cron.schedule('nightly-cleanup', '0 0 * * *',
    'DELETE FROM sessions WHERE expires_at < NOW()');
```

---

**59. Tablespace nima?**
> **UZ:** Tablespace — PostgreSQL ob'ektlari (jadvallar, indekslar) saqlanadigan disk joyi. Katta, tez-tez foydalaniladigan jadvallarni SSD ga, eski ma'lumotlarni HDD ga joylashtirish imkonini beradi.  
> **EN:** Tablespace defines the physical storage location for database objects. Allows placing hot tables on SSD and cold data on HDD.

```sql
CREATE TABLESPACE fast_ssd LOCATION '/mnt/ssd/pg_data';
CREATE TABLE hot_table (...) TABLESPACE fast_ssd;
CREATE INDEX idx_hot ON hot_table(id) TABLESPACE fast_ssd;
```

---

**60. PostgreSQL konfiguratsiya asosiy parametrlari?**

| Parametr | Tavsiya | Izoh / Note |
|---|---|---|
| `shared_buffers` | RAM ning 25% | Kesh hajmi / Cache size |
| `work_mem` | 4MB–64MB | Sort/hash uchun / Per sort/hash |
| `maintenance_work_mem` | 256MB+ | VACUUM, index uchun |
| `max_connections` | 100–200 | PgBouncer bilan kamroq |
| `wal_buffers` | 16MB | WAL keshi / WAL cache |
| `checkpoint_completion_target` | 0.9 | Yumshoq checkpoint |
| `effective_cache_size` | RAM ning 75% | Planner uchun hint |
| `random_page_cost` | SSD: 1.1, HDD: 4.0 | Index tanlov uchun |

---

**61. Index Bloat va Table Bloat nima?**
> **UZ:** Bloat — MVCC tufayli yig'ilib qolgan o'lik tuple lar va bo'sh indeks sahifalari. `VACUUM` oddiy bloatni tozalaydi, `VACUUM FULL` jadvalni to'liq qayta yozadi (lock talab qiladi). `pgstattuple` kengaytmasi bloatni o'lchaydi.  
> **EN:** Bloat is accumulated dead tuples and empty index pages due to MVCC. `VACUUM` cleans regular bloat; `VACUUM FULL` rewrites tables (requires lock). Measure with `pgstattuple`.

---

**62. pg_partman kengaytmasi nima?**
> **UZ:** `pg_partman` — PostgreSQL partition larini avtomatik yaratish va boshqarish kengaytmasi. Yangi oy/hafta/kun boshlanishida avtomatik yangi partition yaratadi va eskilarini arxivlaydi.  
> **EN:** `pg_partman` automates partition creation and management — automatically creates new time-based partitions and archives old ones.

---

**63. Logical Decoding va Change Data Capture (CDC)?**
> **UZ:** Logical Decoding — WAL oqimini inson o'qiy oladigan formatga (JSON, Avro) aylantirishga imkon beradi. CDC uchun ishlatiladi. `wal2json`, `pgoutput` kabi plugin lar bilan Kafka, Debezium bilan integratsiya qilinadi.  
> **EN:** Logical Decoding transforms the WAL stream into human-readable formats (JSON, Avro) for CDC. Integrates with Kafka, Debezium via plugins like `wal2json`, `pgoutput`.

---

**64. PostGIS kengaytmasi nima?**
> **UZ:** `PostGIS` — PostgreSQL uchun geografik ob'ektlar qo'llab-quvvatlash kengaytmasi. Nuqta, chiziq, ko'pburchak va boshqa geometrik turlar. Masofani hisoblash, kesishma, koordinata bo'yicha qidirish imkonlari bor.  
> **EN:** `PostGIS` adds geographic object support to PostgreSQL — points, lines, polygons. Supports distance calculation, intersection, coordinate-based search.

```sql
CREATE EXTENSION postgis;

CREATE TABLE locations (
    id   SERIAL PRIMARY KEY,
    name TEXT,
    geom GEOMETRY(Point, 4326)  -- WGS 84 koordinatasi
);

-- 5 km ichidagi joylar / Places within 5km
SELECT name
FROM locations
WHERE ST_DWithin(
    geom::geography,
    ST_MakePoint(69.2401, 41.2995)::geography,  -- Toshkent
    5000  -- metr
);
```

---

**65. Foreign Data Wrapper (FDW) nima?**
> **UZ:** FDW — PostgreSQL dan boshqa ma'lumotlar manbalari (boshqa PostgreSQL, MySQL, Oracle, CSV, REST API) ga SQL orqali murojaat qilish imkonini beruvchi mexanizm.  
> **EN:** FDW allows querying external data sources (other PostgreSQL, MySQL, Oracle, CSV, REST API) via SQL from within PostgreSQL.

```sql
CREATE EXTENSION postgres_fdw;

CREATE SERVER remote_db FOREIGN DATA WRAPPER postgres_fdw
OPTIONS (host '192.168.1.100', dbname 'analytics');

CREATE USER MAPPING FOR current_user
SERVER remote_db OPTIONS (user 'reader', password 'secret');

CREATE FOREIGN TABLE remote_sales (...)
SERVER remote_db OPTIONS (schema_name 'public', table_name 'sales');

SELECT * FROM remote_sales WHERE date > '2025-01-01';
```

---

**66. pgvector kengaytmasi nima?**
> **UZ:** `pgvector` — PostgreSQL da vektor o'xshashlik qidiruvini (vector similarity search) qo'shuvchi kengaytma. AI/ML ilovalar, embedding qidirish, RAG (Retrieval-Augmented Generation) uchun ishlatiladi.  
> **EN:** `pgvector` adds vector similarity search to PostgreSQL — used for AI/ML apps, embedding search, and RAG (Retrieval-Augmented Generation).

```sql
CREATE EXTENSION vector;

CREATE TABLE documents (
    id        SERIAL PRIMARY KEY,
    content   TEXT,
    embedding VECTOR(1536)  -- OpenAI embedding o'lchami
);

CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);

-- Eng o'xshash hujjatlarni topish / Find most similar documents
SELECT content, embedding <=> '[0.1, 0.2, ...]'::vector AS distance
FROM documents
ORDER BY distance
LIMIT 5;
```

---

**67. Row Level Security (RLS) nima?**
> **UZ:** RLS — jadval darajasida foydalanuvchiga ko'ra qatorlarni filtrlash. Har bir foydalanuvchi faqat o'ziga tegishli ma'lumotlarni ko'radi. Multi-tenant ilovalar uchun ideal.  
> **EN:** RLS filters table rows based on the current user — each user sees only their own data. Ideal for multi-tenant applications.

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Foydalanuvchi faqat o'z buyurtmalarini ko'radi
CREATE POLICY user_orders ON orders
    USING (user_id = current_setting('app.current_user_id')::INT);

-- Admin hamma narsani ko'radi
CREATE POLICY admin_all ON orders
    TO admin_role
    USING (TRUE);
```

---

**68. Asynchronous PostgreSQL (asyncpg) Python da?**
> **UZ:** `asyncpg` — Python uchun eng tez async PostgreSQL driver. FastAPI bilan birgalikda ishlatiladi. `SQLAlchemy 2.0` ham async rejimni `asyncpg` orqali qo'llab-quvvatlaydi.  
> **EN:** `asyncpg` is the fastest async PostgreSQL driver for Python. Used with FastAPI. SQLAlchemy 2.0 also supports async mode via `asyncpg`.

```python
import asyncpg

async def main():
    conn = await asyncpg.connect(
        host='localhost', database='mydb',
        user='postgres', password='secret'
    )
    rows = await conn.fetch(
        'SELECT * FROM users WHERE is_active = $1', True
    )
    await conn.close()

# SQLAlchemy async
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

engine = create_async_engine(
    "postgresql+asyncpg://user:pass@localhost/db",
    pool_size=10, max_overflow=20
)
```

---

**69. Explain output ni qanday o'qish?**
> **UZ:** EXPLAIN chiqishidagi asosiy atamalar:
> - **Seq Scan** — to'liq jadval skaneri (indeks yo'q yoki undan foydalanilmayapti)
> - **Index Scan** — indeks orqali qidirish
> - **Index Only Scan** — faqat indeksdan javob (covering index)
> - **Bitmap Heap Scan** — bir nechta indeks natijalarini birlashtirish
> - **Hash Join / Nested Loop / Merge Join** — JOIN strategiyalari
> - **cost=X..Y** — X: birinchi qatorga qiymati, Y: barcha qatorlarga qiymati  
> **EN:** Key EXPLAIN terms: **Seq Scan** (full scan, no index), **Index Scan** (uses index), **Index Only Scan** (answer from index alone), **Bitmap Heap Scan** (combines multiple index results), **cost=X..Y** (X: startup, Y: total).

---

**70. pg_dump va pg_restore nima?**
> **UZ:** `pg_dump` — ma'lumotlar bazasining zaxira nusxasini yaratadi (SQL yoki custom format). `pg_restore` — custom format zaxiralarni tiklaydi. `pg_dumpall` — barcha MB larni zaxiralaydi.  
> **EN:** `pg_dump` creates database backups (SQL or custom format). `pg_restore` restores custom format backups. `pg_dumpall` backs up all databases.

```bash
# Custom format (siqilgan / compressed)
pg_dump -h localhost -U postgres -Fc mydb > mydb.dump

# Tiklash / Restore
pg_restore -h localhost -U postgres -d mydb_new mydb.dump

# SQL format
pg_dump -h localhost -U postgres mydb > mydb.sql

# Parallel tiklash (8 ta jarayon / 8 processes)
pg_restore -j 8 -d mydb_new mydb.dump
```

---

**71. Monitoring uchun muhim PostgreSQL ko'rinishlari?**

```sql
-- Faol so'rovlar / Active queries
SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE state = 'active'
ORDER BY duration DESC;

-- Jadval statistikasi / Table statistics
SELECT schemaname, tablename, n_live_tup, n_dead_tup,
       last_vacuum, last_autovacuum
FROM pg_stat_user_tables ORDER BY n_dead_tup DESC;

-- Indeks ishlatilishi / Index usage
SELECT indexrelname, idx_scan, idx_tup_read
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;  -- Kam ishlatiladigan indekslar / Unused indexes

-- Kesh samaradorligi / Cache hit ratio
SELECT sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) AS ratio
FROM pg_statio_user_tables;
-- > 0.99 bo'lishi kerak / Should be > 0.99
```

---

**72. Unlogged Table nima?**
> **UZ:** `UNLOGGED TABLE` — WAL ga yozmaydigan jadval. Yozish 10x tezroq, lekin server ishlamay qolsa ma'lumotlar yo'qoladi. Vaqtinchalik ma'lumotlar, kesh jadvallar, test uchun mos.  
> **EN:** `UNLOGGED TABLE` skips WAL writes — 10x faster writes but data is lost on server crash. Good for temporary data, caches, and testing.

```sql
CREATE UNLOGGED TABLE temp_calculations (
    id    SERIAL,
    value NUMERIC,
    result NUMERIC
);
```

---

**73. PostgreSQL da Sharding nima?**
> **UZ:** Sharding — ma'lumotlarni bir nechta PostgreSQL server o'rtasida gorizontal taqsimlash. PostgreSQL nativ sharding ni to'liq qo'llab-quvvatlamaydi — buning uchun `Citus`, `pg_shard`, yoki tashqi middleware ishlatiladi.  
> **EN:** Sharding distributes data horizontally across multiple PostgreSQL servers. PostgreSQL doesn't natively support full sharding — use `Citus`, `pg_shard`, or external middleware.

---

**74. Hot Standby va Streaming Replication sozlash?**
> **UZ:** Primary da `wal_level = replica`, `max_wal_senders >= 1`, `hot_standby = on` sozlanadi. Standby da `primary_conninfo` belgilanadi. Standby faqat o'qish (read-only) uchun so'rovlarni qabul qiladi.  
> **EN:** On primary: `wal_level = replica`, `max_wal_senders >= 1`. On standby: configure `primary_conninfo`. Standby accepts read-only queries.

---

**75. Expression Index (Ifoda indeksi) nima?**
> **UZ:** Expression Index — ustun qiymatidan ko'ra funksiya yoki ifoda natijasiga yaratilgan indeks. So'rovda ham xuddi shu ifoda ishlatilganda indeks qo'llaniladi.  
> **EN:** Expression Index is built on a function or expression result, not just a column. The query must use the same expression to use the index.

```sql
-- Katta-kichik harfga bog'liq bo'lmagan email qidirish
CREATE INDEX idx_lower_email ON users(LOWER(email));

-- Bu so'rov indeksdan foydalanadi / This query uses the index:
SELECT * FROM users WHERE LOWER(email) = 'ali@example.com';

-- Yil bo'yicha indeks / Index by year
CREATE INDEX idx_order_year ON orders(EXTRACT(YEAR FROM created_at));
```

---

**76. Alembic bilan PostgreSQL Migration?**
> **UZ:** `Alembic` — SQLAlchemy uchun ma'lumotlar bazasi migratsiya vositasi. FastAPI + PostgreSQL proyektlarida keng ishlatiladi. `alembic revision --autogenerate` model o'zgarishlarini avtomatik migratsiyaga aylantiradi.  
> **EN:** `Alembic` is a database migration tool for SQLAlchemy, widely used in FastAPI + PostgreSQL projects. `alembic revision --autogenerate` auto-generates migrations from model changes.

```bash
alembic init alembic
alembic revision --autogenerate -m "add users table"
alembic upgrade head
alembic downgrade -1
```

---

**77. pg_bouncer sozlash?**
> **UZ:** PgBouncer connection pooler sozlamalarining asosiy parametrlari:
> - `pool_mode`: `session` (har bir session uchun), `transaction` (tranzaksiya uchun — eng ommabop), `statement` (bayonot uchun)
> - `max_client_conn`: maksimal client ulanishlari
> - `default_pool_size`: har bir DB/user juftligi uchun ulanishlar soni  
> **EN:** Key PgBouncer settings: `pool_mode` (`transaction` most popular), `max_client_conn` (max client connections), `default_pool_size` (connections per DB/user pair).

---

**78. TOAST nima?**
> **UZ:** TOAST (The Oversized-Attribute Storage Technique) — PostgreSQL da katta qiymatlarni (8KB dan katta) saqlash mexanizmi. Katta TEXT, BYTEA, JSONB qiymatlarini alohida TOAST jadvalida siqib saqlaydi.  
> **EN:** TOAST (The Oversized-Attribute Storage Technique) handles large values (>8KB) by compressing and storing them in a separate TOAST table — for TEXT, BYTEA, JSONB.

---

**79. Event Trigger nima?**
> **UZ:** Event Trigger — DDL hodisalarida (`CREATE`, `ALTER`, `DROP`) ishga tushadigan trigger. Oddiy trigger DML (INSERT/UPDATE/DELETE) uchun, Event Trigger DDL uchun.  
> **EN:** Event Trigger fires on DDL events (`CREATE`, `ALTER`, `DROP`), unlike regular triggers which fire on DML (INSERT/UPDATE/DELETE).

```sql
CREATE OR REPLACE FUNCTION log_ddl()
RETURNS event_trigger AS $$
BEGIN
    INSERT INTO ddl_audit_log(event, command, executed_at)
    VALUES (tg_event, tg_tag, NOW());
END;
$$ LANGUAGE plpgsql;

CREATE EVENT TRIGGER ddl_logger
ON ddl_command_end
EXECUTE FUNCTION log_ddl();
```

---

**80. pg_upgrade nima?**
> **UZ:** `pg_upgrade` — PostgreSQL major versiyasini (masalan, 14 → 16) ma'lumotlarni to'liq dump/restore qilmasdan yangilash vositasi. `--link` rejimi juda tez, lekin eski versiyaga qaytish imkonsiz.  
> **EN:** `pg_upgrade` upgrades PostgreSQL major versions (e.g., 14→16) without full dump/restore. `--link` mode is very fast but prevents rollback to old version.

---

## 4. Ekspert daraja / Expert

**81. Index Scan vs Bitmap Heap Scan vs Sequential Scan qachon qo'llaniladi?**
> **UZ:** Planner tanlovini belgilovchi omillar: **Seq Scan** — kichik jadvallar yoki ko'p qator qaytarilganda (>15-20% jadval); **Index Scan** — kam qator, random access; **Bitmap Heap Scan** — o'rta miqdordagi qatorlar, bir nechta indeks natijalarini birlashtirish.  
> **EN:** **Seq Scan** — small tables or returning many rows (>15-20% of table). **Index Scan** — few rows, random access. **Bitmap Heap Scan** — medium rows, combining multiple index results.

---

**82. Planner nega indeksni ishlatmayapti?**
> **UZ:** Sabablari: statistika eskirgan (ANALYZE kerak), so'rovda funksiya ishlatilgan (`WHERE UPPER(name) = 'ALI'` — expression index kerak), indeks ustuni implicit cast bilan ishlatilgan, juda ko'p qator qaytarilishi kutilmoqda, `random_page_cost` noto'g'ri sozlangan.  
> **EN:** Reasons: stale statistics (run ANALYZE), function used on column (needs expression index), implicit type cast, too many rows expected, misconfigured `random_page_cost`.

```sql
-- random_page_cost ni SSD uchun tuzatish
SET random_page_cost = 1.1;

-- Yoki postgresql.conf da
-- random_page_cost = 1.1
```

---

**83. N+1 muammosi nima va qanday hal qilish?**
> **UZ:** N+1 — 1 ta asosiy so'rov + N ta qo'shimcha so'rov (har bir natija uchun). ORM da ko'p uchraydi. Yechim: `JOIN` bilan bitta so'rovga birlashtirish, `SELECT IN`, ORM da eager loading (`joinedload`, `selectinload`).  
> **EN:** N+1: 1 main query + N additional queries (one per result). Common in ORMs. Fix: combine with `JOIN`, `SELECT IN`, or ORM eager loading (`joinedload`, `selectinload`).

```python
# SQLAlchemy da N+1 / N+1 in SQLAlchemy
# YOMON / BAD:
users = session.query(User).all()
for user in users:
    print(user.orders)  # Har bir user uchun yangi so'rov / New query per user

# YAXSHI / GOOD:
from sqlalchemy.orm import selectinload
users = session.query(User).options(selectinload(User.orders)).all()
```

---

**84. Sharding vs Partitioning farqi?**
> **UZ:** **Partitioning** — bitta PostgreSQL serverida jadvalni bo'laklarga ajratish (mantiqiy va fizik). **Sharding** — ma'lumotlarni bir nechta PostgreSQL server (node) o'rtasida taqsimlash. Sharding gorizontal kengayish (horizontal scaling) uchun.  
> **EN:** **Partitioning** — splitting a table within one PostgreSQL server. **Sharding** — distributing data across multiple PostgreSQL servers for horizontal scaling.

---

**85. LISTEN/NOTIFY nima?**
> **UZ:** `LISTEN`/`NOTIFY` — PostgreSQL ning o'rnatilgan async xabar almashish mexanizmi. Bir sessiya `LISTEN channel` qiladi, boshqasi `NOTIFY channel, 'payload'` yuboradi. Real-time ogohlantirish, pub/sub uchun ishlatiladi.  
> **EN:** `LISTEN`/`NOTIFY` is PostgreSQL's built-in async messaging. One session `LISTEN`s, another `NOTIFY`s. Used for real-time notifications and pub/sub.

```sql
-- Bir sessiyada / In one session:
LISTEN order_updates;

-- Boshqa sessiyada / In another session:
NOTIFY order_updates, '{"order_id": 42, "status": "shipped"}';
```

```python
# asyncpg bilan / with asyncpg
async def listen_notifications():
    conn = await asyncpg.connect(...)
    await conn.add_listener('order_updates', callback)
```

---

**86. pg_logical va Debezium CDC integratsiyasi?**
> **UZ:** `pg_logical` kengaytmasi yoki PostgreSQL 10+ dagi `pgoutput` plugin bilan Debezium CDC ni sozlash: `wal_level = logical` qo'yish, replikatsiya sloti yaratish, Debezium PostgreSQL connectorini sozlash, Kafka topic larida o'zgarishlarni olish.  
> **EN:** Configure CDC via `pg_logical` or `pgoutput` (PG 10+): set `wal_level = logical`, create replication slot, configure Debezium PostgreSQL connector, receive changes in Kafka topics.

---

**87. Vakuum agressivligi va bloat boshqaruvi?**
> **UZ:** Muammolar: `n_dead_tup` yuqori bo'lsa → autovacuum etmayapti. Yechim: `autovacuum_vacuum_scale_factor` ni kamaytirish, katta jadvallar uchun `autovacuum_vacuum_threshold` ni sozlash, `pg_repack` kengaytmasi bilan lock qilmasdan bloatni tozalash.  
> **EN:** Problem: high `n_dead_tup` → autovacuum not keeping up. Fix: lower `autovacuum_vacuum_scale_factor`, tune `autovacuum_vacuum_threshold` for large tables, use `pg_repack` to clean bloat without locks.

---

**88. TimescaleDB nima?**
> **UZ:** `TimescaleDB` — PostgreSQL uchun vaqt qatorlari ma'lumotlari (time-series) kengaytmasi. Hypertable, continuous aggregation, data retention policies va boshqalar. IoT, monitoring, metrik ma'lumotlar uchun ideal.  
> **EN:** `TimescaleDB` is a PostgreSQL extension for time-series data. Features: hypertables, continuous aggregations, data retention policies. Ideal for IoT, monitoring, metrics.

```sql
CREATE EXTENSION timescaledb;

CREATE TABLE metrics (
    time   TIMESTAMPTZ NOT NULL,
    device TEXT,
    value  DOUBLE PRECISION
);

SELECT create_hypertable('metrics', 'time');

-- Continuous aggregate / Uzluksiz agregat
CREATE MATERIALIZED VIEW hourly_avg
WITH (timescaledb.continuous) AS
SELECT time_bucket('1 hour', time) AS hour, device, AVG(value)
FROM metrics GROUP BY 1, 2;
```

---

**89. Patroni nima?**
> **UZ:** `Patroni` — PostgreSQL uchun yuqori mavjudlik (High Availability) framework. Avtomatik failover, leader election (etcd/ZooKeeper/Consul orqali), configuration management. Kubernetes bilan ham yaxshi ishlaydi.  
> **EN:** `Patroni` is a High Availability framework for PostgreSQL. Provides automatic failover, leader election via etcd/ZooKeeper/Consul, and configuration management. Works well with Kubernetes.

---

**90. PostgreSQL Security hardening?**
> **UZ:** Asosiy xavfsizlik choralari: `pg_hba.conf` da IP filtrlash, SSL majburiy qilish (`ssl = on`), `superuser` uchun alohida hisob, minimal imtiyoz tamoyili, `public` schemani o'chirish, `pg_audit` kengaytmasi bilan audit, parollarni `scram-sha-256` bilan shifrlash.  
> **EN:** Key security measures: IP filtering in `pg_hba.conf`, enforce SSL (`ssl = on`), separate superuser account, least privilege principle, revoke `public` schema, audit with `pg_audit`, use `scram-sha-256` for passwords.

```sql
-- Public schema dan foydalanishni cheklash
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON DATABASE mydb FROM PUBLIC;

-- Minimal imtiyozli foydalanuvchi yaratish
CREATE USER app_user WITH PASSWORD 'strong_password';
GRANT CONNECT ON DATABASE mydb TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
```

---

**91. Write-Ahead Log (WAL) arxivlash va PITR sozlash?**
```bash
# postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'cp %p /mnt/wal_archive/%f'
restore_command = 'cp /mnt/wal_archive/%f %p'

# Ma'lum vaqtga tiklash / Restore to specific time
recovery_target_time = '2025-03-15 14:30:00'
recovery_target_action = 'promote'
```

---

**92. Hyper-optimized so'rov yozish qoidalari?**

```sql
-- ❌ YOMON / BAD
SELECT * FROM orders WHERE EXTRACT(YEAR FROM created_at) = 2025;

-- ✅ YAXSHI / GOOD (indeksdan foydalanadi / uses index)
SELECT * FROM orders
WHERE created_at >= '2025-01-01' AND created_at < '2026-01-01';

-- ❌ YOMON / BAD (har qator uchun subquery / subquery per row)
SELECT name, (SELECT COUNT(*) FROM orders WHERE user_id = u.id) AS cnt
FROM users u;

-- ✅ YAXSHI / GOOD
SELECT u.name, COUNT(o.id) AS cnt
FROM users u LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- ❌ YOMON / BAD (IN subquery katta bo'lsa sekin / slow for large IN)
SELECT * FROM products WHERE id IN (SELECT product_id FROM cart WHERE user_id = 5);

-- ✅ YAXSHI / GOOD
SELECT p.* FROM products p
JOIN cart c ON p.id = c.product_id WHERE c.user_id = 5;
```

---

**93. Fizik va Mantiqiy Replikatsiya farqi?**
> **UZ:** **Fizik (Streaming)** — butun klaster WAL bloklari ko'rinishida replikatsiya qilinadi, standby faqat o'qish uchun. **Mantiqiy (Logical)** — jadval darajasida, ikki yo'nalishli ham mumkin, version upgradelar orasida ham ishlaydi, selektiv jadvallar tanlanadi.  
> **EN:** **Physical (Streaming)** — entire cluster replicated as WAL blocks, standby is read-only. **Logical** — table-level, can be bidirectional, works across versions, selective tables.

---

**94. PostgreSQL da Cursor nima?**
> **UZ:** Cursor — katta natija to'plamini qismlarga bo'lib olish imkonini beradi. Butun natijani xotiraga yuklamasdan qatorlarni bittadan yoki batch da olish mumkin.  
> **EN:** A cursor allows fetching large result sets in chunks without loading everything into memory at once.

```sql
BEGIN;
DECLARE my_cursor CURSOR FOR
    SELECT id, name FROM large_table ORDER BY id;

FETCH 100 FROM my_cursor;  -- 100 ta qator olish / Fetch 100 rows
FETCH 100 FROM my_cursor;  -- Keyingi 100 ta / Next 100

CLOSE my_cursor;
COMMIT;
```

---

**95. pg_stat_bgwriter nima?**
> **UZ:** `pg_stat_bgwriter` — background writer va checkpoint statistikasini ko'rsatadi. `buffers_clean` / `buffers_alloc` nisbati kesh samaradorligini ko'rsatadi. `checkpoints_req` ko'p bo'lsa, `checkpoint_completion_target` yoki `max_wal_size` ni oshirish kerak.  
> **EN:** `pg_stat_bgwriter` shows background writer and checkpoint stats. High `checkpoints_req` means you need to increase `checkpoint_completion_target` or `max_wal_size`.

```sql
SELECT checkpoints_timed, checkpoints_req,
       buffers_checkpoint, buffers_clean,
       buffers_alloc
FROM pg_stat_bgwriter;
```

---

**96. Constraint Exclusion nima?**
> **UZ:** `constraint_exclusion` — Planner jadval yoki partition da CHECK constraint bo'lsa va so'rov shartiga mos kelmasa, o'sha partition ni butunlay o'tkazib yuboradi. Partition pruning uchun muhim.  
> **EN:** `constraint_exclusion` allows the planner to skip partitions whose CHECK constraint cannot match the query conditions — key for partition pruning.

```sql
SET constraint_exclusion = on;

-- Planner faqat mos partition larni skanerlaydi
SELECT * FROM orders WHERE created_at >= '2025-01-01';
```

---

**97. Fillfactor nima?**
> **UZ:** `fillfactor` — jadval sahifasining qancha foizi yangi ma'lumot bilan to'ldirish kerakligini belgilaydi. Default: 100. `UPDATE` ko'p bo'lgan jadvallarda 70-80 qo'yish HOT (Heap Only Tuple) yangilanishlarini tezlashtiradi.  
> **EN:** `fillfactor` sets what percentage of a page to fill with new data (default 100). Setting 70-80 for frequently updated tables enables HOT (Heap Only Tuple) updates — faster updates.

```sql
CREATE TABLE orders (...) WITH (fillfactor = 80);
ALTER TABLE orders SET (fillfactor = 80);
VACUUM FULL orders;  -- Yangi fillfactor bilan qayta yaratish
```

---

**98. Multi-tenant arxitektura PostgreSQL da?**
> **UZ:** Uchta yondashuv:
> 1. **Alohida MB** — har tenant uchun (eng kuchli izolyatsiya, lekin boshqarish qiyin)
> 2. **Alohida Schema** — bitta MB, har tenant uchun schema (o'rta izolyatsiya)
> 3. **Shared Tables + RLS** — bitta schema, `tenant_id` ustuni + Row Level Security (eng ommabop)  
> **EN:** Three approaches: 1. **Separate DB** per tenant (strongest isolation, hardest to manage). 2. **Separate Schema** per tenant in one DB. 3. **Shared Tables + RLS** with `tenant_id` column (most popular).

```sql
-- RLS bilan multi-tenant / Multi-tenant with RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON orders
    USING (tenant_id = current_setting('app.tenant_id')::INT);

-- Har so'rov oldidan / Before each query:
SET app.tenant_id = 42;
SELECT * FROM orders;  -- Faqat tenant 42 ning buyurtmalari
```

---

**99. PostgreSQL 16/17 yangiliklari?**
> **UZ:** Muhim yangiliklar:
> - **PG 16:** Logical replication from standby, `pg_stat_io`, parallel `FULL` va `RIGHT` join, `COPY FROM` WHERE, `VACUUM SKIP_DATABASE_STATS`
> - **PG 17:** `MERGE` RETURNING, `COPY` progress reporting, `VACUUM` improvements, `JSON_TABLE`, yaxshilangan `EXPLAIN` format  
> **EN:** PG 16: logical replication from standby, `pg_stat_io`, parallel FULL/RIGHT joins, `COPY FROM WHERE`. PG 17: `MERGE` RETURNING, `COPY` progress, improved `VACUUM`, `JSON_TABLE`, better `EXPLAIN`.

---

**100. PostgreSQL da eng yaxshi amaliyotlar (Best Practices)?**

```sql
-- ✅ 1. Har doim timestamptz ishlatish (UTC saqlash)
created_at TIMESTAMPTZ DEFAULT NOW()

-- ✅ 2. Katta jadvallar uchun partial index
CREATE INDEX idx_pending ON orders(created_at) WHERE status = 'pending';

-- ✅ 3. Tranzaksiya ichida DDL
BEGIN;
ALTER TABLE users ADD COLUMN phone TEXT;
UPDATE users SET phone = 'N/A' WHERE phone IS NULL;
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;
COMMIT;

-- ✅ 4. EXPLAIN ANALYZE ni muntazam ishlatish
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) SELECT ...;

-- ✅ 5. Connection timeout va statement timeout
SET statement_timeout = '30s';
SET lock_timeout = '5s';

-- ✅ 6. Indeks yaratishda CONCURRENTLY ishlatish (lock yo'q)
CREATE INDEX CONCURRENTLY idx_new ON large_table(column);

-- ✅ 7. Katta jadvallarni partition qilish
-- ✅ 8. pg_stat_statements bilan sekin so'rovlarni monitoring
-- ✅ 9. PgBouncer yoki pgpool-II bilan connection pooling
-- ✅ 10. WAL arxivlash + PITR sozlash
```

---

## 📋 Tezkor Yo'l-Yo'riq / Quick Cheatsheet

### Tizim ko'rinishlari / System Views
```sql
pg_stat_activity      -- Faol sessiyalar / Active sessions
pg_stat_user_tables   -- Jadval statistikasi / Table stats
pg_stat_user_indexes  -- Indeks statistikasi / Index stats
pg_statio_user_tables -- Kesh statistikasi / Cache stats
pg_stat_statements    -- So'rov statistikasi / Query stats
pg_locks              -- Joriy locklar / Current locks
pg_stat_bgwriter      -- Background writer stats
pg_stat_replication   -- Replikatsiya holati / Replication status
```

### Muhim konfiguratsiya fayllari / Key Config Files
```
postgresql.conf   -- Asosiy konfiguratsiya / Main config
pg_hba.conf       -- Autentifikatsiya qoidalari / Auth rules
pg_ident.conf     -- Foydalanuvchi xaritalash / User mapping
recovery.conf     -- Tiklash (PG 12 gacha) / Recovery (pre-PG 12)
```

### Keng ishlatiladigan kengaytmalar / Popular Extensions
```sql
pg_stat_statements  -- So'rov monitoring / Query monitoring
pgcrypto            -- Kriptografiya / Cryptography
uuid-ossp           -- UUID generatsiya / UUID generation
pg_trgm             -- Trigram qidirish / Trigram search
postgis             -- Geografik ma'lumot / Geographic data
pgvector            -- Vektor qidirish / Vector search
timescaledb         -- Vaqt qatorlari / Time-series
pg_cron             -- Vazifa rejalashtirish / Job scheduling
pg_partman          -- Partition boshqaruvi / Partition management
pg_repack           -- Bloatsiz defrag / Bloat-free defrag
```

### Foydali buyruqlar / Useful Commands
```bash
psql -h host -U user -d dbname   # Ulanish / Connect
\l                                 # MB lar ro'yxati / List DBs
\dt                                # Jadvallar / Tables
\di                                # Indekslar / Indexes
\d tablename                       # Jadval tuzilmasi / Table structure
\timing                            # So'rov vaqtini ko'rsatish / Show query time
\copy                              # COPY psql orqali / COPY via psql
\x                                 # Kengaytirilgan ko'rinish / Expanded view
```

---

*Tayyorlagan / Prepared by: Alyorjon | PostgreSQL 16/17 ga asoslanib*