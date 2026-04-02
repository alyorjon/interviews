# 🖥️ Backend & Frontend Interview — Tayyorlov Zametkalari

> **Manba:** 100 Backend/Frontend Interview Q&A (50+50)  
> **Til:** O'zbek  
> **Maqsad:** Intervyuga tayyorgarlik uchun qisqacha konspekt

---

## 📦 BACKEND — 50 ta savol-javob

### 🌐 Asosiy tushunchalar

| # | Savol | Javob |
|---|-------|-------|
| 1 | **Server nima?** | Tarmoq orqali boshqa kompyuterlarga (client) resurs, ma'lumot yoki xizmat taqdim etuvchi kompyuter yoki tizim |
| 2 | **REST nima?** | Tarmoq ilovalarini loyihalash uchun arxitektura uslubi; stateless (holatsiz) client-server muloqotiga asoslanadi |
| 3 | **API nima?** | Turli dasturiy ilovalar o'rtasida muloqotni ta'minlovchi interfeys (Application Programming Interface) |
| 4 | **CRUD nima?** | Ma'lumotlar bazasi bilan ishlashning 4 asosiy operatsiyasi: **C**reate, **R**ead, **U**pdate, **D**elete |
| 5 | **Database nima?** | Tuzilgan ma'lumotlar yig'indisi; odatda elektron ko'rinishda saqlanadi |

---

### 🗄️ Ma'lumotlar bazasi

| # | Savol | Javob |
|---|-------|-------|
| 6 | **SQL nima?** | Relyatsion ma'lumotlar bazalarini boshqarish va manipulyatsiya qilish uchun til (Structured Query Language) |
| 7 | **NoSQL nima?** | Katta hajmli ma'lumotlar va real-time ilovalar uchun mo'ljallangan relyatsion bo'lmagan ma'lumotlar bazasi |
| 8 | **Indexing nima?** | Ma'lumot qidirish tezligini oshirish usuli; qo'shimcha xotira evaziga ishlaydi |
| 9 | **Normalizatsiya nima?** | Ma'lumot takrorlanishini kamaytirish va yaxlitlikni ta'minlash uchun ma'lumotlarni tartibga solish jarayoni |
| 10 | **ACID nima?** | Tranzaksiyalarning ishonchliligini ta'minlovchi 4 xususiyat: **A**tomicity, **C**onsistency, **I**solation, **D**urability |
| 11 | **Primary key nima?** | Jadvaldagi har bir yozuvni yagona identifikatsiya qiluvchi maydon |
| 12 | **Foreign key nima?** | Ikki jadval o'rtasida bog'liq yaratuvchi maydon |
| 13 | **ORM nima?** | Object-Relational Mapping — ob'ektga yo'naltirilgan kod va relyatsion ma'lumotlar bazasi o'rtasida ko'prik (masalan, SQLAlchemy) |

---

### 🏗️ Arxitektura & Infratuzilma

| # | Savol | Javob |
|---|-------|-------|
| 14 | **Microservice nima?** | Ilova kichik, bir-biridan mustaqil servislar to'plamidan iborat bo'lgan dasturlash arxitekturasi |
| 15 | **Docker nima?** | Ilovalarni konteynerda ishlab chiqish, etkazib berish va ishga tushirish platformasi |
| 16 | **Container nima?** | Dasturni ishga tushirish uchun zarur hamma narsani o'z ichiga olgan yengil, ko'chma muhit |
| 17 | **Kubernetes nima?** | Konteynerli ilovalarni avtomatik deploy qilish, scale qilish va boshqarish uchun ochiq platforma |
| 18 | **Load balancing nima?** | Kiruvchi tarmoq trafikini bir nechta server o'rtasida taqsimlash (bir server yuklanib qolmasligi uchun) |
| 19 | **Reverse proxy nima?** | Client so'rovlarini backend serverga yo'naltiruvchi va javobni qaytaruvchi oraliq server |
| 20 | **Middleware nima?** | Client va server o'rtasida turuvchi dasturiy ta'minot; logging, autentifikatsiya kabi vazifalarni bajaradi |

---

### 🔐 Xavfsizlik & Autentifikatsiya

| # | Savol | Javob |
|---|-------|-------|
| 21 | **Web server nima?** | Foydalanuvchi so'roviga javoban veb-sahifalarni taqdim etuvchi dastur |
| 22 | **Caching nima?** | Ma'lumotlarga kirish vaqtini qisqartirish uchun fayllar yoki ma'lumotlar nusxasini vaqtinchalik joyda saqlash |
| 23 | **Session nima?** | Bir nechta sahifa bo'ylab foydalaniladigan ma'lumotlarni o'zgaruvchilarda saqlash usuli |
| 24 | **Token-based auth nima?** | Foydalanuvchi har bir so'rovda himoyalangan resurslarga kirish uchun token yuboradigan autentifikatsiya usuli |
| 25 | **JWT nima?** | JSON Web Token — tomonlar o'rtasida ma'lumotni xavfsiz uzatish uchun ochiq standart |
| 26 | **OAuth nima?** | Kirish huquqlarini delegatsiya qilish uchun ochiq standart; token-based auth/authorizatsiyada keng qo'llaniladi |
| 27 | **HTTPS nima?** | HTTP ning xavfsiz kengaytmasi; tarmoq orqali xavfsiz muloqotni ta'minlaydi |
| 28 | **Firewall nima?** | Xavfsizlik qoidalari asosida kiruvchi/chiquvchi tarmoq trafikini nazorat qiluvchi tizim |
| 29 | **SSL/TLS nima?** | Ma'lumotlarni tranzitda shifrlash orqali xavfsiz muloqotni ta'minlovchi protokollar |
| 30 | **VPN nima?** | Virtual Private Network — ommaviy tarmoq orqali xavfsiz masofaviy kirishni ta'minlaydi |

---

### 🛡️ Hujumlar & Kriptografiya

| # | Savol | Javob |
|---|-------|-------|
| 31 | **SQL injection nima?** | Ilovaning zaif joylariga zararli SQL so'rovlar qo'shish orqali ma'lumotlar bazasiga hujum |
| 32 | **XSS nima?** | Cross-Site Scripting — boshqa foydalanuvchilar ko'radigan sahifalarga zararli skript joylash |
| 33 | **CSRF nima?** | Cross-Site Request Forgery — autentifikatsiya qilingan foydalanuvchini istamaydigan amallarni bajarishga majburlash |
| 34 | **Hashing nima?** | Kirish ma'lumotini belgilangan uzunlikdagi satrga (digest) aylantirib, yagona identifikatsiya qilish |
| 35 | **Encryption nima?** | Ma'lumotni ruxsatsiz kirishdan himoya qilish uchun kodlangan shaklga o'tkazish |

---

### 🔌 API & Protokollar

| # | Savol | Javob |
|---|-------|-------|
| 36 | **RESTful API nima?** | REST tamoyillariga amal qiladigan va RESTful veb-xizmatlar bilan ishlash uchun ishlatiladigan API |
| 37 | **GraphQL nima?** | APIlar uchun so'rov tili; ma'lumotlar uchun o'z tip tizimingizni belgilab, so'rovlarni bajarasiz |
| 38 | **JSON nima?** | Insonlar ham, mashinalar ham osongina o'qiy oladigan yengil ma'lumot almashish formati |
| 39 | **RPC nima?** | Remote Procedure Call — boshqa manzil yoki mashina ustida protsedura bajarilishini ta'minlash |
| 40 | **gRPC nima?** | Yuqori unumli, ochiq manbali RPC freymvorki; autentifikatsiya, load balancing kabi imkoniyatlar bilan |

---

### 📨 Messaging & Async

| # | Savol | Javob |
|---|-------|-------|
| 41 | **Message queue nima?** | Serverless va microservices arxitekturasida ishlatiladigan asinxron servis-servis muloqot shakli |
| 42 | **RabbitMQ nima?** | Turli ilovalar o'rtasida xabar almashishni osonlashtiruvchi ochiq manbali message broker |
| 43 | **Kafka nima?** | Kuniga trillionlab hodisalarni qayta ishlay oladigan taqsimlangan event streaming platformasi; real-time pipeline va streaming uchun |
| 44 | **Sync vs Async farqi?** | Synchronous — keyingi vazifa oldingi tugashini kutadi; Asynchronous — oldingi tugamay turib keyingisi boshlanishi mumkin |

---

### 🧩 Qo'shimcha tushunchalar

| # | Savol | Javob |
|---|-------|-------|
| 45 | **Middleware (Express.js)?** | Server so'rov lifecycle'i davomida ishga tushadigan funksiya; logging, auth va boshqa vazifalar uchun |
| 46 | **RESTful endpoint nima?** | RESTful veb-xizmat client so'rovlarini qabul qilib, javob qaytaradigan URL |
| 47 | **MVC arxitektura nima?** | Model-View-Controller — veb-ilovalarni uchta o'zaro bog'liq komponentga ajratadigan dizayn namuna |
| 48 | **SSR (Server-side rendering)?** | Veb-sahifalarni serverda render qilib, to'liq tayyorlangan sahifani clientga yuborish jarayoni |
| 49 | **WebSocket nima?** | Bitta TCP ulanish orqali to'liq dupleks muloqot kanallarini ta'minlovchi protokol; real-time ma'lumot uzatish uchun |
| 50 | **Rate limiting nima?** | Foydalanuvchi serverga qancha so'rov yuborishi mumkinligini cheklash; suiiste'molni oldini olish uchun |

---

---

## 🎨 FRONTEND — 50 ta savol-javob

### 🧱 HTML & CSS Asoslari

| # | Savol | Javob |
|---|-------|-------|
| 1 | **HTML nima?** | HyperText Markup Language — veb-sahifadagi kontent va elementlarni tuzilmalash tili |
| 2 | **DOM nima?** | Document Object Model — HTML/XML hujjatlar uchun dasturlash interfeysi; sahifa tuzilmasi, uslubi va kontentini o'zgartirish imkonini beradi |
| 3 | **CSS nima?** | Cascading Style Sheets — HTML yoki XML da yozilgan hujjat ko'rinishini tavsiflaydi |
| 4 | **Box model nima?** | Margin, border, padding va actual content — element egallagan joyni belgilovchi model |
| 5 | **Flexbox nima?** | Elementlarni konteyner ichida samarali joylash va bo'shliqni taqsimlash imkonini beruvchi CSS layout modeli |
| 6 | **CSS preprocessor nima?** | SASS, LESS kabi — CSS ni o'zgaruvchilar, nested qoidalar va funksiyalar bilan kengaytiruvchi vosita |

---

### ⚡ JavaScript

| # | Savol | Javob |
|---|-------|-------|
| 7 | **JavaScript nima?** | Interaktiv formalar va animatsiyalar kabi dinamik veb-kontent yaratish uchun dasturlash tili |
| 8 | **Event delegation nima?** | Ko'p child elementlar hodisalarini boshqarish uchun bitta event listener ni parent elementga biriktirish |
| 9 | **AJAX nima?** | Asynchronous JavaScript and XML — sahifa orqasida server bilan ma'lumot almashib, veb-sahifalarni asinxron yangilash |
| 32 | **== va === farqi?** | `==` — tip konversiyasi bilan tenglikni tekshiradi; `===` — tip konversiyasisiz tekshiradi |
| 33 | **Closure nima?** | O'z leksik qamroviga kirish huquqini saqlagan funksiya (o'sha qamrovdan tashqarida chaqirilganda ham) |
| 34 | **`this` kalit so'z nima?** | Funksiya chaqirilgan kontekstga ishora qiladi; qo'llanish usuliga qarab o'zgaradi |
| 35 | **Event loop nima?** | Call stack bo'sh bo'lganda navbatdagi callback larni bajarilib asinxron operatsiyalarni boshqaradigan mexanizm |
| 36 | **async/await nima?** | Promise lar bilan ishlashni soddalashtiradigan sintaksis; asinxron kodni sinxron uslubda yozish imkonini beradi |
| 40 | **localStorage vs sessionStorage?** | `localStorage` — aniq o'chirilmaguncha saqlanadi; `sessionStorage` — faqat sahifa sessiyasi davomida saqlanadi |
| 42 | **IIFE nima?** | Immediately Invoked Function Expression — aniqlangan zahoti ishga tushadigan funksiya; global scope'ni "ifloslashdan" himoya qiladi |
| 50 | **let vs const farqi?** | `let` — qayta tayinlash mumkin; `const` — o'zgarmas konstantalar uchun, qayta tayinlab bo'lmaydi |

---

### ⚛️ React

| # | Savol | Javob |
|---|-------|-------|
| 10 | **React nima?** | Komponent-asosli arxitektura va state boshqaruviga e'tibor qaratgan JavaScript UI kutubxonasi |
| 11 | **JSX nima?** | JavaScript uchun sintaksis kengaytmasi; React da UI elementlarini tavsiflash uchun ishlatiladi |
| 12 | **Virtual DOM nima?** | Haqiqiy DOM ning yengil nusxasi; React yangilash va renderingni optimallashtirish uchun ishlatadi |
| 13 | **Hooks nima?** | Funksional komponentlarda state va lifecycle xususiyatlarini ishlatishga imkon beruvchi funksiyalar |
| 14 | **Redux nima?** | JavaScript ilovalar uchun state boshqaruv kutubxonasi; ilovaning holatini yagona "store"da markazlashtiradi |
| 15 | **Props vs State farqi?** | Props — parent dan child ga o'tkaziladigan faqat o'qiladigan ma'lumot; State — komponent ichida boshqariladigan o'zgaruvchan ma'lumot |
| 48 | **HOC nima?** | Higher-Order Component — komponent qabul qilib yangi komponent qaytaradigan va qo'shimcha funksionallik qo'shadigan funksiya |
| 49 | **Memoization nima?** | Qimmat funksiya natijalarini kesh qiluvchi optimallashtirish texnikasi; unumdorlikni yaxshilaydi |

---

### 🅰️ Angular

| # | Savol | Javob |
|---|-------|-------|
| 16 | **Angular nima?** | HTML va TypeScript yordamida single-page client ilovalar yaratish uchun platforma va freymvork |
| 17 | **Directive nima?** | Angular da HTML ni yangi xulq-atvor bilan kengaytirish uchun DOM dagi maxsus belgilar |
| 18 | **Data binding nima?** | Angular da model va view o'rtasidagi ma'lumot sinxronizatsiyasi; one-way va two-way binding texnikal usullar |

---

### 💚 Vue.js

| # | Savol | Javob |
|---|-------|-------|
| 19 | **Vue.js nima?** | Foydalanuvchi interfeyslari va single-page ilovalar yaratish uchun progressiv JavaScript freymvorki |
| 20 | **Vue instance nima?** | Vue ilovasining ildizi; Vue app lifecycle'ini boshqaradi |
| 21 | **Single-file component?** | HTML, CSS va JavaScript ni bitta `.vue` faylda kapsulalaydigan komponentlar |
| 22 | **Lifecycle hooks (Vue)?** | Vue komponent lifecycle'ining muayyan bosqichlarida ishlaydigan metodlar: `created`, `mounted`, `destroyed` va boshqalar |

---

### 🔧 Tooling & Zamonaviy Web

| # | Savol | Javob |
|---|-------|-------|
| 23 | **TypeScript nima?** | JavaScript ning superset'i; statik tiplar qo'shib kod sifati va developer unumdorligini oshiradi |
| 24 | **TypeScript afzalliklari?** | Kod o'qilishini yaxshilash, xatolarni erta aniqlash, yaxshiroq tooling qo'llab-quvvatlash |
| 25 | **Webpack nima?** | JavaScript ilovalar uchun modul bundler; deploy uchun kodni transform va paketlaydi |
| 26 | **Lazy loading nima?** | Kerak bo'lguncha muhim bo'lmagan resurslar yuklanishini kechiktirish; dastlabki yuklash vaqtini yaxshilaydi |
| 27 | **Service worker nima?** | Fonda ishlaydigan skriptlar; offline imkoniyatlar va fon sinxronizatsiyasini ta'minlaydi |
| 28 | **PWA nima?** | Progressive Web App — offline kirish va push notification lar bilan native app tajribasini taqdim etuvchi veb-ilova |
| 29 | **Responsive design nima?** | Veb-kontentni turli ekran o'lchami va yo'nalishlariga moslashtirib optimal ko'rinishni ta'minlash |
| 30 | **Media query nima?** | Ekran kengligi kabi qurilma xususiyatlariga qarab uslublar qo'llash uchun CSS texnikasi |

---

### 🧩 Ilg'or CSS & Web tushunchalari

| # | Savol | Javob |
|---|-------|-------|
| 31 | **CSS Grid nima?** | Dizaynerlar murakkab layoutlarni osonroq yaratishiga imkon beruvchi ikki o'lchamli CSS layout tizimi |
| 37 | **CORS nima?** | Cross-Origin Resource Sharing — boshqa domendan so'ralgan veb-sahifadagi resurslarni ruxsat beruvchi yoki cheklovchi xavfsizlik xususiyati |
| 38 | **REST API nima?** | CRUD operatsiyalarini bajarish uchun HTTP so'rovlaridan foydalanadigan tarmoq ilovalarini loyihalash arxitektura uslubi |
| 39 | **GraphQL nima?** | APIlar uchun so'rov tili; clientlarga bitta so'rovda aniq ma'lumot so'rash va agregatsiyalashga imkon beradi |
| 43 | **Shadow DOM nima?** | DOM daraxtining bir qismini kapsulalaydi; scoped styling va xulq-atvorni ta'minlaydi |
| 44 | **CSS transition nima?** | CSS xususiyatlardagi o'zgarishlar tezligini boshqarish usuli; silliq animatsiyalar yaratadi |
| 45 | **Polyfill nima?** | Eski brauzerlar uchun zamonaviy funksionallikni ta'minlovchi kod |
| 46 | **BEM nima?** | Block Element Modifier — CSS sinflarini nomlash konventsiyasi; CSS ni yanada saqlanuvchi va kengaytiriladigan qiladi |
| 47 | **CSS variable nima?** | Custom properties — hujjat bo'ylab qayta ishlatish uchun CSS mualliflari tomonidan belgilangan qiymatlar |

---

## 💡 Eslatmalar

> **Backend intervyuga tayyorlanayotganda** quyidagilarga alohida e'tibor bering:
> - ACID, Indexing, Normalization (DB savollari ko'p chiqadi)
> - JWT + OAuth autentifikatsiya zanjiri
> - Async/Sync farqi (FastAPI bilan ish qilganda juda muhim)
> - Docker, Kubernetes asosiy tushunchalari

> **Frontend intervyu uchun** asosiy temalar:
> - Virtual DOM va React Hooks
> - JavaScript: Closure, Event loop, async/await
> - CSS: Box model, Flexbox, Grid
> - TypeScript afzalliklari

---

*Tayyorlagan: Alyorjon | Manba: 100 Backend & Frontend Interview Q&A PDF*