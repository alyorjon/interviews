# 🖥️ Backend & Frontend Interview — Tayyorlov Zametkalari / Study Notes

> **Manba / Source:** 100 Backend/Frontend Interview Q&A (50+50)  
> **Tillar / Languages:** O'zbek 🇺🇿 | English 🇬🇧  
> **Maqsad / Goal:** Intervyuga tayyorgarlik uchun qisqacha konspekt / Quick reference for interview prep

---

## 📦 BACKEND — 50 ta savol-javob / 50 Q&A

### 🌐 Asosiy tushunchalar / Core Concepts

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 1 | **Server nima? / What is a server?** | Tarmoq orqali boshqa kompyuterlarga resurs, ma'lumot yoki xizmat taqdim etuvchi tizim | A computer or system that provides resources, data, or services to other computers (clients) over a network |
| 2 | **REST nima? / What is REST?** | Tarmoq ilovalarini loyihalash arxitektura uslubi; stateless client-server muloqotiga asoslanadi | An architectural style for designing networked applications, relying on stateless client-server communication |
| 3 | **API nima? / What is an API?** | Turli dasturiy ilovalar o'rtasida muloqotni ta'minlovchi interfeys | Allows different software applications to communicate with each other (Application Programming Interface) |
| 4 | **CRUD nima? / Explain CRUD** | Ma'lumotlar bazasi bilan ishlashning 4 asosiy operatsiyasi: **C**reate, **R**ead, **U**pdate, **D**elete | Basic database operations: **C**reate, **R**ead, **U**pdate, **D**elete |
| 5 | **Database nima? / What is a database?** | Tuzilgan ma'lumotlar yig'indisi; odatda elektron ko'rinishda saqlanadi | An organized collection of structured information or data, typically stored electronically |

---

### 🗄️ Ma'lumotlar bazasi / Database

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 6 | **SQL nima?** | Relyatsion MBlarni boshqarish va manipulyatsiya qilish tili | Used for managing and manipulating relational databases (Structured Query Language) |
| 7 | **NoSQL nima?** | Katta hajmli ma'lumotlar va real-time ilovalar uchun relyatsion bo'lmagan MB | Non-relational databases designed for large-scale data storage and real-time web applications |
| 8 | **Indexing nima?** | Ma'lumot qidirish tezligini oshirish; qo'shimcha xotira evaziga ishlaydi | Improves speed of data retrieval at the cost of additional storage space |
| 9 | **Normalizatsiya nima?** | Ma'lumot takrorlanishini kamaytirish va yaxlitlikni ta'minlash jarayoni | Organizing data to reduce redundancy and improve data integrity |
| 10 | **ACID nima?** | **A**tomicity, **C**onsistency, **I**solation, **D**urability — tranzaksiya ishonchliligini ta'minlovchi 4 xususiyat | Ensures reliable transaction processing: Atomicity, Consistency, Isolation, Durability |
| 11 | **Primary key nima?** | Jadvaldagi har bir yozuvni yagona identifikatsiya qiluvchi maydon | A unique identifier for a record in a database table |
| 12 | **Foreign key nima?** | Ikki jadval o'rtasida bog'liq yaratuvchi maydon | A field in a table that creates a link between two tables |
| 13 | **ORM nima?** | Ob'ektga yo'naltirilgan kod va relyatsion MB o'rtasida ko'prik (masalan, SQLAlchemy) | Technique for converting data between incompatible type systems in object-oriented programming |

---

### 🏗️ Arxitektura & Infratuzilma / Architecture & Infrastructure

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 14 | **Microservice nima?** | Ilova kichik, mustaqil servislar to'plamidan iborat arxitektura | Software development technique where an application is composed of small, loosely coupled services |
| 15 | **Docker nima?** | Ilovalarni konteynerda ishlab chiqish va ishga tushirish platformasi | A platform for developing, shipping, and running applications in containers |
| 16 | **Container nima?** | Dasturni ishga tushirish uchun hamma narsani o'z ichiga olgan yengil, ko'chma muhit | A lightweight, portable, self-sufficient environment that includes everything needed to run software |
| 17 | **Kubernetes nima?** | Konteynerli ilovalarni avtomatik deploy, scale va boshqarish uchun ochiq platforma | Open-source platform for automating deployment, scaling, and management of containerized applications |
| 18 | **Load balancing nima?** | Kiruvchi trafikni bir nechta server o'rtasida taqsimlash | Distributes incoming network traffic across multiple servers so no single server is overwhelmed |
| 19 | **Reverse proxy nima?** | Client so'rovlarini backend serverga yo'naltiruvchi oraliq server | Forwards client requests to backend servers and returns the server's response to the client |
| 20 | **Middleware nima?** | Client va server o'rtasida turuvchi dastur; logging, auth kabi vazifalar uchun | Software between client and server, handling requests/responses; used for logging, authentication, etc. |

---

### 🔐 Xavfsizlik & Autentifikatsiya / Security & Authentication

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 21 | **Web server nima?** | Foydalanuvchi so'roviga javoban veb-sahifalarni taqdim etuvchi dastur | Software that serves web pages to users in response to their requests |
| 22 | **Caching nima?** | Ma'lumotlarga kirish vaqtini qisqartirish uchun nusxani vaqtinchalik saqlash | Stores copies of files or data in temporary storage to reduce data access time |
| 23 | **Session nima?** | Bir nechta sahifa bo'ylab foydalaniladigan ma'lumotlarni o'zgaruvchilarda saqlash | A way to store information (in variables) to be used across multiple pages |
| 24 | **Token-based auth nima?** | Har bir so'rovda token yuboriladigan autentifikatsiya usuli | Involves generating a token that the user sends with each request for access to protected resources |
| 25 | **JWT nima?** | Tomonlar o'rtasida ma'lumotni xavfsiz uzatish uchun ochiq standart | JSON Web Token — open standard for securely transmitting information between parties as a JSON object |
| 26 | **OAuth nima?** | Kirish huquqlarini delegatsiya qilish uchun ochiq standart | Open standard for access delegation, commonly used for token-based authentication and authorization |
| 27 | **HTTPS nima?** | HTTP ning xavfsiz kengaytmasi | HTTP extension for secure communication over a computer network |
| 28 | **Firewall nima?** | Tarmoq trafikini xavfsizlik qoidalari asosida nazorat qiluvchi tizim | Network security system that monitors and controls incoming and outgoing traffic based on security rules |
| 29 | **SSL/TLS nima?** | Ma'lumotlarni tranzitda shifrlash orqali xavfsiz muloqotni ta'minlovchi protokollar | Protocols that provide secure communication over a network by encrypting data in transit |
| 30 | **VPN nima?** | Ommaviy tarmoq orqali xavfsiz masofaviy kirishni ta'minlaydi | Extends a private network across a public network, allowing secure remote access |

---

### 🛡️ Hujumlar & Kriptografiya / Attacks & Cryptography

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 31 | **SQL injection nima?** | Ilovaga zararli SQL so'rovlar qo'shish orqali hujum | Code injection technique that exploits vulnerabilities by inserting malicious SQL statements |
| 32 | **XSS nima?** | Boshqa foydalanuvchilar ko'radigan sahifalarga zararli skript joylash | Cross-Site Scripting — security vulnerability that allows attackers to inject malicious scripts into web pages |
| 33 | **CSRF nima?** | Autentifikatsiya qilingan foydalanuvchini istamaydigan amallarni bajarishga majburlash | Cross-Site Request Forgery — forces a user to execute unwanted actions on a web app where they're authenticated |
| 34 | **Hashing nima?** | Kirish ma'lumotini belgilangan uzunlikdagi satrga (digest) aylantirish | Transforms input data into a fixed-size string of characters that uniquely identifies the input |
| 35 | **Encryption nima?** | Ma'lumotni ruxsatsiz kirishdan himoya qilish uchun kodlangan shaklga o'tkazish | Converts data into a coded form to prevent unauthorized access |

---

### 🔌 API & Protokollar / API & Protocols

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 36 | **RESTful API nima?** | REST tamoyillariga amal qiladigan API | An API that adheres to REST principles and is used to interact with RESTful web services |
| 37 | **GraphQL nima?** | APIlar uchun so'rov tili; o'z tip tizimingizni belgilab so'rovlarni bajarasiz | A query language for APIs and a runtime for executing queries using a type system you define |
| 38 | **JSON nima?** | Insonlar ham, mashinalar ham osongina o'qiy oladigan yengil ma'lumot almashish formati | Lightweight data interchange format that's easy for humans to read and for machines to parse |
| 39 | **RPC nima?** | Boshqa manzil yoki mashina ustida protsedura bajarilishini ta'minlash | Remote Procedure Call — allows a program to cause a procedure to execute on another address space |
| 40 | **gRPC nima?** | Yuqori unumli, ochiq manbali RPC freymvorki | High-performance, open-source framework for making remote procedure calls with features like auth and load balancing |

---

### 📨 Messaging & Async

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 41 | **Message queue nima?** | Microservices arxitekturasida asinxron servis-servis muloqot shakli | A form of asynchronous service-to-service communication used in serverless and microservices architectures |
| 42 | **RabbitMQ nima?** | Ilovalar o'rtasida xabar almashishni osonlashtiruvchi ochiq manbali message broker | Open-source message broker software that facilitates the exchange of messages between applications |
| 43 | **Kafka nima?** | Kuniga trillionlab hodisalarni qayta ishlay oladigan taqsimlangan event streaming platformasi | Distributed event streaming platform capable of handling trillions of events a day |
| 44 | **Sync vs Async?** | Sync — oldingi tugashini kutadi; Async — kutmasdan keyingisi boshlanishi mumkin | Synchronous waits for tasks to complete; asynchronous can move to the next task before the previous one finishes |

---

### 🧩 Qo'shimcha / Miscellaneous

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 45 | **Middleware (Express.js)?** | Server so'rov lifecycle'i davomida ishga tushadigan funksiya | A function that executes during the lifecycle of a request to the server |
| 46 | **RESTful endpoint nima?** | RESTful veb-xizmat client so'rovlarini qabul qiladigan URL | A URL at which a RESTful web service accepts requests from clients and provides responses |
| 47 | **MVC nima?** | Model-View-Controller — ilovani uchta o'zaro bog'liq komponentga ajratadigan dizayn namuna | Software design pattern dividing an application into three interconnected components |
| 48 | **SSR nima?** | Veb-sahifalarni serverda render qilib, tayyor sahifani clientga yuborish | Process of rendering web pages on the server and sending the fully rendered page to the client |
| 49 | **WebSocket nima?** | Bitta TCP ulanish orqali real-time to'liq dupleks muloqot protokoli | Protocol that provides full-duplex communication channels over a single TCP connection |
| 50 | **Rate limiting nima?** | Foydalanuvchi serverga qancha so'rov yuborishi mumkinligini cheklash | Controls the rate at which a user can make requests to a server, preventing abuse |

---

---

## 🎨 FRONTEND — 50 ta savol-javob / 50 Q&A

### 🧱 HTML & CSS Asoslari / Fundamentals

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 1 | **HTML nima?** | Veb-sahifadagi kontent va elementlarni tuzilmalash tili | HyperText Markup Language — structures web content and elements on a webpage |
| 2 | **DOM nima?** | HTML/XML hujjatlar uchun dasturlash interfeysi; tuzilma, uslub va kontentni o'zgartirish imkonini beradi | Programming interface for HTML and XML documents; represents the page so programs can change structure, style, and content |
| 3 | **CSS nima?** | HTML yoki XML hujjat ko'rinishini tavsiflaydi | Cascading Style Sheets — describes the presentation of a document written in HTML or XML |
| 4 | **Box model nima?** | Margin, border, padding va actual content — element egallagan joyni belgilovchi model | Includes margins, borders, padding, and actual content — defines the space an element occupies |
| 5 | **Flexbox nima?** | Elementlarni konteyner ichida samarali joylash va bo'shliqni taqsimlash CSS layout modeli | CSS layout model that allows items to align and distribute space within a container efficiently |
| 6 | **CSS preprocessor nima?** | SASS, LESS — CSS ni o'zgaruvchilar, nested qoidalar va funksiyalar bilan kengaytiruvchi vosita | Tools like SASS and LESS that extend CSS with variables, nested rules, and functions |

---

### ⚡ JavaScript

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 7 | **JavaScript nima?** | Dinamik veb-kontent yaratish uchun dasturlash tili | Programming language for creating dynamic web content such as interactive forms and animations |
| 8 | **Event delegation nima?** | Ko'p child elementlar hodisalarini boshqarish uchun bitta event listener ni parent ga biriktirish | Attaching a single event listener to a parent element to manage events for multiple child elements |
| 9 | **AJAX nima?** | Sahifa orqasida server bilan ma'lumot almashib veb-sahifalarni asinxron yangilash | Enables web pages to update asynchronously by exchanging data with a server behind the scenes |
| 32 | **== va === farqi?** | `==` tip konversiyasi bilan; `===` tip konversiyasisiz tenglikni tekshiradi | `==` checks equality with type coercion; `===` checks equality without type coercion |
| 33 | **Closure nima?** | O'z leksik qamroviga kirish huquqini saqlaydigan funksiya | A function that retains access to its lexical scope even when called outside that scope |
| 34 | **`this` nima?** | Funksiya chaqirilgan kontekstga ishora qiladi; qo'llanish usuliga qarab o'zgaradi | Refers to the context in which a function is called; can vary based on how the function is invoked |
| 35 | **Event loop nima?** | Call stack bo'sh bo'lganda navbatdagi callbacklarni bajariladigan asinxron boshqaruv mexanizmi | Handles asynchronous operations by executing callbacks in the queue when the call stack is empty |
| 36 | **async/await nima?** | Promise lar bilan ishlashni soddalashtiradigan sintaksis | Simplifies working with promises, allowing asynchronous code to be written in a synchronous style |
| 40 | **localStorage vs sessionStorage?** | `localStorage` — aniq o'chirilmaguncha; `sessionStorage` — faqat sessiya davomida saqlanadi | `localStorage` persists indefinitely until deleted; `sessionStorage` persists only for the page session |
| 42 | **IIFE nima?** | Aniqlangan zahoti ishga tushadigan funksiya; global scope'ni himoya qiladi | Immediately Invoked Function Expression — runs as soon as it is defined; avoids polluting global scope |
| 50 | **let vs const farqi?** | `let` — qayta tayinlash mumkin; `const` — qayta tayinlab bo'lmaydi | `let` allows variable reassignment; `const` declares constants whose values cannot be reassigned |

---

### ⚛️ React

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 10 | **React nima?** | Komponent-asosli arxitektura va state boshqaruviga e'tibor qaratgan JavaScript UI kutubxonasi | JavaScript library for building user interfaces, focusing on component-based architecture and state management |
| 11 | **JSX nima?** | React da UI elementlarini tavsiflash uchun JavaScript sintaksis kengaytmasi | Syntax extension for JavaScript used in React to describe UI elements |
| 12 | **Virtual DOM nima?** | Haqiqiy DOM ning yengil nusxasi; React yangilash va renderingni optimallashtirish uchun ishlatadi | Lightweight copy of the actual DOM; React uses it to optimize updates and rendering |
| 13 | **Hooks nima?** | Funksional komponentlarda state va lifecycle xususiyatlarini ishlatishga imkon beruvchi funksiyalar | Functions that let you use state and lifecycle features in functional components |
| 14 | **Redux nima?** | JavaScript ilovalar uchun state boshqaruv kutubxonasi; holatni yagona "store"da markazlashtiradi | State management library for JavaScript apps; centralizes application state in a single store |
| 15 | **Props vs State?** | Props — parent dan child ga faqat o'qiladigan ma'lumot; State — komponent ichida o'zgaruvchan | Props: read-only data from parent to child; State: mutable data managed within a component |
| 48 | **HOC nima?** | Komponent qabul qilib, qo'shimcha funksionallik bilan yangi komponent qaytaruvchi funksiya | A function that takes a component and returns a new component with additional functionality |
| 49 | **Memoization nima?** | Qimmat funksiya natijalarini kesh qiluvchi optimallashtirish texnikasi | Optimization technique where results of expensive function calls are cached to improve performance |

---

### 🅰️ Angular

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 16 | **Angular nima?** | HTML va TypeScript yordamida single-page ilovalar yaratish uchun platforma | Platform and framework for building single-page client applications using HTML and TypeScript |
| 17 | **Directive nima?** | Angular da HTML ni yangi xulq-atvor bilan kengaytirish uchun DOM dagi maxsus belgilar | Special markers in the DOM that tell Angular to extend HTML with new behavior |
| 18 | **Data binding nima?** | Angular da model va view o'rtasidagi ma'lumot sinxronizatsiyasi | Synchronizes data between the model and the view using one-way and two-way binding techniques |

---

### 💚 Vue.js

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 19 | **Vue.js nima?** | UI va single-page ilovalar yaratish uchun progressiv JavaScript freymvorki | Progressive JavaScript framework for building user interfaces and single-page applications |
| 20 | **Vue instance nima?** | Vue ilovasining ildizi; app lifecycle'ini boshqaradi | The root of a Vue application, controlling the lifecycle of the Vue app |
| 21 | **Single-file component?** | HTML, CSS va JavaScript ni bitta `.vue` faylda kapsulalaydigan komponentlar | Encapsulates HTML, CSS, and JavaScript in a single `.vue` file |
| 22 | **Lifecycle hooks (Vue)?** | Vue komponent lifecycle'ining muayyan bosqichlarida ishlaydigan metodlar | Methods that run at specific stages of a Vue component's lifecycle: `created`, `mounted`, `destroyed` |

---

### 🔧 Tooling & Zamonaviy Web / Modern Web

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 23 | **TypeScript nima?** | JavaScript ning superset'i; statik tiplar qo'shib kod sifatini oshiradi | Superset of JavaScript that adds static types, enhancing code quality and developer productivity |
| 24 | **TypeScript afzalliklari?** | Kod o'qilishini yaxshilash, xatolarni erta aniqlash, yaxshiroq tooling | Improved code readability, early error detection, and better tooling support |
| 25 | **Webpack nima?** | JavaScript ilovalar uchun modul bundler | Module bundler for JavaScript applications; transforms and packages code for deployment |
| 26 | **Lazy loading nima?** | Kerak bo'lguncha muhim bo'lmagan resurslar yuklanishini kechiktirish | Delays loading of non-critical resources until they are needed, improving initial load time |
| 27 | **Service worker nima?** | Fonda ishlaydigan skriptlar; offline imkoniyatlar va fon sinxronizatsiyasini ta'minlaydi | Scripts that run in the background, enabling offline capabilities and background syncing |
| 28 | **PWA nima?** | Offline kirish va push notification lar bilan native app tajribasini taqdim etuvchi veb-ilova | Web applications that provide native app-like experiences, including offline access and push notifications |
| 29 | **Responsive design nima?** | Veb-kontentni turli ekran o'lchami va yo'nalishlariga moslashtirib optimal ko'rinishni ta'minlash | Ensures web content adapts to different screen sizes and orientations for optimal viewing on any device |
| 30 | **Media query nima?** | Ekran kengligi kabi qurilma xususiyatlariga qarab uslublar qo'llash CSS texnikasi | CSS techniques used to apply styles based on device characteristics such as screen width |

---

### 🧩 Ilg'or CSS & Web / Advanced CSS & Web

| # | Savol / Question | O'zbek / Uzbek | English |
|---|------------------|----------------|---------|
| 31 | **CSS Grid nima?** | Murakkab layoutlarni osonroq yaratishga imkon beruvchi ikki o'lchamli CSS layout tizimi | Two-dimensional layout system for the web, allowing designers to create complex layouts more easily |
| 37 | **CORS nima?** | Boshqa domendan so'ralgan resurslarga ruxsat beruvchi yoki cheklovchi xavfsizlik xususiyati | Security feature that allows or restricts resources on a web page requested from another domain |
| 38 | **REST API nima?** | CRUD operatsiyalarini bajarish uchun HTTP so'rovlaridan foydalanadigan arxitektura uslubi | Architectural style for designing networked applications, using HTTP requests to perform CRUD operations |
| 39 | **GraphQL (Frontend)?** | Clientlarga bitta so'rovda aniq ma'lumot so'rash va agregatsiyalashga imkon beruvchi so'rov tili | Query language for APIs, enabling clients to request specific data and aggregate responses in a single request |
| 43 | **Shadow DOM nima?** | DOM daraxtining bir qismini kapsulalaydi; scoped styling va xulq-atvorni ta'minlaydi | Encapsulates a part of the DOM tree, allowing for scoped styling and behavior |
| 44 | **CSS transition nima?** | CSS xususiyatlardagi o'zgarishlar tezligini boshqarish; silliq animatsiyalar | Provides a way to control the speed of changes to CSS properties, enabling smooth animations |
| 45 | **Polyfill nima?** | Eski brauzerlar uchun zamonaviy funksionallikni ta'minlovchi kod | Code that provides modern functionality on older browsers that do not natively support it |
| 46 | **BEM nima?** | Block Element Modifier — CSS sinflarini nomlash konventsiyasi | Naming convention for CSS classes, aiming to make CSS more maintainable and scalable |
| 47 | **CSS variable nima?** | Hujjat bo'ylab qayta ishlatish uchun belgilangan custom properties | Custom properties defined by CSS authors that contain specific values to be reused throughout the document |

---

## 💡 Eslatmalar / Notes

> **🔧 Backend intervyu uchun / For Backend interviews:**
> - ACID, Indexing, Normalization — DB savollari ko'p chiqadi / DB questions appear frequently
> - JWT + OAuth autentifikatsiya zanjiri / authentication chain
> - Async/Sync farqi — FastAPI bilan ishlaganda juda muhim / very important for FastAPI
> - Docker, Kubernetes asosiy tushunchalari / basic concepts

> **🎨 Frontend intervyu uchun / For Frontend interviews:**
> - Virtual DOM va React Hooks
> - JavaScript: Closure, Event loop, async/await
> - CSS: Box model, Flexbox, Grid
> - TypeScript afzalliklari / advantages

---

*Tayyorlagan / Prepared by: Alyorjon | Manba / Source: 100 Backend & Frontend Interview Q&A PDF*