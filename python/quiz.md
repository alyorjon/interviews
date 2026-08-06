# 🧪 Python Interaktiv Quiz — Self-Test MCQ

### Ikki tilli qo'llanma / Bilingual Reference

> **Daraja / Level:** 🟢 Basic → 🟡 Intermediate → 🔴 Advanced
> **Format:** Har bir savolda 4 variant, faqat bittasi to'g'ri. Javoblarni oldindan ko'rmang — avval yeching! / Each question has 4 options, only one correct. Don't peek at the answer key — attempt first!
> **Javoblar:** Fayl oxirida / **Answers:** at the end of the file

---

## 🟢 Basic (1–10)

**1.** OOP ning to'rtta asosiy ustuni (pillar) qaysilar? / What are the four pillars of OOP?
A) Klass, Obyekt, Metod, Atribut / Class, Object, Method, Attribute
B) Inkapsulatsiya, Meros olish, Polimorfizm, Abstraktsiya / Encapsulation, Inheritance, Polymorphism, Abstraction
C) SOLID, DRY, KISS, YAGNI
D) Factory, Singleton, Observer, Strategy

**2.** `a = [1, 2, 3]` va `b = [1, 2, 3]` bo'lsa, `a is b` nimani qaytaradi? / Given `a = [1, 2, 3]` and `b = [1, 2, 3]`, what does `a is b` return?
A) `True` — qiymatlar teng bo'lgani uchun / `True` — because the values are equal
B) `False` — bular xotirada turli ob'ektlar / `False` — they are different objects in memory
C) Xatolik chiqaradi / It raises an error
D) `None`

**3.** Python'da qaysi ma'lumot tuzilmasi o'zgarmas (immutable)? / Which Python data structure is immutable?
A) `list`
B) `dict`
C) `tuple`
D) `set`

**4.** `self.__balance` kabi ikki pastki chiziqli (double underscore) atribut nima uchun ishlatiladi? / Why use a double-underscore attribute like `self.__balance`?
A) Uni tezroq ishlaydigan qiladi / It makes it run faster
B) Name mangling orqali tashqaridan to'g'ridan-to'g'ri kirishni qiyinlashtiradi (inkapsulatsiya) / Name mangling discourages direct outside access (encapsulation)
C) Uni avtomatik global qiladi / It automatically makes it global
D) Uni statik metodga aylantiradi / It turns it into a static method

**5.** `def greet(*args, **kwargs):` da `*args` nimani qabul qiladi? / In `def greet(*args, **kwargs):`, what does `*args` collect?
A) Kalit so'z argumentlarini dict sifatida / Keyword arguments as a dict
B) O'zgaruvchan sondagi pozitsion argumentlarni tuple sifatida / A variable number of positional arguments as a tuple
C) Faqat bitta argumentni / Only a single argument
D) Hech narsani — bu sintaksis xato / Nothing — it's a syntax error

**6.** `__init__` metodi qachon avtomatik chaqiriladi? / When is the `__init__` method automatically called?
A) Klass ta'riflanganda / When the class is defined
B) Obyekt yaratilganda / When an object is instantiated
C) Dastur tugaganda / When the program ends
D) Faqat `super()` chaqirilganda / Only when `super()` is called

**7.** `__del__` metodi odatda qachon chaqiriladi? / When is the `__del__` method typically called?
A) Obyekt yaratilganda / When the object is created
B) Har bir metod chaqiruvida / On every method call
C) Obyekt yo'q qilinganda / axlat yig'ilganda / When the object is destroyed / garbage collected
D) Faqat dastur ishga tushganda / Only at program startup

**8.** `try/except/else/finally` blokida `finally` bandi qachon ishlaydi? / When does the `finally` block run in `try/except/else/finally`?
A) Faqat xato bo'lmasa / Only if no exception occurs
B) Faqat xato bo'lsa / Only if an exception occurs
C) Har doim, xato bo'lsa ham, bo'lmasa ham / Always, whether an exception occurred or not
D) Hech qachon avtomatik ishlamaydi / It never runs automatically

**9.** Subklass ota klassdan meros olgan metodni o'ziga xos tarzda qayta ta'riflasa, bu qanday ataladi? / When a subclass redefines an inherited method with its own implementation, what is this called?
A) Metod yuklash / Overloading
B) Metodni qayta yozish / Overriding
C) Inkapsulatsiya / Encapsulation
D) Kompozitsiya / Composition

**10.** `range(1_000_000)` haqida qaysi fikr to'g'ri? / Which statement about `range(1_000_000)` is true?
A) Barcha million sonni darhol xotirada saqlaydi / It immediately stores all million numbers in memory
B) U dangasa (lazy) va doimiy, kichik xotira egallaydi / It's lazy and occupies a small, constant amount of memory
C) Faqat `list()` bilan o'ralganda ishlaydi / It only works when wrapped in `list()`
D) Har safar diskka yozadi / It writes to disk every time

---

## 🟡 Intermediate (11–20)

**11.** Python-da `asyncio` va `threading` orasidagi asosiy farq nima? / What is the main difference between `asyncio` and `threading` in Python?
A) `asyncio` faqat CPU-bound vazifalar uchun; `threading` I/O-bound uchun / `asyncio` is only for CPU-bound tasks; `threading` is for I/O-bound tasks
B) `asyncio` bir thread ichida kooperativ asinxronlik taqdim etadi, `threading` bir nechta OS threadlardan foydalanadi / `asyncio` provides cooperative concurrency in a single thread, while `threading` uses multiple OS threads
C) `threading` har doim tezroq ishlaydi / `threading` is always faster
D) Ular bir xil narsa / They are the same thing

**12.** Generator funksiyasini oddiy funksiyadan nima ajratib turadi? / What distinguishes a generator function from a regular function?
A) `return` o'rniga `yield` ishlatadi va qiymatlarni birma-bir, dangasalik bilan qaytaradi / It uses `yield` instead of `return` and lazily produces values one at a time
B) Har doim `None` qaytaradi / It always returns `None`
C) `self` parametrini talab qiladi / It requires a `self` parameter
D) Faqat klass ichida bo'lishi mumkin / It can only exist inside a class

**13.** Closure (yopiq funksiya) haqida qaysi ta'rif to'g'ri? / Which statement correctly describes a closure?
A) Bu faqat global o'zgaruvchilarga kira oladigan funksiya / A function that can only access global variables
B) Tashqi funksiya tugagandan keyin ham o'zi qamrab olgan doiradagi o'zgaruvchilarni eslab qoladigan ichki funksiya / An inner function that remembers variables from its enclosing scope even after the outer function has finished
C) Faqat `lambda` orqali yaratiladigan funksiya / A function that can only be created with `lambda`
D) O'zini rekursiv chaqiradigan metod / A method that recursively calls itself

**14.** `@property` dekoratori nima qiladi? / What does the `@property` decorator do?
A) Metodni statik metodga aylantiradi / Turns a method into a static method
B) Metodni parametrsiz, atribut kabi chaqirish imkonini beradi, ixtiyoriy setter bilan / Lets a method be accessed like an attribute (without parentheses), with an optional setter
C) Klassni abstrakt qiladi / Makes the class abstract
D) Metodni classmethod'ga aylantiradi / Turns the method into a classmethod

**15.** Kompozitsiya (composition) va agregatsiya (aggregation) orasidagi asosiy farq nima? / What's the key difference between composition and aggregation?
A) Farq yo'q, ular bir xil / No difference, they're identical
B) Kompozitsiyada ichki ob'ekt egasi bilan chambarchas bog'liq, agregatsiyada esa mustaqil yashay oladi / In composition the contained object's lifecycle is tied to its owner; in aggregation it can exist independently
C) Agregatsiya faqat meros orqali amalga oshiriladi / Aggregation is only implemented via inheritance
D) Kompozitsiya faqat abstrakt klasslarda ishlaydi / Composition only works with abstract classes

**16.** `with` blokidan foydalanishning asosiy maqsadi nima? / What is the main purpose of using a `with` block?
A) Faqat funksiyalarni dekore qilish uchun / Only for decorating functions
B) Resurslarni to'g'ri ochib-yopish va cleanup qilish uchun / To open and close resources safely and clean up afterward
C) Kodni tezlashtirish uchun / To speed up code
D) Obyektni immutable qilish uchun / To make an object immutable

**17.** `@dataclass(frozen=True)` bilan yaratilgan obyektning atributiga qiymat berishga urinilsa, nima yuz beradi? / What happens if you try to reassign an attribute on an object created with `@dataclass(frozen=True)`?
A) Muvaffaqiyatli o'zgaradi / It changes successfully
B) `FrozenInstanceError` chiqadi / It raises `FrozenInstanceError`
C) Jim tarzda e'tiborsiz qoldiriladi / It's silently ignored
D) Yangi klass avtomatik yaratiladi / A new class is automatically created

**18.** Iterator va iterable orasidagi farq nima? / What's the difference between an iterator and an iterable?
A) Iterable'da faqat `__iter__` bor, iteratorda esa ham `__iter__` ham `__next__` bor / An iterable has only `__iter__`; an iterator has both `__iter__` and `__next__`
B) Ular bir xil narsa / They are the same thing
C) Iterator faqat listlar uchun mavjud / Iterators only exist for lists
D) Iterable har doim tezroq ishlaydi / Iterables are always faster

**19.** `collections.Counter` nima uchun ishlatiladi? / What is `collections.Counter` used for?
A) Ro'yxatni tartiblash uchun / For sorting a list
B) Elementlarning takrorlanish sonini hisoblash uchun / For counting the occurrences of elements
C) Fayllarni o'qish uchun / For reading files
D) Vaqtni o'lchash uchun / For measuring time

**20.** `multiprocessing` qachon ko'proq foydali bo'ladi? / When is `multiprocessing` most useful?
A) Faqat network so'rovlarini kutishda / Only while waiting on network requests
B) CPU-bound og'ir hisob-kitoblar uchun, ko'p yadrodan foydalanayotganda / For CPU-bound heavy computation that can use multiple cores
C) Faqat GUI ilovalarda / Only in GUI apps
D) Faqat dekoratorlar bilan ishlaganda / Only when using decorators

---

## 🔴 Advanced (21–30)

**21.** `class D(B, C)` bo'lib, ikkalasi ham `A` dan meros olsa (olmos meros/diamond inheritance), Python metodni qaysi tartibda qidiradi? / With `class D(B, C)` where both `B` and `C` inherit from `A` (diamond inheritance), in what order does Python resolve method lookup?
A) Tasodifiy tartibda / In random order
B) C3 linearizatsiyaga asoslangan MRO bo'yicha: D → B → C → A / Via MRO based on C3 linearization: D → B → C → A
C) Faqat `A` dan to'g'ridan-to'g'ri / Only directly from `A`
D) Alifbo tartibida / In alphabetical order

**22.** `__slots__` ishlatishning asosiy afzalligi nima? / What is the main benefit of using `__slots__`?
A) Metodlarni tezroq ishlaydigan qiladi / It makes methods run faster
B) `__dict__` ni olib tashlab xotirani tejaydi va dinamik atribut qo'shishni cheklaydi / It removes `__dict__`, saving memory and preventing dynamic attribute creation
C) Klassni abstrakt qiladi / It makes the class abstract
D) Meros olishni butunlay bloklaydi / It completely blocks inheritance

**23.** `list.sort()` va `sorted(list)` orasidagi farq nima? / What's the difference between `list.sort()` and `sorted(list)`?
A) `sort()` ro'yxatni joyida o'zgartirib `None` qaytaradi; `sorted()` yangi ro'yxat qaytaradi va har qanday iterablda ishlaydi / `sort()` mutates the list in place and returns `None`; `sorted()` returns a new list and works on any iterable
B) Ular bir xil ishlaydi / They behave identically
C) `sorted()` faqat ro'yxatlarda ishlaydi / `sorted()` only works on lists
D) `sort()` yangi ro'yxat qaytaradi / `sort()` returns a new list

**24.** GIL (Global Interpreter Lock) nimani cheklaydi va CPU-intensiv vazifalar uchun qanday yechim tavsiya etiladi? / What does the GIL restrict, and what's the recommended workaround for CPU-bound tasks?
A) Faylga yozishni cheklaydi; yechim — `asyncio` / It restricts file writes; the fix is `asyncio`
B) Bir vaqtda faqat bitta thread bayt kod bajarishini cheklaydi; yechim — `multiprocessing` / It allows only one thread to execute bytecode at a time; the fix is `multiprocessing`
C) Tarmoq so'rovlarini cheklaydi; yechim — `threading` / It restricts network requests; the fix is `threading`
D) Hech narsani cheklamaydi / It restricts nothing

**25.** Descriptor protokoli (`__get__`, `__set__`, `__delete__`) nimaning asosini tashkil qiladi? / What is the descriptor protocol (`__get__`, `__set__`, `__delete__`) the foundation of?
A) `try/except` bloklarining / Of `try/except` blocks
B) `property`, `classmethod`, `staticmethod` kabi vositalarning / Of tools like `property`, `classmethod`, and `staticmethod`
C) `for` tsiklining / Of the `for` loop
D) Modul importlarining / Of module imports

**26.** `__new__` va `__init__` orasidagi farq nima? / What is the difference between `__new__` and `__init__`?
A) `__new__` instansni yaratadi (obyektni qaytaradi), `__init__` uni ishga tushiradi (holatini o'rnatadi) / `__new__` creates the instance (returns an object), `__init__` initializes it (sets its state)
B) Ular bir xil vazifani bajaradi / They do the same job
C) `__init__` instansni yaratadi, `__new__` uni ishga tushiradi / `__init__` creates the instance, `__new__` initializes it
D) Ulardan faqat bittasidan foydalanish mumkin, hech qachon ikkalasi birga emas / Only one of them can ever be used, never both together

**27.** Liskov almashtirish printsipi (LSP) nimani talab qiladi? / What does the Liskov Substitution Principle (LSP) require?
A) Har bir klass yagona metodga ega bo'lishi kerak / Every class must have only one method
B) Subklass obyektlari dasturni buzmasdan ota klass obyektlarini almashtira olishi kerak / Subclass objects must be substitutable for base class objects without breaking the program
C) Klasslar hech qachon meros olmasligi kerak / Classes must never inherit from each other
D) Har bir metod statik bo'lishi kerak / Every method must be static

**28.** Dependency Inversion Principle (DIP) nimani targ'ib qiladi? / What does the Dependency Inversion Principle (DIP) advocate?
A) Yuqori darajali modullar past darajali modullarga to'g'ridan-to'g'ri bog'liq bo'lishi kerak / High-level modules should directly depend on low-level modules
B) Yuqori va past darajali modullar ikkalasi ham abstraktsiyalarga bog'liq bo'lishi kerak / Both high-level and low-level modules should depend on abstractions
C) Hech qanday interfeys ishlatilmasligi kerak / No interfaces should ever be used
D) Faqat bitta klass barcha ishni bajarishi kerak / Only one class should do all the work

**29.** `isinstance(obj, ParentClass)` bilan `type(obj) == ParentClass` orasidagi farq nima? / What's the difference between `isinstance(obj, ParentClass)` and `type(obj) == ParentClass`?
A) `isinstance` meros ierarxiyasini hisobga oladi (subklasslar uchun ham `True`), `type()` faqat aniq turni tekshiradi / `isinstance` respects the inheritance hierarchy (also `True` for subclasses), `type()` checks only the exact type
B) Ular har doim bir xil natija beradi / They always give the same result
C) `type()` subklasslar uchun ham `True` qaytaradi / `type()` also returns `True` for subclasses
D) `isinstance` faqat built-in turlar uchun ishlaydi / `isinstance` only works on built-in types

**30.** Factory pattern nimani ta'minlaydi? / What does the Factory pattern provide?
A) Klassning faqat bitta nusxasini / Only a single instance of a class
B) Obyekt yaratish uchun interfeys, chaqiruvchi kod aniq turni bilishi shart emas / An interface for creating objects, without the calling code needing to know the exact concrete type being created
C) Ikkita mos kelmaydigan interfeysni bog'lashni / Bridging two incompatible interfaces
D) Obyektga kirishni nazorat qilish va keshlashni / Controlling access to and caching an object

---

## ✅ Javoblar / Answer Key

| #   | Javob | #   | Javob | #   | Javob |
| --- | ----- | --- | ----- | --- | ----- |
| 1   | B     | 11  | B     | 21  | B     |
| 2   | B     | 12  | A     | 22  | B     |
| 3   | C     | 13  | B     | 23  | A     |
| 4   | B     | 14  | B     | 24  | B     |
| 5   | B     | 15  | B     | 25  | B     |
| 6   | B     | 16  | B     | 26  | A     |
| 7   | C     | 17  | B     | 27  | B     |
| 8   | C     | 18  | A     | 28  | B     |
| 9   | B     | 19  | B     | 29  | A     |
| 10  | B     | 20  | B     | 30  | B     |

**Natijangizni baholang / Score yourself:**

- 27–30 to'g'ri: Ekspert daraja 🏆 / Expert level
- 21–26 to'g'ri: Ilg'or daraja 🔴 / Advanced level
- 14–20 to'g'ri: O'rta daraja 🟡 / Intermediate level
- <14 to'g'ri: `python/basics.md` va `python/oop.md` ni qayta ko'rib chiqing 🟢 / Review `python/basics.md` and `python/oop.md`

---

_Tayyorlagan / Prepared by: Alyorjon | interactive_quiz_tester agenti asosida_
