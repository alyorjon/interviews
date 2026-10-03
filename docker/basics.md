# 🐳 Docker intervyu savollari va javoblari / Docker Interview Questions

> **Nima bu:** Docker — asoslardan ekspert darajasigacha: image va konteynerlar, Dockerfile, Compose, tarmoq, volume'lar, xavfsizlik va production amaliyotlari.  
> **Har bir javob tartibi:** oddiy tilda → batafsilroq (EN/UZ va buyruqlar) → intervyuda qanday aytasiz.  
> **Holat (2026-yil sentabr):** Compose v2 (`docker compose`, `version:` kaliti eskirgan), BuildKit standart, cgroups v2, Docker Content Trust to'xtatilmoqda (Cosign/Notation).

---

# Asoslar | Basics

---

## Q1. What is Docker? | Docker nima?

**Oddiy qilib aytganda:** Docker — dasturni unga kerak bo'lgan hamma narsa (kutubxonalar, sozlamalar) bilan bitta 'quti'ga — konteynerga — joylash vositasi. Shu quti sizning kompyuteringizda ham, serverda ham bir xil ishlaydi: 'menda ishlaydi-ku' muammosi yo'qoladi.

**Batafsilroq:**

**EN:** Docker is an open-source containerization platform used for building, shipping, and running applications inside isolated environments called containers. It ensures that software runs the same way regardless of where it is deployed.

**UZ:** Docker — ilovalarni izolyatsiyalangan muhitda (container) yaratish, yuborish va ishga tushirish uchun mo'ljallangan ochiq manbali platforma. Dastur qayerda ishga tushirilmasin, bir xil ishlashini kafolatlaydi.

```bash
# Docker versiyasini tekshirish | Check Docker version
docker --version
# Docker version 26.1.0, build 123456

# Docker ma'lumotlari | Docker info
docker info
```

**Intervyuda shunday ayting:** "Docker — OCI standartidagi image'larni quruvchi va konteynerlarni ishga tushiruvchi platforma: Linux namespace'lar izolyatsiya, cgroups esa resurs chegaralarini beradi. Asosiy qiymati — muhitlar orasida takrorlanuvchanlik va tez deploy. Productionda konteynerlarni odatda orkestrator (Kubernetes) boshqaradi."

---

## Q2. What is a Container? | Container nima?

**Oddiy qilib aytganda:** Konteyner — image'dan ishga tushirilgan, boshqalardan ajratilgan jarayon: o'z fayllari, tarmog'i va jarayonlar ro'yxatini 'ko'radi', lekin kompyuterning yadrosini boshqalar bilan bo'lishadi. Shuning uchun u bir necha soniyada ishga tushadi va kam joy oladi.

**Batafsilroq:**

**EN:** A container is a lightweight, standalone, executable package that includes everything needed to run an application — code, runtime, libraries, environment variables, and config files. Containers share the host OS kernel, making them much lighter than VMs.

**UZ:** Container — ilovani ishga tushirish uchun zarur bo'lgan hamma narsani (kod, runtime, kutubxonalar, o'zgaruvchilar, konfiguratsiya) o'z ichiga olgan yengil, mustaqil paket. Containerlar host OS kernelini ulashadilar — shuning uchun VM'larga qaraganda ancha yengildir.

```
[Container]              [Virtual Machine]
┌─────────────┐         ┌─────────────┐
│ App         │         │ App         │
│ Libraries   │         │ Libraries   │
│ Runtime     │         │ Guest OS    │
├─────────────┤         │ (full OS)   │
│ Docker      │         ├─────────────┤
│ Engine      │         │ Hypervisor  │
├─────────────┤         ├─────────────┤
│ Host OS     │         │ Host OS     │
│ Kernel      │         │             │
└─────────────┘         └─────────────┘
Lightweight ✅           Heavy ❌
Fast start ✅            Slow start ❌
```

**Intervyuda shunday ayting:** "Konteyner — namespace'lar bilan izolyatsiya qilingan va cgroups bilan cheklangan oddiy Linux jarayoni, image'ning yozish uchun qatlami bilan. U vaqtinchalik (ephemeral) deb qaraladi: holatni volume yoki tashqi xizmatlarda saqlayman, konteynerning o'zini istalgan paytda almashtirish mumkin bo'lishi kerak."

---

## Q3. What is the difference between Docker and a Virtual Machine? | Docker va Virtual Machine farqi nima?

**Oddiy qilib aytganda:** Virtual mashina — butun boshli kompyuterni (o'z operatsion tizimi bilan) taqlid qiladi: og'ir, sekin ishga tushadi, lekin juda yaxshi ajratilgan. Konteyner esa mavjud OS yadrosini bo'lishib, faqat ilovani ajratadi: yengil va tez, lekin ajratish kuchsizroq.

**Batafsilroq:**

**EN:** Containers share the host OS kernel and are lightweight. VMs include a full guest OS and are heavier and slower to start.

**UZ:** Containerlar host OS kernelini ulashadi va yengildir. VM'lar to'liq guest OS ni o'z ichiga oladi — og'irroq va sekinroq ishga tushadi.

| Feature           | Docker Container       | Virtual Machine     |
| ----------------- | ---------------------- | ------------------- |
| EN: OS            | Shares host kernel     | Full guest OS       |
| UZ: OS            | Host kernelni ulashadi | To'liq guest OS     |
| EN: Size          | MBs                    | GBs                 |
| UZ: Hajm          | MB                     | GB                  |
| EN: Startup       | Seconds                | Minutes             |
| UZ: Ishga tushish | Soniyalar              | Daqiqalar           |
| EN: Performance   | Near native            | Slower              |
| UZ: Unumdorlik    | Deyarli native         | Sekinroq            |
| EN: Isolation     | Process-level          | Hardware-level      |
| UZ: Izolyatsiya   | Jarayon darajasida     | Hardware darajasida |

**Intervyuda shunday ayting:** "VM gipervizor ustida to'liq OS bilan ishlaydi — kuchli izolyatsiya, lekin gigabaytlar va daqiqalar. Konteyner host yadrosini bo'lishadi — megabaytlar va soniyalar, lekin yadro zaifligi barcha konteynerlarga ta'sir qiladi. Ko'p o'rinli (multi-tenant) ishonchsiz kod uchun VM yoki gVisor/Kata kabi qo'shimcha izolyatsiya."

---

## Q4. What is Docker Architecture? | Docker Arxitekturasi nima?

**Oddiy qilib aytganda:** Docker bir necha qismdan iborat: siz buyruq yozadigan **CLI**, buyruqni bajaradigan fon xizmati **dockerd**, konteynerlarni boshqaradigan **containerd** va konteynerni haqiqatan ishga tushiradigan kichik dastur **runc**. Image'lar esa **registry**'da (Docker Hub) saqlanadi.

**Batafsilroq:**

**EN:** Docker uses a client-server architecture consisting of: Docker Client, Docker Daemon, Docker Registry, and Docker Objects (images, containers, volumes, networks).

**UZ:** Docker client-server arxitekturasidan foydalanadi: Docker Client, Docker Daemon, Docker Registry va Docker Objects (image, container, volume, network).

```
[Docker Client]  ---REST API--->  [Docker Daemon (dockerd)]
  docker build                         |
  docker run                    ┌──────┴──────┐
  docker pull                   │             │
                            [Images]    [Containers]
                                         |
                            [Docker Registry (Docker Hub)]
```

```bash
# Client daemon bilan muloqot | Client talks to daemon
docker ps       # Client daemon'ga so'rov yuboradi | Client sends request to daemon
```

**Qo'shimcha — Docker System Architecture: dockerd, containerd, runc, shim explained:**

**EN:** `dockerd` handles high-level API; `containerd` manages container lifecycle; `runc` executes containers according to OCI specs; `containerd-shim` allows daemonless containers.

**UZB:** `dockerd` API so'rovlarini qabul qiladi; `containerd` hayot tsiklini boshqaradi; `runc` konteynerni ishga tushiradi; `containerd-shim` esa daemon o'chganda ham konteynerni tirik tutadi.

**Intervyuda shunday ayting:** "Zanjir: CLI → Docker Engine API (dockerd) → containerd → shim → runc (OCI runtime). containerd va runc — mustaqil loyihalar, Kubernetes ham to'g'ridan-to'g'ri containerd bilan ishlaydi (dockershim olib tashlangan). Shim konteynerni dockerd qayta ishga tushganda ham tirik saqlaydi."

---

## Q5. What is Docker Hub? | Docker Hub nima?

**Oddiy qilib aytganda:** Docker Hub — image'lar 'do'koni': tayyor image'larni (postgres, nginx, python) yuklab olasiz va o'zingiznikini yuklaysiz. Rasmiy (Official) image'lar tekshirilgan va muntazam yangilanadi.

**Batafsilroq:**

**EN:** Docker Hub is a cloud-based public registry where Docker images are stored and shared. It's like GitHub but for Docker images.

**UZ:** Docker Hub — Docker image'larni saqlash va ulashish uchun bulut asosidagi ommaviy registry. GitHub'ga o'xshash, lekin Docker image'lari uchun.

```bash
# Docker Hub'dan image yuklash | Pull image from Docker Hub
docker pull nginx

# Docker Hub'ga login | Login to Docker Hub
docker login

# O'z image'ingizni push qilish | Push your image
docker push username/my-app:1.0
```

**Intervyuda shunday ayting:** "Docker Hub — ommaviy registry; productionda image'larni imkon qadar rasmiy yoki tasdiqlangan manbalardan olaman, teg o'rniga digest bilan qotiraman va o'z image'larimni xususiy registry'da (GHCR, ECR, Harbor) saqlayman. Anonim pull limitlarini ham hisobga olaman."

---

## Q6. What are the main features of Docker? | Docker'ning asosiy xususiyatlari nima?

**Oddiy qilib aytganda:** Docker'ning asosiy afzalliklari: hamma joyda bir xil ishlash, tez ishga tushish, yengil (VM'dan ko'ra), ilovalarni bir-biridan ajratish, image'larni versiyalash va oson ulashish.

**Batafsilroq:**

**EN:** Containerization, portability, resource efficiency, isolation, versioning, and rapid deployment.

**UZ:** Konteynerizatsiya, ko'chma muvofiqligi, resurs samaradorligi, izolyatsiya, versiyalash va tez deployment.

```bash
# Portability namoyon | Portability demonstrated
# Dev mashinada build qiling | Build on dev machine
docker build -t my-app .

# Production serverda ishga tushiring | Run on production server
docker run -d -p 80:8000 my-app
# EN: Works exactly the same! | UZ: Aynan bir xil ishlaydi!
```

**Intervyuda shunday ayting:** "Asosiy foyda — takrorlanuvchan build va deploy artefakti: bitta image dev, CI va production'da. Bu CI/CD'ni soddalashtiradi va rollback'ni oson qiladi (oldingi image tegiga qaytish). Cheklovlari: izolyatsiya VM'dan kuchsiz, holatli ilovalar uchun qo'shimcha e'tibor kerak."

---

## Q7. What is a Docker Namespace? | Docker Namespace nima?

**Oddiy qilib aytganda:** Namespace — konteynerga 'faqat o'zingni ko'r' deydigan Linux mexanizmi. Har konteyner o'z jarayonlar ro'yxatini (PID), tarmog'ini (NET), fayl tizimini (MNT), hostname'ini (UTS) va foydalanuvchilarini (USER) alohida ko'radi — go'yo u yolg'iz.

**Batafsilroq:**

**EN:** Namespaces are a Linux kernel feature that Docker uses to provide isolation between containers. Each container gets its own namespace for PIDs, network, file system, users, etc.

**UZ:** Namespace — Docker containerlar orasida izolyatsiyani ta'minlash uchun foydalanadigan Linux kernel xususiyati. Har bir container PID, tarmoq, fayl tizimi, foydalanuvchilar uchun o'z namespace'ini oladi.

| Namespace | EN                   | UZ                          |
| --------- | -------------------- | --------------------------- |
| PID       | Process isolation    | Jarayon izolyatsiyasi       |
| NET       | Network isolation    | Tarmoq izolyatsiyasi        |
| MNT       | Filesystem isolation | Fayl tizimi izolyatsiyasi   |
| UTS       | Hostname isolation   | Hostname izolyatsiyasi      |
| IPC       | Inter-process comm.  | Jarayonlar aro muloqot      |
| USER      | User isolation       | Foydalanuvchi izolyatsiyasi |

**Intervyuda shunday ayting:** "Namespace'lar ko'rinishni ajratadi: pid, net, mnt, uts, ipc, user, cgroup. User namespace konteyner ichidagi root'ni hostda imtiyozsiz foydalanuvchiga xaritalaydi — xavfsizlik uchun muhim. Namespace'lar resursni cheklamaydi — buni cgroups qiladi."

---

## Q8. What is cgroups in Docker? | Docker'da cgroups nima?

**Oddiy qilib aytganda:** cgroups — konteyner qancha resurs ishlata olishini cheklaydigan Linux mexanizmi: 'bu konteyner ko'pi bilan 512 MB xotira va 1 ta CPU yadrosi ishlatsin'. Cheklov bo'lmasa, bitta konteyner butun serverni egallab olishi mumkin.

**Batafsilroq:**

**EN:** Control Groups (cgroups) is a Linux kernel feature that limits, accounts for, and isolates resource usage (CPU, memory, disk I/O) of containers.

**UZ:** Control Groups (cgroups) — containerlarga ajratiladigan resurslarni (CPU, xotira, disk I/O) cheklash va nazorat qiluvchi Linux kernel xususiyati.

```bash
# Container uchun memory va CPU chegaralash | Limit memory and CPU for container
docker run -d \
  --memory="512m" \
  --cpus="0.5" \
  --name my-limited-app \
  nginx

# EN: Container can use max 512MB RAM and 50% of one CPU core
# UZ: Container max 512MB RAM va 1 CPU core'ning 50%ini ishlatishi mumkin
```

**Qo'shimcha — Docker Cgroups v1 vs Cgroups v2 Differences:**

**EN:** Cgroups v2 provides a unified hierarchy, better resource management (e.g. memory pressure monitoring), and improved rootless support.

**UZB:** Cgroups v2 yagona iyerarxiya va xotira boshqaruvida yuqori unumdorlikni ta'minlaydi.

**Intervyuda shunday ayting:** "cgroups CPU, xotira, I/O va PID sonini cheklaydi va hisobga oladi. Zamonaviy distributivlar cgroups v2 (yagona ierarxiya, aniqroq xotira hisobi) ishlatadi. Konteynerlarga doim xotira chegarasi qo'yaman — aks holda bitta sizuvchi ilova host'ni OOM'ga olib keladi."

---

# Image va Container

---

## Q9. What is a Docker Image? | Docker Image nima?

**Oddiy qilib aytganda:** Image — konteyner uchun 'qolip' yoki 'chizma': ilova kodi, kutubxonalar va sozlamalar qatlam-qatlam yig'ilgan, o'zgarmas paket. Undan istalgancha bir xil konteyner ishga tushirish mumkin.

**Batafsilroq:**

**EN:** A Docker image is a read-only template used to create containers. It contains the application code, runtime, libraries, and all dependencies. Images are built in layers.

**UZ:** Docker image — containerlar yaratish uchun ishlatiladigan faqat o'qish (read-only) shabloni. U dastur kodi, runtime, kutubxonalar va barcha bog'liqliklarni o'z ichiga oladi. Image'lar qatlamlar (layers) orqali quriladi.

```bash
# Barcha image'larni ko'rish | List all images
docker images

# REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
# nginx         latest    a99a39d070bf   2 weeks ago    192MB
# python        3.11      abc123def456   1 month ago    920MB

# Image haqida batafsil ma'lumot | Detailed image info
docker inspect nginx
```

**Intervyuda shunday ayting:** "Image — faqat o'qiladigan qatlamlar va konfiguratsiyadan iborat OCI artefakt, har qatlam oldingisiga nisbatan o'zgarish. Qatlamlar kontent-hash bilan aniqlanadi va image'lar orasida bo'lishiladi. Productionda teg emas, digest (`@sha256:...`) bilan qotiraman — teg ko'chishi mumkin."

---

## Q10. What is the difference between Docker Image and Docker Container? | Docker Image va Docker Container farqi nima?

**Oddiy qilib aytganda:** Image — retsept (o'zgarmas), konteyner — shu retsept bo'yicha pishirilgan taom (ishlayotgan nusxa). Bitta image'dan ko'p konteyner yaratish mumkin, har biri o'z o'zgarishlarini o'zining yuqori qatlamida saqlaydi.

**Batafsilroq:**

**EN:** An image is a static blueprint (like a class in OOP). A container is a running instance of an image (like an object).

**UZ:** Image — statik shablon (OOP'dagi classga o'xshash). Container — image'ning ishlaydigan nusxasi (objectga o'xshash).

|     | Image                 | Container         |
| --- | --------------------- | ----------------- |
| EN  | Read-only template    | Running instance  |
| UZ  | Faqat o'qish shabloni | Ishlaydigan nusxa |
| EN  | Static, blueprint     | Dynamic, real     |
| UZ  | Statik, loyiha        | Dinamik, haqiqiy  |
| EN  | Stored in registry    | Runs on host      |
| UZ  | Registry'da saqlanadi | Hostda ishlaydi   |

```bash
# Image'dan container yaratish | Create container from image
docker run nginx               # image → container

# Bir image'dan ko'p container | Multiple containers from one image
docker run --name web1 nginx
docker run --name web2 nginx
docker run --name web3 nginx
```

**Intervyuda shunday ayting:** "Image — o'zgarmas shablon, konteyner — uning ustiga yoziladigan qatlam qo'shilgan ishlayotgan nusxa. Konteynerni o'chirsangiz, yozuv qatlami ham yo'qoladi — shuning uchun doimiy ma'lumot volume'da bo'lishi kerak."

---

## Q11. What are the states of a Docker Container? | Docker Container holatlari qanday?

**Oddiy qilib aytganda:** Konteyner hayoti: yaratilgan (created) → ishlayapti (running) → to'xtatilgan pauza (paused) → to'xtagan (exited) → o'chirilgan. `docker ps -a` barcha konteynerlar va ularning holatini ko'rsatadi.

**Batafsilroq:**

**EN:** A container can be in one of six states: Created, Running, Paused, Restarting, Exited, Dead.

**UZ:** Container oltita holatdan birida bo'lishi mumkin: Created, Running, Paused, Restarting, Exited, Dead.

```bash
# Container holati | Container state
docker ps       # Faqat ishlaydigan | Only running
docker ps -a    # Barcha holatlar | All states

# CONTAINER ID   IMAGE   STATUS
# abc123         nginx   Up 2 hours        <- Running
# def456         redis   Exited (0)        <- Exited
# ghi789         mysql   Paused            <- Paused

# Holatlarni boshqarish | Manage states
docker start  <id>    # Created/Exited → Running
docker pause  <id>    # Running → Paused
docker unpause <id>   # Paused → Running
docker stop   <id>    # Running → Exited (graceful)
docker kill   <id>    # Running → Exited (force)
docker rm     <id>    # Exited → deleted
```

**Intervyuda shunday ayting:** "Holatlar: created, running, paused, restarting, exited, dead. `exited` dagi chiqish kodi sababni ko'rsatadi (137 — SIGKILL/OOM, 143 — SIGTERM). Restart policy va health status bilan birga kuzatib, qayta-qayta yiqilayotgan konteynerni aniqlayman."

---

## Q12. How to create and run a Docker Container? | Docker Container qanday yaratiladi va ishga tushiriladi?

**Oddiy qilib aytganda:** Konteyner yaratish va ishga tushirish: `docker run -d -p 8080:80 --name web nginx` — nginx image'idan `web` nomli konteynerni fonda ishga tushiradi va kompyuteringizning 8080-portini konteynerning 80-portiga ulaydi.

**Batafsilroq:**

**EN:** Use `docker run` to create and start a container from an image.

**UZ:** Image'dan container yaratib ishga tushirish uchun `docker run` ishlatiladi.

```bash
# Asosiy | Basic
docker run nginx

# Fonda ishlatish | Run in background (detached)
docker run -d nginx

# Port mapping bilan | With port mapping
docker run -d -p 8080:80 nginx
# host:8080 → container:80

# Nom berish | With name
docker run -d -p 8080:80 --name my-nginx nginx

# Muhit o'zgaruvchilari | Environment variables
docker run -d \
  -e POSTGRES_DB=mydb \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  --name my-postgres \
  postgres:15

# Interaktiv terminal | Interactive terminal
docker run -it ubuntu /bin/bash
```

**Intervyuda shunday ayting:** "`docker run` = create + start. Muhim flaglar: `-d`, `--name`, `-p`, `-v`/`--mount`, `-e`/`--env-file`, `--restart`, `--memory`, `--read-only`, `--user`. Takrorlanadigan sozlamalarni qo'lda buyruq o'rniga Compose faylida saqlayman."

---

## Q13. How to build a Docker Image? | Docker Image qanday quriladi?

**Oddiy qilib aytganda:** Image qurish: loyiha papkasida `Dockerfile` yozasiz va `docker build -t myapp:1.0 .` buyrug'ini berasiz. Docker Dockerfile'dagi qadamlarni birma-bir bajarib, har biridan qatlam yasaydi.

**Batafsilroq:**

**EN:** Write a Dockerfile and use `docker build` to create an image from it.

**UZ:** Dockerfile yozing va `docker build` bilan image qurishingiz mumkin.

```bash
# Image qurish | Build image
docker build -t my-app:1.0 .

# -t = tag (nom:version | name:version)
# .  = Dockerfile shu papkada | Dockerfile is in current dir

# Boshqa nom bilan | Different Dockerfile name
docker build -f Dockerfile.prod -t my-app:prod .

# Build argumentlari bilan | With build arguments
docker build --build-arg ENV=production -t my-app:prod .

# Qurilgan image'larni ko'rish | See built images
docker images | grep my-app
```

**Intervyuda shunday ayting:** "`docker build` BuildKit bilan ishlaydi: parallel bosqichlar, kesh mount'lar, build sirlari. Build kontekstini `.dockerignore` bilan kichik tutaman, tegni versiya yoki git SHA bilan beraman va CI'da ko'p platformali build uchun `docker buildx build` ishlataman."

---

## Q14. Can you remove a paused container? | Paused containerni o'chirish mumkinmi?

**Oddiy qilib aytganda:** Pauza qilingan konteynerni to'g'ridan-to'g'ri o'chirib bo'lmaydi: avval uni to'xtatish kerak. `docker unpause` va `docker stop` dan keyin `docker rm`, yoki `docker rm -f` bilan majburan.

**Batafsilroq:**

**EN:** No. A container must be in the **stopped (Exited)** state before it can be removed.

**UZ:** Yo'q. Container o'chirilishidan oldin **to'xtatilgan (Exited)** holatda bo'lishi kerak.

```bash
# Noto'g'ri | Wrong — paused containerni o'chirish | delete paused container
docker rm my-container   # Error!

# To'g'ri | Correct
docker unpause my-container   # Paused → Running
docker stop my-container      # Running → Exited
docker rm my-container        # Exited → deleted

# yoki to'g'ridan-to'g'ri | or directly
docker stop my-container && docker rm my-container

# Barcha to'xtatilgan containerlarni o'chirish | Remove all stopped containers
docker container prune
```

**Intervyuda shunday ayting:** "Paused konteyner jarayonlari cgroup freezer bilan muzlatilgan; `docker rm` uni rad etadi, `docker rm -f` esa o'ldiradi va o'chiradi. Pauza — vaqtinchalik holat (masalan, snapshot uchun), uzoq muddatli to'xtatish uchun `stop`."

---

## Q15. Will you lose data when a Docker container exits? | Container to'xtasa ma'lumotlar yo'qoladimi?

**Oddiy qilib aytganda:** Konteyner shunchaki to'xtasa (`stop`), uning ichidagi ma'lumot saqlanib qoladi. Lekin konteyner **o'chirilsa** (`rm`), ichidagi hamma o'zgarish yo'qoladi. Doimiy ma'lumot uchun volume ishlatish kerak.

**Batafsilroq:**

**EN:** No. Data written to the container filesystem persists until the container is explicitly deleted. However, for permanent data storage, use **volumes**.

**UZ:** Yo'q. Container fayl tizimiga yozilgan ma'lumotlar container aniq o'chirilmaguncha saqlanadi. Lekin doimiy saqlash uchun **volume** ishlatish kerak.

```bash
# Container qayta ishga tushirilganda ma'lumot qoladi | Data persists on restart
docker restart my-container   # ✅ Data safe

# Container o'chirilganda ma'lumot yo'qoladi | Data lost when removed
docker rm my-container        # ❌ Data gone

# Doimiy saqlash uchun volume | For permanent storage use volume
docker run -d \
  -v my-data:/var/lib/postgresql/data \
  postgres:15
```

**Intervyuda shunday ayting:** "Yozuv qatlami konteyner o'chirilguncha yashaydi. Baza, yuklangan fayllar kabi doimiy ma'lumotni named volume yoki tashqi xizmatda saqlayman — konteyner istalgan paytda qayta yaratilishi mumkin deb loyihalayman."

---

## Q16. How to copy files between host and container? | Host va container orasida fayllarni qanday ko'chirish mumkin?

**Oddiy qilib aytganda:** `docker cp` — kompyuter va konteyner orasida fayl ko'chirish: `docker cp app:/var/log/app.log ./` — konteynerdan olish, `docker cp config.yml app:/etc/app/` — konteynerga qo'yish.

**Batafsilroq:**

**EN:** Use `docker cp` to copy files in both directions.

**UZ:** Ikki yo'nalishda ham fayl ko'chirish uchun `docker cp` ishlatiladi.

```bash
# Host → Container
docker cp ./config.py my-container:/app/config.py

# Container → Host
docker cp my-container:/app/logs/app.log ./local-logs/

# EN: Useful for debugging without rebuilding image
# UZ: Image'ni qayta qurmasdan debug qilishda foydali
```

**Intervyuda shunday ayting:** "`docker cp` debugging va bir martalik ishlar uchun. Doimiy fayl almashinuvi uchun bind mount yoki volume; konfiguratsiya uchun esa image'ga qo'shish, env yoki Compose/Kubernetes config/secret mexanizmlari. Ishlayotgan production konteynerni qo'lda o'zgartirmayman."

---

# Dockerfile

---

## Q17. What is a Dockerfile? | Dockerfile nima?

**Oddiy qilib aytganda:** Dockerfile — image qanday qurilishini aytadigan retsept fayli: qaysi bazaviy image'dan boshlash (`FROM`), qaysi fayllarni nusxalash (`COPY`), qanday buyruqlarni bajarish (`RUN`) va konteyner ishga tushganda nima ishlashi (`CMD`).

**Batafsilroq:**

**EN:** A Dockerfile is a text script containing instructions to build a Docker image. Each instruction creates a new layer in the image.

**UZ:** Dockerfile — Docker image qurish bo'yicha ko'rsatmalar to'plamini o'z ichiga olgan matn fayli. Har bir ko'rsatma image'da yangi qatlam (layer) yaratadi.

```dockerfile
# Dockerfile namunasi | Dockerfile example (FastAPI app)

# 1. Base image | Asosiy image
FROM python:3.11-slim

# 2. Metadata
LABEL maintainer="alyorjon@example.com"
LABEL version="1.0"

# 3. Muhit o'zgaruvchisi | Environment variable
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# 4. Ish papkasi | Working directory
WORKDIR /app

# 5. Bog'liqliklarni ko'chirish va o'rnatish | Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 6. Dastur kodini ko'chirish | Copy app code
COPY . .

# 7. Port ochish | Expose port
EXPOSE 8000

# 8. Ishga tushirish | Start command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Intervyuda shunday ayting:** "Dockerfile — takrorlanuvchan build retsepti. Yaxshi Dockerfile: aniq va kichik bazaviy image, bog'liqliklar kodni nusxalashdan oldin (kesh uchun), multi-stage build, root bo'lmagan `USER`, exec shaklidagi `CMD`/`ENTRYPOINT`. Hadolint bilan lint qilaman."

---

## Q18. What are common Dockerfile instructions? | Dockerfile'dagi asosiy ko'rsatmalar nima?

**Oddiy qilib aytganda:** Asosiy Dockerfile buyruqlari: `FROM` — boshlang'ich image, `WORKDIR` — ishchi papka, `COPY` — fayl nusxalash, `RUN` — buyruq bajarish (qatlam yaratadi), `ENV` — muhit o'zgaruvchisi, `EXPOSE` — port haqida hujjat, `USER` — foydalanuvchi, `CMD`/`ENTRYPOINT` — ishga tushirish buyrug'i.

**Batafsilroq:**

**EN / UZ:**

| Instruction   | EN                            | UZ                       | Example                                     |
| ------------- | ----------------------------- | ------------------------ | ------------------------------------------- |
| `FROM`        | Base image                    | Asosiy image             | `FROM python:3.11`                          |
| `RUN`         | Execute command during build  | Qurish paytida buyruq    | `RUN pip install flask`                     |
| `CMD`         | Default command at runtime    | Ishga tushirish buyrug'i | `CMD ["python", "app.py"]`                  |
| `ENTRYPOINT`  | Fixed executable              | Asosiy ijrochi           | `ENTRYPOINT ["gunicorn"]`                   |
| `COPY`        | Copy files from host          | Hostdan fayl ko'chirish  | `COPY . /app`                               |
| `ADD`         | Like COPY + URL + tar support | COPY + URL + tar         | `ADD archive.tar.gz /app`                   |
| `ENV`         | Set environment variable      | Muhit o'zgaruvchisi      | `ENV PORT=8000`                             |
| `EXPOSE`      | Document port                 | Port hujjatlash          | `EXPOSE 8000`                               |
| `WORKDIR`     | Set working directory         | Ish papkasi              | `WORKDIR /app`                              |
| `VOLUME`      | Create mount point            | Ulash nuqtasi            | `VOLUME /data`                              |
| `ARG`         | Build-time variable           | Qurish vaqti o'zgaruvchi | `ARG VERSION=1.0`                           |
| `LABEL`       | Add metadata                  | Metadata qo'shish        | `LABEL env="prod"`                          |
| `USER`        | Set user                      | Foydalanuvchi            | `USER appuser`                              |
| `HEALTHCHECK` | Container health check        | Sog'liq tekshiruvi       | `HEALTHCHECK CMD curl -f http://localhost/` |

**Intervyuda shunday ayting:** "Har `RUN`, `COPY`, `ADD` yangi qatlam; bog'liq buyruqlarni birlashtirib, keshni bir qatlamda tozalayman. `EXPOSE` portni ochmaydi — faqat hujjat. `ARG` — build vaqtidagi, `ENV` — runtime qiymat; sirlarni ularning hech biriga qo'ymayman (buning uchun BuildKit secret)."

---

## Q19. What is the difference between CMD and ENTRYPOINT? | CMD va ENTRYPOINT farqi nima?

**Oddiy qilib aytganda:** `CMD` — konteyner ishga tushganda bajariladigan **standart** buyruq, `docker run image boshqa-buyruq` bilan osongina almashtiriladi. `ENTRYPOINT` — konteynerning **asosiy** dasturi, `CMD` esa unga standart argumentlarni beradi.

**Batafsilroq:**

**EN:** `ENTRYPOINT` defines the fixed executable. `CMD` provides default arguments that can be overridden. Together: `ENTRYPOINT` + `CMD` = full command.

**UZ:** `ENTRYPOINT` — o'zgarmas asosiy ijrochi. `CMD` — bekor qilinishi mumkin bo'lgan standart argumentlar. Birgalikda: `ENTRYPOINT` + `CMD` = to'liq buyruq.

```dockerfile
# Faqat CMD | Only CMD
CMD ["python", "app.py"]
# docker run my-app            → python app.py
# docker run my-app server.py  → python server.py (CMD o'zgaradi | CMD overridden)

# Faqat ENTRYPOINT | Only ENTRYPOINT
ENTRYPOINT ["python"]
# docker run my-app            → python
# docker run my-app app.py     → python app.py

# Birgalikda | Together (tavsiya etiladi | recommended)
ENTRYPOINT ["gunicorn"]
CMD ["--workers=4", "main:app"]
# docker run my-app                      → gunicorn --workers=4 main:app
# docker run my-app --workers=2 main:app → gunicorn --workers=2 main:app
```

**Qo'shimcha — Container Entrypoint vs CMD farqlari va birlashtirib ishlatish / ENTRYPOINT vs CMD:**

```dockerfile
# ENTRYPOINT o'zgarmas buyruq, CMD esa default argumentlar
ENTRYPOINT ["python", "manage.py"]
CMD ["runserver", "0.0.0.0:8000"]
```

**Intervyuda shunday ayting:** "`ENTRYPOINT` — bajariladigan dastur, `CMD` — uning standart argumentlari (`ENTRYPOINT ["python", "-m", "app"]` + `CMD ["--port", "8000"]`). Doim exec (JSON) shaklini ishlataman — shell shaklida jarayon `sh -c` ostida ishlaydi va SIGTERM'ni olmaydi, graceful shutdown buziladi."

---

## Q20. What is the difference between COPY and ADD? | COPY va ADD farqi nima?

**Oddiy qilib aytganda:** `COPY` — fayllarni oddiygina nusxalaydi. `ADD` ham nusxalaydi, lekin qo'shimcha 'sehr' qiladi: arxivlarni avtomatik ochadi va URL'dan yuklab oladi. Kutilmagan xulq bo'lmasligi uchun deyarli har doim `COPY` ishlatiladi.

**Batafsilroq:**

**EN:** `COPY` simply copies files/dirs from host to container. `ADD` does the same but also supports downloading from URLs and auto-extracting tar archives. **COPY is preferred** unless you need ADD's extra features.

**UZ:** `COPY` faqat host'dan container'ga fayl/papka ko'chiradi. `ADD` xuddi shunday, lekin URL'dan yuklab olish va tar arxivlarini avtomatik ochish imkoniyatiga ham ega. ADD'ning qo'shimcha xususiyatlari kerak bo'lmasa **COPY tavsiya etiladi**.

```dockerfile
# COPY — oddiy nusxa olish | simple copy
COPY ./app /app
COPY requirements.txt .

# ADD — qo'shimcha imkoniyatlar | extra features
ADD https://example.com/config.json /app/config.json   # URL'dan | from URL
ADD archive.tar.gz /app/                               # Avtomatik ochadi | auto-extract

# ✅ Tavsiya | Recommended: COPY for local files
COPY . /app

# ✅ ADD faqat shu hollarda | ADD only when needed
ADD https://... /destination
ADD archive.tar.gz /destination
```

**Intervyuda shunday ayting:** "Standart tanlov — `COPY`: aniq va oldindan aytib bo'ladigan. `ADD` faqat lokal tar arxivni ochish kerak bo'lganda; URL'dan yuklashni `RUN curl` bilan checksum tekshirib qilaman (yoki BuildKit'dagi `ADD --checksum`). `COPY --chown` va `--link` foydali."

---

## Q21. What is .dockerignore? | .dockerignore nima?

**Oddiy qilib aytganda:** .dockerignore — Docker'ga 'bu fayllarni build'ga yuborma' deydigan ro'yxat (xuddi .gitignore kabi): `node_modules`, `.git`, `.env`, loglar. Build tezlashadi va sirlar tasodifan image'ga tushmaydi.

**Batafsilroq:**

**EN:** `.dockerignore` tells Docker which files to exclude from the build context, similar to `.gitignore`.

**UZ:** `.dockerignore` — `.gitignore`ga o'xshash, build context'dan qaysi fayllarni chiqarib tashlashni Docker'ga bildiradi.

```bash
# .dockerignore fayli | .dockerignore file
__pycache__/
*.pyc
*.pyo
.git/
.env
venv/
node_modules/
*.log
.DS_Store
tests/
docs/

# EN: Reduces build context size, speeds up builds, keeps secrets out of image
# UZ: Build context hajmini kamaytiradi, qurishni tezlashtiradi, maxfiy ma'lumotlarni image'dan chiqaradi
```

**Intervyuda shunday ayting:** "`.dockerignore` build kontekstini kichik va xavfsiz qiladi: `.env`, kalitlar, `.git`, lokal bog'liqliklar image'ga tushmaydi, keraksiz o'zgarishlar keshni buzmaydi. Men uni allowlist uslubida yozaman: avval `*`, keyin `!src`, `!package.json`."

---

## Q22. What is a Multi-stage Build? | Multi-stage Build nima?

**Oddiy qilib aytganda:** Multi-stage build — bitta Dockerfile'da bir nechta bosqich: birinchisida kodni kompilyatsiya qilasiz (barcha og'ir asboblar bilan), oxirgisiga esa faqat tayyor natijani ko'chirasiz. Yakuniy image kichik va xavfsizroq bo'ladi.

**Batafsilroq:**

**EN:** Multi-stage builds use multiple `FROM` statements in one Dockerfile. This lets you build in one stage (with all tools) and copy only the result to a lean final image.

**UZ:** Multi-stage build bitta Dockerfile'da bir nechta `FROM` iborasini ishlatadi. Bir bosqichda qurib (barcha toollar bilan), faqat natijani yengil yakuniy image'ga ko'chirishga imkon beradi.

```dockerfile
# Multi-stage build namunasi | Multi-stage build example

# Bosqich 1: Qurish | Stage 1: Build
FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt
COPY . .

# Bosqich 2: Ishga tushirish (yengil image) | Stage 2: Runtime (lean image)
FROM python:3.11-slim AS runtime
WORKDIR /app
# Faqat keraklisini ko'chirish | Copy only what's needed
COPY --from=builder /root/.local /root/.local
COPY --from=builder /app/main.py .
COPY --from=builder /app/app/ ./app/

ENV PATH=/root/.local/bin:$PATH
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# Natija: 920MB → 180MB | Result: 920MB → 180MB ✅
```

```bash
docker build -t my-app:slim .
docker images
# my-app   slim    ...   180MB   ← Juda kichik! | Very small!
```

**Qo'shimcha — Multi-stage Dockerfile bilan Go/Rust microservice build qilish / Building Go/Rust microservice with Multi-stage Dockerfile:**

```dockerfile
# 1-Bosqich: Kompilyatsiya | Stage 1: Build
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o server .

# 2-Bosqich: Minimal Scratch Obraz | Stage 2: Minimal Scratch
FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /app/server /server
EXPOSE 8080
ENTRYPOINT ["/server"]
```

**Intervyuda shunday ayting:** "Multi-stage build asboblar va manba kodni runtime image'dan ajratadi — hajm va hujum yuzasi kichrayadi. Go/Rust uchun yakuniy bosqich `distroless` yoki `scratch` bo'lishi mumkin. `--target` bilan test yoki dev bosqichini alohida qurish mumkin."

---

## Q23. What is Docker layer caching? | Docker qatlam keshlash nima?

**Oddiy qilib aytganda:** Docker har qatlamni eslab qoladi (kesh). Keyingi build'da o'zgarmagan qadamlar qayta bajarilmaydi — tez. Lekin bitta qadam o'zgarsa, undan keyingi hamma qadamlar qayta bajariladi. Shuning uchun kam o'zgaradigan narsalar (bog'liqliklar) Dockerfile boshida bo'lishi kerak.

**Batafsilroq:**

**EN:** Docker caches each Dockerfile instruction as a layer. If a layer hasn't changed, it reuses the cache, speeding up subsequent builds.

**UZ:** Docker har bir Dockerfile ko'rsatmasini qatlam sifatida keshlaydi. Qatlam o'zgarmasa, keshdan foydalanib keyingi qurishlarni tezlashtiradi.

```dockerfile
# ❌ Noto'g'ri tartib — har safar pip install ishlaydi | Wrong order — pip runs every time
COPY . .
RUN pip install -r requirements.txt

# ✅ To'g'ri tartib — requirements o'zgarmasa pip keshdan | Correct — pip uses cache if req unchanged
COPY requirements.txt .
RUN pip install -r requirements.txt   # ← keshlanadi | cached
COPY . .                              # ← bu o'zgarganda pip qayta ishlamaydi | pip won't re-run
```

**Qo'shimcha — Docker Build Cache Optimizatsiyasi va `--mount=type=cache`:**

**EN:** Modern BuildKit supports inline package manager caching (`pip`, `apt`, `go build`) to speed up CI/CD pipeline builds significantly.

**UZB:** BuildKit bilan `pip` va paketlar keshini saqlash CI/CD quvurlarida build vaqtini 10 barobargacha tezlashtiradi.

```dockerfile
# Syntax=docker/dockerfile:1
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip     pip install -r requirements.txt
COPY . .
```

**Qo'shimcha — Docker Buildkit Cache Exporters (Inline, S3, GitHub Actions Cache):**

```bash
docker buildx build   --cache-to type=gha   --cache-from type=gha   -t myapp:latest --push .
```

**Intervyuda shunday ayting:** "Kesh qatlam ketma-ketligiga bog'liq: avval bog'liqlik fayllari (`package.json`, lock-fayl) va o'rnatish, keyin kod. BuildKit'ning `RUN --mount=type=cache` paket menejeri keshini build'lar orasida saqlaydi; CI'da kesh eksporterlari (`type=gha`, registry) orqali keshni ishga tushishlar orasida ulashaman."

---

# Docker Compose

---

## Q24. What is Docker Compose? | Docker Compose nima?

**Oddiy qilib aytganda:** Docker Compose — bir nechta konteynerni (ilova, baza, Redis) bitta YAML faylda tasvirlab, bitta buyruq bilan ishga tushirish: `docker compose up`. Lokal ishlab chiqish va kichik serverlar uchun juda qulay.

**Batafsilroq:**

**EN:** Docker Compose is a tool for defining and running multi-container applications using a single `docker-compose.yml` YAML file. One command starts all services.

**UZ:** Docker Compose — bitta `docker-compose.yml` YAML fayli yordamida ko'p containerni aniqlash va ishga tushirish uchun asbob. Bitta buyruq bilan barcha servicelar ishga tushadi.

```yaml
# docker-compose.yml — FastAPI + PostgreSQL + Redis

services:
  # FastAPI ilovasi | FastAPI application
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://admin:secret@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - .:/app # EN: Dev mode live reload | UZ: Dev rejimida tez yangilanish

  # PostgreSQL
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Redis
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

```bash
# Barcha servicelarni ishga tushirish | Start all services
docker compose up -d

# Loglarni ko'rish | View logs
docker compose logs -f api

# To'xtatish | Stop
docker compose down

# To'xtatib volumelarni o'chirish | Stop and remove volumes
docker compose down -v
```

**Intervyuda shunday ayting:** "Compose — ko'p konteynerli ilovani deklarativ tasvirlash. Hozir Compose v2 CLI plagini (`docker compose`, chiziqsiz), eski `docker-compose` v1 qo'llab-quvvatlanmaydi va `version:` kaliti eskirgan — fayl Compose Spec bo'yicha o'qiladi. Muhitlar uchun `profiles`, override fayllar va `include`."

---

## Q25. What is `depends_on` in Docker Compose? | Docker Compose'da `depends_on` nima?

**Oddiy qilib aytganda:** `depends_on` — 'avval bazani ishga tushir, keyin ilovani' deydi. Lekin oddiy ko'rinishida u faqat ishga tushish **tartibini** belgilaydi, baza haqiqatan tayyor bo'lganini kutmaydi. Buning uchun `condition: service_healthy` kerak.

**Batafsilroq:**

**EN:** `depends_on` defines the startup order. It ensures a service starts only after its dependencies are started. However, it doesn't wait for the service to be **ready**.

**UZ:** `depends_on` — ishga tushish tartibini belgilaydi. Service faqat bog'liqliklar ishga tushgandan keyin boshlanishini ta'minlaydi. Lekin service **tayyor** bo'lguncha kutmaydi.

```yaml
services:
  api:
    build: .
    depends_on:
      db:
        condition: service_healthy # ← DB tayyor bo'lguncha kut | Wait until DB is healthy

  db:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin"]
      interval: 5s
      timeout: 5s
      retries: 5
```

**Qo'shimcha — Docker Compose Dependencies Condition (service_healthy, service_completed_successfully):**

```yaml
depends_on:
  db:
    condition: service_healthy
  migration:
    condition: service_completed_successfully
```

**Intervyuda shunday ayting:** "`depends_on` + `condition: service_healthy` (healthcheck bilan) yoki `service_completed_successfully` (masalan, migratsiya konteyneri). Shunda ham ilovaning o'zi bog'liqlik vaqtincha yo'qolganda qayta ulanishni bilishi kerak — ishga tushish tartibi ishonchlilikni kafolatlamaydi."

---

## Q26. How to scale services in Docker Compose? | Docker Compose'da servicelarni qanday scale qilish mumkin?

**Oddiy qilib aytganda:** Compose'da bir servisning bir nechta nusxasini ishga tushirish: `docker compose up --scale worker=3`. Lekin nusxalar bir xil hostga tushadi va bir xil portni band qila olmaydi — shuning uchun faqat tashqariga port ochmaydigan servislar (worker) uchun qulay.

**Batafsilroq:**

**EN:** Use `--scale` flag to run multiple instances of a service.

**UZ:** Bir service'ning bir nechta nusxasini ishga tushirish uchun `--scale` flagi ishlatiladi.

```bash
# api service'dan 3 ta nusxa | Run 3 instances of api service
docker compose up -d --scale api=3

# Ishlaydigan containerlarni ko'rish | Check running containers
docker compose ps
# NAME           COMMAND   SERVICE   STATUS
# myapp-api-1    ...       api       running
# myapp-api-2    ...       api       running
# myapp-api-3    ...       api       running
# myapp-db-1     ...       db        running
```

**Intervyuda shunday ayting:** "`--scale` yoki `deploy.replicas` bitta host ichida gorizontal nusxalar beradi; tashqi port bilan scale qilish uchun oldida proxy kerak. Haqiqiy ko'p hostli masshtablash, avtomatik tiklash va rolling update uchun — Kubernetes yoki Swarm."

---

# Networking | Tarmoq

---

## Q27. What are Docker Network types? | Docker Tarmoq turlari nima?

**Oddiy qilib aytganda:** Docker tarmoq turlari: **bridge** — standart, konteynerlar bitta host ichida gaplashadi; **host** — konteyner hostning tarmog'ini to'g'ridan-to'g'ri ishlatadi (tez, lekin ajratilmagan); **none** — tarmoqsiz; **overlay** — bir nechta host orasida (Swarm).

**Batafsilroq:**

**EN:** Docker supports several network drivers: Bridge, Host, None, Overlay, Macvlan.

**UZ:** Docker bir nechta tarmoq drayverlarini qo'llab-quvvatlaydi: Bridge, Host, None, Overlay, Macvlan.

| Network     | EN                                       | UZ                                       | Use case         |
| ----------- | ---------------------------------------- | ---------------------------------------- | ---------------- |
| **bridge**  | Default. Isolated network on single host | Standart. Bitta hostda izolyatsiyalangan | Single host apps |
| **host**    | Shares host network stack                | Host tarmoq stekini ulashadi             | High performance |
| **none**    | No networking                            | Tarmoqsiz                                | Max isolation    |
| **overlay** | Multi-host networking (Swarm)            | Ko'p host tarmoqi                        | Docker Swarm     |
| **macvlan** | Container gets MAC address               | Container MAC manzil oladi               | Legacy apps      |

```bash
# Tarmoqlarni ko'rish | List networks
docker network ls

# Yangi bridge network yaratish | Create custom bridge network
docker network create my-network

# Containerni tarmoqqa ulash | Connect container to network
docker run -d --network my-network --name api nginx
docker run -d --network my-network --name db postgres:15

# EN: Containers on same network can reach each other by name!
# UZ: Bir tarmoqdagi containerlar bir-birini nom bilan topa oladi!
# api → db:5432 ✅
```

**Qo'shimcha — Docker Container Network Performance Optimization (host network mode):**

**EN:** `--network host` bypasses Docker network virtualization stack, delivering raw network performance at the expense of isolation.

**UZB:** `--network host` rejimi virtual tarmoq qatlamini chetlab o'tib, eng yuqori tarmoq unumdorligini beradi.

**Intervyuda shunday ayting:** "Foydalanuvchi yaratgan bridge tarmog'ida konteynerlar bir-birini nomi bo'yicha (o'rnatilgan DNS) topadi — standart bridge'da esa yo'q. `host` rejimi tarmoq tezligini beradi, lekin izolyatsiya va port to'qnashuvlaridan himoya yo'qoladi. Servislarni alohida tarmoqlarga bo'lib, faqat keraklilarini ulayman."

---

## Q28. How do containers communicate with each other? | Containerlar bir-biri bilan qanday muloqot qiladi?

**Oddiy qilib aytganda:** Bitta foydalanuvchi tarmog'idagi konteynerlar bir-birini **nomi** bilan chaqiradi: ilova bazaga `postgres:5432` deb murojaat qiladi — Docker'ning ichki DNS'i nomni IP'ga aylantiradi. IP manzillarni qo'lda yozish shart emas va ular o'zgarib turadi.

**Batafsilroq:**

**EN:** Containers on the same Docker network can communicate using their container names as hostnames.

**UZ:** Bir xil Docker tarmog'idagi containerlar bir-birini container nomi (hostname sifatida) orqali topishi mumkin.

```yaml
# docker-compose.yml
services:
  api:
    build: .
    environment:
      # EN: Use service name as hostname | UZ: Service nomini hostname sifatida ishlating
      - DB_HOST=db # ← "db" bu yerda container nomi | "db" is container name
      - REDIS_HOST=redis
  db:
    image: postgres:15
  redis:
    image: redis:7
```

```python
# Python kodida | In Python code
import psycopg2
conn = psycopg2.connect(host="db", port=5432, ...)  # "db" → postgres container
```

**Qo'shimcha — Docker DNS Resolution va Custom Bridge Networks:**

**EN:** Containers on custom bridge networks get automatic internal DNS resolution by container name, unlike the default bridge network.

**UZB:** Maxsus yaratilgan bridge tarmoqlaridagi konteynerlar bir-birini avtomatik DNS (konteyner nomi) orqali topadi.

**Qo'shimcha — Docker Container Networking: Overlay Network va VXLAN:**

**EN:** Overlay networks create a distributed network across multiple Docker daemon hosts using VXLAN encapsulation, enabling secure cross-host container communication.

**UZB:** Overlay tarmog'i VXLAN protokoli yordamida bir nechta alohida host serverlardagi konteynerlar o'rtasida xavfsiz tarmoq hosil qiladi.

```bash
# Swarm rejimida overlay network yaratish | Create overlay network in Swarm
docker network create -d overlay --attachable my_overlay_net
```

**Qo'shimcha — Docker Container Network Isolation: Network Namespaces & veth pairs:**



**Intervyuda shunday ayting:** "Konteynerlar user-defined network'da servis nomi bo'yicha (embedded DNS, 127.0.0.11) topishadi; tarmoqlararo aloqa faqat ikkala tarmoqqa ulangan konteyner orqali. Ichkarida ular veth juftliklari va network namespace'lar orqali ulanadi, hostlararo esa overlay (VXLAN). Konteyner portlarini tashqariga faqat kerak bo'lganda ochaman."

---

## Q29. What is Port Mapping? | Port Mapping nima?

**Oddiy qilib aytganda:** Port mapping — kompyuteringizning portini konteyner portiga ulash: `-p 8080:80` — brauzerda `localhost:8080` ni ochsangiz, so'rov konteynerning 80-portiga boradi. Ulanmagan konteyner portiga tashqaridan kirib bo'lmaydi.

**Batafsilroq:**

**EN:** Port mapping binds a port on the host to a port inside the container, allowing external access.

**UZ:** Port mapping — hostdagi portni container ichidagi portga bog'laydi, tashqi kirishga imkon beradi.

```bash
# Sintaksis | Syntax: -p host_port:container_port
docker run -d -p 8080:80 nginx
# host:8080 → container:80

# Ko'p portlar | Multiple ports
docker run -d \
  -p 8000:8000 \    # API
  -p 5555:5555 \    # Celery Flower
  my-app

# Barcha interfeyslarda | All interfaces
docker run -d -p 0.0.0.0:8080:80 nginx

# Faqat localhost | Only localhost
docker run -d -p 127.0.0.1:8080:80 nginx

# Portlarni ko'rish | View port mappings
docker port my-container
```

**Intervyuda shunday ayting:** "`-p 127.0.0.1:8080:80` — faqat lokal interfeysga bog'layman; `-p 8080:80` barcha interfeyslarga ochadi va Docker firewall (iptables) qoidalarini chetlab o'tishi mumkin — bu klassik xavfsizlik tuzog'i. Konteynerlararo aloqa uchun port ochish shart emas."

---

# Volumes | Ma'lumot saqlash

---

## Q30. What is a Docker Volume? | Docker Volume nima?

**Oddiy qilib aytganda:** Volume — Docker boshqaradigan, konteynerdan tashqarida yashaydigan xotira joyi. Konteyner o'chirilsa ham volume va undagi ma'lumot (masalan, baza fayllari) saqlanib qoladi va yangi konteynerga ulanishi mumkin.

**Batafsilroq:**

**EN:** Docker volumes are the preferred mechanism for persisting data generated by containers. Volumes are managed by Docker and stored at `/var/lib/docker/volumes/` on the host.

**UZ:** Docker volume'lar — containerlar tomonidan yaratilgan ma'lumotlarni saqlashning tavsiya etilgan usuli. Volume'lar Docker tomonidan boshqariladi va host'da `/var/lib/docker/volumes/` da saqlanadi.

```bash
# Volume yaratish | Create volume
docker volume create my-data

# Volume bilan container ishga tushirish | Run container with volume
docker run -d \
  -v my-data:/var/lib/postgresql/data \
  postgres:15

# Volume'larni ko'rish | List volumes
docker volume ls

# Volume haqida ma'lumot | Volume info
docker volume inspect my-data

# Volume o'chirish | Remove volume
docker volume rm my-data

# Ishlatilmayotgan volume'larni tozalash | Clean unused volumes
docker volume prune
```

**Qo'shimcha — Docker Volume Plugins: Remote Storage Integration (NFS, AWS EBS):**

**EN:** Docker volume plugins allow containers to mount persistent cloud storage directly across cloud instances.

**UZB:** Volume plaginlari konteynerlarga bulutli saqlash resurslarini (NFS, AWS EBS, NetApp) to'g'ridan-to'g'ri ulash imkonini beradi.

```bash
# NFS volume yaratish | Create NFS volume
docker volume create --driver local   --opt type=nfs   --opt o=addr=192.168.1.50,rw   --opt device=:/path/to/dir nfs_volume
```

**Intervyuda shunday ayting:** "Named volume — doimiy ma'lumot uchun standart tanlov: Docker boshqaradi, ko'chiriladi va backup qilinadi. Volume plugin'lari/driver'lari tarmoq xotirasini (NFS, bulut disklari) ulash imkonini beradi. Baza volume'larini ehtiyotkorlik bilan — bitta volume'ni ikki baza jarayoni bir vaqtda ishlatmasin."

---

## Q31. What is the difference between Volumes, Bind Mounts, and tmpfs? | Volume, Bind Mount va tmpfs farqi nima?

**Oddiy qilib aytganda:** Uch xil saqlash: **volume** — Docker boshqaradigan joy (productionda eng yaxshisi); **bind mount** — kompyuteringizdagi aniq papkani konteynerga ulash (ishlab chiqishda kodni jonli o'zgartirish uchun); **tmpfs** — faqat xotirada, konteyner to'xtashi bilan yo'qoladi (vaqtinchalik sirlar uchun).

**Batafsilroq:**

**EN:** Three ways to mount data into containers, each with different use cases.

**UZ:** Container'ga ma'lumot ulashning uchta usuli, har biri turli hollarda qo'llaniladi.

|                  | Volume                   | Bind Mount          | tmpfs                |
| ---------------- | ------------------------ | ------------------- | -------------------- |
| EN: Managed by   | Docker                   | Host OS             | Memory only          |
| UZ: Boshqaruvchi | Docker                   | Host OS             | Faqat xotira         |
| EN: Location     | /var/lib/docker/volumes/ | Anywhere on host    | RAM                  |
| UZ: Joylashuv    | /var/lib/docker/volumes/ | Hostda istalgan joy | RAM                  |
| EN: Persistence  | Persistent               | Persistent          | Lost on stop         |
| UZ: Doimiylik    | Doimiy                   | Doimiy              | To'xtasa yo'qoladi   |
| EN: Use case     | Production data          | Dev live reload     | Secrets, temp data   |
| UZ: Ishlatish    | Production data          | Dev rejimi          | Maxfiy, vaqtinchalik |

```bash
# Volume (tavsiya | recommended)
docker run -v my-volume:/data nginx

# Bind Mount (dev uchun | for dev)
docker run -v $(pwd):/app my-app
# EN: Live code changes reflected instantly | UZ: Kod o'zgarishi darhol aks etadi

# tmpfs (xotira | memory)
docker run --tmpfs /tmp nginx
```

**Intervyuda shunday ayting:** "Production ma'lumot — named volume; dev'da kod — bind mount; vaqtinchalik va maxfiy fayllar — tmpfs. Bind mount host fayl tizimiga bog'laydi va huquqlar muammolarini keltiradi; `--mount` sintaksisi `-v` dan aniqroq va xatolarga kamroq moyil."

---

## Q32. How to backup a Docker Volume? | Docker Volume'ni qanday zaxiralash mumkin?

**Oddiy qilib aytganda:** Volume'ni zaxiralash: vaqtinchalik konteyner volume'ni ulab, uning ichini arxivga joylaydi: `docker run --rm -v data:/data -v $(pwd):/backup alpine tar czf /backup/data.tgz -C /data .` Tiklash — teskari yo'l bilan.

**Batafsilroq:**

**EN:** Use a temporary container to tar the volume contents and save it to the host.

**UZ:** Volume tarkibini tar'lab host'ga saqlash uchun vaqtinchalik container ishlatiladi.

```bash
# Volume'ni zaxiralash | Backup volume
docker run --rm \
  -v my-postgres-data:/source \
  -v $(pwd):/backup \
  ubuntu tar czf /backup/postgres-backup.tar.gz -C /source .

# Zaxiradan tiklash | Restore from backup
docker run --rm \
  -v my-postgres-data:/target \
  -v $(pwd):/backup \
  ubuntu tar xzf /backup/postgres-backup.tar.gz -C /target
```

**Qo'shimcha — Docker Volume Backup va Restore qilish buyruqlari / Backup and Restore Docker Volumes:**

```bash
# Volume ni tar.gz arxivga zaxiralash | Backup volume to tar.gz
docker run --rm -v postgres_data:/volume -v $(pwd):/backup alpine   tar -czvf /backup/postgres_backup.tar.gz -C /volume .

# Qayta tiklash | Restore volume
docker run --rm -v postgres_data:/volume -v $(pwd):/backup alpine   sh -c "rm -rf /volume/* && tar -xzvf /backup/postgres_backup.tar.gz -C /volume"
```

**Intervyuda shunday ayting:** "Fayl darajasidagi backup faqat ishlamayotgan yoki izchil holatdagi ma'lumot uchun ishonchli; baza uchun uning o'z vositalari (`pg_dump`, PITR) kerak — ishlayotgan bazaning fayllarini tar qilish buzilgan nusxa berishi mumkin. Backup'ni boshqa joyda saqlab, tiklashni muntazam sinayman."

---

# Amaliy buyruqlar | Practical Commands

---

## Q33. What are the most important Docker commands? | Eng muhim Docker buyruqlari qaysilar?

**Oddiy qilib aytganda:** Eng ko'p ishlatiladigan buyruqlar: `docker ps` (konteynerlar), `docker images` (image'lar), `docker run`/`stop`/`rm` (boshqarish), `docker logs` (loglar), `docker exec` (ichiga kirish), `docker build` (qurish), `docker compose up/down`.

**Batafsilroq:**

**EN / UZ:** Core commands every Docker user must know.

```bash
# ═══ IMAGE ═══
docker images                      # Barcha image'lar | List images
docker pull nginx                  # Hub'dan yuklash | Pull from Hub
docker build -t app:1.0 .          # Image qurish | Build image
docker push user/app:1.0           # Hub'ga yuklash | Push to Hub
docker rmi nginx                   # Image o'chirish | Remove image
docker image prune                 # Keraksizlarni tozalash | Clean dangling

# ═══ CONTAINER ═══
docker run -d -p 8080:80 nginx    # Ishga tushirish | Run
docker ps                         # Ishlaydigan | Running containers
docker ps -a                      # Barchasi | All containers
docker stop <id>                  # To'xtatish | Stop
docker start <id>                 # Ishga tushirish | Start
docker restart <id>               # Qayta ishga tushirish | Restart
docker rm <id>                    # O'chirish | Remove
docker rm -f <id>                 # Majburiy o'chirish | Force remove

# ═══ LOGS & DEBUG ═══
docker logs <id>                  # Loglarni ko'rish | View logs
docker logs -f <id>               # Jonli loglar | Follow logs
docker exec -it <id> /bin/bash    # Container ichiga kirish | Enter container
docker inspect <id>               # Batafsil ma'lumot | Detailed info
docker stats                      # CPU/Memory | Resources usage
docker top <id>                   # Jarayonlar | Running processes

# ═══ SYSTEM ═══
docker system df                  # Disk ishlatilishi | Disk usage
docker system prune               # Keraksizlarni tozalash | Clean all unused
docker system prune -a --volumes  # ⚠️ Hammasini tozalash | Clean everything
```

**Intervyuda shunday ayting:** "Kundalik: `ps`, `logs -f`, `exec`, `inspect` (to'liq konfiguratsiya), `stats` (resurslar), `system df` (disk). Debugging uchun `docker inspect --format` va `docker events`. Productionda qo'lda buyruqlar o'rniga deklarativ konfiguratsiya (Compose, Kubernetes manifestlari)."

---

## Q34. How to enter a running container? | Ishlaydigan container ichiga qanday kirish mumkin?

**Oddiy qilib aytganda:** Ishlayotgan konteyner ichiga kirish: `docker exec -it app sh` (yoki `bash`) — konteyner ichida terminal ochiladi. Minimal image'larda shell bo'lmasligi mumkin — unda `docker debug` yoki vaqtinchalik yordamchi konteyner ishlatiladi.

**Batafsilroq:**

**EN:** Use `docker exec -it` to open an interactive shell inside a running container.

**UZ:** Ishlaydigan container ichida interaktiv shell ochish uchun `docker exec -it` ishlatiladi.

```bash
# Bash bilan | With bash
docker exec -it my-container /bin/bash

# sh bilan (bash yo'q bo'lsa | if no bash — alpine containers)
docker exec -it my-container /bin/sh

# Bitta buyruq bajarish | Run single command
docker exec my-container python manage.py migrate

# Root sifatida kirish | Enter as root
docker exec -it --user root my-container /bin/bash

# EN: Useful for debugging, checking logs, running migrations
# UZ: Debug, log tekshirish, migratsiya ishlatishda foydali
```

**Intervyuda shunday ayting:** "`docker exec` debugging uchun; productionda konteyner ichida qo'lda o'zgarish qilmayman — ular keyingi deploy'da yo'qoladi. Distroless image'larda shell yo'q — `docker debug` yoki shu konteynerning namespace'lariga ulangan debug konteyner."

---

## Q35. How to view container logs? | Container loglarini qanday ko'rish mumkin?

**Oddiy qilib aytganda:** Konteyner loglari: ilova `stdout`/`stderr` ga yozadi, Docker ularni yig'adi — `docker logs -f app` bilan ko'rasiz. Log fayllar cheksiz o'smasligi uchun hajm chegarasi (log rotation) sozlanishi kerak.

**Batafsilroq:**

**EN:** Use `docker logs` to view output from a container.

**UZ:** Container chiqishini ko'rish uchun `docker logs` ishlatiladi.

```bash
docker logs my-container              # Barcha loglar | All logs
docker logs -f my-container           # Jonli | Follow (tail -f)
docker logs --tail 100 my-container   # Oxirgi 100 qator | Last 100 lines
docker logs --since 1h my-container   # Oxirgi 1 soat | Last 1 hour
docker logs --until 2024-01-01 my-container

# Docker Compose'da | In Docker Compose
docker compose logs -f api            # Faqat api loglar | Only api logs
docker compose logs -f                # Barcha servicelar | All services
```

**Qo'shimcha — Docker Log Rotation va Log Driver konfiguratsiyasi / Docker Log Rotation and Driver Config:**

**EN:** Without log rotation, container standard output logs can quickly fill up host disk space. `json-file` or `loki`/`syslog` driver with `max-size` prevents disk exhaustion.

**UZB:** Log rotatsiyasiz konteyner loglari diskni to'ldirib qo'yishi mumkin. `max-size` parametrlari buni oldini oladi.

```json
// /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

**Intervyuda shunday ayting:** "Ilova loglarni stdout'ga yozadi (12-factor), Docker log driver ularni yig'adi. Standart `json-file` driver'ga `max-size` va `max-file` qo'yaman (yoki `local` driver) — aks holda disk to'ladi. Productionda loglarni markaziy tizimga (Loki, ELK) yuboraman."

---

## Q36. How to monitor Docker containers? | Docker containerlarni qanday monitoring qilish mumkin?

**Oddiy qilib aytganda:** Monitoring — konteynerlar qancha CPU, xotira va tarmoq ishlatayotganini kuzatish. Tez ko'rish uchun `docker stats`, doimiy kuzatuv uchun esa cAdvisor + Prometheus + Grafana kabi vositalar.

**Batafsilroq:**

**EN:** Use `docker stats` for real-time resource monitoring, or integrate with tools like Prometheus + Grafana.

**UZ:** Real vaqtda resurs monitoringi uchun `docker stats`, yoki Prometheus + Grafana kabi toollar bilan integratsiya.

```bash
# Real-time statistika | Real-time stats
docker stats
# CONTAINER   CPU %  MEM USAGE / LIMIT     MEM %   NET I/O
# my-api      2.3%   120MiB / 512MiB       23.4%   1.2MB/1.5MB

# Bir marta ko'rish | One-time snapshot
docker stats --no-stream

# Disk, image, container hajmi | Disk usage
docker system df

# Container jarayonlari | Container processes
docker top my-container
```

**Qo'shimcha — Docker daemon metrikalarini Prometheus bilan kuzatish / Monitoring Docker Daemon with Prometheus:**

```json
// /etc/docker/daemon.json
{
  "metrics-addr": "127.0.0.1:9323",
  "experimental": true
}
```

**Intervyuda shunday ayting:** "`docker stats` — jonli tezkor ko'rinish; doimiy monitoring uchun konteyner metrikalari (cAdvisor yoki node exporter), Docker daemon metrikalari (`metrics-addr`) va ilova metrikalari Prometheus'ga, ogohlantirishlar — xotira chegarasiga yaqinlashish, restart'lar soni, health holati bo'yicha."

---

## Q37. How to clean up Docker resources? | Docker resurslarini qanday tozalash mumkin?

**Oddiy qilib aytganda:** Vaqt o'tishi bilan to'xtagan konteynerlar, eski image'lar va build keshi diskni to'ldiradi. `docker system df` qancha joy band ekanini ko'rsatadi, `docker system prune` esa keraksizlarini tozalaydi.

**Batafsilroq:**

**EN:** Use prune commands to remove unused Docker objects.

**UZ:** Ishlatilmayotgan Docker ob'ektlarini o'chirish uchun prune buyruqlari ishlatiladi.

```bash
# To'xtatilgan containerlar | Stopped containers
docker container prune

# Keraksiz image'lar (dangling) | Dangling images
docker image prune

# Barcha ishlatilmayotgan image'lar | All unused images
docker image prune -a

# Ishlatilmayotgan volume'lar | Unused volumes
docker volume prune

# Ishlatilmayotgan tarmoqlar | Unused networks
docker network prune

# Hammasi bir vaqtda | Everything at once
docker system prune

# Hammasi + volume'lar ⚠️ | Everything + volumes ⚠️
docker system prune -a --volumes
```

**Qo'shimcha — Docker Garbage Collection: System Prune va Volume Cleanup:**

**EN:** Unused images, stopped containers, build caches, and dangling volumes consume massive disk space over time.

**UZB:** Ishlatilmayotgan obrazlar, to'xtatilgan konteynerlar va eskirgan cache'lar vaqt o'tishi bilan katta disk maydonini egallaydi.

```bash
# Barcha ishlatilmayotgan resurslarni o'chirish | Clean unused Docker objects
docker system prune -a --volumes --force
```

**Intervyuda shunday ayting:** "Avval `docker system df` bilan ko'raman, keyin tanlab tozalayman: `container prune`, `image prune` (`-a` barcha ishlatilmayotganlarni), `builder prune`. `--volumes` bilan juda ehtiyot bo'laman — u ma'lumotni o'chiradi. CI runner'larda tozalashni avtomatlashtiraman."

---

# Advanced | Ilg'or mavzular

---

## Q38. What is Docker Swarm? | Docker Swarm nima?

**Oddiy qilib aytganda:** Docker Swarm — Docker'ning o'rnatilgan orkestratori: bir nechta serverni bitta klasterga birlashtiradi va servislarni ular bo'ylab tarqatadi, yiqilganini qayta ishga tushiradi. Kubernetes'dan ancha sodda.

**Batafsilroq:**

**EN:** Docker Swarm is Docker's native container orchestration tool. It manages a cluster of Docker hosts as a single virtual host, enabling scaling, load balancing, and high availability.

**UZ:** Docker Swarm — Docker'ning o'z container orkestratsiya vositasi. Docker hostlar klasterini bitta virtual host sifatida boshqaradi — scale, load balancing va yuqori mavjudlikni ta'minlaydi.

```bash
# Swarm boshlash (manager node) | Init swarm (manager node)
docker swarm init --advertise-addr 192.168.1.100

# Worker node qo'shish | Add worker node
docker swarm join --token <token> 192.168.1.100:2377

# Service deploy qilish | Deploy service
docker service create \
  --name my-api \
  --replicas 3 \
  -p 8000:8000 \
  my-app:1.0

# Service'larni ko'rish | List services
docker service ls

# Scale qilish | Scale
docker service scale my-api=5

# Nodelarni ko'rish | List nodes
docker node ls
```

**Intervyuda shunday ayting:** "Swarm mode — oddiy sozlanadigan orkestrator: servislar, replikalar, rolling update, overlay tarmoqlar, secrets. Kichik jamoalar uchun yetarli, lekin ekotizim va sanoat standarti Kubernetes. Yangi loyihada murakkablikka qarab Compose, managed Kubernetes yoki PaaS'ni tanlayman."

---

## Q39. What is the difference between Docker Swarm and Kubernetes? | Docker Swarm va Kubernetes farqi nima?

**Oddiy qilib aytganda:** Swarm — sodda va Docker bilan birga keladi, tez o'rganiladi. Kubernetes — ancha murakkab, lekin kuchli: avtomatik masshtablash, boy ekotizim, deyarli barcha bulutlarda tayyor xizmat sifatida.

**Batafsilroq:**

**EN:** Both are container orchestration tools, but Kubernetes is more powerful and complex.

**UZ:** Ikkalasi ham container orkestratsiya vositalari, lekin Kubernetes kuchliroq va murakkabroq.

| Feature            | Docker Swarm     | Kubernetes         |
| ------------------ | ---------------- | ------------------ |
| EN: Complexity     | Simple           | Complex            |
| UZ: Murakkablik    | Oddiy            | Murakkab           |
| EN: Setup          | Easy (minutes)   | Harder (hours)     |
| UZ: O'rnatish      | Oson (daqiqalar) | Qiyinroq (soatlar) |
| EN: Scaling        | Manual           | Auto-scaling       |
| UZ: Scale          | Qo'lda           | Avtomatik          |
| EN: Load balancing | Built-in         | Needs Ingress      |
| UZ: Load balancing | Ichki            | Ingress kerak      |
| EN: Community      | Smaller          | Huge               |
| UZ: Hamjamiyat     | Kichik           | Katta              |
| EN: Best for       | Small clusters   | Large production   |
| UZ: Eng yaxshi     | Kichik klaster   | Katta production   |

**Qo'shimcha — Kubernetes vs Docker Swarm farqlari / Differences between Kubernetes and Docker Swarm:**

| Xususiyat / Feature  | Docker Swarm                           | Kubernetes (k8s)                  |
| -------------------- | -------------------------------------- | --------------------------------- |
| O'rnatish / Setup    | Juda sodda (Docker ichida o'rnatilgan) | Murakkab, qo'shimcha infratuzilma |
| Scalability          | Kichik va o'rta loyihalar uchun        | Cheksiz, enterprise daraja        |
| Ekotizim / Ecosystem | Cheklangan                             | Juda boy (Helm, Istio, ArgoCD)    |
| Auto-scaling         | Qo'lda                                 | HPA (Horizontal Pod Autoscaler)   |

**Intervyuda shunday ayting:** "Kubernetes — sanoat standarti: deklarativ API, autoscaling, keng ekotizim (Helm, operator'lar, service mesh), managed xizmatlar. Swarm — kamroq harakatlanuvchi qism, lekin rivojlanishi sekin. Tanlov jamoa hajmi va operatsion imkoniyatga bog'liq."

---

## Q40. What is a Docker Registry? | Docker Registry nima?

**Oddiy qilib aytganda:** Registry — image'lar saqlanadigan server. Docker Hub — ommaviysi; kompaniyalar o'z xususiy registry'sini (GitHub Container Registry, AWS ECR, Harbor) ishlatadi — image'lar faqat ruxsat etilganlarga ko'rinadi.

**Batafsilroq:**

**EN:** A Docker registry is a storage system for Docker images. Docker Hub is the public registry. You can also run a private registry.

**UZ:** Docker registry — Docker image'larini saqlash tizimi. Docker Hub — ommaviy registry. Xususiy registry ham ishlatish mumkin.

```bash
# Xususiy registry ishga tushirish | Run private registry
docker run -d \
  -p 5000:5000 \
  --name private-registry \
  -v registry-data:/var/lib/registry \
  registry:2

# Xususiy registry'ga push qilish | Push to private registry
docker tag my-app localhost:5000/my-app:1.0
docker push localhost:5000/my-app:1.0

# Xususiy registry'dan pull | Pull from private registry
docker pull localhost:5000/my-app:1.0
```

**Intervyuda shunday ayting:** "Xususiy registry'da: kirish nazorati, image skanerlash, imzolash va eski teglarni tozalash siyosati. CI registry'ga OIDC orqali qisqa muddatli tokenlar bilan ulanadi. Deploy'da image'ni digest bo'yicha olaman."

---

## Q41. How to restart a container automatically? | Container'ni avtomatik qayta ishga tushirish qanday?

**Oddiy qilib aytganda:** Restart policy — konteyner to'xtasa nima qilish: `no` — hech narsa, `on-failure` — faqat xato bilan to'xtasa qayta ishga tushirish, `always` — har doim, `unless-stopped` — qo'lda to'xtatilmaguncha har doim.

**Batafsilroq:**

**EN:** Use `--restart` flag with restart policies.

**UZ:** Qayta ishga tushirish siyosatlari bilan `--restart` flagi ishlatiladi.

| Policy           | EN                              | UZ                                     |
| ---------------- | ------------------------------- | -------------------------------------- |
| `no`             | Never restart (default)         | Hech qachon qayta tushmasin (standart) |
| `always`         | Always restart                  | Doim qayta tushsin                     |
| `on-failure`     | Only on non-zero exit           | Faqat xato bo'lganda                   |
| `unless-stopped` | Always, unless manually stopped | Qo'lda to'xtatilmaguncha               |

```bash
# Production uchun | For production
docker run -d \
  --restart unless-stopped \
  --name my-api \
  my-app:1.0

# Faqat xato bo'lganda, max 5 marta | On failure, max 5 times
docker run -d \
  --restart on-failure:5 \
  my-app:1.0

# Docker Compose'da | In Docker Compose
services:
  api:
    image: my-app:1.0
    restart: unless-stopped
```

**Intervyuda shunday ayting:** "Serverdagi uzoq ishlaydigan servislar uchun `unless-stopped` yoki `on-failure:N`. Restart — tiklanish uchun, lekin cheksiz restart sikli muammoni yashiradi; restart soni va chiqish kodini monitoring qilaman. Kubernetes'da restart'ni kubelet boshqaradi."

---

## Q42. What is Docker HEALTHCHECK? | Docker HEALTHCHECK nima?

**Oddiy qilib aytganda:** HEALTHCHECK — Docker vaqti-vaqti bilan konteyner ichida tekshiruv buyrug'ini bajaradi ('ilova javob beryaptimi?'). Natijaga qarab konteyner `healthy` yoki `unhealthy` deb belgilanadi. Jarayon ishlayapti degani — ilova ishlayapti degani emas.

**Batafsilroq:**

**EN:** `HEALTHCHECK` lets Docker periodically test whether a container is working correctly. Status can be: starting, healthy, unhealthy.

**UZ:** `HEALTHCHECK` — Docker'ga container to'g'ri ishlayotganini davriy tekshirish imkonini beradi. Holat: starting, healthy, unhealthy bo'lishi mumkin.

```dockerfile
# Dockerfile'da | In Dockerfile
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1
```

```yaml
# Docker Compose'da | In Docker Compose
services:
  api:
    build: .
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

```bash
# Salomatlik holatini ko'rish | Check health status
docker inspect --format='{{.State.Health.Status}}' my-container
# healthy ✅
```

**Qo'shimcha — Docker Healthcheck va Grace Period sozlash / Configuring Docker Healthcheck and Grace Period:**

**EN:** Healthchecks allow Docker and Orchestrators to monitor container health and restart unhealthy instances automatically.

**UZB:** Healthcheck konteyner ichidagi servis ishlashini muntazam tekshiradi va buzilgan taqdirda avtomatik qayta ishga tushiradi.

```dockerfile
HEALTHCHECK --interval=10s --timeout=3s --start-period=30s --retries=3   CMD curl -f http://localhost:8000/health || exit 1
```

**Intervyuda shunday ayting:** "HEALTHCHECK'ni yengil va tez qilaman (masalan, `/health/live`), `start_period` bilan ishga tushish vaqtini beraman. Compose'da `depends_on: condition: service_healthy` uchun kerak. Kubernetes Dockerfile HEALTHCHECK'ni e'tiborsiz qoldiradi — u yerda liveness/readiness probe'lar."

---

## Q43. What are Docker best practices? | Docker best practices nima?

**Oddiy qilib aytganda:** Docker bo'yicha yaxshi odatlar: kichik va ishonchli bazaviy image, multi-stage build, root bo'lmagan foydalanuvchi, `.dockerignore`, image ichida sir yo'q, har konteynerda bitta asosiy jarayon, resurs chegaralari va image'larni muntazam yangilash va skanerlash.

**Batafsilroq:**

**EN / UZ:**

```dockerfile
# ✅ 1. Minimal base image ishlatish | Use minimal base image
FROM python:3.11-slim    # ← slim/alpine ≈ 10x kichik | 10x smaller

# ✅ 2. Non-root foydalanuvchi | Non-root user
RUN useradd -ms /bin/bash appuser
USER appuser

# ✅ 3. Bir RUN buyrug'ida qo'shib yozish | Combine RUN commands
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*    # ← tozalash | cleanup

# ✅ 4. Layer keshdan foydalanish | Leverage layer caching
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

# ✅ 5. .dockerignore ishlatish | Use .dockerignore
# (alohida fayl | separate file)

# ✅ 6. COPY > ADD (agar URL/tar kerak bo'lmasa | unless URL/tar needed)
COPY . /app

# ✅ 7. Maxfiy ma'lumotlar uchun ENV emas, Docker secrets | Don't use ENV for secrets
# docker secret create my_secret ./secret.txt

# ✅ 8. Multi-stage build (production uchun | for production)
# (yuqoridagi namunaga qarang | see example above)

# ✅ 9. HEALTHCHECK qo'shish | Add HEALTHCHECK
HEALTHCHECK CMD curl -f http://localhost:8000/health || exit 1

# ✅ 10. Image'larni teglashtirish | Tag images properly
# docker build -t my-app:1.2.3 .    ← versiyalash | versioning
# docker build -t my-app:latest .
```

**Qo'shimcha — Container Security Hardening Best Practices / Konteynerlar xavfsizligini oshirish amaliyoti:**

**EN:** Hardening includes running as non-root, read-only root filesystem, dropping capabilities, and disabling privilege escalation.

**UZB:** Xavfsizlikni oshirish non-root foydalanuvchi, faqat o'qish rejimida ildiz fayl tizimi, keraksiz Linux capability'larni olib tashlashni o'z ichiga oladi.

```yaml
services:
  secure_app:
    image: myapp:prod
    user: "10001:10001"
    read_only: true
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    tmpfs:
      - /tmp
```

**Qo'shimcha — Docker Remote API Security with TLS Mutual Authentication (mTLS):**



**Qo'shimcha — Docker Security Benchmarking with CIS (Center for Internet Security) Docker Benchmark:**

```bash
docker run --rm --net host --ipc host --userns host --pid host   --label com.docker.bench.security   -v /etc:/etc:ro -v /usr/bin/docker:/usr/bin/docker:ro   docker/docker-bench-security
```

**Intervyuda shunday ayting:** "Xavfsizlik va ishonchlilik ro'yxatim: minimal/distroless image, `USER` root emas, `--read-only` fayl tizimi, `cap-drop ALL` + faqat keraklilari, resurs chegaralari, digest bilan qotirish, zaifliklar skaneri CI'da, Docker daemon socket'ini konteynerga ulamaslik, masofaviy API faqat mTLS bilan. CIS Docker Benchmark — tekshiruv ro'yxati sifatida."

---

## Q44. What is Docker `commit`? | Docker `commit` nima?

**Oddiy qilib aytganda:** `docker commit` — ishlayotgan konteynerning hozirgi holatidan yangi image yasash. Debugging uchun qulay, lekin production image'lar uchun yomon: qanday yasalgani hech qayerda yozilmagan va uni takrorlab bo'lmaydi.

**Batafsilroq:**

**EN:** `docker commit` creates a new image from a running container's current state. Not recommended for production — use Dockerfiles instead.

**UZ:** `docker commit` — ishlaydigan container'ning hozirgi holatidan yangi image yaratadi. Production uchun tavsiya etilmaydi — Dockerfile ishlatish yaxshiroq.

```bash
# Container ichiga kirish va o'zgartirish | Enter container and modify
docker run -it ubuntu /bin/bash
# apt-get install -y curl
# exit

# Yangi image sifatida saqlash | Save as new image
docker commit <container_id> my-custom-ubuntu:1.0

# ✅ Yaxshiroq usul | Better way: Dockerfile
# FROM ubuntu
# RUN apt-get update && apt-get install -y curl
```

**Intervyuda shunday ayting:** "`commit` takrorlanmaydigan, hujjatlanmagan image beradi — production uchun faqat Dockerfile (kodda saqlanadi, ko'rib chiqiladi, qayta quriladi). `commit` ni faqat nosoz konteyner holatini tahlil uchun saqlab qolishda ishlataman."

---

## Q45. How to use environment variables securely in Docker? | Docker'da muhit o'zgaruvchilarini xavfsiz ishlatish qanday?

**Oddiy qilib aytganda:** Muhit o'zgaruvchilari (`-e`, `--env-file`) — sozlamalarni image'dan tashqarida berish. Lekin sirlarni (parollar, tokenlar) ular orqali berish xavfli: `docker inspect` va jarayon muhitidan ko'rinadi. Sirlar uchun maxsus mexanizmlar — Docker/Compose secrets yoki tashqi secret manager.

**Batafsilroq:**

**EN:** Avoid hardcoding secrets in Dockerfiles or compose files. Use `.env` files, Docker secrets, or external secret managers.

**UZ:** Dockerfile yoki compose fayllarida maxfiy ma'lumotlarni qattiq yozishdan saqlaning. `.env` fayllar, Docker secrets yoki tashqi secret managerlar ishlatiladi.

```bash
# .env fayli | .env file
POSTGRES_PASSWORD=supersecret
JWT_SECRET=myjwtsecret
API_KEY=myapikey
```

```yaml
# docker-compose.yml
services:
  api:
    image: my-app
    env_file:
      - .env # ← .gitignore'ga qo'shing! | Add to .gitignore!
    environment:
      - DEBUG=false # ← Bu xavfsiz | This is safe (not secret)
```

```bash
# .gitignore
.env
*.env
secrets/

# Docker secret (Swarm uchun | for Swarm)
echo "supersecret" | docker secret create db_password -
docker service create \
  --secret db_password \
  my-app
```

**Qo'shimcha — Docker Secret Management vs Environment Variables:**

**EN:** Environment variables can leak via process lists and logs. Docker Secrets (in Swarm/K8s) mount sensitive tokens in memory (`/run/secrets/`).

**UZB:** Muhit o'zgaruvchilari (`ENV`) loglarda ko'rinib qolishi mumkin. Docker Secrets parollarni xotiraga xavfsiz biriktiradi.

**Intervyuda shunday ayting:** "Oddiy sozlamalar — env'da, sirlar — secrets sifatida fayl orqali (`/run/secrets/...`) yoki Vault/bulut secret manager'dan. Sirlarni hech qachon Dockerfile'ga (`ENV`, `ARG`) yozmayman — ular image tarixida qoladi; build vaqtidagi sirlar uchun `RUN --mount=type=secret`."

---

# 🔴 Chuqur mavzular / In-depth topics

---

## Q46. Docker WASM / WASI integration nima va containerization kelajagida u qanday o'rin tutadi? / What is Docker WASM / WASI integration and its role in containerization?

**Oddiy qilib aytganda:** WebAssembly (Wasm) — juda yengil va tez ishga tushadigan 'mini-konteyner' formati. Docker oddiy konteynerlar yonida Wasm modullarini ham ishga tushira oladi: millisekundlarda start, bir necha megabayt xotira.

**Batafsilroq:**

**EN:** Docker supports WebAssembly (Wasm) runtimes alongside traditional OCI containers via WasmEdge / Spin runtimes. WASM containers launch in milliseconds and have negligible memory overhead (~few MBs).

**UZB:** Docker WasmEdge va Spin kabi runtime'lar yordamida an'anaviy OCI konteynerlari bilan birga WebAssembly (Wasm) ni qo'llab-quvvatlaydi. WASM konteynerlari millisekundlarda ishga tushadi va juda kam xotira (~bir necha MB) talab qiladi.

```bash
# Docker Desktop'da WASM ishga tushirish | Run WASM container in Docker
docker run --runtime=io.containerd.spin.v2 --platform=wasi/wasm32   ghcr.io/spinframework/spin-dotnet-http:v0.1.0
```

**Intervyuda shunday ayting:** "Wasm konteynerlari containerd shim'lari (Spin, WasmEdge) orqali ishlaydi va edge/serverless uchun istiqbolli: tez start, kichik hajm, kuchli sandbox. Lekin ekotizim yosh — tarmoq va tizim chaqiruvlari WASI orqali cheklangan; oddiy backend servislar uchun hozircha OCI konteynerlari standart."

---

## Q47. Buildx va multi-platform image'lar qanday ishlaydi? / How do Buildx and multi-platform images work?

**Oddiy qilib aytganda:** Kompyuterlar turli protsessorlarda ishlaydi: serverlar ko'pincha `amd64`, Apple Silicon va ko'p bulut serverlari esa `arm64`. Buildx bitta buyruq bilan har ikkala arxitektura uchun image quradi va ularni bitta teg ostida birlashtiradi — har kompyuter o'ziga mosini oladi.

**Batafsilroq:**

**EN:** `docker buildx` uses BuildKit to create multi-architecture images (e.g. `linux/amd64` and `linux/arm64` for Apple Silicon & Cloud servers) in a single command.

**UZB:** `docker buildx` BuildKit yordamida bitta buyruq bilan bir nechta arxitekturalar (masalan Apple Silicon va Bulutli serverlar uchun `linux/amd64` va `linux/arm64`) uchun konteyner obrazlarini quradi.

```bash
# Multi-platform builder yaratish va ishlatish | Create and use multi-platform builder
docker buildx create --name mybuilder --use
docker buildx inspect --bootstrap

# Bir vaqtda AMD64 va ARM64 uchun build qilib Docker Hub'ga joylash
docker buildx build --platform linux/amd64,linux/arm64 -t myusername/myapi:v2.0 --push .
```

**Qo'shimcha — Docker Multi-Arch Cross-Compilation with QEMU vs Native Builders:**



**Qo'shimcha — Docker Image Manifest & OCI Image Index Structure:**



**Intervyuda shunday ayting:** "`docker buildx build --platform linux/amd64,linux/arm64 --push` — manifest list (OCI image index) yaratadi, registry klient arxitekturasiga mos image'ni beradi. QEMU emulyatsiyasi sekin; imkon bo'lsa native builder'lar yoki kross-kompilyatsiya (Go, Rust) ishlataman."

---

## Q48. Docker Scout va Vulnerability Scanning nima? / What is Docker Scout and Vulnerability Scanning?

**Oddiy qilib aytganda:** Docker Scout — image ichidagi kutubxonalarni tekshirib, ma'lum zaifliklarni (CVE) topadi va qaysi versiyaga yangilash kerakligini aytadi. Xavfli image production'ga chiqishidan oldin to'xtatiladi.

**Batafsilroq:**

**EN:** Docker Scout analyzes container images for security vulnerabilities (CVEs), software bill of materials (SBOM), and supply chain policy compliance.

**UZB:** Docker Scout konteyner obrazlarini xavfsizlik zaifliklari (CVE), dasturiy ta'minot komponentlari ro'yxati (SBOM) va yetkazib berish zanjiri xavfsizligi bo'yicha tahlil qiladi.

```bash
# Obraz zaifliklarini tekshirish | Quick CVE scan
docker scout cves myapp:latest

# Baza obrazni tavsiya etilgan yangisiga almashtirish bo'yicha maslahat
docker scout recommendations myapp:latest
```

**Intervyuda shunday ayting:** "Image skanerlashni CI'ga qo'shaman (Docker Scout, Trivy, Grype): kritik zaifliklarda build to'xtaydi, SBOM yaratiladi va saqlanadi. Skaner faqat ma'lum zaifliklarni topadi — shuning uchun minimal image va muntazam bazaviy image yangilanishi ham kerak."

---

## Q49. Rootless Docker va user namespace'lar / Rootless Docker and user namespaces

**Oddiy qilib aytganda:** Oddiy Docker daemon root huquqlari bilan ishlaydi — konteynerdan qochib chiqish hostda root degani. Rootless Docker'da daemon ham, konteynerlar ham oddiy foydalanuvchi huquqi bilan ishlaydi — hujum muvaffaqiyatli bo'lsa ham zarar cheklanadi.

**Batafsilroq:**

**EN:** Rootless mode allows running Docker daemon and containers as a non-root user, mitigating potential container breakout vulnerabilities.

**UZB:** Rootless rejim Docker daemon va konteynerlarni root bo'lmagan oddiy foydalanuvchi sifatida ishga tushirishga imkon beradi, bu konteynerdan buzib kirish (container breakout) xavflarini bartaraf etadi.

```bash
# Rootless Docker o'rnatish va ishga tushirish | Setup rootless Docker
dockerd-rootless-setuptool.sh install

export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock
docker run -d -p 8080:80 nginx:alpine
```

**Qo'shimcha — Docker User Namespaces (userns-remap) xavfsizlik funksiyasi:**

**EN:** User namespaces map the root user inside a container to an unprivileged non-root user on the host system.

**UZB:** User namespace konteyner ichidagi root foydalanuvchini host serverdagi oddiy xavfsiz foydalanuvchiga bog'lab qo'yadi.

**Intervyuda shunday ayting:** "Rootless rejim va user namespace remap konteynerdagi root'ni hostda imtiyozsiz foydalanuvchiga xaritalaydi. Cheklovlari bor (past portlar, ba'zi tarmoq/xotira driver'lari). Minimal talab — konteyner ichida `USER` root emas; Podman standart holatda rootless."

---

## Q50. Distroless Image nima va u nima uchun ishlatiladi? / What is a Distroless Image and why is it used?

**Oddiy qilib aytganda:** Distroless image — faqat ilova va uning ishlashi uchun kerakli fayllar: shell yo'q, paket menejeri yo'q, ortiqcha dasturlar yo'q. Hujumchi konteynerga kirsa ham, ishlatadigan asbob topolmaydi va image kichik bo'ladi.

**Batafsilroq:**

**EN:** Distroless images contain only your application and runtime dependencies. They omit shell (`sh`/`bash`), package managers (`apt`/`apk`), and standard Linux utilities to minimize attack surface and image size.

**UZB:** Distroless obrazlar faqat ilova va uning ishlash qaramliklarini saqlaydi. Unumdorlik va xavfsizlikni oshirish uchun ularda shell (`sh`/`bash`), paket menejerlari va standart Linux utilitalari bo'lmaydi.

```dockerfile
# Multi-stage build with Google Distroless
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt -t /app/packages

FROM gcr.io/distroless/python3-debian12
COPY --from=builder /app/packages /app/packages
COPY . /app
WORKDIR /app
ENV PYTHONPATH=/app/packages
CMD ["main.py"]
```

**Intervyuda shunday ayting:** "Distroless yoki `scratch` runtime'ni minimal qiladi — kamroq CVE va kichik hujum yuzasi. Narxi — debugging qiyinroq (shell yo'q), buning uchun `:debug` variantlari yoki `docker debug`. Multi-stage build bilan juda yaxshi mos keladi."

---

## Q51. Docker Contexts nima va u uzoqdagi serverlarni boshqarishda qanday ishlatiladi? / What are Docker Contexts and how are they used for remote management?

**Oddiy qilib aytganda:** Docker context — Docker CLI qaysi 'Docker'ga ulanishini tanlash: lokal, masofaviy server (SSH orqali) yoki boshqa muhit. `docker context use prod-server` dan keyin barcha buyruqlar o'sha serverda bajariladi.

**Batafsilroq:**

**EN:** Docker contexts allow managing multiple local and remote Docker engines (or Kubernetes clusters) directly from your local Docker CLI without SSH password prompts.

**UZB:** Docker context'lar mahalliy va masofadagi Docker engine'larni mahalliy terminaldan SSH orqali oson almashib boshqarish imkonini beradi.

```bash
# Masofaviy server uchun context yaratish | Create remote context
docker context create staging-server --docker "host=ssh://deploy@192.168.1.100"

# Context ga o'tish | Switch context
docker context use staging-server
docker ps # Endi staging-server'dagi konteynerlarni ko'rsatadi
```

**Intervyuda shunday ayting:** "Context'lar masofaviy Docker host'larini xavfsiz boshqarish uchun: SSH orqali (`docker context create --docker host=ssh://user@host`) — daemon'ni tarmoqqa TCP bilan ochmaslik uchun. Noto'g'ri context'da buyruq bajarish xavfi bor — joriy context'ni terminal promptida ko'rsataman."

---

## Q52. Docker Compose V2 profile'lar qanday ishlaydi? / How do Docker Compose V2 profiles work?

**Oddiy qilib aytganda:** Compose profiles — servislarni guruhlab, faqat kerakli guruhni ishga tushirish: masalan, `debug` profilidagi pgAdmin faqat `docker compose --profile debug up` desangiz ishga tushadi, oddiy `up` da esa yo'q.

**Batafsilroq:**

**EN:** Profiles allow enabling/disabling specific services in `docker-compose.yml` (e.g. debug tools, test DBs, monitoring) depending on the environment.

**UZB:** Profile'lar `docker-compose.yml` da ma'lum servislarni (masalan debug vositalari, test bazalari, monitoring) faqat kerakli muhitda ishga tushirish imkonini beradi.

```yaml
services:
  web:
    image: myapp:v1
  pgadmin:
    image: dpage/pgadmin4
    profiles: ["debug"] # Faqat --profile debug berilganda ishlaydi
```

```bash
# Debug bilan birga ishga tushirish | Run with debug profile
docker compose --profile debug up -d
```

**Intervyuda shunday ayting:** "Profiles bitta Compose faylida ixtiyoriy servislarni (debug vositalari, monitoring, testlar) saqlash imkonini beradi — alohida fayllar ko'paymaydi. Profilsiz servislar doim ishga tushadi; profilni `COMPOSE_PROFILES` muhit o'zgaruvchisi bilan ham berish mumkin."

---

## Q53. Konteyner resurslarini cheklash: CPU, xotira, swap va OOM / Limiting container resources: CPU, memory, swap and OOM

**Oddiy qilib aytganda:** Har konteynerga 'ko'pi bilan shuncha' deb chegara qo'yish kerak: xotira (`--memory=512m`), CPU (`--cpus=1.5`). Xotira chegarasidan oshsa, tizim konteynerni o'ldiradi (OOM kill) — lekin boshqa konteynerlar va server omon qoladi.

**Batafsilroq:**

**EN:** Restricting CPU and RAM prevents a single misbehaving container from crashing the entire host system (OOM Killer prevention).

**UZB:** CPU va RAM manbalarini cheklash bitta konteyner butun server xotirasini tugatib qo'yishini (OOM Killer) oldini oladi.

```bash
# CLI orqali 1 CPU va 512MB RAM cheklovi | Limit via CLI
docker run -d --name limited_app --cpus="1.0" --memory="512m" --memory-swap="1g" nginx:alpine
```

```yaml
# Docker Compose V2 resurs cheklovi | Resource limit in Compose
services:
  app:
    image: backend:latest
    deploy:
      resources:
        limits:
          cpus: "1.5"
          memory: 1024M
        reservations:
          cpus: "0.5"
          memory: 256M
```

**Qo'shimcha — Docker Container Swap Management (--memory-swap):**



**Qo'shimcha — Docker Container OOM (Out Of Memory) Killer Behavior & OOM Score Adjust:**



**Intervyuda shunday ayting:** "Xotira chegarasiz konteyner host'ni OOM'ga olib kelishi mumkin — doim `--memory` (va `--memory-swap` bilan swap'ni boshqarish). CPU uchun `--cpus`. OOM kill'da chiqish kodi 137 va `OOMKilled: true` — ilova xotira chegarasini bilishi kerak (masalan, JVM/Node heap sozlamasi)."

---

## Q54. Storage driver'lar va overlay2 qanday ishlaydi? / How do storage drivers and overlay2 work?

**Oddiy qilib aytganda:** Storage driver — image qatlamlari va konteynerning yozuv qatlamini diskda qanday birlashtirishni belgilaydi. Zamonaviy standart — `overlay2`: pastki qatlamlar faqat o'qiladi, o'zgarishlar esa yuqori qatlamga yoziladi.

**Batafsilroq:**

**EN:** Overlay2 is the default copy-on-write (CoW) storage driver for Docker on Linux. It overlays upper (writable) and lower (read-only image) layers efficiently.

**UZB:** Overlay2 — Linux platformasida Docker uchun standart saqlash drayveri. U o'qish uchun mo'ljallangan qatlamlar ustiga yoziladigan qatlamni samarali joylashtiradi.

```bash
# Ishlatilayotgan drayverni ko'rish | Check active storage driver
docker info | grep "Storage Driver"
# Storage Driver: overlay2
```

**Qo'shimcha — Docker Overlay2 Lowerdir, Upperdir, Mergedir, Workdir Mechanism:**



**Qo'shimcha — Docker Overlay Filesystem Performance Optimization:**



**Intervyuda shunday ayting:** "overlay2 image qatlamlarini `lowerdir`, konteyner o'zgarishlarini `upperdir` qilib, birlashgan ko'rinishni `merged` da beradi; faylni o'zgartirish uni yuqori qatlamga to'liq nusxalaydi (copy-up) — katta fayllar va ko'p yoziladigan ma'lumot uchun sekin. Shuning uchun intensiv yozuv volume'larda bo'lishi kerak."

---

## Q55. Docker Init buyrug'i nima? / What is the `docker init` command?

**Oddiy qilib aytganda:** `docker init` — loyihangizga qarab (Python, Node, Go...) tayyor `Dockerfile`, `compose.yaml` va `.dockerignore` yaratib beradigan buyruq. Noldan boshlashdan ko'ra yaxshi amaliyotlarga mos boshlang'ich nuqta.

**Batafsilroq:**

**EN:** `docker init` is a modern CLI utility introduced in Docker Desktop/Engine that automatically generates optimized Dockerfile, docker-compose.yml, and .dockerignore files for Python, Node.js, Go, Rust, Java apps.

**UZB:** `docker init` — loyihangiz tili (Python, Node.js, Go, Rust va hokazo) uchun avtomatik tarzda optimallashtirilgan Dockerfile, docker-compose.yml va .dockerignore fayllarini yaratib beruvchi zamonaviy utilita.

```bash
# Loyiha papkasida ishga tushirish | Run in project root
docker init
```

**Intervyuda shunday ayting:** "`docker init` yaxshi standartlarni beradi (multi-stage, root bo'lmagan foydalanuvchi, kesh mount'lar), lekin natijani ko'rib chiqaman va loyihaga moslayman — yaratilgan fayl ham kod ko'rigidan o'tadi."

---

# ⚫ Ekspert daraja / Expert

---

## Q56. Image'larni imzolash: Docker Content Trust nega to'xtatildi va o'rniga nima? / Image signing: why Docker Content Trust is retired and what replaces it

**Oddiy qilib aytganda:** Image imzolash — 'bu image'ni aynan biz qurdik va hech kim o'zgartirmagan' degan kriptografik kafolat. Docker'ning eski usuli — Docker Content Trust (Notary v1) — 2025-yildan boshlab bosqichma-bosqich to'xtatilmoqda va 2026-yil 8-dekabrda to'liq yopiladi. O'rniga Sigstore/Cosign yoki Notation ishlatiladi.

**Batafsilroq:**

**EN:** Docker Content Trust (Notary v1) is being retired: Docker Official Images stopped DCT signing from August 2025 and the Notary v1 service shuts down on 8 December 2026. Use OCI-native signing — Sigstore Cosign or Notary Project Notation — whose signatures live next to the image in any compliant registry.

**UZB:** Docker Content Trust (Notary v1) to'xtatilmoqda: Docker Official Images 2025-yil avgustdan DCT imzolashni to'xtatdi, Notary v1 xizmati 2026-yil 8-dekabrda yopiladi. O'rniga OCI-native imzolash — Sigstore Cosign yoki Notary Project Notation; imzolar registry'da image yonida saqlanadi.

```bash
# Eski usulni o'chirish | Turn off the legacy mechanism
unset DOCKER_CONTENT_TRUST

# Cosign bilan imzolash (keyless, CI'dagi OIDC identifikatori bilan) | Sign with Cosign
cosign sign ghcr.io/acme/api@sha256:<digest>

# Deploy'dan oldin tekshirish | Verify before deploy
cosign verify ghcr.io/acme/api@sha256:<digest> \
  --certificate-identity-regexp 'https://github.com/acme/api/.github/workflows/.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```

Manba: [Docker Content Trust: Retirement and Migration Guidance](https://www.docker.com/blog/docker-content-trust-retirement-and-migration-guidance/).

**Intervyuda shunday ayting:** "Hozirgi standart — OCI-native imzolar: Sigstore Cosign (ko'pincha keyless, OIDC bilan) yoki Notary Project Notation; imzolar registry'da image yonida saqlanadi. `DOCKER_CONTENT_TRUST` ni o'chiraman, image'larni digest bilan qotiraman va deploy'da imzoni policy bilan tekshiraman (Kyverno, Sigstore policy-controller)."

---

## Q57. Privileged rejim va Linux capabilities / Privileged mode and Linux capabilities

**Oddiy qilib aytganda:** Privileged rejim konteynerga hostning deyarli barcha huquqlarini beradi — u qurilmalarga kira oladi va aslida izolyatsiya yo'qoladi. Linux capabilities esa root huquqlarini mayda bo'laklarga ajratadi: konteynerga faqat kerakli bittasini (masalan, past portni band qilish) berish mumkin.

**Batafsilroq:**

**EN:** Running containers with `--privileged` grants full root access to all host devices and kernel features, introducing critical security vulnerabilities. Avoid in production.

**UZB:** Konteynerni `--privileged` rejimi bilan ishga tushirish host serverning barcha apparat va yadrosiga to'liq kirish beradi, bu juda xavfli. Ishlab chiqarishda ishlatmaslik tavsiya etiladi.

**Qo'shimcha — Docker Container Capability Management (cap-add, cap-drop):**



**Intervyuda shunday ayting:** "`--privileged` ni deyarli hech qachon ishlatmayman — konteynerdan host'ga chiqish oson bo'ladi. O'rniga `--cap-drop ALL` va faqat kerakli capability'lar (`NET_BIND_SERVICE`), `no-new-privileges`, seccomp/AppArmor profillari."

---

## Q58. Docker Container Sidecar Pattern va Logging Aggregation

**Oddiy qilib aytganda:** Sidecar — asosiy konteyner yonida ishlaydigan yordamchi konteyner: masalan, ilova loglarini yig'ib markaziy tizimga yuboradigan agent yoki TLS'ni boshqaradigan proxy. Asosiy ilova o'z ishini qiladi, qo'shimcha vazifalar yordamchida.

**Batafsilroq:**

**EN:** The Sidecar pattern deploys a secondary helper container (e.g., Fluentd, Vector, Filebeat) alongside the main application container to collect and stream logs to central storage.

**UZB:** Sidecar patterni asosiy ilova konteyneri yoniga qo'shimcha yordamchi konteyner qo'yib, loglarni markaziy serverga jo'natishni ta'minlaydi.

**Intervyuda shunday ayting:** "Sidecar kesib o'tuvchi vazifalarni (log shipping, proxy, sertifikat yangilash) ilovadan ajratadi va qayta ishlatiladigan qiladi. Kubernetes'da bu native sidecar konteynerlari (init container `restartPolicy: Always`); lekin har pod'ga qo'shimcha resurs qo'shadi — node darajasidagi agent (DaemonSet) ko'pincha arzonroq."

---

## Q59. Docker Desktop Performance Tuning (VirtioFS, Rosetta 2)

**Oddiy qilib aytganda:** macOS va Windows'da Docker aslida kichik virtual mashina ichida ishlaydi, shuning uchun fayllarni kompyuterdan konteynerga ulash sekin bo'lishi mumkin. Sozlamalarda tez fayl almashinuvi (VirtioFS) va Apple Silicon'da x86 image'lar uchun Rosetta yoqilishi tezlikni sezilarli oshiradi.

**Batafsilroq:**

**EN:** On macOS Apple Silicon, enabling VirtioFS for file sharing and Rosetta 2 for x86_64 emulation drastically reduces CPU and I/O latency.

**UZB:** Apple Silicon protsessorlarida VirtioFS fayl tizimi va Rosetta 2 emulyatsiyasini yoqish Docker Desktop ish tezligini keskin oshiradi.

**Intervyuda shunday ayting:** "Docker Desktop'da unumdorlik: VirtioFS fayl almashinuvi, Rosetta orqali amd64 emulyatsiyasi, VM'ga yetarli CPU/RAM va disk. Katta `node_modules` kabi papkalarni bind mount o'rniga volume'da saqlash tezlikni oshiradi. Avtomatik yangilanishlarni production'ga o'xshash mashinalarda nazorat ostida qilaman."

---

## Q60. Docker Container Live Restore nima? / What is Docker Container Live Restore?

**Oddiy qilib aytganda:** Live restore — Docker daemon qayta ishga tushsa yoki yangilansa ham, ishlayotgan konteynerlar to'xtamasdan ishlashda davom etishi. Daemon qaytib kelganda ularni yana boshqarishni davom ettiradi.

**Batafsilroq:**

**EN:** Live Restore keeps containers running even when the Docker daemon crashes or is undergoing maintenance/upgrades.

**UZB:** Live Restore parametri Docker daemon o'chib qolganda yoki yangilanayotganda ham konteynerlar to'xtamasdan ishlashini ta'minlaydi.

```json
// /etc/docker/daemon.json
{
  "live-restore": true
}
```

**Intervyuda shunday ayting:** "`"live-restore": true` daemon'ni yangilash yoki qayta ishga tushirishda konteynerlarni tirik saqlaydi — containerd-shim ularni ushlab turadi. Swarm mode bilan mos emas va daemon uzoq vaqt o'chiq qolsa, loglar bufer to'lishi sababli bloklanishi mumkin."

---

## Q61. Compose'ni modullarga bo'lish: `include` va `x-` kengaytmalari / Modular Compose: `include` and `x-` extensions

**Oddiy qilib aytganda:** Katta Compose faylni bo'laklarga bo'lish: `include` bilan boshqa Compose fayllarni ulash (masalan, har jamoa o'z servisini alohida faylda saqlaydi) va `x-` bilan boshlanadigan bloklarda umumiy sozlamalarni bir marta yozib, YAML anchor'lari bilan qayta ishlatish.

**Batafsilroq:**

**EN:** Docker Compose V2 supports `include` directive to import other compose files modularly.

**UZB:** Docker Compose V2 bir nechta compose fayllarni modulli ravishda birlashtirish uchun `include` imkoniyatini taqdim etadi.

```yaml
include:
  - ./infrastructure/db-compose.yml
  - ./monitoring/prometheus-compose.yml

services:
  web:
    build: .
```

**Qo'shimcha — Docker Compose Spec Custom Extensions (x-attributes):**

```yaml
x-logging: &default-logging
  driver: "json-file"
  options:
    max-size: "10m"

services:
  app:
    image: myapp
    logging: *default-logging
```

**Intervyuda shunday ayting:** "`include` (Compose 2.20+) mustaqil Compose loyihalarini birlashtiradi va har birining nisbiy yo'llarini to'g'ri hal qiladi; `x-` kengaytmalar + YAML anchor'lari (`<<: *defaults`) takrorlanishni yo'qotadi. Override fayllardan ko'ra aniqroq va modulli."

---

## Q62. Container Signal Handling (SIGTERM, SIGKILL) va PID 1 bo'lish muammosi

**Oddiy qilib aytganda:** Konteynerni to'xtatishda Docker avval jarayonga SIGTERM ('iltimos, to'xta') yuboradi, 10 soniyadan keyin esa SIGKILL ('majburan o'chir'). Agar ilova SIGTERM'ni ushlamasa yoki PID 1 sifatida signalni olmasa — u ishini tugatolmay, keskin o'ldiriladi va so'rovlar yarim qoladi.

**Batafsilroq:**

**EN:** If your app runs as PID 1 without an init system, it won't handle SIGTERM gracefully. Use `tini` or `docker run --init`.

**UZB:** Agar ilova konteyner ichida PID 1 sifatida ishlasa, SIGTERM signalini qabul qilmasligi mumkin. Uning uchun `tini` dan foydalaniladi.

```dockerfile
# Dockerfile ichida tini ishlatish
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]
CMD ["python", "app.py"]
```

**Intervyuda shunday ayting:** "Konteynerda ilova PID 1 bo'ladi: u signallarni to'g'ri qayta ishlashi va zombie jarayonlarni yig'ishi kerak. Exec shaklidagi `ENTRYPOINT` ishlataman (shell o'rash signalni yutadi), kerak bo'lsa `--init` (tini). Ilova SIGTERM'da yangi so'rov qabul qilishni to'xtatib, ishlayotganlarini tugatadi; `stop_grace_period` ni shunga moslayman."

---

## Q63. Docker Compose Watch Mode (Hot Reloading)

**Oddiy qilib aytganda:** `docker compose watch` — kodni o'zgartirganingizda uni avtomatik ravishda konteynerga sinxronlaydi yoki kerak bo'lsa image'ni qayta quradi. Har o'zgarishdan keyin qo'lda qayta ishga tushirish shart emas.

**Batafsilroq:**

**EN:** Docker Compose V2 `watch` feature auto-syncs local file changes to running containers instantly without rebuilding images.

**UZB:** Docker Compose V2 `watch` buyrug'i koddagi o'zgarishlarni real vaqtda konteynerga uzatadi va avtomatik hot-reload qiladi.

```yaml
services:
  web:
    build: .
    develop:
      watch:
        - action: sync
          path: ./src
          target: /app/src
        - action: rebuild
          path: package.json
```

**Intervyuda shunday ayting:** "Compose Watch `develop.watch` qoidalari bilan ishlaydi: `sync` — fayllarni konteynerga ko'chirish (hot reload), `rebuild` — bog'liqliklar o'zgarganda qayta qurish, `sync+restart`. Bind mount'dan farqli, faqat kerakli fayllar sinxronlanadi va macOS'da tezroq."

---

## Q64. Docker Engine API bilan Python (`docker-py`) orqali konteynerlarni boshqarish

**Oddiy qilib aytganda:** Docker'ni Python kodidan boshqarish mumkin: Docker SDK (`docker` paketi) orqali konteynerlarni ishga tushirish, to'xtatish, loglarini o'qish. Test muhitlari yoki avtomatlashtirish vositalari yaratishda qulay.

**Batafsilroq:**

```python
import docker

client = docker.from_env()

# Konteyner yaratish va ishga tushirish
container = client.containers.run(
    "nginx:alpine",
    detach=True,
    ports={'80/tcp': 8080},
    name="my_nginx"
)

print(f"Konteyner ID: {container.short_id}")
for line in container.logs(stream=True):
    print(line.strip())
```

**Intervyuda shunday ayting:** "Docker SDK Engine API'ni Python'dan chaqiradi — test infratuzilmasi (masalan, testcontainers), CI vositalari yoki ichki platformalar uchun. Docker socket'iga kirish amalda host'da root huquqi degani — bunday vositalarni ishonchli muhitda va minimal huquqlar bilan ishga tushiraman."

---

## Q65. Konteynerlarni to'xtovsiz (zero-downtime) yangilash usullari / Zero-downtime container deployment patterns

**Oddiy qilib aytganda:** To'xtovsiz yangilash — foydalanuvchilar sezmasdan yangi versiyani chiqarish. Rolling update — nusxalarni birma-bir almashtirish; blue-green — yangi versiyani yonma-yon ko'tarib, trafikni birdan o'tkazish; canary — yangi versiyani avval kichik foydalanuvchilar guruhiga berish.

**Batafsilroq:**



**Qo'shimcha — Docker Swarm Rolling Update va Rollback strategiyasi / Docker Swarm Rolling Update & Rollback:**

```bash
# Servisni uzluksiz yangilash | Rolling update without downtime
docker service update   --image myapp:v2.0   --update-parallelism 2   --update-delay 10s   --update-failure-action rollback   myservice
```

**Intervyuda shunday ayting:** "Rolling update uchun: health check, graceful shutdown (SIGTERM), readiness bo'yicha trafik va orqaga mos baza migratsiyalari. Swarm'da `update_config` (parallelism, delay, failure_action: rollback), Kubernetes'da Deployment strategiyalari. Rollback — oldingi image digest'iga qaytish."

---

## Q66. Modern Container Ecosystem Summary: Docker, Podman, Rancher, Containerd, WASM

**Oddiy qilib aytganda:** Docker — konteynerlar olamining bir qismi. Standart (OCI) tufayli bitta image'ni turli vositalar ishga tushira oladi: Podman (daemon'siz, rootless), containerd (Kubernetes ichida), Rancher/Kubernetes (orkestratsiya), Wasm (yengil yangi format).

**Batafsilroq:**

**EN:** Modern containerization extends beyond Docker CLI to OCI standards, rootless daemons like Podman, containerd, and lightweight WebAssembly runtimes.

**UZB:** Zamonaviy konteynerlashtirish Docker'dan tashqari OCI standartlari, Podman kabi rootless vositalar va WebAssembly runtime'larini ham qamrab oladi.

---

_Prepared by | Tayyorlagan: Alyorjon_  
_Sources | Manbalar: Docker Docs, CNCF, GeeksforGeeks, DataCamp, InterviewBit_

**Intervyuda shunday ayting:** "OCI standarti image va runtime'ni vositalardan mustaqil qiladi: Docker bilan qurilgan image Podman, containerd yoki Kubernetes'da ishlaydi. Dev uchun Docker Desktop yoki Podman, production'da odatda containerd ustidagi Kubernetes. Tanlov litsenziya, xavfsizlik (rootless) va jamoa tajribasiga bog'liq."

---

# 📎 Ilova / Appendix

## 📌 Quick Reference | Tez Qo'llanma

```bash
# ═══ IMAGE ═══════════════════════════════════════════════
docker pull nginx                  # Hub'dan | From Hub
docker build -t app:1.0 .          # Qurish | Build
docker images                      # Ro'yxat | List
docker rmi nginx                   # O'chirish | Remove
docker image prune -a              # Tozalash | Clean

# ═══ CONTAINER ═══════════════════════════════════════════
docker run -d -p 8080:80 nginx    # Ishga tushirish | Run
docker run -it ubuntu bash        # Interaktiv | Interactive
docker ps                         # Ishlaydigan | Running
docker ps -a                      # Barchasi | All
docker stop <id>                  # To'xtatish | Stop
docker start <id>                 # Boshlash | Start
docker rm <id>                    # O'chirish | Remove
docker rm -f <id>                 # Majburan | Force remove

# ═══ DEBUG ════════════════════════════════════════════════
docker logs -f <id>               # Jonli log | Live logs
docker exec -it <id> bash         # Ichiga kirish | Enter
docker inspect <id>               # Batafsil | Detailed info
docker stats                      # Resurslar | Resources
docker top <id>                   # Jarayonlar | Processes

# ═══ VOLUME ══════════════════════════════════════════════
docker volume create my-vol       # Yaratish | Create
docker volume ls                  # Ro'yxat | List
docker volume rm my-vol           # O'chirish | Remove
docker volume prune               # Tozalash | Clean
docker run -v my-vol:/data nginx  # Volume ulash | Mount

# ═══ NETWORK ═════════════════════════════════════════════
docker network ls                 # Ro'yxat | List
docker network create my-net      # Yaratish | Create
docker network connect my-net <id> # Ulash | Connect
docker network rm my-net          # O'chirish | Remove

# ═══ COMPOSE ═════════════════════════════════════════════
docker compose up -d              # Ishga tushirish | Start
docker compose down               # To'xtatish | Stop
docker compose down -v            # To'xtatib volumelarni o'chirish | Stop + volumes
docker compose logs -f            # Loglar | Logs
docker compose ps                 # Holat | Status
docker compose exec api bash      # Service ichiga | Enter service
docker compose build              # Qayta qurish | Rebuild

# ═══ SYSTEM ══════════════════════════════════════════════
docker system df                  # Disk | Disk usage
docker system prune               # Tozalash | Clean unused
docker system prune -a --volumes  # ⚠️ Hammasi | Everything
docker info                       # Tizim ma'lumoti | System info
```

---

## 📝 Real World: FastAPI + PostgreSQL + Redis Stack

```yaml
# docker-compose.yml — Tayyor namuna | Ready example

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: fastapi_app
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql+asyncpg://admin:secret@db:5432/mydb
      - REDIS_URL=redis://redis:6379/0
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - .:/app # Dev uchun | For dev
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:15-alpine
    container_name: postgres_db
    restart: unless-stopped
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d mydb"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: redis_cache
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    container_name: nginx_proxy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - api

volumes:
  postgres_data:
  redis_data:
```

```bash
# Ishga tushirish | Start
docker compose up -d

# Loglarni tekshirish | Check logs
docker compose logs -f api

# DB migratsiyasini bajarish | Run DB migration
docker compose exec api alembic upgrade head

# To'xtatish | Stop
docker compose down
```

---

_Prepared by | Tayyorlagan: Alyorjon_  
_Sources | Manbalar: Docker Docs, GeeksforGeeks, DataCamp, InterviewBit, Edureka_

---
