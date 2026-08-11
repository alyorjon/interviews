# 🧩 Excel Interview Challenges — "2-Minute Problem" To'plami / Bilingual Worked Examples

> **Manba / Source:** @sqlspecialist Telegram kanali (2023–2026 postlari), 1957 ta xabar orasidan Excel formulalariga oid ~44 ta post tahlil qilinib, takrorlanganlari birlashtirilgan holda tuzildi.
> **Format:** Har bir savol haqiqiy ma'lumot jadvali + yechim formula + tushuntirish + "bonus" (muqobil/eskiroq Excel versiyasi uchun formula) + shu mavzudagi tegishli funksiyalar ro'yxati bilan beriladi — bu format klassik intervyu "live coding" savoliga o'xshaydi.
> **Diqqat:** [excel/basics.md](basics.md) — 101 formulaning to'liq spravochnigi. Ushbu fayl esa **amaliy, hikoya-asosidagi** intervyu savollariga qaratilgan — ikkalasi bir-birini to'ldiradi.

---

## 📌 1. Shartli yig'indi va sanash — SUMIFS / MAXIFS / COUNTIF

**Ma'lumot:**

| Employee | Department | Salary |
|---|---|---|
| John | IT | 75,000 |
| Sarah | HR | 60,000 |
| Mike | IT | 82,000 |
| David | Finance | 90,000 |
| Alice | HR | 65,000 |

**Savol 1:** IT bo'limidagi va maoshi 80,000 dan yuqori xodimlarning umumiy maoshini toping.

```excel
=SUMIFS(C2:C6,B2:B6,"IT",C2:C6,">80000")
```
Natija: **82,000** (faqat Mike shartga mos keladi).

**Dinamik variant (katak orqali kriteriya):**
```excel
=SUMIFS(C2:C6,B2:B6,E2,C2:C6,">"&F2)
```
`E2="IT"`, `F2=80000` bo'lsa, kriteriyalar o'zgarganda formula avtomatik yangilanadi.

**Savol 2:** Har bir bo'limdagi eng yuqori maoshni toping (Excel 365/2021).

```excel
=MAXIFS(C2:C6,B2:B6,E2)
```
**Eski Excel versiyalari uchun (massiv formula, Ctrl+Shift+Enter):**
```excel
=MAX(IF(B2:B6=E2,C2:C6))
```

**Savol 3:** IT bo'limidagi xodimlar sonini sanang.
```excel
=COUNTIF(B2:B6,"IT")
```

**Tegishli funksiyalar guruhi:** `SUMIF/SUMIFS`, `COUNTIF/COUNTIFS`, `AVERAGEIF/AVERAGEIFS`, `MAXIFS/MINIFS` — hisobot va dashboardlarda eng ko'p so'raladigan Excel funksiyalari.

---

## 📌 2. Reyting va N-chi qiymat — LARGE / RANK / XLOOKUP

**Ma'lumot:** Employee | Sales (John 12,000 · Sarah 18,000 · Mike 15,000 · David 20,000 · Alice 10,000)

**Savol:** Ikkinchi eng yuqori sotuvni va shu xodim ismini toping.

```excel
=LARGE(B2:B6,2)                              ' → 18,000
=XLOOKUP(LARGE(B2:B6,2),B2:B6,A2:A6)         ' → Sarah (Excel 365)
=INDEX(A2:A6,MATCH(LARGE(B2:B6,2),B2:B6,0))  ' → eski versiyalar uchun
```

**Savol:** Xodimlarni sotuv bo'yicha reytinglang (eng yuqori = 1-o'rin).
```excel
=RANK(C2,C2:C6,0)          ' 0 = kamayish tartibida (eng katta → 1-o'rin)
=RANK.EQ(C2,C2:C6,0)       ' bir xil qiymatlarga bir xil rank beradi
=RANK.AVG(C2,C2:C6,0)      ' bir xil qiymatlarga o'rtacha rank beradi
```

> **Muhim:** Diapazonni (`C2:C6`) formulani pastga sudraganda o'zgarmasligi uchun **absolyut** qilib yozing: `RANK(C2,$C$2:$C$6,0)`.

**Tegishli funksiyalar guruhi:** `LARGE()`, `SMALL()`, `RANK()`/`RANK.EQ()`/`RANK.AVG()`, `SORT()`, `FILTER()`.

---

## 📌 3. Sana va xizmat muddati — DATEDIF

**Ma'lumot:** Employee: Joining Date (John 15-Jan-2022, Sarah 20-Mar-2021, Mike 10-Jul-2023, David 05-Nov-2020)

**Savol:** Har bir xodimning ish stajini (to'liq yil) hisoblang.
```excel
=DATEDIF(B2,TODAY(),"Y")
```

**Bonus — yil va oyni birga chiqarish:**
```excel
=DATEDIF(B2,TODAY(),"Y")&" Years "&DATEDIF(B2,TODAY(),"YM")&" Months"
```
Natija masalan: `4 Years 6 Months`. `TODAY()` dinamik bo'lgani uchun natija vaqt o'tishi bilan avtomatik yangilanadi.

**Tegishli funksiyalar guruhi:** `TODAY()`, `NOW()`, `DATEDIF()`, `EDATE()`, `EOMONTH()`, `YEAR()`, `MONTH()`, `DAY()` — HR, moliya va payroll hisobotlarida keng qo'llaniladi.

---

## 📌 4. Ko'p shartli kategoriyalash — IFS / Nested IF

**Ma'lumot:** Employee | Sales (John 12,000 · Sarah 18,000 · Mike 15,000 · David 20,000 · Alice 10,000)

**Savol:** Sotuv `>=18000` bo'lsa "High Performer", `12000–17999` oralig'ida "Average Performer", aks holda "Low Performer" deb belgilang.

```excel
=IFS(
  C2>=18000,"High Performer",
  C2>=12000,"Average Performer",
  TRUE,"Low Performer"
)
```

**Eski Excel versiyalari uchun (nested IF):**
```excel
=IF(C2>=18000,"High Performer",
  IF(C2>=12000,"Average Performer","Low Performer"))
```

**Tegishli funksiyalar guruhi:** `IF()`, `IFS()`, `AND()`, `OR()`, `IFERROR()`.

---

## 📌 5. Noyob qiymatlarni sanash — UNIQUE + COUNTA

**Savol:** Bo'limlar ustunidagi (`B2:B6`) noyob bo'limlar sonini toping.
```excel
=COUNTA(UNIQUE(B2:B6))                              ' Excel 365 → 3 (IT, HR, Finance)
=SUMPRODUCT((B2:B6<>"")/COUNTIF(B2:B6,B2:B6))        ' eski versiyalar uchun
```

**Tegishli funksiyalar guruhi:** `UNIQUE()`, `FILTER()`, `SORT()`, `SEQUENCE()`, `TEXTSPLIT()` — dinamik massiv (Dynamic Array) funksiyalari, Microsoft 365'da murakkab formulalarni soddalashtiradi.

---

## 📌 6. Qidiruv — VLOOKUP vs INDEX+MATCH vs XLOOKUP

**Ma'lumot:** Employee ID | Employee Name | Department (101 John IT · 102 Sarah HR · 103 Mike Finance · 104 David Sales)

**Savol:** `103` ID'ga mos xodim ismini toping.
```excel
=XLOOKUP(103,A2:A5,B2:B5)                    ' → Mike, zamonaviy va tavsiya etiladigan usul
=INDEX(B2:B5,MATCH(103,A2:A5,0))             ' → eski versiyalar uchun universal
=VLOOKUP(103,A2:C5,2,FALSE)                  ' → klassik, faqat o'ngga qidiradi
```

**Nega `XLOOKUP`/`INDEX+MATCH` afzal:**
- Ikkala tomonga (chapga ham) qidira oladi, `VLOOKUP` faqat o'ngga.
- Ustun qo'shilib/o'chirilganda ustun raqamiga bog'liq emas (VLOOKUP'da qattiq `col_index_num` bor).
- `XLOOKUP`'da mos topilmasa maxsus xabar (`if_not_found` argumenti) qaytarish mumkin: `=XLOOKUP(101,A2:A10,B2:B10,"Not Found")`.
- `#N/A` xatosidan himoyalanish: `=IFERROR(VLOOKUP(A2,A:B,2,FALSE),"Not Found")`.

**Tegishli funksiyalar guruhi:** `XLOOKUP()`, `VLOOKUP()`, `HLOOKUP()`, `INDEX()+MATCH()`, `XMATCH()`.

---

## 📌 7. Stsenariy-asosidagi savollar / Scenario-Based Questions

**Stsenariy 1 — Bo'sh (missing) qiymatlarni qanday hal qilasiz?**
1. **Aniqlash:** Filtr yoki Shartli Formatlash bilan bo'sh kataklarni toping — `Home → Conditional Formatting → New Rule → Format only cells that are blank`.
2. **Hal qilish:**
   - Bo'shni matn bilan almashtirish: `=IF(A2="","N/A",A2)`
   - Oldingi qiymat bilan to'ldirish: `Ctrl+D` (Fill Down)
   - O'rtacha bilan to'ldirish: `=AVERAGEIF(range,"<>",range)`
3. **Katta hajmdagi ma'lumot uchun:** Power Query'ga yuklab, `Replace Values` yoki `Remove Empty` opsiyalaridan foydalaning.

**Stsenariy 2 — Bir nechta varaqdagi ma'lumotni qanday birlashtirasiz (consolidate)?**
- **Qo'lda:** Har bir varaqni asosiy (master) varaqqa copy-paste qiling, manba varaqni belgilovchi qo'shimcha ustun qo'shing.
- **Power Query (tavsiya etiladi):** `Data → Get & Transform → Get Data → From Workbook` → har bir varaqni yuklang → `Append Queries` bilan birlashtiring → tozalab qayta yuklang.
- **VBA (ilg'or foydalanuvchilar uchun):** Barcha varaqlarni siklda aylanib, master varaqqa qo'shib boruvchi makro yozing.

---

## 📌 8. Excel vs SQL vs Python (Pandas) — bir vazifaning uch tildagi yechimi

| Vazifa | Excel | SQL | Python (pandas) |
|---|---|---|---|
| Filtrlash | `=FILTER(A2:D100, B2:B100>50)` | `SELECT * FROM t WHERE col > 50;` | `df[df['col'] > 50]` |
| Saralash | `=SORT(A2:A100, 1, TRUE)` | `SELECT * FROM t ORDER BY col ASC;` | `df.sort_values(by="col")` |
| Qatorlarni sanash | `=COUNTA(A:A)` | `SELECT COUNT(*) FROM t;` | `len(df)` |
| Dublikatlarni olib tashlash | `Data → Remove Duplicates` | `SELECT DISTINCT * FROM t;` | `df.drop_duplicates()` |
| Jadvallarni birlashtirish | Power Query `Merge Queries` / `VLOOKUP`/`XLOOKUP` | `SELECT * FROM t1 JOIN t2 ON t1.id=t2.id` | `pd.merge(df1, df2, on="id")` |
| Reytinglash | `=RANK.EQ(A2, $A$2:$A$100)` | `RANK() OVER (ORDER BY col DESC)` | `df["col"].rank(method="min", ascending=False)` |
| Harakatlanuvchi o'rtacha | `=AVERAGE(B2:B4)` (qo'lda oyna) | `AVG(val) OVER (ORDER BY d ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)` | `df["val"].rolling(3).mean()` |
| Yig'ma jami (running total) | `=SUM($B$2:B2)` (pastga sudrab) | `SUM(val) OVER (ORDER BY d)` | `df["val"].cumsum()` |

> Bu jadval intervyularda "SQL bilasizmi, buni Excelda qanday qilasiz?" tipidagi savollarga tez javob berish uchun juda foydali — uchala vositada ham mantiq bir xil, sintaksis farqli.

---

## 📌 9. Katta hajmdagi ma'lumot bilan ishlash — Performance Tips

- **Avtomatik hisoblashni o'chirish:** `File → Options → Formulas → Calculation Options → Manual` — qayta hisoblashni qo'lda boshqarish katta faylni tezlashtiradi.
- **Volatile funksiyalardan ehtiyot bo'ling:** `NOW()`, `TODAY()`, `INDIRECT()`, `OFFSET()` har bir o'zgarishda qayta hisoblanadi — ularni kamroq ishlating.
- **Diapazon o'rniga jadval (Table, `Ctrl+T`) ishlating:** strukturaviy havolalar tezroq va o'qish uchun qulayroq.
- **Katta ma'lumotni bo'ling:** kerak bo'lsa bir nechta varaq/fayllarga taqsimlang.
- **Ortiqcha formatlashdan saqlaning:** haddan tashqari formatlash fayl hajmini oshirib, ishlashni sekinlashtiradi.

---

## 📌 10. Tipik xatolar (Common Mistakes) — Excel tahlilchilar ko'p qiladigan

- ❌ Formulalarda qattiq kodlangan (hard-coded) sonlar — buning o'rniga katak havolasi yoki Named Range ishlating.
- ❌ Birlashtirilgan kataklar (merged cells) — jadvalni buzadi, filtr/pivot ishlamay qoladi.
- ❌ Bitta ustunda aralash ma'lumot turlari (matn + son).
- ❌ Tozalashdan oldin zaxira (backup) olmaslik.
- ❌ Sarlavhasiz yoki noaniq ustun nomlari.
- ✅ O'rniga: aniq label'lar, xom ma'lumotni tahlil qismidan alohida saqlash, formulalarni hujjatlashtirish (izoh/komment).

---

## 📝 Amaliy vazifalar / Practice Tasks

1. Yuqoridagi xodimlar jadvali asosida `SUMIFS` bilan "HR bo'limi VA maoshi 60,000 dan katta" shartini yozing.
2. `MAXIFS`/`MINIFS` yordamida har bir bo'lim uchun eng yuqori va eng past maoshni bitta jadvalda chiqaring.
3. `LARGE`+`XLOOKUP` kombinatsiyasi bilan eng past 3 ta sotuv qiymatini va ularga mos xodim ismlarini toping (`SMALL` dan foydalaning).
4. `IFS` yordamida xizmat stajiga (`DATEDIF` natijasi) qarab xodimni "Junior" (<2 yil), "Mid" (2–5 yil), "Senior" (5+ yil) toifalarga ajrating.
5. Ikki xil varaqdagi (masalan `Sotuv_Yanvar`, `Sotuv_Fevral`) bir xil tuzilishdagi jadvallarni Power Query `Append Queries` orqali birlashtirib, oylik umumiy sotuvni `SUMIFS` bilan hisoblang.
6. Excel vs SQL vs Python jadvalidagi "Running Total" vazifasini o'zingizning ma'lumotlaringiz ustida uchala usulda ham sinab ko'ring va natijalarni solishtiring.

---

*Manba: @sqlspecialist Telegram kanali tahlili (2026-08-08 holatiga). Qarang: [telegram_kanal_tahlili.md](../telegram_kanal_tahlili.md), [excel/basics.md](basics.md), [spreadsheet/basics.md](../spreadsheet/basics.md)*
