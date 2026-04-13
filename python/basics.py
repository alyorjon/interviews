# 16 srting methods
my_string="Hello, World!"
print(my_string.upper())  # Output: HELLO, WORLD!
print(my_string.lower())  # Output: hello, world!
print(my_string.title())  # Output: Hello, World!
print(my_string.strip("!"))  # Output: Hello, World
print(my_string.replace("World", "Python"))  # Output: Hello, Python!
words=my_string.split(",")  # Output: ['Hello', ' World!']
print(words)
print("-".join(words))  # Output: Hello- World!
print(str(123).isdigit())  # Output: True
print("123".isdigit())  # Output: True
print("abc".isalpha())  # Output: True
print("abc123".isalnum())  # Output: True
print("   Hello   ".strip())  # Output: Hello
print("   heloo   ".lstrip())  # Output: heloo   
print("   heloo   ".rstrip())  # Output:    heloo
print("Hello, World!".find("World"))  # Output: 7
print("Hello, World!".count("o"))  # Output: 2
print("Hello, World!".startswith("Hello"))  # Output: True
print("Hello, World!".endswith("!"))  # Output: True

#17
class MyBankAccount:
    bank_name="SBI"
    def __init__(self,owner,balance):
        self.owner=owner
        self.balance=balance
    def deposit(self,amount):
        self.balance+=amount
    def withdraw(self,amount):
        if self.balance>=amount:
            self.balance-=amount
        else:
            print("Insufficient balance")
    def __str__(self) -> str:
        return f"Owner: {self.owner}, Balance: {self.balance}"
    def __repr__(self) -> str:
        return f"MyBankAccount(owner='{self.owner}', balance={self.balance})"
account1=MyBankAccount("Alice",1000)
account1.deposit(500)
account1.withdraw(200)
print(account1.owner)  # Output: Alice
print(account1.balance)  # Output: 1300
print(account1)  # Output: Owner: Alice, Balance: 1300
print(repr(account1))  # Output: MyBankAccount(owner='Alice', balance=


#18 inheritance in python
class Animal:
    def __init__(self,name,sound    ):
        self.name=name
        self.sound=sound
    def speak(self):
        return f"{self.name} says {self.sound}"
class Dog(Animal):
    def __init__(self,name):
        super().__init__(name,"Woof")
class Cat(Animal):
    def __init__(self,name):
        super().__init__(name,"Meow")
dog1=Dog("Buddy")
cat1=Cat("Whiskers")
print(dog1.speak())  # Output: Buddy says Woof
print(cat1.speak())  # Output: Whiskers says Meow
#19 dunder methods in python
class Point:
    def __init__(self,x,y):
        self.x=x
        self.y=y
    def __add__(self,other):
        return Point(self.x+other.x,self.y+other.y)
    def __str__(self) -> str:
        return f"Point({self.x}, {self.y})"
    def __repr__(self) -> str:
        return f"Point(x={self.x}, y={self.y})"
    def __eq__(self,other):
        return self.x==other.x and self.y==other.y
    def __lt__(self,other):
        return (self.x**2+self.y**2)<(other.x**2+other.y**2)
    def __mul__(self, other):
        return Point(self.x*other.x,self.y*other.y)
    def __truediv__(self, other):
        return Point(self.x/other.x,self.y/other.y)
    def __abs__(self):
        return (self.x**2+self.y**2)**0.5
point1=Point(2,3)
point2=Point(4,5)
point3=point1+point2
print(point3)  # Output: Point(6, 8)
print(repr(point3))  # Output: Point(x=6, y=8)
print(point1==point2)  # Output: False
print(point1>point2)  # Output: True
point4=point1*point2
print(point4)  # Output: Point(8, 15)
point5=point2/point1
print(point5)  # Output: Point(2.0, 1.666666)
print(abs(point1))  # Output: 3.605551275463989


#23 dictionaries in python
my_dict={"name":"Alice","age":30,"city":"New York"}
print(my_dict["name"])  # Output: Alice
print(my_dict.get("age"))  # Output: 30
my_dict["country"]="USA"
my_dict.update({'age':31})
print(my_dict)  # Output: {'name': 'Alice', 'age': 31, 'city': 'New York', 'country': 'USA'}
print(my_dict.keys())  # Output: dict_keys(['name', 'age', 'city', 'country'])
print(my_dict.values())  # Output: dict_values(['Alice', 31, 'NewYork', 'USA'])
for key in my_dict.items():
    print(key)  # Output: ('name', 'Alice'), ('age', 31), ('city', 'New York'), ('country', 'USA')
my_dict.pop("city")
print(my_dict)  # Output: {'name': 'Alice', 'age': 31, 'country': 'USA'}
my_dict.clear()
print(my_dict)  # Output: {}
my_dict.setdefault("book","Python")
print(my_dict)  # Output: {'book': 'Python'}
first_dict={"a":1,"b":2}
second_dict={"b":3,"c":4}
merged_dict={**first_dict,**second_dict}
merged_dict1=first_dict | second_dict
print(merged_dict)  # Output: {'a': 1, 'b': 3, 'c': 4}
print(merged_dict1)  # Output: {'a': 1, 'b': 3, 'c': 4}

#decorators in python
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
from functools import wraps

def dec_without_wraps(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

def dec_with_wraps(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@dec_without_wraps
def f1(): 'wrapper without wraps'

@dec_with_wraps
def f2(): 'wrapper with wraps'

print(f1.__name__)
print(f2.__name__)