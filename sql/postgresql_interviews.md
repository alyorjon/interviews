# 🐘 PostgreSQL — intervyu savollari va javoblari
### Ikki tilli qo'llanma / Bilingual Reference

> **Nima bu:** PostgreSQL'ga xos savollar — boshlang'ichdan ekspertgacha. Umumiy SQL mavzulari (JOIN, NULL, subquery, CTE, window funksiyalar, WHERE/HAVING, ACID, izolyatsiya darajalari, UPSERT) takrorlanmasligi uchun `sql/BASICS.md` da; amaliy "nima qilasiz?" ssenariylari — `practical/postgresql.md` da.  
> **Har bir javob tartibi:** oddiy tilda → batafsilroq (UZ/EN va misol) → intervyuda qanday aytasiz.  
> **Versiya:** PostgreSQL 18 (2026-yil sentabr; 19 — beta).

---

# 🟢 Asosiy tushunchalar / Basics

## Q1. PostgreSQL nima? / What is PostgreSQL?

**Oddiy qilib aytganda:** PostgreSQL — bepul, ochiq kodli va juda ishonchli ma'lumotlar bazasi. U oddiy jadvallardan tashqari JSON, massivlar, to'liq matnli qidiruv, geografik ma'lumot va vektorlar bilan ham ishlay oladi, kengaytmalar orqali esa yangi imkoniyatlar qo'shiladi.

**Batafsilroq:**

> **UZ:** PostgreSQL — kuchli, ochiq manbali ob'ektga-relyatsion ma'lumotlar bazasi tizimi. 30+ yillik faol rivojlanishga ega va ishonchlilik, xususiyatlar to'plami va unumdorlik jihatidan yuqori obro'ga ega.  
> **EN:** PostgreSQL is a powerful, open-source object-relational database system with over 30 years of active development. It is known for reliability, feature richness, and performance.

**Intervyuda shunday ayting:** "PostgreSQL — ochiq kodli obyekt-relyatsion baza: to'liq ACID, MVCC, boy tiplar va kengaytmalar ekotizimi. Ko'p loyihalar uchun standart tanlovim, chunki u relyatsion ma'lumotni ham, JSONB, to'liq matnli qidiruv va pgvector orqali yarim-tuzilgan ma'lumot va vektorlarni ham bitta tizimda yopadi."

---

## Q2. PostgreSQL va MySQL o'rtasidagi asosiy farqlar? / What are the main differences between PostgreSQL and MySQL?

**Oddiy qilib aytganda:** Ikkalasi ham mashhur relyatsion baza. PostgreSQL ko'proq imkoniyat va qat'iy qoidalar bilan tanilgan (JSONB, kengaytmalar, murakkab so'rovlar), MySQL esa oddiyligi va keng hostinglarda mavjudligi bilan. Bugun ikkalasida ham window funksiyalar va CTE bor.

**Batafsilroq:**

> **UZ:** PostgreSQL to'liq ACID muvofiq, murakkab so'rovlar, JSON, CTE, window funksiyalar, full-text search va kengaytmalarni yaxshiroq qo'llab-quvvatlaydi. MySQL oddiyligi va keng hosting qo'llovi bilan mashhur; zamonaviy MySQL 8 ham window funksiyalar va CTE'ni qo'llaydi.  
> **EN:** PostgreSQL is fully ACID-compliant, better supports complex queries, JSON, CTEs, window functions, full-text search, and extensions. MySQL is known for simplicity and broad hosting support; modern MySQL 8 also supports window functions and CTEs.

| | PostgreSQL | MySQL |
|---|---|---|
| Litsenziya | PostgreSQL (MIT-like) | GPL / Commercial |
| JSON | `jsonb` + GIN indeks | `JSON` tipi bor, GIN kabi indeks yo'q |
| Window funksiyalar | ✅ | ✅ (8.0+) |
| Full ACID | ✅ | Faqat InnoDB |
| Kengaytmalar | Ko'p (PostGIS, pg_trgm) | Kam |

**Intervyuda shunday ayting:** "Farq tafsilotlarda: PostgreSQL'da tranzaksiyali DDL, boy tiplar (JSONB, massivlar, range), kuchli indeks turlari (GIN, GiST, BRIN) va kengaytmalar bor; MySQL/InnoDB ham ACID, lekin ekotizim va operatsion tajriba boshqacha. Tanlovni jamoa tajribasi, kerakli imkoniyatlar va infratuzilma bo'yicha qilaman."

---

## Q3. PostgreSQL da ma'lumot turlari (Data Types)? / What data types does PostgreSQL offer?

**Oddiy qilib aytganda:** Har ustunga to'g'ri tur tanlash — to'g'ri quti tanlashdek: pul uchun `numeric` (float emas!), vaqt uchun `timestamptz` (mintaqa bilan), matn uchun `text`, noyob ID uchun `bigint` yoki `uuid`, moslashuvchan ma'lumot uchun `jsonb`. To'g'ri tur xatolarni oldini oladi va joyni tejaydi.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Asosiy tamoyillar: pul — `numeric`, vaqt — doim `timestamptz`, matn — `text` (+ `CHECK`), ID — `bigint GENERATED ALWAYS AS IDENTITY` yoki `uuid`, yarim-tuzilgan ma'lumot — `jsonb`. `serial` o'rniga identity ustunlarini afzal ko'raman — ular SQL standartiga mos va huquqlar bilan muammo chiqarmaydi."

---

## Q4. Schema nima? / What is a schema?

**Oddiy qilib aytganda:** Schema — bitta baza ichidagi papka: jadvallar, funksiyalar va boshqa obyektlar nomlar bo'yicha guruhlanadi. `hr.employees` va `sales.employees` bir bazada to'qnashmasdan yashay oladi. Standart papka — `public`.

**Batafsilroq:**

> **UZ:** Schema — PostgreSQL da ma'lumotlar bazasi ichidagi mantiqiy nom maydoni. Jadvallar, ko'rinishlar, funksiyalar va boshqa ob'ektlarni guruhlaydi. Default schema `public`.  
> **EN:** A schema is a logical namespace within a PostgreSQL database that groups tables, views, functions, and other objects. Default schema is `public`.

```sql
CREATE SCHEMA hr;
CREATE TABLE hr.employees (...);
SET search_path TO hr, public;
```

**Intervyuda shunday ayting:** "Schema — nomlar maydoni va ruxsatlar chegarasi. Uni modullarni ajratish yoki ruxsatlarni guruhlash uchun ishlataman. `search_path` ga ehtiyot bo'laman: xavfsizlik uchun funksiyalarda uni aniq belgilayman va `public` schema'da hammaga `CREATE` huquqini bermayman (PostgreSQL 15 dan bu standart)."

---

## Q5. Sequence nima va identity ustunlari bilan qanday bog'liq? / What is a sequence and how does it relate to identity columns?

**Oddiy qilib aytganda:** Sequence — ketma-ket raqam beruvchi hisoblagich: har so'raganda keyingi raqamni beradi (1, 2, 3...). Jadvalning ID ustuni odatda shunday hisoblagichdan to'ldiriladi. Muhim: raqamlarda **bo'shliqlar** bo'lishi normal — bekor qilingan tranzaksiya olgan raqam qaytarilmaydi.

**Batafsilroq:**

> **UZ:** Sequence — ketma-ket yagona raqamlar yaratuvchi ob'ekt. `SERIAL` va `BIGSERIAL` ma'lumot turlari ichida avtomatik sequence yaratadi. `nextval()`, `currval()`, `setval()` funksiyalari bilan boshqariladi.  
> **EN:** A sequence generates unique sequential numbers. `SERIAL`/`BIGSERIAL` types create sequences automatically. Controlled via `nextval()`, `currval()`, `setval()`.

```sql
CREATE SEQUENCE order_seq START 1000 INCREMENT 1;
SELECT nextval('order_seq');  -- 1000, 1001, ...

-- Yoki SERIAL orqali
CREATE TABLE orders (id SERIAL PRIMARY KEY);
```

**Intervyuda shunday ayting:** "Sequence tranzaksiyadan tashqarida ishlaydi, shuning uchun bo'shliqlar kafolatlangan normal holat — ketma-ketlikka tayanadigan biznes mantiq (hisob-faktura raqami) uchun alohida yechim kerak. Yangi jadvallarda `serial` o'rniga `GENERATED ALWAYS AS IDENTITY` ishlataman."

---

## Q6. Indeks nima va PostgreSQL'da qanday indeks turlari bor? / What is an index and which index types does PostgreSQL have?

**Oddiy qilib aytganda:** Indeks — kitob oxiridagi ko'rsatkich: kerakli qatorni butun jadvalni o'qimasdan topadi. PostgreSQL'da har xil vazifa uchun har xil ko'rsatkich bor: oddiy tartiblangan (B-tree), JSON va massivlar ichidan qidirish uchun (GIN), geografiya uchun (GiST), vaqt bo'yicha tartiblangan ulkan jadvallar uchun juda ixcham (BRIN).

**Batafsilroq:**

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

**Qo'shimcha — INDEX nima va nima uchun kerak:**

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

**Intervyuda shunday ayting:** "Standart — B-tree: tenglik, diapazon, saralash. GIN — ko'p qiymatli ustunlar (JSONB, massiv, tsvector, trigram). GiST — geometriya, range, yaqinlik qidiruvi. BRIN — fizik tartibga mos katta jadvallar uchun juda kichik indeks. Hash — faqat tenglik, kam ishlatiladi. Har indeks yozishni sekinlashtiradi, shuning uchun faqat so'rovlar talab qilganini qo'shaman."

---

## Q7. VIEW nima? / What is a view?

**Oddiy qilib aytganda:** View — saqlab qo'yilgan `SELECT` so'rovi, unga jadval kabi murojaat qilasiz. U ma'lumotni o'zi saqlamaydi — har murojaatda so'rov qaytadan bajariladi. Murakkab so'rovni yashirish va foydalanuvchilarga faqat kerakli ustunlarni ko'rsatish uchun qulay.

**Batafsilroq:**

> **UZ:** View — saqlangan SELECT so'rovi. Real ma'lumot saqlamaydi (oddiy view da), lekin jadval kabi so'ralishi mumkin. Murakkab so'rovlarni soddalashtiradi va xavfsizlik qatlamini ta'minlaydi.  
> **EN:** A view is a stored SELECT query. Regular views don't store data but can be queried like tables. They simplify complex queries and provide a security layer.

```sql
CREATE VIEW active_users AS
SELECT id, name, email
FROM users
WHERE is_active = TRUE;

SELECT * FROM active_users;
```

**Intervyuda shunday ayting:** "Oddiy view — nomlangan so'rov: tezlik bermaydi, lekin interfeysni soddalashtiradi va ruxsat qatlami bo'ladi. Xavfsizlik uchun view'da `security_barrier` yoki PostgreSQL 15+ dagi `security_invoker` ni tushunish kerak. Oddiy view'lar orqali yozish ham mumkin (updatable view)."

---

## Q8. Materialized View nima va oddiy View dan farqi? / What is a materialized view and how does it differ from a view?

**Oddiy qilib aytganda:** Materialized view — so'rov **natijasi**ni diskda saqlaydi, xuddi fotosurat kabi. O'qish juda tez, lekin surat eskiradi — uni `REFRESH` bilan qayta olish kerak. Og'ir hisobotlar uchun qulay.

**Batafsilroq:**

> **UZ:** Materialized View so'rov natijasini diskda saqlaydi — tez o'qish imkonini beradi, lekin ma'lumotlar eskirishi mumkin. `REFRESH MATERIALIZED VIEW` bilan yangilanadi.  
> **EN:** Materialized View physically stores the query result on disk — fast reads but data can become stale. Refreshed with `REFRESH MATERIALIZED VIEW`.

```sql
CREATE MATERIALIZED VIEW sales_summary AS
SELECT date_trunc('month', created_at) as month,
       SUM(total) as revenue
FROM orders GROUP BY 1;

-- CONCURRENTLY uchun unique index shart / Required for CONCURRENTLY refresh
CREATE UNIQUE INDEX ON sales_summary (month);

-- Yangilash / Refresh
REFRESH MATERIALIZED VIEW CONCURRENTLY sales_summary;
```

**Intervyuda shunday ayting:** "Materialized view og'ir agregatlarni oldindan hisoblaydi. `REFRESH ... CONCURRENTLY` o'quvchilarni bloklamaydi, lekin unique indeks talab qiladi. Yangilash chastotasini biznes qanchalik eskirgan ma'lumotga chidashiga qarab tanlayman — masalan, `pg_cron` bilan har 5 daqiqada."

---

## Q9. DISTINCT qanday ishlaydi? / How do DISTINCT and DISTINCT ON work?

**Oddiy qilib aytganda:** `DISTINCT` — natijadagi takror qatorlarni olib tashlaydi. PostgreSQL'ning o'ziga xos `DISTINCT ON (ustun)` i esa har guruhdan **bittasini** qoldiradi — masalan, har mijozning eng oxirgi buyurtmasini.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "`DISTINCT ON` 'har guruhdan birinchisi' masalasini qisqa hal qiladi; qaysi qator 'birinchi' ekanini `ORDER BY` belgilaydi va u `DISTINCT ON` ustunlaridan boshlanishi kerak. Standart SQL muqobili — `row_number()` window funksiyasi. `DISTINCT` ni JOIN'dan keyin takrorni yashirish uchun ishlatmayman."

---

## Q10. LIMIT va OFFSET nima? / What are LIMIT and OFFSET and what is their problem?

**Oddiy qilib aytganda:** `LIMIT 10` — '10 ta qator ber', `OFFSET 20` — 'avval 20 tasini tashlab yubor'. Sahifalash uchun oddiy, lekin `OFFSET` katta bo'lganda baza tashlab yuboriladigan qatorlarni ham o'qiydi — oxirgi sahifalar sekinlashadi.

**Batafsilroq:**

> **UZ:** `LIMIT` — qaytariladigan qatorlar sonini cheklaydi. `OFFSET` — ma'lum miqdordagi qatorlarni o'tkazib yuboradi. Sahifalash (pagination) uchun ishlatiladi, lekin katta OFFSET larda sekin ishlaydi.  
> **EN:** `LIMIT` caps the number of returned rows. `OFFSET` skips a number of rows. Used for pagination, but large OFFSET values are slow.

```sql
-- 2-sahifa, har sahifada 10 ta
SELECT * FROM products
ORDER BY id
LIMIT 10 OFFSET 10;
```

**Intervyuda shunday ayting:** "`LIMIT` doim aniq `ORDER BY` bilan — aks holda tartib kafolatlanmagan. Katta jadvallarda `OFFSET` o'rniga keyset pagination (`WHERE (created_at, id) < (...)`) ishlataman — batafsil `practical/postgresql.md` Q19 da."

---

## Q11. EXPLAIN va EXPLAIN ANALYZE nimani ko'rsatadi va qanday o'qiladi? / What do EXPLAIN and EXPLAIN ANALYZE show and how do you read them?

**Oddiy qilib aytganda:** `EXPLAIN` — bazadan 'bu so'rovni qanday bajarmoqchisan?' deb so'rash: u rejani ko'rsatadi. `EXPLAIN ANALYZE` — so'rovni haqiqatan bajarib, har qadam qancha vaqt olgani va nechta qator qaytarganini ko'rsatadi. Sekin so'rovni tuzatish shu yerdan boshlanadi.

**Batafsilroq:**

> **UZ:** `EXPLAIN` — so'rov bajarish rejasini ko'rsatadi (haqiqatan bajarmasdan). `EXPLAIN ANALYZE` — rejani ko'rsatadi VA so'rovni bajarib, haqiqiy vaqtni o'lchaydi. So'rovlarni optimallashtirish uchun muhim vosita.  
> **EN:** `EXPLAIN` shows the query execution plan without running it. `EXPLAIN ANALYZE` shows the plan AND executes the query, measuring actual time. Essential for query optimization.

```sql
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
```

**Qo'shimcha — Explain output ni qanday o'qish:**

> **UZ:** EXPLAIN chiqishidagi asosiy atamalar:
> - **Seq Scan** — to'liq jadval skaneri (indeks yo'q yoki undan foydalanilmayapti)
> - **Index Scan** — indeks orqali qidirish
> - **Index Only Scan** — faqat indeksdan javob (covering index)
> - **Bitmap Heap Scan** — bir nechta indeks natijalarini birlashtirish
> - **Hash Join / Nested Loop / Merge Join** — JOIN strategiyalari
> - **cost=X..Y** — X: birinchi qatorga qiymati, Y: barcha qatorlarga qiymati  
> **EN:** Key EXPLAIN terms: **Seq Scan** (full scan, no index), **Index Scan** (uses index), **Index Only Scan** (answer from index alone), **Bitmap Heap Scan** (combines multiple index results), **cost=X..Y** (X: startup, Y: total).

**Qo'shimcha — Index Scan vs Bitmap Heap Scan vs Sequential Scan qachon qo'llaniladi:**

> **UZ:** Planner tanlovini belgilovchi omillar: **Seq Scan** — kichik jadvallar yoki jadvalning katta qismi qaytarilganda; **Index Scan** — kam qator, random access; **Bitmap Heap Scan** — o'rta miqdordagi qatorlar, bir nechta indeks natijalarini birlashtirish.  
> **EN:** **Seq Scan** — small tables or returning a large share of the table. **Index Scan** — few rows, random access. **Bitmap Heap Scan** — medium rows, combining multiple index results.

**Intervyuda shunday ayting:** "Rejada pastdan yuqoriga o'qiyman: qaysi skan turi (Seq, Index, Index Only, Bitmap), qaysi JOIN strategiyasi, taxminiy va haqiqiy qatorlar farqi, `Buffers` (PostgreSQL 18 da avtomatik). Katta farq — eskirgan statistika belgisi. `ANALYZE` so'rovni bajarishini unutmayman — yozuvchi so'rovlarni tranzaksiyada `ROLLBACK` bilan tekshiraman."

---

## Q12. SAVEPOINT nima? / What is a SAVEPOINT?

**Oddiy qilib aytganda:** SAVEPOINT — tranzaksiya ichidagi 'saqlash nuqtasi', o'yindagi checkpoint kabi. Keyingi qadam xato bo'lsa, butun tranzaksiyani emas, faqat shu nuqtagacha orqaga qaytasiz va davom etasiz.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Savepoint qisman rollback beradi — masalan, ko'p qatorli importda bitta yomon qatorni o'tkazib yuborish uchun. Lekin har savepoint narxi bor: juda ko'p savepoint (ayniqsa sikl ichida) unumdorlikni pasaytiradi. ORM'lardagi 'nested transaction' odatda savepoint bilan ishlaydi."

---

## Q13. FOREIGN KEY va CASCADE? / What do FOREIGN KEY and ON DELETE CASCADE do?

**Oddiy qilib aytganda:** Foreign key — 'bu buyurtma albatta mavjud mijozga tegishli' degan qoida, baza uni o'zi tekshiradi. `ON DELETE` mijoz o'chirilganda nima bo'lishini aytadi: `CASCADE` — buyurtmalar ham o'chadi, `SET NULL` — havola bo'shaydi, `RESTRICT` — o'chirishga ruxsat berilmaydi.

**Batafsilroq:**

> **UZ:** Foreign Key ikki jadval o'rtasidagi bog'liqlikni ta'minlaydi. `ON DELETE CASCADE` — asosiy yozuv o'chirilganda bog'liq yozuvlar ham o'chadi. `ON DELETE SET NULL` — NULL ga o'rnatadi. `ON DELETE RESTRICT` — o'chirishni bloklaydi.  
> **EN:** Foreign Key enforces referential integrity. `ON DELETE CASCADE` deletes related rows. `ON DELETE SET NULL` sets FK to NULL. `ON DELETE RESTRICT` blocks deletion.

```sql
CREATE TABLE orders (
    id      SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ...
);
```

**Intervyuda shunday ayting:** "Standart tanlovim — `RESTRICT`/`NO ACTION`: tasodifiy o'chirish zanjiri bo'lmasin. `CASCADE` ni faqat haqiqiy 'ota-bola' munosabatida (buyurtma va uning qatorlari) ishlataman. FK ustuniga indeks qo'shaman — PostgreSQL uni avtomatik yaratmaydi va indekssiz ota qatorni o'chirish sekin bo'ladi."

---

## Q14. CHECK constraint nima? / What is a CHECK constraint?

**Oddiy qilib aytganda:** CHECK — ustunga qo'yilgan qoida: 'maosh musbat bo'lsin', 'yosh 18 dan 65 gacha'. Qoidaga zid qator bazaga umuman yozilmaydi — ilova kodida xato bo'lsa ham.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Biznes invariantlarini bazada ham saqlayman — ilova qatlamidagi validatsiya chetlab o'tilishi mumkin. Katta jadvalga yangi CHECK'ni `NOT VALID` bilan qo'shib, keyin `VALIDATE CONSTRAINT` qilaman — yozish bloklanmaydi."

---

## Q15. DEFAULT qiymatlar? / How do DEFAULT values work?

**Oddiy qilib aytganda:** DEFAULT — qiymat berilmasa, avtomatik qo'yiladigan qiymat: holat — 'pending', yaratilgan vaqt — hozirgi vaqt, ID — yangi UUID. Kod har safar bu qiymatlarni o'zi yozishi shart emas.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "DEFAULT ifoda ham bo'lishi mumkin (`now()`, `gen_random_uuid()`, `uuidv7()`). Yangi ustunni doimiy DEFAULT bilan qo'shish PostgreSQL 11 dan beri jadvalni qayta yozmaydi — bir zumda bajariladi. `now()` tranzaksiya boshlangan vaqtni qaytaradi, `clock_timestamp()` esa haqiqiy joriy vaqtni."

---

# 🟡 O'rta daraja / Intermediate

## Q16. JSONB va JSON farqi? / What is the difference between JSON and JSONB?

**Oddiy qilib aytganda:** `json` matnni aynan qanday kelgan bo'lsa shunday saqlaydi va har so'rovda qayta o'qib tahlil qiladi. `jsonb` uni tahlil qilingan, ikkilik ko'rinishda saqlaydi: yozish biroz sekinroq, lekin qidiruv tez va indeks qo'yish mumkin. Deyarli har doim `jsonb` tanlanadi.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "`jsonb` ni tanlayman: GIN indeks, `@>` kabi operatorlar, tezkor kirish. `json` faqat kalit tartibi yoki takroriy kalitlar aynan saqlanishi kerak bo'lganda. Doim so'raladigan maydonlarni oddiy ustunga chiqaraman — tip, constraint va statistika bilan ular yaxshiroq ishlaydi."

---

## Q17. ARRAY turlari va so'rovlari? / How do ARRAY types work?

**Oddiy qilib aytganda:** PostgreSQL'da bitta katakda ro'yxat saqlash mumkin: masalan, maqola teglari `{python, fastapi}`. `ANY`, `@>` (o'z ichiga oladimi), `&&` (kesishadimi) operatorlari bilan qidiriladi va GIN indeks bilan tezlashtiriladi.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Massiv kichik, mustaqil qiymatlar ro'yxati (teglar) uchun qulay. Agar elementlar o'z xususiyatlariga ega bo'lsa yoki ularga FK kerak bo'lsa — alohida bog'lovchi jadval to'g'riroq. Indeksi PostgreSQL'da 1 dan boshlanishini unutmayman."

---

## Q18. Full-Text Search (To'liq matn qidirish)? / How does full-text search work in PostgreSQL?

**Oddiy qilib aytganda:** To'liq matnli qidiruv matnni so'zlarga ajratadi, ularni asosiy shaklga keltiradi ('running' → 'run') va shu so'zlar bo'yicha qidiradi. `tsvector` — hujjatning so'zlar ro'yxati, `tsquery` — qidiruv so'rovi, `@@` — 'mos keladimi?' operatori.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Kichik va o'rta qidiruvlar uchun PostgreSQL FTS yetarli: generated `tsvector` ustun + GIN indeks, `websearch_to_tsquery` foydalanuvchi kiritgan matn uchun, `ts_rank` tartiblash uchun. O'zbek tili uchun lug'at yo'q — `simple` konfiguratsiya. Murakkab relevantlik va fasetlar uchun alohida qidiruv tizimi."

---

## Q19. pg_trgm kengaytmasi nima? / What is the pg_trgm extension?

**Oddiy qilib aytganda:** `pg_trgm` so'zlarni 3 harfli bo'laklarga ajratadi ('ali' → ' a', ' al', 'ali', 'li '). Shu sababli so'z o'rtasidan qidirish (`LIKE '%ali%'`) va o'xshash so'zlarni topish (imlo xatosi bilan) indeks orqali tez ishlaydi.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "`pg_trgm` + GIN `ILIKE '%...%'` va o'xshashlik qidiruvini tezlashtiradi; FTS esa so'z shakllari bilan ishlaydi. Qisqa (3 harfdan kam) so'rovlarda trigram samarasiz — minimal uzunlik qo'yaman. Amaliy ssenariy — `practical/postgresql.md` Q12."

---

## Q20. Partial Index (Qisman indeks) nima? / What is a partial index?

**Oddiy qilib aytganda:** Partial indeks — faqat shartga mos qatorlar uchun ko'rsatkich: masalan, faqat 'kutilayotgan' buyurtmalar. Jadvalda 50 million qator bo'lsa-yu, kerakligi 10 ming bo'lsa — indeks kichik, tez va keshga sig'adi.

**Batafsilroq:**

> **UZ:** Partial Index — faqat ma'lum shartni qanoatlantiruvchi qatorlarga yaratilgan indeks. Kichikroq hajm, tezroq so'rovlar, kam xotira sarfi.  
> **EN:** Partial Index is built only on rows satisfying a condition — smaller size, faster queries, less memory.

```sql
-- Faqat faol foydalanuvchilar uchun / Only for active users
CREATE INDEX idx_active_users ON users(email) WHERE is_active = TRUE;

-- Faqat to'lanmagan buyurtmalar / Only unpaid orders
CREATE INDEX idx_unpaid ON orders(user_id, created_at)
WHERE status = 'pending';
```

**Intervyuda shunday ayting:** "Partial indeks tez-tez so'raladigan kichik qism uchun. So'rov sharti indeks shartini mantiqan qamrashi kerak. U 'faqat faol yozuvlar orasida noyob' kabi qoidalar uchun ham qulay: `CREATE UNIQUE INDEX ... WHERE deleted_at IS NULL`."

---

## Q21. Composite Index (Ko'p ustunli indeks) qachon samarali? / When is a composite (multi-column) index effective?

**Oddiy qilib aytganda:** Ko'p ustunli indeks — telefon kitobi kabi: avval familiya, keyin ism bo'yicha tartiblangan. Familiya bo'yicha qidirish tez, familiya + ism ham tez, lekin faqat ism bo'yicha — kitob yordam bermaydi. Shuning uchun ustunlar **tartibi** hal qiluvchi.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Ustun tartibini so'rovlarga qarab tanlayman: avval tenglik bilan filtrlanadigan ustunlar, keyin diapazon yoki saralash ustuni. Chap prefiks qoidasi amal qiladi, lekin PostgreSQL 18 dagi skip scan chap ustunda qiymatlar kam bo'lsa uni ham chetlab o'ta oladi."

---

## Q22. Covering Index nima? / What is a covering index?

**Oddiy qilib aytganda:** Covering indeks so'rovga kerak bo'lgan hamma ustunlarni o'zida saqlaydi. Baza javobni to'g'ridan-to'g'ri indeksdan oladi va asosiy jadvalga umuman murojaat qilmaydi (index-only scan) — tezroq.

**Batafsilroq:**

> **UZ:** Covering Index — so'rov uchun zarur barcha ustunlarni o'z ichiga olgan indeks. PostgreSQL asosiy jadval sahifalariga murojaat qilmasdan (`heap fetch` yo'q) to'g'ridan-to'g'ri indeksdan javob qaytaradi.  
> **EN:** A Covering Index includes all columns needed by a query, allowing PostgreSQL to answer directly from the index without fetching table rows (index-only scan).

```sql
-- name va email ham indeksda / name and email also in index
CREATE INDEX idx_covering ON users(id) INCLUDE (name, email);
```

**Intervyuda shunday ayting:** "`INCLUDE` qidiruv kalitiga kirmaydigan qo'shimcha ustunlarni indeksga qo'shadi. Index-only scan faqat visibility map yangilangan bo'lsa samarali — shuning uchun vacuum muhim. Indeksni juda keng qilmayman: u yozishni sekinlashtiradi va joy oladi."

---

## Q23. Table Partitioning nima? / What is table partitioning?

**Oddiy qilib aytganda:** Partitioning — katta jadvalni kichik bo'laklarga bo'lish (masalan, har yil yoki har oy alohida). Tashqaridan u bitta jadval, ichida esa bir necha. So'rov faqat kerakli bo'lakka boradi, eski bo'lakni esa bir buyruq bilan o'chirish mumkin.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Deklarativ partitioning: `RANGE` (vaqt), `LIST` (mintaqa, tenant), `HASH` (teng tarqatish). Asosiy foyda — eski ma'lumotni `DETACH`/`DROP` bilan tez olib tashlash va pruning. So'rovlar partition kalitini filtrlashi kerak; juda ko'p partition esa rejalashtirishni sekinlashtiradi."

---

## Q24. VACUUM va autovacuum nima, bloat bilan qanday kurashiladi? / What are VACUUM and autovacuum, and how do you keep up with bloat?

**Oddiy qilib aytganda:** PostgreSQL'da o'chirilgan yoki yangilangan qatorning eski nusxasi darhol yo'qolmaydi — 'o'lik' bo'lib qoladi. VACUUM — farrosh: o'lik qatorlarni tozalab, joyni qayta ishlatishga tayyorlaydi. Autovacuum — shu farroshning avtomatik, fondagi versiyasi.

**Batafsilroq:**

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

**Qo'shimcha — Vakuum agressivligi va bloat boshqaruvi:**

> **UZ:** Muammolar: `n_dead_tup` yuqori bo'lsa → autovacuum etmayapti. Yechim: `autovacuum_vacuum_scale_factor` ni kamaytirish, katta jadvallar uchun `autovacuum_vacuum_threshold` ni sozlash, `pg_repack` kengaytmasi bilan lock qilmasdan bloatni tozalash.  
> **EN:** Problem: high `n_dead_tup` → autovacuum not keeping up. Fix: lower `autovacuum_vacuum_scale_factor`, tune `autovacuum_vacuum_threshold` for large tables, use `pg_repack` to clean bloat without locks.

**Intervyuda shunday ayting:** "Vacuum o'lik qatorlarni tozalaydi, visibility map'ni yangilaydi va transaction ID wraparound'ning oldini oladi. Katta, tez o'zgaradigan jadvallar uchun autovacuum sozlamalarini jadval darajasida pasaytiraman. `VACUUM FULL` jadvalni qulflaydi — o'rniga `pg_repack`. Uzoq ochiq tranzaksiyalar vacuum'ni to'sadi."

---

## Q25. MVCC (Multi-Version Concurrency Control) nima? / What is MVCC?

**Oddiy qilib aytganda:** MVCC — har tranzaksiya ma'lumotning o'z 'fotosurati'ni ko'radi. Kimdir qatorni o'zgartirayotganda, boshqalar uning eski versiyasini o'qishda davom etadi. Natija: o'quvchilar yozuvchilarni kutmaydi va aksincha.

**Batafsilroq:**

> **UZ:** MVCC — PostgreSQL da bir vaqtda o'qish va yozishni lock qilmasdan ta'minlovchi mexanizm. Har bir tranzaksiya ma'lumotlarning o'z "snapshotini" ko'radi. Bu o'quvchilar yozuvchilarni bloklamasligini ta'minlaydi.  
> **EN:** MVCC allows concurrent reads and writes without locking. Each transaction sees its own "snapshot" of data, ensuring readers don't block writers and vice versa.

**Intervyuda shunday ayting:** "MVCC'da `UPDATE` yangi qator versiyasini yozadi, eskisi o'lik bo'lib qoladi — shuning uchun vacuum kerak. O'qish va yozish bir-birini bloklamaydi, lekin ikki yozuvchi bitta qatorga baribir navbat bilan yozadi. Izolyatsiya darajalari aynan shu snapshot'lar ustida quriladi."

---

## Q26. Lock (Qulf) turlari PostgreSQL da? / What lock types exist in PostgreSQL?

**Oddiy qilib aytganda:** Qulf — 'hozir men ishlatyapman, kut' degan belgi. Qator darajasidagi qulf faqat bitta qatorni ushlaydi (`FOR UPDATE`), jadval darajasidagi qulf — butun jadvalni (masalan, `ALTER TABLE`). Advisory lock — ilovaning o'zi ma'no beradigan erkin qulf.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Qator qulflari: `FOR UPDATE`, `FOR NO KEY UPDATE`, `FOR SHARE`, `FOR KEY SHARE`; navbat uchun `SKIP LOCKED`, darhol xato uchun `NOWAIT`. Eng xavflisi — DDL'ning `ACCESS EXCLUSIVE` qulfi: u kutayotganda orqasidagi barcha so'rovlar navbatga turadi, shuning uchun migratsiyalarda `lock_timeout` qo'yaman. Kutishlarni `pg_locks` va `pg_blocking_pids()` bilan ko'raman."

---

## Q27. Deadlock nima va qanday oldini olish? / What is a deadlock and how do you prevent it?

**Oddiy qilib aytganda:** Deadlock — ikki tranzaksiya bir-birini kutib, abadiy qotib qolishi: A B'ni kutadi, B esa A'ni. PostgreSQL buni sezib, birini bekor qiladi. Oldini olishning asosiy yo'li — hamma joyda qatorlarni bir xil tartibda qulflash.

**Batafsilroq:**

> **UZ:** Deadlock — ikki tranzaksiya bir-birining resurslarini kutib qolishi. PostgreSQL deadlockni avtomatik aniqlaydi va birini bekor qiladi. Oldini olish: bir xil tartibda locklar olish, tranzaksiyalarni qisqa saqlash.  
> **EN:** Deadlock occurs when two transactions wait for each other's resources. PostgreSQL auto-detects and resolves by aborting one. Prevention: acquire locks in consistent order, keep transactions short.

**Intervyuda shunday ayting:** "Qulflash tartibini bir xil qilaman, tranzaksiyalarni qisqa tutaman va deadlock (40P01) xatosida butun tranzaksiyani qayta urinaman. Qaysi so'rovlar to'qnashganini server log'idan ko'raman. Amaliy misol — `practical/postgresql.md` Q16."

---

## Q28. TRIGGER nima? / What is a trigger?

**Oddiy qilib aytganda:** Trigger — jadvalda biror hodisa (qo'shish, o'zgartirish, o'chirish) bo'lganda avtomatik ishga tushadigan funksiya. Masalan, har `UPDATE` da `updated_at` ustunini hozirgi vaqtga o'rnatish.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Trigger'lar invariantlar va audit uchun foydali, lekin ular yashirin mantiq: kodni o'qigan odam ularni ko'rmaydi va ular yozishni sekinlashtiradi. Oddiy vazifalar (updated_at, audit) uchun ishlataman, murakkab biznes mantiq uchun — yo'q. Row-level trigger har qator uchun, statement-level — butun buyruq uchun bir marta ishlaydi."

---

## Q29. Stored Procedure va Function farqi PostgreSQL da? / What is the difference between a function and a procedure?

**Oddiy qilib aytganda:** Funksiya qiymat qaytaradi va `SELECT` ichida ishlatiladi. Procedure (PostgreSQL 11+) `CALL` bilan chaqiriladi va ichida tranzaksiyani o'zi `COMMIT` qila oladi — uzun, bo'laklarga bo'lingan ishlar uchun qulay.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Funksiya — so'rov ichida hisoblash uchun va chaqiruvchining tranzaksiyasi ichida ishlaydi. Procedure ichida `COMMIT` mumkin — masalan, katta ma'lumotni bo'laklab qayta ishlash. Funksiyalarga to'g'ri volatilitet (`IMMUTABLE`, `STABLE`, `VOLATILE`) belgilayman — bu planner'ga optimallashtirishda yordam beradi."

---

## Q30. plpgsql nima? / What is PL/pgSQL?

**Oddiy qilib aytganda:** PL/pgSQL — PostgreSQL ichida yoziladigan dasturlash tili: o'zgaruvchilar, `IF`, sikllar va xatolarni ushlash bor. Trigger va funksiyalar odatda shu tilda yoziladi.

**Batafsilroq:**

> **UZ:** plpgsql — PostgreSQL ning protsessual dasturlash tili. IF/ELSE, LOOP, EXCEPTION bloklari, o'zgaruvchilar, kursorlar va boshqa dasturlash konstruksiyalarini qo'llab-quvvatlaydi. Trigger va funksiyalar yozish uchun ishlatiladi.  
> **EN:** plpgsql is PostgreSQL's procedural programming language. Supports IF/ELSE, LOOP, EXCEPTION blocks, variables, cursors. Used to write triggers and functions.

**Intervyuda shunday ayting:** "PL/pgSQL ma'lumotga yaqin mantiq uchun — ko'p qadamni bitta tarmoq chaqiruviga birlashtiradi. Lekin biznes mantiqni bazaga ko'chirishning narxi bor: test, versiyalash va deploy qiyinlashadi. Dinamik SQL'da `format('%I', ...)` va `USING` bilan injection'dan himoyalanaman."

---

## Q31. RETURNING clause nima? / What does the RETURNING clause do?

**Oddiy qilib aytganda:** `RETURNING` — `INSERT`, `UPDATE` yoki `DELETE` dan keyin o'zgargan qatorlarni darhol qaytaradi. Yangi ID ni olish uchun alohida `SELECT` shart emas — bitta so'rov, tezroq va poyga holatisiz.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "`RETURNING` qo'shimcha so'rovni va poyga holatini yo'qotadi — masalan, `INSERT ... RETURNING id` yoki navbatdan vazifa olish `UPDATE ... RETURNING`. PostgreSQL 18 da `RETURNING old.*, new.*` bilan o'zgarishdan oldingi va keyingi qiymatlarni birga olish mumkin."

---

## Q32. COPY buyrug'i nima? / What is the COPY command?

**Oddiy qilib aytganda:** `COPY` — ko'p ma'lumotni juda tez yuklash yoki chiqarish buyrug'i. Million qatorni bittalab `INSERT` qilish o'rniga, CSV faylni bir oqimda yuklaydi — ko'p barobar tezroq.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Katta importlar uchun `COPY` — `INSERT` lardan ancha tez. `COPY ... FROM '/path'` faylni **server** diskidan o'qiydi va maxsus huquq talab qiladi; klient kompyuteridagi fayl uchun `psql` dagi `\copy` yoki drayverning COPY API'si. Juda katta yuklashda indekslar va trigger'larni vaqtincha o'chirishni ko'rib chiqaman."

---

## Q33. pg_stat_statements nima? / What is pg_stat_statements?

**Oddiy qilib aytganda:** `pg_stat_statements` — bazaning 'hisobchisi': har turdagi so'rov necha marta bajarilgani va jami qancha vaqt olganini yozib boradi. Qaysi so'rovlarni birinchi optimallashtirish kerakligini shu ko'rsatadi.

**Batafsilroq:**

> **UZ:** `pg_stat_statements` — PostgreSQL kengaytmasi bo'lib, barcha so'rovlar statistikasini (bajarilish soni, umumiy vaqt, o'rtacha vaqt) kuzatadi. Sekin so'rovlarni topish uchun muhim vosita.  
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

**Intervyuda shunday ayting:** "Optimallashtirishni `pg_stat_statements` dagi `total_exec_time` bo'yicha boshlayman — eng ko'p umumiy vaqt oladigan so'rovlar, eng sekin bitta so'rov emas. U `shared_preload_libraries` ga qo'shilishi kerak. Statistikani vaqti-vaqti bilan tozalab, o'zgarishlar ta'sirini solishtiraman."

---

## Q34. Connection pooling nima va PgBouncer qanday sozlanadi? / What is connection pooling and how do you configure PgBouncer?

**Oddiy qilib aytganda:** PostgreSQL'da har ulanish — alohida jarayon va xotira, shuning uchun minglab ulanish ochib bo'lmaydi. Pool — tayyor ulanishlar to'plami, so'rovlar ularni navbat bilan ishlatadi. PgBouncer — ilova va baza orasida turadigan shunday 'dispetcher'.

**Batafsilroq:**

> **UZ:** Connection Pooling — ma'lumotlar bazasi ulanishlarini qayta ishlatish mexanizmi. Har safar yangi ulanish yaratish qimmat. `PgBouncer` yoki `pgpool-II` eng ko'p ishlatiladigan PostgreSQL connection pooler lar. FastAPI da `asyncpg` + `SQLAlchemy` async engine ham pooling qiladi.  
> **EN:** Connection Pooling reuses database connections instead of creating new ones each time (expensive). PgBouncer and pgpool-II are popular PostgreSQL poolers.

**Qo'shimcha — pg_bouncer sozlash:**

> **UZ:** PgBouncer connection pooler sozlamalarining asosiy parametrlari:
> - `pool_mode`: `session` (har bir session uchun), `transaction` (tranzaksiya uchun — eng ommabop), `statement` (bayonot uchun)
> - `max_client_conn`: maksimal client ulanishlari
> - `default_pool_size`: har bir DB/user juftligi uchun ulanishlar soni  
> **EN:** Key PgBouncer settings: `pool_mode` (`transaction` most popular), `max_client_conn` (max client connections), `default_pool_size` (connections per DB/user pair).

**Intervyuda shunday ayting:** "PgBouncer `transaction` rejimida minglab klientni bir necha o'nta server ulanishiga sig'diradi. Cheklovi: sessiya holati (`SET`, sessiya advisory lock'lari, `LISTEN`) tranzaksiyadan tashqariga chiqmaydi. Pool hajmini baza yadrolari va disk imkoniyatiga qarab tanlayman, `max_connections` ni oshirib emas."

---

## Q35. WAL (Write-Ahead Log) nima? / What is the WAL (Write-Ahead Log)?

**Oddiy qilib aytganda:** WAL — bazaning 'qora qutisi': har o'zgarish avval jurnalga yoziladi, keyin jadvalga. Elektr o'chsa, baza qayta ishga tushganda jurnalni o'qib, hech narsa yo'qotmasdan tiklanadi. Replikatsiya va vaqt nuqtasiga tiklash ham shu jurnalga asoslanadi.

**Batafsilroq:**

> **UZ:** WAL — PostgreSQL ning o'zgarishlarni jadval sahifalaridan oldin jurnal faylga yozadigan mexanizmi. Crash recovery, streaming replication va Point-in-Time Recovery (PITR) uchun asos.  
> **EN:** WAL (Write-Ahead Log) writes changes to a log file before applying them to table pages. Foundation for crash recovery, streaming replication, and PITR.

**Intervyuda shunday ayting:** "WAL durability'ni ta'minlaydi: commit WAL diskka yozilgach tasdiqlanadi. Shu jurnal streaming replication, logical decoding va PITR uchun asos. Operatsion jihatdan WAL hajmi va checkpoint chastotasini (`max_wal_size`) kuzataman — ular yozish unumdorligiga ta'sir qiladi."

---

## Q36. Replikatsiya turlari: fizik va mantiqiy replikatsiya farqi? / What replication types does PostgreSQL support (physical vs logical)?

**Oddiy qilib aytganda:** Replikatsiya — bazaning jonli nusxasini boshqa serverda saqlash. **Fizik** replikatsiya butun serverni bayt darajasida ko'chiradi — nusxadan faqat o'qiladi. **Mantiqiy** replikatsiya tanlangan jadvallarning o'zgarishlarini yuboradi — turli versiyalar orasida ham ishlaydi.

**Batafsilroq:**

> **UZ:** PostgreSQL replikatsiya turlari:
> - **Streaming Replication** — WAL orqali real-time sinxronizatsiya (primary → standby)
> - **Logical Replication** — jadval darajasida selektiv replikatsiya
> - **Synchronous** — primary standby tasdiqlaguncha kutadi
> - **Asynchronous** — primary kutmaydi (tezroq, lekin ma'lumot yo'qotish xavfi)  
> **EN:** Replication types: **Streaming** (real-time via WAL, primary→standby), **Logical** (selective table-level), **Synchronous** (primary waits for standby ACK), **Asynchronous** (primary doesn't wait, faster but risk of data loss).

**Qo'shimcha — Hot Standby va Streaming Replication sozlash:**

> **UZ:** Primary da `wal_level = replica`, `max_wal_senders >= 1`, `hot_standby = on` sozlanadi. Standby da `primary_conninfo` belgilanadi. Standby faqat o'qish (read-only) uchun so'rovlarni qabul qiladi.  
> **EN:** On primary: `wal_level = replica`, `max_wal_senders >= 1`. On standby: configure `primary_conninfo`. Standby accepts read-only queries.

**Qo'shimcha — Fizik va Mantiqiy Replikatsiya farqi:**

> **UZ:** **Fizik (Streaming)** — butun klaster WAL bloklari ko'rinishida replikatsiya qilinadi, standby faqat o'qish uchun. **Mantiqiy (Logical)** — jadval darajasida, ikki yo'nalishli ham mumkin, version upgradelar orasida ham ishlaydi, selektiv jadvallar tanlanadi.  
> **EN:** **Physical (Streaming)** — entire cluster replicated as WAL blocks, standby is read-only. **Logical** — table-level, can be bidirectional, works across versions, selective tables.

**Intervyuda shunday ayting:** "Fizik (streaming) — HA va o'qishni kengaytirish uchun: butun klaster, standby faqat o'qiydi. Mantiqiy — tanlangan jadvallar, versiyalararo migratsiya va integratsiya uchun. Sinxron replikatsiya ma'lumot yo'qotmaslikni kafolatlaydi, lekin yozish kechikishini oshiradi; asinxron — tez, lekin failover'da oxirgi tranzaksiyalar yo'qolishi mumkin. Replication lag'ni doim kuzataman."

---

## Q37. Point-in-Time Recovery (PITR) nima va qanday sozlanadi? / What is point-in-time recovery (PITR) and how is it set up?

**Oddiy qilib aytganda:** PITR — bazani o'tmishdagi aniq bir lahzaga qaytarish: 'kecha 14:29 dagi holatga, xato `DELETE` dan bir daqiqa oldin'. Buning uchun asosiy zaxira nusxa va undan keyingi barcha WAL jurnallari saqlanadi.

**Batafsilroq:**

> **UZ:** PITR — WAL arxivlari yordamida ma'lumotlar bazasini ixtiyoriy o'tgan vaqt nuqtasiga tiklash imkoniyati. "Ertaga soat 14:30 gacha tiklash kerak" kabi stsenariylar uchun.  
> **EN:** PITR allows restoring the database to any past point in time using WAL archives — for scenarios like "restore to yesterday 14:30."

**Qo'shimcha — Write-Ahead Log (WAL) arxivlash va PITR sozlash:**

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

**Intervyuda shunday ayting:** "PITR = asosiy fizik backup + uzluksiz WAL arxivi. Tiklashda backup qo'yiladi va WAL kerakli vaqtgacha qayta o'ynatiladi (`recovery_target_time`). PostgreSQL 12+ da buning uchun `recovery.signal` fayli yaratiladi. Amalda pgBackRest yoki Barman kabi vositalardan foydalanaman va tiklashni muntazam sinayman."

---

## Q38. Table Inheritance (Jadval meros olishi) nima? / What is table inheritance?

**Oddiy qilib aytganda:** Jadval meros olishi — bola jadval ota jadvalning barcha ustunlarini oladi va otaga so'rov bolalarning qatorlarini ham qaytaradi. Oldin partitioning shu bilan qilinardi; bugun buning uchun maxsus deklarativ partitioning bor.

**Batafsilroq:**

> **UZ:** PostgreSQL jadvallarga meros olishni qo'llab-quvvatlaydi. Parent jadvalga so'rov yuborilganda, barcha child jadval ma'lumotlari ham qaytariladi. Partitioning dan oldin ishlatilgan, hozir asosan deklarativ partitioning afzal.  
> **EN:** PostgreSQL supports table inheritance. Querying the parent returns data from all child tables. Largely replaced by declarative partitioning in modern PostgreSQL.

**Intervyuda shunday ayting:** "Meros olish — eski mexanizm: unique va foreign key'lar bolalar orasida ishlamaydi. Yangi loyihalarda partitioning uchun deklarativ partitioning ishlataman; meros faqat mavjud tizimlarda uchraydi."

---

## Q39. UUID yoki BIGINT/serial — ID uchun qaysi birini tanlash kerak? / How do you choose between UUID and BIGINT/serial IDs?

**Oddiy qilib aytganda:** `bigint` ID — kichik (8 bayt), tez va tartibli, lekin ketma-ket raqamlar tashqariga oshkor bo'ladi (nechta buyurtma borligini taxmin qilish mumkin). UUID — 16 bayt, hamma joyda noyob, lekin tasodifiy UUID indeksni parchalab, yozishni sekinlashtiradi. UUID v7 boshida vaqt bo'lgani uchun tartibli.

**Batafsilroq:**

> **UZ:** `SERIAL`/`BIGSERIAL` — ketma-ket, kichik (4/8 bayt), JOIN da tezroq. `UUID` — global yagona (16 bayt), tarqatilgan tizimlar uchun ideal, lekin indeks hajmi kattaroq, tasodifiy tartib tufayli indeks fragmentatsiyasi ko'p.  
> **EN:** `SERIAL`/`BIGSERIAL` — sequential, small (4/8 bytes), faster in JOINs. `UUID` — globally unique (16 bytes), ideal for distributed systems, but larger index size and more fragmentation due to random ordering.

```sql
-- UUID v4 (tasodifiy / random)
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ...
);

-- UUID v7 (vaqt tartiblangan / time-ordered) — PostgreSQL 18+ da o'rnatilgan funksiya
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    ...
);
```

**Intervyuda shunday ayting:** "Ichki kalitlar uchun `bigint identity` — ixcham va tez. Taqsimlangan yaratish yoki tashqi ID kerak bo'lsa — UUID v7 (PostgreSQL 18 da `uuidv7()`): tartibli bo'lgani uchun B-tree'ga do'st. Tasodifiy UUID v4 ni katta, ko'p yoziladigan jadvallarda asosiy kalit qilmayman."

---

## Q40. Generated Columns nima? / What are generated columns?

**Oddiy qilib aytganda:** Generated ustun — boshqa ustunlardan avtomatik hisoblanadigan ustun: `narx × miqdor = jami`. Uni qo'lda yozib bo'lmaydi, shuning uchun formula hamma joyda bir xil bo'ladi.

**Batafsilroq:**

> **UZ:** Generated Columns — boshqa ustunlar ifodasi asosida avtomatik hisoblanadigan ustun. `VIRTUAL` — o'qilganda hisoblanadi (PostgreSQL 18 dan bor va **standart** tur), `STORED` — yozilganda hisoblanib diskda saqlanadi.  
> **EN:** Generated Columns are automatically computed from other column expressions. `VIRTUAL` computes on read (available since PostgreSQL 18 and the default); `STORED` computes on write and saves to disk.

```sql
CREATE TABLE products (
    price      NUMERIC,
    tax_rate   NUMERIC DEFAULT 0.12,
    price_with_tax NUMERIC GENERATED ALWAYS AS (price * (1 + tax_rate)) STORED
);
```

**Intervyuda shunday ayting:** "PostgreSQL 18 da standart tur — `VIRTUAL` (o'qishda hisoblanadi), `STORED` — yozishda hisoblanib saqlanadi va indekslanishi mumkin. Ifoda faqat shu qatordagi ustunlardan va `IMMUTABLE` funksiyalardan iborat bo'lishi kerak. Amaliy misol — `practical/postgresql.md` Q20."

---

## Q41. Table Statistics va pg_statistic? / What are table statistics and pg_stats?

**Oddiy qilib aytganda:** Planner eng yaxshi yo'lni tanlash uchun jadval haqida 'ma'lumotnoma'ga qaraydi: nechta qator bor, qaysi qiymatlar ko'p uchraydi. Bu ma'lumotnoma — statistika, uni `ANALYZE` yangilaydi. Eskirgan statistika — noto'g'ri reja va sekin so'rov.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Statistika namunadan yig'iladi: eng ko'p uchraydigan qiymatlar, histogramma, noyob qiymatlar soni, fizik tartib korrelyatsiyasi. Notekis ustunlar uchun `SET STATISTICS` ni oshiraman, bog'liq ustunlar uchun `CREATE STATISTICS`. Katta yuklashdan keyin `ANALYZE` ni o'zim chaqiraman."

---

## Q42. Lateral Join nima? / What is a LATERAL join?

**Oddiy qilib aytganda:** `LATERAL` — subquery'ga tashqi jadvalning joriy qatoriga qarashga ruxsat beradi. 'Har foydalanuvchi uchun uning oxirgi 3 ta buyurtmasi' kabi masalalarni oddiy va tez yechadi.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "`LATERAL` — 'har qator uchun kichik so'rov' — top-N per group uchun juda qulay, ayniqsa `(user_id, created_at)` indeksi bo'lsa. `LEFT JOIN LATERAL ... ON true` bilan mos qatori yo'qlarni ham saqlayman. Set-returning funksiyalar (`jsonb_array_elements`) ham shu mexanizm bilan ishlaydi."

---

# 🔴 Ilg'or daraja / Advanced

## Q43. Query Planner qanday ishlaydi? / How does the query planner work?

**Oddiy qilib aytganda:** Planner — navigator: bitta manzilga ko'p yo'l bor (qaysi indeks, qaysi JOIN usuli, qaysi tartib). U har yo'lning 'narxini' statistika asosida taxmin qiladi va eng arzonini tanlaydi. Taxmin noto'g'ri bo'lsa — yomon yo'l tanlanadi.

**Batafsilroq:**

> **UZ:** Query Planner statistika (jadval hajmi, ustun kardinaliyasi, korrelyatsiya), mavjud indekslar va konfiguratsiya parametrlari asosida eng arzon bajarish rejasini tanlaydi. `EXPLAIN` orqali rejani ko'rish mumkin.  
> **EN:** The Query Planner uses statistics (table size, column cardinality, correlation), available indexes, and config parameters to choose the cheapest execution plan, viewable via `EXPLAIN`.

**Intervyuda shunday ayting:** "Planner xarajat modeli asosida ishlaydi: `seq_page_cost`, `random_page_cost`, `cpu_*` parametrlari va statistika. Muammolarning ko'pi noto'g'ri qatorlar taxminidan kelib chiqadi. SSD'da `random_page_cost` ni pasaytiraman va `effective_cache_size` ni to'g'ri qo'yaman — ular indeks tanloviga ta'sir qiladi."

---

## Q44. Parallel Query nima? / What is parallel query?

**Oddiy qilib aytganda:** Katta so'rovni bitta yadro emas, bir nechta yadro birga bajaradi — ishni bo'laklarga bo'lib, oxirida natijalarni birlashtiradi (`Gather`). Katta jadvaldagi agregatlar ancha tezlashadi.

**Batafsilroq:**

> **UZ:** PostgreSQL katta so'rovlarni bir nechta CPU yadroda parallel bajarishini qo'llab-quvvatlaydi. `max_parallel_workers_per_gather`, `parallel_setup_cost`, `parallel_tuple_cost` parametrlari bilan boshqariladi.  
> **EN:** PostgreSQL supports executing large queries across multiple CPU cores. Controlled by `max_parallel_workers_per_gather`, `parallel_setup_cost`, `parallel_tuple_cost`.

```sql
-- Parallel so'rovni tekshirish / Check parallel query
EXPLAIN SELECT COUNT(*), AVG(total) FROM orders;
-- "Gather" node ko'rsatsa, parallel ishlayapti / "Gather" node = parallel
```

**Intervyuda shunday ayting:** "Parallel query katta skan va agregatlarda foydali, kichik OLTP so'rovlarda esa ishga tushish narxi foydadan ko'p. `max_parallel_workers_per_gather` va umumiy worker limitlarini server yadrolari va parallel so'rovlar soniga qarab sozlayman."

---

## Q45. pg_cron kengaytmasi nima? / What is the pg_cron extension?

**Oddiy qilib aytganda:** `pg_cron` — baza ichidagi budilnik: 'har kecha soat 3 da eski sessiyalarni o'chir' kabi vazifalarni to'g'ridan-to'g'ri PostgreSQL'da rejalashtiradi, tashqi cron serveri shart emas.

**Batafsilroq:**

> **UZ:** `pg_cron` — PostgreSQL ichida cron-uslubida vazifalarni rejalashtirish imkonini beruvchi kengaytma. Tashqi cron yoki task scheduler kerak emas, to'g'ridan-to'g'ri SQL yoki stored procedure ni jadvallab ishga tushirish mumkin.  
> **EN:** `pg_cron` is an extension for scheduling cron-style jobs inside PostgreSQL — no external cron needed, run SQL or stored procedures on a schedule.

```sql
CREATE EXTENSION pg_cron;

-- Har kuni tunda / Every night at midnight
SELECT cron.schedule('nightly-cleanup', '0 0 * * *',
    'DELETE FROM sessions WHERE expires_at < NOW()');
```

**Intervyuda shunday ayting:** "`pg_cron` baza ichidagi texnik vazifalar uchun qulay: tozalash, materialized view yangilash, partition yaratish. Biznes vazifalarini esa ilova scheduler'ida qoldiraman — kuzatish, qayta urinish va log'lar u yerda yaxshiroq. HA sozlamasida vazifa faqat primary'da ishlashini tekshiraman."

---

## Q46. Tablespace nima? / What is a tablespace?

**Oddiy qilib aytganda:** Tablespace — ma'lumot diskning qaysi papkasida saqlanishini belgilaydi. Masalan, tez-tez ishlatiladigan jadvallarni tez SSD'ga, arxivni arzon diskka qo'yish.

**Batafsilroq:**

> **UZ:** Tablespace — PostgreSQL ob'ektlari (jadvallar, indekslar) saqlanadigan disk joyi. Katta, tez-tez foydalaniladigan jadvallarni SSD ga, eski ma'lumotlarni HDD ga joylashtirish imkonini beradi.  
> **EN:** Tablespace defines the physical storage location for database objects. Allows placing hot tables on SSD and cold data on HDD.

```sql
CREATE TABLESPACE fast_ssd LOCATION '/mnt/ssd/pg_data';
CREATE TABLE hot_table (...) TABLESPACE fast_ssd;
CREATE INDEX idx_hot ON hot_table(id) TABLESPACE fast_ssd;
```

**Intervyuda shunday ayting:** "Tablespace — fizik joylashuv boshqaruvi. Bulut va konteyner muhitida kam ishlatiladi: disklar odatda bitta tom (volume) bo'ladi va backup/replikatsiyani murakkablashtiradi. Faqat aniq I/O sababi bo'lganda qo'llayman."

---

## Q47. PostgreSQL'ning asosiy konfiguratsiya parametrlari qaysilar? / What are the key PostgreSQL configuration parameters?

**Oddiy qilib aytganda:** PostgreSQL standart sozlamalari juda ehtiyotkor — kichik kompyuter uchun. Server xotirasi va diskiga moslab bir nechta asosiy parametrni o'zgartirish unumdorlikni sezilarli oshiradi: qancha xotira kesh uchun, qancha saralash uchun, disk qanchalik tez.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Boshlang'ich nuqta: `shared_buffers` ≈ RAM'ning 25%, `effective_cache_size` ≈ 50–75%, `work_mem` ehtiyotkorlik bilan (u har saralash operatsiyasi uchun alohida), `random_page_cost` SSD uchun ~1.1, `max_wal_size` checkpoint'lar tez-tez bo'lmasligi uchun. Har o'zgarishni o'lchab qilaman."

---

## Q48. Index Bloat va Table Bloat nima? / What are table bloat and index bloat?

**Oddiy qilib aytganda:** Bloat — jadval yoki indeksdagi bo'sh, lekin band joy: o'lik qatorlar tozalangan, ammo fayl kichraymagan. Natijada so'rovlar keraksiz sahifalarni ham o'qiydi va disk ko'proq ketadi.

**Batafsilroq:**

> **UZ:** Bloat — MVCC tufayli yig'ilib qolgan o'lik tuple lar va bo'sh indeks sahifalari. `VACUUM` oddiy bloatni tozalaydi, `VACUUM FULL` jadvalni to'liq qayta yozadi (lock talab qiladi). `pgstattuple` kengaytmasi bloatni o'lchaydi.  
> **EN:** Bloat is accumulated dead tuples and empty index pages due to MVCC. `VACUUM` cleans regular bloat; `VACUUM FULL` rewrites tables (requires lock). Measure with `pgstattuple`.

**Intervyuda shunday ayting:** "Bloat'ni `pgstattuple` yoki taxminiy so'rovlar bilan o'lchayman. Oldini olish — to'g'ri sozlangan autovacuum va uzun tranzaksiyalarsiz ishlash. Tuzatish: indeks uchun `REINDEX CONCURRENTLY`, jadval uchun `pg_repack`; `VACUUM FULL` esa jadvalni to'liq qulflaydi."

---

## Q49. pg_partman kengaytmasi nima? / What is the pg_partman extension?

**Oddiy qilib aytganda:** `pg_partman` partitioning'ni avtomatlashtiradi: kelgusi oylar uchun bo'laklarni oldindan yaratadi va eskilarini belgilangan muddatdan keyin olib tashlaydi. Qo'lda unutib qo'yish xavfi yo'qoladi.

**Batafsilroq:**

> **UZ:** `pg_partman` — PostgreSQL partition larini avtomatik yaratish va boshqarish kengaytmasi. Yangi oy/hafta/kun boshlanishida avtomatik yangi partition yaratadi va eskilarini arxivlaydi.  
> **EN:** `pg_partman` automates partition creation and management — automatically creates new time-based partitions and archives old ones.

**Intervyuda shunday ayting:** "`pg_partman` vaqt yoki ID bo'yicha partitioning'ni boshqaradi: premake — oldindan yaratish, retention — eskisini ajratish yoki o'chirish. Uni `pg_cron` yoki background worker bilan muntazam ishga tushiraman; aks holda yangi davr uchun partition bo'lmay qoladi va yozish default partition'ga tushadi yoki xato beradi."

---

## Q50. Logical decoding va Change Data Capture (CDC) nima? / What are logical decoding and change data capture (CDC)?

**Oddiy qilib aytganda:** CDC — bazadagi har o'zgarishni (qo'shildi, o'zgardi, o'chdi) oqim sifatida boshqa tizimlarga yuborish. PostgreSQL buni WAL jurnalini o'qib qiladi (logical decoding). Debezium kabi vositalar bu oqimni Kafka'ga uzatadi — qidiruv indeksi, kesh yoki analitika avtomatik yangilanadi.

**Batafsilroq:**

> **UZ:** Logical Decoding — WAL oqimini inson o'qiy oladigan formatga (JSON, Avro) aylantirishga imkon beradi. CDC uchun ishlatiladi. `wal2json`, `pgoutput` kabi plugin lar bilan Kafka, Debezium bilan integratsiya qilinadi.  
> **EN:** Logical Decoding transforms the WAL stream into human-readable formats (JSON, Avro) for CDC. Integrates with Kafka, Debezium via plugins like `wal2json`, `pgoutput`.

**Qo'shimcha — pg_logical va Debezium CDC integratsiyasi:**

> **UZ:** `pg_logical` kengaytmasi yoki PostgreSQL 10+ dagi `pgoutput` plugin bilan Debezium CDC ni sozlash: `wal_level = logical` qo'yish, replikatsiya sloti yaratish, Debezium PostgreSQL connectorini sozlash, Kafka topic larida o'zgarishlarni olish.  
> **EN:** Configure CDC via `pg_logical` or `pgoutput` (PG 10+): set `wal_level = logical`, create replication slot, configure Debezium PostgreSQL connector, receive changes in Kafka topics.

**Intervyuda shunday ayting:** "`wal_level = logical`, replication slot va publication — CDC asosi. Muhim operatsion xavf: iste'molchi to'xtasa, slot WAL'ni ushlab turadi va disk to'lishi mumkin — slot lag'ini kuzataman va `max_slot_wal_keep_size` qo'yaman. CDC outbox bilan birga ishonchli hodisa oqimini beradi."

---

## Q51. PostGIS kengaytmasi nima? / What is the PostGIS extension?

**Oddiy qilib aytganda:** PostGIS PostgreSQL'ga geografiya qo'shadi: nuqta, chiziq, poligon saqlash va 'shu nuqtadan 5 km ichidagi do'konlar', 'bu uy qaysi tumanda' kabi savollarga indeks bilan tez javob berish.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "PostGIS'da `geography` tipi Yer yuzasidagi haqiqiy masofani metrda hisoblaydi, `geometry` — tekislikdagi tez hisob. Qidiruvlarni GiST indeks bilan `ST_DWithin` orqali qilaman — `ST_Distance < x` indeksdan foydalanmaydi."

---

## Q52. Foreign Data Wrapper (FDW) nima? / What is a foreign data wrapper (FDW)?

**Oddiy qilib aytganda:** FDW — boshqa bazadagi (yoki CSV fayldagi) jadvalni o'z bazangizdagidek so'rash imkoni. Masalan, analitik bazadagi jadvalni oddiy `SELECT` bilan o'qish.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "`postgres_fdw` migratsiya, integratsiya va vaqtinchalik birlashtirishlar uchun qulay; u filtrlarni masofaviy serverga uzatishga harakat qiladi. Lekin masofaviy JOIN'lar sekin bo'lishi mumkin va tarmoq uzilishi so'rovni yiqitadi — doimiy yuklama uchun replikatsiya yoki ETL yaxshiroq."

---

## Q53. pgvector kengaytmasi nima? / What is the pgvector extension?

**Oddiy qilib aytganda:** `pgvector` PostgreSQL'da vektorlarni (matn yoki rasmning raqamli 'ma'no izi') saqlash va eng o'xshashlarini topish imkonini beradi. AI ilovalarida — masalan, RAG'da savolga eng mos hujjatlarni topish uchun ishlatiladi.

**Batafsilroq:**

> **UZ:** `pgvector` — PostgreSQL da vektor o'xshashlik qidiruvini (vector similarity search) qo'shuvchi kengaytma. AI/ML ilovalar, embedding qidirish, RAG (Retrieval-Augmented Generation) uchun ishlatiladi.  
> **EN:** `pgvector` adds vector similarity search to PostgreSQL — used for AI/ML apps, embedding search, and RAG (Retrieval-Augmented Generation).

```sql
CREATE EXTENSION vector;

CREATE TABLE documents (
    id        SERIAL PRIMARY KEY,
    content   TEXT,
    embedding VECTOR(1536)  -- OpenAI embedding o'lchami
);

CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);   -- HNSW: hozirgi tavsiya etilgan indeks

-- Eng o'xshash hujjatlarni topish / Find most similar documents
SELECT content, embedding <=> '[0.1, 0.2, ...]'::vector AS distance
FROM documents
ORDER BY distance
LIMIT 5;
```

**Intervyuda shunday ayting:** "Hozir standart indeks — HNSW: IVFFlat'dan aniqroq va ma'lumot qo'shilganda qayta qurish shart emas, lekin xotira ko'proq oladi. Masofa operatorini modelga moslayman (`<=>` — kosinus). Vektor qidiruvni metama'lumot filtrlari bilan birlashtirish oson — asosiy afzalligi shu."

---

## Q54. Row Level Security (RLS) nima? / What is row-level security (RLS)?

**Oddiy qilib aytganda:** RLS — baza darajasidagi 'har kim faqat o'zinikini ko'radi' qoidasi. So'rovda filtr unutilsa ham, baza boshqa foydalanuvchi yoki mijozning qatorlarini qaytarmaydi.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "RLS policy'lar `USING` (o'qish) va `WITH CHECK` (yozish) shartlari bilan ishlaydi. Jadval egasi va superuser uni chetlab o'tadi — `FORCE ROW LEVEL SECURITY` va alohida ilova roli kerak. Pool ishlatilsa, kontekstni `set_config(..., true)` bilan tranzaksiya darajasida beraman. Amaliy misol — `practical/postgresql.md` Q7."

---

## Q55. Python'dan PostgreSQL bilan asinxron ishlash (asyncpg)? / How do you use PostgreSQL asynchronously from Python (asyncpg)?

**Oddiy qilib aytganda:** `asyncpg` — Python uchun tezkor async PostgreSQL drayveri: so'rov bajarilayotganda dastur boshqa ishlarni qila oladi. FastAPI kabi async framework'larda SQLAlchemy 2.0 bilan birga ishlatiladi.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Async stack'da `asyncpg` yoki psycopg 3 async rejimi. Ulanishlarni pool orqali boshqaraman va pool hajmini replicalar soni bilan birga hisoblayman. PgBouncer transaction rejimida prepared statement keshi muammo chiqarishi mumkin — shunda uni sozlash yoki o'chirish kerak."

---

## Q56. pg_dump va pg_restore nima? / What are pg_dump and pg_restore?

**Oddiy qilib aytganda:** `pg_dump` — bazaning mantiqiy zaxira nusxasini oladi (jadvallar va ma'lumot, SQL yoki siqilgan formatda). `pg_restore` — uni qayta tiklaydi. Kichik va o'rta bazalar uchun oddiy va qulay.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "`pg_dump` izchil mantiqiy nusxa beradi va versiyalar orasida ko'chirish uchun qulay. `-Fc`/`-Fd` formatlari parallel tiklashni (`-j`) qo'llaydi. Rollar va global sozlamalar uchun `pg_dumpall --globals-only`. Katta bazalar va PITR uchun — fizik backup. Har backupni tiklab sinayman — `practical/postgresql.md` Q17."

---

## Q57. Monitoring uchun qaysi PostgreSQL ko'rinishlari muhim? / Which PostgreSQL views matter most for monitoring?

**Oddiy qilib aytganda:** PostgreSQL o'zi haqida ko'p ma'lumot beradi: hozir qaysi so'rovlar ishlayapti, qaysi jadvallarda o'lik qatorlar ko'p, qaysi indekslar umuman ishlatilmayapti, kesh qanchalik samarali. Muammoni topish shu ko'rinishlardan boshlanadi.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Asosiy ko'rinishlar: `pg_stat_activity` (faol va osilgan sessiyalar), `pg_stat_statements` (qimmat so'rovlar), `pg_stat_user_tables` (dead tuple, vacuum), `pg_stat_user_indexes` (ishlatilmagan indekslar), `pg_stat_replication` (lag), `pg_locks`. Ularni Prometheus exporter orqali grafik va ogohlantirishlarga chiqaraman."

---

## Q58. Unlogged Table nima? / What is an UNLOGGED table?

**Oddiy qilib aytganda:** Unlogged jadval o'zgarishlarni WAL jurnaliga yozmaydi — shuning uchun yozish tezroq. Lekin server avariya bilan to'xtasa, jadval **bo'shatiladi** va u replikaga ham ko'chirilmaydi.

**Batafsilroq:**

> **UZ:** `UNLOGGED TABLE` — WAL ga yozmaydigan jadval. Yozish ancha tezroq, lekin server ishlamay qolsa ma'lumotlar yo'qoladi. Vaqtinchalik ma'lumotlar, kesh jadvallar, test uchun mos.  
> **EN:** `UNLOGGED TABLE` skips WAL writes — much faster writes but data is lost on server crash. Good for temporary data, caches, and testing.

```sql
CREATE UNLOGGED TABLE temp_calculations (
    id    SERIAL,
    value NUMERIC,
    result NUMERIC
);
```

**Intervyuda shunday ayting:** "Unlogged jadval — qayta tiklanadigan vaqtinchalik ma'lumot uchun: import bosqichi, kesh, oraliq hisob. Muhim ma'lumot uchun hech qachon: avariyadan keyin u tozalanadi va standby'da mavjud emas."

---

## Q59. Expression Index (Ifoda indeksi) nima? / What is an expression index?

**Oddiy qilib aytganda:** Ifoda indeksi ustunning o'ziga emas, undan hisoblangan qiymatga qo'yiladi: masalan, `lower(email)`. So'rovda aynan shu ifoda ishlatilsa — indeks ishlaydi.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Ifoda indeksi so'rovdagi ifodaga aynan mos bo'lishi va `IMMUTABLE` funksiyadan iborat bo'lishi kerak. Ko'pincha undan ham yaxshisi — so'rovni ustunga funksiya qo'llamaydigan qilib qayta yozish (sana uchun diapazon shart). Amaliy misol — `practical/postgresql.md` Q2."

---

## Q60. Alembic bilan PostgreSQL migratsiyalari qanday yuritiladi? / How do you run PostgreSQL migrations with Alembic?

**Oddiy qilib aytganda:** Alembic — Python/SQLAlchemy loyihalarida bazadagi o'zgarishlarni (yangi jadval, ustun) versiyalangan fayllar sifatida yozish vositasi. Kod bilan birga baza tuzilmasi ham tartib bilan yangilanadi va kerak bo'lsa orqaga qaytariladi.

**Batafsilroq:**

> **UZ:** `Alembic` — SQLAlchemy uchun ma'lumotlar bazasi migratsiya vositasi. FastAPI + PostgreSQL proyektlarida keng ishlatiladi. `alembic revision --autogenerate` model o'zgarishlarini avtomatik migratsiyaga aylantiradi.  
> **EN:** `Alembic` is a database migration tool for SQLAlchemy, widely used in FastAPI + PostgreSQL projects. `alembic revision --autogenerate` auto-generates migrations from model changes.

```bash
alembic init alembic
alembic revision --autogenerate -m "add users table"
alembic upgrade head
alembic downgrade -1
```

**Intervyuda shunday ayting:** "`--autogenerate` faqat qoralama beradi — har migratsiyani qo'lda ko'rib chiqaman: nomi o'zgargan ustunni u 'o'chir va yarat' deb tushunishi mumkin. Katta jadvallarda migratsiyalarni expand-contract tamoyili bilan, `CONCURRENTLY` va `lock_timeout` bilan yozaman."

---

## Q61. TOAST nima? / What is TOAST?

**Oddiy qilib aytganda:** PostgreSQL sahifasi kichik (8 KB). Katta matn yoki JSON unga sig'masa, TOAST uni siqib, alohida 'omborga' qo'yadi, jadvalda esa faqat unga havola qoladi. Bu avtomatik ishlaydi.

**Batafsilroq:**

> **UZ:** TOAST (The Oversized-Attribute Storage Technique) — PostgreSQL da katta qiymatlarni (8KB dan katta) saqlash mexanizmi. Katta TEXT, BYTEA, JSONB qiymatlarini alohida TOAST jadvalida siqib saqlaydi.  
> **EN:** TOAST (The Oversized-Attribute Storage Technique) handles large values (>8KB) by compressing and storing them in a separate TOAST table — for TEXT, BYTEA, JSONB.

**Intervyuda shunday ayting:** "TOAST taxminan 2 KB dan katta qiymatlarni siqadi va alohida saqlaydi. Natija: katta ustunni o'qimaydigan so'rovlar tezroq, lekin katta JSONB'ni har safar to'liq o'qish yoki kichik o'zgartirish qimmat — butun qiymat qayta yoziladi. PostgreSQL 14+ da `lz4` siqish mavjud."

---

## Q62. Event Trigger nima? / What is an event trigger?

**Oddiy qilib aytganda:** Oddiy trigger ma'lumot o'zgarganda ishlaydi, event trigger esa **tuzilma** o'zgarganda — jadval yaratilganda, o'zgartirilganda yoki o'chirilganda. Masalan, barcha DDL o'zgarishlarini audit jurnaliga yozish yoki ruxsatsiz `DROP` ni taqiqlash.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Event trigger'lar DDL audit va siyosatlar uchun (masalan, ma'lum schema'da `DROP` ni bloklash). Ular faqat superuser tomonidan yaratiladi va xatosi barcha DDL'ni to'xtatishi mumkin — ehtiyotkorlik bilan va test bilan qo'llayman."

---

## Q63. pg_upgrade nima? / What is pg_upgrade?

**Oddiy qilib aytganda:** `pg_upgrade` — PostgreSQL'ni katta versiyaga (masalan, 17 → 18) butun bazani eksport-import qilmasdan yangilash vositasi. `--link` rejimida fayllar ko'chirilmaydi, shuning uchun juda tez.

**Batafsilroq:**

> **UZ:** `pg_upgrade` — PostgreSQL major versiyasini (masalan, 14 → 16) ma'lumotlarni to'liq dump/restore qilmasdan yangilash vositasi. `--link` rejimi juda tez, lekin eski versiyaga qaytish imkonsiz.  
> **EN:** `pg_upgrade` upgrades PostgreSQL major versions (e.g., 14→16) without full dump/restore. `--link` mode is very fast but prevents rollback to old version.

**Intervyuda shunday ayting:** "`pg_upgrade` odatda daqiqalar ichida tugaydi; `--link` eng tez, lekin shundan keyin eski klasterga qaytib bo'lmaydi — oldin backup shart. PostgreSQL 18 dan u planner statistikasini saqlaydi — ilgari yangilashdan keyin `ANALYZE` tugaguncha so'rovlar sekin edi. Kengaytmalar yangi versiyaga mosligini oldindan tekshiraman."

---

# ⚫ Ekspert daraja / Expert

## Q64. Planner nega indeksni ishlatmayapti? / Why isn't the planner using my index?

**Oddiy qilib aytganda:** Indeks bor, lekin baza uni ishlatmayapti — odatda sababi bor: indeks so'rovga mos emas (ustun funksiyaga o'ralgan, tip mos kelmaydi), statistika eskirgan yoki baza haqli — juda ko'p qator kerak bo'lsa, butun jadvalni o'qish rostdan ham arzonroq.

**Batafsilroq:**

> **UZ:** Sabablari: statistika eskirgan (ANALYZE kerak), so'rovda funksiya ishlatilgan (`WHERE UPPER(name) = 'ALI'` — expression index kerak), indeks ustuni implicit cast bilan ishlatilgan, juda ko'p qator qaytarilishi kutilmoqda, `random_page_cost` noto'g'ri sozlangan.  
> **EN:** Reasons: stale statistics (run ANALYZE), function used on column (needs expression index), implicit type cast, too many rows expected, misconfigured `random_page_cost`.

```sql
-- random_page_cost ni SSD uchun tuzatish
SET random_page_cost = 1.1;

-- Yoki postgresql.conf da
-- random_page_cost = 1.1
```

**Intervyuda shunday ayting:** "Tekshirish tartibi: `EXPLAIN ANALYZE` dagi taxmin va haqiqat, so'rov indeksga mosligi (funksiya, implicit cast, `LIKE '%..'`, `OR`), statistika yangiligi, `random_page_cost` va `effective_cache_size`. Tekshirish uchun sessiyada `SET enable_seqscan = off` qilib ko'raman, lekin productionda planner'ni majburlamayman — sababni tuzataman."

---

## Q65. N+1 muammosi nima va qanday hal qilish? / What is the N+1 problem and how do you fix it?

**Oddiy qilib aytganda:** N+1 — 1 ta so'rov bilan 100 ta foydalanuvchini olasiz, keyin har biri uchun alohida so'rov bilan buyurtmalarini — jami 101 ta so'rov. Har biri tez bo'lsa ham, birga sahifani sekinlashtiradi. Yechim: kerakli ma'lumotni 1–2 ta so'rovda olish.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "N+1 ni ORM log'i yoki `pg_stat_statements` dagi bir xil so'rovning juda ko'p chaqirilishidan aniqlayman. Tuzatish: `JOIN`, `WHERE id = ANY($1)` yoki ORM eager loading (SQLAlchemy'da `selectinload`). Testda so'rovlar sonini tekshiruvchi assert qo'yaman — muammo qaytmasin."

---

## Q66. PostgreSQL'da partitioning va sharding farqi nima? / What is the difference between partitioning and sharding in PostgreSQL?

**Oddiy qilib aytganda:** Partitioning — bitta server ichida jadvalni bo'laklarga bo'lish. Sharding — ma'lumotni **bir nechta serverga** taqsimlash. Partitioning boshqaruvni osonlashtiradi, sharding esa bitta server ko'tara olmaydigan yuklamani ko'taradi — lekin ancha murakkab.

**Batafsilroq:**

> **UZ:** **Partitioning** — bitta PostgreSQL serverida jadvalni bo'laklarga ajratish (mantiqiy va fizik). **Sharding** — ma'lumotlarni bir nechta PostgreSQL server (node) o'rtasida taqsimlash. Sharding gorizontal kengayish (horizontal scaling) uchun.  
> **EN:** **Partitioning** — splitting a table within one PostgreSQL server. **Sharding** — distributing data across multiple PostgreSQL servers for horizontal scaling.

**Qo'shimcha — PostgreSQL da Sharding nima:**

> **UZ:** Sharding — ma'lumotlarni bir nechta PostgreSQL server o'rtasida gorizontal taqsimlash. PostgreSQL nativ sharding ni to'liq qo'llab-quvvatlamaydi — buning uchun `Citus` yoki tashqi middleware ishlatiladi.  
> **EN:** Sharding distributes data horizontally across multiple PostgreSQL servers. PostgreSQL doesn't natively support full sharding — use `Citus` or external middleware.

**Intervyuda shunday ayting:** "PostgreSQL'da o'rnatilgan sharding yo'q: Citus kengaytmasi, ilova darajasidagi shard routing yoki boshqa taqsimlangan PostgreSQL-mos tizimlar ishlatiladi. Sharding'dan oldin vertikal kengaytirish, read replica, partitioning va keshni sinab ko'raman — cross-shard JOIN va tranzaksiyalar qimmat."

---

## Q67. LISTEN/NOTIFY nima? / What is LISTEN/NOTIFY?

**Oddiy qilib aytganda:** `LISTEN`/`NOTIFY` — PostgreSQL'ning ichki 'xabar tizimi'. Bir ulanish kanalga quloq soladi, boshqasi unga qisqa xabar yuboradi. Masalan, buyurtma holati o'zgarganda servisga darhol xabar berish.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "NOTIFY tranzaksiya commit bo'lgandagina yetkaziladi, payload 8000 baytgacha. Lekin u ishonchli navbat emas: tinglovchi ulanmagan bo'lsa, xabar yo'qoladi. Shuning uchun uni 'nimadir o'zgardi, tekshir' signali sifatida ishlataman, ma'lumotning o'zi esa jadvalda qoladi. PgBouncer transaction rejimida `LISTEN` ishlamaydi."

---

## Q68. TimescaleDB nima? / What is TimescaleDB?

**Oddiy qilib aytganda:** TimescaleDB — vaqt qatorlari (sensor ko'rsatkichlari, metrikalar) uchun PostgreSQL kengaytmasi. Jadvalni avtomatik vaqt bo'laklariga ajratadi, eski ma'lumotni siqadi va 'har soatlik o'rtacha' kabi agregatlarni avtomatik yangilab turadi.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "TimescaleDB hypertable (avtomatik partitioning), siqish, retention va continuous aggregates beradi — oddiy SQL bilan. Litsenziyasiga e'tibor beraman: ba'zi imkoniyatlar Apache 2 emas, Timescale License ostida va ular ba'zi managed bulut xizmatlarida mavjud emas."

---

## Q69. Patroni nima? / What is Patroni?

**Oddiy qilib aytganda:** Patroni — PostgreSQL uchun avtomatik 'zaxira o'yinchi' tizimi. Asosiy server yiqilsa, u sog'lom replicani yangi asosiy qilib tayinlaydi. Kim asosiy ekanligi haqida kelishish uchun etcd yoki Consul kabi tizimdan foydalanadi.

**Batafsilroq:**

> **UZ:** `Patroni` — PostgreSQL uchun yuqori mavjudlik (High Availability) framework. Avtomatik failover, leader election (etcd/ZooKeeper/Consul orqali), configuration management. Kubernetes bilan ham yaxshi ishlaydi.  
> **EN:** `Patroni` is a High Availability framework for PostgreSQL. Provides automatic failover, leader election via etcd/ZooKeeper/Consul, and configuration management. Works well with Kubernetes.

**Intervyuda shunday ayting:** "Patroni DCS (etcd/Consul/Kubernetes) orqali lider saylovi va avtomatik failover qiladi — split-brain'dan himoya shu yerda. Uni HAProxy yoki VIP bilan birga ishlataman, shunda ilova doim joriy primary'ga ulanadi. Failover'ni muntazam sinayman. Kubernetes'da CloudNativePG operatori ham keng tarqalgan muqobil."

---

## Q70. PostgreSQL xavfsizligini qanday kuchaytirasiz? / How do you harden PostgreSQL security?

**Oddiy qilib aytganda:** Bazani himoyalash — bir nechta qulf: faqat kerakli manzillardan ulanish, shifrlangan ulanish (TLS), kuchli parollar, har ilova uchun faqat kerakli huquqlar va kim nima qilganini yozib boruvchi audit.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Asosiy choralar: `pg_hba.conf` da aniq tarmoqlar va `scram-sha-256` (MD5 PostgreSQL 18 da eskirgan), majburiy TLS, ilova uchun superuser bo'lmagan eng kam huquqli rol, `public` schema'da `CREATE` yo'q, `pgaudit` bilan audit. Bazani internetga ochmayman va yangilanishlarni muntazam o'rnataman."

---

## Q71. Tez so'rov yozishning asosiy qoidalari qanday? / What are the rules for writing fast queries?

**Oddiy qilib aytganda:** Tez so'rov yozishning oddiy qoidalari bor: ustunni funksiyaga o'ramang (indeks ishlamay qoladi), har qator uchun alohida subquery o'rniga JOIN yoki window funksiya ishlating, faqat kerakli ustunlarni oling va natija hajmini cheklang.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Asosiy qoidalar: indeksga mos shartlar (sana uchun diapazon, funksiyasiz), `SELECT *` o'rniga kerakli ustunlar, 'mavjudmi?' uchun `EXISTS`, N+1 dan qochish, katta `OFFSET` o'rniga keyset, agregatni JOIN'dan oldin qilish. Har o'zgarishni `EXPLAIN ANALYZE` bilan tasdiqlayman — 'yaxshi amaliyot' har doim ham tezroq emas."

---

## Q72. PostgreSQL da Cursor nima? / What is a cursor?

**Oddiy qilib aytganda:** Kursor — katta natijani bo'lak-bo'lak olish: 'keyingi 1000 tasini ber'. Butun natijani bir vaqtda xotiraga yuklamasdan, katta eksport yoki qayta ishlashni amalga oshirish mumkin.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Server tomonidagi kursor tranzaksiya ichida ishlaydi va ma'lumotni bo'laklab uzatadi — xotira tejaladi. Drayverlarda bu 'named cursor' yoki streaming API (psycopg'da server-side cursor). Kursor ochiq tranzaksiyani ushlab turadi — uzoq eksport vacuum'ni to'sishi mumkin, shuning uchun uni tez tugataman."

---

## Q73. pg_stat_bgwriter va pg_stat_checkpointer nimani ko'rsatadi? / What do pg_stat_bgwriter and pg_stat_checkpointer show?

**Oddiy qilib aytganda:** Bu ko'rinishlar PostgreSQL xotiradagi o'zgargan sahifalarni diskka qanday yozayotganini ko'rsatadi. Agar checkpoint'lar juda tez-tez majburan bo'layotgan bo'lsa, disk ortiqcha yuklanadi va yozish sekinlashadi.

**Batafsilroq:**

> **UZ:** PostgreSQL 17 dan boshlab checkpoint statistikasi `pg_stat_checkpointer` ga ko'chirildi; `pg_stat_bgwriter` da faqat background writer ko'rsatkichlari (`buffers_clean`, `maxwritten_clean`, `buffers_alloc`) qoldi. Talab bo'yicha checkpoint'lar (`num_requested`) ko'p bo'lsa, `max_wal_size` ni oshirish kerak.  
> **EN:** Since PostgreSQL 17, checkpoint statistics live in `pg_stat_checkpointer`; `pg_stat_bgwriter` keeps only background-writer counters. Many requested checkpoints mean `max_wal_size` is too small.

```sql
-- PostgreSQL 17+
SELECT num_timed, num_requested, buffers_written, write_time, sync_time
FROM pg_stat_checkpointer;

SELECT buffers_clean, maxwritten_clean, buffers_alloc
FROM pg_stat_bgwriter;
```

**Intervyuda shunday ayting:** "PostgreSQL 17 dan checkpoint statistikasi alohida `pg_stat_checkpointer` ko'rinishiga ko'chirildi (`num_timed`, `num_requested`); `pg_stat_bgwriter` da background writer ko'rsatkichlari qoldi. Talab bo'yicha (requested) checkpoint'lar ko'p bo'lsa — `max_wal_size` ni oshiraman."

---

## Q74. Partition pruning qanday ishlaydi (constraint_exclusion nima)? / How does partition pruning work (and what is constraint_exclusion)?

**Oddiy qilib aytganda:** Partition pruning — so'rov sharti bo'yicha keraksiz bo'laklarni umuman o'qimaslik: '2026-yil sentabr buyurtmalari' so'ralsa, faqat sentabr bo'lagi o'qiladi. Buning uchun so'rov partition kaliti bo'yicha filtrlashi kerak.

**Batafsilroq:**

> **UZ:** Deklarativ partitioning'da planner so'rov shartiga mos kelmaydigan partition'larni o'tkazib yuboradi (partition pruning). Bu `enable_partition_pruning` (standart holatda yoqilgan) bilan boshqariladi va parametrli so'rovlarda bajarilish vaqtida ham ishlaydi. `constraint_exclusion` — eski, meros (inheritance) asosidagi partitioning uchun CHECK constraint'larga tayanadigan mexanizm; standart qiymati `partition`.  
> **EN:** With declarative partitioning the planner skips partitions that cannot match (partition pruning), controlled by `enable_partition_pruning` (on by default) and also applied at execution time. `constraint_exclusion` is the older CHECK-based mechanism for inheritance partitioning (default `partition`).

```sql
EXPLAIN SELECT * FROM orders WHERE created_at >= '2026-09-01' AND created_at < '2026-10-01';
-- Rejada faqat orders_2026_09 partition'i bo'lishi kerak
```

**Intervyuda shunday ayting:** "Deklarativ partitioning'da pruning `enable_partition_pruning` (standart yoqilgan) bilan ishlaydi va hatto bajarilish vaqtida (parametrlar bilan) ham bo'ladi. `constraint_exclusion` — eski, meros asosidagi partitioning uchun CHECK constraint'larga asoslangan mexanizm; uning standart qiymati `partition`. Pruning ishlaganini `EXPLAIN` da o'qilgan partition'lar ro'yxatidan tekshiraman."

---

## Q75. Fillfactor nima? / What is fillfactor?

**Oddiy qilib aytganda:** Fillfactor — sahifani qanchalik to'ldirish kerakligi. 80% desangiz, har sahifada 20% bo'sh joy qoladi. Qator yangilanganda yangi versiya shu sahifaning o'zidagi bo'sh joyga yoziladi — tezroq va indekslarni yangilash kerak bo'lmaydi (HOT update).

**Batafsilroq:**

> **UZ:** `fillfactor` — jadval sahifasining qancha foizi yangi ma'lumot bilan to'ldirish kerakligini belgilaydi. Default: 100. `UPDATE` ko'p bo'lgan jadvallarda 70-80 qo'yish HOT (Heap Only Tuple) yangilanishlarini tezlashtiradi.  
> **EN:** `fillfactor` sets what percentage of a page to fill with new data (default 100). Setting 70-80 for frequently updated tables enables HOT (Heap Only Tuple) updates — faster updates.

```sql
CREATE TABLE orders (...) WITH (fillfactor = 80);
ALTER TABLE orders SET (fillfactor = 80);
VACUUM FULL orders;  -- Yangi fillfactor bilan qayta yaratish
```

**Intervyuda shunday ayting:** "Tez-tez yangilanadigan jadvallarda fillfactor'ni 70–90 ga tushirib HOT update ulushini oshiraman — HOT faqat indekslangan ustunlar o'zgarmaganda ishlaydi. Natijani `pg_stat_user_tables.n_tup_hot_upd` bilan o'lchayman. Mavjud sahifalarga ta'sir qilishi uchun jadval qayta yozilishi kerak."

---

## Q76. Multi-tenant arxitektura PostgreSQL da? / How do you design multi-tenant architecture in PostgreSQL?

**Oddiy qilib aytganda:** Ko'p mijozli tizimda uch yo'l bor: har mijozga alohida baza (eng xavfsiz, lekin boshqarish qiyin), har mijozga alohida schema (o'rtacha) yoki hamma bitta jadvalda `tenant_id` ustuni bilan (eng oddiy va kengaytiriladigan, lekin ajratishni RLS ta'minlashi kerak).

**Batafsilroq:**

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
SELECT set_config('app.tenant_id', '42', true);  -- faqat shu tranzaksiya uchun (pool bilan xavfsiz)
SELECT * FROM orders;  -- Faqat tenant 42 ning buyurtmalari
```

**Intervyuda shunday ayting:** "Ko'p mijozlar uchun umumiy jadvallar + `tenant_id` + RLS: bitta sxema, oson migratsiya, Citus bilan tenant bo'yicha shard qilish mumkin. Qat'iy izolyatsiya yoki katta mijozlar uchun — alohida baza. Indekslar `tenant_id` dan boshlanadi. Pool bilan tenant kontekstini `set_config(..., true)` orqali tranzaksiyaga beraman."

---

## Q77. PostgreSQL 17, 18 va 19 da nima yangi? / What is new in PostgreSQL 17, 18 and 19?

**Oddiy qilib aytganda:** Har yili sentabr-oktabrda PostgreSQL'ning yangi katta versiyasi chiqadi. 18-versiya (2025) asinxron I/O, `uuidv7()`, virtual generated ustunlar va yangilashdan keyin statistikani saqlash kabi yangiliklarni olib keldi. 19-versiya hozir beta sinovida.

**Batafsilroq:**

> **UZ:**
> - **PostgreSQL 17 (2024):** vacuum xotirasi keskin yaxshilandi, `JSON_TABLE` va SQL/JSON funksiyalari, inkremental backup (`pg_basebackup --incremental`), `transaction_timeout`, `MERGE ... RETURNING`, logical replication slot'lari failover'dan keyin saqlanadi.
> - **PostgreSQL 18 (2025-yil 25-sentabr):** asinxron I/O (`io_method`), B-tree skip scan, o'rnatilgan `uuidv7()`, virtual generated ustunlar standart, `RETURNING old.*, new.*`, `NOT NULL ... NOT VALID`, `WITHOUT OVERLAPS` temporal constraint'lar, OAuth autentifikatsiya, `pg_upgrade` statistikani saqlaydi, `EXPLAIN ANALYZE` `BUFFERS` ni avtomatik ko'rsatadi, MD5 parollar eskirgan.
> - **PostgreSQL 19:** 2026-yil sentabr holatiga beta sinovida — productionda faqat barqaror versiya.  
> **EN:** PG 17: better vacuum memory, `JSON_TABLE`, incremental backup, `transaction_timeout`, `MERGE ... RETURNING`. PG 18: async I/O, skip scan, `uuidv7()`, virtual generated columns by default, `RETURNING old/new`, `NOT NULL ... NOT VALID`, temporal constraints, OAuth, statistics kept by `pg_upgrade`. PG 19 is in beta as of September 2026.

Manba: [PostgreSQL 18 release notes](https://www.postgresql.org/docs/release/18.0/), [Versioning policy](https://www.postgresql.org/support/versioning/).

**Intervyuda shunday ayting:** "PostgreSQL 17 — vacuum xotirasi yaxshilandi, `JSON_TABLE`, inkremental backup (`pg_basebackup --incremental`), `transaction_timeout`, `MERGE ... RETURNING`. PostgreSQL 18 — asinxron I/O (`io_method`), B-tree skip scan, `uuidv7()`, virtual generated ustunlar standart, `RETURNING old/new`, `NOT NULL ... NOT VALID`, OAuth autentifikatsiya, `pg_upgrade` statistikani saqlaydi, MD5 parollar eskirgan. 19 — beta'da (2026-yil sentabr); productionda faqat barqaror versiyalar."

---

## Q78. PostgreSQL bo'yicha eng yaxshi amaliyotlar qaysilar? / What are PostgreSQL best practices?

**Oddiy qilib aytganda:** Eng muhim odatlar: vaqtni `timestamptz` da saqlash, har so'rovga vaqt chegarasi qo'yish, indekslarni jadvalni qulflamasdan yaratish, sekin so'rovlarni doimiy kuzatish, ulanishlarni pool orqali boshqarish va zaxira nusxadan tiklashni muntazam sinash.

**Batafsilroq:**

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

**Intervyuda shunday ayting:** "Mening ro'yxatim: `timestamptz` va `numeric` kabi to'g'ri tiplar; bazada constraint'lar; `statement_timeout`, `lock_timeout`, `idle_in_transaction_session_timeout`; `CREATE INDEX CONCURRENTLY`; `pg_stat_statements` monitoring; pooling; WAL arxivi + PITR va tiklash testlari; migratsiyalar expand-contract bilan; eng kam huquqli rollar."

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
pg_stat_checkpointer  -- Checkpoint statistikasi (PG 17+)
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

*Tayyorlagan / Prepared by: Alyorjon | PostgreSQL 18 ga asoslangan (2026-yil sentabr)*