# FastAPI — YouTube Intervyu Savol-Javoblari

> YouTube'dan olingan FastAPI intervyu savollari va kod misollari bilan javoblar. To'liq 100 ta savollik qo'llanma uchun `python/restfullapi.md` faylига qarang — bu fayl video-asosidagi qisqaroq Q&A to'plami.

---

## Asosiy tushunchalar

**1. FastAPI nima va nima uchun mashhur?**
Python'ning type hints'iga asoslangan zamonaviy, yuqori tezlikka ega veb-freymvork. **Starlette** (async) va **Pydantic** (validatsiya) asosida qurilgan. Tezkorligi, avtomatik hujjatlashtirish (Swagger UI) va async/await bilan mashhur.
```python
from fastapi import FastAPI
app = FastAPI()

@app.get("/salom/{ism}")
async def salom(ism: str):
    return {"xabar": f"Salom, {ism}!"}
```

**2. FastAPI Flask va Django'dan farqi**
| | Flask | Django | FastAPI |
|---|---|---|---|
| Turi | Mikroframework | To'liq | API-fokusli mikroframework |
| Async | Qo'shimcha sozlash | Qisman (3.1+) | Tabiiy |
| Validatsiya | Qo'lda | Forms/Serializers | Avtomatik (Pydantic) |
| Hujjat | Yo'q | Yo'q (DRF bilan qisman) | Avtomatik (Swagger/ReDoc) |

**3. Pydantic'ning roli**
```python
from pydantic import BaseModel

class Foydalanuvchi(BaseModel):
    ism: str
    yosh: int
    email: str

@app.post("/foydalanuvchi")
async def yaratish(user: Foydalanuvchi):
    return user
```
Noto'g'ri tur yuborilsa, avtomatik `422 Unprocessable Entity` qaytaradi.

**4. Asinxron dasturlash**
```python
import asyncio

@app.get("/malumot")
async def malumot_olish():
    await asyncio.sleep(1)
    return {"holat": "tayyor"}
```
I/O kutish paytida boshqa so'rovlarni bloklamaydi. Sinxron (`def`) endpoint avtomatik thread pool'da ishga tushadi.

---

## Dependency Injection

```python
from fastapi import Depends

def db_ulanish():
    db = "ma'lumotlar bazasiga ulanish"
    try:
        yield db
    finally:
        print("ulanish yopildi")

@app.get("/items")
async def items(db=Depends(db_ulanish)):
    return {"db": db}
```
Autentifikatsiya, DB session, konfiguratsiya kabi umumiy logikani bir joyda yozib, kerakli marshrutlarga ulash mumkin.

**Testlash uchun DI**
```python
app.dependency_overrides[get_db] = lambda: "fake test database"
```
Haqiqiy resursni test paytida soxta (mock) obyekt bilan almashtirib, izolyatsiya qilingan test o'tkazish.

---

## Middleware, Event Handlers

**Middleware**
```python
import time
from fastapi import Request

@app.middleware("http")
async def vaqt_middleware(request: Request, call_next):
    boshlanish = time.time()
    response = await call_next(request)
    response.headers["X-Process-Time"] = str(time.time() - boshlanish)
    return response
```
Barcha marshrutlarga avtomatik qo'llanadi (logging, header qo'shish); `Depends`dan farqi — tanlab emas, global qo'llanadi.

**Event Handlers (startup/shutdown)**
```python
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Startup — DB ulanishi ochilmoqda")
    yield
    print("Shutdown — resurslar tozalanmoqda")

app = FastAPI(lifespan=lifespan)
```
Eski usul: `@app.on_event("startup")` / `@app.on_event("shutdown")` (endi `lifespan` tavsiya etiladi).

---

## Xavfsizlik

**OAuth2 / JWT**
```python
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/himoyalangan")
async def sahifa(token: str = Depends(oauth2_scheme)):
    if token != "togri_token":
        raise HTTPException(status_code=401, detail="Ruxsat yo'q")
    return {"xabar": "Xush kelibsiz"}
```

**API Keys**
```python
from fastapi.security import APIKeyHeader
from fastapi import Security, HTTPException

api_key_header = APIKeyHeader(name="X-API-Key")

async def api_kalitni_tekshirish(kalit: str = Security(api_key_header)):
    if kalit != "maxfiy-kalit-123":
        raise HTTPException(status_code=403, detail="Noto'g'ri API kalit")
    return kalit
```
OAuth2/JWT'ga nisbatan soddaroq, lekin kamroq xavfsiz (refresh mexanizmi yo'q) — odatda server-server integratsiyasida ishlatiladi.

**CORS**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mysite.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

---

## Fayllar, Background Tasks, Streaming

**Fayllarni yuklash**
```python
from fastapi import File, UploadFile

@app.post("/yuklash")
async def fayl_yuklash(fayl: UploadFile = File(...)):
    kontent = await fayl.read()
    return {"nomi": fayl.filename, "hajmi": len(kontent)}
```
`UploadFile` faylni stream sifatida ishlaydi — katta fayllarni xotiraga to'liq yuklamaydi (`bytes` turidan farqli).

**Background Tasks**
```python
from fastapi import BackgroundTasks

def email_yuborish(email: str):
    print(f"{email} ga email yuborilmoqda...")

@app.post("/royxatdan-otish")
async def royxat(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(email_yuborish, email)
    return {"xabar": "qabul qilindi"}
```
Javob darhol qaytariladi, og'ir jarayon fonda bajariladi. Uzoq vazifalar uchun **Celery** kabi to'liq task queue tavsiya etiladi.

**Streaming Response**
```python
from fastapi.responses import StreamingResponse

def malumot_generator():
    for i in range(1000000):
        yield f"qator {i}\n"

@app.get("/stream")
async def stream_endpoint():
    return StreamingResponse(malumot_generator(), media_type="text/plain")
```
Katta ma'lumotni bo'lak-bo'lak (chunk) jo'natadi, xotirani tejaydi.

---

## Ma'lumotlar bazasi, Hujjatlashtirish, Deployment

**DB integratsiyasi**
FastAPI o'z ORM'iga ega emas — SQLAlchemy, Tortoise ORM, SQLModel yoki MongoDB uchun Motor bilan ishlaydi.
```python
@app.get("/users/{user_id}")
async def user_olish(user_id: int, db: Session = Depends(get_db)):
    return db.query(User).filter(User.id == user_id).first()
```

**Avtomatik hujjatlashtirish**
OpenAPI schema (`/openapi.json`) asosida `/docs` (Swagger UI) va `/redoc` (ReDoc) avtomatik yaratiladi.

**Sub-applications**
```python
sub_app = FastAPI()
app.mount("/kichik", sub_app)
```
Katta loyihani mustaqil qismlarga bo'lish — har biri o'z Swagger sahifasiga ega. `APIRouter`dan farqi: to'liq mustaqil FastAPI instance.

**Deployment**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```
Production arxitekturasi: Uvicorn/Gunicorn (ASGI server) → Docker → Nginx (reverse proxy, SSL) → ba'zan Kubernetes.
