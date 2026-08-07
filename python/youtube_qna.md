# Python — YouTube Intervyu Savol-Javoblari

> YouTube'dan olingan Python intervyu savollari va kod misollari bilan to'liq javoblar. Takrorlanadigan savollar birlashtirilgan, faqat yangi nuqtalar alohida ko'rsatilgan.

---

## Asosiy tushunchalar

**1. Python'ning asosiy xususiyatlari**
Oddiyligi, o'qilishi osonligi, ochiq kodli, cross-platform, obyektga yo'naltirilgan, **dinamik tiplash** (tur oldindan e'lon qilinmaydi) va **interpretatsiyalanuvchi** til.
```python
x = 5        # int
x = "salom"  # endi str — tur avtomatik aniqlanadi
```

**2. Interpreted til**
Kod avval bytecode'ga (`.pyc`) aylantiriladi, so'ng Python Virtual Machine tomonidan bajariladi — C/C++ kabi to'g'ridan-to'g'ri mashina kodiga kompilyatsiya qilinmaydi. Sekinroq, lekin platformalararo ishlaydi.

**3. PEP8**
Kod uslubi qo'llanmasi: 4 bo'shliq indentatsiya, `snake_case` o'zgaruvchilar, `PascalCase` klasslar, ~79 belgi qator uzunligi. `flake8`, `black` avtomatik tekshiradi.

**4. Xotirani boshqarish**
**Reference counting** + **garbage collector (gc modul)**. Har bir obyektga necha joyda murojaat qilinayotgani hisoblanadi; hisob 0 ga tushganda xotira bo'shatiladi. `gc` moduli circular reference'larni alohida aniqlaydi.

**5. Data types**
Numeric (`int`, `float`, `complex`), Sequence (`list`, `tuple`, `str`), Mapping (`dict`), Set (`set`, `frozenset`), Boolean (`bool`), None type.

---

## List, Tuple, Set, Mutable/Immutable

**List, tuple va set farqi**
- List — tartiblangan, mutable
- Tuple — tartiblangan, immutable
- Set — tartiblanmagan, noyob elementlar

```python
my_list = [1, 2, 3]
my_list[0] = 100        # ishlaydi — mutable

my_tuple = (1, 2, 3)
my_tuple[0] = 100        # TypeError — immutable
```
Tuple tezroq ishlaydi, o'zgarmas ma'lumot uchun mos, dictionary kalit sifatida ishlatilishi mumkin (list — yo'q).

**Mutable va Immutable**
Mutable: list, dict, set. Immutable: string, tuple, int, float, bool, frozenset.

**is vs ==**
```python
a = [1, 2, 3]
b = [1, 2, 3]
print(a == b)  # True — qiymatlar bir xil
print(a is b)  # False — xotirada boshqa obyektlar
c = a
print(a is c)  # True — bir xil obyektga ishora
```

**Shallow vs Deep copy**
```python
import copy
original = [[1, 2], [3, 4]]

shallow = copy.copy(original)
shallow[0][0] = 100
print(original)  # [[100, 2], [3, 4]] — ichki listlar umumiy

deep = copy.deepcopy(original)
deep[0][0] = 999
print(original)  # [[100, 2], [3, 4]] — o'zgarmadi, mustaqil nusxa
```

**Append vs Extend**
```python
lst = [1, 2, 3]
lst.append([4, 5])   # [1, 2, 3, [4, 5]] — butun list bitta element sifatida

lst2 = [1, 2, 3]
lst2.extend([4, 5])  # [1, 2, 3, 4, 5] — har bir element alohida
```

**Dublikatlarni o'chirish (dict.fromkeys())**
```python
lst = [3, 1, 2, 3, 1, 4]
noyob = list(dict.fromkeys(lst))
print(noyob)  # [3, 1, 2, 4] — tartib saqlanadi (set() esa tartibni kafolatlamaydi)
```

**Dict vs List**
Dict xesh-jadval (hash table) orqali ishlaydi — qidiruv O(1), list esa O(n).

---

## Funksiyalar va OOP

**Decorators**
```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Funksiyadan oldin")
        result = func(*args, **kwargs)
        print("Funksiyadan keyin")
        return result
    return wrapper

@my_decorator
def salom():
    print("Salom!")
```

**Decorator chaining**
```python
def bold(func):
    def wrapper(): return f"<b>{func()}</b>"
    return wrapper

def italic(func):
    def wrapper(): return f"<i>{func()}</i>"
    return wrapper

@bold
@italic
def matn():
    return "Salom"

print(matn())  # <b><i>Salom</i></b>
```
Pastdan yuqoriga qarab qo'llaniladi (italic avval, keyin bold).

**Generators va yield**
```python
def sanagich(n):
    i = 0
    while i < n:
        yield i
        i += 1
```
Barcha qiymatlarni xotirada saqlamaydi — `next()` chaqirilganda birma-bir hisoblab beradi.

**Lambda funksiyalar**
```python
kvadrat = lambda x: x ** 2
sorted([(1,'b'),(2,'a')], key=lambda x: x[1])
```

**Metodlar turlari (instance/class/static)**
```python
class Misol:
    def instance_method(self): return "obyektga bog'liq"
    @classmethod
    def class_method(cls): return "klassga bog'liq"
    @staticmethod
    def static_method(): return "hech nimaga bog'liq emas"
```

**MRO (Method Resolution Order)**
```python
class A:
    def salom(self): return "A"
class B(A):
    def salom(self): return "B"
class C(A):
    def salom(self): return "C"
class D(B, C):
    pass

print(D().salom())   # "B"
print(D.__mro__)     # (D, B, C, A, object)
```
Python **C3 linearization** algoritmi ishlatadi — diamond problem'da qaysi metod chaqirilishini aniqlaydi.

**Dunder/Magic metodlar**
```python
class Vektor:
    def __init__(self, x, y): self.x, self.y = x, y
    def __add__(self, other): return Vektor(self.x+other.x, self.y+other.y)
    def __str__(self): return f"Vektor({self.x}, {self.y})"
    def __eq__(self, other): return self.x==other.x and self.y==other.y
```
`__init__`, `__str__`, `__len__`, `__getitem__`, `__eq__`, `__add__` — operator overloading imkonini beradi.

**__init__ vs __new__**
```python
class Misol:
    def __new__(cls, *args, **kwargs):
        return super().__new__(cls)   # obyektni YARATADI
    def __init__(self, qiymat):
        self.qiymat = qiymat          # obyektni SOZLAYDI
```
`__new__` deyarli hech qachon override qilinmaydi (faqat immutable turlarni meros olishda kerak bo'ladi).

**args va kwargs**
```python
def funksiya(*args, **kwargs):
    print(args)    # tuple: pozitsion argumentlar
    print(kwargs)  # dict: nomlangan argumentlar

funksiya(1, 2, 3, ism="Ali", yosh=25)
# (1, 2, 3)
# {'ism': 'Ali', 'yosh': 25}
```

**Pass by value vs Pass by reference**
Python aslida **"pass by object reference"**:
```python
def func1(x):
    x = x + 1
a = 5
func1(a)
print(a)  # 5 — o'zgarmadi (int immutable)

def func2(lst):
    lst.append(4)
b = [1, 2, 3]
func2(b)
print(b)  # [1, 2, 3, 4] — o'zgardi (list mutable)
```

---

## Exception handling, Context managers, Recursion

**Exception handling**
```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Xato: {e}")
else:
    print("Xatolik bo'lmadi")  # faqat try muvaffaqiyatli bo'lsa
finally:
    print("Har doim bajariladi")
```

**With statement**
```python
with open("fayl.txt", "r") as f:
    content = f.read()
# blok tugagach fayl avtomatik yopiladi — __enter__/__exit__ protokoli
```

**Recursion**
```python
def faktorial(n):
    if n <= 1:          # base case
        return 1
    return n * faktorial(n - 1)
```

---

## Iterators, Comprehension, GIL

**Iterators va Iterables**
```python
my_list = [1, 2, 3]
it = iter(my_list)
next(it)  # 1
next(it)  # 2
```
Iterable — `__iter__` metodiga ega. Iterator — `__iter__` + `__next__` ga ega. Har bir generator — iterator.

**List comprehension**
```python
kvadratlar = [x**2 for x in range(10) if x % 2 == 0]
```

**GIL (Global Interpreter Lock)**
Bir vaqtning o'zida faqat bitta thread Python bytecode bajaradi. CPU-bound vazifalar uchun `multiprocessing` (GIL cheklovi yo'q), I/O-bound uchun `threading` foydali (I/O kutganda GIL bo'shatiladi).

**Multithreading vs Multiprocessing**
- Multithreading — bitta jarayon, umumiy xotira, GIL tufayli CPU-bound'da haqiqiy parallellik yo'q. I/O-bound uchun mos.
- Multiprocessing — alohida jarayonlar, o'z xotirasi/interpreteri, GIL cheklovi yo'q. CPU-bound uchun mos, lekin IPC xarajati bor.

**Namespace (LEGB)**
Local → Enclosing → Global → Built-in — o'zgaruvchi qidirish tartibi.

**Monkey patching**
```python
class Sinf:
    def salom(self): return "Salom"

def yangi_salom(self): return "Yangi salom!"
Sinf.salom = yangi_salom  # runtime'da metodni almashtirish
```

---

## Muhim "gotcha"lar

**Mutable default argument trap**
```python
def qoshish(item, lst=[]):   # XATOLIK
    lst.append(item)
    return lst
# qoshish(1) -> [1]; qoshish(2) -> [1, 2]  <- kutilmagan!

def qoshish_togri(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst
```
Default argument funksiya **aniqlanganda bir marta** yaratiladi — har chaqiriqda saqlanib qoladi.

**O'chirish usullari: remove, del, pop**
```python
lst = [1, 2, 3, 2]
lst.remove(2)   # qiymat bo'yicha, birinchi topilganini -> [1, 3, 2]
del lst[0]      # indeks bo'yicha -> [3, 2]
lst.pop()       # oxirgi elementni o'chirib qaytaradi
```

---

## Modullar, Frameworklar

**Modullar va paketlar**
Modul — bitta `.py` fayl. Paket — `__init__.py`ga ega papka.

**Built-in funksiyalar**
`len()`, `type()`, `range()`, `map()`, `filter()`, `zip()`, `sorted()`, `enumerate()`, `isinstance()`.

**Xotira sizib chiqishi (memory leaks)**
Sabablari: circular reference (`__del__` bilan), global cache'larda cheksiz saqlash, yopilmagan fayl/ulanishlar. Yechim: `weakref`, `with` statement, `tracemalloc`/`objgraph` profiling.

**Kod samaradorligini oshirish**
To'g'ri data structure tanlash (qidiruv uchun `set`/`dict`), list comprehension, `"".join()` (string `+=` o'rniga), generatorlar (xotira tejash), `cProfile`/`timeit` bilan bottleneck aniqlash.
```python
# Yomon:
result = ""
for i in range(10000): result += str(i)
# Yaxshi:
result = "".join(str(i) for i in range(10000))
```

**Frameworklar**
Django (to'liq web framework), Flask (yengil), Pandas (ma'lumot tahlili), TensorFlow/PyTorch (ML), NumPy (ilmiy hisoblash), FastAPI (zamonaviy API — batafsil `python/fastapi_youtube_qna.md` faylida).

**Python'ning boshqa tillardan farqi**
Java/C++ ga nisbatan: statik tiplashsiz, kod qisqaroq. JavaScript'ga nisbatan: indentatsiya majburiy, GIL tufayli haqiqiy parallel threading yo'q. "Batteries included" falsafasi — boy standart kutubxona.
