# SQL — YouTube intervyularidan qo'shimcha savollar

> **Nima bu:** YouTube'dagi SQL intervyularida tez-tez beriladigan, lekin boshqa sahifalarda yo'q savollar. Takrorlanmasligi uchun umumiy mavzular boshqa joyda: SQL asoslari, JOIN, NULL, CTE, window funksiyalar, DELETE/TRUNCATE/DROP, CHAR/VARCHAR, ACID — `sql/BASICS.md`; PostgreSQL'ga xos mavzular (MVCC, VACUUM, JSONB, replikatsiya) — `sql/postgresql_interviews.md`; masalalar (ikkinchi eng katta maosh, dublikatlar) — `sql/practice_problems.md`.
> **Har bir javob tartibi:** oddiy tilda → batafsilroq (misol bilan) → intervyuda qanday aytasiz → esda tuting.

---

## Q1. SQL, MySQL va PostgreSQL o'rtasida qanday farq bor? NoSQL qayerga tushadi? / How do SQL, MySQL and PostgreSQL differ, and where does NoSQL fit?

**Oddiy qilib aytganda:** SQL — **til** (xuddi o'zbek tili kabi). MySQL, PostgreSQL, SQL Server, SQLite — shu tilda "gapiradigan" **dasturlar** (bazalar). Ularning har birida kichik "sheva" farqlari bor: biri `LIMIT` deydi, boshqasi `TOP`. NoSQL bazalar (MongoDB, Redis, Cassandra) esa jadval o'rniga boshqacha tuzilmalardan foydalanadi va odatda SQL'da gaplashmaydi.

**Batafsilroq:**

| Tushuncha | Nima | Misollar |
|---|---|---|
| SQL | relyatsion bazalar bilan ishlash tili (standart) | `SELECT`, `JOIN`, `GROUP BY` |
| DBMS | ma'lumotni saqlovchi va boshqaruvchi dastur | umumiy tushuncha |
| RDBMS | jadvallar, kalitlar va SQL bilan ishlovchi DBMS | PostgreSQL, MySQL, SQL Server, Oracle, SQLite |
| NoSQL | jadvalsiz: hujjat, kalit-qiymat, ustunli, graf | MongoDB, Redis, Cassandra, Neo4j |

```sql
SELECT * FROM users ORDER BY id LIMIT 10;        -- PostgreSQL, MySQL, SQLite
SELECT TOP 10 * FROM users ORDER BY id;          -- SQL Server
SELECT * FROM users ORDER BY id FETCH FIRST 10 ROWS ONLY;   -- SQL standarti (PostgreSQL ham qo'llaydi)
```

**Intervyuda shunday ayting:** "SQL — standart til, MySQL va PostgreSQL — uni amalga oshiruvchi RDBMS'lar, har birining o'z kengaytmalari bor. Tuzilgan, bog'liq ma'lumot va tranzaksiyalar uchun RDBMS'ni tanlayman; juda katta yozish oqimi, moslashuvchan sxema yoki kalit-qiymat kirish kerak bo'lganda — mos NoSQL."

**Esda tuting:** "NoSQL tezroq" — noto'g'ri umumlashma. Tezlik ma'lumot modeli va kirish usuliga mos tanlovga bog'liq; ko'p loyihalarga bitta PostgreSQL yetadi.

## Q2. Primary key, foreign key va unique key farqi nima? / What is the difference between primary, foreign and unique keys?

**Oddiy qilib aytganda:** **Primary key** — har qatorning pasport raqami: noyob va hech qachon bo'sh emas. **Unique key** — takrorlanmasligi kerak bo'lgan boshqa ustun (email, telefon). **Foreign key** — boshqa jadvaldagi qatorga "havola": buyurtma albatta mavjud mijozga tegishli bo'lishini baza o'zi tekshiradi.

**Batafsilroq:**

```sql
CREATE TABLE departments (
  id   bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,   -- noyob + NOT NULL, jadvalda bitta
  name text NOT NULL UNIQUE                               -- noyob, bir nechta bo'lishi mumkin
);

CREATE TABLE employees (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email         text UNIQUE,                               -- NULL'lar bir nechta bo'lishi mumkin
  department_id bigint NOT NULL REFERENCES departments(id) ON DELETE RESTRICT
);

INSERT INTO employees (email, department_id) VALUES ('a@x.uz', 999);
-- ❌ foreign key xatosi: 999 raqamli bo'lim yo'q
```

**Intervyuda shunday ayting:** "Primary key qatorni aniqlaydi — noyob va NOT NULL, jadvalda bittagina. Unique — biznes bo'yicha noyob ustunlar uchun, bir nechta bo'lishi mumkin. Foreign key havola yaxlitligini kafolatlaydi; `ON DELETE` harakatini ongli tanlayman — ko'pincha `RESTRICT`, `CASCADE` esa faqat haqiqatan bog'liq bolalar uchun."

**Esda tuting:** `UNIQUE` ustunda bir nechta `NULL` bo'lishi mumkin (ular "teng" hisoblanmaydi). PostgreSQL 15+ da buni `UNIQUE NULLS NOT DISTINCT` bilan taqiqlash mumkin. Foreign key ustunlariga indeksni o'zingiz qo'shing — PostgreSQL uni avtomatik yaratmaydi.

## Q3. Subquery yoki JOIN — qachon qaysi birini ishlatasiz? / Subquery or JOIN — when do you use which?

**Oddiy qilib aytganda:** ikkalasi ko'pincha bir xil natija beradi. **JOIN** — ikki jadvalning ustunlarini bitta natijada ko'rsatish kerak bo'lganda ("buyurtma va mijoz ismi"). **Subquery** (`EXISTS`, `IN`) — faqat "bormi/yo'qmi" ni tekshirish kerak bo'lganda ("buyurtmasi bor mijozlar"). To'g'ri tanlov o'qilishi oson va takrorlanishsiz natija beradi.

**Batafsilroq:**

```sql
-- Mijoz ismi + buyurtma summasi kerak → JOIN
SELECT c.name, o.total
FROM customers c JOIN orders o ON o.customer_id = c.id;

-- Faqat "buyurtmasi bor mijozlar" kerak → EXISTS (dublikatsiz)
SELECT c.name FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);

-- ❌ JOIN bilan qilsangiz, 5 ta buyurtmali mijoz 5 marta chiqadi
SELECT c.name FROM customers c JOIN orders o ON o.customer_id = c.id;
```

**Intervyuda shunday ayting:** "Boshqa jadvaldan ustun kerak bo'lsa — JOIN; faqat mavjudlikni tekshirish kerak bo'lsa — `EXISTS`, u qatorlarni ko'paytirmaydi va birinchi moslikda to'xtaydi. Tezlik bo'yicha zamonaviy planner'lar ko'pincha ikkalasini bir xil rejaga aylantiradi — yakuniy qaror `EXPLAIN ANALYZE` bilan."

**Esda tuting:** JOIN'dan keyin `DISTINCT` qo'shib takrorni "yashirish" — ko'pincha noto'g'ri tanlangan JOIN belgisi. `EXISTS` yoki oldindan agregatsiya qiling.

## Q4. Denormalizatsiya nima va qachon o'zini oqlaydi? / What is denormalization and when is it justified?

**Oddiy qilib aytganda:** normalizatsiya — har ma'lumot bir joyda. Denormalizatsiya — tezlik uchun ba'zi ma'lumotni **ataylab** takrorlash: har safar 5 ta jadvalni birlashtirib hisoblash o'rniga, tayyor natijani saqlab qo'yish. Narxi — takrorlangan ma'lumotni doim bir xil holda ushlab turish kerak.

**Batafsilroq:**

```sql
-- Har ko'rsatishda sanash o'rniga — tayyor hisoblagich
ALTER TABLE posts ADD COLUMN comments_count integer NOT NULL DEFAULT 0;

-- Uni izchil saqlash — izoh qo'shilganda bitta tranzaksiyada
BEGIN;
INSERT INTO comments (post_id, body) VALUES ($1, $2);
UPDATE posts SET comments_count = comments_count + 1 WHERE id = $1;
COMMIT;

-- Og'ir hisobot uchun — materialized view (vaqti-vaqti bilan yangilanadi)
CREATE MATERIALIZED VIEW daily_sales AS
SELECT date_trunc('day', created_at) AS day, sum(total) AS revenue FROM orders GROUP BY 1;
```

**Intervyuda shunday ayting:** "Avval normallashtiraman, keyin o'lchab, faqat isbotlangan tor joyni denormalizatsiya qilaman. Har takrorlangan qiymat uchun uni kim va qachon yangilashini belgilayman: bir tranzaksiyada, trigger bilan yoki materialized view'ni rejali yangilash bilan. Analitik tizimlar (OLAP) esa odatda ataylab denormallashgan bo'ladi."

**Esda tuting:** denormalizatsiya xatosi jim bo'ladi — hisoblagich asta-sekin haqiqatdan uzoqlashadi. Vaqti-vaqti bilan qayta hisoblab solishtiruvchi tekshiruv qo'ying.

## Q5. Ikki jadvalni solishtirib, farqlarini qanday topasiz? / How do you compare two tables and find the differences?

**Oddiy qilib aytganda:** migratsiya yoki import'dan keyin "eski va yangi jadval bir xilmi?" degan savol tug'iladi. `EXCEPT` — "birinchida bor, ikkinchida yo'q" qatorlarni beradi. Uni ikki tomonga qo'llasangiz — barcha farqlar ko'rinadi.

**Batafsilroq:**

```sql
-- Eski jadvalda bor, yangisida yo'q (yoki qiymati boshqacha)
SELECT id, email, status FROM customers_old
EXCEPT
SELECT id, email, status FROM customers_new;

-- Qaysi tomonda nima farq qilishini bitta natijada ko'rish
SELECT coalesce(o.id, n.id) AS id,
       CASE WHEN n.id IS NULL THEN 'faqat eskisida'
            WHEN o.id IS NULL THEN 'faqat yangisida'
            ELSE 'qiymat farqli' END AS difference
FROM customers_old o
FULL JOIN customers_new n ON n.id = o.id
WHERE o IS DISTINCT FROM n;   -- butun qatorni solishtirish (NULL'larni ham to'g'ri)
```

**Intervyuda shunday ayting:** "Tez tekshiruv uchun — ikki yo'nalishli `EXCEPT`. Qaysi qator qayerda ekanini ko'rsatish kerak bo'lsa — kalit bo'yicha `FULL JOIN` va `IS DISTINCT FROM`. Katta jadvallarda avval satrlar soni va ustunlar bo'yicha agregat (masalan, summa yoki hash) solishtiraman, keyin farqli bo'laklarni batafsil tekshiraman."

**Esda tuting:** `EXCEPT` dublikatlarni olib tashlaydi; takrorlar soni ham muhim bo'lsa — `EXCEPT ALL`.

## Q6. OLTP va OLAP farqi nima? / What is the difference between OLTP and OLAP?

**Oddiy qilib aytganda:** **OLTP** — do'kon kassasi: juda ko'p kichik, tez amallar ("bu buyurtmani saqla", "bu mijozni top"). **OLAP** — oy oxiridagi hisobot: kam, lekin ulkan so'rovlar ("oxirgi 3 yil bo'yicha har mintaqaning oylik savdosi"). Ular turli vazifa uchun turli tuzilgan tizimlarda yaxshi ishlaydi.

**Batafsilroq:**

| | OLTP | OLAP |
|---|---|---|
| So'rovlar | ko'p, kichik, tez (bir necha qator) | kam, katta (millionlab qator) |
| Maqsad | biznes amallarini bajarish | tahlil va hisobot |
| Sxema | normallashgan (3NF) | denormallashgan (star/snowflake) |
| Saqlash | qator bo'yicha (row store) | ustun bo'yicha (column store) |
| Misollar | PostgreSQL, MySQL | ClickHouse, BigQuery, Snowflake, DuckDB |

**Intervyuda shunday ayting:** "OLTP yozish va nuqtali o'qish uchun, OLAP — katta skan va agregatlar uchun optimallashgan. Og'ir analitik so'rovlarni asosiy OLTP bazada ishlatmayman — ular foydalanuvchi so'rovlarini sekinlashtiradi. Ma'lumotni CDC yoki ETL orqali analitik omborga yoki hech bo'lmasa read replica'ga olib chiqaman."

**Esda tuting:** ustunli saqlash analitikada tez, chunki so'rov faqat kerakli ustunlarni o'qiydi va bir xil qiymatlar yaxshi siqiladi.

## Q7. So'rov xatosiz ishladi, lekin natija noto'g'ri — nima qilasiz? / The query runs without errors but the result is wrong — what do you do?

**Oddiy qilib aytganda:** xato bermaydigan noto'g'ri so'rov — eng xavflisi, chunki uni hech kim sezmaydi. Uni bo'laklab tekshirish kerak: har qadamda qatorlar sonini ko'rish, kichik ma'lum ma'lumotda natijani qo'lda hisoblangan javob bilan solishtirish. Ko'p uchraydigan sabablar: JOIN qatorlarni ko'paytirgan, `NULL` e'tiborsiz qolgan, noto'g'ri `GROUP BY`.

**Batafsilroq:**

```sql
-- 1) Har bosqichda qatorlar sonini tekshirish
SELECT count(*) FROM orders WHERE created_at >= '2026-09-01';          -- 1200
SELECT count(*) FROM orders o JOIN order_items i ON i.order_id = o.id
WHERE o.created_at >= '2026-09-01';                                    -- 3900 → JOIN ko'paytirdi!

-- 2) ❌ Buyurtma summasi har mahsulot qatori uchun takror qo'shilgan
SELECT sum(o.total) FROM orders o JOIN order_items i ON i.order_id = o.id;

-- ✅ Avval agregat, keyin JOIN (yoki summani faqat bir tomondan olish)
SELECT sum(total) FROM orders WHERE created_at >= '2026-09-01';
```

**Intervyuda shunday ayting:** "So'rovni qismlarga bo'lib, har JOIN'dan keyin qatorlar soni va kalit bo'yicha noyoblikni tekshiraman. Tipik xatolar: 'bir-ko'p' JOIN'dan keyin summa takrorlanishi, `NULL` sabab tushib qolgan qatorlar, `LEFT JOIN` ni `WHERE` bilan `INNER` ga aylantirish, sana chegaralari va vaqt mintaqasi. Tuzatishni ma'lum natijali kichik test ma'lumoti bilan tasdiqlayman."

**Esda tuting:** hisobot raqamlarini boshqa mustaqil manba (masalan, to'lov tizimi hisoboti) bilan solishtirish — eng yaxshi tekshiruv.

## Q8. SQL qachon to'g'ri vosita emas va qanday alternativalar bor? / When is SQL not the right tool and what are the alternatives?

**Oddiy qilib aytganda:** SQL tuzilgan, bog'liq ma'lumotlar va tranzaksiyalar uchun ajoyib. Lekin ba'zi vazifalarga maxsus vositalar yaxshiroq mos keladi: to'liq matnli murakkab qidiruv, juda chuqur graf munosabatlari ("do'stimning do'stining do'sti"), sekundiga millionlab yozuvli vaqt qatorlari yoki ulkan analitika.

**Batafsilroq:**

| Vazifa | Nega relyatsion baza qiynaladi | Alternativa |
|---|---|---|
| Murakkab to'liq matnli qidiruv, fasetlar | relevantlik, sinonimlar, katta indekslar | Elasticsearch/OpenSearch (yoki boshlanishiga PostgreSQL FTS) |
| Chuqur graf so'rovlari | ko'p darajali JOIN'lar qimmat | Neo4j yoki graf kengaytmalari |
| Juda katta analitika | qator bo'yicha saqlash skanda sekin | ClickHouse, BigQuery, DuckDB |
| Kesh, sessiya, hisoblagichlar | disk va tranzaksiya narxi | Redis/Valkey |
| Vektor (semantik) qidiruv | maxsus indeks kerak | pgvector (PostgreSQL ichida) yoki vektor bazalar |

**Intervyuda shunday ayting:** "Standart tanlovim — PostgreSQL: u JSONB, to'liq matnli qidiruv, pgvector kabi kengaytmalar bilan ko'p ehtiyojni yopadi. Alohida tizimni faqat o'lchangan ehtiyoj bo'lganda qo'shaman, chunki har yangi baza — yangi zaxira nusxa, monitoring va ma'lumotni sinxronlash muammosi."

**Esda tuting:** asosiy haqiqat manbai bitta bo'lsin; qidiruv yoki analitika tizimlari undan (CDC orqali) to'ldiriladigan nusxalar bo'lsin.
