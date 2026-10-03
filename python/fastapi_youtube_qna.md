# FastAPI — YouTube intervyularidan qo'shimcha savollar

> **Nima bu:** YouTube'dagi FastAPI intervyularida beriladigan, lekin boshqa sahifalarda yo'q savollar. Takrorlanmasligi uchun asosiy mavzular (FastAPI nima, Flask/Django bilan farqi, Pydantic, async, dependency injection, middleware, lifespan, JWT, API kalitlar, CORS, fayl yuklash, background tasks, streaming, hujjatlashtirish, deployment) — `python/restfullapi.md` da; amaliy ssenariylar — `practical/fastapi.md` da.
> **Har bir javob tartibi:** oddiy tilda → batafsilroq (misol bilan) → intervyuda qanday aytasiz → esda tuting.

---

## Q1. Sub-application va `mount` nima uchun kerak? / What are sub-applications and `mount` for?

**Oddiy qilib aytganda:** `mount` — asosiy ilovaning bir yo'liga **butunlay alohida ilovani** ulash: `/admin` da mustaqil admin API (o'z hujjati va middleware'lari bilan), `/static` da fayllar, `/legacy` da eski Flask ilova. Router'dan farqi — mount qilingan ilova asosiy ilovaning dependency va middleware'larini olmaydi, u o'zicha yashaydi.

**Batafsilroq:**

```python
from fastapi import FastAPI
from fastapi.middleware.wsgi import WSGIMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()                                   # asosiy API: /docs
admin = FastAPI(title="Admin API")                # alohida hujjat: /admin/docs

@admin.get("/stats")
def stats(): ...

app.mount("/admin", admin)                        # mustaqil ASGI ilova
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/legacy", WSGIMiddleware(flask_app))   # eski WSGI ilovani asta ko'chirish
```

**Intervyuda shunday ayting:** "Bitta ilova ichidagi modullar uchun — `APIRouter` (umumiy dependency, middleware va bitta OpenAPI). Mustaqil hujjat, xavfsizlik yoki boshqa framework kerak bo'lsa — `mount`. Mount qilingan ilovaga asosiy ilovaning dependency'lari ta'sir qilmaydi — himoyani unda alohida qo'yaman."

**Esda tuting:** mount qilingan ilovada yo'llar prefiksga nisbatan bo'ladi va FastAPI `root_path` ni to'g'ri uzatadi — shuning uchun `/admin/docs` ishlaydi. Manba: [Sub Applications - Mounts](https://fastapi.tiangolo.com/advanced/sub-applications/).

## Q2. React/Vite frontend'ni FastAPI orqali qanday berish mumkin (`app.frontend()`)? / How do you serve a React/Vite frontend from FastAPI with `app.frontend()`?

**Oddiy qilib aytganda:** `npm run build` frontend'ni `dist/` papkasidagi tayyor fayllarga aylantiradi. FastAPI 0.138 dan boshlab ularni bitta qator bilan berish mumkin: `app.frontend("/", directory="dist")`. API yo'llari doim ustun turadi, `/dashboard/settings` kabi sahifa manzillariga esa avtomatik `index.html` beriladi — SPA'ni yangilaganda 404 bo'lmaydi.

**Batafsilroq:**

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/health")
def health():
    return {"status": "ok"}          # API marshrutlari doim birinchi tekshiriladi

app.frontend("/", directory="dist")  # fallback="auto": index.html (yoki 404.html bo'lsa u)
```

- Fallback faqat brauzer navigatsiyasi uchun (`GET`/`HEAD` va `Accept: text/html`); yo'q JS/CSS fayllar baribir `404` qaytaradi.
- `fastapi dev` da `dist/` hali yo'q bo'lsa — faqat ogohlantirish; boshqa muhitlarda ilova yaratilayotganda xato (0.141 dagi `check_dir="auto"`).
- App yoki router dependency'lari frontend javoblariga ham qo'llanadi — masalan, cookie autentifikatsiyasi bilan himoyalash.

**Intervyuda shunday ayting:** "Kichik loyihada frontend va API'ni bitta FastAPI jarayonidan berish CORS'ni yo'qotadi va deploy'ni soddalashtiradi: `app.frontend()` statik build'ni SPA fallback bilan beradi. Katta yuklamada esa statik fayllarni CDN yoki Nginx beradi — ular kesh va siqishni yaxshiroq qiladi, Python jarayoni faqat API bilan band bo'ladi."

**Esda tuting:** `app.frontend()` faqat tayyor statik build'ni beradi — server tomonida render (SSR) qilmaydi. Hash'li asset'larga uzoq muddatli `Cache-Control`, `index.html` ga esa `no-cache` kerak. Manba: [FastAPI — Frontend](https://fastapi.tiangolo.com/tutorial/frontend/).
