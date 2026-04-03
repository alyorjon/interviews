# 🐍 Python Interview: 100 Savol va Javob
# 🐍 Python Interview: 100 Questions and Answers

> **Bilingual Guide | Ikki tilli qo'llanma** — English 🇬🇧 + O'zbek 🇺🇿  
> Basic → Intermediate → Advanced → Expert  
> Har bir javobda ishlaydigan kod misoli keltirilgan.

---

## 📚 Mundarija / Table of Contents

| Daraja / Level | Savollar / Questions |
|---|---|
| 🟢 Basic | 1–25 |
| 🟡 Intermediate | 26–55 |
| 🔴 Advanced | 56–80 |
| ⚫ Expert | 81–100 |

---

# 🟢 BASIC LEVEL (1–25)

---

## 1. Python nima? / What is Python?

**EN:** Python is a high-level, interpreted, dynamically-typed programming language known for its readability and simplicity. It supports multiple paradigms: procedural, object-oriented, and functional.

**UZB:** Python — yuqori darajali, interpretatsiya qilinadigan, dinamik tipli dasturlash tili bo'lib, o'qiluvchanligi va soddaligi bilan tanilgan. Bir nechta paradigmalarni qo'llab-quvvatlaydi: protsessual, ob'ektga yo'naltirilgan va funksional.

```python
# Python o'qilishi oson / Python is easy to read
name = "Alyorjon"
age = 25
print(f"Hello, {name}! You are {age} years old.")
# Hello, Alyorjon! You are 25 years old.
```

---

## 2. Python'da o'zgaruvchi tiplarini qanday e'lon qilinadi? / How are variables declared in Python?

**EN:** Python uses dynamic typing — you don't declare types explicitly. The interpreter infers the type at runtime.

**UZB:** Python dinamik tipizatsiyadan foydalanadi — turlarni aniq e'lon qilmaysiz. Interpreter ish vaqtida turni aniqlaydi.

```python
x = 10           # int
y = 3.14         # float
name = "Python"  # str
is_active = True # bool
data = None      # NoneType

print(type(x))    # <class 'int'>
print(type(y))    # <class 'float'>
print(type(name)) # <class 'str'>
```

---

## 3. List, Tuple, Set va Dict farqi nima? / What is the difference between List, Tuple, Set, and Dict?

**EN:** These are Python's core data structures, each with specific characteristics.

**UZB:** Bular Python'ning asosiy ma'lumotlar tuzilmalari, har biri o'ziga xos xususiyatlariga ega.

```python
# List — tartibli, o'zgaruvchan, takrorlanishga ruxsat
my_list = [1, 2, 2, 3]
my_list.append(4)
print(my_list)  # [1, 2, 2, 3, 4]

# Tuple — tartibli, O'ZGARMAS, takrorlanishga ruxsat
my_tuple = (1, 2, 2, 3)
# my_tuple[0] = 99  # ❌ TypeError: tuple is immutable

# Set — tartibsiz, o'zgaruvchan, TAKRORLANMAYDI
my_set = {1, 2, 2, 3}
print(my_set)   # {1, 2, 3}  — 2 bitta bo'ladi

# Dict — kalit-qiymat juftlari, tartibli (Python 3.7+)
my_dict = {"name": "Ali", "age": 25}
print(my_dict["name"])  # Ali
```

| | List | Tuple | Set | Dict |
|---|---|---|---|---|
| Tartibli / Ordered | ✅ | ✅ | ❌ | ✅ |
| O'zgaruvchan / Mutable | ✅ | ❌ | ✅ | ✅ |
| Takror / Duplicates | ✅ | ✅ | ❌ | ❌ (keys) |

---

## 4. `is` va `==` farqi nima? / What is the difference between `is` and `==`?

**EN:** `==` checks value equality. `is` checks identity (same object in memory).

**UZB:** `==` qiymat tengligini tekshiradi. `is` identifikatsiyani tekshiradi (xotiradagi bir xil ob'ekt).

```python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)   # True  — qiymatlar teng
print(a is b)   # False — turli ob'ektlar
print(a is c)   # True  — bir xil ob'ekt (c = a)

# Integer caching (-5 dan 256 gacha)
x = 256
y = 256
print(x is y)   # True  — Python caches small ints

x = 257
y = 257
print(x is y)   # False — katta sonlar cache qilinmaydi
```

---

## 5. Python'da `*args` va `**kwargs` nima? / What are `*args` and `**kwargs` in Python?

**EN:** `*args` accepts variable positional arguments as a tuple. `**kwargs` accepts variable keyword arguments as a dict.

**UZB:** `*args` o'zgaruvchan pozitsion argumentlarni tuple sifatida qabul qiladi. `**kwargs` o'zgaruvchan kalit so'z argumentlarini dict sifatida qabul qiladi.

```python
def greet(*args, **kwargs):
    for name in args:
        print(f"Hello, {name}!")
    for key, value in kwargs.items():
        print(f"{key}: {value}")

greet("Ali", "Vali", city="Tashkent", lang="Python")
# Hello, Ali!
# Hello, Vali!
# city: Tashkent
# lang: Python

# Funksiyaga list/dict uzatish
def add(a, b, c):
    return a + b + c

nums = [1, 2, 3]
print(add(*nums))       # 6

info = {"a": 1, "b": 2, "c": 3}
print(add(**info))      # 6
```

---

## 6. List comprehension nima? / What is list comprehension?

**EN:** A concise way to create lists using a single line with optional filtering.

**UZB:** Ixtiyoriy filtrlash bilan bitta qatorda ro'yxatlar yaratishning qisqa usuli.

```python
# Oddiy usul / Traditional way
squares = []
for i in range(10):
    squares.append(i ** 2)

# List comprehension
squares = [i ** 2 for i in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Shartli filtrlash / With condition
evens = [i for i in range(20) if i % 2 == 0]
print(evens)    # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Dict comprehension
squared_dict = {i: i**2 for i in range(5)}
print(squared_dict)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Set comprehension
unique_squares = {x**2 for x in [-2, -1, 0, 1, 2]}
print(unique_squares)  # {0, 1, 4}
```

---

## 7. Lambda funksiyasi nima? / What is a lambda function?

**EN:** An anonymous, single-expression function defined with the `lambda` keyword.

**UZB:** `lambda` kalit so'zi bilan aniqlangan anonim, bitta ifodali funksiya.

```python
# Oddiy funksiya / Regular function
def square(x):
    return x ** 2

# Lambda
square = lambda x: x ** 2
print(square(5))  # 25

# Ko'p parametrli / Multiple params
add = lambda a, b: a + b
print(add(3, 4))  # 7

# Real ishlatish: sorted, map, filter
students = [("Ali", 85), ("Vali", 92), ("Sami", 78)]
students.sort(key=lambda s: s[1], reverse=True)
print(students)  # [('Vali', 92), ('Ali', 85), ('Sami', 78)]

# map bilan
nums = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, nums))
print(doubled)  # [2, 4, 6, 8, 10]

# filter bilan
odds = list(filter(lambda x: x % 2 != 0, nums))
print(odds)  # [1, 3, 5]
```

---

## 8. Python'da exception handling qanday ishlaydi? / How does exception handling work in Python?

**EN:** Python uses `try/except/else/finally` blocks to handle runtime errors gracefully.

**UZB:** Python ish vaqtidagi xatolarni munosib boshqarish uchun `try/except/else/finally` bloklaridan foydalanadi.

```python
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError as e:
        print(f"Xato: {e}")
        return None
    except TypeError as e:
        print(f"Tip xatosi: {e}")
        return None
    else:
        # Xato bo'lmasa ishlaydi / Runs if no exception
        print("Muvaffaqiyatli!")
        return result
    finally:
        # Har doim ishlaydi / Always runs
        print("Amaliyot tugadi.")

print(divide(10, 2))   # Muvaffaqiyatli! → Amaliyot tugadi. → 5.0
print(divide(10, 0))   # Xato: division by zero → Amaliyot tugadi. → None

# O'z xatoligingizni yarating / Custom exception
class InsufficientFundsError(Exception):
    def __init__(self, amount, balance):
        self.message = f"Kerakli: {amount}, Mavjud: {balance}"
        super().__init__(self.message)

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(amount, balance)
    return balance - amount

try:
    withdraw(100, 200)
except InsufficientFundsError as e:
    print(e)  # Kerakli: 200, Mavjud: 100
```

---

## 9. `range()` funksiyasi qanday ishlaydi? / How does `range()` work?

**EN:** `range()` generates an immutable sequence of numbers lazily (without storing all values in memory).

**UZB:** `range()` sonlarning o'zgarmas ketma-ketligini dangasalik bilan (barcha qiymatlarni xotirada saqlamay) yaratadi.

```python
# range(stop)
print(list(range(5)))         # [0, 1, 2, 3, 4]

# range(start, stop)
print(list(range(2, 8)))      # [2, 3, 4, 5, 6, 7]

# range(start, stop, step)
print(list(range(0, 20, 5)))  # [0, 5, 10, 15]

# Teskari / Reverse
print(list(range(10, 0, -2))) # [10, 8, 6, 4, 2]

# Xotira samaradorligi / Memory efficiency
import sys
r = range(1_000_000)
print(sys.getsizeof(r))       # 48 bytes — always same size!
lst = list(range(1_000_000))
print(sys.getsizeof(lst))     # ~8 MB
```

---

## 10. String formatlash usullari / String formatting methods

**EN:** Python offers multiple ways to format strings. f-strings (Python 3.6+) are the most readable and performant.

**UZB:** Python stringlarni formatlashning bir nechta usullarini taklif qiladi. f-strings (Python 3.6+) eng o'qiluvchan va samarali.

```python
name = "Alyorjon"
score = 95.678

# % formatting (eski usul / old style)
print("Salom, %s! Ball: %.2f" % (name, score))

# .format() usuli
print("Salom, {}! Ball: {:.2f}".format(name, score))

# f-string (tavsiya etiladi / recommended)
print(f"Salom, {name}! Ball: {score:.2f}")

# Murakkab ifodalar / Complex expressions in f-strings
nums = [1, 2, 3, 4, 5]
print(f"Yig'indisi: {sum(nums)}, O'rtachasi: {sum(nums)/len(nums):.1f}")

# Alignment va padding
print(f"{'left':<10}|{'center':^10}|{'right':>10}")
# left      |  center  |     right
```

---

## 11. Python'da `copy()` va `deepcopy()` farqi / Difference between `copy()` and `deepcopy()`

**EN:** `copy()` creates a shallow copy (nested objects still reference the original). `deepcopy()` creates a fully independent copy.

**UZB:** `copy()` sayoz nusxa yaratadi (ichki ob'ektlar hali ham aslini ko'rsatadi). `deepcopy()` to'liq mustaqil nusxa yaratadi.

```python
import copy

original = [[1, 2, 3], [4, 5, 6]]

shallow = copy.copy(original)
deep = copy.deepcopy(original)

# Ichki ro'yxatni o'zgartirish / Modifying inner list
original[0][0] = 99

print(original)  # [[99, 2, 3], [4, 5, 6]]
print(shallow)   # [[99, 2, 3], [4, 5, 6]] — ❌ ta'sir ko'rdi!
print(deep)      # [[1, 2, 3], [4, 5, 6]]  — ✅ o'zgarmadi
```

---

## 12. `enumerate()` va `zip()` funksiyalari / `enumerate()` and `zip()` functions

**EN:** `enumerate()` adds an index counter to an iterable. `zip()` combines multiple iterables into tuples.

**UZB:** `enumerate()` takrorlanadigan ob'ektga indeks hisoblagichini qo'shadi. `zip()` bir nechta takrorlanadigan ob'ektlarni tuple'larga birlashtiradi.

```python
# enumerate — index + value
fruits = ["apple", "banana", "cherry"]
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry

# zip — parallel iteration
names = ["Ali", "Vali", "Sami"]
scores = [85, 92, 78]
cities = ["Tashkent", "Samarkand", "Fergana"]

for name, score, city in zip(names, scores, cities):
    print(f"{name} ({city}): {score}")
# Ali (Tashkent): 85
# Vali (Samarkand): 92
# Sami (Fergana): 78

# zip_longest — uzunliklar farq qilsa
from itertools import zip_longest
a = [1, 2, 3]
b = ["a", "b"]
print(list(zip_longest(a, b, fillvalue="N/A")))
# [(1, 'a'), (2, 'b'), (3, 'N/A')]
```

---

## 13. Global va local o'zgaruvchilar / Global and local variables

**EN:** Variables inside a function are local by default. Use `global` or `nonlocal` to modify outer scope variables.

**UZB:** Funksiya ichidagi o'zgaruvchilar odatda mahalliydir. Tashqi doiradagi o'zgaruvchilarni o'zgartirish uchun `global` yoki `nonlocal` dan foydalaning.

```python
count = 0  # global

def increment():
    global count  # global o'zgaruvchiga murojaat
    count += 1

increment()
increment()
print(count)  # 2

# nonlocal — ichki funksiyada
def outer():
    x = 10
    def inner():
        nonlocal x
        x += 5
    inner()
    print(x)  # 15

outer()
```

---

## 14. Python'da file bilan ishlash / Working with files in Python

**EN:** Python uses `open()` with context managers (`with` statement) for safe file handling.

**UZB:** Python xavfsiz fayl bilan ishlash uchun kontekst menejerlari (`with` iborasi) bilan `open()` dan foydalanadi.

```python
# Yozish / Write
with open("test.txt", "w", encoding="utf-8") as f:
    f.write("Salom, Python!\n")
    f.write("Ikkinchi qator\n")

# O'qish / Read
with open("test.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)

# Qator bo'yicha o'qish / Read line by line
with open("test.txt", "r") as f:
    for line in f:
        print(line.strip())

# Qo'shish / Append
with open("test.txt", "a") as f:
    f.write("Uchinchi qator\n")

# JSON bilan ishlash / Working with JSON
import json

data = {"name": "Ali", "age": 25, "skills": ["Python", "FastAPI"]}

with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

with open("data.json", "r") as f:
    loaded = json.load(f)
    print(loaded["skills"])  # ['Python', 'FastAPI']
```

---

## 15. `map()`, `filter()`, `reduce()` funksiyalari / `map()`, `filter()`, `reduce()` functions

**EN:** Functional programming tools for transforming, filtering, and aggregating iterables.

**UZB:** Takrorlanadigan ob'ektlarni o'zgartirish, filtrlash va yig'ish uchun funksional dasturlash vositalari.

```python
from functools import reduce

nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map — har bir elementga funksiya qo'llash
squared = list(map(lambda x: x**2, nums))
print(squared)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# filter — shartga mos elementlarni tanlash
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)    # [2, 4, 6, 8, 10]

# reduce — elementlarni birlashtirish
total = reduce(lambda a, b: a + b, nums)
print(total)    # 55

product = reduce(lambda a, b: a * b, [1, 2, 3, 4, 5])
print(product)  # 120

# Zamonaviy Python'da / Modern Python preference
# List comprehension ko'pincha afzal / Often preferred
squared = [x**2 for x in nums]
evens = [x for x in nums if x % 2 == 0]
```

---

## 16. String metodlari / String methods

**EN:** Python strings have rich built-in methods for manipulation.

**UZB:** Python stringlarida manipulyatsiya uchun boy o'rnatilgan metodlar mavjud.

```python
s = "  Hello, Python World!  "

print(s.strip())          # "Hello, Python World!"
print(s.upper())          # "  HELLO, PYTHON WORLD!  "
print(s.lower())          # "  hello, python world!  "
print(s.replace("Python", "Uzbekistan"))

# Split va join
words = "ali,vali,sami".split(",")
print(words)              # ['ali', 'vali', 'sami']
print(" | ".join(words))  # ali | vali | sami

# Tekshirishlar / Checks
print("123".isdigit())    # True
print("abc".isalpha())    # True
print("hello".startswith("hel"))  # True
print("world".endswith("ld"))     # True

# Find va index
text = "Python is great"
print(text.find("is"))    # 7 (topilmasa -1 qaytaradi)
print(text.count("t"))    # 2

# Strip variantlari
print("***hello***".strip("*"))   # hello
print("   spaces   ".lstrip())    # "spaces   "
print("   spaces   ".rstrip())    # "   spaces"
```

---

## 17. Python'da OOP asoslari: Class va Object / OOP basics: Class and Object

**EN:** A class is a blueprint; an object is an instance of that class.

**UZB:** Klass — loyiha; ob'ekt — shu klassning namunasi.

```python
class BankAccount:
    bank_name = "UzBank"  # class attribute — barcha instanslarga umumiy

    def __init__(self, owner, balance=0):
        self.owner = owner      # instance attribute
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"{amount} so'm kiritildi. Balans: {self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Mablag' yetarli emas!")
        self.balance -= amount
        print(f"{amount} so'm chiqarildi. Balans: {self.balance}")

    def __str__(self):
        return f"{self.owner} hisobi | Balans: {self.balance}"

    def __repr__(self):
        return f"BankAccount(owner='{self.owner}', balance={self.balance})"

acc = BankAccount("Ali", 1000)
acc.deposit(500)    # 500 so'm kiritildi. Balans: 1500
acc.withdraw(200)   # 200 so'm chiqarildi. Balans: 1300
print(acc)          # Ali hisobi | Balans: 1300
print(repr(acc))    # BankAccount(owner='Ali', balance=1300)
print(BankAccount.bank_name)  # UzBank
```

---

## 18. Python'da Inheritance (meros) / Inheritance in Python

**EN:** Child classes inherit attributes and methods from parent classes.

**UZB:** Bola klasslar ota klasslardan atribut va metodlarni meros oladi.

```python
class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        return f"{self.name} aytadi: {self.sound}"

class Dog(Animal):
    def __init__(self, name):
        super().__init__(name, "Vov!")

    def fetch(self):
        return f"{self.name} to'p olib keldi!"

class Cat(Animal):
    def __init__(self, name):
        super().__init__(name, "Miyov!")

    def purr(self):
        return f"{self.name} g'urrilladi..."

dog = Dog("Rex")
cat = Cat("Mishi")

print(dog.speak())   # Rex aytadi: Vov!
print(dog.fetch())   # Rex to'p olib keldi!
print(cat.speak())   # Mishi aytadi: Miyov!

# isinstance tekshirishi
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True
print(isinstance(dog, Cat))     # False
```

---

## 19. `__init__`, `__str__`, `__repr__` va boshqa dunder metodlar / Dunder methods

**EN:** Dunder (double underscore) methods allow customizing class behavior for Python's built-in operations.

**UZB:** Dunder (ikki pastki chiziq) metodlar Python'ning o'rnatilgan operatsiyalari uchun klass xatti-harakatini sozlash imkonini beradi.

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):
        return f"Vector(x={self.x}, y={self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __len__(self):
        return 2  # 2D vector

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __abs__(self):
        return (self.x**2 + self.y**2) ** 0.5

v1 = Vector(1, 2)
v2 = Vector(3, 4)

print(v1 + v2)   # Vector(4, 6)
print(v1 * 3)    # Vector(3, 6)
print(len(v1))   # 2
print(v1 == v2)  # False
print(abs(v2))   # 5.0
```

---

## 20. Python'da modul va paketlar / Modules and packages in Python

**EN:** A module is a `.py` file. A package is a directory with `__init__.py`. `import` loads them.

**UZB:** Modul — `.py` fayli. Paket — `__init__.py` bilan katalog. `import` ularni yuklaydi.

```python
# math moduli / math module
import math
print(math.sqrt(16))    # 4.0
print(math.pi)          # 3.141592653589793
print(math.ceil(4.2))   # 5
print(math.floor(4.8))  # 4

# from import
from math import sqrt, pi
print(sqrt(25))   # 5.0

# alias
import numpy as np  # agar o'rnatilgan bo'lsa
import datetime as dt

now = dt.datetime.now()
print(now.strftime("%Y-%m-%d %H:%M"))

# os moduli
import os
print(os.getcwd())          # joriy katalog
print(os.listdir("."))      # fayllar ro'yxati
os.makedirs("mydir", exist_ok=True)

# sys moduli
import sys
print(sys.version)          # Python versiyasi
print(sys.path)             # modul qidirish yo'llari
```

---

## 21. `None` nima va qachon ishlatiladi? / What is `None` and when is it used?

**EN:** `None` is Python's null value — represents absence of a value. It's a singleton object of `NoneType`.

**UZB:** `None` — Python'ning null qiymati — qiymat yo'qligini ifodalaydi. Bu `NoneType` ning yagona ob'ekti.

```python
# Funksiya qaytarish qiymati yo'q bo'lganda
def greet(name):
    print(f"Salom, {name}!")
    # return yo'q → None qaytaradi

result = greet("Ali")  # Salom, Ali!
print(result)          # None

# Default qiymat sifatida
def find_user(user_id, db=None):
    if db is None:
        db = {}  # yangi dict yaratish
    return db.get(user_id)

# None tekshirish
value = None
if value is None:     # ✅ to'g'ri usul
    print("Qiymat yo'q")

if not value:         # ⚠️ ishlaydi, lekin 0 va "" ham False
    print("Falsy qiymat")

# Annotation
from typing import Optional
def get_name(user_id: int) -> Optional[str]:
    # None yoki str qaytaradi
    return None
```

---

## 22. Python'dagi built-in funksiyalar / Python built-in functions

**EN:** Python has many powerful built-in functions that don't require importing.

**UZB:** Python import qilmasdan ishlatiladigan ko'plab kuchli o'rnatilgan funksiyalarga ega.

```python
nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

print(len(nums))         # 10
print(max(nums))         # 9
print(min(nums))         # 1
print(sum(nums))         # 39
print(sorted(nums))      # [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]
print(sorted(nums, reverse=True))  # [9, 6, 5, 5, 4, 3, 3, 2, 1, 1]

# Type conversion
print(int("42"))         # 42
print(float("3.14"))     # 3.14
print(str(100))          # "100"
print(list("abc"))       # ['a', 'b', 'c']
print(tuple([1, 2, 3]))  # (1, 2, 3)
print(set([1, 2, 2, 3])) # {1, 2, 3}

# any() va all()
print(any([False, True, False]))   # True
print(all([True, True, True]))     # True
print(all([True, False, True]))    # False

# abs(), round(), divmod()
print(abs(-5))           # 5
print(round(3.14159, 2)) # 3.14
print(divmod(17, 5))     # (3, 2) — bo'linma va qoldiq
```

---

## 23. Python'da dictionary metodlari / Dictionary methods

**EN:** Dictionaries have powerful methods for accessing, modifying, and iterating data.

**UZB:** Lug'atlar ma'lumotlarga kirish, o'zgartirish va takrorlash uchun kuchli metodlarga ega.

```python
user = {"name": "Ali", "age": 25, "city": "Tashkent"}

# Asosiy metodlar / Core methods
print(user.get("name"))          # Ali
print(user.get("phone", "N/A"))  # N/A — default qiymat

user.update({"age": 26, "email": "ali@example.com"})
print(user)

# Keys, values, items
print(list(user.keys()))    # ['name', 'age', 'city', 'email']
print(list(user.values()))  # ['Ali', 26, 'Tashkent', 'ali@example.com']

for key, value in user.items():
    print(f"  {key}: {value}")

# pop va popitem
removed = user.pop("city")
print(removed)  # Tashkent

# setdefault
user.setdefault("role", "user")   # agar yo'q bo'lsa qo'shadi
print(user["role"])  # user

# dict birlashtirish / Merging (Python 3.9+)
defaults = {"theme": "dark", "lang": "uz"}
settings = {"lang": "en", "font": "mono"}
merged = defaults | settings  # settings ustunlik qiladi
print(merged)  # {'theme': 'dark', 'lang': 'en', 'font': 'mono'}
```

---

## 24. Ternary operator / Ternary operator

**EN:** Python's one-line conditional expression: `value_if_true if condition else value_if_false`.

**UZB:** Python'ning bir qatorli shartli ifoda: `true_bo'lsa_qiymat if shart else false_bo'lsa_qiymat`.

```python
age = 20

# Oddiy usul / Traditional
if age >= 18:
    status = "Kattakon"
else:
    status = "Yosh"

# Ternary
status = "Kattakon" if age >= 18 else "Yosh"
print(status)  # Kattakon

# Ichma-ich ternary (ehtiyotkorlik bilan!)
score = 75
grade = "A" if score >= 90 else "B" if score >= 75 else "C"
print(grade)   # B

# Amaliy misol / Practical
numbers = [1, -2, 3, -4, 5]
abs_nums = [x if x >= 0 else -x for x in numbers]
print(abs_nums)  # [1, 2, 3, 4, 5]
```

---

## 25. `pass`, `break`, `continue` kalit so'zlari / `pass`, `break`, `continue` keywords

**EN:** Control flow keywords for managing loop and function behavior.

**UZB:** Tsikl va funksiya xatti-harakatini boshqarish uchun oqim boshqaruv kalit so'zlari.

```python
# pass — bo'sh blok uchun
class EmptyClass:
    pass

def not_implemented_yet():
    pass

# break — tsiklni to'xtatish
for i in range(10):
    if i == 5:
        break
    print(i, end=" ")  # 0 1 2 3 4

# continue — keyingi iteratsiyaga o'tish
for i in range(10):
    if i % 2 == 0:
        continue
    print(i, end=" ")  # 1 3 5 7 9

# Amaliy: to'g'ri ma'lumot olguncha / Until valid input
data = [None, None, 42, None, 100]
result = None
for item in data:
    if item is None:
        continue
    result = item
    break
print(result)  # 42
```

---

# 🟡 INTERMEDIATE LEVEL (26–55)

---

## 26. Decorator nima? / What is a decorator?

**EN:** A decorator is a function that wraps another function to add behavior without modifying its source code.

**UZB:** Dekorator — manba kodini o'zgartirmasdan xatti-harakat qo'shish uchun boshqa funksiyani o'raydigan funksiya.

```python
import time
import functools

# Oddiy dekorator / Simple decorator
def timer(func):
    @functools.wraps(func)  # metadata saqlash
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} → {end - start:.4f}s")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

result = slow_sum(1_000_000)  # slow_sum → 0.0523s

# Argumentli dekorator / Decorator with arguments
def repeat(times):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello(name):
    print(f"Salom, {name}!")

say_hello("Ali")
# Salom, Ali!
# Salom, Ali!
# Salom, Ali!

# Amaliy: login kerak decorator / Practical: login required
def login_required(func):
    @functools.wraps(func)
    def wrapper(user, *args, **kwargs):
        if not user.get("is_authenticated"):
            raise PermissionError("Tizimga kiring!")
        return func(user, *args, **kwargs)
    return wrapper

@login_required
def get_profile(user):
    return f"Profil: {user['name']}"

user = {"name": "Ali", "is_authenticated": True}
print(get_profile(user))  # Profil: Ali
```

---

## 27. Generator nima? / What is a generator?

**EN:** A generator is a function that yields values lazily, one at a time, without storing all results in memory.

**UZB:** Generator — barcha natijalarni xotirada saqlamay, bir vaqtda bitta qiymatni dangasalik bilan qaytaradigan funksiya.

```python
import sys

# Oddiy funksiya vs generator
def get_squares_list(n):
    return [i**2 for i in range(n)]  # barcha saqlaydi

def get_squares_gen(n):
    for i in range(n):
        yield i**2                   # bittadan qaytaradi

lst = get_squares_list(1_000_000)
gen = get_squares_gen(1_000_000)

print(sys.getsizeof(lst))  # ~8 MB
print(sys.getsizeof(gen))  # 120 bytes

# Generator ishlatish
for sq in get_squares_gen(5):
    print(sq, end=" ")  # 0 1 4 9 16

# next() bilan
gen = get_squares_gen(3)
print(next(gen))  # 0
print(next(gen))  # 1
print(next(gen))  # 4
# next(gen)       # StopIteration

# Generator expression
gen_expr = (x**2 for x in range(10))

# Amaliy: cheksiz ketma-ketlik / Infinite sequence
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
for _ in range(10):
    print(next(fib), end=" ")  # 0 1 1 2 3 5 8 13 21 34
```

---

## 28. Context Manager va `with` iborasi / Context Manager and `with` statement

**EN:** Context managers handle setup and teardown automatically using `__enter__` and `__exit__` methods.

**UZB:** Kontekst menejerlar `__enter__` va `__exit__` metodlari yordamida sozlash va tugatishni avtomatik boshqaradi.

```python
# O'z context manager / Custom context manager
class DatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name

    def __enter__(self):
        print(f"🔌 {self.db_name} ga ulandi")
        return self  # 'as' o'zgaruvchisiga beriladi

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"🔴 {self.db_name} dan uzildi")
        if exc_type:
            print(f"Xato yuz berdi: {exc_val}")
        return False  # xatoni bostirib qo'ymaydi

    def query(self, sql):
        return f"Natija: {sql}"

with DatabaseConnection("PostgreSQL") as db:
    result = db.query("SELECT * FROM users")
    print(result)
# 🔌 PostgreSQL ga ulandi
# Natija: SELECT * FROM users
# 🔴 PostgreSQL dan uzildi

# contextlib bilan / Using contextlib
from contextlib import contextmanager

@contextmanager
def timer(label):
    import time
    start = time.time()
    yield
    elapsed = time.time() - start
    print(f"{label}: {elapsed:.3f}s")

with timer("Hisoblash"):
    result = sum(range(10_000_000))
# Hisoblash: 0.312s
```

---

## 29. Closures nima? / What are closures?

**EN:** A closure is a function that remembers variables from its enclosing scope even after the outer function has finished.

**UZB:** Closure — tashqi funksiya tugagandan keyin ham o'z qamrab oluvchi doirasidagi o'zgaruvchilarni eslab qoladigan funksiya.

```python
def make_multiplier(factor):
    def multiply(number):
        return number * factor  # factor ni eslab qoladi!
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15
print(double(10))  # 20

# Closure'ning qamrab olgan qiymatlari
print(double.__closure__[0].cell_contents)  # 2

# Amaliy: counter / Practical: counter
def make_counter(start=0):
    count = [start]  # list yordamida mutable qilish

    def increment(by=1):
        count[0] += by
        return count[0]

    def reset():
        count[0] = start

    return increment, reset

inc, rst = make_counter(10)
print(inc())    # 11
print(inc(5))   # 16
rst()
print(inc())    # 11
```

---

## 30. `@property` dekoratori / `@property` decorator

**EN:** `@property` turns a method into a read-only attribute, with optional setter and deleter.

**UZB:** `@property` metodini faqat o'qish atributiga aylantiradi, ixtiyoriy setter va deleter bilan.

```python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius  # _ private konventsiya

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Mutlaq noldan past bo'lishi mumkin emas!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

    @property
    def kelvin(self):
        return self._celsius + 273.15

    def __repr__(self):
        return f"Temperature({self._celsius}°C)"

temp = Temperature(100)
print(temp.celsius)      # 100
print(temp.fahrenheit)   # 212.0
print(temp.kelvin)       # 373.15

temp.celsius = 0
print(temp.fahrenheit)   # 32.0

temp.celsius = -274      # ValueError!
```

---

## 31. Python'da `*` va `**` operatorlari / `*` and `**` operators in Python

**EN:** Beyond function arguments, `*` and `**` are used for unpacking in various contexts.

**UZB:** Funksiya argumentlaridan tashqari, `*` va `**` turli kontekstlarda ochish uchun ishlatiladi.

```python
# List/tuple ochish / Unpacking
a, *b, c = [1, 2, 3, 4, 5]
print(a)  # 1
print(b)  # [2, 3, 4]
print(c)  # 5

# Birlаshtirish / Merging
list1 = [1, 2, 3]
list2 = [4, 5, 6]
merged = [*list1, *list2]
print(merged)  # [1, 2, 3, 4, 5, 6]

dict1 = {"a": 1, "b": 2}
dict2 = {"b": 3, "c": 4}
merged = {**dict1, **dict2}  # dict2 ustunlik qiladi
print(merged)  # {'a': 1, 'b': 3, 'c': 4}

# Funksiyada / In functions
def process(first, *middle, last):
    print(f"First: {first}, Middle: {middle}, Last: {last}")

process(1, 2, 3, 4, last=5)
# First: 1, Middle: (2, 3, 4), Last: 5

# Swap without temp variable
x, y = 10, 20
x, y = y, x
print(x, y)  # 20 10
```

---

## 32. Python'da `dataclass` / Dataclasses in Python

**EN:** `@dataclass` automatically generates `__init__`, `__repr__`, `__eq__` and more for data-holding classes.

**UZB:** `@dataclass` ma'lumot saqlaydigan klasslar uchun `__init__`, `__repr__`, `__eq__` va boshqalarni avtomatik yaratadi.

```python
from dataclasses import dataclass, field
from typing import List

@dataclass
class Product:
    name: str
    price: float
    category: str = "General"
    tags: List[str] = field(default_factory=list)

    def discounted_price(self, percent: float) -> float:
        return self.price * (1 - percent / 100)

    def __post_init__(self):
        if self.price < 0:
            raise ValueError("Narx manfiy bo'lishi mumkin emas!")

p1 = Product("Laptop", 1500.0, "Electronics", ["tech", "portable"])
p2 = Product("Laptop", 1500.0, "Electronics", ["tech", "portable"])

print(p1)           # Product(name='Laptop', price=1500.0, ...)
print(p1 == p2)     # True — avtomatik __eq__
print(p1.discounted_price(10))  # 1350.0

# frozen=True — immutable qilish
@dataclass(frozen=True)
class Point:
    x: float
    y: float

p = Point(3.0, 4.0)
# p.x = 5  # FrozenInstanceError
```

---

## 33. Iteratorlar va Iterabllar / Iterators and Iterables

**EN:** An iterable has `__iter__`. An iterator has both `__iter__` and `__next__`. Generators are iterators.

**UZB:** Iterablda `__iter__` bor. Iteratorda ham `__iter__` ham `__next__` bor. Generatorlar — iteratorlardir.

```python
# Iterable tekshirish
print(hasattr([1, 2, 3], '__iter__'))  # True
print(hasattr([1, 2, 3], '__next__'))  # False — iterable, not iterator

lst_iter = iter([1, 2, 3])            # iterator yaratish
print(next(lst_iter))                  # 1
print(next(lst_iter))                  # 2

# O'z iteratori / Custom iterator
class CountDown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for num in CountDown(5):
    print(num, end=" ")  # 5 4 3 2 1

# itertools
from itertools import islice, chain, cycle, count

# Cheksiz counter dan 5 ta olish
first_five = list(islice(count(10), 5))
print(first_five)  # [10, 11, 12, 13, 14]

# Birlashtirish / Chaining
combined = list(chain([1, 2], [3, 4], [5, 6]))
print(combined)    # [1, 2, 3, 4, 5, 6]
```

---

## 34. Type hints va typing moduli / Type hints and typing module

**EN:** Type hints improve code readability, enable IDE support, and allow static analysis tools like mypy.

**UZB:** Type hints kod o'qiluvchanligi, IDE qo'llab-quvvatlash va mypy kabi statik tahlil vositalarini yaxshilaydi.

```python
from typing import List, Dict, Optional, Union, Tuple, Callable, Any
from typing import TypeVar

# Asosiy / Basic
def greet(name: str) -> str:
    return f"Salom, {name}!"

def process_scores(scores: List[int]) -> Dict[str, float]:
    return {
        "avg": sum(scores) / len(scores),
        "max": max(scores),
        "min": min(scores)
    }

# Optional (None yoki qiymat)
def find_user(user_id: int) -> Optional[str]:
    users = {1: "Ali", 2: "Vali"}
    return users.get(user_id)

# Union — bir nechta tip
def parse_value(value: Union[str, int, float]) -> float:
    return float(value)

# Python 3.10+ qisqa yozuv
def parse_v2(value: str | int | float) -> float:
    return float(value)

# Callable
def apply(func: Callable[[int], int], nums: List[int]) -> List[int]:
    return [func(n) for n in nums]

result = apply(lambda x: x**2, [1, 2, 3, 4])
print(result)  # [1, 4, 9, 16]

# TypeVar — generics
T = TypeVar('T')

def first_element(lst: List[T]) -> Optional[T]:
    return lst[0] if lst else None
```

---

## 35. Python'da `collections` moduli / `collections` module

**EN:** The `collections` module provides specialized container types.

**UZB:** `collections` moduli ixtisoslashtirilgan konteyner turlarini taqdim etadi.

```python
from collections import Counter, defaultdict, OrderedDict, namedtuple, deque

# Counter — hisoblash
text = "mississippi"
counter = Counter(text)
print(counter)               # Counter({'s': 4, 'i': 4, 'p': 2, 'm': 1})
print(counter.most_common(3))# [('s', 4), ('i', 4), ('p', 2)]

words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
word_count = Counter(words)
print(word_count["apple"])   # 3

# defaultdict — mavjud bo'lmagan kalit uchun default
graph = defaultdict(list)
graph["A"].append("B")
graph["A"].append("C")
graph["B"].append("D")
print(dict(graph))  # {'A': ['B', 'C'], 'B': ['D']}

scores = defaultdict(int)
for word in ["apple", "banana", "apple"]:
    scores[word] += 1
print(dict(scores))  # {'apple': 2, 'banana': 1}

# namedtuple — nomlangan maydonli tuple
Point = namedtuple('Point', ['x', 'y'])
Employee = namedtuple('Employee', ['name', 'department', 'salary'])

p = Point(3, 4)
print(p.x, p.y)    # 3 4
print(p[0])         # 3 — tuple kabi ham ishlaydi

emp = Employee("Ali", "IT", 5000)
print(emp.name)     # Ali

# deque — ikki tomonlama queue
d = deque([1, 2, 3], maxlen=5)
d.appendleft(0)
d.append(4)
print(d)           # deque([0, 1, 2, 3, 4])
d.rotate(2)        # o'ngga aylantirish
print(d)           # deque([3, 4, 0, 1, 2])
```

---

## 36. Python'da `functools` moduli / `functools` module

**EN:** `functools` provides higher-order functions for functional programming.

**UZB:** `functools` funksional dasturlash uchun yuqori darajali funksiyalarni taqdim etadi.

```python
from functools import lru_cache, partial, reduce, cached_property
import time

# lru_cache — memoization
@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

start = time.time()
print(fibonacci(40))  # 102334155
print(f"Vaqt: {time.time()-start:.4f}s")  # ~0.0001s

print(fibonacci.cache_info())
# CacheInfo(hits=38, misses=41, maxsize=128, currsize=41)

# partial — qisman qo'llash / Partial application
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))   # 25
print(cube(3))     # 27

# reduce
from functools import reduce
nums = [1, 2, 3, 4, 5]
product = reduce(lambda a, b: a * b, nums)
print(product)  # 120

# cached_property — bir marta hisoblash
class DataProcessor:
    def __init__(self, data):
        self.data = data

    @cached_property
    def statistics(self):
        print("Hisoblanmoqda...")  # faqat bir marta chiqadi
        return {
            "mean": sum(self.data) / len(self.data),
            "max": max(self.data),
            "min": min(self.data)
        }

dp = DataProcessor([1, 2, 3, 4, 5])
print(dp.statistics)  # Hisoblanmoqda... {'mean': 3.0, ...}
print(dp.statistics)  # Hisoblanmoqda... yo'q — cached
```

---

## 37. Python'da multiple inheritance va MRO / Multiple inheritance and MRO

**EN:** Python supports multiple inheritance. Method Resolution Order (MRO) determines which method is called using C3 linearization.

**UZB:** Python ko'p merosni qo'llab-quvvatlaydi. Metod hal qilish tartibi (MRO) C3 linearizatsiya yordamida qaysi metod chaqirilishini aniqlaydi.

```python
class A:
    def method(self):
        print("A.method")

class B(A):
    def method(self):
        print("B.method")
        super().method()

class C(A):
    def method(self):
        print("C.method")
        super().method()

class D(B, C):
    def method(self):
        print("D.method")
        super().method()

d = D()
d.method()
# D.method
# B.method
# C.method
# A.method

# MRO ko'rish
print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)

# Amaliy: Mixin pattern
class LogMixin:
    def log(self, message):
        print(f"[LOG] {self.__class__.__name__}: {message}")

class JsonMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class User(LogMixin, JsonMixin):
    def __init__(self, name, age):
        self.name = name
        self.age = age

user = User("Ali", 25)
user.log("Created")        # [LOG] User: Created
print(user.to_json())      # {"name": "Ali", "age": 25}
```

---

## 38. Abstract Class nima? / What is an Abstract Class?

**EN:** An abstract class defines a contract — subclasses must implement abstract methods. Use `abc` module.

**UZB:** Abstrakt klass shartnomani belgilaydi — quyi klasslar abstrakt metodlarni amalga oshirishi kerak. `abc` modulidan foydalaning.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    def __init__(self, color="white"):
        self.color = color

    @abstractmethod
    def area(self) -> float:
        """Yuzani hisoblash / Calculate area"""
        pass

    @abstractmethod
    def perimeter(self) -> float:
        """Perimetrni hisoblash / Calculate perimeter"""
        pass

    def describe(self):
        return f"{self.color} {self.__class__.__name__}: yuz={self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius, color="red"):
        super().__init__(color)
        self.radius = radius

    def area(self):
        import math
        return math.pi * self.radius ** 2

    def perimeter(self):
        import math
        return 2 * math.pi * self.radius

class Rectangle(Shape):
    def __init__(self, width, height, color="blue"):
        super().__init__(color)
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

# Shape()  # TypeError — abstrakt klass
circle = Circle(5)
rect = Rectangle(4, 6)

print(circle.describe())   # red Circle: yuz=78.54
print(rect.describe())     # blue Rectangle: yuz=24.00

shapes = [circle, rect]
for s in shapes:
    print(f"  Perimeter: {s.perimeter():.2f}")
```

---

## 39. Python'da `__slots__` / `__slots__` in Python

**EN:** `__slots__` prevents dynamic attribute creation and reduces memory usage by replacing `__dict__`.

**UZB:** `__slots__` `__dict__` ni almashtirish orqali dinamik atribut yaratishni oldini oladi va xotira ishlatishni kamaytiradi.

```python
import sys

class WithDict:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class WithSlots:
    __slots__ = ['x', 'y']

    def __init__(self, x, y):
        self.x = x
        self.y = y

obj1 = WithDict(1, 2)
obj2 = WithSlots(1, 2)

print(sys.getsizeof(obj1.__dict__))  # ~232 bytes
# obj2 has no __dict__!

# 1 million ob'ekt uchun xotira farqi
# WithDict:   ~350 MB
# WithSlots:  ~56 MB  — ~6x kam!

# Dinamik atribut qo'shib bo'lmaydi
obj1.z = 3   # ✅ ishlaydi
# obj2.z = 3 # ❌ AttributeError

# Inheritance bilan
class Base:
    __slots__ = ['x']

class Child(Base):
    __slots__ = ['y']  # x + y

child = Child()
child.x = 1
child.y = 2
```

---

## 40. Python'da Regex / Regular Expressions in Python

**EN:** The `re` module provides powerful pattern matching for strings.

**UZB:** `re` moduli stringlar uchun kuchli shablon moslashtirish imkonini beradi.

```python
import re

text = "Telefon: +998 91 234 56 78, email: ali@example.com"

# search — birinchi moslikni topish
match = re.search(r'\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}', text)
if match:
    print(match.group())  # +998 91 234 56 78

# findall — barcha mosliklarni topish
emails = re.findall(r'[\w.-]+@[\w.-]+\.\w+', text)
print(emails)  # ['ali@example.com']

# sub — almashtirish
clean = re.sub(r'\s+', ' ', "Bu  juda    ko'p   bo'shliq")
print(clean)  # Bu juda ko'p bo'shliq

# Guruhlar / Groups
pattern = r'(\d{4})-(\d{2})-(\d{2})'
date_str = "Sana: 2024-01-15"
m = re.search(pattern, date_str)
if m:
    year, month, day = m.groups()
    print(f"Yil: {year}, Oy: {month}, Kun: {day}")

# compile — ko'p marta ishlatish uchun
phone_pattern = re.compile(r'\+998\d{9}')
phones = ["+998912345678", "+998901234567", "invalid"]
for p in phones:
    if phone_pattern.match(p):
        print(f"✅ {p}")
    else:
        print(f"❌ {p}")

# Named groups
pattern = re.compile(r'(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})')
m = pattern.search("2024-03-15")
print(m.group('year'))   # 2024
print(m.groupdict())     # {'year': '2024', 'month': '03', 'day': '15'}
```

---

## 41. Python'da `sorted()` va `sort()` farqi / Difference between `sorted()` and `sort()`

**EN:** `sort()` modifies list in-place and returns None. `sorted()` returns a new sorted list and works on any iterable.

**UZB:** `sort()` ro'yxatni joyida o'zgartiradi va None qaytaradi. `sorted()` yangi tartiblangan ro'yxat qaytaradi va har qanday iterablda ishlaydi.

```python
nums = [3, 1, 4, 1, 5, 9, 2, 6]

# sort() — joyida / In-place
nums.sort()
print(nums)  # [1, 1, 2, 3, 4, 5, 6, 9]

# sorted() — yangi ro'yxat / New list
original = [3, 1, 4, 1, 5]
sorted_list = sorted(original)
print(original)     # [3, 1, 4, 1, 5] — o'zgarmadi
print(sorted_list)  # [1, 1, 3, 4, 5]

# Key funksiyasi
employees = [
    {"name": "Ali", "salary": 3000},
    {"name": "Vali", "salary": 5000},
    {"name": "Sami", "salary": 2000},
]

# Maosh bo'yicha tartiblash
by_salary = sorted(employees, key=lambda e: e["salary"], reverse=True)
for emp in by_salary:
    print(f"{emp['name']}: {emp['salary']}")
# Vali: 5000, Ali: 3000, Sami: 2000

# Ko'p mezonli tartiblash / Multi-key sorting
students = [("Ali", 85), ("Vali", 92), ("Sami", 85), ("Doni", 92)]
sorted_students = sorted(students, key=lambda s: (-s[1], s[0]))
print(sorted_students)
# [('Vali', 92), ('Doni', 92), ('Ali', 85), ('Sami', 85)]

# operator.attrgetter bilan
from operator import attrgetter, itemgetter
sorted_by_salary = sorted(employees, key=itemgetter("salary"))
```

---

## 42. Python'da `pathlib` moduli / `pathlib` module

**EN:** `pathlib` provides an object-oriented interface for filesystem paths, replacing `os.path`.

**UZB:** `pathlib` fayl tizimi yo'llari uchun ob'ektga yo'naltirilgan interfeys taqdim etadi, `os.path` ni almashtiradi.

```python
from pathlib import Path

# Yo'l yaratish / Creating paths
home = Path.home()
current = Path.cwd()
project = Path("/home/user/projects/myapp")

# Yo'llarni birlashtirish / Joining paths
config = project / "config" / "settings.json"
print(config)  # /home/user/projects/myapp/config/settings.json

# Fayl tekshirishlari / File checks
p = Path("test.txt")
print(p.exists())    # True/False
print(p.is_file())   # True/False
print(p.is_dir())    # True/False

# Kengaytma / Extension
print(config.suffix)   # .json
print(config.stem)     # settings
print(config.name)     # settings.json
print(config.parent)   # /home/user/projects/myapp/config

# Fayllarni ko'rish / Listing files
src = Path("src")
src.mkdir(exist_ok=True)

# Glob
py_files = list(Path(".").glob("**/*.py"))

# O'qish/Yozish / Read/Write
text_file = Path("example.txt")
text_file.write_text("Salom, pathlib!", encoding="utf-8")
content = text_file.read_text(encoding="utf-8")
print(content)  # Salom, pathlib!

# JSON fayl
import json
json_file = Path("data.json")
json_file.write_text(json.dumps({"key": "value"}, indent=2))
```

---

## 43. Python'da `enum` / Enumerations in Python

**EN:** `Enum` creates a set of named constants, making code more readable and preventing invalid values.

**UZB:** `Enum` nomlangan konstantalar to'plamini yaratadi, kodni yanada o'qiluvchan qiladi va noto'g'ri qiymatlarni oldini oladi.

```python
from enum import Enum, auto, IntEnum

class Status(Enum):
    PENDING = "pending"
    ACTIVE = "active"
    INACTIVE = "inactive"
    DELETED = "deleted"

class Priority(IntEnum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    CRITICAL = 4

class Color(Enum):
    RED = auto()
    GREEN = auto()
    BLUE = auto()

# Ishlatish / Usage
order_status = Status.PENDING
print(order_status)           # Status.PENDING
print(order_status.value)     # pending
print(order_status.name)      # PENDING

# Taqqoslash / Comparison
print(Status.ACTIVE == Status.ACTIVE)    # True
print(Priority.HIGH > Priority.LOW)       # True (IntEnum)

# String dan / From string
s = Status("active")
print(s)  # Status.ACTIVE

# Iteration
for status in Status:
    print(f"  {status.name}: {status.value}")

# Amaliy
def process_order(status: Status):
    if status == Status.PENDING:
        return "Kutilmoqda..."
    elif status == Status.ACTIVE:
        return "Faol!"
    else:
        return "Nofaol"

print(process_order(Status.ACTIVE))  # Faol!
```

---

## 44. Python'da `logging` moduli / `logging` module

**EN:** `logging` is the standard way to add structured logging to Python applications.

**UZB:** `logging` Python ilovalariga tuzilgan logging qo'shishning standart usuli.

```python
import logging

# Asosiy sozlash / Basic setup
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s | %(levelname)-8s | %(name)s | %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

logger = logging.getLogger(__name__)

logger.debug("Debug ma'lumot")
logger.info("Dastur ishga tushdi")
logger.warning("Diqqat: xotira kam")
logger.error("Xato yuz berdi")
logger.critical("Kritik xato!")

# Handler bilan / With handlers
def setup_logger(name: str, log_file: str):
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    # Fayl handleri / File handler
    fh = logging.FileHandler(log_file)
    fh.setLevel(logging.WARNING)

    # Console handleri / Console handler
    ch = logging.StreamHandler()
    ch.setLevel(logging.DEBUG)

    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    fh.setFormatter(formatter)
    ch.setFormatter(formatter)

    logger.addHandler(fh)
    logger.addHandler(ch)
    return logger

app_logger = setup_logger("myapp", "app.log")
app_logger.info("Ilova ishga tushdi")
app_logger.error("Xato: ma'lumotlar bazasiga ulanib bo'lmadi")
```

---

## 45. Python'da `unittest` / Unit testing with `unittest`

**EN:** `unittest` is Python's built-in testing framework following the xUnit pattern.

**UZB:** `unittest` — xUnit naqshiga amal qiladigan Python'ning o'rnatilgan test freymvorki.

```python
import unittest

# Test qilinadigan kod / Code to test
def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Nolga bo'lish mumkin emas!")
    return a / b

class Calculator:
    def __init__(self):
        self.history = []

    def add(self, a, b):
        result = a + b
        self.history.append(f"{a}+{b}={result}")
        return result

# Test klassi / Test class
class TestMathFunctions(unittest.TestCase):

    def setUp(self):
        """Har test oldidan / Before each test"""
        self.calc = Calculator()

    def tearDown(self):
        """Har test keyin / After each test"""
        pass

    def test_add_positive(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(0, 0), 0)

    def test_add_negative(self):
        self.assertEqual(add(-1, -1), -2)
        self.assertEqual(add(-1, 1), 0)

    def test_divide_normal(self):
        self.assertAlmostEqual(divide(10, 3), 3.333, places=3)
        self.assertEqual(divide(10, 2), 5)

    def test_divide_by_zero(self):
        with self.assertRaises(ZeroDivisionError):
            divide(10, 0)

    def test_calculator_history(self):
        self.calc.add(1, 2)
        self.calc.add(3, 4)
        self.assertEqual(len(self.calc.history), 2)
        self.assertIn("1+2=3", self.calc.history)

    def test_types(self):
        self.assertIsInstance(add(1, 2), int)
        self.assertIsNone(None)
        self.assertTrue(True)
        self.assertFalse(False)

if __name__ == '__main__':
    unittest.main(verbosity=2)
```

---

## 46. Python'da `argparse` / Command-line arguments with `argparse`

**EN:** `argparse` parses command-line arguments for Python scripts.

**UZB:** `argparse` Python skriptlari uchun buyruq qatori argumentlarini tahlil qiladi.

```python
import argparse

def create_parser():
    parser = argparse.ArgumentParser(
        description="Ma'lumotlarni qayta ishlash vositasi",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )

    parser.add_argument("input", help="Kirish fayli yo'li")
    parser.add_argument("-o", "--output", default="output.csv",
                        help="Chiqish fayli yo'li")
    parser.add_argument("-n", "--count", type=int, default=100,
                        help="Qatorlar soni")
    parser.add_argument("-v", "--verbose", action="store_true",
                        help="Batafsil chiqish")
    parser.add_argument("--format", choices=["csv", "json", "xml"],
                        default="csv", help="Chiqish formati")

    return parser

# python script.py data.csv -o result.json -n 50 -v --format json
# args = parser.parse_args()
# print(args.input)   # data.csv
# print(args.verbose) # True
# print(args.count)   # 50

# Subcommands
parser = argparse.ArgumentParser()
subparsers = parser.add_subparsers(dest="command")

create_cmd = subparsers.add_parser("create", help="Yaratish")
create_cmd.add_argument("name", help="Nomi")

delete_cmd = subparsers.add_parser("delete", help="O'chirish")
delete_cmd.add_argument("id", type=int, help="ID")

# python script.py create myfile
# python script.py delete 42
```

---

## 47. Python'da `threading` asoslari / Threading basics

**EN:** Threading allows concurrent execution but is limited by the GIL for CPU-bound tasks. Best for I/O-bound work.

**UZB:** Threading parallel bajarishga imkon beradi, lekin CPU-bog'liq vazifalar uchun GIL bilan cheklangan. I/O-bog'liq ishlar uchun eng yaxshi.

```python
import threading
import time
import queue

# Oddiy thread / Simple thread
def download_file(url, result_queue):
    print(f"📥 Yuklanmoqda: {url}")
    time.sleep(2)  # I/O simulation
    result_queue.put(f"✅ {url} yuklandi")

urls = [
    "https://example.com/file1.zip",
    "https://example.com/file2.zip",
    "https://example.com/file3.zip",
]

result_queue = queue.Queue()
threads = []

start = time.time()
for url in urls:
    t = threading.Thread(target=download_file, args=(url, result_queue))
    threads.append(t)
    t.start()

for t in threads:
    t.join()  # barcha threadlar tugashini kutish

elapsed = time.time() - start
print(f"Jami vaqt: {elapsed:.2f}s")  # ~2s, not 6s!

while not result_queue.empty():
    print(result_queue.get())

# Thread-safe counter with Lock
class SafeCounter:
    def __init__(self):
        self.count = 0
        self.lock = threading.Lock()

    def increment(self):
        with self.lock:
            self.count += 1

counter = SafeCounter()
threads = [threading.Thread(target=counter.increment) for _ in range(1000)]
for t in threads: t.start()
for t in threads: t.join()
print(counter.count)  # 1000 — har doim to'g'ri
```

---

## 48. Python'da `asyncio` asoslari / `asyncio` basics

**EN:** `asyncio` provides cooperative concurrency using coroutines and event loop — ideal for I/O-bound tasks at scale.

**UZB:** `asyncio` koroutinalar va hodisa tsikli yordamida kooperativ parallellikni ta'minlaydi — miqyosda I/O-bog'liq vazifalar uchun ideal.

```python
import asyncio
import time

# Koroutin / Coroutine
async def fetch_data(url: str, delay: float) -> str:
    print(f"🌐 {url} dan so'rov yuborildi")
    await asyncio.sleep(delay)  # I/O simulation (non-blocking)
    return f"📦 {url} javob berdi"

# Ketma-ket / Sequential (sekin)
async def sequential():
    start = time.time()
    r1 = await fetch_data("api/users", 1.0)
    r2 = await fetch_data("api/posts", 1.5)
    r3 = await fetch_data("api/comments", 0.5)
    print(f"Ketma-ket: {time.time()-start:.2f}s")

# Parallel / Concurrent (tez)
async def concurrent():
    start = time.time()
    results = await asyncio.gather(
        fetch_data("api/users", 1.0),
        fetch_data("api/posts", 1.5),
        fetch_data("api/comments", 0.5),
    )
    print(f"Parallel: {time.time()-start:.2f}s")
    for r in results:
        print(f"  {r}")

# asyncio.run(sequential())  # ~3.0s
# asyncio.run(concurrent())  # ~1.5s — parallel!

# Task va timeout
async def with_timeout():
    try:
        result = await asyncio.wait_for(
            fetch_data("api/slow", 5.0),
            timeout=2.0
        )
    except asyncio.TimeoutError:
        print("⏰ Timeout!")

# asyncio.run(with_timeout())
```

---

## 49. Python'da `dataclasses` vs `Pydantic` / Dataclasses vs Pydantic

**EN:** Dataclasses are built-in and lightweight. Pydantic adds runtime validation, serialization, and is ideal for FastAPI.

**UZB:** Dataclasslar o'rnatilgan va engil. Pydantic ish vaqti tekshiruvi, seriallashtirish qo'shadi va FastAPI uchun ideal.

```python
from dataclasses import dataclass
from typing import Optional

# Dataclass — sodda, tez / Simple, fast
@dataclass
class UserDC:
    name: str
    age: int
    email: Optional[str] = None

user = UserDC("Ali", 25)
print(user)  # UserDC(name='Ali', age=25, email=None)

# Pydantic — tekshiruv bilan / With validation
try:
    from pydantic import BaseModel, EmailStr, validator, Field

    class UserPydantic(BaseModel):
        name: str = Field(..., min_length=2, max_length=50)
        age: int = Field(..., ge=0, le=150)
        email: str

        @validator('name')
        def name_must_be_capitalized(cls, v):
            return v.capitalize()

        class Config:
            json_encoders = {str: lambda v: v.strip()}

    user = UserPydantic(name="ali", age=25, email="ali@example.com")
    print(user.name)   # Ali — avtomatik capitalize

    # Xato tekshiruv / Validation error
    # UserPydantic(name="X", age=-1, email="not-email")
    # ValidationError: multiple errors

    # JSON / dict konversiya
    print(user.dict())
    print(user.json())

except ImportError:
    print("pip install pydantic")
```

---

## 50. Python'da `__init__.py` va paket tuzilmasi / Package structure

**EN:** `__init__.py` marks a directory as a Python package and controls what's exported.

**UZB:** `__init__.py` katalogni Python paketi sifatida belgilaydi va nima eksport qilinishini boshqaradi.

```
myapp/
├── __init__.py
├── main.py
├── models/
│   ├── __init__.py
│   ├── user.py
│   └── product.py
├── services/
│   ├── __init__.py
│   ├── auth.py
│   └── payment.py
└── utils/
    ├── __init__.py
    └── helpers.py
```

```python
# models/__init__.py
from .user import User
from .product import Product

__all__ = ['User', 'Product']  # from models import * uchun

# models/user.py
class User:
    def __init__(self, name: str):
        self.name = name

# main.py — sof import / Clean imports
from models import User, Product
from services.auth import authenticate
from utils.helpers import format_date

# Relative vs absolute imports
# models/product.py ichida
from .user import User          # relative — bir xil paket
from myapp.utils import helper  # absolute — to'liq yo'l

# __init__.py da versiya
# myapp/__init__.py
__version__ = "1.0.0"
__author__ = "Alyorjon"
```

---

## 51. Python'da `slots` va `__dict__` optimizatsiya / Memory optimization

**EN:** Understanding Python's memory model helps write memory-efficient code at scale.

**UZB:** Python'ning xotira modelini tushunish miqyosda xotira-samarali kod yozishga yordam beradi.

```python
import sys
import tracemalloc

# Xotira profili / Memory profiling
tracemalloc.start()

data = [{"id": i, "name": f"user_{i}"} for i in range(10000)]

snapshot = tracemalloc.take_snapshot()
top_stats = snapshot.statistics('lineno')[:3]
for stat in top_stats:
    print(stat)

# Xotira tejash usullari / Memory saving techniques
# 1. Generator o'rniga ro'yxat ishlatmang
total = sum(x**2 for x in range(1_000_000))   # ✅ Generator
# total = sum([x**2 for x in range(1_000_000)]) # ❌ List — ko'p xotira

# 2. __slots__ ishlatish
class PointWithSlots:
    __slots__ = ('x', 'y', 'z')
    def __init__(self, x, y, z):
        self.x, self.y, self.z = x, y, z

class PointWithDict:
    def __init__(self, x, y, z):
        self.x, self.y, self.z = x, y, z

p1 = PointWithSlots(1, 2, 3)
p2 = PointWithDict(1, 2, 3)
print(sys.getsizeof(p1))         # 56 bytes
print(sys.getsizeof(p2))         # 48 + 232 (dict) bytes

# 3. array moduli — tipli massivlar
import array
int_list = list(range(1000))     # ~8.7 KB
int_array = array.array('i', range(1000))  # ~4 KB
```

---

## 52. Python'da `contextlib` moduli / `contextlib` module

**EN:** `contextlib` provides utilities for working with context managers without writing full classes.

**UZB:** `contextlib` to'liq klass yozmasdan kontekst menejerlar bilan ishlash uchun yordamchi vositalarni taqdim etadi.

```python
from contextlib import (
    contextmanager, suppress, redirect_stdout,
    ExitStack, asynccontextmanager
)
import io

# contextmanager decorator
@contextmanager
def managed_resource(name):
    print(f"🟢 {name} ochildi")
    try:
        yield name.upper()
    except Exception as e:
        print(f"❌ Xato: {e}")
        raise
    finally:
        print(f"🔴 {name} yopildi")

with managed_resource("database") as db:
    print(f"Ishlatilmoqda: {db}")
# 🟢 database ochildi
# Ishlatilmoqda: DATABASE
# 🔴 database yopildi

# suppress — xatoni e'tiborsiz qoldirish
with suppress(FileNotFoundError):
    open("mavjud_emas.txt")  # xato yo'q!

# redirect_stdout — chiqishni ushlash
output = io.StringIO()
with redirect_stdout(output):
    print("Bu yashiringan")
    print("Bu ham")
captured = output.getvalue()
print(f"Ushlangan: {repr(captured)}")

# ExitStack — dinamik context managers
def open_files(filenames):
    with ExitStack() as stack:
        files = [stack.enter_context(open(f)) for f in filenames]
        # barcha fayllar bilan ishlash
        return [f.read() for f in files]
```

---

## 53. Python'da `pickle` va `shelve` / Serialization with `pickle` and `shelve`

**EN:** `pickle` serializes Python objects to binary format. `shelve` provides a persistent dictionary.

**UZB:** `pickle` Python ob'ektlarini ikkilik formatga seriallashtiradi. `shelve` doimiy lug'at taqdim etadi.

```python
import pickle
import shelve

# pickle — ob'ektni saqlash va yuklash
class MLModel:
    def __init__(self, weights):
        self.weights = weights
        self.trained = True

    def predict(self, x):
        return sum(w * xi for w, xi in zip(self.weights, x))

model = MLModel([0.5, 0.3, 0.2])

# Saqlash / Save
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

# Yuklash / Load
with open("model.pkl", "rb") as f:
    loaded_model = pickle.load(f)

print(loaded_model.predict([1, 2, 3]))  # 1.7

# pickle.dumps/loads — bytes bilan
data = {"user": "Ali", "scores": [1, 2, 3]}
serialized = pickle.dumps(data)
restored = pickle.loads(serialized)

# shelve — doimiy dict / Persistent dict
with shelve.open("mydb") as db:
    db["user_1"] = {"name": "Ali", "age": 25}
    db["user_2"] = {"name": "Vali", "age": 30}

with shelve.open("mydb") as db:
    print(db["user_1"])  # {'name': 'Ali', 'age': 25}
    print(list(db.keys()))  # ['user_1', 'user_2']

# ⚠️ Xavfsizlik / Security warning
# Noto'g'ri manbadan kelgan pickle fayllarini HECH QACHON yuklamang!
# Never unpickle data from untrusted sources!
```

---

## 54. Python'da `__call__` va callable ob'ektlar / `__call__` and callable objects

**EN:** `__call__` makes instances callable like functions, useful for stateful function-like objects.

**UZB:** `__call__` instanslarni funksiyalar kabi chaqirilishi mumkin qiladi, holatli funksiyasimon ob'ektlar uchun foydali.

```python
class Multiplier:
    def __init__(self, factor):
        self.factor = factor
        self.call_count = 0

    def __call__(self, value):
        self.call_count += 1
        return value * self.factor

triple = Multiplier(3)
print(triple(5))    # 15
print(triple(10))   # 30
print(triple.call_count)  # 2
print(callable(triple))   # True

# Amaliy: Rate limiter / Practical
import time

class RateLimiter:
    def __init__(self, max_calls, period):
        self.max_calls = max_calls
        self.period = period
        self.calls = []

    def __call__(self, func):
        def wrapper(*args, **kwargs):
            now = time.time()
            self.calls = [c for c in self.calls if now - c < self.period]
            if len(self.calls) >= self.max_calls:
                raise Exception(f"Rate limit: {self.max_calls} ta/{self.period}s")
            self.calls.append(now)
            return func(*args, **kwargs)
        return wrapper

@RateLimiter(max_calls=3, period=1.0)
def api_call(endpoint):
    return f"Response from {endpoint}"

for i in range(3):
    print(api_call(f"/api/v{i}"))

# 4-chi chaqiruv Rate limit xatosini chiqaradi
```

---

## 55. Python'da `Protocols` va Structural Subtyping / Protocols and Structural Subtyping

**EN:** `Protocol` (Python 3.8+) enables structural subtyping — "duck typing" with static type checking.

**UZB:** `Protocol` (Python 3.8+) struktural pastki tipizatsiyani yoqadi — statik tip tekshiruvi bilan "o'rdak tipizatsiyasi".

```python
from typing import Protocol, runtime_checkable

@runtime_checkable
class Drawable(Protocol):
    def draw(self) -> str: ...
    def get_area(self) -> float: ...

class Circle:
    def __init__(self, radius: float):
        self.radius = radius

    def draw(self) -> str:
        return f"⭕ Circle(r={self.radius})"

    def get_area(self) -> float:
        import math
        return math.pi * self.radius ** 2

class Square:
    def __init__(self, side: float):
        self.side = side

    def draw(self) -> str:
        return f"⬛ Square(s={self.side})"

    def get_area(self) -> float:
        return self.side ** 2

# Circle va Square Drawable ni import qilmadi!
# Lekin ular protokolni qondiradi / They satisfy the protocol

def render(shape: Drawable) -> None:
    print(f"{shape.draw()} | Area: {shape.get_area():.2f}")

shapes = [Circle(5), Square(4)]
for shape in shapes:
    render(shape)
# ⭕ Circle(r=5) | Area: 78.54
# ⬛ Square(s=4) | Area: 16.00

# Runtime tekshiruv
print(isinstance(Circle(1), Drawable))  # True
```

---

# 🔴 ADVANCED LEVEL (56–80)

---

## 56. GIL nima va unga munosabat? / What is the GIL and how to work around it?

**EN:** Global Interpreter Lock (GIL) allows only one thread to execute Python bytecode at a time, limiting CPU parallelism. Use `multiprocessing` or async for workarounds.

**UZB:** Global Interpreter Lock (GIL) bir vaqtda faqat bitta thread Python bayt kodini bajarishiga imkon beradi, CPU parallelligini cheklaydi. Yechim uchun `multiprocessing` yoki async dan foydalaning.

```python
import threading
import multiprocessing
import time

def cpu_heavy(n):
    """CPU-bound vazifa / CPU-bound task"""
    return sum(i * i for i in range(n))

# Threading — GIL sabab CPU uchun SEKIN
def threaded():
    threads = [threading.Thread(target=cpu_heavy, args=(5_000_000,))
               for _ in range(4)]
    start = time.time()
    for t in threads: t.start()
    for t in threads: t.join()
    return time.time() - start

# Multiprocessing — GIL bypass, TEZROQ
def multiprocessed():
    with multiprocessing.Pool(4) as pool:
        start = time.time()
        pool.map(cpu_heavy, [5_000_000] * 4)
        return time.time() - start

# print(f"Threading: {threaded():.2f}s")      # ~4s (sequential due to GIL)
# print(f"Multiprocessing: {multiprocessed():.2f}s")  # ~1.5s (true parallel)

# ProcessPoolExecutor
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor

# CPU-bound → ProcessPoolExecutor
with ProcessPoolExecutor(max_workers=4) as executor:
    futures = [executor.submit(cpu_heavy, 1_000_000) for _ in range(4)]
    results = [f.result() for f in futures]

# I/O-bound → ThreadPoolExecutor
import urllib.request

def fetch_url(url):
    # time.sleep(1)  # I/O simulation
    return f"Fetched: {url}"

with ThreadPoolExecutor(max_workers=10) as executor:
    urls = [f"https://example.com/{i}" for i in range(10)]
    results = list(executor.map(fetch_url, urls))
```

---

## 57. Python'da Metaclass / Metaclass in Python

**EN:** A metaclass is "a class of a class" — it controls class creation. `type` is the default metaclass.

**UZB:** Metaclass — "klassning klassi" — klass yaratilishini boshqaradi. `type` standart metaklass.

```python
# type bilan klass yaratish / Creating class with type
MyClass = type('MyClass', (object,), {
    'attr': 42,
    'method': lambda self: f"Hello, {self.attr}"
})

obj = MyClass()
print(obj.method())  # Hello, 42

# Metaclass
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=SingletonMeta):
    def __init__(self, url):
        self.url = url
        print(f"DB yaratildi: {url}")

db1 = Database("postgresql://localhost/mydb")  # Yaratildi
db2 = Database("postgresql://localhost/other") # Yaratilmadi
print(db1 is db2)   # True — bir xil ob'ekt

# Avtomatik validatsiya metaclass
class ValidatedMeta(type):
    def __new__(mcs, name, bases, namespace):
        for key, value in namespace.items():
            if key.startswith('_'):
                continue
            if callable(value) and not hasattr(value, '__annotations__'):
                raise TypeError(f"{key} metodida type hints yo'q!")
        return super().__new__(mcs, name, bases, namespace)

class StrictClass(metaclass=ValidatedMeta):
    def greet(self, name: str) -> str:  # ✅ type hints bor
        return f"Salom, {name}!"
```

---

## 58. Python'da Descriptor Protocol / Descriptor Protocol

**EN:** Descriptors customize attribute access using `__get__`, `__set__`, `__delete__` — the foundation of `property`, `classmethod`, `staticmethod`.

**UZB:** Descriptorlar `__get__`, `__set__`, `__delete__` yordamida atributlarga kirishni sozlaydi — `property`, `classmethod`, `staticmethod` asosi.

```python
class Validator:
    """Non-data descriptor / Ma'lumotlarsiz descriptor"""
    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = f"_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name, None)

    def __set__(self, obj, value):
        self.validate(value)
        setattr(obj, self.private_name, value)

    def validate(self, value):
        pass

class PositiveNumber(Validator):
    def validate(self, value):
        if not isinstance(value, (int, float)):
            raise TypeError(f"{self.name} son bo'lishi kerak")
        if value <= 0:
            raise ValueError(f"{self.name} musbat bo'lishi kerak")

class NonEmptyString(Validator):
    def validate(self, value):
        if not isinstance(value, str) or not value.strip():
            raise ValueError(f"{self.name} bo'sh bo'lishi mumkin emas")

class Product:
    name = NonEmptyString()
    price = PositiveNumber()
    quantity = PositiveNumber()

    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    @property
    def total_value(self):
        return self.price * self.quantity

p = Product("Laptop", 1500.0, 10)
print(p.total_value)  # 15000.0

# p.price = -100  # ValueError
# p.name = ""     # ValueError
```

---

## 59. Python'da `__new__` vs `__init__` / `__new__` vs `__init__`

**EN:** `__new__` creates the instance; `__init__` initializes it. Rarely need to override `__new__` except for immutable types or advanced patterns.

**UZB:** `__new__` instansni yaratadi; `__init__` uni ishga tushiradi. O'zgarmas turlar yoki ilg'or naqshlardan tashqari `__new__` ni kamdan-kam bekor qilish kerak.

```python
class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            print("Yangi instans yaratilmoqda...")
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, name):
        self.name = name

s1 = Singleton("First")   # Yangi instans yaratilmoqda...
s2 = Singleton("Second")  # Xabar yo'q
print(s1 is s2)            # True
print(s2.name)             # Second

# Immutable turlar uchun / For immutable types
class PositiveInt(int):
    def __new__(cls, value):
        if value <= 0:
            raise ValueError(f"Musbat son kerak, {value} berildi")
        return super().__new__(cls, value)

n = PositiveInt(5)
print(n + 3)   # 8 — int kabi ishlaydi
# PositiveInt(-1)  # ValueError

# Klass yaratish jarayoni / Class creation flow
class Example:
    def __new__(cls, *args, **kwargs):
        print(f"1. __new__ chaqirildi, {cls}")
        instance = super().__new__(cls)
        return instance

    def __init__(self, value):
        print(f"2. __init__ chaqirildi, value={value}")
        self.value = value

e = Example(42)
# 1. __new__ chaqirildi, <class 'Example'>
# 2. __init__ chaqirildi, value=42
```

---

## 60. Python'da `weakref` / Weak references in Python

**EN:** Weak references don't prevent garbage collection, useful for caches and avoiding circular references.

**UZB:** Zaif havolalar axlat yig'ishni oldini olmaydi, keshlar va doiraviy havolalardan qochish uchun foydali.

```python
import weakref
import gc

class HeavyObject:
    def __init__(self, name):
        self.name = name
        print(f"✅ {name} yaratildi")

    def __del__(self):
        print(f"🗑️ {self.name} o'chirildi")

# Oddiy havola / Strong reference
obj = HeavyObject("Resource")
strong_ref = obj          # ikkala havola ham ob'ektni ushlab turadi

del obj
del strong_ref            # endi o'chiriladi

# Zaif havola / Weak reference
obj2 = HeavyObject("WeakResource")
weak = weakref.ref(obj2)

print(weak())             # ob'ekt hali mavjud
del obj2
gc.collect()
print(weak())             # None — ob'ekt o'chirildi

# WeakValueDictionary — kesh uchun
cache = weakref.WeakValueDictionary()

def get_user(user_id):
    if user_id in cache:
        print(f"🎯 Cache hit: {user_id}")
        return cache[user_id]
    user = HeavyObject(f"User_{user_id}")
    cache[user_id] = user
    return user

u1 = get_user(1)   # Yaratildi
u2 = get_user(1)   # Cache hit!
del u1, u2
gc.collect()
get_user(1)        # Qayta yaratiladi — cache bo'sh
```

---

## 61. Python'da `abc` va Interface naqshi / Interface pattern with `abc`

**EN:** Combining ABC with abstract properties creates strict interface contracts.

**UZB:** ABC ni abstrakt xususiyatlar bilan birlashtirish qat'iy interfeys shartnomalari yaratadi.

```python
from abc import ABC, abstractmethod
from typing import List, Dict, Any

class Repository(ABC):
    """Generic Repository Interface"""

    @abstractmethod
    async def find_by_id(self, id: int) -> Dict[str, Any]:
        ...

    @abstractmethod
    async def find_all(self, skip: int = 0, limit: int = 100) -> List[Dict]:
        ...

    @abstractmethod
    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        ...

    @abstractmethod
    async def update(self, id: int, data: Dict[str, Any]) -> Dict[str, Any]:
        ...

    @abstractmethod
    async def delete(self, id: int) -> bool:
        ...

class InMemoryUserRepository(Repository):
    def __init__(self):
        self._storage: Dict[int, Dict] = {}
        self._counter = 0

    async def find_by_id(self, id: int) -> Dict:
        user = self._storage.get(id)
        if not user:
            raise ValueError(f"Foydalanuvchi {id} topilmadi")
        return user

    async def find_all(self, skip=0, limit=100) -> List[Dict]:
        values = list(self._storage.values())
        return values[skip:skip+limit]

    async def create(self, data: Dict) -> Dict:
        self._counter += 1
        data["id"] = self._counter
        self._storage[self._counter] = data
        return data

    async def update(self, id: int, data: Dict) -> Dict:
        if id not in self._storage:
            raise ValueError(f"Foydalanuvchi {id} topilmadi")
        self._storage[id].update(data)
        return self._storage[id]

    async def delete(self, id: int) -> bool:
        return self._storage.pop(id, None) is not None

# PostgreSQL implementation almashtirish oson / Easy to swap
class PostgresUserRepository(Repository):
    def __init__(self, db_pool):
        self.pool = db_pool

    async def find_by_id(self, id: int) -> Dict:
        async with self.pool.acquire() as conn:
            row = await conn.fetchrow("SELECT * FROM users WHERE id=$1", id)
            return dict(row)
    # ... boshqalari
```

---

## 62. Python'da `__getattr__` va `__getattribute__` / `__getattr__` vs `__getattribute__`

**EN:** `__getattribute__` is called for every attribute access. `__getattr__` is called only when the attribute is NOT found normally.

**UZB:** `__getattribute__` har bir atributga kirishda chaqiriladi. `__getattr__` faqat atribut odatiy topilmaganida chaqiriladi.

```python
class DynamicConfig:
    def __init__(self, data: dict):
        object.__setattr__(self, '_data', data)

    def __getattr__(self, name):
        """Faqat atribut topilmaganida / Only when not found"""
        data = object.__getattribute__(self, '_data')
        if name in data:
            return data[name]
        raise AttributeError(f"Konfiguratsiya '{name}' topilmadi")

    def __setattr__(self, name, value):
        data = object.__getattribute__(self, '_data')
        data[name] = value

    def __repr__(self):
        return f"Config({self._data})"

config = DynamicConfig({
    "db_host": "localhost",
    "db_port": 5432,
    "debug": True
})

print(config.db_host)    # localhost
print(config.db_port)    # 5432
config.new_setting = "value"
print(config.new_setting) # value

# Proxy naqshi / Proxy pattern
class APIProxy:
    def __init__(self, client):
        self._client = client

    def __getattr__(self, name):
        """Chaqiruvlarni klient ga yo'naltirish"""
        method = getattr(self._client, name)
        def logged_method(*args, **kwargs):
            print(f"📞 {name}({args}, {kwargs}) chaqirilmoqda")
            result = method(*args, **kwargs)
            print(f"✅ {name} → {result}")
            return result
        return logged_method
```

---

## 63. Python'da `async` generators va `async` context managers

**EN:** Async generators use `async def` with `yield`. Async context managers use `__aenter__` and `__aexit__`.

**UZB:** Async generatorlar `yield` bilan `async def` dan foydalanadi. Async kontekst menejerlar `__aenter__` va `__aexit__` dan foydalanadi.

```python
import asyncio
from contextlib import asynccontextmanager

# Async generator
async def async_range(start, stop, delay=0.1):
    for i in range(start, stop):
        await asyncio.sleep(delay)  # async I/O
        yield i

# Async context manager (class)
class AsyncDatabase:
    async def __aenter__(self):
        print("🔌 DB ga ulandi (async)")
        await asyncio.sleep(0.1)  # connection simulation
        return self

    async def __aexit__(self, *args):
        print("🔴 DB dan uzildi (async)")
        await asyncio.sleep(0.05)

    async def query(self, sql):
        await asyncio.sleep(0.1)
        return [{"id": 1, "name": "Ali"}]

# asynccontextmanager decorator
@asynccontextmanager
async def async_timer(label):
    import time
    start = time.time()
    yield
    elapsed = time.time() - start
    print(f"⏱ {label}: {elapsed:.3f}s")

async def main():
    # Async generator ishlatish
    async for num in async_range(0, 5):
        print(num, end=" ")
    print()

    # Async context manager
    async with AsyncDatabase() as db:
        rows = await db.query("SELECT * FROM users")
        print(rows)

    # Async timer
    async with async_timer("Hisoblash"):
        await asyncio.gather(
            asyncio.sleep(0.3),
            asyncio.sleep(0.2),
        )

# asyncio.run(main())
```

---

## 64. Python'da `functools.wraps` va dekorator zanjiri / Decorator chaining

**EN:** Multiple decorators stack from bottom to top. `functools.wraps` preserves the original function's metadata.

**UZB:** Bir nechta dekoratorlar pastdan yuqoriga to'planadi. `functools.wraps` asl funksiyaning metama'lumotlarini saqlaydi.

```python
import functools
import time
import logging

logger = logging.getLogger(__name__)

def log_call(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        logger.info(f"📞 {func.__name__} chaqirildi")
        result = func(*args, **kwargs)
        logger.info(f"✅ {func.__name__} tugadi")
        return result
    return wrapper

def retry(max_attempts=3, delay=1.0, exceptions=(Exception,)):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_attempts:
                        raise
                    print(f"⚠️ Urinish {attempt} muvaffaqiyatsiz: {e}. Qayta urinilmoqda...")
                    time.sleep(delay)
        return wrapper
    return decorator

def cache_result(ttl_seconds=60):
    cache = {}
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args):
            now = time.time()
            if args in cache:
                result, timestamp = cache[args]
                if now - timestamp < ttl_seconds:
                    print(f"🎯 Cache hit: {args}")
                    return result
            result = func(*args)
            cache[args] = (result, now)
            return result
        return wrapper
    return decorator

# Dekoratorlarni zanjirda qo'llash
@log_call
@retry(max_attempts=3, delay=0.5)
@cache_result(ttl_seconds=30)
def fetch_user_data(user_id: int) -> dict:
    # API call simulation
    if user_id == 999:
        raise ConnectionError("Server yo'q!")
    return {"id": user_id, "name": f"User_{user_id}"}

# __name__ saqlanadi
print(fetch_user_data.__name__)  # fetch_user_data (not wrapper!)
```

---

## 65. Python'da `__init_subclass__` / `__init_subclass__` hook

**EN:** `__init_subclass__` is called when a class is subclassed, enabling plugin-like patterns.

**UZB:** `__init_subclass__` klass pastki klassga ega bo'lganda chaqiriladi, plaginsimon naqshlarni yoqadi.

```python
class Plugin:
    _registry = {}

    def __init_subclass__(cls, plugin_name=None, **kwargs):
        super().__init_subclass__(**kwargs)
        name = plugin_name or cls.__name__.lower()
        Plugin._registry[name] = cls
        print(f"📦 Plugin ro'yxatga olindi: {name}")

    @classmethod
    def get(cls, name):
        if name not in cls._registry:
            raise ValueError(f"Plugin '{name}' topilmadi")
        return cls._registry[name]()

    def execute(self):
        raise NotImplementedError

class CSVPlugin(Plugin, plugin_name="csv"):
    def execute(self):
        return "CSV faylini qayta ishlash"

class JSONPlugin(Plugin, plugin_name="json"):
    def execute(self):
        return "JSON faylini qayta ishlash"

class XMLPlugin(Plugin, plugin_name="xml"):
    def execute(self):
        return "XML faylini qayta ishlash"

# Plugins registration:
# 📦 Plugin ro'yxatga olindi: csv
# 📦 Plugin ro'yxatga olindi: json
# 📦 Plugin ro'yxatga olindi: xml

print(Plugin._registry.keys())  # dict_keys(['csv', 'json', 'xml'])

plugin = Plugin.get("json")
print(plugin.execute())  # JSON faylini qayta ishlash
```

---

## 66. Python'da `__class_getitem__` va Generic turlar / Generic types

**EN:** `__class_getitem__` enables `Class[T]` syntax for generic types, like `List[int]`.

**UZB:** `__class_getitem__` `List[int]` kabi generik turlar uchun `Class[T]` sintaksisini yoqadi.

```python
from typing import Generic, TypeVar, Iterator

T = TypeVar('T')
K = TypeVar('K')
V = TypeVar('V')

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        if not self._items:
            raise IndexError("Stack bo'sh!")
        return self._items.pop()

    def peek(self) -> T:
        if not self._items:
            raise IndexError("Stack bo'sh!")
        return self._items[-1]

    def __len__(self) -> int:
        return len(self._items)

    def __iter__(self) -> Iterator[T]:
        return reversed(self._items)

    def __repr__(self) -> str:
        return f"Stack({self._items})"

# Type-safe ishlatish
int_stack: Stack[int] = Stack()
int_stack.push(1)
int_stack.push(2)
int_stack.push(3)
print(int_stack.peek())  # 3
print(int_stack.pop())   # 3
print(int_stack)         # Stack([1, 2])

str_stack: Stack[str] = Stack()
str_stack.push("hello")
str_stack.push("world")

# Typed Dict
class TypedCache(Generic[K, V]):
    def __init__(self):
        self._cache: dict[K, V] = {}

    def set(self, key: K, value: V) -> None:
        self._cache[key] = value

    def get(self, key: K) -> V | None:
        return self._cache.get(key)
```

---

## 67. Python'da `sys.settrace` va profiling / Profiling in Python

**EN:** Python provides built-in profiling tools (`cProfile`, `profile`) to find performance bottlenecks.

**UZB:** Python ishlash muammolarini topish uchun o'rnatilgan profiling vositalarini (`cProfile`, `profile`) taqdim etadi.

```python
import cProfile
import pstats
import io
from pstats import SortKey

def slow_function():
    return sum(i**2 for i in range(100_000))

def fast_function():
    n = 100_000
    return n * (n-1) * (2*n-1) // 6  # Gauss formula

def main():
    a = slow_function()
    b = fast_function()
    return a, b

# cProfile bilan / With cProfile
pr = cProfile.Profile()
pr.enable()
result = main()
pr.disable()

stream = io.StringIO()
ps = pstats.Stats(pr, stream=stream).sort_stats(SortKey.CUMULATIVE)
ps.print_stats(10)  # top 10
print(stream.getvalue())

# line_profiler (tashqi / external)
# pip install line-profiler
# @profile  # decorator
# def my_function():
#     ...
# kernprof -l script.py

# memory_profiler (tashqi / external)
# pip install memory-profiler
# @memory_profiler.profile
# def memory_heavy():
#     ...

# timeit — kichik kod parchalari uchun / For small code snippets
import timeit

slow_time = timeit.timeit(slow_function, number=10)
fast_time = timeit.timeit(fast_function, number=10)
print(f"Sekin: {slow_time:.4f}s")
print(f"Tez: {fast_time:.6f}s")
print(f"Farq: {slow_time/fast_time:.0f}x")
```

---

## 68. Python'da `ast` moduli / Abstract Syntax Tree

**EN:** The `ast` module allows parsing, analyzing, and transforming Python source code.

**UZB:** `ast` moduli Python manba kodini tahlil qilish, o'rganish va o'zgartirishga imkon beradi.

```python
import ast

# Kod tahlili / Code analysis
code = """
def add(a, b):
    return a + b

class MyClass:
    def method(self):
        x = 1 + 2
        return x * 3
"""

tree = ast.parse(code)

# AST ni chop etish / Print AST
print(ast.dump(tree, indent=2))

# Funksiyalar va klasslarni topish / Find functions and classes
class CodeAnalyzer(ast.NodeVisitor):
    def __init__(self):
        self.functions = []
        self.classes = []

    def visit_FunctionDef(self, node):
        self.functions.append({
            "name": node.name,
            "line": node.lineno,
            "args": [a.arg for a in node.args.args]
        })
        self.generic_visit(node)

    def visit_ClassDef(self, node):
        self.classes.append({
            "name": node.name,
            "line": node.lineno
        })
        self.generic_visit(node)

analyzer = CodeAnalyzer()
analyzer.visit(tree)
print("Funksiyalar:", analyzer.functions)
print("Klasslar:", analyzer.classes)

# Ifodalani baholash / Evaluate expression safely
def safe_eval(expression: str) -> float:
    """Faqat matematika ifodalarini baholash"""
    try:
        tree = ast.parse(expression, mode='eval')
        # Faqat ruxsat etilgan nodlar
        allowed = (ast.Expression, ast.BinOp, ast.UnaryOp,
                   ast.Num, ast.Constant, ast.Add, ast.Sub,
                   ast.Mult, ast.Div, ast.Pow)
        for node in ast.walk(tree):
            if not isinstance(node, allowed):
                raise ValueError(f"Ruxsat etilmagan: {type(node)}")
        return eval(compile(tree, '<string>', 'eval'))
    except Exception as e:
        raise ValueError(f"Noto'g'ri ifoda: {e}")

print(safe_eval("2 + 3 * 4"))  # 14.0
```

---

## 69. Python'da `ctypes` va C integratsiyasi / C integration with `ctypes`

**EN:** `ctypes` allows calling C functions from shared libraries directly from Python.

**UZB:** `ctypes` Python dan to'g'ridan-to'g'ri umumiy kutubxonalardan C funksiyalarini chaqirish imkonini beradi.

```python
import ctypes
import ctypes.util

# Tizim kutubxonasiga murojaat / Accessing system library
libc_path = ctypes.util.find_library('c')
libc = ctypes.CDLL(libc_path)

# strlen funksiyasi
libc.strlen.argtypes = [ctypes.c_char_p]
libc.strlen.restype = ctypes.c_size_t

text = b"Hello, Python!"
length = libc.strlen(text)
print(f"Uzunlik: {length}")  # 14

# Math kutubxonasi / Math library
libm_path = ctypes.util.find_library('m')
libm = ctypes.CDLL(libm_path)

libm.sqrt.argtypes = [ctypes.c_double]
libm.sqrt.restype = ctypes.c_double

print(libm.sqrt(16.0))  # 4.0

# Struct / C struct
class Point(ctypes.Structure):
    _fields_ = [
        ("x", ctypes.c_double),
        ("y", ctypes.c_double)
    ]

p = Point(3.0, 4.0)
print(f"Nuqta: ({p.x}, {p.y})")

# Array
IntArray5 = ctypes.c_int * 5
arr = IntArray5(1, 2, 3, 4, 5)
print(list(arr))  # [1, 2, 3, 4, 5]

# Cffi (zamonaviy variant / Modern alternative)
# pip install cffi
# from cffi import FFI
# ffi = FFI()
```

---

## 70. Python'da `__missing__` va maxsus dict / `__missing__` and custom dict

**EN:** `__missing__` is called when a key is not found in a dict subclass.

**UZB:** `__missing__` dict quyi klassida kalit topilmaganida chaqiriladi.

```python
class AutoDict(dict):
    """Mavjud bo'lmagan kalitlar uchun default qiymat / Default for missing keys"""
    def __missing__(self, key):
        self[key] = default = []
        return default

d = AutoDict()
d["a"].append(1)
d["a"].append(2)
d["b"].append(3)
print(d)  # {'a': [1, 2], 'b': [3]}

# Fayl keshi / File cache
class FileCache(dict):
    def __missing__(self, filepath):
        print(f"📂 O'qilmoqda: {filepath}")
        try:
            with open(filepath) as f:
                content = f.read()
        except FileNotFoundError:
            content = None
        self[filepath] = content
        return content

cache = FileCache()
# Birinchi marta o'qiydi / Reads first time
content = cache["README.md"]
# Ikkinchi marta keshdan / From cache second time
content = cache["README.md"]

# Nested defaultdict alternative
class NestedDict(dict):
    def __missing__(self, key):
        self[key] = NestedDict()
        return self[key]

data = NestedDict()
data["users"]["admin"]["permissions"] = ["read", "write"]
print(data["users"]["admin"]["permissions"])  # ['read', 'write']
print(data["nonexistent"]["key"])  # NestedDict() — xato yo'q
```

---

## 71. Python'da `multiprocessing` va shared memory / Shared memory in multiprocessing

**EN:** Sharing data between processes requires special mechanisms since each process has its own memory space.

**UZB:** Jarayonlar o'rtasida ma'lumot almashish maxsus mexanizmlarni talab qiladi, chunki har bir jarayon o'z xotira maydoniga ega.

```python
import multiprocessing as mp
from multiprocessing import shared_memory
import numpy as np

# Manager bilan umumiy ma'lumotlar / Shared data with Manager
def worker(shared_list, shared_dict, lock, worker_id):
    with lock:
        shared_list.append(worker_id)
        shared_dict[f"worker_{worker_id}"] = worker_id * 2

if __name__ == "__main__":
    with mp.Manager() as manager:
        shared_list = manager.list()
        shared_dict = manager.dict()
        lock = manager.Lock()

        processes = [
            mp.Process(target=worker, args=(shared_list, shared_dict, lock, i))
            for i in range(5)
        ]

        for p in processes: p.start()
        for p in processes: p.join()

        print(list(shared_list))  # [0, 1, 2, 3, 4] (tartib farq qilishi mumkin)
        print(dict(shared_dict))

    # Queue bilan / With Queue
    def producer(q, n):
        for i in range(n):
            q.put(i * i)
        q.put(None)  # sentinel

    def consumer(q, results):
        while True:
            item = q.get()
            if item is None:
                break
            results.append(item)

    q = mp.Queue()
    results = mp.Manager().list()

    p1 = mp.Process(target=producer, args=(q, 5))
    p2 = mp.Process(target=consumer, args=(q, results))

    p1.start(); p2.start()
    p1.join(); p2.join()
```

---

## 72. Python'da `typing.Protocol` va Structural Pattern Matching / Pattern Matching (Python 3.10+)

**EN:** Structural pattern matching (`match/case`) provides powerful pattern-based dispatch, similar to switch but far more powerful.

**UZB:** Struktural naqsh moslashish (`match/case`) naqshga asoslangan kuchli jo'natmani ta'minlaydi, switch ga o'xshash, lekin ancha kuchliroq.

```python
# Python 3.10+
from dataclasses import dataclass
from typing import Union

@dataclass
class Point:
    x: float
    y: float

@dataclass
class Circle:
    center: Point
    radius: float

@dataclass
class Rectangle:
    top_left: Point
    bottom_right: Point

Shape = Union[Point, Circle, Rectangle]

def describe_shape(shape: Shape) -> str:
    match shape:
        case Point(x=0, y=0):
            return "Koordinata markazi"
        case Point(x=x, y=0):
            return f"X o'qida: x={x}"
        case Point(x=0, y=y):
            return f"Y o'qida: y={y}"
        case Point(x=x, y=y):
            return f"Nuqta: ({x}, {y})"
        case Circle(center=Point(x=0, y=0), radius=r):
            return f"Markaziy doira, r={r}"
        case Circle(center=c, radius=r):
            return f"Doira: markaz={c}, r={r}"
        case Rectangle(top_left=Point(x=x1, y=y1),
                       bottom_right=Point(x=x2, y=y2)):
            area = abs((x2-x1) * (y2-y1))
            return f"To'rtburchak: yuz={area}"
        case _:
            return "Noma'lum shakl"

print(describe_shape(Point(0, 0)))    # Koordinata markazi
print(describe_shape(Point(3, 0)))    # X o'qida: x=3
print(describe_shape(Circle(Point(0,0), 5)))  # Markaziy doira, r=5

# HTTP status kodi / HTTP status matching
def handle_status(status: int, data: dict) -> str:
    match status:
        case 200 | 201:
            return f"✅ Muvaffaqiyat: {data.get('message', 'OK')}"
        case 400:
            return f"❌ Noto'g'ri so'rov: {data.get('error')}"
        case 401 | 403:
            return "🔒 Ruxsat yo'q"
        case 404:
            return "🔍 Topilmadi"
        case 500 | 502 | 503:
            return "💥 Server xatosi"
        case code if 400 <= code < 500:
            return f"⚠️ Client xatosi: {code}"
        case _:
            return f"❓ Noma'lum status: {status}"
```

---

## 73. Python'da `__set_name__` va Descriptor Factory / Descriptor Factory

**EN:** `__set_name__` is called during class creation, passing the attribute name automatically to the descriptor.

**UZB:** `__set_name__` klass yaratilishida chaqiriladi, atribut nomini descriptorga avtomatik uzatadi.

```python
from typing import Type, TypeVar, Any, Callable

T = TypeVar('T')

class TypedField:
    """Kuchli tipli maydon / Strongly typed field"""
    def __init__(self, expected_type: Type, nullable: bool = False):
        self.expected_type = expected_type
        self.nullable = nullable
        self.name = None  # __set_name__ to'ldiradi

    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = f"_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name, None)

    def __set__(self, obj, value):
        if value is None and self.nullable:
            setattr(obj, self.private_name, value)
            return
        if not isinstance(value, self.expected_type):
            raise TypeError(
                f"{self.name}: kutilgan {self.expected_type.__name__}, "
                f"berildi {type(value).__name__}"
            )
        setattr(obj, self.private_name, value)

class RangeField:
    """Diapazondagi son maydoni / Ranged number field"""
    def __init__(self, min_val=None, max_val=None):
        self.min_val = min_val
        self.max_val = max_val

    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = f"_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None: return self
        return getattr(obj, self.private_name, None)

    def __set__(self, obj, value):
        if self.min_val is not None and value < self.min_val:
            raise ValueError(f"{self.name} >= {self.min_val} bo'lishi kerak")
        if self.max_val is not None and value > self.max_val:
            raise ValueError(f"{self.name} <= {self.max_val} bo'lishi kerak")
        setattr(obj, self.private_name, value)

class Employee:
    name = TypedField(str)
    department = TypedField(str)
    salary = RangeField(min_val=500_000, max_val=100_000_000)
    age = RangeField(min_val=18, max_val=70)

    def __init__(self, name, department, salary, age):
        self.name = name
        self.department = department
        self.salary = salary
        self.age = age

emp = Employee("Ali", "IT", 5_000_000, 25)
print(emp.name, emp.salary)

# emp.age = 15  # ValueError: age >= 18 bo'lishi kerak
# emp.name = 123  # TypeError: name: kutilgan str, berildi int
```

---

## 74. Python'da `asyncio` ilg'or naqshlari / Advanced asyncio patterns

**EN:** Advanced async patterns include semaphores, queues, event broadcasting, and cancellation.

**UZB:** Ilg'or async naqshlarga semaforlar, navbatlar, hodisa tarqatish va bekor qilish kiradi.

```python
import asyncio
from asyncio import Queue, Semaphore, Event

# Semaphore — bir vaqtda cheklash / Rate limiting
async def fetch_with_limit(url: str, semaphore: Semaphore) -> str:
    async with semaphore:
        await asyncio.sleep(0.1)  # API call
        return f"✅ {url}"

async def batch_fetch(urls: list, max_concurrent: int = 5):
    sem = Semaphore(max_concurrent)
    tasks = [fetch_with_limit(url, sem) for url in urls]
    return await asyncio.gather(*tasks)

# Producer-Consumer with Queue
async def producer(queue: Queue, n: int):
    for i in range(n):
        item = f"item_{i}"
        await queue.put(item)
        print(f"📤 {item} qo'shildi")
        await asyncio.sleep(0.1)
    await queue.put(None)  # sentinel

async def consumer(queue: Queue, name: str):
    while True:
        item = await queue.get()
        if item is None:
            queue.task_done()
            break
        print(f"📥 {name}: {item} qayta ishlandi")
        await asyncio.sleep(0.2)
        queue.task_done()

# Event — signal / Signaling between tasks
async def waiter(event: Event, name: str):
    print(f"{name} kutmoqda...")
    await event.wait()
    print(f"{name} signal oldi!")

async def signaler(event: Event):
    await asyncio.sleep(1)
    print("Signal yuborilmoqda!")
    event.set()

# Task cancellation
async def long_running_task():
    try:
        await asyncio.sleep(100)  # simulating long work
    except asyncio.CancelledError:
        print("Task bekor qilindi, tozalanmoqda...")
        raise  # muhim: har doim re-raise

async def main():
    task = asyncio.create_task(long_running_task())
    await asyncio.sleep(1)
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("Task muvaffaqiyatli bekor qilindi")

# asyncio.run(main())
```

---

## 75. Python'da `importlib` va dinamik import / Dynamic imports with `importlib`

**EN:** `importlib` allows dynamic module loading at runtime — useful for plugin systems.

**UZB:** `importlib` ish vaqtida dinamik modul yuklashga imkon beradi — plagin tizimlari uchun foydali.

```python
import importlib
import importlib.util
import sys
from pathlib import Path

# Dinamik import / Dynamic import
module_name = "json"
json_module = importlib.import_module(module_name)
print(json_module.dumps({"key": "value"}))  # {"key": "value"}

# Fayl yo'li orqali import / Import from file path
def load_plugin(plugin_path: str):
    path = Path(plugin_path)
    spec = importlib.util.spec_from_file_location(
        path.stem, path
    )
    module = importlib.util.module_from_spec(spec)
    sys.modules[path.stem] = module
    spec.loader.exec_module(module)
    return module

# Plagin ro'yxati / Plugin registry
class PluginManager:
    def __init__(self):
        self.plugins = {}

    def register(self, name: str, module_path: str):
        try:
            module = importlib.import_module(module_path)
            self.plugins[name] = module
            print(f"✅ {name} plugini yuklandi")
        except ImportError as e:
            print(f"❌ {name} yuklab bo'lmadi: {e}")

    def get_plugin(self, name: str):
        if name not in self.plugins:
            raise ValueError(f"Plugin '{name}' topilmadi")
        return self.plugins[name]

    def reload_plugin(self, name: str):
        if name in self.plugins:
            importlib.reload(self.plugins[name])
            print(f"🔄 {name} qayta yuklandi")

manager = PluginManager()
manager.register("json", "json")
manager.register("os", "os")

# Import lazimmi tekshirish / Check if importable
def is_available(package: str) -> bool:
    return importlib.util.find_spec(package) is not None

print(is_available("fastapi"))   # True/False
print(is_available("pydantic"))  # True/False
print(is_available("xyzabc"))    # False
```

---

## 76. Python'da `__enter__` va `__exit__` murakkab holatlar / Advanced context manager scenarios

**EN:** Context managers can suppress exceptions, manage multiple resources, and handle async scenarios.

**UZB:** Kontekst menejerlar xatolarni bostirib qo'yishi, bir nechta resurslarni boshqarishi va asinxron stsenariylarni boshqarishi mumkin.

```python
from contextlib import ExitStack, suppress
import contextlib

# Transaction manager
class Transaction:
    def __init__(self, db):
        self.db = db
        self.operations = []

    def __enter__(self):
        self.db.begin()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is None:
            self.db.commit()
            print("✅ Commit qilindi")
        else:
            self.db.rollback()
            print(f"🔄 Rollback qilindi: {exc_val}")
        return False  # Xatoni bostirib qo'ymaymiz

# Bir nechta fayllar bilan ishlash / Working with multiple files
def process_files(input_files: list, output_file: str):
    with ExitStack() as stack:
        files = [
            stack.enter_context(open(f, 'r', encoding='utf-8'))
            for f in input_files
        ]
        out = stack.enter_context(open(output_file, 'w', encoding='utf-8'))

        for f in files:
            out.write(f.read())
            out.write("\n")

# Temp katalog / Temp directory
import tempfile
import os

@contextlib.contextmanager
def temp_directory():
    import tempfile
    import shutil
    tmpdir = tempfile.mkdtemp()
    try:
        yield tmpdir
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)

with temp_directory() as tmpdir:
    # Test fayllar yaratish
    test_file = os.path.join(tmpdir, "test.txt")
    with open(test_file, 'w') as f:
        f.write("test data")
    print(f"Temp fayl: {test_file}")
# tmpdir avtomatik o'chiriladi
```

---

## 77. Python'da `slots` va `__weakref__` / `__slots__` with `__weakref__`

**EN:** When using `__slots__`, weak references require explicitly adding `'__weakref__'` to slots.

**UZB:** `__slots__` ishlatilganda, zaif havolalar uchun `'__weakref__'` ni slotlarga aniq qo'shish kerak.

```python
import weakref
import sys

class OptimizedNode:
    __slots__ = ('value', 'next', 'prev', '__weakref__')

    def __init__(self, value):
        self.value = value
        self.next = None
        self.prev = None

class DoublyLinkedList:
    __slots__ = ('head', 'tail', '_size')

    def __init__(self):
        self.head = None
        self.tail = None
        self._size = 0

    def append(self, value):
        node = OptimizedNode(value)
        if self.tail:
            self.tail.next = node
            node.prev = self.tail
        else:
            self.head = node
        self.tail = node
        self._size += 1

    def prepend(self, value):
        node = OptimizedNode(value)
        if self.head:
            node.next = self.head
            self.head.prev = node
        else:
            self.tail = node
        self.head = node
        self._size += 1

    def __len__(self):
        return self._size

    def __iter__(self):
        current = self.head
        while current:
            yield current.value
            current = current.next

dll = DoublyLinkedList()
for i in range(5):
    dll.append(i)

print(list(dll))          # [0, 1, 2, 3, 4]
print(len(dll))           # 5
print(sys.getsizeof(dll.head))  # slots yordamida kichikroq

# Zaif havola ishlaydi chunki __weakref__ slots da
weak_head = weakref.ref(dll.head)
print(weak_head().value)  # 0
```

---

## 78. Python'da `__buffer__` va Bytes protokoli / Buffer protocol

**EN:** The buffer protocol allows objects to expose raw byte arrays for zero-copy data sharing between C extensions and Python.

**UZB:** Buffer protokoli ob'ektlarga C kengaytmalari va Python o'rtasida nolsiz-nusxa ma'lumot almashish uchun xom bayt massivlarini ochish imkonini beradi.

```python
import struct
import memoryview

# memoryview — nusxasiz kirish / Zero-copy access
data = bytearray(b"Hello, World!")
view = memoryview(data)

# Kesmalar nusxa qilmaydi / Slices don't copy
first_5 = view[:5]
print(bytes(first_5))  # b'Hello'

# O'zgartirish / Modify in-place
view[0] = ord('h')
print(data)  # bytearray(b'hello, World!')

# struct — C-like tuzilmalar / C-like structures
# Tarmoq paketi simulyatsiyasi / Network packet simulation
HEADER_FORMAT = '!HHI'  # 2 uint16 + 1 uint32 (big-endian)
# ! = network (big-endian), H = unsigned short, I = unsigned int

def create_packet(msg_type: int, seq_num: int, payload: bytes) -> bytes:
    header = struct.pack(HEADER_FORMAT, msg_type, seq_num, len(payload))
    return header + payload

def parse_packet(data: bytes) -> dict:
    header_size = struct.calcsize(HEADER_FORMAT)
    msg_type, seq_num, payload_len = struct.unpack(
        HEADER_FORMAT, data[:header_size]
    )
    payload = data[header_size:header_size + payload_len]
    return {
        "type": msg_type,
        "seq": seq_num,
        "payload": payload
    }

packet = create_packet(1, 42, b"Hello!")
parsed = parse_packet(packet)
print(parsed)  # {'type': 1, 'seq': 42, 'payload': b'Hello!'}

# array.array — typed arrays
import array
floats = array.array('d', [1.0, 2.0, 3.0, 4.0])
view = memoryview(floats)
print(view[1])   # 2.0
```

---

## 79. Python'da `inspect` moduli / `inspect` module

**EN:** `inspect` provides tools for examining live objects — functions, classes, frames, source code.

**UZB:** `inspect` jonli ob'ektlarni — funksiyalar, klasslar, freymlar, manba kodni tekshirish uchun vositalar taqdim etadi.

```python
import inspect
from typing import get_type_hints

def complex_function(
    name: str,
    age: int = 25,
    *args: str,
    city: str = "Tashkent",
    **kwargs: int
) -> dict:
    """Bu murakkab funksiya / This is a complex function"""
    return {"name": name, "age": age}

# Parametrlar / Parameters
sig = inspect.signature(complex_function)
for param_name, param in sig.parameters.items():
    print(f"  {param_name}: kind={param.kind.name}, "
          f"default={param.default}, annotation={param.annotation}")

# Type hints
hints = get_type_hints(complex_function)
print(hints)

# Manba kod / Source code
print(inspect.getsource(complex_function))

# Modul / Module info
print(inspect.getfile(inspect))

# Frame introspection
def get_caller_info():
    frame = inspect.currentframe()
    caller = inspect.getouterframes(frame)[1]
    return {
        "filename": caller.filename,
        "function": caller.function,
        "lineno": caller.lineno
    }

def some_function():
    info = get_caller_info()
    print(f"Chaqiruvchi: {info}")

some_function()

# Klass introspection
class MyClass:
    class_var = 42

    def method(self): pass

    @classmethod
    def cls_method(cls): pass

    @staticmethod
    def static_method(): pass

for name, obj in inspect.getmembers(MyClass):
    if not name.startswith('__'):
        print(f"  {name}: {type(obj).__name__}")
```

---

## 80. Python'da `__init_subclass__` va `__class_getitem__` amaliy naqsh / Practical pattern

**EN:** Combining metaclass features for a self-registering plugin system with type safety.

**UZB:** Tip xavfsizligi bilan o'z-o'zini ro'yxatga oluvchi plagin tizimi uchun metaclass xususiyatlarini birlashtirish.

```python
from typing import Dict, Type, TypeVar, ClassVar, Generic
from abc import ABC, abstractmethod

T = TypeVar('T')

class Command(ABC):
    """O'z-o'zini ro'yxatga oluvchi buyruq bazasi / Self-registering command base"""
    _registry: ClassVar[Dict[str, Type['Command']]] = {}
    command_name: ClassVar[str]

    def __init_subclass__(cls, name: str = None, **kwargs):
        super().__init_subclass__(**kwargs)
        if name:
            cls.command_name = name
            Command._registry[name] = cls

    @abstractmethod
    def execute(self, **kwargs) -> dict:
        ...

    @classmethod
    def create(cls, name: str, **kwargs) -> 'Command':
        if name not in cls._registry:
            raise ValueError(f"Buyruq '{name}' topilmadi. "
                           f"Mavjudlar: {list(cls._registry.keys())}")
        return cls._registry[name](**kwargs)

    @classmethod
    def list_commands(cls):
        return list(cls._registry.keys())

# Buyruqlarni ro'yxatga olish / Register commands
class CreateUserCommand(Command, name="create_user"):
    def execute(self, username: str, email: str) -> dict:
        return {"action": "created", "user": username, "email": email}

class DeleteUserCommand(Command, name="delete_user"):
    def execute(self, user_id: int) -> dict:
        return {"action": "deleted", "user_id": user_id}

class UpdateUserCommand(Command, name="update_user"):
    def execute(self, user_id: int, data: dict) -> dict:
        return {"action": "updated", "user_id": user_id, "data": data}

# Ishlatish / Usage
print(Command.list_commands())  # ['create_user', 'delete_user', 'update_user']

cmd = Command.create("create_user")
result = cmd.execute(username="Ali", email="ali@example.com")
print(result)  # {'action': 'created', 'user': 'Ali', ...}

cmd2 = Command.create("delete_user")
print(cmd2.execute(user_id=42))  # {'action': 'deleted', 'user_id': 42}
```

---

# ⚫ EXPERT LEVEL (81–100)

---

## 81. CPython implementation tafsilotlari / CPython implementation details

**EN:** Understanding how CPython works internally — object model, memory management, bytecode.

**UZB:** CPython ichki qanday ishlashini tushunish — ob'ekt modeli, xotira boshqaruvi, bayt kod.

```python
import dis
import sys

# Bayt kodni ko'rish / View bytecode
def add(a, b):
    return a + b

dis.dis(add)
# 2           0 RESUME          0
# 3           2 LOAD_FAST       0 (a)
#             4 LOAD_FAST       1 (b)
#             6 BINARY_OP      0 (+)
#            10 RETURN_VALUE

# Reference counting
import ctypes

def ref_count(obj_id):
    return ctypes.c_long.from_address(obj_id).value

x = [1, 2, 3]
obj_id = id(x)
print(f"Ref count: {sys.getrefcount(x)}")  # 2 (x + getrefcount parametri)

y = x  # ref count oshadi
print(f"Ref count: {sys.getrefcount(x)}")  # 3

del y
print(f"Ref count: {sys.getrefcount(x)}")  # 2

# Object representation
print(x.__class__)          # <class 'list'>
print(x.__class__.__mro__)  # MRO

# Small int cache
a = 256
b = 256
print(a is b)   # True — cached

a = 257
b = 257
print(a is b)   # False — not cached

# String interning
s1 = "hello"
s2 = "hello"
print(s1 is s2)  # True — Python interns short strings

s3 = "hello world"
s4 = "hello world"
print(s3 is s4)  # Possible False — longer strings may not intern

# sys.intern — majburiy interning
s5 = sys.intern("hello world")
s6 = sys.intern("hello world")
print(s5 is s6)  # True
```

---

## 82. Python'da `__slots__` + `__dict__` gibrid / Hybrid slots + dict

**EN:** Combining `__slots__` for core attributes with `__dict__` for flexibility.

**UZB:** Asosiy atributlar uchun `__slots__` va moslashuvchanlik uchun `__dict__` ni birlashtirish.

```python
import sys

class HybridModel:
    """
    __slots__ tez va xotirada iqtisodiy bo'lgan asosiy atributlar uchun,
    __dict__ qo'shimcha dinamik atributlar uchun
    """
    __slots__ = ('id', 'name', 'created_at')

    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name
        import datetime
        self.created_at = datetime.datetime.now()

    def __repr__(self):
        extra = getattr(self, '__dict__', {})
        return f"HybridModel(id={self.id}, name={self.name}, extra={extra})"

# Agar __dict__ kerak bo'lsa
class FlexibleModel:
    __slots__ = ('_id', '_name', '__dict__')  # __dict__ ni slots ga qo'shish

    def __init__(self, id: int, name: str):
        self._id = id
        self._name = name

    @property
    def id(self): return self._id

    @property
    def name(self): return self._name

m = FlexibleModel(1, "Ali")
m.dynamic_attr = "anything"  # __dict__ bor, shuning uchun ishlaydi
m.another = [1, 2, 3]
print(m.dynamic_attr)  # anything
print(m.__dict__)       # {'dynamic_attr': 'anything', 'another': [1, 2, 3]}

# Xotira taqqoslash / Memory comparison
class WithSlots:
    __slots__ = ('x', 'y', 'z')
    def __init__(self): self.x = self.y = self.z = 0

class WithDict:
    def __init__(self): self.x = self.y = self.z = 0

s = WithSlots()
d = WithDict()
print(f"Slots: {sys.getsizeof(s)} bytes")  # ~56 bytes
print(f"Dict:  {sys.getsizeof(d) + sys.getsizeof(d.__dict__)} bytes")  # ~280 bytes
```

---

## 83. Python'da Event sourcing naqshi / Event Sourcing pattern

**EN:** Event sourcing stores state changes as a sequence of events rather than current state.

**UZB:** Hodisalar manba saqlash holat o'zgarishlarini joriy holat o'rniga hodisalar ketma-ketligi sifatida saqlaydi.

```python
from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Dict, Any
from abc import ABC, abstractmethod
import uuid

@dataclass
class Event:
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = field(default_factory=datetime.now)
    event_type: str = ""
    data: Dict[str, Any] = field(default_factory=dict)

class EventStore:
    def __init__(self):
        self._events: List[Event] = []

    def append(self, event: Event):
        self._events.append(event)

    def get_all(self) -> List[Event]:
        return self._events.copy()

    def get_by_type(self, event_type: str) -> List[Event]:
        return [e for e in self._events if e.event_type == event_type]

class BankAccount:
    def __init__(self, owner: str, store: EventStore):
        self.owner = owner
        self.store = store
        self._balance = 0
        self._rebuild_from_events()

    def _rebuild_from_events(self):
        """Hodisalardan holatni qayta qurish / Rebuild state from events"""
        for event in self.store.get_all():
            self._apply(event)

    def _apply(self, event: Event):
        if event.event_type == "DEPOSIT":
            self._balance += event.data["amount"]
        elif event.event_type == "WITHDRAWAL":
            self._balance -= event.data["amount"]

    def deposit(self, amount: float):
        event = Event(event_type="DEPOSIT", data={"amount": amount})
        self.store.append(event)
        self._apply(event)

    def withdraw(self, amount: float):
        if amount > self._balance:
            raise ValueError("Mablag' yetarli emas!")
        event = Event(event_type="WITHDRAWAL", data={"amount": amount})
        self.store.append(event)
        self._apply(event)

    @property
    def balance(self): return self._balance

store = EventStore()
acc = BankAccount("Ali", store)
acc.deposit(1000)
acc.deposit(500)
acc.withdraw(200)
print(f"Balans: {acc.balance}")  # 1300

# Audit log
for event in store.get_all():
    print(f"  [{event.timestamp.strftime('%H:%M:%S')}] "
          f"{event.event_type}: {event.data}")
```

---

## 84. Python'da CQRS naqshi / CQRS Pattern

**EN:** Command Query Responsibility Segregation separates read and write operations.

**UZB:** Buyruq So'rov Mas'uliyatini Ajratish o'qish va yozish amallarini ajratadi.

```python
from dataclasses import dataclass, field
from typing import Optional, List, Dict, Any
from abc import ABC, abstractmethod
import asyncio

# Commands
@dataclass
class CreateProductCommand:
    name: str
    price: float
    category: str

@dataclass
class UpdatePriceCommand:
    product_id: int
    new_price: float

# Queries
@dataclass
class GetProductQuery:
    product_id: int

@dataclass
class SearchProductsQuery:
    category: Optional[str] = None
    max_price: Optional[float] = None

# Handlers
class CommandHandler(ABC):
    @abstractmethod
    async def handle(self, command: Any) -> Any:
        ...

class QueryHandler(ABC):
    @abstractmethod
    async def handle(self, query: Any) -> Any:
        ...

# In-memory store (real holatda alohida write/read DB)
class ProductWriteStore:
    def __init__(self):
        self._products: Dict[int, dict] = {}
        self._counter = 0

    async def create(self, data: dict) -> int:
        self._counter += 1
        self._products[self._counter] = {**data, "id": self._counter}
        return self._counter

    async def update_price(self, product_id: int, new_price: float):
        if product_id in self._products:
            self._products[product_id]["price"] = new_price

class ProductReadStore:
    def __init__(self, write_store: ProductWriteStore):
        self._write_store = write_store  # sodda misol uchun bir xil store

    async def get(self, product_id: int) -> Optional[dict]:
        return self._write_store._products.get(product_id)

    async def search(self, category=None, max_price=None) -> List[dict]:
        results = list(self._write_store._products.values())
        if category:
            results = [p for p in results if p.get("category") == category]
        if max_price:
            results = [p for p in results if p.get("price", 0) <= max_price]
        return results

write_store = ProductWriteStore()
read_store = ProductReadStore(write_store)

async def main():
    # Write
    product_id = await write_store.create({
        "name": "Laptop", "price": 1500.0, "category": "Electronics"
    })
    await write_store.update_price(product_id, 1400.0)

    # Read
    product = await read_store.get(product_id)
    print(f"Mahsulot: {product}")

    results = await read_store.search(category="Electronics", max_price=1500)
    print(f"Natijalar: {results}")

# asyncio.run(main())
```

---

## 85. Python'da `__future__` va versiya muvofiqligi / `__future__` and version compatibility

**EN:** `from __future__ import` enables future Python features in older versions.

**UZB:** `from __future__ import` eski versiyalarda kelajakdagi Python xususiyatlarini yoqadi.

```python
# Python 3.7 da annotations bo'yicha deferred evaluation
from __future__ import annotations
from typing import Optional

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        # Oldin: Optional['TreeNode'] — quotes kerak edi
        # Endi: Optional[TreeNode] — to'g'ridan-to'g'ri
        self.left: Optional[TreeNode] = None
        self.right: Optional[TreeNode] = None

    def insert(self, value: int) -> TreeNode:
        if value < self.value:
            if self.left is None:
                self.left = TreeNode(value)
            else:
                self.left.insert(value)
        else:
            if self.right is None:
                self.right = TreeNode(value)
            else:
                self.right.insert(value)
        return self

    def inorder(self) -> list[int]:
        result = []
        if self.left:
            result.extend(self.left.inorder())
        result.append(self.value)
        if self.right:
            result.extend(self.right.inorder())
        return result

root = TreeNode(5)
for v in [3, 7, 1, 4, 6, 8]:
    root.insert(v)

print(root.inorder())  # [1, 3, 4, 5, 6, 7, 8]

# Versiya tekshiruvi / Version checking
import sys

def requires_python(major, minor):
    def decorator(func):
        if sys.version_info < (major, minor):
            raise RuntimeError(f"Python {major}.{minor}+ talab qilinadi")
        return func
    return decorator

@requires_python(3, 8)
def use_walrus():
    data = [1, 2, 3, 4, 5]
    if (n := len(data)) > 3:
        print(f"Ro'yxat uzun: {n} element")
```

---

## 86. Python'da `Coroutine` va `Task` boshqaruvi / Coroutine and Task management

**EN:** Advanced task management with priorities, cancellation groups, and structured concurrency.

**UZB:** Ustuvorliklar, bekor qilish guruhlari va tuzilgan parallellik bilan ilg'or vazifa boshqaruvi.

```python
import asyncio
from asyncio import TaskGroup  # Python 3.11+
from typing import Coroutine, Any

# TaskGroup — tuzilgan parallellik / Structured concurrency
async def fetch_user(user_id: int) -> dict:
    await asyncio.sleep(0.1)
    return {"id": user_id, "name": f"User_{user_id}"}

async def fetch_posts(user_id: int) -> list:
    await asyncio.sleep(0.15)
    return [{"id": i, "user_id": user_id} for i in range(3)]

async def fetch_user_data(user_id: int) -> dict:
    try:
        async with TaskGroup() as tg:
            user_task = tg.create_task(fetch_user(user_id))
            posts_task = tg.create_task(fetch_posts(user_id))
    except* ValueError as eg:
        print(f"Xatolar: {eg.exceptions}")
        return {}

    return {
        "user": user_task.result(),
        "posts": posts_task.result()
    }

# Timeout va bekor qilish / Timeout and cancellation
async def with_timeout_example():
    try:
        async with asyncio.timeout(2.0):  # Python 3.11+
            result = await asyncio.sleep(5)  # bu timeout beradi
    except TimeoutError:
        print("Vaqt tugadi!")

# Prioritet navbat / Priority queue
import heapq

class PriorityTaskQueue:
    def __init__(self):
        self._queue = []
        self._counter = 0

    async def put(self, priority: int, coro: Coroutine):
        task = asyncio.create_task(coro)
        heapq.heappush(self._queue, (priority, self._counter, task))
        self._counter += 1
        return task

    async def process_all(self):
        results = []
        while self._queue:
            priority, _, task = heapq.heappop(self._queue)
            result = await task
            results.append((priority, result))
        return results

async def task_example(name: str, delay: float) -> str:
    await asyncio.sleep(delay)
    return f"{name} tugadi"

async def priority_demo():
    pq = PriorityTaskQueue()
    await pq.put(3, task_example("LOW", 0.1))
    await pq.put(1, task_example("HIGH", 0.1))
    await pq.put(2, task_example("MEDIUM", 0.1))
    results = await pq.process_all()
    for priority, result in sorted(results):
        print(f"Ustuvorlik {priority}: {result}")
```

---

## 87. Python'da `C Extensions` yozish / Writing C Extensions

**EN:** C extensions provide near-native performance for CPU-intensive tasks.

**UZB:** C kengaytmalari CPU-intensiv vazifalar uchun deyarli mahalliy ishlash tezligini ta'minlaydi.

```c
// mymodule.c — C extension example
#include <Python.h>

// C funksiyasi / C function
static PyObject* py_fast_sum(PyObject* self, PyObject* args) {
    PyObject* list;
    if (!PyArg_ParseTuple(args, "O!", &PyList_Type, &list)) {
        return NULL;
    }

    Py_ssize_t n = PyList_Size(list);
    long long total = 0;

    for (Py_ssize_t i = 0; i < n; i++) {
        PyObject* item = PyList_GetItem(list, i);
        total += PyLong_AsLongLong(item);
    }

    return PyLong_FromLongLong(total);
}

// Modul metodlari / Module methods
static PyMethodDef MyMethods[] = {
    {"fast_sum", py_fast_sum, METH_VARARGS, "Tez yig'indi"},
    {NULL, NULL, 0, NULL}
};

// Modul ta'rifi / Module definition
static struct PyModuleDef mymodule = {
    PyModuleDef_HEAD_INIT, "mymodule", NULL, -1, MyMethods
};

// Initsializatsiya / Initialization
PyMODINIT_FUNC PyInit_mymodule(void) {
    return PyModule_Create(&mymodule);
}
```

```python
# setup.py — build uchun
from setuptools import setup, Extension

ext = Extension(
    'mymodule',
    sources=['mymodule.c'],
)

setup(
    name='mymodule',
    ext_modules=[ext],
)

# Qurilish / Build:
# python setup.py build_ext --inplace

# Ishlatish / Usage:
# import mymodule
# result = mymodule.fast_sum([1, 2, 3, 4, 5])
# print(result)  # 15

# Muqobil: Cython / Alternative: Cython
# pip install cython
# .pyx fayl yozib, ko'proq Python-like sintaksis bilan C darajasidagi tezlik
```

---

## 88. Python'da `__class__` va runtime tip manipulyatsiya / Runtime type manipulation

**EN:** Python allows dynamic class creation, modification, and introspection at runtime.

**UZB:** Python ish vaqtida dinamik klass yaratish, o'zgartirish va introspeksiyaga imkon beradi.

```python
# Dinamik klass yaratish / Dynamic class creation
def create_model(name: str, fields: dict):
    """SQLAlchemy-like model factory"""

    def __init__(self, **kwargs):
        for field_name, field_type in fields.items():
            value = kwargs.get(field_name)
            if value is not None and not isinstance(value, field_type):
                raise TypeError(f"{field_name} {field_type.__name__} bo'lishi kerak")
            setattr(self, field_name, value)

    def __repr__(self):
        attrs = ", ".join(f"{k}={getattr(self, k)!r}" for k in fields)
        return f"{name}({attrs})"

    def to_dict(self):
        return {k: getattr(self, k) for k in fields}

    return type(name, (object,), {
        '__init__': __init__,
        '__repr__': __repr__,
        'to_dict': to_dict,
        '_fields': fields
    })

User = create_model("User", {"name": str, "age": int, "email": str})
Product = create_model("Product", {"title": str, "price": float})

user = User(name="Ali", age=25, email="ali@example.com")
print(user)  # User(name='Ali', age=25, email='ali@example.com')
print(user.to_dict())

product = Product(title="Laptop", price=1500.0)
print(product)

# Klassni o'zgartirish / Modifying class at runtime
def add_method(cls, name, func):
    setattr(cls, name, func)

add_method(User, 'greet', lambda self: f"Salom, {self.name}!")
print(user.greet())  # Salom, Ali!

# __class__ almashtirish (ehtiyotkorlik bilan!)
class OldAPI:
    def process(self): return "eski"

class NewAPI:
    def process(self): return "yangi"
    def new_feature(self): return "yangi funksiya"

obj = OldAPI()
obj.__class__ = NewAPI  # O'zgartirish
print(obj.process())      # yangi
print(obj.new_feature())  # yangi funksiya
```

---

## 89. Python'da `memory mapped files` / Memory-mapped files

**EN:** Memory-mapped files allow treating file contents as if they're in memory, enabling fast random access.

**UZB:** Xotiraga aks ettirish fayllari fayl mazmunini xotiradagiday ko'rishga imkon beradi, tez tasodifiy kirishni ta'minlaydi.

```python
import mmap
import struct
import os
import time

# Yozish / Writing
with open("large_data.bin", "wb") as f:
    for i in range(100_000):
        f.write(struct.pack('I', i))  # 4 bytes per int

# Oddiy o'qish vs mmap o'qish tezligi
# O'qish / Regular read
start = time.time()
with open("large_data.bin", "rb") as f:
    data = f.read()
print(f"Oddiy o'qish: {time.time()-start:.4f}s")

# mmap bilan o'qish
start = time.time()
with open("large_data.bin", "r+b") as f:
    mm = mmap.mmap(f.fileno(), 0)

    # 50000-elementni o'qish / Read 50000th element
    offset = 50000 * 4  # 4 bytes per int
    mm.seek(offset)
    value = struct.unpack('I', mm.read(4))[0]
    print(f"50000-element: {value}")  # 50000

    # Qidirish / Search
    mm.seek(0)
    target = struct.pack('I', 42)
    pos = mm.find(target)
    print(f"42 topilgan joy: {pos // 4}")  # 42

    mm.close()
print(f"mmap o'qish: {time.time()-start:.4f}s")

# Matn fayli bilan / With text file
with open("text_data.txt", "w") as f:
    f.write("Hello, World!\n" * 10000)

with open("text_data.txt", "r+b") as f:
    mm = mmap.mmap(f.fileno(), 0)
    print(mm.read(13))    # b'Hello, World!'
    mm.seek(0)
    count = 0
    while mm.find(b"Hello") != -1:
        mm.seek(mm.find(b"Hello") + 5)
        count += 1
    print(f"'Hello' soni: {count}")
    mm.close()

os.remove("large_data.bin")
os.remove("text_data.txt")
```

---

## 90. Python'da `concurrent.futures` va Thread/Process Pool / Thread and Process pools

**EN:** `concurrent.futures` provides a high-level interface for async execution with thread and process pools.

**UZB:** `concurrent.futures` thread va jarayon havzalari bilan async bajarish uchun yuqori darajali interfeys taqdim etadi.

```python
from concurrent.futures import (
    ThreadPoolExecutor,
    ProcessPoolExecutor,
    as_completed,
    wait,
    FIRST_COMPLETED,
    ALL_COMPLETED
)
import time
import requests  # pip install requests

# ThreadPoolExecutor — I/O bound
def download_page(url: str) -> tuple:
    start = time.time()
    time.sleep(0.1)  # I/O simulation
    return url, len(url), time.time() - start

urls = [f"https://example.com/page/{i}" for i in range(20)]

with ThreadPoolExecutor(max_workers=10) as executor:
    # map — ketma-ket natijalar / Sequential results
    results = list(executor.map(download_page, urls))

    # submit + as_completed — birinchi tayyor bo'lgan / As they complete
    futures = {executor.submit(download_page, url): url for url in urls[:5]}

    for future in as_completed(futures):
        url = futures[future]
        result = future.result()
        print(f"✅ {url}: {result[2]:.3f}s")

# ProcessPoolExecutor — CPU bound
def prime_check(n: int) -> tuple:
    if n < 2: return n, False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return n, False
    return n, True

numbers = range(1, 100)

with ProcessPoolExecutor(max_workers=4) as executor:
    primes = [
        n for n, is_prime in executor.map(prime_check, numbers)
        if is_prime
    ]
    print(f"Tub sonlar: {primes}")

# wait bilan / With wait
with ThreadPoolExecutor(max_workers=5) as executor:
    futures = [executor.submit(time.sleep, 0.1) for _ in range(5)]
    done, not_done = wait(futures, return_when=ALL_COMPLETED)
    print(f"Tugagan: {len(done)}, Kutilmoqda: {len(not_done)}")
```

---

## 91. Python'da `__subclasshook__` va virtual subclassing / Virtual subclasses

**EN:** `__subclasshook__` enables ABCs to recognize classes as subclasses without inheritance.

**UZB:** `__subclasshook__` ABClarga meros olmagan klasslarni pastki klasslar sifatida tanishga imkon beradi.

```python
from abc import ABC, abstractmethod

class Drawable(ABC):
    @abstractmethod
    def draw(self) -> str: ...

    @classmethod
    def __subclasshook__(cls, C):
        """draw metodi bo'lgan har qanday klass Drawable deb hisoblanadi"""
        if cls is Drawable:
            if any("draw" in B.__dict__ for B in C.__mro__):
                return True
        return NotImplemented

# Bu klass Drawable ni inherit qilmadi!
class ThirdPartyWidget:
    def draw(self) -> str:
        return "Widget chizildi"

class NoDrawWidget:
    def render(self) -> str:
        return "Render qilindi"

print(isinstance(ThirdPartyWidget(), Drawable))   # True!
print(isinstance(NoDrawWidget(), Drawable))        # False

# register — virtual subclass
class LegacyShape:
    def draw(self):
        return "Eski shakl"

Drawable.register(LegacyShape)
print(issubclass(LegacyShape, Drawable))  # True
print(isinstance(LegacyShape(), Drawable)) # True

# Amaliy: iterable tekshiruvi
class IterableChecker(ABC):
    @classmethod
    def __subclasshook__(cls, C):
        if cls is IterableChecker:
            if hasattr(C, '__iter__') or hasattr(C, '__getitem__'):
                return True
        return NotImplemented

print(isinstance([], IterableChecker))      # True
print(isinstance("hello", IterableChecker)) # True
print(isinstance(42, IterableChecker))      # False
```

---

## 92. Python'da `Proxy` naqshi / Proxy pattern in Python

**EN:** Proxy objects intercept attribute access and method calls, useful for logging, caching, and access control.

**UZB:** Proksi ob'ektlar atributlarga kirish va metod chaqiruvlarini ushlab qoladi, logging, keshlash va kirishni boshqarish uchun foydali.

```python
from typing import Any, Callable
import functools
import time

class LazyProxy:
    """Kechiktirilgan hisoblash / Lazy evaluation proxy"""
    def __init__(self, factory: Callable):
        object.__setattr__(self, '_factory', factory)
        object.__setattr__(self, '_obj', None)
        object.__setattr__(self, '_initialized', False)

    def _ensure_initialized(self):
        if not object.__getattribute__(self, '_initialized'):
            factory = object.__getattribute__(self, '_factory')
            object.__setattr__(self, '_obj', factory())
            object.__setattr__(self, '_initialized', True)
            print("✅ Ob'ekt yaratildi (kechiktirilgan)")

    def __getattr__(self, name: str) -> Any:
        self._ensure_initialized()
        obj = object.__getattribute__(self, '_obj')
        return getattr(obj, name)

    def __setattr__(self, name: str, value: Any):
        self._ensure_initialized()
        obj = object.__getattribute__(self, '_obj')
        setattr(obj, name, value)

class ExpensiveService:
    def __init__(self):
        print("💫 ExpensiveService yaratilmoqda (sekin)...")
        time.sleep(0.1)  # Sekin initializatsiya
        self.data = "qimmat ma'lumot"

    def process(self):
        return f"Qayta ishlandi: {self.data}"

# Hozir yaratilmaydi / Not created yet
service = LazyProxy(lambda: ExpensiveService())
print("Proksi yaratildi")  # ExpensiveService yaratilmadi!

# Birinchi marta ishlatganda yaratiladi
print(service.process())   # Bu yerda yaratiladi

class LoggingProxy:
    """Logging proxy"""
    def __init__(self, target, logger=print):
        object.__setattr__(self, '_target', target)
        object.__setattr__(self, '_logger', logger)

    def __getattr__(self, name):
        target = object.__getattribute__(self, '_target')
        logger = object.__getattribute__(self, '_logger')
        attr = getattr(target, name)

        if callable(attr):
            @functools.wraps(attr)
            def logged(*args, **kwargs):
                logger(f"📞 {type(target).__name__}.{name}({args}, {kwargs})")
                result = attr(*args, **kwargs)
                logger(f"↩️ {name} → {result}")
                return result
            return logged
        return attr

import math
logged_math = LoggingProxy(math)
logged_math.sqrt(16)   # 📞 module.sqrt ... ↩️ sqrt → 4.0
logged_math.pi         # pi — bu callable emas, to'g'ridan-to'g'ri
```

---

## 93. Python'da `__array_ufunc__` va NumPy integratsiya / NumPy integration

**EN:** Implementing `__array_ufunc__` and `__array_function__` allows custom objects to work seamlessly with NumPy.

**UZB:** `__array_ufunc__` va `__array_function__` ni amalga oshirish maxsus ob'ektlarga NumPy bilan muammosiz ishlash imkonini beradi.

```python
try:
    import numpy as np

    class PhysicalQuantity:
        """Birlikli fizikaviy kattalik / Physical quantity with units"""

        def __init__(self, value, unit: str):
            self.value = np.asarray(value)
            self.unit = unit

        def __array_ufunc__(self, ufunc, method, *inputs, **kwargs):
            """NumPy universal funksiyalarini qo'llab-quvvatlash"""
            raw_inputs = []
            units = []
            for inp in inputs:
                if isinstance(inp, PhysicalQuantity):
                    raw_inputs.append(inp.value)
                    units.append(inp.unit)
                else:
                    raw_inputs.append(inp)
                    units.append(None)

            result = getattr(ufunc, method)(*raw_inputs, **kwargs)

            # Birlik logikasin oddiy ko'rsatish
            if ufunc in (np.add, np.subtract):
                if len(set(u for u in units if u)) > 1:
                    raise ValueError(f"Birliklar mos emas: {units}")
                result_unit = next(u for u in units if u)
            elif ufunc == np.multiply:
                result_unit = "*".join(u for u in units if u) or None
            else:
                result_unit = units[0]

            return PhysicalQuantity(result, result_unit) if result_unit else result

        def __repr__(self):
            return f"PhysicalQuantity({self.value} {self.unit})"

    # Ishlatish
    distance = PhysicalQuantity([1.0, 2.0, 3.0], "m")
    time_arr = PhysicalQuantity([1.0, 2.0, 3.0], "s")

    # NumPy universal funksiyalari ishlaydi
    doubled = np.multiply(distance, 2)
    print(doubled)  # PhysicalQuantity([2. 4. 6.] m)

    speed = np.divide(distance, time_arr)
    # Bu oddiy array qaytaradi chunki divide uchun birlik logikasi yo'q

    # sqrt ishlatish
    areas = PhysicalQuantity([4.0, 9.0, 16.0], "m^2")
    sides = np.sqrt(areas)
    print(sides)  # PhysicalQuantity([2. 3. 4.] m^2)

except ImportError:
    print("pip install numpy")
    print("# NumPy o'rnatilmagan, misol ko'rsatilmaydi")
```

---

## 94. Python'da `Cython` va `Numba` tezlashtirish / Performance with Cython and Numba

**EN:** Cython compiles Python to C; Numba uses JIT compilation for numerical code.

**UZB:** Cython Python ni C ga kompilyatsiya qiladi; Numba raqamli kod uchun JIT kompilyatsiyasini ishlatadi.

```python
# Numba misoli (pip install numba)
try:
    from numba import jit, njit
    import numpy as np
    import time

    # JIT-kompilyatsiya qilinmagan
    def pure_python_sum(arr):
        total = 0.0
        for x in arr:
            total += x
        return total

    # JIT-kompilyatsiya qilingan
    @njit  # nopython mode — eng tez
    def numba_sum(arr):
        total = 0.0
        for x in arr:
            total += x
        return total

    arr = np.random.random(10_000_000)

    # Isitish / Warmup
    numba_sum(arr[:10])

    start = time.time()
    r1 = pure_python_sum(arr)
    t1 = time.time() - start

    start = time.time()
    r2 = numba_sum(arr)
    t2 = time.time() - start

    print(f"Python: {t1:.3f}s")    # ~3.0s
    print(f"Numba: {t2:.4f}s")     # ~0.02s
    print(f"Tezlanish: {t1/t2:.0f}x")

    # Parallel ishlov
    from numba import prange

    @njit(parallel=True)
    def parallel_sum(arr):
        total = 0.0
        for i in prange(len(arr)):  # parallel range
            total += arr[i]
        return total

except ImportError:
    print("pip install numba")

# Cython — .pyx fayl misoli
cython_code = '''
# my_module.pyx
# cython: language_level=3
import cython

@cython.boundscheck(False)
@cython.wraparound(False)
def fast_sum(double[:] arr):
    cdef double total = 0.0
    cdef int n = len(arr)
    cdef int i
    for i in range(n):
        total += arr[i]
    return total
'''
print("Cython kodi (kompilatsiya talab qilinadi):")
print(cython_code)
```

---

## 95. Python'da `dis` va bytecode optimizatsiya / Bytecode optimization

**EN:** Understanding Python bytecode helps write more efficient code and understand interpreter behavior.

**UZB:** Python bayt kodini tushunish yanada samarali kod yozish va interpreter xatti-harakatini tushunishga yordam beradi.

```python
import dis
import time

# Nega ba'zi kodlar tezroq / Why some code is faster
def version1(n):
    result = []
    for i in range(n):
        result.append(i * i)
    return result

def version2(n):
    return [i * i for i in range(n)]

def version3(n):
    return list(map(lambda x: x*x, range(n)))

# Bayt kodlarni taqqoslash / Compare bytecodes
print("=== Version 1 ===")
dis.dis(version1)
print("\n=== Version 2 ===")
dis.dis(version2)

# Tezlikni o'lchash / Measure speed
import timeit

t1 = timeit.timeit(lambda: version1(1000), number=10000)
t2 = timeit.timeit(lambda: version2(1000), number=10000)
t3 = timeit.timeit(lambda: version3(1000), number=10000)

print(f"\nFor loop: {t1:.3f}s")
print(f"List comp: {t2:.3f}s → {t1/t2:.1f}x tez")
print(f"Map: {t3:.3f}s")

# Constant folding tekshiruvi
import py_compile

def check_constant_folding():
    x = 2 * 3 * 4    # Python bu ni compile vaqtida 24 ga aylantiradi
    y = "hello " * 3  # Kompilyatsiya vaqtida "hello hello hello "
    return x, y

dis.dis(check_constant_folding)
# LOAD_CONST 24 (2*3*4 emas, allaqachon hisoblangan!)

# Global vs local o'zgaruvchi tezligi
import math

def using_global():
    return [math.sqrt(i) for i in range(1000)]

def using_local():
    sqrt = math.sqrt  # local o'zgaruvchiga olish
    return [sqrt(i) for i in range(1000)]

tg = timeit.timeit(using_global, number=10000)
tl = timeit.timeit(using_local, number=10000)
print(f"\nGlobal: {tg:.3f}s, Local: {tl:.3f}s → {tg/tl:.1f}x tez")
```

---

## 96. Python'da `type checking` va `mypy` / Static type checking

**EN:** MyPy performs static type analysis without running the code, catching type errors early.

**UZB:** MyPy kodni ishga tushirmasdan statik tip tahlilini amalga oshiradi, tip xatolarini erta aniqlaydi.

```python
# mypy -- strict faylni tekshirish uchun
# pip install mypy
# mypy --strict myfile.py

from typing import (
    TypeVar, Generic, Protocol, runtime_checkable,
    overload, Final, Literal, TypedDict, ClassVar,
    TYPE_CHECKING
)

if TYPE_CHECKING:
    from typing import NoReturn

# TypedDict — dict uchun qat'iy schema
class UserConfig(TypedDict):
    name: str
    age: int
    email: str
    role: Literal["admin", "user", "moderator"]

def process_config(config: UserConfig) -> str:
    return f"{config['name']} ({config['role']})"

config: UserConfig = {
    "name": "Ali",
    "age": 25,
    "email": "ali@example.com",
    "role": "admin"
}

# Final — o'zgarmas konstantalar
MAX_RETRIES: Final = 3
API_VERSION: Final[str] = "v2"

# Overload — ko'p qaytarish turlari
@overload
def process(value: int) -> int: ...
@overload
def process(value: str) -> str: ...
@overload
def process(value: list) -> list: ...

def process(value):
    if isinstance(value, int):
        return value * 2
    elif isinstance(value, str):
        return value.upper()
    elif isinstance(value, list):
        return [process(v) for v in value]

# ClassVar — klass atributi (instans emas)
class Config:
    MAX_SIZE: ClassVar[int] = 100
    debug: ClassVar[bool] = False

    def __init__(self, name: str) -> None:
        self.name = name

# Never/NoReturn
def raise_error(msg: str) -> "NoReturn":
    raise RuntimeError(msg)

def divide(a: float, b: float) -> float:
    if b == 0:
        raise_error("Nolga bo'lish mumkin emas!")
    return a / b  # mypy biladi bu erga hech qachon yetib kelmasligini
```

---

## 97. Python'da `Reactive Programming` / Reactive Programming

**EN:** Reactive programming with observables and streams enables declarative async data flow.

**UZB:** Kuzatuvchilar va oqimlar bilan reaktiv dasturlash deklarativ async ma'lumotlar oqimini ta'minlaydi.

```python
from typing import Callable, TypeVar, Generic, List, Optional
from dataclasses import dataclass, field
import asyncio

T = TypeVar('T')

class Observable(Generic[T]):
    """Oddiy Observable implementatsiya / Simple Observable implementation"""

    def __init__(self):
        self._observers: List[Callable[[T], None]] = []
        self._error_handlers: List[Callable[[Exception], None]] = []
        self._complete_handlers: List[Callable[[], None]] = []

    def subscribe(
        self,
        on_next: Callable[[T], None],
        on_error: Optional[Callable[[Exception], None]] = None,
        on_complete: Optional[Callable[[], None]] = None
    ) -> 'Subscription':
        self._observers.append(on_next)
        if on_error:
            self._error_handlers.append(on_error)
        if on_complete:
            self._complete_handlers.append(on_complete)
        return Subscription(self, on_next)

    def emit(self, value: T):
        for observer in self._observers:
            try:
                observer(value)
            except Exception as e:
                for handler in self._error_handlers:
                    handler(e)

    def error(self, exception: Exception):
        for handler in self._error_handlers:
            handler(exception)

    def complete(self):
        for handler in self._complete_handlers:
            handler()

    def map(self, transform: Callable[[T], any]) -> 'Observable':
        new_obs = Observable()
        self.subscribe(lambda v: new_obs.emit(transform(v)))
        return new_obs

    def filter(self, predicate: Callable[[T], bool]) -> 'Observable':
        new_obs = Observable()
        self.subscribe(lambda v: new_obs.emit(v) if predicate(v) else None)
        return new_obs

class Subscription:
    def __init__(self, observable: Observable, handler):
        self.observable = observable
        self.handler = handler

    def unsubscribe(self):
        if self.handler in self.observable._observers:
            self.observable._observers.remove(self.handler)

# Ishlatish / Usage
prices = Observable[float]()

# Pipeline
alerts = (
    prices
    .filter(lambda p: p > 100)       # 100 dan katta
    .map(lambda p: f"🚨 Narx: ${p:.2f}")  # formatlash
)

subscription = alerts.subscribe(
    on_next=print,
    on_error=lambda e: print(f"Xato: {e}"),
    on_complete=lambda: print("Oqim tugadi")
)

prices.emit(50.0)     # filtered out
prices.emit(150.0)    # 🚨 Narx: $150.00
prices.emit(75.0)     # filtered out
prices.emit(200.0)    # 🚨 Narx: $200.00
prices.complete()     # Oqim tugadi

subscription.unsubscribe()
prices.emit(300.0)    # hech kim ko'rmaydi
```

---

## 98. Python'da `__reduce__` va maxsus seriallashtirish / Custom serialization

**EN:** `__reduce__` and `__reduce_ex__` control how objects are pickled for serialization.

**UZB:** `__reduce__` va `__reduce_ex__` ob'ektlarning seriallashtirish uchun qanday pickle qilinishini boshqaradi.

```python
import pickle
import copy

class SecureData:
    """Maxfiy ma'lumotlarni pickle qilmaslik / Don't pickle sensitive data"""

    def __init__(self, public_data: str, secret: str):
        self.public_data = public_data
        self._secret = secret  # Bu pickle qilinmaydi!

    def __getstate__(self):
        """Pickle uchun holat / State for pickling"""
        state = self.__dict__.copy()
        del state['_secret']     # maxfiy ma'lumotni o'chirish
        state['_secret_hash'] = hash(self._secret)  # faqat hash
        return state

    def __setstate__(self, state):
        """Unpickle paytida / During unpickling"""
        self.__dict__.update(state)
        self._secret = None  # Secret tiklanmaydi

    def __reduce__(self):
        """Boshqa pickler uchun / For custom picklers"""
        return (
            self.__class__,        # factory funksiya
            (self.public_data, ""),  # argumentlar
            self.__getstate__()      # qo'shimcha holat
        )

data = SecureData("Ommaviy ma'lumot", "super_secret_123")
print(f"Original secret: {data._secret}")

# Pickle
serialized = pickle.dumps(data)
restored = pickle.loads(serialized)

print(f"Restored public: {restored.public_data}")
print(f"Restored secret: {restored._secret}")  # None!

# Deepcopy boshqaruvi
class ManagedResource:
    def __init__(self, name: str):
        self.name = name
        self.connection = f"conn_to_{name}"  # Kopiyalab bo'lmaydi

    def __copy__(self):
        new = ManagedResource(self.name + "_copy")
        return new

    def __deepcopy__(self, memo):
        new = ManagedResource(self.name + "_deep_copy")
        memo[id(self)] = new
        return new

r = ManagedResource("database")
r_copy = copy.copy(r)
r_deep = copy.deepcopy(r)
print(r.name, r_copy.name, r_deep.name)
# database  database_copy  database_deep_copy
```

---

## 99. Python'da `PEP 695` — Type Parameter Syntax (Python 3.12+) / New style generics

**EN:** Python 3.12 introduces new syntax for type parameters, making generics more readable.

**UZB:** Python 3.12 tip parametrlari uchun yangi sintaksis kiritadi, genericslarni yanada o'qiluvchan qiladi.

```python
# Python 3.12+ yangi sintaksis / New syntax
# Eski usul / Old style:
from typing import TypeVar, Generic
T = TypeVar('T')
class Stack(Generic[T]): ...

# Yangi usul / New style (Python 3.12+):
# class Stack[T]:
#     def push(self, item: T) -> None: ...
#     def pop(self) -> T: ...

# TypeAlias (Python 3.12)
# type Point = tuple[float, float]
# type Matrix = list[list[float]]

# Hozirgi versiyalarda / Current versions (3.9+)
from typing import TypeAlias

Point: TypeAlias = tuple[float, float]
Matrix: TypeAlias = list[list[float]]

def dot_product(a: Point, b: Point) -> float:
    return a[0] * b[0] + a[1] * b[1]

def matrix_multiply(a: Matrix, b: Matrix) -> Matrix:
    rows_a = len(a)
    cols_a = len(a[0])
    cols_b = len(b[0])

    result = [[0.0] * cols_b for _ in range(rows_a)]

    for i in range(rows_a):
        for j in range(cols_b):
            for k in range(cols_a):
                result[i][j] += a[i][k] * b[k][j]

    return result

p1: Point = (3.0, 4.0)
p2: Point = (1.0, 2.0)
print(dot_product(p1, p2))  # 11.0

m1: Matrix = [[1, 2], [3, 4]]
m2: Matrix = [[5, 6], [7, 8]]
result = matrix_multiply(m1, m2)
print(result)  # [[19.0, 22.0], [43.0, 50.0]]

# ParamSpec — decorator uchun / For decorators
from typing import ParamSpec, Concatenate
P = ParamSpec('P')
```

---

## 100. Python'da arxitektura naqshlari: Domain-Driven Design / DDD in Python

**EN:** Domain-Driven Design organizes code around business domain concepts — Entities, Value Objects, Aggregates, Repositories, and Domain Services.

**UZB:** Domain-Driven Design kodni biznes domain tushunchalari atrofida tashkil qiladi — Sushcheliklar, Qiymat Ob'ektlari, Agregatlar, Repozitoriylar va Domain Xizmatlari.

```python
from __future__ import annotations
from dataclasses import dataclass, field
from typing import List, Optional
from datetime import datetime
from uuid import UUID, uuid4
from abc import ABC, abstractmethod
from enum import Enum

# Value Objects — o'zgarmas, identifikatsiyasiz
@dataclass(frozen=True)
class Money:
    amount: float
    currency: str = "UZS"

    def __add__(self, other: Money) -> Money:
        if self.currency != other.currency:
            raise ValueError("Valyutalar mos emas!")
        return Money(self.amount + other.amount, self.currency)

    def __mul__(self, factor: float) -> Money:
        return Money(self.amount * factor, self.currency)

    def __str__(self):
        return f"{self.amount:,.0f} {self.currency}"

@dataclass(frozen=True)
class CustomerId:
    value: UUID = field(default_factory=uuid4)

# Domain Events
@dataclass
class DomainEvent:
    occurred_at: datetime = field(default_factory=datetime.now)

@dataclass
class OrderPlaced(DomainEvent):
    order_id: UUID = field(default_factory=uuid4)
    customer_id: CustomerId = None
    total: Money = None

@dataclass
class OrderCancelled(DomainEvent):
    order_id: UUID = field(default_factory=uuid4)
    reason: str = ""

# Entity — identifikatsiyali ob'ekt
class OrderStatus(Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

@dataclass
class OrderItem:
    product_id: UUID
    product_name: str
    quantity: int
    unit_price: Money

    @property
    def subtotal(self) -> Money:
        return self.unit_price * self.quantity

class Order:
    """Aggregate Root"""

    def __init__(self, customer_id: CustomerId):
        self.id = uuid4()
        self.customer_id = customer_id
        self._items: List[OrderItem] = []
        self._status = OrderStatus.PENDING
        self._events: List[DomainEvent] = []
        self._created_at = datetime.now()

    def add_item(self, product_id: UUID, name: str, qty: int, price: Money):
        if self._status != OrderStatus.PENDING:
            raise ValueError("Tasdiqlangan buyurtmaga mahsulot qo'shib bo'lmaydi!")
        self._items.append(OrderItem(product_id, name, qty, price))

    def confirm(self):
        if not self._items:
            raise ValueError("Bo'sh buyurtmani tasdiqlab bo'lmaydi!")
        self._status = OrderStatus.CONFIRMED
        self._events.append(
            OrderPlaced(
                order_id=self.id,
                customer_id=self.customer_id,
                total=self.total
            )
        )

    def cancel(self, reason: str):
        if self._status in (OrderStatus.DELIVERED, OrderStatus.SHIPPED):
            raise ValueError("Yetkazilgan buyurtmani bekor qilib bo'lmaydi!")
        self._status = OrderStatus.CANCELLED
        self._events.append(OrderCancelled(order_id=self.id, reason=reason))

    @property
    def total(self) -> Money:
        if not self._items:
            return Money(0)
        result = self._items[0].subtotal
        for item in self._items[1:]:
            result = result + item.subtotal
        return result

    @property
    def status(self) -> OrderStatus:
        return self._status

    def collect_events(self) -> List[DomainEvent]:
        events = self._events.copy()
        self._events.clear()
        return events

# Repository Interface
class OrderRepository(ABC):
    @abstractmethod
    async def save(self, order: Order) -> None: ...

    @abstractmethod
    async def find_by_id(self, order_id: UUID) -> Optional[Order]: ...

    @abstractmethod
    async def find_by_customer(self, customer_id: CustomerId) -> List[Order]: ...

# Domain Service
class OrderService:
    def __init__(self, repo: OrderRepository):
        self._repo = repo

    async def place_order(
        self,
        customer_id: CustomerId,
        items: List[dict]
    ) -> Order:
        order = Order(customer_id)
        for item in items:
            order.add_item(
                uuid4(),
                item["name"],
                item["quantity"],
                Money(item["price"])
            )
        order.confirm()
        await self._repo.save(order)
        return order

# Demo
async def demo():
    # In-memory repository
    class InMemoryOrderRepo(OrderRepository):
        def __init__(self):
            self._store = {}

        async def save(self, order: Order):
            self._store[order.id] = order

        async def find_by_id(self, order_id):
            return self._store.get(order_id)

        async def find_by_customer(self, customer_id):
            return [o for o in self._store.values()
                    if o.customer_id == customer_id]

    repo = InMemoryOrderRepo()
    service = OrderService(repo)

    customer = CustomerId()
    order = await service.place_order(customer, [
        {"name": "Laptop", "quantity": 1, "price": 1_500_000},
        {"name": "Mouse", "quantity": 2, "price": 50_000},
    ])

    print(f"Buyurtma ID: {order.id}")
    print(f"Jami: {order.total}")          # 1,600,000 UZS
    print(f"Holat: {order.status.value}")  # confirmed

    events = order.collect_events()
    for event in events:
        print(f"📢 Event: {type(event).__name__}")

import asyncio
asyncio.run(demo())
```

---

## 📊 Xulosa / Summary

| Daraja / Level | Mavzular / Topics |
|---|---|
| 🟢 **Basic (1-25)** | Tiplar, OOP, Fayllar, Lambda, Exceptions |
| 🟡 **Intermediate (26-55)** | Decorators, Generators, asyncio, dataclasses, typing |
| 🔴 **Advanced (56-80)** | GIL, Metaclass, Descriptors, AST, Pattern Matching |
| ⚫ **Expert (81-100)** | CPython internals, DDD, Event Sourcing, C Extensions |

---

## 🎯 Interview uchun maslahatlar / Interview Tips

```python
# 1. STAR metodini ishlating / Use STAR method
# Vaziyat → Vazifa → Harakat → Natija

# 2. Kodni voz ovoz gapiring / Think out loud
def solve(problem):
    # "Avval muammoni tushunaman..."
    # "Ikkita yechim ko'ryapman..."
    # "Birinchisini tanlashim sababi..."
    pass

# 3. Edge caselarni eslatib o'ting / Mention edge cases
def safe_divide(a, b):
    # Edge cases: b=0, float, string input
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("Son bo'lishi kerak")
    if b == 0:
        raise ZeroDivisionError("Nolga bo'lish mumkin emas")
    return a / b

# 4. Big O ni bilib oling / Know your Big O
# list.append() → O(1)
# list.insert(0, x) → O(n)
# dict.get() → O(1) average
# set.add() → O(1) average
# sorted() → O(n log n)
```

---

*Muvaffaqiyat tilayman, dasturchi! / Good luck, developer!* 🐍🚀

> **GitHub uchun:** Bu faylni `python_interview_qa.md` sifatida repongizga qo'shing.  
> `git add python_interview_qa.md && git commit -m "Add Python interview Q&A bilingual guide (100 questions)"`