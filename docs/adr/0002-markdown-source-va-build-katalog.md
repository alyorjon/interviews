## Kontekst

Mavjud 47 ta Markdown sahifa saqlanishi, o'qish uchun ko'rinishi va savol kartalariga aylantirilishi kerak; qo'lda qayta ko'chirish kontent driftini keltirib chiqaradi.

## Qaror

Markdown fayllar kontentning yagona manbasi bo'lib qoladi va build vaqtida typed JSON katalogga aylantiriladi. Boyitish faqat manbadagi dalildan deterministik hosil qilinadi, dalil yetmasa bu ochiq belgilanadi.

## Nega

Kontentni CMS yoki ma'lumotlar bazasiga ko'chirish rad etildi, chunki yangi tahrirlash mahsuloti va migratsiya manbai paydo bo'ladi. Jonli LLM orqali qayta yozish ham rad etildi: credential talab qiladi, natijasi takrorlanmaydi va manbada yo'q fakt qo'shishi mumkin.

## Oqibatlar

Manba va hosila orasidagi bog'lanish tekshiriladigan bo'ladi, katalog esa API va UI uchun stabil chegara beradi. Har parser yoki katalog schema o'zgarishi barcha iste'molchilarga ta'sir qiladi; tashqi bilimni qo'shish uchun avval Markdown manbani boyitish kerak.
