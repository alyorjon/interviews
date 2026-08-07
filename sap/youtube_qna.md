# SAP — YouTube Intervyu Savol-Javoblari

> YouTube'dan olingan SAP B1 (Business One), SAP BO (BusinessObjects) va umumiy SAP modullari (FI/CO/MM/SD/PP/HCM) bo'yicha intervyu savollari va ularga to'liq javoblar. Video ichidagi vaqt belgilari (timestamp) saqlangan.

---

## 1-qism — SAP Business One (B1)

**1. SAP Business One nima va uning maqsadi nima?** (0:11)
SAP Business One — kichik va o'rta biznes (SME) uchun mo'ljallangan yagona (integratsiyalashgan) ERP tizimi. Maqsadi: moliya, sotuv, xarid, inventar, ishlab chiqarish, CRM, hisobotlar kabi barcha biznes jarayonlarini bitta ma'lumotlar bazasida birlashtirib, real vaqtda boshqarish. Yirik SAP ECC/S4HANA'dan farqli o'laroq, u yengil, tez o'rnatiladigan va arzonroq yechim.

**2. Business One tizimida ma'lumotlar oqimi (data flow) qanday?** (0:56)
Foydalanuvchi UI (masalan, Sotuv buyurtmasi) orqali kiritilgan ma'lumot → SAP B1 ilova qatlami (Business Layer / DI API orqali validatsiya) → to'g'ridan-to'g'ri SAP HANA yoki SQL Server ma'lumotlar bazasiga yoziladi. Hujjatlar zanjiri bo'yicha (Sotuv buyurtmasi → Yetkazib berish → Hisob-faktura) ma'lumot avtomatik keyingi hujjatlarga ko'chiriladi, moliyaviy jurnal yozuvlari (GL entries) avtomatik yaratiladi.

**3. ODS (Operational Data Store) nima?** (2:13)
*(SAP BW tushunchasi, B1 emas.)* ODS — SAP BW arxitekturasida xom, tranzaksiya darajasidagi ma'lumotlarni saqlaydigan qatlam. Ma'lumotlarni tozalash, konsolidatsiya qilish va InfoCube/DSO'larga yuklashdan oldingi oraliq bosqich. Yangi versiyalarda **DSO (DataStore Object)** deb ataladi.

**4. BW tizimidagi o'lcham (dimension) nima va uni qanday optimallashtirasiz?** (3:13)
*(SAP BW tushunchasi.)* Dimension — InfoCube ichida bog'liq xarakteristikalarni guruhlaydigan jadval, fakt jadvaliga tashqi kalit orqali bog'lanadi. Optimallashtirish: yuqori kardinallikka ega xarakteristikalarni "line item dimension" qilish, kam sonli xarakteristikalarni birlashtirish, keraksizlarini chiqarib tashlash.

**5. Boshliq va lider o'rtasidagi farq nima?** (4:13)
Boshliq — rasmiy vakolat orqali jarayon/resurslarni boshqaradi, nazoratga urg'u beradi. Lider — insonlarni ilhomlantirib, ishonch va vizyon orqali ta'sir qiladi, rasmiy unvonga muhtoj emas.

**6. Lider unvoniga ega bo'lmagan holda yetakchilik qilgan vaziyat** (5:24)
STAR (Situation, Task, Action, Result) metodida javob berish kerak — shaxsiy real tajribadan misol tayyorlab qo'yish tavsiya etiladi.

**7. Multi-provider nima va xususiyatlari?** (8:45)
*(SAP BW tushunchasi.)* MultiProvider — bir nechta InfoProvider'larni birlashtirib, yagona so'rov yuritish imkonini beruvchi virtual obyekt. Fizik jamlamaydi, union operatsiyasi orqali ishlaydi.

**8. Process chain uchun tranzaksiya kodlari** (9:34)
*(SAP BW.)* **RSPC** — yaratish/tahrirlash/monitoring; **RSPC1** — display rejimi; **RSPCM** — kengaytirilgan monitoring.

**9. SDK yordamida standart xatti-harakatni o'zgartirish mumkinmi?** (10:46)
Ha. SAP B1 SDK: **DI API** (server, biznes obyektlar bilan CRUD) va **UI API** (client darajasida forma/menyu/maydon o'zgartirish, add-on yaratish).

**10. Company object nima uchun ishlatiladi?** (11:31)
DI API'da `Company` — ma'lumotlar bazasiga ulanishni ta'minlaydigan asosiy obyekt (`Connect()` metodi). Boshqa biznes obyektlarini yaratishdan oldin ulanish shart.

**11. Bubble event nima?** (12:06)
UI API'da hodisa kichik elementdan (masalan, matrix qatoridagi maydon) boshlanib, yuqoriroq obyektlarga (item → matrix → form) "ko'tarilib" tarqalishi. `BubbleEvent = false` bilan to'xtatish mumkin.

---

## 2-qism — SAP BusinessObjects (BO/BOBJ)

**1. SAP BO nima va u nima uchun ishlatiladi?**
Korxona darajasidagi BI platformasi — turli manbalardan ma'lumot yig'ib, hisobot/dashboard/ad-hoc tahlil yaratadi.

**2. Arxitekturaning asosiy qismlari (4 qatlam)**
- **Client Tier** — Webi Rich Client, Crystal Reports Designer, BI Launch Pad
- **Application Tier** — Web Application Server (Tomcat/IIS), CMS
- **Intelligence Tier** — xavfsizlik, rejalashtirish, auditing xizmatlari
- **Data Tier** — CMS repository DB + asl manba tizimlari

**3. Asosiy komponentlar**
Web Intelligence (Webi), Crystal Reports, Universe Designer (UDT/IDT), Dashboards, CMC/CMS.

**4. Universe nima?**
Ma'lumotlar bazasi va foydalanuvchi o'rtasidagi semantik qatlam — SQL bilmasa ham obyektlarni sudrab-tashlab so'rov qurish imkonini beradi.

**5. UDT va IDT farqi**
UDT (Universe Design Tool) — eski `.unv` format, bitta manbaga bog'langan. IDT (Information Design Tool) — yangi `.unx` format, **multi-source universe** yaratishga imkon beradi (BO 4.x).

**6. Webi da qanday hisobotlar yaratiladi?**
Interaktiv, self-service, ad-hoc hisobotlar; KPI panellari, savdo tahlillari.

**7. Ishlash samaradorligini oshirish**
Keraksiz ustunlarni olib tashlash, filtrlar bilan cheklash, off-peak vaqtda rejalashtirish, **aggregate awareness**, `@Prompt` bilan majburiy filtr, keraksiz subquery'lardan qochish.

**8. Input controls**
Webi hisobotidagi interaktiv filtrlar (dropdown, checkbox, slider) — qayta so'rov yubormasdan (local processing) ma'lumotni filtrlaydi.

**9. Context va Alias**
- **Context** — bir nechta join yo'li (loop) bo'lganda aniq bitta yo'lni belgilash
- **Alias** — bitta jadvalni ikki marta, turli rol sifatida ishlatish (masalan "Employee" va "Manager")

**10. Fan trap nima va qanday yechiladi?**
Bitta jadvaldan ikkita "one-to-many" bog'lanish chiqqanda (masalan Mijoz→Buyurtmalar va Mijoz→To'lovlar) agregatsiya noto'g'ri, shishib ketgan natija beradi. Yechim: context yoki alias/derived table.

**11. Connection turlari**
Personal (mahalliy, `.bouser`), Shared (tarmoq, markazlashmagan, `.bosr`), Secured (CMS repositoriyasida, eng xavfsiz, korporativ standart).

**12. Scheduling**
CMC orqali takrorlanuvchi jadval, natija PDF/Excel/CSV formatida email/FTP'ga avtomatik yuboriladi (BI Launch Pad'dagi Instance sifatida saqlanadi).

**13. Security Profiles**
CMC'da guruh/foydalanuvchi darajasida universe obyektlariga (ustun/satr) kirish huquqini cheklaydi.

**14. Derived tables**
Universe darajasida yozilgan SQL so'rovlariga asoslangan virtual jadvallar — performance va murakkab hisoblash uchun.

**15. Row level security**
**Restriction Set** (universe) yoki **Data Security Profile** (BO 4.x) orqali WHERE shartiga foydalanuvchi login/hudud/bo'limiga qarab avtomatik filtr qo'shiladi.

**16. BO Repository maqsadi**
CMS Repository — **System database** (metadata: foydalanuvchi, guruh, ruxsat, kontent manzillari) + **Audit database** (harakatlar tarixi). Zaxira (backup) juda muhim.

**17. Life Cycle Manager (LCM)**
BO kontentini (universe, hisobot, ulanish) muhitlar o'rtasida (Dev→QA→Prod) versiyalangan tarzda ko'chirish vositasi, **BIAR fayllar** orqali eksport/import qiladi.

**18. Foydalanuvchi xavfsizligini boshqarish**
CMS orqali: Users/Groups, Access Levels (View/Schedule/Full Control), Folder/Object rights (inheritance), Authentication (Enterprise, LDAP, AD, SSO).

**19. Ma'lumotlar mos kelmasligini tekshirish**
1) Webi'dagi SQL'ni ko'rish va DB'da to'g'ridan-to'g'ri solishtirish; 2) universe join/filtrlarni tekshirish; 3) fan trap/chasm trap bor-yo'qligini aniqlash; 4) manba tizimidagi refresh/ETL jadvalini tekshirish.

---

## 3-qism — SAP Modullari (FI, CO, MM, SD, PP, HCM)

**1. Asosiy modullar**
FI (moliya), CO (nazorat), MM (materiallar boshqaruvi), SD (sotuv va taqsimot), PP (ishlab chiqarishni rejalashtirish), HCM (inson resurslari). S/4HANA'da "Line of Business" konsepsiyasi ostida birlashtirilgan.

**2. FI va CO farqi**
FI — tashqi auditor/soliq/aksiyadorlar uchun rasmiy (GAAP/IFRS) hisobot (Bosh kitob, Debitor/Kreditor, Aktivlar). CO — ichki boshqaruv qarorlari uchun (xarajat/foyda markazlari, tannarx), qonunchilikka bog'liq emas.

**3. MM va FI integratsiyasi**
Tovar qabul qilinganda (GR, MIGO) MM avtomatik FI hujjat yaratadi — **Automatic Account Determination (OBYC)** orqali sozlanadi.

**4. SD integratsiyasi (Order-to-Cash)**
SD (sotuv buyurtmasi) → MM/WM (yetkazib berish, zaxira kamayishi) → FI (hisob-faktura, daromad/debitor).

**5. SAP PP vazifasi**
Ishlab chiqarishni rejalashtirish/kuzatish. Obyektlar: **BOM** (mahsulot tarkibi), **Routing** (bosqichlar), **Work Center** (resurslar), **Production Order**. MRP orqali avtomatik xarid/ishlab chiqarish takliflari.

**6. SAP HCM roli**
Xodimlar, ish haqi, ish faoliyati. Sub-modullar: PA, OM, Payroll, Time Management. Zamonaviyda **SuccessFactors** bilan almashtirilmoqda.

**7. Ma'lumotlar barqarorligi**
"Single source of truth" — bitta ma'lumot bir joyda kiritiladi, barcha modullarda real vaqtda avtomatik ishlatiladi.

**8. Biznes jarayonlar**
**Order-to-Cash (O2C)** — SD, MM, FI birlashadi. **Procure-to-Pay (P2P)** — xarid so'rovi → PO → qabul qilish → hisob-faktura tekshirish → to'lov.

**9. Master ma'lumotlar**
Customer Master, Vendor Master, Material Master, GL Account Master — modullararo umumiy, bir marta yaratiladi.

**10. CO ning qaror qabul qilishdagi o'rni**
Cost Center Accounting, Profit Center Accounting, Internal Orders, Product Costing — byudjet va rentabellik boshqaruviga yordam beradi.

**11. MM tranzaksiyalari**
**ME21N** — Xarid buyurtmasi (Purchase Order) yaratish *(eslatma: video "MI21" degan — bu xato, to'g'risi ME21N; MI21 aslida fizik inventarizatsiya tranzaksiyasi)*. **MIGO** — Tovarlar harakati. **MIRO** — Hisob-faktura tekshirish.

**12. SD narxlash tartibi (Pricing Procedure)**
Condition Type (narx/chegirma/soliq), Access Sequence, Condition Table — ketma-ket ishlab yakuniy narxni hisoblaydi. **Sales Area** (Sales Org+Distribution Channel+Division)ga bog'liq.

**13. FI tashkiliy tuzilmasi**
Client → Company Code → Business Area/Profit Center → Chart of Accounts.

**14. PP ishlab chiqarish buyurtmalari**
Production Order — material, resurs, muddat, xarajatlarni rejalashtiradi/nazorat qiladi; Goods Receipt orqali tayyor mahsulot zaxiraga kiradi, reja vs haqiqiy xarajat (variance) solishtiriladi.

**15. Hisobot vositalari**
Standart hisobotlar, Report Painter/Writer, SAP Query, SAP Fiori, SAP Analytics Cloud (SAC).

---

## 4-qism — Xulq-atvor (Behavioral) intervyu savollari

> Bu savollar shaxsiy tajribaga asoslangan — faqat andoza (template) keltirilgan, har biriga o'zingizning real misolingizni moslashtiring.

**1. O'zingiz haqingizda gapirib bering (90 soniya)**
3 qismli tuzilma: *Hozir* (joriy lavozim/vazifa) → *O'tmish* (tajriba/yutuq) → *Kelajak* (aniq maqsad, nima uchun bu lavozim).

**2. Nima uchun aynan shu ishga kirmoqchisiz?**
Ko'nikma ↔ lavozim ehtiyoji bog'lanishi + kompaniya haqida aniq fakt + qadriyatlar mosligi. Oldindan tadqiqot qiling.

**3. Kuchli tomonlaringiz**
Formula: kuchli tomon + konkret misol + o'lchanadigan natija.

**4. Zaif tomonlaringiz**
Haqiqiy, lekin lavozim uchun halokatli bo'lmagan zaiflik + uni yaxshilash uchun qilinayotgan ish. Klişe javoblardan saqlaning.

**5. Qiyin vaziyatlarga oid savollar — STAR usuli**
Situation → Task → Action (eng batafsil qism) → Result (raqamlar bilan). Oldindan 2-3 ta real vaziyat tayyorlab qo'ying.

**6. Nima uchun sizni ishga olishimiz kerak?**
Formula: kompaniya ehtiyoji + sizning yechimingiz + sizni farqlantiruvchi o'ziga xos qiymat.
