# Python — YouTube intervyularidan qo'shimcha savollar

> **Nima bu:** YouTube'dagi Python intervyularida tez-tez beriladigan, lekin boshqa sahifalarda yo'q savollar. Takrorlanmasligi uchun qolganlari boshqa joyda: tiplar, `is`/`==`, copy/deepcopy, decorator, generator, lambda, `*args`/`**kwargs`, dunder metodlar, `__new__`/`__init__`, istisnolar, `with`, iteratorlar, comprehension, GIL, thread/process, LEGB, monkey patching — `python/basics.md`; MRO va metod turlari — `python/oop.md`; o'zgaruvchan standart argument va xotira sizishi — `practical/python.md`; rekursiya va chuqurlik chegarasi — `dsa.md`.
> **Har bir javob tartibi:** oddiy tilda → batafsilroq (misol bilan) → intervyuda qanday aytasiz → esda tuting.

---

## Q1. PEP 8 nima va kod uslubini qanday avtomatik saqlaysiz? / What is PEP 8 and how do you enforce code style automatically?

**Oddiy qilib aytganda:** PEP 8 — Python kodini qanday yozish bo'yicha umumiy kelishuv: nomlar (`snake_case` funksiyalar, `PascalCase` klasslar), bo'sh joylar, qator uzunligi, importlar tartibi. Hamma bir xil uslubda yozsa, begona kodni o'qish o'z kodingizni o'qigandek oson bo'ladi.

**Batafsilroq:**

```python
# ❌
def CalcTotal( Items ):
    Result=0
    for i in Items : Result+=i.Price
    return Result

# ✅ PEP 8
def calc_total(items: list[Item]) -> Decimal:
    return sum((item.price for item in items), start=Decimal("0"))
```

```toml
# pyproject.toml — uslub va lint bitta tezkor vositada
[tool.ruff]
line-length = 100

[tool.ruff.lint]
select = ["E", "F", "I", "B", "UP"]   # pycodestyle, pyflakes, importlar, bugbear, pyupgrade
```

```bash
ruff format .      # formatlash
ruff check --fix . # lint + avtomatik tuzatish
```

**Intervyuda shunday ayting:** "Uslub haqida bahslashmayman — uni vositaga topshiraman: ruff (yoki black + isort + flake8) pre-commit va CI'da. Shunda kod ko'rigi uslubga emas, mantiqqa qaratiladi. PEP 8 — qo'llanma, dogma emas: jamoaning kelishuvi (masalan, qator uzunligi) `pyproject.toml` da yozilgan bo'ladi."

**Esda tuting:** PEP 20 ("The Zen of Python", `import this`) — PEP 8 ortidagi falsafa: "Readability counts". Manba: [PEP 8](https://peps.python.org/pep-0008/).

## Q2. Python'da argumentlar qiymat bo'yicha uzatiladimi yoki havola bo'yicha? / Are Python arguments passed by value or by reference?

**Oddiy qilib aytganda:** hech biri — Python'da **obyektga havola nusxasi** uzatiladi ("pass by object reference"). Funksiya ichida ro'yxatni **o'zgartirsangiz** (`append`), tashqaridagi ro'yxat ham o'zgaradi — chunki obyekt bitta. Lekin parametrga **yangi qiymat bersangiz** (`x = [...]`), bu faqat mahalliy nomni boshqa obyektga yo'naltiradi, tashqaridagi o'zgarmaydi.

**Batafsilroq:**

```python
def add_item(items: list[str]) -> None:
    items.append("yangi")        # obyektning o'zini o'zgartiradi → tashqarida ham ko'rinadi

def replace(items: list[str]) -> None:
    items = ["butunlay", "boshqa"]   # faqat mahalliy nom yangi obyektga ishora qiladi

cart = ["olma"]
add_item(cart);  print(cart)    # ['olma', 'yangi']
replace(cart);   print(cart)    # ['olma', 'yangi'] — o'zgarmadi

def increment(n: int) -> None:
    n += 1                       # int o'zgarmas → yangi obyekt yaratiladi, tashqarida ta'sir yo'q
```

**Intervyuda shunday ayting:** "Python 'call by sharing' modelida ishlaydi: funksiya obyektga havolani oladi. O'zgaruvchan obyektni joyida o'zgartirish chaqiruvchiga ko'rinadi, nomni qayta bog'lash esa yo'q. Kutilmagan yon ta'sirlardan qochish uchun funksiyalarda kiruvchi o'zgaruvchan argumentlarni o'zgartirmayman — yangi qiymat qaytaraman."

**Esda tuting:** o'zgaruvchan standart argument (`def f(items=[])`) ham xuddi shu sababli xavfli — batafsil `practical/python.md` Q6.

## Q3. `append` va `extend`, `remove`, `del` va `pop` farqi nima? / What is the difference between append and extend, and remove, del and pop?

**Oddiy qilib aytganda:** qo'shish: `append(x)` — bitta elementni (hatto u ro'yxat bo'lsa ham) **bitta** element sifatida qo'shadi; `extend(xs)` — ro'yxatning **har bir** elementini alohida qo'shadi. O'chirish: `remove(x)` — **qiymati** bo'yicha birinchisini; `del lst[i]` — **indeksi** bo'yicha; `pop(i)` — indeks bo'yicha o'chiradi va **qaytaradi**.

**Batafsilroq:**

```python
nums = [1, 2]
nums.append([3, 4])   # [1, 2, [3, 4]]   — bitta element (ro'yxat)
nums = [1, 2]
nums.extend([3, 4])   # [1, 2, 3, 4]     — har biri alohida

fruits = ["olma", "nok", "olma", "uzum"]
fruits.remove("olma")     # birinchi "olma" o'chadi; yo'q bo'lsa ValueError
del fruits[0]             # indeks bo'yicha; qaytarmaydi; kesma ham mumkin: del fruits[1:3]
last = fruits.pop()       # oxirgisini o'chirib qaytaradi (O(1))
first = fruits.pop(0)     # boshidan — O(n), navbat uchun collections.deque
```

**Intervyuda shunday ayting:** "`append` — bitta obyekt, `extend` — iterable'ning elementlari. `remove` qiymat bo'yicha va birinchi moslikni, `del` indeks yoki kesma bo'yicha, `pop` indeks bo'yicha o'chiradi va qiymatni qaytaradi. Boshidan tez-tez o'chirish kerak bo'lsa — `deque.popleft()`, chunki `list.pop(0)` barcha elementlarni suradi."

**Esda tuting:** ro'yxatni aylanib chiqayotganda undan element o'chirmang — elementlar o'tkazib yuboriladi. Buning o'rniga yangi ro'yxat yarating: `[x for x in xs if keep(x)]`.

## Q4. Ro'yxatdan dublikatlarni tartibni saqlagan holda qanday olib tashlaysiz? / How do you remove duplicates from a list while preserving order?

**Oddiy qilib aytganda:** `set(items)` dublikatlarni olib tashlaydi, lekin **tartibni buzadi**. Tartib muhim bo'lsa, `dict.fromkeys(items)` ishlatiladi: lug'at kalitlari takrorlanmaydi va qo'shilish tartibini eslab qoladi.

**Batafsilroq:**

```python
emails = ["b@x.uz", "a@x.uz", "b@x.uz", "c@x.uz", "a@x.uz"]

list(set(emails))              # tartib kafolatlanmagan
list(dict.fromkeys(emails))    # ['b@x.uz', 'a@x.uz', 'c@x.uz'] — birinchi uchragan tartibda

# Kalit bo'yicha (masalan, katta-kichik harfsiz) — o'zgaruvchan yo'l bilan
def unique_by(items, key):
    seen = set()
    for item in items:
        k = key(item)
        if k not in seen:
            seen.add(k)
            yield item

list(unique_by(["Ali@x.uz", "ali@x.uz"], key=str.casefold))   # ['Ali@x.uz']
```

**Intervyuda shunday ayting:** "Tartib muhim bo'lmasa — `set`, muhim bo'lsa — `dict.fromkeys` (3.7+ dan lug'at tartibi kafolatlangan), ikkalasi ham O(n). Maxsus kalit bo'yicha — `seen` to'plami bilan generator. Elementlar hashlanmaydigan bo'lsa (masalan, lug'atlar), kalit sifatida ularning hashlanadigan qismini olaman."

**Esda tuting:** ma'lumot bazadan kelsa, dublikatni ilovada emas, so'rovda (`DISTINCT`) yoki unique constraint bilan hal qilish yaxshiroq.
