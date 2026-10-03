# 🟣 Odoo UI & Functional Admin — Real-World Interview Questions & Answers
### Ikki tilli mukammal qo'llanma / Comprehensive Bilingual Reference (English 🇬🇧 & O'zbek 🇺🇿)

> **Mavzular / Topics:** Odoo ERP Business Workflows, Sales, CRM, Purchase, Inventory, Accounting, Manufacturing (MRP), HR, Studio & Security Admin.  

---

# 📚 CHUQUR NAZARIYA VA UI WORKFLOWS

---

## 1. Odoo ERP Business Architecture
Odoo ERP modullari yagona ma'lumotlar bazasida ishlaydi:
- **CRM -> Sales -> Inventory -> Accounting**: Lead'dan to'lov undirishgacha bo'lgan to'liq zanjir.
- **Purchase -> Inventory -> Vendor Bill**: Yetkazib beruvchidan tovar kirim qilish va qarzdorlikni buxgalteriyaga yozish.

---

# 🟢 QUESTIONS & ANSWERS (Q1 – Q10)

---


## Q1. Odoo ERP vs 1C Architecture | Odoo ERP va 1C o'rtasidagi farq

**EN:** Odoo integrates Sales, Inventory, Accounting into a unified real-time database.

**UZB:** Odoo barcha bo'limlarni yagona real-vaqt bazasida birlashtiradi.

```text
UI Path: Apps -> Install Modules
```

---

## Q2. Search, Filters & Group By in UI | Search Bar, Filters va Group By ishlatilishi

**EN:** Filtering, grouping by fields, and saving current searches under Favorites.

**UZB:** Qidiruv paneli ma'lumotlarni saralash va Favorites bo'limida saqlash imkonini beradi.

```text
UI Path: Any App -> Top Search Bar -> Filters -> Favorites
```

---

## Q3. Quotation to Sale Order Lifecycle | Quotation va Sale Order sikli

**EN:** Draft Quotation converts to Sale Order upon confirmation, reserving inventory.

**UZB:** Quotation tasdiqlangach Sale Order holatiga o'tadi va ombor zaxirasini band qiladi.

```text
Draft Quotation -> Confirm -> Sale Order -> Delivery & Invoice
```

---

## Q4. RFQ vs Purchase Order Workflow | RFQ va Purchase Order zanjiri

**EN:** RFQ sent to vendors for pricing negotiation before confirming into Purchase Order.

**UZB:** RFQ yetkazib beruvchiga narx so'rab yuboriladi va tasdiqlangach PO ga aylanadi.

```text
Draft RFQ -> Confirm Order -> Purchase Order -> Goods Receipt -> Vendor Bill
```

---

## Q5. Stock Operations (Receipt, Delivery, Internal Transfer) | Ombor operatsiyalari farqlari

**EN:** Receipt incoming, Delivery outgoing, Internal Transfer between warehouses.

**UZB:** Receipt kirim, Delivery Order chiqim va Internal Transfer ichki ko'chirishdir.

```text
Inventory -> Operations -> Transfers
```

---

## Q6. Reordering Rules Setup | Reordering Rules (Avtomatik qayta xarid)

**EN:** Reordering rules generate RFQ when Virtual Stock falls below Minimum Quantity.

**UZB:** Minimal miqdordan tushib ketsa avtomatik RFQ yaratuvchi ombor qoidasi.

```text
Inventory -> Products -> Reordering Rules -> Create (Min Qty: 10)
```

---

## Q7. Customer Invoice vs Vendor Bill | Customer Invoice va Vendor Bill farqlari

**EN:** Customer Invoice represents Receivables; Vendor Bill represents Payables.

**UZB:** Customer Invoice Debitorlik hujjati, Vendor Bill esa Kreditorlik qarzdorligidir.

```text
Accounting -> Customers -> Invoices / Vendors -> Bills
```

---

## Q8. Bank Reconciliation Process | Bank ko'chirmasini moslashtirish

**EN:** Matching imported bank statement lines with open Invoices and Bills.

**UZB:** Bank ko'chirma satrlarini hisob-fakturalar bilan moslashtirib to'lovni tasdiqlash.

```text
Accounting -> Dashboard -> Bank -> Reconcile Items
```

---

## Q9. Odoo Studio Custom Fields | Odoo Studio orqali maydon yaratish

**EN:** Drag & Drop fields into views via UI without writing backend Python code.

**UZB:** Kod yozmasdan brauzerda yangi Form maydoni va ko me rinish yaratish.

```text
Click Studio Icon -> Drag Field -> Set Label -> Close Studio
```

---

## Q10. Multi-Company Security Setup | Multi-Company xavfsizlik sozlamalari

**EN:** Multi-Company isolates records by company_id based on top-right switcher.

**UZB:** Multi-Company rejimida har bir hujjat company_id bo'yicha ajratiladi.

```text
Settings -> Users & Companies -> Companies
```
