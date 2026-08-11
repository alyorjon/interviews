# 🤖 Excel Makroslar (VBA) — To'liq Instruksiya / Complete Macro Guide

> **Maqsad / Goal:** Excelda makros (VBA) yozishni noldan o'rganish uchun bosqichma-bosqich qo'llanma / Step-by-step guide to learn Excel macros (VBA) from scratch
> **Daraja / Level:** 🟢 Boshlang'ich → 🟡 O'rta → 🔴 Yuqori

---

## 0-qadam: Tayyorgarlik / Setup

| Amal / Action | Qanday qilish / How |
|---|---|
| **Developer** menyusini yoqish | `File > Options > Customize Ribbon` → o'ng ustunda `Developer` katagini belgilang → `OK` |
| Faylni to'g'ri formatda saqlash | `File > Save As` → Fayl turi (`Save as type`) sifatida **Excel Macro-Enabled Workbook (*.xlsm)** ni tanlang |
| Makros xavfsizligi | `Developer > Macro Security` → o'z fayllaringiz uchun `Disable all macros with notification` tavsiya etiladi |
| VBA muharririni ochish | `Alt + F11` |
| Makroslar ro'yxatini ochish | `Alt + F8` |

---

## 1-qadam: Soxta ma'lumotlar jadvali / Practice data

Yangi varaq oching, `A1:F6` kataklariga quyidagini kiriting:

| A (ID) | B (Xodim Ismi) | C (Bo'lim) | D (Sotuv Som) | E (Sana) | F (Holat) |
|---|---|---|---|---|---|
| 101 | Anvar Aliyev | IT | 15500000 | 05.01.2026 | Bajarildi |
| 102 | Malika Rixsiyeva | HR | 8200000 | 12.01.2026 | Jarayonda |
| 103 | Jasur Karimov | Sales | 23000000 | 15.01.2026 | Bajarildi |
| 104 | Nigora Umarova | IT | 19100000 | 18.01.2026 | Bajarildi |
| 105 | Sardor Rahimov | Sales | 9500000 | 22.01.2026 | Bekor qilindi |

---

## 2-qadam: Makrosni yozib olish (Record Macro) 🟢

> Kod yozmasdan, sichqoncha bilan amal qilib makros yaratish usuli.

1. `Developer > Record Macro` bosing.
2. Nom: `JadvalniFormatlash`, joylashuv: `This Workbook` → `OK`.
3. Quyidagi amallarni ketma-ket bajaring (Excel har bir amalni avtomatik kodga yozadi):
   - `A1:F1` ni belgilang → **Bold**, fon rangi **ko'k**, matn rangi **oq**.
   - `D2:D6` ni belgilang → `Format Cells > Number` → probel bilan ajratiladigan format (`# ##0`).
   - `A1:F6` ni belgilang → `Borders > All Borders`.
4. `Developer > Stop Recording` bosing.
5. Formatni o'chirib, `Alt + F8` → `JadvalniFormatlash` → `Run` bilan sinab ko'ring.
6. **O'rganish uchun:** `Alt + F11` orqali yozilgan kodni ochib o'qing — Excel qanday VBA sintaksisi generatsiya qilganini ko'rasiz.

---

## 3-qadam: Tugma yaratib makros biriktirish 🟡

1. `Insert > Shapes` → to'rtburchak chizing.
2. Shakl ustiga ikki marta bosib matn yozing: `"Formatlash"`.
3. Shakl ustida o'ng tugma → `Assign Macro...` → `JadvalniFormatlash` → `OK`.
4. Endi format o'chirilsa ham, tugmani bosish bilan jadval qayta formatlanadi.

> 💡 Xuddi shu tarzda tugmalarga istalgan boshqa makrosni ham (masalan, quyidagi 4-qadamdagi kodni) biriktirish mumkin.

---

## 4-qadam: VBA kodni qo'lda yozish 🔴

1. `Alt + F11` → `Insert > Module`.
2. Quyidagi kodni joylashtiring:

```vba
Sub HolatniBoyash()
    Dim i As Integer

    ' 2-satrdan 6-satrgacha bitta-bitta tekshirib chiqadi
    For i = 2 To 6
        If Cells(i, 6).Value = "Bajarildi" Then
            Cells(i, 6).Interior.Color = RGB(200, 255, 200) ' Och yashil
        ElseIf Cells(i, 6).Value = "Bekor qilindi" Then
            Cells(i, 6).Interior.Color = RGB(255, 200, 200) ' Och qizil
        End If
    Next i
End Sub
```

3. `Alt + Q` bilan VBA oynasini yoping.
4. `Alt + F8` → `HolatniBoyash` → `Run`.

### Kod tuzilishini tushunish / Understanding the code

| Qism / Part | Vazifasi / Purpose |
|---|---|
| `Sub ... End Sub` | Makrosni (protsedurani) belgilaydi — natija qaytarmaydi, faqat amal bajaradi |
| `Dim i As Integer` | `i` nomli butun son turidagi o'zgaruvchi e'lon qilinadi |
| `For i = 2 To 6 ... Next i` | 2-qatordan 6-qatorgacha tsikl bo'ylab yuradi |
| `Cells(i, 6)` | `i`-qator, 6-ustun (F) katagiga murojaat — `Range("F" & i)` bilan bir xil natija beradi |
| `If ... ElseIf ... End If` | Shartga qarab turli amal bajaradi |
| `.Interior.Color = RGB(...)` | Katak fon rangini o'rnatadi |

---

## 5-qadam: Kengaytirilgan texnikalar / Advanced techniques

### a) Oxirgi qatorni avtomatik aniqlash (statik `6` o'rniga)

```vba
Sub HolatniBoyashDinamik()
    Dim i As Long
    Dim oxirgiQator As Long
    oxirgiQator = Cells(Rows.Count, 1).End(xlUp).Row

    For i = 2 To oxirgiQator
        If Cells(i, 6).Value = "Bajarildi" Then
            Cells(i, 6).Interior.Color = RGB(200, 255, 200)
        ElseIf Cells(i, 6).Value = "Bekor qilindi" Then
            Cells(i, 6).Interior.Color = RGB(255, 200, 200)
        End If
    Next i
End Sub
```
> `Rows.Count` — varaqdagi maksimal qator soni (odatda 1 048 576). `.End(xlUp)` esa eng pastki to'ldirilgan katakdan yuqoriga qarab birinchi bo'sh bo'lmagan katakni topadi (`Ctrl + Yuqoriga strelka` bilan bir xil).

### b) Foydalanuvchidan ma'lumot so'rash (`InputBox`)

```vba
Sub BolimBoyicha()
    Dim bolim As String
    bolim = InputBox("Qaysi bo'limni bo'yashni xohlaysiz?", "Bo'lim tanlang")

    Dim i As Long
    For i = 2 To Cells(Rows.Count, 1).End(xlUp).Row
        If Cells(i, 3).Value = bolim Then
            Cells(i, 3).Interior.Color = RGB(255, 255, 150) ' sariq
        End If
    Next i
End Sub
```

### c) Xatolikni boshqarish (`On Error`)

```vba
Sub XavfsizYigindi()
    On Error GoTo XatoBor

    Dim jami As Double
    jami = Application.WorksheetFunction.Sum(Range("D2:D6"))
    MsgBox "Jami summa: " & jami

    Exit Sub
XatoBor:
    MsgBox "Xatolik yuz berdi: " & Err.Description
End Sub
```

### d) Ekran yangilanishini o'chirish (tezlik uchun)

```vba
Sub TezIshlaydigan()
    Application.ScreenUpdating = False
    ' ... ko'p miqdordagi amal ...
    Application.ScreenUpdating = True
End Sub
```

### e) Fayl ochilganda avtomatik ishga tushirish

`Alt + F11` → chap tomonda `ThisWorkbook` ustiga ikki marta bosing va quyidagini yozing:

```vba
Private Sub Workbook_Open()
    Call JadvalniFormatlash
End Sub
```

---

## 6-qadam: VBA sintaksisining qolgan muhim qismlari / Further VBA syntax

> `Sub`, `Range`/`Cells`, `Dim`, `If` va `For` — bu VBA'ning tayanch poydevori (70-80% holatlarda ishlatiladi). Quyida qolgan muhim konstruksiyalar keltirilgan.

### a) Funksiyalar yaratish (`Function`)

`Sub` — shunchaki harakatni bajaradi (natija qaytarmaydi). `Function` esa — Excel'dagi `SUM` yoki `VLOOKUP` kabi **o'zingizning shaxsiy formulangizni** yaratish uchun ishlatiladi va natija qaytaradi.

```vba
' Ishchining daromad solig'ini (12%) hisoblaydigan yangi formula
Function SoliqHisobla(maosh As Double) As Double
    SoliqHisobla = maosh * 0.12
End Function
```

*Ishlatilishi:* Excel varag'iga o'tib, ixtiyoriy katakka `=SoliqHisobla(D2)` deb yozishingiz mumkin.

### b) Boshqa turdagi sikllar (Loops)

**`Do While` sikli** — shart bajarilayotgan paytgacha (masalan, bo'sh katakka kelgunicha) takrorlaydi:

```vba
Sub BoshKatakgachaOqish()
    Dim i As Integer
    i = 2

    ' A ustundagi katak bo'sh bo'lmaguncha davom etadi
    Do While Cells(i, 1).Value <> ""
        ' Amal bajariladi
        i = i + 1 ' Keyingi satrga o'tish
    Loop
End Sub
```

**`For Each...Next` sikli** — belgilangan barcha obyektlarni (masalan kataklarni) birma-bir aylanib chiqadi:

```vba
Sub BelgilanganKataklarniSariqQilish()
    Dim katak As Range

    ' Sichqoncha bilan belgilangan (Selection) har bir katak uchun
    For Each katak In Selection
        katak.Interior.Color = RGB(255, 255, 0)
    Next katak
End Sub
```

### c) Tanlov strukturasi (`Select Case`)

Bir nechta `If...ElseIf...ElseIf` yozish o'rniga kodni ozoda va tushunarli qiladi:

```vba
Sub BolimgaQarabFormatlash()
    Dim bolim As String
    bolim = Range("C2").Value

    Select Case bolim
        Case "IT"
            Range("C2").Interior.Color = RGB(173, 216, 230) ' Och ko'k
        Case "Sales"
            Range("C2").Interior.Color = RGB(144, 238, 144) ' Och yashil
        Case "HR"
            Range("C2").Interior.Color = RGB(255, 182, 193) ' Och pushti
        Case Else
            Range("C2").Interior.Color = RGB(220, 220, 220) ' Kulrang
    End Select
End Sub
```

### d) Boshqa ishchi varaqlar (Worksheets) va fayllar bilan ishlash

Faqat faol varaqda emas, boshqa sahifa yoki boshqa Excel fayliga murojaat qilish mumkin:

```vba
Sub SahifalarBilanIshlash()
    ' "Sheet2" nomli sahifadagi A1 katakka yozish
    Worksheets("Sheet2").Range("A1").Value = "Natija"

    ' Yangi sahifa qo'shish
    Worksheets.Add
End Sub
```

### e) `With...End With` bloki (kodni qisqartirish va tezlashtirish)

Bir xil obyektga qayta-qayta murojaat qilmaslik uchun ishlatiladi.

Uzun usul (noqulay):

```vba
Range("A1").Font.Bold = True
Range("A1").Font.Size = 14
Range("A1").Font.Color = RGB(255, 0, 0)
```

`With` bilan qisqa va toza usul:

```vba
With Range("A1").Font
    .Bold = True
    .Size = 14
    .Color = RGB(255, 0, 0)
End With
```

### f) Muloqot oynalari (`MsgBox` va `InputBox`)

`MsgBox` — foydalanuvchiga xabar chiqaradi:

```vba
MsgBox "Jarayon muvaffaqiyatli yakunlandi!", vbInformation, "Ma'lumot"
```

`InputBox` — foydalanuvchidan ma'lumot so'rab oladi:

```vba
Dim ism As String
ism = InputBox("Ismingizni kiriting:", "Tanishuv")
Range("A1").Value = ism
```

### g) Hodisalar (Events) — avtomatik ishga tushuvchi kodlar

Tugmani bosmasdan ham, **Excel'da biror amal bajarilganda** (fayl ochilganda, katak qiymati o'zgarganda, saqlanayotganda) avtomatik ishlaydigan makroslar. Bunday kod `ThisWorkbook` moduliga yoziladi:

```vba
Private Sub Workbook_Open()
    MsgBox "Excel fayliga xush kelibsiz!", vbInformation
End Sub
```

> 💡 Bularning barchasini bir kunda yodlash shart emas — tayanch poydevor (`Sub`, `Range`/`Cells`, `Dim`, `If`, `For`) yetarli. Murakkabroq topshiriqlar duch kelganda `Do While`, `Select Case`, `With`, `MsgBox` kabi konstruksiyalarni sekin-asta amaliyotga qo'shib borasiz.

---

## 6a-qadam: Qo'shimcha amaliy vazifalar / Extra practice tasks

### Vazifa A: Kataklarni to'ldirish va formatlash 🟢

**Topshiriq:** `A1` katakka "Xodimlar Ro'yxati" deb yozing, shriftini qalin (Bold) va o'lchamini 14 qiling. `A1` katak fonini och ko'k rangga o'zgartiring.

```vba
Sub VazifaA_Formatlash()
    ' A1 katakka matn yozish
    Range("A1").Value = "Xodimlar Ro'yxati"

    ' Shrift xususiyatlarini o'zgartirish
    Range("A1").Font.Size = 14
    Range("A1").Font.Bold = True

    ' Katak foniga rang berish (RGB: Red, Green, Blue)
    Range("A1").Interior.Color = RGB(173, 216, 230)
End Sub
```

### Vazifa B: Shartli mantiq (`If...Then...Else`) 🟡

**Topshiriq:** `D2` katakdagi sotuv summasini o'qing. Agar summa 15 000 000 dan ko'p bo'lsa, `E2` katakka "Bonus" deb yozib, matnni yashil qiling. Aks holda "Oddiy" deb yozib, matnni qizil qiling.

```vba
Sub VazifaB_ShartTekshirish()
    Dim sotuvSummasi As Double

    ' D2 katakdagi qiymatni o'zgaruvchiga olish
    sotuvSummasi = Range("D2").Value

    ' Shart tekshirish
    If sotuvSummasi >= 15000000 Then
        Range("E2").Value = "Bonus"
        Range("E2").Font.Color = RGB(0, 150, 0) ' Yashil rang
    Else
        Range("E2").Value = "Oddiy"
        Range("E2").Font.Color = RGB(255, 0, 0) ' Qizil rang
    End If
End Sub
```

### Vazifa C: Sikl bilan ishlash (`For...Next`) 🔴

**Topshiriq:** 2-qatordan 10-qatorgacha bo'lgan barcha sotuvlarni (`D` ustuni) sikl orqali tekshirib chiqing. Sotuv 20 000 000 dan yuqori bo'lsa, `F` ustuniga "Yuqori", 10 000 000 va 20 000 000 orasida bo'lsa "O'rta", 10 000 000 dan kam bo'lsa "Past" deb yozing.

```vba
Sub VazifaC_SiklBilanTahlil()
    Dim i As Integer
    Dim summa As Double

    ' 2-qatordan 10-qatorgacha bitta-bitta o'tish
    For i = 2 To 10
        summa = Cells(i, 4).Value ' i-qator, 4-ustun (D ustuni)

        If summa >= 20000000 Then
            Cells(i, 6).Value = "Yuqori" ' F ustuniga yozish
            Cells(i, 6).Interior.Color = RGB(200, 255, 200)
        ElseIf summa >= 10000000 Then
            Cells(i, 6).Value = "O'rta"
            Cells(i, 6).Interior.Color = RGB(255, 255, 200)
        Else
            Cells(i, 6).Value = "Past"
            Cells(i, 6).Interior.Color = RGB(255, 200, 200)
        End If
    Next i
End Sub
```

**Kodni sinab ko'rish tartibi:**

1. Excel'da `Alt + F11` bosing.
2. Menyudan `Insert > Module` ni tanlang.
3. Yuqoridagi kodlardan birini joylashtiring.
4. Kod ichida kursor turgan holatda klaviaturadagi `F5` tugmasini bosing yoki tepadagi ▶ (`Run`) tugmasini bosing.

---

## 7-qadam: Amaliyot uchun tavsiyalar / Practice tips

- Har bir yangi makrosni **alohida `Sub`** ichida yozing — bitta katta kod o'rniga bir nechta kichik, aniq vazifali makroslar yozish debugging'ni osonlashtiradi.
- `F8` tugmasi VBA muharririda kodni **qadam-baqadam** (`Step Into`) ishga tushirishga yordam beradi — xatoni topishda juda foydali.
- `Debug.Print` yordamida `Immediate Window` (`Ctrl + G`) ga qiymatlarni chiqarib, o'zgaruvchilarni tekshiring.
- Ishlab chiqilgan makroslarni **shaxsiy makroslar kitobi**ga (`Personal Macro Workbook`) saqlasangiz, ular barcha Excel fayllarida ishlaydi (`Record Macro` oynasida `Store macro in: Personal Macro Workbook`ni tanlang).

---

## Qo'shimcha / Related

Nazariy va amaliy savollar to'plami: [macros_quiz.md](./macros_quiz.md)
