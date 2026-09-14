## Kontekst

Portalning web interfeysi, API va kontent tayyorlash qatlami birga rivojlanadi hamda bitta release sifatida yetkaziladi.

## Qaror

Loyiha `apps/web`, `apps/api` va `packages/content` chegaralariga ega npm workspaces monoreposi bo'ladi; ular bitta lockfile va bitta build oqimini ulashadi.

## Nega

Alohida repolar ko'rib chiqildi, ammo umumiy katalog kontrakti va birgalikdagi release'larda versiya driftini oshiradi. Barcha qismlarni bitta ilovaga tekislash ham rad etildi, chunki frontend, API va kontent pipeline egaligini xiralashtiradi.

## Oqibatlar

Dependency va kontrakt o'zgarishlari bir commitda muvofiqlashtiriladi. Buning evaziga workspace build tartibi va yagona lockfile butun loyiha uchun majburiy bo'ladi; qismlarni keyin alohida chiqarish migratsiya talab qiladi.
