# 🧪 Excel Makroslar (VBA) — Nazariy va Amaliy Savollar

> **Daraja / Level:** 🟢 Boshlang'ich → 🟡 O'rta → 🔴 Yuqori
> **Qo'llanma:** To'liq instruksiya uchun qarang → [macros_guide.md](./macros_guide.md)

---

## 📘 Nazariy savollar

### Asosiy tushunchalar

1. Makros (Macro) nima va u qanday vazifani bajaradi?
2. VBA (Visual Basic for Applications) nima va u Excel bilan qanday bog'liq?
3. `Record Macro` va qo'lda VBA kod yozishning farqi nimada? Har birining afzallik/kamchiliklari qanday?
4. Nima uchun makrosli faylni saqlashda `.xlsx` emas, `.xlsm` formatidan foydalanish kerak?
5. `Developer` menyusi standart holatda nega ko'rinmaydi va uni qanday yoqish mumkin?
6. Makroslarning xavfsizlik xatarlari nimalardan iborat? (`Macro Security Settings`, ishonchli manba tushunchasi)
7. `Personal Macro Workbook` nima va u qachon kerak bo'ladi?
8. `Alt + F8` va `Alt + F11` tugmalari nimaga xizmat qiladi — farqini tushuntiring.

### VBA kod tuzilishi

9. `Sub` va `Function` o'rtasidagi farq nima?
10. `Dim` operatori nima uchun ishlatiladi va o'zgaruvchi turlarini (`Integer`, `Long`, `String`, `Double`, `Range`) sanab bering.
11. `Cells(i, 6)` va `Range("F6")` — bu ikkisi bir xil katakka murojaat qiladimi? Qaysi holatda qaysi biri qulayroq?
12. `For...Next` tsikli qanday ishlaydi? `For i = 2 To 6` qatorini tushuntirib bering.
13. `If...ElseIf...End If` shart operatorining ishlash mantig'ini tushuntiring.
14. `.Interior.Color` va `RGB()` funksiyasi nima uchun kerak?
15. Makros ichida xatolikni qanday ushlash mumkin (`On Error Resume Next` / `On Error GoTo`)?
16. `Application.ScreenUpdating = False` nima uchun ishlatiladi va qachon foydali bo'ladi?
17. `Integer` va `Long` turlaridan qaysi birini katta qatorli jadvallarda ishlatish tavsiya etiladi? Nima uchun?
18. `Workbook_Open` hodisasi (event) nima va u qayerga yoziladi?

---

## 🛠️ Amaliy savollar (topshiriqlar)

### 🟢 Boshlang'ich daraja

1. `macros_guide.md`dagi jadval asosida `Record Macro` orqali `JadvalniFormatlash` nomli makros yarating (sarlavhani qalin+ko'k fon, D ustunini son formatiga o'tkazish, chegaralar qo'yish).
2. Yaratilgan makrosni `Alt + F8` orqali ishga tushiring va natijani tekshiring.
3. Xuddi shu makrosni VBA muharririda (`Alt + F11`) oching va yozilgan kodni o'qib, har bir qatorning nima qilayotganini izohlab (comment) yozing.

### 🟡 O'rta daraja

4. `E` ustunidagi (Sana) qiymatlarni `kun.oy.yil` formatidan `yil-oy-kun` formatiga o'tkazadigan makros yozing.
5. `D` ustunidagi (Sotuv summasi) qiymatlar yig'indisini hisoblab, `D7` katagiga avtomatik yozadigan makros yozing.
6. Shakl (Shape) yarating va unga jadvalni **tozalash** (formatlarni bekor qilish) uchun alohida makros biriktiring.
7. Foydalanuvchidan `InputBox` orqali bo'lim nomini (masalan, "IT") so'rab, faqat shu bo'limga tegishli qatorlarni sariq rangga bo'yaydigan makros yozing.

### 🔴 Yuqori daraja

8. `HolatniBoyash` makrosini qatorlar sonidan qat'i nazar ishlaydigan qilib o'zgartiring (`Cells(Rows.Count, 1).End(xlUp).Row` yordamida oxirgi qatorni avtomatik aniqlash).
9. Har bir xodimning "Bajarildi" holatidagi savdolar yig'indisini `Bo'lim` bo'yicha guruhlab, alohida jadvalga (masalan `Sheet2`) chiqaradigan makros yozing.
10. `MsgBox` yordamida, agar biror qatorda `D` ustunidagi summa 0 yoki bo'sh bo'lsa, foydalanuvchiga ogohlantirish chiqaradigan tekshiruv qo'shing.
11. Makrosni tugma bosilganda emas, balki **fayl ochilganda** (`Workbook_Open` hodisasi) avtomatik ishga tushadigan qilib o'zgartiring.
12. Xato yuz berganda (masalan bo'sh katak topilsa) dastur to'xtab qolmasligi uchun `On Error` bilan xatolikni boshqarishni qo'shing.

---

## ✅ Javoblar uchun eslatma

Har bir amaliy topshiriqning tayyor VBA kod namunalari [macros_guide.md](./macros_guide.md) faylining 4- va 5-qadamlarida keltirilgan — avval o'zingiz yechishga urinib ko'ring, keyin solishtiring.
