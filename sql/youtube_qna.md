# SQL / PostgreSQL — YouTube Intervyu Savol-Javoblari

> YouTube'dan olingan SQL, umumiy RDBMS va PostgreSQL'ga xos intervyu savollari, misollar bilan. To'liq amaliy masalalar uchun `sql/practice_problems.md`, PostgreSQL uchun `sql/postgresql_interviews.md` fayllariga ham qarang.

---

## SQL asoslari va operator turlari

**SQL nima?**
Relatsion ma'lumotlar bazalari bilan ishlash uchun standart til.

**SQL vs MySQL**
SQL — til (standart). MySQL — shu tilni amalga oshiruvchi konkret RDBMS. Boshqalar: PostgreSQL, SQL Server, Oracle, SQLite — har birining o'z dialekt xususiyatlari bor (`LIMIT` vs `TOP`).

**SQL operatorlari turlari**
```sql
-- DDL — struktura
CREATE TABLE, ALTER TABLE, DROP TABLE
-- DML — ma'lumot
INSERT, UPDATE, DELETE
-- DQL — o'qish
SELECT
-- DCL — ruxsatlar
GRANT, REVOKE
-- TCL — tranzaksiya
COMMIT, ROLLBACK, SAVEPOINT
```

**DBMS, RDBMS va NoSQL**
- DBMS — umumiy tushuncha
- RDBMS — jadval shaklida, SQL orqali (MySQL, PostgreSQL)
- NoSQL — relatsion bo'lmagan, moslashuvchan sxema (MongoDB, Redis, Cassandra)

---

## Kalitlar (Keys)

**Primary Key vs Foreign Key vs Unique Key**
```sql
CREATE TABLE bolimlar (
    id INT PRIMARY KEY,
    nomi VARCHAR(50)
);
CREATE TABLE xodimlar (
    id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    bolim_id INT,
    FOREIGN KEY (bolim_id) REFERENCES bolimlar(id)
);
```
- Primary Key — qatorni noyob aniqlaydi, NULL bo'la olmaydi
- Foreign Key — jadvallar orasidagi bog'liqlik va referensial yaxlitlik
- Unique Key — qiymatlar takrorlanmasligini ta'minlaydi, bitta jadvalda bir nechtasi bo'lishi mumkin, NULL'ga ruxsat berishi mumkin

---

## O'chirish buyruqlari

**DELETE, TRUNCATE, DROP**
```sql
DELETE FROM xodimlar WHERE yosh > 60;   -- shart bo'yicha, DML, ROLLBACK mumkin
TRUNCATE TABLE xodimlar;                 -- barcha qator, DDL, tez
DROP TABLE xodimlar;                     -- jadval strukturasi bilan butunlay
```
`DELETE` trigger'larni ishga tushiradi (sekinroq); `TRUNCATE` jadvalni "reset" qiladi (auto-increment ham nolga tushadi).

---

## JOIN turlari

```sql
-- INNER JOIN: ikkala jadvalda ham mos qatorlar
SELECT * FROM xodimlar x INNER JOIN bolimlar b ON x.bolim_id = b.id;
-- LEFT JOIN: chap jadval to'liq + mos o'ng qatorlar
SELECT * FROM xodimlar x LEFT JOIN bolimlar b ON x.bolim_id = b.id;
-- RIGHT JOIN: o'ng jadval to'liq + mos chap qatorlar
-- FULL OUTER JOIN: ikkala jadval to'liq (mos kelmasa NULL)
-- CROSS JOIN: har bir kombinatsiya (Cartesian product)
SELECT * FROM xodimlar CROSS JOIN bolimlar;
-- SELF JOIN: jadval o'zi bilan (masalan xodim-menejer)
SELECT x.ism, m.ism as menejer FROM xodimlar x JOIN xodimlar m ON x.menejer_id = m.id;
```

**Subquery vs JOIN**
```sql
SELECT ism FROM xodimlar WHERE bolim_id IN (SELECT id FROM bolimlar WHERE nomi='IT');
```
JOIN odatda optimizator tomonidan yaxshiroq optimallashtiriladi; subquery ba'zan o'qish/tuzish jihatidan soddaroq.

**Subquery turlari**
```sql
-- Non-correlated: mustaqil, bir marta hisoblanadi
SELECT ism FROM xodimlar WHERE maosh > (SELECT AVG(maosh) FROM xodimlar);
-- Correlated: tashqi so'rovga bog'liq, har qator uchun qayta hisoblanadi (sekinroq)
SELECT ism FROM xodimlar x1
WHERE maosh > (SELECT AVG(maosh) FROM xodimlar x2 WHERE x2.bolim_id = x1.bolim_id);
```

---

## Filtrlash: WHERE, HAVING, CASE

```sql
SELECT bolim_id, COUNT(*) as soni
FROM xodimlar
WHERE yosh > 25              -- guruhlashdan OLDIN
GROUP BY bolim_id
HAVING COUNT(*) > 5;         -- guruhlashdan KEYIN (aggregate)
```

```sql
SELECT ism,
    CASE
        WHEN yosh < 18 THEN 'Voyaga yetmagan'
        WHEN yosh BETWEEN 18 AND 60 THEN 'Kattalar'
        ELSE 'Nafaqadagi'
    END AS toifa
FROM xodimlar;
```

**COALESCE**
```sql
SELECT ism, COALESCE(telefon, email, 'Aloqa yo''q') as aloqa
FROM mijozlar;
```
Chapdan o'ngga birinchi NULL bo'lmagan qiymatni qaytaradi.

**NULL qiymatlar**
```sql
SELECT * FROM xodimlar WHERE telefon = NULL;   -- HECH QACHON natija bermaydi!
SELECT * FROM xodimlar WHERE telefon IS NULL;  -- to'g'ri
```
NULL — "noma'lum", `0` yoki `''` emas. `NULL = NULL` ham `TRUE` emas.

---

## Normalizatsiya va Indekslash

**Normalizatsiya**
1NF (atomik qiymatlar) → 2NF (to'liq bog'liqlik) → 3NF (tranzitiv bog'liqlik yo'q) → BCNF (har bog'liqlikning chap tomoni superkey).

**Denormalizatsiya**
Ishlash tezligi uchun qasddan ortiqcha ma'lumot saqlash — odatda OLAP/data warehouse (star schema) stsenariylarida, ko'p JOIN o'rniga bitta jadval.

**Indekslar**
Kitob mundarijasi kabi — qidiruvni O(n)dan O(log n)ga tezlashtiradi (B-tree). INSERT/UPDATE/DELETE'ni sekinlashtiradi, qo'shimcha joy talab qiladi.

**Clustered vs Non-clustered**
```sql
CREATE CLUSTERED INDEX idx_id ON xodimlar(id);        -- jadval shu tartibda saqlanadi (bitta jadvalda 1 ta)
CREATE NONCLUSTERED INDEX idx_ism ON xodimlar(ism);    -- alohida struktura, pointer orqali (bir nechta bo'lishi mumkin)
```

**SARGable shartlar — indeksni "buzmaslik"**
```sql
-- YOMON — indeks ishlamaydi
SELECT * FROM buyurtmalar WHERE YEAR(sana) = 2024;
-- YAXSHI — indeks ishlaydi
SELECT * FROM buyurtmalar WHERE sana BETWEEN '2024-01-01' AND '2024-12-31';
```
Ustunga funksiya qo'llash indeksdan foydalanishni buzadi (full table scan'ga olib keladi).

---

## Aggregate va Window funksiyalar

**Aggregate**
```sql
SELECT COUNT(*), SUM(maosh), AVG(maosh), MIN(maosh), MAX(maosh) FROM xodimlar;
```
`COUNT(*)` — barcha qatorlar; `COUNT(ustun)` — faqat NULL bo'lmaganlar.

**Ranking: ROW_NUMBER, RANK, DENSE_RANK**
```sql
SELECT ism, maosh,
    ROW_NUMBER() OVER (ORDER BY maosh DESC) as row_num,
    RANK() OVER (ORDER BY maosh DESC) as rank_,
    DENSE_RANK() OVER (ORDER BY maosh DESC) as dense_rank_
FROM xodimlar;
```
Teng qiymatlarda: ROW_NUMBER — har doim noyob ketma-ket; RANK — bo'shliq qoldiradi (1,1,3); DENSE_RANK — bo'shliq qoldirmaydi (1,1,2).

**LAG va LEAD**
```sql
SELECT sana, sotuv,
    LAG(sotuv,1) OVER (ORDER BY sana) as oldingi,
    LEAD(sotuv,1) OVER (ORDER BY sana) as keyingi
FROM kunlik_sotuv;
```
Trend tahlili, o'sish/pasayish hisoblash uchun.

**Ikkinchi eng yuqori maoshni topish**
```sql
SELECT maosh FROM (
    SELECT maosh, DENSE_RANK() OVER (ORDER BY maosh DESC) as reyting
    FROM xodimlar
) t WHERE reyting = 2;
```
`DENSE_RANK()` — `MAX()` asosidagi yechimdan farqli, dublikatlarni to'g'ri boshqaradi va N-chi eng yuqorini topishga umumlashadi.

---

## CTE, Dublikatlar, Solishtirish

**CTE (Common Table Expressions)**
```sql
WITH yuqori_maoshli AS (
    SELECT * FROM xodimlar WHERE maosh > 5000
),
bolim_soni AS (
    SELECT bolim_id, COUNT(*) as soni FROM yuqori_maoshli GROUP BY bolim_id
)
SELECT * FROM bolim_soni WHERE soni > 3;
```
Subquery'dan o'qish oson, recursive CTE ierarxik ma'lumotlar uchun ham ishlatiladi.

**Dublikatlarni aniqlash va o'chirish**
```sql
-- Aniqlash
SELECT COUNT(*), COUNT(DISTINCT email) FROM foydalanuvchilar;
SELECT email, COUNT(*) FROM foydalanuvchilar GROUP BY email HAVING COUNT(*) > 1;

-- O'chirish (ROW_NUMBER bilan)
WITH raqamlangan AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) as rn
    FROM foydalanuvchilar
)
DELETE FROM raqamlangan WHERE rn > 1;
```

**Ikki jadvalni solishtirish (farqlarni topish)**
```sql
SELECT COALESCE(a.id, b.id) as id,
    CASE
        WHEN a.id IS NULL THEN 'Faqat B jadvalda'
        WHEN b.id IS NULL THEN 'Faqat A jadvalda'
        ELSE 'Ikkalasida ham'
    END as holat
FROM jadval_a a FULL OUTER JOIN jadval_b b ON a.id = b.id
WHERE a.id IS NULL OR b.id IS NULL;
```
(MySQL'da `FULL OUTER JOIN` yo'q — `LEFT JOIN UNION RIGHT JOIN` orqali simulyatsiya qilinadi.)

**UNION vs UNION ALL**
```sql
SELECT ism FROM mijozlar UNION SELECT ism FROM yetkazib_beruvchilar;      -- dublikatsiz
SELECT ism FROM mijozlar UNION ALL SELECT ism FROM yetkazib_beruvchilar; -- barchasi, tezroq
```

---

## View, Stored Procedure, Trigger, Transaction

**View**
```sql
CREATE VIEW faol_xodimlar AS
SELECT ism, bolim_id, maosh FROM xodimlar WHERE holat = 'faol';
```
Murakkab so'rovni soddalashtiruvchi virtual jadval, ma'lumot saqlamaydi.

**Stored Procedure vs Trigger**
```sql
-- Stored Procedure — qo'lda chaqiriladi
CREATE PROCEDURE MaoshOshirish(@bolim_id INT, @foiz DECIMAL) AS
BEGIN
    UPDATE xodimlar SET maosh = maosh * (1 + @foiz/100) WHERE bolim_id = @bolim_id;
END;

-- Trigger — hodisaga avtomatik javob
CREATE TRIGGER LogOzgarish ON xodimlar AFTER UPDATE AS
BEGIN
    INSERT INTO audit_log (xabar, vaqt) VALUES ('Xodim yangilandi', GETDATE());
END;
```

**Transaction va ACID**
```sql
BEGIN TRANSACTION;
    UPDATE hisoblar SET balans = balans - 100 WHERE id = 1;
    UPDATE hisoblar SET balans = balans + 100 WHERE id = 2;
COMMIT;  -- yoki ROLLBACK;
```
- **Atomicity** — hammasi yoki hech nima
- **Consistency** — qoidalar (constraints) doim bajariladi
- **Isolation** — parallel tranzaksiyalar bir-biriga xalaqit bermaydi
- **Durability** — COMMIT'dan keyin ma'lumot yo'qolmaydi

---

## Ma'lumot turlari

**CHAR vs VARCHAR**
```sql
CREATE TABLE misol (
    kod CHAR(5),        -- fixed-length, bo'shliq bilan to'ldiriladi, tezroq doimiy uzunlikda
    ism VARCHAR(50)      -- variable-length, xotira tejaydi
);
```

---

## OLTP vs OLAP

| | OLTP | OLAP |
|---|---|---|
| Maqsad | Kundalik tranzaksiyalar | Tahlil, hisobot |
| So'rov | Ko'p, kichik, tez | Kam, og'ir, murakkab |
| Struktura | Normalizatsiyalangan (3NF) | Denormalizatsiyalangan (star schema) |
| Misollar | MySQL, PostgreSQL | Snowflake, BigQuery, Redshift |

---

## Amaliy vaziyatlar

**So'rov ishlasa-yu, natija noto'g'ri bo'lsa nima qilish kerak?**
1) Har bir JOIN shartini alohida tekshirish (fan trap ehtimoli); 2) murakkab so'rovni CTE bilan bosqichlarga bo'lib tekshirish; 3) NULL solishtirishlarini tekshirish (`IS NULL`); 4) biznes talab bilan mantiqni qayta solishtirish.

**SQL'ning cheklovlari va alternativalari**
Murakkab statistik hisoblash, strukturasiz ma'lumot (JSON/matn/rasm), tez o'zgaruvchi sxema uchun unchalik qulay emas — Python/Pandas, NoSQL, ML kutubxonalari afzalroq bo'lishi mumkin.

**Qiyin vaziyatda nima qilish kerak?**
Talabni aniqlashtirish, mavjud kod namunalarini ko'rib chiqish, so'rovni bosqichlarga bo'lib test qilish, hujjat/jamoadan maslahat, kerak bo'lsa AI vositalaridan yordam (natijani albatta tekshirish bilan).

---

## PostgreSQL'ga xos mavzular

**MVCC (Multi-Version Concurrency Control)**
Har bir UPDATE/DELETE eski qatorni o'chirmaydi — yangi versiya yaratadi, eskisini "eskirgan" belgilaydi. O'qish va yozish bir-birini bloklamaydi. Eski versiyalar `VACUUM` orqali tozalanadi.

**Schema**
```sql
CREATE SCHEMA sotuv;
CREATE TABLE sotuv.buyurtmalar (id INT, mijoz_id INT);
```
Jadvallarni mantiqiy guruhlash, nomlar to'qnashuvining oldini olish.

**Sequence**
```sql
CREATE SEQUENCE mening_ketma_ketligim START 1 INCREMENT 1;
CREATE TABLE mahsulot (id SERIAL PRIMARY KEY, nomi TEXT);  -- SERIAL avtomatik sequence yaratadi
```

**EXPLAIN**
```sql
EXPLAIN ANALYZE SELECT * FROM xodimlar WHERE bolim_id = 3;
```
So'rov rejasi (Seq Scan/Index Scan, vaqt, qator soni) — optimallashtirishning birinchi qadami.

**VACUUM va Autovacuum**
```sql
VACUUM xodimlar;         -- bo'sh joyni qayta ishlatishga tayyorlaydi
VACUUM FULL xodimlar;    -- diskni haqiqatan bo'shatadi (jadval qulflanadi)
```
Autovacuum — fon jarayoni, chegaradan oshganda avtomatik ishga tushadi.

**Replikasiya**
Primary → WAL → Replica server(lar). Yuqori mavjudlik va o'qish yukini taqsimlash uchun. Streaming (real vaqt) va Logical (tanlangan jadvallar) turlari bor.

**Table space**
```sql
CREATE TABLESPACE tez_disk LOCATION '/mnt/ssd_disk';
```
Ma'lumotlarni turli fizik disklarga taqsimlash.

**JSON va JSONB**
```sql
CREATE TABLE mahsulotlar (id SERIAL, malumot JSONB);
SELECT malumot->>'nomi' FROM mahsulotlar WHERE (malumot->>'narx')::int > 300;
```
`JSONB` — binary, indekslash mumkin (GIN), qidiruv tezroq — amaliyotda odatda tavsiya etiladi.

**Extensions**
```sql
CREATE EXTENSION postgis;    -- geografik ma'lumotlar
CREATE EXTENSION pg_trgm;     -- matn o'xshashligi qidiruvi
```

**Cursor**
```sql
DECLARE mening_cursor CURSOR FOR SELECT * FROM katta_jadval;
FETCH NEXT FROM mening_cursor;
```
Katta natijalarni xotiraga to'liq yuklamasdan qatorma-qator qayta ishlash.

**Xavfsizlik**
Role-based access (`GRANT`/`REVOKE`), SSL shifrlash, `pg_hba.conf` (qaysi IP/foydalanuvchi qanday autentifikatsiya bilan ulanishi).
