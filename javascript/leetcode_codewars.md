# 🧩 Algoritmik masalalar (LeetCode) — oddiy tilda, 40 ta klassik masala

> **Kim uchun:** texnik intervyudagi "masala yeching" bosqichiga tayyorlanayotganlar.
> **Qanday ishlash kerak:** savolni o'qing va javobni ochmasdan **20–30 daqiqa o'zingiz** yechishga urining. Keyin "Oddiy qilib aytganda" qismidagi g'oyani o'qing va yana urinib ko'ring. Kodga eng oxirida qarang.
> **Kod:** har bir yechim test misollari bilan Node.js'da ishga tushirib tekshirilgan.

---

# Asosiy tushuncha: Big-O — algoritm qanchalik tez?

**Big-O** — ma'lumot kattalashganda algoritm qanchalik **sekinlashishini** ko'rsatadi. Aniq soniyalarni emas, **o'sish tezligini**.

| Belgi | Nomi | Hayotiy misol | 1 000 000 element uchun (taxminan) |
|---|---|---|---|
| O(1) | o'zgarmas | lug'atdan so'zni bet raqami bilan ochish | 1 qadam |
| O(log n) | logarifmik | lug'atni o'rtadan ochib, yarmini tashlab qidirish | ~20 qadam |
| O(n) | chiziqli | ro'yxatni boshidan oxirigacha ko'rib chiqish | 1 000 000 qadam |
| O(n log n) | — | yaxshi saralash (merge sort) | ~20 000 000 qadam |
| O(n²) | kvadratik | har bir odamni boshqa har bir odam bilan tanishtirish | 10¹² qadam — juda sekin |

**Xotira murakkabligi** ham xuddi shunday: algoritm qo'shimcha qancha joy talab qiladi.

# Tez-tez uchraydigan usullar (patterns)

- **Hash Map (lug'at)** — "bu qiymatni oldin ko'rganmanmi?" savoliga O(1) da javob.
- **Two Pointers (ikki ko'rsatkich)** — massivning ikki chetidan yoki ikki tezlikda yurish.
- **Sliding Window (siljuvchi oyna)** — ketma-ket bo'lakni kengaytirib-toraytirib yurish.
- **Binary Search** — tartiblangan ma'lumotda har qadamda yarmini tashlab yuborish.
- **BFS / DFS** — daraxt va grafni kenglik yoki chuqurlik bo'yicha aylanib chiqish.
- **Dynamic Programming (DP)** — kichik masalalar javobini eslab qolib, kattasini yig'ish.

---

# Masalalar

## Q1. Two Sum: yig'indisi target'ga teng ikki sonning indekslarini qanday topasiz? / LeetCode #1 — Two Sum

**Masala:** `nums` massivi va `target` son berilgan. Yig'indisi `target`ga teng bo'lgan **ikki** elementning indekslarini qaytaring. `nums = [2, 7, 11, 15], target = 9` → `[0, 1]`.

**Oddiy qilib aytganda:** bozorda 9 000 so'mlik sovg'a olmoqchisiz va aynan ikki narsa kerak. Har bir mahsulotni ko'rganda o'zingizdan so'raysiz: "menga **qolgan** summa uchun (9 000 − narx) mahsulot oldin uchraganmi?" Ko'rilgan mahsulotlarni daftarga (Map) yozib borasiz — shunda har birini qayta qidirish shart emas.

**Qadam-ba-qadam:**
1. Bo'sh `Map` yarating: son → indeks.
2. Har bir son uchun `kerakli = target − son` ni hisoblang.
3. `kerakli` Map'da bo'lsa — javob topildi.
4. Aks holda joriy sonni Map'ga yozing.

**Yechim:**

```js
function twoSum(nums, target) {
  const seen = new Map();                      // son → indeks
  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];
    if (seen.has(needed)) return [seen.get(needed), i];
    seen.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));  // [ 0, 1 ]
console.log(twoSum([3, 2, 4], 6));       // [ 1, 2 ]
console.log(twoSum([3, 3], 6));          // [ 0, 1 ]
```

**Murakkablik:** vaqt O(n) — bir marta o'tamiz; xotira O(n) — Map uchun. Ikki ichma-ich sikl bilan esa O(n²) bo'lardi.

**Intervyuda shunday ayting:** "Oddiy yechim — har juftni tekshirish, O(n²). Tezroq: bir o'tishda har bir son uchun uning 'juftini' Map'dan qidiraman, topilmasa sonni Map'ga qo'shaman. Vaqt O(n), xotira O(n)."

**Esda tuting:** Map'ga sonni **tekshiruvdan keyin** qo'shing — aks holda `[3]` va `target = 6` da bitta elementni o'zi bilan juftlab yuborasiz.

## Q2. Add Two Numbers: teskari saqlangan ikki sonni linked list sifatida qanday qo'shasiz? / LeetCode #2 — Add Two Numbers

**Masala:** ikki son raqamlari **teskari tartibda** linked list'da saqlangan: `342` → `2 → 4 → 3`. Ularni qo'shib, natijani ham shunday linked list sifatida qaytaring. `(2→4→3) + (5→6→4)` → `7→0→8` (342 + 465 = 807).

**Oddiy qilib aytganda:** maktabda ustun bilan qo'shganingizni eslang: o'ngdan chapga, har ustunda raqamlarni qo'shasiz, 10 dan oshsa "1 ni xotirada saqlaysiz" (carry). Raqamlar teskari saqlangani uchun linked list'ning boshi aynan eng o'ngdagi raqam — qo'shishni shundan boshlash qulay.

**Qadam-ba-qadam:**
1. Soxta bosh tugun (`dummy`) yarating — natijani unga ulab borasiz.
2. Ikkala ro'yxat va `carry` tugamaguncha: raqamlarni qo'shing (yo'q bo'lsa 0).
3. Yangi tugun: `sum % 10`; `carry = Math.floor(sum / 10)`.
4. `dummy.next` — natija.

**Yechim:**

```js
class ListNode { constructor(val, next = null) { this.val = val; this.next = next; } }
const fromArray = (arr) => arr.reduceRight((next, val) => new ListNode(val, next), null);
const toArray = (node) => { const out = []; for (; node; node = node.next) out.push(node.val); return out; };

function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let tail = dummy, carry = 0;
  while (l1 || l2 || carry) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    carry = Math.floor(sum / 10);
    tail.next = new ListNode(sum % 10);
    tail = tail.next;
    l1 = l1?.next; l2 = l2?.next;
  }
  return dummy.next;
}

console.log(toArray(addTwoNumbers(fromArray([2, 4, 3]), fromArray([5, 6, 4]))));   // [ 7, 0, 8 ]
console.log(toArray(addTwoNumbers(fromArray([9, 9, 9]), fromArray([1]))));         // [ 0, 0, 0, 1 ]
```

**Murakkablik:** vaqt O(max(n, m)); xotira O(max(n, m)) — natija uchun.

**Intervyuda shunday ayting:** "Ustun bilan qo'shish kabi: ikkala ro'yxatni parallel yuraman, raqamlarni carry bilan qo'shaman va yangi tugun yarataman. Dummy bosh tugun chekka holatlarni soddalashtiradi. Oxirida carry qolsa, yana bitta tugun qo'shaman."

**Esda tuting:** sikl shartida `carry`ni unutmang — `999 + 1` da oxirgi `1` yo'qolib qoladi.

## Q3. Takrorlanmaydigan belgilardan iborat eng uzun qism satr qanchalik uzun? / LeetCode #3 — Longest Substring Without Repeating Characters

**Masala:** satr berilgan. Hech bir belgi takrorlanmaydigan eng uzun **ketma-ket** qismning uzunligini toping. `"abcabcbb"` → `3` ("abc").

**Oddiy qilib aytganda:** satr ustida "oyna" (sliding window) yurgizasiz. Oynaning o'ng tomoni har qadamda bittaga kengayadi. Agar yangi belgi oynada allaqachon bo'lsa, chap tomonni shu belgining oldingi joyidan **keyinga** siljitasiz. Har qadamda oyna uzunligini eng kattasi bilan solishtirasiz.

**Qadam-ba-qadam:**
1. `lastSeen` Map: belgi → oxirgi ko'rilgan indeksi.
2. `left = 0`. Har bir `right` uchun: belgi oynada bo'lsa, `left = oldingi indeks + 1`.
3. `best = max(best, right − left + 1)`.

**Yechim:**

```js
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (lastSeen.has(char) && lastSeen.get(char) >= left) left = lastSeen.get(char) + 1;
    lastSeen.set(char, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3
console.log(lengthOfLongestSubstring("abba"));     // 2
```

**Murakkablik:** vaqt O(n) — har belgi bir marta; xotira O(k) — alifbo hajmi.

**Intervyuda shunday ayting:** "Sliding window: o'ng chegarani kengaytiraman, takror belgi uchrasa chap chegarani shu belgining oxirgi joyidan keyinga siljitaman. Map oxirgi indekslarni saqlaydi. Vaqt O(n)."

**Esda tuting:** `lastSeen.get(char) >= left` sharti muhim — busiz "abba"da chap chegara **orqaga** qaytib, noto'g'ri javob beradi.

## Q4. Container With Most Water: eng ko'p suv sig'adigan ikki ustunni qanday topasiz? / LeetCode #11 — Container With Most Water

**Masala:** `height[i]` — `i` pozitsiyadagi ustun balandligi. Ikki ustun va yer orasida hosil bo'ladigan "idish"ga eng ko'p qancha suv sig'adi? Suv hajmi = kenglik × **pastroq** ustun balandligi.

**Oddiy qilib aytganda:** eng keng idishdan — ikki chetdagi ustunlardan boshlaysiz. Keyin **pastroq** ustunni ichkariga siljitasiz. Nega? Suv darajasini aynan pastroq ustun cheklaydi; balandini siljitish kenglikni kamaytiradi, lekin balandlik baribir pastrog'idan oshmaydi — foyda yo'q.

**Qadam-ba-qadam:**
1. `left = 0`, `right = oxirgi`.
2. Hajmni hisoblang va eng kattasini saqlang.
3. Pastroq ustun tomondagi ko'rsatkichni ichkariga siljiting.

**Yechim:**

```js
function maxArea(height) {
  let left = 0, right = height.length - 1, best = 0;
  while (left < right) {
    const water = (right - left) * Math.min(height[left], height[right]);
    best = Math.max(best, water);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return best;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log(maxArea([1, 1]));                       // 1
```

**Murakkablik:** vaqt O(n); xotira O(1).

**Intervyuda shunday ayting:** "Ikki ko'rsatkichni chetlardan boshlayman va har qadamda pastroq ustunni siljitaman, chunki hajmni aynan u cheklaydi — balandini siljitish hech qachon natijani yaxshilamaydi. Shunday qilib barcha juftlarni ko'rmasdan O(n) da topaman."

**Esda tuting:** bu masalani Q14 dagi "Trapping Rain Water" bilan adashtirmang — u yerda barcha ustunlar orasidagi suv yig'iladi.

## Q5. 3Sum: yig'indisi 0 bo'lgan barcha noyob uchliklarni qanday topasiz? / LeetCode #15 — 3Sum

**Masala:** massivdan yig'indisi `0` bo'lgan barcha **takrorlanmaydigan** uchliklarni toping. `[-1, 0, 1, 2, -1, -4]` → `[[-1, -1, 2], [-1, 0, 1]]`.

**Oddiy qilib aytganda:** avval massivni **saralaysiz**. Keyin har bir sonni "birinchi" deb olib, qolgan qismda Two Pointers bilan ikkitasini qidirasiz: yig'indi kichik bo'lsa — chap ko'rsatkichni o'ngga (kattaroq son), katta bo'lsa — o'ng ko'rsatkichni chapga. Saralangani uchun bir xil sonlarni osongina o'tkazib yuborasiz — takror uchliklar chiqmaydi.

**Qadam-ba-qadam:**
1. Saralash.
2. Har `i` uchun (oldingisi bilan bir xil bo'lsa — o'tkazib yuborish): `left = i+1`, `right = oxirgi`.
3. Yig'indi 0 bo'lsa — saqlash va ikkala ko'rsatkichni bir xil qiymatlardan o'tkazib yuborish.

**Yechim:**

```js
function threeSum(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length - 2; i++) {
    if (sorted[i] > 0) break;                          // keyingilar ham musbat — yig'indi 0 bo'lmaydi
    if (i > 0 && sorted[i] === sorted[i - 1]) continue; // takror birinchi son
    let left = i + 1, right = sorted.length - 1;
    while (left < right) {
      const sum = sorted[i] + sorted[left] + sorted[right];
      if (sum < 0) left++;
      else if (sum > 0) right--;
      else {
        result.push([sorted[i], sorted[left], sorted[right]]);
        while (left < right && sorted[left] === sorted[left + 1]) left++;
        while (left < right && sorted[right] === sorted[right - 1]) right--;
        left++; right--;
      }
    }
  }
  return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [ [ -1, -1, 2 ], [ -1, 0, 1 ] ]
console.log(threeSum([0, 0, 0, 0]));          // [ [ 0, 0, 0 ] ]
```

**Murakkablik:** vaqt O(n²) — saralash O(n log n) + har element uchun O(n); xotira O(1) (natijadan tashqari).

**Intervyuda shunday ayting:** "Massivni saralab, har bir elementni fiksatsiya qilaman va qolgan qismda two pointers bilan juft qidiraman. Saralangani uchun takrorlarni qo'shni elementlarni o'tkazib yuborish bilan chiqarib tashlayman. Vaqt O(n²)."

**Esda tuting:** asl massivni o'zgartirmaslik uchun nusxasini saralang (`[...nums].sort`), va sonlar uchun har doim `(a, b) => a - b` bering.

## Q6. Qavslar to'g'ri joylashganini qanday tekshirasiz? / LeetCode #20 — Valid Parentheses

**Masala:** `()[]{}` belgilaridan iborat satr to'g'ri yopilganmi? `"([]{})"` → `true`, `"(]"` → `false`, `"([)]"` → `false`.

**Oddiy qilib aytganda:** likopchalar to'plami (**stack**)ni tasavvur qiling. Ochiluvchi qavs ko'rsangiz — ustiga qo'yasiz. Yopiluvchi qavs ko'rsangiz — eng ustidagi likopcha aynan uning jufti bo'lishi kerak; bo'lsa olib tashlaysiz, bo'lmasa — xato. Oxirida to'plam bo'sh bo'lishi kerak.

**Qadam-ba-qadam:**
1. Yopiluvchi → ochiluvchi xaritasi: `) → (`, `] → [`, `} → {`.
2. Ochiluvchini stack'ka qo'shing; yopiluvchida stack tepasini tekshiring.
3. Oxirida stack bo'shmi?

**Yechim:**

```js
function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const char of s) {
    if (char in pairs) {
      if (stack.pop() !== pairs[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}

console.log(isValid("([]{})"), isValid("(]"), isValid("([)]"), isValid("(("), isValid("")); // true false false false true
```

**Murakkablik:** vaqt O(n); xotira O(n).

**Intervyuda shunday ayting:** "Stack ishlataman: ochiluvchi qavslarni qo'shaman, yopiluvchida stack tepasi mos juft ekanini tekshiraman. Oxirida stack bo'sh bo'lishi shart. Vaqt va xotira O(n)."

**Esda tuting:** oxiridagi `stack.length === 0` tekshiruvini unutmang — `"(("` yopilmagan qavslar bilan tugaydi.

## Q7. Ikki tartiblangan linked list'ni qanday birlashtirasiz? / LeetCode #21 — Merge Two Sorted Lists

**Masala:** ikki **tartiblangan** linked list'ni bitta tartiblangan list'ga birlashtiring. `1→2→4` va `1→3→4` → `1→1→2→3→4→4`.

**Oddiy qilib aytganda:** ikki qator o'quvchi bo'yi bo'yicha saf tortgan. Yangi saf tuzish uchun har safar ikkala qatorning **boshidagilarni** solishtirasiz va pastrog'ini yangi safga o'tkazasiz. Bir qator tugasa, ikkinchisining qolganini to'liq ulab qo'yasiz.

**Yechim:**

```js
class ListNode { constructor(val, next = null) { this.val = val; this.next = next; } }
const fromArray = (arr) => arr.reduceRight((next, val) => new ListNode(val, next), null);
const toArray = (node) => { const out = []; for (; node; node = node.next) out.push(node.val); return out; };

function mergeTwoLists(a, b) {
  const dummy = new ListNode(0);
  let tail = dummy;
  while (a && b) {
    if (a.val <= b.val) { tail.next = a; a = a.next; }
    else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  tail.next = a ?? b;                 // qolgan qism to'liq ulanadi
  return dummy.next;
}

console.log(toArray(mergeTwoLists(fromArray([1, 2, 4]), fromArray([1, 3, 4])))); // [ 1, 1, 2, 3, 4, 4 ]
console.log(toArray(mergeTwoLists(null, fromArray([0]))));                      // [ 0 ]
```

**Murakkablik:** vaqt O(n + m); xotira O(1) — mavjud tugunlar qayta ulanadi.

**Intervyuda shunday ayting:** "Dummy tugun bilan boshlab, har qadamda ikki ro'yxat boshidagi kichigini natijaga ulayman. Biri tugagach, ikkinchisining qolganini to'liq ulayman. Yangi tugun yaratilmaydi, xotira O(1)."

**Esda tuting:** `<=` belgisi teng elementlarda birinchi ro'yxatni oldinga qo'yadi — bu barqaror (stable) birlashtirish.

## Q8. Aylantirilgan tartiblangan massivda qanday qidirasiz? / LeetCode #33 — Search in Rotated Sorted Array

**Masala:** tartiblangan massiv qaysidir nuqtada "aylantirilgan": `[4, 5, 6, 7, 0, 1, 2]`. `target` ning indeksini O(log n) da toping (yo'q bo'lsa `-1`).

**Oddiy qilib aytganda:** oddiy binary search kabi o'rtani olasiz. Aylantirilgan bo'lsa ham, o'rtadan ikkiga bo'lsangiz, **ikki yarmidan bittasi albatta to'g'ri tartiblangan** bo'ladi. Qaysi yarim tartiblanganini aniqlab, `target` shu yarim chegarasida bo'lsa — o'sha tomonga, aks holda boshqa tomonga o'tasiz.

**Qadam-ba-qadam:**
1. `mid` ni hisoblang; `nums[mid] === target` bo'lsa — topildi.
2. `nums[left] <= nums[mid]` — chap yarim tartiblangan: target `[left, mid)` oralig'ida bo'lsa chapga, aks holda o'ngga.
3. Aks holda o'ng yarim tartiblangan: target `(mid, right]` oralig'ida bo'lsa o'ngga, aks holda chapga.

**Yechim:**

```js
function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {                                    // chap yarim tartiblangan
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {                                                          // o'ng yarim tartiblangan
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // -1
console.log(search([1], 1));                   // 0
```

**Murakkablik:** vaqt O(log n); xotira O(1).

**Intervyuda shunday ayting:** "Binary search'ning o'zgargan varianti: har qadamda ikki yarmidan biri tartiblangan bo'ladi. Qaysi biri ekanini aniqlab, target uning chegarasida bo'lsa o'sha tomonga, aks holda boshqa tomonga o'taman. Vaqt O(log n)."

**Esda tuting:** `nums[left] <= nums[mid]` da `<=` muhim — ikki elementli massivda `left === mid` bo'ladi.

## Q9. Maximum Subarray: eng katta yig'indili ketma-ket qismni qanday topasiz? / LeetCode #53 — Maximum Subarray (Kadane)

**Masala:** massivdagi eng katta yig'indiga ega **ketma-ket** qismning yig'indisini toping. `[-2, 1, -3, 4, -1, 2, 1, -5, 4]` → `6` (`[4, -1, 2, 1]`).

**Oddiy qilib aytganda:** yo'lda tanga terib ketayapsiz, ba'zi joyda qarz (manfiy son) bor. Har qadamda o'zingizdan so'raysiz: "oldingi yig'ganlarimni davom ettiraymi yoki **shu yerdan yangidan** boshlaymi?" Agar oldingi yig'indi manfiy bo'lsa, u faqat zarar keltiradi — yangidan boshlaysiz. Bu **Kadane algoritmi**.

**Qadam-ba-qadam:**
1. `current` — shu elementda tugaydigan eng yaxshi yig'indi; `best` — umumiy eng yaxshi.
2. Har element uchun: `current = max(element, current + element)`.
3. `best = max(best, current)`.

**Yechim:**

```js
function maxSubArray(nums) {
  let current = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]); // davom ettirish yoki yangidan boshlash
    best = Math.max(best, current);
  }
  return best;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(maxSubArray([-3, -1, -2]));                   // -1 — hammasi manfiy bo'lsa ham
```

**Murakkablik:** vaqt O(n); xotira O(1).

**Intervyuda shunday ayting:** "Kadane algoritmi: har pozitsiyada shu yerda tugaydigan eng yaxshi yig'indini hisoblayman — oldingisini davom ettirish yoki yangidan boshlashning kattasi. Umumiy maksimumni alohida saqlayman. Bu dinamik dasturlashning eng oddiy ko'rinishi, O(n)."

**Esda tuting:** `best`ni `0` bilan emas, **birinchi element** bilan boshlang — aks holda hamma sonlar manfiy bo'lganda noto'g'ri `0` qaytadi.

## Q10. Kesishuvchi intervallarni qanday birlashtirasiz? / LeetCode #56 — Merge Intervals

**Masala:** `[boshi, oxiri]` intervallar ro'yxati. Kesishganlarini birlashtiring. `[[1,3],[2,6],[8,10],[15,18]]` → `[[1,6],[8,10],[15,18]]`.

**Oddiy qilib aytganda:** kalendardagi uchrashuvlarni tasavvur qiling. Avval ularni **boshlanish vaqti** bo'yicha tartiblaysiz. Keyin har bir uchrashuv oldingisi tugashidan oldin boshlansa, ularni bitta uzun uchrashuvga birlashtirasiz.

**Qadam-ba-qadam:**
1. Boshlanishi bo'yicha saralash.
2. Natijadagi oxirgi interval bilan joriysini solishtirish: `joriy.boshi <= oxirgi.oxiri` — birlashtirish (`oxiri = max`), aks holda yangi interval.

**Yechim:**

```js
function merge(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const result = [];
  for (const [start, end] of sorted) {
    const last = result.at(-1);
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else result.push([start, end]);
  }
  return result;
}

console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]])); // [ [ 1, 6 ], [ 8, 10 ], [ 15, 18 ] ]
console.log(merge([[1, 4], [4, 5]]));                    // [ [ 1, 5 ] ] — chegarada tegishi ham birlashadi
console.log(merge([[1, 10], [2, 3]]));                   // [ [ 1, 10 ] ] — ichma-ich
```

**Murakkablik:** vaqt O(n log n) — saralash; xotira O(n).

**Intervyuda shunday ayting:** "Intervallarni boshlanishi bo'yicha saralayman, keyin bir o'tishda har birini natijadagi oxirgisi bilan solishtiraman: kesishsa oxirini kengaytiraman, aks holda yangisini qo'shaman. Vaqt O(n log n)."

**Esda tuting:** `Math.max` muhim — `[1,10]` va `[2,3]` da ikkinchisi to'liq birinchining ichida.

## Q11. Zinaga necha xil usulda chiqish mumkin? / LeetCode #70 — Climbing Stairs

**Masala:** `n` pog'onali zina. Har safar 1 yoki 2 pog'ona chiqish mumkin. Tepaga necha xil usulda chiqasiz? `n = 3` → `3` (1+1+1, 1+2, 2+1).

**Oddiy qilib aytganda:** `n`-pog'onaga faqat ikki joydan kelish mumkin: `(n−1)`-pog'onadan (1 qadam) yoki `(n−2)`-pog'onadan (2 qadam). Demak, usullar soni = ikkalasining yig'indisi. Bu **Fibonachchi** ketma-ketligi. Har pog'ona uchun javobni qayta hisoblamaslik uchun faqat oxirgi ikkitasini eslab qolasiz — bu **dinamik dasturlash**.

**Yechim:**

```js
function climbStairs(n) {
  let oneBack = 1, twoBack = 1;            // 1-pog'ona va 0-pog'ona uchun
  for (let step = 2; step <= n; step++) {
    [twoBack, oneBack] = [oneBack, oneBack + twoBack];
  }
  return oneBack;
}

console.log(climbStairs(2), climbStairs(3), climbStairs(5), climbStairs(45)); // 2 3 8 1836311903
```

**Murakkablik:** vaqt O(n); xotira O(1). Oddiy rekursiya (`f(n-1) + f(n-2)`) esa O(2ⁿ) — `n = 45` da juda sekin.

**Intervyuda shunday ayting:** "`n`-pog'onaga yo'llar soni `f(n−1) + f(n−2)` — Fibonachchi. Naiv rekursiya bir xil qiymatlarni qayta-qayta hisoblaydi, O(2ⁿ). Pastdan yuqoriga faqat oxirgi ikki qiymatni saqlab, O(n) vaqt va O(1) xotira bilan hisoblayman."

**Esda tuting:** dinamik dasturlashni tanish: "katta javob kichik javoblardan yig'iladimi va ular takrorlanadimi?" — ha bo'lsa, eslab qoling.

## Q12. Aksiyani qachon olib, qachon sotish eng foydali? / LeetCode #121 — Best Time to Buy and Sell Stock

**Masala:** `prices[i]` — `i`-kundagi narx. Bir marta olib, **keyinroq** bir marta sotib, eng katta foyda qancha? `[7, 1, 5, 3, 6, 4]` → `5` (1 da olib, 6 da sotish).

**Oddiy qilib aytganda:** kunma-kun yurasiz va ikki narsani eslab qolasiz: "shu kungacha eng **arzon** narx qancha bo'ldi?" va "bugun sotsam, qancha foyda?" Eng katta foydani saqlab borasiz.

**Yechim:**

```js
function maxProfit(prices) {
  let cheapest = Infinity, best = 0;
  for (const price of prices) {
    cheapest = Math.min(cheapest, price);
    best = Math.max(best, price - cheapest);
  }
  return best;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log(maxProfit([7, 6, 4, 3, 1]));    // 0 — foyda yo'q, savdo qilmaymiz
```

**Murakkablik:** vaqt O(n); xotira O(1).

**Intervyuda shunday ayting:** "Bir o'tishda hozirgacha eng past narxni va bugun sotilganda foydani hisoblayman, maksimum foydani saqlayman. Har juftni tekshirish O(n²) bo'lardi; bu yechim O(n)."

**Esda tuting:** sotish olishdan **keyin** bo'lishi kerak — shuning uchun `cheapest`ni avval yangilab, keyin foydani hisoblash to'g'ri ishlaydi (bir kunda olib-sotish foyda 0 beradi).

## Q13. Linked list'da halqa borligini qanday aniqlaysiz? / LeetCode #141 — Linked List Cycle

**Masala:** linked list'da halqa (sikl) bormi — ya'ni biror tugun oldingi tugunga qaytib ulanganmi?

**Oddiy qilib aytganda:** yugurish yo'lagida toshbaqa va quyon yuguradi: quyon ikki barobar tez. Agar yo'l **aylana** bo'lsa, quyon ertami-kechmi toshbaqani **orqadan quvib yetadi**. Agar yo'l tugasa, halqa yo'q. Bu **Floyd algoritmi** (tortoise and hare).

**Yechim:**

```js
class ListNode { constructor(val, next = null) { this.val = val; this.next = next; } }

function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;            // 1 qadam
    fast = fast.next.next;       // 2 qadam
    if (slow === fast) return true;
  }
  return false;
}

const a = new ListNode(1), b = new ListNode(2), c = new ListNode(3);
a.next = b; b.next = c;
console.log(hasCycle(a));  // false
c.next = b;                // 3 → 2 halqa
console.log(hasCycle(a));  // true
```

**Murakkablik:** vaqt O(n); xotira O(1). `Set` bilan ko'rilgan tugunlarni saqlash ham ishlaydi, lekin xotira O(n).

**Intervyuda shunday ayting:** "Floyd algoritmi: sekin ko'rsatkich bir, tez ko'rsatkich ikki qadam yuradi. Halqa bo'lsa, ular albatta uchrashadi; tez ko'rsatkich `null`ga yetsa, halqa yo'q. Vaqt O(n), xotira O(1)."

**Esda tuting:** tugunlarni qiymat bo'yicha emas, **havola** (`===`) bo'yicha solishtiring — qiymatlar takrorlanishi mumkin.

## Q14. Ustunlar orasida qancha yomg'ir suvi yig'iladi? / LeetCode #42 — Trapping Rain Water

**Masala:** `height` — ustunlar balandligi (kengligi 1). Yomg'irdan keyin ular orasida jami qancha suv qoladi? `[0,1,0,2,1,0,1,3,2,1,2,1]` → `6`.

**Oddiy qilib aytganda:** har bir katak ustida suv sathi = **chapdagi eng baland** va **o'ngdagi eng baland** ustunlarning **pastrog'i**. Ikki ko'rsatkichni chetlardan yurgizasiz: qaysi tomonning maksimumi pastroq bo'lsa, o'sha tomondagi katakning suvi aniq hisoblanadi (chunki qarama-qarshi tomonda albatta balandroq devor bor).

**Yechim:**

```js
function trap(height) {
  let left = 0, right = height.length - 1, leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log(trap([4, 2, 0, 3, 2, 5]));                   // 9
```

**Murakkablik:** vaqt O(n); xotira O(1).

**Intervyuda shunday ayting:** "Har katakdagi suv — chap va o'ng maksimumlarning minimumi minus balandlik. Ikki ko'rsatkich bilan pastroq tomonni qayta ishlayman: shu tomonning maksimumi cheklovchi ekani aniq. Vaqt O(n), xotira O(1). Oddiyroq variant — chap va o'ng maksimumlarni oldindan massivlarda hisoblash, O(n) xotira."

**Esda tuting:** avval oddiy (ikki massivli) yechimni tushuntirib, keyin optimallashtirish — intervyuda yaxshi taassurot qoldiradi.

## Q15. Anagramlarni qanday guruhlaysiz? / LeetCode #49 — Group Anagrams

**Masala:** so'zlar ro'yxatini anagramlar (bir xil harflardan tuzilgan) bo'yicha guruhlang. `["eat","tea","tan","ate","nat","bat"]` → `[["eat","tea","ate"],["tan","nat"],["bat"]]`.

**Oddiy qilib aytganda:** har bir so'zning harflarini **alifbo tartibida** tersangiz, anagramlar bir xil "kalit"ga ega bo'ladi: `eat`, `tea`, `ate` → `aet`. Kalit bo'yicha Map'ga guruhlaysiz.

**Yechim:**

```js
function groupAnagrams(words) {
  const groups = new Map();
  for (const word of words) {
    const key = [...word].sort().join("");         // "tea" → "aet"
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]
```

**Murakkablik:** vaqt O(n · k log k) — `n` so'z, har biri `k` uzunlikda saralanadi; xotira O(n · k).

**Intervyuda shunday ayting:** "Har so'z uchun kanonik kalit — saralangan harflar — yarataman va Map'da guruhlayman. Tezroq variant: 26 harf uchun hisoblagich massivini kalit qilish, O(n · k)."

**Esda tuting:** ES2024 dan `Map.groupBy(words, (w) => [...w].sort().join(""))` bilan ham yozish mumkin.

## Q16. LRU Cache'ni O(1) da qanday qurasiz? / LeetCode #146 — LRU Cache

**Masala:** sig'imi cheklangan kesh yarating: `get(key)` va `put(key, value)` O(1) da ishlasin. Joy tugasa, **eng uzoq vaqt ishlatilmagan** (Least Recently Used) yozuv o'chirilsin.

**Oddiy qilib aytganda:** stol ustidagi kitoblar to'plami: qaysi kitobni olsangiz, uni **eng tepaga** qo'yasiz. Joy tugasa, eng pastdagisini (eng uzoq tegilmaganini) olib tashlaysiz. JavaScript'dagi `Map` elementlarni **qo'shilgan tartibda** saqlaydi — shuning uchun "tepaga qo'yish" = o'chirib qayta qo'shish, "eng pastdagi" = birinchi kalit.

**Yechim:**

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();                         // tartib: eskidan yangiga
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);                     // eng yangi qilib qo'yish
    return value;
  }
  put(key, value) {
    this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value); // eng eskisini o'chirish
  }
}

const cache = new LRUCache(2);
cache.put(1, "bir"); cache.put(2, "ikki");
cache.get(1);                  // 1 endi eng yangi
cache.put(3, "uch");           // 2 o'chiriladi
console.log(cache.get(2), cache.get(1), cache.get(3)); // -1 bir uch
```

**Murakkablik:** `get` va `put` O(1) (amortizatsiyalangan); xotira O(capacity).

**Intervyuda shunday ayting:** "Klassik yechim — hash map va ikki tomonlama bog'langan ro'yxat: map tugunni O(1) topadi, ro'yxat tartibni saqlaydi. JavaScript'da `Map` qo'shilish tartibini saqlagani uchun, kalitni o'chirib qayta qo'shish bilan 'eng yangi' qilaman va birinchi kalitni eng eski sifatida chiqaraman."

**Esda tuting:** intervyuer "Map'siz" desa, doubly linked list + obyekt bilan yozishga tayyor turing — bu masalaning asl maqsadi.

## Q17. Xaritadagi orollar sonini qanday sanaysiz? / LeetCode #200 — Number of Islands

**Masala:** `"1"` — quruqlik, `"0"` — suv bo'lgan jadval. Gorizontal yoki vertikal qo'shni quruqliklar bitta orol. Nechta orol bor?

**Oddiy qilib aytganda:** xaritani qatorma-qator ko'rib chiqasiz. Quruqlik topilsa — hisoblagichni oshirasiz va shu orolning **hamma quruqligini "bo'yab"** (suvga aylantirib) chiqasiz, shunda uni qayta sanamaysiz. Bo'yash — qo'shni kataklarga tarqaladigan qidiruv (DFS yoki BFS).

**Yechim:**

```js
function numIslands(grid) {
  const rows = grid.length, cols = grid[0].length;
  let islands = 0;
  const sink = (r, c) => {
    const stack = [[r, c]];                                    // rekursiyasiz DFS — stack chuqurligi xavfsiz
    while (stack.length) {
      const [y, x] = stack.pop();
      if (y < 0 || x < 0 || y >= rows || x >= cols || grid[y][x] !== "1") continue;
      grid[y][x] = "0";                                        // bo'yaldi
      stack.push([y + 1, x], [y - 1, x], [y, x + 1], [y, x - 1]);
    }
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") { islands++; sink(r, c); }
    }
  }
  return islands;
}

console.log(numIslands([
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
])); // 3
```

**Murakkablik:** vaqt O(rows × cols) — har katak bir marta; xotira O(rows × cols) — eng yomon holatda stack.

**Intervyuda shunday ayting:** "Har bir ko'rilmagan quruqlikda hisoblagichni oshirib, DFS yoki BFS bilan butun orolni belgilayman. Katta jadvallarda rekursiya stack'ni to'ldirmasligi uchun iterativ stack ishlataman. Vaqt O(m·n)."

**Esda tuting:** asl jadvalni o'zgartirish mumkinmi — so'rang. Mumkin bo'lmasa, alohida `visited` massivi ishlating.

## Q18. Linked list'ni qanday teskari aylantirasiz? / LeetCode #206 — Reverse Linked List

**Masala:** `1→2→3→4` → `4→3→2→1`.

**Oddiy qilib aytganda:** har bir tugunning "o'qini" teskari tomonga buramiz. Uchta qo'l kerak: `prev` (oldingi, dastlab `null`), `current` (joriy) va `next` (keyingisini yo'qotmaslik uchun vaqtincha eslab qolish).

**Yechim:**

```js
class ListNode { constructor(val, next = null) { this.val = val; this.next = next; } }
const fromArray = (arr) => arr.reduceRight((next, val) => new ListNode(val, next), null);
const toArray = (node) => { const out = []; for (; node; node = node.next) out.push(node.val); return out; };

function reverseList(head) {
  let prev = null, current = head;
  while (current) {
    const next = current.next;    // keyingisini eslab qolish
    current.next = prev;          // o'qni burish
    prev = current;
    current = next;
  }
  return prev;
}

console.log(toArray(reverseList(fromArray([1, 2, 3, 4])))); // [ 4, 3, 2, 1 ]
console.log(toArray(reverseList(null)));                    // []
```

**Murakkablik:** vaqt O(n); xotira O(1).

**Intervyuda shunday ayting:** "Uch ko'rsatkich bilan: keyingi tugunni saqlab, joriy tugunning `next`ini oldingisiga buraman va ikkalasini oldinga siljitaman. Vaqt O(n), xotira O(1). Rekursiv variant ham bor, lekin u O(n) stack ishlatadi."

**Esda tuting:** `next`ni saqlamasdan o'qni bursangiz, ro'yxatning qolgan qismi yo'qoladi.

## Q19. Barcha kurslarni tugatish mumkinmi (bog'liqliklarda halqa bormi)? / LeetCode #207 — Course Schedule

**Masala:** `numCourses` ta kurs va `[kurs, oldindanKerak]` juftlari. Barcha kurslarni tugatish mumkinmi? `[[1,0],[0,1]]` → `false` (bir-biriga bog'liq — halqa).

**Oddiy qilib aytganda:** kurslar — graf, bog'liqliklar — o'qlar. Hech narsaga bog'liq **bo'lmagan** kurslardan boshlaysiz (kirish darajasi 0). Ularni "o'tib", ularga bog'liq kurslarning qarzini bittaga kamaytirasiz. Qarzi 0 ga tushgan kurs navbatga qo'shiladi. Oxirida hamma kurs o'tilgan bo'lsa — mumkin; qolib ketganlari bo'lsa — halqa bor. Bu **Kahn algoritmi** (topologik saralash).

**Yechim:**

```js
function canFinish(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const next = Array.from({ length: numCourses }, () => []);
  for (const [course, required] of prerequisites) {
    next[required].push(course);
    inDegree[course]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) queue.push(i);
  let taken = 0;
  for (let head = 0; head < queue.length; head++) {       // shift() o'rniga indeks — O(1)
    taken++;
    for (const course of next[queue[head]]) {
      if (--inDegree[course] === 0) queue.push(course);
    }
  }
  return taken === numCourses;
}

console.log(canFinish(2, [[1, 0]]));         // true
console.log(canFinish(2, [[1, 0], [0, 1]])); // false — halqa
```

**Murakkablik:** vaqt O(V + E) — kurslar va bog'liqliklar soni; xotira O(V + E).

**Intervyuda shunday ayting:** "Bu yo'naltirilgan grafda halqa bor-yo'qligini tekshirish. Kahn algoritmi bilan kirish darajasi 0 bo'lgan tugunlardan boshlab topologik tartib quraman; barcha tugunlar tartibga kirmasa, halqa bor. Vaqt O(V + E)."

**Esda tuting:** JavaScript'da `array.shift()` O(n) — katta navbatda indeks ko'rsatkichi ishlating (yechimda shunday).

## Q20. O'zidan boshqa barcha elementlar ko'paytmasini bo'lishsiz qanday topasiz? / LeetCode #238 — Product of Array Except Self

**Masala:** har bir `i` uchun `nums[i]`dan boshqa barcha elementlar ko'paytmasini hisoblang, **bo'lishdan foydalanmasdan**, O(n) da. `[1, 2, 3, 4]` → `[24, 12, 8, 6]`.

**Oddiy qilib aytganda:** har bir element uchun javob = (undan **chapdagilar** ko'paytmasi) × (undan **o'ngdagilar** ko'paytmasi). Avval chapdan o'ngga yurib "chap ko'paytmalar"ni, keyin o'ngdan chapga yurib ularni "o'ng ko'paytmalar"ga ko'paytirasiz.

**Yechim:**

```js
function productExceptSelf(nums) {
  const result = new Array(nums.length).fill(1);
  let left = 1;
  for (let i = 0; i < nums.length; i++) { result[i] = left; left *= nums[i]; }   // chapdagilar
  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) { result[i] *= right; right *= nums[i]; } // × o'ngdagilar
  return result;
}

console.log(productExceptSelf([1, 2, 3, 4]));      // [ 24, 12, 8, 6 ]
console.log(productExceptSelf([2, 3, 4, 5]));      // [ 60, 40, 30, 24 ]
```

**Murakkablik:** vaqt O(n); qo'shimcha xotira O(1) (natija massividan tashqari).

**Intervyuda shunday ayting:** "Har element uchun javob — prefiks va suffiks ko'paytmalarining ko'paytmasi. Ikki o'tishda hisoblayman: birinchisida prefikslarni natijaga yozaman, ikkinchisida suffiks bilan ko'paytiraman. Bo'lish ishlatilmaydi, shuning uchun nol bilan muammo yo'q."

**Esda tuting:** "barchasini ko'paytirib, har biriga bo'lish" — nol bo'lsa ishlamaydi va masala shartini buzadi.

## Q21. Ikki so'z bir-birining anagrammi ekanini qanday tekshirasiz? / LeetCode #242 — Valid Anagram

**Masala:** `s` va `t` bir xil harflardan (bir xil miqdorda) tuzilganmi? `"anagram"`, `"nagaram"` → `true`; `"rat"`, `"car"` → `false`.

**Oddiy qilib aytganda:** birinchi so'zning har bir harfini sanab chiqasiz (a — 3 ta, n — 1 ta...), keyin ikkinchi so'z harflarini shu hisobdan **ayirasiz**. Hammasi aniq nolga tushsa — anagram.

**Yechim:**

```js
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const counts = new Map();
  for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);
  for (const char of t) {
    const left = (counts.get(char) ?? 0) - 1;
    if (left < 0) return false;                  // t da ortiqcha harf
    counts.set(char, left);
  }
  return true;
}

console.log(isAnagram("anagram", "nagaram"), isAnagram("rat", "car"), isAnagram("ab", "a")); // true false false
```

**Murakkablik:** vaqt O(n); xotira O(k) — turli harflar soni. Saralab solishtirish ham ishlaydi, lekin O(n log n).

**Intervyuda shunday ayting:** "Uzunliklar teng bo'lmasa — darhol false. Aks holda birinchi satr harflarini sanayman va ikkinchisinikini ayiraman; hisob manfiyga tushsa — false. Vaqt O(n)."

**Esda tuting:** Unicode (emoji, o'zbekcha `oʻ`) bilan `for...of` belgilarni to'g'ri ajratadi, `s[i]` esa emoji'ni ikki qismga bo'lishi mumkin.

## Q22. Massivda takrorlanuvchi element bormi? / LeetCode #217 — Contains Duplicate

**Masala:** massivda biror qiymat kamida ikki marta uchraydimi? `[1, 2, 3, 1]` → `true`.

**Oddiy qilib aytganda:** mehmonlar ro'yxati: har bir kelgan odamni ro'yxatga yozasiz. Kimdir kelsa-yu, u allaqachon ro'yxatda bo'lsa — takror topildi. JavaScript'da bunday ro'yxat — `Set` (tekshiruv O(1)).

**Yechim:**

```js
function containsDuplicate(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return true;               // erta to'xtash
    seen.add(n);
  }
  return false;
}

console.log(containsDuplicate([1, 2, 3, 1]), containsDuplicate([1, 2, 3, 4])); // true false
console.log(new Set([1, 2, 3, 1]).size !== 4);                                  // qisqa variant: true
```

**Murakkablik:** vaqt O(n); xotira O(n).

**Intervyuda shunday ayting:** "Set'da ko'rilgan qiymatlarni saqlab, takror uchrashi bilan true qaytaraman. Vaqt O(n), xotira O(n). Xotira cheklangan bo'lsa, saralab qo'shni elementlarni solishtirish mumkin — O(n log n) vaqt, O(1) qo'shimcha xotira."

**Esda tuting:** `new Set(nums).size !== nums.length` qisqa, lekin har doim butun massivni o'tadi — erta to'xtamaydi.

## Q23. Satr palindrommi (faqat harf va raqamlarni hisobga olib)? / LeetCode #125 — Valid Palindrome

**Masala:** harf va raqamlardan boshqa belgilarni e'tiborsiz qoldirib, katta-kichik harfni farqlamasdan, satr teskarisiga tengmi? `"A man, a plan, a canal: Panama"` → `true`.

**Oddiy qilib aytganda:** ikki barmog'ingizni satrning ikki chetiga qo'yasiz va o'rtaga qarab yurasiz. Tinish belgilari va probellarni o'tkazib yuborasiz, harflarni kichik harfga aylantirib solishtirasiz. Bitta farq — palindrom emas.

**Yechim:**

```js
function isPalindrome(s) {
  const isAlnum = (char) => /[a-z0-9]/i.test(char);
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (!isAlnum(s[left])) { left++; continue; }
    if (!isAlnum(s[right])) { right--; continue; }
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++; right--;
  }
  return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                     // false
console.log(isPalindrome(" "));                              // true
```

**Murakkablik:** vaqt O(n); xotira O(1).

**Intervyuda shunday ayting:** "Ikki ko'rsatkich bilan chetlardan o'rtaga yuraman, harf-raqam bo'lmagan belgilarni o'tkazib yuboraman va kichik harfda solishtiraman. Tozalangan satrni yaratib teskarisi bilan solishtirish ham mumkin, lekin u O(n) qo'shimcha xotira oladi."

**Esda tuting:** intervyuerdan "harf" nimani anglatishini so'rang — faqat lotinmi yoki Unicode ham (`/\p{L}|\p{N}/u`)?

## Q24. Tartiblangan massivda binary search qanday ishlaydi? / LeetCode #704 — Binary Search

**Masala:** tartiblangan massivda `target` indeksini O(log n) da toping.

**Oddiy qilib aytganda:** "1 dan 100 gacha son o'yladim" o'yini: siz 50 deysiz, men "kattaroq" deyman — endi 1–50 ni tashlab yuborasiz. Har savolda qidiruv maydoni **yarmiga** qisqaradi: 1 000 000 elementda ~20 qadam yetadi.

**Yechim:**

```js
function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9));  // 4
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 2));  // -1
```

**Murakkablik:** vaqt O(log n); xotira O(1).

**Intervyuda shunday ayting:** "Har qadamda o'rtadagi element bilan solishtirib, qidiruv oralig'ining yarmini tashlab yuboraman. Chegara shartlari muhim: `left <= right` va `mid ± 1`. Vaqt O(log n)."

**Esda tuting:** chegara xatolari (`<` o'rniga `<=`, `mid` o'rniga `mid + 1`) — binary search'dagi eng keng tarqalgan xato; kichik misollar bilan qo'lda tekshiring.

## Q25. Binar daraxtning chuqurligini qanday topasiz? / LeetCode #104 — Maximum Depth of Binary Tree

**Masala:** daraxt ildizidan eng uzoq bargigacha nechta tugun bor?

**Oddiy qilib aytganda:** oila shajarasida "nechta avlod bor?" deb so'rasangiz, har bir odam o'z bolalaridan so'raydi: "sizdan keyin nechta avlod?" — va eng kattasiga o'zini (+1) qo'shadi. Bu **rekursiya**: katta savol o'sha savolning kichik nusxalariga bo'linadi.

**Yechim:**

```js
const node = (val, left = null, right = null) => ({ val, left, right });

function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

//        3
//       / \
//      9  20
//         / \
//        15  7
const tree = node(3, node(9), node(20, node(15), node(7)));
console.log(maxDepth(tree), maxDepth(null)); // 3 0
```

**Murakkablik:** vaqt O(n); xotira O(h) — `h` daraxt balandligi (rekursiya stack'i).

**Intervyuda shunday ayting:** "Chuqurlik — 1 plyus chap va o'ng qism daraxtlar chuqurliklarining kattasi; bo'sh daraxt — 0. Rekursiv DFS O(n) vaqt va O(h) xotira. Juda chuqur daraxtda stack'ni to'ldirmaslik uchun BFS bilan qatlamlarni sanash mumkin."

**Esda tuting:** daraxt masalalarining ko'pchiligi shu shablonda: "bo'sh bo'lsa — asosiy holat; aks holda — chap va o'ng javoblardan yig'ish".

## Q26. Binar daraxtni qanday oynadagidek aylantirasiz? / LeetCode #226 — Invert Binary Tree

**Masala:** har bir tugunning chap va o'ng bolalarini almashtiring (oynadagi aks).

**Oddiy qilib aytganda:** har bir tugunda "chap qo'l" va "o'ng qo'l"ni almashtirasiz, keyin xuddi shu ishni bolalaridan ham so'raysiz.

**Yechim:**

```js
const node = (val, left = null, right = null) => ({ val, left, right });
const levels = (root) => { const out = []; const q = root ? [root] : []; while (q.length) { const n = q.shift(); out.push(n.val); if (n.left) q.push(n.left); if (n.right) q.push(n.right); } return out; };

function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}

const tree = node(4, node(2, node(1), node(3)), node(7, node(6), node(9)));
console.log(levels(invertTree(tree))); // [ 4, 7, 2, 9, 6, 3, 1 ]
```

**Murakkablik:** vaqt O(n); xotira O(h).

**Intervyuda shunday ayting:** "Har tugunda chap va o'ng qism daraxtlarni almashtiraman va rekursiv ravishda ularni ham aylantiraman. Har tugun bir marta ko'riladi — O(n)."

**Esda tuting:** almashtirishdan oldin rekursiv chaqiruv natijalarini oling — aks holda bitta tomonni ikki marta aylantirib yuborishingiz mumkin (yuqoridagi destructuring bu xavfni yo'qotadi).

## Q27. Eng ko'p uchraydigan k ta elementni qanday topasiz? / LeetCode #347 — Top K Frequent Elements

**Masala:** `[1,1,1,2,2,3]`, `k = 2` → `[1, 2]`. Saralashdan (O(n log n)) tezroq bo'lsa yaxshi.

**Oddiy qilib aytganda:** avval har bir sonni sanaysiz. Keyin "savatlar" qatorini tasavvur qiling: 1-savat — bir marta uchraganlar, 2-savat — ikki marta... Har sonni o'z savatiga solasiz va **eng oxirgi (katta) savatlardan** boshlab `k` ta element olasiz. Bu **bucket sort**.

**Yechim:**

```js
function topKFrequent(nums, k) {
  const counts = new Map();
  for (const n of nums) counts.set(n, (counts.get(n) ?? 0) + 1);
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of counts) buckets[count].push(num);
  const result = [];
  for (let count = buckets.length - 1; count > 0 && result.length < k; count--) {
    result.push(...buckets[count]);
  }
  return result.slice(0, k);
}

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [ 1, 2 ]
console.log(topKFrequent([4, 4, 5], 1));          // [ 4 ]
```

**Murakkablik:** vaqt O(n); xotira O(n).

**Intervyuda shunday ayting:** "Chastotalarni Map'da sanayman, keyin chastota bo'yicha bucket'larga taqsimlab, eng yuqoridan k tasini olaman — O(n). Alternativa — k o'lchamli min-heap, O(n log k), bu oqim (stream) ma'lumotlari uchun qulay."

**Esda tuting:** chastotalar teng bo'lganda qaysi birini qaytarish kerakligini so'rang — masala shartida odatda farqi yo'q.

## Q28. Eng uzun ketma-ket sonlar zanjirini O(n) da qanday topasiz? / LeetCode #128 — Longest Consecutive Sequence

**Masala:** tartiblanmagan massivda eng uzun ketma-ket sonlar (masalan, 1,2,3,4) uzunligi. `[100, 4, 200, 1, 3, 2]` → `4`.

**Oddiy qilib aytganda:** hamma sonlarni `Set`ga solasiz. Keyin faqat zanjirning **boshlanishi** bo'lgan sonlardan (ya'ni `son − 1` Set'da yo'q) sanashni boshlaysiz: `son + 1`, `son + 2`... bor ekan, davom etasiz. Har zanjir faqat bir marta sanaladi.

**Yechim:**

```js
function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const n of set) {
    if (set.has(n - 1)) continue;             // zanjir boshi emas
    let length = 1;
    while (set.has(n + length)) length++;
    best = Math.max(best, length);
  }
  return best;
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));           // 4
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));   // 9
```

**Murakkablik:** vaqt O(n) — har son ichki siklda ko'pi bilan bir marta; xotira O(n).

**Intervyuda shunday ayting:** "Saralash O(n log n) beradi. O(n) uchun sonlarni Set'ga solib, faqat zanjir boshlarida (oldingi son yo'q) ichki siklni boshlayman — shuning uchun har element jami bir marta ko'riladi."

**Esda tuting:** `set.has(n - 1)` tekshiruvisiz algoritm O(n²) ga aylanadi.

## Q29. Minimumni O(1) da beradigan stack'ni qanday qurasiz? / LeetCode #155 — Min Stack

**Masala:** `push`, `pop`, `top` va `getMin` — hammasi O(1).

**Oddiy qilib aytganda:** har bir likopchani to'plamga qo'yganda, uning ustiga kichik yorliq yopishtirasiz: "shu likopchagacha eng kichigi — X". Likopchani olsangiz, yorliq ham ketadi, pastdagi likopchaning yorlig'i esa to'g'ri minimumni ko'rsatadi.

**Yechim:**

```js
class MinStack {
  #items = [];                                        // [qiymat, shu joygacha minimum]
  push(value) {
    const min = this.#items.length ? Math.min(value, this.getMin()) : value;
    this.#items.push([value, min]);
  }
  pop() { this.#items.pop(); }
  top() { return this.#items.at(-1)[0]; }
  getMin() { return this.#items.at(-1)[1]; }
}

const stack = new MinStack();
stack.push(-2); stack.push(0); stack.push(-3);
console.log(stack.getMin()); // -3
stack.pop();
console.log(stack.top(), stack.getMin()); // 0 -2
```

**Murakkablik:** barcha amallar O(1); xotira O(n).

**Intervyuda shunday ayting:** "Har element bilan birga shu paytgacha bo'lgan minimumni saqlayman. `pop` qilganda minimum avtomatik oldingi holatga qaytadi. Barcha amallar O(1)."

**Esda tuting:** faqat bitta `min` o'zgaruvchisi yetarli emas — minimum `pop` qilinganda oldingi minimumni bilish kerak.

## Q30. Summani eng kam tangalar bilan qanday yig'asiz? / LeetCode #322 — Coin Change

**Masala:** tangalar qiymatlari `coins` va `amount`. Summani yig'ish uchun **eng kam** nechta tanga kerak (cheksiz miqdorda)? Mumkin bo'lmasa `-1`. `[1, 2, 5]`, `11` → `3` (5+5+1).

**Oddiy qilib aytganda:** "har doim eng katta tangani ol" (ochko'z usul) har doim ishlamaydi: `[1, 3, 4]` va `6` da ochko'z usul 4+1+1 (3 ta) beradi, to'g'risi 3+3 (2 ta). Shuning uchun 0 dan `amount`gacha **har bir summa** uchun eng yaxshi javobni hisoblab borasiz: `best[x] = 1 + min(best[x − tanga])`.

**Yechim:**

```js
function coinChange(coins, amount) {
  const best = new Array(amount + 1).fill(Infinity);
  best[0] = 0;
  for (let sum = 1; sum <= amount; sum++) {
    for (const coin of coins) {
      if (coin <= sum) best[sum] = Math.min(best[sum], best[sum - coin] + 1);
    }
  }
  return best[amount] === Infinity ? -1 : best[amount];
}

console.log(coinChange([1, 2, 5], 11)); // 3
console.log(coinChange([1, 3, 4], 6));  // 2 — ochko'z usul 3 berardi
console.log(coinChange([2], 3));        // -1
```

**Murakkablik:** vaqt O(amount × tangalar soni); xotira O(amount).

**Intervyuda shunday ayting:** "Ochko'z yondashuv har qanday tanga to'plamida optimal emas, shuning uchun dinamik dasturlash qo'llayman: har summa uchun minimal tangalar soni oldingi summalardan hisoblanadi. Vaqt O(amount · k)."

**Esda tuting:** "nechta **usul** bor" (Coin Change II) — boshqa masala: u yerda minimum emas, yig'indi hisoblanadi.

## Q31. Qo'shni uylarni o'g'irlamasdan eng ko'p pulni qanday olasiz? / LeetCode #198 — House Robber

**Masala:** `nums[i]` — `i`-uydagi pul. Ikki **qo'shni** uyni birga tanlab bo'lmaydi. Eng ko'p qancha pul olish mumkin? `[2, 7, 9, 3, 1]` → `12` (2 + 9 + 1).

**Oddiy qilib aytganda:** har bir uy oldida ikki tanlov: "bu uyni olaman" (unda oldingisini ololmayman: `ikki oldingi eng yaxshi + shu uy`) yoki "o'tkazib yuboraman" (`oldingi eng yaxshi`). Kattasini tanlaysiz. Faqat oxirgi ikki javobni eslab qolish yetarli.

**Yechim:**

```js
function rob(nums) {
  let prevBest = 0, currBest = 0;               // i-2 va i-1 gacha eng yaxshi
  for (const money of nums) {
    [prevBest, currBest] = [currBest, Math.max(currBest, prevBest + money)];
  }
  return currBest;
}

console.log(rob([1, 2, 3, 1]));    // 4
console.log(rob([2, 7, 9, 3, 1])); // 12
```

**Murakkablik:** vaqt O(n); xotira O(1).

**Intervyuda shunday ayting:** "Har uy uchun: olish — ikki oldingi optimum plyus shu uy; olmaslik — oldingi optimum. Kattasini tanlayman. Faqat oxirgi ikki qiymat kerak, shuning uchun xotira O(1)."

**Esda tuting:** bu Climbing Stairs (Q11) bilan bir xil shablon — "oxirgi ikki holatdan hisoblash".

## Q32. Massivdagi k-chi eng katta elementni qanday topasiz? / LeetCode #215 — Kth Largest Element in an Array

**Masala:** `[3, 2, 1, 5, 6, 4]`, `k = 2` → `5`.

**Oddiy qilib aytganda:** musobaqada faqat eng yaxshi `k` ta natija qiziq. Kichik "podium" (hajmi `k` bo'lgan **min-heap**) tutasiz: yangi natija podiumdagi eng yomonidan yaxshi bo'lsa, uni almashtiradi. Oxirida podiumdagi eng yomoni — `k`-chi eng katta.

**Yechim:**

```js
class MinHeap {
  #data = [];
  get size() { return this.#data.length; }
  peek() { return this.#data[0]; }
  push(value) {
    const d = this.#data; d.push(value);
    for (let i = d.length - 1, p; i > 0 && d[(p = (i - 1) >> 1)] > d[i]; i = p) [d[i], d[p]] = [d[p], d[i]];
  }
  pop() {
    const d = this.#data, top = d[0], last = d.pop();
    if (d.length) {
      d[0] = last;
      for (let i = 0; ;) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < d.length && d[l] < d[m]) m = l;
        if (r < d.length && d[r] < d[m]) m = r;
        if (m === i) break;
        [d[i], d[m]] = [d[m], d[i]]; i = m;
      }
    }
    return top;
  }
}

function findKthLargest(nums, k) {
  const heap = new MinHeap();
  for (const n of nums) {
    heap.push(n);
    if (heap.size > k) heap.pop();        // eng kichigini chiqarib tashlaymiz
  }
  return heap.peek();
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));          // 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4
```

**Murakkablik:** vaqt O(n log k); xotira O(k). Oddiy saralash — O(n log n). Quickselect — o'rtacha O(n).

**Intervyuda shunday ayting:** "k o'lchamli min-heap tutaman: har elementni qo'shib, hajm k dan oshsa eng kichigini chiqaraman. Oxirida heap tepasi — javob. Vaqt O(n log k). O'rtacha O(n) kerak bo'lsa — quickselect."

**Esda tuting:** JavaScript'da tayyor heap yo'q — intervyuda uni yozishga tayyor bo'ling yoki intervyuerdan tayyor struktura ishlatishga ruxsat so'rang.

## Q33. Binar daraxt to'g'ri binar qidiruv daraxtimi (BST)? / LeetCode #98 — Validate Binary Search Tree

**Masala:** BST'da har tugun uchun: chap qism daraxtdagi **barcha** qiymatlar kichikroq, o'ngdagilar kattaroq. Berilgan daraxt shunday ekanini tekshiring.

**Oddiy qilib aytganda:** faqat "bola ota'dan kichikmi" deb tekshirish yetarli emas — nevara bobodan ham kichik bo'lishi kerak. Shuning uchun har tugunga **ruxsat etilgan oraliq** (`min`, `max`) berib pastga tushasiz: chapga borganda yuqori chegara torayadi, o'ngga borganda — pastki chegara.

**Yechim:**

```js
const node = (val, left = null, right = null) => ({ val, left, right });

function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}

console.log(isValidBST(node(2, node(1), node(3))));                     // true
console.log(isValidBST(node(5, node(1), node(4, node(3), node(6)))));   // false
console.log(isValidBST(node(5, node(4), node(6, node(3), node(7)))));   // false — 3 < 5, lekin o'ng tomonda
```

**Murakkablik:** vaqt O(n); xotira O(h).

**Intervyuda shunday ayting:** "Har tugunga ruxsat etilgan qiymatlar oralig'ini uzataman: chapga o'tganda yuqori chegara ota qiymati, o'ngga o'tganda pastki chegara. Faqat bevosita bolalarni tekshirish yetarli emas. Alternativa — inorder aylanib, qiymatlar qat'iy o'sib borishini tekshirish."

**Esda tuting:** uchinchi test aynan "faqat bolalarni tekshirish" xatosini ushlaydi.

## Q34. Binar daraxtni qatlamma-qatlam qanday aylanib chiqasiz? / LeetCode #102 — Binary Tree Level Order Traversal

**Masala:** daraxt qiymatlarini qatlamlar bo'yicha qaytaring: `[[3], [9, 20], [15, 7]]`.

**Oddiy qilib aytganda:** bu **BFS** (kenglik bo'yicha qidiruv): navbatda turgan odamlarga o'xshaydi. Avval ildiz, keyin uning bolalari, keyin nevaralar... Har qatlam boshida navbatda nechta tugun borligini eslab, aynan shunchasini bitta qatlamga yig'asiz.

**Yechim:**

```js
const node = (val, left = null, right = null) => ({ val, left, right });

function levelOrder(root) {
  const result = [];
  let level = root ? [root] : [];
  while (level.length) {
    result.push(level.map((n) => n.val));
    level = level.flatMap((n) => [n.left, n.right].filter(Boolean)); // keyingi qatlam
  }
  return result;
}

console.log(levelOrder(node(3, node(9), node(20, node(15), node(7))))); // [ [ 3 ], [ 9, 20 ], [ 15, 7 ] ]
console.log(levelOrder(null));                                          // []
```

**Murakkablik:** vaqt O(n); xotira O(w) — eng keng qatlam.

**Intervyuda shunday ayting:** "BFS bilan qatlamlab aylanaman: joriy qatlam tugunlaridan keyingi qatlamni yig'aman. Bu eng qisqa yo'l, 'daraxtning o'ng ko'rinishi' kabi ko'p masalalarning asosi. Vaqt O(n)."

**Esda tuting:** navbatni `shift()` bilan boshqarish katta daraxtda sekin — qatlamlab massiv almashtirish yoki indeks ko'rsatkichi yaxshiroq.

## Q35. Massivning barcha qism to'plamlarini qanday yaratasiz? / LeetCode #78 — Subsets

**Masala:** takrorsiz sonlar massivining barcha qism to'plamlari. `[1, 2, 3]` → 8 ta: `[]`, `[1]`, `[2]`, `[1,2]`...

**Oddiy qilib aytganda:** har bir element uchun ikki tanlov bor: "olaman" yoki "olmayman". 3 element → 2 × 2 × 2 = 8 variant. Oddiy usul: bo'sh to'plamdan boshlab, har yangi elementni **mavjud barcha** to'plamlarga qo'shib, yangi to'plamlar hosil qilasiz.

**Yechim:**

```js
function subsets(nums) {
  let result = [[]];
  for (const n of nums) {
    result = [...result, ...result.map((subset) => [...subset, n])];
  }
  return result;
}

console.log(subsets([1, 2, 3])); // [ [], [ 1 ], [ 2 ], [ 1, 2 ], [ 3 ], [ 1, 3 ], [ 2, 3 ], [ 1, 2, 3 ] ]
console.log(subsets([1, 2, 3]).length); // 8
```

**Murakkablik:** vaqt va xotira O(n · 2ⁿ) — natijaning o'zi shuncha katta.

**Intervyuda shunday ayting:** "Har element uchun 'ol yoki olma' tanlovi — jami 2ⁿ qism to'plam. Iterativ ravishda mavjud to'plamlarning har biriga yangi elementni qo'shib ko'paytiraman. Backtracking yoki bit maskalari bilan ham yechish mumkin."

**Esda tuting:** natija hajmi eksponensial — `n = 30` da milliardga yaqin to'plam. Intervyuda buni aytib o'ting.

## Q36. Barcha o'rin almashtirishlarni (permutatsiyalarni) qanday yaratasiz? / LeetCode #46 — Permutations

**Masala:** `[1, 2, 3]` → 6 ta tartib: `[1,2,3]`, `[1,3,2]`, `[2,1,3]`...

**Oddiy qilib aytganda:** stullarga odamlarni o'tqazish: birinchi stulga istalgan odam, ikkinchisiga qolganlardan biri... Har qadamda tanlaysiz, oxirigacha borasiz, keyin **orqaga qaytib** (backtracking) boshqa tanlovni sinab ko'rasiz.

**Yechim:**

```js
function permute(nums) {
  const result = [];
  const path = [];
  const used = new Array(nums.length).fill(false);
  const build = () => {
    if (path.length === nums.length) { result.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(nums[i]);     // tanlash
      build();
      path.pop(); used[i] = false;            // orqaga qaytish
    }
  };
  build();
  return result;
}

console.log(permute([1, 2, 3]).map((p) => p.join("")).join(" ")); // 123 132 213 231 312 321
```

**Murakkablik:** vaqt O(n · n!); xotira O(n) — joriy yo'l (natijadan tashqari).

**Intervyuda shunday ayting:** "Backtracking: joriy yo'lga ishlatilmagan elementni qo'shaman, rekursiya qilaman, keyin uni olib tashlab boshqasini sinayman. Permutatsiyalar soni n!, shuning uchun vaqt O(n · n!)."

**Esda tuting:** natijaga `path`ning **nusxasini** (`[...path]`) qo'shing — aks holda hamma natija bitta, oxirida bo'shab qolgan massivga ishora qiladi.

## Q37. Satrni lug'at so'zlariga bo'lish mumkinmi? / LeetCode #139 — Word Break

**Masala:** `s = "applepenapple"`, `wordDict = ["apple", "pen"]` → `true` ("apple pen apple").

**Oddiy qilib aytganda:** satr boshidan qaysi pozitsiyalargacha "to'g'ri bo'lib bo'linganini" belgilab borasiz. `can[i] = true` — birinchi `i` ta harfni so'zlarga bo'lib bo'ladi. `can[j]` true bo'lsa va `s[j..i]` lug'atda bo'lsa, `can[i]` ham true.

**Yechim:**

```js
function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const can = new Array(s.length + 1).fill(false);
  can[0] = true;                                  // bo'sh boshlanish
  for (let end = 1; end <= s.length; end++) {
    for (let start = 0; start < end; start++) {
      if (can[start] && words.has(s.slice(start, end))) { can[end] = true; break; }
    }
  }
  return can[s.length];
}

console.log(wordBreak("applepenapple", ["apple", "pen"]));                    // true
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]));   // false
```

**Murakkablik:** vaqt O(n²) (satr bo'laklarini solishtirishsiz); xotira O(n).

**Intervyuda shunday ayting:** "Dinamik dasturlash: `can[i]` — prefiks bo'linadimi. Har `i` uchun oldingi true pozitsiyadan boshlanadigan so'z lug'atda borligini tekshiraman. Lug'atni Set'ga olaman. Naiv rekursiya eksponensial bo'lardi."

**Esda tuting:** tezlashtirish uchun ichki siklni lug'atdagi eng uzun so'z uzunligi bilan cheklash mumkin.

## Q38. Har kun uchun issiqroq kungacha necha kun kutish kerak? / LeetCode #739 — Daily Temperatures

**Masala:** `temps[i]` — `i`-kun harorati. Har kun uchun: nechta kundan keyin issiqroq kun keladi (bo'lmasa 0)? `[73,74,75,71,69,72,76,73]` → `[1,1,4,2,1,1,0,0]`.

**Oddiy qilib aytganda:** hali "issiqroq kunini topmagan" kunlarni **stack**da saqlaysiz. Yangi kun kelganda, stack tepasidagi har bir sovuqroq kun uchun javob topildi — ularni chiqarib, farqni yozasiz. Bu **monoton stack** usuli.

**Yechim:**

```js
function dailyTemperatures(temps) {
  const answer = new Array(temps.length).fill(0);
  const waiting = [];                                      // indekslar, haroratlari kamayib boradi
  temps.forEach((temp, day) => {
    while (waiting.length && temps[waiting.at(-1)] < temp) {
      const colderDay = waiting.pop();
      answer[colderDay] = day - colderDay;
    }
    waiting.push(day);
  });
  return answer;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // [ 1, 1, 4, 2, 1, 1, 0, 0 ]
```

**Murakkablik:** vaqt O(n) — har indeks stack'ka bir marta kiradi va chiqadi; xotira O(n).

**Intervyuda shunday ayting:** "Javobini kutayotgan kunlarni monoton kamayuvchi stack'da saqlayman. Issiqroq kun kelganda stack'dan sovuqroq kunlarni chiqarib, javoblarini yozaman. Har element bir marta qo'shiladi va chiqariladi — O(n)."

**Esda tuting:** monoton stack "keyingi kattaroq/kichikroq element" turidagi barcha masalalarning kaliti.

## Q39. Binar daraxt diametri (eng uzun yo'l) qanday topiladi? / LeetCode #543 — Diameter of Binary Tree

**Masala:** istalgan ikki tugun orasidagi eng uzun yo'l (qirralar soni). Yo'l ildizdan o'tishi shart emas.

**Oddiy qilib aytganda:** har bir tugun "egilish nuqtasi" bo'lishi mumkin: undan o'tadigan eng uzun yo'l = chap chuqurlik + o'ng chuqurlik. Chuqurlikni hisoblayotganda (Q25), shu yig'indini ham kuzatib, eng kattasini saqlaysiz.

**Yechim:**

```js
const node = (val, left = null, right = null) => ({ val, left, right });

function diameterOfBinaryTree(root) {
  let best = 0;
  const depth = (n) => {
    if (!n) return 0;
    const left = depth(n.left), right = depth(n.right);
    best = Math.max(best, left + right);        // shu tugundan o'tuvchi yo'l
    return 1 + Math.max(left, right);
  };
  depth(root);
  return best;
}

console.log(diameterOfBinaryTree(node(1, node(2, node(4), node(5)), node(3)))); // 3 — 4→2→1→3
```

**Murakkablik:** vaqt O(n); xotira O(h).

**Intervyuda shunday ayting:** "Chuqurlikni post-order DFS bilan hisoblayotganda, har tugunda chap va o'ng chuqurliklar yig'indisini global maksimum bilan solishtiraman. Bir o'tishda O(n)."

**Esda tuting:** diametr **qirralar** sonida o'lchanadi — tugunlar sonida emas; shartni aniqlashtiring.

## Q40. Ikki satrning eng uzun umumiy qism ketma-ketligi (LCS) qanday topiladi? / LeetCode #1143 — Longest Common Subsequence

**Masala:** ikki satrning eng uzun umumiy **qism ketma-ketligi** (harflar tartibi saqlanadi, lekin yonma-yon bo'lishi shart emas). `"abcde"`, `"ace"` → `3` ("ace").

**Oddiy qilib aytganda:** jadval tuzasiz: qatorlar — birinchi satr harflari, ustunlar — ikkinchisiniki. Har katak: "shu joygacha eng uzun umumiy qism". Harflar mos kelsa — diagonal katak + 1; kelmasa — yuqoridagi yoki chapdagi katakning kattasi. Bu `git diff` va DNK taqqoslashning asosi.

**Yechim:**

```js
function longestCommonSubsequence(a, b) {
  let prev = new Array(b.length + 1).fill(0);        // faqat oldingi qator — xotira tejaladi
  for (let i = 1; i <= a.length; i++) {
    const curr = new Array(b.length + 1).fill(0);
    for (let j = 1; j <= b.length; j++) {
      curr[j] = a[i - 1] === b[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], curr[j - 1]);
    }
    prev = curr;
  }
  return prev[b.length];
}

console.log(longestCommonSubsequence("abcde", "ace")); // 3
console.log(longestCommonSubsequence("abc", "def"));   // 0
```

**Murakkablik:** vaqt O(n · m); xotira O(m) (faqat bitta qator saqlanadi).

**Intervyuda shunday ayting:** "2D dinamik dasturlash: `dp[i][j]` — birinchi i va j harf uchun LCS. Harflar teng bo'lsa diagonal + 1, aks holda yuqori yoki chapning maksimumi. Faqat oldingi qator kerak bo'lgani uchun xotirani O(m) ga tushiraman."

**Esda tuting:** **subsequence** (tartib saqlanadi, uzilishi mumkin) va **substring** (ketma-ket) — turli masalalar; intervyuda farqini aniqlashtiring.
