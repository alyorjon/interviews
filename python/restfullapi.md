# 🚀 FastAPI · SQLAlchemy · Pydantic · Alembic
# Interview Questions & Answers | Intervyu Savol va Javoblari
## Part 1 of 2 — Questions 1–50

> **EN:** 100 bilingual interview questions with real code examples covering FastAPI, SQLAlchemy, Pydantic, Alembic, async/await, JWT auth, testing, and deployment.
> **UZ:** FastAPI, SQLAlchemy, Pydantic, Alembic, async/await, JWT auth, testing va deployment bo'yicha 100 ta bilingual savol, real kod misollari bilan.

---

## 📑 Mundarija | Table of Contents

| # | Bo'lim | Section |
|---|--------|---------|
| 1–15 | FastAPI Asoslari | FastAPI Basics |
| 16–25 | FastAPI Ilg'or | FastAPI Advanced |
| 26–40 | Pydantic | Pydantic |
| 41–55 | SQLAlchemy | SQLAlchemy |
| 56–65 | Alembic | Alembic |
| 66–75 | Async & Performance | Async & Performance |
| 76–85 | Auth & Security | Auth & Security |
| 86–92 | Testing | Testing |
| 93–100 | Deploy & Best Practices | Deploy & Best Practices |

---

# 🔷 FASTAPI ASOSLARI | FASTAPI BASICS (Q1–Q15)

---

## Q1. What is FastAPI? | FastAPI nima?

**EN:** FastAPI is a modern, high-performance Python web framework for building APIs. It is built on top of **Starlette** (ASGI web framework) and **Pydantic** (data validation). It supports async/await natively and auto-generates OpenAPI (Swagger) documentation.

**UZ:** FastAPI — API'lar qurish uchun zamonaviy, yuqori unumli Python web freymvorki. **Starlette** (ASGI) va **Pydantic** (ma'lumot tekshiruvi) asosida qurilgan. Async/await ni tabiiy qo'llab-quvvatlaydi va OpenAPI (Swagger) hujjatlarini avtomatik yaratadi.

```python
# Minimal FastAPI app | Minimal FastAPI ilovasi
from fastapi import FastAPI

app = FastAPI(title="My API", version="1.0.0")

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

# Ishga tushirish | Run:
# uvicorn main:app --reload
# Swagger: http://localhost:8000/docs
# ReDoc:   http://localhost:8000/redoc
```

---

## Q2. What is the difference between FastAPI, Flask, and Django? | FastAPI, Flask va Django farqi nima?

**EN:** FastAPI is async-first, auto-validates data, and auto-generates docs. Flask is minimalist and sync-only. Django is a full-stack framework with its own ORM, admin panel, and many built-in features.

**UZ:** FastAPI — async-birinchi, ma'lumotlarni avtomatik tekshiradi, hujjatlarni avtomatik yaratadi. Flask — minimalist va faqat sync. Django — o'z ORM'i, admin paneli va ko'p o'rnatilgan xususiyatlari bo'lgan to'liq freymvork.

| Feature | FastAPI | Flask | Django |
|---------|---------|-------|--------|
| EN: Speed | ⚡ Very fast | 🐢 Moderate | 🐢 Moderate |
| UZ: Tezlik | ⚡ Juda tez | 🐢 O'rtacha | 🐢 O'rtacha |
| EN: Async | ✅ Native | ❌ No | ⚠️ Partial |
| UZ: Async | ✅ Tabiiy | ❌ Yo'q | ⚠️ Qisman |
| EN: Auto docs | ✅ Swagger/ReDoc | ❌ No | ❌ No |
| UZ: Auto hujjat | ✅ Swagger/ReDoc | ❌ Yo'q | ❌ Yo'q |
| EN: Validation | ✅ Pydantic | ❌ Manual | ⚠️ Forms only |
| UZ: Tekshiruv | ✅ Pydantic | ❌ Qo'lda | ⚠️ Faqat formlar |
| EN: ORM | ❌ (use SQLAlchemy) | ❌ (use SQLAlchemy) | ✅ Built-in |
| UZ: ORM | ❌ (SQLAlchemy) | ❌ (SQLAlchemy) | ✅ O'rnatilgan |

---

## Q3. What is ASGI and WSGI? | ASGI va WSGI nima?

**EN:** WSGI (Web Server Gateway Interface) is a synchronous Python standard. ASGI (Asynchronous Server Gateway Interface) is its async successor — it supports WebSockets, long-polling, and concurrent requests. FastAPI uses ASGI via **Uvicorn**.

**UZ:** WSGI — sinxron Python standarti. ASGI — uning asinxron o'rnagi — WebSocket, long-polling va bir vaqtda so'rovlarni qo'llab-quvvatlaydi. FastAPI **Uvicorn** orqali ASGI ishlatadi.

```bash
# WSGI server (Flask, Django)
gunicorn app:app

# ASGI server (FastAPI)
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4

# Production uchun Gunicorn + Uvicorn workers | Gunicorn + Uvicorn workers for prod
gunicorn main:app -k uvicorn.workers.UvicornWorker -w 4
```

---

## Q4. How do you define routes (path operations) in FastAPI? | FastAPI'da marshrutlarni qanday aniqlash mumkin?

**EN:** Use decorators like `@app.get()`, `@app.post()`, `@app.put()`, `@app.patch()`, `@app.delete()` to define path operations.

**UZ:** Marshrutlarni aniqlash uchun `@app.get()`, `@app.post()`, `@app.put()`, `@app.patch()`, `@app.delete()` dekoratorlari ishlatiladi.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

# GET — ma'lumot olish | retrieve data
@app.get("/items/{item_id}")
async def get_item(item_id: int):
    return {"item_id": item_id}

# POST — yaratish | create
@app.post("/items/", status_code=201)
async def create_item(item: Item):
    return item

# PUT — to'liq yangilash | full update
@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    return {"item_id": item_id, **item.model_dump()}

# PATCH — qisman yangilash | partial update
@app.patch("/items/{item_id}")
async def partial_update(item_id: int, item: Item):
    return {"item_id": item_id, "updated": item.model_dump(exclude_unset=True)}

# DELETE — o'chirish | delete
@app.delete("/items/{item_id}", status_code=204)
async def delete_item(item_id: int):
    return None
```

---

## Q5. What are Path Parameters, Query Parameters, and Request Body? | Path, Query va Body parametrlari nima?

**EN:** Path parameters are part of the URL path. Query parameters come after `?`. Request body is sent in the HTTP body (usually JSON).

**UZ:** Path parametrlar URL yo'lining bir qismi. Query parametrlar `?` dan keyin keladi. Request body HTTP tanasida (odatda JSON) yuboriladi.

```python
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class UserCreate(BaseModel):
    name: str
    email: str

# Path param: /users/42
# Query param: /users/42?active=true&role=admin
# Body: {"name": "Ali", "email": "ali@email.com"}
@app.post("/users/{user_id}")
async def create_user(
    user_id: int,                   # Path param | Path parametr
    active: bool = True,            # Query param | Query parametr
    role: Optional[str] = None,     # Optional query param | Ixtiyoriy query
    user: UserCreate = None         # Request body | So'rov tanasi
):
    return {
        "user_id": user_id,
        "active": active,
        "role": role,
        "user": user
    }
```

---

## Q6. What is Dependency Injection in FastAPI? | FastAPI'da Dependency Injection nima?

**EN:** Dependency Injection (DI) is a pattern where FastAPI automatically creates and provides dependencies (like DB sessions, auth, config) to path operation functions via `Depends()`.

**UZ:** Dependency Injection — FastAPI `Depends()` orqali path operation funksiyalariga bog'liqliklarni (DB session, auth, config) avtomatik yaratib taqdim etadigan pattern.

```python
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

app = FastAPI()

# 1. Oddiy dependency | Simple dependency
def get_query_params(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}

@app.get("/items/")
async def list_items(params: dict = Depends(get_query_params)):
    return params

# 2. DB session dependency | DB session dependency
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session          # yield = context manager | yield = context menejeri
        # EN: session auto-closed after request | UZ: sessiya so'rovdan keyin avtomatik yopiladi

# 3. Auth dependency | Auth dependency
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
):
    user = await verify_token(token, db)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user

# 4. Annotated sintaksisi (zamonaviy | modern)
DBDep = Annotated[AsyncSession, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]

@app.get("/me")
async def get_me(
    db: DBDep,
    current_user: CurrentUser
):
    return current_user
```

---

## Q7. What is FastAPI Router? | FastAPI Router nima?

**EN:** `APIRouter` is used to split a large application into multiple modules/files, each with its own routes. Similar to Flask Blueprints.

**UZ:** `APIRouter` — katta ilovani bir nechta modul/fayllarga bo'lish uchun ishlatiladi, har birining o'z marshrutlari bo'ladi. Flask Blueprint'iga o'xshash.

```python
# routers/users.py
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/users",
    tags=["Users"],           # Swagger gruppa | Swagger group
    dependencies=[Depends(get_current_user)]  # Barcha routerlarga | For all routes
)

@router.get("/")
async def list_users():
    return [{"id": 1, "name": "Ali"}]

@router.get("/{user_id}")
async def get_user(user_id: int):
    return {"id": user_id}

@router.post("/", status_code=201)
async def create_user(user: UserCreate):
    return user

# main.py
from fastapi import FastAPI
from routers import users, items, auth

app = FastAPI()
app.include_router(users.router, prefix="/api/v1")
app.include_router(items.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")
```

---

## Q8. What is Middleware in FastAPI? | FastAPI'da Middleware nima?

**EN:** Middleware is a function that runs before and after every request. Used for logging, CORS, authentication, request timing, etc.

**UZ:** Middleware — har bir so'rovdan oldin va keyin ishlaydigan funksiya. Logging, CORS, autentifikatsiya, so'rov vaqtini o'lchash uchun ishlatiladi.

```python
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time
import logging

app = FastAPI()

# 1. CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://myapp.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Custom logging middleware | Maxsus logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.time()
    # EN: Before request | UZ: So'rovdan oldin
    response = await call_next(request)
    # EN: After request | UZ: So'rovdan keyin
    duration = time.time() - start
    logging.info(
        f"{request.method} {request.url.path} "
        f"→ {response.status_code} ({duration:.3f}s)"
    )
    response.headers["X-Process-Time"] = str(duration)
    return response
```

---

## Q9. How do you handle errors and exceptions in FastAPI? | FastAPI'da xatolarni qanday boshqarish mumkin?

**EN:** Use `HTTPException` for standard HTTP errors, or create custom exception handlers with `@app.exception_handler()`.

**UZ:** Standart HTTP xatolari uchun `HTTPException`, maxsus xato ishlovchilar uchun `@app.exception_handler()` ishlatiladi.

```python
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

app = FastAPI()

# 1. HTTPException — standart usul | standard way
@app.get("/items/{item_id}")
async def get_item(item_id: int):
    if item_id not in db:
        raise HTTPException(
            status_code=404,
            detail=f"Item {item_id} not found",
            headers={"X-Error": "not-found"}
        )
    return db[item_id]

# 2. Custom exception | Maxsus istisno
class ItemNotFoundError(Exception):
    def __init__(self, item_id: int):
        self.item_id = item_id

@app.exception_handler(ItemNotFoundError)
async def item_not_found_handler(request: Request, exc: ItemNotFoundError):
    return JSONResponse(
        status_code=404,
        content={
            "error": "item_not_found",
            "detail": f"Item {exc.item_id} topilmadi",
            "path": str(request.url)
        }
    )

# 3. Global 422 Validation Error handler
from fastapi.exceptions import RequestValidationError

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "body": exc.body}
    )
```

---

## Q10. What are Background Tasks in FastAPI? | FastAPI'da Background Tasks nima?

**EN:** Background tasks run after the response is sent. Used for sending emails, logging, notifications, or heavy processing without blocking the response.

**UZ:** Background tasklari javob yuborilgandan keyin ishlaydi. Emaillar yuborish, logging, bildirishnomalar yoki og'ir hisob-kitoblar uchun javobni bloklamasdan ishlatiladi.

```python
from fastapi import FastAPI, BackgroundTasks
import asyncio

app = FastAPI()

# 1. Sinxron background task | Sync background task
def send_email(email: str, message: str):
    # Actual email sending logic
    print(f"Sending email to {email}: {message}")

# 2. Asinxron background task | Async background task
async def update_analytics(user_id: int):
    await asyncio.sleep(1)  # Simulate async work
    print(f"Analytics updated for user {user_id}")

@app.post("/register/")
async def register_user(
    email: str,
    background_tasks: BackgroundTasks
):
    # EN: Save user first, then run tasks in background
    # UZ: Avval foydalanuvchini saqlang, keyin background'da tasklarni bajaring
    background_tasks.add_task(send_email, email, "Welcome!")
    background_tasks.add_task(update_analytics, user_id=1)
    return {"message": "Registered! Email will be sent shortly."}

# ⚠️ EN: For heavy tasks use Celery + Redis
# ⚠️ UZ: Og'ir tasklar uchun Celery + Redis ishlatish yaxshiroq
```

---

## Q11. What are WebSockets in FastAPI? | FastAPI'da WebSocket nima?

**EN:** WebSockets provide full-duplex, real-time communication between client and server. FastAPI has built-in WebSocket support.

**UZ:** WebSocket — client va server orasida ikki tomonlama, real-vaqt muloqotni ta'minlaydi. FastAPI WebSocket uchun o'rnatilgan qo'llab-quvvatlashga ega.

```python
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List

app = FastAPI()

# Connection manager | Ulanish menejeri
class ConnectionManager:
    def __init__(self):
        self.active: List[WebSocket] = []

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active.append(ws)

    def disconnect(self, ws: WebSocket):
        self.active.remove(ws)

    async def broadcast(self, message: str):
        for ws in self.active:
            await ws.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"{client_id}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"{client_id} left the chat")
```

---

## Q12. What is the Lifespan event in FastAPI? | FastAPI'da Lifespan event nima?

**EN:** Lifespan events allow you to run code on application **startup** and **shutdown** — for initializing DB connections, loading ML models, etc.

**UZ:** Lifespan eventlar ilova **ishga tushganda** va **to'xtaganda** kod bajarishga imkon beradi — DB ulanishlarni boshlash, ML modellarini yuklash uchun.

```python
from fastapi import FastAPI
from contextlib import asynccontextmanager
import asyncpg

# Zamonaviy usul | Modern way (FastAPI 0.93+)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # EN: Startup — runs before first request
    # UZ: Startup — birinchi so'rovdan oldin ishlaydi
    print("Starting up...")
    app.state.db_pool = await asyncpg.create_pool("postgresql://...")
    yield
    # EN: Shutdown — runs after last request
    # UZ: Shutdown — oxirgi so'rovdan keyin ishlaydi
    print("Shutting down...")
    await app.state.db_pool.close()

app = FastAPI(lifespan=lifespan)

# Eski usul | Old way (deprecated)
# @app.on_event("startup")
# @app.on_event("shutdown")
```

---

## Q13. How does FastAPI auto-generate documentation? | FastAPI hujjatlarni avtomatik qanday yaratadi?

**EN:** FastAPI uses your Python type hints and Pydantic models to automatically generate an OpenAPI schema, which is rendered as interactive Swagger UI and ReDoc.

**UZ:** FastAPI Python type hint'lari va Pydantic modellarni ishlatib, OpenAPI sxemasini avtomatik yaratadi. U Swagger UI va ReDoc sifatida ko'rsatiladi.

```python
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(
    title="My API",
    description="Bu API foydalanuvchilarni boshqaradi",
    version="2.0.0",
    docs_url="/docs",      # Swagger UI
    redoc_url="/redoc",    # ReDoc
    openapi_url="/openapi.json"
)

class UserCreate(BaseModel):
    name: str = Field(..., description="Foydalanuvchi ismi", example="Ali")
    age: int = Field(..., ge=1, le=150, description="Yoshi")

@app.post(
    "/users/",
    summary="Foydalanuvchi yaratish",
    description="Yangi foydalanuvchi yaratadi va ID qaytaradi",
    response_description="Yaratilgan foydalanuvchi",
    tags=["Users"],
    status_code=201
)
async def create_user(user: UserCreate):
    """
    EN: Create a new user with all required info.
    UZ: Barcha kerakli ma'lumotlar bilan yangi foydalanuvchi yarating.
    """
    return {"id": 1, **user.model_dump()}

# Docs: http://localhost:8000/docs
```

---

## Q14. What is Response Model in FastAPI? | FastAPI'da Response Model nima?

**EN:** `response_model` defines the shape of the response. FastAPI validates and filters the output — fields not in the model are excluded automatically. Useful for hiding internal fields like passwords.

**UZ:** `response_model` — javobning qanday bo'lishini belgilaydi. FastAPI chiqishni tekshiradi va filtrlaydi — modelda bo'lmagan maydonlar avtomatik chiqarib tashlanadi. Parollar kabi ichki maydonlarni yashirish uchun foydali.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class UserInDB(BaseModel):
    id: int
    name: str
    email: str
    hashed_password: str    # ← Bu yashirilishi kerak | This should be hidden

class UserPublic(BaseModel):
    id: int
    name: str
    email: str
    # hashed_password yo'q | no hashed_password ✅

@app.get("/users/{user_id}", response_model=UserPublic)
async def get_user(user_id: int):
    # DB'dan to'liq ma'lumot | Full data from DB
    user_from_db = UserInDB(
        id=user_id,
        name="Ali",
        email="ali@example.com",
        hashed_password="$2b$12$secret"
    )
    # FastAPI avtomatik hashed_password ni olib tashlaydi | FastAPI auto-removes hashed_password
    return user_from_db

# response_model_exclude_unset=True — faqat o'rnatilgan maydonlar
# response_model_exclude={"field"} — aniq maydonlarni chiqarish
# response_model_include={"field"} — faqat shu maydonlarni kiritish
```

---

## Q15. What is API Versioning in FastAPI? | FastAPI'da API Versioning nima?

**EN:** API versioning keeps old API versions working while introducing new ones. Most common approach: URL path versioning (`/api/v1/`, `/api/v2/`).

**UZ:** API versioning — eski API versiyalarini ishlatib turgan holda yangilarini joriy etish imkonini beradi. Eng keng tarqalgan: URL path versioning (`/api/v1/`, `/api/v2/`).

```python
from fastapi import FastAPI
from fastapi import APIRouter

app = FastAPI()

# V1 Router
v1_router = APIRouter(prefix="/api/v1", tags=["V1"])

@v1_router.get("/users/")
async def list_users_v1():
    return [{"id": 1, "name": "Ali"}]

# V2 Router — yangi maydon | New field added
v2_router = APIRouter(prefix="/api/v2", tags=["V2"])

@v2_router.get("/users/")
async def list_users_v2():
    return [{"id": 1, "name": "Ali", "avatar": "url"}]

app.include_router(v1_router)
app.include_router(v2_router)

# GET /api/v1/users/ → old response
# GET /api/v2/users/ → new response with avatar
```

---

# 🔶 FASTAPI ILGʻOR | FASTAPI ADVANCED (Q16–Q25)

---

## Q16. What is the difference between `async def` and `def` in FastAPI? | FastAPI'da `async def` va `def` farqi nima?

**EN:** `async def` runs in the async event loop — for I/O-bound tasks (DB, HTTP calls). `def` runs in a thread pool — for CPU-bound or sync-only code. Never use blocking calls inside `async def`.

**UZ:** `async def` — async event loop'da ishlaydi — I/O-ga bog'liq ishlar uchun (DB, HTTP so'rovlar). `def` — thread pool'da ishlaydi — CPU-ga bog'liq yoki faqat sinxron kod uchun. `async def` ichida bloklayotgan chaqiruvlarni hech qachon ishlatmang.

```python
from fastapi import FastAPI
import asyncio
import time

app = FastAPI()

# ✅ Async — I/O bound (DB, network)
@app.get("/async-endpoint")
async def async_example():
    await asyncio.sleep(1)   # Non-blocking | Bloklamaydigan
    return {"type": "async"}

# ✅ Sync — CPU bound (hisob-kitob | computation)
@app.get("/sync-endpoint")
def sync_example():
    time.sleep(1)             # EN: OK in def, runs in threadpool
                              # UZ: def'da OK, threadpool'da ishlaydi
    return {"type": "sync"}

# ❌ Xato | Wrong — async def ichida sync bloklash | blocking sync inside async
@app.get("/bad")
async def bad_endpoint():
    time.sleep(1)  # ← Butun event loop'ni bloklaydi! | Blocks entire event loop!
    return {"bad": True}

# ✅ To'g'ri usul | Correct way — run_in_executor
import asyncio
from concurrent.futures import ThreadPoolExecutor

@app.get("/correct")
async def correct_endpoint():
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, sync_blocking_function)
    return result
```

---

## Q17. How to implement Pagination in FastAPI? | FastAPI'da Pagination qanday amalga oshiriladi?

**EN:** Implement pagination using query parameters `skip` and `limit`, or use cursor-based pagination for large datasets.

**UZ:** Pagination `skip` va `limit` query parametrlari yordamida, yoki katta ma'lumotlar uchun cursor-based pagination bilan amalga oshiriladi.

```python
from fastapi import FastAPI, Depends, Query
from pydantic import BaseModel
from typing import List, Optional, Generic, TypeVar

app = FastAPI()

T = TypeVar("T")

class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    skip: int
    limit: int
    has_more: bool

# Dependency sifatida | As dependency
def pagination_params(
    skip: int = Query(default=0, ge=0, description="O'tkazib yuborish"),
    limit: int = Query(default=10, ge=1, le=100, description="Maksimum natijalar")
):
    return {"skip": skip, "limit": limit}

@app.get("/users/", response_model=PaginatedResponse[dict])
async def list_users(
    pagination: dict = Depends(pagination_params),
    search: Optional[str] = None
):
    # DB query | DB so'rov
    # total = await db.count(User)
    # items = await db.query(User).offset(skip).limit(limit).all()
    total = 100
    items = [{"id": i, "name": f"User {i}"} for i in range(pagination["limit"])]

    return PaginatedResponse(
        items=items,
        total=total,
        skip=pagination["skip"],
        limit=pagination["limit"],
        has_more=(pagination["skip"] + pagination["limit"]) < total
    )
```

---

## Q18. How to implement File Upload in FastAPI? | FastAPI'da fayl yuklashni qanday amalga oshirish mumkin?

**EN:** Use `UploadFile` and `File` from FastAPI to handle file uploads.

**UZ:** Fayl yuklashni boshqarish uchun FastAPI'dan `UploadFile` va `File` ishlatiladi.

```python
from fastapi import FastAPI, UploadFile, File, HTTPException
from typing import List
import aiofiles
import os

app = FastAPI()

UPLOAD_DIR = "uploads"
ALLOWED_TYPES = {"image/jpeg", "image/png", "application/pdf"}
MAX_SIZE = 5 * 1024 * 1024  # 5MB

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # Tur tekshiruvi | Type validation
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, f"Fayl turi qabul qilinmaydi: {file.content_type}")

    # Hajm tekshiruvi | Size validation
    content = await file.read()
    if len(content) > MAX_SIZE:
        raise HTTPException(400, "Fayl hajmi 5MB dan oshmasligi kerak")

    # Saqlash | Save
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    async with aiofiles.open(file_path, "wb") as f:
        await f.write(content)

    return {"filename": file.filename, "size": len(content)}

# Ko'p fayl | Multiple files
@app.post("/upload-multiple/")
async def upload_multiple(files: List[UploadFile] = File(...)):
    results = []
    for file in files:
        content = await file.read()
        results.append({"filename": file.filename, "size": len(content)})
    return results
```

---

## Q19. How to implement Caching in FastAPI? | FastAPI'da Caching qanday amalga oshiriladi?

**EN:** Use Redis for distributed caching, or in-memory caching for simple cases. `fastapi-cache2` library makes it easy.

**UZ:** Distributed caching uchun Redis, oddiy holatlar uchun in-memory caching ishlatiladi. `fastapi-cache2` kutubxonasi buni osonlashtiradi.

```python
from fastapi import FastAPI
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache
from redis import asyncio as aioredis

app = FastAPI()

@app.on_event("startup")
async def startup():
    redis = aioredis.from_url("redis://localhost:6379")
    FastAPICache.init(RedisBackend(redis), prefix="myapp-cache")

# 60 soniya keshlash | Cache for 60 seconds
@app.get("/users/{user_id}")
@cache(expire=60)
async def get_user(user_id: int):
    # DB'dan — faqat kesh eskirganda chaqiriladi | Called only when cache expires
    return {"id": user_id, "name": "Ali"}

# Qo'lda kesh | Manual caching
from fastapi import Depends
import json

async def get_redis():
    return aioredis.from_url("redis://localhost:6379")

@app.get("/products/{product_id}")
async def get_product(product_id: int, redis=Depends(get_redis)):
    cache_key = f"product:{product_id}"
    cached = await redis.get(cache_key)
    if cached:
        return json.loads(cached)   # Keshdan | From cache

    product = {"id": product_id, "name": "Laptop"}  # DB dan | From DB
    await redis.setex(cache_key, 300, json.dumps(product))  # 5 daqiqa | 5 minutes
    return product
```

---

## Q20. How to implement Rate Limiting in FastAPI? | FastAPI'da Rate Limiting qanday amalga oshiriladi?

**EN:** Rate limiting restricts how many requests a client can make in a time window. Use `slowapi` library or custom Redis-based middleware.

**UZ:** Rate limiting — client ma'lum vaqt oralig'ida qancha so'rov qila olishini cheklaydi. `slowapi` kutubxonasi yoki maxsus Redis-based middleware ishlatiladi.

```python
from fastapi import FastAPI, Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Minutiga 5 ta | 5 per minute
@app.get("/limited/")
@limiter.limit("5/minute")
async def limited_endpoint(request: Request):
    return {"message": "OK"}

# Soatiga 100 ta | 100 per hour
@app.get("/api/data/")
@limiter.limit("100/hour")
async def get_data(request: Request):
    return {"data": "..."}
```

---

## Q21. How to implement Server-Sent Events (SSE) in FastAPI? | FastAPI'da SSE qanday amalga oshiriladi?

**EN:** SSE allows the server to push real-time updates to clients over HTTP (one-directional). Good for notifications, dashboards, logs.

**UZ:** SSE — serverga HTTP orqali clientlarga real-vaqt yangilanishlarini yuborish imkonini beradi (bir yo'nalishli). Bildirishnomalar, dashboardlar, loglar uchun yaxshi.

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio

app = FastAPI()

async def event_generator(topic: str):
    count = 0
    while True:
        count += 1
        yield f"data: {{'count': {count}, 'topic': '{topic}'}}\n\n"
        await asyncio.sleep(1)

@app.get("/sse/{topic}")
async def sse_endpoint(topic: str):
    return StreamingResponse(
        event_generator(topic),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no"   # Nginx uchun | For Nginx
        }
    )

# JS client | JS mijoz:
# const es = new EventSource('/sse/news');
# es.onmessage = (e) => console.log(JSON.parse(e.data));
```

---

## Q22. What is OpenAPI Tags and how to organize them? | OpenAPI Tags nima va ularni qanday tartiblashtirish kerak?

**EN:** Tags group endpoints in Swagger UI, making documentation more readable.

**UZ:** Tags — Swagger UI'da endpointlarni guruhlaydi, hujjatlarni o'qilishi osonlashtiradi.

```python
from fastapi import FastAPI

tags_metadata = [
    {
        "name": "Users",
        "description": "Foydalanuvchilar bilan operatsiyalar | User operations",
    },
    {
        "name": "Items",
        "description": "Mahsulotlar bilan operatsiyalar | Item operations",
        "externalDocs": {
            "description": "Items documentation",
            "url": "https://example.com/docs/items",
        },
    },
]

app = FastAPI(openapi_tags=tags_metadata)

@app.get("/users/", tags=["Users"])
async def list_users():
    return []

@app.get("/items/", tags=["Items"])
async def list_items():
    return []
```

---

## Q23. How to add custom headers to FastAPI responses? | FastAPI javoblariga maxsus headerlar qanday qo'shish mumkin?

**EN:** Use `Response` object or return `JSONResponse` with custom headers.

**UZ:** `Response` ob'ekti yoki maxsus headerlar bilan `JSONResponse` qaytarish orqali.

```python
from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse

app = FastAPI()

# 1. Response parametri orqali | Via Response parameter
@app.get("/items/{item_id}")
async def get_item(item_id: int, response: Response):
    response.headers["X-Item-ID"] = str(item_id)
    response.headers["Cache-Control"] = "max-age=3600"
    return {"id": item_id}

# 2. JSONResponse orqali | Via JSONResponse
@app.get("/direct/")
async def direct_response():
    return JSONResponse(
        content={"message": "Hello"},
        status_code=200,
        headers={
            "X-Custom-Header": "myvalue",
            "X-Process-Time": "0.001"
        }
    )
```

---

## Q24. How to implement Health Check endpoint? | Health Check endpoint qanday amalga oshiriladi?

**EN:** Health check endpoints let orchestrators (Kubernetes, Docker) know if the app is alive and ready.

**UZ:** Health check endpointlar orkestratorlarga (Kubernetes, Docker) ilova tirik va tayyor ekanligini bildiradi.

```python
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import time

app = FastAPI()
START_TIME = time.time()

class HealthResponse(BaseModel):
    status: str
    uptime: float
    timestamp: str
    version: str
    database: str

@app.get("/health", response_model=HealthResponse, tags=["System"])
async def health_check():
    # DB ulanishini tekshirish | Check DB connection
    db_status = "ok"
    try:
        await db.execute("SELECT 1")
    except Exception:
        db_status = "error"

    return HealthResponse(
        status="ok" if db_status == "ok" else "degraded",
        uptime=round(time.time() - START_TIME, 2),
        timestamp=datetime.utcnow().isoformat(),
        version="1.0.0",
        database=db_status
    )

@app.get("/ping", tags=["System"])
async def ping():
    return {"pong": True}
```

---

## Q25. How to implement CORS in FastAPI? | FastAPI'da CORS qanday amalga oshiriladi?

**EN:** CORS (Cross-Origin Resource Sharing) allows or restricts web browsers from making requests to a different origin.

**UZ:** CORS — brauzerlarning boshqa origindagi resurslarga so'rov yuborishiga ruxsat berish yoki cheklash.

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Development uchun | For development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # ⚠️ Faqat dev uchun | Only for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Production uchun | For production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://myapp.com",
        "https://app.myapp.com",
        "http://localhost:3000",   # Frontend dev
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type", "X-Requested-With"],
    expose_headers=["X-Total-Count"],
    max_age=3600,                  # OPTIONS preflight kesh | OPTIONS preflight cache
)
```

---

# 🟢 PYDANTIC (Q26–Q40)

---

## Q26. What is Pydantic? | Pydantic nima?

**EN:** Pydantic is a Python data validation and settings management library using type annotations. FastAPI uses Pydantic for request validation, response serialization, and settings.

**UZ:** Pydantic — type annotatsiyalar yordamida ma'lumotlarni tekshirish va sozlamalarni boshqarish uchun Python kutubxonasi. FastAPI Pydantic'ni so'rov tekshiruvi, javob serializatsiyasi va sozlamalar uchun ishlatadi.

```python
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=50, example="Ali Valiev")
    email: EmailStr = Field(..., example="ali@example.com")
    age: int = Field(..., ge=18, le=120)
    bio: Optional[str] = Field(None, max_length=500)
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Avtomatik tekshiruv | Automatic validation
try:
    user = UserCreate(name="A", email="not-email", age=15)
except Exception as e:
    print(e)
# ValidationError:
# - name: min_length must be >= 2
# - email: not a valid email
# - age: must be >= 18
```

---

## Q27. What is the difference between Pydantic V1 and V2? | Pydantic V1 va V2 farqi nima?

**EN:** Pydantic V2 is a complete rewrite in Rust — much faster (5-50x), with breaking API changes. Key differences: `model_dump()` instead of `dict()`, `model_validate()` instead of `from_orm()`, `ConfigDict` instead of class `Config`.

**UZ:** Pydantic V2 — Rust'da to'liq qayta yozilgan — ancha tezroq (5-50 marta), API o'zgarishlari bilan. Asosiy farqlar: `dict()` o'rniga `model_dump()`, `from_orm()` o'rniga `model_validate()`, class `Config` o'rniga `ConfigDict`.

```python
# Pydantic V1
from pydantic import BaseModel

class User(BaseModel):
    name: str

    class Config:
        orm_mode = True

user = User(name="Ali")
print(user.dict())          # V1
print(User.from_orm(obj))   # V1

# Pydantic V2
from pydantic import BaseModel, ConfigDict

class User(BaseModel):
    model_config = ConfigDict(from_attributes=True)  # orm_mode o'rniga | instead of orm_mode
    name: str

user = User(name="Ali")
print(user.model_dump())           # dict() o'rniga | instead of dict()
print(User.model_validate(obj))    # from_orm() o'rniga | instead of from_orm()

# V2 tezroq | V2 is faster (5-50x)
# V2 Rust core'ga ega | V2 has Rust core
```

---

## Q28. What are Pydantic Field validators? | Pydantic Field validatorlari nima?

**EN:** Custom validators add business logic to field validation using `@field_validator` (V2) or `@validator` (V1).

**UZ:** Maxsus validatorlar `@field_validator` (V2) yoki `@validator` (V1) yordamida maydon tekshiruviga biznes mantiqini qo'shadi.

```python
from pydantic import BaseModel, field_validator, model_validator
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str
    confirm_password: str
    phone: Optional[str] = None

    # Bitta maydon validatori | Single field validator
    @field_validator("username")
    @classmethod
    def username_alphanumeric(cls, v: str) -> str:
        if not v.isalnum():
            raise ValueError("Username faqat harf va raqamlardan iborat bo'lishi kerak")
        return v.lower()    # Normalize

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: Optional[str]) -> Optional[str]:
        if v and not v.startswith("+"):
            raise ValueError("Telefon raqami + bilan boshlanishi kerak")
        return v

    # Ko'p maydon validatori | Multi-field validator (model level)
    @model_validator(mode="after")
    def check_passwords_match(self) -> "UserCreate":
        if self.password != self.confirm_password:
            raise ValueError("Parollar mos kelmaydi")
        return self

user = UserCreate(
    username="Ali123",
    password="secret123",
    confirm_password="secret123",
    phone="+998901234567"
)
```

---

## Q29. What is Pydantic BaseSettings? | Pydantic BaseSettings nima?

**EN:** `BaseSettings` reads configuration from environment variables and `.env` files — ideal for managing app settings in different environments.

**UZ:** `BaseSettings` — muhit o'zgaruvchilari va `.env` fayllardan konfiguratsiyani o'qiydi — turli muhitlarda ilova sozlamalarini boshqarish uchun ideal.

```python
# pip install pydantic-settings
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )

    # Database | Ma'lumotlar bazasi
    database_url: str
    db_pool_size: int = 10
    db_max_overflow: int = 20

    # Security | Xavfsizlik
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # App
    app_name: str = "My FastAPI App"
    debug: bool = False
    api_v1_prefix: str = "/api/v1"

# Singleton pattern — faqat bir marta yuklanadi | Loaded only once
@lru_cache()
def get_settings() -> Settings:
    return Settings()

# FastAPI'da ishlatish | Usage in FastAPI
from fastapi import Depends
from typing import Annotated

SettingsDep = Annotated[Settings, Depends(get_settings)]

# .env fayli | .env file:
# DATABASE_URL=postgresql+asyncpg://user:pass@localhost/db
# SECRET_KEY=supersecretkey
# DEBUG=false
```

---

## Q30. How to create nested Pydantic models? | Ichma-ich Pydantic modellarini qanday yaratish mumkin?

**EN:** Pydantic models can contain other models as field types, enabling complex nested data structures.

**UZ:** Pydantic modellari boshqa modellarni maydon turi sifatida o'z ichiga olishi mumkin, bu murakkab ichma-ich ma'lumot tuzilmalarini yaratishga imkon beradi.

```python
from pydantic import BaseModel, EmailStr
from typing import List, Optional

class Address(BaseModel):
    street: str
    city: str
    country: str = "Uzbekistan"

class ContactInfo(BaseModel):
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[Address] = None

class Order(BaseModel):
    product_id: int
    quantity: int
    price: float

class User(BaseModel):
    id: int
    name: str
    contact: ContactInfo
    orders: List[Order] = []

# Ishlatish | Usage
user = User(
    id=1,
    name="Ali",
    contact=ContactInfo(
        email="ali@example.com",
        address=Address(street="Navoiy ko'chasi 1", city="Toshkent")
    ),
    orders=[
        Order(product_id=10, quantity=2, price=50000.0)
    ]
)

# Dict'ga aylantirish | Convert to dict
print(user.model_dump())
# JSON'ga | To JSON
print(user.model_dump_json(indent=2))
```

---

## Q31. What is `model_dump()` and its options? | `model_dump()` va uning opsiyalari nima?

**EN:** `model_dump()` converts a Pydantic model to a dictionary. It has many filtering options.

**UZ:** `model_dump()` — Pydantic modelni lug'atga aylantiradi. Ko'p filtrlash opsiyalariga ega.

```python
from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: int
    name: str
    email: str
    password: str
    bio: Optional[str] = None

user = User(id=1, name="Ali", email="ali@ex.com", password="secret")

# Standart | Default
user.model_dump()
# {'id': 1, 'name': 'Ali', 'email': 'ali@ex.com', 'password': 'secret', 'bio': None}

# Faqat o'rnatilganlar | Only set fields
user.model_dump(exclude_unset=True)
# {'id': 1, 'name': 'Ali', 'email': 'ali@ex.com', 'password': 'secret'}

# Chiqarib tashlash | Exclude fields
user.model_dump(exclude={"password"})
# {'id': 1, 'name': 'Ali', 'email': 'ali@ex.com', 'bio': None}

# Faqat shu maydonlar | Only these fields
user.model_dump(include={"id", "name", "email"})
# {'id': 1, 'name': 'Ali', 'email': 'ali@ex.com'}

# None maydonlarni chiqarish | Exclude None fields
user.model_dump(exclude_none=True)
# {'id': 1, 'name': 'Ali', 'email': 'ali@ex.com', 'password': 'secret'}
```

---

## Q32. How to use Pydantic with SQLAlchemy ORM? | Pydantic'ni SQLAlchemy ORM bilan qanday ishlatish kerak?

**EN:** Use `model_config = ConfigDict(from_attributes=True)` (V2) to allow Pydantic to read data directly from SQLAlchemy ORM objects.

**UZ:** SQLAlchemy ORM ob'ektlaridan Pydantic'ga to'g'ridan-to'g'ri ma'lumot o'qish imkonini berish uchun `model_config = ConfigDict(from_attributes=True)` (V2) ishlatiladi.

```python
from pydantic import BaseModel, ConfigDict
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import DeclarativeBase

# SQLAlchemy modeli | SQLAlchemy model
class Base(DeclarativeBase):
    pass

class UserORM(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    hashed_password = Column(String)

# Pydantic schema
class UserSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)  # ← Muhim! | Important!

    id: int
    name: str
    email: str
    # hashed_password yo'q — yashiriladi | not included — hidden

# ORM → Pydantic
user_orm = UserORM(id=1, name="Ali", email="ali@ex.com", hashed_password="$hash")
user_schema = UserSchema.model_validate(user_orm)  # ← from_attributes=True kerak | needed
print(user_schema.model_dump())
# {'id': 1, 'name': 'Ali', 'email': 'ali@ex.com'}
```

---

## Q33. What is Pydantic `Field` and its options? | Pydantic `Field` va uning opsiyalari nima?

**EN:** `Field` provides metadata and validation rules for individual Pydantic model fields.

**UZ:** `Field` — Pydantic model maydonlari uchun metadata va tekshiruv qoidalarini ta'minlaydi.

```python
from pydantic import BaseModel, Field
from typing import Optional
import re

class Product(BaseModel):
    # Majburiy | Required
    name: str = Field(..., min_length=1, max_length=200, description="Mahsulot nomi")

    # Default qiymat | Default value
    price: float = Field(default=0.0, ge=0.0, description="Narx (UZS)")

    # Ixtiyoriy | Optional
    description: Optional[str] = Field(None, max_length=1000)

    # Regex pattern
    sku: str = Field(..., pattern=r"^[A-Z]{3}-\d{6}$", example="ABC-123456")

    # Alias — JSON da boshqa nom | Different name in JSON
    category_id: int = Field(..., alias="categoryId")

    # GT, GE, LT, LE
    stock: int = Field(default=0, ge=0, le=10000)

    # Float aniqlik | Float precision
    weight: float = Field(..., gt=0, description="Og'irligi (kg)")

    # Swagger uchun misol | Example for Swagger
    tags: list[str] = Field(default=[], max_length=10, example=["electronics", "sale"])

# Alias bilan ishlash | Work with alias
product = Product(
    name="Laptop",
    price=5000000.0,
    sku="LAP-000001",
    categoryId=3,    # ← alias
    weight=2.5
)
print(product.category_id)  # 3
```

---

## Q34. How to create Custom Types in Pydantic? | Pydantic'da Custom Type'lar qanday yaratiladi?

**EN:** Create custom types using `Annotated` with `BeforeValidator`, `AfterValidator`, or by subclassing types.

**UZ:** `Annotated` va `BeforeValidator`, `AfterValidator` yordamida yoki type'lardan meros olib maxsus type'lar yaratiladi.

```python
from pydantic import BaseModel, BeforeValidator, AfterValidator
from typing import Annotated
import re

# Custom type: UZS telefon raqami | UZ phone number
def validate_uz_phone(v: str) -> str:
    v = v.strip().replace(" ", "")
    pattern = r"^\+998\d{9}$"
    if not re.match(pattern, v):
        raise ValueError("O'zbekiston telefon raqami formati: +998XXXXXXXXX")
    return v

UZPhone = Annotated[str, AfterValidator(validate_uz_phone)]

# Custom type: Katta harf | Uppercase string
def to_upper(v: str) -> str:
    return v.upper()

UpperStr = Annotated[str, BeforeValidator(to_upper)]

# Custom type: Musbat son | Positive float
PositiveAmount = Annotated[float, Field(gt=0)]

class Employee(BaseModel):
    name: UpperStr                  # Avtomatik katta harf | Auto uppercase
    phone: UZPhone                  # Tekshirilgan telefon | Validated phone
    salary: PositiveAmount          # Musbat miqdor | Positive amount

emp = Employee(
    name="ali valiev",             # → "ALI VALIEV"
    phone="+998 90 123 45 67",     # → "+998901234567"
    salary=5000000.0
)
```

---

## Q35. How to serialize Pydantic models to JSON? | Pydantic modellarini JSON'ga qanday serializatsiya qilish kerak?

**EN:** Use `model_dump_json()` for direct JSON string, or `model_dump()` then `json.dumps()` for custom options.

**UZ:** To'g'ridan-to'g'ri JSON string uchun `model_dump_json()`, yoki `model_dump()` so'ng `json.dumps()` maxsus opsiyalar uchun.

```python
from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal

class Order(BaseModel):
    id: int
    created_at: datetime
    total: Decimal
    status: str

order = Order(
    id=1,
    created_at=datetime(2024, 1, 15, 10, 30),
    total=Decimal("149999.99"),
    status="pending"
)

# JSON string | JSON satr
json_str = order.model_dump_json()
print(json_str)
# {"id":1,"created_at":"2024-01-15T10:30:00","total":"149999.99","status":"pending"}

# Chiroyli | Pretty print
print(order.model_dump_json(indent=2))

# Dict opsiyalar bilan | Dict with options
data = order.model_dump(
    mode="json",   # JSON-compatible types
    exclude={"status"}
)
```

---

## Q36. What are Pydantic Discriminated Unions? | Pydantic Discriminated Union nima?

**EN:** Discriminated unions allow a field to accept different model types based on a discriminator field value.

**UZ:** Discriminated union — maydonning diskriminator maydon qiymatiga asoslanib turli model turlarini qabul qilishiga imkon beradi.

```python
from pydantic import BaseModel
from typing import Union, Literal, Annotated

class CatEvent(BaseModel):
    type: Literal["cat"]
    meow_count: int

class DogEvent(BaseModel):
    type: Literal["dog"]
    bark_volume: float

# Discriminated Union — type maydoni asosida | Based on type field
PetEvent = Annotated[
    Union[CatEvent, DogEvent],
    Field(discriminator="type")
]

class EventLog(BaseModel):
    event: PetEvent

# Ishlatish | Usage
log1 = EventLog(event={"type": "cat", "meow_count": 5})
log2 = EventLog(event={"type": "dog", "bark_volume": 8.5})

print(type(log1.event))  # CatEvent
print(type(log2.event))  # DogEvent
```

---

## Q37. What are Pydantic computed fields? | Pydantic computed field nima?

**EN:** `@computed_field` creates read-only properties that are included in model serialization.

**UZ:** `@computed_field` — model serializatsiyasiga kiritilgan faqat o'qish xususiyatlarini yaratadi.

```python
from pydantic import BaseModel, computed_field

class Rectangle(BaseModel):
    width: float
    height: float

    @computed_field
    @property
    def area(self) -> float:
        return self.width * self.height

    @computed_field
    @property
    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

rect = Rectangle(width=5.0, height=3.0)
print(rect.model_dump())
# {'width': 5.0, 'height': 3.0, 'area': 15.0, 'perimeter': 16.0}
```

---

## Q38. How to handle Optional fields properly? | Optional maydonlarni qanday to'g'ri boshqarish kerak?

**EN:** Distinguish between "field not provided" (use `exclude_unset`) and "field is None" (use `Optional`). For PATCH endpoints, use `exclude_unset=True`.

**UZ:** "Maydon berilmagan" (`exclude_unset`) va "maydon None" (`Optional`) orasidagi farqni ajrating. PATCH endpointlar uchun `exclude_unset=True` ishlatiladi.

```python
from pydantic import BaseModel
from typing import Optional

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    bio: Optional[str] = None

# PATCH endpoint — faqat berilgan maydonlarni yangilash | Update only provided fields
@app.patch("/users/{user_id}")
async def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: AsyncSession = Depends(get_db)
):
    # Faqat berilgan maydonlar | Only provided fields
    update_data = user_update.model_dump(exclude_unset=True)
    # PATCH {"name": "Vali"} → {"name": "Vali"} (email va bio o'zgartirilmaydi | not changed)

    stmt = (
        update(User)
        .where(User.id == user_id)
        .values(**update_data)
    )
    await db.execute(stmt)
    await db.commit()
    return {"updated": update_data}
```

---

## Q39. What is Pydantic's `model_config`? | Pydantic `model_config` nima?

**EN:** `model_config` (V2) / `class Config` (V1) controls model behavior — ORM mode, extra fields, field aliases, etc.

**UZ:** `model_config` (V2) / `class Config` (V1) — model xatti-harakatini boshqaradi: ORM rejimi, qo'shimcha maydonlar, maydon aliasi va boshqalar.

```python
from pydantic import BaseModel, ConfigDict, Field

class StrictUser(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,          # ORM mode — SQLAlchemy bilan | With SQLAlchemy
        extra="forbid",                # Qo'shimcha maydonlarga ruxsat yo'q | No extra fields
        str_strip_whitespace=True,     # Stringlardan bo'sh joylarni olib tashlash | Strip whitespace
        str_to_lower=False,            # Stringlarni kichik harfga o'tkazmaslik
        validate_assignment=True,      # Tayinlashda ham tekshirish | Validate on assignment
        populate_by_name=True,         # Alias bilan ham to'ldirish | Also populate by name
        frozen=False,                  # Immutable qilish | Make immutable
    )

    name: str = Field(..., alias="full_name")
    email: str

# extra="forbid" — noma'lum maydon bo'lsa xato | Unknown field raises error
try:
    StrictUser(name="Ali", email="ali@ex.com", unknown="field")
except Exception as e:
    print(e)  # ValidationError: Extra inputs not permitted

# populate_by_name=True — ikkala nom bilan ham yaratish | Create with both names
user = StrictUser(full_name="Ali", email="ali@ex.com")   # alias bilan | with alias
user = StrictUser(name="Ali", email="ali@ex.com")         # ism bilan | with name
```

---

## Q40. How to use Pydantic for environment-specific configuration? | Pydantic'ni muhitga xos konfiguratsiya uchun qanday ishlatish kerak?

**EN:** Use multiple settings classes or environment variables to manage dev/staging/production configs.

**UZ:** Dev/staging/production konfiguratsiyalarini boshqarish uchun bir nechta settings klasslari yoki muhit o'zgaruvchilaridan foydalanish.

```python
from pydantic_settings import BaseSettings, SettingsConfigDict
from enum import Enum

class Environment(str, Enum):
    DEV = "development"
    STAGING = "staging"
    PROD = "production"

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    ENV: Environment = Environment.DEV
    DATABASE_URL: str
    SECRET_KEY: str
    DEBUG: bool = False
    LOG_LEVEL: str = "INFO"

    # DB pool hajmi muhitga qarab | DB pool size by environment
    @property
    def db_pool_size(self) -> int:
        return {
            Environment.DEV: 5,
            Environment.STAGING: 10,
            Environment.PROD: 20
        }[self.ENV]

    @property
    def is_production(self) -> bool:
        return self.ENV == Environment.PROD

settings = Settings()

# .env.development
# ENV=development
# DATABASE_URL=postgresql+asyncpg://user:pass@localhost/devdb
# SECRET_KEY=devsecret
# DEBUG=true

# .env.production
# ENV=production
# DATABASE_URL=postgresql+asyncpg://user:pass@prod-server/proddb
# SECRET_KEY=supersecretkey
# DEBUG=false
```

---

# 🔵 SQLALCHEMY (Q41–Q55)

---

## Q41. What is SQLAlchemy? | SQLAlchemy nima?

**EN:** SQLAlchemy is a Python SQL toolkit and ORM (Object-Relational Mapper). It has two components: **Core** (SQL Expression Language — low level) and **ORM** (high level — maps Python classes to DB tables).

**UZ:** SQLAlchemy — Python SQL vositalar to'plami va ORM (Ob'ekt-Relatsion Mapper). Ikki komponentdan iborat: **Core** (SQL Expression Language — past daraja) va **ORM** (yuqori daraja — Python klasslarini DB jadvallarga moslashtiradi).

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

# Async engine yaratish | Create async engine
engine = create_async_engine(
    "postgresql+asyncpg://user:password@localhost/dbname",
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,     # Ulanishni tekshirish | Check connection
    echo=False,             # SQL loglarini ko'rsatmaslik | Don't show SQL logs
)

# Session factory | Session fabrikasi
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False  # Commit dan keyin expire bo'lmaslik | Don't expire after commit
)

# Base klass | Base class
class Base(DeclarativeBase):
    pass
```

---

## Q42. How to define SQLAlchemy models? | SQLAlchemy modellarini qanday aniqlash kerak?

**EN:** Define models as Python classes inheriting from `DeclarativeBase`. Each class represents a table.

**UZ:** Modellar `DeclarativeBase`dan meros olgan Python klasslari sifatida aniqlanadi. Har bir klass bitta jadvalni ifodalaydi.

```python
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship, DeclarativeBase
from datetime import datetime

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship | Munosabat
    orders = relationship("Order", back_populates="user", lazy="selectin")

    def __repr__(self):
        return f"<User id={self.id} email={self.email}>"

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    total = Column(Float, nullable=False)
    status = Column(String(50), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="orders")
```

---

## Q43. What are SQLAlchemy Relationships? | SQLAlchemy Relationships nima?

**EN:** Relationships define how models are connected. Types: One-to-Many, Many-to-One, One-to-One, Many-to-Many.

**UZ:** Relationships — modellar qanday bog'liqligini belgilaydi. Turlari: One-to-Many, Many-to-One, One-to-One, Many-to-Many.

```python
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship, DeclarativeBase

class Base(DeclarativeBase):
    pass

# Many-to-Many uchun oraliq jadval | Association table for Many-to-Many
post_tags = Table(
    "post_tags", Base.metadata,
    Column("post_id", Integer, ForeignKey("posts.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id"), primary_key=True),
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)

    # One-to-Many: bir user → ko'p post | One user → many posts
    posts = relationship("Post", back_populates="author", cascade="all, delete-orphan")

    # One-to-One: bir user → bir profil | One user → one profile
    profile = relationship("Profile", back_populates="user", uselist=False)

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)

    # Many-to-One | Ko'p post → bir user
    author = relationship("User", back_populates="posts")

    # Many-to-Many: ko'p post ↔ ko'p tag | Many posts ↔ many tags
    tags = relationship("Tag", secondary=post_tags, back_populates="posts")

class Tag(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    posts = relationship("Post", secondary=post_tags, back_populates="tags")
```

---

## Q44. What is the N+1 Query Problem and how to solve it? | N+1 Query muammosi nima va uni qanday hal qilish mumkin?

**EN:** N+1 happens when fetching N records triggers N additional queries for related data. Solved with eager loading: `selectinload` or `joinedload`.

**UZ:** N+1 — N ta yozuv olish N ta qo'shimcha so'rovni keltirib chiqarganda yuz beradi. Eager loading bilan hal qilinadi: `selectinload` yoki `joinedload`.

```python
from sqlalchemy.orm import selectinload, joinedload
from sqlalchemy import select

# ❌ N+1 muammo | N+1 Problem
async def get_users_bad(db: AsyncSession):
    result = await db.execute(select(User))
    users = result.scalars().all()
    for user in users:
        print(user.orders)  # ← Har bir user uchun alohida so'rov! | Separate query for each!
    # 1 + N ta so'rov | 1 + N queries

# ✅ selectinload — one-to-many uchun tavsiya | Recommended for one-to-many
async def get_users_good(db: AsyncSession):
    result = await db.execute(
        select(User).options(selectinload(User.orders))
    )
    users = result.scalars().all()
    # Faqat 2 ta so'rov! | Only 2 queries!
    # SELECT * FROM users;
    # SELECT * FROM orders WHERE user_id IN (1, 2, 3, ...);

# ✅ joinedload — one-to-one yoki many-to-one uchun | For one-to-one or many-to-one
async def get_orders_with_user(db: AsyncSession):
    result = await db.execute(
        select(Order).options(joinedload(Order.user))
    )
    # Bitta JOIN so'rov | Single JOIN query
    # SELECT orders.*, users.* FROM orders JOIN users ON ...

# ✅ Ko'p darajali yuklash | Multi-level loading
result = await db.execute(
    select(User).options(
        selectinload(User.orders).selectinload(Order.items)
    )
)
```

---

## Q45. How to perform CRUD operations with SQLAlchemy async? | SQLAlchemy async bilan CRUD operatsiyalarini qanday bajarish kerak?

**EN:** Use `AsyncSession` methods to create, read, update, and delete records asynchronously.

**UZ:** Yozuvlarni asinxron yaratish, o'qish, yangilash va o'chirish uchun `AsyncSession` metodlaridan foydalaning.

```python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from sqlalchemy.orm import selectinload

# CREATE | Yaratish
async def create_user(db: AsyncSession, name: str, email: str) -> User:
    user = User(name=name, email=email)
    db.add(user)
    await db.commit()
    await db.refresh(user)  # ID ni olish | Get generated ID
    return user

# READ — bitta | Single
async def get_user(db: AsyncSession, user_id: int) -> User | None:
    result = await db.execute(
        select(User)
        .where(User.id == user_id)
        .options(selectinload(User.orders))
    )
    return result.scalar_one_or_none()

# READ — ro'yxat | List
async def get_users(db: AsyncSession, skip: int = 0, limit: int = 10):
    result = await db.execute(
        select(User)
        .where(User.is_active == True)
        .order_by(User.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()

# UPDATE
async def update_user(db: AsyncSession, user_id: int, **kwargs) -> User | None:
    await db.execute(
        update(User)
        .where(User.id == user_id)
        .values(**kwargs)
    )
    await db.commit()
    return await get_user(db, user_id)

# DELETE
async def delete_user(db: AsyncSession, user_id: int) -> bool:
    result = await db.execute(
        delete(User).where(User.id == user_id)
    )
    await db.commit()
    return result.rowcount > 0
```

---

## Q46. What is SQLAlchemy Session and how does it work? | SQLAlchemy Session nima va u qanday ishlaydi?

**EN:** Session is the main interface for database operations. It tracks changes to ORM objects and syncs them with the DB on `commit()`. Use `yield` in FastAPI deps for proper lifecycle management.

**UZ:** Session — ma'lumotlar bazasi operatsiyalari uchun asosiy interfeys. ORM ob'ektlaridagi o'zgarishlarni kuzatadi va `commit()` da DB bilan sinxronlaydi. FastAPI deps'da `yield` ishlatib to'g'ri lifecycle boshqarish uchun.

```python
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from fastapi import Depends
from typing import AsyncGenerator

engine = create_async_engine("postgresql+asyncpg://...")
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

# FastAPI dependency | FastAPI bog'liqlik
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
            # EN: If no exception, commit happens automatically
            # UZ: Istisno bo'lmasa, commit avtomatik bo'ladi
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

# Session holatlari | Session states
# transient   → ob'ekt yaratilgan, session'ga qo'shilmagan | created, not added to session
# pending     → session'ga qo'shilgan, commit bo'lmagan | added, not committed
# persistent  → DB'da bor, session kuzatyapti | in DB, session tracking
# detached    → session'dan ajratilgan | detached from session
```

---

## Q47. What is the difference between `scalar()`, `scalars()`, `all()`, `first()`, `one()`? | Ular orasida qanday farq bor?

**EN:** These methods control how query results are fetched and returned.

**UZ:** Bu metodlar so'rov natijalari qanday olinishi va qaytarilishini boshqaradi.

```python
from sqlalchemy import select

result = await db.execute(select(User))

# .all() → barcha qatorlar ro'yxati | List of all rows (tuples)
rows = result.all()            # [(User,), (User,), ...]

# .scalars().all() → barcha ORM ob'ektlari | All ORM objects
users = result.scalars().all() # [User, User, ...]

# .scalar_one() → bitta natija, aks holda xato | Single result, error if not exactly one
user = result.scalar_one()     # ValueError if 0 or >1 results

# .scalar_one_or_none() → bitta yoki None | Single or None
user = result.scalar_one_or_none()  # None if not found, error if >1

# .first() → birinchi qator yoki None | First row or None
row = result.first()           # (User,) | tuple or None

# .scalars().first() → birinchi ORM ob'ekt | First ORM object
user = result.scalars().first()  # User | or None

# Amaliy | Practical usage
async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(
        select(User).where(User.email == email)
    )
    return result.scalar_one_or_none()  # ← Eng keng tarqalgan | Most common
```

---

## Q48. How to handle transactions in SQLAlchemy? | SQLAlchemy'da transaksiyalarni qanday boshqarish kerak?

**EN:** SQLAlchemy sessions automatically manage transactions. Use `begin()` for explicit transactions or `rollback()` on errors.

**UZ:** SQLAlchemy sessionlari tranzaksiyalarni avtomatik boshqaradi. Aniq tranzaksiyalar uchun `begin()` yoki xatolarda `rollback()` ishlatiladi.

```python
from sqlalchemy.ext.asyncio import AsyncSession

# 1. Avtomatik tranzaksiya | Automatic transaction
async def transfer_money(db: AsyncSession, from_id: int, to_id: int, amount: float):
    try:
        # Ikki operatsiya bitta tranzaksiyada | Two ops in one transaction
        await db.execute(
            update(Account).where(Account.id == from_id).values(balance=Account.balance - amount)
        )
        await db.execute(
            update(Account).where(Account.id == to_id).values(balance=Account.balance + amount)
        )
        await db.commit()           # Ikkalasi ham muvaffaqiyatli | Both succeed
    except Exception as e:
        await db.rollback()         # Ikkalasi ham bekor qilinadi | Both rolled back
        raise e

# 2. Nested transactions (savepoint)
async def with_savepoint(db: AsyncSession):
    async with db.begin_nested() as nested:
        try:
            db.add(User(name="Ali"))
            await nested.commit()
        except Exception:
            await nested.rollback()  # Faqat bu bo'lak | Only this part rolled back

# 3. Explicit begin
async with db.begin():
    db.add(User(name="Vali"))
    # Avtomatik commit yoki rollback | Auto commit or rollback
```

---

## Q49. What are SQLAlchemy indexes and constraints? | SQLAlchemy indeks va cheklovlari nima?

**EN:** Indexes speed up queries. Constraints ensure data integrity at the database level.

**UZ:** Indekslar so'rovlarni tezlashtiradi. Cheklovlar ma'lumotlar bazasi darajasida ma'lumotlar yaxlitligini ta'minlaydi.

```python
from sqlalchemy import Column, Integer, String, Index, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(255), nullable=False)
    salary = Column(Integer, nullable=False)
    department = Column(String(50))

    __table_args__ = (
        # Unique constraint | Noyob cheklov
        UniqueConstraint("email", name="uq_employee_email"),

        # Composite unique | Birlashtirilgan noyob
        UniqueConstraint("first_name", "last_name", "department",
                         name="uq_employee_name_dept"),

        # Check constraint | Tekshiruv cheklovi
        CheckConstraint("salary > 0", name="ck_positive_salary"),

        # Composite index | Birlashtirilgan indeks
        Index("ix_employee_dept_name", "department", "last_name"),
    )

# Alohida indeks | Separate index
Index("ix_email_lower", Employee.email)
```

---

## Q50. What is SQLAlchemy Core vs ORM? | SQLAlchemy Core va ORM farqi nima?

**EN:** **Core** uses SQL Expression Language — direct SQL-like queries. **ORM** maps Python objects to tables — higher abstraction. For complex queries or bulk operations, Core is better. For CRUD on models, ORM is easier.

**UZ:** **Core** — SQL Expression Language — to'g'ridan-to'g'ri SQL-ga o'xshash so'rovlar. **ORM** — Python ob'ektlarini jadvallarga moslashtiradi — yuqori abstraktsiya. Murakkab so'rovlar yoki bulk operatsiyalar uchun Core yaxshiroq. Modellardagi CRUD uchun ORM osonroq.

```python
from sqlalchemy import text, select, insert, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

# ═══ CORE ═══
async def core_example(db: AsyncSession):
    # Raw SQL | To'g'ri SQL
    result = await db.execute(
        text("SELECT * FROM users WHERE id = :id"),
        {"id": 1}
    )

    # SQL Expression Language
    result = await db.execute(
        select(User.id, User.name)
        .where(User.is_active == True)
        .order_by(User.name)
    )

    # Bulk insert (tez | fast)
    await db.execute(
        insert(User),
        [{"name": "Ali", "email": "ali@ex.com"},
         {"name": "Vali", "email": "vali@ex.com"}]
    )

# ═══ ORM ═══
async def orm_example(db: AsyncSession):
    # ORM ob'ektlari | ORM objects
    user = User(name="Ali", email="ali@ex.com")
    db.add(user)
    await db.commit()
    await db.refresh(user)

    # Relationship'lar bilan ishlash | Work with relationships
    result = await db.execute(
        select(User).options(selectinload(User.orders))
    )
    users = result.scalars().all()
    for user in users:
        print(user.orders)  # Oldindan yuklangan | Pre-loaded
```# 🚀 FastAPI · SQLAlchemy · Pydantic · Alembic
# Interview Questions & Answers | Intervyu Savol va Javoblari
## Part 2 of 2 — Questions 51–100

---

# 🔵 SQLALCHEMY (davomi | continued) (Q51–Q55)

---

## Q51. What is SQLAlchemy `hybrid_property`? | SQLAlchemy `hybrid_property` nima?

**EN:** `hybrid_property` works both at the Python instance level and SQL query level — allows computed properties that translate to SQL expressions.

**UZ:** `hybrid_property` — Python instance darajasida ham, SQL so'rov darajasida ham ishlaydi — SQL ifodalarga tarjimon bo'ladigan hisoblangan xususiyatlarga imkon beradi.

```python
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Column, Integer, String, Float

class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    salary_uzs = Column(Float)

    # Python darajasida | Python level
    @hybrid_property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    # SQL darajasida | SQL level (filter uchun | for filtering)
    @full_name.expression
    @classmethod
    def full_name(cls):
        return cls.first_name + " " + cls.last_name

    @hybrid_property
    def salary_usd(self) -> float:
        return self.salary_uzs / 12800  # UZS → USD

# Python'da ishlatish | Python usage
emp = Employee(first_name="Ali", last_name="Valiev", salary_uzs=5_000_000)
print(emp.full_name)     # "Ali Valiev"
print(emp.salary_usd)    # ~390 USD

# SQL filtrlash | SQL filtering
result = await db.execute(
    select(Employee).where(Employee.full_name == "Ali Valiev")
)
```

---

## Q52. What is SQLAlchemy `event` system? | SQLAlchemy `event` tizimi nima?

**EN:** SQLAlchemy events allow you to hook into ORM lifecycle events like `before_insert`, `after_update`, `before_delete`. Useful for auditing, auto-timestamps, soft delete.

**UZ:** SQLAlchemy eventlari ORM lifecycle eventlariga (`before_insert`, `after_update`, `before_delete`) ulanish imkonini beradi. Audit, avtomatik timestamp, soft delete uchun foydali.

```python
from sqlalchemy import event
from datetime import datetime

# Avtomatik timestamp | Auto-timestamp
@event.listens_for(Base, "before_update", propagate=True)
def set_updated_at(mapper, connection, target):
    if hasattr(target, "updated_at"):
        target.updated_at = datetime.utcnow()

# Soft delete pattern
@event.listens_for(Session, "before_flush")
def soft_delete_listener(session, flush_context, instances):
    for obj in session.deleted:
        if hasattr(obj, "is_deleted"):
            obj.is_deleted = True
            obj.deleted_at = datetime.utcnow()
            session.expunge(obj)  # Haqiqiy o'chirishni oldini olish | Prevent real delete
            session.add(obj)

# After insert event
@event.listens_for(User, "after_insert")
def after_user_insert(mapper, connection, target):
    print(f"New user created: {target.email}")
```

---

## Q53. How to implement Soft Delete with SQLAlchemy? | SQLAlchemy bilan Soft Delete qanday amalga oshiriladi?

**EN:** Soft delete marks records as deleted instead of removing them from the database.

**UZ:** Soft delete — yozuvlarni ma'lumotlar bazasidan o'chirish o'rniga o'chirilgan deb belgilaydi.

```python
from sqlalchemy import Column, Boolean, DateTime, select
from sqlalchemy.orm import DeclarativeBase, declared_attr
from datetime import datetime

class SoftDeleteMixin:
    is_deleted: bool = Column(Boolean, default=False, nullable=False)
    deleted_at: datetime = Column(DateTime, nullable=True)

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = datetime.utcnow()

class TimestampMixin:
    created_at: datetime = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at: datetime = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class User(Base, SoftDeleteMixin, TimestampMixin):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)

# Soft delete ishlatish | Using soft delete
async def delete_user(db: AsyncSession, user_id: int):
    user = await get_user(db, user_id)
    user.soft_delete()           # is_deleted = True, deleted_at set
    await db.commit()

# Faqat faollarni olish | Get only active records
async def get_active_users(db: AsyncSession):
    result = await db.execute(
        select(User).where(User.is_deleted == False)
    )
    return result.scalars().all()
```

---

## Q54. What is `expire_on_commit` in SQLAlchemy? | SQLAlchemy'da `expire_on_commit` nima?

**EN:** By default, after `commit()`, all ORM objects expire (attributes become lazy-loaded on next access). Set `expire_on_commit=False` in async contexts to avoid `MissingGreenlet` errors.

**UZ:** Standart bo'yicha, `commit()` dan keyin barcha ORM ob'ektlari expire bo'ladi (atributlar keyingi kirishda lazy-load bo'ladi). Async kontekstlarda `MissingGreenlet` xatolarini oldini olish uchun `expire_on_commit=False` o'rnating.

```python
# ❌ Muammo | Problem
AsyncSessionLocal = async_sessionmaker(engine)  # expire_on_commit=True (default)

async def create_user(db: AsyncSession, name: str):
    user = User(name=name)
    db.add(user)
    await db.commit()
    print(user.name)  # ← MissingGreenlet xatosi! | Error in async!
                      # Chunki commit dan keyin expire bo'ldi | Expired after commit

# ✅ Yechim | Solution
AsyncSessionLocal = async_sessionmaker(
    engine,
    expire_on_commit=False  # ← Async uchun muhim! | Important for async!
)

async def create_user(db: AsyncSession, name: str):
    user = User(name=name)
    db.add(user)
    await db.commit()
    await db.refresh(user)  # ID va boshqa DB generatsiya qilingan qiymatlarni olish | Get DB-generated values
    print(user.name)        # ✅ Ishlaydi | Works
    return user
```

---

## Q55. How to implement full-text search with SQLAlchemy? | SQLAlchemy bilan to'liq matn qidiruvini qanday amalga oshirish kerak?

**EN:** Use PostgreSQL's `tsvector` and `tsquery` via SQLAlchemy for full-text search. Or use `ILIKE` for simple case-insensitive search.

**UZ:** To'liq matn qidiruvi uchun SQLAlchemy orqali PostgreSQL'ning `tsvector` va `tsquery` ishlatiladi. Yoki oddiy katta-kichik harfga sezgir bo'lmagan qidirish uchun `ILIKE`.

```python
from sqlalchemy import select, func, cast
from sqlalchemy.dialects.postgresql import TSVECTOR

# Oddiy qidirish | Simple search with ILIKE
async def search_users_simple(db: AsyncSession, query: str):
    pattern = f"%{query}%"
    result = await db.execute(
        select(User).where(
            or_(
                User.name.ilike(pattern),
                User.email.ilike(pattern)
            )
        )
    )
    return result.scalars().all()

# PostgreSQL Full-text search
async def search_products_fts(db: AsyncSession, query: str):
    result = await db.execute(
        select(Product).where(
            func.to_tsvector("english", Product.name + " " + Product.description)
            .op("@@")(func.plainto_tsquery("english", query))
        ).order_by(
            func.ts_rank(
                func.to_tsvector("english", Product.name),
                func.plainto_tsquery("english", query)
            ).desc()
        )
    )
    return result.scalars().all()
```

---

# 🟡 ALEMBIC (Q56–Q65)

---

## Q56. What is Alembic? | Alembic nima?

**EN:** Alembic is a database migration tool for SQLAlchemy. It tracks schema changes over time using migration scripts, similar to how Git tracks code changes.

**UZ:** Alembic — SQLAlchemy uchun ma'lumotlar bazasi migratsiya vositasi. Migratsiya skriptlari yordamida schema o'zgarishlarini vaqt bo'yicha kuzatadi — Git kod o'zgarishlarini kuzatganiga o'xshash.

```bash
# O'rnatish | Install
pip install alembic

# Alembic boshlash | Initialize Alembic
alembic init alembic

# Bu tuzilmani yaratadi | Creates this structure:
# alembic/
#   env.py          ← Konfiguratsiya | Configuration
#   script.py.mako  ← Migratsiya shabloni | Migration template
#   versions/       ← Migratsiya fayllar | Migration files
# alembic.ini       ← Asosiy konfiguratsiya | Main config
```

---

## Q57. How to configure Alembic for async SQLAlchemy? | Alembic'ni async SQLAlchemy uchun qanday sozlash kerak?

**EN:** Async SQLAlchemy requires special Alembic configuration to run migrations asynchronously.

**UZ:** Async SQLAlchemy migratsiyalarni asinxron bajarish uchun maxsus Alembic konfiguratsiyasini talab qiladi.

```python
# alembic/env.py — Async versiya | Async version

import asyncio
from logging.config import fileConfig
from sqlalchemy.ext.asyncio import create_async_engine
from alembic import context
from app.database import Base
from app.models import *   # Barcha modellarni import qiling | Import all models!

config = context.config
fileConfig(config.config_file_name)
target_metadata = Base.metadata

def get_url():
    from app.config import get_settings
    return get_settings().DATABASE_URL

async def run_migrations_online():
    connectable = create_async_engine(get_url())
    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)
    await connectable.dispose()

def do_run_migrations(connection):
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        compare_type=True,       # Ustun turlarini solishtirish | Compare column types
        compare_server_default=True,
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_offline():
    context.configure(
        url=get_url(),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
```

---

## Q58. How to create and apply Alembic migrations? | Alembic migratsiyalarini qanday yaratish va qo'llash kerak?

**EN:** Use `alembic revision` to create migration scripts and `alembic upgrade` to apply them.

**UZ:** Migratsiya skriptlarini yaratish uchun `alembic revision`, ularni qo'llash uchun `alembic upgrade` ishlatiladi.

```bash
# 1. Avtomatik migratsiya yaratish (model o'zgarishiga asoslanib)
# Auto-generate migration (based on model changes)
alembic revision --autogenerate -m "Add users table"

# 2. Qo'lda migratsiya yaratish | Manual migration
alembic revision -m "Add custom function"

# 3. Migratsiyalarni qo'llash | Apply migrations
alembic upgrade head        # Eng oxirigacha | To latest
alembic upgrade +1          # Bir qadam oldinga | One step forward
alembic upgrade abc123def   # Aniq versiyagacha | To specific version

# 4. Orqaga qaytarish | Rollback
alembic downgrade -1        # Bir qadam orqaga | One step back
alembic downgrade base      # Hammasini bekor qilish | Undo all

# 5. Holat tekshirish | Check status
alembic current             # Hozirgi versiya | Current version
alembic history --verbose   # Barcha migratsiyalar | All migrations
alembic heads               # Oxirgi versiyalar | Latest versions

# 6. SQL skript yaratish (execute qilmasdan) | Generate SQL without executing
alembic upgrade head --sql > migration.sql
```

---

## Q59. What does a migration file look like? | Migratsiya fayli qanday ko'rinadi?

**EN:** Each migration file has `upgrade()` and `downgrade()` functions. `upgrade()` applies changes, `downgrade()` reverts them.

**UZ:** Har bir migratsiya fayli `upgrade()` va `downgrade()` funksiyalariga ega. `upgrade()` o'zgarishlarni qo'llaydi, `downgrade()` ularni bekor qiladi.

```python
# alembic/versions/a1b2c3d4_add_users_table.py

"""Add users table

Revision ID: a1b2c3d4e5f6
Revises: None
Create Date: 2024-01-15 10:30:00.000000
"""
from alembic import op
import sqlalchemy as sa

revision = 'a1b2c3d4e5f6'
down_revision = None    # Oldingi migratsiya | Previous migration
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Jadval yaratish | Create table
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("name", sa.String(100), nullable=False),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("is_active", sa.Boolean(), default=True, nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_users_email", "users", ["email"], unique=True)

def downgrade() -> None:
    # Bekor qilish | Revert
    op.drop_index("ix_users_email", table_name="users")
    op.drop_table("users")
```

```python
# Ustun qo'shish migratsiyasi | Add column migration
"""Add bio to users

Revision ID: b2c3d4e5f6a1
Revises: a1b2c3d4e5f6
"""
from alembic import op
import sqlalchemy as sa

def upgrade() -> None:
    op.add_column("users", sa.Column("bio", sa.Text(), nullable=True))
    op.add_column("users", sa.Column("avatar_url", sa.String(500), nullable=True))

def downgrade() -> None:
    op.drop_column("users", "bio")
    op.drop_column("users", "avatar_url")
```

---

## Q60. How to handle data migrations in Alembic? | Alembic'da ma'lumot migratsiyalarini qanday boshqarish kerak?

**EN:** Data migrations modify existing data (not schema). Use `op.get_bind()` or `op.execute()` inside migration files.

**UZ:** Ma'lumot migratsiyalari mavjud ma'lumotlarni o'zgartiradi (sxema emas). Migratsiya fayllarida `op.get_bind()` yoki `op.execute()` ishlatiladi.

```python
# Ma'lumot migratsiyasi | Data migration

from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column

def upgrade() -> None:
    # 1. Yangi ustun qo'shish | Add new column
    op.add_column("users", sa.Column("full_name", sa.String(200), nullable=True))

    # 2. Mavjud ma'lumotlarni o'zgartirish | Modify existing data
    users_table = table(
        "users",
        column("id", sa.Integer),
        column("first_name", sa.String),
        column("last_name", sa.String),
        column("full_name", sa.String),
    )
    conn = op.get_bind()
    users = conn.execute(sa.select(users_table)).fetchall()

    for user in users:
        conn.execute(
            users_table.update()
            .where(users_table.c.id == user.id)
            .values(full_name=f"{user.first_name} {user.last_name}")
        )

    # 3. NOT NULL qilish | Make NOT NULL
    op.alter_column("users", "full_name", nullable=False)

def downgrade() -> None:
    op.drop_column("users", "full_name")
```

---

## Q61. How to handle Alembic migrations in production? | Production'da Alembic migratsiyalarini qanday boshqarish kerak?

**EN:** Run migrations as part of your CI/CD pipeline or at application startup. Always backup before migrating in production.

**UZ:** Migratsiyalarni CI/CD pipeline yoki ilova ishga tushganda bajaring. Production'da migratsiyadan oldin doim zaxira nusxa oling.

```python
# main.py — Startup'da migratsiya | Migration on startup
from fastapi import FastAPI
from alembic.config import Config
from alembic import command
import asyncio

async def run_migrations():
    alembic_cfg = Config("alembic.ini")
    await asyncio.to_thread(command.upgrade, alembic_cfg, "head")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # EN: Run migrations before accepting requests
    # UZ: So'rovlarni qabul qilishdan oldin migratsiyalarni bajaring
    await run_migrations()
    yield

app = FastAPI(lifespan=lifespan)
```

```bash
# CI/CD pipeline (GitHub Actions / GitLab CI)
# .github/workflows/deploy.yml

deploy:
  steps:
    - name: Run migrations
      run: |
        # Backup first | Avval zaxira
        pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
        # Migrate
        alembic upgrade head
    - name: Deploy app
      run: docker compose up -d
```

---

## Q62. What is Alembic `--autogenerate` and its limitations? | Alembic `--autogenerate` va uning cheklovlari nima?

**EN:** `--autogenerate` compares your SQLAlchemy models with the current DB schema and generates migration scripts. But it has limitations — it can't detect everything.

**UZ:** `--autogenerate` — SQLAlchemy modellaringizni joriy DB sxemasi bilan solishtirib, migratsiya skriptlarini avtomatik yaratadi. Lekin u hamma narsani aniqlay olmaydi.

```python
# ✅ Autogenerate aniqlaydi | Autogenerate detects:
# - Jadval qo'shish/o'chirish | Add/remove tables
# - Ustun qo'shish/o'chirish | Add/remove columns
# - Ustun turi o'zgarishi | Column type changes
# - Nullable o'zgarishi | Nullable changes
# - Unique constraint o'zgarishi | Unique constraint changes
# - Indeks o'zgarishi | Index changes

# ❌ Autogenerate aniqlamaydi | Autogenerate does NOT detect:
# - Stored procedures va functions
# - Views | Ko'rinishlar
# - Trigger'lar
# - Sequences (ba'zan | sometimes)
# - CHECK constraints (bazi DB lar uchun | for some DBs)

# Shuning uchun har doim ko'rib chiqing! | Always review generated migrations!
alembic revision --autogenerate -m "my change"
# Yaratilgan faylni tekshiring! | Check the generated file!
cat alembic/versions/xxxxx_my_change.py
```

---

## Q63. How to work with multiple databases in Alembic? | Alembic'da bir nechta ma'lumotlar bazalari bilan qanday ishlash kerak?

**EN:** Use Alembic's multi-database feature with separate version directories for each database.

**UZ:** Har bir ma'lumotlar bazasi uchun alohida versiya kataloglari bilan Alembic'ning ko'p ma'lumotlar bazasi xususiyatidan foydalaning.

```python
# alembic.ini
# [alembic]
# script_location = alembic
# version_locations = %(here)s/alembic/versions_db1 %(here)s/alembic/versions_db2

# env.py — Multi-DB konfiguratsiya
from alembic import context

db_configs = {
    "db1": "postgresql+asyncpg://user:pass@host1/db1",
    "db2": "postgresql+asyncpg://user:pass@host2/db2",
}

def run_migrations_for(db_name: str):
    engine = create_async_engine(db_configs[db_name])
    # ...

# Alohida migratsiya yaratish | Create separate migration
alembic revision --autogenerate -m "Add users" --version-path alembic/versions_db1
```

---

## Q64. What is Alembic `branch` and how to merge branches? | Alembic `branch` nima va ularni qanday birlashtirish kerak?

**EN:** Alembic supports branching like Git — parallel migration paths. Use `alembic merge` to combine branches.

**UZ:** Alembic Git kabi branchlashni qo'llab-quvvatlaydi — parallel migratsiya yo'llari. Branchlarni birlashtirish uchun `alembic merge` ishlatiladi.

```bash
# Branch holati | Branch situation
alembic history --verbose
# a1b2c3 (head) ← Branch 1: add users table
# d4e5f6 (head) ← Branch 2: add products table
# g7h8i9          ← Umumiy asos | Common base

# Branchlarni birlashtirish | Merge branches
alembic merge -m "Merge users and products" a1b2c3 d4e5f6

# Yangi migratsiya fayli | New migration file created:
# Revision ID: j0k1l2
# Revises: a1b2c3, d4e5f6  (ikkala asos | both parents)
# down_revision = ('a1b2c3', 'd4e5f6')

alembic upgrade head
```

---

## Q65. How to stamp Alembic version without running migrations? | Migratsiyalarni bajarmasdan Alembic versiyasini qanday belgilash kerak?

**EN:** `alembic stamp` marks the DB at a specific revision without actually running migrations — useful when the DB already has the correct schema.

**UZ:** `alembic stamp` — migratsiyalarni haqiqatda bajarmasdan DB ni ma'lum versiyada belgilaydi — DB allaqachon to'g'ri sxemaga ega bo'lganda foydali.

```bash
# Mavjud DB uchun | For existing database (already has correct schema)
alembic stamp head        # Eng oxirgi versiyada belgilash | Mark at latest
alembic stamp a1b2c3d4   # Aniq versiyada | At specific revision
alembic stamp base        # Boshlang'ich holatga qaytarish | Reset to base

# Amaliy holat | Practical scenario:
# 1. Yangi muhitga ko'chirish | Moving to new environment
# 2. Dastlab schema to'g'ri | Schema already correct initially
# 3. Alembic tarixini boshlash | Start Alembic history
alembic stamp head
# Endi oddiy migratsiyalar ishlaydi | Now regular migrations work
```

---

# ⚡ ASYNC & PERFORMANCE (Q66–Q75)

---

## Q66. How does Python's asyncio event loop work? | Python asyncio event loop qanday ishlaydi?

**EN:** The event loop runs coroutines cooperatively. When a coroutine hits `await`, it yields control to the loop, which runs other coroutines until the awaited operation completes.

**UZ:** Event loop koroutinlarni kooperativ tarzda bajaradi. Koroutin `await` ga yetganda, boshqaruvni loop'ga beradi, loop kutilayotgan operatsiya tugamaguncha boshqa koroutinlarni bajaradi.

```python
import asyncio
import time

# Sinxron | Sync — ketma-ket, 3 soniya | Sequential, 3 seconds
def sync_main():
    time.sleep(1)
    time.sleep(1)
    time.sleep(1)
    print("Done in 3 seconds")

# Asinxron | Async — parallel, ~1 soniya | Concurrent, ~1 second
async def fetch_data(name: str, delay: float):
    print(f"{name} boshlandi | started")
    await asyncio.sleep(delay)   # ← Boshqaruvni beradi | Yields control
    print(f"{name} tugadi | finished")
    return f"{name} result"

async def async_main():
    start = time.time()
    # Parallel bajarish | Run concurrently
    results = await asyncio.gather(
        fetch_data("Task1", 1.0),
        fetch_data("Task2", 1.0),
        fetch_data("Task3", 1.0),
    )
    print(f"Done in {time.time()-start:.2f}s")  # ~1.00s
    return results

asyncio.run(async_main())

# FastAPI event loop | FastAPI's event loop managed by Uvicorn
# Bir eventloop'da yuzlab parallel so'rovlar | Hundreds of concurrent requests per event loop
```

---

## Q67. What is `asyncio.gather()` vs `asyncio.wait()`? | `asyncio.gather()` va `asyncio.wait()` farqi nima?

**EN:** `gather()` runs coroutines concurrently and returns results in order. `wait()` gives more control (returns done/pending sets). Use `gather()` most of the time.

**UZ:** `gather()` — koroutinlarni parallel bajarib, natijalarni tartib bo'yicha qaytaradi. `wait()` ko'proq nazorat beradi (done/pending to'plamlarini qaytaradi). Ko'p hollarda `gather()` ishlatiladi.

```python
import asyncio

async def task(n: int) -> int:
    await asyncio.sleep(n * 0.1)
    return n * 2

# asyncio.gather — natijalar kiritish tartibida | Results in input order
async def use_gather():
    results = await asyncio.gather(task(1), task(2), task(3))
    print(results)  # [2, 4, 6] ← Tartib kafolatlangan | Order guaranteed

    # Xato boshqarish | Error handling
    results = await asyncio.gather(
        task(1), failing_task(), task(3),
        return_exceptions=True  # Xato ham qaytariladi | Errors returned too
    )

# asyncio.wait — ko'proq nazorat | More control
async def use_wait():
    tasks = [asyncio.create_task(task(n)) for n in range(5)]
    done, pending = await asyncio.wait(tasks, timeout=0.5)
    print(f"Done: {len(done)}, Pending: {len(pending)}")
    # Pending tasklarni bekor qilish | Cancel pending
    for t in pending:
        t.cancel()

# FastAPI'da amaliy ishlatish | Practical usage in FastAPI
@app.get("/dashboard/{user_id}")
async def dashboard(user_id: int, db: AsyncSession = Depends(get_db)):
    # Parallel DB so'rovlar | Parallel DB queries
    user, orders, notifications = await asyncio.gather(
        get_user(db, user_id),
        get_user_orders(db, user_id),
        get_notifications(db, user_id)
    )
    return {"user": user, "orders": orders, "notifications": notifications}
```

---

## Q68. What is Connection Pooling? | Connection Pooling nima?

**EN:** Connection pooling maintains a pool of reusable DB connections instead of creating new ones for each request. Critical for performance.

**UZ:** Connection pooling — har bir so'rov uchun yangi ulanish yaratish o'rniga qayta ishlatilishi mumkin bo'lgan DB ulanishlar hovuzini saqlaydi. Unumdorlik uchun muhim.

```python
from sqlalchemy.ext.asyncio import create_async_engine

engine = create_async_engine(
    "postgresql+asyncpg://user:pass@localhost/db",

    # Pool sozlamalari | Pool settings
    pool_size=10,        # Doimiy ulanishlar soni | Permanent connections
    max_overflow=20,     # Qo'shimcha ulanishlar | Additional connections under load
    pool_timeout=30,     # Ulanish kutish vaqti (s) | Wait for connection (s)
    pool_recycle=3600,   # Ulanishni yangilash (s) | Recycle connection (s)
    pool_pre_ping=True,  # Eskirgan ulanishni tekshirish | Check stale connections

    # Debug uchun | For debugging
    echo=False,          # SQL loglarini ko'rsatish | Show SQL logs
    echo_pool=False,     # Pool loglarini ko'rsatish | Show pool logs
)

# Pool statistikasi | Pool statistics
print(engine.pool.status())
# Pool size: 10  Connections in pool: 8  Current overflow: 2  Current checked out: 5
```

---

## Q69. How to handle long-running tasks in FastAPI? | FastAPI'da uzoq davom etadigan tasklarni qanday boshqarish kerak?

**EN:** For tasks longer than a few seconds: use Celery + Redis/RabbitMQ for background processing. Return a task ID immediately and let clients poll for status.

**UZ:** Bir necha soniyadan ko'p davom etadigan tasklar uchun: background processing uchun Celery + Redis/RabbitMQ ishlatiladi. Darhol task ID qaytarilib, clientlar status uchun polling qiladi.

```python
# celery_app.py
from celery import Celery

celery = Celery(
    "tasks",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1"
)

@celery.task(bind=True)
def process_report(self, user_id: int, date_range: dict):
    try:
        self.update_state(state="PROGRESS", meta={"progress": 0})
        # ... og'ir hisob-kitob | heavy computation
        self.update_state(state="PROGRESS", meta={"progress": 50})
        # ... davom etadi | continues
        return {"report_url": "/reports/output.xlsx"}
    except Exception as exc:
        raise self.retry(exc=exc, max_retries=3)

# FastAPI endpoint
@app.post("/reports/")
async def create_report(user_id: int):
    task = process_report.delay(user_id, {"start": "2024-01", "end": "2024-12"})
    return {"task_id": task.id, "status": "queued"}

@app.get("/reports/{task_id}/status")
async def get_report_status(task_id: str):
    task = process_report.AsyncResult(task_id)
    return {
        "task_id": task_id,
        "status": task.status,    # PENDING, PROGRESS, SUCCESS, FAILURE
        "result": task.result if task.successful() else None,
        "meta": task.info
    }
```

---

## Q70. How to optimize FastAPI performance? | FastAPI unumdorligini qanday optimallashtirish mumkin?

**EN:** Key optimizations: async I/O, connection pooling, caching, avoiding N+1, proper indexing, compression.

**UZ:** Asosiy optimallashtirishlar: async I/O, connection pooling, caching, N+1 ni oldini olish, to'g'ri indekslash, siqish.

```python
# 1. GZip siqish | GZip compression
from fastapi.middleware.gzip import GZipMiddleware
app.add_middleware(GZipMiddleware, minimum_size=1000)

# 2. Response caching
from fastapi_cache.decorator import cache
@app.get("/products/")
@cache(expire=300)  # 5 daqiqa | 5 minutes
async def list_products(): ...

# 3. Database query optimizatsiyasi | DB query optimization
# ❌ N+1
users = await get_all_users(db)
for u in users:
    orders = await get_orders(db, u.id)  # N ta so'rov | N queries

# ✅ Eager loading
users = await db.execute(
    select(User).options(selectinload(User.orders))
)

# 4. Background tasks uchun Celery
# 5. Redis caching
# 6. Nginx reverse proxy + load balancing
# 7. Uvicorn workers soni | Number of Uvicorn workers
# gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
# workers = 2 * CPU_cores + 1

# 8. Response model — keraksiz maydonlarni chiqarish | Exclude unnecessary fields
@app.get("/users/", response_model=UserPublic)  # Password yashiriladi | Password hidden
async def list_users(): ...

# 9. Pagination — barcha yozuvlarni qaytarmaslik | Don't return all records
@app.get("/items/")
async def list_items(skip: int = 0, limit: int = 20): ...
```

---

## Q71. What is `anyio` and how does FastAPI use it? | `anyio` nima va FastAPI uni qanday ishlatadi?

**EN:** `anyio` is an async networking library that supports both `asyncio` and `trio`. FastAPI/Starlette use it under the hood for backend-agnostic async operations.

**UZ:** `anyio` — `asyncio` va `trio` ni qo'llab-quvvatlaydigan async tarmoq kutubxonasi. FastAPI/Starlette backend-agnostik async operatsiyalar uchun uni ichki ishlatadi.

```python
import anyio
from fastapi import FastAPI

app = FastAPI()

@app.get("/run-tasks/")
async def run_concurrent_tasks():
    results = []

    # anyio.create_task_group — asyncio.gather'ga muqobil | Alternative to asyncio.gather
    async with anyio.create_task_group() as tg:
        async def fetch(n: int):
            await anyio.sleep(0.1)
            results.append(n)

        for i in range(10):
            tg.start_soon(fetch, i)

    return {"results": results}

# anyio.to_thread.run_sync — sync funksiyani async'da | Sync function in async
@app.get("/sync-in-async/")
async def sync_in_async():
    result = await anyio.to_thread.run_sync(blocking_function)
    return {"result": result}
```

---

## Q72. What are Server-side Streaming responses? | Server tomonidan oqimli javoblar nima?

**EN:** Streaming responses send data in chunks, allowing the client to start processing before the full response is ready. Ideal for large files or real-time data.

**UZ:** Oqimli javoblar ma'lumotlarni bo'laklarda yuboradi, clientga to'liq javob tayyor bo'lmasdan ishlov berishni boshlash imkonini beradi. Katta fayllar yoki real-vaqt ma'lumotlari uchun ideal.

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio

app = FastAPI()

async def generate_csv(data_size: int):
    yield "id,name,email\n"  # Header
    for i in range(data_size):
        await asyncio.sleep(0)  # Boshqa koroutinlarga imkon | Allow other coroutines
        yield f"{i},User{i},user{i}@example.com\n"

@app.get("/export/csv")
async def export_csv(size: int = 10000):
    return StreamingResponse(
        generate_csv(size),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=users.csv"}
    )

# Katta fayl stream | Large file streaming
@app.get("/files/{filename}")
async def stream_file(filename: str):
    async def file_generator():
        async with aiofiles.open(f"files/{filename}", "rb") as f:
            while chunk := await f.read(8192):  # 8KB bo'laklar | 8KB chunks
                yield chunk

    return StreamingResponse(file_generator(), media_type="application/octet-stream")
```

---

## Q73. How to implement request/response logging in FastAPI? | FastAPI'da so'rov/javob loglashtirish qanday amalga oshiriladi?

**EN:** Use middleware to log all requests and responses centrally.

**UZ:** Barcha so'rov va javoblarni markaziy loglash uchun middleware ishlatiladi.

```python
from fastapi import FastAPI, Request
import logging
import time
import uuid
import json

logger = logging.getLogger(__name__)

app = FastAPI()

@app.middleware("http")
async def logging_middleware(request: Request, call_next):
    request_id = str(uuid.uuid4())[:8]
    start_time = time.time()

    # So'rov logi | Request log
    logger.info(
        f"[{request_id}] → {request.method} {request.url.path} "
        f"| client: {request.client.host}"
    )

    response = await call_next(request)
    duration = time.time() - start_time

    # Javob logi | Response log
    logger.info(
        f"[{request_id}] ← {response.status_code} "
        f"| {duration:.3f}s"
    )

    response.headers["X-Request-ID"] = request_id
    response.headers["X-Process-Time"] = f"{duration:.3f}"
    return response
```

---

## Q74. What is `asyncio.Lock` and when to use it in FastAPI? | `asyncio.Lock` nima va FastAPI'da qachon ishlatish kerak?

**EN:** `asyncio.Lock` prevents race conditions when multiple coroutines access shared state concurrently.

**UZ:** `asyncio.Lock` — bir vaqtda bir nechta koroutin umumiy holatga kirganda poyga sharoitlarini (race conditions) oldini oladi.

```python
import asyncio
from fastapi import FastAPI

app = FastAPI()

# Muammo — umumiy holat | Problem — shared state
counter = 0
lock = asyncio.Lock()

@app.post("/increment/")
async def increment():
    global counter
    async with lock:  # Faqat bitta koroutin bir vaqtda | Only one coroutine at a time
        temp = counter
        await asyncio.sleep(0)  # Simulyatsiya | Simulate async work
        counter = temp + 1
    return {"counter": counter}

# Amaliy holat — rate limiter | Practical case — rate limiter
class RateLimiter:
    def __init__(self, max_calls: int, period: float):
        self.max_calls = max_calls
        self.period = period
        self.calls = []
        self.lock = asyncio.Lock()

    async def is_allowed(self) -> bool:
        async with self.lock:
            now = time.time()
            self.calls = [c for c in self.calls if now - c < self.period]
            if len(self.calls) < self.max_calls:
                self.calls.append(now)
                return True
            return False
```

---

## Q75. How to implement database connection retry logic? | Ma'lumotlar bazasiga ulanish qayta urinish logikasini qanday amalga oshirish kerak?

**EN:** Implement exponential backoff retry for transient DB connection failures.

**UZ:** Vaqtinchalik DB ulanish xatolar uchun exponential backoff qayta urinish logikasini amalga oshiring.

```python
import asyncio
import logging
from sqlalchemy.exc import OperationalError

async def with_retry(func, max_retries: int = 3, base_delay: float = 1.0):
    for attempt in range(max_retries):
        try:
            return await func()
        except OperationalError as e:
            if attempt == max_retries - 1:
                raise
            delay = base_delay * (2 ** attempt)  # Exponential backoff
            logging.warning(f"DB xato, {delay}s dan keyin qayta urinish | Retry in {delay}s: {e}")
            await asyncio.sleep(delay)

# Ishlatish | Usage
async def get_users_with_retry(db: AsyncSession):
    return await with_retry(lambda: get_users(db))

# tenacity kutubxonasi bilan | With tenacity library
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=10)
)
async def reliable_db_call(db: AsyncSession):
    return await db.execute(select(User))
```

---

# 🔐 AUTH & SECURITY (Q76–Q85)

---

## Q76. How to implement JWT Authentication in FastAPI? | FastAPI'da JWT autentifikatsiyani qanday amalga oshirish kerak?

**EN:** Use `python-jose` for JWT and `passlib` for password hashing. Implement login endpoint that returns access token.

**UZ:** JWT uchun `python-jose`, parol xeshlash uchun `passlib` ishlatiladi. Kirish tokenini qaytaradigan login endpoint yaratiladi.

```python
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

class Token(BaseModel):
    access_token: str
    token_type: str

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Hisob ma'lumotlari tasdiqlanmadi | Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = await get_user(db, user_id)
    if user is None:
        raise credentials_exception
    return user

@app.post("/auth/token", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    user = await get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Noto'g'ri login yoki parol")
    token = create_access_token(data={"sub": str(user.id)})
    return Token(access_token=token, token_type="bearer")

@app.get("/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
```

---

## Q77. How to implement Role-Based Access Control (RBAC) in FastAPI? | FastAPI'da RBAC qanday amalga oshiriladi?

**EN:** RBAC restricts access based on user roles. Create role-checking dependencies.

**UZ:** RBAC — foydalanuvchi rollariga asoslanib kirishni cheklaydi. Rol tekshiruv dependency'larini yarating.

```python
from enum import Enum
from fastapi import Depends, HTTPException

class Role(str, Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    USER = "user"

def require_role(*roles: Role):
    async def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role not in roles:
            raise HTTPException(
                status_code=403,
                detail=f"Ruxsat yo'q | Access forbidden. Required roles: {[r.value for r in roles]}"
            )
        return current_user
    return role_checker

# Ishlatish | Usage
@app.get("/admin/users/")
async def admin_list_users(
    current_user: User = Depends(require_role(Role.ADMIN))
):
    return await get_all_users(db)

@app.delete("/products/{id}")
async def delete_product(
    id: int,
    current_user: User = Depends(require_role(Role.ADMIN, Role.MANAGER))
):
    return await delete_product(db, id)

@app.get("/my-profile/")
async def my_profile(
    current_user: User = Depends(require_role(Role.ADMIN, Role.MANAGER, Role.USER))
):
    return current_user
```

---

## Q78. How to implement Refresh Token? | Refresh Token qanday amalga oshiriladi?

**EN:** Use short-lived access tokens (15-30 min) and long-lived refresh tokens (days/weeks). Store refresh tokens in DB or Redis for revocation support.

**UZ:** Qisqa muddatli access token (15-30 daqiqa) va uzoq muddatli refresh token (kunlar/haftalar) ishlatiladi. Bekor qilish imkoniyati uchun refresh tokenlarni DB yoki Redis'da saqlang.

```python
from fastapi import FastAPI, Cookie, Response

REFRESH_TOKEN_EXPIRE_DAYS = 7

def create_refresh_token(user_id: int) -> str:
    return create_access_token(
        data={"sub": str(user_id), "type": "refresh"},
        expires_delta=timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    )

@app.post("/auth/login")
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(401, "Noto'g'ri ma'lumotlar | Invalid credentials")

    access_token = create_access_token({"sub": str(user.id)})
    refresh_token = create_refresh_token(user.id)

    # Refresh token'ni HTTP-only cookie'da saqlash | Store in HTTP-only cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,      # JS kirish imkoni yo'q | No JS access
        secure=True,        # Faqat HTTPS | HTTPS only
        samesite="strict",
        max_age=REFRESH_TOKEN_EXPIRE_DAYS * 86400
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/auth/refresh")
async def refresh_token(refresh_token: str = Cookie(None)):
    if not refresh_token:
        raise HTTPException(401, "Refresh token yo'q | No refresh token")
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(401, "Noto'g'ri token turi | Invalid token type")
        user_id = payload.get("sub")
        new_access_token = create_access_token({"sub": user_id})
        return {"access_token": new_access_token}
    except JWTError:
        raise HTTPException(401, "Yaroqsiz token | Invalid token")
```

---

## Q79. What are common security vulnerabilities in FastAPI apps? | FastAPI ilovalarida keng tarqalgan xavfsizlik zaifliklari nima?

**EN / UZ:**

```python
# 1. SQL Injection — SQLAlchemy ORM ishlatish | Use SQLAlchemy ORM
# ❌ Xavfli | Dangerous
await db.execute(text(f"SELECT * FROM users WHERE email = '{user_input}'"))

# ✅ Xavfsiz | Safe (parameterized)
await db.execute(select(User).where(User.email == user_input))

# 2. Parolni ochiq saqlash | Store password in plain text
# ❌ Xavfli
user.password = password

# ✅ bcrypt hashing
user.hashed_password = pwd_context.hash(password)

# 3. Maxfiy ma'lumotlarni logga yozish | Logging secrets
# ❌ Xavfli
logger.info(f"Login: {email}, Password: {password}")

# ✅ Xavfsiz
logger.info(f"Login attempt: {email}")

# 4. CORS xato sozlash | Incorrect CORS
# ❌ Production'da
app.add_middleware(CORSMiddleware, allow_origins=["*"])

# ✅ Production'da
app.add_middleware(CORSMiddleware, allow_origins=["https://myapp.com"])

# 5. Rate limiting yo'q | No rate limiting
# ✅ slowapi qo'shing | Add slowapi
@limiter.limit("5/minute")
async def login_endpoint(request: Request): ...

# 6. Sensitive data response'da | Sensitive data in response
# ❌ Xavfli
return user  # hashed_password ham qaytariladi | returns hashed_password too

# ✅ Response model ishlatish | Use response_model
@app.get("/me", response_model=UserPublic)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
```

---

## Q80. How to validate request data and prevent XSS? | So'rov ma'lumotlarini tekshirish va XSS ni oldini olish?

**EN:** Pydantic automatically validates types. For HTML content, sanitize using `bleach`. Use `Content-Security-Policy` headers.

**UZ:** Pydantic turlarni avtomatik tekshiradi. HTML kontent uchun `bleach` yordamida tozalang. `Content-Security-Policy` headerlarini ishlating.

```python
import bleach
from pydantic import BaseModel, field_validator

class CommentCreate(BaseModel):
    content: str
    author: str

    @field_validator("content")
    @classmethod
    def sanitize_html(cls, v: str) -> str:
        # Faqat xavfsiz teglariga ruxsat | Allow only safe tags
        allowed_tags = ["b", "i", "u", "em", "strong", "p"]
        return bleach.clean(v, tags=allowed_tags, strip=True)

    @field_validator("author")
    @classmethod
    def no_html(cls, v: str) -> str:
        return bleach.clean(v, tags=[], strip=True)

# Security headers middleware | Xavfsizlik header'lari middleware
@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response
```

---

## Q81. How to implement API Key authentication? | API Key autentifikatsiyasini qanday amalga oshirish kerak?

**EN:** Accept API keys via header or query parameter. Store hashed keys in the database.

**UZ:** Header yoki query parametr orqali API kalitlarini qabul qiling. Xeshlangan kalitlarni ma'lumotlar bazasida saqlang.

```python
from fastapi import Security, HTTPException
from fastapi.security import APIKeyHeader, APIKeyQuery

API_KEY_HEADER = APIKeyHeader(name="X-API-Key", auto_error=False)
API_KEY_QUERY = APIKeyQuery(name="api_key", auto_error=False)

async def get_api_key(
    header_key: str = Security(API_KEY_HEADER),
    query_key: str = Security(API_KEY_QUERY),
    db: AsyncSession = Depends(get_db)
):
    api_key = header_key or query_key
    if not api_key:
        raise HTTPException(401, "API kalit taqdim etilmagan | No API key provided")

    # DB'dan tekshirish | Check in DB
    result = await db.execute(
        select(APIKey).where(APIKey.key_hash == hash_key(api_key))
    )
    key_obj = result.scalar_one_or_none()
    if not key_obj or not key_obj.is_active:
        raise HTTPException(403, "Noto'g'ri API kalit | Invalid API key")

    return key_obj

@app.get("/protected/")
async def protected_endpoint(api_key: APIKey = Depends(get_api_key)):
    return {"data": "Protected data", "key_owner": api_key.owner}
```

---

## Q82. How to implement Two-Factor Authentication (2FA)? | Ikki bosqichli autentifikatsiyani qanday amalga oshirish kerak?

**EN:** Use TOTP (Time-based One-Time Password) with `pyotp` library. Generate a secret, display QR code, verify 6-digit codes.

**UZ:** `pyotp` kutubxonasi bilan TOTP (Vaqtga asoslangan bir martalik parol) ishlatiladi. Maxfiy kalit yaratiladi, QR kod ko'rsatiladi, 6 xonali kodlar tekshiriladi.

```python
import pyotp
import qrcode
from io import BytesIO
from fastapi.responses import StreamingResponse

@app.post("/auth/2fa/enable")
async def enable_2fa(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    # Maxfiy kalit yaratish | Generate secret
    secret = pyotp.random_base32()
    current_user.totp_secret = secret
    await db.commit()

    totp = pyotp.TOTP(secret)
    uri = totp.provisioning_uri(current_user.email, issuer_name="MyApp")

    return {"secret": secret, "otpauth_url": uri}

@app.get("/auth/2fa/qr")
async def get_2fa_qr(current_user: User = Depends(get_current_user)):
    totp = pyotp.TOTP(current_user.totp_secret)
    uri = totp.provisioning_uri(current_user.email, issuer_name="MyApp")
    img = qrcode.make(uri)
    buf = BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return StreamingResponse(buf, media_type="image/png")

@app.post("/auth/2fa/verify")
async def verify_2fa(code: str, current_user: User = Depends(get_current_user)):
    totp = pyotp.TOTP(current_user.totp_secret)
    if not totp.verify(code):
        raise HTTPException(400, "Noto'g'ri kod | Invalid code")
    return {"verified": True}
```

---

## Q83. What is OAuth2 and how to implement it in FastAPI? | OAuth2 nima va FastAPI'da uni qanday amalga oshirish kerak?

**EN:** OAuth2 is an authorization framework. FastAPI has built-in `OAuth2PasswordBearer` for password flow. For social login (Google, GitHub), use `authlib` or `python-social-auth`.

**UZ:** OAuth2 — vakolat berish tizimi. FastAPI parol oqimi uchun o'rnatilgan `OAuth2PasswordBearer`ga ega. Ijtimoiy login (Google, GitHub) uchun `authlib` yoki `python-social-auth` ishlatiladi.

```python
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config

config = Config(".env")
oauth = OAuth(config)
oauth.register(
    name="google",
    client_id=config("GOOGLE_CLIENT_ID"),
    client_secret=config("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"}
)

@app.get("/auth/google")
async def google_login(request: Request):
    redirect_uri = request.url_for("google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get("/auth/google/callback")
async def google_callback(request: Request, db: AsyncSession = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    user_info = token.get("userinfo")
    # Foydalanuvchi yaratish yoki topish | Create or find user
    user = await get_or_create_user(db, email=user_info["email"], name=user_info["name"])
    access_token = create_access_token({"sub": str(user.id)})
    return {"access_token": access_token}
```

---

## Q84. How to implement request validation middleware? | So'rov tekshiruv middleware'ini qanday amalga oshirish kerak?

**EN:** Add custom validation middleware to check request size, content type, and custom business rules.

**UZ:** So'rov hajmini, kontent turini va maxsus biznes qoidalarini tekshirish uchun maxsus tekshiruv middleware qo'shing.

```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

MAX_REQUEST_SIZE = 10 * 1024 * 1024  # 10MB

@app.middleware("http")
async def validate_request(request: Request, call_next):
    # Hajm tekshiruvi | Size check
    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > MAX_REQUEST_SIZE:
        return JSONResponse(
            status_code=413,
            content={"detail": "So'rov hajmi juda katta | Request too large"}
        )

    # Content-Type tekshiruvi | Content-Type check
    if request.method in ["POST", "PUT", "PATCH"]:
        content_type = request.headers.get("content-type", "")
        if not any(ct in content_type for ct in ["application/json", "multipart/form-data"]):
            return JSONResponse(
                status_code=415,
                content={"detail": "Qo'llab-quvvatlanmaydigan kontent turi | Unsupported content type"}
            )

    return await call_next(request)
```

---

## Q85. What is HTTPS and how to configure it? | HTTPS nima va uni qanday sozlash kerak?

**EN:** HTTPS encrypts traffic using TLS/SSL. In production, use Nginx as a reverse proxy with Let's Encrypt certificates. Uvicorn also supports TLS directly.

**UZ:** HTTPS — TLS/SSL yordamida trafikni shifrlaydi. Productionda Let's Encrypt sertifikatlari bilan Nginx'ni reverse proxy sifatida ishlatiladi. Uvicorn ham TLS ni to'g'ridan-to'g'ri qo'llab-quvvatlaydi.

```bash
# Uvicorn bilan TLS | TLS with Uvicorn (dev)
uvicorn main:app --ssl-keyfile key.pem --ssl-certfile cert.pem

# Nginx konfiguratsiyasi | Nginx config (production)
# /etc/nginx/sites-available/myapp
server {
    listen 443 ssl;
    server_name myapp.com;

    ssl_certificate /etc/letsencrypt/live/myapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myapp.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# HTTP → HTTPS yo'naltirish | HTTP → HTTPS redirect
server {
    listen 80;
    server_name myapp.com;
    return 301 https://$host$request_uri;
}
```

---

# 🧪 TESTING (Q86–Q92)

---

## Q86. How to test FastAPI endpoints? | FastAPI endpointlarini qanday sinash mumkin?

**EN:** Use `TestClient` (sync) or `AsyncClient` (async) from `httpx` with pytest.

**UZ:** pytest bilan `httpx` dan `TestClient` (sinxron) yoki `AsyncClient` (asinxron) ishlatiladi.

```python
# pip install pytest pytest-asyncio httpx

# tests/test_users.py
import pytest
from httpx import AsyncClient, ASGITransport
from main import app

@pytest.fixture
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as ac:
        yield ac

@pytest.mark.asyncio
async def test_create_user(client: AsyncClient):
    response = await client.post(
        "/api/v1/users/",
        json={"name": "Ali", "email": "ali@test.com", "password": "secret123"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "ali@test.com"
    assert "id" in data
    assert "password" not in data  # Parol yashirilishi kerak | Password should be hidden

@pytest.mark.asyncio
async def test_get_nonexistent_user(client: AsyncClient):
    response = await client.get("/api/v1/users/99999")
    assert response.status_code == 404

@pytest.mark.asyncio
async def test_unauthorized_access(client: AsyncClient):
    response = await client.get("/api/v1/admin/users/")
    assert response.status_code == 401
```

---

## Q87. How to mock dependencies in FastAPI tests? | FastAPI testlarida dependency'larni qanday mock qilish kerak?

**EN:** Use `app.dependency_overrides` to replace real dependencies with mock ones during testing.

**UZ:** Test vaqtida haqiqiy dependency'larni mock narsalar bilan almashtirish uchun `app.dependency_overrides` ishlatiladi.

```python
import pytest
from unittest.mock import AsyncMock, patch
from main import app, get_db, get_current_user

# DB dependency'ni o'zgartirish | Override DB dependency
@pytest.fixture
async def client_with_mock_db():
    mock_db = AsyncMock()

    async def mock_get_db():
        yield mock_db

    app.dependency_overrides[get_db] = mock_get_db
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac, mock_db
    app.dependency_overrides.clear()

# Auth dependency'ni o'zgartirish | Override auth dependency
@pytest.fixture
async def authenticated_client():
    fake_user = User(id=1, name="Test User", email="test@test.com", role="admin")

    async def mock_current_user():
        return fake_user

    app.dependency_overrides[get_current_user] = mock_current_user
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()

@pytest.mark.asyncio
async def test_admin_endpoint(authenticated_client: AsyncClient):
    response = await authenticated_client.get("/api/v1/admin/users/")
    assert response.status_code == 200
```

---

## Q88. How to set up test database? | Test ma'lumotlar bazasini qanday sozlash kerak?

**EN:** Use a separate test database with Alembic migrations. Use `pytest-asyncio` and transaction rollback to keep tests isolated.

**UZ:** Alembic migratsiyalari bilan alohida test ma'lumotlar bazasini ishlating. Testlarni izolyatsiyalangan holda saqlash uchun `pytest-asyncio` va tranzaksiya rollback ishlatiladi.

```python
# tests/conftest.py
import pytest_asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.database import Base
from app.main import app
from app.dependencies import get_db

TEST_DATABASE_URL = "postgresql+asyncpg://user:pass@localhost/testdb"

@pytest_asyncio.fixture(scope="session")
async def test_engine():
    engine = create_async_engine(TEST_DATABASE_URL)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)  # Jadvallar yaratish | Create tables
    yield engine
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)    # Tozalash | Clean up
    await engine.dispose()

@pytest_asyncio.fixture
async def db_session(test_engine):
    async with test_engine.begin() as conn:
        async with AsyncSession(conn) as session:
            yield session
            await session.rollback()  # Har test dan keyin bekor qilish | Rollback after each test

@pytest_asyncio.fixture
async def client(db_session: AsyncSession):
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()
```

---

## Q89. How to write integration tests for DB operations? | DB operatsiyalari uchun integratsiya testlarini qanday yozish kerak?

**EN:** Integration tests check the full stack — FastAPI endpoint + DB. Use test fixtures with real (test) DB.

**UZ:** Integratsiya testlari to'liq stekni tekshiradi — FastAPI endpoint + DB. Haqiqiy (test) DB bilan test fixture'larini ishlating.

```python
# tests/test_integration.py
import pytest
from tests.conftest import client, db_session
from app.models import User
from app.crud import create_user

@pytest.mark.asyncio
async def test_full_user_flow(client: AsyncClient, db_session: AsyncSession):
    # 1. Foydalanuvchi yaratish | Create user
    response = await client.post("/api/v1/users/", json={
        "name": "Ali",
        "email": "ali@test.com",
        "password": "password123"
    })
    assert response.status_code == 201
    user_id = response.json()["id"]

    # 2. Foydalanuvchini olish | Get user
    response = await client.get(f"/api/v1/users/{user_id}")
    assert response.status_code == 200
    assert response.json()["email"] == "ali@test.com"

    # 3. Login | Login
    response = await client.post("/api/v1/auth/token", data={
        "username": "ali@test.com",
        "password": "password123"
    })
    assert response.status_code == 200
    token = response.json()["access_token"]

    # 4. Himoyalangan endpoint | Protected endpoint
    response = await client.get(
        "/api/v1/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert response.json()["id"] == user_id

    # 5. DB'da tekshirish | Check in DB
    from sqlalchemy import select
    result = await db_session.execute(select(User).where(User.id == user_id))
    user = result.scalar_one()
    assert user.email == "ali@test.com"
    assert user.hashed_password != "password123"  # Xeshlangan | Hashed
```

---

## Q90. How to test Pydantic models? | Pydantic modellarini qanday sinash kerak?

**EN:** Test validation logic, field validators, and edge cases directly with Pydantic models.

**UZ:** Validatsiya logikasi, maydon validatorlari va chegaraviy holatlarni Pydantic modellari bilan to'g'ridan-to'g'ri sinab ko'ring.

```python
import pytest
from pydantic import ValidationError
from app.schemas import UserCreate, UserUpdate

def test_user_create_valid():
    user = UserCreate(
        name="Ali",
        email="ali@example.com",
        password="password123"
    )
    assert user.name == "Ali"
    assert user.email == "ali@example.com"

def test_user_create_invalid_email():
    with pytest.raises(ValidationError) as exc_info:
        UserCreate(name="Ali", email="not-an-email", password="pass123")
    errors = exc_info.value.errors()
    assert any(e["loc"] == ("email",) for e in errors)

def test_user_create_short_password():
    with pytest.raises(ValidationError):
        UserCreate(name="Ali", email="ali@ex.com", password="short")

def test_user_update_partial():
    # PATCH — faqat berilgan maydonlar | Only provided fields
    update = UserUpdate(name="Vali")
    dumped = update.model_dump(exclude_unset=True)
    assert dumped == {"name": "Vali"}  # email yo'q | no email field

def test_user_name_normalized():
    user = UserCreate(name="  ali  ", email="ali@ex.com", password="pass123456")
    assert user.name == "Ali"  # Normalize qilingan | Normalized
```

---

## Q91. What is `pytest-asyncio` and how to configure it? | `pytest-asyncio` nima va uni qanday sozlash kerak?

**EN:** `pytest-asyncio` enables running async test functions with pytest. Configure it in `pytest.ini` or `pyproject.toml`.

**UZ:** `pytest-asyncio` — pytest bilan async test funksiyalarini ishga tushirishga imkon beradi. `pytest.ini` yoki `pyproject.toml` da sozlanadi.

```toml
# pyproject.toml
[tool.pytest.ini_options]
asyncio_mode = "auto"   # Barcha async funksiyalar avtomatik | All async auto
testpaths = ["tests"]
python_files = ["test_*.py"]
python_classes = ["Test*"]
python_functions = ["test_*"]

# Yoki | Or: pytest.ini
# [pytest]
# asyncio_mode = auto
```

```python
# pytest.ini yoki pyproject.toml asyncio_mode=auto bilan | with asyncio_mode=auto
# @pytest.mark.asyncio kerak emas | @pytest.mark.asyncio not needed

async def test_something():  # Avtomatik | Automatically async
    result = await some_async_func()
    assert result == expected

# asyncio_mode=strict bilan | with asyncio_mode=strict
@pytest.mark.asyncio
async def test_something_strict():
    result = await some_async_func()
    assert result == expected
```

---

## Q92. How to measure test coverage? | Test qamrovini qanday o'lchash mumkin?

**EN:** Use `pytest-cov` to measure code coverage and identify untested parts.

**UZ:** Kod qamrovini o'lchash va sinovdan o'tmagan qismlarni aniqlash uchun `pytest-cov` ishlatiladi.

```bash
# O'rnatish | Install
pip install pytest-cov

# Coverage bilan test bajarish | Run tests with coverage
pytest --cov=app --cov-report=html --cov-report=term-missing

# Natija | Output:
# Name                    Stmts   Miss  Cover
# -------------------------------------------
# app/main.py                50      5    90%
# app/models.py              30      0   100%
# app/crud.py                80     10    88%
# app/routers/users.py       60      3    95%
# -------------------------------------------
# TOTAL                     220     18    92%

# Minimal qamrov talabi | Minimum coverage requirement
pytest --cov=app --cov-fail-under=80

# pyproject.toml da | In pyproject.toml
# [tool.coverage.run]
# source = ["app"]
# omit = ["*/tests/*", "*/migrations/*"]
#
# [tool.coverage.report]
# fail_under = 80
```

---

# 🚀 DEPLOY & BEST PRACTICES (Q93–Q100)

---

## Q93. How to deploy FastAPI with Docker in production? | FastAPI'ni Docker bilan production'da qanday deploy qilish kerak?

**EN:** Use multi-stage Docker build, Gunicorn + Uvicorn workers, and Docker Compose for orchestration.

**UZ:** Ko'p bosqichli Docker build, Gunicorn + Uvicorn worker'lar va orkestratsiya uchun Docker Compose ishlatiladi.

```dockerfile
# Dockerfile — Production
FROM python:3.11-slim AS base

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# Dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# App kodi | App code
COPY . .

# Non-root foydalanuvchi | Non-root user
RUN useradd -ms /bin/bash appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

# Gunicorn + Uvicorn workers
CMD ["gunicorn", "main:app",
     "--worker-class", "uvicorn.workers.UvicornWorker",
     "--workers", "4",
     "--bind", "0.0.0.0:8000",
     "--timeout", "120",
     "--graceful-timeout", "30",
     "--log-level", "info"]
```

```yaml
# docker-compose.prod.yml
version: "3.9"
services:
  api:
    build: .
    restart: unless-stopped
    env_file: .env.prod
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      retries: 3

  db:
    image: postgres:15-alpine
    restart: unless-stopped
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $POSTGRES_USER"]
      interval: 5s
      retries: 5

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - api

volumes:
  postgres_data:
```

---

## Q94. What is Uvicorn and Gunicorn and when to use which? | Uvicorn va Gunicorn nima, qachon qaysinisini ishlatish kerak?

**EN:** Uvicorn is an ASGI server (single process). Gunicorn is a process manager. In production: Gunicorn manages multiple Uvicorn workers for multi-core utilization.

**UZ:** Uvicorn — ASGI server (bitta jarayon). Gunicorn — jarayon menejeri. Productionda: Gunicorn ko'p yadroli protsessordan foydalanish uchun bir nechta Uvicorn worker'larini boshqaradi.

```bash
# Development | Dasturlash
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production — Gunicorn + Uvicorn
gunicorn main:app \
    --worker-class uvicorn.workers.UvicornWorker \
    --workers 4 \               # 2 * CPU + 1 qoida | Rule: 2 * CPU + 1
    --bind 0.0.0.0:8000 \
    --timeout 120 \             # Uzoq so'rovlar uchun | For long requests
    --keep-alive 5 \
    --access-logfile - \        # stdout'ga | To stdout
    --error-logfile - \
    --log-level info

# Worker soni hisoblash | Calculate workers
# workers = 2 * multiprocessing.cpu_count() + 1
# 4 yadroli server → 9 worker | 4-core server → 9 workers
```

---

## Q95. What is Nginx and how to configure it as reverse proxy? | Nginx nima va uni reverse proxy sifatida qanday sozlash kerak?

**EN:** Nginx acts as a reverse proxy, handling SSL termination, load balancing, static files, and request buffering.

**UZ:** Nginx — SSL terminatsiya, load balancing, statik fayllar va so'rov bufferingini boshqaradigan reverse proxy sifatida ishlaydi.

```nginx
# /etc/nginx/sites-available/myapp.conf

upstream fastapi {
    server 127.0.0.1:8000;
    # Load balancing | Yuklama taqsimlash
    # server 127.0.0.1:8001;
    # server 127.0.0.1:8002;
}

server {
    listen 443 ssl http2;
    server_name myapp.com www.myapp.com;

    # SSL
    ssl_certificate /etc/letsencrypt/live/myapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myapp.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # So'rov hajmi chegarasi | Request size limit
    client_max_body_size 10M;

    # FastAPI'ga yo'naltirish | Proxy to FastAPI
    location /api/ {
        proxy_pass http://fastapi;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
    }

    # Statik fayllar | Static files
    location /static/ {
        alias /app/static/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # GZip siqish | GZip compression
    gzip on;
    gzip_types text/plain application/json application/javascript text/css;
}

server {
    listen 80;
    server_name myapp.com www.myapp.com;
    return 301 https://$host$request_uri;
}
```

---

## Q96. What is CI/CD and how to set it up for FastAPI? | CI/CD nima va FastAPI uchun qanday sozlash kerak?

**EN:** CI/CD automates testing and deployment. GitHub Actions example for FastAPI.

**UZ:** CI/CD — testlash va deploymentni avtomatlashtiradi. FastAPI uchun GitHub Actions namunasi.

```yaml
# .github/workflows/ci-cd.yml
name: FastAPI CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: testdb
          POSTGRES_USER: testuser
          POSTGRES_PASSWORD: testpass
        ports:
          - 5432:5432
        options: --health-cmd pg_isready --health-interval 10s

    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: pip install -r requirements.txt -r requirements-test.txt

      - name: Run migrations
        run: alembic upgrade head
        env:
          DATABASE_URL: postgresql+asyncpg://testuser:testpass@localhost/testdb

      - name: Run tests with coverage
        run: pytest --cov=app --cov-fail-under=80
        env:
          DATABASE_URL: postgresql+asyncpg://testuser:testpass@localhost/testdb
          SECRET_KEY: test-secret-key

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /app
            git pull origin main
            docker compose -f docker-compose.prod.yml up -d --build
            docker compose exec api alembic upgrade head
```

---

## Q97. What are FastAPI project structure best practices? | FastAPI loyiha tuzilmasi bo'yicha eng yaxshi amaliyotlar nima?

**EN / UZ:**

```
my-fastapi-app/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app | FastAPI ilovasi
│   ├── config.py            # Settings | Sozlamalar
│   ├── database.py          # DB connection | DB ulanish
│   │
│   ├── models/              # SQLAlchemy models | SQLAlchemy modellari
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── order.py
│   │
│   ├── schemas/             # Pydantic schemas | Pydantic sxemalari
│   │   ├── __init__.py
│   │   ├── user.py          # UserCreate, UserPublic, UserUpdate
│   │   └── order.py
│   │
│   ├── routers/             # API routers | API router'lari
│   │   ├── __init__.py
│   │   ├── users.py
│   │   ├── orders.py
│   │   └── auth.py
│   │
│   ├── crud/                # DB operations | DB operatsiyalari
│   │   ├── __init__.py
│   │   ├── users.py
│   │   └── orders.py
│   │
│   ├── dependencies/        # FastAPI dependencies
│   │   ├── __init__.py
│   │   ├── auth.py          # get_current_user
│   │   └── database.py      # get_db
│   │
│   ├── services/            # Business logic | Biznes mantiq
│   │   ├── __init__.py
│   │   ├── email.py
│   │   └── payment.py
│   │
│   └── utils/               # Utilities | Yordamchi funksiyalar
│       ├── security.py      # JWT, password hashing
│       └── pagination.py
│
├── alembic/                 # DB migrations | DB migratsiyalari
│   ├── env.py
│   └── versions/
│
├── tests/                   # Testlar
│   ├── conftest.py
│   ├── test_users.py
│   └── test_orders.py
│
├── .env                     # Environment variables (gitignore!)
├── .env.example             # Template
├── .gitignore
├── alembic.ini
├── docker-compose.yml
├── docker-compose.prod.yml
├── Dockerfile
├── requirements.txt
├── requirements-test.txt
└── pyproject.toml
```

---

## Q98. What is the Repository Pattern and how to use it with FastAPI? | Repository Pattern nima va FastAPI bilan qanday ishlatish kerak?

**EN:** Repository pattern abstracts data access layer, making business logic independent of the database implementation.

**UZ:** Repository pattern — ma'lumotlarga kirish qatlamini abstraksiyalaydi, biznes mantiqini ma'lumotlar bazasi implementatsiyasidan mustaqil qiladi.

```python
# repositories/user_repo.py
from abc import ABC, abstractmethod
from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import User

class AbstractUserRepository(ABC):
    @abstractmethod
    async def get_by_id(self, user_id: int) -> Optional[User]: ...

    @abstractmethod
    async def get_by_email(self, email: str) -> Optional[User]: ...

    @abstractmethod
    async def create(self, **kwargs) -> User: ...

    @abstractmethod
    async def update(self, user_id: int, **kwargs) -> Optional[User]: ...

class SQLAlchemyUserRepository(AbstractUserRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, user_id: int) -> Optional[User]:
        result = await self.session.execute(
            select(User).where(User.id == user_id)
        )
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> Optional[User]:
        result = await self.session.execute(
            select(User).where(User.email == email)
        )
        return result.scalar_one_or_none()

    async def create(self, **kwargs) -> User:
        user = User(**kwargs)
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user

# FastAPI dependency | FastAPI bog'liqlik
def get_user_repo(db: AsyncSession = Depends(get_db)) -> AbstractUserRepository:
    return SQLAlchemyUserRepository(db)

# Router'da ishlatish | Usage in router
@router.get("/{user_id}")
async def get_user(
    user_id: int,
    repo: AbstractUserRepository = Depends(get_user_repo)
):
    user = await repo.get_by_id(user_id)
    if not user:
        raise HTTPException(404, "Foydalanuvchi topilmadi")
    return user
```

---

## Q99. What is OpenTelemetry and how to add observability to FastAPI? | OpenTelemetry nima va FastAPI'ga kuzatuvchanlikni qanday qo'shish kerak?

**EN:** OpenTelemetry provides tracing, metrics, and logging. Use `opentelemetry-instrumentation-fastapi` for automatic instrumentation.

**UZ:** OpenTelemetry — tracing, metrikalar va loglashtirish imkoniyatini beradi. Avtomatik instrumentatsiya uchun `opentelemetry-instrumentation-fastapi` ishlatiladi.

```python
# pip install opentelemetry-instrumentation-fastapi
# pip install opentelemetry-exporter-otlp

from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.sqlalchemy import SQLAlchemyInstrumentor

# Tracer sozlash | Setup tracer
provider = TracerProvider()
otlp_exporter = OTLPSpanExporter(endpoint="http://jaeger:4317")
provider.add_span_processor(BatchSpanProcessor(otlp_exporter))
trace.set_tracer_provider(provider)

# FastAPI avtomatik instrumentatsiya | Auto-instrument FastAPI
app = FastAPI()
FastAPIInstrumentor.instrument_app(app)

# SQLAlchemy instrumentatsiya | SQLAlchemy instrumentation
SQLAlchemyInstrumentor().instrument(engine=engine)

# Qo'lda span yaratish | Custom span
tracer = trace.get_tracer(__name__)

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    with tracer.start_as_current_span("get_user") as span:
        span.set_attribute("user.id", user_id)
        user = await db_get_user(user_id)
        span.set_attribute("user.found", user is not None)
        return user
```

---

## Q100. What are the most important FastAPI best practices? | FastAPI bo'yicha eng muhim amaliyotlar nima?

**EN / UZ:** Summary of all critical best practices.

```python
# ✅ 1. Async I/O ishlatish | Use async I/O
@app.get("/users/")
async def list_users(db: AsyncSession = Depends(get_db)):
    return await crud.get_users(db)

# ✅ 2. Response model bilan maxfiy ma'lumotlarni yashirish | Hide sensitive data
@app.get("/users/{id}", response_model=UserPublic)
async def get_user(id: int): ...

# ✅ 3. Dependency Injection ishlatish | Use DI
DBDep = Annotated[AsyncSession, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]

# ✅ 4. Pydantic v2 ishlatish | Use Pydantic v2
class UserCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    name: str = Field(..., min_length=2)

# ✅ 5. Versioning | Versiyalash
app.include_router(v1_router, prefix="/api/v1")

# ✅ 6. Error handling | Xato boshqaruvi
@app.exception_handler(Exception)
async def global_handler(request, exc): ...

# ✅ 7. Settings | Sozlamalar
@lru_cache()
def get_settings() -> Settings: return Settings()

# ✅ 8. Loglar | Logging
import logging
logger = logging.getLogger(__name__)

# ✅ 9. Health check
@app.get("/health")
async def health(): return {"status": "ok"}

# ✅ 10. Rate limiting | Cheklash
@limiter.limit("100/minute")
async def endpoint(request: Request): ...

# ✅ 11. Eager loading — N+1 ni oldini olish | Prevent N+1
select(User).options(selectinload(User.orders))

# ✅ 12. Testlar | Tests
# pytest --cov=app --cov-fail-under=80

# ✅ 13. CORS sozlamalari | CORS settings
app.add_middleware(CORSMiddleware, allow_origins=["https://myapp.com"])

# ✅ 14. Pagination
@app.get("/items/")
async def list_items(skip: int = 0, limit: int = Query(default=20, le=100)):
    ...

# ✅ 15. Docker + Nginx + Gunicorn production stack
# gunicorn main:app -k uvicorn.workers.UvicornWorker -w 4
```

---

## 📌 Quick Reference | Tez Qo'llanma

```bash
# FastAPI
pip install fastapi uvicorn[standard] pydantic-settings python-multipart

# Database
pip install sqlalchemy asyncpg alembic aiofiles

# Auth
pip install python-jose[cryptography] passlib[bcrypt] authlib

# Cache
pip install fastapi-cache2 redis

# Rate limiting
pip install slowapi

# Testing
pip install pytest pytest-asyncio httpx pytest-cov

# Background tasks
pip install celery redis flower

# Monitoring
pip install opentelemetry-instrumentation-fastapi

# Run
uvicorn main:app --reload                              # Development
gunicorn main:app -k uvicorn.workers.UvicornWorker -w 4  # Production

# Alembic
alembic init alembic
alembic revision --autogenerate -m "message"
alembic upgrade head
alembic downgrade -1
alembic current
alembic history
```

---

*Prepared by | Tayyorlagan: Alyorjon*
*Sources | Manbalar: FastAPI Docs, SQLAlchemy Docs, Pydantic Docs, Alembic Docs, InterviewBit, DataCamp, GeeksforGeeks*