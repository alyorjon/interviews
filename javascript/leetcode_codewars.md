# 🧩 LeetCode & Codewars Algorithm Masterclass — 100 Real Interview Problems
### Ikki tilli algoritmlar qo'llanmasi / Bilingual Algorithmic Guide (English 🇬🇧 & O'zbek 🇺🇿)

> **Mavzular / Topics:** Array, Hash Table, Two Pointers, Dynamic Programming, Binary Search, Sliding Window, Linked List, Tree, Graph, Heap/Priority Queue, Greedy, Backtracking, Bit Manipulation, Codewars 8kyu-1kyu.  
> **Murakkablik / Difficulty:** 🟢 Easy (1–35) | 🟡 Medium (36–75) | 🔴 Hard (76–100)

---

# 📚 ALGORITMLAR VA DATA STRUCTURES MASTERCLASS

---

## Big-O Vaqt va Xotira Murakkabligi (Time & Space Complexity)
- **O(1) Constant**: O'zgarmas vaqt (Hash Map lookup, Bitwise operations).
- **O(log N) Logarithmic**: Binary Search.
- **O(N) Linear**: Two Pointers, Single Pass Iteration.
- **O(N log N) Linearithmic**: Merge Sort, Quick Sort.
- **O(N^2) Quadratic**: Nested loops, Matrix operations.
- **O(2^N) Exponential**: Recursive subsets, Naive Backtracking.

---

# 🟢 QUESTIONS & SOLUTIONS (Q1 – Q100)

---


## Q1. LeetCode #1: Two Sum | Two Sum — Ikki son yig'indisi

**EN:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target. Optimal solution uses Hash Map in O(n) time.

**UZB:** Berilgan `nums` massivi va `target` soni uchun yig'indisi target ga teng bo'lgan 2 ta sonning indekslarini toping. Optimal yechim Hash Map yordamida O(n) vaqtda ishlaydi.

```javascript
// Time: O(n) | Space: O(n)
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) return [map.get(diff), i];
        map.set(nums[i], i);
    }
    return [];
}
```

---

## Q2. LeetCode #2: Add Two Numbers | Add Two Numbers — Linked List qo'shish

**EN:** You are given two non-empty linked lists representing two non-negative integers stored in reverse order. Add the two numbers and return the sum as a linked list.

**UZB:** Teskari tartibda saqlangan ikkita Linked List sonlarini qo'shib, yangi Linked List ko'rinishida qaytarish.

```javascript
// Time: O(max(N, M)) | Space: O(max(N, M))
function addTwoNumbers(l1, l2) {
    let dummy = new ListNode(0), curr = dummy, carry = 0;
    while (l1 || l2 || carry) {
        let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    return dummy.next;
}
```

---

## Q3. LeetCode #3: Longest Substring Without Repeating Characters | Takrorlanmas belgilardan iborat eng uzun ostki matn

**EN:** Given a string `s`, find the length of the longest substring without repeating characters using Sliding Window approach.

**UZB:** Matn ichidan takrorlanuvchi belgilari bo'lmagan eng uzun sub-string (ostki matn) uzunligini Sliding Window yordamida topish.

```javascript
// Time: O(n) | Space: O(min(m, n))
function lengthOfLongestSubstring(s) {
    let map = new Map(), left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        if (map.has(s[right])) {
            left = Math.max(left, map.get(s[right]) + 1);
        }
        map.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
```

---

## Q4. LeetCode #11: Container With Most Water | Eng ko'p suv sig'diruvchi konteyner

**EN:** Given `n` non-negative integers `height`, find two lines that together with the x-axis form a container containing the most water using Two Pointers.

**UZB:** Massivdagi ustunlar orasida eng ko'p suv sig'diruvchi maydon hajmini Two Pointers (ikki ko'rsatkich) bilan topish.

```javascript
// Time: O(n) | Space: O(1)
function maxArea(height) {
    let left = 0, right = height.length - 1, maxW = 0;
    while (left < right) {
        let w = right - left;
        let h = Math.min(height[left], height[right]);
        maxW = Math.max(maxW, w * h);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxW;
}
```

---

## Q5. LeetCode #15: 3Sum | 3Sum — Uchta son yig'indisi nolga teng bo'lishi

**EN:** Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j != k` and `nums[i] + nums[j] + nums[k] == 0`.

**UZB:** Massiv ichidan yig'indisi 0 bo'lgan barcha unikal uchliklarni Sorting + Two Pointers bilan topish.

```javascript
// Time: O(n^2) | Space: O(1) or O(n) sorting
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let l = i + 1, r = nums.length - 1;
        while (l < r) {
            let sum = nums[i] + nums[l] + nums[r];
            if (sum === 0) {
                res.push([nums[i], nums[l], nums[r]]);
                while (l < r && nums[l] === nums[l + 1]) l++;
                while (l < r && nums[r] === nums[r - 1]) r--;
                l++; r--;
            } else if (sum < 0) l++; else r--;
        }
    }
    return res;
}
```

---

## Q6. LeetCode #20: Valid Parentheses | Qavslar to'g me riligini tekshirish (Valid Parentheses)

**EN:** Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid using Stack.

**UZB:** Ochilgan qavslarning to'g'ri tartibda yopilganini Stack ma'lumotlar strukturasi yordamida tekshirish.

```javascript
// Time: O(n) | Space: O(n)
function isValid(s) {
    const stack = [], map = { ')': '(', '}': '{', ']': '[' };
    for (let char of s) {
        if (map[char]) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}
```

---

## Q7. LeetCode #21: Merge Two Sorted Lists | Ikkita tartiblangan Linked Listni birlashtirish

**EN:** Merge two sorted linked lists and return it as a new sorted list.

**UZB:** Ikkita tartiblangan Linked List elementlarini yangi bitta tartiblangan listga ulaymiz.

```javascript
// Time: O(n + m) | Space: O(1)
function mergeTwoLists(l1, l2) {
    let dummy = new ListNode(0), curr = dummy;
    while (l1 && l2) {
        if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }
        else { curr.next = l2; l2 = l2.next; }
        curr = curr.next;
    }
    curr.next = l1 || l2;
    return dummy.next;
}
```

---

## Q8. LeetCode #33: Search in Rotated Sorted Array | Aylantirilgan tartiblangan massivda qidiruv

**EN:** Given the array `nums` after possible rotation and a `target`, return index of target in O(log n) time using Binary Search.

**UZB:** Aylantirilgan (rotated) tartibli massiv ichidan target qiymatni Binary Search yordamida O(log n) vaqtda topish.

```javascript
// Time: O(log n) | Space: O(1)
function search(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if (nums[mid] === target) return mid;
        if (nums[l] <= nums[mid]) {
            if (nums[l] <= target && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[r]) l = mid + 1;
            else r = mid - 1;
        }
    }
    return -1;
}
```

---

## Q9. LeetCode #42: Trapping Rain Water | Yomg'ir suvini ushlab qolish hajmi (Trapping Rain Water)

**EN:** Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining using Two Pointers.

**UZB:** Ustunlar orasida yig'ilib qoladigan umumiy yomg me ir suvi hajmini Two Pointers (ikki ko'rsatkich) usulida hisoblash.

```javascript
// Time: O(n) | Space: O(1)
function trap(height) {
    let l = 0, r = height.length - 1, lMax = 0, rMax = 0, res = 0;
    while (l < r) {
        if (height[l] < height[r]) {
            height[l] >= lMax ? (lMax = height[l]) : res += (lMax - height[l]);
            l++;
        } else {
            height[r] >= rMax ? (rMax = height[r]) : res += (rMax - height[r]);
            r--;
        }
    }
    return res;
}
```

---

## Q10. LeetCode #49: Group Anagrams | Anagrammalarni guruhlash (Group Anagrams)

**EN:** Given an array of strings `strs`, group the anagrams together using a Hash Map with sorted character keys or character count tuples.

**UZB:** Matnlar massividagi bir xil harflardan tashkil topgan anagrammalarni Hash Map orqali bir guruhga yig'ish.

```javascript
// Time: O(N * K log K) | Space: O(N * K)
function groupAnagrams(strs) {
    const map = {};
    for (let str of strs) {
        let key = str.split('').sort().join('');
        if (!map[key]) map[key] = [];
        map[key].push(str);
    }
    return Object.values(map);
}
```

---

## Q11. LeetCode #53: Maximum Subarray (Kadane's Algorithm) | Kadane algoritmi — Eng katta yig'indili ostki massiv

**EN:** Given an integer array `nums`, find the subarray with the largest sum, and return its sum using Kadane's Algorithm.

**UZB:** Massiv ichidagi ketma-ket keluvchi eng katta yig'indiga ega ostki massiv yig'indisini Kadane algoritmi O(n) bilan topish.

```javascript
// Time: O(n) | Space: O(1)
function maxSubArray(nums) {
    let maxSoFar = nums[0], currMax = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currMax = Math.max(nums[i], currMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, currMax);
    }
    return maxSoFar;
}
```

---

## Q12. LeetCode #56: Merge Intervals | Kesishuvchi intervallarni birlashtirish (Merge Intervals)

**EN:** Given an array of `intervals`, merge all overlapping intervals, and return an array of the non-overlapping intervals after sorting.

**UZB:** Bir-biri bilan ustma-ust tushgan sanalar/sonlar intervallarini saralab, avtomatik birlashtirish.

```javascript
// Time: O(n log n) | Space: O(n)
function merge(intervals) {
    if (!intervals.length) return [];
    intervals.sort((a, b) => a[0] - b[0]);
    const res = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        let last = res[res.length - 1];
        let curr = intervals[i];
        if (curr[0] <= last[1]) last[1] = Math.max(last[1], curr[1]);
        else res.push(curr);
    }
    return res;
}
```

---

## Q13. LeetCode #70: Climbing Stairs | Zinadan ko'tarilish usullari soni (Climbing Stairs)

**EN:** You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**UZB:** N bosqichli zinadan 1 yoki 2 qadam bilan ko'tarilishning jami unikal usullari sonini DP (Fibonachchi) bilan hisoblash.

```javascript
// Time: O(n) | Space: O(1)
function climbStairs(n) {
    if (n <= 2) return n;
    let first = 1, second = 2;
    for (let i = 3; i <= n; i++) {
        let third = first + second;
        first = second;
        second = third;
    }
    return second;
}
```

---

## Q14. LeetCode #121: Best Time to Buy and Sell Stock | Aktsiyalarni sotib olish va sotishning eng maqbul vaqti

**EN:** Find maximum profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

**UZB:** Bitta aktsiyani eng arzon kunda sotib olib, eng qimmat kunda sotishdan olinadigan maksimal foydani O(n) da topish.

```javascript
// Time: O(n) | Space: O(1)
function maxProfit(prices) {
    let minPrice = Infinity, maxProf = 0;
    for (let p of prices) {
        if (p < minPrice) minPrice = p;
        else if (p - minPrice > maxProf) maxProf = p - minPrice;
    }
    return maxProf;
}
```

---

## Q15. LeetCode #141: Linked List Cycle (Floyd's Tortoise and Hare) | Linked List da sikl (halqa) borligini aniqlash

**EN:** Given `head`, the head of a linked list, determine if the linked list has a cycle using Floyd's Cycle Finding Algorithm (Slow & Fast Pointers).

**UZB:** Linked List ichida cheksiz halqa (cycle) borligini Fast & Slow pointer (Toshbaka va Quyon algoritmi) bilan O(1) xotirada topish.

```javascript
// Time: O(n) | Space: O(1)
function hasCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}
```

---

## Q16. LeetCode #146: LRU Cache (Least Recently Used Cache) | LRU Cache qurish (Doubly Linked List + Hash Map)

**EN:** Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) time complexity for get and put operations.

**UZB:** Eng kam ishlatilgan elementlarni keshdan o'chiruvchi LRU Cache strukturasini O(1) vaqt murakkabligida yaratish.

```javascript
// Time: O(1) for get and put
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map(); // Preserves insertion order in JS!
    }
    get(key) {
        if (!this.map.has(key)) return -1;
        const val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val); // Move to end (most recent)
        return val;
    }
    put(key, value) {
        if (this.map.has(key)) this.map.delete(key);
        this.map.set(key, value);
        if (this.map.size > this.capacity) {
            const oldestKey = this.map.keys().next().value;
            this.map.delete(oldestKey); // Remove least recently used
        }
    }
}
```

---

## Q17. LeetCode #200: Number of Islands | Orollar sonini hisoblash (BFS / DFS Flood Fill)

**EN:** Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands using DFS Flood Fill.

**UZB:** 2D matritsada '1' lar (quruqlik) va '0' lar (suv) berilgan. Tutashgan orollar sonini DFS Flood Fill algoritmi bilan hisoblash.

```javascript
// Time: O(M * N) | Space: O(M * N)
function numIslands(grid) {
    if (!grid.length) return 0;
    let count = 0;
    function dfs(r, c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] === '0') return;
        grid[r][c] = '0'; // Mark visited
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
    }
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === '1') { count++; dfs(r, c); }
        }
    }
    return count;
}
```

---

## Q18. LeetCode #206: Reverse Linked List | Linked List ni teskarisiga o'girish

**EN:** Given the `head` of a singly linked list, reverse the list, and return the reversed list iteratively in O(n) time and O(1) space.

**UZB:** Bir tomonlama Linked Listni O(1) qo'shimcha xotira bilan teskarisiga o'girish.

```javascript
// Time: O(n) | Space: O(1)
function reverseList(head) {
    let prev = null, curr = head;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
```

---

## Q19. LeetCode #207: Course Schedule (Topological Sort / Cycle Detection) | Kurslar jadvali va Topologik Saralash

**EN:** There are a total of `numCourses` courses to take. Determine if you can finish all courses given prerequisites using Kahn's Algorithm / Topological Sort.

**UZB:** Tobe bo'lgan darslar zanjirida cheksiz halqa (cycle) yo'qligini Topologik Saralash (Kahn algoritmi / Indegree) bilan tekshirish.

```javascript
// Time: O(V + E) | Space: O(V + E)
function canFinish(numCourses, prerequisites) {
    const inDegree = new Array(numCourses).fill(0);
    const adj = Array.from({ length: numCourses }, () => []);
    for (let [course, pre] of prerequisites) {
        adj[pre].push(course);
        inDegree[course]++;
    }
    const queue = [];
    for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) queue.push(i);
    let count = 0;
    while (queue.length) {
        let curr = queue.shift(); count++;
        for (let neighbor of adj[curr]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) queue.push(neighbor);
        }
    }
    return count === numCourses;
}
```

---

## Q20. LeetCode #238: Product of Array Except Self | O'zidan tashqari barcha elementlar ko'paytmasi

**EN:** Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all elements of `nums` except `nums[i]` in O(n) time without division.

**UZB:** Bo'lish operatoridan foydalanmasdan, har bir indeks uchun o'zidan tashqari barcha elementlar ko'paytmasini Prefix va Suffix ko'paytmalari bilan topish.

```javascript
// Time: O(n) | Space: O(1) output array
function productExceptSelf(nums) {
    const n = nums.length, res = new Array(n).fill(1);
    let prefix = 1, suffix = 1;
    for (let i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }
    return res;
}
```

---

## Q21. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q22. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q23. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q24. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q25. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q26. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q27. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q28. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q29. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q30. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q31. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q32. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q33. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q34. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q35. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q36. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q37. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q38. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q39. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q40. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q41. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q42. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q43. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q44. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q45. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q46. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q47. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q48. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q49. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q50. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q51. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q52. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q53. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q54. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q55. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q56. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q57. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q58. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q59. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q60. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q61. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q62. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q63. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q64. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q65. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q66. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q67. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q68. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q69. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q70. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q71. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q72. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q73. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q74. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q75. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q76. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q77. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q78. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q79. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q80. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q81. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q82. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q83. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q84. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q85. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q86. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q87. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q88. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q89. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q90. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q91. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q92. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q93. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q94. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q95. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q96. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q97. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q98. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q99. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```

---

## Q100. LeetCode #242: Valid Anagram | Valid Anagram — Anagramma tekshiruvi

**EN:** Check if string t is an anagram of s using character frequency array.

**UZB:** Ikki matn bir xil harflardan tashkil topganini chastota massivida tekshirish.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let c of s) count[c] = (count[c] || 0) + 1;
    for (let c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
}
```