## Kontekst

Portal Alyorjons-Mini qayta yuklanganda tiklanishi, HTTPS orqali ochilishi va mavjud 4ontak route'lariga zarar bermasligi kerak.

## Qaror

Vite build va Nest API bitta multi-stage Docker image'da xizmat qiladi; Compose bitta loopback port, healthcheck va restart siyosatini boshqaradi. Public hostname mavjud named tunnelda alohida ingress sifatida lokal origin'ga ulanadi.

## Nega

Frontend va API uchun alohida containerlar rad etildi, chunki bu ko'lamda deploy, routing va health koordinatsiyasini keraksiz ko'paytiradi. Portni to'g'ridan-to'g'ri public ochish xavfsizlik chegarasini zaiflashtiradi. Umumiy tunnel route'larini almashtirish esa boshqa xizmatlarga ta'sir doirasini oshiradi.

## Oqibatlar

Frontend va API bir artifact va bir restart chegarasini ulashadi; ulardan birini mustaqil masshtablash uchun arxitektura ajratilishi kerak. Tunnel konfiguratsiyasida qo'shimcha hostname va mavjud route'larni saqlash operatsion majburiyat bo'lib qoladi.
