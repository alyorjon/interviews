# PostgreSQL amaliy intervyu ssenariylari

> **Nima bu:** "loyihada shunday muammo chiqdi — nima qilasiz?" turidagi PostgreSQL savollari. SQL va PostgreSQL nazariyasi — `sql/BASICS.md` va `sql/postgresql_interviews.md` da; bu yerda faqat amaliy ssenariylar.
> **Har bir javob tartibi:** muammo oddiy tilda → yechim (SQL bilan) → qanday tekshirasiz → intervyuda qanday aytasiz → esda tuting.
> **Versiya:** PostgreSQL 18 (2025-yil 25-sentabr; 19 hozir beta'da). 18 yangiliklari: asinxron I/O (`io_method`), ko'p ustunli B-tree indekslar uchun skip scan, o'rnatilgan `uuidv7()`, virtual generated ustunlar standart holatga aylandi, `RETURNING old.*, new.*`, `NOT NULL ... NOT VALID`, `EXPLAIN ANALYZE` `BUFFERS` ni avtomatik ko'rsatadi, `pg_upgrade` statistikani saqlaydi. **Asosiy manba:** [postgresql.org/docs](https://www.postgresql.org/docs/current/).

---

# Ssenariylar

## Q1. So'rov production'da sekin va jamoa "shu ustunga indeks qo'shamiz" deb taxmin qilyapti — nima qilasiz? / A query is slow in production and the team is guessing which index to add — what do you do?

**Oddiy qilib aytganda:** taxmin bilan qo'shilgan indeks yordam bermasligi mumkin, lekin har `INSERT`/`UPDATE` ni sekinlashtiradi va disk egallaydi. Avval PostgreSQL'dan so'rash kerak: "bu so'rovni **qanday** bajaryapsan va vaqt **qayerga** ketyapti?" Bunga `EXPLAIN ANALYZE` javob beradi.

**Yechim:**

```sql
EXPLAIN (ANALYZE, BUFFERS)          -- PG 18 da BUFFERS ANALYZE bilan avtomatik
SELECT * FROM orders
WHERE customer_id = 42 AND status = 'paid'
ORDER BY created_at DESC
LIMIT 20;

-- Natijada nimaga qarash kerak:
--   Seq Scan on orders ... rows=20 ... Rows Removed by Filter: 4999980   ← butun jadval o'qilgan
--   Buffers: shared read=180000                                          ← diskdan ko'p o'qish
--   estimated rows=1 vs actual rows=50000                                ← statistika eskirgan

-- Shundan keyingina — so'rovga mos indeks:
CREATE INDEX CONCURRENTLY orders_customer_status_created_idx
    ON orders (customer_id, status, created_at DESC);
```

**Qanday tekshirasiz:** indeksdan keyin `EXPLAIN ANALYZE` ni qayta ishga tushiring: `Index Scan`, `Execution Time` va `Buffers` keskin kamayishi kerak. `pg_stat_statements` da so'rovning o'rtacha vaqtini oldin va keyin solishtiring.

**Intervyuda shunday ayting:** "Avval o'lchayman: `pg_stat_statements` bilan eng qimmat so'rovlarni topaman, `EXPLAIN (ANALYZE, BUFFERS)` bilan rejaga qarayman — taxminiy va haqiqiy qatorlar farqi, filtr bilan tashlangan qatorlar, diskdan o'qish. Indeksni so'rovning `WHERE` va `ORDER BY` qismiga moslab, production'da `CONCURRENTLY` bilan yarataman."

**Esda tuting:** `EXPLAIN ANALYZE` so'rovni **haqiqatan bajaradi** — `UPDATE`/`DELETE` ni tekshirsangiz, `BEGIN; ... ROLLBACK;` ichida qiling. Manba: [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html).

## Q2. Email bo'yicha katta-kichik harfsiz qidiruv butun jadvalni o'qiyapti — nima qilasiz? / A case-insensitive email search scans the whole table — what do you do?

**Oddiy qilib aytganda:** `email` ustunida indeks bor, lekin so'rov `WHERE lower(email) = ...` — ya'ni ustunning o'zini emas, **undan hisoblangan** qiymatni qidiryapti. Oddiy indeks `lower(email)` ni bilmaydi. Yechim: aynan shu ifoda bo'yicha indeks yaratish.

**Yechim:**

```sql
-- So'rov
SELECT id FROM users WHERE lower(email) = lower($1);

-- Ifodaga mos indeks (unique — "Ali@x.uz" va "ali@x.uz" ikki akkaunt bo'lmasin)
CREATE UNIQUE INDEX CONCURRENTLY users_email_lower_key ON users (lower(email));
```

**Qanday tekshirasiz:** `EXPLAIN` da `Index Scan using users_email_lower_key` ko'rinishi kerak. `INSERT` bilan `Ali@X.uz` va `ali@x.uz` ni qo'shsangiz — ikkinchisi unique xatosi berishi kerak.

**Intervyuda shunday ayting:** "Indeks so'rovdagi ifodaga **aynan** mos bo'lishi kerak: so'rov `lower(email)` bo'yicha bo'lsa — indeks ham `lower(email)` bo'yicha. Uni unique qilsam, katta-kichik harf bilan dublikat akkauntlar ham oldini olinadi."

**Esda tuting:** so'rovda `lower()`, indeksda `upper()` bo'lsa — indeks ishlatilmaydi. Bitta qoidani tanlang va hamma joyda qo'llang. Manba: [Indexes on Expressions](https://www.postgresql.org/docs/current/indexes-expressional.html).

## Q3. Faqat "active" buyurtmalar qidiriladi, lekin indeks 99% eski buyurtmalar bilan to'lgan — nima qilasiz? / Only "active" orders are queried but the index is 99% old orders — what do you do?

**Oddiy qilib aytganda:** jadvalda 50 million buyurtma, shundan faqat 10 mingtasi faol. To'liq indeks hammasini o'z ichiga oladi — katta, sekin va xotiraga sig'maydi. **Qisman (partial) indeks** faqat kerakli qatorlarni — `status = 'active'` bo'lganlarni saqlaydi: kichik va tez.

**Yechim:**

```sql
CREATE INDEX CONCURRENTLY orders_active_created_idx
    ON orders (created_at)
    WHERE status = 'active';

-- Indeks ishlatilishi uchun so'rov shartni o'z ichiga olishi kerak
SELECT id FROM orders WHERE status = 'active' ORDER BY created_at LIMIT 100;
```

**Qanday tekshirasiz:** indeks hajmini solishtiring: `SELECT pg_size_pretty(pg_relation_size('orders_active_created_idx'));` — to'liq indeksdan yuzlab marta kichik bo'lishi kerak. `EXPLAIN` da shu indeks tanlanganini ko'ring.

**Intervyuda shunday ayting:** "Kichik, tez-tez so'raladigan qism uchun partial indeks: u kichik, keshda to'liq turadi va arxiv qatorlarga yozish uni yangilamaydi. Muhim shart — so'rovdagi `WHERE` indeks shartini mantiqan qamrab olishi kerak, aks holda planner undan foydalana olmaydi."

**Esda tuting:** so'rovda `status = $1` (parametr) bo'lsa, planner uni indeks shartiga moslay olmasligi mumkin — shartni so'rovda aniq qiymat bilan yozing. Manba: [Partial Indexes](https://www.postgresql.org/docs/current/indexes-partial.html).

## Q4. Ikki worker bir xil vazifani bir vaqtda olib, ikki marta bajaryapti — nima qilasiz? / Two workers pick the same job at the same time and run it twice — what do you do?

**Oddiy qilib aytganda:** ikkala worker bir vaqtda "tayyor vazifa bormi?" deb so'radi va ikkalasi ham bir xil qatorni ko'rdi. Yechim: vazifani olishda qatorni **qulflash** — bittasi olgan qatorni ikkinchisi ko'rmasin va **kutmasin ham**, keyingi bo'sh vazifaga o'tsin. Buni `FOR UPDATE SKIP LOCKED` qiladi.

**Yechim:**

```sql
-- Bitta atomik so'rov: tanlash + qulflash + holatni o'zgartirish
UPDATE jobs
SET status = 'running', started_at = now(), worker_id = $1
WHERE id = (
    SELECT id FROM jobs
    WHERE status = 'ready'
    ORDER BY created_at
    LIMIT 1
    FOR UPDATE SKIP LOCKED           -- band qatorni o'tkazib yubor, kutma
)
RETURNING id, payload;
```

**Qanday tekshirasiz:** 10 ta worker'ni 1000 ta vazifa bilan parallel ishga tushiring — har vazifa **aniq bir marta** bajarilishi kerak (`SELECT id, count(*) ... HAVING count(*) > 1` bo'sh).

**Intervyuda shunday ayting:** "PostgreSQL'ni oddiy navbat sifatida ishlatishda `FOR UPDATE SKIP LOCKED` — worker'lar bir-birini kutmaydi va bir qatorni ikki marta olmaydi. Worker yiqilsa, `running` holatida qolgan vazifalarni vaqt bo'yicha qaytarib beradigan tozalovchi kerak."

**Esda tuting:** vazifa bajarilishi uzoq bo'lsa, qulfni ushlab uzun tranzaksiya ochmang — holatni `running` qilib commit qiling, ishni tranzaksiyadan tashqarida bajaring. Manba: [Explicit Locking](https://www.postgresql.org/docs/current/explicit-locking.html), [SELECT — The Locking Clause](https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE).

## Q5. Balans tekshirilib, keyin yechilyapti va parallel so'rovlarda balans manfiy bo'lib qoldi — nima qilasiz? / The balance is checked then debited, and parallel requests made it negative — what do you do?

**Oddiy qilib aytganda:** kod ikki qadamda ishlaydi: (1) "balans 100 mi? ha", (2) "100 ni yech". Ikki so'rov bir vaqtda (1)-qadamni o'tadi — ikkalasi ham "ha" ko'radi va 200 yechiladi. Yechim: tekshirish va yechishni **bitta** atomik buyruqqa birlashtirish.

**Yechim:**

```sql
-- ❌ ikki qadam — orasida boshqa so'rov kirib qoladi
SELECT balance FROM accounts WHERE id = $1;          -- 100
UPDATE accounts SET balance = balance - 100 WHERE id = $1;

-- ✅ bitta shartli UPDATE
UPDATE accounts
SET balance = balance - $2
WHERE id = $1 AND balance >= $2
RETURNING balance;                                   -- 0 qator qaytsa → mablag' yetarli emas

-- ✅ qo'shimcha himoya — baza darajasidagi qoida
ALTER TABLE accounts ADD CONSTRAINT balance_non_negative CHECK (balance >= 0);
```

**Qanday tekshirasiz:** balans 100 bo'lgan akkauntdan bir vaqtda 10 ta "100 yech" so'rovi yuboring — faqat **bittasi** muvaffaqiyatli bo'lishi va balans 0 qolishi kerak.

**Intervyuda shunday ayting:** "'O'qi, tekshir, yoz' — poyga holati. Shartni `UPDATE ... WHERE balance >= $2` ga qo'yaman: PostgreSQL qatorni qulflaydi va shartni yangi qiymat bo'yicha qayta tekshiradi. Oxirgi himoya — `CHECK` constraint: kodda xato bo'lsa ham, baza manfiy balansni saqlamaydi."

**Esda tuting:** murakkab mantiq uchun `SELECT ... FOR UPDATE` yoki `SERIALIZABLE` izolyatsiya — lekin ikkinchisida serialization xatolarida so'rovni qayta urinish shart. Manba: [Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html).

## Q6. "Email bandmi?" deb tekshirib, keyin qo'shganda baribir dublikat akkauntlar paydo bo'lyapti — nega? / Checking "is this email taken?" before inserting still produces duplicate accounts — why?

**Oddiy qilib aytganda:** ikki foydalanuvchi bir vaqtda bir xil email bilan ro'yxatdan o'tmoqda: ikkalasi `SELECT` qiladi — "bo'sh", ikkalasi `INSERT` qiladi — dublikat. Ilova kodidagi tekshiruv bu poygani to'xtata olmaydi. Faqat bazaning o'zidagi **UNIQUE** qoidasi ishonchli.

**Yechim:**

```sql
ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email);

-- Tekshirmasdan qo'shish — to'qnashuvni baza hal qiladi
INSERT INTO users (email, name)
VALUES ($1, $2)
ON CONFLICT (email) DO NOTHING
RETURNING id;                   -- qator qaytmasa → email band
```

**Qanday tekshirasiz:** bir xil email bilan 20 ta parallel ro'yxatdan o'tish — jadvalda aynan **bitta** qator; qolganlari "email band" javobini oladi (500 emas).

**Intervyuda shunday ayting:** "Noyoblikni ilova emas, baza kafolatlaydi — `UNIQUE` constraint. `INSERT ... ON CONFLICT DO NOTHING RETURNING` bilan tekshirish va yozish bitta atomik amal bo'ladi. Qator qaytmasa — foydalanuvchiga tushunarli xabar."

**Esda tuting:** `ON CONFLICT DO UPDATE` (upsert) ham bor — "bor bo'lsa yangila, yo'q bo'lsa qo'sh" holati uchun. Manba: [INSERT — ON CONFLICT](https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT).

## Q7. Bitta endpoint'da tenant filtri unutilib, bir mijoz boshqasining hisob-fakturalarini ko'rdi — nima qilasiz? / One endpoint forgot the tenant filter and a customer saw another customer's invoices — what do you do?

**Oddiy qilib aytganda:** ko'p mijozli (multi-tenant) tizimda har so'rovga `WHERE tenant_id = ...` qo'shish kerak. Yuzta so'rovdan bittasida unutildi — ma'lumot sizib chiqdi. **Row Level Security (RLS)** bu filtrni **baza darajasida** majburiy qiladi: so'rovda filtr yo'q bo'lsa ham, baza faqat joriy tenant qatorlarini qaytaradi.

**Yechim:**

```sql
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices FORCE ROW LEVEL SECURITY;          -- jadval egasi uchun ham

CREATE POLICY tenant_isolation ON invoices
    USING (tenant_id = current_setting('app.tenant_id')::uuid)
    WITH CHECK (tenant_id = current_setting('app.tenant_id')::uuid);

-- Ilova har tranzaksiya boshida (faqat shu tranzaksiya uchun):
BEGIN;
SELECT set_config('app.tenant_id', $1, true);            -- true = LOCAL
SELECT * FROM invoices;                                  -- WHERE siz ham faqat o'z tenant'i
COMMIT;
```

**Qanday tekshirasiz:** A tenant sessiyasida filtrsiz `SELECT * FROM invoices` — faqat A qatorlari. B tenant'iga tegishli `tenant_id` bilan `INSERT` — `WITH CHECK` xatosi.

**Intervyuda shunday ayting:** "Ilova filtri — birinchi himoya qatlami, RLS — ikkinchisi va majburiysi. Ilova superuser yoki `BYPASSRLS` huquqli rol bilan ulanmasligi kerak, aks holda RLS e'tiborsiz qoladi. Pool ishlatilganda sozlamani `set_config(..., true)` bilan faqat tranzaksiyaga beraman — keyingi so'rovga oqib o'tmasin."

**Esda tuting:** RLS policy'dagi `tenant_id` ustuniga indeks qo'ying — aks holda har so'rov butun jadvalni filtrlaydi. Manba: [Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).

## Q8. JSONB ichidagi kalit bo'yicha qidiruv katta jadvalda sekinlashdi — nima qilasiz? / Searching by a key inside JSONB got slow on a big table — what do you do?

**Oddiy qilib aytganda:** JSONB — moslashuvchan, lekin indekssiz har qidiruv har qatorning JSON'ini ochib ko'radi. Yechim qidiruv turiga bog'liq: "ichida shu narsa bormi?" (`@>`) turidagi qidiruv uchun **GIN** indeks; bitta aniq maydon bo'yicha tenglik uchun — o'sha maydonga **ifoda indeksi**.

**Yechim:**

```sql
-- 1) "tarkibida bormi?" qidiruvi
SELECT * FROM events WHERE payload @> '{"type": "signup", "country": "UZ"}';
CREATE INDEX CONCURRENTLY events_payload_gin ON events USING GIN (payload jsonb_path_ops);

-- 2) bitta maydon bo'yicha tenglik yoki saralash
SELECT * FROM events WHERE payload->>'user_id' = '42';
CREATE INDEX CONCURRENTLY events_user_id_idx ON events ((payload->>'user_id'));
```

**Qanday tekshirasiz:** `EXPLAIN ANALYZE` da `Bitmap Index Scan on events_payload_gin` yoki `Index Scan on events_user_id_idx` bo'lishi kerak. Indeks hajmini ham kuzating.

**Intervyuda shunday ayting:** "Indeks turini operatorga qarab tanlayman: `@>` uchun GIN (`jsonb_path_ops` kichikroq va tezroq), `->>` tengligi uchun B-tree ifoda indeksi. Agar biror maydon doim so'ralsa — uni oddiy ustunga chiqaraman: tip, constraint va statistika bilan bu JSON ichidagidan yaxshiroq."

**Esda tuting:** `jsonb_path_ops` faqat `@>` va jsonpath operatorlarini qo'llaydi — `?` (kalit bormi) uchun standart `jsonb_ops` kerak. Manba: [JSON Indexing](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING).

## Q9. Tez-tez yangilanadigan jadval kundan-kunga kattalashib, so'rovlar sekinlashyapti — nima qilasiz? / A frequently updated table keeps growing and queries get slower — what do you do?

**Oddiy qilib aytganda:** PostgreSQL'da `UPDATE` eski qatorni o'chirmaydi — yangisini yozadi, eskisi "o'lik" (dead tuple) bo'lib qoladi. Ularni **VACUUM** tozalaydi. Agar autovacuum yetishmasa, o'lik qatorlar to'planadi: jadval "shishadi" (bloat) va so'rovlar keraksiz sahifalarni ham o'qiydi.

**Yechim:**

```sql
-- 1) Holatni ko'rish
SELECT relname, n_live_tup, n_dead_tup, last_autovacuum, autovacuum_count
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC
LIMIT 10;

-- 2) Katta, tez o'zgaradigan jadval uchun autovacuum'ni tezroq ishga tushirish
ALTER TABLE sessions SET (
    autovacuum_vacuum_scale_factor = 0.02,    -- standart 0.2 (20%) — katta jadvalda juda kech
    autovacuum_vacuum_threshold = 1000
);
```

**Qanday tekshirasiz:** bir necha kun davomida `n_dead_tup` / `n_live_tup` nisbati past (masalan, 5% dan kam) qolishi va `last_autovacuum` muntazam yangilanib turishi kerak.

**Intervyuda shunday ayting:** "MVCC tufayli har UPDATE o'lik qator qoldiradi. Standart `scale_factor` 20% — 100 million qatorli jadvalda bu 20 million o'lik qator kutish degani. Katta jadvallar uchun sozlamani jadval darajasida pasaytiraman. Uzoq ochiq tranzaksiyalar ham vacuum'ni to'sadi — ularni ham tekshiraman (Q13)."

**Esda tuting:** `VACUUM FULL` jadvalni butunlay qulflaydi — production'da ishlatmang. Allaqachon shishgan jadvalni qulflamasdan siqish uchun `pg_repack` kabi vositalar bor. Manba: [Routine Vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html).

## Q10. Katta import'dan keyin planner noto'g'ri reja tanlab, so'rov 100 marta sekinlashdi — nima qilasiz? / After a big import the planner picks a bad plan and the query is 100x slower — what do you do?

**Oddiy qilib aytganda:** planner rejani **statistikaga** qarab tanlaydi: "bu jadvalda qancha qator bor, qiymatlar qanday taqsimlangan". Import'dan keyin statistika eskirgan — planner "10 ta qator" deb o'ylaydi, aslida 10 million. Yechim: statistikani yangilash va kerak bo'lsa, uni aniqroq qilish.

**Yechim:**

```sql
-- 1) Taxmin va haqiqatni solishtirish
EXPLAIN ANALYZE SELECT * FROM orders WHERE status = 'refunded';
--  ... (rows=12) (actual rows=2400000)    ← katta farq = eskirgan statistika

-- 2) Statistikani yangilash
ANALYZE orders;

-- 3) Taqsimoti notekis ustun uchun batafsilroq statistika
ALTER TABLE orders ALTER COLUMN status SET STATISTICS 1000;
ANALYZE orders;

-- 4) Bog'liq ustunlar uchun (masalan, shahar va pochta indeksi)
CREATE STATISTICS orders_city_zip (dependencies) ON city, zip FROM orders;
ANALYZE orders;
```

**Qanday tekshirasiz:** `EXPLAIN ANALYZE` da taxminiy (`rows=`) va haqiqiy (`actual rows=`) qiymatlar bir tartibda bo'lishi va reja yaxshilanishi kerak.

**Intervyuda shunday ayting:** "Reja yomon bo'lsa, birinchi navbatda taxmin va haqiqiy qatorlar sonini solishtiraman. Katta yuklash yoki o'chirishdan keyin `ANALYZE` ni o'zim chaqiraman, autovacuum'ni kutmayman. Ustunlar bir-biriga bog'liq bo'lsa — `CREATE STATISTICS`."

**Esda tuting:** PostgreSQL 18 da `pg_upgrade` statistikani saqlaydi — ilgari major versiyani yangilagandan keyin darhol `ANALYZE` qilinmasa, hamma so'rovlar sekinlashishi mumkin edi. Manba: [Statistics Used by the Planner](https://www.postgresql.org/docs/current/planner-stats.html).

## Q11. 200 million eski qatorni bitta DELETE bilan o'chirish bazani soatlab qiynadi — nima qilasiz? / Deleting 200 million old rows in one DELETE hurt the database for hours — what do you do?

**Oddiy qilib aytganda:** bitta ulkan `DELETE` — bitta ulkan tranzaksiya: uzoq qulflar, ulkan WAL (jurnal) oqimi, replikalar orqada qoladi, vacuum esa oxirida yana ko'p ish qiladi. Ikki yechim: (1) **kichik bo'laklarda** o'chirish; (2) eng yaxshisi — jadvalni vaqt bo'yicha **partition'larga** bo'lib, eski partition'ni butunlay tashlab yuborish.

**Yechim:**

```sql
-- 1) Bo'laklab o'chirish (har bo'lak — alohida qisqa tranzaksiya)
DELETE FROM events
WHERE id IN (
    SELECT id FROM events
    WHERE created_at < now() - interval '1 year'
    LIMIT 5000
);
-- 0 qator qolguncha takrorlanadi, bo'laklar orasida qisqa pauza

-- 2) Partitioning — o'chirish o'rniga tashlab yuborish (bir zumda)
CREATE TABLE events (
    id bigint GENERATED ALWAYS AS IDENTITY,
    created_at timestamptz NOT NULL,
    payload jsonb
) PARTITION BY RANGE (created_at);

CREATE TABLE events_2025 PARTITION OF events
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

ALTER TABLE events DETACH PARTITION events_2025 CONCURRENTLY;
DROP TABLE events_2025;
```

**Qanday tekshirasiz:** o'chirish davomida replika kechikishi (`pg_stat_replication.replay_lag`) va so'rovlar vaqti me'yorda qolishi kerak.

**Intervyuda shunday ayting:** "Vaqt bo'yicha o'sadigan ma'lumot — log, hodisa, metrika — uchun oldindan partitioning: eski davr bitta `DETACH` + `DROP` bilan ketadi, vacuum ham kerak emas. Partitioning bo'lmasa — kichik bo'laklarda, replika kechikishini kuzatib o'chiraman."

**Esda tuting:** `DETACH ... CONCURRENTLY` tranzaksiya bloki ichida ishlamaydi va jadvalda default partition bo'lsa ishlatib bo'lmaydi. Manba: [Table Partitioning](https://www.postgresql.org/docs/current/ddl-partitioning.html).

## Q12. Mahsulot nomi bo'yicha LIKE '%telefon%' qidiruvi indeksdan foydalanmayapti — nima qilasiz? / Searching product names with LIKE '%phone%' doesn't use any index — what do you do?

**Oddiy qilib aytganda:** oddiy B-tree indeks lug'at kabi — so'zni **boshidan** qidirish oson (`'tel%'`), lekin **o'rtasidan** (`'%tel%'`) — yo'q. Ikki vosita bor: `pg_trgm` — so'zni 3 harfli bo'laklarga ajratib, o'rtasidan qidirishni ham tezlashtiradi; **full-text search** — so'zlar va ularning shakllari bo'yicha qidiruv.

**Yechim:**

```sql
-- 1) Qism satr / imlo xatosiga chidamli qidiruv
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX CONCURRENTLY products_name_trgm ON products USING GIN (name gin_trgm_ops);

SELECT id, name FROM products WHERE name ILIKE '%telefon%';          -- endi indeks ishlatiladi

-- 2) So'zlar bo'yicha qidiruv (full-text)
ALTER TABLE products ADD COLUMN search tsvector
    GENERATED ALWAYS AS (to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(description, ''))) STORED;
CREATE INDEX CONCURRENTLY products_search_idx ON products USING GIN (search);

SELECT id, name FROM products WHERE search @@ websearch_to_tsquery('simple', 'samsung telefon');
```

**Qanday tekshirasiz:** `EXPLAIN ANALYZE` da `Bitmap Index Scan on products_name_trgm` va vaqt keskin kamayishi kerak.

**Intervyuda shunday ayting:** "Qism satr va imlo xatosi uchun — `pg_trgm` GIN; so'z bo'yicha, relevantlik bilan qidiruv uchun — full-text search. O'zbek tili uchun tayyor lug'at yo'q, shuning uchun `simple` konfiguratsiyadan foydalanaman. Juda murakkab qidiruv (fasetlar, sinonimlar) kerak bo'lsa — alohida qidiruv tizimi."

**Esda tuting:** 3 harfdan qisqa qidiruv so'zlarida trigram indeks deyarli yordam bermaydi — minimal uzunlik qo'ying. Manba: [pg_trgm](https://www.postgresql.org/docs/current/pgtrgm.html), [Text Search Indexes](https://www.postgresql.org/docs/current/textsearch-indexes.html).

## Q13. Kimdir tranzaksiyani ochib, yopmay ketdi — vacuum ishlamay, disk o'syapti — nima qilasiz? / Someone left a transaction open — vacuum is blocked and the disk keeps growing — what do you do?

**Oddiy qilib aytganda:** ochiq tranzaksiya "men eski ma'lumotni ko'rishim mumkin" deydi. Shuning uchun VACUUM u boshlanganidan keyingi **hech bir** o'lik qatorni o'chira olmaydi — butun baza shishadi. Ko'pincha sabab: `BEGIN` qilib, xatoda `ROLLBACK` qilmagan kod yoki ochiq qolgan admin konsoli.

**Yechim:**

```sql
-- 1) Eng eski tranzaksiyalarni topish
SELECT pid, usename, application_name, state,
       now() - xact_start AS xact_age, left(query, 80) AS last_query
FROM pg_stat_activity
WHERE xact_start IS NOT NULL
ORDER BY xact_start
LIMIT 10;

-- 2) Aniq aybdorni to'xtatish
SELECT pg_terminate_backend(12345);

-- 3) Kelajakda oldini olish (ilova roli uchun)
ALTER ROLE app_user SET idle_in_transaction_session_timeout = '30s';
ALTER ROLE app_user SET transaction_timeout = '5min';     -- PostgreSQL 17+
```

**Qanday tekshirasiz:** monitoring'da "eng eski tranzaksiya yoshi" metrikasi va unga ogohlantirish (masalan, 10 daqiqadan oshsa). Timeout'ni tekshirish: `BEGIN;` qilib 30 soniya kuting — sessiya uzilishi kerak.

**Intervyuda shunday ayting:** "`idle in transaction` holatidagi sessiyalar — jim qotil: qulflarni ushlaydi va vacuum'ni to'sadi. Ilova rolida `idle_in_transaction_session_timeout` va `transaction_timeout` qo'yaman, eng eski tranzaksiya yoshini kuzataman. Tranzaksiya ichida tashqi API chaqirmayman."

**Esda tuting:** replikadagi uzoq so'rovlar ham (`hot_standby_feedback = on` bo'lsa) asosiy serverda vacuum'ni to'sishi mumkin. Manba: [pg_stat_activity](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW), [Client Connection Defaults](https://www.postgresql.org/docs/current/runtime-config-client.html).

## Q14. So'rov bir mijoz uchun tez, boshqasi uchun juda sekin — bir xil prepared statement — nega? / The same prepared statement is fast for one customer and very slow for another — why?

**Oddiy qilib aytganda:** prepared statement'ni PostgreSQL birinchi 5 marta har parametr uchun **alohida** reja bilan bajaradi, keyin esa bitta **umumiy** (generic) rejaga o'tishi mumkin. Umumiy reja "o'rtacha mijoz" uchun yaxshi, lekin 5 million buyurtmali ulkan mijoz uchun dahshatli bo'lishi mumkin.

**Yechim:**

```sql
-- 1) Ikki rejani solishtirish
PREPARE orders_for(int) AS SELECT * FROM orders WHERE customer_id = $1;

SET plan_cache_mode = force_custom_plan;
EXPLAIN (ANALYZE) EXECUTE orders_for(42);       -- har parametrga o'z reja

SET plan_cache_mode = force_generic_plan;
EXPLAIN (ANALYZE) EXECUTE orders_for(42);       -- umumiy reja

-- 2) Muammoli so'rovlar uchun (ilova roli yoki sessiya darajasida)
ALTER ROLE reporting_user SET plan_cache_mode = force_custom_plan;
```

**Qanday tekshirasiz:** "kichik" va "ulkan" mijoz ID'lari bilan `EXPLAIN ANALYZE EXECUTE` — ikkalasida ham reja va vaqt maqbul bo'lishi kerak.

**Intervyuda shunday ayting:** "Ma'lumot taqsimoti juda notekis bo'lsa, generic reja ba'zi parametrlar uchun yomon. Avval `EXPLAIN EXECUTE` bilan isbotlayman, keyin faqat muammoli so'rov yoki rol uchun `plan_cache_mode = force_custom_plan` qo'yaman — butun bazaga emas, chunki custom reja har safar rejalashtirish vaqtini oladi."

**Esda tuting:** ko'p ORM va drayverlar prepared statement'ni sizdan yashirin ishlatadi — muammo "ORM'da" emas, reja keshida bo'lishi mumkin. Manba: [PREPARE](https://www.postgresql.org/docs/current/sql-prepare.html).

## Q15. Katta jadvalga NOT NULL qo'shish migratsiyasi saytni bir necha daqiqa to'xtatib qo'ydi — nima qilasiz? / A migration adding NOT NULL to a big table froze the site for minutes — what do you do?

**Oddiy qilib aytganda:** `SET NOT NULL` jadvalni qulflaydi va **butun jadvalni** o'qib, NULL yo'qligini tekshiradi. 100 million qatorda bu daqiqalar — shu vaqt hech kim yoza olmaydi. Yechim: ishni ikki bosqichga bo'lish — avval qoidani **tekshirmasdan** qo'shish (bir zumda), keyin tekshirishni yozishlarni to'xtatmaydigan alohida qadamda qilish.

**Yechim:**

```sql
-- Migratsiya lock kutib qolib, navbat yig'masligi uchun
SET lock_timeout = '3s';

-- PostgreSQL 18+: NOT NULL'ni NOT VALID bilan qo'shish mumkin
ALTER TABLE orders ADD CONSTRAINT orders_customer_id_not_null NOT NULL customer_id NOT VALID;  -- bir zumda
ALTER TABLE orders VALIDATE CONSTRAINT orders_customer_id_not_null;                             -- yozishni to'xtatmaydi

-- PostgreSQL 17 va undan eski: CHECK orqali
ALTER TABLE orders ADD CONSTRAINT orders_customer_id_nn CHECK (customer_id IS NOT NULL) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT orders_customer_id_nn;
ALTER TABLE orders ALTER COLUMN customer_id SET NOT NULL;     -- to'g'ri CHECK bor → jadval skanerlanmaydi
ALTER TABLE orders DROP CONSTRAINT orders_customer_id_nn;
```

**Qanday tekshirasiz:** migratsiyani production hajmidagi nusxada sinab ko'ring, shu vaqtda yozish yuklamasini ishga tushiring — so'rovlar to'xtab qolmasligi kerak. `pg_locks` da uzoq `AccessExclusiveLock` bo'lmasin.

**Intervyuda shunday ayting:** "Katta jadvaldagi migratsiyalarni ikki bosqichli qilaman: constraint'ni `NOT VALID` bilan qo'shish va keyin `VALIDATE` — u yozishni to'sadigan qulf olmaydi. Har migratsiyada `lock_timeout` — aks holda ALTER qulfni kutib turganda uning orqasida barcha so'rovlar navbatga turib qoladi."

**Esda tuting:** `NOT VALID` faqat mavjud qatorlarni tekshirmaydi — **yangi** qatorlar darhol tekshiriladi. Avval eski NULL'larni to'ldiring. Manba: [ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html).

## Q16. Pul o'tkazmalarida vaqti-vaqti bilan "deadlock detected" xatosi chiqyapti — nima qilasiz? / Money transfers sometimes fail with "deadlock detected" — what do you do?

**Oddiy qilib aytganda:** A → B o'tkazmasi avval A'ni, keyin B'ni qulflaydi. Bir vaqtda B → A o'tkazmasi avval B'ni, keyin A'ni qulflaydi. Ikkalasi bir-birini kutib qoladi — **deadlock**. PostgreSQL buni sezib, bittasini bekor qiladi. Yechim: hamma joyda qatorlarni **bir xil tartibda** (masalan, ID o'sishi bo'yicha) qulflash.

**Yechim:**

```sql
BEGIN;
-- Ikkala akkauntni har doim ID tartibida qulflash
SELECT id, balance FROM accounts
WHERE id IN ($from, $to)
ORDER BY id
FOR UPDATE;

UPDATE accounts SET balance = balance - $amount WHERE id = $from;
UPDATE accounts SET balance = balance + $amount WHERE id = $to;
COMMIT;
```

```python
# Ilovada: deadlock (SQLSTATE 40P01) bo'lsa — butun tranzaksiyani qayta urinish
for attempt in range(3):
    try:
        transfer(from_id, to_id, amount)
        break
    except DeadlockDetected:
        time.sleep(0.05 * (2 ** attempt))
```

**Qanday tekshirasiz:** A↔B orasida ko'p parallel qarama-qarshi o'tkazmalar — deadlock xatolari yo'qolishi va umumiy balans o'zgarmasligi kerak.

**Intervyuda shunday ayting:** "Deadlock'ning asosiy davosi — qulflash tartibi hamma joyda bir xil. Shunda ham kamdan-kam holatlar bo'lishi mumkin, shuning uchun `40P01` va `40001` xatolarida butun tranzaksiyani qayta urinaman. Tranzaksiyalarni qisqa tutaman — qulf qancha kam ushlansa, to'qnashuv shuncha kam."

**Esda tuting:** `log_lock_waits = on` va server log'idagi deadlock tafsilotlari qaysi so'rovlar to'qnashganini ko'rsatadi. Manba: [Deadlocks](https://www.postgresql.org/docs/current/explicit-locking.html#LOCKING-DEADLOCKS).

## Q17. Har kecha backup olinadi, lekin undan tiklab ko'rish bir marta ham sinab ko'rilmagan — nima qilasiz? / Backups run every night but restoring has never been tested — what do you do?

**Oddiy qilib aytganda:** tiklab ko'rilmagan backup — backup emas, **umid**. Fayl buzilgan, noto'liq yoki kerakli rollarsiz bo'lishi mumkin — buni avariya kunida bilish juda kech. Yechim: tiklashni **muntazam va avtomatik** sinash.

**Yechim:**

```bash
# 1) Mantiqiy backup (kichik/o'rta baza)
pg_dump --format=custom --file=appdb.dump appdb

# 2) Alohida, izolyatsiyalangan serverda tiklash
createdb restore_test
pg_restore --dbname=restore_test --jobs=4 --exit-on-error appdb.dump

# 3) Natijani tekshirish
psql restore_test -c "SELECT count(*) FROM orders;"
psql restore_test -c "SELECT max(created_at) FROM orders;"   # qanchalik yangi?
```

**Qanday tekshirasiz:** har hafta avtomatik tiklash vazifasi: muvaffaqiyat/xato, tiklash **vaqti** (RTO) va eng oxirgi yozuv vaqti (RPO) monitoring'ga yuborilsin.

**Intervyuda shunday ayting:** "Ikki raqamni biznes bilan kelishaman: RPO — qancha ma'lumot yo'qotishga chidaymiz, RTO — qancha vaqt to'xtab turishga. Katta bazalar uchun `pg_dump` emas — fizik backup va WAL arxivi (PITR), masalan pgBackRest. Va eng muhimi — tiklashni muntazam sinayman."

**Esda tuting:** `pg_dump` rollar va global sozlamalarni saqlamaydi — ular uchun `pg_dumpall --globals-only`. Backup nusxasi boshqa joyda (boshqa region/akkaunt) ham bo'lsin. Manba: [SQL Dump](https://www.postgresql.org/docs/current/backup-dump.html), [Continuous Archiving and PITR](https://www.postgresql.org/docs/current/continuous-archiving.html).

## Q18. Ilova replicalari ko'paygach, "too many connections" xatosi chiqa boshladi — nima qilasiz? / After scaling app replicas, "too many connections" errors started — what do you do?

**Oddiy qilib aytganda:** har replica o'z ulanishlar hovuziga (pool) ega: 20 replica × 20 ulanish = 400, `max_connections` esa 100. PostgreSQL'da har ulanish — alohida **jarayon** va xotira, shuning uchun ularni cheksiz ko'paytirib bo'lmaydi. Yechim: ilova va baza orasiga **ulanishlar pool'eri** (PgBouncer) qo'yish.

**Yechim:**

```sql
-- 1) Hozir ulanishlar nima qilyapti?
SELECT state, count(*) FROM pg_stat_activity GROUP BY state;
--  idle                 | 310     ← ko'pchiligi bekor turibdi
--  active               | 12
--  idle in transaction  | 8
```

```ini
; 2) pgbouncer.ini — minglab klient ulanishini bir necha o'nta server ulanishiga
[pgbouncer]
pool_mode = transaction           ; ulanish faqat tranzaksiya davomida band
max_client_conn = 5000
default_pool_size = 40            ; bazaga haqiqiy ulanishlar
```

**Qanday tekshirasiz:** replicalarni 2 barobar ko'paytiring — bazadagi ulanishlar soni o'zgarmasligi, so'rov kechikishi (p99) esa me'yorda qolishi kerak.

**Intervyuda shunday ayting:** "Ulanishlarning ko'pi `idle` — ular xotira yeydi, ish qilmaydi. Transaction pooling bilan minglab klient bir necha o'nta server ulanishini bo'lishadi. Har replica pool'ini kichik qilaman. `max_connections` ni oshirish — yechim emas: har ulanish xotira oladi va juda ko'p faol ulanish unumdorlikni pasaytiradi."

**Esda tuting:** transaction pooling'da sessiya holati (`SET`, advisory lock'lar, `LISTEN`) tranzaksiyadan tashqariga chiqmaydi — shunga mos kod yozing. Manba: [Connection Settings](https://www.postgresql.org/docs/current/runtime-config-connection.html), [PgBouncer](https://www.pgbouncer.org/config.html).

## Q19. OFFSET bilan sahifalash oxirgi sahifalarda sekin va yangi qatorlar qo'shilganda elementlar takrorlanyapti — nima qilasiz? / OFFSET pagination is slow on late pages and items repeat when new rows are added — what do you do?

**Oddiy qilib aytganda:** `OFFSET 100000` — "100 ming qatorni sanab, tashlab yubor, keyingi 50 tasini ber". Sahifa qancha uzoq bo'lsa, shuncha ko'p ish. Bundan tashqari, sahifalar orasida yangi qator qo'shilsa, hamma narsa bittaga suriladi — foydalanuvchi bir elementni ikki marta ko'radi. Yechim: **keyset** pagination — "oxirgi ko'rganimdan keyingisini ber".

**Yechim:**

```sql
-- ❌ OFFSET
SELECT * FROM events ORDER BY created_at DESC, id DESC LIMIT 50 OFFSET 100000;

-- ✅ Keyset: oldingi sahifaning oxirgi (created_at, id) juftligidan boshlab
SELECT * FROM events
WHERE (created_at, id) < ($1, $2)
ORDER BY created_at DESC, id DESC
LIMIT 50;

CREATE INDEX CONCURRENTLY events_created_id_idx ON events (created_at DESC, id DESC);
```

**Qanday tekshirasiz:** 1-sahifa va 2000-sahifa uchun `EXPLAIN ANALYZE` — ikkalasi ham millisekundlarda. Sahifalash paytida yangi qator qo'shing — takrorlanish bo'lmasligi kerak.

**Intervyuda shunday ayting:** "Keyset pagination indeks bo'ylab to'g'ridan-to'g'ri kerakli joyga boradi — tezlik sahifa raqamiga bog'liq emas. Tartib noyob bo'lishi kerak, shuning uchun `created_at` ga `id` ni qo'shaman — aks holda bir xil vaqtli qatorlar yo'qolishi mumkin. Klientga ochiq qiymatlar o'rniga shifrlangan/kodlangan kursor beraman."

**Esda tuting:** keyset'da "57-sahifaga o'tish" yo'q — faqat "keyingi/oldingi". Ko'p interfeyslar uchun (cheksiz lenta) bu yetarli. Manba: [LIMIT and OFFSET](https://www.postgresql.org/docs/current/queries-limit.html), [Row Constructor Comparison](https://www.postgresql.org/docs/current/functions-comparisons.html#ROW-WISE-COMPARISON).

## Q20. Buyurtma jami summasi turli servislarda turlicha hisoblanyapti — nima qilasiz? / The order total is computed differently in different services — what do you do?

**Oddiy qilib aytganda:** "jami = soni × narx" formulasi uch joyda yozilgan: backend'da, hisobot servisida, admin panelda — va bittasida yaxlitlash boshqacha. Natijada raqamlar farq qiladi. Yechim: formulani **bir joyga** — bazaning o'ziga qo'yish. **Generated column** — boshqa ustunlardan avtomatik hisoblanadigan ustun; uni qo'lda o'zgartirib bo'lmaydi.

**Yechim:**

```sql
CREATE TABLE order_lines (
    id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    quantity    integer        NOT NULL CHECK (quantity > 0),
    unit_price  numeric(12, 2) NOT NULL CHECK (unit_price >= 0),
    total       numeric(14, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);

INSERT INTO order_lines (quantity, unit_price) VALUES (3, 19.99);
SELECT total FROM order_lines;        -- 59.97 — hamma servis bir xil qiymatni o'qiydi
-- UPDATE order_lines SET total = 1;  → xato: generated ustunni o'zgartirib bo'lmaydi
```

**Qanday tekshirasiz:** barcha servislar `total` ni o'zi hisoblamay, bazadan o'qishini kod ko'rigida tekshiring; `total` ni to'g'ridan-to'g'ri yozishga urinish xato berishi kerak.

**Intervyuda shunday ayting:** "Bir qatordagi qiymatlardan hisoblanadigan narsani generated column qilaman — formula bitta joyda va baza uni kafolatlaydi. PostgreSQL 18 da standart tur — `VIRTUAL` (o'qishda hisoblanadi, disk olmaydi); indeks kerak bo'lsa yoki tez-tez o'qilsa — `STORED`."

**Esda tuting:** generated ifoda faqat **o'sha qatordagi** ustunlardan foydalana oladi va `IMMUTABLE` funksiyalardan iborat bo'lishi kerak — boshqa jadvallar yoki `now()` mumkin emas. Buyurtmaning umumiy jami (ko'p qatorlar) uchun — view yoki alohida hisoblangan ustun. Manba: [Generated Columns](https://www.postgresql.org/docs/current/ddl-generated-columns.html).
