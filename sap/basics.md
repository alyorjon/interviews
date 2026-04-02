# 🏢 SAP Business One (SAP B1) — 100 Interview Questions
### Ikki tilli qo'llanma / Bilingual Reference

> **Daraja / Level:** Boshlang'ich → O'rta → Ilg'or → Ekspert  
> **Tillar / Languages:** O'zbek 🇺🇿 | English 🇬🇧  
> **Maqsad / Goal:** SAP B1 intervyusiga to'liq tayyorgarlik

---

## 📚 Mundarija / Table of Contents

1. [Asosiy tushunchalar / Basics (1–30)](#1-asosiy-tushunchalar--basics)
2. [O'rta daraja / Intermediate (31–55)](#2-orta-daraja--intermediate)
3. [Ilg'or daraja / Advanced (56–80)](#3-ilgor-daraja--advanced)
4. [Ekspert daraja / Expert (81–100)](#4-ekspert-daraja--expert)

---

## 1. Asosiy tushunchalar / Basics

### 🔵 SAP B1 nima? / What is SAP B1?

**1. SAP Business One nima va kimlar uchun mo'ljallangan?**
> **EN:** SAP Business One is an ERP solution designed for small and medium-sized enterprises (SMEs). It helps manage financials, sales, CRM, inventory, manufacturing, and purchasing in a single unified platform.  
> **UZ:** SAP Business One — kichik va o'rta korxonalar (SME) uchun mo'ljallangan ERP yechimi. Moliya, savdo, CRM, inventar, ishlab chiqarish va xaridlarni bitta platformada boshqaradi.

---

**2. SAP B1 ning asosiy modullari qanday?**
> **EN:** Key modules include: Financial Management, Sales & CRM, Purchasing & Procurement, Inventory & Distribution, Production & MRP, Project Management, Service Management, HR, and Reporting & Analytics.  
> **UZ:** Asosiy modullar: Moliyaviy boshqaruv, Savdo va CRM, Xarid va ta'minot, Inventar va taqsimlash, Ishlab chiqarish va MRP, Loyiha boshqaruvi, Xizmat boshqaruvi, HR, Hisobot va tahlil.

---

**3. SAP B1 da "Business Partner" nima va turlari qanday?**
> **EN:** A Business Partner is any entity the company does business with. Types: **Customer** (sotib oluvchi), **Vendor** (yetkazib beruvchi), **Lead** (potensial mijoz).  
> **UZ:** Business Partner — kompaniya ish olib boradigan har qanday tashkilot yoki shaxs. Turlari: **Mijoz (Customer)**, **Yetkazib beruvchi (Vendor)**, **Potensial mijoz (Lead)**.

---

**4. SAP B1 qanday arxitekturada ishlaydi?**
> **EN:** SAP B1 operates on a **two-layer architecture**: the database layer (MS SQL Server or SAP HANA) stores all data, and the client layer (fat client) handles business logic and the graphical user interface.  
> **UZ:** SAP B1 **ikki qatlamli arxitekturada** ishlaydi: ma'lumotlar bazasi qatlami (MS SQL Server yoki SAP HANA) barcha ma'lumotlarni saqlaydi, mijoz qatlami (fat client) biznes mantig'i va grafik interfeysni boshqaradi.

---

**5. SAP B1 ni qanday usullar bilan joylashtiriladi (deployment)?**
> **EN:** SAP B1 can be deployed **On-Premise** (client's own servers) or in the **Cloud** (via Amazon AWS or Microsoft Azure). On-premise gives full control; cloud reduces IT costs and infrastructure needs.  
> **UZ:** SAP B1 ni **On-Premise** (mijozning o'z serverlari) yoki **Cloud** (Amazon AWS yoki Microsoft Azure) orqali joylashtirish mumkin. On-premise to'liq nazorat beradi; cloud IT xarajatlarini kamaytiradi.

---

**6. SAP B1 va SAP ERP (S/4HANA) o'rtasidagi farq nima?**
> **EN:** SAP B1 is for SMEs (up to ~250 employees), simpler to implement and lower cost. SAP S/4HANA is for large enterprises with complex needs, much higher cost and complexity.  
> **UZ:** SAP B1 kichik/o'rta biznes uchun (~250 xodiygacha), sodda va arzonroq. SAP S/4HANA yirik korxonalar uchun, murakkab va qimmat.

---

**7. SAP HANA nima va SAP B1 bilan qanday bog'liq?**
> **EN:** SAP HANA is an in-memory database platform. SAP B1 can run on HANA for faster analytics, real-time reporting, and big data capabilities — significantly faster than MS SQL Server.  
> **UZ:** SAP HANA — xotirada ishlovchi (in-memory) ma'lumotlar bazasi platformasi. SAP B1 HANA ustida ishlasa, tahlillar tezroq, real-time hisobotlar va katta ma'lumotlar imkoniyatlari bo'ladi.

---

**8. Master Data nima va nima uchun muhim?**
> **EN:** Master Data is the core reference data used across all modules — Business Partners, Items, Chart of Accounts, Warehouses, Employees. Accurate master data is critical for all transactions.  
> **UZ:** Master Data — barcha modullar bo'ylab ishlatiladigan asosiy ma'lumotnoma: Business Partners, Tovarlar, Hisoblar rejasi, Omborlar, Xodimlar. To'g'ri master data barcha tranzaksiyalar uchun muhim.

---

**9. SAP B1 da "Item Master Data" nima?**
> **EN:** Item Master Data stores all information about products/services: item code, description, price, unit of measure, inventory settings, purchasing and sales data, and accounting information.  
> **UZ:** Item Master Data mahsulot/xizmat haqida barcha ma'lumotlarni saqlaydi: kod, tavsif, narx, o'lchov birligi, inventar sozlamalari, xarid/savdo ma'lumotlari va buxgalteriya.

---

**10. SAP B1 da sotish jarayoni (Sales Cycle) qanday?**
> **EN:** Sales Cycle: **Sales Quotation** → **Sales Order** → **Delivery** → **A/R Invoice** → **Payment**. Each step can be copied from the previous document, maintaining full traceability.  
> **UZ:** Savdo jarayoni: **Savdo taklifi** → **Savdo buyurtmasi** → **Yetkazib berish** → **Debitor hisob-faktura** → **To'lov**. Har bir bosqich oldingi hujjatdan ko'chiriladi, to'liq kuzatuvchanlik ta'minlanadi.

---

### 🔵 Moliya / Finance

**11. General Ledger (GL) nima?**
> **EN:** The General Ledger is the central repository of all financial transactions in SAP B1. It records all debits and credits and forms the basis for financial statements (Balance Sheet, P&L).  
> **UZ:** Bosh daftar — SAP B1 dagi barcha moliyaviy tranzaksiyalarning markaziy ombori. Barcha debet/kredit yozuvlarini saqlaydi va moliyaviy hisobotlar (Balans, Daromad-zararlar) asosini tashkil qiladi.

---

**12. Chart of Accounts (Hisoblar rejasi) nima?**
> **EN:** Chart of Accounts is a structured list of all GL accounts used by a company. In SAP B1 it supports multiple currencies and can be configured for local accounting regulations.  
> **UZ:** Hisoblar rejasi — kompaniya foydalanadigan barcha GL hisoblarining tuzilgan ro'yxati. SAP B1 da bir nechta valyutani qo'llab-quvvatlaydi va mahalliy buxgalteriya qoidalariga moslashtiriladi.

---

**13. Accounts Receivable (AR) va Accounts Payable (AP) farqi?**
> **EN:** **AR (Debitor)** — money customers owe the company (Sales invoices). **AP (Kreditor)** — money the company owes vendors (Purchase invoices).  
> **UZ:** **AR (Debitor)** — mijozlar kompaniyaga qarzdor bo'lgan pul (Savdo hisob-fakturalari). **AP (Kreditor)** — kompaniya yetkazib beruvchilarga qarzdor bo'lgan pul (Xarid hisob-fakturalari).

---

**14. Journal Entry nima?**
> **EN:** A Journal Entry is a manual accounting record that directly posts debits and credits to GL accounts. Used for adjustments, corrections, or entries that don't have a dedicated document.  
> **UZ:** Journal Entry — GL hisoblarga to'g'ridan-to'g'ri debet/kredit yozadigan qo'lda buxgalteriya yozuvi. Tuzatishlar, korreksiyalar yoki maxsus hujjati bo'lmagan yozuvlar uchun ishlatiladi.

---

**15. SAP B1 da ko'p valyuta qanday boshqariladi?**
> **EN:** SAP B1 supports multi-currency transactions. Each document can be in a foreign currency; the system automatically converts to the local currency using exchange rates defined in the system.  
> **UZ:** SAP B1 ko'p valyutali tranzaksiyalarni qo'llab-quvvatlaydi. Har bir hujjat chet el valyutasida bo'lishi mumkin; tizim avtomatik ravishda tizimda belgilangan kurs bo'yicha mahalliy valyutaga o'tkazadi.

---

### 🔵 Inventar & Xarid / Inventory & Purchasing

**16. Xarid jarayoni (Purchase Cycle) qanday?**
> **EN:** Purchase Cycle: **Purchase Request** → **Purchase Quotation** → **Purchase Order** → **Goods Receipt PO** → **A/P Invoice** → **Payment**.  
> **UZ:** Xarid jarayoni: **Xarid so'rovi** → **Xarid taklifi** → **Xarid buyurtmasi** → **Tovar qabuli (GRPO)** → **Kreditor hisob-faktura** → **To'lov**.

---

**17. Goods Receipt PO (GRPO) nima?**
> **EN:** Goods Receipt PO is the document that records the physical receipt of goods from a vendor against a Purchase Order. It updates inventory levels and creates accounting entries.  
> **UZ:** GRPO — Xarid buyurtmasiga muvofiq yetkazib beruvchidan tovarlarning jismoniy qabul qilinishini qayd etuvchi hujjat. Inventar darajasini yangilaydi va buxgalteriya yozuvlarini yaratadi.

---

**18. Inventory Valuation usullari qanday?**
> **EN:** SAP B1 supports: **Moving Average (MA)**, **FIFO** (First In, First Out), **Standard Price**. The valuation method is set per item in Item Master Data and affects COGS calculations.  
> **UZ:** SAP B1 quyidagilarni qo'llab-quvvatlaydi: **Ko'chma o'rtacha (MA)**, **FIFO** (birinchi kelgan — birinchi ketgan), **Standart narx**. Baholash usuli Item Master Data da har bir tovar uchun belgilanadi.

---

**19. Warehouse (Ombor) boshqaruvi qanday ishlaydi?**
> **EN:** SAP B1 supports multiple warehouses. Inventory can be transferred between warehouses using Inventory Transfer documents. Each warehouse can have separate stock levels and valuation.  
> **UZ:** SAP B1 bir nechta omborni qo'llab-quvvatlaydi. Tovarlar Inventar ko'chirish hujjatlari yordamida omborlar o'rtasida ko'chirilishi mumkin. Har bir ombor alohida zaxira darajasi va baholashga ega.

---

**20. Price List (Narx ro'yxati) nima?**
> **EN:** Price Lists in SAP B1 define selling prices for items. Multiple price lists can be created and assigned to specific customers, groups, or territories. They support discounts and special pricing.  
> **UZ:** Narx ro'yxatlari SAP B1 da tovarlar uchun sotuv narxlarini belgilaydi. Bir nechta narx ro'yxatlari yaratilishi va muayyan mijozlar, guruhlar yoki hududlarga tayinlanishi mumkin.

---

**21. Landed Costs nima?**
> **EN:** Landed Costs are additional import-related expenses (freight, customs, insurance) allocated to purchased goods, affecting their inventory valuation cost.  
> **UZ:** Landed Costs — import bilan bog'liq qo'shimcha xarajatlar (yuk tashish, bojxona, sug'urta) bo'lib, sotib olingan tovarlarga taqsimlanadi va ularning inventar baholash xarajatiga ta'sir qiladi.

---

**22. Blanket Agreement nima?**
> **EN:** A Blanket Agreement is a long-term supply contract with a customer or vendor defining items, quantities, and prices over a period. It automatically applies agreed terms to future orders.  
> **UZ:** Blanket Agreement — mijoz yoki yetkazib beruvchi bilan ma'lum davr uchun tovarlar, miqdorlar va narxlarni belgilaydigan uzoq muddatli ta'minot shartnomasi. Kelajakdagi buyurtmalarga avtomatik kelishilgan shartlarni qo'llaydi.

---

**23. Dunning Wizard nima?**
> **EN:** Dunning Wizard automates the process of sending reminder letters to customers with overdue invoices. It can be configured with multiple dunning levels and escalation rules.  
> **UZ:** Dunning Wizard — muddati o'tgan hisob-fakturaları bo'lgan mijozlarga eslatma xatlar yuborishni avtomatlashtiradi. Bir nechta dunning darajalari va eskalatsiya qoidalari bilan sozlanishi mumkin.

---

**24. Approval Procedure (Tasdiqlash tartibi) nima?**
> **EN:** Approval Procedures ensure certain transactions (purchase orders, sales orders above a threshold) go through a review and approval workflow before being finalized.  
> **UZ:** Tasdiqlash tartibi — ma'lum tranzaksiyalar (xarid buyurtmalari, belgilangan chegaradan yuqori savdo buyurtmalari) yakunlanishdan oldin ko'rib chiqish va tasdiqlash jarayonidan o'tishini ta'minlaydi.

---

**25. Alert Management nima?**
> **EN:** Alert Management in SAP B1 automatically notifies users of specific events or conditions (e.g., low stock, overdue invoices, large transactions) via internal messages or email.  
> **UZ:** SAP B1 dagi Ogohlantirish boshqaruvi foydalanuvchilarga muayyan hodisalar yoki shartlar haqida (masalan, kam zaxira, muddati o'tgan hisob-fakturalar, katta tranzaksiyalar) ichki xabarlar yoki email orqali avtomatik xabar beradi.

---

**26. SAP B1 da Tax (Soliq) qanday boshqariladi?**
> **EN:** SAP B1 handles tax through Tax Codes configured per country/region. Tax codes are assigned to Business Partners and Items. The system auto-calculates tax on all relevant transactions.  
> **UZ:** SAP B1 da soliq, mamlakat/mintaqaga qarab sozlangan Soliq kodlari orqali boshqariladi. Soliq kodlari Business Partners va Tovarlarga tayinlanadi. Tizim barcha tegishli tranzaksiyalarda soliqni avtomatik hisoblaydi.

---

**27. SAP B1 da Fixed Assets (Asosiy vositalar) qanday boshqariladi?**
> **EN:** Fixed Assets module manages company assets: acquisition, depreciation, retirement, and transfer. It integrates with the GL for automatic depreciation postings.  
> **UZ:** Asosiy vositalar moduli kompaniya aktivlarini boshqaradi: sotib olish, amortizatsiya, chiqarib tashlash va ko'chirish. Avtomatik amortizatsiya yozuvlari uchun GL bilan integratsiyalashgan.

---

**28. SAP B1 da Service Module nima?**
> **EN:** The Service Module manages after-sales service: service contracts, service calls (customer complaints/requests), equipment tracking, and technician scheduling.  
> **UZ:** Xizmat moduli sotuvdan keyingi xizmatni boshqaradi: xizmat shartnomalari, xizmat qo'ng'iroqlari (mijoz shikoyatlari/so'rovlari), uskunalarni kuzatish va texnik xodimlarni rejalashtirish.

---

**29. User Roles va Permissions qanday ishlaydi?**
> **EN:** SAP B1 has predefined user types: **Superuser** (full access), **Professional User** (full module access), **Limited User** (read-only or limited functions). Permissions can be configured per module, form, and action.  
> **UZ:** SAP B1 da oldindan belgilangan foydalanuvchi turlari: **Superuser** (to'liq kirish), **Professional User** (to'liq modul kirishi), **Limited User** (faqat o'qish yoki cheklangan funksiyalar). Ruxsatlar modul, forma va amal bo'yicha sozlanishi mumkin.

---

**30. Crystal Reports SAP B1 bilan qanday bog'liq?**
> **EN:** Crystal Reports is integrated into SAP B1 as the standard reporting tool. It allows creating custom reports with complex layouts, formulas, and drill-down capabilities based on SAP B1 data.  
> **UZ:** Crystal Reports SAP B1 ga standart hisobot vositasi sifatida integratsiyalashgan. SAP B1 ma'lumotlari asosida murakkab formatlar, formulalar va drill-down imkoniyatlari bilan maxsus hisobotlar yaratishga imkon beradi.

---

## 2. O'rta daraja / Intermediate

**31. UDF (User-Defined Field) va UDT (User-Defined Table) farqi?**
> **EN:** **UDF** adds custom fields to existing SAP B1 forms/tables (e.g., adding a "Region" field to the sales order). **UDT** creates entirely new custom tables for storing data that doesn't fit existing structures.  
> **UZ:** **UDF** mavjud SAP B1 forma/jadvallariga maxsus maydonlar qo'shadi (masalan, savdo buyurtmasiga "Hudud" maydoni). **UDT** mavjud tuzilmalarga to'g'ri kelmaydigan ma'lumotlarni saqlash uchun butunlay yangi maxsus jadvallar yaratadi.

---

**32. Formatted Search (FMS) nima?**
> **EN:** Formatted Search is a SAP B1 feature that links SQL queries to form fields, automatically populating values based on predefined logic. It eliminates manual data entry and reduces errors.  
> **UZ:** Formatted Search — SAP B1 xususiyati bo'lib, SQL so'rovlarini forma maydonlariga bog'laydi va oldindan belgilangan mantiq asosida qiymatlarni avtomatik to'ldiradi. Qo'lda ma'lumot kiritishni yo'q qiladi.

---

**33. DTW (Data Transfer Workbench) nima?**
> **EN:** DTW is SAP B1's built-in data migration tool. It allows importing large volumes of master data and transactions from Excel/CSV files into SAP B1 using predefined templates.  
> **UZ:** DTW — SAP B1 ning o'rnatilgan ma'lumotlarni migratsiya qilish vositasi. Oldindan belgilangan shablonlar yordamida Excel/CSV fayllardan SAP B1 ga ko'p miqdorda master data va tranzaksiyalarni import qilishga imkon beradi.

---

**34. MRP (Material Requirements Planning) qanday ishlaydi?**
> **EN:** MRP in SAP B1 analyzes inventory levels, open orders, and demand forecasts to automatically generate purchase/production recommendations to ensure material availability.  
> **UZ:** SAP B1 dagi MRP inventar darajalarini, ochiq buyurtmalarni va talab prognozlarini tahlil qilib, materiallar mavjudligini ta'minlash uchun avtomatik xarid/ishlab chiqarish tavsiyalarini yaratadi.

---

**35. Bill of Materials (BOM) nima?**
> **EN:** BOM defines the components and quantities needed to produce a finished product. In SAP B1, BOM is used in production orders and MRP to calculate raw material requirements.  
> **UZ:** BOM — tayyor mahsulot ishlab chiqarish uchun zarur komponentlar va miqdorlarni belgilaydi. SAP B1 da BOM ishlab chiqarish buyurtmalari va MRP da xom ashyo talablarini hisoblash uchun ishlatiladi.

---

**36. Production Order nima va bosqichlari?**
> **EN:** Production Order tracks manufacturing from start to finish. Stages: **Planned** → **Released** → **Closed**. It consumes raw materials from inventory and produces finished goods.  
> **UZ:** Ishlab chiqarish buyurtmasi ishlab chiqarishni boshidan oxirigacha kuzatadi. Bosqichlar: **Rejalashtirilgan** → **Chiqarilgan** → **Yopilgan**. Inventardan xom ashyo sarflaydi va tayyor mahsulot ishlab chiqaradi.

---

**37. Inventory Counting (Inventarizatsiya) qanday amalga oshiriladi?**
> **EN:** SAP B1 provides Inventory Counting documents. Process: freeze inventory → count physically → enter counted quantities → post the difference as inventory adjustment. Supports cycle counts and full physical counts.  
> **UZ:** SAP B1 Inventar sanash hujjatlarini taqdim etadi. Jarayon: inventarni muzlatish → jismonan sanash → hisoblangan miqdorlarni kiritish → farqni inventar tuzatmasi sifatida joylashtirish.

---

**38. Bank Reconciliation (Bank saldosini tekshirish) qanday?**
> **EN:** SAP B1's Bank Reconciliation tool compares bank statements with internal SAP transactions to identify discrepancies, uncleared items, and timing differences.  
> **UZ:** SAP B1 ning Bank Reconciliation vositasi bank ko'chirmalarini ichki SAP tranzaksiyalari bilan solishtiradi, tafovutlarni, tozalanmagan elementlarni va vaqt farqlarini aniqlaydi.

---

**39. Recurring Postings nima?**
> **EN:** Recurring Postings automate regular journal entries (rent, insurance, depreciation) by defining a template that SAP B1 automatically posts at configured intervals (monthly, quarterly, etc.).  
> **UZ:** Recurring Postings muntazam journal yozuvlarini (ijara, sug'urta, amortizatsiya) avtomatlashtiradi — shablon belgilanadi va SAP B1 sozlangan intervallarda (oylik, choraklik va h.k.) uni avtomatik joylashtiradi.

---

**40. Sales Analysis hisobotlari qanday?**
> **EN:** SAP B1 provides built-in sales analysis reports: sales by customer, item, salesperson, period, or territory. Can be visualized as charts and drilled down to individual transactions.  
> **UZ:** SAP B1 o'rnatilgan savdo tahlil hisobotlarini taqdim etadi: mijoz, tovar, sotuvchi, davr yoki hudud bo'yicha savdo. Diagrammalar sifatida vizuallashtirilishi va alohida tranzaksiyalargacha chuqurlashtirilishi mumkin.

---

**41. Partial Payment (Qisman to'lov) qanday qayd etiladi?**
> **EN:** In SAP B1, partial payments are recorded in the Incoming/Outgoing Payment document. The payment is matched against the specific invoice, leaving the remaining balance open.  
> **UZ:** SAP B1 da qisman to'lovlar Kiruvchi/Chiquvchi To'lov hujjatida qayd etiladi. To'lov muayyan hisob-fakturaga nisbatan moslanadi, qolgan balans ochiq qoladi.

---

**42. Credit Memo (Kredit yozuvi) nima?**
> **EN:** A Credit Memo is issued when goods are returned or an invoice needs to be corrected. It reduces the customer's/vendor's balance and reverses inventory and accounting entries.  
> **UZ:** Kredit yozuvi tovarlar qaytarilganda yoki hisob-fakturani tuzatish kerak bo'lganda beriladi. U mijoz/yetkazib beruvchi balansini kamaytiradi va inventar va buxgalteriya yozuvlarini bekor qiladi.

---

**43. Goods Return (Tovar qaytarish) jarayoni?**
> **EN:** Customer Return Process: **Return** document (reverses Delivery) → **A/R Credit Memo** (reverses Invoice) → refund payment if needed. Each step is linked for full audit trail.  
> **UZ:** Mijoz tovar qaytarish jarayoni: **Qaytarish** hujjati (Yetkazib berishni bekor qiladi) → **Debitor Kredit Yozuvi** (Hisob-fakturani bekor qiladi) → kerak bo'lsa to'lovni qaytarish.

---

**44. Intercompany Transactions nima?**
> **EN:** Intercompany transactions are financial transactions between subsidiaries of the same parent company. SAP B1 handles these through inter-company module or manual journal entries with elimination accounts.  
> **UZ:** Kompaniyalararo tranzaksiyalar — bir xil ona kompaniyaning sho'ba korxonalari o'rtasidagi moliyaviy tranzaksiyalar. SAP B1 buni kompaniyalararo modul yoki yo'q qilish hisoblari bilan qo'lda journal yozuvlari orqali boshqaradi.

---

**45. Route Management nima?**
> **EN:** Route Management in SAP B1 allows defining delivery routes, assigning customers to routes, and planning delivery schedules — useful for distribution businesses.  
> **UZ:** SAP B1 dagi Route Management yetkazib berish marshrutlarini belgilash, mijozlarni marshrutlarga tayinlash va yetkazib berish jadvallarini rejalashtirishga imkon beradi — distribyutor bizneslar uchun foydali.

---

**46. G/L Account Determination nima?**
> **EN:** G/L Account Determination defines which GL accounts are automatically used for specific transaction types (inventory, COGS, revenue, tax). Configured in Administration → Setup → Financials.  
> **UZ:** G/L Account Determination muayyan tranzaksiya turlari uchun (inventar, COGS, daromad, soliq) qaysi GL hisoblar avtomatik ishlatilishini belgilaydi. Administration → Setup → Financials da sozlanadi.

---

**47. Document Numbering (Hujjat raqamlash) qanday?**
> **EN:** SAP B1 allows configuring automatic numbering series for each document type (invoices, orders, receipts). Multiple series can be defined per document type for different periods or users.  
> **UZ:** SAP B1 har bir hujjat turi uchun (hisob-fakturalar, buyurtmalar, kvitansiyalar) avtomatik raqamlash seriyalarini sozlashga imkon beradi. Har bir hujjat turi uchun turli davrlar yoki foydalanuvchilar uchun bir nechta seriya belgilanishi mumkin.

---

**48. Inventory Transfer nima?**
> **EN:** Inventory Transfer is a SAP B1 document that moves stock from one warehouse to another without any financial impact — only inventory quantities are updated.  
> **UZ:** Inventar Ko'chirish — SAP B1 hujjati bo'lib, zaxirani bir ombordan ikkinchisiga moliyaviy ta'sersiz ko'chiradi — faqat inventar miqdorlari yangilanadi.

---

**49. Non-Inventory Item va Inventory Item farqi?**
> **EN:** **Inventory Item** tracks stock levels in SAP B1 (physical goods). **Non-Inventory Item** does not affect stock (services, one-time items). An item can only be switched between types when stock = 0 and no open documents exist.  
> **UZ:** **Inventar Tovar** SAP B1 da zaxira darajalarini kuzatadi (jismoniy tovarlar). **Inventarsiz Tovar** zaxiraga ta'sir qilmaydi (xizmatlar, bir martalik elementlar). Tovar faqat zaxira = 0 va ochiq hujjatlar yo'q bo'lganda turlar o'rtasida almashtirilishi mumkin.

---

**50. Sadece o'qish (Read-Only) rejimida hujjatlar?**
> **EN:** In SAP B1, once a document is fully closed (paid/delivered/cancelled), it becomes read-only. To make corrections, reversal documents (credit memo, return) must be used instead of editing.  
> **UZ:** SAP B1 da hujjat to'liq yopilgandan (to'langan/yetkazilgan/bekor qilingan) keyin u faqat o'qish uchun bo'ladi. Tuzatishlar kiritish uchun tahrirlash o'rniga teskari hujjatlar (kredit yozuvi, qaytarish) ishlatilishi kerak.

---

**51. SAP B1 da CRM imkoniyatlari?**
> **EN:** SAP B1 CRM includes: activity management (calls, meetings, tasks), opportunity tracking (sales pipeline), campaign management, and customer service history — all linked to Business Partner records.  
> **UZ:** SAP B1 CRM quyidagilarni o'z ichiga oladi: faoliyat boshqaruvi (qo'ng'iroqlar, uchrashuvlar, vazifalar), imkoniyatlarni kuzatish (savdo quvuri), kampaniyalarni boshqarish va mijozlarga xizmat ko'rsatish tarixi.

---

**52. Profit Center (Foyda markazi) qanday ishlaydi?**
> **EN:** Profit Centers in SAP B1 allow tracking income and expenses by business unit, department, or project — enabling profitability analysis at a granular level without separate company codes.  
> **UZ:** SAP B1 dagi Foyda Markazlari biznes bo'linmasi, bo'lim yoki loyiha bo'yicha daromad va xarajatlarni kuzatishga imkon beradi — alohida kompaniya kodlarisiz batafsil darajada rentabellik tahlilini ta'minlaydi.

---

**53. Period-End Closing (Davr yopish) jarayoni?**
> **EN:** Period-end closing in SAP B1 includes: running depreciation, bank reconciliation, inventory valuation, posting accruals, generating financial statements, and locking the period to prevent further postings.  
> **UZ:** SAP B1 da davr yopish quyidagilarni o'z ichiga oladi: amortizatsiyani hisoblash, bank saldosini tekshirish, inventar baholash, hisoblangan xarajatlarni joylashtirish, moliyaviy hisobotlarni yaratish va keyingi yozuvlarni oldini olish uchun davrni bloklash.

---

**54. SAP B1 da qanday hisobot vositalari mavjud?**
> **EN:** SAP B1 reporting tools: **Crystal Reports** (custom formatted reports), **XL Reporter** (Excel-based), **SAP HANA Analytics** (real-time), **Financial Report Wizard**, and **Query Manager** (SQL-based).  
> **UZ:** SAP B1 hisobot vositalari: **Crystal Reports** (maxsus formatlangan hisobotlar), **XL Reporter** (Excel asosli), **SAP HANA Analytics** (real-time), **Moliyaviy Hisobot Ustasi** va **Query Manager** (SQL asosli).

---

**55. Authorization (Ruxsat) tizimi qanday sozlanadi?**
> **EN:** Authorizations in SAP B1 are configured via Administration → System Initialization → Authorizations. You can grant/restrict access per module, form, specific actions (add/edit/delete), and reports.  
> **UZ:** SAP B1 da ruxsatlar Administration → System Initialization → Authorizations orqali sozlanadi. Modul, forma, muayyan amallar (qo'shish/tahrirlash/o'chirish) va hisobotlar bo'yicha kirish huquqi berilishi/cheklanishi mumkin.

---

## 3. Ilg'or daraja / Advanced

**56. DI API (Data Interface API) nima?**
> **EN:** DI API is the programmatic interface for SAP B1 that allows external applications to create, update, and delete SAP B1 business objects (orders, invoices, partners) via COM-based objects.  
> **UZ:** DI API — tashqi ilovalar SAP B1 biznes ob'ektlarini (buyurtmalar, hisob-fakturalar, sheriklarni) COM-asosli ob'ektlar orqali yaratish, yangilash va o'chirishiga imkon beruvchi SAP B1 uchun dasturlash interfeysi.

---

**57. UI API (User Interface API) nima?**
> **EN:** UI API allows developers to interact with SAP B1 forms and controls — adding custom buttons, handling events, modifying form behavior. Uses `Interop.SAPbouiCOM.dll`.  
> **UZ:** UI API dasturchilarga SAP B1 forma va boshqaruv elementlari bilan o'zaro ta'sir qilishga imkon beradi — maxsus tugmalar qo'shish, hodisalarni boshqarish, forma xulq-atvorini o'zgartirish. `Interop.SAPbouiCOM.dll` dan foydalanadi.

---

**58. SAP B1 SDK ikki asosiy DLL nima?**
> **EN:** `Interop.SAPbouiCOM.dll` — for UI/form controls (labels, grids, buttons). `Interop.SAPbobsCOM.dll` — for business objects (items, orders, invoices) via DI API.  
> **UZ:** `Interop.SAPbouiCOM.dll` — UI/forma boshqaruvlari uchun (labellar, gridlar, tugmalar). `Interop.SAPbobsCOM.dll` — DI API orqali biznes ob'ektlari uchun (tovarlar, buyurtmalar, hisob-fakturalar).

---

**59. Screen Painter nima?**
> **EN:** Screen Painter is an SAP add-on tool for designing custom forms in SAP B1 SDK. Created files have `.srf` extension and must be renamed to `.xml` before deployment.  
> **UZ:** Screen Painter — SAP B1 SDK da maxsus formalarni loyihalash uchun SAP qo'shimcha vositasi. Yaratilgan fayllar `.srf` kengaytmasiga ega va joylashtirishdan oldin `.xml` ga o'zgartirilishi kerak.

---

**60. Event Logger nima?**
> **EN:** SAP B1 Event Logger tracks all UI events fired in the application. Run simultaneously with SAP B1, it shows event types and sequences — essential for add-on development and debugging.  
> **UZ:** SAP B1 Event Logger ilovada yoqilgan barcha UI hodisalarini kuzatadi. SAP B1 bilan bir vaqtda ishga tushirilib, hodisa turlari va ketma-ketliklarini ko'rsatadi — qo'shimcha dasturlarni ishlab chiqish va disk raskadrovka uchun muhim.

---

**61. Service Layer nima?**
> **EN:** SAP B1 Service Layer is a RESTful API based on OData protocol, available from SAP B1 version 9.0+. It allows modern web/mobile applications to integrate with SAP B1 without installing the SDK locally.  
> **UZ:** SAP B1 Service Layer — OData protokoliga asoslangan RESTful API bo'lib, SAP B1 9.0+ versiyasidan boshlab mavjud. U zamonaviy veb/mobil ilovalarning SDK ni mahalliy o'rnatmasdan SAP B1 bilan integratsiyasiga imkon beradi.

---

**62. Stored Procedures SAP B1 da qanday ishlatiladi?**
> **EN:** Stored Procedures in SAP B1 (MS SQL/HANA) improve performance for complex reports, formatted searches, and batch operations. SAP warns against modifying standard SAP tables directly via stored procedures.  
> **UZ:** SAP B1 da Stored Procedures (MS SQL/HANA) murakkab hisobotlar, formatlangan qidiruvlar va partiya operatsiyalari uchun unumdorlikni yaxshilaydi. SAP stored procedures orqali standart SAP jadvallarini to'g'ridan-to'g'ri o'zgartirishdan ogohlantiradi.

---

**63. Add-On nima va qanday ishlab chiqiladi?**
> **EN:** An Add-On is a custom application developed using SAP B1 SDK that extends SAP B1 functionality. Developed in .NET (C#/VB.NET), deployed via Add-On Registration and Add-On Manager.  
> **UZ:** Add-On — SAP B1 funksiyalarini kengaytiradigan SAP B1 SDK yordamida ishlab chiqilgan maxsus ilova. .NET (C#/VB.NET) da ishlab chiqiladi, Add-On ro'yxatga olish va Add-On Manager orqali joylashtiriladi.

---

**64. SAP B1 da qanday ma'lumotlarni bevosita SQL bilan olish mumkin?**
> **EN:** Key SAP B1 tables: `OCRD` (Business Partners), `OITM` (Items), `ORDR` (Sales Orders), `OINV` (AR Invoices), `OPCH` (AP Invoices), `OIVL` (Inventory Transactions), `JDT1` (Journal Entries).  
> **UZ:** Asosiy SAP B1 jadvallari: `OCRD` (Business Partners), `OITM` (Tovarlar), `ORDR` (Savdo buyurtmalari), `OINV` (AR hisob-fakturalar), `OPCH` (AP hisob-fakturalar), `OIVL` (Inventar tranzaksiyalari), `JDT1` (Journal yozuvlari).

```sql
-- Misol: Barcha ochiq savdo buyurtmalarini olish
SELECT T0.DocNum, T0.CardName, T0.DocTotal, T0.DocDate
FROM ORDR T0
WHERE T0.DocStatus = 'O'  -- O = Open
ORDER BY T0.DocDate DESC;
```

---

**65. SAP B1 integratsiya usullari qanday?**
> **EN:** Integration methods: **DI API** (COM-based, local), **Service Layer** (REST/OData, remote), **DTW** (bulk data import), **B1iF** (B1 Integration Framework for middleware), **Direct SQL** (read-only, not recommended for writes).  
> **UZ:** Integratsiya usullari: **DI API** (COM-asosli, mahalliy), **Service Layer** (REST/OData, masofaviy), **DTW** (ommaviy ma'lumot importi), **B1iF** (middleware uchun B1 Integratsiya Tizimi), **To'g'ridan-to'g'ri SQL** (faqat o'qish uchun).

---

**66. Volume Discounts va Customer-Specific Pricing qanday sozlanadi?**
> **EN:** In SAP B1, volume discounts are set up via Discount Groups or Special Prices per Business Partner. Customer-specific pricing uses Price Lists with override prices per item per customer.  
> **UZ:** SAP B1 da hajm chegirmalari Chegirma Guruhlari yoki Business Partner bo'yicha Maxsus Narxlar orqali sozlanadi. Mijozga xos narxlash har bir mijoz uchun tovar bo'yicha narxlarni bekor qiladigan Narx Ro'yxatlaridan foydalanadi.

---

**67. SAP B1 ni sekinlashuvini qanday diagnostika qilish?**
> **EN:** Steps: check server resources (CPU/RAM), analyze slow queries via SQL Profiler, review index fragmentation, check network latency, examine add-ons running, review SAP B1 log files for errors.  
> **UZ:** Qadamlar: server resurslarini tekshirish (CPU/RAM), SQL Profiler orqali sekin so'rovlarni tahlil qilish, indeks parchalanishini ko'rib chiqish, tarmoq kechikishini tekshirish, ishlaydigan qo'shimcha dasturlarni ko'rib chiqish, xatolar uchun SAP B1 jurnal fayllarini ko'rib chiqish.

---

**68. SAP B1 ga ma'lumot migratsiyasi (Data Migration) qanday amalga oshiriladi?**
> **EN:** Data migration process: **Analyze** legacy data → **Map** to SAP B1 fields → **Cleanse** data → **Load** via DTW or DI API → **Validate** in SAP B1 → **Go-live**. Critical to migrate master data first, then open transactions.  
> **UZ:** Ma'lumotlarni migratsiya qilish jarayoni: eski ma'lumotlarni **tahlil qilish** → SAP B1 maydonlariga **xaritalash** → ma'lumotlarni **tozalash** → DTW yoki DI API orqali **yuklash** → SAP B1 da **tekshirish** → **Ishga tushirish**.

---

**69. Security Model (Xavfsizlik modeli) eng yaxshi amaliyotlari?**
> **EN:** Best practices: principle of least privilege, role-based access, separate admin accounts, regular authorization reviews, password policies, audit logging enabled, restrict direct database access.  
> **UZ:** Eng yaxshi amaliyotlar: minimal imtiyoz tamoyili, rol-asosli kirish, alohida admin hisoblar, muntazam ruxsat ko'rib chiqishlari, parol siyosatlari, audit jurnalini yoqish, to'g'ridan-to'g'ri ma'lumotlar bazasiga kirishni cheklash.

---

**70. SAP B1 backup strategiyasi qanday?**
> **EN:** SAP B1 backup strategy: daily full SQL Server backups, transaction log backups every few hours, test restores regularly, store backups offsite/cloud, document recovery procedures.  
> **UZ:** SAP B1 zaxira strategiyasi: kunlik to'liq SQL Server zaxiralari, bir necha soatda bir tranzaksiya jurnali zaxiralari, muntazam ravishda tiklashlarni sinab ko'rish, zaxiralarni tashqarida/cloudda saqlash, tiklash tartiblarini hujjatlashtirish.

---

**71. Consignment Inventory (Konsignatsiya inventari) nima?**
> **EN:** Consignment inventory means goods are held by a customer/warehouse but owned by the vendor until sold. SAP B1 handles this via special warehouses and inventory transfers upon sale.  
> **UZ:** Konsignatsiya inventari — tovarlar mijoz/omborda saqlanadi, lekin sotilgunga qadar yetkazib beruvchiga tegishli. SAP B1 buni maxsus omborlar va sotish paytida inventar ko'chirish orqali boshqaradi.

---

**72. SAP B1 da e-commerce integratsiyasi?**
> **EN:** E-commerce (Shopify, Magento, WooCommerce) integration with SAP B1 uses the Service Layer or B1iF middleware. Key sync points: product catalog, inventory levels, orders, customer data, payments.  
> **UZ:** E-commerce (Shopify, Magento, WooCommerce) bilan SAP B1 integratsiyasi Service Layer yoki B1iF middleware dan foydalanadi. Asosiy sinxronizatsiya nuqtalari: mahsulot katalogi, inventar darajalari, buyurtmalar, mijoz ma'lumotlari, to'lovlar.

---

**73. KPI (Key Performance Indicators) monitoring SAP B1 da?**
> **EN:** Key KPIs tracked in SAP B1: Revenue vs Target, Gross Margin %, Inventory Turnover, DSO (Days Sales Outstanding), DPO (Days Payable Outstanding), Order Fulfillment Rate, Customer Satisfaction.  
> **UZ:** SAP B1 da kuzatiladigan asosiy KPI lar: Daromad va Maqsad, Yalpi Marj %, Inventar aylanmasi, DSO (Savdo debitor kunlari), DPO (Kreditor to'lov kunlari), Buyurtmani bajarish darajasi, Mijoz qoniqishi.

---

**74. SAP B1 versiyasini yangilash (Upgrade) jarayoni?**
> **EN:** Upgrade process: backup current system → test in sandbox environment → run upgrade wizard → validate all modules and custom add-ons → user acceptance testing → go-live during low-traffic period.  
> **UZ:** Yangilash jarayoni: joriy tizimni zaxiralash → sandbox muhitida sinab ko'rish → yangilash ustasini ishga tushirish → barcha modullar va maxsus qo'shimcha dasturlarni tekshirish → foydalanuvchi qabul testi → past trafikli davrda ishga tushirish.

---

**75. Quality Control (Sifat nazorati) SAP B1 da?**
> **EN:** SAP B1 supports QC through: item inspection at goods receipt, serial/batch number tracking, hold/release mechanisms, and integration with third-party QC add-ons for regulated industries.  
> **UZ:** SAP B1 QC ni quyidagilar orqali qo'llab-quvvatlaydi: tovar qabulida tovar tekshiruvi, seriya/partiya raqamini kuzatish, ushlab turish/ozod qilish mexanizmlari va tartibga solinadigan sanoat uchun uchinchi tomon QC qo'shimcha dasturlari bilan integratsiya.

---

**76. Batch Number va Serial Number kuzatish?**
> **EN:** SAP B1 supports batch (lot) and serial number tracking for items. Each batch/serial number can be tracked from receipt to delivery, providing full traceability for quality and warranty purposes.  
> **UZ:** SAP B1 tovarlar uchun partiya (lot) va seriya raqamini kuzatishni qo'llab-quvvatlaydi. Har bir partiya/seriya raqami qabuldan yetkazib berishgacha kuzatilishi mumkin, sifat va kafolat maqsadlari uchun to'liq kuzatuvchanlikni ta'minlaydi.

---

**77. SAP B1 da Cloud vs On-Premise afzalliklari?**

| | On-Premise | Cloud |
|---|---|---|
| Narx | Bir martalik | Oylik abonement |
| Nazorat | To'liq | Cheklangan |
| IT xarajat | Yuqori | Past |
| Yangilanish | Qo'lda | Avtomatik |
| Xavfsizlik | Mijoz mas'ul | SAP mas'ul |

---

**78. SAP B1 mobile ilovalar?**
> **EN:** SAP B1 offers three mobile apps: **SAP Business One App** (managers/overview), **Sales App** (for salespeople - quotations, orders), **Service App** (for technicians - service calls, equipment). All sync via secure internet connection.  
> **UZ:** SAP B1 uchta mobil ilova taqdim etadi: **SAP Business One App** (menejerlar/umumiy ko'rinish), **Savdo Ilovasi** (sotuvchilar uchun - takliflar, buyurtmalar), **Xizmat Ilovasi** (texnik xodimlar uchun - xizmat qo'ng'iroqlari, uskunalar).

---

**79. SAP B1 da Consolidation (Konsolidatsiya)?**
> **EN:** For multi-company consolidation in SAP B1, each subsidiary runs its own SAP B1 instance. Consolidation reports are produced by aggregating data using XL Reporter or external BI tools.  
> **UZ:** SAP B1 da ko'p kompaniyali konsolidatsiya uchun har bir sho'ba kompaniya o'z SAP B1 nusxasida ishlaydi. Konsolidatsiya hisobotlari XL Reporter yoki tashqi BI vositalari yordamida ma'lumotlarni yig'ish orqali tayyorlanadi.

---

**80. SAP B1 da Archive (Arxivlash) strategiyasi?**
> **EN:** Data archiving in SAP B1: archive old closed documents to separate databases, maintain performance of active database, comply with legal retention requirements. SAP provides archiving tools per version.  
> **UZ:** SAP B1 da ma'lumotlarni arxivlash: eski yopiq hujjatlarni alohida ma'lumotlar bazalariga arxivlash, faol ma'lumotlar bazasi unumdorligini saqlash, qonuniy saqlash talablariga rioya qilish.

---

## 4. Ekspert daraja / Expert

**81. Murakkab intercompany tranzaksiyalarni qanday loyihalash?**
> **EN:** Design approach: identify cross-border tax rules per country, set up elimination accounts, use B1iF or custom integration for automatic document creation in counterpart company, implement reconciliation reports.  
> **UZ:** Loyihalash yondashuvi: mamlakatlar bo'yicha chegaralararo soliq qoidalarini aniqlash, yo'q qilish hisoblarini sozlash, hamtomon kompaniyada avtomatik hujjat yaratish uchun B1iF yoki maxsus integratsiyadan foydalanish, rekonsilyatsiya hisobotlarini amalga oshirish.

---

**82. SQL so'rovlarini SAP B1 da optimallashtirish?**
> **EN:** Optimization: use proper indexes on filtered columns, avoid `SELECT *`, use covering indexes, rewrite correlated subqueries as JOINs, analyze execution plans in SQL Profiler, use SAP HANA calculation views for aggregation.  
> **UZ:** Optimallashtirish: filtrlangan ustunlarda to'g'ri indekslardan foydalanish, `SELECT *` dan qochish, qoplama indekslardan foydalanish, bog'liq subso'rovlarni JOIN larga qayta yozish, SQL Profiler da bajarish rejalarini tahlil qilish.

---

**83. Seriya raqamini kuzatish WMS bilan integratsiya?**
> **EN:** Integration approach: SAP B1 serial number is created at GR; WMS scans and confirms via Service Layer API. On delivery, SAP B1 allocates the serial number; WMS confirms pick and ship in real-time.  
> **UZ:** Integratsiya yondashuvi: SAP B1 seriya raqami GR da yaratiladi; WMS Service Layer API orqali skanerlaydi va tasdiqlaydi. Yetkazib berishda SAP B1 seriya raqamini ajratadi; WMS real vaqtda tanlash va jo'natishni tasdiqlaydi.

---

**84. BI yechimini SAP B1 ustida qanday qurish?**
> **EN:** Options: SAP HANA Views + Crystal Reports (native), XL Reporter (Excel-based), connect Power BI/Tableau to HANA/SQL Server (read-only), use B1iF to ETL data into a data warehouse.  
> **UZ:** Variantlar: SAP HANA Views + Crystal Reports (mahalliy), XL Reporter (Excel-asosli), Power BI/Tableau ni HANA/SQL Server ga ulash (faqat o'qish), ma'lumotlar omboriga ma'lumot ETL qilish uchun B1iF dan foydalanish.

---

**85. DI API orqali avtomatik vazifalarni qanday amalga oshirish?**
> **EN:** Use DI API with Windows Service or Task Scheduler: connect to company using `SAPbobsCOM.Company`, iterate through business objects, handle errors with return code checking (0 = success), log all operations.  
> **UZ:** DI API ni Windows Service yoki Task Scheduler bilan ishlatish: `SAPbobsCOM.Company` yordamida kompaniyaga ulanish, biznes ob'ektlari orqali takrorlash, qaytish kodini tekshirish bilan xatolarni boshqarish (0 = muvaffaqiyat), barcha operatsiyalarni jurnalga kiritish.

```csharp
// Misol: DI API orqali hisob-faktura yaratish
SAPbobsCOM.Company oCompany = new SAPbobsCOM.Company();
oCompany.Server = "SERVER_NAME";
oCompany.CompanyDB = "DB_NAME";
oCompany.UserName = "manager";
oCompany.Password = "password";

int retCode = oCompany.Connect();
if (retCode == 0) {
    SAPbobsCOM.Documents oInvoice = 
        oCompany.GetBusinessObject(SAPbobsCOM.BoObjectTypes.oInvoices);
    oInvoice.CardCode = "C00001";
    oInvoice.Lines.ItemCode = "ITEM001";
    oInvoice.Lines.Quantity = 10;
    oInvoice.Add();
}
```

---

**86. Licensing (Litsenziya) turlari?**
> **EN:** SAP B1 licenses: **Professional User** (full access, ~$3,000/year), **Limited User** (read-only/limited modules, cheaper), **Starter Package** (up to 5 users, all modules included, fixed price for very small businesses).  
> **UZ:** SAP B1 litsenziyalari: **Professional User** (to'liq kirish, ~$3,000/yil), **Limited User** (faqat o'qish/cheklangan modullar, arzonroq), **Starter Package** (5 foydalanuvchigacha, barcha modullar, juda kichik biznes uchun).

---

**87. Regulated Industry (Tartibga solinadigan sanoat) da SAP B1 qiyinchiliklari?**
> **EN:** Challenges: FDA 21 CFR Part 11 compliance (audit trails, electronic signatures), GMP validation documentation, SOX compliance for financial controls, GDPR for data privacy — requires careful configuration and add-on validation.  
> **UZ:** Qiyinchiliklar: FDA 21 CFR Part 11 muvofiqligi (audit izlari, elektron imzolar), GMP tekshiruvi hujjatlari, moliyaviy nazorat uchun SOX muvofiqligi, ma'lumotlar maxfiyligi uchun GDPR — ehtiyotkorlik bilan sozlash va qo'shimcha dastur tekshiruvini talab qiladi.

---

**88. Version Control va Deployment SAP B1 add-on uchun?**
> **EN:** Best practices: use Git for source code, maintain dev/test/prod SAP B1 instances, use SAP Add-On Registration (.ard file) for deployment, document all customizations, test in sandbox before production deployment.  
> **UZ:** Eng yaxshi amaliyotlar: manba kodi uchun Git dan foydalanish, dev/test/prod SAP B1 nusxalarini saqlash, joylashtirish uchun SAP Add-On ro'yxatga olish (.ard fayl) dan foydalanish, barcha sozlashlarni hujjatlashtirish.

---

**89. Peak Hours Performance muammolarini diagnostika qilish?**
> **EN:** Tools: SQL Server Activity Monitor, SAP B1 System Log, Windows Performance Monitor, Network monitoring. Common causes: missing indexes, poorly written add-ons, insufficient server RAM, heavy MRP/reporting jobs during business hours.  
> **UZ:** Vositalar: SQL Server Activity Monitor, SAP B1 Tizim Jurnali, Windows Performance Monitor, Tarmoq monitoringi. Umumiy sabablar: yo'q indekslar, yomon yozilgan qo'shimcha dasturlar, yetarli bo'lmagan server RAM, ish soatlarida og'ir MRP/hisobot ishlari.

---

**90. On-Premise dan Cloud ga migratsiya qanday?**
> **EN:** Steps: assess customizations compatibility → export data → set up cloud environment → restore database → reconfigure add-ons for cloud → test all integrations → cut-over planning → go-live with parallel run period.  
> **UZ:** Qadamlar: sozlashlar muvofiqligini baholash → ma'lumotlarni eksport qilish → cloud muhitini sozlash → ma'lumotlar bazasini tiklash → qo'shimcha dasturlarni cloud uchun qayta sozlash → barcha integratsiyalarni sinab ko'rish → o'tish rejalashtirish → parallel ishlash davri bilan ishga tushirish.

---

**91. Data Integrity (Ma'lumot yaxlitligi) ta'minlash?**
> **EN:** Strategies: enforce mandatory fields via UDF validation, use approval procedures for critical changes, enable audit trail, implement regular data quality checks via SQL queries, restrict direct database access.  
> **UZ:** Strategiyalar: UDF tekshiruvi orqali majburiy maydonlarni joriy qilish, muhim o'zgarishlar uchun tasdiqlash tartiblaridan foydalanish, audit izini yoqish, SQL so'rovlari orqali muntazam ma'lumot sifati tekshiruvlarini amalga oshirish.

---

**92. Intercompany Elimination qanday amalga oshiriladi?**
> **EN:** Create dedicated intercompany GL accounts, post intercompany invoices to these accounts, use consolidation add-on or Excel to eliminate intercompany balances when preparing group financial statements.  
> **UZ:** Maxsus kompaniyalararo GL hisoblarini yaratish, kompaniyalararo hisob-fakturalarni ushbu hisoblarga joylashtirish, guruh moliyaviy hisobotlarini tayyorlashda kompaniyalararo balanslarni yo'q qilish uchun konsolidatsiya qo'shimcha dasturi yoki Excel dan foydalanish.

---

**93. SAP B1 da Audit Trail (Audit izi) qanday ishlaydi?**
> **EN:** SAP B1 logs changes to documents in the `ADOC` and change log tables. You can enable Change Log per table in Administration → System Initialization → Change Log. Tracks who changed what and when.  
> **UZ:** SAP B1 hujjatlardagi o'zgarishlarni `ADOC` va o'zgarishlar jurnali jadvallarida qayd etadi. Administration → System Initialization → Change Log da jadval bo'yicha O'zgarishlar Jurnalini yoqish mumkin.

---

**94. Crystal Reports da murakkab hisobotlar qanday yaratiladi?**
> **EN:** Advanced Crystal Reports in SAP B1: use subreports for related data, parameter fields for user input, formula fields for calculations, cross-tabs for pivot-style analysis, and linked reports for drill-down.  
> **UZ:** SAP B1 da murakkab Crystal Reports: bog'liq ma'lumotlar uchun subhisobotlardan foydalanish, foydalanuvchi kiritishi uchun parametr maydonlari, hisob-kitoblar uchun formula maydonlari, pivot-uslubdagi tahlil uchun cross-tablar.

---

**95. SAP B1 da Interoperability (Boshqa tizimlar bilan mos ishlash)?**
> **EN:** SAP B1 integrates with: Microsoft Office (Excel, Outlook), Crystal Reports, third-party WMS, e-commerce platforms, payment gateways, EDI systems, banking software, and custom ERP components via Service Layer/DI API.  
> **UZ:** SAP B1 quyidagilar bilan integratsiyalashadi: Microsoft Office (Excel, Outlook), Crystal Reports, uchinchi tomon WMS, e-commerce platformalari, to'lov shlyuzlari, EDI tizimlari, bank dasturlari va Service Layer/DI API orqali maxsus ERP komponentlari.

---

**96. SAP B1 Implementation metodologiyasi?**
> **EN:** SAP uses **ASAP** (Accelerated SAP) or **SAP Activate** methodology: **Prepare** → **Explore** (BBP - Business Blueprint) → **Realize** (configuration/development) → **Deploy** (UAT, go-live) → **Run** (support).  
> **UZ:** SAP **ASAP** (Tezlashtirilgan SAP) yoki **SAP Activate** metodologiyasidan foydalanadi: **Tayyorlash** → **O'rganish** (BBP - Biznes Chizmasi) → **Amalga oshirish** (sozlash/ishlab chiqish) → **Joylashtirish** (UAT, ishga tushirish) → **Ishlatish** (qo'llab-quvvatlash).

---

**97. SAP B1 da Real-time Reporting HANA bilan?**
> **EN:** With SAP HANA: create Calculation Views for complex aggregations, use Analytical Privileges for security, expose data via OData for Power BI/Lumira, eliminate need for period-end batch reports with live data access.  
> **UZ:** SAP HANA bilan: murakkab agregatlar uchun Hisoblash Ko'rinishlarini yaratish, xavfsizlik uchun Tahliliy Imtiyozlardan foydalanish, Power BI/Lumira uchun OData orqali ma'lumotlarni ochish, jonli ma'lumotlarga kirish bilan davr oxiri partiya hisobotlariga ehtiyojni yo'q qilish.

---

**98. GDPR va ma'lumotlar maxfiyligi SAP B1 da?**
> **EN:** SAP B1 supports GDPR through: data anonymization tools, consent tracking, right-to-erasure workflows (with limitations for accounting records), data access controls, and audit logging of personal data access.  
> **UZ:** SAP B1 GDPR ni quyidagilar orqali qo'llab-quvvatlaydi: ma'lumotlarni anonimlashtirish vositalari, rozilikni kuzatish, o'chirish huquqi ish oqimlari (buxgalteriya yozuvlari uchun cheklovlar bilan), ma'lumotlarga kirish nazorati va shaxsiy ma'lumotlarga kirishning audit jurnali.

---

**99. SAP B1 da eng keng tarqalgan xatolar va yechimlari?**

| Xato / Error | Sabab / Cause | Yechim / Solution |
|---|---|---|
| "Business Partner not found" | Noto'g'ri CardCode | Master data tekshirish |
| "Document is locked" | Boshqa foydalanuvchi ochiq | Faol sessiyalarni tekshirish |
| "Period is locked" | Yopilgan hisob davri | Period sozlamalarini ochish |
| "Insufficient quantity" | Manfiy zaxira | Inventar auditini o'tkazish |
| DI API return code ≠ 0 | Turli sabab | `oCompany.GetLastErrorDescription()` |

---

**100. SAP B1 bo'yicha yangiliklar va resurslarni qanday kuzatib borish?**
> **EN:** Resources: **SAP Community** (community.sap.com), **SAP Help Portal** (help.sap.com), **SAP Business One SDK documentation**, **SAP Notes** (support.sap.com), SAP B1 YouTube channel, partner forums, and SAP certification programs.  
> **UZ:** Resurslar: **SAP Community** (community.sap.com), **SAP Help Portal** (help.sap.com), **SAP Business One SDK hujjatlari**, **SAP Eslatmalari** (support.sap.com), SAP B1 YouTube kanali, hamkor forumlar va SAP sertifikatlash dasturlari.

---

## 📋 Tezkor Yo'l-Yo'riq / Quick Cheatsheet

### SAP B1 asosiy jadvallar / Key Tables
```sql
OCRD  -- Business Partners (Mijoz/Vendor/Lead)
OITM  -- Item Master Data (Tovarlar)
ORDR  -- Sales Orders (Savdo buyurtmalari)
OINV  -- AR Invoices (Debitor hisob-fakturalar)
OPOR  -- Purchase Orders (Xarid buyurtmalari)
OPCH  -- AP Invoices (Kreditor hisob-fakturalar)
OIGN  -- Goods Receipt (Tovar qabuli)
OIGE  -- Goods Issue (Tovar chiqarish)
OIVL  -- Inventory Transactions (Inventar tranzaksiyalari)
JDT1  -- Journal Entry Lines (Journal yozuv satrlari)
OJDT  -- Journal Entry Header (Journal yozuv sarlavhasi)
OACT  -- Chart of Accounts (Hisoblar rejasi)
OWHS  -- Warehouses (Omborlar)
```

### Hujjat holatlari / Document Statuses
| Kod | Ma'no (UZ) | English |
|---|---|---|
| `O` | Ochiq | Open |
| `C` | Yopiq | Closed |
| `L` | Bekor qilingan | Cancelled |
| `D` | O'chirilgan | Deleted |

### DI API Return Codes
| Kod | Ma'no |
|---|---|
| `0` | Muvaffaqiyat / Success |
| `-1` | Umumiy xato / General error |
| `-2006` | Foydalanuvchi avtorizatsiyasi yo'q / No user authorization |
| `-2028` | Hujjat yopiq / Document is closed |

---

*Tayyorlagan / Prepared by: Alyorjon | Manba / Source: SAP B1 Interview Questions (adaface.com, mindmajix.com, community.sap.com)*