# 🧪 System Design Interaktiv Quiz — Self-Test MCQ
### Ikki tilli qo'llanma / Bilingual Reference

> **Daraja / Level:** 🟢 Basic → 🟡 Intermediate → 🔴 Advanced
> **Format:** Har bir savolda 4 variant, faqat bittasi to'g'ri. Javoblarni oldindan ko'rmang — avval yeching! / Each question has 4 options, only one correct. Don't peek at the answer key — attempt first!
> **Javoblar:** Fayl oxirida / **Answers:** at the end of the file

---

## 🟢 Basic (1–10)

**1.** Monolith arxitekturasida ilova qanday joylashtiriladi (deploy qilinadi)? / In Monolith architecture, how is the application deployed?
A) Har bir domen uchun alohida mustaqil servis sifatida / As independent services per domain
B) Bitta yagona kod bazasi va bitta executable jarayon sifatida / As a single codebase and single deployed process
C) Faqat konteynerlar klasterida / Only in a container cluster
D) Faqat serverless funksiyalar sifatida / Only as serverless functions

**2.** Layer 4 va Layer 7 Load Balancer haqida qaysi bayonot to'g'ri? / Which statement about Layer 4 vs Layer 7 Load Balancers is correct?
A) Layer 4 HTTP header va URL asosida routing qiladi / Layer 4 routes based on HTTP headers and URL
B) Layer 7 faqat IP va TCP/UDP portlarni ko'radi / Layer 7 only inspects IP and TCP/UDP ports
C) Layer 7 HTTP so'rov mazmuniga (URL, header, cookie) qarab routing qila oladi / Layer 7 can route based on HTTP content (URL, headers, cookies)
D) Ikkalasi ham bir xil OSI qatlamida ishlaydi / Both operate at the same OSI layer

**3.** Redis va Memcached solishtirilganda qaysi bayonot to'g'ri? / Which statement is correct when comparing Redis and Memcached?
A) Redis diskka persistence (RDB/AOF) qo'llab-quvvatlaydi, Memcached esa faqat volatile RAM / Redis supports disk persistence (RDB/AOF), while Memcached is volatile RAM-only
B) Memcached RDB/AOF orqali diskka persistence qiladi / Memcached persists to disk via RDB/AOF
C) Redis faqat oddiy Key-Value string saqlaydi / Redis only stores simple key-value strings
D) Memcached Pub/Sub va Clusteringni to'liq qo'llab-quvvatlaydi / Memcached fully supports Pub/Sub and Clustering

**4.** Vertical Scaling (Scale-up) ning asosiy kamchiligi nima? / What is the main drawback of Vertical Scaling (Scale-up)?
A) Koddagi murakkablikni oshiradi / It increases code complexity
B) Cross-shard JOIN muammosini keltirib chiqaradi / It causes cross-shard JOIN problems
C) Sticky session talab qiladi / It requires sticky sessions
D) Apparat (hardware) chegarasiga uchraydi va qimmatlashadi / It hits a hardware limit and becomes expensive

**5.** DNS resolution jarayonida to'g'ri ketma-ketlik qaysi? / What is the correct order in DNS resolution?
A) Root Server -> Browser Cache -> TLD Server -> Recursive Resolver
B) Browser Cache -> Recursive Resolver -> Root Server -> TLD Server -> Authoritative Server
C) Authoritative Server -> Recursive Resolver -> Browser Cache
D) TLD Server -> Root Server -> Browser Cache -> Authoritative Server

**6.** CDN (Content Delivery Network) ning asosiy vazifasi nima? / What is the primary purpose of a CDN?
A) Static fayllarni foydalanuvchiga geografik yaqin edge serverlardan yetkazish / To deliver static assets from edge servers geographically close to users
B) Ma'lumotlar bazasi yozish operatsiyalarini tezlashtirish / To speed up database write operations
C) Distributed tranzaksiyalarni boshqarish / To manage distributed transactions
D) Microservices o'rtasidagi xabar almashinuvi / To handle messaging between microservices

**7.** Reverse Proxy kimning nomidan ishlaydi? / On whose behalf does a Reverse Proxy operate?
A) Clientning nomidan (IP yashirish uchun) / On behalf of the client (to hide client IP)
B) Faqat DNS serverning nomidan / Only on behalf of the DNS server
C) Backend serverlarning nomidan (load balancing, SSL termination uchun) / On behalf of backend servers (for load balancing, SSL termination)
D) Faqat Message Queue ning nomidan / Only on behalf of the message queue

**8.** Stateless arxitekturaning asosiy afzalligi nima? / What is the main advantage of Stateless architecture?
A) Session ma'lumotlari serverda saqlanadi / Session data is stored on the server
B) Sticky session talab qiladi / It requires sticky sessions
C) Faqat bitta serverda ishlashi mumkin / It can only run on a single server
D) Har qanday so'rov istalgan app serverga tushishi mumkin, horizontal scaling oson / Any request can hit any app server, making horizontal scaling easy

**9.** B-Tree Index qachon Hash Index dan afzal? / When is a B-Tree Index preferable to a Hash Index?
A) Faqat tenglik (`=`) so'rovlarida / Only for equality (`=`) queries
B) Interval so'rovlar va ORDER BY uchun (`<`, `>`, BETWEEN) / For range queries and ORDER BY (`<`, `>`, BETWEEN)
C) Hash Index umuman ishlatilmaydi / Hash Index is never used
D) Ikkalasi bir xil holatlarda ishlatiladi / Both are used in identical scenarios

**10.** Nima uchun rasm/video kabi katta fayllar Object Storage da saqlanadi, DB da emas? / Why are large files like images/videos stored in Object Storage rather than the DB?
A) Chunki DB umuman fayl saqlay olmaydi / Because a DB cannot store files at all
B) Object Storage har doim tekin / Object Storage is always free
C) DB da BLOB sifatida saqlash DB unumdorligi va backup jarayonini sekinlashtiradi / Storing them as BLOBs in the DB degrades DB performance and slows backups
D) DB faqat matnli ma'lumot qabul qiladi / A DB only accepts text data

---

## 🟡 Intermediate (11–20)

**11.** Message Queue microservices arxitekturasida qanday muammoni hal qiladi? / What problem does a Message Queue solve in microservices architecture?
A) Servislarni decouple qiladi va trafik zarbalarini yumshatadi (load leveling) / It decouples services and smooths traffic spikes (load leveling)
B) Servislarni bir-biriga qattiq bog'laydi (tight coupling) / It tightly couples services together
C) DB indekslashni tezlashtiradi / It speeds up database indexing
D) SSL sertifikatlarini boshqaradi / It manages SSL certificates

**12.** RabbitMQ va Kafka o'rtasidagi asosiy farq nima? / What is the key difference between RabbitMQ and Kafka?
A) RabbitMQ pull-based, Kafka push-based / RabbitMQ is pull-based, Kafka is push-based
B) Ikkalasi ham bir xil model ishlatadi / Both use the identical model
C) Kafka faqat 1 ta consumerga xabar yubora oladi / Kafka can only deliver to a single consumer
D) RabbitMQ push-based va ACK dan keyin xabarni o'chiradi, Kafka pull-based append-only log sifatida saqlaydi / RabbitMQ is push-based and deletes messages after ACK, Kafka is pull-based and stores messages as an append-only log

**13.** Kafka da bitta partition consumer group ichida nechta consumer ga biriktirilishi mumkin? / In Kafka, how many consumers within one consumer group can a single partition be assigned to?
A) Cheksiz / Unlimited
B) Faqat bitta / Only one
C) Har doim uchta / Always three
D) Nolga teng / Zero

**14.** At-Least-Once yetkazish kafolati nimani anglatadi? / What does the At-Least-Once delivery guarantee mean?
A) Xabar yo'qolishi mumkin, lekin takrorlanmaydi / Message may be lost but never duplicated
B) Xabar aniq bir marta yetkaziladi / Message is delivered exactly once
C) Xabar yo'qolmaydi, lekin takroriy kelishi mumkin, shu sabab idempotent consumer kerak / Message is never lost but may arrive more than once, requiring an idempotent consumer
D) Xabar hech qachon yetkazilmaydi / Message is never delivered

**15.** Idempotency-Key strategiyasi qanday ishlaydi? / How does the Idempotency-Key strategy work?
A) Client yagona kalit yuboradi, server uni Redis/DB da tekshirib, mavjud bo'lsa avvalgi natijani qaytaradi / Client sends a unique key, server checks it in Redis/DB and returns the prior result if it already exists
B) Har bir so'rov doim qayta ijro etiladi / Every request is always re-executed
C) Faqat GET so'rovlarida ishlatiladi / It is only used for GET requests
D) Kalit har safar tasodifiy generatsiya qilinadi va tekshirilmaydi / The key is randomly generated each time and never checked

**16.** Yaxshi Shard Key tanlashning asosiy mezoni nima? / What is the main criterion for choosing a good Shard Key?
A) Past kardinality (kam xilma-xillik) / Low cardinality
B) Har doim AUTO_INCREMENT ustun / Always an AUTO_INCREMENT column
C) Har doim sana (timestamp) ustuni / Always a timestamp column
D) Yuqori kardinality, so'rovlar yukini teng taqsimlaydigan (masalan user_id) / High cardinality that evenly distributes query load (e.g. user_id)

**17.** Token Bucket algoritmida chelakda token qolmasa nima bo'ladi? / In the Token Bucket algorithm, what happens when there are no tokens left?
A) So'rov navbatga qo'yiladi va kutadi / The request is queued and waits
B) So'rov HTTP 429 bilan rad etiladi / The request is rejected with HTTP 429
C) Chelak avtomatik kengayadi / The bucket automatically expands
D) Server qulaydi / The server crashes

**18.** API Gateway ning asosiy vazifalariga nima kiradi? / What are among the key responsibilities of an API Gateway?
A) Faqat statik fayllarni saqlash / Only storing static files
B) Faqat DB indexlarini boshqarish / Only managing DB indexes
C) Routing, Auth/JWT verification, Rate Limiting, SSL Termination / Routing, Auth/JWT verification, Rate Limiting, SSL Termination
D) Faqat video transcoding / Only video transcoding

**19.** Two-Phase Commit (2PC) ning asosiy kamchiligi nima? / What is the main flaw of Two-Phase Commit (2PC)?
A) Sinxron, bloklovchi protokol; koordinator yiqilsa butun tizim muzlab qoladi / It is a synchronous, blocking protocol; if the coordinator fails, the whole system freezes
B) U asinxron va bloklamaydigan protokol / It is asynchronous and non-blocking
C) Faqat bitta serverda ishlaydi / It only works on a single server
D) NoSQL bazalar bilan mos kelmaydi / It is incompatible with NoSQL databases

**20.** Circuit Breaker "Open" holatida nima sodir bo'ladi? / What happens when a Circuit Breaker is in the "Open" state?
A) Barcha so'rovlar normal tarzda tashqi servisga yuboriladi / All requests are sent normally to the external service
B) Faqat sinov so'rovlari yuboriladi / Only trial requests are sent
C) Tizim avtomatik qayta ishga tushadi / The system automatically restarts
D) So'rovlar tashqi servisga yuborilmaydi, darhol Fallback javob qaytariladi / Requests are not sent to the external service; a Fallback response is returned immediately

---

## 🔴 Advanced (21–30)

**21.** CQRS pattern nima uchun ishlatiladi? / Why is the CQRS pattern used?
A) Yozish va o'qish so'rovlarini bitta bazada birlashtirish uchun / To merge read and write queries into a single database
B) O'qish va yozish modellarini/bazalarini alohida ajratib, bir-biriga halaqit bermasligi uchun / To separate read and write models/databases so they don't interfere with each other's performance
C) Faqat DDL buyruqlari uchun / Only for DDL commands
D) Load balancer algoritmi sifatida / As a load balancing algorithm

**22.** Event Sourcing da tizimning joriy holati qanday hosil qilinadi? / How is the current state derived in Event Sourcing?
A) Faqat oxirgi qatorni DB dan o'qish orqali / By reading only the last row from the DB
B) Faqat Snapshotdan, eventlar hech qachon o'qilmaydi / Only from a snapshot; events are never read
C) Barcha voqealarni (events) boshidan oxirigacha qayta ijro etish (replay) orqali / By replaying the full sequence of events from the beginning
D) Har doim tasodifiy generatsiya qilinadi / It is always randomly generated

**23.** Consistent Hashing an'anaviy `hash(key) % N` usulidan nimasi bilan afzal? / How is Consistent Hashing better than traditional `hash(key) % N`?
A) Server qo'shilganda/o'chirilganda faqat K/N ta kalit ko'chadi, massiv cache miss oldini oladi / Only K/N keys are remapped when a node joins/leaves, preventing massive cache misses
B) Server soni o'zgarganda barcha kalitlarni qayta joylashtiradi / It remaps all keys whenever server count changes
C) Faqat bitta serverli tizimlarda ishlaydi / It only works in single-server systems
D) Hash funksiyasidan umuman foydalanmaydi / It doesn't use a hash function at all

**24.** Cache Stampede (Thundering Herd) muammosini qaysi usul hal qiladi? / Which technique solves the Cache Stampede (Thundering Herd) problem?
A) TTL ni butunlay o'chirish / Disabling TTL entirely
B) Bloom Filter ishlatish / Using a Bloom Filter
C) Faqat Write-Around strategiyasi / Only the Write-Around strategy
D) Mutex Lock (Single Flight) yoki Probabilistic Early Expiration / Mutex Lock (Single Flight) or Probabilistic Early Expiration

**25.** CAP teoremasiga ko'ra taqsimlangan tizimda tarmoq bo'linishi (Partition) yuz berganda nima majburiy? / According to CAP theorem, what is mandatory in a distributed system during a network Partition?
A) Consistency har doim Availability dan ustun bo'lishi shart / Consistency must always dominate Availability
B) Partition Tolerance ni qabul qilish shart, tanlov C va A o'rtasida bo'ladi / Partition Tolerance must be accepted; the trade-off is between C and A
C) Availability har doim yo'qotiladi / Availability is always lost
D) Uchala xususiyat ham har doim to'liq ta'minlanadi / All three properties are always fully guaranteed

**26.** PACELC teoremasi CAP dan nimasi bilan farqlanadi? / How does the PACELC theorem differ from CAP?
A) U faqat Partition holatini ko'rib chiqadi / It only considers the Partition case
B) U faqat NoSQL bazalarga tegishli / It only applies to NoSQL databases
C) U tarmoqda uzilish bo'lmagan normal holatda ham Latency va Consistency o'rtasidagi trade-off ni ko'rsatadi / It also shows a Latency vs Consistency trade-off during normal fault-free operation ("Else")
D) U CAP bilan aynan bir xil / It is identical to CAP

**27.** Redis Redlock algoritmida lock muvaffaqiyatli deb hisoblanishi uchun nima talab qilinadi? / In the Redis Redlock algorithm, what is required for a lock to be considered successful?
A) Kamida quorum (masalan 5 tadan 3 tasi) tugunda lock olish, TTL doirasida / Acquiring the lock on a quorum (e.g. 3 of 5) of nodes within the TTL window
B) Faqat 1 ta Redis tugunida lock olish / Acquiring the lock on just 1 Redis node
C) Barcha Redis tugunlari o'chirilishi kerak / All Redis nodes must be shut down
D) Lock hech qachon TTL ga ega bo'lmaydi / The lock never has a TTL

**28.** Raft algoritmida qaysi tugun Leader bo'lib saylanadi? / In the Raft algorithm, which node gets elected Leader?
A) Har doim birinchi ishga tushgan tugun / Always the first node that started
B) Eng kam Term raqamiga ega tugun / The node with the lowest Term number
C) Tasodifiy tanlangan Follower / A randomly chosen Follower
D) Ko'pchilik (quorum) ovozini olgan Candidate tugun / The Candidate node that receives a majority (quorum) of votes

**29.** Saga Pattern Choreography va Orchestration o'rtasidagi farq nima? / What is the difference between Saga Choreography and Orchestration?
A) Choreography da markaziy koordinator servislarga buyruq beradi / In Choreography, a central coordinator commands services
B) Choreography da markaziy boshqaruvchi yo'q, servislar eventlar orqali muloqot qiladi; Orchestration da markaziy Saga Orchestrator boshqaradi / In Choreography there is no central controller — services communicate via events; in Orchestration a central Saga Orchestrator directs everything
C) Ular bir xil narsa / They are the same thing
D) Orchestration faqat 2PC dan foydalanadi / Orchestration only uses 2PC

**30.** Flash Sale (E-Commerce) senariysida Overselling muammosini oldini olish uchun qanday strategiya qo'llaniladi? / In the E-Commerce Flash Sale scenario, what strategy prevents overselling?
A) To'g'ridan-to'g'ri PostgreSQL ga har bir so'rovni yuborish / Sending every request directly to PostgreSQL
B) Stock tekshiruvini butunlay o'chirib qo'yish / Disabling stock checks entirely
C) Stock ni Redis da saqlab, Lua Script orqali atomik tekshirish va kamaytirish (DECRBY) / Keeping stock in Redis and atomically checking/decrementing it via a Lua Script
D) Har bir foydalanuvchiga cheksiz sotib olish huquqi berish / Granting unlimited purchases to every user

---

## ✅ Javoblar / Answer Key

| # | Javob | # | Javob | # | Javob |
|---|---|---|---|---|---|
| 1 | B | 11 | A | 21 | B |
| 2 | C | 12 | D | 22 | C |
| 3 | A | 13 | B | 23 | A |
| 4 | D | 14 | C | 24 | D |
| 5 | B | 15 | A | 25 | B |
| 6 | A | 16 | D | 26 | C |
| 7 | C | 17 | B | 27 | A |
| 8 | D | 18 | C | 28 | D |
| 9 | B | 19 | A | 29 | B |
| 10 | C | 20 | D | 30 | C |

**Natijangizni baholang / Score yourself:**
- 27–30 to'g'ri: Ekspert daraja 🏆 / Expert level
- 21–26 to'g'ri: Ilg'or daraja 🔴 / Advanced level
- 14–20 to'g'ri: O'rta daraja 🟡 / Intermediate level
- <14 to'g'ri: `system_design.md` ni qayta ko'rib chiqing 🟢 / Review `system_design.md`

---

*Tayyorlagan / Prepared by: Alyorjon | interactive_quiz_tester agenti asosida*
