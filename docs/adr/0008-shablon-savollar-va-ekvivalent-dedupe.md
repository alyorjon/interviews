## Kontekst

Audit "deyarli dublikat" ro'yxatida 4015 juft ko'rsatdi. Ularning 4008 tasi to'rtta faylda (AI engineering, Odoo developer, Odoo functional, JS backend) shablon bilan yaratilgan 360 ta savoldan kelib chiqqan: "…Rule #11", "…Case #57" — mazmunsiz matn va bir xil kod. Qolganlari bir savolning so'z yoki til tartibi almashgan nusxalari edi ("What is Docker? | Docker nima?" va "Docker nima? / What is Docker?").

## Qaror

Shablon savollar manbadan o'chirildi va regressiya testi qo'shildi: raqamidan boshqa farqi bo'lmagan 5+ savol bo'lsa test yiqiladi. Aniq fingerprint dedupe'dan keyin normallashtirilgan token to'plami **aynan teng** bo'lgan savollar ham birlashtiriladi; birinchi uchragan kartaning ID'si saqlanadi, sahifa ro'yxatlari alias orqali qayta bog'lanadi. Qisman o'xshashlar (masalan, "branch" va "remote branch") avtomatik birlashtirilmaydi — ADR-0003 dagi kabi faqat auditga chiqadi.

## Nega

Shablon savollarni qoldirish takrorlash sessiyasini 15% soxta karta bilan ifloslantirardi. To'liq fuzzy birlashtirish rad etildi: 0.82 o'xshashlikdagi juftlar orasida mazmunan farqli savollar bor. Token to'plami tengligi ma'noni o'zgartirmaydigan eng tor qoida.

## Oqibatlar

Deyarli dublikatlar 4015 dan 6 ga tushdi. Birlashtirilgan kartaning ID'si o'zgarmaydi, shuning uchun mavjud progress saqlanadi; yutqazgan nusxaning ID'si bilan saqlangan baholar esa endi hech bir kartaga tegishli emas (ular zararsiz, lekin hisobda ko'rinmaydi).
