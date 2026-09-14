# PostgreSQL amaliy interview ssenariylari

Ushbu bank amaliy vaziyatlar uchun tuzilgan. Asosiy rasmiy manba: [postgresql hujjatlari](https://www.postgresql.org/docs/current/).

## Q1. Loyihada query productionda sekin, lekin index taxmin bilan qo'shilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin EXPLAIN ANALYZE BUFFERS bilan actual rows va I/Oni o'lchab keyin index tanlang. Masalan, `EXPLAIN (ANALYZE, BUFFERS) SELECT ...` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/using-explain.html).

## Q2. Loyihada email bo'yicha case-insensitive qidiruv sequential scan qilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin query ifodasiga mos expression index yarating. Masalan, `CREATE INDEX users_email_lower_idx ON users (lower(email));` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/indexes-expressional.html).

## Q3. Loyihada faqat active buyurtmalar so'raladi, lekin to'liq index juda katta. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin query predikatiga mos partial index qo'llang. Masalan, `CREATE INDEX orders_active_idx ON orders(created_at) WHERE status='active';` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/indexes-partial.html).

## Q4. Loyihada ikki worker bir buyurtmani bir vaqtda qayta ishlamoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin row lock va transaction ichida statusni atomik o'zgartiring. Masalan, `SELECT id FROM jobs WHERE status='ready' FOR UPDATE SKIP LOCKED;` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/explicit-locking.html).

## Q5. Loyihada balance tekshiruv va update orasida race condition manfiy qiymat berdi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin bitta conditional UPDATE yoki kerakli isolation darajasini ishlating. Masalan, `UPDATE account SET balance=balance-10 WHERE id=$1 AND balance>=10 RETURNING balance;` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/transaction-iso.html).

## Q6. Loyihada unique emailni avval SELECT qilib keyin INSERT qilish race bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin UNIQUE constraintga tayanib conflictni atomik boshqaring. Masalan, `INSERT INTO users(email) VALUES($1) ON CONFLICT(email) DO NOTHING;` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT).

## Q7. Loyihada tenant filter bitta endpointda unutilib boshqa mijoz qatori chiqdi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Row Level Securityni yoqib tenant policy yarating. Masalan, `ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).

## Q8. Loyihada JSONB ichidagi key qidiruvi katta jadvalda sekinlashdi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin operatorlarga mos GIN indexni tanlang va EXPLAIN bilan tekshiring. Masalan, `CREATE INDEX events_payload_gin ON events USING GIN(payload);` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING).

## Q9. Loyihada autovacuum yetishmay dead tuple va table bloat o'smoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin pg_stat_user_tablesni kuzatib jadvalga mos autovacuum threshold/scale factor belgilang. Masalan, `SELECT relname,n_dead_tup,last_autovacuum FROM pg_stat_user_tables;` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/routine-vacuuming.html).

## Q10. Loyihada planner yangi data taqsimotidan bexabar yomon plan tanlamoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin ANALYZE ishlating va zarur ustun uchun statistics targetni oshiring. Masalan, `ALTER TABLE orders ALTER COLUMN status SET STATISTICS 500; ANALYZE orders;` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/planner-stats.html).

## Q11. Loyihada millionlab eski qator o'chirish uzun lock va WAL bosimi berdi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin batch delete yoki vaqt bo'yicha partition detach/drop strategiyasini qo'llang. Masalan, `ALTER TABLE events DETACH PARTITION events_2024;` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/ddl-partitioning.html).

## Q12. Loyihada LIKE '%term%' qidiruvi btree indexdan foydalanmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin talabga qarab full-text search yoki pg_trgm extensionini tanlang. Masalan, `CREATE INDEX docs_fts_idx ON docs USING GIN(to_tsvector('simple', body));` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/textsearch-indexes.html).

## Q13. Loyihada uzoq transaction vacuumga to'sqinlik qilib diskni o'stirmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin pg_stat_activityda transaction yoshini topib request transactionlarini qisqartiring. Masalan, `SELECT pid, now()-xact_start AS age FROM pg_stat_activity WHERE xact_start IS NOT NULL;` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW).

## Q14. Loyihada prepared statement parametrga qarab yomon generic plan tanlamoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin custom va generic planlarni EXPLAIN EXECUTE bilan solishtiring. Masalan, `EXPLAIN (ANALYZE, BUFFERS) EXECUTE find_order(42);` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/sql-prepare.html).

## Q15. Loyihada schema migration NOT NULL qo'shganda katta jadvalni uzoq blokladi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin constraintni bosqichma-bosqich NOT VALID va VALIDATE bilan joriy qiling. Masalan, `ALTER TABLE t ADD CONSTRAINT value_nn CHECK(value IS NOT NULL) NOT VALID;` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/sql-altertable.html).

## Q16. Loyihada read-modify-write flow deadlockni vaqti-vaqti bilan bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin jadvallar/qatorlarni bir xil tartibda lock qiling va deadlock transactionini retry qiling. Masalan, `BEGIN; SELECT * FROM accounts WHERE id IN ($1,$2) ORDER BY id FOR UPDATE;` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/explicit-locking.html#LOCKING-DEADLOCKS).

## Q17. Loyihada backup fayli bor, lekin restore ishlashi hech qachon sinalmagan. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin pg_dump bilan logical backup olib izolyatsiyalangan bazaga muntazam restore testi qiling. Masalan, `pg_dump -Fc appdb > appdb.dump && pg_restore -d restore_test appdb.dump` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/backup-dump.html).

## Q18. Loyihada connectionlar ko'payib max_connections tugab qolmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin pool limitini workloadga moslang va pg_stat_activity bilan idle connectionlarni o'lchang. Masalan, `SELECT state,count(*) FROM pg_stat_activity GROUP BY state;` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/runtime-config-connection.html).

## Q19. Loyihada offset pagination oxirgi sahifalarda sekin va concurrent insertda qatorlarni o'tkazmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin stabil unique tartib bilan keyset pagination ishlating. Masalan, `SELECT * FROM events WHERE (created_at,id)<($1,$2) ORDER BY created_at DESC,id DESC LIMIT 50;` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/queries-limit.html).

## Q20. Loyihada computed total ustuni applicationlarda turlicha hisoblanmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin immutable row expression bo'lsa generated column bilan markazlashtiring. Masalan, `total numeric GENERATED ALWAYS AS (quantity * unit_price) STORED` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://www.postgresql.org/docs/current/ddl-generated-columns.html).

