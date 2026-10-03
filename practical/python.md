# Python amaliy intervyu ssenariylari

> **Nima bu:** "loyihada shunday muammo chiqdi — nima qilasiz?" turidagi Python savollari. Til asoslari (tiplar, OOP, decorator, generator, context manager, asyncio asoslari) — `python/basics.md` va `python/oop.md` da; bu yerda faqat amaliy ssenariylar.
> **Har bir javob tartibi:** muammo oddiy tilda → yechim (kod bilan) → qanday tekshirasiz → intervyuda qanday aytasiz → esda tuting.
> **Versiya:** Python 3.14 (2025-yil 7-oktabr). Yangiliklar: free-threaded (GIL'siz) build rasman qo'llab-quvvatlanadi (PEP 779), `concurrent.futures.InterpreterPoolExecutor`, osilgan asyncio vazifalarini ko'rish uchun `python -m asyncio ps PID` / `pstree PID`, template string'lar `t"..."` (PEP 750), annotatsiyalar kechiktirib hisoblanadi (PEP 649). **Asosiy manba:** [docs.python.org](https://docs.python.org/3/).

---

# Ssenariylar

## Q1. Bitta tashqi API javob bermay qoldi va butun async servis osilib qoldi — nima qilasiz? / One external API stopped responding and the whole async service hung — what do you do?

**Oddiy qilib aytganda:** `await client.get(url)` — "javob kelguncha kutaman" degani. Timeout bo'lmasa, u **abadiy** kutishi mumkin. Bunday osilgan vazifalar to'planib, ulanishlarni va xotirani egallaydi. Yechim: har tashqi chaqiruvga **vaqt chegarasi** qo'yish.

**Yechim:**

```python
import asyncio
import httpx

async def fetch_rates(client: httpx.AsyncClient) -> dict:
    try:
        async with asyncio.timeout(3):             # 3 soniyadan keyin CancelledError → TimeoutError
            response = await client.get("https://rates.example.com/today")
            response.raise_for_status()
            return response.json()
    except TimeoutError:
        return CACHED_RATES                        # zaxira javob — butun servis to'xtamaydi

# HTTP klientning o'zida ham chegaralar
client = httpx.AsyncClient(timeout=httpx.Timeout(3.0, connect=1.0))
```

```bash
# Python 3.14: ishlab turgan jarayonda qaysi vazifalar osilganini ko'rish
python -m asyncio pstree 12345
```

**Qanday tekshirasiz:** testda tashqi API'ni 10 soniya javob bermaydigan soxta server bilan almashtiring — funksiya ~3 soniyada zaxira qiymat qaytarishi kerak.

**Intervyuda shunday ayting:** "Tarmoqqa chiqadigan har chaqiruvda timeout bo'ladi: klient darajasida va biznes amal darajasida `asyncio.timeout`. Muammo bo'lganda Python 3.14'dagi `python -m asyncio pstree` bilan aynan qaysi `await` da osilganini ko'raman."

**Esda tuting:** timeout'dan keyin qayta urinish — faqat exponential backoff bilan va faqat idempotent amallar uchun. Manba: [Timeouts](https://docs.python.org/3/library/asyncio-task.html#timeouts).

## Q2. PDF konvertatsiyasi async servisni qotiryapti — boshqa so'rovlar javob olmayapti — nima qilasiz? / PDF conversion freezes the async service and other requests get no response — what do you do?

**Oddiy qilib aytganda:** event loop — bitta ishchi, u navbat bilan hamma so'rovlarga xizmat qiladi. `await` bo'lgan joyda u boshqa ishga o'tadi. Lekin PDF konvertatsiyasi — **hisob-kitob** (CPU), unda `await` yo'q: ishchi 5 soniya shu bilan band va boshqa hech kim xizmat olmaydi. Yechim: og'ir hisobni **alohida jarayonga** berish.

**Yechim:**

```python
import asyncio
from concurrent.futures import ProcessPoolExecutor

process_pool = ProcessPoolExecutor(max_workers=4)   # ilova ishga tushganda bir marta

def convert_to_pdf(path: str) -> bytes:              # oddiy sinxron, CPU og'ir funksiya
    ...

async def handle_convert(path: str) -> bytes:
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(process_pool, convert_to_pdf, path)   # loop bo'sh qoladi
```

**Qanday tekshirasiz:** konvertatsiya ishlayotganda `/health` ni so'rang — u millisekundlarda javob berishi kerak. `asyncio` debug rejimi (`PYTHONASYNCIODEBUG=1`) 100 ms dan uzoq bloklovchi qadamlarni log'ga yozadi.

**Intervyuda shunday ayting:** "Kutish (I/O) — asyncio uchun, hisob (CPU) — alohida jarayon uchun. Thread yordam bermaydi, chunki oddiy CPython'da GIL bor. Python 3.14 da free-threaded build rasman qo'llab-quvvatlanadi, lekin u alohida build va kutubxonalar mosligini tekshirish kerak — hozircha jarayon yoki fon navbati ishonchliroq."

**Esda tuting:** jarayonlarga uzatiladigan argumentlar va natijalar pickle qilinadi — katta ma'lumotni emas, fayl yo'lini uzating. Manba: [loop.run_in_executor](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio.loop.run_in_executor).

## Q3. Parallel vazifalardan biri yiqildi, qolganlari esa bekorga ishlashda davom etyapti — nima qilasiz? / One of several parallel tasks failed but the others keep running for nothing — what do you do?

**Oddiy qilib aytganda:** uch vazifa birga ishlayapti — foydalanuvchi, buyurtmalar, to'lovlarni olish. Foydalanuvchi topilmadi — qolgan ikkitasining natijasi endi kerak emas, lekin ular ishlashda davom etib, resurs yeyapti. `TaskGroup` — "hammasi birga": bittasi yiqilsa, qolganlari avtomatik **bekor qilinadi**.

**Yechim:**

```python
import asyncio

async def load_dashboard(user_id: int) -> Dashboard:
    try:
        async with asyncio.TaskGroup() as tg:
            user = tg.create_task(get_user(user_id))
            orders = tg.create_task(get_orders(user_id))
            payments = tg.create_task(get_payments(user_id))
        # bu yerga faqat hammasi muvaffaqiyatli bo'lsa kelinadi
        return Dashboard(user.result(), orders.result(), payments.result())
    except* UserNotFound:                          # ExceptionGroup ichidan kerakli xatoni ajratish
        raise HTTPError(404)
```

**Qanday tekshirasiz:** testda `get_user` darhol xato bersin, `get_orders` esa 5 soniya uxlasin — funksiya 5 soniya kutmasdan, darhol tugashi va `get_orders` bekor qilingan bo'lishi kerak.

**Intervyuda shunday ayting:** "`asyncio.gather` o'rniga `TaskGroup` — structured concurrency: vazifalar blokdan tashqariga 'qochib' ketmaydi, bittasi yiqilsa qolganlari bekor qilinadi. Xatolar `ExceptionGroup` bo'lib keladi, ularni `except*` bilan turiga qarab ushlayman."

**Esda tuting:** `asyncio.create_task(...)` natijasini hech qayerda saqlamasangiz, vazifa kutilmaganda yo'qolishi va uning xatosi jimgina yutilishi mumkin. Manba: [Task Groups](https://docs.python.org/3/library/asyncio-task.html#task-groups).

## Q4. 3 GB CSV faylni o'qiganda jarayon xotirasi tugab, yiqilyapti — nima qilasiz? / Reading a 3 GB CSV exhausts memory and crashes the process — what do you do?

**Oddiy qilib aytganda:** `f.read()` yoki `list(reader)` — butun faylni birdaniga xotiraga oladi. Buning o'rniga faylni **qatorma-qator** o'qib, har qatorni darhol qayta ishlash kerak — xotirada bir vaqtda faqat bitta qator bo'ladi. Kitobni butunlay yodlab emas, sahifama-sahifa o'qigandek.

**Yechim:**

```python
import csv
from collections.abc import Iterator
from itertools import batched          # Python 3.12+

def read_orders(path: str) -> Iterator[dict[str, str]]:
    with open(path, newline="", encoding="utf-8") as file:
        yield from csv.DictReader(file)            # generator — bittadan beradi

def import_orders(path: str) -> None:
    for batch in batched(read_orders(path), 1000): # 1000 tadan bazaga yozish
        save_many(batch)
```

**Qanday tekshirasiz:** `tracemalloc` yoki `/usr/bin/time -v` bilan eng yuqori xotirani o'lchang — u fayl hajmiga emas, `batch` hajmiga bog'liq bo'lishi kerak (3 GB fayl uchun ham bir necha MB).

**Intervyuda shunday ayting:** "Katta ma'lumotni oqim bilan: `csv.DictReader` o'zi iterator, uni generator orqali uzataman va `itertools.batched` bilan bo'laklab yozaman. Xotira fayl hajmiga emas, bo'lak hajmiga bog'liq bo'ladi."

**Esda tuting:** `open(..., newline="")` — `csv` moduli uchun shart; aks holda qator ichidagi yangi qatorlar noto'g'ri o'qiladi. Manba: [csv](https://docs.python.org/3/library/csv.html), [itertools.batched](https://docs.python.org/3/library/itertools.html#itertools.batched).

## Q5. Testlar haqiqiy to'lov API'siga murojaat qilib, CI goh o'tadi, goh yiqiladi — nima qilasiz? / Tests call the real payment API and CI is flaky — what do you do?

**Oddiy qilib aytganda:** test tashqi internet xizmatiga bog'liq bo'lsa — u xizmat sekinlashsa yoki o'chsa, sizning testingiz ham yiqiladi (kodingizda xato bo'lmasa ham). Yechim: testda tashqi xizmatni **soxta** (mock) bilan almashtirish. Muhim nuqta: uni **ishlatilayotgan** joyda almashtirish kerak, e'lon qilingan joyda emas.

**Yechim:**

```python
# app/billing.py
from app.payments import charge          # nom billing moduliga import qilingan

def checkout(order):
    return charge(order.total)

# tests/test_billing.py
from unittest.mock import patch

def test_checkout_charges_total():
    with patch("app.billing.charge", autospec=True) as fake_charge:   # ✅ ishlatilgan joyda
        fake_charge.return_value = {"status": "ok"}
        checkout(Order(total=100))
        fake_charge.assert_called_once_with(100)
# ❌ patch("app.payments.charge") — billing allaqachon asl funksiyani import qilib olgan
```

**Qanday tekshirasiz:** tarmoqni o'chirib (yoki `pytest-socket` bilan tarmoqni taqiqlab) testlarni ishga tushiring — hammasi o'tishi kerak.

**Intervyuda shunday ayting:** "Tashqi xizmatni ishlatilgan modul nomi bo'yicha patch qilaman va `autospec=True` qo'yaman — shunda soxta funksiya asl imzoga mos keladi, noto'g'ri argument bilan chaqirilsa test yiqiladi. Haqiqiy xizmat bilan integratsiyani alohida, kamroq ishlaydigan test to'plamida tekshiraman."

**Esda tuting:** `autospec` siz mock har qanday chaqiruvni qabul qiladi — funksiya nomi o'zgarsa ham test "yashil" qoladi. Manba: [Where to patch](https://docs.python.org/3/library/unittest.mock.html#where-to-patch).

## Q6. Bitta obyektga qo'shilgan element boshqa obyektlarda ham paydo bo'lyapti — nega? / An item added to one object shows up in other objects too — why?

**Oddiy qilib aytganda:** `def __init__(self, tags=[])` — bu bo'sh ro'yxat funksiya **yaratilganda bir marta** yaratiladi va **barcha** chaqiruvlar uchun umumiy bo'ladi. Bir obyekt unga qo'shsa — hamma ko'radi. Xuddi hamma bir daftarga yozgandek.

**Yechim:**

```python
# ❌ bitta ro'yxat hamma uchun
class Config:
    def __init__(self, tags: list[str] = []):
        self.tags = tags

# ✅ None va ichkarida yangi ro'yxat
class Config:
    def __init__(self, tags: list[str] | None = None):
        self.tags = list(tags) if tags is not None else []

# ✅ dataclass'da — default_factory
from dataclasses import dataclass, field

@dataclass
class Config:
    tags: list[str] = field(default_factory=list)    # har obyektga yangi ro'yxat
```

**Qanday tekshirasiz:** `a = Config(); b = Config(); a.tags.append("x")` → `b.tags == []` bo'lishi kerak.

**Intervyuda shunday ayting:** "Standart qiymatlar funksiya yaratilganda bir marta hisoblanadi, shuning uchun o'zgaruvchan standart qiymat umumiy bo'lib qoladi. `None` + ichkarida yaratish yoki dataclass'da `default_factory`. Ruff/pylint bu xatoni avtomatik topadi (B006)."

**Esda tuting:** dataclass `list` ni to'g'ridan-to'g'ri standart qiymat qilishga yo'l qo'ymaydi va xato beradi — bu ataylab qilingan himoya. Manba: [dataclasses.field](https://docs.python.org/3/library/dataclasses.html#dataclasses.field), [Default Argument Values](https://docs.python.org/3/tutorial/controlflow.html#default-argument-values).

## Q7. Log'larda qaysi xato qaysi foydalanuvchi so'roviga tegishli ekanini bilib bo'lmayapti — nima qilasiz? / You can't tell which log line belongs to which user request — what do you do?

**Oddiy qilib aytganda:** yuzlab so'rov bir vaqtda ishlaydi va log qatorlari aralashib ketadi. Yechim: har so'rovga **noyob ID** berish va uni o'sha so'rov davomidagi **har bir** log qatoriga avtomatik qo'shish. Keyin xatoni ID bo'yicha qidirib, butun tarixni ko'rasiz.

**Yechim:**

```python
import logging
import uuid
from contextvars import ContextVar

request_id: ContextVar[str] = ContextVar("request_id", default="-")

class RequestIdFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        record.request_id = request_id.get()       # har yozuvga avtomatik qo'shiladi
        return True

handler = logging.StreamHandler()
handler.addFilter(RequestIdFilter())
handler.setFormatter(logging.Formatter("%(asctime)s %(levelname)s [%(request_id)s] %(message)s"))
logging.basicConfig(level=logging.INFO, handlers=[handler])

# Middleware'da, so'rov boshida:
request_id.set(incoming_header or uuid.uuid4().hex)
```

**Qanday tekshirasiz:** ikkita parallel so'rov yuboring — har biri log'da o'z ID'si bilan chiqishi, ID'lar aralashmasligi kerak.

**Intervyuda shunday ayting:** "Request ID'ni `ContextVar` da saqlayman — u har asyncio vazifasi va thread uchun alohida, shuning uchun parallel so'rovlar aralashmaydi. Filter uni har log yozuviga qo'shadi. ID'ni javob sarlavhasida ham qaytaraman — foydalanuvchi xato haqida xabar berganda shu ID bilan topaman."

**Esda tuting:** production'da log'ni JSON formatda yozing — qidiruv tizimlari maydonlarni oson ajratadi. Log'ga parol, token, karta raqamini yozmang. Manba: [Logging Cookbook — contextual information](https://docs.python.org/3/howto/logging-cookbook.html#adding-contextual-information-to-your-logging-output), [contextvars](https://docs.python.org/3/library/contextvars.html).

## Q8. Xato bo'lganda vaqtinchalik fayllar diskda qolib, disk to'lyapti — nima qilasiz? / Temporary files are left on disk after errors and the disk fills up — what do you do?

**Oddiy qilib aytganda:** kod vaqtinchalik fayl yaratadi va oxirida o'chiradi. Lekin o'rtada xato chiqsa — o'chirish qatoriga yetib bormaydi. Yechim: `with` bloki — undan qanday chiqilishidan qat'i nazar (oddiy yoki xato bilan), tozalash **albatta** bajariladi.

**Yechim:**

```python
import tempfile
from pathlib import Path

def build_report(data: list[Row]) -> bytes:
    with tempfile.TemporaryDirectory(prefix="report-") as tmp:   # blokdan chiqishda o'chiriladi
        workdir = Path(tmp)
        csv_path = workdir / "data.csv"
        write_csv(csv_path, data)
        pdf_path = render_pdf(csv_path, workdir)                  # xato bo'lsa ham tozalanadi
        return pdf_path.read_bytes()                              # blokdan chiqishdan OLDIN o'qiymiz
```

**Qanday tekshirasiz:** `render_pdf` ni ataylab xato beradigan qilib test yozing, keyin vaqtinchalik papkada `report-*` qolmaganini tekshiring.

**Intervyuda shunday ayting:** "Vaqtinchalik resurslarni context manager bilan yarataman — tozalash kafolatlangan. `TemporaryDirectory` ichida bir nechta fayl bo'lsa ham hammasi birga o'chiriladi. Natijani blokdan chiqmasdan o'qib olaman."

**Esda tuting:** `tempfile.mktemp()` ishlatmang — u faqat nom beradi, faylni yaratmaydi va poyga holatiga (race) yo'l ochadi. Manba: [tempfile.TemporaryDirectory](https://docs.python.org/3/library/tempfile.html#tempfile.TemporaryDirectory).

## Q9. API token'lar random moduli bilan yaratilgan — bu nega xavfli? / API tokens are generated with the random module — why is that dangerous?

**Oddiy qilib aytganda:** `random` — o'yinlar va simulyatsiyalar uchun. Uning natijalari **oldindan aytib bo'ladigan**: bir nechta qiymatni ko'rgan hujumchi keyingilarini hisoblab chiqishi mumkin. Parol, token, tiklash havolasi uchun — `secrets` moduli: u operatsion tizimning kriptografik tasodifiy manbasidan foydalanadi.

**Yechim:**

```python
import secrets
import hashlib

# ❌ oldindan aytib bo'ladigan
import random
token = "".join(random.choices("abcdef0123456789", k=32))

# ✅ kriptografik xavfsiz
token = secrets.token_urlsafe(32)                 # 32 bayt tasodif → ~43 belgili URL-xavfsiz satr
reset_code = f"{secrets.randbelow(1_000_000):06d}"   # 6 xonali kod

# Bazada token'ning o'zini emas, xeshini saqlang
token_hash = hashlib.sha256(token.encode()).hexdigest()
```

**Qanday tekshirasiz:** kod bazasida `random.` ning xavfsizlik bilan bog'liq ishlatilishini qidiring (`grep -rn "random\." --include=*.py`). Bandit linter buni avtomatik topadi (B311).

**Intervyuda shunday ayting:** "Xavfsizlik bilan bog'liq har qanday tasodifiy qiymat — `secrets` orqali. Token'ni bazada xesh sifatida saqlayman: baza sizib chiqsa ham, token'larning o'zi ishlatib bo'lmaydi."

**Esda tuting:** `random.seed()` ni hech qachon xavfsizlik uchun "kuchaytirish" deb o'ylamang — bu uni yanada oldindan aytib bo'ladigan qiladi. Manba: [secrets](https://docs.python.org/3/library/secrets.html).

## Q10. Webhook imzosi oddiy == bilan solishtirilyapti — bunda nima xavf bor? / A webhook signature is compared with plain == — what's the risk?

**Oddiy qilib aytganda:** `==` ikki satrni belgima-belgi solishtiradi va **birinchi farqda** to'xtaydi. Demak, birinchi belgisi to'g'ri imzo biroz **uzoqroq** tekshiriladi. Hujumchi minglab urinish bilan javob vaqtini o'lchab, imzoni belgima-belgi "topishi" mumkin (timing attack). `hmac.compare_digest` esa har doim bir xil vaqt sarflaydi.

**Yechim:**

```python
import hashlib
import hmac

def verify_webhook(body: bytes, received_signature: str, secret: bytes) -> bool:
    expected = hmac.new(secret, body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, received_signature)     # doimiy vaqtli solishtirish

# Endpoint'da
if not verify_webhook(await request.body(), request.headers.get("X-Signature", ""), WEBHOOK_SECRET):
    raise HTTPException(401)
```

**Qanday tekshirasiz:** to'g'ri imzo → qabul; bitta belgisi o'zgargan imzo → `401`; body'dagi bitta bayt o'zgarsa → `401`.

**Intervyuda shunday ayting:** "Imzoni xom body baytlari ustida hisoblayman — JSON'ni parse qilib qayta yozsam, baytlar o'zgaradi. Solishtirish — `hmac.compare_digest` bilan, doimiy vaqtda. Takroriy hujumdan himoya uchun imzoga vaqt belgisi kirishi va eski so'rovlar rad etilishi kerak."

**Esda tuting:** imzo tekshiruvi — body'ni ishlatishdan **oldin**. Manba: [hmac.compare_digest](https://docs.python.org/3/library/hmac.html#hmac.compare_digest).

## Q11. JSON'dagi pul summalari float'ga aylanib, hisobda tiyinlar yo'qolyapti — nima qilasiz? / Money amounts from JSON become floats and cents go missing — what do you do?

**Oddiy qilib aytganda:** kompyuter `float` sonlarni ikkilik sanoq tizimida saqlaydi va `0.1` ni **aniq** ifodalay olmaydi: `0.1 + 0.2 == 0.30000000000000004`. Minglab tranzaksiyada bu tiyinlar yig'ilib, hisob to'g'ri kelmay qoladi. Pul uchun — `Decimal` (o'nlik aniqlik) yoki summani **butun tiyinlarda** saqlash.

**Yechim:**

```python
import json
from decimal import Decimal, ROUND_HALF_UP

payload = json.loads('{"price": 19.99, "qty": 3}', parse_float=Decimal)   # float emas, Decimal
total = payload["price"] * payload["qty"]                                  # Decimal('59.97')

tax = (total * Decimal("0.12")).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

# Muqobil: butun sonlarda (tiyin)
price_cents = 1999
```

**Qanday tekshirasiz:** `sum([Decimal("0.1")] * 10) == Decimal("1.0")` → `True`. Float bilan xuddi shu → `False`.

**Intervyuda shunday ayting:** "Pul hech qachon float'da emas: JSON'ni `parse_float=Decimal` bilan o'qiyman, bazada `NUMERIC(12,2)`, yaxlitlash qoidasini (`ROUND_HALF_UP`) aniq yozaman. `Decimal` ni satrdan yarataman — `Decimal(0.1)` float xatosini ichiga olib kiradi."

**Esda tuting:** `Decimal("0.1")` ✅, `Decimal(0.1)` ❌ — ikkinchisi `0.1000000000000000055511151231257827...` bo'ladi. Manba: [json.loads](https://docs.python.org/3/library/json.html#json.loads), [decimal](https://docs.python.org/3/library/decimal.html).

## Q12. Sozlamalar nusxasini o'zgartirganda asl sozlamalar ham o'zgarib ketyapti — nega? / Changing a copy of the settings also changes the original — why?

**Oddiy qilib aytganda:** `dict.copy()` yoki `copy.copy()` — **yuza** nusxa: faqat tashqi lug'at yangi, ichidagi ro'yxat va lug'atlar esa **o'sha-o'sha** (ikki lug'at bir ichki ro'yxatni ko'rsatadi). Ichkarini o'zgartirsangiz — ikkalasida ham o'zgaradi. To'liq mustaqil nusxa uchun — `copy.deepcopy`.

**Yechim:**

```python
import copy

defaults = {"retries": 3, "hosts": ["a.example.com"]}

shallow = defaults.copy()
shallow["hosts"].append("b.example.com")
print(defaults["hosts"])        # ['a.example.com', 'b.example.com']  ❌ asl ham o'zgardi

deep = copy.deepcopy(defaults)
deep["hosts"].append("c.example.com")
print(defaults["hosts"])        # asl o'zgarmadi ✅
```

```python
# Ko'pincha undan ham yaxshisi — o'zgarmas tuzilma
from dataclasses import dataclass

@dataclass(frozen=True)
class Settings:
    retries: int
    hosts: tuple[str, ...]      # tuple — o'zgartirib bo'lmaydi
```

**Qanday tekshirasiz:** nusxaning ichki ro'yxatini o'zgartiring va `original is not copy_` hamda `original["hosts"] is not copy_["hosts"]` ekanini tekshiring.

**Intervyuda shunday ayting:** "Yuza nusxa faqat birinchi darajani yangilaydi. Ichki tuzilmalarni ham mustaqil qilish uchun `deepcopy`. Lekin eng ishonchlisi — sozlamalarni o'zgarmas qilish: `frozen` dataclass va `tuple` — shunda tasodifan o'zgartirib bo'lmaydi."

**Esda tuting:** `deepcopy` katta obyektlarda sekin — uni tez-tez chaqiriladigan joyda ishlatmang. Manba: [copy](https://docs.python.org/3/library/copy.html).

## Q13. ThreadPoolExecutor'dagi vazifa xato berdi, lekin hech qayerda ko'rinmadi va batch yarim bajarildi — nega? / A task in ThreadPoolExecutor failed silently and the batch half-completed — why?

**Oddiy qilib aytganda:** `executor.submit()` vazifani yuboradi va **Future** ("kelajakdagi natija" qutisi) qaytaradi. Vazifadagi xato shu qutiga solinadi va siz qutini **ochmaguningizcha** (`.result()`) hech qayerda chiqmaydi. Kod qutilarni ochmagan — xatolar jimgina yo'qolgan.

**Yechim:**

```python
from concurrent.futures import ThreadPoolExecutor, as_completed

def process_all(jobs: list[Job]) -> list[Result]:
    results, failures = [], []
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(run, job): job for job in jobs}
        for future in as_completed(futures):
            job = futures[future]
            try:
                results.append(future.result())      # xato bo'lsa — shu yerda ko'tariladi
            except Exception as error:
                failures.append((job.id, error))
                logger.exception("job %s failed", job.id)
    if failures:
        raise BatchError(failures)                   # yarim natija "muvaffaqiyat" bo'lib o'tmasin
    return results
```

**Qanday tekshirasiz:** 10 ta vazifadan bittasi xato bersin — funksiya `BatchError` ko'tarishi va log'da aynan qaysi vazifa ekani ko'rinishi kerak.

**Intervyuda shunday ayting:** "Future'dagi xato `.result()` chaqirilmaguncha ko'rinmaydi. Har future natijasini `as_completed` bilan yig'aman, xatolarni vazifa ID'si bilan log'ga yozaman va batch natijasini aniq qilaman: hammasi o'tdi yoki qaysilari yiqildi."

**Esda tuting:** `executor.map()` ham xatoni faqat natijalarni **o'qiganingizda** ko'taradi — natijasini tashlab yuborish xatoni ham tashlaydi. Manba: [concurrent.futures](https://docs.python.org/3/library/concurrent.futures.html).

## Q14. Production'da xotira asta-sekin o'syapti, lekin qayerdan ekanini bilmaysiz — nima qilasiz? / Memory slowly grows in production and you don't know where from — what do you do?

**Oddiy qilib aytganda:** taxmin qilmang — **ikki surat** oling: hozirgi xotira holati va bir muddatdan keyingisi. Ularni solishtirsangiz, qaysi kod qatori eng ko'p yangi xotira olgani ko'rinadi. Python'da buning uchun o'rnatilgan `tracemalloc` bor.

**Yechim:**

```python
import tracemalloc

tracemalloc.start(25)                          # 25 kadrli stack saqlanadi

before = tracemalloc.take_snapshot()
run_suspect_workload()                          # masalan, 1000 ta so'rov
after = tracemalloc.take_snapshot()

for stat in after.compare_to(before, "lineno")[:10]:
    print(stat)                                 # "app/cache.py:42: size=+48.2 MiB, count=+120000"
```

**Qanday tekshirasiz:** tuzatishdan keyin xuddi shu yuklamani 3 marta takrorlang — xotira har safar o'smasligi, barqaror bo'lishi kerak.

**Intervyuda shunday ayting:** "Staging'da `tracemalloc` suratlarini solishtiraman — eng ko'p o'sgan qatorlar ko'rinadi. Ko'p uchraydigan sabablar: cheklanmagan kesh yoki global lug'at, o'chirilmagan tinglovchilar, yopilmagan ulanishlar. Production'da jarayonni to'xtatmasdan kuzatish uchun `memray` yoki `py-spy` kabi vositalar ishlataman."

**Esda tuting:** `tracemalloc` ishlashni sekinlashtiradi — uni production'da doim yoqib qo'ymang. Manba: [tracemalloc](https://docs.python.org/3/library/tracemalloc.html).

## Q15. Plagin nomi konfiguratsiyadan keladi va kodda uzun if/elif zanjiri paydo bo'ldi — qanday soddalashtirasiz? / A plugin name comes from config and a long if/elif chain appeared — how do you simplify it?

**Oddiy qilib aytganda:** har yangi plagin uchun yangi `elif` — kod o'sib boradi va unutish oson. Yechim: **ro'yxat (registry)** — "nom → klass" lug'ati. Nom bo'yicha lug'atdan olasiz. Muhim: nom konfiguratsiyadan kelgani uchun, faqat **ruxsat etilgan** nomlar ishlashi kerak — istalgan modulni yuklab bo'lmasin.

**Yechim:**

```python
from typing import Protocol

class Exporter(Protocol):
    def export(self, rows: list[dict]) -> bytes: ...

EXPORTERS: dict[str, type[Exporter]] = {}

def register(name: str):
    def decorator(cls: type[Exporter]) -> type[Exporter]:
        EXPORTERS[name] = cls
        return cls
    return decorator

@register("csv")
class CsvExporter: ...

@register("xlsx")
class XlsxExporter: ...

def get_exporter(name: str) -> Exporter:
    try:
        return EXPORTERS[name]()
    except KeyError:
        raise ValueError(f"Unknown exporter {name!r}; choose from {sorted(EXPORTERS)}") from None
```

**Qanday tekshirasiz:** `get_exporter("csv")` ishlaydi; `get_exporter("os")` → ruxsat etilganlar ro'yxati bilan aniq `ValueError`.

**Intervyuda shunday ayting:** "if-zanjirini registry lug'atiga almashtiraman — yangi plagin faqat `@register` bilan qo'shiladi. Konfiguratsiyadagi nomni hech qachon to'g'ridan-to'g'ri `importlib.import_module` ga bermayman — bu istalgan kodni yuklashga yo'l ochadi. Tashqi paketlar plagin qo'shishi kerak bo'lsa — `importlib.metadata.entry_points`."

**Esda tuting:** registry lug'ati to'ldirilishi uchun plagin modullari import qilingan bo'lishi kerak — bu ko'p uchraydigan "nega plagin topilmadi?" sababi. Manba: [importlib.metadata — entry points](https://docs.python.org/3/library/importlib.metadata.html#entry-points).

## Q16. CLI noto'g'ri argumentda foydalanuvchiga uzun stack trace ko'rsatyapti — nima qilasiz? / The CLI shows a long stack trace on bad arguments — what do you do?

**Oddiy qilib aytganda:** foydalanuvchi `--mode aply` (harf xato) yozdi va 40 qatorli Python xatosini ko'rdi — nima noto'g'ri ekanini tushunmaydi. `argparse` ga ruxsat etilgan qiymatlar va turlarni aytsangiz, u o'zi tushunarli xabar chiqaradi va to'g'ri chiqish kodi bilan tugaydi.

**Yechim:**

```python
import argparse
from pathlib import Path

def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Buyurtmalarni import qilish")
    parser.add_argument("file", type=Path, help="CSV fayl yo'li")
    parser.add_argument("--mode", choices=["dry-run", "apply"], default="dry-run")
    parser.add_argument("--limit", type=int, default=1000)
    args = parser.parse_args(argv)          # xato → qisqa xabar + usage, exit code 2

    if not args.file.exists():
        parser.error(f"fayl topilmadi: {args.file}")
    return run_import(args.file, args.mode, args.limit)

if __name__ == "__main__":
    raise SystemExit(main())
```

**Qanday tekshirasiz:** `--mode aply` → `invalid choice: 'aply' (choose from dry-run, apply)` va chiqish kodi `2`; `--limit abc` → turi haqida aniq xabar.

**Intervyuda shunday ayting:** "Kirishni `argparse` da `type` va `choices` bilan cheklayman — xabar tushunarli, chiqish kodi to'g'ri (skriptlar uchun muhim). `main(argv)` ko'rinishi CLI'ni testda oddiy funksiya kabi chaqirish imkonini beradi. Xavfli amallar uchun standart rejim — `dry-run`."

**Esda tuting:** Python 3.14 da `argparse` yordam matni va xatolarni rangli chiqaradi, `suggest_on_error=True` esa harf xatosida to'g'ri variantni taklif qiladi. Manba: [argparse](https://docs.python.org/3/library/argparse.html).

## Q17. Fayl yo'llari satrlarni qo'shib yasalgan va Windows'da ishlamayapti — nima qilasiz? / File paths are built by string concatenation and break on Windows — what do you do?

**Oddiy qilib aytganda:** `root + "/reports/" + name` — Linux'da ishlaydi, Windows'da ajratuvchi boshqa. Qo'shimcha xavf: agar `name` foydalanuvchidan kelsa va `../../etc/passwd` bo'lsa — papkadan tashqariga chiqib ketadi. `pathlib.Path` ikkalasini ham hal qiladi.

**Yechim:**

```python
from pathlib import Path

REPORTS_ROOT = Path("/srv/app/reports").resolve()

def report_path(filename: str) -> Path:
    target = (REPORTS_ROOT / filename).resolve()          # "/" operatori — OS'ga mos ajratuvchi
    if not target.is_relative_to(REPORTS_ROOT):           # ../ bilan tashqariga chiqishni to'xtatish
        raise ValueError("path escapes reports directory")
    return target
```

**Qanday tekshirasiz:** `report_path("jan.pdf")` → papka ichida; `report_path("../../etc/passwd")` → `ValueError`. Testni Windows va Linux CI'da ishga tushiring.

**Intervyuda shunday ayting:** "Yo'llarni `pathlib` bilan quraman — ajratuvchi OS'ga mos. Foydalanuvchi bergan nomni `resolve()` qilib, asosiy papka ichida qolganini `is_relative_to` bilan tekshiraman — path traversal'dan himoya."

**Esda tuting:** `Path("/srv") / "/etc/passwd"` → `/etc/passwd` — ikkinchi qism absolyut bo'lsa, birinchisi tashlab yuboriladi. Shuning uchun `resolve` + tekshiruv shart. Manba: [pathlib](https://docs.python.org/3/library/pathlib.html).

## Q18. O'zingiz yozgan context manager xato bo'lganda ulanishni yopmayapti — nega? / Your own context manager doesn't close the connection on errors — why?

**Oddiy qilib aytganda:** `@contextmanager` bilan yozilgan funksiyada `yield` — bu `with` bloki ichidagi kod bajariladigan joy. Blokda xato bo'lsa, xato **aynan `yield` qatorida** ko'tariladi. Agar `yield` dan keyingi yopish kodi `finally` ichida bo'lmasa — u bajarilmaydi.

**Yechim:**

```python
from contextlib import contextmanager

# ❌ xatoda close() ga yetib bormaydi
@contextmanager
def connection():
    conn = pool.acquire()
    yield conn
    pool.release(conn)

# ✅ finally — har qanday holatda
@contextmanager
def connection():
    conn = pool.acquire()
    try:
        yield conn
    finally:
        pool.release(conn)
```

**Qanday tekshirasiz:** `with connection(): raise RuntimeError()` dan keyin pool'dagi bo'sh ulanishlar soni boshlang'ich qiymatga qaytishi kerak.

**Intervyuda shunday ayting:** "`@contextmanager` ichida `yield` ni doim `try/finally` ga o'rayman — `with` blokidagi xato aynan `yield` nuqtasida ko'tariladi. Bir nechta resurs uchun `contextlib.ExitStack` ishlataman — ular teskari tartibda, ishonchli yopiladi."

**Esda tuting:** xatoni `except` bilan ushlab, qayta ko'tarmasangiz — u yutib yuboriladi va chaqiruvchi hech narsa bilmaydi. Manba: [contextlib.contextmanager](https://docs.python.org/3/library/contextlib.html#contextlib.contextmanager).

## Q19. @lru_cache qo'yilgach, bir foydalanuvchi boshqasining ma'lumotini ko'ra boshladi — nega? / After adding @lru_cache, one user started seeing another user's data — why?

**Oddiy qilib aytganda:** `lru_cache` natijani **faqat argumentlar** bo'yicha eslab qoladi. Agar funksiya natijasi argumentda bo'lmagan narsaga — joriy foydalanuvchiga, vaqtga, bazadagi holatga — bog'liq bo'lsa, kesh birinchi foydalanuvchining natijasini hammaga beradi. Yana bir xavf: kesh **o'zgaruvchan** ro'yxat qaytarsa, uni o'zgartirgan kod keshdagi asl nusxani buzadi.

**Yechim:**

```python
from functools import lru_cache

# ❌ natija joriy foydalanuvchiga bog'liq, lekin u argumentda yo'q
@lru_cache
def dashboard() -> list[Widget]:
    return load_widgets(current_user().id)

# ✅ faqat sof (pure) funksiyani, cheklangan hajm bilan
@lru_cache(maxsize=1024)
def exchange_rate_table(currency: str, day: date) -> tuple[Rate, ...]:   # tuple — o'zgarmas
    return tuple(load_rates(currency, day))
```

**Qanday tekshirasiz:** ikki turli foydalanuvchi sifatida ketma-ket chaqiring — natijalar farq qilishi kerak. `exchange_rate_table.cache_info()` bilan kesh hajmi `maxsize` dan oshmasligini kuzating.

**Intervyuda shunday ayting:** "`lru_cache` — faqat natijasi to'liq argumentlarga bog'liq bo'lgan sof funksiyalar uchun. Natijani o'zgarmas qilaman (tuple, frozen dataclass), `maxsize` beraman — `@cache` cheksiz o'sadi. Foydalanuvchiga bog'liq yoki muddati o'tadigan ma'lumot uchun — TTL'li va kalitida foydalanuvchi ID'si bo'lgan kesh (masalan, Redis)."

**Esda tuting:** metodga `@lru_cache` qo'yish `self` ni ham kesh kalitiga qo'shadi — obyektlar xotiradan o'chmay qoladi. Manba: [functools.lru_cache](https://docs.python.org/3/library/functools.html#functools.lru_cache).

## Q20. Soat mintaqasiz datetime sababli yozgi vaqtga o'tishda buyurtma vaqtlari bir soatga siljidi — nima qilasiz? / Naive datetimes shifted order times by an hour at a DST change — what do you do?

**Oddiy qilib aytganda:** `datetime.now()` — "soat 14:00", lekin **qaysi shahar** vaqti ekani yozilmagan (naive). Server boshqa mintaqaga ko'chsa yoki yozgi vaqtga o'tilsa, bu vaqtlar noto'g'ri tushuniladi. Qoida: **saqlash va hisoblash — UTC'da, ko'rsatish — foydalanuvchi mintaqasida**.

**Yechim:**

```python
from datetime import datetime, UTC
from zoneinfo import ZoneInfo

created_at = datetime.now(UTC)                          # ✅ aware: 2026-09-25 09:00:00+00:00
# ❌ datetime.now()      — naive, mintaqa noma'lum
# ❌ datetime.utcnow()   — eskirgan (3.12+), naive qaytaradi

# Faqat foydalanuvchiga ko'rsatishda
local = created_at.astimezone(ZoneInfo("Asia/Tashkent"))     # 14:00+05:00
berlin = created_at.astimezone(ZoneInfo("Europe/Berlin"))    # yozgi/qishki vaqtni o'zi hisoblaydi
```

**Qanday tekshirasiz:** yozgi vaqtga o'tish kunidagi vaqtlar bilan test yozing (masalan, `Europe/Berlin` uchun mart oxiri) — UTC'dagi farq aniq 1 soat bo'lishi kerak. `created_at.tzinfo is not None` ni tekshiring.

**Intervyuda shunday ayting:** "Hamma vaqtni aware UTC'da saqlayman (PostgreSQL'da `timestamptz`), mintaqaga faqat ko'rsatishda `zoneinfo` bilan o'tkazaman. Qat'iy mintaqaga bog'liq narsalar — masalan, 'har kuni soat 9:00 da' — mintaqa nomi bilan saqlanadi, offset bilan emas: offset yozgi vaqtda o'zgaradi."

**Esda tuting:** naive va aware datetime'larni solishtirsangiz — `TypeError`. Bu yaxshi: xato yashirin qolmaydi. Manba: [Aware and Naive Objects](https://docs.python.org/3/library/datetime.html#aware-and-naive-objects), [zoneinfo](https://docs.python.org/3/library/zoneinfo.html).
