# 🧮 Data Structures & Algorithms — 76 Real-World Interview Questions & Answers
### Ikki tilli mukammal qo'llanma / Bilingual Comprehensive Reference Guide

> **Darajalar / Levels:** 🟢 Basic (1–19) | 🟡 Intermediate (20–38) | 🔴 Advanced (39–58) | ⚫ Expert (59–76)  
> **Tillar / Languages:** O'zbek 🇺🇿 | English 🇬🇧  
> **Maqsad / Goal:** Data Structures & Algorithms (DSA) bo'yicha Top FAANG / Big Tech coding intervyulariga to'liq tayyorgarlik — Big-O tahlili, Python yechimlari va real interview savollari bilan.

---

## 📚 Mundarija / Table of Contents

1. [🟢 Asosiy daraja / Basic Level (1–19)](#1-asosiy-daraja--basic-level-119)
2. [🟡 O'rta daraja / Intermediate Level (20–38)](#2-orta-daraja--intermediate-level-2038)
3. [🔴 Ilg'or daraja / Advanced Level (39–58)](#3-ilgor-daraja--advanced-level-3958)
4. [⚫ Ekspert daraja / Expert Level (59–76)](#4-ekspert-daraja--expert-level-5976)

---

## 🟢 1. Asosiy daraja / Basic Level (1–19)

---

### 1. Algoritm nima va yaxshi algoritmning xususiyatlari qanday? / What is an Algorithm and what makes a good algorithm?
> **UZ:** Algoritm — muayyan masalani hal qilish uchun aniq, chekli va tartiblangan qadamlar ketma-ketligi. Yaxshi algoritm quyidagi xususiyatlarga ega bo'lishi kerak: **To'g'rilik (Correctness)** — barcha kirish (input) holatlarida to'g'ri natija berishi, **Samaradorlik (Efficiency)** — vaqt va xotira resurslarini minimal sarflashi, **Chekliligi (Finiteness)** — chekli qadamdan so'ng tugashi, **Aniqlik (Definiteness)** — har bir qadam noaniqliksiz bo'lishi.  
> **EN:** An algorithm is a well-defined, finite sequence of steps that solves a specific problem. A good algorithm has: **Correctness** (produces valid output for all inputs), **Efficiency** (minimal time/space usage), **Finiteness** (terminates after finite steps), and **Definiteness** (each step is unambiguous).

---

### 2. Big-O notatsiyasi nima va vaqt/xotira murakkabligi (Time/Space Complexity) qanday hisoblanadi? / What is Big-O Notation and how is Time/Space Complexity calculated?
> **UZ:** Big-O — algoritm bajarilish vaqti yoki xotira sarfi kirish hajmi (`n`) ortishi bilan qanday o'sishini tavsiflovchi matematik notatsiya. U eng yomon holat (worst-case) chegarasini ko'rsatadi va doimiy koeffitsientlar hamda kichik hadlar e'tiborga olinmaydi.  
> **EN:** Big-O describes the upper bound of an algorithm's growth rate as input size (`n`) increases. It represents worst-case behavior, ignoring constant factors and lower-order terms.

| Notation | Nomi / Name | Misol / Example |
|---|---|---|
| O(1) | Constant | Array indexga murojaat / array index access |
| O(log n) | Logarithmic | Binary Search |
| O(n) | Linear | Single loop, linear search |
| O(n log n) | Linearithmic | Merge Sort, Quick Sort (average) |
| O(n²) | Quadratic | Nested loops, Bubble Sort |
| O(2ⁿ) | Exponential | Recursive Fibonacci (naive) |
| O(n!) | Factorial | Permutations generation |

---

### 3. Big-O, Big-Theta (Θ) va Big-Omega (Ω) o'rtasidagi farq nimada? / What is the difference between Big-O, Big-Theta (Θ), and Big-Omega (Ω)?
> **UZ:**  
> - **Big-O (O):** Yuqori chegara — algoritm eng yomon holatda qancha vaqt olishi mumkinligini ko'rsatadi.  
> - **Big-Omega (Ω):** Quyi chegara — algoritm eng yaxshi holatda kamida qancha vaqt olishini ko'rsatadi.  
> - **Big-Theta (Θ):** Aniq chegara — algoritm o'rtacha/barcha holatlarda qat'iy shu tartibda ishlashini bildiradi (Ω va O bir xil bo'lganda).  
> **EN:** **Big-O** is the upper bound (worst case). **Big-Omega** is the lower bound (best case). **Big-Theta** is a tight bound — used when the upper and lower bounds match, describing exact asymptotic behavior.

---

### 4. Array va Linked List o'rtasidagi asosiy farqlar nimada? / What are the key differences between an Array and a Linked List?
> **UZ:** **Array** — xotirada ketma-ket (contiguous) joylashgan, indeks orqali O(1) da murojaat qilinadigan ma'lumot tuzilmasi. **Linked List** — har bir element (node) keyingi elementga ko'rsatkich (pointer) saqlaydigan, xotirada tarqoq joylashgan tuzilma.  
> **EN:** An **Array** stores elements contiguously in memory with O(1) index-based access. A **Linked List** stores elements as nodes scattered in memory, each holding a pointer to the next node.

| Xususiyat / Feature | Array | Linked List |
|---|---|---|
| Access by index | O(1) | O(n) |
| Insert/Delete at start | O(n) | O(1) |
| Insert/Delete at end | O(1) amortized | O(1) with tail pointer |
| Memory | Contiguous, cache-friendly | Scattered, pointer overhead |
| Size | Fixed (or resized) | Dynamic |

---

### 5. Statik va Dinamik Array (Amortized Doubling) qanday ishlaydi? / How do Static and Dynamic Arrays work (Amortized Doubling)?
> **UZ:** **Statik array** kompilyatsiya vaqtida o'lchami belgilangan, o'zgarmas hajmga ega. **Dinamik array** (Python `list`, Java `ArrayList`) to'lganda avtomatik ravishda kattaroq (odatda 2x) yangi xotira blokiga ko'chiriladi. Bu qayta ko'chirish operatsiyasi kamdan-kam bo'lgani uchun `append` ning **amortizatsiyalangan (amortized)** vaqt murakkabligi O(1) bo'ladi, garchi bitta alohida ko'chirish O(n) bo'lsa ham.  
> **EN:** A **static array** has a fixed size set at creation. A **dynamic array** (Python `list`, Java `ArrayList`) automatically reallocates to a larger block (typically 2x) when full. Because resizing happens infrequently, the amortized time complexity of `append` is O(1), even though a single resize costs O(n).

```python
# Dynamic array growth simulation | Dinamik array o'sishini simulyatsiya qilish
lst = []
for i in range(10):
    lst.append(i)
    # EN: CPython doubles capacity roughly when full — append is O(1) amortized
    # UZ: CPython sig'im to'lganda uni ikki barobar oshiradi — append O(1) amortized
```

---

### 6. String immutability (Python) va string operatsiyalarining murakkabligi qanday? / How does String Immutability work in Python and what is the complexity of string operations?
> **UZ:** Python'da `str` — **immutable (o'zgarmas)** ma'lumot turi. Har qanday `+=` yoki konkatenatsiya operatsiyasi yangi string obyekt yaratadi, eskisini o'zgartirmaydi. Sikl ichida ko'p marta `+=` ishlatish O(n²) ga olib keladi (har safar yangi nusxa ko'chiriladi); buning o'rniga `"".join(list)` (O(n)) ishlatish tavsiya etiladi.  
> **EN:** In Python, `str` is **immutable** — every `+=` or concatenation creates a brand-new string object rather than mutating in place. Repeated `+=` inside a loop costs O(n²) total (each step copies the whole string); use `"".join(list)` instead for O(n) concatenation.

```python
# ❌ Noto'g'ri | Inefficient — O(n²)
result = ""
for word in words:
    result += word

# ✅ To'g'ri | Efficient — O(n)
result = "".join(words)
```

---

### 7. Two Pointer (Ikki Ko'rsatkich) texnikasi nima va qachon ishlatiladi? / What is the Two Pointer technique and when is it used?
> **UZ:** Two Pointer — tartiblangan array yoki stringda ikkita indeksni (odatda boshidan va oxiridan yoki ikkalasi bir tomondan) bir vaqtda harakatlantirib, O(n²) brute-force o'rniga O(n) da masala yechish texnikasi. Palindrome tekshirish, juftlik yig'indisi (pair sum) kabi masalalarda qo'llaniladi.  
> **EN:** The Two Pointer technique uses two indices moving through a sorted array/string (often from opposite ends, or both from the same side) to solve problems in O(n) instead of a naive O(n²) brute force. Common for palindrome checks and pair-sum problems.

```python
def two_sum_sorted(nums: list[int], target: int) -> list[int]:
    # EN: Array must be sorted | UZ: Array tartiblangan bo'lishi kerak
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1   # EN: Need a bigger sum | UZ: Kattaroq yig'indi kerak
        else:
            right -= 1  # EN: Need a smaller sum | UZ: Kichikroq yig'indi kerak
    return []
# Time: O(n) | Space: O(1)
```

---

### 8. Sliding Window (Sirg'anuvchi Oyna) texnikasi nima va qanday masalalarda foydali? / What is the Sliding Window technique and where is it useful?
> **UZ:** Sliding Window — array yoki stringning uzluksiz kichik qismini (window) "surib" borib, har safar to'liq qayta hisoblash o'rniga faqat chekka elementlarni qo'shib/ayirib natijani yangilash texnikasi. Ketma-ket subarray/substring masalalarida (masalan, "eng uzun takrorlanmas belgilar substringi") O(n²) o'rniga O(n) beradi.  
> **EN:** Sliding Window "slides" a contiguous subrange over an array/string, updating the result incrementally (adding/removing boundary elements) instead of recomputing from scratch. Reduces O(n²) brute force to O(n) for contiguous subarray/substring problems.

```python
def longest_unique_substring(s: str) -> int:
    seen = {}
    left = max_len = 0
    for right, char in enumerate(s):
        if char in seen and seen[char] >= left:
            left = seen[char] + 1   # EN: Shrink window | UZ: Oynani qisqartirish
        seen[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len
# Time: O(n) | Space: O(min(n, alphabet_size))
```

---

### 9. Array yoki stringni joyida (in-place) qanday teskari aylantirish mumkin? / How do you reverse an array or string in-place?
> **UZ:** In-place reverse — qo'shimcha xotira ishlatmasdan (O(1) space), ikki ko'rsatkichni (boshidan va oxiridan) markazga qarab harakatlantirib elementlarni almashtirish orqali amalga oshiriladi.  
> **EN:** In-place reversal swaps elements using two pointers moving from both ends toward the center, using O(1) extra space.

```python
def reverse_in_place(arr: list) -> None:
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
# Time: O(n) | Space: O(1)
```

---

### 10. Kadane's Algorithm nima va u qanday masalani hal qiladi (Maximum Subarray Sum)? / What is Kadane's Algorithm and what problem does it solve (Maximum Subarray Sum)?
> **UZ:** Kadane's Algorithm — array ichidagi ketma-ket elementlar (contiguous subarray) yig'indisi maksimal bo'lgan qismini O(n) vaqtda topadi. G'oyasi: har bir qadamda joriy elementgacha bo'lgan yig'indini davom ettirish yoki yangi subarray boshlashdan qaysi biri foydaliroq ekanligini tanlash (Dynamic Programming yondashuvi).  
> **EN:** Kadane's Algorithm finds the maximum sum of a contiguous subarray in O(n) time. Idea: at each step, decide whether to extend the current subarray sum or start fresh from the current element — a classic 1D dynamic programming pattern.

```python
def max_subarray_sum(nums: list[int]) -> int:
    max_ending_here = max_so_far = nums[0]
    for num in nums[1:]:
        max_ending_here = max(num, max_ending_here + num)
        max_so_far = max(max_so_far, max_ending_here)
    return max_so_far
# Time: O(n) | Space: O(1)
```

---

### 11. Binary Search algoritmi qanday ishlaydi va murakkabligi qancha? / How does the Binary Search algorithm work and what is its complexity?
> **UZ:** Binary Search — **tartiblangan** array'da qidiruv makonini har qadamda ikkiga bo'lib, kerakli elementni O(log n) vaqtda topadi. O'rta elementni target bilan solishtiradi: teng bo'lsa topildi, kichik bo'lsa o'ng yarmida, katta bo'lsa chap yarmida davom etadi.  
> **EN:** Binary Search finds a target in a **sorted** array by repeatedly halving the search space — O(log n) time. Compares the middle element to the target: if smaller, search the right half; if larger, search the left half.

```python
def binary_search(arr: list[int], target: int) -> int:
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
# Time: O(log n) | Space: O(1) iterative
```

---

### 12. Rekursiya (Recursion) nima va base case/call stack qanday ishlaydi? / What is Recursion and how does the base case/call stack work?
> **UZ:** Rekursiya — funksiyaning o'zini-o'zi chaqirishi orqali masalani kichikroq bo'lakchalarga bo'lib yechish usuli. Har bir rekursiv funksiyada ikkita zaruriy qism bo'lishi kerak: **Base Case** (rekursiyani to'xtatuvchi shart) va **Recursive Case** (masalani kichraytirib o'ziga qaytadigan qism). Har bir chaqiruv **Call Stack** ga joylashadi; base case yo'q bo'lsa `StackOverflow` xatoligi yuzaga keladi.  
> **EN:** Recursion is when a function calls itself to break a problem into smaller subproblems. Every recursive function needs a **Base Case** (stopping condition) and a **Recursive Case** (a smaller call toward the base). Each call is pushed onto the **Call Stack**; missing a base case causes a `StackOverflow`.

```python
def factorial(n: int) -> int:
    if n <= 1:          # Base case | Bazaviy holat
        return 1
    return n * factorial(n - 1)   # Recursive case | Rekursiv holat
# Time: O(n) | Space: O(n) call stack
```

---

### 13. Rekursiv Fibonacci va uning eksponensial murakkabligi nima uchun yuzaga keladi? / Why does the naive recursive Fibonacci have exponential time complexity?
> **UZ:** Naiv rekursiv Fibonacci `fib(n) = fib(n-1) + fib(n-2)` har bir chaqiruvda ikkita yangi chaqiruv yaratadi va bir xil qiymatlar (masalan `fib(3)`) bir necha marta qayta hisoblanadi. Bu takroriy hisoblashlar daraxt shaklidagi rekursiyani hosil qiladi, natijada murakkablik O(2ⁿ) bo'ladi. Yechim: **memoization** yoki **bottom-up DP** orqali har bir qiymatni faqat bir marta hisoblash (O(n)).  
> **EN:** Naive recursive Fibonacci `fib(n) = fib(n-1) + fib(n-2)` spawns two calls per invocation, recomputing the same subproblems (e.g. `fib(3)`) repeatedly. This redundant branching produces a call tree of O(2ⁿ) nodes. Fix: memoize results or use bottom-up DP to compute each value once — O(n).

```python
# ❌ Naive — O(2ⁿ)
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# ✅ Memoized — O(n)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo(n):
    if n <= 1:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)
```

---

### 14. Stack (Yig'ma) ma'lumot tuzilmasi nima va qayerda ishlatiladi? / What is a Stack data structure and where is it used?
> **UZ:** Stack — **LIFO (Last-In-First-Out)** printsipida ishlaydigan chiziqli ma'lumot tuzilmasi. Asosiy operatsiyalari: `push` (qo'shish), `pop` (olib tashlash), `peek/top` (yuqoridagini ko'rish) — barchasi O(1). Ishlatilish sohalari: function call stack, undo/redo, brauzer "orqaga" tarixi, ifodalarni baholash (expression evaluation), DFS.  
> **EN:** A Stack follows **LIFO (Last-In-First-Out)** ordering. Core operations — `push`, `pop`, `peek` — are all O(1). Common uses: function call stacks, undo/redo history, browser back-navigation, expression evaluation, and DFS traversal.

```python
stack = []
stack.append(1)   # push
stack.append(2)
stack.append(3)
top = stack.pop()  # pop → 3 (LIFO)
```

---

### 15. Queue (Navbat) ma'lumot tuzilmasi nima va qayerda ishlatiladi? / What is a Queue data structure and where is it used?
> **UZ:** Queue — **FIFO (First-In-First-Out)** printsipida ishlaydigan chiziqli ma'lumot tuzilmasi. Asosiy operatsiyalari: `enqueue` (охирига qo'shish) va `dequeue` (boshidan olib tashlash). Python'da oddiy `list.pop(0)` O(n) bo'lgani uchun `collections.deque` (ikki tomonlama chekli navbat) ishlatiladi — u O(1) da ishlaydi. Ishlatilish sohalari: BFS, task scheduling, print queue, rate limiting.  
> **EN:** A Queue follows **FIFO (First-In-First-Out)** ordering — `enqueue` appends to the back, `dequeue` removes from the front. In Python, plain `list.pop(0)` is O(n); use `collections.deque` instead for O(1) operations. Common uses: BFS, task scheduling, print queues, rate limiting.

```python
from collections import deque

queue = deque()
queue.append(1)     # enqueue
queue.append(2)
queue.append(3)
first = queue.popleft()  # dequeue → 1 (FIFO), O(1)
```

---

### 16. "Valid Parentheses" masalasi Stack yordamida qanday yechiladi? / How is the "Valid Parentheses" problem solved using a Stack?
> **UZ:** Qavslar ketma-ketligi to'g'ri ochilib-yopilganini tekshirish uchun ochuvchi qavslarni stack ga joylashtiramiz. Yopuvchi qavs kelganda stack tepasidagi element unga mos ochuvchi qavs ekanligini tekshiramiz. Oxirida stack bo'sh bo'lsa — ketma-ketlik to'g'ri.  
> **EN:** To validate balanced brackets, push opening brackets onto a stack. On a closing bracket, check it matches the top of the stack (pop it). If the stack is empty at the end, the sequence is valid.

```python
def is_valid(s: str) -> bool:
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for char in s:
        if char in "([{":
            stack.append(char)
        elif char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
    return not stack
# Time: O(n) | Space: O(n)
```

---

### 17. Hashing va Hash Table nima, kollizyalar (collisions) qanday hal qilinadi? / What is Hashing and a Hash Table, and how are collisions resolved?
> **UZ:** Hash Table — kalit (key) ni **hash funksiya** orqali indeksga aylantirib, o'rtacha O(1) da qo'shish/qidirish/o'chirish imkonini beruvchi ma'lumot tuzilmasi (Python'da `dict`). Ikki xil kalit bir xil indeksga tushishi mumkin (**collision**) — bu ikki asosiy usul bilan hal qilinadi: **Chaining** (bir indeksda linked list/list saqlash) va **Open Addressing** (bo'sh keyingi katakni probing orqali topish).  
> **EN:** A Hash Table maps keys to indices via a **hash function**, giving average O(1) insert/lookup/delete (Python's `dict`). Two different keys may map to the same index (**collision**), resolved via **Chaining** (store a list/linked-list per bucket) or **Open Addressing** (probe for the next free slot).

| Metod / Method | Tavsif / Description |
|---|---|
| Chaining | Har bir bucket — linked list / dynamic array |
| Open Addressing (Linear Probing) | Band bo'lsa keyingi katakka o'tish |
| Open Addressing (Double Hashing) | Ikkinchi hash funksiya bilan qadam hisoblash |

---

### 18. "Two Sum" masalasi Hash Map yordamida O(n) da qanday yechiladi? / How is the "Two Sum" problem solved in O(n) using a Hash Map?
> **UZ:** Brute-force yechim ikkita ichma-ich sikl bilan O(n²) bo'ladi. Hash Map yordamida esa har bir elementni bir marta ko'rib chiqib, `target - current` qiymati oldin ko'rilganmi tekshirish orqali O(n) ga tushiriladi.  
> **EN:** Brute force uses nested loops for O(n²). Using a Hash Map, we scan once, checking whether `target - current` was already seen — reducing complexity to O(n).

```python
def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}   # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
# Time: O(n) | Space: O(n)
```

---

### 19. Python'da `list`, `set`, va `dict` ning qidiruv (lookup) murakkabligi qanday farqlanadi? / How does lookup complexity differ between Python `list`, `set`, and `dict`?
> **UZ:** `list` da `x in lst` tekshiruvi elementlar ustidan chiziqli qidiruv qiladi — O(n). `set` va `dict` esa hash table asosida qurilgani uchun `x in s` yoki `d[key]` o'rtacha O(1) da ishlaydi (eng yomon holatda hash kollizyalar ko'p bo'lsa O(n)).  
> **EN:** `x in lst` on a `list` performs linear scan — O(n). `set` and `dict` are hash-table based, so membership/lookup is average O(1) (worst-case O(n) under heavy collisions).

| Operatsiya / Operation | list | set | dict |
|---|---|---|---|
| `x in ...` | O(n) | O(1) avg | O(1) avg |
| Insert | O(1) end / O(n) middle | O(1) avg | O(1) avg |
| Ordered | ✅ | ❌ (insertion order in Python 3.7+ for dict only) | ✅ (3.7+) |

---

## 🟡 2. O'rta daraja / Intermediate Level (20–38)

---

### 20. Singly Linked List va Doubly Linked List o'rtasidagi farq nimada? / What is the difference between a Singly and Doubly Linked List?
> **UZ:** **Singly Linked List** — har bir node faqat keyingi (`next`) node ga ko'rsatkich saqlaydi, faqat bir yo'nalishda o'tish mumkin. **Doubly Linked List** — har bir node ham `next`, ham `prev` ko'rsatkichga ega, ikki yo'nalishda o'tish mumkin, lekin qo'shimcha xotira sarflanadi.  
> **EN:** A **Singly Linked List** node holds only a `next` pointer — traversal is one-directional. A **Doubly Linked List** node holds both `next` and `prev` pointers, enabling bidirectional traversal at the cost of extra memory per node.

```python
class Node:
    def __init__(self, val):
        self.val = val
        self.next = None   # Singly
        # self.prev = None  # Doubly bo'lsa qo'shiladi | added for Doubly
```

---

### 21. Linked List ni qanday teskari aylantirish mumkin (iterative)? / How do you reverse a Linked List (iterative)?
> **UZ:** Iterativ usulda uchta ko'rsatkich (`prev`, `curr`, `next`) yordamida har bir node ning `next` ko'rsatkichini teskari yo'naltirib boramiz.  
> **EN:** Iteratively reverse using three pointers (`prev`, `curr`, `next`), flipping each node's `next` pointer as you traverse.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head: ListNode) -> ListNode:
    prev = None
    curr = head
    while curr:
        next_node = curr.next   # EN: Save next | UZ: Keyingisini saqlash
        curr.next = prev        # EN: Flip pointer | UZ: Ko'rsatkichni teskari qilish
        prev = curr
        curr = next_node
    return prev   # New head | Yangi bosh
# Time: O(n) | Space: O(1)
```

---

### 22. Linked List da tsikl (cycle) borligini Floyd's Algorithm bilan qanday aniqlash mumkin? / How do you detect a cycle in a Linked List using Floyd's Algorithm?
> **UZ:** Floyd's Cycle Detection ("Tortoise and Hare") — ikkita ko'rsatkich ishlatadi: `slow` (1 qadam) va `fast` (2 qadam). Agar ro'yxatda tsikl bo'lsa, ikkalasi qandaydir nuqtada albatta uchrashadi. Agar `fast` `None` ga yetsa — tsikl yo'q.  
> **EN:** Floyd's Cycle Detection ("Tortoise and Hare") uses two pointers: `slow` (moves 1 step) and `fast` (moves 2 steps). If a cycle exists, they will eventually meet. If `fast` reaches `None`, there is no cycle.

```python
def has_cycle(head: ListNode) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
# Time: O(n) | Space: O(1)
```

---

### 23. Ikkita tartiblangan Linked List ni qanday birlashtirish mumkin (Merge Two Sorted Lists)? / How do you merge two sorted Linked Lists?
> **UZ:** Ikkita tartiblangan ro'yxatni bittalab solishtirib, kichikrog'ini yangi ro'yxatga qo'shib boramiz (dummy head yordamchi node bilan).  
> **EN:** Compare heads of both sorted lists one at a time, appending the smaller node to a new list (using a dummy head helper node).

```python
def merge_two_lists(l1: ListNode, l2: ListNode) -> ListNode:
    dummy = ListNode()
    tail = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next, l1 = l1, l1.next
        else:
            tail.next, l2 = l2, l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next
# Time: O(n + m) | Space: O(1)
```

---

### 24. Deque (Double-Ended Queue) va Circular Queue nima? / What is a Deque (Double-Ended Queue) and a Circular Queue?
> **UZ:** **Deque** — ham boshidan, ham oxiridan O(1) da qo'shish/olib tashlashga imkon beruvchi navbat (Python: `collections.deque`). **Circular Queue** — fiksirlangan hajmli array asosida qurilgan, oxirgi indeks to'lganda boshiga qaytadigan (modulo arifmetika bilan) navbat turi — xotirani samarali qayta ishlatadi.  
> **EN:** A **Deque** allows O(1) insertion/removal from both ends (Python's `collections.deque`). A **Circular Queue** is array-based with a fixed size, wrapping the index back to the start via modulo arithmetic when full — efficiently reusing freed slots.

---

### 25. Ikkita Stack yordamida Queue qanday amalga oshiriladi? / How do you implement a Queue using two Stacks?
> **UZ:** Bitta stack (`in_stack`) barcha `enqueue` uchun ishlatiladi. `dequeue` chaqirilganda, agar `out_stack` bo'sh bo'lsa, `in_stack` dagi barcha elementlar `out_stack` ga ko'chiriladi (tartib teskari bo'ladi) va undan `pop` qilinadi. Bu amortizatsiyalangan O(1) beradi.  
> **EN:** Use one stack (`in_stack`) for all `enqueue` operations. On `dequeue`, if `out_stack` is empty, pour all elements from `in_stack` into `out_stack` (reversing order), then pop from it. This yields amortized O(1) per operation.

```python
class QueueWithStacks:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def enqueue(self, x):
        self.in_stack.append(x)

    def dequeue(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack.pop()
# Amortized O(1) per operation
```

---

### 26. Binary Tree nima va uch xil traversal (in-order, pre-order, post-order) qanday farqlanadi? / What is a Binary Tree and how do In-Order, Pre-Order, and Post-Order traversal differ?
> **UZ:** Binary Tree — har bir node ko'pi bilan ikkita farzand (chap va o'ng) ga ega bo'lgan iyerarxik ma'lumot tuzilmasi.  
> - **Pre-Order (Root → Left → Right):** Node nusxa/serialize qilish uchun mos.  
> - **In-Order (Left → Root → Right):** BST da tartiblangan ketma-ketlik beradi.  
> - **Post-Order (Left → Right → Root):** Node larni xavfsiz o'chirish/daraxtni yig'ish uchun mos.  
> **EN:** A Binary Tree is a hierarchical structure where each node has at most two children (left, right).  
> - **Pre-Order (Root → Left → Right):** Good for copying/serializing a tree.  
> - **In-Order (Left → Root → Right):** Yields sorted order for a BST.  
> - **Post-Order (Left → Right → Root):** Good for safely deleting nodes or evaluating expression trees.

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def in_order(root):
    if not root:
        return []
    return in_order(root.left) + [root.val] + in_order(root.right)
# Time: O(n) | Space: O(h), h = tree height (recursion stack)
```

---

### 27. BFS (Breadth-First Search) va DFS (Depth-First Search) traversal usullari qanday farqlanadi? / How do BFS and DFS traversal differ?
> **UZ:** **BFS** — daraxt/graf'ni qatlam-qatlam (level by level) `queue` yordamida aylanib chiqadi; eng qisqa yo'lni (unweighted graph'da) topish uchun ideal. **DFS** — bitta shoxni tubigacha borib, keyin ortga qaytib boshqa shoxni tekshiradi (`stack` yoki rekursiya orqali); memory jihatidan tejamkorroq bo'lishi mumkin.  
> **EN:** **BFS** traverses level by level using a `queue` — ideal for shortest path in an unweighted graph. **DFS** goes deep down one branch before backtracking (using a `stack` or recursion) — can be more memory-efficient for deep, narrow trees.

```python
from collections import deque

def bfs(root):
    if not root:
        return []
    result, queue = [], deque([root])
    while queue:
        node = queue.popleft()
        result.append(node.val)
        if node.left: queue.append(node.left)
        if node.right: queue.append(node.right)
    return result
# Time: O(n) | Space: O(n) worst case (wide tree)
```

---

### 28. Binary Search Tree (BST) xususiyatlari va asosiy operatsiyalari qanday? / What are the properties and core operations of a Binary Search Tree (BST)?
> **UZ:** BST — har bir node uchun: chap farzand < node < o'ng farzand qoidasi bajariladigan Binary Tree. Bu xususiyat qidiruv, qo'shish va o'chirishni **balanslangan** daraxtda O(log n) da amalga oshirishga imkon beradi (lekin balanslanmagan holatda O(n) ga tushib qolishi mumkin, masalan tartiblangan ma'lumot ketma-ket qo'shilganda).  
> **EN:** In a BST, every node satisfies: left subtree < node < right subtree. This property allows search, insert, and delete in O(log n) when the tree is **balanced** — but degrades to O(n) in the worst case (e.g., inserting already-sorted data creates a linked-list-shaped tree).

```python
def bst_search(root, target):
    if not root or root.val == target:
        return root
    if target < root.val:
        return bst_search(root.left, target)
    return bst_search(root.right, target)
# Balanced: O(log n) | Skewed worst case: O(n)
```

---

### 29. AVL Tree va Red-Black Tree nima va nima uchun kerak? / What are AVL Trees and Red-Black Trees, and why are they needed?
> **UZ:** Oddiy BST ketma-ket qo'shilgan ma'lumotlarda "chiziq" (skewed) shaklga tushib, O(n) ga yomonlashishi mumkin. **AVL Tree** har bir node uchun chap-o'ng balandlik farqi ko'pi bilan 1 bo'lishini qat'iy nazorat qilib, rotatsiyalar orqali avtomatik balanslaydi (qidiruv tez, lekin qo'shish sekinroq). **Red-Black Tree** kamroq qattiq balanslash qoidalariga ega (rang belgilari orqali), amaliyotda ko'proq DB indekslari va til kutubxonalarida (masalan Java `TreeMap`, C++ `std::map`) ishlatiladi, chunki insert/delete tezroq.  
> **EN:** A plain BST can degenerate into a skewed O(n) shape with sorted insertions. An **AVL Tree** strictly enforces a height-balance factor of at most 1 via rotations (fast lookups, slower inserts). A **Red-Black Tree** uses looser balancing rules (via node coloring), favoring faster inserts/deletes — used in Java `TreeMap`, C++ `std::map`, and many DB indexes.

---

### 30. Binary Tree da Lowest Common Ancestor (LCA) masalasi qanday yechiladi? / How is the Lowest Common Ancestor (LCA) problem solved in a Binary Tree?
> **UZ:** LCA — ikkita berilgan node ning eng pastki umumiy ajdodi. Rekursiv yechim: agar joriy node ikkala target'dan biriga teng bo'lsa yoki ikkalasi turli tomon subtree'larda topilsa — u LCA. Aks holda topilgan tomonga qarab rekursiya davom etadi.  
> **EN:** LCA is the deepest node that has both given nodes as descendants. Recursive approach: if the current node matches either target, or the two targets are found in different subtrees, it is the LCA. Otherwise, recurse into the side where a match was found.

```python
def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    if left and right:
        return root       # EN: p and q on different sides | UZ: p va q turli tomonda
    return left or right
# Time: O(n) | Space: O(h)
```

---

### 31. Bubble Sort, Insertion Sort va Selection Sort — O(n²) saralash algoritmlari qanday ishlaydi? / How do the O(n²) sorting algorithms — Bubble, Insertion, Selection Sort — work?
> **UZ:**  
> - **Bubble Sort:** Qo'shni elementlarni solishtirib, tartibsiz bo'lsa almashtiradi, har o'tishda eng katta element oxiriga "suzib chiqadi".  
> - **Insertion Sort:** Har bir elementni tartiblangan qismga to'g'ri joyga qo'yib boradi — kichik yoki deyarli tartiblangan massivlar uchun samarali.  
> - **Selection Sort:** Har bir o'tishda qolgan qismdan eng kichik elementni topib, boshiga qo'yadi.  
> **EN:**  
> - **Bubble Sort:** Repeatedly swaps adjacent out-of-order elements — the largest "bubbles" to the end each pass.  
> - **Insertion Sort:** Inserts each element into its correct position in the already-sorted prefix — efficient for small or nearly-sorted data.  
> - **Selection Sort:** Finds the minimum in the unsorted remainder each pass and swaps it to the front.

| Algorithm | Best | Average | Worst | Space | Stable? |
|---|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ |

---

### 32. Merge Sort (Divide and Conquer) qanday ishlaydi va kod misoli qanday? / How does Merge Sort (Divide and Conquer) work, with a code example?
> **UZ:** Merge Sort array'ni rekursiv ravishda yarmiga bo'linadi (Divide), har bir yarim mustaqil saralanadi, so'ng ikkita tartiblangan yarim O(n) da birlashtiriladi (Conquer/Merge). Har doim O(n log n) kafolatlaydi, lekin O(n) qo'shimcha xotira talab qiladi.  
> **EN:** Merge Sort recursively splits the array in half (Divide), sorts each half independently, then merges the two sorted halves in O(n) (Conquer/Merge). Guarantees O(n log n) in all cases but requires O(n) extra space.

```python
def merge_sort(arr: list) -> list:
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
# Time: O(n log n) always | Space: O(n)
```

---

### 33. Quick Sort qanday ishlaydi va pivot tanlash eng yomon holatga (O(n²)) qanday ta'sir qiladi? / How does Quick Sort work, and how does pivot choice affect the worst case (O(n²))?
> **UZ:** Quick Sort **pivot** elementni tanlab, array'ni pivot dan kichik va katta qismlarga bo'lib (partition), so'ng har bir qismni rekursiv saralaydi. O'rtacha holatda O(n log n), lekin pivot doim eng kichik/katta element bo'lib qolsa (masalan, tartiblangan array'da doim birinchi elementni tanlash), bo'linish teng bo'lmay O(n²) ga yomonlashadi. Yechim: **random pivot** yoki **median-of-three** tanlash.  
> **EN:** Quick Sort selects a **pivot**, partitions the array into elements smaller/larger than the pivot, then recursively sorts each partition. Average case is O(n log n), but a poorly chosen pivot (e.g., always picking the first element on already-sorted input) causes unbalanced partitions and O(n²) worst case. Fix: use a **random pivot** or **median-of-three** selection.

```python
import random

def quick_sort(arr: list) -> list:
    if len(arr) <= 1:
        return arr
    pivot = random.choice(arr)          # EN: Randomized pivot avoids worst case
    less = [x for x in arr if x < pivot]
    equal = [x for x in arr if x == pivot]
    greater = [x for x in arr if x > pivot]
    return quick_sort(less) + equal + quick_sort(greater)
# Average: O(n log n) | Worst: O(n²) | Space: O(log n) in-place variant
```

---

### 34. Comparison-based saralashning nazariy pastki chegarasi nima va Counting Sort/Radix Sort qanday undan chetlanadi? / What is the theoretical lower bound for comparison-based sorting, and how do Counting Sort/Radix Sort beat it?
> **UZ:** Har qanday **taqqoslashga asoslangan (comparison-based)** saralash algoritmi eng yomon holatda kamida O(n log n) taqqoslash talab qiladi (n ta elementning n! ta mumkin tartibini aniqlash uchun kerakli qaror daraxti balandligi). **Counting Sort** va **Radix Sort** elementlarni taqqoslamasdan, balki ularning qiymati/raqamlariga asoslanib to'g'ridan-to'g'ri joylashtirgani uchun bu chegaradan chetga chiqib O(n + k) yoki O(nk) ga erishadi (k — qiymatlar diapazoni yoki raqamlar soni), lekin faqat butun son/cheklangan diapazon kabi maxsus holatlar uchun ishlaydi.  
> **EN:** Any **comparison-based** sorting algorithm requires at least O(n log n) comparisons in the worst case (the decision-tree height needed to distinguish n! permutations). **Counting Sort** and **Radix Sort** bypass this bound by not comparing elements directly — instead bucketing by value/digit — achieving O(n + k) or O(nk) (k = value range or digit count), but only work for special cases like bounded integers.

```python
def counting_sort(arr: list[int], max_val: int) -> list[int]:
    counts = [0] * (max_val + 1)
    for num in arr:
        counts[num] += 1
    result = []
    for value, count in enumerate(counts):
        result.extend([value] * count)
    return result
# Time: O(n + k) | Space: O(k)
```

---

### 35. Tartiblangan va Aylantirilgan (Rotated Sorted) Array'da qidiruv qanday amalga oshiriladi? / How do you search in a Rotated Sorted Array?
> **UZ:** Aylantirilgan tartiblangan array'da (masalan `[4,5,6,7,0,1,2]`) standart binary search to'g'ridan-to'g'ri ishlamaydi, lekin modifikatsiyalangan versiyasi O(log n) da ishlaydi: har qadamda array'ning qaysi yarmi (chap yoki o'ng) hali ham tartiblanganini aniqlab, target o'sha tartiblangan yarim ichida bormi tekshiramiz.  
> **EN:** In a rotated sorted array (e.g., `[4,5,6,7,0,1,2]`), standard binary search doesn't directly apply, but a modified version still runs in O(log n): at each step, determine which half (left or right) is still sorted, then check whether the target falls within that sorted half.

```python
def search_rotated(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[low] <= nums[mid]:          # Left half sorted
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else:                                # Right half sorted
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return -1
# Time: O(log n) | Space: O(1)
```

---

### 36. Hash Table kollizyalarini hal qilishda Chaining va Open Addressing qanday taqqoslanadi? / How do Chaining and Open Addressing compare for resolving Hash Table collisions?
> **UZ:** **Chaining** — har bir bucket o'z ichida linked list saqlaydi, load factor 1 dan oshsa ham ishlay oladi, lekin qo'shimcha pointer xotirasi sarflaydi. **Open Addressing** — barcha elementlar bitta array ichida saqlanadi (cache-friendly, xotira tejamkor), lekin load factor 0.7 dan oshsa unumdorlik keskin pasayadi va o'chirish operatsiyasi murakkablashadi (tombstone belgilar kerak).  
> **EN:** **Chaining** stores a linked list per bucket — tolerates load factor > 1 but adds pointer memory overhead. **Open Addressing** stores everything in one array (cache-friendly, memory efficient), but performance degrades sharply past load factor ~0.7, and deletion requires tombstone markers.

---

### 37. Set va Dict/HashMap qachon qaysi biri ishlatiladi? / When should you use a Set vs a Dict/HashMap?
> **UZ:** **Set** faqat unikal elementlarni saqlaydi, key-value juftlik kerak bo'lmaganda (masalan, allaqachon ko'rilgan elementlarni kuzatish, dublikatlarni olib tashlash, kesishma/birlashma amallar uchun) ishlatiladi. **Dict/HashMap** — kalitga bog'liq qiymat saqlash kerak bo'lganda (masalan, so'z chastotasi, indeks xaritalash) ishlatiladi.  
> **EN:** Use a **Set** when you only need to track unique membership (visited elements, deduplication, intersection/union operations) with no associated value. Use a **Dict/HashMap** when each key needs an associated value (word frequency counts, index mapping).

```python
# Set: duplicate detection
seen = set()
for num in nums:
    if num in seen:
        print("Duplicate found!")
    seen.add(num)

# Dict: frequency counting
from collections import Counter
freq = Counter(nums)
```

---

### 38. Rekursiya va Iteratsiya o'rtasidagi savdo-sotiq (trade-off) hamda Tail Recursion nima? / What is the trade-off between Recursion and Iteration, and what is Tail Recursion?
> **UZ:** Rekursiya kodni o'qish/yozishni soddalashtiradi (ayniqsa daraxt/graf masalalarida), lekin har bir chaqiruv call stack frame yaratadi — chuqur rekursiya `StackOverflow` yoki sekinlik keltirib chiqarishi mumkin. Iteratsiya (`for`/`while`) odatda O(1) qo'shimcha xotira bilan ishlaydi. **Tail Recursion** — rekursiv chaqiruv funksiyaning eng oxirgi amali bo'lgan holat; ba'zi tillar (masalan Scheme, Scala) buni avtomatik siklga aylantiradi (**Tail Call Optimization**), lekin **Python bunday optimizatsiyani qo'llamaydi** — shu sabab chuqur rekursiya Python'da xavfli.  
> **EN:** Recursion simplifies code (especially for trees/graphs) but each call adds a stack frame — deep recursion risks `StackOverflow` or slowness. Iteration (`for`/`while`) typically uses O(1) extra memory. **Tail Recursion** is when the recursive call is the last operation in a function; some languages (Scheme, Scala) auto-convert this into a loop (**Tail Call Optimization**), but **Python does NOT perform TCO** — so deep recursion is risky in Python.

---

## 🔴 3. Ilg'or daraja / Advanced Level (39–58)

---

### 39. Graf (Graph) nima va Adjacency List vs Adjacency Matrix farqi nima? / What is a Graph, and how does an Adjacency List differ from an Adjacency Matrix?
> **UZ:** Graf — cho'qqilar (vertices/nodes) va ularni bog'lovchi qirralar (edges) to'plamidan iborat ma'lumot tuzilmasi. **Adjacency List** — har bir node uchun uning qo'shnilari ro'yxatini saqlaydi (kam edge'li "sparse" graflarda xotira tejamkor, O(V+E)). **Adjacency Matrix** — V×V o'lchamli ikkilik matritsa (ikki node orasidagi bog'lanishni O(1) da tekshirish mumkin, lekin O(V²) xotira talab qiladi).  
> **EN:** A Graph consists of vertices (nodes) and edges connecting them. An **Adjacency List** stores each node's neighbors in a list (memory-efficient for sparse graphs, O(V+E)). An **Adjacency Matrix** is a V×V binary matrix (O(1) edge-existence check, but O(V²) memory).

```python
# Adjacency List
graph = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A"],
    "D": ["B"],
}
```

---

### 40. Grafda BFS orqali eng qisqa yo'l (unweighted) qanday topiladi? / How do you find the shortest path in an unweighted graph using BFS?
> **UZ:** Vaznsiz grafda BFS har bir node ga birinchi marta yetib borilgan payt eng qisqa yo'l ekanligini kafolatlaydi, chunki BFS qatlam-qatlam kengayadi. `visited` to'plami va `queue` yordamida amalga oshiriladi.  
> **EN:** In an unweighted graph, BFS guarantees that the first time a node is reached is via the shortest path, since BFS expands level by level. Implemented using a `visited` set and a `queue`.

```python
from collections import deque

def bfs_shortest_path(graph, start, target):
    queue = deque([(start, [start])])
    visited = {start}
    while queue:
        node, path = queue.popleft()
        if node == target:
            return path
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    return None
# Time: O(V + E) | Space: O(V)
```

---

### 41. Grafda DFS qanday amalga oshiriladi va bog'langan komponentalarni (connected components) topish uchun qanday ishlatiladi? / How is DFS implemented on a graph, and how is it used to find connected components?
> **UZ:** DFS bitta node dan boshlab, imkon qadar chuqurroq yuriladi, so'ng ortga qaytadi. Barcha node'larni aylanib chiqib, hali ziyorat qilinmagan node'dan yangi DFS boshlansa — har bir yangi boshlanish yangi bog'langan komponentani bildiradi.  
> **EN:** DFS starts at a node and goes as deep as possible before backtracking. Iterating over all nodes and starting a new DFS whenever an unvisited node is found — each new start marks a new connected component.

```python
def dfs(graph, node, visited):
    visited.add(node)
    for neighbor in graph.get(node, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

def count_connected_components(graph, nodes):
    visited = set()
    count = 0
    for node in nodes:
        if node not in visited:
            dfs(graph, node, visited)
            count += 1
    return count
# Time: O(V + E) | Space: O(V)
```

---

### 42. Dijkstra's Algorithm og'irlikli (weighted) grafda eng qisqa yo'lni qanday topadi? / How does Dijkstra's Algorithm find the shortest path in a weighted graph?
> **UZ:** Dijkstra's Algorithm manfiy bo'lmagan og'irliklarga ega grafda bitta manbadan barcha node'largacha eng qisqa yo'lni topadi. **Min-Heap (priority queue)** yordamida har doim eng kichik masofaga ega node ni tanlab, uning qo'shnilarining masofasini yangilaydi (relaxation).  
> **EN:** Dijkstra's Algorithm finds the shortest path from a single source to all nodes in a graph with non-negative weights. Using a **Min-Heap (priority queue)**, it always processes the node with the smallest known distance and relaxes its neighbors' distances.

```python
import heapq

def dijkstra(graph, start):
    # graph: {node: [(neighbor, weight), ...]}
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    while pq:
        current_dist, node = heapq.heappop(pq)
        if current_dist > distances[node]:
            continue
        for neighbor, weight in graph[node]:
            new_dist = current_dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                heapq.heappush(pq, (new_dist, neighbor))
    return distances
# Time: O((V + E) log V) with binary heap
```

---

### 43. Bellman-Ford Algorithm nima va u Dijkstra'dan nima bilan farq qiladi? / What is the Bellman-Ford Algorithm and how does it differ from Dijkstra's?
> **UZ:** Bellman-Ford ham eng qisqa yo'l masalasini yechadi, lekin Dijkstra'dan farqli o'laroq **manfiy og'irlikdagi qirralar** bilan ishlay oladi va **manfiy tsikl** mavjudligini aniqlay oladi. Barcha qirralarni V-1 marta "relax" qiladi, so'ng V-marta yana tekshirib, agar masofa yana kamaysa — manfiy tsikl mavjud. Sekinroq: O(V·E).  
> **EN:** Bellman-Ford also solves shortest paths, but unlike Dijkstra, it handles **negative edge weights** and can detect **negative cycles**. It relaxes all edges V-1 times, then does one more pass — if any distance still decreases, a negative cycle exists. Slower: O(V·E).

```python
def bellman_ford(edges, num_vertices, start):
    distances = [float('inf')] * num_vertices
    distances[start] = 0
    for _ in range(num_vertices - 1):
        for u, v, weight in edges:
            if distances[u] + weight < distances[v]:
                distances[v] = distances[u] + weight
    for u, v, weight in edges:
        if distances[u] + weight < distances[v]:
            raise ValueError("Negative cycle detected")
    return distances
# Time: O(V * E)
```

---

### 44. Topological Sort nima va Kahn's Algorithm qanday ishlaydi? / What is Topological Sort and how does Kahn's Algorithm work?
> **UZ:** Topological Sort — Directed Acyclic Graph (DAG) dagi node'larni shunday tartiblashki, har bir qirra `u → v` uchun `u` har doim `v` dan oldin keladi (masalan, kurs oldingi shartlar, build dependency tartibi). **Kahn's Algorithm** — barcha in-degree (kirish darajasi) 0 bo'lgan node'larni queue ga qo'shib, ularni chiqarib, qo'shnilarining in-degree'sini kamaytirib boradi.  
> **EN:** Topological Sort orders nodes in a Directed Acyclic Graph (DAG) so that for every edge `u → v`, `u` comes before `v` (used for course prerequisites, build dependency ordering). **Kahn's Algorithm** enqueues all nodes with in-degree 0, dequeues them, and decrements neighbors' in-degree, repeating.

```python
from collections import deque, defaultdict

def topological_sort(num_nodes, edges):
    graph = defaultdict(list)
    in_degree = [0] * num_nodes
    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1

    queue = deque([n for n in range(num_nodes) if in_degree[n] == 0])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    if len(order) != num_nodes:
        raise ValueError("Cycle detected — no valid topological order")
    return order
# Time: O(V + E)
```

---

### 45. Yo'naltirilgan (directed) va yo'naltirilmagan (undirected) grafda tsiklni qanday aniqlash mumkin? / How do you detect a cycle in directed vs undirected graphs?
> **UZ:** **Undirected graph**da tsiklni DFS bilan aniqlash uchun har bir qo'shni node ziyorat qilinganini va u "ota" (parent) node bo'lmasligini tekshiramiz. **Directed graph**da esa oddiy `visited` yetarli emas — joriy DFS yo'lida bo'lgan node'larni (`in recursion stack`) alohida kuzatish kerak; agar shu yo'lda allaqachon bo'lgan node ga qayta duch kelinsa — tsikl bor.  
> **EN:** For **undirected graphs**, DFS detects a cycle by checking if a visited neighbor is not the immediate parent. For **directed graphs**, a simple `visited` set is insufficient — you must track nodes on the current DFS recursion path; revisiting a node still on that path indicates a cycle.

```python
def has_cycle_directed(graph, num_nodes):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * num_nodes

    def dfs(node):
        color[node] = GRAY   # In current recursion path
        for neighbor in graph.get(node, []):
            if color[neighbor] == GRAY:
                return True                  # Back edge → cycle
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[node] = BLACK
        return False

    return any(color[n] == WHITE and dfs(n) for n in range(num_nodes))
# Time: O(V + E)
```

---

### 46. Union-Find (Disjoint Set Union) va Path Compression qanday ishlaydi? / How does Union-Find (Disjoint Set Union) with Path Compression work?
> **UZ:** Union-Find — elementlarni bir-biriga bog'lanmagan (disjoint) to'plamlarga ajratib, ikki asosiy amalni tezkor bajaruvchi tuzilma: `find(x)` (x qaysi to'plamga tegishli) va `union(x, y)` (ikki to'plamni birlashtirish). **Path Compression** — `find` chaqirilganda yo'ldagi barcha node'larni to'g'ridan-to'g'ri ildizga (root) ulash orqali keyingi so'rovlarni tezlashtiradi. **Union by Rank/Size** bilan birga deyarli O(1) (aniqrog'i O(α(n)), inverse Ackermann) amortizatsiyalangan murakkablik beradi. Kruskal's MST va tsikl aniqlashda ishlatiladi.  
> **EN:** Union-Find partitions elements into disjoint sets, supporting two fast operations: `find(x)` (which set does x belong to) and `union(x, y)` (merge two sets). **Path Compression** flattens the tree during `find`, linking nodes directly to the root, speeding up future queries. Combined with **Union by Rank/Size**, it achieves near-O(1) (technically O(α(n)), inverse Ackermann) amortized complexity. Used in Kruskal's MST and cycle detection.

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x, y):
        root_x, root_y = self.find(x), self.find(y)
        if root_x == root_y:
            return False               # Already connected → cycle
        if self.rank[root_x] < self.rank[root_y]:
            root_x, root_y = root_y, root_x
        self.parent[root_y] = root_x
        if self.rank[root_x] == self.rank[root_y]:
            self.rank[root_x] += 1
        return True
# Amortized: O(α(n)) ≈ O(1) per operation
```

---

### 47. Minimum Spanning Tree (MST) nima va Kruskal's / Prim's algoritmlari qanday farqlanadi? / What is a Minimum Spanning Tree (MST) and how do Kruskal's and Prim's algorithms differ?
> **UZ:** MST — og'irlikli grafdagi barcha node'larni tsiklsiz, minimal umumiy og'irlik bilan bog'lovchi qirralar to'plami. **Kruskal's:** barcha qirralarni og'irlik bo'yicha tartiblab, eng kichigidan boshlab, tsikl hosil qilmaydigan qirralarni Union-Find yordamida qo'shib boradi — O(E log E). **Prim's:** bitta node dan boshlab, min-heap yordamida har doim mavjud daraxtga ulanadigan eng arzon qirrani tanlaydi — O(E log V).  
> **EN:** An MST connects all nodes in a weighted graph with no cycles at minimum total edge weight. **Kruskal's** sorts all edges by weight and greedily adds the cheapest edge that doesn't form a cycle (using Union-Find) — O(E log E). **Prim's** grows a tree from one node, using a min-heap to always pick the cheapest edge connecting to the tree — O(E log V).

---

### 48. Heap (Uyum) nima, Min-Heap vs Max-Heap va heapify qanday ishlaydi? / What is a Heap, Min-Heap vs Max-Heap, and how does heapify work?
> **UZ:** Heap — to'liq binar daraxt (complete binary tree) ko'rinishidagi maxsus tuzilma, odatda array orqali amalga oshiriladi. **Min-Heap**da har bir ota node farzandlaridan kichik yoki teng; **Max-Heap**da esa katta yoki teng. Eng kichik/katta elementga O(1) da murojaat qilinadi, qo'shish/olib tashlash O(log n). **Heapify** — array'ni heap xususiyatiga bottom-up tartibda O(n) da keltiradi (naiv n marta insert O(n log n) dan tezroq).  
> **EN:** A Heap is a complete binary tree, typically array-backed. In a **Min-Heap**, each parent ≤ its children; in a **Max-Heap**, each parent ≥ its children. Min/max access is O(1); insert/remove is O(log n). **Heapify** builds a heap from an unordered array bottom-up in O(n) — faster than n naive inserts at O(n log n).

```python
import heapq

nums = [5, 3, 8, 1, 9]
heapq.heapify(nums)             # O(n) — min-heap in-place
smallest = heapq.heappop(nums)  # O(log n) → 1
heapq.heappush(nums, 2)         # O(log n)

# Max-heap trick in Python: negate values
max_heap = [-x for x in nums]
heapq.heapify(max_heap)
largest = -heapq.heappop(max_heap)
```

---

### 49. Priority Queue nima va u qanday amaliy holatlarda ishlatiladi? / What is a Priority Queue and what are its real-world use cases?
> **UZ:** Priority Queue — har bir elementga ustuvorlik (priority) biriktirilgan navbat, odatda Heap orqali amalga oshiriladi; eng yuqori (yoki eng past) ustuvorlikdagi element birinchi chiqariladi. Amaliy holatlar: Dijkstra's/Prim's algoritmlari, task scheduler (OS jarayonlarni rejalashtirish), Huffman coding, event-driven simulation.  
> **EN:** A Priority Queue associates a priority with each element, typically implemented via a Heap; the highest (or lowest) priority element is dequeued first. Real-world uses: Dijkstra's/Prim's algorithms, OS process schedulers, Huffman coding, event-driven simulations.

---

### 50. Array'dagi K-chi eng katta/eng kichik elementni qanday topish mumkin (Heap yordamida)? / How do you find the Kth Largest/Smallest element in an array using a Heap?
> **UZ:** To'liq saralash O(n log n) bo'lardi, lekin fiksirlangan hajmi K bo'lgan Min-Heap yordamida O(n log k) ga tushiriladi: har bir elementni heap ga qo'shamiz, hajmi K dan oshsa eng kichigini chiqarib tashlaymiz — oxirida heap tepasidagi element javob bo'ladi.  
> **EN:** Full sorting would cost O(n log n), but using a fixed-size K Min-Heap reduces this to O(n log k): push each element, and if the heap grows beyond size K, pop the smallest — the heap's top element is the answer.

```python
import heapq

def kth_largest(nums: list[int], k: int) -> int:
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]
# Time: O(n log k) | Space: O(k)
```

---

### 51. Dynamic Programming (DP) nima va Memoization vs Tabulation qanday farqlanadi? / What is Dynamic Programming, and how does Memoization differ from Tabulation?
> **UZ:** DP — murakkab masalani bir-biriga bog'liq (overlapping) kichik masalalarga bo'lib, har birining natijasini bir marta hisoblab keshlab, qayta hisoblashning oldini oluvchi usul. Ikki asosiy yondashuv: **Memoization (Top-Down)** — rekursiya + cache (masalan `lru_cache` bilan), tabiiy va yozish oson. **Tabulation (Bottom-Up)** — iterativ, kichik masaladan boshlab jadval (`dp[]` array) to'ldirib boradi, odatda tezroq (rekursiya overhead yo'q) va call stack chegarasidan xoli.  
> **EN:** DP breaks a complex problem into overlapping subproblems, caching each result once to avoid recomputation. Two approaches: **Memoization (Top-Down)** — recursion + cache (e.g., via `lru_cache`), natural to write. **Tabulation (Bottom-Up)** — iterative, fills a table (`dp[]` array) starting from the smallest subproblem, usually faster (no recursion overhead) and avoids stack-depth limits.

---

### 52. Fibonacci masalasi Top-Down va Bottom-Up DP bilan qanday yechiladi? / How is the Fibonacci problem solved with Top-Down and Bottom-Up DP?
> **UZ:** Ikkalasi ham O(2ⁿ) naiv rekursiyani O(n) ga tushiradi, xotira esa O(1) gacha optimallashtirilishi mumkin (faqat oxirgi ikkita qiymatni saqlab).  
> **EN:** Both reduce the O(2ⁿ) naive recursion to O(n); space can be optimized further to O(1) by keeping only the last two values.

```python
# Top-Down (Memoization)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_top_down(n):
    if n <= 1:
        return n
    return fib_top_down(n - 1) + fib_top_down(n - 2)

# Bottom-Up (Tabulation) — O(1) space
def fib_bottom_up(n):
    if n <= 1:
        return n
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        prev2, prev1 = prev1, prev2 + prev1
    return prev1
# Time: O(n) | Space: O(1)
```

---

### 53. 0/1 Knapsack Masalasi nima va DP bilan qanday yechiladi? / What is the 0/1 Knapsack Problem and how is it solved with DP?
> **UZ:** Berilgan og'irlik va qiymatga ega N ta buyum va maksimal sig'im W bo'lgan sumka bor. Har bir buyum yo to'liq olinadi, yo umuman olinmaydi (0/1 — bo'lib olib bo'lmaydi). Maqsad — sig'imdan oshmasdan maksimal umumiy qiymatga erishish. 2D DP jadvali `dp[i][w]` — birinchi `i` ta buyum va sig'im `w` bilan erishiladigan maksimal qiymatni saqlaydi.  
> **EN:** Given N items each with weight and value, and a knapsack of capacity W, choose items to maximize total value without exceeding capacity — each item is either fully taken or not (0/1, no fractional). A 2D DP table `dp[i][w]` stores the max value achievable using the first `i` items within capacity `w`.

```python
def knapsack_01(weights: list[int], values: list[int], capacity: int) -> int:
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][capacity]
# Time: O(n * capacity) | Space: O(n * capacity), reducible to O(capacity)
```

---

### 54. Longest Common Subsequence (LCS) masalasi nima va DP yechimi qanday? / What is the Longest Common Subsequence (LCS) problem and its DP solution?
> **UZ:** LCS — ikkita stringda ketma-ketligi (tartibi) saqlangan, lekin uzluksiz bo'lishi shart bo'lmagan eng uzun umumiy subsequence uzunligini topadi. `dp[i][j]` — birinchi string ning `i` va ikkinchi stringning `j` belgisigacha bo'lgan LCS uzunligini bildiradi. Diff tool'lar (masalan `git diff`) va DNA solishtirishda ishlatiladi.  
> **EN:** LCS finds the length of the longest subsequence common to two strings, preserving relative order but not requiring contiguity. `dp[i][j]` represents the LCS length considering the first `i` characters of string 1 and first `j` of string 2. Used in diff tools (`git diff`) and DNA sequence comparison.

```python
def lcs(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]
# Time: O(m * n) | Space: O(m * n)
```

---

### 55. Longest Increasing Subsequence (LIS) masalasi O(n²) va O(n log n) yechimlar bilan qanday tushuntiriladi? / How is the Longest Increasing Subsequence (LIS) problem explained via O(n²) and O(n log n) solutions?
> **UZ:** LIS — array ichida o'sib boruvchi eng uzun subsequence (ketma-ket bo'lishi shart emas) uzunligini topadi. **O(n²) DP:** `dp[i]` — `i` indeks bilan tugaydigan LIS uzunligi; har bir `i` uchun barcha oldingi `j < i` tekshiriladi. **O(n log n):** Binary Search + "tails" array — har bir yangi elementni tartiblangan `tails` array ichida binary search orqali to'g'ri joyga qo'yish (patience sorting g'oyasi).  
> **EN:** LIS finds the length of the longest strictly increasing subsequence (not necessarily contiguous). **O(n²) DP:** `dp[i]` is the LIS length ending at index `i`, checking all previous `j < i`. **O(n log n):** Binary Search + a "tails" array — binary-search each new element into its correct position in a sorted `tails` array (patience-sorting idea).

```python
import bisect

def length_of_lis(nums: list[int]) -> int:
    tails = []
    for num in nums:
        pos = bisect.bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
    return len(tails)
# Time: O(n log n) | Space: O(n)
```

---

### 56. Coin Change Masalasi (Minimal tanga soni) DP bilan qanday yechiladi? / How is the Coin Change problem (minimum number of coins) solved with DP?
> **UZ:** Berilgan tanga nominallari bilan maqsad summani yig'ish uchun kerak bo'ladigan minimal tanga sonini topish. `dp[amount]` — shu summani yig'ish uchun kerak bo'lgan minimal tanga soni (unbounded knapsack turi — har bir tangadan istalgancha ishlatish mumkin).  
> **EN:** Given coin denominations, find the minimum number of coins needed to make a target amount. `dp[amount]` stores the minimum coins needed for that amount — an unbounded-knapsack variant (each coin can be used unlimited times).

```python
def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for coin in coins:
            if coin <= a:
                dp[a] = min(dp[a], dp[a - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1
# Time: O(amount * len(coins)) | Space: O(amount)
```

---

### 57. Backtracking nima va N-Queens / Subsets / Permutations masalalarida qanday qo'llaniladi? / What is Backtracking and how is it applied to N-Queens / Subsets / Permutations?
> **UZ:** Backtracking — yechim maydonini rekursiv qidirib, har bir qadamda joriy tanlovni "sinab ko'rish", agar u to'g'ri yechimga olib bormasligi aniq bo'lsa — orqaga qaytib (undo) boshqa variantni sinash usuli. N-Queens (shohlarni to'qnashmasdan joylashtirish), Subsets (barcha kichik to'plamlar) va Permutations (barcha o'rin almashtirishlar) kabi kombinatorial masalalarda keng qo'llaniladi.  
> **EN:** Backtracking explores the solution space recursively, trying a choice at each step and undoing ("backtracking") it if it can't lead to a valid solution. Widely used for combinatorial problems: N-Queens (placing queens without conflict), Subsets (all subsets), and Permutations (all orderings).

```python
def subsets(nums: list[int]) -> list[list[int]]:
    result = []

    def backtrack(start, path):
        result.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)   # Explore
            path.pop()               # Undo (backtrack)

    backtrack(0, [])
    return result
# Time: O(2ⁿ) | Space: O(n) recursion depth
```

---

### 58. Trie (Prefix Tree) nima va qanday amaliy holatlarda ishlatiladi? / What is a Trie (Prefix Tree) and what are its real-world use cases?
> **UZ:** Trie — string'larni prefiks bo'yicha samarali saqlash va qidirish uchun mo'ljallangan daraxt tuzilmasi. Har bir node bitta belgini bildiradi, ildizdan berilgan node gacha bo'lgan yo'l — prefiksni tashkil qiladi. Qidiruv/qo'shish murakkabligi O(L) (L — string uzunligi), umumiy string soniga bog'liq emas. Amaliy holatlar: autocomplete, spell checker, IP routing (longest prefix match), so'zlar lug'ati.  
> **EN:** A Trie is a tree structure for efficiently storing and searching strings by prefix. Each node represents a character; the path from root to a node forms a prefix. Search/insert complexity is O(L) (L = string length), independent of the total number of stored strings. Use cases: autocomplete, spell checkers, IP routing (longest prefix match), dictionary lookups.

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            node = node.children.setdefault(char, TrieNode())
        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word
# Insert/Search: O(L), L = word length
```

---

## ⚫ 4. Ekspert daraja / Expert Level (59–76)

---

### 59. Edit Distance (Levenshtein Distance) masalasi qanday yechiladi? / How is the Edit Distance (Levenshtein Distance) problem solved?
> **UZ:** Edit Distance — bitta stringni ikkinchisiga aylantirish uchun kerak bo'lgan minimal amallar (qo'shish, o'chirish, almashtirish) sonini topadi. 2D DP: `dp[i][j]` — birinchi stringning `i` va ikkinchisining `j` belgisigacha bo'lgan edit distance. Agar belgilar teng bo'lsa — diagonal qiymatdan foydalaniladi, aks holda uchta amaldan (insert, delete, replace) eng kichigi + 1 tanlanadi.  
> **EN:** Edit Distance finds the minimum operations (insert, delete, substitute) to transform one string into another. 2D DP: `dp[i][j]` is the edit distance considering the first `i` and `j` characters. If characters match, reuse the diagonal value; otherwise take the min of insert/delete/replace + 1.

```python
def edit_distance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # delete
                    dp[i][j - 1],      # insert
                    dp[i - 1][j - 1],  # replace
                )
    return dp[m][n]
# Time: O(m * n) | Space: O(m * n)
```

---

### 60. Matrix DP masalalari (Unique Paths, Minimum Path Sum) qanday yechiladi? / How are Matrix DP problems (Unique Paths, Minimum Path Sum) solved?
> **UZ:** Matrix DP masalalarida `dp[i][j]` katakka faqat yuqoridan yoki chapdan kelish mumkin bo'lgan holatlarda qo'llaniladi. **Unique Paths:** `dp[i][j] = dp[i-1][j] + dp[i][j-1]` — nechta yo'l bilan yetib borish mumkinligini hisoblaydi. **Minimum Path Sum:** `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])` — eng arzon yo'lni topadi.  
> **EN:** Matrix DP applies when a cell `dp[i][j]` can only be reached from above or from the left. **Unique Paths:** `dp[i][j] = dp[i-1][j] + dp[i][j-1]` counts the number of ways to reach a cell. **Minimum Path Sum:** `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])` finds the cheapest path.

```python
def min_path_sum(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    dp = [[0] * cols for _ in range(rows)]
    dp[0][0] = grid[0][0]
    for j in range(1, cols):
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    for i in range(1, rows):
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    for i in range(1, rows):
        for j in range(1, cols):
            dp[i][j] = grid[i][j] + min(dp[i - 1][j], dp[i][j - 1])
    return dp[-1][-1]
# Time: O(rows * cols) | Space: O(rows * cols), reducible to O(cols)
```

---

### 61. Daraxtda DP (DP on Trees) qanday ishlaydi — masalan, "House Robber III" masalasi misolida? / How does DP on Trees work — for example, the "House Robber III" problem?
> **UZ:** Daraxt bo'yicha DP odatda **post-order DFS** orqali amalga oshiriladi: har bir node uchun ikkita holat qaytariladi — "shu node tanlangan holdagi maksimal natija" va "tanlanmagan holdagi maksimal natija". "House Robber III" masalasida qo'shni (ota-farzand) uylarni bir vaqtda o'g'irlab bo'lmaydi; har bir node `(rob_this, not_rob_this)` juftligini qaytaradi va ota node bu qiymatlardan foydalanib o'z natijasini hisoblaydi.  
> **EN:** DP on trees is typically done via **post-order DFS**: each node returns two states — "max result if this node is included" and "max result if excluded". In "House Robber III", adjacent (parent-child) houses can't both be robbed; each node returns a `(rob_this, not_rob_this)` pair, and the parent combines these to compute its own result.

```python
def rob_tree(root) -> int:
    def dfs(node):
        if not node:
            return (0, 0)   # (rob, not_rob)
        left_rob, left_not = dfs(node.left)
        right_rob, right_not = dfs(node.right)
        rob = node.val + left_not + right_not
        not_rob = max(left_rob, left_not) + max(right_rob, right_not)
        return (rob, not_rob)

    return max(dfs(root))
# Time: O(n) | Space: O(h)
```

---

### 62. Segment Tree va Fenwick Tree (Binary Indexed Tree) nima va nima uchun kerak? / What are a Segment Tree and a Fenwick Tree (Binary Indexed Tree), and why are they needed?
> **UZ:** Ikkalasi ham array'da **range query** (masalan, oraliq yig'indisi) va **point update** amallarini O(log n) da bajarish uchun ishlatiladi (naiv usulda query O(n) bo'lardi). **Segment Tree** — har bir node ma'lum oraliqni bildiradigan binary tree, moslashuvchan (range min/max/sum/gcd kabi turli operatsiyalar uchun ishlaydi). **Fenwick Tree (BIT)** — bitwise operatsiyalar (`i & -i`) yordamida ishlaydigan yengilroq, kamroq xotira sarflaydigan tuzilma, lekin faqat prefix-sum kabi assotsiativ amallar uchun mos.  
> **EN:** Both support **range queries** (e.g., range sum) and **point updates** in O(log n) — naive approaches would need O(n) per query. A **Segment Tree** is a binary tree where each node covers a range, flexible enough for min/max/sum/gcd queries. A **Fenwick Tree (BIT)** uses bitwise tricks (`i & -i`) for a lighter, more memory-efficient structure, but only suits associative operations like prefix sums.

```python
class FenwickTree:
    def __init__(self, n):
        self.tree = [0] * (n + 1)

    def update(self, i, delta):
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & (-i)

    def prefix_sum(self, i):
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & (-i)
        return total
# Update / Query: O(log n)
```

---

### 63. Sliding Window Maximum masalasi Deque yordamida O(n) da qanday yechiladi? / How is the Sliding Window Maximum problem solved in O(n) using a Deque?
> **UZ:** Har bir oyna uchun maksimalni naiv qidirish O(n*k) bo'lardi. **Monotonic Deque** yondashuvida deque ichida faqat kamayish tartibida (monotonic decreasing) bo'lishi mumkin bo'lgan indekslarni saqlaymiz — yangi element kirganda undan kichik barcha elementlarni deque oxiridan chiqarib tashlaymiz (ular endi hech qachon maksimal bo'la olmaydi), natijada deque boshi doim joriy oynaning maksimalini bildiradi.  
> **EN:** Naively finding the max per window costs O(n*k). The **Monotonic Deque** approach keeps indices in decreasing value order — when a new element arrives, pop smaller elements from the back (they can never be the max again), so the front of the deque always holds the current window's max.

```python
from collections import deque

def max_sliding_window(nums: list[int], k: int) -> list[int]:
    dq = deque()   # stores indices, values decreasing
    result = []
    for i, num in enumerate(nums):
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()          # Out of window
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result
# Time: O(n) | Space: O(k)
```

---

### 64. "Merge Intervals" masalasi qanday yechiladi? / How is the "Merge Intervals" problem solved?
> **UZ:** Kesishuvchi (overlapping) intervallarni birlashtirish uchun avval intervallar boshlanish qiymati bo'yicha tartiblanadi (O(n log n)), so'ng chiziqli o'tib, joriy interval oldingi bilan kesishsa (`current.start <= previous.end`) — ularni birlashtiramiz, aks holda yangi interval sifatida qo'shamiz.  
> **EN:** To merge overlapping intervals, first sort by start value (O(n log n)), then iterate linearly: if the current interval overlaps the previous (`current.start <= previous.end`), merge them; otherwise, append as a new interval.

```python
def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        last_end = merged[-1][1]
        if start <= last_end:
            merged[-1][1] = max(last_end, end)
        else:
            merged.append([start, end])
    return merged
# Time: O(n log n) | Space: O(n)
```

---

### 65. "Top K Frequent Elements" masalasi qanday yechiladi (Heap vs Bucket Sort)? / How is the "Top K Frequent Elements" problem solved (Heap vs Bucket Sort)?
> **UZ:** Avval `Counter` bilan har bir elementning chastotasi hisoblanadi — O(n). **Heap yondashuvi:** hajmi K bo'lgan min-heap orqali O(n log k). **Bucket Sort yondashuvi:** chastota qiymati 1 dan n gacha bo'lishi mumkinligidan foydalanib, indeks — chastota bo'lgan "bucket" array yasab, O(n) da yechish mumkin (chastota comparison-based emas, shuning uchun O(n log n) chegarasidan chetlanadi).  
> **EN:** First compute frequencies with `Counter` — O(n). **Heap approach:** a size-K min-heap gives O(n log k). **Bucket Sort approach:** since frequency ranges from 1 to n, build buckets indexed by frequency, solving in O(n) total (bypassing the O(n log n) comparison-sort bound since it's not comparison-based).

```python
from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    counts = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in counts.items():
        buckets[freq].append(num)

    result = []
    for freq in range(len(buckets) - 1, 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result
    return result
# Time: O(n) | Space: O(n)
```

---

### 66. Grafda ikki bo'linuvchanligini (Bipartite check) va graf ranglashni (Graph Coloring) qanday tekshirish mumkin? / How do you check if a graph is Bipartite and understand Graph Coloring?
> **UZ:** Graf **bipartite** hisoblanadi, agar uning cho'qqilarini ikki guruhga shunday bo'lish mumkin bo'lsaki, har bir qirra faqat turli guruhdagi cho'qqilarni bog'lasa (2-rangda bo'yash mumkin bo'lsa). BFS/DFS bilan har bir node ga navbatma-navbat rang (0/1) berib, qo'shni node bir xil rangda bo'lsa — graf bipartite emas.  
> **EN:** A graph is **bipartite** if its vertices can be split into two groups such that every edge connects vertices from different groups (2-colorable). Using BFS/DFS, alternately color nodes (0/1); if a neighbor shares the same color, the graph is not bipartite.

```python
from collections import deque

def is_bipartite(graph: dict) -> bool:
    color = {}
    for start in graph:
        if start in color:
            continue
        color[start] = 0
        queue = deque([start])
        while queue:
            node = queue.popleft()
            for neighbor in graph[node]:
                if neighbor not in color:
                    color[neighbor] = 1 - color[node]
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    return False
    return True
# Time: O(V + E)
```

---

### 67. "Word Break" masalasi DP yordamida qanday yechiladi? / How is the "Word Break" problem solved using DP?
> **UZ:** Berilgan string lug'atdagi so'zlarga bo'linishi mumkinmi tekshiriladi. `dp[i]` — string'ning `i`-belgigacha bo'lgan qismi lug'at so'zlaridan tashkil topa oladimi (`True/False`). Har bir `i` uchun barcha `j < i` tekshiriladi: agar `dp[j]` True va `s[j:i]` lug'atda bo'lsa — `dp[i] = True`. Katta lug'atlar uchun **Trie** bilan prefiks tekshiruvini tezlashtirish mumkin.  
> **EN:** Determine whether a string can be segmented into dictionary words. `dp[i]` denotes whether the substring up to index `i` can be formed from dictionary words. For each `i`, check all `j < i`: if `dp[j]` is True and `s[j:i]` is in the dictionary, set `dp[i] = True`. For large dictionaries, a **Trie** can speed up prefix checks.

```python
def word_break(s: str, word_dict: list[str]) -> bool:
    words = set(word_dict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in words:
                dp[i] = True
                break
    return dp[n]
# Time: O(n² ) | Space: O(n)
```

---

### 68. Amortized Analysis (Amortizatsiyalangan tahlil) nima va dynamic array `append` misolida qanday tushuntiriladi? / What is Amortized Analysis, explained via the dynamic array `append` example?
> **UZ:** Amortized Analysis — bitta operatsiyaning eng yomon holatini emas, balki ko'p ketma-ket operatsiyalarning **o'rtacha** narxini hisoblaydi. Dynamic array `append` da: aksariyat chaqiruvlar O(1) (bo'sh joy bor), lekin sig'im to'lganda bitta chaqiruv O(n) (butun massivni ko'chirish) bo'ladi. Sig'im har safar 2x ga oshirilgani uchun, N ta `append` ning umumiy narxi O(N) bo'ladi — demak, har bir operatsiyaning **amortizatsiyalangan** narxi O(1).  
> **EN:** Amortized Analysis computes the **average** cost over a sequence of operations rather than a single worst case. For dynamic array `append`: most calls are O(1) (space available), but occasionally one call costs O(n) (full array copy on resize). Since capacity doubles each time, the total cost of N appends is O(N) — so the **amortized** cost per operation is O(1).

---

### 69. NP-Completeness va P vs NP masalasi nima, intervyuda qanday qisqacha tushuntiriladi? / What is NP-Completeness and the P vs NP problem, explained briefly for interviews?
> **UZ:** **P** — polynomial vaqtda **yechiladigan** masalalar sinfi. **NP** — berilgan yechimni polynomial vaqtda **tekshirish** mumkin bo'lgan masalalar sinfi. **NP-Complete** — NP dagi eng qiyin masalalar (masalan, Traveling Salesman, Knapsack umumiy holati, SAT); ulardan birortasi uchun polynomial yechim topilsa, P = NP bo'lar edi (hozircha isbotlanmagan ochiq masala). Intervyuda: agar masala NP-Complete bo'lsa, aniq (exact) polynomial yechim izlash o'rniga **approximation algorithm**, **heuristic**, yoki cheklangan kirish hajmi uchun **exponential/backtracking** yechim taklif qilish kerak.  
> **EN:** **P** is the class of problems **solvable** in polynomial time. **NP** is the class where a given solution can be **verified** in polynomial time. **NP-Complete** problems are the hardest in NP (e.g., Traveling Salesman, general Knapsack, SAT); finding a polynomial solution for any one would prove P = NP (still an open problem). Interview takeaway: if a problem is NP-Complete, propose an **approximation algorithm**, a **heuristic**, or an **exponential/backtracking** solution bounded to small inputs, rather than searching for an exact polynomial solution.

---

### 70. Divide and Conquer va Master Theorem nima? / What is Divide and Conquer and the Master Theorem?
> **UZ:** Divide and Conquer — masalani kichikroq bir xil turdagi kichik masalalarga bo'lib (Divide), har birini mustaqil yechib (Conquer), natijalarni birlashtirish (Combine) orqali yechish strategiyasi (Merge Sort, Quick Sort, Binary Search shular jumlasidan). **Master Theorem** — `T(n) = a*T(n/b) + f(n)` ko'rinishidagi rekurrent tenglamalarning murakkabligini tezda aniqlash formulasi: `a` — subproblem soni, `n/b` — har birining hajmi, `f(n)` — bo'lish/birlashtirish narxi.  
> **EN:** Divide and Conquer solves a problem by splitting it into smaller subproblems of the same type (Divide), solving each independently (Conquer), and combining results (Combine) — e.g., Merge Sort, Quick Sort, Binary Search. The **Master Theorem** quickly determines complexity for recurrences of the form `T(n) = a*T(n/b) + f(n)`: `a` = number of subproblems, `n/b` = size of each, `f(n)` = cost of dividing/combining.

| Recurrence Case | Condition | Result |
|---|---|---|
| Case 1 | f(n) = O(n^(log_b(a) - ε)) | T(n) = Θ(n^log_b(a)) |
| Case 2 | f(n) = Θ(n^log_b(a)) | T(n) = Θ(n^log_b(a) · log n) |
| Case 3 | f(n) = Ω(n^(log_b(a) + ε)) | T(n) = Θ(f(n)) |

---

### 71. Bit Manipulation (Bitlar bilan ishlash) — XOR trik va "Single Number" masalasi qanday yechiladi? / How does Bit Manipulation — the XOR trick — solve the "Single Number" problem?
> **UZ:** Array'da barcha elementlar ikki marta takrorlangan, faqat bittasi bir marta uchraydi — uni O(n) vaqt, O(1) xotirada topish kerak. Yechim: `XOR` operatsiyasining ikkita xususiyatidan foydalaniladi — `x ^ x = 0` va `x ^ 0 = x`. Barcha elementlarni XOR qilsak, juft takrorlanganlar bir-birini "bekor qiladi" va faqat yagona element qoladi.  
> **EN:** All elements in an array appear twice except one, which appears once — find it in O(n) time, O(1) space. Solution: exploit two XOR properties — `x ^ x = 0` and `x ^ 0 = x`. XOR-ing all elements cancels out the duplicated pairs, leaving only the unique element.

```python
def single_number(nums: list[int]) -> int:
    result = 0
    for num in nums:
        result ^= num
    return result
# Time: O(n) | Space: O(1)
```

---

### 72. LRU (Least Recently Used) Cache qanday loyihalanadi va amalga oshiriladi? / How do you design and implement an LRU (Least Recently Used) Cache?
> **UZ:** LRU Cache — sig'imi cheklangan, eng kam ishlatilgan elementni avtomatik chiqarib tashlaydigan kesh. O(1) `get`/`put` uchun ikki tuzilma birlashtiriladi: **Hash Map** (kalit → node, O(1) lookup) + **Doubly Linked List** (ishlatilish tartibini saqlash, node ni O(1) da olib tashlash/qo'shish). Python'da `collections.OrderedDict` orqali ham soddalashtirib amalga oshirish mumkin.  
> **EN:** An LRU Cache has bounded capacity and automatically evicts the least recently used item. For O(1) `get`/`put`, combine a **Hash Map** (key → node, O(1) lookup) with a **Doubly Linked List** (tracks usage order, O(1) node removal/insertion). In Python, `collections.OrderedDict` offers a simplified implementation.

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)   # Mark as recently used
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)   # Evict least recently used
# get/put: O(1)
```

---

### 73. Reservoir Sampling nima va tasodifiy tanlash algoritmlarida qanday ishlatiladi? / What is Reservoir Sampling and how is it used in randomized selection algorithms?
> **UZ:** Reservoir Sampling — o'lchami noma'lum yoki juda katta (masalan, streaming ma'lumot) ro'yxatdan bitta yoki bir nechta elementni **teng ehtimollik** bilan, bitta o'tishda (single pass), O(k) xotirada tanlab olish algoritmi. G'oyasi: dastlabki k ta elementni "reservoir" ga joylashtirib, keyingi har bir `i`-elementni `k/i` ehtimollik bilan reservoir dagi tasodifiy elementga almashtiramiz.  
> **EN:** Reservoir Sampling selects one or more elements **with uniform probability** from a stream/list of unknown or very large size, in a single pass, using O(k) memory. Idea: seed the reservoir with the first k elements, then for each subsequent `i`-th element, replace a random reservoir slot with probability `k/i`.

```python
import random

def reservoir_sample(stream, k: int) -> list:
    reservoir = []
    for i, item in enumerate(stream):
        if i < k:
            reservoir.append(item)
        else:
            j = random.randint(0, i)
            if j < k:
                reservoir[j] = item
    return reservoir
# Time: O(n) | Space: O(k)
```

---

### 74. KMP (Knuth-Morris-Pratt) String Matching algoritmi qanday ishlaydi va naiv usuldan nima bilan farq qiladi? / How does the KMP (Knuth-Morris-Pratt) String Matching algorithm work, and how does it differ from the naive approach?
> **UZ:** Naiv substring qidirish har bir pozitsiyada boshidan solishtirib chiqadi — worst case O(n*m). **KMP** oldindan pattern uchun **LPS (Longest Prefix which is also Suffix)** massivini O(m) da tuzib oladi, so'ng qidiruv paytida mos kelmagan joyda butunlay boshidan emas, balki LPS orqali qancha "orqaga qaytmasdan" davom etish mumkinligini biladi — natijada umumiy murakkablik O(n + m).  
> **EN:** Naive substring search restarts comparison from scratch at each position — O(n*m) worst case. **KMP** precomputes an **LPS (Longest Prefix which is also Suffix)** array for the pattern in O(m), then during the search, on a mismatch it uses the LPS array to skip redundant comparisons without fully restarting — total complexity O(n + m).

```python
def kmp_search(text: str, pattern: str) -> int:
    def build_lps(pattern):
        lps = [0] * len(pattern)
        length, i = 0, 1
        while i < len(pattern):
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
                i += 1
            elif length:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
        return lps

    lps = build_lps(pattern)
    i = j = 0
    while i < len(text):
        if text[i] == pattern[j]:
            i += 1; j += 1
            if j == len(pattern):
                return i - j          # Match found
        elif j:
            j = lps[j - 1]
        else:
            i += 1
    return -1
# Time: O(n + m) | Space: O(m)
```

---

### 75. Consistent Hashing algoritmik nuqtai nazardan nima va u oddiy modulo hashingdan nima bilan farq qiladi? / What is Consistent Hashing from an algorithmic perspective, and how does it differ from plain modulo hashing?
> **UZ:** Oddiy `hash(key) % N` (N — server soni) N o'zgarganda (server qo'shilsa/o'chsa) deyarli barcha kalitlarning qayta joylashishiga (rehashing) olib keladi. **Consistent Hashing** kalitlar va serverlarni bitta doiraviy hash makonida (masalan 0–2³²) joylashtiradi; har bir kalit soat strelkasi bo'yicha eng yaqin serverga biriktiriladi. Server qo'shilsa/o'chsa, faqat o'sha serverga tegishli kichik qism kalitlar qayta joylashadi (~K/N ta), boshqa barcha kalitlar joyida qoladi. **Virtual node**lar orqali yuk yanada tekis taqsimlanadi.  
> **EN:** Plain `hash(key) % N` (N = server count) causes nearly all keys to be remapped whenever N changes (server added/removed). **Consistent Hashing** places both keys and servers on a circular hash space (e.g., 0–2³²); each key maps to the nearest server clockwise. Adding/removing a server only remaps the small subset of keys owned by that server (~K/N), leaving the rest untouched. **Virtual nodes** further smooth out load distribution.

```python
import bisect
import hashlib

class ConsistentHashRing:
    def __init__(self, nodes=None, virtual_replicas=100):
        self.virtual_replicas = virtual_replicas
        self.ring = {}
        self.sorted_keys = []
        for node in nodes or []:
            self.add_node(node)

    def _hash(self, key):
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def add_node(self, node):
        for i in range(self.virtual_replicas):
            h = self._hash(f"{node}#{i}")
            self.ring[h] = node
            bisect.insort(self.sorted_keys, h)

    def get_node(self, key):
        h = self._hash(key)
        idx = bisect.bisect(self.sorted_keys, h) % len(self.sorted_keys)
        return self.ring[self.sorted_keys[idx]]
# Add/Remove node: O(K/N) keys remapped, not O(K)
```

---

### 76. Coding intervyuga qanday yondashish kerak — UMPIRE metodikasi nima? / How should you approach a coding interview — what is the UMPIRE method?
> **UZ:** UMPIRE — tizimli tarzda coding masalasini yechish uchun ishlatiladigan mnemonik struktura:  
> - **U**nderstand: Masalani, kirish/chiqish formatini va edge case'larni to'liq tushunish (savol berish!).  
> - **M**atch: Masalani ma'lum pattern (Two Pointer, Sliding Window, DP, Graph va h.k.) bilan moslashtirish.  
> - **P**lan: Yechim algoritmini pseudo-code yoki og'zaki tarzda intervyuerga tushuntirish.  
> - **I**mplement: Toza, o'qilishi oson kod yozish.  
> - **R**eview: Kodni qayta ko'rib chiqish, edge case'larni qo'lda tekshirish.  
> - **E**valuate: Vaqt va xotira murakkabligini (Big-O) aniqlab, optimallashtirish imkoniyatlarini muhokama qilish.  
> **EN:** UMPIRE is a mnemonic framework for systematically solving coding problems:  
> - **U**nderstand: Fully grasp the problem, input/output format, and edge cases (ask clarifying questions!).  
> - **M**atch: Map the problem to a known pattern (Two Pointer, Sliding Window, DP, Graph, etc.).  
> - **P**lan: Explain the algorithm in pseudo-code or verbally to the interviewer before coding.  
> - **I**mplement: Write clean, readable code.  
> - **R**eview: Re-read the code, manually trace through edge cases.  
> - **E**valuate: State time/space complexity (Big-O) and discuss possible optimizations.

---

*Tayyorlagan | Prepared by: Alyorjon*  
*Manbalar | Sources: CLRS (Introduction to Algorithms), LeetCode, GeeksforGeeks, NeetCode, InterviewBit*
