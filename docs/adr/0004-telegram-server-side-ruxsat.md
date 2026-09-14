## Kontekst

Portal Telegram orqali ochiladi, ammo o'quv kontenti faqat allowlist egasiga berilishi kerak; brauzerdagi identifikatorning o'zi ishonchli dalil emas.

## Qaror

Himoyalangan API so'rovlari Telegram `initData` HMAC imzosi va allowlist mosligi bilan serverda tekshiriladi. Health endpoint ochiq qoladi, bot tokeni bo'lmasa bot safe-off ishlaydi va bypass productionda default yopiq bo'ladi.

## Nega

Faqat client-side yashirish rad etildi, chunki header yoki UI holatini foydalanuvchi soxtalashtira oladi. Alohida login va markaziy account tizimi ham rad etildi, chunki bitta egali Telegram oqimidan tashqari yangi mahsulot yuzasi va ma'lumotlar bazasini talab qiladi.

## Oqibatlar

Kontentga ruxsat Telegram imzosi va serverdagi konfiguratsiyaga bog'lanadi. Token aylantirilishi, initData eskirishi va Telegram mavjud emasligi alohida operatsion holatlarga aylanadi; haqiqiy ko'p foydalanuvchilik keyingi arxitektura qarorini talab qiladi.
