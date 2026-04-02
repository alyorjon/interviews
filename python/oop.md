# 100 OOP Interview Questions & Answers | Savol va Javoblar
### English + O'zbek | Python Examples

---

## 📌 Table of Contents | Mundarija

1. [Core Concepts | Asosiy Tushunchalar (1–12)](#1-core-concepts--asosiy-tushunchalar)
2. [Keywords & Methods | Kalit So'zlar (13–16)](#2-keywords--methods--kalit-sozlar)
3. [Inheritance & Relations | Meros va Munosabatlar (17–28)](#3-inheritance--relations--meros-va-munosabatlar)
4. [Object Patterns | Obyekt Patternlari (29–36)](#4-object-patterns--obyekt-patternlari)
5. [Advanced OOP | Ilg'or OOP (37–60)](#5-advanced-oop--ilgor-oop)
6. [Binding & Casting | Bog'lash va Konvertatsiya (61–78)](#6-binding--casting--boglash-va-konvertatsiya)
7. [SOLID Principles | SOLID Tamoyillar (79–82)](#7-solid-principles--solid-tamoyillar)
8. [Design Patterns | Dizayn Patternlar (83–94)](#8-design-patterns--dizayn-patternlar)
9. [Other Concepts | Boshqa Tushunchalar (95–100)](#9-other-concepts--boshqa-tushunchalar)

---

## 1. Core Concepts | Asosiy Tushunchalar

---

### 1. What is OOP? | OOP nima?

**EN:** A programming paradigm based on **objects** and **classes** that models real-world entities.

**UZB:** Haqiqiy dunyodagi narsalarni **obyektlar** va **klasslar** orqali modellaydigan dasturlash paradigmasi.

```python
# EN: Modeling a real-world Car using OOP
# UZB: Haqiqiy avtomobilni OOP orqali modellash

class Car:
    def __init__(self, brand, speed):
        self.brand = brand   # EN: attribute | UZB: xususiyat
        self.speed = speed

    def drive(self):
        # EN: method — defines behavior
        # UZB: metod — xatti-harakatni belgilaydi
        print(f"{self.brand} is driving at {self.speed} km/h")

car = Car("Tesla", 200)
car.drive()  # Tesla is driving at 200 km/h
```

---

### 2. What are the four pillars of OOP? | OOP ning to'rt ustuni nima?

**EN:** **Encapsulation, Inheritance, Polymorphism, Abstraction.**

**UZB:** **Inkapsulatsiya, Meros olish, Polimorfizm, Abstraktsiya.**

```python
# EN: All four pillars in one example
# UZB: To'rt ustunning bir misoldagi ko'rinishi

from abc import ABC, abstractmethod

class Animal(ABC):           # Abstraction | Abstraktsiya
    def __init__(self, name):
        self.__name = name   # Encapsulation | Inkapsulatsiya (private)

    def get_name(self):
        return self.__name

    @abstractmethod
    def speak(self):         # Polymorphism | Polimorfizm (abstract)
        pass

class Dog(Animal):           # Inheritance | Meros olish
    def speak(self):
        return f"{self.get_name()} says: Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.get_name()} says: Meow!"

animals = [Dog("Rex"), Cat("Whiskers")]
for a in animals:
    print(a.speak())
# Rex says: Woof!
# Whiskers says: Meow!
```

---

### 3. What is a class? | Klass nima?

**EN:** A **blueprint** for creating objects — defines attributes and methods.

**UZB:** Obyektlar yaratish uchun **qolip** — atributlar va metodlarni belgilaydi.

```python
# EN: Class is like a cookie cutter — the cutter is the class, cookies are objects
# UZB: Klass — pechenye qolipiga o'xshaydi, qolip = klass, pechenye = obyekt

class Person:
    # EN: class variable — shared by all instances
    # UZB: klass o'zgaruvchisi — barcha obyektlar uchun umumiy
    species = "Homo sapiens"

    def __init__(self, name: str, age: int):
        # EN: instance variables — unique to each object
        # UZB: instance o'zgaruvchilari — har bir obyektga xos
        self.name = name
        self.age = age

    def greet(self) -> str:
        return f"Hi, I'm {self.name}, age {self.age}"

p1 = Person("Alyorjon", 25)
p2 = Person("Jasur", 30)

print(p1.greet())          # Hi, I'm Alyorjon, age 25
print(p2.greet())          # Hi, I'm Jasur, age 30
print(Person.species)      # Homo sapiens
```

---

### 4. What is an object? | Obyekt nima?

**EN:** An **instance** of a class — a concrete entity created from a blueprint.

**UZB:** Klassning **namunasi** — qolipdan yaratilgan aniq narsa.

```python
# EN: Each object has its own state but shares the class structure
# UZB: Har bir obyekt o'z holatiga ega, lekin klass tuzilishini ulashadi

class Book:
    def __init__(self, title: str, pages: int):
        self.title = title
        self.pages = pages
        self.current_page = 0        # EN: object state | UZB: obyekt holati

    def read(self, n: int):
        self.current_page = min(self.current_page + n, self.pages)
        return f"Read to page {self.current_page}/{self.pages}"

# EN: Two independent objects from the same class
# UZB: Bir xil klassdan ikki mustaqil obyekt
book1 = Book("Clean Code", 431)
book2 = Book("The Pragmatic Programmer", 352)

print(book1.read(50))   # Read to page 50/431
print(book2.read(100))  # Read to page 100/352
print(book1.current_page)  # 50  — mustaqil holat
```

---

### 5. What is encapsulation? | Inkapsulatsiya nima?

**EN:** Bundling **data and methods** into a single unit and **restricting direct access** to internal state.

**UZB:** **Ma'lumot va metodlarni** bitta birlikka jamlash va ichki holatga **to'g'ridan-to'g'ri kirishni cheklash**.

```python
# EN: Bank account — classic encapsulation example
# UZB: Bank hisobi — klassik inkapsulatsiya misoli

class BankAccount:
    def __init__(self, owner: str, balance: float):
        self.owner = owner
        self.__balance = balance     # EN: private — hidden from outside
                                     # UZB: private — tashqaridan yashirilgan

    def deposit(self, amount: float):
        # EN: controlled access through methods
        # UZB: metodlar orqali nazorat qilinadigan kirish
        if amount <= 0:
            raise ValueError("Amount must be positive | Summa musbat bo'lishi kerak")
        self.__balance += amount
        return self.__balance

    def withdraw(self, amount: float):
        if amount > self.__balance:
            raise ValueError("Insufficient funds | Mablag' yetarli emas")
        self.__balance -= amount

    @property
    def balance(self) -> float:      # EN: getter | UZB: getter
        return self.__balance

acc = BankAccount("Alyorjon", 1_000_000)
acc.deposit(500_000)
print(acc.balance)       # 1500000
# acc.__balance          # AttributeError! — encapsulation ishlayapti
```

---

### 6. What is inheritance? | Meros olish nima?

**EN:** A mechanism where one class **acquires properties and behavior** from another class.

**UZB:** Bir klassning boshqa klassdan **xususiyat va xatti-harakatlarni o'zlashtirishi** mexanizmi.

```python
# EN: Vehicle hierarchy — inheritance chain
# UZB: Transport ierarxiyasi — meros zanjiri

class Vehicle:
    def __init__(self, brand: str, speed: int):
        self.brand = brand
        self.speed = speed

    def move(self) -> str:
        return f"{self.brand} moves at {self.speed} km/h"

class Car(Vehicle):                  # EN: inherits from Vehicle | UZB: Vehicle'dan meros oladi
    def __init__(self, brand, speed, doors):
        super().__init__(brand, speed)  # EN: call parent | UZB: parent'ni chaqirish
        self.doors = doors

    def honk(self) -> str:
        return f"{self.brand}: Beep beep!"

class ElectricCar(Car):              # EN: multi-level inheritance | UZB: ko'p darajali meros
    def __init__(self, brand, speed, doors, battery_kwh):
        super().__init__(brand, speed, doors)
        self.battery_kwh = battery_kwh

    def charge_info(self) -> str:
        return f"Battery: {self.battery_kwh} kWh"

tesla = ElectricCar("Tesla", 250, 4, 100)
print(tesla.move())         # Tesla moves at 250 km/h  (Vehicle dan)
print(tesla.honk())         # Tesla: Beep beep!        (Car dan)
print(tesla.charge_info())  # Battery: 100 kWh         (ElectricCar dan)
```

---

### 7. What is polymorphism? | Polimorfizm nima?

**EN:** The ability to take **many forms** — one interface behaves differently based on the object.

**UZB:** **Ko'p shakl** olish qobiliyati — bir interfeys obyektga qarab boshqacha ishlaydi.

```python
# EN: Same method name, different behavior — runtime polymorphism
# UZB: Bir xil metod nomi, boshqacha xatti-harakat — runtime polimorfizmi

import math

class Shape:
    def area(self) -> float:
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return math.pi * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

class Triangle(Shape):
    def __init__(self, base: float, height: float):
        self.base = base
        self.height = height

    def area(self) -> float:
        return 0.5 * self.base * self.height

# EN: One function works with all shapes — polymorphism
# UZB: Bir funksiya barcha shakllar bilan ishlaydi — polimorfizm
shapes: list[Shape] = [Circle(5), Rectangle(4, 6), Triangle(3, 8)]
for shape in shapes:
    print(f"{type(shape).__name__}: area = {shape.area():.2f}")
# Circle: area = 78.54
# Rectangle: area = 24.00
# Triangle: area = 12.00
```

---

### 8. What is abstraction? | Abstraktsiya nima?

**EN:** **Hiding complex implementation details** and showing only the essential features to the user.

**UZB:** **Murakkab amalga oshirish tafsilotlarini yashirish** va foydalanuvchiga faqat muhim xususiyatlarni ko'rsatish.

```python
# EN: User doesn't know HOW it works, only WHAT it does
# UZB: Foydalanuvchi QANDAY ishlashini emas, NIMA qilishini biladi

from abc import ABC, abstractmethod

class PaymentProcessor(ABC):         # EN: abstract interface | UZB: abstrakt interfeys
    @abstractmethod
    def charge(self, amount: float) -> bool:
        pass

    @abstractmethod
    def refund(self, transaction_id: str) -> bool:
        pass

    def process_payment(self, amount: float):
        # EN: template method — uses abstract methods internally
        # UZB: shablon metod — ichida abstrakt metodlardan foydalanadi
        print(f"Processing ${amount}...")
        success = self.charge(amount)
        return "Success | Muvaffaqiyatli" if success else "Failed | Xatolik"

class StripeProcessor(PaymentProcessor):
    def charge(self, amount):
        print(f"[Stripe] Charged ${amount}")   # EN: complex API hidden
        return True                             # UZB: murakkab API yashirilgan

    def refund(self, transaction_id):
        print(f"[Stripe] Refunded {transaction_id}")
        return True

stripe = StripeProcessor()
print(stripe.process_payment(99.99))
# Processing $99.99...
# [Stripe] Charged $99.99
# Success | Muvaffaqiyatli
```

---

### 9. What is method overloading? | Metod yuklash nima?

**EN:** Multiple methods with the **same name but different parameters** in the same class. Python simulates this with default args or `*args`.

**UZB:** Bir xil klassda **bir xil nom lekin boshqa parametrlar** bilan bir nechta metod. Python buni default argumentlar yoki `*args` bilan simulyatsiya qiladi.

```python
# EN: Python doesn't natively support overloading — we simulate it
# UZB: Python overloading'ni bevosita qo'llab-quvvatlamaydi — simulyatsiya qilamiz

class Calculator:
    # EN: Approach 1 — default arguments
    # UZB: 1-usul — standart argumentlar
    def add(self, a: float, b: float = 0, c: float = 0) -> float:
        return a + b + c

    # EN: Approach 2 — *args for variable count
    # UZB: 2-usul — o'zgaruvchan sondagi argumentlar uchun *args
    def multiply(self, *args: float) -> float:
        result = 1
        for n in args:
            result *= n
        return result

calc = Calculator()
print(calc.add(5))          # 5   — bitta argument
print(calc.add(5, 3))       # 8   — ikki argument
print(calc.add(5, 3, 2))    # 10  — uch argument
print(calc.multiply(2, 3, 4))  # 24
```

---

### 10. What is method overriding? | Metodni qayta yozish nima?

**EN:** A **subclass redefines** a method inherited from its superclass to provide specific behavior.

**UZB:** **Subklass** ota klassdan meros olgan metodini o'ziga xos xatti-harakat berish uchun **qayta ta'riflashi**.

```python
# EN: Override — subclass gives its own implementation
# UZB: Override — subklass o'zining amalga oshirishini beradi

class Notification:
    def send(self, message: str) -> str:
        return f"[BASE] Sending: {message}"

class EmailNotification(Notification):
    def __init__(self, email: str):
        self.email = email

    def send(self, message: str) -> str:   # EN: overriding | UZB: qayta yozish
        return f"[EMAIL → {self.email}] {message}"

class SMSNotification(Notification):
    def __init__(self, phone: str):
        self.phone = phone

    def send(self, message: str) -> str:
        return f"[SMS → {self.phone}] {message}"

notifications = [
    EmailNotification("a@example.com"),
    SMSNotification("+998901234567"),
    Notification()
]

for n in notifications:
    print(n.send("Order confirmed | Buyurtma tasdiqlandi"))
```

---

### 11. What is a constructor? | Konstruktor nima?

**EN:** A special method (`__init__`) automatically called when an object is created to **initialize** it.

**UZB:** Obyekt yaratilganda avtomatik chaqiriladigan va uni **ishga tushiradigan** maxsus metod (`__init__`).

```python
# EN: Constructor sets up the initial state of an object
# UZB: Konstruktor obyektning boshlang'ich holatini o'rnatadi

class DatabaseConnection:
    _connection_count = 0  # EN: class variable | UZB: klass o'zgaruvchisi

    def __init__(self, host: str, port: int, db_name: str):
        # EN: initialize all required attributes
        # UZB: barcha kerakli atributlarni ishga tushirish
        self.host = host
        self.port = port
        self.db_name = db_name
        self.connected = False
        DatabaseConnection._connection_count += 1
        print(f"Connection #{DatabaseConnection._connection_count} created to {host}:{port}")

    def connect(self):
        self.connected = True
        return f"Connected to {self.db_name}"

conn1 = DatabaseConnection("localhost", 5432, "myapp")
conn2 = DatabaseConnection("prod.server.com", 5432, "production")
# Connection #1 created to localhost:5432
# Connection #2 created to prod.server.com:5432
```

---

### 12. What is a destructor? | Destruktor nima?

**EN:** A special method (`__del__`) invoked **when an object is destroyed** or garbage collected.

**UZB:** Obyekt **yo'q qilinganda** yoki xotira tozalaganda chaqiriladigan maxsus metod (`__del__`).

```python
# EN: Destructor ensures cleanup — closing files, connections, etc.
# UZB: Destruktor tozalashni ta'minlaydi — fayllar, ulanishlarni yopish

class FileManager:
    def __init__(self, filename: str):
        self.filename = filename
        self.file = open(filename, 'w')
        print(f"[OPEN] {filename}")

    def write(self, data: str):
        self.file.write(data)

    def __del__(self):
        # EN: guaranteed cleanup when object is destroyed
        # UZB: obyekt yo'q qilinganda kafolatlangan tozalash
        if not self.file.closed:
            self.file.close()
            print(f"[CLOSE] {self.filename}")

fm = FileManager("output.txt")
fm.write("Hello, World!")
del fm
# [OPEN] output.txt
# [CLOSE] output.txt
```

---

## 2. Keywords & Methods | Kalit So'zlar

---

### 13. What is `this` keyword? | `this` kalit so'z nima?

**EN:** In Python it's **`self`** — refers to the **current object instance** inside a method.

**UZB:** Python'da bu **`self`** — metod ichida **joriy obyektning o'zini** ko'rsatadi.

```python
# EN: self always refers to the specific object calling the method
# UZB: self har doim metodni chaqirayotgan aniq obyektni ko'rsatadi

class Counter:
    def __init__(self, start: int = 0):
        self.count = start           # EN: self.count = this object's count
                                     # UZB: self.count = bu obyektning count'i

    def increment(self):
        self.count += 1
        return self                  # EN: return self for method chaining
                                     # UZB: method chaining uchun self qaytarish

    def reset(self):
        self.count = 0
        return self

    def __repr__(self):
        return f"Counter({self.count})"

c = Counter(0)
# EN: Method chaining — possible because each method returns self
# UZB: Method chaining — har bir metod self qaytargani uchun mumkin
result = c.increment().increment().increment().reset().increment()
print(result)  # Counter(1)
```

---

### 14. What is `super` keyword? | `super` kalit so'z nima?

**EN:** `super()` refers to the **parent class** — used to call parent methods and constructor.

**UZB:** `super()` **ota klassni** ko'rsatadi — ota klass metodlari va konstruktorini chaqirish uchun ishlatiladi.

```python
# EN: super() is essential when extending parent class behavior
# UZB: super() ota klass xatti-harakatini kengaytirganda muhim

class Animal:
    def __init__(self, name: str, sound: str):
        self.name = name
        self.sound = sound
        print(f"Animal created: {name}")

    def describe(self) -> str:
        return f"{self.name} makes '{self.sound}' sound"

class Dog(Animal):
    def __init__(self, name: str, breed: str):
        super().__init__(name, "Woof")   # EN: call parent __init__
                                          # UZB: ota klass __init__'ni chaqirish
        self.breed = breed
        print(f"Dog breed: {breed}")

    def describe(self) -> str:
        base = super().describe()        # EN: extend parent method
                                          # UZB: ota klass metodini kengaytirish
        return f"{base} | Breed: {self.breed}"

dog = Dog("Rex", "Labrador")
print(dog.describe())
# Animal created: Rex
# Dog breed: Labrador
# Rex makes 'Woof' sound | Breed: Labrador
```

---

### 15. What is a static method? | Statik metod nima?

**EN:** A method that **belongs to the class**, not to any specific instance — no `self` or `cls` parameter.

**UZB:** **Klassga tegishli** metod, alohida obyektga emas — `self` yoki `cls` parametri yo'q.

```python
# EN: Static methods — utility functions logically related to the class
# UZB: Statik metodlar — klassga mantiqan bog'liq yordamchi funksiyalar

class TemperatureConverter:
    @staticmethod
    def celsius_to_fahrenheit(c: float) -> float:
        return (c * 9/5) + 32

    @staticmethod
    def fahrenheit_to_celsius(f: float) -> float:
        return (f - 32) * 5/9

    @staticmethod
    def celsius_to_kelvin(c: float) -> float:
        return c + 273.15

# EN: Call without creating an instance
# UZB: Obyekt yaratmasdan chaqirish
print(TemperatureConverter.celsius_to_fahrenheit(100))  # 212.0
print(TemperatureConverter.fahrenheit_to_celsius(98.6)) # 37.0
print(TemperatureConverter.celsius_to_kelvin(0))        # 273.15
```

---

### 16. What is a final class? | Final klass nima?

**EN:** A class that **cannot be inherited** from. Python simulates this with `__init_subclass__`.

**UZB:** Undan **meros olib bo'lmaydigan** klass. Python buni `__init_subclass__` bilan simulyatsiya qiladi.

```python
# EN: Final class — prevents unintended subclassing
# UZB: Final klass — noto'g'ri meros olishni oldini oladi

class FinalMeta(type):
    """EN: Metaclass that prevents inheritance | UZB: Merosni bloklaydi"""
    def __new__(mcs, name, bases, namespace):
        for base in bases:
            if getattr(base, '_is_final', False):
                raise TypeError(
                    f"EN: Cannot inherit from final class '{base.__name__}'\n"
                    f"UZB: '{base.__name__}' final klassidan meros olib bo'lmaydi"
                )
        return super().__new__(mcs, name, bases, namespace)

class AppConfig(metaclass=FinalMeta):
    _is_final = True

    def __init__(self):
        self.debug = False
        self.version = "1.0.0"

config = AppConfig()
print(config.version)   # 1.0.0

# class MyConfig(AppConfig): pass  # TypeError!
```

---

## 3. Inheritance & Relations | Meros va Munosabatlar

---

### 17. What is multiple inheritance? | Ko'p meros olish nima?

**EN:** A class **inheriting from more than one parent class** simultaneously.

**UZB:** Bir klassning **bir vaqtning o'zida bir nechta ota klassdan meros olishi**.

```python
# EN: Multiple inheritance — useful for mixins and combining behaviors
# UZB: Ko'p meros olish — mixin va xatti-harakatlarni birlashtirish uchun foydali

class Flyable:
    def fly(self) -> str:
        return f"{self.__class__.__name__} is flying!"

class Swimmable:
    def swim(self) -> str:
        return f"{self.__class__.__name__} is swimming!"

class Runnable:
    def run(self) -> str:
        return f"{self.__class__.__name__} is running!"

class Duck(Flyable, Swimmable, Runnable):  # EN: 3 parents | UZB: 3 ota klass
    def quack(self) -> str:
        return "Quack! | Vak-vak!"

duck = Duck()
print(duck.fly())    # Duck is flying!
print(duck.swim())   # Duck is swimming!
print(duck.run())    # Duck is running!
print(duck.quack())  # Quack! | Vak-vak!
print(Duck.__mro__)  # EN: MRO order | UZB: MRO tartibi
```

---

### 18. What is an abstract class? | Abstrakt klass nima?

**EN:** A class that **cannot be instantiated** and may contain abstract methods that subclasses must implement.

**UZB:** **Yaratib bo'lmaydigan** klass; subklasslar amalga oshirishi kerak bo'lgan abstrakt metodlarni o'z ichiga olishi mumkin.

```python
# EN: Abstract class — defines contract for subclasses
# UZB: Abstrakt klass — subklasslar uchun shartnoma belgilaydi

from abc import ABC, abstractmethod

class ReportGenerator(ABC):
    def __init__(self, title: str):
        self.title = title

    @abstractmethod
    def fetch_data(self) -> list:
        pass                    # EN: must implement | UZB: amalga oshirish shart

    @abstractmethod
    def format_output(self, data: list) -> str:
        pass

    def generate(self) -> str:  # EN: concrete method using abstract ones
                                 # UZB: abstrakt metodlarni ishlatuvchi konkret metod
        data = self.fetch_data()
        return self.format_output(data)

class SalesReport(ReportGenerator):
    def fetch_data(self) -> list:
        return [("Jan", 1200), ("Feb", 1800), ("Mar", 2100)]

    def format_output(self, data: list) -> str:
        rows = "\n".join(f"  {m}: ${v}" for m, v in data)
        return f"=== {self.title} ===\n{rows}"

# ReportGenerator("test")  # TypeError! — abstrakt klass
report = SalesReport("Q1 Sales | Q1 Savdolari")
print(report.generate())
```

---

### 19. What is an interface? | Interfeys nima?

**EN:** A **contract** that defines a set of methods with no implementation — all methods must be implemented by classes.

**UZB:** Amalga oshiruvchi metodlarsiz **shartnoma** — barcha metodlar klasslar tomonidan amalga oshirilishi kerak.

```python
# EN: Interface — pure contract, no implementation details
# UZB: Interfeys — sof shartnoma, amalga oshirish tafsilotlari yo'q

from abc import ABC, abstractmethod

class Serializable(ABC):           # EN: interface | UZB: interfeys
    @abstractmethod
    def to_json(self) -> str: pass

    @abstractmethod
    def to_dict(self) -> dict: pass

class Cacheable(ABC):
    @abstractmethod
    def cache_key(self) -> str: pass

    @abstractmethod
    def ttl(self) -> int: pass

# EN: Implement multiple interfaces
# UZB: Bir nechta interfeys amalga oshirish
class UserProfile(Serializable, Cacheable):
    def __init__(self, user_id: int, name: str):
        self.user_id = user_id
        self.name = name

    def to_json(self) -> str:
        import json
        return json.dumps(self.to_dict())

    def to_dict(self) -> dict:
        return {"id": self.user_id, "name": self.name}

    def cache_key(self) -> str:
        return f"user:{self.user_id}"

    def ttl(self) -> int:
        return 3600  # EN: 1 hour | UZB: 1 soat

user = UserProfile(1, "Alyorjon")
print(user.to_json())       # {"id": 1, "name": "Alyorjon"}
print(user.cache_key())     # user:1
```

---

### 20. What is a virtual function? | Virtual funksiya nima?

**EN:** A function that **can be overridden** in a derived class. In Python, all methods are virtual by default.

**UZB:** Hosila klassda **qayta yozilishi mumkin** bo'lgan funksiya. Python'da barcha metodlar standart holda virtualdir.

```python
# EN: In Python every method is virtual — subclass can always override
# UZB: Python'da har bir metod virtual — subklass har doim qayta yoza oladi

class Logger:
    def log(self, level: str, message: str):    # EN: virtual | UZB: virtual
        print(f"[{level.upper()}] {message}")

class FileLogger(Logger):
    def __init__(self, filepath: str):
        self.filepath = filepath

    def log(self, level: str, message: str):    # EN: overriding | UZB: qayta yozish
        with open(self.filepath, 'a') as f:
            f.write(f"[{level.upper()}] {message}\n")

class ColorLogger(Logger):
    COLORS = {"info": "\033[32m", "error": "\033[31m", "reset": "\033[0m"}

    def log(self, level: str, message: str):
        color = self.COLORS.get(level, "")
        print(f"{color}[{level.upper()}] {message}{self.COLORS['reset']}")

def process(logger: Logger, msg: str):
    logger.log("info", msg)        # EN: which log() is called? runtime decides
                                    # UZB: qaysi log() chaqiriladi? runtime hal qiladi

process(Logger(), "Server started | Server ishga tushdi")
process(ColorLogger(), "User logged in | Foydalanuvchi kirdi")
```

---

### 21. What is a pure virtual function? | Sof virtual funksiya nima?

**EN:** A function that **must be overridden** — has no implementation in the base class (`@abstractmethod`).

**UZB:** **Qayta yozilishi shart** — asosiy klassda amalga oshirilmagan (`@abstractmethod`).

```python
from abc import ABC, abstractmethod

class StorageBackend(ABC):
    @abstractmethod                        # EN: pure virtual | UZB: sof virtual
    def read(self, key: str) -> bytes:
        """EN: Must implement in subclass | UZB: Subklassda amalga oshirish shart"""
        pass

    @abstractmethod
    def write(self, key: str, data: bytes) -> bool:
        pass

    @abstractmethod
    def delete(self, key: str) -> bool:
        pass

class RedisStorage(StorageBackend):
    def read(self, key: str) -> bytes:
        print(f"[Redis] Reading: {key}")
        return b"data"

    def write(self, key: str, data: bytes) -> bool:
        print(f"[Redis] Writing {len(data)} bytes to {key}")
        return True

    def delete(self, key: str) -> bool:
        print(f"[Redis] Deleting: {key}")
        return True

redis = RedisStorage()
redis.write("session:123", b"user_data")
print(redis.read("session:123"))
```

---

### 22. What is dynamic method dispatch? | Dinamik metod chaqirish nima?

**EN:** The process of **resolving which method to call at runtime** based on the actual object type.

**UZB:** Haqiqiy obyekt turiga qarab **qaysi metod chaqirilishini runtime'da hal qilish** jarayoni.

```python
# EN: Python resolves method calls at runtime — dynamic dispatch
# UZB: Python metod chaqiruvlarini runtime'da hal qiladi — dinamik chaqirish

class TaxCalculator:
    def calculate(self, amount: float) -> float:
        return amount * 0.10    # EN: 10% default | UZB: 10% standart

class UzbekTax(TaxCalculator):
    def calculate(self, amount: float) -> float:
        return amount * 0.12    # UZB: O'zbekiston QQS 12%

class EUTax(TaxCalculator):
    def calculate(self, amount: float) -> float:
        return amount * 0.20    # EN: EU VAT 20% | UZB: Evropa QQS 20%

def process_order(calculator: TaxCalculator, price: float):
    # EN: Which calculate() runs? Decided at runtime based on actual type
    # UZB: Qaysi calculate() ishlaydi? Haqiqiy turga qarab runtime'da aniqlanadi
    tax = calculator.calculate(price)
    print(f"Price: ${price:.2f} | Tax: ${tax:.2f} | Total: ${price + tax:.2f}")

process_order(UzbekTax(), 100_000)   # Uzbek tax
process_order(EUTax(), 100_000)      # EU tax
```

---

### 23. What is composition in OOP? | OOP'da kompozitsiya nima?

**EN:** A design where a class **contains objects of other classes** — "has-a" relationship. Preferred over inheritance.

**UZB:** Klass **boshqa klasslar obyektlarini o'z ichiga oladi** — "has-a" munosabati. Merosdan ustun ko'riladi.

```python
# EN: Composition — build complex objects from simpler ones
# UZB: Kompozitsiya — murakkab obyektlarni oddiylaridan qurish

class Engine:
    def __init__(self, horsepower: int):
        self.horsepower = horsepower

    def start(self) -> str:
        return f"Engine ({self.horsepower}hp) started | dvigatel ishga tushdi"

class GPS:
    def navigate(self, destination: str) -> str:
        return f"Navigating to {destination} | {destination} ga yo'l ko'rsatilmoqda"

class MusicPlayer:
    def play(self, song: str) -> str:
        return f"Playing: {song}"

class SmartCar:
    # EN: SmartCar HAS-A Engine, GPS, MusicPlayer — composition
    # UZB: SmartCar Engine, GPS, MusicPlayer GA EGA — kompozitsiya
    def __init__(self, brand: str):
        self.brand = brand
        self.engine = Engine(300)
        self.gps = GPS()
        self.music = MusicPlayer()

    def trip(self, destination: str, song: str):
        print(self.engine.start())
        print(self.gps.navigate(destination))
        print(self.music.play(song))

car = SmartCar("BMW")
car.trip("Tashkent", "Lo'licha")
```

---

### 24. What is aggregation? | Agregatsiya nima?

**EN:** A **weak form of association** — one class uses another, but they can **exist independently**.

**UZB:** **Zaif assotsiatsiya shakli** — bir klass boshqasini ishlatadi, lekin ular **mustaqil mavjud bo'la oladi**.

```python
# EN: Aggregation — objects can live without each other
# UZB: Agregatsiya — obyektlar bir-birisiz yashay oladi

class Address:
    def __init__(self, city: str, street: str):
        self.city = city
        self.street = street

    def __str__(self):
        return f"{self.street}, {self.city}"

class Employee:
    def __init__(self, name: str, address: 'Address'):
        self.name = name
        self.address = address    # EN: aggregation — Address can exist without Employee
                                  # UZB: agregatsiya — Address Employee'siz yashay oladi

# EN: Address exists independently
# UZB: Address mustaqil mavjud
home = Address("Tashkent", "Amir Temur ko'chasi 1")
office = Address("Tashkent", "Yunusobod 7")

emp1 = Employee("Alyorjon", home)
emp2 = Employee("Jasur", home)      # EN: same address — shared object
                                     # UZB: bir xil manzil — ulashilgan obyekt

del emp1                             # EN: deleting employee doesn't delete address
                                     # UZB: xodimni o'chirsak manzil yo'qolmaydi
print(home)                          # Amir Temur ko'chasi 1, Tashkent — hali mavjud
```

---

### 25. What is association? | Assotsiatsiya nima?

**EN:** A relationship where **one class uses or interacts with another**.

**UZB:** Bir klass **boshqasini ishlata olishi yoki u bilan o'zaro ta'sir qilishi** munosabati.

```python
# EN: Association — two classes interact but neither owns the other
# UZB: Assotsiatsiya — ikki klass o'zaro ta'sir qiladi, lekin biri ikkinchisiga tegishli emas

class Teacher:
    def __init__(self, name: str, subject: str):
        self.name = name
        self.subject = subject

    def teach(self, student: 'Student') -> str:
        return f"{self.name} teaches {self.subject} to {student.name}"

class Student:
    def __init__(self, name: str):
        self.name = name
        self.grades = {}

    def receive_grade(self, subject: str, grade: float):
        self.grades[subject] = grade
        print(f"{self.name} got {grade} in {subject}")

# EN: Teacher and Student are associated — they interact
# UZB: O'qituvchi va talaba bog'liq — ular o'zaro ta'sir qiladi
teacher = Teacher("Sardor", "Python")
student = Student("Alyorjon")

print(teacher.teach(student))
student.receive_grade("Python", 95)
```

---

### 26–27. What is coupling? | Qovushish nima?

**EN:** The degree to which **one class is dependent on another**. Low coupling = flexible, maintainable code.

**UZB:** Bir klassning **boshqasiga bog'liqligi darajasi**. Past qovushish = moslashuvchan, qo'llab-quvvatlanadigan kod.

```python
# EN: HIGH coupling — bad, tightly dependent
# UZB: YUQORI qovushish — yomon, qat'iy bog'liq

class MySQLDatabaseBAD:
    def query(self, sql):
        return f"MySQL: {sql}"

class UserServiceBAD:
    def __init__(self):
        self.db = MySQLDatabaseBAD()    # EN: hard dependency — can't swap DB
                                         # UZB: qattiq bog'liqlik — DB'ni almashtirb bo'lmaydi

# EN: LOW coupling — good, depends on abstraction
# UZB: PAST qovushish — yaxshi, abstraktsiyaga bog'liq

from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def query(self, sql: str) -> str: pass

class PostgreSQL(Database):
    def query(self, sql: str) -> str:
        return f"[PostgreSQL] {sql}"

class SQLite(Database):
    def query(self, sql: str) -> str:
        return f"[SQLite] {sql}"

class UserService:
    def __init__(self, db: Database):   # EN: dependency injection | UZB: bog'liqlik kiritish
        self.db = db

    def get_user(self, user_id: int):
        return self.db.query(f"SELECT * FROM users WHERE id={user_id}")

# EN: Easy to swap database | UZB: DB'ni oson almashtirish
svc = UserService(PostgreSQL())
print(svc.get_user(1))
svc2 = UserService(SQLite())
print(svc2.get_user(1))
```

---

### 28. What is cohesion? | Koheziya nima?

**EN:** The measure of how **closely related the responsibilities** of a class are. High cohesion = one class, one purpose.

**UZB:** Klass mas'uliyatlarining **qanchalik yaqin bog'liqligi** o'lchovi. Yuqori koheziya = bir klass, bir maqsad.

```python
# EN: LOW cohesion — class does too many unrelated things
# UZB: PAST koheziya — klass juda ko'p bog'liq bo'lmagan ishlarni qiladi

class MessyClass:              # EN: God class — anti-pattern!
    def save_user(self): pass  # UZB: Xudo klassi — anti-pattern!
    def send_email(self): pass
    def generate_pdf(self): pass
    def calculate_tax(self): pass
    def resize_image(self): pass

# EN: HIGH cohesion — each class has single, clear responsibility
# UZB: YUQORI koheziya — har bir klassning bir aniq mas'uliyati bor

class UserRepository:          # EN: only user DB operations
    def save(self, user): pass # UZB: faqat foydalanuvchi DB operatsiyalari
    def find(self, id): pass
    def delete(self, id): pass

class EmailService:            # EN: only email operations
    def send(self, to, subj, body): pass  # UZB: faqat email operatsiyalari

class TaxCalculator:           # EN: only tax calculations
    def calculate(self, amount, rate): pass  # UZB: faqat soliq hisob-kitoblari
```

---

## 4. Object Patterns | Obyekt Patternlari

---

### 29. What is a default constructor? | Standart konstruktor nima?

**EN:** A constructor that **takes no arguments** — provides default values.

**UZB:** **Argumentsiz** konstruktor — standart qiymatlarni beradi.

```python
class ServerConfig:
    def __init__(self):              # EN: default constructor | UZB: standart konstruktor
        self.host = "localhost"
        self.port = 8000
        self.debug = False
        self.workers = 4
        self.timeout = 30

config = ServerConfig()
print(config.host)     # localhost
print(config.port)     # 8000
print(config.workers)  # 4
```

---

### 30. What is a parameterized constructor? | Parametrli konstruktor nima?

**EN:** A constructor that **takes arguments** to initialize an object with specific values.

**UZB:** Obyektni aniq qiymatlar bilan ishga tushirish uchun **argumentlar qabul qiluvchi** konstruktor.

```python
class Product:
    def __init__(self, name: str, price: float, category: str, stock: int = 0):
        # EN: parameterized — caller provides initial values
        # UZB: parametrli — chaqiruvchi boshlang'ich qiymatlarni beradi
        self.name = name
        self.price = price
        self.category = category
        self.stock = stock

    def __repr__(self):
        return f"Product({self.name}, ${self.price}, stock={self.stock})"

laptop = Product("MacBook Pro", 2499.99, "Electronics", 10)
phone = Product("iPhone 15", 999.99, "Electronics")
print(laptop)  # Product(MacBook Pro, $2499.99, stock=10)
print(phone)   # Product(iPhone 15, $999.99, stock=0)
```

---

### 31. What is object cloning? | Obyektni klonlash nima?

**EN:** Creating an **exact copy** of an existing object.

**UZB:** Mavjud obyektning **aniq nusxasini** yaratish.

```python
import copy

class UserSettings:
    def __init__(self, theme: str, lang: str, plugins: list):
        self.theme = theme
        self.lang = lang
        self.plugins = plugins

original = UserSettings("dark", "uz", ["linter", "formatter"])

# EN: Shallow copy — plugins list is shared!
# UZB: Sayoz nusxa — plugins ro'yxati ulashilgan!
shallow = copy.copy(original)
shallow.theme = "light"           # EN: ok — independent | UZB: mustaqil
shallow.plugins.append("debugger")  # EN: affects original! | UZB: originalga ta'sir qiladi!

print(original.theme)    # dark    — o'zgarmadi
print(original.plugins)  # ["linter", "formatter", "debugger"] — o'zgardi!

# EN: Deep copy — everything independent
# UZB: Chuqur nusxa — hamma narsa mustaqil
deep = copy.deepcopy(original)
deep.plugins.append("profiler")
print(original.plugins)  # hali ["linter", "formatter", "debugger"] — ta'sir etmadi
```

---

### 32. What is deep copy? | Chuqur nusxalash nima?

**EN:** Copying an object **along with all its referenced objects** — fully independent copy.

**UZB:** Obyektni **barcha ichki obyektlari bilan birga** nusxalash — to'liq mustaqil nusxa.

```python
import copy

class Node:
    def __init__(self, value: int, children: list = None):
        self.value = value
        self.children = children or []

    def __repr__(self):
        return f"Node({self.value}, children={[c.value for c in self.children]})"

# EN: Tree structure
# UZB: Daraxt tuzilishi
root = Node(1, [Node(2, [Node(4), Node(5)]), Node(3)])

deep_copy = copy.deepcopy(root)

# EN: Modify copy — original untouched
# UZB: Nusxani o'zgartirish — original ta'sirlanmaydi
deep_copy.value = 99
deep_copy.children[0].value = 88

print(root.value)               # 1  — o'zgarmadi
print(root.children[0].value)   # 2  — o'zgarmadi
print(deep_copy.value)          # 99
```

---

### 33. What is shallow copy? | Sayoz nusxalash nima?

**EN:** Copying an object **without copying the objects it references** — nested objects are shared.

**UZB:** Obyektni **ichki obyektlarini nusxalamasdan** ko'chirish — ichki obyektlar ulashiladi.

```python
import copy

class Config:
    def __init__(self, name: str, rules: list):
        self.name = name
        self.rules = rules             # EN: mutable nested object | UZB: o'zgaruvchan ichki obyekt

base_config = Config("base", ["rule1", "rule2"])

# EN: Shallow copy — name is independent, rules is SHARED
# UZB: Sayoz nusxa — name mustaqil, rules ULASHILGAN
child_config = copy.copy(base_config)
child_config.name = "child"          # EN: independent — ok | UZB: mustaqil — yaxshi
child_config.rules.append("rule3")   # EN: modifies original! | UZB: originalga ta'sir!

print(base_config.name)    # base     — o'zgarmadi
print(base_config.rules)   # ['rule1', 'rule2', 'rule3']  — o'zgardi!
```

---

### 34. What is a singleton class? | Singleton klass nima?

**EN:** A class that allows **only one instance** — all references point to the same object.

**UZB:** Faqat **bitta nusxasiga ruxsat beradigan** klass — barcha havolalar bir xil obyektni ko'rsatadi.

```python
# EN: Singleton — useful for shared resources (DB pool, config, logger)
# UZB: Singleton — ulashilgan resurslar uchun foydali (DB pool, konfiguratsiya, logger)

class DatabasePool:
    _instance = None
    _pool = []

    def __new__(cls, max_connections: int = 10):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.max_connections = max_connections
            cls._instance._pool = []
            print(f"EN: Pool created | UZB: Hovuz yaratildi (max={max_connections})")
        return cls._instance

    def get_connection(self):
        if len(self._pool) < self.max_connections:
            conn = f"conn_{len(self._pool) + 1}"
            self._pool.append(conn)
            return conn
        raise Exception("EN: Pool exhausted | UZB: Hovuz to'ldi")

pool1 = DatabasePool(5)
pool2 = DatabasePool(5)

print(pool1 is pool2)          # True — bir xil obyekt!
pool1.get_connection()
print(len(pool2._pool))        # 1 — pool2 ham ko'radi
```

---

### 35. What is an enum? | Enum nima?

**EN:** A special data type that defines a **collection of named constants**.

**UZB:** **Nomlangan konstantalar to'plamini** belgilaydigan maxsus ma'lumot turi.

```python
from enum import Enum, auto

class OrderStatus(Enum):
    PENDING    = auto()   # EN: waiting | UZB: kutilmoqda
    CONFIRMED  = auto()   # EN: confirmed | UZB: tasdiqlangan
    SHIPPING   = auto()   # EN: in transit | UZB: yo'lda
    DELIVERED  = auto()   # EN: delivered | UZB: yetkazildi
    CANCELLED  = auto()   # EN: cancelled | UZB: bekor qilindi

class Order:
    def __init__(self, order_id: int, product: str):
        self.order_id = order_id
        self.product = product
        self.status = OrderStatus.PENDING

    def update_status(self, new_status: OrderStatus):
        print(f"Order #{self.order_id}: {self.status.name} → {new_status.name}")
        self.status = new_status

order = Order(1001, "MacBook Pro")
order.update_status(OrderStatus.CONFIRMED)
order.update_status(OrderStatus.SHIPPING)
order.update_status(OrderStatus.DELIVERED)
```

---

### 36. What is an inner class? | Ichki klass nima?

**EN:** A class **defined inside another class** — logically grouped with its outer class.

**UZB:** **Boshqa klass ichida belgilangan** klass — tashqi klassiga mantiqan bog'langan.

```python
# EN: Inner class — encapsulates logic that's only relevant to outer class
# UZB: Ichki klass — faqat tashqi klassga tegishli mantiqni yashiradi

class LinkedList:
    class Node:                          # EN: inner class | UZB: ichki klass
        def __init__(self, data):
            self.data = data
            self.next = None

    def __init__(self):
        self.head = None
        self.size = 0

    def append(self, data):
        new_node = LinkedList.Node(data)  # EN: using inner class | UZB: ichki klassi ishlatish
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        self.size += 1

    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(str(current.data))
            current = current.next
        return " → ".join(elements)

ll = LinkedList()
ll.append(1); ll.append(2); ll.append(3)
print(ll.display())   # 1 → 2 → 3
print(f"Size | O'lcham: {ll.size}")  # 3
```

---

## 5. Advanced OOP | Ilg'or OOP

---

### 37. What is a friend function? | Do'st funksiya nima?

**EN:** A function that can **access private members** of a class (C++ concept). In Python, simulated via name mangling or trusted access patterns.

**UZB:** Klassning **private a'zolariga kira oladigan** funksiya (C++ tushunchasi). Python'da nom o'zgartirish yoki ishonchli kirish orqali simulyatsiya qilinadi.

```python
# EN: Python simulation of friend function using controlled access
# UZB: Python'da do'st funksiyani nazorat qilinadigan kirish orqali simulyatsiya

class SecureVault:
    def __init__(self, secret: str):
        self.__secret = secret         # EN: private | UZB: private

    def grant_access(self, accessor_func):
        # EN: explicitly grant access — like "friendship"
        # UZB: aniq kirish berish — "do'stlik" kabi
        return accessor_func(self.__secret)

def trusted_auditor(secret: str) -> str:
    # EN: this function gets temporary access to private data
    # UZB: bu funksiya private ma'lumotga vaqtincha kirish oladi
    return f"[AUDIT] Verified secret: {secret[:3]}***"

vault = SecureVault("TOP_SECRET_KEY_2024")
print(vault.grant_access(trusted_auditor))
# [AUDIT] Verified secret: TOP***
```

---

### 38. What is an access modifier? | Kirish modifikatori nima?

**EN:** Keywords defining the **visibility of class members** — public, protected, private.

**UZB:** Klass a'zolarining **ko'rinuvchanligini belgilaydigan** kalit so'zlar — public, protected, private.

```python
# EN: Python access modifiers — convention-based
# UZB: Python kirish modifikatorlari — konventsiyaga asoslangan

class AccessModifierDemo:
    def __init__(self):
        self.public = "Everyone | Hammaga"           # EN: no underscore
        self._protected = "Subclasses | Subklasslarga"  # EN: single underscore
        self.__private = "This class only | Faqat bu klass"  # EN: double underscore

    def show_all(self):
        return {
            "public": self.public,
            "protected": self._protected,
            "private": self.__private
        }

class Child(AccessModifierDemo):
    def access_test(self):
        print(self.public)       # EN: ok | UZB: ishlaydi
        print(self._protected)   # EN: works but discouraged | UZB: ishlaydi lekin tavsiya etilmaydi
        # print(self.__private)  # EN: AttributeError! | UZB: Xatolik!

obj = AccessModifierDemo()
print(obj.public)        # Everyone | Hammaga
print(obj._protected)    # Subclasses | Subklasslarga  (accessible but shouldn't)
# print(obj.__private)   # AttributeError!
```

---

### 39–41. Inheritance types | Meros olish turlari

**EN:** **Public** (default in Python) — members remain accessible. **Protected** — members become protected. **Private** — members become private (no native support in Python).

**UZB:** **Public** (Python'da standart) — a'zolar kirish imkoniyatini saqlaydi. **Protected** — protected bo'ladi. **Private** — private bo'ladi (Python'da to'g'ridan-to'g'ri qo'llab-quvvatlanmaydi).

```python
class Base:
    def public_method(self): return "public"
    def _protected_method(self): return "protected"
    def __private_method(self): return "private"

# EN: Public inheritance (Python default)
# UZB: Public meros olish (Python standart)
class PublicChild(Base):
    def test(self):
        print(self.public_method())     # EN: accessible | UZB: kirish mumkin
        print(self._protected_method()) # EN: accessible | UZB: kirish mumkin
        # self.__private_method()       # EN: not accessible | UZB: kirish mumkin emas

# EN: Simulating protected/private via composition
# UZB: Kompozitsiya orqali protected/private ni simulyatsiya qilish
class PrivateInheritance:
    """EN: Only exposes selected methods | UZB: Faqat tanlangan metodlarni ochadi"""
    def __init__(self):
        self.__base = Base()

    def only_public(self):             # EN: expose only what's needed
        return self.__base.public_method()  # UZB: faqat kerak narsani ochish

child = PublicChild()
child.test()
pi = PrivateInheritance()
print(pi.only_public())
```

---

### 42. What is multiple inheritance? (MRO) | Ko'p meros olish (MRO)?

**EN:** Python uses **C3 linearization (MRO)** to determine method lookup order in diamond inheritance.

**UZB:** Python olmos shaklida meros olishda metod qidirish tartibini aniqlash uchun **C3 linearizatsiyasidan (MRO)** foydalanadi.

```python
# EN: Diamond problem and how Python solves it with MRO
# UZB: Olmos muammosi va Python uni MRO bilan qanday hal qiladi

class A:
    def greet(self): return "A"

class B(A):
    def greet(self): return f"B → {super().greet()}"

class C(A):
    def greet(self): return f"C → {super().greet()}"

class D(B, C):                     # EN: diamond inheritance | UZB: olmos meros
    def greet(self): return f"D → {super().greet()}"

d = D()
print(d.greet())         # D → B → C → A
print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)
# EN: MRO ensures A is visited only once | UZB: MRO A faqat bir marta ko'rilishini ta'minlaydi
```

---

### 43. What is a virtual destructor? | Virtual destruktor nima?

**EN:** Ensures the **correct destructor** is called for derived class objects through a base class reference.

**UZB:** Asosiy klass havolasi orqali hosila klass obyektlari uchun **to'g'ri destruktor** chaqirilishini ta'minlaydi.

```python
class Resource:
    def __init__(self, name: str):
        self.name = name
        print(f"[CREATE] {name}")

    def __del__(self):
        print(f"[BASE DEL] {self.name}")

class ManagedResource(Resource):
    def __init__(self, name: str, data: list):
        super().__init__(name)
        self.data = data

    def __del__(self):
        # EN: derived destructor first, then parent
        # UZB: avval hosila destruktori, keyin ota
        self.data.clear()
        print(f"[DERIVED DEL] {self.name} — data cleared | ma'lumot tozalandi")
        super().__del__()

res = ManagedResource("cache", [1, 2, 3, 4, 5])
del res
# [CREATE] cache
# [DERIVED DEL] cache — data cleared | ma'lumot tozalandi
# [BASE DEL] cache
```

---

### 44. What is operator overloading? | Operator yuklash nima?

**EN:** Giving **additional meaning to operators** (`+`, `-`, `*`, etc.) for user-defined types.

**UZB:** Foydalanuvchi tomonidan belgilangan turlar uchun operatorlarga **qo'shimcha ma'no berish**.

```python
# EN: Money class — real-world operator overloading example
# UZB: Pul klassi — operatorni yuklashning haqiqiy misoli

class Money:
    def __init__(self, amount: float, currency: str = "UZS"):
        self.amount = amount
        self.currency = currency

    def __add__(self, other: 'Money') -> 'Money':       # EN: + operator
        if self.currency != other.currency:              # UZB: + operatori
            raise ValueError("EN: Currency mismatch | UZB: Valyuta mos emas")
        return Money(self.amount + other.amount, self.currency)

    def __sub__(self, other: 'Money') -> 'Money':       # EN: - operator
        return Money(self.amount - other.amount, self.currency)

    def __mul__(self, factor: float) -> 'Money':        # EN: * operator
        return Money(self.amount * factor, self.currency)

    def __gt__(self, other: 'Money') -> bool:           # EN: > operator
        return self.amount > other.amount

    def __repr__(self):
        return f"{self.amount:,.0f} {self.currency}"

salary = Money(5_000_000, "UZS")
bonus  = Money(1_500_000, "UZS")
total  = salary + bonus
print(total)             # 6,500,000 UZS
print(total * 1.12)      # 7,280,000.0 UZS  (with tax | soliq bilan)
print(salary > bonus)    # True
```

---

### 45. What is a friend class? | Do'st klass nima?

**EN:** A class that can **access private members** of another class (C++ concept). Python simulation:

**UZB:** Boshqa klassning **private a'zolariga kira oladigan** klass (C++ tushunchasi). Python simulyatsiyasi:

```python
class Engine:
    def __init__(self):
        self.__rpm = 0
        self.__temperature = 20

    def start(self):
        self.__rpm = 3000
        self.__temperature = 90

    class Diagnostics:               # EN: friend class simulation | UZB: do'st klass simulyatsiyasi
        def __init__(self, engine: 'Engine'):
            self._engine = engine

        def report(self) -> dict:
            return {
                "rpm": self._engine._Engine__rpm,          # EN: name mangling access
                "temp": self._engine._Engine__temperature   # UZB: nom o'zgartirish orqali kirish
            }

engine = Engine()
engine.start()
diag = Engine.Diagnostics(engine)
print(diag.report())   # {'rpm': 3000, 'temp': 90}
```

---

### 46. What is a pure virtual destructor? | Sof virtual destruktor nima?

**EN:** A destructor declared pure virtual — base class cleanup is guaranteed but implementation required.

**UZB:** Sof virtual destruktor — asosiy klass tozalash kafolatlanadi, lekin amalga oshirish talab qilinadi.

```python
from abc import ABC, abstractmethod

class ManagedObject(ABC):
    @abstractmethod
    def cleanup(self):
        """EN: Subclass must implement cleanup | UZB: Subklass cleanup ni amalga oshirishi shart"""
        pass

    def __del__(self):
        self.cleanup()             # EN: guaranteed on destruction | UZB: yo'q qilishda kafolatlangan

class TempFile(ManagedObject):
    def __init__(self, path: str):
        self.path = path
        print(f"[CREATE] {path}")

    def cleanup(self):
        print(f"[CLEANUP] Deleting temp file: {self.path} | vaqtinchalik fayl o'chirildi")

tf = TempFile("/tmp/upload_abc123.tmp")
del tf
# [CREATE] /tmp/upload_abc123.tmp
# [CLEANUP] Deleting temp file: /tmp/upload_abc123.tmp
```

---

### 47. What is method hiding? | Metodni yashirish nima?

**EN:** Subclass has **same-named method** that does not truly override the parent — shadows it instead.

**UZB:** Subklass **bir xil nomdagi metod**ga ega lekin u ota klassni haqiqiy ma'noda qayta yozmaydi — uni soyalaydi.

```python
class Parent:
    def show(self) -> str:
        return "Parent.show() | Ota klass"

    def display(self) -> str:
        return self.show()    # EN: calls show() — which one? | UZB: show() ni chaqiradi

class Child(Parent):
    def show(self) -> str:    # EN: hides parent's show | UZB: ota klassning show'ini yashiradi
        return "Child.show() | Bola klass"

p = Parent()
c = Child()
print(p.show())        # Parent.show() | Ota klass
print(c.show())        # Child.show() | Bola klass  — hidden
print(p.display())     # Parent.show() | Ota klass
print(c.display())     # Child.show() | Bola klass  — polymorphism still works!

# EN: Access parent directly | UZB: Ota klassga to'g'ridan-to'g'ri kirish
print(Parent.show(c))  # Parent.show() | Ota klass
```

---

### 48. What is an abstract method? | Abstrakt metod nima?

**EN:** A method **without a body** declared in an abstract class — must be implemented by all subclasses.

**UZB:** Abstrakt klassda e'lon qilingan **tanasiz metod** — barcha subklasslar uni amalga oshirishi shart.

```python
from abc import ABC, abstractmethod

class DataExporter(ABC):
    def __init__(self, filename: str):
        self.filename = filename

    @abstractmethod
    def export(self, data: list) -> str:
        """EN: Each exporter must implement this | UZB: Har bir eksporter buni amalga oshirishi kerak"""
        pass

    @abstractmethod
    def get_extension(self) -> str:
        pass

    def save(self, data: list):           # EN: concrete method | UZB: konkret metod
        content = self.export(data)
        filepath = f"{self.filename}.{self.get_extension()}"
        print(f"Saved {len(content)} chars to {filepath}")

class CSVExporter(DataExporter):
    def export(self, data: list) -> str:
        return "\n".join(",".join(str(v) for v in row) for row in data)

    def get_extension(self) -> str:
        return "csv"

exporter = CSVExporter("report")
exporter.save([["Name", "Age"], ["Alyorjon", 25], ["Jasur", 30]])
```

---

### 49. What is a sealed class? | Muhrlangan klass nima?

**EN:** A class that **cannot be subclassed** — prevents further inheritance.

**UZB:** Undan **meros olib bo'lmaydigan** klass — keyingi merosni oldini oladi.

```python
class Sealed(type):
    """EN: Metaclass that blocks inheritance | UZB: Merosni blokladigan metaklass"""
    def __new__(mcs, name, bases, namespace):
        for base in bases:
            if isinstance(base, Sealed) and getattr(base, '__sealed__', False):
                raise TypeError(
                    f"EN: '{base.__name__}' is sealed — cannot inherit\n"
                    f"UZB: '{base.__name__}' muhrlanган — meros olib bo'lmaydi"
                )
        cls = super().__new__(mcs, name, bases, namespace)
        cls.__sealed__ = True
        return cls

class JWTToken(metaclass=Sealed):
    def __init__(self, payload: dict):
        self.payload = payload

    def encode(self) -> str:
        import base64, json
        return base64.b64encode(json.dumps(self.payload).encode()).decode()

token = JWTToken({"user_id": 1, "role": "admin"})
print(token.encode())

# class MyToken(JWTToken): pass   # TypeError — sealed!
```

---

### 50. What is delegation? | Delegatsiya nima?

**EN:** **Passing the responsibility** of a task to another object instead of implementing it yourself.

**UZB:** Vazifani o'zingiz bajarish o'rniga boshqa obyektga **mas'uliyatni topshirish**.

```python
# EN: Delegation — "has-a" composition-based responsibility transfer
# UZB: Delegatsiya — "has-a" kompozitsiyaga asoslangan mas'uliyat uzatish

class Validator:
    def validate_email(self, email: str) -> bool:
        return "@" in email and "." in email.split("@")[-1]

    def validate_age(self, age: int) -> bool:
        return 0 < age < 150

class Hasher:
    def hash_password(self, password: str) -> str:
        import hashlib
        return hashlib.sha256(password.encode()).hexdigest()[:16] + "..."

class UserService:
    def __init__(self):
        self.validator = Validator()   # EN: delegate validation | UZB: validatsiyani topshirish
        self.hasher = Hasher()         # EN: delegate hashing | UZB: hashingni topshirish

    def register(self, email: str, password: str, age: int):
        if not self.validator.validate_email(email):   # EN: delegating | UZB: topshiryapti
            raise ValueError("Invalid email | Noto'g'ri email")
        if not self.validator.validate_age(age):
            raise ValueError("Invalid age | Noto'g'ri yosh")
        hashed = self.hasher.hash_password(password)
        print(f"Registered: {email}, age={age}, hash={hashed}")

svc = UserService()
svc.register("a@example.com", "secret123", 25)
```

---

### 51. What is a mutable object? | O'zgaruvchan obyekt nima?

**EN:** An object whose **state can be changed** after creation.

**UZB:** Yaratilgandan keyin **holati o'zgartirilishi mumkin** bo'lgan obyekt.

```python
# EN: Mutable — list, dict, set, and most custom class instances
# UZB: O'zgaruvchan — list, dict, set va ko'pchilik maxsus klass nusxalari

class ShoppingCart:
    def __init__(self):
        self.items = []                # EN: mutable state | UZB: o'zgaruvchan holat
        self.total = 0.0

    def add_item(self, name: str, price: float):
        self.items.append({"name": name, "price": price})  # EN: state changes | UZB: holat o'zgaradi
        self.total += price

    def remove_item(self, name: str):
        item = next((i for i in self.items if i["name"] == name), None)
        if item:
            self.items.remove(item)
            self.total -= item["price"]

    def __repr__(self):
        return f"Cart({len(self.items)} items, total={self.total:,.0f} UZS)"

cart = ShoppingCart()
cart.add_item("Laptop", 12_000_000)
cart.add_item("Mouse", 350_000)
print(cart)     # Cart(2 items, total=12,350,000 UZS)
cart.remove_item("Mouse")
print(cart)     # Cart(1 items, total=12,000,000 UZS)
```

---

### 52. What is an immutable object? | O'zgarmas obyekt nima?

**EN:** An object whose **state cannot be changed** after creation — creates new object instead.

**UZB:** Yaratilgandan keyin **holati o'zgartirila olmaydigan** obyekt — o'rniga yangi obyekt yaratadi.

```python
from dataclasses import dataclass

@dataclass(frozen=True)             # EN: frozen = immutable | UZB: frozen = o'zgarmas
class Point:
    x: float
    y: float

    def translate(self, dx: float, dy: float) -> 'Point':
        # EN: returns NEW point — original unchanged
        # UZB: YANGI point qaytaradi — original o'zgarmaydi
        return Point(self.x + dx, self.y + dy)

    def distance_to(self, other: 'Point') -> float:
        return ((self.x - other.x)**2 + (self.y - other.y)**2) ** 0.5

p1 = Point(0, 0)
p2 = p1.translate(3, 4)

print(p1)                  # Point(x=0, y=0) — o'zgarmadi
print(p2)                  # Point(x=3, y=4) — yangi obyekt
print(p1.distance_to(p2))  # 5.0

# p1.x = 10   # FrozenInstanceError! — immutable
```

---

### 53. What is object slicing? | Obyektni kesish nima?

**EN:** In C++, assigning derived object to base variable **loses derived attributes**. Python avoids this — objects retain full type.

**UZB:** C++ da hosila obyektini asosiy o'zgaruvchiga tayinlash **hosila atributlarini yo'qotadi**. Python buni oldini oladi — obyektlar to'liq turni saqlaydi.

```python
class Animal:
    def __init__(self, name: str):
        self.name = name

    def info(self) -> str:
        return f"Animal: {self.name}"

class Dog(Animal):
    def __init__(self, name: str, breed: str):
        super().__init__(name)
        self.breed = breed             # EN: extra attribute | UZB: qo'shimcha atribut

    def info(self) -> str:
        return f"Dog: {self.name}, Breed: {self.breed}"

dog = Dog("Rex", "Labrador")

# EN: Python keeps full object — NO slicing!
# UZB: Python to'liq obyektni saqlaydi — kesish YO'Q!
animal: Animal = dog               # EN: reference, not a copy | UZB: havola, nusxa emas
print(animal.info())               # Dog: Rex, Breed: Labrador — to'liq saqlanadi
print(isinstance(animal, Dog))     # True — haqiqiy tur saqlanadi
print(hasattr(animal, 'breed'))    # True — atribut bor
```

---

### 54. What is a mixin? | Mixin nima?

**EN:** A class that **provides reusable methods** to other classes through multiple inheritance — not meant to be standalone.

**UZB:** Ko'p meros olish orqali boshqa klasslarga **qayta ishlatiladigan metodlar ta'minlaydigan** klass — mustaqil emas.

```python
# EN: Mixins add behavior without inheritance chain
# UZB: Mixin'lar meros zanjiri olmagan holda xatti-harakat qo'shadi

class TimestampMixin:
    """EN: Adds created_at/updated_at tracking | UZB: created_at/updated_at kuzatuvini qo'shadi"""
    from datetime import datetime
    created_at: str = ""
    updated_at: str = ""

    def touch(self):
        from datetime import datetime
        self.updated_at = datetime.now().isoformat()

class SerializeMixin:
    """EN: Adds JSON/dict serialization | UZB: JSON/dict serialization qo'shadi"""
    def to_dict(self) -> dict:
        return {k: v for k, v in self.__dict__.items() if not k.startswith('_')}

    def to_json(self) -> str:
        import json
        return json.dumps(self.to_dict(), default=str)

class ValidateMixin:
    """EN: Adds field validation | UZB: Maydon tekshiruvini qo'shadi"""
    def validate(self) -> bool:
        for key, val in self.__dict__.items():
            if val is None:
                raise ValueError(f"EN: '{key}' cannot be None | UZB: '{key}' None bo'lishi mumkin emas")
        return True

# EN: Combine mixins with actual model
# UZB: Mixin'larni haqiqiy model bilan birlashtirish
class User(TimestampMixin, SerializeMixin, ValidateMixin):
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

u = User("Alyorjon", "a@example.com")
u.touch()
print(u.to_json())
u.validate()
```

---

### 55. What is polymorphic association? | Polimorfik assotsiatsiya nima?

**EN:** The ability to **associate an object with different types** at runtime.

**UZB:** Runtime'da **obyektni turli turlar bilan bog'lash** qobiliyati.

```python
from typing import Union

class Post:
    def __init__(self, title: str):
        self.title = title
        self.type = "post"

class Photo:
    def __init__(self, url: str):
        self.url = url
        self.type = "photo"

class Video:
    def __init__(self, duration: int):
        self.duration = duration
        self.type = "video"

class Like:
    # EN: polymorphic — can be associated with Post, Photo, or Video
    # UZB: polimorfik — Post, Photo yoki Video bilan bog'lanishi mumkin
    def __init__(self, user: str, target: Union[Post, Photo, Video]):
        self.user = user
        self.target = target

    def describe(self) -> str:
        return f"{self.user} liked a {self.target.type}"

likes = [
    Like("Alyorjon", Post("Python Tips")),
    Like("Jasur", Photo("sunset.jpg")),
    Like("Sara", Video(120)),
]
for like in likes:
    print(like.describe())
```

---

### 56. What is a namespace? | Namespace nima?

**EN:** A **container for identifiers** that prevents naming conflicts.

**UZB:** Nomlar to'qnashuvini oldini oladigan **identifikatorlar konteyner**.

```python
# EN: Python namespaces — built-in, global, local, enclosing
# UZB: Python namespace'lari — built-in, global, lokal, o'ragan

x = "global"                    # EN: global namespace | UZB: global namespace

def outer():
    x = "enclosing"             # EN: enclosing namespace | UZB: o'ragan namespace
    def inner():
        x = "local"             # EN: local namespace | UZB: lokal namespace
        print(x)                # local
    inner()
    print(x)                    # enclosing

outer()
print(x)                        # global

# EN: Class namespaces — separate per class
# UZB: Klass namespace'lari — har bir klass uchun alohida
class Config:
    DEBUG = True                # Config.DEBUG

class TestConfig:
    DEBUG = True                # TestConfig.DEBUG  — conflict yo'q!

print(f"App: {Config.DEBUG} | Test: {TestConfig.DEBUG}")
```

---

### 57. What is garbage collection? | Axlat yig'ish nima?

**EN:** **Automatic memory management** that frees memory occupied by unreachable objects.

**UZB:** Erisha olmaydigan obyektlar egallagan xotirani bo'shatadigan **avtomatik xotira boshqaruvi**.

```python
import gc
import sys

class HeavyObject:
    def __init__(self, name: str, size: int):
        self.name = name
        self.data = [0] * size
        print(f"[ALLOC] {name}: {sys.getsizeof(self.data):,} bytes")

    def __del__(self):
        print(f"[FREE] {self.name} — garbage collected | axlat yig'ish bilan tozalandi")

obj1 = HeavyObject("cache", 100_000)
obj2 = HeavyObject("buffer", 50_000)

print(f"EN: Objects alive | UZB: Tirik obyektlar: {len(gc.get_objects())}")

del obj1          # [FREE] cache
del obj2          # [FREE] buffer

gc.collect()      # EN: force collection | UZB: majburiy yig'ish
print(f"GC stats | GC statistikasi: {gc.get_count()}")
```

---

### 58. What is a destructor? | Destruktor nima?

**EN:** A method (`__del__`) called **when an object is about to be destroyed** — used for cleanup.

**UZB:** Obyekt **yo'q qilinishidan oldin** chaqiriladigan metod (`__del__`) — tozalash uchun ishlatiladi.

```python
# EN: Context manager is preferred over __del__ for cleanup in Python
# UZB: Python'da tozalash uchun __del__ dan ko'ra context manager afzal

class DatabaseConnection:
    def __init__(self, url: str):
        self.url = url
        self.is_open = True
        print(f"[CONNECT] {url}")

    def query(self, sql: str) -> str:
        if not self.is_open:
            raise RuntimeError("EN: Connection closed | UZB: Ulanish yopilgan")
        return f"Result of: {sql}"

    def close(self):
        self.is_open = False
        print(f"[DISCONNECT] {self.url}")

    def __del__(self):
        if self.is_open:
            self.close()       # EN: safety net | UZB: xavfsizlik to'ri

conn = DatabaseConnection("postgresql://localhost/app")
print(conn.query("SELECT 1"))
del conn     # [DISCONNECT] — agar yopilmagan bo'lsa
```

---

### 59. What is the Liskov Substitution Principle? | Liskov almashtirish printsipi nima?

**EN:** Objects of a subclass should be able to **replace objects of the base class** without breaking the program.

**UZB:** Subklass obyektlari dasturni buzmagan holda **asosiy klass obyektlarini almashtira olishi** kerak.

```python
# EN: LSP violation — then fix
# UZB: LSP buzilishi — keyin tuzatish

# VIOLATION | BUZILISH
class BirdBad:
    def fly(self): return "Flying!"

class PenguinBad(BirdBad):
    def fly(self):
        raise Exception("EN: Penguins can't fly! | UZB: Pingvinlar ucha olmaydi!")

# CORRECT | TO'G'RI — redesign hierarchy
class Bird:
    def __init__(self, name: str):
        self.name = name

    def move(self) -> str:           # EN: general behavior | UZB: umumiy xatti-harakat
        return f"{self.name} is moving"

class FlyingBird(Bird):
    def move(self) -> str:
        return f"{self.name} is flying"

class SwimmingBird(Bird):
    def move(self) -> str:
        return f"{self.name} is swimming"

# EN: Substitution works — all birds can move()
# UZB: Almashtirish ishlaydi — barcha qushlar move() qila oladi
birds = [FlyingBird("Eagle | Burgut"), SwimmingBird("Penguin | Pingvin")]
for bird in birds:
    print(bird.move())
```

---

### 60. What is constructor chaining? | Konstruktor zanjiri nima?

**EN:** The process of **calling one constructor from another** — builds initialization chains.

**UZB:** **Bir konstruktordan boshqasini chaqirish** jarayoni — ishga tushirish zanjirlarini quradi.

```python
class Shape:
    def __init__(self, color: str):
        self.color = color
        print(f"Shape created — color: {color}")

class Polygon(Shape):
    def __init__(self, color: str, sides: int):
        super().__init__(color)      # EN: chain to Shape | UZB: Shape'ga zanjir
        self.sides = sides
        print(f"Polygon created — sides: {sides}")

class RegularPolygon(Polygon):
    def __init__(self, color: str, sides: int, side_length: float):
        super().__init__(color, sides)   # EN: chain to Polygon | UZB: Polygon'ga zanjir
        self.side_length = side_length
        print(f"RegularPolygon — side length: {side_length}")

    def perimeter(self) -> float:
        return self.sides * self.side_length

hexagon = RegularPolygon("blue", 6, 5.0)
print(f"Perimeter | Perimetr: {hexagon.perimeter()}")
# Shape created — color: blue
# Polygon created — sides: 6
# RegularPolygon — side length: 5.0
# Perimeter | Perimetr: 30.0
```

---

## 6. Binding & Casting | Bog'lash va Konvertatsiya

---

### 61. What is dynamic binding? | Dinamik bog'lash nima?

**EN:** Binding that occurs **at runtime** — method resolved based on actual object type.

**UZB:** **Runtime'da** sodir bo'ladigan bog'lash — metod haqiqiy obyekt turiga qarab aniqlanadi.

```python
class Renderer:
    def render(self, content: str) -> str:
        return f"<raw>{content}</raw>"

class HTMLRenderer(Renderer):
    def render(self, content: str) -> str:
        return f"<html><body>{content}</body></html>"

class MarkdownRenderer(Renderer):
    def render(self, content: str) -> str:
        return f"# {content}\n---"

def publish(renderer: Renderer, content: str):
    # EN: Which render() is called? Determined at RUNTIME
    # UZB: Qaysi render() chaqiriladi? RUNTIME'da aniqlanadi
    return renderer.render(content)

text = "Hello, World! | Salom Dunyo!"
print(publish(HTMLRenderer(), text))
print(publish(MarkdownRenderer(), text))
# EN: Same function call, different results — dynamic binding
# UZB: Bir xil funksiya chaqiruvi, boshqacha natijalar — dinamik bog'lash
```

---

### 62. What is static binding? | Statik bog'lash nima?

**EN:** Binding that occurs **at compile time** — method is determined before runtime.

**UZB:** **Kompilyatsiya vaqtida** sodir bo'ladigan bog'lash — metod runtime'dan oldin aniqlanadi.

```python
class StringUtils:
    @staticmethod
    def reverse(s: str) -> str:    # EN: static — always this method | UZB: statik — doim bu metod
        return s[::-1]

    @staticmethod
    def is_palindrome(s: str) -> bool:
        clean = s.lower().replace(" ", "")
        return clean == clean[::-1]

    @classmethod
    def from_list(cls, words: list) -> str:
        return " ".join(words)

# EN: Static binding — compiler/interpreter knows which method to call
# UZB: Statik bog'lash — kompilyator/interpreter qaysi metodni chaqirishni biladi
print(StringUtils.reverse("Python"))        # nohtyP
print(StringUtils.is_palindrome("racecar")) # True
print(StringUtils.from_list(["Hello", "World"]))  # Hello World
```

---

### 63. What is method resolution? | Metod aniqlash nima?

**EN:** The process of **determining which method to call** when multiple candidates exist (inheritance, polymorphism).

**UZB:** Bir nechta nomzod bo'lganda **qaysi metodni chaqirishni aniqlash** jarayoni.

```python
# EN: Python MRO — C3 linearization resolves method lookup
# UZB: Python MRO — C3 linearizatsiyasi metod qidiruvini hal qiladi

class Mixin1:
    def process(self): return "Mixin1"

class Mixin2:
    def process(self): return "Mixin2"

class Base:
    def process(self): return "Base"

class MyClass(Mixin1, Mixin2, Base):
    pass

obj = MyClass()
print(obj.process())      # Mixin1  — MRO order
print(MyClass.__mro__)    # MRO zanjiri

# EN: Use super() to chain through MRO
# UZB: MRO bo'ylab zanjir uchun super() ishlatish
class A:
    def greet(self): return f"A({super().greet() if hasattr(super(), 'greet') else ''})"

class B(A):
    def greet(self): return f"B→{super().greet()}"

class C(A):
    def greet(self): return f"C→{super().greet()}"

class D(B, C):
    def greet(self): return f"D→{super().greet()}"

print(D().greet())   # D→B→C→A()
```

---

### 64. What is downcasting? | Pastga ko'chirish nima?

**EN:** Casting an object of a **superclass reference to a subclass** — requires type check.

**UZB:** **Superklass havolasini subklass turiga** o'tkazish — tur tekshiruvi talab qiladi.

```python
class Animal:
    def __init__(self, name: str):
        self.name = name

    def speak(self) -> str:
        return f"{self.name} makes a sound"

class Dog(Animal):
    def fetch(self) -> str:           # EN: subclass-specific method | UZB: subklassga xos metod
        return f"{self.name} fetches the ball!"

class Cat(Animal):
    def purr(self) -> str:
        return f"{self.name} purrs..."

animals: list[Animal] = [Dog("Rex"), Cat("Whiskers"), Dog("Buddy")]

for animal in animals:
    # EN: Downcast — check type first, then access subclass methods
    # UZB: Pastga ko'chirish — avval tur tekshir, keyin subklass metodiga kirish
    if isinstance(animal, Dog):
        print(animal.fetch())    # Dog-specific method
    elif isinstance(animal, Cat):
        print(animal.purr())     # Cat-specific method
```

---

### 65. What is upcasting? | Yuqoriga ko'chirish nima?

**EN:** Casting an object of a **subclass to its superclass** — implicit and safe.

**UZB:** **Subklass obyektini o'z superklass turiga** o'tkazish — yashirin va xavfsiz.

```python
class Shape:
    def area(self) -> float:
        return 0.0

    def describe(self) -> str:
        return f"{type(self).__name__}: area={self.area():.2f}"

class Circle(Shape):
    def __init__(self, r: float):
        self.r = r
    def area(self) -> float:
        import math
        return math.pi * self.r ** 2

class Square(Shape):
    def __init__(self, s: float):
        self.s = s
    def area(self) -> float:
        return self.s ** 2

# EN: Upcast — Circle/Square → Shape (implicit, safe)
# UZB: Yuqoriga ko'chirish — Circle/Square → Shape (yashirin, xavfsiz)
shapes: list[Shape] = [Circle(5), Square(4), Circle(3)]  # upcast

total_area = sum(s.area() for s in shapes)
print(f"Total area | Umumiy maydon: {total_area:.2f}")

for shape in shapes:
    print(shape.describe())  # EN: polymorphism works | UZB: polimorfizm ishlaydi
```

---

### 66. What is a copy constructor? | Nusxa konstruktori nima?

**EN:** A constructor that creates a **new object as a copy** of an existing one.

**UZB:** Mavjud obyektning **nusxasi sifatida yangi obyekt** yaratadigan konstruktor.

```python
import copy

class Matrix:
    def __init__(self, data=None, source=None):
        if source is not None:             # EN: copy constructor | UZB: nusxa konstruktori
            self.data = copy.deepcopy(source.data)
            self.rows = source.rows
            self.cols = source.cols
        else:
            self.data = data or []
            self.rows = len(self.data)
            self.cols = len(self.data[0]) if self.data else 0

    @classmethod
    def copy_of(cls, other: 'Matrix') -> 'Matrix':
        return cls(source=other)

    def __repr__(self):
        return f"Matrix({self.rows}x{self.cols})"

m1 = Matrix([[1, 2, 3], [4, 5, 6]])
m2 = Matrix.copy_of(m1)           # EN: copy constructor via classmethod
                                   # UZB: classmethod orqali nusxa konstruktori

m2.data[0][0] = 99
print(m1.data[0][0])   # 1   — original o'zgarmadi
print(m2.data[0][0])   # 99  — nusxa
```

---

### 67. What is a virtual table (vtable)? | Virtual jadval (vtable) nima?

**EN:** An internal table used to **resolve virtual method calls** in polymorphic classes. Python uses `__dict__` and MRO.

**UZB:** Polimorfik klasslarda **virtual metod chaqiruvlarini hal qilish** uchun ishlatiladigan ichki jadval. Python `__dict__` va MRO ishlatadi.

```python
# EN: Python's "vtable" equivalent — class __dict__ + MRO
# UZB: Python ning "vtable" ekvivalenti — klass __dict__ + MRO

class Animal:
    def speak(self): return "..."
    def move(self): return "moving"

class Dog(Animal):
    def speak(self): return "Woof!"

class GuideDog(Dog):
    def guide(self): return "Guiding!"

dog = GuideDog()

# EN: Python resolves methods via __dict__ lookup chain (vtable equivalent)
# UZB: Python metodlarni __dict__ qidirish zanjiri orqali hal qiladi

print("GuideDog vtable (own methods):", list(GuideDog.__dict__.keys()))
print("Dog vtable:", list(Dog.__dict__.keys()))
print("Animal vtable:", list(Animal.__dict__.keys()))
print("MRO (lookup order):", [c.__name__ for c in GuideDog.__mro__])
print(dog.speak())   # Woof! — found in Dog.__dict__
```

---

### 68. What is multiple dispatch? | Ko'p chaqirish nima?

**EN:** Choosing which function to call based on the **runtime types of more than one argument**.

**UZB:** **Bir nechta argument runtime turlariga** qarab qaysi funksiyani chaqirishni tanlash.

```python
from functools import singledispatch
from typing import Union

# EN: Single dispatch — dispatch on first argument type
# UZB: Bitta chaqirish — birinchi argument turi bo'yicha

@singledispatch
def serialize(obj) -> str:
    return str(obj)

@serialize.register(int)
def _(obj: int) -> str:
    return f"int:{obj}"

@serialize.register(list)
def _(obj: list) -> str:
    return f"list:[{','.join(str(i) for i in obj)}]"

@serialize.register(dict)
def _(obj: dict) -> str:
    import json
    return f"dict:{json.dumps(obj)}"

print(serialize(42))               # int:42
print(serialize([1, 2, 3]))        # list:[1,2,3]
print(serialize({"a": 1}))         # dict:{"a": 1}
print(serialize("hello"))          # hello  — default
```

---

### 69. What is an abstract data type (ADT)? | Abstrakt ma'lumot turi (AMT) nima?

**EN:** A model for data types defined by its **behavior from the user's perspective**, not implementation.

**UZB:** Ma'lumot turining amalga oshirishdan emas, **foydalanuvchi nuqtai nazaridan xatti-harakati** bilan belgilangan modeli.

```python
from abc import ABC, abstractmethod
from typing import Any, Optional

# EN: Stack ADT — defines behavior, not implementation
# UZB: Stack AMT — amalga oshirishni emas, xatti-harakatni belgilaydi

class StackADT(ABC):
    @abstractmethod
    def push(self, item: Any) -> None: pass

    @abstractmethod
    def pop(self) -> Any: pass

    @abstractmethod
    def peek(self) -> Any: pass

    @abstractmethod
    def is_empty(self) -> bool: pass

    @abstractmethod
    def size(self) -> int: pass

# EN: Implementation 1 — using list
# UZB: 1-amalga oshirish — list orqali
class ListStack(StackADT):
    def __init__(self):
        self._data = []
    def push(self, item): self._data.append(item)
    def pop(self): return self._data.pop()
    def peek(self): return self._data[-1]
    def is_empty(self): return len(self._data) == 0
    def size(self): return len(self._data)

stack = ListStack()
stack.push(1); stack.push(2); stack.push(3)
print(stack.peek())  # 3
print(stack.pop())   # 3
print(stack.size())  # 2
```

---

### 70. What is an exception in OOP? | OOP'da istisno nima?

**EN:** An event that **disrupts the normal flow** of execution — represented as objects in Python.

**UZB:** Bajarilishning **normal oqimini buzadigan** hodisa — Python'da obyektlar sifatida ifodalanadi.

```python
# EN: Custom exception hierarchy — domain-specific errors
# UZB: Maxsus istisno ierarxiyasi — domenga xos xatolar

class AppError(Exception):
    """EN: Base exception | UZB: Asosiy istisno"""
    def __init__(self, message: str, code: int = 500):
        super().__init__(message)
        self.code = code

class ValidationError(AppError):
    def __init__(self, field: str, reason: str):
        super().__init__(f"Validation failed on '{field}': {reason}", 400)
        self.field = field

class NotFoundError(AppError):
    def __init__(self, resource: str, id: int):
        super().__init__(f"'{resource}' with id={id} not found", 404)

class AuthError(AppError):
    def __init__(self):
        super().__init__("Unauthorized | Ruxsatsiz", 401)

def get_user(user_id: int):
    if user_id <= 0:
        raise ValidationError("user_id", "must be positive | musbat bo'lishi kerak")
    if user_id > 100:
        raise NotFoundError("User", user_id)
    return {"id": user_id, "name": "Alyorjon"}

try:
    user = get_user(999)
except ValidationError as e:
    print(f"[{e.code}] {e}")
except NotFoundError as e:
    print(f"[{e.code}] {e}")   # [404] 'User' with id=999 not found
```

---

### 71. What is exception handling? | Istisnolarni boshqarish nima?

**EN:** Responding to exceptions using **try, except, else, and finally** blocks.

**UZB:** **try, except, else va finally** bloklari yordamida istisnolarga javob berish.

```python
import logging

class APIClient:
    def __init__(self, base_url: str):
        self.base_url = base_url

    def fetch(self, endpoint: str) -> dict:
        import random
        # EN: Simulate different error scenarios
        # UZB: Turli xato stsenariylarini simulyatsiya qilish
        roll = random.random()
        if roll < 0.3:
            raise ConnectionError("EN: Network timeout | UZB: Tarmoq vaqti tugadi")
        if roll < 0.5:
            raise ValueError("EN: Invalid response | UZB: Noto'g'ri javob")
        return {"data": "success", "endpoint": endpoint}

def safe_fetch(client: APIClient, endpoint: str) -> dict:
    try:
        result = client.fetch(endpoint)         # EN: may raise | UZB: istisno qo'zg'atishi mumkin
    except ConnectionError as e:
        logging.error(f"Network error: {e}")
        return {"error": "network", "retry": True}
    except ValueError as e:
        logging.warning(f"Data error: {e}")
        return {"error": "data", "retry": False}
    except Exception as e:
        logging.critical(f"Unexpected: {e}")
        raise                                    # EN: re-raise unknown errors | UZB: noma'lum xatolarni qayta ko'tarish
    else:
        print("EN: Request successful | UZB: So'rov muvaffaqiyatli")  # EN: runs if no exception
        return result
    finally:
        print("EN: Request completed | UZB: So'rov yakunlandi")       # EN: always runs | UZB: har doim ishlaydi
```

---

### 72. What is the difference between a class and an interface? | Klass va interfeys o'rtasidagi farq nima?

**EN:** A class **can contain implementation**; an interface only contains **method signatures** (contract).

**UZB:** Klass **amalga oshirishni o'z ichiga olishi mumkin**; interfeys faqat **metod imzolarini** o'z ichiga oladi (shartnoma).

| Feature / Xususiyat | Class / Klass | Interface / Interfeys |
|---|---|---|
| Instantiation / Yaratish | Yes / Ha | No / Yo'q |
| Implementation / Amalga oshirish | Yes / Ha | No (Abstract) / Yo'q |
| Multiple inherit / Ko'p meros | Limited / Cheklangan | Yes / Ha |
| State / Holat | Yes / Ha | No / Yo'q |

```python
from abc import ABC, abstractmethod

# EN: Interface — no state, no implementation
# UZB: Interfeys — holat yo'q, amalga oshirish yo'q
class Drawable(ABC):
    @abstractmethod
    def draw(self): pass

    @abstractmethod
    def get_bounds(self) -> tuple: pass

# EN: Abstract class — has state AND some implementation
# UZB: Abstrakt klass — holat ham, qisman amalga oshirish ham bor
class Widget(ABC):
    def __init__(self, x: int, y: int):
        self.x = x                 # EN: state | UZB: holat
        self.y = y

    def move(self, dx, dy):        # EN: concrete method | UZB: konkret metod
        self.x += dx
        self.y += dy

    @abstractmethod
    def render(self): pass

class Button(Widget, Drawable):
    def render(self): print(f"Button at ({self.x},{self.y})")
    def draw(self): print("Drawing button")
    def get_bounds(self): return (self.x, self.y, 100, 30)
```

---

### 73. What is type casting in OOP? | OOP'da tur o'zgartirish nima?

**EN:** Converting one type of **object reference to another**.

**UZB:** Bir turdagi **obyekt havolasini boshqasiga** aylantirish.

```python
# EN: Python type casting — implicit and explicit
# UZB: Python tur o'zgartirish — yashirin va aniq

class Animal:
    def breathe(self): return "breathing"

class Dog(Animal):
    def bark(self): return "Woof!"

class Cat(Animal):
    def meow(self): return "Meow!"

animals: list[Animal] = [Dog(), Cat(), Dog()]

for animal in animals:
    # EN: Safe casting with isinstance + type narrowing
    # UZB: isinstance + tur toraytirish bilan xavfsiz o'zgartirish
    if isinstance(animal, Dog):
        dog: Dog = animal        # EN: type narrowing | UZB: tur toraytirish
        print(dog.bark())
    elif isinstance(animal, Cat):
        cat: Cat = animal
        print(cat.meow())

# EN: Built-in type casting
# UZB: Ichki tur o'zgartirish
print(int("42"))      # str → int
print(float(10))      # int → float
print(str(3.14))      # float → str
print(list((1,2,3)))  # tuple → list
```

---

### 74. What is a mixin class? | Mixin klass nima?

*(See #54 for full example | To'liq misolni #54 da ko'ring)*

**EN:** A class providing **additional reusable functionality** through multiple inheritance without being a full parent.

**UZB:** Ko'p meros olish orqali to'liq ota klass bo'lmasdan **qo'shimcha qayta ishlatiladigan funksionallik** ta'minlaydigan klass.

```python
# EN: Practical mixin — FastAPI/Django style
# UZB: Amaliy mixin — FastAPI/Django uslubi

class CRUDMixin:
    """EN: Reusable CRUD operations for models | UZB: Modellarga qayta ishlatiladigan CRUD"""
    _store = {}

    @classmethod
    def create(cls, **kwargs):
        obj = cls(**kwargs)
        cls._store[id(obj)] = obj
        return obj

    @classmethod
    def all(cls):
        return list(cls._store.values())

    def delete(self):
        self.__class__._store.pop(id(self), None)

class User(CRUDMixin):
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def __repr__(self): return f"User({self.name})"

u1 = User.create(name="Alyorjon", email="a@ex.com")
u2 = User.create(name="Jasur", email="j@ex.com")
print(User.all())   # [User(Alyorjon), User(Jasur)]
u1.delete()
print(User.all())   # [User(Jasur)]
```

---

### 75. What is the `isinstance` operator? | `isinstance` operatori nima?

**EN:** Tests whether an object is an **instance of a specific class or its subclass**.

**UZB:** Obyekt **ma'lum bir klass yoki uning subklassining namunasi** ekanligini tekshiradi.

```python
class Vehicle: pass
class Car(Vehicle): pass
class ElectricCar(Car): pass

ev = ElectricCar()

# EN: isinstance checks — hierarchical
# UZB: isinstance tekshiruvlari — ierarxik
print(isinstance(ev, ElectricCar))  # True — o'zi
print(isinstance(ev, Car))          # True — ota
print(isinstance(ev, Vehicle))      # True — bobosi
print(isinstance(ev, str))          # False — bog'liq emas

# EN: type() — exact type only (no hierarchy)
# UZB: type() — faqat aniq tur (ierarxiya yo'q)
print(type(ev) == ElectricCar)  # True
print(type(ev) == Car)          # False — faqat aniq tur

# EN: Practical use — safe method dispatch
# UZB: Amaliy foydalanish — xavfsiz metod chaqirish
def process(vehicle: Vehicle):
    if isinstance(vehicle, ElectricCar):
        print("EN: Charge me! | UZB: Meni quvvatlanting!")
    elif isinstance(vehicle, Car):
        print("EN: Fill gas! | UZB: Benzin soling!")
```

---

### 76. What is late binding? | Kech bog'lash nima?

**EN:** Also known as **dynamic binding** — method calls resolved at runtime, not compile time.

**UZB:** **Dinamik bog'lash** deb ham ataladi — metod chaqiruvlari kompilyatsiya vaqtida emas, runtime'da hal qilinadi.

```python
# EN: Late binding — Python's default behavior
# UZB: Kech bog'lash — Python'ning standart xatti-harakati

class Plugin:
    def execute(self) -> str:
        return "Default plugin"

class AuthPlugin(Plugin):
    def execute(self) -> str:
        return "EN: Authenticating user | UZB: Foydalanuvchini tasdiqlash"

class CachePlugin(Plugin):
    def execute(self) -> str:
        return "EN: Caching response | UZB: Javobni keshlash"

class LogPlugin(Plugin):
    def execute(self) -> str:
        return "EN: Logging request | UZB: So'rovni qayd etish"

class MiddlewareChain:
    def __init__(self):
        self.plugins: list[Plugin] = []

    def add(self, plugin: Plugin) -> 'MiddlewareChain':
        self.plugins.append(plugin)
        return self

    def run(self):
        for plugin in self.plugins:
            print(plugin.execute())   # EN: late binding — which execute()? runtime!
                                      # UZB: kech bog'lash — qaysi execute()? runtime!

chain = MiddlewareChain()
chain.add(AuthPlugin()).add(CachePlugin()).add(LogPlugin()).run()
```

---

### 77. What is early binding? | Erta bog'lash nima?

**EN:** Also known as **static binding** — resolved at compile/definition time.

**UZB:** **Statik bog'lash** deb ham ataladi — kompilyatsiya/ta'riflash vaqtida hal qilinadi.

```python
# EN: Early binding — static and class methods
# UZB: Erta bog'lash — statik va klass metodlari

class MathHelper:
    PI = 3.14159265358979        # EN: early bound constant | UZB: erta bog'liq konstantA

    @staticmethod                # EN: early binding — always MathHelper.circle_area
    def circle_area(r: float):   # UZB: erta bog'lash — doim MathHelper.circle_area
        return MathHelper.PI * r ** 2

    @classmethod                 # EN: early-ish binding via cls
    def from_diameter(cls, d: float):  # UZB: cls orqali erta bog'lash
        return cls.circle_area(d / 2)

print(MathHelper.circle_area(5))    # 78.539...
print(MathHelper.from_diameter(10)) # 78.539...
```

---

### 78. What is a virtual base class? | Virtual asosiy klass nima?

**EN:** A base class that is **shared (not duplicated)** in diamond inheritance — Python handles this via MRO.

**UZB:** Olmos merosida **ulashiladigan (takrorlanmaydigan)** asosiy klass — Python buni MRO orqali hal qiladi.

```python
# EN: Diamond inheritance — without virtual base (conceptual)
# UZB: Olmos meros — virtual asosiy klasssiz (tushuncha)

class Base:
    def __init__(self, value: int):
        self.value = value
        print(f"Base.__init__ called with {value}")

class Left(Base):
    def __init__(self, value: int):
        super().__init__(value)      # EN: super() uses MRO — Base called once
        print("Left.__init__")       # UZB: super() MRO ishlatadi — Base bir marta

class Right(Base):
    def __init__(self, value: int):
        super().__init__(value)
        print("Right.__init__")

class Diamond(Left, Right):          # EN: diamond inheritance | UZB: olmos meros
    def __init__(self, value: int):
        super().__init__(value)      # EN: Python MRO ensures Base.__init__ runs ONCE
        print("Diamond.__init__")    # UZB: Python MRO Base.__init__ ni bir marta ishlatadi

d = Diamond(42)
# Base.__init__ called with 42  — bir marta!
# Right.__init__
# Left.__init__
# Diamond.__init__
print(d.value)  # 42
```

---

## 7. SOLID Principles | SOLID Tamoyillar

---

### 79. What is the Single Responsibility Principle (SRP)? | Yagona Mas'uliyat Tamoyili nima?

**EN:** A class should have **only one reason to change** — one class, one job.

**UZB:** Klassning **o'zgarish uchun faqat bitta sababi** bo'lishi kerak — bir klass, bir vazifa.

```python
# EN: BEFORE SRP — class does everything (God class)
# UZB: SRP DAN OLDIN — klass hamma narsani qiladi (Xudo klassi)

class UserManagerBAD:
    def create_user(self, data): pass
    def send_welcome_email(self, user): pass   # EN: email logic here?
    def save_to_database(self, user): pass     # UZB: email mantig'i bu yerda?
    def generate_pdf_report(self): pass
    def validate_user_data(self, data): pass

# EN: AFTER SRP — each class has ONE responsibility
# UZB: SRP DAN KEYIN — har bir klassning BIR mas'uliyati bor

class UserRepository:
    """EN: Only handles DB operations | UZB: Faqat DB operatsiyalarini bajaradi"""
    def save(self, user: dict) -> int:
        print(f"[DB] Saving user: {user['name']}")
        return 1

    def find_by_email(self, email: str) -> dict:
        return {"email": email}

class EmailService:
    """EN: Only handles emails | UZB: Faqat emaillarni boshqaradi"""
    def send_welcome(self, email: str, name: str):
        print(f"[EMAIL] Welcome {name}! Sent to {email}")

class UserValidator:
    """EN: Only validates user data | UZB: Faqat foydalanuvchi ma'lumotlarini tekshiradi"""
    def validate(self, data: dict) -> bool:
        return bool(data.get("name") and data.get("email"))

class UserService:
    """EN: Coordinates — orchestrates other services | UZB: Muvofiqlashtiради"""
    def __init__(self):
        self.repo = UserRepository()
        self.email = EmailService()
        self.validator = UserValidator()

    def register(self, name: str, email: str):
        data = {"name": name, "email": email}
        if not self.validator.validate(data):
            raise ValueError("Invalid user data | Noto'g'ri ma'lumot")
        user_id = self.repo.save(data)
        self.email.send_welcome(email, name)
        return user_id

svc = UserService()
svc.register("Alyorjon", "a@example.com")
```

---

### 80. What is the Open/Closed Principle (OCP)? | Ochiq/Yopiq Tamoyil nima?

**EN:** Classes should be **open for extension but closed for modification**.

**UZB:** Klasslar **kengaytirish uchun ochiq, lekin o'zgartirish uchun yopiq** bo'lishi kerak.

```python
from abc import ABC, abstractmethod

# EN: OCP — add new behavior without modifying existing code
# UZB: OCP — mavjud kodni o'zgartirmasdan yangi xatti-harakat qo'shish

class DiscountStrategy(ABC):
    @abstractmethod
    def apply(self, price: float) -> float: pass

    @abstractmethod
    def description(self) -> str: pass

class NoDiscount(DiscountStrategy):
    def apply(self, price): return price
    def description(self): return "EN: No discount | UZB: Chegirma yo'q"

class PercentDiscount(DiscountStrategy):
    def __init__(self, percent: float):
        self.percent = percent
    def apply(self, price): return price * (1 - self.percent / 100)
    def description(self): return f"{self.percent}% off | {self.percent}% chegirma"

class SeasonalDiscount(DiscountStrategy):     # EN: NEW — no old code changed!
    def apply(self, price): return price * 0.75  # UZB: YANGI — eski kod o'zgarmadi!
    def description(self): return "EN: 25% seasonal | UZB: 25% mavsumiy"

class Order:
    def __init__(self, items: list, strategy: DiscountStrategy):
        self.items = items
        self.strategy = strategy

    def total(self) -> float:
        subtotal = sum(self.items)
        discounted = self.strategy.apply(subtotal)
        print(f"Subtotal: {subtotal:,} | {self.strategy.description()} | Total: {discounted:,}")
        return discounted

Order([100_000, 200_000, 150_000], PercentDiscount(10)).total()
Order([100_000, 200_000, 150_000], SeasonalDiscount()).total()
```

---

### 81. What is the Interface Segregation Principle (ISP)? | Interfeys Ajratish Tamoyili nima?

**EN:** Clients should **not be forced to depend on interfaces they don't use** — prefer many small interfaces.

**UZB:** Mijozlar **ishlatmaydigan interfeysga bog'liq bo'lishga majburlanmasligi** kerak — ko'p kichik interfeys afzal.

```python
from abc import ABC, abstractmethod

# EN: VIOLATION — fat interface
# UZB: BUZILISH — yo'g'on interfeys

class WorkerBAD(ABC):
    @abstractmethod
    def work(self): pass
    @abstractmethod
    def eat(self): pass        # EN: robots don't eat! | UZB: robotlar ovqatlanmaydi!
    @abstractmethod
    def sleep(self): pass      # EN: robots don't sleep! | UZB: robotlar uxlamaydi!

# EN: CORRECT — segregated interfaces
# UZB: TO'G'RI — ajratilgan interfeyslat

class Workable(ABC):
    @abstractmethod
    def work(self) -> str: pass

class Eatable(ABC):
    @abstractmethod
    def eat(self) -> str: pass

class Sleepable(ABC):
    @abstractmethod
    def sleep(self) -> str: pass

class HumanWorker(Workable, Eatable, Sleepable):   # EN: all applicable | UZB: hammasi mos
    def work(self): return "Human working | Inson ishlayapti"
    def eat(self): return "Human eating | Inson ovqatlanyapti"
    def sleep(self): return "Human sleeping | Inson uxlayapti"

class RobotWorker(Workable):                        # EN: only what's applicable!
    def work(self): return "Robot working 24/7 | Robot 24/7 ishlayapti"  # UZB: faqat tegishli!

human = HumanWorker()
robot = RobotWorker()
print(human.work()); print(human.eat())
print(robot.work())  # robot.eat() — AttributeError, correctly!
```

---

### 82. What is the Dependency Inversion Principle (DIP)? | Bog'liqlikni Teskari Aylantirish Tamoyili nima?

**EN:** High-level modules should **depend on abstractions**, not on low-level modules.

**UZB:** Yuqori darajali modullar **abstraktsiyalarga bog'liq** bo'lishi kerak, past darajali modullarga emas.

```python
from abc import ABC, abstractmethod

# EN: DIP — both high and low level depend on abstraction
# UZB: DIP — yuqori va past darajali ham abstraktsiyaga bog'liq

class NotificationChannel(ABC):    # EN: abstraction | UZB: abstraktsiya
    @abstractmethod
    def send(self, to: str, message: str) -> bool: pass

class EmailChannel(NotificationChannel):   # EN: low-level | UZB: past darajali
    def send(self, to, message):
        print(f"[EMAIL → {to}] {message}")
        return True

class SMSChannel(NotificationChannel):
    def send(self, to, message):
        print(f"[SMS → {to}] {message}")
        return True

class TelegramChannel(NotificationChannel):
    def send(self, to, message):
        print(f"[TELEGRAM → {to}] {message}")
        return True

class OrderService:                 # EN: high-level | UZB: yuqori darajali
    def __init__(self, channel: NotificationChannel):
        self.channel = channel      # EN: depends on abstraction | UZB: abstraktsiyaga bog'liq

    def place_order(self, customer: str, item: str):
        print(f"Order placed: {item} | Buyurtma qabul qilindi: {item}")
        self.channel.send(customer, f"Your order '{item}' confirmed | tasdiqlandi!")

# EN: Easy to swap channels | UZB: Kanallarni oson almashtirish
OrderService(EmailChannel()).place_order("a@ex.com", "Laptop")
OrderService(TelegramChannel()).place_order("@alyorjon", "Phone")
```

---

## 8. Design Patterns | Dizayn Patternlar

---

### 83. What is an adapter pattern? | Adapter pattern nima?

**EN:** A design pattern that allows **incompatible interfaces to work together**.

**UZB:** **Mos kelmaydigan interfeyslarga birga ishlash** imkonini beradigan dizayn pattern.

```python
# EN: Adapter — like a power plug adapter
# UZB: Adapter — elektr rozetka adapteri kabi

class LegacyPaymentSystem:
    """EN: Old system — different interface | UZB: Eski tizim — boshqa interfeys"""
    def make_payment_in_tiyin(self, amount_tiyin: int) -> dict:
        return {"status": "ok", "paid": amount_tiyin, "currency": "tiyin"}

class ModernPaymentInterface:
    """EN: New contract | UZB: Yangi shartnoma"""
    def pay(self, amount_uzs: float) -> bool: pass

class PaymentAdapter(ModernPaymentInterface):
    """EN: Adapter — bridges old and new | UZB: Adapter — eskini yangiga ko'prik qiladi"""
    def __init__(self, legacy: LegacyPaymentSystem):
        self.legacy = legacy

    def pay(self, amount_uzs: float) -> bool:
        tiyin = int(amount_uzs * 100)            # EN: unit conversion | UZB: birlik aylantirish
        result = self.legacy.make_payment_in_tiyin(tiyin)
        print(f"Paid {amount_uzs:,} UZS via adapter | adapter orqali to'landi")
        return result["status"] == "ok"

def checkout(payment: ModernPaymentInterface, amount: float):
    success = payment.pay(amount)
    print(f"EN: Payment {'succeeded' if success else 'failed'} | "
          f"UZB: To'lov {'muvaffaqiyatli' if success else 'muvaffaqiyatsiz'}")

legacy = LegacyPaymentSystem()
adapter = PaymentAdapter(legacy)
checkout(adapter, 500_000)
```

---

### 84. What is a singleton pattern? | Singleton pattern nima?

**EN:** Ensures a class has **only one instance** and provides a global access point.

**UZB:** Klassning **faqat bitta nusxasini** ta'minlaydi va global kirish nuqtasini beradi.

```python
import threading

class AppLogger:
    """EN: Thread-safe Singleton Logger | UZB: Thread-xavfsiz Singleton Logger"""
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:            # EN: thread-safe | UZB: thread-xavfsiz
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._logs = []
                    print("EN: Logger initialized | UZB: Logger ishga tushirildi")
        return cls._instance

    def log(self, level: str, message: str):
        entry = f"[{level.upper()}] {message}"
        self._logs.append(entry)
        print(entry)

    def get_logs(self) -> list:
        return self._logs.copy()

# EN: Always the same instance | UZB: Har doim bir xil nusxa
logger1 = AppLogger()
logger2 = AppLogger()
logger3 = AppLogger()

logger1.log("info", "Server started | Server ishga tushdi")
logger2.log("warning", "High memory | Xotira yuqori")

print(f"EN: Same? | UZB: Bir xilmi? {logger1 is logger2 is logger3}")  # True
print(f"Total logs | Jami yozuvlar: {len(logger3.get_logs())}")  # 2
```

---

### 85. What is the factory pattern? | Factory pattern nima?

**EN:** Provides an **interface for creating objects** but lets subclasses decide which type to instantiate.

**UZB:** Obyektlar yaratish uchun **interfeys ta'minlaydi**, lekin qaysi turni yaratishni subklasslarga qoldiradi.

```python
from abc import ABC, abstractmethod

class DatabaseDriver(ABC):
    @abstractmethod
    def connect(self) -> str: pass

    @abstractmethod
    def execute(self, query: str) -> list: pass

class PostgreSQLDriver(DatabaseDriver):
    def connect(self): return "Connected to PostgreSQL | PostgreSQL ga ulandi"
    def execute(self, query): return [{"result": f"PG: {query}"}]

class FirebirdDriver(DatabaseDriver):
    def connect(self): return "Connected to Firebird | Firebird ga ulandi"
    def execute(self, query): return [{"result": f"FB: {query}"}]

class SQLiteDriver(DatabaseDriver):
    def connect(self): return "Connected to SQLite | SQLite ga ulandi"
    def execute(self, query): return [{"result": f"SL: {query}"}]

class DatabaseFactory:
    """EN: Factory — creates right driver without knowing details | UZB: Factory — tafsilotlarsiz to'g'ri driver yaratadi"""
    _drivers = {
        "postgresql": PostgreSQLDriver,
        "firebird": FirebirdDriver,
        "sqlite": SQLiteDriver,
    }

    @classmethod
    def create(cls, db_type: str) -> DatabaseDriver:
        driver_class = cls._drivers.get(db_type.lower())
        if not driver_class:
            raise ValueError(f"EN: Unknown DB type: {db_type} | UZB: Noma'lum DB turi")
        return driver_class()

for db in ["postgresql", "firebird", "sqlite"]:
    driver = DatabaseFactory.create(db)
    print(driver.connect())
    print(driver.execute("SELECT 1"))
```

---

### 86. What is the decorator pattern? | Decorator pattern nima?

**EN:** Allows **behavior to be added to an object** dynamically without changing its structure.

**UZB:** Strukturasini o'zgartirmasdan obyektga **dinamik ravishda xatti-harakat qo'shish** imkonini beradi.

```python
from functools import wraps
import time

# EN: Decorator pattern using Python decorators (perfect match!)
# UZB: Python decoratorlari yordamida decorator pattern (mukammal mos!)

def timer(func):
    """EN: Adds timing behavior | UZB: Vaqt o'lchash xatti-harakatini qo'shadi"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"[TIMER] {func.__name__}: {elapsed:.4f}s")
        return result
    return wrapper

def retry(max_attempts: int = 3, delay: float = 0.1):
    """EN: Adds retry behavior | UZB: Qayta urinish xatti-harakatini qo'shadi"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise
                    print(f"[RETRY] Attempt {attempt} failed: {e}")
                    time.sleep(delay)
        return wrapper
    return decorator

def log(func):
    """EN: Adds logging | UZB: Logging qo'shadi"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"[LOG] Calling {func.__name__} | Chaqirilmoqda: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"[LOG] Done {func.__name__} | Tugadi: {func.__name__}")
        return result
    return wrapper

@timer
@log
@retry(max_attempts=2)
def fetch_data(url: str) -> dict:
    return {"url": url, "data": "success"}

result = fetch_data("https://api.example.com/users")
print(result)
```

---

### 87. What is a proxy pattern? | Proxy pattern nima?

**EN:** An object **represents and controls access** to another object.

**UZB:** Obyekt boshqa obyektga **kirishni ifodalaydi va nazorat qiladi**.

```python
from abc import ABC, abstractmethod
from functools import lru_cache

class ImageLoader(ABC):
    @abstractmethod
    def load(self, path: str) -> bytes: pass

class RealImageLoader(ImageLoader):
    """EN: Real loader — expensive operation | UZB: Haqiqiy yuklash — qimmat operatsiya"""
    def load(self, path: str) -> bytes:
        print(f"[LOAD] Loading image from disk: {path} | diskdan yuklanmoqda")
        return f"<image data: {path}>".encode()

class CachingImageProxy(ImageLoader):
    """EN: Proxy — caches to avoid repeated loading | UZB: Proxy — takroriy yuklashni oldini olish uchun keshlaydi"""
    def __init__(self, real_loader: RealImageLoader):
        self._real = real_loader
        self._cache: dict[str, bytes] = {}
        self._access_count: dict[str, int] = {}

    def load(self, path: str) -> bytes:
        self._access_count[path] = self._access_count.get(path, 0) + 1

        if path in self._cache:
            print(f"[CACHE HIT] {path} (access #{self._access_count[path]})")
            return self._cache[path]

        data = self._real.load(path)
        self._cache[path] = data
        print(f"[CACHE STORED] {path}")
        return data

loader = CachingImageProxy(RealImageLoader())
loader.load("avatar.png")      # EN: disk load | UZB: diskdan yuklash
loader.load("avatar.png")      # EN: cache hit! | UZB: keshdan!
loader.load("banner.jpg")      # EN: disk load | UZB: diskdan
loader.load("avatar.png")      # EN: cache hit! | UZB: keshdan!
```

---

### 88. What is the strategy pattern? | Strategy pattern nima?

**EN:** Defines a **family of algorithms** and makes them **interchangeable** at runtime.

**UZB:** **Algoritmlar oilasini** belgilaydi va ularni runtime'da **almashtirib ishlatish** imkonini beradi.

```python
from abc import ABC, abstractmethod

class SortStrategy(ABC):
    @abstractmethod
    def sort(self, data: list) -> list: pass

    @abstractmethod
    def name(self) -> str: pass

class BubbleSort(SortStrategy):
    def sort(self, data: list) -> list:
        d = data.copy()
        n = len(d)
        for i in range(n):
            for j in range(n - i - 1):
                if d[j] > d[j + 1]:
                    d[j], d[j + 1] = d[j + 1], d[j]
        return d

    def name(self): return "Bubble Sort"

class MergeSort(SortStrategy):
    def sort(self, data: list) -> list:
        if len(data) <= 1: return data
        mid = len(data) // 2
        left = self.sort(data[:mid])
        right = self.sort(data[mid:])
        return self._merge(left, right)

    def _merge(self, l, r):
        result = []
        i = j = 0
        while i < len(l) and j < len(r):
            if l[i] <= r[j]: result.append(l[i]); i += 1
            else: result.append(r[j]); j += 1
        return result + l[i:] + r[j:]

    def name(self): return "Merge Sort"

class DataProcessor:
    def __init__(self, strategy: SortStrategy):
        self.strategy = strategy

    def set_strategy(self, strategy: SortStrategy):
        self.strategy = strategy              # EN: swap at runtime | UZB: runtime'da almashtirish

    def process(self, data: list) -> list:
        print(f"EN: Using {self.strategy.name()} | UZB: Ishlatilmoqda: {self.strategy.name()}")
        return self.strategy.sort(data)

data = [5, 2, 8, 1, 9, 3]
processor = DataProcessor(BubbleSort())
print(processor.process(data))

processor.set_strategy(MergeSort())
print(processor.process(data))
```

---

### 89. What is the observer pattern? | Observer pattern nima?

**EN:** Subject **maintains a list of observers** and notifies them automatically of state changes.

**UZB:** Subject **kuzatuvchilar ro'yxatini saqlaydi** va holat o'zgarganda ularni avtomatik xabardor qiladi.

```python
from abc import ABC, abstractmethod
from typing import Any

class Observer(ABC):
    @abstractmethod
    def update(self, event: str, data: Any): pass

class Observable:
    def __init__(self):
        self._observers: dict[str, list[Observer]] = {}

    def on(self, event: str, observer: Observer):
        self._observers.setdefault(event, []).append(observer)

    def off(self, event: str, observer: Observer):
        if event in self._observers:
            self._observers[event].remove(observer)

    def emit(self, event: str, data: Any = None):
        for obs in self._observers.get(event, []):
            obs.update(event, data)

class AuditLogger(Observer):
    def update(self, event, data):
        print(f"[AUDIT] {event}: {data}")

class EmailNotifier(Observer):
    def __init__(self, email: str):
        self.email = email
    def update(self, event, data):
        print(f"[EMAIL → {self.email}] {event}: {data}")

class StockMonitor(Observer):
    def __init__(self, threshold: float):
        self.threshold = threshold
    def update(self, event, data):
        if event == "price_change" and data.get("price", 0) > self.threshold:
            print(f"[ALERT] Price {data['price']} exceeded threshold {self.threshold} | chegara oshib ketdi!")

class Stock(Observable):
    def __init__(self, symbol: str, price: float):
        super().__init__()
        self.symbol = symbol
        self._price = price

    @property
    def price(self): return self._price

    @price.setter
    def price(self, value: float):
        old = self._price
        self._price = value
        self.emit("price_change", {"symbol": self.symbol, "old": old, "price": value})

tesla = Stock("TSLA", 200.0)
tesla.on("price_change", AuditLogger())
tesla.on("price_change", EmailNotifier("investor@example.com"))
tesla.on("price_change", StockMonitor(threshold=250.0))

tesla.price = 180.0
tesla.price = 260.0
```

---

### 90. What is a constructor delegation? | Konstruktor delegatsiyasi nima?

**EN:** When **one constructor calls another** constructor of the same class.

**UZB:** **Bir konstruktor bir xil klassning boshqa konstruktorini chaqirishi**.

```python
class HttpResponse:
    def __init__(self, status: int, body: str, headers: dict = None, content_type: str = "application/json"):
        self.status = status
        self.body = body
        self.headers = headers or {"Content-Type": content_type}
        self.content_type = content_type

    # EN: Constructor delegation via classmethods
    # UZB: Classmethod orqali konstruktor delegatsiyasi
    @classmethod
    def ok(cls, body: str) -> 'HttpResponse':
        return cls(200, body)               # EN: delegates to main constructor
                                             # UZB: asosiy konstruktorga topshiradi

    @classmethod
    def not_found(cls, resource: str) -> 'HttpResponse':
        return cls(404, f"'{resource}' not found | topilmadi")

    @classmethod
    def error(cls, message: str) -> 'HttpResponse':
        return cls(500, f"Error | Xatolik: {message}")

    def __repr__(self):
        return f"HttpResponse({self.status}, body='{self.body[:30]}...')"

# EN: Using delegated constructors
# UZB: Delegatsiya qilingan konstruktorlardan foydalanish
print(HttpResponse.ok('{"user": "Alyorjon"}'))
print(HttpResponse.not_found("User"))
print(HttpResponse.error("Database connection failed | DB ulanishi xato"))
```

---

### 91. What is covariance? | Kovariyantlik nima?

**EN:** The ability to use a **more derived type** where a base type is expected.

**UZB:** Asosiy tur kutilgan joyda **ko'proq hosila tur** ishlatish qobiliyati.

```python
from typing import List

class Animal:
    def __init__(self, name: str):
        self.name = name

class Dog(Animal):
    def fetch(self): return f"{self.name} fetches!"

class Cat(Animal):
    def purr(self): return f"{self.name} purrs!"

# EN: Covariance — Dog is-a Animal, so Dog list can be used as Animal list
# UZB: Kovariyantlik — Dog Animal ekan, Dog ro'yxatini Animal ro'yxati sifatida ishlatish

def count_animals(animals: List[Animal]) -> int:
    return len(animals)

dogs: List[Dog] = [Dog("Rex"), Dog("Buddy")]
cats: List[Cat] = [Cat("Whiskers")]

# EN: Covariant use — subtype list works where base type list expected
# UZB: Kovariyas foydalanish — kichik tur ro'yxati katta tur ro'yxati kerak bo'lganda ishlaydi
print(count_animals(dogs))   # 2
print(count_animals(cats))   # 1
```

---

### 92. What is contravariance? | Kontravarianslik nima?

**EN:** The ability to use a **less derived (base) type** where a derived type is expected.

**UZB:** Hosila tur kutilgan joyda **kamroq hosila (asosiy) tur** ishlatish qobiliyati.

```python
from typing import Callable

# EN: Contravariance — handler for broad type works for specific type too
# UZB: Kontravarianslik — keng turdagi ishlovchi tor tur uchun ham ishlaydi

class Animal:
    def breathe(self): return "breathing"

class Dog(Animal):
    def bark(self): return "Woof!"

# EN: Function accepting Animal works for Dog (contravariance in parameters)
# UZB: Animal qabul qiladigan funksiya Dog uchun ham ishlaydi

def handle_animal(animal: Animal):
    print(f"Handling: {type(animal).__name__} | Boshqarilmoqda: {type(animal).__name__}")
    print(animal.breathe())

def process_dog_with(handler: Callable[[Animal], None], dog: Dog):
    handler(dog)                # EN: Dog is-a Animal — safe | UZB: Dog Animal hisoblanadi

process_dog_with(handle_animal, Dog())
```

---

### 93. What is function composition? | Funksiya kompozitsiyasi nima?

**EN:** Combining functions where the **output of one becomes the input** of the next.

**UZB:** Funksiyalarni birlashtirish — **birining chiqishi keyingisining kirishiga** aylanadi.

```python
from typing import Callable, TypeVar

T = TypeVar('T')

def compose(*funcs: Callable) -> Callable:
    """EN: Right-to-left composition: compose(f, g, h)(x) = f(g(h(x)))
    UZB: O'ngdan chapga kompozitsiya"""
    from functools import reduce
    return reduce(lambda f, g: lambda x: f(g(x)), funcs)

def pipe(*funcs: Callable) -> Callable:
    """EN: Left-to-right: pipe(f, g, h)(x) = h(g(f(x)))
    UZB: Chapdan o'ngga"""
    return compose(*reversed(funcs))

# EN: Text processing pipeline
# UZB: Matn qayta ishlash quvuri
strip = str.strip
lower = str.lower
def remove_extra_spaces(s: str) -> str: return " ".join(s.split())
def capitalize_words(s: str) -> str: return s.title()

# EN: Compose into single transform function
# UZB: Bir transformatsiya funksiyasiga birlashtirish
clean_text = pipe(strip, lower, remove_extra_spaces, capitalize_words)

texts = [
    "  HELLO   WORLD  ",
    "   python  OOP   CONCEPTS   ",
    " TOSHKENT   UZBEKISTAN  "
]

for text in texts:
    print(clean_text(text))
# Hello World
# Python Oop Concepts
# Toshkent Uzbekistan
```

---

### 94. What is the bridge pattern? | Bridge pattern nima?

**EN:** Separates an object's **abstraction from its implementation** so they vary independently.

**UZB:** Obyektning **abstraktsiyasini amalga oshirishidan ajratadi** — ular mustaqil o'zgaradi.

```python
from abc import ABC, abstractmethod

# EN: Implementation hierarchy
# UZB: Amalga oshirish ierarxiyasi
class MessageFormatter(ABC):
    @abstractmethod
    def format(self, title: str, body: str) -> str: pass

class HTMLFormatter(MessageFormatter):
    def format(self, title, body):
        return f"<h1>{title}</h1><p>{body}</p>"

class PlainTextFormatter(MessageFormatter):
    def format(self, title, body):
        return f"{'='*20}\n{title}\n{'='*20}\n{body}"

class MarkdownFormatter(MessageFormatter):
    def format(self, title, body):
        return f"# {title}\n\n{body}"

# EN: Abstraction hierarchy
# UZB: Abstraktsiya ierarxiyasi
class Notification(ABC):
    def __init__(self, formatter: MessageFormatter):
        self.formatter = formatter   # EN: bridge to implementation | UZB: amalga oshirishga ko'prik

    @abstractmethod
    def send(self, recipient: str, title: str, body: str): pass

class EmailNotification(Notification):
    def send(self, recipient, title, body):
        content = self.formatter.format(title, body)
        print(f"[EMAIL → {recipient}]\n{content}\n")

class PushNotification(Notification):
    def send(self, recipient, title, body):
        content = self.formatter.format(title, body)
        print(f"[PUSH → {recipient}]\n{content}\n")

# EN: Mix and match — 2 abstractions × 3 implementations = 6 combinations!
# UZB: Aralashtirish — 2 abstraktsiya × 3 amalga oshirish = 6 kombinatsiya!
EmailNotification(HTMLFormatter()).send("a@ex.com", "Welcome | Xush kelibsiz", "Your account is ready | Hisobingiz tayyor")
PushNotification(MarkdownFormatter()).send("@alyorjon", "New Order | Yangi buyurtma", "Your order #1001 is confirmed | tasdiqlandi")
```

---

## 9. Other Concepts | Boshqa Tushunchalar

---

### 95. What is a facade pattern? | Facade pattern nima?

**EN:** Provides a **simplified interface** to a complex subsystem.

**UZB:** Murakkab quyi tizimga **soddalashtirilgan interfeys** beradi.

```python
# EN: Facade — hide complexity behind simple interface
# UZB: Facade — murakkablikni oddiy interfeys ortida yashirish

class VideoDecoder:
    def decode(self, file: str) -> str:
        print(f"  [Decoder] Decoding {file} | Dekodlanmoqda")
        return f"decoded:{file}"

class AudioExtractor:
    def extract(self, video_data: str) -> str:
        print(f"  [Audio] Extracting audio | Audio ajratilmoqda")
        return f"audio:{video_data}"

class SubtitleProcessor:
    def process(self, language: str) -> str:
        print(f"  [Subtitle] Processing {language} subtitles | Subtitrlar")
        return f"subtitles:{language}"

class VideoCompressor:
    def compress(self, data: str, quality: str) -> str:
        print(f"  [Compress] Compressing at {quality} | Siqilmoqda")
        return f"compressed:{data}"

class VideoConverter:
    """EN: Facade — single simple interface for complex process
    UZB: Facade — murakkab jarayon uchun bitta oddiy interfeys"""

    def __init__(self):
        self.decoder = VideoDecoder()
        self.audio = AudioExtractor()
        self.subtitle = SubtitleProcessor()
        self.compressor = VideoCompressor()

    def convert(self, input_file: str, output_format: str, lang: str = "uz", quality: str = "720p") -> str:
        print(f"EN: Converting {input_file} to {output_format} | UZB: Konvertatsiya boshlandi")
        video = self.decoder.decode(input_file)
        audio = self.audio.extract(video)
        subs = self.subtitle.process(lang)
        result = self.compressor.compress(f"{video}+{audio}+{subs}", quality)
        print(f"EN: Done! | UZB: Tayyor! → output.{output_format}")
        return result

# EN: User only sees ONE method — complexity is hidden
# UZB: Foydalanuvchi faqat BIR metodini ko'radi — murakkablik yashirilgan
converter = VideoConverter()
converter.convert("lecture.avi", "mp4", lang="uz", quality="1080p")
```

---

### 96. What is lazy initialization? | Dangasa ishga tushirish nima?

**EN:** An object is **not created until it is actually needed** — saves resources.

**UZB:** Obyekt **haqiqatan kerak bo'lgunga qadar yaratilmaydi** — resurslarni tejaydi.

```python
# EN: Lazy initialization — create only when needed
# UZB: Dangasa ishga tushirish — faqat kerak bo'lganda yaratish

class HeavyMLModel:
    """EN: Expensive to load — large model file | UZB: Yuklash qimmat — katta model fayli"""
    def __init__(self):
        print("[ML] Loading model (500MB)... | Model yuklanmoqda... (500MB)")
        self.weights = list(range(10_000))   # EN: simulate large model | UZB: katta modelni simulyatsiya

    def predict(self, input_data: str) -> str:
        return f"Prediction for: {input_data} | Bashorat: {input_data}"

class MLService:
    def __init__(self):
        self._model = None                   # EN: not loaded yet! | UZB: hali yuklanmagan!
        print("MLService created | MLService yaratildi")

    @property
    def model(self) -> HeavyMLModel:
        if self._model is None:              # EN: lazy — create only on first use
            print("[LAZY] First access — loading model | Birinchi kirish — model yuklanmoqda")
            self._model = HeavyMLModel()    # UZB: dangasa — birinchi ishlatishda yaratish
        return self._model

    def predict(self, data: str) -> str:
        return self.model.predict(data)      # EN: model loaded here if needed
                                             # UZB: kerak bo'lsa model shu yerda yuklanadi

service = MLService()                        # EN: fast! model not loaded | UZB: tez! model yuklanmadi
print("EN: Doing other work | UZB: Boshqa ishlar...")
print(service.predict("image.jpg"))          # EN: NOW model loads | UZB: ENDI model yuklanadi
print(service.predict("photo.png"))          # EN: already loaded | UZB: allaqachon yuklangan
```

---

### 97. What is method chaining? | Metod zanjiri nima?

**EN:** A technique where **multiple methods are called in a single statement** — each method returns `self`.

**UZB:** **Bir operatorda bir nechta metod chaqiriladigan** texnika — har bir metod `self` qaytaradi.

```python
# EN: Method chaining — builder pattern / fluent interface
# UZB: Metod zanjiri — builder pattern / ravon interfeys

class QueryBuilder:
    def __init__(self, table: str):
        self._table = table
        self._select = ["*"]
        self._conditions = []
        self._order = None
        self._limit_val = None
        self._offset_val = 0

    def select(self, *fields: str) -> 'QueryBuilder':
        self._select = list(fields)
        return self                     # EN: return self for chaining | UZB: zanjir uchun self qaytarish

    def where(self, condition: str) -> 'QueryBuilder':
        self._conditions.append(condition)
        return self

    def order_by(self, field: str, direction: str = "ASC") -> 'QueryBuilder':
        self._order = f"{field} {direction}"
        return self

    def limit(self, n: int) -> 'QueryBuilder':
        self._limit_val = n
        return self

    def offset(self, n: int) -> 'QueryBuilder':
        self._offset_val = n
        return self

    def build(self) -> str:
        sql = f"SELECT {', '.join(self._select)} FROM {self._table}"
        if self._conditions:
            sql += f" WHERE {' AND '.join(self._conditions)}"
        if self._order:
            sql += f" ORDER BY {self._order}"
        if self._limit_val:
            sql += f" LIMIT {self._limit_val}"
        if self._offset_val:
            sql += f" OFFSET {self._offset_val}"
        return sql

# EN: Fluent, readable query building | UZB: Ravon, o'qilishi oson so'rov qurish
query = (QueryBuilder("employees")
    .select("id", "name", "salary", "department")
    .where("department = 'IT'")
    .where("salary > 5000000")
    .order_by("salary", "DESC")
    .limit(10)
    .offset(20)
    .build())

print(query)
# SELECT id, name, salary, department FROM employees
# WHERE department = 'IT' AND salary > 5000000
# ORDER BY salary DESC LIMIT 10 OFFSET 20
```

---

### 98. What is reflection in OOP? | OOP'da refleksiya nima?

**EN:** The ability of a program to **inspect and modify its own structure** at runtime.

**UZB:** Dasturning runtime'da **o'z tuzilishini tekshirish va o'zgartirish** qobiliyati.

```python
import inspect

class APIEndpoint:
    """EN: Example class for reflection | UZB: Refleksiya uchun namunа klass"""

    base_url: str = "/api/v1"

    def __init__(self, name: str, version: int = 1):
        self.name = name
        self.version = version

    def get(self, id: int) -> dict:
        """GET endpoint | GET so'rovi"""
        return {"id": id, "name": self.name}

    def post(self, data: dict) -> dict:
        """POST endpoint | POST so'rovi"""
        return {"created": True, "data": data}

    @staticmethod
    def validate(data: dict) -> bool:
        return bool(data)

endpoint = APIEndpoint("users", 2)

# EN: Reflection — inspect at runtime | UZB: Refleksiya — runtime'da tekshirish
print("EN: Class name | UZB: Klass nomi:", type(endpoint).__name__)
print("EN: Attributes | UZB: Atributlar:", vars(endpoint))
print("EN: Has 'get'? | UZB: 'get' bormi?:", hasattr(endpoint, 'get'))

# EN: Dynamic method call | UZB: Dinamik metod chaqirish
method_name = "get"
if hasattr(endpoint, method_name):
    method = getattr(endpoint, method_name)
    print(method(42))           # EN: calls get(42) dynamically | UZB: dinamik get(42) chaqirish

# EN: Inspect all methods | UZB: Barcha metodlarni ko'rish
methods = [(name, m) for name, m in inspect.getmembers(endpoint, predicate=inspect.ismethod)]
print("EN: Methods | UZB: Metodlar:", [name for name, _ in methods])

# EN: Dynamically set attribute | UZB: Dinamik atribut o'rnatish
setattr(endpoint, 'rate_limit', 100)
print("Rate limit:", endpoint.rate_limit)
```

---

### 99. What is an event-driven programming model? | Hodisaga asoslangan dasturlash modeli nima?

**EN:** A model where the **flow of the program is determined by events** — user actions, messages, system events.

**UZB:** Dastur oqimi **hodisalar bilan aniqlanadigan** model — foydalanuvchi harakatlari, xabarlar, tizim hodisalari.

```python
# EN: Event-driven model — pub/sub pattern
# UZB: Hodisaga asoslangan model — pub/sub pattern

from typing import Callable, Any
from dataclasses import dataclass
from datetime import datetime

@dataclass
class Event:
    name: str
    data: Any
    timestamp: str = ""

    def __post_init__(self):
        if not self.timestamp:
            self.timestamp = datetime.now().isoformat()

class EventBus:
    """EN: Central event bus — mediator for all events | UZB: Markaziy hodisa avtobuси"""
    def __init__(self):
        self._handlers: dict[str, list[Callable]] = {}

    def subscribe(self, event_name: str, handler: Callable):
        self._handlers.setdefault(event_name, []).append(handler)
        print(f"[BUS] Subscribed to '{event_name}' | '{event_name}' ga obuna bo'lindi")

    def publish(self, event: Event):
        print(f"\n[EVENT] {event.name} at {event.timestamp}")
        handlers = self._handlers.get(event.name, [])
        if not handlers:
            print(f"[BUS] No handlers for '{event.name}' | handler yo'q")
            return
        for handler in handlers:
            handler(event)

bus = EventBus()

# EN: Subscribe different services to events | UZB: Turli xizmatlarni hodisalarga obuna qilish
bus.subscribe("order.created", lambda e: print(f"  [WAREHOUSE] Preparing: {e.data} | Tayyorlanmoqda"))
bus.subscribe("order.created", lambda e: print(f"  [EMAIL] Confirming order: {e.data} | Tasdiqlash xati"))
bus.subscribe("order.created", lambda e: print(f"  [ANALYTICS] Tracking order | Kuzatilmoqda"))
bus.subscribe("payment.failed", lambda e: print(f"  [ALERT] Payment failed! Notify: {e.data} | To'lov xato!"))

# EN: Publish events | UZB: Hodisalarni e'lon qilish
bus.publish(Event("order.created", {"id": 1001, "item": "MacBook", "amount": 12_000_000}))
bus.publish(Event("payment.failed", {"order_id": 1002, "user": "Alyorjon"}))
```

---

### 100. What is the DRY principle in OOP? | OOP'da DRY tamoyili nima?

**EN:** **Don't Repeat Yourself** — every piece of knowledge should have a single, authoritative representation.

**UZB:** **O'zingizni takrorlamang** — har bir bilim bo'lagi yagona, vakolatli ifodalashga ega bo'lishi kerak.

```python
# EN: WET code — Write Everything Twice (anti-pattern)
# UZB: WET kod — Hamma narsani ikki marta yozing (anti-pattern)

class WETExample:
    def calculate_income_tax(self, income: float) -> float:
        if income <= 5_000_000:
            return income * 0.12
        elif income <= 20_000_000:
            return income * 0.20
        else:
            return income * 0.23

    def calculate_bonus_tax(self, bonus: float) -> float:
        # EN: SAME logic duplicated! | UZB: BIR XIL mantiq takrorlandi!
        if bonus <= 5_000_000:
            return bonus * 0.12
        elif bonus <= 20_000_000:
            return bonus * 0.20
        else:
            return bonus * 0.23

# EN: DRY refactored — single source of truth
# UZB: DRY qayta tuzilgan — yagona haqiqat manbai

class TaxSystem:
    _BRACKETS = [
        (5_000_000,  0.12),    # EN: up to 5M — 12% | UZB: 5M gacha — 12%
        (20_000_000, 0.20),    # EN: 5M–20M — 20% | UZB: 5M-20M — 20%
        (float('inf'), 0.23),  # EN: 20M+ — 23% | UZB: 20M+ — 23%
    ]

    @classmethod
    def calculate_tax(cls, amount: float, label: str = "Amount") -> dict:
        """EN: Single tax calculation logic — reused everywhere
        UZB: Yagona soliq hisoblash mantig'i — hamma joyda qayta ishlatiladi"""
        for limit, rate in cls._BRACKETS:
            if amount <= limit:
                tax = amount * rate
                return {"label": label, "amount": amount, "rate": rate, "tax": tax, "net": amount - tax}
        return {}

    @classmethod
    def income_tax(cls, income: float) -> dict:
        return cls.calculate_tax(income, "EN: Income | UZB: Maosh")

    @classmethod
    def bonus_tax(cls, bonus: float) -> dict:
        return cls.calculate_tax(bonus, "EN: Bonus | UZB: Bonus")

    @classmethod
    def print_breakdown(cls, result: dict):
        print(f"  {result['label']}: {result['amount']:>12,.0f} UZS")
        print(f"  Rate | Stavka: {result['rate']*100:.0f}%")
        print(f"  Tax | Soliq: {result['tax']:>13,.0f} UZS")
        print(f"  Net | Sof: {result['net']:>15,.0f} UZS")

print("=== EN: Salary Tax | UZB: Maosh Solig'i ===")
TaxSystem.print_breakdown(TaxSystem.income_tax(8_000_000))

print("\n=== EN: Bonus Tax | UZB: Bonus Solig'i ===")
TaxSystem.print_breakdown(TaxSystem.bonus_tax(2_000_000))
```

---

## 📊 Summary | Xulosa

| # | Topic / Mavzu | Key Word EN | Kalit So'z UZB |
|---|---|---|---|
| 1–4 | OOP Basics | Class, Object, Paradigm | Klass, Obyekt, Paradigma |
| 5–8 | 4 Pillars | Encapsulation, Inheritance, Polymorphism, Abstraction | Inkapsulatsiya, Meros, Polimorfizm, Abstraktsiya |
| 9–12 | Methods | Overloading, Overriding, Constructor, Destructor | Yuklash, Qayta yozish, Konstruktor, Destruktor |
| 13–16 | Keywords | self, super, static, final | self, super, statik, final |
| 17–24 | Inheritance | Multiple, Abstract, Interface, Composition | Ko'p meros, Abstrakt, Interfeys, Kompozitsiya |
| 25–28 | Relations | Association, Coupling, Cohesion | Assotsiatsiya, Qovushish, Koheziya |
| 29–36 | Patterns | Copy, Singleton, Enum, Inner Class | Nusxa, Singleton, Enum, Ichki klass |
| 37–60 | Advanced | Access, Virtual, Abstract, Mixin | Kirish, Virtual, Abstrakt, Mixin |
| 61–68 | Binding | Dynamic, Static, MRO, Casting | Dinamik, Statik, MRO, Konvertatsiya |
| 69–78 | Types | ADT, Exception, Interface vs Class | AMT, Istisno, Interfeys va Klass |
| 79–82 | SOLID | SRP, OCP, ISP, DIP | YMT, O/Y, IAS, BTT |
| 83–94 | Design Patterns | Singleton, Factory, Observer, Strategy | Singleton, Fabrika, Kuzatuvchi, Strategiya |
| 95–100 | Misc | Facade, Lazy, Chaining, DRY | Fasad, Dangasa, Zanjir, O'zni Takrorlama |

---

> 📝 **Source**: [@CODERSS_WORLD](https://t.me/coderss_world)
> 💻 **Python Examples added** | **Python misollari qo'shildi**
> 🇬🇧 **English** + 🇺🇿 **O'zbek** | Bilingual Edition