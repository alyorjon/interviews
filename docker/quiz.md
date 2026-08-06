# 🧪 Docker Interaktiv Quiz — Self-Test MCQ
### Ikki tilli qo'llanma / Bilingual Reference

> **Daraja / Level:** 🟢 Basic → 🟡 Intermediate → 🔴 Advanced
> **Format:** Har bir savolda 4 variant, faqat bittasi to'g'ri. Javoblarni oldindan ko'rmang — avval yeching! / Each question has 4 options, only one correct. Don't peek at the answer key — attempt first!
> **Javoblar:** Fayl oxirida / **Answers:** at the end of the file

---

## 🟢 Basic (1–10)

**1.** Docker nima? / What is Docker?
A) Virtual machine yaratish vositasi / A tool for creating virtual machines
B) Ilovalarni izolyatsiyalangan konteynerlarda qurish, yuborish va ishga tushirish uchun ochiq manbali platforma / An open-source platform for building, shipping, and running apps in isolated containers
C) Faqat kod versiyalash tizimi / Only a code version control system
D) Operatsion tizim / An operating system

**2.** Container nima? / What is a Container?
A) To'liq guest OS'ni o'z ichiga olgan og'ir muhit / A heavy environment containing a full guest OS
B) Host OS kernelini ulashadigan yengil, mustaqil ishga tushiriladigan paket / A lightweight, standalone executable package that shares the host OS kernel
C) Faqat Docker Hub'da saqlanadigan fayl / A file stored only on Docker Hub
D) Hypervisor turi / A type of hypervisor

**3.** Docker Image va Docker Container orasidagi farq nima? / Difference between Docker Image and Docker Container?
A) Ular bir xil narsa / They are the same thing
B) Image — statik, faqat o'qish shabloni; Container — image'ning ishlaydigan nusxasi / Image is a static, read-only template; Container is a running instance of an image
C) Container statik, Image dinamik / Container is static, Image is dynamic
D) Image faqat local'da, Container faqat registry'da saqlanadi / Image is stored only locally, Container only in a registry

**4.** Docker Hub nima? / What is Docker Hub?
A) Docker image'larni saqlash va ulashish uchun bulut asosidagi ommaviy registry / A cloud-based public registry for storing and sharing Docker images
B) Dockerfile yozish uchun IDE / An IDE for writing Dockerfiles
C) Faqat xususiy kompaniyalar uchun mo'ljallangan tarmoq / A network only for private companies
D) Container monitoring vositasi / A container monitoring tool

**5.** Docker'da namespace nima uchun ishlatiladi? / What are namespaces used for in Docker?
A) Image'larni siqish uchun / To compress images
B) Containerlar orasida izolyatsiyani ta'minlash uchun (PID, tarmoq, fayl tizimi va h.k.) / To provide isolation between containers (PID, network, filesystem, etc.)
C) Loglarni saqlash uchun / To store logs
D) Portlarni mapping qilish uchun / To map ports

**6.** cgroups (Control Groups) qanday vazifani bajaradi? / What does cgroups do?
A) Container'larga tarmoq nomi beradi / Assigns network names to containers
B) Container resurs ishlatilishini (CPU, xotira, disk I/O) cheklaydi va nazorat qiladi / Limits and controls container resource usage (CPU, memory, disk I/O)
C) Image qatlamlarini keshlaydi / Caches image layers
D) Dockerfile'ni tekshiradi / Validates the Dockerfile

**7.** Docker Container nechta holatda (state) bo'lishi mumkin? / How many states can a Docker container be in?
A) 3: Running, Stopped, Deleted
B) 4: Created, Running, Stopped, Failed
C) 6: Created, Running, Paused, Restarting, Exited, Dead
D) 2: On, Off

**8.** Dockerfile'dan image qurish uchun qaysi buyruq ishlatiladi? / Which command builds an image from a Dockerfile?
A) `docker run -t my-app .`
B) `docker build -t my-app .`
C) `docker create -t my-app .`
D) `docker start -t my-app .`

**9.** Dockerfile nima? / What is a Dockerfile?
A) Ishga tushirilgan container'ning log fayli / A log file of a running container
B) Docker image qurish ko'rsatmalarini o'z ichiga olgan matn fayli; har bir ko'rsatma yangi qatlam yaratadi / A text file with instructions to build an image; each instruction creates a new layer
C) docker-compose.yml faylining boshqa nomi / Another name for docker-compose.yml
D) Faqat production uchun ishlatiladigan konfiguratsiya / A config used only for production

**10.** Dockerfile'da `EXPOSE 8000` ko'rsatmasi nima qiladi? / What does `EXPOSE 8000` do in a Dockerfile?
A) Portni hostga avtomatik map qiladi / Automatically maps the port to the host
B) Container qaysi portni ishlatishini hujjatlashtiradi / Documents which port the container uses
C) Portni yopadi / Closes the port
D) Firewall qoidasini yaratadi / Creates a firewall rule

---

## 🟡 Intermediate (11–20)

**11.** Paused holatdagi container'ni to'g'ridan-to'g'ri `docker rm` bilan o'chirish mumkinmi? / Can you remove a paused container directly with `docker rm`?
A) Ha, har doim mumkin / Yes, always
B) Yo'q — avval Exited holatiga o'tkazish kerak (unpause → stop → rm) / No — it must first be moved to the Exited state (unpause → stop → rm)
C) Faqat root sifatida mumkin / Only as root
D) Faqat `--force` bilan mumkin / Only with `--force`

**12.** Container qayta ishga tushirilganda (`docker restart`) ma'lumotlar nima bo'ladi? / What happens to data when a container is restarted with `docker restart`?
A) Ma'lumotlar yo'qoladi / Data is lost
B) Ma'lumotlar saqlanib qoladi (faqat `docker rm` da yo'qoladi) / Data persists (it's only lost with `docker rm`)
C) Faqat volume ishlatilsagina saqlanadi / Only persists if a volume is used
D) Avtomatik boshqa hostga ko'chiriladi / Automatically migrated to another host

**13.** `.dockerignore` fayli nima uchun kerak? / What is `.dockerignore` for?
A) Container loglarini o'chirish uchun / To delete container logs
B) Build context'dan qaysi fayllarni chiqarib tashlashni belgilaydi (`.gitignore`ga o'xshash) / Specifies which files to exclude from the build context (similar to `.gitignore`)
C) Image'larni signed qilish uchun / To sign images
D) Network konfiguratsiyasi uchun / For network configuration

**14.** Multi-stage build'ning asosiy maqsadi nima? / What is the main purpose of a multi-stage build?
A) Bir nechta container'ni bitta vaqtda ishga tushirish / To run multiple containers at once
B) Bir bosqichda barcha toollar bilan qurib, faqat natijani yengil yakuniy image'ga ko'chirish / Build in one stage with all tools, then copy only the result into a lean final image
C) Image'ni Docker Hub'ga avtomatik push qilish / To automatically push the image to Docker Hub
D) Bir nechta tarmoqqa ulanish / To connect to multiple networks

**15.** `CMD` va `ENTRYPOINT` orasidagi farq nima? / Difference between `CMD` and `ENTRYPOINT`?
A) Ular aynan bir xil ishlaydi / They work exactly the same
B) `ENTRYPOINT` — o'zgarmas asosiy ijrochi, `CMD` — bekor qilinishi mumkin bo'lgan standart argumentlar / `ENTRYPOINT` is the fixed executable, `CMD` provides default arguments that can be overridden
C) `CMD` faqat build vaqtida, `ENTRYPOINT` faqat runtime'da ishlaydi / `CMD` only works at build time, `ENTRYPOINT` only at runtime
D) `ENTRYPOINT` faqat Compose'da ishlatiladi / `ENTRYPOINT` is only used in Compose

**16.** `COPY` va `ADD` orasidagi farq nima? / Difference between `COPY` and `ADD`?
A) `COPY` URL'dan yuklab olishni qo'llab-quvvatlaydi, `ADD` qo'llamaydi / `COPY` supports downloading from URLs, `ADD` doesn't
B) `ADD` — `COPY`dan tashqari URL'dan yuklab olish va tar arxivlarini avtomatik ochishni ham qo'llab-quvvatlaydi; oddiy holatlarda `COPY` tavsiya etiladi / `ADD` supports everything `COPY` does plus downloading URLs and auto-extracting tar archives; `COPY` is preferred for simple cases
C) Ular ikkalasi ham faqat Compose faylida ishlatiladi / Both are only used in Compose files
D) `COPY` faqat matn fayllari uchun ishlaydi / `COPY` works only with text files

**17.** Layer keshlashdan samarali foydalanish uchun Dockerfile'da to'g'ri tartib qaysi? / For effective layer caching, what's the correct Dockerfile order?
A) Avval butun kodni COPY qilish, keyin pip install / Copy the whole codebase first, then pip install
B) Avval `requirements.txt`ni COPY qilib `pip install` bajarish, keyin qolgan kodni COPY qilish / Copy `requirements.txt` and run `pip install` first, then copy the rest of the code
C) Tartib muhim emas / Order doesn't matter
D) Avval CMD, keyin FROM / CMD first, then FROM

**18.** Docker Compose nima uchun ishlatiladi? / What is Docker Compose used for?
A) Faqat bitta container qurish uchun / For building a single container only
B) Bitta YAML fayl orqali ko'p-containerli ilovalarni aniqlash va bitta buyruq bilan ishga tushirish uchun / For defining and running multi-container applications from a single YAML file with one command
C) Image'larni Docker Hub'da qidirish uchun / For searching images on Docker Hub
D) Faqat tarmoq monitoring uchun / Only for network monitoring

**19.** `depends_on` (condition ko'rsatilmasa) nimani ta'minlaydi va nimani ta'minlamaydi? / What does plain `depends_on` (without a condition) guarantee, and what doesn't it guarantee?
A) Service tayyor bo'lishini ham kafolatlaydi / It also guarantees the service is ready
B) Faqat ishga tushish tartibini ta'minlaydi, lekin service **tayyor** bo'lishini kutmaydi / It only ensures startup order, but doesn't wait for the service to be **ready**
C) Hech qanday tartibni ta'minlamaydi / It guarantees no ordering at all
D) Faqat production rejimida ishlaydi / It only works in production mode

**20.** `docker compose up -d --scale api=3` nima qiladi? / What does `docker compose up -d --scale api=3` do?
A) api service'ning 3 ta nusxasini ishga tushiradi / Runs 3 instances of the api service
B) api service'ni 3 marta qayta ishga tushiradi / Restarts the api service 3 times
C) api service'ga 3 ta port qo'shadi / Adds 3 ports to the api service
D) 3 soniyalik health check o'rnatadi / Sets a 3-second health check

---

## 🔴 Advanced (21–30)

**21.** Docker'ning standart (default) tarmoq drayveri qaysi va u nimani ta'minlaydi? / What is Docker's default network driver and what does it provide?
A) host — host tarmoq stekini ulashadi / host — shares the host network stack
B) bridge — bitta hostda izolyatsiyalangan tarmoq / bridge — isolated network on a single host
C) overlay — ko'p-host tarmog'i / overlay — multi-host networking
D) none — tarmoqsiz / none — no networking

**22.** Qaysi tarmoq turi container'ni host'ning tarmoq stekini to'g'ridan-to'g'ri ulashishga majbur qiladi? / Which network type makes a container directly share the host's network stack?
A) bridge
B) host
C) macvlan
D) none

**23.** Docker volume'lar host'da standart holatda qayerda saqlanadi? / Where are Docker volumes stored on the host by default?
A) `/home/docker/volumes/`
B) `/var/lib/docker/volumes/`
C) `/tmp/docker/volumes/`
D) `/etc/docker/volumes/`

**24.** Volume, Bind Mount va tmpfs orasida qaysi biri container to'xtaganda ma'lumotni yo'qotadi? / Among Volume, Bind Mount, and tmpfs, which one loses data when the container stops?
A) Volume
B) Bind Mount
C) tmpfs
D) Barchasi / All of them

**25.** Qaysi restart policy container'ni qo'lda to'xtatilmaguncha (host qayta yuklansa ham) doim qayta ishga tushiradi? / Which restart policy always restarts a container (even after a host reboot) unless it was manually stopped?
A) `no`
B) `on-failure`
C) `unless-stopped`
D) `always-if-running`

**26.** `HEALTHCHECK`ning mumkin bo'lgan holatlari qaysilar? / What are the possible `HEALTHCHECK` statuses?
A) `ok`, `error`
B) `starting`, `healthy`, `unhealthy`
C) `pending`, `running`, `stopped`
D) `green`, `yellow`, `red`

**27.** Nega `docker commit` production uchun tavsiya etilmaydi? / Why is `docker commit` not recommended for production?
A) U ishlamaydi / It doesn't work
B) U faqat Windows'da ishlaydi / It only works on Windows
C) Ishlaydigan container holatidan qo'lda image yaratadi — takrorlanmaydigan jarayon; Dockerfile tavsiya etiladi / It manually snapshots a running container's state — a non-reproducible process; a Dockerfile is recommended instead
D) Faqat root foydalanuvchi uchun ishlaydi / It only works for the root user

**28.** `docker system prune -a --volumes` buyrug'i nima qiladi? / What does `docker system prune -a --volumes` do?
A) Faqat to'xtatilgan containerlarni o'chiradi / Only removes stopped containers
B) Faqat dangling image'larni o'chiradi / Only removes dangling images
C) Ishlatilmayotgan barcha containerlar, image'lar, tarmoqlar VA volume'larni o'chiradi ⚠️ / Removes all unused containers, images, networks, AND volumes ⚠️
D) Faqat log fayllarini tozalaydi / Only cleans log files

**29.** `ENTRYPOINT ["gunicorn"]` va `CMD ["--workers=4", "main:app"]` berilgan bo'lsa, `docker run my-app --workers=2 main:app` buyrug'i qanday bajariladi? / Given `ENTRYPOINT ["gunicorn"]` and `CMD ["--workers=4", "main:app"]`, what does `docker run my-app --workers=2 main:app` execute?
A) `gunicorn --workers=4 main:app` (CMD o'zgarmaydi / CMD stays unchanged)
B) `gunicorn --workers=2 main:app` (runtime argumentlari CMD'ni to'liq bekor qiladi / runtime args fully override CMD)
C) Xatolik chiqaradi / Throws an error
D) Faqat `--workers=2` ishga tushadi / Only `--workers=2` runs

**30.** PID 1 sifatida ishlayotgan ilova nega SIGTERM signalini to'g'ri qabul qilmasligi mumkin va bu qanday hal qilinadi? / Why might an app running as PID 1 fail to handle SIGTERM properly, and how is this fixed?
A) Bu hech qachon muammo emas / This is never a problem
B) Init tizimi bo'lmagani uchun signal to'g'ri qabul qilinmasligi mumkin; `tini` yoki `docker run --init` ishlatish tavsiya etiladi / Without an init system, the signal may not be handled correctly; using `tini` or `docker run --init` is recommended
C) Faqat Windows containerlarida yuzaga keladi / It only happens on Windows containers
D) `EXPOSE` ko'rsatmasi bilan hal qilinadi / It's fixed with the `EXPOSE` instruction

---

## ✅ Javoblar / Answer Key

| # | Javob | # | Javob | # | Javob |
|---|---|---|---|---|---|
| 1 | B | 11 | B | 21 | B |
| 2 | B | 12 | B | 22 | B |
| 3 | B | 13 | B | 23 | B |
| 4 | A | 14 | B | 24 | C |
| 5 | B | 15 | B | 25 | C |
| 6 | B | 16 | B | 26 | B |
| 7 | C | 17 | B | 27 | C |
| 8 | B | 18 | B | 28 | C |
| 9 | B | 19 | B | 29 | B |
| 10 | B | 20 | A | 30 | B |

**Natijangizni baholang / Score yourself:**
- 27–30 to'g'ri: Ekspert daraja 🏆 / Expert level
- 21–26 to'g'ri: Ilg'or daraja 🔴 / Advanced level
- 14–20 to'g'ri: O'rta daraja 🟡 / Intermediate level
- <14 to'g'ri: `docker/basics.md` ni qayta ko'rib chiqing 🟢 / Review `docker/basics.md`

---

*Tayyorlagan / Prepared by: Alyorjon | interactive_quiz_tester agenti asosida*
