## Kontekst

Turli Markdown formatlaridan olingan savollar takrorlanadi, lekin faqat matni o'xshash bo'lgan savollar boshqa ma'noga ega bo'lishi mumkin.

## Qaror

Apostrof, Unicode va kod formatini normalizatsiya qilgan fingerprint faqat aniq teng savollarni bitta kanonik kartaga birlashtiradi; barcha manbalar alias sifatida saqlanadi. Noaniq o'xshashliklar avtomatik o'chirilmaydi, auditga chiqariladi.

## Nega

Har savolni alohida qoldirish rad etildi, chunki takrorlash sessiyasini dublikatlar bilan ifloslantiradi. Fuzzy o'xshashlik bo'yicha avtomatik birlashtirish ham rad etildi, chunki leksik jihatdan yaqin, ammo mazmunan boshqa savollarni yo'qotishi mumkin.

## Oqibatlar

Sessiyada aniq dublikat bitta marta ko'rinadi va uning provenance'i yo'qolmaydi. Yaqin dublikatlar inson ko'rigi uchun qoladi; fingerprint qoidasi o'zgarsa kanonik identifikatsiya va progress mosligi qayta baholanishi kerak.

> **Holat:** ADR-0008 bilan to'ldirildi (2026-09-25): token to'plami aynan teng savollar ham birlashtiriladi.
