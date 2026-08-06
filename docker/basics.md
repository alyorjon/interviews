# 🐳 Docker Interview Questions & Answers

# 🐳 Docker Intervyu Savol va Javoblari

> **EN:** Practical Docker interview questions with real examples — from basics to advanced.  
> **UZ:** Asosiydan murakkabgacha — amaliy misollar bilan Docker intervyu savollari.

---

## � Modern Docker interview topics

**EN:** Real-world Docker interviews now test production concerns like image optimization, health checks, compose best practices, and security.

**UZ:** Amaliy Docker intervyularida endi image optimizatsiyasi, healthcheck, compose best practices va xavfsizlik muammolari ham ko‘proq tekshiriladi.

- Multi-stage builds for smaller images.
- `HEALTHCHECK` and graceful shutdown with PID 1.
- `docker compose watch` and service readiness.
- Rootless containers and least-privilege setups.
- Image scanning and supply-chain security.

```bash
docker build -t my-app .
docker run -d --name my-app --health-cmd="curl -f http://localhost/ || exit 1" my-app
```

---

## �📑 Mundarija | Table of Contents

1. [Docker asoslari | Docker Basics](#1-asoslar--basics)
2. [Image va Container](#2-image-va-container)
3. [Dockerfile](#3-dockerfile)
4. [Docker Compose](#4-docker-compose)
5. [Networking | Tarmoq](#5-networking--tarmoq)
6. [Volumes | Ma'lumot saqlash](#6-volumes--maʼlumot-saqlash)
7. [Amaliy buyruqlar | Practical Commands](#7-amaliy-buyruqlar--practical-commands)
8. [Advanced | Ilg'or mavzular](#8-advanced--ilgor-mavzular)
9. [Quick Reference | Tez Qo'llanma](#-quick-reference--tez-qollanma)

---

## 1. Asoslar | Basics

---

### Q1. What is Docker? | Docker nima?

**EN:** Docker is an open-source containerization platform used for building, shipping, and running applications inside isolated environments called containers. It ensures that software runs the same way regardless of where it is deployed.

**UZ:** Docker — ilovalarni izolyatsiyalangan muhitda (container) yaratish, yuborish va ishga tushirish uchun mo'ljallangan ochiq manbali platforma. Dastur qayerda ishga tushirilmasin, bir xil ishlashini kafolatlaydi.

```bash
# Docker versiyasini tekshirish | Check Docker version
docker --version
# Docker version 26.1.0, build 123456

# Docker ma'lumotlari | Docker info
docker info
```

---

### Q2. What is a Container? | Container nima?

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

---

### Q3. What is the difference between Docker and a Virtual Machine? | Docker va Virtual Machine farqi nima?

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

---

### Q4. What is Docker Architecture? | Docker Arxitekturasi nima?

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

---

### Q5. What is Docker Hub? | Docker Hub nima?

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

---

### Q6. What are the main features of Docker? | Docker'ning asosiy xususiyatlari nima?

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

---

### Q7. What is a Docker Namespace? | Docker Namespace nima?

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

---

### Q8. What is cgroups in Docker? | Docker'da cgroups nima?

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

---

## 2. Image va Container

---

### Q9. What is a Docker Image? | Docker Image nima?

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

---

### Q10. What is the difference between Docker Image and Docker Container? | Docker Image va Docker Container farqi nima?

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

---

### Q11. What are the states of a Docker Container? | Docker Container holatlari qanday?

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

---

### Q12. How to create and run a Docker Container? | Docker Container qanday yaratiladi va ishga tushiriladi?

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

---

### Q13. How to build a Docker Image? | Docker Image qanday quriladi?

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

---

### Q14. Can you remove a paused container? | Paused containerni o'chirish mumkinmi?

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

---

### Q15. Will you lose data when a Docker container exits? | Container to'xtasa ma'lumotlar yo'qoladimi?

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

---

### Q16. How to copy files between host and container? | Host va container orasida fayllarni qanday ko'chirish mumkin?

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

---

## 3. Dockerfile

---

### Q17. What is a Dockerfile? | Dockerfile nima?

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

---

### Q18. What are common Dockerfile instructions? | Dockerfile'dagi asosiy ko'rsatmalar nima?

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

---

### Q19. What is the difference between CMD and ENTRYPOINT? | CMD va ENTRYPOINT farqi nima?

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

---

### Q20. What is the difference between COPY and ADD? | COPY va ADD farqi nima?

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

---

### Q21. What is .dockerignore? | .dockerignore nima?

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

---

### Q22. What is a Multi-stage Build? | Multi-stage Build nima?

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

---

### Q23. What is Docker layer caching? | Docker qatlam keshlash nima?

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

---

## 4. Docker Compose

---

### Q24. What is Docker Compose? | Docker Compose nima?

**EN:** Docker Compose is a tool for defining and running multi-container applications using a single `docker-compose.yml` YAML file. One command starts all services.

**UZ:** Docker Compose — bitta `docker-compose.yml` YAML fayli yordamida ko'p containerni aniqlash va ishga tushirish uchun asbob. Bitta buyruq bilan barcha servicelar ishga tushadi.

```yaml
# docker-compose.yml — FastAPI + PostgreSQL + Redis

version: "3.9"

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

---

### Q25. What is `depends_on` in Docker Compose? | Docker Compose'da `depends_on` nima?

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

---

### Q26. How to scale services in Docker Compose? | Docker Compose'da servicelarni qanday scale qilish mumkin?

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

---

## 5. Networking | Tarmoq

---

### Q27. What are Docker Network types? | Docker Tarmoq turlari nima?

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

---

### Q28. How do containers communicate with each other? | Containerlar bir-biri bilan qanday muloqot qiladi?

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

---

### Q29. What is Port Mapping? | Port Mapping nima?

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

---

## 6. Volumes | Ma'lumot saqlash

---

### Q30. What is a Docker Volume? | Docker Volume nima?

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

---

### Q31. What is the difference between Volumes, Bind Mounts, and tmpfs? | Volume, Bind Mount va tmpfs farqi nima?

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

---

### Q32. How to backup a Docker Volume? | Docker Volume'ni qanday zaxiralash mumkin?

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

---

## 7. Amaliy buyruqlar | Practical Commands

---

### Q33. What are the most important Docker commands? | Eng muhim Docker buyruqlari qaysilar?

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

---

### Q34. How to enter a running container? | Ishlaydigan container ichiga qanday kirish mumkin?

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

---

### Q35. How to view container logs? | Container loglarini qanday ko'rish mumkin?

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

---

### Q36. How to monitor Docker containers? | Docker containerlarni qanday monitoring qilish mumkin?

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

---

### Q37. How to clean up Docker resources? | Docker resurslarini qanday tozalash mumkin?

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

---

## 8. Advanced | Ilg'or mavzular

---

### Q38. What is Docker Swarm? | Docker Swarm nima?

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

---

### Q39. What is the difference between Docker Swarm and Kubernetes? | Docker Swarm va Kubernetes farqi nima?

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

---

### Q40. What is a Docker Registry? | Docker Registry nima?

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

---

### Q41. How to restart a container automatically? | Container'ni avtomatik qayta ishga tushirish qanday?

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

---

### Q42. What is Docker HEALTHCHECK? | Docker HEALTHCHECK nima?

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

---

### Q43. What are Docker best practices? | Docker best practices nima?

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

---

### Q44. What is Docker `commit`? | Docker `commit` nima?

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

---

### Q45. How to use environment variables securely in Docker? | Docker'da muhit o'zgaruvchilarini xavfsiz ishlatish qanday?

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

---

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

version: "3.9"

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

# 🔴 ADVANCED LEVEL (46–80)

---

## 46. Docker WASM / WASI integration nima va containerization kelajagida u qanday o'rin tutadi? / What is Docker WASM / WASI integration and its role in containerization?

**EN:** Docker supports WebAssembly (Wasm) runtimes alongside traditional OCI containers via WasmEdge / Spin runtimes. WASM containers launch in milliseconds and have negligible memory overhead (~few MBs).

**UZB:** Docker WasmEdge va Spin kabi runtime'lar yordamida an'anaviy OCI konteynerlari bilan birga WebAssembly (Wasm) ni qo'llab-quvvatlaydi. WASM konteynerlari millisekundlarda ishga tushadi va juda kam xotira (~bir necha MB) talab qiladi.

```bash
# Docker Desktop'da WASM ishga tushirish | Run WASM container in Docker
docker run --runtime=io.containerd.spin.v2 --platform=wasi/wasm32   ghcr.io/spinframework/spin-dotnet-http:v0.1.0
```

---

## 47. Docker Buildx va Multi-Platform Build qanday ishlaydi? / How does Docker Buildx and Multi-Platform Build work?

**EN:** `docker buildx` uses BuildKit to create multi-architecture images (e.g. `linux/amd64` and `linux/arm64` for Apple Silicon & Cloud servers) in a single command.

**UZB:** `docker buildx` BuildKit yordamida bitta buyruq bilan bir nechta arxitekturalar (masalan Apple Silicon va Bulutli serverlar uchun `linux/amd64` va `linux/arm64`) uchun konteyner obrazlarini quradi.

```bash
# Multi-platform builder yaratish va ishlatish | Create and use multi-platform builder
docker buildx create --name mybuilder --use
docker buildx inspect --bootstrap

# Bir vaqtda AMD64 va ARM64 uchun build qilib Docker Hub'ga joylash
docker buildx build --platform linux/amd64,linux/arm64 -t myusername/myapi:v2.0 --push .
```

---

## 48. Docker Scout va Vulnerability Scanning nima? / What is Docker Scout and Vulnerability Scanning?

**EN:** Docker Scout analyzes container images for security vulnerabilities (CVEs), software bill of materials (SBOM), and supply chain policy compliance.

**UZB:** Docker Scout konteyner obrazlarini xavfsizlik zaifliklari (CVE), dasturiy ta'minot komponentlari ro'yxati (SBOM) va yetkazib berish zanjiri xavfsizligi bo'yicha tahlil qiladi.

```bash
# Obraz zaifliklarini tekshirish | Quick CVE scan
docker scout cves myapp:latest

# Baza obrazni tavsiya etilgan yangisiga almashtirish bo'yicha maslahat
docker scout recommendations myapp:latest
```

---

## 49. Rootless Docker nima va u xavfsizlikni qanday oshiradi? / What is Rootless Docker and how does it enhance security?

**EN:** Rootless mode allows running Docker daemon and containers as a non-root user, mitigating potential container breakout vulnerabilities.

**UZB:** Rootless rejim Docker daemon va konteynerlarni root bo'lmagan oddiy foydalanuvchi sifatida ishga tushirishga imkon beradi, bu konteynerdan buzib kirish (container breakout) xavflarini bartaraf etadi.

```bash
# Rootless Docker o'rnatish va ishga tushirish | Setup rootless Docker
dockerd-rootless-setuptool.sh install

export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock
docker run -d -p 8080:80 nginx:alpine
```

---

## 50. Distroless Image nima va u nima uchun ishlatiladi? / What is a Distroless Image and why is it used?

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

---

## 51. Docker Contexts nima va u uzoqdagi serverlarni boshqarishda qanday ishlatiladi? / What are Docker Contexts and how are they used for remote management?

**EN:** Docker contexts allow managing multiple local and remote Docker engines (or Kubernetes clusters) directly from your local Docker CLI without SSH password prompts.

**UZB:** Docker context'lar mahalliy va masofadagi Docker engine'larni mahalliy terminaldan SSH orqali oson almashib boshqarish imkonini beradi.

```bash
# Masofaviy server uchun context yaratish | Create remote context
docker context create staging-server --docker "host=ssh://deploy@192.168.1.100"

# Context ga o'tish | Switch context
docker context use staging-server
docker ps # Endi staging-server'dagi konteynerlarni ko'rsatadi
```

---

## 52. Docker Compose V2 profile'lar qanday ishlaydi? / How do Docker Compose V2 profiles work?

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

---

## 53. Docker Container Resource Quotas (CPU & Memory Limit) qanday o'rnatiladi? / How to set Docker Container Resource Quotas (CPU & Memory Limit)?

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

---

## 54. Docker Storage Drivers (Overlay2, Btrfs, ZFS) va unumdorlik / Docker Storage Drivers and Performance

**EN:** Overlay2 is the default copy-on-write (CoW) storage driver for Docker on Linux. It overlays upper (writable) and lower (read-only image) layers efficiently.

**UZB:** Overlay2 — Linux platformasida Docker uchun standart saqlash drayveri. U o'qish uchun mo'ljallangan qatlamlar ustiga yoziladigan qatlamni samarali joylashtiradi.

```bash
# Ishlatilayotgan drayverni ko'rish | Check active storage driver
docker info | grep "Storage Driver"
# Storage Driver: overlay2
```

---

## 55. Docker Init buyrug'i nima? / What is the `docker init` command?

**EN:** `docker init` is a modern CLI utility introduced in Docker Desktop/Engine that automatically generates optimized Dockerfile, docker-compose.yml, and .dockerignore files for Python, Node.js, Go, Rust, Java apps.

**UZB:** `docker init` — loyihangiz tili (Python, Node.js, Go, Rust va hokazo) uchun avtomatik tarzda optimallashtirilgan Dockerfile, docker-compose.yml va .dockerignore fayllarini yaratib beruvchi zamonaviy utilita.

```bash
# Loyiha papkasida ishga tushirish | Run in project root
docker init
```

---

# ⚫ EXPERT LEVEL (56–100)

---

## 56. Container Security Hardening Best Practices / Konteynerlar xavfsizligini oshirish amaliyoti

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

---

## 57. Docker Log Rotation va Log Driver konfiguratsiyasi / Docker Log Rotation and Driver Config

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

---

## 58. Docker Content Trust (DCT) va Image Signing / Docker Content Trust and Image Signing

**EN:** DCT enables digital signing of Docker images using Notary/Cosign to guarantee image integrity and authenticity before deployment.

**UZB:** DCT raqamli imzo yordamida obrazlar faqat ishonchli manbadan kelganini va o'zgartirilmaganini kafolatlaydi.

```bash
# Content Trust'ni yoqish | Enable DCT
export DOCKER_CONTENT_TRUST=1

# Faqat imzolangan obrazlarni yuklashga ruxsat beradi
docker pull myrepo/myimage:signed
```

---

## 59. Docker Healthcheck va Grace Period sozlash / Configuring Docker Healthcheck and Grace Period

**EN:** Healthchecks allow Docker and Orchestrators to monitor container health and restart unhealthy instances automatically.

**UZB:** Healthcheck konteyner ichidagi servis ishlashini muntazam tekshiradi va buzilgan taqdirda avtomatik qayta ishga tushiradi.

```dockerfile
HEALTHCHECK --interval=10s --timeout=3s --start-period=30s --retries=3   CMD curl -f http://localhost:8000/health || exit 1
```

---

## 60. Kubernetes vs Docker Swarm farqlari / Differences between Kubernetes and Docker Swarm

| Xususiyat / Feature  | Docker Swarm                           | Kubernetes (k8s)                  |
| -------------------- | -------------------------------------- | --------------------------------- |
| O'rnatish / Setup    | Juda sodda (Docker ichida o'rnatilgan) | Murakkab, qo'shimcha infratuzilma |
| Scalability          | Kichik va o'rta loyihalar uchun        | Cheksiz, enterprise daraja        |
| Ekotizim / Ecosystem | Cheklangan                             | Juda boy (Helm, Istio, ArgoCD)    |
| Auto-scaling         | Qo'lda                                 | HPA (Horizontal Pod Autoscaler)   |

---

## 61. Docker Container Networking: Overlay Network va VXLAN

**EN:** Overlay networks create a distributed network across multiple Docker daemon hosts using VXLAN encapsulation, enabling secure cross-host container communication.

**UZB:** Overlay tarmog'i VXLAN protokoli yordamida bir nechta alohida host serverlardagi konteynerlar o'rtasida xavfsiz tarmoq hosil qiladi.

```bash
# Swarm rejimida overlay network yaratish | Create overlay network in Swarm
docker network create -d overlay --attachable my_overlay_net
```

---

## 62. Multi-stage Dockerfile bilan Go/Rust microservice build qilish / Building Go/Rust microservice with Multi-stage Dockerfile

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

---

## 63. Docker Garbage Collection: System Prune va Volume Cleanup

**EN:** Unused images, stopped containers, build caches, and dangling volumes consume massive disk space over time.

**UZB:** Ishlatilmayotgan obrazlar, to'xtatilgan konteynerlar va eskirgan cache'lar vaqt o'tishi bilan katta disk maydonini egallaydi.

```bash
# Barcha ishlatilmayotgan resurslarni o'chirish | Clean unused Docker objects
docker system prune -a --volumes --force
```

---

## 64. Docker Volume Plugins: Remote Storage Integration (NFS, AWS EBS)

**EN:** Docker volume plugins allow containers to mount persistent cloud storage directly across cloud instances.

**UZB:** Volume plaginlari konteynerlarga bulutli saqlash resurslarini (NFS, AWS EBS, NetApp) to'g'ridan-to'g'ri ulash imkonini beradi.

```bash
# NFS volume yaratish | Create NFS volume
docker volume create --driver local   --opt type=nfs   --opt o=addr=192.168.1.50,rw   --opt device=:/path/to/dir nfs_volume
```

---

## 65. Container Privileged Mode va uning xavflari / Container Privileged Mode and Risks

**EN:** Running containers with `--privileged` grants full root access to all host devices and kernel features, introducing critical security vulnerabilities. Avoid in production.

**UZB:** Konteynerni `--privileged` rejimi bilan ishga tushirish host serverning barcha apparat va yadrosiga to'liq kirish beradi, bu juda xavfli. Ishlab chiqarishda ishlatmaslik tavsiya etiladi.

---

## 66. Docker Build Cache Optimizatsiyasi va `--mount=type=cache`

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

---

## 67. Docker Swarm Rolling Update va Rollback strategiyasi / Docker Swarm Rolling Update & Rollback

```bash
# Servisni uzluksiz yangilash | Rolling update without downtime
docker service update   --image myapp:v2.0   --update-parallelism 2   --update-delay 10s   --update-failure-action rollback   myservice
```

---

## 68. Docker Container Sidecar Pattern va Logging Aggregation

**EN:** The Sidecar pattern deploys a secondary helper container (e.g., Fluentd, Vector, Filebeat) alongside the main application container to collect and stream logs to central storage.

**UZB:** Sidecar patterni asosiy ilova konteyneri yoniga qo'shimcha yordamchi konteyner qo'yib, loglarni markaziy serverga jo'natishni ta'minlaydi.

---

## 69. Docker Desktop Performance Tuning (VirtioFS, Rosetta 2)

**EN:** On macOS Apple Silicon, enabling VirtioFS for file sharing and Rosetta 2 for x86_64 emulation drastically reduces CPU and I/O latency.

**UZB:** Apple Silicon protsessorlarida VirtioFS fayl tizimi va Rosetta 2 emulyatsiyasini yoqish Docker Desktop ish tezligini keskin oshiradi.

---

## 70. Docker Container Live Restore nima? / What is Docker Container Live Restore?

**EN:** Live Restore keeps containers running even when the Docker daemon crashes or is undergoing maintenance/upgrades.

**UZB:** Live Restore parametri Docker daemon o'chib qolganda yoki yangilanayotganda ham konteynerlar to'xtamasdan ishlashini ta'minlaydi.

```json
// /etc/docker/daemon.json
{
  "live-restore": true
}
```

---

## 71. Container Entrypoint vs CMD farqlari va birlashtirib ishlatish / ENTRYPOINT vs CMD

```dockerfile
# ENTRYPOINT o'zgarmas buyruq, CMD esa default argumentlar
ENTRYPOINT ["python", "manage.py"]
CMD ["runserver", "0.0.0.0:8000"]
```

---

## 72. Docker DNS Resolution va Custom Bridge Networks

**EN:** Containers on custom bridge networks get automatic internal DNS resolution by container name, unlike the default bridge network.

**UZB:** Maxsus yaratilgan bridge tarmoqlaridagi konteynerlar bir-birini avtomatik DNS (konteyner nomi) orqali topadi.

---

## 73. Docker Compose Include va Modular Configurations

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

---

## 74. Docker Volume Backup va Restore qilish buyruqlari / Backup and Restore Docker Volumes

```bash
# Volume ni tar.gz arxivga zaxiralash | Backup volume to tar.gz
docker run --rm -v postgres_data:/volume -v $(pwd):/backup alpine   tar -czvf /backup/postgres_backup.tar.gz -C /volume .

# Qayta tiklash | Restore volume
docker run --rm -v postgres_data:/volume -v $(pwd):/backup alpine   sh -c "rm -rf /volume/* && tar -xzvf /backup/postgres_backup.tar.gz -C /volume"
```

---

## 75. Docker daemon metrikalarini Prometheus bilan kuzatish / Monitoring Docker Daemon with Prometheus

```json
// /etc/docker/daemon.json
{
  "metrics-addr": "127.0.0.1:9323",
  "experimental": true
}
```

---

## 76. Container Signal Handling (SIGTERM, SIGKILL) va PID 1 bo'lish muammosi

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

---

## 77. Docker Secret Management vs Environment Variables

**EN:** Environment variables can leak via process lists and logs. Docker Secrets (in Swarm/K8s) mount sensitive tokens in memory (`/run/secrets/`).

**UZB:** Muhit o'zgaruvchilari (`ENV`) loglarda ko'rinib qolishi mumkin. Docker Secrets parollarni xotiraga xavfsiz biriktiradi.

---

## 78. Docker User Namespaces (userns-remap) xavfsizlik funksiyasi

**EN:** User namespaces map the root user inside a container to an unprivileged non-root user on the host system.

**UZB:** User namespace konteyner ichidagi root foydalanuvchini host serverdagi oddiy xavfsiz foydalanuvchiga bog'lab qo'yadi.

---

## 79. Docker Compose Watch Mode (Hot Reloading)

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

---

## 80. Docker Engine API bilan Python (`docker-py`) orqali konteynerlarni boshqarish

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

---

## 81. Docker Container Network Performance Optimization (host network mode)

**EN:** `--network host` bypasses Docker network virtualization stack, delivering raw network performance at the expense of isolation.

**UZB:** `--network host` rejimi virtual tarmoq qatlamini chetlab o'tib, eng yuqori tarmoq unumdorligini beradi.

---

## 82. Docker Overlay Filesystem Performance Optimization

---

## 83. Docker Compose Dependencies Condition (service_healthy, service_completed_successfully)

```yaml
depends_on:
  db:
    condition: service_healthy
  migration:
    condition: service_completed_successfully
```

---

## 84. Container Disaster Recovery & High Availability Strategies

---

## 85. Docker Buildkit Cache Exporters (Inline, S3, GitHub Actions Cache)

```bash
docker buildx build   --cache-to type=gha   --cache-from type=gha   -t myapp:latest --push .
```

---

## 86. Docker Container Swap Management (--memory-swap)

---

## 87. Docker Container Capability Management (cap-add, cap-drop)

---

## 88. Docker Remote API Security with TLS Mutual Authentication (mTLS)

---

## 89. Docker CLI Extensions and Plugins Architecture

---

## 90. Docker System Architecture: dockerd, containerd, runc, shim explained

**EN:** `dockerd` handles high-level API; `containerd` manages container lifecycle; `runc` executes containers according to OCI specs; `containerd-shim` allows daemonless containers.

**UZB:** `dockerd` API so'rovlarini qabul qiladi; `containerd` hayot tsiklini boshqaradi; `runc` konteynerni ishga tushiradi; `containerd-shim` esa daemon o'chganda ham konteynerni tirik tutadi.

---

## 91. Docker Image Manifest & OCI Image Index Structure

---

## 92. Docker Multi-Arch Cross-Compilation with QEMU vs Native Builders

---

## 93. Docker Container OOM (Out Of Memory) Killer Behavior & OOM Score Adjust

---

## 94. Docker Cgroups v1 vs Cgroups v2 Differences

**EN:** Cgroups v2 provides a unified hierarchy, better resource management (e.g. memory pressure monitoring), and improved rootless support.

**UZB:** Cgroups v2 yagona iyerarxiya va xotira boshqaruvida yuqori unumdorlikni ta'minlaydi.

---

## 95. Docker Overlay2 Lowerdir, Upperdir, Mergedir, Workdir Mechanism

---

## 96. Docker Container Network Isolation: Network Namespaces & veth pairs

---

## 97. Docker Production Zero-Downtime Deployment Patterns (Blue-Green, Canary)

---

## 98. Docker Security Benchmarking with CIS (Center for Internet Security) Docker Benchmark

```bash
docker run --rm --net host --ipc host --userns host --pid host   --label com.docker.bench.security   -v /etc:/etc:ro -v /usr/bin/docker:/usr/bin/docker:ro   docker/docker-bench-security
```

---

## 99. Docker Compose Spec Custom Extensions (x-attributes)

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

---

## 100. Modern Container Ecosystem Summary: Docker, Podman, Rancher, Containerd, WASM

**EN:** Modern containerization extends beyond Docker CLI to OCI standards, rootless daemons like Podman, containerd, and lightweight WebAssembly runtimes.

**UZB:** Zamonaviy konteynerlashtirish Docker'dan tashqari OCI standartlari, Podman kabi rootless vositalar va WebAssembly runtime'larini ham qamrab oladi.

---

_Prepared by | Tayyorlagan: Alyorjon_  
_Sources | Manbalar: Docker Docs, CNCF, GeeksforGeeks, DataCamp, InterviewBit_
