# 🧪 SQL Interaktiv Quiz — Self-Test MCQ

### Ikki tilli qo'llanma / Bilingual Reference

> **Daraja / Level:** 🟢 Basic → 🟡 Intermediate → 🔴 Advanced → ⚫ Expert
> **Format:** Har bir savolda 4 variant, faqat bittasi to'g'ri. Javoblarni oldindan ko'rmang — avval yeching! / Each question has 4 options, only one correct. Don't peek at the answer key — attempt first!
> **Javoblar:** Fayl oxirida / **Answers:** at the end of the file

---

## 🟢 Basic (1–10)

**1.** `SELECT DISTINCT city FROM users;` nima qiladi? / What does this query do?
A) Barcha shaharlarni tartiblab chiqaradi / Sorts all cities
B) Takrorlanmagan (yagona) shaharlarni qaytaradi / Returns unique cities
C) Shaharlar sonini hisoblaydi / Counts cities
D) Faqat birinchi shaharni qaytaradi / Returns only the first city

**2.** Qaysi buyruq jadval tuzilmasini saqlab, barcha qatorlarni o'chiradi? / Which command removes all rows but keeps the table structure?
A) `DROP TABLE`
B) `DELETE TABLE`
C) `TRUNCATE TABLE`
D) `REMOVE TABLE`

**3.** `WHERE` va `HAVING` orasidagi asosiy farq nima? / What's the key difference between `WHERE` and `HAVING`?
A) Hech qanday farq yo'q / No difference
B) `WHERE` guruhlardan keyin, `HAVING` guruhlardan oldin ishlaydi / `WHERE` runs after grouping, `HAVING` before
C) `WHERE` qatorlarni GROUP BY dan oldin, `HAVING` guruhlarni GROUP BY dan keyin filtrlaydi / `WHERE` filters rows before GROUP BY, `HAVING` filters groups after
D) `HAVING` faqat `INSERT` da ishlatiladi / `HAVING` is only used in `INSERT`

**4.** `PRIMARY KEY` va `UNIQUE` cheklovi orasidagi farq? / Difference between `PRIMARY KEY` and `UNIQUE` constraint?
A) Jadvalda bir nechta PRIMARY KEY bo'lishi mumkin / A table can have multiple PRIMARY KEYs
B) PRIMARY KEY NULL qabul qilmaydi va jadvalda faqat bitta bo'ladi, UNIQUE NULL ga ruxsat beradi va bir nechta bo'lishi mumkin / PRIMARY KEY disallows NULL and is unique per table; UNIQUE allows NULL and can appear multiple times
C) Ular bir xil narsa / They are identical
D) UNIQUE faqat raqamli ustunlar uchun / UNIQUE only works on numeric columns

**5.** `INNER JOIN` nima qaytaradi? / What does `INNER JOIN` return?
A) Chap jadvaldagi barcha qatorlar / All rows from the left table
B) Ikkala jadvalda mos keladigan qatorlar / Only rows matching in both tables
C) Ikkala jadvaldagi barcha qatorlar / All rows from both tables
D) Faqat mos kelmagan qatorlar / Only non-matching rows

**6.** `COUNT(*)` bilan `COUNT(column_name)` farqi? / Difference between `COUNT(*)` and `COUNT(column_name)`?
A) Farq yo'q / No difference
B) `COUNT(*)` barcha qatorlarni sanaydi, `COUNT(column_name)` faqat NULL bo'lmagan qiymatlarni sanaydi / `COUNT(*)` counts all rows, `COUNT(column_name)` counts only non-NULL values
C) `COUNT(column_name)` tezroq ishlaydi / `COUNT(column_name)` is always faster
D) `COUNT(*)` faqat raqamlar uchun / `COUNT(*)` only works on numbers

**7.** Quyidagilardan qaysi biri DDL (Data Definition Language) buyrug'i? / Which of these is a DDL command?
A) `SELECT`
B) `UPDATE`
C) `ALTER TABLE`
D) `INSERT`

**8.** `NULL = NULL` ifodasining natijasi nima? / What does `NULL = NULL` evaluate to?
A) `TRUE`
B) `FALSE`
C) `NULL`
D) Xatolik beradi / Throws an error

**9.** `LIMIT 10 OFFSET 20` nima qiladi? / What does `LIMIT 10 OFFSET 20` do?
A) Birinchi 10 ta qatorni qaytaradi / Returns the first 10 rows
B) 20-qatordan boshlab 10 ta qatorni qaytaradi (21–30) / Skips 20 rows, returns the next 10 (rows 21–30)
C) 10-qatordan boshlab 20 ta qatorni qaytaradi / Skips 10 rows, returns 20
D) Xatolik beradi / Throws an error

**10.** `FOREIGN KEY ... ON DELETE CASCADE` nima qiladi? / What does `FOREIGN KEY ... ON DELETE CASCADE` do?
A) Asosiy yozuvni o'chirishni bloklaydi / Blocks deletion of the referenced row
B) Bog'liq yozuvlarni NULL ga o'rnatadi / Sets related rows to NULL
C) Asosiy yozuv o'chirilganda bog'liq yozuvlarni ham avtomatik o'chiradi / Automatically deletes related rows when the referenced row is deleted
D) Hech narsa qilmaydi / Does nothing

---

## 🟡 Intermediate (11–20)

**11.** `RANK()` va `DENSE_RANK()` farqi? / Difference between `RANK()` and `DENSE_RANK()`?
A) Farq yo'q / No difference
B) `RANK()` teng qiymatlardan keyin oraliq qoldiradi, `DENSE_RANK()` qoldirmaydi / `RANK()` leaves gaps after ties, `DENSE_RANK()` doesn't
C) `DENSE_RANK()` faqat PARTITION BY bilan ishlaydi / `DENSE_RANK()` only works with PARTITION BY
D) `RANK()` faqat raqamlar uchun / `RANK()` only works on numbers

**12.** Quyidagi so'rovlardan qaysi biri "hech qachon buyurtma bermagan mijozlar"ni topishda **xavfli**? / Which approach is **risky** for finding "customers who never ordered"?
A) `LEFT JOIN ... WHERE orders.id IS NULL`
B) `NOT EXISTS (SELECT 1 FROM orders WHERE ...)`
C) `WHERE customer_id NOT IN (SELECT customer_id FROM orders)` — agar `customer_id` da NULL bo'lsa / if `customer_id` can be NULL
D) Barchasi bir xil darajada xavfsiz / All are equally safe

**13.** CTE (`WITH`) ning asosiy afzalligi nima? / Main benefit of a CTE (`WITH`)?
A) Har doim so'rovni tezlashtiradi / Always speeds up the query
B) Murakkab so'rovni o'qilishi oson, nomlangan qismlarga ajratadi / Breaks a complex query into readable, named parts
C) Faqat `INSERT` bilan ishlaydi / Only works with `INSERT`
D) Indeks yaratadi / Creates an index

**14.** `GROUP BY` dan keyin `SELECT` da agregat bo'lmagan ustunni ishlatish uchun nima kerak? / What's required to select a non-aggregated column alongside `GROUP BY`?
A) Hech narsa, har doim ishlaydi / Nothing, it always works
B) U ustun `GROUP BY` ro'yxatida bo'lishi kerak / That column must appear in the `GROUP BY` list
C) `HAVING` ishlatish kerak / Must use `HAVING`
D) `DISTINCT` qo'shish kerak / Must add `DISTINCT`

**15.** `EXPLAIN ANALYZE` nima qiladi (`EXPLAIN` dan farqi)? / What does `EXPLAIN ANALYZE` do (vs plain `EXPLAIN`)?
A) Faqat rejani ko'rsatadi, bajarmaydi / Only shows the plan, doesn't execute
B) So'rovni haqiqatan bajarib, haqiqiy vaqt va rejani ko'rsatadi / Actually executes the query and shows real timing alongside the plan
C) So'rovni optimallashtiradi / Optimizes the query automatically
D) Faqat indekslarni ko'rsatadi / Only lists indexes

**16.** JSONB ning JSON dan afzalligi nima PostgreSQL da? / Advantage of JSONB over JSON in PostgreSQL?
A) JSONB matn sifatida saqlanadi / JSONB is stored as plain text
B) JSONB ikkilik formatda saqlanadi, indekslash mumkin, so'rovlar tezroq / JSONB is stored in binary, supports indexing, faster queries
C) JSON har doim tezroq / JSON is always faster
D) Farq yo'q / No difference

**17.** Composite (ko'p ustunli) indeksda "leftmost prefix rule" nimani anglatadi? / What does the "leftmost prefix rule" mean for composite indexes?
A) Indeks faqat oxirgi ustun bo'yicha ishlaydi / The index only works on the last column
B) Indeks ustunlar tartibida chapdan boshlab izchil ishlatilganda samarali bo'ladi / The index is effective when columns are used left-to-right in order
C) Ustunlar tartibi ahamiyatsiz / Column order doesn't matter
D) Faqat `ORDER BY` uchun ishlatiladi / Only usable in `ORDER BY`

**18.** `UPSERT` (`INSERT ... ON CONFLICT`) nima uchun ishlatiladi? / What is `UPSERT` (`INSERT ... ON CONFLICT`) used for?
A) Faqat yangi yozuv qo'shish uchun / Only for inserting new rows
B) Yozuv mavjud bo'lsa yangilash, yo'q bo'lsa qo'shish uchun / Insert if the row doesn't exist, update if it does
C) Yozuvlarni o'chirish uchun / For deleting rows
D) Indeks yaratish uchun / For creating indexes

**19.** PostgreSQL da `pg_stat_statements` nima uchun ishlatiladi? / What is `pg_stat_statements` used for in PostgreSQL?
A) Ma'lumotlarni shifrlash uchun / To encrypt data
B) So'rovlarning ishlash statistikasi to'plash va optimizatsiya qilish uchun / To collect query execution statistics for tuning and optimization
C) Jadval yaratish uchun / To create tables
D) Cheklovlarni aniqlash uchun / To define constraints

**20.** Transaction ichida `READ COMMITTED` va `REPEATABLE READ` orasidagi asosiy farq nima? / What is the key difference between `READ COMMITTED` and `REPEATABLE READ` isolation levels?
A) Hech qanday farq yo'q / There is no difference
B) `READ COMMITTED` har bir o'qishda eng yangi commit qilingan qiymatni ko'rishi mumkin, `REPEATABLE READ` tranzaksiya davomida bir xil snapshotdan foydalanadi / `READ COMMITTED` can see the latest committed data on each read, while `REPEATABLE READ` uses a consistent snapshot for the transaction
C) `REPEATABLE READ` faqat `SELECT` da ishlaydi / `REPEATABLE READ` only works with `SELECT`
D) `READ COMMITTED` tranzaksiyani avtomatik bekor qiladi / `READ COMMITTED` automatically aborts the transaction

---

## 🔴 Advanced (21–27)

**21.** `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` window frame nimani anglatadi? / What does this window frame mean?
A) Faqat joriy qator / Only the current row
B) Bo'lim boshidan joriy qatorgacha — yugurma jami uchun ishlatiladi / From the start of the partition to the current row — used for running totals
C) Butun jadval / The entire table
D) Faqat keyingi qator / Only the next row

**22.** Correlated subquery nima uchun odatda sekinroq ishlaydi? / Why is a correlated subquery usually slower?
A) U hech qachon indeks ishlatmaydi / It never uses an index
B) Tashqi so'rovning har bir qatori uchun qayta bajariladi / It re-executes once per row of the outer query
C) U faqat `INSERT` bilan ishlaydi / It only works with `INSERT`
D) PostgreSQL ularni qo'llab-quvvatlamaydi / PostgreSQL doesn't support them

**23.** MVCC (Multi-Version Concurrency Control) nimani ta'minlaydi? / What does MVCC provide?
A) Ustunlarni avtomatik indekslaydi / Automatically indexes columns
B) O'qish va yozish operatsiyalarini bir-birini bloklamasdan bajarish imkonini beradi / Allows reads and writes to proceed without blocking each other
C) Barcha so'rovlarni keshlaydi / Caches all queries
D) SQL sintaksisini tekshiradi / Validates SQL syntax

**24.** N+1 muammosi qayerda ko'proq uchraydi va qanday hal qilinadi? / Where does the N+1 problem commonly occur and how is it fixed?
A) DDL buyruqlarida; `DROP TABLE` bilan hal qilinadi / In DDL commands; fixed with `DROP TABLE`
B) ORM da lazy-loading tufayli; `JOIN`/eager loading bilan hal qilinadi / In ORMs due to lazy-loading; fixed with `JOIN`/eager loading
C) Faqat `CREATE INDEX` da; VACUUM bilan hal qilinadi / Only in `CREATE INDEX`; fixed with VACUUM
D) Hech qachon yuzaga kelmaydi / It never occurs

**25.** Partial index qachon ishlatiladi? / When is a partial index useful?
A) Barcha ustunlarni indekslash kerak bo'lganda / When you need to index all columns
B) Faqat jadval qatorlarining kichik, muhim qismini (masalan, `WHERE status='pending'`) tez-tez so'rov qilganda / When frequently querying a small, important subset of rows (e.g., `WHERE status='pending'`)
C) Har doim, chunki u umumiy indeksdan tezroq / Always, because it's inherently faster than a full index
D) Faqat PRIMARY KEY ustunlarida / Only on PRIMARY KEY columns

**26.** `Recursive CTE` ning tipik qo'llanilishi qaysi? / Typical use case for a `Recursive CTE`?
A) Oddiy `WHERE` filtrlash / Simple `WHERE` filtering
B) Ierarxik ma'lumotlar — masalan, tashkilot tuzilmasi yoki kategoriya daraxti / Hierarchical data — e.g., org charts or category trees
C) Jadvaldan qator o'chirish / Deleting rows from a table
D) Ustun turi o'zgartirish / Changing a column's type

**27.** Nega `NOT IN` NULL qiymatlar mavjud bo'lganda xavfli hisoblanadi? / Why is `NOT IN` risky when NULLs are present?
A) U xatolik chiqaradi / It throws an error
B) Ro'yxatda birorta NULL bo'lsa, butun `NOT IN` sharti hech qachon TRUE bo'lmaydi va natija bo'sh qaytadi / If the list contains any NULL, the entire `NOT IN` condition never evaluates TRUE, so the result set is empty
C) U faqat matn ustunlarida ishlaydi / It only works on text columns
D) Xavfli emas, har doim xavfsiz / It's not risky, always safe

---

## ⚫ Expert (28–30)

**28.** Table partitioning va sharding orasidagi asosiy farq? / Key difference between table partitioning and sharding?
A) Ular bir xil narsa / They are the same thing
B) Partitioning bitta serverda jadvalni bo'lish, sharding ma'lumotni bir nechta server orasida taqsimlash / Partitioning splits a table within one server; sharding distributes data across multiple servers
C) Sharding faqat MySQL da mavjud / Sharding only exists in MySQL
D) Partitioning ma'lumotni yo'qotadi / Partitioning loses data

**29.** `Deadlock` yuzaga kelganda PostgreSQL nima qiladi? / What does PostgreSQL do when a deadlock occurs?
A) Butun serverni to'xtatadi / Shuts down the entire server
B) Ikkala tranzaksiyani ham bekor qiladi / Aborts both transactions
C) Deadlockni avtomatik aniqlab, tranzaksiyalardan birini bekor qiladi (xatolik bilan) / Automatically detects it and aborts one of the transactions (with an error)
D) Cheksiz kutadi / Waits indefinitely

**30.** Nega `SELECT *` ishlatish katta jadvallarda production kodida yomon amaliyot hisoblanadi? / Why is `SELECT *` considered bad practice in production code on large tables?
A) SQL standartiga zid / It violates the SQL standard
B) Kerak bo'lmagan ustunlarni tarmoq orqali uzatadi, Index-Only Scan imkoniyatini yo'qotadi, sxema o'zgarganda kodni buzishi mumkin / Transfers unneeded columns over the network, defeats Index-Only Scans, and can silently break code when the schema changes
C) Har doim sintaksis xatosi beradi / It always causes a syntax error
D) Faqat `INSERT` bilan ishlatilishi mumkin / It can only be used with `INSERT`

---

## ✅ Javoblar / Answer Key

| #   | Javob | #   | Javob | #   | Javob |
| --- | ----- | --- | ----- | --- | ----- |
| 1   | B     | 11  | B     | 21  | B     |
| 2   | C     | 12  | C     | 22  | B     |
| 3   | C     | 13  | B     | 23  | B     |
| 4   | B     | 14  | B     | 24  | B     |
| 5   | B     | 15  | B     | 25  | B     |
| 6   | B     | 16  | B     | 26  | B     |
| 7   | C     | 17  | B     | 27  | B     |
| 8   | C     | 18  | B     | 28  | B     |
| 9   | B     | 19  | B     | 29  | C     |
| 10  | C     | 20  | B     | 30  | C     |

**Natijangizni baholang / Score yourself:**

- 27–30 to'g'ri: Ekspert daraja 🏆 / Expert level
- 21–26 to'g'ri: Ilg'or daraja 🔴 / Advanced level
- 14–20 to'g'ri: O'rta daraja 🟡 / Intermediate level
- <14 to'g'ri: `sql/BASICS.md` va `sql/postgresql_interviews.md` ni qayta ko'rib chiqing 🟢 / Review `sql/BASICS.md` and `sql/postgresql_interviews.md`

---

_Tayyorlagan / Prepared by: Alyorjon | interactive_quiz_tester agenti asosida_
