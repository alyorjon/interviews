# 🧪 Odoo Interaktiv Quiz — Self-Test MCQ
### Ikki tilli qo'llanma / Bilingual Reference

> **Daraja / Level:** 🟢 Basic → 🟡 Intermediate → 🔴 Advanced
> **Format:** Har bir savolda 4 variant, faqat bittasi to'g'ri. Javoblarni oldindan ko'rmang — avval yeching! / Each question has 4 options, only one correct. Don't peek at the answer key — attempt first!
> **Javoblar:** Fayl oxirida / **Answers:** at the end of the file

---

## 🟢 Basic (1–10)

**1.** Odoo Framework Overview bo'yicha, Odoo texnologik steki nimalardan iborat? / According to the Framework Overview, what is Odoo's core technology stack?
A) PHP + MariaDB + Vue
B) Python 3 + PostgreSQL + OWL JS (Werkzeug WSGI orqali) / Python 3 + PostgreSQL + OWL JS (via Werkzeug WSGI)
C) Java + MySQL + Angular
D) Node.js + MongoDB + React

**2.** `models.TransientModel` bilan `models.AbstractModel` orasidagi asosiy farq nima? / Key difference between `models.TransientModel` and `models.AbstractModel`?
A) Ikkalasi ham doimiy jadval yaratadi / Both create permanent tables
B) AbstractModel doimiy jadval yaratadi, TransientModel yaratmaydi / AbstractModel creates a permanent table, TransientModel doesn't
C) TransientModel vaqtinchalik jadval yaratadi (wizardlar uchun), AbstractModel umuman jadval yaratmaydi (mixin) / TransientModel creates a temporary table (for wizards), AbstractModel creates no table at all (mixin)
D) Ikkalasi ham bir xil / They are identical

**3.** `Many2one` maydoni nimani bildiradi? / What does a `Many2one` field represent?
A) Joriy modeldan boshqa modeldagi bitta yozuvga ishora qiluvchi tashqi kalit / A foreign key pointing to a single record in another model
B) Ko'pdan-ko'pga bog'lanish / A many-to-many relation
C) Virtual teskari maydon / A virtual inverse field
D) Statik tanlov ro'yxati / A static selection list

**4.** `One2many` maydonini e'lon qilish uchun nima talab qilinadi? / What is required to declare a `One2many` field?
A) Faqat maqsadli model nomi / Only the target model name
B) Oraliq jadval nomi va ikkita ustun / A relation table name and two columns
C) Hech narsa, avtomatik aniqlanadi / Nothing, it's auto-detected
D) Maqsadli model nomi va o'sha modeldagi `Many2one` maydon nomi / The target model name and the name of the `Many2one` field on that target model

**5.** `ir.model.access.csv` fayli nimani belgilaydi? / What does the `ir.model.access.csv` file define?
A) Har bir yozuv qatorining ko'rinishini / Row-level visibility per record
B) Guruh bo'yicha model darajasidagi CRUD ruxsatlarini (read/write/create/unlink) / Group-based model-level CRUD permissions (read/write/create/unlink)
C) Foydalanuvchi parolini / User passwords
D) XML view merosxo'rligini / XML view inheritance

**6.** Quotation qachon Sale Order-ga aylanadi? / When does a Quotation become a Sale Order?
A) Yaratilishi bilanoq / As soon as it's created
B) Hech qachon, ular bir xil hujjat / Never, they are the same document
C) Xaridor uni tasdiqlagach (Confirm) / Once the customer confirms it
D) Faktura chiqqandan keyin / Only after the invoice is issued

**7.** RFQ (Request for Quotation) tasdiqlanganda nima sodir bo'ladi? / What happens when an RFQ is confirmed?
A) U avtomatik bekor qilinadi / It's automatically cancelled
B) U Purchase Order-ga aylanadi va Goods Receipt yaratiladi / It becomes a Purchase Order and generates a Goods Receipt
C) U to'g'ridan-to'g'ri Vendor Bill-ga aylanadi, Ombor hujjatisiz / It converts directly into a Vendor Bill with no inventory document
D) Faqat email yuboriladi / Only an email is sent

**8.** Dropshipping marshrutida mahsulot qanday harakatlanadi? / How does a product move under the Dropshipping route?
A) To'g'ridan-to'g'ri yetkazib beruvchidan xaridorga, kompaniya omboriga kirmasdan / Directly from the vendor to the customer, without entering the company warehouse
B) Avval kompaniya omboriga kirim qilinadi, keyin xaridorga chiqariladi / First received into the company warehouse, then delivered to the customer
C) Faqat ichki joylashuvlar orasida ko'chadi / Only moves between internal locations
D) Har doim Internal Transfer sifatida qayd etiladi / Always recorded as an Internal Transfer

**9.** Reordering Rules qanday ishlaydi? / How do Reordering Rules work?
A) Zaxira Maksimal miqdordan oshsa, avtomatik sotuv yaratadi / Auto-creates a sale when stock exceeds the Maximum quantity
B) Faqat qo'lda ishga tushiriladi / Only triggered manually
C) Faqat Manufacturing modulida ishlaydi / Only works within the Manufacturing module
D) Virtual zaxira Minimal miqdordan pastga tushganda, Maksimal miqdorgacha avtomatik RFQ yaratadi / When virtual stock drops below the Minimum quantity, it auto-generates a Purchase RFQ up to the Maximum quantity

**10.** Customer Invoice va Vendor Bill orasidagi farq nima? / What's the difference between a Customer Invoice and a Vendor Bill?
A) Ikkalasi ham bir xil hujjat turi / They are the same document type
B) Vendor Bill faqat naqd pul uchun / Vendor Bill is only for cash payments
C) Customer Invoice — Debitorlik (Receivable) hujjati, Vendor Bill — Kreditorlik (Payable) hujjati / Customer Invoice is a Receivable document, Vendor Bill is a Payable document
D) Customer Invoice hech qachon buxgalteriyaga yozilmaydi / Customer Invoice is never posted to accounting

---

## 🟡 Intermediate (11–20)

**11.** `@api.depends` va `@api.onchange` orasidagi asosiy farq nima? / Main difference between `@api.depends` and `@api.onchange`?
A) Ular bir xil ishlaydi / They work identically
B) `@api.depends` backend/bazada compute qiymatlarni qayta hisoblaydi, `@api.onchange` esa saqlashdan oldin faqat brauzer UI-da ishlaydi / `@api.depends` recomputes stored values on backend/DB, `@api.onchange` runs only in the browser UI before saving
C) `@api.onchange` faqat `create()` da ishlaydi / `@api.onchange` only runs during `create()`
D) `@api.depends` faqat Selection maydonlar uchun ishlaydi / `@api.depends` only works on Selection fields

**12.** `@api.constrains` tekshiruvi muvaffaqiyatsiz bo'lsa nima sodir bo'ladi? / What happens when an `@api.constrains` check fails?
A) `odoo.exceptions.ValidationError` istisnosi ko'tariladi / An `odoo.exceptions.ValidationError` is raised
B) Xato jim o'tkazib yuboriladi / The error is silently ignored
C) Yozuv avtomatik o'chiriladi / The record is automatically deleted
D) Faqat konsolga log yoziladi / Only a console log is written

**13.** `_inherits = {'res.users': 'user_id'}` nimani anglatadi? / What does `_inherits = {'res.users': 'user_id'}` mean?
A) Modelni o'z joyida (in-place) o'zgartiradi / It modifies the model in-place
B) Yangi jadval yaratmaydi (abstract) / It creates no table (abstract)
C) Faqat XML view-larni kengaytiradi / It only extends XML views
D) Delegatsiyali merosxo'rlik — ota model maydonlarini `Many2one` orqali shaffof tarzda bola modelga joylashtiradi / Delegation inheritance — transparently exposes the parent model's fields on the child model via a `Many2one`

**14.** XML View Inheritance-da `<xpath expr="..." position="after">` nima qiladi? / In XML View Inheritance, what does `<xpath expr="..." position="after">` do?
A) Belgilangan elementni butunlay o'chiradi / Removes the target element entirely
B) Yangi elementni belgilangan elementdan keyin joylashtiradi / Inserts the new element right after the targeted element
C) Faqat atributlarni o'zgartiradi / Only modifies attributes
D) Butun view-ni almashtiradi / Replaces the entire view

**15.** `ir.rule` va `ir.model.access.csv` qanday farqlanadi? / How do `ir.rule` and `ir.model.access.csv` differ?
A) Ikkalasi ham bir xil ruxsatlarni beradi / Both grant identical permissions
B) `ir.rule` faqat Manager guruhi uchun ishlaydi / `ir.rule` only applies to the Manager group
C) `ir.model.access.csv` model darajasidagi umumiy CRUD ruxsatini beradi, `ir.rule` esa domen orqali alohida qatorlarni dinamik filtrlaydi / `ir.model.access.csv` grants global model-level CRUD access, while `ir.rule` dynamically filters individual rows via a domain
D) `ir.model.access.csv` faqat o'qish huquqini beradi / `ir.model.access.csv` only grants read access

**16.** `sudo()` chaqirilganda nima sodir bo'ladi? / What happens when `sudo()` is called on a recordset?
A) Recordset muhiti Superuser darajasiga ko'tariladi va xavfsizlik qoidalarini chetlab o'tadi / The recordset's environment is elevated to Superuser, bypassing access rules
B) Yozuv arxivlanadi / The record is archived
C) Foydalanuvchi tizimdan chiqariladi / The user is logged out
D) Faqat o'qish ruxsatini beradi / It only grants read access

**17.** Domain `['|', ('state','=','draft'), ('state','=','sent')]` nimani anglatadi? / What does the domain `['|', ('state','=','draft'), ('state','=','sent')]` mean?
A) `state` draft VA sent bo'lishi kerak / `state` must be both draft AND sent
B) Bu noto'g'ri sintaksis / This is invalid syntax
C) `state` na draft, na sent bo'lmasligi kerak / `state` must be neither draft nor sent
D) `state` draft YOKI sent bo'lishi kerak (prefiks OR notatsiyasi) / `state` must be draft OR sent (prefix OR notation)

**18.** `filtered(lambda p: p.age >= 18)` nima qiladi? / What does `filtered(lambda p: p.age >= 18)` do?
A) Bazaga yangi so'rov yuboradi / Sends a new query to the database
B) Xotiradagi recordset-ni lambda sharti bo'yicha saralaydi (filtrlaydi) / Filters the in-memory recordset using the lambda condition
C) Barcha yozuvlarni o'chiradi / Deletes all records
D) Faqat bitta maydon qiymatini qaytaradi / Returns only a single field's value

**19.** Odoo Studio nima uchun ishlatiladi? / What is Odoo Studio used for?
A) Faqat PostgreSQL sozlamalarini o'zgartirish uchun / Only for changing PostgreSQL settings
B) Serverni qayta ishga tushirish uchun / For restarting the server
C) Kod yozmasdan (no-code) yangi maydon, view va avtomatlashtirilgan amallarni brauzer orqali yaratish uchun / Creating new fields, views, and automated actions via the browser without writing code
D) Faqat tarjima fayllarini eksport qilish uchun / Only for exporting translation files

**20.** Multi-Company rejimi yoqilganda nima sodir bo'ladi? / What happens when Multi-Company mode is enabled?
A) Har bir hujjat `company_id`ga biriktiriladi va foydalanuvchi faqat tanlangan kompaniya ma'lumotlarini ko'radi / Each record is tied to a `company_id`, and users only see data of their currently selected company
B) Barcha foydalanuvchilar barcha kompaniyalar ma'lumotlarini ko'radi / All users see all companies' data
C) Faqat bitta kompaniya ro'yxatdan o'tkazilishi mumkin / Only one company can ever be registered
D) `ir.rule` butunlay o'chiriladi / `ir.rule` is disabled entirely

---

## 🔴 Advanced (21–30)

**21.** `search_read()` metodi nimani birlashtiradi? / What does the `search_read()` method combine?
A) `create()` va `write()` / `create()` and `write()`
B) `unlink()` va `browse()` / `unlink()` and `browse()`
C) `sudo()` va `with_context()` / `sudo()` and `with_context()`
D) `search()` va `read()` — belgilangan maydonlarni to'g'ridan-to'g'ri lug'atlar ro'yxati sifatida qaytaradi / `search()` and `read()` — returns specified fields directly as a list of dictionaries

**22.** `@api.model_create_multi` dekoratori nima uchun eng yaxshi amaliyot hisoblanadi? / Why is `@api.model_create_multi` considered best practice?
A) U `create()`ni o'qish huquqisiz ishlashga majburlaydi / It forces `create()` to run without read access
B) `create()`ga qiymatlar lug'atlari ro'yxatini (`vals_list`) qabul qilib, bitta SQL bilan ommaviy kiritish imkonini beradi / It lets `create()` accept a list of value dicts (`vals_list`) for a single batch SQL insert
C) U faqat TransientModel-larda ishlaydi / It only works on TransientModels
D) U compute maydonlarni saqlanishini bekor qiladi / It disables storage of compute fields

**23.** `(6, 0, [101, 102])` One2many/Many2many buyrug'i nimani bildiradi? / What does the One2many/Many2many command `(6, 0, [101, 102])` mean?
A) Yangi bola yozuv yaratish / Create a new child record
B) ID 101 va 102 ni o'chirish / Delete records with ID 101 and 102
C) Mavjud bog'lanishlarni belgilangan ID-lar ro'yxati bilan to'liq almashtirish / Replace all existing links with exactly the given list of IDs
D) Faqat 101-yozuvni yangilash / Update only record 101

**24.** `_sql_constraints = [('code_unique', 'UNIQUE(code)', 'msg')]` qayerda amalga oshiriladi? / Where is `_sql_constraints = [('code_unique', 'UNIQUE(code)', 'msg')]` enforced?
A) Ma'lumotlar bazasi darajasida (PostgreSQL UNIQUE/CHECK cheklovi sifatida) / At the database level (as a PostgreSQL UNIQUE/CHECK constraint)
B) Faqat brauzer UI-da (`@api.onchange` orqali) / Only in the browser UI (via `@api.onchange`)
C) Faqat Odoo Studio-da / Only within Odoo Studio
D) Faqat XML security fayllarida / Only in XML security files

**25.** `@tools.ormcache('company_id')` dekoratori nima qiladi? / What does the `@tools.ormcache('company_id')` decorator do?
A) `company_id` maydonini majburiy qiladi / Makes the `company_id` field required
B) Bazaga indeks qo'shadi / Adds a database index
C) Cron jobni har kuni ishga tushiradi / Schedules a cron job daily
D) Metod natijasini ko'rsatilgan argument bo'yicha RAM xotirada keshlaydi, qayta hisoblashning oldini oladi / Caches the method's result in RAM keyed by the given argument, avoiding recomputation

**26.** `_auto = False` bilan `init()` metodini qayta aniqlash odatda nima uchun ishlatiladi? / What is overriding `init()` together with `_auto = False` typically used for?
A) Modelni TransientModel-ga aylantirish uchun / To turn the model into a TransientModel
B) `CREATE OR REPLACE VIEW` SQL orqali murakkab JOIN-ga asoslangan faqat-o'qish uchun SQL view modelini yaratish / To build a read-only SQL-view-backed model via `CREATE OR REPLACE VIEW` on a complex JOIN
C) Modelning barcha maydonlarini majburiy qilish uchun / To make all fields on the model required
D) `ir.cron` yozuvini o'chirish uchun / To delete an `ir.cron` record

**27.** `queue_job` modulidagi `@job` dekoratori nima uchun ishlatiladi? / What is the `@job` decorator from the `queue_job` module used for?
A) Formada tugma yaratish uchun / To create a button on a form
B) SQL so'rovlarini optimallashtirish uchun / To optimize SQL queries
C) Og'ir vazifalarni fon workerida asinxron bajarish uchun / To delegate heavy tasks to run asynchronously in a background worker
D) XML view-ni tarjima qilish uchun / To translate an XML view

**28.** `odoo.tests.common.TransactionCase`dan meros olingan test klassi qanday xususiyatga ega? / What behavior does a test class inheriting `odoo.tests.common.TransactionCase` have?
A) Har bir test tugagandan so'ng ma'lumotlar bazasi o'zgarishlari avtomatik orqaga qaytariladi (rollback) / Database changes made during each test are automatically rolled back afterward
B) Har bir test ma'lumotlar bazasiga doimiy yozadi / Each test writes permanently to the database
C) Faqat JavaScript kodini test qiladi / It only tests JavaScript code
D) Serverni qayta ishga tushirishni talab qiladi / It requires restarting the server

**29.** `self.env['bus.bus']._sendone(partner, 'type', payload)` nima uchun ishlatiladi? / What is `self.env['bus.bus']._sendone(partner, 'type', payload)` used for?
A) Email yuborish uchun / For sending an email
B) Cron jobni ishga tushirish uchun / To trigger a cron job
C) Yozuvni arxivlash uchun / To archive a record
D) Belgilangan foydalanuvchiga real-vaqt WebSocket bildirishnomasini yuborish uchun / To push a real-time WebSocket notification to the given user

**30.** PgBouncer-ni `pool_mode = transaction` bilan sozlash nima uchun ishlatiladi? / Why configure PgBouncer with `pool_mode = transaction`?
A) Har bir foydalanuvchi uchun alohida doimiy DB ulanish ochish uchun / To open a dedicated permanent DB connection per user
B) Minglab bir vaqtdagi web threadlar orasida ochiq DB ulanishlarni qayta ishlatish orqali masshtablashni ta'minlash uchun / To scale by reusing open DB connections across thousands of concurrent web threads
C) PostgreSQL-ni butunlay almashtirish uchun / To fully replace PostgreSQL
D) Faqat backup olish uchun / Only for taking backups

---

## ✅ Javoblar / Answer Key

| # | Javob | # | Javob | # | Javob |
|---|---|---|---|---|---|
| 1 | B | 11 | B | 21 | D |
| 2 | C | 12 | A | 22 | B |
| 3 | A | 13 | D | 23 | C |
| 4 | D | 14 | B | 24 | A |
| 5 | B | 15 | C | 25 | D |
| 6 | C | 16 | A | 26 | B |
| 7 | B | 17 | D | 27 | C |
| 8 | A | 18 | B | 28 | A |
| 9 | D | 19 | C | 29 | D |
| 10 | C | 20 | A | 30 | B |

**Natijangizni baholang / Score yourself:**
- 27–30 to'g'ri: Ekspert daraja 🏆 / Expert level
- 21–26 to'g'ri: Ilg'or daraja 🔴 / Advanced level
- 14–20 to'g'ri: O'rta daraja 🟡 / Intermediate level
- <14 to'g'ri: `odoo/basics.md`, `odoo/functional_admin.md` va `odoo/developer.md` ni qayta ko'rib chiqing 🟢 / Review `odoo/basics.md`, `odoo/functional_admin.md`, and `odoo/developer.md`

---

*Tayyorlagan / Prepared by: Alyorjon | interactive_quiz_tester agenti asosida*
