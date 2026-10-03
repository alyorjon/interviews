# FastAPI amaliy intervyu ssenariylari

> **Nima bu:** "loyihada shunday muammo chiqdi — nima qilasiz?" turidagi FastAPI savollari. REST va Python asoslari — `python/restfullapi.md`, `python/basics.md` da; bu yerda faqat amaliy ssenariylar.
> **Har bir javob tartibi:** muammo oddiy tilda → yechim (kod bilan) → qanday tekshirasiz → intervyuda qanday aytasiz → esda tuting.
> **Versiya:** FastAPI 0.141 (2026-yil iyul). So'nggi o'zgarishlar: `pydantic.v1` qo'llovi olib tashlandi (0.128), Python 3.9 qo'llovi tugadi (0.129), JSON javoblar Pydantic orqali Rust'da serializatsiya qilinadi (0.130), `ORJSONResponse`/`UJSONResponse` eskirgan (0.131), JSON body uchun qat'iy `Content-Type` tekshiruvi (0.132), `yield` bilan JSON Lines oqimi (0.134), Server-Sent Events (0.135), `Depends(scope=...)` (0.121). **Asosiy manba:** [fastapi.tiangolo.com](https://fastapi.tiangolo.com/).

---

# Ssenariylar

## Q1. Token tekshiruvi har endpoint'da qo'lda yozilgan va bittasida unutilgan — nima qilasiz? / The token check is hand-written in every endpoint and one forgot it — what do you do?

**Oddiy qilib aytganda:** FastAPI'da **dependency** — endpoint'dan oldin avtomatik chaqiriladigan funksiya. "Foydalanuvchini aniqla" ishini bitta dependency'ga yozasiz va uni **butun router'ga** ulaysiz. Shunda shu router'ga qo'shilgan har yangi endpoint avtomatik himoyalanadi — unutib bo'lmaydi.

**Yechim:**

```python
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> User:
    user = await verify_token(token)
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid token",
                            headers={"WWW-Authenticate": "Bearer"})
    return user

CurrentUser = Annotated[User, Depends(get_current_user)]

# Butun router himoyalangan — yangi endpoint ham
router = APIRouter(prefix="/orders", dependencies=[Depends(get_current_user)])

@router.get("/")
async def list_orders(user: CurrentUser):      # foydalanuvchi obyekti kerak bo'lsa
    return await orders_for(user.id)
```

**Qanday tekshirasiz:** router'dagi **har** endpoint'ga token'siz so'rov yuboradigan parametrlangan test yozing — hammasi `401` qaytarishi kerak.

**Intervyuda shunday ayting:** "Autentifikatsiyani dependency'ga chiqarib, router darajasida ulayman. `Annotated` alias (`CurrentUser`) bilan qayta ishlatish oson. Ochiq endpoint'lar alohida router'da — shunda qaysisi himoyasiz ekani kod tuzilishidan ko'rinadi."

**Esda tuting:** dependency natijasi bir so'rov ichida keshlanadi — bir nechta joyda `CurrentUser` so'ralsa ham token bir marta tekshiriladi. Manba: [Security](https://fastapi.tiangolo.com/tutorial/security/), [Dependencies in path operation decorators](https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-in-path-operation-decorators/).

## Q2. Narx maydoniga "-5" yoki "abc" kelib, xato service ichida chuqur joyda chiqyapti — nima qilasiz? / A price of "-5" or "abc" arrives and fails deep inside the service — what do you do?

**Oddiy qilib aytganda:** ma'lumotni **eshikdayoq** tekshirish kerak, ichkarida emas. FastAPI'da body uchun Pydantic modeli yozasiz va unga qoidalar qo'shasiz ("narx 0 dan katta", "nom 1–100 belgi"). Qoida buzilsa, FastAPI o'zi `422` va qaysi maydon noto'g'ri ekanini qaytaradi — service'ga yaroqsiz ma'lumot yetib bormaydi.

**Yechim:**

```python
from decimal import Decimal
from typing import Annotated
from pydantic import BaseModel, Field

class ItemCreate(BaseModel):
    name: Annotated[str, Field(min_length=1, max_length=100)]
    price: Annotated[Decimal, Field(gt=0, max_digits=10, decimal_places=2)]
    quantity: Annotated[int, Field(ge=1, le=1000)] = 1

@app.post("/items", status_code=201)
async def create_item(item: ItemCreate):
    return await items.create(item)       # bu yerda item doim yaroqli
```

**Qanday tekshirasiz:** `price: -5`, `price: "abc"`, `name: ""` — har biri `422` va `detail` ichida aniq maydon nomi (`["body", "price"]`) bilan qaytishi kerak.

**Intervyuda shunday ayting:** "Chegarada Pydantic modeli bilan tekshiraman — xato 422 bo'lib, klientga qaysi maydon noto'g'ri ekanini aytadi. Pulni `float` emas, `Decimal` bilan olaman — tiyin xatolari bo'lmasin."

**Esda tuting:** FastAPI 0.128 dan `pydantic.v1` qo'llovi yo'q — eski `class Config:` va `@validator` o'rniga `model_config` va `@field_validator`. Manba: [Request Body](https://fastapi.tiangolo.com/tutorial/body/), [Body — Fields](https://fastapi.tiangolo.com/tutorial/body-fields/).

## Q3. Xato bo'lganda baza sessiyasi yopilmay qolib, ulanishlar hovuzi (pool) to'lib ketyapti — nima qilasiz? / DB sessions aren't closed on errors and the connection pool fills up — what do you do?

**Oddiy qilib aytganda:** endpoint sessiya ochdi, keyin xato chiqdi va `session.close()` qatoriga yetib bormadi. Har xatoda bitta ulanish "yo'qoladi" — oxiri pool tugaydi va hamma so'rovlar kutib qoladi. Yechim: sessiyani `yield`li dependency'da ochish — FastAPI xato bo'lsa ham `finally` qismini **albatta** bajaradi.

**Yechim:**

```python
from collections.abc import AsyncIterator
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker

SessionLocal = async_sessionmaker(engine, expire_on_commit=False)

async def get_db() -> AsyncIterator[AsyncSession]:
    async with SessionLocal() as session:        # chiqishda doim yopiladi
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise                                 # xatoni yutib yubormaymiz

Db = Annotated[AsyncSession, Depends(get_db)]

@app.post("/orders")
async def create_order(data: OrderIn, db: Db):
    db.add(Order(**data.model_dump()))
```

**Qanday tekshirasiz:** endpoint'da ataylab xato chiqaradigan testni 100 marta ishga tushiring, keyin `engine.pool.checkedout()` → `0` bo'lishi kerak.

**Intervyuda shunday ayting:** "Resurslarni `yield`li dependency'da ochaman: `yield` dan oldin — ochish, keyin — yopish. Xato bo'lsa rollback qilib, xatoni qayta ko'taraman — aks holda klient 200 oladi, ma'lumot esa saqlanmagan bo'ladi."

**Esda tuting:** `yield`li dependency'ning yopilish kodi standart holatda javob **yuborilgandan keyin** ishlaydi (`scope="request"`). Ulanishni tezroq qaytarish kerak bo'lsa — `Depends(get_db, scope="function")`, u endpoint funksiyasi tugashi bilan yopiladi. Manba: [Dependencies with yield](https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/).

## Q4. Unit testlar haqiqiy production bazasiga ulanib ketyapti — nima qilasiz? / Unit tests are connecting to the real production database — what do you do?

**Oddiy qilib aytganda:** test endpoint'ni chaqirganda, u `get_db` dependency orqali haqiqiy bazaga boradi. FastAPI'da testda istalgan dependency'ni **almashtirib qo'yish** mumkin: "`get_db` so'ralsa, buning o'rniga test bazasini ber".

**Yechim:**

```python
import pytest
from fastapi.testclient import TestClient

async def override_get_db():
    async with TestSessionLocal() as session:    # alohida test bazasi (masalan, konteynerdagi PostgreSQL)
        yield session
        await session.rollback()                  # har test toza holatdan boshlansin

@pytest.fixture
def client():
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()              # boshqa testlarga ta'sir qilmasin

def test_create_order(client):
    assert client.post("/orders", json={"item": "book"}).status_code == 201
```

**Qanday tekshirasiz:** CI muhitida production `DATABASE_URL` umuman bo'lmasin — test ishlashi kerak. Testlarni ixtiyoriy tartibda ishga tushiring (`pytest -p random_order`) — natija o'zgarmasligi kerak.

**Intervyuda shunday ayting:** "`app.dependency_overrides` bilan bazani, tashqi API'larni va hatto autentifikatsiyani testda almashtiraman. Fixture oxirida `clear()` qilaman — aks holda almashtirish keyingi testlarga oqib o'tadi."

**Esda tuting:** eng xavfsiz himoya — CI'da production sirlari **yo'q** bo'lishi. Test "adashib" ham ulana olmasin. Manba: [Testing Dependencies with Overrides](https://fastapi.tiangolo.com/advanced/testing-dependencies/).

## Q5. async endpoint ichida sinxron SDK chaqirilib, butun server "qotib" qolyapti — nega? / A sync SDK called inside an async endpoint freezes the whole server — why?

**Oddiy qilib aytganda:** `async def` endpoint'lar **bitta** event loop'da navbat bilan ishlaydi — xuddi bitta kassir hammani navbat bilan xizmat qilgandek. `await` — "men kutyapman, keyingisiga o'ting" degan belgi. Sinxron SDK (`requests.get`, `boto3`, `time.sleep`) esa `await` qilmaydi — kassir bitta mijoz bilan 3 soniya qotib turadi va **boshqa hech kim** xizmat olmaydi.

**Yechim:**

```python
# ❌ event loop 3 soniya band
@app.get("/report")
async def report():
    return legacy_sdk.fetch_report()             # sinxron, bloklovchi

# ✅ 1-variant: oddiy def — FastAPI uni alohida thread pool'da ishga tushiradi
@app.get("/report")
def report():
    return legacy_sdk.fetch_report()

# ✅ 2-variant: async ichida bitta bloklovchi chaqiruvni thread'ga chiqarish
from starlette.concurrency import run_in_threadpool

@app.get("/report")
async def report():
    data = await run_in_threadpool(legacy_sdk.fetch_report)
    return await enrich(data)                     # qolgan qismi async
```

**Qanday tekshirasiz:** sekin endpoint'ni chaqirib, bir vaqtda `/health` ni so'rang — `/health` darhol javob berishi kerak, 3 soniya kutmasligi kerak.

**Intervyuda shunday ayting:** "Qoida: `async def` ichida faqat `await` qilinadigan kutubxonalar. Sinxron kutubxona bo'lsa — endpoint'ni oddiy `def` qilaman yoki chaqiruvni `run_in_threadpool` ga chiqaraman. Iloji bo'lsa async muqobilni tanlayman: `requests` o'rniga `httpx.AsyncClient`."

**Esda tuting:** thread pool ham cheklangan (standart holatda 40 ta) — og'ir CPU ishi uchun alohida process yoki navbat kerak. Manba: [Concurrency and async / await](https://fastapi.tiangolo.com/async/).

## Q6. Topilmagan mahsulot uchun API 200 va null qaytaryapti — nima qilasiz? / The API returns 200 with null for a missing product — what do you do?

**Oddiy qilib aytganda:** `200` — "hammasi yaxshi, mana natija" degani. Mahsulot yo'q bo'lsa-yu, `200 null` qaytarsangiz, klient "mahsulot bor, faqat bo'sh" deb o'ylaydi va keyinroq tushunarsiz joyda yiqiladi. To'g'risi — HTTP status orqali aniq aytish: `404 Not Found`.

**Yechim:**

```python
from fastapi import HTTPException, status

@app.get("/products/{product_id}", response_model=ProductOut)
async def get_product(product_id: int, db: Db):
    product = await db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product
```

**Qanday tekshirasiz:** yo'q ID uchun test: status `404`, body `{"detail": "Product not found"}`. OpenAPI hujjatida ham 404 javobi ko'rsatilsin (`responses={404: {...}}`).

**Intervyuda shunday ayting:** "Holatni body bilan emas, status kod bilan bildiraman: yo'q — 404, ruxsat yo'q — 403, noto'g'ri kirish — 422. `detail` ga ichki ma'lumot — SQL, stack trace, fayl yo'li — qo'ymayman."

**Esda tuting:** ro'yxat bo'sh bo'lsa — bu `404` emas, `200 []`. "Resurs yo'q" va "natija bo'sh" — turli narsalar. Manba: [Handling Errors](https://fastapi.tiangolo.com/tutorial/handling-errors/).

## Q7. /users javobida hashed_password ham chiqib ketyapti — nima qilasiz? / The /users response leaks hashed_password — what do you do?

**Oddiy qilib aytganda:** endpoint bazadagi **butun** foydalanuvchi obyektini qaytargan. Yechim: "javobda faqat shu maydonlar bo'ladi" degan alohida **chiqish modeli** yozish. FastAPI javobni shu model orqali filtrlaydi — ro'yxatda yo'q maydon chiqmaydi.

**Yechim:**

```python
class UserOut(BaseModel):                 # faqat ommaviy maydonlar
    model_config = ConfigDict(from_attributes=True)   # ORM obyektidan o'qish
    id: int
    name: str
    email: str

@app.get("/users/{user_id}")
async def get_user(user_id: int, db: Db) -> UserOut:    # qaytish tipi = javob modeli
    return await db.get(User, user_id)                  # ORM'da hashed_password bor, javobda yo'q
```

**Qanday tekshirasiz:** test: `"hashed_password" not in response.json()`. OpenAPI sxemasida ham `UserOut` da bu maydon ko'rinmasligi kerak.

**Intervyuda shunday ayting:** "Kirish va chiqish uchun alohida modellar: `UserCreate` (parol bor), `UserOut` (parol yo'q). Qaytish tipi yoki `response_model` javobni ruxsat ro'yxati bilan filtrlaydi — ORM modeliga yangi maxfiy maydon qo'shilsa ham, u javobga chiqmaydi."

**Esda tuting:** 0.130 dan qaytish tipi yoki `response_model` e'lon qilinsa, JSON Pydantic orqali Rust'da serializatsiya qilinadi — bu xavfsizroq va tezroq. Manba: [Response Model](https://fastapi.tiangolo.com/tutorial/response-model/).

## Q8. Ro'yxatdan o'tishda email yuborish javobni 4 soniyaga kechiktiryapti — nima qilasiz? / Sending an email on signup delays the response by 4 seconds — what do you do?

**Oddiy qilib aytganda:** foydalanuvchi "hisob yaratildi" javobini olishi uchun email yuborilishini kutishi shart emas. Javobni darhol qaytarib, emailni **keyin** yuborish kerak. Kichik ish uchun — FastAPI `BackgroundTasks`; muhim, qayta urinish kerak bo'lgan ish uchun — navbat (Celery, RQ, arq).

**Yechim:**

```python
from fastapi import BackgroundTasks

@app.post("/signup", status_code=201)
async def signup(data: SignupIn, background: BackgroundTasks, db: Db):
    user = await users.create(db, data)
    background.add_task(send_welcome_email, user.email)   # javobdan KEYIN ishlaydi
    return {"id": user.id}
```

**Qanday tekshirasiz:** `/signup` javob vaqti email serveridan qat'i nazar tez bo'lishi kerak. Email xizmatini o'chirib qo'ying — ro'yxatdan o'tish baribir ishlashi kerak.

**Intervyuda shunday ayting:** "`BackgroundTasks` shu jarayon ichida, javobdan keyin ishlaydi — xotirada, qayta urinishsiz. Server qayta ishga tushsa, vazifa yo'qoladi. Shuning uchun xush kelibsiz xati uchun u yetarli, to'lov cheki yoki parolni tiklash xati uchun esa — navbat va qayta urinish."

**Esda tuting:** background vazifaga so'rovning baza sessiyasini bermang — u yopilgan bo'lishi mumkin. Vazifa o'zi yangi sessiya ochsin. Manba: [Background Tasks](https://fastapi.tiangolo.com/tutorial/background-tasks/).

## Q9. React ilova (boshqa domen) API'ga so'rov yuborganda brauzer CORS xatosi beryapti — nima qilasiz? / A React app on another domain gets CORS errors calling the API — what do you do?

**Oddiy qilib aytganda:** brauzer xavfsizlik uchun bir saytdagi JS'ga **boshqa** domendagi API javobini o'qishni taqiqlaydi — agar API "bu saytga ruxsat beraman" demasa. CORS — API'ning shu ruxsatni bildiradigan sarlavhalari. Postman'da ishlaydi, chunki bu qoida faqat **brauzerda**.

**Yechim:**

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://app.example.com"],    # aniq domenlar ro'yxati
    allow_credentials=True,                       # cookie yuborilsa
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
```

**Qanday tekshirasiz:** DevTools → Network: `OPTIONS` (preflight) so'rovi `200` va javobda `access-control-allow-origin: https://app.example.com`. Boshqa domendan so'rov — ruxsat sarlavhasisiz.

**Intervyuda shunday ayting:** "Ruxsat etilgan origin'larni aniq sanab beraman. `allow_credentials=True` bilan `*` birga ishlamaydi va bu to'g'ri — aks holda istalgan sayt foydalanuvchi cookie'si bilan API'ni chaqirar edi. CORS — bu autentifikatsiya emas: u faqat brauzerni cheklaydi, `curl` ni emas."

**Esda tuting:** frontend va API'ni bitta domenda (`/api` yo'li orqali) bersangiz — CORS umuman kerak emas. Manba: [CORS](https://fastapi.tiangolo.com/tutorial/cors/).

## Q10. ML modeli har so'rovda qayta yuklanyapti va server to'xtaganda resurslar yopilmayapti — nima qilasiz? / An ML model reloads on every request and resources aren't released on shutdown — what do you do?

**Oddiy qilib aytganda:** og'ir narsalarni (ML modeli, HTTP klient, baza pool'i) **bir marta** — server ishga tushganda — yuklash va server to'xtaganda **bir marta** yopish kerak. FastAPI'da buning joyi — **lifespan**: `yield` dan oldin — ishga tushish, keyin — to'xtash.

**Yechim:**

```python
from contextlib import asynccontextmanager
import httpx

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = load_model("model.onnx")          # bir marta, ~5 soniya
    app.state.http = httpx.AsyncClient(timeout=5)
    yield                                                # ilova ishlayapti
    await app.state.http.aclose()                        # to'xtashda tozalash
    app.state.model = None

app = FastAPI(lifespan=lifespan)

@app.post("/predict")
async def predict(data: Features, request: Request):
    return {"score": request.app.state.model.predict(data)}
```

**Qanday tekshirasiz:** log'da "model yuklandi" faqat **bir marta** chiqsin. `SIGTERM` yuborganda "klient yopildi" log'i chiqib, jarayon tez tugashi kerak.

**Intervyuda shunday ayting:** "Ishga tushish va to'xtashni lifespan'da juftlayman — ochilgan narsa shu yerning o'zida yopiladi. Eski `@app.on_event('startup')` o'rniga lifespan ishlataman. Kubernetes'da readiness model yuklanib bo'lgandan keyingina 'tayyor' desin."

**Esda tuting:** har worker process (masalan, `--workers 4`) modelni **o'zi** yuklaydi — xotira 4 barobar. Buni hisobga oling. Manba: [Lifespan Events](https://fastapi.tiangolo.com/advanced/events/).

## Q11. Fayl yuklash endpoint'i 1 GB faylni butunlay xotiraga olyapti — nima qilasiz? / The upload endpoint reads a 1 GB file fully into memory — what do you do?

**Oddiy qilib aytganda:** parametrni `file: bytes` deb yozsangiz, FastAPI butun faylni xotiraga oladi. `UploadFile` esa katta faylni vaqtinchalik **diskka** yozadi va uni **bo'lak-bo'lak** o'qish imkonini beradi. Qo'shimcha: hajmga chegara qo'yish shart.

**Yechim:**

```python
from fastapi import UploadFile, HTTPException

MAX_BYTES = 50 * 1024 * 1024        # 50 MB
CHUNK = 1024 * 1024                 # 1 MB bo'lak

@app.post("/upload")
async def upload(file: UploadFile):
    total = 0
    async with aiofiles.open(f"/data/{uuid4()}", "wb") as out:   # nomni o'zimiz beramiz
        while chunk := await file.read(CHUNK):
            total += len(chunk)
            if total > MAX_BYTES:
                raise HTTPException(413, "File too large")
            await out.write(chunk)
    return {"size": total}
```

**Qanday tekshirasiz:** 1 GB fayl yuklanganda jarayon xotirasi fayl hajmicha o'smasligi kerak; 60 MB fayl `413` bilan rad etilishi kerak.

**Intervyuda shunday ayting:** "Katta fayl uchun `bytes` emas, `UploadFile` va bo'lak-bo'lak o'qish. Hajm chegarasini reverse proxy'da ham qo'yaman (`client_max_body_size`) — katta so'rov ilovaga yetmasdan to'xtaydi. Juda katta fayllar uchun klient S3'ga presigned URL orqali to'g'ridan-to'g'ri yuklaydi."

**Esda tuting:** klient yuborgan fayl nomini diskdagi yo'l sifatida ishlatmang — `../../etc/passwd` kabi hujumga yo'l ochadi. Manba: [Request Files](https://fastapi.tiangolo.com/tutorial/request-files/).

## Q12. Foydalanuvchi WebSocket'dan uzilganda log'lar xato bilan to'lib ketyapti — nima qilasiz? / When a user disconnects from the WebSocket, logs fill with errors — what do you do?

**Oddiy qilib aytganda:** foydalanuvchi tabni yopsa — bu **normal** holat, xato emas. Lekin kod uni ushlamasa, `while True` ichidagi `receive_text()` istisno tashlaydi va log'da qo'rqinchli stack trace chiqadi. Bundan tashqari, uzilgan ulanish "tirik"lar ro'yxatida qolib, unga xabar yuborish ham xato beradi.

**Yechim:**

```python
from fastapi import WebSocket, WebSocketDisconnect

class ConnectionManager:
    def __init__(self) -> None:
        self.active: set[WebSocket] = set()

    async def connect(self, ws: WebSocket) -> None:
        await ws.accept()
        self.active.add(ws)

    def disconnect(self, ws: WebSocket) -> None:
        self.active.discard(ws)

manager = ConnectionManager()

@app.websocket("/ws/chat")
async def chat(ws: WebSocket):
    await manager.connect(ws)
    try:
        while True:
            text = await ws.receive_text()
            for peer in list(manager.active):
                await peer.send_text(text)
    except WebSocketDisconnect:
        pass                                       # normal holat — log'da xato emas
    finally:
        manager.disconnect(ws)                     # har qanday holatda ro'yxatdan o'chirish
```

**Qanday tekshirasiz:** testda ulanib, ulanishni yoping — log'da stack trace bo'lmasligi va `manager.active` bo'sh bo'lishi kerak.

**Intervyuda shunday ayting:** "`WebSocketDisconnect` — kutilgan hodisa, uni ushlab, `finally` da ulanishni ro'yxatdan o'chiraman. Bir nechta server bo'lsa, xotiradagi ro'yxat yetmaydi — xabarlarni Redis Pub/Sub orqali tarqataman."

**Esda tuting:** WebSocket'da ham autentifikatsiya kerak — `accept()` dan oldin token'ni tekshiring. Manba: [WebSockets](https://fastapi.tiangolo.com/advanced/websockets/).

## Q13. Middleware qo'shilgach, stream qilinadigan javoblar (SSE, katta CSV) birdaniga keladigan bo'lib qoldi — nega? / After adding a middleware, streamed responses (SSE, big CSV) arrive all at once — why?

**Oddiy qilib aytganda:** middleware javob **body'sini o'qib** (masalan, log uchun yoki o'zgartirish uchun) keyin qaytaryapti. Body'ni o'qish uchun u oqimning **oxirigacha** kutadi — natijada bo'lak-bo'lak kelishi kerak bo'lgan javob bitta katta bo'lak bo'lib qoladi, xotira ham oshadi. Yechim: middleware faqat sarlavhalar va vaqt bilan ishlasin, body'ga tegmasin.

**Yechim:**

```python
import time

@app.middleware("http")
async def timing(request: Request, call_next):
    started = time.perf_counter()
    response = await call_next(request)        # body oqimiga tegmaymiz
    response.headers["Server-Timing"] = f"app;dur={(time.perf_counter() - started) * 1000:.0f}"
    return response
```

```python
# Oqim endpoint'i (FastAPI 0.135+): Server-Sent Events
from collections.abc import AsyncIterable
from fastapi.sse import EventSourceResponse

@app.get("/progress", response_class=EventSourceResponse)
async def progress() -> AsyncIterable[Step]:
    async for step in run_job():
        yield step                             # har biri darhol klientga ketadi
```

**Qanday tekshirasiz:** `curl -N http://localhost:8000/progress` — hodisalar birma-bir, kechikishsiz ko'rinishi kerak (hammasi oxirida emas).

**Intervyuda shunday ayting:** "Middleware — kesib o'tuvchi, yengil ishlar uchun: sarlavha, vaqt, request ID. Body'ni o'zgartirish kerak bo'lsa — endpoint yoki javob qatlamida. Body'ni o'qiydigan middleware stream'ni buferlaydi va SSE'ni buzadi."

**Esda tuting:** reverse proxy (nginx) ham javobni buferlashi mumkin — SSE uchun `X-Accel-Buffering: no` yoki `proxy_buffering off`. Manba: [Middleware](https://fastapi.tiangolo.com/tutorial/middleware/), [Server-Sent Events](https://fastapi.tiangolo.com/tutorial/server-sent-events/).

## Q14. PATCH bilan faqat ismni o'zgartirganda boshqa maydonlar standart qiymatga qaytib ketyapti — nega? / A PATCH that only changes the name resets other fields to defaults — why?

**Oddiy qilib aytganda:** PATCH — "faqat yuborganimni o'zgartir" degani. Lekin Pydantic modeli yubormagan maydonlarni **standart qiymat** bilan to'ldiradi (`bio=None`), kod esa hammasini bazaga yozadi — foydalanuvchining bio'si o'chib ketadi. Yechim: faqat klient **haqiqatan yuborgan** maydonlarni olish.

**Yechim:**

```python
class ProfilePatch(BaseModel):
    name: str | None = None
    bio: str | None = None
    city: str | None = None

@app.patch("/profile")
async def update_profile(patch: ProfilePatch, user: CurrentUser, db: Db):
    changes = patch.model_dump(exclude_unset=True)    # {"name": "Ali"} — faqat yuborilgani
    for field, value in changes.items():
        setattr(user, field, value)
    return UserOut.model_validate(user)
```

**Qanday tekshirasiz:** `bio` si bor foydalanuvchiga `{"name": "Ali"}` PATCH qiling — `bio` o'zgarmasligi kerak. `{"bio": null}` yuborsangiz esa — `bio` tozalanishi kerak (bu ataylab yuborilgan).

**Intervyuda shunday ayting:** "`exclude_unset=True` 'yuborilmagan' va 'ataylab null yuborilgan'ni farqlaydi. Birinchisini o'tkazib yuboraman, ikkinchisini qo'llayman. Bu PATCH semantikasining asosi."

**Esda tuting:** `exclude_none=True` bu ishni **qilmaydi** — u ataylab yuborilgan `null` ni ham tashlab yuboradi va maydonni tozalab bo'lmay qoladi. Manba: [Body - Updates](https://fastapi.tiangolo.com/tutorial/body-updates/).

## Q15. Async baza kodini TestClient bilan test qilganda "event loop is closed" xatosi chiqyapti — nima qilasiz? / Testing async DB code with TestClient throws "event loop is closed" — what do you do?

**Oddiy qilib aytganda:** `TestClient` sinxron — u ilovani o'zining alohida event loop'ida ishga tushiradi. Test ichida esa siz ham `await` bilan async baza funksiyasini chaqiryapsiz — ikki xil loop, ikki xil "dunyo", ulanishlar ular orasida aralashib ketadi. Yechim: testning o'zini ham async qilish va `httpx.AsyncClient` ishlatish.

**Yechim:**

```python
import pytest
from httpx import ASGITransport, AsyncClient

@pytest.mark.anyio
async def test_create_and_read_order():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        created = await client.post("/orders", json={"item": "book"})
        assert created.status_code == 201

    # endi baza bilan to'g'ridan-to'g'ri, xuddi shu loop'da
    async with TestSessionLocal() as session:
        assert await session.get(Order, created.json()["id"]) is not None
```

**Qanday tekshirasiz:** test to'plamini to'liq ishga tushiring — "attached to a different loop" yoki "event loop is closed" ogohlantirishlari bo'lmasligi kerak.

**Intervyuda shunday ayting:** "Faqat HTTP'ni tekshirsam — `TestClient` yetarli. Test ichida async kod ham kerak bo'lsa — butun test async: `pytest.mark.anyio` va `ASGITransport` bilan `AsyncClient`. Shunda ilova va test bitta loop'da."

**Esda tuting:** `ASGITransport` lifespan hodisalarini ishga tushirmaydi — lifespan kerak bo'lsa, `asgi-lifespan` paketidagi `LifespanManager` bilan o'rang. Manba: [Async Tests](https://fastapi.tiangolo.com/advanced/async-tests/).

## Q16. Token'siz so'rov 403 qaytaryapti va klient qayta login qilishni bilmayapti — nima qilasiz? / A request without a token returns 403 and the client doesn't know to log in again — what do you do?

**Oddiy qilib aytganda:** ikki xil holat bor. **401** — "siz kimligingizni bilmayman, login qiling" (token yo'q yoki eskirgan). **403** — "sizni taniyman, lekin bunga ruxsatingiz yo'q". Klient 401 ni ko'rib, token'ni yangilaydi yoki login sahifasiga yuboradi; 403 da esa — yo'q. Status noto'g'ri bo'lsa, klient noto'g'ri harakat qiladi.

**Yechim:**

```python
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")   # token yo'q → 401 + WWW-Authenticate: Bearer

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> User:
    user = await verify_token(token)
    if user is None:                                  # token yaroqsiz/eskirgan → 401
        raise HTTPException(401, "Invalid or expired token", headers={"WWW-Authenticate": "Bearer"})
    return user

def require_admin(user: CurrentUser) -> User:
    if not user.is_admin:                             # taniymiz, lekin ruxsat yo'q → 403
        raise HTTPException(403, "Admin only")
    return user
```

**Qanday tekshirasiz:** token'siz → `401` va `WWW-Authenticate: Bearer` sarlavhasi; eskirgan token → `401`; oddiy foydalanuvchi admin endpoint'da → `403`.

**Intervyuda shunday ayting:** "401 — autentifikatsiya muammosi, 403 — avtorizatsiya muammosi. 401 bilan `WWW-Authenticate` sarlavhasini qaytaraman — standart shuni talab qiladi va klient kutubxonalari token yangilashni shu orqali boshlaydi."

**Esda tuting:** 403 yoki 404? Resurs borligini ham oshkor qilmaslik kerak bo'lsa (masalan, boshqa odamning buyurtmasi) — 404 qaytaring. Manba: [Security - First Steps](https://fastapi.tiangolo.com/tutorial/security/first-steps/).

## Q17. FastAPI yangilangach, eski IoT qurilmalar yuborgan JSON "Field required" xatosini beryapti — nega? / After a FastAPI upgrade, JSON from old IoT devices fails with "Field required" — why?

**Oddiy qilib aytganda:** eski qurilmalar JSON yuboradi, lekin `Content-Type: application/json` sarlavhasini **qo'ymaydi**. FastAPI 0.132 dan boshlab bunday body standart holatda JSON sifatida o'qilmaydi — body "yo'q" hisoblanadi va majburiy maydonlar uchun validatsiya xatosi chiqadi. Bu ataylab qilingan xavfsizlik o'zgarishi: brauzer `Content-Type` siz so'rovni CORS preflight'siz yubora oladi va bu lokal, autentifikatsiyasiz ilovalarga CSRF hujumiga yo'l ochadi.

**Yechim:**

```python
# ✅ 1-variant (eng yaxshisi): klientlar to'g'ri sarlavha yuborsin
#    Content-Type: application/json

# ✅ 2-variant: faqat eski klientlar uchun alohida router'da tekshiruvni o'chirish
legacy = APIRouter(prefix="/legacy", strict_content_type=False)

# ⚠️ Butun ilova uchun o'chirish — faqat hamma endpoint autentifikatsiyali bo'lsa
app = FastAPI(strict_content_type=False)
```

**Qanday tekshirasiz:** `curl -d '{"temp": 21}' http://localhost:8000/readings` (sarlavhasiz) → xato; `-H 'Content-Type: application/json'` bilan → muvaffaqiyat. Eski qurilma yo'li alohida test bilan qoplansin.

**Intervyuda shunday ayting:** "0.132 dagi qat'iy Content-Type tekshiruvi — preflight'siz CSRF'dan himoya. Uni butunlay o'chirmayman: eski klientlarni alohida router'ga ajrataman va u yerda autentifikatsiya borligiga ishonch hosil qilaman. Har major yangilanishdan oldin release notes'dagi 'Breaking Changes' bo'limini o'qiyman."

**Esda tuting:** kutubxonani yangilash ham kod o'zgarishi — uni contract testlar bilan tekshiring. Manba: [Strict Content-Type Checking](https://fastapi.tiangolo.com/advanced/strict-content-type/), [Release Notes](https://fastapi.tiangolo.com/release-notes/).

## Q18. /products?limit=1000000 so'rovi bazani va serverni qotiryapti — nima qilasiz? / /products?limit=1000000 freezes the database and server — what do you do?

**Oddiy qilib aytganda:** klient qancha qator so'rasa, shuncha berilyapti. Bir so'rov million qatorni xotiraga yuklab, JSON'ga aylantiradi — server qotadi. Yechim: `limit` ga **yuqori chegara** qo'yish — chegaradan oshsa FastAPI o'zi 422 qaytaradi.

**Yechim:**

```python
from typing import Annotated
from fastapi import Query

@app.get("/products")
async def list_products(
    db: Db,
    limit: Annotated[int, Query(ge=1, le=100)] = 20,
    after_id: Annotated[int | None, Query(ge=1)] = None,       # keyset pagination
):
    stmt = select(Product).order_by(Product.id).limit(limit)
    if after_id is not None:
        stmt = stmt.where(Product.id > after_id)
    rows = (await db.scalars(stmt)).all()
    return {"items": rows, "next_after_id": rows[-1].id if rows else None}
```

**Qanday tekshirasiz:** `limit=101` → `422`; `limit=0` → `422`; `limit` berilmasa → 20 ta qator va `next_after_id`.

**Intervyuda shunday ayting:** "Har ro'yxat endpoint'ida standart va maksimal limit bor — `Query(ge=1, le=100)`. Katta jadvallarda `OFFSET` o'rniga keyset (`WHERE id > ...`) pagination — u oxirgi sahifalarda ham tez."

**Esda tuting:** chegarasiz eksport kerak bo'lsa — alohida endpoint, stream (JSON Lines) yoki navbatdagi fon vazifasi. Manba: [Query Parameters and String Validations](https://fastapi.tiangolo.com/tutorial/query-params-str-validations/).

## Q19. nginx ortida redirect'lar http:// ga ketyapti va hamma so'rov proxy IP'sidan keldi deb ko'rinyapti — nima qilasiz? / Behind nginx, redirects go to http:// and every request looks like it came from the proxy IP — what do you do?

**Oddiy qilib aytganda:** foydalanuvchi `https://` bilan nginx'ga keldi, nginx esa ilovaga ichkarida oddiy `http://` bilan murojaat qildi. Ilova "meni http orqali chaqirishdi" deb o'ylaydi va redirect'larni `http://` ga yuboradi; klient IP'si o'rnida esa nginx IP'si turadi. Haqiqiy ma'lumot `X-Forwarded-*` sarlavhalarida bor — ilovaga **faqat ishonchli proxy'dan** kelgan shunday sarlavhalarga ishonishni aytish kerak.

**Yechim:**

```nginx
location / {
  proxy_pass http://127.0.0.1:8000;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

```bash
# Faqat proxy IP'sidan kelgan X-Forwarded-* ga ishon
fastapi run app/main.py --forwarded-allow-ips="127.0.0.1"
```

**Qanday tekshirasiz:** `request.url.scheme` → `https`, `request.client.host` → haqiqiy klient IP'si. Proxy'ni chetlab, to'g'ridan-to'g'ri `X-Forwarded-For: 1.2.3.4` yuborsangiz — unga ishonilmasligi kerak.

**Intervyuda shunday ayting:** "`X-Forwarded-*` sarlavhalarini istalgan klient soxtalashtira oladi, shuning uchun `--forwarded-allow-ips` da faqat o'z proxy'imni ko'rsataman. `*` qo'yish — faqat ilovaga tashqaridan to'g'ridan-to'g'ri kirib bo'lmasa xavfsiz."

**Esda tuting:** ilova `/api` kabi yo'l prefiksi ostida ishlasa, `--root-path /api` ham kerak — aks holda Swagger UI noto'g'ri manzilga murojaat qiladi. Manba: [Behind a Proxy](https://fastapi.tiangolo.com/advanced/behind-a-proxy/).

## Q20. Ommaviy API hujjatida ichki admin endpoint'lari ham ko'rinib turibdi — nima qilasiz? / Internal admin endpoints show up in the public API docs — what do you do?

**Oddiy qilib aytganda:** FastAPI barcha endpoint'larni avtomatik ravishda `/docs` ga qo'shadi. Ichki endpoint'lar hujjatda ko'rinsa — hujumchiga "qayerni sinab ko'rish kerak" xaritasi tayyor. Yechim: ichki endpoint'larni hujjatdan yashirish **va** ularni haqiqiy himoya bilan yopish (yashirish — himoya emas!).

**Yechim:**

```python
# Ichki router — hujjatda yo'q va himoyalangan
admin = APIRouter(
    prefix="/internal",
    include_in_schema=False,
    dependencies=[Depends(require_admin)],
)

# Ommaviy router — teglar bilan tartiblangan
public = APIRouter(prefix="/v1", tags=["products"])

app.include_router(public)
app.include_router(admin)

# Production'da hujjatni butunlay o'chirish ham mumkin:
app = FastAPI(docs_url=None if settings.is_production else "/docs",
              openapi_url=None if settings.is_production else "/openapi.json")
```

**Qanday tekshirasiz:** `/openapi.json` da `/internal` yo'llari yo'qligini testda tekshiring. `/internal/*` ga token'siz so'rov → `401`.

**Intervyuda shunday ayting:** "`include_in_schema=False` faqat hujjatdan yashiradi — endpoint baribir ochiq. Shuning uchun ichki router'ga albatta autentifikatsiya dependency'si qo'yaman, iloji bo'lsa uni alohida ichki portda yoki tarmoqda ishga tushiraman."

**Esda tuting:** OpenAPI sxemasi klient kodini generatsiya qilish uchun ham ishlatiladi — ommaviy sxemani barqaror saqlang, ichki narsalarni aralashtirmang. Manba: [Path Operation Configuration](https://fastapi.tiangolo.com/tutorial/path-operation-configuration/), [Metadata and Docs URLs](https://fastapi.tiangolo.com/tutorial/metadata/).
